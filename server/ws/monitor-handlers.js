/**
 * WebSocket handlers for the monitor-pipeline channel (UI-nprg).
 *
 * The monitor tab answers ONE question — "worker 탭에 올린 이슈들이 전체 활성
 * 레포에서 어떻게 진행되고 있는가" — so unlike every other channel here this
 * subscription is SERVER-GLOBAL: it is not scoped to the connection's current
 * workspace and survives `set-workspace`. Each push carries a full snapshot of
 * every visible workspace's worker pipeline; there are no partial patches.
 *
 * The per-workspace payload is built by the worker channel's own
 * {@link decorateQueue}, not by a second assembly path, so both channels ship
 * the identical decorated contract and a decoration added there appears here
 * for free.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import path from 'node:path';
import { makeError, makeOk } from '../../app/protocol.js';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import { sharedVisibleWorkspacesStore } from '../visible-workspaces-store.js';
import { refreshWorkerExternalPrs } from '../worker/attach.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { emitMonitorPipelineSnapshot, log } from './context.js';
import {
  decorateQueue,
  onWorkerSnapshotRefresh,
  workerQueueSubscriberCount
} from './worker-handlers.js';

/**
 * Coalescing window for recomputation. Every workspace's queue events land on
 * this one aggregation, so a burst — a dispatch that touches two repos, a
 * registry rewrite, a fill fanout — must collapse into a single rebuild rather
 * than one full cross-repo scan per event.
 */
const PUSH_DEBOUNCE_MS = 250;

/**
 * Server-global subscriber set. No workspace key: a monitor subscription is one
 * per connection for the whole server.
 *
 * @type {Set<{ ws: WebSocket, client_id: string }>}
 */
const SUBSCRIBERS = new Set();

/** @type {ReturnType<typeof setTimeout> | null} */
let push_timer = null;

/** @type {(() => void) | null} */
let refresh_unsubscribe = null;

/**
 * Local midnight of the day `now` falls in — the retention boundary the `done`
 * lane is filtered on.
 *
 * The lane itself keeps its full history (the Worker tab filters client-side
 * over a chosen period), so "완료·오늘" is an AGGREGATION-time filter here and
 * `queue.json` is untouched.
 *
 * @param {number} now
 * @returns {number}
 */
