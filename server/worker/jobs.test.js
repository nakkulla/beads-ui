import { describe, expect, test, vi } from 'vitest';
import { createWorkerJobManager } from './jobs.js';

describe('worker job manager gateway', () => {
  test('delegates create/list/detail/cancel/log calls to the supervisor client', async () => {
    const client = {
      createJob: vi.fn(async () => ({ id: 'job-1', status: 'running' })),
      listJobs: vi.fn(async () => [{ id: 'job-1', status: 'running' }]),
      getJob: vi.fn(async () => ({ id: 'job-1', workspace: '/repo' })),
      cancelJob: vi.fn(async () => ({ id: 'job-1', status: 'cancelled' })),
      getJobLog: vi.fn(async () => ({ path: 'log', tail: ['line'], truncated: false }))
    };
    const manager = createWorkerJobManager({ root_dir: '/repo', client });

    const created = await manager.enqueueJob({
      command: 'bd-ralph-v2',
      issueId: 'UI-qclw',
      workspace: '/repo'
    });
    const items = await manager.listJobs({ workspace: '/repo' });
    const detail = await manager.getJob({ jobId: 'job-1' });
    const cancelled = await manager.cancelJob({ jobId: 'job-1' });
    const log = await manager.getJobLog({ jobId: 'job-1', tail: 20 });

    expect(client.createJob).toHaveBeenCalledWith({
      command: 'bd-ralph-v2',
      issueId: 'UI-qclw',
      workspace: '/repo'
    });
    expect(client.listJobs).toHaveBeenCalledWith({ workspace: '/repo' });
    expect(client.getJob).toHaveBeenCalledWith({ jobId: 'job-1' });
    expect(client.cancelJob).toHaveBeenCalledWith({ jobId: 'job-1' });
    expect(client.getJobLog).toHaveBeenCalledWith({ jobId: 'job-1', tail: 20 });
    expect(created.status).toBe('running');
    expect(items).toHaveLength(1);
    expect(detail.workspace).toBe('/repo');
    expect(cancelled.status).toBe('cancelled');
    expect(log.tail).toEqual(['line']);
  });
});
