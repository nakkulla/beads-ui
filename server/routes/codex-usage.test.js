import express from 'express';
import { EventEmitter } from 'node:events';
import { createServer } from 'node:http';
import { PassThrough } from 'node:stream';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  __resetCacheForTest,
  createCodexAuthRunner,
  createCodexUsageHandler,
  invalidateCache,
  listAccounts,
  normalizeCodexUsage
} from './codex-usage.js';

/**
 * @typedef {EventEmitter & { stdout: PassThrough, stderr: PassThrough, kill: import('vitest').Mock<(signal: NodeJS.Signals) => boolean> }} TestChild
 */

/**
 * @param {Record<string, unknown>} [overrides]
 */
function usageSnapshot(overrides = {}) {
  return {
    schema_version: 1,
    command: 'list',
    active_account_key: 'active-account',
    accounts: [
      {
        account_key: 'inactive-account',
        usage: { source: 'none' }
      },
      {
        account_key: 'active-account',
        email: 'private@example.com',
        credits: 42,
        usage: {
          source: 'api',
          updated_at: 1_786_334_358,
          primary: {
            used_percent: 26,
            window_minutes: 300,
            resets_at: 1_786_344_000
          },
          secondary: {
            used_percent: 74,
            window_minutes: 10_080,
            resets_at: 1_786_852_800
          },
          refresh: { status: 'ok', error: 'private detail' }
        }
      }
    ],
    ...overrides
  };
}

/**
 * An account row carrying the fields the multi-account card consumes.
 *
 * @param {Record<string, unknown>} [overrides]
 */
function accountRow(overrides = {}) {
  return {
    number: 1,
    account_key: 'account-1',
    email: 'user@example.com',
    alias: null,
    plan: 'pro',
    usage: {
      source: 'api',
      updated_at: 1_786_334_358,
      primary: {
        used_percent: 26,
        window_minutes: 300,
        resets_at: 1_786_344_000
      }
    },
    ...overrides
  };
}

/**
 * @param {unknown[]} accounts
 * @param {string} [active_account_key]
 */
function listSnapshot(accounts, active_account_key = 'account-1') {
  return {
    schema_version: 1,
    command: 'list',
    active_account_key,
    accounts
  };
}

/**
 * @param {() => Promise<{ code: number, stdout: string, stderr: string }>} runCodexAuth
 * @param {() => number} [now]
 */
