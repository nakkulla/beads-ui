import express from 'express';
import { createServer } from 'node:http';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  __resetCacheForTest,
  createClaudeUsageHandler,
  normalizeClaudeUsage
} from './claude-usage.js';

/**
 * @param {Record<string, unknown>} [overrides]
 */
function activeAccount(overrides = {}) {
  return {
    active: true,
    email: 'user@example.com',
    usage: {
      fiveHour: { pct: 26, resetsAt: '2026-08-06T03:09:59Z' },
      sevenDay: { pct: 74, resetsAt: '2026-08-09T15:59:59Z' },
      scoped: [{ name: 'Fable', pct: 46, resetsAt: '2026-08-09T16:00:00Z' }]
    },
    usageFetchedAt: '2026-08-06T02:16:46Z',
    usageAgeSeconds: 209,
    ...overrides
  };
}

/**
 * @param {() => Promise<{ code: number, stdout: string, stderr: string }>} runCswap
 * @param {() => number} [now]
 */
async function requestUsage(runCswap, now) {
  const app = express();
  app.get(
    '/api/claude-usage',
    createClaudeUsageHandler({ runCswap, now: now || (() => Date.now()) })
  );
  const server = createServer(app);
  await new Promise((resolve) => {
    server.listen({ port: 0, host: '127.0.0.1' }, () => resolve(undefined));
  });
  const address = /** @type {import('node:net').AddressInfo} */ (
    server.address()
  );

  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/api/claude-usage`
    );
    return {
      status: response.status,
      cache_control: response.headers.get('cache-control'),
      body: await response.json()
    };
  } finally {
    await new Promise((resolve) => server.close(() => resolve(undefined)));
  }
}

afterEach(() => {
  __resetCacheForTest();
});

describe('claude usage normalization', () => {
  test('selects the active account and preserves window order', () => {
    const payload = normalizeClaudeUsage({
      schemaVersion: 1,
      activeAccountNumber: 2,
      accounts: [
        { ...activeAccount(), active: false, email: 'old@example.com' },
        activeAccount()
      ]
    });

    expect(payload).toEqual({
      available: true,
      email: 'user@example.com',
      windows: [
        { key: '5h', pct: 26, resetsAt: '2026-08-06T03:09:59Z' },
        { key: '7d', pct: 74, resetsAt: '2026-08-09T15:59:59Z' },
        { key: 'Fable', pct: 46, resetsAt: '2026-08-09T16:00:00Z' }
      ],
      fetchedAt: '2026-08-06T02:16:46Z',
      ageSeconds: 209
    });
  });

  test('returns unavailable when a required usage window is missing', () => {
    const account = activeAccount();
    const usage = /** @type {any} */ (account.usage);
    delete usage.fiveHour;

    const payload = normalizeClaudeUsage({ accounts: [account] });

    expect(payload).toEqual({ available: false });
  });
});

describe('GET /api/claude-usage', () => {
  test('returns a normalized successful response without HTTP caching', async () => {
    const runCswap = vi.fn().mockResolvedValue({
      code: 0,
      stdout: JSON.stringify({ accounts: [activeAccount()] }),
      stderr: ''
    });

    const response = await requestUsage(runCswap);

    expect(response.status).toBe(200);
    expect(response.cache_control).toBe('no-store');
    expect(response.body).toMatchObject({
      available: true,
      email: 'user@example.com',
      windows: [
        { key: '5h', pct: 26 },
        { key: '7d', pct: 74 },
        { key: 'Fable', pct: 46 }
      ]
    });
  });

  test('returns unavailable when cswap cannot be spawned', async () => {
    const runCswap = vi.fn().mockRejectedValue(new Error('spawn ENOENT'));

    const response = await requestUsage(runCswap);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ available: false });
  });

  test('negative-caches an unavailable response for 30 seconds', async () => {
    const runCswap = vi.fn().mockRejectedValue(new Error('spawn ENOENT'));

    const first = await requestUsage(runCswap);
    const second = await requestUsage(runCswap);

    expect(first.body).toEqual({ available: false });
    expect(second.body).toEqual({ available: false });
    expect(runCswap).toHaveBeenCalledTimes(1);
  });

  test('reuses one spawn until the 30 second TTL expires', async () => {
    let clock = 1_000;
    const now = () => clock;
    const runCswap = vi.fn().mockResolvedValue({
      code: 0,
      stdout: JSON.stringify({ accounts: [activeAccount()] }),
      stderr: ''
    });

    await requestUsage(runCswap, now);
    clock += 29_999;
    await requestUsage(runCswap, now);
    clock += 1;
    await requestUsage(runCswap, now);

    expect(runCswap).toHaveBeenCalledTimes(2);
  });

  test('coalesces concurrent cache misses into one spawn', async () => {
    const result = {
      code: 0,
      stdout: JSON.stringify({ accounts: [activeAccount()] }),
      stderr: ''
    };
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(result);
    });
    const runCswap = vi.fn(() => gate);

    const responses = Promise.all([
      requestUsage(runCswap),
      requestUsage(runCswap),
      requestUsage(runCswap)
    ]);
    await vi.waitFor(() => expect(runCswap).toHaveBeenCalled());
    release();
    await responses;

    expect(runCswap).toHaveBeenCalledTimes(1);
  });
});
