/**
 * @import { Request, RequestHandler, Response } from 'express'
 */
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

/**
 * @typedef {{ key: string, pct: number, resetsAt: string }} UsageWindow
 * @typedef {{ stdout: import('node:stream').Readable | null, stderr: import('node:stream').Readable | null, kill: (signal: NodeJS.Signals) => unknown, on: (event: string, listener: (...args: any[]) => void) => unknown }} CodexAuthChild
 * @typedef {(command: string, args: string[], options: { shell: false, windowsHide: true }) => CodexAuthChild} SpawnProcess
 */

const CODEX_AUTH_TIMEOUT_MS = 10_000;
const CACHE_TTL_MS = 180_000;

/** @type {ReturnType<typeof normalizeCodexUsage> | null} */
let cached_payload = null;
let cache_expires_at = 0;
/** @type {Promise<ReturnType<typeof normalizeCodexUsage>> | null} */
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
 * Normalize versioned codex-auth output for the browser usage meter.
 *
 * @param {unknown} input
 * @param {() => number} [now]
 * @returns {{ available: false } | { available: true, provider: 'codex', windows: UsageWindow[], fetchedAt: string, ageSeconds: number }}
 */
export function normalizeCodexUsage(input, now = () => Date.now()) {
  if (!input || typeof input !== 'object') {
    return unavailable();
  }
  const root = /** @type {any} */ (input);
  if (
    root.schema_version !== 1 ||
    root.command !== 'list' ||
    typeof root.active_account_key !== 'string' ||
    !Array.isArray(root.accounts)
  ) {
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
  if (!['api', 'local', 'cache'].includes(usage.source)) {
    return unavailable();
  }
  const fetched_at = epochToIso(usage.updated_at);
  const primary = normalizeWindow(usage.primary);
  if (!fetched_at || !primary) {
    return unavailable();
  }
  /** @type {UsageWindow[]} */
  const windows = [primary];
  if (usage.secondary !== undefined && usage.secondary !== null) {
    const secondary = normalizeWindow(usage.secondary);
    if (!secondary) {
      return unavailable();
    }
    windows.push(secondary);
  }
  const age_seconds = Math.max(0, Math.floor(now() / 1000 - usage.updated_at));
  return {
    available: true,
    provider: 'codex',
    windows,
    fetchedAt: fetched_at,
    ageSeconds: age_seconds
  };
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
   * @returns {Promise<{ code: number, stdout: string, stderr: string, not_found: boolean }>}
   */
  function runCandidate(bin) {
    return new Promise((resolve) => {
      const child = spawnProcess(bin, ['list', '--active', '--json'], {
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

  return async function runCodexAuth() {
    const from_path = await runCandidate('codex-auth');
    if (!from_path.not_found) {
      return from_path;
    }
    return runCandidate(path.join(home_dir, '.local', 'bin', 'codex-auth'));
  };
}

const run_codex_auth_command = createCodexAuthRunner();

/**
 * Execute codex-auth and collapse every failure to the fail-quiet payload.
 *
 * @param {() => Promise<{ code: number, stdout: string, stderr: string }>} runCodexAuth
 * @param {() => number} now
 */
async function loadCodexUsage(runCodexAuth, now) {
  try {
    const result = await runCodexAuth();
    if (!result || result.code !== 0) {
      return unavailable();
    }
    return normalizeCodexUsage(JSON.parse(result.stdout), now);
  } catch {
    return unavailable();
  }
}

/**
 * Read the module-level positive/negative TTL cache.
 *
 * @param {() => Promise<{ code: number, stdout: string, stderr: string }>} runCodexAuth
 * @param {() => number} now
 */
async function getCodexUsage(runCodexAuth, now) {
  if (cached_payload && now() < cache_expires_at) {
    return cached_payload;
  }
  if (in_flight) {
    return in_flight;
  }

  const pending = loadCodexUsage(runCodexAuth, now).then((payload) => {
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
 * @param {ReturnType<typeof normalizeCodexUsage>} payload
 * @param {() => number} now
 */
function withCurrentAge(payload, now) {
  if (!payload.available) {
    return payload;
  }
  const fetched_at = Date.parse(payload.fetchedAt);
  return {
    ...payload,
    ageSeconds: Math.max(0, Math.floor((now() - fetched_at) / 1000))
  };
}

/**
 * Create the fail-quiet Codex usage route handler.
 *
 * @param {{ runCodexAuth?: () => Promise<{ code: number, stdout: string, stderr: string }>, now?: () => number }} [options]
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
  cached_payload = null;
  cache_expires_at = 0;
  in_flight = null;
}
