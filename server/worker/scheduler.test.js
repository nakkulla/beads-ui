import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createBreaker } from './breaker.js';
import { createLockManager } from './locks.js';
import { createQueueStore } from './queue-store.js';
import { makeFixtureSpawn } from './runner/fixture-spawn.js';
import { createRunner } from './runner/index.js';
import { createScheduler } from './scheduler.js';
import { createTokenRegistry } from './session-tokens.js';

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
     * @param {Partial<{ success: boolean, reason: string, exit: number | null, blocked: boolean }>} v
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
  let snapshotCount = 0;
  return {
    calls,
    snapshotCounts: () => snapshotCount,
    /**
     * @param {string} bead_id
     * @returns {Promise<import('./scheduler.js').BeadSnapshot>}
     */
    async snapshotBead(bead_id) {
      snapshotCount += 1;
      const c = config[bead_id] || {};
      // `null` in config means the bead metadata key is ABSENT (undefined),
      // vs. omitted keys which fall back to a present default — this lets a
      // test model a bead that leaves model/effort unset so a global default
      // can fill (and stamp) it.
      return {
        ready: c.ready ?? true,
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
        merge_policy: c.merge_policy ?? null,
        drift_policy: c.drift_policy ?? null,
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
    }
  };
}

/**
 * @param {{ config: Record<string, any>, slots?: number, verifyOk?: boolean, breaker?: any, tokens?: any, locks?: any, makeRunner?: (name: string) => any, admission?: any, verifyCmd?: any, runVerifyCmd?: any, notifyQueueChanged?: (workspace: string) => void }} opts
 */
function setup(opts) {
  const store = createQueueStore();
  const runner = makeFakeRunner();
  const bd = makeFakeBd(opts.config);
  const breaker = opts.breaker || createBreaker();
  const tokens = opts.tokens || createTokenRegistry();
  const verify = {
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
    addDetached: vi.fn(async (/** @type {any} */ { name }) => ({
      path: `/wt-verify/${name}`
    })),
    removeDetached: vi.fn(async () => ({ code: 0 })),
    pathFor: (/** @type {string} */ _repo, /** @type {string} */ bead_id) =>
      `/wt/${bead_id}`,
    exists: vi.fn(() => true)
  };
  const sessionLog = { attach: vi.fn() };
  const scheduler = createScheduler({
    store,
    makeRunner: opts.makeRunner || runner.factory,
    bd,
    worktree,
    tokens,
    verify,
    breaker,
    sessionLog,
    admission: opts.admission,
    verifyCmd: opts.verifyCmd,
    runVerifyCmd: opts.runVerifyCmd,
    notifyQueueChanged: opts.notifyQueueChanged,
    parallel_slots: opts.slots ?? 2,
    now: () => 1000
  });
  return { store, runner, bd, breaker, tokens, verify, worktree, scheduler };
}

/**
 * @param {any} store
 * @param {string[]} serial
 * @param {string[]} parallel
 */
