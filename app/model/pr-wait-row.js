/**
 * One PR-wait row's Worker-grade projection (worker-phase2 §4–§6, UI-5v7d §4,
 * UI-58w8 §1, UI-vkk8, UI-hk74 §9, UI-d7fy §5, UI-qksl §4): the status badge,
 * the `[머지]` label/enablement/tooltip, the `[취소]` lock and the discard
 * projection. Moved from `views/worker/index.js` `prWaitRow` (UI-dbn6 P1-r2)
 * with its inputs gathered into one object; the template parts (the ` · 세션`
 * title suffix, the live-badge span) are the renderer's.
 *
 * `[세션에서 해결]` is NOT decided here: the row carries its material
 * (`cleanup_failed`, `completion_phase`, `discard`) and `tileResolveFields`
 * decides (ADR UI-nuwy).
 */
import { discardProjection } from './discard.js';
import { cleanupStalledReason, cleanupStepLabel } from './merge-steps.js';
import { isPrWaitCleanupActive, prWaitProgress } from './pr-wait-progress.js';
import {
  AUTO_RESOLUTION_PHASES,
  REVIEW_AFTER_MERGE_GATE_REASONS,
  autoResolutionBadge,
  completionView,
  mergeWaitingText,
  prStatusBadge,
  receiptBadgeCodes,
  resolutionView
} from './pr-wait-status.js';

/**
 * @typedef {Object} PrWaitRowInput
 * @property {string} bead_id
 * @property {string} title
 * @property {Record<string, any>} observations - Snapshot `pr_observations`.
 * @property {{ step: string, reason: string }|null} cleanup_failed
 * @property {any} [usage]
 * @property {{ activity: 'checking'|'verifying'|null, merge_progress: { step: string }|null, queueing?: 'merge'|'cleanup'|null }|null} [active]
 * @property {'running'|'paused'|null} [conflict_session]
 * @property {boolean} [external]
 * @property {{ position: number, active: boolean, failure: string|null, waiting?: string|null, resolution?: any, continuation_action?: any, hold?: any, authority?: any, review_dispatch?: any }|null} [merge_queue]
 * @property {boolean} [wt_present]
 * @property {string|null} [auto_skip]
 * @property {string|null} [base_exception]
 * @property {any} [completion]
 * @property {Record<string, any>} [discard_operations]
 * @property {boolean} [auto_merge_on]
 * @property {{ merge_sha?: unknown, cleanup_cursor?: unknown, repo_operations?: unknown }} [progress_input]
 * @property {{ active: boolean, failure: string|null, origin?: 'auto'|'click'|null }} [review_session]
 * @property {{ foreign?: boolean, repo_slug?: string, pr_url?: string, pr_number?: number }} [external_pr]
 */

/**
 * @param {PrWaitRowInput} input
 * @returns {Record<string, any>}
 */
