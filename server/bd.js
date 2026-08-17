import { spawn } from 'node:child_process';
import { resolveDbPath } from './db.js';
import { debug } from './logging.js';

const log = debug('bd');
/** @type {Promise<void>} */
let bd_run_queue = Promise.resolve();

/**
 * Get the git user name from git config.
 *
 * @param {{ cwd?: string }} [options]
 * @returns {Promise<string>}
 */
export async function getGitUserName(options = {}) {
  return new Promise((resolve) => {
    const child = spawn('git', ['config', 'user.name'], {
      cwd: options.cwd || process.cwd(),
      shell: false,
      windowsHide: true
    });

    /** @type {string[]} */
    const chunks = [];

    if (child.stdout) {
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (chunk) => chunks.push(String(chunk)));
    }

    child.on('error', () => resolve(''));
    child.on('close', (code) => {
      if (code !== 0) {
        resolve('');
        return;
      }
      resolve(chunks.join('').trim());
    });
  });
}

/**
 * Resolve the bd executable path.
 *
 * @returns {string}
 */
export function getBdBin() {
  const env_value = process.env.BD_BIN;
  if (env_value && env_value.length > 0) {
    return env_value;
  }
  return 'bd';
}

/**
 * Run the `bd` CLI with provided arguments.
 * Shell is not used to avoid injection; args must be pre-split.
 *
 * @param {string[]} args - Arguments to pass (e.g., ["list", "--json"]).
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number, sandbox?: boolean }} [options]
 * @returns {Promise<{ code: number, stdout: string, stderr: string }>}
 */
export function runBd(args, options = {}) {
  return withBdRunQueue(async () => runBdUnlocked(args, options));
}

/**
 * Run the `bd` CLI with provided arguments without queueing.
 *
 * @param {string[]} args
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number, sandbox?: boolean }} [options]
 * @returns {Promise<{ code: number, stdout: string, stderr: string }>}
 */
function runBdUnlocked(args, options = {}) {
  const bin = getBdBin();

  // Set BEADS_DB only when the workspace has a local SQLite DB.
  // Do not force BEADS_DB from global fallback paths; this can override
  // backend autodetection in non-SQLite workspaces (for example Dolt).
  const db_path = resolveDbPath({
    cwd: options.cwd || process.cwd(),
    env: options.env || process.env
  });
  const env_with_db = { ...(options.env || process.env) };
  if (db_path.source === 'nearest' && db_path.exists) {
    env_with_db.BEADS_DB = db_path.path;
  }

  const spawn_opts = {
    cwd: options.cwd || process.cwd(),
    env: env_with_db,
    shell: false,
    windowsHide: true
  };

  /** @type {string[]} */
  const final_args = buildBdArgs(args, options);

  return new Promise((resolve) => {
    const child = spawn(bin, final_args, spawn_opts);

    /** @type {string[]} */
    const out_chunks = [];
    /** @type {string[]} */
    const err_chunks = [];

    if (child.stdout) {
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (chunk) => {
        out_chunks.push(String(chunk));
      });
    }
    if (child.stderr) {
      child.stderr.setEncoding('utf8');
      child.stderr.on('data', (chunk) => {
        err_chunks.push(String(chunk));
      });
    }

    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let timer;
    if (options.timeout_ms && options.timeout_ms > 0) {
      timer = setTimeout(() => {
        child.kill('SIGKILL');
      }, options.timeout_ms);
      timer.unref?.();
    }

    /**
     * @param {number | string | null} code
     */
    const finish = (code) => {
      if (timer) {
        clearTimeout(timer);
      }
      resolve({
        code: Number(code || 0),
        stdout: out_chunks.join(''),
        stderr: err_chunks.join('')
      });
    };

    child.on('error', (err) => {
      // Treat spawn error as an immediate non-zero exit; log for diagnostics.
      log('spawn error running %s %o', bin, err);
      finish(127);
    });
    child.on('close', (code) => {
      finish(code);
    });
  });
}

/**
 * Build final bd CLI arguments.
 * bdui defaults to sandbox mode to avoid sync/autopush overhead on interactive
 * UI requests. Set `BDUI_BD_SANDBOX=0` (or "false") to opt out.
 *
 * @param {string[]} args
 * @param {{ sandbox?: boolean }} [options]
 * @returns {string[]}
 */
