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
import { copyToClipboard } from '../../utils/clipboard.js';
import { resolveContinuationMismatch } from '../../utils/continuation-dialog.js';
import { selectCurrentChild } from '../../utils/current-child.js';
import { coerceTimestampMs } from '../../utils/relative-time.js';
import { parseReport } from '../../utils/report-marker.js';
import { showToast } from '../../utils/toast.js';
import {
  SUM_FIELDS,
  formatUsageTotalWithCost,
  mergeUsageProjections,
  providerUsageBadges,
  sumAttemptUsage
} from '../../utils/token-usage.js';
import { isWorkerIneligible } from '../../utils/worker-eligibility.js';
import {
  WORKER_SERIAL_LABEL,
  isWorkerSerial
} from '../../utils/worker-serial.js';
import { createReorderController } from '../reorder.js';
import { createExecDefaultsDialog } from './exec-defaults-dialog.js';
import {
  discardCompletionMessage,
  discardConfirmationMessage,
  discardProjection,
  miniRow,
  paneTemplate,
  repoOpsStripTemplate
} from './lanes.js';
import {
  cleanupStalledReason,
  cleanupStepLabel,
  mergeStepView
} from './merge-steps.js';
import { createRepoOpsDrawer } from './repo-ops-timeline.js';
import { bannersTemplate, runningGridTemplate } from './running-grid.js';
import { createTranscriptDrawer } from './transcript-drawer.js';

export { mergeStepView } from './merge-steps.js';

const READY_KEY = 'tab:worker:ready';
const BLOCKED_KEY = 'tab:worker:blocked';
/**
 * The Worker tab's own in_progress subscription (UI-53es §2). It exists for one
 * reason: the running tile's 현재 단계 줄 needs the bead's in_progress CHILD,
 * and a child is an in_progress issue like any other.
 */
const IN_PROGRESS_KEY = 'tab:worker:in-progress';
const CLOSED_KEY = 'tab:worker:closed';

/**
 * Lower bound on the concurrency cap, mirroring the server's `MIN_SLOTS`
 * (worker-phase2 §3). The server rejects anything below it; the editor clamps
 * so a stray keystroke never sends a value that would just bounce.
 *
 * @type {number}
 */
const MIN_SLOTS = 1;

/** @type {Set<string>} Scheduler terminal attempt statuses. */
const TERMINAL_ATTEMPT_STATUSES = new Set([
  'done',
  'failed',
  'orphaned',
  'stopped',
  'discarded'
]);

/**
 * @param {any} issue
 * @returns {boolean} Whether the bead is queue-eligible (spec present, §5.4).
 */