function seedQueue(store, serial, parallel) {
  let rev = store.snapshot(WS).revision;
  for (const id of serial) {
    rev = store.place(WS, {
      expected_revision: rev,
      bead_id: id,
      lane: 'serial'
    }).queue.revision;
  }
  for (const id of parallel) {
    rev = store.place(WS, {
      expected_revision: rev,
      bead_id: id,
      lane: 'parallel'
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

describe('scheduler slot policy', () => {
  test('runs Serial head 1 + N parallel slots (total ≤ 1+N)', async () => {
    const env = setup({
      config: {
        S1: {},
        S2: {},
        P1: {},
        P2: {},
        P3: {}
      },
      slots: 2
    });
    seedQueue(env.store, ['S1', 'S2'], ['P1', 'P2', 'P3']);
    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(3);
    const beads = env.scheduler.runningBeads().sort();
    expect(beads).toEqual(['P1', 'P2', 'S1']);
    // S2 (serial cap 1) and P3 (slots full) NOT started.
    expect(env.scheduler.isRunning('S2')).toBe(false);
    expect(env.scheduler.isRunning('P3')).toBe(false);
  });

  test('blocked serial head is skipped to the next runnable serial bead', async () => {
    const env = setup({
      config: {
        S1: { blocked: true },
        S2: { blocked: false }
      },
      slots: 2
    });
    seedQueue(env.store, ['S1', 'S2'], []);
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
  });
});

describe('scheduler stop (■ tile)', () => {
  test('stop group-kills the attempt, discards it, reverts workflow_mode, no breaker', async () => {
    const breaker = createBreaker();
    const env = setup({ config: { S1: {} }, slots: 1, breaker });
    seedQueue(env.store, ['S1'], []);
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
    expect(snap.serial.map((e) => e.bead_id)).toEqual([]);
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
    // A user stop does NOT trip the breaker.
    expect(breaker.isTripped('/repo')).toBe(false);
    // The token was revoked.
    expect(env.tokens.size()).toBe(0);
  });

  test('a late done() after stop does not re-fail or trip the breaker', async () => {
    const breaker = createBreaker();
    const env = setup({ config: { S1: {} }, slots: 1, breaker });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.stop(WS, attempt_id);
    // The killed session's done resolves late (failure verdict) — must be inert.
    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(breaker.isTripped('/repo')).toBe(false);
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('stopped');
  });

  test('stop returns false for an unknown attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    expect(await env.scheduler.stop(WS, 'nope')).toBe(false);
  });

  test('discard frees the slot and advances the queue (§2.2)', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2'], []);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.stop(WS, attempt_id);

    // The discarded bead is gone from the lane and never re-dispatched; the
    // next queued bead takes the freed slot in the same operation.
    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
    expect(env.store.snapshot(WS).serial.map((e) => e.bead_id)).toEqual(['S2']);
  });
});

describe('scheduler pause (⏸ tile, worker-phase1 §2.1)', () => {
  test('pause records `paused`, keeps the bead queued, and advances the queue', async () => {
    const breaker = createBreaker();
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1, breaker });
    seedQueue(env.store, ['S1', 'S2'], []);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    const kill = env.runner.killFor('S1');
    const paused_token = env.runner.settingsFor('S1').env.BDUI_WORKER_TOKEN;

    expect(await env.scheduler.pause(WS, attempt_id)).toEqual({ ok: true });

    expect(kill).toHaveBeenCalledWith('SIGTERM');
    const snap = env.store.snapshot(WS);
    expect(snap.attempts[attempt_id].status).toBe('paused');
    expect(snap.attempts[attempt_id].cause).toBe(null);
    // The bead stays queued (resume runs in the same worktree)...
    expect(snap.serial.map((e) => e.bead_id)).toEqual(['S1', 'S2']);
    // ...but is skipped by dispatch, so the freed slot goes to the next bead.
    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
    // A user pause is not a repo failure.
    expect(breaker.isTripped('/repo')).toBe(false);
    // The paused attempt's token was revoked; the one left belongs to S2, the
    // session the freed slot just started.
    expect(env.tokens.verify(paused_token)).toBe(null);
    expect(env.tokens.size()).toBe(1);
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
    seedQueue(env.store, ['S1'], []);
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
    seedQueue(env.store, ['S1'], []);
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
    seedQueue(env.store, ['S1'], []);
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
    expect(snap.serial.map((e) => e.bead_id)).toEqual(['S1']);
    expect(env.scheduler.isRunning('S1')).toBe(true);
  });

  test('a paused attempt can be discarded from its tile (§2.2)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, attempt_id);

    expect(await env.scheduler.stop(WS, attempt_id)).toBe(true);
    const snap = env.store.snapshot(WS);
    expect(snap.attempts[attempt_id].status).toBe('stopped');
    expect(snap.serial.map((e) => e.bead_id)).toEqual([]);
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
    seedQueue(env.store, ['S1'], []);
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
    seedQueue(env.store, [], ['P1', 'P2', 'P3']);
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
    seedQueue(env.store, ['S1'], []);
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
    const tokens = createTokenRegistry();
    const breaker = createBreaker();
    const locks = createLockManager({
      isMergeBlocked: (repo) => breaker.isTripped(repo)
    });
    const env = setup({
      config: { S1: {} },
      slots: 1,
      tokens,
      breaker,
      verifyOk: true
    });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);

    // The merge gate: a per-session token was issued and the session can
    // acquire the (repo, base) merge lock through it.
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    expect(tokens.size()).toBe(1);
    const release = await locks.acquireMerge('/repo', 'main');
    release();

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).toContain('S1');
    expect(snap.done.map((e) => e.bead_id)).not.toContain('S1');
    expect(snap.attempts[attempt_id].status).toBe('done');
    // Session token revoked after completion.
    expect(tokens.size()).toBe(0);
  });

  test('judges completion from the observation alone, never the merge axis', async () => {
    // A verify_cmd keeps the dispatch-resolved merge_policy at auto_merge and a
    // merge_sha is recorded — neither may reach the completion verdict.
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verifyOk: true,
      verifyCmd: () => ({ cmd: ['true'], timeout_ms: 1000 })
    });
    seedQueue(env.store, ['S1'], []);
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
    expect(snap.attempts[attempt_id].done_kind).toBe('pr_stop');
  });

  test('reverts workflow_mode on every success (bead stays open for the merge click)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    seedQueue(env.store, ['S1'], []);
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
      seedQueue(env.store, ['S1'], []);
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

  test('a handed-over merge lock is released after verify on success, and after the trip on failure', async () => {
    const breaker2 = createBreaker();
    /** @type {Record<string, { released: boolean, breaker_at_release: boolean|null }>} */
    const handovers = {};
    /**
     * @param {string} attempt_id
     */
    const registerHandover = (attempt_id) => {
      handovers[attempt_id] = { released: false, breaker_at_release: null };
    };
    const mergeLock = {
      takeHandover: (/** @type {string} */ attempt_id) => {
        if (!handovers[attempt_id]) {
          return null;
        }
        return () => {
          handovers[attempt_id].released = true;
          handovers[attempt_id].breaker_at_release =
            breaker2.isTripped('/repo');
        };
      }
    };
    const env = setup({
      config: { S1: {}, S2: {} },
      slots: 1,
      breaker: breaker2,
      verifyOk: true,
      verifyCmd: () => ({ cmd: ['true'], timeout_ms: 1000 })
    });
    // Inject the mergeLock dep by rebuilding the scheduler is heavier than
    // needed — setup() does not expose it, so wire through a fresh scheduler.
    const scheduler = createScheduler({
      store: env.store,
      makeRunner: env.runner.factory,
      bd: env.bd,
      worktree: env.worktree,
      tokens: env.tokens,
      verify: env.verify,
      breaker: breaker2,
      sessionLog: { attach: () => {} },
      verifyCmd: () => ({ cmd: ['true'], timeout_ms: 1000 }),
      runVerifyCmd: vi.fn(async () => ({ ok: true, reason: 'ok', exit: 0 })),
      mergeLock,
      parallel_slots: 1,
      now: () => 1000
    });
    seedQueue(env.store, ['S1'], []);
    await scheduler.tick(WS);
    const first_attempt = Object.keys(env.store.snapshot(WS).attempts)[0];
    registerHandover(first_attempt);
    env.store.updateAttempt(WS, {
      attempt_id: first_attempt,
      patch: { merge_sha: 'f'.repeat(40) }
    });

    // Success: the handover is released (breaker untripped at release time).
    env.runner.finish('S1', { success: true });
    await flush();
    await flush();
    expect(handovers[first_attempt].released).toBe(true);
    expect(handovers[first_attempt].breaker_at_release).toBe(false);

    // Failure: trip FIRST, release AFTER (release observes a tripped breaker).
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S2',
      lane: 'serial'
    });
    env.store.setAutoAdvance(WS, true);
    await scheduler.tick(WS);
    const second_attempt = Object.keys(env.store.snapshot(WS).attempts).find(
      (id) => env.store.snapshot(WS).attempts[id].bead_id === 'S2'
    );
    registerHandover(String(second_attempt));
    env.runner.finish('S2', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();
    expect(handovers[String(second_attempt)].released).toBe(true);
    expect(handovers[String(second_attempt)].breaker_at_release).toBe(true);
  });
});

