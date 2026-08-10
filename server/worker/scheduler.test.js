import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PassThrough } from 'node:stream';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createExecPresetStore } from '../exec-preset-store.js';
import { EXEC_SETTING_KEYS } from './exec-enums.js';
import { createExecPresetCoordinator } from './exec-preset-coordinator.js';
import { install as guardHookInstall } from './guard-hook.js';
import { resolveExecSettings } from './policy.js';
import { createQueueStore } from './queue-store.js';
import { claudeSpec } from './runner/claude.js';
import { makeFixtureSpawn } from './runner/fixture-spawn.js';
import { createRunner } from './runner/index.js';
import { runSession } from './runner/session.js';
import { createScheduler } from './scheduler.js';
import { guardHookDir } from './state-paths.js';
import { createUsageStore } from './usage-store.js';

const WS = '/tmp/example-workspace/project-a';

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-sched-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

/**
 * @returns {Promise<void>}
 */
function flush() {
  return new Promise((r) => setImmediate(r));
}

/**
 * Fake runner factory: each spawn returns a handle whose `done` stays pending
 * until the test resolves it. Records every spawn.
 */
function makeFakeRunner() {
  /** @type {Map<string, { handle: any, resolve: (v: any) => void, settings: any }>} */
  const byBead = new Map();
  /** @type {string[]} */
  const spawnOrder = [];
  /**
   * The runner NAME each launch asked the factory for, in call order.
   *
   * @type {string[]}
   */
  const factoryNames = [];
  const factory = (/** @type {string} */ runner_name) => {
    factoryNames.push(runner_name);
    return {
      name: runner_name,
      /**
       * @param {any} bead
       * @param {string} ws
       * @param {any} settings
       */
      spawn(bead, ws, settings) {
        const events = new EventEmitter();
        /** @type {(v: any) => void} */
        let resolveDone = () => {};
        const done = new Promise((res) => {
          resolveDone = res;
        });
        const handle = {
          pid: 9000 + spawnOrder.length,
          kill: vi.fn(),
          events,
          done
        };
        byBead.set(
          bead.id,
          /** @type {any} */ ({
            handle,
            resolve: resolveDone,
            settings,
            bead,
            cwd: ws
          })
        );
        spawnOrder.push(bead.id);
        return handle;
      }
    };
  };
  return {
    factory,
    spawnOrder,
    factoryNames,
    /**
     * @param {string} bead_id
     * @param {Partial<{ success: boolean, reason: string, exit: number | null, blocked: boolean, blocked_detail: { reason: string, command: string|null }|null }>} v
     */
    finish(bead_id, v) {
      const rec = byBead.get(bead_id);
      if (!rec) {
        throw new Error(`no session for ${bead_id}`);
      }
      rec.resolve({
        success: v.success ?? true,
        reason: v.reason ?? 'ok',
        exit: v.exit ?? 0,
        blocked: v.blocked ?? false,
        blocked_detail: v.blocked_detail ?? null,
        events: [],
        raw: []
      });
    },
    settingsFor(/** @type {string} */ bead_id) {
      return byBead.get(bead_id)?.settings;
    },
    /** The spawn literal a dispatch/resume passed to the adapter. */
    spawnedBead(/** @type {string} */ bead_id) {
      return /** @type {any} */ (byBead.get(bead_id))?.bead;
    },
    /** The working directory the session was spawned in. */
    cwdFor(/** @type {string} */ bead_id) {
      return /** @type {any} */ (byBead.get(bead_id))?.cwd;
    },
    killFor(/** @type {string} */ bead_id) {
      return byBead.get(bead_id)?.handle.kill;
    },
    /**
     * The live handle's event emitter for a bead — lets a test drive the
     * runner's `session_id` event (spec §2).
     *
     * @param {string} bead_id
     * @returns {EventEmitter}
     */
    eventsFor(bead_id) {
      return byBead.get(bead_id)?.handle.events;
    }
  };
}

/**
 * Build a fake bd with per-bead snapshots + captured metadata calls.
 *
 * @param {Record<string, Partial<import('./scheduler.js').BeadSnapshot>>} config
 */
function makeFakeBd(config) {
  /** @type {Array<{ method: string, bead_id: string, key?: string, value?: string }>} */
  const calls = [];
  /**
   * Live bd status per bead, seeded from the config's `status` so a test can
   * model a session that ended still holding its `in_progress` claim.
   *
   * @type {Record<string, string>}
   */
  const statuses = {};
  for (const [bead_id, c] of Object.entries(config)) {
    if (c && typeof c.status === 'string' && c.status.length > 0) {
      statuses[bead_id] = c.status;
    }
  }
  /**
   * Per-bead snapshot call count, so a test can make the SECOND read (the
   * dispatch re-read) disagree with the first (the tick scan) — the TOCTOU
   * window the dispatch guards cover.
   *
   * @type {Record<string, number>}
   */
  const snapshot_calls = {};
  let snapshotCount = 0;
  return {
    calls,
    statuses,
    snapshotCounts: () => snapshotCount,
    /**
     * @param {string} bead_id
     * @returns {Promise<import('./scheduler.js').BeadSnapshot>}
     */
    async snapshotBead(bead_id) {
      snapshotCount += 1;
      const nth = (snapshot_calls[bead_id] =
        (snapshot_calls[bead_id] ?? 0) + 1);
      const c = /** @type {any} */ (config[bead_id] || {});
      if (c.throwOnSnapshotAt === 'all' || c.throwOnSnapshotAt === nth) {
        throw new Error(`bd snapshot failed for ${bead_id}`);
      }
      // `ready_follows_status` models bd's real rule — an `in_progress` bead is
      // hidden from `bd ready` — for the tests that turn on the claim.
      const ready = c.ready_follows_status
        ? (statuses[bead_id] ?? 'open') === 'open'
        : (c.ready ?? true);
      // `null` in config means the bead metadata key is ABSENT (undefined),
      // vs. omitted keys which fall back to a present default — this lets a
      // test model a bead that leaves model/effort unset so a global default
      // can fill (and stamp) it.
      return {
        ready: c.notReadyAt === nth ? false : ready,
        blocked: c.blocked ?? false,
        repo: c.repo ?? '/repo',
        target_base: c.target_base ?? 'main',
        model: c.model === null ? undefined : (c.model ?? 'opus'),
        effort: c.effort === null ? undefined : (c.effort ?? 'high'),
        spec_review_model: c.spec_review_model ?? undefined,
        impl_model: c.impl_model ?? undefined,
        workflow_mode: c.workflow_mode ?? null,
        route: c.route ?? null,
        status: c.status ?? '',
        title: c.title ?? null,
        spec_review: c.spec_review,
        deps: c.deps ?? []
      };
    },
    async setMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key,
      /** @type {string} */ value
    ) {
      // A bead may be configured to make its workflow_mode set throw (F9), or
      // to make one exec-setting key's stamp throw (exec partial-failure).
      const cfg = /** @type {any} */ (config[bead_id]);
      if (cfg && cfg.throwOnSet && key === 'workflow_mode') {
        throw new Error(`bd set-metadata failed for ${bead_id}`);
      }
      if (cfg && cfg.throwOnSetKey === key) {
        throw new Error(`bd set-metadata failed for ${bead_id} ${key}`);
      }
      if (cfg && typeof cfg.onSet === 'function') {
        cfg.onSet({ bead_id, key, value });
      }
      calls.push({ method: 'setMetadata', bead_id, key, value });
    },
    async unsetMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key
    ) {
      const cfg = /** @type {any} */ (config[bead_id]);
      if (cfg && cfg.throwOnUnset && key === 'workflow_mode') {
        throw new Error(`bd unset-metadata failed for ${bead_id}`);
      }
      calls.push({ method: 'unsetMetadata', bead_id, key });
    },
    async readMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key
    ) {
      // A bead may be configured to make ONE exec-setting key's readback throw
      // (set succeeds, confirming read fails) — the exec-stamp readback-failure
      // cleanup case.
      const cfg = /** @type {any} */ (config[bead_id]);
      if (cfg && cfg.throwOnReadKey === key) {
        throw new Error(`bd read-metadata failed for ${bead_id} ${key}`);
      }
      // Readback of the fast_track we just set.
      const last = [...calls]
        .reverse()
        .find(
          (c) =>
            c.method === 'setMetadata' && c.bead_id === bead_id && c.key === key
        );
      return last?.value ?? null;
    },
    async setStatus(
      /** @type {string} */ bead_id,
      /** @type {string} */ status
    ) {
      const cfg = /** @type {any} */ (config[bead_id]);
      if (cfg && cfg.throwOnSetStatus) {
        throw new Error(`bd update --status failed for ${bead_id}`);
      }
      calls.push({ method: 'setStatus', bead_id, value: status });
      statuses[bead_id] = status;
    },
    async readStatus(/** @type {string} */ bead_id) {
      const cfg = /** @type {any} */ (config[bead_id]);
      if (cfg && cfg.throwOnReadStatus) {
        throw new Error(`bd show failed for ${bead_id}`);
      }
      // A bead configured to swallow its status write reads back unchanged —
      // the readback-failure case.
      return cfg && cfg.readStatusStuck
        ? (cfg.status ?? null)
        : (statuses[bead_id] ?? null);
    }
  };
}

/**
 * @param {{ config: Record<string, any>, store?: any, slots?: number, verifyOk?: boolean, verify?: any, probePid?: (pid: number|null) => { alive: boolean, started_at: number|null }, makeRunner?: (name: string) => any, admission?: any, resolveBase?: any, notify?: any, disposition?: any, externalPrs?: Record<string, any>, execPresetCoordinator?: any, notifyQueueChanged?: (workspace: string) => void, usage?: null, sessionLog?: any, sessionMonitors?: any, guardHook?: any, gitRun?: any }} opts
 */
function setup(opts) {
  const store = /** @type {ReturnType<typeof createQueueStore>} */ (
    opts.store || createQueueStore()
  );
  const runner = makeFakeRunner();
  const bd = makeFakeBd(opts.config);
  const execPresetCoordinator = opts.execPresetCoordinator || {
    /**
     * @param {string} workspace
     * @param {import('./scheduler.js').BeadSnapshot} bead
     */
    resolveForDispatch(workspace, bead) {
      return {
        ok: true,
        preset_id: null,
        preset_revision: null,
        settings: {},
        exec: resolveExecSettings({
          bead,
          defaults: store.snapshot(workspace).exec_defaults
        })
      };
    }
  };
  const verify = opts.verify || {
    verifyPrSubmitted: vi.fn(async () => ({
      ok: opts.verifyOk ?? true,
      reason: (opts.verifyOk ?? true) ? 'ok' : 'pr_missing',
      pr_url: (opts.verifyOk ?? true) ? 'https://github.com/o/r/pull/1' : null
    }))
  };
  const worktree = {
    add: vi.fn(async ({ bead_id }) => ({
      path: `/wt/${bead_id}`,
      branch: bead_id,
      base_oid: `base-${bead_id}`
    })),
    remove: vi.fn(async () => ({ code: 0 })),
    // Default: no residue in the way (the primitive's own verdicts are covered
    // against real git in worktree.integration.test.js). Loosely typed so a
    // test can swap in a refusing or throwing variant.
    removeIfDiscardable: /** @type {any} */ (
      vi.fn(async () => ({ ok: true, removed: false, reason: null }))
    ),
    addDetached: vi.fn(async (/** @type {any} */ { name }) => ({
      path: `/wt-verify/${name}`
    })),
    removeDetached: vi.fn(async () => ({ code: 0 })),
    pathFor: (/** @type {string} */ _repo, /** @type {string} */ bead_id) =>
      `/wt/${bead_id}`,
    exists: vi.fn(() => true)
  };
  const sessionLog = opts.sessionLog || { attach: vi.fn() };
  const usage = opts.usage === null ? undefined : createUsageStore();
  const scheduler = createScheduler({
    store,
    makeRunner: opts.makeRunner || runner.factory,
    bd,
    worktree,
    verify,
    sessionLog,
    usage,
    admission: opts.admission,
    resolveBase: opts.resolveBase,
    notify: opts.notify,
    disposition: opts.disposition,
    // Absent by default: the external registry is a live-wiring dep, and a
    // scheduler built without it must refuse the external dispatch outright.
    externalPrs: opts.externalPrs
      ? {
          get: (/** @type {string} */ _ws, /** @type {string} */ bead_id) =>
            /** @type {any} */ (opts.externalPrs)[bead_id] || null
        }
      : undefined,
    probePid: opts.probePid,
    sessionMonitors: opts.sessionMonitors,
    execPresetCoordinator,
    // Absent ⇒ the REAL guard-hook module, writing under the tmp
    // XDG_STATE_HOME this file arms. An override is only how a test drives an
    // install failure (UI-8mvc §2).
    guardHook: opts.guardHook,
    // The post-hoc base observation's two runners (UI-8mvc §3). Absent by
    // default: a scheduler built without them records the observation as
    // undone rather than judging an attempt it could not observe.
    gitRun: opts.gitRun,
    notifyQueueChanged: opts.notifyQueueChanged,
    now: () => 1000
  });
  // The concurrency cap lives in the STORE now (worker-phase2 §3), not in a
  // constructor dep, so a test sets it exactly the way the UI does.
  store.setSlots(WS, {
    expected_revision: store.snapshot(WS).revision,
    slots: opts.slots ?? 2
  });
  return { store, runner, bd, verify, worktree, scheduler, usage };
}

/**
 * Seed the single waiting lane in order and arm auto_advance.
 *
 * @param {any} store
 * @param {string[]} ids
 */
function seedQueue(store, ids) {
  let rev = store.snapshot(WS).revision;
  for (const id of ids) {
    rev = store.place(WS, {
      expected_revision: rev,
      bead_id: id
    }).queue.revision;
  }
  store.setAutoAdvance(WS, true);
}

/**
 * Park one bead in the durable PR-wait lane.
 *
 * @param {any} store
 * @param {string} bead_id
 */
function seedPrWait(store, bead_id) {
  const attempt_id = `att-${bead_id}`;
  store.appendAttempt(WS, {
    expected_revision: store.snapshot(WS).revision,
    attempt: { attempt_id, bead_id }
  });
  store.moveToPrWait(WS, {
    bead_id,
    attempt_id,
    patch: { status: 'done' }
  });
}

/**
 * Set workspace-global exec defaults (CAS-threaded) before dispatch.
 *
 * @param {any} store
 * @param {Record<string, string>} defaults
 */
function seedExecDefaults(store, defaults) {
  let rev = store.snapshot(WS).revision;
  for (const [key, value] of Object.entries(defaults)) {
    rev = store.setExecDefault(WS, {
      expected_revision: rev,
      key,
      value
    }).queue.revision;
  }
}

describe('scheduler slot policy (single scan, worker-phase2 §3)', () => {
  test('holds a single slot while one durable PR waits', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedPrWait(env.store, 'P1');
    env.store.setPrWaitHoldsSlot(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      on: true
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(0);
  });

  test('starts one session in merge-serial mode with two configured slots', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 2 });
    env.store.setPrWaitHoldsSlot(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      on: true
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(1);
    expect(env.scheduler.runningBeads()).toEqual(['S1']);
  });

  test('blocks both configured slots while one durable PR waits', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 2 });
    seedPrWait(env.store, 'P1');
    env.store.setPrWaitHoldsSlot(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      on: true
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(0);
  });

  test('restores two-slot dispatch when merge-serial mode turns off', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 2 });
    env.store.setPrWaitHoldsSlot(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      on: true
    });
    seedQueue(env.store, ['S1', 'S2']);
    await env.scheduler.tick(WS);
    env.store.setPrWaitHoldsSlot(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      on: false
    });

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningBeads()).toEqual(['S1', 'S2']);
  });

  test('ignores durable PR waits when slot holding is off', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedPrWait(env.store, 'P1');
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningBeads()).toEqual(['S1']);
  });

  test('dispatches after the durable PR wait leaves and a tick runs', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedPrWait(env.store, 'P1');
    env.store.setPrWaitHoldsSlot(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      on: true
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(env.scheduler.runningCount()).toBe(0);

    env.store.removeFromPrWait(WS, { bead_id: 'P1' });
    await env.scheduler.tick(WS);

    expect(env.scheduler.runningBeads()).toEqual(['S1']);
  });

  test('fills exactly N slots from the queue in order', async () => {
    const env = setup({
      config: {
        S1: {},
        S2: {},
        P1: {},
        P2: {},
        P3: {}
      },
      slots: 3
    });
    seedQueue(env.store, ['S1', 'S2', 'P1', 'P2', 'P3']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(3);
    expect(env.scheduler.runningBeads().sort()).toEqual(['P1', 'S1', 'S2']);
    expect(env.scheduler.isRunning('P2')).toBe(false);
    expect(env.scheduler.isRunning('P3')).toBe(false);
  });

  test('runs exactly one session at a time at slots=1 (the retired serial lane)', async () => {
    const env = setup({ config: { S1: {}, S2: {}, S3: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2', 'S3']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(1);
    expect(env.scheduler.runningBeads()).toEqual(['S1']);
    // A second tick against the full cap starts nothing new.
    await env.scheduler.tick(WS);
    expect(env.scheduler.runningCount()).toBe(1);
  });

  test('advances to the next queued bead when the slots=1 session finishes', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(env.scheduler.runningCount()).toBe(1);
    expect(env.scheduler.runningBeads()).toEqual(['S2']);
  });

  test('reads the cap from the store, so a slots edit applies on the next tick', async () => {
    const env = setup({ config: { S1: {}, S2: {}, S3: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2', 'S3']);
    await env.scheduler.tick(WS);

    env.store.setSlots(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      slots: 3
    });
    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(3);
  });

  test('skips a blocked bead to the next runnable one', async () => {
    const env = setup({
      config: {
        S1: { blocked: true },
        S2: { blocked: false }
      },
      slots: 1
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
  });

  /**
   * Persist a `running` attempt the way a PRIOR server process left it: the
   * durable record survives the restart, the in-memory Sets do not. A fresh
   * scheduler over this store IS the post-restart state.
   *
   * @param {any} store
   * @param {string} bead_id
   * @param {Partial<import('./queue-store.js').Attempt>} [patch]
   */
  function seedSurvivingAttempt(store, bead_id, patch = {}) {
    const attempt_id = `att-${bead_id}`;
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id, bead_id }
    });
    store.updateAttempt(WS, {
      attempt_id,
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        workflow_mode_prior: null,
        ...patch
      }
    });
  }

  test('counts a restart-surviving session against the cap (UI-97qo)', async () => {
    const env = setup({
      config: { S1: {}, S2: {} },
      slots: 2,
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    seedSurvivingAttempt(env.store, 'UI-1');
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(1);
    expect(env.scheduler.runningBeads()).toEqual(['S1']);
  });

  test('frees the slot of a surviving attempt whose process is gone', async () => {
    const env = setup({
      config: { S1: {}, S2: {} },
      slots: 2,
      probePid: () => ({ alive: false, started_at: null })
    });
    seedSurvivingAttempt(env.store, 'UI-1');
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(2);
  });

  test('frees the slot of a paused attempt', async () => {
    const env = setup({
      config: { S1: {}, S2: {} },
      slots: 2,
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    seedSurvivingAttempt(env.store, 'UI-1', { status: 'paused' });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(2);
  });

  test('probes no pid when this process owns every running attempt', async () => {
    const probePid = vi.fn(() => ({ alive: true, started_at: 1000 }));
    const env = setup({ config: { S1: {}, S2: {} }, slots: 2, probePid });
    seedQueue(env.store, ['S1', 'S2']);
    await env.scheduler.tick(WS);

    await env.scheduler.tick(WS);

    expect(probePid).not.toHaveBeenCalled();
  });
});

describe('scheduler stop (■ tile)', () => {
  test('stop group-kills the attempt, discards it, reverts workflow_mode, keeps auto_advance', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('S1')).toBe(true);

    const kill = env.runner.killFor('S1');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const stopped = await env.scheduler.stop(WS, attempt_id);
    expect(stopped).toBe(true);

    // The runner handle was group-killed.
    expect(kill).toHaveBeenCalledWith('SIGTERM');

    // Attempt is terminal `stopped` with no cause — a user halt is not a
    // failure (worker-phase1 §1) — and the bead left the lane (§2.2).
    const snap = env.store.snapshot(WS);
    expect(snap.attempts[attempt_id].status).toBe('stopped');
    expect(snap.attempts[attempt_id].cause).toBe(null);
    expect(snap.queue.map((e) => e.bead_id)).toEqual([]);
    expect(env.scheduler.isRunning('S1')).toBe(false);
    // workflow_mode reverted (prior unset → unsetMetadata).
    expect(
      env.bd.calls.some(
        (c) =>
          c.method === 'unsetMetadata' &&
          c.bead_id === 'S1' &&
          c.key === 'workflow_mode'
      )
    ).toBe(true);
    // A user stop does NOT halt the queue.
    expect(snap.auto_advance).toBe(true);
  });

  test('a late done() after stop does not re-fail or halt the queue', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.stop(WS, attempt_id);
    // The killed session's done resolves late (failure verdict) — must be inert.
    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).auto_advance).toBe(true);
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('stopped');
  });

  test('stop returns false for an unknown attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    expect(await env.scheduler.stop(WS, 'nope')).toBe(false);
  });

  test('discard frees the slot and advances the queue (§2.2)', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.stop(WS, attempt_id);

    // The discarded bead is gone from the lane and never re-dispatched; the
    // next queued bead takes the freed slot in the same operation.
    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S2']);
  });
});

describe('scheduler pause (⏸ tile, worker-phase1 §2.1)', () => {
  test('pause records `paused`, keeps the bead queued, and advances the queue', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    const kill = env.runner.killFor('S1');

    expect(await env.scheduler.pause(WS, attempt_id)).toEqual({ ok: true });

    expect(kill).toHaveBeenCalledWith('SIGTERM');
    const snap = env.store.snapshot(WS);
    expect(snap.attempts[attempt_id].status).toBe('paused');
    expect(snap.attempts[attempt_id].cause).toBe(null);
    // The bead stays queued (resume runs in the same worktree)...
    expect(snap.queue.map((e) => e.bead_id)).toEqual(['S1', 'S2']);
    // ...but is skipped by dispatch, so the freed slot goes to the next bead.
    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
    // A user pause is not a failure — the queue keeps advancing.
    expect(snap.auto_advance).toBe(true);
    // workflow_mode reverted, exactly like a discard.
    expect(
      env.bd.calls.some(
        (/** @type {any} */ c) =>
          c.method === 'unsetMetadata' &&
          c.bead_id === 'S1' &&
          c.key === 'workflow_mode'
      )
    ).toBe(true);
  });

  test('pause is refused before the session id lands (§2.1 fail-closed)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    // No session_id captured yet → pausing would strand an unresumable attempt.
    expect(await env.scheduler.pause(WS, attempt_id)).toEqual({
      ok: false,
      reason: 'no_session_id'
    });
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('running');
    expect(env.scheduler.isRunning('S1')).toBe(true);
  });

  test('pause returns not_running for an unknown attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    expect(await env.scheduler.pause(WS, 'nope')).toEqual({
      ok: false,
      reason: 'not_running'
    });
  });

  test('a paused bead stays skipped until resumed, and a resumed ancestor stops blocking it (§1.1)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const first = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, first);
    expect(env.scheduler.isRunning('S1')).toBe(false);

    // A plain tick must not restart a paused bead — ▶ is the only way back.
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('S1')).toBe(false);

    // Resuming mints a child; the ancestor stays `paused` but is now history,
    // so it no longer blocks dispatch for that bead.
    const res = await env.scheduler.resume(WS, first);
    expect(res.ok).toBe(true);
    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.store.snapshot(WS).attempts[first].status).toBe('paused');
    expect(
      env.store.snapshot(WS).attempts[String(res.attempt_id)].resumed_from
    ).toBe(first);
  });

  test('■ on a RESUMED ancestor is refused, so the running child keeps its lane (§1.1)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const ancestor = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, ancestor);
    const res = await env.scheduler.resume(WS, ancestor);
    expect(res.ok).toBe(true);

    // A stale client tile could still target the ancestor; discarding it would
    // pull the RUNNING child's bead out of the lane.
    expect(await env.scheduler.stop(WS, ancestor)).toBe(false);
    const snap = env.store.snapshot(WS);
    expect(snap.attempts[ancestor].status).toBe('paused');
    expect(snap.queue.map((e) => e.bead_id)).toEqual(['S1']);
    expect(env.scheduler.isRunning('S1')).toBe(true);
  });

  test('a paused attempt can be discarded from its tile (§2.2)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, attempt_id);

    expect(await env.scheduler.stop(WS, attempt_id)).toBe(true);
    const snap = env.store.snapshot(WS);
    expect(snap.attempts[attempt_id].status).toBe('stopped');
    expect(snap.queue.map((e) => e.bead_id)).toEqual([]);
  });
});

