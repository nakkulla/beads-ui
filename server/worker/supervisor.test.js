import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { createJobStore } from './job-store.js';
import {
  createWorkerSupervisor,
  createWorkerSupervisorServer
} from './supervisor.js';

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
    const store = createJobStore({
      root_dir,
      now: () => '2026-04-17T03:00:00.000Z'
    });
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

  test('marks job failed when runner.startJob throws synchronously', async () => {
    const root_dir = mkdtemp();
    const store = createJobStore({
      root_dir,
      now: () => '2026-04-17T03:00:00.000Z'
    });
    const supervisor = createWorkerSupervisor({
      root_dir,
      store,
      runner: {
        startJob() {
          throw new Error('spawn failed');
        },
        async cancelJob() {
          return true;
        }
      },
      owner_pid: 9000,
      health_check_impl: async () => true,
      is_process_running_impl: () => true,
      now: () => '2026-04-17T03:00:00.000Z'
    });

    await supervisor.acquireOwnership({ port: 4199 });
    await expect(
      supervisor.createJob({
        command: 'bd-ralph-v2',
        issueId: 'UI-qclw',
        workspace: root_dir
      })
    ).rejects.toMatchObject({ code: 'start_failed' });

    const failed_job = store.listJobs()[0];
    expect(failed_job.status).toBe('failed');
    expect(
      store.findActiveConflict({ workspace: root_dir, issueId: 'UI-qclw' })
    ).toBeNull();
  });

  test('moves running job into cancelling and cancelled during cancel flow', async () => {
    const root_dir = mkdtemp();
    const store = createJobStore({
      root_dir,
      now: () => '2026-04-17T03:00:00.000Z'
    });
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
    const cancelled = await supervisor.cancelJob(job.id, {
      grace_timeout_ms: 250
    });

    expect(cancelled.status).toBe('cancelled');
    expect(cancelled.cancel_requested_at).toBe('2026-04-17T03:00:00.000Z');
    expect(cancelled.grace_deadline_at).toBe('2026-04-17T03:00:00.250Z');
  });

  test('records job.killed when runner reports forced cancellation', async () => {
    const root_dir = mkdtemp();
    const store = createJobStore({
      root_dir,
      now: () => '2026-04-17T03:00:00.000Z'
    });
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
    await supervisor.cancelJob(job.id, { grace_timeout_ms: 250 });

    expect(
      supervisor
        .getEvents(job.id)
        .some((event) => event.event_type === 'job.killed')
    ).toBe(true);
    expect(supervisor.getJob(job.id)?.status).toBe('cancelled');
  });

  test('keeps job active when cancel fails and lets later exit decide final status', async () => {
    const root_dir = mkdtemp();
    const store = createJobStore({
      root_dir,
      now: () => '2026-04-17T03:00:00.000Z'
    });
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
          return { ok: false, forced: false };
        }
      },
      owner_pid: 9006,
      health_check_impl: async () => true,
      is_process_running_impl: () => true,
      now: () => '2026-04-17T03:00:00.000Z'
    });

    await supervisor.acquireOwnership({ port: 4104 });
    const job = await supervisor.createJob({
      command: 'bd-ralph-v2',
      issueId: 'UI-qclw',
      workspace: root_dir
    });
    const updated = await supervisor.cancelJob(job.id, {
      grace_timeout_ms: 250
    });

    expect(updated.status).toBe('running');
    expect(updated.cancel_requested_at).toBeNull();
    expect(
      supervisor
        .getEvents(job.id)
        .some((event) => event.event_type === 'job.cancel_failed')
    ).toBe(true);

    child.emit('close', 0);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(supervisor.getJob(job.id)?.status).toBe('succeeded');
  });

  test('marks stale active job as failed during reconcile', async () => {
    const root_dir = mkdtemp();
    const store = createJobStore({
      root_dir,
      now: () => '2026-04-17T03:00:00.000Z'
    });
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

  test('updates heartbeat without appending reconcile events for active job', async () => {
    const root_dir = mkdtemp();
    let current_time = '2026-04-17T03:00:00.000Z';
    const store = createJobStore({
      root_dir,
      now: () => current_time
    });
    const job = store.createJob({
      command: 'bd-ralph-v2',
      issueId: 'UI-qclw',
      workspace: root_dir
    });
    store.updateJob(job.id, {
      status: 'running',
      pid: 4321,
      started_at: current_time
    });
    const supervisor = createWorkerSupervisor({
      root_dir,
      store,
      owner_pid: 9007,
      health_check_impl: async () => true,
      is_process_running_impl: () => true,
      now: () => current_time
    });
    const event_count_before = supervisor.getEvents(job.id).length;

    current_time = '2026-04-17T03:05:00.000Z';
    await supervisor.reconcileJobs();

    expect(supervisor.getEvents(job.id)).toHaveLength(event_count_before);
    expect(supervisor.getJob(job.id)?.last_heartbeat_at).toBe(current_time);
  });

  test('takes over stale owner when health check fails for live pid', async () => {
    const root_dir = mkdtemp();
    const store = createJobStore({
      root_dir,
      now: () => '2026-04-17T03:00:00.000Z'
    });
    const lock_path = store.paths.lock_path;
    fs.mkdirSync(path.dirname(lock_path), { recursive: true });
    fs.writeFileSync(
      lock_path,
      JSON.stringify({
        pid: 1111,
        port: 4099,
        acquired_at: '2026-04-17T02:59:00.000Z'
      })
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

  test('closes listener when ownership acquisition fails during start', async () => {
    const root_dir = mkdtemp();
    const runtime = createWorkerSupervisorServer({
      root_dir,
      supervisor: /** @type {any} */ ({
        async acquireOwnership() {
          throw Object.assign(new Error('already active'), {
            code: 'conflict'
          });
        },
        async reconcileJobs() {},
        listJobs() {
          return [];
        },
        getJob() {
          return null;
        },
        getEvents() {
          return [];
        },
        getJobLog() {
          return { path: '', tail: [], truncated: false };
        },
        async createJob() {
          throw new Error('not used');
        },
        async cancelJob() {
          throw new Error('not used');
        },
        async close() {},
        releaseOwnership() {},
        store: {}
      })
    });

    await expect(runtime.start()).rejects.toMatchObject({ code: 'conflict' });
  });
});
