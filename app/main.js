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
import { createChannels } from './core/channels.js';
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
import { createAdrStore } from './model/adr-store.js';
import { createExecPresetStore } from './model/exec-preset-store.js';
import { createModelVisibilityStore } from './model/model-visibility-store.js';
import { createMonitorPipelineStore } from './model/monitor-pipeline-store.js';
import { createSessionLogStore } from './model/session-log-store.js';
import { createSubscriptionIssueStores } from './model/subscription-issue-stores.js';
import { createSubscriptionStore } from './model/subscriptions-store.js';
import { createWorkerQueueStore } from './model/worker-queue-store.js';
import { mountBridges } from './screens/bridges.js';
import { runGitPull } from './screens/pipeline/git-pull.js';
import { createPipelineScreen } from './screens/pipeline/index.js';
import { nameOf } from './screens/pipeline/scope.js';
import { createShell } from './screens/pipeline/shell.js';
import { render } from './ui/render.js';
import { applyTheme, initialTheme, toggleTheme } from './ui/theme.js';
import { showToast } from './ui/toast.js';
import { viewportOf, watchViewport } from './ui/viewport.js';
import { createActivityIndicator } from './utils/activity-indicator.js';
import { debug } from './utils/logging.js';
import { createFatalErrorDialog } from './views/fatal-error-dialog.js';
import { createUsageMeter } from './views/usage-meter.js';

