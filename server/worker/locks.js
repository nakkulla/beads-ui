/**
 * 4-layer parallel-resource lock hierarchy (spec §5.5).
 *
 * All locks are IN-PROCESS async mutexes (a keyed queue of promises). This is
 * correct for the single-instance topology beads-ui runs in: one server process
 * owns all sessions, so serializing here serializes everything. It is NOT a
 * cross-process lock — a second server instance would not observe these.
 *
 * Layers (acquire in this order to avoid deadlock):
 *   1. (database, bead_id) — dup-run / metadata-contention guard.
 *   2. repo git-topology  — serialize worktree add/remove, fetch, branch ops.
 *   3. (repo, target_base) — merge lock (spec §5.2); breaker-aware.
 *   4. shared-service      — restart / install lock.
 *
 * The merge lock is breaker-aware: when a repo's circuit breaker is tripped,
 * merge acquisition is refused (the caller answers 423) so no in-flight session
 * can merge into a repo that has already failed.
 */

/**
 * Error thrown when a merge lock is refused because the repo's breaker tripped.
 */
export class MergeBlockedError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = 'MergeBlockedError';
    /** @type {'MERGE_BLOCKED'} */
    this.code = 'MERGE_BLOCKED';
  }
}

/**
 * @typedef {() => void} Release
 */

/**
 * Create an in-process lock manager.
 *
 * @param {{ isMergeBlocked?: (repo: string, target_base: string) => boolean }} [options]
 * @returns {{
 *   acquire: (key: string) => Promise<Release>,
 *   dupRunLock: (database: string, bead_id: string) => Promise<Release>,
 *   topologyLock: (repo: string) => Promise<Release>,
 *   acquireMerge: (repo: string, target_base: string) => Promise<Release>,
 *   serviceLock: () => Promise<Release>,
 *   isLocked: (key: string) => boolean
 * }}
 */
export function createLockManager(options = {}) {
  const isMergeBlocked = options.isMergeBlocked || (() => false);

  /**
   * Tail promise per key: the last-enqueued waiter. A fresh acquire chains off
   * the current tail so acquisitions run strictly in arrival order.
   *
   * @type {Map<string, Promise<unknown>>}
   */
  const tails = new Map();

  /**
   * Acquire a keyed lock. Resolves to a `release` function once the lock is
   * held; the next waiter proceeds only after `release()` is called.
   *
   * @param {string} key
   * @returns {Promise<Release>}
   */
  function acquire(key) {
    const prev = tails.get(key) || Promise.resolve();
    /** @type {() => void} */
    let releaseHeld = () => {};
    const held = new Promise((resolve) => {
      releaseHeld = () => resolve(undefined);
    });
    const newTail = prev.then(() => held);
    tails.set(key, newTail);
    // Drop the map entry once the whole chain drains (prevents unbounded growth).
    newTail.then(() => {
      if (tails.get(key) === newTail) {
        tails.delete(key);
      }
    });
    return prev.then(() => releaseHeld);
  }

  return {
    acquire,

    /**
     * @param {string} database
     * @param {string} bead_id
     * @returns {Promise<Release>}
     */
    dupRunLock(database, bead_id) {
      return acquire(`db:${database}::bead:${bead_id}`);
    },

    /**
     * @param {string} repo
     * @returns {Promise<Release>}
     */
    topologyLock(repo) {
      return acquire(`repo:${repo}::topology`);
    },

    /**
     * Acquire the (repo, target_base) merge lock. Refused (throws
     * {@link MergeBlockedError}) when the repo's breaker is tripped.
     *
     * @param {string} repo
     * @param {string} target_base
     * @returns {Promise<Release>}
     */
    acquireMerge(repo, target_base) {
      if (isMergeBlocked(repo, target_base)) {
        return Promise.reject(
          new MergeBlockedError(
            `merge lock refused for ${repo}@${target_base}: breaker tripped`
          )
        );
      }
      return acquire(`repo:${repo}::merge:${target_base}`);
    },

    /**
     * @returns {Promise<Release>}
     */
    serviceLock() {
      return acquire('service::restart');
    },

    /**
     * @param {string} key
     * @returns {boolean}
     */
    isLocked(key) {
      return tails.has(key);
    }
  };
}