describe('scheduler session id capture (spec §2)', () => {
  test('a runner session_id event patches the attempt AND fans out', async () => {
    const notify = vi.fn();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      notifyQueueChanged: notify
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('S1')).toBe(true);

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    // Baseline: no session id yet.
    expect(env.store.snapshot(WS).attempts[attempt_id].session_id).toBe(null);

    // The runner emits its session id on the stream's first event.
    notify.mockClear();
    env.runner.eventsFor('S1').emit('session_id', 'sid-777');
    await flush();

    // Persisted on the attempt record.
    expect(env.store.snapshot(WS).attempts[attempt_id].session_id).toBe(
      'sid-777'
    );
    // updateAttempt alone does NOT fan out, so notifyChanged must fire so a live
    // ws subscriber (open drawer) gets the fresh snapshot.
    expect(notify).toHaveBeenCalledWith(WS);
  });
});

describe('scheduler pause (⏸)', () => {
  test('auto_advance off starts none but lets running finish', async () => {
    const env = setup({ config: { P1: {}, P2: {}, P3: {} }, slots: 2 });
    seedQueue(env.store, ['P1', 'P2', 'P3']);
    await env.scheduler.tick(WS);
    expect(env.scheduler.runningCount()).toBe(2);

    // Pause + queue another runnable bead.
    env.store.setAutoAdvance(WS, false);
    await env.scheduler.tick(WS);
    // No new session started while paused.
    expect(env.scheduler.runningCount()).toBe(2);

    // A running session still finishes; no new dispatch while paused.
    env.runner.finish('P1', { success: true });
    await flush();
    await flush();
    expect(env.scheduler.runningCount()).toBe(1);
    expect(env.scheduler.isRunning('P3')).toBe(false);
    expect(env.store.snapshot(WS).pr_wait.map((e) => e.bead_id)).toContain(
      'P1'
    );
  });
});

describe('scheduler dispatch snapshot', () => {
  test('re-reads bd at dispatch and snapshots the attempt', async () => {
    const env = setup({
      config: { S1: { runner: 'claude', model: 'opus', effort: 'high' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    // snapshotBead called during dispatch (authoritative re-read).
    expect(env.bd.snapshotCounts()).toBeGreaterThanOrEqual(1);
    expect(env.worktree.add).toHaveBeenCalled();

    const attempts = Object.values(env.store.snapshot(WS).attempts);
    expect(attempts).toHaveLength(1);
    const a = /** @type {any} */ (attempts[0]);
    expect(a.bead_id).toBe('S1');
    expect(a.runner).toBe('claude');
    expect(a.model).toBe('opus');
    expect(a.effort).toBe('high');
    expect(a.base_oid).toBe('base-S1');
    expect(a.started_at).toBe(1000);
    expect(a.pid).toBe(9000);
    expect(a.status).toBe('running');
    expect(a.target_base).toBe('main');
    expect(a.workflow_mode_prior).toBe(null);
  });
});

describe('scheduler happy path (dispatch → PR observation → pr_wait)', () => {
  test('successful session verifies and moves the bead to pr_wait', async () => {
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).toContain('S1');
    expect(snap.done.map((e) => e.bead_id)).not.toContain('S1');
    expect(snap.attempts[attempt_id].status).toBe('done');
  });

  test('judges completion from the observation alone, never the merge axis', async () => {
    // A legacy merge_sha on the record must not reach the completion verdict.
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.store.updateAttempt(WS, {
      attempt_id,
      patch: { merge_sha: 'f'.repeat(40) }
    });

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(env.verify.verifyPrSubmitted).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1'
    });
    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).toContain('S1');
    // The retired done_kind stamp is no longer written on a new attempt.
    expect(snap.attempts[attempt_id].done_kind).toBe(null);
  });

  test('reverts workflow_mode on every success (bead stays open for the merge click)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(
      env.bd.calls.some(
        (c) =>
          c.method === 'unsetMetadata' &&
          c.bead_id === 'S1' &&
          c.key === 'workflow_mode'
      )
    ).toBe(true);
  });

  test('records pr_missing and gh_observation_failed distinguishably', async () => {
    for (const reason of ['pr_missing', 'gh_observation_failed']) {
      const env = setup({ config: { S1: {} }, slots: 1 });
      /** @type {any} */ (env.verify).verifyPrSubmitted = vi.fn(async () => ({
        ok: false,
        reason
      }));
      seedQueue(env.store, ['S1']);
      await env.scheduler.tick(WS);
      const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

      env.runner.finish('S1', { success: true });
      await flush();
      await flush();

      const a = env.store.snapshot(WS).attempts[attempt_id];
      expect(a.status).toBe('failed');
      expect(a.cause).toBe(`verify_failed:${reason}`);
      expect(env.store.snapshot(WS).pr_wait).toEqual([]);
    }
  });
});

describe('scheduler failure (auto_advance OFF + workflow_mode revert, no breaker)', () => {
  test('failed session turns auto_advance OFF and leaves a banner-ready record', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts).find(
      (id) => env.store.snapshot(WS).attempts[id].bead_id === 'S1'
    );

    env.runner.finish('S1', {
      success: false,
      reason: 'abnormal_exit',
      exit: 1
    });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    // auto_advance forced OFF — the ONLY halt mechanism now.
    expect(snap.auto_advance).toBe(false);
    // The terminal record carries what the failure banner renders.
    expect(snap.attempts[String(attempt_id)].status).toBe('failed');
    expect(snap.attempts[String(attempt_id)].cause).toBe(
      'session_failed:abnormal_exit'
    );
    expect(snap.attempts[String(attempt_id)].repo).toBe('/repo');
    // workflow_mode reverted (prior was unset → unsetMetadata).
    expect(
      env.bd.calls.some(
        (c) =>
          c.method === 'unsetMetadata' &&
          c.bead_id === 'S1' &&
          c.key === 'workflow_mode'
      )
    ).toBe(true);
  });

  test('a blocker failure records the guard reason and matched command', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', {
      success: false,
      reason: 'blocker',
      exit: 143,
      blocked: true,
      blocked_detail: {
        reason: 'merge_to_base_blocked',
        command: 'gh pr merge 311'
      }
    });
    await flush();
    await flush();

    const a = env.store.snapshot(WS).attempts[attempt_id];
    expect(a.cause).toBe('loud_fail_blocker');
    expect(a.cause_detail).toEqual({
      reason: 'merge_to_base_blocked',
      command: 'gh pr merge 311'
    });
  });

  test('truncates a very long matched command in cause_detail', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', {
      success: false,
      reason: 'blocker',
      exit: 143,
      blocked: true,
      blocked_detail: {
        reason: 'merge_to_base_blocked',
        command: 'x'.repeat(900)
      }
    });
    await flush();
    await flush();

    expect(
      env.store.snapshot(WS).attempts[attempt_id].cause_detail?.command
    ).toHaveLength(512);
  });

  test('leaves cause_detail null on a non-blocker failure', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).attempts[attempt_id].cause_detail).toBeNull();
  });

  test('a failure does not block the repo: re-enabling auto_advance dispatches again', async () => {
    // With the breaker gone there is no per-repo block, so turning ▶ back on is
    // the whole recovery path — no reset call in between.
    const env = setup({ config: { S1: {}, P1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();
    // The user drops the failed bead and queues the next one (the failed bead
    // stays queued on its own — a failure never removes it).
    let rev = env.store.remove(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S1'
    }).queue.revision;
    env.store.place(WS, { expected_revision: rev, bead_id: 'P1' });
    env.store.setAutoAdvance(WS, true);
    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('P1')).toBe(true);
  });

  test('a verify failure also turns auto_advance OFF', async () => {
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: false });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).auto_advance).toBe(false);
  });

  test('bd set-metadata failure fails THAT dispatch only (no unhandled rejection, siblings unaffected) [F9]', async () => {
    const env = setup({
      config: { S1: { throwOnSet: true }, P1: {} },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    // tick must resolve (the bd failure is contained, not thrown out of it).
    await expect(env.scheduler.tick(WS)).resolves.toBeUndefined();

    // S1 never launched a session and is recorded as a failed attempt.
    expect(env.scheduler.isRunning('S1')).toBe(false);
    const s1 = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts).find(
        (/** @type {any} */ a) => a.bead_id === 'S1'
      )
    );
    expect(s1.status).toBe('failed');
    expect(s1.cause).toBe('workflow_mode_record_failed');

    // auto_advance stays on → siblings unaffected.
    expect(env.store.snapshot(WS).auto_advance).toBe(true);

    // A subsequent normal dispatch still runs (the scheduler was not poisoned).
    const rev = env.store.remove(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S1'
    }).queue.revision;
    env.store.place(WS, { expected_revision: rev, bead_id: 'P1' });
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('P1')).toBe(true);
  });

  test('reverts to a prior value when workflow_mode was already set', async () => {
    const env = setup({
      config: { S1: { workflow_mode: 'fast_track' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();
    // prior='fast_track' → revert re-sets it (not unset).
    const revert = env.bd.calls.find(
      (c) =>
        c.method === 'setMetadata' &&
        c.bead_id === 'S1' &&
        c.value === 'fast_track' &&
        // the LAST setMetadata is the revert (dispatch also set fast_track).
        env.bd.calls.indexOf(c) === env.bd.calls.length - 1
    );
    expect(revert).toBeTruthy();
  });
});

describe('scheduler admission gate (worker-autorun-policy §1)', () => {
  test('admission-invalid head is skipped to the next candidate in the SAME tick (no starvation)', async () => {
    // The fake routes by a config marker (model:'invalid') since the snapshot
    // itself carries no bead id.
    const admission = {
      validate: vi.fn(async (/** @type {any} */ snap) =>
        snap.model === 'invalid'
          ? { ok: false, reason: 'spec_missing' }
          : { ok: true }
      )
    };
    const env = setup({
      config: {
        S1: { model: 'invalid' },
        S2: {},
        P1: { model: 'invalid' },
        P2: {}
      },
      slots: 2,
      admission
    });
    seedQueue(env.store, ['S1', 'S2', 'P1', 'P2']);
    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
    expect(env.scheduler.isRunning('P1')).toBe(false);
    expect(env.scheduler.isRunning('P2')).toBe(true);

    const snap = env.store.snapshot(WS);
    expect(snap.admission.S1).toEqual({
      reason: 'spec_missing',
      at: expect.any(Number)
    });
    expect(snap.admission.P1).toEqual({
      reason: 'spec_missing',
      at: expect.any(Number)
    });
    expect(snap.admission.S2).toBeUndefined();
  });

  test('dispatch re-checks admission against the pinned worktree base_oid (TOCTOU)', async () => {
    const admission = {
      // Valid at the tick scan (no base pinned yet), refused once dispatch pins
      // the worktree base_oid — models a base advancing between scan and add.
      validate: vi.fn(
        async (/** @type {any} */ _snap, /** @type {any} */ base) =>
          base === 'base-S1'
            ? { ok: false, reason: 'receipt_unreachable' }
            : { ok: true }
      )
    };
    const env = setup({ config: { S1: {} }, slots: 1, admission });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    // The already-created worktree is cleaned up on the admission refusal.
    expect(env.worktree.remove).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1'
    });
    expect(env.store.snapshot(WS).admission.S1).toEqual({
      reason: 'receipt_unreachable',
      at: expect.any(Number)
    });
    // No session spawned, no attempt persisted for the refused dispatch.
    expect(Object.keys(env.store.snapshot(WS).attempts)).toHaveLength(0);
  });

  test('a successful dispatch clears the bead admission record', async () => {
    let invalid = true;
    const admission = {
      validate: vi.fn(async () =>
        invalid ? { ok: false, reason: 'receipt_unreachable' } : { ok: true }
      )
    };
    const env = setup({ config: { S1: {} }, slots: 1, admission });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(env.store.snapshot(WS).admission.S1).toEqual({
      reason: 'receipt_unreachable',
      at: expect.any(Number)
    });

    invalid = false;
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });
});

describe('scheduler tick coalescing (UI-2hc5)', () => {
  /**
   * Hold the first `n` bd snapshot reads open so a second `tick` enters while a
   * pass is still scanning — the overlap the incident showed, made
   * deterministic with promise control instead of a timer.
   *
   * @param {any} bd
   * @param {number} n
   */
  function holdSnapshots(bd, n) {
    /** @type {(v?: any) => void} */
    let release = () => {};
    const gate = new Promise((r) => {
      release = r;
    });
    const orig = bd.snapshotBead.bind(bd);
    let held = 0;
    bd.snapshotBead = async (/** @type {string} */ bead_id) => {
      held += 1;
      if (held <= n) {
        await gate;
      }
      return orig(bead_id);
    };
    return { release: () => release() };
  }

  test('dispatches a bead once when two ticks overlap', async () => {
    const env = setup({ config: { S1: {} }, slots: 2 });
    seedQueue(env.store, ['S1']);
    const gate = holdSnapshots(env.bd, 2);

    const first = env.scheduler.tick(WS);
    await flush();
    const second = env.scheduler.tick(WS);
    await flush();
    gate.release();
    await Promise.all([first, second]);

    expect(env.runner.spawnOrder).toEqual(['S1']);
  });

  test('stays within the slot cap when two ticks overlap', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2']);
    const gate = holdSnapshots(env.bd, 2);

    const first = env.scheduler.tick(WS);
    await flush();
    const second = env.scheduler.tick(WS);
    await flush();
    gate.release();
    await Promise.all([first, second]);

    expect(env.scheduler.runningCount()).toBe(1);
  });

  test('picks up a bead queued during the scan in the same cycle', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 2 });
    seedQueue(env.store, ['S1']);
    const gate = holdSnapshots(env.bd, 1);

    const first = env.scheduler.tick(WS);
    await flush();
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S2'
    });
    const second = env.scheduler.tick(WS);
    await flush();
    gate.release();
    await Promise.all([first, second]);

    expect(env.runner.spawnOrder).toEqual(['S1', 'S2']);
  });

  test('resolves the overlapped tick only after its piggybacked rescan', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 2 });
    seedQueue(env.store, ['S1']);
    const gate = holdSnapshots(env.bd, 1);

    const first = env.scheduler.tick(WS);
    await flush();
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S2'
    });
    const second = env.scheduler.tick(WS);
    await flush();
    gate.release();
    await second;

    expect(env.scheduler.isRunning('S2')).toBe(true);
    await first;
  });

  test('advances to the next candidate after a dispatch refusal', async () => {
    const admission = {
      // Admits at the scan (no base pinned), refuses S1 once dispatch pins its
      // worktree base_oid — the refuse path that re-enters the pass.
      validate: vi.fn(
        async (/** @type {any} */ _snap, /** @type {any} */ base) =>
          base === 'base-S1'
            ? { ok: false, reason: 'receipt_unreachable' }
            : { ok: true }
      )
    };
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1, admission });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
  });
});

describe('scheduler stale spec_review lane (UI-dlim §3.2)', () => {
  const RECEIPT_SHA = 'a'.repeat(40);
  const DELTA_SHA = 'b'.repeat(40);

  /**
   * Admission that ADMITS with a stale payload — the validator's new verdict
   * for a spec that moved after the receipt.
   *
   * @param {{ delta_shas?: string[], onlyAtBase?: string }} [opts]
   */
  function staleAdmission(opts = {}) {
    return {
      validate: vi.fn(
        async (/** @type {any} */ _snap, /** @type {any} */ base) => {
          if (opts.onlyAtBase && base !== opts.onlyAtBase) {
            return { ok: true };
          }
          return {
            ok: true,
            stale: {
              receipt_sha: RECEIPT_SHA,
              delta_shas: opts.delta_shas ?? [DELTA_SHA]
            }
          };
        }
      )
    };
  }

  test('dispatches a stale bead instead of refusing it', async () => {
    const env = setup({
      config: { S1: { spec_review: `codex@${RECEIPT_SHA}` } },
      slots: 1,
      admission: staleAdmission()
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.worktree.remove).not.toHaveBeenCalled();
  });

  test('records the stale flag on the dispatched attempt', async () => {
    const env = setup({
      config: { S1: { spec_review: `codex@${RECEIPT_SHA}` } },
      slots: 1,
      admission: staleAdmission()
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const attempts = Object.values(env.store.snapshot(WS).attempts);
    expect(attempts[0].spec_review_stale).toBe(true);
    // The badge record is cleared by the launch that followed it — from here on
    // the running attempt's own flag carries the fact.
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });

  test('injects the receipt, base and delta commits into the dispatch prompt', async () => {
    const env = setup({
      config: { S1: { spec_review: `codex@${RECEIPT_SHA}` } },
      slots: 1,
      admission: staleAdmission({ delta_shas: [DELTA_SHA, 'c'.repeat(40)] })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const prompt = env.runner.spawnedBead('S1').prompt;
    expect(prompt).toContain('Bead S1 작업을 계약 네이티브 흐름으로 완료하라.');
    expect(prompt).toContain(`codex@${RECEIPT_SHA}`);
    expect(prompt).toContain('base-S1');
    expect(prompt).toContain(DELTA_SHA);
    expect(prompt).toContain('c'.repeat(40));
    expect(prompt).toContain('워커 재리뷰 레인');
  });

  test('builds the prompt from the DISPATCH re-check, not the tick scan', async () => {
    // Fresh at the scan (moving base tip), stale only once the worktree base is
    // pinned — the pinned payload is what the session must be told about.
    const env = setup({
      config: { S1: { spec_review: `codex@${RECEIPT_SHA}` } },
      slots: 1,
      admission: staleAdmission({ onlyAtBase: 'base-S1' })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.runner.spawnedBead('S1').prompt).toContain(DELTA_SHA);
  });

  test('leaves a fresh dispatch on the adapter default prompt and flag', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      admission: { validate: vi.fn(async () => ({ ok: true })) }
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.runner.spawnedBead('S1').prompt).toBeUndefined();
    const attempts = Object.values(env.store.snapshot(WS).attempts);
    expect(attempts[0].spec_review_stale).toBe(false);
  });
});

describe('scheduler dispatch through the REAL createRunner (spawn-literal wiring)', () => {
  test('dispatch always spawns claude', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'result',
          subtype: 'success',
          is_error: false,
          permission_denials: []
        })
      ],
      exit: 0
    });
    const env = setup({
      config: { S1: {} },
      slots: 1,
      makeRunner: (/** @type {string} */ name) =>
        createRunner(name, { spawn_impl })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(spawn_impl.captured.calls.length).toBe(1);
    expect(spawn_impl.captured.calls[0].command).toBe('claude');
    await flush();
  });

  test('a full_plan bead spawns without a runner authorization guard', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'result',
          subtype: 'success',
          is_error: false,
          permission_denials: []
        })
      ],
      exit: 0
    });
    const env = setup({
      config: {
        S1: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          status: 'in_progress'
          // No plan_review: the guard it used to gate is retired with codex/ccx.
        }
      },
      slots: 1,
      makeRunner: (/** @type {string} */ name) =>
        createRunner(name, { spawn_impl })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(spawn_impl.captured.calls.length).toBe(1);
    expect(env.scheduler.isRunning('S1')).toBe(true);
    await flush();
  });
});

describe('scheduler policy axis removal (worker-phase2 §2)', () => {
  test('a new attempt writes none of the retired merge-axis fields', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const a = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts)[0]
    );
    expect(a.merge_policy).toBe(null);
    expect(a.drift_policy).toBe(null);
    expect(a.demoted_reason).toBe(null);
  });

  test('bead policy metadata no longer reaches the session settings', async () => {
    const env = setup({
      config: { S1: /** @type {any} */ ({ merge_policy: 'auto_merge' }) },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const settings = env.runner.settingsFor('S1');
    expect(settings.merge_policy).toBe(undefined);
    expect(settings.drift_policy).toBe(undefined);
    expect(settings.merge_lock).toBe(undefined);
  });

  test('the session spawn carries no worker token', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    // `settings.env` is no longer empty — UI-8mvc §2 delivers the guard hook
    // through it — so the retired token is asserted by key, not by the absence
    // of the whole object.
    expect(env.runner.settingsFor('S1').env.BDUI_WORKER_TOKEN).toBe(undefined);
  });

  // UI-1xcd §3: the flag only ever relaxed the base-into-branch guard, which
  // now warns for every attempt — so the runner is not told about it at all.
  test('carries no conflict_resolution into the runner settings', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect('conflict_resolution' in env.runner.settingsFor('S1')).toBe(false);
  });
});

describe('scheduler merge axis detached from completion (worker-phase2 §1)', () => {
  test('a success never runs a post-merge verify_cmd', async () => {
    // The post-merge verify path is deleted outright: even with a merge_sha on
    // the record, nothing may reach for a detached verification worktree.
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.store.updateAttempt(WS, {
      attempt_id,
      patch: { merge_sha: 'f'.repeat(40) }
    });

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(
      /** @type {any} */ (env.worktree).addDetached
    ).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).pr_wait.map((e) => e.bead_id)).toContain(
      'S1'
    );
    expect(env.store.snapshot(WS).attempts[attempt_id].verify_cmd_result).toBe(
      null
    );
  });
});

