/**
 * The merge-lock endpoint is retired with the merge axis (worker-phase2 §2/§11
 * item 3): sessions never merge, so `/api/worker/merge-lock` must not be mounted
 * at all — a request to it falls through to the static handler as a plain 404.
 */
import { createServer } from 'node:http';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { createApp } from './app.js';

/**
 * Run one request against a freshly built app.
 *
 * @param {string} route
 * @param {RequestInit} [init]
 * @returns {Promise<number>} The response status.
 */
async function statusFor(route, init) {
  const app = createApp({
    host: '127.0.0.1',
    port: 0,
    app_dir: path.resolve('app'),
    root_dir: process.cwd(),
    frontend_mode: 'static'
  });
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, () => resolve(undefined)));
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('no address');
  }
  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}${route}`,
      init
    );
    return response.status;
  } finally {
    await new Promise((resolve) => server.close(() => resolve(undefined)));
  }
}

describe('/api/worker/merge-lock is gone', () => {
  test('returns 404 for an acquire POST', async () => {
    const status = await statusFor('/api/worker/merge-lock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer whatever'
      },
      body: JSON.stringify({ repo: '/repo', target_base: 'main' })
    });

    expect(status).toBe(404);
  });

  test('returns 404 for a release POST', async () => {
    const status = await statusFor('/api/worker/merge-lock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        repo: '/repo',
        target_base: 'main',
        action: 'release'
      })
    });

    expect(status).toBe(404);
  });

  test('returns 404 for a GET', async () => {
    const status = await statusFor('/api/worker/merge-lock');

    expect(status).toBe(404);
  });
});
