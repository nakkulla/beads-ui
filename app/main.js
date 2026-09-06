/**
 * @import { MessageType } from './protocol.js'
 */
import { html, render } from 'lit-html';
import {
  DEFAULT_CLOSED_RANGE,
  closedRangeSince,
  isClosedRange,
  normalizeDoneRange
} from './data/closed-range.js';
import { createDisplayPolicyStore } from './data/display-policy-store.js';
import { createExecPresetStore } from './data/exec-preset-store.js';
import { createMonitorPipelineStore } from './data/monitor-pipeline-store.js';
import { createSessionLogStore } from './data/session-log-store.js';
import { createSubscriptionIssueStores } from './data/subscription-issue-stores.js';
import { createSubscriptionStore } from './data/subscriptions-store.js';
import { createUiOrderStore } from './data/ui-order-store.js';
import { createWorkerQueueStore } from './data/worker-queue-store.js';
import { createHashRouter } from './router.js';
import { createStore } from './state.js';
import { createActivityIndicator } from './utils/activity-indicator.js';
import { debug } from './utils/logging.js';
import { showToast } from './utils/toast.js';
import { ADR_SNAPSHOT_KEY, createAdrView } from './views/adr/index.js';
import { createBoardView } from './views/board/index.js';
import { createCompareView } from './views/compare/index.js';
import { createDetailPanel } from './views/detail-panel/index.js';
import { createMdViewer } from './views/detail-panel/md-viewer.js';
import { createFatalErrorDialog } from './views/fatal-error-dialog.js';
import { depCandidateModel } from './views/monitor/dep-candidates.js';
import {
  MONITOR_PIPELINE_KEY,
  createMonitorView
} from './views/monitor/index.js';
import { createTopNav } from './views/nav.js';
import { createNewIssueDialog } from './views/new-issue-dialog.js';
import { createSettingsDialog } from './views/settings-dialog/index.js';
import { createUsageMeter } from './views/usage-meter.js';
import { createWorkerView } from './views/worker.js';
import { createWorkspacePicker } from './views/workspace-picker.js';
import { createWsClient } from './ws.js';

/**
 * Read the server-rendered bootstrap config. Label visibility is NOT part of
 * it — that policy is per-workspace and arrives over the `display-policy`
 * subscription instead.
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

  return {
    workspace_config: {
      default_workspace
    }
  };
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
 * Board subscription keys and their bd list-adapter types. The board composes
 * its 5 columns from these push-only stores (Blocked comes from the server
 * `blocked-issues` adapter; the Blocked column itself is not a status target).
 *
 * @type {ReadonlyArray<[string, string]>}
 */
const BOARD_SUBS = [
  ['tab:board:ready', 'ready-issues'],
  ['tab:board:blocked', 'blocked-issues'],
  ['tab:board:in-progress', 'in-progress-issues'],
  ['tab:board:resolved', 'resolved-issues'],
  ['tab:board:deferred', 'deferred-issues'],
  ['tab:board:closed', 'closed-issues']
];

/**
 * Worker candidate subscription keys (spec §5.1): the Worker console's candidate
 * lane is live Board Ready/Blocked data. These reuse the same list adapters as
 * the Board but under Worker-scoped client ids so the Worker tab keeps its
 * candidate stores independent of Board tab (de)registration.
 *
 * `tab:worker:in-progress` is what makes the running tile's child rollup work
 * (UI-53es §2): the child titles live in the in_progress issue set, which the
 * Board owned alone — entering Worker directly used to subscribe ready/blocked
 * only, so the line had no data to render. `tab:worker:resolved` completes the
 * same five-column child set the Board counts `children N/M` from
 * (worker-card-exec-chips §3.3); without it the Worker tile could see a child
 * start but never see it finish.
 *
 * @type {ReadonlyArray<[string, string]>}
 */
const WORKER_SUBS = [
  ['tab:worker:ready', 'ready-issues'],
  ['tab:worker:blocked', 'blocked-issues'],
  ['tab:worker:in-progress', 'in-progress-issues'],
  ['tab:worker:resolved', 'resolved-issues'],
  ['tab:worker:closed', 'closed-issues']
];

/** Worker-owned client id for session-completed closed issues. */
const WORKER_CLOSED_CLIENT_ID = 'tab:worker:closed';
const WORKER_DONE_RANGE_KEY = 'bdui.worker.done-range';

/**
 * Client id of the monitor tab's aggregated pipeline subscription (UI-nprg).
 *
 * The monitor no longer reads the connection's `in_progress` issue list nor its
 * worker queue: it subscribes to ONE server-global aggregation covering every
 * visible workspace, so manual (non-worker) in_progress beads no longer appear
 * there — the tab answers "워커 파이프라인이 어디까지 갔는가", not "무엇이
 * in_progress인가".
 */
const MONITOR_PIPELINE_CLIENT_ID = MONITOR_PIPELINE_KEY;

/** Client id for the singleton per-workspace worker-queue subscription. */
const WORKER_QUEUE_CLIENT_ID = 'worker:queue';

/**
 * Client id for the singleton per-workspace UI-order subscription. This channel
 * is TAB-INDEPENDENT: Board and Worker share one manual order map, so it is
 * subscribed once at bootstrap and only torn down / re-established on a workspace
 * switch — never on a Board↔Worker tab change.
 */
const UI_ORDER_CLIENT_ID = 'ui:order';

/**
 * Client id for the singleton per-workspace display-policy subscription. Same
 * lifecycle as the UI-order channel: subscribed once at bootstrap, resubscribed
 * only on a workspace switch or reconnect.
 */
const DISPLAY_POLICY_CLIENT_ID = 'ui:display-policy';

/** Client id for the singleton server-global execution-preset subscription. */
const EXEC_PRESETS_CLIENT_ID = 'exec:presets';

/** Client id / localStorage key for the Board Closed column period (spec §3.2). */
const CLOSED_CLIENT_ID = 'tab:board:closed';
const CLOSED_RANGE_KEY = 'beads-ui.board.closed-range';

/**
 * Publish the sticky header's measured height as `--app-header-h`.
 *
 * The header wraps at narrow widths, so its height is not a constant; the CSS
 * fallback only covers the first frame before this observer attaches. Every
 * viewport-derived height in the stylesheet (`--lane-max-h`, the app shell's
 * minimum) subtracts this value, so a stale number shows up as a lane that
 * overshoots the fold or a scrollbar that never goes away.
 *
 * @param {HTMLElement|null} header_element
 * @returns {() => void} Detaches the observer.
 */
function trackHeaderHeight(header_element) {
  if (!header_element) {
    return () => {};
  }

  /**
   * @param {number} height
   */
  function publish(height) {
    document.documentElement.style.setProperty(
      '--app-header-h',
      `${Math.round(height)}px`
    );
  }

  publish(header_element.getBoundingClientRect().height);

  if (typeof ResizeObserver !== 'function') {
    return () => {};
  }

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      publish(entry.contentRect.height + measureVerticalEdges(header_element));
    }
  });
  observer.observe(header_element);

  return () => observer.disconnect();
}

/**
 * Border + padding the `contentRect` of a `ResizeObserver` entry leaves out.
 *
 * @param {HTMLElement} element
 */
function measureVerticalEdges(element) {
  const style = getComputedStyle(element);
  const parts = [
    style.paddingTop,
    style.paddingBottom,
    style.borderTopWidth,
    style.borderBottomWidth
  ];

  return parts.reduce((sum, part) => sum + (parseFloat(part) || 0), 0);
}

/**
 * A minimal replace-only store for the ADR snapshot. The payload has no partial
 * patches (`app/protocol.md`), so there is nothing for a dedicated data module
 * to reconcile — subscribers just re-render the last push.
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
      for (const fn of listeners) {
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
 * Bootstrap the two-tab control-tower shell (Board / Worker) with a shared
 * detail overlay.
 *
 * @param {HTMLElement} root_element - The container element to render into.
 */