describe('scheduler fail-closed regressions (implementation review 2026-07-22)', () => {
  test('a success with a FAILED workflow_mode revert blocks the pr_wait move', async () => {
    // Every success now leaves the bead open, so the revert (unset) throwing
    // (bd down) must block the lane move unconditionally.
    const env = setup({
      config: { S1: { throwOnUnset: true } },
      slots: 1,
      verifyOk: true
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).not.toContain('S1');
    expect(snap.attempts[attempt_id].status).toBe('failed');
    expect(snap.attempts[attempt_id].cause).toBe('workflow_mode_revert_failed');
    expect(snap.auto_advance).toBe(false);
  });
});

describe('scheduler exec-setting global defaults (worker-global-exec-defaults §3)', () => {
  /**
   * @param {any} bd
   * @param {string} bead_id
   * @param {string} method
   * @param {string} key
   */
  function calledMeta(bd, bead_id, method, key) {
    return bd.calls.some(
      (/** @type {any} */ c) =>
        c.method === method && c.bead_id === bead_id && c.key === key
    );
  }

  test('refuses a missing selected preset before worktree or metadata mutation', async () => {
    const resolveForDispatch = vi.fn(() => ({
      ok: false,
      reason: 'default_exec_preset_missing'
    }));
    const env = setup({
      config: { S1: {} },
      slots: 1,
      execPresetCoordinator: { resolveForDispatch }
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(resolveForDispatch).toHaveBeenCalledTimes(1);
    expect(env.worktree.add).not.toHaveBeenCalled();
    expect(env.bd.calls).toEqual([]);
    expect(env.runner.spawnOrder).toEqual([]);
    expect(env.store.snapshot(WS).admission.S1?.reason).toBe(
      'default_exec_preset_missing'
    );
  });

  test('pre-records the immutable preset provenance before the first metadata stamp', async () => {
    /** @type {any} */
    let env;
    const resolveForDispatch = vi.fn((/** @type {string} */ _ws, bead) => {
      const exec = resolveExecSettings({
        bead,
        defaults: {
          orchestration_model: 'sonnet',
          spec_review_model: 'codex'
        }
      });
      return {
        ok: true,
        preset_id: 'preset-1',
        preset_revision: 7,
        settings: {
          orchestration_model: 'sonnet',
          spec_review_model: 'codex'
        },
        exec
      };
    });
    env = setup({
      config: {
        S1: {
          model: null,
          effort: null,
          onSet: (/** @type {{ key: string }} */ call) => {
            if (call.key !== 'workflow_mode') {
              return;
            }
            const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
            expect(attempt).toMatchObject({
              exec_default_preset_id: 'preset-1',
              exec_default_preset_revision: 7,
              exec_stamped_keys: ['orchestration_model', 'spec_review_model'],
              exec_values: {
                orchestration_model: 'sonnet',
                spec_review_model: 'codex'
              }
            });
          }
        }
      },
      slots: 1,
      execPresetCoordinator: { resolveForDispatch }
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(resolveForDispatch).toHaveBeenCalledTimes(1);
    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt).toMatchObject({
      exec_default_preset_id: 'preset-1',
      exec_default_preset_revision: 7,
      exec_values: {
        orchestration_model: 'sonnet',
        spec_review_model: 'codex'
      }
    });
    expect(Object.keys(attempt.exec_values)).toEqual(EXEC_SETTING_KEYS);
  });

  test('applies a shared preset update only to a later workspace dispatch while the active Attempt stays pinned', async () => {
    const second_workspace = `${WS}-second`;
    const store = createQueueStore();
    const presetStore = createExecPresetStore({
      filePath: path.join(tmp_state, 'exec-presets.json'),
      randomUUID: () => 'shared-preset'
    });
    presetStore.create({
      expected_revision: 0,
      name: '공유 기본값',
      settings: { orchestration_model: 'sol' }
    });
    const coordinator = createExecPresetCoordinator({
      queueStore: store,
      presetStore,
      discover: () => ({
        complete: true,
        states: [
          {
            workspace_key: WS,
            display_name: '첫 작업 공간',
            status: 'ok',
            queue_file: path.join(tmp_state, 'first-queue.json'),
            raw: store.snapshot(WS)
          },
          {
            workspace_key: second_workspace,
            display_name: '둘째 작업 공간',
            status: 'ok',
            queue_file: path.join(tmp_state, 'second-queue.json'),
            raw: store.snapshot(second_workspace)
          }
        ]
      })
    });

    expect(
      coordinator.setDefaultExecPreset(WS, {
        preset_id: 'shared-preset',
        expected_queue_revision: 0,
        expected_preset_revision: 1
      }).applied
    ).toBe(true);
    expect(
      coordinator.setDefaultExecPreset(second_workspace, {
        preset_id: 'shared-preset',
        expected_queue_revision: 0,
        expected_preset_revision: 1
      }).applied
    ).toBe(true);
    expect(coordinator.snapshot().presets[0].reference_count).toBe(2);

    const first = setup({
      store,
      config: { S1: { model: null, effort: null } },
      slots: 1,
      execPresetCoordinator: coordinator
    });
    const second = setup({
      store,
      config: { S2: { model: null, effort: null } },
      slots: 1,
      execPresetCoordinator: coordinator
    });
    seedQueue(store, ['S1']);
    let second_revision = store.snapshot(second_workspace).revision;
    second_revision = store.setSlots(second_workspace, {
      expected_revision: second_revision,
      slots: 1
    }).queue.revision;
    store.place(second_workspace, {
      expected_revision: second_revision,
      bead_id: 'S2'
    });
    store.setAutoAdvance(second_workspace, true);

    await first.scheduler.tick(WS);

    const active_attempt = Object.values(store.snapshot(WS).attempts)[0];
    const queue_revisions_before_update = {
      first: store.snapshot(WS).revision,
      second: store.snapshot(second_workspace).revision
    };
    expect(active_attempt).toMatchObject({
      status: 'running',
      exec_default_preset_id: 'shared-preset',
      exec_default_preset_revision: 1,
      exec_values: { orchestration_model: 'sol' }
    });

    expect(
      coordinator.update({
        expected_revision: 1,
        id: 'shared-preset',
        name: '공유 기본값',
        settings: { orchestration_model: 'terra' }
      }).applied
    ).toBe(true);

    expect(store.snapshot(WS).revision).toBe(
      queue_revisions_before_update.first
    );
    expect(store.snapshot(second_workspace).revision).toBe(
      queue_revisions_before_update.second
    );

    await second.scheduler.tick(second_workspace);

    const fresh_attempt = Object.values(
      store.snapshot(second_workspace).attempts
    )[0];
    expect(fresh_attempt).toMatchObject({
      status: 'running',
      exec_default_preset_id: 'shared-preset',
      exec_default_preset_revision: 2,
      exec_values: { orchestration_model: 'terra' }
    });
    expect(
      store.snapshot(WS).attempts[active_attempt.attempt_id]
    ).toMatchObject({
      exec_default_preset_revision: 1,
      exec_values: { orchestration_model: 'sol' }
    });
  });

  test('refuses before metadata or runner launch when normal attempt prerecord fails', async () => {
    const base_store = createQueueStore();
    const appendAttempt = vi.fn((workspace) => ({
      ok: false,
      conflict: false,
      queue: base_store.snapshot(workspace)
    }));
    const env = setup({
      store: { ...base_store, appendAttempt },
      config: { S1: {} },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(appendAttempt).toHaveBeenCalledTimes(1);
    expect(env.store.snapshot(WS).admission.S1?.reason).toBe(
      'attempt_prerecord_failed'
    );
    expect(env.worktree.remove).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1'
    });
    expect(env.bd.calls).toEqual([]);
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('global-only exec settings reach spawn + stamp bead metadata + durable exec_stamped_keys, then revert on termination', async () => {
    // Bead leaves runner/model/effort UNSET; the workspace global fills them.
    const env = setup({
      config: { S1: { runner: null, model: null, effort: null } },
      slots: 1,
      verifyOk: true
      // no verify_cmd → resolved auto_merge demotes to pr_stop → the pr_stop
      // termination path reverts workflow_mode AND the exec stamps.
    });
    seedExecDefaults(env.store, {
      spec_review_model: 'opus',
      orchestration_model: 'sonnet',
      orchestration_effort: 'high'
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    // Resolved values reached the runner spawn (model/effort) + attempt record.
    expect(env.runner.settingsFor('S1').model).toBe('sonnet');
    expect(env.runner.settingsFor('S1').effort).toBe('high');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const a = /** @type {any} */ (env.store.snapshot(WS).attempts[attempt_id]);
    expect(a.runner).toBe('claude');
    expect(a.model).toBe('sonnet');
    expect(a.effort).toBe('high');
    // Durable stamp list recorded on the attempt (survives restart/orphan).
    expect(a.exec_stamped_keys).toEqual([
      'orchestration_model',
      'orchestration_effort',
      'spec_review_model'
    ]);

    // Bead metadata was stamped with the three global-filled keys.
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'spec_review_model')).toBe(
      true
    );
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'orchestration_model')).toBe(
      true
    );
    expect(
      calledMeta(env.bd, 'S1', 'setMetadata', 'orchestration_effort')
    ).toBe(true);

    // Termination (success) reverts every stamped key + workflow_mode.
    env.runner.finish('S1', { success: true });
    await flush();
    await flush();
    expect(env.store.snapshot(WS).pr_wait.map((e) => e.bead_id)).toContain(
      'S1'
    );
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'spec_review_model')).toBe(
      true
    );
    expect(
      calledMeta(env.bd, 'S1', 'unsetMetadata', 'orchestration_model')
    ).toBe(true);
    expect(
      calledMeta(env.bd, 'S1', 'unsetMetadata', 'orchestration_effort')
    ).toBe(true);
  });

  test('a bead-SET key beats the global and is never stamped/reverted', async () => {
    // Bead pins spec_review_model=opus; impl_model is unset (global fills it).
    const env = setup({
      config: {
        S1: {
          runner: 'claude',
          model: 'opus',
          effort: 'high',
          spec_review_model: 'opus'
        }
      },
      slots: 1,
      verifyOk: true
    });
    seedExecDefaults(env.store, {
      spec_review_model: 'codex',
      impl_model: 'haiku'
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const a = /** @type {any} */ (env.store.snapshot(WS).attempts[attempt_id]);
    // A global exact model gets its inferred provider stamp too; the bead-set
    // spec_review_model is not stamped (it is the bead's own value).
    expect(a.exec_stamped_keys).toEqual(['impl_runtime', 'impl_model']);
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'impl_runtime')).toBe(true);
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'impl_model')).toBe(true);
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'spec_review_model')).toBe(
      false
    );

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'impl_runtime')).toBe(
      true
    );
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'impl_model')).toBe(true);
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'spec_review_model')).toBe(
      false
    );
  });

  test('a retired codex model in the globals resolves to the opus fallback (no stamp)', async () => {
    // The global orchestration_model predates the claude-only change, so it is
    // outside the catalog → the hardcoded fallback applies.
    const env = setup({
      config: { S1: { model: null } },
      slots: 1,
      verifyOk: true
    });
    seedExecDefaults(env.store, { orchestration_model: 'gpt-5.6' });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    expect(env.runner.settingsFor('S1').model).toBe('opus');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const a = /** @type {any} */ (env.store.snapshot(WS).attempts[attempt_id]);
    expect(a.model).toBe('opus');
    expect(a.exec_stamped_keys).toBe(null);
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'orchestration_model')).toBe(
      false
    );
  });

  test('a bead with no exec settings and no globals dispatches on the opus fallback', async () => {
    const env = setup({
      config: { S1: { model: null } },
      slots: 1,
      verifyOk: true
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.runner.settingsFor('S1').model).toBe('opus');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const a = /** @type {any} */ (env.store.snapshot(WS).attempts[attempt_id]);
    expect(a.model).toBe('opus');
    expect(a.exec_stamped_keys).toBe(null);
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'orchestration_model')).toBe(
      false
    );
  });

  test('a partial exec-stamp failure unsets the already-stamped keys, fails the attempt, releases the claim', async () => {
    // orchestration_model stamps OK; orchestration_effort's stamp throws → break.
    const env = setup({
      config: {
        S1: {
          model: null,
          effort: null,
          throwOnSetKey: 'orchestration_effort'
        }
      },
      slots: 1
    });
    seedExecDefaults(env.store, {
      spec_review_model: 'opus',
      orchestration_model: 'sonnet',
      orchestration_effort: 'high'
    });
    seedQueue(env.store, ['S1']);

    await expect(env.scheduler.tick(WS)).resolves.toBeUndefined();

    // No session started; the attempt is recorded failed with the exec cause.
    expect(env.scheduler.isRunning('S1')).toBe(false);
    const a = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts).find(
        (/** @type {any} */ x) => x.bead_id === 'S1'
      )
    );
    expect(a.status).toBe('failed');
    expect(a.cause).toBe('exec_stamp_failed');
    // The durable stamp list was recorded BEFORE the first metadata write.
    expect(a.exec_stamped_keys).toEqual([
      'orchestration_model',
      'orchestration_effort'
    ]);

    // The one key that WAS stamped is cleaned up; workflow_mode reverted too.
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'orchestration_model')).toBe(
      true
    );
    expect(
      calledMeta(env.bd, 'S1', 'unsetMetadata', 'orchestration_model')
    ).toBe(true);
    expect(
      calledMeta(env.bd, 'S1', 'unsetMetadata', 'orchestration_effort')
    ).toBe(true);
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'spec_review_model')).toBe(
      false
    );
    expect(
      env.bd.calls.some(
        (/** @type {any} */ c) =>
          c.method === 'unsetMetadata' &&
          c.bead_id === 'S1' &&
          c.key === 'workflow_mode'
      )
    ).toBe(true);

    // The dispatch failed in isolation: auto_advance intact.
    expect(env.store.snapshot(WS).auto_advance).toBe(true);
  });

  test('a set-succeeds-but-readback-throws stamp unsets the durable stamped_keys (not just the confirmed ones)', async () => {
    // worker_runner set+readback OK; orchestration_model's SET succeeds but its
    // confirming READBACK throws → the key is NOT in the confirmed list, yet the
    // durable exec_stamped_keys must still drive the cleanup so the metadata
    // that WAS written is unset (idempotent for the never-written effort key).
    const env = setup({
      config: {
        S1: {
          runner: null,
          model: null,
          effort: null,
          throwOnReadKey: 'orchestration_model'
        }
      },
      slots: 1
    });
    seedExecDefaults(env.store, {
      spec_review_model: 'opus',
      orchestration_model: 'sonnet',
      orchestration_effort: 'high'
    });
    seedQueue(env.store, ['S1']);

    await expect(env.scheduler.tick(WS)).resolves.toBeUndefined();

    expect(env.scheduler.isRunning('S1')).toBe(false);
    const a = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts).find(
        (/** @type {any} */ x) => x.bead_id === 'S1'
      )
    );
    expect(a.status).toBe('failed');
    expect(a.cause).toBe('exec_stamp_failed');

    // The set-but-unreadable key WAS written to bd metadata …
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'orchestration_model')).toBe(
      true
    );
    // … and it is unset in cleanup even though its confirming readback failed.
    expect(
      calledMeta(env.bd, 'S1', 'unsetMetadata', 'orchestration_model')
    ).toBe(true);
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'spec_review_model')).toBe(
      false
    );
    // workflow_mode is reverted too; the dispatch failed in isolation.
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'workflow_mode')).toBe(
      true
    );
    expect(env.store.snapshot(WS).auto_advance).toBe(true);
  });

  test('a success reverts the exec stamps AND workflow_mode', async () => {
    // Every success leaves the bead open for a human merge click, so BOTH the
    // exec stamps and workflow_mode revert — no policy branch remains.
    const env = setup({
      config: { S1: { runner: null, model: null, effort: null } },
      slots: 1,
      verifyOk: true
    });
    seedExecDefaults(env.store, {
      spec_review_model: 'opus',
      orchestration_model: 'sonnet',
      orchestration_effort: 'high'
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).toContain('S1');
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'spec_review_model')).toBe(
      true
    );
    expect(
      calledMeta(env.bd, 'S1', 'unsetMetadata', 'orchestration_model')
    ).toBe(true);
    expect(
      calledMeta(env.bd, 'S1', 'unsetMetadata', 'orchestration_effort')
    ).toBe(true);
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'workflow_mode')).toBe(
      true
    );
  });
});

describe('scheduler resume (spec §1)', () => {
  /**
   * Seed a terminal attempt directly into the store (no dispatch), so a resume
   * test controls the prior snapshot precisely.
   *
   * @param {any} store
   * @param {string} attempt_id
   * @param {Partial<import('./queue-store.js').Attempt>} patch
   */
  function seedAttempt(store, attempt_id, patch) {
    const rev = store.snapshot(WS).revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id, bead_id: /** @type {any} */ (patch).bead_id }
    });
    store.updateAttempt(WS, { attempt_id, patch });
  }

  /** @returns {Partial<import('./queue-store.js').Attempt>} */
  function resumablePrior(over = {}) {
    return {
      bead_id: 'B1',
      status: 'failed',
      repo: '/repo',
      target_base: 'main',
      base_oid: 'base-B1',
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      session_id: 'sid-abc',
      workflow_mode_prior: null,
      cause: 'verify_failed:base_not_ancestor',
      ...over
    };
  }

  test('refuses before resume metadata or runner launch when child prerecord fails', async () => {
    const base_store = createQueueStore();
    let deny_append = false;
    const store = {
      ...base_store,
      appendAttempt(/** @type {string} */ workspace, /** @type {any} */ input) {
        if (deny_append) {
          return {
            ok: false,
            conflict: false,
            queue: base_store.snapshot(workspace)
          };
        }
        return base_store.appendAttempt(workspace, input);
      }
    };
    const env = setup({ store, config: {}, slots: 1 });
    seedAttempt(env.store, 'r1', resumablePrior());
    deny_append = true;

    const result = await env.scheduler.resume(WS, 'r1');

    expect(result).toEqual({ ok: false, reason: 'attempt_prerecord_failed' });
    expect(env.bd.calls).toEqual([]);
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('refuses not_failed (running/done/unknown attempt)', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'r1', resumablePrior({ status: 'running' }));
    expect((await env.scheduler.resume(WS, 'r1')).reason).toBe('not_failed');
    seedAttempt(env.store, 'r2', resumablePrior({ status: 'done' }));
    expect((await env.scheduler.resume(WS, 'r2')).reason).toBe('not_failed');
    expect((await env.scheduler.resume(WS, 'nope')).reason).toBe('not_failed');
  });

  test('refuses no_session_id for a pre-session-id attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'r1', resumablePrior({ session_id: null }));
    expect((await env.scheduler.resume(WS, 'r1')).reason).toBe('no_session_id');
  });

  test('a paused attempt is resumable and is announced as paused (§1.2/§1.4)', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(
      env.store,
      'p1',
      resumablePrior({ status: 'paused', cause: null })
    );

    const res = await env.scheduler.resume(WS, 'p1');
    expect(res.ok).toBe(true);
    // The resume prompt says paused, never "failed" (§1.4).
    const prompt = env.runner.spawnedBead('B1').prompt;
    expect(prompt).toContain('일시정지');
    expect(prompt).not.toContain('실패로 남았다');
  });

  test('a failed resume is announced as a failure', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'f1', resumablePrior());

    expect((await env.scheduler.resume(WS, 'f1')).ok).toBe(true);

    expect(env.runner.spawnedBead('B1').prompt).toContain('실패로 남았다');
  });

  test('refuses worktree_missing when the bead worktree is gone', async () => {
    const env = setup({ config: {}, slots: 1 });
    env.worktree.exists.mockReturnValue(false);
    seedAttempt(env.store, 'r1', resumablePrior());
    expect((await env.scheduler.resume(WS, 'r1')).reason).toBe(
      'worktree_missing'
    );
  });

  test('refuses bead_running when a running attempt exists for the same bead', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'r1', resumablePrior());
    seedAttempt(env.store, 'live', { bead_id: 'B1', status: 'running' });
    expect((await env.scheduler.resume(WS, 'r1')).reason).toBe('bead_running');
  });

  test('refuses already_resumed when a child carries resumed_from (success OR failure, cold reload)', async () => {
    // child succeeded
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'anc', resumablePrior());
    seedAttempt(env.store, 'kid', {
      bead_id: 'B1',
      status: 'done',
      resumed_from: 'anc'
    });
    expect((await env.scheduler.resume(WS, 'anc')).reason).toBe(
      'already_resumed'
    );

    // child failed → ancestor still spent
    const env2 = setup({ config: {}, slots: 1 });
    seedAttempt(env2.store, 'anc', resumablePrior());
    seedAttempt(env2.store, 'kid', {
      bead_id: 'B1',
      status: 'failed',
      resumed_from: 'anc'
    });
    expect((await env2.scheduler.resume(WS, 'anc')).reason).toBe(
      'already_resumed'
    );

    // cold reload: the judgment is derived from the persisted attempts scan.
    env2.store.__clearCacheForTest();
    expect((await env2.scheduler.resume(WS, 'anc')).reason).toBe(
      'already_resumed'
    );
  });

  test('an absent prior runner no longer refuses the resume (claude-only)', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'r1', resumablePrior({ runner: null }));
    expect((await env.scheduler.resume(WS, 'r1')).ok).toBe(true);
  });

  test('a codex ancestor resumes onto codex', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'r2', resumablePrior({ runner: 'codex' }));
    const res = await env.scheduler.resume(WS, 'r2');
    expect(res.ok).toBe(true);
    // The child reopens the ancestor's session id, which only the CLI that
    // minted it can accept (§C-2).
    expect(env.store.snapshot(WS).attempts[String(res.attempt_id)].runner).toBe(
      'codex'
    );
  });

  test('inherits the PRIOR snapshot verbatim even after globals change; no worktree.add; resumed_from set', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(
      env.store,
      'anc',
      resumablePrior({ model: 'sonnet', effort: 'high' })
    );
    // Flip the workspace-global exec defaults AFTER the failure.
    seedExecDefaults(env.store, { orchestration_model: 'opus' });

    const res = await env.scheduler.resume(WS, 'anc');
    expect(res.ok).toBe(true);
    const child =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    // Prior model/effort inherited — NOT re-resolved from the new globals.
    expect(child.model).toBe('sonnet');
    expect(child.effort).toBe('high');
    expect(child.base_oid).toBe('base-B1');
    expect(child.resumed_from).toBe('anc');
    // Worktree reused — never re-created.
    expect(env.worktree.add).not.toHaveBeenCalled();
    // The resume argv carries the prior session id.
    expect(env.runner.settingsFor('B1').resume_session_id).toBe('sid-abc');
  });

  test('resumed_from survives cold reload', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'anc', resumablePrior());
    const res = await env.scheduler.resume(WS, 'anc');
    expect(res.ok).toBe(true);
    env.store.__clearCacheForTest();
    expect(
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)]
        .resumed_from
    ).toBe('anc');
  });

  test('a resumed attempt does not carry the retired merge-axis fields forward', async () => {
    const env = setup({ config: {}, slots: 1 });
    // A legacy ancestor still carries the old fields on its own record.
    seedAttempt(
      env.store,
      'anc',
      resumablePrior(
        /** @type {any} */ ({
          merge_policy: 'pr_stop',
          drift_policy: 'halt',
          demoted_reason: 'verify_cmd_unset',
          merge_sha: 'f'.repeat(40)
        })
      )
    );

    const res = await env.scheduler.resume(WS, 'anc');

    const snap = env.store.snapshot(WS);
    const child = snap.attempts[/** @type {string} */ (res.attempt_id)];
    // History is immutable on the ancestor …
    expect(snap.attempts['anc'].merge_policy).toBe('pr_stop');
    expect(snap.attempts['anc'].merge_sha).toBe('f'.repeat(40));
    // … but the new attempt writes none of them.
    expect(child.merge_policy).toBe(null);
    expect(child.drift_policy).toBe(null);
    expect(child.demoted_reason).toBe(null);
    expect(child.merge_sha).toBe(null);
  });

  test('re-stamps workflow_mode + exec from the PRIOR values', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(
      env.store,
      'anc',
      resumablePrior({
        workflow_mode_prior: null,
        exec_default_preset_id: 'preset-1',
        exec_default_preset_revision: 7,
        exec_stamped_keys: ['orchestration_model'],
        exec_values: { orchestration_model: 'opus' }
      })
    );
    const res = await env.scheduler.resume(WS, 'anc');
    expect(res.ok).toBe(true);
    // fast_track re-stamped, and the exec key re-stamped with the PRIOR value.
    expect(
      env.bd.calls.some(
        (c) =>
          c.method === 'setMetadata' &&
          c.bead_id === 'B1' &&
          c.key === 'workflow_mode' &&
          c.value === 'fast_track'
      )
    ).toBe(true);
    expect(
      env.bd.calls.some(
        (c) =>
          c.method === 'setMetadata' &&
          c.bead_id === 'B1' &&
          c.key === 'orchestration_model' &&
          c.value === 'opus'
      )
    ).toBe(true);
    const child =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(child.exec_stamped_keys).toEqual(['orchestration_model']);
    expect(child).toMatchObject({
      exec_default_preset_id: 'preset-1',
      exec_default_preset_revision: 7,
      exec_values: { orchestration_model: 'opus' }
    });
  });
});

