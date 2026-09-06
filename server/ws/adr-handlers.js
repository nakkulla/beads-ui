/**
 * WebSocket handlers for the ADR channel (spec UI-8uz7 §6, §8).
 *
 * Like the monitor pipeline this subscription is SERVER-GLOBAL: it is not
 * scoped to the connection's current workspace, and every push carries a full
 * snapshot of every visible workspace. The channel owns nothing but wiring —
 * the fingerprint watch (`../adr/adr-watch.js`) decides WHEN a repo recomputes
 * and the signal computer (`../adr/adr-signals.js`) decides WHAT the answer is.
 *
 * The one judgment made here is the cross-repository join: a citation
 * `ADR <repo>/NNNN` is resolved against the cached snapshot of the visible
 * workspace whose basename is `<repo>`. That join is why a push sends ALL
 * workspaces whenever ONE finishes — repo B's fresh ADR list changes what repo
 * A's citation rows say, with no recompute on A's side.
 *
 * Nothing on this path reads `bd` (spec §2, ADR 0008): the tab is a file
 * observation surface and writes nothing anywhere.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 * @import { AdrPlan, AdrWorkspace, CrossCitation } from '../adr/adr-signals.js'
 * @import { AdrWatch } from '../adr/adr-watch.js'
 */
import path from 'node:path';
import { makeOk } from '../../app/protocol.js';
import { createAdrSignals } from '../adr/adr-signals.js';
import { createAdrWatch } from '../adr/adr-watch.js';
import { visibleWorkspaceRoots } from '../worker/foreign-blocker-status.js';
import { log, pushSnapshotIfChanged } from './context.js';

/**
 * Safety-net poll period for every ADR watch (spec §5.3). `fs.watch` carries
 * the normal case, so this only bounds how long a MISSED event can hide a
 * change; 30 seconds matches the monitor tab's own refresh feel while keeping
 * the spawn-free stat scan cheap.
 */
const ADR_POLL_INTERVAL_MS = 30000;

/**
 * The addressing id an ADR subscription answers to when the request carries
 * none, mirroring the monitor channel's default.
 */
const DEFAULT_ADR_CLIENT_ID = 'adr:snapshot';

/**
 * @typedef {Object} AdrSubscriber
 * @property {WebSocket} ws - Subscribed socket.
 * @property {string} client_id - Push addressing id.
 * @property {string} [last_body] - Last pushed body, for change suppression.
 */

/** @type {Set<AdrSubscriber>} */
const SUBSCRIBERS = new Set();

/** @type {Map<string, AdrWatch>} */
const WATCHES = new Map();

/** @type {Map<string, AdrWorkspace>} */
const CACHE = new Map();

/** @type {{ computeWorkspace: (root_dir: string, plan: AdrPlan) => Promise<AdrWorkspace> } | null} */
let signals = null;

/**
 * Lazily build the signal computer: creating it resolves installed checker
 * paths, and a server nobody opened the ADR tab on should not do that work.
 */
function adrSignals() {
  if (!signals) {
    signals = createAdrSignals({});
  }
  return signals;
}

/**
 * The snapshot a workspace shows before its first computation finishes
 * (spec §6): the real shape with every list empty, marked `computing`.
 *
 * @param {string} root_dir
 * @returns {AdrWorkspace}
 */
function computingPlaceholder(root_dir) {
  return /** @type {any} */ ({
    root_dir,
    computing: true,
    computed_at: null,
    env_errors: { index: null, citations: null, candidates: null },
    adr_dir_missing: false,
    current: [],
    history: [],
    frontmatter_errors: [],
    index_drift: null,
    citations_stale: [],
    candidates: [],
    cross_citations: [],
    retry_pending: false
  });
}

/**
 * Resolve the ADR numbers a workspace snapshot knows about.
 *
 * @param {AdrWorkspace} entry
 * @returns {Map<number, string>} ADR id to status.
 */
function statusById(entry) {
  /** @type {Map<number, string>} */
  const out = new Map();
  for (const adr of [...entry.current, ...entry.history]) {
    if (!out.has(adr.id)) {
      out.set(adr.id, adr.status);
    }
  }
  return out;
}

