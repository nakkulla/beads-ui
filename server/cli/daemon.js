/**
 * @import { SpawnOptions, ChildProcess } from 'node:child_process'
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getConfig } from '../config.js';
import { resolveWorkspaceDatabase } from '../db.js';

/**
 * @typedef {{
 *   runtime_dir: string,
 *   pid_file_path: string,
 *   log_file_path: string
 * }} ManagedRuntimePaths
 */

/**
 * @typedef {(command: string, args: string[], options: SpawnOptions) => ChildProcess} ManagedSpawn
 */

/**
 * @typedef {{
 *   entry_path: string,
 *   runtime_dir: string,
 *   pid_file_name: string,
 *   log_file_name: string,
 *   entry_args?: string[],
 *   env?: Record<string, string | undefined>,
 *   cwd?: string,
 *   is_debug?: boolean,
 *   spawn_impl?: ManagedSpawn
 * }} StartManagedDaemonOptions
 */

/**
 * Resolve the runtime directory used for PID and log files.
 * Prefers `BDUI_RUNTIME_DIR`, then `$XDG_RUNTIME_DIR/beads-ui`,
 * and finally `os.tmpdir()/beads-ui`.
 *
 * @returns {string}
 */
export function getRuntimeDir() {
  const override_dir = process.env.BDUI_RUNTIME_DIR;
  if (override_dir && override_dir.length > 0) {
    return ensureDir(override_dir);
  }

  const xdg_dir = process.env.XDG_RUNTIME_DIR;
  if (xdg_dir && xdg_dir.length > 0) {
    return ensureDir(path.join(xdg_dir, 'beads-ui'));
  }

  return ensureDir(path.join(os.tmpdir(), 'beads-ui'));
}

/**
 * Ensure a directory exists with safe permissions and return its path.
 *
 * @param {string} dir_path
 * @returns {string}
 */
export function ensureDir(dir_path) {
  try {
    fs.mkdirSync(dir_path, { recursive: true, mode: 0o700 });
  } catch {
    // Best-effort; permission errors will surface on file ops later.
  }
  return dir_path;
}

/**
 * @param {{ runtime_dir: string, pid_file_name: string, log_file_name: string }} options
 * @returns {ManagedRuntimePaths}
 */
export function createManagedRuntimePaths(options) {
  const runtime_dir = ensureDir(options.runtime_dir);
  return {
    runtime_dir,
    pid_file_path: path.join(runtime_dir, options.pid_file_name),
    log_file_path: path.join(runtime_dir, options.log_file_name)
  };
}

/**
 * @returns {string}
 */
export function getPidFilePath() {
  return createManagedRuntimePaths({
    runtime_dir: getRuntimeDir(),
    pid_file_name: 'server.pid',
    log_file_name: 'daemon.log'
  }).pid_file_path;
}

/**
 * @returns {string}
 */
export function getLogFilePath() {
  return createManagedRuntimePaths({
    runtime_dir: getRuntimeDir(),
    pid_file_name: 'server.pid',
    log_file_name: 'daemon.log'
  }).log_file_path;
}

/**
 * Read PID from the PID file if present.
 *
 * @param {string} pid_file_path
 * @returns {number | null}
 */
export function readPidFileAt(pid_file_path) {
  try {
    const text = fs.readFileSync(pid_file_path, 'utf8');
    const pid_value = Number.parseInt(text.trim(), 10);
    if (Number.isFinite(pid_value) && pid_value > 0) {
      return pid_value;
    }
  } catch {
    // ignore missing or unreadable
  }
  return null;
}

/**
 * Read PID from the default server PID file if present.
 *
 * @returns {number | null}
 */
export function readPidFile() {
  return readPidFileAt(getPidFilePath());
}

/**
 * @param {number} pid
 * @param {string} pid_file_path
 */
export function writePidFileAt(pid, pid_file_path) {
  try {
    fs.writeFileSync(pid_file_path, `${pid}\n`, { encoding: 'utf8' });
  } catch {
    // ignore write errors; daemon still runs but management degrades
  }
}

/**
 * @param {number} pid
 */
export function writePidFile(pid) {
  writePidFileAt(pid, getPidFilePath());
}

/**
 * @param {string} pid_file_path
 */
export function removePidFileAt(pid_file_path) {
  try {
    fs.unlinkSync(pid_file_path);
  } catch {
    // ignore
  }
}

export function removePidFile() {
  removePidFileAt(getPidFilePath());
}

/**
 * Check whether a process is running.
 *
 * @param {number} pid
 * @returns {boolean}
 */
