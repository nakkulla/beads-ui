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
import { reviewSessionRowState } from '../../model/attempt-facts.js';
import { createChipPresetToggle } from '../../model/chip-preset-binding.js';
import {
  discardAbandonCompletionMessage,
  discardAbandonConfirmationMessage,
  discardCompletionMessage,
  discardConfirmationMessage
} from '../../model/discard.js';
import { providerProbeRefusalText } from '../../model/gate-labels.js';
import {
  PRIORITY_FILTER_OPTIONS,
  READINESS_FILTER_OPTIONS,
  ROUTE_FILTER_OPTIONS,
  TYPE_FILTER_OPTIONS,
  baseException,
  buildLanes,
  normalizeLabelFilter,
  normalizePriorityFilter,
  normalizeRouteFilter,
  normalizeTypeFilter,
  prWaitLaneOriginFields,
  resolvesConflict,
  toggleLabelFilter,
  togglePriorityFilter,
  toggleRouteFilter
} from '../../model/lane-model.js';
import { disabledModelsOf } from '../../model/model-visibility.js';
import { placeMenuLanes } from '../../model/placement.js';
import { prWaitRowFields } from '../../model/pr-wait-row.js';
import { mergeQueueRefusalText } from '../../model/pr-wait-status.js';
import { deriveWorkerBlockers } from '../../model/queue-blockers.js';
import {
  hasLiveResolveSession,
  tileResolveFields
} from '../../model/tile-resolve.js';
import { resolveContinuationMismatch } from '../../screens/dialogs/continuation-dialog.js';
import {
  providerResumeDialogTemplate,
  providerResumeDraft,
  providerResumeDraftChange,
  providerResumeOverride,
  showProviderResumeDialog
} from '../../screens/dialogs/provider-resume-dialog.js';
import { runResumeFlow } from '../../screens/dialogs/resume-flow.js';
import { runExternalWaitAction } from '../../screens/pipeline/external-wait-action.js';
import { createRepoOpsScriptViewer } from '../../screens/repo-ops/script-viewer.js';
import { createRepoOpsSettings } from '../../screens/repo-ops/settings.js';
import { createRepoOpsDrawer } from '../../screens/repo-ops/timeline.js';
import { createTranscriptDrawer } from '../../screens/transcript/transcript-drawer.js';
import { createChipPopover } from '../../ui/chip-popover.js';
import {
  isImplementationAttempt,
  latestImplementationAttempts
} from '../../utils/active-attempts.js';
import { formatAttemptTuple } from '../../utils/attempt-display.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { sessionRefDrawerInput } from '../../utils/session-ref.js';
import { showToast } from '../../utils/toast.js';
import { sumAttemptUsage } from '../../utils/token-usage.js';
import { watchMobile } from '../../utils/viewport.js';
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
import { createLaneCollapse } from './lane-collapse.js';
import { createLaneDrag } from './lane-drag.js';
import {
  SERIAL_LANE_LABEL,
  candidateCard,
  expandWaitSubject,
  graceRemainingMs,
  judgementPopoverOf,
  miniRow,
  nowPanel,
  paneTemplate,
  queueRowOps,
  repoOpsStripTemplate,
  setChipPresetContext,
  summaryChipsTemplate,
  tokenChipTemplate,
  waitBody
} from './lanes.js';
import { deriveWorkerOverlaps } from './queue-overlaps.js';
import { runningGridTemplate } from './running-grid.js';
import { createWorkspaceAdapter } from './workspace-adapter.js';

/**
 * @import { CandidateFilter, LaneItem, LaneModel, LaneQueueGroup } from '../../model/lane-model.js'
 * @import { ProviderResumeDraft } from '../../screens/dialogs/provider-resume-dialog.js'
 */

export { mergeStepView } from '../../model/merge-steps.js';

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
 * blocked is hidden by DEFAULT: a blocked bead cannot run now, so it is noise in
 * a pane whose whole job is "what can I dispatch". It is hidden, never dropped —
 * the admission gate ignores blocked-ness, so pre-queuing a blocked bead that
 * already has a spec is a live path and the toggle preserves it.
 *
 * @type {CandidateFilter}
 */
const CANDIDATE_FILTER_DEFAULT = {
  show_blocked: false,
  readiness: 'all',
  // 빈 배열이 "전체"다 (UI-q1tg §3.2) — 저장값 없는 사용자는 지금 화면 그대로다.
  routes: [],
  // Board에서 옮겨 온 세 축 (UI-p7s2 §6). 같은 규칙으로 "없는 키 = 전체"다.
  priorities: [],
  type: '',
  labels: []
};

/**
 * 보류 선반의 열림 상태 저장 키 (UI-p7s2 §3.2). 기본은 접힘이고, 읽기 실패도
 * 접힘이다.
 *
 * @type {string}
 */
const DEFERRED_OPEN_KEY = 'bdui.worker.deferred-open';

/**
 * @returns {boolean}
 */
