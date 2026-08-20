import { spawn } from 'node:child_process';
import {
  recordBdProtocolObservation,
  resolveBdWorkspaceIdentity
} from './bd-capability.js';
import {
  BD_EXIT_ERROR,
  BD_JSON_INVALID,
  BD_JSON_SHAPE_INVALID,
  bdJsonFailure,
  describeJsonType,
  normalizeBdComments,
  normalizeBdConfigMap,
  normalizeBdDependencyRows,
  normalizeBdIssue,
  normalizeBdIssueList,
  normalizeBdJsonTransport,
  normalizeBdReadyExplain,
  normalizeBdReadyRows,
  normalizeBdVersionCapability
} from './bd-json.js';
import { resolveDbPath } from './db.js';
import { debug } from './logging.js';

/**
 * @import { BdJsonError, BdProtocol } from './bd-json.js'
 */

/**
 * Result of {@link runBdJson}: exactly one of the two discriminated shapes.
 *
 * @typedef {{ ok: true, data: unknown, protocol: BdProtocol } | { ok: false, error: BdJsonError }} BdJsonResult
 */

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
 * @returns {Promise<{ code: number, stdout: string, stderr: string, timed_out?: boolean }>}
 */
export function runBd(args, options = {}) {
  return withBdRunQueue(async () => runBdUnlocked(args, options));
}

