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
      byBead.set(bead.id, { handle, resolve: resolveDone, settings });
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
      // test model a bead that leaves runner/model/effort unset so a global
      // default can fill (and stamp) it.
      return {
        ready: c.ready ?? true,
        blocked: c.blocked ?? false,
        repo: c.repo ?? '/repo',
        target_base: c.target_base ?? 'main',
        runner: c.runner === null ? undefined : (c.runner ?? 'claude'),
        model: c.model === null ? undefined : (c.model ?? 'opus'),
        effort: c.effort === null ? undefined : (c.effort ?? 'high'),
        review_model: c.review_model ?? undefined,
        impl_model: c.impl_model ?? undefined,
        workflow_mode: c.workflow_mode ?? null,
        route: c.route ?? null,
        plan_path: c.plan_path ?? null,
        status: c.status ?? '',
        plan_review: c.plan_review,
        plan_fresh: c.plan_fresh ?? null,
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
    verifyMerge: vi.fn(async () => ({
      ok: opts.verifyOk ?? true,
      reason: (opts.verifyOk ?? true) ? 'ok' : 'work_not_in_base',
      work_tip: 'work-tip-sha'
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
    removeDetached: vi.fn(async () => ({ code: 0 }))
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
  test('stop group-kills the attempt, fails it, reverts workflow_mode, no breaker', async () => {
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

    // Attempt marked failed (cause 'stopped'); no longer running.
    const snap = env.store.snapshot(WS);
    expect(snap.attempts[attempt_id].status).toBe('failed');
    expect(snap.attempts[attempt_id].cause).toBe('stopped');
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
    expect(env.store.snapshot(WS).attempts[attempt_id].cause).toBe('stopped');
  });

  test('stop returns false for an unknown attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    expect(await env.scheduler.stop(WS, 'nope')).toBe(false);
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
    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toContain('P1');
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

describe('scheduler happy path (dispatch → merge-gate → verify → Done)', () => {
  test('successful session verifies and moves the bead to Done', async () => {
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
      verifyOk: true,
      // A configured verify_cmd keeps the resolved auto_merge (no demotion);
      // the post-merge verify_cmd itself passes.
      verifyCmd: () => ({ cmd: ['true'], timeout_ms: 1000 }),
      runVerifyCmd: vi.fn(async () => ({ ok: true, reason: 'ok', exit: 0 }))
    });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);

    // The merge gate: a per-session token was issued and the session can
    // acquire the (repo, base) merge lock through it.
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    expect(tokens.size()).toBe(1);
    const release = await locks.acquireMerge('/repo', 'main');
    release();

    // Simulate the merge-lock route's server-observed merge_sha record.
    env.store.updateAttempt(WS, {
      attempt_id,
      patch: { merge_sha: 'f'.repeat(40) }
    });

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(env.verify.verifyMerge).toHaveBeenCalledWith(
      expect.objectContaining({ merge_policy: 'auto_merge' })
    );
    const snap = env.store.snapshot(WS);
    expect(snap.done.map((e) => e.bead_id)).toContain('S1');
    expect(snap.attempts[attempt_id].status).toBe('done');
    expect(snap.attempts[attempt_id].done_kind).toBe('auto_merge');
    // Bead closed → workflow_mode NOT reverted.
    expect(env.bd.calls.some((c) => c.method === 'unsetMetadata')).toBe(false);
    // Session token revoked after completion.
    expect(tokens.size()).toBe(0);
  });

  test('pr_stop success reverts workflow_mode and records done_kind', async () => {
    // No verify_cmd → the resolved auto_merge demotes to pr_stop at dispatch.
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(env.verify.verifyMerge).toHaveBeenCalledWith(
      expect.objectContaining({ merge_policy: 'pr_stop', merge_sha: null })
    );
    const snap = env.store.snapshot(WS);
    expect(snap.done.map((e) => e.bead_id)).toContain('S1');
    expect(snap.attempts[attempt_id].done_kind).toBe('pr_stop');
    // pr_stop leaves the bead open → workflow_mode reverted (prior unset).
    expect(
      env.bd.calls.some(
        (c) =>
          c.method === 'unsetMetadata' &&
          c.bead_id === 'S1' &&
          c.key === 'workflow_mode'
      )
    ).toBe(true);
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
  test('a fresh-receipt codex bead passes the in-spawn second guard', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [JSON.stringify({ type: 'turn.completed', usage: {} })],
      exit: 0
    });
    const sha = 'a'.repeat(40);
    const env = setup({
      config: {
        S1: {
          runner: 'codex',
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: `user@${sha}`,
          status: 'in_progress',
          plan_fresh: true
        }
      },
      slots: 1,
      makeRunner: (/** @type {string} */ name) =>
        createRunner(name, { spawn_impl })
    });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);
    // The spawn-literal carries plan_fresh:true, so createRunner.spawn()'s
    // in-spawn SECOND guard authorizes codex and a real codex process spawns.
    expect(spawn_impl.captured.calls.length).toBe(1);
    expect(spawn_impl.captured.calls[0].command).toBe('codex');
    await flush();
  });

  test('a codex bead WITHOUT a fresh receipt is blocked at dispatch (no spawn)', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [JSON.stringify({ type: 'turn.completed', usage: {} })],
      exit: 0
    });
    const env = setup({
      config: {
        S1: {
          runner: 'codex',
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          status: 'in_progress'
          // no plan_review, no plan_fresh → not authorized, fail-closed.
        }
      },
      slots: 1,
      makeRunner: (/** @type {string} */ name) =>
        createRunner(name, { spawn_impl })
    });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);
    expect(spawn_impl.captured.calls.length).toBe(0);
    expect(env.scheduler.isRunning('S1')).toBe(false);
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
});

