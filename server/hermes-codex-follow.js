import { execFile } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { codexIdentityOf } from './routes/account-login.js';
import { subscribeAccountSwitched } from './routes/account-switch.js';

/**
 * Hermes follows the Codex active account (UI-ow0x). Hermes keeps its own
 * `openai-codex` credential pool, separate from Codex CLI's login so the two
 * never share a refresh token (Cortex-tu2). After a Codex switch lands, the
 * pool entry that is the same account moves to priority 0 through
 * `hermes auth priority`; this module never writes Hermes's store itself and
 * never logs a token or an email.
 */

const HERMES_PROVIDER = 'openai-codex';
const CODEX_AUTH_CLAIM = 'https://api.openai.com/auth';
const HERMES_TIMEOUT_MS = 15_000;

/**
 * @typedef {'moved'|'already_first'|'no_codex_identity'|'pool_unreadable'|'no_match'|'hermes_missing'|'failed'|'timeout'} FollowStatus
 * @typedef {{ status: FollowStatus, entry_id?: string }} FollowOutcome
 * @typedef {(file: string, args: string[], options: { shell: false, windowsHide: true, timeout: number, killSignal: NodeJS.Signals }, callback: (error: (Error & { code?: unknown, killed?: boolean, signal?: unknown }) | null) => void) => unknown} ExecFile
 * @typedef {{ codex_home?: string, hermes_home?: string, home_dir?: string, exec_file?: ExecFile, timeout_ms?: number }} FollowOptions
 */

/**
 * The `user::workspace` key of a pool entry's access token, the same key
 * `codexIdentityOf` gives a Codex login. The payload is decoded without a
 * signature check because it is only compared, never trusted.
 *
 * @param {unknown} token
 * @returns {string | null}
 */
export function hermesEntryKeyOf(token) {
  if (typeof token !== 'string') {
    return null;
  }
  const parts = token.split('.');
  if (parts.length < 2) {
    return null;
  }
  /** @type {any} */
  let payload;
  try {
    payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  const claim = payload?.[CODEX_AUTH_CLAIM];
  if (!claim || typeof claim !== 'object') {
    return null;
  }
  const user = nonEmpty(claim.chatgpt_user_id) ?? nonEmpty(claim.user_id);
  const workspace = nonEmpty(claim.chatgpt_account_id);
  if (!user || !workspace) {
    return null;
  }
  return `${user}::${workspace}`;
}

/**
 * @param {unknown} value
 * @returns {string | null}
 */
function nonEmpty(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * Create the follower. `follow()` runs one pass; passes run one after another
 * so two quick switches settle in switch order.
 *
 * @param {FollowOptions} [options]
 */
export function createHermesCodexFollow(options = {}) {
  const home_dir = options.home_dir || os.homedir();
  const codex_home =
    options.codex_home ||
    nonEmpty(process.env.CODEX_HOME) ||
    path.join(home_dir, '.codex');
  const hermes_home =
    options.hermes_home ||
    nonEmpty(process.env.HERMES_HOME) ||
    path.join(home_dir, '.hermes');
  const exec_file = /** @type {ExecFile} */ (options.exec_file || execFile);
  const timeout_ms = options.timeout_ms ?? HERMES_TIMEOUT_MS;
  const hermes_bins = [
    'hermes',
    path.join(home_dir, '.local', 'bin', 'hermes')
  ];

  /** @type {Promise<unknown>} */
  let chain = Promise.resolve();

  /**
   * Run one hermes candidate without a shell.
   *
   * @param {string} bin
   * @param {string[]} args
   * @returns {Promise<'ok'|'not_found'|'failed'|'timeout'>}
   */
  function runHermes(bin, args) {
    return new Promise((resolve) => {
      exec_file(
        bin,
        args,
        {
          shell: false,
          windowsHide: true,
          timeout: timeout_ms,
          killSignal: 'SIGKILL'
        },
        (error) => {
          if (!error) {
            resolve('ok');
          } else if (error.code === 'ENOENT') {
            resolve('not_found');
          } else if (error.killed) {
            resolve('timeout');
          } else {
            resolve('failed');
          }
        }
      );
    });
  }

  /**
   * @returns {Promise<FollowOutcome>}
   */
  async function followOnce() {
    /** @type {string | null} */
    let codex_key = null;
    try {
      const bytes = await fs.promises.readFile(
        path.join(codex_home, 'auth.json')
      );
      codex_key = codexIdentityOf(bytes)?.key ?? null;
    } catch {
      codex_key = null;
    }
    if (!codex_key) {
      return { status: 'no_codex_identity' };
    }

    /** @type {any} */
    let pool;
    try {
      const doc = JSON.parse(
        await fs.promises.readFile(path.join(hermes_home, 'auth.json'), 'utf8')
      );
      pool = doc?.credential_pool?.[HERMES_PROVIDER];
    } catch {
      return { status: 'pool_unreadable' };
    }
    if (!Array.isArray(pool)) {
      return { status: 'pool_unreadable' };
    }

    const matches = pool
      .filter(
        (entry) =>
          entry &&
          nonEmpty(entry.id) &&
          Number.isInteger(entry.priority) &&
          hermesEntryKeyOf(entry.access_token) === codex_key
      )
      .sort((a, b) => a.priority - b.priority);
    if (matches.length === 0) {
      return { status: 'no_match' };
    }
    const entry_id = /** @type {string} */ (matches[0].id);
    if (matches[0].priority === 0) {
      return { status: 'already_first', entry_id };
    }

    const args = ['auth', 'priority', HERMES_PROVIDER, entry_id, '0'];
    for (const bin of hermes_bins) {
      const result = await runHermes(bin, args);
      if (result === 'ok') {
        return { status: 'moved', entry_id };
      }
      if (result !== 'not_found') {
        return { status: result, entry_id };
      }
    }
    return { status: 'hermes_missing', entry_id };
  }

  return {
    /**
     * @returns {Promise<FollowOutcome>}
     */
    follow() {
      const run = chain.then(followOnce, followOnce);
      chain = run.catch(() => {});
      return run;
    }
  };
}

/**
 * Subscribe the follower to switch successes. Only Codex switches move
 * Hermes; the outcome goes to the server log and never fails the switch.
 *
 * @param {FollowOptions & { subscribe?: typeof subscribeAccountSwitched, log?: (message: string) => void }} [options]
 * @returns {() => void}
 */
export function installHermesCodexFollow(options = {}) {
  const follower = createHermesCodexFollow(options);
  const subscribe = options.subscribe || subscribeAccountSwitched;
  const log = options.log || ((message) => console.warn(message));
  return subscribe(async (provider) => {
    if (provider !== 'codex') {
      return;
    }
    const outcome = await follower.follow();
    log(
      `hermes-codex-follow: ${outcome.status}` +
        (outcome.entry_id ? ` entry=${outcome.entry_id}` : '')
    );
  });
}
