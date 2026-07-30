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
import { evaluateMergeGate } from '../worker/merge-gate.js';
import { createPrActions } from '../worker/pr-actions.js';
import { createPrObservationStore } from '../worker/pr-observations.js';
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
 * A bare repo standing in for `origin`. The post-merge cleanup does REAL git
 * against it (fetch the base, delete the topic branch) — only the GitHub API
 * calls are faked, so the cleanup's git semantics are genuinely exercised.
 *
 * @type {string}
 */
let origin_dir;
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
  /** @type {Record<string, string>} */
  const statuses = {};
  return {
    calls,
    statuses,
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
    },
    async setStatus(
      /** @type {string} */ bead_id,
      /** @type {string} */ status
    ) {
      statuses[bead_id] = status;
    },
    async readStatus(/** @type {string} */ bead_id) {
      return statuses[bead_id] ?? null;
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
 * @param {{ fixture: string, exit?: number, config: Record<string, any>, prOpen?: boolean, landWork?: boolean, slots?: number }} opts
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
                base_ref: 'main',
                head_sha: 'a'.repeat(40),
                state: 'OPEN'
              }
            }
          : { state: 'empty' },
      // The `pr_url` fallback's seam. This suite drives the branch lane only, so
      // the fallback must never grant completion behind its back: an origin it
      // cannot resolve stops the strict parse before any PR is looked up.
      repoSlug: async () => null,
      prDetail: async () => ({ state: 'error', reason: 'gh_failed' })
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
    sessionLog: runtime.sessionLog
  });
  // The concurrency cap is store state now (worker-phase2 §3).
  runtime.queueStore.setSlots(WS, {
    expected_revision: runtime.queueStore.snapshot(WS).revision,
    slots: opts.slots ?? 2
  });
  // Wire the runtime attach seam Phase 10 deferred.
  runtime.setRunningCountProvider(() => scheduler.runningCount());
  return { runtime, bd, scheduler, bd_record };
}

/**
 * The worktree dependency the PR actions take: a no-op removal (the e2e's
 * worktrees are never really created) over the REAL repo topology lock, so the
 * cleanup's ref-mutating git commands serialize exactly as they do in
 * production (worker-phase2 §8).
 *
 * @param {ReturnType<typeof createWorkerRuntime>} runtime
 */
function prActionsWorktree(runtime) {
  return {
    remove: async () => ({ code: 0 }),
    /**
     * @template T
     * @param {string} repo
     * @param {() => Promise<T>} fn
     * @returns {Promise<T>}
     */
    async withTopologyLock(repo, fn) {
      const release = await runtime.locks.topologyLock(repo);
      try {
        return await fn();
      } finally {
        release();
      }
    }
  };
}

