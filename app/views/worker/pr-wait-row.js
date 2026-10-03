/**
 * PR 대기 줄 투영 (UI-f2sy §4). Worker 탭과 Monitor 탭이 저장소마다 이 모듈의
 * `prWaitRowsOf`를 불러 같은 PR 대기 줄 — 상태 배지(머지 대기 #N·충돌·리뷰
 * 세션·자동 제외·정리 멈춤 등), 세션·워커 이어가기 짝, 이어하기·권한·게이트 버튼
 * 라벨 — 을 얻는다. 입력은 그 저장소의 장식 스냅샷, 그 저장소 그룹의 머지
 * 재료, 그리고 `(root_dir, bead_id)`로 키를 단 뷰 로컬 진행 중 집합이다.
 *
 * 탭 뷰는 여기에 뷰 로컬 상태(판정 팝업 열림)와 Monitor의 저장소 좌표만
 * 덧씌운다 — 줄의 칩·배지·버튼을 다시 조립하지 않는다.
 */
import { html } from 'lit-html';
import {
  isImplementationAttempt,
  latestImplementationAttempts
} from '../../utils/active-attempts.js';
import { formatTimestampLocal } from '../../utils/relative-time.js';
import { sumAttemptUsage } from '../../utils/token-usage.js';
import { failureSentence } from './failure-labels.js';
import {
  baseException,
  prWaitLaneOriginFields,
  resolvesConflict
} from './lane-model.js';
import { discardProjection, reviewSessionRowState } from './lanes.js';
import { cleanupStalledReason, cleanupStepLabel } from './merge-steps.js';
import { isPrWaitCleanupActive, prWaitProgress } from './pr-wait-progress.js';
import { tileResolveFields } from './tile-resolve.js';

/**
 * @import { LaneItem, LaneMergeQueue, LaneModel, LaneQueueGroup } from './lane-model.js'
 * @import { DependencyChips } from './lanes.js'
 */

/**
 * A plain-object view of an optional snapshot record; anything else reads as
 * empty (fail-quiet).
 *
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function objectOf(value) {
  return value && typeof value === 'object'
    ? /** @type {Record<string, any>} */ (value)
    : {};
}

/**
 * Korean text for a `[리뷰 후 머지]` session's termination reason (UI-d7fy §5.4).
 *
 * Three shapes end one: the receipt was re-judged and is still not current, the
 * session process itself failed, and the launch never happened. All three
 * re-enable the button, so the text says WHAT to expect from another click
 * rather than only what went wrong. An unknown cause travels through verbatim —
 * a server that grew one must not blank the reason.
 *
 * @param {string} cause
 * @returns {string}
 */
export function reviewSessionFailureText(cause) {
  if (cause === 'receipt_not_current') {
    return '리뷰 후에도 영수증이 최종 head에 유효하지 않음';
  }
  if (cause === 'cancelled') {
    return '리뷰 세션 취소됨';
  }
  if (cause.startsWith('launch_failed:')) {
    return `리뷰 세션 시작 실패(${cause.slice('launch_failed:'.length)})`;
  }
  if (cause.startsWith('session_failed:')) {
    return `리뷰 세션 비정상 종료(${cause.slice('session_failed:'.length)})`;
  }
  return `리뷰 세션 실패(${cause})`;
}

/**
 * Korean text for a merge-queue skip reason (UI-5v7d §4). The driver's
 * vocabulary is machine-readable; an unknown value travels through verbatim
 * rather than being swallowed — a server that grew a reason must not blank the
 * badge.
 *
 * @param {string} reason
 * @returns {string}
 */
export function mergeFailureText(reason) {
  // Every receipt hold is lifted by the person's own [머지] click (UI-bu6d §4:
  // the click IS the waiving authority), so the label must say that next step
  // — the raw code alone reads as a dead end. The code stays in the tooltip.
  if (reason.startsWith('receipt_unbacked:')) {
    const code = reason.slice('receipt_unbacked:'.length);
    return `실행 영수증 자동 검증 불가(${code}) — [머지] 클릭으로 수동 진행 가능`;
  }
  switch (reason) {
    case 'not_in_pr_wait':
      return 'PR 대기 상태 동기화 실패';
    case 'resolution_round_cap':
      return '충돌 해소 2회 초과';
    case 'resolution_rebase_cap':
      return '큐 재충돌 3회 초과';
    case 'resolution_timeout':
      return '충돌 해소 대기 시간 초과';
    case 'resolution_refused':
      return '해소 세션 디스패치 거부';
    // The external row's own refusal is `worktree_missing` now (UI-w0hi §2):
    // the dispatch itself is no longer external-specific, only the worktree it
    // needs to run in is, and that is the one thing this path cannot recreate.
    case 'worktree_missing':
      return '워크트리 없음 — 세션에서 해소 필요';
    // The restore that now precedes that refusal (UI-p49g §5.1) names WHICH
    // safety check stopped it, because each one asks for a different fix.
    case 'worktree_restore_branch_mismatch':
      return '워크트리 복원 실패 — 브랜치 이름 불일치';
    case 'worktree_restore_path_exists':
      return '워크트리 복원 실패 — 경로 이미 있음';
    case 'worktree_restore_branch_missing':
      return '워크트리 복원 실패 — origin에 브랜치 없음';
    case 'worktree_restore_branch_diverged':
      return '워크트리 복원 실패 — 로컬 브랜치가 origin과 다름';
    case 'worktree_restore_failed':
      return '워크트리 복원 실패';
    case 'merge_unconfirmed_timeout':
      return '머지 확인 시간 초과';
    case 'pr_closed_unmerged':
      return 'PR 닫힘';
    case 'merge_error':
      return '머지 오류';
    case 'spec_id_missing':
      return '스펙 ID 기록 없음';
    default:
      return reason;
  }
}

/**
 * Distinguish failed verification code from a command that could not run.
 *
 * @param {string|null|undefined} reason
 * @returns {string}
 */
function verifyHoldBadgeText(reason) {
  return reason === 'verify_cmd_spawn_error' || reason === 'verify_cmd_timeout'
    ? '검증 명령 실패 — 환경 확인'
    : '검증 실패 — 수정 push 대기';
}

/**
 * Project a known nonterminal resolver wait reason; unknown values fail quiet.
 *
 * @param {unknown} reason
 * @param {string|null} [hold_reason]
 * @returns {string|null}
 */
export function mergeWaitingText(reason, hold_reason = null) {
  if (reason === 'worker_sessions_busy') {
    return '해소 대기 — 실행 슬롯 대기 중';
  }
  if (typeof reason !== 'string' || !reason.startsWith('completion_waiting:')) {
    return null;
  }
  const phase = reason.slice('completion_waiting:'.length);
  if (phase.length === 0) {
    return null;
  }
  switch (phase) {
    case 'gating':
      return '머지 조건 확인 중';
    case 'holding':
      return verifyHoldBadgeText(hold_reason);
    case 'merging':
      return '머지 중';
    case 'cleaning':
      return '마무리 중';
    case 'paused':
      return '자동 진행 일시정지';
    case 'needs_human':
      return '확인 필요';
    default:
      return null;
  }
}

/**
 * Turn the optional durable merge-queue wait into one nonterminal badge.
 * Unknown and malformed states stay invisible: the server owns fail-closed
 * execution, while this projection must remain compatible with older snapshots.
 *
 * @param {import('../../data/worker-queue-store.js').ResolutionProjection|null|undefined} resolution
 * @returns {{ badge: string, live: boolean }|null}
 */
function resolutionView(resolution) {
  if (!resolution || typeof resolution !== 'object') {
    return null;
  }
  switch (resolution.state) {
    case 'waiting':
      return { badge: '충돌 해소 중', live: true };
    case 'yielded':
      return {
        badge: '충돌 해소 계속 중 · 완료 후 우선 머지',
        live: true
      };
    case 'ready':
      return { badge: '충돌 해소 완료 · 재검증 대기', live: false };
    default:
      return null;
  }
}

/**
 * Completion phases that leave the row's own buttons clickable: the two that
 * are already settled for a person, the pre-merge hold, plus the three UI-hk74 §4 phases the
 * coordinator resolves on its own without owning the merge effect.
 *
 * @type {Set<string>}
 */
const UNLOCKED_COMPLETION_PHASES = new Set([
  'paused',
  'needs_human',
  'holding',
  'waiting_metadata',
  'reviewing',
  'retrying'
]);

/**
 * The three phases the completion coordinator is resolving on its own
 * (UI-hk74 §4). Named apart from {@link UNLOCKED_COMPLETION_PHASES} because
 * §9 gives them an action a `paused` or `needs_human` row does not have: the
 * click ends the automatic wait and hands the saga back to the gate.
 *
 * @type {Set<string>}
 */
