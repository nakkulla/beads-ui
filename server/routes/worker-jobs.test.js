import { createServer } from 'node:http';
import path from 'node:path';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const enqueueJob = vi.fn();
const listJobs = vi.fn();
const getJob = vi.fn();
const cancelJob = vi.fn();
const getJobLog = vi.fn();

vi.mock('../worker/jobs.js', () => ({
  getWorkerJobManager() {
    return {
      enqueueJob,
      listJobs,
      getJob,
      cancelJob,
      getJobLog
    };
  }
}));

/**
 * @param {import('node:http').Server} server
 */
async function listen(server) {
  await new Promise((resolve) => {
    server.listen({ port: 0, host: '127.0.0.1' }, () => resolve(undefined));
  });
  return /** @type {import('node:net').AddressInfo} */ (server.address());
}

/**
 * @param {import('node:http').Server} server
 */
async function close(server) {
  if (!server.listening) {
    return;
  }
  await new Promise((resolve, reject) => {
    /**
     * @param {Error | undefined | null} error
     */
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(undefined);
    });
  });
}

describe('worker jobs route', () => {
  const app_dir = path.resolve('app');
  const root_dir = '/workspace-root';
  const allowed_workspace = path.join(root_dir, '.worktrees', 'ui-qclw-worker');

  beforeEach(() => {
    enqueueJob.mockReset();
    listJobs.mockReset();
    getJob.mockReset();
    cancelJob.mockReset();
    getJobLog.mockReset();
  });

  test('POST /api/worker/jobs enqueues bd-ralph-v2 issue job', async () => {
    enqueueJob.mockResolvedValueOnce({
      id: 'job-1',
      command: 'bd-ralph-v2',
      status: 'running',
      issueId: 'UI-qclw',
      workspace: allowed_workspace
    });

    const { createApp } = await import('../app.js');
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir,
      frontend_mode: 'static'
    });
    const server = createServer(app);
    let response;
    let body;

    try {
      const address = await listen(server);
      response = await fetch(`http://127.0.0.1:${address.port}/api/worker/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: 'bd-ralph-v2',
          issueId: 'UI-qclw',
          workspace: allowed_workspace
        })
      });
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(202);
    expect(body.command).toBe('bd-ralph-v2');
  });

  test('GET /api/worker/jobs returns worker items for workspace', async () => {
    listJobs.mockResolvedValueOnce([
      {
        id: 'job-1',
        command: 'bd-ralph-v2',
        status: 'running',
        issueId: 'UI-qclw',
        workspace: allowed_workspace,
        elapsedMs: 1200,
        isCancellable: true
      }
    ]);

    const { createApp } = await import('../app.js');
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir,
      frontend_mode: 'static'
    });
    const server = createServer(app);
    let response;
    let body;

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/jobs?workspace=${encodeURIComponent(allowed_workspace)}`
      );
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(body.items[0].elapsedMs).toBe(1200);
    expect(body.items[0].isCancellable).toBe(true);
  });

  test('GET /api/worker/jobs/:jobId returns 404 for cross-workspace detail access', async () => {
    getJob.mockResolvedValueOnce({
      id: 'job-1',
      workspace: '/other-workspace',
      status: 'running'
    });

    const { createApp } = await import('../app.js');
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir,
      frontend_mode: 'static'
    });
    const server = createServer(app);
    let response;

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/jobs/job-1?workspace=${encodeURIComponent(allowed_workspace)}`
      );
    } finally {
      await close(server);
    }

    expect(response.status).toBe(404);
  });

  test('POST /api/worker/jobs/:jobId/cancel cancels active job in workspace', async () => {
    getJob.mockResolvedValueOnce({
      id: 'job-1',
      workspace: allowed_workspace,
      status: 'running'
    });
    cancelJob.mockResolvedValueOnce({
      id: 'job-1',
      status: 'cancelled',
      workspace: allowed_workspace
    });

    const { createApp } = await import('../app.js');
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir,
      frontend_mode: 'static'
    });
    const server = createServer(app);
    let response;
    let body;

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/jobs/job-1/cancel`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workspace: allowed_workspace })
        }
      );
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(body.item.status).toBe('cancelled');
  });

  test('GET /api/worker/jobs/:jobId/log validates tail range', async () => {
    const { createApp } = await import('../app.js');
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir,
      frontend_mode: 'static'
    });
    const server = createServer(app);
    let response;

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/jobs/job-1/log?workspace=${encodeURIComponent(allowed_workspace)}&tail=0`
      );
    } finally {
      await close(server);
    }

    expect(response.status).toBe(400);
  });
});
