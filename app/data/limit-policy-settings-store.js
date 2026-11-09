/**
 * Client-side holder for the latest server-global limit-policy settings
 * snapshot (UI-giog §4.2). Total-state, last-snapshot-wins; `null` means no
 * snapshot received yet (an older server, or before the first push), and every
 * reader then treats both runners as `repo` scope (fail-quiet).
 *
 * The repo `계정` tab and the bulk window read `scope` from here to lock their
 * `한도 대응` rows, so the app subscribes at start rather than when the `전역`
 * tab opens.
 *
 * @typedef {'claude'|'codex'} LimitPolicyRunner
 * @typedef {Object} LimitPolicyEntry
 * @property {'repo'|'global'} scope
 * @property {'wait'|'switch'} mode
 * @property {string[]} accounts
 * @property {number|null} preempt_pct
 * @typedef {Object} LimitPolicySettingsState
 * @property {number} revision
 * @property {Record<LimitPolicyRunner, LimitPolicyEntry>} runners
 */

/**
 * @returns {{ get: () => LimitPolicySettingsState|null, set: (state: LimitPolicySettingsState|null) => void, clear: () => void, subscribe: (listener: () => void) => () => void }}
 */
export function createLimitPolicySettingsStore() {
  /** @type {LimitPolicySettingsState|null} */
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
    /** @param {LimitPolicySettingsState|null} next_state */
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
 * @returns {payload is LimitPolicySettingsState}
 */
export function isLimitPolicySnapshot(payload) {
  return (
    !!payload &&
    typeof payload.revision === 'number' &&
    !!payload.runners &&
    typeof payload.runners === 'object' &&
    !!payload.runners.claude &&
    typeof payload.runners.claude === 'object' &&
    !!payload.runners.codex &&
    typeof payload.runners.codex === 'object'
  );
}

/**
 * One runner's apply scope the server is using: `global` only when a snapshot
 * says so, else `repo`.
 *
 * @param {{ get: () => any }|null|undefined} store
 * @param {LimitPolicyRunner} runner
 * @returns {'repo'|'global'}
 */
export function limitScopeOf(store, runner) {
  return store?.get()?.runners?.[runner]?.scope === 'global'
    ? 'global'
    : 'repo';
}
