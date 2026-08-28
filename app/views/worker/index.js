/**
 * Worker console — queue management + running-session view (spec §5.1–§5.3).
 *
 * Candidate lanes are live Board Ready/Blocked data read from the SAME
 * per-subscription issue stores as the Board tab (no separate candidate
 * storage). The single waiting queue + Done lanes are driven by the
 * `worker-queue` subscription (worker-phase2 §3 collapsed the serial/parallel
 * duality into ONE lane). Placing a candidate into the queue — the card's
 * `[대기로 ↴]`, the place menu, or the overlap popover's one-click placement
 * (the candidate lane is no longer a drag source, UI-d13v §6) — issues a
 * `worker-queue-place` mutation carrying the current queue revision; on a CAS
 * conflict the reply's current snapshot is adopted and the request retried
 * once. A waiting/serial row's `✕` sends it back to the candidates.
 *
 * The ▶/⏸ controls flip `auto_advance`, and the slot editor sets the
 * concurrency cap (`worker-queue-set-slots`, same CAS discipline; lower bound
 * 1 — which is exactly the retired serial lane). Running and failed decision
 * tiles are derived from the queue snapshot's `attempts`, which the server-side
 * scheduler fills as sessions dispatch and terminate. Unhandled failures are
 * projected directly from attempt records; there is no breaker object behind
 * them (worker-phase2 §2).
 *
 * LAYOUT (worker-phase2 §7). The lane row is the spec's four columns —
 * 대기 · 실행 중 · PR 대기 · 완료 — so a bead's whole life reads left to right in
 * one row: it waits, it runs, its PR waits for the human click, it merges.
 * 실행 중 is a COLUMN, not the banner-level grid it used to be, because the
 * sketch draws it as one; the tile grid template is unchanged and simply renders
 * as that column's body.
 *
 * The candidate pane is kept as a fifth, visually distinct SOURCE pane in front
 * of those four. It is not a fifth bead state — it is the Board feed a bead is
 * placed OUT of, ordered by the sort chain rather than the Board's manual rank
 * (UI-d13v §4·§6; the Worker tab reads no ui-order). It stays dashed
 * (`worker-pane--src`) precisely so it does not read as one of the four.
 */
import { html, render } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import {
  DONE_RANGE_OPTIONS,
  closedRangeSince,
  normalizeDoneRange
} from '../../data/closed-range.js';
import { createListSelectors } from '../../data/list-selectors.js';
import { isImplementationAttempt } from '../../utils/active-attempts.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { resolveContinuationMismatch } from '../../utils/continuation-dialog.js';
import { formatTimestampLocal } from '../../utils/relative-time.js';
import { requestResumeInstructions } from '../../utils/resume-instructions-dialog.js';
import { sessionRefDrawerInput } from '../../utils/session-ref.js';
import { showToast } from '../../utils/toast.js';
import { sumAttemptUsage } from '../../utils/token-usage.js';
import { watchMobile } from '../../utils/viewport.js';
import { isWorkerSerial } from '../../utils/worker-serial.js';
import {
  CANDIDATE_SORT_PRESETS,
  SORT_KEY_OPTIONS,
  chainOf,
  flipChainStepDir,
  loadCandidateSort,
  normalizeCandidateSort,
  presetIdOf,
  saveCandidateSort,
  setChainStepKey
} from './candidate-sort.js';
import { failureSentence, failureText } from './failure-labels.js';
import { createLaneCollapse } from './lane-collapse.js';
import { createLaneDrag } from './lane-drag.js';
import { baseException, buildLanes, resolvesConflict } from './lane-model.js';
import {
  discardCompletionMessage,
  discardConfirmationMessage,
  discardProjection,
  miniRow,
  nowPanel,
  paneTemplate,
  repoOpsStripTemplate,
  reviewSessionRowState,
  staleWorkProjection,
  waitBody
} from './lanes.js';
import { cleanupStalledReason, cleanupStepLabel } from './merge-steps.js';
import { isPrWaitCleanupActive, prWaitProgress } from './pr-wait-progress.js';
import { deriveWorkerBlockers } from './queue-blockers.js';
import { deriveWorkerOverlaps, workerPlacementPlan } from './queue-overlaps.js';
import { createRepoOpsScriptViewer } from './repo-ops-script-viewer.js';
import { createRepoOpsSettings } from './repo-ops-settings.js';
import { createRepoOpsDrawer } from './repo-ops-timeline.js';
import { runningGridTemplate } from './running-grid.js';
import { createTranscriptDrawer } from './transcript-drawer.js';
import { createWorkspaceAdapter } from './workspace-adapter.js';

/**
 * @import { LaneItem, LaneModel, LaneQueueGroup } from './lane-model.js'
 */

export { mergeStepView } from './merge-steps.js';

/**
 * Lower bound on the concurrency cap, mirroring the server's `MIN_SLOTS`
 * (worker-phase2 §3). The server rejects anything below it; the editor clamps
 * so a stray keystroke never sends a value that would just bounce.
 *
 * @type {number}
 */
const MIN_SLOTS = 1;

/** Fixed upper bound of the serial-lane dropdown (UI-04vo §1). */
const SERIAL_LANE_MAX = 5;

/**
 * 스냅샷이 아직 도착하지 않았을 때 템플릿이 읽는 빈 대기 그룹 (§6). `groups:
 * 'all'`이므로 스냅샷이 있는 한 그룹은 언제나 있고, 이 상수는 그 하나뿐인
 * 예외를 그리는 자리다 — 종전 `currentQueue()`의 빈 스냅샷 폴백과 같은 역할.
 *
 * @type {LaneQueueGroup}
 */
const EMPTY_QUEUE_GROUP = {
  root_dir: '',
  name: '',
  auto_advance: false,
  auto_merge: false,
  slots: MIN_SLOTS,
  revision: 0,
  runner_catalog: {},
  items: [],
  sublanes: { parallel: [], serial: [] },
  serial_lane_count: 0,
  raw_queue_length: 0,
  live_count: 0,
  over_cap: false,
  merge: {
    positions: new Map(),
    resolutions: new Map(),
    continuations: new Map(),
    authorities: new Map(),
    state: { active: null, failures: {}, waiting: null },
    auto_excluded: [],
    running: false
  },
  token_total: null,
  cleanup_failures: [],
  declared_base: null,
  repo_operations: []
};

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function objectOf(value) {
  return value && typeof value === 'object'
    ? /** @type {Record<string, any>} */ (value)
    : {};
}

/**
 * Display-filter state for the candidate SOURCE pane (UI-ki09), persisted under
 * this localStorage key.
 *
 * @type {string}
 */
const CANDIDATE_FILTER_KEY = 'beads-ui.worker.candidate-filter';

/**
 * @typedef {{ show_blocked: boolean, spec: 'all'|'with'|'without' }} CandidateFilter
 */

/**
 * blocked is hidden by DEFAULT: a blocked bead cannot run now, so it is noise in
 * a pane whose whole job is "what can I dispatch". It is hidden, never dropped —
 * the admission gate ignores blocked-ness, so pre-queuing a blocked bead that
 * already has a spec is a live path and the toggle preserves it.
 *
 * @type {CandidateFilter}
 */
const CANDIDATE_FILTER_DEFAULT = { show_blocked: false, spec: 'all' };

/**
 * Read the persisted filter. Anything unreadable (absent, malformed JSON, wrong
 * shape, storage denied) falls back to the default rather than throwing — a bad
 * stored value must never take the Worker tab down.
 *
 * @returns {CandidateFilter}
 */
function loadCandidateFilter() {
  try {
    const raw = window.localStorage.getItem(CANDIDATE_FILTER_KEY);
    if (!raw) {
      return { ...CANDIDATE_FILTER_DEFAULT };
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { ...CANDIDATE_FILTER_DEFAULT };
    }
    const spec = parsed.spec;
    return {
      show_blocked: parsed.show_blocked === true,
      spec: spec === 'with' || spec === 'without' ? spec : 'all'
    };
  } catch {
    return { ...CANDIDATE_FILTER_DEFAULT };
  }
}

/**
 * @param {CandidateFilter} filter
 */
function saveCandidateFilter(filter) {
  try {
    window.localStorage.setItem(CANDIDATE_FILTER_KEY, JSON.stringify(filter));
  } catch {
    /* ignore — a private-mode storage denial must not break the toggle */
  }
}

/**
 * spec filter chips, in render order.
 *
 * @type {Array<{ value: 'all'|'with'|'without', label: string }>}
 */
const SPEC_FILTER_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'with', label: 'spec 있음' },
  { value: 'without', label: 'spec 없음' }
];

/**
 * Persisted period range for the 완료 lane (UI-d7pw §3.2). The Board's Closed
 * column vocabulary is REUSED rather than copied — the two tabs must not drift
 * into having a `최근 7일` that means different things.
 *
 * @type {string}
 */
const DONE_RANGE_KEY = 'bdui.worker.done-range';

/**
 * @returns {import('../../data/closed-range.js').DoneRange}
 */
function loadDoneRange() {
  try {
    // An ABSENT key keeps the 오늘 default; only a value someone actually chose
    // is normalized, which is how a stored `30d`/`all` reads as `7d`.
    const raw = window.localStorage.getItem(DONE_RANGE_KEY);
    return raw === null ? 'today' : normalizeDoneRange(raw);
  } catch {
    return 'today';
  }
}

/**
 * @param {import('../../data/closed-range.js').DoneRange} range
 */
function saveDoneRange(range) {
  try {
    window.localStorage.setItem(DONE_RANGE_KEY, range);
  } catch {
    /* ignore — a private-mode storage denial must not break the select */
  }
}

/**
 * The one-line preview a collapsed strip carries: the first row's title, cut to
 * a phone-width fragment. An empty lane previews nothing — the count already
 * says 0.
 *
 * @param {any[]} rows
 * @returns {string}
 */
function stripPreview(rows) {
  const head = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  if (!head) {
    return '';
  }
  const title = typeof head.title === 'string' ? head.title : head.id || '';
  return title.length > 22 ? `${title.slice(0, 22)}…` : title;
}

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
 * Project a known nonterminal resolver wait reason; unknown values fail quiet.
 *
 * @param {unknown} reason
 * @returns {string|null}
 */
