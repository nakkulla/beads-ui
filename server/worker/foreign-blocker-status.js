/**
 * Cross-rig blocker resolution: the visible rigs' issue prefixes, the status of
 * a blocker that lives in another one, and the cleanup that drops the closed
 * ones (UI-eey2 §10, moved to the creation point by UI-u6zf §3).
 *
 * `bd show` carries no `status` for a FOREIGN dependency, so the title cache
 * cannot drop a closed one the way it drops a closed same-rig blocker. This is
 * the resolver that fills that hole. It used to live in the monitor channel as
 * post-processing, which is exactly why UI-u6zf existed: when the Worker tab
 * became a second consumer of `bead_blocked_by`, the cleanup did not follow it
 * and closed foreign blockers stood as chips there.
 *
 * So the module sits BELOW `server/ws/worker-handlers.js`: `decorateQueue` —
 * the one place that builds the projection — applies it, and the monitor
 * receives an already-clean snapshot. `server/ws/monitor-handlers.js` imports
 * worker-handlers, never the reverse, and this layer keeps that direction
 * intact.
 *
 * The CACHED path (`foreignBlockerStatusFor` and everything feeding it) is
 * display only: a closed blocker is simply not a blocker, exactly as `bd ready`
 * already judges it, and no snapshot decoration is scheduling input. The one
 * exception is {@link queryForeignBlockerStatus} — the awaited, cache-free
 * lookup the Worker's prerequisite-wait judgment reads (2026-08-28
 * worker-prerequisite-wait-tier spec §4.2·§8). It shares only the prefix→rig
 * resolution; the status cache, its TTLs and its cleanup take no part in a
 * judgment, because a cached value cannot tell a landed answer from a failed
 * one at the moment the decision is made.
 */
import path from 'node:path';
import { runBdJsonProjected } from '../bd.js';
import { normalizeIssueList } from '../list-adapters.js';
import { debug } from '../logging.js';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import { sharedVisibleWorkspacesStore } from '../visible-workspaces-store.js';

const log = debug('worker:foreign-blocker');

const ISSUE_PREFIX_RETRY_MS = 5_000;
/**
 * Foreign blocker status cache TTLs (UI-eey2 §10). A closed foreign blocker
 * stays closed, so a long positive TTL is safe; a failed lookup retries sooner
 * because the usual cause (bd busy, rig unreadable) is transient.
 */
const FOREIGN_STATUS_TTL_MS = 5 * 60_000;
const FOREIGN_STATUS_RETRY_MS = 60_000;

/**
 * Process-local config projection per workspace. Successes stay cached; a
 * failed or malformed lookup remains null but becomes retryable after a short
 * delay instead of spawning `bd` on every snapshot (UI-2gi1 §6.3).
 *
 * `requesters` is the set of workspaces that ASKED — see {@link notifyResolved}.
 *
 * @type {Map<string, { value: string|null, retry_at: number, in_flight: boolean, requesters: Set<string> }>}
 */
const issue_prefix_cache = new Map();

/**
 * Process-local status cache for FOREIGN blockers (UI-eey2 §10): a `blocks`
 * dependency whose id belongs to another visible rig. Resolved with one
 * `bd show` in the OWNING rig, since that is the only place the edge carries a
 * status. Same `requesters` contract as the prefix cache.
 *
 * `closed_at` rides along so a CLOSED foreign blocker can also be reported as
 * the moment a bead over here was released (UI-d13v §3.4); it stays null for
 * every other answer.
 *
 * @type {Map<string, { status: string|null, closed_at: number|null, until: number, in_flight: boolean, requesters: Set<string> }>}
 */
const foreign_blocker_status_cache = new Map();

/**
 * Listeners woken when a cold lookup lands on something that can change a
 * snapshot.
 *
 * @type {Set<(requesters: Set<string>) => void>}
 */
const RESOLVED_LISTENERS = new Set();

/**
 * Register a listener for a landed lookup.
 *
 * The listener receives the workspaces that ASKED for it, which is the whole
 * point of the set (UI-u6zf §3.3·§3.4): the workspace holding the blocked bead
 * is not the workspace that owns the blocker, and waking the owner leaves the
 * stale snapshot exactly where it was. A consumer that draws every workspace at
 * once — the monitor — ignores the set and re-pushes its single view.
 *
 * @param {(requesters: Set<string>) => void} listener
 * @returns {() => void} Unregister.
 */
export function onForeignBlockerResolved(listener) {
  RESOLVED_LISTENERS.add(listener);
  return () => {
    RESOLVED_LISTENERS.delete(listener);
  };
}

