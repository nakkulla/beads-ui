import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { createJobStore } from './job-store.js';
import { createWorkerSupervisor } from './supervisor.js';

/** @type {string[]} */
const tmps = [];

function mkdtemp() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-supervisor-'));
  tmps.push(dir);
  return dir;
}

function createRunnerStub() {
  const child = /** @type {any} */ (new EventEmitter());
  child.unref = () => {};

  return {
    child,
    runner: {
      startJob() {
        return { pid: 4321, child };
      },
      async cancelJob() {
        return true;
      }
    }
  };
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

describe('worker supervisor', () => {
  test('creates job, marks it running, and finalizes success on close', async () => {
    const root_dir = mkdtemp();
    const store = createJobStore({ root_dir, now: () => '2026-04-17T03:00:00.000Z' });
    const runner_stub = createRunnerStub();
    const supervisor = createWorkerSupervisor({
      root_dir,
      store,
      runner: runner_stub.runner,
      owner_pid: 9001,
      health_check_impl: async () => true,
      is_process_running_impl: () => true,
      now: () => '2026-04-17T03:00:00.000Z'
    });

    await supervisor.acquireOwnership({ port: 4100 });
    const job = await supervisor.createJob({
      command: 'bd-ralph-v2',
      issueId: 'UI-qclw',
      workspace: root_dir
    });
    if (!job) {
      throw new Error('job was not created');
    }

    expect(job.status).toBe('running');
    expect(job.pid).toBe(4321);

    runner_stub.child.emit('close', 0);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(supervisor.getJob(job.id)?.status).toBe('succeeded');
    expect(
      supervisor
        .getEvents(job.id)
        .map((event) => event.event_type)
        .slice(-1)[0]
    ).toBe('job.exited');
  });

  test('moves running job into cancelling and cancelled during cancel flow', async () => {
    const root_dir = mkdtemp();
    const store = createJobStore({ root_dir, now: () => '2026-04-17T03:00:00.000Z' });
    const runner_stub = createRunnerStub();
    const supervisor = createWorkerSupervisor({
      root_dir,
      store,
      runner: runner_stub.runner,
      owner_pid: 9002,
      health_check_impl: async () => true,
      is_process_running_impl: () => true,
      now: () => '2026-04-17T03:00:00.000Z'
    });

    await supervisor.acquireOwnership({ port: 4101 });
    const job = await supervisor.createJob({
      command: 'bd-ralph-v2',
      issueId: 'UI-qclw',
      workspace: root_dir
    });
    if (!job) {
      throw new Error('job was not created');
    }

    const cancelled = await supervisor.cancelJob(job.id, { grace_timeout_ms: 250 });

    expect(cancelled.status).toBe('cancelled');
    expect(cancelled.cancel_requested_at).toBe('2026-04-17T03:00:00.000Z');
    expect(cancelled.grace_deadline_at).toBe('2026-04-17T03:00:00.250Z');
  });

  test('records job.killed when runner reports forced cancellation', async () => {
    const root_dir = mkdtemp();
    const store = createJobStore({ root_dir, now: () => '2026-04-17T03:00:00.000Z' });
    const child = /** @type {any} */ (new EventEmitter());
    child.unref = () => {};
    const supervisor = createWorkerSupervisor({
      root_dir,
      store,
      runner: {
        startJob() {
          return { pid: 4321, child };
        },
        async cancelJob() {
          return { ok: true, forced: true };
        }
      },
      owner_pid: 9005,
      health_check_impl: async () => true,
      is_process_running_impl: () => true,
      now: () => '2026-04-17T03:00:00.000Z'
    });

    await supervisor.acquireOwnership({ port: 4103 });
    const job = await supervisor.createJob({
      command: 'bd-ralph-v2',
      issueId: 'UI-qclw',
      workspace: root_dir
    });
    if (!job) {
      throw new Error('job was not created');
    }

    await supervisor.cancelJob(job.id, { grace_timeout_ms: 250 });

    expect(
      supervisor.getEvents(job.id).some((event) => event.event_type === 'job.killed')
    ).toBe(true);
  });

  test('marks stale active job as failed during reconcile', async () => {
    const root_dir = mkdtemp();
    const store = createJobStore({ root_dir, now: () => '2026-04-17T03:00:00.000Z' });
    const job = store.createJob({
      command: 'bd-ralph-v2',
      issueId: 'UI-qclw',
      workspace: root_dir
    });
    store.updateJob(job.id, {
      status: 'running',
      pid: 999999,
      started_at: '2026-04-17T03:00:00.000Z'
    });
    const supervisor = createWorkerSupervisor({
      root_dir,
      store,
      owner_pid: 9003,
      health_check_impl: async () => true,
      is_process_running_impl: () => false,
      now: () => '2026-04-17T03:05:00.000Z'
    });

    await supervisor.reconcileJobs();

    expect(supervisor.getJob(job.id)?.status).toBe('failed');
  });

  test('takes over stale owner when health check fails for live pid', async () => {
    const root_dir = mkdtemp();
    const store = createJobStore({ root_dir, now: () => '2026-04-17T03:00:00.000Z' });
    const lock_path = store.paths.lock_path;
    fs.mkdirSync(path.dirname(lock_path), { recursive: true });
    fs.writeFileSync(
      lock_path,
      JSON.stringify({ pid: 1111, port: 4099, acquired_at: '2026-04-17T02:59:00.000Z' })
    );
    const supervisor = createWorkerSupervisor({
      root_dir,
      store,
      owner_pid: 9004,
      health_check_impl: async () => false,
      is_process_running_impl: (pid) => pid === 1111,
      now: () => '2026-04-17T03:00:00.000Z'
    });

    const ownership = await supervisor.acquireOwnership({ port: 4102 });
    const owner_record = JSON.parse(fs.readFileSync(lock_path, 'utf8'));

    expect(ownership.took_over).toBe(true);
    expect(owner_record.pid).toBe(9004);
    expect(owner_record.port).toBe(4102);
  });
});