async function requestUsage(runCodexAuth, now) {
  const app = express();
  app.get(
    '/api/codex-usage',
    createCodexUsageHandler({
      runCodexAuth,
      now: now || (() => 1_786_334_400_000)
    })
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
      `http://127.0.0.1:${address.port}/api/codex-usage`
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

/**
 * @param {(child: TestChild) => void} finish
 */
function spawnedChild(finish) {
  const child = /** @type {TestChild} */ (new EventEmitter());
  child.stdout = new PassThrough();
  child.stderr = new PassThrough();
  child.kill = vi.fn(
    (/** @type {NodeJS.Signals} */ signal) => signal === 'SIGKILL'
  );
  queueMicrotask(() => finish(child));
  return child;
}

afterEach(() => {
  __resetCacheForTest();
  vi.useRealTimers();
});

describe('codex usage normalization', () => {
  test('selects the active account and normalizes windows', () => {
    const payload = normalizeCodexUsage(
      usageSnapshot(),
      () => 1_786_334_400_000
    );

    expect(payload).toEqual({
      available: true,
      provider: 'codex',
      windows: [
        {
          key: '5h',
          pct: 26,
          resetsAt: new Date(1_786_344_000_000).toISOString()
        },
        {
          key: '7d',
          pct: 74,
          resetsAt: new Date(1_786_852_800_000).toISOString()
        }
      ],
      fetchedAt: new Date(1_786_334_358_000).toISOString(),
      ageSeconds: 42
    });
  });

  test('shows a valid cached snapshot after refresh failure', () => {
    const snapshot = usageSnapshot();
    const account = /** @type {any} */ (snapshot.accounts[1]);
    account.usage.source = 'cache';
    account.usage.refresh = { status: 'error', error: 'private detail' };

    const payload = normalizeCodexUsage(snapshot, () => 1_786_334_400_000);

    expect(payload).toMatchObject({ available: true, provider: 'codex' });
  });

  test('clamps negative snapshot age to zero', () => {
    const payload = normalizeCodexUsage(
      usageSnapshot(),
      () => 1_786_334_000_000
    );

    expect(payload).toMatchObject({ ageSeconds: 0 });
  });

  test.each([
    ['unknown schema', { schema_version: 2 }],
    ['wrong command', { command: 'status' }],
    ['missing active account', { active_account_key: 'missing' }]
  ])('returns unavailable for %s', (_name, overrides) => {
    const payload = normalizeCodexUsage(usageSnapshot(overrides));

    expect(payload).toEqual({ available: false });
  });

  test.each([
    ['none source', { source: 'none' }],
    ['missing primary', { primary: undefined }],
    [
      'invalid percent',
      {
        primary: {
          used_percent: 101,
          window_minutes: 300,
          resets_at: 1_786_344_000
        }
      }
    ],
    [
      'invalid epoch',
      { primary: { used_percent: 26, window_minutes: 300, resets_at: -1 } }
    ]
  ])('returns unavailable for %s', (_name, usage_overrides) => {
    const snapshot = usageSnapshot();
    const account = /** @type {any} */ (snapshot.accounts[1]);
    account.usage = { ...account.usage, ...usage_overrides };

    const payload = normalizeCodexUsage(snapshot);

    expect(payload).toEqual({ available: false });
  });

  test('omits identity, credits and refresh errors from the response', () => {
    const payload = normalizeCodexUsage(
      usageSnapshot(),
      () => 1_786_334_400_000
    );

    expect(payload).toEqual({
      available: true,
      provider: 'codex',
      windows: [
        {
          key: '5h',
          pct: 26,
          resetsAt: new Date(1_786_344_000_000).toISOString()
        },
        {
          key: '7d',
          pct: 74,
          resetsAt: new Date(1_786_852_800_000).toISOString()
        }
      ],
      fetchedAt: new Date(1_786_334_358_000).toISOString(),
      ageSeconds: 42
    });
  });
});

describe('codex-auth runner', () => {
  test('spawns list --json without a shell', async () => {
    const spawn_process = vi.fn(() =>
      spawnedChild((child) => child.emit('close', 0))
    );
    const runCodexAuth = createCodexAuthRunner({ spawn_process });

    await runCodexAuth();

    expect(spawn_process).toHaveBeenCalledWith(
      'codex-auth',
      ['list', '--json'],
      { shell: false, windowsHide: true }
    );
  });

  test('falls back to the user-local binary only after ENOENT', async () => {
    const spawn_process = vi
      .fn()
      .mockImplementationOnce(() =>
        spawnedChild((child) =>
          child.emit(
            'error',
            Object.assign(new Error('missing'), { code: 'ENOENT' })
          )
        )
      )
      .mockImplementationOnce(() =>
        spawnedChild((child) => child.emit('close', 0))
      );
    const runCodexAuth = createCodexAuthRunner({
      spawn_process,
      home_dir: '/private/home'
    });

    await runCodexAuth();

    expect(spawn_process).toHaveBeenNthCalledWith(
      2,
      '/private/home/.local/bin/codex-auth',
      ['list', '--json'],
      { shell: false, windowsHide: true }
    );
  });

  test('kills a process after ten seconds', async () => {
    vi.useFakeTimers();
    const child = spawnedChild(() => {});
    child.kill.mockImplementation(() => child.emit('close', null));
    const spawn_process = vi.fn(() => child);
    const runCodexAuth = createCodexAuthRunner({ spawn_process });

    const pending = runCodexAuth();
    await vi.advanceTimersByTimeAsync(10_000);
    const result = await pending;

    expect(child.kill).toHaveBeenCalledWith('SIGKILL');
    expect(result.code).toBe(124);
  });
});

describe('GET /api/codex-usage', () => {
  test('returns a normalized response without HTTP caching', async () => {
    const runCodexAuth = vi.fn().mockResolvedValue({
      code: 0,
      stdout: JSON.stringify(usageSnapshot()),
      stderr: ''
    });

    const response = await requestUsage(runCodexAuth);

    expect(response.status).toBe(200);
    expect(response.cache_control).toBe('no-store');
    expect(response.body).toMatchObject({ available: true, provider: 'codex' });
  });

  test('returns unavailable for invalid JSON', async () => {
    const runCodexAuth = vi.fn().mockResolvedValue({
      code: 0,
      stdout: 'not-json',
      stderr: 'private detail'
    });

    const response = await requestUsage(runCodexAuth);

    expect(response.body).toEqual({ available: false });
  });

  test('returns unavailable for a non-zero process exit', async () => {
    const runCodexAuth = vi.fn().mockResolvedValue({
      code: 1,
      stdout: JSON.stringify(usageSnapshot()),
      stderr: 'private detail'
    });

    const response = await requestUsage(runCodexAuth);

    expect(response.body).toEqual({ available: false });
  });

  test('negative-caches unavailable responses for 180 seconds', async () => {
    let clock = 1_786_334_400_000;
    const now = () => clock;
    const runCodexAuth = vi.fn().mockRejectedValue(new Error('private detail'));

    await requestUsage(runCodexAuth, now);
    clock += 179_999;
    await requestUsage(runCodexAuth, now);
    clock += 1;
    await requestUsage(runCodexAuth, now);

    expect(runCodexAuth).toHaveBeenCalledTimes(2);
  });

  test('refreshes the positive cache after 180 seconds', async () => {
    let clock = 1_786_334_400_000;
    const now = () => clock;
    const runCodexAuth = vi.fn().mockResolvedValue({
      code: 0,
      stdout: JSON.stringify(usageSnapshot()),
      stderr: ''
    });

    await requestUsage(runCodexAuth, now);
    clock += 179_999;
    await requestUsage(runCodexAuth, now);
    clock += 1;
    await requestUsage(runCodexAuth, now);

    expect(runCodexAuth).toHaveBeenCalledTimes(2);
  });

  test('recalculates snapshot age while reusing the positive cache', async () => {
    let clock = 1_786_334_948_000;
    const now = () => clock;
    const runCodexAuth = vi.fn().mockResolvedValue({
      code: 0,
      stdout: JSON.stringify(usageSnapshot()),
      stderr: ''
    });

    const first = await requestUsage(runCodexAuth, now);
    clock += 20_000;
    const second = await requestUsage(runCodexAuth, now);

    expect(first.body).toMatchObject({ ageSeconds: 590 });
    expect(second.body).toMatchObject({ ageSeconds: 610 });
    expect(runCodexAuth).toHaveBeenCalledTimes(1);
  });

  test('coalesces concurrent cache misses into one process', async () => {
    const result = {
      code: 0,
      stdout: JSON.stringify(usageSnapshot()),
      stderr: ''
    };
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(result);
    });
    const runCodexAuth = vi.fn(() => gate);

    const responses = Promise.all([
      requestUsage(runCodexAuth),
      requestUsage(runCodexAuth),
      requestUsage(runCodexAuth)
    ]);
    await vi.waitFor(() => expect(runCodexAuth).toHaveBeenCalled());
    release();
    await responses;

    expect(runCodexAuth).toHaveBeenCalledTimes(1);
  });
});

