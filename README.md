# 空间声像工作台 · Spatial Audio Workbench

纯浏览器运行的多声轨 HRTF 空间声像试听台：**React + TypeScript + Three.js + Web Audio API**。
音频文件只保存在本机 IndexedDB，**从不上传**，也不需要任何后端。

## 启动

```bash
npm install
npm run dev      # 开发
npm run build    # 类型检查 + 生产构建
npm test         # 空间数学/样例/音频图/自动化轨行为测试（41 项）
```

## 坐标系与左右含义（三个视图严格一致）

世界采用右手坐标系，单位为米：

- **+X = 听者右方**（屏幕右）；**−X = 左**
- **+Y = 上**
- **听者 yaw=0 时朝向 −Z（屏幕深处=正前）；+Z = 听者身后**
- **yaw 正值 = 听者向右转身**（+90° 时前方变为世界 +X）；pitch 正值 = 抬头
- 声源方位角：**正值=右偏（右耳更响），负值=左偏**，0=正前，±180°=正后
- 同一套数值同时写入 `PannerNode` / `AudioListener`（Web Audio）与 Three.js 场景 / 2D 俯视图

## 音频链

```
BufferSource →(立体声文件经 ChannelSplitter 选原始 L/R 声道)
  → trackGain(Mute) → PannerNode(HRTF, inverse/linear/exponential 明确距离模型)
  → soloBus / muteBus(0) → busGain(总线) → masterGain(主输出)
  → PeakMeter(AudioWorklet 逐采样峰值+削波) → destination
```

- **移动声源只更新 PannerNode 的 position AudioParam（setTargetAtTime 平滑），不 stop/start，音轨不重启**
- **每轨空间自动化**：关键帧以工程相对时间保存位置 / 方向 / 轨道增益；由 AudioContext
  时钟 + 25ms/0.3s 前瞻调度器向 PannerNode / GainNode 的 AudioParam 下发
  `setValueAtTime`（阶梯/循环边界）与 `linearRampToValueAtTime`（段内插值）。
  调度只写 AudioParam，**绝不重启 BufferSource**，seek/暂停/循环重 arm 时旧事件经
  `cancelScheduledValues` 取消，不叠加、不重复发声
- **关键帧纪律**：稳定 id（编辑保持 id）、按时间严格升序、时间唯一、轨结构版本
  `schema` + 内容版本 `revision`；同刻提交（DUP_TIME）或逆序移动（ORDER_VIOLATION）
  一律显式拒绝并保留原轨，**绝不静默重排**
- **播放中拖拽 = 明确的临时覆盖**：取消未发生的自动化事件并实时接管，原关键帧不被
  篡改；选择「取消」在当前播放头重新锚定计划轨迹，选择「提交」才新增关键帧并产生
  revision+1 的可审计版本（同刻提交仍被拒绝）。撤销/重放历史与工程一同持久化
- 静音 = 该轨增益 0；独奏时非独奏轨物理切到增益 0 的 muteBus，真实不可闻
- 总线增益、主增益都在实际输出链上
- 峰值表串联在 master 与 destination 之间逐采样检测（Worklet 不可用时回退 Analyser 时域块），≥1.0 锁存 CLIP
- `AudioContext` 必须在用户手势中解锁；解锁失败有独立错误态。文件解码失败按轨标记“解码失败”，不影响其他轨
- 立体声文件通过 ChannelSplitter 显式选择**文件原始左/右声道**作为 HRTF 单声道输入

## 内置检查样例（全部本地合成）

- **脉冲**：三声 1200Hz 短脉冲，逐次辨别 HRTF 左右方位
- **单音**：持续 440Hz，检查稳定声像与距离衰减
- **双声源 A+B**：两条逐采样完全相同的声轨（同一种子合成），放于 ±X 验证左右内容同步、无相位漂移

“全部播放”在同一 AudioContext 时钟上调度，可直接对比同步。

## 操作

- 3D：拖彩色球移动声源、拖白色听者移动位置；右侧面板精确编辑坐标
- 2D：俯视图拖点移动、拖听者前向圆环手柄旋转朝向
- 每轨有播放/暂停/停止/进度跳转/循环/M/S/增益与距离增益读数
- 每轨「空间自动化」轨：点时间轴空白或「＋此处」添加关键帧（时间/位置/增益可编辑、
  可删帧、清空、撤销/重做）；播放中 2D/3D/方位读数与实际 PannerNode 同源同步；
  播放中拖拽出现覆盖横幅，可「取消（回轨迹）」或「提交为关键帧」

## 持久化

- 布局、参数、**每轨自动化轨与撤销历史**防抖自动写入 IndexedDB `session`；文件 Blob 存独立 `blobs` 仓
- 可“另存工程”为多条具名工程（v1 工程读取时自动迁移为 v2）
- **重载/载入工程只恢复参数，播放一律停止，绝不自动播放**；文件轨在下次解锁后重新本地解码
- 未解码 / 解码失败的音轨只标记本轨状态，不阻断其他轨，也不会触发自动开播
