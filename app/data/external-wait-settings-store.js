/**
 * Client-side holder for the latest server-global external-wait settings
 * snapshot (UI-qbgj §3.6). Total-state, last-snapshot-wins; `null` means no
 * snapshot received yet (an older server, or before the first push), and every
 * reader then falls back to its own default (fail-quiet).
 *
 * @typedef {Object} ExternalWaitSettingFieldWire
 * @property {number} default
 * @property {number} min
 * @property {number} max
 * @property {'percent'} unit
 * @typedef {Object} ExternalWaitSettingsState
 * @property {number} revision
 * @property {Record<string, number>} values - Effective values.
 * @property {Record<string, number>} overrides - Changed keys only.
 * @property {Record<string, ExternalWaitSettingFieldWire>} fields - The server's field table.
 */

/** The `▶ 바로 실행` ratio a client uses before any snapshot arrives. */
export const TAKEOVER_RATIO_FALLBACK = 80;

/**
 * @returns {{ get: () => ExternalWaitSettingsState|null, set: (state: ExternalWaitSettingsState|null) => void, clear: () => void, subscribe: (listener: () => void) => () => void }}
 */
export function createExternalWaitSettingsStore() {
  /** @type {ExternalWaitSettingsState|null} */
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
    /** @param {ExternalWaitSettingsState|null} next_state */
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
 * @returns {payload is ExternalWaitSettingsState}
 */
export function isExternalWaitSettingsSnapshot(payload) {
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
 * The `▶ 바로 실행` ratio in percent the server is using, or null when no
 * snapshot (or no usable value) has arrived — the caller then keeps
 * {@link TAKEOVER_RATIO_FALLBACK}.
 *
 * @param {{ get: () => ExternalWaitSettingsState|null }|null|undefined} store
 * @returns {number|null}
 */
export function takeoverRatioOf(store) {
  const value = store?.get()?.values?.takeover_ratio_percent;
  return typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 100
    ? value
    : null;
}