export function prWaitRowFields(input) {
  const bead_id = input.bead_id;
  const cleanup_failed = input.cleanup_failed || null;
  const active = input.active || null;
  const conflict_session = input.conflict_session || null;
  const external = input.external === true;
  const merge_queue = input.merge_queue || null;
  const wt_present = input.wt_present !== false;
  const auto_skip = input.auto_skip ?? null;
  const base_exception = input.base_exception ?? null;
  const completion = input.completion || null;
  const progress_input = input.progress_input || {};
  const review_session = input.review_session || {
    active: false,
    failure: null,
    origin: null
  };
  const external_pr = input.external_pr || {};
  const queued = !!merge_queue && merge_queue.position > 0;
  const continuation_required =
    !!merge_queue?.continuation_action &&
    merge_queue.continuation_action.continuation === null;
  const queue_active = !!merge_queue && merge_queue.active === true;
  const queue_failure = (merge_queue && merge_queue.failure) || null;
  const queue_waiting = mergeWaitingText(
    merge_queue ? merge_queue.waiting : null,
    completion?.hold?.reason
  );
  const obs = input.observations[bead_id] || null;
  const gate = obs && obs.gate ? obs.gate : null;
  const pr = obs && obs.pr ? obs.pr : null;
  // `foreign`은 서버가 origin과 대조해 판정한 사실이다 (UI-kyky §6.1).
  const foreign_pr = external_pr.foreign === true;
  const foreign_repo =
    foreign_pr && typeof external_pr.repo_slug === 'string'
      ? external_pr.repo_slug
      : '';
  const foreign_pr_url =
    foreign_pr && typeof external_pr.pr_url === 'string'
      ? external_pr.pr_url
      : '';
  const foreign_pr_number =
    foreign_pr && typeof external_pr.pr_number === 'number'
      ? external_pr.pr_number
      : null;
  const resolution = resolutionView(
    merge_queue ? merge_queue.resolution : null
  );
  const auto_resolution = autoResolutionBadge(completion);
  const recovery = completionView(completion, auto_resolution);
  const authority = (merge_queue && merge_queue.authority) || null;
  const review_dispatch = (merge_queue && merge_queue.review_dispatch) || null;
  const auto_review_wait =
    merge_queue?.hold?.auto_review_wait === 'slot' ? 'slot' : null;
  const auto_resolution_phase =
    !!completion &&
    typeof completion === 'object' &&
    AUTO_RESOLUTION_PHASES.has(completion.phase);
  // A queued row the driver will NOT carry forward on its own (UI-58w8 §1).
  const needs_reclick =
    queued &&
    !queue_active &&
    (!authority ||
      auto_resolution_phase ||
      (authority.source === 'automatic' && input.auto_merge_on !== true));
  const conflict_badge =
    conflict_session === 'paused'
      ? '충돌 해소 일시정지'
      : resolution
        ? resolution.badge
        : conflict_session === 'running'
          ? '충돌 해소 중'
          : queue_waiting;
  const conflicting = !!gate && gate.base_badge === '충돌';
  const enabled = !!gate && gate.enabled === true;
  const merge_step = prWaitProgress({
    bead_id,
    merge_sha: progress_input.merge_sha,
    cleanup_cursor: progress_input.cleanup_cursor,
    merge_progress:
      active && active.merge_progress ? active.merge_progress : null,
    cleanup_failed,
    repo_operations: progress_input.repo_operations
  });
  const cleanup_active = isPrWaitCleanupActive(merge_step);
  // The click's own in-flight window — it locks like a merge step, but it is
  // not one: the server has not taken the request yet.
  const queueing =
    active && !merge_step && (active.queueing ?? null) ? active.queueing : null;
  const cleanup_retry =
    !!cleanup_failed &&
    [
      'repo_operations',
      'post_merge_jobs',
      'child_sweep',
      'branch_cleanup',
      'parent_close'
    ].includes(cleanup_failed.step) &&
    !!gate &&
    gate.tier === 'merged';
  const stalled_script =
    !!cleanup_failed &&
    cleanup_failed.step === 'repo_operations' &&
    merge_step?.failed === true &&
    (merge_step.step === 'deploy' || merge_step.step === 'verify')
      ? merge_step.step
      : null;
  const external_cleanup =
    external && !!cleanup_failed && !!gate && gate.tier === 'merged';
  const reclick_continuable =
    needs_reclick &&
    (enabled ||
      conflicting ||
      gate?.reason === 'base_behind' ||
      REVIEW_AFTER_MERGE_GATE_REASONS.has(gate?.reason) ||
      cleanup_retry ||
      external_cleanup);
  const review_after_merge = REVIEW_AFTER_MERGE_GATE_REASONS.has(gate?.reason);
  const external_conflict_unresolvable =
    external && conflicting && wt_present === false;
  const discard = discardProjection(input.discard_operations || {}, bead_id, {
    external,
    merge_active: queue_active || merge_step?.step === 'merge',
    merge_queued: queued,
    conflict_active: !!conflict_session,
    cleanup_active,
    merged: !!cleanup_failed || gate?.tier === 'merged'
  });
  const discard_blocks_merge = !!discard.operation;
  const auto_pending =
    queued &&
    !queue_failure &&
    !continuation_required &&
    !cleanup_retry &&
    !(recovery && recovery.lock_actions);
  const status_badge = prStatusBadge({
    auto_pending,
    continuation_required,
    queueing,
    merge_step,
    conflict_badge,
    conflict_live: resolution?.live === true || conflict_session === 'running',
    auto_resolution,
    recovery,
    cleanup_failed,
    cleanup_label: cleanup_failed
      ? cleanupStepLabel(cleanup_failed.step)
      : null,
    base_exception,
    conflicting,
    gate,
    receipt_check: obs && obs.receipt_check ? obs.receipt_check : null,
    queue_failure,
    auto_skip,
    queued,
    queue_active,
    queue_position: merge_queue ? merge_queue.position : 0,
    review_session,
    review_dispatch,
    auto_review_wait,
    activity: conflict_badge ? null : (active && active.activity) || null
  });
  const receipt_badge_codes = receiptBadgeCodes(
    obs && obs.receipt_check ? obs.receipt_check : null
  );
  const live = status_badge?.live === true;
  return {
    id: bead_id,
    title: input.title,
    reason:
      cleanup_failed && merge_step?.active !== true
        ? cleanupStalledReason(cleanup_failed.step)
        : 'PR 대기',
    draggable: false,
    done: true,
    lane: 'pr_wait',
    external,
    pr_number:
      foreign_pr_number ??
      (pr && typeof pr.number === 'number' ? pr.number : null),
    pr_url: foreign_pr_url || (pr && typeof pr.url === 'string' ? pr.url : ''),
    ...(foreign_repo ? { foreign_repo } : {}),
    // The one-badge tooltip seam (UI-vkk8 §3): raw failure codes and hidden
    // lower-grade facts stay inspectable without another badge.
    completion_badge: !live && status_badge?.title ? status_badge.label : null,
    completion_title: status_badge?.title || '',
    ...(completion?.phase === 'needs_human' &&
    typeof completion.log_path === 'string' &&
    completion.log_path.length > 0
      ? { log_path: completion.log_path }
      : {}),
    ...(receipt_badge_codes.length > 0
      ? { receipt_badge: { codes: receipt_badge_codes } }
      : {}),
    badges: status_badge ? [status_badge.label] : [],
    live_badge: live ? status_badge.label : null,
    live_title: live ? status_badge.title : '',
    usage: input.usage ?? null,
    alert: status_badge?.alert === true,
    // [세션에서 해결]'s material (UI-jw27 §4, UI-g0lk §5.1); the predicate is
    // `tileResolveFields`.
    cleanup_failed,
    completion_phase:
      completion && typeof completion.phase === 'string'
        ? completion.phase
        : null,
    merge_action:
      gate?.tier === 'merged' && !cleanup_retry && !external_cleanup
        ? false
        : !queued ||
          continuation_required ||
          needs_reclick ||
          review_after_merge,
    cancel_action: queued && !continuation_required,
    // Only the irreversible merge effect locks (UI-d7fy §5.6).
    cancel_enabled: !queue_active && !(recovery && recovery.lock_actions),
    cancel_title:
      recovery && recovery.lock_actions
        ? `${recovery.badge} — 중단하려면 상단 자동 머지 중단을 사용하세요`
        : queue_active
          ? '머지 진행 중 — 취소할 수 없습니다'
          : '머지 큐에서 이 항목을 뺍니다 (다시 [머지]로 넣을 수 있습니다)',
    discard,
    discard_action: discard.action,
    merge_step,
    discard_enabled: discard.enabled,
    discard_title: discard.title,
    merge_enabled:
      !merge_step &&
      !queueing &&
      !conflict_session &&
      !discard_blocks_merge &&
      !base_exception &&
      !(recovery && recovery.lock_actions) &&
      !external_conflict_unresolvable &&
      review_session.active !== true &&
      (enabled ||
        conflicting ||
        gate?.reason === 'base_behind' ||
        review_after_merge ||
        cleanup_retry ||
        external_cleanup ||
        reclick_continuable ||
        (auto_resolution_phase && !queue_active)),
    merge_label: mergeLabel({
      continuation_required,
      cleanup: cleanup_retry || external_cleanup,
      stalled_script,
      conflicting: conflicting && !merge_step && !cleanup_retry,
      base_behind: gate?.reason === 'base_behind',
      review_after_merge,
      needs_reclick
    }),
    merge_title: mergeTitle({
      discard,
      discard_blocks_merge,
      continuation_required,
      queueing,
      merge_step,
      stalled_script,
      external_cleanup,
      external_conflict_unresolvable,
      conflict_session,
      cleanup_retry,
      conflicting,
      gate,
      review_session,
      enabled
    })
  };
}

