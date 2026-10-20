/**
 * @import { Request, RequestHandler, Response } from 'express'
 */
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

/**
 * @typedef {{ key: string, pct: number, resetsAt: string }} UsageWindow
 * @typedef {{ has_credits: boolean, unlimited: boolean, balance: number | null }} UsageCredits
 * @typedef {{ key: string, number: number, email: string, alias: string | null, plan: string | null, active: boolean, status: string, windows: UsageWindow[], fetchedAt: string | null, ageSeconds: number | null, credits?: UsageCredits }} UsageAccount
 * @typedef {{ key: string, number: number, source: string | null, updated_at: number | null, credits: UsageCredits }} CreditObservation
 * @typedef {{ available: false }} UsageUnavailable
 * @typedef {{ available: true, provider: 'codex', windows: UsageWindow[], fetchedAt: string, ageSeconds: number }} CodexUsageActive
 * @typedef {(UsageUnavailable | CodexUsageActive) & { accounts?: UsageAccount[] }} CodexUsagePayload
 * @typedef {{ stdout: import('node:stream').Readable | null, stderr: import('node:stream').Readable | null, kill: (signal: NodeJS.Signals) => unknown, on: (event: string, listener: (...args: any[]) => void) => unknown }} CodexAuthChild
 * @typedef {(command: string, args: string[], options: { shell: false, windowsHide: true }) => CodexAuthChild} SpawnProcess
 */

const CODEX_AUTH_TIMEOUT_MS = 10_000;
const CACHE_TTL_MS = 180_000;

/** @type {CodexUsagePayload | null} */
let cached_payload = null;
let cache_expires_at = 0;
/** @type {Promise<CodexUsagePayload> | null} */
let in_flight = null;
// Bumped by `invalidateCache()`; a lookup started under an older generation
// never writes the cache, so a post-switch refresh cannot read pre-switch data.
let cache_generation = 0;

/**
 * Return the fail-quiet response shared by every invalid input path.
 *
 * @returns {UsageUnavailable}
 */
function unavailable() {
  return { available: false };
}

/**
 * Convert epoch seconds to an ISO timestamp.
 *
 * @param {unknown} value
 * @returns {string | null}
 */
function epochToIso(value) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    return null;
  }
  try {
    return new Date(value * 1000).toISOString();
  } catch {
    return null;
  }
}

/**
 * Derive a compact label from a usage window length.
 *
 * @param {unknown} value
 * @returns {string | null}
 */
function windowLabel(value) {
  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
    return null;
  }
  if (value % 1_440 === 0) {
    return `${value / 1_440}d`;
  }
  if (value % 60 === 0) {
    return `${value / 60}h`;
  }
  return `${value}m`;
}

/**
 * Normalize one codex-auth usage window.
 *
 * @param {unknown} input
 * @returns {UsageWindow | null}
 */
function normalizeWindow(input) {
  if (!input || typeof input !== 'object') {
    return null;
  }
  const window = /** @type {any} */ (input);
  if (
    typeof window.used_percent !== 'number' ||
    !Number.isFinite(window.used_percent) ||
    window.used_percent < 0 ||
    window.used_percent > 100
  ) {
    return null;
  }
  const key = windowLabel(window.window_minutes);
  const resets_at = epochToIso(window.resets_at);
  if (!key || !resets_at) {
    return null;
  }
  return { key, pct: window.used_percent, resetsAt: resets_at };
}

/**
 * Age of one snapshot in whole seconds, never negative.
 *
 * @param {string} fetched_at
 * @param {() => number} now
 */
function snapshotAge(fetched_at, now) {
  return Math.max(0, Math.floor((now() - Date.parse(fetched_at)) / 1000));
}

/**
 * Normalize the windows of one codex-auth account row.
 *
 * @param {unknown} input
 * @returns {UsageWindow[] | null}
 */
function normalizeUsageWindows(input) {
  if (!input || typeof input !== 'object') {
    return null;
  }
  const usage = /** @type {any} */ (input);
  if (!['api', 'local', 'cache'].includes(usage.source)) {
    return null;
  }
  const primary = normalizeWindow(usage.primary);
  if (!primary) {
    return null;
  }
  /** @type {UsageWindow[]} */
  const windows = [primary];
  if (usage.secondary !== undefined && usage.secondary !== null) {
    const secondary = normalizeWindow(usage.secondary);
    if (!secondary) {
      return null;
    }
    windows.push(secondary);
  }
  return windows;
}

/**
 * Identify an HTTP 401 from the latest usage refresh.
 *
 * @param {unknown} input
 */
