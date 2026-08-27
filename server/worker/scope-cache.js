/**
 * Declared-scope cache for the waiting-lane overlap chips (UI-qm12 §4.1).
 *
 * The chips answer "이 대기 이슈가 지금 출발하면 누구와 부딪히나" from a fact the
 * specs already declare — the front-matter `scope:` of each bead's spec (and
 * plan). Reading that fact costs one or two `git cat-file` per bead at the
 * PINNED base, which is far too slow for the synchronous snapshot decoration,
 * so it is cached here on the shape `title-cache.js` established: a synchronous
 * {@link createScopeCache} `peek`, an asynchronous `fill`, and an `onFilled`
 * fanout that delivers what the asking snapshot had to omit.
 *
 * NON-PERSISTED and DISPLAY-ONLY. Nothing schedules, admits, or writes bd on
 * this signal — see the spec's §3 design principles.
 *
 * FRESHNESS rides the base, not an invalidation: the value records the
 * `base_oid` it was read at, and a refill that resolves the same base skips the
 * read entirely. A spec edited at the base moved the base to get there, so the
 * mismatch is what re-reads it.
 */
import path from 'node:path';
import { debug } from '../logging.js';
import { workerAnalysisContext } from './attach.js';
import { scopeAtBase } from './scope-at-base.js';

const log = debug('worker:scope-cache');

/**
 * How long a SUCCESSFUL read stays fresh. Same 5 minutes as the title cache's
 * `POSITIVE_TTL_MS`, and for the same reason: the refill is cheap, bounded by
 * the number of lane rows, and the value it protects is display-only.
 *
 * @type {number}
 */
const POSITIVE_TTL_MS = 5 * 60_000;

/**
 * How long a FAILED read (no attachment, unresolved base, unreadable artifact)
 * is remembered. A bead that cannot be read sits in every later snapshot too,
 * so without this the miss would re-spawn `git` on every push.
 *
 * @type {number}
 */
const NEGATIVE_TTL_MS = 60_000;

/** @type {RegExp} A resolved base tip. */
const OID_RE = /^[0-9a-fA-F]{40}$/;

/**
 * One cached read.
 *
 * `scope === null` is the FAILED state, and is deliberately not the same as an
 * empty array: `[]` means every artifact was read and declared nothing, which
 * the client renders as `scope 없음`.
 *
 * A failed record carries `base_oid: ''` rather than the base it failed at, so
 * the next refill after {@link NEGATIVE_TTL_MS} re-reads instead of pinning the
 * failure to a base that may not move for hours.
 *
 * @typedef {Object} ScopeRecord
 * @property {string} base_oid
 * @property {string[]|null} scope
 * @property {number} at
 */

/**
 * @typedef {{ state: 'hit', scope: string[] }|{ state: 'miss' }|{ state: 'failed' }} ScopePeek
 */

/**
 * @typedef {Object} ScopeCacheOptions
 * @property {() => number} [now]
 * @property {number} [positive_ttl_ms]
 * @property {number} [negative_ttl_ms]
 * @property {(workspace_key: string) => ReturnType<typeof workerAnalysisContext>} [contextFor]
 */

/**
 * Create a declared-scope cache. One instance is held process-wide by
 * {@link scopeCache} so the queue decoration and the monitor pipeline read the
 * same values; the factory exists for tests.
 *
 * @param {ScopeCacheOptions} [options]
 */
