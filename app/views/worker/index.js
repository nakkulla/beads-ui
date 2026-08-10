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
import { selectCurrentChild } from '../../utils/current-child.js';
import { showToast } from '../../utils/toast.js';
import {
  SUM_FIELDS,
  formatUsageTotalWithCost,
  sumAttemptUsage
} from '../../utils/token-usage.js';
import { isWorkerIneligible } from '../../utils/worker-eligibility.js';
import { createReorderController } from '../reorder.js';
import { createExecDefaultsDialog } from './exec-defaults-dialog.js';
import { miniRow, paneTemplate } from './lanes.js';
import { bannersTemplate, runningGridTemplate } from './running-grid.js';
import { createTranscriptDrawer } from './transcript-drawer.js';

const READY_KEY = 'tab:worker:ready';
const BLOCKED_KEY = 'tab:worker:blocked';
/**
 * The Worker tab's own in_progress subscription (UI-53es §2). It exists for one
 * reason: the running tile's 현재 단계 줄 needs the bead's in_progress CHILD,
 * and a child is an in_progress issue like any other.
 */
const IN_PROGRESS_KEY = 'tab:worker:in-progress';

/**
 * Lower bound on the concurrency cap, mirroring the server's `MIN_SLOTS`
 * (worker-phase2 §3). The server rejects anything below it; the editor clamps
 * so a stray keystroke never sends a value that would just bounce.
 *
 * @type {number}
 */
const MIN_SLOTS = 1;

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
 * Whether a cleanup-diagnosis attempt still owns a bead's action slot. A paused
 * ancestor that has a resume child is history, matching the running-tile leaf
 * rule below; a leaf paused diagnosis remains in flight.
 *
 * @param {unknown} attempts
 * @param {string} bead_id
 * @returns {boolean}
 */
function hasActiveCleanupDiagnosis(attempts, bead_id) {
  if (!attempts || typeof attempts !== 'object' || Array.isArray(attempts)) {
    return false;
  }
  const records = Object.values(attempts);
  /** @type {Set<string>} */
  const resumed_from_ids = new Set();
  for (const attempt of records) {
    if (
      attempt &&
      typeof attempt === 'object' &&
      typeof attempt.resumed_from === 'string' &&
      attempt.resumed_from.length > 0
    ) {
      resumed_from_ids.add(attempt.resumed_from);
    }
  }
  return records.some(
    (attempt) =>
      attempt &&
      typeof attempt === 'object' &&
      attempt.bead_id === bead_id &&
      attempt.cleanup_diagnosis === true &&
      (attempt.status === 'running' ||
        (attempt.status === 'paused' &&
          !resumed_from_ids.has(attempt.attempt_id)))
  );
}

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
const ALERT_GATE_TIERS = ['closed_unmerged', 'undecidable'];

/**
 * Poller activity replaces a gate badge ONLY where it changes what the badge
 * MEANS (UI-raqh §3): "관측 대기" while a gh round-trip is actually in flight is
 * 확인중, and "로컬검증 대기" while the suite is actually running is 로컬검증
 * 실행 중. Anywhere else — CI ✓/✗, 머지됨, 관측 오류 — the poller working
 * changes nothing about the state, and swapping the badge there would make the
 * row flicker every poll interval for no information.
 *
 * @type {Array<{ from: string, activity: 'checking'|'verifying', to: string }>}
 */
