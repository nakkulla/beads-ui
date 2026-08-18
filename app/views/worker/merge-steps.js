/**
 * The merge-card and cleanup-cursor vocabularies shared by the lane rows and
 * the repo-ops timeline (UI-q0uy §4.4, UI-20gk).
 *
 * It lives in its own module because two views need it and neither may import
 * the other: `index.js` renders the in-flight merge progress, and
 * `repo-ops-timeline.js` renders the five-step cleanup stepper. The client keeps
 * its own copy of the server order on purpose — a view must not import server
 * code — and an unknown step still renders by its raw name rather than blanking
 * the row.
 */

/**
 * The card's fixed semantic positions. Optional verify/deploy declarations do
 * not renumber later lifecycle work.
 *
 * @type {Array<{ step: string, label: string, index: number }>}
 */
export const MERGE_STEPS = [
  { step: 'merge', label: '머지', index: 1 },
  { step: 'base', label: 'base', index: 2 },
  { step: 'verify', label: '검증', index: 3 },
  { step: 'deploy', label: '배포', index: 4 },
  { step: 'child', label: '자식', index: 5 },
  { step: 'branch', label: '브랜치', index: 6 },
  { step: 'close', label: 'close', index: 7 }
];

/**
 * The POST-merge cleanup cursor alone — the merge itself is not one of its
 * steps, so the stepper a stopped cleanup draws has five pips, not six.
 *
 * @type {Array<{ step: string, label: string }>}
 */
export const CLEANUP_STEPS = [
  { step: 'base_containment', label: 'base 포함 확인' },
  { step: 'repo_operations', label: '저장소 작업' },
  { step: 'child_sweep', label: '자식 정리' },
  { step: 'branch_cleanup', label: '브랜치 정리' },
  { step: 'parent_close', label: '부모 close' }
];

/** @type {Record<string, { step: string, label: string }>} */
const MERGE_PROGRESS_STEPS = {
  merging: { step: 'merge', label: '머지 중' },
  base_containment: { step: 'base', label: 'base 확인 중' },
  child_sweep: { step: 'child', label: '자식 정리 중' },
  branch_cleanup: { step: 'branch', label: '브랜치 정리 중' },
  parent_close: { step: 'close', label: '부모 close 중' }
};

/**
 * Project one fixed card step with a caller-owned status label.
 *
 * @param {string} step
 * @param {string} label
 * @returns {{ step: string, label: string, index: number, total: number, percent: number }|null}
 */
export function mergeCardStepView(step, label) {
  const found = MERGE_STEPS.find((entry) => entry.step === step);
  if (!found) {
    return null;
  }
  const total = MERGE_STEPS.length;
  return {
    step: found.step,
    label,
    index: found.index,
    total,
    percent: Math.round((found.index / total) * 100)
  };
}

/**
 * Project a merge step onto what a row draws: its Korean label, its position in
 * the sequence, and how far along the bar is.
 *
 * The counter is not decoration — this is an ORDERED sequence with a known
 * length, so `4/6` tells a reader how much is left, which "머지 중…" alone
 * cannot. A step the client does not know still shows, with no counter: a server
 * that grew a step must not blank the row.
 *
 * @param {string|null|undefined} step
 * @returns {{ label: string, index: number, total: number, percent: number }|null}
 */
export function mergeStepView(step) {
  if (typeof step !== 'string' || step.length === 0) {
    return null;
  }
  const total = MERGE_STEPS.length;
  if (step === 'repo_operations') {
    return { label: '저장소 작업', index: 0, total, percent: 0 };
  }
  const mapped = MERGE_PROGRESS_STEPS[step];
  if (!mapped) {
    return { label: step, index: 0, total, percent: 0 };
  }
  const projected = mergeCardStepView(mapped.step, mapped.label);
  return projected
    ? {
        label: projected.label,
        index: projected.index,
        total: projected.total,
        percent: projected.percent
      }
    : null;
}

/**
 * The five cleanup pips with the stopped one marked. Steps before the stop are
 * done, the stop itself is `stall`, and everything after is unreached. An
 * unknown step leaves every pip unreached rather than guessing a position — the
 * cursor is a contract the client only consumes.
 *
 * @param {string|null|undefined} stopped_step
 * @returns {Array<{ step: string, label: string, state: 'done'|'stall'|'todo' }>}
 */
export function cleanupStepperView(stopped_step) {
  const stopped_index = CLEANUP_STEPS.findIndex(
    (entry) => entry.step === stopped_step
  );
  return CLEANUP_STEPS.map((entry, index) => ({
    step: entry.step,
    label: entry.label,
    state:
      stopped_index < 0
        ? 'todo'
        : index < stopped_index
          ? 'done'
          : index === stopped_index
            ? 'stall'
            : 'todo'
  }));
}

/**
 * The human label for a cleanup step, or the raw token when the client does not
 * know it (fail-quiet, AGENTS.md).
 *
 * @param {string|null|undefined} step
 * @returns {string}
 */
export function cleanupStepLabel(step) {
  const found = CLEANUP_STEPS.find((entry) => entry.step === step);
  return found ? found.label : typeof step === 'string' ? step : '';
}

/**
 * `N단계 중 M단계` for a stopped cleanup, or null when the step is not one this
 * client knows — a made-up position would be worse than no counter.
 *
 * @param {string|null|undefined} step
 * @returns {{ index: number, total: number }|null}
 */
export function cleanupStepPosition(step) {
  const index = CLEANUP_STEPS.findIndex((entry) => entry.step === step);
  return index < 0 ? null : { index: index + 1, total: CLEANUP_STEPS.length };
}

/**
 * The one sentence both the Worker row and the Monitor mirror put under a
 * stopped cleanup. Kept here so the two cannot drift (§4.4).
 *
 * @param {string|null|undefined} step
 * @returns {string}
 */
export function cleanupStalledReason(step) {
  const position = cleanupStepPosition(step);
  return position
    ? `머지 완료 · 정리 ${position.total}단계 중 ${position.index}단계에서 멈춤`
    : '머지됨 · 정리 미완';
}