export function createScopeCache(options = {}) {
  const now = options.now || (() => Date.now());
  const positive_ttl_ms =
    typeof options.positive_ttl_ms === 'number'
      ? options.positive_ttl_ms
      : POSITIVE_TTL_MS;
  const negative_ttl_ms =
    typeof options.negative_ttl_ms === 'number'
      ? options.negative_ttl_ms
      : NEGATIVE_TTL_MS;
  const contextFor =
    options.contextFor ||
    ((/** @type {string} */ workspace_key) =>
      workerAnalysisContext(workspace_key));

  /** @type {Map<string, ScopeRecord>} */
  const records = new Map();
  /**
   * Fills currently running, keyed by the cache key. A key already being filled
   * is never scheduled twice — the running fill's completion is what delivers
   * it, so a burst of snapshots collapses to one read.
   *
   * @type {Map<string, Promise<void>>}
   */
  const in_flight = new Map();
  /** @type {Map<string, number>} */
  const flights_by_workspace = new Map();
  /**
   * The tail of each workspace's fill chain. Fills are SERIALIZED per workspace
   * so a wide snapshot costs one `git` process at a time, exactly like the title
   * cache's chained `bd show` batch.
   *
   * @type {Map<string, Promise<unknown>>}
   */
  const gate_by_workspace = new Map();
  /** @type {Set<(workspace_key: string) => void>} */
  const listeners = new Set();

  /**
   * Workspace keys are RESOLVED like the queue store's, so a decoration's
   * connection root and a fill's workspace root address the same lane.
   *
   * @param {string} workspace_key
   * @returns {string}
   */
  function keyOf(workspace_key) {
    return path.resolve(String(workspace_key || ''));
  }

  /**
   * The cache key. NUL-joined so no workspace path or artifact path can forge
   * another pair's key.
   *
   * @param {string} workspace
   * @param {string[]} artifact_paths
   * @returns {string}
   */
  function cacheKeyOf(workspace, artifact_paths) {
    return `${workspace}\u0000${artifact_paths.join('\u0000')}`;
  }

  /**
   * @param {string[]} artifact_paths
   * @returns {string[]}
   */
  function normalizedPaths(artifact_paths) {
    /** @type {string[]} */
    const out = [];
    for (const raw of Array.isArray(artifact_paths) ? artifact_paths : []) {
      if (typeof raw === 'string' && raw.length > 0) {
        out.push(raw);
      }
    }
    return out;
  }

  /**
   * @param {ScopeRecord} record
   * @returns {boolean}
   */
  function isExpired(record) {
    const ttl = record.scope === null ? negative_ttl_ms : positive_ttl_ms;
    return now() - record.at >= ttl;
  }

  /**
   * @param {string} workspace
   * @param {string} cache_key
   */
  function rememberFailure(workspace, cache_key) {
    records.set(cache_key, { base_oid: '', scope: null, at: now() });
    log('scope unreadable in %s (%s)', workspace, cache_key);
  }

  /**
   * @param {string} workspace
   */
  function announceFilled(workspace) {
    for (const listener of listeners) {
      try {
        listener(workspace);
      } catch (err) {
        log('scope fill callback failed for %s: %o', workspace, err);
      }
    }
  }

  /**
   * The read itself. Every failure mode collapses to the negative record,
   * because the caller treats them identically: draw no chip and retry later.
   *
   * @param {string} workspace
   * @param {string[]} artifact_paths
   * @param {string} cache_key
   */
  async function readInto(workspace, artifact_paths, cache_key) {
    /** @type {ReturnType<typeof workerAnalysisContext>} */
    let context = null;
    try {
      context = contextFor(workspace);
    } catch (err) {
      log('scope context failed for %s: %o', workspace, err);
      context = null;
    }
    if (!context) {
      rememberFailure(workspace, cache_key);
      return;
    }
    /** @type {import('./target-base.js').TargetBaseResult|null} */
    let base = null;
    try {
      base = await context.resolveBase({ force: false });
    } catch (err) {
      log('scope base resolution failed for %s: %o', workspace, err);
      base = null;
    }
    if (!base || base.ok !== true || !OID_RE.test(base.base_oid)) {
      rememberFailure(workspace, cache_key);
      return;
    }
    const base_oid = base.base_oid;
    const existing = records.get(cache_key);
    if (existing && existing.scope !== null && existing.base_oid === base_oid) {
      // Same pinned base ⇒ the same blobs ⇒ the same declaration. Only the
      // freshness stamp moves.
      existing.at = now();
      return;
    }
    const scope = await scopeAtBase(
      context.gitRun,
      base_oid,
      artifact_paths,
      true
    );
    if (scope === null) {
      rememberFailure(workspace, cache_key);
      return;
    }
    records.set(cache_key, { base_oid, scope, at: now() });
  }

  /**
   * Read one artifact set into the cache. NEVER rejects, and never runs twice
   * for the same key at once.
   *
   * @param {string} workspace_key
   * @param {string[]} artifact_paths
   * @returns {Promise<void>}
   */
  function fill(workspace_key, artifact_paths) {
    const paths = normalizedPaths(artifact_paths);
    if (paths.length === 0) {
      return Promise.resolve();
    }
    const workspace = keyOf(workspace_key);
    const cache_key = cacheKeyOf(workspace, paths);
    const running = in_flight.get(cache_key);
    if (running) {
      return running;
    }
    const gate = gate_by_workspace.get(workspace);
    // Declared before the body so the body's own bookkeeping can compare
    // against it; the comparison is always reached after an await, so the
    // placeholder is never the value observed.
    /** @type {Promise<void>} */
    let run = Promise.resolve();
    run = (async () => {
      if (gate) {
        await gate;
      }
      try {
        await readInto(workspace, paths, cache_key);
      } catch (err) {
        log('scope fill failed for %s (%s): %o', workspace, cache_key, err);
        rememberFailure(workspace, cache_key);
      } finally {
        if (in_flight.get(cache_key) === run) {
          in_flight.delete(cache_key);
        }
        const left = (flights_by_workspace.get(workspace) || 1) - 1;
        if (left > 0) {
          flights_by_workspace.set(workspace, left);
        } else {
          // The LAST fill of a burst announces once, so a snapshot that missed
          // ten beads triggers one refanout rather than ten.
          flights_by_workspace.delete(workspace);
          if (gate_by_workspace.get(workspace) === run) {
            gate_by_workspace.delete(workspace);
          }
          announceFilled(workspace);
        }
      }
    })();
    in_flight.set(cache_key, run);
    flights_by_workspace.set(
      workspace,
      (flights_by_workspace.get(workspace) || 0) + 1
    );
    gate_by_workspace.set(workspace, run);
    return run;
  }

  return {
    /**
     * The SYNCHRONOUS read the snapshot decoration and the monitor pipeline
     * both use. Stale-while-revalidate: an expired record still answers, and
     * schedules its own refill. A cold miss answers `miss` and schedules the
     * first read; neither ever blocks the push that asked.
     *
     * @param {string} workspace_key
     * @param {string[]} artifact_paths
     * @returns {ScopePeek}
     */
    peek(workspace_key, artifact_paths) {
      const paths = normalizedPaths(artifact_paths);
      if (paths.length === 0) {
        return { state: 'miss' };
      }
      const cache_key = cacheKeyOf(keyOf(workspace_key), paths);
      const record = records.get(cache_key);
      if (!record) {
        void fill(workspace_key, paths);
        return { state: 'miss' };
      }
      if (isExpired(record)) {
        void fill(workspace_key, paths);
      }
      return record.scope === null
        ? { state: 'failed' }
        : { state: 'hit', scope: record.scope };
    },

    fill,

    /**
     * Register a "scope landed" callback. The ws layer wires this to the queue
     * fanout, which is the whole delivery path for a value that missed the
     * snapshot that asked for it.
     *
     * @param {(workspace_key: string) => void} listener
     * @returns {() => void} Unregister.
     */
    onFilled(listener) {
      if (typeof listener !== 'function') {
        return () => {};
      }
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    /**
     * Drop every cached read (test hook / restart semantics). Listeners are
     * WIRING, not state, and survive — clearing them would silently kill the
     * refill fanout.
     */
    clear() {
      records.clear();
      in_flight.clear();
      flights_by_workspace.clear();
      gate_by_workspace.clear();
    }
  };
}

/**
 * The process-wide instance. Lazily built so a test that replaces it is not
 * racing a module-load construction.
 *
 * @type {ReturnType<typeof createScopeCache>|null}
 */
let SINGLETON = null;

/**
 * The declared-scope cache every snapshot path shares. `decorateQueue` and
 * `buildMonitorPipeline` both read THIS instance, so a queued bead and a
 * runnable one can never disagree about the same artifact set.
 */
export function scopeCache() {
  if (!SINGLETON) {
    SINGLETON = createScopeCache();
  }
  return SINGLETON;
}

/**
 * @param {ReturnType<typeof createScopeCache>} instance
 */
export function __setScopeCacheForTest(instance) {
  SINGLETON = instance;
}

export function __resetScopeCacheForTest() {
  SINGLETON = null;
}