describe('codex account rows', () => {
  test('keeps the plan of every same-email account', () => {
    const payload = normalizeCodexUsage(
      listSnapshot([
        accountRow(),
        accountRow({ number: 2, account_key: 'account-2', plan: 'max' })
      ]),
      () => 1_786_334_400_000
    );

    expect(payload).toMatchObject({
      accounts: [
        { number: 1, email: 'user@example.com', plan: 'pro' },
        { number: 2, email: 'user@example.com', plan: 'max' }
      ]
    });
  });

  test('marks the row matching active_account_key as active', () => {
    const payload = normalizeCodexUsage(
      listSnapshot(
        [
          accountRow({ active: true }),
          accountRow({ number: 2, account_key: 'account-2', active: false })
        ],
        'account-2'
      ),
      () => 1_786_334_400_000
    );

    expect(payload).toMatchObject({
      accounts: [
        { number: 2, active: true },
        { number: 1, active: false }
      ]
    });
  });

  test('lists the active account first and then ascending numbers', () => {
    const payload = normalizeCodexUsage(
      listSnapshot(
        [
          accountRow({ number: 2, account_key: 'account-2' }),
          accountRow({ number: 3, account_key: 'account-3' }),
          accountRow({ number: 1, account_key: 'account-1' })
        ],
        'account-3'
      ),
      () => 1_786_334_400_000
    );

    expect(payload).toMatchObject({
      accounts: [{ number: 3 }, { number: 1 }, { number: 2 }]
    });
  });

  test('marks a row without a usable snapshot as unavailable', () => {
    const payload = normalizeCodexUsage(
      listSnapshot([
        accountRow(),
        accountRow({
          number: 2,
          account_key: 'account-2',
          usage: { source: 'none' }
        })
      ]),
      () => 1_786_334_400_000
    );

    expect(payload).toMatchObject({
      accounts: [
        { number: 1, status: 'ok' },
        { number: 2, status: 'unavailable', windows: [], fetchedAt: null }
      ]
    });
  });

  test('exposes only the account key while omitting credits', () => {
    const payload = normalizeCodexUsage(
      listSnapshot([accountRow({ credits: 42 })]),
      () => 1_786_334_400_000
    );

    expect(payload).toMatchObject({ accounts: [{ key: 'account-1' }] });
    expect(JSON.stringify(payload)).not.toMatch(/credits/);
  });

  test('drops only a row missing account_key', () => {
    const broken = accountRow({ number: 2 });
    delete (/** @type {any} */ (broken).account_key);

    const payload = normalizeCodexUsage(
      listSnapshot([accountRow(), broken]),
      () => 1_786_334_400_000
    );

    expect(payload).toMatchObject({ accounts: [{ key: 'account-1' }] });
  });
});