describe('scheduler failure (breaker + workflow_mode revert + repo block)', () => {
  test('failed session trips breaker, reverts workflow_mode, blocks repo', async () => {
    const breaker = createBreaker();
    // slots:1, only S1 queued → P1 is NOT dispatched before the failure, so it
    // is a clean probe of the repo launch block.
    const env = setup({ config: { S1: {}, P1: {} }, slots: 1, breaker });
    seedQueue(env.store, ['S1'], []);
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

    // Breaker tripped for the repo.
    expect(breaker.isTripped('/repo')).toBe(true);
    // auto_advance forced OFF.
    expect(env.store.snapshot(WS).auto_advance).toBe(false);
    // workflow_mode reverted (prior was unset → unsetMetadata).
    expect(
      env.bd.calls.some(
        (c) =>
          c.method === 'unsetMetadata' &&
          c.bead_id === 'S1' &&
          c.key === 'workflow_mode'
      )
    ).toBe(true);
    // Attempt marked failed with a cause.
    expect(env.store.snapshot(WS).attempts[String(attempt_id)].status).toBe(
      'failed'
    );

    // Queue P1 into the SAME (blocked) repo, re-enable auto: the breaker blocks
    // the new launch even with auto_advance on.
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'P1',
      lane: 'parallel'
    });
    env.store.setAutoAdvance(WS, true);
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('P1')).toBe(false);

    // Manual resume: resetting the breaker unblocks the repo → P1 launches.
    breaker.reset('/repo');
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('P1')).toBe(true);
  });

  test('bd set-metadata failure fails THAT dispatch only (no unhandled rejection, siblings unaffected) [F9]', async () => {
    const breaker = createBreaker();
    const env = setup({
      config: { S1: { throwOnSet: true }, P1: {} },
      slots: 1,
      breaker
    });
    seedQueue(env.store, ['S1'], []);

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

    // The breaker is NOT tripped and auto_advance stays on → siblings unaffected.
    expect(breaker.isTripped('/repo')).toBe(false);
    expect(env.store.snapshot(WS).auto_advance).toBe(true);

    // A subsequent normal dispatch still runs (the scheduler was not poisoned).
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'P1',
      lane: 'parallel'
    });
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('P1')).toBe(true);
  });

  test('reverts to a prior value when workflow_mode was already set', async () => {
    const env = setup({
      config: { S1: { workflow_mode: 'fast_track' } },
      slots: 1
    });
    seedQueue(env.store, ['S1'], []);
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
  test('admission-invalid serial head is skipped to the next candidate in the SAME tick (no starvation)', async () => {
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
    seedQueue(env.store, ['S1', 'S2'], ['P1', 'P2']);
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
      // Valid at the tick scan (no base pinned yet), stale once dispatch pins
      // the worktree base_oid — models a base advancing between scan and add.
      validate: vi.fn(
        async (/** @type {any} */ _snap, /** @type {any} */ base) =>
          base === 'base-S1'
            ? { ok: false, reason: 'spec_review_stale' }
            : { ok: true }
      )
    };
    const env = setup({ config: { S1: {} }, slots: 1, admission });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    // The already-created worktree is cleaned up on the admission refusal.
    expect(env.worktree.remove).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1'
    });
    expect(env.store.snapshot(WS).admission.S1).toEqual({
      reason: 'spec_review_stale',
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
    seedQueue(env.store, ['S1'], []);
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
    seedQueue(env.store, ['S1'], []);
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
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);
    expect(spawn_impl.captured.calls.length).toBe(1);
    expect(env.scheduler.isRunning('S1')).toBe(true);
    await flush();
  });
});

