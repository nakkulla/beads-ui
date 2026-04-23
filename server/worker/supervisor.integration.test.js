import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { createJobStore } from './job-store.js';
import { createWorkerSupervisor } from './supervisor.js';

/** @type {string[]} */
const tmps = [];

function mkdtemp() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-supervisor-it-'));
  tmps.push(dir);
  return dir;
}

/**
 * @param {string} script_path
 */
function createNodeRunner(script_path) {
  /** @type {{ ok: boolean, forced: boolean } | null} */
  let last_cancel_result = null;

  return {
    /**
     * @param {{ workspace: string, log_path: string }} input
     */
    startJob(input) {
      const log_stream = fs.createWriteStream(input.log_path, { flags: 'a' });
      const child = spawn(process.execPath, [script_path], {
        cwd: input.workspace,
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
      });
      child.stdout?.pipe(log_stream);
      child.stderr?.pipe(log_stream);
      child.unref();
      return { pid: child.pid ?? null, child };
    },
    /**
     * @param {number} pid
     * @param {{ grace_timeout_ms: number }} options
     */
    async cancelJob(pid, options) {
      try {
        process.kill(pid, 'SIGTERM');
      } catch (error) {
        const code = /** @type {{ code?: string }} */ (error).code;
        if (code === 'ESRCH') {
          last_cancel_result = { ok: true, forced: false };
          return last_cancel_result;
        }
      }

      const started_at = Date.now();
      while (Date.now() - started_at < options.grace_timeout_ms) {
        try {
          process.kill(pid, 0);
          await new Promise((resolve) => setTimeout(resolve, 20));
        } catch (error) {
          const code = /** @type {{ code?: string }} */ (error).code;
          if (code === 'ESRCH') {
            last_cancel_result = { ok: true, forced: false };
            return last_cancel_result;
          }
        }
      }

      try {
        process.kill(pid, 'SIGKILL');
      } catch (error) {
        const code = /** @type {{ code?: string }} */ (error).code;
        if (code === 'ESRCH') {
          last_cancel_result = { ok: true, forced: true };
          return last_cancel_result;
        }
      }

      const force_started_at = Date.now();
      while (Date.now() - force_started_at < 500) {
        try {
          process.kill(pid, 0);
          await new Promise((resolve) => setTimeout(resolve, 20));
        } catch (error) {
          const code = /** @type {{ code?: string }} */ (error).code;
          if (code === 'ESRCH') {
            last_cancel_result = { ok: true, forced: true };
            return last_cancel_result;
          }
        }
      }

      last_cancel_result = { ok: false, forced: true };
      return last_cancel_result;
    },
    getLastCancelResult() {
      return last_cancel_result;
    }
  };
}

/**
 * @param {string} script_path
 */
function createShellRunner(script_path) {
  const runner = createNodeRunner(script_path);
  return {
    ...runner,
    /**
     * @param {{ workspace: string, log_path: string }} input
     */
    startJob(input) {
      const log_stream = fs.createWriteStream(input.log_path, { flags: 'a' });
      const child = spawn('/bin/sh', [script_path], {
        cwd: input.workspace,
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
      });
      child.stdout?.pipe(log_stream);
      child.stderr?.pipe(log_stream);
      child.unref();
      return { pid: child.pid ?? null, child };
    }
  };
}

/**
 * @param {() => boolean | Promise<boolean>} check
 * @param {number} [timeout_ms]
 */
async function waitFor(check, timeout_ms = 4000) {
  const started_at = Date.now();
  while (Date.now() - started_at < timeout_ms) {
    if (await check()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error('Timed out waiting for condition');
}

afterEach(() => {
  for (const dir of tmps.splice(0)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
});

describe('worker supervisor integration', () => {
  test('gracefully cancels long-running process and keeps log preview', async () => {
    const root_dir = mkdtemp();
    const script_path = path.join(root_dir, 'graceful-worker.js');
    fs.writeFileSync(
      script_path,
      [
        "console.log('worker-started');",
        "process.on('SIGTERM', () => { console.log('worker-term'); process.exit(0); });",
        'setInterval(() => console.log("worker-tick"), 20);'
      ].join('\n')
    );
    const store = createJobStore({ root_dir });
    const runner = createNodeRunner(script_path);
    const supervisor = createWorkerSupervisor({
      root_dir,
      store,
      runner,
      owner_pid: process.pid,
      health_check_impl: async () => true,
      is_process_running_impl: (pid) => {
        try {
          process.kill(pid, 0);
          return true;
        } catch {
          return false;
        }
      }
    });

    await supervisor.acquireOwnership({ port: 4201 });
    const job = await supervisor.createJob({
      command: 'bd-ralph',
      issueId: 'UI-qclw',
      workspace: root_dir
    });
    if (!job) {
      throw new Error('job was not created');
    }
    await waitFor(() => supervisor.getJob(job.id)?.status === 'running');
    await waitFor(() =>
      supervisor
        .getJobLog(job.id, { tail: 20 })
        .tail.some((line) => line.includes('worker-started'))
    );

    const cancelled = await supervisor.cancelJob(job.id, {
      grace_timeout_ms: 200
    });
    const log = supervisor.getJobLog(job.id, { tail: 20 });

    expect(cancelled.status).toBe('cancelled');
    expect(runner.getLastCancelResult()?.forced).toBe(false);
    expect(log.tail.some((line) => line.includes('worker-started'))).toBe(true);
  });

  test('forces kill after grace timeout for non-cooperative process', async () => {
    const root_dir = mkdtemp();
    const script_path = path.join(root_dir, 'stubborn-worker.sh');
    fs.writeFileSync(
      script_path,
      [
        '#!/bin/sh',
        "trap '' TERM",
        'echo stubborn-started',
        'while true; do echo worker-loop; sleep 0.02; done'
      ].join('\n')
    );
    fs.chmodSync(script_path, 0o755);
    const store = createJobStore({ root_dir });
    const runner = createShellRunner(script_path);
    const supervisor = createWorkerSupervisor({
      root_dir,
      store,
      runner,
      owner_pid: process.pid,
      health_check_impl: async () => true,
      is_process_running_impl: (pid) => {
        try {
          process.kill(pid, 0);
          return true;
        } catch {
          return false;
        }
      }
    });

    await supervisor.acquireOwnership({ port: 4202 });
    const job = await supervisor.createJob({
      command: 'bd-ralph',
      issueId: 'UI-qclw',
      workspace: root_dir
    });
    if (!job) {
      throw new Error('job was not created');
    }
    await waitFor(() => supervisor.getJob(job.id)?.status === 'running');

    const cancelled = await supervisor.cancelJob(job.id, {
      grace_timeout_ms: 50
    });

    expect(cancelled.status).toBe('cancelled');
    expect(runner.getLastCancelResult()).not.toBeNull();
  });
});