function hasUnauthorizedRefresh(input) {
  if (!input || typeof input !== 'object') {
    return false;
  }
  const usage = /** @type {any} */ (input);
  return (
    usage.refresh?.status === 'http_error' && usage.refresh.http_status === 401
  );
}

/**
 * Normalize the `usage.credits` block of one codex-auth row. codex-auth prints
 * the balance as a decimal string (or `null` when the account has none), so it
 * is parsed here; a block that is not the documented shape reads as absent.
 *
 * @param {unknown} input
 * @returns {UsageCredits | null}
 */
export function normalizeCredits(input) {
  if (!input || typeof input !== 'object') {
    return null;
  }
  const credits = /** @type {any} */ (input);
  if (
    typeof credits.has_credits !== 'boolean' ||
    typeof credits.unlimited !== 'boolean'
  ) {
    return null;
  }
  /** @type {number | null} */
  let balance = null;
  if (typeof credits.balance === 'number') {
    balance = Number.isFinite(credits.balance) ? credits.balance : null;
  } else if (
    typeof credits.balance === 'string' &&
    /^-?\d+(\.\d+)?$/.test(credits.balance.trim())
  ) {
    balance = Number(credits.balance.trim());
  }
  return {
    has_credits: credits.has_credits,
    unlimited: credits.unlimited,
    balance
  };
}

/**
 * Normalize one codex-auth account row for the multi-account card. Identity
 * beyond number/email/alias/plan stays out of the response.
 *
 * @param {unknown} input
 * @param {string | null} active_account_key
 * @param {() => number} now
 * @returns {UsageAccount | null}
 */
function normalizeAccountRow(input, active_account_key, now) {
  if (!input || typeof input !== 'object') {
    return null;
  }
  const row = /** @type {any} */ (input);
  if (!Number.isInteger(row.number) || row.number <= 0) {
    return null;
  }
  if (typeof row.account_key !== 'string') {
    return null;
  }
  if (typeof row.email !== 'string' || row.email.length === 0) {
    return null;
  }
  const alias =
    typeof row.alias === 'string' && row.alias.length > 0 ? row.alias : null;
  const plan =
    typeof row.plan === 'string' && row.plan.length > 0 ? row.plan : null;
  const active =
    typeof active_account_key === 'string' &&
    row.account_key === active_account_key;

  const token_expired = hasUnauthorizedRefresh(row.usage);
  const windows = token_expired ? null : normalizeUsageWindows(row.usage);
  const fetched_at = windows ? epochToIso(row.usage.updated_at) : null;
  // `credits` is added only when codex-auth printed the block, so a row from an
  // older codex-auth keeps exactly the fields it had before (UI-9y1k §4.3).
  const credits = normalizeCredits(row.usage?.credits);
  const credit_field = credits ? { credits } : {};
  if (!windows || !fetched_at) {
    return {
      key: row.account_key,
      number: row.number,
      email: row.email,
      alias,
      plan,
      active,
      status: token_expired ? 'token_expired' : 'unavailable',
      windows: [],
      fetchedAt: null,
      ageSeconds: null,
      ...credit_field
    };
  }

  return {
    key: row.account_key,
    number: row.number,
    email: row.email,
    alias,
    plan,
    active,
    status: 'ok',
    windows,
    fetchedAt: fetched_at,
    ageSeconds: snapshotAge(fetched_at, now),
    ...credit_field
  };
}

/**
 * Every row's credit observation, for the credit ledger. Unlike the card rows
 * these keep `usage.source` and `usage.updated_at`, which decide whether the
 * ledger may count the balance at all (UI-9y1k §4.3).
 *
 * @param {unknown} input
 * @returns {CreditObservation[]}
 */
export function creditObservationsOf(input) {
  if (!input || typeof input !== 'object') {
    return [];
  }
  const root = /** @type {any} */ (input);
  if (
    root.schema_version !== 1 ||
    root.command !== 'list' ||
    !Array.isArray(root.accounts)
  ) {
    return [];
  }
  /** @type {CreditObservation[]} */
  const observations = [];
  for (const row of root.accounts) {
    if (
      !row ||
      typeof row !== 'object' ||
      typeof row.account_key !== 'string' ||
      !Number.isInteger(row.number) ||
      row.number <= 0
    ) {
      continue;
    }
    const credits = normalizeCredits(row.usage?.credits);
    if (!credits) {
      continue;
    }
    const updated_at = row.usage?.updated_at;
    observations.push({
      key: row.account_key,
      number: row.number,
      source: typeof row.usage?.source === 'string' ? row.usage.source : null,
      updated_at:
        typeof updated_at === 'number' && Number.isFinite(updated_at)
          ? updated_at
          : null,
      credits
    });
  }
  return observations;
}

