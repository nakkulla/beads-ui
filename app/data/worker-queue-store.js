/**
 * Client-side holder for the latest Worker queue snapshot.
 *
 * The server pushes the whole queue as a `worker-queue-snapshot` event and also
 * returns the authoritative queue in every mutation reply; both paths land here
 * via {@link set}. Views subscribe for re-render. This is intentionally tiny —
 * the queue is total-state (last snapshot wins), so there is no per-id
 * bookkeeping like the issue stores.
 *
 * @typedef {import('../../server/worker/queue-store.js').Queue} Queue
 */

/**
 * @returns {{ get: () => Queue|null, set: (q: Queue|null) => void, clear: () => void, subscribe: (fn: () => void) => () => void }}
 */
export function createWorkerQueueStore() {
  /** @type {Queue|null} */
  let queue = null;
  /** @type {Set<() => void>} */
  const listeners = new Set();

  function emit() {
    for (const fn of Array.from(listeners)) {
      try {
        fn();
      } catch {
        /* ignore listener errors */
      }
    }
  }

  return {
    get() {
      return queue;
    },
    /** @param {Queue|null} q */
    set(q) {
      queue = q;
      emit();
    },
    clear() {
      queue = null;
      emit();
    },
    /** @param {() => void} fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}
