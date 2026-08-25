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
 * @import { CrossLane, CrossLaneEntry, CrossLanesState } from '../worker/cross-lanes-store.js'
 */
import path from 'node:path';
import { makeError, makeOk } from '../../app/protocol.js';
import {
  activeBeadIds,
  isImplementationAttempt
} from '../../app/utils/active-attempts.js';
import { runBdJsonProjected } from '../bd.js';
import { getConfig } from '../config.js';
import { createPoller } from '../poller.js';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import {
  SESSION_DEFAULTS_KV_KEY,
  normalizeSessionDefaults
} from '../session-defaults.js';
import { sharedVisibleWorkspacesStore } from '../visible-workspaces-store.js';
import {
  enrollWorkerMergeCandidates,
  observeWorkerPrs,
  refreshWorkerExternalPrs,
  tickWorkerQueue,
  workerMergeQueueState
} from '../worker/attach.js';
import { sharedCrossLanesStore } from '../worker/cross-lanes-store.js';
import { projectExecutionDefaults } from '../worker/execution-defaults.js';
import { onQueueChanged } from '../worker/queue-events.js';
import { runtimeCatalog } from '../worker/runner/index.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { scopeCache } from '../worker/scope-cache.js';
import { kvGetJsonAtRoot, log, pushSnapshotIfChanged } from './context.js';
import {
  doneAtByBead,
  lanedBeadIds,
  serialLaneBeadIds,
  sessionExcludedBeadIds
} from './lane-membership.js';
import {
  decorateQueue,
  fanout,
  onWorkerSnapshotRefresh,
  workerQueueSubscribedWorkspaces,
  workerQueueSubscriberCount,
  workerQueueSubscriberTotal
} from './worker-handlers.js';

/**
 * Coalescing window for recomputation. Every workspace's queue events land on
 * this one aggregation, so a burst — a dispatch that touches two repos, a
 * registry rewrite, a fill fanout — must collapse into a single rebuild rather
 * than one full cross-repo scan per event.
 */
const PUSH_DEBOUNCE_MS = 250;
const ISSUE_PREFIX_RETRY_MS = 5_000;
/**
 * Foreign blocker status cache TTLs (UI-eey2 §10). A closed foreign blocker
 * stays closed, so a long positive TTL is safe; a failed lookup retries sooner
 * because the usual cause (bd busy, rig unreadable) is transient.
 */
const FOREIGN_STATUS_TTL_MS = 5 * 60_000;
const FOREIGN_STATUS_RETRY_MS = 60_000;

/**
 * Server-global subscriber set. No workspace key: a monitor subscription is one
 * per connection for the whole server.
 *
 * @type {Set<{ ws: WebSocket, client_id: string, last_body?: string }>}
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
 * Process-local config projection per workspace. Successes stay cached; a
 * failed or malformed lookup remains null but becomes retryable after a short
 * delay instead of spawning `bd` on every snapshot (UI-2gi1 §6.3).
 *
 * @type {Map<string, { value: string|null, retry_at: number, in_flight: boolean }>}
 */