/**
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
  origin_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-e2e-origin-'));
  await gitRun(['init', '-q', '--bare'], { cwd: origin_dir });
  await gitRun(['remote', 'add', 'origin', origin_dir], { cwd: repo_dir });
  await gitRun(['push', '-q', 'origin', 'main'], { cwd: repo_dir });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  for (const dir of [tmp_state, repo_dir, origin_dir]) {
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
      config: { S1: { runner: 'claude' }, S2: { runner: 'claude' } },
      slots: 1
    });
    seedQueue(runtime.queueStore, ['S1', 'S2']);

    // First tick fills the single slot in queue order — S1 only.
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

describe('worker e2e — the human [머지] click carries the bead to done', () => {
  test('dispatch → PR observed → pr_wait → [머지] → pr-finish cleanup → done', async () => {
    const HEAD_SHA = 'a'.repeat(40);
    const { runtime, scheduler, bd_record } = buildSystem({
      fixture: 'claude-success.jsonl',
      config: { M1: { runner: 'claude' } },
      slots: 1
    });

    seedQueue(runtime.queueStore, ['M1']);
    await scheduler.tick(WS);

    // The observation verdict moves the bead into `pr_wait` — NOT done. An open
    // PR is not a completion; the merge click is (worker-phase2 §1/§4).
    await waitFor(() =>
      runtime.queueStore.snapshot(WS).pr_wait.some((e) => e.bead_id === 'M1')
    );
    expect(bd_record.status).toBe('resolved');
    expect(runtime.queueStore.snapshot(WS).done).toEqual([]);

    /** @type {Array<[string, number, string|null]>} */
    const gh_calls = [];
    const observations = createPrObservationStore();
    // GitHub's own view of the PR, which only becomes MERGED once the merge
    // command has actually landed it — the cleanup keys off THAT, not off the
    // command's exit status (§6).
    let pr_state = 'OPEN';
    const pr_actions = createPrActions({
      workspace: WS,
      repo: repo_dir,
      store: runtime.queueStore,
      observations,
      gh: {
        prDetail: async (
          /** @type {string} */ _repo,
          /** @type {number} */ number
        ) => ({
          state: 'ok',
          data: {
            number,
            url: 'https://github.com/o/r/pull/1',
            state: pr_state,
            mergeable: 'MERGEABLE',
            merge_state_status: 'CLEAN',
            // Real `gh` always reports a base; the pre-merge base comparison
            // (worker-base-scope-alignment §5) reads it.
            base_ref: 'main',
            head_ref: 'M1',
            head_sha: HEAD_SHA
          }
        }),
        // A repo with no CI and no verify_cmd — §5's third tier, where the
        // click itself is the decision.
        prChecks: async () => ({ state: 'empty' }),
        mergeSquash: async (
          /** @type {string} */ _repo,
          /** @type {number} */ number,
          /** @type {string} */ head_sha
        ) => {
          gh_calls.push(['mergeSquash', number, head_sha]);
          // The squash lands on the base for real, so the cleanup's base sync
          // reads a base that actually moved.
          await gitRun(['push', '-q', 'origin', 'main'], { cwd: repo_dir });
          pr_state = 'MERGED';
          return { state: 'ok', data: { merged: true } };
        },
        updateBranch: async () => ({ state: 'error', reason: 'unexpected' }),
        closePr: async () => ({ state: 'error', reason: 'unexpected' })
      },
      bd: {
        setStatus: async (
          /** @type {string} */ _id,
          /** @type {string} */ status
        ) => {
          bd_record.status = status;
        },
        readStatus: async () => bd_record.status,
        unsetMetadata: async (
          /** @type {string} */ _id,
          /** @type {string} */ key
        ) => {
          delete bd_record.metadata[key];
        },
        readMetadata: async (
          /** @type {string} */ _id,
          /** @type {string} */ key
        ) => bd_record.metadata[key] ?? null,
        listChildren: async () => [],
        // No `export:` label on this bead, so the ship step is a no-op — but the
        // adapter must still expose the capability, or it fails closed.
        readIssue: async (/** @type {string} */ id) => ({
          id,
          status: bd_record.status,
          labels: [],
          metadata: bd_record.metadata
        }),
        ship: async () => ({ status: 'shipped', issue_id: null }),
        removeLabel: async () => {}
      },
      worktree: prActionsWorktree(runtime),
      gitRun,
      scheduler: {
        resolveConflict: async () => ({ ok: false, reason: 'unexpected' }),
        dispatchExternalConflict: async () => ({
          ok: false,
          reason: 'unexpected'
        }),
        tick: async () => {}
      },
      resolveVerify: () => null,
      requeryDelayMs: 0,
      sleep: async () => {}
    });

    const result = await pr_actions.merge('M1');

    expect(result).toMatchObject({ ok: true, action: 'merged', reason: null });
    // The merge was pinned to the sha the click-time gate approved.
    expect(gh_calls).toEqual([['mergeSquash', 1, HEAD_SHA]]);
    // The click's own observation is what the next badge render reads, and it
    // resolves to the tier that enabled the button.
    expect(
      evaluateMergeGate(observations.get(WS, 'M1'), {
        verify_cmd_present: false
      })
    ).toMatchObject({
      enabled: true,
      tier: 'none',
      gate_badge: '검증 신호 없음'
    });

    // pr_wait → done in the cleanup's final mutation, with the contract's close
    // (PR Finish closes) actually applied and no cleanup failure recorded.
    const snap = runtime.queueStore.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).not.toContain('M1');
    expect(snap.done.map((e) => e.bead_id)).toContain('M1');
    expect(snap.cleanup_failed?.M1).toBeUndefined();
    expect(bd_record.status).toBe('closed');
    // Branch cleanup really happened in the git repo.
    expect(
      (
        await gitRun(['rev-parse', '--verify', 'refs/heads/M1'], {
          cwd: repo_dir
        })
      ).code
    ).not.toBe(0);
  });

  test('a cleanup that stops leaves the bead in pr_wait with a durable failure', async () => {
    const { runtime, scheduler, bd_record } = buildSystem({
      fixture: 'claude-success.jsonl',
      config: { M2: { runner: 'claude' } },
      slots: 1
    });

    seedQueue(runtime.queueStore, ['M2']);
    await scheduler.tick(WS);
    await waitFor(() =>
      runtime.queueStore.snapshot(WS).pr_wait.some((e) => e.bead_id === 'M2')
    );

    let pr_state = 'OPEN';
    const pr_actions = createPrActions({
      workspace: WS,
      repo: repo_dir,
      store: runtime.queueStore,
      observations: createPrObservationStore(),
      gh: {
        prDetail: async (
          /** @type {string} */ _repo,
          /** @type {number} */ number
        ) => ({
          state: 'ok',
          data: {
            number,
            url: 'https://github.com/o/r/pull/1',
            state: pr_state,
            mergeable: 'MERGEABLE',
            merge_state_status: 'CLEAN',
            // Real `gh` always reports a base; the pre-merge base comparison
            // (worker-base-scope-alignment §5) reads it.
            base_ref: 'main',
            head_ref: 'M2',
            head_sha: 'b'.repeat(40)
          }
        }),
        prChecks: async () => ({ state: 'empty' }),
        mergeSquash: async () => {
          pr_state = 'MERGED';
          return { state: 'ok', data: { merged: true } };
        },
        updateBranch: async () => ({ state: 'error', reason: 'unexpected' }),
        closePr: async () => ({ state: 'error', reason: 'unexpected' })
      },
      bd: {
        setStatus: async (
          /** @type {string} */ _id,
          /** @type {string} */ status
        ) => {
          bd_record.status = status;
        },
        readStatus: async () => bd_record.status,
        unsetMetadata: async () => {},
        readMetadata: async () => null,
        // bd cannot answer — an unreadable child list STOPS the sweep rather
        // than closing a parent over unknown children (§6).
        listChildren: async () => {
          throw new Error('bd down');
        }
      },
      worktree: prActionsWorktree(runtime),
      gitRun,
      scheduler: {
        resolveConflict: async () => ({ ok: false, reason: 'unexpected' }),
        dispatchExternalConflict: async () => ({
          ok: false,
          reason: 'unexpected'
        }),
        tick: async () => {}
      },
      resolveVerify: () => null,
      requeryDelayMs: 0,
      sleep: async () => {}
    });

    const result = await pr_actions.merge('M2');

    expect(result.ok).toBe(false);
    expect(result.cleanup_step).toBe('child_sweep');
    const snap = runtime.queueStore.snapshot(WS);
    // Returned to the human: still in pr_wait, still `resolved`, banner record
    // written, nothing retried.
    expect(snap.pr_wait.map((e) => e.bead_id)).toContain('M2');
    expect(snap.done.map((e) => e.bead_id)).not.toContain('M2');
    expect(snap.cleanup_failed.M2.step).toBe('child_sweep');
    expect(bd_record.status).toBe('resolved');
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
    seedQueue(runtime.queueStore, ['S1']);

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
      bead_id: 'P1'
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
    seedQueue(runtime.queueStore, ['S1']);

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
      sessionLog: runtime.sessionLog
    });
    runtime.queueStore.setSlots(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      slots: 1
    });
    runtime.setRunningCountProvider(() => scheduler.runningCount());

    seedQueue(runtime.queueStore, ['S1']);
    await scheduler.tick(WS);

    expect(scheduler.runningCount()).toBe(1);
    expect(runtime.status(WS).running_count).toBe(1);

    finishers.forEach((f) => f());
    await waitFor(() => scheduler.runningCount() === 0);
    expect(runtime.status(WS).running_count).toBe(0);
  });
});
