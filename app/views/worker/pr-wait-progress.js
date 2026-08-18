import { mergeCardStepView } from './merge-steps.js';

const ACTIVE_OPERATION_STATES = new Set([
  'queued',
  'running',
  'retry_pending',
  'repairing'
]);
const TERMINAL_OPERATION_STATES = new Set(['failed', 'succeeded']);

/** @type {Record<string, string>} */
const OPERATION_STATE_LABELS = {
  queued: '대기',
  running: '중',
  retry_pending: '재시도 대기',
  repairing: '자동 해결 중',
  failed: '실패',
  succeeded: '완료 · 정리 재개 대기'
};

/** @type {Record<string, { step: string, label: string }>} */
const CURSOR_STEPS = {
  base_containment: { step: 'base', label: 'base 확인 중' },
  child_sweep: { step: 'child', label: '자식 정리 중' },
  branch_cleanup: { step: 'branch', label: '브랜치 정리 중' },
  parent_close: { step: 'close', label: '부모 close 중' }
};

/** @type {Record<string, { step: string, label: string }>} */
const TRANSIENT_STEPS = {
  merging: { step: 'merge', label: '머지 중' },
  base_containment: CURSOR_STEPS.base_containment,
  child_sweep: CURSOR_STEPS.child_sweep,
  branch_cleanup: CURSOR_STEPS.branch_cleanup,
  parent_close: CURSOR_STEPS.parent_close
};

/**
 * @param {unknown} merge_sha
 */
function isMergeSha(merge_sha) {
  return typeof merge_sha === 'string' && /^[0-9a-f]{40}$/.test(merge_sha);
}

/**
 * @param {Record<string, any>} operation
 * @param {string} bead_id
 * @param {string} merge_sha
 */
function isExactOperation(operation, bead_id, merge_sha) {
  if (
    !['verify', 'deploy'].includes(operation.kind) ||
    ![...ACTIVE_OPERATION_STATES, ...TERMINAL_OPERATION_STATES].includes(
      operation.state
    ) ||
    ![null, undefined, ''].includes(operation.superseded_by) ||
    !Array.isArray(operation.subjects)
  ) {
    return false;
  }
  return operation.subjects.some(
    (subject) =>
      subject &&
      typeof subject === 'object' &&
      subject.bead_id === bead_id &&
      subject.merged_sha === merge_sha
  );
}

/**
 * Later fixed positions win first. Within one kind, live/failure evidence wins
 * over completion, then the public-card sort keys break ties.
 *
 * @param {Record<string, any>} left
 * @param {Record<string, any>} right
 */
function compareOperations(left, right) {
  const kind_difference =
    (right.kind === 'deploy' ? 2 : 1) - (left.kind === 'deploy' ? 2 : 1);
  if (kind_difference !== 0) {
    return kind_difference;
  }
  /** @param {Record<string, any>} operation */
  const stateRank = (operation) => (operation.state === 'succeeded' ? 1 : 2);
  const state_difference = stateRank(right) - stateRank(left);
  if (state_difference !== 0) {
    return state_difference;
  }
  const left_requested_at =
    typeof left.requested_at === 'number' ? left.requested_at : 0;
  const right_requested_at =
    typeof right.requested_at === 'number' ? right.requested_at : 0;
  if (left_requested_at !== right_requested_at) {
    return right_requested_at - left_requested_at;
  }
  const left_id =
    typeof left.operation_id === 'string' ? left.operation_id : '';
  const right_id =
    typeof right.operation_id === 'string' ? right.operation_id : '';
  return left_id.localeCompare(right_id);
}

/**
 * @param {Record<string, any>} operation
 * @param {boolean} [force_failure]
 * @returns {{ step: string, label: string, index: number, total: number, percent: number, active: boolean, failed: boolean }|null}
 */
function operationProgress(operation, force_failure = false) {
  const step = operation.kind;
  const name = step === 'verify' ? '검증' : '배포';
  const state = force_failure ? 'failed' : operation.state;
  const suffix = OPERATION_STATE_LABELS[state];
  if (!suffix) {
    return null;
  }
  const projected = mergeCardStepView(step, `${name} ${suffix}`);
  return projected
    ? {
        ...projected,
        active: ACTIVE_OPERATION_STATES.has(state),
        failed: state === 'failed'
      }
    : null;
}