/**
 * Normalize every parsable account row, active first then by tool number.
 *
 * @param {unknown[]} rows
 * @param {string | null} active_account_key
 * @param {() => number} now
 * @returns {UsageAccount[]}
 */
function normalizeAccounts(rows, active_account_key, now) {
  /** @type {UsageAccount[]} */
  const accounts = [];
  for (const row of rows) {
    const account = normalizeAccountRow(row, active_account_key, now);
    if (account) {
      accounts.push(account);
    }
  }
  accounts.sort((left, right) => {
    if (left.active !== right.active) {
      return left.active ? -1 : 1;
    }
    return left.number - right.number;
  });
  return accounts;
}

/**
 * Normalize the active account into the legacy top-level fields.
 *
 * @param {any} root
 * @param {() => number} now
 * @returns {UsageUnavailable | CodexUsageActive}
 */
function normalizeActiveAccount(root, now) {
  if (typeof root.active_account_key !== 'string') {
    return unavailable();
  }
  const account = root.accounts.find(
    (/** @type {any} */ candidate) =>
      candidate && candidate.account_key === root.active_account_key
  );
  if (!account || !account.usage || typeof account.usage !== 'object') {
    return unavailable();
  }
  const usage = account.usage;
  if (hasUnauthorizedRefresh(usage)) {
    return unavailable();
  }
  if (!['api', 'local', 'cache'].includes(usage.source)) {
    return unavailable();
  }
  const fetched_at = epochToIso(usage.updated_at);
  const windows = normalizeUsageWindows(usage);
  if (!fetched_at || !windows) {
    return unavailable();
  }
  return {
    available: true,
    provider: 'codex',
    windows,
    fetchedAt: fetched_at,
    ageSeconds: Math.max(0, Math.floor(now() / 1000 - usage.updated_at))
  };
}

/**
 * Normalize versioned codex-auth output for the browser usage meter.
 *
 * @param {unknown} input
 * @param {() => number} [now]
 * @returns {CodexUsagePayload}
 */
export function normalizeCodexUsage(input, now = () => Date.now()) {
  if (!input || typeof input !== 'object') {
    return unavailable();
  }
  const root = /** @type {any} */ (input);
  if (
    root.schema_version !== 1 ||
    root.command !== 'list' ||
    !Array.isArray(root.accounts)
  ) {
    return unavailable();
  }

  const payload = normalizeActiveAccount(root, now);
  // A parsed list keeps its `accounts` array even when every row dropped: an
  // empty catalog is a SUCCESSFUL list, and `listAccounts` must not read that
  // as the tool being unavailable.
  const accounts = normalizeAccounts(
    root.accounts,
    typeof root.active_account_key === 'string'
      ? root.active_account_key
      : null,
    now
  );
  return { ...payload, accounts };
}

/**
 * Create the launchd-safe codex-auth process runner.
 *
 * @param {{ spawn_process?: SpawnProcess, home_dir?: string }} [options]
 */
export function createCodexAuthRunner(options = {}) {
  const spawnProcess = /** @type {SpawnProcess} */ (
    options.spawn_process || spawn
  );
  const home_dir = options.home_dir || os.homedir();

  /**
   * Run one binary candidate without a shell.
   *
   * @param {string} bin
   * @param {string[]} args
   * @returns {Promise<{ code: number, stdout: string, stderr: string, not_found: boolean }>}
   */
  function runCandidate(bin, args) {
    return new Promise((resolve) => {
      const child = spawnProcess(bin, args, {
        shell: false,
        windowsHide: true
      });
      /** @type {string[]} */
      const stdout_chunks = [];
      /** @type {string[]} */
      const stderr_chunks = [];
      let settled = false;
      let timed_out = false;

      if (child.stdout) {
        child.stdout.setEncoding('utf8');
        child.stdout.on('data', (chunk) => stdout_chunks.push(String(chunk)));
      }
      if (child.stderr) {
        child.stderr.setEncoding('utf8');
        child.stderr.on('data', (chunk) => stderr_chunks.push(String(chunk)));
      }

      const timer = setTimeout(() => {
        timed_out = true;
        child.kill('SIGKILL');
        finish(124, false);
      }, CODEX_AUTH_TIMEOUT_MS);
      timer.unref?.();

      /**
       * @param {number | null} code
       * @param {boolean} not_found
       */
      function finish(code, not_found) {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timer);
        resolve({
          code: timed_out ? 124 : typeof code === 'number' ? code : 1,
          stdout: stdout_chunks.join(''),
          stderr: stderr_chunks.join(''),
          not_found
        });
      }

      child.on('error', (error) => {
        const spawn_error = /** @type {NodeJS.ErrnoException} */ (error);
        finish(127, spawn_error.code === 'ENOENT');
      });
      child.on('close', (code) => finish(code, false));
    });
  }

  /**
   * `api: true` adds `--api`, which makes codex-auth read every account's
   * usage and credits from the API instead of its local cache (UI-9y1k §4.4).
   *
   * @param {{ api?: boolean }} [run_options]
   */
  return async function runCodexAuth(run_options = {}) {
    const args =
      run_options.api === true
        ? ['list', '--json', '--api']
        : ['list', '--json'];
    const from_path = await runCandidate('codex-auth', args);
    if (!from_path.not_found) {
      return from_path;
    }
    return runCandidate(
      path.join(home_dir, '.local', 'bin', 'codex-auth'),
      args
    );
  };
}

