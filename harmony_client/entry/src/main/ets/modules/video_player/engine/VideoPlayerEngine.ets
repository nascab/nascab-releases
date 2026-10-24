/**
 * 播放内核封装（基于 mpv-ohos / @mpv-ohos/mpv-arkts）：
 * - 由 mpv 负责解封装、解码（ohcodec 硬解）与渲染（gpu-next + OHOS GL），
 *   相比系统 AVPlayer 支持更多容器/编码格式（MKV、RMVB、AVI、VVC 等）。
 * - 对外接口与控制器保持一致：position/duration/seek 均为毫秒，mpv 内部秒值在此转换。
 * - 音轨/字幕：文本字幕由控制器 VTT 叠层绘制（mpv sid=no）；
 *   位图字幕（PGS/VobSub 等）由 mpv 原生渲染，无需转码烧录；音轨切换走后端 aid。
 */

import { AudioTrack, Media, MpvLogLevel, Player, PlayerConfig, PlayerLog, SubtitleTrack } from '@mpv-ohos/mpv-arkts';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'VideoPlayerEngine';
/** mpv error 日志中真正表示“文件/流打不开”的关键字（其余多为可恢复错误） */
const FATAL_OPEN_ERROR_KEYWORDS: string[] = [
  'failed to open',
  'failed to recognize file format',
  'unrecognized file format',
  'no video or audio streams selected',
  'cannot open file'
];

function isFatalOpenError(message: string): boolean {
  const m = message.toLowerCase();
  // HLS 分片偶发 404/重试是可恢复的（服务端产片需要时间、切换时旧会话被停止），
  // 不能当作“打不开”处理，否则会触发控制器反复重建会话。
  if (m.indexOf('segment') >= 0 || m.indexOf('hls:') >= 0) {
    return false;
  }
  for (const k of FATAL_OPEN_ERROR_KEYWORDS) {
    if (m.indexOf(k) >= 0) {
      return true;
    }
  }
  return false;
}

/** 日志脱敏：隐藏访问令牌，便于定位实际传给 mpv 的地址 */
function maskUrl(url: string): string {
  return url.replace(/((?:accessToken|token)=)[^&]*/g, '$1***');
}

/** 引擎状态回调（控制器订阅） */
export interface EngineCallbacks {
  onPrepared?: (durationMs: number) => void;
  onPlaying?: () => void;
  onPaused?: () => void;
  onCompleted?: () => void;
  onError?: (message: string) => void;
  onTimeUpdate?: (positionMs: number) => void;
  onBuffered?: (bufferedMs: number) => void;
  onVideoSize?: (width: number, height: number) => void;
}

export class VideoPlayerEngine {
  private player: Player;
  private cb: EngineCallbacks = {};
  private prepared: boolean = false;
  private released: boolean = false;
  private durationMs: number = 0;
  private lastSpeed: number = 1.0;
  private lastVolume: number = 1.0;
  /** 本次媒体是否已开始出画/推进 */
  private started: boolean = false;
  /** 是否处于“已发起 open、尚未加载成功”的窗口期（期间才上报打开失败） */
  private awaitingOpen: boolean = false;
  /** 当前容器的音轨（mpv track-list 顺序） */
  private audioTracks: AudioTrack[] = [];
  /** 当前容器的内嵌字幕轨道（mpv track-list 顺序，mapIndex 与之一致） */
  private subtitleTracks: SubtitleTrack[] = [];

  constructor() {
    // vo=gpu-next + ohos GL 上下文 + 硬解，等价于 mpv 桌面端默认渲染链路
    this.player = new Player(new PlayerConfig({
      vo: 'gpu-next',
      gpuContext: 'ohos',
      hwdec: true,
      logLevel: MpvLogLevel.Info
    }));
    // 默认关闭 mpv 字幕渲染（文本字幕由客户端 VTT 叠层绘制）：在加载前设置一次 sid=no，
    // 避免在 open 的关键加载阶段写属性干扰 demuxer/轨道初始化；
    // 位图字幕由控制器在播放开始后显式选轨，交给 mpv 原生渲染。
    this.player.disableSubtitleTrack();
    // 强制保持宽高比：surface 尺寸变化（会话重建/页面重排）时也不会把画面拉伸变形
    this.player.native.setProperty('keepaspect', true);
    this.bindStreams();
  }

  setCallbacks(cb: EngineCallbacks): void {
    this.cb = cb;
  }

  /** 供页面 PlayerSurface 绑定渲染 surface */
  getPlayer(): Player {
    return this.player;
  }

