/**
 * Worker console — queue management + running-session view (spec §5.1–§5.3).
 *
 * Candidate lanes are live Board Ready/Blocked data read from the SAME
 * per-subscription issue stores as the Board tab (no separate candidate
 * storage). The single waiting queue + Done lanes are driven by the
 * `worker-queue` subscription (worker-phase2 §3 collapsed the serial/parallel
 * duality into ONE lane). Dragging a candidate into the queue issues a
 * `worker-queue-place` mutation carrying the current queue revision; on a CAS
 * conflict the reply's current snapshot is adopted and the drag retried once.
 *
 * The ▶/⏸ controls flip `auto_advance`, and the slot editor sets the
 * concurrency cap (`worker-queue-set-slots`, same CAS discipline; lower bound
 * 1 — which is exactly the retired serial lane). Running tiles + the failure
 * banner are derived from the queue snapshot's `attempts` (status='running' → tiles;
 * status='failed'/'orphaned' → failure banner), which the server-side scheduler
 * fills as sessions dispatch and terminate. The banner reads the LATEST failed
 * attempt directly — there is no breaker object behind it (worker-phase2 §2).
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
 * dragged OUT of, and dropping it would delete the only way to enqueue anything
 * (`worker-queue-place` has no other entry point). It stays dashed
 * (`worker-pane--src`) precisely so it does not read as one of the four.
 */
import { html, render } from 'lit-html';
import { resolveSpecId } from '../../../server/spec-id.js';
import { createUnhandledFailurePredicate } from '../../../server/worker/attempt-failure.js';
import {
  CLOSED_RANGE_OPTIONS,
  DEFAULT_CLOSED_RANGE,
  closedRangeSince,
  isClosedRange
} from '../../data/closed-range.js';
import { createListSelectors } from '../../data/list-selectors.js';
import {
  cmpCreatedDescThenPriority,
  cmpEffectiveRank
} from '../../data/sort.js';
import { buildChildrenIndex, rollupFor } from '../../utils/child-rollup.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { resolveContinuationMismatch } from '../../utils/continuation-dialog.js';
import {
  formatAttemptOrchestrationChip,
  formatOrchestrationChip,
  formatWorkerChip
} from '../../utils/exec-settings-chip.js';
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import { debug } from '../../utils/logging.js';
import { coerceTimestampMs } from '../../utils/relative-time.js';
import { parseReport } from '../../utils/report-marker.js';
import { requestResumeInstructions } from '../../utils/resume-instructions-dialog.js';
import { showToast } from '../../utils/toast.js';
import {
  SUM_FIELDS,
  formatUsageTotalWithCost,
  mergeUsageProjections,
  providerUsageBadges,
  sumAttemptUsage
} from '../../utils/token-usage.js';
import { isWorkerIneligible } from '../../utils/worker-eligibility.js';
import { isWorkerSerial } from '../../utils/worker-serial.js';
import { modelRunnerOf } from '../detail-panel/exec-settings.js';
import { createReorderController } from '../reorder.js';
import {
  discardCompletionMessage,
  discardConfirmationMessage,
  discardProjection,
  miniRow,
  paneTemplate,
  repoOpsStripTemplate,
  staleWorkProjection,
  sumAttemptWorkMs
} from './lanes.js';
import { cleanupStalledReason, cleanupStepLabel } from './merge-steps.js';
import {
  analysisRunDrawerMeta,
  createParallelAnalysisDialog
} from './parallel-analysis-dialog.js';
import { isPrWaitCleanupActive, prWaitProgress } from './pr-wait-progress.js';
import { createRepoOpsScriptViewer } from './repo-ops-script-viewer.js';
import { createRepoOpsSettings } from './repo-ops-settings.js';
import { createRepoOpsDrawer } from './repo-ops-timeline.js';
import { bannersTemplate, runningGridTemplate } from './running-grid.js';
import { createTranscriptDrawer } from './transcript-drawer.js';

export { mergeStepView } from './merge-steps.js';

const log = debug('views:worker');

const READY_KEY = 'tab:worker:ready';
const BLOCKED_KEY = 'tab:worker:blocked';
/**
 * The Worker tab's own in_progress subscription (UI-53es §2). It is one of the
 * five columns the running tile's child rollup counts from
 * (worker-card-exec-chips §3.3) — an in_progress child is where the tile's
 * 현재 단계 줄 comes from, and the rollup's N/M needs the finished ones too.
 */
const IN_PROGRESS_KEY = 'tab:worker:in-progress';
/**
 * Resolved children (worker-card-exec-chips §3.3). Subscribed for the rollup
 * alone: a resolved bead is never a candidate and never a queue row, but a
 * resolved CHILD is exactly what makes `children N/M` move.
 */
const RESOLVED_KEY = 'tab:worker:resolved';
const CLOSED_KEY = 'tab:worker:closed';

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
 * @param {any} issue
 * @returns {boolean} Whether the bead is queue-eligible (spec present, §5.4).
 */
function hasSpec(issue) {
  return resolveSpecId(issue).path.length > 0;
}

/**
 * The three workflow routes an execution resolution accepts
 * (worker-card-exec-chips §2.2). Anything else — an unknown string, a missing
 * key — resolves as no route, which is what makes `impl_dispatch` fall back to
 * its non-route default instead of guessing one.
 *
 * @type {ReadonlySet<string>}
 */
const WORKFLOW_ROUTES = new Set(['quick_fix', 'spec_backed', 'full_plan']);

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function isWorkflowRoute(value) {
  return typeof value === 'string' && WORKFLOW_ROUTES.has(value);
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
 * Apply the two candidate display filters (AND) and report, per control, how
 * many rows THAT control alone is hiding.
 *
 * The per-control count is "rows that would appear if only this control were
 * relaxed" — so a row refused by BOTH filters is counted by neither (relaxing
 * one keeps it hidden, and counting it twice would promise a reveal that does
 * not happen).
 *
 * @template {{ blocked: boolean, has_spec: boolean }} T
 * @param {T[]} rows
 * @param {CandidateFilter} filter
 * @returns {{ visible: T[], hidden_blocked: number, hidden_spec: number }}
 */
