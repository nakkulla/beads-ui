/**
 * The shell's WebSocket channel lifecycle (UI-dbn6 §4.2, §5.1): push routing
 * into the stores, and the subscriptions the open surfaces need.
 *
 * - server-global: `monitor-pipeline`, `impl-presets`, `model-visibility`
 *   (opened at boot and after a reconnect);
 * - connected-workspace: `worker-queue` (레포 scope, open detail or settings),
 *   the issue detail, the 레포 scope's closed/deferred lists, and ADR.
 *
 * A keyed-patch sequence mismatch unsubscribes and resubscribes once and
 * ignores patches until the recovery snapshot; a rejected recovery opens the
 * fatal dialog. The caller decides WHAT is wanted (`wants()`); this module
 * owns WHETHER a subscription is open.
 */
/** `subscribe-adr` / `unsubscribe-adr` payload id. */
export const ADR_SNAPSHOT_KEY = 'adr:snapshot';
/** Client id of the server-global monitor pipeline subscription. */
export const MONITOR_PIPELINE_KEY = 'tab:monitor:pipeline';
const WORKER_QUEUE_CLIENT_ID = 'worker:queue';
const EXEC_PRESETS_CLIENT_ID = 'exec:presets';
const MODEL_VISIBILITY_CLIENT_ID = 'model-visibility';
export const CLOSED_CLIENT_ID = 'pipeline:closed';
export const DEFERRED_CLIENT_ID = 'pipeline:deferred';

/**
 * @typedef {Object} ChannelWants
 * @property {boolean} enabled - False before boot and while a switch is in flight.
 * @property {boolean} repo - The 레포 scope stands on the connected repo.
 * @property {boolean} queue - The worker queue is wanted.
 * @property {boolean} adr
 * @property {string|null} detail_id
 */

/**
 * @typedef {Object} ChannelDeps
 * @property {any} client - `createWsClient()` result.
 * @property {(type: string, payload?: unknown) => Promise<any>} send - The
 * activity-tracked send.
 * @property {any} subscriptions - `createSubscriptionStore()` result.
 * @property {{ monitor: any, queue: any, presets: any, visibility: any, sessionLog: any, issues: any, adr: { set: (value: { workspaces: any[] }) => void } }} stores
 * @property {() => string|null} connectedPath
 * @property {() => ChannelWants} wants
 * @property {() => string|null} selectedId
 * @property {(err: unknown, context: string) => void} showFatal
 * @property {(format: string, ...args: unknown[]) => void} log
 */

/**
 * @param {ChannelDeps} deps
 */