/**
 * Build the pushed `workspaces` array in Monitor order.
 *
 * @returns {Record<string, unknown>[]}
 */
function buildViews() {
  /** @type {string[]} */
  let roots = [];
  try {
    roots = visibleWorkspaceRoots();
  } catch (err) {
    log('adr: visible workspace read failed: %o', err);
  }

  // Duplicate basenames: the FIRST workspace with a name owns it as the cross
  // citation target, every later one is flagged instead (spec §8).
  /** @type {Map<string, string>} */
  const first_root_by_name = new Map();
  for (const root_dir of roots) {
    const name = path.basename(root_dir);
    if (!first_root_by_name.has(name)) {
      first_root_by_name.set(name, root_dir);
    }
  }

  /** @type {Map<string, Map<number, string>>} */
  const statuses = new Map();
  for (const [name, root_dir] of first_root_by_name) {
    const entry = CACHE.get(root_dir);
    statuses.set(name, entry ? statusById(entry) : new Map());
  }

  return roots.map((root_dir) => {
    const entry = CACHE.get(root_dir) || computingPlaceholder(root_dir);
    const name = path.basename(root_dir);
    const cross_citations = entry.cross_citations.map(
      (/** @type {CrossCitation} */ citation) => {
        const target_root = first_root_by_name.get(citation.repo);
        const status = target_root
          ? statuses.get(citation.repo)?.get(citation.adr)
          : undefined;
        return {
          ...citation,
          target:
            target_root && status ? { root_dir: target_root, status } : null
        };
      }
    );
    // `retry_pending` is watch bookkeeping, not part of `AdrWorkspaceView`.
    const { retry_pending: _retry_pending, ...view } = entry;
    void _retry_pending;
    return {
      ...view,
      name,
      name_duplicate: first_root_by_name.get(name) !== root_dir,
      cross_citations
    };
  });
}

/**
 * Push the whole workspace list to every subscriber.
 */
function pushAll() {
  if (SUBSCRIBERS.size === 0) {
    return;
  }
  const body = JSON.stringify({ workspaces: buildViews() });
  for (const sub of SUBSCRIBERS) {
    pushSnapshotIfChanged(sub, 'adr-snapshot', body);
  }
}

/**
 * Run one workspace computation and publish its result.
 *
 * The watch armed when the computation starts is its owner: a result whose
 * owner is no longer the armed watch is discarded, so an unsubscribe followed
 * by a resubscribe never lets the stale pass overwrite the fresh one.
 *
 * @param {string} root_dir
 * @param {AdrPlan} plan
 */
async function recompute(root_dir, plan) {
  const owner = WATCHES.get(root_dir);
  /** @type {AdrWorkspace} */
  let result;
  try {
    result = await adrSignals().computeWorkspace(root_dir, plan);
  } catch (err) {
    log('adr: compute failed for %s: %o', root_dir, err);
    return;
  }
  const watch = WATCHES.get(root_dir);
  if (!watch || watch !== owner) {
    // The workspace went hidden, the last subscriber left, or the channel was
    // re-armed while the computation ran: its answer belongs to a scope that
    // no longer exists, and the re-armed watch already runs its own first
    // full pass.
    return;
  }
  CACHE.set(root_dir, result);
  watch.setRetryPending(result.retry_pending);
  pushAll();
}

/**
 * Arm the watch for one workspace and kick its first full computation.
 *
 * @param {string} root_dir
 */
function startWatch(root_dir) {
  CACHE.set(root_dir, computingPlaceholder(root_dir));
  try {
    const watch = createAdrWatch({
      root_dir,
      onChange: (plan) => recompute(root_dir, plan),
      poll_interval_ms: ADR_POLL_INTERVAL_MS
    });
    WATCHES.set(root_dir, watch);
    // Through the watch so a fingerprint change during the first computation
    // merges into one rerun instead of a second in-flight compute (§5.3).
    void watch.trigger({ full: true });
  } catch (err) {
    log('adr: watch could not be armed for %s: %o', root_dir, err);
  }
}

/**
 * @param {string} root_dir
 */
