/**
 * @import { Request, RequestHandler, Response } from 'express'
 */
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

/**
 * @typedef {{ key: string, pct: number, resetsAt: string }} UsageWindow
 */

const CSWAP_TIMEOUT_MS = 10_000;
const CACHE_TTL_MS = 30_000;

/** @type {ReturnType<typeof normalizeClaudeUsage> | null} */
let cached_payload = null;
let cache_expires_at = 0;
/** @type {Promise<ReturnType<typeof normalizeClaudeUsage>> | null} */
let in_flight = null;

/**
 * Return the fail-quiet response shared by every invalid input path.
 *
 * @returns {{ available: false }}
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
 * Normalize `cswap list --json` output for the browser usage meter.
 *
 * @param {unknown} input
 * @returns {{ available: false } | { available: true, email: string, windows: UsageWindow[], fetchedAt: string, ageSeconds: number }}
 */
export function normalizeClaudeUsage(input) {
  if (!input || typeof input !== 'object') {
    return unavailable();
  }
  const root = /** @type {any} */ (input);
  if (!Array.isArray(root.accounts)) {
    return unavailable();
  }
  const account = root.accounts.find(
    (/** @type {any} */ candidate) => candidate && candidate.active === true
  );
  if (!account || !account.usage || typeof account.usage !== 'object') {
    return unavailable();
  }
  if (
    typeof account.email !== 'string' ||
    account.email.length === 0 ||
    typeof account.usageFetchedAt !== 'string' ||
    account.usageFetchedAt.length === 0 ||
    typeof account.usageAgeSeconds !== 'number' ||
    !Number.isFinite(account.usageAgeSeconds) ||
    account.usageAgeSeconds < 0 ||
    !Array.isArray(account.usage.scoped)
  ) {
    return unavailable();
  }

  const five_hour = normalizeWindow('5h', account.usage.fiveHour);
  const seven_day = normalizeWindow('7d', account.usage.sevenDay);
  if (!five_hour || !seven_day) {
    return unavailable();
  }

  /** @type {UsageWindow[]} */
  const scoped_windows = [];
  for (const scoped of account.usage.scoped) {
    if (!scoped || typeof scoped.name !== 'string') {
      return unavailable();
    }
    const window = normalizeWindow(scoped.name, scoped);
    if (!window) {
      return unavailable();
    }
    scoped_windows.push(window);
  }

  return {
    available: true,
    email: account.email,
    windows: [five_hour, seven_day, ...scoped_windows],
    fetchedAt: account.usageFetchedAt,
    ageSeconds: account.usageAgeSeconds
  };
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
 * @returns {Promise<ReturnType<typeof normalizeClaudeUsage>>}
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
 * @returns {Promise<ReturnType<typeof normalizeClaudeUsage>>}
 */
async function getClaudeUsage(runCswap, now) {
  if (cached_payload && now() < cache_expires_at) {
    return cached_payload;
  }
  if (in_flight) {
    return in_flight;
  }

  const pending = loadClaudeUsage(runCswap).then((payload) => {
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
  cached_payload = null;
  cache_expires_at = 0;
  in_flight = null;
}