const issue_prefix_cache = new Map();

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function issuePrefixFromConfig(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const prefix = /** @type {Record<string, unknown>} */ (value).issue_prefix;
  if (typeof prefix !== 'string') {
    return null;
  }
  const trimmed = prefix.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Synchronous cache-hit projection used by `buildMonitorWorkspacesState()`.
 *
 * @param {string} root_dir
 * @returns {string|null}
 */
function cachedIssuePrefixFor(root_dir) {
  return issue_prefix_cache.get(path.resolve(root_dir))?.value || null;
}

/**
 * Start at most one async `bd config list --json` lookup for a workspace.
 *
 * @param {string} root_dir
 */
function prewarmIssuePrefix(root_dir) {
  const key = path.resolve(root_dir);
  const current = issue_prefix_cache.get(key);
  if (
    (current && current.value !== null) ||
    current?.in_flight === true ||
    (current && current.retry_at > Date.now())
  ) {
    return;
  }
  issue_prefix_cache.set(key, {
    value: current?.value || null,
    retry_at: current?.retry_at || 0,
    in_flight: true
  });
  void runBdJsonProjected('config', ['config', 'list', '--json'], { cwd: key })
    .then((result) => {
      const issue_prefix =
        result.ok === true ? issuePrefixFromConfig(result.data) : null;
      issue_prefix_cache.set(key, {
        value: issue_prefix,
        retry_at:
          issue_prefix === null ? Date.now() + ISSUE_PREFIX_RETRY_MS : Infinity,
        in_flight: false
      });
      if (issue_prefix !== null) {
        schedulePush();
      }
    })
    .catch((err) => {
      issue_prefix_cache.set(key, {
        value: null,
        retry_at: Date.now() + ISSUE_PREFIX_RETRY_MS,
        in_flight: false
      });
      log('monitor: issue prefix lookup failed for %s: %o', key, err);
    });
}

/**
 * How long a SUCCESSFUL per-repo session-defaults read stays fresh.
 *
 * The kv layer changes only on an explicit edit, and both editing paths
 * (`set-session-defaults`, `apply-impl-preset-global`) invalidate the repo they
 * wrote, so the TTL is only the backstop for an edit made outside this process.
 */
const SESSION_DEFAULTS_TTL_MS = 5 * 60_000;

/** How long a FAILED read is remembered before another `bd kv get` is allowed. */
const SESSION_DEFAULTS_RETRY_MS = 60_000;

/**
 * Process-local session-defaults projection per workspace (UI-eey2 §9.4).
 *
 * Same shape as {@link issue_prefix_cache} and for the same reason: the read is
 * ASYNC (`bd kv get`) while `workspaces_state` is built SYNCHRONOUSLY, so a
 * cold or expired entry ships the empty default and the fill's completion
 * schedules the push that carries the real one.
 *
 * @type {Map<string, { values: Record<string, string>, warnings: string[], expires_at: number, in_flight: boolean }>}
 */
const session_defaults_cache = new Map();

/**
 * Synchronous cache-hit projection used by `buildMonitorWorkspacesState()`.
 * A miss is the empty layer, which is exactly what an absent kv key means.
 *
 * @param {string} root_dir
 * @returns {{ values: Record<string, string>, warnings: string[] }}
 */
function cachedSessionDefaultsFor(root_dir) {
  const hit = session_defaults_cache.get(path.resolve(root_dir));
  // An EXPIRED entry is as good as a cold one (spec §9.4): shipping the value it
  // is about to replace would show execution settings the repo no longer has,
  // and the empty layer is exactly what an absent kv key means anyway.
  return hit && hit.expires_at > Date.now()
    ? { values: hit.values, warnings: hit.warnings }
    : { values: {}, warnings: [] };
}

/**
 * Start at most one async `bd kv get` per workspace.
 *
 * @param {string} root_dir
 */
function prewarmSessionDefaults(root_dir) {
  const key = path.resolve(root_dir);
  const current = session_defaults_cache.get(key);
  if (
    current?.in_flight === true ||
    (current && current.expires_at > Date.now())
  ) {
    return;
  }
  session_defaults_cache.set(key, {
    values: current?.values || {},
    warnings: current?.warnings || [],
    expires_at: current?.expires_at || 0,
    in_flight: true
  });
  void kvGetJsonAtRoot(key, SESSION_DEFAULTS_KV_KEY)
    .then((read) => {
      if (!read.ok) {
        session_defaults_cache.set(key, {
          values: {},
          warnings: [read.error || 'bd kv get failed'],
          expires_at: Date.now() + SESSION_DEFAULTS_RETRY_MS,
          in_flight: false
        });
        schedulePush();
        return;
      }
      const normalized = normalizeSessionDefaults(read.value);
      session_defaults_cache.set(key, {
        values: normalized.values,
        warnings: read.warning
          ? [read.warning, ...normalized.warnings]
          : normalized.warnings,
        expires_at: Date.now() + SESSION_DEFAULTS_TTL_MS,
        in_flight: false
      });
      schedulePush();
    })
    .catch((err) => {
      session_defaults_cache.set(key, {
        values: {},
        warnings: ['kv_read_failed'],
        expires_at: Date.now() + SESSION_DEFAULTS_RETRY_MS,
        in_flight: false
      });
      log('monitor: session defaults lookup failed for %s: %o', key, err);
      schedulePush();
    });
}

/**
 * Drop one repo's cached session defaults and re-push (UI-eey2 §9.5).
 *
 * Called by `set-session-defaults` and `apply-impl-preset-global` on success:
 * the writer already knows the value moved, so waiting out the TTL would leave
 * every repo panel showing the value the user just replaced.
 *
 * @param {string} root_dir
 */
export function invalidateSessionDefaults(root_dir) {
  if (typeof root_dir !== 'string' || root_dir.length === 0) {
    return;
  }
  session_defaults_cache.delete(path.resolve(root_dir));
  schedulePush();
}

/**
 * Warm every visible workspace without delaying the current snapshot.
 */
function prewarmVisibleIssuePrefixes() {
  for (const root_dir of visibleWorkspaceRoots()) {
    prewarmIssuePrefix(root_dir);
    prewarmSessionDefaults(root_dir);
  }
}

/**
 * Process-local status cache for FOREIGN blockers (UI-eey2 §10): a `blocks`
 * dependency whose id belongs to another visible rig. `bd show` in the
 * dependant's rig carries no `status` for such an edge, so the title cache
 * cannot drop it when closed; the monitor — the one place that knows every
 * visible rig's prefix — resolves it with one `bd show` in the owning rig.
 * Display-only: a closed blocker is simply not a blocker, exactly as `bd ready`
 * already judges it. Never scheduling input.
 *
 * @type {Map<string, { status: string|null, until: number, in_flight: boolean }>}
 */
const foreign_blocker_status_cache = new Map();

/**
 * Rig prefix of a bead id — the part before the first `-` (same split as the
 * client's `classifyBlockerPrefix`).
 *
 * @param {string} bead_id
 */
function prefixOfBeadId(bead_id) {
  const split_at = bead_id.indexOf('-');
  return split_at > 0 ? bead_id.slice(0, split_at) : bead_id;
}

/**
 * Cached status of a foreign blocker, kicking one async `bd show` in the owning
 * rig when the cache is cold or expired. `null` until known.
 *
 * @param {string} bead_id
 * @param {string} owner_root - Visible workspace whose prefix owns the id.
 * @returns {string|null}
 */
function foreignBlockerStatusFor(bead_id, owner_root) {
  const key = `${path.resolve(owner_root)}\u0000${bead_id}`;
  const hit = foreign_blocker_status_cache.get(key);
  const now = Date.now();
  if (hit && (hit.in_flight || hit.until > now)) {
    return hit.status;
  }
  foreign_blocker_status_cache.set(key, {
    status: hit?.status ?? null,
    until: hit?.until ?? 0,
    in_flight: true
  });
  void runBdJsonProjected('show', ['show', bead_id, '--json'], {
    cwd: path.resolve(owner_root),
    expected_id: bead_id
  })
    .then((result) => {
      const status =
        result.ok === true &&
        result.data &&
        typeof (/** @type {any} */ (result.data).status) === 'string'
          ? /** @type {any} */ (result.data).status
          : null;
      foreign_blocker_status_cache.set(key, {
        status,
        until:
          Date.now() +
          (status === null ? FOREIGN_STATUS_RETRY_MS : FOREIGN_STATUS_TTL_MS),
        in_flight: false
      });
      if (status === 'closed') {
        schedulePush();
      }
    })
    .catch((err) => {
      foreign_blocker_status_cache.set(key, {
        status: hit?.status ?? null,
        until: Date.now() + FOREIGN_STATUS_RETRY_MS,
        in_flight: false
      });
      log('monitor: foreign blocker lookup failed for %s: %o', bead_id, err);
    });
  return hit?.status ?? null;
}

/**
 * Drop CLOSED foreign blockers from a workspace's `bead_blocked_by` projection
 * (UI-eey2 §10). Same-rig blockers are left alone — the title cache already
 * excluded the closed ones from that source. Unknown status keeps the id
 * (fail-visible until the lookup lands); an id whose prefix matches no other
 * visible rig is untouched.
 *
 * @param {Record<string, any>} projected - Mutated in place.
 * @param {string} root_dir
 * @param {string[]} roots - Every visible workspace root.
 * @param {(root_dir: string) => string|null} issuePrefixFor
 * @param {(bead_id: string, owner_root: string) => string|null} statusFor
 */
function pruneClosedForeignBlockers(
  projected,
  root_dir,
  roots,
  issuePrefixFor,
  statusFor
) {
  const map = projected.bead_blocked_by;
  if (!map || typeof map !== 'object' || Array.isArray(map)) {
    return;
  }
  /** @type {string|null} */
  let self_prefix = null;
  try {
    self_prefix = issuePrefixFor(root_dir);
  } catch {
    self_prefix = null;
  }
  /** @type {Map<string, string>} */
  const owner_by_prefix = new Map();
  for (const other of roots) {
    if (other === root_dir) {
      continue;
    }
    /** @type {string|null} */
    let prefix = null;
    try {
      prefix = issuePrefixFor(other);
    } catch {
      prefix = null;
    }
    if (typeof prefix === 'string' && prefix.length > 0) {
      owner_by_prefix.set(prefix, other);
    }
  }
  if (owner_by_prefix.size === 0) {
    return;
  }
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const [bead_id, blockers] of Object.entries(map)) {
    if (!Array.isArray(blockers)) {
      out[bead_id] = blockers;
      continue;
    }
    out[bead_id] = blockers.filter((blocker) => {
      if (typeof blocker !== 'string') {
        return true;
      }
      const prefix = prefixOfBeadId(blocker);
      if (self_prefix !== null && prefix === self_prefix) {
        return true;
      }
      const owner_root = owner_by_prefix.get(prefix);
      if (!owner_root) {
        return true;
      }
      return statusFor(blocker, owner_root) !== 'closed';
    });
  }
  projected.bead_blocked_by = out;
}

