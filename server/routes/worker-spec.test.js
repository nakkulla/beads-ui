import fs from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const readWorkerSpec = vi.fn();
const writeWorkerSpec = vi.fn();

vi.mock('../worker/spec-reader.js', () => ({
  readWorkerSpec
}));

vi.mock('../worker/spec-writer.js', () => ({
  writeWorkerSpec
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

describe('worker spec route', () => {
  const app_dir = path.resolve('app');

  beforeEach(() => {
    readWorkerSpec.mockReset();
    writeWorkerSpec.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('GET /api/worker/spec/:issueId returns spec content', async () => {
    readWorkerSpec.mockResolvedValueOnce({
      issue_id: 'UI-62lm',
      spec_id: 'docs/spec.md',
      content: '# Worker spec'
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
        `http://127.0.0.1:${address.port}/api/worker/spec/UI-62lm`
      );
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(body.content).toBe('# Worker spec');
  });

  test('GET /api/worker/spec/:issueId returns 404 when spec is missing', async () => {
    readWorkerSpec.mockRejectedValueOnce(
      Object.assign(new Error('No spec linked'), { code: 'no_spec' })
    );

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

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/spec/UI-missing`
      );
    } finally {
      await close(server);
    }

    expect(response.status).toBe(404);
  });

  test('PUT /api/worker/spec/:issueId updates spec content', async () => {
    writeWorkerSpec.mockResolvedValueOnce({
      issue_id: 'UI-62lm',
      spec_id: 'docs/spec.md',
      content: '# Updated'
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
        `http://127.0.0.1:${address.port}/api/worker/spec/UI-62lm`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: '# Updated' })
        }
      );
      body = await response.json();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(body.content).toBe('# Updated');
  });

  test('PUT /api/worker/spec/:issueId returns 403 on path violation', async () => {
    writeWorkerSpec.mockRejectedValueOnce(
      Object.assign(new Error('Forbidden path'), { code: 'forbidden' })
    );

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

    try {
      const address = await listen(server);
      response = await fetch(
        `http://127.0.0.1:${address.port}/api/worker/spec/UI-62lm`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: '# Updated' })
        }
      );
    } finally {
      await close(server);
    }

    expect(response.status).toBe(403);
  });
});
