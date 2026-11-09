/**
 * Move the global active Claude login to a headroom account once its
 * five-hour or seven-day window reaches the global trigger (UI-btp3 §4,
 * UI-giog §4.4).
 *
 * The active login is what every Claude call without its own account runs
 * on — interactive sessions, Hermes, and Worker attempts that pinned no
 * account. This pass shares the Codex pass's lock, confirm, notice and
 * single-flight flow (`createActiveReturn`) and its criterion: only the
 * Claude server-global limit policy, with scope `global` and mode `switch`,
 * and an allow list holding both the active account and the candidate. It
 * differs only in its rules:
 *
 * - Trigger: the active row's `5h` or `7d` window at or above the global
 *   `preempt_pct`, else 100. Model windows never trigger a switch.
 * - Candidate: in the global allow list, usage status `ok`, not the active
 *   account, not a `provider_hold` target, at least one reported `5h`/`7d`
 *   window and every such window below the trigger. Lowest seven-day use
 *   first, then account number. Model windows are ignored here too.
 * - A Claude run without an account does NOT block the switch (§4.1): the
 *   active account is already refusing requests at 100%, and the switch
 *   writes under the credential lock.
 * - A running attempt's `claude_account` is kept out of the candidates
 *   unless that account is `sessionLoginOwn` — its token lineage belongs to
 *   the profile, the same rule the manual switch's in-use check applies.
 * - The timer is always on: nothing else reads the Claude list while the
 *   usage view and the Worker are idle, so the pass watches on its own.
 *
 * @typedef {import('./routes/claude-usage.js').UsageAccount} UsageAccount
 * @typedef {import('./codex-active-return.js').ActiveReturnDeps} ClaudeActiveReturnDeps
 * @typedef {import('./codex-active-return.js').ActiveReturnRules} ActiveReturnRules
 * @typedef {import('./codex-active-return.js').CandidateInput} CandidateInput
 * @typedef {import('./codex-active-return.js').ReturnCandidate} ReturnCandidate
 */
import {
  ACTIVE_RETURN_INTERVAL_MS,
  createActiveReturn
} from './codex-active-return.js';

/** The always-on cached-list read period. */
export const CLAUDE_ACTIVE_RETURN_INTERVAL_MS = ACTIVE_RETURN_INTERVAL_MS;

const FULL_PCT = 100;
const JUDGED_WINDOWS = new Set(['5h', '7d']);

/**
 * Whether a window is one of the two the judgment reads.
 *
 * @param {any} window
 * @returns {boolean}
 */
function isJudgedWindow(window) {
  return (
    JUDGED_WINDOWS.has(window?.key) &&
    typeof window?.pct === 'number' &&
    Number.isFinite(window.pct)
  );
}

/**
 * The reported `5h`/`7d` windows of one row.
 *
 * @param {any} row
 * @returns {Array<{ key: string, pct: number }>}
 */
function judgedWindowsOf(row) {
  return (Array.isArray(row?.windows) ? row.windows : []).filter(
    isJudgedWindow
  );
}

/**
 * The seven-day use a candidate sorts by. A row without a seven-day window
 * (a team plan reports none) has no weekly use to weigh, so it sorts as 0.
 *
 * @param {any} row
 * @returns {number}
 */
function sevenDayPctOf(row) {
  const seven_day = judgedWindowsOf(row).find((window) => window.key === '7d');
  return seven_day ? seven_day.pct : 0;
}

/**
 * The candidate the global allow list yields, or null. Every judged window
 * must stay below `max_pct` (the trigger; 100 when absent).
 *
 * @param {CandidateInput} input
 * @returns {ReturnCandidate|null}
 */
export function pickClaudeCandidate(input) {
  const max_pct = typeof input.max_pct === 'number' ? input.max_pct : FULL_PCT;
  const eligible = input.accounts.filter((row) => {
    if (
      typeof row?.key !== 'string' ||
      !Number.isInteger(row.number) ||
      !input.allowed.includes(row.key) ||
      row.status !== 'ok' ||
      row.key === input.current_account ||
      input.held_accounts.has(row.key) ||
      input.excluded_accounts.has(row.key)
    ) {
      return false;
    }
    const windows = judgedWindowsOf(row);
    return (
      windows.length > 0 && windows.every((window) => window.pct < max_pct)
    );
  });
  eligible.sort(
    (left, right) =>
      sevenDayPctOf(left) - sevenDayPctOf(right) || left.number - right.number
  );
  const first = eligible[0];
  return first ? { key: first.key, number: first.number } : null;
}

/** @type {ActiveReturnRules} */
const CLAUDE_RULES = {
  provider: 'claude',
  countsWindow: (window) => JUDGED_WINDOWS.has(window?.key),
  scanRunning(record, accounts) {
    const account = record.claude_account;
    if (typeof account !== 'string' || account.length === 0) {
      return { block: null, in_use: null };
    }
    const row = accounts.find(
      (candidate) => candidate?.key === account || candidate?.email === account
    );
    return {
      block: null,
      in_use: row?.sessionLoginOwn === true ? null : account
    };
  },
  pickCandidate: pickClaudeCandidate,
  always_on: true,
  switchNotice: (from, to, windows) =>
    [
      `🔁 Claude 전역 로그인 자동 전환 — 계정 #${from} → 계정 #${to}`,
      `#${from} ${windows} · 전역 한도 대응 · 실행 중 세션도 곧 새 계정을 씁니다`
    ].join('\n')
};

/**
 * Create the Claude pass. Call `start()` once to arm the always-on timer;
 * `observe(list)` judges one parsed Claude account list.
 *
 * @param {ClaudeActiveReturnDeps} deps
 */
export function createClaudeActiveReturn(deps) {
  return createActiveReturn(CLAUDE_RULES, {
    ...deps,
    exhausted_pct: FULL_PCT,
    interval_ms: deps.interval_ms ?? CLAUDE_ACTIVE_RETURN_INTERVAL_MS
  });
}
