/**
 * Client-side holder for the latest server-global execution-preset snapshot.
 * Total-state, last-snapshot-wins; `null` means no snapshot received yet.
 *
 * @typedef {Object} ExecPreset
 * @property {string} id
 * @property {string} name
 * @property {Record<string, string>} settings
 * @property {{ kind: 'user' }|{ kind: 'workspace-exec-defaults', workspace_key: string, source_digest: string }} [origin]
 * @property {boolean} [compatible]
 * @property {string|null} [incompatibility_reason]
 * @property {boolean} [migration_pending]
 * @property {number|null} [reference_count]
 * @property {{ workspace_key: string, display_name: string }[]} [reference_summary]
 * @property {boolean} [reference_scan_complete]
 */
/**
 * @typedef {Object} ExecPresetState
 * @property {number} revision
 * @property {ExecPreset[]} presets
 * @property {Record<string, string|null>} [chip_bindings]
 */
import { CHIP_BINDING_KEYS } from '../views/settings-dialog/session-model.js';

/**
 * The snapshot's `chip_bindings`, narrowed to the chip vocabulary. An absent
 * field — an older server, or a snapshot adopted from a mutation reply that
 * omits it — reads as every chip unbound, so no chip claims a preset it cannot
 * name (fail-quiet).
 *
 * @param {unknown} value
 * @returns {Record<string, string|null>}
 */
export function normalizeChipBindings(value) {
  const raw =
    value && typeof value === 'object' ? /** @type {any} */ (value) : {};
  /** @type {Record<string, string|null>} */
  const bindings = {};
  for (const chip of CHIP_BINDING_KEYS) {
    const id = raw[chip];
    bindings[chip] = typeof id === 'string' && id.length > 0 ? id : null;
  }
  return bindings;
}

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
      // A mutation reply that says nothing about the bindings has not changed
      // them: keeping the last known map beats forgetting a live binding and
      // redrawing every bound chip as a popup for one render.
      const carried =
        next_state && next_state.chip_bindings === undefined && state
          ? state.chip_bindings
          : next_state && next_state.chip_bindings;
      state = next_state
        ? { ...next_state, chip_bindings: normalizeChipBindings(carried) }
        : null;
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