  /** 订阅 mpv 状态流并转发为引擎回调 */
  private bindStreams(): void {
    const p = this.player;

    p.stream.playing.listen((playing: boolean): void => {
      if (this.released) {
        return;
      }
      if (playing) {
        this.cb.onPlaying?.();
      } else {
        this.cb.onPaused?.();
      }
    });

    p.stream.position.listen((seconds: number): void => {
      if (!this.released) {
        if (seconds > 0) {
          this.markLoaded('position');
        }
        // 部分文件 duration 先于 video-params 到达，首个位置事件时补一次尺寸
        if (this.lastVideoWidth === 0) {
          this.emitVideoSize();
        }
        this.cb.onTimeUpdate?.(Math.round(seconds * 1000));
      }
    });

    p.stream.duration.listen((seconds: number): void => {
      if (this.released) {
        return;
      }
      const ms = Math.round(seconds * 1000);
      if (ms <= 0) {
        return;
      }
      this.markLoaded('duration');
      this.durationMs = ms;
      this.emitVideoSize();
      this.cb.onPrepared?.(ms);
    });

    // demuxer-cache-time：已缓存到的位置（秒）
    p.stream.buffer.listen((seconds: number): void => {
      if (!this.released) {
        if (this.awaitingOpen) {
          hilog.info(0x0000, TAG, 'load buffer %{public}d s', Math.round(seconds));
        }
        this.cb.onBuffered?.(Math.max(0, Math.round(seconds * 1000)));
      }
    });

    p.stream.eof.listen((eof: boolean): void => {
      if (!this.released && eof) {
        hilog.info(0x0000, TAG, 'eof reached, prepared=%{public}s', String(this.prepared));
        if (this.prepared) {
          this.cb.onCompleted?.();
        }
      }
    });

    p.stream.tracks.listen((tracks): void => {
      if (!this.released) {
        this.audioTracks = tracks.audio;
        this.subtitleTracks = tracks.subs;
        if (tracks.audio.length + tracks.video.length > 0) {
          if (this.awaitingOpen) {
            hilog.info(0x0000, TAG, 'tracks video=%{public}d audio=%{public}d',
              tracks.video.length, tracks.audio.length);
          }
          this.markLoaded('tracks');
        }
        this.emitVideoSize();
      }
    });

    // mpv 日志对定位 HLS/demuxer 加载问题很关键，info/warn/error 原样转发到 hilog
    p.stream.log.listen((log: PlayerLog): void => {
      if (this.released) {
        return;
      }
      if (log.level === 'warn') {
        hilog.warn(0x0000, TAG, 'mpv warn [%{public}s] %{public}s', log.prefix, log.text);
      } else if (log.level === 'error') {
        hilog.error(0x0000, TAG, 'mpv error [%{public}s] %{public}s', log.prefix, log.text);
      } else {
        hilog.info(0x0000, TAG, 'mpv info [%{public}s] %{public}s', log.prefix, log.text);
      }
    });

    p.stream.error.listen((message: string): void => {
      if (this.released) {
        return;
      }
      // mpv 的 error 日志包含大量可恢复错误（切流时旧会话被中止、分段重试等），
      // 不能直接当作致命失败，否则会触发控制器反复重建会话。仅在媒体尚未
      // 成功加载、且日志明确指向文件/格式打开失败时才上报。
      hilog.warn(0x0000, TAG, 'mpv error: %{public}s', message);
      if (this.awaitingOpen && !this.prepared && !this.started && isFatalOpenError(message)) {
        this.awaitingOpen = false;
        this.notifyError(message);
      }
    });
  }

  /** mpv 的 video-params 在文件加载后更新，取校正后的显示尺寸用于页面 letterbox */
  private emitVideoSize(): void {
    const params = this.player.state.videoParams;
    // w/h 未做像素比校正，dw/dh 才与实际显示比例一致；旋转 90/270 度时显示宽高需互换
    let w = params.dw > 0 ? params.dw : params.w;
    let h = params.dh > 0 ? params.dh : params.h;
    if (params.rotate % 180 === 90 && w > 0 && h > 0) {
      const swap = w;
      w = h;
      h = swap;
    }
    if (w > 0 && h > 0 && (w !== this.lastVideoWidth || h !== this.lastVideoHeight)) {
      this.lastVideoWidth = w;
      this.lastVideoHeight = h;
      hilog.info(0x0000, TAG, 'video size %{public}dx%{public}d', w, h);
      // 先解除看门狗，再回调上层：回调内部若抛异常，不能影响“已加载成功”的判定
      this.markLoaded('video-size');
      this.cb.onVideoSize?.(w, h);
    }
  }

  private lastVideoWidth: number = 0;
  private lastVideoHeight: number = 0;

  private notifyError(message: string): void {
    hilog.error(0x0000, TAG, 'engine error: %{public}s', message);
    this.cb.onError?.(message);
  }

  /** 收到任意“媒体已成功打开”的信号（video-params/track-list/duration/position） */
  private markLoaded(source: string): void {
    const wasAwaiting = this.awaitingOpen;
    this.awaitingOpen = false;
    this.prepared = true;
    this.started = true;
    if (wasAwaiting) {
      hilog.info(0x0000, TAG, 'media loaded by %{public}s', source);
    }
  }