/**
 * What the `[머지]` click DOES (UI-dxgz §2, UI-yk55 §1, UI-58w8 §1).
 *
 * @param {{ continuation_required: boolean, cleanup: boolean, stalled_script: string|null, conflicting: boolean, base_behind: boolean, review_after_merge: boolean, needs_reclick: boolean }} state
 * @returns {string|undefined}
 */
function mergeLabel(state) {
  if (state.continuation_required) {
    return '이어하기 선택';
  }
  if (state.cleanup) {
    return state.stalled_script === 'deploy'
      ? '배포 재시도 후 정리'
      : state.stalled_script === 'verify'
        ? '검증 재시도 후 정리'
        : '정리 재시도';
  }
  if (state.conflicting) {
    return '충돌 해소 후 머지';
  }
  if (state.base_behind) {
    return 'base 갱신 후 머지';
  }
  if (state.review_after_merge) {
    return '리뷰 후 머지';
  }
  return state.needs_reclick ? '다시 머지' : undefined;
}

/** @type {Record<string, string>} */
const REVIEW_HOLD_TITLES = {
  review_receipt_missing:
    '리뷰 영수증 없음 — 머지 게이트 보류입니다. 클릭하면 기록된 세션을 이어 리뷰만 수행시키고, 영수증이 최종 head에 유효해지면 큐가 머지합니다',
  review_receipt_stale:
    'head 재작성됨(영수증이 현재 head의 조상이 아님) — 머지 게이트 보류입니다. 클릭하면 기록된 세션을 이어 최종 head를 다시 리뷰시키고, 영수증이 유효해지면 큐가 머지합니다',
  review_receipt_invalid:
    '리뷰 영수증 기록이 성립하지 않음 — 머지 게이트 보류입니다. 클릭하면 기록된 세션을 이어 최종 head를 다시 리뷰시키고, 영수증이 유효해지면 큐가 머지합니다',
  review_receipt_undetermined:
    '리뷰 영수증 ancestry probe 미완료 — 머지 게이트 보류입니다. 클릭하면 기록된 세션을 이어 최종 head를 다시 리뷰시키고, 새 영수증이 최종 head에 유효해지면 큐가 머지합니다',
  spec_id_missing:
    'native spec_id 미기록 — bd update --spec-id로 기록한 뒤 다시 머지하세요'
};

