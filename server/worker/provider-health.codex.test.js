import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PassThrough } from 'node:stream';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { OUTAGE_BACKOFF_MS, createProviderHealth } from './provider-health.js';
import { createQueueStore } from './queue-store.js';

const WS = '/tmp/example-workspace/codex-project';
const NOW = Date.parse('2026-09-08T08:00:00Z');
const FIXTURE_DIR = path.join(import.meta.dirname, '__fixtures__');

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-codex-health-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * Read one captured probe stream verbatim.
 *
 * @param {string} name
 * @returns {string}
 */
function fixture(name) {
  return fs.readFileSync(path.join(FIXTURE_DIR, name), 'utf8');
}

/**
 * Return a fake spawn that emits raw stdout text and one exit code.
 *
 * @param {string} stdout
 * @param {number} code
 */
function makeSpawn(stdout, code) {
  return vi.fn(() => {
    const child = /** @type {any} */ (new EventEmitter());
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.kill = vi.fn();
    queueMicrotask(() => {
      child.stdout.write(stdout);
      child.stdout.end();
      child.stderr.end();
      child.emit('close', code);
    });
    return child;
  });
}

/**
 * Build the controller against a codex-only catalog.
 *
 * @param {any} spawnImpl
 * @param {Record<string, any>} [overrides]
 */
function setup(spawnImpl, overrides = {}) {
  const store = createQueueStore({ now: () => NOW });
  const health = createProviderHealth({
    store,
    accountCatalog: {},
    notify: {
      providerRecovered: vi.fn(),
      providerAutoResumeDisarmed: vi.fn()
    },
    onPending: vi.fn(async () => ({ resumed_beads: [], refusals: [] })),
    tick: vi.fn(async () => {}),
    repo: '/repo',
    spawnImpl,
    catalog: {
      model_index: { sol: 'codex' },
      runners: {
        codex: {
          command: 'codex',
          efforts: [],
          models: { sol: { id: 'gpt-5.6-sol' } }
        }
      }
    },
    now: () => NOW,
    prepareCodexAccountHome: vi.fn(
      async (/** @type {any} */ input) =>
        /** @type {any} */ ({ ok: true, home_dir: input.home_dir })
    ),
    codexAccountHomeDir: (/** @type {string} */ key) => `/state/homes/${key}`,
    codexRoot: '/root/.codex',
    ...overrides
  });
  return { store, health };
}

/**
 * One codex hold target.
 *
 * @param {string|null} account
 */
function codexTarget(account) {
  return {
    kind: /** @type {const} */ ('outage'),
    model: 'sol',
    account,
    detail: 'http_503',
    last_error: 'http_503',
    resets_at: null,
    rearm_count: 0,
    attempt_ids: ['att-1']
  };
}