/**
 * @param {Set<string>} requesters
 */
function notifyResolved(requesters) {
  for (const listener of RESOLVED_LISTENERS) {
    try {
      listener(new Set(requesters));
    } catch (err) {
      log('resolved listener failed: %o', err);
    }
  }
}

/**
 * @param {Set<string>|undefined} requesters
 * @param {string|undefined} requester_root
 * @returns {Set<string>}
 */
function withRequester(requesters, requester_root) {
  const out = requesters instanceof Set ? requesters : new Set();
  if (typeof requester_root === 'string' && requester_root.length > 0) {
    out.add(path.resolve(requester_root));
  }
  return out;
}

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
 * Synchronous cache-hit projection. Cold reads as unknown; {@link
 * prewarmIssuePrefix} is what fills it.
 *
 * @param {string} root_dir
 * @returns {string|null}
 */
export function cachedIssuePrefixFor(root_dir) {
  return issue_prefix_cache.get(path.resolve(root_dir))?.value || null;
}

/**
 * Start at most one async `bd config list --json` lookup for a workspace.
 *
 * @param {string} root_dir - The workspace whose prefix is being read.
 * @param {string} [requester_root] - The workspace that needs the answer, which
 * is NOT `root_dir` when a blocked bead over here names a bead over there.
 */
export function prewarmIssuePrefix(root_dir, requester_root) {
  const key = path.resolve(root_dir);
  const current = issue_prefix_cache.get(key);
  if (current && current.value !== null) {
    // Answered, and a rig's prefix does not change under us. Nobody is waiting.
    return;
  }
  if (
    current?.in_flight === true ||
    (current && current.retry_at > Date.now())
  ) {
    // Unresolved — in flight, or backing off before the next attempt. Either
    // way this caller is still waiting on an answer nobody has yet, so it joins
    // the set instead of being forgotten: the attempt that finally succeeds is
    // the one that must wake it (UI-u6zf §3.4). Dropping it here left the
    // snapshot stale until something unrelated happened to move it.
    current.requesters = withRequester(current.requesters, requester_root);
    return;
  }
  issue_prefix_cache.set(key, {
    value: current?.value || null,
    retry_at: current?.retry_at || 0,
    in_flight: true,
    requesters: withRequester(current?.requesters, requester_root)
  });
  void runBdJsonProjected('config', ['config', 'list', '--json'], { cwd: key })
    .then((result) => {
      const issue_prefix =
        result.ok === true ? issuePrefixFromConfig(result.data) : null;
      const requesters = withRequester(
        issue_prefix_cache.get(key)?.requesters,
        undefined
      );
      issue_prefix_cache.set(key, {
        value: issue_prefix,
        retry_at:
          issue_prefix === null ? Date.now() + ISSUE_PREFIX_RETRY_MS : Infinity,
        in_flight: false,
        // Cleared only once the waiters have actually been told; an
        // unresolved entry carries them into the next attempt.
        requesters: issue_prefix === null ? requesters : new Set()
      });
      if (issue_prefix !== null) {
        notifyResolved(requesters);
      }
    })
    .catch((err) => {
      issue_prefix_cache.set(key, {
        value: null,
        retry_at: Date.now() + ISSUE_PREFIX_RETRY_MS,
        in_flight: false,
        requesters: withRequester(
          issue_prefix_cache.get(key)?.requesters,
          undefined
        )
      });
      log('issue prefix lookup failed for %s: %o', key, err);
    });
}

/**
 * Rig prefix of a bead id — the part before the first `-` (same split as the
 * client's `classifyBlockerPrefix`).
 *
 * @param {string} bead_id
 */
export function prefixOfBeadId(bead_id) {
  const split_at = bead_id.indexOf('-');
  return split_at > 0 ? bead_id.slice(0, split_at) : bead_id;
}

/**
 * Cached status of a foreign blocker, kicking one async `bd show` in the owning
 * rig when the cache is cold or expired. `null` until known.
 *
 * @param {string} bead_id
 * @param {string} owner_root - Visible workspace whose prefix owns the id.
 * @param {string} [requester_root] - The workspace whose snapshot is waiting.
 * @returns {string|null}
 */