const AUTO_RESOLUTION_PHASES = new Set([
  'waiting_metadata',
  'reviewing',
  'retrying'
]);

/**
 * 리뷰 lineage 하나가 출구인 게이트 보류 사유 넷 (UI-qksl §4 1번). 큐는 이
 * 넷에서 head당 1회 리뷰 세션을 자동 dispatch하고, 그 뒤의 출구는 `[리뷰 후
 * 머지]` 하나다 — 그래서 뱃지도 버튼도 넷을 한 집합으로 읽는다. 서버
 * `REVIEW_AFTER_MERGE_GATE_REASONS`와 같은 집합이며, 갈라지면 서버가 받아주는
 * 보류에서 버튼이 사라진다.
 *
 * @type {Set<string>}
 */
const REVIEW_AFTER_MERGE_GATE_REASONS = new Set([
  'review_receipt_missing',
  'review_receipt_stale',
  'review_receipt_invalid',
  'review_receipt_undetermined'
]);

/**
 * The badge for an intent the completion coordinator is resolving WITHOUT a
 * person (UI-hk74 §9). Null for every other phase, and null for one of the
 * three whose `auto_resolution` record did not travel — fail-quiet, because a
 * badge whose state cannot be read tells nobody anything.
 *
 * `reviewing` has no case any more (UI-d7fy §3.5): the automatic review lane
 * is gone, so the only phases a person can find a row parked in are the
 * metadata watch and the retry ladder.
 *
 * @param {import('../../data/worker-queue-store.js').CompletionStatus|null|undefined} completion
 * @returns {{ label: string, details: string[], live: boolean }|null}
 */
export function autoResolutionBadge(completion) {
  const raw =
    completion && typeof completion === 'object'
      ? completion.auto_resolution
      : null;
  const resolution =
    raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : null;
  if (!resolution || !completion) {
    return null;
  }
  const origin =
    typeof resolution.origin_reason === 'string' &&
    resolution.origin_reason.length > 0
      ? `원 사유: ${resolution.origin_reason}`
      : '';
  switch (completion.phase) {
    case 'waiting_metadata': {
      // A receipt hold is a SPECIALIZATION of the metadata watch, not a new
      // slot: the same badge answers "why is this row stopped", and the generic
      // 「정정 대기」 hid the one thing a person needed — which receipt code
      // (spec §5.1). No `alert`, because nothing is asked of them yet.
      const receipt_code =
        typeof resolution.origin_reason === 'string' &&
        resolution.origin_reason.startsWith('receipt_unbacked:')
          ? resolution.origin_reason.slice('receipt_unbacked:'.length)
          : null;
      if (receipt_code !== null) {
        return {
          label: `영수증 대기 — ${receipt_code}`,
          details: [origin, '새 커밋·새 영수증·재관측이 오면 자동 재개'].filter(
            Boolean
          ),
          live: false
        };
      }
      return {
        label: '정정 대기',
        details: [origin, '메타데이터 정정이 관측되면 자동 재개'].filter(
          Boolean
        ),
        live: false
      };
    }
    case 'retrying': {
      const attempts = Number.isInteger(resolution.attempts)
        ? Math.max(0, Number(resolution.attempts))
        : 0;
      const cap =
        Number.isInteger(resolution.attempt_cap) &&
        Number(resolution.attempt_cap) > 0
          ? Number(resolution.attempt_cap)
          : 0;
      const next_at =
        typeof resolution.next_at === 'number'
          ? formatTimestampLocal(resolution.next_at)
          : '';
      const last_error =
        typeof resolution.last_error === 'string' &&
        resolution.last_error.length > 0
          ? resolution.last_error
          : '';
      return {
        // 예산은 서버가 싣는다 — 클라이언트가 3을 다시 적으면 계약이 두 곳에
        // 생긴다. 값이 없으면 분모 없이 횟수만 보인다.
        label:
          cap > 0
            ? `재시도 ${Math.min(attempts, cap)}/${cap}`
            : `재시도 ${attempts}`,
        details: [
          origin,
          next_at ? `다음 시각 ${next_at}` : '',
          last_error ? `마지막 오류: ${last_error}` : ''
        ].filter(Boolean),
        live: true
      };
    }
    default:
      return null;
  }
}

/**
 * The original terminal reason carried inside an exhausted automatic
 * resolution's `terminal_reason` (UI-hk74 §9), or `''` when there is none.
 *
 * @param {unknown} terminal_reason
 * @returns {string}
 */
function exhaustedOriginReason(terminal_reason) {
  if (typeof terminal_reason !== 'string') {
    return '';
  }
  for (const prefix of ['retry_exhausted:', 'auto_review_exhausted:']) {
    if (terminal_reason.startsWith(prefix)) {
      return terminal_reason.slice(prefix.length);
    }
  }
  return '';
}

/**
 * Turn the server's bounded completion projection into one root-card status.
 * Missing or unfamiliar optional projection stays invisible; malformed durable
 * intents are normalized server-side to the explicit `needs_human` phase.
 *
 * @param {import('../../data/worker-queue-store.js').CompletionStatus|null|undefined} completion
 * @param {{ label: string, details: string[], live: boolean }|null} [auto_resolution] - The
 * precomputed {@link autoResolutionBadge} for the same row.
 * @returns {{ badge: string, title: string, alert: boolean, lock_actions: boolean }|null}
 */
function completionView(completion, auto_resolution = null) {
  if (!completion || typeof completion !== 'object') {
    return null;
  }
  let badge = '';
  switch (completion.phase) {
    case 'gating':
      badge = '머지 조건 확인 중';
      break;
    case 'holding':
      badge = verifyHoldBadgeText(completion.hold?.reason);
      break;
    case 'merging':
      badge = '머지 중';
      break;
    case 'cleaning':
      badge = '마무리 중';
      break;
    // 자동 해소 phase (UI-hk74 §4)는 종결이 아니다: 라벨은 해소 배지가 정하고,
    // 읽을 수 없는 기록이면 이 행은 아무 것도 주장하지 않는다.
    case 'waiting_metadata':
    case 'reviewing':
    case 'retrying':
      if (!auto_resolution) {
        return null;
      }
      badge = auto_resolution.label;
      break;
    case 'paused':
      badge = '자동 진행 일시정지';
      break;
    case 'needs_human':
      badge = '확인 필요';
      break;
    case 'completed':
      return null;
    default:
      return null;
  }

  /** @type {string[]} */
  const details = [badge];
  const hold = completion.phase === 'holding' ? completion.hold : null;
  if (completion.phase === 'holding') {
    details.push(
      failureSentence(hold?.reason) || '머지 전 검증이 실패했습니다.'
    );
    if (hold?.summary) {
      details.push(hold.summary);
    }
    if (hold?.log_path) {
      details.push(`로그 ${hold.log_path}`);
    }
    details.push('수정 커밋을 push하면 자동으로 다시 검증합니다');
  }
  if (completion.head_sha) {
    details.push(`head ${completion.head_sha}`);
  }
  if (completion.base_sha) {
    details.push(`base ${completion.base_sha}`);
  }
  if (completion.failure_stage || completion.failure_reason) {
    details.push(
      `${completion.failure_stage || 'failure'} · ${completion.failure_reason || '원인 미상'}`
    );
  }
  // 소진되어 종결된 자동 해소는 원 사유를 함께 보인다 (§9): `retry_exhausted:`
  // 라는 껍데기만으로는 무엇이 세 번 실패했는지 읽을 수 없다.
  const exhausted_origin = exhaustedOriginReason(completion.terminal_reason);
  if (exhausted_origin) {
    details.push(`원 사유: ${exhausted_origin}`);
  }
  // needs_human 종단은 이제 자동 수리로 이어지지 않는다 (UI-8w4t §3), 그래서
  // 이 줄이 사람에게 남는 유일한 설명이다: raw 종단 코드(`verify_red`)만으로는
  // 무엇이 끝났는지 읽히지 않으므로 문장과 단계를 함께 싣는다. 문장을 모르는
  // 코드는 아무 것도 더하지 않는다 — 위의 원인 줄이 raw 토큰을 이미 싣는다.
  const terminal_sentence =
    completion.phase === 'needs_human' && !exhausted_origin
      ? failureSentence(completion.terminal_reason)
      : null;
  if (terminal_sentence) {
    details.push(
      completion.failure_stage
        ? `${completion.failure_stage} · ${terminal_sentence}`
        : terminal_sentence
    );
  }
  for (const line of auto_resolution ? auto_resolution.details : []) {
    details.push(line);
  }
  if (completion.active_attempt_id) {
    details.push(`attempt ${completion.active_attempt_id}`);
  }
  if (completion.evidence) {
    details.push(completion.evidence);
  }
  if (completion.log_path && completion.log_path !== hold?.log_path) {
    details.push(completion.log_path);
  }

  return {
    badge,
    title: details.join('\n'),
    alert: completion.phase === 'needs_human' || completion.phase === 'holding',
    // [머지] 클릭은 세 자동 해소 phase에서도 살아 있어야 한다 (§9): 수동
    // authority가 자동 해소보다 우선하고, 그 클릭이 `auto_resolution`을 비우는
    // 유일한 경로다. 잠기는 것은 되돌릴 수 없는 진행 중 단계뿐이다.
    lock_actions: !UNLOCKED_COMPLETION_PHASES.has(completion.phase)
  };
}

