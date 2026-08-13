import { spawn } from 'node:child_process';
import {
  appendFileSync,
  closeSync,
  mkdirSync,
  openSync,
  renameSync,
  writeFileSync
} from 'node:fs';
import path from 'node:path';

/**
 * @param {string} marker_path
 * @param {{ exit_code: number|null, signal: string|null, started_at: number, finished_at: number }} marker
 */
function writeMarker(marker_path, marker) {
  mkdirSync(path.dirname(marker_path), { recursive: true });
  const temp = `${marker_path}.tmp`;
  writeFileSync(temp, JSON.stringify(marker));
  renameSync(temp, marker_path);
}

const encoded = process.argv[2];
if (typeof encoded !== 'string') {
  process.exitCode = 64;
} else {
  /** @type {{ script_path: string, cwd: string, env: Record<string, string>, log_path: string, marker_path: string, timeout_ms: number }} */
  const input = JSON.parse(encoded);
  mkdirSync(path.dirname(input.log_path), { recursive: true });
  const fd = openSync(input.log_path, 'a');
  const started_at = Date.now();
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
    closeSync(fd);
    writeMarker(input.marker_path, {
      exit_code: timed_out ? 124 : exit_code,
      signal: signal || null,
      started_at,
      finished_at: Date.now()
    });
  });
}
