/**
 * The shared discard projection, its confirmation / completion sentences and
 * the quick-fix landing test — moved from `views/worker/lanes.js` (UI-dbn6
 * Phase 1) so Worker, Monitor and the pipeline screen say the same thing.
 * Pure: no template.
 */
import { discardOperationActive } from '../../server/worker/discard-phase.js';

/**
 * Convert durable discard phases into the small, restart-safe vocabulary both
 * Worker and Monitor render. Unknown phases remain visible instead of being
 * misrepresented as completion.
 *
 * @param {string|null|undefined} phase
 * @returns {string}
 */
export function discardPhaseLabel(phase) {
  if (!phase || phase === 'requested') {
    return '백업 중';
  }
  if (phase === 'abandoned') {
    return '폐기 포기됨';
  }
  if (phase === 'backup_verified' || phase === 'signaled') {
    return 'runner 종료 중';
  }
  if (phase === 'merged_revert' || phase.startsWith('revert_')) {
    return 'revert PR 대기';
  }
  if (phase.startsWith('rollback_')) {
    return '원복 배포 중';
  }
  if (
    phase === 'runner_terminated' ||
    phase.startsWith('pr_') ||
    phase.includes('ref_') ||
    phase.includes('worktree') ||
    phase.startsWith('bead_')
  ) {
    return 'PR 정리 중';
  }
  return `폐기 처리 중 (${phase})`;
}

/**
 * State-specific confirmation shared verbatim by Worker and Monitor.
 *
 * @param {string} bead_id
 * @param {'merged'|'unmerged'} confirmation
 * @returns {string}
 */
export function discardConfirmationMessage(bead_id, confirmation) {
  return confirmation === 'merged'
    ? `${bead_id}: 이미 merge된 구현입니다. 복구 archive를 만든 뒤 revert PR을 생성하며, 실제 원복은 사람이 그 PR을 merge한 뒤 완료됩니다. 계속할까요?`
    : `${bead_id}: 복구 archive를 만든 뒤 runner/PR/branch/worktree를 정리하고 이슈를 후보로 되돌립니다. 계속할까요?`;
}

/**
 * Describe the non-destructive abandon outcome before sending its request.
 *
 * @param {string} bead_id
 * @param {{ kind?: string }} operation
 * @returns {string}
 */
export function discardAbandonConfirmationMessage(bead_id, operation) {
  return operation.kind === 'stale_work_backup_fresh'
    ? `${bead_id}: 실패한 백업 작업을 포기합니다. 백업은 만들어지지 않았고 기존 작업은 그대로 남습니다. 계속할까요?`
    : `${bead_id}: 실패한 폐기 작업을 포기합니다. 백업과 폐기는 수행되지 않았고 bead는 폐기 이전 상태로 돌아갑니다. 계속할까요?`;
}

/**
 * Preserve why a failed discard was abandoned after its active projection
 * disappears from the card.
 *
 * @param {{ kind?: string, last_error: string }} operation
 * @returns {string}
 */
export function discardAbandonCompletionMessage(operation) {
  return operation.kind === 'stale_work_backup_fresh'
    ? `백업 포기됨 · 기존 작업은 그대로 남습니다 (원인: ${operation.last_error})`
    : `폐기 포기됨 · 폐기는 수행되지 않았습니다 (원인: ${operation.last_error})`;
}

/**
 * Preserve the terminal recovery receipt in the success toast after the
 * completed operation leaves every queue lane and active snapshot projection.
 *
 * @param {{ operation_id?: string|null, receipt?: { archive_path?: string|null, original_pr?: { url?: string|null }|null, revert_pr?: { url?: string|null }|null }|null }} result
 * @returns {string}
 */
export function discardCompletionMessage(result) {
  const parts = ['폐기 완료'];
  if (result.operation_id) {
    parts.push(`작업 ${result.operation_id}`);
  }
  if (result.receipt?.archive_path) {
    parts.push(`백업 ${result.receipt.archive_path}`);
  }
  if (result.receipt?.original_pr?.url) {
    parts.push(`원본 PR ${result.receipt.original_pr.url}`);
  }
  if (result.receipt?.revert_pr?.url) {
    parts.push(`revert PR ${result.receipt.revert_pr.url}`);
  }
  return parts.join(' · ');
}

/**
 * Add bounded recovery guidance for known discard failures. Unknown tokens
 * remain unmodified by callers (fail-quiet).
 *
 * @param {string|null|undefined} error
 * @returns {string|null}
 */
export function discardFailureGuidance(error) {
  if (error?.startsWith('orphan_gitlink_content:')) {
    const path = error.slice('orphan_gitlink_content:'.length);
    return `매핑 없는 gitlink 경로 ${path}에 내용이 있습니다 — 저장소에서 그 경로를 정리한 뒤 재시도하거나 포기하세요`;
  }
  if (error === 'dirty_submodule') {
    return '서브모듈에 미커밋 변경이나 미초기화 항목이 있습니다 — 정리 후 재시도하세요';
  }
  if (error === 'submodule_observation_failed') {
    return '서브모듈 상태를 읽지 못했습니다 (git 오류) — 워크트리에서 git 명령을 직접 확인하세요';
  }
  return null;
}

