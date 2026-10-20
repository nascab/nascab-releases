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
 * 2 列网格相册卡片（封面 + 名称 + 数量），点击选回来源表单。
 */
@ComponentV2
export struct PhotoBackupAlbumPickerPage {
  @Param param: PhotoBackupAlbumPickerPageParam = new PhotoBackupAlbumPickerPageParam();
  @Param popPage: () => void = (): void => {
  };

  @Local loading: boolean = true;
  @Local errorText: string = '';
  @Local albums: PhotoAlbumInfo[] = [];
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
    void this.load();
  }

  aboutToDisappear(): void {
    AppEventBus.off(LanguageService.EVENT_LOCALE_CHANGED, this.localeListener);
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
      title: L10n.t('photo_album_select', '选择相册'),
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
        Grid() {
          ForEach(this.albums, (album: PhotoAlbumInfo) => {
            GridItem() {
              AlbumGridTile({
                album: album,
                onPick: (): void => {
                  this.param.onPicked(album);
                  this.popPage();
                }
              })
            }
            .height(this.tileHeight)
          }, (album: PhotoAlbumInfo): string => `${album.id}_${album.name}_${album.count}_${this.localeBump}`)
        }
        .columnsTemplate('1fr 1fr')
        .columnsGap(GRID_GAP)
        .rowsGap(GRID_GAP)
        .padding({ left: 12, right: 12, top: 8, bottom: 24 })
        .width('100%')
        .height('100%')
        .scrollBar(BarState.Off)
        .edgeEffect(EdgeEffect.Spring)
        .onAreaChange((_old: Area, newVal: Area) => {
          const width = newVal.width as number;
          const colWidth = (width - GRID_PADDING - GRID_GAP) / 2;
          if (colWidth > 0) {
            this.tileHeight = colWidth / TILE_ASPECT_RATIO;
          }
        })
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor(AppTheme.current().pageBg)
    .opacity(this.localeBump >= 0 ? 1 : 1)
  }
}

/** 相册网格卡片（对齐 Flutter _AlbumGridTile：封面 + 名称 + 数量） */
@ComponentV2
struct AlbumGridTile {
  @Require @Param album: PhotoAlbumInfo;
  @Param onPick: () => void = (): void => {
  };

  private palette(): ThemePalette {
    return AppTheme.current();
  }

  build() {
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
    .border({ width: 1, color: this.palette().divider })
    .onClick((): void => {
      this.onPick();
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
