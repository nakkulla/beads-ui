/**
 * Account login sessions for the usage card (UI-xm29 §4.1-§4.3).
 *
 * A login session logs one account in WITHOUT moving the active login. Codex
 * runs `codex login --device-auth` in a throwaway `CODEX_HOME` and imports the
 * result with `codex-auth import`; Claude runs `cswap login` in a window of the
 * server-only tmux session `bdui-login`, and cswap owns isolation, identity and
 * storage there. At most one session per provider is in progress. Sessions
 * live in memory only; the server entry's one startup sweep
 * (`cleanupStaleLogins`) removes what an earlier process left behind.
 *
 * Nothing a login prints reaches a log: codes, device codes, tokens and tool
 * output stay inside the session, and the only tool text a client sees is the
 * last output line, ANSI stripped and cut to 200 characters.
 *
 * The session core takes every process, tmux, file and clock boundary as a
 * dependency and has no Express in it, so another caller (UI-s4g1) can drive
 * it; the route handlers sit on top.
 *
 * @import { Request, RequestHandler, Response } from 'express'
 */
import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { debug } from '../logging.js';
import { stateRootDir } from '../worker/state-paths.js';
import { acquireSwitchLock, releaseSwitchLock } from './account-switch.js';
import {
  invalidateCache as invalidateClaudeUsageCache,
  listAccountsFresh as listClaudeAccountsFresh,
  resolveCswapPath
} from './claude-usage.js';
import {
  invalidateCache as invalidateCodexUsageCache,
  listAccountsFresh as listCodexAccountsFresh
} from './codex-usage.js';

/**
 * @typedef {'claude'|'codex'} LoginProvider
 * @typedef {'relogin'|'add'} LoginMode
 * @typedef {'starting'|'awaiting_user'|'verifying'|'done'|'failed'|'cancelled'|'expired'} LoginState
 * @typedef {{ outcome: 'updated'|'added', key: string, email: string, number: number|null }} LoginResult
 * @typedef {{ code: number, stdout: string, stderr: string, not_found: boolean, timed_out: boolean }} CommandResult
 * @typedef {(bin: string, args: string[], options?: { timeout_ms?: number }) => Promise<CommandResult>} RunCommand
 * @typedef {{ setEncoding?: (encoding: BufferEncoding) => unknown, on: (event: string, listener: (...args: any[]) => void) => unknown }} LoginStream
 * @typedef {{ pid?: number, stdout: LoginStream | null, stderr: LoginStream | null, on: (event: string, listener: (...args: any[]) => void) => unknown }} LoginChild
 * @typedef {(command: string, args: string[], options: { shell: false, windowsHide: true, detached: true, stdio: ['ignore', 'pipe', 'pipe'], env: NodeJS.ProcessEnv }) => LoginChild} SpawnLogin
 * @typedef {{ key: string, number: number, email: string, active: boolean }} ListedAccount
 * @typedef {{ ok: true, accounts: ListedAccount[], active_key: string|null } | { ok: false, error: string }} AccountListRead
 * @typedef {{ state: 'done'|'failed'|'cancelled'|'expired', result?: LoginResult|null, error?: string|null, message?: string|null, logged_in_email?: string|null }} LoginEnd
 */

/**
 * The file side of a login: the throwaway Codex homes, the pid records the
 * startup sweep reads, and the atomic replacement of the global Codex login.
 *
 * @typedef {Object} LoginFiles
 * @property {() => Promise<string>} createTempHome - A new 0700 `CODEX_HOME`.
 * @property {(home: string) => Promise<void>} removeTempHome
 * @property {(home: string) => string} tempAuthPath
 * @property {(home: string) => Promise<Buffer>} readTempAuth
 * @property {(bytes: Buffer) => Promise<void>} replaceActiveAuth - Atomically
 * replace `$CODEX_HOME/auth.json` (0600 temp file in the same folder, then
 * rename).
 * @property {(login_id: string, pid: number) => Promise<void>} writePidRecord
 * @property {(login_id: string) => Promise<void>} removePidRecord
 * @property {() => Promise<Array<{ login_id: string, pid: number|null }>>} readPidRecords
 * @property {() => Promise<number>} removeTempHomes - Delete every leftover
 * temp home; returns how many.
 */

/**
 * @typedef {Object} LoginSession
 * @property {string} id
 * @property {LoginProvider} provider
 * @property {LoginMode} mode
 * @property {number|null} number
 * @property {string|null} pinned_key
 * @property {LoginState} state
 * @property {string|null} url
 * @property {string|null} user_code
 * @property {boolean} code_sent
 * @property {LoginResult|null} result
 * @property {string|null} error
 * @property {string|null} message
 * @property {string|null} logged_in_email
 * @property {Promise<void>|null} stopping - Set once a stop procedure began.
 * @property {boolean} finishing - The child is gone and the server-side
 * finish (capture, import, list re-read) runs; cancel and expiry wait it out.
 * @property {Set<ReturnType<typeof setTimeout>>} timers
 * @property {ReturnType<typeof setTimeout>|null} deadline_timer
 * @property {LoginChild|null} child
 * @property {number|null} pid
 * @property {Promise<void>|null} pid_record
 * @property {boolean} exited
 * @property {Promise<void>} exit_promise
 * @property {() => void} mark_exited
 * @property {string|null} home
 * @property {string} output
 * @property {string|null} window_id
 * @property {string|null} pane_id
 */

/**
 * @typedef {Object} AccountLoginDeps
 * @property {(name: string) => string|null} [resolveBin]
 * @property {() => string|null} [resolveCswap]
 * @property {SpawnLogin} [spawnLogin]
 * @property {RunCommand} [runCommand]
 * @property {(args: string[]) => Promise<CommandResult>} [runTmux]
 * @property {(pid: number, signal: NodeJS.Signals) => void} [killGroup]
 * @property {(pid: number) => boolean} [processAlive]
 * @property {LoginFiles} [files]
 * @property {Record<LoginProvider, () => Promise<AccountListRead>>} [listAccounts]
 * @property {Record<LoginProvider, () => void>} [invalidateUsageCache]
 * @property {(provider: LoginProvider) => boolean} [acquireLock]
 * @property {(provider: LoginProvider) => void} [releaseLock]
 * @property {() => string} [randomId]
 * @property {NodeJS.ProcessEnv} [env]
 * @property {(...args: any[]) => void} [log]
 */

export const LOGIN_TIMEOUT_MS = 15 * 60_000;
export const LOGIN_RETAIN_MS = 5 * 60_000;
export const CODE_DEADLINE_MS = 10_000;
export const STOP_GRACE_MS = 5_000;
export const KILL_CONFIRM_MS = 1_000;
export const POLL_MS = 1_000;
export const GONE_POLL_MS = 250;
export const LOCK_RETRY_MS = 500;
export const LOCK_RETRY_LIMIT = 60;
export const LOGIN_TMUX_SESSION = 'bdui-login';
// Wide enough that the ~450-character Claude OAuth URL never wraps, so a
// TUI that hard-wraps at the pane width cannot cut it.
export const LOGIN_WINDOW_COLUMNS = '1000';
export const LOGIN_WINDOW_ROWS = '50';
const MESSAGE_MAX = 200;
const OUTPUT_MAX = 64 * 1024;
const TOOL_TIMEOUT_MS = 30_000;
const TMUX_TIMEOUT_MS = 10_000;
const PS_TIMEOUT_MS = 5_000;
const CODEX_AUTH_CLAIM = 'https://api.openai.com/auth';
const TERMINAL_STATES = ['done', 'failed', 'cancelled', 'expired'];
/** Server env values the Claude login window mirrors, or unsets when absent. */
const MIRRORED_CLAUDE_ENV = [
  'CLAUDE_CONFIG_DIR',
  'CLAUDE_SECURESTORAGE_CONFIG_DIR'
];

