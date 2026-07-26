/**
 * Worker end-to-end flow (spec §11 criterion 4).
 *
 * Exercises the FULL auto-advance loop through the REAL server modules with a
 * FAKE runner (Phase 10's `makeFixtureSpawn` replaying the REAL runner
 * fixtures) — no subprocess, no network, no real claude/codex:
 *
 *   enqueue → scheduler dispatch (real `createRunner` + real `runSession`
 *   normalizing a fixture) → INDEPENDENT PR observation (real tmp git repo +
 *   faked bd readback) → pr_wait → next dispatch.
 *
 * Then a FAILURE-injection variant: a fixture whose verdict fails reverts
 * `workflow_mode` and turns auto_advance off — the whole halt mechanism now that
 * the circuit breaker is gone (worker-phase2 §2). The repo is NOT blocked, so
 * re-enabling auto_advance is the entire recovery path.
 *
 * The `runtime.js` attach seam Phase 10 deferred is wired here:
 * `setRunningCountProvider(() => scheduler.runningCount())` so `/healthz`-style
 * `runtime.status()` reflects the LIVE scheduler.
 */
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { makeFixtureSpawn } from '../worker/runner/fixture-spawn.js';
import { createRunner } from '../worker/runner/index.js';
import { createWorkerRuntime } from '../worker/runtime.js';
import { createScheduler } from '../worker/scheduler.js';
import { createVerifier } from '../worker/verify.js';

const execFileAsync = promisify(execFile);
const FIXTURES = path.resolve(process.cwd(), 'server/worker/__fixtures__');

/** @type {string} */
let tmp_state;
/** @type {string} */
let repo_dir;
/**
 * Per-test workspace root — its slug keys the on-disk queue file. Unique per
 * test so a dangling async session from a prior test (which writes the WHOLE
 * queue to `$XDG_STATE_HOME/bdui/<slug>/queue.json` on completion) can never
 * pollute the next test's cold-loaded queue.
 *
 * @type {string}
 */
let WS;

/**
 * @param {string[]} args
 * @param {{ cwd?: string }} options
 * @returns {Promise<{ code: number, stdout: string, stderr: string }>}
 */
async function gitRun(args, options) {
  try {
    const { stdout, stderr } = await execFileAsync('git', args, {
      cwd: options.cwd
    });
    return { code: 0, stdout, stderr };
  } catch (err) {
    const e = /** @type {any} */ (err);
    return {
      code: e.code ?? 1,
      stdout: e.stdout ?? '',
      stderr: e.stderr ?? ''
    };
  }
}

/**
 * Poll a predicate until true or timeout — the verify chain runs off async git.
 *
 * @param {() => boolean} pred
 * @param {number} [timeout_ms]
 */
async function waitFor(pred, timeout_ms = 2000) {
  const start = Date.now();
  while (Date.now() - start < timeout_ms) {
    if (pred()) {
      return;
    }
    await new Promise((r) => setTimeout(r, 5));
  }
  if (!pred()) {
    throw new Error('waitFor timed out');
  }
}

/**
 * A fake bd that snapshots each bead and records metadata mutations.
 *
 * @param {Record<string, any>} config
 */