describe('scheduler policy snapshot + demotion (worker-autorun-policy §2)', () => {
  test('auto_merge WITHOUT a verify_cmd demotes to pr_stop and records the reason', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);

    const a = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts)[0]
    );
    expect(a.merge_policy).toBe('pr_stop');
    expect(a.drift_policy).toBe('auto_rereview');
    expect(a.demoted_reason).toBe('verify_cmd_unset');
    // The demoted policy also reaches the session settings (preamble input).
    expect(env.runner.settingsFor('S1').merge_policy).toBe('pr_stop');
  });

  test('bead metadata beats the workspace global; verify_cmd keeps auto_merge', async () => {
    const env = setup({
      config: { S1: { merge_policy: 'auto_merge' } },
      slots: 1,
      verifyCmd: () => ({ cmd: ['npm', 'run', 'all'], timeout_ms: 600000 })
    });
    // Workspace globals: pr_stop + halt — the bead pin overrides merge only.
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.setPolicy(WS, {
      expected_revision: rev,
      key: 'merge_policy',
      value: 'pr_stop'
    }).queue.revision;
    env.store.setPolicy(WS, {
      expected_revision: rev,
      key: 'drift_policy',
      value: 'halt'
    });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);

    const a = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts)[0]
    );
    expect(a.merge_policy).toBe('auto_merge');
    expect(a.drift_policy).toBe('halt');
    expect(a.demoted_reason).toBe(null);
    expect(env.runner.settingsFor('S1').merge_policy).toBe('auto_merge');
    expect(env.runner.settingsFor('S1').drift_policy).toBe('halt');
  });

  test('an AUTO-DETECTED verify_cmd (source=detected) keeps auto_merge (no demotion) (§2)', async () => {
    const env = setup({
      config: { S1: { merge_policy: 'auto_merge' } },
      slots: 1,
      // The resolver returns a detected command — the scheduler only cares that
      // a runnable cmd exists, so no demotion fires.
      verifyCmd: () => ({
        cmd: ['npm', 'test'],
        timeout_ms: 600000,
        source: 'detected'
      })
    });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);
    const a = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts)[0]
    );
    expect(a.merge_policy).toBe('auto_merge');
    expect(a.demoted_reason).toBe(null);
  });
});