export function createChannels(deps) {
  const { client, send, stores, log } = deps;

  let monitor_sub = false;
  let monitor_generation = 0;
  let monitor_recovering = false;
  let presets_sub = false;
  let visibility_sub = false;
  let queue_sub = false;
  let queue_generation = 0;
  let queue_recovering = false;
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
  /** @type {null|(() => Promise<void>)} */
  let detail_unsub = null;
  /** @type {string|null} */
  let detail_key = null;

  function notifyLists() {
    for (const fn of Array.from(list_listeners)) {
      try {
        fn();
      } catch {
        // one broken listener must not stop the others
      }
    }
  }

  // --- push routing ---------------------------------------------------------

  client.on('monitor-pipeline-snapshot', (/** @type {any} */ p) => {
    if (p && Array.isArray(p.workspaces)) {
      stores.monitor.set(p.workspaces, p.workspaces_state, p.seq);
      monitor_recovering = false;
    }
  });
  client.on('monitor-pipeline-patch', (/** @type {any} */ p) => {
    if (!p || monitor_recovering) {
      return;
    }
    if (!stores.monitor.applyPatch(p)) {
      log('monitor-pipeline patch sequence mismatch; resubscribing');
      if (monitor_sub) {
        monitor_sub = false;
        monitor_generation += 1;
        void send('unsubscribe-monitor-pipeline', {
          id: MONITOR_PIPELINE_KEY
        }).catch(() => {});
      }
      monitor_recovering = true;
      ensureMonitorPipeline();
    }
  });
  client.on('worker-queue-snapshot', (/** @type {any} */ p) => {
    const current = deps.connectedPath();
    // An unknown workspace drops nothing: before one is known the snapshot
    // can only be this connection's own.
    if (!p || !p.queue || (current && p.root_dir !== current)) {
      return;
    }
    stores.queue.setSnapshot(p);
    queue_recovering = false;
  });
  client.on('worker-queue-patch', (/** @type {any} */ p) => {
    const current = deps.connectedPath();
    if (!p || queue_recovering || (current && p.root_dir !== current)) {
      return;
    }
    if (!stores.queue.applyPatch(p)) {
      log('worker-queue patch sequence mismatch; resubscribing');
      if (queue_sub) {
        queue_sub = false;
        queue_generation += 1;
        void send('unsubscribe-worker-queue', {
          id: WORKER_QUEUE_CLIENT_ID
        }).catch(() => {});
      }
      queue_recovering = true;
      sync();
    }
  });
  client.on('impl-presets-snapshot', (/** @type {any} */ p) => {
    if (p && typeof p.revision === 'number' && Array.isArray(p.presets)) {
      stores.presets.set({
        revision: p.revision,
        presets: p.presets,
        chip_bindings: p.chip_bindings
      });
    }
  });
  client.on('model-visibility-snapshot', (/** @type {any} */ p) => {
    if (
      p &&
      typeof p.revision === 'number' &&
      Array.isArray(p.disabled_models) &&
      p.runners &&
      typeof p.runners === 'object'
    ) {
      stores.visibility.set({
        revision: p.revision,
        disabled_models: p.disabled_models,
        runners: p.runners
      });
    }
  });
  client.on('adr-snapshot', (/** @type {any} */ p) => {
    if (p && Array.isArray(p.workspaces)) {
      stores.adr.set({ workspaces: p.workspaces });
    }
  });
  client.on('session-log-snapshot', (/** @type {any} */ p) => {
    if (p && typeof p.id === 'string') {
      stores.sessionLog.set(
        p.id,
        Array.isArray(p.lines) ? p.lines : [],
        typeof p.last_event_at === 'number' ? p.last_event_at : null
      );
    }
  });
  client.on('session-log-append', (/** @type {any} */ p) => {
    if (p && typeof p.id === 'string') {
      stores.sessionLog.append(p.id, p.event);
    }
  });
  // One handler per list push type: it feeds the subscription's store and,
  // for the pipeline's closed/deferred lists, tells the screen to re-read.
  for (const type of ['snapshot', 'upsert', 'delete']) {
    client.on(type, (/** @type {any} */ p) => {
      const id = p && typeof p.id === 'string' ? p.id : '';
      const target = id ? stores.issues.getStore(id) : null;
      if (target && p.type === type) {
        try {
          target.applyPush(p);
        } catch {
          // a malformed push must not break the others
        }
      }
      if (id === CLOSED_CLIENT_ID || id === DEFERRED_CLIENT_ID) {
        notifyLists();
      }
    });
  }

  // --- server-global channels ---------------------------------------------

  function ensureMonitorPipeline() {
    if (monitor_sub) {
      return;
    }
    monitor_sub = true;
    const recovering = monitor_recovering;
    const generation = (monitor_generation += 1);
    void send('subscribe-monitor-pipeline', { id: MONITOR_PIPELINE_KEY }).catch(
      (err) => {
        log('subscribe-monitor-pipeline failed: %o', err);
        if (generation === monitor_generation) {
          monitor_sub = false;
          if (recovering) {
            deps.showFatal(err, 'pipeline');
          }
        }
      }
    );
  }

  function ensureGlobalChannels() {
    if (!presets_sub) {
      presets_sub = true;
      void send('subscribe-impl-presets', { id: EXEC_PRESETS_CLIENT_ID }).catch(
        () => {
          presets_sub = false;
        }
      );
    }
    if (!visibility_sub) {
      visibility_sub = true;
      void send('subscribe-model-visibility', {
        id: MODEL_VISIBILITY_CLIENT_ID
      }).catch(() => {
        stores.visibility.clear();
        visibility_sub = false;
      });
    }
  }

  // --- connected-workspace channels -----------------------------------------

  /** @param {boolean} wanted */
  function setWorkerQueue(wanted) {
    if (wanted && !queue_sub) {
      queue_sub = true;
      const recovering = queue_recovering;
      const generation = (queue_generation += 1);
      void send('subscribe-worker-queue', { id: WORKER_QUEUE_CLIENT_ID }).catch(
        (err) => {
          log('subscribe-worker-queue failed: %o', err);
          if (generation === queue_generation) {
            queue_sub = false;
            if (recovering) {
              deps.showFatal(err, 'worker');
            }
          }
        }
      );
    } else if (!wanted && queue_sub) {
      queue_sub = false;
      queue_recovering = false;
      queue_generation += 1;
      void send('unsubscribe-worker-queue', {
        id: WORKER_QUEUE_CLIENT_ID
      }).catch(() => {});
      stores.queue.clear();
    }
  }

  /** @param {boolean} wanted */
  function setAdr(wanted) {
    if (wanted && !adr_sub) {
      adr_sub = true;
      void send('subscribe-adr', { id: ADR_SNAPSHOT_KEY }).catch(() => {
        adr_sub = false;
      });
    } else if (!wanted && adr_sub) {
      adr_sub = false;
      void send('unsubscribe-adr', { id: ADR_SNAPSHOT_KEY }).catch(() => {});
    }
  }

  /**
   * @param {string} client_id
   * @param {{ type: string, params?: Record<string, string|number|boolean> }} spec
   * @returns {Promise<(() => Promise<void>)|null>}
   */
  async function openList(client_id, spec) {
    try {
      stores.issues.register(client_id, spec);
      const unsub = await deps.subscriptions.subscribeList(client_id, spec);
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
      stores.issues.unregister(client_id);
    } catch {
      // never registered
    }
    notifyLists();
  }

  /**
   * Open or close the 레포 scope's closed/deferred lists to match the
   * screen's wants.
   *
   * @param {boolean} repo
   */
  async function syncLists(repo) {
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

  function resetDetail() {
    if (detail_unsub) {
      void detail_unsub().catch(() => {});
      detail_unsub = null;
    }
    const id = deps.selectedId();
    if (id) {
      try {
        stores.issues.unregister(`detail:${id}`);
      } catch {
        // never registered
      }
    }
    detail_key = null;
  }

  /** @param {string} id */
  function scheduleDetail(id) {
    const key = `${deps.connectedPath() || ''}\u0000${id}`;
    if (key === detail_key) {
      return;
    }
    detail_key = key;
    const client_id = `detail:${id}`;
    const spec = { type: 'issue-detail', params: { id } };
    try {
      stores.issues.register(client_id, spec);
    } catch (err) {
      log('register detail store failed: %o', err);
    }
    void deps.subscriptions
      .subscribeList(client_id, spec)
      .then(async (/** @type {() => Promise<void>} */ unsub) => {
        if (detail_key !== key || deps.selectedId() !== id) {
          await unsub().catch(() => {});
          return;
        }
        if (detail_unsub) {
          await detail_unsub().catch(() => {});
        }
        detail_unsub = unsub;
      })
      .catch((/** @type {unknown} */ err) => {
        log('detail subscribe failed: %o', err);
        if (detail_key === key) {
          detail_key = null;
        }
        deps.showFatal(err, 'issue details');
      });
  }

  /** Bring every connected-workspace subscription in line with `wants()`. */
  function sync() {
    const wants = deps.wants();
    if (!wants.enabled) {
      return;
    }
    setWorkerQueue(wants.queue);
    setAdr(wants.adr);
    if (wants.detail_id) {
      scheduleDetail(wants.detail_id);
    }
    void syncLists(wants.repo);
  }

  return {
    /** Open the server-global channels (boot and reconnect). */
    openGlobal() {
      ensureMonitorPipeline();
      ensureGlobalChannels();
    },
    sync,
    resetDetail,
    /**
     * The server dropped the workspace-bound subscriptions with the old
     * workspace: forget them so the next sync reopens what is still open.
     */
    releaseWorkspace() {
      stores.queue.clear();
      queue_sub = false;
      resetDetail();
      closed_sub = null;
      deferred_sub = false;
      deferred_unsub = null;
      notifyLists();
    },
    /** A new socket holds no subscription: forget every one. */
    forgetAll() {
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
      stores.presets.clear();
    },
    /**
     * The pipeline screen's list wants.
     *
     * @param {{ closed: boolean, closed_since: number|null|undefined, deferred: boolean }} wants
     */
    setListWants(wants) {
      list_wants = wants;
      sync();
    },
    lists: {
      /** @returns {any[]} */
      closed: () => stores.issues.snapshotFor(CLOSED_CLIENT_ID) || [],
      /** @returns {any[]} */
      deferred: () => stores.issues.snapshotFor(DEFERRED_CLIENT_ID) || [],
      /**
       * @param {() => void} fn
       * @returns {() => void}
       */
      subscribe(fn) {
        list_listeners.add(fn);
        return () => list_listeners.delete(fn);
      }
    }
  };
}
