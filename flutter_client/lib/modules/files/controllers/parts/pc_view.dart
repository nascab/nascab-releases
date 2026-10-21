part of '../pc_file_explorer_controller.dart';

extension PcFileExplorerViewMode on PcFileExplorerController {
  /// 获取文件类型字符串
  String getFileTypeStr(String type) {
    switch (type) {
      case 'dir':
        return 'dir'.tr;
      case 'image':
        return 'file_type_image'.tr;
      case 'video':
        return 'file_type_video'.tr;
      case 'archive':
        return 'file_type_archive'.tr;
      default:
        return 'file'.tr;
    }
  }

  /// 切换视图模式（与手机端共用同一份全局状态，并持久化到本地）
  void toggleViewMode(String mode) {
    FileViewModeService.instance.setMode(mode);
  }
}