describe('scheduler post-merge verify_cmd (worker-autorun-policy §4)', () => {
  const MERGE_SHA = 'f'.repeat(40);

  /**
   * @param {{ vres: any, breaker?: any }} opts
   */
  function buildVerifyCmdEnv(opts) {
    const breaker = opts.breaker || createBreaker();
    const env = setup({
      config: { S1: {}, P9: {} },
      slots: 1,
      breaker,
      verifyOk: true,
      verifyCmd: () => ({ cmd: ['npm', 'run', 'all'], timeout_ms: 1234 })
    });
    /** @type {any[]} */
    const detached_adds = [];
    /** @type {any[]} */
    const detached_removes = [];
    /** @type {any} */ (env.worktree).addDetached = vi.fn(
      async (/** @type {any} */ input) => {
        detached_adds.push(input);
        return { path: `/wt-verify/${input.name}` };
      }
    );
    /** @type {any} */ (env.worktree).removeDetached = vi.fn(
      async (/** @type {any} */ input) => {
        detached_removes.push(input);
        return { code: 0 };
      }
    );
    /** @type {any[]} */
    const runs = [];
    const runVerifyCmd = vi.fn(async (/** @type {any} */ input) => {
      runs.push({ input, breaker_tripped: breaker.isTripped('/repo') });
      return opts.vres;
    });
    const scheduler = createScheduler({
      store: env.store,
      makeRunner: env.runner.factory,
      bd: env.bd,
      worktree: env.worktree,
      tokens: env.tokens,
      verify: env.verify,
      breaker,
      sessionLog: { attach: () => {} },
      verifyCmd: () => ({ cmd: ['npm', 'run', 'all'], timeout_ms: 1234 }),
      runVerifyCmd,
      parallel_slots: 1,
      now: () => 1000
    });
    return {
      env,
      breaker,
      scheduler,
      detached_adds,
      detached_removes,
      runs,
      runVerifyCmd
    };
  }

  /**
   * Dispatch S1 and simulate the merge-lock route's observation by patching
   * the attempt with a server-observed merge_sha.
   */
  async function dispatchWithObservedMerge(
    /** @type {ReturnType<typeof buildVerifyCmdEnv>} */ sys
  ) {
    seedQueue(sys.env.store, ['S1'], []);
    await sys.scheduler.tick(WS);
    const attempt_id = Object.keys(sys.env.store.snapshot(WS).attempts)[0];
    sys.env.store.updateAttempt(WS, {
      attempt_id,
      patch: { merge_sha: MERGE_SHA }
    });
    return attempt_id;
  }

  test('pass → detached worktree pinned to merge_sha, cleaned up, bead Done', async () => {
    const sys = buildVerifyCmdEnv({
      vres: { ok: true, reason: 'ok', exit: 0 }
    });
    const attempt_id = await dispatchWithObservedMerge(sys);
    sys.env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(sys.detached_adds).toEqual([
      { repo: '/repo', sha: MERGE_SHA, name: 'verify-S1' }
    ]);
    expect(sys.runs[0].input).toEqual({
      cwd: '/wt-verify/verify-S1',
      cmd: ['npm', 'run', 'all'],
      timeout_ms: 1234
    });
    expect(sys.detached_removes).toEqual([
      { repo: '/repo', name: 'verify-S1' }
    ]);
    const snap = sys.env.store.snapshot(WS);
    expect(snap.done.map((e) => e.bead_id)).toContain('S1');
    expect(snap.attempts[attempt_id].status).toBe('done');
    expect(sys.breaker.isTripped('/repo')).toBe(false);
  });

  test('failure → distinct cause, breaker trips FIRST, repo dispatch blocked (수용 기준 5)', async () => {
    const sys = buildVerifyCmdEnv({
      vres: { ok: false, reason: 'verify_cmd_failed', exit: 2 }
    });
    const attempt_id = await dispatchWithObservedMerge(sys);
    sys.env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = sys.env.store.snapshot(WS);
    expect(snap.attempts[attempt_id].status).toBe('failed');
    expect(snap.attempts[attempt_id].cause).toBe('verify_cmd_failed');
    expect(snap.done.map((e) => e.bead_id)).not.toContain('S1');
    expect(sys.breaker.isTripped('/repo')).toBe(true);
    expect(snap.auto_advance).toBe(false);
    // The detached verify worktree is cleaned up even on failure.
    expect(sys.detached_removes).toHaveLength(1);

    // 수용 기준 5: subsequent dispatch into the SAME repo is blocked.
    sys.env.store.place(WS, {
      expected_revision: sys.env.store.snapshot(WS).revision,
      bead_id: 'P9',
      lane: 'serial'
    });
    sys.env.store.setAutoAdvance(WS, true);
    await sys.scheduler.tick(WS);
    expect(sys.scheduler.isRunning('P9')).toBe(false);
  });

  test('timeout reason propagates verbatim to the attempt cause', async () => {
    const sys = buildVerifyCmdEnv({
      vres: { ok: false, reason: 'verify_cmd_timeout', exit: null }
    });
    const attempt_id = await dispatchWithObservedMerge(sys);
    sys.env.runner.finish('S1', { success: true });
    await flush();
    await flush();
    expect(sys.env.store.snapshot(WS).attempts[attempt_id].cause).toBe(
      'verify_cmd_timeout'
    );
  });

  test('pr_stop lane never runs the verify_cmd', async () => {
    const breaker = createBreaker();
    const runVerifyCmd = vi.fn();
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    const scheduler = createScheduler({
      store: env.store,
      makeRunner: env.runner.factory,
      bd: env.bd,
      worktree: env.worktree,
      tokens: env.tokens,
      verify: env.verify,
      breaker,
      sessionLog: { attach: () => {} },
      // No verifyCmd → dispatch demotes to pr_stop.
      runVerifyCmd,
      parallel_slots: 1,
      now: () => 1000
    });
    seedQueue(env.store, ['S1'], []);
    await scheduler.tick(WS);
    env.runner.finish('S1', { success: true });
    await flush();
    await flush();
    expect(runVerifyCmd).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toContain('S1');
  });
});