export function isProcessRunning(pid) {
  try {
    if (pid <= 0) {
      return false;
    }
    process.kill(pid, 0);
    return true;
  } catch (err) {
    const code = /** @type {{ code?: string }} */ (err).code;
    if (code === 'ESRCH') {
      return false;
    }
    // EPERM or other errors imply the process likely exists but is not killable
    return true;
  }
}

/**
 * Compute the absolute path to the server entry file.
 *
 * @returns {string}
 */
export function getServerEntryPath() {
  const here = fileURLToPath(new URL(import.meta.url));
  const cli_dir = path.dirname(here);
  return path.resolve(cli_dir, '..', 'index.js');
}

/**
 * Spawn a managed detached daemon, redirecting stdio to the configured log file.
 * Writes the configured PID file upon success.
 *
 * @param {StartManagedDaemonOptions} options
 * @returns {{ pid: number } | null}
 */
export function startManagedDaemon(options) {
  const runtime_paths = createManagedRuntimePaths({
    runtime_dir: options.runtime_dir,
    pid_file_name: options.pid_file_name,
    log_file_name: options.log_file_name
  });

  /** @type {number} */
  let log_fd;
  try {
    log_fd = fs.openSync(runtime_paths.log_file_path, 'a');
    if (options.is_debug) {
      console.debug('log file  ', runtime_paths.log_file_path);
    }
  } catch {
    log_fd = -1;
  }

  /** @type {SpawnOptions} */
  const spawn_options = {
    cwd: options.cwd || process.cwd(),
    detached: true,
    env: { ...process.env, ...(options.env || {}) },
    stdio: log_fd >= 0 ? ['ignore', log_fd, log_fd] : 'ignore',
    windowsHide: true
  };
  const spawn_impl = options.spawn_impl || spawn;

  try {
    const child = spawn_impl(
      process.execPath,
      [options.entry_path, ...(options.entry_args || [])],
      spawn_options
    );
    child.unref?.();
    const child_pid = typeof child.pid === 'number' ? child.pid : -1;
    if (child_pid > 0) {
      writePidFileAt(child_pid, runtime_paths.pid_file_path);
      return { pid: child_pid };
    }
    return null;
  } catch (err) {
    console.error('start error', err);
    try {
      const message = `${new Date().toISOString()} start error: ${String(err)}\n`;
      fs.appendFileSync(runtime_paths.log_file_path, message, 'utf8');
    } catch {
      // ignore
    }
    return null;
  } finally {
    if (log_fd >= 0) {
      try {
        fs.closeSync(log_fd);
      } catch {
        // ignore
      }
    }
  }
}

/**
 * Spawn the server as a detached daemon, redirecting stdio to the log file.
 * Writes the PID file upon success.
 *
 * @param {{ is_debug?: boolean, host?: string, port?: number }} [options]
 * @returns {{ pid: number } | null}
 */
export function startDaemon(options = {}) {
  /** @type {Record<string, string | undefined>} */
  const spawn_env = { ...process.env };
  if (options.host) {
    spawn_env.HOST = options.host;
  }
  if (options.port) {
    spawn_env.PORT = String(options.port);
  }

  return startManagedDaemon({
    entry_path: getServerEntryPath(),
    runtime_dir: getRuntimeDir(),
    pid_file_name: 'server.pid',
    log_file_name: 'daemon.log',
    env: spawn_env,
    is_debug: options.is_debug
  });
}

/**
 * Send SIGTERM then (optionally) SIGKILL to stop a process and wait for exit.
 *
 * @param {number} pid
 * @param {number} timeout_ms
 * @returns {Promise<{ ok: boolean, forced: boolean }>} Resolves whether the process is gone and whether SIGKILL was needed.
 */
export async function terminateProcess(pid, timeout_ms) {
  try {
    process.kill(pid, 'SIGTERM');
  } catch (err) {
    const code = /** @type {{ code?: string }} */ (err).code;
    if (code === 'ESRCH') {
      return { ok: true, forced: false };
    }
  }

  const start_time = Date.now();
  while (Date.now() - start_time < timeout_ms) {
    if (!isProcessRunning(pid)) {
      return { ok: true, forced: false };
    }
    await sleep(100);
  }

  try {
    process.kill(pid, 'SIGKILL');
  } catch {
    // ignore
  }

  await sleep(50);
  return { ok: !isProcessRunning(pid), forced: true };
}

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

/**
 * Print the server URL derived from current config.
 */
export function printServerUrl() {
  const resolved_db = resolveWorkspaceDatabase();
  console.log(
    `beads db   ${resolved_db.path} (${resolved_db.source}${resolved_db.exists ? '' : ', missing'})`
  );

  const { url } = getConfig();
  console.log(`beads ui   listening on ${url}`);
}
