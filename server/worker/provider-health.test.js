import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PassThrough } from 'node:stream';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  __resetTimingSettingsForTest,
  __setTimingOverridesForTest
} from '../timing-settings.js';
import { createAccountCatalog } from './account-catalog.js';
import { createBeadTimeline } from './bead-timeline.js';
import { OUTAGE_BACKOFF_MS, createProviderHealth } from './provider-health.js';
import { createQueueStore } from './queue-store.js';
import { queueFilePath } from './state-paths.js';

const WS = '/tmp/example-workspace/project-a';
const NOW = Date.parse('2026-09-03T08:00:00Z');

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-provider-health-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  __resetTimingSettingsForTest();
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
 * Return a fake spawn that emits one configured result, or the given
 * stream-json events one per line.
 *
 * @param {Record<string, unknown>|Record<string, unknown>[]} output
 * @param {number} code
 */
function makeSpawn(output, code) {
  const events = Array.isArray(output)
    ? output
    : [{ type: 'result', ...output }];
  return vi.fn(() => {
    const child = /** @type {any} */ (new EventEmitter());
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.kill = vi.fn();
    queueMicrotask(() => {
      child.stdout.write(
        events.map((event) => JSON.stringify(event)).join('\n')
      );
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
 * @param {Partial<{ resets_at: number|null, rearm_count: number, attempt_id: string, model: string, runner: string }>} [patch]
 */
function seedHold(store, kind, account, patch = {}) {
  const attempt_id = patch.attempt_id ?? 'att-1';
  const model = patch.model ?? 'opus';
  const runner = patch.runner ?? 'claude';
  store.appendAttempt(WS, {
    expected_revision: store.snapshot(WS).revision,
    attempt: { attempt_id, bead_id: `B${attempt_id.slice(4)}` }
  });
  store.updateAttempt(WS, {
    attempt_id,
    patch: { runner, model, status: 'running' }
  });
  return store.holdProviderAttempt(WS, {
    attempt_id,
    patch: {
      status: 'paused',
      cause: `provider_outage:${kind}`,
      finished_at: NOW
    },
    runner,
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
    acquireClaudeLaunch: async () => () => {},
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

describe('none-held account switch reevaluation', () => {
  /**
   * Persist a switchable hold without an available receiving account.
   *
   * @param {ReturnType<typeof createQueueStore>} store
   */
  function seedSwitchHold(store) {
    seedHold(store, 'usage_limit', 'old@example.com', {
      resets_at: NOW + 90_000
    });
    store.setProviderLimitPolicy(WS, {
      expected_revision: store.snapshot(WS).revision,
      runner: 'claude',
      patch: { mode: 'switch', accounts: ['new@example.com'] }
    });
    store.holdProviderAttempt(WS, {
      attempt_id: 'att-1',
      patch: {},
      runner: 'claude',
      target: store.snapshot(WS).provider_hold.claude.targets[0],
      auto_switch: { candidate_account: null }
    });
    return store.snapshot(WS).provider_hold.claude.generation;
  }

  test('reconsiders persisted none holds on startup without a stored switch deadline', async () => {
    const store = createQueueStore({ now: () => NOW });
    seedSwitchHold(store);
    const onSwitchReady = vi.fn(async () => {});
    const { health } = setup(store, makeTimers(), makeSpawn({}, 0), {
      onSwitchReady
    });

    await health.start(WS);

    expect(onSwitchReady).toHaveBeenCalledExactlyOnceWith(WS);
    health.stop(WS);
  });

  test('reevaluates at the switch deadline and rearms from the renewed target', async () => {
    const store = createQueueStore({ now: () => NOW });
    const generation = seedSwitchHold(store);
    const timers = makeTimers();
    const spawnImpl = makeSpawn({}, 0);
    const identity = {
      runner: 'claude',
      generation: /** @type {number} */ (generation),
      kind: /** @type {const} */ ('usage_limit'),
      model: 'opus',
      account: 'old@example.com'
    };
    store.updateProviderTarget(WS, {
      ...identity,
      patch: {
        switch_ready_at: NOW + 10_000,
        switch_ready_account: 'new@example.com'
      }
    });
    const onSwitchReady = vi.fn(async () => {
      store.updateProviderTarget(WS, {
        ...identity,
        patch: {
          switch_ready_at: NOW + 30_000,
          switch_ready_account: 'new@example.com'
        }
      });
    });
    const { health } = setup(store, timers, spawnImpl, { onSwitchReady });
    health.sync(WS);
    const ready = timers.entries.find((entry) => entry.delay === 10_000);
    expect(ready).toBeDefined();

    /** @type {NonNullable<typeof ready>} */ (ready).fired = true;
    /** @type {NonNullable<typeof ready>} */ (ready).fn();
    await flush();

    expect(onSwitchReady).toHaveBeenCalledExactlyOnceWith(WS);
    expect(
      timers.entries
        .filter((entry) => !entry.fired && !entry.cleared)
        .map((entry) => entry.delay)
    ).toContain(30_000);
    expect(spawnImpl).not.toHaveBeenCalled();
    expect(store.snapshot(WS).provider_hold.claude.targets[0].account).toBe(
      'old@example.com'
    );
    health.stop(WS);
    expect(
      timers.entries.filter((entry) => !entry.fired && !entry.cleared)
    ).toEqual([]);
  });

  test('reconsiders other none holds immediately after a successful recovery', async () => {
    const store = createQueueStore({ now: () => NOW });
    seedSwitchHold(store);
    seedHold(store, 'usage_limit', 'new@example.com', {
      attempt_id: 'att-2',
      resets_at: NOW
    });
    const timers = makeTimers();
    const onSwitchReady = vi.fn(async () => {});
    const { health } = setup(store, timers, makeSpawn({ is_error: false }, 0), {
      onSwitchReady
    });
    health.sync(WS);

    const recovered_timer = timers.entries.find(
      (entry) => entry.delay === 60_000
    );
    /** @type {NonNullable<typeof recovered_timer>} */ (recovered_timer).fired =
      true;
    /** @type {NonNullable<typeof recovered_timer>} */ (recovered_timer).fn();
    await flush();

    expect(onSwitchReady).toHaveBeenCalledExactlyOnceWith(WS);
    expect(
      store
        .snapshot(WS)
        .provider_hold.claude.targets.map((target) => target.account)
    ).toEqual(['old@example.com']);
    health.stop(WS);
  });

  test('reconsiders a none hold when the Claude catalog observes another account', async () => {
    const store = createQueueStore({ now: () => NOW });
    seedSwitchHold(store);
    const accountCatalog = createAccountCatalog({
      listClaude: async () => ({
        ok: true,
        active_key: null,
        accounts: [
          {
            key: 'new@example.com',
            email: 'new@example.com',
            status: 'ok',
            windows: [{ key: '5h', pct: 0, resetsAt: null }]
          }
        ]
      }),
      listCodex: async () => ({ ok: true, active_key: null, accounts: [] })
    });
    const onSwitchReady = vi.fn(async () => {});
    const { health } = setup(store, makeTimers(), makeSpawn({}, 0), {
      onSwitchReady,
      accountCatalog
    });
    health.sync(WS);

    await accountCatalog.listClaude();
    await flush();

    expect(onSwitchReady).toHaveBeenCalledExactlyOnceWith(
      WS,
      expect.arrayContaining([
        expect.objectContaining({ key: 'new@example.com' })
      ])
    );
    health.stop(WS);
    await accountCatalog.listClaude();
    expect(onSwitchReady).toHaveBeenCalledTimes(1);
  });
});

describe('catalog-driven usage probes', () => {
  /**
   * Exercise the same catalog read used by the existing hold-evaluation tick.
   *
   * @param {import('./account-catalog.js').Account['windows']} windows
   * @param {any} [spawnImpl]
   */
  async function setupUsage(windows, spawnImpl = makeHangingSpawn()) {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const account = {
      key: 'held@example.com',
      email: 'held@example.com',
      status: 'ok',
      windows
    };
    const listClaude = vi.fn(async () => ({
      ok: /** @type {const} */ (true),
      accounts: [account],
      active_key: account.key
    }));
    const accountCatalog = createAccountCatalog({
      listClaude,
      listCodex: async () => ({ ok: true, accounts: [], active_key: null })
    });
    const env = setup(store, timers, spawnImpl, { accountCatalog });
    seedHold(store, 'usage_limit', account.email, {
      resets_at: NOW + 172_800_000
    });
    await env.health.start(WS);
    return {
      ...env,
      store,
      timers,
      account,
      accountCatalog,
      listClaude,
      spawnImpl
    };
  }

  test('advances the existing timer to a model window reset plus grace', async () => {
    const env = await setupUsage([
      {
        key: 'Opus',
        pct: 100,
        resetsAt: new Date(NOW + 3_600_000).toISOString()
      },
      { key: '5h', pct: 2, resetsAt: new Date(NOW + 60_000).toISOString() }
    ]);
    const original = env.timers.next();

    await env.accountCatalog.listClaude();

    expect(original?.cleared).toBe(true);
    expect(env.timers.next()?.delay).toBe(3_660_000);
    expect(
      env.store.snapshot(WS).provider_hold.claude.targets[0]
    ).toMatchObject({
      resets_at: NOW + 172_800_000,
      next_probe_at: NOW + 3_660_000
    });
    expect(env.spawnImpl).not.toHaveBeenCalled();
  });

  test('uses the earlier generic reset when no model window exists', async () => {
    const env = await setupUsage([
      { key: 'Fable', pct: 1, resetsAt: new Date(NOW + 30_000).toISOString() },
      {
        key: '5h',
        pct: 100,
        resetsAt: new Date(NOW + 7_200_000).toISOString()
      },
      { key: '7d', pct: 100, resetsAt: new Date(NOW + 3_600_000).toISOString() }
    ]);

    await env.accountCatalog.listClaude();

    expect(env.timers.next()?.delay).toBe(3_660_000);
  });

  test.each([
    { windows: [] },
    { windows: [{ key: 'Fable', pct: 1, resetsAt: null }] },
    { windows: [{ key: 'Opus', pct: 100, resetsAt: 'invalid' }] },
    {
      windows: [
        {
          key: 'Opus',
          pct: 100,
          resetsAt: new Date(NOW + 259_200_000).toISOString()
        }
      ]
    }
  ])(
    'retains the CLI deadline without an earlier matching hint: %j',
    async ({ windows }) => {
      const env = await setupUsage(windows);
      const original = env.timers.next();
      const revision = env.store.snapshot(WS).revision;

      await env.accountCatalog.listClaude();

      expect(env.timers.next()).toBe(original);
      expect(env.store.snapshot(WS).revision).toBe(revision);
    }
  );

  test('probes immediately on available usage without clearing the target', async () => {
    const env = await setupUsage([{ key: 'Opus', pct: 4, resetsAt: null }]);

    await env.accountCatalog.listClaude();
    expect(env.timers.fireNext()).toBe(0);
    await flush();
    await env.accountCatalog.listClaude();

    expect(env.spawnImpl).toHaveBeenCalledOnce();
    expect(env.store.snapshot(WS).provider_hold.claude.targets).toHaveLength(1);
    expect(
      env.timers.entries.filter((entry) => !entry.cleared && !entry.fired)
    ).toHaveLength(1);
    env.health.stop(WS);
  });

  test.each([100, 4])(
    'rearms a rejected accelerated probe from CLI evidence at pct=%s',
    async (pct) => {
      const reset_at = NOW + 86_400_000;
      const spawnImpl = makeSpawn(
        [
          {
            type: 'rate_limit_event',
            rate_limit_info: { status: 'rejected', resetsAt: reset_at / 1000 }
          },
          {
            type: 'result',
            is_error: true,
            api_error_status: 429,
            result: "You've hit your limit"
          }
        ],
        1
      );
      const env = await setupUsage(
        [
          {
            key: 'Opus',
            pct,
            resetsAt: new Date(NOW + 3_600_000).toISOString()
          }
        ],
        spawnImpl
      );
      await env.accountCatalog.listClaude();

      env.timers.fireNext();
      await flush();
      const timer = env.timers.next();
      await env.accountCatalog.listClaude();

      expect(
        env.store.snapshot(WS).provider_hold.claude.targets[0]
      ).toMatchObject({
        resets_at: reset_at,
        next_probe_at: reset_at + 60_000,
        rearm_count: 1
      });
      expect(env.timers.next()).toBe(timer);
      expect(env.spawnImpl).toHaveBeenCalledOnce();
    }
  );

  test('observes a later catalog change without adding catalog reads', async () => {
    const env = await setupUsage([
      {
        key: 'Opus',
        pct: 100,
        resetsAt: new Date(NOW + 86_400_000).toISOString()
      }
    ]);
    await env.accountCatalog.listClaude();
    env.account.windows = [
      {
        key: 'Opus',
        pct: 100,
        resetsAt: new Date(NOW + 3_600_000).toISOString()
      }
    ];

    await env.accountCatalog.listClaude();
    const revision = env.store.snapshot(WS).revision;
    await env.accountCatalog.listClaude();

    expect(env.listClaude).toHaveBeenCalledTimes(3);
    expect(env.timers.next()?.delay).toBe(3_660_000);
    expect(env.store.snapshot(WS).revision).toBe(revision);
  });

  test('unsubscribes on stop and observes again after restart', async () => {
    const env = await setupUsage([{ key: 'Opus', pct: 4, resetsAt: null }]);
    env.health.stop(WS);

    await env.accountCatalog.listClaude();
    expect(env.timers.next()).toBeUndefined();
    await env.health.start(WS);
    await env.accountCatalog.listClaude();

    expect(env.timers.next()?.delay).toBe(0);
  });

  test('releases the hold only after an accelerated probe succeeds', async () => {
    const env = await setupUsage(
      [{ key: 'Opus', pct: 4, resetsAt: null }],
      makeSpawn({ is_error: false, result: 'ok' }, 0)
    );
    await env.accountCatalog.listClaude();
    expect(env.store.snapshot(WS).provider_hold.claude.targets).toHaveLength(1);

    env.timers.fireNext();
    await flush();

    expect(env.store.snapshot(WS).provider_hold).toEqual({});
    expect(env.notify.providerRecovered).toHaveBeenCalledOnce();
  });
});

describe('provider health probe', () => {
  test.each(['claude', 'codex'])(
    'releases an absent %s account without spawning a probe or notifying',
    async (runner) => {
      const store = createQueueStore({ now: () => NOW });
      const timers = makeTimers();
      const spawnImpl = makeHangingSpawn();
      const list = vi.fn(async () => ({ ok: true, accounts: [] }));
      const timeline = createBeadTimeline({ workspace_root: WS });
      const env = setup(store, timers, spawnImpl, {
        accountCatalog: { listClaude: list, listCodex: list },
        timeline
      });
      seedHold(store, 'outage', 'deleted', { runner });
      await env.health.start(WS);
      env.onPending.mockClear();

      timers.fireNext();
      await flush();

      expect(spawnImpl).not.toHaveBeenCalled();
      expect(store.snapshot(WS).provider_hold).toEqual({});
      expect(store.snapshot(WS).auto_resume_pending).toEqual([
        expect.objectContaining({ account: null, kind: 'provider_outage' })
      ]);
      expect(timeline.readTimeline('B1')).toEqual([
        expect.objectContaining({
          kind: 'provider_hold_released',
          summary: `${runner} 보류 해제 · account_absent`
        })
      ]);
      expect(env.onPending).toHaveBeenCalledOnce();
      expect(env.tick).toHaveBeenCalledWith(WS);
      expect(env.notify.providerRecovered).not.toHaveBeenCalled();
      expect(env.notify.providerAutoResumeDisarmed).not.toHaveBeenCalled();
      expect(timers.next()).toBeUndefined();
    }
  );

  test('records release for attempts joining during the account lookup', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const timeline = createBeadTimeline({ workspace_root: WS });
    /** @type {() => void} */
    let finishListing = () => {};
    const listing = new Promise((resolve) => {
      finishListing = () => resolve({ ok: true, accounts: [] });
    });
    const env = setup(store, timers, makeHangingSpawn(), {
      accountCatalog: { listClaude: () => listing },
      timeline
    });
    seedHold(store, 'outage', 'deleted');
    await env.health.start(WS);
    timers.fireNext();
    await flush();

    seedHold(store, 'outage', 'deleted', { attempt_id: 'att-2' });
    finishListing();
    await flush();

    expect(
      store.snapshot(WS).auto_resume_pending.map((entry) => entry.attempt_id)
    ).toEqual(['att-1', 'att-2']);
    expect(timeline.readTimeline('B2')).toEqual([
      expect.objectContaining({
        attempt_id: 'att-2',
        kind: 'provider_hold_released'
      })
    ]);
  });

  test.each(['present', 'unavailable', 'throws'])(
    'keeps probing when the account catalog is %s',
    async (state) => {
      const store = createQueueStore({ now: () => NOW });
      const timers = makeTimers();
      const spawnImpl = makeHangingSpawn();
      const env = setup(store, timers, spawnImpl, {
        accountCatalog: {
          listClaude: async () => {
            if (state === 'throws') {
              throw new Error('catalog unavailable');
            }
            return {
              ok: state === 'present',
              accounts: [{ key: 'held@example.com' }]
            };
          }
        }
      });
      seedHold(store, 'usage_limit', 'held@example.com');
      await env.health.start(WS);

      timers.fireNext();
      await flush();

      expect(spawnImpl).toHaveBeenCalledOnce();
      expect(store.snapshot(WS).provider_hold.claude.targets).toHaveLength(1);
      env.health.stop(WS);
    }
  );

  test('keeps an unbound outage target when the catalog is empty', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeHangingSpawn();
    const listClaude = vi.fn(async () => ({ ok: true, accounts: [] }));
    const env = setup(store, timers, spawnImpl, {
      accountCatalog: { listClaude }
    });
    seedHold(store, 'outage', null);
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    expect(listClaude).not.toHaveBeenCalled();
    expect(spawnImpl).toHaveBeenCalledOnce();
    expect(store.snapshot(WS).provider_hold.claude.targets).toHaveLength(1);
    env.health.stop(WS);
  });

  test('retains the lineage auto resume cap notification after a successful probe', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ is_error: false, result: 'ok' }, 0)
    );
    seedHold(store, 'usage_limit', 'held@example.com', { resets_at: NOW });
    store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: { auto_resume_kind: 'provider_outage' }
    });
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    expect(env.notify.providerAutoResumeDisarmed).toHaveBeenCalledWith(
      expect.objectContaining({ reason: 'auto_resume_cap' })
    );
    expect(store.snapshot(WS).auto_resume_pending).toEqual([]);
    expect(store.snapshot(WS).provider_hold).toEqual({});
  });

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
        'stream-json',
        '--verbose'
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
    const settle = store.settleProviderMembers.bind(store);
    vi.spyOn(store, 'settleProviderMembers').mockImplementation(
      (workspace, input) => {
        const settled = settle(workspace, input);
        if (settled.ok) {
          order.push('persist');
        }
        return settled;
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

  test('promotes a usage target only for a classified provider outage', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      { type: 'result', is_error: true, result: 'API Error: 529 Overloaded' },
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

  test.each([
    { result: 'permission denied' },
    { api_error_status: 401, result: '401 Unauthorized: Missing bearer' },
    {
      api_error_status: 403,
      result:
        'Your organization has disabled Claude subscription access for Claude Code'
    }
  ])(
    'keeps failed account probes scoped to the usage target: %j',
    async (failure) => {
      const store = createQueueStore({ now: () => NOW });
      const timers = makeTimers();
      const spawnImpl = makeSpawn(
        { type: 'result', is_error: true, ...failure },
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
      expect(target).toMatchObject({
        kind: 'usage_limit',
        account: 'held@example.com',
        rearm_count: 1,
        resets_at: NOW - 60_000,
        last_error:
          'api_error_status' in failure ? failure.result : 'probe_failed',
        attempt_ids: ['att-1']
      });
      expect(timers.next()?.delay).toBe(OUTAGE_BACKOFF_MS[1]);
    }
  );

  test('backs off repeated unclassified usage probes instead of reusing an expired reset', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ type: 'result', is_error: true, result: 'unknown' }, 1)
    );
    seedHold(store, 'usage_limit', 'held@example.com', {
      resets_at: NOW - 60_000
    });
    await env.health.start(WS);
    /** @type {number[]} */
    const delays = [];

    for (let index = 0; index < OUTAGE_BACKOFF_MS.length + 1; index += 1) {
      timers.fireNext();
      await flush();
      env.health.sync(WS);
      const next = timers.next();
      if (!next) {
        throw new Error('usage probe was not rearmed');
      }
      delays.push(next.delay);
    }

    expect(delays).toEqual([
      ...OUTAGE_BACKOFF_MS.slice(1),
      3_600_000,
      3_600_000
    ]);
    expect(store.snapshot(WS).provider_hold.claude.targets[0]).toMatchObject({
      kind: 'usage_limit',
      rearm_count: OUTAGE_BACKOFF_MS.length + 1
    });
  });

  test('rearms usage targets beyond three resets without a disarmed notification', async () => {
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
    seedHold(store, 'usage_limit', 'held@example.com', { rearm_count: 3 });

    await env.health.start(WS);
    expect(timers.next()?.delay).toBe(900_000);
    timers.fireNext();
    await flush();

    expect(timers.next()).toBeDefined();
    expect(spawnImpl).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).provider_hold.claude.targets[0].rearm_count).toBe(
      4
    );
    expect(env.notify.providerAutoResumeDisarmed).not.toHaveBeenCalled();
  });

  test('restores usage probing across a cold restart without disarming', async () => {
    const first_store = createQueueStore({ now: () => NOW });
    const first_timers = makeTimers();
    const probe_result = {
      type: 'result',
      is_error: true,
      api_error_status: 429,
      result: "You've hit your session limit · resets 6pm (Asia/Seoul)"
    };
    const first = setup(first_store, first_timers, makeSpawn(probe_result, 1));
    seedHold(first_store, 'usage_limit', 'held@example.com', {
      rearm_count: 3
    });
    await first.health.start(WS);
    await flush();
    first.health.stop(WS);

    const restarted_store = createQueueStore({ now: () => NOW });
    const restarted_timers = makeTimers();
    const restarted_spawn = makeSpawn(probe_result, 1);
    const restarted = setup(restarted_store, restarted_timers, restarted_spawn);

    await restarted.health.start(WS);
    await flush();

    expect(
      first.notify.providerAutoResumeDisarmed.mock.calls.length +
        restarted.notify.providerAutoResumeDisarmed.mock.calls.length
    ).toBe(0);
    expect(restarted_spawn).not.toHaveBeenCalled();
    expect(restarted_timers.next()?.delay).toBe(900_000);
  });

  test('recovers a repeatedly rearmed usage target at the scheduled probe', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn({ is_error: false, result: 'ok' }, 0);
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'usage_limit', 'held@example.com', { rearm_count: 3 });

    await env.health.start(WS);
    timers.fireNext();
    await flush();

    expect(store.snapshot(WS).provider_hold).toEqual({});
    expect(env.notify.providerRecovered).toHaveBeenCalledTimes(1);
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

  test('arms an aged usage target at reset plus sixty seconds', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn({ is_error: false, result: 'ok' }, 0);
    const env = setup(store, timers, spawnImpl, {
      now: () => NOW + 25 * 60 * 60 * 1000
    });
    seedHold(store, 'usage_limit', 'held@example.com', {
      resets_at: NOW + 26 * 60 * 60 * 1000
    });

    await env.health.start(WS);
    await flush();

    expect(timers.next()?.delay).toBe(3_660_000);
    expect(spawnImpl).not.toHaveBeenCalled();
    expect(env.notify.providerAutoResumeDisarmed).not.toHaveBeenCalled();
  });

  test('arms an outage target at the first rung of the backoff setting', async () => {
    __setTimingOverridesForTest({
      provider_outage_backoff_seconds: [180, 300, 600, 900, 1800, 7200]
    });
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ is_error: false, result: 'ok' }, 0)
    );
    seedHold(store, 'outage', null);

    await env.health.start(WS);

    expect(timers.next()?.delay).toBe(180_000);
  });

  test('arms an unknown-reset usage target at the unknown-reset setting', async () => {
    __setTimingOverridesForTest({ provider_usage_unknown_reset_seconds: 1800 });
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ is_error: false, result: 'ok' }, 0)
    );
    seedHold(store, 'usage_limit', 'held@example.com', { resets_at: null });

    await env.health.start(WS);

    expect(timers.next()?.delay).toBe(1_800_000);
  });

  test('arms a usage target at reset plus the grace setting', async () => {
    __setTimingOverridesForTest({ provider_usage_reset_grace_seconds: 120 });
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ is_error: false, result: 'ok' }, 0)
    );
    seedHold(store, 'usage_limit', 'held@example.com', {
      resets_at: NOW + 3_600_000
    });

    await env.health.start(WS);

    expect(timers.next()?.delay).toBe(3_720_000);
  });

  test('schedules a repeatedly rearmed target during a standalone sync', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn({ is_error: false, result: 'ok' }, 0);
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'usage_limit', 'held@example.com', { rearm_count: 3 });

    env.health.sync(WS);
    await flush();

    expect(spawnImpl).not.toHaveBeenCalled();
    expect(timers.next()?.delay).toBe(900_000);
    expect(store.snapshot(WS).provider_hold.claude.targets).toHaveLength(1);
  });

  test('keeps the revision stable for an already scheduled usage target', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ is_error: false, result: 'ok' }, 0)
    );
    seedHold(store, 'usage_limit', 'held@example.com', { rearm_count: 3 });
    env.health.sync(WS);
    await flush();
    const revision = store.snapshot(WS).revision;

    env.health.sync(WS);
    await flush();

    expect(store.snapshot(WS).revision).toBe(revision);
  });

  test('skips a repeatedly rearmed target whose probe is already in flight', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeHangingSpawn();
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'usage_limit', 'held@example.com', { rearm_count: 3 });
    env.health.probeNow('claude');

    await env.health.start(WS);
    await flush();

    expect(spawnImpl).toHaveBeenCalledTimes(1);
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

  test('demotes an outage whose probe stream carries a rejected account window', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeSpawn(
      [
        { type: 'system', subtype: 'init' },
        {
          type: 'rate_limit_event',
          rate_limit_info: { status: 'rejected', resetsAt: 1790679600 }
        },
        {
          type: 'result',
          is_error: true,
          api_error_status: 429,
          result: "You've reached your Fable limit."
        }
      ],
      1
    );
    const env = setup(store, timers, spawnImpl);
    seedHold(store, 'outage', 'held@example.com');
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    expect(store.snapshot(WS).provider_hold.claude.targets[0]).toMatchObject({
      kind: 'usage_limit',
      resets_at: 1790679600000
    });
  });

  test.each([
    { api_error_status: 401, result: '401 Unauthorized: Missing bearer' },
    {
      api_error_status: 403,
      result:
        'Your organization has disabled Claude subscription access for Claude Code'
    }
  ])(
    'narrows an existing outage after an account failure: %j',
    async (failure) => {
      const store = createQueueStore({ now: () => NOW });
      const timers = makeTimers();
      const spawnImpl = makeSpawn(
        { type: 'result', is_error: true, ...failure },
        1
      );
      const env = setup(store, timers, spawnImpl);
      seedHold(store, 'outage', 'held@example.com', { rearm_count: 49 });
      await env.health.start(WS);

      timers.fireNext();
      await flush();

      expect(store.snapshot(WS).provider_hold.claude.targets[0]).toMatchObject({
        kind: 'usage_limit',
        account: 'held@example.com',
        resets_at: null,
        rearm_count: 49,
        last_error: failure.result,
        attempt_ids: ['att-1']
      });
      expect(env.tick).toHaveBeenCalledTimes(1);
      expect(timers.next()?.delay).toBe(900_000);
    }
  );

  test('keeps an existing outage when the failed probe is unclassified', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ type: 'result', is_error: true, result: 'unknown' }, 1)
    );
    seedHold(store, 'outage', 'held@example.com');
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    expect(store.snapshot(WS).provider_hold.claude.targets[0].kind).toBe(
      'outage'
    );
    expect(env.tick).not.toHaveBeenCalled();
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

    const result = env.health.probeNow('claude');
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
    env.health.sync(WS);
    await flush();

    const result = env.health.probeNow('claude');
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

    const result = env.health.probeNow('claude');
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

    env.health.probeNow('claude');
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

    const first = env.health.probeNow('claude');
    const second = env.health.probeNow('claude');

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
    env.health.probeNow('claude');
    await flush();

    const again = env.health.probeNow('claude');
    await flush();

    expect(again.armed).toBe(1);
    expect(spawnImpl).toHaveBeenCalledTimes(2);
  });

  test('keeps the target identity through a demotion', async () => {
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
    const before = store.snapshot(WS).provider_hold.claude.targets[0];
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    expect(store.snapshot(WS).provider_hold.claude.targets[0]).toMatchObject({
      kind: 'usage_limit',
      target_id: before.target_id,
      attempt_ids: ['att-1']
    });
  });
});