/**
 * Whether a workspace still has anything worth a monitor row.
 *
 * `runnable` counts (UI-qrfo §4): a repo whose only content is a spec-reviewed
 * candidate — i.e. exactly the repo the user is about to dispatch — has empty
 * queue/PR/done lanes and no running attempt, so leaving it out here would drop
 * it from the aggregation entirely and the 실행가능 lane could never show it.
 *
 * `session_active` counts for the same reason (UI-yrzu §4.2): a repo whose only
 * activity is an interactive session's `in_progress` bead has no worker state at
 * all.
 *
 * @param {Record<string, any>} snapshot - Decorated snapshot plus `runnable` and
 * `session_active`.
 * @returns {boolean}
 */
function hasPipeline(snapshot) {
  const lanes = ['queue', 'pr_wait', 'done', 'runnable', 'session_active'];
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
    // Only an implementation run means "this repo has a pipeline" (UI-hk74 §7):
    // a head review runs against a PR that is already open, so a repo whose
    // lanes are all empty except for one review attempt has nothing to show.
    if (
      attempt &&
      /** @type {any} */ (attempt).status === 'running' &&
      isImplementationAttempt(attempt)
    ) {
      return true;
    }
  }
  return false;
}

/**
 * One runnable row minus the two fields that exist only so the server can pick
 * its scope source (UI-f1qy §4.4). The wire carries the resolved `scope` alone,
 * so every copy that leaves this module drops them — including the degraded
 * copy the pipeline ships when the scope attach itself throws.
 *
 * @param {Record<string, unknown>} item
 * @returns {Record<string, unknown>}
 */
function withoutScopeSourceFields(item) {
  const row = { ...item };
  delete row.description_scope;
  delete row.scope_spec_id;
  return row;
}

/**
 * Attach each runnable candidate's declared scope (UI-qm12 §4.4, widened to the
 * description source by UI-f1qy §4.4). One bead has exactly ONE source, chosen
 * by the row itself: `scope_spec_id` — never the admission `spec_id` — names
 * the artifact, and only a row without one carries `description_scope`.
 *
 * The artifact branch peeks the same process-wide cache the queue decoration
 * reads, over the same artifact set (`[scope_spec_id, plan_path?]`) — loading a
 * bead into a lane must not change its overlap verdict. The description branch
 * needs no cache: the declaration is already on the row.
 *
 * ADDITIVE and SYNCHRONOUS: a read source gets a `scope` field on a COPY of the
 * row — the cache owns the original — and a miss, a read failure or no
 * declaration at all gets no field, which §5.2 reads as 판정 불가. Every copy
 * drops the two INTERNAL source fields, so the wire carries `scope` alone. The
 * fill a miss schedules delivers its value through the next push, never by
 * blocking this one.
 *
 * @param {Array<Record<string, unknown>>} runnable
 * @param {string} root_dir
 * @returns {Array<Record<string, unknown>>}
 */