describe('codex provider health probe', () => {
  test('probes read-only and non-interactively with the catalog model', async () => {
    const spawnImpl = makeSpawn(fixture('codex-probe-ok.jsonl'), 0);
    const env = setup(spawnImpl);

    await env.health.probeTarget(WS, 'codex', codexTarget(null));

    expect(spawnImpl).toHaveBeenCalledWith(
      'codex',
      [
        'exec',
        '--json',
        '--sandbox',
        'read-only',
        '--skip-git-repo-check',
        '-m',
        'gpt-5.6-sol',
        'ok'
      ],
      expect.objectContaining({ cwd: WS, shell: false })
    );
  });

  test('passes the selected account CODEX_HOME and silent flag', async () => {
    const spawnImpl = makeSpawn(fixture('codex-probe-ok.jsonl'), 0);
    const prepareCodexAccountHome = vi.fn(
      async (/** @type {any} */ input) =>
        /** @type {any} */ ({ ok: true, home_dir: input.home_dir })
    );
    const env = setup(spawnImpl, { prepareCodexAccountHome });

    await env.health.probeTarget(WS, 'codex', codexTarget('acct-2'));

    expect(prepareCodexAccountHome).toHaveBeenCalledWith({
      key: 'acct-2',
      auth_file: '/root/.codex/accounts/YWNjdC0y.auth.json',
      codex_root: '/root/.codex',
      home_dir: '/state/homes/acct-2'
    });
    const options = /** @type {any} */ (spawnImpl.mock.calls[0])[2];
    expect(options.env).toMatchObject({
      CODEX_SILENT: '1',
      CODEX_HOME: '/state/homes/acct-2'
    });
  });

  test('refuses the probe route when the account home cannot be prepared', async () => {
    const spawnImpl = makeSpawn(fixture('codex-probe-ok.jsonl'), 0);
    const env = setup(spawnImpl, {
      prepareCodexAccountHome: vi.fn(
        async () =>
          /** @type {any} */ ({
            ok: false,
            reason: 'codex_home_prepare_failed',
            detail: 'auth_file_not_regular'
          })
      )
    });

    const result = await env.health.probeTarget(WS, 'codex', codexTarget('a'));

    expect(result).toEqual({
      ok: false,
      outage: null,
      error: 'probe_route_unavailable'
    });
    expect(spawnImpl).not.toHaveBeenCalled();
  });

  test('reads a completed JSONL turn as a recovery', async () => {
    const env = setup(makeSpawn(fixture('codex-probe-ok.jsonl'), 0));

    const result = await env.health.probeTarget(WS, 'codex', codexTarget(null));

    expect(result).toEqual({ ok: true, outage: null, error: '' });
  });

  test('reads a captured 400 failure as a general failure without an outage', async () => {
    const env = setup(makeSpawn(fixture('codex-turn-failed-400.jsonl'), 1));

    const result = await env.health.probeTarget(WS, 'codex', codexTarget(null));

    expect(result.ok).toBe(false);
    expect(result.outage).toBeNull();
  });

  test('reads a captured 401 failure as a general failure without an outage', async () => {
    const env = setup(makeSpawn(fixture('codex-turn-failed-401.jsonl'), 1));

    const result = await env.health.probeTarget(WS, 'codex', codexTarget(null));

    expect(result.ok).toBe(false);
    expect(result.outage).toBeNull();
  });

  test('classifies a structured 503 turn failure as a persisting outage', async () => {
    const envelope = JSON.stringify({
      type: 'error',
      status: 503,
      error: { type: 'server_error', message: 'service unavailable' }
    });
    const stream = `${JSON.stringify({ type: 'turn.started' })}\n${JSON.stringify(
      { type: 'turn.failed', error: { message: envelope } }
    )}\n`;
    const env = setup(makeSpawn(stream, 1));

    const result = await env.health.probeTarget(WS, 'codex', codexTarget(null));

    expect(result.ok).toBe(false);
    expect(result.outage).toMatchObject({
      detail: 'http_503',
      scope: 'provider'
    });
  });

  test('treats a truncated stream as a probe failure, not an outage', async () => {
    const stream = `${JSON.stringify({ type: 'thread.started', thread_id: 't' })}\n${JSON.stringify(
      { type: 'turn.started' }
    )}\n`;
    const env = setup(makeSpawn(stream, 0));

    const result = await env.health.probeTarget(WS, 'codex', codexTarget(null));

    expect(result).toMatchObject({
      ok: false,
      outage: null,
      error: 'probe_decode_failed'
    });
  });

  test('treats malformed output as a probe failure, not an outage', async () => {
    const stream = `not json\n${JSON.stringify({ type: 'turn.completed' })}\n`;
    const env = setup(makeSpawn(stream, 0));

    const result = await env.health.probeTarget(WS, 'codex', codexTarget(null));

    expect(result).toMatchObject({ ok: false, outage: null });
  });
});

/**
 * Build a controllable timer surface that distinguishes fired and cleared work.
 */
