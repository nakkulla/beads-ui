import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createBreaker } from './breaker.js';
import { createLockManager } from './locks.js';
import { createQueueStore } from './queue-store.js';
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
     * @param {Partial<{ success: boolean, reason: string, exit: number, blocked: boolean }>} v
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
      return {
        ready: c.ready ?? true,
        blocked: c.blocked ?? false,
        repo: c.repo ?? '/repo',
        target_base: c.target_base ?? 'main',
        runner: c.runner ?? 'claude',
        model: c.model ?? 'opus',
        effort: c.effort ?? 'high',
        workflow_mode: c.workflow_mode ?? null,
        route: c.route ?? null,
        plan_path: c.plan_path ?? null,
        deps: c.deps ?? []
      };
    },
    async setMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key,
      /** @type {string} */ value
    ) {
      calls.push({ method: 'setMetadata', bead_id, key, value });
    },
    async unsetMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key
    ) {
      calls.push({ method: 'unsetMetadata', bead_id, key });
    },
    async readMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key
    ) {
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
 * @param {{ config: Record<string, any>, slots?: number, verifyOk?: boolean, breaker?: any, tokens?: any, locks?: any }} opts
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
      reason: (opts.verifyOk ?? true) ? 'ok' : 'base_not_ancestor'
    }))
  };
  const worktree = {
    add: vi.fn(async ({ bead_id }) => ({
      path: `/wt/${bead_id}`,
      branch: bead_id,
      base_oid: `base-${bead_id}`
    })),
    remove: vi.fn(async () => ({ code: 0 }))
  };
  const sessionLog = { attach: vi.fn() };
  const scheduler = createScheduler({
    store,
    makeRunner: runner.factory,
    bd,
    worktree,
    tokens,
    verify,
    breaker,
    sessionLog,
    resolveMergeSha: vi.fn(async () => 'merge-sha'),
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

    expect(env.verify.verifyMerge).toHaveBeenCalled();
    const snap = env.store.snapshot(WS);
    expect(snap.done.map((e) => e.bead_id)).toContain('S1');
    expect(snap.attempts[attempt_id].status).toBe('done');
    expect(snap.attempts[attempt_id].merge_sha).toBe('merge-sha');
    // Bead closed → workflow_mode NOT reverted.
    expect(env.bd.calls.some((c) => c.method === 'unsetMetadata')).toBe(false);
    // Session token revoked after completion.
    expect(tokens.size()).toBe(0);
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