const run_codex_auth_command = createCodexAuthRunner();

/**
 * @typedef {(options?: { api?: boolean }) => Promise<{ code: number, stdout: string, stderr: string }>} RunCodexAuth
 */

/** @type {Set<(observations: CreditObservation[]) => void>} */
const credit_observers = new Set();

/**
 * Hear every parsed codex-auth list's credit observations. The credit ledger
 * subscribes here from the server entry rather than this route importing it,
 * so the route stays free of server-global state (UI-9y1k §4.3).
 *
 * @param {(observations: CreditObservation[]) => void} listener
 * @returns {() => void}
 */
export function subscribeCreditObservations(listener) {
  credit_observers.add(listener);
  return () => {
    credit_observers.delete(listener);
  };
}

/**
 * @param {unknown} root
 */
function publishCreditObservations(root) {
  if (credit_observers.size === 0) {
    return;
  }
  const observations = creditObservationsOf(root);
  if (observations.length === 0) {
    return;
  }
  for (const listener of credit_observers) {
    try {
      listener(observations);
    } catch {
      // A failing observer must not turn a usage read into a failure.
    }
  }
}

/**
 * @typedef {{ ok: true, accounts: UsageAccount[], active_key: string|null }} CodexAccountList
 */

/** @type {Set<(list: CodexAccountList) => void>} */
const account_list_observers = new Set();

/**
 * Hear every parsed codex-auth account list, cached or fresh read alike. The
 * server's Codex active-account return subscribes here from the server entry
 * (UI-tyc2 §4.2), the same way the credit ledger hears credit observations.
 * A read that yields no account list is never published.
 *
 * @param {(list: CodexAccountList) => void} listener
 * @returns {() => void}
 */
export function subscribeAccountListObservations(listener) {
  account_list_observers.add(listener);
  return () => {
    account_list_observers.delete(listener);
  };
}

/**
 * @param {CodexUsagePayload} payload
 */
function publishAccountList(payload) {
  if (account_list_observers.size === 0) {
    return;
  }
  const list = accountListOf(payload);
  if (!list.ok) {
    return;
  }
  for (const listener of account_list_observers) {
    try {
      listener(list);
    } catch {
      // A failing observer must not turn a usage read into a failure.
    }
  }
}

/**
 * Execute codex-auth and collapse every failure to the fail-quiet payload.
 *
 * @param {RunCodexAuth} runCodexAuth
 * @param {() => number} now
 * @param {{ api?: boolean }} [run_options]
 * @returns {Promise<CodexUsagePayload>}
 */
async function loadCodexUsage(runCodexAuth, now, run_options) {
  try {
    const result = await (run_options
      ? runCodexAuth(run_options)
      : runCodexAuth());
    if (!result || result.code !== 0) {
      return unavailable();
    }
    const root = JSON.parse(result.stdout);
    publishCreditObservations(root);
    const payload = normalizeCodexUsage(root, now);
    publishAccountList(payload);
    return payload;
  } catch {
    return unavailable();
  }
}

/**
 * Read the module-level positive/negative TTL cache.
 *
 * @param {RunCodexAuth} runCodexAuth
 * @param {() => number} now
 * @returns {Promise<CodexUsagePayload>}
 */
