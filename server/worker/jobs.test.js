import { describe, expect, test, vi } from 'vitest';
import { createWorkerJobManager } from './jobs.js';

describe('worker job manager gateway', () => {
  test('delegates list/detail/cancel/log and queue calls to the supervisor client', async () => {
    const client = {
      listJobs: vi.fn(async () => [{ id: 'job-1', status: 'running' }]),
      getJob: vi.fn(async () => ({ id: 'job-1', workspace: '/repo' })),
      cancelJob: vi.fn(async () => ({ id: 'job-1', status: 'cancelled' })),
      getJobLog: vi.fn(async () => ({
        path: 'log',
        tail: ['line'],
        truncated: false
      })),
      getQueueSnapshot: vi.fn(async () => ({ paused: false })),
      moveCard: vi.fn(async () => ({ ok: true })),
      setPaused: vi.fn(async () => ({ paused: true })),
      startGoal: vi.fn(async () => ({ id: 'job-goal' })),
      finishNow: vi.fn(async () => ({ ok: true })),
      cancelAutoPrFinish: vi.fn(async () => ({ ok: true })),
      cancelReviewWaitJob: vi.fn(async () => ({ ok: true })),
      runPrFinish: vi.fn(async () => ({ ok: true })),
      skipAdvance: vi.fn(async () => ({ ok: true })),
      cancelAutoStart: vi.fn(async () => ({ ok: true })),
      setWorkerOverrides: vi.fn(async () => ({ ok: true })),
      listWorkerEvents: vi.fn(async () => [{ seq: 1 }])
    };
    const manager = createWorkerJobManager({ root_dir: '/repo', client });

    const items = await manager.listJobs({ workspace: '/repo' });
    const detail = await manager.getJob({ jobId: 'job-1' });
    const cancelled = await manager.cancelJob({ jobId: 'job-1' });
    const log = await manager.getJobLog({ jobId: 'job-1', tail: 20 });
    const snapshot = await manager.getQueueSnapshot({ workspace: '/repo' });
    const moved = await manager.moveCard({
      workspace: '/repo',
      issueId: 'UI-A',
      fromLane: 'inbox',
      toLane: 'waiting'
    });
    const paused = await manager.setPaused({
      workspace: '/repo',
      paused: true
    });
    const goal = await manager.startGoal({
      workspace: '/repo',
      issueId: 'UI-A'
    });
    const cancelled_wait = await manager.cancelReviewWaitJob({
      workspace: '/repo',
      issueId: 'UI-A'
    });
    const events = await manager.listWorkerEvents({
      workspace: '/repo',
      since: 0
    });

    expect(client.listJobs).toHaveBeenCalledWith({ workspace: '/repo' });
    expect(client.getJob).toHaveBeenCalledWith({ jobId: 'job-1' });
    expect(client.cancelJob).toHaveBeenCalledWith({ jobId: 'job-1' });
    expect(client.getJobLog).toHaveBeenCalledWith({ jobId: 'job-1', tail: 20 });
    expect(client.getQueueSnapshot).toHaveBeenCalledWith({
      workspace: '/repo'
    });
    expect(client.moveCard).toHaveBeenCalledWith({
      workspace: '/repo',
      issueId: 'UI-A',
      fromLane: 'inbox',
      toLane: 'waiting'
    });
    expect(client.setPaused).toHaveBeenCalledWith({
      workspace: '/repo',
      paused: true
    });
    expect(client.startGoal).toHaveBeenCalledWith({
      workspace: '/repo',
      issueId: 'UI-A'
    });
    expect(client.cancelReviewWaitJob).toHaveBeenCalledWith({
      workspace: '/repo',
      issueId: 'UI-A'
    });
    expect(client.listWorkerEvents).toHaveBeenCalledWith({
      workspace: '/repo',
      since: 0
    });
    expect(items).toHaveLength(1);
    expect(detail.workspace).toBe('/repo');
    expect(cancelled.status).toBe('cancelled');
    expect(log.tail).toEqual(['line']);
    expect(snapshot.paused).toBe(false);
    expect(moved.ok).toBe(true);
    expect(paused.paused).toBe(true);
    expect(goal.id).toBe('job-goal');
    expect(cancelled_wait.ok).toBe(true);
    expect(events).toEqual([{ seq: 1 }]);
  });

  test('fails early when managed supervisor daemon does not start', async () => {
    vi.resetModules();
    vi.doMock('../cli/daemon.js', () => ({
      startManagedDaemon: vi.fn(() => null)
    }));

    const fetch_spy = vi.fn(async () => {
      throw new Error('fetch should not be called');
    });
    vi.stubGlobal('fetch', fetch_spy);

    const { getWorkerJobManager } = await import('./jobs.js');
    const manager = getWorkerJobManager({ root_dir: '/repo-start-failure' });

    await expect(
      manager.listJobs({ workspace: '/repo-start-failure' })
    ).rejects.toMatchObject({ code: 'start_failed' });
    expect(fetch_spy).not.toHaveBeenCalled();

    vi.unstubAllGlobals();
    vi.resetModules();
  });
});