function makeTimers() {
  /** @type {Array<{ fn: () => void, delay: number, fired: boolean, cleared: boolean, unref: () => void }>} */
  const entries = [];
  return {
    entries,
    setTimeoutImpl(/** @type {() => void} */ fn, /** @type {number} */ delay) {
      const entry = { fn, delay, fired: false, cleared: false, unref: vi.fn() };
      entries.push(entry);
      return entry;
    },
    clearTimeoutImpl(/** @type {any} */ entry) {
      entry.cleared = true;
    },
    fireNext() {
      const entry = entries.find((row) => !row.fired && !row.cleared);
      if (!entry) {
        throw new Error('no active timer');
      }
      entry.fired = true;
      entry.fn();
      return entry.delay;
    }
  };
}

/**
 * Let queued child-process and async probe continuations settle.
 */
async function flush() {
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setImmediate(resolve));
}

/**
 * Seed one durable codex hold and return its generation.
 *
 * @param {ReturnType<typeof createQueueStore>} store
 * @param {string|null} account
 */
function seedCodexHold(store, account) {
  store.appendAttempt(WS, {
    expected_revision: store.snapshot(WS).revision,
    attempt: { attempt_id: 'att-1', bead_id: 'B1' }
  });
  store.updateAttempt(WS, {
    attempt_id: 'att-1',
    patch: {
      runner: 'codex',
      model: 'sol',
      status: 'running',
      codex_account: account
    }
  });
  return store.holdProviderAttempt(WS, {
    attempt_id: 'att-1',
    patch: {
      status: 'paused',
      cause: 'provider_outage:outage',
      finished_at: NOW
    },
    runner: 'codex',
    target: {
      kind: 'outage',
      model: 'sol',
      account,
      detail: 'http_503',
      last_error: 'http_503',
      resets_at: null,
      rearm_count: 0,
      attempt_ids: []
    }
  }).generation;
}

describe('codex hold lifecycle', () => {
  test('advances the shared outage backoff while the failure persists', async () => {
    const timers = makeTimers();
    const envelope = JSON.stringify({
      type: 'error',
      status: 503,
      error: { type: 'server_error', message: 'service unavailable' }
    });
    const stream = `${JSON.stringify({ type: 'turn.failed', error: { message: envelope } })}\n`;
    const env = setup(makeSpawn(stream, 1), {
      setTimeoutImpl: timers.setTimeoutImpl,
      clearTimeoutImpl: timers.clearTimeoutImpl
    });
    seedCodexHold(env.store, 'acct-1');
    await env.health.start(WS);
    /** @type {number[]} */
    const observed = [];

    for (let index = 0; index < OUTAGE_BACKOFF_MS.length + 1; index += 1) {
      observed.push(timers.fireNext());
      await flush();
    }

    // 배열 마지막 원소(1시간)가 상한이다 (release spec §3.1).
    expect(observed).toEqual([
      ...OUTAGE_BACKOFF_MS,
      OUTAGE_BACKOFF_MS[OUTAGE_BACKOFF_MS.length - 1]
    ]);
  });

  test('recovers the held codex target on a completed probe turn', async () => {
    const timers = makeTimers();
    const onPending = vi.fn(async () => ({
      resumed_beads: ['B1'],
      refusals: []
    }));
    const env = setup(makeSpawn(fixture('codex-probe-ok.jsonl'), 0), {
      setTimeoutImpl: timers.setTimeoutImpl,
      clearTimeoutImpl: timers.clearTimeoutImpl,
      onPending
    });
    seedCodexHold(env.store, 'acct-1');
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    expect(env.store.snapshot(WS).provider_hold.codex).toBeUndefined();
    expect(onPending).toHaveBeenCalled();
  });

  test('keeps the hold when the probe output cannot be decoded', async () => {
    const timers = makeTimers();
    const env = setup(makeSpawn('garbage output\n', 0), {
      setTimeoutImpl: timers.setTimeoutImpl,
      clearTimeoutImpl: timers.clearTimeoutImpl
    });
    seedCodexHold(env.store, 'acct-1');
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    expect(env.store.snapshot(WS).provider_hold.codex.targets).toHaveLength(1);
  });
});
