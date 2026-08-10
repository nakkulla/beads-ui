/**
 * Client-side holder for the latest server-global execution-preset snapshot.
 * Total-state, last-snapshot-wins; `null` means no snapshot received yet.
 *
 * @typedef {Object} ExecPreset
 * @property {string} id
 * @property {string} name
 * @property {Record<string, string>} settings
 */
/**
 * @typedef {Object} ExecPresetState
 * @property {number} revision
 * @property {ExecPreset[]} presets
 */

/**
 * @returns {{ get: () => ExecPresetState|null, set: (state: ExecPresetState|null) => void, clear: () => void, subscribe: (listener: () => void) => () => void }}
 */
export function createExecPresetStore() {
  /** @type {ExecPresetState|null} */
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
    /** @param {ExecPresetState|null} next_state */
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
