#!/usr/bin/env node
/**
 * Disposable central-server smoke for the bd JSON compatibility boundary.
 *
 * The whole point is to exercise a REAL bd against a REAL Dolt server in both
 * the default and the `BD_JSON_ENVELOPE=1` mode, without touching this
 * repository's `.beads`, the shared Dolt port, or the operator's config. Every
 * piece of state lives under one `mkdtemp` root that is removed at the end, and
 * bd reaches the server through a temp Unix socket. The installed dolt cannot
 * disable its TCP listener, so it is pinned to loopback on an ephemeral port
 * this process proved free — never the shared bd server port.
 *
 * A preflight that cannot prove that isolation refuses to run: there is no
 * fallback to live state.
 */
import { execFile, spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const READINESS_TIMEOUT_MS = 30_000;
const READINESS_POLL_MS = 200;
const BD_TIMEOUT_MS = 30_000;
const SHUTDOWN_GRACE_MS = 5_000;

/**
 * Environment keys that would leak live state into the smoke.
 */
export const INHERITED_OVERRIDES = [
  'BEADS_DB',
  'BD_JSON_ENVELOPE',
  'BD_SERVER',
  'BD_SERVER_SOCKET',
  'BD_SERVER_PORT',
  'BD_SERVER_HOST',
  'BD_SERVER_USER',
  'BD_SERVER_PASSWORD',
  'BDUI_BD_SANDBOX'
];

/**
 * @typedef {Object} SmokeContext
 * @property {string} temp_root
 * @property {string} workspace
 * @property {string} socket_path
 * @property {Record<string, string>} env
 */

/**
 * Resolve an executable by walking PATH, failing closed when it is absent.
 *
 * @param {string} bin
 * @returns {string}
 */
export function resolveExecutable(bin) {
  if (bin.includes(path.sep)) {
    if (!existsSync(bin)) {
      throw new Error(`${bin} does not exist; the smoke refuses to run`);
    }
    return bin;
  }
  for (const dir of (process.env.PATH || '').split(path.delimiter)) {
    if (dir.length === 0) {
      continue;
    }
    const candidate = path.join(dir, bin);
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(`${bin} is not available; the smoke refuses to run`);
}

/**
 * Reserve a free loopback TCP port.
 *
 * The installed dolt has no way to disable its TCP listener (`--port=-1` and
 * `--port 0` are both rejected), so the smoke pins an ephemeral port it just
 * proved to be free. The shared bd server port is never used, and all traffic
 * still goes through the temp Unix socket.
 *
 * @returns {Promise<number>}
 */
export function reserveLoopbackPort() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.unref();
    probe.on('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const address = probe.address();
      if (address === null || typeof address === 'string') {
        probe.close();
        reject(new Error('could not reserve a loopback port'));
        return;
      }
      const { port } = address;
      probe.close(() => resolve(port));
    });
  });
}

/** The shared bd Dolt server port; the smoke must never bind it. */
export const SHARED_DOLT_PORT = 13307;

/**
 * Read the repository HEAD and porcelain snapshot, so the smoke can prove it
 * left this checkout untouched.
 *
 * @param {string} repo_root
 */
async function repoSnapshot(repo_root) {
  const [head, status] = await Promise.all([
    execFileAsync('git', ['-C', repo_root, 'rev-parse', 'HEAD']),
    execFileAsync('git', [
      '-C',
      repo_root,
      'status',
      '--porcelain',
      '--untracked-files=all'
    ])
  ]);
  return { head: head.stdout.trim(), status: status.stdout };
}

/**
 * Build the disposable environment: temp HOME/XDG/config/runtime and no
 * inherited bd overrides.
 *
 * @param {string} temp_root
 * @returns {Record<string, string>}
 */