export function foreignBlockerStatusFor(bead_id, owner_root, requester_root) {
  const key = foreignStatusKey(bead_id, owner_root);
  const hit = foreign_blocker_status_cache.get(key);
  const now = Date.now();
  if (hit && (hit.in_flight || hit.until > now)) {
    // A caller that arrives while the answer is in flight, or while a failed
    // lookup is backing off, is still waiting on something nobody knows yet —
    // so it joins the set (UI-u6zf §3.3). It joins on a cached `open` too: that
    // entry is what the next attempt updates, and the attempt that finally sees
    // `closed` must wake everyone whose chip that closes, not only whichever
    // workspace happened to trigger it.
    hit.requesters = withRequester(hit.requesters, requester_root);
    return hit.status;
  }
  foreign_blocker_status_cache.set(key, {
    status: hit?.status ?? null,
    closed_at: hit?.closed_at ?? null,
    until: hit?.until ?? 0,
    in_flight: true,
    requesters: withRequester(hit?.requesters, requester_root)
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
      const requesters = withRequester(
        foreign_blocker_status_cache.get(key)?.requesters,
        undefined
      );
      foreign_blocker_status_cache.set(key, {
        status,
        closed_at: closedAtOfShow(result),
        until:
          Date.now() +
          (status === null ? FOREIGN_STATUS_RETRY_MS : FOREIGN_STATUS_TTL_MS),
        in_flight: false,
        // Cleared only once the waiters have been told. Any other answer leaves
        // them in place: their chip is still standing, and the attempt that
        // eventually reads `closed` is the one that owes them the wake-up.
        requesters: status === 'closed' ? new Set() : requesters
      });
      // Only `closed` wakes anyone: every other answer is what the screen is
      // already drawing.
      if (status === 'closed') {
        notifyResolved(requesters);
      }
    })
    .catch((err) => {
      foreign_blocker_status_cache.set(key, {
        status: hit?.status ?? null,
        closed_at: hit?.closed_at ?? null,
        until: Date.now() + FOREIGN_STATUS_RETRY_MS,
        in_flight: false,
        requesters: withRequester(
          foreign_blocker_status_cache.get(key)?.requesters,
          undefined
        )
      });
      log('foreign blocker lookup failed for %s: %o', bead_id, err);
    });
  return hit?.status ?? null;
}

/**
 * When a CLOSED foreign blocker was closed, from the same cache entry and the
 * same lookup schedule as {@link foreignBlockerStatusFor} (UI-d13v §3.4).
 *
 * `null` covers every "not known to be released" case — cache miss, still open,
 * closed without a readable `closed_at` — because the caller must be able to
 * tell "released at T" from "no idea", never turn silence into "not released".
 *
 * @param {string} bead_id
 * @param {string} owner_root - Visible workspace whose prefix owns the id.
 * @param {string} [requester_root] - The workspace whose snapshot is waiting.
 * @returns {number|null}
 */
export function foreignBlockerClosedAtFor(bead_id, owner_root, requester_root) {
  // Routed through the status reader so a cold or expired entry schedules the
  // same single `bd show` and registers the same waiter.
  const status = foreignBlockerStatusFor(bead_id, owner_root, requester_root);
  if (status !== 'closed') {
    return null;
  }
  const closed_at = foreign_blocker_status_cache.get(
    foreignStatusKey(bead_id, owner_root)
  )?.closed_at;
  return typeof closed_at === 'number' ? closed_at : null;
}

/**
 * @typedef {{ ok: true, status: string }
 *   | { ok: false, reason: 'no_rig'|'bd_failed'|'unparsable' }} ForeignBlockerQuery
 */

/**
 * The status of a FOREIGN blocker, read to the end (waiting-tier spec §4.2).
 *
 * Deliberately NOT {@link foreignBlockerStatusFor}: that reader answers from
 * the cache and only STARTS a lookup, so at the moment a judgment runs it
 * cannot tell "closed" from "not asked yet" from "asked and failed". A
 * scheduling decision needs those apart, so this path awaits the `bd show` and
 * touches neither the status cache nor its TTL.
 *
 * `ok:false` is JUDGMENT IMPOSSIBLE, never "assume still blocking": the caller
 * falls back to its ordinary settlement rather than inventing an answer.
 *
 * The prefix→rig resolution IS shared with the display path, because there is
 * only one of it. A cold prefix is resolved with an immediate `bd config` read
 * rather than {@link prewarmIssuePrefix}, so this call never depends on a
 * background lookup landing first — and never fills the cache on its behalf.
 *
 * @param {string} bead_id - The blocker, whose prefix names its owning rig.
 * @param {string} requester_root - The workspace holding the blocked bead; it
 * is excluded from the search because a blocker over here is not foreign.
 * @param {{
 *   listRoots?: () => string[],
 *   issuePrefixFor?: (root_dir: string) => string|null,
 *   runJson?: typeof runBdJsonProjected
 * }} [options] - Test seams; each defaults to the live source.
 * @returns {Promise<ForeignBlockerQuery>}
 */
