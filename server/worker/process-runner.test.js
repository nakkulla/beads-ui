import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PassThrough } from 'node:stream';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  buildWorkerExecTarget,
  createWorkerProcessRunner
} from './process-runner.js';

/** @type {string[]} */
const tmps = [];

function mkdtemp() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-runner-'));
  tmps.push(dir);
  return dir;
}

afterEach(() => {
  vi.restoreAllMocks();
  for (const dir of tmps.splice(0)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
});

describe('buildWorkerExecTarget', () => {
  test('builds bd-ralph-v2 exec target from issue id', () => {
    const exec_target = buildWorkerExecTarget({ command: 'bd-ralph-v2', issueId: 'UI-qclw' });
    expect(exec_target).toBe('$bd-ralph-v2 UI-qclw');
  });

  test('builds pr-review exec target from explicit pr number', () => {
    const exec_target = buildWorkerExecTarget({ command: 'pr-review', issueId: 'UI-qclw', prNumber: 42 });
    expect(exec_target).toBe('$pr-review 42');
  });
});

describe('createWorkerProcessRunner', () => {
  test('spawns detached codex exec process and appends stdout/stderr to log', async () => {
    const workspace = mkdtemp();
    const log_path = path.join(workspace, 'worker.log');
    const stdout = new PassThrough();
    const stderr = new PassThrough();
    const on = vi.fn();
    const unref = vi.fn();
    const spawn_impl = /** @type {any} */ (vi.fn(() => ({ pid: 4321, stdout, stderr, on, unref })));
    const runner = createWorkerProcessRunner({ spawn_impl });

    const started = runner.startJob({ command: 'bd-ralph-v2', issueId: 'UI-qclw', workspace, log_path });

    stdout.end('hello stdout\n');
    stderr.end('hello stderr\n');
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(started.pid).toBe(4321);
    expect(spawn_impl).toHaveBeenCalledWith('codex', ['exec', '$bd-ralph-v2 UI-qclw'], expect.objectContaining({ cwd: workspace, detached: true, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] }));
    expect(unref).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync(log_path, 'utf8')).toContain('hello stdout');
    expect(fs.readFileSync(log_path, 'utf8')).toContain('hello stderr');
  });

  test('delegates cancel to terminate helper', async () => {
    const terminate_process_impl = vi.fn(async () => ({ ok: true, forced: false }));
    const runner = createWorkerProcessRunner({ terminate_process_impl });

    const result = await runner.cancelJob(4321, { grace_timeout_ms: 1500 });

    expect(result).toEqual({ ok: true, forced: false });
    expect(terminate_process_impl).toHaveBeenCalledWith(4321, 1500);
  });
});
