/**
 * Client-side holder for the latest server-global timing-settings snapshot
 * (UI-ny0h §3.4-§3.5). Total-state, last-snapshot-wins; `null` means no
 * snapshot received yet (an older server, or before the first push), and every
 * reader then falls back to its own default (fail-quiet).
 *
 * @typedef {Object} TimingFieldWire
 * @property {number | number[]} default
 * @property {number} min
 * @property {number} max
 * @property {number} [rungs]
 * @property {'seconds'|'minutes'} unit
 * @property {number} [off_value]
 * @typedef {Object} TimingSettingsState
 * @property {number} revision
 * @property {Record<string, number | number[]>} values - Effective values.
 * @property {Record<string, number | number[]>} overrides - Changed keys only.
 * @property {Record<string, TimingFieldWire>} fields - The server's field table.
 */

/**
 * @returns {{ get: () => TimingSettingsState|null, set: (state: TimingSettingsState|null) => void, clear: () => void, subscribe: (listener: () => void) => () => void }}
 */
export function createTimingSettingsStore() {
  /** @type {TimingSettingsState|null} */
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
    /** @param {TimingSettingsState|null} next_state */
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

/**
 * Whether a payload has the snapshot shape this store accepts.
 *
 * @param {any} payload
 * @returns {payload is TimingSettingsState}
 */
export function isTimingSnapshot(payload) {
  return (
    !!payload &&
    typeof payload.revision === 'number' &&
    !!payload.values &&
    typeof payload.values === 'object' &&
    !!payload.overrides &&
    typeof payload.overrides === 'object' &&
    !!payload.fields &&
    typeof payload.fields === 'object'
  );
}

/**
 * The queue grace in seconds the server is using, or null when no snapshot (or
 * no usable value) has arrived — the caller then keeps its own default.
 *
 * @param {{ get: () => TimingSettingsState|null }|null|undefined} store
 * @returns {number|null}
 */
export function queueGraceSecondsOf(store) {
  const value = store?.get()?.values?.queue_grace_seconds;
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? value
    : null;
}
