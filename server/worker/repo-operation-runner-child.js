import { spawn } from 'node:child_process';
import {
  appendFileSync,
  closeSync,
  fstatSync,
  mkdirSync,
  openSync,
  readSync,
  renameSync,
  writeFileSync,
  writeSync
} from 'node:fs';
import path from 'node:path';
import { formatBoundaryLine } from './repo-operation-log.js';

/**
 * @param {string} marker_path
 * @param {object} marker
 */
function writeMarker(marker_path, marker) {
  mkdirSync(path.dirname(marker_path), { recursive: true });
  const temp = `${marker_path}.tmp`;
  writeFileSync(temp, JSON.stringify(marker));
  renameSync(temp, marker_path);
}

/**
 * Append one attempt boundary line (UI-i8cy §5.1). The line must start a line
 * of its own, so when the output so far does not end with a newline one is
 * written first and the line records that as `sep` for the stripper.
 *
 * @param {number} fd - The log, opened for reading and appending.
 * @param {Record<string, unknown>} payload
 */
function writeBoundary(fd, payload) {
  let sep = false;
  try {
    const size = fstatSync(fd).size;
    if (size > 0) {
      const last = Buffer.alloc(1);
      readSync(fd, last, 0, 1, size - 1);
      sep = last[0] !== 0x0a;
    }
  } catch {
    sep = false;
  }
  try {
    writeSync(fd, formatBoundaryLine(payload, sep));
  } catch {
    // A boundary line is display material; failing to write one must never
    // change how the script runs or how its result is recorded.
  }
}

const encoded = process.argv[2];
if (typeof encoded !== 'string') {
  process.exitCode = 64;
} else {
  /** @type {{ script_path: string, cwd: string, env: Record<string, string>, log_path: string, marker_path: string, launch_marker_path?: string, timeout_ms: number, attempt_id?: string }} */
  const input = JSON.parse(encoded);
  const attempt_id =
    typeof input.attempt_id === 'string' ? input.attempt_id : null;
  mkdirSync(path.dirname(input.log_path), { recursive: true });
  // `a+` rather than `a`: the boundary writer reads the last byte back to know
  // whether the output ended its line. Writes still always append.
  const fd = openSync(input.log_path, 'a+');
  const started_at = Date.now();
  if (typeof input.launch_marker_path === 'string') {
    // Durable handshake BEFORE the script runs: a Worker that crashed between
    // spawn and its queue write re-adopts this process instead of respawning.
    // Detached spawn makes this child its own process-group leader.
    //
    // The handshake also carries the INVOCATION IDENTITY — the log this run
    // writes and the target it was pinned to. An adopted record otherwise has
    // no proof it ever reached a script, so its failure would be read as a
    // pre-spawn one and silently lose the single script retry the contract
    // grants a real invocation.
    writeMarker(input.launch_marker_path, {
      pid: process.pid,
      pgid: process.pid,
      started_at,
      log_path: input.log_path,
      target_sha: input.env.REPO_OPS_TARGET_SHA || null
    });
  }
  writeBoundary(fd, { event: 'start', attempt_id, at: started_at });
  const child = spawn(input.script_path, [], {
    cwd: input.cwd,
    env: {
      PATH: process.env.PATH || '',
      HOME: process.env.HOME || '',
      ...input.env
    },
    shell: false,
    detached: process.platform !== 'win32',
    stdio: ['ignore', fd, fd]
  });
  let timed_out = false;
  const timer = setTimeout(() => {
    timed_out = true;
    try {
      if (typeof child.pid === 'number') {
        process.kill(-child.pid, 'SIGKILL');
      }
    } catch {
      child.kill('SIGKILL');
    }
  }, input.timeout_ms);
  timer.unref();
  child.on('error', () => {
    appendFileSync(input.log_path, 'repo operation spawn failed\n');
  });
  child.on('close', (exit_code, signal) => {
    clearTimeout(timer);
    writeBoundary(fd, {
      event: 'end',
      attempt_id,
      at: Date.now(),
      exit_code: timed_out ? 124 : exit_code,
      signal: signal || null,
      timed_out
    });
    closeSync(fd);
    writeMarker(input.marker_path, {
      exit_code: timed_out ? 124 : exit_code,
      signal: signal || null,
      started_at,
      finished_at: Date.now()
    });
  });
}