/**
 * One shared UI projection for Worker and Monitor discard affordances. The
 * server owns final admission; this only keeps both views from advertising a
 * knowingly conflicting action and keeps a failed operation retry bound to its
 * original durable operation id.
 *
 * @param {Record<string, any>|null|undefined} operations
 * @param {string} bead_id
 * @param {{ attempt_id?: string|null, external?: boolean, done?: boolean, merge_active?: boolean, merge_queued?: boolean, conflict_active?: boolean, cleanup_active?: boolean, merged?: boolean }} [input]
 * @returns {{ action: boolean, enabled: boolean, label: string, title: string, attempt_id: string|null, operation: any, progress: string|null, error: string|null, confirmation: 'merged'|'unmerged', abandon: { action: boolean, label: string, title: string } }}
 */
export function discardProjection(operations, bead_id, input = {}) {
  const list = operations && typeof operations === 'object' ? operations : {};
  const operation = Object.values(list)
    .filter(
      (/** @type {any} */ value) =>
        value && value.bead_id === bead_id && discardOperationActive(value)
    )
    .sort(
      (/** @type {any} */ left, /** @type {any} */ right) =>
        (left.requested_at || 0) - (right.requested_at || 0)
    )
    .at(-1);
  const attempt_id =
    typeof input.attempt_id === 'string' && input.attempt_id.length > 0
      ? input.attempt_id
      : typeof operation?.attempt_id === 'string'
        ? operation.attempt_id
        : null;
  const blocked_reason = input.external
    ? '외부 PR은 Worker가 소유하지 않아 폐기할 수 없습니다'
    : input.done
      ? '완료된 작업은 폐기할 수 없습니다'
      : input.merge_active
        ? '머지 진행 중 — 폐기할 수 없습니다'
        : input.merge_queued
          ? '머지 큐에 있음 — 폐기하려면 먼저 [취소]하세요'
          : input.conflict_active
            ? '충돌 해소 세션 있음 — 폐기하려면 먼저 세션을 정리하세요'
            : input.cleanup_active
              ? '정리 진행 중 — 폐기할 수 없습니다'
              : null;
  const error =
    typeof operation?.last_error === 'string' ? operation.last_error : null;
  const progress = operation ? discardPhaseLabel(operation.phase) : null;
  const stale_recovery = operation?.kind === 'stale_work_backup_fresh';
  const guidance = discardFailureGuidance(error);
  const confirmation =
    input.merged || operation?.mode === 'merged_revert' ? 'merged' : 'unmerged';
  return {
    action: !input.external && !input.done,
    enabled: !blocked_reason && (!operation || !!error),
    label: stale_recovery
      ? error
        ? '백업 정리 재시도'
        : '백업 후 새로 시작'
      : error
        ? '재시도'
        : '폐기',
    title:
      blocked_reason ||
      (error
        ? guidance
          ? `폐기 실패: ${error} — ${guidance}`
          : stale_recovery
            ? `백업 뒤 정리 실패: ${error} — 원본과 검증 영수증을 보존한 채 재시도합니다`
            : `폐기 실패: ${error} — 같은 작업을 재시도합니다`
        : operation
          ? `${progress || '폐기 처리 중'} — 완료를 기다리세요`
          : confirmation === 'merged'
            ? '병합된 변경을 원복 PR로 되돌립니다'
            : '백업 후 runner·PR·워크트리·브랜치를 폐기합니다'),
    attempt_id,
    operation: operation || null,
    progress,
    error,
    confirmation,
    abandon: {
      action: !!operation && operation.phase === 'requested' && Boolean(error),
      label: stale_recovery ? '백업 포기' : '폐기 포기',
      title: stale_recovery
        ? '실패한 백업 작업을 포기합니다 — 원본은 그대로 남고 새로 시작하지 않습니다'
        : '실패한 폐기 작업을 포기합니다 — 백업·폐기는 수행되지 않았고 bead는 폐기 이전 상태로 돌아갑니다'
    }
  };
}

/**
 * Whether a quick-fix attempt has crossed base containment and reached a
 * landing-owned cleanup step. Earlier or absent cursors do not prove landing.
 *
 * @param {Record<string, any>|null|undefined} attempt
 * @returns {boolean}
 */
export function quickFixLanded(attempt) {
  if (!attempt || attempt.quickfix_lane !== true) {
    return false;
  }
  const landing = attempt.quickfix_landing;
  if (!landing || typeof landing !== 'object') {
    return false;
  }
  return ['repo_operations', 'branch_cleanup', 'parent_close'].includes(
    landing.cursor
  );
}
