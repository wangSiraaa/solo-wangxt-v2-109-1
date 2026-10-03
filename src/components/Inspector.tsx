import type { Orientation, Vec3 } from '../types';
import type { WorkbenchApi } from '../state/useWorkbench';

function NumberField({
  label,
  value,
  step = 0.1,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  step?: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <label className="num-field" title={hint}>
      <span>{label}</span>
      <input
        type="number"
        step={step}
        value={Number.isFinite(value) ? Number(value.toFixed(3)) : 0}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

/**
 * 选中声源的精确坐标编辑（与拖拽同一数据源）。
 * 播放自动化时显示的是引擎实际读数（与 2D/3D/方位一致），编辑即人工覆盖。
 */
export function Inspector({ api }: { api: WorkbenchApi }) {
  const track = api.doc.tracks.find((t) => t.id === api.selectedId);
  if (!track) {
    return (
      <div className="panel inspector empty">
        <p>在 3D 场景或 2D 俯视图中点击一个声源以编辑精确坐标。</p>
        <p className="muted">
          坐标约定：<b>+X 右</b>、<b>+Y 上</b>、<b>+Z 后</b>；听者 yaw=0 时朝向 <b>-Z（前方）</b>。
          声源在听者右侧时右耳更响。
        </p>
      </div>
    );
  }

  const live = api.live?.get(track.id);
  const ov = api.overrides.get(track.id)?.params ?? [];
  // 覆盖中的参数编辑 doc 值；未覆盖的参数显示 live 实际读数
  const position: Vec3 = !ov.includes('position') && live?.position ? live.position : track.position;
  const orientation: Orientation =
    !ov.includes('orientation') && live?.orientation ? live.orientation : track.orientation;
  const isLive = !!(live && (live.position || live.orientation));

  const setPos = (patch: Partial<Vec3>) =>
    api.moveTrack(track.id, { ...track.position, ...patch });
  const setOri = (patch: Partial<Orientation>) =>
    api.setOrientation(track.id, { ...track.orientation, ...patch });

  const commitFrameHere = (param: 'position' | 'orientation' | 'gain') => {
    const time = live?.mediaTime ?? 0;
    const planned = api.plannedAt(track, time);
    const res =
      param === 'position'
        ? api.commitFrame(track.id, { time, param, position })
        : param === 'orientation'
          ? api.commitFrame(track.id, { time, param, orientation })
          : api.commitFrame(track.id, { time, param, gain: track.gain });
    void planned;
    if (!res.ok) window.alert(`关键帧提交被拒绝，原自动化已保留：\n${res.error}`);
  };

  return (
    <div className="panel inspector">
      <div className="panel-title">
        <span className="track-color" style={{ background: track.color }} />
        声源参数 · {track.name}
        {isLive && <span className="live-badge">播放中实际值</span>}
      </div>
      <div className="num-grid">
        <NumberField label="X 右 (m)" value={position.x} onChange={(x) => setPos({ x })} />
        <NumberField label="Y 上 (m)" value={position.y} onChange={(y) => setPos({ y })} />
        <NumberField label="Z 后 (m)" value={position.z} onChange={(z) => setPos({ z })} />
      </div>
      <div className="num-grid">
        <NumberField
          label="yaw 右转 (°)"
          step={1}
          value={(orientation.yaw * 180) / Math.PI}
          onChange={(deg) => setOri({ yaw: (deg * Math.PI) / 180 })}
        />
        <NumberField
          label="pitch 抬头 (°)"
          step={1}
          value={(orientation.pitch * 180) / Math.PI}
          onChange={(deg) => setOri({ pitch: (deg * Math.PI) / 180 })}
        />
      </div>
      <label className="num-field wide">
        <span>名称</span>
        <input
          type="text"
          value={track.name}
          onChange={(e) => api.updateTrack(track.id, { name: e.target.value })}
        />
      </label>
      <div className="inspector-kf-actions">
        <span className="muted small">播放头 {((live?.mediaTime ?? 0)).toFixed(2)}s：</span>
        <button className="btn mini" onClick={() => commitFrameHere('position')}>
          打位置帧
        </button>
        <button className="btn mini" onClick={() => commitFrameHere('orientation')}>
          打朝向帧
        </button>
        <button className="btn mini" onClick={() => commitFrameHere('gain')}>
          打增益帧
        </button>
      </div>
      <p className="muted small">
        播放中修改坐标/朝向/增益属于<b>临时覆盖</b>：可用每轨自动化区的“取消”回到计划轨迹，
        或“提交”在当前时刻生成带新版本号的关键帧。
      </p>
    </div>
  );
}
