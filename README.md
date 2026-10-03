# 空间声像工作台 · Spatial Audio Workbench

纯浏览器运行的多声轨 HRTF 空间声像试听台：**React + TypeScript + Three.js + Web Audio API**。
音频文件只保存在本机 IndexedDB，**从不上传**，也不需要任何后端。

## 启动

```bash
npm install
npm run dev      # 开发
npm run build    # 类型检查 + 生产构建
npm test         # 空间数学/样例/音频图/自动化行为测试（46 项）
```

## 每轨空间自动化

每条声轨自带一条**空间自动化轨**（在轨道行“空间自动化”展开）：

- 关键帧以**工程相对时间**（秒）保存，可记录已存在参数：**位置**、**声源朝向（yaw/pitch）**、**轨道增益**
- 每帧有**稳定 id**，轨内按时间严格递增，lane 自带结构 `version`；每次提交/删除/移动/清空都生成
  **单调递增的 revision 与不可变审计记录**（面板“版本审计”可逐条查看，可撤销）
- **同一时刻冲突提交一律被拒绝**（报错并保留原轨）；把关键帧拖到会**反转既有顺序**的时刻也会被拒绝——绝不静默重排
- 播放时由调度器以 **AudioContext 时钟**（`setValueAtTime` / `linearRampToValueAtTime`）提前 0.35s
  排入 `PannerNode.position/orientation` 与 `trackGain`：移动只写 AudioParam，**绝不重启 BufferSource**
- 朝向因 PannerNode 只暴露 orientation 向量，按 40Hz 重采样为前向向量序列；该向量与 2D 俯视图、
  3D 场景、方位角读数共用同一个 `forwardVector`，二维/三维/左右声道语义严格一致
- 播放中的 2D/3D 拖拽与增益推子是**明确的临时覆盖**（黄色横幅）：选“取消”立即回到计划轨迹，
  原自动化不变；选“提交”才在当前媒体时间生成带新版本号的关键帧（同刻冲突仍被拒绝）
- 循环、暂停后 seek、再次播放：每 tick 先 `cancelScheduledValues` 再按未回绕工程时间重排，
  旧调度随节点销毁，不叠加、不重复发声

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

- 3D：拖彩色球移动声源（白色小锥指示声源朝向）、拖白色听者移动位置；右侧面板精确编辑坐标与 yaw/pitch
- 2D：俯视图拖点移动、拖听者前向圆环手柄旋转朝向；声源的白线是其朝向
- 每轨有播放/暂停/停止/进度跳转/循环/M/S/增益与距离增益读数；展开“空间自动化”打帧、移动帧、撤销与看版本审计

## 持久化

- 布局、参数与**全部自动化轨（关键帧 + 版本审计历史）**防抖自动写入 IndexedDB `session`；文件 Blob 存独立 `blobs` 仓
- 可“另存工程”为多条具名工程（v1 旧工程载入时自动迁移补 `automation` 与 `orientation`）
- **重载/载入工程只恢复配置，播放一律停止，绝不自动播放**；文件轨在下次解锁后重新本地解码，
  未解码或解码失败的声轨只单独标错，不会阻断其他声轨，也不会触发自动开播