export async function queryForeignBlockerStatus(
  bead_id,
  requester_root,
  options = {}
) {
  const runJson = options.runJson || runBdJsonProjected;
  const listRoots = options.listRoots || (() => visibleWorkspaceRoots());
  const issuePrefixFor = options.issuePrefixFor || cachedIssuePrefixFor;
  const requester = path.resolve(String(requester_root || ''));
  const prefix = prefixOfBeadId(bead_id);
  /** @type {string[]} */
  let roots;
  try {
    roots = listRoots();
  } catch (err) {
    log('visible roots unreadable while resolving %s: %o', bead_id, err);
    return { ok: false, reason: 'no_rig' };
  }
  /** @type {string|null} */
  let owner_root = null;
  for (const root of roots) {
    if (root === requester) {
      continue;
    }
    /** @type {string|null} */
    let owner_prefix = null;
    try {
      owner_prefix = issuePrefixFor(root);
    } catch {
      owner_prefix = null;
    }
    if (owner_prefix === null) {
      try {
        const config = await runJson('config', ['config', 'list', '--json'], {
          cwd: root
        });
        owner_prefix =
          config && config.ok === true
            ? issuePrefixFromConfig(config.data)
            : null;
      } catch (err) {
        log('issue prefix read failed for %s: %o', root, err);
        owner_prefix = null;
      }
    }
    if (owner_prefix !== null && owner_prefix === prefix) {
      owner_root = root;
      break;
    }
  }
  if (owner_root === null) {
    return { ok: false, reason: 'no_rig' };
  }
  /** @type {any} */
  let shown;
  try {
    shown = await runJson('show', ['show', bead_id, '--json'], {
      cwd: owner_root,
      expected_id: bead_id
    });
  } catch (err) {
    log('foreign blocker query threw for %s: %o', bead_id, err);
    return { ok: false, reason: 'bd_failed' };
  }
  if (!shown || shown.ok !== true) {
    return { ok: false, reason: 'bd_failed' };
  }
  const status =
    shown.data && typeof shown.data === 'object'
      ? /** @type {any} */ (shown.data).status
      : null;
  if (typeof status !== 'string' || status.length === 0) {
    return { ok: false, reason: 'unparsable' };
  }
  return { ok: true, status };
}

/**
 * @param {string} bead_id
 * @param {string} owner_root
 * @returns {string}
 */
function foreignStatusKey(bead_id, owner_root) {
  return `${path.resolve(owner_root)}\u0000${bead_id}`;
}

/**
 * Read `closed_at` off a `bd show` answer through the SAME normalization the
 * snapshot rows get, so a foreign release timestamp and a same-rig one are the
 * same kind of number.
 *
 * @param {unknown} result
 * @returns {number|null}
 */
function closedAtOfShow(result) {
  if (!result || typeof result !== 'object') {
    return null;
  }
  const record = /** @type {{ ok?: unknown, data?: unknown }} */ (result);
  if (record.ok !== true || !record.data || typeof record.data !== 'object') {
    return null;
  }
  return normalizeIssueList([record.data])[0]?.closed_at ?? null;
}

/**
 * The visible workspace roots, straight from the registry minus the hidden set.
 *
 * The ONE place "visible" is decided — the monitor's payload arrays, its driver
 * walks and this cleanup all read it, so a repo can never be in one and out of
 * the other.
 *
 * @param {{ listWorkspaces?: () => Array<{ path: string }>, listHidden?: () => string[] }} [options]
 * @returns {string[]}
 */
export function visibleWorkspaceRoots(options = {}) {
  const listWorkspaces = options.listWorkspaces || getAvailableWorkspaces;
  const listHidden =
    options.listHidden || (() => sharedVisibleWorkspacesStore().listHidden());
  /** @type {Set<string>} */
  let hidden = new Set();
  try {
    hidden = new Set(listHidden().map((p) => path.resolve(p)));
  } catch (err) {
    log('hidden set unreadable: %o', err);
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
    log('workspace list unreadable: %o', err);
    return [];
  }
  return out;
}

