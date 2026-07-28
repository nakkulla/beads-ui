import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createQueueStore } from './queue-store.js';
import { makeFixtureSpawn } from './runner/fixture-spawn.js';
import { createRunner } from './runner/index.js';
import { createScheduler } from './scheduler.js';
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
  const factory = (/** @type {string} */ runner_name) => ({
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
        /** @type {any} */ ({ handle, resolve: resolveDone, settings, bead })
      );
      spawnOrder.push(bead.id);
      return handle;
    }
  });
  return {
    factory,
    spawnOrder,
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
        review_model: c.review_model ?? undefined,
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
 * @param {{ config: Record<string, any>, slots?: number, verifyOk?: boolean, verify?: any, probePid?: (pid: number|null) => { alive: boolean, started_at: number|null }, makeRunner?: (name: string) => any, admission?: any, notify?: any, notifyQueueChanged?: (workspace: string) => void, usage?: null }} opts
 */
function setup(opts) {
  const store = createQueueStore();
  const runner = makeFakeRunner();
  const bd = makeFakeBd(opts.config);
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
  const sessionLog = { attach: vi.fn() };
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
    notify: opts.notify,
    probePid: opts.probePid,
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

    expect(env.runner.settingsFor('S1').env).toBe(undefined);
  });

  test('conflict_resolution defaults to false on a normal dispatch (§6 seam)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.runner.settingsFor('S1').conflict_resolution).toBe(false);
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
      review_model: 'opus',
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
      'review_model'
    ]);

    // Bead metadata was stamped with the three global-filled keys.
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'review_model')).toBe(true);
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
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'review_model')).toBe(
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
    // Bead pins review_model=opus; impl_model is unset (global fills it).
    const env = setup({
      config: {
        S1: {
          runner: 'claude',
          model: 'opus',
          effort: 'high',
          review_model: 'opus'
        }
      },
      slots: 1,
      verifyOk: true
    });
    seedExecDefaults(env.store, {
      review_model: 'codex',
      impl_model: 'haiku'
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const a = /** @type {any} */ (env.store.snapshot(WS).attempts[attempt_id]);
    // Only the global-filled impl_model is stamped; the bead-set review_model
    // is not (its value is the bead's own, not the global 'codex').
    expect(a.exec_stamped_keys).toEqual(['impl_model']);
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'impl_model')).toBe(true);
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'review_model')).toBe(false);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'impl_model')).toBe(true);
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'review_model')).toBe(
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
      review_model: 'opus',
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
      'orchestration_effort',
      'review_model'
    ]);

    // The one key that WAS stamped is cleaned up; workflow_mode reverted too.
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'orchestration_model')).toBe(
      true
    );
    expect(
      calledMeta(env.bd, 'S1', 'unsetMetadata', 'orchestration_model')
    ).toBe(true);
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
      review_model: 'opus',
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
    // … and it is unset in cleanup (the durable-stamped_keys fix; the old
    // confirmed-only cleanup would have leaked it), along with worker_runner.
    expect(
      calledMeta(env.bd, 'S1', 'unsetMetadata', 'orchestration_model')
    ).toBe(true);
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'review_model')).toBe(
      true
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
      review_model: 'opus',
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
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'review_model')).toBe(
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

  test('a legacy codex ancestor resumes onto claude', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'r2', resumablePrior({ runner: 'codex' }));
    const res = await env.scheduler.resume(WS, 'r2');
    expect(res.ok).toBe(true);
    // The child always runs claude, whatever the ancestor recorded.
    expect(env.store.snapshot(WS).attempts[String(res.attempt_id)].runner).toBe(
      'claude'
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

  test('passes conflict_resolution into the runner settings', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store);

    await env.scheduler.resolveConflict(WS, 'B1');

    expect(env.runner.settingsFor('B1').conflict_resolution).toBe(true);
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

  test('a normal dispatch never carries the resolution flag (fail-closed default)', async () => {
    const env = setup({
      config: { A1: { ready: true, repo: '/repo', target_base: 'main' } },
      slots: 1
    });
    seedQueue(env.store, ['A1']);

    await env.scheduler.tick(WS);
    await flush();

    expect(env.runner.settingsFor('A1').conflict_resolution).toBe(false);
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

  test('still kills the SAME resolution attempt for a push to the base', async () => {
    const { kill_impl } = await resolveAndRun('git push origin HEAD:main');

    expect(kill_impl).toHaveBeenCalledWith(-7100, 'SIGTERM');
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
  test('drops a closed bead from the queue instead of badging it', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'closed' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual([]);
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

  test('drops a bead that closed between the scan and the dispatch re-read', async () => {
    const env = setup({
      config: { S1: { notReadyAt: 2, status: 'closed' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual([]);
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