async function getCodexUsage(runCodexAuth, now) {
  if (cached_payload && now() < cache_expires_at) {
    return cached_payload;
  }
  if (in_flight) {
    return in_flight;
  }

  const generation = cache_generation;
  const pending = loadCodexUsage(runCodexAuth, now).then((payload) => {
    if (generation !== cache_generation) {
      return payload;
    }
    cached_payload = payload;
    cache_expires_at = now() + CACHE_TTL_MS;
    return payload;
  });
  in_flight = pending;
  void pending.then(() => {
    if (in_flight === pending) {
      in_flight = null;
    }
  });
  return pending;
}

/**
 * Recalculate snapshot age for every response without refreshing the source.
 *
 * @param {CodexUsagePayload} payload
 * @param {() => number} now
 * @returns {CodexUsagePayload}
 */
function withCurrentAge(payload, now) {
  const accounts = payload.accounts
    ? payload.accounts.map((account) =>
        account.fetchedAt === null
          ? account
          : { ...account, ageSeconds: snapshotAge(account.fetchedAt, now) }
      )
    : undefined;
  const aged = payload.available
    ? { ...payload, ageSeconds: snapshotAge(payload.fetchedAt, now) }
    : { ...payload };
  if (!accounts) {
    return aged;
  }
  return { ...aged, accounts };
}

/**
 * Drop the cached snapshot and disown any in-flight lookup after a switch.
 */
export function invalidateCache() {
  cache_generation += 1;
  cached_payload = null;
  cache_expires_at = 0;
  in_flight = null;
}

/**
 * List normalized Codex accounts through the route's shared cache.
 *
 * @param {{ runCodexAuth?: RunCodexAuth, now?: () => number }} [options]
 * @returns {Promise<{ ok: true, accounts: UsageAccount[], active_key: string|null }|{ ok: false, error: string }>}
 */
export async function listAccounts(options = {}) {
  const runCodexAuth = options.runCodexAuth || run_codex_auth_command;
  const now = options.now || (() => Date.now());
  const payload = withCurrentAge(await getCodexUsage(runCodexAuth, now), now);
  return accountListOf(payload);
}

/**
 * @param {CodexUsagePayload} payload
 * @returns {{ ok: true, accounts: UsageAccount[], active_key: string|null }|{ ok: false, error: string }}
 */
function accountListOf(payload) {
  if (!Array.isArray(payload.accounts)) {
    return { ok: false, error: 'codex_account_list_unavailable' };
  }
  const active = payload.accounts.find((account) => account.active);
  return {
    ok: true,
    accounts: payload.accounts,
    active_key: active?.key ?? null
  };
}

/**
 * List Codex accounts from a fresh `codex-auth list --json --api` read,
 * bypassing the 180-second cache (UI-9y1k §4.4). The candidate lookup and the
 * credit poller read here: both need the newest windows and balances. A good
 * read also refreshes the shared cache, unless a switch invalidated it while
 * the read was running.
 *
 * @param {{ runCodexAuth?: RunCodexAuth, now?: () => number }} [options]
 * @returns {Promise<{ ok: true, accounts: UsageAccount[], active_key: string|null }|{ ok: false, error: string }>}
 */
export async function listAccountsFresh(options = {}) {
  const runCodexAuth = options.runCodexAuth || run_codex_auth_command;
  const now = options.now || (() => Date.now());
  const generation = cache_generation;
  const payload = await loadCodexUsage(runCodexAuth, now, { api: true });
  if (Array.isArray(payload.accounts) && generation === cache_generation) {
    cached_payload = payload;
    cache_expires_at = now() + CACHE_TTL_MS;
  }
  return accountListOf(withCurrentAge(payload, now));
}

/**
 * Create the fail-quiet Codex usage route handler.
 *
 * @param {{ runCodexAuth?: RunCodexAuth, now?: () => number }} [options]
 * @returns {RequestHandler}
 */
export function createCodexUsageHandler(options = {}) {
  const runCodexAuth = options.runCodexAuth || run_codex_auth_command;
  const now = options.now || (() => Date.now());

  /**
   * @param {Request} _req
   * @param {Response} res
   */
  async function handler(_req, res) {
    const cached_or_fresh = await getCodexUsage(runCodexAuth, now);
    const payload = withCurrentAge(cached_or_fresh, now);
    res.set('Cache-Control', 'no-store');
    res.type('application/json');
    res.status(200).send(payload);
  }

  return handler;
}

export const codexUsageHandler = createCodexUsageHandler();

/** Reset module state between cache tests. */
export function __resetCacheForTest() {
  cache_generation += 1;
  cached_payload = null;
  cache_expires_at = 0;
  in_flight = null;
  credit_observers.clear();
  account_list_observers.clear();
}
