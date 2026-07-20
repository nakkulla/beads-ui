/**
 * Client-side holder for the latest label/metadata display policy.
 *
 * The server pushes the whole policy as a `display-policy-snapshot` event and
 * also returns the authoritative policy in every `display-policy-set` reply;
 * both paths land here via {@link set}. Mirrors
 * {@link import('./ui-order-store.js').createUiOrderStore} — the policy is
 * total-state (last snapshot wins), so there is no per-key bookkeeping.
 *
 * The cache starts `null` (no snapshot yet). Consumers must treat that as
 * "show everything": rendering before the first snapshot should never hide a
 * label, because hiding it would flash content away once the real policy
 * arrives.
 *
 * @typedef {import('../utils/label-policy.js').DisplayPolicy} DisplayPolicy
 */

/**
 * @returns {{ get: () => DisplayPolicy|null, set: (p: DisplayPolicy|null) => void, clear: () => void, subscribe: (fn: () => void) => () => void }}
 */
export function createDisplayPolicyStore() {
  /** @type {DisplayPolicy|null} */
  let policy = null;
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
      return policy;
    },
    /** @param {DisplayPolicy|null} p */
    set(p) {
      policy = p;
      emit();
    },
    clear() {
      policy = null;
      emit();
    },
    /** @param {() => void} fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}