/**
 * @param {unknown} merge_progress
 */
function transientStep(merge_progress) {
  if (!merge_progress || typeof merge_progress !== 'object') {
    return null;
  }
  const record = /** @type {Record<string, any>} */ (merge_progress);
  const step = TRANSIENT_STEPS[record.step];
  return step || null;
}

/**
 * Project the current post-merge card state from exact public snapshot facts.
 *
 * @param {{ bead_id?: unknown, merge_sha?: unknown, cleanup_cursor?: unknown, merge_progress?: unknown, cleanup_failed?: unknown, repo_operations?: unknown }} input
 * @returns {{ step: string, label: string, index: number, total: number, percent: number, active: boolean, failed: boolean }|null}
 */
export function prWaitProgress(input) {
  if (!input || typeof input.bead_id !== 'string') {
    return null;
  }

  const bead_id = input.bead_id;
  const transient_progress =
    input.merge_progress && typeof input.merge_progress === 'object'
      ? /** @type {Record<string, any>} */ (input.merge_progress)
      : {};
  const merge_progress = transientStep(transient_progress);
  const cleanup_failed =
    input.cleanup_failed && typeof input.cleanup_failed === 'object'
      ? /** @type {Record<string, any>} */ (input.cleanup_failed)
      : null;
  const cursor_after_repo_operations = [
    'child_sweep',
    'branch_cleanup',
    'parent_close'
  ].includes(
    typeof input.cleanup_cursor === 'string' ? input.cleanup_cursor : ''
  );
  const repo_operations_stage =
    !cursor_after_repo_operations &&
    (input.cleanup_cursor === 'repo_operations' ||
      transient_progress.step === 'repo_operations' ||
      cleanup_failed?.step === 'repo_operations');
  const merge_sha = isMergeSha(input.merge_sha)
    ? /** @type {string} */ (input.merge_sha)
    : null;

  /** @type {Record<string, any>[]} */
  const exact_operations =
    repo_operations_stage && merge_sha && Array.isArray(input.repo_operations)
      ? input.repo_operations
          .filter(
            (operation) =>
              operation &&
              typeof operation === 'object' &&
              isExactOperation(operation, bead_id, merge_sha)
          )
          .sort(compareOperations)
      : [];

  const active_operation = exact_operations.find((operation) =>
    ACTIVE_OPERATION_STATES.has(operation.state)
  );
  if (active_operation) {
    return operationProgress(active_operation);
  }

  if (cleanup_failed) {
    if (cleanup_failed.step === 'repo_operations' && exact_operations[0]) {
      return operationProgress(exact_operations[0], true);
    }
    return null;
  }

  const terminal_operation = exact_operations.find((operation) => {
    if (!TERMINAL_OPERATION_STATES.has(operation.state)) {
      return false;
    }
    return (
      operation.state !== 'succeeded' ||
      input.cleanup_cursor === 'repo_operations'
    );
  });
  if (terminal_operation) {
    return operationProgress(terminal_operation);
  }

  if (merge_progress) {
    const projected = mergeCardStepView(
      merge_progress.step,
      merge_progress.label
    );
    return projected ? { ...projected, active: true, failed: false } : null;
  }

  const cursor =
    typeof input.cleanup_cursor === 'string'
      ? CURSOR_STEPS[input.cleanup_cursor]
      : null;
  if (!cursor) {
    return null;
  }
  const projected = mergeCardStepView(cursor.step, cursor.label);
  return projected ? { ...projected, active: true, failed: false } : null;
}

/**
 * Whether the projected state still owns post-merge cleanup and must block a
 * conflicting discard.
 *
 * @param {ReturnType<typeof prWaitProgress>} progress
 */
export function isPrWaitCleanupActive(progress) {
  return !!progress && progress.step !== 'merge' && progress.failed !== true;
}