  /** 打开播放地址；startMs>=0 时从该位置起播（由 mpv start 选项完成定位） */
  async open(url: string, startMs: number = -1, autoPlay: boolean = true): Promise<void> {
    if (this.released) {
      return;
    }
    this.prepared = false;
    this.started = false;
    this.awaitingOpen = true;
    this.durationMs = 0;
    this.lastVideoWidth = 0;
    this.lastVideoHeight = 0;
    const startSec = Number.isFinite(startMs) && startMs > 0 ? startMs / 1000 : -1;
    const media = startSec >= 0 ? new Media(url, { start: startSec }) : new Media(url);
    hilog.info(0x0000, TAG, 'open startSec=%{public}d autoPlay=%{public}s url=%{public}s',
      Math.round(startSec), String(autoPlay), maskUrl(url));
    try {
      this.player.open(media, autoPlay);
    } catch (e) {
      this.awaitingOpen = false;
      this.notifyError(`open failed: ${JSON.stringify(e)}`);
    }
  }

  play(): void {
    if (this.released) {
      return;
    }
    this.player.play();
  }

  pause(): void {
    if (this.released) {
      return;
    }
    this.player.pause();
  }

  isPlaying(): boolean {
    return !this.released && this.player.state.playing;
  }

  /** seek（不强制恢复播放；转码模式下由控制器 debounce 后重建会话） */
  seekTo(ms: number): void {
    if (this.released) {
      return;
    }
    this.player.seek(Math.max(0, ms) / 1000);
  }

  getCurrentPosition(): number {
    if (this.released) {
      return 0;
    }
    return Math.round(this.player.state.position * 1000);
  }

  getDuration(): number {
    return this.durationMs;
  }

  setSpeed(speed: number): void {
    this.lastSpeed = speed;
    if (!this.released) {
      // mpv 的 speed 是持久属性，可在媒体加载前设置并沿用到后续文件
      this.player.setSpeed(this.lastSpeed);
    }
  }

  setVolume(volume: number): void {
    this.lastVolume = Math.min(Math.max(volume, 0.0), 1.0);
    if (!this.released) {
      // mpv volume 取值 0-100，0-1 归一化音量在此换算
      this.player.setVolume(this.lastVolume * 100);
    }
  }

  /** 由 mpv 自动推送 track-list，这里仅同步本地缓存 */
  async loadTracks(): Promise<void> {
    if (this.released) {
      return;
    }
    this.audioTracks = this.player.state.tracks.audio;
    this.subtitleTracks = this.player.state.tracks.subs;
  }

  /** 按同类序号（mapIndex，从 0 开始）切换音轨；返回是否成功 */
  async selectAudioTrackByOrder(orderIndex: number): Promise<boolean> {
    if (this.released) {
      return false;
    }
    if (this.audioTracks.length === 0) {
      this.audioTracks = this.player.state.tracks.audio;
    }
    if (this.audioTracks.length <= 1) {
      return false;
    }
    if (orderIndex < 0 || orderIndex >= this.audioTracks.length) {
      return false;
    }
    this.player.setAudioTrack(this.audioTracks[orderIndex]);
    return true;
  }

  /**
   * 按同类序号（mapIndex，从 0 开始）选中内嵌字幕，由 mpv 原生渲染。
   * 文本字幕仍走客户端 VTT 叠层，此方法主要用于 PGS/VobSub 等 mpv 能直接渲染的位图字幕。
   */
  async selectSubtitleTrackByOrder(orderIndex: number): Promise<boolean> {
    if (this.released) {
      return false;
    }
    if (this.subtitleTracks.length === 0) {
      this.subtitleTracks = this.player.state.tracks.subs;
    }
    if (orderIndex < 0 || orderIndex >= this.subtitleTracks.length) {
      return false;
    }
    this.player.setSubtitleTrack(this.subtitleTracks[orderIndex]);
    return true;
  }

  /**
   * 挂载外挂字幕 URL（服务器 raw 文件直链），由 mpv 原生渲染，
   * 支持 .sup/.sub/.idx 等客户端无法转成 VTT 的位图字幕。
   */
  loadExternalSubtitle(url: string, label: string, lang: string): boolean {
    if (this.released || url.trim().length === 0) {
      return false;
    }
    const language = lang.trim().length > 0 ? lang.trim() : 'und';
    this.player.setSubtitleTrack(SubtitleTrack.uri(url, '', language, label));
    return true;
  }

  /** 关闭 mpv 原生字幕渲染（文本字幕交给客户端 VTT 叠层时调用） */
  disableSubtitle(): void {
    if (!this.released) {
      this.player.disableSubtitleTrack();
    }
  }

  /** 停止并复位（保留实例，可再次 open 复用） */
  async stop(): Promise<void> {
    this.prepared = false;
    this.started = false;
    this.awaitingOpen = false;
    this.durationMs = 0;
    this.audioTracks = [];
    this.subtitleTracks = [];
    if (this.released) {
      return;
    }
    this.player.stop();
  }

  /** 彻底释放 */
  release(): void {
    if (this.released) {
      return;
    }
    this.released = true;
    this.prepared = false;
    this.started = false;
    this.awaitingOpen = false;
    this.durationMs = 0;
    this.audioTracks = [];
    this.player.destroy();
  }
}
