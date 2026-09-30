/**
 * Boot of the unified shell (UI-dbn6 §5.1): read the display scope and the
 * connected workspace → `set-workspace` ONCE → `subscribe-monitor-pipeline`
 * (+ `subscribe-worker-queue` in the 레포 scope) → `subscribe-impl-presets` and
 * `subscribe-model-visibility` (server-global, reopened on reconnect) → the
 * first snapshot's lanes → render. There are no boot list subscriptions; an
 * open surface adds only its own (issue detail, closed/deferred lists, ADR).
 *
 * Detail, settings, transcript, document viewer, new issue, ADR and compare
 * are the existing components mounted as bridges with the same options until
 * Phases 2–3 replace them.
 *
 * @import { MessageType } from './protocol.js'
 */
import { html } from 'lit-html';
import { createHashRouter } from './core/router.js';
import {
  ALL_SCOPE,
  createStore,
  pruneSavedWorkspace,
  readSavedWorkspace,
  readScope,
  writeSavedWorkspace,
  writeScope
} from './core/state.js';
import { createWsClient } from './core/ws.js';
import { createDisplayPolicyStore } from './data/display-policy-store.js';
import { depCandidateModel } from './model/dep-candidates.js';
import { createExecPresetStore } from './model/exec-preset-store.js';
import { createModelVisibilityStore } from './model/model-visibility-store.js';
import { createMonitorPipelineStore } from './model/monitor-pipeline-store.js';
import { createSessionLogStore } from './model/session-log-store.js';
import { createSubscriptionIssueStores } from './model/subscription-issue-stores.js';
import { createSubscriptionStore } from './model/subscriptions-store.js';
import { createWorkerQueueStore } from './model/worker-queue-store.js';
import { createPipelineScreen } from './screens/pipeline/index.js';
import { nameOf } from './screens/pipeline/scope.js';
import { createShell } from './screens/pipeline/shell.js';
import { render } from './ui/render.js';
import { applyTheme, initialTheme, toggleTheme } from './ui/theme.js';
import { showToast } from './ui/toast.js';
import { viewportOf, watchViewport } from './ui/viewport.js';
import { createActivityIndicator } from './utils/activity-indicator.js';
import { debug } from './utils/logging.js';
import { ADR_SNAPSHOT_KEY, createAdrView } from './views/adr/index.js';
import { createCompareView } from './views/compare/index.js';
import { createDetailPanel } from './views/detail-panel/index.js';
import { createMdViewer } from './views/detail-panel/md-viewer.js';
import { createFatalErrorDialog } from './views/fatal-error-dialog.js';
import { createNewIssueDialog } from './views/new-issue-dialog.js';
import { createSettingsDialog } from './views/settings-dialog/index.js';
import { createUsageMeter } from './views/usage-meter.js';

/** Client id of the server-global monitor pipeline subscription. */
export const MONITOR_PIPELINE_KEY = 'tab:monitor:pipeline';
const WORKER_QUEUE_CLIENT_ID = 'worker:queue';
const EXEC_PRESETS_CLIENT_ID = 'exec:presets';
const MODEL_VISIBILITY_CLIENT_ID = 'model-visibility';
const CLOSED_CLIENT_ID = 'pipeline:closed';
const DEFERRED_CLIENT_ID = 'pipeline:deferred';

/**
 * Read the server-rendered bootstrap config.
 *
 * @returns {{ workspace_config: { default_workspace: string | null } }}
 */
export function readBootstrapConfig() {
  const bootstrap = /** @type {any} */ (window).__BDUI_BOOTSTRAP__;
  const default_workspace =
    typeof bootstrap?.workspace_config?.default_workspace === 'string' &&
    bootstrap.workspace_config.default_workspace.length > 0
      ? bootstrap.workspace_config.default_workspace
      : null;
  return { workspace_config: { default_workspace } };
}

/**
 * @param {{ setState: (patch: { config?: any }) => void }} store
 * @param {(message: string, details: unknown) => void} log_error
 * @returns {Promise<void>}
 */
export async function refreshConfigSnapshot(store, log_error) {
  try {
    const response = await fetch('/api/config');
    const config = await response.json();
    store.setState({ config });
  } catch (err) {
    log_error('config refresh failed', err);
  }
}

/**
 * A replace-only store for the ADR snapshot (no partial patches).
 *
 * @returns {{ get: () => ({ workspaces: any[] }|null), set: (value: { workspaces: any[] }) => void, subscribe: (fn: () => void) => () => void }}
 */
