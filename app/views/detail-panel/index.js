import { html, render } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { formatAttemptTuple } from '../../utils/attempt-display.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import { formatTimestampLocal } from '../../utils/relative-time.js';
import { runResumeFlow } from '../../utils/resume-flow.js';
import { sessionRefDrawerInput } from '../../utils/session-ref.js';
import { showToast } from '../../utils/toast.js';
import {
  providerUsageBadges,
  sumAttemptUsage
} from '../../utils/token-usage.js';
import { formatExecReceipt } from '../board/card.js';
import { createChipPopover } from '../chip-popover.js';
import {
  depCandidates as depCandidatesOf,
  filterDepCandidates
} from '../monitor/dep-candidates.js';
import { placeMenuList } from '../worker/lanes.js';
import {
  candidatePlacement,
  placeLaneLabel,
  placeMenuLanes,
  placementTitle
} from '../worker/placement.js';
import { createTranscriptDrawer } from '../worker/transcript-drawer.js';
import { artifactsTemplate } from './artifacts.js';
import { commentsTemplate } from './comments.js';
import {
  effectiveSettingsCardTemplate,
  summaryHeaderTemplate
} from './effective-settings-view.js';
import {
  buildImplPresetApplyPayload,
  buildThreeStatePayload
} from './effective-settings.js';
import { execAccountsTemplate } from './exec-accounts.js';
import {
  EXEC_KEYS,
  modelRunnerOf,
  normalizeImplTarget
} from './exec-settings.js';
import { createMdViewer } from './md-viewer.js';
import { sessionHistoryTemplate } from './session-history.js';
import { taskPromptTemplate } from './task-prompt.js';
import {
  WORKER_TIMELINE_PAGE,
  workerTimelineTemplate
} from './worker-timeline.js';

/**
 * @import { SessionRefView } from '../../../server/worker/session-ref.js'
 * @import { DepCandidate, DepCandidateModel } from '../monitor/dep-candidates.js'
 */

/**
 * Allowed status values (mirrors UPDATE_STATUS_ALLOWED in
 * server/ws/mutation-handlers.js).
 */
const STATUS_OPTIONS = [
  'open',
  'in_progress',
  'deferred',
  'resolved',
  'closed'
];

/** Allowed priority values (handleUpdatePriority accepts a number 0..4). */
const PRIORITY_OPTIONS = [0, 1, 2, 3, 4];

/**
 * Shared detail panel (spec §3). Opens as a right-side overlay from a board
 * card (and later a Worker tile). Composition: id/title/status/description,
 * dependencies (bd edges), workflow summary WITH raw receipt strings,
 * Artifacts (copy path / open md viewer), execution settings (12 keys +
 * workflow_mode), and a session-history seam (Phase 11). Reads the pushed
 * snapshot from the `detail:<id>` subscription store — no new list calls; the
 * exec-settings edit is the only mutation (via `transport`).
 */

/**
 * @typedef {Object} DetailPanelOptions
 * @property {{ snapshotFor?: (client_id: string) => any[], subscribe?: (fn: () => void) => () => void }} [issueStores]
 * @property {(type: string, payload: unknown) => Promise<unknown>} [transport]
 * @property {{ get: () => any, set?: (queue: any) => void, subscribe?: (fn: () => void) => () => void }} [queueStore] - Client worker-queue store (source of a bead's attempts).
 * @property {{ get: () => any, set: (state: any) => void, subscribe?: (fn: () => void) => () => void }} [execPresetStore]
 * @property {{ get: (id: string) => { lines: unknown[] } | null, subscribe: (fn: () => void) => () => void }} [sessionLogStore]
 * @property {() => string | null | undefined} [getWorkspacePath]
 * @property {{ open: (doc_path: string, open_options?: any) => Promise<void>|void, close: () => void, destroy: () => void }} [mdViewer] - Shared
 * md viewer owned by the app shell. When given, the panel neither mounts nor
 * destroys one of its own (spec §4).
 * @property {(id: string, root_dir?: string) => void} [onNavigate] - Navigate to
 * a dependency id. `root_dir` names the repo that owns it when the candidate
 * model knows one; the shell switches workspace first (UI-lx45 §4.1).
 * @property {() => DepCandidateModel | null} [depCandidates] - The 막는 이슈
 * 후보 모집단 for this tab (UI-lx45 §3.2). `null` means the aggregated channel
 * has no snapshot yet, which the section says out loud rather than guessing.
 * @property {(change: { type: string, a: string, b: string }) => void} [onDepChanged] - Called
 * exactly once per SAVED edge, including a failed readback (UI-lx45 §3.3).
 * @property {(fn: () => void) => () => void} [subscribeCandidates] - Subscribe to
 * the candidate snapshot; the panel re-renders on every callback.
 * @property {() => void} [onOpenExecPresets] - Close detail and open the
 * global execution-settings dialog.
 * @property {() => void} onClose - Invoked to request the overlay be closed.
 */

/**
 * @param {HTMLElement} mount_element
 * @param {DetailPanelOptions} options
 * @returns {{ load: (id: string) => void, clear: () => void, destroy: () => void }}
 */