/**
 * The blocking receipt-violation codes a recorded observation carries.
 *
 * Fail-quiet (UI-bu6d §7): an absent summary, a malformed one, and a probe
 * error all yield an empty list, because the display layer creates no authority
 * and a warning nobody can act on is noise.
 *
 * @param {unknown} summary
 * @returns {string[]}
 */
export function receiptWarningCodes(summary) {
  if (!summary || typeof summary !== 'object') {
    return [];
  }
  const codes = /** @type {Record<string, unknown>} */ (summary).blocking_codes;
  return Array.isArray(codes)
    ? codes.filter((code) => typeof code === 'string' && code.length > 0)
    : [];
}

/**
 * The DISPLAY-ONLY receipt codes a recorded observation carries (UI-h6t1 §4.2)
 * — dotfiles 계약의 `badge` 등급이다. 머지 판정을 바꾸지 않으므로 상태 뱃지가
 * 아니라 슬롯 5 판정 칩 하나가 된다.
 *
 * Same fail-quiet posture as {@link receiptWarningCodes}: 부재·비배열·빈
 * 문자열은 전부 빈 목록이다.
 *
 * @param {unknown} summary
 * @returns {string[]}
 */
export function receiptBadgeCodes(summary) {
  if (!summary || typeof summary !== 'object') {
    return [];
  }
  const codes = /** @type {Record<string, unknown>} */ (summary).badge_codes;
  return Array.isArray(codes)
    ? codes.filter((code) => typeof code === 'string' && code.length > 0)
    : [];
}

/**
 * Resolve every PR-card status input to one priority-ordered badge. The first
 * match is the state the user must read or act on now; lower-grade failure
 * facts remain in its tooltip instead of stacking another badge (UI-vkk8 §3).
 *
 * @param {Record<string, any>} input
 * @returns {{ label: string, title: string, live: boolean, alert: boolean }|null}
 */
export function prStatusBadge(input) {
  const failure_title = input.queue_failure
    ? `머지 실패 원문: ${input.queue_failure}`
    : input.auto_skip
      ? `자동 제외 원문: ${input.auto_skip}`
      : '';
  /**
   * @param {string} label
   * @param {{ title?: string, live?: boolean, alert?: boolean }} [options]
   */
  const badge = (label, options = {}) => {
    const details = [options.title || '', failure_title].filter(Boolean);
    return {
      label,
      title: details.join('\n'),
      live: options.live === true,
      alert: options.alert === true
    };
  };

  if (input.continuation_required) {
    return badge('이어하기 선택 필요', { alert: true });
  }
  // Ahead of every server-owned state because it is the only one that describes
  // the client's own unanswered request. It ends the moment a snapshot lands,
  // and it never claims a merge step: the queue place is not taken yet.
  if (input.queueing) {
    return input.queueing === 'cleanup'
      ? badge('워커로 이어가기 요청 중', {
          title: '서버 응답을 기다리는 중입니다',
          live: true
        })
      : badge('큐 등록 중', {
          title: '머지 큐에 넣는 중 — 서버 응답을 기다립니다',
          live: true
        });
  }
  if (input.merge_step) {
    return input.gate?.tier === 'merged'
      ? badge('머지됨', {
          title: input.merge_step.label,
          alert: input.merge_step.failed === true
        })
      : badge('머지 중', { title: input.merge_step.label, live: true });
  }
  if (input.conflict_badge) {
    return badge(input.conflict_badge, {
      live: input.conflict_live === true
    });
  }
  // 자동 해소 중인 행 (UI-hk74 §9)은 아래의 `영수증 확인 필요`·`머지 실패 —
  // ... [머지] 클릭으로 수동 진행 가능`보다 먼저 이긴다: 그 문구들이 말하는
  // 사유가 바로 이 phase에 들어온 원인이고, "클릭으로만 풀린다"는 안내는 이미
  // 자동으로 재개를 기다리는 행에서 자기 모순이다. `리뷰 진행 중`보다도 먼저인
  // 것은 자동 리뷰가 그 저널의 소유자이기 때문이다 — 같은 사실을 두 번 말하지
  // 않고 어느 쪽 authority인지까지 말하는 배지가 이긴다.
  if (input.auto_resolution) {
    return badge(input.auto_resolution.label, {
      title: input.auto_resolution.details.join('\n'),
      live: input.auto_resolution.live === true
    });
  }
  if (input.recovery?.lock_actions) {
    return badge(input.recovery.badge, {
      title: input.recovery.title,
      live: true
    });
  }
  if (input.cleanup_failed) {
    return badge(
      input.cleanup_label ? `정리 멈춤 · ${input.cleanup_label}` : '정리 멈춤',
      { title: input.cleanup_failed.reason || '', alert: true }
    );
  }
  if (input.base_exception) {
    return badge('다른 base 대상', {
      title: input.base_exception,
      alert: true
    });
  }
  // A queued row nobody has to touch (UI-kxhf): the driver re-observes it and
  // dispatches the resolution / base update / head review itself, so the
  // warnings below would only flash for the seconds between an observation
  // and that dispatch. They stay for a row the queue is NOT going to act on —
  // unqueued, failed, waiting on a continuation choice — because there the
  // reason is what the person clicks to fix.
  const receipt_codes = receiptWarningCodes(input.receipt_check);
  // 리뷰 보류 사유들은 여기서 빠졌다: 큐가 head당 1회 리뷰 lineage를 띄우긴
  // 하지만 (UI-qksl §4), 그 행이 무엇을 기다리는지는 아래 리뷰 보류 분기가
  // 실행 중·슬롯 대기·1회 소진으로 정확히 말한다 — `확인 중`은 그 셋을 하나로
  // 뭉개고, 소진 뒤에는 아무도 처리하지 않는다는 점에서 거짓이 된다.
  const auto_handled =
    input.conflicting ||
    input.gate?.reason === 'base_behind' ||
    receipt_codes.length > 0;
  if (input.auto_pending && auto_handled) {
    return badge('확인 중', {
      title: '머지 큐가 자동으로 처리 중 — 다음 관측을 기다립니다',
      live: true
    });
  }
  if (input.conflicting) {
    return badge('충돌 해결 필요', { alert: true });
  }
  if (input.gate?.reason === 'base_behind') {
    return badge('base 갱신 필요', { alert: true });
  }
  if (REVIEW_AFTER_MERGE_GATE_REASONS.has(input.gate?.reason)) {
    // Head movement alone no longer lands here: the receipt is ancestry-bound,
    // so a base-sync merge or a queue base update keeps reading current
    // (UI-vzyh §2). What is left is abnormal — no receipt at all, a receipt the
    // observed head does not descend from (rewritten history, branch reset), a
    // malformed record, or an ancestry probe the gate could not take. 넷 다 같은
    // 보류다 (UI-qksl §4 1번): 리뷰 세션이 head에 정확히 쓴 새 영수증은 probe
    // 없이 판정되므로, 지속적 probe 오류의 출구도 리뷰 lineage다.
    const hold_title =
      input.gate.reason === 'review_receipt_stale'
        ? '리뷰 영수증이 현재 head의 조상이 아닙니다 — 히스토리 재작성·브랜치 리셋 복구 경로입니다. [리뷰 후 머지]가 이 보류의 출구입니다'
        : input.gate.reason === 'review_receipt_invalid'
          ? '리뷰 영수증 기록이 성립하지 않습니다 — [리뷰 후 머지]가 이 보류의 출구입니다'
          : input.gate.reason === 'review_receipt_undetermined'
            ? '리뷰 영수증의 ancestry probe를 완료하지 못했습니다 — [리뷰 후 머지]가 이 보류의 출구입니다'
            : '리뷰 영수증이 없습니다 — [리뷰 후 머지]가 이 보류의 출구입니다';
    // §5.4의 종료 사유는 게이트 뱃지 옆 텍스트다. 실행 중인 세션이 우선한다 —
    // 지난 실패는 이미 다시 눌린 뒤이므로 지금 무슨 일이 일어나는지가 답이다.
    if (input.review_session?.active === true) {
      return badge(
        input.review_session.origin === 'auto'
          ? '최종 변경 리뷰 필요 · 자동 리뷰 세션 실행 중'
          : '최종 변경 리뷰 필요 · 리뷰 세션 실행 중',
        {
          title: `${hold_title}\n리뷰 세션이 실행 중입니다 — 끝나면 영수증을 다시 판정합니다`,
          live: true
        }
      );
    }
    // 슬롯이 비기를 기다리는 자동 dispatch (UI-qksl §4 5번)도 지금 일어나는
    // 일이므로 지난 실패보다 앞이다 — 큐가 스스로 띄울 것이고, 클릭은 그 대기를
    // 건너뛴다.
    if (input.auto_review_wait === 'slot') {
      return badge('최종 변경 리뷰 필요 · 리뷰 세션 슬롯 대기', {
        title: `${hold_title}\n실행 슬롯이 비면 자동으로 리뷰 세션을 띄웁니다. 지금 클릭하면 즉시 띄웁니다`,
        live: true
      });
    }
    if (input.review_session?.failure) {
      // 자동 1회를 이미 쓴 head인가 (UI-qksl §7): 소진된 claim이 남아 있으면 큐는
      // 이 head에 다시 세션을 띄우지 않는다. 클릭 세션이 실패한 경우는 사람이
      // 방금 누른 결과이므로 접두를 붙이지 않는다.
      const auto_exhausted =
        input.review_dispatch?.state === 'exhausted' &&
        input.review_session.origin === 'auto';
      return badge(
        `최종 변경 리뷰 필요 · ${auto_exhausted ? '자동 리뷰 1회 소진 · ' : ''}${reviewSessionFailureText(input.review_session.failure)}`,
        {
          title: `${hold_title}\n직전 리뷰 세션 종료 사유: ${input.review_session.failure}`,
          alert: true
        }
      );
    }
    return badge('최종 변경 리뷰 필요', { title: hold_title, alert: true });
  }
  if (input.gate?.reason === 'spec_id_missing') {
    // Not a review problem: only a Bead metadata write can repair it, so the
    // badge must not suggest a review will (UI-yqw9 incident).
    return badge('스펙 ID 누락', {
      title: 'native spec_id 미기록 — bd update --spec-id 필요',
      alert: true
    });
  }
  if (receipt_codes.length > 0) {
    // The recorded completion-time observation (UI-bu6d §7). The gate's own
    // live re-check runs on the click, so this badge EXPLAINS a refusal rather
    // than causing one. Fail-quiet by convention: no record and no probe error
    // ever reaches here, so an unobserved attempt shows nothing at all.
    //
    // The first code rides in the LABEL (UI-17mj §2.4): with the reason only in
    // the tooltip, the card alone never said what to repair, and the repair is
    // a metadata write nobody guesses. The tooltip still carries every code.
    return badge(`영수증 확인 필요 · ${receipt_codes[0]}`, {
      title: `성립하지 않는 실행 영수증 — ${receipt_codes.join(', ')}`,
      alert: true
    });
  }
  if (input.recovery) {
    return badge(input.recovery.badge, {
      title: input.recovery.title,
      alert: true
    });
  }
  if (input.gate?.tier === 'verify' && input.gate.gate_badge === '검증 실패') {
    return badge('검증 실패', {
      title: input.gate.reason || '',
      alert: true
    });
  }
  if (input.queue_failure) {
    return badge(`머지 실패 — ${mergeFailureText(input.queue_failure)}`, {
      title: input.queue_failure,
      alert: true
    });
  }
  if (input.auto_skip) {
    return badge(`자동 제외 — ${mergeFailureText(input.auto_skip)}`, {
      title: input.auto_skip,
      alert: true
    });
  }
  if (input.queued && !input.queue_active) {
    return badge(`머지 대기 #${input.queue_position}`);
  }
  if (input.gate?.enabled === true) {
    return badge('머지 가능');
  }
  if (input.gate?.tier === 'merged') {
    return badge('머지됨');
  }
  if (input.gate?.tier === 'closed_unmerged') {
    return badge('닫힘', { alert: true });
  }
  if (input.activity) {
    return badge('확인 중', { live: true });
  }
  // 외부 저장소 PR은 관측 실패가 아니라 관측 대상이 아니다 (UI-kyky §6.2):
  // 일반 `상태 확인 실패`는 고칠 것이 있다고 읽히지만 이 행에는 고칠 것이 없다.
  if (input.gate?.reason === 'pr_repo_foreign') {
    return badge('외부 저장소 PR', {
      title:
        '다른 저장소의 PR입니다. 이 워크스페이스에서는 상태를 관측·머지·정리하지 않습니다.'
    });
  }
  if (
    input.gate?.tier === 'undecidable' ||
    input.gate?.reason === 'mergeability_unknown'
  ) {
    return badge('상태 확인 실패', {
      title: input.gate.reason || '',
      alert: true
    });
  }
  if (
    input.gate?.tier === 'unobserved' ||
    input.gate?.tier === 'verify' ||
    input.gate?.gate_badge === '관측 대기'
  ) {
    return badge('확인 중');
  }
  return input.gate?.gate_badge
    ? badge(input.gate.gate_badge, {
        title: input.gate.reason || '',
        alert: input.gate.enabled !== true
      })
    : null;
}

