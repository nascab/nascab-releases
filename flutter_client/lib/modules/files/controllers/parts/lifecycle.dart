part of '../file_controller.dart';

extension FileControllerLifecycle on FileController {
  void _onControllerInit() {
    // 确保全局显示模式服务已注册并完成本地读取
    FileViewModeService.ensure();
    _fileWatcher = FileWatcherService(onFileChange: _handleFileChange);
    _loadSortMode();
    _loadShowHidden();
    if (autoLoadRoot) {
      listDirectory('', null, sourceType: initialSourceType);
    }
  }

  void _onControllerClose() {
    _fileWatcher.disconnect();
    _globalSearchDebounce?.cancel();
    _globalSearchDebounce = null;
  }

  void _handleFileChange(Map<String, dynamic> data) {
    final changeDir = data['changeDir']?.toString();
    if (changeDir != null && currentPath.value != null) {
      if (changeDir != currentPath.value) {
        print("当前目录和变动目录不符，忽略更新");
        return;
      }
    }

    final added = (data['added'] as List?) ?? [];
    final removed = (data['removed'] as List?) ?? [];

    // Update items
    // Remove removed items
    if (removed.isNotEmpty) {
      final removedPaths = removed.map((e) => e.toString()).toSet();
      items.removeWhere((item) => removedPaths.contains(item['path']));
    }

    // Add added items
    if (added.isNotEmpty) {
      for (var item in added) {
        final mapItem = Map<String, dynamic>.from(item);

        final index = items.indexWhere((e) => e['path'] == mapItem['path']);
        if (index >= 0) {
          items[index] = mapItem;
        } else {
          items.add(mapItem);
        }
      }
    }

    if (added.isNotEmpty || removed.isNotEmpty) {
      applySort();
    }
  }
}