describe('server-global probes and releases (UI-3v1h §5.4)', () => {
  const OTHER = '/tmp/example-workspace/project-b';

  /**
   * Hold one attempt of a workspace on a target.
   *
   * @param {ReturnType<typeof createQueueStore>} store
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {{ kind?: 'outage'|'usage_limit', account?: string|null, resets_at?: number|null, auto_switch?: { candidate_account: string|null } }} [input]
   */
  function holdIn(store, workspace, attempt_id, input = {}) {
    const kind = input.kind ?? 'usage_limit';
    store.appendAttempt(workspace, {
      expected_revision: store.snapshot(workspace).revision,
      attempt: { attempt_id, bead_id: `B-${attempt_id}` }
    });
    store.updateAttempt(workspace, {
      attempt_id,
      patch: { runner: 'claude', model: 'opus', status: 'running' }
    });
    return store.holdProviderAttempt(workspace, {
      attempt_id,
      patch: {
        status: 'paused',
        cause: `provider_outage:${kind}`,
        finished_at: NOW
      },
      runner: 'claude',
      target: {
        kind,
        model: 'opus',
        account:
          input.account === undefined ? 'held@example.com' : input.account,
        detail: kind,
        last_error: kind,
        resets_at: input.resets_at === undefined ? NOW : input.resets_at,
        rearm_count: 0,
        attempt_ids: []
      },
      ...(input.auto_switch ? { auto_switch: input.auto_switch } : {})
    });
  }

  /**
   * Register OTHER's own collaborators on the shared controller.
   *
   * @param {ReturnType<typeof setup>} env
   * @param {string[]} [resumed_beads]
   */
  function registerOther(env, resumed_beads = ['B-b1']) {
    const hooks = {
      repo: OTHER,
      notify: env.notify,
      onPending: vi.fn(async () => ({ resumed_beads, refusals: [] })),
      tick: vi.fn(async () => {})
    };
    env.health.register(OTHER, hooks);
    return hooks;
  }

  test('probes a target two workspaces wait on with one process', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeHangingSpawn();
    const env = setup(store, timers, spawnImpl);
    registerOther(env);
    holdIn(store, WS, 'a1');
    holdIn(store, OTHER, 'b1');
    await env.health.start(WS);
    await env.health.start(OTHER);
    const armed = timers.entries.filter(
      (entry) => !entry.fired && !entry.cleared
    ).length;

    timers.fireNext();
    await flush();

    expect(armed).toBe(1);
    expect(spawnImpl).toHaveBeenCalledOnce();
  });

  test('sends one recovery naming the beads both workspaces resumed', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ is_error: false, result: 'ok' }, 0)
    );
    registerOther(env);
    holdIn(store, WS, 'a1');
    holdIn(store, OTHER, 'b1');
    await env.health.start(WS);
    await env.health.start(OTHER);

    timers.fireNext();
    await flush();

    expect(env.notify.providerRecovered).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        resumed_beads: ['B1', 'B-b1'],
        repo: WS
      })
    );
  });

  test('writes a receipt in both workspaces and ticks both', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ is_error: false, result: 'ok' }, 0)
    );
    const other = registerOther(env);
    holdIn(store, WS, 'a1');
    holdIn(store, OTHER, 'b1');
    await env.health.start(WS);
    await env.health.start(OTHER);

    timers.fireNext();
    await flush();

    expect(
      [WS, OTHER].map((workspace) =>
        store
          .snapshot(workspace)
          .auto_resume_pending.map((entry) => [
            entry.attempt_id,
            entry.account,
            entry.kind
          ])
      )
    ).toEqual([
      [['a1', 'held@example.com', 'provider_outage']],
      [['b1', 'held@example.com', 'provider_outage']]
    ]);
    expect(env.tick).toHaveBeenCalledWith(WS);
    expect(other.tick).toHaveBeenCalledWith(OTHER);
  });

  test('sends no recovery once both workspaces switched their attempts away', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ is_error: false, result: 'ok' }, 0)
    );
    registerOther(env, []);
    env.onPending.mockImplementation(async () => ({
      resumed_beads: [],
      refusals: []
    }));
    for (const workspace of [WS, OTHER]) {
      store.setProviderLimitPolicy(workspace, {
        expected_revision: store.snapshot(workspace).revision,
        runner: 'claude',
        patch: { mode: 'switch', accounts: ['new@example.com'] }
      });
    }
    holdIn(store, WS, 'a1', {
      auto_switch: { candidate_account: 'new@example.com' }
    });
    holdIn(store, OTHER, 'b1', {
      auto_switch: { candidate_account: 'new@example.com' }
    });
    await env.health.start(WS);
    await env.health.start(OTHER);

    timers.fireNext();
    await flush();

    expect(store.providerHolds.holds()).toEqual({});
    expect(env.notify.providerRecovered).not.toHaveBeenCalled();
  });

  test('reproduces a release a restart interrupted with exactly one receipt', async () => {
    const store = createQueueStore({ now: () => NOW });
    holdIn(store, WS, 'a1');
    const target = store.snapshot(WS).provider_hold.claude.targets[0];
    store.providerHolds.remove(String(target.target_id));
    const restarted = createQueueStore({ now: () => NOW });
    const first = setup(restarted, makeTimers(), makeHangingSpawn());
    await first.health.start(WS);
    first.health.stop(WS);
    const second = setup(
      createQueueStore({ now: () => NOW }),
      makeTimers(),
      makeHangingSpawn()
    );

    await second.health.start(WS);

    expect(createQueueStore().snapshot(WS).auto_resume_pending).toEqual([
      expect.objectContaining({
        attempt_id: 'a1',
        account: 'held@example.com',
        kind: 'provider_outage'
      })
    ]);
  });

  test('sends no recovery for a release a restart interrupted', async () => {
    const store = createQueueStore({ now: () => NOW });
    holdIn(store, WS, 'a1');
    const target = store.snapshot(WS).provider_hold.claude.targets[0];
    store.providerHolds.remove(String(target.target_id));
    const env = setup(
      createQueueStore({ now: () => NOW }),
      makeTimers(),
      makeHangingSpawn()
    );

    await env.health.start(WS);

    expect(env.notify.providerRecovered).not.toHaveBeenCalled();
  });

  test('consumes a released receipt while another workspace holds the runner anew', async () => {
    const store = createQueueStore({ now: () => NOW });
    holdIn(store, WS, 'a1');
    const target = store.snapshot(WS).provider_hold.claude.targets[0];
    store.providerHolds.remove(String(target.target_id));
    store.settleProviderMembers(WS);
    holdIn(store, OTHER, 'b1', { account: 'other@example.com' });
    /** @type {string[]} */
    const seen = [];
    const env = setup(store, makeTimers(), makeHangingSpawn(), {
      onPending: async () => {
        seen.push(
          ...store.snapshot(WS).auto_resume_pending.map((e) => e.attempt_id)
        );
        return { resumed_beads: [], refusals: [] };
      }
    });

    await env.health.start(WS);

    expect(seen).toEqual(['a1']);
  });

  test('consumes that receipt after a cold restart too', async () => {
    const store = createQueueStore({ now: () => NOW });
    holdIn(store, WS, 'a1');
    const target = store.snapshot(WS).provider_hold.claude.targets[0];
    store.providerHolds.remove(String(target.target_id));
    store.settleProviderMembers(WS);
    holdIn(store, OTHER, 'b1', { account: 'other@example.com' });
    const restarted = createQueueStore({ now: () => NOW });
    /** @type {string[]} */
    const seen = [];
    const env = setup(restarted, makeTimers(), makeHangingSpawn(), {
      onPending: async () => {
        seen.push(
          ...restarted.snapshot(WS).auto_resume_pending.map((e) => e.attempt_id)
        );
        return { resumed_beads: [], refusals: [] };
      }
    });

    await env.health.start(WS);

    expect(seen).toEqual(['a1']);
  });

  test('consumes a receipt that predates the migration at the first start', async () => {
    /** @param {string} attempt_id */
    const paused = (attempt_id) => ({
      attempt_id,
      bead_id: `B-${attempt_id}`,
      runner: 'claude',
      status: 'paused',
      cause: 'provider_outage:usage_limit'
    });
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        attempts: { a1: paused('a1'), older: paused('older') },
        provider_hold: {
          claude: {
            since: NOW,
            generation: 5,
            targets: [
              {
                kind: 'usage_limit',
                model: 'opus',
                account: 'held@example.com',
                detail: 'usage_limit',
                attempt_ids: ['a1']
              }
            ]
          }
        },
        auto_resume_pending: [
          {
            attempt_id: 'older',
            generation: 4,
            account: null,
            kind: 'provider_outage'
          }
        ]
      })
    );
    const store = createQueueStore({ now: () => NOW });
    store.migrateProviderHolds(WS);
    /** @type {string[]} */
    const seen = [];
    const env = setup(store, makeTimers(), makeHangingSpawn(), {
      onPending: async () => {
        seen.push(
          ...store.snapshot(WS).auto_resume_pending.map((e) => e.attempt_id)
        );
        return { resumed_beads: [], refusals: [] };
      }
    });

    await env.health.start(WS);

    expect(seen).toEqual(['older']);
  });

  test('probes in the state directory when the origin is not attached', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeHangingSpawn();
    const env = setup(store, timers, spawnImpl);
    holdIn(store, OTHER, 'b1');
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    expect(spawnImpl).toHaveBeenCalledWith(
      '/bin/cswap',
      expect.any(Array),
      expect.objectContaining({ cwd: path.join(tmp_state, 'bdui') })
    );
  });

  test('widens a credential outage to its runner on a provider-scope probe failure', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn(
        { type: 'result', is_error: true, result: 'API Error: 529 Overloaded' },
        1
      )
    );
    holdIn(store, WS, 'a1', { kind: 'outage' });
    const target = store.snapshot(WS).provider_hold.claude.targets[0];
    store.providerHolds.update(String(target.target_id), {
      detail: 'credential'
    });
    await env.health.start(WS);

    timers.fireNext();
    await flush();

    expect(store.snapshot(WS).provider_hold.claude.targets[0]).toMatchObject({
      kind: 'outage',
      detail: 'overloaded_529',
      account: 'held@example.com',
      last_error: 'API Error: 529 Overloaded'
    });
  });

  test('retries a failed membership settlement and ticks that workspace', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const env = setup(
      store,
      timers,
      makeSpawn({ is_error: false, result: 'ok' }, 0)
    );
    holdIn(store, WS, 'a1');
    await env.health.start(WS);
    vi.spyOn(store, 'settleProviderMembers').mockImplementationOnce(() => {
      throw new Error('disk full');
    });
    timers.fireNext();
    await flush();
    env.tick.mockClear();

    timers.fireNext();
    await flush();

    expect(store.snapshot(WS).auto_resume_pending).toEqual([
      expect.objectContaining({
        attempt_id: 'a1',
        account: 'held@example.com',
        kind: 'provider_outage'
      })
    ]);
    expect(env.tick).toHaveBeenCalledWith(WS);
  });

  test('skips a timer whose target left before it fired', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeHangingSpawn();
    const env = setup(store, timers, spawnImpl);
    holdIn(store, WS, 'a1');
    await env.health.start(WS);
    const stale = timers.next();
    const target = store.snapshot(WS).provider_hold.claude.targets[0];
    store.providerHolds.remove(String(target.target_id));
    holdIn(store, OTHER, 'b1', { account: 'other@example.com' });

    /** @type {NonNullable<typeof stale>} */ (stale).fired = true;
    /** @type {NonNullable<typeof stale>} */ (stale).fn();
    await flush();

    expect(spawnImpl).not.toHaveBeenCalled();
    expect(store.snapshot(WS).auto_resume_pending).toEqual([]);
  });

  test('probes in the origin workspace while it is attached', async () => {
    const store = createQueueStore({ now: () => NOW });
    const timers = makeTimers();
    const spawnImpl = makeHangingSpawn();
    const env = setup(store, timers, spawnImpl);
    registerOther(env);
    holdIn(store, OTHER, 'b1');
    await env.health.start(OTHER);

    timers.fireNext();
    await flush();

    expect(spawnImpl).toHaveBeenCalledWith(
      '/bin/cswap',
      expect.any(Array),
      expect.objectContaining({ cwd: OTHER })
    );
  });
});