/**
 * The `[머지]` tooltip: what the click is based on, or why it is refused. The
 * first matching state wins, in the old Worker `prWaitRow` order.
 *
 * @param {Record<string, any>} s
 * @returns {string}
 */
function mergeTitle(s) {
  const gate = s.gate;
  if (s.discard_blocks_merge) {
    return s.discard.error
      ? `폐기 실패: ${s.discard.error} — [재시도]하거나 상태를 확인하세요`
      : `폐기 진행 중 — ${s.discard.progress || '완료를 기다리세요'}`;
  }
  if (s.continuation_required) {
    return '실행 provider가 변경되었습니다 — 이어갈 방식을 선택하세요';
  }
  if (s.queueing) {
    return '요청을 보내는 중 — 서버 응답을 기다립니다';
  }
  if (s.merge_step) {
    return `머지 진행 중 — ${s.merge_step.label}`;
  }
  if (s.stalled_script) {
    return `머지 완료 — ${s.stalled_script === 'deploy' ? '배포' : '검증'} 스크립트가 실패해 정리가 멈췄습니다. 클릭하면 저장소 작업부터 정리를 다시 진행합니다`;
  }
  if (s.external_cleanup) {
    return '머지 완료 — 클릭하면 실패한 정리를 다시 시도합니다';
  }
  if (s.external_conflict_unresolvable) {
    return '워크트리 없음 — 세션에서 직접 해소하세요';
  }
  if (s.conflict_session === 'running') {
    return '충돌 해소 세션 실행 중 — 완료 후 다시 머지하세요';
  }
  if (s.conflict_session === 'paused') {
    return '충돌 해소 세션 일시정지 — 재개 후 완료되면 머지하세요';
  }
  if (s.cleanup_retry) {
    return '머지 완료 — 클릭하면 남은 정리를 실패 단계부터 다시 시도합니다';
  }
  if (s.conflicting) {
    return '충돌 — 큐에 넣으면 해소 세션을 띄우고 완료 후 자동으로 재머지합니다';
  }
  if (gate?.reason === 'base_behind') {
    return 'base를 자동 갱신한 뒤 머지합니다';
  }
  if (s.review_session.active === true) {
    return s.review_session.origin === 'auto'
      ? '자동 리뷰 세션 실행 중 — 끝나면 영수증을 다시 판정합니다'
      : '리뷰 세션 실행 중 — 끝나면 영수증을 다시 판정합니다';
  }
  if (
    gate &&
    typeof gate.reason === 'string' &&
    REVIEW_HOLD_TITLES[gate.reason]
  ) {
    return REVIEW_HOLD_TITLES[gate.reason];
  }
  if (s.enabled) {
    return `머지 (${gate.gate_badge}) — 큐에 넣어 순서대로 머지합니다 (차례가 되면 다시 확인)`;
  }
  if (gate && gate.tier === 'merged') {
    // Merged with no cleanup failure recorded: the cleanup is running.
    return '머지됨 — 머지 후 정리 진행 중';
  }
  return `머지 불가: ${(gate && gate.reason) || '관측 대기'}`;
}
