/**
 * @import { Request, RequestHandler, Response } from 'express'
 */
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

/**
 * @typedef {{ key: string, pct: number, resetsAt: string }} UsageWindow
 * @typedef {{ number: number, email: string, alias: string | null, plan: string | null, active: boolean, status: string, windows: UsageWindow[], fetchedAt: string | null, ageSeconds: number | null }} UsageAccount
 * @typedef {{ available: false }} UsageUnavailable
 * @typedef {{ available: true, email: string, windows: UsageWindow[], fetchedAt: string, ageSeconds: number }} ClaudeUsageActive
 * @typedef {(UsageUnavailable | ClaudeUsageActive) & { accounts?: UsageAccount[] }} ClaudeUsagePayload
 */

const CSWAP_TIMEOUT_MS = 10_000;
const CACHE_TTL_MS = 30_000;

/** @type {ClaudeUsagePayload | null} */
let cached_payload = null;
let cache_expires_at = 0;
/** @type {Promise<ClaudeUsagePayload> | null} */
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
 * Normalize one cswap usage window.
 *
 * @param {string} key
 * @param {unknown} input
 * @returns {UsageWindow | null}
 */
function normalizeWindow(key, input) {
  if (!input || typeof input !== 'object' || key.length === 0) {
    return null;
  }
  const window = /** @type {any} */ (input);
  if (
    typeof window.pct !== 'number' ||
    !Number.isFinite(window.pct) ||
    typeof window.resetsAt !== 'string' ||
    window.resetsAt.length === 0
  ) {
    return null;
  }
  return { key, pct: window.pct, resetsAt: window.resetsAt };
}

/**
 * Normalize the five-hour, seven-day and scoped windows of one cswap account.
 *
 * @param {unknown} input
 * @returns {UsageWindow[] | null}
 */
function normalizeAccountWindows(input) {
  if (!input || typeof input !== 'object') {
    return null;
  }
  const usage = /** @type {any} */ (input);
  // cswap omits `scoped` when an account has no model-scoped window.
  const scoped_input = usage.scoped === undefined ? [] : usage.scoped;
  if (!Array.isArray(scoped_input)) {
    return null;
  }

  const five_hour = normalizeWindow('5h', usage.fiveHour);
  const seven_day = normalizeWindow('7d', usage.sevenDay);
  if (!five_hour || !seven_day) {
    return null;
  }

  /** @type {UsageWindow[]} */
  const scoped_windows = [];
  for (const scoped of scoped_input) {
    if (!scoped || typeof scoped.name !== 'string') {
      return null;
    }
    const window = normalizeWindow(scoped.name, scoped);
    if (!window) {
      return null;
    }
    scoped_windows.push(window);
  }

  return [five_hour, seven_day, ...scoped_windows];
}

/**
 * Normalize one cswap account row for the multi-account card.
 *
 * @param {unknown} input
 * @returns {UsageAccount | null}
 */
function normalizeAccountRow(input) {
  if (!input || typeof input !== 'object') {
    return null;
  }
  const row = /** @type {any} */ (input);
  if (!Number.isInteger(row.number) || row.number <= 0) {
    return null;
  }
  if (typeof row.email !== 'string' || row.email.length === 0) {
    return null;
  }
  if (typeof row.usageStatus !== 'string' || row.usageStatus.length === 0) {
    return null;
  }
  const alias =
    typeof row.alias === 'string' && row.alias.length > 0 ? row.alias : null;
  const active = row.active === true;

  if (row.usageStatus !== 'ok') {
    return {
      number: row.number,
      email: row.email,
      alias,
      plan: null,
      active,
      status: row.usageStatus,
      windows: [],
      fetchedAt: null,
      ageSeconds: null
    };
  }

  const windows = normalizeAccountWindows(row.usage);
  if (
    !windows ||
    typeof row.usageFetchedAt !== 'string' ||
    row.usageFetchedAt.length === 0 ||
    typeof row.usageAgeSeconds !== 'number' ||
    !Number.isFinite(row.usageAgeSeconds) ||
    row.usageAgeSeconds < 0
  ) {
    return null;
  }

  return {
    number: row.number,
    email: row.email,
    alias,
    plan: null,
    active,
    status: 'ok',
    windows,
    fetchedAt: row.usageFetchedAt,
    ageSeconds: row.usageAgeSeconds
  };
}

/**
 * Normalize every parsable account row, active first then by tool number.
 *
 * @param {unknown[]} rows
 * @returns {UsageAccount[]}
 */
