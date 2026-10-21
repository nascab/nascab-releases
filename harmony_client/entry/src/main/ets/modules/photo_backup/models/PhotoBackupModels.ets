/**
 * 相册备份模型（对齐 Flutter photo_backup_models.dart）。
 * PhotoBackupTask 用于任务列表卡片展示，@Trace 字段保证 @ComponentV2 响应式刷新。
 */

/** 备份来源类型 */
export enum PhotoBackupSourceType {
  ALBUM = 'album',
  FOLDER = 'folder'
}

/** 运行触发方式（存储值对齐 Flutter _triggerValue：upload_new/upload_all/auto_start） */
export enum PhotoBackupRunTrigger {
  UPLOAD_NEW = 'upload_new',
  UPLOAD_ALL = 'upload_all',
  AUTO_START = 'auto_start'
}

@ObservedV2
export class PhotoBackupTask {
  @Trace id: number = 0;
  @Trace serverId: string = '';
  @Trace userId: number = 0;
  @Trace name: string = '';
  @Trace sourceType: PhotoBackupSourceType = PhotoBackupSourceType.FOLDER;
  /** 相册来源：多个相册 uri 以换行分隔（兼容历史单相册任务） */
  @Trace sourceId: string = '';
  /** 相册来源：多个相册名称以换行分隔，与 sourceId 顺序一一对应 */
  @Trace sourceName: string = '';
  /** 上传目标目录 */
  @Trace targetDir: string = '';
  @Trace nameStrategy: string = 'skip';
  @Trace saveType: string = '';
  @Trace uploadLivePhotoVideo: boolean = false;
  @Trace autoStartOnLaunch: boolean = false;
  @Trace createdAtMs: number = 0;
  @Trace updatedAtMs: number = 0;

  /** 来源 id 列表（多相册按换行拆分，过滤空值） */
  sourceIds(): string[] {
    return PhotoBackupTask.splitLines(this.sourceId);
  }

  /** 来源名称列表（与 sourceIds 顺序对应） */
  sourceNames(): string[] {
    return PhotoBackupTask.splitLines(this.sourceName);
  }

  /** 卡片展示用来源名：多相册以「、」连接 */
  sourceDisplayName(): string {
    const names = this.sourceNames();
    return names.length > 0 ? names.join('、') : this.sourceName.trim();
  }

  private static splitLines(raw: string): string[] {
    const out: string[] = [];
    for (const part of raw.split('\n')) {
      const v = part.trim();
      if (v.length > 0) {
        out.push(v);
      }
    }
    return out;
  }
}

export class PhotoBackupRunRecord {
  id: number = 0;
  taskId: number = 0;
  triggerType: string = '';
  startedAtMs: number = 0;
  finishedAtMs: number = 0;
  successCount: number = 0;
  failedCount: number = 0;
  totalBytes: number = 0;
}

export class PhotoBackupFileRecord {
  id: number = 0;
  taskId: number = 0;
  runId: number = 0;
  sourceUniqueId: string = '';
  displayName: string = '';
  localPath: string = '';
  size: number = 0;
  sourceCreateAtMs: number = 0;
  uploadedAtMs: number = 0;
  status: string = '';
  error: string = '';
}

/** 「上传新增」断点光标（对齐 Flutter PhotoBackupCursor） */
export class PhotoBackupCursor {
  lastCreatedAtMs: number = 0;
  lastUniqueId: string = '';

  constructor(lastCreatedAtMs: number, lastUniqueId: string) {
    this.lastCreatedAtMs = lastCreatedAtMs;
    this.lastUniqueId = lastUniqueId;
  }
}

/** 待上传来源条目（对齐 Flutter _SourceEntry） */
export class PhotoSourceEntry {
  sourceUniqueId: string = '';
  displayName: string = '';
  /** 可上传的数据源 URI（file://media/... 或沙盒 file://...） */
  localUri: string = '';
  relativePath: string = '';
  /** 排序/游标时间（创建时间毫秒） */
  orderMs: number = 0;
  size: number = 0;
  fileMtimeMs: number = 0;
  /** 所属相册名（多相册备份时作为目标子目录前缀；文件夹来源为空） */
  albumName: string = '';
}

/** 相册信息（相册选择页用，对齐 Flutter 相册枚举项） */
@ObservedV2
export class PhotoAlbumInfo {
  /** 相册唯一标识（取 albumUri） */
  @Trace id: string = '';
  @Trace name: string = '';
  @Trace count: number = 0;
  /** 封面资源 uri（Image 组件可直接加载） */
  @Trace coverUri: string = '';
}

/** 毫秒时间戳 → 本地 yyyy-MM-dd HH:mm:ss（对齐 Flutter _fmtTime；<=0 返回 '-'） */
export function formatPhotoBackupTime(ms: number): string {
  if (ms <= 0) {
    return '-';
  }
  const two = (v: number): string => v < 10 ? `0${v}` : `${v}`;
  const dt = new Date(ms);
  return `${dt.getFullYear()}-${two(dt.getMonth() + 1)}-${two(dt.getDate())} `
    + `${two(dt.getHours())}:${two(dt.getMinutes())}:${two(dt.getSeconds())}`;
}
