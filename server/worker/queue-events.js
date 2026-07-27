/**
 * Worker queue change events (worker-autorun-policy §6 실시간 반영).
 *
 * The scheduler's autonomous transitions (dispatch start, admission refusal,
 * session done/fail, reconcile disposition) mutate the queue store WITHOUT a client
 * mutation, so nothing fanned the fresh snapshot out — clients stayed on the
 * old state until their next own mutation. This tiny process-wide emitter
 * closes that gap without an import cycle: the scheduler/attachment emits
 * here, and the ws worker-handlers module subscribes once at load and fans
 * the current snapshot out to that workspace's subscribers.
 */

/** @type {Set<(workspace: string) => void>} */
const listeners = new Set();

/**
 * Subscribe to queue-changed events. Returns an unsubscribe function.
 *
 * @param {(workspace: string) => void} fn
 * @returns {() => void}
 */
export function onQueueChanged(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Notify subscribers that a workspace's queue changed. Listener failures are
 * swallowed — a broken fanout must never break the scheduler.
 *
 * @param {string} workspace
 */
export function emitQueueChanged(workspace) {
  for (const fn of listeners) {
    try {
      fn(workspace);
    } catch {
      // ignore
    }
  }
}

/**
 * Test-only: drop all listeners.
 */
export function __resetQueueEventsForTest() {
  listeners.clear();
}
