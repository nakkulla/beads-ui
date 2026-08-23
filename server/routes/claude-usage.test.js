import express from 'express';
import { createServer } from 'node:http';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  __resetCacheForTest,
  createClaudeUsageHandler,
  invalidateCache,
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
 * An account row carrying the fields the multi-account card consumes.
 *
 * @param {Record<string, unknown>} [overrides]
 */
function accountRow(overrides = {}) {
  return { ...activeAccount(), number: 1, usageStatus: 'ok', ...overrides };
}

/**
 * @param {Record<string, unknown>} [overrides]
 */
function expiredRow(overrides = {}) {
  return accountRow({
    active: false,
    usageStatus: 'token_expired',
    usage: null,
    usageFetchedAt: null,
    usageAgeSeconds: null,
    ...overrides
  });
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

  test('treats a missing scoped array as no scoped windows', () => {
    const account = activeAccount();
    const usage = /** @type {any} */ (account.usage);
    delete usage.scoped;

    const payload = normalizeClaudeUsage({ accounts: [account] });

    expect(payload).toMatchObject({
      available: true,
      windows: [
        { key: '5h', pct: 26 },
        { key: '7d', pct: 74 }
      ]
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

describe('claude account rows', () => {
  test('lists the active account first and then ascending numbers', () => {
    const payload = normalizeClaudeUsage({
      accounts: [
        accountRow({ number: 3, active: false, email: 'c@example.com' }),
        accountRow({ number: 2, active: true, email: 'b@example.com' }),
        accountRow({ number: 1, active: false, email: 'a@example.com' })
      ]
    });

    expect(payload).toMatchObject({
      accounts: [{ number: 2 }, { number: 1 }, { number: 3 }]
    });
  });

  test('passes the cswap usageStatus through unchanged', () => {
    const payload = normalizeClaudeUsage({
      accounts: [accountRow(), expiredRow({ number: 2 })]
    });

    expect(payload).toMatchObject({
      accounts: [{ status: 'ok' }, { status: 'token_expired' }]
    });
  });

  test('empties windows and timestamps on a row that is not ok', () => {
    const payload = normalizeClaudeUsage({
      accounts: [expiredRow({ number: 2, alias: 'work' })]
    });

    expect(payload).toMatchObject({
      accounts: [
        {
          number: 2,
          alias: 'work',
          plan: null,
          windows: [],
          fetchedAt: null,
          ageSeconds: null
        }
      ]
    });
  });

  test('drops only the malformed row and keeps the rest', () => {
    const broken = accountRow({ number: 2, active: false });
    delete (/** @type {any} */ (broken).usage.fiveHour);

    const payload = normalizeClaudeUsage({
      accounts: [accountRow(), broken, accountRow({ number: 7, active: false })]
    });

    expect(payload).toMatchObject({
      accounts: [{ number: 1 }, { number: 7 }]
    });
  });

  test('returns account rows even when the active account is unavailable', () => {
    const payload = normalizeClaudeUsage({
      accounts: [expiredRow({ number: 1, active: true })]
    });

    expect(payload).toEqual({
      available: false,
      accounts: [
        {
          number: 1,
          email: 'user@example.com',
          alias: null,
          plan: null,
          active: true,
          status: 'token_expired',
          windows: [],
          fetchedAt: null,
          ageSeconds: null
        }
      ]
    });
  });
});

describe('claude usage cache invalidation', () => {
  test('runs a new process for a GET that arrives after invalidation', async () => {
    const runCswap = vi.fn().mockResolvedValue({
      code: 0,
      stdout: JSON.stringify({ accounts: [activeAccount()] }),
      stderr: ''
    });

    await requestUsage(runCswap);
    invalidateCache();
    await requestUsage(runCswap);

    expect(runCswap).toHaveBeenCalledTimes(2);
  });

  test('never caches a lookup that started before invalidation', async () => {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () =>
        resolve({
          code: 0,
          stdout: JSON.stringify({ accounts: [activeAccount()] }),
          stderr: ''
        });
    });
    const runCswap = vi
      .fn()
      .mockReturnValueOnce(gate)
      .mockResolvedValue({
        code: 0,
        stdout: JSON.stringify({ accounts: [activeAccount()] }),
        stderr: ''
      });

    const pending = requestUsage(runCswap);
    await vi.waitFor(() => expect(runCswap).toHaveBeenCalled());
    invalidateCache();
    release();
    await pending;
    await requestUsage(runCswap);

    expect(runCswap).toHaveBeenCalledTimes(2);
  });

  test('does not hand the pre-invalidation result to a later GET', async () => {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () =>
        resolve({
          code: 0,
          stdout: JSON.stringify({
            accounts: [activeAccount({ email: 'old@example.com' })]
          }),
          stderr: ''
        });
    });
    const runCswap = vi
      .fn()
      .mockReturnValueOnce(gate)
      .mockResolvedValue({
        code: 0,
        stdout: JSON.stringify({
          accounts: [activeAccount({ email: 'new@example.com' })]
        }),
        stderr: ''
      });

    const pending = requestUsage(runCswap);
    await vi.waitFor(() => expect(runCswap).toHaveBeenCalled());
    invalidateCache();
    const second = await requestUsage(runCswap);
    release();
    await pending;

    expect(second.body).toMatchObject({ email: 'new@example.com' });
  });
});
