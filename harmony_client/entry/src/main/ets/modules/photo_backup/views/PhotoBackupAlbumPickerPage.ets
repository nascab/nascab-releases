import { L10n } from '../../../core/localization/L10n';
import { image } from '@kit.ImageKit';
import { AppTheme, ThemePalette } from '../../../core/theme/AppTheme';
import { AppEventBus } from '../../../common/AppEventBus';
import { LanguageService } from '../../../core/localization/LanguageService';
import { PageScaffold } from '../../../common/PageScaffold';
import { PhotoAlbumService } from '../services/PhotoAlbumService';
import { PhotoAlbumInfo } from '../models/PhotoBackupModels';
import { PhotoBackupAlbumPickerPageParam } from '../router/PhotoBackupRoutes';

/** 相册卡片宽高比（宽/高，对齐 Flutter 网格 childAspectRatio） */
const TILE_ASPECT_RATIO = 0.78;
/** 网格内边距与列间距（与 Grid 样式保持一致） */
const GRID_PADDING = 24;
const GRID_GAP = 10;

/**
 * 相册选择页（对齐 Flutter showPhotoBackupAlbumPicker / _PhotoBackupAlbumPickerPage）：
 * 2 列网格相册卡片（封面 + 名称 + 数量），点击切换选中，底部「取消/确定(N)」回传多选结果。
 */
@ComponentV2
export struct PhotoBackupAlbumPickerPage {
  @Param param: PhotoBackupAlbumPickerPageParam = new PhotoBackupAlbumPickerPageParam();
  @Param popPage: () => void = (): void => {
  };

  @Local loading: boolean = true;
  @Local errorText: string = '';
  @Local albums: PhotoAlbumInfo[] = [];
  /** 已选相册 id（多选） */
  @Local selectedIds: string[] = [];
  /** 相册卡片高度（按容器宽度与 2 列栅格计算，避免 GridItem 被内容撑满整屏） */
  @Local tileHeight: number = 160;
  /** 依赖 localeBump：切换语言后触发整页刷新 */
  @Local localeBump: number = 0;
  private localeListener: (data: string) => void = (_data: string): void => {
    this.localeBump++;
  };

  private palette(): ThemePalette {
    return AppTheme.current();
  }

  aboutToAppear(): void {
    AppEventBus.on(LanguageService.EVENT_LOCALE_CHANGED, this.localeListener);
    this.selectedIds = this.param.initialSelectedIds.slice();
    void this.load();
  }

  aboutToDisappear(): void {
    AppEventBus.off(LanguageService.EVENT_LOCALE_CHANGED, this.localeListener);
  }

  /** 切换相册选中态 */
  private toggleSelect(albumId: string): void {
    const idx = this.selectedIds.indexOf(albumId);
    if (idx >= 0) {
      const next = this.selectedIds.slice();
      next.splice(idx, 1);
      this.selectedIds = next;
      return;
    }
    this.selectedIds = this.selectedIds.concat(albumId);
  }

  /** 确定：按相册列表顺序回传已选相册，并返回表单 */
  private confirmPick(): void {
    if (this.selectedIds.length === 0) {
      return;
    }
    const picked = this.albums.filter((a: PhotoAlbumInfo): boolean =>
      this.selectedIds.indexOf(a.id) >= 0);
    if (picked.length === 0) {
      return;
    }
    this.param.onPicked(picked);
    this.popPage();
  }

  /** 加载相册列表（对齐 Flutter _preparePaths：权限 → 枚举 → 排序） */
  private async load(): Promise<void> {
    this.loading = true;
    this.errorText = '';
    try {
      const granted = await PhotoAlbumService.requestPermission();
      if (!granted) {
        this.errorText = L10n.t('photo_library_permission_missing', '缺少相册访问权限');
        return;
      }
      this.albums = await PhotoAlbumService.listAlbums();
    } catch (e) {
      this.errorText = e instanceof Error ? e.message : `${e}`;
    } finally {
      this.loading = false;
    }
  }

  build() {
    PageScaffold({
      title: L10n.t('photo_backup_album_select_multi', '选择相册（可多选）'),
      showBack: true,
      onBack: (): void => {
        this.popPage();
      },
      content: (): void => {
        this.PageContent()
      }
    })
  }