describe('scheduler conflict resolution (worker-phase2 §6)', () => {
  /**
   * Seed the `done` attempt a `pr_wait` bead carries: the original session,
   * finished, with its session id captured.
   *
   * @param {any} store
   * @param {Partial<import('./queue-store.js').Attempt>} [over]
   */
  function seedDoneAttempt(store, over = {}) {
    const rev = store.snapshot(WS).revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'd1', bead_id: 'B1' }
    });
    store.updateAttempt(WS, {
      attempt_id: 'd1',
      patch: {
        bead_id: 'B1',
        status: 'done',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'base-B1',
        runner: 'claude',
        model: 'opus',
        session_id: 'sid-orig',
        finished_at: 50,
        ...over
      }
    });
  }

  test('resumes the original session in its existing worktree', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store);

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    expect(res.ok).toBe(true);
    // `--resume <session_id>` argv branch + the bead's own worktree, not a new one.
    expect(env.runner.settingsFor('B1').resume_session_id).toBe('sid-orig');
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('links the new attempt with resumed_from and marks it a resolution attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store);

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    const child =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(child.resumed_from).toBe('d1');
    expect(child.conflict_resolution).toBe(true);
  });

  // The ATTEMPT RECORD keeps the flag (asserted above); the guard input does
  // not exist any more (UI-1xcd §3).
  test('does not pass conflict_resolution into the runner settings', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store);

    await env.scheduler.resolveConflict(WS, 'B1');

    expect('conflict_resolution' in env.runner.settingsFor('B1')).toBe(false);
  });

  test('instructs merge-into-branch, never rebase, and never a PR merge', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store);

    await env.scheduler.resolveConflict(WS, 'B1');

    const prompt = env.runner.spawnedBead('B1').prompt;
    expect(prompt).toContain('git merge origin/main');
    expect(prompt).toContain('rebase와 force-push는 금지');
    expect(prompt).toContain('PR 머지는 절대 수행하지 마라');
  });

  test('runs even with the slot cap already full (human-click origin)', async () => {
    const env = setup({
      config: { A1: { ready: true, repo: '/repo', target_base: 'main' } },
      slots: 1
    });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    await flush();
    expect(env.scheduler.runningCount()).toBe(1);
    seedDoneAttempt(env.store);

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    expect(res.ok).toBe(true);
    expect(env.scheduler.runningCount()).toBe(2);
  });

  test('refuses no_session_id when no attempt of the bead captured one', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store, { session_id: null });

    expect((await env.scheduler.resolveConflict(WS, 'B1')).reason).toBe(
      'no_session_id'
    );
  });

  test('refuses worktree_missing when the bead worktree is gone', async () => {
    const env = setup({ config: {}, slots: 1 });
    env.worktree.exists.mockReturnValue(false);
    seedDoneAttempt(env.store);

    expect((await env.scheduler.resolveConflict(WS, 'B1')).reason).toBe(
      'worktree_missing'
    );
  });

  test('a normal dispatch carries no resolution flag in its settings either', async () => {
    const env = setup({
      config: { A1: { ready: true, repo: '/repo', target_base: 'main' } },
      slots: 1
    });
    seedQueue(env.store, ['A1']);

    await env.scheduler.tick(WS);
    await flush();

    expect('conflict_resolution' in env.runner.settingsFor('A1')).toBe(false);
  });
});

describe('scheduler external-PR conflict dispatch (UI-w0hi §1)', () => {
  const EXT_ROW = {
    bead_id: 'X1',
    pr_url: 'https://github.com/o/r/pull/777',
    pr_number: 777,
    added_at: 1
  };

  /**
   * An external bead as bd really holds it: `resolved`, hence blocked and not
   * ready — the two verdicts this dispatch must NOT consult.
   *
   * @param {{ bead?: Record<string, any>, registry?: boolean, defaults?: Record<string, string>, store?: any, execPresetCoordinator?: any, notify?: any }} [over]
   */
  function extEnv(over = {}) {
    const env = setup({
      config: {
        X1: {
          repo: '/repo',
          target_base: 'main',
          status: 'resolved',
          ready: false,
          blocked: true,
          ...(over.bead || {})
        }
      },
      store: over.store,
      slots: 1,
      notify: over.notify,
      execPresetCoordinator: over.execPresetCoordinator,
      externalPrs: over.registry === false ? undefined : { X1: EXT_ROW }
    });
    if (over.defaults) {
      seedExecDefaults(env.store, over.defaults);
    }
    return env;
  }

  /**
   * Persist a `running` attempt for a bead, the way a live session leaves one.
   *
   * @param {any} store
   * @param {Partial<import('./queue-store.js').Attempt>} patch
   */
  function seedRunningAttempt(store, patch) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'prev-1', bead_id: 'X1' }
    });
    store.updateAttempt(WS, { attempt_id: 'prev-1', patch });
  }

  test('refuses an incompatible selected preset before external metadata mutation', async () => {
    const resolveForDispatch = vi.fn(() => ({
      ok: false,
      reason: 'default_exec_preset_incompatible'
    }));
    const env = extEnv({ execPresetCoordinator: { resolveForDispatch } });

    const result = await env.scheduler.dispatchExternalConflict(
      WS,
      'X1',
      'main'
    );

    expect(result).toEqual({
      ok: false,
      reason: 'default_exec_preset_incompatible'
    });
    expect(resolveForDispatch).toHaveBeenCalledTimes(1);
    expect(env.bd.calls).toEqual([]);
    expect(env.runner.spawnOrder).toEqual([]);
    expect(env.store.snapshot(WS).attempts).toEqual({});
  });

  test('refuses before external metadata or runner launch when attempt prerecord fails', async () => {
    const base_store = createQueueStore();
    const appendAttempt = vi.fn((workspace) => ({
      ok: false,
      conflict: false,
      queue: base_store.snapshot(workspace)
    }));
    const env = extEnv({ store: { ...base_store, appendAttempt } });

    const result = await env.scheduler.dispatchExternalConflict(
      WS,
      'X1',
      'main'
    );

    expect(result).toEqual({ ok: false, reason: 'attempt_prerecord_failed' });
    expect(env.bd.calls).toEqual([]);
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('inherits prior external provenance without resolving a changed preset', async () => {
    const resolveForDispatch = vi.fn(() => ({
      ok: false,
      reason: 'default_exec_preset_missing'
    }));
    const env = extEnv({ execPresetCoordinator: { resolveForDispatch } });
    seedRunningAttempt(env.store, {
      status: 'done',
      runner: 'codex',
      model: 'sol',
      effort: 'high',
      exec_default_preset_id: 'preset-7',
      exec_default_preset_revision: 7,
      exec_stamped_keys: ['spec_review_model'],
      exec_values: {
        orchestration_model: 'sol',
        orchestration_effort: 'high',
        spec_review_model: 'codex'
      }
    });

    const result = await env.scheduler.dispatchExternalConflict(
      WS,
      'X1',
      'main'
    );

    expect(result.ok).toBe(true);
    expect(resolveForDispatch).not.toHaveBeenCalled();
    expect(env.runner.factoryNames).toEqual(['codex']);
    expect(env.runner.settingsFor('X1')).toMatchObject({
      model: 'sol',
      effort: 'high'
    });
    expect(
      env.store.snapshot(WS).attempts[/** @type {string} */ (result.attempt_id)]
    ).toMatchObject({
      exec_default_preset_id: 'preset-7',
      exec_default_preset_revision: 7,
      exec_stamped_keys: ['spec_review_model'],
      exec_values: {
        orchestration_model: 'sol',
        orchestration_effort: 'high',
        spec_review_model: 'codex'
      }
    });
  });

  test('dispatches a fresh session in the bead worktree with no resume', async () => {
    const env = extEnv();

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res.ok).toBe(true);
    expect(env.runner.settingsFor('X1').resume_session_id).toBe(undefined);
    expect(env.runner.cwdFor('X1')).toBe('/wt/X1');
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('records the attempt as an external conflict resolution', async () => {
    const env = extEnv();

    const res = await env.scheduler.dispatchExternalConflict(
      WS,
      'X1',
      'develop'
    );

    const a =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(a).toMatchObject({
      bead_id: 'X1',
      repo: '/repo',
      target_base: 'develop',
      base_oid: null,
      runner: 'claude',
      resumed_from: null,
      conflict_resolution: true,
      external_conflict: true
    });
  });

  test('falls back to main when the click observed no base', async () => {
    const env = extEnv();

    await env.scheduler.dispatchExternalConflict(WS, 'X1', '');

    expect(env.runner.spawnedBead('X1').prompt).toContain(
      'git merge origin/main'
    );
  });

  test('does not pass conflict_resolution into the runner settings', async () => {
    const env = extEnv();

    await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect('conflict_resolution' in env.runner.settingsFor('X1')).toBe(false);
  });

  test('runs with the slot cap already full (human-click origin)', async () => {
    const env = setup({
      config: {
        A1: { repo: '/repo', target_base: 'main' },
        X1: { repo: '/repo', target_base: 'main', ready: false, blocked: true }
      },
      slots: 1,
      externalPrs: { X1: EXT_ROW }
    });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    await flush();
    expect(env.scheduler.runningCount()).toBe(1);

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res.ok).toBe(true);
    expect(env.scheduler.runningCount()).toBe(2);
  });

  test('refuses bead_running while an attempt of the bead is running', async () => {
    const env = extEnv();
    seedRunningAttempt(env.store, { status: 'running', repo: '/repo' });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res).toEqual({ ok: false, reason: 'bead_running' });
    expect(Object.keys(env.store.snapshot(WS).attempts)).toEqual(['prev-1']);
  });

  test('refuses not_external when the registry does not know the bead', async () => {
    const env = extEnv({ registry: false });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res).toEqual({ ok: false, reason: 'not_external' });
    expect(env.store.snapshot(WS).attempts).toEqual({});
  });

  test('refuses bd_snapshot_failed when bd cannot be read', async () => {
    const env = extEnv({ bead: { throwOnSnapshotAt: 'all' } });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res).toEqual({ ok: false, reason: 'bd_snapshot_failed' });
    expect(env.store.snapshot(WS).attempts).toEqual({});
  });

  test('refuses worktree_missing when the delivering worktree is gone', async () => {
    const env = extEnv();
    env.worktree.exists.mockReturnValue(false);

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res).toEqual({ ok: false, reason: 'worktree_missing' });
    expect(env.store.snapshot(WS).attempts).toEqual({});
  });

  test('stamps workflow_mode=fast_track and reverts it when the session ends', async () => {
    const env = extEnv();

    await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(env.bd.calls).toContainEqual({
      method: 'setMetadata',
      bead_id: 'X1',
      key: 'workflow_mode',
      value: 'fast_track'
    });
    env.runner.finish('X1', { success: true });
    await flush();
    await flush();
    expect(env.bd.calls).toContainEqual({
      method: 'unsetMetadata',
      bead_id: 'X1',
      key: 'workflow_mode'
    });
  });

  test('records workflow_mode_record_failed and launches nothing when the stamp fails', async () => {
    const env = extEnv({ bead: { throwOnSet: true } });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res).toEqual({ ok: false, reason: 'workflow_mode_record_failed' });
    const a = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(a.status).toBe('failed');
    expect(a.cause).toBe('workflow_mode_record_failed');
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('stamps the globally-filled exec keys and records them on the attempt', async () => {
    const env = extEnv({
      bead: { model: null, effort: null },
      defaults: {
        orchestration_model: 'sonnet',
        orchestration_effort: 'high',
        spec_review_model: 'opus'
      }
    });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    const a =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(a.exec_stamped_keys).toEqual([
      'orchestration_model',
      'orchestration_effort',
      'spec_review_model'
    ]);
    expect(a.model).toBe('sonnet');
    expect(env.runner.settingsFor('X1').model).toBe('sonnet');
  });

  test('restores every written stamp when one exec key fails to stamp', async () => {
    const env = extEnv({
      bead: { model: null, effort: null, throwOnSetKey: 'spec_review_model' },
      defaults: {
        orchestration_model: 'sonnet',
        orchestration_effort: 'high',
        spec_review_model: 'opus'
      }
    });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res).toEqual({ ok: false, reason: 'exec_stamp_failed' });
    for (const key of [
      'orchestration_model',
      'orchestration_effort',
      'spec_review_model',
      'workflow_mode'
    ]) {
      expect(env.bd.calls).toContainEqual({
        method: 'unsetMetadata',
        bead_id: 'X1',
        key
      });
    }
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('closes a successful live resolution without touching the durable lane', async () => {
    const notify = {
      attemptStarted: vi.fn(),
      attemptFailed: vi.fn(),
      prWaitEntered: vi.fn()
    };
    const env = extEnv({ notify });
    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    env.runner.finish('X1', { success: true });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts[/** @type {string} */ (res.attempt_id)].status).toBe(
      'done'
    );
    expect(q.pr_wait).toEqual([]);
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
    expect(notify.prWaitEntered).not.toHaveBeenCalled();
    expect(env.bd.calls).toContainEqual({
      method: 'unsetMetadata',
      bead_id: 'X1',
      key: 'workflow_mode'
    });
  });

  test('keeps the ordinary failure route when the resolution session fails', async () => {
    const env = extEnv();
    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    env.runner.finish('X1', { success: false, reason: 'nonzero_exit' });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts[/** @type {string} */ (res.attempt_id)].status).toBe(
      'failed'
    );
    expect(q.pr_wait).toEqual([]);
    expect(q.queue).toEqual([]);
  });

  test('recovers a restart-surviving resolution attempt as done, not into pr_wait', async () => {
    const notify = {
      attemptStarted: vi.fn(),
      attemptFailed: vi.fn(),
      prWaitEntered: vi.fn()
    };
    const env = setup({
      config: { X1: {} },
      slots: 1,
      notify,
      probePid: () => ({ alive: false, started_at: null })
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'ext-1', bead_id: 'X1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'ext-1',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        target_base: 'main',
        workflow_mode_prior: null,
        exec_stamped_keys: ['spec_review_model'],
        exec_values: { spec_review_model: 'opus' },
        conflict_resolution: true,
        external_conflict: true
      }
    });

    await env.scheduler.reconcile(WS);

    const q = env.store.snapshot(WS);
    expect(q.attempts['ext-1'].status).toBe('done');
    expect(q.pr_wait).toEqual([]);
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
    expect(notify.prWaitEntered).not.toHaveBeenCalled();
    expect(env.bd.calls).toContainEqual({
      method: 'unsetMetadata',
      bead_id: 'X1',
      key: 'spec_review_model'
    });
    expect(env.bd.calls).toContainEqual({
      method: 'unsetMetadata',
      bead_id: 'X1',
      key: 'workflow_mode'
    });
  });

  test('a resumed external resolution inherits the external_conflict identifier', async () => {
    const env = extEnv();
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'ext-1', bead_id: 'X1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'ext-1',
      patch: {
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-ext',
        workflow_mode_prior: null,
        conflict_resolution: true,
        external_conflict: true
      }
    });

    const res = await env.scheduler.resume(WS, 'ext-1');

    expect(res.ok).toBe(true);
    expect(
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)]
        .external_conflict
    ).toBe(true);
  });

  test('a resumed external resolution still closes without a durable lane move', async () => {
    const notify = {
      attemptStarted: vi.fn(),
      attemptFailed: vi.fn(),
      prWaitEntered: vi.fn()
    };
    const env = extEnv({ notify });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'ext-1', bead_id: 'X1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'ext-1',
      patch: {
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-ext',
        workflow_mode_prior: null,
        conflict_resolution: true,
        external_conflict: true
      }
    });
    const res = await env.scheduler.resume(WS, 'ext-1');

    env.runner.finish('X1', { success: true, reason: 'ok' });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts[/** @type {string} */ (res.attempt_id)].status).toBe(
      'done'
    );
    expect(q.pr_wait).toEqual([]);
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
    expect(notify.prWaitEntered).not.toHaveBeenCalled();
  });
});

describe('scheduler REVISE disposition dispatch (UI-hs11 §3.3)', () => {
  /**
   * Seed the parking attempt a REVISE-parked bead carries: the stale re-review
   * session, failed, with its session id captured.
   *
   * @param {any} store
   * @param {Partial<import('./queue-store.js').Attempt>} [over]
   */
  function seedParkedAttempt(store, over = {}) {
    let rev = store.snapshot(WS).revision;
    rev = store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'p1', bead_id: 'B1' }
    });
    store.updateAttempt(WS, {
      attempt_id: 'p1',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        cause: 'verify_failed:pr_missing',
        spec_review_stale: true,
        repo: '/repo',
        target_base: 'main',
        base_oid: 'base-B1',
        runner: 'claude',
        model: 'opus',
        session_id: 'sid-park',
        workflow_mode_prior: null,
        finished_at: 50,
        ...over
      }
    });
  }

  test('resumes the parking session in its existing worktree', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedParkedAttempt(env.store);

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(res.ok).toBe(true);
    expect(env.runner.settingsFor('B1').resume_session_id).toBe('sid-park');
    expect(env.runner.cwdFor('B1')).toBe('/wt/B1');
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('links the child attempt with resumed_from and marks it a disposition', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedParkedAttempt(env.store);

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    const child =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(child.resumed_from).toBe('p1');
    expect(child.disposition).toBe('revise_fix');
    expect(child.conflict_resolution).toBe(false);
  });

  test('falls back to a fresh session in the shared checkout when the worktree is gone', async () => {
    const env = setup({ config: {}, slots: 1 });
    env.worktree.exists.mockReturnValue(false);
    seedParkedAttempt(env.store);

    await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(env.runner.settingsFor('B1').resume_session_id).toBeUndefined();
    expect(env.runner.cwdFor('B1')).toBe('/repo');
  });

  test('falls back to a fresh session when the parking attempt captured no session id', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedParkedAttempt(env.store, { session_id: null });

    await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(env.runner.settingsFor('B1').resume_session_id).toBeUndefined();
    expect(env.runner.cwdFor('B1')).toBe('/repo');
  });

  test('tells the runner this session opens no PR', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedParkedAttempt(env.store);

    await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(env.runner.settingsFor('B1').disposition).toBe('revise_fix');
  });

  test('refuses a bead with a running attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedParkedAttempt(env.store, { status: 'running' });

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(res).toEqual({ ok: false, reason: 'bead_running' });
  });

  test('refuses an attempt that was already resumed', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedParkedAttempt(env.store);
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'p2', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'p2',
      patch: { resumed_from: 'p1', status: 'done' }
    });

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(res).toEqual({ ok: false, reason: 'already_resumed' });
  });
});

describe('scheduler REVISE disposition completion (UI-hs11 §3.3)', () => {
  /**
   * Dispatch a disposition session and hand back its child attempt id.
   *
   * @param {any} env
   * @returns {Promise<string>}
   */
  async function dispatchDisposition(env) {
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'p1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'p1',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        spec_review_stale: true,
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-park',
        workflow_mode_prior: null,
        finished_at: 50
      }
    });
    // The park itself halted the queue; the disposition is what resumes it.
    env.store.setAutoAdvance(WS, false);
    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });
    return /** @type {string} */ (res.attempt_id);
  }

  test('bypasses the PR observation entirely', async () => {
    const complete = vi.fn(async () => ({ ok: true }));
    const env = setup({
      config: {},
      slots: 1,
      verifyOk: false,
      disposition: { complete }
    });
    const child = await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
    expect(complete).toHaveBeenCalledWith(
      expect.objectContaining({ bead_id: 'B1', kind: 'revise_fix' })
    );
    expect(env.store.snapshot(WS).attempts[child].status).toBe('done');
  });

  test('leaves the bead in the WAITING lane so the ordinary lane re-dispatches it', async () => {
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: async () => ({ ok: true }) }
    });
    await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.queue.map((/** @type {any} */ e) => e.bead_id)).toEqual(['B1']);
    expect(q.pr_wait).toEqual([]);
  });

  test('restores the transient dispatch metadata', async () => {
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: async () => ({ ok: true }) }
    });
    await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    expect(
      env.bd.calls.filter(
        (/** @type {any} */ c) =>
          c.method === 'unsetMetadata' && c.key === 'workflow_mode'
      ).length
    ).toBeGreaterThan(0);
  });

  test('resumes auto_advance so the ordinary lane re-dispatches the bead', async () => {
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: async () => ({ ok: true }) }
    });
    await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    expect(env.store.snapshot(WS).auto_advance).toBe(true);
  });

  test('a failed workflow_mode revert blocks the success, fail-closed', async () => {
    const env = setup({
      config: { B1: { throwOnUnset: true } },
      slots: 1,
      disposition: { complete: async () => ({ ok: true }) }
    });
    const child = await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    const attempt = env.store.snapshot(WS).attempts[child];
    expect(attempt.status).toBe('failed');
    expect(attempt.cause).toBe('workflow_mode_revert_failed');
    expect(env.store.snapshot(WS).auto_advance).toBe(false);
  });

  test('gives the disposition guard back on every failing termination', async () => {
    const release = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      disposition: {
        complete: async () => ({ ok: false, reason: 'still_blocked' }),
        release
      }
    });
    await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    expect(release).toHaveBeenCalledWith('B1');
  });

  test('gives the disposition guard back when the session is discarded', async () => {
    const release = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: vi.fn(), release }
    });
    const child = await dispatchDisposition(env);

    await env.scheduler.stop(WS, child);
    env.runner.finish('B1', { success: false, reason: 'killed' });
    await flush();

    expect(release).toHaveBeenCalledWith('B1');
  });

  test('reports a spawn abort as a refusal instead of a running session', async () => {
    const env = setup({
      config: {},
      slots: 1,
      makeRunner: () => ({
        name: 'claude',
        spawn() {
          throw new Error('spawn failed');
        }
      }),
      disposition: { complete: vi.fn(), release: vi.fn() }
    });
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'p1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'p1',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        spec_review_stale: true,
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-park'
      }
    });

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(res).toEqual({ ok: false, reason: 'spawn_failed' });
  });

  test('retries a failed resume ONCE as a fresh substitute session', async () => {
    const release = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: vi.fn(), release }
    });
    const child = await dispatchDisposition(env);

    env.runner.finish('B1', { success: false, reason: 'no_result' });
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts[child].cause).toBe('disposition_resume_failed:no_result');
    const substitute = Object.values(q.attempts).find(
      (/** @type {any} */ a) => a.resumed_from === child
    );
    expect(substitute).toMatchObject({
      disposition: 'revise_fix',
      disposition_resume: false,
      status: 'running'
    });
    // The disposition is still in flight, so its guard must NOT have been
    // handed back yet.
    expect(release).not.toHaveBeenCalled();
  });

  test('a substitute session that fails again takes the ordinary failure path', async () => {
    const release = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: vi.fn(), release }
    });
    await dispatchDisposition(env);
    env.runner.finish('B1', { success: false, reason: 'no_result' });
    await flush();

    env.runner.finish('B1', { success: false, reason: 'subtype' });
    await flush();

    const q = env.store.snapshot(WS);
    const substitute = /** @type {any} */ (
      Object.values(q.attempts).find(
        (/** @type {any} */ a) =>
          a.disposition_resume === false && a.disposition
      )
    );
    expect(substitute.cause).toBe('session_failed:subtype');
    expect(release).toHaveBeenCalledWith('B1');
  });

  test('guard-kill evidence outranks a restart-surviving disposition’s readback', async () => {
    const complete = vi.fn(async () => ({ ok: true }));
    const release = vi.fn();
    const stop = vi.fn(() => true);
    const env = setup({
      config: {},
      slots: 1,
      probePid: () => ({ alive: false, started_at: null }),
      sessionMonitors: { stop },
      disposition: { complete, release }
    });
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'd1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'd1',
      patch: {
        bead_id: 'B1',
        status: 'running',
        pid: 4242,
        repo: '/repo',
        target_base: 'main',
        disposition: 'revise_fix',
        disposition_resume: true,
        guard_kill: { reason: 'merge_guard', command: 'git merge', at: 5 }
      }
    });

    await env.scheduler.reconcile(WS);
    await flush();

    // The monitor is drained for a disposition too, the verdict is refused
    // without consulting the disposition dep, and a blocked verdict is never
    // retried as a substitute session.
    expect(stop).toHaveBeenCalledWith(WS, 'd1');
    expect(complete).not.toHaveBeenCalled();
    const q = env.store.snapshot(WS);
    expect(q.attempts.d1.cause).toBe('loud_fail_blocker');
    expect(
      Object.values(q.attempts).some(
        (/** @type {any} */ a) => a.resumed_from === 'd1'
      )
    ).toBe(false);
    expect(release).toHaveBeenCalledWith('B1');
  });

  test('judges a restart-surviving disposition by its own verdict, not by a PR', async () => {
    const complete = vi.fn(async () => ({ ok: true }));
    const env = setup({
      config: {},
      slots: 1,
      verifyOk: false,
      probePid: () => ({ alive: false, started_at: null }),
      disposition: { complete, release: vi.fn() }
    });
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'd1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'd1',
      patch: {
        bead_id: 'B1',
        status: 'running',
        pid: 4242,
        repo: '/repo',
        target_base: 'main',
        disposition: 'revise_fix',
        disposition_receipt: 'codex@' + 'a'.repeat(40)
      }
    });
    env.store.setAutoAdvance(WS, false);

    await env.scheduler.reconcile(WS);
    await flush();

    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
    expect(complete).toHaveBeenCalledWith(
      expect.objectContaining({
        bead_id: 'B1',
        prior_receipt: 'codex@' + 'a'.repeat(40),
        target_base: 'main'
      })
    );
    expect(env.store.snapshot(WS).attempts.d1.status).toBe('done');
  });

  test('a rejected verdict fails the attempt with the reason', async () => {
    const env = setup({
      config: {},
      slots: 1,
      disposition: {
        complete: async () => ({ ok: false, reason: 'receipt_not_refreshed' })
      }
    });
    const child = await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    const attempt = env.store.snapshot(WS).attempts[child];
    expect(attempt.status).toBe('failed');
    expect(attempt.cause).toBe('disposition_failed:receipt_not_refreshed');
  });

  test('a failed session never reaches the completion verdict', async () => {
    const complete = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete, release: vi.fn() }
    });
    await dispatchDisposition(env);

    env.runner.finish('B1', { success: false, reason: 'subtype' });
    await flush();

    expect(complete).not.toHaveBeenCalled();
  });

  test('fails closed when no disposition dep is wired at all', async () => {
    const env = setup({ config: {}, slots: 1 });
    const child = await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    expect(env.store.snapshot(WS).attempts[child].cause).toBe(
      'disposition_failed:no_disposition_dep'
    );
  });
});