/**
 * Project one `pr_wait` bead into a lane row, carrying whatever the server's PR
 * poller has observed (worker-phase2 §4/§5): the PR link, the gate/base badges,
 * and the two actions (§6).
 *
 * The PR stays a LINK (`#N ↗`), never a button — putting a view affordance and
 * an execute affordance side by side at the same weight is how a misclick
 * merges something. [머지] is disabled whenever the gate refuses, and the
 * disabled tooltip carries the refusal reason so the badge is not the only
 * explanation. [폐기] is visually subordinate: a misclick there discards a PR.
 * It is withheld entirely on a merged tile — a landed merge cannot be discarded
 * (discard spec §2), and there the cleanup retry — the row's
 * [워커로 이어가기] — is the button.
 *
 * The gate shown here is ADVISORY. The click re-queries `gh` server-side and
 * decides again, so a badge that went stale between render and click cannot
 * merge anything the fresh gate would refuse.
 *
 * @param {string} bead_id
 * @param {string} title
 * @param {Record<string, any>} observations - Snapshot `pr_observations` map.
 * @param {{ step: string, reason: string }|null} cleanup_failed - Durable
 * post-merge cleanup failure for this bead, if any (§6).
 * @param {import('../../utils/token-usage.js').UsageRecord|import('../../utils/token-usage.js').UsageProjection|null} [usage] - Token usage of the
 * bead's last attempt (UI-raqh §1).
 * @param {{ activity: 'checking'|'verifying'|null, merge_progress: { step: string }|null, queueing?: 'merge'|'cleanup'|null }|null} [active]
 * What the server is doing to this bead right now (UI-raqh §3/§4). `queueing`
 * is the client's own click-to-reply window instead: the request is in flight
 * and the server has not answered, so nothing is merging yet and the row must
 * not claim a step of a sequence it has not entered.
 * @param {'running'|'paused'|null} [conflict_session] - State of this bead's own
 * conflict-resolution attempt, when one exists (UI-dxgz §1).
 * @param {boolean} [external] - Whether this row is an EXTERNAL PR — one a
 * normal session delivered, with no worker attempt behind it (UI-7agi §5).
 * Two affordances change: [폐기] disappears (the server's discard needs the
 * durable lane membership an external row does not have), and a MERGED row
 * becomes a cleanup-retry [워커로 이어가기] button because nothing auto-cleans it. 충돌 해소 is NOT one
 * of them any more — the attempt-less dispatch (UI-w0hi §1) runs it.
 * @param {{ position: number, active: boolean, failure: string|null, waiting?: string|null, resolution?: import('../../data/worker-queue-store.js').ResolutionProjection|null, continuation_action?: any, hold?: any, authority?: any, review_dispatch?: any }|null} [merge_queue]
 * This row's place in the sequential merge queue (UI-5v7d §4): a 1-based
 * `position` while it waits (0 = not queued), whether the driver is on it right
 * now, and the reason it was skipped, if any.
 * @param {boolean} [wt_present] - Whether the delivering session's worktree is
 * still there (UI-w0hi §3/§4), server-observed per external row. Defaults true
 * so a durable row — which carries no such field — is unaffected.
 * @param {string|null} [auto_skip] - Why the automatic enroller is passing this
 * row over (UI-yk55 §3.4), or null when it is not. Only ever non-null while the
 * mode is ON: with it off the record is not the reason the row is standing
 * still, and a badge saying otherwise would be a lie.
 * @param {string|null} [base_exception] - `→ <target_base>` when the attempt
 * behind this row targets a base other than the declared one (UI-j6wa §3).
 * @param {import('../../data/worker-queue-store.js').CompletionStatus|null} [completion] - Bounded root completion status;
 * @param {Record<string, any>} [discard_operations] - UI-safe durable discard projection.
 * the durable journal itself never reaches the client (UI-x9tu §10).
 * @param {boolean} [auto_merge_on] - The workspace's global auto-merge toggle
 * (UI-58w8 §1). Read only to tell whether an AUTOMATIC enrolment still has a
 * driver behind it; it never gates a manual authority's continuation.
 * @param {{ merge_sha?: unknown, cleanup_cursor?: unknown, repo_operations?: unknown }} [progress_input]
 * @param {import('./lanes.js').DependencyChips|null} [dependency_chips] - 의존·
 * 겹침 칩 (UI-anna §5.3). PR 대기 행도 `⛓ blocked` · `⧉ 겹침` · `scope 없음`을
 * 받는다 — 레인이 바뀌어도 "이 이슈가 지금 무엇과 부딪히나"는 같은 질문이다.
 * 재료가 없으면 null이고 행은 그 줄을 그리지 않는다 (fail-quiet).
 * @param {{ active: boolean, failure: string|null, origin?: 'auto'|'click'|null }} [review_session] - 이 행의
 * `[리뷰 후 머지]` 세션 상태 (UI-d7fy §5.4). 실행 중이면 버튼이 잠기고, 마지막
 * 세션의 종료 사유는 게이트 뱃지 옆 텍스트가 된다. `origin`은 그 세션을 사람이
 * 눌렀는지 큐가 자동으로 띄웠는지다 (UI-qksl §7).
 * @param {{ foreign?: boolean, repo_slug?: string, pr_url?: string, pr_number?: number }} [external_pr]
 * The four PR facts the external-PR registry owns (UI-kyky §6.1), carried on the
 * synthesized overlay row only. `foreign === true` means the url names ANOTHER
 * repository, which this workspace never observes — so that row's PR link is
 * built from these verified values instead of the (absent) observation, and a
 * same-repo row keeps preferring what the poller observed. `repo_slug` alone
 * never re-decides `foreign`.
 * @param {boolean} [shelved] - 이 행이 `merge_shelved`에 있는지 (UI-sd12
 * §3.4, 외부 행 포함 UI-8d8y). true면 [머지] 대신 [보관 해제]를 싣고 레인은
 * `보관 N` 묶음에 그린다.
 * @returns {any}
 */