const default_log = debug('account-login');

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function nonEmptyString(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * @param {LoginState} state
 */
function isTerminal(state) {
  return TERMINAL_STATES.includes(state);
}

/**
 * Remove terminal escape sequences (CSI, OSC, two-byte escapes) and carriage
 * returns, so a colored tool output reads as plain lines.
 *
 * @param {string} text
 * @returns {string}
 */
export function stripAnsi(text) {
  /* eslint-disable no-control-regex -- matching terminal escapes is the point */
  return String(text)
    .replace(/\u001b\][^\u0007\u001b]*(?:\u0007|\u001b\\)/g, '')
    .replace(/\u001b\[[0-?]*[ -/]*[@-~]/g, '')
    .replace(/\u001b[@-Z\\-_]/g, '')
    .replace(/\r/g, '');
  /* eslint-enable no-control-regex */
}

/**
 * The one tool-output line a client may see: the last non-empty line, ANSI
 * stripped, cut to 200 characters; null when there is none.
 *
 * @param {string} text
 * @returns {string|null}
 */
export function lastOutputLine(text) {
  const lines = stripAnsi(text).split('\n');
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const line = lines[index].trim();
    if (line.length > 0) {
      return line.slice(0, MESSAGE_MAX);
    }
  }
  return null;
}

/**
 * Cut a message for the client; null for an empty one.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function cutMessage(value) {
  if (typeof value !== 'string') {
    return null;
  }
  return lastOutputLine(value);
}

/**
 * Find the device-code link and the one-time code in `codex login
 * --device-auth` output. Only complete lines are read, so a chunk that ends
 * inside the code cannot yield a truncated one.
 *
 * @param {string} output - Raw accumulated output.
 * @returns {{ url: string, user_code: string } | null}
 */