describe('conflict resolution reaches the session guard end-to-end (§1/§6)', () => {
  /**
   * One claude assistant Bash tool_use, the shape the session guards inspect.
   *
   * @param {string} command
   * @returns {string}
   */
  function bashToolLine(command) {
    return JSON.stringify({
      type: 'assistant',
      message: {
        content: [{ type: 'tool_use', name: 'Bash', input: { command } }]
      }
    });
  }

  /**
   * Dispatch a conflict resolution through the REAL runner so the settings the
   * SCHEDULER built are the ones the guard sees — the whole point is that the
   * flag survives the trip, not that a hand-written settings object works.
   *
   * @param {string} command
   */
  async function resolveAndRun(command) {
    const spawn_impl = makeFixtureSpawn({
      lines: [bashToolLine(command)],
      pid: 7100,
      exit: 0
    });
    const kill_impl = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      makeRunner: (/** @type {string} */ name) =>
        createRunner(name, { spawn_impl, kill_impl })
    });
    const rev = env.store.snapshot(WS).revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'd1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'd1',
      patch: {
        bead_id: 'B1',
        status: 'done',
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-orig',
        finished_at: 50
      }
    });

    const res = await env.scheduler.resolveConflict(WS, 'B1');
    await flush();
    await flush();

    return { res, kill_impl, spawn_impl };
  }

  test('does not kill the resolution session for merging the base into its branch', async () => {
    const { res, kill_impl } = await resolveAndRun('git merge origin/main');

    expect(res.ok).toBe(true);
    expect(kill_impl).not.toHaveBeenCalled();
  });

  test('still kills the SAME resolution attempt for gh pr merge', async () => {
    const { res, kill_impl } = await resolveAndRun('gh pr merge 304 --squash');

    expect(res.ok).toBe(true);
    expect(kill_impl).toHaveBeenCalledWith(-7100, 'SIGTERM');
  });

  // The base-push judgment survives the trip but no longer kills: the effect is
  // the violation's kind (guard-enforcement-layer-replacement §4), and this one
  // infers a cwd the guard cannot see.
  test('only warns the SAME resolution attempt about a push to the base', async () => {
    const { kill_impl } = await resolveAndRun('git push origin HEAD:main');

    expect(kill_impl).not.toHaveBeenCalled();
  });

  test('kills the SAME resolution attempt for a hook bypass', async () => {
    const { kill_impl } = await resolveAndRun(
      'git push --no-verify origin HEAD:B1'
    );

    expect(kill_impl).toHaveBeenCalledWith(-7100, 'SIGTERM');
  });

  // Publishing the base IS the disposition's job. The scheduler carries the
  // disposition KIND (a string) on the settings, so this pins the real value
  // reaching the guard rather than a hand-written boolean.
  test('raises nothing when a DISPOSITION session publishes the base', async () => {
    const spawn_impl = makeFixtureSpawn({
      // The second line is what makes this discriminating: a base push only
      // warns for anyone, but a hook bypass kills every non-disposition session.
      lines: [
        bashToolLine('git push origin main'),
        bashToolLine('git push --no-verify origin main')
      ],
      pid: 7200,
      exit: 0
    });
    const kill_impl = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: async () => ({ ok: true }) },
      makeRunner: (/** @type {string} */ name) =>
        createRunner(name, { spawn_impl, kill_impl })
    });
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'p1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'p1',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        spec_review_stale: true,
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-park',
        finished_at: 50
      }
    });

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });
    await flush();
    await flush();

    expect(res.ok).toBe(true);
    expect(kill_impl).not.toHaveBeenCalled();
    expect(
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)]
        .cause_detail
    ).toBeNull();
  });
});

describe('scheduler claim release on close-less termination', () => {
  test('reopens a bead the failed session left in_progress', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    // The session claimed the bead and then died without closing it.
    env.bd.statuses.S1 = 'in_progress';

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    expect(env.bd.statuses.S1).toBe('open');
  });

  test('leaves a resolved bead alone when the PR verification fails', async () => {
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: false });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    // The session finished its work and recorded `resolved`; only the server's
    // PR observation failed, so the record must survive.
    env.bd.statuses.S1 = 'resolved';

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(env.bd.statuses.S1).toBe('resolved');
  });

  test('leaves a closed bead alone', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    env.bd.statuses.S1 = 'closed';

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    expect(env.bd.calls.some((c) => c.method === 'setStatus')).toBe(false);
  });

  test('finalizes the failed attempt even when the status read throws', async () => {
    const env = setup({
      config: { S1: { throwOnReadStatus: true } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('failed');
  });

  test('keeps the queue halted when the reopen write throws', async () => {
    const env = setup({ config: { S1: { throwOnSetStatus: true } }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    env.bd.statuses.S1 = 'in_progress';

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).auto_advance).toBe(false);
  });

  test('releases the claim only after the failure halt landed', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    env.bd.statuses.S1 = 'in_progress';
    /** @type {boolean|null} */
    let auto_advance_at_release = null;
    const setStatus = env.bd.setStatus;
    env.bd.setStatus = async (
      /** @type {string} */ bead_id,
      /** @type {string} */ status
    ) => {
      auto_advance_at_release = env.store.snapshot(WS).auto_advance;
      await setStatus(bead_id, status);
    };

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    // A tick raised by a concurrent attempt finishing must find the queue
    // already stopped, or it would relaunch the bead that just failed.
    expect(auto_advance_at_release).toBe(false);
  });

  test('reopens a bead the stopped session left in_progress', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.bd.statuses.S1 = 'in_progress';

    await env.scheduler.stop(WS, attempt_id);

    expect(env.bd.statuses.S1).toBe('open');
  });

  test('keeps the claim when the attempt is only paused', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    env.bd.statuses.S1 = 'in_progress';

    await env.scheduler.pause(WS, attempt_id);

    // A pause is not a termination — the session resumes in the same worktree.
    expect(env.bd.statuses.S1).toBe('in_progress');
  });

  test('reopens the bead when a paused attempt is discarded', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    env.bd.statuses.S1 = 'in_progress';
    await env.scheduler.pause(WS, attempt_id);

    await env.scheduler.stop(WS, attempt_id);

    expect(env.bd.statuses.S1).toBe('open');
  });

  test('makes a failed bead dispatchable again once the queue is re-armed', async () => {
    const env = setup({
      config: { S1: { ready_follows_status: true } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    // The claim is exactly what hid the bead from `bd ready` after the failure.
    env.bd.statuses.S1 = 'in_progress';
    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    env.store.setAutoAdvance(WS, true);
    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(true);
  });
});

describe('scheduler silent-skip reasons', () => {
  test('records not_ready:<status> for a bead the scan cannot dispatch', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'in_progress' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'not_ready:in_progress'
    );
  });

  test('records not_ready:unknown when the snapshot carries no status', async () => {
    const env = setup({ config: { S1: { ready: false } }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'not_ready:unknown'
    );
  });

  test('records bd_snapshot_failed when the scan snapshot throws', async () => {
    const env = setup({
      config: { S1: { throwOnSnapshotAt: 'all' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'bd_snapshot_failed'
    );
  });

  test('records bd_snapshot_failed when the dispatch re-read throws', async () => {
    const env = setup({ config: { S1: { throwOnSnapshotAt: 2 } }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'bd_snapshot_failed'
    );
  });

  test('records not_ready:<status> when the dispatch re-read is no longer ready', async () => {
    const env = setup({
      config: { S1: { notReadyAt: 2, status: 'in_progress' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'not_ready:in_progress'
    );
  });

  test('clears the reason once the bead dispatches', async () => {
    /** @type {Record<string, any>} */
    const config = { S1: { ready: false, status: 'in_progress' } };
    const env = setup({ config, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    config.S1.ready = true;
    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });

  test('does not re-record an unchanged reason on the next tick', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'in_progress' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const revision = env.store.snapshot(WS).revision;

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).revision).toBe(revision);
  });

  test('does not fan out an unchanged reason on the next tick', async () => {
    const notify = vi.fn();
    const env = setup({
      config: { S1: { ready: false, status: 'in_progress' } },
      slots: 1,
      notifyQueueChanged: notify
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    notify.mockClear();

    await env.scheduler.tick(WS);

    expect(notify).not.toHaveBeenCalled();
  });

  test('fans out a reason that changed since the last tick', async () => {
    const notify = vi.fn();
    /** @type {Record<string, any>} */
    const config = { S1: { ready: false, status: 'in_progress' } };
    const env = setup({ config, slots: 1, notifyQueueChanged: notify });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    notify.mockClear();

    config.S1.status = 'open';
    await env.scheduler.tick(WS);

    expect(notify).toHaveBeenCalledWith(WS);
  });

  test('a not-ready head does not starve the next queued bead', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'in_progress' }, S2: {} },
      slots: 1
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S2')).toBe(true);
  });

  test('a snapshot failure at the head does not starve the next queued bead', async () => {
    const env = setup({
      config: { S1: { throwOnSnapshotAt: 'all' }, S2: {} },
      slots: 1
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S2')).toBe(true);
  });
});

describe('scheduler worktree residue hygiene', () => {
  test('records worktree_add_failed when the add throws', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.add = vi.fn(async () => {
      throw new Error('already used by worktree');
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'worktree_add_failed'
    );
    expect(env.scheduler.isRunning('S1')).toBe(false);
  });

  test('does not retry the failing add inside the same tick cascade', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    const add = vi.fn(async () => {
      throw new Error('already used by worktree');
    });
    env.worktree.add = add;
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(add).toHaveBeenCalledTimes(1);
  });

  test('an add failure does not starve the next queued bead', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    env.worktree.add = vi.fn(async (/** @type {any} */ { bead_id }) => {
      if (bead_id === 'S1') {
        throw new Error('already used by worktree');
      }
      return { path: `/wt/${bead_id}`, branch: bead_id, base_oid: 'base' };
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S2')).toBe(true);
  });

  test('keeps the refill after an add failure inside the slot cap', async () => {
    const env = setup({
      config: { S1: {}, S2: {}, S3: {}, S4: {} },
      slots: 2
    });
    // S1 refuses mid-dispatch while S2 is still in flight (not yet spawned):
    // the refusal's re-entrant pass must count S2's claim as an occupied slot.
    env.worktree.add = vi.fn(async (/** @type {any} */ { bead_id }) => {
      if (bead_id === 'S1') {
        throw new Error('already used by worktree');
      }
      return { path: `/wt/${bead_id}`, branch: bead_id, base_oid: 'base' };
    });
    seedQueue(env.store, ['S1', 'S2', 'S3', 'S4']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(2);
  });

  test('checks the residue against the pinned base before creating the worktree', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1',
      base: 'main'
    });
    expect(
      env.worktree.removeIfDiscardable.mock.invocationCallOrder[0]
    ).toBeLessThan(env.worktree.add.mock.invocationCallOrder[0]);
  });

  test('dispatches normally once a discardable residue is cleared', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });

  for (const reason of [
    'dirty',
    'branch_ahead',
    'head_ahead',
    'observe_failed',
    'remove_failed'
  ]) {
    test(`refuses with worktree_stale_work when the residue is preserved (${reason})`, async () => {
      const env = setup({ config: { S1: {} }, slots: 1 });
      env.worktree.removeIfDiscardable = vi.fn(async () => ({
        ok: false,
        removed: false,
        reason
      }));
      seedQueue(env.store, ['S1']);

      await env.scheduler.tick(WS);

      expect(env.store.snapshot(WS).admission.S1.reason).toBe(
        'worktree_stale_work'
      );
      expect(env.worktree.add).not.toHaveBeenCalled();
      expect(env.scheduler.isRunning('S1')).toBe(false);
    });
  }

  test('never force-removes a residue it refused', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: false,
      removed: false,
      reason: 'dirty'
    }));
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.worktree.remove).not.toHaveBeenCalled();
  });

  test('records git_error when the residue check itself throws', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(async () => {
      throw new Error('git exploded');
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe('git_error');
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('a residue refusal does not starve the next queued bead', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(
      async (/** @type {any} */ { bead_id }) =>
        bead_id === 'S1'
          ? { ok: false, removed: false, reason: 'dirty' }
          : { ok: true, removed: false, reason: null }
    );
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S2')).toBe(true);
  });
});

describe('scheduler stop residue cleanup', () => {
  test('a live stop cleans the residue only after the killed session exits', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.worktree.removeIfDiscardable.mockClear();

    await env.scheduler.stop(WS, attempt_id);

    // SIGTERM does not wait: checking here would race a process still writing.
    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();

    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1',
      base: 'main'
    });
  });

  test('refuses a re-queued bead with stop_cleanup_pending until the cleanup lands', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.stop(WS, attempt_id);
    // The user re-queues the bead while the killed process is still exiting.
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S1'
    });

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'stop_cleanup_pending'
    );
  });

  test('dispatches the re-queued bead once the stop cleanup finished', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.stop(WS, attempt_id);
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S1'
    });

    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(env.scheduler.isRunning('S1')).toBe(true);
  });

  test('keeps the residue when the killed session never reports its exit', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.worktree.removeIfDiscardable.mockClear();

    await env.scheduler.stop(WS, attempt_id);
    await flush();
    await flush();

    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();
  });

  test('a paused discard leaves the residue alone while the killed session is still exiting', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, attempt_id);
    env.worktree.removeIfDiscardable.mockClear();

    await env.scheduler.stop(WS, attempt_id);

    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();
  });

  test('a paused discard cleans the residue once the killed session exits', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, attempt_id);
    env.worktree.removeIfDiscardable.mockClear();
    await env.scheduler.stop(WS, attempt_id);

    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1',
      base: 'main'
    });
  });

  test('a paused record restored without a live handle is cleaned inline', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'A-restored', bead_id: 'S1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'A-restored',
      patch: {
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-1',
        status: 'paused'
      }
    });

    const discarded = await env.scheduler.stop(WS, 'A-restored');

    expect(discarded).toBe(true);
    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1',
      base: 'main'
    });
  });

  test('never force-removes a residue the stop cleanup refused', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, attempt_id);
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: false,
      removed: false,
      reason: 'branch_ahead'
    }));

    expect(await env.scheduler.stop(WS, attempt_id)).toBe(true);
    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(env.worktree.remove).not.toHaveBeenCalled();
  });

  test('a pause leaves the residue for the resume', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    env.worktree.removeIfDiscardable.mockClear();

    await env.scheduler.pause(WS, attempt_id);

    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();
  });
});

describe('scheduler terminal-status dequeue', () => {
  test('moves a closed queue member into the done lane instead of badging it', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'closed' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual([]);
    expect(snap.done.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.admission.S1).toBeUndefined();
  });

  test('fans out the closed dequeue to subscribers', async () => {
    const notify = vi.fn();
    const env = setup({
      config: { S1: { ready: false, status: 'closed' } },
      slots: 1,
      notifyQueueChanged: notify
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(notify).toHaveBeenCalledWith(WS);
  });

  test('completes a bead that closed between the scan and the dispatch re-read', async () => {
    const env = setup({
      config: { S1: { notReadyAt: 2, status: 'closed' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual([]);
    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toEqual(['S1']);
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
    expect(env.scheduler.isRunning('S1')).toBe(false);
  });

  test('stops bumping the revision once the closed bead is gone', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'closed' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const revision = env.store.snapshot(WS).revision;

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).revision).toBe(revision);
  });

  test('keeps badging a resolved bead instead of dequeuing it', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'resolved' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.admission.S1.reason).toBe('not_ready:resolved');
  });

  test('a closed head does not starve the next queued bead', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'closed' }, S2: {} },
      slots: 1
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S2')).toBe(true);
  });
});

describe('scheduler closed-queue sweep (UI-m6bg)', () => {
  /**
   * Record one attempt for a bead WITHOUT moving it out of the waiting lane —
   * the shape the sweep's active judgment reads.
   *
   * @param {any} store
   * @param {string} bead_id
   * @param {string} attempt_id
   * @param {Record<string, any>} patch
   */
  function seedAttempt(store, bead_id, attempt_id, patch) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id, bead_id }
    });
    store.updateAttempt(WS, { attempt_id, patch });
  }

  test('moves a closed queue row into the done lane', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    const snap = env.store.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual([]);
    expect(snap.done.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('keeps a resolved queue row in the queue', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    env.scheduler.sweepClosedQueue(WS, { S1: 'resolved' });

    const snap = env.store.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.done).toEqual([]);
  });

  test('keeps an open queue row in the queue', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    env.scheduler.sweepClosedQueue(WS, { S1: 'open' });

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('keeps an in_progress queue row in the queue', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    env.scheduler.sweepClosedQueue(WS, { S1: 'in_progress' });

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('writes nothing for a bead the status read did not return', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    const revision = env.store.snapshot(WS).revision;

    env.scheduler.sweepClosedQueue(WS, { S2: 'closed' });

    expect(env.store.snapshot(WS).revision).toBe(revision);
    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('writes nothing when handed a non-object status map', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    const revision = env.store.snapshot(WS).revision;

    env.scheduler.sweepClosedQueue(WS, /** @type {any} */ (null));

    expect(env.store.snapshot(WS).revision).toBe(revision);
  });

  test('leaves a closed bead sitting in pr_wait and the merge queue alone', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedAttempt(env.store, 'S1', 'att-1', { status: 'done' });
    env.store.moveToPrWait(WS, {
      bead_id: 'S1',
      attempt_id: 'att-1',
      patch: { status: 'done' }
    });
    env.store.enqueueMerge(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      entries: [{ bead_id: 'S1' }]
    });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.merge_queue.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.done).toEqual([]);
  });

  test('keeps a closed bead the dispatch already claimed in the queue', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    // Hang the worktree creation: the claim is taken and no attempt is recorded
    // yet, which is the pre-attempt window `active_bead_ids` cannot see.
    env.worktree.add.mockImplementation(() => new Promise(() => {}));
    seedQueue(env.store, ['S1']);
    const dispatching = env.scheduler.tick(WS);
    await flush();
    await flush();
    expect(env.scheduler.isRunning('S1')).toBe(true);

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);
    dispatching.catch(() => {});
  });

  test('keeps a closed bead holding a leaf paused attempt in the queue', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedAttempt(env.store, 'S1', 'att-1', { status: 'paused' });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('keeps a closed bead holding an unfinished attempt in the queue', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedAttempt(env.store, 'S1', 'att-1', { status: 'running' });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('moves a closed row whose only attempt already finished', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedAttempt(env.store, 'S1', 'att-1', { status: 'failed' });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('cleans up with auto_advance off, where no tick pass ever runs', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'closed' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    env.store.setAutoAdvance(WS, false);
    await env.scheduler.tick(WS);
    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('fans out one snapshot push for the whole sweep', () => {
    const notify = vi.fn();
    const env = setup({
      config: { S1: {}, S2: {} },
      slots: 1,
      notifyQueueChanged: notify
    });
    seedQueue(env.store, ['S1', 'S2']);
    notify.mockClear();

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed', S2: 'closed' });

    expect(notify).toHaveBeenCalledTimes(1);
  });

  test('pushes no snapshot when the sweep moved nothing', () => {
    const notify = vi.fn();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      notifyQueueChanged: notify
    });
    seedQueue(env.store, ['S1']);
    notify.mockClear();

    env.scheduler.sweepClosedQueue(WS, { S1: 'open' });

    expect(notify).not.toHaveBeenCalled();
  });

  test('moves a closed row whose attempt was orphaned', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedAttempt(env.store, 'S1', 'att-1', { status: 'orphaned' });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('moves a closed row whose paused attempt was already resumed', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedAttempt(env.store, 'S1', 'att-1', { status: 'paused' });
    seedAttempt(env.store, 'S1', 'att-2', {
      status: 'done',
      resumed_from: 'att-1'
    });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('a sweep during the scan does not resurrect the row as a dispatch', async () => {
    /** @type {(value: any) => void} */
    let release = () => {};
    // Hold the pass inside its admission await — the exact window the poller's
    // sweep runs in, and the one the claim happens AFTER.
    const env = setup({
      config: { S1: {} },
      slots: 1,
      admission: {
        validate: () =>
          new Promise((resolve) => {
            release = resolve;
          })
      }
    });
    seedQueue(env.store, ['S1']);
    const ticking = env.scheduler.tick(WS);
    await flush();
    await flush();

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });
    release({ ok: true });
    await ticking;

    const snap = env.store.snapshot(WS);
    expect(snap.done.map((e) => e.bead_id)).toEqual(['S1']);
    expect(env.scheduler.isRunning('S1')).toBe(false);
  });
});

describe('scheduler protected bead sets (UI-b8n8 §접근 A)', () => {
  test('reports a dispatch-claimed bead as active before any attempt exists', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.add.mockImplementation(() => new Promise(() => {}));
    seedQueue(env.store, ['S1']);
    const dispatching = env.scheduler.tick(WS);
    await flush();
    await flush();

    expect([...env.scheduler.activeBeadIds(WS)]).toEqual(['S1']);
    dispatching.catch(() => {});
  });

  test('reports a running bead as active', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.activeBeadIds(WS).has('S1')).toBe(true);
  });

  test('drops a bead whose attempt reached a terminal status', async () => {
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(env.scheduler.activeBeadIds(WS).has('S1')).toBe(false);
  });

  test('protects a stopped bead whose teardown has not finished', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.stop(WS, attempt_id);

    // The attempt is already `stopped` (terminal) and the claim is released, so
    // the active union alone no longer covers the bead — the cleanup fence is
    // the only thing holding the live worktree out of the external registry.
    expect(env.scheduler.activeBeadIds(WS).has('S1')).toBe(false);
    expect(env.scheduler.externalProtectedBeadIds(WS).has('S1')).toBe(true);
  });

  test('releases the protection once the killed session exits', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.stop(WS, attempt_id);

    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(env.scheduler.externalProtectedBeadIds(WS).has('S1')).toBe(false);
  });

  test('leaves the closed-queue sweep on the narrower active set', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.stop(WS, attempt_id);
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S1'
    });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    // `cleanup_pending` in the sweep would only delay a terminating bead's move
    // to `done` — the sweep is deliberately NOT the protected superset.
    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toEqual(['S1']);
  });
});

