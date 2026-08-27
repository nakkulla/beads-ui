/**
 * @import { WebSocket } from 'ws'
 */
import { fetchListForSubscription } from '../list-adapters.js';
import { keyOf } from '../subscriptions.js';
import { onForeignBlockerResolved } from '../worker/foreign-blocker-status.js';
import { signalWorkspaceSnapshotMutation } from '../workspace-snapshot-runtime.js';
import {
  applyClosedIssuesFilter,
  emitSubscriptionDelete,
  emitSubscriptionSnapshot,
  emitSubscriptionUpsert,
  ensureSubs,
  getConnWorkspace,
  getCurrentWss,
  log,
  registryFor,
  setCachedSnapshot
} from './context.js';

/**
 * Debounced refresh scheduling for active list subscriptions.
 * A trailing window coalesces rapid change bursts into a single refresh run.
 */
/** @type {ReturnType<typeof setTimeout> | null} */
let REFRESH_TIMER = null;
let REFRESH_DEBOUNCE_MS = 75;

/**
 * Override the trailing debounce window used to coalesce list refreshes.
 * Called once from `attachWsServer` when `options.refresh_debounce_ms` is set.
 *
 * @param {number} n
 */
export function setRefreshDebounceMs(n) {
  if (Number.isFinite(n) && n >= 0) {
    REFRESH_DEBOUNCE_MS = n;
  }
}

/**
 * Mutation refresh window gate. When active, watcher-driven list refresh
 * scheduling is suppressed. The gate resolves either when a watcher event
 * arrives (via scheduleListRefresh) or when a timeout elapses, at which
 * point a single refresh pass over all active list subscriptions is run.
 */
/**
 * @typedef {Object} MutationGate
 * @property {boolean} resolved
 * @property {(reason: 'watcher'|'timeout') => void} resolve
 * @property {ReturnType<typeof setTimeout>} timer
 */
/** @type {MutationGate | null} */
let MUTATION_GATE = null;

/**
 * Start a mutation window gate if not already active. The gate resolves on the
 * next watcher event or after `timeout_ms`, then triggers a single refresh run
 * across all active list subscriptions. Watcher-driven refresh scheduling is
 * suppressed during the window.
 *
 * Fire-and-forget; callers should not await this.
 *
 * @param {WebSocket | number | undefined} [ws_or_timeout]
 * @param {number} [timeout_ms]
 */
export function triggerMutationRefreshOnce(
  ws_or_timeout = undefined,
  timeout_ms = 500
) {
  const ws =
    typeof ws_or_timeout === 'number' || ws_or_timeout === undefined
      ? undefined
      : ws_or_timeout;
  const delay = typeof ws_or_timeout === 'number' ? ws_or_timeout : timeout_ms;
  const root_dir = ws ? getConnWorkspace(ws)?.root_dir : undefined;
  signalWorkspaceSnapshotMutation(root_dir);
  if (MUTATION_GATE) {
    return;
  }
  /** @type {(r: 'watcher'|'timeout') => void} */
  let doResolve = () => {};
  const p = new Promise((resolve) => {
    doResolve = resolve;
  });
  MUTATION_GATE = {
    resolved: false,
    resolve: (reason) => {
      if (!MUTATION_GATE || MUTATION_GATE.resolved) {
        return;
      }
      MUTATION_GATE.resolved = true;
      try {
        doResolve(reason);
      } catch {
        // ignore resolve errors
      }
    },
    timer: setTimeout(() => {
      try {
        MUTATION_GATE?.resolve('timeout');
      } catch {
        // ignore
      }
    }, delay)
  };
  MUTATION_GATE.timer.unref?.();

  // After resolution, run a single refresh across active subs and clear gate
  void p.then(async () => {
    log('mutation window resolved → refresh active subs');
    try {
      await refreshAllActiveListSubscriptions('mutation');
    } catch {
      // ignore refresh errors
    } finally {
      try {
        if (MUTATION_GATE?.timer) {
          clearTimeout(MUTATION_GATE.timer);
        }
      } catch {
        // ignore
      }
      MUTATION_GATE = null;
    }
  });
}