function prWaitRow(
  bead_id,
  title,
  observations,
  cleanup_failed,
  usage = null,
  active = null,
  conflict_session = null,
  external = false,
  merge_queue = null,
  wt_present = true,
  auto_skip = null,
  base_exception = null,
  completion = null,
  discard_operations = {},
  auto_merge_on = false,
  progress_input = {},
  dependency_chips = null,
  review_session = { active: false, failure: null, origin: null },
  external_pr = {},
  shelved = false
) {
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
  const obs = observations[bead_id] || null;
  const gate = obs && obs.gate ? obs.gate : null;
  const pr = obs && obs.pr ? obs.pr : null;
  // `foreign`은 서버가 origin과 대조해 판정한 사실이다 — `repo_slug`를 보고 다시
  // 판정하지 않는다 (UI-kyky §6.1).
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
  // 큐가 이 head에 쓴 자동 리뷰 dispatch claim과 그 앞의 슬롯 대기 (UI-qksl §3.1).
  // 둘 다 durable 행 필드이므로, 없는 행(구형 queue.json·아직 보류에 들어가지 않은
  // 행)은 아무것도 그리지 않는다 (fail-quiet).
  const review_dispatch = (merge_queue && merge_queue.review_dispatch) || null;
  const auto_review_wait =
    merge_queue?.hold?.auto_review_wait === 'slot' ? 'slot' : null;
  // A queued row the driver will NOT carry forward on its own: a legacy entry
  // with no authority, or an automatic enrolment sitting under a global toggle
  // that is off. For both the way forward is a fresh [머지] click, which the
  // server re-validates from a new authoritative observation before issuing a
  // new manual authority.
  // A row the coordinator is resolving without a person (§4). It IS queued —
  // the automatic review lane enrols it — so without this it falls into the
  // "queued rows have nothing to click but [취소]" branch and loses the button
  // §9 requires. Same shape as the three cases beside it: the click is the way
  // forward and the server re-validates before acting on it.
  const auto_resolution_phase =
    !!completion &&
    typeof completion === 'object' &&
    AUTO_RESOLUTION_PHASES.has(completion.phase);
  const needs_reclick =
    queued &&
    !queue_active &&
    (!authority ||
      auto_resolution_phase ||
      (authority.source === 'automatic' && !auto_merge_on));
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
  // A merge in flight owns the row: both buttons go quiet until it settles, so
  // a second click cannot land on an action the server would refuse anyway.
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
  // An already-merged PR whose cleanup stopped: the click re-runs the cleanup
  // from the top. Nothing retries automatically (§6), so this button is the
  // human's way back in once they have fixed whatever stopped it.
  // A repo_operations stall (verify/deploy script failed) is the same click:
  // the server re-runs the cleanup from the top, which re-runs the failed
  // script. Until UI-j2f0 the card hid the action for that step and left the
  // person guessing which drawer button would move the row (UI-q0uy §4.4
  // wanted the AI-repair ladder there; UI-s582 removed that ladder).
  // A `post_merge_jobs` stall is the same click again (UI-i60a §4): the resume
  // re-runs the cleanup, whose ledger reconcile decides whether the job is
  // re-adopted or re-run. UI-18a5 §3.2 names this button the row's
  // [워커로 이어가기] and puts [세션에서 이어가기] right in front of it.
  const cleanup_retry =
    !!cleanup_failed &&
    [
      'repo_operations',
      'post_merge_jobs',
      'branch_cleanup',
      'parent_close'
    ].includes(cleanup_failed.step) &&
    !!gate &&
    gate.tier === 'merged';
  // Which script stopped the cleanup, for the label: the projected failed
  // operation names it; without one the generic resume label stands.
  const stalled_script =
    !!cleanup_failed &&
    cleanup_failed.step === 'repo_operations' &&
    merge_step?.failed === true &&
    (merge_step.step === 'deploy' || merge_step.step === 'verify')
      ? merge_step.step
      : null;
  // The click's own in-flight window. It locks the buttons exactly as a merge
  // step does — a second click has nothing to land on — but it is NOT a merge
  // step: the server is still taking the request, and drawing 머지 중 1/6 here
  // made the bar run forward and then fall back to a queue position the moment
  // the real snapshot arrived. A stalled script's failed step is not in flight,
  // so its resume click has the same window.
  const queueing =
    active &&
    (!merge_step || stalled_script !== null) &&
    (active.queueing ?? null)
      ? active.queueing
      : null;
  const external_cleanup =
    external && !!cleanup_failed && !!gate && gate.tier === 'merged';
  // A re-click restores the action surface, but it cannot turn an otherwise
  // terminal/unknown gate into a server continuation (UI-vkk8 §2).
  const reclick_continuable =
    needs_reclick &&
    (enabled ||
      conflicting ||
      gate?.reason === 'base_behind' ||
      // 리뷰 보류 넷 전부 (UI-qksl §4 1번). 버튼이 나오는 사유와 재클릭이
      // 살아나는 사유가 갈리면, 넓힌 둘(`invalid`·`undetermined`)에서만 재클릭이
      // 죽는 자리가 생긴다.
      REVIEW_AFTER_MERGE_GATE_REASONS.has(gate?.reason) ||
      cleanup_retry ||
      external_cleanup);
  // 이 행이 [리뷰 후 머지]를 내는 행인가 (UI-d7fy §5.1, 사유 집합은 UI-qksl §4
  // 1번이 넷으로 넓혔다). `spec_id_missing`은 여전히 제외다 — 리뷰로 해소되지
  // 않고 Bead 메타데이터 write만이 고친다(UI-yqw9 사고 규칙). 이 행은 큐에
  // 들어가 authority를 받은 뒤에도 버튼을 유지한다: 자동 1회가 소진된 뒤 보류의
  // 출구가 그 버튼뿐이고, 세션이 실패하면 다시 눌러야 하기 때문이다.
  const review_after_merge = REVIEW_AFTER_MERGE_GATE_REASONS.has(gate?.reason);
  // An external conflict WITHOUT a worktree has nowhere to run: the dispatch
  // never recreates one (UI-w0hi 제외), so the button would refuse every time.
  // The badge reports the conflict; the user resolves it in their own session.
  const external_conflict_unresolvable =
    external && conflicting && wt_present === false;
  const discard = discardProjection(discard_operations, bead_id, {
    external,
    merge_active: queue_active || merge_step?.step === 'merge',
    merge_queued: queued,
    conflict_active: !!conflict_session,
    cleanup_active,
    merged: !!cleanup_failed || gate?.tier === 'merged'
  });
  const discard_blocks_merge = !!discard.operation;
  // 실패 행 재료 (UI-jw27 §4, UI-g0lk §5.1): 멈춘 머지 후 정리, needs_human
  // 종단, holding 보류. 실패한 폐기는 `discard` 투영이 싣는다. `[세션에서
  // 이어가기]`의 유무는 이 재료를 읽는 `tileResolveFields` 하나가 정한다
  // (UI-18a5 §3.2) — 이 행은 재료만 싣고 다시 판정하지 않는다.
  const failure_material = {
    cleanup: !!cleanup_failed,
    cleanup_retry: cleanup_retry || external_cleanup,
    completion_phase:
      completion?.phase === 'needs_human' || completion?.phase === 'holding'
        ? completion.phase
        : null
  };
  // The queue will act on this row without a click (UI-kxhf): it is queued and
  // nothing terminal or choice-bound stands in the way.
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
  const rendered_status_badge =
    status_badge?.live === true && status_badge.title
      ? html`<span title=${status_badge.title}>${status_badge.label}</span>`
      : status_badge?.label || null;
  const receipt_badge_codes = receiptBadgeCodes(
    obs && obs.receipt_check ? obs.receipt_check : null
  );
  return {
    id: bead_id,
    title: external ? html`${title}<span class="muted"> · 세션</span>` : title,
    reason:
      cleanup_failed && merge_step?.active !== true
        ? cleanupStalledReason(cleanup_failed.step)
        : 'PR 대기',
    draggable: false,
    done: true,
    lane: 'pr_wait',
    ...(dependency_chips ? { dependency_chips } : {}),
    // Card tone, not an affordance (UI-w0hi §4): an external row came from
    // somewhere else, and the lane reads better when that is visible before the
    // 세션 badge is read.
    external,
    // 외부 저장소 PR은 관측이 없으므로 (poller가 `pr_repo_foreign`으로 멈춘다)
    // 검증된 등록부 값이 링크의 유일한 재료다 (UI-kyky §6.1). 같은 저장소 행은
    // 기존 관측값이 그대로 우선한다.
    pr_number:
      foreign_pr_number ??
      (pr && typeof pr.number === 'number' ? pr.number : null),
    pr_url: foreign_pr_url || (pr && typeof pr.url === 'string' ? pr.url : ''),
    ...(foreign_repo ? { foreign_repo } : {}),
    // miniRow already owns a one-badge tooltip seam under these legacy field
    // names. Reuse it for every resolved status so raw failure codes and hidden
    // lower-grade facts stay inspectable without another badge (UI-vkk8 §3).
    completion_badge:
      status_badge?.live !== true && status_badge?.title
        ? status_badge.label
        : null,
    completion_title: status_badge?.title || '',
    // 종단한 완료 실패가 남긴 로그 경로 (UI-8w4t §4). `needs_human` 카드에만
    // 싣는다 — 진행 중인 완료의 로그는 아직 실패를 설명하지 않는다. 값이 없으면
    // (실행 전 실패) 필드 자체를 넘기지 않아 행이 요소를 그리지 않는다. 위
    // 툴팁 `세부`는 raw를 계속 싣는다.
    ...(completion?.phase === 'needs_human' &&
    typeof completion.log_path === 'string' &&
    completion.log_path.length > 0
      ? { log_path: completion.log_path }
      : {}),
    // 회계 잔여 판정 칩의 재료 (UI-h6t1 §4.2). 코드가 하나도 없으면 필드 자체를
    // 넘기지 않는다 — 빈 배열은 행이 그릴 것 없는 칩을 판정하게 만든다.
    ...(receipt_badge_codes.length > 0
      ? { receipt_badge: { codes: receipt_badge_codes } }
      : {}),
    badges: rendered_status_badge ? [rendered_status_badge] : [],
    // Which badge (if any) reports live server activity rather than a settled
    // state — the row draws that one with the breathing dot and no colour
    // emphasis, because nobody has to act on it.
    live_badge: status_badge?.live === true ? rendered_status_badge : null,
    usage,
    alert: status_badge?.alert === true,
    // A queued row has nothing to click but [취소]: the merge is the driver's
    // now, and a second [머지] would only be a no-op re-queue (UI-5v7d §4).
    // The exception is a row the driver will not carry forward on its own
    // (UI-58w8 §1) — there the click IS the recovery path, and the server
    // re-validates the PR identity before issuing a new manual authority.
    // A shelved row has no [머지] (UI-sd12 §3.4): the server refuses its
    // enqueue, and [보관 해제] beside it is the way back.
    merge_action: shelved
      ? false
      : gate?.tier === 'merged' && !cleanup_retry && !external_cleanup
        ? false
        : !queued ||
          continuation_required ||
          needs_reclick ||
          review_after_merge,
    cancel_action: queued && !continuation_required,
    shelved,
    // [보관] stands on a row until its merge is observed; [보관 해제] on every
    // shelved row (UI-sd12 §3.4). A session-delivered external row is shelvable
    // too — only a foreign-repository row, which nothing here merges, is not
    // (UI-8d8y).
    shelve_action: foreign_pr
      ? null
      : shelved
        ? 'unshelve'
        : gate?.tier === 'merged' ||
            !!cleanup_failed ||
            (typeof progress_input.merge_sha === 'string' &&
              progress_input.merge_sha.length > 0)
          ? null
          : 'shelve',
    // Only a step still running locks the button: a stopped cleanup is a
    // step object too, and [보관 해제] is that row's way back to its retry.
    shelve_enabled: merge_step?.active !== true,
    shelve_title: shelved
      ? '보관을 풉니다 — 자동 머지가 켜져 있으면 다음 관측에서 다시 머지 대상이 됩니다'
      : '자동 머지·일괄 머지에서 이 PR을 빼고 [보관 해제]까지 둡니다 (머지 큐에 있으면 빠집니다)',
    // 잠겨야 하는 것은 되돌릴 수 없는 머지 효과뿐이다 (UI-d7fy §5.6).
    cancel_enabled: !queue_active && !(recovery && recovery.lock_actions),
    cancel_title:
      recovery && recovery.lock_actions
        ? `${recovery.badge} — 중단하려면 상단 자동 머지 중단을 사용하세요`
        : queue_active
          ? '머지 진행 중 — 취소할 수 없습니다'
          : '머지 큐에서 이 항목을 뺍니다 (다시 [머지]로 넣을 수 있습니다)',
    discard,
    discard_action: discard.action,
    failure_material,
    merge_step,
    discard_enabled: discard.enabled,
    discard_title: discard.title,
    // A conflicting PR keeps [머지] clickable on purpose: that click is what
    // dispatches the resolution session (§6), and it merges nothing. Once that
    // session exists, there is nothing left to dispatch until it settles.
    // A worktree-less external conflict vetoes even a GREEN gate: the
    // click-time branch order puts DIRTY before the gate, so the server refuses
    // a conflicting external PR whatever its cached eligibility says (UI-7agi §5).
    merge_enabled:
      // A stalled verify/deploy script leaves its failed step on the row; that
      // is the very state the `… 재시도 후 정리` click exists for, not a step in
      // flight.
      (!merge_step || stalled_script !== null) &&
      // The click is still in flight. It used to be the fake merge step that
      // held the button; the lock has to survive that step going away.
      !queueing &&
      !conflict_session &&
      !discard_blocks_merge &&
      !base_exception &&
      !(recovery && recovery.lock_actions) &&
      !external_conflict_unresolvable &&
      // 리뷰 세션이 도는 동안은 잠근다 (UI-d7fy §5.2 per-Bead in-flight 가드):
      // 두 번째 클릭은 서버에서도 no-op이므로, 버튼이 살아 있으면 아무 일도
      // 하지 않는 클릭만 만든다.
      review_session.active !== true &&
      // A re-click recovery stays clickable on a CLOSED gate on purpose
      // (UI-58w8 §1): stale receipt and BEHIND are exactly the gates the new
      // authority's continuation exists to carry, and the server re-observes
      // the PR before it issues one.
      // §9: the click is ACTIVE in the three automatic-resolution phases,
      // whatever the gate currently says. It is not a re-click on a terminal
      // gate (the UI-vkk8 §2 rule `reclick_continuable` guards): the server
      // has a defined effect for it — end the wait, clear `auto_resolution`,
      // return to `gating`, and promote the automatic authority to manual,
      // which is exactly the authority that waives the receipt hold those
      // phases are usually waiting on.
      (enabled ||
        conflicting ||
        gate?.reason === 'base_behind' ||
        // 리뷰 보류 넷 (UI-qksl §4 1번): probe를 완료하지 못한 행도 여기 있다 —
        // 리뷰 세션이 최종 head에 정확히 쓴 새 영수증은 probe 없이 `equal`로
        // 판정되므로, 반복되는 probe 오류의 출구도 이 클릭이다.
        review_after_merge ||
        cleanup_retry ||
        external_cleanup ||
        reclick_continuable ||
        (auto_resolution_phase && !queue_active)),
    // The label says what the click DOES: on a conflicting gate it dispatches a
    // resolution session, and a button reading 머지 there is the misread that
    // put this bead here (UI-dxgz §2).
    // 해소만 하고 멈추는 것처럼 읽히던 라벨을 실제 동작에 맞춘다 (UI-yk55 §1):
    // 이 클릭이 띄우는 세션은 완료 후 자동으로 재머지된다 — 툴팁이 이미 그렇게
    // 말하고 있었고, 라벨만 어긋나 있었다.
    // 정리 실패 행의 주 버튼은 그 행의 `[워커로 이어가기]`다 (UI-18a5 §3.2):
    // 무엇부터 다시 도는지(배포·검증·실패 단계)는 툴팁이 말한다.
    merge_label: continuation_required
      ? '이어하기 선택'
      : cleanup_retry || external_cleanup
        ? '워커로 이어가기'
        : conflicting && !merge_step && !cleanup_retry
          ? '충돌 해소 후 머지'
          : gate?.reason === 'base_behind'
            ? 'base 갱신 후 머지'
            : review_after_merge
              ? '리뷰 후 머지'
              : needs_reclick
                ? '다시 머지'
                : undefined,
    merge_title: discard_blocks_merge
      ? discard.error
        ? `폐기 실패: ${discard.error} — [워커로 이어가기]로 다시 시도하거나 상태를 확인하세요`
        : `폐기 진행 중 — ${discard.progress || '완료를 기다리세요'}`
      : continuation_required
        ? '실행 provider가 변경되었습니다 — 이어갈 방식을 선택하세요'
        : queueing
          ? '요청을 보내는 중 — 서버 응답을 기다립니다'
          : stalled_script
            ? `머지 완료 — ${stalled_script === 'deploy' ? '배포' : '검증'} 스크립트가 실패해 정리가 멈췄습니다. 클릭하면 Worker가 ${stalled_script === 'deploy' ? '배포를' : '검증을'} 다시 돌린 뒤 저장소 작업부터 정리를 잇습니다`
            : merge_step
              ? `머지 진행 중 — ${merge_step.label}`
              : external_cleanup
                ? '머지 완료 — 클릭하면 Worker가 실패한 정리를 다시 돌립니다'
                : external_conflict_unresolvable
                  ? '워크트리 없음 — 세션에서 직접 해소하세요'
                  : conflict_session === 'running'
                    ? '충돌 해소 세션 실행 중 — 완료 후 다시 머지하세요'
                    : conflict_session === 'paused'
                      ? '충돌 해소 세션 일시정지 — 재개 후 완료되면 머지하세요'
                      : cleanup_retry
                        ? `머지 완료 — 클릭하면 Worker가 남은 정리를 ${cleanup_failed ? `${cleanupStepLabel(cleanup_failed.step)} 단계` : '실패 단계'}부터 다시 돌립니다`
                        : conflicting
                          ? '충돌 — 큐에 넣으면 해소 세션을 띄우고 완료 후 자동으로 재머지합니다'
                          : gate?.reason === 'base_behind'
                            ? 'base를 자동 갱신한 뒤 머지합니다'
                            : review_session.active === true
                              ? review_session.origin === 'auto'
                                ? '자동 리뷰 세션 실행 중 — 끝나면 영수증을 다시 판정합니다'
                                : '리뷰 세션 실행 중 — 끝나면 영수증을 다시 판정합니다'
                              : gate?.reason === 'review_receipt_missing'
                                ? '리뷰 영수증 없음 — 머지 게이트 보류입니다. 클릭하면 기록된 세션을 이어 리뷰만 수행시키고, 영수증이 최종 head에 유효해지면 큐가 머지합니다'
                                : gate?.reason === 'review_receipt_stale'
                                  ? 'head 재작성됨(영수증이 현재 head의 조상이 아님) — 머지 게이트 보류입니다. 클릭하면 기록된 세션을 이어 최종 head를 다시 리뷰시키고, 영수증이 유효해지면 큐가 머지합니다'
                                  : gate?.reason === 'review_receipt_invalid'
                                    ? '리뷰 영수증 기록이 성립하지 않음 — 머지 게이트 보류입니다. 클릭하면 기록된 세션을 이어 최종 head를 다시 리뷰시키고, 영수증이 유효해지면 큐가 머지합니다'
                                    : gate?.reason ===
                                        'review_receipt_undetermined'
                                      ? '리뷰 영수증 ancestry probe 미완료 — 머지 게이트 보류입니다. 클릭하면 기록된 세션을 이어 최종 head를 다시 리뷰시키고, 새 영수증이 최종 head에 유효해지면 큐가 머지합니다'
                                      : gate?.reason === 'spec_id_missing'
                                        ? 'native spec_id 미기록 — bd update --spec-id로 기록한 뒤 다시 머지하세요'
                                        : enabled
                                          ? `머지 (${gate.gate_badge}) — 큐에 넣어 순서대로 머지합니다 (차례가 되면 다시 확인)`
                                          : gate && gate.tier === 'merged'
                                            ? // Already merged with no cleanup failure recorded: the cleanup
                                              // is running, so "머지 불가: 관측 대기" would be a lie about why.
                                              '머지됨 — 머지 후 정리 진행 중'
                                            : `머지 불가: ${(gate && gate.reason) || '관측 대기'}`
  };
}