export function mergeWaitingText(reason) {
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
 * are already settled for a person, plus the three UI-hk74 §4 phases the
 * coordinator resolves on its own without owning the merge effect.
 *
 * @type {Set<string>}
 */
const UNLOCKED_COMPLETION_PHASES = new Set([
  'paused',
  'needs_human',
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
    case 'waiting_metadata':
      return {
        label: '정정 대기',
        details: [origin, '메타데이터 정정이 관측되면 자동 재개'].filter(
          Boolean
        ),
        live: false
      };
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
  if (completion.log_path) {
    details.push(completion.log_path);
  }

  return {
    badge,
    title: details.join('\n'),
    alert: completion.phase === 'needs_human',
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
      ? badge('정리 재개 요청 중', {
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
  // 리뷰 사유 둘은 여기서 빠졌다 (UI-d7fy §5): 큐는 리뷰어를 디스패치하지도
  // 수리하지도 않으므로, 그 행은 "자동으로 처리 중"이 아니라 사람이 [리뷰 후
  // 머지]를 누를 때까지 서 있는 보류다.
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
  if (
    input.gate?.reason === 'review_receipt_missing' ||
    input.gate?.reason === 'review_receipt_stale'
  ) {
    // Head movement alone no longer lands here: the receipt is ancestry-bound,
    // so a base-sync merge or a queue base update keeps reading current
    // (UI-vzyh §2). What is left is abnormal — no receipt at all, or a receipt
    // the observed head does not descend from (rewritten history, branch
    // reset). An ancestry probe the gate could not complete is
    // `review_receipt_undetermined` and deliberately NOT here: the next
    // observation re-takes it and nobody has anything to do, so it draws no
    // badge at all (UI-32he).
    const hold_title =
      input.gate.reason === 'review_receipt_stale'
        ? '리뷰 영수증이 현재 head의 조상이 아닙니다 — 히스토리 재작성·브랜치 리셋 복구 경로입니다. [리뷰 후 머지]가 이 보류의 출구입니다'
        : '리뷰 영수증이 없습니다 — [리뷰 후 머지]가 이 보류의 출구입니다';
    // §5.4의 종료 사유는 게이트 뱃지 옆 텍스트다. 실행 중인 세션이 우선한다 —
    // 지난 실패는 이미 다시 눌린 뒤이므로 지금 무슨 일이 일어나는지가 답이다.
    if (input.review_session?.active === true) {
      return badge('최종 변경 리뷰 필요 · 리뷰 세션 실행 중', {
        title: `${hold_title}\n리뷰 세션이 실행 중입니다 — 끝나면 영수증을 다시 판정합니다`,
        live: true
      });
    }
    if (input.review_session?.failure) {
      return badge(
        `최종 변경 리뷰 필요 · ${reviewSessionFailureText(input.review_session.failure)}`,
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
  if (input.gate?.reason === 'review_receipt_invalid') {
    return badge('리뷰 기록 오류', {
      title: 'review_receipt_invalid',
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
 * (discard spec §2), and there [정리] is the cleanup-retry button.
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
 * becomes a [정리] button because nothing auto-cleans it. 충돌 해소 is NOT one
 * of them any more — the attempt-less dispatch (UI-w0hi §1) runs it.
 * @param {{ position: number, active: boolean, failure: string|null, waiting?: string|null, resolution?: import('../../data/worker-queue-store.js').ResolutionProjection|null, continuation_action?: any, hold?: any, authority?: any }|null} [merge_queue]
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
 * @param {boolean} [worker_serial] - Durable attempt execution mode.
 * @param {boolean} [auto_merge_on] - The workspace's global auto-merge toggle
 * (UI-58w8 §1). Read only to tell whether an AUTOMATIC enrolment still has a
 * driver behind it; it never gates a manual authority's continuation.
 * @param {{ merge_sha?: unknown, cleanup_cursor?: unknown, repo_operations?: unknown }} [progress_input]
 * @param {import('./lanes.js').DependencyChips|null} [dependency_chips] - 의존·
 * 겹침 칩 (UI-anna §5.3). PR 대기 행도 `⛓ blocked` · `⧉ 겹침` · `scope 없음`을
 * 받는다 — 레인이 바뀌어도 "이 이슈가 지금 무엇과 부딪히나"는 같은 질문이다.
 * 재료가 없으면 null이고 행은 그 줄을 그리지 않는다 (fail-quiet).
 * @param {{ active: boolean, failure: string|null }} [review_session] - 이 행의
 * `[리뷰 후 머지]` 세션 상태 (UI-d7fy §5.4). 실행 중이면 버튼이 잠기고, 마지막
 * 세션의 종료 사유는 게이트 뱃지 옆 텍스트가 된다.
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
  worker_serial = false,
  auto_merge_on = false,
  progress_input = {},
  dependency_chips = null,
  review_session = { active: false, failure: null }
) {
  const queued = !!merge_queue && merge_queue.position > 0;
  const continuation_required =
    !!merge_queue?.continuation_action &&
    merge_queue.continuation_action.continuation === null;
  const queue_active = !!merge_queue && merge_queue.active === true;
  const queue_failure = (merge_queue && merge_queue.failure) || null;
  const queue_waiting = mergeWaitingText(
    merge_queue ? merge_queue.waiting : null
  );
  const obs = observations[bead_id] || null;
  const gate = obs && obs.gate ? obs.gate : null;
  const pr = obs && obs.pr ? obs.pr : null;
  const resolution = resolutionView(
    merge_queue ? merge_queue.resolution : null
  );
  const auto_resolution = autoResolutionBadge(completion);
  const recovery = completionView(completion, auto_resolution);
  const authority = (merge_queue && merge_queue.authority) || null;
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
  // The click's own in-flight window. It locks the buttons exactly as a merge
  // step does — a second click has nothing to land on — but it is NOT a merge
  // step: the server is still taking the request, and drawing 머지 중 1/7 here
  // made the bar run forward and then fall back to a queue position the moment
  // the real snapshot arrived.
  const queueing =
    active && !merge_step && (active.queueing ?? null) ? active.queueing : null;
  // An already-merged PR whose cleanup stopped: the click re-runs the cleanup
  // from the top. Nothing retries automatically (§6), so this button is the
  // human's way back in once they have fixed whatever stopped it.
  // A repo_operations stall (verify/deploy script failed) is the same click:
  // the server re-runs the cleanup from the top, which re-runs the failed
  // script. Until UI-j2f0 the card hid the action for that step and left the
  // person guessing which drawer button would move the row (UI-q0uy §4.4
  // wanted the AI-repair ladder there; UI-s582 removed that ladder).
  const cleanup_retry =
    !!cleanup_failed &&
    [
      'repo_operations',
      'child_sweep',
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
  const external_cleanup =
    external && !!cleanup_failed && !!gate && gate.tier === 'merged';
  // A re-click restores the action surface, but it cannot turn an otherwise
  // terminal/unknown gate into a server continuation (UI-vkk8 §2).
  const reclick_continuable =
    needs_reclick &&
    (enabled ||
      conflicting ||
      gate?.reason === 'base_behind' ||
      gate?.reason === 'review_receipt_missing' ||
      gate?.reason === 'review_receipt_stale' ||
      cleanup_retry ||
      external_cleanup);
  // 이 행이 [리뷰 후 머지]를 내는 행인가 (UI-d7fy §5.1). 게이트 사유 둘만
  // 해당한다 — `review_receipt_undetermined`는 판정이 아니라 probe 오류라 다음
  // 관측을 기다리고, `spec_id_missing`은 리뷰로 해소되지 않는다(UI-yqw9 사고
  // 규칙). 이 행은 큐에 들어가 authority를 받은 뒤에도 버튼을 유지한다: 보류의
  // 출구가 그 버튼뿐이고, 세션이 실패하면 다시 눌러야 하기 때문이다.
  const review_after_merge =
    gate?.reason === 'review_receipt_missing' ||
    gate?.reason === 'review_receipt_stale';
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
    activity: conflict_badge ? null : (active && active.activity) || null
  });
  const rendered_status_badge =
    status_badge?.live === true && status_badge.title
      ? html`<span title=${status_badge.title}>${status_badge.label}</span>`
      : status_badge?.label || null;
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
    worker_serial,
    ...(dependency_chips ? { dependency_chips } : {}),
    // Card tone, not an affordance (UI-w0hi §4): an external row came from
    // somewhere else, and the lane reads better when that is visible before the
    // 세션 badge is read.
    external,
    pr_number: pr && typeof pr.number === 'number' ? pr.number : null,
    pr_url: pr && typeof pr.url === 'string' ? pr.url : '',
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
    merge_action:
      gate?.tier === 'merged' && !cleanup_retry && !external_cleanup
        ? false
        : !queued ||
          continuation_required ||
          needs_reclick ||
          review_after_merge,
    cancel_action: queued && !continuation_required,
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
      !merge_step &&
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
        gate?.reason === 'review_receipt_missing' ||
        gate?.reason === 'review_receipt_stale' ||
        // `review_receipt_undetermined` is deliberately absent (UI-d7fy §5.1):
        // an ancestry probe that could not be taken is not a verdict, the gate
        // treats it as fail-closed, and the next observation re-takes it. A
        // click could therefore only land the row on a hold — and this row does
        // not draw that hold's exit button either. It waits, with no button and
        // no badge (UI-32he).
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
    merge_label: continuation_required
      ? '이어하기 선택'
      : cleanup_retry || external_cleanup
        ? stalled_script === 'deploy'
          ? '배포 재시도 후 정리'
          : stalled_script === 'verify'
            ? '검증 재시도 후 정리'
            : '정리 재개'
        : conflicting && !merge_step && !cleanup_retry
          ? '충돌 해소 후 머지'
          : gate?.reason === 'base_behind'
            ? 'base 갱신 후 머지'
            : gate?.reason === 'review_receipt_missing' ||
                gate?.reason === 'review_receipt_stale'
              ? '리뷰 후 머지'
              : needs_reclick
                ? '다시 머지'
                : undefined,
    merge_title: discard_blocks_merge
      ? discard.error
        ? `폐기 실패: ${discard.error} — [재시도]하거나 상태를 확인하세요`
        : `폐기 진행 중 — ${discard.progress || '완료를 기다리세요'}`
      : continuation_required
        ? '실행 provider가 변경되었습니다 — 이어갈 방식을 선택하세요'
        : queueing
          ? '요청을 보내는 중 — 서버 응답을 기다립니다'
          : merge_step
            ? `머지 진행 중 — ${merge_step.label}`
            : stalled_script
              ? `머지 완료 — ${stalled_script === 'deploy' ? '배포' : '검증'} 스크립트가 실패해 정리가 멈췄습니다. 클릭하면 저장소 작업부터 정리를 다시 진행합니다`
              : external_cleanup
                ? '머지 완료 — 클릭하면 실패한 정리를 재개합니다'
                : external_conflict_unresolvable
                  ? '워크트리 없음 — 세션에서 직접 해소하세요'
                  : conflict_session === 'running'
                    ? '충돌 해소 세션 실행 중 — 완료 후 다시 머지하세요'
                    : conflict_session === 'paused'
                      ? '충돌 해소 세션 일시정지 — 재개 후 완료되면 머지하세요'
                      : cleanup_retry
                        ? '머지 완료 — 클릭하면 남은 정리를 실패 단계부터 재개합니다'
                        : conflicting
                          ? '충돌 — 큐에 넣으면 해소 세션을 띄우고 완료 후 자동으로 재머지합니다'
                          : gate?.reason === 'base_behind'
                            ? 'base를 자동 갱신한 뒤 머지합니다'
                            : review_session.active === true
                              ? '리뷰 세션 실행 중 — 끝나면 영수증을 다시 판정합니다'
                              : gate?.reason === 'review_receipt_missing'
                                ? '리뷰 영수증 없음 — 머지 게이트 보류입니다. 클릭하면 기록된 세션을 이어 리뷰만 수행시키고, 영수증이 최종 head에 유효해지면 큐가 머지합니다'
                                : gate?.reason === 'review_receipt_stale'
                                  ? 'head 재작성됨(영수증이 현재 head의 조상이 아님) — 머지 게이트 보류입니다. 클릭하면 기록된 세션을 이어 최종 head를 다시 리뷰시키고, 영수증이 유효해지면 큐가 머지합니다'
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
 * Create the Worker console view.
 *
 * @param {HTMLElement} mount_element - Element to render into.
 * @param {{ transport?: (type: string, payload?: unknown) => Promise<any>, issueStores?: any, queueStore?: any, sessionLogStore?: any, gotoIssue?: (id: string) => void, getWorkspacePath?: () => (string|undefined), switchWorkspace?: (root_dir: string) => Promise<unknown>, openDoc?: (doc: import('../board/stepper.js').StepperDoc) => void, doneRange?: import('../../data/closed-range.js').DoneRange, onDoneRangeChange?: (range: import('../../data/closed-range.js').DoneRange) => void }} [options]
 * @returns {{ load: () => void, refreshSessionDefaults: () => void, destroy: () => void }}
 */
export function createWorkerView(mount_element, options = {}) {
  const {
    transport,
    issueStores,
    queueStore,
    sessionLogStore,
    gotoIssue,
    getWorkspacePath,
    switchWorkspace,
    openDoc,
    doneRange,
    onDoneRangeChange
  } = options;
  // Worker 탭은 ui-order를 읽지 않는다 (UI-d13v §6): 후보 순서는 정렬 체인과
  // 그 뒤의 의존 인접화 패스가 정하고 (UI-q1y7 §2) 수동 rank는 Board 탭만 쓴다.
  // 그래서 selectors도 order 인자 없이 만든다.
  const selectors = issueStores ? createListSelectors(issueStores) : null;

  /**
   * Candidate pane display filter (UI-ki09), restored at view creation.
   *
   * @type {CandidateFilter}
   */
  let candidate_filter = loadCandidateFilter();
  /** @type {string|null} Candidate whose queue-lane picker is open. */
  let place_menu_bead_id = null;
  /**
   * 열려 있는 겹침 팝오버 (UI-qm12 §5.3, 워커 탭 UI-jbao). 칩을 클릭한 상대
   * 하나만 기억한다.
   *
   * @type {{ bead_id: string, counterpart_id: string }|null}
   */
  let open_overlap = null;
  /** @type {string|null} */
  let open_failure_detail = null;
  /**
   * 마지막 렌더의 비교 집합·레인 사실 (UI-jbao). 팝오버의 배치 판정은 클릭
   * 시점의 최신 모델로 한다 — 렌더마다 `refreshOverlapFacts`가 다시 채운다.
   *
   * @type {{ members_by_id: Map<string, import('./queue-overlaps.js').LaneMember>, serial_raw_lengths: Record<string, number>, serial_lane_count: number, occupied_lanes: Set<string> }}
   */
  let overlap_queue_facts = {
    members_by_id: new Map(),
    serial_raw_lengths: {},
    serial_lane_count: 0,
    occupied_lanes: new Set()
  };
  /**
   * 이 렌더의 겹침 파생 (UI-jbao). 한 레포 화면의 위치 어휘(`후보`·`#n`·`s1 #n`)
   * 는 모니터의 것과 다르므로 워커 탭이 자기 비교 집합으로 다시 판정한다.
   *
   * @type {Map<string, { overlaps: import('./lanes.js').OverlapChip[], scope_missing: boolean }>}
   */
  let overlap_facts_by_bead = new Map();
  /**
   * 이 렌더의 blocked 칩 (UI-anna §5.1, UI-u6zf §5.2). 워커 탭은 한 레포만 읽으므로
   * 위치를 모르는 blocker가 있고, 그 칩은 눌리지 않는다 — 모니터의 "언제나 열 수
   * 있다"와 다른 판정이라 여기서 파생한다.
   *
   * @type {Map<string, import('./lanes.js').DependencyChip[]>}
   */
  let blocker_chips_by_bead = new Map();
  /**
   * Candidate pane sort chain (UI-d13v §4), restored at view creation.
   *
   * @type {import('./candidate-sort.js').CandidateSortState}
   */
  let candidate_sort = loadCandidateSort();
  /**
   * Whether the chain editor row is unfolded (§4.4). A restored `{chain}` opens
   * it, and so does picking `사용자 지정…`; picking a preset folds it. It is a
   * pure VIEW flag, not part of the persisted state — an edited chain that lands
   * exactly on a preset is stored as that preset (§4.3) while the row the user
   * is editing in stays open.
   *
   * @type {boolean}
   */
  let sort_chain_open = presetIdOf(candidate_sort) === null;
  /**
   * 완료 lane period range (UI-d7pw §3.2), restored at view creation.
   *
   * @type {import('../../data/closed-range.js').DoneRange}
   */
  let done_range = doneRange ? normalizeDoneRange(doneRange) : loadDoneRange();
  /**
   * The current range's display label, used by the lane header and the two
   * toolbar KPIs so all three name the same period (§3.4/§3.5).
   *
   * @returns {string}
   */
  function doneRangeLabel() {
    const opt = DONE_RANGE_OPTIONS.find((o) => o.value === done_range);
    return opt ? opt.label : '오늘';
  }
  /**
   * Lane·area 접힘 상태 (UI-5ksp §4.4), 뷰 생성 시 복원된다. 저장 키는 모바일
   * 접기가 쓰던 그대로다 — 구형 `{ queue, done }` 값은 스토어가 `lanes`로
   * 승격하므로 이미 접어 둔 사람의 화면이 바뀌지 않는다.
   */
  const collapse = createLaneCollapse('beads-ui.worker.lane-collapsed');
  /**
   * Whether the control-first mobile composition is active (UI-58y2). A runtime
   * without `matchMedia` (jsdom, very old browsers) stays on the desktop
   * composition — the five-pane row is the layout that works without any media
   * information at all.
   *
   * @type {boolean}
   */
  let is_mobile = false;
  /**
   * Beads whose [머지] click has been sent but whose first progress snapshot has
   * not arrived yet (UI-raqh §4). It covers exactly that gap so the row reacts
   * to the click immediately; the server's own `merge_progress` supersedes it
   * as soon as it lands, and the reply clears it either way.
   *
   * @type {Set<string>}
   */
  const merge_pending = new Set();
  /** @type {Set<string>} Beads with one manual cleanup retry in flight. */
  const cleanup_pending = new Set();
  /**
   * Beads whose REVISE-disposition click is in flight (UI-hs11 §3.5). It covers
   * the same gap `merge_pending` covers — the window between the click and the
   * reply — so a second click cannot be issued while the first is still being
   * decided. The server's per-Bead in-flight guard is the authority; this is
   * only what keeps the row from inviting the doomed second click.
   *
   * @type {Set<string>}
   */
  const revise_pending = new Set();
  /** @type {Set<string>} Beads with one stale-work action in flight. */
  const stale_work_pending = new Set();
  /**
   * Beads whose running-tile child rollup is EXPANDED
   * (worker-card-exec-chips §3.3). Only the expanded ones are remembered — the
   * list is collapsed by default — and the set lives as long as the view, so a
   * queue-snapshot re-render never forgets what the user opened.
   *
   * @type {Set<string>}
   */
  const rollup_expanded_ids = new Set();
  /**
   * PR 대기 행 투영의 렌더 1회 메모. `topTemplate`(자동 머지 버튼의 N)과
   * `lanesTemplate`(행 자체)이 같은 모델을 두 번 읽으므로, 모델 객체를 키로
   * 한 번만 계산한다.
   *
   * @type {{ model: LaneModel, rows: any[] }|null}
   */
  let pr_wait_memo = null;
  /** @type {Array<() => void>} */
  const unsubscribers = [];

  /**
   * `buildLanes` 입력 어댑터 (§4.2). 후보·`bead_overlay`·세션 완료 행과 그 비동기
   * 조회 캐시, 세션 기본값 캐시를 소유한다 — 조회가 끝나면 `onInvalidate`가
   * 여기 재렌더를 부른다.
   */
  const adapter = createWorkspaceAdapter({
    queueStore,
    issueStores,
    transport,
    getWorkspacePath,
    onInvalidate: () => doRender()
  });

  /**
   * Drop the session-defaults cache and ask again. 공개 API는 그대로이고
   * (`app/main.js` 호출 측 변경 없음) 캐시·가드는 어댑터가 소유한다.
   */
  function refreshSessionDefaults() {
    adapter.refreshSessionDefaults();
  }

  // Persistent console shell: the control bar + banners (top) and the lane row
  // (bottom) render into their own targets, and the transcript drawer lives in
  // its own fixed overlay host so a full-template re-render never clobbers the
  // drawer's lit-html root and an open drawer never pushes the lanes down.
  const console_el = document.createElement('div');
  console_el.className = 'worker-console';
  const top_el = document.createElement('div');
  top_el.className = 'worker-top';
  const drawer_overlay_el = document.createElement('div');
  drawer_overlay_el.className = 'worker-drawer-overlay';
  drawer_overlay_el.hidden = true;
  const drawer_backdrop_el = document.createElement('div');
  drawer_backdrop_el.className = 'worker-drawer-overlay__backdrop';
  const drawer_el = document.createElement('div');
  drawer_el.className = 'worker-drawer-host';
  // The repo-ops timeline shares the overlay chrome but keeps its OWN lit-html
  // root (UI-q0uy §4.2): two components rendering into one root would clobber
  // each other, and only one of the two is ever open.
  const repo_ops_drawer_el = document.createElement('div');
  repo_ops_drawer_el.className = 'worker-drawer-host';
  repo_ops_drawer_el.hidden = true;
  drawer_overlay_el.append(drawer_backdrop_el, drawer_el, repo_ops_drawer_el);
  const lanes_el = document.createElement('div');
  // Flex host so .worker-lanes' flex sizing is live — a plain block div here
  // breaks the min-height:0 chain and the pane bodies can never scroll.
  lanes_el.className = 'worker-lanes-host';
  console_el.append(top_el, drawer_overlay_el, lanes_el);
  mount_element.appendChild(console_el);

  /**
   * 지금 그려진 레인 모델과 그것이 나온 스냅샷 원본 (§4.5). 드래그 컨트롤러가
   * 계획을 세울 때 읽는 두 값이고, `laneModel()`이 한 자리에서 갱신한다.
   *
   * @type {LaneModel}
   */
  let current_lanes = buildLanes(null, null);
  /** @type {Array<Record<string, any>>} */
  let last_workspaces = [];

  /**
   * 드롭 식별자·계획 실행 컨트롤러 (UI-4tud §4.5). Monitor 탭과 **같은** 모듈이고,
   * Worker는 연결 레인이 없으므로 `cross_lanes`를 넘기지 않는다 — chain 맵이 비어
   * 계획기가 chain 타깃을 스스로 거부한다(코드 분기가 아니라 데이터).
   */
  const lane_drag = createLaneDrag({
    transport,
    console_el,
    getLanes: () => current_lanes,
    getWorkspaces: () => last_workspaces,
    getCrossLanes: () => null,
    reproject: () => ({ lanes: laneModel(), raw_lanes: null }),
    onCorrection: () => {},
    showToast,
    requestRender: () => doRender(),
    adoptQueue: (_root_dir, queue) => {
      if (queueStore) {
        queueStore.set(queue);
      }
    },
    onDragBegin: () => {
      place_menu_bead_id = null;
    }
  });

  /** @type {string|null} Currently open attempt (for the tile ring). */
  let selected_attempt = null;

  const drawer = createTranscriptDrawer(drawer_el, {
    transport,
    sessionLogStore,
    onClose: () => {
      selected_attempt = null;
      drawer_overlay_el.hidden = true;
      doRender();
    }
  });

  // Session-ephemeral by design (§4.1): the timeline is a "what just happened"
  // surface, and a drawer that reopened itself on every reload would be exactly
  // the forced expansion this redesign removed.
  const repo_ops_drawer = createRepoOpsDrawer(repo_ops_drawer_el, {
    onClose: () => {
      repo_ops_drawer_el.hidden = true;
      drawer_overlay_el.hidden = true;
      doRender();
    }
  });

  // The script popup owns its own `document.body` mount, so a Worker re-render
  // cannot tear the modal down while its fetch is still in flight (UI-k34k).
  const repo_ops_script_viewer = createRepoOpsScriptViewer({
    getWorkspacePath: getWorkspacePath || (() => '')
  });
  let script_viewer_workspace = getWorkspacePath
    ? getWorkspacePath() || ''
    : '';

  // Operational repo-op controls stay INLINE on the Worker screen (spec 비-목표):
  // the verify/deploy declaration and the pinned automation policy are not
  // preferences, so they did not move into the unified settings dialog.
  const repo_ops_settings = createRepoOpsSettings({
    queueStore,
    transport,
    onChanged: () => doRender(),
    onOpenScript: (input, trigger_element) => {
      void repo_ops_script_viewer.open(input, trigger_element);
    }
  });

  /**
   * @returns {any} Current queue snapshot (or an empty shape).
   */
  function currentQueue() {
    return (
      (queueStore && queueStore.get()) || {
        revision: 0,
        auto_advance: false,
        auto_merge: false,
        slots: MIN_SLOTS,
        queue: [],
        serial_lanes: [],
        serial_lane_count: 0,
        pr_wait: [],
        done: []
      }
    );
  }

  /**
   * Build queue-lane choices from the authoritative snapshot. A null result
   * means parallel is the only choice, so no menu is needed.
   *
   * @returns {Array<{ id: 'parallel'|'s1'|'s2'|'s3'|'s4'|'s5', label: string, count: number }>|null}
   */
  function placeMenuLanes() {
    const q = currentQueue();
    const serial_lane_count =
      typeof q.serial_lane_count === 'number' &&
      Number.isInteger(q.serial_lane_count) &&
      q.serial_lane_count > 0
        ? Math.min(q.serial_lane_count, 5)
        : 0;
    const serial_lanes = Array.isArray(q.serial_lanes) ? q.serial_lanes : [];
    /** @type {Array<{ id: 's1'|'s2'|'s3'|'s4'|'s5', label: string, count: number }>} */
    const choices = [];
    for (const lane of serial_lanes) {
      if (choices.length >= serial_lane_count) {
        break;
      }
      if (
        !lane ||
        typeof lane.id !== 'string' ||
        !/^s[1-5]$/.test(lane.id) ||
        !Array.isArray(lane.entries)
      ) {
        continue;
      }
      choices.push({
        id: /** @type {'s1'|'s2'|'s3'|'s4'|'s5'} */ (lane.id),
        label: `직렬 ${lane.id.slice(1)}`,
        count: lane.entries.length
      });
    }
    if (choices.length === 0) {
      return null;
    }
    const queue_entries = Array.isArray(q.queue) ? q.queue : [];
    return [
      { id: 'parallel', label: '병렬', count: queue_entries.length },
      ...choices
    ];
  }

  /**
   * Build the open candidate menu for this render, if its bead is still shown.
   *
   * @param {any[]} candidates
   * @returns {{ bead_id: string, lanes: Array<{ id: 'parallel'|'s1'|'s2'|'s3'|'s4'|'s5', label: string, count: number }> }|null}
   */
  function currentPlaceMenu(candidates) {
    if (
      !place_menu_bead_id ||
      !candidates.some(
        (/** @type {any} */ candidate) => candidate.id === place_menu_bead_id
      )
    ) {
      return null;
    }
    const lanes = placeMenuLanes();
    return lanes ? { bead_id: place_menu_bead_id, lanes } : null;
  }

  /**
   * The workspace coordinate this tab sees. 세션이 고른 하나뿐이라 값이 없을 수
   * 있고, 그때는 op가 좌표를 싣지 않는다 — 서버가 세션의 선택을 쓴다 (§4.5).
   *
   * @returns {string}
   */
  function rootDir() {
    return (getWorkspacePath && getWorkspacePath()) || '';
  }

  /**
   * `[대기로 ↴]` 배치 메뉴 한 항목 (§4.5): 계획이 아니라 단일 op이므로 드래그
   * 컨트롤러의 `sendOp`를 그대로 쓴다. index를 싣지 않는 것이 "맨 뒤에 붙이기"다
   * (UI-mwju) — 서버 `queue-store.place`가 index 없는 요청을 append로 읽는다.
   *
   * @param {string} bead_id
   * @param {'parallel'|'s1'|'s2'|'s3'|'s4'|'s5'} lane
   */
  async function placeAtLaneTail(bead_id, lane) {
    await lane_drag.sendOp(
      {
        type: 'worker-queue-place',
        payload: { bead_id, ...(lane === 'parallel' ? {} : { lane }) },
        root_dir: rootDir()
      },
      bead_id
    );
  }

  /**
   * @returns {number}
   */
  function currentRevision() {
    const q = currentQueue();
    return typeof q.revision === 'number' ? q.revision : 0;
  }

  /**
   * Adopt the authoritative queue from a mutation reply so the view reflects
   * state even before the fanout push arrives (and in tests without a socket).
   *
   * @param {any} res
   */
  function adopt(res) {
    if (res && res.queue && queueStore) {
      queueStore.set(res.queue);
    }
  }

  /**
   * Pause (⏸) a running attempt: the session is killed but the attempt stays
   * resumable and the bead stays queued (worker-phase1 §2.1). A refusal
   * surfaces its reason as a toast — most often `no_session_id`, which the tile
   * also guards by disabling the button.
   *
   * @param {string} attempt_id
   */
  async function pauseAttempt(attempt_id) {
    if (!transport || !attempt_id) {
      return;
    }
    const res = /** @type {any} */ (
      await transport('worker-attempt-pause', { attempt_id })
    );
    if (res && res.paused === false && res.reason) {
      showToast(`일시정지 거부: ${res.reason}`, 'error', 2400);
    }
  }

  /**
   * Resume (↻ / paused tile ▶) an attempt (spec §1), under the
   * queue mutations' CAS discipline: send the current revision, adopt the
   * authoritative queue a conflict reply carries, and retry ONCE against the
   * fresh revision. A refusal surfaces its admission-badge reason as a toast.
   *
   * @param {string} attempt_id
   */
  async function resumeAttempt(attempt_id) {
    if (!transport || !attempt_id) {
      return;
    }
    const instructions = await requestResumeInstructions();
    if (instructions === null) {
      return;
    }
    /** @param {Record<string, unknown>} extra */
    const send = async (extra = {}) =>
      /** @type {any} */ (
        await transport('worker-attempt-resume', {
          attempt_id,
          expected_revision: currentRevision(),
          ...(instructions !== '' ? { instructions } : {}),
          ...extra
        })
      );
    let res = await send();
    adopt(res);
    if (res && res.conflict) {
      res = await send();
      adopt(res);
    }
    res = await resolveContinuationMismatch(
      res,
      (continuation, decision_token) => send({ continuation, decision_token }),
      {
        onResult: adopt,
        refresh: () => send()
      }
    );
    if (res && res.resumed === false && !res.conflict && res.reason) {
      showToast(`이어하기 거부: ${res.reason}`, 'error', 2400);
    }
  }

  /**
   * Send one merge-queue mutation under the shared CAS discipline: retry ONCE
   * against the fresh revision on a conflict, adopting the authoritative queue
   * from each reply so the row's place in line renders without waiting for the
   * fanout push.
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @param {boolean} [retry_conflict]
   * @returns {Promise<any>}
   */
  async function sendMergeQueue(type, payload, retry_conflict = true) {
    if (!transport) {
      return null;
    }
    const send = transport;
    let res = /** @type {any} */ (
      await send(type, { ...payload, expected_revision: currentRevision() })
    );
    adopt(res);
    if (res && res.conflict && retry_conflict) {
      res = /** @type {any} */ (
        await send(type, {
          ...payload,
          expected_revision: currentRevision()
        })
      );
      adopt(res);
    }
    return res;
  }

  /**
   * The [머지] click (UI-5v7d §4). It no longer merges — it takes a place in the
   * sequential queue, and the server's driver merges when the turn comes. What
   * the old direct click decided at click time (re-gate, BEHIND update, DIRTY
   * resolution) is decided the same way, just at that later moment, so the
   * badges here stay advisory exactly as before.
   *
   * @param {string} bead_id
   */
  async function queueMerge(bead_id) {
    if (!transport || !bead_id) {
      return;
    }
    const action = currentQueue().merge_queue?.find(
      (/** @type {any} */ entry) => entry.bead_id === bead_id
    )?.continuation_action;
    if (action?.mismatch && action.continuation === null) {
      await decideQueuedContinuation(bead_id, action.mismatch);
      return;
    }
    merge_pending.add(bead_id);
    doRender();
    /** @type {any} */
    let res;
    try {
      res = await sendMergeQueue('worker-merge-queue-add', { bead_id });
    } catch {
      // A transport rejection (ws dropped mid-restart) previously escaped as an
      // unhandled rejection: the click died with NO feedback and no server-side
      // trace, which reads exactly like a dead button.
      showToast(
        '머지 클릭이 서버에 전달되지 않았습니다(연결 문제) — 연결 복구 후 다시 눌러주세요',
        'error',
        3200
      );
      return;
    } finally {
      merge_pending.delete(bead_id);
      doRender();
    }
    if (!res || res.applied) {
      return;
    }
    if (res.conflict) {
      // The click's snapshot went stale even after the transport's retry: say
      // so instead of swallowing it, or the button reads as dead.
      showToast(
        '큐가 바뀌어 머지 클릭이 적용되지 않았습니다 — 다시 눌러주세요',
        'error',
        2400
      );
      return;
    }
    // Not applied and not a CAS conflict: the row is already queued (a no-op) or
    // it is no longer a lane member the server will merge.
    showToast(mergeQueueRefusalText(res.reason), 'error', 2400);
  }

  /**
   * Retry the canonical post-merge cleanup once under the current queue CAS.
   * A conflict is adopted but never retried automatically: another explicit
   * click against the fresh snapshot is the authorization boundary.
   *
   * @param {string} bead_id
   */
  async function retryCleanup(bead_id) {
    if (!transport || !bead_id || cleanup_pending.has(bead_id)) {
      return;
    }
    cleanup_pending.add(bead_id);
    doRender();
    try {
      const res = /** @type {any} */ (
        await transport('worker-cleanup-retry', {
          bead_id,
          expected_revision: currentRevision()
        })
      );
      adopt(res);
      if (res && !res.retried && !res.conflict && res.reason) {
        showToast(`정리 재개 거부: ${res.reason}`, 'error', 2400);
      }
    } finally {
      cleanup_pending.delete(bead_id);
      doRender();
    }
  }

  /**
   * The two 큐 보류/정지 exits (UI-5ym8 §4). Both are CAS-guarded by the hold's
   * own `since` rather than by the queue revision: the question is "is this
   * still the hold I read", and a hold that was released and re-armed under the
   * same revision would otherwise be released again by a stale click.
   *
   * A mismatch (`hold_changed`) is reported and NOT retried — the banner has
   * already been redrawn from the fanout snapshot by then, so a silent retry
   * would act on a hold the person never saw.
   *
   * @param {'worker-queue-hold-resume'|'worker-queue-hold-retry-now'} type
   * @param {string} refusal - 거부 응답을 알릴 때 쓰는 toast 앞머리.
   */
  async function sendHoldAction(type, refusal) {
    const hold = currentQueue().hold;
    if (!transport || !hold || typeof hold.since !== 'number') {
      return;
    }
    const res = /** @type {any} */ (
      await transport(type, { since: hold.since })
    );
    adopt(res);
    if (res && res.ok === false) {
      showToast(
        `${refusal}: ${
          res.reason === 'hold_changed'
            ? '큐 상태가 바뀌었습니다 — 다시 확인하세요'
            : res.reason || ''
        }`,
        'error',
        2800
      );
    }
  }

  /**
   * Dispatch a NEW attempt for a parked bead (§3.1). Not a resume: the parked
   * session ended normally waiting for a decision, so continuing it would land
   * back where the decision was still missing.
   *
   * @param {string} bead_id
   * @param {string} attempt_id
   */
  async function retryParked(bead_id, attempt_id) {
    if (!transport || !bead_id || !attempt_id) {
      return;
    }
    const res = /** @type {any} */ (
      await transport('worker-parked-retry', { bead_id, attempt_id })
    );
    adopt(res);
    if (res && res.ok === false) {
      showToast(
        `재시도 거부: ${
          res.reason === 'not_latest'
            ? '이 bead에 더 새로운 시도가 있습니다'
            : res.reason || ''
        }`,
        'error',
        2800
      );
    }
  }

  /**
   * Complete a background resolver decision already persisted on the queue
   * item.
   *
   * @param {string} bead_id
   * @param {any} mismatch
   */
  async function decideQueuedContinuation(bead_id, mismatch) {
    const result = await resolveContinuationMismatch(
      { continuation_mismatch: mismatch },
      (continuation, decision_token) =>
        sendMergeQueue(
          'worker-merge-queue-add',
          {
            bead_id,
            continuation,
            decision_token
          },
          false
        )
    );
    const action = result?.queue?.merge_queue?.find(
      (/** @type {any} */ entry) => entry.bead_id === bead_id
    )?.continuation_action;
    if (
      result?.applied !== true &&
      action?.continuation === null &&
      action.mismatch
    ) {
      await decideQueuedContinuation(bead_id, action.mismatch);
      return;
    }
    if (result && result.applied === false && !result.conflict) {
      showToast('이어하기 선택이 최신 상태와 일치하지 않습니다', 'error', 2800);
    }
  }

  /**
   * Flip the durable auto-merge mode (UI-yk55 §5). Turning it ON also enrolls
   * whatever is eligible right now, and turning it OFF empties the waiting queue
   * — both server-side, in the one handler, because a toggle that left the queue
   * running would not be a stop and a toggle that queued nothing would look
   * broken.
   *
   * @param {boolean} on
   */
  async function setAutoMerge(on) {
    if (!transport) {
      return;
    }
    const res = await sendMergeQueue('worker-merge-auto-toggle', { on });
    if (!res || res.conflict) {
      return;
    }
    showToast(
      on
        ? '자동 머지 켜짐 — 자격이 생기는 PR을 계속 머지합니다'
        : '자동 머지 꺼짐 — 대기 항목을 비웠습니다',
      on ? 'success' : 'info',
      2400
    );
  }

  /**
   * Give up one waiting item's place in line ([취소]). The ACTIVE item is
   * refused server-side (`merge_active`) — its merge already reached GitHub.
   *
   * @param {string} bead_id
   */
  async function cancelMerge(bead_id) {
    if (!transport || !bead_id) {
      return;
    }
    const res = await sendMergeQueue('worker-merge-queue-remove', { bead_id });
    if (res && !res.conflict && !res.applied && res.reason === 'merge_active') {
      showToast('머지 진행 중 — 취소할 수 없습니다', 'error', 2400);
    }
  }

  /**
   * Empty the queue ([일괄 머지 중단]): drop every WAITING item, while the
   * active one runs to completion — its merge already reached GitHub.
   */
  async function cancelMergeAll() {
    // ONE request, not one per row: between per-row requests the active item can
    // finish and promote the next waiter to active, whose own removal the server
    // then refuses — leaving an item queued after a click that said "stop".
    await sendMergeQueue('worker-merge-queue-remove', { all: true });
  }

  /**
   * Run the [폐기] action (discard spec §1) — destructive: the PR is closed and
   * the worktree/branch discarded, and nothing is re-queued. A confirmation
   * stands in front of it because it sits next to [머지], and it also teaches
   * the two-step flow: re-running is the 후보 → 대기 drag. The CAS + the
   * server's own guards do the rest.
   *
   * @param {string} bead_id
   * @param {string|null} [attempt_id]
   * @param {'merged'|'unmerged'} [confirmation]
   * @param {string|null} [operation_id]
   */
  async function discardBead(
    bead_id,
    attempt_id = null,
    confirmation = 'unmerged',
    operation_id = null
  ) {
    if (!transport || !bead_id) {
      return;
    }
    const message = discardConfirmationMessage(bead_id, confirmation);
    const confirmed =
      !!operation_id ||
      typeof globalThis.confirm !== 'function' ||
      globalThis.confirm(message);
    if (!confirmed) {
      return;
    }
    let res = /** @type {any} */ (
      await transport('worker-discard', {
        bead_id,
        ...(attempt_id ? { attempt_id } : {}),
        ...(operation_id ? { operation_id } : {}),
        expected_revision: currentRevision()
      })
    );
    adopt(res);
    if (res && res.conflict) {
      res = /** @type {any} */ (
        await transport('worker-discard', {
          bead_id,
          ...(attempt_id ? { attempt_id } : {}),
          ...(operation_id ? { operation_id } : {}),
          expected_revision: currentRevision()
        })
      );
      adopt(res);
    }
    if (res && res.discarded === true) {
      showToast(discardCompletionMessage(res), 'success', 5000);
      return;
    }
    if (res && res.reason) {
      showToast(`폐기 실패: ${res.reason}`, 'error', 2800);
      return;
    }
    if (res && res.accepted && res.pending === 'merged_revert') {
      showToast('revert PR 대기 상태로 전환했습니다', 'success', 2400);
      return;
    }
    if (res && res.accepted && !res.discarded) {
      showToast(`폐기 진행: ${res.phase || '백업 중'}`, 'success', 2400);
      return;
    }
    if (res && !res.conflict) {
      showToast('폐기 거부: unknown', 'error', 2800);
    }
  }

  /**
   * Send one identity-bound stale-work action. A conflict response carries the
   * newest queue snapshot, but is never retried with an obsolete action id.
   *
   * @param {'worker-stale-work-continue'|'worker-stale-work-backup-fresh'|'worker-stale-work-recheck'} type
   * @param {string} bead_id
   * @param {string} action_id
   */
  async function staleWorkAction(type, bead_id, action_id) {
    if (
      !transport ||
      !bead_id ||
      !action_id ||
      stale_work_pending.has(bead_id)
    ) {
      return;
    }
    stale_work_pending.add(bead_id);
    doRender();
    try {
      const res = /** @type {Record<string, unknown>} */ (
        await transport(type, {
          bead_id,
          action_id,
          expected_revision: currentRevision()
        })
      );
      adopt(res);
      if (res?.conflict) {
        showToast(
          '이전 작업 상태가 바뀌었습니다. 최신 상태를 확인하세요.',
          'error',
          2800
        );
      } else if (!res?.ok && res?.reason) {
        showToast(`이전 작업 처리 거부: ${String(res.reason)}`, 'error', 2800);
      }
    } finally {
      stale_work_pending.delete(bead_id);
      doRender();
    }
  }

  /**
   * The REVISE-parking disposition clicks (UI-hs11 §3.5). Both follow the merge
   * click's discipline: send the current revision, adopt the authoritative
   * queue a conflict reply carries, retry ONCE against the fresh revision, and
   * report the outcome as a toast. The `revise_pending` cover keeps the row's
   * buttons quiet for the whole round trip — a fix click dispatches a session,
   * and a second one landing mid-dispatch is exactly what the server's per-Bead
   * guard would have to refuse anyway.
   *
   * @param {'worker-revise-fix'|'worker-revise-approve'} type
   * @param {string} bead_id
   */
  async function reviseDisposition(type, bead_id) {
    if (!transport || !bead_id || revise_pending.has(bead_id)) {
      return;
    }
    revise_pending.add(bead_id);
    doRender();
    /** @type {any} */
    let res;
    try {
      /** @param {Record<string, unknown>} extra */
      const send = async (extra = {}) =>
        /** @type {any} */ (
          await transport(type, {
            bead_id,
            expected_revision: currentRevision(),
            ...extra
          })
        );
      res = await send();
      adopt(res);
      if (res && res.conflict) {
        res = /** @type {any} */ (
          await transport(type, {
            bead_id,
            expected_revision: currentRevision()
          })
        );
        adopt(res);
      }
      if (type === 'worker-revise-fix') {
        res = await resolveContinuationMismatch(
          res,
          (continuation, decision_token) =>
            send({ continuation, decision_token }),
          {
            onResult: adopt,
            refresh: () => send()
          }
        );
      }
    } finally {
      revise_pending.delete(bead_id);
      doRender();
    }
    if (!res || res.conflict) {
      return;
    }
    if (res.ok) {
      showToast(
        type === 'worker-revise-fix'
          ? '처분 세션을 띄웠습니다 — 수리 후 구현이 재디스패치됩니다'
          : '델타 승인 완료 — 영수증 갱신 + 파킹 해제',
        'success',
        2800
      );
      return;
    }
    showToast(`처분 거부: ${res.reason || ''}`, 'error', 3000);
  }

  /**
   * @param {boolean} on
   */
  async function setAutomation(on) {
    if (!transport) {
      return;
    }
    const res = await transport('worker-automation-toggle', {
      on,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-automation-toggle', {
        on,
        expected_revision: currentRevision()
      }).then(adopt);
    }
  }

  /**
   * Acknowledge ONE failed operation — the 기록 닫기 click (§4.6-2). Not a retry
   * and not a state transition: the row keeps its failure and its evidence, and
   * only the 해결 필요 tally and its action buttons let it go.
   *
   * @param {string} operation_id
   */
  async function dismissRepoOperation(operation_id) {
    if (!transport || !operation_id) {
      return;
    }
    const res = await transport('worker-repo-operation-dismiss', {
      operation_id
    });
    adopt(res);
    if (res && res.ok === false) {
      showToast(`기록 닫기 거부: ${res.reason || ''}`, 'error', 3000);
    }
  }

  /**
   * Set the concurrency cap (worker-phase2 §3), under the same CAS discipline
   * as the other mutations. The value is clamped to the lower bound before it
   * is sent — the server rejects (never clamps) an out-of-bound value.
   *
   * @param {number} slots
   */
  async function setSlots(slots) {
    if (!transport || !Number.isFinite(slots)) {
      return;
    }
    const value = Math.max(MIN_SLOTS, Math.floor(slots));
    const res = await transport('worker-queue-set-slots', {
      slots: value,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-set-slots', {
        slots: value,
        expected_revision: currentRevision()
      }).then(adopt);
    }
  }

  /**
   * Resize the fixed serial-lane set (UI-04vo §1), under the same CAS
   * discipline. A shrink that returns waiting entries to the parallel lane is
   * announced with a snackbar so the move is never silent.
   *
   * @param {number} count
   */
  async function setSerialLaneCount(count) {
    if (
      !transport ||
      !Number.isInteger(count) ||
      count < 1 ||
      count > SERIAL_LANE_MAX
    ) {
      return;
    }
    const before = currentQueue();
    const truncated = (
      Array.isArray(before.serial_lanes) ? before.serial_lanes : []
    )
      .slice(count)
      .reduce(
        (/** @type {number} */ sum, /** @type {any} */ lane) =>
          sum + (Array.isArray(lane?.entries) ? lane.entries.length : 0),
        0
      );
    const payload = () => ({
      count,
      expected_revision: currentRevision()
    });
    let res = await transport('worker-queue-set-serial-lane-count', payload());
    adopt(res);
    if (res && res.conflict) {
      res = await transport('worker-queue-set-serial-lane-count', payload());
      adopt(res);
    }
    if (res && res.applied && truncated > 0) {
      showToast(`직렬 레인 축소 — ${truncated}개 항목이 병렬 대기로 이동`);
    }
  }

  // --- 겹침 칩·팝오버·1클릭 직렬 배치 (UI-qm12 §5.3·§5.4의 워커 탭 투영,
  // UI-jbao). 파생 규칙은 `queue-overlaps.js`가, 칩·팝오버 마크업은 lanes의
  // `dependencyChipsTemplate`이 소유한다 — 모니터와 같은 한 벌이다. ---

  /** 겹침 팝오버의 배치 버튼 문구 (UI-qm12 §5.4). */
  const OVERLAP_PLACE_LABEL = '같은 직렬 레인으로';

  /**
   * @param {string} me_id
   * @param {import('./lanes.js').OverlapChip} chip
   * @returns {import('./lanes.js').OverlapPopoverRow}
   */
  function overlapPopoverRow(me_id, chip) {
    const plan = workerPlacementPlan(me_id, chip.id, overlap_queue_facts);
    return {
      id: chip.id,
      title: chip.title,
      location_label: chip.location_label,
      prefixes: chip.prefixes,
      action:
        plan.kind === 'note'
          ? { kind: 'note', text: plan.text }
          : plan.kind === 'disabled'
            ? {
                kind: 'disabled',
                label: OVERLAP_PLACE_LABEL,
                title: plan.title
              }
            : { kind: 'place', label: OVERLAP_PLACE_LABEL, title: plan.title }
    };
  }

  /**
   * @param {string} bead_id
   * @param {import('./lanes.js').OverlapChip[]} overlaps
   * @returns {import('./lanes.js').OverlapPopover|null}
   */
  function overlapPopoverFor(bead_id, overlaps) {
    if (!open_overlap || open_overlap.bead_id !== bead_id) {
      return null;
    }
    const counterpart_id = open_overlap.counterpart_id;
    const chips = overlaps.filter((chip) => chip.id === counterpart_id);
    if (chips.length === 0) {
      return null;
    }
    return { rows: chips.map((chip) => overlapPopoverRow(bead_id, chip)) };
  }

  /**
   * Run the 1클릭 배치 (UI-qm12 §5.4). 판정은 지금의 모델로 다시 하고, 두 번째
   * op는 첫 응답이 실어 온 revision으로 간다. 첫 op가 실패하면 두 번째는
   * 보내지 않는다 — 트랜잭션이 없으므로 다음 스냅샷이 실제 상태를 그린다.
   *
   * @param {string} me_id
   * @param {string} counterpart_id
   */
  async function placeIntoSameSerialLane(me_id, counterpart_id) {
    const plan = workerPlacementPlan(
      me_id,
      counterpart_id,
      overlap_queue_facts
    );
    open_overlap = null;
    if (plan.kind !== 'ops') {
      doRender();
      return;
    }
    let revision = currentRevision();
    for (const op of plan.ops) {
      const next = await sendOverlapPlaceOp(op, revision);
      if (next === null) {
        break;
      }
      revision = next;
    }
    doRender();
  }

  /**
   * @param {{ bead_id: string, lane: 's1'|'s2'|'s3'|'s4'|'s5', index: number }} op
   * @param {number} revision
   * @returns {Promise<number|null>} 이어 쓸 revision, 실패면 null.
   */
  async function sendOverlapPlaceOp(op, revision) {
    if (!transport) {
      return null;
    }
    try {
      // 충돌 자동 재시도 없음 (§5.4): 판정은 클릭 시점의 모델로 했으므로,
      // 충돌은 그 판정의 근거가 사라졌다는 뜻이다 — 낡은 계획을 새 큐에
      // 밀어 넣지 않는다. `placeBead`의 1회 재시도와 다른 계약이다.
      const res = /** @type {any} */ (
        await transport('worker-queue-place', {
          bead_id: op.bead_id,
          lane: op.lane,
          index: op.index,
          expected_revision: revision
        })
      );
      adopt(res);
      if (res && res.conflict) {
        showToast('큐가 바뀌었습니다 — 다시 시도해 주세요', 'error');
        return null;
      }
      // 성공은 `applied: true` + 숫자 revision뿐이다. 그 외(전송 불가·적용
      // 거부·revision 없는 응답)는 전부 중단 — 두 번째 op는 첫 응답의
      // revision으로만 간다.
      if (!res || res.applied !== true) {
        showToast(
          res && typeof res.admission_reason === 'string'
            ? `큐 적재 거부: ${res.admission_reason}`
            : '큐 요청이 적용되지 않았습니다',
          'error'
        );
        return null;
      }
      const next_revision = res.queue ? res.queue.revision : undefined;
      if (typeof next_revision !== 'number') {
        showToast('큐 응답에 revision이 없습니다', 'error');
        return null;
      }
      return next_revision;
    } catch (error) {
      showToast(
        error instanceof Error && error.message
          ? error.message
          : '큐 요청 실패',
        'error'
      );
      return null;
    }
  }

  /**
   * One shared lane model (UI-4tud §4.1). 어댑터가 `worker-queue` 스냅샷과 Board
   * live store 다섯 열을 워크스페이스 항목 하나로 접고, `buildLanes`가 두 탭이
   * 같이 쓰는 레인 모델을 낸다.
   *
   * 후보 순서는 어댑터의 정렬 체인과 그 뒤의 의존 인접화 패스가 이미 정했으므로
   * (UI-q1y7 §4.2) `as_given`이다. 대기·직렬·후보가 모두 비어도 그룹은 남아야
   * 하므로 (`slots`·머지 큐·저장소 작업이 그 안에 산다) `groups: 'all'`이다.
   * `cross_lanes` 키는 넘기지 않는다 — 연결 레인은 모니터 탭의 사실이고, 키의
   * 부재가 "모른다"(구서버와 같은 자리)다.
   *
   * @returns {LaneModel}
   */
  function laneModel() {
    const done_since = closedRangeSince(done_range);
    const input = adapter.read({ candidate_sort, done_since });
    // 드롭 계획의 `settledBlockerSources`는 투영이 아니라 이 스냅샷 원본을
    // 읽는다 (§4.5) — 키가 없으면 "미상"이고, 그때 계획은 dep op를 만들지 않는다.
    last_workspaces = input.workspaces;
    current_lanes = buildLanes(input.workspaces, input.workspaces_state, {
      done_since,
      candidate_filter,
      // 감춘 수는 조작별로 센다 (UI-ki09): 두 필터에 모두 걸린 후보는 어느
      // 배지에도 들어가지 않는다 — 한쪽만 풀어도 나타나지 않기 때문이다.
      candidate_hidden_counts: 'per_control',
      candidate_sort: 'as_given',
      groups: 'all'
    });
    return current_lanes;
  }

  /**
   * This render's 대기 그룹. `groups: 'all'`이라 스냅샷이 있는 한 언제나 있고, 없는
   * 경우는 스냅샷 미도착뿐이다 (§6) — 그때는 빈 그룹 상수로 그린다.
   *
   * @param {LaneModel} m
   * @returns {LaneQueueGroup}
   */
  function groupOf(m) {
    return m.queue_groups[0] || EMPTY_QUEUE_GROUP;
  }

  /**
   * One row's 의존·겹침 칩 (UI-anna §5.3, UI-e9sg). 투영이 이미 만든
   * `dependency_chips`에 겹침 파생(`overlap_chips`·`scope_state`)과 이 뷰가 연
   * 팝오버를 얹는다. 재료가 하나도 없으면 `null`이다.
   *
   * 발차 칩(`armed_lane_chip`)은 얹지 않는다: 워커 탭은 한 레포의 화면이라 연결
   * 레인 번호를 해석할 수 없고, "연결 레인이 발차했다"는 사실은 툴바의
   * `⏸ 자동 진행 꺼짐 · 연결 레인 n건` 힌트가 이미 소유한다.
   *
   * @param {LaneItem} row
   * @returns {import('./lanes.js').DependencyChips|null}
   */
  function chipsWithOverlaps(row) {
    const existing = row.dependency_chips || null;
    // 후보 행의 해제·후속 칩은 투영이 실은 그대로 지킨다 (UI-d13v §5.3); 선행
    // 칩은 워커 어휘로 다시 만들므로 투영의 것을 쓰지 않는다.
    const kept = {
      ...(existing && existing.released ? { released: existing.released } : {}),
      ...(existing && existing.dependents
        ? { dependents: existing.dependents }
        : {})
    };
    const fact = overlap_facts_by_bead.get(row.id);
    const predecessors = blocker_chips_by_bead.get(row.id) || null;
    const overlaps = fact && fact.overlaps.length > 0 ? fact.overlaps : null;
    const scope_missing = !!fact && fact.scope_missing;
    if (
      !predecessors &&
      !overlaps &&
      !scope_missing &&
      Object.keys(kept).length === 0
    ) {
      return null;
    }
    const popover = overlaps ? overlapPopoverFor(row.id, overlaps) : null;
    return {
      ...kept,
      ...(predecessors ? { predecessors } : {}),
      ...(overlaps ? { overlaps } : {}),
      ...(scope_missing ? { scope_missing: true } : {}),
      ...(popover ? { popover } : {})
    };
  }

  /**
   * Project one shared lane item into a Worker row (§4.4). 두 좌표를 걷어낸다:
   * 레포 배지(`workspace_name`)는 한 레포짜리 화면에서 새 사실을 더하지 않고,
   * 완료 3줄 변형(`done_layout`)은 그 배지가 붙는 모니터 완료 행의 것이다.
   *
   * @param {LaneItem} item
   * @returns {any}
   */
  function rowOf(item) {
    return {
      ...item,
      workspace_name: '',
      done_layout: undefined,
      dependency_chips: chipsWithOverlaps(item) || undefined
    };
  }

  /**
   * What a 대기·직렬 row reads from the snapshot on top of the lane model
   * (§4.4). 레인 모델은 두 탭이 공유하는 값만 싣고, stale 점유 처분·legacy `worker-serial` 취소선·`blocks` 자동 정정
   * 배지는 워커 탭 대기 행만의 조작·표시다.
   *
   * @returns {{ admission: Record<string, any>, bead_labels: Record<string, any>, correction_after: Map<string, string> }}
   */
  function waitingFacts() {
    const q = currentQueue();
    /** @type {Map<string, string>} */
    const correction_after = new Map();
    for (const state of Object.values(objectOf(q.lane_states))) {
      const corrections = Array.isArray(/** @type {any} */ (state)?.corrections)
        ? /** @type {any} */ (state).corrections
        : [];
      for (const correction of corrections) {
        if (
          correction &&
          typeof correction.bead_id === 'string' &&
          typeof correction.after === 'string'
        ) {
          correction_after.set(correction.bead_id, correction.after);
        }
      }
    }
    return {
      admission: objectOf(q.admission),
      bead_labels: objectOf(q.bead_labels),
      correction_after
    };
  }

  /**
   * One 대기·직렬 row.
   *
   * @param {LaneItem} item
   * @param {ReturnType<typeof waitingFacts>} facts
   * @returns {any}
   */
  function waitingRowOf(item, facts) {
    const row = rowOf(item);
    // stale 점유 처분 카드 (UI-hs11 계열): 처분 대기 중인 행은 끌 수 없고,
    // 같은 카드가 admission `⛔` 사유를 겹쳐 적지 않는다 — 처분 카드가 이미 그
    // 상태를 말한다.
    const stale_work = staleWorkProjection(
      facts.admission[item.id] || null,
      !!item.discard || stale_work_pending.has(item.id)
    );
    // 표시 전용 legacy worker-serial 잔재 (UI-04vo §4): 스케줄링 소비는 은퇴
    // 했고, 라벨이 남아 있는 행만 취소선 칩을 위해 표시한다.
    const labels = facts.bead_labels[item.id];
    const correction = facts.correction_after.get(item.id);
    return {
      ...row,
      draggable: row.draggable === true && !stale_work,
      stale_work,
      reason: stale_work ? '' : row.reason,
      worker_serial: Array.isArray(labels) && isWorkerSerial(labels),
      badges: correction
        ? [`🔗 ${correction} 뒤 (blocks 자동)`, ...(row.badges || [])]
        : row.badges,
      // 처분 세션 요청의 in-flight 창 (UI-hs11 §3.5) — 두 번째 클릭을 막는다.
      revise_enabled:
        row.revise_enabled === true && !revise_pending.has(item.id)
    };
  }

  /**
   * The 병렬 대기 rows of this render, with the Worker-only overlay applied.
   *
   * @param {LaneModel} m
   * @returns {any[]}
   */
  function waitingRows(m) {
    const facts = waitingFacts();
    return groupOf(m).sublanes.parallel.map((item) =>
      waitingRowOf(item, facts)
    );
  }

  /**
   * The 직렬 레인 view model (UI-04vo §4). 점유 lineage는 ghost 행이 대표하고, 그 행은
   * 대기 entries의 구성원이 아니므로 드래그도 드롭 인덱스도 갖지 않는다.
   *
   * @param {LaneModel} m
   * @returns {Array<{ id: string, index: number, raw_length: number, ghosts: any[], items: any[], occupied: boolean, badge: string, cycle: boolean }>}
   */
  function serialLanes(m) {
    const facts = waitingFacts();
    return groupOf(m).sublanes.serial.map((lane) => {
      const ghosts = lane.occupants.map((occupant) => ({
        id: occupant.id,
        title: occupant.title,
        draggable: false,
        lane: lane.id,
        ghost: true,
        badges: [occupant.badge]
      }));
      return {
        id: lane.id,
        index: lane.index + 1,
        raw_length: lane.raw_length,
        ghosts,
        items: lane.items.map((item) => waitingRowOf(item, facts)),
        occupied: lane.occupied_by.length > 0,
        badge: lane.occupants.length > 0 ? lane.occupants[0].badge : '대기',
        cycle: lane.cycle === true
      };
    });
  }

  /**
   * The candidate cards of this render, in the sort chain's order.
   *
   * @param {LaneModel} m
   * @returns {any[]}
   */
  function candidateRows(m) {
    return m.runnable.map((item) => rowOf(item));
  }

  /**
   * The 완료 rows of this render, worker and session work merged.
   *
   * @param {LaneModel} m
   * @returns {any[]}
   */
  function doneRows(m) {
    return m.done.map((item) => rowOf(item));
  }

  /**
   * The 실행 중 tiles (§4.3). 레인 모델의 항목을 타일 계약으로 옮기고, 레인 모델이
   * 알 수 없는 **뷰 로컬 상태** 둘 — 자식 진행도 펼침과 실패 상세 팝오버 열림 —
   * 을 여기서 덧씌운다.
   *
   * @param {LaneModel} m
   * @returns {import('./running-grid.js').RunningTile[]}
   */
  function runningTiles(m) {
    // 돌고 있는 리뷰 세션은 워커 그리드에 타일을 만들지 않는다 (UI-hk74 §7,
    // UI-d7fy §5.5): 진행은 PR 대기 행의 배지가, 결과는 완료 행의 배지가 말한다.
    // 타일을 그리면 같은 bead가 두 레인에 서고, 타일의 운영 버튼이 구현 attempt용
    // 경로로 리뷰 시도를 건드린다.
    const tiles = m.running
      .filter((item) => item.non_occupying !== true)
      .map(
        (item) =>
          /** @type {any} */ ({
            ...item,
            bead_id: item.id,
            attempt_id: item.attempt_id || '',
            paused: item.run_state === 'paused',
            failed: item.run_state === 'failed',
            // 파킹·backoff 대기 (UI-5ym8 §8). 실패와 같은 자리(판정 칩)를 쓰되
            // 실패는 아니므로 별도 플래그다 — 하나로 합치면 큐가 멈췄다는 뜻이
            // 딸려 온다.
            parked: item.run_state === 'parked',
            retry_wait: item.run_state === 'retry_wait',
            status_label:
              item.run_state === 'failed'
                ? item.status === 'orphaned'
                  ? '중단됨'
                  : '실패'
                : item.run_state === 'parked'
                  ? '세션 대기'
                  : item.run_state === 'retry_wait'
                    ? '재시도 대기'
                    : undefined,
            can_pause: item.can_pause !== false,
            // 레포 배지는 한 레포 화면의 사실이 아니다 (모니터 타일만 그린다).
            workspace_name: '',
            dependency_chips: chipsWithOverlaps(item) || undefined,
            rollup_expanded: rollup_expanded_ids.has(item.id),
            failure: item.failure
              ? {
                  ...item.failure,
                  open: open_failure_detail === item.attempt_id
                }
              : null
          })
      );
    // 사람이 결정할 것이 먼저 보여야 한다: 실패, 그 다음 파킹(사용자 결정을
    // 기다리는 중), 그 다음 스스로 굴러가는 나머지. backoff 대기는 사람이 할 일이
    // 없으므로 앞으로 나오지 않는다.
    return [
      ...tiles.filter((tile) => tile.failed === true),
      ...tiles.filter((tile) => tile.failed !== true && tile.parked === true),
      ...tiles.filter((tile) => tile.failed !== true && tile.parked !== true)
    ];
  }

  /**
   * PR 대기 행 (worker-phase2 §7). 행 투영은 워커 탭 전용 `prWaitRow`가 소유한다 —
   * 머지 큐 위치·권한·이어하기·자동 제외·게이트 버튼은 이 탭만 그리는 조작이다.
   * 재료는 스냅샷과 레인 모델의 `queue_groups[0].merge`에서 온다.
   *
   * 열은 스냅샷 `pr_wait` 전체다: 충돌 해소 세션이 도는 bead는 실행 중 타일과 PR
   * 대기 행에 동시에 서고, 그 두 카드가 같은 사실의 다른 면을 말한다 (UI-dxgz §1).
   *
   * @param {LaneModel} m
   * @returns {any[]}
   */
  function prWaitRows(m) {
    if (pr_wait_memo && pr_wait_memo.model === m) {
      return pr_wait_memo.rows;
    }
    const q = currentQueue();
    const group = groupOf(m);
    const attempts = objectOf(q.attempts);
    const impl_attempts = /** @type {any[]} */ (
      Object.values(attempts).filter(isImplementationAttempt)
    );
    /** @type {Map<string, any>} */
    const attempt_by_id = new Map();
    for (const attempt of impl_attempts) {
      attempt_by_id.set(attempt.attempt_id, attempt);
    }
    /** @type {Map<string, any>} */
    const last_attempt_by_bead = new Map();
    for (const attempt of impl_attempts) {
      last_attempt_by_bead.set(attempt.bead_id, attempt);
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
      if (!item_by_id.has(item.id)) {
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
      if (tile.run_state === 'failed' || tile.conflict_resolution !== true) {
        continue;
      }
      if (tile.run_state !== 'paused') {
        conflict_sessions.set(tile.id, 'running');
      } else if (!conflict_sessions.has(tile.id)) {
        conflict_sessions.set(tile.id, 'paused');
      }
    }
    const auto_merge_skips = objectOf(q.auto_merge_skips);
    /** @type {Set<string>} */
    const auto_excluded = new Set(group.merge.auto_excluded);
    const pr_obs = objectOf(q.pr_observations);
    const pr_activity = objectOf(q.pr_activity);
    const cleanup_failed = objectOf(q.cleanup_failed);
    const discard_operations = objectOf(q.discard_operations);
    const bead_workflow = objectOf(q.bead_workflow);
    const bead_titles = objectOf(q.bead_titles);
    const merge_state = q.merge_queue_state || { active: null, failures: {} };
    const merge_waiting = group.merge.state.waiting;
    const rows = (Array.isArray(q.pr_wait) ? q.pr_wait : []).map(
      (/** @type {any} */ e) => {
        const item = item_by_id.get(e.bead_id);
        const row = prWaitRow(
          e.bead_id,
          item?.title || bead_titles[e.bead_id] || e.bead_id,
          pr_obs,
          cleanup_failed[e.bead_id] || null,
          sumAttemptUsage(attempts, e.bead_id),
          // The server's own progress wins; the local pending only covers the
          // window before the first snapshot carrying it arrives.
          pr_activity[e.bead_id] ||
            (merge_pending.has(e.bead_id)
              ? {
                  activity: null,
                  merge_progress: null,
                  queueing: /** @type {const} */ ('merge')
                }
              : cleanup_pending.has(e.bead_id)
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
            position: group.merge.positions.get(e.bead_id) || 0,
            active: merge_state.active === e.bead_id,
            failure: objectOf(merge_state.failures)[e.bead_id] || null,
            waiting:
              merge_waiting && merge_waiting.bead_id === e.bead_id
                ? merge_waiting.reason
                : null,
            resolution: group.merge.resolutions.get(e.bead_id),
            continuation_action: group.merge.continuations.get(e.bead_id),
            authority: group.merge.authorities.get(e.bead_id) || null
          },
          // Also overlay-only (UI-w0hi §3): a durable row has no field here and
          // must keep the pre-existing behaviour, so absence reads as present.
          e.wt_present !== false,
          // 자동 모드가 꺼져 있으면 제외 기록은 이 행이 서 있는 이유가 아니다
          // (UI-yk55 §3.4).
          q.auto_merge === true && auto_excluded.has(e.bead_id)
            ? auto_merge_skips[e.bead_id]?.reason || ''
            : null,
          baseException(group.declared_base, targetBase(e.bead_id)),
          objectOf(q.completion_status)[e.bead_id] || null,
          discard_operations,
          last_attempt_by_bead.get(e.bead_id)?.worker_serial === true,
          q.auto_merge === true,
          {
            merge_sha: e.merge_sha,
            cleanup_cursor: e.cleanup_cursor,
            repo_operations: group.repo_operations
          },
          item ? chipsWithOverlaps(item) : null,
          reviewSessionRowState(attempts, e.bead_id)
        );
        return {
          ...row,
          workflow: bead_workflow[e.bead_id] || null,
          priority: item?.priority,
          from_id: item?.from_id,
          ...(item?.created_at === undefined
            ? {}
            : { created_at: item.created_at }),
          ...(item?.updated_at === undefined
            ? {}
            : { updated_at: item.updated_at })
        };
      }
    );
    pr_wait_memo = { model: m, rows };
    return rows;
  }

  /**
   * Re-derive this render's comparison set and lane facts (UI-jbao). 팝오버의
   * 배치 판정은 클릭 시점의 최신 모델로 한다.
   *
   * @param {LaneModel} m
   */
  function refreshOverlapFacts(m) {
    const group = groupOf(m);
    /** @type {import('./queue-overlaps.js').LaneMember[]} */
    const members = [];
    for (const tile of m.running) {
      // 비점유 타일(돌고 있는 리뷰 세션)은 그 bead의 자리를 주장하지 않는다
      // (UI-d7fy §5.5). 첫 등장이 이기는 목록이므로, 여기서 넣으면 같은 bead의
      // PR 대기 자리가 가려져 겹침·차단 칩이 틀린 레인을 가리킨다.
      if (tile.non_occupying === true) {
        continue;
      }
      members.push({
        id: tile.id,
        title: tile.title,
        location_label: '실행중',
        kind: 'running',
        lane_id: tile.serial_lane_id ?? null
      });
    }
    for (const item of m.pr_wait) {
      members.push({
        id: item.id,
        title: item.title,
        location_label: 'PR 대기',
        kind: 'pr_wait',
        lane_id: null
      });
    }
    for (const lane of group.sublanes.serial) {
      lane.items.forEach((item, row_index) => {
        members.push({
          id: item.id,
          title: item.title,
          location_label: `${lane.id} #${row_index + 1}`,
          kind: 'serial',
          lane_id: lane.id
        });
      });
    }
    group.sublanes.parallel.forEach((item, row_index) => {
      members.push({
        id: item.id,
        title: item.title,
        location_label: `#${row_index + 1}`,
        kind: 'parallel',
        lane_id: null
      });
    });
    // 후보도 비교 집합이다 (UI-f3ma): 큐에 넣기 직전이 "무엇과 부딪히나"를 가장
    // 알고 싶은 순간이다. 필터로 숨긴 후보는 들어오지 않는다.
    for (const item of m.runnable) {
      members.push({
        id: item.id,
        title: item.title,
        location_label: '후보',
        kind: 'candidate',
        lane_id: null,
        queue_placeable: item.queue_placeable === true
      });
    }
    // 첫 등장이 이긴다 — 실행 중이 목록의 앞이므로, 실행 중 bead가 큐 항목으로
    // 남아 있어도 위치 판정은 실행 중이다.
    /** @type {Map<string, import('./queue-overlaps.js').LaneMember>} */
    const members_by_id = new Map();
    for (const member of members) {
      if (!members_by_id.has(member.id)) {
        members_by_id.set(member.id, member);
      }
    }
    /** @type {Record<string, number>} */
    const serial_raw_lengths = {};
    /** @type {Set<string>} */
    const occupied_lanes = new Set();
    for (const lane of group.sublanes.serial) {
      serial_raw_lengths[lane.id] = lane.raw_length;
      if (lane.occupied_by.length > 0) {
        occupied_lanes.add(lane.id);
      }
    }
    overlap_queue_facts = {
      members_by_id,
      serial_raw_lengths,
      serial_lane_count: group.serial_lane_count,
      occupied_lanes
    };
    const q = currentQueue();
    // `bead_scope` 키 자체가 없는 구서버는 겹침 계산을 통째로 건너뛴다.
    overlap_facts_by_bead = deriveWorkerOverlaps(q.bead_scope, members);
    // blocked 칩의 원천을 하나로 정규화한다 (UI-anna §5.1): 행이 실어 온 값
    // (후보 사다리·세션 항목) 위에 큐 장식이 이긴다 — 서버가 스냅샷마다 다시
    // 계산하는 값이고, 빈 배열도 "없다"이지 "모른다"가 아니다.
    /** @type {Map<string, string[]>} */
    const blockers_by_bead = new Map();
    for (const item of [...m.running, ...m.runnable]) {
      if (Array.isArray(item.blocked_by) && item.blocked_by.length > 0) {
        blockers_by_bead.set(item.id, item.blocked_by);
      }
    }
    for (const [bead_id, ids] of Object.entries(objectOf(q.bead_blocked_by))) {
      if (!Array.isArray(ids)) {
        continue;
      }
      blockers_by_bead.set(
        bead_id,
        ids.filter(
          (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
        )
      );
    }
    blocker_chips_by_bead = deriveWorkerBlockers(
      blockers_by_bead,
      members,
      objectOf(q.blocker_workspaces)
    );
  }

  /**
   * Why the queue stopped dispatching, and the way out (UI-5ym8 §8).
   *
   * 사용자 ⏸(`auto_advance`)와는 다른 사실이고 다른 자리다: 그것은 사람이
   * 내린 결정이라 툴바 버튼이 말하고, 이것은 실패가 켠 상태라 왜 멈췄는지와
   * 무엇을 누르면 풀리는지를 함께 말해야 한다. 둘은 독립이므로 배너가 서 있는
   * 동안에도 ▶ 표시는 그대로다.
   *
   * 두 종류는 사람이 할 일이 다르다. **환경 보류**는 자동 재시도가 이미
   * 예약돼 있어 아무것도 하지 않아도 풀리므로 회색이고, 버튼은 그 시각을 앞당길
   * 뿐이다. **체계적 정지**는 자동 출구가 없어 사람의 `재개`만이 유일한 길이라
   * 경고색이다.
   *
   * @param {any} q - 현재 `worker-queue-snapshot` 값.
   * @returns {import('lit-html').TemplateResult|''}
   */
  function holdBannerTemplate(q) {
    const hold = q.hold && typeof q.hold === 'object' ? q.hold : null;
    if (!hold || (hold.kind !== 'env' && hold.kind !== 'systemic')) {
      return '';
    }
    // 원인 문장은 실패 타일·타임라인과 같은 어휘를 쓴다. 모르는 토큰은 raw로
    // 흘려보내는 `failureText`의 규약 그대로다 — 침묵보다 낫다.
    const cause = failureText(hold.cause) || String(hold.cause || '');
    const lineages = Array.isArray(q.lineages) ? q.lineages : [];
    if (hold.kind === 'env') {
      // 가장 이른 재시도가 이 보류가 언제 움직이는지에 답한다. 하나도 예약돼
      // 있지 않으면 시각 조각만 빠진다 (fail-quiet).
      const next_at = lineages
        .map((/** @type {any} */ line) => line && line.next_at)
        .filter((/** @type {any} */ at) => typeof at === 'number')
        .sort((/** @type {number} */ a, /** @type {number} */ b) => a - b)[0];
      const next =
        typeof next_at === 'number'
          ? ` · 다음 ${new Date(next_at).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit'
            })}`
          : '';
      return html`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${cause} — 재시도 대기${next}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`;
    }
    const bead_ids = (Array.isArray(hold.bead_ids) ? hold.bead_ids : []).filter(
      (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
    );
    return html`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${cause}${bead_ids.length > 0
          ? ` — bead ${bead_ids.join(', ')}`
          : ''}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`;
  }

  /**
   * @param {LaneModel} m
   * @returns {import('lit-html').TemplateResult}
   */
  function topTemplate(m) {
    const q = currentQueue();
    const group = groupOf(m);
    const parallel = group.sublanes.parallel;
    const next_head = parallel.length > 0 ? parallel[0].id : '—';
    const play = html`<button
      type="button"
      class="worker-play${q.auto_advance ? ' is-active' : ''}"
    >
      ${q.auto_advance ? '⏸ 자동화 멈춤' : '▶ 자동화'}
    </button>`;
    // 자동 머지 토글은 실행/PR 패널 유무와 관계없이 툴바에 고정한다. 같은
    // 템플릿을 한 번만 삽입해 모바일 지금 패널·데스크톱 PR 대기 헤더 중복도
    // 피한다.
    const merge_all = mergeAllTemplate(m);
    const overcap = group.over_cap
      ? html`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`
      : '';
    // 자동 진행이 꺼졌는데 세션이 뜨는 이유를 화면이 말한다 (UI-jaua §5.6):
    // 연결 레인이 병렬 대기 행을 발차하면 전역 토글과 무관하게 그 항목만 나간다.
    // 켜져 있을 때는 후보 집합이 현행과 같으므로 할 말이 없다 (fail-quiet).
    const armed_count = q.auto_advance
      ? 0
      : (Array.isArray(q.queue) ? q.queue : []).filter(
          (/** @type {any} */ entry) =>
            entry &&
            typeof entry.armed_by_lane === 'string' &&
            entry.armed_by_lane.length > 0
        ).length;
    const armed_hint =
      armed_count > 0
        ? html`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${armed_count}건 진행 중</span
          >`
        : '';
    // 세 카운트는 데스크톱 KPI 줄과 모바일 리본이 함께 쓴다 — 같은 수를 두 번
    // 정의하지 않기 위해 템플릿 하나로 둔다.
    const counts = html`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${group.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${prWaitRows(m).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${doneRangeLabel()} 완료 <b>${m.done.length}</b></span
      >`;
    // 이 워크스페이스가 어디로 머지되는가 (UI-j6wa §3). 상시 표시 — base는 PR을
    // 여는 순간 되돌리기 어려운 선택이라, 예외가 생겼을 때만 나타나는 표시로는
    // 늦다. 읽지 못한 선언을 `main`으로 그리지는 않는다.
    const base_chip = html`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${group.declared_base
        ? '이 워크스페이스가 선언한 target base (docs/agents/repo-ops.toml). 디스패치 시점의 검증은 별도'
        : '선언 파일을 읽지 못했습니다 — target base 확인 불가'}
      >base ${group.declared_base || '?'}</span
    >`;
    const settings = html`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${MIN_SLOTS}
          step="1"
          .value=${String(group.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({ length: SERIAL_LANE_MAX }, (_, i) => i + 1).map(
            (n) =>
              html`<option
                value=${String(n)}
                ?selected=${group.serial_lane_count === n}
              >
                ${n}
              </option>`
          )}
        </select>
      </label> `;
    // 정리 멈춤은 더 이상 배너가 아니라 타임라인의 한 항목이다 (§4.2) — 스트립의
    // 해결 필요 배지가 부르고, 클릭이 그 자리로 데려간다.
    const repo_operations = repoOpsStripTemplate(
      group.repo_operations,
      group.cleanup_failures
    );
    // 보류/정지 배너는 리본·툴바 밖, 레포 작업 스트립 앞이다: 큐 전체가 멈춘
    // 이유는 개별 레포 작업보다 먼저 읽혀야 하고, 고정되는 것은 "항상 읽혀야
    // 하는 한 줄"뿐이어야 하므로 sticky 리본에는 넣지 않는다.
    const hold_banner = holdBannerTemplate(q);
    if (is_mobile) {
      // sticky 리본 (UI-58y2 §모바일 1)에는 두 자동화 토글과 세 카운트만 둔다.
      // 슬롯·⚙는 아래 조작 줄로 내리고 배너는 리본 밖에 남긴다 — 고정되는 것은
      // "항상 읽혀야 하는 한 줄"뿐이어야 하고, 배너가 같이 붙으면 스크롤할수록
      // 화면이 줄어든다.
      return html`<div class="worker-ribbon">
          ${play} ${merge_all}
          <div class="worker-kpi worker-kpi--ribbon">
            ${overcap}${armed_hint}${counts}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${settings}</div>
          <div class="worker-kpi">${base_chip}</div>
        </div>
        ${hold_banner}${repo_operations}${repo_ops_settings.template()}`;
    }
    // 좌: 조작 / 우: KPI (UI-58y2 데스크톱 §툴바).
    return html`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${play}${merge_all}${settings}</div>
        <div class="worker-kpi">
          ${overcap}${armed_hint}${counts}${base_chip}
          ${(Array.isArray(group.token_total)
            ? group.token_total
            : group.token_total
              ? [
                  {
                    label: group.token_total,
                    tooltip: `${doneRangeLabel()} 완료된 이슈들이 생애 전체에 쓴 토큰 누적 (입력+출력+캐시). 이 기간에 소모된 양이 아니다`
                  }
                ]
              : []
          ).map(
            (badge) =>
              html`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${badge.tooltip}
                >${doneRangeLabel()} 완료 · 누적 ${badge.label}</span
              >`
          )}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${next_head}</b></span
          >
        </div>
      </div>
      ${hold_banner}${repo_operations}${repo_ops_settings.template()}`;
  }

  /**
   * Candidate pane filter strip (UI-ki09). The pane header counts VISIBLE rows,
   * so each control carries the count it alone is hiding — "왜 안 보이지" has an
   * answer without opening anything.
   *
   * @param {LaneModel} m
   * @returns {import('lit-html').TemplateResult}
   */
  function candidateControlsTemplate(m) {
    const hidden = m.runnable_hidden;
    return html`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${candidate_filter.show_blocked}
        />
        🔒 blocked${hidden.blocked > 0 ? ` ${hidden.blocked}` : ''}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${SPEC_FILTER_OPTIONS.map(
          (o) =>
            html`<button
              type="button"
              class="worker-filter__chip${candidate_filter.spec === o.value
                ? ' is-active'
                : ''}"
              data-spec=${o.value}
              aria-pressed=${candidate_filter.spec === o.value
                ? 'true'
                : 'false'}
            >
              ${o.label}
            </button>`
        )}
        ${hidden.spec > 0
          ? html`<span class="worker-filter__hidden">숨김 ${hidden.spec}</span>`
          : ''}
      </div>
    </div>`;
  }

  /**
   * Candidate pane sort select (UI-raqh §2, chain in UI-d13v §4.4). It sits IN
   * the pane header rather than in the filter strip below it: the filters answer
   * "what is shown", this answers "in what order", and reading it as part of the
   * header keeps the strip about one question only.
   *
   * The value is `custom` for as long as the chain row is open, whatever the
   * stored state turned out to be — an edit that happens to land on a preset
   * must not yank the row shut under the cursor (§4.3 still stores it as that
   * preset).
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function candidateSortTemplate() {
    const current = sort_chain_open
      ? 'custom'
      : presetIdOf(candidate_sort) || 'custom';
    return html`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${current}
    >
      ${CANDIDATE_SORT_PRESETS.map(
        (o) =>
          html`<option value=${o.id} ?selected=${current === o.id}>
            ${o.label}
          </option>`
      )}
      <option value="custom" ?selected=${current === 'custom'}>
        사용자 지정…
      </option>
    </select>`;
  }

  /**
   * The chain editor row (§4.4): three key selects, each with a direction
   * toggle, on ONE line directly under the pane header. Same markup on desktop
   * and mobile — there is no mobile-only header to branch on (UI-5ksp).
   *
   * A step whose key is `없음` renders no toggle: the row draws only what it has
   * material for, and a direction without a key answers nothing.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function candidateSortChainTemplate() {
    const chain = chainOf(candidate_sort);
    return html`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0, 1, 2].map((index) => {
        const step = chain[index];
        return html`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${index}
            aria-label=${`${index + 1}차 정렬 키`}
            .value=${step ? step.key : ''}
          >
            ${index === 0
              ? ''
              : html`<option value="" ?selected=${!step}>없음</option>`}
            ${SORT_KEY_OPTIONS.map(
              (o) =>
                html`<option
                  value=${o.key}
                  ?selected=${!!step && step.key === o.key}
                >
                  ${o.label}
                </option>`
            )}
          </select>
          ${step
            ? html`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${index}
                aria-label=${step.dir === 'asc' ? '오름차순' : '내림차순'}
                title=${step.dir === 'asc' ? '오름차순' : '내림차순'}
              >
                ${step.dir === 'asc' ? '↑' : '↓'}
              </button>`
            : ''}
        </span>`;
      })}
    </div>`;
  }

  /**
   * The 완료 pane period select (UI-d7pw §3.3). It rides in `header_control`
   * (UI-5ksp §4.5): the toggle is its own button now, so a sibling control no
   * longer disappears on the collapsible header branch and changing the select
   * cannot fold the lane.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function doneRangeTemplate() {
    return html`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${done_range}
      >
        ${DONE_RANGE_OPTIONS.map(
          (o) =>
            html`<option value=${o.value} ?selected=${done_range === o.value}>
              ${o.label}
            </option>`
        )}
      </select>
    </div>`;
  }

  /**
   * The toolbar's bulk merge control (UI-5v7d §4, made a durable toggle by
   * UI-yk55 §5.1). ONE button, four states, never two side by side: asking the
   * reader to tell start from stop at a glance is exactly the misread that costs
   * a merge.
   *
   * | 머지 큐 | auto_merge | 버튼 |
   * |---|---|---|
   * | 비어 있음 | OFF | `▶ 자동 머지 N` (N = 지금 자격 있는 행) |
   * | 비어 있음 | ON  | `⏸ 자동 머지` (무장, 아직 대상 없음) |
   * | 진행 중   | ON  | `⏸ 자동 머지 중단 N` |
   * | 진행 중   | OFF | `일괄 머지 중단 N` (수동으로 넣은 항목) |
   *
   * N = 0 에서도 버튼은 남는다. 일회성 액션에서는 넣을 게 없으면 지우는 것이
   * 옳았지만, 토글에서 같은 규칙을 쓰면 **앞으로 도착할 PR을 위해 미리 무장해 둘
   * 방법이 사라진다** — 그게 이 토글의 존재 이유다.
   *
   * @param {LaneModel} m
   * @returns {import('lit-html').TemplateResult|string}
   */
  function mergeAllTemplate(m) {
    const merge = groupOf(m).merge;
    const auto = currentQueue().auto_merge === true;
    if (merge.running) {
      return html`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${auto
          ? ' is-active'
          : ''}"
        title=${auto
          ? '자동 머지를 끄고 대기 중인 항목을 모두 뺍니다 (진행 중인 항목은 끝까지 수행)'
          : '대기 중인 항목을 모두 뺍니다 (진행 중인 항목은 끝까지 수행)'}
      >
        ${auto ? '⏸ 자동 머지 중단' : '일괄 머지 중단'} ${merge.positions.size}
      </button>`;
    }
    if (auto) {
      return html`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;
    }
    const excluded = new Set(merge.auto_excluded);
    const count = prWaitRows(m).filter(
      (/** @type {any} */ r) =>
        r.merge_action && r.merge_enabled && !excluded.has(r.id)
    ).length;
    return html`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${count > 0 ? ` ${count}` : ''}
    </button>`;
  }

  /**
   * The 대기·직렬 행 `✕` (UI-d13v §6): 후보 레인이 드롭 대상이 아니게 되면서
   * 대기→후보 되돌리기가 잃은 경로를 대신한다. 자리는 Monitor가 UI-5ksp §4.6으로
   * 같은 조각을 붙인 곳과 같다 — 행 1번 줄 조작 슬롯 끝이다.
   *
   * 이미 출발한 행에는 그리지 않는다: 판정은 드롭이 거부되던 것과 같은 조건
   * (`done`이거나 draggable하지 않은 행 — 실행 중 attempt·폐기·stale 점유)이다.
   *
   * @param {any} item
   * @returns {import('lit-html').TemplateResult|undefined}
   */
  function queueRowActions(item) {
    if (item.draggable !== true || item.done === true) {
      return undefined;
    }
    return html`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${item.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`;
  }

  /**
   * One 대기 행 shell (UI-4tud §4.5). 드래그 원천 종류·레포·좌표를 DOM에 실어
   * 드래그 컨트롤러가 행 템플릿을 몰라도 되게 한다 — Monitor `.mon2-item`과 같은
   * 계약이고, 두 탭이 같은 `lane-drag` 모듈을 쓴다.
   *
   * @param {any} item
   * @param {{ kind: 'parallel'|'repo-serial', root_dir: string, row_index: number, lane_id?: string }} coordinate
   * @returns {import('lit-html').TemplateResult}
   */
  function dragRow(item, coordinate) {
    return html`<div
      data-bead-id=${item.id}
      data-drag-kind=${coordinate.kind}
      data-root-dir=${coordinate.root_dir}
      data-lane-id=${ifDefined(coordinate.lane_id)}
      data-row-index=${coordinate.row_index}
      data-queue-index=${String(item.queue_index ?? 0)}
    >
      ${miniRow(item, { actions: queueRowActions(item) })}
    </div>`;
  }

  /**
   * The 대기 pane body (UI-5ksp §4.2): 병렬 영역 하나 + 직렬 영역 하나를 한
   * pane 안에 담는다. 구조는 두 탭이 공유하는 `waitBody`가 소유하고, 여기서는
   * 행과 레인 재료만 만들어 슬롯으로 넘긴다.
   *
   * @param {LaneModel} m
   * @returns {import('lit-html').TemplateResult}
   */
  function waitBodyTemplate(m) {
    const parallel_rows = waitingRows(m);
    const root_dir = rootDir();
    return waitBody({
      parallel: {
        rows: parallel_rows.map((/** @type {any} */ it, index) =>
          dragRow(it, { kind: 'parallel', root_dir, row_index: index })
        ),
        count: parallel_rows.length,
        collapsed: collapse.isAreaCollapsed('parallel'),
        drop: { drop: 'parallel', root_dir }
      },
      serial: {
        lanes: serialLanes(m).map((lane) => ({
          id: lane.id,
          title: `직렬 ${lane.index}`,
          rows: [
            // 점유 ghost 행은 서버 레인 entries의 구성원이 아니므로 드롭 마커
            // 에도 서버 인덱스에도 들어가지 않는다 — 좌표 속성을 싣지 않는다.
            ...lane.ghosts.map((/** @type {any} */ it) =>
              miniRow(it, { actions: queueRowActions(it) })
            ),
            ...lane.items.map((/** @type {any} */ it, index) =>
              dragRow(it, {
                kind: 'repo-serial',
                root_dir,
                row_index: index,
                lane_id: lane.id
              })
            )
          ],
          // 점유 ghost 행도 행 목록의 구성원이므로 건수와 빈 판정을 한 재료로
          // 읽는다 — 점유 중인 레인은 비어 있지 않다.
          count: lane.ghosts.length + lane.items.length,
          empty: lane.ghosts.length + lane.items.length === 0,
          badge: lane.badge,
          held: lane.occupied,
          cycle: lane.cycle,
          drop: {
            drop: 'repo-serial',
            root_dir,
            lane_id: lane.id,
            lane_length: String(lane.raw_length)
          }
        })),
        collapsed: collapse.isAreaCollapsed('serial')
      }
    });
  }

  /**
   * The 실행 중 타일 grid: 데스크톱 레인과 모바일 `지금` 패널이 같은 재료를 쓴다.
   *
   * @param {LaneModel} m
   * @returns {import('lit-html').TemplateResult}
   */
  function runningBody(m) {
    // 오버레이 재료는 타일 자신이 싣는다 (UI-4tud §4.3) — 조립이 타일 밖 `Map`
    // 으로 같은 재료를 두 번 나르던 경로는 없어졌다.
    return runningGridTemplate(runningTiles(m), Date.now(), selected_attempt);
  }

  /**
   * Whether one real Worker attempt is running: 세션 타일은 라이브 attempt가
   * 아니므로 (UI-0a2m) 초록 라이브 액센트에서 뺀다.
   *
   * @param {LaneModel} m
   */
  function runningLive(m) {
    return m.running.some(
      (r) => r.kind !== 'session' && r.run_state === 'running'
    );
  }

  /**
   * @param {LaneModel} m
   * @returns {import('lit-html').TemplateResult}
   */
  function lanesTemplate(m) {
    const group = groupOf(m);
    const candidates = candidateRows(m);
    const waiting = waitingRows(m);
    const done = doneRows(m);
    const pr_wait = prWaitRows(m);
    const running = runningTiles(m);
    const candidate_pane = paneTemplate({
      id: 'worker-pane-candidate',
      lane: 'candidate',
      title: '후보',
      items: candidates,
      src: true,
      empty: '후보 없음',
      header_control: candidateSortTemplate(),
      header_row: sort_chain_open ? candidateSortChainTemplate() : undefined,
      controls: candidateControlsTemplate(m),
      collapsible: true,
      collapsed: collapse.isCollapsed('candidate'),
      place_menu: currentPlaceMenu(candidates),
      // Worker candidates always belong to the selected workspace, so the
      // viewer keeps its default workspace.
      onOpenDoc: openDoc
        ? (/** @type {Event} */ _ev, /** @type {any} */ doc) => openDoc(doc)
        : undefined
    });
    const done_pane = paneTemplate({
      id: 'worker-pane-done',
      lane: 'done',
      title: '완료',
      items: done,
      empty: `${doneRangeLabel()} 완료 없음`,
      header_control: doneRangeTemplate(),
      collapsible: true,
      collapsed: collapse.isCollapsed('done'),
      // preview는 모바일 가로 접힘 전용 — 데스크톱 세로 띠는 점·제목·건수만
      // 싣는다 (§4.4).
      preview: is_mobile
        ? Array.isArray(group.token_total)
          ? group.token_total.map((badge) => badge.label).join(' · ')
          : group.token_total || stripPreview(done)
        : undefined
    });
    if (is_mobile) {
      // 관제 우선 배치 (UI-58y2 §모바일, 두 탭 공유는 UI-5ksp §4.7): 지금 →
      // 대기 → 후보 → 완료. 실행 중과 PR 대기는 "지금" 패널이 가져가므로
      // 레인으로 다시 그리지 않는다 — 같은 bead가 두 곳에 보이는 것이 이
      // 화면에서 가장 비싼 오해다.
      return html`<div class="worker-lanes worker-lanes--mobile">
        ${nowPanel({
          live: runningLive(m),
          running_body: running.length > 0 ? runningBody(m) : '',
          pr_wait_rows: pr_wait.map((/** @type {any} */ it) => miniRow(it)),
          count: running.length + pr_wait.length
        })}
        ${paneTemplate({
          id: 'worker-pane-queue',
          lane: 'queue',
          title: '대기',
          items: waiting,
          count: waiting.length,
          collapsible: true,
          collapsed: collapse.isCollapsed('queue'),
          preview: stripPreview(waiting),
          body: waitBodyTemplate(m)
        })}
        ${candidate_pane} ${done_pane}
      </div>`;
    }
    return html`<div class="worker-lanes">
      ${candidate_pane}
      ${paneTemplate({
        id: 'worker-pane-queue',
        lane: 'queue',
        title: '대기',
        items: waiting,
        count: waiting.length,
        collapsible: true,
        collapsed: collapse.isCollapsed('queue'),
        body: waitBodyTemplate(m)
      })}
      ${paneTemplate({
        id: 'worker-pane-running',
        lane: 'running',
        title: '실행 중',
        items: /** @type {any[]} */ (running),
        // 슬롯 수는 제목이 아니라 탭 부가정보다 (§4.5) — 제목 어휘는 두 탭이
        // 같고, 탭이 다른 것은 `header_control`이 싣는다.
        header_control: html`<span class="worker-pane__meta"
          >슬롯 ${group.slots}</span
        >`,
        live: runningLive(m),
        collapsible: true,
        collapsed: collapse.isCollapsed('running'),
        body: runningBody(m)
      })}
      ${paneTemplate({
        id: 'worker-pane-pr-wait',
        lane: 'pr_wait',
        title: 'PR 대기',
        items: pr_wait,
        empty: 'PR 대기 없음',
        collapsible: true,
        collapsed: collapse.isCollapsed('pr_wait')
      })}
      ${done_pane}
    </div>`;
  }

  /**
   * Adopt a new collapse state for one lane: the store persists first, then the
   * view re-renders, so a reload shows exactly what the last click produced.
   *
   * @param {import('./lane-collapse.js').LaneId} lane
   */
  function toggleLaneCollapse(lane) {
    collapse.toggle(lane);
    doRender();
  }

  /**
   * Same for one 대기 본문 영역 (병렬·직렬).
   *
   * @param {import('./lane-collapse.js').AreaId} area
   */
  function toggleWaitArea(area) {
    collapse.toggleArea(area);
    doRender();
  }

  function doRender() {
    const m = laneModel();
    refreshOverlapFacts(m);
    render(topTemplate(m), top_el);
    render(lanesTemplate(m), lanes_el);
  }

  /**
   * Track the mobile breakpoint (UI-58y2, shared watcher UI-5ksp §4.7).
   * Registered as an unsubscriber like every other live source so a destroyed
   * view stops re-rendering. The watcher calls back synchronously on
   * registration, and that first call must NOT re-render — the console has not
   * been composed yet.
   */
  function watchViewport() {
    let first = true;
    const stop = watchMobile((next) => {
      is_mobile = next;
      if (first) {
        first = false;
        return;
      }
      doRender();
    });
    unsubscribers.push(stop);
  }

  /**
   * Adopt a new candidate filter: persist first, then re-render, so a reload
   * shows exactly what the last click produced.
   *
   * @param {CandidateFilter} next
   */
  function setCandidateFilter(next) {
    candidate_filter = next;
    saveCandidateFilter(next);
    doRender();
  }

  /**
   * Adopt a header-select choice (UI-raqh §2, UI-d13v §4.4): persist first, then
   * re-render, so a reload shows exactly what the last selection produced.
   *
   * `custom` is the one value that changes NOTHING about the order — it only
   * unfolds the chain row on whatever chain is running, which is what makes
   * "사용자 지정…" a way into editing rather than a fifth ordering.
   *
   * @param {string} next
   */
  function setCandidateSort(next) {
    if (next === 'custom') {
      sort_chain_open = true;
      doRender();
      return;
    }
    candidate_sort = normalizeCandidateSort(next);
    saveCandidateSort(candidate_sort);
    sort_chain_open = false;
    doRender();
  }

  /**
   * Adopt an edited chain (§4.4). Changes apply and persist immediately — the
   * row has no commit button, so the lane IS the preview. The row stays open:
   * only a preset pick folds it.
   *
   * @param {import('../../data/sort.js').SortStep[]} chain
   */
  function setCandidateSortChain(chain) {
    candidate_sort = normalizeCandidateSort({ chain });
    saveCandidateSort(candidate_sort);
    doRender();
  }

  /**
   * Adopt a new 완료 lane period (UI-d7pw §3.2). Persist the choice and notify
   * bootstrap so the session-completion subscription follows the same range.
   *
   * @param {string} next
   */
  function setDoneRange(next) {
    done_range = normalizeDoneRange(next);
    saveDoneRange(done_range);
    onDoneRangeChange?.(done_range);
    doRender();
  }

  /**
   * Commit a slot-count edit (worker-phase2 §3). Fired on `change` so a partial
   * keystroke does not spam mutations; the value is clamped to the lower bound
   * before it is sent and the input is re-rendered from the authoritative
   * snapshot.
   *
   * @param {Event} ev
   */
  function onChange(ev) {
    const lane_count_select = /** @type {HTMLSelectElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.(
        '.worker-serial-lane-count'
      )
    );
    if (lane_count_select) {
      const parsed = Number.parseInt(lane_count_select.value, 10);
      if (Number.isFinite(parsed)) {
        void setSerialLaneCount(parsed).then(doRender);
      }
      return;
    }
    const blocked_tgl = /** @type {HTMLInputElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.(
        '.worker-filter__blocked'
      )
    );
    if (blocked_tgl) {
      setCandidateFilter({
        ...candidate_filter,
        show_blocked: blocked_tgl.checked
      });
      return;
    }
    // 체인 편집 줄의 select가 먼저다 — 헤더 select와 같은 pane 안에 있으므로
    // 순서를 뒤집으면 한 step 변경이 프리셋 전환으로 잘못 읽힌다.
    const chain_select = /** @type {HTMLSelectElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.(
        '.worker-sort-chain__key'
      )
    );
    if (chain_select) {
      const step_index = Number.parseInt(
        chain_select.getAttribute('data-step') || '',
        10
      );
      if (Number.isFinite(step_index)) {
        setCandidateSortChain(
          setChainStepKey(
            chainOf(candidate_sort),
            step_index,
            chain_select.value
          )
        );
      }
      return;
    }
    // 완료 기간 select가 먼저다 — `.worker-done-range`는 `.worker-sort` 톤을
    // 공유하므로 순서를 뒤집으면 후보 정렬로 잘못 해석된다.
    const range_select = /** @type {HTMLSelectElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-done-range')
    );
    if (range_select) {
      setDoneRange(range_select.value);
      return;
    }
    const sort_select = /** @type {HTMLSelectElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-sort')
    );
    if (sort_select) {
      setCandidateSort(sort_select.value);
      return;
    }
    const input = /** @type {HTMLInputElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-slots__input')
    );
    if (!input) {
      return;
    }
    const parsed = Number.parseInt(input.value, 10);
    if (!Number.isFinite(parsed)) {
      doRender();
      return;
    }
    void setSlots(parsed).then(doRender);
  }

  /**
   * Project an attempt record into the drawer meta shape (spec §2/§5.6).
   *
   * @param {any} a
   * @returns {import('./transcript-drawer.js').DrawerMeta}
   */
  function metaForAttempt(a) {
    return a
      ? {
          runner: a.runner || undefined,
          model: a.model || undefined,
          effort: a.effort || undefined,
          worktree: a.worktree || undefined,
          status: a.status || undefined,
          session_id: a.session_id || undefined
        }
      : {};
  }

  /**
   * The projections the timeline derives from (§4.2). All of them already ride
   * the queue snapshot — opening the drawer queries nothing. `repo_ops` is the
   * declaration itself: a lane's `timeout_ms` is a property of the declaration,
   * never of an operation card, so the 타임아웃 line can only name a number if
   * the drawer receives it (UI-s582 §2).
   *
   * @returns {{ operations: any, cleanup_failures: any, repo: string, repo_ops: any }}
   */
  function repoOpsDrawerInput() {
    const group = groupOf(laneModel());
    const info = currentQueue().workspace_info;
    const repo_ops =
      info &&
      typeof info === 'object' &&
      info.repo_ops &&
      typeof info.repo_ops === 'object'
        ? info.repo_ops
        : null;
    return {
      operations: group.repo_operations,
      cleanup_failures: group.cleanup_failures,
      repo: (getWorkspacePath && getWorkspacePath()) || '',
      repo_ops
    };
  }

  /**
   * Open the 저장소 작업 타임라인 (§4.2). The transcript drawer closes first:
   * the two share one overlay, and only one of them is ever the subject.
   */
  function openRepoOpsDrawer() {
    if (selected_attempt) {
      drawer.close();
    }
    repo_ops_drawer_el.hidden = false;
    drawer_overlay_el.hidden = false;
    repo_ops_drawer.open(repoOpsDrawerInput());
    doRender();
  }

  /**
   * Open (or switch) the transcript drawer for a running attempt (spec §5.6).
   *
   * @param {string} attempt_id
   */
  function openDrawerForAttempt(attempt_id) {
    const q = currentQueue();
    const a = q.attempts ? q.attempts[attempt_id] : null;
    selected_attempt = attempt_id;
    repo_ops_drawer.close();
    repo_ops_drawer_el.hidden = true;
    drawer_overlay_el.hidden = false;
    drawer.open({ attempt_id, meta: metaForAttempt(a) });
    doRender();
  }

  /**
   * Open the shared transcript drawer for a session-held bead (UI-4xzk §6.4).
   * The tile carries no attempt, so `selected_attempt` is left alone — there
   * is nothing to highlight — and the drawer key is the session ref's own.
   *
   * @param {string} bead_id
   */
  function openDrawerForSessionRef(bead_id) {
    const q = currentQueue();
    const entry = (
      Array.isArray(q.session_active) ? q.session_active : []
    ).find((/** @type {any} */ row) => row && row.bead_id === bead_id);
    const current = (
      entry && Array.isArray(entry.session_refs) ? entry.session_refs : []
    ).find((/** @type {any} */ view) => view && view.current === true);
    if (!current) {
      return;
    }
    repo_ops_drawer.close();
    repo_ops_drawer_el.hidden = true;
    drawer_overlay_el.hidden = false;
    drawer.open(sessionRefDrawerInput(current, bead_id, 'in_progress'));
    doRender();
  }

  /**
   * Late-arrival meta refresh (spec §2): the session id lands on the stream's
   * first event AFTER the drawer may already be open, and drawer meta is copied
   * once at open() — so on every queue snapshot push, re-feed the open attempt's
   * latest record into the drawer.
   */
  function refreshOpenDrawerMeta() {
    // The timeline is a pure derivation, so a fresh snapshot simply re-derives
    // it — a dismissed row or a finished deploy must not need a reopen to show.
    // Guarded on the open state: the derivation is the whole lane model, and a
    // closed drawer must not pay for it on every push.
    if (repo_ops_drawer.isOpen()) {
      repo_ops_drawer.refresh(repoOpsDrawerInput());
    }
    if (!selected_attempt) {
      return;
    }
    const q = currentQueue();
    const a = q.attempts ? q.attempts[selected_attempt] : null;
    if (a) {
      drawer.updateMeta(metaForAttempt(a));
      return;
    }
    // Attempt records are never pruned within a workspace, so a vanished
    // attempt means the store was cleared (workspace switch): close the modal
    // or its backdrop would keep blocking the new workspace's UI.
    drawer.close();
  }

  /**
   * Open a blocked 칩's blocker (UI-u6zf §5.3).
   *
   * 타 레포 blocker는 workspace를 먼저 바꾼다. 상세 오버레이의 데이터는 연결의
   * 현재 workspace를 기준으로 서버가 해석하므로 (§2.1), 전환 없이 열면 실행
   * 설정·세션 목록 같은 workspace 종속 카드가 남의 이슈 옆에 그려진다. 모니터의
   * `openRow()`와 같은 순서다.
   *
   * @param {string} dep_id
   * @param {string} root_dir - blocker를 소유한 workspace. 같은 레포면 빈 값.
   */
  function openBlocker(dep_id, root_dir) {
    if (dep_id.length === 0 || !gotoIssue) {
      return;
    }
    const current = getWorkspacePath ? getWorkspacePath() : undefined;
    if (
      root_dir.length === 0 ||
      !current ||
      root_dir === current ||
      !switchWorkspace
    ) {
      gotoIssue(dep_id);
      return;
    }
    void Promise.resolve(switchWorkspace(root_dir))
      .then(() => {
        gotoIssue(dep_id);
      })
      .catch(() => {
        showToast('레포 전환에 실패했습니다', 'error', 2400);
      });
  }

  /**
   * @param {MouseEvent} ev
   */
  function onClick(ev) {
    const target = /** @type {HTMLElement} */ (ev.target);
    if (target?.closest?.('.worker-mini__serial, .worker-mini__grip')) {
      return;
    }
    // 정렬 체인 방향 토글 (UI-d13v §4.4): pane 헤더 아래 줄의 버튼이므로 카드
    // 클릭과 겹치지 않지만, 먼저 잡아 두면 레인 접힘 토글과의 순서를 고민할
    // 필요가 없다.
    const dir_btn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-sort-chain__dir')
    );
    if (dir_btn) {
      const step_index = Number.parseInt(
        dir_btn.getAttribute('data-step') || '',
        10
      );
      if (Number.isFinite(step_index)) {
        setCandidateSortChain(
          flipChainStepDir(chainOf(candidate_sort), step_index)
        );
      }
      return;
    }
    // blocked 칩 (UI-u6zf §5.3): 카드 클릭(자기 이슈 열기)보다 먼저 잡고 거기서
    // 멈춘다 — 출처 칩(`.ctl-chip--from`)이 같은 자리에서 하는 것과 같다.
    const dep_chip = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-dep__open')
    );
    if (dep_chip) {
      openBlocker(
        dep_chip.getAttribute('data-dep-id') || '',
        dep_chip.getAttribute('data-root-dir') || ''
      );
      return;
    }
    // 겹침 칩·팝오버 (UI-jbao): 카드 클릭(상세 열기)보다 먼저 잡는다.
    const overlapChip = /** @type {HTMLElement|null} */ (
      target?.closest?.('.mon-overlap__chip')
    );
    if (overlapChip) {
      const chip_card = /** @type {HTMLElement|null} */ (
        overlapChip.closest('[data-bead-id]')
      );
      const chip_bead_id = chip_card
        ? chip_card.getAttribute('data-bead-id') || ''
        : '';
      if (chip_bead_id) {
        const counterpart_id =
          overlapChip.getAttribute('data-overlap-id') || '';
        const same =
          !!open_overlap &&
          open_overlap.bead_id === chip_bead_id &&
          open_overlap.counterpart_id === counterpart_id;
        open_overlap = same ? null : { bead_id: chip_bead_id, counterpart_id };
        doRender();
      }
      return;
    }
    const overlapPlace = /** @type {HTMLElement|null} */ (
      target?.closest?.('.mon-overlap__place')
    );
    if (overlapPlace) {
      const place_card = /** @type {HTMLElement|null} */ (
        overlapPlace.closest('[data-bead-id]')
      );
      const place_bead_id = place_card
        ? place_card.getAttribute('data-bead-id') || ''
        : '';
      if (place_bead_id) {
        void placeIntoSameSerialLane(
          place_bead_id,
          overlapPlace.getAttribute('data-counterpart-id') || ''
        );
      }
      return;
    }
    // 팝오버 내부의 나머지 클릭은 카드 클릭(상세 열기)으로 흐르지 않는다.
    if (target?.closest?.('.mon-overlap__popover')) {
      return;
    }
    if (target?.closest?.('.worker-repo-strip')) {
      openRepoOpsDrawer();
      return;
    }
    const repoOpDismiss = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-repo-op__dismiss')
    );
    if (repoOpDismiss) {
      void dismissRepoOperation(repoOpDismiss.dataset.operationId || '');
      return;
    }
    // 타임라인의 정리 재개는 PR 대기 카드의 [정리 재개]와 같은 mutation이다 —
    // 서버가 멈춘 단계부터 재개하는 기존 semantics 그대로다 (§4.4).
    const cleanupResume = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-cleanup__resume')
    );
    if (cleanupResume) {
      const bead_id = cleanupResume.dataset.beadId;
      if (bead_id) {
        void retryCleanup(bead_id);
      }
      return;
    }
    // 보류/정지 배너의 두 출구 (UI-5ym8 §8). 툴바의 ▶와 같은 줄에 서지 않고
    // 같은 mutation도 아니므로 각자 라우팅한다.
    if (target?.closest?.('.worker-hold__retry')) {
      void sendHoldAction('worker-queue-hold-retry-now', '지금 재시도 거부');
      return;
    }
    if (target?.closest?.('.worker-hold__resume')) {
      void sendHoldAction('worker-queue-hold-resume', '재개 거부');
      return;
    }
    if (target?.closest?.('.worker-play')) {
      void setAutomation(!currentQueue().auto_advance);
      return;
    }
    // The toolbar's bulk merge control (UI-5v7d §4). Keep it ahead of generic
    // row/pane click handling so the action never opens a detail view.
    const mergeAllBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-merge-all')
    );
    if (mergeAllBtn) {
      if (mergeAllBtn.classList.contains('worker-merge-all--stop')) {
        // 자동 모드에서의 중단은 토글까지 끈다 (UI-yk55 §5.2): 켜진 채 큐만
        // 비우면 다음 관측에서 즉시 다시 차 "중단"이 중단이 아니게 된다.
        if (currentQueue().auto_merge === true) {
          void setAutoMerge(false);
        } else {
          void cancelMergeAll();
        }
      } else {
        void setAutoMerge(true);
      }
      return;
    }
    // 레인 접기 (UI-58y2 §모바일 3/5, 다섯 레인 확장은 UI-5ksp §4.4). 토글은
    // 헤더 안의 버튼 하나이므로 형제 `header_control` 조작은 여기 오지 않는다.
    const lane_toggle = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-pane__toggle[data-lane]')
    );
    if (lane_toggle) {
      const lane = lane_toggle.dataset.lane;
      if (
        lane === 'candidate' ||
        lane === 'queue' ||
        lane === 'running' ||
        lane === 'pr_wait' ||
        lane === 'done'
      ) {
        toggleLaneCollapse(lane);
      }
      return;
    }
    // 대기 본문의 병렬·직렬 영역 접기 (UI-5ksp §4.2).
    const area_toggle = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-wait__area-toggle[data-area]')
    );
    if (area_toggle) {
      const area = area_toggle.dataset.area;
      if (area === 'parallel' || area === 'serial') {
        toggleWaitArea(area);
      }
      return;
    }
    const place_lane = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-card__place-lane')
    );
    if (place_lane) {
      const id = place_lane.dataset.beadId;
      const lane = place_lane.dataset.lane;
      if (id && (lane === 'parallel' || /^s[1-5]$/.test(lane || ''))) {
        place_menu_bead_id = null;
        doRender();
        void placeAtLaneTail(
          id,
          /** @type {'parallel'|'s1'|'s2'|'s3'|'s4'|'s5'} */ (lane)
        );
      }
      return;
    }
    const place_cancel = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-card__place-cancel')
    );
    if (place_cancel) {
      place_menu_bead_id = null;
      doRender();
      return;
    }
    // [대기로 ↴] opens lane choices when serial lanes exist. With only the
    // parallel lane, one tap keeps the existing append behavior.
    const place_btn = /** @type {HTMLButtonElement|null} */ (
      target?.closest?.('.worker-card__place')
    );
    if (place_btn) {
      const id = place_btn.dataset.beadId;
      // 자격 없는 후보의 클릭은 여기서 끝난다 — 브라우저가 disabled 버튼의
      // 클릭을 막아 주더라도, 적재 경로가 자격을 스스로 확인해야 드래그와
      // 같은 규율이 된다.
      if (id && !place_btn.disabled) {
        if (placeMenuLanes()) {
          place_menu_bead_id = id;
          doRender();
        } else {
          void placeAtLaneTail(id, 'parallel');
        }
      }
      return;
    }
    // Candidate filter chips live inside the pane; handle them before any row
    // handler so a click never falls through to the card default.
    const spec_chip = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-filter__chip')
    );
    if (spec_chip) {
      const value = spec_chip.dataset.spec;
      if (value === 'all' || value === 'with' || value === 'without') {
        setCandidateFilter({ ...candidate_filter, spec: value });
      }
      return;
    }
    // 대기 행의 `✕` (UI-d13v §6)도 행 기본 동작보다 먼저다 — 누른 것은 행이
    // 아니라 그 행을 빼는 버튼이다.
    const queueRemoveBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('[data-action="queue-remove"]')
    );
    if (queueRemoveBtn) {
      const bead_id = queueRemoveBtn.dataset.beadId || '';
      if (bead_id) {
        void lane_drag.sendOp(
          {
            type: 'worker-queue-remove',
            payload: { bead_id },
            root_dir: rootDir()
          },
          bead_id
        );
      }
      return;
    }
    // PR-wait actions act on the bead and must never also open the detail panel
    // (the `.worker-mini` default below would otherwise swallow them).
    const mergeBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__merge')
    );
    if (mergeBtn) {
      const bead_id = mergeBtn.dataset.beadId || '';
      if (currentQueue().cleanup_failed?.[bead_id]) {
        void retryCleanup(bead_id);
      } else {
        void queueMerge(bead_id);
      }
      return;
    }
    const mergeCancelBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__merge-cancel')
    );
    if (mergeCancelBtn) {
      void cancelMerge(mergeCancelBtn.dataset.beadId || '');
      return;
    }
    const discardBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__discard')
    );
    if (discardBtn) {
      void discardBead(
        discardBtn.dataset.beadId || '',
        discardBtn.dataset.attemptId || null,
        discardBtn.dataset.discardMode === 'merged' ? 'merged' : 'unmerged',
        discardBtn.dataset.operationId || null
      );
      return;
    }
    const staleContinueBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__stale-continue')
    );
    if (staleContinueBtn) {
      void staleWorkAction(
        'worker-stale-work-continue',
        staleContinueBtn.dataset.beadId || '',
        staleContinueBtn.dataset.actionId || ''
      );
      return;
    }
    const staleBackupBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__stale-backup')
    );
    if (staleBackupBtn) {
      void staleWorkAction(
        'worker-stale-work-backup-fresh',
        staleBackupBtn.dataset.beadId || '',
        staleBackupBtn.dataset.actionId || ''
      );
      return;
    }
    const staleRecheckBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__stale-recheck')
    );
    if (staleRecheckBtn) {
      void staleWorkAction(
        'worker-stale-work-recheck',
        staleRecheckBtn.dataset.beadId || '',
        staleRecheckBtn.dataset.actionId || ''
      );
      return;
    }
    // REVISE 파킹 처분도 같은 이유로 행 기본 동작보다 먼저 처리한다.
    const reviseFixBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__revise-fix')
    );
    if (reviseFixBtn) {
      void reviseDisposition(
        'worker-revise-fix',
        reviseFixBtn.dataset.beadId || ''
      );
      return;
    }
    const reviseApproveBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__revise-approve')
    );
    if (reviseApproveBtn) {
      void reviseDisposition(
        'worker-revise-approve',
        reviseApproveBtn.dataset.beadId || ''
      );
      return;
    }
    // The PR link is a link — let the browser open it, never treat it as a row
    // click.
    if (target?.closest?.('.worker-mini__pr')) {
      return;
    }
    const failure_badge = /** @type {HTMLElement|null} */ (
      target?.closest?.('.rtile__failure-badge')
    );
    if (failure_badge) {
      const attempt_id = failure_badge.dataset.attemptId || '';
      open_failure_detail =
        open_failure_detail === attempt_id ? null : attempt_id;
      doRender();
      return;
    }
    const attempt_copy = /** @type {HTMLElement|null} */ (
      target?.closest?.('.rtile__attempt-copy')
    );
    if (attempt_copy) {
      const attempt_id = attempt_copy.dataset.attemptId || '';
      if (attempt_id) {
        void copyToClipboard(attempt_id).then((ok) => {
          showToast(
            ok ? '복사됨' : '복사 실패',
            ok ? 'success' : 'error',
            1400
          );
        });
      }
      return;
    }
    // 파킹 타일의 [재시도] (UI-5ym8 §3.1). `.rtile__resume`(이어하기)보다 앞에
    // 두지 않아도 클래스가 다르므로 섞이지 않지만, 폐기와 같은 액션 foot에
    // 있으므로 그 둘을 붙여 읽는다.
    if (target?.closest?.('.rtile__parked-retry')) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      void retryParked(
        tile?.dataset?.beadId || '',
        tile?.dataset?.attemptId || ''
      );
      return;
    }
    // Tile controls act on the attempt and must never also open the drawer.
    const tile_discard = /** @type {HTMLElement|null} */ (
      target?.closest?.('.rtile__discard')
    );
    if (tile_discard) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const bead_id = tile?.dataset?.beadId;
      const att = tile?.dataset?.attemptId;
      if (bead_id) {
        void discardBead(
          bead_id,
          att || null,
          tile_discard.dataset.confirmation === 'merged'
            ? 'merged'
            : 'unmerged',
          tile_discard.dataset.operationId || null
        );
      }
      return;
    }
    if (target?.closest?.('.rtile__pause')) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const att = tile?.dataset?.attemptId;
      if (att) {
        void pauseAttempt(att);
      }
      return;
    }
    if (target?.closest?.('.rtile__resume')) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const att = tile?.dataset?.attemptId;
      if (att) {
        void resumeAttempt(att);
      }
      return;
    }
    // [▤ 세션] opens the live transcript; it must never also fall through to
    // the tile's detail default, so it is handled BEFORE it (UI-k59y §3).
    if (target?.closest?.('.rtile__session')) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const att = tile?.dataset?.attemptId;
      if (att) {
        openDrawerForAttempt(att);
        return;
      }
      // 세션 타일 (UI-4xzk §6.4): attempt가 없으므로 `session:<provider>:<sid>`
      // 키로 그 세션의 transcript를 연다 — 모니터 탭과 같은 분기다.
      const session_bead = tile?.dataset?.beadId;
      if (session_bead) {
        openDrawerForSessionRef(session_bead);
      }
      return;
    }
    // 팝오버 본문 클릭은 타일 기본 동작(드로어 열기)으로 떨어지지 않는다. 안의
    // 조작(`▤ 세션`·attempt id 복사)은 이미 위에서 라우팅됐으므로 여기 오는 것은
    // 읽기만 하는 영역이다.
    if (target?.closest?.('.rtile__failure-pop')) {
      return;
    }
    // Backdrop click closes the drawer modal (the ✕ inside the bar is the
    // drawer's own handler).
    if (target?.closest?.('.worker-drawer-overlay__backdrop')) {
      repo_ops_drawer.close();
      drawer.close();
      return;
    }
    // Clicks inside the drawer are owned by the drawer's own handlers.
    if (target?.closest?.('.worker-drawer-host')) {
      return;
    }
    // rollup 토글·child 행은 타일의 기본 클릭(이슈 상세)보다 앞선다 (§3.4):
    // 뒤에 두면 어느 쪽을 눌러도 부모 이슈가 열려 버린다. Board와 달리 여기서는
    // 템플릿에 핸들러를 주지 않고 DOM에 실린 id로 위임 처리한다.
    const rollup_toggle = /** @type {HTMLElement|null} */ (
      target?.closest?.('.rtile .board-card__roll-toggle')
    );
    if (rollup_toggle) {
      const parent_id = rollup_toggle.dataset.rollParent;
      if (parent_id) {
        if (rollup_expanded_ids.has(parent_id)) {
          rollup_expanded_ids.delete(parent_id);
        } else {
          rollup_expanded_ids.add(parent_id);
        }
        doRender();
      }
      return;
    }
    const rollup_child = /** @type {HTMLElement|null} */ (
      target?.closest?.('.rtile .board-card__roll-child')
    );
    if (rollup_child) {
      const child_id = rollup_child.dataset.childId;
      if (child_id && gotoIssue) {
        gotoIssue(child_id);
      }
      return;
    }
    // 타일 기본 클릭 = 이슈 상세 (UI-k59y §3): 다른 모든 레인 표면과 같은 규칙.
    const rtile = /** @type {HTMLElement|null} */ (target?.closest?.('.rtile'));
    if (rtile) {
      // The ID element copies the bead id (Board onCopyId convention) and must
      // never also open the detail panel.
      if (target?.closest?.('.rtile__id')) {
        const id = rtile.dataset.beadId;
        if (id) {
          void copyToClipboard(id).then((ok) => {
            if (ok) {
              showToast('복사됨', 'success', 1200);
            } else {
              showToast('복사 실패', 'error', 1600);
            }
          });
        }
        return;
      }
      const id = rtile.dataset.beadId;
      if (id && gotoIssue) {
        gotoIssue(id);
      }
      return;
    }
    const mini = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini, .worker-card')
    );
    if (mini) {
      const id = mini.dataset.beadId;
      // 로그 경로 복사 버튼은 자기 클릭만 소비한다 (UI-8w4t §4). 타임라인에서는
      // 드로어가 클릭을 먼저 가로채므로 문제가 없었지만, 행 안에서는 그대로 두면
      // 복사 한 번에 이슈 상세까지 열린다. 복사 자체는 버튼의 자기 핸들러 몫이다.
      if (target?.closest?.('[data-seam="log-path-copy"]')) {
        return;
      }
      // The ID element copies the bead id (Board onCopyId convention) and must
      // never also open the detail panel.
      if (target?.closest?.('.worker-mini__id, .worker-card__id')) {
        if (id) {
          void copyToClipboard(id).then((ok) => {
            if (ok) {
              showToast('복사됨', 'success', 1200);
            } else {
              showToast('복사 실패', 'error', 1600);
            }
          });
        }
        return;
      }
      const from_chip = /** @type {HTMLElement|null} */ (
        target?.closest?.('.ctl-chip--from')
      );
      if (from_chip) {
        const from_id = from_chip.dataset.fromId;
        if (from_id && gotoIssue) {
          gotoIssue(from_id);
        }
        return;
      }
      if (id && gotoIssue) {
        gotoIssue(id);
      }
    }
  }

  lane_drag.attach(mount_element);
  mount_element.addEventListener('click', /** @type {any} */ (onClick));
  mount_element.addEventListener('change', /** @type {any} */ (onChange));

  /**
   * An outside click closes the 겹침 팝오버 (UI-qm12 §5.3). 칩과 팝오버 자신은
   * 예외다 — 여는 클릭이 그대로 닫는 클릭이 되면 아무것도 열리지 않는다.
   *
   * @param {Event} ev
   */
  function onDocumentClick(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    const closest =
      target && typeof target.closest === 'function'
        ? (/** @type {string} */ selector) => target.closest(selector)
        : () => null;
    let changed = false;
    if (open_overlap && !closest('.mon-overlap__popover, .mon-overlap__chip')) {
      open_overlap = null;
      changed = true;
    }
    if (
      open_failure_detail &&
      !closest('.rtile__failure-pop, .rtile__failure-badge')
    ) {
      open_failure_detail = null;
      changed = true;
    }
    if (changed) {
      doRender();
    }
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onDocumentKeyDown(ev) {
    if (
      ev.key !== 'Escape' ||
      (!open_overlap && open_failure_detail === null)
    ) {
      return;
    }
    open_overlap = null;
    open_failure_detail = null;
    doRender();
  }

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', /** @type {any} */ (onDocumentKeyDown));
  unsubscribers.push(() => {
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener(
      'keydown',
      /** @type {any} */ (onDocumentKeyDown)
    );
  });

  watchViewport();

  if (selectors) {
    unsubscribers.push(
      selectors.subscribe(() => {
        adapter.notifyIssuesChanged();
        doRender();
      })
    );
  }
  if (queueStore) {
    unsubscribers.push(
      queueStore.subscribe(() => {
        const current_workspace = getWorkspacePath
          ? getWorkspacePath() || ''
          : '';
        if (current_workspace !== script_viewer_workspace) {
          script_viewer_workspace = current_workspace;
          repo_ops_script_viewer.close();
        }
        doRender();
        refreshOpenDrawerMeta();
      })
    );
  }
  doRender();

  return {
    load() {
      adapter.ensureSessionDefaults();
      doRender();
    },
    refreshSessionDefaults,
    destroy() {
      for (const off of unsubscribers.splice(0)) {
        try {
          off();
        } catch {
          /* ignore */
        }
      }
      lane_drag.detach();
      mount_element.removeEventListener('click', /** @type {any} */ (onClick));
      mount_element.removeEventListener(
        'change',
        /** @type {any} */ (onChange)
      );
      adapter.destroy();
      try {
        drawer.destroy();
      } catch {
        /* ignore */
      }
      drawer_overlay_el.hidden = true;
      try {
        repo_ops_script_viewer.destroy();
      } catch {
        /* ignore */
      }
      render(html``, mount_element);
    }
  };
}
