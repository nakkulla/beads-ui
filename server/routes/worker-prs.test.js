import { createServer } from 'node:http';
import path from 'node:path';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const readIssuePullRequests = vi.fn();
const readWorkspacePullRequests = vi.fn();

vi.mock('../worker/pr-reader.js', () => ({
  readIssuePullRequests,
  readWorkspacePullRequests
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

describe('worker PR routes', () => {
  const app_dir = path.resolve('app');

  beforeEach(() => {
    readIssuePullRequests.mockReset();
    readWorkspacePullRequests.mockReset();
  });

  test('GET /api/worker/prs/:issueId returns selected parent PR items', async () => {
    readIssuePullRequests.mockResolvedValueOnce({
      items: [{ number: 42, title: 'Add Worker tab', state: 'OPEN' }]
    });

    const { createApp } = await import('../app.js');
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir: process.cwd(),
      frontend_mode: 'static'
    });
    const server = createServer(app);
    let response;
    let body;

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/prs/UI-62lm`
      );
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(body.items).toHaveLength(1);
    expect(body.items[0].number).toBe(42);
  });

  test('GET /api/worker/prs?workspace=... returns workspace-wide summary items', async () => {
    readWorkspacePullRequests.mockResolvedValueOnce({
      items: [{ number: 7, title: 'Workspace summary', state: 'OPEN' }]
    });

    const { createApp } = await import('../app.js');
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir: process.cwd(),
      frontend_mode: 'static'
    });
    const server = createServer(app);
    let response;
    let body;

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/prs?workspace=${encodeURIComponent('/workspace')}`
      );
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(body.items[0].number).toBe(7);
  });

  test('GET /api/worker/prs/:issueId returns all open PR items for the issue', async () => {
    readIssuePullRequests.mockResolvedValueOnce({
      items: [
        { number: 42, title: 'Add Worker tab', state: 'OPEN' },
        { number: 43, title: 'Fix Worker polish', state: 'OPEN' }
      ]
    });

    const { createApp } = await import('../app.js');
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir: process.cwd(),
      frontend_mode: 'static'
    });
    const server = createServer(app);
    let response;
    let body;

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/prs/UI-62lm`
      );
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(body.items).toHaveLength(2);
  });
});