export function applyCandidateFilter(rows, filter) {
  /** @param {{ blocked: boolean }} row */
  const blockedPass = (row) => filter.show_blocked || !row.blocked;
  /** @param {{ has_spec: boolean }} row */
  const specPass = (row) =>
    filter.spec === 'all' ||
    (filter.spec === 'with' ? row.has_spec : !row.has_spec);

  /** @type {T[]} */
  const visible = [];
  let hidden_blocked = 0;
  let hidden_spec = 0;
  for (const row of rows) {
    const by_blocked = blockedPass(row);
    const by_spec = specPass(row);
    if (by_blocked && by_spec) {
      visible.push(row);
    } else if (!by_blocked && by_spec) {
      hidden_blocked += 1;
    } else if (by_blocked && !by_spec) {
      hidden_spec += 1;
    }
  }
  return { visible, hidden_blocked, hidden_spec };
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
 * Candidate pane sort mode (UI-raqh §2), persisted under this localStorage key.
 * A purely CLIENT-side preference: the server sends one candidate feed and the
 * lane decides how to read it.
 *
 * @type {string}
 */
const CANDIDATE_SORT_KEY = 'bdui.worker.candidate_sort';

/**
 * @typedef {'spec'|'board'|'created'} CandidateSort
 */

/**
 * Sort options, in render order. `spec` leads because the pane's job is "what
 * can I dispatch" and only a spec-carrying bead is queue-eligible (§5.4).
 *
 * @type {Array<{ value: CandidateSort, label: string }>}
 */
const CANDIDATE_SORT_OPTIONS = [
  { value: 'spec', label: 'spec 우선' },
  { value: 'board', label: 'Board 순서' },
  { value: 'created', label: '최신 생성순' }
];

/**
 * @type {CandidateSort}
 */
const CANDIDATE_SORT_DEFAULT = 'spec';

/**
 * Read the persisted sort mode; anything unreadable or unknown falls back to
 * the default rather than throwing (same defence as the display filter).
 *
 * @returns {CandidateSort}
 */
function loadCandidateSort() {
  try {
    const raw = window.localStorage.getItem(CANDIDATE_SORT_KEY);
    return raw === 'board' || raw === 'created' || raw === 'spec'
      ? raw
      : CANDIDATE_SORT_DEFAULT;
  } catch {
    return CANDIDATE_SORT_DEFAULT;
  }
}

/**
 * @param {CandidateSort} mode
 */
function saveCandidateSort(mode) {
  try {
    window.localStorage.setItem(CANDIDATE_SORT_KEY, mode);
  } catch {
    /* ignore — a private-mode storage denial must not break the select */
  }
}

/**
 * Persisted period range for the 완료 lane (UI-d7pw §3.2). The Board's Closed
 * column vocabulary is REUSED rather than copied — the two tabs must not drift
 * into having a `최근 7일` that means different things.
 *
 * @type {string}
 */
const DONE_RANGE_KEY = 'bdui.worker.done-range';

/**
 * @returns {import('../../data/closed-range.js').ClosedRange}
 */
function loadDoneRange() {
  try {
    const raw = window.localStorage.getItem(DONE_RANGE_KEY);
    return isClosedRange(raw) ? raw : DEFAULT_CLOSED_RANGE;
  } catch {
    return DEFAULT_CLOSED_RANGE;
  }
}

/**
 * @param {import('../../data/closed-range.js').ClosedRange} range
 */
function saveDoneRange(range) {
  try {
    window.localStorage.setItem(DONE_RANGE_KEY, range);
  } catch {
    /* ignore — a private-mode storage denial must not break the select */
  }
}

/**
 * The viewport below which the Worker tab switches to the control-first mobile
 * composition (UI-58y2). It matches the `@media (max-width: 640px)` block in
 * `styles.css`: the layout is JS-composed (the "지금" panel is a RECOMBINATION of
 * lanes, not a restyle of them), so the same boundary has to exist in both.
 *
 * @type {string}
 */
const MOBILE_QUERY = '(max-width: 640px)';

/**
 * Which mobile lanes are collapsed to a one-line strip, persisted under this
 * localStorage key (`beads-ui.worker.*`, the tab's existing key pattern).
 *
 * @type {string}
 */
const LANE_COLLAPSE_KEY = 'beads-ui.worker.lane-collapsed';

/**
 * @typedef {{ queue: boolean, done: boolean }} LaneCollapse
 */

/**
 * 대기·완료 both start collapsed: the whole point of the mobile layout is that
 * "지금" and 후보 own the screen, and these two are the lanes a phone reader
 * consults rather than works in.
 *
 * @type {LaneCollapse}
 */
const LANE_COLLAPSE_DEFAULT = { queue: true, done: true };

/**
 * Read the persisted collapse state. Anything unreadable falls back to the
 * default rather than throwing (same defence as the display filter).
 *
 * @returns {LaneCollapse}
 */
function loadLaneCollapse() {
  try {
    const raw = window.localStorage.getItem(LANE_COLLAPSE_KEY);
    if (!raw) {
      return { ...LANE_COLLAPSE_DEFAULT };
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { ...LANE_COLLAPSE_DEFAULT };
    }
    return {
      queue:
        typeof parsed.queue === 'boolean'
          ? parsed.queue
          : LANE_COLLAPSE_DEFAULT.queue,
      done:
        typeof parsed.done === 'boolean'
          ? parsed.done
          : LANE_COLLAPSE_DEFAULT.done
    };
  } catch {
    return { ...LANE_COLLAPSE_DEFAULT };
  }
}

/**
 * @param {LaneCollapse} state
 */
function saveLaneCollapse(state) {
  try {
    window.localStorage.setItem(LANE_COLLAPSE_KEY, JSON.stringify(state));
  } catch {
    /* ignore — a private-mode storage denial must not break the accordion */
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
 * Order the merged candidate list for one sort mode (UI-raqh §2).
 *
 * `board` is the Board's own manual order and stays the reference: the other
 * two are derived FROM it rather than replacing it. `spec` is a stable
 * partition of that order — spec-carrying beads first, each group keeping its
 * Board sequence — so switching to it never scrambles a hand-placed lane, it
 * only lifts the dispatchable beads to the top. `created` is the one mode that
 * ignores the rank map entirely, which is the point of having it.
 *
 * Returns a NEW array; the caller's list is left alone.
 *
 * @param {any[]} issues
 * @param {CandidateSort} mode
 * @param {Record<string, number>} order - Manual rank map.
 * @returns {any[]}
 */
export function applyCandidateSort(issues, mode, order) {
  const list = Array.isArray(issues) ? issues.slice() : [];
  if (mode === 'created') {
    return list.sort(cmpCreatedDescThenPriority);
  }
  list.sort(cmpEffectiveRank(order));
  if (mode === 'board') {
    return list;
  }
  // spec (default): stable partition over the rank order.
  return [...list.filter(hasSpec), ...list.filter((it) => !hasSpec(it))];
}

/**
 * A full_plan phase child (`UI-xxxx.N`) is a sub-unit of its parent plan's
 * execution, never a standalone worker candidate (spec §1). Judged by the
 * flattened `parent` edge (same field Board's `parentIdOf` reads) OR a dotted id
 * suffix, since `bd ready --json` may omit `parent`.
 *
 * @param {any} issue
 * @returns {boolean}
 */
function isPhaseChild(issue) {
  const raw = issue && issue.parent;
  const has_parent =
    typeof raw === 'string' ? raw.length > 0 : !!(raw && raw.id);
  return has_parent || /\.\d+$/.test((issue && issue.id) || '');
}

/**
 * Lock chip (🔒 + blocker ids) for a blocked candidate. The server-synthesized
 * `blocked_info.blockers` (list-adapters `attachBlockedInfo`) is the primary
 * source — it names exactly the unresolved `blocks` predecessors. When the
 * whole `blocked_info` object is absent (older server), fall back to the
 * embedded dependency edges, whose blocker id lives in `depends_on_id`
 * (`bd list` edge shape), keeping only `blocks`-type edges so related /
 * discovered-from links never render as a lock.
 *
 * @param {any} issue
 */
function blockedReason(issue) {
  const info = issue?.blocked_info;
  if (info && typeof info === 'object') {
    const blockers = Array.isArray(info.blockers)
      ? info.blockers.filter(
          (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
        )
      : [];
    return blockers.length > 0 ? `🔒 ${blockers.join(', ')}` : '🔒 blocked';
  }
  const deps = Array.isArray(issue?.dependencies) ? issue.dependencies : [];
  const ids = deps
    .map((/** @type {any} */ d) => {
      if (typeof d === 'string') {
        return d;
      }
      if (!d || typeof d !== 'object') {
        return '';
      }
      const kind = d.type ?? d.dependency_type;
      if (kind !== undefined && kind !== 'blocks') {
        return '';
      }
      return d.depends_on_id || d.id || '';
    })
    .filter(Boolean);
  return ids.length > 0 ? `🔒 ${ids.join(', ')}` : '🔒 blocked';
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
 * Korean text for a merge-queue skip reason (UI-5v7d §4). The driver's
 * vocabulary is machine-readable; an unknown value travels through verbatim
 * rather than being swallowed — a server that grew a reason must not blank the
 * badge.
 *
 * @param {string} reason
 * @returns {string}
 */
export function mergeFailureText(reason) {
  switch (reason) {
    case 'not_in_pr_wait':
      return 'PR 대기 상태 동기화 실패';
    case 'resolution_round_cap':
      return '충돌 해소 2회 초과';
    case 'resolution_timeout':
      return '충돌 해소 대기 시간 초과';
    case 'resolution_refused':
      return '해소 세션 디스패치 거부';
    // The external row's own refusal is `worktree_missing` now (UI-w0hi §2):
    // the dispatch itself is no longer external-specific, only the worktree it
    // needs to run in is, and that is the one thing this path cannot recreate.
    case 'worktree_missing':
      return '워크트리 없음 — 세션에서 해소 필요';
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
 * @param {{ repair_sessions_used?: number }|null} [completion]
 * @returns {string|null}
 */
export function mergeWaitingText(reason, completion = null) {
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
    case 'gating': {
      const repair_sessions_used = completion?.repair_sessions_used;
      return typeof repair_sessions_used === 'number' &&
        repair_sessions_used > 0
        ? '수정 결과 재확인 중'
        : '머지 조건 확인 중';
    }
    case 'repairing':
      return '자동 수정 중';
    case 'waiting_repair_pr':
      return '수정 PR 대기 중';
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
 * Turn the optional manual-continuation review journal into one badge
 * (UI-58w8 §7). `approved` shows nothing of its own — the ordinary merge gate
 * badge already reports that state — and a legacy entry without the optional
 * field stays invisible (fail-quiet, the workflow-contract consumer rule).
 * Only `reviewing`/`revising` are live: those are the states with an actual
 * running attempt behind them.
 *
 * @param {{ state?: string, failure_reason?: string|null }|null|undefined} head_review
 * @returns {{ badge: string, live: boolean, alert: boolean }|null}
 */
export function headReviewView(head_review) {
  if (!head_review || typeof head_review !== 'object') {
    return null;
  }
  switch (head_review.state) {
    case 'pending':
      return { badge: 'implementation review 대기', live: false, alert: false };
    case 'reviewing':
      return { badge: 'implementation review 중', live: true, alert: false };
    case 'revising':
      return { badge: 'review 수정 중 · 1회', live: true, alert: false };
    case 'failed': {
      const raw =
        typeof head_review.failure_reason === 'string'
          ? head_review.failure_reason
          : '';
      // eslint-disable-next-line no-control-regex
      const reason = raw.replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, 120);
      return {
        badge:
          reason.trim().length > 0
            ? `review 자동 진행 실패: ${reason.trim()}`
            : 'review 자동 진행 실패',
        live: false,
        alert: true
      };
    }
    default:
      return null;
  }
}

/**
 * The base-exception badge text for one attempt, or null when there is no
 * exception to report (UI-j6wa §3).
 *
 * Both unknowns are fail-quiet rather than alarming: a `declared_base` of null
 * means the server could not read the declaration, and a legacy attempt carries
 * no `target_base` at all. Comparing against either would badge on ignorance,
 * and this badge only ever means "this attempt targets something else".
 *
 * @param {string|null|undefined} declared_base
 * @param {string|null|undefined} target_base
 * @returns {string|null}
 */
function baseException(declared_base, target_base) {
  if (typeof declared_base !== 'string' || declared_base.length === 0) {
    return null;
  }
  if (typeof target_base !== 'string' || target_base.length === 0) {
    return null;
  }
  return target_base === declared_base ? null : `→ ${target_base}`;
}

/**
 * Turn the server's bounded completion projection into one root-card status.
 * Missing or unfamiliar optional projection stays invisible; malformed durable
 * intents are normalized server-side to the explicit `needs_human` phase.
 *
 * @param {import('../../data/worker-queue-store.js').CompletionStatus|null|undefined} completion
 * @returns {{ badge: string, title: string, alert: boolean, lock_actions: boolean, repair_pr_url: string, repair_pr_number: number|null }|null}
 */
function completionView(completion) {
  if (!completion || typeof completion !== 'object') {
    return null;
  }
  const used = Number.isInteger(completion.repair_sessions_used)
    ? Math.max(0, completion.repair_sessions_used)
    : 0;
  const cap = Number.isInteger(completion.repair_session_cap)
    ? Math.max(0, completion.repair_session_cap)
    : 0;
  const repair =
    completion.current_repair && typeof completion.current_repair === 'object'
      ? completion.current_repair
      : null;
  const repair_number =
    repair && typeof repair.pr_number === 'number' ? repair.pr_number : null;
  let badge = '';
  switch (completion.phase) {
    case 'gating':
      badge = used > 0 ? '수정 결과 재확인 중' : '머지 조건 확인 중';
      break;
    case 'repairing':
      badge = '자동 수정 중';
      break;
    case 'waiting_repair_pr':
      badge = repair_number
        ? `수정 PR #${repair_number} 대기 중`
        : '수정 PR 대기 중';
      break;
    case 'merging':
      badge =
        completion.subject_role === 'repair'
          ? repair_number
            ? `수정 PR #${repair_number} 머지 중`
            : '수정 PR 머지 중'
          : '머지 중';
      break;
    case 'cleaning':
      badge = '마무리 중';
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
  const details = [badge, `자동 수정 횟수 ${used}/${cap}`];
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
  if (completion.active_attempt_id) {
    details.push(`attempt ${completion.active_attempt_id}`);
  }
  if (repair && typeof repair.bead_id === 'string') {
    details.push(`repair ${repair.bead_id}`);
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
    lock_actions:
      completion.phase !== 'paused' && completion.phase !== 'needs_human',
    repair_pr_url:
      repair && typeof repair.pr_url === 'string' ? repair.pr_url : '',
    repair_pr_number: repair_number
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
  if (input.head_review && input.head_review.state !== 'failed') {
    return badge('리뷰 진행 중', {
      title: input.head_review.badge,
      live: input.head_review.live === true
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
    // (UI-vzyh §2). What is left is abnormal — no receipt at all, a receipt the
    // observed head does not descend from (rewritten history, branch reset), or
    // an ancestry probe the gate could not complete and fails closed on.
    return badge('최종 변경 리뷰 필요', {
      title:
        input.gate.reason === 'review_receipt_stale'
          ? '리뷰 영수증이 현재 head의 조상이 아니거나 조상 확인에 실패했습니다 — 히스토리 재작성·브랜치 리셋 복구 경로로, 관측된 최종 head 전체를 다시 리뷰합니다'
          : '리뷰 영수증이 없습니다 — 관측된 최종 head 전체를 리뷰해야 머지할 수 있습니다',
      alert: true
    });
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
  if (receiptWarningCodes(input.receipt_check).length > 0) {
    // The recorded completion-time observation (UI-bu6d §7). The gate's own
    // live re-check runs on the click, so this badge EXPLAINS a refusal rather
    // than causing one. Fail-quiet by convention: no record and no probe error
    // ever reaches here, so an unobserved attempt shows nothing at all.
    return badge('영수증 확인 필요', {
      title: `성립하지 않는 실행 영수증 — ${receiptWarningCodes(
        input.receipt_check
      ).join(', ')}`,
      alert: true
    });
  }
  if (input.head_review?.state === 'failed') {
    return badge('리뷰 실패', {
      title: input.head_review.failure_reason || '',
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
 * @param {{ activity: 'checking'|'verifying'|null, merge_progress: { step: string }|null }|null} [active]
 * What the server is doing to this bead right now (UI-raqh §3/§4).
 * @param {'running'|'paused'|null} [conflict_session] - State of this bead's own
 * conflict-resolution attempt, when one exists (UI-dxgz §1).
 * @param {boolean} [external] - Whether this row is an EXTERNAL PR — one a
 * normal session delivered, with no worker attempt behind it (UI-7agi §5).
 * Two affordances change: [폐기] disappears (the server's discard needs the
 * durable lane membership an external row does not have), and a MERGED row
 * becomes a [정리] button because nothing auto-cleans it. 충돌 해소 is NOT one
 * of them any more — the attempt-less dispatch (UI-w0hi §1) runs it.
 * @param {{ position: number, active: boolean, failure: string|null, waiting?: string|null, resolution?: import('../../data/worker-queue-store.js').ResolutionProjection|null, continuation_action?: any, head_review?: any, authority?: any }|null} [merge_queue]
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
  progress_input = {}
) {
  const queued = !!merge_queue && merge_queue.position > 0;
  const continuation_required =
    !!merge_queue?.continuation_action &&
    merge_queue.continuation_action.continuation === null;
  const queue_active = !!merge_queue && merge_queue.active === true;
  const queue_failure = (merge_queue && merge_queue.failure) || null;
  const queue_waiting = mergeWaitingText(
    merge_queue ? merge_queue.waiting : null,
    completion
  );
  const obs = observations[bead_id] || null;
  const gate = obs && obs.gate ? obs.gate : null;
  const pr = obs && obs.pr ? obs.pr : null;
  const recovery = completionView(completion);
  const resolution = resolutionView(
    merge_queue ? merge_queue.resolution : null
  );
  const head_review = headReviewView(
    merge_queue ? merge_queue.head_review : null
  );
  const journal = (merge_queue && merge_queue.head_review) || null;
  const authority = (merge_queue && merge_queue.authority) || null;
  // The continuation phases have a live or pending attempt behind them, and
  // cancelling one is exactly what discards the authority (UI-58w8 §1) — the
  // merge EFFECT is the only thing a click may not interrupt.
  const continuation_phase =
    !!journal && ['pending', 'reviewing', 'revising'].includes(journal.state);
  // A queued row the driver will NOT carry forward on its own: a terminal
  // review failure, a legacy entry with no authority, or an automatic
  // enrolment sitting under a global toggle that is off. For all three the
  // way forward is a fresh [머지] click, which the server re-validates from a
  // new authoritative observation before issuing a new manual authority.
  const needs_reclick =
    queued &&
    !queue_active &&
    (journal?.state === 'failed' ||
      !authority ||
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
  const cleanup_retry =
    !!cleanup_failed &&
    ['child_sweep', 'branch_cleanup', 'parent_close'].includes(
      cleanup_failed.step
    ) &&
    !!gate &&
    gate.tier === 'merged';
  const external_cleanup =
    external && !!cleanup_failed && !!gate && gate.tier === 'merged';
  // A failed journal restores the action surface, but it cannot turn an
  // otherwise terminal/unknown gate into a server continuation (UI-vkk8 §2).
  const reclick_continuable =
    needs_reclick &&
    (enabled ||
      conflicting ||
      gate?.reason === 'base_behind' ||
      gate?.reason === 'review_receipt_missing' ||
      gate?.reason === 'review_receipt_stale' ||
      cleanup_retry ||
      external_cleanup);
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
  const repo_operations_action_blocked =
    !cleanup_retry &&
    !!cleanup_failed &&
    cleanup_failed.step === 'repo_operations';
  const status_badge = prStatusBadge({
    continuation_required,
    merge_step,
    conflict_badge,
    conflict_live: resolution?.live === true || conflict_session === 'running',
    head_review:
      journal && head_review
        ? {
            ...head_review,
            state: journal.state,
            failure_reason: journal.failure_reason
          }
        : null,
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
    completion_repair_pr_url: recovery ? recovery.repair_pr_url : '',
    completion_repair_pr_number: recovery ? recovery.repair_pr_number : null,
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
        : repo_operations_action_blocked
          ? false
          : !queued || continuation_required || needs_reclick,
    // 머지 액션이 저장소 작업 단계에서 잠긴 카드 (§4.4): 잠금 사유를 문장으로
    // 반복하는 대신, 그 사유가 실제로 적혀 있는 타임라인으로 데려간다.
    timeline_action: repo_operations_action_blocked,
    cancel_action: queued && !continuation_required,
    // 리뷰/수정 continuation 중에도 [취소]는 열려 있어야 한다 (UI-58w8 §1):
    // 그 클릭이 authority를 폐기해 늦게 끝난 reviewer/repair 결과를 no-op으로
    // 만드는 유일한 수단이고, 잠겨야 하는 것은 되돌릴 수 없는 머지 효과뿐이다.
    cancel_enabled:
      (!queue_active || continuation_phase) &&
      !(recovery && recovery.lock_actions),
    cancel_title:
      recovery && recovery.lock_actions
        ? `${recovery.badge} — 중단하려면 상단 자동 머지 중단을 사용하세요`
        : queue_active && !continuation_phase
          ? '머지 진행 중 — 취소할 수 없습니다'
          : continuation_phase
            ? 'review 진행을 취소하고 머지 권한을 폐기합니다'
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
      !conflict_session &&
      !discard_blocks_merge &&
      !base_exception &&
      !(recovery && recovery.lock_actions) &&
      !external_conflict_unresolvable &&
      !repo_operations_action_blocked &&
      // A re-click recovery stays clickable on a CLOSED gate on purpose
      // (UI-58w8 §1): stale receipt and BEHIND are exactly the gates the new
      // authority's continuation exists to carry, and the server re-observes
      // the PR before it issues one.
      (enabled ||
        conflicting ||
        gate?.reason === 'base_behind' ||
        gate?.reason === 'review_receipt_missing' ||
        gate?.reason === 'review_receipt_stale' ||
        cleanup_retry ||
        external_cleanup ||
        reclick_continuable),
    // The label says what the click DOES: on a conflicting gate it dispatches a
    // resolution session, and a button reading 머지 there is the misread that
    // put this bead here (UI-dxgz §2).
    // 해소만 하고 멈추는 것처럼 읽히던 라벨을 실제 동작에 맞춘다 (UI-yk55 §1):
    // 이 클릭이 띄우는 세션은 완료 후 자동으로 재머지된다 — 툴팁이 이미 그렇게
    // 말하고 있었고, 라벨만 어긋나 있었다.
    merge_label: continuation_required
      ? '이어하기 선택'
      : cleanup_retry || external_cleanup
        ? '정리 재개'
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
        : merge_step
          ? `머지 진행 중 — ${merge_step.label}`
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
                        : gate?.reason === 'review_receipt_missing' ||
                            gate?.reason === 'review_receipt_stale'
                          ? '자동 리뷰 세션 후 승인되면 머지합니다'
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
 * @param {{ transport?: (type: string, payload?: unknown) => Promise<any>, issueStores?: any, queueStore?: any, analysisStore?: any, sessionLogStore?: any, uiOrderStore?: import('../reorder.js').UiOrderStore, gotoIssue?: (id: string) => void, getWorkspacePath?: () => (string|undefined), doneRange?: import('../../data/closed-range.js').ClosedRange, onDoneRangeChange?: (range: import('../../data/closed-range.js').ClosedRange) => void }} [options]
 * @returns {{ load: () => void, refreshSessionDefaults: () => void, destroy: () => void }}
 */
export function createWorkerView(mount_element, options = {}) {
  const {
    transport,
    issueStores,
    queueStore,
    analysisStore,
    sessionLogStore,
    uiOrderStore,
    gotoIssue,
    getWorkspacePath,
    doneRange,
    onDoneRangeChange
  } = options;
  // The shared ui-order store feeds list-selectors so an order-only push
  // re-renders the candidate lane, and drives the same effective-rank sort the
  // Board uses (spec §2/§4).
  const selectors = issueStores
    ? createListSelectors(issueStores, uiOrderStore)
    : null;
  const reorder = createReorderController({ transport, uiOrderStore });

  /** @type {{ bead_id: string, from_lane: string }|null} */
  let dragging = null;
  /**
   * Sorted raw candidate issues (Ready+Blocked merged, queued excluded), kept so
   * a candidate→candidate drop computes its rank against exactly the rendered
   * order (rows drop `created_at`, which the rank math needs). Refreshed on every
   * `buildModel`.
   *
   * @type {any[]}
   */
  let candidate_issues = [];
  /**
   * Candidate pane display filter (UI-ki09), restored at view creation.
   *
   * @type {CandidateFilter}
   */
  let candidate_filter = loadCandidateFilter();
  /** @type {string|null} Candidate whose queue-lane picker is open. */
  let place_menu_bead_id = null;
  /**
   * Candidate pane sort mode (UI-raqh §2), restored at view creation.
   *
   * @type {CandidateSort}
   */
  let candidate_sort = loadCandidateSort();
  /**
   * 완료 lane period range (UI-d7pw §3.2), restored at view creation.
   *
   * @type {import('../../data/closed-range.js').ClosedRange}
   */
  let done_range = isClosedRange(doneRange) ? doneRange : loadDoneRange();
  /**
   * Session-report presence keyed by workspace + immutable closed-issue
   * snapshot identity. A failed request stays failed until the issue store emits
   * again, so queue-only renders cannot retry-loop while the next closed issue
   * snapshot can re-arm the request.
   *
   * @type {Map<string, 'pending'|'session'|'not-session'|'failed'>}
   */
  const session_report_cache = new Map();
  /**
   * The current range's display label, used by the lane header and the two
   * toolbar KPIs so all three name the same period (§3.4/§3.5).
   *
   * @returns {string}
   */
  function doneRangeLabel() {
    const opt = CLOSED_RANGE_OPTIONS.find((o) => o.value === done_range);
    return opt ? opt.label : '오늘';
  }
  /**
   * Mobile lane collapse state (UI-58y2), restored at view creation.
   *
   * @type {LaneCollapse}
   */
  let lane_collapse = loadLaneCollapse();
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
   * The workspace-global execution kv (`bd kv workflow_session_defaults`), the
   * `전역` layer of the exec chips (worker-card-exec-chips §2.1). The Worker
   * launcher never reads that kv, so without this cache a bead with no pin
   * would resolve to bare defaults and the chip would lie.
   *
   * @type {Record<string, string>}
   */
  let session_defaults = {};
  /**
   * Workspace path the cached values belong to. Renders read through
   * {@link sessionDefaultsFor}, so another workspace's kv can never colour this
   * workspace's chips.
   *
   * @type {string|null}
   */
  let session_defaults_key = null;
  /**
   * Bumped on every refresh and on every fresh request. A response whose
   * generation is no longer current is DISCARDED — that is what keeps a slow
   * reply from the previous workspace out of the new one's cache.
   *
   * @type {number}
   */
  let session_defaults_generation = 0;
  /** @type {{ key: string, generation: number }|null} */
  let session_defaults_inflight = null;
  /** @type {Array<() => void>} */
  const unsubscribers = [];

  /**
   * The global layer for `key`'s renders. A mismatch reads as "no global
   * layer", never as another workspace's values.
   *
   * @param {string} key
   * @returns {Record<string, string>}
   */
  function sessionDefaultsFor(key) {
    return session_defaults_key === key ? session_defaults : {};
  }

  /**
   * Fetch the workspace kv once per workspace. `load()` runs on every store
   * change while the Worker route is up, so the key guard (already have it) and
   * the in-flight guard (already asking for it) are what keep this to one
   * request; a workspace switch or a refresh breaks both by changing the key or
   * the generation, so the new request goes out immediately instead of waiting
   * for the old one.
   */
  async function ensureSessionDefaults() {
    if (!transport) {
      return;
    }
    const key = getWorkspacePath?.() || '';
    if (session_defaults_key === key) {
      return;
    }
    if (
      session_defaults_inflight &&
      session_defaults_inflight.key === key &&
      session_defaults_inflight.generation === session_defaults_generation
    ) {
      return;
    }
    const generation = ++session_defaults_generation;
    session_defaults_inflight = { key, generation };
    /** @type {any} */
    let res = null;
    try {
      res = await Promise.resolve(transport('get-session-defaults', {}));
    } catch (err) {
      if (generation !== session_defaults_generation) {
        return;
      }
      session_defaults_inflight = null;
      // Fail-quiet (§5): the chips resolve with no global layer rather than
      // with a fabricated one, and the next refresh point tries again.
      log('get-session-defaults failed: %o', err);
      return;
    }
    if (generation !== session_defaults_generation) {
      return;
    }
    session_defaults =
      res && typeof res.values === 'object' && res.values !== null
        ? { ...res.values }
        : {};
    session_defaults_key = key;
    session_defaults_inflight = null;
    doRender();
  }

  /**
   * Drop the cache and ask again. Clearing the key breaks the "already have it"
   * guard and bumping the generation invalidates whatever is in flight, so a
   * reply already on its way cannot re-seat the stale values.
   */
  function refreshSessionDefaults() {
    session_defaults_key = null;
    session_defaults_generation += 1;
    void ensureSessionDefaults();
  }

  // Persistent console shell: the control bar + banners (top) and the lane row
  // (bottom) render into their own targets, and the transcript drawer lives in
  // its own fixed overlay host so a full-template re-render never clobbers the
  // drawer's lit-html root and an open drawer never pushes the lanes down.
  const console_el = document.createElement('div');
  console_el.className = 'worker-console';
  const top_el = document.createElement('div');
  // Named so the mobile block can pin it as the sticky ribbon (UI-58y2): the
  // sticky element has to be this wrapper, not the bar inside it, or the ribbon
  // unsticks as soon as its own parent scrolls past.
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

  /** @type {string|null} Currently open attempt (for the tile ring). */
  let selected_attempt = null;
  /** @type {string|null} Run id of an analyzer transcript open in the drawer. */
  let selected_analysis_run = null;

  const drawer = createTranscriptDrawer(drawer_el, {
    transport,
    sessionLogStore,
    onClose: () => {
      selected_attempt = null;
      selected_analysis_run = null;
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
  // the verify/deploy declaration and the `auto_repair` switch are not
  // preferences, so they did not move into the unified settings dialog.
  const repo_ops_settings = createRepoOpsSettings({
    queueStore,
    transport,
    onChanged: () => doRender(),
    onOpenScript: (input, trigger_element) => {
      void repo_ops_script_viewer.open(input, trigger_element);
    }
  });

  // 병렬성 분석 다이얼로그 (UI-04vo §9). Absent `analysisStore` (older wiring)
  // simply never opens — the control-bar button stays out of the bar.
  const parallel_analysis_dialog = analysisStore
    ? createParallelAnalysisDialog(console_el, {
        queueStore,
        analysisStore,
        transport,
        getWorkspacePath,
        onOpenTranscript: (run_id, meta) =>
          openDrawerForAnalysisRun(run_id, meta)
      })
    : null;

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
   * The index that appends to the waiting queue for a collapsed-strip drop.
   *
   * @returns {number}
   */
  function queueTailIndex() {
    const entries = currentQueue().queue;
    return Array.isArray(entries) ? entries.length : 0;
  }

  /**
   * Place a bead into a waiting lane at an index, retrying ONCE on a CAS
   * conflict (UI-04vo §5). New entry and cross-lane move share this op.
   *
   * @param {string} bead_id
   * @param {'parallel'|'s1'|'s2'|'s3'|'s4'|'s5'} lane
   * @param {number} [index]
   */
  async function placeBead(bead_id, lane, index) {
    if (!transport) {
      return;
    }
    const payload = () => ({
      bead_id,
      ...(lane === 'parallel' ? {} : { lane }),
      ...(index === undefined ? {} : { index }),
      expected_revision: currentRevision()
    });
    const res = await transport('worker-queue-place', payload());
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-place', payload()).then(adopt);
    }
  }

  /**
   * @param {string} bead_id
   * @param {'parallel'|'s1'|'s2'|'s3'|'s4'|'s5'} lane
   * @param {number} to_index
   */
  async function reorderBead(bead_id, lane, to_index) {
    if (!transport) {
      return;
    }
    const payload = () => ({
      bead_id,
      ...(lane === 'parallel' ? {} : { lane }),
      to_index,
      expected_revision: currentRevision()
    });
    const res = await transport('worker-queue-reorder', payload());
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-reorder', payload()).then(adopt);
    }
  }

  /**
   * @param {string} bead_id
   */
  async function removeBead(bead_id) {
    if (!transport) {
      return;
    }
    const res = await transport('worker-queue-remove', {
      bead_id,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-remove', {
        bead_id,
        expected_revision: currentRevision()
      }).then(adopt);
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
   * Dismiss (✕) the failure banner's attempt: stamp `dismissed_at` so the
   * failure stops counting as unhandled and the banner drops to the next one (if
   * any). Same CAS discipline as {@link resumeAttempt} — send the current
   * revision, adopt the conflict reply's queue, retry ONCE. A refusal surfaces
   * its reason as a toast.
   *
   * @param {string} attempt_id
   */
  async function dismissAttempt(attempt_id) {
    if (!transport || !attempt_id) {
      return;
    }
    let res = /** @type {any} */ (
      await transport('worker-attempt-dismiss', {
        attempt_id,
        expected_revision: currentRevision()
      })
    );
    adopt(res);
    if (res && res.conflict) {
      res = /** @type {any} */ (
        await transport('worker-attempt-dismiss', {
          attempt_id,
          expected_revision: currentRevision()
        })
      );
      adopt(res);
    }
    if (res && res.dismissed === false && !res.conflict && res.reason) {
      showToast(`배너 닫기 거부: ${res.reason}`, 'error', 2400);
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
    } finally {
      merge_pending.delete(bead_id);
      doRender();
    }
    if (!res || res.conflict || res.applied) {
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
   * Ask the coordinator to resolve ONE failed operation. Deliberately not a
   * retry: the server dispatches a repair session and only creates a new
   * attempt once that session produced evidence.
   *
   * @param {string} operation_id
   */
  async function resolveRepoOperation(operation_id) {
    if (!transport || !operation_id) {
      return;
    }
    const res = await transport('worker-repo-operation-repair', {
      operation_id
    });
    adopt(res);
    if (res && res.ok === false) {
      showToast(`해결 세션 거부: ${res.reason || ''}`, 'error', 3000);
      return;
    }
    if (res && res.ok === true) {
      showToast('해결 세션을 띄웠습니다', 'success', 2400);
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

  /**
   * Build the render view-model from live issue stores + the queue snapshot.
   *
   * @returns {{ queue: any, idToTitle: Map<string, string>, candidates: any[], candidate_hidden: { blocked: number, spec: number }, running: any[], live_count: number, slots: number, over_cap: boolean, failure: any, waiting: any[], serial_lanes: Array<{ id: string, index: number, rows: any[], occupied: boolean, badge: string, cycle: boolean }>, serial_lane_count: number, pr_wait: any[], merge_queue_length: number, merge_queue_running: boolean, auto_excluded: string[], declared_base: string|null, done: any[], token_total: string|Array<{ provider: 'claude'|'codex', label: string, tooltip: string }>|null, cleanup_failures: Array<{ bead_id: string, step: string, reason: string, detail: string|null, output_tail?: string, log_path?: string }>, repo_operations: any[] }}
   */
  function buildModel() {
    const q = currentQueue();
    const ready = selectors
      ? selectors.selectBoardColumn(READY_KEY, 'ready')
      : [];
    const blocked = selectors
      ? selectors.selectBoardColumn(BLOCKED_KEY, 'blocked')
      : [];
    const closed = selectors
      ? selectors.selectBoardColumn(CLOSED_KEY, 'closed')
      : [];
    // 실행 타일의 child rollup이 읽는 자식 집합 (worker-card-exec-chips §3.3).
    // 후보 레인에는 쓰이지 않는다 — in_progress bead는 후보가 아니다.
    const in_progress = selectors
      ? selectors.selectBoardColumn(IN_PROGRESS_KEY, 'in_progress')
      : [];
    const resolved = selectors
      ? selectors.selectBoardColumn(RESOLVED_KEY, 'resolved')
      : [];
    // Board와 같은 5집합에서 센다 (§3.3). 완료 레인 기간(`done_range`) 밖에서
    // 닫힌 child는 N에도 M에도 들어가지 않는다 — Board가 이미 그런 한계를
    // 가지며, 두 탭의 기간이 다르면 N/M도 다를 수 있다.
    const children_by_parent = buildChildrenIndex([
      ...ready,
      ...blocked,
      ...in_progress,
      ...resolved,
      ...closed
    ]);
    // 실행 설정 칩의 핀(bead metadata) 레이어 (§2.2). 구독 집합에 없는 bead는
    // 핀을 볼 수 없으므로 전역값만으로 해석하지 않는다 — 틀린 칩보다 없는 칩.
    /** @type {Map<string, any>} */
    const issue_by_id = new Map();
    for (const it of [...ready, ...blocked, ...in_progress]) {
      if (it && it.id && !issue_by_id.has(it.id)) {
        issue_by_id.set(it.id, it);
      }
    }
    // 상세 패널 `execDefaults()`와 같은 조립: 워크스페이스 kv 위에 큐 스냅샷의
    // orchestration 3키를 덮는다.
    /** @type {Record<string, any>} */
    const exec_global_values = {
      ...sessionDefaultsFor(getWorkspacePath?.() || '')
    };
    for (const key of [
      'orchestration_model',
      'orchestration_effort',
      'orchestration_speed'
    ]) {
      const value = /** @type {any} */ (q)[key];
      if (typeof value === 'string') {
        exec_global_values[key] = value;
      }
    }
    /**
     * Resolve one bead's execution settings the way the issue detail's
     * effective-settings card does. `route` comes from the server enrichment
     * first and the pinned metadata second, so `impl_dispatch`'s route default
     * (`quick_fix → main`) answers here exactly as it does on the Board card.
     *
     * @param {string} bead_id
     * @param {string|null} controller_runtime
     * @returns {Record<string, import('../../utils/execution-defaults.js').ExecutionValue>|null}
     */
    function execRowsFor(bead_id, controller_runtime) {
      const issue = issue_by_id.get(bead_id);
      if (!issue) {
        return null;
      }
      const metadata =
        issue.metadata && typeof issue.metadata === 'object'
          ? issue.metadata
          : {};
      const enriched = issue.workflow?.route;
      const pinned = metadata.route;
      const route = isWorkflowRoute(enriched)
        ? enriched
        : isWorkflowRoute(pinned)
          ? pinned
          : null;
      return resolveExecutionSettings({
        pin: metadata,
        global: exec_global_values,
        execution_defaults: q.execution_defaults ?? null,
        runner_catalog: q.runner_catalog ?? null,
        route,
        controller_runtime
      });
    }
    /**
     * The running tile's chips: the attempt's RECORDED orchestration tuple plus
     * the worker delegation resolved for its bead. The attempt's own runner is
     * the controller an `inherit` delegation would follow.
     *
     * @param {any} attempt
     * @returns {{ orchestration: any, worker: any }|null}
     */
    function attemptExecChips(attempt) {
      const controller_runtime = attempt.runner || null;
      const rows = execRowsFor(attempt.bead_id, controller_runtime);
      const orchestration = formatAttemptOrchestrationChip(attempt);
      const worker = rows ? formatWorkerChip(rows, controller_runtime) : null;
      return orchestration || worker ? { orchestration, worker } : null;
    }
    /** @type {Map<string, { orchestration: any, worker: any }|null>} */
    const exec_chips_cache = new Map();
    /**
     * The waiting row / candidate card chips: what this bead WOULD run with.
     * Resolved twice on purpose — the controller runtime is derived from the
     * orchestration model, which only the first resolution knows, and it is in
     * turn an input to `impl_runtime: inherit` (same two-pass the detail panel's
     * `effectiveOrchestrationRuntime()` uses).
     *
     * @param {string} bead_id
     * @returns {{ orchestration: any, worker: any }|null}
     */
    function beadExecChips(bead_id) {
      if (exec_chips_cache.has(bead_id)) {
        return exec_chips_cache.get(bead_id) ?? null;
      }
      const probe = execRowsFor(bead_id, null);
      /** @type {{ orchestration: any, worker: any }|null} */
      let chips = null;
      if (probe) {
        const ctl = modelRunnerOf(
          q.runner_catalog ?? null,
          probe.orchestration_model.value ?? ''
        );
        const rows = ctl === null ? probe : execRowsFor(bead_id, ctl);
        const orchestration = formatOrchestrationChip(
          rows,
          q.runner_catalog ?? null
        );
        const worker = formatWorkerChip(rows, ctl);
        chips = orchestration || worker ? { orchestration, worker } : null;
      }
      exec_chips_cache.set(bead_id, chips);
      return chips;
    }
    /**
     * The running tile's child rollup, or null when the bead has no children —
     * an empty block would claim "0/0" where the truth is "not that kind of
     * bead" (§3.3).
     *
     * @param {string} bead_id
     * @returns {import('../../utils/child-rollup.js').ChildRollup|null}
     */
    function runningRollup(bead_id) {
      const rollup = rollupFor(children_by_parent, bead_id);
      return rollup.total === 0 ? null : rollup;
    }

    // Server-decorated titles for the queue/pr_wait/done beads (UI-12k6). Those
    // lanes hold resolved/closed beads that are in no subscribed column, so
    // without this they render as bare ids. Seeded FIRST and then overwritten by
    // the live Ready/Blocked stores, which are the fresher source; fail-quiet on
    // an older server that sends no `bead_titles`, and the `bead_id` fallback
    // below still covers a title the server has not cached yet.
    /** @type {Record<string, unknown>} */
    const bead_titles = q.bead_titles || {};
    /** @type {Map<string, string>} */
    const idToTitle = new Map();
    for (const [bead_id, title] of Object.entries(bead_titles)) {
      if (typeof title === 'string' && title.length > 0) {
        idToTitle.set(bead_id, title);
      }
    }
    for (const it of [...ready, ...blocked]) {
      idToTitle.set(it.id, it.title || it.id);
    }

    /** @type {Record<string, any>} */
    const bead_times =
      q.bead_times &&
      typeof q.bead_times === 'object' &&
      !Array.isArray(q.bead_times)
        ? q.bead_times
        : {};
    const bead_labels =
      q.bead_labels &&
      typeof q.bead_labels === 'object' &&
      !Array.isArray(q.bead_labels)
        ? q.bead_labels
        : {};
    // 표시 전용 legacy worker-serial 잔재 (UI-04vo §4): 스케줄링 소비는 은퇴
    // 했고, 라벨이 남아 있는 행만 취소선 chip을 위해 표시한다. 라벨 진실은
    // 서버 데코레이션 우선, 없으면 live 이슈로 보충 (fail-quiet).
    /** @type {Map<string, boolean>} */
    const legacy_serial_by_id = new Map();
    for (const [bead_id, labels] of Object.entries(bead_labels)) {
      if (Array.isArray(labels)) {
        legacy_serial_by_id.set(bead_id, isWorkerSerial(labels));
      }
    }
    for (const issue of [...ready, ...blocked]) {
      const labels = /** @type {any} */ (issue).labels;
      if (Array.isArray(labels) && !legacy_serial_by_id.has(issue.id)) {
        legacy_serial_by_id.set(issue.id, isWorkerSerial(labels));
      }
    }
    // 분석 추천 overlay (UI-04vo §4). last-good 결과에서 파생하고, 서버가
    // 찍어 준 `eligible` 그룹만 chip을 얻는다 — 이 화면은 자격을 다시 계산하지
    // 않는다. 이미 한 직렬 레인에 함께 있는 그룹은 추천할 것이 없으므로 뺀다.
    /** @type {Map<string, string[]>} */
    const recommendation_by_id = new Map();
    const analysis_groups = analysisStore?.get()?.last_good?.result?.groups;
    for (const group of Array.isArray(analysis_groups) ? analysis_groups : []) {
      if (group?.eligible !== true || !Array.isArray(group.members)) {
        continue;
      }
      const lanes_of = group.members.map((/** @type {string} */ bead_id) => {
        const lane = (Array.isArray(q.serial_lanes) ? q.serial_lanes : []).find(
          (/** @type {any} */ entry_lane) =>
            entry_lane.entries.some(
              (/** @type {any} */ e) => e.bead_id === bead_id
            )
        );
        return lane ? lane.id : null;
      });
      const settled =
        lanes_of.every((/** @type {string|null} */ lane) => lane !== null) &&
        new Set(lanes_of).size === 1;
      if (settled) {
        continue;
      }
      for (const bead_id of group.members) {
        recommendation_by_id.set(
          bead_id,
          group.members.filter((/** @type {string} */ id) => id !== bead_id)
        );
      }
    }

    // 직접 blocks blocker (UI-04vo §3) — 대기 사유 chip의 표시 전용 소스.
    /** @type {Record<string, string[]>} */
    const bead_blocked_by =
      q.bead_blocked_by &&
      typeof q.bead_blocked_by === 'object' &&
      !Array.isArray(q.bead_blocked_by)
        ? q.bead_blocked_by
        : {};

    // 생성·수정 시각 (UI-d7pw §4.3). 후보/Ready/Blocked bead는 구독 이슈가
    // 이미 들고 있고, 대기/PR 대기/완료 bead는 서버가 `bead_times`로 실어
    // 보낸다. 서버가 안 보내면 빈 객체 → 메타 줄이 그냥 안 그려진다.
    /** @type {Map<string, { created_at?: number|string, updated_at?: number|string }>} */
    const idToTimes = new Map();
    for (const [bead_id, times] of Object.entries(bead_times)) {
      if (times && typeof times === 'object') {
        idToTimes.set(bead_id, times);
      }
    }
    for (const it of [...ready, ...blocked]) {
      idToTimes.set(it.id, {
        created_at: it.created_at,
        updated_at: it.updated_at
      });
    }
    /**
     * @param {string} bead_id
     * @returns {{ created_at?: number|string, updated_at?: number|string }}
     */
    const timesOf = (bead_id) => idToTimes.get(bead_id) || {};

    const pr_wait_entries = /** @type {any[]} */ (q.pr_wait || []);
    /** @type {Record<string, any>} */
    const pr_obs = q.pr_observations || {};
    // Live server activity per `pr_wait` bead (UI-raqh §3/§4). Fail-quiet: a
    // server that does not send it simply renders the settled badges.
    /** @type {Record<string, any>} */
    const pr_activity = q.pr_activity || {};
    // DURABLE post-merge cleanup failures (worker-phase2 §6): the merge landed
    // but the pr-finish sequence stopped part-way, so a human has to finish it.
    // Nothing retries automatically, which is exactly why this has a banner.
    /** @type {Record<string, { step: string, reason: string, bd_restore: string|null, at: number, detail: string|null, output_tail?: string, log_path?: string, failure_code?: string, retryable?: boolean, retry_count?: number, subject_id?: string, repair_eligible?: boolean, repair?: Record<string, unknown> }>} */
    const cleanup_failed = q.cleanup_failed || {};
    const cleanup_failures = Object.entries(cleanup_failed).map(
      ([bead_id, rec]) => ({
        bead_id,
        step: rec && rec.step ? rec.step : '',
        reason: rec && rec.reason ? rec.reason : '',
        // When it stopped — the timeline sorts on this (§4.2). Fail-quiet: a
        // record without it sorts to the oldest end rather than to the top.
        at: rec && typeof rec.at === 'number' ? rec.at : null,
        // Fail-quiet: a record written before the field existed has none.
        detail: rec && typeof rec.detail === 'string' ? rec.detail : null,
        output_tail:
          rec && typeof rec.output_tail === 'string' && rec.output_tail
            ? rec.output_tail
            : undefined,
        log_path:
          rec && typeof rec.log_path === 'string' && rec.log_path
            ? rec.log_path
            : undefined,
        retry_count:
          rec &&
          typeof rec.retry_count === 'number' &&
          Number.isInteger(rec.retry_count) &&
          rec.retry_count > 0
            ? rec.retry_count
            : 0,
        // The resolution-subject overlay the server puts on a cursor-stopping
        // row. Carried through VERBATIM: the client never decides which row is
        // a subject, so a row the server did not overlay renders no resolve
        // entry rather than one the coordinator would refuse.
        failure_code:
          rec && typeof rec.failure_code === 'string'
            ? rec.failure_code
            : undefined,
        subject_id:
          rec && typeof rec.subject_id === 'string'
            ? rec.subject_id
            : undefined,
        repair_eligible: Boolean(rec && rec.repair_eligible),
        repair: rec && rec.repair ? rec.repair : undefined
      })
    );
    const queue_entries = /** @type {any[]} */ (q.queue || []);
    const queued = new Set([
      ...queue_entries.map((/** @type {any} */ e) => e.bead_id),
      ...(Array.isArray(q.serial_lanes) ? q.serial_lanes : []).flatMap(
        (/** @type {any} */ lane) =>
          (Array.isArray(lane?.entries) ? lane.entries : []).map(
            (/** @type {any} */ e) => e.bead_id
          )
      ),
      ...pr_wait_entries.map((/** @type {any} */ e) => e.bead_id),
      ...q.done.map((/** @type {any} */ e) => e.bead_id)
    ]);

    // Merge the raw Ready+Blocked issues (which carry created_at) FIRST, sort the
    // combined list by the shared effective rank (spec §4 "합산 목록 유효 rank
    // 정렬"), THEN exclude queued beads and project to candidate rows. Blocked ids
    // are tracked so the row reason keeps the blocked/ready distinction after the
    // merge collapses the two sources into one order.
    //
    // `worker-ineligible` is deliberately NOT an exclusion here (UI-8881):
    // the Worker tab observes candidates rather than listing only runnable
    // ones, so such a bead stays visible as an observation-only card and the
    // row's `worker_ineligible` flag disables its drag/place affordances.
    // Execution safety keeps living in the server's admission/dispatch guards.
    /** @type {Set<string>} */
    const blocked_ids = new Set(blocked.map((/** @type {any} */ it) => it.id));
    const order = uiOrderStore ? uiOrderStore.get()?.order || {} : {};
    /** @type {Set<string>} */
    const seen = new Set();
    /** @type {any[]} */
    const merged = [];
    for (const it of [...ready, ...blocked]) {
      if (queued.has(it.id) || seen.has(it.id) || isPhaseChild(it)) {
        continue;
      }
      seen.add(it.id);
      merged.push(it);
    }
    // The chosen sort decides the RENDERED order, and `candidate_issues` must
    // match it: a candidate→candidate drop computes its new rank from the
    // neighbours the user actually saw (spec §4).
    candidate_issues = applyCandidateSort(merged, candidate_sort, order);

    // Admission observations recorded by the scheduler/place gate (§1) surface
    // as badges on candidate AND queued rows.
    /** @type {Record<string, { reason: string, at: number, stale?: true }>} */
    const admission = q.admission || {};
    /**
     * A `prefix:detail` reason (`spec_missing_at_base:<base>`) renders its detail
     * apart so the base reads at a glance; a bare reason renders unchanged, which
     * is what keeps already-persisted `spec_missing` records renderable without
     * any normalization.
     *
     * A `stale` record is the one NON-blocking observation (UI-dlim §3.4): the
     * bead was admitted and will run, so it must not wear the ⛔ refusal mark —
     * it announces the in-session re-review the dispatch asks the session for.
     *
     * @param {string} bead_id
     * @returns {string}
     */
    const admissionBadge = (bead_id) => {
      const record = admission[bead_id];
      if (!record) {
        return '';
      }
      if (record.stale === true) {
        return '♻️ stale→재리뷰';
      }
      const reason = typeof record.reason === 'string' ? record.reason : '';
      const sep = reason.indexOf(':');
      if (sep > 0 && sep < reason.length - 1) {
        return `⛔ ${reason.slice(0, sep)} (${reason.slice(sep + 1)})`;
      }
      return `⛔ ${reason}`;
    };

    /** @type {any[]} */
    const candidate_rows = candidate_issues.map((/** @type {any} */ it) => {
      const spec = resolveSpecId(it);
      const has_spec = spec.path.length > 0;
      const is_quick_fix =
        it.workflow?.route === 'quick_fix' ||
        (it.metadata && it.metadata.route === 'quick_fix');
      // Ready/Blocked subscriptions preserve raw bd fields, including
      // `description`. An older/partial server may omit the key; that absence
      // stays fail-quiet and leaves the authoritative admission check to the
      // server. A present but empty description is safe to reject here.
      const has_description =
        !Object.hasOwn(it, 'description') ||
        (typeof it.description === 'string' &&
          it.description.trim().length > 0);
      // Labels follow the same ownership boundary: use them when the payload
      // carries them, otherwise leave worker eligibility to server admission.
      const worker_ineligible =
        Object.hasOwn(it, 'labels') &&
        isWorkerIneligible(/** @type {any} */ (it).labels);
      const eligible =
        !worker_ineligible &&
        (is_quick_fix ? has_description : has_spec && !spec.conflict);
      const is_blocked = blocked_ids.has(it.id);
      /** @type {string[]} */
      const parts = [];
      if (is_blocked) {
        parts.push(blockedReason(it));
      }
      if (is_quick_fix && !has_description) {
        parts.push('missing_description');
      } else if (!is_quick_fix && spec.conflict) {
        parts.push('spec_id_conflict');
      } else if (!is_quick_fix && !has_spec) {
        parts.push('spec 없음');
      }
      const adm = admissionBadge(it.id);
      if (adm) {
        parts.push(adm);
      }
      return {
        id: it.id,
        title: it.title || it.id,
        reason: parts.join(' · '),
        draggable: eligible,
        lane: 'candidate',
        created_at: it.created_at,
        updated_at: it.updated_at,
        // Candidate cards consume the server-enriched workflow/status (spec §2);
        // queue lanes carry no workflow snapshot, so they stay on miniRow.
        workflow: it.workflow,
        is_quick_fix,
        status: it.status,
        // Observation-only marker (UI-8881): the card template owns the shading,
        // chip, and refused affordances from this one boolean, so no template or
        // stylesheet re-reads the label strings.
        worker_ineligible,
        // Filter inputs (UI-ki09); the card template ignores them.
        blocked: is_blocked,
        has_spec,
        // "이 설정으로 돌아간다"를 적재 전에 미리 본다
        // (worker-card-exec-chips §2.2).
        exec_chips: beadExecChips(it.id)
      };
    });
    // DISPLAY-only projection: `candidate_issues` above stays the unfiltered
    // merged list, so a candidate→candidate drop still computes its rank against
    // the whole lane and hiding rows never changes the reorder result.
    const filtered = applyCandidateFilter(candidate_rows, candidate_filter);
    const candidates = filtered.visible;

    // REVISE 파킹 관측 (UI-hs11 §3.1). 서버가 못 보내는 구버전에서는 빈
    // 객체이므로 처분 카드가 그냥 렌더되지 않는다 (fail-quiet).
    /** @type {Record<string, any>} */
    const revise_parked = q.revise_parked || {};
    const discard_operations =
      q.discard_operations &&
      typeof q.discard_operations === 'object' &&
      !Array.isArray(q.discard_operations)
        ? q.discard_operations
        : {};

    /**
     * @param {any[]} entries
     * @param {'queue'|'done'|'s1'|'s2'|'s3'|'s4'|'s5'} lane
     * @returns {any[]}
     */
    const toRows = (entries, lane) =>
      entries.map((/** @type {any} */ e, /** @type {number} */ entry_index) => {
        const waiting_lane = lane !== 'done';
        const serial_lane = lane !== 'done' && lane !== 'queue';
        const parked = waiting_lane ? revise_parked[e.bead_id] : null;
        const projected_discard = waiting_lane
          ? discardProjection(discard_operations, e.bead_id)
          : null;
        const discard = projected_discard?.operation ? projected_discard : null;
        const worker_serial =
          waiting_lane && legacy_serial_by_id.get(e.bead_id) === true;
        // 대기 사유 chip (UI-04vo §4): blocked로 스킵된 행에 직접 blocker를
        // 보여준다. blocker 목록은 표시 전용이고 판정은 서버 스캔의 durable
        // admission 기록이다.
        const blockers = bead_blocked_by[e.bead_id] || [];
        const raw_admission =
          q.admission && typeof q.admission === 'object'
            ? q.admission[e.bead_id]
            : null;
        const stale_work = waiting_lane
          ? staleWorkProjection(
              raw_admission,
              !!discard || stale_work_pending.has(e.bead_id)
            )
          : null;
        const admission_reason =
          waiting_lane && !stale_work ? admissionBadge(e.bead_id) : null;
        const reason_parts = waiting_lane ? [admission_reason] : [];
        /** @type {string[]} */
        const wait_badges =
          waiting_lane &&
          blockers.length > 0 &&
          typeof raw_admission?.reason === 'string' &&
          raw_admission.reason.startsWith('not_ready')
            ? [`⏸ ${blockers.join(', ')} 완료 대기 (blocks)`]
            : [];
        const recommended = waiting_lane
          ? recommendation_by_id.get(e.bead_id)
          : undefined;
        if (recommended && recommended.length > 0) {
          wait_badges.push(`✳ serial 권장 · ${recommended.join(', ')}와`);
        }
        return {
          id: e.bead_id,
          title: idToTitle.get(e.bead_id) || e.bead_id,
          reason: reason_parts.filter(Boolean).join(' · '),
          draggable: waiting_lane && !discard && !stale_work,
          done: lane === 'done',
          lane,
          seq: serial_lane ? entry_index + 1 : undefined,
          worker_serial,
          discard,
          stale_work,
          // 파킹 행은 처분 대기 카드다 (§3.5): 뱃지 + 버튼 2개. 뱃지는 사람의
          // 결정을 기다리는 상태이므로 alert 색을 쓴다.
          badges: [...wait_badges, ...(parked ? ['⏸ REVISE 파킹'] : [])],
          alert: !!parked,
          revise_action: !!parked,
          revise_enabled:
            !!parked && !discard && !revise_pending.has(e.bead_id),
          revise_title: parked
            ? parked.notes_tail
              ? `REVISE findings (자세히는 카드 클릭 → 이슈 상세):\n${parked.notes_tail}`
              : 'notes의 REVISE finding을 스펙에 반영하는 처분 세션을 띄웁니다'
            : '',
          // 완료 행은 마지막 attempt의 토큰 사용량을 함께 보여준다 (UI-raqh §1);
          // 대기 행은 아직 실행 전이라 붙일 것이 없다.
          usage:
            lane === 'done'
              ? sumAttemptUsage(q.attempts || {}, e.bead_id)
              : null,
          // 완료 행만 attempt 작업시간을 싣는다; 세션 작업 행은 attempt가 없어 null.
          work_ms:
            lane === 'done'
              ? sumAttemptWorkMs(q.attempts || {}, e.bead_id)
              : null,
          // 완료 레인 진입 시각 = 완료 시각 (UI-rkly §3). 2줄 행의 둘째 줄이
          // 이것을 싣는다; 구버전 queue.json 엔트리는 값이 없어 생략된다.
          done_at:
            lane === 'done' && typeof e.added_at === 'number'
              ? e.added_at
              : undefined,
          // 대기 행만 실행 설정 칩을 얻는다 (worker-card-exec-chips §2.2):
          // 완료 행은 이미 끝났으므로 "돌아갈 설정"이 없다.
          exec_chips: waiting_lane ? beadExecChips(e.bead_id) : null,
          ...timesOf(e.bead_id)
        };
      });

    const attempts = q.attempts ? Object.values(q.attempts) : [];
    // A resumed_from carried by any attempt marks its ancestor as spent, so an
    // ancestor is never offered as a resume target (spec §1).
    /** @type {Set<string>} */
    const resumed_from_ids = new Set();
    for (const a of /** @type {any[]} */ (attempts)) {
      if (
        a &&
        typeof a.resumed_from === 'string' &&
        a.resumed_from.length > 0
      ) {
        resumed_from_ids.add(a.resumed_from);
      }
    }
    // Supersede: the LAST attempt recorded for a bead, by attempts-map insertion
    // order. The map is append-only, so its order IS time — `started_at` is not
    // used because legacy records carry null there.
    /** @type {Map<string, string>} */
    const last_attempt_by_bead = new Map();
    for (const a of /** @type {any[]} */ (attempts)) {
      last_attempt_by_bead.set(a.bead_id, a.attempt_id);
    }
    /** @type {Map<string, any>} */
    const attempt_by_id = new Map();
    for (const a of /** @type {any[]} */ (attempts)) {
      attempt_by_id.set(a.attempt_id, a);
    }
    /**
     * Whether this attempt is doing conflict-resolution work. The ▶ resume path
     * mints its child with `conflict_resolution: false` (scheduler
     * `resumeAttempt`) even when the paused ancestor was a resolution session,
     * so the flag is inherited through `resumed_from` — otherwise resuming a
     * paused resolution makes the badge vanish and re-arms [머지] on a PR that
     * is still being fixed.
     *
     * @param {any} attempt
     * @returns {boolean}
     */
    function resolvesConflict(attempt) {
      /** @type {Set<string>} */
      const seen = new Set();
      let cur = attempt;
      while (cur && !seen.has(cur.attempt_id)) {
        if (cur.conflict_resolution === true) {
          return true;
        }
        seen.add(cur.attempt_id);
        cur =
          typeof cur.resumed_from === 'string' && cur.resumed_from.length > 0
            ? attempt_by_id.get(cur.resumed_from) || null
            : null;
      }
      return false;
    }
    // 워크스페이스가 선언한 base (UI-j6wa §3). 서버 데코레이션이라 구버전
    // 서버에서는 아예 없고, 선언을 읽지 못하면 null로 온다 — 둘 다 fail-quiet.
    const declared_base =
      typeof q.declared_base === 'string' ? q.declared_base : null;
    /**
     * PR 대기 행이 비교 대상으로 삼을 attempt의 base (UI-j6wa §3). 재실행으로
     * attempt가 여러 개인 bead에서도 결정적이어야 하므로 규칙은 두 개뿐이다:
     * 충돌 해소 세션은 제외하고(그 세션의 base는 PR이 향하는 곳이 아니라 고치는
     * 중인 브랜치의 것이다), 남은 것 중 `started_at`이 가장 최신인 것을 쓴다.
     * 동률과 `started_at` 부재는 attempts 맵의 삽입 순서로 갈린다 — 그 순서가
     * 곧 시간이라는 것은 위 supersede 판정이 이미 쓰는 사실이다.
     *
     * @param {string} bead_id
     * @returns {string|null}
     */
    function prWaitTargetBase(bead_id) {
      /** @type {any|null} */
      let picked = null;
      for (const a of /** @type {any[]} */ (attempts)) {
        if (!a || a.bead_id !== bead_id || resolvesConflict(a)) {
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
    }
    /** @type {any[]} */
    const failed_running = [];
    /** @type {any[]} */
    const active_running = [];
    const isUnhandledFailure = createUnhandledFailurePredicate(q);
    /**
     * Resume eligibility is deliberately the same for the banner and its
     * corresponding failed tile.
     *
     * @param {any} attempt
     * @returns {{ eligible: boolean, reason: string|null }}
     */
    const failureResumeState = (attempt) => {
      const has_sid =
        typeof attempt.session_id === 'string' && attempt.session_id.length > 0;
      const already = resumed_from_ids.has(attempt.attempt_id);
      return {
        eligible: has_sid && !already,
        reason: !has_sid
          ? 'session_id 없는 구 attempt — 이어하기 불가'
          : already
            ? '이미 이어받은 attempt (child attempt 존재) — 이어하기 불가'
            : null
      };
    };
    /** @type {any|null} */
    let latest_failed = null;
    for (const a of /** @type {any[]} */ (attempts)) {
      // A paused attempt that was already resumed is history: its child is the
      // live one, so only a LEAF paused attempt renders a tile (§1.1).
      const leaf_paused =
        a.status === 'paused' && !resumed_from_ids.has(a.attempt_id);
      if (a.status === 'running' || leaf_paused) {
        active_running.push({
          bead_id: a.bead_id,
          attempt_id: a.attempt_id,
          title: idToTitle.get(a.bead_id) || a.bead_id,
          runner: a.runner || null,
          model: a.model || null,
          effort: a.effort || null,
          speed: a.speed || null,
          continuation_mode: a.continuation_mode || null,
          started_at: typeof a.started_at === 'number' ? a.started_at : null,
          resumed_from: a.resumed_from || null,
          paused: leaf_paused,
          // 충돌 해소 세션은 일반 실행과 결과가 다르다 (PR을 머지하지 않고
          // 브랜치를 고친다) — 타일에서 구분되지 않으면 "진행중"의 정체를
          // 알 수 없다 (UI-dxgz §1). 재개된 child는 자기 플래그가 false라
          // resumed_from 조상에서 상속한다.
          conflict_resolution: resolvesConflict(a),
          // 실행 중 타일은 그 타일의 attempt를 그대로 본다 (UI-j6wa §3) — PR
          // 대기 행과 달리 어느 attempt인지 고를 여지가 없다.
          base_exception: baseException(declared_base, a.target_base),
          can_pause:
            typeof a.session_id === 'string' && a.session_id.length > 0,
          discard: discardProjection(discard_operations, a.bead_id, {
            attempt_id: a.attempt_id
          }),
          // 실행 중 타일도 bead의 전체 attempt 합계를 쓴다 (UI-d7pw §1.4).
          // 이 attempt의 라이브 값만 쓰면 재실행된 bead의 실행 타일만 혼자
          // 다른 수를 보이게 되어 "모든 배지가 같은 질문에 답한다"가 깨진다.
          // 스냅샷의 decorateQueue가 실행 중 attempt에 라이브 값을 실어
          // 보내므로 합계에 현재 진행분이 포함되고 계속 올라간다.
          usage: sumAttemptUsage(q.attempts || {}, a.bead_id),
          // 큐 스냅샷에는 페이즈명이 없다 — child 진행도가 "지금 어디까지"를
          // 말하는 유일한 사실이다 (worker-card-exec-chips §3.3).
          rollup: runningRollup(a.bead_id),
          rollup_expanded: rollup_expanded_ids.has(a.bead_id),
          exec_chips: attemptExecChips(a),
          ...timesOf(a.bead_id)
        });
      } else if (a.status === 'failed' || a.status === 'orphaned') {
        // Only a real failure surfaces the banner — a user pause/discard is not
        // a failure and never renders one (worker-phase1 §1) — and only an
        // UNHANDLED one: a later attempt for the same bead (↻ child, redispatch,
        // whatever its outcome) supersedes it, a ✕ dismisses it, and entering
        // the done lane AFTER the failure resolves it (UI-a9ys).
        if (isUnhandledFailure(a)) {
          const resume = failureResumeState(a);
          failed_running.push({
            bead_id: a.bead_id,
            attempt_id: a.attempt_id,
            title: idToTitle.get(a.bead_id) || a.bead_id,
            runner: a.runner || null,
            model: a.model || null,
            effort: a.effort || null,
            speed: a.speed || null,
            continuation_mode: a.continuation_mode || null,
            started_at: typeof a.started_at === 'number' ? a.started_at : null,
            resumed_from: a.resumed_from || null,
            failed: true,
            status: a.status,
            status_label: a.status === 'orphaned' ? '중단됨' : '실패',
            discard: discardProjection(discard_operations, a.bead_id, {
              attempt_id: a.attempt_id
            }),
            resume_eligible: resume.eligible,
            resume_reason: resume.reason,
            conflict_resolution: resolvesConflict(a),
            base_exception: baseException(declared_base, a.target_base),
            usage: sumAttemptUsage(q.attempts || {}, a.bead_id),
            rollup: runningRollup(a.bead_id),
            rollup_expanded: rollup_expanded_ids.has(a.bead_id),
            exec_chips: attemptExecChips(a),
            ...timesOf(a.bead_id)
          });
          latest_failed = a;
        }
      }
    }
    // Failed records are the actionable front of the running lane; they do not
    // consume a live slot, but still claim their bead so queue rows do not
    // duplicate the same work item.
    const running = [...failed_running, ...active_running].map((tile) => {
      const attempt = attempt_by_id.get(tile.attempt_id);
      const progress = attempt?.quickfix_landing;
      if (
        attempt?.quickfix_lane !== true ||
        !progress ||
        typeof progress !== 'object'
      ) {
        return tile;
      }
      const reason =
        typeof progress.reason === 'string' && progress.reason.length > 0
          ? progress.reason
          : null;
      const landing = prWaitProgress({
        bead_id: attempt.bead_id,
        merge_sha: progress.head_sha,
        cleanup_cursor: progress.cursor,
        cleanup_failed: reason ? { step: progress.cursor, reason } : null,
        repo_operations: Array.isArray(q.repo_operations)
          ? q.repo_operations
          : []
      });
      return landing ? { ...tile, landing } : tile;
    });
    // The banner's ↻ targets EXACTLY the attempt the banner describes — the
    // latest failure. An older eligible attempt is never substituted (that
    // would resume a different session than the one reported); ineligibility
    // renders the button disabled with the reason in its title (spec §1.5).
    /** @type {any|null} */
    let failure = null;
    if (latest_failed) {
      const resume = failureResumeState(latest_failed);
      const detail = latest_failed.cause_detail;
      failure = {
        bead_id: latest_failed.bead_id,
        repo: latest_failed.repo || '',
        reason: latest_failed.cause || latest_failed.status,
        // Fail-quiet: only a fail-closed blocker records one (UI-2o4z §2).
        cause_detail:
          detail && typeof detail.reason === 'string'
            ? {
                reason: detail.reason,
                command:
                  typeof detail.command === 'string' ? detail.command : null
              }
            : null,
        resume_attempt_id: latest_failed.attempt_id,
        resume_eligible: resume.eligible,
        resume_reason: resume.reason,
        discard: discardProjection(discard_operations, latest_failed.bead_id, {
          attempt_id: latest_failed.attempt_id
        })
      };
    }

    /** @type {Set<string>} */
    const active_bead_ids = new Set(running.map((r) => r.bead_id));

    // The sequential merge queue (UI-5v7d): membership and ORDER are durable,
    // the active item and the skip reasons are the driver's live memory.
    const merge_queue = Array.isArray(q.merge_queue) ? q.merge_queue : [];
    /** @type {Map<string, number>} */
    const merge_positions = new Map();
    /** @type {Map<string, import('../../data/worker-queue-store.js').ResolutionProjection|null|undefined>} */
    const merge_resolutions = new Map();
    /** @type {Map<string, any>} */
    const merge_continuations = new Map();
    /** @type {Map<string, any>} */
    const merge_head_reviews = new Map();
    /** @type {Map<string, any>} */
    const merge_authorities = new Map();
    merge_queue.forEach((/** @type {any} */ e, /** @type {number} */ i) => {
      if (e && typeof e.bead_id === 'string') {
        merge_positions.set(e.bead_id, i + 1);
        merge_resolutions.set(e.bead_id, e.resolution);
        merge_continuations.set(e.bead_id, e.continuation_action || null);
        merge_head_reviews.set(e.bead_id, e.head_review || null);
        merge_authorities.set(e.bead_id, e.authority || null);
      }
    });
    const merge_state = q.merge_queue_state || { active: null, failures: {} };
    /** @type {Record<string, string>} */
    const merge_failures = merge_state.failures || {};
    const merge_waiting =
      merge_state.waiting &&
      typeof merge_state.waiting.bead_id === 'string' &&
      typeof merge_state.waiting.reason === 'string'
        ? merge_state.waiting
        : null;
    // durable 제외 기록 (UI-yk55 §3): 계약 키가 없는 구버전 스냅샷은 빈 맵으로
    // 읽고 뱃지를 생략한다 (fail-quiet).
    /** @type {Record<string, { head_sha: string, reason: string, at: number }>} */
    const auto_merge_skips = q.auto_merge_skips || {};
    /**
     * Whether a row's exclusion still holds: only when the recorded head is the
     * one now observed (UI-yk55 §3.2). head가 움직였으면 다음 스캔이 기록을
     * 지우고 다시 후보로 삼으므로, 그 행은 제외로 세어서는 안 된다.
     *
     * @param {string} bead_id
     * @returns {string|null} 제외 사유, 아니면 null.
     */
    const autoSkipReason = (bead_id) => {
      const skip = auto_merge_skips[bead_id];
      if (!skip) {
        return null;
      }
      const obs = pr_obs[bead_id];
      const head = obs && obs.pr ? obs.pr.head_sha : null;
      return head && head === skip.head_sha ? skip.reason || '' : null;
    };

    // The running list carries leaf-paused attempts too, so the PR 대기 card
    // needs both sets apart: only a live session gets the breathing badge, while
    // both states keep [머지]/[폐기] quiet (UI-dxgz §1).
    /** @type {Map<string, 'running'|'paused'>} */
    const conflict_sessions = new Map();
    for (const r of running) {
      if (r.failed !== true && r.conflict_resolution) {
        if (!r.paused) {
          conflict_sessions.set(r.bead_id, 'running');
        } else if (!conflict_sessions.has(r.bead_id)) {
          conflict_sessions.set(r.bead_id, 'paused');
        }
      }
    }

    // A manual ▶ may push live sessions past the dispatch cap on purpose (§2.3)
    // — surface it rather than blocking the resume. There is ONE cap now
    // (worker-phase2 §3), so the live total is compared against it directly.
    const live = running.filter((r) => !r.paused && r.failed !== true);
    const live_count = live.length;
    const info_slots = (q.workspace_info || {}).slots;
    const configured_slots =
      typeof info_slots === 'number'
        ? info_slots
        : typeof q.slots === 'number'
          ? q.slots
          : MIN_SLOTS;
    const slots = configured_slots;
    const over_cap = live_count > slots;

    // 완료 레인은 최신순 + 기간 필터 (UI-d7pw §3). `q.done`은 append 순서라
    // 오래된 것이 위에 오고 정렬도 가지치기도 없었다. 스냅샷은 공유 객체이므로
    // 복사해서 정렬한다. 비교 기준은 `added_at`(레인 진입 = 완료 시각)이지
    // bead의 `updated_at`이 아니다.
    const done_since = closedRangeSince(done_range);
    const done_entries = (Array.isArray(q.done) ? q.done.slice() : [])
      // `added_at`이 없는 엔트리(구버전 queue.json)는 기간으로 판정할 수 없으므로
      // 거른다기보다 남긴다 — 타임스탬프가 없다는 이유로 사용자가 실제로 끝낸
      // 일을 화면에서 지우는 쪽이 더 나쁜 오답이다.
      .filter(
        (/** @type {any} */ e) =>
          done_since === undefined ||
          typeof e.added_at !== 'number' ||
          e.added_at >= done_since
      )
      .sort(
        (/** @type {any} */ a, /** @type {any} */ b) =>
          (b.added_at || 0) - (a.added_at || 0)
      );
    const done_rows = toRows(done_entries, 'done');
    /** @type {Set<string>} */
    const worker_done_ids = new Set(
      (Array.isArray(q.done) ? q.done : [])
        .map((/** @type {any} */ entry) => entry?.bead_id)
        .filter((/** @type {any} */ bead_id) => typeof bead_id === 'string')
    );
    /** @type {any[]} */
    const session_done_rows = [];
    const workspace = getWorkspacePath?.() || '';
    for (const issue of closed) {
      const closed_at = coerceTimestampMs(issue.closed_at);
      if (
        typeof issue.id !== 'string' ||
        worker_done_ids.has(issue.id) ||
        closed_at === null ||
        (done_since !== undefined && closed_at < done_since) ||
        typeof issue.comment_count !== 'number' ||
        issue.comment_count <= 0
      ) {
        continue;
      }
      const identity = `${workspace}\u0000${issue.id}\u0000${String(
        issue.updated_at
      )}\u0000${issue.comment_count}`;
      const cached = session_report_cache.get(identity);
      if (cached === undefined && transport) {
        session_report_cache.set(identity, 'pending');
        void Promise.resolve(transport('get-comments', { id: issue.id }))
          .then((comments) => {
            const has_session_report =
              Array.isArray(comments) &&
              comments.some(
                (/** @type {any} */ comment) =>
                  parseReport(
                    typeof comment?.text === 'string' ? comment.text : ''
                  )?.lane === 'session'
              );
            session_report_cache.set(
              identity,
              has_session_report ? 'session' : 'not-session'
            );
            doRender();
          })
          .catch(() => {
            session_report_cache.set(identity, 'failed');
            doRender();
          });
      }
      if (cached === 'session') {
        session_done_rows.push({
          id: issue.id,
          title: issue.title || issue.id,
          reason: '',
          draggable: false,
          done: true,
          lane: 'done',
          selectable: false,
          selected: false,
          worker_serial: false,
          badges: ['세션 작업'],
          alert: false,
          usage: null,
          work_ms: null,
          done_at: closed_at,
          created_at: issue.created_at,
          updated_at: issue.updated_at
        });
      }
    }
    done_rows.push(...session_done_rows);
    done_rows.sort(
      (/** @type {any} */ a, /** @type {any} */ b) =>
        (b.done_at || 0) - (a.done_at || 0)
    );
    // 툴바 토큰 KPI (UI-58y2 데스크톱 §툴바): 완료 레인의 행이 이미 들고 있는
    // usage를 합산할 뿐이라 새 데이터 소스가 없다. 행의 usage가 bead의 전체
    // attempt 합계이므로(UI-d7pw §1) 이 KPI는 "선택된 기간에 완료된 이슈들이
    // 생애 전체에 쓴 토큰" — 코호트 합계다. 기간 내 소모량이 아니다 (§3.5).
    // 4필드 전부 누적한다 (UI-tq13 §5). 행 배지와 같은 산식을 써야 같은 이슈에
    // 대해 툴바와 행이 같은 숫자를 말한다.
    /** @type {Record<string, number>} */
    const token_sum = {};
    for (const field of SUM_FIELDS) {
      token_sum[field] = 0;
    }
    // 보고된 0과 아예 보고되지 않은 usage는 다른 사실이다 — 행 배지가 그 둘을
    // 가르는 방식(`formatUsageTotal`의 토큰 필드 존재 검사)을 합계도 따른다.
    let token_reported = false;
    // 비용은 합산 대상 전부가 보고했을 때만 붙인다 (UI-j6wa §2) — `sumAttemptUsage`가
    // 행 배지에 쓰는 규칙 그대로다. 일부만 보고한 합계에 $를 붙이면 토큰과 돈이
    // 서로 다른 모집단을 말하게 되고, 읽는 쪽에는 그 차이가 보이지 않는다.
    let cost_sum = 0;
    let summed_rows = 0;
    let cost_rows = 0;
    for (const row of done_rows) {
      const u = row.usage;
      if (u && typeof u === 'object') {
        let row_reported = false;
        for (const field of SUM_FIELDS) {
          if (Number.isFinite(u[field])) {
            token_sum[field] += u[field];
            token_reported = true;
            row_reported = true;
          }
        }
        if (row_reported) {
          summed_rows += 1;
          if (Number.isFinite(u.total_cost_usd)) {
            cost_sum += u.total_cost_usd;
            cost_rows += 1;
          }
        }
      }
    }
    if (summed_rows > 0 && cost_rows === summed_rows) {
      token_sum.total_cost_usd = cost_sum;
    }
    const projections = done_rows
      .map((row) => row.usage)
      .filter((usage) => usage && typeof usage === 'object' && usage.providers);
    const token_total =
      projections.length > 0
        ? providerUsageBadges(mergeUsageProjections(projections))
        : token_reported
          ? formatUsageTotalWithCost(token_sum)
          : null;

    // 직렬 레인 뷰모델 (UI-04vo §4). 레인 파생 상태(lane_states)는 서버가
    // 스냅샷마다 다시 계산해 보낸다 — 구버전 서버에서는 둘 다 없어서 카드가
    // 그려지지 않는다 (fail-quiet).
    /** @type {Record<string, any>} */
    const lane_states_raw =
      q.lane_states &&
      typeof q.lane_states === 'object' &&
      !Array.isArray(q.lane_states)
        ? q.lane_states
        : {};
    const serial_lanes_raw = Array.isArray(q.serial_lanes)
      ? q.serial_lanes
      : [];
    /**
     * Ghost 행 배지: 점유 lineage의 현재 상태 문구 (UI-04vo §4).
     *
     * @param {string} bead_id
     */
    const occupantBadge = (bead_id) => {
      if (
        pr_wait_entries.some((/** @type {any} */ e) => e.bead_id === bead_id)
      ) {
        return 'PR 대기 · 점유';
      }
      const list = /** @type {any[]} */ (attempts).filter(
        (a) => a && a.bead_id === bead_id
      );
      const status = list.length > 0 ? list[list.length - 1].status : null;
      if (status === 'failed' || status === 'orphaned') {
        return '실패 · 점유 유지';
      }
      if (status === 'paused') {
        return '일시정지 · 점유';
      }
      return '실행 중 · 점유';
    };
    const serial_lanes = serial_lanes_raw
      .filter(
        (/** @type {any} */ lane) =>
          lane && typeof lane.id === 'string' && Array.isArray(lane.entries)
      )
      .map((/** @type {any} */ lane, /** @type {number} */ lane_index) => {
        const state = lane_states_raw[lane.id] || {};
        /** @type {Map<string, string>} */
        const correction_after = new Map(
          (Array.isArray(state.corrections) ? state.corrections : [])
            .filter(
              (/** @type {any} */ c) =>
                c &&
                typeof c.bead_id === 'string' &&
                typeof c.after === 'string'
            )
            .map((/** @type {any} */ c) => [c.bead_id, c.after])
        );
        const rows = toRows(
          lane.entries.filter(
            (/** @type {any} */ e) => !active_bead_ids.has(e.bead_id)
          ),
          lane.id
        ).map((/** @type {any} */ row) =>
          correction_after.has(row.id)
            ? {
                ...row,
                badges: [
                  `🔗 ${correction_after.get(row.id)} 뒤 (blocks 자동)`,
                  ...row.badges
                ]
              }
            : row
        );
        const occupied_by = Array.isArray(state.occupied_by)
          ? state.occupied_by.filter(
              (/** @type {any} */ id) => typeof id === 'string'
            )
          : [];
        const ghost_rows = occupied_by.map((/** @type {string} */ bead_id) => ({
          id: bead_id,
          title: idToTitle.get(bead_id) || bead_id,
          draggable: false,
          lane: lane.id,
          ghost: true,
          badges: [occupantBadge(bead_id)]
        }));
        return {
          id: lane.id,
          index: lane_index + 1,
          rows: [...ghost_rows, ...rows],
          occupied: occupied_by.length > 0,
          badge:
            occupied_by.length > 0 ? occupantBadge(occupied_by[0]) : '대기',
          cycle: state.cycle === true
        };
      });
    const serial_lane_count =
      typeof q.serial_lane_count === 'number'
        ? q.serial_lane_count
        : serial_lanes.length;

    return {
      queue: q,
      idToTitle,
      candidates,
      candidate_hidden: {
        blocked: filtered.hidden_blocked,
        spec: filtered.hidden_spec
      },
      running,
      live_count,
      slots,
      over_cap,
      failure,
      // 실행 중(leaf paused 포함) attempt가 있는 bead는 attempt가 끝날 때까지
      // 큐 항목이 남지만, 대기 컬럼에 같이 그리면 두 컬럼 동시 표시가 되므로
      // 실행 중 컬럼에만 보여준다.
      waiting: toRows(
        queue_entries.filter(
          (/** @type {any} */ e) => !active_bead_ids.has(e.bead_id)
        ),
        'queue'
      ),
      serial_lanes,
      serial_lane_count,
      // PR 대기 is its own column (worker-phase2 §7): a bead there is NOT done —
      // the PR is open and waiting for the human merge click. 완료 carries only
      // what actually merged and finished cleanup.
      pr_wait: pr_wait_entries
        .map((/** @type {any} */ e) =>
          prWaitRow(
            e.bead_id,
            idToTitle.get(e.bead_id) || e.bead_id,
            pr_obs,
            cleanup_failed[e.bead_id] || null,
            sumAttemptUsage(q.attempts || {}, e.bead_id),
            // The server's own progress wins; the local pending only covers the
            // window before the first snapshot carrying it arrives.
            pr_activity[e.bead_id] ||
              (merge_pending.has(e.bead_id) || cleanup_pending.has(e.bead_id)
                ? { activity: null, merge_progress: { step: 'merging' } }
                : null),
            conflict_sessions.get(e.bead_id) || null,
            // Overlaid by the server (UI-7agi §2) — absent on every durable row.
            e.external === true,
            {
              position: merge_positions.get(e.bead_id) || 0,
              active: merge_state.active === e.bead_id,
              failure: merge_failures[e.bead_id] || null,
              waiting:
                merge_waiting?.bead_id === e.bead_id
                  ? merge_waiting.reason
                  : null,
              resolution: merge_resolutions.get(e.bead_id),
              continuation_action: merge_continuations.get(e.bead_id),
              head_review: merge_head_reviews.get(e.bead_id) || null,
              authority: merge_authorities.get(e.bead_id) || null
            },
            // Also overlay-only (UI-w0hi §3): a durable row has no field here and
            // must keep the pre-existing behaviour, so absence reads as present.
            e.wt_present !== false,
            // 자동 모드가 꺼져 있으면 제외 기록은 이 행이 서 있는 이유가 아니다
            // (UI-yk55 §3.4) — 기록이 지워지는 시점도 자동 스캔이므로, 꺼진
            // 상태의 잔여 기록을 뱃지로 보이면 사실이 아닌 설명이 된다.
            q.auto_merge === true ? autoSkipReason(e.bead_id) : null,
            baseException(declared_base, prWaitTargetBase(e.bead_id)),
            q.completion_status &&
              typeof q.completion_status === 'object' &&
              !Array.isArray(q.completion_status)
              ? q.completion_status[e.bead_id] || null
              : null,
            q.discard_operations &&
              typeof q.discard_operations === 'object' &&
              !Array.isArray(q.discard_operations)
              ? q.discard_operations
              : {},
            attempt_by_id.get(last_attempt_by_bead.get(e.bead_id) || '')
              ?.worker_serial === true,
            q.auto_merge === true,
            {
              merge_sha: e.merge_sha,
              cleanup_cursor: e.cleanup_cursor,
              repo_operations: Array.isArray(q.repo_operations)
                ? q.repo_operations
                : []
            }
          )
        )
        .map((/** @type {any} */ row) => ({ ...row, ...timesOf(row.id) })),
      merge_queue_length: merge_queue.length,
      merge_queue_running: merge_queue.length > 0,
      // 자동 편입이 지금 건너뛸 행 (UI-yk55 §3.2). 버튼의 N은 "켜면 들어갈 수"를
      // 말하므로, 같은 head로 제외된 행을 세면 실제로는 0건이 편입되는데도
      // 양수를 보이게 된다.
      auto_excluded: pr_wait_entries
        .map((/** @type {any} */ e) => e.bead_id)
        .filter((/** @type {string} */ id) => autoSkipReason(id) !== null),
      declared_base,
      done: done_rows,
      token_total,
      cleanup_failures,
      // The RepoOperation lane's cards (master spec §10) — already projected by
      // the server, including which failure kind each resolve button names.
      repo_operations: Array.isArray(q.repo_operations) ? q.repo_operations : []
    };
  }

  /**
   * The control-bar analysis button (UI-yqw9 §4.4).
   *
   * It carries the progress badge because the dialog can be closed while a run
   * continues — without it, closing the dialog erases every trace that an
   * analysis is alive. The badge never disables the button: the point of the
   * indicator is to make the reader able to OPEN the dialog and watch.
   * Elapsed time deliberately stays in the dialog, so the control bar is not
   * re-rendered once a second.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function analysisButtonTemplate() {
    const analysis = analysisStore?.get();
    const running = !!analysis?.job;
    const preparing = !running && analysisStore?.isPending?.() === true;
    const badge = running ? '분석 중' : preparing ? '준비 중' : '';
    return html`<button
      type="button"
      class=${badge
        ? 'worker-analysis-btn worker-analysis-btn--running'
        : 'worker-analysis-btn'}
      aria-busy=${badge ? 'true' : 'false'}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${badge
        ? html`<span class="worker-analysis-btn__badge">${badge}</span>`
        : ''}
    </button>`;
  }

  /**
   * @param {ReturnType<typeof buildModel>} m
   * @returns {import('lit-html').TemplateResult}
   */
  function topTemplate(m) {
    const next_head = m.waiting.length > 0 ? m.waiting[0].id : '—';
    const play = html`<button
      type="button"
      class="worker-play${m.queue.auto_advance ? ' is-active' : ''}"
    >
      ${m.queue.auto_advance ? '⏸ 자동화 멈춤' : '▶ 자동화'}
    </button>`;
    // 자동 머지 토글은 실행/PR 패널 유무와 관계없이 툴바에 고정한다. 같은
    // 템플릿을 한 번만 삽입해 모바일 지금 패널·데스크톱 PR 대기 헤더 중복도
    // 피한다.
    const merge_all = mergeAllTemplate(m);
    const overcap = m.over_cap
      ? html`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`
      : '';
    // 세 카운트는 데스크톱 KPI 줄과 모바일 리본이 함께 쓴다 — 같은 수를 두 번
    // 정의하지 않기 위해 템플릿 하나로 둔다.
    const counts = html`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${m.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${m.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${doneRangeLabel()} 완료 <b>${m.done.length}</b></span
      >`;
    // 이 워크스페이스가 어디로 머지되는가 (UI-j6wa §3). 상시 표시 — base는 PR을
    // 여는 순간 되돌리기 어려운 선택이라, 예외가 생겼을 때만 나타나는 표시로는
    // 늦다. 읽지 못한 선언을 `main`으로 그리지는 않는다.
    const base_chip = html`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${m.declared_base
        ? '이 워크스페이스가 선언한 target base (docs/agents/repo-ops.toml). 디스패치 시점의 검증은 별도'
        : '선언 파일을 읽지 못했습니다 — target base 확인 불가'}
      >base ${m.declared_base || '?'}</span
    >`;
    const settings = html`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${MIN_SLOTS}
          step="1"
          .value=${String(m.slots)}
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
                ?selected=${m.serial_lane_count === n}
              >
                ${n}
              </option>`
          )}
        </select>
      </label>
      ${analysisStore ? analysisButtonTemplate() : ''} `;
    const banners = bannersTemplate({ failure: m.failure });
    // 정리 멈춤은 더 이상 배너가 아니라 타임라인의 한 항목이다 (§4.2) — 스트립의
    // 해결 필요 배지가 부르고, 클릭이 그 자리로 데려간다.
    const repo_operations = repoOpsStripTemplate(
      m.repo_operations,
      m.cleanup_failures
    );
    if (is_mobile) {
      // sticky 리본 (UI-58y2 §모바일 1)에는 두 자동화 토글과 세 카운트만 둔다.
      // 슬롯·⚙는 아래 조작 줄로 내리고 배너는 리본 밖에 남긴다 — 고정되는 것은
      // "항상 읽혀야 하는 한 줄"뿐이어야 하고, 배너가 같이 붙으면 스크롤할수록
      // 화면이 줄어든다.
      return html`<div class="worker-ribbon">
          ${play} ${merge_all}
          <div class="worker-kpi worker-kpi--ribbon">${overcap}${counts}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${settings}</div>
          <div class="worker-kpi">${base_chip}</div>
        </div>
        ${repo_operations}${repo_ops_settings.template()}${banners}`;
    }
    // 좌: 조작 / 우: KPI (UI-58y2 데스크톱 §툴바).
    return html`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${play}${merge_all}${settings}</div>
        <div class="worker-kpi">
          ${overcap}${counts}${base_chip}
          ${(Array.isArray(m.token_total)
            ? m.token_total
            : m.token_total
              ? [
                  {
                    label: m.token_total,
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
      ${repo_operations}${repo_ops_settings.template()}${banners}`;
  }

  /**
   * The mobile "지금" panel (UI-58y2 §모바일 2): 실행 중 타일과 PR 대기 행을 한
   * 패널로 묶어 리본 바로 아래에 둔다. 둘 다 0건이면 패널 자체를 렌더하지
   * 않는다 — 빈 관제 패널은 화면만 먹고 아무것도 말하지 않는다. 별도 상태 없이
   * 기존 타일/mini 템플릿을 재조합할 뿐이다.
   *
   * @param {ReturnType<typeof buildModel>} m
   * @returns {import('lit-html').TemplateResult|string}
   */
  function nowPanelTemplate(m) {
    if (m.running.length === 0 && m.pr_wait.length === 0) {
      return '';
    }
    const live = m.running.some((r) => !r.paused && r.failed !== true);
    return html`<section
      class="worker-now${live ? ' worker-pane--live' : ''}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${m.running.length + m.pr_wait.length}</span
        >
      </header>
      ${m.running.length > 0
        ? runningGridTemplate(m.running, Date.now(), selected_attempt)
        : ''}
      ${m.pr_wait.map((it) => miniRow(it))}
    </section>`;
  }

  /**
   * Candidate pane filter strip (UI-ki09). The pane header counts VISIBLE rows,
   * so each control carries the count it alone is hiding — "왜 안 보이지" has an
   * answer without opening anything.
   *
   * @param {ReturnType<typeof buildModel>} m
   * @returns {import('lit-html').TemplateResult}
   */
  function candidateControlsTemplate(m) {
    const hidden = m.candidate_hidden;
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
   * Candidate pane sort select (UI-raqh §2). It sits IN the pane header rather
   * than in the filter strip below it: the filters answer "what is shown", this
   * answers "in what order", and reading it as part of the header keeps the
   * strip about one question only.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function candidateSortTemplate() {
    return html`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${candidate_sort}
    >
      ${CANDIDATE_SORT_OPTIONS.map(
        (o) =>
          html`<option value=${o.value} ?selected=${candidate_sort === o.value}>
            ${o.label}
          </option>`
      )}
    </select>`;
  }

  /**
   * The 완료 pane period select (UI-d7pw §3.3). It lives in the pane's `controls`
   * strip, NOT in `header_control`: the 완료 pane is `collapsible` on mobile and
   * `paneTemplate` renders `header_control` only on the non-collapsible header
   * branch, so putting it there would make the select vanish on phones.
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
        ${CLOSED_RANGE_OPTIONS.map(
          (o) =>
            html`<option value=${o.value} ?selected=${done_range === o.value}>
              ${o.label}
            </option>`
        )}
      </select>
    </div>`;
  }

  /**
   * One serial lane card (UI-04vo §4): `직렬 N` header + 점유 배지, sequence
   * rows (ghost occupant first), and an always-droppable body — an empty lane
   * is a fixed drop target rather than nothing.
   *
   * @param {ReturnType<typeof buildModel>['serial_lanes'][number]} lane
   * @returns {import('lit-html').TemplateResult}
   */
  function serialLaneTemplate(lane) {
    const badge = html`<span
      class="worker-lane__badge${lane.occupied
        ? ' worker-lane__badge--held'
        : ''}"
      >${lane.badge}</span
    >`;
    const cycle_warning = lane.cycle
      ? html`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`
      : '';
    return paneTemplate({
      id: `worker-pane-lane-${lane.id}`,
      lane: /** @type {any} */ (lane.id),
      title: `직렬 ${lane.index}`,
      items: lane.rows,
      empty: '비어 있음 — 행을 여기로 드래그',
      header_control: badge,
      controls: /** @type {any} */ (cycle_warning)
    });
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
   * @param {ReturnType<typeof buildModel>} m
   * @returns {import('lit-html').TemplateResult|string}
   */
  function mergeAllTemplate(m) {
    const auto = m.queue.auto_merge === true;
    if (m.merge_queue_running) {
      return html`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${auto
          ? ' is-active'
          : ''}"
        title=${auto
          ? '자동 머지를 끄고 대기 중인 항목을 모두 뺍니다 (진행 중인 항목은 끝까지 수행)'
          : '대기 중인 항목을 모두 뺍니다 (진행 중인 항목은 끝까지 수행)'}
      >
        ${auto ? '⏸ 자동 머지 중단' : '일괄 머지 중단'} ${m.merge_queue_length}
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
    const excluded = new Set(m.auto_excluded);
    const count = m.pr_wait.filter(
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
   * @param {ReturnType<typeof buildModel>} m
   * @returns {import('lit-html').TemplateResult}
   */
  function lanesTemplate(m) {
    const candidate_pane = paneTemplate({
      id: 'worker-pane-candidate',
      lane: 'candidate',
      title: '후보 · Board 연동',
      items: m.candidates,
      src: true,
      empty: '후보 없음',
      header_control: candidateSortTemplate(),
      controls: candidateControlsTemplate(m),
      place_menu: currentPlaceMenu(m.candidates)
    });
    if (is_mobile) {
      // 관제 우선 배치 (UI-58y2 §모바일): 지금 → 대기 → 후보 → 완료. 실행 중과
      // PR 대기는 "지금" 패널이 가져가므로 레인으로 다시 그리지 않는다 — 같은
      // bead가 두 곳에 보이는 것이 이 화면에서 가장 비싼 오해다.
      return html`<div class="worker-lanes worker-lanes--mobile">
        ${nowPanelTemplate(m)}
        ${paneTemplate({
          id: 'worker-pane-queue',
          lane: 'queue',
          title: '병렬 대기',
          items: m.waiting,
          empty: '드래그 또는 [대기로 ↴]로 배치',
          collapsible: true,
          collapsed: lane_collapse.queue,
          preview: stripPreview(m.waiting)
        })}
        ${m.serial_lanes.map((lane) => serialLaneTemplate(lane))}
        ${candidate_pane}
        ${paneTemplate({
          id: 'worker-pane-done',
          lane: 'done',
          title: '완료',
          items: m.done,
          empty: `${doneRangeLabel()} 완료 없음`,
          controls: doneRangeTemplate(),
          collapsible: true,
          collapsed: lane_collapse.done,
          preview: Array.isArray(m.token_total)
            ? m.token_total.map((badge) => badge.label).join(' · ')
            : m.token_total || stripPreview(m.done)
        })}
      </div>`;
    }
    return html`<div class="worker-lanes">
      ${candidate_pane}
      <div class="worker-wait">
        ${paneTemplate({
          id: 'worker-pane-queue',
          lane: 'queue',
          title: '병렬 대기',
          items: m.waiting,
          empty: '드래그로 배치'
        })}
        ${m.serial_lanes.map((lane) => serialLaneTemplate(lane))}
      </div>
      ${paneTemplate({
        id: 'worker-pane-running',
        lane: 'running',
        title: `실행 중 · 슬롯 ${m.slots}`,
        items: m.running,
        live: m.running.some((r) => !r.paused && r.failed !== true),
        body: runningGridTemplate(m.running, Date.now(), selected_attempt)
      })}
      ${paneTemplate({
        id: 'worker-pane-pr-wait',
        lane: 'pr_wait',
        title: 'PR 대기',
        items: m.pr_wait,
        empty: 'PR 대기 없음'
      })}
      ${paneTemplate({
        id: 'worker-pane-done',
        lane: 'done',
        title: `완료 · ${doneRangeLabel()} ${m.done.length}`,
        items: m.done,
        empty: `${doneRangeLabel()} 완료 없음`,
        controls: doneRangeTemplate()
      })}
    </div>`;
  }

  /**
   * Adopt a new collapse state for one mobile lane: persist first, then
   * re-render, so a reload shows exactly what the last tap produced.
   *
   * @param {'queue'|'done'} lane
   */
  function toggleLaneCollapse(lane) {
    lane_collapse = { ...lane_collapse, [lane]: !lane_collapse[lane] };
    saveLaneCollapse(lane_collapse);
    doRender();
  }

  function doRender() {
    const m = buildModel();
    render(topTemplate(m), top_el);
    render(lanesTemplate(m), lanes_el);
  }

  /**
   * Publish the sticky app header's measured height as `--worker-ribbon-top`
   * (UI-58y2). The mobile layout scrolls the PAGE, so the ribbon's sticky stop
   * has to clear the header — and the header wraps to two rows on a phone, so
   * its height cannot be a constant. Measuring is the only honest source.
   */
  function watchHeaderOffset() {
    const header = document.querySelector('.app-header');
    if (!header) {
      return;
    }
    const apply = () => {
      const height = Math.round(header.getBoundingClientRect().height);
      console_el.style.setProperty('--worker-ribbon-top', `${height}px`);
    };
    apply();
    if (typeof ResizeObserver === 'function') {
      const ro = new ResizeObserver(apply);
      ro.observe(header);
      unsubscribers.push(() => ro.disconnect());
    } else {
      window.addEventListener('resize', apply);
      unsubscribers.push(() => window.removeEventListener('resize', apply));
    }
  }

  /**
   * Track the mobile breakpoint (UI-58y2). Registered as an unsubscriber like
   * every other live source so a destroyed view stops re-rendering; a runtime
   * with no `matchMedia` simply never registers one and stays desktop.
   */
  function watchViewport() {
    if (typeof window.matchMedia !== 'function') {
      return;
    }
    const mql = window.matchMedia(MOBILE_QUERY);
    is_mobile = !!mql.matches;
    /** @param {any} ev */
    const onViewportChange = (ev) => {
      const next = !!(ev && typeof ev.matches === 'boolean'
        ? ev.matches
        : mql.matches);
      if (next === is_mobile) {
        return;
      }
      is_mobile = next;
      doRender();
    };
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onViewportChange);
      unsubscribers.push(() =>
        mql.removeEventListener('change', onViewportChange)
      );
    } else if (typeof mql.addListener === 'function') {
      // Safari < 14 and jsdom shims that only carry the legacy API.
      mql.addListener(onViewportChange);
      unsubscribers.push(() => mql.removeListener(onViewportChange));
    }
  }

  // --- Native drag/drop (no library), mirroring board.js conventions. ---
  /**
   * The last pointerdown target. dragstart retargets to the draggable ancestor
   * (the row), so the press target is the only way to tell a row-body drag from
   * one that started on an interactive child (checkbox, button, link).
   *
   * @type {Element|null}
   */
  let press_target = null;

  /**
   * @param {PointerEvent} ev
   */
  function onPointerDown(ev) {
    press_target = ev.target instanceof Element ? ev.target : null;
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragStart(ev) {
    const target = /** @type {HTMLElement} */ (ev.target);
    const el = /** @type {HTMLElement|null} */ (
      target?.closest?.(
        '.worker-mini[draggable="true"], .worker-card[draggable="true"]'
      )
    );
    if (!el) {
      return;
    }
    // 인터랙티브 자식에서 시작한 드래그는 행 이동이 아니라 오조작이다 — 상태
    // 없는 유령 드래그가 남지 않도록 취소한다 (#124가 grip 전용화로 지키던
    // 체크박스 보호를, 행 전체 드래그로 되돌리면서 이 판정으로 유지).
    if (
      press_target &&
      el.contains(press_target) &&
      press_target.closest('input, button, a')
    ) {
      ev.preventDefault();
      return;
    }
    const bead_id = el.dataset.beadId || '';
    const from_lane = el.dataset.lane || '';
    dragging = { bead_id, from_lane };
    try {
      ev.dataTransfer?.setData('text/plain', bead_id);
      if (ev.dataTransfer) {
        ev.dataTransfer.effectAllowed = 'move';
      }
    } catch {
      /* ignore */
    }
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragOver(ev) {
    const pane = /** @type {HTMLElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-pane')
    );
    if (!pane) {
      return;
    }
    // Only the panes a drop actually mutates accept one — the candidate feed,
    // the parallel waiting lane, and the serial lanes. 실행 중/PR 대기/완료 are
    // observation columns — the server puts beads there — so they must not
    // light up as drop targets and then silently swallow the drag.
    const lane = pane.dataset.lane || '';
    if (lane !== 'candidate' && lane !== 'queue' && !/^s[1-5]$/.test(lane)) {
      return;
    }
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = 'move';
    }
    pane.classList.add('worker-pane--drag-over');
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragLeave(ev) {
    const pane = /** @type {HTMLElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-pane')
    );
    pane?.classList.remove('worker-pane--drag-over');
  }

  /**
   * Candidate→candidate manual reorder (spec §4): build the lane's desired final
   * order (dragged bead spliced at the target) from the merged candidate issues,
   * then hand it to the shared reorder controller (optimistic rank apply +
   * CAS-retry-once), mirroring the Board same-column path. The rank math needs
   * the raw issues' `created_at`, so it reads {@link candidate_issues} rather than
   * the projected rows.
   *
   * @param {string} bead_id
   * @param {HTMLElement|null} over - The `.worker-card` under the cursor, if any.
   */
  function reorderCandidates(bead_id, over) {
    const dragged = candidate_issues.find((it) => it.id === bead_id);
    if (!dragged) {
      return;
    }
    const without = candidate_issues.filter((it) => it.id !== bead_id);
    let insert_index = without.length;
    if (over) {
      const over_id = over.dataset.beadId;
      if (over_id === bead_id) {
        // Dropped onto itself — no move.
        return;
      }
      const j = without.findIndex((it) => it.id === over_id);
      if (j >= 0) {
        insert_index = j;
      }
    }
    const final_list = without.slice();
    final_list.splice(insert_index, 0, dragged);
    void reorder.applyReorder(bead_id, final_list, insert_index);
  }

  /**
   * @param {DragEvent} ev
   */
  function onDrop(ev) {
    const pane = /** @type {HTMLElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-pane')
    );
    if (!pane) {
      return;
    }
    ev.preventDefault();
    pane.classList.remove('worker-pane--drag-over');
    const to_lane = pane.dataset.lane || '';
    const bead_id =
      dragging?.bead_id || ev.dataTransfer?.getData('text/plain') || '';
    const from_lane = dragging?.from_lane || '';
    dragging = null;
    if (!bead_id) {
      return;
    }

    // Drop index = position of the row under the cursor, else append. Candidate
    // rows are `.worker-card`, queue rows are `.worker-mini` — match both.
    const over = /** @type {HTMLElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.(
        '.worker-mini, .worker-card'
      )
    );
    const minis = Array.from(
      pane.querySelectorAll('.worker-mini, .worker-card')
    );
    let index = minis.length;
    if (over) {
      const i = minis.indexOf(over);
      if (i >= 0) {
        index = i;
      }
    }
    // ghost 점유 행은 대기 entries의 구성원이 아니므로 서버 인덱스에서 뺀다.
    index = Math.max(
      0,
      index - pane.querySelectorAll('.worker-mini--ghost').length
    );
    // 접힌 스트립은 행을 하나도 그리지 않으므로 위 계산이 0(=큐 맨 앞)을 낸다.
    // 스트립에 떨어뜨린 사람이 원한 것은 "대기에 넣기"이지 "다음으로 실행"이
    // 아니므로, 버튼과 같은 큐 말미 의미로 맞춘다 (UI-58y2 §모바일 3).
    if (pane.classList.contains('worker-pane--collapsed')) {
      index = queueTailIndex();
    }

    if (to_lane === 'candidate') {
      // Candidate→candidate = manual reorder in the shared rank map (spec §4).
      if (from_lane === 'candidate') {
        reorderCandidates(bead_id, over);
        return;
      }
      // Moving a waiting bead back to candidates removes it from the queue.
      if (from_lane === 'queue' || /^s[1-5]$/.test(from_lane)) {
        void removeBead(bead_id);
      }
      return;
    }
    // 병렬(`queue`) ↔ 직렬(`s1`..`s5`) 공용 드롭 (UI-04vo §4): 같은 레인 안은
    // reorder, 레인이 다르면 place가 원 레인 제거 + 삽입을 한 번에 한다. ghost
    // 점유 행은 draggable=false라 여기 도달하지 않는다.
    if (to_lane === 'queue' || /^s[1-5]$/.test(to_lane)) {
      const target_lane = /** @type {any} */ (
        to_lane === 'queue' ? 'parallel' : to_lane
      );
      if (from_lane === to_lane) {
        void reorderBead(bead_id, target_lane, index);
      } else {
        // 레인에 처음 들어오는 드롭은 index를 보내지 않는다 (UI-mwju): 후보
        // 카드의 [대기로 ↴]/배치 메뉴와 같은 "맨 뒤에 붙이기" 의미로 맞춘다.
        // 서버 `queue-store.place`는 index가 없으면 append한다.
        void placeBead(bead_id, target_lane);
      }
    }
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
   * Adopt a new candidate sort mode (UI-raqh §2): persist first, then re-render,
   * so a reload shows exactly what the last selection produced.
   *
   * @param {CandidateSort} next
   */
  function setCandidateSort(next) {
    candidate_sort =
      next === 'board' || next === 'created' || next === 'spec'
        ? next
        : CANDIDATE_SORT_DEFAULT;
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
    done_range = isClosedRange(next) ? next : DEFAULT_CLOSED_RANGE;
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
      setCandidateSort(
        /** @type {CandidateSort} */ (
          sort_select.value || CANDIDATE_SORT_DEFAULT
        )
      );
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
   * The two projections the timeline derives from (§4.2). Both already ride the
   * queue snapshot — opening the drawer queries nothing.
   *
   * @returns {{ operations: any, cleanup_failures: any, repo: string }}
   */
  function repoOpsDrawerInput() {
    const model = buildModel();
    return {
      operations: model.repo_operations,
      cleanup_failures: model.cleanup_failures,
      repo: (getWorkspacePath && getWorkspacePath()) || ''
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
    selected_analysis_run = null;
    repo_ops_drawer.close();
    repo_ops_drawer_el.hidden = true;
    drawer_overlay_el.hidden = false;
    drawer.open({ attempt_id, meta: metaForAttempt(a) });
    doRender();
  }

  /**
   * Open the shared transcript drawer for an analyzer run. Analysis runs have
   * no queue attempt record, so the dialog supplies the display-only meta and
   * this seam only binds the run id to the existing session-log protocol.
   *
   * @param {string} run_id
   * @param {import('./transcript-drawer.js').DrawerMeta} meta
   */
  function openDrawerForAnalysisRun(run_id, meta) {
    selected_attempt = null;
    selected_analysis_run = run_id;
    repo_ops_drawer.close();
    repo_ops_drawer_el.hidden = true;
    drawer_overlay_el.hidden = false;
    // The analyzer's prompt lives on the analysis channel, not on
    // `get-attempt-prompt`, so the attempt toggle would answer for the wrong
    // store; the dialog owns the [프롬프트] surface for a run.
    drawer.open({ attempt_id: run_id, meta, hide_prompt: true });
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
    if (selected_analysis_run) {
      // Analysis runs live in the analysis snapshot, not the queue: the session
      // id lands after open() just as it does for an attempt, and a run that
      // vanished means the store was cleared (workspace switch).
      const run = (analysisStore?.get()?.runs || []).find(
        (/** @type {any} */ item) => item.run_id === selected_analysis_run
      );
      if (run) {
        drawer.updateMeta(analysisRunDrawerMeta(run));
      } else {
        drawer.close();
      }
      return;
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
   * @param {MouseEvent} ev
   */
  function onClick(ev) {
    const target = /** @type {HTMLElement} */ (ev.target);
    if (target?.closest?.('.worker-mini__serial, .worker-mini__grip')) {
      return;
    }
    // Clicks inside the analysis dialog are owned by its own handlers.
    if (target?.closest?.('#worker-parallel-analysis-dialog')) {
      return;
    }
    if (target?.closest?.('.worker-analysis-btn')) {
      parallel_analysis_dialog?.open();
      return;
    }
    if (
      target?.closest?.('.worker-repo-strip') ||
      target?.closest?.('.worker-mini__timeline')
    ) {
      openRepoOpsDrawer();
      return;
    }
    const repoOpSession = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-repo-op__session')
    );
    if (repoOpSession) {
      const attempt_id = repoOpSession.dataset.attemptId;
      if (attempt_id) {
        openDrawerForAttempt(attempt_id);
      }
      return;
    }
    const repoOpResolve = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-repo-op__resolve')
    );
    if (repoOpResolve) {
      void resolveRepoOperation(repoOpResolve.dataset.operationId || '');
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
    // The failure banner's ↻ resumes the newest eligible failed attempt (§1).
    const resumeBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-banner__resume')
    );
    if (resumeBtn) {
      const att = resumeBtn.dataset.attemptId;
      if (att) {
        void resumeAttempt(att);
      }
      return;
    }
    const bannerDiscardBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-banner__discard')
    );
    if (bannerDiscardBtn) {
      const confirmation =
        bannerDiscardBtn.dataset.confirmation === 'merged'
          ? 'merged'
          : 'unmerged';
      void discardBead(
        bannerDiscardBtn.dataset.beadId || '',
        bannerDiscardBtn.dataset.attemptId || null,
        confirmation,
        bannerDiscardBtn.dataset.operationId || null
      );
      return;
    }
    // The failure banner's ✕ marks that same attempt handled.
    const dismissBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-banner__dismiss')
    );
    if (dismissBtn) {
      const att = dismissBtn.dataset.attemptId;
      if (att) {
        void dismissAttempt(att);
      }
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
    // 접힌 레인 스트립 ↔ 펼침 (UI-58y2 §모바일 3/5).
    const lane_toggle = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-pane__hd--toggle')
    );
    if (lane_toggle) {
      const lane = lane_toggle.dataset.lane;
      if (lane === 'queue' || lane === 'done') {
        toggleLaneCollapse(lane);
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
        void placeBead(
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
          void placeBead(id, 'parallel');
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
    // Tile controls act on the attempt and must never also open the drawer.
    if (target?.closest?.('.rtile__discard')) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const bead_id = tile?.dataset?.beadId;
      const att = tile?.dataset?.attemptId;
      if (bead_id) {
        void discardBead(
          bead_id,
          att || null,
          'unmerged',
          /** @type {HTMLElement|null} */ (target?.closest?.('.rtile__discard'))
            ?.dataset.operationId || null
        );
      }
      return;
    }
    if (target?.closest?.('.rtile__dismiss')) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const att = tile?.dataset?.attemptId;
      if (att) {
        void dismissAttempt(att);
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
      }
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
      if (id && gotoIssue) {
        gotoIssue(id);
      }
    }
  }

  mount_element.addEventListener(
    'pointerdown',
    /** @type {any} */ (onPointerDown)
  );
  mount_element.addEventListener('dragstart', /** @type {any} */ (onDragStart));
  mount_element.addEventListener('dragover', /** @type {any} */ (onDragOver));
  mount_element.addEventListener('dragleave', /** @type {any} */ (onDragLeave));
  mount_element.addEventListener('drop', /** @type {any} */ (onDrop));
  mount_element.addEventListener('click', /** @type {any} */ (onClick));
  mount_element.addEventListener('change', /** @type {any} */ (onChange));

  watchViewport();
  watchHeaderOffset();

  if (selectors) {
    unsubscribers.push(
      selectors.subscribe(() => {
        for (const [identity, state] of session_report_cache) {
          if (state === 'failed') {
            session_report_cache.delete(identity);
          }
        }
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
  // 분석 진행 표시 (UI-yqw9 §4.4): the control-bar button reads both the
  // server's job and this browser's preparation flag, so the view must
  // re-render on either transition. The unsubscribe rides the same list every
  // other live source uses, so a destroyed view stops re-rendering.
  if (analysisStore && typeof analysisStore.subscribe === 'function') {
    unsubscribers.push(
      analysisStore.subscribe(() => {
        refreshOpenDrawerMeta();
        doRender();
      })
    );
  }

  doRender();

  return {
    load() {
      void ensureSessionDefaults();
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
      mount_element.removeEventListener(
        'pointerdown',
        /** @type {any} */ (onPointerDown)
      );
      mount_element.removeEventListener(
        'dragstart',
        /** @type {any} */ (onDragStart)
      );
      mount_element.removeEventListener(
        'dragover',
        /** @type {any} */ (onDragOver)
      );
      mount_element.removeEventListener(
        'dragleave',
        /** @type {any} */ (onDragLeave)
      );
      mount_element.removeEventListener('drop', /** @type {any} */ (onDrop));
      mount_element.removeEventListener('click', /** @type {any} */ (onClick));
      mount_element.removeEventListener(
        'change',
        /** @type {any} */ (onChange)
      );
      try {
        drawer.destroy();
      } catch {
        /* ignore */
      }
      drawer_overlay_el.hidden = true;
      try {
        parallel_analysis_dialog?.destroy();
      } catch {
        /* ignore */
      }
      try {
        repo_ops_script_viewer.destroy();
      } catch {
        /* ignore */
      }
      render(html``, mount_element);
    }
  };
}