export function bootstrap(root_element) {
  const log = debug('main');
  log('bootstrap start');

  trackHeaderHeight(
    /** @type {HTMLElement|null} */ (document.querySelector('.app-header'))
  );

  // Render route shells (nav + workspace picker live in the header).
  const shell = html`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="compare-root" class="route compare" hidden></section>
    <section id="adr-root" class="route adr" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;
  render(shell, root_element);

  /** @type {HTMLElement|null} */
  const global_nav_mount = document.getElementById('global-nav');
  /** @type {HTMLElement|null} */
  const repo_nav_mount = document.getElementById('top-nav');
  /** @type {HTMLElement|null} */
  const repo_scope_mount = document.getElementById('repo-scope');
  /** @type {HTMLElement|null} */
  const usage_mount = document.getElementById('usage-meter');
  /** @type {HTMLElement|null} */
  const board_root = document.getElementById('board-root');
  /** @type {HTMLElement|null} */
  const worker_root = document.getElementById('worker-root');
  /** @type {HTMLElement|null} */
  const monitor_root = document.getElementById('monitor-root');
  /** @type {HTMLElement|null} */
  const compare_root = document.getElementById('compare-root');
  /** @type {HTMLElement|null} */
  const adr_root = document.getElementById('adr-root');
  /** @type {HTMLElement|null} */
  const detail_mount = document.getElementById('detail-panel');

  if (usage_mount) {
    createUsageMeter(usage_mount);
  }

  if (
    board_root &&
    worker_root &&
    monitor_root &&
    compare_root &&
    adr_root &&
    detail_mount
  ) {
    /** @type {HTMLElement|null} */
    const header_loading = document.getElementById('header-loading');
    const activity = createActivityIndicator(header_loading);
    const fatal_dialog = createFatalErrorDialog(root_element);

    /**
     * Show a blocking dialog when a backend command fails.
     *
     * @param {unknown} err
     * @param {string} context
     */
    function showFatalFromError(err, context) {
      /** @type {string} */
      let message = 'Request failed';
      /** @type {string} */
      let detail = '';

      if (err && typeof err === 'object') {
        const any = /** @type {{ message?: unknown, details?: unknown }} */ (
          err
        );
        if (typeof any.message === 'string' && any.message.length > 0) {
          message = any.message;
        }
        if (typeof any.details === 'string') {
          detail = any.details;
        } else if (any.details && typeof any.details === 'object') {
          try {
            detail = JSON.stringify(any.details, null, 2);
          } catch {
            detail = '';
          }
        }
      } else if (typeof err === 'string' && err.length > 0) {
        message = err;
      }

      const title =
        context && context.length > 0
          ? `Failed to load ${context}`
          : 'Request failed';

      fatal_dialog.open(title, message, detail);
    }

    const client = createWsClient();

    const tracked_send = activity.wrapSend((type, payload) =>
      client.send(type, payload)
    );
    const subscriptions = createSubscriptionStore(tracked_send);
    const sub_issue_stores = createSubscriptionIssueStores();
    const worker_queue_store = createWorkerQueueStore();
    const monitor_pipeline_store = createMonitorPipelineStore();
    const ui_order_store = createUiOrderStore();
    const display_policy_store = createDisplayPolicyStore();
    const exec_preset_store = createExecPresetStore();
    const session_log_store = createSessionLogStore();
    const adr_store = createAdrStore();

    client.on('impl-presets-snapshot', (payload) => {
      const snapshot = /** @type {any} */ (payload);
      if (
        snapshot &&
        typeof snapshot.revision === 'number' &&
        Array.isArray(snapshot.presets)
      ) {
        exec_preset_store.set({
          revision: snapshot.revision,
          presets: snapshot.presets
        });
      }
    });

    // ADR 채널(UI-8uz7 §6)의 push. 모니터 파이프라인과 같이 서버 전역이고 부분
    // 패치가 없어서 스냅샷을 통째로 교체한다.
    client.on('adr-snapshot', (payload) => {
      const p = /** @type {any} */ (payload);
      if (!p || !Array.isArray(p.workspaces)) {
        return;
      }
      adr_store.set({ workspaces: p.workspaces });
    });

    // Route the aggregated monitor pipeline snapshot (UI-nprg) into its store.
    // No workspace guard, unlike the worker queue: this payload is deliberately
    // server-global and each entry names its own repo, so there is no "wrong
    // workspace" to drop.
    client.on('monitor-pipeline-snapshot', (payload) => {
      const p = /** @type {any} */ (payload);
      if (!p || !Array.isArray(p.workspaces)) {
        return;
      }
      try {
        // `workspaces_state` (UI-qrfo §4) covers every visible repo including
        // the ones with an empty pipeline, so it is kept ALONGSIDE the heavy
        // array rather than derived from it. A server that omits it leaves the
        // store's empty default in place.
        //
        // `cross_lanes` (UI-j92s §4.4) travels in the SAME envelope and is
        // forwarded verbatim: the store owns the three-state distinction
        // (키 없음 / null / 값) and the view reads it from there.
        monitor_pipeline_store.set(
          p.workspaces,
          p.workspaces_state,
          p.cross_lanes
        );
      } catch {
        // ignore
      }
    });

    // Route manual UI-order snapshots (same unified push protocol) into the
    // client-side order store shared by Board and Worker (spec §2).
    client.on('ui-order-snapshot', (payload) => {
      const p = /** @type {any} */ (payload);
      if (p && typeof p.revision === 'number') {
        try {
          ui_order_store.set({
            revision: p.revision,
            order: p.order && typeof p.order === 'object' ? p.order : {}
          });
        } catch {
          // ignore
        }
      }
    });

    // Route label/metadata display-policy snapshots into the client-side policy
    // store read by the board cards, the label filter, and the settings panel.
    client.on('display-policy-snapshot', (payload) => {
      const p = /** @type {any} */ (payload);
      if (p && p.policy && typeof p.policy === 'object') {
        try {
          display_policy_store.set(p.policy);
        } catch {
          // ignore
        }
      }
    });

    // Route session-log (transcript) pushes: a snapshot on subscribe, then live
    // appends for a running attempt (spec §5.6).
    client.on('session-log-snapshot', (payload) => {
      const p = /** @type {any} */ (payload);
      if (p && typeof p.id === 'string') {
        try {
          session_log_store.set(
            p.id,
            Array.isArray(p.lines) ? p.lines : [],
            typeof p.last_event_at === 'number' ? p.last_event_at : null
          );
        } catch {
          // ignore
        }
      }
    });
    client.on('session-log-append', (payload) => {
      const p = /** @type {any} */ (payload);
      if (p && typeof p.id === 'string') {
        try {
          session_log_store.append(p.id, p.event);
        } catch {
          // ignore
        }
      }
    });

    // Route per-subscription push envelopes to the owning store.
    client.on('snapshot', (payload) => {
      const p = /** @type {any} */ (payload);
      const id = p && typeof p.id === 'string' ? p.id : '';
      const store = id ? sub_issue_stores.getStore(id) : null;
      if (store && p && p.type === 'snapshot') {
        try {
          store.applyPush(p);
        } catch {
          // ignore
        }
      }
    });
    client.on('upsert', (payload) => {
      const p = /** @type {any} */ (payload);
      const id = p && typeof p.id === 'string' ? p.id : '';
      const store = id ? sub_issue_stores.getStore(id) : null;
      if (store && p && p.type === 'upsert') {
        try {
          store.applyPush(p);
        } catch {
          // ignore
        }
      }
    });
    client.on('delete', (payload) => {
      const p = /** @type {any} */ (payload);
      const id = p && typeof p.id === 'string' ? p.id : '';
      const store = id ? sub_issue_stores.getStore(id) : null;
      if (store && p && p.type === 'delete') {
        try {
          store.applyPush(p);
        } catch {
          // ignore
        }
      }
    });

    // --- Detail subscription lifecycle (shared by the overlay) ---
    /** @type {null | (() => Promise<void>)} */
    let unsub_detail = null;
    /** @type {string | null} */
    let last_detail_sub_key = null;
    /** @type {string | null} */
    let pending_detail_sub_key = null;
    /** @type {string | null} */
    let pending_detail_id = null;
    /** @type {() => void} */
    let resolve_workspace_bootstrap = () => {};
    const workspace_bootstrap_ready = new Promise((resolve) => {
      resolve_workspace_bootstrap = () => resolve(undefined);
    });
    let workspace_bootstrap_done = false;
    let is_switching_workspace = false;

    /**
     * @param {string} id
     * @returns {string}
     */
    function detailSubscriptionKey(id) {
      const workspace_path = store.getState().workspace.current?.path || '';
      return `${workspace_path}\0${id}`;
    }

    function resetDetailSubscription() {
      if (unsub_detail) {
        void unsub_detail().catch(() => {});
        unsub_detail = null;
      }
      last_detail_sub_key = null;
      pending_detail_sub_key = null;
    }

    /**
     * @param {string} id
     */
    async function subscribeSelectedDetail(id) {
      const key = detailSubscriptionKey(id);
      if (key === last_detail_sub_key || key === pending_detail_sub_key) {
        return;
      }
      pending_detail_sub_key = key;
      const client_id = `detail:${id}`;
      const spec = { type: 'issue-detail', params: { id } };
      try {
        sub_issue_stores.register(client_id, spec);
      } catch (err) {
        log('register detail store failed: %o', err);
      }
      try {
        const unsub = await subscriptions.subscribeList(client_id, spec);
        const state = store.getState();
        if (state.selected_id !== id || detailSubscriptionKey(id) !== key) {
          await unsub().catch(() => {});
          return;
        }
        if (unsub_detail) {
          await unsub_detail().catch(() => {});
        }
        unsub_detail = unsub;
        last_detail_sub_key = key;
      } catch (err) {
        log('detail subscribe failed: %o', err);
        showFatalFromError(err, 'issue details');
      } finally {
        if (pending_detail_sub_key === key) {
          pending_detail_sub_key = null;
        }
      }
    }

    /**
     * @param {string} id
     */
    function scheduleDetailSubscription(id) {
      pending_detail_id = id;
      const run = () => {
        if (pending_detail_id !== id || store.getState().selected_id !== id) {
          return;
        }
        pending_detail_id = null;
        void subscribeSelectedDetail(id);
      };
      if (!workspace_bootstrap_done) {
        void workspace_bootstrap_ready.then(run);
        return;
      }
      run();
    }

    // --- Board subscription lifecycle ---
    /** @type {Map<string, () => Promise<void>>} */
    const board_unsubs = new Map();
    /** @type {Set<string>} */
    const pending_subscriptions = new Set();

    /**
     * Per-lane subscription generation. A `subscribe-list` is asynchronous, so
     * its result can land AFTER the tab that asked for it was torn down; storing
     * that unsub would make the next `ensure*` read "already subscribed" and skip
     * forever, leaving the lane silently dataless. Each teardown bumps its lane's
     * counter, and a completion whose captured generation no longer matches is
     * released instead of stored.
     *
     * @type {{ board: number, worker: number }}
     */
    const sub_generation = { board: 0, worker: 0 };

    /**
     * Store a completed subscription, or release it when its lane moved on.
     *
     * @param {Map<string, () => Promise<void>>} unsubs
     * @param {'board'|'worker'} lane
     * @param {number} generation
     * @param {string} client_id
     * @param {() => Promise<void>} unsub
     * @returns {boolean} Whether it was kept.
     */
    function keepOrRelease(unsubs, lane, generation, client_id, unsub) {
      if (generation !== sub_generation[lane]) {
        void unsub().catch(() => {});
        return false;
      }
      unsubs.set(client_id, unsub);
      return true;
    }

    /**
     * Bring every lane's subscriptions in line with the view on screen right
     * now. Idempotent — each `ensure*` skips what it already holds — so it is
     * safe to call from a subscription completion that arrived too late to be
     * kept: releasing that one leaves the lane empty, and nothing else would
     * ask again (the re-entry that raced it was skipped by the pending guard).
     */
    // The unified settings dialog edits worker-queue state (orchestration,
    // slots), so the queue channel must be live while it is open — including
    // from the Monitor view, whose route alone would not hold it.
    let settings_dialog_open = false;

    function syncSubscriptionsToView() {
      const state = store.getState();
      ensureBoardSubscriptions(state.view === 'board');
      ensureWorkerSubscriptions(state.view === 'worker');
      ensureMonitorPipelineChannel(pipelineChannelWanted(state));
      ensureAdrChannel(state.view === 'adr');
      ensureWorkerQueueChannel(
        state.view === 'board' ||
          state.view === 'worker' ||
          settings_dialog_open ||
          Boolean(state.selected_id)
      );
    }

    // Closed column period (spec §3.2): the closed-issues subscription carries a
    // `params.since` bound derived from this range, applied on the FIRST
    // subscription and every re-subscription (workspace switch included).
    /** @type {import('./data/closed-range.js').ClosedRange} */
    let closed_range = DEFAULT_CLOSED_RANGE;
    try {
      const raw = window.localStorage.getItem(CLOSED_RANGE_KEY);
      if (isClosedRange(raw)) {
        closed_range = raw;
      }
    } catch {
      // ignore storage errors
    }

    // The 완료 레인 period is a two-value vocabulary (UI-qbbg §5): the snapshot
    // carries at most seven days of done rows, so a stored `30d`/`all` is read
    // as `7d` and the Worker `closed-issues` `since` below follows it.
    /** @type {import('./data/closed-range.js').DoneRange} */
    let worker_done_range = 'today';
    try {
      const raw = window.localStorage.getItem(WORKER_DONE_RANGE_KEY);
      if (raw !== null) {
        worker_done_range = normalizeDoneRange(raw);
      }
    } catch {
      // ignore storage errors
    }

    /**
     * The current Closed subscription spec: a `closed-issues` list filtered by
     * `params.since` for the selected range ('all' drops the filter).
     *
     * @returns {{ type: string, params?: { since: number } }}
     */
    function closedSpec() {
      const since = closedRangeSince(closed_range);
      return since === undefined
        ? { type: 'closed-issues' }
        : { type: 'closed-issues', params: { since } };
    }

    /**
     * @returns {{ type: string, params?: { since: number } }}
     */
    function workerClosedSpec() {
      const since = closedRangeSince(worker_done_range);
      return since === undefined
        ? { type: 'closed-issues' }
        : { type: 'closed-issues', params: { since } };
    }

    /**
     * @param {boolean} active
     */
    function ensureBoardSubscriptions(active) {
      if (active) {
        for (const [client_id, type] of BOARD_SUBS) {
          if (
            board_unsubs.has(client_id) ||
            pending_subscriptions.has(client_id)
          ) {
            continue;
          }
          // The Closed column is special-cased: its INITIAL subscription (and
          // every resubscribe) must carry the stored range's `since`; the static
          // BOARD_SUBS tuple is paramless and would otherwise fetch ALL closed.
          const spec = client_id === CLOSED_CLIENT_ID ? closedSpec() : { type };
          try {
            sub_issue_stores.register(client_id, spec);
          } catch (err) {
            log('register %s store failed: %o', client_id, err);
          }
          pending_subscriptions.add(client_id);
          const generation = sub_generation.board;
          let released = false;
          void subscriptions
            .subscribeList(client_id, spec)
            .then((unsub) => {
              released = !keepOrRelease(
                board_unsubs,
                'board',
                generation,
                client_id,
                unsub
              );
            })
            .catch((err) => {
              log('subscribe %s failed: %o', client_id, err);
              showFatalFromError(err, 'board');
            })
            .finally(() => {
              pending_subscriptions.delete(client_id);
              if (released) {
                syncSubscriptionsToView();
              }
            });
        }
      } else {
        clearBoardSubscriptions();
      }
    }

    /**
     * Switch the Closed column period (spec §3.2): persist the choice, then —
     * only while the board is actively subscribed — tear down the existing
     * closed subscription (`unsubscribe-list` MUST precede the new subscribe so
     * the server does not leak a stale attach) and re-subscribe with the new
     * `since`. A no-op when the range is unchanged; when the board is inactive
     * the persisted range applies on the next `ensureBoardSubscriptions`.
     *
     * @param {string} range
     */
    async function setClosedRange(range) {
      if (!isClosedRange(range) || range === closed_range) {
        return;
      }
      closed_range = range;
      try {
        window.localStorage.setItem(CLOSED_RANGE_KEY, range);
      } catch {
        // ignore storage errors
      }
      const unsub = board_unsubs.get(CLOSED_CLIENT_ID);
      if (!unsub) {
        return;
      }
      board_unsubs.delete(CLOSED_CLIENT_ID);
      await unsub().catch(() => {});
      const spec = closedSpec();
      try {
        sub_issue_stores.register(CLOSED_CLIENT_ID, spec);
      } catch (err) {
        log('register %s store failed: %o', CLOSED_CLIENT_ID, err);
      }
      try {
        const new_unsub = await subscriptions.subscribeList(
          CLOSED_CLIENT_ID,
          spec
        );
        board_unsubs.set(CLOSED_CLIENT_ID, new_unsub);
      } catch (err) {
        log('re-subscribe %s failed: %o', CLOSED_CLIENT_ID, err);
        showFatalFromError(err, 'board');
      }
    }

    /**
     * Keep the Worker session-completion source aligned with the completed-lane
     * range. Its client id is deliberately distinct from Board Closed.
     *
     * @param {string} range
     */
    async function setWorkerDoneRange(range) {
      const next = normalizeDoneRange(range);
      if (next === worker_done_range) {
        return;
      }
      worker_done_range = next;
      const unsub = worker_unsubs.get(WORKER_CLOSED_CLIENT_ID);
      if (!unsub) {
        return;
      }
      worker_unsubs.delete(WORKER_CLOSED_CLIENT_ID);
      await unsub().catch(() => {});
      const spec = workerClosedSpec();
      try {
        sub_issue_stores.register(WORKER_CLOSED_CLIENT_ID, spec);
      } catch (err) {
        log('register %s store failed: %o', WORKER_CLOSED_CLIENT_ID, err);
      }
      try {
        const new_unsub = await subscriptions.subscribeList(
          WORKER_CLOSED_CLIENT_ID,
          spec
        );
        worker_unsubs.set(WORKER_CLOSED_CLIENT_ID, new_unsub);
      } catch (err) {
        log('re-subscribe %s failed: %o', WORKER_CLOSED_CLIENT_ID, err);
        showFatalFromError(err, 'worker');
      }
    }

    function clearBoardSubscriptions() {
      sub_generation.board += 1;
      for (const [client_id] of BOARD_SUBS) {
        const unsub = board_unsubs.get(client_id);
        if (unsub) {
          void unsub().catch(() => {});
          board_unsubs.delete(client_id);
        }
        try {
          sub_issue_stores.unregister(client_id);
        } catch (err) {
          log('unregister %s failed: %o', client_id, err);
        }
      }
    }

    // --- Worker subscription lifecycle (candidate lanes + queue channel) ---
    /** @type {Map<string, () => Promise<void>>} */
    const worker_unsubs = new Map();
    /** @type {(() => Promise<unknown>) | null} */
    let worker_queue_unsub = null;

    /**
     * @param {boolean} active
     */
    function ensureWorkerSubscriptions(active) {
      if (!active) {
        clearWorkerSubscriptions();
        return;
      }
      for (const [client_id, type] of WORKER_SUBS) {
        if (
          worker_unsubs.has(client_id) ||
          pending_subscriptions.has(client_id)
        ) {
          continue;
        }
        const spec =
          client_id === WORKER_CLOSED_CLIENT_ID ? workerClosedSpec() : { type };
        try {
          sub_issue_stores.register(client_id, spec);
        } catch (err) {
          log('register %s store failed: %o', client_id, err);
        }
        pending_subscriptions.add(client_id);
        const generation = sub_generation.worker;
        let released = false;
        void subscriptions
          .subscribeList(client_id, spec)
          .then((unsub) => {
            released = !keepOrRelease(
              worker_unsubs,
              'worker',
              generation,
              client_id,
              unsub
            );
          })
          .catch((err) => {
            log('subscribe %s failed: %o', client_id, err);
            showFatalFromError(err, 'worker');
          })
          .finally(() => {
            pending_subscriptions.delete(client_id);
            if (released) {
              syncSubscriptionsToView();
            }
          });
      }
    }

    function clearWorkerSubscriptions() {
      sub_generation.worker += 1;
      for (const [client_id] of WORKER_SUBS) {
        const unsub = worker_unsubs.get(client_id);
        if (unsub) {
          void unsub().catch(() => {});
          worker_unsubs.delete(client_id);
        }
        try {
          sub_issue_stores.unregister(client_id);
        } catch (err) {
          log('unregister %s failed: %o', client_id, err);
        }
      }
    }

    /**
     * The per-workspace worker-queue channel (reuses the authenticated ws).
     * Board joins Worker as a reader for durable cleanup-failure controls; the
     * Monitor remains on its server-global pipeline aggregation.
     *
     * @param {boolean} active
     */
    function ensureWorkerQueueChannel(active) {
      if (!active) {
        clearWorkerQueueChannel();
        return;
      }
      if (worker_queue_unsub) {
        return;
      }
      void tracked_send('subscribe-worker-queue', {
        id: WORKER_QUEUE_CLIENT_ID
      }).catch((err) => {
        log('subscribe-worker-queue failed: %o', err);
      });
      worker_queue_unsub = () =>
        tracked_send('unsubscribe-worker-queue', {
          id: WORKER_QUEUE_CLIENT_ID
        });
    }

    function clearWorkerQueueChannel() {
      if (worker_queue_unsub) {
        void worker_queue_unsub().catch(() => {});
        worker_queue_unsub = null;
      }
    }

    // --- Monitor pipeline channel lifecycle (UI-nprg) ---
    /** @type {(() => Promise<unknown>) | null} */
    let monitor_pipeline_unsub = null;

    /**
     * Does anything on screen need the aggregated pipeline right now?
     *
     * 두 소비자가 있다: 모니터 탭 자신과, 어느 탭에서 열렸든 상세 패널의 의존성
     * 후보 목록(UI-lx45 §3.2). 네 호출 지점이 같은 술어를 읽어야 상세를 연 채
     * 탭을 옮겨도 후보가 비거나 낡지 않는다 — 채널을 끊어도 store는 비워지지
     * 않으므로, 술어가 갈리면 오래된 snapshot이 남는다.
     *
     * @param {{ view: 'board'|'worker'|'monitor'|'compare'|'adr', selected_id: string | null }} state
     * @returns {boolean}
     */
    function pipelineChannelWanted(state) {
      return state.view === 'monitor' || state.selected_id != null;
    }

    /**
     * The monitor's aggregated pipeline channel. Server-global: it is NOT
     * cleared on a workspace switch, because the aggregation already spans
     * every visible workspace — dropping it there would blank the tab and then
     * re-fetch the identical payload.
     *
     * @param {boolean} active
     */
    function ensureMonitorPipelineChannel(active) {
      if (!active) {
        clearMonitorPipelineChannel();
        return;
      }
      if (monitor_pipeline_unsub) {
        return;
      }
      void tracked_send('subscribe-monitor-pipeline', {
        id: MONITOR_PIPELINE_CLIENT_ID
      }).catch((err) => {
        log('subscribe-monitor-pipeline failed: %o', err);
      });
      monitor_pipeline_unsub = () =>
        tracked_send('unsubscribe-monitor-pipeline', {
          id: MONITOR_PIPELINE_CLIENT_ID
        });
    }

    function clearMonitorPipelineChannel() {
      if (monitor_pipeline_unsub) {
        void monitor_pipeline_unsub().catch(() => {});
        monitor_pipeline_unsub = null;
      }
    }

    // --- ADR channel lifecycle (UI-8uz7 §7) ---
    /** @type {(() => Promise<unknown>) | null} */
    let adr_unsub = null;

    /**
     * The ADR observation channel. Server-global like the monitor pipeline and
     * only wanted while the tab is on screen: the server arms one fs watch per
     * visible workspace for as long as a subscriber exists, so leaving the tab
     * must release it.
     *
     * @param {boolean} active
     */
    function ensureAdrChannel(active) {
      if (!active) {
        clearAdrChannel();
        return;
      }
      if (adr_unsub) {
        return;
      }
      void tracked_send('subscribe-adr', { id: ADR_SNAPSHOT_KEY }).catch(
        (err) => {
          log('subscribe-adr failed: %o', err);
        }
      );
      adr_unsub = () =>
        tracked_send('unsubscribe-adr', { id: ADR_SNAPSHOT_KEY });
    }

    function clearAdrChannel() {
      if (adr_unsub) {
        void adr_unsub().catch(() => {});
        adr_unsub = null;
      }
    }

    // --- UI-order subscription lifecycle (bootstrap singleton) ---
    /** @type {(() => Promise<unknown>) | null} */
    let ui_order_unsub = null;

    /**
     * Subscribe to the per-workspace manual UI-order channel exactly once. Not
     * tied to any tab — Board and Worker both read the shared order map.
     */
    function subscribeUiOrder() {
      if (ui_order_unsub) {
        return;
      }
      void tracked_send('subscribe-ui-order', { id: UI_ORDER_CLIENT_ID }).catch(
        (err) => {
          log('subscribe-ui-order failed: %o', err);
        }
      );
      ui_order_unsub = () =>
        tracked_send('unsubscribe-ui-order', { id: UI_ORDER_CLIENT_ID });
    }

    /**
     * Tear down the UI-order subscription and drop the cached order (the order
     * map is per-workspace, so a workspace switch must not carry it over).
     */
    function clearUiOrderSubscription() {
      if (ui_order_unsub) {
        void ui_order_unsub().catch(() => {});
        ui_order_unsub = null;
      }
      ui_order_store.clear();
    }

    // --- Display-policy subscription lifecycle (bootstrap singleton) ---
    /** @type {(() => Promise<unknown>) | null} */
    let display_policy_unsub = null;

    /**
     * Subscribe to the per-workspace display-policy channel exactly once. Not
     * tied to any tab — the board cards, the label filter, and the settings
     * panel all read the same policy.
     */
    function subscribeDisplayPolicy() {
      if (display_policy_unsub) {
        return;
      }
      void tracked_send('subscribe-display-policy', {
        id: DISPLAY_POLICY_CLIENT_ID
      }).catch((err) => {
        log('subscribe-display-policy failed: %o', err);
      });
      display_policy_unsub = () =>
        tracked_send('unsubscribe-display-policy', {
          id: DISPLAY_POLICY_CLIENT_ID
        });
    }

    /**
     * Tear down the display-policy subscription and drop the cached policy (it
     * is per-workspace, so a switch must not carry it over).
     */
    function clearDisplayPolicySubscription() {
      if (display_policy_unsub) {
        void display_policy_unsub().catch(() => {});
        display_policy_unsub = null;
      }
      display_policy_store.clear();
    }

    // --- Execution-preset subscription lifecycle (server-global singleton) ---
    /** @type {(() => Promise<unknown>) | null} */
    let exec_presets_unsub = null;

    function subscribeExecPresets() {
      if (exec_presets_unsub) {
        return;
      }
      void tracked_send('subscribe-impl-presets', {
        id: EXEC_PRESETS_CLIENT_ID
      }).catch((err) => {
        log('subscribe-impl-presets failed: %o', err);
      });
      exec_presets_unsub = () =>
        tracked_send('unsubscribe-impl-presets', {
          id: EXEC_PRESETS_CLIENT_ID
        });
    }

    /**
     * Re-establish the per-workspace push subscriptions on a NEW socket after a
     * reconnect.
     *
     * A reconnected socket starts on the server's default workspace, and the
     * client has no automatic workspace restore. Subscribing before repointing
     * it would deliver the DEFAULT workspace's data and let that snapshot
     * overwrite what the user is actually looking at, so the workspace is
     * restored first and both channels resubscribe after it — one
     * `set-workspace` for all of them.
     */
    async function resubscribeAfterReconnect() {
      // The old socket is gone, so there is nothing to unsubscribe from — only
      // the guards and the now-unowned cached policy to release. Dropping the
      // per-lane unsub maps is what makes the list channels come back: their
      // entries close over the DEAD socket, and `ensure*Subscriptions` reads a
      // populated map as "already subscribed", so leaving them would freeze the
      // active tab's data until a workspace switch. Bumping the generations with
      // them keeps an in-flight pre-reconnect subscribe from re-populating the
      // maps behind the fresh ones.
      display_policy_unsub = null;
      display_policy_store.clear();
      exec_presets_unsub = null;
      exec_preset_store.clear();
      worker_queue_unsub = null;
      monitor_pipeline_unsub = null;
      adr_unsub = null;
      board_unsubs.clear();
      worker_unsubs.clear();
      sub_generation.board += 1;
      sub_generation.worker += 1;
      subscribeExecPresets();
      const selected = store.getState().workspace.current?.path;
      if (selected) {
        try {
          await client.send('set-workspace', { path: selected });
        } catch (err) {
          log('workspace restore after reconnect failed: %o', err);
          return;
        }
      }
      subscribeDisplayPolicy();
      const state = store.getState();
      ensureBoardSubscriptions(state.view === 'board');
      ensureWorkerSubscriptions(state.view === 'worker');
      ensureMonitorPipelineChannel(pipelineChannelWanted(state));
      ensureAdrChannel(state.view === 'adr');
      ensureWorkerQueueChannel(
        state.view === 'board' ||
          state.view === 'worker' ||
          Boolean(state.selected_id)
      );
    }

    // --- Workspace management ---
    /**
     * Clear all subscriptions and stores, then re-establish for the active view.
     */
    async function clearAndResubscribe() {
      log('clearing all subscriptions for workspace switch');
      clearBoardSubscriptions();
      clearWorkerSubscriptions();
      clearWorkerQueueChannel();
      worker_queue_store.clear();
      // UI-order is a bootstrap singleton (not tab-scoped), but the order map is
      // per-workspace — clear + resubscribe so the new workspace's order loads.
      clearUiOrderSubscription();
      subscribeUiOrder();
      // Same shape for the display policy: a bootstrap singleton whose contents
      // are per-workspace.
      clearDisplayPolicySubscription();
      subscribeDisplayPolicy();
      resetDetailSubscription();
      const s = store.getState();
      if (s.selected_id) {
        try {
          sub_issue_stores.unregister(`detail:${s.selected_id}`);
        } catch {
          // ignore
        }
      }
      const current_state = store.getState();
      ensureBoardSubscriptions(current_state.view === 'board');
      ensureWorkerSubscriptions(current_state.view === 'worker');
      ensureMonitorPipelineChannel(pipelineChannelWanted(current_state));
      ensureWorkerQueueChannel(
        current_state.view === 'board' ||
          current_state.view === 'worker' ||
          Boolean(current_state.selected_id)
      );
      if (current_state.selected_id) {
        scheduleDetailSubscription(current_state.selected_id);
      }
    }

    /**
     * @param {string} workspace_path
     */
    async function handleWorkspaceChange(workspace_path) {
      log('requesting workspace switch to %s', workspace_path);
      is_switching_workspace = true;
      try {
        const result = await client.send('set-workspace', {
          path: workspace_path
        });
        log('workspace switch result: %o', result);
        if (result && result.workspace) {
          store.setState({
            workspace: {
              current: {
                path: result.workspace.root_dir,
                database: result.workspace.db_path
              }
            }
          });
          window.localStorage.setItem('beads-ui.workspace', workspace_path);
          if (result.changed) {
            await clearAndResubscribe();
            showToast(
              'Switched to ' + getProjectName(workspace_path),
              'success',
              2000
            );
          }
        }
      } catch (err) {
        log('workspace switch failed: %o', err);
        showToast('Failed to switch workspace', 'error', 3000);
        throw err;
      } finally {
        is_switching_workspace = false;
      }
    }

    /**
     * @param {string} workspace_path
     */
    async function handleWorkspaceGitPull(workspace_path) {
      log('requesting workspace git pull for %s', workspace_path);
      try {
        const result = await client.send('git-pull-workspace', {});
        log('workspace git pull result: %o', result);

        const status = /** @type {any} */ (result)?.status;
        if (status === 'up_to_date') {
          showToast('Already up to date', 'success', 2000);
          return;
        }
        if (status === 'stash_pop_conflict') {
          showToast(
            'Git pulled, but stash pop conflicted (check git stash list)',
            'warning',
            4000
          );
          return;
        }
        showToast(
          'Git pulled ' + getProjectName(workspace_path),
          'success',
          2000
        );
      } catch (err) {
        log('workspace git pull failed: %o', err);
        const code = /** @type {any} */ (err)?.code;
        const detail = /** @type {any} */ (err)?.message;
        if (code === 'rebase_conflict') {
          showToast(
            'Git pull conflicts — reverted (manual resolve required)',
            'error',
            4000
          );
          return;
        }
        if (code === 'rebase_conflict_abort_failed') {
          showToast(
            "Git pull conflicts AND rebase --abort failed — repo left mid-rebase, run 'git rebase --abort' manually",
            'error',
            6000
          );
          return;
        }
        if (code === 'busy') {
          showToast(
            'Git pull skipped: another operation is running',
            'warning',
            3000
          );
          return;
        }
        const reason = detail ? `: ${detail}` : '';
        showToast(`Git pull failed${reason}`, 'error', 3000);
        throw err;
      }
    }

    /**
     * Toggle whether a workspace shows in the picker (spec §6). The hidden set
     * is server-global, so after the toggle we re-request the workspace list to
     * pick up the authoritative `hidden` array for every client.
     *
     * @param {string} workspace_path
     * @param {boolean} visible
     */
    async function handleWorkspaceVisibilityChange(workspace_path, visible) {
      log(
        'setting workspace visibility %s → %s',
        workspace_path,
        String(visible)
      );
      try {
        await client.send('set-workspace-visibility', {
          path: workspace_path,
          visible
        });
        await loadWorkspaces();
      } catch (err) {
        log('workspace visibility update failed: %o', err);
        showToast('Failed to update project visibility', 'error', 3000);
      }
    }

    /**
     * @param {string} path
     * @returns {string}
     */
    function getProjectName(path) {
      if (!path) return 'Unknown';
      const parts = path.split('/').filter(Boolean);
      return parts.length > 0 ? parts[parts.length - 1] : 'Unknown';
    }

    /**
     * Load available workspaces from server and update state.
     */
    async function loadWorkspaces() {
      try {
        const result = await client.send('list-workspaces', {});
        log('workspaces loaded: %o', result);
        if (result && Array.isArray(result.workspaces)) {
          const available = result.workspaces.map((/** @type {any} */ ws) => ({
            path: ws.path,
            database: ws.database,
            pid: ws.pid,
            version: ws.version
          }));
          const current = result.current
            ? {
                path: result.current.root_dir,
                database: result.current.db_path
              }
            : null;
          const hidden = Array.isArray(result.hidden)
            ? result.hidden.filter(
                (/** @type {unknown} */ p) => typeof p === 'string'
              )
            : [];
          store.setState({ workspace: { current, available, hidden } });

          // The saved manual pick wins over the configured default_workspace;
          // the default only applies when no valid saved value exists (spec
          // 2026-07-17-last-workspace-restore-design). A workspace hidden from
          // the picker is not a valid saved value (spec
          // 2026-07-20-hidden-workspace-restore-guard).
          const savedWorkspace =
            window.localStorage.getItem('beads-ui.workspace');

          if (savedWorkspace) {
            const savedExists = available.some(
              (/** @type {{ path: string }} */ ws) => ws.path === savedWorkspace
            );
            if (!savedExists || hidden.includes(savedWorkspace)) {
              window.localStorage.removeItem('beads-ui.workspace');
            } else if (current && savedWorkspace !== current.path) {
              log('restoring saved workspace preference: %s', savedWorkspace);
              await handleWorkspaceChange(savedWorkspace);
            }
          }
        }
      } catch (err) {
        log('failed to load workspaces: %o', err);
      }
    }

    client.on('workspace-changed', (payload) => {
      log('workspace-changed event: %o', payload);
      if (payload && payload.root_dir) {
        store.setState({
          workspace: {
            current: {
              path: payload.root_dir,
              database: payload.db_path
            }
          }
        });
        void loadWorkspaces();
        void clearAndResubscribe();
      }
    });

    // --- WebSocket connectivity toasts ---
    /** @type {boolean} */
    let had_disconnect = false;
    if (typeof client.onConnection === 'function') {
      /** @type {(s: 'connecting'|'open'|'closed'|'reconnecting') => void} */
      const onConn = (s) => {
        log('ws state %s', s);
        if (s === 'reconnecting' || s === 'closed') {
          had_disconnect = true;
          showToast('Connection lost. Reconnecting…', 'error', 4000);
        } else if (s === 'open' && had_disconnect) {
          had_disconnect = false;
          showToast('Reconnected', 'success', 2200);
          void refreshConfigSnapshot(store, (message, err) => {
            log(`${message}: %o`, err);
          });
          void resubscribeAfterReconnect();
        }
      };
      client.onConnection(onConn);
    }

    // Load last-view from storage (board/worker/monitor/compare/adr only).
    /** @type {'board'|'worker'|'monitor'|'compare'|'adr'} */
    let last_view = 'board';
    try {
      const raw_view = window.localStorage.getItem('beads-ui.view');
      if (
        raw_view === 'board' ||
        raw_view === 'worker' ||
        raw_view === 'monitor' ||
        raw_view === 'compare' ||
        raw_view === 'adr'
      ) {
        last_view = raw_view;
      }
    } catch (err) {
      log('view parse error: %o', err);
    }

    const store = createStore({
      config: readBootstrapConfig(),
      view: last_view
    });

    // Route worker-queue snapshots (unified push protocol; distinct top-level
    // event type) into the client-side queue store. Registered here rather than
    // with the other push handlers because the workspace guard below reads
    // `store`; nothing can push a queue snapshot before the first
    // `subscribe-worker-queue`, which only goes out further down.
    //
    // Defense layer against a stale server-side subscription: a snapshot
    // addressed to another workspace is dropped — but only once a workspace is
    // actually selected. The bootstrap snapshot arrives while `current` is still
    // null and nothing would re-send it, so an unconditional check would leave
    // the first Worker render empty.
    client.on('worker-queue-snapshot', (payload) => {
      const p = /** @type {any} */ (payload);
      if (!p || !p.queue) {
        return;
      }
      const current_path = store.getState().workspace.current?.path;
      if (
        typeof current_path === 'string' &&
        current_path.length > 0 &&
        p.root_dir !== current_path
      ) {
        log('dropping worker-queue snapshot for %s', String(p.root_dir));
        return;
      }
      try {
        worker_queue_store.set(p.queue);
      } catch {
        // ignore
      }
    });

    const router = createHashRouter(store);
    router.start();

    // Request types whose caller must distinguish a valid empty result or render
    // the server rejection verbatim propagate instead of becoming `[]`.
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
      // 레인 op의 `conflict`는 최신 `cross_lanes`를 details에 싣고 오며, 뷰는
      // 그것으로 계획 전체를 다시 세운다 (UI-j92s §5.5). `[]`로 삼키면 재계획
      // 경로 자체가 사라진다.
      'monitor-lane-create',
      'monitor-lane-update',
      'monitor-lane-confirm',
      'monitor-lane-remove'
    ]);

    /**
     * @param {string} type
     * @param {unknown} payload
     */
    const transport = async (type, payload) => {
      try {
        return await tracked_send(/** @type {MessageType} */ (type), payload);
      } catch (err) {
        if (PROPAGATED_ERROR_TYPES.has(type)) {
          throw err;
        }
        return [];
      }
    };

    createTopNav(
      { global_element: global_nav_mount, repo_element: repo_nav_mount },
      store,
      router
    );

    const workspace_mount = document.getElementById('workspace-picker');
    if (workspace_mount) {
      createWorkspacePicker(
        workspace_mount,
        store,
        handleWorkspaceChange,
        handleWorkspaceGitPull,
        handleWorkspaceVisibilityChange
      );
    }

    // Global New Issue dialog mounted at root so it is always available.
    const new_issue_dialog = createNewIssueDialog(
      root_element,
      (type, payload) => tracked_send(type, payload)
    );
    try {
      const btn_new = /** @type {HTMLButtonElement|null} */ (
        document.getElementById('new-issue-btn')
      );
      if (btn_new) {
        btn_new.addEventListener('click', () => new_issue_dialog.open());
      }
    } catch {
      // ignore missing header
    }

    // Unified settings dialog: ONE nav-bar ⚙ opens 세션 / Worker / 표시
    // (spec §D). Its label pills are drawn from the labels actually present in
    // the loaded board data, WITHOUT the policy applied — an already-hidden
    // label has to stay clickable, otherwise hiding one would be irreversible.
    const settings_dialog = createSettingsDialog(root_element, {
      policyStore: display_policy_store,
      queueStore: worker_queue_store,
      implPresetStore: exec_preset_store,
      transport: (type, payload) => tracked_send(type, payload),
      onOpenChange: (open) => {
        const was_open = settings_dialog_open;
        settings_dialog_open = open;
        syncSubscriptionsToView();
        // 전역 kv 기본값·전역 프리셋 적용은 이 다이얼로그에서만 일어난다
        // (worker-card-exec-chips §2.1). Worker 탭의 실행 설정 칩은 그 kv를
        // 캐시하므로, 닫힘이 곧 "다시 읽어라" 신호다. `worker_view`는 아래에서
        // 만들어지지만 다이얼로그는 bootstrap 이후에만 닫힐 수 있다.
        // 닫기는 `close()`와 <dialog>의 `close` 이벤트에서 두 번 통지되므로
        // true→false 전환에서만 다시 읽는다 — 아니면 닫을 때마다 두 번 요청한다.
        if (was_open && open === false) {
          worker_view.refreshSessionDefaults();
        }
      },
      labelOptions: () => {
        /** @type {Set<string>} */
        const seen = new Set();
        for (const [client_id] of BOARD_SUBS) {
          for (const issue of sub_issue_stores.snapshotFor(client_id) || []) {
            const labels = /** @type {any} */ (issue).labels;
            if (!Array.isArray(labels)) {
              continue;
            }
            for (const label of labels) {
              if (typeof label === 'string' && label.length > 0) {
                seen.add(label);
              }
            }
          }
        }
        return Array.from(seen).sort();
      }
    });
    try {
      const btn_settings = /** @type {HTMLButtonElement|null} */ (
        document.getElementById('display-settings-btn')
      );
      if (btn_settings) {
        btn_settings.setAttribute('aria-label', '설정');
        btn_settings.setAttribute('title', '설정');
        btn_settings.addEventListener('click', () => settings_dialog.open());
      }
    } catch {
      // ignore missing header
    }

    // One md viewer for the whole shell: the detail panel's Artifacts rows and
    // every stepper spec/plan cell open the SAME overlay, so two documents can
    // never stack on top of each other (spec §4).
    const md_viewer_mount = document.createElement('div');
    md_viewer_mount.className = 'md-viewer-root';
    document.body.appendChild(md_viewer_mount);
    const md_viewer = createMdViewer(md_viewer_mount, {
      getWorkspacePath: () => store.getState().workspace.current?.path
    });

    /**
     * @param {import('./views/board/stepper.js').StepperDoc} doc
     * @param {string} [root_dir] - Workspace the document belongs to; the
     * monitor's cross-repo cards pass their own repo here.
     */
    function openDoc(doc, root_dir) {
      void md_viewer.open(doc.path, {
        missing_state: doc.missing_state,
        ...(root_dir ? { workspace: root_dir } : {})
      });
    }

    // Board view (default tab).
    const board_view = createBoardView(board_root, {
      gotoIssue: (id) => router.gotoIssue(id),
      issueStores: sub_issue_stores,
      transport,
      workerQueueStore: worker_queue_store,
      uiOrderStore: ui_order_store,
      displayPolicyStore: display_policy_store,
      closedRange: closed_range,
      onClosedRangeChange: (range) => {
        void setClosedRange(range);
      },
      onNewIssue: () => new_issue_dialog.open(),
      openDoc
    });

    // Worker console (second tab): candidate lanes + Serial/Parallel queue.
    // NOTE: the Worker route zeroes `selected_id` (its `?issue=` deep link means
    // "select a parent"), so opening the shared detail overlay from Worker (ⓘ /
    // candidate click) must set the selection directly instead of routing.
    const worker_view = createWorkerView(worker_root, {
      transport,
      issueStores: sub_issue_stores,
      queueStore: worker_queue_store,
      sessionLogStore: session_log_store,
      gotoIssue: (id) => store.setState({ selected_id: id }),
      getWorkspacePath: () => store.getState().workspace.current?.path,
      // blocked 칩이 타 레포 blocker를 열 때 쓰는 전환 경로 (UI-u6zf §5.3) —
      // 모니터에 넘기는 것과 같은 함수다.
      switchWorkspace: (root_dir) => handleWorkspaceChange(root_dir),
      openDoc,
      doneRange: worker_done_range,
      onDoneRangeChange: (range) => {
        void setWorkerDoneRange(range);
      }
    });

    // Monitor tab (third tab): the worker pipeline of EVERY visible workspace as
    // five lanes (UI-qrfo). It is the Worker console's cross-repo superset, so
    // it takes the same `transport` — every mutation carries the `root_dir` of
    // the workspace its card belongs to. A card from another repo switches the
    // workspace through the picker's own path before opening the issue.
    const monitor_view = createMonitorView(monitor_root, {
      transport,
      pipelineStore: monitor_pipeline_store,
      execPresetStore: exec_preset_store,
      // 실행 타일의 `▤ 세션`은 Worker 탭과 같은 드로어·같은 라인 스토어를 쓴다
      // (UI-eey2 §7); `root_dir`만 더 실어 다른 레포의 세션도 연다.
      sessionLogStore: session_log_store,
      // 레포 배지·섹션 `Worker ↗` 클릭이 그 레포의 Worker 탭으로 넘어간다 (§11).
      router,
      gotoIssue: (id) => router.gotoIssue(id),
      getWorkspacePath: () => store.getState().workspace.current?.path,
      switchWorkspace: (root_dir) => handleWorkspaceChange(root_dir),
      openDoc
    });

    // 비교 탭 (네 번째 탭, preset-compare §3.1): 프리셋 저장소가 서버 전역이라
    // Monitor와 같은 global 마운트 쪽이고, 요청·응답 한 쌍만 쓰므로 구독이 없다.
    const compare_view = createCompareView(compare_root, {
      transport,
      gotoIssue: (id) => router.gotoIssue(id),
      // 실험 폼의 프리셋 목록은 서버 전역 프리셋 저장소 그대로다 (§4.2).
      execPresetStore: exec_preset_store,
      // 원본 후보는 현재 저장소에 로드된 이슈들이다 — `bench-run-create`가
      // 연결의 워크스페이스에만 쓰기 때문에 후보도 그 워크스페이스여야 한다.
      sourceCandidates: () => {
        /** @type {Map<string, any>} */
        const seen = new Map();
        for (const [client_id] of BOARD_SUBS) {
          for (const issue of sub_issue_stores.snapshotFor(client_id) || []) {
            const id = /** @type {any} */ (issue)?.id;
            if (typeof id === 'string' && id.length > 0 && !seen.has(id)) {
              seen.set(id, issue);
            }
          }
        }
        return Array.from(seen.values());
      }
    });

    // ADR 탭 (다섯 번째 탭, UI-8uz7 §7): 저장소별 ADR 표와 신호를 그린다.
    // 문서 링크·bead 클릭은 Monitor 카드와 같은 경로를 그대로 쓴다.
    createAdrView(adr_root, {
      adrStore: adr_store,
      gotoIssue: (id) => router.gotoIssue(id),
      getWorkspacePath: () => store.getState().workspace.current?.path,
      switchWorkspace: (root_dir) => handleWorkspaceChange(root_dir),
      openDoc
    });

    // Shared detail overlay.
    const detail_panel = createDetailPanel(detail_mount, {
      issueStores: sub_issue_stores,
      transport,
      queueStore: worker_queue_store,
      execPresetStore: exec_preset_store,
      sessionLogStore: session_log_store,
      getWorkspacePath: () => store.getState().workspace.current?.path,
      mdViewer: md_viewer,
      depCandidates: () => {
        const workspaces = monitor_pipeline_store.get();
        if (workspaces === null) {
          return null;
        }
        const workspaces_state = monitor_pipeline_store.getWorkspacesState();
        const s = store.getState();
        // 모니터는 가시 레포 전체, Board·Worker는 현재 레포만 (UI-lx45 §3.2).
        if (s.view === 'monitor') {
          return depCandidateModel(workspaces, workspaces_state);
        }
        const root_dir = s.workspace.current?.path;
        if (!root_dir) {
          return null;
        }
        return depCandidateModel(workspaces, workspaces_state, { root_dir });
      },
      subscribeCandidates: (fn) => monitor_pipeline_store.subscribe(fn),
      onDepChanged: ({ type, a, b }) => {
        // 같은 직렬 레인 멤버 사이의 새 간선은 자동 교정을 다시 돌려야 한다
        // (UI-lx45 §6). 모니터 뷰가 그 메서드를 아직 내보내지 않으면 아무 일도
        // 하지 않는다 — 교정은 뷰의 것이고 여기서 흉내 내지 않는다.
        const view = /** @type {any} */ (monitor_view);
        if (
          type === 'dep-add' &&
          view &&
          typeof view.recorrectSharedLane === 'function'
        ) {
          view.recorrectSharedLane(type, a, b);
        }
      },
      onNavigate: (id, root_dir) => {
        const goto = () => {
          // On the Worker view the router zeroes `selected_id`; keep the overlay
          // navigation working there by setting the selection directly.
          if (store.getState().view === 'worker') {
            store.setState({ selected_id: id });
          } else {
            router.gotoIssue(id);
          }
        };
        const current = store.getState().workspace.current?.path;
        // 타 레포 칩은 전환이 먼저다 (UI-lx45 §4.1, Worker `openBlocker`와 같은
        // 순서) — 아니면 현재 레포에서 없는 ID를 찾는다.
        if (
          typeof root_dir !== 'string' ||
          root_dir.length === 0 ||
          !current ||
          root_dir === current
        ) {
          goto();
          return;
        }
        void Promise.resolve(handleWorkspaceChange(root_dir))
          .then(goto)
          .catch(() => {
            showToast('레포 전환에 실패했습니다', 'error', 2400);
          });
      },
      onClose: () => {
        const s = store.getState();
        store.setState({ selected_id: null });
        try {
          router.gotoView(
            s.view === 'worker' || s.view === 'monitor' ? s.view : 'board'
          );
        } catch {
          // ignore
        }
      },
      onOpenExecPresets: () => {
        settings_dialog.open('execution');
      }
    });

    // Deep-link: open the overlay if a selection is already present.
    const initial_id = store.getState().selected_id;
    if (initial_id) {
      detail_mount.hidden = false;
      detail_panel.load(initial_id);
      scheduleDetailSubscription(initial_id);
    }

    // Open/close the overlay based on the selected id.
    store.subscribe((s) => {
      const id = s.selected_id;
      if (id) {
        detail_mount.hidden = false;
        detail_panel.load(id);
        if (!is_switching_workspace) {
          scheduleDetailSubscription(id);
        }
      } else {
        detail_panel.clear();
        detail_mount.hidden = true;
        resetDetailSubscription();
      }
    });

    /**
     * Manage route visibility and board subscriptions per view.
     *
     * @param {{ selected_id: string | null, view: 'board'|'worker'|'monitor'|'compare'|'adr' }} s
     */
    const onRouteChange = (s) => {
      board_root.hidden = s.view !== 'board';
      worker_root.hidden = s.view !== 'worker';
      monitor_root.hidden = s.view !== 'monitor';
      compare_root.hidden = s.view !== 'compare';
      adr_root.hidden = s.view !== 'adr';
      if (repo_scope_mount) {
        // 비교도 Monitor와 같이 저장소 전체를 보는 탭이라 레포 캡슐이 물러난다.
        repo_scope_mount.classList.toggle(
          'is-quiet',
          s.view === 'monitor' || s.view === 'compare' || s.view === 'adr'
        );
      }
      ensureBoardSubscriptions(s.view === 'board');
      ensureWorkerSubscriptions(s.view === 'worker');
      ensureMonitorPipelineChannel(pipelineChannelWanted(s));
      ensureAdrChannel(s.view === 'adr');
      ensureWorkerQueueChannel(
        s.view === 'board' ||
          s.view === 'worker' ||
          settings_dialog_open ||
          Boolean(s.selected_id)
      );
      if (!s.selected_id && s.view === 'board') {
        void board_view.load();
      }
      if (s.view === 'worker') {
        worker_view.load();
      }
      if (s.view === 'monitor') {
        monitor_view.load();
      } else {
        monitor_view.pause();
      }
      if (s.view === 'compare') {
        compare_view.load();
      } else {
        compare_view.pause();
      }
      window.localStorage.setItem('beads-ui.view', s.view);
    };
    store.subscribe(onRouteChange);
    onRouteChange(store.getState());

    // UI-order is a shared, tab-independent singleton: subscribe once at startup
    // (not from ensureBoard/WorkerSubscriptions) so it survives tab switches.
    subscribeUiOrder();
    subscribeDisplayPolicy();
    subscribeExecPresets();

    // Load workspaces after startup subscriptions can safely resubscribe.
    void loadWorkspaces().finally(() => {
      workspace_bootstrap_done = true;
      resolve_workspace_bootstrap();
    });

    // Keyboard shortcut: Ctrl/Cmd+N opens the new-issue dialog.
    window.addEventListener('keydown', (ev) => {
      const is_modifier = ev.ctrlKey || ev.metaKey;
      const key = String(ev.key || '').toLowerCase();
      const target = /** @type {HTMLElement} */ (ev.target);
      const tag =
        target && target.tagName ? String(target.tagName).toLowerCase() : '';
      const is_editable =
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        (target &&
          typeof target.isContentEditable === 'boolean' &&
          target.isContentEditable);
      if (is_modifier && key === 'n') {
        if (!is_editable) {
          ev.preventDefault();
          new_issue_dialog.open();
        }
      }
    });
  }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    // Initialize theme from saved preference or OS preference.
    try {
      const saved = window.localStorage.getItem('beads-ui.theme');
      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial =
        saved === 'dark' || saved === 'light'
          ? saved
          : prefersDark
            ? 'dark'
            : 'light';
      document.documentElement.setAttribute('data-theme', initial);
      const sw = /** @type {HTMLInputElement|null} */ (
        document.getElementById('theme-switch')
      );
      if (sw) {
        sw.checked = initial === 'dark';
      }
    } catch {
      // ignore theme init errors
    }

    // Wire up theme switch in header.
    const themeSwitch = /** @type {HTMLInputElement|null} */ (
      document.getElementById('theme-switch')
    );
    if (themeSwitch) {
      themeSwitch.addEventListener('change', () => {
        const mode = themeSwitch.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', mode);
        window.localStorage.setItem('beads-ui.theme', mode);
      });
    }

    /** @type {HTMLElement|null} */
    const app_root = document.getElementById('app');
    if (app_root) {
      bootstrap(app_root);
    }
  });
}