describe('codex usage cache invalidation', () => {
  test('runs a new process for a GET that arrives after invalidation', async () => {
    const runCodexAuth = vi.fn().mockResolvedValue({
      code: 0,
      stdout: JSON.stringify(usageSnapshot()),
      stderr: ''
    });

    await requestUsage(runCodexAuth);
    invalidateCache();
    await requestUsage(runCodexAuth);

    expect(runCodexAuth).toHaveBeenCalledTimes(2);
  });

  test('never caches a lookup that started before invalidation', async () => {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () =>
        resolve({
          code: 0,
          stdout: JSON.stringify(usageSnapshot()),
          stderr: ''
        });
    });
    const runCodexAuth = vi
      .fn()
      .mockReturnValueOnce(gate)
      .mockResolvedValue({
        code: 0,
        stdout: JSON.stringify(usageSnapshot()),
        stderr: ''
      });

    const pending = requestUsage(runCodexAuth);
    await vi.waitFor(() => expect(runCodexAuth).toHaveBeenCalled());
    invalidateCache();
    release();
    await pending;
    await requestUsage(runCodexAuth);

    expect(runCodexAuth).toHaveBeenCalledTimes(2);
  });

  test('does not hand the pre-invalidation result to a later GET', async () => {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () =>
        resolve({
          code: 0,
          stdout: JSON.stringify(listSnapshot([accountRow()])),
          stderr: ''
        });
    });
    const runCodexAuth = vi
      .fn()
      .mockReturnValueOnce(gate)
      .mockResolvedValue({
        code: 0,
        stdout: JSON.stringify(
          listSnapshot(
            [accountRow({ number: 9, account_key: 'account-9' })],
            'account-9'
          )
        ),
        stderr: ''
      });

    const pending = requestUsage(runCodexAuth);
    await vi.waitFor(() => expect(runCodexAuth).toHaveBeenCalled());
    invalidateCache();
    const second = await requestUsage(runCodexAuth);
    release();
    await pending;

    expect(second.body).toMatchObject({ accounts: [{ number: 9 }] });
  });
});

describe('codex account listing', () => {
  test('returns normalized keys and the active key', async () => {
    const runCodexAuth = vi.fn().mockResolvedValue({
      code: 0,
      stdout: JSON.stringify(
        listSnapshot(
          [accountRow(), accountRow({ number: 2, account_key: 'account-2' })],
          'account-2'
        )
      ),
      stderr: ''
    });

    const result = await listAccounts({
      runCodexAuth,
      now: () => 1_786_334_400_000
    });

    expect(result).toMatchObject({
      ok: true,
      active_key: 'account-2',
      accounts: [{ key: 'account-2' }, { key: 'account-1' }]
    });
  });

  test('returns an error when codex-auth fails', async () => {
    const runCodexAuth = vi.fn().mockResolvedValue({
      code: 1,
      stdout: '',
      stderr: 'failed'
    });

    const result = await listAccounts({ runCodexAuth });

    expect(result).toEqual({
      ok: false,
      error: 'codex_account_list_unavailable'
    });
  });
});