/**
 * Drop CLOSED foreign blockers from a workspace's `bead_blocked_by` projection
 * (UI-eey2 §10). Same-rig blockers are left alone — the title cache already
 * excluded the closed ones from that source. Unknown status keeps the id
 * (fail-visible until the lookup lands); an id whose prefix matches no other
 * visible rig is untouched.
 *
 * `blocker_workspaces` reports the owning root of every SURVIVING foreign
 * blocker (UI-u6zf §4) — the map is already computed here for the pruning, and
 * a dropped blocker has no chip to open. `unowned` says whether some foreign
 * candidate found no owner, which is the prefix cache asking to be warmed.
 *
 * @param {Record<string, any>} projected - Mutated in place.
 * @param {string} root_dir
 * @param {string[]} roots - Every visible workspace root.
 * @param {(root_dir: string) => string|null} issuePrefixFor
 * @param {(bead_id: string, owner_root: string) => string|null} statusFor
 * @returns {{ blocker_workspaces: Record<string, string>, unowned: boolean }}
 */
export function pruneClosedForeignBlockers(
  projected,
  root_dir,
  roots,
  issuePrefixFor,
  statusFor
) {
  /** @type {Record<string, string>} */
  const blocker_workspaces = {};
  const map = projected.bead_blocked_by;
  if (!map || typeof map !== 'object' || Array.isArray(map)) {
    return { blocker_workspaces, unowned: false };
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
  let unowned = false;
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
        unowned = true;
        return true;
      }
      if (statusFor(blocker, owner_root) === 'closed') {
        return false;
      }
      blocker_workspaces[blocker] = owner_root;
      return true;
    });
  }
  projected.bead_blocked_by = out;
  return { blocker_workspaces, unowned };
}

/**
 * Apply the cleanup to one workspace's projection and attach the owning roots
 * of what survives (UI-u6zf §3.2·§3.5).
 *
 * The cheap gate matters: `decorateQueue` runs on every reply and every fanout,
 * and {@link visibleWorkspaceRoots} reads the registry plus the hidden store.
 * So the workspace list is computed only when some blocker id carries a prefix
 * this repo does not own — for most snapshots the decision is one string
 * comparison, or no blockers at all.
 *
 * @param {Record<string, any>} projected - Mutated in place.
 * @param {string} root_dir
 * @param {{
 *   listRoots?: () => string[],
 *   issuePrefixFor?: (root_dir: string) => string|null,
 *   statusFor?: (bead_id: string, owner_root: string, requester_root: string) => string|null,
 *   prewarm?: (root_dir: string, requester_root: string) => void
 * }} [options] - Test seams; each defaults to the live source.
 */
export function applyForeignBlockerCleanup(projected, root_dir, options = {}) {
  const map = projected.bead_blocked_by;
  if (!map || typeof map !== 'object' || Array.isArray(map)) {
    return;
  }
  const issuePrefixFor = options.issuePrefixFor || cachedIssuePrefixFor;
  const statusFor = options.statusFor || foreignBlockerStatusFor;
  const prewarm = options.prewarm || prewarmIssuePrefix;
  const listRoots = options.listRoots || (() => visibleWorkspaceRoots());
  /** @type {string|null} */
  let self_prefix = null;
  try {
    self_prefix = issuePrefixFor(root_dir);
  } catch {
    self_prefix = null;
  }
  let has_candidate = false;
  for (const blockers of Object.values(map)) {
    if (!Array.isArray(blockers)) {
      continue;
    }
    for (const blocker of blockers) {
      if (typeof blocker !== 'string' || blocker.length === 0) {
        continue;
      }
      if (self_prefix === null || prefixOfBeadId(blocker) !== self_prefix) {
        has_candidate = true;
        break;
      }
    }
    if (has_candidate) {
      break;
    }
  }
  if (!has_candidate) {
    return;
  }
  const roots = listRoots();
  const { blocker_workspaces, unowned } = pruneClosedForeignBlockers(
    projected,
    root_dir,
    roots,
    issuePrefixFor,
    (bead_id, owner_root) => statusFor(bead_id, owner_root, root_dir)
  );
  if (unowned) {
    // The Worker path owns the prewarm too (UI-u6zf §3.4). Without it a session
    // that never opened the monitor has a cold prefix cache, finds no owner and
    // the cleanup never runs at all. The requester is THIS workspace — the one
    // holding the blocked bead — not the rig whose prefix is being read.
    for (const other of roots) {
      prewarm(other, root_dir);
    }
  }
  if (Object.keys(blocker_workspaces).length > 0) {
    projected.blocker_workspaces = blocker_workspaces;
  }
}

/**
 * Test-only: forget every cached prefix and foreign status.
 */
export function __resetForeignBlockerCachesForTest() {
  issue_prefix_cache.clear();
  foreign_blocker_status_cache.clear();
}
