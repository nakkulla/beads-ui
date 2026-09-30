/**
 * Client-side holder for the latest server-global model-visibility snapshot
 * (UI-ooc0 §3.3). Total-state, last-snapshot-wins; `null` means no snapshot
 * received yet, and every selector then shows every model (fail-quiet).
 *
 * @typedef {Object} ModelVisibilityState
 * @property {number} revision
 * @property {string[]} disabled_models
 * @property {Record<string, Array<{ name: string, id: string }>>} runners
 */

/**
 * @returns {{ get: () => ModelVisibilityState|null, set: (state: ModelVisibilityState|null) => void, clear: () => void, subscribe: (listener: () => void) => () => void }}
 */
export function createModelVisibilityStore() {
  /** @type {ModelVisibilityState|null} */
  let state = null;
  /** @type {Set<() => void>} */
  const listeners = new Set();

  function emit() {
    for (const listener of Array.from(listeners)) {
      try {
        listener();
      } catch {
        // Ignore listener errors.
      }
    }
  }

  return {
    get() {
      return state;
    },
    /** @param {ModelVisibilityState|null} next_state */
    set(next_state) {
      state = next_state;
      emit();
    },
    clear() {
      state = null;
      emit();
    },
    /** @param {() => void} listener */
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}