function buildBdArgs(args, options = {}) {
  const arg_set = new Set(args);
  if (options.sandbox === false) {
    return args.slice();
  }

  if (options.sandbox === true) {
    if (arg_set.has('--sandbox')) {
      return args.slice();
    }

    return ['--sandbox', ...args];
  }

  const raw_sandbox = String(process.env.BDUI_BD_SANDBOX || '').toLowerCase();
  const sandbox_disabled = raw_sandbox === '0' || raw_sandbox === 'false';
  const should_prepend_sandbox = !sandbox_disabled && !arg_set.has('--sandbox');

  if (!should_prepend_sandbox) {
    return args.slice();
  }

  return ['--sandbox', ...args];
}

/**
 * Serialize `bd` invocations.
 * Dolt embedded mode can crash when multiple `bd` processes run concurrently
 * against the same workspace.
 *
 * @template T
 * @param {() => Promise<T>} operation
 * @returns {Promise<T>}
 */
async function withBdRunQueue(operation) {
  const previous = bd_run_queue;
  /** @type {() => void} */
  let release = () => {};
  bd_run_queue = new Promise((resolve) => {
    release = resolve;
  });

  await previous.catch(() => {});
  try {
    return await operation();
  } finally {
    release();
  }
}

/**
 * Run an arbitrary binary and capture stdout/stderr/exit code.
 *
 * Behavior follows {@link runBd} (no shell, ENOENT normalized to non-zero
 * code), but does not pass through the bd run queue or BEADS_DB env injection.
 * Intended for non-bd binaries such as `git`.
 *
 * @param {string} bin - Binary name or absolute path.
 * @param {string[]} args - Arguments (pre-split, no shell).
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number }} [options]
 * @returns {Promise<{ code: number, stdout: string, stderr: string }>}
 */
export function runShell(bin, args, options = {}) {
  const spawn_opts = {
    cwd: options.cwd || process.cwd(),
    env: options.env || process.env,
    shell: false,
    windowsHide: true,
    detached: process.platform !== 'win32'
  };

  return new Promise((resolve) => {
    const child = spawn(bin, args, spawn_opts);

    /** @type {string[]} */
    const out_chunks = [];
    /** @type {string[]} */
    const err_chunks = [];

    if (child.stdout) {
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (chunk) => {
        out_chunks.push(String(chunk));
      });
    }
    if (child.stderr) {
      child.stderr.setEncoding('utf8');
      child.stderr.on('data', (chunk) => {
        err_chunks.push(String(chunk));
      });
    }

    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let timer;
    let timed_out = false;
    if (options.timeout_ms && options.timeout_ms > 0) {
      timer = setTimeout(() => {
        timed_out = true;
        terminateProcessGroup(child);
      }, options.timeout_ms);
      timer.unref?.();
    }

    let settled = false;
    /**
     * @param {number | string | null} code
     */
    const finish = (code) => {
      if (settled) {
        return;
      }
      settled = true;
      if (timer) {
        clearTimeout(timer);
      }
      resolve({
        code: timed_out ? 124 : Number(code ?? 1),
        stdout: out_chunks.join(''),
        stderr: err_chunks.join('')
      });
    };

    child.on('error', (err) => {
      log('spawn error running %s %o', bin, err);
      finish(127);
    });
    child.on('close', (code) => {
      finish(code);
    });
  });
}

/**
 * Kill a spawned command and every child it created. A timed-out `git fetch`
 * may otherwise leave its transport child alive after the direct child exits.
 *
 * @param {import('node:child_process').ChildProcess} child
 */
function terminateProcessGroup(child) {
  if (process.platform !== 'win32' && typeof child.pid === 'number') {
    try {
      process.kill(-child.pid, 'SIGKILL');
      return;
    } catch {
      // Fall through to the direct child.
    }
  }
  try {
    child.kill('SIGKILL');
  } catch {
    // Completion remains owned by the child close/error event.
  }
}

/**
 * Return the last non-empty line of `text`, truncated to at most 200 chars.
 *
 * Used to surface a single-line summary of stderr/stdout from `runBd` /
 * `runShell` results to clients without leaking large or sensitive output.
 *
 * @param {string | null | undefined} text
 * @returns {string}
 */
export function stderrTail(text) {
  if (!text) return '';
  const lines = String(text).split(/\r?\n/);
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const line = lines[i].trim();
    if (line.length > 0) {
      return line.length > 200 ? line.slice(0, 200) : line;
    }
  }
  return '';
}

