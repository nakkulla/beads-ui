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
import { getConfig } from '../config.js';
import { createPoller } from '../poller.js';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import { sharedVisibleWorkspacesStore } from '../visible-workspaces-store.js';
import {
  enrollWorkerMergeCandidates,
  observeWorkerPrs,
  refreshWorkerExternalPrs,
  tickWorkerQueue,
  workerMergeQueueState
} from '../worker/attach.js';
import { onQueueChanged } from '../worker/queue-events.js';
import { runtimeCatalog } from '../worker/runner/index.js';
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

/** @type {(() => void) | null} */
let queue_changed_unsubscribe = null;

/** @type {{ start: () => void, stop: () => void } | null} */
let refresh_driver = null;

/**
 * Last queue `revision` observed per workspace, for {@link queueRevisionMoved}.
 * Process-local bookkeeping only — never persisted, and cleared with the rest of
 * the channel's wiring.
 *
 * @type {Map<string, number>}
 */
const last_seen_revision = new Map();

/**
 * Whether a workspace still has anything worth a monitor row.
 *
 * `runnable` counts (UI-qrfo §4): a repo whose only content is a spec-reviewed
 * candidate — i.e. exactly the repo the user is about to dispatch — has empty
 * queue/PR/done lanes and no running attempt, so leaving it out here would drop
 * it from the aggregation entirely and the 실행가능 lane could never show it.
 *
 * @param {Record<string, any>} snapshot - Decorated snapshot plus `runnable`.
 * @returns {boolean}
 */
function hasPipeline(snapshot) {
  const lanes = ['queue', 'pr_wait', 'done', 'runnable'];
  for (const lane of lanes) {
    if (Array.isArray(snapshot[lane]) && snapshot[lane].length > 0) {
      return true;
    }
  }
  if (serialLaneBeadIds(snapshot).size > 0) {
    return true;
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
 * The bead ids a workspace already has in a lane — the `runnable` exclusion set
 * (UI-qrfo §4). A bead sitting in `queue`/`pr_wait`/`done` is past the "실행할 수
 * 있다" question, and drawing it in two lanes at once is precisely what the
 * exclusive lane priority exists to prevent.
 *
 * @param {Record<string, any>} snapshot
 * @returns {Set<string>}
 */
function lanedBeadIds(snapshot) {
  /** @type {Set<string>} */
  const ids = new Set();
  for (const lane of ['queue', 'pr_wait', 'done']) {
    const entries = snapshot[lane];
    if (!Array.isArray(entries)) {
      continue;
    }
    for (const entry of entries) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id === 'string' && bead_id.length > 0) {
        ids.add(bead_id);
      }
    }
  }
  for (const bead_id of serialLaneBeadIds(snapshot)) {
    ids.add(bead_id);
  }
  return ids;
}

/**
 * Valid bead ids in configured serial lanes (UI-2gi1 §4).
 *
 * Older and malformed snapshots fail quiet so monitor aggregation keeps its
 * pre-serial-lane behavior.
 *
 * @param {Record<string, any>} snapshot
 * @returns {Set<string>}
 */
function serialLaneBeadIds(snapshot) {
  /** @type {Set<string>} */
  const ids = new Set();
  const serial_lanes = snapshot.serial_lanes;
  if (!Array.isArray(serial_lanes)) {
    return ids;
  }
  for (const lane of serial_lanes) {
    if (!lane || typeof lane !== 'object' || Array.isArray(lane)) {
      continue;
    }
    const entries = lane.entries;
    if (!Array.isArray(entries)) {
      continue;
    }
    for (const entry of entries) {
      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
        continue;
      }
      const bead_id = entry.bead_id;
      if (typeof bead_id === 'string' && bead_id.length > 0) {
        ids.add(bead_id);
      }
    }
  }
  return ids;
}

/**
 * Build the cross-workspace pipeline payload.
 *
 * Fail-quiet per workspace (UI-nprg §에러 처리): one repo whose snapshot,
 * decoration or runnable lookup throws is dropped with a log line, never
 * propagated — a single broken checkout must not blank the whole monitor.
 *
 * The `done` lane ships in FULL (UI-qrfo §7): the period selector moved to the
 * client, and a client can only narrow a period it was given data for.
 *
 * @param {{
 *   listWorkspaces?: () => Array<{ path: string }>,
 *   listHidden?: () => string[],
 *   snapshotFor?: (workspace_key: string) => Record<string, unknown>,
 *   runnableFor?: (workspace_key: string, exclude_ids: Set<string>) => Array<Record<string, unknown>>
 * }} [options] - Test seams; each defaults to the live server source.
 * @returns {Array<Record<string, unknown>>}
 */
