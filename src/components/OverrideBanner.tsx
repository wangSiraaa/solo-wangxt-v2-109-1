import type { AutomationParam, Track } from '../types';
import type { WorkbenchApi } from '../state/useWorkbench';
import { paramLabel } from '../lib/automation';

interface Props {
  track: Track;
  api: WorkbenchApi;
}

const PARAM_LABEL: Record<AutomationParam, string> = {
  position: '位置',
  orientation: '朝向',
  gain: '增益',
};

/**
 * 播放中人工拖拽后的明确二选一：
 *  - 取消：立即回到该时刻的计划轨迹，自动化原轨不变
 *  - 提交：在当前媒体时间写入新关键帧；同刻冲突会被拒绝（显示原因），原轨保留
 */
export function OverrideBanner({ track, api }: Props) {
  const ov = api.overrides.get(track.id);
  if (!ov || ov.params.length === 0) return null;
  const media = api.live?.get(track.id)?.mediaTime ?? 0;

  const submit = (p: AutomationParam) => {
    const res = api.commitOverride(track.id, p);
    if (!res.ok) window.alert(`提交被拒绝，原自动化已保留：\n${res.error}`);
  };

  return (
    <div className="override-banner">
      <span className="override-title">
        临时覆盖：{ov.params.map((p) => PARAM_LABEL[p]).join('、')} @{media.toFixed(2)}s
      </span>
      {ov.params.map((p) => (
        <span key={p} className="override-actions">
          <button className="btn mini" onClick={() => submit(p)}>
            提交{paramLabel(p)}为新帧
          </button>
          <button className="btn mini ghost" onClick={() => api.cancelOverride(track.id, p)}>
            取消{paramLabel(p)}
          </button>
        </span>
      ))}
      <button className="btn mini ghost" onClick={() => api.cancelAllOverrides(track.id)}>
        全部取消（回轨迹）
      </button>
    </div>
  );
}