/**
 * Collect unique active list subscriptions across all connected clients,
 * scoped to each connection's workspace. De-duplicated by the
 * (`root_dir` + `key`) pair so the same spec in two different workspaces is
 * refreshed independently (each with its own cwd) instead of being collapsed
 * into a single workspace's data.
 *
 * @returns {Array<{ root_dir: string, spec: { type: string, params?: Record<string,string|number|boolean> }, key: string }>}
 */
function collectActiveListSubscriptions() {
  /** @type {Array<{ root_dir: string, spec: { type: string, params?: Record<string,string|number|boolean> }, key: string }>} */
  const pairs = [];
  /** @type {Set<string>} */
  const seen = new Set();
  const wss = getCurrentWss();
  if (!wss) {
    return pairs;
  }
  for (const ws of wss.clients) {
    if (ws.readyState !== ws.OPEN) {
      continue;
    }
    const s = ensureSubs(/** @type {any} */ (ws));
    if (!s.list_subs) {
      continue;
    }
    const root_dir = getConnWorkspace(/** @type {any} */ (ws))?.root_dir || '';
    for (const { key, spec } of s.list_subs.values()) {
      const dedupe_key = `${root_dir}\0${key}`;
      if (!seen.has(dedupe_key)) {
        seen.add(dedupe_key);
        pairs.push({ root_dir, spec, key });
      }
    }
  }
  return pairs;
}

/**
 * Record one watcher mutation signal for each affected workspace before its
 * active specs join the shared refresh generation.
 *
 * @param {string | undefined} root_dir
 */
function signalWatcherMutation(root_dir) {
  if (root_dir !== undefined) {
    signalWorkspaceSnapshotMutation(root_dir);
    return;
  }
  /** @type {Set<string>} */
  const root_dirs = new Set();
  for (const pair of collectActiveListSubscriptions()) {
    root_dirs.add(pair.root_dir);
  }
  for (const active_root_dir of root_dirs) {
    signalWorkspaceSnapshotMutation(active_root_dir);
  }
}

/**
 * Run refresh for all active (workspace, spec) pairs and publish deltas.
 */
async function refreshAllActiveListSubscriptions(cause = 'poll') {
  const pairs = collectActiveListSubscriptions();
  // Run refreshes concurrently; locking is handled per key per registry
  await Promise.all(
    pairs.map(async ({ root_dir, spec }) => {
      try {
        await refreshAndPublish(root_dir, spec, cause);
      } catch {
        // ignore refresh errors per (workspace, spec) pair
      }
    })
  );
}

/**
 * Schedule a coalesced refresh of all active list subscriptions.
 *
 * @param {string} [cause]
 * @param {string} [root_dir]
 */
export function scheduleListRefresh(cause = 'watcher', root_dir = undefined) {
  if (cause === 'watcher') {
    signalWatcherMutation(root_dir);
  }
  // Suppress watcher-driven refreshes during an active mutation gate; resolve gate once
  if (MUTATION_GATE) {
    try {
      MUTATION_GATE.resolve('watcher');
    } catch {
      // ignore
    }
    return;
  }
  if (REFRESH_TIMER) {
    clearTimeout(REFRESH_TIMER);
  }
  REFRESH_TIMER = setTimeout(() => {
    REFRESH_TIMER = null;
    // Fire and forget; callers don't await scheduling
    void refreshAllActiveListSubscriptions(cause);
  }, REFRESH_DEBOUNCE_MS);
  REFRESH_TIMER.unref?.();
}

/**
 * Re-run the list subscriptions of every workspace that was WAITING on a
 * cross-rig lookup (UI-d13v §3.7).
 *
 * The Ready/Blocked decorations read the foreign blocker cache, so a lookup
 * landing on `closed` is a change to what those rows say — and until now only
 * the Worker queue and the Monitor channel listened (UI-u6zf §3.3), leaving the
 * list subscriptions showing the pre-lookup answer until something unrelated
 * moved them. The requester set is the workspace holding the blocked bead, never
 * the rig that owns the blocker.
 *
 * @param {Set<string>} requesters
 * @param {(cause: string, root_dir: string) => void} [schedule] - Seam; the live scheduler by default.
 */