export function buildMonitorPipeline(options = {}) {
  const snapshotFor =
    options.snapshotFor ||
    ((/** @type {string} */ key) =>
      decorateQueue(key, getWorkerRuntime().queueStore.snapshot(key)));
  const runnableFor =
    options.runnableFor ||
    ((/** @type {string} */ key, /** @type {Set<string>} */ exclude_ids) =>
      getWorkerRuntime().runnableCache.runnableFor(key, exclude_ids));

  /** @type {Array<Record<string, unknown>>} */
  const out = [];

  for (const root_dir of visibleWorkspaceRoots(options)) {
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
    const done = Array.isArray(decorated.done) ? decorated.done : [];
    /** @type {Record<string, any>} */
    const projected = { ...decorated, done };
    /** @type {Array<Record<string, unknown>>} */
    let runnable = [];
    try {
      runnable = runnableFor(root_dir, lanedBeadIds(projected)) || [];
    } catch (err) {
      log('monitor: runnable lookup failed for %s: %o', root_dir, err);
      runnable = [];
    }
    projected.runnable = runnable;
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
 * Build the per-workspace CONTROL state that rides beside the heavy pipeline
 * array (UI-qrfo §4 집계 payload 구조).
 *
 * Covers EVERY visible workspace, pipeline-empty ones included, because three
 * things need a repo that has nothing in flight: the master automation toggle's
 * denominator, the waiting lane's group header for an empty queue, and that
 * header's CAS controls — which cannot send `expected_revision` for a workspace
 * the payload never mentions.
 *
 * Reads the RAW queue snapshot, not the decorated one: the seven fields here are
 * all plain `Queue` state, and the decoration is the expensive part.
 *
 * @param {{
 *   listWorkspaces?: () => Array<{ path: string }>,
 *   listHidden?: () => string[],
 *   snapshotFor?: (workspace_key: string) => Record<string, unknown>,
 *   runnerCatalog?: () => Record<string, unknown>
 * }} [options] - Test seams; each defaults to the live server source.
 * @returns {Array<Record<string, unknown>>}
 */
export function buildMonitorWorkspacesState(options = {}) {
  const snapshotFor =
    options.snapshotFor ||
    ((/** @type {string} */ key) =>
      getWorkerRuntime().queueStore.snapshot(key));
  /** @type {Record<string, unknown>|null} */
  let runner_catalog = null;
  try {
    runner_catalog = (options.runnerCatalog || runtimeCatalog)();
  } catch {
    runner_catalog = null;
  }

  /** @type {Array<Record<string, unknown>>} */
  const out = [];
  for (const root_dir of visibleWorkspaceRoots(options)) {
    /** @type {Record<string, any>} */
    let queue;
    try {
      queue = /** @type {Record<string, any>} */ (snapshotFor(root_dir));
    } catch (err) {
      log('monitor: workspace state unreadable for %s: %o', root_dir, err);
      continue;
    }
    if (!queue) {
      continue;
    }
    out.push({
      root_dir,
      name: path.basename(root_dir),
      auto_advance: queue.auto_advance === true,
      auto_merge: queue.auto_merge === true,
      slots: typeof queue.slots === 'number' ? queue.slots : 1,
      revision: typeof queue.revision === 'number' ? queue.revision : 0,
      runner_catalog
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
  const workspaces_state = safeWorkspacesState();
  for (const sub of SUBSCRIBERS) {
    emitMonitorPipelineSnapshot(
      sub.ws,
      sub.client_id,
      workspaces,
      workspaces_state
    );
  }
}

/**
 * The control-state array, or an empty one. Fail-quiet on its own: the heavy
 * pipeline array is the payload's reason to exist, so a control-state build that
 * throws must degrade the group headers, not suppress the whole push.
 *
 * @returns {Array<Record<string, unknown>>}
 */
function safeWorkspacesState() {
  try {
    return buildMonitorWorkspacesState();
  } catch (err) {
    log('monitor: workspace state build failed: %o', err);
    return [];
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
 * The runnable cache this channel drives. Read through the runtime on every
 * use, never captured, so a test-time runtime reset cannot leave the channel
 * holding a dead instance.
 *
 * @returns {ReturnType<typeof getWorkerRuntime>['runnableCache']}
 */
function runnableCache() {
  return getWorkerRuntime().runnableCache;
}

/**
 * Drop one workspace's cached candidates, fail-quiet.
 *
 * @param {string} workspace
 */
function invalidateRunnable(workspace) {
  try {
    runnableCache().invalidate(workspace);
  } catch (err) {
    log('monitor: runnable invalidation failed for %s: %o', workspace, err);
  }
}

/**
 * Whether this workspace's queue has actually changed since the last snapshot
 * refresh we observed for it.
 *
 * The CAS `revision` is the queue store's own "something was written" counter,
 * so it separates a real mutation from a re-push caused by an async decoration
 * fill. An unreadable snapshot answers `true`: re-scanning one workspace costs
 * one `bd list`, while wrongly deciding "nothing changed" leaves a placed bead
 * in the 실행가능 lane.
 *
 * @param {string} workspace
 * @returns {boolean}
 */
function queueRevisionMoved(workspace) {
  const key = path.resolve(String(workspace || ''));
  let revision = null;
  try {
    const snapshot = /** @type {any} */ (
      getWorkerRuntime().queueStore.snapshot(key)
    );
    revision =
      typeof snapshot?.revision === 'number' ? snapshot.revision : null;
  } catch (err) {
    log('monitor: revision probe failed for %s: %o', key, err);
    return true;
  }
  if (revision === null) {
    return true;
  }
  const seen = last_seen_revision.get(key);
  last_seen_revision.set(key, revision);
  return seen !== revision;
}

/**
 * Attach the queue-refresh observer exactly once, and only while somebody is
 * watching: with no monitor subscriber the aggregation has nothing to feed.
 *
 * The runnable cache is wired here too (UI-qrfo §4), on TWO signals, because
 * neither one alone sees every real queue change:
 *
 * - `onQueueChanged` covers the SCHEDULER's autonomous transitions (dispatch,
 *   admission refusal, session done/fail). Those never pass through a ws
 *   handler, so nothing else observes them.
 * - `onWorkerSnapshotRefresh` covers the ws MUTATION handlers, which fan a fresh
 *   snapshot out without emitting a queue-change event — a placement made from
 *   the monitor itself would otherwise leave the placed bead in the cached
 *   candidate list for a whole TTL. That listener also fires on the async
 *   title / REVISE-parking fills, which change no queue, so it invalidates only
 *   when the workspace's CAS `revision` actually moved. Judging by revision
 *   rather than by event source is what keeps this from re-scanning `bd` on
 *   every fill.
 * - the fill callback schedules a push, which is the whole delivery path for a
 *   candidate list that missed the snapshot that asked for it.
 * - the subscriber count gates the cache's `bd` spawning on somebody watching.
 */
function ensureRefreshWired() {
  if (!queue_changed_unsubscribe) {
    queue_changed_unsubscribe = onQueueChanged((workspace) => {
      // `emitQueueChanged`는 진짜 레인 전이만이 아니라 세션 로그 하트비트
      // (`session-log.js`의 last_event_at fanout, 3초 코얼레스)로도 온다 —
      // revision이 안 움직인 이벤트로 캐시를 만료시키면 라이브 세션이 있는
      // 동안 레포마다 몇 초 간격으로 `bd list`가 다시 돈다. 판정은 snapshot
      // refresh 리스너와 같은 revision 이동이다.
      if (queueRevisionMoved(workspace)) {
        invalidateRunnable(workspace);
      }
      schedulePush();
    });
    try {
      runnableCache().setOnFilled(() => {
        schedulePush();
      });
      runnableCache().setSubscriberCount(monitorPipelineSubscriberCount);
    } catch (err) {
      log('monitor: runnable cache wiring failed: %o', err);
    }
  }
  if (refresh_unsubscribe) {
    return;
  }
  refresh_unsubscribe = onWorkerSnapshotRefresh((workspace) => {
    if (queueRevisionMoved(workspace)) {
      invalidateRunnable(workspace);
    }
    schedulePush();
  });
}

/**
 * The visible workspace roots, straight from the registry minus the hidden set.
 *
 * The ONE place the monitor decides what "visible" means — both payload arrays
 * and every driver walk read it, so a repo can never be in one and out of the
 * other.
 *
 * @param {{ listWorkspaces?: () => Array<{ path: string }>, listHidden?: () => string[] }} [options]
 * @returns {string[]}
 */
function visibleWorkspaceRoots(options = {}) {
  const listWorkspaces = options.listWorkspaces || getAvailableWorkspaces;
  const listHidden =
    options.listHidden || (() => sharedVisibleWorkspacesStore().listHidden());
  /** @type {Set<string>} */
  let hidden = new Set();
  try {
    hidden = new Set(listHidden().map((p) => path.resolve(p)));
  } catch (err) {
    log('monitor: hidden set unreadable: %o', err);
  }
  /** @type {string[]} */
  const out = [];
  /** @type {Set<string>} */
  const seen = new Set();
  try {
    for (const workspace of listWorkspaces()) {
      // Resolved AFTER the empty check on purpose: `path.resolve('')` is the
      // server's cwd, so resolving first would turn a blank registry entry into
      // a workspace nobody registered.
      const raw = String(workspace?.path || '');
      if (raw.length === 0) {
        continue;
      }
      const root_dir = path.resolve(raw);
      if (hidden.has(root_dir) || seen.has(root_dir)) {
        continue;
      }
      seen.add(root_dir);
      out.push(root_dir);
    }
  } catch (err) {
    log('monitor: workspace list unreadable: %o', err);
    return [];
  }
  return out;
}

/**
 * Kick the external-PR registry for every visible workspace and push once the
 * scans land.
 *
 * Driven by the RAW visible list, never by the aggregation's own output: a
 * workspace whose only pipeline content is an external PR nobody has scanned yet
 * has an empty aggregate, so seeding the scan from the aggregate would omit
 * exactly the repos that need the scan — permanently. Deliberately not awaited:
 * a slow `bd list` must not delay the first snapshot.
 */
function refreshExternalPrsForVisible() {
  for (const root_dir of visibleWorkspaceRoots()) {
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
 * Refill every visible workspace's runnable candidates.
 *
 * Driven by the RAW visible list for the same reason the external-PR seeding is
 * (see above): a repo whose only content is an unfetched candidate has an empty
 * aggregate, so seeding from the aggregate would skip exactly the repos that
 * need the scan.
 *
 * @param {(root_dir: string) => void} [refresh] - Test seam.
 * @param {() => string[]} [listRoots] - Test seam.
 */
function refillRunnableForVisible(refresh, listRoots) {
  const refreshOne =
    refresh || ((root_dir) => runnableCache().refresh(root_dir));
  const roots = listRoots || (() => visibleWorkspaceRoots());
  for (const root_dir of roots()) {
    try {
      refreshOne(root_dir);
    } catch (err) {
      log('monitor: runnable refresh failed for %s: %o', root_dir, err);
    }
  }
}

/**
 * The configured poll cadence, in seconds. Read lazily and memoized: `getConfig`
 * touches the filesystem, and this module is imported long before any subscriber
 * exists.
 *
 * A configured `0` disables polling, exactly as it does for the server's own
 * list poller — the setting means "do not poll", and the monitor honouring it
 * differently would make one knob mean two things.
 *
 * @type {number|null}
 */
let poll_interval_seconds = null;

/**
 * @returns {number}
 */
function pollIntervalSeconds() {
  if (poll_interval_seconds === null) {
    try {
      poll_interval_seconds = getConfig().poll_interval_seconds;
    } catch (err) {
      log('monitor: poll interval unreadable, falling back to 30s: %o', err);
      poll_interval_seconds = 30;
    }
  }
  return poll_interval_seconds;
}

/**
 * The periodic runnable-refresh driver (UI-qrfo §4 갱신 driver).
 *
 * TTL alone is not enough. The aggregation only pushes on a queue/snapshot
 * refresh event, so while the queues are quiet there is no push → no cache read
 * → no fill, and a `spec_review` another session pinned would never appear.
 * This ticks the refill itself.
 *
 * Built on `createPoller`, which already owns the two properties this needs —
 * `unref()` so it never holds the process open, and "tick only while somebody is
 * connected", here bound to the MONITOR subscriber count so an unwatched
 * dashboard spawns no `bd`.
 *
 * @param {{
 *   intervalSeconds?: number,
 *   subscriberCount?: () => number,
 *   listRoots?: () => string[],
 *   refresh?: (root_dir: string) => void,
 *   onRefreshed?: () => void
 * }} [options] - Test seams; each defaults to the live server source.
 * @returns {{ start: () => void, stop: () => void }}
 */
export function createRunnableRefreshDriver(options = {}) {
  const onRefreshed = options.onRefreshed || schedulePush;
  return createPoller({
    intervalSeconds:
      typeof options.intervalSeconds === 'number'
        ? options.intervalSeconds
        : pollIntervalSeconds(),
    getClientCount: options.subscriberCount || monitorPipelineSubscriberCount,
    onTick() {
      refillRunnableForVisible(options.refresh, options.listRoots);
      onRefreshed();
    }
  });
}

/**
 * Arm the refresh driver on the first subscriber.
 */
function ensureDriverStarted() {
  if (refresh_driver) {
    return;
  }
  refresh_driver = createRunnableRefreshDriver();
  refresh_driver.start();
}

/**
 * Disarm the refresh driver once the last subscriber leaves — nobody is looking,
 * so there is no reason to keep spawning `bd` across every repo.
 */
function stopDriverIfIdle() {
  if (SUBSCRIBERS.size > 0 || !refresh_driver) {
    return;
  }
  refresh_driver.stop();
  refresh_driver = null;
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
 * The addressing id a monitor subscription answers to when the request carries
 * none. The channel is one-per-connection, so the id exists only to keep the
 * push envelope's `payload.id` shape uniform with every other channel — a
 * payload-less subscribe (the protocol's own shape) is the normal case.
 */
const DEFAULT_MONITOR_CLIENT_ID = 'monitor:pipeline';

/**
 * @param {RequestEnvelope} req
 * @returns {string}
 */
function clientIdOf(req) {
  const raw = /** @type {any} */ (req.payload)?.id;
  return typeof raw === 'string' && raw.length > 0
    ? raw
    : DEFAULT_MONITOR_CLIENT_ID;
}

/**
 * Handle `subscribe-monitor-pipeline`. Payload is optional (`{ id }` addresses
 * the pushes; absent means the default id).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeMonitorPipeline(ws, req) {
  const client_id = clientIdOf(req);
  // Re-subscribing the same (ws, client_id) is idempotent.
  for (const sub of SUBSCRIBERS) {
    if (sub.ws === ws && sub.client_id === client_id) {
      SUBSCRIBERS.delete(sub);
    }
  }
  SUBSCRIBERS.add({ ws, client_id });
  ensureRefreshWired();
  ensureDriverStarted();
  log('subscribe-monitor-pipeline %s', client_id);
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));

  let workspaces = /** @type {Array<Record<string, unknown>>} */ ([]);
  try {
    workspaces = buildMonitorPipeline();
  } catch (err) {
    log('monitor: initial pipeline build failed: %o', err);
  }
  emitMonitorPipelineSnapshot(ws, client_id, workspaces, safeWorkspacesState());
  refreshExternalPrsForVisible();
  // One immediate fill per visible workspace (spec §4): the first tick is a
  // whole poll interval away, and a dashboard that opens empty for 30 seconds
  // reads as "nothing is runnable".
  refillRunnableForVisible();
}

/**
 * Handle `unsubscribe-monitor-pipeline`. Payload is optional, mirroring
 * subscribe.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeMonitorPipeline(ws, req) {
  const client_id = clientIdOf(req);
  let removed = false;
  for (const sub of SUBSCRIBERS) {
    if (sub.ws === ws && sub.client_id === client_id) {
      SUBSCRIBERS.delete(sub);
      removed = true;
    }
  }
  stopDriverIfIdle();
  ws.send(
    JSON.stringify(makeOk(req, { id: client_id, unsubscribed: removed }))
  );
}

/**
 * Handle `monitor-auto-toggle`. Payload: `{ on: boolean }` (UI-qrfo §6).
 *
 * The master automation switch. It takes NO `root_dir`: the target is always
 * every VISIBLE workspace, which is also the master button's denominator.
 *
 * Both axes go through the same integrated USER mutation as the workspace
 * automation button. What this removes is the CLIENT's CAS precondition, not
 * CAS: the server reads each workspace's own current revision, because
 * `expected_revision` differs per repo and no client can know twenty of them.
 *
 * The single-workspace effects are reproduced exactly: ON kicks that
 * workspace's dispatch loop, observes PRs, and conditionally enrolls while
 * auto-merge remains enabled. OFF empties the waiting merge queue in the SAME
 * write that clears both flags (a restart between two writes would leave
 * "stopped" with a full queue for the boot-resume driver).
 *
 * Partial failure PROCEEDS (§10): one unreadable repo must not veto the other
 * nineteen, so the reply names the ones that failed instead.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {{
 *   queueStore?: () => ReturnType<typeof getWorkerRuntime>['queueStore'],
 *   listWorkspaces?: () => Array<{ path: string }>,
 *   listHidden?: () => string[],
 *   listRoots?: () => string[],
 *   tick?: (workspace_key: string) => unknown,
 *   observe?: (workspace_key: string) => unknown,
 *   enroll?: (workspace_key: string) => unknown,
 *   mergeQueueState?: (workspace_key: string) => { active: string|null } | null,
 *   onApplied?: () => void
 * }} [options] - Test seams; each defaults to the live server source.
 */
export function handleMonitorAutoToggle(ws, req, options = {}) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.on !== 'boolean') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { on: boolean }')
      )
    );
    return;
  }
  const on = /** @type {boolean} */ (p.on);
  const storeOf = options.queueStore || (() => getWorkerRuntime().queueStore);
  const listRoots = options.listRoots || (() => visibleWorkspaceRoots(options));
  const kick = options.tick || tickWorkerQueue;
  const observe = options.observe || observeWorkerPrs;
  const enroll = options.enroll || enrollWorkerMergeCandidates;
  const mergeStateOf = options.mergeQueueState || workerMergeQueueState;
  const onApplied = options.onApplied || schedulePush;

  let applied = 0;
  /** @type {Array<{ root_dir: string, reason: string }>} */
  const failed = [];
  /** @type {string[]} */
  let roots = [];
  try {
    roots = listRoots();
  } catch (err) {
    log('monitor: master toggle could not list workspaces: %o', err);
    roots = [];
  }

  for (const root_dir of roots) {
    try {
      const store = storeOf();
      const state = on === false ? mergeStateOf(root_dir) : null;
      const result = store.toggleAutomation(root_dir, {
        expected_revision: /** @type {any} */ (store.snapshot(root_dir))
          .revision,
        on,
        keep: state ? state.active : null
      });
      if (!result.ok) {
        failed.push({ root_dir, reason: reasonOf(result) });
        continue;
      }
      applied += 1;
      if (on === true) {
        // Both pipelines are fire-and-forget: session dispatch and PR
        // observation must not hold the cross-workspace reply.
        Promise.resolve()
          .then(() => kick(root_dir))
          .catch((err) => {
            log(
              'monitor: tick after master toggle failed for %s: %o',
              root_dir,
              err
            );
          });
        Promise.resolve()
          .then(() => observe(root_dir))
          .catch((err) => {
            log(
              'monitor: observation after master toggle failed for %s: %o',
              root_dir,
              err
            );
          })
          .then(() => {
            if (store.snapshot(root_dir).auto_merge !== true) {
              return;
            }
            return enroll(root_dir);
          })
          .catch((err) => {
            log(
              'monitor: enrolment after master toggle failed for %s: %o',
              root_dir,
              err
            );
          });
      }
    } catch (err) {
      log('monitor: master toggle failed for %s: %o', root_dir, err);
      failed.push({ root_dir, reason: 'error' });
    }
  }

  ws.send(JSON.stringify(makeOk(req, { on, applied, failed })));
  // ONE push for the whole sweep — `schedulePush` coalesces, so the per-workspace
  // queue-changed events and this land as a single rebuild.
  onApplied();
}

/**
 * Why a queue mutation did not apply, in the master toggle's vocabulary.
 *
 * @param {import('../worker/queue-store.js').QueueOpResult} result
 * @returns {string}
 */
function reasonOf(result) {
  if (result.conflict) {
    return 'conflict';
  }
  return result.reason || 'rejected';
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
  stopDriverIfIdle();
}

/**
 * Test-only: drop subscribers, any pending push, and every piece of wiring the
 * channel arms on its first subscriber.
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
  if (queue_changed_unsubscribe) {
    queue_changed_unsubscribe();
    queue_changed_unsubscribe = null;
  }
  if (refresh_driver) {
    refresh_driver.stop();
    refresh_driver = null;
  }
  last_seen_revision.clear();
  poll_interval_seconds = null;
}