function stopWatch(root_dir) {
  const watch = WATCHES.get(root_dir);
  WATCHES.delete(root_dir);
  CACHE.delete(root_dir);
  if (!watch) {
    return;
  }
  try {
    watch.close();
  } catch (err) {
    log('adr: watch close failed for %s: %o', root_dir, err);
  }
}

/**
 * Bring the armed set in line with the visible set: new repos get a watch and a
 * first computation, dropped ones get torn down.
 */
function syncWatches() {
  /** @type {string[]} */
  let roots = [];
  try {
    roots = visibleWorkspaceRoots();
  } catch (err) {
    log('adr: visible workspace read failed: %o', err);
    return;
  }
  const wanted = new Set(roots);
  for (const root_dir of [...WATCHES.keys()]) {
    if (!wanted.has(root_dir)) {
      stopWatch(root_dir);
    }
  }
  for (const root_dir of roots) {
    if (!WATCHES.has(root_dir)) {
      startWatch(root_dir);
    }
  }
}

/**
 * Drop every watch and the cache behind it.
 */
function teardown() {
  for (const root_dir of [...WATCHES.keys()]) {
    stopWatch(root_dir);
  }
  CACHE.clear();
  // A computation still running against the old computer keeps writing its
  // candidate cache into an instance nobody reads again.
  signals = null;
}

/**
 * Tear the channel down once nobody is watching, so a closed tab leaves no
 * timers, watchers, or stale cache behind (spec §6).
 */
function teardownIfIdle() {
  if (SUBSCRIBERS.size === 0) {
    teardown();
  }
}

/**
 * How many clients are watching the ADR channel.
 */
export function adrSubscriberCount() {
  return SUBSCRIBERS.size;
}

/**
 * Visibility-toggle trigger: the visible set IS this channel's scope, so a
 * toggle arms newly visible repos and drops hidden ones (spec §6).
 */
export function notifyAdrVisibilityChanged() {
  if (SUBSCRIBERS.size === 0) {
    return;
  }
  syncWatches();
  pushAll();
}

/**
 * @param {RequestEnvelope} req
 * @returns {string}
 */
function clientIdOf(req) {
  const raw = /** @type {any} */ (req.payload)?.id;
  return typeof raw === 'string' && raw.length > 0
    ? raw
    : DEFAULT_ADR_CLIENT_ID;
}

/**
 * Handle `subscribe-adr`. Payload is optional (`{ id }` addresses the pushes).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeAdr(ws, req) {
  const client_id = clientIdOf(req);
  for (const sub of SUBSCRIBERS) {
    if (sub.ws === ws && sub.client_id === client_id) {
      SUBSCRIBERS.delete(sub);
    }
  }
  /** @type {AdrSubscriber} */
  const sub = { ws, client_id };
  SUBSCRIBERS.add(sub);
  log('subscribe-adr %s', client_id);
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));

  // Arm BEFORE the first push: a cold channel has to ship the `computing: true`
  // placeholder rows the watches just created, not an empty workspace list.
  syncWatches();
  pushSnapshotIfChanged(
    sub,
    'adr-snapshot',
    JSON.stringify({ workspaces: buildViews() })
  );
}

/**
 * Handle `unsubscribe-adr`. Payload is optional, mirroring subscribe.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeAdr(ws, req) {
  const client_id = clientIdOf(req);
  let removed = false;
  for (const sub of SUBSCRIBERS) {
    if (sub.ws === ws && sub.client_id === client_id) {
      SUBSCRIBERS.delete(sub);
      removed = true;
    }
  }
  teardownIfIdle();
  ws.send(
    JSON.stringify(makeOk(req, { id: client_id, unsubscribed: removed }))
  );
}

/**
 * Detach a connection from the ADR channel (close hook).
 *
 * @param {WebSocket} ws
 */
export function detachAdr(ws) {
  for (const sub of SUBSCRIBERS) {
    if (sub.ws === ws) {
      SUBSCRIBERS.delete(sub);
    }
  }
  teardownIfIdle();
}

/**
 * Test-only: drop subscribers, watches, cache, and the lazy signal computer.
 */
export function __resetAdrForTest() {
  SUBSCRIBERS.clear();
  teardown();
  signals = null;
}
