/**
 * The Codex automatic-switch candidate rule (UI-9y1k §4.2).
 *
 * One pure function decides which allowed Codex account a usage-limited run
 * moves to, so the Worker's reactive switch and the session-facing
 * `POST /api/codex/switch-candidate` can never disagree:
 *
 * 1. Walk the policy's allow list IN ITS ORDER — the user's order replaces the
 *    old long-window load sort — keeping accounts that are `ok`, not the
 *    current one, not held, and not excluded.
 * 2. Window pass: the first account whose every window is within the switch
 *    thresholds (and under `max_pct` for a preemptive move) → `credit_mode:
 *    false`. Free headroom is always used before paid credits.
 * 3. Credit pass, reactive selection only: the first account in the same order
 *    whose OWN credit permission is on, that has credits (`unlimited` or a
 *    positive balance), and whose consumption today is under its daily cap
 *    (no cap for `unlimited`) → `credit_mode: true`. A preemptive move happens
 *    before any limit, so it never lands on a credit account.
 *
 * The cap only stops the NEXT selection; a run already on that account keeps
 * going (§4.7).
 *
 * @typedef {import('./account-catalog.js').Account} Account
 * @typedef {{ allow_credits: boolean, daily_cap: number }} CreditSetting
 * @typedef {{ settingsOf: (key: string) => CreditSetting, consumedToday: (key: string) => number }} CreditLedger
 * @typedef {'no_candidate'|'credit_cap_reached'|'credits_disabled'|'catalog_unavailable'} NoCandidateReason
 * @typedef {{ decision: 'switch', key: string, number: number|null, credit_mode: boolean, reason: 'window'|'credits' }
 *   | { decision: 'none', reason: NoCandidateReason }} CodexSwitchDecision
 */

/** Highest `5h` window percentage an account may show to receive a switch. */
export const AUTO_SWITCH_5H_MAX_PCT = 80;
/** Highest percentage any other window may show to receive a switch. */
export const AUTO_SWITCH_7D_MAX_PCT = 90;

/**
 * Whether every reported window leaves room under the switch thresholds. A
 * Codex window key derived from minutes is not `5h`, so it reads through the
 * "every other window" rule rather than dropping out; an account with no
 * window has no evidence of headroom.
 *
 * @param {Account} account
 * @param {number|null|undefined} max_pct
 * @returns {boolean}
 */
export function windowsHaveRoom(account, max_pct) {
  const windows = Array.isArray(account.windows) ? account.windows : [];
  if (windows.length === 0) {
    return false;
  }
  return windows.every((window) => {
    if (typeof window?.pct !== 'number') {
      return false;
    }
    if (typeof max_pct === 'number' && window.pct >= max_pct) {
      return false;
    }
    return window.key === '5h'
      ? window.pct <= AUTO_SWITCH_5H_MAX_PCT
      : window.pct <= AUTO_SWITCH_7D_MAX_PCT;
  });
}

/**
 * The workspace half of a `<user>::<workspace>` account key, or null.
 *
 * @param {string|null|undefined} key
 * @returns {string|null}
 */
export function workspaceIdOf(key) {
  if (typeof key !== 'string') {
    return null;
  }
  const at = key.indexOf('::');
  if (at < 0) {
    return null;
  }
  const workspace = key.slice(at + 2);
  return workspace.length > 0 ? workspace : null;
}

/**
 * Whether an account still holds credits it could spend.
 *
 * @param {Account} account
 * @returns {boolean}
 */
function hasSpendableCredits(account) {
  const credits = account.credits;
  if (!credits || credits.has_credits !== true) {
    return false;
  }
  return (
    credits.unlimited === true ||
    (typeof credits.balance === 'number' && credits.balance > 0)
  );
}

/**
 * Choose the Codex account a usage-limited run moves to.
 *
 * @param {Object} input
 * @param {Account[]} input.accounts - Catalog rows (status, windows, credits).
 * @param {string[]} input.allowed - The policy allow list, in the user's order.
 * @param {string|null} input.current_account - The account being left.
 * @param {Iterable<string>} [input.held_accounts] - Accounts under a usage hold.
 * @param {Iterable<string>} [input.excluded_accounts] - Accounts already tried.
 * @param {boolean} [input.exclude_same_workspace] - Drop accounts that share the
 * current account's workspace id (a workspace-wide credit limit).
 * @param {number|null} [input.max_pct] - Preemptive threshold every window must
 * stay under.
 * @param {'reactive'|'preempt'} [input.kind] - `preempt` never uses credits.
 * @param {CreditLedger|null} [input.credit] - Credit settings and today's
 * consumption; absent means every account's credits are off.
 * @returns {CodexSwitchDecision}
 */
export function selectCodexSwitchCandidate(input) {
  const allowed = Array.isArray(input.allowed) ? input.allowed : [];
  const held = new Set(input.held_accounts || []);
  const excluded = new Set(input.excluded_accounts || []);
  const current_workspace = input.exclude_same_workspace
    ? workspaceIdOf(input.current_account)
    : null;
  /** @type {Map<string, Account>} */
  const by_key = new Map();
  for (const account of Array.isArray(input.accounts) ? input.accounts : []) {
    if (
      account &&
      typeof account.key === 'string' &&
      !by_key.has(account.key)
    ) {
      by_key.set(account.key, account);
    }
  }
  /** @type {Account[]} */
  const ordered = [];
  for (const key of allowed) {
    const account = by_key.get(key);
    if (
      !account ||
      account.status !== 'ok' ||
      key === input.current_account ||
      held.has(key) ||
      excluded.has(key) ||
      (current_workspace !== null &&
        workspaceIdOf(key) === current_workspace) ||
      ordered.includes(account)
    ) {
      continue;
    }
    ordered.push(account);
  }
  const windowed = ordered.find((account) =>
    windowsHaveRoom(account, input.max_pct)
  );
  if (windowed) {
    return {
      decision: 'switch',
      key: windowed.key,
      number: typeof windowed.number === 'number' ? windowed.number : null,
      credit_mode: false,
      reason: 'window'
    };
  }
  if (input.kind === 'preempt') {
    return { decision: 'none', reason: 'no_candidate' };
  }
  let capped = false;
  let disabled = false;
  for (const account of ordered) {
    if (!hasSpendableCredits(account)) {
      continue;
    }
    const setting = input.credit?.settingsOf(account.key) ?? null;
    if (!setting || setting.allow_credits !== true) {
      disabled = true;
      continue;
    }
    const unlimited = account.credits?.unlimited === true;
    if (
      !unlimited &&
      /** @type {CreditLedger} */ (input.credit).consumedToday(account.key) >=
        setting.daily_cap
    ) {
      capped = true;
      continue;
    }
    return {
      decision: 'switch',
      key: account.key,
      number: typeof account.number === 'number' ? account.number : null,
      credit_mode: true,
      reason: 'credits'
    };
  }
  if (capped) {
    return { decision: 'none', reason: 'credit_cap_reached' };
  }
  if (disabled) {
    return { decision: 'none', reason: 'credits_disabled' };
  }
  return { decision: 'none', reason: 'no_candidate' };
}