function makeFakeBd(config) {
  /** @type {Array<{ method: string, bead_id: string, key?: string, value?: string }>} */
  const calls = [];
  return {
    calls,
    async snapshotBead(/** @type {string} */ bead_id) {
      const c = config[bead_id] || {};
      return {
        ready: c.ready ?? true,
        blocked: c.blocked ?? false,
        repo: c.repo ?? repo_dir,
        target_base: c.target_base ?? 'main',
        runner: c.runner ?? 'claude',
        model: c.model ?? 'opus',
        effort: c.effort ?? 'high',
        workflow_mode: c.workflow_mode ?? null,
        route: c.route ?? null,
        plan_path: c.plan_path ?? null,
        status: c.status ?? '',
        plan_review: c.plan_review,
        plan_fresh: c.plan_fresh ?? null,
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
 * Simulate a session's real git work: create the per-session work branch
 * `refs/heads/<bead_id>` off `main` with a commit, and (when `merge`) land it
 * into `main` so the INDEPENDENT verifier's ancestry check operates on the true
 * work tip. When `merge` is false the branch stays UNMERGED, exercising the
 * fail-closed path (session claims success but never landed on base).
 *
 * @param {string} bead_id
 * @param {boolean} merge
 * @returns {Promise<string>} The resolved work-branch tip sha.
 */
async function landWorkBranch(bead_id, merge) {
  const wt = path.join(repo_dir, '.wt', bead_id);
  await gitRun(['worktree', 'add', '-b', bead_id, wt, 'main'], {
    cwd: repo_dir
  });
  fs.writeFileSync(path.join(wt, `${bead_id}.txt`), 'work\n');
  await gitRun(['add', '.'], { cwd: wt });
  await gitRun(['commit', '-q', '-m', `work ${bead_id}`], { cwd: wt });
  if (merge) {
    await gitRun(['merge', '--no-ff', '--no-edit', bead_id], { cwd: repo_dir });
  }
  await gitRun(['worktree', 'remove', '--force', wt], { cwd: repo_dir });
  const rev = await gitRun(['rev-parse', bead_id], { cwd: repo_dir });
  return rev.stdout.trim();
}

/**
 * Build a scheduler wired to the shared runtime + real runner/verify. The fake
 * runner replays a real fixture through the REAL `runSession` engine, and the
 * REAL verify module runs against a faked `gh` adapter (worker-phase2 §12: the
 * observation seam is mocked, never the network).
 *
 * @param {{ fixture: string, exit?: number, config: Record<string, any>, prOpen?: boolean, landWork?: boolean }} opts
 */
function buildSystem(opts) {
  const runtime = createWorkerRuntime();
  const bd = makeFakeBd(opts.config);
  const pr_open = opts.prOpen ?? true;
  /** @type {{ metadata: Record<string, string>, status: string }} */
  const bd_record = { metadata: {}, status: 'in_progress' };
  const verify = createVerifier({
    gh: {
      openPrForBranch: async (
        /** @type {string} */ _repo_dir,
        /** @type {string} */ branch
      ) =>
        pr_open
          ? {
              state: 'ok',
              data: {
                number: 1,
                url: `https://github.com/o/r/pull/1`,
                head_ref: branch,
                head_sha: 'a'.repeat(40),
                state: 'OPEN'
              }
            }
          : { state: 'empty' }
    },
    bd: {
      setMetadata: async (
        /** @type {string} */ _bead_id,
        /** @type {string} */ key,
        /** @type {string} */ value
      ) => {
        bd_record.metadata[key] = value;
      },
      readMetadata: async (
        /** @type {string} */ _bead_id,
        /** @type {string} */ key
      ) => bd_record.metadata[key] ?? null,
      setStatus: async (
        /** @type {string} */ _bead_id,
        /** @type {string} */ status
      ) => {
        bd_record.status = status;
      },
      readStatus: async () => bd_record.status
    },
    sleep: async () => {}
  });
  const land = opts.landWork ?? true;
  const worktree = {
    add: async (/** @type {{ bead_id: string }} */ { bead_id }) => {
      // Real branch + (optional) merge so verify's ancestry check is genuine.
      const base_oid = await landWorkBranch(bead_id, land);
      return {
        path: path.join(repo_dir, '.wt', bead_id),
        branch: bead_id,
        base_oid
      };
    },
    remove: async () => ({ code: 0 })
  };
  const scheduler = createScheduler({
    store: runtime.queueStore,
    // Real runner registry, but with the fixture-replaying fake spawn injected.
    makeRunner: (name) =>
      createRunner(name, {
        spawn_impl: makeFixtureSpawn({
          file: path.join(FIXTURES, opts.fixture),
          exit: opts.exit ?? 0
        })
      }),
    bd,
    worktree,
    verify,
    sessionLog: runtime.sessionLog,
    parallel_slots: 2
  });
  // Wire the runtime attach seam Phase 10 deferred.
  runtime.setRunningCountProvider(() => scheduler.runningCount());
  return { runtime, bd, scheduler, bd_record };
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

beforeEach(async () => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-e2e-state-'));
  process.env.XDG_STATE_HOME = tmp_state;
  WS = path.join(tmp_state, 'workspace');
  repo_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-e2e-repo-'));
  // A real git repo so the INDEPENDENT ancestry check runs for real.
  await gitRun(['init', '-q'], { cwd: repo_dir });
  await gitRun(['checkout', '-q', '-b', 'main'], { cwd: repo_dir });
  await gitRun(['config', 'user.email', 'e2e@test'], { cwd: repo_dir });
  await gitRun(['config', 'user.name', 'e2e'], { cwd: repo_dir });
  fs.writeFileSync(path.join(repo_dir, 'f.txt'), 'base\n');
  await gitRun(['add', '.'], { cwd: repo_dir });
  await gitRun(['commit', '-q', '-m', 'base'], { cwd: repo_dir });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  for (const dir of [tmp_state, repo_dir]) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
});

describe('worker e2e — full success flow', () => {
  test('enqueue → dispatch → PR observation → pr_wait → next dispatch', async () => {
    // Success is now what the SERVER observes: an open PR on the bead's branch
    // (worker-phase2 §1). The session's own bd bookkeeping is irrelevant — the
    // worker back-fills `pr_url`/`resolved` itself.
    const { runtime, bd, scheduler, bd_record } = buildSystem({
      fixture: 'claude-success.jsonl',
      config: { S1: { runner: 'claude' }, S2: { runner: 'claude' } }
    });
    seedQueue(runtime.queueStore, ['S1', 'S2'], []);

    // First tick dispatches the serial head (cap 1) — S1 only.
    await scheduler.tick(WS);
    expect(scheduler.isRunning('S1')).toBe(true);
    expect(scheduler.isRunning('S2')).toBe(false);

    // S1's session replays the success fixture → verdict success → INDEPENDENT
    // observation of the branch's open PR → pr_wait; then S2 auto-dispatches
    // and also completes.
    await waitFor(() => {
      const waiting = runtime.queueStore
        .snapshot(WS)
        .pr_wait.map((e) => e.bead_id);
      return waiting.includes('S1') && waiting.includes('S2');
    });

    const snap = runtime.queueStore.snapshot(WS);
    const attempts = /** @type {any[]} */ (Object.values(snap.attempts));
    expect(attempts.every((a) => a.status === 'done')).toBe(true);
    // The observation verdict, and the worker's own bd back-fill of the
    // contract keys the session never had to write.
    const a1 = /** @type {any} */ (attempts.find((a) => a.bead_id === 'S1'));
    expect(a1.verify_result.ok).toBe(true);
    expect(a1.verify_result.pr_url).toBe('https://github.com/o/r/pull/1');
    // The retired merge-axis stamps are never written on a new attempt.
    expect(a1.done_kind).toBe(null);
    expect(a1.merge_sha).toBe(null);
    expect(a1.merge_policy).toBe(null);
    expect(bd_record.metadata.pr_url).toBe('https://github.com/o/r/pull/1');
    expect(bd_record.status).toBe('resolved');

    // The bead stays open for the human merge click → workflow_mode IS
    // reverted (prior unset).
    expect(
      bd.calls.some(
        (c) => c.method === 'unsetMetadata' && c.key === 'workflow_mode'
      )
    ).toBe(true);
    // No live sessions → the runtime seam reads 0.
    expect(scheduler.runningCount()).toBe(0);
    expect(runtime.status(WS).running_count).toBe(0);
  });
});

describe('worker e2e — failure injection halts the queue (no breaker)', () => {
  test('failed session → auto_advance OFF + workflow_mode revert + banner record', async () => {
    const { runtime, bd, scheduler } = buildSystem({
      // codex-failure.jsonl: a turn.failed/error stream → verdict fail.
      fixture: 'codex-failure.jsonl',
      exit: 1,
      config: { S1: { runner: 'codex' }, P1: { runner: 'codex' } }
    });
    seedQueue(runtime.queueStore, ['S1'], []);

    await scheduler.tick(WS);
    expect(scheduler.isRunning('S1')).toBe(true);

    await waitFor(() => !runtime.queueStore.snapshot(WS).auto_advance);

    // auto_advance forced off, workflow_mode reverted (unset), attempt failed.
    expect(runtime.queueStore.snapshot(WS).auto_advance).toBe(false);
    expect(
      bd.calls.some(
        (c) =>
          c.method === 'unsetMetadata' &&
          c.bead_id === 'S1' &&
          c.key === 'workflow_mode'
      )
    ).toBe(true);
    const failed = /** @type {any} */ (
      Object.values(runtime.queueStore.snapshot(WS).attempts).find(
        (/** @type {any} */ a) => a.bead_id === 'S1'
      )
    );
    expect(failed.status).toBe('failed');
    // The record carries what the failure banner renders.
    expect(failed.cause).toContain('session_failed:');
    expect(failed.repo).toBe(repo_dir);

    // The repo is NOT blocked: re-enabling auto_advance (the ▶ click) is the
    // whole recovery path now that the breaker is gone.
    runtime.queueStore.place(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      bead_id: 'P1',
      lane: 'parallel'
    });
    runtime.queueStore.setAutoAdvance(WS, true);
    await scheduler.tick(WS);
    expect(scheduler.isRunning('P1')).toBe(true);
  });
});

describe('worker e2e — a session that never delivered fails verification (fail-closed)', () => {
  test('success verdict but no open PR observed → verify fails → queue halts', async () => {
    // The session replays a SUCCESS fixture (verdict success), but the SERVER
    // observes no open PR for the branch — a successful, empty observation, so
    // the attempt fails closed with pr_missing.
    const { runtime, bd, scheduler } = buildSystem({
      fixture: 'claude-success.jsonl',
      prOpen: false,
      config: { S1: { runner: 'claude' } },
      landWork: false
    });
    seedQueue(runtime.queueStore, ['S1'], []);

    await scheduler.tick(WS);
    expect(scheduler.isRunning('S1')).toBe(true);

    // Session succeeds, but the observation is empty → fails closed:
    // auto_advance off, workflow_mode reverted, attempt failed.
    await waitFor(() => !runtime.queueStore.snapshot(WS).auto_advance);
    expect(runtime.queueStore.snapshot(WS).auto_advance).toBe(false);

    const attempt = /** @type {any} */ (
      Object.values(runtime.queueStore.snapshot(WS).attempts).find(
        (/** @type {any} */ a) => a.bead_id === 'S1'
      )
    );
    expect(attempt.status).toBe('failed');
    expect(attempt.verify_result.ok).toBe(false);
    // A SUCCESSFUL empty observation — not an observation error.
    expect(attempt.verify_result.reason).toBe('pr_missing');
    expect(attempt.cause).toBe('verify_failed:pr_missing');
    // S1 was NOT moved to the PR-wait lane.
    expect(
      runtime.queueStore.snapshot(WS).pr_wait.map((e) => e.bead_id)
    ).not.toContain('S1');
    // workflow_mode reverted (prior unset → unsetMetadata).
    expect(
      bd.calls.some((c) => c.method === 'unsetMetadata' && c.bead_id === 'S1')
    ).toBe(true);
  });
});

describe('worker e2e — runtime seam reflects the live scheduler', () => {
  test('setRunningCountProvider drives runtime.status().running_count', async () => {
    // A pending fake runner so the session stays "running" for the assertion.
    const runtime = createWorkerRuntime();
    /** @type {Array<() => void>} */
    const finishers = [];
    const scheduler = createScheduler({
      store: runtime.queueStore,
      makeRunner: () => ({
        name: 'claude',
        spawn() {
          /** @type {(v: any) => void} */
          let resolveDone = () => {};
          const done = new Promise((res) => {
            resolveDone = res;
          });
          finishers.push(() =>
            resolveDone({
              success: true,
              reason: 'ok',
              exit: 0,
              blocked: false,
              events: [],
              raw: []
            })
          );
          return /** @type {any} */ ({
            pid: 4242,
            kill() {},
            events: { on() {} },
            done
          });
        }
      }),
      bd: makeFakeBd({ S1: {} }),
      worktree: {
        add: async (/** @type {{ bead_id: string }} */ { bead_id }) => ({
          path: `/wt/${bead_id}`,
          branch: bead_id,
          base_oid: 'oid'
        }),
        remove: async () => ({ code: 0 })
      },
      verify: { verifyPrSubmitted: async () => ({ ok: true, reason: 'ok' }) },
      sessionLog: runtime.sessionLog,
      parallel_slots: 1
    });
    runtime.setRunningCountProvider(() => scheduler.runningCount());

    seedQueue(runtime.queueStore, ['S1'], []);
    await scheduler.tick(WS);

    expect(scheduler.runningCount()).toBe(1);
    expect(runtime.status(WS).running_count).toBe(1);

    finishers.forEach((f) => f());
    await waitFor(() => scheduler.runningCount() === 0);
    expect(runtime.status(WS).running_count).toBe(0);
  });
});
