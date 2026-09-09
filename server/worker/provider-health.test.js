import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PassThrough } from 'node:stream';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { OUTAGE_BACKOFF_MS, createProviderHealth } from './provider-health.js';
import { createQueueStore } from './queue-store.js';

const WS = '/tmp/example-workspace/project-a';
const NOW = Date.parse('2026-09-03T08:00:00Z');

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-provider-health-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * Let queued child-process and async probe continuations settle.
 */
async function flush() {
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setImmediate(resolve));
}

/**
 * Build a controllable timer surface that distinguishes fired and cleared work.
 */
function makeTimers() {
  /** @type {Array<{ fn: () => void, delay: number, fired: boolean, cleared: boolean, unref: () => void }>} */
  const entries = [];
  return {
    entries,
    setTimeoutImpl(/** @type {() => void} */ fn, /** @type {number} */ delay) {
      const entry = {
        fn,
        delay,
        fired: false,
        cleared: false,
        unref: vi.fn()
      };
      entries.push(entry);
      return entry;
    },
    clearTimeoutImpl(/** @type {any} */ entry) {
      entry.cleared = true;
    },
    next() {
      return entries.find((entry) => !entry.fired && !entry.cleared);
    },
    fireNext() {
      const entry = this.next();
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
 * Return a fake spawn that emits one configured JSON result.
 *
 * @param {Record<string, unknown>} output
 * @param {number} code
 */
function makeSpawn(output, code) {
  return vi.fn(() => {
    const child = /** @type {any} */ (new EventEmitter());
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.kill = vi.fn();
    queueMicrotask(() => {
      child.stdout.write(JSON.stringify(output));
      child.stdout.end();
      child.stderr.end();
      child.emit('close', code);
    });
    return child;
  });
}

/**
 * Return a fake spawn whose child never terminates, so the probe stays in
 * flight for the whole test.
 */
function makeHangingSpawn() {
  return vi.fn(() => {
    const child = /** @type {any} */ (new EventEmitter());
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.kill = vi.fn();
    return child;
  });
}

/**
 * Seed one durable target and return its generation.
 *
 * @param {ReturnType<typeof createQueueStore>} store
 * @param {'outage'|'usage_limit'} kind
 * @param {string|null} account
 * @param {Partial<{ resets_at: number|null, rearm_count: number, attempt_id: string, model: string }>} [patch]
 */
function seedHold(store, kind, account, patch = {}) {
  const attempt_id = patch.attempt_id ?? 'att-1';
  const model = patch.model ?? 'opus';
  store.appendAttempt(WS, {
    expected_revision: store.snapshot(WS).revision,
    attempt: { attempt_id, bead_id: `B${attempt_id.slice(4)}` }
  });
  store.updateAttempt(WS, {
    attempt_id,
    patch: { runner: 'claude', model, status: 'running' }
  });
  return store.holdProviderAttempt(WS, {
    attempt_id,
    patch: {
      status: 'paused',
      cause: `provider_outage:${kind}`,
      finished_at: NOW
    },
    runner: 'claude',
    target: {
      kind,
      model,
      account,
      detail: kind,
      last_error: kind,
      resets_at: patch.resets_at ?? null,
      rearm_count: patch.rearm_count ?? 0,
      attempt_ids: []
    }
  }).generation;
}

/**
 * Build the controller with deterministic catalog, timers, and collaborators.
 *
 * @param {ReturnType<typeof createQueueStore>} store
 * @param {ReturnType<typeof makeTimers>} timers
 * @param {any} spawnImpl
 * @param {Record<string, any>} [overrides]
 */
function setup(store, timers, spawnImpl, overrides = {}) {
  const notify = {
    providerRecovered: vi.fn(),
    providerAutoResumeDisarmed: vi.fn()
  };
  const onPending = vi.fn(async () => ({
    resumed_beads: ['B1'],
    refusals: []
  }));
  const tick = vi.fn(async () => {});
  const health = createProviderHealth({
    store,
    accountCatalog: {
      readClaude: vi.fn(async (email) => ({
        ok: true,
        account: { email, status: 'ok', windows: [] }
      })),
      activeClaude: vi.fn(async () => ({
        ok: true,
        account: { email: 'active@example.com', status: 'ok', windows: [] }
      }))
    },
    notify,
    onPending,
    tick,
    repo: '/repo',
    spawnImpl,
    resolveCswapPath: () => '/bin/cswap',
    catalog: {
      model_index: { opus: 'claude', sonnet: 'claude' },
      runners: {
        claude: {
          command: 'claude',
          efforts: [],
          models: {
            opus: { id: 'claude-opus-4-8' },
            sonnet: { id: 'claude-sonnet-4-8' }
          }
        }
      }
    },
    now: () => NOW,
    setTimeoutImpl: timers.setTimeoutImpl,
    clearTimeoutImpl: timers.clearTimeoutImpl,
    ...overrides
  });
  return { health, notify, onPending, tick };
}

describe('provider health probe', () => {
  test('uses the catalog model and held Claude account route', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn({ is_error: false, result: 'ok' }, 0);
    const env = setup(store, timers, spawnImpl);

    const result = await env.health.probeTarget(WS, 'claude', {
      kind: 'outage',
      model: 'opus',
      account: 'held@example.com',
      detail: 'overloaded_529',
      last_error: 'API Error: 529',
      resets_at: null,
      rearm_count: 0,
      attempt_ids: ['att-1']
    });

    expect(result.ok).toBe(true);
    expect(spawnImpl).toHaveBeenCalledWith(
      '/bin/cswap',
      [
        'run',
        'held@example.com',
        '--share-history',
        '--',
        'claude',
        '-p',
        'ok',
        '--model',
        'claude-opus-4-8',
        '--output-format',
        'json'
      ],
      expect.objectContaining({ cwd: WS, shell: false })
    );
  });

  // RED 2 (spec §5)
  test('advances the outage backoff and caps at one hour', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      { type: 'result', is_error: true, result: 'API Error: 529 Overloaded' },
      1
    );
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'outage', null);
    await env.health.start(WS);
    /** @type {number[]} */
    const observed = [];

    for (let index = 0; index < OUTAGE_BACKOFF_MS.length + 1; index += 1) {
      observed.push(timers.fireNext());
      await flush();
    }

    expect(observed).toEqual([...OUTAGE_BACKOFF_MS, 3_600_000]);
  });

  test('persists recovery before consuming resumes and opening the gate', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn({ is_error: false, result: 'ok' }, 0);
    /** @type {string[]} */
    const order = [];
    const recover = store.recoverProviderTarget.bind(store);
    vi.spyOn(store, 'recoverProviderTarget').mockImplementation(
      (workspace, input) => {
        order.push('persist');
        return recover(workspace, input);
      }
    );
    const env = setup(store, timers, spawnImpl, {
      onPending: async () => {
        order.push('consume');
        if (order.includes('persist')) {
          expect(store.snapshot(WS).provider_hold).toEqual({});
        }
        return { resumed_beads: ['B1'], refusals: [] };
      },
      notify: {
        providerRecovered: () => order.push('notify'),
        providerAutoResumeDisarmed: vi.fn()
      },
      tick: async () => {
        order.push('tick');
      }
    });
    seedHold(store, 'outage', null);
    await env.health.start(WS);
    order.length = 0;

    timers.fireNext();
    await flush();

    expect(order).toEqual(['persist', 'consume', 'notify', 'tick']);
    expect(store.snapshot(WS).auto_resume_pending[0]).toMatchObject({
      attempt_id: 'att-1',
      account: null,
      kind: 'provider_outage'
    });
  });

  test('rearms a repeated usage limit with its new reset', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      {
        type: 'result',
        is_error: true,
        api_error_status: 429,
        result: "You've hit your session limit · resets 6pm (Asia/Seoul)"
      },
      1
    );
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'usage_limit', 'held@example.com', {
      resets_at: NOW - 60_000
    });
    await env.health.start(WS);

    expect(timers.fireNext()).toBe(0);
    await flush();

    const target = store.snapshot(WS).provider_hold.claude.targets[0];
    expect(target.kind).toBe('usage_limit');
    expect(target.rearm_count).toBe(1);
    expect(target.resets_at).toBe(Date.parse('2026-09-03T09:00:00Z'));
  });

  test('waits fifteen minutes when a usage limit has no reset time', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ is_error: false, result: 'ok' }, 0)
    );
    seedHold(store, 'usage_limit', 'held@example.com');

    await env.health.start(WS);

    expect(timers.next()?.delay).toBe(900_000);
  });

  // 보존 23 (spec §5)
  test('reclassifies a non-limit usage probe failure as outage', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      { type: 'result', is_error: true, result: 'permission denied' },
      1
    );
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'usage_limit', 'held@example.com', {
      resets_at: NOW - 60_000
    });
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    const target = store.snapshot(WS).provider_hold.claude.targets[0];
    expect(target.kind).toBe('outage');
    expect(target.attempt_ids).toEqual(['att-1']);
  });

  // 보존 21 (spec §5)
  test('leaves a rearm-capped usage target and sends one disarmed notification', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ is_error: false, result: 'ok' }, 0)
    );
    seedHold(store, 'usage_limit', 'held@example.com', { rearm_count: 3 });

    await env.health.start(WS);
    await flush();
    env.health.stop(WS);
    await env.health.start(WS);
    await flush();

    expect(timers.next()).toBeUndefined();
    expect(store.snapshot(WS).provider_hold.claude.targets).toHaveLength(1);
    expect(env.notify.providerAutoResumeDisarmed).toHaveBeenCalledTimes(1);
  });

  // RED 1 (spec §5)
  test('keeps arming an outage probe past the twenty-four hour mark', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      { type: 'result', is_error: true, result: 'API Error: 529 Overloaded' },
      1
    );
    const env = setup(store, timers, spawnImpl, {
      now: () => NOW + 25 * 60 * 60 * 1000
    });
    seedHold(store, 'outage', null);

    await env.health.start(WS);
    await flush();

    expect(timers.next()).toBeDefined();
    expect(env.notify.providerAutoResumeDisarmed).not.toHaveBeenCalled();
    expect(store.snapshot(WS).provider_hold.claude.targets).toHaveLength(1);
  });

  // 보존 20 (spec §5)
  test('leaves an aged usage-limit target and sends one disarmed notification', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn({ is_error: false, result: 'ok' }, 0);
    const env = setup(store, timers, spawnImpl, {
      now: () => NOW + 24 * 60 * 60 * 1000
    });
    seedHold(store, 'usage_limit', 'held@example.com');

    await env.health.start(WS);
    await flush();

    expect(timers.next()).toBeUndefined();
    expect(spawnImpl).not.toHaveBeenCalled();
    expect(store.snapshot(WS).provider_hold.claude.targets).toHaveLength(1);
    expect(env.notify.providerAutoResumeDisarmed).toHaveBeenCalledTimes(1);
    expect(env.notify.providerAutoResumeDisarmed).toHaveBeenCalledWith(
      expect.objectContaining({ reason: 'hold_age_cap' })
    );
  });

  test('keeps probing a young outage target', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      { type: 'result', is_error: true, result: 'API Error: 529 Overloaded' },
      1
    );
    const env = setup(store, timers, spawnImpl, {
      now: () => NOW + 23 * 60 * 60 * 1000
    });
    seedHold(store, 'outage', null);

    await env.health.start(WS);
    await flush();

    expect(timers.next()).toBeDefined();
    expect(env.notify.providerAutoResumeDisarmed).not.toHaveBeenCalled();
  });

  test('does not probe or recover an unscoped usage-limit target', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn({ is_error: false, result: 'ok' }, 0);
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'usage_limit', null);

    await env.health.start(WS);

    expect(timers.next()).toBeUndefined();
    expect(spawnImpl).not.toHaveBeenCalled();
    expect(env.onPending).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).provider_hold.claude.targets).toHaveLength(1);
  });

  // RED 3 (spec §5)
  test('demotes an accounted outage target whose probe reads as a usage limit', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      {
        type: 'result',
        is_error: true,
        api_error_status: 429,
        result: "You've hit your session limit · resets 6pm (Asia/Seoul)"
      },
      1
    );
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'outage', 'held@example.com');
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    const target = store.snapshot(WS).provider_hold.claude.targets[0];
    expect(target.kind).toBe('usage_limit');
    expect(target.resets_at).toBe(Date.parse('2026-09-03T09:00:00Z'));
  });

  // RED 4 (spec §5)
  test('carries the rearm count and hold since through that demotion', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      {
        type: 'result',
        is_error: true,
        api_error_status: 429,
        result: "You've hit your session limit · resets 6pm (Asia/Seoul)"
      },
      1
    );
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'outage', 'held@example.com', { rearm_count: 2 });
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    const hold = store.snapshot(WS).provider_hold.claude;
    expect(hold.targets[0].kind).toBe('usage_limit');
    expect(hold.targets[0].rearm_count).toBe(2);
    expect(hold.since).toBe(NOW);
  });

  // impl review r1 — 재분류로 게이트가 계정 단위로 좁아진 즉시 다른 계정의
  // 대기 행이 흘러야 하므로 스케줄러 tick이 한 번 돈다.
  test('ticks the scheduler once the demotion has narrowed the gate', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      {
        type: 'result',
        is_error: true,
        api_error_status: 429,
        result: "You've hit your session limit · resets 6pm (Asia/Seoul)"
      },
      1
    );
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'outage', 'held@example.com');
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    expect(store.snapshot(WS).provider_hold.claude.targets[0].kind).toBe(
      'usage_limit'
    );
    expect(env.tick).toHaveBeenCalledWith(WS);
  });

  // 보존 22 (spec §5)
  test('keeps an unaccounted outage target on the outage path', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      {
        type: 'result',
        is_error: true,
        api_error_status: 429,
        result: "You've hit your session limit · resets 6pm (Asia/Seoul)"
      },
      1
    );
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'outage', null);
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    expect(store.snapshot(WS).provider_hold.claude.targets[0].kind).toBe(
      'outage'
    );
  });

  // RED 5 (spec §5)
  test('probes every eligible target now and clears their armed timers', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      { type: 'result', is_error: true, result: 'API Error: 529 Overloaded' },
      1
    );
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'outage', null);
    seedHold(store, 'outage', 'held@example.com', {
      attempt_id: 'att-2',
      model: 'sonnet'
    });
    await env.health.start(WS);
    const armed_before = timers.entries.length;

    const result = env.health.probeNow(WS, 'claude');
    await flush();

    expect(result.armed).toBe(2);
    expect(
      timers.entries.slice(0, armed_before).every((entry) => entry.cleared)
    ).toBe(true);
    expect(spawnImpl).toHaveBeenCalledTimes(2);
  });

  // RED 6 (spec §5)
  test('probes a capped usage-limit target that has no timer left', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn({ is_error: false, result: 'ok' }, 0);
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'usage_limit', 'held@example.com', { rearm_count: 3 });
    await env.health.start(WS);
    await flush();

    const result = env.health.probeNow(WS, 'claude');
    await flush();

    expect(timers.next()).toBeUndefined();
    expect(result.armed).toBe(1);
    expect(spawnImpl).toHaveBeenCalledTimes(1);
  });

  // RED 7 (spec §5)
  test('skips an unaccounted usage-limit target on a manual probe', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn({ is_error: false, result: 'ok' }, 0);
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'usage_limit', null);
    await env.health.start(WS);

    const result = env.health.probeNow(WS, 'claude');
    await flush();

    expect(result).toEqual({ armed: 0, eligible: 0 });
    expect(spawnImpl).not.toHaveBeenCalled();
  });

  // RED 8 (spec §5)
  test('keeps the outage failure count across a manual probe', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      { type: 'result', is_error: true, result: 'API Error: 529 Overloaded' },
      1
    );
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'outage', null);
    await env.health.start(WS);
    timers.fireNext();
    await flush();
    timers.fireNext();
    await flush();

    env.health.probeNow(WS, 'claude');
    await flush();

    expect(timers.next()?.delay).toBe(480_000);
  });

  // RED 9 (spec §5)
  test('counts an in-flight target as eligible but does not fire it twice', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeHangingSpawn();
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'outage', null);
    await env.health.start(WS);

    const first = env.health.probeNow(WS, 'claude');
    const second = env.health.probeNow(WS, 'claude');

    expect([first.armed, second.armed, second.eligible]).toEqual([1, 0, 1]);
  });

  // RED 10 (spec §5)
  test('arms no second timer while a probe is still running', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeHangingSpawn();
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'outage', null);
    await env.health.start(WS);
    timers.fireNext();
    const armed_before = timers.entries.length;

    env.health.sync(WS);

    expect(timers.entries.length).toBe(armed_before);
  });

  // RED 11 (spec §5)
  test('fires the same target again once its probe has finished', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      { type: 'result', is_error: true, result: 'API Error: 529 Overloaded' },
      1
    );
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'outage', null);
    await env.health.start(WS);
    env.health.probeNow(WS, 'claude');
    await flush();

    const again = env.health.probeNow(WS, 'claude');
    await flush();

    expect(again.armed).toBe(1);
    expect(spawnImpl).toHaveBeenCalledTimes(2);
  });
});