describe('scheduler already-finished verify verdict (UI-b8n8 §접근 B)', () => {
  /**
   * @param {{ already_finished: boolean }} vr
   */
  function verifyWith(vr) {
    return {
      verifyPrSubmitted: vi.fn(async () => ({
        ok: true,
        reason: 'ok',
        pr_url: 'https://github.com/o/r/pull/1',
        pr_state: vr.already_finished ? 'MERGED' : 'OPEN',
        already_finished: vr.already_finished
      }))
    };
  }

  test('routes an already-finished bead to done instead of pr_wait', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verify: verifyWith({ already_finished: true })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.done.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.pr_wait).toEqual([]);
  });

  test('terminates the attempt on the same write as the done move', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verify: verifyWith({ already_finished: true })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt.status).toBe('done');
    expect(attempt.finished_at).toBe(1000);
  });

  test('pushes no prWaitEntered notification for a lane it never enters', async () => {
    const notify = {
      attemptStarted: vi.fn(),
      attemptFailed: vi.fn(),
      prWaitEntered: vi.fn()
    };
    const env = setup({
      config: { S1: {} },
      slots: 1,
      notify,
      verify: verifyWith({ already_finished: true })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(notify.prWaitEntered).not.toHaveBeenCalled();
  });

  test('still routes an ordinary success to pr_wait', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verify: verifyWith({ already_finished: false })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.done).toEqual([]);
  });

  test('records the verify_result carrying pr_state on the attempt', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verify: verifyWith({ already_finished: true })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(/** @type {any} */ (attempt.verify_result).pr_state).toBe('MERGED');
  });
});

describe('scheduler reconcile (worker-detached-session-reconcile §1)', () => {
  /**
   * Persist a `running` attempt exactly as a PRIOR process left it: the durable
   * record survives the restart, the in-memory session handle does not.
   *
   * @param {any} store
   * @param {Partial<import('./queue-store.js').Attempt>} [patch]
   */
  function seedDetachedAttempt(store, patch = {}) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        workflow_mode_prior: null,
        ...patch
      }
    });
  }

  /**
   * A scheduler whose PID probe answers exactly once per attempt.
   *
   * @param {{ alive: boolean, started_at: number|null }} probe
   * @param {Record<string, any>} [config]
   * @param {Record<string, any>} [extra]
   */
  function reconcileEnv(probe, config = { 'UI-1': {} }, extra = {}) {
    return setup({ config, probePid: () => probe, ...extra });
  }

  test('leaves a live attempt whose PID start time matches untouched', async () => {
    const env = reconcileEnv({ alive: true, started_at: 1000 });
    seedDetachedAttempt(env.store);
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].status).toBe('running');
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  test('keeps an attempt whose probed start time is inside the tolerance', async () => {
    const env = reconcileEnv({ alive: true, started_at: 2999 });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].status).toBe('running');
  });

  test('treats a recycled PID (alive, start time mismatch) as dead', async () => {
    const env = reconcileEnv({ alive: true, started_at: 999999 });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].status).toBe('done');
  });

  test('treats an attempt with no recorded pid as dead', async () => {
    const env = reconcileEnv({ alive: true, started_at: 1000 });
    seedDetachedAttempt(env.store, { pid: null });

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].status).toBe('done');
  });

  test('ignores attempts that are not running', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store, { status: 'done' });

    await env.scheduler.reconcile(WS);

    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  test('skips an attempt this process still holds a session handle for', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      probePid: () => ({ alive: false, started_at: null })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.reconcile(WS);

    // onSessionDone is this attempt's authority — a reconcile disposition here
    // would double-process the session the moment it exits.
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('running');
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  test('moves a dead attempt whose PR the server observes into pr_wait', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.reconcile(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.attempts['att-1'].status).toBe('done');
    expect(snap.pr_wait.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('does not halt the queue when it recovers a normal completion', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).auto_advance).toBe(true);
  });

  test('records the verify_result the PR poller resolves its PR number from', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(
      env.store.snapshot(WS).attempts['att-1'].verify_result
    ).toMatchObject({ ok: true, pr_url: 'https://github.com/o/r/pull/1' });
  });

  test('leaves exit null — a detached session exit is never observed', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].exit).toBe(null);
  });

  test('reverts the exec stamps the dead session left on the bead', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store, {
      exec_stamped_keys: ['orchestration_model']
    });

    await env.scheduler.reconcile(WS);

    expect(env.bd.calls).toContainEqual({
      method: 'unsetMetadata',
      bead_id: 'UI-1',
      key: 'orchestration_model'
    });
  });

  test('fails a dead attempt whose PR is missing and halts the queue', async () => {
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      verifyOk: false
    });
    seedDetachedAttempt(env.store);
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.reconcile(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.attempts['att-1'].cause).toBe('verify_failed:pr_missing');
    expect(snap.attempts['att-1'].status).toBe('failed');
    expect(snap.auto_advance).toBe(false);
  });

  test('fails closed when the PR observation could not be completed', async () => {
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      verify: {
        verifyPrSubmitted: vi.fn(async () => ({
          ok: false,
          reason: 'gh_observation_failed',
          pr_url: null
        }))
      }
    });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    // An observation error must never be downgraded to "no PR was opened".
    expect(env.store.snapshot(WS).attempts['att-1'].cause).toBe(
      'verify_failed:gh_observation_failed'
    );
  });

  test('fails closed without an observation when the attempt records no repo', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store, { repo: null });

    await env.scheduler.reconcile(WS);

    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).attempts['att-1'].cause).toBe(
      'verify_failed:gh_observation_failed'
    );
  });

  test('fails a monitor-killed attempt even when its PR is observed open (UI-o2yt §3.3)', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store, {
      guard_kill: {
        reason: 'merge_to_base_blocked',
        command: 'git merge main',
        at: 900
      }
    });
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.reconcile(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.attempts['att-1'].status).toBe('failed');
    expect(snap.attempts['att-1'].cause).toBe('loud_fail_blocker');
    expect(snap.attempts['att-1'].cause_detail).toEqual({
      reason: 'merge_to_base_blocked',
      command: 'git merge main'
    });
    expect(snap.pr_wait).toEqual([]);
    expect(snap.auto_advance).toBe(false);
  });

  test('stops the attempt monitor before lifting its terminal usage patch', async () => {
    /** @type {string[]} */
    const order = [];
    /** @type {any} */
    let env_ref = null;
    const sessionMonitors = {
      stop: vi.fn((/** @type {string} */ ws, /** @type {string} */ id) => {
        order.push('monitor_stop');
        // The drain a real stop performs: the tail's last lines reach the usage
        // store, which is what the disposition's patch then persists.
        env_ref.usage.record(ws, id, {
          message_id: 'm1',
          input_tokens: 12,
          output_tokens: 3
        });
        return true;
      })
    };
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      sessionMonitors,
      verify: {
        verifyPrSubmitted: vi.fn(async () => {
          order.push('verify');
          return { ok: true, reason: 'ok', pr_url: 'https://x/pull/1' };
        })
      }
    });
    env_ref = env;
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(order).toEqual(['monitor_stop', 'verify']);
    expect(sessionMonitors.stop).toHaveBeenCalledWith(WS, 'att-1');
    expect(env.store.snapshot(WS).attempts['att-1'].usage).toMatchObject({
      input_tokens: 12,
      output_tokens: 3
    });
  });

  test('reads the guard evidence the monitor writes during its final drain', async () => {
    /** @type {any} */
    let env_ref = null;
    const sessionMonitors = {
      stop: vi.fn((/** @type {string} */ ws, /** @type {string} */ id) => {
        env_ref.store.updateAttempt(ws, {
          attempt_id: id,
          patch: {
            guard_kill: { reason: 'question_blocked', command: null, at: 900 }
          }
        });
        return true;
      })
    };
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      sessionMonitors
    });
    env_ref = env;
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].cause).toBe(
      'loud_fail_blocker'
    );
  });

  test('blocks the lane move when the workflow_mode revert fails', async () => {
    const env = reconcileEnv(
      { alive: false, started_at: null },
      {
        'UI-1': { throwOnUnset: true }
      }
    );
    seedDetachedAttempt(env.store);
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.reconcile(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.attempts['att-1'].cause).toBe('workflow_mode_revert_failed');
    expect(snap.pr_wait).toEqual([]);
  });

  /**
   * A verify dep whose observation parks until the returned `release` is
   * called — the seconds-long `gh` window every ownership fence exists for.
   *
   * @param {{ ok: boolean, reason: string }} [result]
   */
  function gatedVerify(result = { ok: true, reason: 'ok' }) {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(undefined);
    });
    const verifyPrSubmitted = vi.fn(async () => {
      await gate;
      return { ...result, pr_url: 'https://github.com/o/r/pull/1' };
    });
    return { verify: { verifyPrSubmitted }, verifyPrSubmitted, release };
  }

  /**
   * Settle the detached promise chains a disposition hangs off.
   *
   * @returns {Promise<void>}
   */
  async function drain() {
    for (let i = 0; i < 10; i += 1) {
      await flush();
    }
  }

  test('leaves an attempt alone while its own onSessionDone is still verifying', async () => {
    const gated = gatedVerify();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verify: gated.verify,
      probePid: () => ({ alive: false, started_at: null })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    // The handle is gone from `running` the moment onSessionDone starts, but
    // the attempt stays durably `running` until its terminal write lands.
    env.runner.finish('S1', { success: true });
    await flush();

    // Asserted while the pass is still open: an unfenced reconcile issues its
    // own observation here, which would ALSO park on the gate.
    const pass = env.scheduler.reconcile(WS);
    await flush();
    expect(gated.verifyPrSubmitted).toHaveBeenCalledTimes(1);

    gated.release();
    await pass;
    await drain();

    expect(gated.verifyPrSubmitted).toHaveBeenCalledTimes(1);
    expect(env.store.snapshot(WS).pr_wait.map((e) => e.bead_id)).toEqual([
      'S1'
    ]);
  });

  test('leaves an attempt alone while its dispatch is still in flight', async () => {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(undefined);
    });
    const env = setup({
      // `model: null` leaves the bead's exec setting absent so the global
      // default fills and STAMPS it — an await that lands after the durable
      // pre-record (status `running`, pid null) and before the spawn.
      config: { S1: { model: null } },
      slots: 1,
      probePid: () => ({ alive: false, started_at: null })
    });
    seedExecDefaults(env.store, { orchestration_model: 'opus' });
    seedQueue(env.store, ['S1']);
    const setMetadata = env.bd.setMetadata.bind(env.bd);
    env.bd.setMetadata = async (
      /** @type {string} */ bead_id,
      /** @type {string} */ key,
      /** @type {string} */ value
    ) => {
      if (key === 'orchestration_model') {
        await gate;
      }
      return setMetadata(bead_id, key, value);
    };

    const dispatching = env.scheduler.tick(WS);
    await flush();
    await env.scheduler.reconcile(WS);

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    // pid is still null here — indistinguishable from a dead attempt without
    // the `claimed` fence.
    expect(env.store.snapshot(WS).attempts[attempt_id].pid).toBe(null);
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('running');
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();

    release();
    await dispatching;

    expect(env.runner.spawnOrder).toEqual(['S1']);
    expect(env.store.snapshot(WS).attempts[attempt_id].pid).not.toBe(null);
  });

  test('blocks a re-dispatch of the bead while its reconcile observation is pending', async () => {
    const gated = gatedVerify();
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      verify: gated.verify
    });
    seedDetachedAttempt(env.store);
    seedQueue(env.store, ['UI-1']);

    const pass = env.scheduler.reconcile(WS);
    await flush();
    await env.scheduler.tick(WS);

    // A second attempt here would mean the disposition's later failAttempt
    // could release the NEW session's claim and revert ITS metadata.
    expect(Object.keys(env.store.snapshot(WS).attempts)).toEqual(['att-1']);
    expect(env.runner.spawnOrder).toEqual([]);

    gated.release();
    await pass;

    const snap = env.store.snapshot(WS);
    expect(snap.attempts['att-1'].status).toBe('done');
    expect(snap.pr_wait.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('gives the claim back so the recovered bead can dispatch again', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(env.scheduler.isRunning('UI-1')).toBe(false);
  });

  test('runs one reconcile pass at a time per workspace', async () => {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(undefined);
    });
    const verifyPrSubmitted = vi.fn(async () => {
      await gate;
      return {
        ok: true,
        reason: 'ok',
        pr_url: 'https://github.com/o/r/pull/1'
      };
    });
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      verify: { verifyPrSubmitted }
    });
    seedDetachedAttempt(env.store);

    const first = env.scheduler.reconcile(WS);
    await flush();
    await env.scheduler.reconcile(WS);
    release();
    await first;

    expect(verifyPrSubmitted).toHaveBeenCalledTimes(1);
  });

  test('persists the replayed usage of a dead attempt it disposes (UI-ediw)', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);
    // What the startup replay left behind for an attempt this process never
    // owned: a tally rebuilt from the session log.
    env.usage?.record(WS, 'att-1', {
      message_id: 'm1',
      input_tokens: 10,
      output_tokens: 4
    });
    env.usage?.markReplayed(WS, 'att-1');

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].usage).toMatchObject({
      input_tokens: 10,
      output_tokens: 4,
      replayed: true
    });
    // …and the in-memory entry is reclaimed with it.
    expect(env.usage?.get(WS, 'att-1')).toBe(null);
  });

  test('leaves usage null on a disposed attempt with nothing replayed', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].usage).toBe(null);
  });

  test('persists the replayed usage on the FAILED disposition branch too', async () => {
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      verifyOk: false
    });
    seedDetachedAttempt(env.store);
    env.usage?.record(WS, 'att-1', { message_id: 'm1', input_tokens: 7 });
    env.usage?.markReplayed(WS, 'att-1');

    await env.scheduler.reconcile(WS);

    const attempt = env.store.snapshot(WS).attempts['att-1'];
    expect(attempt.status).toBe('failed');
    expect(attempt.usage).toMatchObject({ input_tokens: 7, replayed: true });
  });
});

describe('scheduler attempt-lifecycle notifications (UI-2yoq)', () => {
  /** A fake notifier recording every lifecycle push. */
  function makeFakeNotify() {
    return {
      attemptStarted: vi.fn(),
      attemptFailed: vi.fn(),
      prWaitEntered: vi.fn()
    };
  }

  /**
   * Seed a terminal attempt directly into the store, so the resume/conflict
   * paths can be driven without a first dispatch.
   *
   * @param {any} store
   * @param {string} attempt_id
   * @param {any} patch
   */
  function seedAttempt(store, attempt_id, patch) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id, bead_id: patch.bead_id }
    });
    store.updateAttempt(WS, { attempt_id, patch });
  }

  /** @returns {any} */
  function resumablePrior(over = {}) {
    return {
      bead_id: 'B1',
      status: 'failed',
      repo: '/repo',
      target_base: 'main',
      base_oid: 'base-B1',
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      session_id: 'sid-abc',
      workflow_mode_prior: null,
      cause: 'verify_failed:pr_missing',
      ...over
    };
  }

  test('pushes attemptStarted with the bead title on a first dispatch', async () => {
    const notify = makeFakeNotify();
    const env = setup({
      config: { S1: { title: '워커 알림' } },
      slots: 1,
      notify
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(notify.attemptStarted).toHaveBeenCalledTimes(1);
    expect(notify.attemptStarted.mock.calls[0][0]).toEqual({
      bead_id: 'S1',
      title: '워커 알림',
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      repo: '/repo',
      kind: 'dispatch'
    });
  });

  test('marks a manual resume launch as a resume', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: {}, slots: 1, notify });
    seedAttempt(env.store, 'f1', resumablePrior());

    expect((await env.scheduler.resume(WS, 'f1')).ok).toBe(true);

    expect(notify.attemptStarted.mock.calls[0][0].kind).toBe('resume');
    expect(notify.attemptStarted.mock.calls[0][0].title).toBe(null);
  });

  test('marks a conflict-resolution launch as a conflict', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: {}, slots: 1, notify });
    seedAttempt(env.store, 'f1', resumablePrior());

    expect((await env.scheduler.resolveConflict(WS, 'B1')).ok).toBe(true);

    expect(notify.attemptStarted.mock.calls[0][0].kind).toBe('conflict');
  });

  test('pushes attemptFailed with the session cause', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: { S1: {} }, slots: 1, notify });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', {
      success: false,
      reason: 'result_count',
      exit: 1
    });
    await flush();
    await flush();

    expect(notify.attemptFailed).toHaveBeenCalledTimes(1);
    expect(notify.attemptFailed.mock.calls[0][0]).toEqual({
      bead_id: 'S1',
      cause: 'session_failed:result_count',
      repo: '/repo',
      cause_detail: null
    });
  });

  test('carries the blocker cause_detail into the failure push', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: { S1: {} }, slots: 1, notify });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', {
      success: false,
      reason: 'blocked',
      exit: 1,
      blocked: true,
      blocked_detail: { reason: 'git_merge_guard', command: 'git merge main' }
    });
    await flush();
    await flush();

    expect(notify.attemptFailed.mock.calls[0][0].cause).toBe(
      'loud_fail_blocker'
    );
    expect(notify.attemptFailed.mock.calls[0][0].cause_detail).toEqual({
      reason: 'git_merge_guard',
      command: 'git merge main'
    });
  });

  test('pushes attemptFailed from the dispatch workflow_mode_record_failed path', async () => {
    const notify = makeFakeNotify();
    const env = setup({
      config: { S1: { throwOnSet: true } },
      slots: 1,
      notify
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(notify.attemptFailed).toHaveBeenCalledTimes(1);
    expect(notify.attemptFailed.mock.calls[0][0]).toEqual({
      bead_id: 'S1',
      cause: 'workflow_mode_record_failed',
      repo: '/repo',
      cause_detail: null
    });
    expect(notify.attemptStarted).not.toHaveBeenCalled();
  });

  test('pushes attemptFailed from the relaunch workflow_mode_record_failed path', async () => {
    const notify = makeFakeNotify();
    const env = setup({
      config: { B1: { throwOnSet: true } },
      slots: 1,
      notify
    });
    seedAttempt(env.store, 'f1', resumablePrior());

    expect((await env.scheduler.resume(WS, 'f1')).reason).toBe(
      'workflow_mode_record_failed'
    );

    expect(notify.attemptFailed).toHaveBeenCalledTimes(1);
    expect(notify.attemptFailed.mock.calls[0][0]).toEqual({
      bead_id: 'B1',
      cause: 'workflow_mode_record_failed',
      repo: '/repo',
      cause_detail: null
    });
    expect(notify.attemptStarted).not.toHaveBeenCalled();
  });

  test('pushes attemptFailed from the dispatch exec_stamp_failed path', async () => {
    const notify = makeFakeNotify();
    const env = setup({
      config: {
        S1: { model: null, effort: null, throwOnSetKey: 'orchestration_model' }
      },
      slots: 1,
      notify
    });
    seedExecDefaults(env.store, { orchestration_model: 'sonnet' });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(notify.attemptFailed).toHaveBeenCalledTimes(1);
    expect(notify.attemptFailed.mock.calls[0][0].cause).toBe(
      'exec_stamp_failed'
    );
    expect(notify.attemptStarted).not.toHaveBeenCalled();
  });

  test('pushes attemptFailed when the runner spawn throws', async () => {
    const notify = makeFakeNotify();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      notify,
      makeRunner: () => ({
        name: 'claude',
        spawn() {
          throw new Error('spawn exploded');
        }
      })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(notify.attemptFailed).toHaveBeenCalledTimes(1);
    expect(notify.attemptFailed.mock.calls[0][0]).toEqual({
      bead_id: 'S1',
      cause: 'spawn_failed',
      repo: '/repo',
      cause_detail: null
    });
    expect(notify.attemptStarted).not.toHaveBeenCalled();
  });

  test('pushes prWaitEntered with the observed PR url on success', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: { S1: {} }, slots: 1, notify });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true, reason: 'ok', exit: 0 });
    await flush();
    await flush();

    expect(notify.prWaitEntered).toHaveBeenCalledTimes(1);
    expect(notify.prWaitEntered.mock.calls[0][0]).toEqual({
      bead_id: 'S1',
      pr_url: 'https://github.com/o/r/pull/1',
      repo: '/repo'
    });
    expect(notify.attemptFailed).not.toHaveBeenCalled();
  });

  test('pushes nothing terminal when the user stops the attempt', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: { S1: {} }, slots: 1, notify });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.stop(WS, attempt_id);
    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(notify.attemptStarted).toHaveBeenCalledTimes(1);
    expect(notify.attemptFailed).not.toHaveBeenCalled();
    expect(notify.prWaitEntered).not.toHaveBeenCalled();
  });

  test('pushes nothing terminal when the user pauses the attempt', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: { S1: {} }, slots: 1, notify });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');

    expect(await env.scheduler.pause(WS, attempt_id)).toEqual({ ok: true });
    await flush();

    expect(notify.attemptFailed).not.toHaveBeenCalled();
    expect(notify.prWaitEntered).not.toHaveBeenCalled();
  });

  test('a throwing notifier never breaks a queue transition', async () => {
    const notify = {
      attemptStarted: vi.fn(() => {
        throw new Error('notifier exploded');
      }),
      attemptFailed: vi.fn(),
      prWaitEntered: vi.fn(() => {
        throw new Error('notifier exploded');
      })
    };
    const env = setup({ config: { S1: {} }, slots: 1, notify });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('S1')).toBe(true);

    env.runner.finish('S1', { success: true, reason: 'ok', exit: 0 });
    await flush();
    await flush();

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('done');
  });
});