function normalizeAccounts(rows) {
  /** @type {UsageAccount[]} */
  const accounts = [];
  for (const row of rows) {
    const account = normalizeAccountRow(row);
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
 * @param {unknown[]} rows
 * @returns {UsageUnavailable | ClaudeUsageActive}
 */
function normalizeActiveAccount(rows) {
  const account = rows.find(
    (/** @type {any} */ candidate) => candidate && candidate.active === true
  );
  const active = /** @type {any} */ (account);
  if (!active || !active.usage || typeof active.usage !== 'object') {
    return unavailable();
  }
  // An explicit non-ok status is fail-quiet at the top level even when a stale
  // usage object survives on the row; the row itself still ships in accounts[].
  if (typeof active.usageStatus === 'string' && active.usageStatus !== 'ok') {
    return unavailable();
  }
  if (
    typeof active.email !== 'string' ||
    active.email.length === 0 ||
    typeof active.usageFetchedAt !== 'string' ||
    active.usageFetchedAt.length === 0 ||
    typeof active.usageAgeSeconds !== 'number' ||
    !Number.isFinite(active.usageAgeSeconds) ||
    active.usageAgeSeconds < 0
  ) {
    return unavailable();
  }
  const windows = normalizeAccountWindows(active.usage);
  if (!windows) {
    return unavailable();
  }
  return {
    available: true,
    email: active.email,
    windows,
    fetchedAt: active.usageFetchedAt,
    ageSeconds: active.usageAgeSeconds
  };
}

/**
 * Normalize `cswap list --json` output for the browser usage meter.
 *
 * @param {unknown} input
 * @returns {ClaudeUsagePayload}
 */
export function normalizeClaudeUsage(input) {
  if (!input || typeof input !== 'object') {
    return unavailable();
  }
  const root = /** @type {any} */ (input);
  if (!Array.isArray(root.accounts)) {
    return unavailable();
  }

  const payload = normalizeActiveAccount(root.accounts);
  const accounts = normalizeAccounts(root.accounts);
  if (accounts.length === 0) {
    return payload;
  }
  return { ...payload, accounts };
}

/**
 * Run one cswap candidate without a shell.
 *
 * @param {string} bin
 * @returns {Promise<{ code: number, stdout: string, stderr: string, not_found: boolean }>}
 */
function runProcess(bin) {
  return new Promise((resolve) => {
    const child = spawn(bin, ['list', '--json'], {
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
    }, CSWAP_TIMEOUT_MS);
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
 * Resolve cswap from PATH, then the launchd-safe user-local fallback.
 *
 * @returns {Promise<{ code: number, stdout: string, stderr: string }>}
 */
async function runCswapCommand() {
  const from_path = await runProcess('cswap');
  if (!from_path.not_found) {
    return from_path;
  }
  return runProcess(path.join(os.homedir(), '.local', 'bin', 'cswap'));
}

/**
 * Execute cswap and collapse every failure mode to the fail-quiet payload.
 *
 * @param {() => Promise<{ code: number, stdout: string, stderr: string }>} runCswap
 * @returns {Promise<ClaudeUsagePayload>}
 */
async function loadClaudeUsage(runCswap) {
  try {
    const result = await runCswap();
    if (!result || result.code !== 0) {
      return unavailable();
    }
    return normalizeClaudeUsage(JSON.parse(result.stdout));
  } catch {
    return unavailable();
  }
}

/**
 * Read the module-level positive/negative TTL cache.
 *
 * @param {() => Promise<{ code: number, stdout: string, stderr: string }>} runCswap
 * @param {() => number} now
 * @returns {Promise<ClaudeUsagePayload>}
 */
async function getClaudeUsage(runCswap, now) {
  if (cached_payload && now() < cache_expires_at) {
    return cached_payload;
  }
  if (in_flight) {
    return in_flight;
  }

  const generation = cache_generation;
  const pending = loadClaudeUsage(runCswap).then((payload) => {
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
 * Drop the cached snapshot and disown any in-flight lookup after a switch.
 */
export function invalidateCache() {
  cache_generation += 1;
  cached_payload = null;
  cache_expires_at = 0;
  in_flight = null;
}

/**
 * Create an Express handler. Tests inject only the external process/time
 * boundaries; production uses the cswap runner above.
 *
 * @param {{ runCswap?: () => Promise<{ code: number, stdout: string, stderr: string }>, now?: () => number }} [options]
 * @returns {RequestHandler}
 */
export function createClaudeUsageHandler(options = {}) {
  const runCswap = options.runCswap || runCswapCommand;
  const now = options.now || (() => Date.now());

  /**
   * @param {Request} _req
   * @param {Response} res
   */
  async function handler(_req, res) {
    const payload = await getClaudeUsage(runCswap, now);
    res.set('Cache-Control', 'no-store');
    res.type('application/json');
    res.status(200).send(payload);
  }

  return handler;
}

export const claudeUsageHandler = createClaudeUsageHandler();

/** Reset module state between cache tests. */
export function __resetCacheForTest() {
  cache_generation += 1;
  cached_payload = null;
  cache_expires_at = 0;
  in_flight = null;
}