export { MONITOR_PIPELINE_KEY } from './core/channels.js';

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

  let settings_open = false;
  const channels = createChannels({
    client,
    send: tracked_send,
    subscriptions,
    stores: {
      monitor: monitor_store,
      queue: worker_queue_store,
      presets: exec_preset_store,
      visibility: model_visibility_store,
      sessionLog: session_log_store,
      issues: sub_issue_stores,
      adr: adr_store
    },
    connectedPath: () => connectedPath(),
    selectedId: () => store.getState().selected_id,
    wants: () => {
      const state = store.getState();
      const scope = effectiveScope();
      const repo = scope !== ALL_SCOPE && scope === connectedPath();
      return {
        enabled: boot_done && switches_in_flight === 0,
        repo,
        queue: repo || Boolean(state.selected_id) || settings_open,
        adr: state.view === 'adr',
        detail_id: state.selected_id
      };
    },
    showFatal,
    log
  });

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
  /** Sequence of the latest `set-workspace` request; older replies are stale. */
  let switch_seq = 0;
  /** `set-workspace` requests still in flight. */
  let switches_in_flight = 0;

  /**
   * `set-workspace` and, on `changed: true`, reopen the surfaces whose list
   * subscriptions the server released. Only the LATEST request's reply is
   * applied: the server processes requests in order, so an older reply that
   * lands after a newer one would name a workspace the connection has left.
   *
   * @param {string} path
   * @returns {Promise<'ok'|'failed'|'stale'>}
   */
  async function setWorkspace(path) {
    const seq = (switch_seq += 1);
    switches_in_flight += 1;
    try {
      const res = /** @type {any} */ (
        await client.send('set-workspace', { path })
      );
      if (seq !== switch_seq) {
        return 'stale';
      }
      if (
        res?.workspace?.root_dir !== path ||
        typeof res.workspace.db_path !== 'string'
      ) {
        showToast('Failed to switch workspace', 'error', 3000);
        return 'failed';
      }
      store.setState({
        workspace: { current: { path, database: res.workspace.db_path } }
      });
      writeSavedWorkspace(storage, path);
      if (res.changed) {
        channels.releaseWorkspace();
      }
      return 'ok';
    } catch (err) {
      if (seq !== switch_seq) {
        return 'stale';
      }
      log('workspace switch failed: %o', err);
      showToast('Failed to switch workspace', 'error', 3000);
      return 'failed';
    } finally {
      switches_in_flight -= 1;
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

  function syncSurfaces() {
    channels.sync();
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
  /** Sequence of the latest scope choice; a failed switch of an older one
   * must not undo it. */
  let scope_intent = 0;

  /**
   * Narrow or widen the display scope; a repo scope connects to that repo.
   *
   * @param {string} scope
   */
  async function setScope(scope) {
    const previous = store.getState().scope;
    const intent = (scope_intent += 1);
    writeScope(storage, scope);
    store.setState({ scope });
    // A switch still in flight may land after this one on the server, so a
    // repo scope re-sends even when the connection names it already.
    if (
      scope !== ALL_SCOPE &&
      boot_done &&
      (scope !== connectedPath() || switches_in_flight > 0)
    ) {
      const result = await setWorkspace(scope);
      // A repo scope stands only on a connected repo: a failed switch puts
      // back the scope it replaced, unless a newer choice already did.
      if (result === 'failed' && intent === scope_intent) {
        writeScope(storage, previous);
        store.setState({ scope: previous });
      }
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
      // `setWorkspace` toasts its own failure; a stale reply means a newer
      // switch owns the connection now.
      if ((await setWorkspace(target)) !== 'ok') {
        return;
      }
    }
    router.gotoIssue(id, target || null);
  }

  // --- shell ------------------------------------------------------------------

  let viewport = viewportOf();

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
    onGitPull: (root_dir) =>
      runGitPull(
        (type, payload) =>
          client.send(/** @type {MessageType} */ (type), payload),
        root_dir
      ),
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

  const { new_issue_dialog, settings_dialog, compare_view, detail_panel } =
    mountBridges({
      root: root_element,
      compare_root,
      adr_root,
      detail_mount,
      send: tracked_send,
      transport,
      stores: {
        monitor: monitor_store,
        queue: worker_queue_store,
        presets: exec_preset_store,
        visibility: model_visibility_store,
        sessionLog: session_log_store,
        issues: sub_issue_stores,
        displayPolicy: display_policy_store,
        adr: adr_store
      },
      connectedPath,
      effectiveScope,
      openIssue: (id, root_dir) => void openIssue(id, root_dir),
      switchWorkspace: async (root_dir) =>
        (await setWorkspace(root_dir)) === 'ok',
      closeIssue: () => router.closeIssue(),
      subscribeWorkspace: (fn) => store.subscribe(() => fn()),
      onSettingsOpenChange: (open) => {
        settings_open = open;
        syncSurfaces();
      }
    });

  // --- pipeline ----------------------------------------------------------------

  screen = createPipelineScreen(pipeline_root, {
    monitorStore: monitor_store,
    queueStore: worker_queue_store,
    presetStore: exec_preset_store,
    modelVisibilityStore: model_visibility_store,
    sessionLogStore: session_log_store,
    lists: channels.lists,
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
    setListWants: (wants) => channels.setListWants(wants)
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
      channels.resetDetail();
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
    channels.forgetAll();
    const target = connectedPath();
    if (target) {
      try {
        await client.send('set-workspace', { path: target });
      } catch (err) {
        log('workspace restore after reconnect failed: %o', err);
        return;
      }
    }
    channels.openGlobal();
    syncSurfaces();
  }

  // The server moved this connection to another workspace: the 레포 scope
  // follows it (it stands only on the connected repo), and the list surfaces
  // the old workspace held are reopened for the new one.
  client.on('workspace-changed', (payload) => {
    const p = /** @type {any} */ (payload);
    if (p && p.root_dir) {
      store.setState({
        workspace: { current: { path: p.root_dir, database: p.db_path } }
      });
      channels.releaseWorkspace();
      if (store.getState().scope !== ALL_SCOPE) {
        writeScope(storage, p.root_dir);
        store.setState({ scope: p.root_dir });
      }
      void loadWorkspaces().then(() => shell.render());
      syncSurfaces();
      screen?.refresh();
      shell.render();
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
    if (
      target &&
      target !== connectedPath() &&
      (await setWorkspace(target)) === 'failed' &&
      store.getState().scope === target
    ) {
      // The stored repo scope could not be connected: show 전체 instead.
      writeScope(storage, ALL_SCOPE);
      store.setState({ scope: ALL_SCOPE });
    }
    boot_done = true;
    channels.openGlobal();
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
