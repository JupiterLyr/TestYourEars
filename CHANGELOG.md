# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).</br>

---

## [1.3.0]
### Added
- 加入大标题
### Fixed
- 优化了部分布局
- 将两个卡片的高度设为一致
### Issue
- 当前版本仅支持中文，未来可能会加入语言切换的功能

## [1.2.0]
### Added
- 将面板拆解为两部分，左侧为设置面板，右侧为显示与启停控制
- 加入喇叭图标，直观呈现播放状态
- 加入了音分计算及呈现功能
### Fixed
- 拖动手柄的频率选择机制从线性变化优化为对数变化，目前频率精度为整数
- 将最大振幅限制在 -6dB
### Issue
- 部分音高无法通过频率的整数加减获得

## [1.1.0]
### Added
- 加入了波形选择下拉框
- 加入了拖动手柄，能够快速变换频率
### Fixed
- 从默认播放三秒改为两个按钮，随时控制启动和停止
### Deprecated
- 未来将弃用基础版本的频率限制，改用基于十二平均律的计算方式

## [1.0.0]
- 基础功能完全实现
- 可以手动输入频率和振幅，默认播放三秒