describe('scheduler token usage (UI-raqh §1)', () => {
  test('persists the tallied usage onto the attempt when the session ends', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    env.runner.eventsFor('A1').emit('event', {
      kind: 'text',
      usage: { message_id: 'm1', input_tokens: 10, output_tokens: 4 }
    });

    env.runner.finish('A1', { success: true });
    await flush();
    await flush();

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt.usage).toMatchObject({ input_tokens: 10, output_tokens: 4 });
  });

  test('lets the result total replace the per-message tally', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    const events = env.runner.eventsFor('A1');
    events.emit('event', {
      kind: 'text',
      usage: { message_id: 'm1', input_tokens: 10, output_tokens: 4 }
    });
    events.emit('event', {
      kind: 'result',
      usage: { input_tokens: 18, output_tokens: 1113, total_cost_usd: 0.035 }
    });

    env.runner.finish('A1', { success: true });
    await flush();
    await flush();

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt.usage).toMatchObject({
      input_tokens: 18,
      output_tokens: 1113,
      total_cost_usd: 0.035
    });
  });

  test('leaves usage null when the runner reported none', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);

    env.runner.finish('A1', { success: true });
    await flush();
    await flush();

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt.usage).toBe(null);
  });

  test('persists usage when the attempt is paused', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    const events = env.runner.eventsFor('A1');
    events.emit('session_id', 'sid-1');
    events.emit('event', {
      kind: 'text',
      usage: { message_id: 'm1', input_tokens: 7, output_tokens: 2 }
    });
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.pause(WS, attempt_id);

    expect(env.store.snapshot(WS).attempts[attempt_id].usage).toMatchObject({
      input_tokens: 7,
      output_tokens: 2
    });
  });

  test('merges a burst of usage events into one throttled fanout', async () => {
    vi.useFakeTimers();
    try {
      const notifyQueueChanged = vi.fn();
      const env = setup({ config: { A1: {} }, notifyQueueChanged });
      seedQueue(env.store, ['A1']);
      await env.scheduler.tick(WS);
      const events = env.runner.eventsFor('A1');
      notifyQueueChanged.mockClear();

      for (let i = 0; i < 5; i += 1) {
        events.emit('event', {
          kind: 'text',
          usage: { message_id: `m${i}`, input_tokens: 1, output_tokens: 1 }
        });
      }
      expect(notifyQueueChanged).not.toHaveBeenCalled();
      vi.advanceTimersByTime(3000);

      expect(notifyQueueChanged).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  test('clears the pending usage fanout when the attempt ends', async () => {
    vi.useFakeTimers();
    try {
      const notifyQueueChanged = vi.fn();
      const env = setup({ config: { A1: {} }, notifyQueueChanged });
      seedQueue(env.store, ['A1']);
      await env.scheduler.tick(WS);
      env.runner.eventsFor('A1').emit('event', {
        kind: 'text',
        usage: { message_id: 'm1', input_tokens: 1, output_tokens: 1 }
      });

      env.runner.finish('A1', { success: true });
      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(0);
      const after_end = notifyQueueChanged.mock.calls.length;
      vi.advanceTimersByTime(3000);

      expect(notifyQueueChanged.mock.calls.length).toBe(after_end);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('scheduler usage after a pause or a stop (UI-raqh §1)', () => {
  test('persists a trailing usage event that lands after the pause', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    const events = env.runner.eventsFor('A1');
    events.emit('session_id', 'sid-1');
    events.emit('event', {
      kind: 'text',
      usage: { message_id: 'm1', input_tokens: 7, output_tokens: 2 }
    });
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.pause(WS, attempt_id);

    // Buffered behind the SIGTERM: the process was still writing when we asked
    // it to stop.
    events.emit('event', {
      kind: 'result',
      usage: { input_tokens: 40, output_tokens: 11, total_cost_usd: 0.01 }
    });
    env.runner.finish('A1', { success: false, reason: 'killed' });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).attempts[attempt_id].usage).toMatchObject({
      input_tokens: 40,
      output_tokens: 11
    });
  });

  test('leaves no live tally behind after a paused attempt settles', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    const events = env.runner.eventsFor('A1');
    events.emit('session_id', 'sid-1');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.pause(WS, attempt_id);
    events.emit('event', {
      kind: 'text',
      usage: { message_id: 'm1', input_tokens: 5, output_tokens: 1 }
    });

    env.runner.finish('A1', { success: false, reason: 'killed' });
    await flush();
    await flush();

    expect(env.usage?.get(WS, attempt_id)).toBe(null);
  });

  test('keeps the paused status when the trailing usage is written', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    const events = env.runner.eventsFor('A1');
    events.emit('session_id', 'sid-1');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.pause(WS, attempt_id);
    events.emit('event', {
      kind: 'text',
      usage: { message_id: 'm1', input_tokens: 5, output_tokens: 1 }
    });

    env.runner.finish('A1', { success: false, reason: 'killed' });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('paused');
  });

  test('keeps a second running session usage fanout armed when one ends', async () => {
    vi.useFakeTimers();
    try {
      const notifyQueueChanged = vi.fn();
      const env = setup({
        config: { A1: {}, A2: {} },
        slots: 2,
        notifyQueueChanged
      });
      seedQueue(env.store, ['A1', 'A2']);
      await env.scheduler.tick(WS);
      env.runner.eventsFor('A2').emit('event', {
        kind: 'text',
        usage: { message_id: 'm1', input_tokens: 3, output_tokens: 1 }
      });
      notifyQueueChanged.mockClear();

      env.runner.finish('A1', { success: true });
      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(0);
      const after_end = notifyQueueChanged.mock.calls.length;
      vi.advanceTimersByTime(3000);

      expect(notifyQueueChanged.mock.calls.length).toBeGreaterThan(after_end);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('scheduler dispatch-time base resolution (worker-base-scope-alignment §1)', () => {
  test('cuts the worktree from the resolved base_oid, not the branch name', async () => {
    const { store, worktree, scheduler } = setup({
      config: { 'UI-1': { repo: '/repo', target_base: 'ilsun/dev' } },
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: async () => ({
        ok: true,
        base: 'ilsun/dev',
        declared: true,
        remote: 'origin',
        remote_ref: 'refs/remotes/origin/ilsun/dev',
        base_oid: 'a'.repeat(40),
        local_only: false
      })
    });
    seedQueue(store, ['UI-1']);

    await scheduler.tick(WS);

    expect(worktree.add).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'UI-1',
      base: 'a'.repeat(40)
    });
  });

  test('re-resolves the base at dispatch with force', async () => {
    /** @type {Array<{ force?: boolean }|undefined>} */
    const calls = [];
    const { store, scheduler } = setup({
      config: { 'UI-1': { repo: '/repo', target_base: 'main' } },
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: async (/** @type {any} */ options) => {
        calls.push(options);
        return {
          ok: true,
          base: 'main',
          declared: false,
          remote: 'origin',
          remote_ref: 'refs/remotes/origin/main',
          base_oid: 'b'.repeat(40),
          local_only: false
        };
      }
    });
    seedQueue(store, ['UI-1']);

    await scheduler.tick(WS);

    expect(calls).toContainEqual({ force: true });
  });

  test('refuses the dispatch with the failing step and touches no worktree', async () => {
    const { store, worktree, scheduler } = setup({
      config: { 'UI-1': { repo: '/repo', target_base: 'ilsun/dv' } },
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: async () => ({
        ok: false,
        step: 'ref',
        base: 'ilsun/dv',
        detail: 'refs/remotes/origin/ilsun/dv'
      })
    });
    seedQueue(store, ['UI-1']);

    await scheduler.tick(WS);

    expect(store.snapshot(WS).admission['UI-1'].reason).toBe(
      'base_unresolved:ref'
    );
    expect(worktree.add).not.toHaveBeenCalled();
    expect(worktree.removeIfDiscardable).not.toHaveBeenCalled();
  });

  test('refuses when the resolver throws instead of dispatching on a fallback', async () => {
    const { store, worktree, scheduler } = setup({
      config: { 'UI-1': { repo: '/repo', target_base: 'main' } },
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: async () => {
        throw new Error('git gone');
      }
    });
    seedQueue(store, ['UI-1']);

    await scheduler.tick(WS);

    expect(store.snapshot(WS).admission['UI-1'].reason).toBe(
      'base_unresolved:git_error'
    );
    expect(worktree.add).not.toHaveBeenCalled();
  });
});

describe('scheduler→runner base wiring (worker-base-scope-alignment §3)', () => {
  test('the settings a real dispatch spawns with carry repo, target_base and base_oid', async () => {
    const { store, runner, scheduler } = setup({
      config: { 'UI-1': { repo: '/repo', target_base: 'ilsun/dev' } },
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: async () => ({
        ok: true,
        base: 'ilsun/dev',
        declared: true,
        remote: 'origin',
        remote_ref: 'refs/remotes/origin/ilsun/dev',
        base_oid: 'a'.repeat(40),
        local_only: false
      })
    });
    seedQueue(store, ['UI-1']);

    await scheduler.tick(WS);

    // `base_oid` is what the worktree actually resolved after the cut — the
    // attempt's own pin, which the admission re-check is also taken against.
    expect(runner.settingsFor('UI-1')).toMatchObject({
      repo: '/repo',
      target_base: 'ilsun/dev',
      base_oid: 'base-UI-1'
    });
  });

  test('a resume launch carries the same three fields', async () => {
    const { store, runner, scheduler } = setup({
      config: { 'UI-1': { repo: '/repo', target_base: 'main' } },
      admission: { validate: async () => ({ ok: true }) }
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'a1', bead_id: 'UI-1' }
    });
    store.updateAttempt(WS, {
      attempt_id: 'a1',
      patch: {
        repo: '/repo',
        target_base: 'ilsun/dev',
        base_oid: 'b'.repeat(40),
        session_id: 'sess-1',
        status: 'failed',
        cause: 'blocked',
        finished_at: 10
      }
    });

    await scheduler.resume(WS, 'a1');

    expect(runner.settingsFor('UI-1')).toMatchObject({
      repo: '/repo',
      target_base: 'ilsun/dev',
      base_oid: 'b'.repeat(40)
    });
  });
});

describe('guard hook wiring — prevention layer (UI-8mvc §2)', () => {
  /** @type {string | undefined} */
  let saved_count;

  beforeEach(() => {
    // The append rule is asserted explicitly below; every OTHER case wants a
    // deterministic index 0, so the ambient value is cleared here.
    saved_count = process.env.GIT_CONFIG_COUNT;
    delete process.env.GIT_CONFIG_COUNT;
  });

  afterEach(() => {
    if (saved_count === undefined) {
      delete process.env.GIT_CONFIG_COUNT;
    } else {
      process.env.GIT_CONFIG_COUNT = saved_count;
    }
  });

  /**
   * Whether an attempt's executable hook is on disk.
   *
   * @param {string} attempt_id
   * @returns {boolean}
   */
  function hookInstalled(attempt_id) {
    return fs.existsSync(path.join(guardHookDir(WS, attempt_id), 'pre-push'));
  }

  /**
   * A guardHook double whose install always fails, for the refusal path.
   *
   * @param {string} reason
   */
  function failingGuardHook(reason) {
    return {
      install: vi.fn(() => ({ ok: false, reason })),
      envFor: vi.fn(() => ({})),
      remove: vi.fn(() => true)
    };
  }

  test('delivers the three GIT_CONFIG keys to the spawned session', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.runner.settingsFor('S1').env).toEqual({
      GIT_CONFIG_COUNT: '1',
      GIT_CONFIG_KEY_0: 'core.hooksPath',
      GIT_CONFIG_VALUE_0: guardHookDir(WS, 'S1-1000-1')
    });
    expect(hookInstalled('S1-1000-1')).toBe(true);
  });

  test('the delivered keys reach the real spawn env', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'result',
          subtype: 'success',
          is_error: false,
          permission_denials: []
        })
      ],
      exit: 0
    });
    const env = setup({
      config: { S1: {} },
      slots: 1,
      makeRunner: (/** @type {string} */ name) =>
        createRunner(name, { spawn_impl })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const spawned = spawn_impl.captured.calls[0].options.env;
    expect(spawned.GIT_CONFIG_COUNT).toBe('1');
    expect(spawned.GIT_CONFIG_KEY_0).toBe('core.hooksPath');
    expect(spawned.GIT_CONFIG_VALUE_0).toBe(guardHookDir(WS, 'S1-1000-1'));
    await flush();
  });

  test('appends to an inherited GIT_CONFIG_COUNT instead of overwriting it', async () => {
    process.env.GIT_CONFIG_COUNT = '2';
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    // Writing COUNT=1 over an inherited COUNT=2 would drop the parent's
    // KEY_1/VALUE_1 pair.
    expect(env.runner.settingsFor('S1').env).toEqual({
      GIT_CONFIG_COUNT: '3',
      GIT_CONFIG_KEY_2: 'core.hooksPath',
      GIT_CONFIG_VALUE_2: guardHookDir(WS, 'S1-1000-1')
    });
  });

  test('installs and delivers on a manual resume', async () => {
    const env = setup({ config: {}, slots: 1 });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'anc', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'anc',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        target_base: 'ilsun/dev',
        session_id: 'sid-abc',
        workflow_mode_prior: null
      }
    });

    const res = await env.scheduler.resume(WS, 'anc');

    expect(res.ok).toBe(true);
    expect(hookInstalled(String(res.attempt_id))).toBe(true);
    expect(env.runner.settingsFor('B1').env.GIT_CONFIG_VALUE_0).toBe(
      guardHookDir(WS, String(res.attempt_id))
    );
  });

  test('installs and delivers on an external-conflict dispatch', async () => {
    const env = setup({
      config: { X1: { repo: '/repo', status: 'resolved' } },
      slots: 1,
      externalPrs: { X1: { bead_id: 'X1', pr_url: 'u' } }
    });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res.ok).toBe(true);
    expect(hookInstalled(String(res.attempt_id))).toBe(true);
    expect(env.runner.settingsFor('X1').env.GIT_CONFIG_VALUE_0).toBe(
      guardHookDir(WS, String(res.attempt_id))
    );
  });

  test('installs NOTHING for a disposition attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'p1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'p1',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-park',
        workflow_mode_prior: null
      }
    });

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    // Publishing the resolved base IS this session's job.
    expect(res.ok).toBe(true);
    expect(hookInstalled(String(res.attempt_id))).toBe(false);
    expect(env.runner.settingsFor('B1').env).toBe(undefined);
  });

  test('refuses the dispatch with guard_hook_install_failed and leaves zero residue', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      guardHook: failingGuardHook('guard_hook_mkdir_failed')
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'guard_hook_install_failed'
    );
    // Nothing downstream of the install point ever ran.
    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();
    expect(env.worktree.add).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).attempts).toEqual({});
    expect(env.bd.calls.filter((c) => c.method !== 'snapshotBead')).toEqual([]);
    expect(env.scheduler.isRunning('S1')).toBe(false);
  });

  test('a PARTIAL install failure refuses and leaves no hook dir behind', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    // Only the HOOK write fails — the queue store shares this module.
    const real_write = fs.writeFileSync;
    const spy = vi
      .spyOn(fs, 'writeFileSync')
      .mockImplementation((file, data, options) => {
        if (
          String(file).endsWith(
            path.join('guard-hooks', 'S1-1000-1', 'pre-push')
          )
        ) {
          throw new Error('ENOSPC');
        }
        return real_write(file, data, options);
      });

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'guard_hook_install_failed'
    );
    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
    expect(env.store.snapshot(WS).attempts).toEqual({});
    expect(env.worktree.add).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  test('refuses the resume with guard_hook_install_failed before spending the ancestor', async () => {
    const env = setup({
      config: {},
      slots: 1,
      guardHook: failingGuardHook('guard_hook_mkdir_failed')
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'anc', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'anc',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-abc',
        workflow_mode_prior: null
      }
    });

    const res = await env.scheduler.resume(WS, 'anc');

    expect(res).toEqual({ ok: false, reason: 'guard_hook_install_failed' });
    // No child attempt was minted, so the ancestor is still resumable.
    expect(Object.keys(env.store.snapshot(WS).attempts)).toEqual(['anc']);
    expect(env.scheduler.isRunning('B1')).toBe(false);
  });

  for (const early of [
    {
      name: 'the worktree pre-flight refuses (worktree_stale_work)',
      arrange: (/** @type {any} */ env) => {
        env.worktree.removeIfDiscardable = vi.fn(async () => ({
          ok: false,
          removed: false,
          reason: 'dirty'
        }));
      }
    },
    {
      name: 'the worktree pre-flight throws (git_error)',
      arrange: (/** @type {any} */ env) => {
        env.worktree.removeIfDiscardable = vi.fn(async () => {
          throw new Error('git exploded');
        });
      }
    },
    {
      name: 'worktree.add fails (worktree_add_failed)',
      arrange: (/** @type {any} */ env) => {
        env.worktree.add = vi.fn(async () => {
          throw new Error('add failed');
        });
      }
    }
  ]) {
    test(`removes the hook when ${early.name}`, async () => {
      const env = setup({ config: { S1: {} }, slots: 1 });
      early.arrange(env);
      seedQueue(env.store, ['S1']);

      await env.scheduler.tick(WS);

      expect(env.scheduler.isRunning('S1')).toBe(false);
      expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
    });
  }

  test('removes the hook when the admission re-check refuses', async () => {
    let nth = 0;
    const env = setup({
      config: { S1: {} },
      slots: 1,
      admission: {
        validate: async () => {
          nth += 1;
          // Pass the scan, refuse the dispatch-time re-check.
          return nth === 1 ? { ok: true } : { ok: false, reason: 'no_spec' };
        }
      }
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
  });

  test('removes the hook when the workflow_mode record fails', async () => {
    const env = setup({ config: { S1: { throwOnSet: true } }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const a = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts)[0]
    );
    expect(a.cause).toBe('workflow_mode_record_failed');
    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
  });

  test('removes the hook when an exec stamp fails', async () => {
    const env = setup({
      config: { S1: { model: null, throwOnSetKey: 'orchestration_model' } },
      slots: 1
    });
    seedExecDefaults(env.store, { orchestration_model: 'opus' });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const a = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts)[0]
    );
    expect(a.cause).toBe('exec_stamp_failed');
    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
  });

  test('removes the hook when the spawn throws', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      makeRunner: () => ({
        name: 'claude',
        spawn() {
          throw new Error('spawn failed');
        }
      })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const a = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts)[0]
    );
    expect(a.cause).toBe('spawn_failed');
    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
  });

  test('removes the hook when the session terminates normally', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(hookInstalled('S1-1000-1')).toBe(true);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
  });

  test('removes the hook when the session fails', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: false, reason: 'exit_1' });
    await flush();
    await flush();

    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
  });

  test('removes the hook of a restart-surviving attempt disposed by reconcile', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      probePid: () => ({ alive: false, started_at: null }),
      verifyOk: false
    });
    // A hook left by the PREVIOUS server process, whose attempt this one only
    // ever sees as a durable `running` record.
    const installed = installGuardHookForTest('att-dead');
    expect(installed).toBe(true);
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-dead', bead_id: 'UI-9' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-dead',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        workflow_mode_prior: null
      }
    });

    await env.scheduler.reconcile(WS);

    expect(fs.existsSync(guardHookDir(WS, 'att-dead'))).toBe(false);
  });
});

/**
 * Install a real hook for an attempt id the scheduler did not mint — the
 * restart cases need one on disk before the scheduler ever sees the record.
 *
 * @param {string} attempt_id
 * @returns {boolean}
 */
function installGuardHookForTest(attempt_id) {
  return guardHookInstall({
    workspace: WS,
    attempt_id,
    repo: '/repo',
    target_base: 'main'
  }).ok;
}

