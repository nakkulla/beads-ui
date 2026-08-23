import express from 'express';
import { EventEmitter } from 'node:events';
import { createServer } from 'node:http';
import { PassThrough } from 'node:stream';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  __resetSwitchStateForTest,
  createAccountSwitchHandler,
  createAccountSwitchRunner
} from './account-switch.js';

/**
 * @import { RequestHandler } from 'express'
 * @typedef {EventEmitter & { stdout: PassThrough, stderr: PassThrough, kill: import('vitest').Mock<(signal: NodeJS.Signals) => boolean> }} TestChild
 */

const CLAUDE_ROUTE = '/api/claude-account/switch';
const CODEX_ROUTE = '/api/codex-account/switch';

/**
 * @param {Record<string, unknown>} [overrides]
 */
function switchResult(overrides = {}) {
  return {
    code: 0,
    stdout: '{}',
    stderr: '',
    not_found: false,
    timed_out: false,
    ...overrides
  };
}

/**
 * @param {{ claude?: RequestHandler, codex?: RequestHandler }} handlers
 */
async function startSwitchServer(handlers) {
  const app = express();
  app.use(express.json());
  if (handlers.claude) {
    app.post(CLAUDE_ROUTE, handlers.claude);
  }
  if (handlers.codex) {
    app.post(CODEX_ROUTE, handlers.codex);
  }
  const server = createServer(app);
  await new Promise((resolve) => {
    server.listen({ port: 0, host: '127.0.0.1' }, () => resolve(undefined));
  });
  const address = /** @type {import('node:net').AddressInfo} */ (
    server.address()
  );

  return {
    /**
     * @param {string} route
     * @param {unknown} body
     */
    async post(route, body) {
      const response = await fetch(`http://127.0.0.1:${address.port}${route}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
      });
      return { status: response.status, body: await response.json() };
    },
    close: () =>
      new Promise((resolve) => server.close(() => resolve(undefined)))
  };
}

/**
 * @param {(account_number: number) => Promise<any>} runSwitch
 * @param {unknown} body
 * @param {() => void} [invalidateUsageCache]
 */
async function requestSwitch(runSwitch, body, invalidateUsageCache) {
  const server = await startSwitchServer({
    claude: createAccountSwitchHandler({
      provider: 'claude',
      runSwitch,
      invalidateUsageCache: invalidateUsageCache || (() => {})
    })
  });

  try {
    return await server.post(CLAUDE_ROUTE, body);
  } finally {
    await server.close();
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
  __resetSwitchStateForTest();
});

describe('switch request validation', () => {
  test.each([
    ['an empty body', {}],
    ['zero', { number: 0 }],
    ['a negative number', { number: -1 }],
    ['a fractional number', { number: 1.5 }],
    ['a string', { number: '2' }]
  ])('rejects %s with 400', async (_name, body) => {
    const runSwitch = vi.fn();

    const response = await requestSwitch(runSwitch, body);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ ok: false, error: 'invalid_number' });
    expect(runSwitch).not.toHaveBeenCalled();
  });
});

describe('successful switches', () => {
  test('normalizes a cswap switch payload', async () => {
    const runSwitch = vi.fn().mockResolvedValue(
      switchResult({
        stdout: JSON.stringify({
          schemaVersion: 1,
          switched: true,
          from: { number: 1, email: 'old@example.com' },
          to: { number: 2, email: 'new@example.com' },
          strategy: 'manual',
          reason: null,
          message: 'switched',
          warnings: ['token expires soon', '']
        })
      })
    );

    const response = await requestSwitch(runSwitch, { number: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ok: true,
      switched: true,
      from: { number: 1, email: 'old@example.com' },
      to: { number: 2, email: 'new@example.com' },
      warnings: ['token expires soon']
    });
  });

  test('passes the requested number to the runner', async () => {
    const runSwitch = vi.fn().mockResolvedValue(switchResult());

    await requestSwitch(runSwitch, { number: 3 });

    expect(runSwitch).toHaveBeenCalledWith(3);
  });

  test('reports already-active as a successful unswitched run', async () => {
    const runSwitch = vi.fn().mockResolvedValue(
      switchResult({
        stdout: JSON.stringify({
          switched: false,
          reason: 'already-active',
          from: { number: 2, email: 'user@example.com' },
          to: { number: 2, email: 'user@example.com' }
        })
      })
    );

    const response = await requestSwitch(runSwitch, { number: 2 });

    expect(response.body).toMatchObject({ ok: true, switched: false });
  });

  test('fills missing codex-auth fields with null and an empty list', async () => {
    const runSwitch = vi
      .fn()
      .mockResolvedValue(switchResult({ stdout: JSON.stringify({}) }));

    const response = await requestSwitch(runSwitch, { number: 1 });

    expect(response.body).toEqual({
      ok: true,
      switched: false,
      from: null,
      to: null,
      warnings: []
    });
  });

  test('invalidates the usage cache after a successful switch', async () => {
    const runSwitch = vi.fn().mockResolvedValue(switchResult());
    const invalidateUsageCache = vi.fn();

    await requestSwitch(runSwitch, { number: 2 }, invalidateUsageCache);

    expect(invalidateUsageCache).toHaveBeenCalledTimes(1);
  });
});

describe('failed switches', () => {
  test('returns switch_failed for a non-zero exit', async () => {
    const runSwitch = vi.fn().mockResolvedValue(switchResult({ code: 1 }));

    const response = await requestSwitch(runSwitch, { number: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: false, error: 'switch_failed' });
  });

  test('returns timeout when the process was killed', async () => {
    const runSwitch = vi
      .fn()
      .mockResolvedValue(switchResult({ code: 124, timed_out: true }));

    const response = await requestSwitch(runSwitch, { number: 2 });

    expect(response.body).toEqual({ ok: false, error: 'timeout' });
  });

  test('returns not_found when the tool is missing', async () => {
    const runSwitch = vi
      .fn()
      .mockResolvedValue(switchResult({ code: 127, not_found: true }));

    const response = await requestSwitch(runSwitch, { number: 2 });

    expect(response.body).toEqual({ ok: false, error: 'not_found' });
  });

  test('returns invalid_output for unparsable stdout', async () => {
    const runSwitch = vi
      .fn()
      .mockResolvedValue(switchResult({ stdout: 'not-json' }));

    const response = await requestSwitch(runSwitch, { number: 2 });

    expect(response.body).toEqual({ ok: false, error: 'invalid_output' });
  });

  test('returns switch_failed when the runner rejects', async () => {
    const runSwitch = vi.fn().mockRejectedValue(new Error('private detail'));

    const response = await requestSwitch(runSwitch, { number: 2 });

    expect(response.body).toEqual({ ok: false, error: 'switch_failed' });
  });

  test('leaves the usage cache untouched on failure', async () => {
    const runSwitch = vi.fn().mockResolvedValue(switchResult({ code: 1 }));
    const invalidateUsageCache = vi.fn();

    await requestSwitch(runSwitch, { number: 2 }, invalidateUsageCache);

    expect(invalidateUsageCache).not.toHaveBeenCalled();
  });
});

describe('per-provider concurrency', () => {
  test('rejects a second switch of the same provider with 409', async () => {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(switchResult());
    });
    const runSwitch = vi.fn(() => gate);
    const server = await startSwitchServer({
      claude: createAccountSwitchHandler({
        provider: 'claude',
        runSwitch,
        invalidateUsageCache: () => {}
      })
    });

    try {
      const first = server.post(CLAUDE_ROUTE, { number: 2 });
      await vi.waitFor(() => expect(runSwitch).toHaveBeenCalled());
      const second = await server.post(CLAUDE_ROUTE, { number: 3 });
      release();
      await first;

      expect(second.status).toBe(409);
      expect(second.body).toEqual({ ok: false, error: 'switch_in_flight' });
      expect(runSwitch).toHaveBeenCalledTimes(1);
    } finally {
      await server.close();
    }
  });

  test('allows a codex switch while a claude switch is in flight', async () => {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(switchResult());
    });
    const runClaudeSwitch = vi.fn(() => gate);
    const runCodexSwitch = vi.fn().mockResolvedValue(switchResult());
    const server = await startSwitchServer({
      claude: createAccountSwitchHandler({
        provider: 'claude',
        runSwitch: runClaudeSwitch,
        invalidateUsageCache: () => {}
      }),
      codex: createAccountSwitchHandler({
        provider: 'codex',
        runSwitch: runCodexSwitch,
        invalidateUsageCache: () => {}
      })
    });

    try {
      const claude = server.post(CLAUDE_ROUTE, { number: 2 });
      await vi.waitFor(() => expect(runClaudeSwitch).toHaveBeenCalled());
      const codex = await server.post(CODEX_ROUTE, { number: 1 });
      release();
      await claude;

      expect(codex.status).toBe(200);
      expect(codex.body).toMatchObject({ ok: true });
    } finally {
      await server.close();
    }
  });

  test('accepts a later switch once the in-flight one settles', async () => {
    const runSwitch = vi.fn().mockResolvedValue(switchResult());

    const first = await requestSwitch(runSwitch, { number: 2 });
    const second = await requestSwitch(runSwitch, { number: 3 });

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
  });
});

describe('switch runner', () => {
  test('spawns switch <number> --json without a shell', async () => {
    const spawn_process = vi.fn(() =>
      spawnedChild((child) => child.emit('close', 0))
    );
    const runSwitch = createAccountSwitchRunner({
      provider: 'claude',
      spawn_process
    });

    await runSwitch(4);

    expect(spawn_process).toHaveBeenCalledWith(
      'cswap',
      ['switch', '4', '--json'],
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
    const runSwitch = createAccountSwitchRunner({
      provider: 'codex',
      spawn_process,
      home_dir: '/private/home'
    });

    await runSwitch(2);

    expect(spawn_process).toHaveBeenNthCalledWith(
      2,
      '/private/home/.local/bin/codex-auth',
      ['switch', '2', '--json'],
      { shell: false, windowsHide: true }
    );
  });

  test('kills a switch process after thirty seconds', async () => {
    vi.useFakeTimers();
    const child = spawnedChild(() => {});
    child.kill.mockImplementation(() => child.emit('close', null));
    const spawn_process = vi.fn(() => child);
    const runSwitch = createAccountSwitchRunner({
      provider: 'claude',
      spawn_process
    });

    const pending = runSwitch(1);
    await vi.advanceTimersByTimeAsync(30_000);
    const result = await pending;

    expect(child.kill).toHaveBeenCalledWith('SIGKILL');
    expect(result.timed_out).toBe(true);
    vi.useRealTimers();
  });
});
