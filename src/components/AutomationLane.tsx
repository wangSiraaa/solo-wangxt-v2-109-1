import { useMemo, useState } from 'react';
import type { AutomationLane as LaneT, AutomationParam, Track } from '../types';
import type { WorkbenchApi } from '../state/useWorkbench';
import { paramLabel } from '../lib/automation';
import { gainToDb } from '../lib/spatial';

interface Props {
  track: Track;
  api: WorkbenchApi;
  /** 当前播放进度（秒），用于在迷你时间轴画播放头与“此刻打帧” */
  progress: number;
}

const PARAM_COLOR: Record<AutomationParam, string> = {
  position: '#7fd1ff',
  orientation: '#a78bfa',
  gain: '#ffe066',
};

function fmtTime(t: number): string {
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${s.toFixed(2).padStart(5, '0')}`;
}

/**
 * 每轨空间自动化轨：
 *  - 迷你时间轴展示关键帧（位置/朝向/增益三色）、播放头
 *  - “在当前时刻打帧”把该轨当前（可能正在被临时覆盖的）值提交为关键帧
 *  - 同刻冲突被领域层拒绝，这里显示错误且原轨不动
 *  - 最近版本（审计）可逐条查看，撤销生成新的 undo 版本
 */
export function AutomationLanePanel({ track, api, progress }: Props) {
  const lane: LaneT = api.lane(track.id);
  const [open, setOpen] = useState(false);
  const [manualTime, setManualTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  const timelineMax = useMemo(() => {
    const lastFrame = lane.keyframes.length ? lane.keyframes[lane.keyframes.length - 1].time : 0;
    return Math.max(track.duration ?? 0, lastFrame, 1);
  }, [lane.keyframes, track.duration]);

  const showError = (msg: string) => {
    setError(msg);
    window.setTimeout(() => setError(null), 2600);
  };

  const commitAt = (time: number, param: AutomationParam) => {
    // 提交的是“此刻实际值”：有该参数的临时覆盖时取覆盖值（track 当前值），
    // 否则取计划曲线在该时刻的值（无帧时回退到声轨静态基线）。
    const overridden = api.overrides.get(track.id)?.params.includes(param);
    const value = overridden
      ? { position: track.position, orientation: track.orientation, gain: track.gain }
      : api.plannedAt(track, Math.max(0, time));
    const res = api.commitFrame(
      track.id,
      param === 'position'
        ? { time, param, position: value.position }
        : param === 'orientation'
          ? { time, param, orientation: value.orientation }
          : { time, param, gain: value.gain },
    );
    if (!res.ok) showError(res.error ?? '提交被拒绝');
    else if (overridden) api.cancelOverride(track.id, param);
  };

  const pct = (t: number) => `${Math.min(100, (t / timelineMax) * 100)}%`;

  const lastRevisions = lane.revisions.slice(-5).reverse();

  return (
    <div className="automation-lane">
      <div className="lane-head">
        <button className="lane-toggle" onClick={() => setOpen((v) => !v)}>
          {open ? '▾' : '▸'} 空间自动化
          <span className="lane-count">{lane.keyframes.length} 帧 · v{lane.revisionSeq}</span>
        </button>
        <label className="lane-enable" title="停用后播放回到声轨静态参数（关键帧保留）">
          <input
            type="checkbox"
            checked={lane.enabled}
            onChange={(e) => api.setLaneEnabled(track.id, e.target.checked)}
          />
          启用
        </label>
      </div>

      {error && <div className="lane-error">⛔ {error}</div>}

      {open && (
        <div className="lane-body">
          <div className="lane-actions">
            <button className="btn mini" onClick={() => commitAt(progress, 'position')}>
              ＋位置帧 @{fmtTime(progress)}
            </button>
            <button className="btn mini" onClick={() => commitAt(progress, 'orientation')}>
              ＋朝向帧
            </button>
            <button className="btn mini" onClick={() => commitAt(progress, 'gain')}>
              ＋增益帧
            </button>
            <button
              className="btn mini ghost"
              onClick={() => {
                const res = api.undoAutomation(track.id);
                if (!res.ok) showError(res.error ?? '无可撤销版本');
              }}
            >
              ↶ 撤销
            </button>
            <button
              className="btn mini ghost danger"
              onClick={() => {
                if (confirm('清空该轨全部关键帧？（可撤销）')) {
                  const res = api.clearFrames(track.id);
                  if (!res.ok) showError(res.error ?? '清空失败');
                }
              }}
            >
              清空
            </button>
          </div>

          <div className="lane-time-input">
            <input
              type="number"
              min={0}
              step={0.1}
              placeholder="时间(秒)"
              value={manualTime}
              onChange={(e) => setManualTime(e.target.value)}
            />
            <button
              className="btn mini"
              onClick={() => {
                const t = Number(manualTime);
                if (!Number.isFinite(t) || t < 0) {
                  showError('请输入非负时间（秒）');
                  return;
                }
                commitAt(t, 'position');
              }}
            >
              在该时刻打位置帧
            </button>
          </div>

          <div className="lane-timeline" title="关键帧时间轴（拖拽数字可改时间）">
            {lane.keyframes.map((k) => (
              <div
                key={k.id}
                className="lane-kf"
                style={{ left: pct(k.time), borderColor: PARAM_COLOR[k.param] }}
                title={`${paramLabel(k.param)} @ ${k.time.toFixed(3)}s（id ${k.id}）`}
              >
                <span className="lane-kf-dot" style={{ background: PARAM_COLOR[k.param] }} />
                <input
                  className="lane-kf-time"
                  type="number"
                  min={0}
                  step={0.05}
                  defaultValue={Number(k.time.toFixed(3))}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') e.stopPropagation();
                  }}
                  onChange={(e) => {
                    const t = Number(e.target.value);
                    if (Number.isFinite(t)) {
                      const res = api.moveFrame(track.id, k.id, Math.max(0, t));
                      if (!res.ok) showError(res.error ?? '移动被拒绝');
                    }
                  }}
                />
                <button
                  className="lane-kf-del"
                  onClick={() => {
                    const res = api.deleteFrame(track.id, k.id);
                    if (!res.ok) showError(res.error ?? '删除失败');
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <div className="lane-playhead" style={{ left: pct(Math.min(progress, timelineMax)) }} />
          </div>

          <div className="lane-legend">
            <span><i style={{ background: PARAM_COLOR.position }} />位置</span>
            <span><i style={{ background: PARAM_COLOR.orientation }} />朝向</span>
            <span><i style={{ background: PARAM_COLOR.gain }} />增益</span>
          </div>

          <ul className="lane-frames">
            {lane.keyframes.map((k) => (
              <li key={k.id} className="lane-frame-row">
                <span className="lane-frame-param" style={{ color: PARAM_COLOR[k.param] }}>
                  {paramLabel(k.param)}
                </span>
                <span className="lane-frame-time">{k.time.toFixed(3)}s</span>
                <span className="lane-frame-value">
                  {k.param === 'position'
                    ? `x${k.position!.x.toFixed(2)} y${k.position!.y.toFixed(2)} z${k.position!.z.toFixed(2)}`
                    : k.param === 'orientation'
                      ? `yaw ${((k.orientation!.yaw * 180) / Math.PI).toFixed(0)}° pitch ${((k.orientation!.pitch * 180) / Math.PI).toFixed(0)}°`
                      : gainToDb(k.gain!)}
                </span>
                <button
                  className="btn mini ghost danger"
                  onClick={() => {
                    const res = api.deleteFrame(track.id, k.id);
                    if (!res.ok) showError(res.error ?? '删除失败');
                  }}
                >
                  删
                </button>
              </li>
            ))}
            {lane.keyframes.length === 0 && <li className="muted small">还没有关键帧。播放时声源将保持静态参数。</li>}
          </ul>

          {lastRevisions.length > 0 && (
            <details className="lane-history">
              <summary className="muted small">版本审计（最近 {lastRevisions.length} 条 / 共 {lane.revisions.length}）</summary>
              <ul>
                {lastRevisions.map((r) => (
                  <li key={r.id} className="lane-rev">
                    <b>v{r.revision}</b>
                    <span className={`lane-rev-action ${r.action}`}>{r.action}</span>
                    <span>{r.summary}</span>
                    <span className="muted">{new Date(r.at).toLocaleTimeString()}</span>
                    {r.reverts && <span className="muted">↩ {r.reverts.slice(0, 10)}</span>}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