describe('scheduler fail-closed regressions (implementation review 2026-07-22)', () => {
  test('pr_stop success with a FAILED workflow_mode revert blocks the Done move', async () => {
    const breaker = createBreaker();
    // No verify_cmd → demoted pr_stop; the revert (unset) throws (bd down).
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
    expect(snap.done.map((e) => e.bead_id)).not.toContain('S1');
    expect(snap.attempts[attempt_id].status).toBe('failed');
    expect(snap.attempts[attempt_id].cause).toBe('workflow_mode_revert_failed');
    expect(breaker.isTripped('/repo')).toBe(true);
  });

  test('auto_merge WITHOUT a post-merge runner capability fails closed (never a silent pass)', async () => {
    const breaker = createBreaker();
    // verifyCmd configured (auto_merge stays) but NO runVerifyCmd dep → the
    // independent verification cannot run → refuse, trip.
    const env = setup({
      config: { S1: {} },
      slots: 1,
      breaker,
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

    const snap = env.store.snapshot(WS);
    expect(snap.done.map((e) => e.bead_id)).not.toContain('S1');
    expect(snap.attempts[attempt_id].cause).toBe('verify_cmd_spawn_error');
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
      worker_runner: 'codex',
      orchestration_model: 'gpt-5.6',
      orchestration_effort: 'high'
    });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);

    // Resolved values reached the runner spawn (model/effort) + attempt record.
    expect(env.runner.settingsFor('S1').model).toBe('gpt-5.6');
    expect(env.runner.settingsFor('S1').effort).toBe('high');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const a = /** @type {any} */ (env.store.snapshot(WS).attempts[attempt_id]);
    expect(a.runner).toBe('codex');
    expect(a.model).toBe('gpt-5.6');
    expect(a.effort).toBe('high');
    // Durable stamp list recorded on the attempt (survives restart/orphan).
    expect(a.exec_stamped_keys).toEqual([
      'worker_runner',
      'orchestration_model',
      'orchestration_effort'
    ]);

    // Bead metadata was stamped with the three global-filled keys.
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'worker_runner')).toBe(true);
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'orchestration_model')).toBe(
      true
    );
    expect(
      calledMeta(env.bd, 'S1', 'setMetadata', 'orchestration_effort')
    ).toBe(true);

    // Termination (pr_stop success) reverts every stamped key + workflow_mode.
    env.runner.finish('S1', { success: true });
    await flush();
    await flush();
    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toContain('S1');
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'worker_runner')).toBe(
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

  test('an incompatible cross-layer model resolves to UNSET (no spawn model, no stamp)', async () => {
    // Bead pins runner=claude with no model; the global orchestration_model is
    // a codex-only model → incompatible → model unset (claude default path).
    const env = setup({
      config: { S1: { runner: 'claude', model: null } },
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
    // worker_runner stamps OK; orchestration_model's stamp throws → break.
    const env = setup({
      config: {
        S1: {
          runner: null,
          model: null,
          effort: null,
          throwOnSetKey: 'orchestration_model'
        }
      },
      slots: 1,
      breaker
    });
    seedExecDefaults(env.store, {
      worker_runner: 'codex',
      orchestration_model: 'gpt-5.6',
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
      'worker_runner',
      'orchestration_model',
      'orchestration_effort'
    ]);

    // The one key that WAS stamped is cleaned up; workflow_mode reverted too.
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'worker_runner')).toBe(true);
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'worker_runner')).toBe(
      true
    );
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
      worker_runner: 'codex',
      orchestration_model: 'gpt-5.6',
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
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'worker_runner')).toBe(
      true
    );
    // workflow_mode is reverted too; the dispatch failed in isolation.
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'workflow_mode')).toBe(
      true
    );
    expect(breaker.isTripped('/repo')).toBe(false);
    expect(env.store.snapshot(WS).auto_advance).toBe(true);
  });

  test('an auto_merge Done reverts the exec stamps (merge_policy-agnostic) but NOT workflow_mode', async () => {
    // verify_cmd configured → the resolved auto_merge stays auto_merge (no
    // pr_stop demotion), so the bead is CLOSED on success. Exec stamps must
    // still revert even though workflow_mode is intentionally left in place.
    const env = setup({
      config: { S1: { runner: null, model: null, effort: null } },
      slots: 1,
      verifyOk: true,
      verifyCmd: () => ({ cmd: ['true'], timeout_ms: 1000 }),
      runVerifyCmd: vi.fn(async () => ({ ok: true, reason: 'ok', exit: 0 }))
    });
    seedExecDefaults(env.store, {
      worker_runner: 'codex',
      orchestration_model: 'gpt-5.6',
      orchestration_effort: 'high'
    });
    seedQueue(env.store, ['S1'], []);
    await env.scheduler.tick(WS);

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    // Simulate the merge-lock route's server-observed merge_sha record.
    env.store.updateAttempt(WS, {
      attempt_id,
      patch: { merge_sha: 'f'.repeat(40) }
    });

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.attempts[attempt_id].done_kind).toBe('auto_merge');
    expect(snap.done.map((e) => e.bead_id)).toContain('S1');
    // Exec stamps reverted even on the auto_merge (bead-closed) path.
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'worker_runner')).toBe(
      true
    );
    expect(
      calledMeta(env.bd, 'S1', 'unsetMetadata', 'orchestration_model')
    ).toBe(true);
    expect(
      calledMeta(env.bd, 'S1', 'unsetMetadata', 'orchestration_effort')
    ).toBe(true);
    // workflow_mode is NOT reverted on auto_merge (bead closed by design).
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'workflow_mode')).toBe(
      false
    );
  });
});