export function createDetailPanel(mount_element, options) {
  const issueStores = options.issueStores;
  const onClose = options.onClose;
  const transport = options.transport;
  const onNavigate = options.onNavigate;
  const queueStore = options.queueStore;
  const execPresetStore = options.execPresetStore;
  const sessionLogStore = options.sessionLogStore;

  /** @type {string | null} */
  let current_id = null;
  /** @type {any} */
  let current = null;
  /** @type {Record<string, string>} */
  let exec_local = {};
  let selected_preset_id = '';
  let applying_preset = false;
  /** @type {string[]} */
  let skipped_orchestration_keys = [];
  let effective_expanded = false;
  /**
   * 레인 선택 메뉴가 열려 있는가 (UI-6g3t §6.2). 상세 패널은 한 번에 bead 하나만
   * 보여 주므로 Worker 탭의 `place_menu_bead_id`와 달리 불린 하나면 된다.
   */
  let place_menu_open = false;
  /**
   * The workspace `bd kv` session defaults — the `전역` layer of the card. Read
   * once per opened issue; an unreadable layer stays empty and every key falls
   * through to `기본` rather than showing a guess (spec §E/§F).
   *
   * @type {Record<string, string>}
   */
  let session_defaults = {};
  /** @type {{ claude: { accounts: any[], active: any }|null, codex: { accounts: any[], active: any }|null }} */
  let exec_account_catalog = { claude: null, codex: null };
  /**
   * The repo's `bd kv` account default layer, read beside the catalog on the
   * same request seq. Only its `usable` values change a label; a failed read
   * stays null and the panel keeps its current-login wording (UI-d3cb §6.2).
   *
   * @type {import('./exec-accounts.js').WorkspaceAccountsLayer|null}
   */
  let workspace_accounts = null;
  /** @type {string|null} */
  let exec_account_catalog_loaded_for = null;
  let exec_account_catalog_request_seq = 0;

  // Inline edit state. These live in the closure (not derived from `current`),
  // so an incoming subscription push re-render never wipes an open editor or the
  // in-flight draft value. An editor is closed only on explicit save/cancel.
  let editing_title = false;
  let editing_desc = false;
  let title_draft = '';
  let desc_draft = '';
  let label_draft = '';
  // 의존성 절의 인라인 편집 상태 (UI-lx45 §4.2). 목록은 포커스가 들어왔거나
  // 검색어가 남아 있을 때만 펴진다.
  let dep_query = '';
  let dep_list_open = false;

  function resetEditors() {
    editing_title = false;
    editing_desc = false;
    title_draft = '';
    desc_draft = '';
    label_draft = '';
    dep_query = '';
    dep_list_open = false;
  }

  function resetExecAccountCatalog() {
    exec_account_catalog = { claude: null, codex: null };
    workspace_accounts = null;
    exec_account_catalog_loaded_for = null;
    exec_account_catalog_request_seq += 1;
  }

  /**
   * @returns {Promise<import('./exec-accounts.js').WorkspaceAccountsLayer|null>}
   */
  async function fetchWorkspaceAccounts() {
    if (!transport) {
      return null;
    }
    try {
      const res = /** @type {any} */ (
        await Promise.resolve(transport('get-workspace-accounts', {}))
      );
      return res && typeof res.state === 'string' ? res : null;
    } catch {
      return null;
    }
  }

  /**
   * @param {string} endpoint
   * @returns {Promise<{ accounts: any[], active: any }|null>}
   */
  async function fetchExecAccountProvider(endpoint) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        return null;
      }
      const payload = await response.json();
      if (
        !payload ||
        typeof payload !== 'object' ||
        !Array.isArray(payload.accounts)
      ) {
        return null;
      }
      const accounts = payload.accounts.filter(
        (/** @type {unknown} */ row) =>
          row !== null && typeof row === 'object' && !Array.isArray(row)
      );
      return {
        accounts,
        active:
          accounts.find(
            (/** @type {any} */ account) => account.active === true
          ) || null
      };
    } catch {
      return null;
    }
  }

  /**
   * @param {string} id
   */
  async function loadExecAccountCatalog(id) {
    exec_account_catalog_loaded_for = id;
    const seq = ++exec_account_catalog_request_seq;
    const [claude, codex, defaults] = await Promise.all([
      fetchExecAccountProvider('/api/claude-usage'),
      fetchExecAccountProvider('/api/codex-usage'),
      fetchWorkspaceAccounts()
    ]);
    if (seq !== exec_account_catalog_request_seq || id !== current_id) {
      return;
    }
    exec_account_catalog = { claude, codex };
    workspace_accounts = defaults;
    doRender();
  }

  // Comments state (UI-ucq6 §변경 3). Comments do not ride the issue snapshot,
  // so they are fetched once per issue and refetched only when the snapshot's
  // `comment_count` moves — that field is what carries an external (worker)
  // write into the client, via the server's periodic list refresh.
  /** @type {import('./comments.js').IssueComment[]} */
  let comments = [];
  /** @type {string|null} */
  let comments_loaded_for = null;
  /** @type {number|null} */
  let last_comment_count = null;
  let comments_error = false;
  let comment_draft = '';
  let comment_sending = false;
  // Guards a late reply from an issue the reader has already left.
  let comments_request_seq = 0;
  /** @type {Set<string>} */
  const comments_expanded = new Set();

  function resetComments() {
    comments = [];
    comments_loaded_for = null;
    last_comment_count = null;
    comments_error = false;
    comment_draft = '';
    comment_sending = false;
    comments_request_seq += 1;
    comments_expanded.clear();
  }

  /**
   * Fetch the comment list for one issue.
   *
   * The failure branch needs a transport that propagates its rejection; the
   * production one in `main.js` swallows every error into `[]`, where an empty
   * list is also a legitimate success value. There it degrades to the
   * "댓글 없음" empty state rather than the failure line — fail-quiet either way,
   * and the rest of the panel is untouched.
   *
   * @param {string} id
   */
  async function fetchComments(id) {
    if (!transport) {
      return;
    }
    const seq = ++comments_request_seq;
    try {
      const res = await Promise.resolve(transport('get-comments', { id }));
      if (seq !== comments_request_seq || id !== current_id) {
        return;
      }
      comments = Array.isArray(res) ? res : [];
      comments_error = false;
    } catch {
      if (seq !== comments_request_seq || id !== current_id) {
        return;
      }
      comments_error = true;
    }
    doRender();
  }

  /**
   * Fetch on first open, then only when `comment_count` actually moves. A
   * snapshot without the field stops the auto-refetch and keeps the first fetch
   * (fail-quiet) — an older server should lose freshness, not the section.
   */
  function syncComments() {
    if (!transport || !current_id) {
      return;
    }
    const count =
      current && typeof current.comment_count === 'number'
        ? current.comment_count
        : null;
    if (comments_loaded_for !== current_id) {
      comments_loaded_for = current_id;
      last_comment_count = count;
      void fetchComments(current_id);
      return;
    }
    if (count !== null && count !== last_comment_count) {
      last_comment_count = count;
      void fetchComments(current_id);
    }
  }

  /**
   * @param {string} comment_id
   */
  function toggleReport(comment_id) {
    if (comments_expanded.has(comment_id)) {
      comments_expanded.delete(comment_id);
    } else {
      comments_expanded.add(comment_id);
    }
    doRender();
  }

  /**
   * Re-render only at the empty↔non-empty boundary, which is the only thing the
   * draft drives in the template (the submit button). Rendering on every
   * keystroke would rewrite the textarea's `.value` and move the caret.
   *
   * @param {string} value
   */
  function onCommentDraftInput(value) {
    const was_blank = comment_draft.trim().length === 0;
    comment_draft = value;
    if (was_blank !== (value.trim().length === 0)) {
      doRender();
    }
  }

  /**
   * `handleAddComment` answers with the refreshed comment array and is the one
   * mutation handler that triggers no list refresh, so the reply payload — not
   * a refetch and not the `comment_count` path — is what updates the list.
   */
  async function submitComment() {
    const text = comment_draft.trim();
    if (!transport || !current_id || text.length === 0 || comment_sending) {
      return;
    }
    const id = current_id;
    comment_sending = true;
    doRender();
    let ok = false;
    try {
      const res = await Promise.resolve(transport('add-comment', { id, text }));
      // A successful add always yields at least the comment just written, so an
      // empty array is the transport's swallowed error rather than a result.
      if (Array.isArray(res) && res.length > 0) {
        ok = true;
        if (id === current_id) {
          comments = res;
          comments_error = false;
          comment_draft = '';
          last_comment_count = res.length;
        }
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      showToast('댓글 추가 실패', 'error');
    }
    if (id === current_id) {
      comment_sending = false;
    }
    doRender();
  }

  const comment_handlers = {
    onToggle: toggleReport,
    onDraftInput: onCommentDraftInput,
    onSubmit: submitComment
  };

  // md viewer lives in its own body-appended overlay mount, unless the shell
  // already owns a shared one — the stepper cells outside this panel open the
  // same instance (spec §4).
  const injected_md_viewer = options.mdViewer || null;
  /** @type {HTMLElement | null} */
  let mv_mount = null;
  if (!injected_md_viewer) {
    mv_mount = document.createElement('div');
    mv_mount.className = 'md-viewer-root';
    document.body.appendChild(mv_mount);
  }
  const md_viewer =
    injected_md_viewer ||
    createMdViewer(/** @type {HTMLElement} */ (mv_mount), {
      getWorkspacePath: options.getWorkspacePath || (() => '')
    });

  // Transcript drawer for a session-history row (Done/Failed → persisted log,
  // live attempt → live-follow). Opens as its own body-appended overlay so it
  // sits above the detail overlay (spec §5.6).
  const sl_mount = document.createElement('div');
  sl_mount.className = 'session-log-root';
  document.body.appendChild(sl_mount);
  const transcript_drawer = createTranscriptDrawer(sl_mount, {
    transport: transport
      ? (type, payload) => Promise.resolve(transport(type, payload))
      : undefined,
    sessionLogStore
  });

  // Task-prompt section state (UI-rxp3 §5). Collapsed by default, fetched on
  // first expand and cached per bead — a second open of the same issue does not
  // re-request, and switching issues drops it.
  let prompt_expanded = false;
  let prompt_loading = false;
  let prompt_error = false;
  /** @type {any} */
  let prompt_data = null;
  /** @type {string|null} */
  let prompt_loaded_for = null;
  // Guards a late reply from an issue the reader has already left.
  let prompt_request_seq = 0;

  /**
   * The cache key: the WORKSPACE plus the bead. A workspace switch leaves the
   * overlay open with the same `selected_id`, so a bead-only key would serve
   * the previous workspace's send for a same-id bead in the new one — and the
   * reply is resolved server-side against the connection's workspace, so the
   * two really are different records.
   *
   * @param {string} id
   * @returns {string}
   */
  function promptCacheKey(id) {
    const workspace =
      (options.getWorkspacePath && options.getWorkspacePath()) || '';
    return `${workspace}::${id}`;
  }

  function resetTaskPrompt() {
    prompt_expanded = false;
    prompt_loading = false;
    prompt_error = false;
    prompt_data = null;
    prompt_loaded_for = null;
    prompt_request_seq += 1;
  }

  /**
   * Fetch the bead's recorded send. The reply is either a record or the missing
   * shape carrying the default task prompt — both are rendered, neither is an
   * error.
   *
   * @param {string} id
   */
  async function fetchTaskPrompt(id) {
    if (!transport) {
      return;
    }
    const seq = ++prompt_request_seq;
    prompt_loading = true;
    prompt_error = false;
    doRender();
    try {
      const res = await Promise.resolve(
        transport('get-bead-prompt', { bead_id: id })
      );
      if (seq !== prompt_request_seq) {
        return;
      }
      // The production transport swallows failures into `[]`; an array is never
      // a valid reply here, so it stays a failure.
      if (!res || typeof res !== 'object' || Array.isArray(res)) {
        prompt_error = true;
      } else {
        prompt_data = res;
        prompt_loaded_for = promptCacheKey(id);
      }
    } catch {
      if (seq === prompt_request_seq) {
        prompt_error = true;
      }
    } finally {
      if (seq === prompt_request_seq) {
        prompt_loading = false;
        doRender();
      }
    }
  }

  // 세션 이력의 `session_ref` 행 (UI-4xzk §6.5). 키가 없는 이슈는 요청 자체가
  // 없고, 실패·빈 응답은 행 없음이다.
  /** @type {SessionRefView[]} */
  let session_refs = [];
  /** @type {string|null} */
  let session_refs_loaded_for = null;
  // Guards a late reply from an issue (or workspace) the reader has already left.
  let session_refs_request_seq = 0;

  /**
   * The cache key: workspace, bead, and the RAW contract value. The workspace
   * is in it for the same reason the prompt cache carries it — the same bead id
   * in another repo is another bead — and the raw value is, because a session
   * that just claimed the issue appends to it and the rows must follow.
   *
   * @param {string} id
   * @param {string} raw
   * @returns {string}
   */
  function sessionRefsCacheKey(id, raw) {
    const workspace =
      (options.getWorkspacePath && options.getWorkspacePath()) || '';
    return `${workspace}::${id}::${raw}`;
  }

  function resetSessionRefs() {
    session_refs = [];
    session_refs_loaded_for = null;
    session_refs_request_seq += 1;
  }

  /**
   * @param {string} id
   * @param {string} key
   */
  async function fetchSessionRefs(id, key) {
    if (!transport) {
      return;
    }
    const seq = ++session_refs_request_seq;
    /** @type {any} */
    let res;
    try {
      res = await Promise.resolve(
        transport('get-session-refs', { bead_id: id })
      );
    } catch {
      res = null;
    }
    if (seq !== session_refs_request_seq || key !== session_refs_loaded_for) {
      return;
    }
    session_refs = res && Array.isArray(res.sessions) ? res.sessions : [];
    doRender();
  }

  /**
   * Request the bead's sessions once per (workspace, bead, contract value). A
   * bead without the key never reaches the server at all.
   */
  function syncSessionRefs() {
    if (!transport || !current_id) {
      return;
    }
    const metadata = current && current.metadata;
    const raw =
      metadata &&
      typeof metadata === 'object' &&
      typeof metadata.session_ref === 'string'
        ? metadata.session_ref
        : null;
    if (raw === null) {
      resetSessionRefs();
      return;
    }
    const key = sessionRefsCacheKey(current_id, raw);
    if (session_refs_loaded_for === key) {
      return;
    }
    // The previous key's rows describe another bead, workspace or session list;
    // they go before the new reply lands, not after.
    session_refs = [];
    session_refs_loaded_for = key;
    void fetchSessionRefs(current_id, key);
  }

  // Worker 이력 섹션 (record-timeline-retention §9). 세션 로그와 달리 이 이력은
  // `queue.json`이 아니라 bead의 영구 타임라인에 있으므로 여기서 물어야 한다.
  /** @type {import('./worker-timeline.js').WorkerTimelineEvent[]} */
  let worker_timeline = [];
  /**
   * The §7 attempt union of this bead. `queue.json`에서 이관된 레코드는
   * 클라이언트 queue store에 없으므로, 세션 이력과 총 사용량은 큐 ∪ 이 목록으로
   * 판정한다.
   *
   * @type {any[]}
   */
  let worker_attempts = [];
  let worker_timeline_shown = WORKER_TIMELINE_PAGE;
  /** @type {string|null} */
  let worker_timeline_loaded_for = null;
  // Guards a late reply from an issue (or workspace) the reader has already left.
  let worker_timeline_request_seq = 0;

  /**
   * Workspace + bead, for the same reason the prompt cache carries both: the
   * same bead id in another repo is another bead with another history.
   *
   * @param {string} id
   * @returns {string}
   */
  function workerTimelineCacheKey(id) {
    const workspace =
      (options.getWorkspacePath && options.getWorkspacePath()) || '';
    return `${workspace}::${id}`;
  }

  function resetWorkerTimeline() {
    worker_timeline = [];
    worker_attempts = [];
    worker_timeline_shown = WORKER_TIMELINE_PAGE;
    worker_timeline_loaded_for = null;
    worker_timeline_request_seq += 1;
  }

  /**
   * @param {string} id
   * @param {string} key
   */
  async function fetchWorkerTimeline(id, key) {
    if (!transport) {
      return;
    }
    const seq = ++worker_timeline_request_seq;
    /** @type {any} */
    let res;
    try {
      res = await Promise.resolve(
        transport('get-bead-timeline', { bead_id: id })
      );
    } catch {
      res = null;
    }
    if (
      seq !== worker_timeline_request_seq ||
      key !== worker_timeline_loaded_for
    ) {
      return;
    }
    // A failure and an empty history are the same answer here: no section.
    worker_timeline = res && Array.isArray(res.events) ? res.events : [];
    worker_attempts = res && Array.isArray(res.attempts) ? res.attempts : [];
    worker_timeline_shown = WORKER_TIMELINE_PAGE;
    doRender();
  }

  /**
   * Ask once per (workspace, bead). The reply is short and the section is the
   * only place a finished attempt's history is readable at all, so it is
   * fetched on open rather than behind a toggle.
   */
  function syncWorkerTimeline() {
    if (!transport || !current_id) {
      return;
    }
    const key = workerTimelineCacheKey(current_id);
    if (worker_timeline_loaded_for === key) {
      return;
    }
    // The previous key's lines belong to another bead; they go before the new
    // reply lands, not after.
    worker_timeline = [];
    worker_attempts = [];
    worker_timeline_shown = WORKER_TIMELINE_PAGE;
    worker_timeline_loaded_for = key;
    void fetchWorkerTimeline(current_id, key);
  }

  function revealMoreWorkerTimeline() {
    worker_timeline_shown += WORKER_TIMELINE_PAGE;
    doRender();
  }

  function toggleTaskPrompt() {
    prompt_expanded = !prompt_expanded;
    if (
      prompt_expanded &&
      current_id &&
      prompt_loaded_for !== promptCacheKey(current_id)
    ) {
      prompt_data = null;
      void fetchTaskPrompt(current_id);
      return;
    }
    doRender();
  }

  /**
   * Every attempt record of this bead, `attempt_id` 기준 합집합 (§7).
   *
   * 큐 스냅샷만 읽으면 이관된 레코드가 통째로 빠진다 — 세션 이력과 총 사용량이
   * 타임라인만 남고 사라지는 자리가 여기다. 같은 id가 양쪽에 있으면 큐 쪽이
   * 이긴다: 살아 있는 행이 더 최신이다.
   *
   * @returns {Record<string, any>}
   */
  function attemptRecordsForBead() {
    /** @type {Record<string, any>} */
    const merged = {};
    for (const a of worker_attempts) {
      if (a && typeof a === 'object' && a.bead_id === current_id) {
        merged[String(a.attempt_id)] = a;
      }
    }
    const q = queueStore ? queueStore.get() : null;
    for (const a of q && q.attempts ? Object.values(q.attempts) : []) {
      const attempt = /** @type {any} */ (a);
      if (attempt && attempt.bead_id === current_id) {
        merged[String(attempt.attempt_id)] = attempt;
      }
    }
    return merged;
  }

  /**
   * Attempts recorded for the current bead, newest first — the queue store's
   * live rows and the transferred records this bead's history request carried.
   *
   * @returns {import('./session-history.js').SessionAttempt[]}
   */
  function attemptsForBead() {
    if (!current_id) {
      return [];
    }
    const attempts = Object.values(attemptRecordsForBead());
    return /** @type {any[]} */ (attempts)
      .sort((a, b) => (b.started_at || 0) - (a.started_at || 0))
      .map((a) => ({
        attempt_id: a.attempt_id,
        bead_id: a.bead_id,
        status: a.status,
        started_at: typeof a.started_at === 'number' ? a.started_at : null,
        runner: a.runner || null,
        model: a.model || null,
        effort: a.effort || a.observed_effort || null,
        speed: a.speed || null,
        session_id: a.session_id || null,
        resumed_from: a.resumed_from || null,
        continuation_mode: a.continuation_mode || null,
        dismissed_at:
          typeof a.dismissed_at === 'number' ? a.dismissed_at : null,
        cause: typeof a.cause === 'string' ? a.cause : null,
        cause_detail: a.cause_detail || null,
        exec_default_preset_id:
          typeof a.exec_default_preset_id === 'string'
            ? a.exec_default_preset_id
            : null,
        exec_default_preset_revision:
          typeof a.exec_default_preset_revision === 'number'
            ? a.exec_default_preset_revision
            : null,
        exec_values:
          a.exec_values && typeof a.exec_values === 'object'
            ? a.exec_values
            : null,
        usage: a.usage || null,
        usage_legs: Array.isArray(a.usage_legs) ? a.usage_legs : [],
        delegation_sessions: Array.isArray(a.delegation_sessions)
          ? a.delegation_sessions
          : []
      }));
  }

  /**
   * The issue's total token usage across every attempt (UI-d7pw §2.2). Uses the
   * SAME projection the worker lanes use, so the two surfaces can never report
   * different numbers for one bead.
   *
   * @returns {import('../../utils/token-usage.js').UsageProjection|null}
   */
  function totalUsageForBead() {
    if (!current_id) {
      return null;
    }
    return sumAttemptUsage(attemptRecordsForBead(), current_id);
  }

  /**
   * Which session rows have their token breakdown expanded ([τ 자세히],
   * UI-d7pw §2.2). Component-local and deliberately NOT persisted — an expanded
   * breakdown answers a question the reader is asking right now.
   *
   * @type {Set<string>}
   */
  const usage_expanded = new Set();

  /**
   * @param {string} attempt_id
   */
  function toggleUsageDetail(attempt_id) {
    if (usage_expanded.has(attempt_id)) {
      usage_expanded.delete(attempt_id);
    } else {
      usage_expanded.add(attempt_id);
    }
    doRender();
  }

  /**
   * @param {string} attempt_id
   */
  function openTranscript(attempt_id) {
    const q = queueStore ? queueStore.get() : null;
    const a = q && q.attempts ? q.attempts[attempt_id] : null;
    transcript_drawer.open({
      attempt_id,
      meta: a
        ? {
            runner: a.runner || undefined,
            model: a.model || undefined,
            effort: a.effort || undefined,
            status: a.status || undefined,
            session_id: a.session_id || undefined
          }
        : {}
    });
  }

  /**
   * @param {string} attempt_id
   * @param {string} launch_id
   */
  function openDelegationTranscript(attempt_id, launch_id) {
    const q = queueStore ? queueStore.get() : null;
    const attempt = q && q.attempts ? q.attempts[attempt_id] : null;
    /** @type {Array<Record<string, any>>} */
    const sessions =
      attempt && Array.isArray(attempt.delegation_sessions)
        ? attempt.delegation_sessions
        : [];
    const session = sessions.find(
      (candidate) =>
        candidate &&
        typeof candidate === 'object' &&
        candidate.launch_id === launch_id
    );
    if (!session) {
      return;
    }
    transcript_drawer.open({
      attempt_id,
      launch_id,
      meta: {
        // Two providers share this drawer (UI-2mpn §6.1); the row's own record
        // says which, and `agent_type` is the subagent's only name.
        runner: session.provider === 'claude' ? 'claude' : 'codex',
        role: session.role,
        ...(typeof session.agent_type === 'string'
          ? { agent_type: session.agent_type }
          : {}),
        model: session.model,
        effort: session.effort,
        session_id: session.session_id,
        status: session.status
      }
    });
  }

  /**
   * Manually resume a failed/orphaned attempt (spec §1). The flow — 지시
   * 다이얼로그, 충돌 1회 재시도, provider 경계, 거부 토스트 — 는
   * `runResumeFlow`가 소유하고(UI-6g3t §5.1), 이 화면은 대상 문맥과 재시도 없는
   * 전송 하나만 넘긴다. 전송마다 스토어의 revision을 새로 읽으므로, 충돌 응답의
   * 큐를 `adopt`가 채택한 것이 곧 다음 전송의 `expected_revision`이다. 서버가
   * 검증(§1.2의 여섯 거부)하고 디스패치하면 새 스냅샷이 이력 목록에 새 실행
   * attempt를 세운다.
   *
   * 세션 이력 행의 버튼은 착지 정산과 무관하므로 `kind`는 항상 `'session'`이다
   * (§5.4).
   *
   * @param {string} attempt_id
   */
  async function resumeAttempt(attempt_id) {
    if (!transport || !attempt_id) {
      return;
    }
    const send = transport;
    /** @returns {number} */
    const revision = () => {
      const q = queueStore ? queueStore.get() : null;
      return q && typeof q.revision === 'number' ? q.revision : 0;
    };
    const attempt = queueStore?.get()?.attempts?.[attempt_id] || null;
    await runResumeFlow({
      context: {
        bead_id: attempt?.bead_id || current_id || '',
        kind: 'session',
        tuple: attempt ? formatAttemptTuple(attempt) : ''
      },
      transport: (payload) =>
        /** @type {any} */ (
          send('worker-attempt-resume', {
            attempt_id,
            expected_revision: revision(),
            ...payload
          })
        ),
      adopt: (response) => {
        if (response?.queue && queueStore?.set) {
          queueStore.set(response.queue);
        }
      }
    });
  }

  /**
   * `worker-queue-place` 하나로 이 이슈를 대기 큐에 넣는다 (UI-6g3t §6.4). 후보
   * 카드와 같은 op를 같은 규율로 보낸다 — `root_dir`는 싣지 않고(상세 패널은
   * 구독 중인 워크스페이스의 bead만 보이므로 서버가 세션의 선택을 쓴다), 병렬이면
   * `lane`을 생략해 맨 뒤에 붙인다.
   *
   * 결과 처리는 `resumeAttempt`와 같다: 응답의 큐를 먼저 채택해야 재시도의
   * `expected_revision`이 새 값이 되고, 충돌 재시도는 **정확히 한 번**이다.
   * 입장 거부는 CAS 충돌이 아니라 `applied:false`로 온다 — admission은 서버가
   * 그대로 소유하고, 이 경로는 진입점 하나를 더한 것뿐이다.
   *
   * @param {string} bead_id
   * @param {'parallel'|'s1'|'s2'|'s3'|'s4'|'s5'} lane
   */
  async function placeInQueue(bead_id, lane) {
    if (!transport || !bead_id) {
      return;
    }
    const send = transport;
    /** @returns {any} */
    const payload = () => {
      const q = queueStore ? queueStore.get() : null;
      return {
        bead_id,
        ...(lane === 'parallel' ? {} : { lane }),
        expected_revision: q && typeof q.revision === 'number' ? q.revision : 0
      };
    };
    /** @param {any} response */
    const adopt = (response) => {
      if (response?.queue && queueStore?.set) {
        queueStore.set(response.queue);
      }
    };
    let res = /** @type {any} */ (
      await Promise.resolve(send('worker-queue-place', payload()))
    );
    adopt(res);
    if (res && res.conflict) {
      res = /** @type {any} */ (
        await Promise.resolve(send('worker-queue-place', payload()))
      );
      adopt(res);
    }
    doRender();
    if (!res) {
      return;
    }
    if (res.applied === false && typeof res.admission_reason === 'string') {
      showToast(`대기 적재 거부: ${res.admission_reason}`, 'error', 2400);
      return;
    }
    if (res.reason === 'rejected') {
      showToast('대기 적재 거부: rejected', 'error', 2400);
      return;
    }
    if (res.applied === false) {
      return;
    }
    // 자리는 응답이 준 큐가 말한다 — 보낸 레인이 아니라 채택된 스냅샷에서 다시
    // 읽으므로, 서버가 다른 자리에 넣었어도 토스트가 사실을 말한다.
    const location = res.queue
      ? candidatePlacement({ id: bead_id }, res.queue).location
      : null;
    if (location && 'index' in location) {
      showToast(
        `${placeLaneLabel(location.lane)} 대기 #${location.index + 1}에 추가`,
        'success',
        2400
      );
    }
  }

  /**
   * `place_menu_open`을 열거나 곧장 적재한다 (§6.2). 직렬 레인이 있으면 자리를
   * 먼저 고르고, 병렬 하나뿐이면 한 번의 누름이 그대로 맨 뒤 적재다 — 후보
   * 카드와 같은 규칙이다.
   *
   * @param {string} bead_id
   * @param {import('../worker/lanes.js').PlaceMenuEntry[]|null} lanes
   */
  function onPlaceClick(bead_id, lanes) {
    if (lanes) {
      place_menu_open = true;
      doRender();
      return;
    }
    void placeInQueue(bead_id, 'parallel');
  }

  /**
   * `placeMenuList` 목록 안의 클릭. 마크업을 후보 카드와 공유하므로 좌표도 같은
   * `data-lane`에서 읽는다.
   *
   * @param {Event} event
   * @param {string} bead_id
   */
  function onPlaceLaneClick(event, bead_id) {
    const target = /** @type {HTMLElement|null} */ (event.target);
    const row = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-card__place-lane') || null
    );
    const lane = row?.dataset.lane;
    if (!lane) {
      return;
    }
    if (lane !== 'parallel' && !/^s[1-5]$/.test(lane)) {
      return;
    }
    place_menu_open = false;
    doRender();
    void placeInQueue(
      bead_id,
      /** @type {'parallel'|'s1'|'s2'|'s3'|'s4'|'s5'} */ (lane)
    );
  }

  /**
   * Open one interactive session's transcript (UI-4xzk §6.5). The workspace is
   * the connection's own — the detail panel only ever shows the bead it is
   * subscribed to — so no `root_dir` rides along.
   *
   * @param {SessionRefView} view
   */
  function openSessionRef(view) {
    if (!view || !current_id) {
      return;
    }
    transcript_drawer.open(
      sessionRefDrawerInput(view, current_id, current && current.status)
    );
  }

  const session_handlers = {
    onOpen: openTranscript,
    onOpenDelegation: openDelegationTranscript,
    onResume: resumeAttempt,
    onToggleUsage: toggleUsageDetail,
    onOpenSessionRef: openSessionRef,
    onCopyResumeCommand: copyText
  };

  /**
   * Selected workspace preset settings. Missing or incompatible references are
   * deliberately ignored here: the detail UI must not imply a save/dispatch
   * path is viable when the server will fail closed.
   *
   * @returns {Record<string, any>}
   */
  function execDefaults() {
    const q = queueStore ? queueStore.get() : null;
    /** @type {Record<string, any>} */
    const values = { ...session_defaults };
    for (const key of [
      'orchestration_model',
      'orchestration_effort',
      'orchestration_speed'
    ]) {
      const value = q && /** @type {any} */ (q)[key];
      if (typeof value === 'string') {
        values[key] = value;
      }
    }
    return values;
  }

  /** Read the workspace session defaults for the card's `전역` layer. */
  async function loadSessionDefaults() {
    if (!transport) {
      return;
    }
    try {
      const res = /** @type {any} */ (
        await Promise.resolve(transport('get-session-defaults', {}))
      );
      session_defaults =
        res && res.values && typeof res.values === 'object' ? res.values : {};
    } catch {
      // Fail-quiet: an unreadable workspace layer shows as `기본`, never as a
      // fabricated value.
      session_defaults = {};
    }
    doRender();
  }

  /**
   * The queue snapshot's `runner_catalog` decoration (UI-jrb3 §7) — the source
   * of the grouped model options and per-model effort lists. Null before the
   * first snapshot, which the editor degrades fail-quiet.
   *
   * @returns {any}
   */
  function runnerCatalog() {
    const q = queueStore ? queueStore.get() : null;
    return (q && /** @type {any} */ (q).runner_catalog) || null;
  }

  /** @returns {Record<string, any>|null} */
  function executionDefaults() {
    const q = queueStore ? queueStore.get() : null;
    return q && typeof q.execution_defaults === 'object'
      ? q.execution_defaults
      : null;
  }

  /**
   * The provider an inherited implementation target resolves to on this exact
   * screen. This follows the same value resolution as the selects: optimistic
   * local edit, bead metadata, selected compatible workspace preset, then the
   * orchestration fallback.
   *
   * @returns {string|null}
   */
  function effectiveOrchestrationRuntime() {
    const metadata =
      current?.metadata && typeof current.metadata === 'object'
        ? current.metadata
        : {};
    const resolved = resolveExecutionSettings({
      pin: { ...metadata, ...exec_local },
      global: execDefaults(),
      execution_defaults: executionDefaults(),
      runner_catalog: runnerCatalog(),
      route: typeof metadata.route === 'string' ? metadata.route : null
    });
    const model = resolved.orchestration_model.value || '';
    return modelRunnerOf(runnerCatalog(), model);
  }

  /** @returns {{ revision: number, presets: any[] }|null} */
  function execPresetState() {
    const state = execPresetStore ? execPresetStore.get() : null;
    if (!state || typeof state.revision !== 'number') {
      return null;
    }
    return {
      revision: state.revision,
      presets: Array.isArray(state.presets) ? state.presets : []
    };
  }

  /**
   * Whether a preset cannot be applied. The COORDINATOR is the judge — it
   * annotates each preset against the live catalog, so the client never
   * re-derives a verdict that could disagree with the write boundary.
   *
   * @param {any} preset
   * @returns {boolean}
   */
  function presetIsIncompatible(preset) {
    return preset?.compatible === false;
  }

  /** @param {any} res */
  function adoptExecPresets(res) {
    if (
      execPresetStore &&
      res &&
      typeof res.revision === 'number' &&
      Array.isArray(res.presets)
    ) {
      execPresetStore.set({ revision: res.revision, presets: res.presets });
    }
  }

  async function applyImplPreset() {
    const state = execPresetState();
    const preset = state?.presets.find(
      (candidate) => candidate.id === selected_preset_id
    );
    if (
      !transport ||
      !current_id ||
      !state ||
      !preset ||
      presetIsIncompatible(preset) ||
      applying_preset
    ) {
      return;
    }
    applying_preset = true;
    skipped_orchestration_keys = [];
    doRender();
    try {
      const res = /** @type {any} */ (
        await Promise.resolve(
          transport(
            'apply-impl-preset',
            buildImplPresetApplyPayload(current_id, preset.id, state.revision)
          )
        )
      );
      if (res && res.conflict) {
        adoptExecPresets(res);
        showToast(
          '프리셋이 변경됐습니다. 최신 목록에서 다시 적용하세요.',
          'error',
          4000
        );
        return;
      }
      const issue = res && Array.isArray(res.issue) ? res.issue[0] : res?.issue;
      if (res && res.applied && issue && typeof issue === 'object') {
        current = issue;
        skipped_orchestration_keys = Array.isArray(
          res.skipped_orchestration_keys
        )
          ? res.skipped_orchestration_keys.filter(
              (/** @type {unknown} */ key) => typeof key === 'string'
            )
          : [];
        for (const key of EXEC_KEYS) {
          delete exec_local[key];
        }
        showToast(
          skipped_orchestration_keys.length > 0
            ? '실행 프리셋을 적용했습니다. 오케스트레이션 3키는 Bead에 핀할 수 없어 건너뛰었습니다.'
            : '실행 프리셋을 적용했습니다.',
          'success',
          4000
        );
        return;
      }
      if (res && res.error === 'bd_readback_failed') {
        showToast(
          '설정은 전송됐지만 적용 여부 확인이 필요합니다.',
          'error',
          4000
        );
      } else {
        showToast('실행 프리셋 적용 실패', 'error', 4000);
      }
    } catch (err) {
      if (
        err &&
        typeof err === 'object' &&
        /** @type {any} */ (err).code === 'bd_readback_failed'
      ) {
        showToast(
          '설정은 전송됐지만 적용 여부 확인이 필요합니다.',
          'error',
          4000
        );
      } else {
        showToast('실행 프리셋 적용 실패', 'error', 4000);
      }
    } finally {
      applying_preset = false;
      doRender();
    }
  }

  /** @type {null | (() => void)} */
  let unsubscribe = null;
  if (issueStores && issueStores.subscribe) {
    unsubscribe = issueStores.subscribe(() => refreshFromStore());
  }
  /** @type {null | (() => void)} */
  let unsubscribe_queue = null;
  if (queueStore && typeof queueStore.subscribe === 'function') {
    // A new/updated attempt should refresh the session-history list.
    unsubscribe_queue = queueStore.subscribe(() => {
      if (current_id) {
        doRender();
      }
    });
  }
  /** @type {null | (() => void)} */
  let unsubscribe_presets = null;
  /**
   * The aggregated candidate channel (UI-lx45 §3.2). 상세 패널의 public API는
   * `load`·`clear`·`destroy`뿐이라 재렌더 경로가 따로 없다 — 첫 snapshot이
   * 늦게 도착해도 화면이 `후보를 불러올 수 없음`에 멈추지 않도록 이 구독이
   * 갱신을 나른다.
   *
   * @type {null | (() => void)}
   */
  let unsubscribe_candidates = null;

  function releaseCandidates() {
    if (unsubscribe_candidates) {
      unsubscribe_candidates();
      unsubscribe_candidates = null;
    }
  }
  if (execPresetStore && typeof execPresetStore.subscribe === 'function') {
    unsubscribe_presets = execPresetStore.subscribe(() => {
      if (current_id) {
        doRender();
      }
    });
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onKeydown(ev) {
    if (ev.key === 'Escape' && current_id) {
      ev.preventDefault();
      onClose();
    }
  }
  document.addEventListener('keydown', onKeydown);

  /**
   * 헤더 `복잡` 칩의 사유 팝업 (UI-8x90 §5.1). 바깥 클릭·Esc 판정은 카드와 같은
   * 모듈이 소유한다. 패널을 닫는 클릭은 오버레이 backdrop이 받으므로
   * `.detail-summary` 안 클릭이 패널 닫힘으로 흐르지 않는 현행 규칙은 그대로다.
   */
  const chip_popover = createChipPopover(() => doRender());
  chip_popover.attach();

  function refreshFromStore() {
    if (!current_id) {
      return;
    }
    if (issueStores && typeof issueStores.snapshotFor === 'function') {
      const snap = issueStores.snapshotFor('detail:' + current_id) || [];
      const found = snap.find((it) => it && it.id === current_id);
      current = found || snap[0] || current;
    }
    syncComments();
    syncSessionRefs();
    syncWorkerTimeline();
    doRender();
  }

  /**
   * @param {string} text
   */
  function copyText(text) {
    void copyToClipboard(text).then((ok) => {
      if (ok) {
        showToast('복사됨', 'success', 1200);
      } else {
        showToast('복사 실패', 'error', 1600);
      }
    });
  }

  /**
   * @param {Event} ev
   */
  function onCopyId(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (current_id) {
      copyText(current_id);
    }
  }

  /**
   * @param {Event} ev
   * @param {string} path
   */
  function onCopyPath(ev, path) {
    ev.preventDefault();
    ev.stopPropagation();
    copyText(path);
  }

  /**
   * @param {Event} ev
   * @param {string} path
   * @param {'plan_pending'|'spec_draft'|null} missing_state
   */
  function onOpenDoc(ev, path, missing_state) {
    ev.preventDefault();
    ev.stopPropagation();
    void md_viewer.open(path, { missing_state });
  }

  /**
   * Write one exec-setting key, optimistically first and authoritatively after
   * the readback.
   *
   * Resolves only once the server's `bd show` reply has been adopted, and
   * rejects — after restoring this key's prior draft value and toasting — when
   * it does not arrive (UI-sbum §4). The 추천 적용 path needs that: it writes two
   * keys in sequence and must not send the second one after the first failed.
   * The editor call sites ignore the result, so their behaviour is unchanged.
   *
   * @param {string} key
   * @param {string} value
   * @returns {Promise<void>}
   */
  async function onExecChange(key, value) {
    const had_previous = Object.hasOwn(exec_local, key);
    const previous = exec_local[key];
    exec_local[key] = value;
    doRender();
    if (!transport || !current_id) {
      return;
    }
    try {
      // THREE-STATE (spec §E): an explicit choice is a literal write and only
      // the editor's `(기본)` — carried here as an empty value — deletes the key.
      const res = await Promise.resolve(
        transport(
          'update-exec-settings',
          buildThreeStatePayload(
            current_id,
            key,
            value.length === 0 ? null : value
          )
        )
      );
      // Same readback contract as `onImplTargetChange`: the reply is a `bd show`
      // issue (object or single-item array), and the production transport
      // swallows rejections into `[]`, so anything else is a failure.
      const issue = Array.isArray(res) ? res[0] : res;
      if (!issue || typeof issue !== 'object' || !issue.id) {
        throw new Error('exec settings readback failed');
      }
      current = issue;
      delete exec_local[key];
      doRender();
    } catch (err) {
      if (had_previous) {
        exec_local[key] = previous;
      } else {
        delete exec_local[key];
      }
      doRender();
      showToast('실행 설정 변경 실패', 'error');
      throw err;
    }
  }

  /**
   * Run one of the two exec handlers where the caller has nothing to do with
   * the outcome. Both already restore their draft and toast, so the rejection
   * must be absorbed here rather than escaping as an unhandled one.
   *
   * @param {Promise<void>} pending
   */
  function fireAndForgetExec(pending) {
    void pending.catch(() => {});
  }

  /**
   * Save the three linked implementation controls as one optimistic group.
   * Runtime changes cannot leave a mismatched exact model or effort in the
   * local draft, so incompatible values reset to auto before the one mutation.
   *
   * Returns a promise that resolves once the readback is adopted and rejects
   * when it is not (UI-sbum §4) — the same contract as `onExecChange`, so the
   * 추천 적용 path can await both in order.
   *
   * @param {string} key
   * @param {string} value
   * @returns {Promise<void>}
   */
  async function onImplTargetChange(key, value) {
    const data = current || {};
    const metadata =
      data.metadata && typeof data.metadata === 'object' ? data.metadata : {};
    /** @type {Record<string, string|undefined>} */
    const target = {};
    for (const target_key of /** @type {const} */ ([
      'impl_runtime',
      'impl_model',
      'impl_effort'
    ])) {
      target[target_key] = Object.hasOwn(exec_local, target_key)
        ? exec_local[target_key]
        : typeof metadata[target_key] === 'string'
          ? metadata[target_key]
          : '';
    }
    target[key] = value;
    const normalized = normalizeImplTarget(
      /** @type {{ impl_runtime: string, impl_model: string, impl_effort: string }} */ (
        target
      ),
      runnerCatalog(),
      effectiveOrchestrationRuntime()
    );
    /** @type {Record<string, string|undefined>} */
    const previous = {};
    for (const target_key of /** @type {const} */ ([
      'impl_runtime',
      'impl_model',
      'impl_effort'
    ])) {
      previous[target_key] = exec_local[target_key];
      exec_local[target_key] = normalized[target_key] || '';
    }
    doRender();
    if (!transport || !current_id) {
      return;
    }
    return Promise.resolve(
      transport('update-impl-target', {
        id: current_id,
        ...normalized,
        orchestration_runtime: effectiveOrchestrationRuntime()
      })
    )
      .then((res) => {
        const issue = Array.isArray(res) ? res[0] : res;
        if (!issue || typeof issue !== 'object' || !issue.id) {
          throw new Error('implementation target readback failed');
        }
        current = issue;
        for (const target_key of [
          'impl_runtime',
          'impl_model',
          'impl_effort'
        ]) {
          delete exec_local[target_key];
        }
        doRender();
      })
      .catch((err) => {
        for (const target_key of [
          'impl_runtime',
          'impl_model',
          'impl_effort'
        ]) {
          if (previous[target_key] === undefined) {
            delete exec_local[target_key];
          } else {
            exec_local[target_key] = previous[target_key];
          }
        }
        doRender();
        showToast('구현 target 변경 실패', 'error');
        throw err;
      });
  }

  /**
   * Send an issue mutation and reconcile local state from the reply. A
   * successful reply is the fresh `bd show` issue object (has an `id`); the
   * production transport swallows rejections into `[]`, so anything that is not
   * an issue object is treated as failure. Returns whether it succeeded.
   *
   * `bd_readback_failed` is the one failure that is not a failure to write: the
   * mutation landed and only the confirming read did (UI-lx45 §6). It comes back
   * as `{ ok: false, saved: true }` so a caller that must react to the saved
   * edge can, while every caller that only asks "did it succeed" still sees a
   * value that is not `true`. Only the dependency ops read the object form.
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @param {string} fail_message
   * @returns {Promise<boolean | { ok: false, saved: true }>}
   */
  async function sendMutation(type, payload, fail_message) {
    if (!transport || !current_id) {
      return false;
    }
    try {
      const res = await Promise.resolve(transport(type, payload));
      // `bd show --json` emits an object OR a single-item array depending on
      // the CLI version; the server passes it through unnormalized. An empty
      // array (the transport's swallowed-error value) stays a failure.
      const issue = Array.isArray(res) ? res[0] : res;
      if (issue && typeof issue === 'object' && /** @type {any} */ (issue).id) {
        current = issue;
        return true;
      }
      showToast(fail_message, 'error');
      return false;
    } catch (err) {
      if (
        err &&
        typeof err === 'object' &&
        /** @type {any} */ (err).code === 'bd_readback_failed'
      ) {
        showToast('저장됐으나 확인 실패 — 곧 갱신됩니다', 'error');
        return { ok: false, saved: true };
      }
      showToast(fail_message, 'error');
      return false;
    }
  }

  /**
   * @param {string} selector
   */
  function focusEdit(selector) {
    setTimeout(() => {
      try {
        const el = /** @type {HTMLElement | null} */ (
          mount_element.querySelector(selector)
        );
        if (el && typeof el.focus === 'function') {
          el.focus();
        }
      } catch {
        // ignore focus errors
      }
    }, 0);
  }

  function startEditTitle() {
    editing_title = true;
    title_draft = (current && current.title) || '';
    doRender();
    focusEdit('.detail-edit__input[data-edit="title"]');
  }

  /**
   * @param {Event} ev
   */
  function onTitleInput(ev) {
    title_draft = /** @type {HTMLInputElement} */ (ev.target).value;
  }

  function cancelTitle() {
    editing_title = false;
    title_draft = '';
    doRender();
  }

  function saveTitle() {
    const value = title_draft;
    void sendMutation(
      'edit-text',
      { id: current_id, field: 'title', value },
      '제목 저장 실패'
    ).then((ok) => {
      if (ok === true) {
        editing_title = false;
        title_draft = '';
      }
      doRender();
    });
  }

  function startEditDesc() {
    editing_desc = true;
    desc_draft = (current && current.description) || '';
    doRender();
    focusEdit('.detail-edit__textarea[data-edit="description"]');
  }

  /**
   * @param {Event} ev
   */
  function onDescInput(ev) {
    desc_draft = /** @type {HTMLTextAreaElement} */ (ev.target).value;
  }

  function cancelDesc() {
    editing_desc = false;
    desc_draft = '';
    doRender();
  }

  function saveDesc() {
    const value = desc_draft;
    void sendMutation(
      'edit-text',
      { id: current_id, field: 'description', value },
      '설명 저장 실패'
    ).then((ok) => {
      if (ok === true) {
        editing_desc = false;
        desc_draft = '';
      }
      doRender();
    });
  }

  /**
   * Escape cancels the editor without bubbling to the panel-close listener;
   * Enter (input) / Ctrl+Enter (textarea) saves.
   *
   * @param {KeyboardEvent} ev
   * @param {() => void} save
   * @param {() => void} cancel
   * @param {boolean} multiline
   */
  function onEditorKeydown(ev, save, cancel, multiline) {
    if (ev.key === 'Escape') {
      ev.stopPropagation();
      cancel();
      return;
    }
    if (ev.key === 'Enter' && (!multiline || ev.ctrlKey || ev.metaKey)) {
      ev.preventDefault();
      save();
    }
  }

  /**
   * @param {Event} ev
   */
  function onStatusChange(ev) {
    const status = /** @type {HTMLSelectElement} */ (ev.target).value;
    void sendMutation(
      'update-status',
      { id: current_id, status },
      '상태 변경 실패'
    ).then(() => doRender());
  }

  /**
   * @param {Event} ev
   */
  function onPriorityChange(ev) {
    const priority = Number(/** @type {HTMLSelectElement} */ (ev.target).value);
    void sendMutation(
      'update-priority',
      { id: current_id, priority },
      '우선순위 변경 실패'
    ).then(() => doRender());
  }

  /**
   * @param {Event} ev
   */
  function onLabelInput(ev) {
    label_draft = /** @type {HTMLInputElement} */ (ev.target).value;
  }

  function addLabel() {
    const label = label_draft.trim();
    if (label.length === 0) {
      return;
    }
    void sendMutation(
      'label-add',
      { id: current_id, label },
      '라벨 추가 실패'
    ).then((ok) => {
      if (ok === true) {
        label_draft = '';
      }
      doRender();
    });
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onLabelKeydown(ev) {
    if (ev.key === 'Escape') {
      ev.stopPropagation();
      label_draft = '';
      doRender();
      return;
    }
    if (ev.key === 'Enter') {
      ev.preventDefault();
      addLabel();
    }
  }

  /**
   * @param {string} label
   */
  function removeLabel(label) {
    void sendMutation(
      'label-remove',
      { id: current_id, label },
      '라벨 제거 실패'
    ).then(() => doRender());
  }

  const artifact_handlers = { onCopyPath, onOpenDoc };

  /**
   * Normalize a bd dependency edge to a target id.
   *
   * @param {any} edge
   * @returns {string}
   */
  function edgeId(edge) {
    if (typeof edge === 'string') {
      return edge;
    }
    if (edge && typeof edge === 'object') {
      return String(
        edge.id || edge.to || edge.issue_id || edge.depends_on || ''
      );
    }
    return '';
  }

  /**
   * The bd edge type of one dependency entry.
   *
   * @param {any} edge
   * @returns {string}
   */
  function edgeType(edge) {
    return edge && typeof edge === 'object'
      ? String(edge.dependency_type || edge.type || '')
      : '';
  }

  /**
   * The 글리프 and 관계명 of a `나머지` chip (UI-8x90 §3). 라벨은 글리프+ID뿐이고
   * 관계명은 툴팁 첫 줄로 간다 — 같은 관계가 카드와 상세에서 같은 기호로 읽히는
   * 것이 그 표의 목적이다. 모르는 종류는 기호를 지어내지 않고 그 type 문자열을
   * 그대로 라벨에 쓰므로, 그 문자열이 곧 이 간선의 관계명이다.
   *
   * @param {string} type
   * @returns {{ glyph: string, relation: string }}
   */
  function otherEdgeGrammar(type) {
    switch (type) {
      case 'discovered-from':
        return { glyph: '↩ ', relation: '발견' };
      case 'parent-child':
        return { glyph: '⌸ ', relation: '상위' };
      case 'related':
        return { glyph: '↔ ', relation: '관련' };
      default:
        return type.length > 0
          ? { glyph: `${type} `, relation: type }
          : { glyph: '', relation: '' };
    }
  }

  /**
   * One dependency chip's tooltip (UI-8x90 §3): 관계명 첫 줄, 그 다음에 아는
   * 만큼의 `status · title`. 라벨에서 뺀 방향어가 여기로 왔으므로, 관계명이
   * 없는 간선(type을 못 읽은 문자열 간선)만 예전처럼 나머지 한 줄이다.
   *
   * @param {string} relation
   * @param {any} edge
   * @returns {string|undefined}
   */
  function depTitle(relation, edge) {
    const rest = edgeTitle(edge);
    /** @type {string[]} */
    const lines = [];
    if (relation.length > 0) {
      lines.push(relation);
    }
    if (rest) {
      lines.push(rest);
    }
    return lines.length > 0 ? lines.join('\n') : undefined;
  }

  /**
   * `status · title` for a chip's tooltip. 둘 다 있을 때만 말한다 — 반쪽짜리
   * 사실을 툴팁으로 주장하지 않는다.
   *
   * @param {any} edge
   * @returns {string|undefined}
   */
  function edgeTitle(edge) {
    if (!edge || typeof edge !== 'object') {
      return undefined;
    }
    const status = typeof edge.status === 'string' ? edge.status : '';
    const title = typeof edge.title === 'string' ? edge.title : '';
    return status.length > 0 && title.length > 0
      ? `${status} · ${title}`
      : undefined;
  }

  /** @returns {string} */
  function depWorkspacePath() {
    return (
      (options.getWorkspacePath && options.getWorkspacePath()) ||
      ''
    ).trim();
  }

  /** @returns {DepCandidateModel|null} */
  function candidateModel() {
    return options.depCandidates ? options.depCandidates() : null;
  }

  /**
   * One dependency op (UI-lx45 §3.3). `a`는 언제나 이 이슈다 — 상세 패널이
   * 편집하는 방향은 "이 이슈를 무엇이 막는가" 하나뿐이고, `root_dir`은 그
   * 피차단 이슈의 레포이므로 활성 워크스페이스와 같다.
   *
   * @param {'dep-add'|'dep-remove'} type
   * @param {string} b
   * @param {string} fail_message
   * @returns {Promise<void>}
   */
  async function sendDepOp(type, b, fail_message) {
    const root_dir = depWorkspacePath();
    const a = current_id;
    if (!a) {
      return;
    }
    if (root_dir.length === 0) {
      showToast('레포를 알 수 없어 의존을 바꿀 수 없습니다', 'error');
      return;
    }
    const result = await sendMutation(
      type,
      { a, b, view_id: a, root_dir },
      fail_message
    );
    // 저장된 간선마다 정확히 한 번 (§3.3): 확인 읽기만 실패한 경우도 쓰기는
    // 반영됐으므로 자동 교정이 이 사실을 놓치면 안 된다.
    const saved =
      result === true || (result !== false && result.saved === true);
    if (saved && options.onDepChanged) {
      options.onDepChanged({ type, a, b });
    }
    if (type === 'dep-add' && saved) {
      dep_query = '';
      dep_list_open = false;
    }
    doRender();
  }

  /**
   * @param {string} blocker_id
   */
  function unlinkDep(blocker_id) {
    if (!current_id) {
      return;
    }
    const ask = globalThis.confirm;
    if (
      typeof ask === 'function' &&
      !ask(`${blocker_id}가 ${current_id}를 막는 연결을 끊을까요?`)
    ) {
      return;
    }
    void sendDepOp('dep-remove', blocker_id, '의존 해제 실패');
  }

  /**
   * @param {DepCandidate} candidate
   */
  function addDep(candidate) {
    if (candidate.disabled) {
      return;
    }
    void sendDepOp('dep-add', candidate.bead_id, '의존 추가 실패');
  }

  /**
   * @param {Event} ev
   */
  function onDepInput(ev) {
    dep_query = /** @type {HTMLInputElement} */ (ev.target).value;
    dep_list_open = true;
    doRender();
  }

  function onDepFocus() {
    if (!dep_list_open) {
      dep_list_open = true;
      doRender();
    }
  }

  /**
   * @param {KeyboardEvent} ev
   * @param {DepCandidate[]} shown
   */
  function onDepKeydown(ev, shown) {
    if (ev.key === 'Escape') {
      // 패널 자체의 Escape(닫기)보다 먼저 잡는다 — 라벨 입력과 같은 문법이다.
      ev.stopPropagation();
      dep_query = '';
      dep_list_open = false;
      doRender();
      return;
    }
    if (ev.key === 'Enter') {
      ev.preventDefault();
      if (shown.length === 1 && !shown[0].disabled) {
        addDep(shown[0]);
      }
    }
  }

  /**
   * @param {DepCandidate[]} shown
   */
  function depAddTemplate(shown) {
    return html`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${dep_query}
        @focus=${onDepFocus}
        @input=${onDepInput}
        @keydown=${(/** @type {KeyboardEvent} */ ev) => onDepKeydown(ev, shown)}
      />
      ${dep_list_open || dep_query.length > 0
        ? html`<div class="detail-dep-add__list">
            ${shown.length === 0
              ? html`<div class="detail-dep-add__empty">후보 없음</div>`
              : shown.map(
                  (candidate) =>
                    html`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${candidate.bead_id}
                      ?disabled=${candidate.disabled}
                      title=${ifDefined(candidate.reason)}
                      @click=${() => addDep(candidate)}
                    >
                      <span class="detail-dep-add__repo"
                        >${candidate.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${candidate.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${candidate.title}</span
                      >
                    </button>`
                )}
          </div>`
        : ''}
    </div>`;
  }

  /**
   * One chip of the 의존성 절.
   *
   * @param {{ id: string, label: string, kind: 'pred'|'succ'|'other', title: string|undefined }} chip
   * @param {Map<string, string>} root_by_id
   */
  function depChipTemplate(chip, root_by_id) {
    const root_dir = root_by_id.get(chip.id);
    const body = onNavigate
      ? html`<button
          type="button"
          class="detail-dep__link"
          title=${ifDefined(chip.title)}
          @click=${() =>
            root_dir === undefined
              ? onNavigate(chip.id)
              : onNavigate(chip.id, root_dir)}
        >
          ${chip.label}
        </button>`
      : html`<span class="detail-dep__link" title=${ifDefined(chip.title)}
          >${chip.label}</span
        >`;
    return html`<span
      class=${`detail-dep detail-dep--${chip.kind}${
        onNavigate ? ' detail-dep--link' : ''
      }`}
      >${body}${chip.kind === 'pred'
        ? html`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${chip.id}
            aria-label=${'의존 해제: ' + chip.id}
            @click=${() => unlinkDep(chip.id)}
          >
            ✕
          </button>`
        : ''}</span
    >`;
  }

  /**
   * The 의존성 절 (UI-lx45 §4). 선행(`dependencies` 중 `blocks`)·후행
   * (`dependents` 중 `blocks`)·나머지(`dependencies` 중 그 외)를 한 절에 두고,
   * 종류는 글리프(UI-8x90 §3)와 색 티어로 구분한다. 편집은 선행 한 방향뿐이다.
   *
   * @param {any} data
   */
  function depsTemplate(data) {
    const deps = Array.isArray(data.dependencies) ? data.dependencies : [];
    const dependents = Array.isArray(data.dependents) ? data.dependents : [];
    /** @type {Array<{ id: string, label: string, kind: 'pred'|'succ'|'other', title: string|undefined }>} */
    const chips = [];
    for (const edge of deps) {
      const id = edgeId(edge);
      if (id.length > 0 && edgeType(edge) === 'blocks') {
        chips.push({
          id,
          label: `⛓ ${id}`,
          kind: 'pred',
          title: depTitle('막는', edge)
        });
      }
    }
    // 역방향 관계 중 `blocks`만 싣는다 (§4.1): 나머지는 같은 간선이
    // `dependencies` 쪽에도 있어 중복되고, 역방향 말머리가 정의돼 있지 않다.
    for (const edge of dependents) {
      const id = edgeId(edge);
      if (id.length > 0 && edgeType(edge) === 'blocks') {
        chips.push({
          id,
          label: `→ ${id}`,
          kind: 'succ',
          title: depTitle('막히는', edge)
        });
      }
    }
    for (const edge of deps) {
      const id = edgeId(edge);
      const type = edgeType(edge);
      if (id.length > 0 && type !== 'blocks') {
        const grammar = otherEdgeGrammar(type);
        chips.push({
          id,
          label: `${grammar.glyph}${id}`,
          kind: 'other',
          title: depTitle(grammar.relation, edge)
        });
      }
    }

    const model = candidateModel();
    /** @type {Map<string, string>} */
    const root_by_id = new Map();
    if (model) {
      for (const issue of model.issues) {
        if (!root_by_id.has(issue.bead_id)) {
          root_by_id.set(issue.bead_id, issue.root_dir);
        }
      }
    }
    const shown =
      model && current_id
        ? filterDepCandidates(depCandidatesOf(current_id, model), dep_query)
        : [];
    return html`
      <div class="detail-section-label">의존성</div>
      ${chips.length === 0
        ? html`<div class="detail-empty">의존성 없음</div>`
        : html`<div class="detail-deps">
            ${chips.map((chip) => depChipTemplate(chip, root_by_id))}
          </div>`}
      ${model === null
        ? html`<div class="detail-empty">후보를 불러올 수 없음</div>`
        : depAddTemplate(shown)}
    `;
  }

  /**
   * @param {any} data
   */
  function workflowTemplate(data) {
    const md = data.metadata || {};
    const wf = data.workflow || {};
    const stages = wf.stages || {};
    const specStale = stages.spec && stages.spec.stale;
    const implStale = stages.impl && stages.impl.stale;
    // 접미는 판정이 `stale`이라고 말할 때만 붙는다. `unknown`은 투영을 못 읽어
    // 판정 자체가 없다는 뜻이므로 아무 주장도 하지 않는다 (UI-r7or §5.5).
    const quick_fix_stale = wf.quick_fix_review?.state === 'stale';
    const plan = stages.plan || null;
    // Derived route remains available for workflow layout, but display names
    // the missing metadata pin instead of exposing the fallback value.
    const route_derived = wf.route_source === 'derived';
    const route_label = wf.route || md.route || '—';
    return html`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${route_derived ? ' detail-kv__v--derived' : ''}"
          title=${route_derived ? 'route 미핀 (metadata unset)' : 'route'}
          >${route_derived ? 'unset' : route_label}</span
        >
      </div>
      ${wf.route !== 'quick_fix' || Object.hasOwn(md, 'spec_review')
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${md.spec_review || '없음'}${specStale ? ' · stale' : ''}</span
            >
          </div>`
        : ''}
      ${wf.route === 'full_plan'
        ? html`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${plan?.receipt || '없음'}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${plan?.approval_receipt || '없음'}${plan?.approval_state ===
                'stale'
                  ? ' · stale'
                  : plan?.approval_state === 'unknown'
                    ? ' · unknown'
                    : ''}</span
              >
            </div>`
        : ''}
      ${wf.route !== 'quick_fix' || Object.hasOwn(md, 'impl_review')
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${md.impl_review || '없음'}${implStale ? ' · stale' : ''}</span
            >
          </div>`
        : ''}
      ${wf.resolver
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${wf.resolver.attempt} · ${wf.resolver.prior_sha} → ${wf.resolver.sha}`}
              >${`${wf.resolver.prior_sha.slice(0, 7)} → ${wf.resolver.sha.slice(0, 7)}`}</span
            >
          </div>`
        : ''}
      ${wf.route === 'quick_fix' || Object.hasOwn(md, 'quick_fix_review')
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${md.quick_fix_review || '없음'}${quick_fix_stale
                ? ' · stale'
                : ''}</span
            >
          </div>`
        : ''}
      ${wf.planned_execution
        ? html`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${wf.planned_execution.kind}</span>
            </div>
            ${wf.planned_execution.kind === 'main'
              ? html`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${wf.planned_execution.reason}</span
                  >
                </div>`
              : ''}`
        : ''}
      ${wf.exec_receipt
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${formatExecReceipt(wf.exec_receipt)}</span
            >
          </div>`
        : ''}
      ${wf.impl_entry
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${wf.impl_entry.actor}@${wf.impl_entry.sha}`}</span
            >
          </div>`
        : ''}
      ${md.pr_url
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${md.pr_url}</span>
          </div>`
        : ''}
    `;
  }

  /**
   * Workflow metadata enum keys editable from the panel (§6). Empty = unset
   * (the key is removed; route falls back to derivation at resolution time).
   * merge_policy/drift_policy는 축 폐기(worker-phase2 §2) — 모든 세션이
   * PR-stop이므로 더 이상 편집 대상이 아니다.
   */
  /** @type {Record<'route', string[]>} */
  const WORKFLOW_META_OPTIONS = {
    route: ['quick_fix', 'spec_backed', 'full_plan']
  };

  /**
   * @param {'route'} key
   * @param {Event} ev
   */
  async function onWorkflowMetaChange(key, ev) {
    const value = /** @type {HTMLSelectElement} */ (ev.target).value;
    if (
      key === 'route' &&
      current &&
      current.metadata &&
      current.metadata.route === 'full_plan' &&
      value !== 'full_plan'
    ) {
      // 저장된 plan 포기·마커 정리는 세션 계약 소유 — UI는 metadata만 바꾼다.
      const proceed = window.confirm(
        `full_plan → ${value || '(미설정)'} 전환: 저장된 plan 승인은 포기되며, plan 파일·마커 정리는 세션 계약이 수행합니다. 계속할까요?`
      );
      if (!proceed) {
        doRender();
        return;
      }
    }
    await sendMutation(
      'update-workflow-meta',
      { id: current_id, key, value },
      '워크플로우 메타 변경 실패'
    );
    doRender();
  }

  /**
   * Editable workflow metadata selects (route).
   *
   * @param {any} data
   */
  function workflowMetaTemplate(data) {
    const md = data.metadata || {};
    /**
     * @param {'route'} key
     * @param {string} unset_label
     */
    const row = (key, unset_label) => {
      const opts = WORKFLOW_META_OPTIONS[key];
      const value = typeof md[key] === 'string' ? md[key] : '';
      return html`<div class="detail-kv">
        <span class="detail-kv__k">${key}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${key}
          data-edit=${`wfmeta-${key}`}
          @change=${(/** @type {Event} */ ev) => onWorkflowMetaChange(key, ev)}
        >
          <option value="" ?selected=${!opts.includes(value)}>
            ${unset_label}
          </option>
          ${opts.map(
            (o) =>
              html`<option value=${o} ?selected=${value === o}>${o}</option>`
          )}
        </select>
      </div>`;
    };
    return html` ${row('route', '(unset)')} `;
  }

  /**
   * @param {string} title
   * @param {import('../../utils/token-usage.js').UsageProjection|null} total_usage
   */
  function titleTemplate(title, total_usage) {
    if (editing_title) {
      return html`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${title_draft}
            @input=${onTitleInput}
            @keydown=${(/** @type {KeyboardEvent} */ ev) =>
              onEditorKeydown(ev, saveTitle, cancelTitle, false)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${saveTitle}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${cancelTitle}
            >
              취소
            </button>
          </div>
        </div>
      `;
    }
    return html`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${title}</h2>
        ${providerUsageBadges(total_usage).map(
          (badge) =>
            html`<span class="detail-usage-total" title=${badge.tooltip}
              >${badge.label}</span
            >`
        )}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${startEditTitle}
        >
          ✎
        </button>
      </div>
    `;
  }

  /**
   * Read-only created/updated rows (UX v3 spec §1): local-timezone absolute
   * times via the shared `formatTimestampLocal` helper.
   *
   * @param {{ created_at?: number | string, updated_at?: number | string }} data
   */
  function timesTemplate(data) {
    const created = formatTimestampLocal(data.created_at);
    const updated = formatTimestampLocal(data.updated_at);
    if (!created && !updated) {
      return html``;
    }
    return html`
      ${created
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${created}</span>
          </div>`
        : ''}
      ${updated
        ? html`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${updated}</span>
          </div>`
        : ''}
    `;
  }

  /**
   * @param {string} status
   * @param {number | ''} priority_val
   */
  function propsTemplate(status, priority_val) {
    return html`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${onStatusChange}
        >
          ${STATUS_OPTIONS.map(
            (s) =>
              html`<option value=${s} ?selected=${s === status}>${s}</option>`
          )}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${onPriorityChange}
        >
          ${PRIORITY_OPTIONS.map(
            (p) =>
              html`<option value=${String(p)} ?selected=${p === priority_val}>
                P${p}
              </option>`
          )}
        </select>
      </div>
    `;
  }

  /**
   * @param {string} description
   */
  function descTemplate(description) {
    return html`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${editing_desc
          ? ''
          : html`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${startEditDesc}
            >
              ✎
            </button>`}
      </div>
      ${editing_desc
        ? html`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${desc_draft}
              @input=${onDescInput}
              @keydown=${(/** @type {KeyboardEvent} */ ev) =>
                onEditorKeydown(ev, saveDesc, cancelDesc, true)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${saveDesc}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${cancelDesc}
              >
                취소
              </button>
            </div>
          </div>`
        : html`<div class="detail-overlay__desc">
            ${description || '(설명 없음)'}
          </div>`}
    `;
  }

  /**
   * Read-only notes block (UI-yp64 §4). notes is where the gate receipt
   * lineage and REVISE findings live, so a parked bead's card click has to end
   * somewhere that actually shows them. Read-only on purpose: `bd`'s `--notes`
   * replaces rather than appends, so an editor here is an overwrite accident.
   * Absent/blank notes render nothing at all (fail-quiet).
   *
   * @param {any} data
   */
  function notesTemplate(data) {
    const notes = typeof data.notes === 'string' ? data.notes : '';
    if (notes.trim().length === 0) {
      return html``;
    }
    return html`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${notes}</div>
    `;
  }

  /**
   * @param {any} data
   */
  function labelsTemplate(data) {
    const labels = Array.isArray(data.labels) ? data.labels : [];
    return html`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${labels.map(
          (/** @type {string} */ label) =>
            html`<span class="detail-label-chip"
              >${label}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${label}
                aria-label=${'라벨 제거: ' + label}
                @click=${() => removeLabel(label)}
              >
                ×
              </button></span
            >`
        )}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${label_draft}
            @input=${onLabelInput}
            @keydown=${onLabelKeydown}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${addLabel}
          >
            추가
          </button>
        </span>
      </div>
    `;
  }

  function template() {
    if (!current_id) {
      return html``;
    }
    const data = current || {};
    const id = String(data.id || current_id);
    const title = data.title || '(제목 없음)';
    const total_usage = totalUsageForBead();
    const status = data.status || 'open';
    /** @type {number | ''} */
    const priority_val =
      typeof data.priority === 'number'
        ? Math.max(0, Math.min(4, data.priority))
        : '';
    const description = data.description || '';
    // 대기 배치 (§6.2·§6.3): 큐 스냅샷이 없으면(워커 큐를 구독하지 않는 화면)
    // 그리지 않고, 닫힌 bead에도 그리지 않는다 — 넣을 자리가 없는 처분이다.
    const queue_snapshot = queueStore ? queueStore.get() : null;
    const placement =
      queue_snapshot && status !== 'closed'
        ? candidatePlacement({ ...data, id }, queue_snapshot)
        : null;
    const place_lanes = queue_snapshot ? placeMenuLanes(queue_snapshot) : null;
    const effective = {
      ...data,
      metadata: { ...(data.metadata || {}), ...exec_local }
    };
    return html`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${() => onClose()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${onCopyId}
            >
              ${id}
            </button>
            ${placement
              ? html`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${id}
                  ?disabled=${!placement.placeable}
                  title=${placementTitle(placement)}
                  @click=${() => onPlaceClick(id, place_lanes)}
                >
                  ↴ 대기로
                </button>`
              : ''}
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${() => onClose()}
            >
              ✕
            </button>
          </div>
          ${placement && place_menu_open && place_lanes
            ? html`<div
                class="place-menu detail-overlay__place-menu"
                @click=${(/** @type {Event} */ event) =>
                  onPlaceLaneClick(event, id)}
              >
                ${placeMenuList(place_lanes, id)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${id}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${() => {
                    place_menu_open = false;
                    doRender();
                  }}
                >
                  ✕
                </button>
              </div>`
            : ''}
          ${titleTemplate(title, total_usage)}
          ${summaryHeaderTemplate(effective, {
            onChipToggle: (chip_key) =>
              chip_popover.toggle({ bead_id: id, chip_key }),
            isChipOpen: (chip_key) =>
              chip_popover.isOpen({ bead_id: id, chip_key })
          })}
          ${effectiveSettingsCardTemplate(
            {
              metadata: effective.metadata,
              workspace_values: execDefaults(),
              catalog: runnerCatalog(),
              execution_defaults: executionDefaults(),
              expanded: effective_expanded,
              presets: execPresetState()?.presets || [],
              preset_id: selected_preset_id,
              preset_busy: applying_preset,
              skipped_orchestration_keys
            },
            {
              onToggle: (open) => {
                effective_expanded = open;
                doRender();
              },
              onEdit: (key, value) => {
                if (
                  key === 'impl_runtime' ||
                  key === 'impl_model' ||
                  key === 'impl_effort'
                ) {
                  fireAndForgetExec(onImplTargetChange(key, value ?? ''));
                  return;
                }
                fireAndForgetExec(onExecChange(key, value ?? ''));
              },
              onPresetSelect: (id) => {
                selected_preset_id = id;
                skipped_orchestration_keys = [];
                doRender();
              },
              onPresetApply: () => void applyImplPreset()
            }
          )}
          ${execAccountsTemplate({
            md: effective.metadata,
            catalog: exec_account_catalog,
            workspace_defaults: workspace_accounts,
            handlers: {
              onExecChange: (
                /** @type {string} */ key,
                /** @type {string} */ value
              ) => fireAndForgetExec(onExecChange(key, value))
            }
          })}
          ${propsTemplate(status, priority_val)} ${timesTemplate(data)}
          ${descTemplate(description)}
          ${commentsTemplate(comments, comment_handlers, {
            expanded: comments_expanded,
            draft: comment_draft,
            sending: comment_sending,
            error: comments_error
          })}
          ${notesTemplate(data)} ${labelsTemplate(data)} ${depsTemplate(data)}
          ${workflowTemplate(data)} ${workflowMetaTemplate(data)}
          ${artifactsTemplate(data, artifact_handlers)}
          ${taskPromptTemplate(
            {
              expanded: prompt_expanded,
              loading: prompt_loading,
              error: prompt_error,
              data: prompt_data
            },
            { onToggle: toggleTaskPrompt }
          )}
          ${sessionHistoryTemplate(
            attemptsForBead(),
            session_handlers,
            { total: total_usage, expanded: usage_expanded },
            session_refs
          )}
          ${workerTimelineTemplate(
            { events: worker_timeline, shown: worker_timeline_shown },
            { onMore: revealMoreWorkerTimeline }
          )}
        </div>
      </div>
    `;
  }

  function doRender() {
    render(template(), mount_element);
  }

  return {
    /**
     * @param {string} id
     */
    load(id) {
      if (id !== current_id) {
        exec_local = {};
        place_menu_open = false;
        selected_preset_id = '';
        skipped_orchestration_keys = [];
        effective_expanded = false;
        resetEditors();
        resetComments();
        resetTaskPrompt();
        resetSessionRefs();
        resetWorkerTimeline();
        resetExecAccountCatalog();
      }
      current_id = id;
      current = null;
      if (!unsubscribe_candidates && options.subscribeCandidates) {
        unsubscribe_candidates = options.subscribeCandidates(() => {
          if (current_id) {
            doRender();
          }
        });
      }
      refreshFromStore();
      void loadSessionDefaults();
      if (exec_account_catalog_loaded_for !== id) {
        void loadExecAccountCatalog(id);
      }
    },
    clear() {
      current_id = null;
      current = null;
      exec_local = {};
      place_menu_open = false;
      selected_preset_id = '';
      applying_preset = false;
      skipped_orchestration_keys = [];
      effective_expanded = false;
      resetEditors();
      resetComments();
      resetTaskPrompt();
      resetSessionRefs();
      resetWorkerTimeline();
      resetExecAccountCatalog();
      releaseCandidates();
      md_viewer.close();
      transcript_drawer.close();
      render(html``, mount_element);
    },
    destroy() {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      if (unsubscribe_queue) {
        unsubscribe_queue();
        unsubscribe_queue = null;
      }
      if (unsubscribe_presets) {
        unsubscribe_presets();
        unsubscribe_presets = null;
      }
      releaseCandidates();
      document.removeEventListener('keydown', onKeydown);
      chip_popover.detach();
      if (!injected_md_viewer) {
        md_viewer.destroy();
        if (mv_mount && mv_mount.parentNode) {
          mv_mount.parentNode.removeChild(mv_mount);
        }
      }
      transcript_drawer.destroy();
      if (sl_mount.parentNode) {
        sl_mount.parentNode.removeChild(sl_mount);
      }
      current_id = null;
      current = null;
      resetExecAccountCatalog();
      selected_preset_id = '';
      applying_preset = false;
      skipped_orchestration_keys = [];
      resetComments();
      resetTaskPrompt();
      resetSessionRefs();
      resetWorkerTimeline();
      render(html``, mount_element);
    }
  };
}