/**
 * Run the `bd` CLI with provided arguments without queueing.
 *
 * @param {string[]} args
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number, sandbox?: boolean }} [options]
 * @returns {Promise<{ code: number, stdout: string, stderr: string, timed_out?: boolean }>}
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
    let timed_out = false;
    if (options.timeout_ms && options.timeout_ms > 0) {
      timer = setTimeout(() => {
        timed_out = true;
        child.kill('SIGKILL');
      }, options.timeout_ms);
      timer.unref?.();
    }

    /**
     * A killed child closes with a null exit code, which `Number(code || 0)`
     * would read as a clean 0. Every caller checks `code`, so the timeout is
     * normalized to a non-zero exit HERE rather than at one boundary: a probe
     * or a `kv` read must not see a timed-out run as an empty success.
     *
     * @param {number | string | null} code
     */
    const finish = (code) => {
      if (timer) {
        clearTimeout(timer);
      }
      const exit_code = Number(code || 0);
      resolve({
        code: timed_out && exit_code === 0 ? 124 : exit_code,
        stdout: out_chunks.join(''),
        stderr: err_chunks.join(''),
        timed_out
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
 * Run `bd` with a JSON flag and normalize the transport envelope.
 *
 * The result is discriminated: a JSON protocol failure is never a success, even
 * when bd exited 0.
 *
 * @param {string[]} args - Must include flags that cause JSON to be printed (e.g., `--json`).
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number, sandbox?: boolean, command_family?: string }} [options]
 * @returns {Promise<BdJsonResult>}
 */
export async function runBdJson(args, options = {}) {
  const command_family = options.command_family || bdCommandFamily(args);
  const result = await runBd(args, options);

  if (result.timed_out === true) {
    log('bd timed out (args=%o)', args);
    return bdJsonFailure(
      BD_EXIT_ERROR,
      'bd did not finish before its timeout',
      {
        command_family,
        timed_out: true,
        exit_code: result.code
      }
    );
  }

  if (result.code !== 0) {
    log(
      'bd exited with code %d (args=%o) stderr=%s',
      result.code,
      args,
      result.stderr
    );
    return bdJsonFailure(
      BD_EXIT_ERROR,
      stderrTail(result.stderr) || `bd exited with code ${result.code}`,
      { command_family, exit_code: result.code }
    );
  }

  /** @type {unknown} */
  let parsed;
  try {
    parsed = JSON.parse(result.stdout || 'null');
  } catch (err) {
    log('bd returned invalid JSON (args=%o): %o', args, err);
    return bdJsonFailure(BD_JSON_INVALID, 'bd returned invalid JSON', {
      command_family
    });
  }

  const transport = normalizeBdJsonTransport(parsed);
  if (!transport.ok) {
    log('bd JSON transport rejected (args=%o): %s', args, transport.error.code);
    return transport;
  }

  return { ok: true, data: transport.data, protocol: transport.protocol };
}

/**
 * Command family to typed projector. The family a caller declares IS the shape
 * contract it gets, which is what keeps `docs/bd-json-compatibility.md` and the
 * code from drifting apart.
 *
 * @type {Record<string, (value: unknown, options: { expected_id?: string, expected_issue_id?: string }) => { ok: true, data: any } | { ok: false, error: BdJsonError }>}
 */
const BD_PROJECTORS = {
  list: (value) => normalizeBdIssueList(value),
  show: (value, options) =>
    normalizeBdIssue(value, { expected_id: options.expected_id }),
  ready: (value) => normalizeBdReadyRows(value),
  'ready-explain': (value) => normalizeBdReadyExplain(value),
  config: (value) => normalizeBdConfigMap(value),
  dep: (value) => normalizeBdDependencyRows(value),
  comments: (value, options) =>
    normalizeBdComments(value, {
      expected_issue_id: options.expected_issue_id
    }),
  version: (value) => normalizeBdVersionCapability(value)
};

/**
 * Run `bd` with a JSON flag, project the payload for its command family, and
 * record the observation.
 *
 * This is the single owner of protocol observation: both the transport result
 * and the typed projection result are recorded before the value reaches a
 * consumer, so a shape failure cannot stay invisible to `/healthz` or to the
 * workspace's effect preflight.
 *
 * @param {string} command_family - A key of the projector table.
 * @param {string[]} args
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number, sandbox?: boolean, expected_id?: string, expected_issue_id?: string }} [options]
 * @returns {Promise<{ ok: true, data: any, protocol: BdProtocol } | { ok: false, error: BdJsonError }>}
 */
export async function runBdJsonProjected(command_family, args, options = {}) {
  const projector = BD_PROJECTORS[command_family];
  if (projector === undefined) {
    return bdJsonFailure(
      BD_JSON_SHAPE_INVALID,
      `no typed projector is declared for the ${command_family} command family`,
      { command_family }
    );
  }

  const workspace_key = observationWorkspaceKey(command_family, options.cwd);
  const transport = await runBdJson(args, { ...options, command_family });

  if (transport.ok !== true) {
    recordBdProtocolObservation({
      workspace_key,
      command_family,
      result: transport
    });
    return transport;
  }

  const projected = projector(transport.data, options);
  recordBdProtocolObservation({
    workspace_key,
    command_family,
    result: projected
  });
  if (!projected.ok) {
    return { ok: false, error: projected.error };
  }

  return { ok: true, data: projected.data, protocol: transport.protocol };
}

/**
 * Resolve the observation scope for a call.
 *
 * `version` describes the binary rather than a workspace, so it is recorded
 * process-wide; everything else is scoped to the workspace it read.
 *
 * @param {string} command_family
 * @param {string} [cwd]
 * @returns {string | undefined}
 */
function observationWorkspaceKey(command_family, cwd) {
  if (command_family === 'version') {
    return undefined;
  }
  const identity = resolveBdWorkspaceIdentity({
    root_dir: cwd || process.cwd()
  });
  return identity.ok ? identity.data.workspace_key : undefined;
}

/**
 * Derive a bounded command family label from bd arguments, for diagnostics.
 *
 * @param {string[]} args
 * @returns {string}
 */
function bdCommandFamily(args) {
  for (const arg of args) {
    if (!arg.startsWith('-')) {
      return arg;
    }
  }
  return 'unknown';
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
  const workspace_key = observationWorkspaceKey('kv', options.cwd);

  /**
   * Record the protocol observation and return the failure.
   *
   * @param {{ ok: false, error: BdJsonError }} failure
   * @returns {KvGetResult}
   */
  const protocolFailure = (failure) => {
    log('bd kv get protocol failure (key=%s): %s', key, failure.error.code);
    recordBdProtocolObservation({
      workspace_key,
      command_family: 'kv',
      result: failure
    });
    return { ok: false, error: failure.error.code };
  };

  // The transport envelope is stripped BEFORE the exit code is judged: under
  // `BD_JSON_ENVELOPE=1` the `{found,value}` record sits inside `data`, and
  // reading `found` off the outer object would report a stored key as absent.
  /**
   * An ordinary CLI failure, reported with bd's own message.
   *
   * @returns {KvGetResult}
   */
  const cliFailure = () => ({
    ok: false,
    error: stderrTail(result.stderr) || `bd kv get exited ${result.code}`
  });

  /** @type {unknown} */
  let payload;
  try {
    payload = JSON.parse(result.stdout || 'null');
  } catch {
    // Order matters: bd that already failed is an ordinary CLI failure whose
    // message the caller needs. Only garbage printed on a SUCCESSFUL run is a
    // protocol fault, and neither is ever "the key is absent" — bd reports
    // absence with a well-formed `{found: false}` record.
    if (result.code !== 0) {
      return cliFailure();
    }
    return protocolFailure(
      bdJsonFailure(BD_JSON_INVALID, 'bd kv get returned invalid JSON', {
        command_family: 'kv'
      })
    );
  }

  const transport = normalizeBdJsonTransport(payload);
  if (!transport.ok) {
    return protocolFailure(transport);
  }

  const record =
    transport.data &&
    typeof transport.data === 'object' &&
    !Array.isArray(transport.data)
      ? /** @type {Record<string, unknown>} */ (transport.data)
      : null;
  if (record === null || typeof record.found !== 'boolean') {
    if (result.code !== 0) {
      return cliFailure();
    }
    // A payload without a boolean `found` on a successful run is a shape this
    // consumer does not understand; softening it to absent would hide a stored
    // value.
    return protocolFailure(
      bdJsonFailure(
        BD_JSON_SHAPE_INVALID,
        'bd kv get payload has no boolean found flag',
        {
          command_family: 'kv',
          expected: 'boolean found',
          actual: describeJsonType(
            record === null ? transport.data : record.found
          )
        }
      )
    );
  }

  recordBdProtocolObservation({
    workspace_key,
    command_family: 'kv',
    result: { ok: true }
  });

  // An ABSENT key is a successful read of "no layer": bd prints a valid
  // `{found: false}` record but exits 1, so the record is authoritative over
  // the exit code here.
  if (record.found === false) {
    return { ok: true, value: undefined };
  }
  if (result.code !== 0) {
    return cliFailure();
  }

  const raw_value = record.value;
  if (typeof raw_value !== 'string' || raw_value.length === 0) {
    return { ok: true, value: undefined };
  }
  // From here the record itself is well formed; only its stored VALUE can be
  // unusable, which is the one case the workspace-defaults layer skips with a
  // warning rather than failing the read.
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