describe('scheduler merge axis detached from completion (worker-phase2 §1)', () => {
  test('a success never runs the post-merge verify_cmd', async () => {
    // A configured verify_cmd + an observed merge_sha used to trigger the
    // post-merge run on the auto_merge lane. The completion path no longer
    // consults merge_policy at all, so the runner must stay untouched.
    const runVerifyCmd = vi.fn();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verifyOk: true,
      verifyCmd: () => ({ cmd: ['npm', 'run', 'all'], timeout_ms: 1234 }),
      runVerifyCmd
    });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.store.updateAttempt(WS, {
      attempt_id,
      patch: { merge_sha: 'f'.repeat(40) }
    });

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(runVerifyCmd).not.toHaveBeenCalled();
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
    const breaker = createBreaker();
    // Every success now leaves the bead open, so the revert (unset) throwing
    // (bd down) must block the lane move unconditionally.
    const env = setup({
      config: { S1: { throwOnUnset: true } },
      slots: 1,
      breaker,
      verifyOk: true
    });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).not.toContain('S1');
    expect(snap.attempts[attempt_id].status).toBe('failed');
    expect(snap.attempts[attempt_id].cause).toBe('workflow_mode_revert_failed');
    expect(breaker.isTripped('/repo')).toBe(true);
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
    seedQueue(env.store, ['S1'], []);
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
    seedQueue(env.store, ['S1'], []);
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

  test('a retired codex model in the globals resolves to UNSET (no spawn model, no stamp)', async () => {
    // The global orchestration_model predates the claude-only change, so it is
    // outside the catalog → unset (the CLI default applies).
    const env = setup({
      config: { S1: { model: null } },
      slots: 1,
      verifyOk: true
    });
    seedExecDefaults(env.store, { orchestration_model: 'gpt-5.6' });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);

    expect(env.runner.settingsFor('S1').model).toBeUndefined();
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const a = /** @type {any} */ (env.store.snapshot(WS).attempts[attempt_id]);
    expect(a.model).toBe(null);
    expect(a.exec_stamped_keys).toBe(null);
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'orchestration_model')).toBe(
      false
    );
  });

  test('a partial exec-stamp failure unsets the already-stamped keys, fails the attempt, releases the claim', async () => {
    const breaker = createBreaker();
    // orchestration_model stamps OK; orchestration_effort's stamp throws → break.
    const env = setup({
      config: {
        S1: {
          model: null,
          effort: null,
          throwOnSetKey: 'orchestration_effort'
        }
      },
      slots: 1,
      breaker
    });
    seedExecDefaults(env.store, {
      review_model: 'opus',
      orchestration_model: 'sonnet',
      orchestration_effort: 'high'
    });
    seedQueue(env.store, ['S1'], []);

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

    // The dispatch failed in isolation: no breaker trip, auto_advance intact.
    expect(breaker.isTripped('/repo')).toBe(false);
    expect(env.store.snapshot(WS).auto_advance).toBe(true);
  });

  test('a set-succeeds-but-readback-throws stamp unsets the durable stamped_keys (not just the confirmed ones)', async () => {
    const breaker = createBreaker();
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
      slots: 1,
      breaker
    });
    seedExecDefaults(env.store, {
      review_model: 'opus',
      orchestration_model: 'sonnet',
      orchestration_effort: 'high'
    });
    seedQueue(env.store, ['S1'], []);

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
    expect(breaker.isTripped('/repo')).toBe(false);
    expect(env.store.snapshot(WS).auto_advance).toBe(true);
  });

  test('a success reverts the exec stamps AND workflow_mode, whatever the dispatch policy snapshot said', async () => {
    // verify_cmd configured → the dispatch still snapshots auto_merge on the
    // attempt (legacy field, Phase 2 deletes it). The completion path ignores
    // it: the bead stays open, so BOTH the exec stamps and workflow_mode revert.
    const env = setup({
      config: { S1: { runner: null, model: null, effort: null } },
      slots: 1,
      verifyOk: true,
      verifyCmd: () => ({ cmd: ['true'], timeout_ms: 1000 })
    });
    seedExecDefaults(env.store, {
      review_model: 'opus',
      orchestration_model: 'sonnet',
      orchestration_effort: 'high'
    });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.attempts[attempt_id].merge_policy).toBe('auto_merge');
    expect(snap.attempts[attempt_id].done_kind).toBe('pr_stop');
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
      merge_policy: 'auto_merge',
      drift_policy: 'auto_rereview',
      merge_sha: 'f'.repeat(40),
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

  test('a paused attempt is resumable and does NOT reset the breaker (§1.2/§1.3)', async () => {
    const breaker = createBreaker();
    // A sibling's genuine failure tripped the repo.
    breaker.trip('/repo', { bead_id: 'OTHER', cause: 'session_failed' });
    const env = setup({ config: {}, slots: 1, breaker });
    seedAttempt(
      env.store,
      'p1',
      resumablePrior({ status: 'paused', cause: null })
    );

    const res = await env.scheduler.resume(WS, 'p1');
    expect(res.ok).toBe(true);
    // Pausing is not a failure, so resuming it must not clear that block.
    expect(breaker.isTripped('/repo')).toBe(true);
    // The resume prompt says paused, never "failed" (§1.4).
    const prompt = env.runner.spawnedBead('B1').prompt;
    expect(prompt).toContain('일시정지');
    expect(prompt).not.toContain('실패로 남았다');
  });

  test('a failed resume still resets the breaker (§1.3)', async () => {
    const breaker = createBreaker();
    breaker.trip('/repo', { bead_id: 'B1', cause: 'session_failed' });
    const env = setup({ config: {}, slots: 1, breaker });
    seedAttempt(env.store, 'f1', resumablePrior());

    expect((await env.scheduler.resume(WS, 'f1')).ok).toBe(true);
    expect(breaker.isTripped('/repo')).toBe(false);
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
    // prior was DEMOTED to pr_stop and pinned its own model/effort.
    seedAttempt(
      env.store,
      'anc',
      resumablePrior({
        model: 'sonnet',
        effort: 'high',
        merge_policy: 'pr_stop',
        demoted_reason: 'verify_cmd_unset'
      })
    );
    // Flip the workspace-global exec defaults + policy AFTER the failure.
    seedExecDefaults(env.store, { orchestration_model: 'opus' });
    env.store.setPolicy(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      key: 'merge_policy',
      value: 'auto_merge'
    });

    const res = await env.scheduler.resume(WS, 'anc');
    expect(res.ok).toBe(true);
    const child =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    // Prior model/effort inherited — NOT re-resolved from the new globals.
    expect(child.model).toBe('sonnet');
    expect(child.effort).toBe('high');
    // Demoted pr_stop does NOT revive as auto_merge; merge_sha preserved.
    expect(child.merge_policy).toBe('pr_stop');
    expect(child.demoted_reason).toBe('verify_cmd_unset');
    expect(child.merge_sha).toBe('f'.repeat(40));
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

  test('resume resets the breaker so the repo merge-lock can be acquired again (▶-grade)', async () => {
    const breaker = createBreaker();
    const env = setup({ config: {}, slots: 1, breaker });
    breaker.trip('/repo', { bead_id: 'B1', cause: 'verify_failed:x' });
    seedAttempt(env.store, 'anc', resumablePrior());
    expect(breaker.isTripped('/repo')).toBe(true);

    const locks = createLockManager({
      isMergeBlocked: (repo) => breaker.isTripped(repo)
    });
    await expect(locks.acquireMerge('/repo', 'main')).rejects.toThrow();

    const res = await env.scheduler.resume(WS, 'anc');
    expect(res.ok).toBe(true);
    expect(breaker.isTripped('/repo')).toBe(false);
    const release = await locks.acquireMerge('/repo', 'main');
    release();
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
