import { webSocket } from '@kit.NetworkKit';
import { util } from '@kit.ArkTS';
import { APIClient } from '../../../core/network/APIClient';
import { JsonCodec } from '../../../common/JsonTypes';
import { FileItem } from '../models/FileModels';

/** 文件变更消息（WS /api/file/watch type=change） */
export class FileChangeData {
  type?: string;
  changeDir?: string;
  added?: FileItem[];
  removed?: string[];
}

/**
 * 由 baseUrl 推导 WS 地址（对齐 Flutter resolveFileWsBaseUri 非 Web 分支）：
 * https → wss，http → ws；端口缺省时按协议默认端口。
 */
export function resolveFileWsBaseUri(baseUrl: string): string {
  const base = baseUrl.trim();
  if (base.length === 0) {
    return '';
  }
  const uri = base.replace(/\/+$/, '');
  if (uri.startsWith('https://')) {
    return `wss://${uri.substring('https://'.length)}`;
  }
  if (uri.startsWith('http://')) {
    return `ws://${uri.substring('http://'.length)}`;
  }
  return `ws://${uri}`;
}

/**
 * 文件监听服务（对齐 Flutter file_watcher_service.dart）：
 * 连接 /api/file/watch，进入目录后下发 watch 命令，接收 change 事件增量更新列表。
 */
export class FileWatcherService {
  private ws: webSocket.WebSocket | undefined = undefined;
  private watchSent: boolean = false;
  private readonly onFileChange: (data: FileChangeData) => void;
  private readonly onError: (e: Object) => void;

  constructor(onFileChange: (data: FileChangeData) => void, onError: (e: Object) => void) {
    this.onFileChange = onFileChange;
    this.onError = onError;
  }

  connect(path: string): void {
    this.disconnect();
    const api = APIClient.getInstance();
    const baseUrl = api.baseUrl;
    if (baseUrl.trim().length === 0) {
      console.error('[FileWatcher] skip: baseUrl empty');
      return;
    }
    const wsBase = resolveFileWsBaseUri(baseUrl);
    if (wsBase.length === 0) {
      console.error('[FileWatcher] skip: wsBase empty, baseUrl=' + baseUrl);
      return;
    }
    const token = api.accessToken;
    const qp: string[] = [];
    if (token !== undefined && token.length > 0) {
      qp.push(`accessToken=${encodeURIComponent(token)}`);
    }
    qp.push(`path=${encodeURIComponent(path)}`);
    const wsUri = `${wsBase}/api/file/watch?${qp.join('&')}`;
    try {
      const ws = webSocket.createWebSocket();
      this.ws = ws;
      this.watchSent = false;
      // 必须等 on('open')（握手完成、socket 真正可写）再下发 watch 命令。
      // 鸿蒙 connect 回调会早于 open 事件触发，此时 send 的帧会丢失且回调无错误，
      // 导致服务端始终收不到 watch → 不启动 fs.watch → 永远收不到 change。
      ws.on('open', (_err: Object, _value: Object): void => {
        if (this.ws !== ws) {
          return;
        }
        console.info(`[FileWatcher] open path=${path}`);
        this.sendWatch(path);
      });
      ws.on('message', (_err: Object, value: string | ArrayBuffer): void => {
        if (this.ws !== ws) {
          return;
        }
        console.info(`[FileWatcher] raw message type=${typeof value}`);
        const text = typeof value === 'string' ? value : FileWatcherService.decode(value);
        if (text.length === 0) {
          return;
        }
        try {
          const data = JsonCodec.parseStr<FileChangeData>(text);
          console.info(`[FileWatcher] change type=${data.type ?? ''} dir=${data.changeDir ?? ''} ` +
            `added=${(data.added ?? []).length} removed=${(data.removed ?? []).length}`);
          if (data.type === 'change') {
            this.onFileChange(data);
          }
        } catch (e) {
          console.error(`[FileWatcher] parse error: ${e} raw=${text.substring(0, 200)}`);
        }
      });
      ws.on('error', (err: Object): void => {
        if (this.ws !== ws) {
          return;
        }
        console.error(`[FileWatcher] ws error: ${JSON.stringify(err ?? {})}`);
        this.onError(err);
      });
      ws.on('close', (_err: Object, value: webSocket.CloseResult): void => {
        if (this.ws !== ws) {
          return;
        }
        console.error(`[FileWatcher] ws close: ${JSON.stringify(value ?? {})}`);
      });
      console.info(`[FileWatcher] connecting uri=${wsUri}`);
      ws.connect(wsUri, (err: Object, _value: boolean): void => {
        if (err) {
          console.error(`[FileWatcher] connect error: ${JSON.stringify(err)} uri=${wsUri}`);
        }
      });
    } catch (e) {
      console.error(`[FileWatcher] connect failed: ${e}`);
      this.onError(e as Object);
    }
  }

  /** 在 on('open') 时下发 watch 命令（仅一次） */
  private sendWatch(path: string): void {
    if (this.watchSent || this.ws === undefined) {
      return;
    }
    this.watchSent = true;
    const msg = JSON.stringify({ 'type': 'watch', 'path': path });
    this.ws.send(msg, (sendErr: Object): void => {
      if (sendErr) {
        console.error(`[FileWatcher] send error: ${JSON.stringify(sendErr)}`);
      } else {
        console.info(`[FileWatcher] watch sent path=${path}`);
      }
    });
  }

  /** 服务端可能以二进制帧下发 JSON（对齐 TerminalController.decodeBytes） */
  private static decode(buf: ArrayBuffer): string {
    try {
      return new util.TextDecoder('utf-8').decodeToString(new Uint8Array(buf));
    } catch (_e) {
      return '';
    }
  }

  disconnect(): void {
    this.watchSent = false;
    if (this.ws) {
      try {
        this.ws.close();
      } catch (_e) {
        // 已断开
      }
      this.ws = undefined;
    }
  }
}