const ACTIVITY_BADGE_SUBSTITUTIONS = [
  { from: '관측 대기', activity: 'checking', to: '확인중' },
  { from: '로컬검증 대기', activity: 'verifying', to: '로컬검증 실행 중' }
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
 * The merge's seven steps in server order (UI-raqh §4), each with the label the
 * row shows. Mirrors `pr-actions.js` — `merging` plus the six `CLEANUP_STEPS`
 * — and the client keeps its own copy because a view must not import server
 * code. An unknown step still renders (by its raw name) rather than blanking the
 * row.
 *
 * @type {Array<{ step: string, label: string }>}
 */
const MERGE_STEPS = [
  { step: 'merging', label: '머지 중' },
  { step: 'base_sync', label: 'base 동기화' },
  { step: 'post_merge_verify', label: '머지 후 검증' },
  { step: 'deploy', label: '배포' },
  { step: 'child_sweep', label: '자식 정리' },
  { step: 'branch_cleanup', label: '브랜치 정리' },
  { step: 'parent_close', label: '부모 close' }
];

/**
 * Project a merge step onto what the row draws: its Korean label, its position
 * in the sequence, and how far along the bar is.
 *
 * The counter is not decoration — this is an ORDERED sequence with a known
 * length, so `4/8` tells a reader how much is left, which "머지 중…" alone
 * cannot. A step the client does not know still shows, with no counter: a
 * server that grew a step must not blank the row.
 *
 * @param {string|null|undefined} step
 * @returns {{ label: string, index: number, total: number, percent: number }|null}
 */
export function mergeStepView(step) {
  if (typeof step !== 'string' || step.length === 0) {
    return null;
  }
  const total = MERGE_STEPS.length;
  const i = MERGE_STEPS.findIndex((s) => s.step === step);
  if (i < 0) {
    return { label: step, index: 0, total, percent: 0 };
  }
  return {
    label: MERGE_STEPS[i].label,
    index: i + 1,
    total,
    percent: Math.round(((i + 1) / total) * 100)
  };
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
 * (discard spec §2), and there [머지] is the cleanup-retry button.
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
 * @param {import('../../utils/token-usage.js').UsageRecord|null} [usage] - Token usage of the
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
 * @param {{ position: number, active: boolean, failure: string|null }|null} [merge_queue]
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
  base_exception = null
) {
  const queued = !!merge_queue && merge_queue.position > 0;
  const queue_active = !!merge_queue && merge_queue.active === true;
  const queue_failure = (merge_queue && merge_queue.failure) || null;
  const obs = observations[bead_id] || null;
  const gate = obs && obs.gate ? obs.gate : null;
  const pr = obs && obs.pr ? obs.pr : null;
  /** @type {string[]} */
  const badges = [];
  if (external) {
    badges.push('세션');
  }
  const conflict_badge = conflict_session
    ? conflict_session === 'running'
      ? '충돌 해소 중'
      : '충돌 해소 일시정지'
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
  if (cleanup_failed) {
    badges.push('정리 실패');
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
  const cleanup_retry = !!cleanup_failed && !!gate && gate.tier === 'merged';
  // An external MERGED row is never auto-cleaned (UI-7agi §1), so the button IS
  // the cleanup trigger — with or without a recorded failure.
  const external_cleanup = external && !!gate && gate.tier === 'merged';
  // An external conflict WITHOUT a worktree has nowhere to run: the dispatch
  // never recreates one (UI-w0hi 제외), so the button would refuse every time.
  // The badge reports the conflict; the user resolves it in their own session.
  const external_conflict_unresolvable =
    external && conflicting && wt_present === false;
  return {
    id: bead_id,
    title,
    reason: cleanup_failed ? '머지됨 · 정리 미완' : 'PR 대기',
    draggable: false,
    done: true,
    lane: 'pr_wait',
    // Card tone, not an affordance (UI-w0hi §4): an external row came from
    // somewhere else, and the lane reads better when that is visible before the
    // 세션 badge is read.
    external,
    pr_number: pr && typeof pr.number === 'number' ? pr.number : null,
    pr_url: pr && typeof pr.url === 'string' ? pr.url : '',
    badges,
    // Which badge (if any) reports live server activity rather than a settled
    // state — the row draws that one with the breathing dot and no colour
    // emphasis, because nobody has to act on it.
    live_badge:
      conflict_session === 'running'
        ? conflict_badge
        : conflict_badge
          ? // A paused resolution session is a settled state, not live work:
            // the badge shows, the breathing dot does not.
            null
          : substituted.live
            ? substituted.label
            : null,
    usage,
    alert:
      (!!gate && ALERT_GATE_TIERS.includes(gate.tier)) ||
      !!cleanup_failed ||
      !!queue_failure,
    // A queued row has nothing to click but [취소]: the merge is the driver's
    // now, and a second [머지] would only be a no-op re-queue (UI-5v7d §4).
    merge_action: !queued,
    cancel_action: queued,
    cancel_enabled: !queue_active,
    cancel_title: queue_active
      ? '머지 진행 중 — 취소할 수 없습니다'
      : '머지 큐에서 이 항목을 뺍니다 (다시 [머지]로 넣을 수 있습니다)',
    // `cleanup_failed` is DURABLE merged evidence — right after a restart the
    // observation cache is empty, so the gate tier alone would re-offer [폐기]
    // on a tile whose merge already landed (discard spec §2).
    discard_action:
      !external && !cleanup_failed && !(gate && gate.tier === 'merged'),
    merge_step,
    discard_enabled: !merge_step && !conflict_session && !queued,
    // Not a guard — the scheduler already refuses a second dispatch for a
    // claimed/running attempt. The disabled buttons say WHY clicking now is
    // pointless, which the server's refusal never reaches the user with.
    discard_title: conflict_session
      ? '충돌 해소 세션 있음 — 폐기하려면 먼저 세션을 정리하세요'
      : queued
        ? '머지 큐에 있음 — 폐기하려면 먼저 [취소]하세요'
        : undefined,
    // A conflicting PR keeps [머지] clickable on purpose: that click is what
    // dispatches the resolution session (§6), and it merges nothing. Once that
    // session exists, there is nothing left to dispatch until it settles.
    // A worktree-less external conflict vetoes even a GREEN gate: the
    // click-time branch order puts DIRTY before the gate, so the server refuses
    // a conflicting external PR whatever its CI says (UI-7agi §5).
    merge_enabled:
      !merge_step &&
      !conflict_session &&
      !external_conflict_unresolvable &&
      (enabled || conflicting || cleanup_retry || external_cleanup),
    // The label says what the click DOES: on a conflicting gate it dispatches a
    // resolution session, and a button reading 머지 there is the misread that
    // put this bead here (UI-dxgz §2).
    // 해소만 하고 멈추는 것처럼 읽히던 라벨을 실제 동작에 맞춘다 (UI-yk55 §1):
    // 이 클릭이 띄우는 세션은 완료 후 자동으로 재머지된다 — 툴팁이 이미 그렇게
    // 말하고 있었고, 라벨만 어긋나 있었다.
    merge_label: external_cleanup
      ? '정리'
      : conflicting && !merge_step && !cleanup_retry
        ? '충돌 해소 후 머지'
        : undefined,
    merge_title: merge_step
      ? `머지 진행 중 — ${merge_step.label}`
      : external_cleanup
        ? '머지됨 — 클릭하면 머지 후 정리를 수행합니다'
        : external_conflict_unresolvable
          ? '워크트리 없음 — 세션에서 직접 해소하세요'
          : conflict_session === 'running'
            ? '충돌 해소 세션 실행 중 — 완료 후 다시 머지하세요'
            : conflict_session === 'paused'
              ? '충돌 해소 세션 일시정지 — 재개 후 완료되면 머지하세요'
              : cleanup_retry
                ? '머지 완료 — 클릭하면 남은 정리를 처음부터 다시 수행합니다'
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
 * @param {{ transport?: (type: string, payload?: unknown) => Promise<any>, issueStores?: any, queueStore?: any, execPresetStore?: any, sessionLogStore?: any, uiOrderStore?: import('../reorder.js').UiOrderStore, gotoIssue?: (id: string) => void, getWorkspacePath?: () => (string|undefined) }} [options]
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
    getWorkspacePath
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
  let done_range = loadDoneRange();
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
  /** @type {Set<string>} */
  const cleanup_diagnose_pending = new Set();
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
  drawer_overlay_el.append(drawer_backdrop_el, drawer_el);
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

  // Workspace-global exec-defaults dialog (⚙ in the ctrl bar). It owns its own
  // queueStore subscription so an open dialog re-renders as snapshots arrive.
  const exec_defaults_dialog = createExecDefaultsDialog(console_el, {
    queueStore,
    presetStore: execPresetStore,
    transport,
    getWorkspacePath
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
   * Discard (■) an attempt: group-kill + attempt `stopped` + the bead leaves
   * the queue, atomically on the server (worker-phase1 §2.2). Fire-and-forget;
   * the server pushes a fresh snapshot that clears the tile.
   *
   * @param {string} attempt_id
   */
  async function stopAttempt(attempt_id) {
    if (!transport || !attempt_id) {
      return;
    }
    await transport('worker-attempt-stop', { attempt_id });
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
    let res = /** @type {any} */ (
      await transport('worker-attempt-resume', {
        attempt_id,
        expected_revision: currentRevision()
      })
    );
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
   * Dispatch one cleanup-diagnosis attempt under the queue revision CAS. The
   * server remains authoritative for cleanup eligibility; the local pending
   * set only closes the duplicate-click window before its snapshot arrives.
   *
   * @param {string} bead_id
   */
  async function diagnoseCleanup(bead_id) {
    if (!transport || !bead_id || cleanup_diagnose_pending.has(bead_id)) {
      return;
    }
    cleanup_diagnose_pending.add(bead_id);
    doRender();
    /** @type {any} */
    let res;
    try {
      res = await transport('worker-cleanup-diagnose', {
        bead_id,
        expected_revision: currentRevision()
      });
      adopt(res);
      if (res && res.conflict) {
        res = await transport('worker-cleanup-diagnose', {
          bead_id,
          expected_revision: currentRevision()
        });
        adopt(res);
      }
    } finally {
      cleanup_diagnose_pending.delete(bead_id);
      doRender();
    }
    if (res && !res.conflict && res.ok === false && res.reason) {
      showToast(`AI 정리 거부: ${res.reason}`, 'error', 2400);
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
   * @returns {Promise<any>}
   */
  async function sendMergeQueue(type, payload) {
    if (!transport) {
      return null;
    }
    const send = transport;
    let res = /** @type {any} */ (
      await send(type, { ...payload, expected_revision: currentRevision() })
    );
    adopt(res);
    if (res && res.conflict) {
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
   */
  async function discardPr(bead_id) {
    if (!transport || !bead_id) {
      return;
    }
    const confirmed =
      typeof globalThis.confirm !== 'function' ||
      globalThis.confirm(
        `${bead_id}: PR을 닫고 워크트리/브랜치를 폐기합니다. 되돌릴 수 없습니다. 다시 실행하려면 후보 레인에서 대기 레인으로 옮기세요. 계속할까요?`
      );
    if (!confirmed) {
      return;
    }
    let res = /** @type {any} */ (
      await transport('worker-pr-discard', {
        bead_id,
        expected_revision: currentRevision()
      })
    );
    adopt(res);
    if (res && res.conflict) {
      res = /** @type {any} */ (
        await transport('worker-pr-discard', {
          bead_id,
          expected_revision: currentRevision()
        })
      );
      adopt(res);
    }
    if (res && res.discarded === true) {
      showToast(
        '폐기 완료 — 후보 레인에서 다시 실행할 수 있습니다',
        'success',
        2400
      );
      return;
    }
    if (res && res.discarded === false && !res.conflict) {
      showToast(`폐기 거부: ${res.reason || ''}`, 'error', 2800);
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
      res = /** @type {any} */ (
        await transport(type, {
          bead_id,
          expected_revision: currentRevision()
        })
      );
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
  async function setAutoAdvance(on) {
    if (!transport) {
      return;
    }
    const res = await transport('worker-queue-toggle', {
      on,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-toggle', {
        on,
        expected_revision: currentRevision()
      }).then(adopt);
    }
  }

  /**
   * Flip 자동 진행 and 자동 머지 together (UI-j6wa §1). 새 프로토콜 메시지는
   * 만들지 않고 기존 두 토글을 그대로 보낸다 — 이 버튼은 서버 상태가 아니라
   * 두 상태의 파생이므로, 서버에 세 번째 진실을 만들면 파생이 아니게 된다.
   *
   * 순차 전송이다: 두 핸들러 모두 CAS revision을 읽고 쓰므로, 동시에 보내면
   * 둘 중 하나가 자기 자신의 충돌 재시도에 걸린다. 한쪽만 반영되는 부분 실패는
   * 혼합 상태로 남고, 버튼은 그것을 꺼짐으로 표시한다 — 다음 클릭이 다시 둘 다
   * ON으로 정규화하므로 별도 롤백은 두지 않는다.
   *
   * @param {boolean} on
   */
  async function setAutoAll(on) {
    await setAutoAdvance(on);
    await setAutoMerge(on);
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
   * @returns {{ queue: any, idToTitle: Map<string, string>, candidates: any[], candidate_hidden: { blocked: number, spec: number }, running: any[], live_count: number, slots: number, over_cap: boolean, failure: any, waiting: any[], pr_wait: any[], merge_queue_length: number, merge_queue_running: boolean, auto_excluded: string[], verify_cmd_present: boolean, declared_base: string|null, done: any[], token_total: string|null, cleanup_failures: Array<{ bead_id: string, step: string, reason: string, detail: string|null, output_tail?: string, log_path?: string, diagnosis?: { verdict: string, evidence: string, fix_bead_id?: string|null, malformed?: boolean }|null, diagnosis_pending: boolean }> }}
   */
  function buildModel() {
    const q = currentQueue();
    const ready = selectors
      ? selectors.selectBoardColumn(READY_KEY, 'ready')
      : [];
    const blocked = selectors
      ? selectors.selectBoardColumn(BLOCKED_KEY, 'blocked')
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

    // 생성·수정 시각 (UI-d7pw §4.3). 후보/Ready/Blocked bead는 구독 이슈가
    // 이미 들고 있고, 대기/PR 대기/완료 bead는 서버가 `bead_times`로 실어
    // 보낸다. 서버가 안 보내면 빈 객체 → 메타 줄이 그냥 안 그려진다.
    /** @type {Record<string, any>} */
    const bead_times = q.bead_times || {};
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
    /** @type {Record<string, { step: string, reason: string, bd_restore: string|null, at: number, detail: string|null, output_tail?: string, log_path?: string, diagnosis?: { verdict: string, attempt_id: string, consumed: boolean, evidence: string, fix_bead_id?: string, malformed?: boolean } }>} */
    const cleanup_failed = q.cleanup_failed || {};
    const cleanup_failures = Object.entries(cleanup_failed).map(
      ([bead_id, rec]) => ({
        bead_id,
        step: rec && rec.step ? rec.step : '',
        reason: rec && rec.reason ? rec.reason : '',
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
        diagnosis:
          rec &&
          rec.diagnosis &&
          typeof rec.diagnosis === 'object' &&
          typeof rec.diagnosis.verdict === 'string' &&
          typeof rec.diagnosis.evidence === 'string'
            ? {
                verdict: rec.diagnosis.verdict,
                evidence: rec.diagnosis.evidence,
                fix_bead_id:
                  typeof rec.diagnosis.fix_bead_id === 'string'
                    ? rec.diagnosis.fix_bead_id
                    : null,
                malformed: rec.diagnosis.malformed === true
              }
            : null,
        diagnosis_pending:
          cleanup_diagnose_pending.has(bead_id) ||
          hasActiveCleanupDiagnosis(q.attempts, bead_id)
      })
    );
    const queue_entries = /** @type {any[]} */ (q.queue || []);
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

    /**
     * @param {any[]} entries
     * @param {'queue'|'done'} lane
     * @returns {any[]}
     */
    const toRows = (entries, lane) =>
      entries.map((/** @type {any} */ e) => {
        const parked = lane === 'queue' ? revise_parked[e.bead_id] : null;
        return {
          id: e.bead_id,
          title: idToTitle.get(e.bead_id) || e.bead_id,
          reason: lane === 'done' ? '' : admissionBadge(e.bead_id),
          draggable: lane !== 'done',
          done: lane === 'done',
          lane,
          // 파킹 행은 처분 대기 카드다 (§3.5): 뱃지 + 버튼 2개. 뱃지는 사람의
          // 결정을 기다리는 상태이므로 alert 색을 쓴다.
          badges: parked ? ['⏸ REVISE 파킹'] : [],
          alert: !!parked,
          revise_action: !!parked,
          revise_enabled: !!parked && !revise_pending.has(e.bead_id),
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
    const running = [];
    /** @type {any|null} */
    let latest_failed = null;
    for (const a of /** @type {any[]} */ (attempts)) {
      // A paused attempt that was already resumed is history: its child is the
      // live one, so only a LEAF paused attempt renders a tile (§1.1).
      const leaf_paused =
        a.status === 'paused' && !resumed_from_ids.has(a.attempt_id);
      if (a.status === 'running' || leaf_paused) {
        running.push({
          bead_id: a.bead_id,
          attempt_id: a.attempt_id,
          title: idToTitle.get(a.bead_id) || a.bead_id,
          runner: a.runner || null,
          model: a.model || null,
          effort: a.effort || null,
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
        const superseded = last_attempt_by_bead.get(a.bead_id) !== a.attempt_id;
        // Only a done entry stamped at or after this failure resolves it.
        // Membership alone is not enough: ↻ resume never clears lanes
        // (scheduler `resume`/`relaunchFromAttempt`), so a stale done entry
        // would hide the resumed child's NEW failure. Values that cannot be
        // compared do not resolve — a legacy attempt's null finished_at, and a
        // legacy pr_stop done entry normalized to added_at 0, which meant "PR
        // delivered", not "closed".
        const done_at = done_at_by_bead.get(a.bead_id);
        const resolved_by_done =
          typeof done_at === 'number' &&
          done_at > 0 &&
          typeof a.finished_at === 'number' &&
          done_at >= a.finished_at;
        if (
          !superseded &&
          !resolved_by_done &&
          typeof a.dismissed_at !== 'number'
        ) {
          latest_failed = a;
        }
      }
    }
    // The banner's ↻ targets EXACTLY the attempt the banner describes — the
    // latest failure. An older eligible attempt is never substituted (that
    // would resume a different session than the one reported); ineligibility
    // renders the button disabled with the reason in its title (spec §1.5).
    /** @type {any|null} */
    let failure = null;
    if (latest_failed) {
      const has_sid =
        typeof latest_failed.session_id === 'string' &&
        latest_failed.session_id.length > 0;
      const already = resumed_from_ids.has(latest_failed.attempt_id);
      const detail = latest_failed.cause_detail;
      failure = {
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
        resume_eligible: has_sid && !already,
        resume_reason: !has_sid
          ? 'session_id 없는 구 attempt — 이어하기 불가'
          : already
            ? '이미 이어받은 attempt (child attempt 존재) — 이어하기 불가'
            : null
      };
    }

    /** @type {Set<string>} */
    const active_bead_ids = new Set(running.map((r) => r.bead_id));

    // The sequential merge queue (UI-5v7d): membership and ORDER are durable,
    // the active item and the skip reasons are the driver's live memory.
    const merge_queue = Array.isArray(q.merge_queue) ? q.merge_queue : [];
    /** @type {Map<string, number>} */
    const merge_positions = new Map();
    merge_queue.forEach((/** @type {any} */ e, /** @type {number} */ i) => {
      if (e && typeof e.bead_id === 'string') {
        merge_positions.set(e.bead_id, i + 1);
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
      if (r.conflict_resolution) {
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
    const live = running.filter((r) => !r.paused);
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
    const token_total = token_reported
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
              (merge_pending.has(e.bead_id)
                ? { activity: null, merge_progress: { step: 'merging' } }
                : null),
            conflict_sessions.get(e.bead_id) || null,
            // Overlaid by the server (UI-7agi §2) — absent on every durable row.
            e.external === true,
            {
              position: merge_positions.get(e.bead_id) || 0,
              active: merge_state.active === e.bead_id,
              failure: merge_failures[e.bead_id] || null
            },
            // Also overlay-only (UI-w0hi §3): a durable row has no field here and
            // must keep the pre-existing behaviour, so absence reads as present.
            e.wt_present !== false,
            // 자동 모드가 꺼져 있으면 제외 기록은 이 행이 서 있는 이유가 아니다
            // (UI-yk55 §3.4) — 기록이 지워지는 시점도 자동 스캔이므로, 꺼진
            // 상태의 잔여 기록을 뱃지로 보이면 사실이 아닌 설명이 된다.
            q.auto_merge === true ? autoSkipReason(e.bead_id) : null,
            baseException(declared_base, prWaitTargetBase(e.bead_id))
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
      // 자동 머지 경고 문구의 근거 (UI-yk55 §6): 검증 신호가 없는 워크스페이스는
      // 게이트 Tier 3이라 클릭 없이 머지된다는 사실을 버튼이 말해야 한다.
      verify_cmd_present: !!(q.workspace_info || {}).verify_cmd,
      declared_base,
      done: done_rows,
      token_total,
      cleanup_failures
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
      ${m.queue.auto_advance ? '⏸ 일시정지' : '▶ 자동 진행'}
    </button>`;
    // 전체 자동화 (UI-j6wa §1): 서버 상태를 새로 만들지 않고 기존 두 토글의
    // 파생값만 보여준다. 그래서 혼합 상태는 "켜짐"이 아니고, 다음 클릭은 둘 다
    // ON으로 정규화한다 — 한 버튼이 두 토글을 대표하는 이상, 그 표시가 참이
    // 되는 방향은 하나뿐이다.
    const auto_all_on =
      m.queue.auto_advance === true && m.queue.auto_merge === true;
    const auto_all = html`<button
      type="button"
      class="worker-auto-all${auto_all_on ? ' is-active' : ''}"
      title=${auto_all_on
        ? '자동 진행과 자동 머지를 함께 끕니다'
        : '자동 진행과 자동 머지를 함께 켭니다'}
      aria-pressed=${auto_all_on ? 'true' : 'false'}
    >
      ${auto_all_on ? '⏹ 전체 자동화' : '⏵⏵ 전체 자동화'}
    </button>`;
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
    const banners = bannersTemplate({
      failure: m.failure,
      cleanupFailures: m.cleanup_failures
    });
    if (is_mobile) {
      // sticky 리본 (UI-58y2 §모바일 1)에는 자동 진행 토글과 세 카운트만 둔다.
      // 슬롯·⚙는 아래 조작 줄로 내리고 배너는 리본 밖에 남긴다 — 고정되는 것은
      // "항상 읽혀야 하는 한 줄"뿐이어야 하고, 배너가 같이 붙으면 스크롤할수록
      // 화면이 줄어든다.
      return html`<div class="worker-ribbon">
          ${play}
          <div class="worker-kpi worker-kpi--ribbon">${overcap}${counts}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${auto_all}${settings}</div>
          <div class="worker-kpi">${base_chip}</div>
        </div>
        ${banners}`;
    }
    // 좌: 조작 / 우: KPI (UI-58y2 데스크톱 §툴바).
    return html`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${play}${auto_all}${settings}</div>
        <div class="worker-kpi">
          ${overcap}${counts}${base_chip}
          ${m.token_total
            ? html`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${doneRangeLabel()} 완료된 이슈들이 생애 전체에 쓴 토큰 누적 (입력+출력+캐시). 이 기간에 소모된 양이 아니다`}
                >${doneRangeLabel()} 완료 · 누적 ${m.token_total}</span
              >`
            : ''}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${next_head}</b></span
          >
        </div>
      </div>
      ${banners}`;
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
    const live = m.running.some((r) => !r.paused);
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
        ${mergeAllTemplate(m)}
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
        .filter((/** @type {any} */ row) => !row.paused)
        .map((/** @type {any} */ row) => row.bead_id)
    );
    for (const entry of durable_pr_wait) {
      occupied.add(entry.bead_id);
    }
    if (
      m.queue.pr_wait_holds_slot !== true ||
      m.queue.auto_advance !== true ||
      m.queue.auto_merge === true ||
      durable_pr_wait.length === 0 ||
      m.waiting.length === 0 ||
      occupied.size < m.slots
    ) {
      return undefined;
    }
    return html`<div class="worker-stat worker-pr-wait-hint">
      PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
      꺼짐)
    </div>`;
  }

  /**
   * The PR 대기 lane header's bulk control (UI-5v7d §4, made a durable toggle by
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
      title=${m.verify_cmd_present
        ? '켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다'
        : '켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다 — 이 워크스페이스는 검증 신호가 없어 CI·로컬검증 없이 머지됩니다'}
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
          controls: prWaitHoldHintTemplate(m),
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
          preview: m.token_total || stripPreview(m.done)
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
        controls: prWaitHoldHintTemplate(m)
      })}
      ${paneTemplate({
        id: 'worker-pane-running',
        lane: 'running',
        title: `실행 중 · 슬롯 ${m.slots}`,
        items: m.running,
        live: m.running.some((r) => !r.paused),
        body: runningGridTemplate(m.running, Date.now(), selected_attempt)
      })}
      ${paneTemplate({
        id: 'worker-pane-pr-wait',
        lane: 'pr_wait',
        title: 'PR 대기',
        items: m.pr_wait,
        empty: 'PR 대기 없음',
        header_control: mergeAllTemplate(m)
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
   * @param {DragEvent} ev
   */
  function onDragStart(ev) {
    const el = /** @type {HTMLElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.(
        '.worker-mini[draggable="true"], .worker-card[draggable="true"]'
      )
    );
    if (!el) {
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
   * Adopt a new 완료 lane period (UI-d7pw §3.2). Purely local — every entry the
   * filter reads is already in the client snapshot, so no request is sent.
   *
   * @param {string} next
   */
  function setDoneRange(next) {
    done_range = isClosedRange(next) ? next : DEFAULT_CLOSED_RANGE;
    saveDoneRange(done_range);
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
   * Open (or switch) the transcript drawer for a running attempt (spec §5.6).
   *
   * @param {string} attempt_id
   */
  function openDrawerForAttempt(attempt_id) {
    const q = currentQueue();
    const a = q.attempts ? q.attempts[attempt_id] : null;
    selected_attempt = attempt_id;
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
    // Clicks inside the exec-defaults dialog are owned by its own handlers.
    if (target?.closest?.('#worker-exec-defaults-dialog')) {
      return;
    }
    if (target?.closest?.('.worker-exec-defaults-btn')) {
      exec_defaults_dialog.open();
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
    const cleanupDiagnoseBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-banner__cleanup-diagnose')
    );
    if (cleanupDiagnoseBtn) {
      const bead_id = cleanupDiagnoseBtn.dataset.beadId;
      if (bead_id) {
        void diagnoseCleanup(bead_id);
      }
      return;
    }
    if (target?.closest?.('.worker-play')) {
      void setAutoAdvance(!currentQueue().auto_advance);
      return;
    }
    // 전체 자동화 (UI-j6wa §1): 둘 다 켜져 있을 때만 끄고, 나머지 세 조합은
    // 전부 둘 다 켜기다 (혼합 상태 ON 정규화).
    if (target?.closest?.('.worker-auto-all')) {
      const q = currentQueue();
      void setAutoAll(!(q.auto_advance === true && q.auto_merge === true));
      return;
    }
    // The lane header's bulk merge control (UI-5v7d §4). It sits INSIDE a pane
    // header, so it has to be read before the header's own accordion toggle.
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
      void queueMerge(mergeBtn.dataset.beadId || '');
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
      void discardPr(discardBtn.dataset.beadId || '');
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
    if (target?.closest?.('.rtile__stop')) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const att = tile?.dataset?.attemptId;
      if (att) {
        void stopAttempt(att);
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

  mount_element.addEventListener('dragstart', /** @type {any} */ (onDragStart));
  mount_element.addEventListener('dragover', /** @type {any} */ (onDragOver));
  mount_element.addEventListener('dragleave', /** @type {any} */ (onDragLeave));
  mount_element.addEventListener('drop', /** @type {any} */ (onDrop));
  mount_element.addEventListener('click', /** @type {any} */ (onClick));
  mount_element.addEventListener('change', /** @type {any} */ (onChange));

  watchViewport();
  watchHeaderOffset();

  if (selectors) {
    unsubscribers.push(selectors.subscribe(doRender));
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
