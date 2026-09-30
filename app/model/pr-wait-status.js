/**
 * The PR-wait row status vocabulary (UI-5v7d §4, UI-vkk8 §3, UI-hk74 §9,
 * UI-d7fy §5.4, UI-qksl §4): merge-queue skip and wait texts, the completion
 * projection and the one priority-ordered status badge a PR row shows. Moved
 * verbatim from `views/worker/index.js` (UI-dbn6 P1-r2) so the pipeline and the
 * retiring Worker view read one owner. Pure: no template, no browser global.
 */
import { failureSentence } from './failure-labels.js';
import { formatTimestampLocal } from './relative-time.js';

/**
 * Poller activity replaces a gate badge ONLY where it changes what the badge
 * MEANS (UI-raqh §3): "관측 대기" while a gh round-trip is actually in flight is
 * 확인중, and "검증 대기" while the suite is actually running is 검증 중.
 * Anywhere else — 머지 가능, 머지됨, 관측 오류 — the poller working
 * changes nothing about the state, and swapping the badge there would make the
 * row flicker every poll interval for no information.
 *
 * @type {Array<{ from: string, activity: 'checking'|'verifying', to: string }>}
 */
const ACTIVITY_BADGE_SUBSTITUTIONS = [
  { from: '관측 대기', activity: 'checking', to: '확인중' },
  { from: '검증 대기', activity: 'verifying', to: '검증 중' }
];

/**
 * The badge a row shows for its verification signal, after the activity
 * substitution above.
 *
 * @param {string} gate_badge
 * @param {'checking'|'verifying'|null} activity
 * @returns {{ label: string, live: boolean }}
 */
export function activityBadge(gate_badge, activity) {
  for (const rule of ACTIVITY_BADGE_SUBSTITUTIONS) {
    if (gate_badge === rule.from && activity === rule.activity) {
      return { label: rule.to, live: true };
    }
  }
  return { label: gate_badge, live: false };
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
 * Human text for a rejected manual merge-queue placement.
 *
 * @param {unknown} reason
 * @returns {string}
 */
export function mergeQueueRefusalText(reason) {
  if (reason === 'lane_occupied') {
    return '실행 레인에 남아 있어 머지 대상이 아닙니다';
  }
  const base = '머지 큐에 넣지 못했습니다 (이미 대기 중이거나 대상 아님)';
  return typeof reason === 'string' && reason.length > 0
    ? `${base}: ${reason}`
    : base;
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
 * @param {import('./worker-queue-store.js').ResolutionProjection|null|undefined} resolution
 * @returns {{ badge: string, live: boolean }|null}
 */
export function resolutionView(resolution) {
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
export const AUTO_RESOLUTION_PHASES = new Set([
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
export const REVIEW_AFTER_MERGE_GATE_REASONS = new Set([
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
 * @param {import('./worker-queue-store.js').CompletionStatus|null|undefined} completion
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
 * @param {import('./worker-queue-store.js').CompletionStatus|null|undefined} completion
 * @param {{ label: string, details: string[], live: boolean }|null} [auto_resolution] - The
 * precomputed {@link autoResolutionBadge} for the same row.
 * @returns {{ badge: string, title: string, alert: boolean, lock_actions: boolean }|null}
 */
export function completionView(completion, auto_resolution = null) {
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
      ? badge('정리 재시도 요청 중', {
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