function withRunnableScope(root_dir, runnable) {
  const cache = scopeCache();
  return runnable.map((item) => {
    const row = withoutScopeSourceFields(item);
    const spec_id =
      typeof item.scope_spec_id === 'string' ? item.scope_spec_id : '';
    if (spec_id.length > 0) {
      if (!cache) {
        return row;
      }
      const plan_path =
        typeof item.plan_path === 'string' ? item.plan_path : '';
      const artifacts = plan_path.length > 0 ? [spec_id, plan_path] : [spec_id];
      const peeked = cache.peek(root_dir, artifacts);
      return peeked.state === 'hit' ? { ...row, scope: peeked.scope } : row;
    }
    if (Array.isArray(item.description_scope)) {
      return { ...row, scope: item.description_scope };
    }
    return row;
  });
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
 *   runnableFor?: (workspace_key: string, exclude_ids: Set<string>) => Array<Record<string, unknown>>,
 *   sessionActiveFor?: (workspace_key: string, exclude_ids: Set<string>) => Array<Record<string, unknown>>,
 *   issuePrefixFor?: (root_dir: string) => string|null,
 *   foreignBlockerStatusFor?: (bead_id: string, owner_root: string) => string|null
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
  const sessionActiveFor =
    options.sessionActiveFor ||
    ((/** @type {string} */ key, /** @type {Set<string>} */ exclude_ids) =>
      getWorkerRuntime().runnableCache.sessionActiveFor(key, exclude_ids));
  const issuePrefixFor = options.issuePrefixFor || cachedIssuePrefixFor;
  const foreignStatusFor =
    options.foreignBlockerStatusFor || foreignBlockerStatusFor;

  /** @type {Array<Record<string, unknown>>} */
  const out = [];
  const roots = visibleWorkspaceRoots(options);

  for (const root_dir of roots) {
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
    try {
      pruneClosedForeignBlockers(
        projected,
        root_dir,
        roots,
        issuePrefixFor,
        foreignStatusFor
      );
    } catch (err) {
      log('monitor: foreign blocker prune failed for %s: %o', root_dir, err);
    }
    /** @type {Array<Record<string, unknown>>} */
    let runnable = [];
    try {
      runnable = runnableFor(root_dir, lanedBeadIds(projected)) || [];
    } catch (err) {
      log('monitor: runnable lookup failed for %s: %o', root_dir, err);
      runnable = [];
    }
    try {
      projected.runnable = withRunnableScope(root_dir, runnable);
    } catch (err) {
      log('monitor: runnable scope attach failed for %s: %o', root_dir, err);
      projected.runnable = runnable.map(withoutScopeSourceFields);
    }
    /** @type {Array<Record<string, unknown>>} */
    let session_active = [];
    try {
      session_active =
        sessionActiveFor(root_dir, sessionExcludedBeadIds(projected)) || [];
    } catch (err) {
      log('monitor: session_active lookup failed for %s: %o', root_dir, err);
      session_active = [];
    }
    projected.session_active = session_active;
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
 * The four lane counts for one repo, on the client's EXCLUSIVE lane priority
 * (UI-eey2 §9.4): `running` > `pr_wait` > `queue` ∪ serial > `runnable`.
 *
 * One bead lands in exactly one bucket, which is what makes the deck's
 * `실행 n · 대기 n` agree with the lanes it summarizes — counting a running
 * bead in both its attempt and its queue entry is precisely the double count
 * `buildLanes()` exists to prevent.
 *
 * @param {string} root_dir
 * @param {Record<string, any>} queue - RAW queue snapshot.
 * @param {(workspace_key: string, exclude_ids: Set<string>) => Array<Record<string, unknown>>} runnableFor
 * @param {(workspace_key: string, exclude_ids: Set<string>) => Array<Record<string, unknown>>} sessionActiveFor
 * @returns {{ running: number, pr_wait: number, queue: number, runnable: number, session_active: number }}
 */
function laneCountsFor(root_dir, queue, runnableFor, sessionActiveFor) {
  // The 실행중 레인 is per BEAD and admits leaf paused / unhandled failures, not
  // just `status === 'running'` — so the count uses the CLIENT'S OWN classifier
  // (`app/utils/active-attempts.js`) rather than a second predicate that would
  // drift from the lane it summarizes.
  /** @type {Set<string>} */
  const claimed = activeBeadIds(queue.attempts || {}, doneAtByBead(queue));
  const running = claimed.size;
  // Sessions rank immediately after `running` (UI-yrzu §4.2). The exclusion set
  // is what keeps that priority honest, so the count reads exactly the rows the
  // pipeline's session lane will draw.
  let session_active = 0;
  try {
    const rows =
      sessionActiveFor(root_dir, sessionExcludedBeadIds(queue)) || [];
    for (const row of rows) {
      const bead_id = /** @type {any} */ (row)?.bead_id;
      if (typeof bead_id !== 'string' || bead_id.length === 0) {
        continue;
      }
      if (claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      session_active += 1;
    }
  } catch (err) {
    log('monitor: session_active count failed for %s: %o', root_dir, err);
  }
  let pr_wait = 0;
  for (const entry of Array.isArray(queue.pr_wait) ? queue.pr_wait : []) {
    const bead_id = entry && entry.bead_id;
    if (typeof bead_id !== 'string' || bead_id.length === 0) {
      continue;
    }
    if (claimed.has(bead_id)) {
      continue;
    }
    claimed.add(bead_id);
    pr_wait += 1;
  }
  let waiting = 0;
  const waiting_lanes = [
    Array.isArray(queue.queue) ? queue.queue : [],
    ...(Array.isArray(queue.serial_lanes)
      ? queue.serial_lanes.map((/** @type {any} */ lane) =>
          Array.isArray(lane?.entries) ? lane.entries : []
        )
      : [])
  ];
  for (const entries of waiting_lanes) {
    for (const entry of entries) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || bead_id.length === 0) {
        continue;
      }
      if (claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      waiting += 1;
    }
  }
  // The runnable cache applies the same exclusion the aggregation uses, so the
  // remaining rows are exactly the candidates no earlier lane already drew.
  let runnable = 0;
  try {
    const rows = runnableFor(root_dir, lanedBeadIds(queue)) || [];
    for (const row of rows) {
      const bead_id = /** @type {any} */ (row)?.bead_id;
      if (typeof bead_id !== 'string' || bead_id.length === 0) {
        continue;
      }
      if (claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      runnable += 1;
    }
  } catch (err) {
    log('monitor: runnable count failed for %s: %o', root_dir, err);
  }
  return { running, pr_wait, queue: waiting, runnable, session_active };
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
 *   runnerCatalog?: () => Record<string, unknown>,
 *   issuePrefixFor?: (workspace_key: string) => string|null,
 *   sessionDefaultsFor?: (workspace_key: string) => { values: Record<string, string>, warnings: string[] },
 *   runnableFor?: (workspace_key: string, exclude_ids: Set<string>) => Array<Record<string, unknown>>,
 *   sessionActiveFor?: (workspace_key: string, exclude_ids: Set<string>) => Array<Record<string, unknown>>
 * }} [options] - Test seams; each defaults to the live server source.
 * @returns {Array<Record<string, unknown>>}
 */
export function buildMonitorWorkspacesState(options = {}) {
  const snapshotFor =
    options.snapshotFor ||
    ((/** @type {string} */ key) =>
      getWorkerRuntime().queueStore.snapshot(key));
  const issuePrefixFor = options.issuePrefixFor || cachedIssuePrefixFor;
  const sessionDefaultsFor =
    options.sessionDefaultsFor || cachedSessionDefaultsFor;
  const runnableFor =
    options.runnableFor ||
    ((/** @type {string} */ key, /** @type {Set<string>} */ exclude_ids) =>
      getWorkerRuntime().runnableCache.runnableFor(key, exclude_ids));
  const sessionActiveFor =
    options.sessionActiveFor ||
    ((/** @type {string} */ key, /** @type {Set<string>} */ exclude_ids) =>
      getWorkerRuntime().runnableCache.sessionActiveFor(key, exclude_ids));
  /** @type {Record<string, unknown>|null} */
  let runner_catalog = null;
  try {
    runner_catalog = (options.runnerCatalog || runtimeCatalog)();
  } catch {
    runner_catalog = null;
  }
  /** @type {Record<string, unknown>} */
  let execution_defaults;
  try {
    execution_defaults = projectExecutionDefaults(
      /** @type {any} */ (runner_catalog)
    );
  } catch {
    execution_defaults = {
      schema_version: null,
      supported: false,
      source_commit: null,
      digest: null,
      session: null,
      orchestration: null
    };
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
    /** @type {string|null} */
    let issue_prefix = null;
    try {
      const value = issuePrefixFor(root_dir);
      issue_prefix =
        typeof value === 'string' && value.length > 0 ? value : null;
    } catch {
      issue_prefix = null;
    }
    /** @type {{ values: Record<string, string>, warnings: string[] }} */
    let session_defaults = { values: {}, warnings: [] };
    try {
      const read = sessionDefaultsFor(root_dir);
      session_defaults = {
        values: read?.values || {},
        warnings: Array.isArray(read?.warnings) ? read.warnings : []
      };
    } catch {
      session_defaults = { values: {}, warnings: [] };
    }
    out.push({
      root_dir,
      name: path.basename(root_dir),
      issue_prefix,
      auto_advance: queue.auto_advance === true,
      auto_merge: queue.auto_merge === true,
      slots: typeof queue.slots === 'number' ? queue.slots : 1,
      revision: typeof queue.revision === 'number' ? queue.revision : 0,
      runner_catalog,
      // A legacy queue with no key is in the state the default describes: one
      // serial lane, auto-repair on. Both are read the same way the Worker
      // snapshot reads them, so a repo panel and the Worker tab agree.
      serial_lane_count:
        typeof queue.serial_lane_count === 'number'
          ? queue.serial_lane_count
          : 1,
      auto_repair: queue.auto_repair !== false,
      orchestration_model:
        typeof queue.orchestration_model === 'string'
          ? queue.orchestration_model
          : null,
      orchestration_effort:
        typeof queue.orchestration_effort === 'string'
          ? queue.orchestration_effort
          : null,
      orchestration_speed:
        typeof queue.orchestration_speed === 'string'
          ? queue.orchestration_speed
          : null,
      execution_defaults,
      // Cold/expired cache ships the empty layer and the fill re-pushes; see
      // `prewarmSessionDefaults`.
      session_defaults: session_defaults.values,
      session_defaults_warnings: session_defaults.warnings,
      counts: laneCountsFor(root_dir, queue, runnableFor, sessionActiveFor)
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
  prewarmVisibleIssuePrefixes();
  let workspaces = /** @type {Array<Record<string, unknown>>} */ ([]);
  try {
    workspaces = buildMonitorPipeline();
  } catch (err) {
    log('monitor: pipeline build failed: %o', err);
    return;
  }
  const body_json = JSON.stringify({
    workspaces,
    workspaces_state: safeWorkspacesState(),
    cross_lanes: safeCrossLanes()
  });
  for (const sub of SUBSCRIBERS) {
    pushSnapshotIfChanged(sub, 'monitor-pipeline-snapshot', body_json);
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
 * The stored cross-lane state, or `null` when the store could not be read
 * (UI-j92s §4.4). Fail-quiet like the control-state build: a lane file nobody
 * can parse must degrade the 연결 레인 pane, not suppress the whole push. The
 * `null` is meaningful downstream — it disables the lane ops rather than
 * drawing an empty lane list over lanes that exist (§7).
 *
 * @returns {CrossLanesState|null}
 */
function safeCrossLanes() {
  try {
    return sharedCrossLanesStore().read();
  } catch (err) {
    log('monitor: cross-lane state unreadable: %o', err);
    return null;
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
 * Everybody the runnable cache's scan serves (UI-0a2m): the aggregated monitor
 * viewers PLUS every per-workspace worker-queue viewer, whose 실행중 그리드
 * renders the same `session_active` bucket. Gating the `bd` spawn on the
 * monitor count alone would leave a worker-tab-only viewer with a lane that
 * never fills.
 */
function runnableScanSubscriberCount() {
  return SUBSCRIBERS.size + workerQueueSubscriberTotal();
}

/**
 * Re-push one workspace's worker-queue snapshot after a scan lands (UI-0a2m) —
 * the worker channel's delivery path for a `session_active` list that missed
 * the snapshot that asked for it, mirroring what {@link schedulePush} does for
 * the monitor. `fanout` no-ops when the workspace has no subscriber.
 *
 * @param {string} workspace
 */
function refanoutWorkerSnapshot(workspace) {
  try {
    fanout(workspace, getWorkerRuntime().queueStore.snapshot(workspace));
  } catch (err) {
    log('monitor: worker refanout failed for %s: %o', workspace, err);
  }
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
      // 채운 스캔은 두 채널 모두에 전달된다 (UI-0a2m): 모니터는 집계 재푸시,
      // 워커는 그 워크스페이스의 스냅샷 재전송으로.
      runnableCache().setOnFilled((workspace) => {
        schedulePush();
        refanoutWorkerSnapshot(workspace);
      });
      runnableCache().setSubscriberCount(runnableScanSubscriberCount);
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
  // 워커 구독 워크스페이스도 함께 돈다 (UI-0a2m): 모니터에서 숨긴 레포라도 그
  // 워커 탭이 세션 레인을 그리는 동안은 구독-시점 스캔에서 얼어붙으면 안 된다.
  const roots =
    listRoots ||
    (() => {
      const out = new Set(visibleWorkspaceRoots());
      try {
        for (const key of workerQueueSubscribedWorkspaces()) {
          out.add(path.resolve(String(key || '')));
        }
      } catch (err) {
        log('monitor: worker-subscribed roots unreadable: %o', err);
      }
      return [...out];
    });
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
    getClientCount: options.subscriberCount || runnableScanSubscriberCount,
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
 * so there is no reason to keep spawning `bd` across every repo. "Subscriber"
 * spans both channels (UI-0a2m): a monitor unsubscribe must not kill the driver
 * while a worker-tab viewer still renders the session lane. The poller itself
 * also gates every tick on the same count, so a driver left armed with zero
 * subscribers spawns nothing.
 */
function stopDriverIfIdle() {
  if (runnableScanSubscriberCount() > 0 || !refresh_driver) {
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
 * Arm the runnable/session scan machinery for a WORKER-queue viewer (UI-0a2m).
 * The worker channel's snapshot peeks the session bucket without triggering
 * fills, so its data depends entirely on the wiring this module owns — the
 * subscriber-count gate, the fill-completion delivery, and the periodic driver.
 * A worker-tab-only server lifetime must arm them too, or the session lane
 * never fills. Idempotent, called by the connection dispatcher on every
 * `subscribe-worker-queue`.
 */
export function ensureRunnableScanWired() {
  ensureRefreshWired();
  ensureDriverStarted();
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
  const sub = { ws, client_id };
  SUBSCRIBERS.add(sub);
  ensureRefreshWired();
  ensureDriverStarted();
  log('subscribe-monitor-pipeline %s', client_id);
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));

  prewarmVisibleIssuePrefixes();

  let workspaces = /** @type {Array<Record<string, unknown>>} */ ([]);
  try {
    workspaces = buildMonitorPipeline();
  } catch (err) {
    log('monitor: initial pipeline build failed: %o', err);
  }
  pushSnapshotIfChanged(
    sub,
    'monitor-pipeline-snapshot',
    JSON.stringify({
      workspaces,
      workspaces_state: safeWorkspacesState(),
      cross_lanes: safeCrossLanes()
    })
  );
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
 * Every registered workspace root, resolved — hidden ones INCLUDED (§4.3). A
 * lane member in a repo the user hid is still a lane member and renders as an
 * `외부` row; refusing the write would let a visibility toggle silently break
 * lane editing.
 *
 * @param {{ listWorkspaces?: () => Array<{ path: string }> }} [options]
 * @returns {string[]}
 */
function registeredWorkspaceRoots(options = {}) {
  const listWorkspaces = options.listWorkspaces || getAvailableWorkspaces;
  /** @type {string[]} */
  const out = [];
  try {
    for (const workspace of listWorkspaces()) {
      const raw = String(workspace?.path || '');
      if (raw.length === 0) {
        continue;
      }
      out.push(path.resolve(raw));
    }
  } catch (err) {
    log('monitor: workspace list unreadable for lane op: %o', err);
    return [];
  }
  return out;
}

/**
 * @param {unknown} value
 * @returns {number|null} The CAS revision, or null when it is not an integer.
 */
function laneExpectedRevision(value) {
  return Number.isInteger(value) ? Number(value) : null;
}

/**
 * Validate and normalize a request's `entries[]` into durable shape.
 *
 * The server checks FORMAT and workspace registration only. The fixed-row rules
 * (§5.3) are a client concern, and a closed or unknown bead never blocks a
 * write: right after a redeploy the caches are cold, and a server that guessed
 * "that bead does not exist" would corrupt a lane the user can still see.
 *
 * @param {unknown} raw
 * @param {() => string[]} listRegistered
 * @returns {{ ok: true, entries: CrossLaneEntry[] }|{ ok: false, message: string }}
 */
function normalizeRequestEntries(raw, listRegistered) {
  if (!Array.isArray(raw)) {
    return { ok: false, message: 'entries must be an array' };
  }
  const registered = new Set(listRegistered());
  /** @type {Set<string>} */
  const seen = new Set();
  /** @type {CrossLaneEntry[]} */
  const entries = [];
  for (const item of raw) {
    const entry = /** @type {any} */ (item);
    const bead_id =
      entry && typeof entry.bead_id === 'string' ? entry.bead_id.trim() : '';
    const raw_root =
      entry && typeof entry.root_dir === 'string' ? entry.root_dir.trim() : '';
    if (bead_id.length === 0 || raw_root.length === 0) {
      return { ok: false, message: 'entry requires { bead_id, root_dir }' };
    }
    if (seen.has(bead_id)) {
      return { ok: false, message: `duplicate bead_id: ${bead_id}` };
    }
    const root_dir = path.resolve(raw_root);
    if (!registered.has(root_dir)) {
      return { ok: false, message: `unregistered workspace: ${raw_root}` };
    }
    seen.add(bead_id);
    entries.push({ bead_id, root_dir });
  }
  return { ok: true, entries };
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {string} message
 */
function sendLaneBadRequest(ws, req, message) {
  ws.send(JSON.stringify(makeError(req, 'bad_request', message)));
}

/**
 * Reply to a rejected lane mutation.
 *
 * A `conflict` carries the whole current `cross_lanes` (§4.3): the client
 * re-plans the drag on the LATEST lanes — fixed rows, other lanes' membership,
 * the cycle check — instead of resending a plan built on entries that moved.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {{ code: string, message: string, state: CrossLanesState|null }} result
 */
function sendLaneFailure(ws, req, result) {
  const details =
    result.code === 'conflict' && result.state
      ? { cross_lanes: result.state }
      : undefined;
  ws.send(JSON.stringify(makeError(req, result.code, result.message, details)));
}

/**
 * The store all four lane ops mutate, and the push they schedule on success.
 *
 * @param {LaneOpOptions} options
 */
function laneOpDeps(options) {
  return {
    store: (options.crossLanesStore || sharedCrossLanesStore)(),
    listRegistered:
      options.listRegistered || (() => registeredWorkspaceRoots(options)),
    onApplied: options.onApplied || schedulePush
  };
}

/**
 * Test seams for the four lane ops; each defaults to the live server source.
 *
 * @typedef {Object} LaneOpOptions
 * @property {() => ReturnType<typeof sharedCrossLanesStore>} [crossLanesStore]
 * @property {() => Array<{ path: string }>} [listWorkspaces]
 * @property {() => string[]} [listRegistered]
 * @property {() => void} [onApplied]
 */

/**
 * Handle `monitor-lane-create`. Payload:
 * `{ entries?: Entry[], expected_revision }` (UI-j92s §4.3).
 *
 * Appends a `draft` lane — empty (the `+ 연결 레인` button) or seeded with one
 * drop. A draft creates no dependency and loads no queue; `확정` does that.
 * A second EMPTY draft is refused (`conflict_empty_lane`) because the pane
 * offers exactly one place to drop into and two would be indistinguishable.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {LaneOpOptions} [options]
 */
export function handleMonitorLaneCreate(ws, req, options = {}) {
  const p = /** @type {any} */ (req.payload || {});
  const expected_revision = laneExpectedRevision(p.expected_revision);
  if (expected_revision === null) {
    sendLaneBadRequest(
      ws,
      req,
      'payload requires an integer expected_revision'
    );
    return;
  }
  const { store, listRegistered, onApplied } = laneOpDeps(options);
  const normalized = normalizeRequestEntries(
    p.entries === undefined ? [] : p.entries,
    listRegistered
  );
  if (!normalized.ok) {
    sendLaneBadRequest(ws, req, normalized.message);
    return;
  }
  const seed = normalized.entries;
  const result = store.mutate(expected_revision, (next, ctx) => {
    if (
      seed.length === 0 &&
      next.lanes.some(
        (lane) => lane.status === 'draft' && lane.entries.length === 0
      )
    ) {
      return {
        ok: false,
        code: 'conflict_empty_lane',
        message: '빈 연결 레인이 이미 있습니다'
      };
    }
    /** @type {CrossLane} */
    const lane = {
      id: ctx.newLaneId(),
      status: 'draft',
      created_at: ctx.nowIso(),
      entries: seed
    };
    next.lanes.push(lane);
    return { ok: true, value: lane.id };
  });
  if (!result.ok) {
    sendLaneFailure(ws, req, result);
    return;
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        lane_id: result.value,
        revision: result.state.revision
      })
    )
  );
  onApplied();
}

/**
 * Handle `monitor-lane-update`. Payload:
 * `{ lane_id, entries: Entry[], expected_revision }` (UI-j92s §4.3).
 *
 * Replaces membership AND order in one write — insert, reorder and row-remove
 * are all the same op, so a drag never has to be expressed as two writes the
 * CAS could interleave.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {LaneOpOptions} [options]
 */
export function handleMonitorLaneUpdate(ws, req, options = {}) {
  const p = /** @type {any} */ (req.payload || {});
  const lane_id = typeof p.lane_id === 'string' ? p.lane_id : '';
  const expected_revision = laneExpectedRevision(p.expected_revision);
  if (lane_id.length === 0 || expected_revision === null) {
    sendLaneBadRequest(
      ws,
      req,
      'payload requires { lane_id, entries, expected_revision }'
    );
    return;
  }
  const { store, listRegistered, onApplied } = laneOpDeps(options);
  const normalized = normalizeRequestEntries(p.entries, listRegistered);
  if (!normalized.ok) {
    sendLaneBadRequest(ws, req, normalized.message);
    return;
  }
  const entries = normalized.entries;
  const result = store.mutate(expected_revision, (next) => {
    const lane = next.lanes.find((candidate) => candidate.id === lane_id);
    if (!lane) {
      return { ok: false, code: 'not_found', message: '레인이 없습니다' };
    }
    lane.entries = entries;
    return { ok: true };
  });
  if (!result.ok) {
    sendLaneFailure(ws, req, result);
    return;
  }
  ws.send(
    JSON.stringify(makeOk(req, { lane_id, revision: result.state.revision }))
  );
  onApplied();
}

/**
 * Handle `monitor-lane-confirm`. Payload:
 * `{ lane_id, expected_revision }` (UI-j92s §4.3).
 *
 * Flips `status` only. The adjacent `dep-add`s and the queue placements ride
 * the client's existing op paths right after, so this handler never runs `bd`.
 * Fewer than two members is a `bad_request`: a one-member lane has no adjacent
 * pair to depend on, so there would be nothing to confirm.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {LaneOpOptions} [options]
 */
export function handleMonitorLaneConfirm(ws, req, options = {}) {
  const p = /** @type {any} */ (req.payload || {});
  const lane_id = typeof p.lane_id === 'string' ? p.lane_id : '';
  const expected_revision = laneExpectedRevision(p.expected_revision);
  if (lane_id.length === 0 || expected_revision === null) {
    sendLaneBadRequest(
      ws,
      req,
      'payload requires { lane_id, expected_revision }'
    );
    return;
  }
  const { store, onApplied } = laneOpDeps(options);
  const result = store.mutate(expected_revision, (next) => {
    const lane = next.lanes.find((candidate) => candidate.id === lane_id);
    if (!lane) {
      return { ok: false, code: 'not_found', message: '레인이 없습니다' };
    }
    if (lane.entries.length < 2) {
      return {
        ok: false,
        code: 'bad_request',
        message: '확정하려면 멤버가 2개 이상이어야 합니다'
      };
    }
    lane.status = 'confirmed';
    return { ok: true };
  });
  if (!result.ok) {
    sendLaneFailure(ws, req, result);
    return;
  }
  ws.send(
    JSON.stringify(makeOk(req, { lane_id, revision: result.state.revision }))
  );
  onApplied();
}

/**
 * Handle `monitor-lane-remove`. Payload:
 * `{ lane_id, expected_revision }` (UI-j92s §4.3).
 *
 * Drops the lane. The `dep-remove`s for a confirmed lane are the client's, and
 * it sends them BEFORE this op (§5.5) — once the lane is gone nobody can tell
 * which adjacent pairs it used to own.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {LaneOpOptions} [options]
 */
export function handleMonitorLaneRemove(ws, req, options = {}) {
  const p = /** @type {any} */ (req.payload || {});
  const lane_id = typeof p.lane_id === 'string' ? p.lane_id : '';
  const expected_revision = laneExpectedRevision(p.expected_revision);
  if (lane_id.length === 0 || expected_revision === null) {
    sendLaneBadRequest(
      ws,
      req,
      'payload requires { lane_id, expected_revision }'
    );
    return;
  }
  const { store, onApplied } = laneOpDeps(options);
  const result = store.mutate(expected_revision, (next) => {
    const index = next.lanes.findIndex((candidate) => candidate.id === lane_id);
    if (index < 0) {
      return { ok: false, code: 'not_found', message: '레인이 없습니다' };
    }
    next.lanes.splice(index, 1);
    return { ok: true };
  });
  if (!result.ok) {
    sendLaneFailure(ws, req, result);
    return;
  }
  ws.send(
    JSON.stringify(makeOk(req, { lane_id, revision: result.state.revision }))
  );
  onApplied();
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
  foreign_blocker_status_cache.clear();
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
  issue_prefix_cache.clear();
  session_defaults_cache.clear();
  poll_interval_seconds = null;
}
