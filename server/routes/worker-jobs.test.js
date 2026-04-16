import { createServer } from 'node:http';
import path from 'node:path';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const enqueueJob = vi.fn();
const listJobs = vi.fn();

vi.mock('../worker/jobs.js', () => ({
  getWorkerJobManager() {
    return {
      enqueueJob,
      listJobs
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
  const allowed_workspace = path.join(root_dir, '.worktrees', 'ui-62lm-worker');

  beforeEach(() => {
    enqueueJob.mockReset();
    listJobs.mockReset();
  });

  test('POST /api/worker/jobs enqueues bd-ralph-v2 issue job', async () => {
    enqueueJob.mockResolvedValueOnce({
      id: 'job-1',
      command: 'bd-ralph-v2',
      status: 'queued',
      issueId: 'UI-62lm',
      workspace: '/workspace'
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
        `http://127.0.0.1:${address.port}/api/worker/jobs`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            command: 'bd-ralph-v2',
            issueId: 'UI-62lm',
            workspace: allowed_workspace
          })
        }
      );
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(202);
    expect(body.command).toBe('bd-ralph-v2');
  });

  test('POST /api/worker/jobs enqueues pr-review with explicit PR target', async () => {
    enqueueJob.mockResolvedValueOnce({
      id: 'job-2',
      command: 'pr-review',
      status: 'queued',
      issueId: 'UI-62lm',
      workspace: '/workspace',
      prNumber: 42
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
        `http://127.0.0.1:${address.port}/api/worker/jobs`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            command: 'pr-review',
            issueId: 'UI-62lm',
            workspace: allowed_workspace,
            prNumber: 42
          })
        }
      );
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(202);
    expect(body.prNumber).toBe(42);
  });

  test('GET /api/worker/jobs returns sanitized jobs', async () => {
    listJobs.mockReturnValueOnce([
      {
        id: 'job-1',
        command: 'bd-ralph-v2',
        status: 'running',
        issueId: 'UI-62lm',
        workspace: '/workspace'
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
        `http://127.0.0.1:${address.port}/api/worker/jobs?workspace=${encodeURIComponent('/workspace')}`
      );
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(body.items[0].status).toBe('running');
  });

  test('POST /api/worker/jobs returns 409 for duplicate active parent job', async () => {
    enqueueJob.mockRejectedValueOnce(
      Object.assign(new Error('Conflict'), { code: 'conflict' })
    );

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
        `http://127.0.0.1:${address.port}/api/worker/jobs`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            command: 'bd-ralph-v2',
            issueId: 'UI-62lm',
            workspace: allowed_workspace
          })
        }
      );
    } finally {
      await close(server);
    }

    expect(response.status).toBe(409);
  });

  test('POST /api/worker/jobs rejects workspace outside allowed root', async () => {
    const { createApp } = await import('../app.js');
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir: '/workspace-root',
      frontend_mode: 'static'
    });
    const server = createServer(app);
    let response;
    let body;

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/jobs`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            command: 'bd-ralph-v2',
            issueId: 'UI-62lm',
            workspace: '/tmp/evil-workspace'
          })
        }
      );
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(400);
    expect(body.error).toContain('workspace');
  });
});
