import 'package:get/get.dart';

import '../../../utils/cache_manager.dart';

/// 文件列表显示模式的全局共享状态。
///
/// 所有文件浏览页面（手机端各级目录、PC 端窗口、选择器等）共用同一份响应式状态：
/// 任一页面切换显示模式后，其他页面立即同步；同时写入本地缓存，应用重启后保持。
class FileViewModeService extends GetxService {
  static const String defaultMode = 'grid';

  /// 支持的显示模式：图标 / 大图标 / 列表
  static const List<String> supportedModes = ['grid', 'large_grid', 'list'];

  static FileViewModeService get instance => Get.find<FileViewModeService>();

  static FileViewModeService ensure() {
    if (Get.isRegistered<FileViewModeService>()) {
      return Get.find<FileViewModeService>();
    }
    return Get.put(FileViewModeService(), permanent: true);
  }

  /// 当前显示模式，全局唯一
  final RxString mode = defaultMode.obs;

  FileViewModeService() {
    final cached = _readMode();
    if (cached != null && supportedModes.contains(cached)) {
      mode.value = cached;
    }
  }

  String? _readMode() {
    try {
      return CacheManager().getString(CacheKeys.fileViewMode);
    } catch (_) {
      return null;
    }
  }

  /// 切换显示模式（非法值忽略），并持久化到本地
  void setMode(String next) {
    if (!supportedModes.contains(next) || next == mode.value) return;
    mode.value = next;
    try {
      CacheManager().setString(CacheKeys.fileViewMode, next);
    } catch (_) {}
  }
}