function hasSpec(issue) {
  return resolveSpecId(issue).path.length > 0;
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
 * The flattened `parent` edge (same field Board's `parentIdOf` reads), or ''
 * for a top-level issue.
 *
 * @param {any} issue
 * @returns {string}
 */
function parentIdOf(issue) {
  const raw = issue && issue.parent;
  if (typeof raw === 'string') {
    return raw;
  }
  if (raw && raw.id) {
    return String(raw.id);
  }
  return '';
}

/**
 * @param {any} issue
 * @returns {string} 🔒 + dependency target for a blocked candidate.
 */
function blockedReason(issue) {
  const deps = Array.isArray(issue?.dependencies) ? issue.dependencies : [];
  const ids = deps
    .map((/** @type {any} */ d) => (typeof d === 'string' ? d : d && d.id))
    .filter(Boolean);
  return ids.length > 0 ? `🔒 ${ids.join(', ')}` : '🔒 blocked';
}

/**
 * Gate tiers whose badge reports something a HUMAN has to act on rather than
 * something to wait out: the PR was closed without a merge (worker-phase2 §4 —
 * not a completion, the bead stays put), or the observation itself could not be
 * decided (§5 fail-closed).
 *
 * @type {string[]}
 */
const ALERT_GATE_TIERS = ['closed_unmerged', 'review', 'undecidable'];

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
    default:
      return reason;
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
      badge = 'root 재검증 중';
      break;
    case 'repairing':
      badge =
        completion.subject_role === 'root'
          ? `자동복구 ${used}/${cap} · 원 PR 수정 중`
          : `자동복구 ${used}/${cap} · repair PR 준비 중`;
      break;
    case 'waiting_repair_pr':
      badge = repair_number
        ? `repair PR #${repair_number} 대기`
        : 'repair PR 대기';
      break;
    case 'merging':
      badge =
        completion.subject_role === 'repair'
          ? repair_number
            ? `repair PR #${repair_number} 머지 중`
            : 'repair PR 머지 중'
          : 'root 머지 중';
      break;
    case 'cleaning':
      badge = '정리 복구 중';
      break;
    case 'paused':
      badge = '자동복구 일시정지';
      break;
    case 'needs_human':
      badge = `사람 확인 필요 · ${completion.terminal_reason || '원인 미상'}`;
      break;
    case 'completed':
      return null;
    default:
      return null;
  }

  /** @type {string[]} */
  const details = [`복구 세션 ${used}/${cap}`];
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
 * @param {{ position: number, active: boolean, failure: string|null, resolution?: import('../../data/worker-queue-store.js').ResolutionProjection|null, continuation_action?: any }|null} [merge_queue]
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
  worker_serial = false
) {
  const queued = !!merge_queue && merge_queue.position > 0;
  const continuation_required =
    !!merge_queue?.continuation_action &&
    merge_queue.continuation_action.continuation === null;
  const queue_active = !!merge_queue && merge_queue.active === true;
  const queue_failure = (merge_queue && merge_queue.failure) || null;
  const obs = observations[bead_id] || null;
  const gate = obs && obs.gate ? obs.gate : null;
  const pr = obs && obs.pr ? obs.pr : null;
  const recovery = completionView(completion);
  const resolution = resolutionView(
    merge_queue ? merge_queue.resolution : null
  );
  /** @type {string[]} */
  const badges = [];
  if (external) {
    badges.push('세션');
  }
  const conflict_badge =
    conflict_session === 'paused'
      ? '충돌 해소 일시정지'
      : resolution
        ? resolution.badge
        : conflict_session === 'running'
          ? '충돌 해소 중'
          : null;
  const substituted = activityBadge(
    external && gate && gate.tier === 'closed_unmerged'
      ? '닫힘'
      : (gate && gate.gate_badge) || '',
    // A resolution session outranks poller activity (UI-dxgz §1): the row has
    // one live slot, and "what is being done about the conflict" is the state a
    // reader has to act on, not that a gh round-trip is in flight.
    conflict_badge ? null : (active && active.activity) || null
  );
  if (conflict_badge) {
    badges.push(conflict_badge);
  }
  if (substituted.label) {
    badges.push(substituted.label);
  }
  if (gate && gate.base_badge && gate.base_badge !== gate.gate_badge) {
    badges.push(gate.base_badge);
  }
  // 이 행의 PR이 선언 base가 아닌 곳을 향하고 있다 (UI-j6wa §3). 게이트의
  // base_badge(충돌/뒤처짐)와 다른 사실 — 저쪽은 "머지할 수 있는가", 이쪽은
  // "어디로 머지되는가"다.
  if (base_exception) {
    badges.push(base_exception);
  }
  // 「어디서 멈췄나」가 「실패했다」보다 행동 가능한 사실이다 (§4.4). 단계를
  // 모르는 기록은 단계 없이 그대로 말한다 — 추측하지 않는다.
  if (cleanup_failed) {
    const stopped = cleanupStepLabel(cleanup_failed.step);
    badges.push(stopped ? `정리 멈춤 · ${stopped}` : '정리 멈춤');
  }
  if (recovery) {
    badges.push(recovery.badge);
  }
  // Its place in line, or why it lost it (UI-5v7d §4). The waiting badge is the
  // only thing that tells a reader why a row with a green gate is sitting still,
  // and the failure badge is non-durable — it describes the run that just ended.
  if (queued && !queue_active) {
    badges.push(`머지 대기 #${merge_queue.position}`);
  }
  if (queue_failure) {
    badges.push(`일괄 머지 실패: ${mergeFailureText(queue_failure)}`);
  }
  if (continuation_required) {
    badges.push('이어하기 선택 필요');
  }
  // 자동 모드가 켜져 있는데 이 행만 서 있는 이유 (UI-yk55 §3.4). 실패 뱃지는
  // 프로세스가 살아 있는 동안만 남지만 제외 기록은 durable하므로, 재시작 뒤에도
  // "왜 이 행은 안 도는가"에 답하는 것은 이쪽뿐이다.
  if (auto_skip) {
    badges.push(`자동 제외: ${mergeFailureText(auto_skip)}`);
  }
  const conflicting = !!gate && gate.base_badge === '충돌';
  const enabled = !!gate && gate.enabled === true;
  // A merge in flight owns the row: both buttons go quiet until it settles, so
  // a second click cannot land on an action the server would refuse anyway.
  const merge_step = mergeStepView(
    active && active.merge_progress ? active.merge_progress.step : null
  );
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
  // An external conflict WITHOUT a worktree has nowhere to run: the dispatch
  // never recreates one (UI-w0hi 제외), so the button would refuse every time.
  // The badge reports the conflict; the user resolves it in their own session.
  const external_conflict_unresolvable =
    external && conflicting && wt_present === false;
  const discard = discardProjection(discard_operations, bead_id, {
    external,
    merge_active: queue_active || !!merge_step,
    merge_queued: queued,
    conflict_active: !!conflict_session,
    cleanup_active: false,
    merged: !!cleanup_failed || gate?.tier === 'merged'
  });
  const discard_blocks_merge = !!discard.operation;
  const repo_operations_action_blocked =
    !cleanup_retry &&
    !!cleanup_failed &&
    cleanup_failed.step === 'repo_operations';
  return {
    id: bead_id,
    title,
    reason: cleanup_failed
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
    completion_badge: recovery ? recovery.badge : null,
    completion_title: recovery ? recovery.title : '',
    completion_repair_pr_url: recovery ? recovery.repair_pr_url : '',
    completion_repair_pr_number: recovery ? recovery.repair_pr_number : null,
    badges,
    // Which badge (if any) reports live server activity rather than a settled
    // state — the row draws that one with the breathing dot and no colour
    // emphasis, because nobody has to act on it.
    live_badge:
      conflict_session === 'paused'
        ? // A paused resolution session is a settled state, not live work:
          // the badge shows, the breathing dot does not.
          null
        : resolution?.live || conflict_session === 'running'
          ? conflict_badge
          : substituted.live
            ? substituted.label
            : null,
    usage,
    alert:
      (!!gate && ALERT_GATE_TIERS.includes(gate.tier)) ||
      !!cleanup_failed ||
      !!queue_failure ||
      !!(recovery && recovery.alert),
    // A queued row has nothing to click but [취소]: the merge is the driver's
    // now, and a second [머지] would only be a no-op re-queue (UI-5v7d §4).
    merge_action: repo_operations_action_blocked
      ? false
      : !queued || continuation_required,
    // 머지 액션이 저장소 작업 단계에서 잠긴 카드 (§4.4): 잠금 사유를 문장으로
    // 반복하는 대신, 그 사유가 실제로 적혀 있는 타임라인으로 데려간다.
    timeline_action: repo_operations_action_blocked,
    cancel_action: queued && !continuation_required,
    cancel_enabled: !queue_active && !(recovery && recovery.lock_actions),
    cancel_title:
      recovery && recovery.lock_actions
        ? '자동복구 중 — 중단하려면 상단 자동 머지 중단을 사용하세요'
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
      !conflict_session &&
      !discard_blocks_merge &&
      !(recovery && recovery.lock_actions) &&
      !external_conflict_unresolvable &&
      !repo_operations_action_blocked &&
      (enabled || conflicting || cleanup_retry || external_cleanup),
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
 * @param {{ transport?: (type: string, payload?: unknown) => Promise<any>, issueStores?: any, queueStore?: any, execPresetStore?: any, sessionLogStore?: any, uiOrderStore?: import('../reorder.js').UiOrderStore, gotoIssue?: (id: string) => void, getWorkspacePath?: () => (string|undefined), doneRange?: import('../../data/closed-range.js').ClosedRange, onDoneRangeChange?: (range: import('../../data/closed-range.js').ClosedRange) => void }} [options]
 * @returns {{ load: () => void, openExecDefaults: () => void, destroy: () => void }}
 */
export function createWorkerView(mount_element, options = {}) {
  const {
    transport,
    issueStores,
    queueStore,
    execPresetStore,
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
  /** @type {Set<string>} Browser-local waiting-row execution-mode selection. */
  const selected_queue_ids = new Set();
  /** @type {'ordinary'|'serial'} */
  let selected_execution_mode = 'ordinary';
  /** @type {boolean} Whether a sequential execution-mode batch is running. */
  let execution_mode_pending = false;
  /** @type {Map<string, boolean|null>} Latest tri-state execution mode by bead. */
  const worker_serial_by_id = new Map();
  /** @type {Array<() => void>} */
  const unsubscribers = [];

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

  // Workspace-global exec-defaults dialog (⚙ in the ctrl bar). It owns its own
  // queueStore subscription so an open dialog re-renders as snapshots arrive.
  const exec_defaults_dialog = createExecDefaultsDialog(console_el, {
    queueStore,
    presetStore: execPresetStore,
    transport
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
        pr_wait_holds_slot: false,
        slots: MIN_SLOTS,
        queue: [],
        pr_wait: [],
        done: []
      }
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
   * The index that appends to the waiting queue — what both the collapsed-strip
   * drop and [대기로 ↴] mean by "큐 말미" (UI-58y2).
   *
   * @returns {number}
   */
  function queueTailIndex() {
    const entries = currentQueue().queue;
    return Array.isArray(entries) ? entries.length : 0;
  }

  /**
   * Place a bead into the waiting queue at an index, retrying ONCE on a CAS
   * conflict.
   *
   * @param {string} bead_id
   * @param {number} index
   */
  async function placeBead(bead_id, index) {
    if (!transport) {
      return;
    }
    const res = await transport('worker-queue-place', {
      bead_id,
      index,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-place', {
        bead_id,
        index,
        expected_revision: currentRevision()
      }).then(adopt);
    }
  }

  /**
   * @param {string} bead_id
   * @param {number} to_index
   */
  async function reorderBead(bead_id, to_index) {
    if (!transport) {
      return;
    }
    const res = await transport('worker-queue-reorder', {
      bead_id,
      to_index,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-reorder', {
        bead_id,
        to_index,
        expected_revision: currentRevision()
      }).then(adopt);
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
   * Apply the selected execution mode one Bead at a time. Generic label replies
   * are `bd show` objects; the app transport turns rejected mutations into `[]`,
   * so only a matching issue id and requested label truth is a successful write.
   */
  async function applyExecutionMode() {
    if (!transport || execution_mode_pending) {
      return;
    }
    const entries = Array.isArray(currentQueue().queue)
      ? currentQueue().queue
      : [];
    const ids = entries
      .map((/** @type {any} */ entry) => entry.bead_id)
      .filter((/** @type {any} */ id) => selected_queue_ids.has(id));
    if (ids.length === 0) {
      return;
    }
    if (
      ids.some((/** @type {string} */ id) => {
        const state = worker_serial_by_id.get(id);
        return state !== true && state !== false;
      })
    ) {
      showToast('실행 방식 확인 중', 'warning');
      return;
    }
    const desired_serial = selected_execution_mode === 'serial';
    const mutations = ids.filter(
      (/** @type {string} */ id) =>
        worker_serial_by_id.get(id) !== desired_serial
    );
    if (mutations.length === 0) {
      selected_queue_ids.clear();
      doRender();
      showToast('이미 같은 실행 방식입니다', 'info');
      return;
    }
    execution_mode_pending = true;
    doRender();
    /** @type {string[]} */
    const failed_ids = [];
    let changed = 0;
    try {
      for (const id of mutations) {
        const result = await Promise.resolve(
          transport(desired_serial ? 'label-add' : 'label-remove', {
            id,
            label: WORKER_SERIAL_LABEL
          })
        ).catch(() => []);
        const issue = Array.isArray(result) ? result[0] : result;
        const labels = issue && typeof issue === 'object' ? issue.labels : null;
        if (
          issue &&
          typeof issue === 'object' &&
          issue.id === id &&
          Array.isArray(labels) &&
          isWorkerSerial(labels) === desired_serial
        ) {
          changed += 1;
        } else {
          failed_ids.push(id);
        }
      }
      if (failed_ids.length === 0) {
        selected_queue_ids.clear();
        showToast(`${changed}개 실행 방식 변경`, 'success');
        return;
      }
      selected_queue_ids.clear();
      for (const id of failed_ids) {
        selected_queue_ids.add(id);
      }
      showToast(
        `${mutations.length}개 중 ${changed}개 변경 · ${failed_ids.length}개 실패 (${failed_ids.join(', ')})`,
        'error'
      );
    } finally {
      execution_mode_pending = false;
      doRender();
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
    /** @param {Record<string, unknown>} extra */
    const send = async (extra = {}) =>
      /** @type {any} */ (
        await transport('worker-attempt-resume', {
          attempt_id,
          expected_revision: currentRevision(),
          ...extra
        })
      );
    let res = await send();
    adopt(res);
    if (res && res.conflict) {
      res = /** @type {any} */ (
        await transport('worker-attempt-resume', {
          attempt_id,
          expected_revision: currentRevision()
        })
      );
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
    showToast(
      '머지 큐에 넣지 못했습니다 (이미 대기 중이거나 대상 아님)',
      'error',
      2400
    );
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
      typeof globalThis.confirm !== 'function' || globalThis.confirm(message);
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
   * Toggle serial dispatch through the durable PR-wait lifecycle.
   *
   * @param {boolean} on
   */
  async function setPrWaitHoldsSlot(on) {
    if (!transport) {
      return;
    }
    const res = await transport('worker-queue-set-pr-wait-hold', {
      on,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-set-pr-wait-hold', {
        on,
        expected_revision: currentRevision()
      }).then(adopt);
    }
  }

  /**
   * Build the render view-model from live issue stores + the queue snapshot.
   *
   * @returns {{ queue: any, idToTitle: Map<string, string>, candidates: any[], candidate_hidden: { blocked: number, spec: number }, running: any[], live_count: number, slots: number, over_cap: boolean, failure: any, waiting: any[], pr_wait: any[], merge_queue_length: number, merge_queue_running: boolean, auto_excluded: string[], declared_base: string|null, done: any[], token_total: string|Array<{ provider: 'claude'|'codex', label: string, tooltip: string }>|null, cleanup_failures: Array<{ bead_id: string, step: string, reason: string, detail: string|null, output_tail?: string, log_path?: string }>, repo_operations: any[] }}
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
    // 실행 타일의 현재 단계 줄이 읽는 자식 집합 (UI-53es §2). 후보 레인에는
    // 쓰이지 않는다 — in_progress bead는 후보가 아니다.
    const in_progress = selectors
      ? selectors.selectBoardColumn(IN_PROGRESS_KEY, 'in_progress')
      : [];
    /** @type {Map<string, Array<{ id: string, title?: string, status?: string, updated_at?: number|string }>>} */
    const children_by_parent = new Map();
    for (const it of in_progress) {
      const parent = parentIdOf(it);
      if (!parent) {
        continue;
      }
      const arr = children_by_parent.get(parent);
      if (arr) {
        arr.push(it);
      } else {
        children_by_parent.set(parent, [it]);
      }
    }
    /**
     * The current in_progress child's title, or null (fail-quiet).
     *
     * @param {string} bead_id
     * @returns {string|null}
     */
    const currentChildTitleOf = (bead_id) => {
      const child = selectCurrentChild(children_by_parent.get(bead_id) || []);
      return child ? child.title || child.id : null;
    };

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

    // Server decoration is a partial source, so a missing key remains unknown.
    // A confirmed mutation refresh can be newer than the live Ready/Blocked
    // snapshot; only a provably newer live issue may overwrite that cache row.
    worker_serial_by_id.clear();
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
    for (const [bead_id, labels] of Object.entries(bead_labels)) {
      if (Array.isArray(labels)) {
        worker_serial_by_id.set(bead_id, isWorkerSerial(labels));
      }
    }
    for (const issue of [...ready, ...blocked]) {
      const labels = /** @type {any} */ (issue).labels;
      if (!Array.isArray(labels)) {
        continue;
      }
      if (!worker_serial_by_id.has(issue.id)) {
        worker_serial_by_id.set(issue.id, isWorkerSerial(labels));
        continue;
      }
      const decorated_times = bead_times[issue.id];
      const decorated_updated_ms = coerceTimestampMs(
        decorated_times && typeof decorated_times === 'object'
          ? decorated_times.updated_at
          : null
      );
      const live_updated_ms = coerceTimestampMs(issue.updated_at);
      if (
        live_updated_ms !== null &&
        decorated_updated_ms !== null &&
        live_updated_ms > decorated_updated_ms
      ) {
        worker_serial_by_id.set(issue.id, isWorkerSerial(labels));
      }
    }

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
    const queue_ids = new Set(
      queue_entries.map((/** @type {any} */ entry) => entry.bead_id)
    );
    for (const id of selected_queue_ids) {
      if (!queue_ids.has(id)) {
        selected_queue_ids.delete(id);
      }
    }
    const queued = new Set([
      ...queue_entries.map((/** @type {any} */ e) => e.bead_id),
      ...pr_wait_entries.map((/** @type {any} */ e) => e.bead_id),
      ...q.done.map((/** @type {any} */ e) => e.bead_id)
    ]);

    // Merge the raw Ready+Blocked issues (which carry created_at) FIRST, sort the
    // combined list by the shared effective rank (spec §4 "합산 목록 유효 rank
    // 정렬"), THEN exclude queued beads and project to candidate rows. Blocked ids
    // are tracked so the row reason keeps the blocked/ready distinction after the
    // merge collapses the two sources into one order.
    /** @type {Set<string>} */
    const blocked_ids = new Set(blocked.map((/** @type {any} */ it) => it.id));
    const order = uiOrderStore ? uiOrderStore.get()?.order || {} : {};
    /** @type {Set<string>} */
    const seen = new Set();
    /** @type {any[]} */
    const merged = [];
    for (const it of [...ready, ...blocked]) {
      if (
        queued.has(it.id) ||
        seen.has(it.id) ||
        isPhaseChild(it) ||
        isWorkerIneligible(/** @type {any} */ (it).labels)
      ) {
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
      const eligible = !is_quick_fix && has_spec && !spec.conflict;
      const is_blocked = blocked_ids.has(it.id);
      /** @type {string[]} */
      const parts = [];
      if (is_blocked) {
        parts.push(blockedReason(it));
      }
      if (is_quick_fix) {
        parts.push('quick_fix · 워커 비대상');
      } else if (spec.conflict) {
        parts.push('spec_id_conflict');
      } else if (!has_spec) {
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
        // Filter inputs (UI-ki09); the card template ignores them.
        blocked: is_blocked,
        has_spec
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
     * @param {'queue'|'done'} lane
     * @returns {any[]}
     */
    const toRows = (entries, lane) =>
      entries.map((/** @type {any} */ e) => {
        const parked = lane === 'queue' ? revise_parked[e.bead_id] : null;
        const projected_discard =
          lane === 'queue'
            ? discardProjection(discard_operations, e.bead_id)
            : null;
        const discard = projected_discard?.operation ? projected_discard : null;
        const worker_serial =
          lane === 'queue'
            ? worker_serial_by_id.has(e.bead_id)
              ? worker_serial_by_id.get(e.bead_id) || false
              : null
            : false;
        const serial_busy =
          worker_serial === true &&
          (Object.values(q.attempts || {}).some(
            (/** @type {any} */ attempt) =>
              attempt &&
              attempt.bead_id !== e.bead_id &&
              !TERMINAL_ATTEMPT_STATUSES.has(attempt.status)
          ) ||
            pr_wait_entries.some(
              (/** @type {any} */ entry) => entry.bead_id !== e.bead_id
            ) ||
            Object.values(discard_operations).some(
              (/** @type {any} */ operation) =>
                operation &&
                operation.bead_id !== e.bead_id &&
                operation.phase !== 'done'
            ));
        const reason_parts = lane === 'done' ? [] : [admissionBadge(e.bead_id)];
        if (serial_busy) {
          reason_parts.unshift('다른 작업 종료 대기 · 머지까지 단독');
        }
        return {
          id: e.bead_id,
          title: idToTitle.get(e.bead_id) || e.bead_id,
          reason: reason_parts.filter(Boolean).join(' · '),
          draggable: lane !== 'done' && !discard,
          done: lane === 'done',
          lane,
          selectable: lane === 'queue',
          selected: lane === 'queue' && selected_queue_ids.has(e.bead_id),
          worker_serial,
          discard,
          // 파킹 행은 처분 대기 카드다 (§3.5): 뱃지 + 버튼 2개. 뱃지는 사람의
          // 결정을 기다리는 상태이므로 alert 색을 쓴다.
          badges: parked ? ['⏸ REVISE 파킹'] : [],
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
          // 완료 레인 진입 시각 = 완료 시각 (UI-rkly §3). 2줄 행의 둘째 줄이
          // 이것을 싣는다; 구버전 queue.json 엔트리는 값이 없어 생략된다.
          done_at:
            lane === 'done' && typeof e.added_at === 'number'
              ? e.added_at
              : undefined,
          ...timesOf(e.bead_id)
        };
      });

    // When a bead entered the done lane, by bead id. Every moveToDone call site
    // runs AFTER termination is already settled (bd closed / merged PR), so a
    // done entry is the durable snapshot of "this bead's work actually
    // finished" — the fact the banner verdict below was missing (UI-a9ys).
    // Raw `q.done`, not the period-filtered `done_entries`: the toolbar period
    // is a display range for the done lane, and a bead pushed out of it is no
    // less finished.
    /** @type {Map<string, number>} */
    const done_at_by_bead = new Map();
    for (const e of /** @type {any[]} */ (q.done)) {
      if (
        e &&
        typeof e.bead_id === 'string' &&
        typeof e.added_at === 'number'
      ) {
        done_at_by_bead.set(e.bead_id, e.added_at);
      }
    }

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
    /**
     * The single unhandled-failure predicate shared by failed tiles and the
     * banner. A failure is actionable only while it is the bead's latest
     * attempt, has not been resolved by a later done entry, and has not been
     * dismissed.
     *
     * @param {any} attempt
     * @returns {boolean}
     */
    const isUnhandledFailure = (attempt) => {
      const superseded =
        last_attempt_by_bead.get(attempt.bead_id) !== attempt.attempt_id;
      const done_at = done_at_by_bead.get(attempt.bead_id);
      const resolved_by_done =
        typeof done_at === 'number' &&
        done_at > 0 &&
        typeof attempt.finished_at === 'number' &&
        done_at >= attempt.finished_at;
      return (
        !superseded &&
        !resolved_by_done &&
        typeof attempt.dismissed_at !== 'number'
      );
    };
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
          // 큐 스냅샷에는 페이즈명이 없다 — 진행중 child 제목이 "지금 어디까지"
          // 를 말하는 유일한 사실이다 (UI-53es §2).
          current_child: currentChildTitleOf(a.bead_id),
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
            current_child: currentChildTitleOf(a.bead_id),
            ...timesOf(a.bead_id)
          });
          latest_failed = a;
        }
      }
    }
    // Failed records are the actionable front of the running lane; they do not
    // consume a live slot, but still claim their bead so queue rows do not
    // duplicate the same work item.
    const running = [...failed_running, ...active_running];
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
    merge_queue.forEach((/** @type {any} */ e, /** @type {number} */ i) => {
      if (e && typeof e.bead_id === 'string') {
        merge_positions.set(e.bead_id, i + 1);
        merge_resolutions.set(e.bead_id, e.resolution);
        merge_continuations.set(e.bead_id, e.continuation_action || null);
      }
    });
    const merge_state = q.merge_queue_state || { active: null, failures: {} };
    /** @type {Record<string, string>} */
    const merge_failures = merge_state.failures || {};
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
    const slots = q.pr_wait_holds_slot === true ? MIN_SLOTS : configured_slots;
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
              resolution: merge_resolutions.get(e.bead_id),
              continuation_action: merge_continuations.get(e.bead_id)
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
              ?.worker_serial === true
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
          ?disabled=${m.queue.pr_wait_holds_slot === true}
          title=${m.queue.pr_wait_holds_slot === true
            ? '머지까지 순차 실행 중 — 해제하면 저장된 동시 실행 수로 돌아갑니다'
            : '동시에 실행할 세션 수 (최소 1 = 순차 실행)'}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${m.queue.pr_wait_holds_slot === true}
        />
        머지까지 순차 실행
      </label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`;
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
        ${repo_operations}${banners}`;
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
      ${repo_operations}${banners}`;
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
   * Waiting-row execution-mode controls. The selection remains browser-local;
   * only the label mutations cross the transport boundary.
   *
   * @returns {import('lit-html').TemplateResult|string}
   */
  function executionModeControlsTemplate() {
    if (selected_queue_ids.size === 0) {
      return '';
    }
    const selection = Array.from(selected_queue_ids);
    const has_unknown = selection.some((id) => {
      const state = worker_serial_by_id.get(id);
      return state !== true && state !== false;
    });
    return html`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${selection.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${selected_execution_mode}
        ?disabled=${execution_mode_pending}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${has_unknown || execution_mode_pending}
        title=${has_unknown
          ? '선택한 작업의 실행 방식을 확인하는 중입니다'
          : execution_mode_pending
            ? '실행 방식 변경 중입니다'
            : '선택한 작업에 적용'}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`;
  }

  /**
   * Explain why automatic progress is paused behind a durable PR wait.
   *
   * @param {ReturnType<typeof buildModel>} m
   * @returns {import('lit-html').TemplateResult|undefined}
   */
  function prWaitHoldHintTemplate(m) {
    const durable_pr_wait = (m.queue.pr_wait || []).filter(
      (/** @type {any} */ entry) =>
        entry && entry.external !== true && typeof entry.bead_id === 'string'
    );
    const occupied = new Set(
      m.running
        .filter((/** @type {any} */ row) => !row.paused && row.failed !== true)
        .map((/** @type {any} */ row) => row.bead_id)
    );
    for (const entry of durable_pr_wait) {
      occupied.add(entry.bead_id);
    }
    const shows_global_hint = !(
      m.queue.pr_wait_holds_slot !== true ||
      m.queue.auto_advance !== true ||
      m.queue.auto_merge === true ||
      durable_pr_wait.length === 0 ||
      m.waiting.length === 0 ||
      occupied.size < m.slots
    );
    const serial_pr_wait = m.pr_wait.some(
      (/** @type {any} */ row) => row.worker_serial === true
    );
    if (
      !shows_global_hint &&
      !(serial_pr_wait && m.queue.auto_merge !== true)
    ) {
      return undefined;
    }
    return html`${shows_global_hint
      ? html`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`
      : ''}${serial_pr_wait && m.queue.auto_merge !== true
      ? html`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`
      : ''}`;
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
      controls: candidateControlsTemplate(m)
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
          title: '대기',
          items: m.waiting,
          empty: '드래그 또는 [대기로 ↴]로 배치',
          controls: html`${executionModeControlsTemplate()}${prWaitHoldHintTemplate(
            m
          )}`,
          collapsible: true,
          collapsed: lane_collapse.queue,
          preview: stripPreview(m.waiting)
        })}
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
      ${paneTemplate({
        id: 'worker-pane-queue',
        lane: 'queue',
        title: '대기',
        items: m.waiting,
        empty: '드래그로 배치',
        controls: html`${executionModeControlsTemplate()}${prWaitHoldHintTemplate(
          m
        )}`
      })}
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
    // Only the two panes a drop actually mutates accept one. 실행 중/PR 대기/완료
    // are observation columns — the server puts beads there — so they must not
    // light up as drop targets and then silently swallow the drag.
    const lane = pane.dataset.lane || '';
    if (lane !== 'candidate' && lane !== 'queue') {
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
      // Moving a queued bead back to candidates removes it from the queue.
      if (from_lane === 'queue') {
        void removeBead(bead_id);
      }
      return;
    }
    if (to_lane === 'queue') {
      if (from_lane === 'queue') {
        void reorderBead(bead_id, index);
      } else {
        void placeBead(bead_id, index);
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
    const selection = /** @type {HTMLInputElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-mini__select')
    );
    if (selection) {
      const id = selection.dataset.beadId || '';
      if (id) {
        if (selection.checked) {
          selected_queue_ids.add(id);
        } else {
          selected_queue_ids.delete(id);
        }
        doRender();
      }
      return;
    }
    const mode_select = /** @type {HTMLSelectElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-bulk__mode')
    );
    if (mode_select) {
      selected_execution_mode =
        mode_select.value === 'serial' ? 'serial' : 'ordinary';
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
    const hold_toggle = /** @type {HTMLInputElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-pr-wait-hold')
    );
    if (hold_toggle) {
      void setPrWaitHoldsSlot(hold_toggle.checked);
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
    repo_ops_drawer.close();
    repo_ops_drawer_el.hidden = true;
    drawer_overlay_el.hidden = false;
    drawer.open({ attempt_id, meta: metaForAttempt(a) });
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
   * @param {MouseEvent} ev
   */
  function onClick(ev) {
    const target = /** @type {HTMLElement} */ (ev.target);
    const bulk_apply = /** @type {HTMLButtonElement|null} */ (
      target?.closest?.('.worker-bulk__apply')
    );
    if (bulk_apply) {
      if (!bulk_apply.disabled) {
        void applyExecutionMode();
      }
      return;
    }
    if (
      target?.closest?.(
        '.worker-mini__select, .worker-mini__serial, .worker-mini__grip'
      )
    ) {
      return;
    }
    // Clicks inside the exec-defaults dialog are owned by its own handlers.
    if (target?.closest?.('#worker-exec-defaults-dialog')) {
      return;
    }
    if (target?.closest?.('.worker-exec-defaults-btn')) {
      exec_defaults_dialog.open();
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
    // [대기로 ↴]: 드래그와 같은 경로(worker-queue-place)로 큐 말미에 적재한다.
    // 카드 기본 동작(상세 패널 열기)보다 먼저 처리해야 탭이 삼켜지지 않는다.
    const place_btn = /** @type {HTMLButtonElement|null} */ (
      target?.closest?.('.worker-card__place')
    );
    if (place_btn) {
      const id = place_btn.dataset.beadId;
      // 자격 없는 후보의 클릭은 여기서 끝난다 — 브라우저가 disabled 버튼의
      // 클릭을 막아 주더라도, 적재 경로가 자격을 스스로 확인해야 드래그와
      // 같은 규율이 된다.
      if (id && !place_btn.disabled) {
        void placeBead(id, queueTailIndex());
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
        doRender();
        refreshOpenDrawerMeta();
      })
    );
  }

  doRender();

  return {
    load() {
      doRender();
    },
    openExecDefaults() {
      exec_defaults_dialog.open();
    },
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
        exec_defaults_dialog.destroy();
      } catch {
        /* ignore */
      }
      render(html``, mount_element);
    }
  };
}