export function deviceCodeOf(output) {
  const text = stripAnsi(output);
  const complete = text.slice(0, text.lastIndexOf('\n') + 1);
  const url_match = complete.match(/https:\/\/[^\s"'<>]+/);
  if (!url_match) {
    return null;
  }
  const without_urls = complete.replace(/https?:\/\/[^\s"'<>]+/g, ' ');
  const code_match = without_urls.match(
    /(?<![A-Za-z0-9-])[A-Z0-9]{4,}(?:-[A-Z0-9]{4,})+(?![A-Za-z0-9-])/
  );
  if (!code_match) {
    return null;
  }
  return { url: url_match[0], user_code: code_match[0] };
}

/** Characters a URL may carry, for rejoining a hard-wrapped one. */
const URL_CONTINUATION = /^[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=%]+$/;

/**
 * The first `https://` URL in a captured pane. `capture-pane -J` already
 * rejoins soft wraps; a line that a TUI hard-wrapped continues on the next
 * lines that hold only URL characters, which are joined back up to the first
 * blank or worded line.
 *
 * @param {string} captured
 * @returns {string|null}
 */
export function loginUrlOf(captured) {
  const lines = stripAnsi(captured).split('\n');
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/https:\/\/[^\s"'<>]+/);
    if (!match || match.index === undefined) {
      continue;
    }
    let url = match[0];
    const rest = lines[index].slice(match.index + url.length);
    if (rest.trim().length === 0) {
      for (let next = index + 1; next < lines.length; next += 1) {
        const piece = lines[next].trim();
        if (piece.length === 0 || !URL_CONTINUATION.test(piece)) {
          break;
        }
        url += piece;
      }
    }
    return url.replace(/[.,)\]}>'"]+$/, '');
  }
  return null;
}

/**
 * The last line of captured output that parses as a JSON object — the
 * scripted result line `cswap login --json` ends with.
 *
 * @param {string} captured
 * @returns {Record<string, any>|null}
 */
export function lastJsonObjectOf(captured) {
  const lines = stripAnsi(captured).split('\n');
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const line = lines[index].trim();
    if (!line.startsWith('{') || !line.endsWith('}')) {
      continue;
    }
    try {
      const parsed = JSON.parse(line);
      if (isRecord(parsed)) {
        return parsed;
      }
    } catch {
      // Not the result line; keep looking upward.
    }
  }
  return null;
}

/**
 * The Codex account identity of a login's `auth.json`: the `id_token`
 * payload, decoded without a signature check because it is only compared
 * against the account list. The key is `user::workspace` exactly as
 * `codex-auth list --json` prints `account_key`.
 *
 * @param {Buffer|string} bytes
 * @returns {{ key: string, email: string|null } | null}
 */
export function codexIdentityOf(bytes) {
  /** @type {unknown} */
  let doc;
  try {
    doc = JSON.parse(String(bytes));
  } catch {
    return null;
  }
  if (!isRecord(doc) || !isRecord(doc.tokens)) {
    return null;
  }
  const id_token = nonEmptyString(doc.tokens.id_token);
  const parts = id_token ? id_token.split('.') : [];
  if (parts.length < 2) {
    return null;
  }
  /** @type {unknown} */
  let payload;
  try {
    payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  if (!isRecord(payload)) {
    return null;
  }
  const claim = isRecord(payload[CODEX_AUTH_CLAIM])
    ? payload[CODEX_AUTH_CLAIM]
    : {};
  const user =
    nonEmptyString(claim.chatgpt_user_id) ?? nonEmptyString(claim.user_id);
  const workspace =
    nonEmptyString(claim.chatgpt_account_id) ??
    nonEmptyString(doc.tokens.account_id);
  if (!user || !workspace) {
    return null;
  }
  return { key: `${user}::${workspace}`, email: nonEmptyString(payload.email) };
}

/**
 * Whether a pasted Claude code may be typed into the pane: printable ASCII
 * with no whitespace (a newline under `send-keys -l` would submit early) and
 * no `;` (tmux reads a trailing one as a command separator).
 *
 * @param {unknown} code
 * @returns {code is string}
 */
function isLoginCode(code) {
  return (
    typeof code === 'string' &&
    code.length > 0 &&
    code.length <= 4096 &&
    /^[\x21-\x3a\x3c-\x7e]+$/.test(code)
  );
}

/**
 * Resolve an executable from PATH, then the launchd-safe user-local and
 * Homebrew folders. An empty PATH element is skipped, never read as the
 * current directory.
 *
 * @param {string} name
 * @param {{ path_env?: string, home_dir?: string }} [options]
 * @returns {string|null}
 */
export function resolveExecutable(name, options = {}) {
  const path_env = options.path_env ?? process.env.PATH ?? '';
  const home_dir = options.home_dir ?? os.homedir();
  const candidates = [
    ...path_env
      .split(path.delimiter)
      .filter((entry) => entry.length > 0)
      .map((entry) => path.resolve(entry, name)),
    path.join(home_dir, '.local', 'bin', name),
    path.join('/opt/homebrew/bin', name),
    path.join('/usr/local/bin', name)
  ];
  for (const candidate of candidates) {
    try {
      fs.accessSync(candidate, fs.constants.X_OK);
      if (fs.statSync(candidate).isFile()) {
        return candidate;
      }
    } catch {
      // Not here; keep looking.
    }
  }
  return null;
}

/**
 * Run one binary without a shell and capture its output. Nothing about the
 * run is logged: arguments can carry a login code.
 *
 * @type {RunCommand}
 */
export function runCommand(bin, args, options = {}) {
  const timeout_ms = options.timeout_ms ?? TOOL_TIMEOUT_MS;
  return new Promise((resolve) => {
    /** @type {import('node:child_process').ChildProcess} */
    let child;
    try {
      child = spawn(bin, args, {
        shell: false,
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe']
      });
    } catch (error) {
      const spawn_error = /** @type {NodeJS.ErrnoException} */ (error);
      resolve({
        code: 127,
        stdout: '',
        stderr: '',
        not_found: spawn_error.code === 'ENOENT',
        timed_out: false
      });
      return;
    }
    /** @type {string[]} */
    const stdout_chunks = [];
    /** @type {string[]} */
    const stderr_chunks = [];
    let settled = false;
    let timed_out = false;
    child.stdout?.setEncoding('utf8');
    child.stdout?.on('data', (chunk) => stdout_chunks.push(String(chunk)));
    child.stderr?.setEncoding('utf8');
    child.stderr?.on('data', (chunk) => stderr_chunks.push(String(chunk)));
    const timer = setTimeout(() => {
      timed_out = true;
      child.kill('SIGKILL');
      finish(124, false);
    }, timeout_ms);
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
 * The file side of logins under `<state root>/account-login`: `codex-tmp/`
 * holds the throwaway homes (and nothing else, so the startup sweep may
 * empty it), `pids/` the pid records.
 *
 * @param {{ state_dir?: string, codex_home?: string, fs?: typeof fs.promises }} [options]
 * @returns {LoginFiles}
 */
export function createLoginFiles(options = {}) {
  const fsp = options.fs || fs.promises;
  const stateDir = () =>
    options.state_dir || path.join(stateRootDir(), 'account-login');
  const homesDir = () => path.join(stateDir(), 'codex-tmp');
  const pidsDir = () => path.join(stateDir(), 'pids');
  const activeHome = () =>
    options.codex_home ||
    nonEmptyString(process.env.CODEX_HOME) ||
    path.join(os.homedir(), '.codex');

  /**
   * Create a private folder; `mkdir`'s mode is masked and skips an existing
   * folder, so the mode is set again.
   *
   * @param {string} dir
   */
  async function ensurePrivateDir(dir) {
    await fsp.mkdir(dir, { recursive: true, mode: 0o700 });
    await fsp.chmod(dir, 0o700);
  }

  /**
   * @param {string} home
   */
  function assertTempHome(home) {
    const relative = path.relative(homesDir(), home);
    if (
      relative.length === 0 ||
      relative.startsWith('..') ||
      path.isAbsolute(relative) ||
      relative.includes(path.sep)
    ) {
      throw new Error('not a login temp home');
    }
  }

  /**
   * @param {string} dir
   * @returns {Promise<string[]>}
   */
  async function readDirOrEmpty(dir) {
    try {
      return await fsp.readdir(dir);
    } catch (error) {
      if (/** @type {NodeJS.ErrnoException} */ (error).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  return {
    async createTempHome() {
      await ensurePrivateDir(stateDir());
      await ensurePrivateDir(homesDir());
      const home = await fsp.mkdtemp(path.join(homesDir(), 'home-'));
      await fsp.chmod(home, 0o700);
      // File storage keeps the login in `<home>/auth.json`, where the import
      // reads it, instead of a keychain item the sweep could not find.
      await fsp.writeFile(
        path.join(home, 'config.toml'),
        'cli_auth_credentials_store = "file"\n',
        { mode: 0o600 }
      );
      return home;
    },
    async removeTempHome(home) {
      assertTempHome(home);
      await fsp.rm(home, { recursive: true, force: true });
    },
    tempAuthPath(home) {
      return path.join(home, 'auth.json');
    },
    async readTempAuth(home) {
      return fsp.readFile(path.join(home, 'auth.json'));
    },
    async replaceActiveAuth(bytes) {
      const dir = activeHome();
      await fsp.mkdir(dir, { recursive: true, mode: 0o700 });
      const temp = path.join(
        dir,
        `.auth.json.bdui-${crypto.randomBytes(6).toString('hex')}.tmp`
      );
      try {
        await fsp.writeFile(temp, bytes, { mode: 0o600, flag: 'wx' });
        await fsp.chmod(temp, 0o600);
        await fsp.rename(temp, path.join(dir, 'auth.json'));
      } catch (error) {
        await fsp.rm(temp, { force: true }).catch(() => {});
        throw error;
      }
    },
    async writePidRecord(login_id, pid) {
      await ensurePrivateDir(stateDir());
      await ensurePrivateDir(pidsDir());
      await fsp.writeFile(path.join(pidsDir(), `${login_id}.pid`), `${pid}\n`, {
        mode: 0o600
      });
    },
    async removePidRecord(login_id) {
      await fsp.rm(path.join(pidsDir(), `${login_id}.pid`), { force: true });
    },
    async readPidRecords() {
      /** @type {Array<{ login_id: string, pid: number|null }>} */
      const records = [];
      for (const name of await readDirOrEmpty(pidsDir())) {
        if (!name.endsWith('.pid')) {
          continue;
        }
        /** @type {number|null} */
        let pid = null;
        try {
          const text = await fsp.readFile(path.join(pidsDir(), name), 'utf8');
          const parsed = Number.parseInt(text.trim(), 10);
          pid = Number.isInteger(parsed) && parsed > 1 ? parsed : null;
        } catch {
          pid = null;
        }
        records.push({ login_id: name.slice(0, -'.pid'.length), pid });
      }
      return records;
    },
    async removeTempHomes() {
      let removed = 0;
      for (const name of await readDirOrEmpty(homesDir())) {
        await fsp.rm(path.join(homesDir(), name), {
          recursive: true,
          force: true
        });
        removed += 1;
      }
      return removed;
    }
  };
}

/**
 * Signal a whole process group; an already-gone group is not an error.
 *
 * @param {number} pid
 * @param {NodeJS.Signals} signal
 */
function defaultKillGroup(pid, signal) {
  try {
    process.kill(-pid, signal);
  } catch {
    // ESRCH: the group is gone already.
  }
}

/**
 * @param {number} pid
 * @returns {boolean}
 */
function defaultProcessAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return /** @type {NodeJS.ErrnoException} */ (error).code === 'EPERM';
  }
}

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * The argv a Claude login pane runs. It goes through `/usr/bin/env` so the
 * pane sees the server's own cswap environment rather than whatever the tmux
 * server's global environment holds: the server's PATH, a UTF-8 LANG (the
 * launchd server has none, and the Claude TUI needs it), and the cswap
 * profile variables exactly as the server has them — unset when it has none,
 * because `cswap login` refuses a session-profile `CLAUDE_CONFIG_DIR`.
 *
 * @param {string} cswap_path
 * @param {{ mode: LoginMode, number: number|null }} session
 * @param {NodeJS.ProcessEnv} env
 * @returns {string[]}
 */
export function claudeLoginArgv(cswap_path, session, env) {
  /** @type {string[]} */
  const unset = [];
  /** @type {string[]} */
  const assign = ['LANG=en_US.UTF-8'];
  const path_env = nonEmptyString(env.PATH);
  if (path_env) {
    assign.push(`PATH=${path_env}`);
  }
  for (const name of MIRRORED_CLAUDE_ENV) {
    const value = nonEmptyString(env[name]);
    if (value) {
      assign.push(`${name}=${value}`);
    } else {
      unset.push('-u', name);
    }
  }
  const target =
    session.mode === 'relogin' ? [String(session.number)] : ['--new'];
  return [
    '/usr/bin/env',
    ...unset,
    ...assign,
    cswap_path,
    'login',
    ...target,
    '--json'
  ];
}

/**
 * Build the login session manager. Every boundary is a dependency; the
 * defaults are the real tools.
 *
 * @param {AccountLoginDeps} [options]
 */
export function createAccountLoginManager(options = {}) {
  const env = options.env || process.env;
  const resolveBin =
    options.resolveBin ||
    ((/** @type {string} */ name) => resolveExecutable(name));
  const resolveCswap = options.resolveCswap || (() => resolveCswapPath());
  const spawnLogin = /** @type {SpawnLogin} */ (options.spawnLogin || spawn);
  const run = options.runCommand || runCommand;
  const runTmux =
    options.runTmux ||
    ((/** @type {string[]} */ args) => {
      const tmux = resolveBin('tmux');
      if (!tmux) {
        return Promise.resolve({
          code: 127,
          stdout: '',
          stderr: '',
          not_found: true,
          timed_out: false
        });
      }
      return run(tmux, args, { timeout_ms: TMUX_TIMEOUT_MS });
    });
  const killGroup = options.killGroup || defaultKillGroup;
  const processAlive = options.processAlive || defaultProcessAlive;
  const files = options.files || createLoginFiles();
  /** @type {Record<LoginProvider, () => Promise<AccountListRead>>} */
  const listAccounts = options.listAccounts || {
    claude: () => listClaudeAccountsFresh(),
    codex: () => listCodexAccountsFresh()
  };
  /** @type {Record<LoginProvider, () => void>} */
  const invalidateUsageCache = options.invalidateUsageCache || {
    claude: () => invalidateClaudeUsageCache(),
    codex: () => invalidateCodexUsageCache()
  };
  const acquireLock = options.acquireLock || acquireSwitchLock;
  const releaseLock = options.releaseLock || releaseSwitchLock;
  const randomId = options.randomId || (() => crypto.randomUUID());
  const log = options.log || default_log;

  /** @type {Map<string, LoginSession>} */
  const sessions = new Map();
  /** @type {Map<LoginProvider, LoginSession>} */
  const in_progress = new Map();
  /** @type {Promise<unknown>|null} */
  let startup_cleanup = null;

  /**
   * Run `fn` after `ms` unless the session's timers are cleared first.
   *
   * @param {LoginSession} session
   * @param {number} ms
   * @param {() => void} fn
   */
  function later(session, ms, fn) {
    const timer = setTimeout(() => {
      session.timers.delete(timer);
      fn();
    }, ms);
    timer.unref?.();
    session.timers.add(timer);
    return timer;
  }

  /**
   * @param {LoginSession} session
   */
  function clearTimers(session) {
    for (const timer of session.timers) {
      clearTimeout(timer);
    }
    session.timers.clear();
    session.deadline_timer = null;
  }

  /**
   * @param {LoginSession} session
   */
  function clearDeadline(session) {
    if (session.deadline_timer) {
      clearTimeout(session.deadline_timer);
      session.timers.delete(session.deadline_timer);
      session.deadline_timer = null;
    }
  }

  /**
   * The ONE terminal transition, write-once: a later close, poll or stop
   * cannot overwrite an end that already landed. It releases the provider
   * slot and drops the session from memory five minutes later.
   *
   * @param {LoginSession} session
   * @param {LoginEnd} end
   * @returns {boolean} Whether this call ended the session.
   */
  function finish(session, end) {
    if (isTerminal(session.state)) {
      return false;
    }
    session.state = end.state;
    session.result = end.result ?? null;
    session.error = end.error ?? null;
    session.message = cutMessage(end.message);
    session.logged_in_email = end.logged_in_email ?? null;
    // The link, the code and the tool output are of no use once the login
    // ended; they are not kept for the five minutes the end stays readable.
    session.url = null;
    session.user_code = null;
    session.output = '';
    clearTimers(session);
    if (in_progress.get(session.provider) === session) {
      in_progress.delete(session.provider);
    }
    log(
      'login %s %s ended %s%s',
      session.id,
      session.provider,
      session.state,
      session.error ? ` (${session.error})` : ''
    );
    const drop = setTimeout(() => {
      if (sessions.get(session.id) === session) {
        sessions.delete(session.id);
      }
    }, LOGIN_RETAIN_MS);
    drop.unref?.();
    return true;
  }

  /**
   * Whether a step that awaited may still move this session.
   *
   * @param {LoginSession} session
   */
  function stillRunning(session) {
    return !isTerminal(session.state) && !session.stopping;
  }

  /**
   * Take the per-provider switch lock, retrying briefly: the lock covers
   * only the list-writing steps, never the wait for the user.
   *
   * @param {LoginProvider} provider
   * @returns {Promise<boolean>}
   */
  async function takeSwitchLock(provider) {
    for (let attempt = 0; attempt <= LOCK_RETRY_LIMIT; attempt += 1) {
      if (acquireLock(provider)) {
        return true;
      }
      if (attempt < LOCK_RETRY_LIMIT) {
        await sleep(LOCK_RETRY_MS);
      }
    }
    return false;
  }

  /**
   * Run a named tool through the launchd-safe lookup.
   *
   * @param {string} name
   * @param {string[]} args
   * @returns {Promise<CommandResult>}
   */
  async function runTool(name, args) {
    const bin = resolveBin(name);
    if (!bin) {
      return {
        code: 127,
        stdout: '',
        stderr: '',
        not_found: true,
        timed_out: false
      };
    }
    return run(bin, args, { timeout_ms: TOOL_TIMEOUT_MS });
  }

  // ---- Codex ---------------------------------------------------------------

  /**
   * Remove the pid record (only once the process is gone, so a survivor
   * stays findable by the startup sweep) and the temp home.
   *
   * @param {LoginSession} session
   * @param {boolean} process_gone
   * @returns {Promise<boolean>} Whether the temp home is gone.
   */
  async function codexCleanup(session, process_gone) {
    if (process_gone && session.pid_record) {
      const pending = session.pid_record;
      session.pid_record = null;
      await pending.catch(() => {});
      await files.removePidRecord(session.id).catch(() => {});
    }
    if (session.home) {
      try {
        await files.removeTempHome(session.home);
        session.home = null;
      } catch {
        return false;
      }
    }
    return true;
  }

  /**
   * @param {LoginSession} session
   * @param {number} ms
   * @returns {Promise<boolean>} Whether the child exited within `ms`.
   */
  function waitExit(session, ms) {
    if (session.exited) {
      return Promise.resolve(true);
    }
    return Promise.race([
      session.exit_promise.then(() => true),
      sleep(ms).then(() => session.exited)
    ]);
  }

  /**
   * Codex stop: SIGTERM to the child's process group, SIGKILL after five
   * seconds if it is still alive, then the temp home goes.
   *
   * @param {LoginSession} session
   * @returns {Promise<boolean>} Whether nothing was left behind.
   */
  async function stopCodex(session) {
    let gone = true;
    if (session.child && !session.exited && typeof session.pid === 'number') {
      killGroup(session.pid, 'SIGTERM');
      gone = await waitExit(session, STOP_GRACE_MS);
      if (!gone) {
        killGroup(session.pid, 'SIGKILL');
        gone = await waitExit(session, KILL_CONFIRM_MS);
      }
    }
    const cleaned = await codexCleanup(session, gone);
    return gone && cleaned;
  }

  /**
   * @param {LoginSession} session
   */
  function onCodexOutput(session) {
    if (session.state !== 'starting' || session.stopping) {
      return;
    }
    const found = deviceCodeOf(session.output);
    if (!found) {
      return;
    }
    session.state = 'awaiting_user';
    session.url = found.url;
    session.user_code = found.user_code;
    clearDeadline(session);
    log('login %s codex awaiting_user', session.id);
  }

  /**
   * @param {LoginSession} session
   */
  async function runCodexLogin(session) {
    const codex_bin = resolveBin('codex');
    if (!codex_bin) {
      finish(session, { state: 'failed', error: 'not_found' });
      return;
    }
    try {
      session.home = await files.createTempHome();
    } catch {
      finish(session, { state: 'failed', error: 'login_failed' });
      return;
    }
    if (!stillRunning(session)) {
      await codexCleanup(session, true);
      return;
    }

    /** @type {LoginChild} */
    let child;
    try {
      child = spawnLogin(codex_bin, ['login', '--device-auth'], {
        shell: false,
        windowsHide: true,
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...env, CODEX_HOME: session.home }
      });
    } catch (error) {
      await codexCleanup(session, true);
      const spawn_error = /** @type {NodeJS.ErrnoException} */ (error);
      finish(session, {
        state: 'failed',
        error: spawn_error.code === 'ENOENT' ? 'not_found' : 'login_failed'
      });
      return;
    }
    session.child = child;
    child.on('exit', () => session.mark_exited());
    child.on('error', (error) => {
      if (typeof child.pid === 'number') {
        return;
      }
      session.mark_exited();
      const spawn_error = /** @type {NodeJS.ErrnoException} */ (error);
      void onCodexSpawnFailed(
        session,
        spawn_error.code === 'ENOENT' ? 'not_found' : 'login_failed'
      );
    });
    child.on('close', (code) => {
      session.mark_exited();
      void onCodexClose(session, code);
    });
    if (typeof child.pid === 'number') {
      session.pid = child.pid;
      session.pid_record = files
        .writePidRecord(session.id, child.pid)
        .catch(() => {});
    }
    /**
     * @param {unknown} chunk
     */
    const onData = (chunk) => {
      const next = session.output + String(chunk);
      session.output =
        next.length > OUTPUT_MAX ? next.slice(next.length - OUTPUT_MAX) : next;
      onCodexOutput(session);
    };
    child.stdout?.setEncoding?.('utf8');
    child.stdout?.on('data', onData);
    child.stderr?.setEncoding?.('utf8');
    child.stderr?.on('data', onData);
    session.deadline_timer = later(session, CODE_DEADLINE_MS, () => {
      if (session.state === 'starting' && !session.finishing) {
        void stop(session, {
          state: 'failed',
          error: 'device_auth_unavailable'
        });
      }
    });
  }

  /**
   * @param {LoginSession} session
   * @param {string} error
   */
  async function onCodexSpawnFailed(session, error) {
    if (!stillRunning(session) || session.finishing) {
      return;
    }
    session.finishing = true;
    await codexCleanup(session, true);
    finish(session, { state: 'failed', error });
  }

  /**
   * The child ended on its own. A stop procedure already in progress owns
   * the end; otherwise exit 0 moves on to verification.
   *
   * @param {LoginSession} session
   * @param {number|null} code
   */
  async function onCodexClose(session, code) {
    if (!stillRunning(session) || session.finishing) {
      return;
    }
    session.finishing = true;
    if (code === 0) {
      session.state = 'verifying';
      clearDeadline(session);
      log('login %s codex verifying', session.id);
      /** @type {LoginEnd} */
      let end;
      try {
        end = await importCodexLogin(session);
      } catch {
        end = { state: 'failed', error: 'login_failed' };
      }
      await codexCleanup(session, true);
      finish(session, end);
      return;
    }
    const message = lastOutputLine(session.output);
    await codexCleanup(session, true);
    finish(session, { state: 'failed', error: 'login_failed', message });
  }

  /**
   * Verify and store a finished Codex login (§4.2 3-7). Only the import, the
   * global `auth.json` replacement and the list reads around them hold the
   * switch lock.
   *
   * @param {LoginSession} session
   * @returns {Promise<LoginEnd>}
   */
  async function importCodexLogin(session) {
    if (!session.home) {
      return { state: 'failed', error: 'login_incomplete' };
    }
    /** @type {Buffer} */
    let bytes;
    try {
      bytes = await files.readTempAuth(session.home);
    } catch {
      return { state: 'failed', error: 'login_incomplete' };
    }
    const identity = codexIdentityOf(bytes);
    if (!identity) {
      return { state: 'failed', error: 'login_incomplete' };
    }
    if (session.mode === 'relogin' && identity.key !== session.pinned_key) {
      return {
        state: 'failed',
        error: 'identity_mismatch',
        logged_in_email: identity.email
      };
    }
    if (!(await takeSwitchLock('codex'))) {
      return { state: 'failed', error: 'switch_in_flight' };
    }
    try {
      const before = await listAccounts.codex();
      if (!before.ok) {
        return { state: 'failed', error: 'account_list_unavailable' };
      }
      const existed = before.accounts.some(
        (account) => account.key === identity.key
      );
      const is_active = before.active_key === identity.key;
      const imported = await runTool('codex-auth', [
        'import',
        files.tempAuthPath(session.home)
      ]);
      if (imported.not_found) {
        return { state: 'failed', error: 'not_found' };
      }
      if (imported.code !== 0) {
        return {
          state: 'failed',
          error: 'import_failed',
          message: lastOutputLine(`${imported.stdout}\n${imported.stderr}`)
        };
      }
      invalidateUsageCache.codex();
      if (is_active) {
        // `import` leaves the global login alone, and the next switch would
        // back the stale one up over this login (§2), so the same account's
        // new credential replaces it now.
        try {
          await files.replaceActiveAuth(bytes);
        } catch {
          return { state: 'failed', error: 'active_auth_update_failed' };
        }
      }
      const after = await listAccounts.codex();
      const row = after.ok
        ? after.accounts.find((account) => account.key === identity.key)
        : undefined;
      if (!row) {
        return { state: 'failed', error: 'import_unverified' };
      }
      return {
        state: 'done',
        result: {
          outcome: existed ? 'updated' : 'added',
          key: identity.key,
          email: nonEmptyString(row.email) ?? identity.email ?? '',
          number: Number.isInteger(row.number) ? row.number : null
        }
      };
    } finally {
      releaseLock('codex');
    }
  }

  // ---- Claude --------------------------------------------------------------

  /**
   * Whether a window is still there: true, false, or null when tmux cannot
   * tell. A tmux server that is not running holds no window.
   *
   * @param {string} window_id
   * @returns {Promise<boolean|null>}
   */
  async function windowPresent(window_id) {
    const listed = await runTmux(['list-windows', '-a', '-F', '#{window_id}']);
    if (listed.code === 0) {
      return listed.stdout
        .split('\n')
        .some((line) => line.trim() === window_id);
    }
    if (
      /no server running|no current session|error connecting/i.test(
        listed.stderr
      )
    ) {
      return false;
    }
    return null;
  }

  /**
   * Close the login window and confirm within five seconds that it is gone.
   *
   * @param {LoginSession} session
   * @returns {Promise<boolean>}
   */
  async function closeWindow(session) {
    const window_id = session.window_id;
    if (!window_id) {
      return true;
    }
    await runTmux(['kill-window', '-t', window_id]);
    for (let waited = 0; ; waited += GONE_POLL_MS) {
      if ((await windowPresent(window_id)) === false) {
        session.window_id = null;
        return true;
      }
      if (waited >= STOP_GRACE_MS) {
        return false;
      }
      await sleep(GONE_POLL_MS);
    }
  }

  /**
   * The pane's liveness from one `list-panes -a` read: `display-message` on
   * a killed target answers rc 0 with an empty line, so it cannot tell.
   *
   * @param {string} pane_id
   * @returns {Promise<'alive'|'dead'|'gone'|'unknown'>}
   */
  async function paneState(pane_id) {
    const listed = await runTmux([
      'list-panes',
      '-a',
      '-F',
      '#{pane_id} #{pane_dead}'
    ]);
    if (listed.code !== 0) {
      return /no server running|error connecting/i.test(listed.stderr)
        ? 'gone'
        : 'unknown';
    }
    for (const line of listed.stdout.split('\n')) {
      const [id, dead] = line.trim().split(/\s+/);
      if (id === pane_id) {
        return dead === '1' ? 'dead' : 'alive';
      }
    }
    return 'gone';
  }

  /**
   * Open the login window running a placeholder, so `remain-on-exit` is set
   * before `cswap login` starts: a login that fails at once must still leave
   * its result line to read.
   *
   * @param {string} name
   * @returns {Promise<{ ok: true, window_id: string, pane_id: string } | { ok: false, error: string }>}
   */
  async function openLoginWindow(name) {
    const placeholder = ['/bin/sleep', '60'];
    const format = '#{window_id} #{pane_id}';
    const has = await runTmux(['has-session', '-t', `=${LOGIN_TMUX_SESSION}`]);
    if (has.not_found) {
      return { ok: false, error: 'not_found' };
    }
    const newWindow = () =>
      runTmux([
        'new-window',
        '-d',
        '-t',
        `=${LOGIN_TMUX_SESSION}:`,
        '-n',
        name,
        '-P',
        '-F',
        format,
        ...placeholder
      ]);
    let created =
      has.code === 0
        ? await newWindow()
        : await runTmux([
            'new-session',
            '-d',
            '-s',
            LOGIN_TMUX_SESSION,
            '-n',
            name,
            '-x',
            LOGIN_WINDOW_COLUMNS,
            '-y',
            LOGIN_WINDOW_ROWS,
            '-P',
            '-F',
            format,
            ...placeholder
          ]);
    if (created.code !== 0 && has.code !== 0) {
      // Another caller created the session between the two reads.
      created = await newWindow();
    }
    const [window_id, pane_id] = created.stdout.trim().split(/\s+/);
    if (
      created.code !== 0 ||
      !/^@\d+$/.test(window_id || '') ||
      !/^%\d+$/.test(pane_id || '')
    ) {
      return { ok: false, error: 'tmux_failed' };
    }
    return { ok: true, window_id, pane_id };
  }

  /**
   * @param {LoginSession} session
   * @param {string} cswap_path
   * @returns {Promise<boolean>}
   */
  async function startCswapInWindow(session, cswap_path) {
    const window_id = /** @type {string} */ (session.window_id);
    const pane_id = /** @type {string} */ (session.pane_id);
    await runTmux([
      'resize-window',
      '-t',
      window_id,
      '-x',
      LOGIN_WINDOW_COLUMNS,
      '-y',
      LOGIN_WINDOW_ROWS
    ]);
    const kept = await runTmux([
      'set-option',
      '-w',
      '-t',
      window_id,
      'remain-on-exit',
      'on'
    ]);
    if (kept.code !== 0) {
      return false;
    }
    const started = await runTmux([
      'respawn-pane',
      '-k',
      '-t',
      pane_id,
      ...claudeLoginArgv(cswap_path, session, env)
    ]);
    return started.code === 0;
  }

  /**
   * @param {LoginSession} session
   */
  async function runClaudeLogin(session) {
    const cswap_path = resolveCswap();
    if (!cswap_path) {
      finish(session, { state: 'failed', error: 'not_found' });
      return;
    }
    const opened = await openLoginWindow(
      `login-claude-${session.id.replace(/[^A-Za-z0-9]/g, '').slice(0, 8)}`
    );
    if (!opened.ok) {
      finish(session, { state: 'failed', error: opened.error });
      return;
    }
    session.window_id = opened.window_id;
    session.pane_id = opened.pane_id;
    if (!stillRunning(session)) {
      await closeWindow(session);
      return;
    }
    if (!(await startCswapInWindow(session, cswap_path))) {
      await stop(session, { state: 'failed', error: 'tmux_failed' });
      return;
    }
    if (!stillRunning(session)) {
      return;
    }
    session.deadline_timer = later(session, CODE_DEADLINE_MS, () => {
      if (session.state === 'starting' && !session.finishing) {
        void stop(session, { state: 'failed', error: 'login_url_missing' });
      }
    });
    later(session, POLL_MS, () => void pollClaude(session));
  }

  /**
   * One poll of the login pane: a dead pane is collected, a live one in
   * `starting` is searched for the login URL.
   *
   * @param {LoginSession} session
   */
  async function pollClaude(session) {
    if (!stillRunning(session) || session.finishing) {
      return;
    }
    const pane = await paneState(/** @type {string} */ (session.pane_id));
    if (!stillRunning(session) || session.finishing) {
      return;
    }
    if (pane === 'dead') {
      await collectClaudeLogin(session);
      return;
    }
    if (pane === 'gone') {
      session.window_id = null;
      finish(session, { state: 'failed', error: 'login_incomplete' });
      return;
    }
    if (pane === 'alive' && session.state === 'starting') {
      const captured = await runTmux([
        'capture-pane',
        '-p',
        '-J',
        '-S',
        '-',
        '-t',
        /** @type {string} */ (session.pane_id)
      ]);
      const url = captured.code === 0 ? loginUrlOf(captured.stdout) : null;
      if (url && session.state === 'starting' && stillRunning(session)) {
        session.state = 'awaiting_user';
        session.url = url;
        clearDeadline(session);
        log('login %s claude awaiting_user', session.id);
      }
    }
    if (stillRunning(session) && !session.finishing) {
      later(session, POLL_MS, () => void pollClaude(session));
    }
  }

  /**
   * The pane died: read its whole scrollback for the result line, THEN close
   * the window (the scrollback holds the pasted code), then settle.
   *
   * @param {LoginSession} session
   */
  async function collectClaudeLogin(session) {
    session.finishing = true;
    clearTimers(session);
    const captured = await runTmux([
      'capture-pane',
      '-p',
      '-J',
      '-S',
      '-',
      '-t',
      /** @type {string} */ (session.pane_id)
    ]);
    const line = captured.code === 0 ? lastJsonObjectOf(captured.stdout) : null;
    const closed = await closeWindow(session);
    /** @type {LoginEnd} */
    let end;
    try {
      end = await settleClaudeLogin(line);
    } catch {
      end = { state: 'failed', error: 'login_failed' };
    }
    finish(
      session,
      closed ? end : { state: 'failed', error: 'cleanup_incomplete' }
    );
  }

  /**
   * Turn the `cswap login --json` result line into the session's end. cswap
   * already stored the login under its own file lock; the switch lock here
   * covers only the cache drop and the list re-read.
   *
   * @param {Record<string, any>|null} line
   * @returns {Promise<LoginEnd>}
   */
  async function settleClaudeLogin(line) {
    if (!line) {
      return { state: 'failed', error: 'login_incomplete' };
    }
    if (line.ok !== true) {
      const code = nonEmptyString(line.error);
      return {
        state: 'failed',
        error:
          code && /^[a-z][a-z0-9_]{0,63}$/.test(code) ? code : 'login_failed',
        message: typeof line.message === 'string' ? line.message : null
      };
    }
    const email = nonEmptyString(line.email);
    if (
      (line.outcome !== 'updated' && line.outcome !== 'added') ||
      !email ||
      !Number.isInteger(line.number) ||
      line.number <= 0
    ) {
      return { state: 'failed', error: 'invalid_output' };
    }
    if (!(await takeSwitchLock('claude'))) {
      return { state: 'failed', error: 'switch_in_flight' };
    }
    try {
      invalidateUsageCache.claude();
      await listAccounts.claude();
    } finally {
      releaseLock('claude');
    }
    return {
      state: 'done',
      result: { outcome: line.outcome, key: email, email, number: line.number }
    };
  }

  // ---- Lifecycle -----------------------------------------------------------

  /**
   * The stop procedure (§4.1), shared by cancel, expiry and a failed start.
   * The provider slot stays held until it resolves, because only then is it
   * known whether anything was left behind.
   *
   * @param {LoginSession} session
   * @param {LoginEnd} end
   * @returns {Promise<void>}
   */
  function stop(session, end) {
    if (session.stopping) {
      return session.stopping;
    }
    if (isTerminal(session.state)) {
      return Promise.resolve();
    }
    clearTimers(session);
    /** @type {() => void} */
    let stopped = () => {};
    // Marked BEFORE the procedure runs: a child close the first signal
    // causes must already see the stop and leave the end to it.
    session.stopping = new Promise((resolve) => {
      stopped = () => resolve(undefined);
    });
    void (async () => {
      let clean = false;
      try {
        clean =
          session.provider === 'codex'
            ? await stopCodex(session)
            : await closeWindow(session);
      } catch {
        clean = false;
      }
      finish(
        session,
        clean ? end : { state: 'failed', error: 'cleanup_incomplete' }
      );
      stopped();
    })();
    return session.stopping;
  }

  /**
   * @param {LoginSession} session
   */
  function expire(session) {
    if (!stillRunning(session) || session.finishing) {
      return;
    }
    void stop(session, { state: 'expired' });
  }

  /**
   * @param {{ provider: LoginProvider, mode: LoginMode, number: number|null }} input
   * @returns {LoginSession}
   */
  function newSession(input) {
    /** @type {() => void} */
    let mark = () => {};
    const exit_promise = new Promise((resolve) => {
      mark = () => resolve(undefined);
    });
    /** @type {LoginSession} */
    const session = {
      id: randomId(),
      provider: input.provider,
      mode: input.mode,
      number: input.number,
      pinned_key: null,
      state: 'starting',
      url: null,
      user_code: null,
      code_sent: false,
      result: null,
      error: null,
      message: null,
      logged_in_email: null,
      stopping: null,
      finishing: false,
      timers: new Set(),
      deadline_timer: null,
      child: null,
      pid: null,
      pid_record: null,
      exited: false,
      exit_promise: /** @type {Promise<void>} */ (exit_promise),
      mark_exited: () => {
        session.exited = true;
        mark();
      },
      home: null,
      output: '',
      window_id: null,
      pane_id: null
    };
    return session;
  }

  /**
   * @param {LoginSession} session
   */
  function discard(session) {
    clearTimers(session);
    sessions.delete(session.id);
    if (in_progress.get(session.provider) === session) {
      in_progress.delete(session.provider);
    }
  }

  /**
   * Start a login. `relogin` re-reads the account list and pins the target
   * row's key before anything runs.
   *
   * @param {unknown} input - `{ provider, mode, number? }`.
   * @returns {Promise<{ ok: true, login_id: string } | { ok: false, error: string, login_id?: string }>}
   */
  async function start(input) {
    const body = isRecord(input) ? input : {};
    if (body.provider !== 'claude' && body.provider !== 'codex') {
      return { ok: false, error: 'invalid_provider' };
    }
    /** @type {LoginProvider} */
    const provider = body.provider;
    if (body.mode !== 'relogin' && body.mode !== 'add') {
      return { ok: false, error: 'invalid_mode' };
    }
    /** @type {LoginMode} */
    const mode = body.mode;
    /** @type {number|null} */
    let number = null;
    if (mode === 'relogin') {
      if (!Number.isInteger(body.number) || body.number <= 0) {
        return { ok: false, error: 'invalid_number' };
      }
      number = body.number;
    }
    if (startup_cleanup) {
      await startup_cleanup.catch(() => {});
    }
    const running = in_progress.get(provider);
    if (running) {
      return { ok: false, error: 'login_in_flight', login_id: running.id };
    }
    // Reserved before the first await, so two starts cannot both pass.
    const session = newSession({ provider, mode, number });
    sessions.set(session.id, session);
    in_progress.set(provider, session);

    if (mode === 'relogin') {
      /** @type {AccountListRead} */
      let listed;
      try {
        listed = await listAccounts[provider]();
      } catch {
        listed = { ok: false, error: 'account_list_unavailable' };
      }
      if (!listed.ok) {
        discard(session);
        return { ok: false, error: 'account_list_unavailable' };
      }
      const row = listed.accounts.find((account) => account.number === number);
      if (!row) {
        discard(session);
        return { ok: false, error: 'account_not_found' };
      }
      session.pinned_key = row.key;
    }
    if (!stillRunning(session)) {
      return { ok: true, login_id: session.id };
    }
    later(session, LOGIN_TIMEOUT_MS, () => expire(session));
    log('login %s %s started (%s)', session.id, provider, mode);
    const flow = provider === 'codex' ? runCodexLogin : runClaudeLogin;
    void flow(session).catch(() => {
      void stop(session, { state: 'failed', error: 'login_failed' });
    });
    return { ok: true, login_id: session.id };
  }

  /**
   * The client view of one session, or null when it is unknown or dropped.
   *
   * @param {string} login_id
   */
  function status(login_id) {
    const session = sessions.get(login_id);
    if (!session) {
      return null;
    }
    return {
      ok: /** @type {const} */ (true),
      login_id: session.id,
      provider: session.provider,
      mode: session.mode,
      number: session.number,
      state: session.state,
      url: session.url,
      user_code: session.user_code,
      needs_code:
        session.provider === 'claude' &&
        session.state === 'awaiting_user' &&
        !session.code_sent,
      result: session.result,
      error: session.error,
      message: session.message,
      logged_in_email: session.logged_in_email
    };
  }

  /**
   * Type the pasted Claude code into the login pane, once, and only while
   * the login waits for it. The once flag is set before tmux is called.
   *
   * @param {string} login_id
   * @param {unknown} raw_code
   * @returns {Promise<{ ok: true, state: LoginState } | { ok: false, error: string }>}
   */
  async function submitCode(login_id, raw_code) {
    const session = sessions.get(login_id);
    if (!session) {
      return { ok: false, error: 'login_not_found' };
    }
    if (session.provider !== 'claude') {
      return { ok: false, error: 'code_not_supported' };
    }
    if (session.code_sent) {
      return { ok: false, error: 'code_already_sent' };
    }
    if (
      session.state !== 'awaiting_user' ||
      session.stopping ||
      session.finishing
    ) {
      return { ok: false, error: 'not_awaiting_code' };
    }
    const code = typeof raw_code === 'string' ? raw_code.trim() : raw_code;
    if (!isLoginCode(code)) {
      return { ok: false, error: 'invalid_code' };
    }
    session.code_sent = true;
    const pane_id = /** @type {string} */ (session.pane_id);
    const typed = await runTmux(['send-keys', '-t', pane_id, '-l', '--', code]);
    if (typed.code !== 0) {
      return { ok: false, error: 'code_send_failed' };
    }
    const entered = await runTmux(['send-keys', '-t', pane_id, 'Enter']);
    if (entered.code !== 0) {
      return { ok: false, error: 'code_send_failed' };
    }
    if (session.state === 'awaiting_user' && stillRunning(session)) {
      session.state = 'verifying';
      log('login %s claude verifying', session.id);
    }
    return { ok: true, state: session.state };
  }

  /**
   * Cancel a login through the stop procedure. An ended session answers with
   * its end; one whose server-side finish already runs is refused.
   *
   * @param {string} login_id
   * @returns {Promise<{ ok: true, state: LoginState, error: string|null } | { ok: false, error: string, state?: LoginState }>}
   */
  async function cancel(login_id) {
    const session = sessions.get(login_id);
    if (!session) {
      return { ok: false, error: 'login_not_found' };
    }
    if (!isTerminal(session.state)) {
      if (session.finishing && !session.stopping) {
        return { ok: false, error: 'login_finishing', state: session.state };
      }
      await stop(session, { state: 'cancelled' });
    }
    return { ok: true, state: session.state, error: session.error };
  }

  /**
   * The startup sweep (§4.1): close the whole `bdui-login` tmux session,
   * stop only recorded process groups whose command line is `codex login`,
   * and delete every leftover temp home. Runs once; a start waits for it.
   *
   * @returns {Promise<{ tmux_session_closed: boolean, stopped_groups: number, removed_records: number, removed_homes: number }>}
   */
  function cleanupStale() {
    if (!startup_cleanup) {
      startup_cleanup = sweep();
    }
    return /** @type {Promise<any>} */ (startup_cleanup);
  }

  async function sweep() {
    const summary = {
      tmux_session_closed: false,
      stopped_groups: 0,
      removed_records: 0,
      removed_homes: 0
    };
    try {
      const closed = await runTmux([
        'kill-session',
        '-t',
        `=${LOGIN_TMUX_SESSION}`
      ]);
      summary.tmux_session_closed = closed.code === 0;
    } catch {
      // No tmux, or no such session: nothing to close.
    }
    /** @type {Array<{ login_id: string, pid: number|null }>} */
    let records = [];
    try {
      records = await files.readPidRecords();
    } catch {
      records = [];
    }
    for (const record of records) {
      if (record.pid !== null && (await isCodexLogin(record.pid))) {
        await stopGroup(record.pid);
        summary.stopped_groups += 1;
      }
      try {
        await files.removePidRecord(record.login_id);
        summary.removed_records += 1;
      } catch {
        // A record that stays is retried next start.
      }
    }
    try {
      summary.removed_homes = await files.removeTempHomes();
    } catch {
      summary.removed_homes = 0;
    }
    return summary;
  }

  /**
   * Whether `pid` is still a `codex login` — a recycled pid is never
   * signalled.
   *
   * @param {number} pid
   */
  async function isCodexLogin(pid) {
    try {
      const listed = await run(
        '/bin/ps',
        ['-o', 'command=', '-p', String(pid)],
        {
          timeout_ms: PS_TIMEOUT_MS
        }
      );
      return listed.code === 0 && listed.stdout.includes('codex login');
    } catch {
      return false;
    }
  }

  /**
   * SIGTERM a leftover group, then SIGKILL it if it outlives the grace.
   *
   * @param {number} pid
   */
  async function stopGroup(pid) {
    killGroup(pid, 'SIGTERM');
    for (let waited = 0; waited < STOP_GRACE_MS; waited += GONE_POLL_MS) {
      if (!processAlive(pid)) {
        return;
      }
      await sleep(GONE_POLL_MS);
    }
    if (processAlive(pid)) {
      killGroup(pid, 'SIGKILL');
    }
  }

  return { start, status, submitCode, cancel, cleanupStale };
}

/** @typedef {ReturnType<typeof createAccountLoginManager>} AccountLoginManager */

/** @type {AccountLoginManager|null} */
let MANAGER = null;

/**
 * The process-wide login manager the routes and the startup sweep share.
 * Building it touches nothing: no file, process or timer.
 *
 * @returns {AccountLoginManager}
 */
export function accountLoginManager() {
  if (!MANAGER) {
    MANAGER = createAccountLoginManager();
  }
  return MANAGER;
}

/**
 * The startup sweep of the shared manager. Only the server entry calls it,
 * once after `listen`, so a test or a module import never closes a real tmux
 * session or signals a real process.
 */
export function cleanupStaleLogins() {
  return accountLoginManager().cleanupStale();
}

/** @type {Record<string, number>} */
const ERROR_STATUS = {
  invalid_provider: 400,
  invalid_mode: 400,
  invalid_number: 400,
  invalid_code: 400,
  code_not_supported: 400,
  login_not_found: 404,
  account_not_found: 404,
  login_in_flight: 409,
  code_already_sent: 409,
  not_awaiting_code: 409,
  login_finishing: 409,
  code_send_failed: 502,
  account_list_unavailable: 503
};

/**
 * @param {Response} res
 * @param {{ ok: boolean, error?: string|null }} body
 */
function respond(res, body) {
  res.set('Cache-Control', 'no-store');
  const status = body.ok ? 200 : (ERROR_STATUS[body.error || ''] ?? 500);
  res.status(status).json(body);
}

/**
 * The Express handlers over a login manager. The getter resolves the manager
 * per request, so the shared one is built on first use.
 *
 * @param {() => AccountLoginManager} getManager
 * @returns {{ start: RequestHandler, status: RequestHandler, code: RequestHandler, cancel: RequestHandler }}
 */
export function createAccountLoginHandlers(getManager) {
  return {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    async start(req, res) {
      respond(res, await getManager().start(req.body));
    },
    /**
     * @param {Request} req
     * @param {Response} res
     */
    status(req, res) {
      const snapshot = getManager().status(String(req.params.id));
      respond(res, snapshot || { ok: false, error: 'login_not_found' });
    },
    /**
     * @param {Request} req
     * @param {Response} res
     */
    async code(req, res) {
      const body = isRecord(req.body) ? req.body : {};
      respond(
        res,
        await getManager().submitCode(String(req.params.id), body.code)
      );
    },
    /**
     * @param {Request} req
     * @param {Response} res
     */
    async cancel(req, res) {
      respond(res, await getManager().cancel(String(req.params.id)));
    }
  };
}

const default_handlers = createAccountLoginHandlers(accountLoginManager);

export const accountLoginStartHandler = default_handlers.start;
export const accountLoginStatusHandler = default_handlers.status;
export const accountLoginCodeHandler = default_handlers.code;
export const accountLoginCancelHandler = default_handlers.cancel;

/** Test-only: drop the shared manager. */
export function __resetAccountLoginForTest() {
  MANAGER = null;
}