function createAdrStore() {
  /** @type {{ workspaces: any[] }|null} */
  let value = null;
  /** @type {Set<() => void>} */
  const listeners = new Set();
  return {
    get: () => value,
    set(next) {
      value = next;
      for (const fn of Array.from(listeners)) {
        try {
          fn();
        } catch {
          // a broken subscriber must not stop the others
        }
      }
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}

/**
 * Publish the header's measured height as `--app-header-h` for the bridged
 * overlays that position below it.
 *
 * @param {HTMLElement|null} header
 */
function trackHeaderHeight(header) {
  if (!header) {
    return;
  }
  const publish = () =>
    document.documentElement.style.setProperty(
      '--app-header-h',
      `${Math.round(header.getBoundingClientRect().height)}px`
    );
  publish();
  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(publish).observe(header);
  }
}

/**
 * Bootstrap the shell into `root_element`.
 *
 * @param {HTMLElement} root_element
 */
export function bootstrap(root_element) {
  const log = debug('main');
  const storage = /** @type {any} */ (window.localStorage);

  render(
    html`<div class="ui-app">
      <header class="ui-header" id="app-header"></header>
      <main class="ui-main">
        <section id="pipeline-root" class="route pipeline"></section>
        <section id="compare-root" class="route compare" hidden></section>
        <section id="adr-root" class="route adr" hidden></section>
      </main>
      <section id="detail-panel" class="route detail" hidden></section>
    </div>`,
    root_element
  );
  const header_el = /** @type {HTMLElement} */ (
    root_element.querySelector('#app-header')
  );
  const pipeline_root = /** @type {HTMLElement} */ (
    root_element.querySelector('#pipeline-root')
  );
  const compare_root = /** @type {HTMLElement} */ (
    root_element.querySelector('#compare-root')
  );
  const adr_root = /** @type {HTMLElement} */ (
    root_element.querySelector('#adr-root')
  );
  const detail_mount = /** @type {HTMLElement} */ (
    root_element.querySelector('#detail-panel')
  );

  const client = createWsClient();
  const store = createStore({
    config: readBootstrapConfig(),
    view: 'pipeline',
    scope: readScope(storage)
  });

  const monitor_store = createMonitorPipelineStore();
  const worker_queue_store = createWorkerQueueStore();
  const exec_preset_store = createExecPresetStore();
  const model_visibility_store = createModelVisibilityStore();
  const session_log_store = createSessionLogStore();
  const sub_issue_stores = createSubscriptionIssueStores();
  const display_policy_store = createDisplayPolicyStore();
  const adr_store = createAdrStore();
  const fatal_dialog = createFatalErrorDialog(root_element);

  let activity = createActivityIndicator(null);
  /**
   * @param {string} type
   * @param {unknown} payload
   * @returns {Promise<any>}
   */
  const tracked_send = (type, payload) =>
    activity.wrapSend((t, p) => client.send(t, p))(
      /** @type {MessageType} */ (type),
      payload
    );
  const subscriptions = createSubscriptionStore(
    /** @type {any} */ (
      (/** @type {string} */ type, /** @type {unknown} */ payload) =>
        tracked_send(type, payload)
    )
  );

  // Request types whose caller must see a rejection instead of `[]`.
  const PROPAGATED_ERROR_TYPES = new Set([
    'get-comments',
    'dep-add',
    'dep-remove',
    'impl-preset-create',
    'impl-preset-update',
    'impl-preset-delete',
    'apply-impl-preset',
    'apply-impl-preset-global',
    'get-session-defaults',
    'set-session-defaults',
    'set-worker-url-common'
  ]);
  /**
   * @param {string} type
   * @param {unknown} payload
   */
  const transport = async (type, payload) => {
    try {
      return await tracked_send(type, payload);
    } catch (err) {
      if (PROPAGATED_ERROR_TYPES.has(type)) {
        throw err;
      }
      return [];
    }
  };

  /**
   * @param {unknown} err
   * @param {string} context
   */
  function showFatal(err, context) {
    const any = /** @type {any} */ (err) || {};
    const message =
      typeof any.message === 'string' && any.message
        ? any.message
        : String(err || 'Request failed');
    fatal_dialog.open(
      context ? `Failed to load ${context}` : 'Request failed',
      message,
      typeof any.details === 'string' ? any.details : ''
    );
  }

  // --- push routing ---------------------------------------------------------

  let monitor_recovering = false;
  let queue_recovering = false;
  client.on('monitor-pipeline-snapshot', (payload) => {
    const p = /** @type {any} */ (payload);
    if (p && Array.isArray(p.workspaces)) {
      monitor_store.set(p.workspaces, p.workspaces_state, p.seq);
      monitor_recovering = false;
    }
  });
  client.on('monitor-pipeline-patch', (payload) => {
    const p = /** @type {any} */ (payload);
    if (!p || monitor_recovering) {
      return;
    }
    if (!monitor_store.applyPatch(p)) {
      log('monitor-pipeline patch sequence mismatch; resubscribing');
      if (monitor_sub) {
        monitor_sub = false;
        monitor_generation += 1;
        void tracked_send('unsubscribe-monitor-pipeline', {
          id: MONITOR_PIPELINE_KEY
        }).catch(() => {});
      }
      monitor_recovering = true;
      ensureMonitorPipeline();
    }
  });
  client.on('worker-queue-snapshot', (payload) => {
    const p = /** @type {any} */ (payload);
    const current = connectedPath();
    if (!p || !p.queue || (current && p.root_dir !== current)) {
      return;
    }
    worker_queue_store.setSnapshot(p);
    queue_recovering = false;
  });
  client.on('worker-queue-patch', (payload) => {
    const p = /** @type {any} */ (payload);
    const current = connectedPath();
    if (!p || queue_recovering || (current && p.root_dir !== current)) {
      return;
    }
    if (!worker_queue_store.applyPatch(p)) {
      log('worker-queue patch sequence mismatch; resubscribing');
      if (queue_sub) {
        queue_sub = false;
        queue_generation += 1;
        void tracked_send('unsubscribe-worker-queue', {
          id: WORKER_QUEUE_CLIENT_ID
        }).catch(() => {});
      }
      queue_recovering = true;
      syncSurfaces();
    }
  });
  client.on('impl-presets-snapshot', (payload) => {
    const p = /** @type {any} */ (payload);
    if (p && typeof p.revision === 'number' && Array.isArray(p.presets)) {
      exec_preset_store.set({
        revision: p.revision,
        presets: p.presets,
        chip_bindings: p.chip_bindings
      });
    }
  });
  client.on('model-visibility-snapshot', (payload) => {
    const p = /** @type {any} */ (payload);
    if (
      p &&
      typeof p.revision === 'number' &&
      Array.isArray(p.disabled_models) &&
      p.runners &&
      typeof p.runners === 'object'
    ) {
      model_visibility_store.set({
        revision: p.revision,
        disabled_models: p.disabled_models,
        runners: p.runners
      });
    }
  });
  client.on('adr-snapshot', (payload) => {
    const p = /** @type {any} */ (payload);
    if (p && Array.isArray(p.workspaces)) {
      adr_store.set({ workspaces: p.workspaces });
    }
  });
  client.on('session-log-snapshot', (payload) => {
    const p = /** @type {any} */ (payload);
    if (p && typeof p.id === 'string') {
      session_log_store.set(
        p.id,
        Array.isArray(p.lines) ? p.lines : [],
        typeof p.last_event_at === 'number' ? p.last_event_at : null
      );
    }
  });
  client.on('session-log-append', (payload) => {
    const p = /** @type {any} */ (payload);
    if (p && typeof p.id === 'string') {
      session_log_store.append(p.id, p.event);
    }
  });
  for (const type of ['snapshot', 'upsert', 'delete']) {
    client.on(/** @type {any} */ (type), (payload) => {
      const p = /** @type {any} */ (payload);
      const id = p && typeof p.id === 'string' ? p.id : '';
      const target = id ? sub_issue_stores.getStore(id) : null;
      if (target && p.type === type) {
        try {
          target.applyPush(p);
        } catch {
          // ignore
        }
      }
    });
  }

  // --- workspace -----------------------------------------------------------

  /** @returns {string|null} */
  function connectedPath() {
    return store.getState().workspace.current?.path || null;
  }

  /** @returns {Array<Record<string, any>>} */
  function visibleStates() {
    return monitor_store.getWorkspacesState();
  }

  /**
   * The repos the scope selector offers: the monitor's visible workspaces,
   * or — before its first snapshot — the registered ones not hidden.
   *
   * @returns {Array<{ root_dir: string, name: string, running?: number }>}
   */
  function scopeRepos() {
    const states = visibleStates();
    if (states.length > 0) {
      return states.map((row) => ({
        root_dir: row.root_dir,
        name: row.name || nameOf(row.root_dir),
        running: row.counts?.running
      }));
    }
    const { available, hidden } = store.getState().workspace;
    return available
      .filter((ws) => !hidden.includes(ws.path))
      .map((ws) => ({ root_dir: ws.path, name: nameOf(ws.path) }));
  }

  /**
   * The effective display scope: a repo that is not a visible workspace reads
   * as 전체 (the stored key is left alone).
   *
   * @returns {string}
   */
  function effectiveScope() {
    const scope = store.getState().scope;
    if (scope === ALL_SCOPE) {
      return ALL_SCOPE;
    }
    return scopeRepos().some((row) => row.root_dir === scope) ||
      scope === connectedPath()
      ? scope
      : ALL_SCOPE;
  }

  let boot_done = false;
  let switching = false;

  /**
   * `set-workspace` and, on `changed: true`, reopen the surfaces whose list
   * subscriptions the server released.
   *
   * @param {string} path
   * @returns {Promise<boolean>}
   */
  async function setWorkspace(path) {
    switching = true;
    try {
      const res = /** @type {any} */ (
        await client.send('set-workspace', { path })
      );
      if (
        res?.workspace?.root_dir !== path ||
        typeof res.workspace.db_path !== 'string'
      ) {
        return false;
      }
      store.setState({
        workspace: { current: { path, database: res.workspace.db_path } }
      });
      writeSavedWorkspace(storage, path);
      if (res.changed) {
        worker_queue_store.clear();
        queue_sub = false;
        resetDetail();
        closed_sub = null;
        deferred_sub = false;
        deferred_unsub = null;
        notifyLists();
      }
      return true;
    } catch (err) {
      log('workspace switch failed: %o', err);
      showToast('Failed to switch workspace', 'error', 3000);
      return false;
    } finally {
      switching = false;
      syncSurfaces();
    }
  }

  /**
   * @param {any} result
   */
  function applyWorkspaceList(result) {
    if (!result || !Array.isArray(result.workspaces)) {
      return;
    }
    const available = result.workspaces.map((/** @type {any} */ ws) => ({
      path: ws.path,
      database: ws.database,
      pid: ws.pid,
      version: ws.version
    }));
    store.setState({
      workspace: {
        available,
        hidden: Array.isArray(result.hidden)
          ? result.hidden.filter(
              (/** @type {unknown} */ p) => typeof p === 'string'
            )
          : [],
        ...(result.current && !connectedPath()
          ? {
              current: {
                path: result.current.root_dir,
                database: result.current.db_path
              }
            }
          : {})
      }
    });
  }

  /** @returns {Promise<void>} */
  async function loadWorkspaces() {
    try {
      applyWorkspaceList(await client.send('list-workspaces', {}));
    } catch (err) {
      log('failed to load workspaces: %o', err);
    }
  }

  // --- subscriptions --------------------------------------------------------

  let monitor_sub = false;
  let monitor_generation = 0;
  let presets_sub = false;
  let visibility_sub = false;
  let queue_sub = false;
  let queue_generation = 0;
  let adr_sub = false;
  /** @type {null|{ since: number|undefined, unsub: () => Promise<void> }} */
  let closed_sub = null;
  let deferred_sub = false;
  /** @type {(() => Promise<void>)|null} */
  let deferred_unsub = null;
  /** @type {{ closed: boolean, closed_since: number|null|undefined, deferred: boolean }} */
  let list_wants = { closed: false, closed_since: null, deferred: false };
  /** @type {Set<() => void>} */
  const list_listeners = new Set();
  let settings_open = false;

  function notifyLists() {
    for (const fn of Array.from(list_listeners)) {
      try {
        fn();
      } catch {
        // ignore
      }
    }
  }

  function ensureMonitorPipeline() {
    if (monitor_sub) {
      return;
    }
    monitor_sub = true;
    const recovering = monitor_recovering;
    const generation = (monitor_generation += 1);
    void tracked_send('subscribe-monitor-pipeline', {
      id: MONITOR_PIPELINE_KEY
    }).catch((err) => {
      log('subscribe-monitor-pipeline failed: %o', err);
      if (generation === monitor_generation) {
        monitor_sub = false;
        if (recovering) {
          showFatal(err, 'pipeline');
        }
      }
    });
  }

  function ensureGlobalChannels() {
    if (!presets_sub) {
      presets_sub = true;
      void tracked_send('subscribe-impl-presets', {
        id: EXEC_PRESETS_CLIENT_ID
      }).catch(() => {
        presets_sub = false;
      });
    }
    if (!visibility_sub) {
      visibility_sub = true;
      void tracked_send('subscribe-model-visibility', {
        id: MODEL_VISIBILITY_CLIENT_ID
      }).catch(() => {
        model_visibility_store.clear();
        visibility_sub = false;
      });
    }
  }

  /** @param {boolean} wanted */
  function setWorkerQueue(wanted) {
    if (wanted && !queue_sub) {
      queue_sub = true;
      const recovering = queue_recovering;
      const generation = (queue_generation += 1);
      void tracked_send('subscribe-worker-queue', {
        id: WORKER_QUEUE_CLIENT_ID
      }).catch((err) => {
        log('subscribe-worker-queue failed: %o', err);
        if (generation === queue_generation) {
          queue_sub = false;
          if (recovering) {
            showFatal(err, 'worker');
          }
        }
      });
    } else if (!wanted && queue_sub) {
      queue_sub = false;
      queue_recovering = false;
      queue_generation += 1;
      void tracked_send('unsubscribe-worker-queue', {
        id: WORKER_QUEUE_CLIENT_ID
      }).catch(() => {});
      worker_queue_store.clear();
    }
  }

  /** @param {boolean} wanted */
  function setAdr(wanted) {
    if (wanted && !adr_sub) {
      adr_sub = true;
      void tracked_send('subscribe-adr', { id: ADR_SNAPSHOT_KEY }).catch(() => {
        adr_sub = false;
      });
    } else if (!wanted && adr_sub) {
      adr_sub = false;
      void tracked_send('unsubscribe-adr', { id: ADR_SNAPSHOT_KEY }).catch(
        () => {}
      );
    }
  }

  /**
   * @param {string} client_id
   * @param {{ type: string, params?: Record<string, string|number|boolean> }} spec
   * @returns {Promise<(() => Promise<void>)|null>}
   */
  async function openList(client_id, spec) {
    try {
      sub_issue_stores.register(client_id, spec);
      const unsub = await subscriptions.subscribeList(client_id, spec);
      notifyLists();
      return unsub;
    } catch (err) {
      log('subscribe %s failed: %o', client_id, err);
      return null;
    }
  }

  /**
   * @param {string} client_id
   * @param {(() => Promise<void>)|null} unsub
   */
  function closeList(client_id, unsub) {
    if (unsub) {
      void unsub().catch(() => {});
    }
    try {
      sub_issue_stores.unregister(client_id);
    } catch {
      // ignore
    }
    notifyLists();
  }

  async function syncLists() {
    const scope = effectiveScope();
    const repo = scope !== ALL_SCOPE && scope === connectedPath();
    const closed_since = list_wants.closed_since ?? undefined;
    const want_closed = repo && list_wants.closed;
    if (closed_sub && (!want_closed || closed_sub.since !== closed_since)) {
      const current = closed_sub;
      closed_sub = null;
      closeList(CLOSED_CLIENT_ID, current.unsub);
    }
    if (want_closed && !closed_sub) {
      const marker = { since: closed_since, unsub: async () => {} };
      closed_sub = marker;
      const spec =
        closed_since === undefined
          ? { type: 'closed-issues' }
          : { type: 'closed-issues', params: { since: closed_since } };
      const unsub = await openList(CLOSED_CLIENT_ID, spec);
      if (closed_sub === marker && unsub) {
        marker.unsub = unsub;
      } else if (unsub) {
        void unsub().catch(() => {});
      }
    }
    const want_deferred = repo && list_wants.deferred;
    if (deferred_sub && !want_deferred) {
      deferred_sub = false;
      closeList(DEFERRED_CLIENT_ID, deferred_unsub);
      deferred_unsub = null;
    }
    if (want_deferred && !deferred_sub) {
      deferred_sub = true;
      const unsub = await openList(DEFERRED_CLIENT_ID, {
        type: 'deferred-issues'
      });
      if (deferred_sub) {
        deferred_unsub = unsub;
      } else if (unsub) {
        void unsub().catch(() => {});
      }
    }
  }

  // List pushes land in `sub_issue_stores`; the pipeline re-reads them.
  for (const type of ['snapshot', 'upsert', 'delete']) {
    client.on(/** @type {any} */ (type), (payload) => {
      const p = /** @type {any} */ (payload);
      if (p && (p.id === CLOSED_CLIENT_ID || p.id === DEFERRED_CLIENT_ID)) {
        notifyLists();
      }
    });
  }

  function syncSurfaces() {
    if (!boot_done || switching) {
      return;
    }
    const state = store.getState();
    const scope = effectiveScope();
    const repo = scope !== ALL_SCOPE && scope === connectedPath();
    setWorkerQueue(repo || Boolean(state.selected_id) || settings_open);
    setAdr(state.view === 'adr');
    if (state.selected_id) {
      scheduleDetail(state.selected_id);
    }
    void syncLists();
  }

  // --- detail subscription ----------------------------------------------------

  /** @type {null|(() => Promise<void>)} */
  let detail_unsub = null;
  /** @type {string|null} */
  let detail_key = null;

  function resetDetail() {
    if (detail_unsub) {
      void detail_unsub().catch(() => {});
      detail_unsub = null;
    }
    const id = store.getState().selected_id;
    if (id) {
      try {
        sub_issue_stores.unregister(`detail:${id}`);
      } catch {
        // ignore
      }
    }
    detail_key = null;
  }

  /** @param {string} id */
  function scheduleDetail(id) {
    const key = `${connectedPath() || ''}\u0000${id}`;
    if (key === detail_key) {
      return;
    }
    detail_key = key;
    const client_id = `detail:${id}`;
    const spec = { type: 'issue-detail', params: { id } };
    try {
      sub_issue_stores.register(client_id, spec);
    } catch (err) {
      log('register detail store failed: %o', err);
    }
    void subscriptions
      .subscribeList(client_id, spec)
      .then(async (unsub) => {
        if (detail_key !== key || store.getState().selected_id !== id) {
          await unsub().catch(() => {});
          return;
        }
        if (detail_unsub) {
          await detail_unsub().catch(() => {});
        }
        detail_unsub = unsub;
      })
      .catch((err) => {
        log('detail subscribe failed: %o', err);
        if (detail_key === key) {
          detail_key = null;
        }
        showFatal(err, 'issue details');
      });
  }

  // --- navigation -------------------------------------------------------------

  const router = createHashRouter(store, {
    onScopeIntent: (intent) => {
      if (intent === 'all') {
        void setScope(ALL_SCOPE);
        return;
      }
      const saved = readSavedWorkspace(storage);
      if (saved) {
        void setScope(saved);
      }
    }
  });

  /** @type {ReturnType<typeof createPipelineScreen>|null} */
  let screen = null;

  /**
   * Narrow or widen the display scope; a repo scope connects to that repo.
   *
   * @param {string} scope
   */
  async function setScope(scope) {
    writeScope(storage, scope);
    store.setState({ scope });
    if (scope !== ALL_SCOPE && boot_done && scope !== connectedPath()) {
      await setWorkspace(scope);
    }
    syncSurfaces();
    screen?.refresh();
    shell.render();
  }

  /**
   * Open an issue; another repo's card connects to it first.
   *
   * @param {string} id
   * @param {string} root_dir
   */
  async function openIssue(id, root_dir) {
    if (!id) {
      return;
    }
    const target = root_dir || connectedPath() || '';
    if (target && target !== connectedPath()) {
      const ok = await setWorkspace(target);
      if (!ok) {
        showToast('레포 전환에 실패했습니다', 'error', 2400);
        return;
      }
    }
    router.gotoIssue(id, target || null);
  }

  // --- shell ------------------------------------------------------------------

  let viewport = viewportOf();

  /**
   * @param {string} root_dir
   * @returns {Promise<void>}
   */
  async function gitPull(root_dir) {
    try {
      const result = /** @type {any} */ (
        await client.send('git-pull-workspace', {})
      );
      const status = result?.status;
      if (status === 'up_to_date') {
        showToast('Already up to date', 'success', 2000);
      } else if (status === 'stash_pop_conflict') {
        showToast(
          'Git pulled, but stash pop conflicted (check git stash list)',
          'warning',
          4000
        );
      } else {
        showToast(`Git pulled ${nameOf(root_dir)}`, 'success', 2000);
      }
    } catch (err) {
      const code = /** @type {any} */ (err)?.code;
      const detail = /** @type {any} */ (err)?.message;
      if (code === 'rebase_conflict') {
        showToast(
          'Git pull conflicts — reverted (manual resolve required)',
          'error',
          4000
        );
      } else if (code === 'rebase_conflict_abort_failed') {
        showToast(
          "Git pull conflicts AND rebase --abort failed — repo left mid-rebase, run 'git rebase --abort' manually",
          'error',
          6000
        );
      } else if (code === 'busy') {
        showToast(
          'Git pull skipped: another operation is running',
          'warning',
          3000
        );
      } else {
        showToast(
          `Git pull failed${detail ? `: ${detail}` : ''}`,
          'error',
          3000
        );
      }
    }
  }

  const shell = createShell(header_el, {
    scopeView: () => ({
      scope: effectiveScope(),
      repos: scopeRepos(),
      available: store.getState().workspace.available,
      hidden: store.getState().workspace.hidden,
      connected: connectedPath(),
      screen: store.getState().view
    }),
    narrow: () => viewport.size === 'narrow',
    onScope: (scope) => {
      void setScope(scope);
    },
    onScreen: (next) => {
      router.gotoScreen(/** @type {any} */ (next));
    },
    onTheme: () => {
      toggleTheme(document, storage);
    },
    onSettings: () => {
      const scope = effectiveScope();
      if (scope === ALL_SCOPE) {
        settings_dialog.open(undefined, { scope: 'monitor' });
      } else {
        settings_dialog.open(undefined, { scope: 'repo', root_dir: scope });
      }
    },
    onNewIssue: () => new_issue_dialog.open(),
    onGitPull: (root_dir) => gitPull(root_dir),
    onVisibility: (path, visible) => {
      void client
        .send('set-workspace-visibility', { path, visible })
        .then(() => loadWorkspaces())
        .then(() => shell.render())
        .catch(() =>
          showToast('Failed to update project visibility', 'error', 3000)
        );
    }
  });
  activity = createActivityIndicator(shell.loadingElement());
  const usage_el = shell.usageElement();
  if (usage_el) {
    createUsageMeter(usage_el);
  }
  trackHeaderHeight(header_el);
  watchViewport((next) => {
    viewport = next;
    shell.render();
  });

  // --- bridges ----------------------------------------------------------------

  const md_mount = document.createElement('div');
  md_mount.className = 'md-viewer-root';
  document.body.appendChild(md_mount);
  const md_viewer = createMdViewer(md_mount, {
    getWorkspacePath: () => connectedPath() || undefined
  });
  /**
   * @param {{ path: string, missing_state?: any }} doc
   * @param {string} [root_dir]
   */
  function openDoc(doc, root_dir) {
    void md_viewer.open(doc.path, {
      missing_state: doc.missing_state,
      ...(root_dir ? { workspace: root_dir } : {})
    });
  }

  const new_issue_dialog = createNewIssueDialog(root_element, (type, payload) =>
    tracked_send(type, payload)
  );

  const settings_dialog = createSettingsDialog(root_element, {
    policyStore: display_policy_store,
    queueStore: worker_queue_store,
    implPresetStore: exec_preset_store,
    modelVisibilityStore: model_visibility_store,
    transport: (type, payload) => tracked_send(type, payload),
    monitorRows: () => monitor_store.getWorkspacesState(),
    subscribeMonitorRows: (fn) => monitor_store.subscribe(fn),
    onOpenChange: (open) => {
      settings_open = open;
      syncSurfaces();
    },
    labelOptions: () => {
      /** @type {Set<string>} */
      const seen = new Set();
      for (const row of monitor_store.get() || []) {
        for (const entry of Array.isArray(row.runnable) ? row.runnable : []) {
          for (const label of Array.isArray(entry.labels) ? entry.labels : []) {
            if (typeof label === 'string' && label) {
              seen.add(label);
            }
          }
        }
      }
      return [...seen].sort();
    }
  });

  const compare_view = createCompareView(compare_root, {
    transport,
    gotoIssue: (id) => void openIssue(id, ''),
    execPresetStore: exec_preset_store,
    sourceCandidates: () => []
  });
  createAdrView(adr_root, {
    adrStore: adr_store,
    gotoIssue: (id) => void openIssue(id, ''),
    getWorkspacePath: () => connectedPath() || undefined,
    subscribeWorkspace: (fn) => store.subscribe(() => fn()),
    switchWorkspace: (root_dir) => setWorkspace(root_dir),
    openDoc
  });

  const detail_panel = createDetailPanel(detail_mount, {
    issueStores: sub_issue_stores,
    transport,
    queueStore: worker_queue_store,
    pipelineStore: monitor_store,
    execPresetStore: exec_preset_store,
    modelVisibilityStore: model_visibility_store,
    sessionLogStore: session_log_store,
    getWorkspacePath: () => connectedPath() || undefined,
    mdViewer: md_viewer,
    depCandidates: () => {
      const workspaces = monitor_store.get();
      if (workspaces === null) {
        return null;
      }
      const scope = effectiveScope();
      return scope === ALL_SCOPE
        ? depCandidateModel(workspaces, monitor_store.getWorkspacesState())
        : depCandidateModel(workspaces, monitor_store.getWorkspacesState(), {
            root_dir: scope
          });
    },
    subscribeCandidates: (fn) => monitor_store.subscribe(fn),
    onNavigate: (id, root_dir) => void openIssue(id, root_dir || ''),
    onClose: () => router.closeIssue(),
    onOpenExecPresets: () => settings_dialog.open('execution')
  });

  // --- pipeline ----------------------------------------------------------------

  screen = createPipelineScreen(pipeline_root, {
    monitorStore: monitor_store,
    queueStore: worker_queue_store,
    presetStore: exec_preset_store,
    modelVisibilityStore: model_visibility_store,
    sessionLogStore: session_log_store,
    lists: {
      closed: () =>
        /** @type {any[]} */ (
          sub_issue_stores.snapshotFor(CLOSED_CLIENT_ID) || []
        ),
      deferred: () =>
        /** @type {any[]} */ (
          sub_issue_stores.snapshotFor(DEFERRED_CLIENT_ID) || []
        ),
      subscribe: (fn) => {
        list_listeners.add(fn);
        return () => list_listeners.delete(fn);
      }
    },
    getScope: effectiveScope,
    setScope: (scope) => void setScope(scope),
    getConnected: connectedPath,
    send: (type, payload) => tracked_send(type, payload),
    openIssue: (id, root_dir) => void openIssue(id, root_dir),
    openSettings: (options) => {
      if (options.scope === 'monitor') {
        settings_dialog.open(undefined, { scope: 'monitor' });
      } else if (options.root_dir) {
        settings_dialog.open(undefined, {
          scope: 'repo',
          root_dir: options.root_dir
        });
      }
    },
    setListWants: (wants) => {
      list_wants = wants;
      void syncLists();
    }
  });
  monitor_store.subscribe(() => shell.render());

  // --- route ----------------------------------------------------------------------

  let last_view = '';
  store.subscribe((state) => {
    pipeline_root.hidden = state.view !== 'pipeline';
    compare_root.hidden = state.view !== 'compare';
    adr_root.hidden = state.view !== 'adr';
    if (state.view !== last_view) {
      last_view = state.view;
      if (state.view === 'compare') {
        compare_view.load();
      } else {
        compare_view.pause();
      }
      shell.render();
    }
    if (state.selected_id) {
      detail_mount.hidden = false;
      detail_panel.load(state.selected_id);
    } else if (!detail_mount.hidden) {
      detail_mount.hidden = true;
      detail_panel.clear();
      resetDetail();
    }
    syncSurfaces();
  });
  router.start();

  // --- reconnect -------------------------------------------------------------------

  let had_disconnect = false;
  client.onConnection?.((s) => {
    if (s === 'reconnecting' || s === 'closed') {
      had_disconnect = true;
      showToast('Connection lost. Reconnecting…', 'error', 4000);
    } else if (s === 'open' && had_disconnect) {
      had_disconnect = false;
      showToast('Reconnected', 'success', 2200);
      void refreshConfigSnapshot(store, (message, err) =>
        log(`${message}: %o`, err)
      );
      void resubscribe();
    }
  });

  async function resubscribe() {
    monitor_sub = false;
    presets_sub = false;
    visibility_sub = false;
    queue_sub = false;
    adr_sub = false;
    closed_sub = null;
    deferred_sub = false;
    deferred_unsub = null;
    detail_key = null;
    detail_unsub = null;
    exec_preset_store.clear();
    const target = connectedPath();
    if (target) {
      try {
        await client.send('set-workspace', { path: target });
      } catch (err) {
        log('workspace restore after reconnect failed: %o', err);
        return;
      }
    }
    ensureMonitorPipeline();
    ensureGlobalChannels();
    syncSurfaces();
  }

  client.on('workspace-changed', (payload) => {
    const p = /** @type {any} */ (payload);
    if (p && p.root_dir) {
      store.setState({
        workspace: { current: { path: p.root_dir, database: p.db_path } }
      });
      worker_queue_store.clear();
      queue_sub = false;
      resetDetail();
      void loadWorkspaces();
      syncSurfaces();
    }
  });

  // --- boot ---------------------------------------------------------------------------

  async function boot() {
    await loadWorkspaces();
    const state = store.getState();
    const available = state.workspace.available.map((ws) => ws.path);
    const hidden = state.workspace.hidden;
    const saved = pruneSavedWorkspace(storage, available, hidden);
    /** @param {string|null|undefined} path */
    const usable = (path) =>
      typeof path === 'string' &&
      available.includes(path) &&
      !hidden.includes(path);
    const default_workspace = state.config.workspace_config.default_workspace;
    const target =
      (usable(state.detail_root) && state.detail_root) ||
      (state.scope !== ALL_SCOPE && usable(state.scope) && state.scope) ||
      saved ||
      (usable(default_workspace) && default_workspace) ||
      null;
    // The connection already points at the workspace `list-workspaces`
    // reported; only a different target costs the one `set-workspace`.
    if (target && target !== connectedPath()) {
      await setWorkspace(target);
    }
    boot_done = true;
    ensureMonitorPipeline();
    ensureGlobalChannels();
    syncSurfaces();
    // The effective scope may only now resolve (the workspace list arrived):
    // redraw so the screen states the list surfaces it wants.
    screen?.refresh();
    shell.render();
  }
  void boot();

  window.addEventListener('keydown', (ev) => {
    const is_modifier = ev.ctrlKey || ev.metaKey;
    const key = String(ev.key || '').toLowerCase();
    const target = /** @type {HTMLElement} */ (ev.target);
    const tag =
      target && target.tagName ? String(target.tagName).toLowerCase() : '';
    const editable =
      tag === 'input' ||
      tag === 'textarea' ||
      tag === 'select' ||
      (target && target.isContentEditable === true);
    if (is_modifier && key === 'n' && !editable) {
      ev.preventDefault();
      new_issue_dialog.open();
    }
  });

  return { store, router, screen };
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    applyTheme(
      initialTheme(window.localStorage, (query) => window.matchMedia(query)),
      document
    );
    const app_root = document.getElementById('app');
    if (app_root) {
      bootstrap(app_root);
    }
  });
}
