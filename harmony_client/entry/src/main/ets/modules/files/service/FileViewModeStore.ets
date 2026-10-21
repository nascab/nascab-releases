import { PreferencesStore } from '../../../core/storage/PreferencesStore';

/** 本地持久化键（沿用历史键名，保证已有用户设置不丢失） */
const KEY_VIEW_MODE: string = 'file_view_mode';
/** 支持的显示模式：普通网格 / 大图标网格 / 列表 */
const VIEW_MODES: string[] = ['grid', 'large_grid', 'list'];
const DEFAULT_VIEW_MODE: string = 'grid';

/** 显示模式变更监听（控制器据此同步自身的可观察状态） */
export type FileViewModeListener = (mode: string) => void;

/**
 * 文件列表显示模式全局状态（单例）：
 * - 所有文件页面（文件根页、各层子目录页、文件视图页）共享同一份模式，
 *   任一处切换后其余页面（含返回栈中已存在的页面）同步刷新；
 * - 首次访问时从本地 Preferences 恢复，切换时立即写回，跨启动保持一致。
 */
@ObservedV2
export class FileViewModeStore {
  private static instance: FileViewModeStore | undefined = undefined;

  static getInstance(): FileViewModeStore {
    if (FileViewModeStore.instance === undefined) {
      FileViewModeStore.instance = new FileViewModeStore();
    }
    return FileViewModeStore.instance;
  }

  @Trace viewMode: string = DEFAULT_VIEW_MODE;
  private listeners: FileViewModeListener[] = [];
  private loaded: boolean = false;

  private constructor() {
  }

  /** 从本地恢复显示模式（幂等：成功读取后不再重复读取） */
  ensureLoaded(): void {
    if (this.loaded) {
      return;
    }
    try {
      const saved = PreferencesStore.getInstance().getString(KEY_VIEW_MODE);
      if (saved !== undefined && VIEW_MODES.includes(saved)) {
        this.viewMode = saved;
      }
      this.loaded = true;
    } catch (_e) {
    }
  }

  /** 注册监听（同一监听重复注册只保留一份） */
  addListener(listener: FileViewModeListener): void {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  }

  removeListener(listener: FileViewModeListener): void {
    this.listeners = this.listeners.filter((item: FileViewModeListener) => item !== listener);
  }

  /** 切换显示模式：更新共享状态、持久化，并通知所有已注册页面 */
  setViewMode(mode: string): void {
    if (this.viewMode === mode) {
      return;
    }
    this.viewMode = mode;
    try {
      void PreferencesStore.getInstance().setString(KEY_VIEW_MODE, mode);
    } catch (_e) {
    }
    for (const listener of this.listeners) {
      listener(mode);
    }
  }
}
