/**
 * Client-side holder for the latest server-global auto-pool snapshot (UI-y7h1
 * §3.4). Total-state, last-snapshot-wins; `null` means no snapshot received
 * yet, and the settings section then draws nothing (fail-quiet).
 *
 * @typedef {{ min: string, max: string }} AutoPoolEffort
 * @typedef {{ models: string[], effort: AutoPoolEffort }} AutoPoolRuntime
 * @typedef {Object} AutoPoolChoice
 * @property {string[]} models
 * @property {string[]} efforts
 * @property {AutoPoolRuntime|null} defaults
 * @property {string[]|null} catalog_models
 * @typedef {Object} AutoPoolState
 * @property {number} revision
 * @property {Record<string, AutoPoolRuntime>} runtimes
 * @property {Record<string, AutoPoolChoice>} choices
 */

/**
 * Whether a payload carries the snapshot fields the section reads.
 *
 * @param {unknown} payload
 * @returns {payload is AutoPoolState}
 */
export function isAutoPoolSnapshot(payload) {
  const value = /** @type {any} */ (payload);
  return (
    !!value &&
    typeof value === 'object' &&
    typeof value.revision === 'number' &&
    !!value.runtimes &&
    typeof value.runtimes === 'object' &&
    !Array.isArray(value.runtimes) &&
    !!value.choices &&
    typeof value.choices === 'object' &&
    !Array.isArray(value.choices)
  );
}

/**
 * @returns {{ get: () => AutoPoolState|null, set: (state: AutoPoolState|null) => void, clear: () => void, subscribe: (listener: () => void) => () => void }}
 */
export function createAutoPoolStore() {
  /** @type {AutoPoolState|null} */
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
    /** @param {AutoPoolState|null} next_state */
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