/**
 * One entry key of a view-local in-flight set (UI-f2sy §4). Monitor draws many
 * repositories at once, so a bead id alone does not name the row a click was
 * made on — the `root_dir` goes in front.
 *
 * @param {string} root_dir
 * @param {string} bead_id
 * @returns {string}
 */
export function pendingKey(root_dir, bead_id) {
  return `${root_dir}\u0000${bead_id}`;
}

/**
 * The merge material of a repository that has no group in this model — every
 * row reads as unqueued (fail-quiet).
 *
 * @type {LaneMergeQueue}
 */
const EMPTY_MERGE = {
  positions: new Map(),
  resolutions: new Map(),
  continuations: new Map(),
  authorities: new Map(),
  state: { active: null, failures: {}, waiting: null },
  auto_excluded: [],
  running: false
};

/**
 * @typedef {'merge'|'cleanup'|'resolve'} PrWaitPendingKind
 */

/**
 * @typedef {Object} PrWaitRowsInput
 * @property {string} root_dir - The repository whose PR 대기 rows to project.
 * @property {Record<string, any>} queue - That repository's decorated queue
 * snapshot (Worker: the queue store; Monitor: the pipeline entry, with a
 * mutation reply's queue adopted over it).
 * @property {LaneQueueGroup|null|undefined} group - That repository's group of
 * the lane model — the merge material, declared base, repository operations
 * and runner catalog. Absent reads as an empty merge queue.
 * @property {LaneModel} model - The lane model; only this repository's items
 * are read (title, chips, plan bundle, filter state, interactive sessions).
 * @property {(kind: PrWaitPendingKind, root_dir: string, bead_id: string) => boolean} isPending -
 * The view-local in-flight sets keyed by `(root_dir, bead_id)`: a [머지]
 * click, a cleanup retry, or a `[세션에서 이어가기]` click still waiting for its
 * reply.
 * @property {(item: LaneItem) => DependencyChips|null} dependencyChipsOf - The
 * tab's dependency/overlap chips for one lane item.
 */

