/**
 * Client-side holder for the latest server-global Codex credit snapshot
 * (UI-9y1k §4.5): each account's credit permission, daily cap and today's
 * consumption. Total-state, last-snapshot-wins; `null` means no snapshot yet
 * (an older server, or before the first push), and the settings controls then
 * stay hidden (fail-quiet).
 *
 * @typedef {Object} CodexCreditAccountState
 * @property {boolean} allow_credits
 * @property {number} daily_cap
 * @property {number} consumed_today
 * @typedef {Object} CodexCreditState
 * @property {number} revision
 * @property {string} date - Today's KST date on the server.
 * @property {number} default_daily_cap
 * @property {Record<string, CodexCreditAccountState>} accounts
 */

/**
 * @returns {{ get: () => CodexCreditState|null, set: (state: CodexCreditState|null) => void, clear: () => void, subscribe: (listener: () => void) => () => void }}
 */
export function createCodexCreditStore() {
  /** @type {CodexCreditState|null} */
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
    /** @param {CodexCreditState|null} next_state */
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
 * @returns {payload is CodexCreditState}
 */
export function isCodexCreditSnapshot(payload) {
  return (
    !!payload &&
    typeof payload.revision === 'number' &&
    typeof payload.default_daily_cap === 'number' &&
    !!payload.accounts &&
    typeof payload.accounts === 'object' &&
    !Array.isArray(payload.accounts)
  );
}

/**
 * One account's credit view, defaulted the way the server defaults an account
 * it has no entry for: credits off, the default cap, nothing consumed.
 *
 * @param {CodexCreditState} state
 * @param {string} key
 * @returns {CodexCreditAccountState}
 */
export function creditAccountOf(state, key) {
  const entry = state.accounts[key];
  return {
    allow_credits: entry?.allow_credits === true,
    daily_cap:
      typeof entry?.daily_cap === 'number'
        ? entry.daily_cap
        : state.default_daily_cap,
    consumed_today:
      typeof entry?.consumed_today === 'number' ? entry.consumed_today : 0
  };
}
