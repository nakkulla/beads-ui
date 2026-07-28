import { createServer } from 'node:http';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { createApp } from './app.js';

/**
 * @param {{ bd?: boolean, db?: boolean }} probes
 * @returns {Promise<{ status: number, body: any }>}
 */
async function getHealthz(probes) {
  const app = createApp({
    host: '127.0.0.1',
    port: 0,
    app_dir: path.resolve('app'),
    root_dir: process.cwd(),
    frontend_mode: 'static',
    health_probes: {
      bd_probe: () => probes.bd ?? true,
      db_probe: () => probes.db ?? true
    }
  });
  const server = createServer(app);
  // Bind the loopback address the fetch below targets (see
  // app.merge-lock-removed.test.js for why a wildcard bind is unsafe here).
  await new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve(undefined))
  );
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('no address');
  }
  try {
    // No Authorization header: /healthz must stay unauthenticated.
    const response = await fetch(`http://127.0.0.1:${address.port}/healthz`);
    const body = await response.json();
    return { status: response.status, body };
  } finally {
    await new Promise((resolve) => server.close(() => resolve(undefined)));
  }
}

describe('GET /healthz', () => {
  test('200 with checks when probes pass (unauthenticated)', async () => {
    const { status, body } = await getHealthz({ bd: true, db: true });
    expect(status).toBe(200);
    expect(body.ok).toBe(true);
    // worker is a live status object (auto_advance / running count).
    expect(body.checks.bd).toBe(true);
    expect(body.checks.db).toBe(true);
    expect(body.checks.worker).toEqual({
      auto_advance: false,
      running_count: 0
    });
  });

  test('the worker status omits the retired breaker_tripped field', async () => {
    const { body } = await getHealthz({ bd: true, db: true });

    expect('breaker_tripped' in body.checks.worker).toBe(false);
  });

  test('503 when the db probe fails', async () => {
    const { status, body } = await getHealthz({ bd: true, db: false });
    expect(status).toBe(503);
    expect(body.ok).toBe(false);
    expect(body.checks.db).toBe(false);
    expect(body.checks.worker.auto_advance).toBe(false);
  });

  test('503 when the bd probe fails', async () => {
    const { status, body } = await getHealthz({ bd: false, db: true });
    expect(status).toBe(503);
    expect(body.ok).toBe(false);
    expect(body.checks.bd).toBe(false);
  });
});