describe('worker/scheduler post-hoc base invariant (UI-8mvc §3, UI-1xcd §4)', () => {
  const MOVED = 'b'.repeat(40);
  const LANDED = 'c'.repeat(40);
  const FOREIGN = 'e'.repeat(40);
  const BRANCH_HEAD = 'f'.repeat(40);

  /**
   * The forced base re-resolution seam, answering with a tip that is NOT the
   * `base-<bead>` oid the worktree fake pins at dispatch — i.e. a base that
   * moved while the session ran.
   *
   * @param {string} [tip]
   */
  function movedBase(tip = MOVED) {
    return vi.fn(async () => ({
      ok: /** @type {const} */ (true),
      base: 'main',
      declared: false,
      remote: 'origin',
      remote_ref: 'refs/remotes/origin/main',
      base_oid: tip,
      local_only: false
    }));
  }

  /**
   * The `git` runner the detection layer now spends on ONE question —
   * "is this recorded push reachable from the observed tip?" — plus the
   * `rev-parse` `launchSession` reads the attempt's starting branch tip with.
   *
   * @param {{ reachable?: string[], ancestor_code?: number, head?: string|null }} [posture]
   */
  function gitFor(posture = {}) {
    const reachable = posture.reachable ?? [];
    const head = posture.head === undefined ? BRANCH_HEAD : posture.head;
    return vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'rev-parse') {
        return head === null
          ? { code: 128, stdout: '', stderr: 'unknown revision' }
          : { code: 0, stdout: `${head}\n`, stderr: '' };
      }
      if (args[0] === 'merge-base') {
        if (posture.ancestor_code !== undefined) {
          return { code: posture.ancestor_code, stdout: '', stderr: 'boom' };
        }
        return {
          code: reachable.includes(args[2]) ? 0 : 1,
          stdout: '',
          stderr: ''
        };
      }
      throw new Error(`unexpected git command: ${args.join(' ')}`);
    });
  }

  /**
   * A `guardHook` override whose push record is driven per attempt id. Every
   * unnamed attempt gets an INITIALIZED-but-empty log, which is what a
   * post-deployment attempt that pushed nothing actually has.
   *
   * @param {Record<string, Record<string, unknown>[]|null>} [by_attempt] - null
   * marks an attempt whose log is ABSENT (dispatched before the record existed).
   */
  function guardHookWith(by_attempt = {}) {
    return {
      install: () => ({ ok: true, dir: '/dir', hook_path: '/dir/pre-push' }),
      envFor: () => ({}),
      remove: () => true,
      readPushLog: vi.fn(
        (/** @type {{ attempt_id: string }} */ { attempt_id }) => {
          const entries = by_attempt[attempt_id];
          return entries === null
            ? { ok: /** @type {const} */ (false), reason: 'absent' }
            : { ok: /** @type {const} */ (true), entries: entries ?? [] };
        }
      )
    };
  }

  /**
   * One base-destined push line as the hook records it.
   *
   * @param {string} local_oid
   */
  function pushedToBase(local_oid) {
    return {
      local_ref: 'HEAD',
      local_oid,
      remote_ref: 'refs/heads/main',
      remote_oid: 'base-S1'
    };
  }

  test('fails the attempt when its recorded base push is on the moved base', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook: guardHookWith({ 'S1-1000-1': [pushedToBase(LANDED)] })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    const attempt = q.attempts['S1-1000-1'];
    expect(attempt.status).toBe('failed');
    expect(attempt.cause).toBe('base_landing_detected');
    expect(attempt.cause_detail).toEqual({
      reason: 'base_landing_detected',
      command: null
    });
    expect(attempt.base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [LANDED],
      shas: [LANDED]
    });
    // The queue stops and the PR verdict is never reached: a landing is not
    // laundered into a success by an open PR.
    expect(q.auto_advance).toBe(false);
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  // Regression 1 (2026-08-03, ×2 pairs) and regression 4 (the mixed state):
  // the base moved, the attempt pushed nothing at it, and the old inference
  // called that a landing.
  test('completes normally when the attempt pushed nothing at the base', async () => {
    const gitRun = gitFor({ reachable: [FOREIGN] });
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun,
      guardHook: guardHookWith({
        'S1-1000-1': [
          {
            local_ref: 'HEAD',
            local_oid: LANDED,
            remote_ref: 'refs/heads/S1',
            remote_oid: '0'.repeat(40)
          }
        ]
      })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts['S1-1000-1'].base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: false,
      pushed: []
    });
    expect(q.attempts['S1-1000-1'].status).toBe('done');
    expect(q.pr_wait.map((e) => e.bead_id)).toEqual(['S1']);
  });

  // The migration boundary: an attempt dispatched before the hook wrote a log
  // is UNOBSERVABLE, and must not quietly read as innocent.
  test('records push_log_absent for a pre-deployment attempt', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor(),
      guardHook: guardHookWith({ 'S1-1000-1': null })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts['S1-1000-1'].base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      error: 'push_log_absent'
    });
    // Unobservable is not guilty: the attempt still finishes.
    expect(q.attempts['S1-1000-1'].status).toBe('done');
  });

  test('observes the base of a session that ended in failure', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook: guardHookWith({ 'S1-1000-1': [pushedToBase(LANDED)] })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    // A SIGTERMed session may have pushed before it died: the landing is the
    // honest cause, not the runner's own exit reason.
    env.runner.finish('S1', { success: false, reason: 'exit_1' });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).attempts['S1-1000-1'].cause).toBe(
      'base_landing_detected'
    );
  });

  test('observes the base after a user stop and fails the attempt on a landing', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook: guardHookWith({ 'S1-1000-1': [pushedToBase(LANDED)] })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    await env.scheduler.stop(WS, 'S1-1000-1');
    env.runner.finish('S1', { success: false, reason: 'killed' });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts['S1-1000-1'].base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [LANDED],
      shas: [LANDED]
    });
    expect(q.attempts['S1-1000-1'].cause).toBe('base_landing_detected');
    expect(q.auto_advance).toBe(false);
  });

  test('leaves a stopped attempt stopped when the base did not move', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase('base-S1'),
      gitRun: gitFor(),
      guardHook: guardHookWith()
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    await env.scheduler.stop(WS, 'S1-1000-1');
    env.runner.finish('S1', { success: false, reason: 'killed' });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts['S1-1000-1'].status).toBe('stopped');
    expect(q.attempts['S1-1000-1'].base_drift).toBeNull();
  });

  test('observes the base of a restart-restored paused attempt discarded by ■', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook: guardHookWith({ 'att-paused': [pushedToBase(LANDED)] })
    });
    // A `paused` record whose server restarted: it is not `running`, so
    // reconcile never disposes of it, and its `onSessionDone` died with the
    // previous process — this discard is its only observer.
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-paused', bead_id: 'UI-7' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-paused',
      patch: {
        status: 'paused',
        pid: null,
        repo: '/repo',
        base_oid: 'base-S1',
        workflow_mode_prior: null
      }
    });

    const discarded = await env.scheduler.stop(WS, 'att-paused');

    expect(discarded).toBe(true);
    const attempt = env.store.snapshot(WS).attempts['att-paused'];
    expect(attempt.cause).toBe('base_landing_detected');
    expect(attempt.base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [LANDED],
      shas: [LANDED]
    });
    expect(env.store.snapshot(WS).auto_advance).toBe(false);
  });

  // The ⏸ of a LIVE session parks its `done` promise, and that promise's
  // `onSessionDone` is the observer. Removing the hook at discard time deleted
  // the record before it ran (implementation review 2026-08-04).
  test('leaves the hook alone when a parked `done` still owes the settlement', async () => {
    /** @type {string[]} */
    const removed = [];
    const base = guardHookWith();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase('base-S1'),
      gitRun: gitFor(),
      guardHook: {
        ...base,
        remove: (/** @type {any} */ i) => {
          removed.push(i.attempt_id);
          return true;
        }
      }
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    await env.scheduler.pause(WS, 'S1-1000-1');

    await env.scheduler.stop(WS, 'S1-1000-1');

    // Nothing removed yet: the parked `done` settles first and removes it in
    // its own `finally`.
    expect(removed).not.toContain('S1-1000-1');
    env.runner.finish('S1', { success: false, reason: 'killed' });
    await flush();
    await flush();
    expect(removed).toContain('S1-1000-1');
  });

  test('discards a restart-restored paused attempt normally when nothing landed', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase('base-S1'),
      gitRun: gitFor(),
      guardHook: guardHookWith()
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-paused', bead_id: 'UI-7' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-paused',
      patch: {
        status: 'paused',
        pid: null,
        repo: '/repo',
        base_oid: 'base-S1',
        workflow_mode_prior: null
      }
    });

    await env.scheduler.stop(WS, 'att-paused');

    const attempt = env.store.snapshot(WS).attempts['att-paused'];
    expect(attempt.status).toBe('stopped');
    expect(attempt.base_drift).toBeNull();
  });

  test('observes the base of a restart-surviving attempt disposed by reconcile', async () => {
    const guardHook = guardHookWith({ 'att-dead': [pushedToBase(LANDED)] });
    const env = setup({
      config: { S1: {} },
      slots: 1,
      probePid: () => ({ alive: false, started_at: null }),
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-dead', bead_id: 'UI-9' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-dead',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        base_oid: 'base-S1',
        workflow_mode_prior: null
      }
    });

    await env.scheduler.reconcile(WS);

    const attempt = env.store.snapshot(WS).attempts['att-dead'];
    expect(attempt.cause).toBe('base_landing_detected');
    expect(attempt.base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [LANDED],
      shas: [LANDED]
    });
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  // UI-1xcd §4: the hook assets carry the record the settlement reads, so the
  // dead-attempt disposal must not delete them before it has read them.
  test('reads the dead attempt push record BEFORE removing its hook', async () => {
    /** @type {string[]} */
    const order = [];
    const base = guardHookWith({ 'att-dead': [pushedToBase(LANDED)] });
    const guardHook = {
      ...base,
      readPushLog: (/** @type {any} */ i) => {
        order.push('read');
        return base.readPushLog(i);
      },
      remove: () => {
        order.push('remove');
        return true;
      }
    };
    const env = setup({
      config: { S1: {} },
      slots: 1,
      probePid: () => ({ alive: false, started_at: null }),
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-dead', bead_id: 'UI-9' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-dead',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        base_oid: 'base-S1',
        workflow_mode_prior: null
      }
    });

    await env.scheduler.reconcile(WS);

    expect(order).toEqual(['read', 'remove']);
    expect(env.store.snapshot(WS).attempts['att-dead'].cause).toBe(
      'base_landing_detected'
    );
  });

  // A restart-restored `paused` ancestor reaches no other observer: removing
  // its hook at relaunch used to delete its push record unread, so a real
  // landing simply disappeared (implementation review 2026-08-04).
  test('settles the ancestor before a resume removes its hook, and refuses on a landing', async () => {
    /** @type {string[]} */
    const order = [];
    const base = guardHookWith({ 'att-paused': [pushedToBase(LANDED)] });
    const guardHook = {
      ...base,
      readPushLog: (/** @type {any} */ i) => {
        order.push(`read:${i.attempt_id}`);
        return base.readPushLog(i);
      },
      remove: (/** @type {any} */ i) => {
        order.push(`remove:${i.attempt_id}`);
        return true;
      }
    };
    const env = setup({
      config: { 'UI-7': {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-paused', bead_id: 'UI-7' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-paused',
      patch: {
        status: 'paused',
        pid: null,
        repo: '/repo',
        base_oid: 'base-S1',
        session_id: 'sid-1',
        workflow_mode_prior: null
      }
    });

    const res = await env.scheduler.resume(WS, 'att-paused');

    expect(res.ok).toBe(false);
    expect(res.reason).toBe('base_landing_detected');
    expect(order[0]).toBe('read:att-paused');
    expect(env.store.snapshot(WS).attempts['att-paused'].base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [LANDED],
      shas: [LANDED]
    });
  });

  test('does not re-observe an ancestor that already carries a base_drift', async () => {
    const guardHook = guardHookWith();
    const env = setup({
      config: { 'UI-7': {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor(),
      guardHook
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-paused', bead_id: 'UI-7' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-paused',
      patch: {
        status: 'paused',
        pid: null,
        repo: '/repo',
        base_oid: 'base-S1',
        session_id: 'sid-1',
        workflow_mode_prior: null,
        // Already settled by its own termination path; re-observing a hook that
        // is gone would overwrite this with `push_log_absent`.
        base_drift: { pinned: 'base-S1', observed: MOVED, landed: false }
      }
    });

    await env.scheduler.resume(WS, 'att-paused');

    expect(guardHook.readPushLog).not.toHaveBeenCalledWith(
      expect.objectContaining({ attempt_id: 'att-paused' })
    );
    expect(env.store.snapshot(WS).attempts['att-paused'].base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: false
    });
  });

  test('records the exclusion of an attempt dispatched without a pinned base', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      probePid: () => ({ alive: false, started_at: null }),
      resolveBase: movedBase(),
      gitRun: gitFor(),
      guardHook: guardHookWith()
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-ext', bead_id: 'UI-9' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-ext',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        base_oid: null,
        external_conflict: true,
        workflow_mode_prior: null
      }
    });

    await env.scheduler.reconcile(WS);

    const attempt = env.store.snapshot(WS).attempts['att-ext'];
    expect(attempt.base_drift).toEqual({ skipped: 'no_base_oid' });
    expect(attempt.cause).toBeNull();
  });

  test('records the exclusion of a disposition attempt before its own verdict', async () => {
    const guardHook = guardHookWith();
    const env = setup({
      config: {},
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor(),
      guardHook,
      disposition: { complete: vi.fn(async () => ({ ok: true })) }
    });
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'p1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'p1',
      patch: {
        status: 'failed',
        cause: 'verify_failed:pr_missing',
        spec_review_stale: true,
        repo: '/repo',
        target_base: 'main',
        base_oid: 'base-B1',
        runner: 'claude',
        session_id: 'sid-park',
        workflow_mode_prior: null
      }
    });

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });
    env.runner.finish('B1', { success: true });
    await flush();
    await flush();

    const child =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(child.base_drift).toEqual({ skipped: 'disposition' });
    // The disposition CHILD is excluded before anything is consulted; the
    // ancestor `p1` is settled on its way out, which is a different attempt.
    expect(guardHook.readPushLog).not.toHaveBeenCalledWith(
      expect.objectContaining({ attempt_id: res.attempt_id })
    );
  });

  test('records an unanswerable reachability query without failing the attempt', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor({ ancestor_code: 128 }),
      guardHook: guardHookWith({ 'S1-1000-1': [pushedToBase(LANDED)] })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts['S1-1000-1'].base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      pushed: [LANDED],
      error: 'reachability:merge_base'
    });
    // Observation failure is evidence, not a verdict: the attempt finishes.
    expect(q.attempts['S1-1000-1'].status).toBe('done');
    expect(q.pr_wait.map((e) => e.bead_id)).toEqual(['S1']);
  });
});

describe('scheduler captures the attempt starting point (UI-1xcd §4.2)', () => {
  const BRANCH_HEAD = 'f'.repeat(40);

  test('reads the branch tip BEFORE the spawn, not the base_oid copy', async () => {
    // The order is the seam: read after the spawn and the child may already
    // have committed, so whatever is measured is a race.
    /** @type {string[]} */
    const order = [];
    const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'rev-parse') {
        order.push(`rev-parse:${args[1]}`);
        return { code: 0, stdout: `${BRANCH_HEAD}\n`, stderr: '' };
      }
      return { code: 1, stdout: '', stderr: '' };
    });
    const runner = makeFakeRunner();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      gitRun,
      makeRunner: () => ({
        spawn: (
          /** @type {any} */ bead,
          /** @type {string} */ cwd,
          /** @type {any} */ settings
        ) => {
          order.push('spawn');
          return runner.factory('claude').spawn(bead, cwd, settings);
        }
      })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const attempt = env.store.snapshot(WS).attempts['S1-1000-1'];
    expect(attempt.head_oid).toBe(BRANCH_HEAD);
    expect(attempt.head_oid).not.toBe(attempt.base_oid);
    expect(order).toEqual(['rev-parse:refs/heads/S1', 'spawn']);
  });

  test('leaves the field absent rather than falling back to base_oid', async () => {
    const gitRun = vi.fn(async () => ({
      code: 128,
      stdout: '',
      stderr: 'unknown revision'
    }));
    const env = setup({ config: { S1: {} }, slots: 1, gitRun });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const attempt = env.store.snapshot(WS).attempts['S1-1000-1'];
    expect(attempt.head_oid).toBe(null);
    expect(attempt.base_oid).toBe('base-S1');
  });

  test('leaves the field absent when no git runner is wired at all', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).attempts['S1-1000-1'].head_oid).toBe(null);
  });
});

describe('scheduler records surviving guard warnings (UI-1xcd §1)', () => {
  test('appends a warning event to the attempt record', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);

    env.runner.eventsFor('A1').emit('event', {
      kind: 'error',
      reason: 'base_merge_blocked',
      guard_warning: {
        reason: 'base_merge_blocked',
        command: 'git merge origin/main --no-edit'
      }
    });

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    const warnings = attempt.guard_warnings || [];
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toMatchObject({
      reason: 'base_merge_blocked',
      command: 'git merge origin/main --no-edit'
    });
    expect(typeof warnings[0].at).toBe('number');
  });

  test('accumulates repeat warnings in order', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    const events = env.runner.eventsFor('A1');

    events.emit('event', {
      kind: 'error',
      guard_warning: { reason: 'base_merge_blocked', command: 'git merge a' }
    });
    events.emit('event', {
      kind: 'error',
      guard_warning: { reason: 'merge_to_base_blocked', command: 'git push b' }
    });

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect((attempt.guard_warnings || []).map((w) => w.command)).toEqual([
      'git merge a',
      'git push b'
    ]);
  });

  test('records the warning even when no usage store is wired', async () => {
    const env = setup({ config: { A1: {} }, usage: null });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);

    env.runner.eventsFor('A1').emit('event', {
      kind: 'error',
      guard_warning: { reason: 'base_merge_blocked', command: 'git merge a' }
    });

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt.guard_warnings).toHaveLength(1);
  });

  test('leaves guard_warnings null on an attempt that drew none', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);

    env.runner.eventsFor('A1').emit('event', { kind: 'text' });

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt.guard_warnings).toBe(null);
  });

  test('the warning survives a cold reload of the store', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    env.runner.eventsFor('A1').emit('event', {
      kind: 'error',
      guard_warning: { reason: 'base_merge_blocked', command: 'git merge a' }
    });

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    expect(
      createQueueStore().load(WS).attempts[attempt_id].guard_warnings
    ).toHaveLength(1);
  });
});

describe('scheduler prompt recording (UI-rxp3 §3)', () => {
  const STALE_RECEIPT_SHA = 'a'.repeat(40);
  const STALE_DELTA_SHA = 'b'.repeat(40);

  /**
   * A runner that spawns the REAL claude engine over a capturing fake spawn.
   * The point is that nothing here rebuilds a prompt: the argv the assertions
   * read and the record the scheduler writes both come from one `buildArgv`.
   *
   * `stdout` is a stream that never ends, so no `close` fires, `done` stays
   * pending and the attempt record is read exactly as the spawn left it.
   */
  function makeRecordingClaudeRunner() {
    /** @type {Array<{ args: string[] }>} */
    const calls = [];
    const spawn_impl = (
      /** @type {string} */ _command,
      /** @type {string[]} */ args
    ) => {
      calls.push({ args });
      const child = new EventEmitter();
      /** @type {any} */ (child).pid = 7777;
      /** @type {any} */ (child).kill = () => {};
      /** @type {any} */ (child).stdout = new PassThrough();
      return /** @type {any} */ (child);
    };
    const factory = () => ({
      name: 'claude',
      spawn: (
        /** @type {any} */ bead,
        /** @type {string} */ ws,
        /** @type {any} */ settings
      ) => runSession(claudeSpec(), bead, ws, settings, { spawn_impl })
    });
    return { factory, calls };
  }

  /**
   * @param {string[]} args
   * @returns {{ system_prompt: string, task_prompt: string }}
   */
  function sentPrompts(args) {
    const i = args.indexOf('--append-system-prompt');
    return {
      system_prompt: i >= 0 ? args[i + 1] : '',
      task_prompt: /** @type {string} */ (args.at(-1))
    };
  }

  /**
   * The newest attempt of a bead — the one the launch under test just minted.
   *
   * @param {any} store
   * @param {string} bead_id
   * @returns {any}
   */
  function latestAttempt(store, bead_id) {
    const attempts = Object.values(store.snapshot(WS).attempts).filter(
      (/** @type {any} */ a) => a.bead_id === bead_id
    );
    return attempts[attempts.length - 1];
  }

  /**
   * @param {any} store
   * @param {string} attempt_id
   * @param {Partial<import('./queue-store.js').Attempt>} patch
   */
  function seedAttempt(store, attempt_id, patch) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id, bead_id: /** @type {any} */ (patch).bead_id }
    });
    store.updateAttempt(WS, { attempt_id, patch });
  }

  /**
   * @param {Partial<import('./queue-store.js').Attempt>} [over]
   * @returns {Partial<import('./queue-store.js').Attempt>}
   */
  function priorAttempt(over = {}) {
    return {
      bead_id: 'B1',
      status: 'failed',
      repo: '/repo',
      target_base: 'main',
      base_oid: 'base-B1',
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      session_id: 'sid-abc',
      workflow_mode_prior: null,
      ...over
    };
  }

  test('records the first dispatch prompts exactly as spawned', async () => {
    const recorder = makeRecordingClaudeRunner();
    const env = setup({
      config: { B1: {} },
      slots: 1,
      makeRunner: recorder.factory
    });
    seedQueue(env.store, ['B1']);

    await env.scheduler.tick(WS);

    const sent = sentPrompts(recorder.calls[0].args);
    const attempt = latestAttempt(env.store, 'B1');
    expect(attempt.system_prompt).toBe(sent.system_prompt);
    expect(attempt.task_prompt).toBe(sent.task_prompt);
    expect(attempt.system_prompt).toContain('## 가드 계약');
  });

  test('records the stale-dispatch task prompt, not the default one', async () => {
    const recorder = makeRecordingClaudeRunner();
    const env = setup({
      config: { B1: { spec_review: `codex@${STALE_RECEIPT_SHA}` } },
      slots: 1,
      makeRunner: recorder.factory,
      admission: {
        validate: vi.fn(async () => ({
          ok: true,
          stale: {
            receipt_sha: STALE_RECEIPT_SHA,
            delta_shas: [STALE_DELTA_SHA]
          }
        }))
      }
    });
    seedQueue(env.store, ['B1']);

    await env.scheduler.tick(WS);

    const sent = sentPrompts(recorder.calls[0].args);
    const attempt = latestAttempt(env.store, 'B1');
    expect(attempt.task_prompt).toBe(sent.task_prompt);
    expect(attempt.task_prompt).toContain('stale spec_review 관측');
    expect(attempt.system_prompt).toBe(sent.system_prompt);
  });

  test('records the resume prompts on the child attempt', async () => {
    const recorder = makeRecordingClaudeRunner();
    const env = setup({
      config: {},
      slots: 1,
      makeRunner: recorder.factory
    });
    seedAttempt(env.store, 'r1', priorAttempt());

    const res = await env.scheduler.resume(WS, 'r1');

    expect(res.ok).toBe(true);
    const sent = sentPrompts(recorder.calls[0].args);
    const attempt =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(attempt.task_prompt).toBe(sent.task_prompt);
    expect(attempt.task_prompt).toContain('이전 무인 세션');
    expect(attempt.system_prompt).toBe(sent.system_prompt);
  });

  test('records the conflict-resolution prompts', async () => {
    const recorder = makeRecordingClaudeRunner();
    const env = setup({
      config: {},
      slots: 1,
      makeRunner: recorder.factory
    });
    seedAttempt(
      env.store,
      'd1',
      priorAttempt({ status: 'done', session_id: 'sid-orig', finished_at: 50 })
    );

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    expect(res.ok).toBe(true);
    const sent = sentPrompts(recorder.calls[0].args);
    const attempt =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(attempt.task_prompt).toBe(sent.task_prompt);
    expect(attempt.task_prompt).toContain('git merge origin/main');
    expect(attempt.system_prompt).toBe(sent.system_prompt);
  });

  test('records the disposition prompts and its own guard variant', async () => {
    const recorder = makeRecordingClaudeRunner();
    const env = setup({
      config: {},
      slots: 1,
      makeRunner: recorder.factory
    });
    seedAttempt(
      env.store,
      'p1',
      priorAttempt({ status: 'done', session_id: 'sid-park', finished_at: 50 })
    );

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(res.ok).toBe(true);
    const sent = sentPrompts(recorder.calls[0].args);
    const attempt =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(attempt.task_prompt).toBe(sent.task_prompt);
    expect(attempt.task_prompt).toBe('처분 프롬프트');
    expect(attempt.system_prompt).toBe(sent.system_prompt);
    // The disposition variant: no PR-submit directive, no base-push refusal.
    expect(attempt.system_prompt).not.toContain('PR 제출까지 수행하고');
    expect(attempt.system_prompt).toContain('REVISE 처분 세션');
  });

  test('leaves the fields null for a runner that exposes no prompts', async () => {
    const env = setup({ config: { B1: {} }, slots: 1 });
    seedQueue(env.store, ['B1']);

    await env.scheduler.tick(WS);

    const attempt = latestAttempt(env.store, 'B1');
    expect(attempt.system_prompt).toBeNull();
    expect(attempt.task_prompt).toBeNull();
  });
});

describe('scheduler runner resolution (worker-multi-provider-runner §C-2)', () => {
  /**
   * The external-conflict environment: the bead is an external row, blocked and
   * not ready, so only the click path can dispatch it.
   *
   * @param {Record<string, any>} bead
   */
  function extRunnerEnv(bead) {
    return setup({
      config: { X1: { repo: '/repo', ready: false, blocked: true, ...bead } },
      slots: 1,
      externalPrs: {
        X1: { bead_id: 'X1', pr_url: 'https://github.com/o/r/pull/9' }
      }
    });
  }

  /**
   * Persist one settled attempt of X1 the way a prior session left it.
   *
   * @param {any} store
   * @param {string} attempt_id
   * @param {Partial<import('./queue-store.js').Attempt>} patch
   */
  function seedSettledAttempt(store, attempt_id, patch) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id, bead_id: 'X1' }
    });
    store.updateAttempt(WS, {
      attempt_id,
      patch: { status: 'done', repo: '/repo', target_base: 'main', ...patch }
    });
  }

  test('dispatches a codex-model bead through the codex runner', async () => {
    const env = setup({ config: { S1: { model: 'sol' } }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.runner.factoryNames).toEqual(['codex']);
    await flush();
  });

  test('records the resolved runner on the attempt', async () => {
    const env = setup({ config: { S1: { model: 'sol' } }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const attempt = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts)[0]
    );
    expect(attempt.runner).toBe('codex');
    await flush();
  });

  test('continues an external conflict on the prior attempt runner', async () => {
    const env = extRunnerEnv({ model: 'opus' });
    seedSettledAttempt(env.store, 'prev-1', { runner: 'codex' });

    await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(env.runner.factoryNames).toEqual(['codex']);
    await flush();
  });

  test('resolves an external conflict from exec when no attempt precedes it', async () => {
    const env = extRunnerEnv({ model: 'sol' });

    await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(env.runner.factoryNames).toEqual(['codex']);
    await flush();
  });

  test('prefers the LAST prior attempt runner over an earlier one', async () => {
    const env = extRunnerEnv({ model: 'opus' });
    seedSettledAttempt(env.store, 'prev-1', { runner: 'codex' });
    seedSettledAttempt(env.store, 'prev-2', { runner: 'claude' });

    await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(env.runner.factoryNames).toEqual(['claude']);
    await flush();
  });

  // Impl review 2026-08-10 finding 2: the trio is inherited TOGETHER — a prior
  // codex attempt must never be relaunched with today's claude model.
  test('inherits the prior attempt model and effort with its runner', async () => {
    const env = extRunnerEnv({ model: 'opus', effort: 'low' });
    seedSettledAttempt(env.store, 'prev-1', {
      runner: 'codex',
      model: 'sol',
      effort: 'high'
    });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(env.runner.factoryNames).toEqual(['codex']);
    expect(env.runner.settingsFor('X1').model).toBe('sol');
    expect(env.runner.settingsFor('X1').effort).toBe('high');
    const a =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(a.model).toBe('sol');
    expect(a.effort).toBe('high');
    await flush();
  });

  test('leaves the model unset when the inherited prior attempt recorded none', async () => {
    const env = extRunnerEnv({ model: 'opus' });
    seedSettledAttempt(env.store, 'prev-1', { runner: 'codex' });

    await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(env.runner.settingsFor('X1').model).toBe(undefined);
    await flush();
  });

  test('inherits no current preset stamps when the prior attempt has none', async () => {
    const env = extRunnerEnv({ model: null, effort: null });
    seedSettledAttempt(env.store, 'prev-1', {
      runner: 'codex',
      model: 'sol',
      effort: 'high'
    });
    env.store.setExecDefault(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      key: 'orchestration_model',
      value: 'sonnet'
    });
    env.store.setExecDefault(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      key: 'spec_review_model',
      value: 'opus'
    });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    const a =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(a.exec_stamped_keys).toBe(null);
    expect(a.model).toBe('sol');
    await flush();
  });

  test('inherits the prior runner on a conflict relaunch', async () => {
    const env = setup({ config: { B1: {} }, slots: 1 });
    const rev = env.store.snapshot(WS).revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'd1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'd1',
      patch: {
        status: 'done',
        repo: '/repo',
        target_base: 'main',
        runner: 'codex',
        session_id: 'sid-orig',
        finished_at: 50
      }
    });

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    expect(res.ok).toBe(true);
    expect(env.runner.factoryNames).toEqual(['codex']);
    await flush();
  });

  // Characterization: a legacy attempt written before the runner field carried
  // a value still relaunches, and claude is the only honest guess for it.
  test('falls back to claude when the prior attempt recorded no runner', async () => {
    const env = setup({ config: { B1: {} }, slots: 1 });
    const rev = env.store.snapshot(WS).revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'd1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'd1',
      patch: {
        status: 'done',
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-orig',
        finished_at: 50
      }
    });

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    expect(res.ok).toBe(true);
    expect(env.runner.factoryNames).toEqual(['claude']);
    await flush();
  });
});
