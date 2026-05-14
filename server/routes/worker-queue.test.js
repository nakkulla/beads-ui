import { createServer } from 'node:http';
import { afterEach, describe, expect, test, vi } from 'vitest';

const getQueueSnapshot = vi.fn();
const moveCard = vi.fn();
const setPaused = vi.fn();
const startGoal = vi.fn();
const listWorkerEvents = vi.fn();

vi.mock('../worker/jobs.js', () => ({
  getWorkerJobManager: () => ({
    getQueueSnapshot,
    moveCard,
    setPaused,
    startGoal,
    listWorkerEvents,
    finishNow: vi.fn(),
    cancelAutoPrFinish: vi.fn(),
    runPrFinish: vi.fn(),
    skipAdvance: vi.fn(),
    cancelAutoStart: vi.fn(),
    setWorkerOverrides: vi.fn()
  })
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
    /** @param {Error | undefined | null} error */
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(undefined);
    });
  });
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('worker queue route', () => {
  test('GET /api/worker/queue returns queue snapshot', async () => {
    getQueueSnapshot.mockResolvedValueOnce({
      paused: false,
      countdown: null,
      pr_review_waits: {}
    });
    const { createApp } = await import('../app.js');
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir: '.',
      root_dir: process.cwd(),
      frontend_mode: 'static'
    });
    const server = createServer(app);
    let response;
    let body;

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/queue?workspace=${encodeURIComponent(process.cwd())}`
      );
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(body.paused).toBe(false);
    expect(getQueueSnapshot).toHaveBeenCalledWith({ workspace: process.cwd() });
  });

  test('POST /api/worker/queue/move persists card move', async () => {
    moveCard.mockResolvedValueOnce({ ok: true });
    const { createApp } = await import('../app.js');
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir: '.',
      root_dir: process.cwd(),
      frontend_mode: 'static'
    });
    const server = createServer(app);
    let response;

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/queue/move`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            workspace: process.cwd(),
            issueId: 'UI-A',
            fromLane: 'inbox',
            toLane: 'waiting',
            beforeId: null,
            afterId: null
          })
        }
      );
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(moveCard).toHaveBeenCalledWith({
      issueId: 'UI-A',
      fromLane: 'inbox',
      toLane: 'waiting',
      beforeId: null,
      afterId: null,
      workspace: process.cwd()
    });
  });

  test('POST /api/worker/queue/start calls startGoal after validation', async () => {
    startGoal.mockResolvedValueOnce({ id: 'job-goal' });
    const { createApp } = await import('../app.js');
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir: '.',
      root_dir: process.cwd(),
      frontend_mode: 'static'
    });
    const server = createServer(app);
    let response;

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/queue/start`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workspace: process.cwd(), issueId: 'UI-A' })
        }
      );
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(startGoal).toHaveBeenCalledWith({
      issueId: 'UI-A',
      workspace: process.cwd()
    });
  });
});