  @Builder
  PageContent() {
    Column() {
      if (this.loading) {
        Column() {
          LoadingProgress()
            .width(32)
            .height(32)
            .color(this.palette().primary)
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
      } else if (this.errorText.length > 0) {
        Column() {
          Text(this.errorText)
            .fontSize(14)
            .fontColor(this.palette().error)
            .textAlign(TextAlign.Center)
            .padding(24)
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
      } else if (this.albums.length === 0) {
        Column() {
          Text(L10n.t('photo_album_empty', '暂无相册'))
            .fontSize(14)
            .fontColor(this.palette().subText)
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
      } else {
        Column() {
          Grid() {
            ForEach(this.albums, (album: PhotoAlbumInfo) => {
              GridItem() {
                AlbumGridTile({
                  album: album,
                  selected: this.selectedIds.indexOf(album.id) >= 0,
                  onToggle: (): void => {
                    this.toggleSelect(album.id);
                  }
                })
              }
              .height(this.tileHeight)
            }, (album: PhotoAlbumInfo): string => `${album.id}_${album.name}_${album.count}_${this.localeBump}`)
          }
          .columnsTemplate('1fr 1fr')
          .columnsGap(GRID_GAP)
          .rowsGap(GRID_GAP)
          .padding({ left: 12, right: 12, top: 8, bottom: 8 })
          .width('100%')
          .layoutWeight(1)
          .scrollBar(BarState.Off)
          .edgeEffect(EdgeEffect.Spring)
          .onAreaChange((_old: Area, newVal: Area) => {
            const width = newVal.width as number;
            const colWidth = (width - GRID_PADDING - GRID_GAP) / 2;
            if (colWidth > 0) {
              this.tileHeight = colWidth / TILE_ASPECT_RATIO;
            }
          })

          this.BottomBar()
        }
        .width('100%')
        .height('100%')
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor(AppTheme.current().pageBg)
    .opacity(this.localeBump >= 0 ? 1 : 1)
  }

  /** 底部操作栏：取消 / 确定(N) */
  @Builder
  BottomBar() {
    Row({ space: 12 }) {
      Button(L10n.cancel)
        .fontSize(15)
        .fontColor(this.palette().onSurface)
        .backgroundColor(this.palette().inputFill)
        .borderRadius(22)
        .height(44)
        .layoutWeight(1)
        .onClick((): void => {
          this.popPage();
        })
      Button(this.selectedIds.length > 0
        ? `${L10n.ok}(${this.selectedIds.length})` : L10n.ok)
        .fontSize(15)
        .fontColor(this.palette().buttonText)
        .backgroundColor(this.palette().buttonBg)
        .borderRadius(22)
        .height(44)
        .layoutWeight(1)
        .enabled(this.selectedIds.length > 0)
        .opacity(this.selectedIds.length > 0 ? 1 : 0.5)
        .onClick((): void => {
          this.confirmPick();
        })
    }
    .width('100%')
    .padding({ left: 12, right: 12, top: 8, bottom: 16 })
  }
}

/** 相册网格卡片（对齐 Flutter _AlbumGridTile：封面 + 名称 + 数量；选中态打勾高亮） */
@ComponentV2
struct AlbumGridTile {
  @Require @Param album: PhotoAlbumInfo;
  @Param selected: boolean = false;
  @Param onToggle: () => void = (): void => {
  };

  private palette(): ThemePalette {
    return AppTheme.current();
  }

  build() {
    Stack({ alignContent: Alignment.TopEnd }) {
      Column() {
        // 封面区（占满剩余空间；封面未就绪时显示占位图标）
        AlbumCover({ albumUri: this.album.id })
          .width('100%')
          .layoutWeight(1)

        // 信息区：名称 + 数量
        Column({ space: 2 }) {
          Text(this.album.name)
            .fontSize(13)
            .fontWeight(FontWeight.Medium)
            .fontColor(this.palette().onSurface)
            .maxLines(1)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
            .width('100%')
          Text(`${this.album.count}`)
            .fontSize(12)
            .fontColor(this.palette().subText)
            .width('100%')
        }
        .alignItems(HorizontalAlign.Start)
        .width('100%')
        .padding({ left: 8, right: 8, top: 6, bottom: 8 })
      }
      .width('100%')
      .height('100%')
      .borderRadius(12)
      .clip(true)
      .backgroundColor(AppTheme.withAlpha(this.palette().surfaceBg, 0.35))
      .border({
        width: this.selected ? 2 : 1,
        color: this.selected ? this.palette().primary : this.palette().divider
      })

      // 选中角标
      if (this.selected) {
        SymbolGlyph($r('sys.symbol.checkmark_circle_fill'))
          .fontSize(22)
          .fontColor([this.palette().primary])
          .margin({ top: 6, right: 6 })
      }
    }
    .width('100%')
    .height('100%')
    .onClick((): void => {
      this.onToggle();
    })
  }
}

/**
 * 相册封面：通过 asset.getThumbnail 取缩略图 PixelMap。
 * 不能直接把 album.coverUri 交给 Image —— 视频相册的 coverUri 指向视频文件，解码必然失败。
 */
@ComponentV2
struct AlbumCover {
  @Param albumUri: string = '';
  @Local pixelMap: image.PixelMap | undefined = undefined;
  private disposed: boolean = false;

  private palette(): ThemePalette {
    return AppTheme.current();
  }

  aboutToAppear(): void {
    void this.load();
  }

  aboutToDisappear(): void {
    this.disposed = true;
    const pm = this.pixelMap;
    this.pixelMap = undefined;
    if (pm !== undefined) {
      void pm.release();
    }
  }

  private async load(): Promise<void> {
    try {
      const pm = await PhotoAlbumService.loadAlbumCover(this.albumUri, 320);
      if (this.disposed) {
        if (pm !== undefined) {
          await pm.release();
        }
        return;
      }
      this.pixelMap = pm;
    } catch (_e) {
      // 保持占位
    }
  }

  build() {
    Stack() {
      if (this.pixelMap !== undefined) {
        Image(this.pixelMap)
          .objectFit(ImageFit.Cover)
          .width('100%')
          .height('100%')
      } else {
        Column() {
          SymbolGlyph($r('sys.symbol.picture'))
            .fontSize(36)
            .fontColor([this.palette().hint])
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
        .backgroundColor(this.palette().inputFill)
      }
    }
    .width('100%')
    .height('100%')
    .clip(true)
  }
}