/**
 * Project one repository's PR 대기 rows (UI-f2sy §4). 열은 스냅샷 `pr_wait`
 * 전체다: 충돌 해소 세션이 도는 bead는 실행 중 타일과 PR 대기 행에 동시에 서고,
 * 그 두 카드가 같은 사실의 다른 면을 말한다 (UI-dxgz §1).
 *
 * @param {PrWaitRowsInput} input
 * @returns {any[]}
 */
export function prWaitRowsOf(input) {
  const { root_dir, model: m } = input;
  const q = objectOf(input.queue);
  const group = input.group || null;
  const merge = group ? group.merge : EMPTY_MERGE;
  const attempts = objectOf(q.attempts);
  const impl_attempts = /** @type {any[]} */ (
    Object.values(attempts).filter(isImplementationAttempt)
  );
  /** @type {Map<string, any>} */
  const attempt_by_id = new Map();
  for (const attempt of impl_attempts) {
    attempt_by_id.set(attempt.attempt_id, attempt);
  }
  /** @type {Map<string, LaneItem>} */
  const item_by_id = new Map();
  for (const item of [
    ...m.pr_wait,
    ...m.running,
    ...m.queue,
    ...m.runnable,
    ...m.done
  ]) {
    if (item.root_dir === root_dir && !item_by_id.has(item.id)) {
      item_by_id.set(item.id, item);
    }
  }
  /**
   * PR 대기 행이 비교 대상으로 삼을 attempt의 base (UI-j6wa §3): 충돌 해소
   * 세션은 제외하고 (그 세션의 base는 PR이 향하는 곳이 아니다), 남은 것 중
   * `started_at`이 가장 최신인 것을 쓴다.
   *
   * @param {string} bead_id
   * @returns {string|null}
   */
  const targetBase = (bead_id) => {
    /** @type {any|null} */
    let picked = null;
    for (const a of impl_attempts) {
      if (!a || a.bead_id !== bead_id || resolvesConflict(a, attempt_by_id)) {
        continue;
      }
      if (
        picked === null ||
        (typeof a.started_at === 'number' ? a.started_at : 0) >=
          (typeof picked.started_at === 'number' ? picked.started_at : 0)
      ) {
        picked = a;
      }
    }
    return picked && typeof picked.target_base === 'string'
      ? picked.target_base
      : null;
  };
  // 실행 중(leaf paused 포함) 충돌 해소 세션 (UI-dxgz §1): 살아 있는 세션만
  // 숨쉬는 배지를 얻고, 두 상태 모두 [머지]/[폐기]를 잠근다.
  /** @type {Map<string, 'running'|'paused'>} */
  const conflict_sessions = new Map();
  for (const tile of m.running) {
    if (
      tile.root_dir !== root_dir ||
      tile.run_state === 'failed' ||
      tile.conflict_resolution !== true
    ) {
      continue;
    }
    if (tile.run_state !== 'paused') {
      conflict_sessions.set(tile.id, 'running');
    } else if (!conflict_sessions.has(tile.id)) {
      conflict_sessions.set(tile.id, 'paused');
    }
  }
  const auto_merge_skips = objectOf(q.auto_merge_skips);
  // 보관 기록 (UI-sd12 §3.1). 키가 없는 구서버 스냅샷은 보관 행이 없다.
  const merge_shelved = objectOf(q.merge_shelved);
  /** @type {Set<string>} */
  const auto_excluded = new Set(merge.auto_excluded);
  const pr_obs = objectOf(q.pr_observations);
  const pr_activity = objectOf(q.pr_activity);
  const cleanup_failed = objectOf(q.cleanup_failed);
  const discard_operations = objectOf(q.discard_operations);
  const bead_workflow = objectOf(q.bead_workflow);
  const bead_titles = objectOf(q.bead_titles);
  const merge_state = q.merge_queue_state || { active: null, failures: {} };
  const merge_waiting = merge.state.waiting;
  // 큐 행이 그대로 싣고 오는 보류·자동 dispatch claim (UI-qksl §3.1). 레인
  // 모델은 이 둘을 투영하지 않으므로 스냅샷에서 직접 읽는다; 행이 없거나 필드가
  // 없으면 PR 대기 행은 아무것도 그리지 않는다 (fail-quiet).
  /** @type {Map<string, any>} */
  const merge_entries = new Map();
  for (const entry of Array.isArray(q.merge_queue) ? q.merge_queue : []) {
    if (entry && typeof entry === 'object' && entry.bead_id) {
      merge_entries.set(entry.bead_id, entry);
    }
  }
  // 레인 출처는 durable 항목에서 판정한다 (UI-us7l §3): 충돌 해소 세션이 도는
  // bead는 `item`이 실행 타일이라 그 attempt의 레인은 PR의 레인이 아니다.
  const last_impl_by_bead = latestImplementationAttempts(attempts);
  return (Array.isArray(q.pr_wait) ? q.pr_wait : []).map(
    (/** @type {any} */ e) => {
      const item = item_by_id.get(e.bead_id);
      const pr_row = prWaitRow(
        e.bead_id,
        item?.title || bead_titles[e.bead_id] || e.bead_id,
        pr_obs,
        cleanup_failed[e.bead_id] || null,
        sumAttemptUsage(
          attempts,
          e.bead_id,
          /** @type {any} */ (group)?.runner_catalog || null
        ),
        // The server's own progress wins; the local pending only covers the
        // window before the first snapshot carrying it arrives.
        pr_activity[e.bead_id] ||
          (input.isPending('merge', root_dir, e.bead_id)
            ? {
                activity: null,
                merge_progress: null,
                queueing: /** @type {const} */ ('merge')
              }
            : input.isPending('cleanup', root_dir, e.bead_id)
              ? {
                  activity: null,
                  merge_progress: null,
                  queueing: /** @type {const} */ ('cleanup')
                }
              : null),
        conflict_sessions.get(e.bead_id) || null,
        // Overlaid by the server (UI-7agi §2) — absent on every durable row.
        e.external === true,
        {
          position: merge.positions.get(e.bead_id) || 0,
          active: merge_state.active === e.bead_id,
          failure: objectOf(merge_state.failures)[e.bead_id] || null,
          waiting:
            merge_waiting && merge_waiting.bead_id === e.bead_id
              ? merge_waiting.reason
              : null,
          resolution: merge.resolutions.get(e.bead_id),
          continuation_action: merge.continuations.get(e.bead_id),
          authority: merge.authorities.get(e.bead_id) || null,
          hold: merge_entries.get(e.bead_id)?.hold || null,
          review_dispatch: merge_entries.get(e.bead_id)?.review_dispatch || null
        },
        // Also overlay-only (UI-w0hi §3): a durable row has no field here and
        // must keep the pre-existing behaviour, so absence reads as present.
        e.wt_present !== false,
        // 자동 모드가 꺼져 있으면 제외 기록은 이 행이 서 있는 이유가 아니다
        // (UI-yk55 §3.4).
        q.auto_merge === true && auto_excluded.has(e.bead_id)
          ? auto_merge_skips[e.bead_id]?.reason || ''
          : null,
        baseException(
          group ? group.declared_base : null,
          targetBase(e.bead_id)
        ),
        objectOf(q.completion_status)[e.bead_id] || null,
        discard_operations,
        q.auto_merge === true,
        {
          merge_sha: e.merge_sha,
          cleanup_cursor: e.cleanup_cursor,
          repo_operations: group ? group.repo_operations : []
        },
        item ? input.dependencyChipsOf(item) : null,
        reviewSessionRowState(attempts, e.bead_id),
        // 등록부가 소유한 네 필드 (UI-kyky §6.1). 합성 행에만 실리고, merge
        // queue만으로 합성한 행에는 없다 — 없으면 없는 대로 넘긴다.
        {
          ...(e.foreign === true ? { foreign: true } : {}),
          ...(typeof e.repo_slug === 'string'
            ? { repo_slug: e.repo_slug }
            : {}),
          ...(typeof e.pr_url === 'string' ? { pr_url: e.pr_url } : {}),
          ...(typeof e.pr_number === 'number' ? { pr_number: e.pr_number } : {})
        },
        // 세션이 배달한 외부 행도 보관된다 (UI-8d8y) — 기록이 곧 판정이다.
        Object.hasOwn(merge_shelved, e.bead_id)
      );
      // 세션·워커 이어가기 짝은 `tileResolveFields` 하나가 정한다 (UI-18a5
      // §3.2): 이 행의 실패 재료와 Bead의 대화형 세션·거절 기록을 그 함수에
      // 넘기고, 그 답만 싣는다.
      const row = {
        ...pr_row,
        ...tileResolveFields(
          {
            ...pr_row,
            interactive_sessions: item?.interactive_sessions,
            conversation_refusal: item?.conversation_refusal
          },
          input.isPending('resolve', root_dir, e.bead_id)
        )
      };
      return {
        ...row,
        ...prWaitLaneOriginFields(e, last_impl_by_bead),
        // 우선순위·타입·라벨 필터의 흐림 판정은 레인 모델이 소유한다 (UI-p7s2
        // §6). PR 대기 행은 행 투영이 새로 만드는 객체라 그 키를 여기서 옮겨
        // 실어야 한다.
        ...(item?.filter_match === undefined
          ? {}
          : { filter_match: item.filter_match }),
        workflow: bead_workflow[e.bead_id] || null,
        // plan 묶음은 레인 모델이 얹은 것을 옮긴다 (UI-ruwu §2): PR 대기 행은 행
        // 투영이 새로 만드는 객체라 키를 여기서 실어야 하고, 없으면 옮길 것도
        // 없다 (fail-quiet).
        ...(item?.plan_group ? { plan_group: item.plan_group } : {}),
        priority: item?.priority,
        from_id: item?.from_id,
        worker_created_from: item?.worker_created_from,
        worker_created_from_root_dir: item?.worker_created_from_root_dir,
        ...(item?.created_at === undefined
          ? {}
          : { created_at: item.created_at }),
        ...(item?.updated_at === undefined
          ? {}
          : { updated_at: item.updated_at })
      };
    }
  );
}