export function buildEnv(temp_root) {
  /** @type {Record<string, string>} */
  const env = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined || INHERITED_OVERRIDES.includes(key)) {
      continue;
    }
    env[key] = value;
  }

  const home = path.join(temp_root, 'home');
  const xdg_config = path.join(home, '.config');
  const xdg_data = path.join(home, '.local', 'share');
  const xdg_state = path.join(home, '.local', 'state');
  const xdg_runtime = path.join(temp_root, 'run');
  for (const dir of [home, xdg_config, xdg_data, xdg_state, xdg_runtime]) {
    mkdirSync(dir, { recursive: true });
  }

  env.HOME = home;
  env.XDG_CONFIG_HOME = xdg_config;
  env.XDG_DATA_HOME = xdg_data;
  env.XDG_STATE_HOME = xdg_state;
  env.XDG_RUNTIME_DIR = xdg_runtime;
  env.TMPDIR = path.join(temp_root, 'tmp');
  mkdirSync(env.TMPDIR, { recursive: true });
  // `bd init --server --external` still auto-starts a workspace-local
  // `dolt sql-server` (detached, tracked only by `.beads/dolt-server.pid`)
  // unless auto-start is off. That server outlived the temp root on every
  // smoke run and leaked as an orphan listener; bd reaches our own server
  // through the socket regardless, so the smoke never needs it.
  env.BEADS_DOLT_AUTO_START = '0';
  return env;
}

/**
 * Wait until the Dolt Unix socket accepts a connection.
 *
 * @param {string} socket_path
 * @param {() => boolean} child_alive
 */
async function waitForSocket(socket_path, child_alive) {
  const deadline = Date.now() + READINESS_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (!child_alive()) {
      throw new Error('dolt sql-server exited before becoming ready');
    }
    if (existsSync(socket_path)) {
      const connected = await new Promise((resolve) => {
        const socket = net.createConnection(socket_path);
        socket.once('connect', () => {
          socket.end();
          resolve(true);
        });
        socket.once('error', () => {
          socket.destroy();
          resolve(false);
        });
      });
      if (connected) {
        return;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, READINESS_POLL_MS));
  }
  throw new Error('dolt sql-server did not become ready in time');
}

/**
 * Run bd inside the disposable workspace.
 *
 * @param {SmokeContext} context
 * @param {string} bd_bin
 * @param {string[]} args
 * @param {{ envelope?: boolean }} [options]
 * @returns {Promise<{ code: number, stdout: string, stderr: string }>}
 */
function runBd(context, bd_bin, args, options = {}) {
  const env = { ...context.env };
  if (options.envelope === true) {
    env.BD_JSON_ENVELOPE = '1';
  } else {
    delete env.BD_JSON_ENVELOPE;
  }

  return new Promise((resolve, reject) => {
    const child = spawn(bd_bin, args, {
      cwd: context.workspace,
      env,
      shell: false
    });
    /** @type {string[]} */
    const out = [];
    /** @type {string[]} */
    const err = [];
    child.stdout?.setEncoding('utf8');
    child.stdout?.on('data', (chunk) => out.push(String(chunk)));
    child.stderr?.setEncoding('utf8');
    child.stderr?.on('data', (chunk) => err.push(String(chunk)));
    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error(`bd ${args[0]} timed out`));
    }, BD_TIMEOUT_MS);
    child.on('error', reject);
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({
        code: Number(code || 0),
        stdout: out.join(''),
        stderr: err.join('')
      });
    });
  });
}

/**
 * Run one bd JSON command in both producer modes and return the raw stdout of
 * each, so the caller can compare what the consumer boundary makes of them.
 *
 * @param {SmokeContext} context
 * @param {string} bd_bin
 * @param {string[]} args
 */
async function runBothModes(context, bd_bin, args) {
  const bare = await runBd(context, bd_bin, args);
  const enveloped = await runBd(context, bd_bin, args, { envelope: true });
  return { bare, enveloped };
}

/**
 * Assert a condition, collecting a stable failure reason.
 *
 * @param {string[]} failures
 * @param {boolean} condition
 * @param {string} reason
 */
function check(failures, condition, reason) {
  if (!condition) {
    failures.push(reason);
  }
}

/**
 * Serialize a payload for cross-mode comparison.
 *
 * Two normalizations are required before equality means "same data":
 *
 * - Key order differs between the modes (the bare payload arrives alphabetized,
 *   the envelope's inner payload keeps insertion order), so keys are sorted.
 * - A bare object carries `schema_version` as one of its own fields, while the
 *   envelope moves that marker out to the transport wrapper. Parity therefore
 *   means "identical apart from where the schema marker lives", and the
 *   top-level marker is dropped on both sides.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function canonicalJson(value) {
  return JSON.stringify(canonicalize(withoutSchemaMarker(value)));
}

/**
 * Drop a top-level own `schema_version` marker from an object payload.
 *
 * @param {unknown} value
 * @returns {unknown}
 */