export function startOfLocalDay(now) {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/**
 * Whether a workspace still has anything worth a monitor row.
 *
 * Evaluated AFTER the `done` filter, so a workspace whose only history is
 * yesterday's completions drops out entirely instead of rendering an empty
 * repo badge.
 *
 * @param {Record<string, any>} snapshot - Decorated snapshot with the filtered `done`.
 * @returns {boolean}
 */
function hasPipeline(snapshot) {
  const lanes = ['queue', 'pr_wait', 'done'];
  for (const lane of lanes) {
    if (Array.isArray(snapshot[lane]) && snapshot[lane].length > 0) {
      return true;
    }
  }
  const attempts = snapshot.attempts || {};
  for (const attempt of Object.values(attempts)) {
    if (attempt && /** @type {any} */ (attempt).status === 'running') {
      return true;
    }
  }
  return false;
}

/**
 * Build the cross-workspace pipeline payload.
 *
 * Fail-quiet per workspace (UI-nprg §에러 처리): one repo whose snapshot or
 * decoration throws is dropped with a log line, never propagated — a single
 * broken checkout must not blank the whole monitor.
 *
 * @param {{
 *   listWorkspaces?: () => Array<{ path: string }>,
 *   listHidden?: () => string[],
 *   snapshotFor?: (workspace_key: string) => Record<string, unknown>,
 *   now?: () => number
 * }} [options] - Test seams; each defaults to the live server source.
 * @returns {Array<Record<string, unknown>>}
 */
export function buildMonitorPipeline(options = {}) {
  const listWorkspaces = options.listWorkspaces || getAvailableWorkspaces;
  const listHidden =
    options.listHidden || (() => sharedVisibleWorkspacesStore().listHidden());
  const snapshotFor =
    options.snapshotFor ||
    ((/** @type {string} */ key) =>
      decorateQueue(key, getWorkerRuntime().queueStore.snapshot(key)));
  const nowFn = options.now || (() => Date.now());

  /** @type {Set<string>} */
  let hidden = new Set();
  try {
    hidden = new Set(listHidden().map((p) => path.resolve(p)));
  } catch (err) {
    log('monitor: hidden set unreadable: %o', err);
    hidden = new Set();
  }

  /** @type {Array<{ path: string }>} */
  let workspaces = [];
  try {
    workspaces = listWorkspaces();
  } catch (err) {
    log('monitor: workspace list unreadable: %o', err);
    return [];
  }

  const day_start = startOfLocalDay(nowFn());
  /** @type {Array<Record<string, unknown>>} */
  const out = [];
  /** @type {Set<string>} */
  const seen = new Set();

  for (const workspace of workspaces) {
    const root_dir = path.resolve(String(workspace?.path || ''));
    if (root_dir.length === 0 || hidden.has(root_dir) || seen.has(root_dir)) {
      continue;
    }
    seen.add(root_dir);
    /** @type {Record<string, any>} */
    let decorated;
    try {
      decorated = /** @type {Record<string, any>} */ (snapshotFor(root_dir));
    } catch (err) {
      log('monitor: snapshot failed for %s: %o', root_dir, err);
      continue;
    }
    if (!decorated) {
      continue;
    }
    const done = Array.isArray(decorated.done)
      ? decorated.done.filter(
          (/** @type {any} */ entry) =>
            entry &&
            typeof entry.added_at === 'number' &&
            entry.added_at >= day_start
        )
      : [];
    const projected = { ...decorated, done };
    if (!hasPipeline(projected)) {
      continue;
    }
    out.push({
      ...projected,
      root_dir,
      name: path.basename(root_dir)
    });
  }
  return out;
}

/**
 * Push a freshly built snapshot to every subscriber.
 */
function pushNow() {
  if (SUBSCRIBERS.size === 0) {
    return;
  }
  let workspaces = /** @type {Array<Record<string, unknown>>} */ ([]);
  try {
    workspaces = buildMonitorPipeline();
  } catch (err) {
    log('monitor: pipeline build failed: %o', err);
    return;
  }
  for (const sub of SUBSCRIBERS) {
    emitMonitorPipelineSnapshot(sub.ws, sub.client_id, workspaces);
  }
}

/**
 * Schedule a coalesced rebuild + push.
 */
function schedulePush() {
  if (SUBSCRIBERS.size === 0) {
    return;
  }
  if (push_timer !== null) {
    return;
  }
  push_timer = setTimeout(() => {
    push_timer = null;
    pushNow();
  }, PUSH_DEBOUNCE_MS);
  push_timer.unref?.();
}

/**
 * Attach the queue-refresh observer exactly once, and only while somebody is
 * watching: with no monitor subscriber the aggregation has nothing to feed.
 */
function ensureRefreshWired() {
  if (refresh_unsubscribe) {
    return;
  }
  refresh_unsubscribe = onWorkerSnapshotRefresh(() => {
    schedulePush();
  });
}

/**
 * Kick the external-PR registry for every visible workspace and push once the
 * scans land.
 *
 * The registry is only as fresh as the last scan, and the poller has never
 * looked at a workspace nobody had the Worker tab open on — without this a
 * newly subscribed monitor would silently miss the PR-wait rows of every other
 * repo. Deliberately not awaited: a slow `bd list` must not delay the first
 * snapshot.
 */
function refreshExternalPrsForVisible() {
  /** @type {Array<Record<string, unknown>>} */
  let workspaces = [];
  try {
    workspaces = buildMonitorPipeline();
  } catch (err) {
    log('monitor: external refresh skipped: %o', err);
    return;
  }
  for (const workspace of workspaces) {
    const root_dir = String(workspace.root_dir || '');
    if (root_dir.length === 0) {
      continue;
    }
    void refreshWorkerExternalPrs(root_dir)
      .then((scanned) => {
        if (scanned) {
          schedulePush();
        }
      })
      .catch((err) => {
        log('monitor: external PR refresh failed for %s: %o', root_dir, err);
      });
  }
}

/**
 * How much PR-poll demand a workspace carries (UI-nprg §서버 설계).
 *
 * The poller was gated on the per-workspace worker-queue subscriber count
 * alone; a monitor-only viewer holds NO such subscription, so every repo's PR
 * observations would stay unpolled while the dashboard claimed to show PR-wait
 * state. A live monitor subscriber therefore contributes one unit of demand to
 * every VISIBLE workspace — hidden ones stay unpolled, since nothing renders
 * them.
 *
 * @param {string} workspace_key
 * @returns {number}
 */
export function pollDemandFor(workspace_key) {
  const key = path.resolve(String(workspace_key || ''));
  let demand = workerQueueSubscriberCount(key);
  if (SUBSCRIBERS.size === 0) {
    return demand;
  }
  try {
    const hidden = new Set(
      sharedVisibleWorkspacesStore()
        .listHidden()
        .map((p) => path.resolve(p))
    );
    if (!hidden.has(key)) {
      demand += 1;
    }
  } catch (err) {
    log('monitor: poll demand visibility check failed: %o', err);
  }
  return demand;
}

/**
 * How many clients are watching the aggregated pipeline.
 *
 * @returns {number}
 */
export function monitorPipelineSubscriberCount() {
  return SUBSCRIBERS.size;
}

/**
 * Registry-change trigger (wired from the server entrypoint, which already owns
 * the single registry watcher).
 */
export function notifyMonitorRegistryChanged() {
  refreshExternalPrsForVisible();
  schedulePush();
}

/**
 * Visibility-toggle trigger: the visible set IS the monitor's scope, and a repo
 * that just became visible has never been polled.
 */
export function notifyMonitorVisibilityChanged() {
  refreshExternalPrsForVisible();
  schedulePush();
}

/**
 * Handle `subscribe-monitor-pipeline`. Payload: `{ id: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeMonitorPipeline(ws, req) {
  const client_id = /** @type {any} */ (req.payload)?.id;
  if (typeof client_id !== 'string' || client_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload.id must be a non-empty string')
      )
    );
    return;
  }
  // Re-subscribing the same (ws, client_id) is idempotent.
  for (const sub of SUBSCRIBERS) {
    if (sub.ws === ws && sub.client_id === client_id) {
      SUBSCRIBERS.delete(sub);
    }
  }
  SUBSCRIBERS.add({ ws, client_id });
  ensureRefreshWired();
  log('subscribe-monitor-pipeline %s', client_id);
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));

  let workspaces = /** @type {Array<Record<string, unknown>>} */ ([]);
  try {
    workspaces = buildMonitorPipeline();
  } catch (err) {
    log('monitor: initial pipeline build failed: %o', err);
  }
  emitMonitorPipelineSnapshot(ws, client_id, workspaces);
  refreshExternalPrsForVisible();
}

/**
 * Handle `unsubscribe-monitor-pipeline`. Payload: `{ id: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeMonitorPipeline(ws, req) {
  const client_id = /** @type {any} */ (req.payload)?.id;
  let removed = false;
  for (const sub of SUBSCRIBERS) {
    if (sub.ws === ws && sub.client_id === client_id) {
      SUBSCRIBERS.delete(sub);
      removed = true;
    }
  }
  ws.send(
    JSON.stringify(makeOk(req, { id: client_id, unsubscribed: removed }))
  );
}

/**
 * Detach a connection from the monitor channel (close hook).
 *
 * @param {WebSocket} ws
 */
export function detachMonitorPipeline(ws) {
  for (const sub of SUBSCRIBERS) {
    if (sub.ws === ws) {
      SUBSCRIBERS.delete(sub);
    }
  }
}

/**
 * Test-only: drop subscribers and any pending push.
 */
export function __resetMonitorPipelineForTest() {
  SUBSCRIBERS.clear();
  if (push_timer !== null) {
    clearTimeout(push_timer);
    push_timer = null;
  }
  if (refresh_unsubscribe) {
    refresh_unsubscribe();
    refresh_unsubscribe = null;
  }
}