function loadDeferredOpen() {
  try {
    return window.localStorage.getItem(DEFERRED_OPEN_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * @param {boolean} open
 */
function saveDeferredOpen(open) {
  try {
    if (open) {
      window.localStorage.setItem(DEFERRED_OPEN_KEY, '1');
    } else {
      window.localStorage.removeItem(DEFERRED_OPEN_KEY);
    }
  } catch {
    /* ignore — a private-mode storage denial must not break the shelf */
  }
}

/**
 * 유예 남은 초를 흘리는 재렌더 주기 (UI-q1tg §3.3). Monitor `TICK_MS`와 같은
 * 1초이고, 이 탭에서는 유예 행이 보이는 동안에만 돈다.
 *
 * @type {number}
 */
const GRACE_TICK_MS = 1_000;

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
    const readiness = parsed.readiness;
    return {
      show_blocked: parsed.show_blocked === true,
      readiness:
        readiness === 'ready' || readiness === 'not_ready' ? readiness : 'all',
      routes: normalizeRouteFilter(parsed.routes),
      priorities: normalizePriorityFilter(parsed.priorities),
      type: normalizeTypeFilter(parsed.type),
      labels: normalizeLabelFilter(parsed.labels)
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
 * The one sentence a `[세션에서 해결]` reply becomes on screen.
 *
 * The fallback reason is carried into the toast on purpose: a fresh session and
 * a fork look the same from outside, and the person is about to work inside the
 * difference (spec §4 — fail-quiet 은폐 금지).
 *
 * @param {any} res
 * @returns {string|null}
 */
export function resolveSessionToast(res) {
  if (!res || typeof res !== 'object') {
    return '세션 기동 응답을 받지 못했습니다';
  }
  if (res.conflict === true) {
    return '큐가 바뀌어 클릭이 적용되지 않았습니다 — 다시 눌러주세요';
  }
  if (res.session === 'already_running') {
    return `이미 열려 있습니다 · ${res.tmux_window || '?'}`;
  }
  if (res.launched !== true) {
    return `세션 기동 실패: ${res.reason || 'unknown'}`;
  }
  // The runner is the RESULT's, never the current global setting: a fork keeps
  // the recorded session's provider, so the person is about to work in whatever
  // this line says (codex-orchestration-parity §4.2).
  const runner = typeof res.runner === 'string' ? res.runner : 'claude';
  // A same-session conversation (`resume`, UI-nuwy §3.2) reopened exactly the
  // session the card names, so it needs no caveat either.
  return res.mode === 'fork' || res.mode === 'resume'
    ? null
    : `${runner} 새 세션으로 시작 (${res.fallback_reason || 'unknown'})`;
}

/**
 * The toast tone for the same reply. A fresh-session fallback is a SUCCESS with
 * a caveat, not an error: a session did start. An `already_running` reply is
 * guidance, not a refusal (UI-ri8n §3.4).
 *
 * @param {any} res
 * @returns {'success'|'error'|'info'}
 */
export function resolveSessionTone(res) {
  if (res && res.session === 'already_running') {
    return 'info';
  }
  return res && res.launched === true ? 'success' : 'error';
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
 * (discard spec §2), and there [정리 재시도] is the cleanup-retry button.
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
 * becomes a [정리 재시도] button because nothing auto-cleans it. 충돌 해소 is NOT one
 * of them any more — the attempt-less dispatch (UI-w0hi §1) runs it.
 * @param {{ position: number, active: boolean, failure: string|null, waiting?: string|null, resolution?: import('../../model/worker-queue-store.js').ResolutionProjection|null, continuation_action?: any, hold?: any, authority?: any, review_dispatch?: any }|null} [merge_queue]
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
 * @param {import('../../model/worker-queue-store.js').CompletionStatus|null} [completion] - Bounded root completion status;
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
 * @param {boolean} [resolve_pending] - 이 행의 `[세션에서 해결]` 클릭이 아직
 * 서버 응답을 기다리는 중인지 (UI-jw27 §4). 클라이언트만 아는 사실이라 스냅샷에
 * 없다 — 두 번째 클릭이 두 번째 창을 요청하지 않도록 버튼을 잠근다.
 * @param {{ foreign?: boolean, repo_slug?: string, pr_url?: string, pr_number?: number }} [external_pr]
 * The four PR facts the external-PR registry owns (UI-kyky §6.1), carried on the
 * synthesized overlay row only. `foreign === true` means the url names ANOTHER
 * repository, which this workspace never observes — so that row's PR link is
 * built from these verified values instead of the (absent) observation, and a
 * same-repo row keeps preferring what the poller observed. `repo_slug` alone
 * never re-decides `foreign`.
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
  resolve_pending = false,
  external_pr = {}
) {
  const fields = prWaitRowFields({
    bead_id,
    title,
    observations,
    cleanup_failed,
    usage,
    active,
    conflict_session,
    external,
    merge_queue,
    wt_present,
    auto_skip,
    base_exception,
    completion,
    discard_operations,
    auto_merge_on,
    progress_input,
    review_session,
    external_pr
  });
  const label = fields.badges[0] || null;
  const rendered_status_badge =
    fields.live_badge !== null && fields.live_title
      ? html`<span title=${fields.live_title}>${label}</span>`
      : label;
  // The pipeline-only fields (live-badge tooltip, resolve material) stay out
  // of this view's row, which draws them its own way.
  /** @type {Record<string, any>} */
  const row = { ...fields };
  delete row.live_title;
  delete row.cleanup_failed;
  delete row.completion_phase;
  return {
    ...row,
    title: external ? html`${title}<span class="muted"> · 세션</span>` : title,
    ...(dependency_chips ? { dependency_chips } : {}),
    badges: rendered_status_badge ? [rendered_status_badge] : [],
    live_badge: fields.live_badge !== null ? rendered_status_badge : null,
    // [세션에서 해결]의 재료 (UI-jw27 §4): 멈춘 머지 후 정리, needs_human 종단,
    // holding 보류, 실패한 폐기 작업.
    resolve_action:
      !!cleanup_failed ||
      completion?.phase === 'needs_human' ||
      completion?.phase === 'holding' ||
      !!fields.discard.error,
    resolve_enabled: !resolve_pending,
    resolve_title: resolve_pending
      ? '세션 기동 요청 중 — 서버 응답을 기다립니다'
      : '이 실패를 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork하고, 없으면 새 세션에 사유를 싣습니다'
  };
}

/**
 * The six subscription ids the Worker console renders (UI-hhn9 §5.1, 보류
 * 선반은 UI-p7s2 §3.1). Board or detail pushes must not re-render this tab.
 *
 * @type {readonly string[]}
 */
const WORKER_CLIENT_IDS = [
  'tab:worker:ready',
  'tab:worker:blocked',
  'tab:worker:in-progress',
  'tab:worker:resolved',
  'tab:worker:closed',
  'tab:worker:deferred'
];

/**
 * Create the Worker console view.
 *
 * @param {HTMLElement} mount_element - Element to render into.
 * @param {{ transport?: (type: string, payload?: unknown) => Promise<any>, issueStores?: any, queueStore?: any, sessionLogStore?: any, execPresetStore?: any, modelVisibilityStore?: any, gotoIssue?: (id: string) => void, getWorkspacePath?: () => (string|undefined), switchWorkspace?: (root_dir: string) => Promise<unknown>, openDoc?: (doc: import('../stepper.js').StepperDoc) => void, doneRange?: import('../../data/closed-range.js').DoneRange, onDoneRangeChange?: (range: import('../../data/closed-range.js').DoneRange) => void, onNewIssue?: () => void }} [options]
 * @returns {{ load: () => void, pause: () => void, refreshSessionDefaults: () => void, destroy: () => void }}
 */
export function createWorkerView(mount_element, options = {}) {
  /** @type {Set<string>} */
  const external_actions = new Set();

  /** Keep replacement buttons disabled while an operation is pending. */
  function syncExternalChecks() {
    for (const button of Array.from(
      mount_element.querySelectorAll('[data-external-wait-op]')
    )) {
      const element = /** @type {HTMLButtonElement} */ (button);
      element.disabled = external_actions.has(
        `${element.dataset.rootDir}:${element.dataset.waitId}`
      );
    }
  }

  /** @param {HTMLButtonElement} button */
  async function applyExternalWaitAction(button) {
    const root_dir = button.dataset.rootDir || '';
    const wait_id = button.dataset.waitId || '';
    const key = `${root_dir}:${wait_id}`;
    if (!transport || !root_dir || !wait_id || external_actions.has(key)) {
      return;
    }
    external_actions.add(key);
    syncExternalChecks();
    try {
      await runExternalWaitAction(button, {
        transport,
        adopt: (res) => {
          if (rootDir() === root_dir) {
            adopt(res);
          }
        }
      });
    } finally {
      external_actions.delete(key);
      syncExternalChecks();
      doRender();
    }
  }
  const {
    transport,
    issueStores,
    queueStore,
    sessionLogStore,
    execPresetStore,
    modelVisibilityStore,
    gotoIssue,
    getWorkspacePath,
    switchWorkspace,
    openDoc,
    doneRange,
    onDoneRangeChange,
    onNewIssue
  } = options;
  // 후보 순서는 정렬 체인과 그 뒤의 의존 인접화 패스가 정한다 (UI-d13v §6,
  // UI-q1y7 §2) — 수동 rank 채널은 Board 탭과 함께 사라졌다 (UI-p7s2 §7.2).
  const selectors = issueStores
    ? createListSelectors(issueStores, {
        client_ids: WORKER_CLIENT_IDS
      })
    : null;

  /**
   * Candidate pane display filter (UI-ki09), restored at view creation.
   *
   * @type {CandidateFilter}
   */
  let candidate_filter = loadCandidateFilter();
  /** Whether the 라벨 필터 팝오버 is open (UI-p7s2 §6). */
  let label_filter_open = false;
  /**
   * 보류 선반의 열림 상태 (§3.2), 뷰 생성 시 복원된다.
   *
   * @type {boolean}
   */
  let deferred_open = loadDeferredOpen();
  /**
   * The three Board-inherited filter axes, normalized at every read so a stored
   * value that drifted cannot empty a lane (UI-p7s2 §6).
   *
   * @returns {number[]}
   */
  function priorityFilter() {
    return normalizePriorityFilter(candidate_filter.priorities);
  }
  /**
   * @returns {string}
   */
  function typeFilter() {
    return normalizeTypeFilter(candidate_filter.type);
  }
  /**
   * @returns {string[]}
   */
  function labelFilter() {
    return normalizeLabelFilter(candidate_filter.labels);
  }
  /**
   * 유예 행이 보이는 동안에만 도는 1초 타이머 (UI-q1tg §3.3). `null`이 "지금
   * 도는 것이 없다"이며, 상시 타이머는 만들지 않는다.
   *
   * @type {number|null}
   */
  let grace_timer = null;
  /** @type {string|null} Candidate whose queue-lane picker is open. */
  let place_menu_bead_id = null;
  /** @type {string|null} */
  let open_failure_detail = null;
  /** @type {ProviderResumeDraft|null} */
  let provider_resume_draft = null;
  /**
   * 판정 칩 사유 팝업 (UI-8x90 §4.5·§5). 열림 키가 `bead_id + chip_key`라 카드가
   * 다시 그려져도 같은 칩 아래에 그대로 열려 있다.
   */
  const chip_popover = createChipPopover(() => doRender());
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
   * The narrow-viewport form of the same period (UI-8gem §8) — the long form
   * stays in each chip's `title`.
   *
   * @returns {string}
   */
  function doneRangeShort() {
    const opt = DONE_RANGE_OPTIONS.find((o) => o.value === done_range);
    return opt ? opt.short : '오늘';
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
   * 이 탭의 이슈 검색어 (UI-6g3t §7). 뷰의 메모리에만 있고 localStorage에는
   * 쓰지 않는다 — 새로고침 뒤 남은 검색어는 아무도 요청하지 않은 채 화면 절반을
   * 흐리게 만든다. 일치하지 않는 카드는 흐려질 뿐 사라지지 않으므로 순번·드래그
   * 좌표·건수는 검색과 무관하다.
   *
   * @type {string}
   */
  let search_query = '';
  /**
   * Whether a search is on. 판정은 모델과 같은 정규화(`trim`)를 쓴다 — 공백만
   * 친 검색은 검색이 아니다.
   */
  function searching() {
    return search_query.trim().length > 0;
  }
  /**
   * One pane header's 「일치 n」 (§7). 검색 중이 아니면 `undefined`이고, 그때
   * `paneTemplate`은 키가 없는 것으로 보고 지금 그대로 그린다 (fail-quiet).
   *
   * @param {any[]} rows
   * @returns {number|undefined}
   */
  function matchCountOf(rows) {
    return searching()
      ? rows.filter((row) => row.search_match === true).length
      : undefined;
  }
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
   * Beads whose `[세션에서 해결]` click is in flight (UI-jw27 §4). The pane
   * marker on the server is the AUTHORITY for "one live resolution session per
   * bead"; this only keeps the row from inviting a second click the server
   * would answer with `already_running`.
   *
   * @type {Set<string>}
   */
  const resolve_pending = new Set();
  /**
   * Beads whose `[워커로 이어가기]` click is in flight (UI-nuwy §3.6), so a
   * second click cannot race the first reservation.
   *
   * @type {Set<string>}
   */
  const handoff_pending = new Set();
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

  /** 드롭 식별자·계획 실행 컨트롤러 (UI-4tud §4.5). */
  const lane_drag = createLaneDrag({
    transport,
    console_el,
    getLanes: () => current_lanes,
    getWorkspaces: () => last_workspaces,
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
   * Open the provider recovery selector from the original attempt identity
   * (UI-jr8v §10). 선택기 자체는 두 탭이 공유하는 `provider-resume-dialog.js`가
   * 소유하고, 이 화면은 draft 하나만 들고 있다.
   *
   * @param {string} attempt_id
   */
  function openProviderResumeDialog(attempt_id) {
    const draft = providerResumeDraft(
      attempt_id,
      currentQueue(),
      disabledModelsOf(modelVisibilityStore)
    );
    if (!draft) {
      return;
    }
    provider_resume_draft = draft;
    doRender();
  }

  /** Close the provider recovery selector without resuming. */
  function closeProviderResumeDialog() {
    provider_resume_draft = null;
    doRender();
  }

  /** Send the selected one-attempt override through the existing resume path. */
  function confirmProviderResumeDialog() {
    const override = providerResumeOverride(provider_resume_draft);
    if (!override) {
      return;
    }
    provider_resume_draft = null;
    doRender();
    void resumeAttempt(override.attempt_id, 'session', override.payload);
  }

  /**
   * Build the open candidate menu for this render, if its bead is still shown.
   *
   * @param {any[]} candidates
   * @returns {import('./lanes.js').PlaceMenu|null}
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
    const lanes = placeMenuLanes(currentQueue());
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
   * Resume (↻ / paused tile ▶) an attempt (spec §1). The flow itself — 지시
   * 다이얼로그, 충돌 1회 재시도, provider 경계, 거부 토스트 — 는
   * `runResumeFlow`가 소유하고(UI-6g3t §5.1), 이 화면이 넘기는 것은 대상 문맥과
   * 재시도 없는 전송 하나뿐이다. `expected_revision`을 전송마다 새로 읽으므로
   * `adopt`가 채택한 큐가 곧 다음 전송의 revision이다.
   *
   * `resume_kind`는 실패 타일이 누른 버튼의 종류이며(UI-8h1x §3.3c), 다이얼로그
   * 제목·확인 문구와 거부 토스트 문구가 그 버튼 라벨을 따르게 한다.
   *
   * @param {string} attempt_id
   * @param {'settlement'|'session'} [resume_kind]
   * @param {Record<string, unknown>} [base_payload]
   */
  async function resumeAttempt(
    attempt_id,
    resume_kind = 'session',
    base_payload = {}
  ) {
    if (!transport || !attempt_id) {
      return;
    }
    const send = transport;
    const attempt = currentQueue().attempts?.[attempt_id] || null;
    // `base_payload` carries this call's one-attempt `exec_override` and forced
    // continuation. It rides the flow's base payload so every send in the flow
    // — first try, conflict retry, mismatch resend — keeps it, which is the
    // division worker-operation-surface-unify §5.1 assigned: that spec owns the
    // flow, this one owns the value.
    await runResumeFlow({
      context: {
        bead_id: attempt?.bead_id || '',
        kind: resume_kind,
        tuple: attempt ? formatAttemptTuple(attempt) : ''
      },
      transport: (payload) =>
        /** @type {any} */ (
          send('worker-attempt-resume', {
            attempt_id,
            expected_revision: currentRevision(),
            ...base_payload,
            ...payload
          })
        ),
      adopt
    });
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
        showToast(`정리 재시도 거부: ${res.reason}`, 'error', 2400);
      }
    } finally {
      cleanup_pending.delete(bead_id);
      doRender();
    }
  }

  /**
   * Start the interactive resolution session for one terminal failure row
   * (UI-jw27 §4). The click is the ONLY trigger — nothing else in this view
   * calls it — and the reply is reported verbatim rather than folded away: a
   * fresh-session fallback and a fork look identical on screen otherwise, and
   * the person is about to work inside the difference.
   *
   * @param {string} bead_id
   */
  async function resolveInSession(bead_id) {
    if (!transport || !bead_id || resolve_pending.has(bead_id)) {
      return;
    }
    resolve_pending.add(bead_id);
    doRender();
    try {
      const res = /** @type {any} */ (
        await transport('worker-resolve-in-session', {
          bead_id,
          expected_revision: currentRevision()
        })
      );
      adopt(res);
      const message = resolveSessionToast(res);
      if (message !== null) {
        showToast(message, resolveSessionTone(res), 4000);
      }
    } finally {
      resolve_pending.delete(bead_id);
      doRender();
    }
  }

  /**
   * `[워커로 이어가기]` (UI-nuwy §3.6): hand a conversation stop back to the
   * Worker. The server decides — a reservation while the window closes, a
   * direct resume after it vanished, or a refusal with its reason.
   *
   * @param {string} bead_id
   * @param {string} attempt_id
   */
  async function handoffToWorker(bead_id, attempt_id) {
    if (!transport || !bead_id || !attempt_id || handoff_pending.has(bead_id)) {
      return;
    }
    handoff_pending.add(bead_id);
    doRender();
    try {
      const res = /** @type {any} */ (
        await transport('worker-conversation-handoff', {
          bead_id,
          attempt_id,
          expected_revision: currentRevision()
        })
      );
      adopt(res);
      if (res && res.conflict) {
        showToast(
          '큐가 바뀌어 클릭이 적용되지 않았습니다 — 다시 눌러주세요',
          'error',
          2800
        );
      } else if (res && !res.resumed) {
        showToast(
          `워커로 이어가기 거부: ${res.reason || 'unknown'}`,
          'error',
          2800
        );
      } else if (res && res.pending) {
        showToast(
          '대화 창을 닫는 중 — 창이 닫히면 Worker가 이어갑니다',
          'info',
          2800
        );
      }
    } finally {
      handoff_pending.delete(bead_id);
      doRender();
    }
  }

  /**
   * `↻ 지금 프로브` (UI-o5ll §3.4): 그 러너의 공급자 회복 프로브를 지금
   * 발화시킨다. 재료는 버튼이 그려진 게이트의 것을 그대로 쓴다 —
   * 공급자 보류는 러너별 레코드의 `since`를 쓴다. 응답은 무장 사실만 말하고 판정은 다음
   * 스냅샷으로 온다.
   *
   * @param {string} runner
   * @param {number} since
   */
  async function probeProviderNow(runner, since) {
    if (!transport || runner.length === 0 || !Number.isFinite(since)) {
      return;
    }
    const res = /** @type {any} */ (
      await transport('worker-provider-probe-now', { runner, since })
    );
    adopt(res);
    if (res && res.ok === false) {
      showToast(
        `지금 프로브 거부: ${providerProbeRefusalText(res.reason)}`,
        'error',
        2800
      );
    }
  }

  /**
   * `[지금 시작]` (UI-q1tg §3.3): 이 행 하나의 대기 진입 유예를 걷고 `▶ 진행`과
   * 같은 명시적 실행 경로를 민다. CAS가 없다 — 서버가 `added_at`을 비롯한 큐를
   * 전혀 쓰지 않으므로 되돌릴 durable 변경도, 경합할 revision도 없다.
   *
   * @param {string} bead_id
   */
  async function startNow(bead_id) {
    if (!transport || !bead_id) {
      return;
    }
    const res = /** @type {any} */ (
      await transport('worker-queue-start-now', { bead_id })
    );
    adopt(res);
    if (res && res.ok === false) {
      showToast(
        `지금 시작 거부: ${
          res.reason === 'not_waiting'
            ? '이 이슈는 더 이상 대기 레인에 없습니다'
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
   * Abandon one failed pre-backup discard operation after confirmation. CAS
   * conflicts adopt the fresh queue and retry once, matching discardBead.
   *
   * @param {string} bead_id
   * @param {string} operation_id
   * @param {{ kind?: string, last_error: string }} operation
   */
  async function abandonDiscard(bead_id, operation_id, operation) {
    if (!transport || !bead_id || !operation_id) {
      return;
    }
    if (
      typeof globalThis.confirm === 'function' &&
      !globalThis.confirm(discardAbandonConfirmationMessage(bead_id, operation))
    ) {
      return;
    }
    let res = /** @type {any} */ (
      await transport('worker-discard-abandon', {
        bead_id,
        operation_id,
        expected_revision: currentRevision()
      })
    );
    adopt(res);
    if (res && res.conflict) {
      res = /** @type {any} */ (
        await transport('worker-discard-abandon', {
          bead_id,
          operation_id,
          expected_revision: currentRevision()
        })
      );
      adopt(res);
    }
    if (res && res.abandoned === true) {
      showToast(discardAbandonCompletionMessage(operation), 'success', 5000);
      return;
    }
    if (res && res.reason) {
      showToast(`폐기 포기 거부: ${res.reason}`, 'error', 2800);
      return;
    }
    if (res && !res.conflict) {
      showToast('폐기 포기 거부: unknown', 'error', 2800);
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

  /**
   * One shared lane model (UI-4tud §4.1). 어댑터가 `worker-queue` 스냅샷과 Board
   * live store 다섯 열을 워크스페이스 항목 하나로 접고, `buildLanes`가 두 탭이
   * 같이 쓰는 레인 모델을 낸다.
   *
   * 후보 순서는 어댑터의 정렬 체인과 그 뒤의 의존 인접화 패스가 이미 정했으므로
   * (UI-q1y7 §4.2) `as_given`이다. 대기·직렬·후보가 모두 비어도 그룹은 남아야
   * 하므로 (`slots`·머지 큐·저장소 작업이 그 안에 산다) `groups: 'all'`이다.
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
      candidate_sort: 'as_given',
      groups: 'all',
      // 검색은 워커 탭만의 강조다 (§7): 값이 비면 모델은 키를 달지 않으므로
      // Monitor 탭과 같은 모델이 그대로 나온다.
      search: search_query
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
   * `dependency_chips`에 겹침 파생(`overlap_chips`·`scope_state`)을 얹는다.
   * 재료가 하나도 없으면 `null`이다.
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
    return {
      ...kept,
      ...(predecessors ? { predecessors } : {}),
      ...(overlaps ? { overlaps } : {}),
      ...(scope_missing ? { scope_missing: true } : {})
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
      dependency_chips: chipsWithOverlaps(item) || undefined,
      chip_popover: popoverOf(item)
    };
  }

  /**
   * The 판정 칩 사유 팝업 open on this card (UI-8x90 §4.5). 열림은 뷰가,
   * 문장은 `judgementPopoverContent`가 소유한다 — 두 탭이 같은 팝업을 낸다.
   *
   * @param {{ id: string }} item
   * @returns {{ chip_key: string, content: import('../../ui/chip-popover.js').ChipPopoverContent }|null}
   */
  function popoverOf(item) {
    return judgementPopoverOf(/** @type {any} */ (item), (chip_key) =>
      chip_popover.isOpen({ bead_id: item.id, chip_key })
    );
  }

  /**
   * One 대기·직렬 row.
   *
   * @param {LaneItem} item
   * @returns {any}
   */
  function waitingRowOf(item) {
    const row = rowOf(item);
    return {
      ...row,
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
    return groupOf(m).sublanes.parallel.map((item) => waitingRowOf(item));
  }

  /**
   * The 직렬 레인 view model (UI-04vo §4). 점유 lineage는 ghost 행이 대표하고, 그 행은
   * 대기 entries의 구성원이 아니므로 드래그도 드롭 인덱스도 갖지 않는다.
   *
   * @param {LaneModel} m
   * @returns {Array<{ id: string, index: number, raw_length: number, ghosts: any[], items: any[], occupied: boolean, badge: string, cycle: boolean }>}
   */
  function serialLanes(m) {
    return groupOf(m).sublanes.serial.map((lane) => {
      const ghosts = lane.occupants.map((occupant) => ({
        id: occupant.id,
        title: occupant.title,
        draggable: false,
        lane: lane.id,
        ghost: true,
        badges: [occupant.badge],
        // 검색 중이 아니면 모델이 키를 달지 않으므로 여기도 달지 않는다 (§7).
        ...(typeof occupant.search_match === 'boolean'
          ? { search_match: occupant.search_match }
          : {})
      }));
      return {
        id: lane.id,
        index: lane.index + 1,
        raw_length: lane.raw_length,
        ghosts,
        items: lane.items.map((item) => waitingRowOf(item)),
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
   * The 보류 선반 cards (UI-p7s2 §3.2). 후보 카드와 같은 투영을 쓴다 — 다른 것은
   * `candidateCard`에 넘기는 변형 하나뿐이다.
   *
   * @param {LaneModel} m
   * @returns {any[]}
   */
  function deferredRows(m) {
    return m.deferred.map((item) => rowOf(item));
  }

  /**
   * The collapsed 보류 구역 at the very bottom of the 후보 pane body (§3.2). N이 0이면 구역 자체를 그리지
   * 않는다 — 재료가 없는 줄은 그리지 않는다 (fail-quiet). 모니터 스냅샷에는
   * deferred 행이 없으므로 그 탭에서는 언제나 이 자리가 빈다.
   *
   * @param {LaneModel} m
   * @returns {import('lit-html').TemplateResult|undefined}
   */
  function deferredSectionTemplate(m) {
    const rows = deferredRows(m);
    if (rows.length === 0) {
      return undefined;
    }
    return html`<details class="worker-deferred" ?open=${deferred_open}>
      <summary class="worker-deferred__summary">보류 ${rows.length}</summary>
      <div class="worker-deferred__body">
        ${rows.map((row) =>
          candidateCard(row, null, {
            variant: 'deferred',
            onOpenDoc: openDoc
              ? (/** @type {Event} */ _ev, /** @type {any} */ doc) =>
                  openDoc(doc)
              : undefined
          })
        )}
      </div>
    </details>`;
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
            // 선행 대기는 Monitor 어댑터와 같은 네 키로 싣는다 (선행 대기 계층
            // §5.4, ADR 0014). 여기서 빠뜨리면 같은 렌더러가 이 타일을 실행 중
            // 타일로 그려 시계와 세션 조작을 준다.
            waiting: item.run_state === 'waiting',
            wait: item.wait || null,
            provider_hold: item.run_state === 'provider_hold',
            hold: item.hold || null,
            status_label:
              item.run_state === 'failed'
                ? item.status === 'orphaned'
                  ? '중단됨'
                  : '실패'
                : item.run_state === 'parked'
                  ? '확인 필요'
                  : item.run_state === 'retry_wait'
                    ? '재시도 대기'
                    : item.run_state === 'waiting'
                      ? item.wait?.recovery
                        ? item.wait.recovery.label || ''
                        : '선행 대기'
                      : item.run_state === 'provider_hold'
                        ? '공급자 보류'
                        : item.status_label,
            can_pause: item.can_pause !== false,
            // 레포 배지는 한 레포 화면의 사실이 아니다 (모니터 타일만 그린다).
            workspace_name: '',
            dependency_chips: chipsWithOverlaps(item) || undefined,
            chip_popover: popoverOf(item),
            rollup_expanded: rollup_expanded_ids.has(item.id),
            failure: item.failure
              ? {
                  ...item.failure,
                  open: open_failure_detail === item.attempt_id
                }
              : null,
            ...tileResolveFields(
              item,
              resolve_pending.has(item.id),
              handoff_pending.has(item.id)
            )
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
    // 판정 팝업의 열림은 모델이 아니라 클릭이 바꾼다 (UI-h6t1 §4.2): 메모는 무거운
    // 투영만 재사용하고, `chip_popover`는 렌더마다 다시 얹는다.
    return prWaitRowsOf(m).map((/** @type {any} */ row) => ({
      ...row,
      chip_popover: popoverOf(row)
    }));
  }

  /**
   * The memoized part of {@link prWaitRows} — everything that depends only on
   * the lane model and the current snapshot.
   *
   * @param {LaneModel} m
   * @returns {any[]}
   */
  function prWaitRowsOf(m) {
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
    const rows = (Array.isArray(q.pr_wait) ? q.pr_wait : []).map(
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
            /** @type {any} */ (group).runner_catalog || null
          ),
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
            authority: group.merge.authorities.get(e.bead_id) || null,
            hold: merge_entries.get(e.bead_id)?.hold || null,
            review_dispatch:
              merge_entries.get(e.bead_id)?.review_dispatch || null
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
          q.auto_merge === true,
          {
            merge_sha: e.merge_sha,
            cleanup_cursor: e.cleanup_cursor,
            repo_operations: group.repo_operations
          },
          item ? chipsWithOverlaps(item) : null,
          reviewSessionRowState(attempts, e.bead_id),
          resolve_pending.has(e.bead_id),
          // 등록부가 소유한 네 필드 (UI-kyky §6.1). 합성 행에만 실리고, merge
          // queue만으로 합성한 행에는 없다 — 없으면 없는 대로 넘긴다.
          {
            ...(e.foreign === true ? { foreign: true } : {}),
            ...(typeof e.repo_slug === 'string'
              ? { repo_slug: e.repo_slug }
              : {}),
            ...(typeof e.pr_url === 'string' ? { pr_url: e.pr_url } : {}),
            ...(typeof e.pr_number === 'number'
              ? { pr_number: e.pr_number }
              : {})
          }
        );
        // 살아 있는 해결 세션이 이미 이 질문에 답하고 있다 (UI-ri8n §3.4).
        const row = {
          ...pr_row,
          resolve_action:
            pr_row.resolve_action &&
            !hasLiveResolveSession(item?.interactive_sessions)
        };
        return {
          ...row,
          ...prWaitLaneOriginFields(e, last_impl_by_bead),
          // 검색 판정은 레인 모델이 소유한다 (UI-6g3t §7). PR 대기 행은 행
          // 투영이 새로 만드는 객체라 그 키를 여기서 옮겨 실어야 하고, 검색이
          // 없으면 옮길 키도 없다 (fail-quiet).
          ...(item?.search_match === undefined
            ? {}
            : { search_match: item.search_match }),
          // 우선순위·타입·라벨 필터의 흐림도 같은 이유로 옮긴다 (UI-p7s2 §6).
          ...(item?.filter_match === undefined
            ? {}
            : { filter_match: item.filter_match }),
          workflow: bead_workflow[e.bead_id] || null,
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
        lane_id:
          tile.lane_origin?.kind === 'serial'
            ? `s${tile.lane_origin.index}`
            : null
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
    // 세 카운트는 데스크톱 KPI 줄과 모바일 리본이 함께 쓴다 — 같은 수를 두 번
    // 정의하지 않기 위해 템플릿 하나로 둔다.
    const counts = summaryChipsTemplate({
      running: group.live_count,
      pr_wait: prWaitRows(m).length,
      done: m.done.length,
      range_label: doneRangeLabel(),
      range_short: doneRangeShort(),
      workspaces: last_workspaces.map((workspace) => ({
        root_dir: workspace.root_dir,
        name: workspace.name,
        wait_reasons: workspace.wait_reasons
      })),
      reveal: (root_dir, bead_id) => {
        expandWaitSubject(m, collapse, root_dir, bead_id);
        doRender();
      }
    });
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
    // 검색은 "누르는 곳"이므로 조작 묶음의 끝이다 (UI-6g3t §7, 툴바 규칙은
    // UI-58y2). 후보 필터 strip과는 답하는 질문이 다르다 — strip은 후보 페인의
    // 표시 조건이고 이 입력은 탭 전체의 강조다. 버튼이 아니므로 `.op-btn`을
    // 주지 않는다.
    const search = html`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${search_query}
    />`;
    // `+ 새 이슈` (UI-p7s2 §4). 조작 묶음의 오른쪽 끝이고, 모바일에서는 글자를
    // 떼고 `+`만 남긴다 — 좁은 리본에서 이 버튼은 아이콘으로 읽힌다.
    const new_issue = html`<button
      type="button"
      class="op-btn op-btn--primary worker-new-issue"
      aria-label="새 이슈"
      title="새 이슈 (Cmd/Ctrl+N)"
    >
      ${is_mobile ? '+' : '+ 새 이슈'}
    </button>`;
    // 정리 멈춤은 더 이상 배너가 아니라 타임라인의 한 항목이다 (§4.2) — 스트립의
    // 해결 필요 배지가 부르고, 클릭이 그 자리로 데려간다.
    const repo_operations = repoOpsStripTemplate(
      group.repo_operations,
      group.cleanup_failures
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
          <div class="worker-ctrl__ops">${settings}${search}${new_issue}</div>
          <div class="worker-kpi">${base_chip}</div>
        </div>
        ${repo_operations}${repo_ops_settings.template()}`;
    }
    // 좌: 조작 / 우: KPI (UI-58y2 데스크톱 §툴바).
    return html`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${play}${merge_all}${settings}${search}${new_issue}
        </div>
        <div class="worker-kpi">
          ${overcap}${counts}${base_chip}
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
                >${tokenChipTemplate(
                  `${doneRangeLabel()} 완료 · 누적 ${badge.label}`,
                  badge.label
                )}</span
              >`
          )}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${next_head}</b></span
          >
        </div>
      </div>
      ${repo_operations}${repo_ops_settings.template()}`;
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
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${READINESS_FILTER_OPTIONS.map(
          (o) =>
            html`<button
              type="button"
              class="worker-filter__chip${candidate_filter.readiness === o.value
                ? ' is-active'
                : ''}"
              data-readiness=${o.value}
              aria-pressed=${candidate_filter.readiness === o.value
                ? 'true'
                : 'false'}
            >
              ${o.label}
            </button>`
        )}
        ${hidden.readiness > 0
          ? html`<span class="worker-filter__hidden"
              >숨김 ${hidden.readiness}</span
            >`
          : ''}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${ROUTE_FILTER_OPTIONS.map(
          (o) =>
            html`<button
              type="button"
              class="worker-filter__chip worker-filter__route${candidate_filter.routes.includes(
                o.value
              )
                ? ' is-active'
                : ''}"
              data-route=${o.value}
              aria-pressed=${candidate_filter.routes.includes(o.value)
                ? 'true'
                : 'false'}
            >
              ${o.label}
            </button>`
        )}
        ${hidden.route > 0
          ? html`<span class="worker-filter__hidden"
              >숨김 ${hidden.route}</span
            >`
          : ''}
      </div>
      <div
        class="worker-filter__priorities"
        role="group"
        aria-label="우선순위 필터"
      >
        ${PRIORITY_FILTER_OPTIONS.map(
          (o) =>
            html`<button
              type="button"
              class="worker-filter__chip worker-filter__priority${priorityFilter().includes(
                o.value
              )
                ? ' is-active'
                : ''}"
              data-priority=${String(o.value)}
              aria-pressed=${priorityFilter().includes(o.value)
                ? 'true'
                : 'false'}
            >
              ${o.label}
            </button>`
        )}
        ${hidden.priority > 0
          ? html`<span class="worker-filter__hidden"
              >숨김 ${hidden.priority}</span
            >`
          : ''}
      </div>
      <select class="worker-sort worker-filter__type" aria-label="타입 필터">
        ${TYPE_FILTER_OPTIONS.map(
          (o) =>
            html`<option value=${o.value} ?selected=${typeFilter() === o.value}>
              ${o.label}
            </option>`
        )}
      </select>
      ${hidden.type > 0
        ? html`<span class="worker-filter__hidden">숨김 ${hidden.type}</span>`
        : ''}
      ${labelFilterTemplate(m)}
      ${hidden.label > 0
        ? html`<span class="worker-filter__hidden">숨김 ${hidden.label}</span>`
        : ''}
    </div>`;
  }

  /**
   * Union of the labels on every lane row this render draws (UI-p7s2 §6). 표시 정책과
   * 무관하게 전부 보인다 — 감춰진 라벨도 필터로는 걸 수 있어야 한다.
   *
   * @param {LaneModel} m
   * @returns {string[]}
   */
  function labelOptions(m) {
    /** @type {Set<string>} */
    const labels = new Set();
    // 보류도 필터 **이전** 집합에서 모은다 — 필터 뒤 목록에서 모으면 보류에만
    // 있는 라벨 A를 고른 순간 B 옵션이 사라져 다중 선택이 성립하지 않는다.
    for (const item of [
      ...m.runnable_all,
      ...m.deferred_all,
      ...m.queue,
      ...m.running,
      ...m.pr_wait,
      ...m.done
    ]) {
      for (const label of Array.isArray(item.labels) ? item.labels : []) {
        if (typeof label === 'string' && label.length > 0) {
          labels.add(label);
        }
      }
    }
    // 고른 라벨이 이 렌더의 행에 하나도 없어도 목록에 남아야 끌 수 있다.
    for (const label of labelFilter()) {
      labels.add(label);
    }
    return [...labels].sort((a, b) => a.localeCompare(b));
  }

  /**
   * The 라벨 필터 button and its check-list popover (UI-p7s2 §6). 기존 판정 칩 팝오버와 같은
   * `.chip-popover` 문법을 쓰되 열림은 이 조작 자신이 들고 있다 — 판정 칩 팝업은
   * bead 하나에 매인 열림 키를 쓰므로 카드 밖 조작이 올라탈 자리가 없다.
   *
   * @param {LaneModel} m
   * @returns {import('lit-html').TemplateResult}
   */
  function labelFilterTemplate(m) {
    const selected = labelFilter();
    const options = labelOptions(m);
    return html`<div class="worker-filter__labels">
      <button
        type="button"
        class="worker-filter__chip worker-filter__labels-btn${selected.length >
        0
          ? ' is-active'
          : ''}"
        aria-expanded=${label_filter_open ? 'true' : 'false'}
        title="라벨 필터"
      >
        라벨${selected.length > 0 ? ` ${selected.length}` : ''} ▾
      </button>
      ${label_filter_open
        ? html`<div class="chip-popover worker-filter__labels-pop">
            ${options.length === 0
              ? html`<div class="chip-popover__line">라벨 없음</div>`
              : options.map(
                  (label) =>
                    html`<label class="worker-filter__label-option">
                      <input
                        type="checkbox"
                        class="worker-filter__label-check"
                        data-label=${label}
                        .checked=${selected.includes(label)}
                      />
                      ${label}
                    </label>`
                )}
          </div>`
        : ''}
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
      ${miniRow(
        {
          ...item,
          ...tileResolveFields(
            item,
            resolve_pending.has(item.id),
            handoff_pending.has(item.id)
          )
        },
        { actions: queueRowOps(item) }
      )}
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
    const group = groupOf(m);
    return waitBody({
      parallel: {
        rows: parallel_rows.map((/** @type {any} */ it, index) =>
          dragRow(it, { kind: 'parallel', root_dir, row_index: index })
        ),
        count: parallel_rows.length,
        slots:
          parallel_rows.length > 0 || group.live_count >= 1 || group.over_cap
            ? [
                {
                  root_dir,
                  name: '',
                  live: group.live_count,
                  cap: group.slots,
                  saturated: group.live_count >= group.slots
                }
              ]
            : [],
        collapsed: collapse.isAreaCollapsed('parallel'),
        drop: { drop: 'parallel', root_dir }
      },
      serial: {
        lanes: serialLanes(m).map((lane) => ({
          id: lane.id,
          title: `${SERIAL_LANE_LABEL} ${lane.index}`,
          rows: [
            // 점유 ghost 행은 서버 레인 entries의 구성원이 아니므로 드롭 마커
            // 에도 서버 인덱스에도 들어가지 않는다 — 좌표 속성을 싣지 않는다.
            ...lane.ghosts.map((/** @type {any} */ it) =>
              miniRow(
                {
                  ...it,
                  ...tileResolveFields(
                    it,
                    resolve_pending.has(it.id),
                    handoff_pending.has(it.id)
                  )
                },
                { actions: queueRowOps(it) }
              )
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
          // 「일치 n」도 건수와 같은 재료로 읽는다 — 점유 ghost 행도 이 레인에
          // 그려지는 행이므로 일치 수에 든다 (§7).
          match_count: matchCountOf([...lane.ghosts, ...lane.items]),
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
      match_count: matchCountOf(candidates),
      src: true,
      empty: '후보 없음',
      header_control: candidateSortTemplate(),
      header_row: sort_chain_open ? candidateSortChainTemplate() : undefined,
      controls: candidateControlsTemplate(m),
      footer: deferredSectionTemplate(m),
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
      match_count: matchCountOf(done),
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
            match_count: matchCountOf(waiting),
            collapsible: true,
            collapsed: collapse.isCollapsed('queue'),
            preview: stripPreview(waiting),
            body: waitBodyTemplate(m)
          })}
          ${candidate_pane} ${done_pane}
        </div>
        ${providerResumeDialogTemplate(
          provider_resume_draft,
          currentQueue(),
          disabledModelsOf(modelVisibilityStore)
        )}`;
    }
    return html`<div class="worker-lanes">
        ${candidate_pane}
        ${paneTemplate({
          id: 'worker-pane-queue',
          lane: 'queue',
          title: '대기',
          items: waiting,
          count: waiting.length,
          match_count: matchCountOf(waiting),
          collapsible: true,
          collapsed: collapse.isCollapsed('queue'),
          body: waitBodyTemplate(m)
        })}
        ${paneTemplate({
          id: 'worker-pane-running',
          lane: 'running',
          title: '실행 중',
          items: /** @type {any[]} */ (running),
          match_count: matchCountOf(running),
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
          match_count: matchCountOf(pr_wait),
          empty: 'PR 대기 없음',
          collapsible: true,
          collapsed: collapse.isCollapsed('pr_wait')
        })}
        ${done_pane}
      </div>
      ${providerResumeDialogTemplate(
        provider_resume_draft,
        currentQueue(),
        disabledModelsOf(modelVisibilityStore)
      )}`;
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

  /**
   * Run a one-second timer — 유예 행이 하나라도 보이는 동안에만 (UI-q1tg §3.3).
   * Monitor에는 `tick_timer`가 이미 있지만 이 탭에는 없었다 — 남은 초가 흐르려면
   * 1초마다 다시 그려야 한다. 유예 행이 사라지면 그 자리에서 해제하므로 상시
   * 타이머가 되지 않는다.
   *
   * 자동 진행이 꺼진 저장소의 행은 유예 칩을 그리지 않으므로 (UI-3pu9 §4.3)
   * 세지 않는다 — 보이지 않는 칩 때문에 타이머가 돌면 안 된다.
   *
   * @param {LaneModel} m
   */
  function syncGraceTimer(m) {
    const now = Date.now();
    const has_grace = m.queue.some(
      (item) =>
        item.manual_only !== true && graceRemainingMs(item.added_at, now) > 0
    );
    if (!has_grace) {
      stopGraceTimer();
      return;
    }
    if (grace_timer === null) {
      grace_timer = window.setInterval(() => {
        try {
          doRender();
        } catch {
          /* ignore — a render failure must not leave the timer wedged */
        }
      }, GRACE_TICK_MS);
    }
  }

  function stopGraceTimer() {
    if (grace_timer !== null) {
      window.clearInterval(grace_timer);
      grace_timer = null;
    }
  }

  /**
   * 바인딩된 판정 칩의 클릭 하나 (UI-wg68 §5.3). 서버가 적용과 복원을 고르므로
   * 여기서는 CAS revision과 `root_dir`만 싣는다.
   */
  const chip_preset_toggle = createChipPresetToggle({
    transport: (/** @type {any} */ type, /** @type {any} */ payload) =>
      transport ? transport(type, payload) : Promise.resolve(null),
    store: {
      get: () => (execPresetStore ? execPresetStore.get() : null),
      set: (/** @type {any} */ next) => execPresetStore?.set(next)
    },
    onChange: () => doRender(),
    toast: (/** @type {string} */ message, /** @type {any} */ kind) =>
      showToast(message, kind, 2600)
  });

  /**
   * The preset context of every chip this tab draws (§5.1). 스냅샷이 없으면
   * `null`이라 칩은 지금까지의 사유 팝업 그대로다 (fail-quiet).
   *
   * @param {LaneModel} m
   * @returns {import('../../model/chip-preset-binding.js').ChipPresetContext|null}
   */
  function chipPresetContext(m) {
    const state = execPresetStore ? execPresetStore.get() : null;
    if (!state || typeof state.revision !== 'number') {
      return null;
    }
    const group = groupOf(m);
    const catalog = /** @type {any} */ (group)?.runner_catalog || null;
    return {
      bindings: state.chip_bindings,
      presets: Array.isArray(state.presets) ? state.presets : [],
      revision: state.revision,
      catalogOf: () => catalog,
      isBusy: (bead_id, chip) => chip_preset_toggle.isBusy(bead_id, chip)
    };
  }

  function doRender() {
    if (mount_element.hidden) {
      // 숨긴 탭은 목록 재조합도 DOM 렌더도 표시용 grace tick도 하지 않는다
      // (UI-hhn9 §6). 구독의 데이터 처리는 호출 쪽에서 이미 끝났고, 재진입
      // load()가 최신 상태를 그린다.
      return;
    }
    const m = laneModel();
    // 칩 맥락은 템플릿을 부르기 직전에 세운다 (§5.1): 두 탭이 같은 템플릿
    // 모듈을 쓰므로 그리는 쪽이 자기 맥락을 소유한다.
    setChipPresetContext(chipPresetContext(m));
    syncGraceTimer(m);
    refreshOverlapFacts(m);
    render(topTemplate(m), top_el);
    render(lanesTemplate(m), lanes_el);
    syncExternalChecks();
    showProviderResumeDialog(lanes_el);
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
   * @param {import('../../model/sort.js').SortStep[]} chain
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
    const event_target = /** @type {HTMLElement} */ (ev.target);
    if (provider_resume_draft) {
      const next = providerResumeDraftChange(
        provider_resume_draft,
        event_target,
        currentQueue(),
        disabledModelsOf(modelVisibilityStore)
      );
      if (next) {
        // 같은 참조는 "우리 이벤트지만 바뀐 것이 없다"는 뜻이다: 다시 그리면
        // 낡은 옵션을 고른 select 표시가 draft 값으로 되돌아간다.
        if (next !== provider_resume_draft) {
          provider_resume_draft = next;
          doRender();
        }
        return;
      }
    }
    const lane_count_select = /** @type {HTMLSelectElement|null} */ (
      event_target?.closest?.('.worker-serial-lane-count')
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
    // 라벨 체크박스와 타입 select는 `.worker-sort` 분기보다 먼저다 (UI-p7s2 §6):
    // 타입 select가 후보 정렬과 같은 형태 토큰을 쓰므로 뒤에 두면 타입 변경이
    // 정렬 변경으로 잘못 읽힌다.
    const label_check = /** @type {HTMLInputElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.(
        '.worker-filter__label-check'
      )
    );
    if (label_check) {
      const value = label_check.dataset.label || '';
      if (value) {
        setCandidateFilter({
          ...candidate_filter,
          labels: toggleLabelFilter(labelFilter(), value)
        });
      }
      return;
    }
    const type_select = /** @type {HTMLSelectElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-filter__type')
    );
    if (type_select) {
      setCandidateFilter({
        ...candidate_filter,
        type: normalizeTypeFilter(type_select.value)
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
   * @returns {import('../../screens/transcript/transcript-drawer.js').DrawerMeta}
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
    if (target.closest('a.interactive-session-discord')) {
      return;
    }
    const interactive_badge = target.closest(
      'button.interactive-session-badge'
    );
    if (interactive_badge) {
      const provider = interactive_badge.getAttribute('data-session-provider');
      const session_id = interactive_badge.getAttribute('data-session-id');
      const bead_id = interactive_badge.getAttribute('data-bead-id');
      if (
        (provider === 'claude' || provider === 'codex') &&
        session_id &&
        bead_id
      ) {
        repo_ops_drawer.close();
        repo_ops_drawer_el.hidden = true;
        drawer_overlay_el.hidden = false;
        drawer.open(
          sessionRefDrawerInput(
            {
              provider,
              session_id,
              current: true,
              locality: 'local',
              index: 0,
              host: '',
              last_event_at: null,
              resume_command: null
            },
            bead_id,
            'in_progress'
          )
        );
        doRender();
      }
      return;
    }
    // `+ 새 이슈` (UI-p7s2 §4): 툴바 조작이므로 어떤 행 처리보다 먼저다.
    if (target?.closest?.('.worker-new-issue')) {
      onNewIssue?.();
      return;
    }
    // 보류 선반의 열고 닫기 (§3.2). `<details>`의 기본 동작이 실제로 열고, 여기서는
    // 그 결과를 저장해 다음 렌더가 같은 상태로 선다.
    if (target?.closest?.('.worker-deferred__summary')) {
      deferred_open = !deferred_open;
      saveDeferredOpen(deferred_open);
      return;
    }
    const external_open = target.closest('[data-external-open]');
    if (external_open) {
      openBlocker(
        external_open.getAttribute('data-external-open') || '',
        external_open.getAttribute('data-root-dir') || ''
      );
      return;
    }
    const external_check = /** @type {HTMLButtonElement|null} */ (
      target.closest('[data-external-wait-op]')
    );
    if (external_check) {
      ev.preventDefault();
      void applyExternalWaitAction(external_check);
      return;
    }
    if (target?.closest?.('.provider-resume-dialog__cancel')) {
      closeProviderResumeDialog();
      return;
    }
    if (target?.closest?.('.provider-resume-dialog__confirm')) {
      confirmProviderResumeDialog();
      return;
    }
    if (target?.closest?.('.provider-resume-dialog')) {
      return;
    }
    if (target?.closest?.('.worker-mini__grip')) {
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
    // 열리는 칩 네 종 (`⛓`·`→`·`🔓`·`⧉`, UI-8x90 §4.3): 클릭 의미가 하나이므로
    // 클릭 표면도 하나다. 카드 클릭(자기 이슈 열기)보다 먼저 잡고 거기서 멈춘다 —
    // 출처 칩(`.ctl-chip--from`)이 같은 자리에서 하는 것과 같다.
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
    const source_chip = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-created-source')
    );
    if (source_chip) {
      openBlocker(
        source_chip.getAttribute('data-source-id') || '',
        source_chip.getAttribute('data-root-dir') || ''
      );
      return;
    }
    // 바인딩된 판정 칩은 팝업 칩보다 **먼저** 잡는다 (UI-wg68 §5.3): 두 선택자가
    // 같은 버튼에 걸리므로 순서가 곧 클릭 의미다. 멈추는 규칙은 UI-8x90과 같다.
    const bound_chip = /** @type {HTMLElement|null} */ (
      target?.closest?.('.judgement-chip--bound')
    );
    if (bound_chip) {
      const bound_bead_id = bound_chip.getAttribute('data-bead-id') || '';
      const bound_key = bound_chip.getAttribute('data-chip-key') || '';
      if (
        bound_bead_id &&
        bound_key &&
        bound_chip.getAttribute('aria-busy') !== 'true'
      ) {
        void chip_preset_toggle.toggle(
          bound_bead_id,
          bound_key,
          bound_chip.getAttribute('data-root-dir') || ''
        );
      }
      return;
    }
    // 판정 칩 (UI-8x90 §4.5): 카드 클릭(상세 열기)보다 먼저 잡고 거기서 멈춘다 —
    // 팝업이 열리자마자 이슈 상세가 그 위를 덮으면 사유를 읽을 수 없다.
    const judgement_chip = /** @type {HTMLElement|null} */ (
      target?.closest?.('.judgement-chip')
    );
    if (judgement_chip) {
      const chip_card = /** @type {HTMLElement|null} */ (
        judgement_chip.closest('[data-bead-id]')
      );
      const chip_bead_id = chip_card
        ? chip_card.getAttribute('data-bead-id') || ''
        : '';
      const chip_key = judgement_chip.getAttribute('data-chip-key') || '';
      if (chip_bead_id && chip_key) {
        chip_popover.toggle({ bead_id: chip_bead_id, chip_key });
      }
      return;
    }
    // `↻ 지금 프로브`는 게이트 칩 팝업 안의 출구다 (UI-pw2g §3.4) — 아래 팝업
    // 조기 반환보다 먼저 잡지 않으면 팝업 안의 클릭으로 삼켜져 아무 일도 하지
    // 않는다. 재료는 버튼이 실은 `data-runner`/`data-since`이고 큐 정지의
    // `since`와 섞이지 않는다 (UI-o5ll §3.4).
    const probe = /** @type {HTMLElement|null} */ (
      target?.closest?.('[data-action="provider-probe-now"]')
    );
    if (probe) {
      void probeProviderNow(
        probe.dataset.runner || '',
        Number(probe.dataset.since)
      );
      return;
    }
    // 팝업 내부의 나머지 클릭은 카드 클릭(상세 열기)으로 흐르지 않는다.
    if (target?.closest?.('.chip-popover')) {
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
    // 타임라인의 정리 재시도는 PR 대기 카드의 [정리 재시도]와 같은 mutation이다 —
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
    // 타임라인의 [세션에서 해결]도 PR 대기 카드의 것과 같은 mutation이다
    // (UI-jw27 §4): 같은 실패 행의 두 번째 출구이므로 두 표면이 같은 클릭을
    // 같은 액션으로 보낸다.
    const cleanupResolve = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-cleanup__resolve')
    );
    if (cleanupResolve) {
      const bead_id = cleanupResolve.dataset.beadId;
      if (bead_id) {
        void resolveInSession(bead_id);
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
        if (placeMenuLanes(currentQueue())) {
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
    // route 칩이 준비도 칩보다 먼저다: 두 묶음이 같은 형태 토큰
    // (`.worker-filter__chip`)을 쓰므로, 뒤에 두면 route 클릭이 준비도 분기에서
    // 값 없이 삼켜진다.
    const route_chip = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-filter__route')
    );
    if (route_chip) {
      const value = route_chip.dataset.route || '';
      if (value) {
        setCandidateFilter({
          ...candidate_filter,
          routes: toggleRouteFilter(candidate_filter.routes, value)
        });
      }
      return;
    }
    // 우선순위 칩도 route 칩과 같은 이유로 준비도보다 먼저다 (UI-p7s2 §6).
    const priority_chip = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-filter__priority')
    );
    if (priority_chip) {
      const parsed = Number.parseInt(priority_chip.dataset.priority || '', 10);
      if (Number.isFinite(parsed)) {
        setCandidateFilter({
          ...candidate_filter,
          priorities: togglePriorityFilter(priorityFilter(), parsed)
        });
      }
      return;
    }
    const labels_btn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-filter__labels-btn')
    );
    if (labels_btn) {
      label_filter_open = !label_filter_open;
      doRender();
      return;
    }
    const readiness_chip = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-filter__chip')
    );
    if (readiness_chip) {
      const value = readiness_chip.dataset.readiness;
      if (value === 'all' || value === 'ready' || value === 'not_ready') {
        setCandidateFilter({ ...candidate_filter, readiness: value });
      }
      return;
    }
    // `[지금 시작]`도 행 기본 동작보다 먼저다 — 누른 것은 행이 아니라 그 행의
    // 유예를 걷는 버튼이다 (UI-q1tg §3.3).
    const startNowBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('[data-action="queue-start-now"]')
    );
    if (startNowBtn) {
      void startNow(startNowBtn.dataset.beadId || '');
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
    const resolveBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__resolve')
    );
    if (resolveBtn) {
      void resolveInSession(resolveBtn.dataset.beadId || '');
      return;
    }
    // 실행 중 타일의 같은 출구 (UI-jw27 §4). 타일은 bead id를 행이 아니라 바깥
    // `.rtile`의 `data-bead-id`에 싣는다.
    const tileResolveBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.rtile__resolve')
    );
    if (tileResolveBtn) {
      const tile = /** @type {HTMLElement|null} */ (
        tileResolveBtn.closest('.rtile')
      );
      void resolveInSession(tile?.dataset.beadId || '');
      return;
    }
    // [워커로 이어가기] (UI-nuwy §3.6): the row carries its bead on the button,
    // the tile on the outer `.rtile`; both carry the stopped attempt.
    const handoffBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__handoff, .rtile__handoff')
    );
    if (handoffBtn) {
      const tile = /** @type {HTMLElement|null} */ (
        handoffBtn.closest('.rtile')
      );
      void handoffToWorker(
        handoffBtn.dataset.beadId || tile?.dataset.beadId || '',
        handoffBtn.dataset.attemptId || ''
      );
      return;
    }
    const discardBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__discard')
    );
    const discardAbandonBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__discard-abandon')
    );
    if (discardAbandonBtn) {
      void abandonDiscard(
        discardAbandonBtn.dataset.beadId || '',
        discardAbandonBtn.dataset.operationId || '',
        {
          kind: discardAbandonBtn.dataset.operationKind || '',
          last_error: discardAbandonBtn.dataset.lastError || ''
        }
      );
      return;
    }
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
    // Tile controls act on the attempt and must never also open the drawer.
    const tile_discard_abandon = /** @type {HTMLElement|null} */ (
      target?.closest?.('.rtile__discard-abandon')
    );
    if (tile_discard_abandon) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const bead_id = tile?.dataset?.beadId;
      if (bead_id) {
        void abandonDiscard(
          bead_id,
          tile_discard_abandon.dataset.operationId || '',
          {
            kind: tile_discard_abandon.dataset.operationKind || '',
            last_error: tile_discard_abandon.dataset.lastError || ''
          }
        );
      }
      return;
    }
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
    if (target?.closest?.('.rtile__resume-alternate')) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const att = tile?.dataset?.attemptId;
      if (att) {
        openProviderResumeDialog(att);
      }
      return;
    }
    if (target?.closest?.('.rtile__resume')) {
      const resume_button = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile__resume')
      );
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const att = tile?.dataset?.attemptId;
      if (att) {
        void resumeAttempt(
          att,
          resume_button?.dataset?.resumeKind === 'settlement'
            ? 'settlement'
            : 'session'
        );
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
      target?.closest?.('.rtile .worker-card__roll-toggle')
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
      target?.closest?.('.rtile .worker-card__roll-child')
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

  /**
   * Every keystroke in the search input (UI-6g3t §7). 값은 뷰 메모리에만 남고
   * 저장되지 않으며, 다시 그려도 lit이 같은 `<input>` 노드를 유지하므로
   * 포커스·캐럿이 그대로다.
   *
   * @param {Event} ev
   */
  function onSearchInput(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    if (!target?.closest?.('.worker-search')) {
      return;
    }
    search_query = /** @type {HTMLInputElement} */ (target).value;
    doRender();
  }

  /**
   * Esc는 검색어를 비운다 (§7) — 흐려진 화면에서 빠져나오는 한 번의 키다.
   * 이미 비어 있으면 아무 일도 하지 않으므로 다른 Esc 소비자를 가리지 않는다.
   *
   * @param {KeyboardEvent} ev
   */
  function onSearchKeyDown(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    if (
      ev.key !== 'Escape' ||
      !target?.closest?.('.worker-search') ||
      search_query.length === 0
    ) {
      return;
    }
    search_query = '';
    doRender();
  }

  lane_drag.attach(mount_element);
  mount_element.addEventListener('click', /** @type {any} */ (onClick));
  mount_element.addEventListener('change', /** @type {any} */ (onChange));
  mount_element.addEventListener('input', /** @type {any} */ (onSearchInput));
  mount_element.addEventListener(
    'keydown',
    /** @type {any} */ (onSearchKeyDown)
  );

  /**
   * An outside click closes the 실패 상세 팝오버. 그것을 여는 요소는 예외다 —
   * 여는 클릭이 그대로 닫는 클릭이 되면 아무것도 열리지 않는다. 판정 칩 팝업의
   * 같은 규칙은 `chip_popover`가 소유한다 (UI-8x90 §5).
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
    if (
      open_failure_detail &&
      !closest('.rtile__failure-pop, .rtile__failure-badge')
    ) {
      open_failure_detail = null;
      changed = true;
    }
    // 라벨 팝오버도 자기 상자 밖의 클릭 하나로 닫힌다 (UI-p7s2 §6) — 문서 어디를
    // 눌러도 닫히고, 그 클릭 자체는 원래 갈 곳으로 계속 흐른다.
    if (label_filter_open && !closest('.worker-filter__labels')) {
      label_filter_open = false;
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
    if (ev.key !== 'Escape') {
      return;
    }
    if (open_failure_detail === null && provider_resume_draft === null) {
      return;
    }
    open_failure_detail = null;
    provider_resume_draft = null;
    doRender();
  }

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', /** @type {any} */ (onDocumentKeyDown));
  chip_popover.attach();
  unsubscribers.push(() => {
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener(
      'keydown',
      /** @type {any} */ (onDocumentKeyDown)
    );
    chip_popover.detach();
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
  // 프리셋 스냅샷은 서버 전역이라 이슈·큐와 다른 채널로 도착한다 (UI-wg68 §3.1):
  // 구독하지 않으면 첫 스냅샷도, 다른 창에서 바꾼 바인딩도 다음 이슈·큐 갱신까지
  // 화면에 서지 않아 칩 모양과 클릭 의미가 낡은 채 남는다.
  if (execPresetStore && typeof execPresetStore.subscribe === 'function') {
    unsubscribers.push(execPresetStore.subscribe(() => doRender()));
  }
  if (
    modelVisibilityStore &&
    typeof modelVisibilityStore.subscribe === 'function'
  ) {
    unsubscribers.push(modelVisibilityStore.subscribe(() => doRender()));
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
    /**
     * Pause the display timers when the route leaves this tab (UI-hhn9 §6).
     * 구독·필터·drawer 상태는 그대로 두고 표시용 타이머만 끈다. 재진입 load()가
     * 다시 그리며 타이머는 그때 한 번만 붙는다.
     */
    pause() {
      stopGraceTimer();
    },
    refreshSessionDefaults,
    destroy() {
      stopGraceTimer();
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
      mount_element.removeEventListener(
        'input',
        /** @type {any} */ (onSearchInput)
      );
      mount_element.removeEventListener(
        'keydown',
        /** @type {any} */ (onSearchKeyDown)
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