export function withoutSchemaMarker(value) {
  if (
    value === null ||
    typeof value !== 'object' ||
    Array.isArray(value) ||
    !Object.hasOwn(value, 'schema_version')
  ) {
    return value;
  }
  const rest = { .../** @type {Record<string, unknown>} */ (value) };
  delete rest.schema_version;
  return rest;
}

/**
 * @param {unknown} value
 * @returns {unknown}
 */
function canonicalize(value) {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }
  if (value === null || typeof value !== 'object') {
    return value;
  }
  /** @type {Record<string, unknown>} */
  const sorted = {};
  for (const key of Object.keys(value).sort()) {
    sorted[key] = canonicalize(
      /** @type {Record<string, unknown>} */ (value)[key]
    );
  }
  return sorted;
}

/**
 * Run the smoke and return its findings.
 *
 * @returns {Promise<{ ok: boolean, failures: string[], evidence: Record<string, unknown> }>}
 */
export async function runBdJsonSmoke() {
  const repo_root = path.join(import.meta.dirname, '..');
  const before = await repoSnapshot(repo_root);
  const result = await runSmokeBody();

  // Checked AFTER cleanup rather than inside its `finally`: throwing from a
  // `finally` would swallow whatever failure was already in flight.
  const after = await repoSnapshot(repo_root);
  if (after.head !== before.head || after.status !== before.status) {
    throw new Error(
      'smoke changed this repository checkout; refusing to report success'
    );
  }
  return result;
}

/**
 * Run the disposable smoke itself.
 *
 * @returns {Promise<{ ok: boolean, failures: string[], evidence: Record<string, unknown> }>}
 */
