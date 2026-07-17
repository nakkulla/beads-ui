/**
 * Client-side holder for the latest manual UI-order snapshot (spec §2).
 *
 * The server pushes the whole `{revision, order}` as a `ui-order-snapshot` event
 * and also returns the authoritative order in every `ui-order-set` reply; both
 * paths land here via {@link set}. Board (and, from Phase 3, Worker) list
 * selectors read the order map to sort by effective rank and subscribe for
 * re-render. Mirrors {@link import('./worker-queue-store.js').createWorkerQueueStore}
 * — the order is total-state (last snapshot wins), so there is no per-id
 * bookkeeping. The cache starts `null` (no snapshot yet); consumers read
 * `store.get()?.order` and treat the absent case as an empty order map.
 *
 * @typedef {{ revision: number, order: Record<string, number> }} UiOrderSnapshot
 */

/**
 * @returns {{ get: () => UiOrderSnapshot|null, set: (s: UiOrderSnapshot|null) => void, clear: () => void, subscribe: (fn: () => void) => () => void }}
 */
export function createUiOrderStore() {
  /** @type {UiOrderSnapshot|null} */
  let snapshot = null;
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
      return snapshot;
    },
    /** @param {UiOrderSnapshot|null} s */
    set(s) {
      snapshot = s;
      emit();
    },
    clear() {
      snapshot = null;
      emit();
    },
    /** @param {() => void} fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}