export function refreshForeignBlockerRequesters(
  requesters,
  schedule = scheduleListRefresh
) {
  for (const root_dir of requesters) {
    try {
      schedule('foreign-blocker', root_dir);
    } catch (err) {
      log('foreign blocker list refresh failed for %s: %o', root_dir, err);
    }
  }
}

onForeignBlockerResolved((requesters) => {
  refreshForeignBlockerRequesters(requesters);
});

/**
 * Run a refresh in the background for a subscription spec in a workspace.
 *
 * @param {string} root_dir
 * @param {{ type: string, params?: Record<string, string|number|boolean> }} spec
 */
export function scheduleBackgroundRefresh(root_dir, spec) {
  void refreshAndPublish(root_dir, spec, 'background-subscribe').catch(
    (err) => {
      log('background refresh failed for %s: %o', keyOf(spec), err);
    }
  );
}

/**
 * Refresh a subscription spec within a workspace: fetch via adapter (cwd =
 * `root_dir`), apply to that workspace's registry and emit per-subscription
 * full-issue envelopes ONLY to subscribers currently in that workspace.
 * Serialized per key within the workspace registry.
 *
 * @param {string} root_dir
 * @param {{ type: string, params?: Record<string, string|number|boolean> }} spec
 */
export async function refreshAndPublish(root_dir, spec, cause = 'poll') {
  const reg = registryFor(root_dir);
  const gen = reg.generation;
  const key = keyOf(spec);
  await reg.withKeyLock(key, async () => {
    if (reg.generation !== gen) {
      return;
    }
    /** @type {Awaited<ReturnType<typeof fetchListForSubscription>>} */
    let res;
    try {
      res = await fetchListForSubscription(spec, {
        cwd: root_dir || undefined,
        workspace_snapshot: String(spec.type) !== 'issue-detail',
        snapshot_cause: cause
      });
    } catch (error) {
      log(
        'snapshot projection failed workspace=%s key=%s cause=%s: %o',
        root_dir,
        key,
        cause,
        error
      );
      return;
    }
    if (!res.ok) {
      log('refresh failed for %s: %s %o', key, res.error.message, res.error);
      return;
    }
    if (res.stale) {
      log('refresh retained stale snapshot for %s', key);
      return;
    }
    if (reg.generation !== gen) {
      return;
    }
    const items = applyClosedIssuesFilter(spec, res.items);
    const prev_size = reg.get(key)?.itemsById.size || 0;
    const delta = reg.applyItems(key, items);
    setCachedSnapshot(root_dir, key, items);
    const entry = reg.get(key);
    if (!entry || entry.subscribers.size === 0) {
      return;
    }
    /** @type {Map<string, any>} */
    const by_id = new Map();
    for (const it of items) {
      if (it && typeof it.id === 'string') {
        by_id.set(it.id, it);
      }
    }
    for (const ws of entry.subscribers) {
      if (ws.readyState !== ws.OPEN) continue;
      const s = ensureSubs(ws);
      const subs = s.list_subs || new Map();
      /** @type {string[]} */
      const client_ids = [];
      for (const [cid, v] of subs.entries()) {
        if (v.key === key) client_ids.push(cid);
      }
      if (client_ids.length === 0) continue;
      if (prev_size === 0) {
        for (const cid of client_ids) {
          emitSubscriptionSnapshot(ws, cid, key, items);
        }
        continue;
      }
      for (const cid of client_ids) {
        for (const id of [...delta.added, ...delta.updated]) {
          const issue = by_id.get(id);
          if (issue) {
            emitSubscriptionUpsert(ws, cid, key, issue);
          }
        }
        for (const id of delta.removed) {
          emitSubscriptionDelete(ws, cid, key, id);
        }
      }
    }
  });
}