async function runSmokeBody() {
  const dolt_bin = resolveExecutable('dolt');
  const bd_bin = resolveExecutable(process.env.BD_BIN || 'bd');
  const dolt_port = await reserveLoopbackPort();
  if (dolt_port === SHARED_DOLT_PORT) {
    throw new Error('smoke preflight failed: reserved the shared Dolt port');
  }

  const temp_root = mkdtempSync(path.join(os.tmpdir(), 'bd-json-smoke-'));
  const data_dir = path.join(temp_root, 'dolt-data');
  const workspace = path.join(temp_root, 'workspace');
  const socket_path = path.join(temp_root, 'dolt.sock');
  mkdirSync(data_dir, { recursive: true });
  mkdirSync(workspace, { recursive: true });

  // Preflight: every path the smoke writes to must live under the temp root,
  // and the socket must not already exist.
  for (const owned of [data_dir, workspace, socket_path]) {
    if (!owned.startsWith(temp_root + path.sep)) {
      rmSync(temp_root, { recursive: true, force: true });
      throw new Error('smoke preflight failed: path escapes the temp root');
    }
  }
  if (existsSync(socket_path)) {
    rmSync(temp_root, { recursive: true, force: true });
    throw new Error('smoke preflight failed: socket path already exists');
  }

  const env = buildEnv(temp_root);
  /** @type {SmokeContext} */
  const context = { temp_root, workspace, socket_path, env };

  /** @type {string[]} */
  const failures = [];
  /** @type {Record<string, unknown>} */
  const evidence = {
    temp_root,
    socket_path,
    dolt_bin,
    bd_bin,
    dolt_port,
    used_repo_beads: false,
    used_shared_port: dolt_port === SHARED_DOLT_PORT
  };

  /** @type {import('node:child_process').ChildProcess | null} */
  let server = null;

  try {
    await execFileAsync('git', ['init', '--quiet', workspace], { env });
    await execFileAsync(
      'git',
      ['-C', workspace, 'commit', '--allow-empty', '-m', 'smoke root'],
      {
        env: {
          ...env,
          GIT_AUTHOR_NAME: 'smoke',
          GIT_AUTHOR_EMAIL: 'smoke@example.invalid',
          GIT_COMMITTER_NAME: 'smoke',
          GIT_COMMITTER_EMAIL: 'smoke@example.invalid'
        }
      }
    );

    // The TCP listener is pinned to loopback on a port this process just proved
    // free, because the installed dolt cannot disable TCP at all. bd still
    // reaches the server through the temp Unix socket.
    server = spawn(
      dolt_bin,
      [
        'sql-server',
        '--data-dir',
        data_dir,
        '--socket',
        socket_path,
        '--host',
        '127.0.0.1',
        '--port',
        String(dolt_port)
      ],
      { cwd: data_dir, env, shell: false, stdio: 'ignore' }
    );
    const server_pid = server.pid;
    evidence.dolt_pid = server_pid;
    let server_exited = false;
    server.on('exit', () => {
      server_exited = true;
    });

    await waitForSocket(socket_path, () => !server_exited);

    const init = await runBd(context, bd_bin, [
      'init',
      '--server',
      '--external',
      '--server-socket',
      socket_path,
      '--non-interactive',
      '--skip-agents',
      '--skip-hooks'
    ]);
    if (init.code !== 0) {
      failures.push(`bd init failed: ${init.stderr.trim().slice(0, 200)}`);
      return { ok: false, failures, evidence };
    }

    const created = await runBd(context, bd_bin, [
      'create',
      '--type',
      'task',
      '-p',
      '1',
      '--title',
      'smoke 대상 이슈',
      '-d',
      'disposable smoke issue',
      '--json'
    ]);
    if (created.code !== 0) {
      failures.push(`bd create failed: ${created.stderr.trim().slice(0, 200)}`);
      return { ok: false, failures, evidence };
    }

    const list = await runBothModes(context, bd_bin, ['list', '--json']);
    const {
      normalizeBdJsonTransport,
      normalizeBdIssueList,
      normalizeBdComments
    } = await import('../server/bd-json.js');

    const bare_list = normalizeBdJsonTransport(JSON.parse(list.bare.stdout));
    const enveloped_list = normalizeBdJsonTransport(
      JSON.parse(list.enveloped.stdout)
    );
    check(
      failures,
      bare_list.ok && enveloped_list.ok,
      'list transport normalization failed in one of the two modes'
    );
    if (bare_list.ok && enveloped_list.ok) {
      const bare_rows = normalizeBdIssueList(bare_list.data);
      const enveloped_rows = normalizeBdIssueList(enveloped_list.data);
      check(
        failures,
        bare_rows.ok && enveloped_rows.ok,
        'list projection failed in one of the two modes'
      );
      if (bare_rows.ok && enveloped_rows.ok) {
        evidence.bare_list_count = bare_rows.data.length;
        evidence.enveloped_list_count = enveloped_rows.data.length;
        check(
          failures,
          bare_rows.data.length === enveloped_rows.data.length,
          `list count differs between modes: ${bare_rows.data.length} vs ${enveloped_rows.data.length}`
        );
        check(
          failures,
          canonicalJson(bare_rows.data) === canonicalJson(enveloped_rows.data),
          'list data differs between modes'
        );
      }
      check(
        failures,
        enveloped_list.protocol.format === 'envelope',
        'envelope mode did not report the envelope transport'
      );
      check(
        failures,
        bare_list.protocol.format === 'bare',
        'default mode did not report the bare transport'
      );
    }

    const issue_id =
      bare_list.ok && Array.isArray(bare_list.data) && bare_list.data.length > 0
        ? String(
            /** @type {Record<string, unknown>} */ (bare_list.data[0]).id || ''
          )
        : '';
    if (issue_id.length === 0) {
      failures.push('smoke issue id could not be read from the list payload');
      return { ok: false, failures, evidence };
    }
    evidence.issue_id = issue_id;

    const show = await runBothModes(context, bd_bin, [
      'show',
      issue_id,
      '--json'
    ]);
    const bare_show = normalizeBdJsonTransport(JSON.parse(show.bare.stdout));
    const enveloped_show = normalizeBdJsonTransport(
      JSON.parse(show.enveloped.stdout)
    );
    check(
      failures,
      bare_show.ok &&
        enveloped_show.ok &&
        canonicalJson(bare_show.data) === canonicalJson(enveloped_show.data),
      'show data differs between modes'
    );

    const commented = await runBd(context, bd_bin, [
      'comment',
      issue_id,
      'smoke 코멘트'
    ]);
    check(
      failures,
      commented.code === 0,
      `bd comment failed: ${commented.stderr.trim().slice(0, 200)}`
    );

    const comments = await runBothModes(context, bd_bin, [
      'comments',
      issue_id,
      '--json'
    ]);
    const bare_comments = normalizeBdJsonTransport(
      JSON.parse(comments.bare.stdout)
    );
    const enveloped_comments = normalizeBdJsonTransport(
      JSON.parse(comments.enveloped.stdout)
    );
    if (bare_comments.ok && enveloped_comments.ok) {
      const bare_rows = normalizeBdComments(bare_comments.data);
      const enveloped_rows = normalizeBdComments(enveloped_comments.data);
      check(
        failures,
        bare_rows.ok && enveloped_rows.ok,
        'comments projection failed in one of the two modes'
      );
      check(
        failures,
        canonicalJson(bare_comments.data) ===
          canonicalJson(enveloped_comments.data),
        'comments data differs between modes'
      );
    } else {
      failures.push('comments transport normalization failed');
    }

    const kv_set = await runBd(context, bd_bin, [
      'kv',
      'set',
      'smoke_defaults',
      JSON.stringify({ schema: 1, impl_runtime: 'codex' })
    ]);
    check(failures, kv_set.code === 0, 'bd kv set failed');

    const { kvGetJson } = await import('../server/bd.js');
    const kv_bare = await kvGetJson('smoke_defaults', {
      cwd: workspace,
      env: { ...env },
      timeout_ms: BD_TIMEOUT_MS
    });
    const kv_enveloped = await kvGetJson('smoke_defaults', {
      cwd: workspace,
      env: { ...env, BD_JSON_ENVELOPE: '1' },
      timeout_ms: BD_TIMEOUT_MS
    });
    evidence.kv_bare = kv_bare;
    evidence.kv_enveloped = kv_enveloped;
    check(
      failures,
      canonicalJson(kv_bare) === canonicalJson(kv_enveloped),
      'kv read differs between modes'
    );
    check(
      failures,
      kv_enveloped.ok === true && kv_enveloped.value !== undefined,
      'kv read lost the stored value in envelope mode'
    );

    // The Board adapter reads the producer mode from `process.env`, so the
    // envelope leg is driven by flipping it around the call inside this
    // disposable process and restoring it afterwards.
    const { fetchListForSubscription } =
      await import('../server/list-adapters.js');
    /**
     * @param {boolean} envelope
     */
    const readBoard = async (envelope) => {
      const previous = process.env.BD_JSON_ENVELOPE;
      if (envelope) {
        process.env.BD_JSON_ENVELOPE = '1';
      } else {
        delete process.env.BD_JSON_ENVELOPE;
      }
      try {
        return await fetchListForSubscription(
          { type: 'all-issues' },
          { cwd: workspace }
        );
      } finally {
        if (previous === undefined) {
          delete process.env.BD_JSON_ENVELOPE;
        } else {
          process.env.BD_JSON_ENVELOPE = previous;
        }
      }
    };

    const board_bare = await readBoard(false);
    const board_enveloped = await readBoard(true);
    evidence.board_bare_ok = board_bare.ok === true;
    evidence.board_enveloped_ok = board_enveloped.ok === true;
    evidence.board_bare_count =
      board_bare.ok === true ? board_bare.items.length : null;
    evidence.board_enveloped_count =
      board_enveloped.ok === true ? board_enveloped.items.length : null;

    // A null count on either side is a failure, not a passing comparison: two
    // unreadable results must never look like agreement.
    check(
      failures,
      typeof evidence.board_bare_count === 'number',
      'Board default mode returned no readable item list'
    );
    check(
      failures,
      typeof evidence.board_enveloped_count === 'number',
      'Board envelope mode returned no readable item list'
    );
    check(
      failures,
      evidence.board_bare_count === evidence.board_enveloped_count,
      `Board count differs between modes: ${evidence.board_bare_count} vs ${evidence.board_enveloped_count}`
    );

    // Worker metadata consumer, in both modes. The Board proves the read
    // projection; this proves the consumer the scheduler and cleanup actually
    // depend on reads the same issue either way.
    const { createBdMetadata } =
      await import('../server/worker/bd-metadata.js');
    /**
     * @param {boolean} envelope
     */
    const readWorkerIssue = async (envelope) => {
      const previous = process.env.BD_JSON_ENVELOPE;
      if (envelope) {
        process.env.BD_JSON_ENVELOPE = '1';
      } else {
        delete process.env.BD_JSON_ENVELOPE;
      }
      try {
        const meta = createBdMetadata({
          cwd: workspace,
          requireCapability: async () => ({ ok: true })
        });
        return await meta.readIssue(issue_id);
      } finally {
        if (previous === undefined) {
          delete process.env.BD_JSON_ENVELOPE;
        } else {
          process.env.BD_JSON_ENVELOPE = previous;
        }
      }
    };

    const worker_bare = await readWorkerIssue(false);
    const worker_enveloped = await readWorkerIssue(true);
    evidence.worker_issue_id = worker_bare && worker_bare.id;
    check(
      failures,
      canonicalJson(worker_bare) === canonicalJson(worker_enveloped),
      'Worker metadata read differs between modes'
    );
    check(
      failures,
      Boolean(worker_bare && worker_bare.id === issue_id),
      'Worker metadata read did not return the requested issue'
    );

    // Health capability, in both modes. `/healthz` is what the deploy gate
    // reads, so its diagnostics must be green against a real bd.
    const { bdHealthSnapshot, resolveBdWorkspaceIdentity } =
      await import('../server/bd-capability.js');
    const { runBdJson } = await import('../server/bd.js');
    /**
     * @param {boolean} envelope
     */
    const readHealth = async (envelope) => {
      const previous = process.env.BD_JSON_ENVELOPE;
      if (envelope) {
        process.env.BD_JSON_ENVELOPE = '1';
      } else {
        delete process.env.BD_JSON_ENVELOPE;
      }
      try {
        const identity = resolveBdWorkspaceIdentity({ root_dir: workspace });
        return await bdHealthSnapshot({
          primary_workspace: identity.ok ? identity.data : undefined,
          run_json: runBdJson,
          cwd: workspace
        });
      } finally {
        if (previous === undefined) {
          delete process.env.BD_JSON_ENVELOPE;
        } else {
          process.env.BD_JSON_ENVELOPE = previous;
        }
      }
    };

    const health_bare = await readHealth(false);
    const health_enveloped = await readHealth(true);
    evidence.health_bare_ok = health_bare.ok;
    evidence.health_enveloped_ok = health_enveloped.ok;
    evidence.health_version = health_bare.diagnostics.version;
    evidence.health_producer_capabilities =
      health_bare.diagnostics.producer_capabilities;
    check(
      failures,
      health_bare.ok === true,
      'health diagnostics red in default mode'
    );
    check(
      failures,
      health_enveloped.ok === true,
      'health diagnostics red in envelope mode'
    );
    check(
      failures,
      canonicalJson(health_bare.diagnostics.consumer_supported_formats) ===
        canonicalJson(['bare', 'envelope_v2']),
      'health did not report both consumer supported formats'
    );
    check(
      failures,
      typeof health_bare.diagnostics.version === 'string' &&
        String(health_bare.diagnostics.version).length > 0,
      'health reported no bd version'
    );

    return { ok: failures.length === 0, failures, evidence };
  } finally {
    // Belt and braces for the auto-start guard above: a bd that ignored it
    // records the workspace-local server in this pid file, and `bd dolt stop`
    // is the only owner-side way to end that server before its data dir goes.
    if (existsSync(path.join(workspace, '.beads', 'dolt-server.pid'))) {
      try {
        await runBd(context, bd_bin, ['dolt', 'stop']);
      } catch {
        // Best effort only; the guard above is the real fix.
      }
    }
    if (server && server.pid) {
      try {
        server.kill('SIGTERM');
        const deadline = Date.now() + SHUTDOWN_GRACE_MS;
        while (Date.now() < deadline && server.exitCode === null) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        if (server.exitCode === null) {
          server.kill('SIGKILL');
        }
      } catch {
        // The child is already gone; nothing else owns this PID.
      }
    }
    rmSync(temp_root, { recursive: true, force: true });
  }
}

const invoked_directly =
  process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename;

if (invoked_directly) {
  runBdJsonSmoke()
    .then((result) => {
      process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
      process.exit(result.ok ? 0 : 1);
    })
    .catch((err) => {
      process.stderr.write(`bd-json smoke failed: ${err.message}\n`);
      process.exit(1);
    });
}
