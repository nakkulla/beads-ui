import { html, render } from 'lit-html';
import { copyToClipboard } from '../../utils/clipboard.js';
import { resolveContinuationMismatch } from '../../utils/continuation-dialog.js';
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import { formatTimestampLocal } from '../../utils/relative-time.js';
import { requestResumeInstructions } from '../../utils/resume-instructions-dialog.js';
import { showToast } from '../../utils/toast.js';
import {
  providerUsageBadges,
  sumAttemptUsage
} from '../../utils/token-usage.js';
import { formatExecReceipt } from '../board/card.js';
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
 * @property {(id: string) => void} [onNavigate] - Navigate to a dependency id.
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

  function resetEditors() {
    editing_title = false;
    editing_desc = false;
    title_draft = '';
    desc_draft = '';
    label_draft = '';
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
   * Attempts recorded for the current bead, newest first (from the client
   * worker-queue store's `attempts` map).
   *
   * @returns {import('./session-history.js').SessionAttempt[]}
   */
  function attemptsForBead() {
    if (!queueStore || !current_id) {
      return [];
    }
    const q = queueStore.get();
    const attempts = q && q.attempts ? Object.values(q.attempts) : [];
    return /** @type {any[]} */ (attempts)
      .filter((a) => a && a.bead_id === current_id)
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
    if (!queueStore || !current_id) {
      return null;
    }
    const q = queueStore.get();
    return sumAttemptUsage((q && q.attempts) || {}, current_id);
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
   * Manually resume a failed/orphaned attempt (spec §1) under the queue
   * mutations' CAS discipline: send the current queue revision and retry ONCE
   * against the revision a conflict reply reports. The server validates (six
   * §1.2 refusals), dispatches, and pushes a fresh queue snapshot that surfaces
   * the new running attempt in the history list.
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
    /** @returns {number} */
    const revision = () => {
      const q = queueStore ? queueStore.get() : null;
      return q && typeof q.revision === 'number' ? q.revision : 0;
    };
    /**
     * @param {Record<string, unknown>} extra
     * @param {number} [expected_revision]
     */
    const send = async (extra = {}, expected_revision = revision()) =>
      /** @type {any} */ (
        await transport('worker-attempt-resume', {
          attempt_id,
          expected_revision,
          ...(instructions !== '' ? { instructions } : {}),
          ...extra
        })
      );
    /** @param {any} response */
    const adopt = (response) => {
      if (response?.queue && queueStore?.set) {
        queueStore.set(response.queue);
      }
    };
    let res = await send();
    adopt(res);
    if (res && res.conflict) {
      // The conflict reply carries the authoritative queue; retry once against
      // its revision (the push may not have landed in the store yet).
      const fresh =
        res.queue && typeof res.queue.revision === 'number'
          ? res.queue.revision
          : revision();
      res = await send({}, fresh);
      adopt(res);
    }
    res = await resolveContinuationMismatch(
      res,
      (continuation, decision_token) => send({ continuation, decision_token }),
      { onResult: adopt, refresh: () => send() }
    );
    if (res && res.resumed === false && !res.conflict && res.reason) {
      showToast(`이어하기 거부: ${res.reason}`, 'error', 2400);
    }
  }

  const session_handlers = {
    onOpen: openTranscript,
    onOpenDelegation: openDelegationTranscript,
    onResume: resumeAttempt,
    onToggleUsage: toggleUsageDetail
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
   * @param {string} key
   * @param {string} value
   */
  function onExecChange(key, value) {
    exec_local[key] = value;
    doRender();
    if (!transport || !current_id) {
      return;
    }
    // THREE-STATE (spec §E): an explicit choice is a literal write and only the
    // editor's `(기본)` — carried here as an empty value — deletes the key.
    void Promise.resolve(
      transport(
        'update-exec-settings',
        buildThreeStatePayload(
          current_id,
          key,
          value.length === 0 ? null : value
        )
      )
    ).catch(() => {
      showToast('실행 설정 변경 실패', 'error');
    });
  }

  /**
   * Save the three linked implementation controls as one optimistic group.
   * Runtime changes cannot leave a mismatched exact model or effort in the
   * local draft, so incompatible values reset to auto before the one mutation.
   *
   * @param {string} key
   * @param {string} value
   */
  function onImplTargetChange(key, value) {
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
    void Promise.resolve(
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
      .catch(() => {
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
      });
  }

  /**
   * Send an issue mutation and reconcile local state from the reply. A
   * successful reply is the fresh `bd show` issue object (has an `id`); the
   * production transport swallows rejections into `[]`, so anything that is not
   * an issue object is treated as failure. Returns whether it succeeded.
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @param {string} fail_message
   * @returns {Promise<boolean>}
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
    } catch {
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
      if (ok) {
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
      if (ok) {
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
      if (ok) {
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
   * Icon for a bd edge type. An unknown type renders the bare id rather than a
   * misleading glyph.
   *
   * @param {any} edge
   * @returns {string}
   */
  function edgeIcon(edge) {
    const type =
      edge && typeof edge === 'object'
        ? String(edge.dependency_type || edge.type || '')
        : '';
    switch (type) {
      case 'blocks':
        return '⛓';
      case 'discovered-from':
        return '↩';
      case 'parent-child':
        return '⌸';
      default:
        return '';
    }
  }

  /**
   * @param {any} data
   */
  function depsTemplate(data) {
    const raw = Array.isArray(data.dependencies) ? data.dependencies : [];
    const edges = raw
      .map((/** @type {any} */ edge) => ({
        id: edgeId(edge),
        icon: edgeIcon(edge)
      }))
      .filter((/** @type {{ id: string }} */ e) => e.id.length > 0);
    return html`
      <div class="detail-section-label">의존성</div>
      ${edges.length === 0
        ? html`<div class="detail-empty">의존성 없음</div>`
        : html`<div class="detail-deps">
            ${edges.map((/** @type {{ id: string, icon: string }} */ edge) =>
              onNavigate
                ? html`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${() => onNavigate(edge.id)}
                  >
                    ${edge.icon ? `${edge.icon} ` : ''}${edge.id}
                  </button>`
                : html`<span class="detail-dep"
                    >${edge.icon ? `${edge.icon} ` : ''}${edge.id}</span
                  >`
            )}
          </div>`}
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
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${() => onClose()}
            >
              ✕
            </button>
          </div>
          ${titleTemplate(title, total_usage)}
          ${summaryHeaderTemplate(effective)}
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
                  onImplTargetChange(key, value ?? '');
                  return;
                }
                onExecChange(key, value ?? '');
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
            handlers: { onExecChange }
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
          ${sessionHistoryTemplate(attemptsForBead(), session_handlers, {
            total: total_usage,
            expanded: usage_expanded
          })}
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
        selected_preset_id = '';
        skipped_orchestration_keys = [];
        effective_expanded = false;
        resetEditors();
        resetComments();
        resetTaskPrompt();
        resetExecAccountCatalog();
      }
      current_id = id;
      current = null;
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
      selected_preset_id = '';
      applying_preset = false;
      skipped_orchestration_keys = [];
      effective_expanded = false;
      resetEditors();
      resetComments();
      resetTaskPrompt();
      resetExecAccountCatalog();
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
      document.removeEventListener('keydown', onKeydown);
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
      render(html``, mount_element);
    }
  };
}
