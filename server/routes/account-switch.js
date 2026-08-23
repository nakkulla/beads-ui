/**
 * @import { Request, RequestHandler, Response } from 'express'
 */
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { invalidateCache as invalidateClaudeUsageCache } from './claude-usage.js';
import { invalidateCache as invalidateCodexUsageCache } from './codex-usage.js';

/**
 * @typedef {'claude' | 'codex'} SwitchProvider
 * @typedef {{ code: number, stdout: string, stderr: string, not_found: boolean, timed_out: boolean }} SwitchResult
 * @typedef {{ number: number, email: string | null }} AccountRef
 * @typedef {{ stdout: import('node:stream').Readable | null, stderr: import('node:stream').Readable | null, kill: (signal: NodeJS.Signals) => unknown, on: (event: string, listener: (...args: any[]) => void) => unknown }} SwitchChild
 * @typedef {(command: string, args: string[], options: { shell: false, windowsHide: true }) => SwitchChild} SpawnProcess
 */

const SWITCH_TIMEOUT_MS = 30_000;

/** @type {Record<SwitchProvider, { bin: string, args: (account_number: number) => string[] }>} */
const PROVIDERS = {
  claude: {
    bin: 'cswap',
    args: (account_number) => ['switch', String(account_number), '--json']
  },
  codex: {
    bin: 'codex-auth',
    args: (account_number) => ['switch', String(account_number), '--json']
  }
};

/**
 * One switch at a time per provider: the tools rewrite shared credential
 * state, so overlapping runs would race each other.
 *
 * @type {Set<SwitchProvider>}
 */
const in_flight_providers = new Set();

/**
 * Create the launchd-safe switch process runner for one provider.
 *
 * @param {{ provider: SwitchProvider, spawn_process?: SpawnProcess, home_dir?: string }} options
 */
export function createAccountSwitchRunner(options) {
  const provider = PROVIDERS[options.provider];
  const spawnProcess = /** @type {SpawnProcess} */ (
    options.spawn_process || spawn
  );
  const home_dir = options.home_dir || os.homedir();

  /**
   * Run one binary candidate without a shell.
   *
   * @param {string} bin
   * @param {number} account_number
   * @returns {Promise<SwitchResult>}
   */
  function runCandidate(bin, account_number) {
    return new Promise((resolve) => {
      const child = spawnProcess(bin, provider.args(account_number), {
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
      }, SWITCH_TIMEOUT_MS);
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
          not_found,
          timed_out
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
   * @param {number} account_number
   * @returns {Promise<SwitchResult>}
   */
  return async function runSwitch(account_number) {
    const from_path = await runCandidate(provider.bin, account_number);
    if (!from_path.not_found) {
      return from_path;
    }
    return runCandidate(
      path.join(home_dir, '.local', 'bin', provider.bin),
      account_number
    );
  };
}

/**
 * Normalize a `from`/`to` endpoint reported by the switch tool.
 *
 * @param {unknown} input
 * @returns {AccountRef | null}
 */
function normalizeAccountRef(input) {
  if (Number.isInteger(input) && /** @type {number} */ (input) > 0) {
    return { number: /** @type {number} */ (input), email: null };
  }
  if (!input || typeof input !== 'object') {
    return null;
  }
  const ref = /** @type {any} */ (input);
  if (!Number.isInteger(ref.number) || ref.number <= 0) {
    return null;
  }
  return {
    number: ref.number,
    email:
      typeof ref.email === 'string' && ref.email.length > 0 ? ref.email : null
  };
}

/**
 * Keep only the non-empty warning strings the tool reported.
 *
 * @param {unknown} input
 * @returns {string[]}
 */
function normalizeWarnings(input) {
  if (!Array.isArray(input)) {
    return [];
  }
  return input.filter(
    (/** @type {unknown} */ warning) =>
      typeof warning === 'string' && warning.length > 0
  );
}

/**
 * Shape one successful switch run into the shared response body.
 *
 * @param {unknown} input
 * @returns {{ ok: true, switched: boolean, from: AccountRef | null, to: AccountRef | null, warnings: string[] }}
 */
function normalizeSwitchOutput(input) {
  const output = /** @type {any} */ (input);
  return {
    ok: true,
    switched: output.switched === true,
    from: normalizeAccountRef(output.from),
    to: normalizeAccountRef(output.to),
    warnings: normalizeWarnings(output.warnings)
  };
}

/**
 * Read a positive integer account number out of a JSON request body.
 *
 * @param {unknown} body
 * @returns {number | null}
 */
function readAccountNumber(body) {
  if (!body || typeof body !== 'object') {
    return null;
  }
  const account_number = /** @type {any} */ (body).number;
  if (!Number.isInteger(account_number) || account_number <= 0) {
    return null;
  }
  return account_number;
}

/**
 * Create the account switch handler for one provider. The usage cache is
 * invalidated on every successful run, including `already-active`, so the
 * follow-up refresh cannot be served from a pre-switch snapshot.
 *
 * @param {{ provider: SwitchProvider, runSwitch?: (account_number: number) => Promise<SwitchResult>, invalidateUsageCache: () => void }} options
 * @returns {RequestHandler}
 */
export function createAccountSwitchHandler(options) {
  const provider = options.provider;
  const runSwitch =
    options.runSwitch || createAccountSwitchRunner({ provider });
  const invalidateUsageCache = options.invalidateUsageCache;

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async function handler(req, res) {
    const account_number = readAccountNumber(req.body);
    if (account_number === null) {
      res.status(400).json({ ok: false, error: 'invalid_number' });
      return;
    }
    if (in_flight_providers.has(provider)) {
      res.status(409).json({ ok: false, error: 'switch_in_flight' });
      return;
    }

    in_flight_providers.add(provider);
    try {
      const result = await runSwitch(account_number);
      if (!result) {
        res.status(200).json({ ok: false, error: 'switch_failed' });
        return;
      }
      if (result.timed_out) {
        res.status(200).json({ ok: false, error: 'timeout' });
        return;
      }
      if (result.not_found) {
        res.status(200).json({ ok: false, error: 'not_found' });
        return;
      }
      if (result.code !== 0) {
        res.status(200).json({ ok: false, error: 'switch_failed' });
        return;
      }

      /** @type {unknown} */
      let parsed;
      try {
        parsed = JSON.parse(result.stdout);
      } catch {
        res.status(200).json({ ok: false, error: 'invalid_output' });
        return;
      }
      if (!parsed || typeof parsed !== 'object') {
        res.status(200).json({ ok: false, error: 'invalid_output' });
        return;
      }

      invalidateUsageCache();
      res.status(200).json(normalizeSwitchOutput(parsed));
    } catch {
      res.status(200).json({ ok: false, error: 'switch_failed' });
    } finally {
      in_flight_providers.delete(provider);
    }
  }

  return handler;
}

export const claudeAccountSwitchHandler = createAccountSwitchHandler({
  provider: 'claude',
  invalidateUsageCache: invalidateClaudeUsageCache
});

export const codexAccountSwitchHandler = createAccountSwitchHandler({
  provider: 'codex',
  invalidateUsageCache: invalidateCodexUsageCache
});

/** Reset the per-provider in-flight guard between tests. */
export function __resetSwitchStateForTest() {
  in_flight_providers.clear();
}