/**
 * Run `bd` and parse JSON from stdout if exit code is 0.
 *
 * @param {string[]} args - Must include flags that cause JSON to be printed (e.g., `--json`).
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number }} [options]
 * @returns {Promise<{ code: number, stdoutJson?: unknown, stderr?: string }>}
 */
export async function runBdJson(args, options = {}) {
  const result = await runBd(args, options);
  if (result.code !== 0) {
    log(
      'bd exited with code %d (args=%o) stderr=%s',
      result.code,
      args,
      result.stderr
    );
    return { code: result.code, stderr: result.stderr };
  }
  /** @type {unknown} */
  let parsed;
  try {
    parsed = JSON.parse(result.stdout || 'null');
  } catch (err) {
    log('bd returned invalid JSON (args=%o): %o', args, err);
    return { code: 0, stderr: 'Invalid JSON from bd' };
  }
  return { code: 0, stdoutJson: parsed };
}

/**
 * @typedef {Object} KvGetResult
 * @property {boolean} ok - False only when `bd` itself failed; an absent or
 * unparsable value is a successful read of "no usable layer".
 * @property {Record<string, unknown>|undefined} [value] - The decoded JSON
 * object, or undefined when the key is absent or its value is unusable.
 * @property {string} [warning] - Stable warning code for a present-but-unusable
 * value. The workspace-defaults layer is not an explicit pin, so a broken value
 * is skipped rather than failing the read (spec §A/F).
 * @property {string} [error] - Present when `ok` is false.
 */

/**
 * Read one `bd kv` entry whose value is a JSON object.
 *
 * @param {string} key
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number }} [options]
 * @returns {Promise<KvGetResult>}
 */
export async function kvGetJson(key, options = {}) {
  const result = await runBd(['kv', 'get', key, '--json'], options);
  /** @type {unknown} */
  let envelope;
  try {
    envelope = JSON.parse(result.stdout || 'null');
  } catch {
    envelope = undefined;
  }
  const parsed =
    envelope && typeof envelope === 'object' && !Array.isArray(envelope)
      ? /** @type {Record<string, unknown>} */ (envelope)
      : undefined;
  // An ABSENT key is a successful read of "no layer": bd prints a valid
  // `{found: false}` envelope but exits 1, so the envelope is authoritative
  // over the exit code here.
  if (parsed && parsed.found === false) {
    return { ok: true, value: undefined };
  }
  if (result.code !== 0) {
    return {
      ok: false,
      error: stderrTail(result.stderr) || `bd kv get exited ${result.code}`
    };
  }
  if (!parsed) {
    log('bd kv get returned invalid JSON (key=%s)', key);
    return { ok: true, value: undefined, warning: 'kv_value_unparsable' };
  }
  const record = parsed;
  const raw_value = record.value;
  if (record.found !== true || typeof raw_value !== 'string') {
    return { ok: true, value: undefined };
  }
  if (raw_value.length === 0) {
    return { ok: true, value: undefined };
  }
  /** @type {unknown} */
  let decoded;
  try {
    decoded = JSON.parse(raw_value);
  } catch {
    log('bd kv value is not JSON (key=%s)', key);
    return { ok: true, value: undefined, warning: 'kv_value_unparsable' };
  }
  if (!decoded || typeof decoded !== 'object' || Array.isArray(decoded)) {
    return { ok: true, value: undefined, warning: 'kv_value_unparsable' };
  }
  return { ok: true, value: /** @type {Record<string, unknown>} */ (decoded) };
}

/**
 * Write one `bd kv` entry as a JSON object value.
 *
 * @param {string} key
 * @param {Record<string, unknown>} value
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number }} [options]
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
export async function kvSetJson(key, value, options = {}) {
  const result = await runBd(
    ['kv', 'set', key, JSON.stringify(value)],
    options
  );
  if (result.code !== 0) {
    return {
      ok: false,
      error: stderrTail(result.stderr) || `bd kv set exited ${result.code}`
    };
  }
  return { ok: true };
}

/**
 * Unwrap a `bd show <id> --json` payload to the single issue object. bd emits
 * a single-item array (observed live) or a bare object depending on version;
 * both shapes must normalize before any field access — reading `.metadata` off
 * the array shape silently yields undefined.
 *
 * @param {unknown} value
 * @returns {Record<string, unknown>|null}
 */
export function unwrapShowJson(value) {
  const first = Array.isArray(value) ? value[0] : value;
  return first && typeof first === 'object' && !Array.isArray(first)
    ? /** @type {Record<string, unknown>} */ (first)
    : null;
}
