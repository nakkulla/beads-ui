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
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { validateAdmission } from '../worker/admission.js';
import {
  createCompletionActionDriver,
  createCompletionIntentCoordinator,
  decideCompletionAction
} from '../worker/completion-intent.js';
import { createHeadReview } from '../worker/head-review.js';
import { createMergeQueue } from '../worker/merge-queue.js';
import { createPrActions } from '../worker/pr-actions.js';
import { createPrObservationStore } from '../worker/pr-observations.js';
import { createQuickfixLanding } from '../worker/quickfix-landing.js';
import { makeFixtureSpawn } from '../worker/runner/fixture-spawn.js';
import { createRunner } from '../worker/runner/index.js';
import { createWorkerRuntime } from '../worker/runtime.js';
import { createScheduler } from '../worker/scheduler.js';
import { createVerifier } from '../worker/verify.js';

// Waits on REAL child processes (git, node, python), so wall time here is
// process startup under the load the parallel suite creates, not product work.
// Assertions are unchanged; only the waiting budget is sized for that load.
vi.setConfig({ testTimeout: 30_000, hookTimeout: 30_000 });

/** How long a predicate advanced by the REAL git chain may take under load. */
const GIT_CHAIN_WAIT_MS = 15_000;

/** How long a predicate that settles in memory may take. */
const MEMORY_WAIT_MS = 2_000;

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
 * The default is {@link GIT_CHAIN_WAIT_MS} because every predicate here but one
 * is advanced by that chain; a predicate that settles in memory passes its own
 * short budget instead, so no assertion is given more room than it needs.
 *
 * @param {() => boolean} pred
 * @param {number} [timeout_ms]
 */
async function waitFor(pred, timeout_ms = GIT_CHAIN_WAIT_MS) {
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
        description: c.description ?? null,
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
 * @param {{ fixture: string, exit?: number, config: Record<string, any>, prOpen?: boolean, landWork?: boolean, slots?: number, onCompletionAttemptSettled?: (input: any) => Promise<void>|void }} opts
 */
function buildSystem(opts) {
  const runtime = createWorkerRuntime();
  const bd = makeFakeBd(opts.config);
  const pr_open = opts.prOpen ?? true;
  /** @type {{ metadata: Record<string, string>, status: string }} */
  const bd_record = {
    metadata: { route: 'quick_fix' },
    status: 'in_progress'
  };
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
    add: async (
      /** @type {{ bead_id: string, base: string }} */ { bead_id, base }
    ) => {
      // Real branch + (optional) merge so verify's ancestry check is genuine.
      const work_tip = await landWorkBranch(bead_id, land);
      return {
        path: path.join(repo_dir, '.wt', bead_id),
        branch: bead_id,
        // A completion repair supplies an exact pinned SHA. The real worktree
        // adapter returns that cut point, never the new work-branch tip.
        base_oid: /^[0-9a-f]{40}$/i.test(base) ? base : work_tip
      };
    },
    remove: async () => ({ code: 0 })
  };
  const scheduler = createScheduler({
    store: runtime.queueStore,
    execPresetCoordinator: runtime.execPresetCoordinator,
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
    onCompletionAttemptSettled: opts.onCompletionAttemptSettled
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
 * @param {import('../worker/runtime.js').WorkerRuntime} runtime
 */
function prActionsWorktree(runtime) {
  return {
    remove: async () => ({ code: 0 }),
    removeByBranch: async () => ({ ok: true, removed: false, reason: null }),
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

describe('worker e2e — worker-dispatched quick_fix lands without a PR', () => {
  test('enqueue → dispatch → resolved 관측 → landing → done', async () => {
    const bead_id = 'QF-e2e';
    const runtime = createWorkerRuntime();
    const bd = makeFakeBd({
      [bead_id]: {
        runner: 'claude',
        route: 'quick_fix',
        description: '실제 base push 후 Worker landing으로 닫는다.'
      }
    });
    const worktree_path = path.join(repo_dir, '.worktrees', bead_id);
    const fixture_spawn = makeFixtureSpawn({
      file: path.join(FIXTURES, 'claude-success.jsonl')
    });
    /** @type {string|null} */
    let reviewed_sha = null;
    let hook_install_calls = 0;
    let verify_pr_calls = 0;
    let pr_wait_events = 0;
    let config_checks = 0;
    let deploy_calls = 0;

    const worktree = {
      add: async (/** @type {{ bead_id: string, base: string }} */ input) => {
        fs.mkdirSync(path.dirname(worktree_path), { recursive: true });
        const base = await gitRun(['rev-parse', input.base], { cwd: repo_dir });
        if (base.code !== 0) {
          throw new Error(`base resolve failed: ${base.stderr}`);
        }
        const added = await gitRun(
          [
            'worktree',
            'add',
            '-b',
            input.bead_id,
            worktree_path,
            base.stdout.trim()
          ],
          { cwd: repo_dir }
        );
        if (added.code !== 0) {
          throw new Error(`worktree add failed: ${added.stderr}`);
        }
        fs.writeFileSync(path.join(worktree_path, 'quickfix.txt'), 'landed\n');
        const staged = await gitRun(['add', '.'], { cwd: worktree_path });
        const committed = await gitRun(
          ['commit', '-q', '-m', 'quick_fix e2e'],
          { cwd: worktree_path }
        );
        const head = await gitRun(['rev-parse', 'HEAD'], {
          cwd: worktree_path
        });
        const pushed = await gitRun(['push', '-q', 'origin', 'HEAD:main'], {
          cwd: worktree_path
        });
        if (
          staged.code !== 0 ||
          committed.code !== 0 ||
          head.code !== 0 ||
          pushed.code !== 0
        ) {
          throw new Error(
            `quick_fix fixture git failed: ${[
              staged.stderr,
              committed.stderr,
              head.stderr,
              pushed.stderr
            ].join(' ')}`
          );
        }
        reviewed_sha = head.stdout.trim();
        await bd.setMetadata(bead_id, 'impl_review', `codex@${reviewed_sha}`);
        await bd.setStatus(bead_id, 'resolved');
        return {
          path: worktree_path,
          branch: input.bead_id,
          base_oid: base.stdout.trim()
        };
      },
      remove: async () =>
        gitRun(['worktree', 'remove', '--force', worktree_path], {
          cwd: repo_dir
        }),
      pathFor: () => worktree_path,
      exists: () => fs.existsSync(worktree_path),
      removeByBranch: async () => {
        const removed = await gitRun(
          ['worktree', 'remove', '--force', worktree_path],
          { cwd: repo_dir }
        );
        return {
          ok: removed.code === 0,
          removed: removed.code === 0,
          reason: removed.code === 0 ? null : removed.stderr.trim()
        };
      },
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
    const quickfix_landing = createQuickfixLanding({
      workspace: WS,
      repo: repo_dir,
      store: runtime.queueStore,
      // Landing-local: a `readIssue` on the shared fake would switch the
      // scheduler's optional spec-path probe on for every test in this file.
      bd: {
        ...bd,
        readIssue: async (/** @type {string} */ id) => ({
          id,
          status: await bd.readStatus(id)
        })
      },
      gitRun,
      // Landing-local for the same reason: the scheduler treats a present
      // `removeIfDiscardable` as its residue-reclaim seam at dispatch.
      worktree: {
        ...worktree,
        removeIfDiscardable: async () => ({
          ok: false,
          removed: false,
          reason: 'not_exercised'
        })
      },
      repoOperations: {
        hasConfig: async () => {
          config_checks += 1;
          return { ok: true, present: false };
        },
        ensureDeploy: async () => {
          deploy_calls += 1;
          return { ok: false, code: 'unexpected' };
        },
        waitForDeployTerminal: async () => ({
          state: 'failed',
          code: 'unexpected'
        })
      }
    });
    const scheduler = createScheduler({
      store: runtime.queueStore,
      execPresetCoordinator: runtime.execPresetCoordinator,
      makeRunner: (name) =>
        createRunner(name, {
          spawn_impl: fixture_spawn
        }),
      bd,
      worktree,
      admission: {
        validate: (snap, base) =>
          validateAdmission({
            gitRun,
            ghAvailable: async () => true,
            repo: repo_dir,
            base: base ?? snap.target_base,
            bead: snap
          })
      },
      quickfixLanding: quickfix_landing,
      verify: {
        verifyPrSubmitted: async () => {
          verify_pr_calls += 1;
          return { ok: false, reason: 'unexpected' };
        }
      },
      guardHook: {
        install: () => {
          hook_install_calls += 1;
          return { ok: true };
        },
        envFor: () => ({}),
        remove: () => true
      },
      notify: {
        attemptStarted: () => {},
        attemptFailed: () => {},
        prWaitEntered: () => {
          pr_wait_events += 1;
        }
      },
      sessionLog: runtime.sessionLog,
      gitRun
    });
    runtime.queueStore.setSlots(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      slots: 1
    });
    seedQueue(runtime.queueStore, [bead_id]);

    const queued = runtime.queueStore.snapshot(WS);
    expect(queued.queue.map((entry) => entry.bead_id)).toContain(bead_id);

    const inherited_git_config = Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        key.startsWith('GIT_CONFIG_')
      )
    );
    for (const key of Object.keys(inherited_git_config)) {
      delete process.env[key];
    }
    try {
      await scheduler.tick(WS);
      await waitFor(() => fixture_spawn.captured.calls.length === 1);
    } finally {
      Object.assign(process.env, inherited_git_config);
    }

    const dispatched = runtime.queueStore.snapshot(WS);
    const running_attempt = /** @type {any} */ (
      Object.values(dispatched.attempts).find(
        (attempt) => attempt.bead_id === bead_id
      )
    );
    expect(running_attempt.quickfix_lane).toBe(true);
    expect(hook_install_calls).toBe(0);
    expect(fixture_spawn.captured.calls[0].options.env.GIT_CONFIG_COUNT).toBe(
      undefined
    );

    await waitFor(() =>
      runtime.queueStore
        .snapshot(WS)
        .done.some((entry) => entry.bead_id === bead_id)
    );

    const snap = runtime.queueStore.snapshot(WS);
    const attempt = /** @type {any} */ (
      snap.attempts[running_attempt.attempt_id]
    );
    const origin_head = await gitRun(['rev-parse', 'origin/main'], {
      cwd: repo_dir
    });
    const branch = await gitRun(
      ['rev-parse', '--verify', `refs/heads/${bead_id}`],
      { cwd: repo_dir }
    );
    const worktrees = await gitRun(['worktree', 'list', '--porcelain'], {
      cwd: repo_dir
    });
    const bead_snapshot = /** @type {any} */ (await bd.snapshotBead(bead_id));

    expect(reviewed_sha).toMatch(/^[0-9a-f]{40}$/);
    expect(origin_head.stdout.trim()).toBe(reviewed_sha);
    expect(attempt.quickfix_landing).toEqual({
      cursor: 'parent_close',
      head_sha: reviewed_sha,
      reason: null
    });
    expect(attempt.status).toBe('done');
    expect(bd.statuses[bead_id]).toBe('closed');
    expect(await bd.readMetadata(bead_id, 'impl_review')).toBe(
      `codex@${reviewed_sha}`
    );
    expect(bead_snapshot.spec_id).toBeUndefined();
    expect(bead_snapshot.spec_review).toBeUndefined();
    expect(verify_pr_calls).toBe(0);
    expect(pr_wait_events).toBe(0);
    expect(snap.pr_wait).toEqual([]);
    expect(config_checks).toBe(1);
    expect(deploy_calls).toBe(0);
    expect(branch.code).not.toBe(0);
    expect(fs.existsSync(worktree_path)).toBe(false);
    expect(worktrees.stdout).not.toContain(worktree_path);
  });
});

describe('worker e2e — the human [머지] click carries the bead to done', () => {
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
    const merged = await gitRun(['rev-parse', 'origin/main'], {
      cwd: repo_dir
    });
    const merged_sha = merged.stdout.trim();
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
            head_sha: 'b'.repeat(40),
            merged_sha: pr_state === 'MERGED' ? merged_sha : null
          }
        }),
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
        readIssue: async (/** @type {string} */ id) => ({
          id,
          status: bd_record.status,
          metadata: bd_record.metadata
        }),
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
      resolveVerify: async () => ({ state: 'absent' }),
      resolveBase: /** @type {any} */ (
        async () => ({
          ok: true,
          base: 'main',
          base_oid: merged_sha,
          declared: false,
          remote: 'origin',
          remote_ref: 'refs/remotes/origin/main',
          local_only: false
        })
      ),
      repoOperations: /** @type {any} */ ({
        hasConfig: async () => ({ ok: true, present: false })
      }),
      requeryDelayMs: 0,
      sleep: async () => {}
    });

    const result = await pr_actions.merge('M2');

    expect(result).toMatchObject({
      ok: false,
      action: 'merged',
      cleanup_step: 'child_sweep'
    });
    const snap = runtime.queueStore.snapshot(WS);
    // Returned to the human: still in pr_wait, still `resolved`, banner record
    // written, nothing retried.
    expect(snap.pr_wait.map((e) => e.bead_id)).toContain('M2');
    expect(snap.done.map((e) => e.bead_id)).not.toContain('M2');
    expect(snap.cleanup_failed.M2.step).toBe('child_sweep');
    expect(bd_record.status).toBe('resolved');
  });
});

describe('worker e2e — completion intent post-merge recovery', () => {
  test('yields a long resolver, merges the next PR, then prioritizes the late root', async () => {
    const root_bead_id = 'R-long';
    const next_bead_id = 'R-clean';
    const runtime = createWorkerRuntime();
    const store = runtime.queueStore;
    for (const bead_id of [root_bead_id, next_bead_id]) {
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: {
          attempt_id: `initial-${bead_id}`,
          bead_id,
          repo: repo_dir,
          target_base: 'main',
          base_oid: 'b'.repeat(40),
          runner: 'claude',
          status: 'done'
        }
      });
      store.moveToPrWait(WS, {
        bead_id,
        attempt_id: `initial-${bead_id}`,
        patch: { finished_at: 1 }
      });
    }
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const subject = {
      role: /** @type {const} */ ('root'),
      bead_id: root_bead_id,
      pr_url: 'https://github.com/o/r/pull/10',
      head_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      merged_sha: null
    };
    store.enqueueCompletionIntent(WS, {
      root_bead_id,
      source_attempt_id: `initial-${root_bead_id}`,
      target_base: 'main',
      subject
    });
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: next_bead_id }]
    });
    /** @type {string[]} */
    const effects = [];
    /** @type {ReturnType<typeof createCompletionActionDriver>|null} */
    let completion_driver = null;
    const merge_queue = createMergeQueue({
      workspace: WS,
      store,
      now: () => 100,
      resolution_wait_ms: 10,
      setResolutionPollTimer: () => 1,
      probeMergeability: async (bead_id) => {
        const resolution = store.snapshot(WS).attempts['resolution-long'];
        return {
          ok: true,
          kind:
            bead_id === root_bead_id && resolution?.status !== 'done'
              ? /** @type {const} */ ('dirty')
              : /** @type {const} */ ('clean'),
          reason: null,
          head_sha: 'a'.repeat(40),
          base_ref: 'main',
          external: false
        };
      },
      dispatchConflict: async (bead_id, _approved, resolution_wait) => {
        effects.push(`dispatch:${bead_id}`);
        store.appendResolutionAttempt(WS, {
          expected_revision: store.snapshot(WS).revision,
          queue_bead_id: resolution_wait.queue_bead_id,
          subject_bead_id: bead_id,
          wait_ms: resolution_wait.wait_ms,
          attempt: {
            attempt_id: 'resolution-long',
            bead_id,
            status: 'running',
            conflict_resolution: true,
            started_at: 0
          }
        });
        return {
          ok: true,
          action: 'conflict_resolution',
          reason: null,
          attempt_id: 'resolution-long'
        };
      },
      merge: async (bead_id) => {
        effects.push(`merge:${bead_id}`);
        store.moveToDone(WS, { bead_id });
        return { ok: true, action: 'merged', reason: null };
      },
      observePr: async () => ({ state: 'MERGED' }),
      onCompletionResult: async (...args) => {
        await completion_driver?.onMergeResult(...args);
      }
    });
    completion_driver = createCompletionActionDriver({
      workspace: WS,
      store,
      prActions: {
        completionGate: async () => ({
          ok: true,
          target_base: 'main',
          base_sha: subject.base_sha,
          subject,
          verdict: { enabled: true, tier: 'ready', reason: null },
          evidence: {}
        })
      },
      completionRepair: {
        probeOwnership: async () => ({ state: 'pr_owned' }),
        ensureLinkedBead: async () => ({ bead_id: 'unused' })
      },
      scheduler: {
        dispatchCompletionRepair: async () => ({
          ok: false,
          reason: 'unexpected'
        })
      },
      kickMerge: () => merge_queue.kick()
    });
    const current = store.snapshot(WS).completion_intents[root_bead_id];

    await completion_driver.onAction(
      root_bead_id,
      { kind: 'merge_subject' },
      current
    );

    expect(store.snapshot(WS).merge_queue).toMatchObject([
      {
        bead_id: root_bead_id,
        resolution_rounds: 0,
        resolution: { state: 'yielded', attempt_id: 'resolution-long' }
      }
    ]);
    expect(effects).toEqual([
      `dispatch:${root_bead_id}`,
      `merge:${next_bead_id}`
    ]);

    store.updateAttempt(WS, {
      attempt_id: 'resolution-long',
      patch: { status: 'done', finished_at: 101 }
    });
    await merge_queue.kick();

    const queue = store.snapshot(WS);
    expect(effects).toEqual([
      `dispatch:${root_bead_id}`,
      `merge:${next_bead_id}`,
      `merge:${root_bead_id}`
    ]);
    expect(queue.merge_queue).toEqual([]);
    expect(queue.completion_intents[root_bead_id]).toMatchObject({
      phase: 'completed',
      active_op: null,
      terminal_reason: null
    });
  });

  test('paused generic resume settles one root budget then advances the next item', async () => {
    const root_bead_id = 'R-resume';
    const next_bead_id = 'R-next';
    const base = await gitRun(['rev-parse', 'main'], { cwd: repo_dir });
    const base_sha = base.stdout.trim();
    /** @type {ReturnType<typeof createCompletionActionDriver>|null} */
    let completion_driver = null;
    const { runtime, scheduler } = buildSystem({
      fixture: 'claude-success.jsonl',
      config: {
        [root_bead_id]: { runner: 'claude' },
        [next_bead_id]: { runner: 'claude' }
      },
      slots: 1,
      onCompletionAttemptSettled: async (input) => {
        await completion_driver?.onAttemptSettled(input);
      }
    });
    const store = runtime.queueStore;
    for (const bead_id of [root_bead_id, next_bead_id]) {
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: {
          attempt_id: `initial-${bead_id}`,
          bead_id,
          repo: repo_dir,
          target_base: 'main',
          base_oid: base_sha,
          runner: 'claude',
          status: 'done'
        }
      });
      store.moveToPrWait(WS, {
        bead_id,
        attempt_id: `initial-${bead_id}`,
        patch: { finished_at: 1 }
      });
    }
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const old_subject = {
      role: /** @type {const} */ ('root'),
      bead_id: root_bead_id,
      pr_url: 'https://github.com/o/r/pull/1',
      head_sha: 'a'.repeat(40),
      base_sha,
      merged_sha: null
    };
    store.enqueueCompletionIntent(WS, {
      root_bead_id,
      source_attempt_id: `initial-${root_bead_id}`,
      target_base: 'main',
      subject: old_subject
    });
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: next_bead_id }]
    });
    const failure_key = {
      stage: 'merge_gate',
      reason: 'verify_cmd_failed',
      subject_sha: old_subject.head_sha,
      base_sha,
      result_digest: 'c'.repeat(64)
    };
    store.beginRepairOp(WS, {
      root_bead_id,
      op: {
        op_id: 'resume-root-op',
        kind: 'resume_root',
        failure_key,
        attempt_id: 'paused-completion',
        repair_bead_id: null,
        status: 'prepared'
      },
      attempt: {
        attempt_id: 'paused-completion',
        bead_id: root_bead_id,
        repo: repo_dir,
        target_base: 'main',
        base_oid: base_sha,
        runner: 'claude',
        session_id: 'paused-session',
        resumed_from: `initial-${root_bead_id}`,
        status: 'paused',
        completion_root_id: root_bead_id,
        completion_op_id: 'resume-root-op',
        completion_mode: 'resume_root',
        completion_failure_key: failure_key
      }
    });
    const fresh_subject = {
      ...old_subject,
      head_sha: 'd'.repeat(40)
    };
    /** @type {string[]} */
    const merge_calls = [];
    const merge_queue = createMergeQueue({
      workspace: WS,
      store,
      merge: async (bead_id) => {
        merge_calls.push(bead_id);
        store.moveToDone(WS, { bead_id });
        return { ok: true, action: 'merged', reason: null };
      },
      observePr: async () => ({ state: 'MERGED' }),
      onCompletionResult: async (...args) => {
        await completion_driver?.onMergeResult(...args);
      }
    });
    completion_driver = createCompletionActionDriver({
      workspace: WS,
      store,
      prActions: {
        completionGate: async () => ({
          ok: true,
          target_base: 'main',
          base_sha,
          subject: fresh_subject,
          verdict: { enabled: true, tier: 'ready', reason: null },
          evidence: {}
        })
      },
      completionRepair: {
        probeOwnership: async () => ({ state: 'pr_owned' }),
        ensureLinkedBead: async () => ({ bead_id: 'unused' })
      },
      scheduler,
      kickMerge: () => merge_queue.kick()
    });

    const resumed = await scheduler.resume(WS, 'paused-completion');
    await waitFor(
      () =>
        store.snapshot(WS).completion_intents[root_bead_id].phase === 'gating'
    );
    const current = store.snapshot(WS).completion_intents[root_bead_id];
    const fact = await completion_driver.observe(root_bead_id, current);
    const action = decideCompletionAction({
      auto_merge: true,
      intent: current,
      fact
    });
    if (!action) {
      throw new Error('merge action missing');
    }
    await completion_driver.onAction(root_bead_id, action, current);
    await waitFor(() => store.snapshot(WS).merge_queue.length === 0);

    const queue = store.snapshot(WS);
    const resumed_attempt = queue.attempts[String(resumed.attempt_id)];
    expect(resumed.ok).toBe(true);
    expect(resumed_attempt).toMatchObject({
      resumed_from: 'paused-completion',
      completion_root_id: root_bead_id,
      completion_op_id: 'resume-root-op',
      status: 'done'
    });
    expect(merge_calls).toEqual([root_bead_id, next_bead_id]);
    expect(queue.completion_intents[root_bead_id]).toMatchObject({
      phase: 'completed',
      repair_sessions_used: 1
    });
  });

  test('recreates the coordinator and adopts one persisted legacy leaf', async () => {
    const root_bead_id = 'R-legacy';
    const next_bead_id = 'R-legacy-next';
    const runtime = createWorkerRuntime();
    const store = runtime.queueStore;
    for (const bead_id of [root_bead_id, next_bead_id]) {
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: {
          attempt_id: `initial-${bead_id}`,
          bead_id,
          repo: repo_dir,
          target_base: 'main',
          base_oid: 'b'.repeat(40),
          runner: 'claude',
          status: 'done'
        }
      });
      store.moveToPrWait(WS, {
        bead_id,
        attempt_id: `initial-${bead_id}`,
        patch: { finished_at: 1 }
      });
    }
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const subject = {
      role: /** @type {const} */ ('root'),
      bead_id: root_bead_id,
      pr_url: 'https://github.com/o/r/pull/1',
      head_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      merged_sha: null
    };
    store.enqueueCompletionIntent(WS, {
      root_bead_id,
      source_attempt_id: `initial-${root_bead_id}`,
      target_base: 'main',
      subject
    });
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: next_bead_id }]
    });
    const failure_key = {
      stage: 'merge_gate',
      reason: 'verify_cmd_failed',
      subject_sha: subject.head_sha,
      base_sha: subject.base_sha,
      result_digest: 'c'.repeat(64)
    };
    store.beginRepairOp(WS, {
      root_bead_id,
      op: {
        op_id: 'legacy-op',
        kind: 'resume_root',
        failure_key,
        attempt_id: 'legacy-source',
        repair_bead_id: null,
        status: 'prepared'
      },
      attempt: {
        attempt_id: 'legacy-source',
        bead_id: root_bead_id,
        status: 'paused',
        completion_root_id: root_bead_id,
        completion_op_id: 'legacy-op',
        completion_mode: 'resume_root',
        completion_failure_key: failure_key
      }
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'legacy-leaf',
        bead_id: root_bead_id,
        resumed_from: 'legacy-source',
        status: 'done'
      }
    });

    const recovered_store = createWorkerRuntime().queueStore;
    /** @type {string[]} */
    const merge_calls = [];
    /** @type {ReturnType<typeof createCompletionActionDriver>|null} */
    let completion_driver = null;
    const merge_queue = createMergeQueue({
      workspace: WS,
      store: recovered_store,
      merge: async (bead_id) => {
        merge_calls.push(bead_id);
        recovered_store.moveToDone(WS, { bead_id });
        return { ok: true, action: 'merged', reason: null };
      },
      observePr: async () => ({ state: 'MERGED' }),
      onCompletionResult: async (...args) => {
        await completion_driver?.onMergeResult(...args);
      }
    });
    completion_driver = createCompletionActionDriver({
      workspace: WS,
      store: recovered_store,
      prActions: {
        completionGate: async () => ({
          ok: true,
          target_base: 'main',
          base_sha: subject.base_sha,
          subject: { ...subject, head_sha: 'd'.repeat(40) },
          verdict: { enabled: true, tier: 'ready', reason: null },
          evidence: {}
        })
      },
      completionRepair: {
        probeOwnership: async () => ({ state: 'pr_owned' }),
        ensureLinkedBead: async () => ({ bead_id: 'unused' })
      },
      scheduler: {
        dispatchCompletionRepair: async () => ({
          ok: false,
          reason: 'unexpected'
        })
      },
      kickMerge: () => merge_queue.kick()
    });
    const coordinator = createCompletionIntentCoordinator({
      workspace: WS,
      store: recovered_store,
      observe: completion_driver.observe,
      onAction: completion_driver.onAction
    });

    await coordinator.reconcile();
    await coordinator.reconcile();
    await waitFor(() => recovered_store.snapshot(WS).merge_queue.length === 0);

    const queue = recovered_store.snapshot(WS);
    expect(merge_calls).toEqual([root_bead_id, next_bead_id]);
    expect(queue.attempts['legacy-leaf']).toMatchObject({
      completion_root_id: root_bead_id,
      completion_op_id: 'legacy-op'
    });
    expect(queue.completion_intents[root_bead_id]).toMatchObject({
      phase: 'completed',
      repair_sessions_used: 1
    });
    expect(Object.keys(queue.attempts)).toHaveLength(4);
  });

  test('recovers one persisted resolution-timeout root on startup', async () => {
    const root_bead_id = 'beads-456';
    const runtime = createWorkerRuntime();
    const store = runtime.queueStore;
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'beads-456-initial',
        bead_id: root_bead_id,
        repo: repo_dir,
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        runner: 'claude',
        status: 'done'
      }
    });
    store.moveToPrWait(WS, {
      bead_id: root_bead_id,
      attempt_id: 'beads-456-initial',
      patch: { finished_at: 1 }
    });
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const subject = {
      role: /** @type {const} */ ('root'),
      bead_id: root_bead_id,
      pr_url: 'https://github.com/o/r/pull/9',
      head_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      merged_sha: null
    };
    store.enqueueCompletionIntent(WS, {
      root_bead_id,
      source_attempt_id: 'beads-456-initial',
      target_base: 'main',
      subject
    });
    store.terminalizeCompletionIntent(WS, {
      root_bead_id,
      terminal: {
        reason: 'resolution_timeout',
        stage: 'conflict_resolution',
        failure_key: null,
        evidence: 'pre-yield terminal fixture',
        log_path: null,
        at: 1
      }
    });

    const recovered_store = createWorkerRuntime().queueStore;
    /** @type {string[]} */
    const merge_calls = [];
    /** @type {ReturnType<typeof createCompletionActionDriver>|null} */
    let completion_driver = null;
    const merge_queue = createMergeQueue({
      workspace: WS,
      store: recovered_store,
      merge: async (bead_id) => {
        merge_calls.push(bead_id);
        recovered_store.moveToDone(WS, { bead_id });
        return { ok: true, action: 'merged', reason: null };
      },
      observePr: async () => ({ state: 'MERGED' }),
      onCompletionResult: async (...args) => {
        await completion_driver?.onMergeResult(...args);
      }
    });
    completion_driver = createCompletionActionDriver({
      workspace: WS,
      store: recovered_store,
      prActions: {
        completionGate: async () => ({
          ok: true,
          target_base: 'main',
          base_sha: subject.base_sha,
          subject: { ...subject, head_sha: 'c'.repeat(40) },
          verdict: {
            enabled: true,
            tier: 'ready',
            base_badge: '최신',
            reason: null
          },
          evidence: {}
        })
      },
      completionRepair: {
        probeOwnership: async () => ({ state: 'pr_owned' }),
        ensureLinkedBead: async () => ({ bead_id: 'unused' })
      },
      scheduler: {
        dispatchCompletionRepair: async () => ({
          ok: false,
          reason: 'unexpected'
        })
      },
      kickMerge: () => merge_queue.kick()
    });
    const coordinator = createCompletionIntentCoordinator({
      workspace: WS,
      store: recovered_store,
      observe: completion_driver.observe,
      onAction: completion_driver.onAction,
      adoptLegacy: completion_driver.adoptLegacyTimeout
    });

    await coordinator.reconcile();
    await merge_queue.kick();
    await coordinator.reconcile();
    await merge_queue.kick();

    const queue = recovered_store.snapshot(WS);
    expect(merge_calls).toEqual([root_bead_id]);
    expect(queue.merge_queue).toEqual([]);
    expect(queue.completion_intents[root_bead_id]).toMatchObject({
      phase: 'completed',
      active_op: null,
      terminal_reason: null,
      subject: { head_sha: 'c'.repeat(40) }
    });
    expect(Object.keys(queue.attempts)).toEqual(['beads-456-initial']);
  });

  test('cleanup resolution stays on root and creates no repair Bead', async () => {
    const root_bead_id = 'R1';
    const base = await gitRun(['rev-parse', 'main'], { cwd: repo_dir });
    const base_sha = base.stdout.trim();
    const { runtime } = buildSystem({
      fixture: 'claude-success.jsonl',
      config: { [root_bead_id]: { runner: 'claude' } },
      slots: 1
    });
    const store = runtime.queueStore;
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'root-attempt',
        bead_id: root_bead_id,
        repo: repo_dir,
        target_base: 'main',
        base_oid: base_sha,
        runner: 'claude',
        model: 'opus',
        effort: 'high',
        status: 'done',
        finished_at: 1
      }
    });
    store.moveToPrWait(WS, {
      bead_id: root_bead_id,
      attempt_id: 'root-attempt',
      patch: {}
    });
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const root_subject = {
      role: /** @type {const} */ ('root'),
      bead_id: root_bead_id,
      pr_url: 'https://github.com/o/r/pull/1',
      head_sha: base_sha,
      base_sha,
      merged_sha: base_sha
    };
    store.enqueueCompletionIntent(WS, {
      root_bead_id,
      source_attempt_id: 'root-attempt',
      target_base: 'main',
      subject: root_subject
    });
    store.setCompletionSubject(WS, {
      root_bead_id,
      phase: 'cleaning',
      subject: root_subject
    });
    store.recordCleanupFailure(WS, {
      bead_id: root_bead_id,
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed',
      output_tail: 'post-merge regression'
    });

    let cleanup_replays = 0;
    let linked_bead_calls = 0;
    let dispatch_calls = 0;
    const completion_driver = createCompletionActionDriver({
      workspace: WS,
      store,
      prActions: {
        completionGate: async () => {
          throw new Error('completion gate must not run during cleanup');
        },
        resumeCompletionCleanup: async () => {
          cleanup_replays += 1;
          store.moveToDone(WS, { bead_id: root_bead_id });
          return { ok: true, step: null, reason: null };
        }
      },
      completionRepair: {
        probeOwnership: async () => ({ state: 'base_owned' }),
        ensureLinkedBead: async () => {
          linked_bead_calls += 1;
          return { bead_id: 'R1-repair' };
        }
      },
      scheduler: {
        dispatchCompletionRepair: async () => {
          dispatch_calls += 1;
          return { ok: true };
        }
      }
    });

    let current = store.snapshot(WS).completion_intents[root_bead_id];
    const cleanup_fact = await completion_driver.observe(root_bead_id, current);
    const waiting_action = decideCompletionAction({
      auto_merge: true,
      intent: current,
      fact: cleanup_fact
    });

    expect(waiting_action).toBe(null);
    expect(linked_bead_calls).toBe(0);
    expect(dispatch_calls).toBe(0);

    store.clearCleanupFailure(WS, root_bead_id);
    current = store.snapshot(WS).completion_intents[root_bead_id];
    const cleanup_pending = await completion_driver.observe(
      root_bead_id,
      current
    );
    const retry_action = decideCompletionAction({
      auto_merge: true,
      intent: current,
      fact: cleanup_pending
    });
    if (!retry_action) {
      throw new Error('cleanup retry action missing');
    }
    await completion_driver.onAction(root_bead_id, retry_action, current);

    await waitFor(
      () =>
        store.snapshot(WS).completion_intents[root_bead_id].phase ===
        'completed'
    );
    const queue = store.snapshot(WS);
    expect(retry_action).toEqual({ kind: 'retry_cleanup' });
    expect(cleanup_replays).toBe(1);
    expect(queue.completion_intents[root_bead_id]).toMatchObject({
      phase: 'completed',
      repair_sessions_used: 0,
      repair_bead_ids: [],
      active_op: null
    });
    expect(queue.done.map((entry) => entry.bead_id)).toContain(root_bead_id);
    expect(Object.values(queue.attempts)).toHaveLength(1);
  });
});

describe('worker e2e — manual continuation under auto_merge=false (UI-58w8)', () => {
  const OLD_HEAD = 'a'.repeat(40);
  const NEW_HEAD = 'b'.repeat(40);

  /**
   * A pr_wait bead with a spec-backed record whose `impl_review` is bound to
   * OLD_HEAD while the observed PR head is NEW_HEAD — the exact
   * `review_receipt_stale` state the UI-wv97 incident froze in.
   *
   * @param {import('../worker/runtime.js').WorkerRuntime} runtime
   */
  function seedStaleReviewed(runtime) {
    runtime.queueStore.appendAttempt(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      attempt: {
        attempt_id: 'att-M2',
        bead_id: 'M2',
        repo: repo_dir,
        target_base: 'main',
        finished_at: 1,
        verify_result: {
          ok: true,
          pr_url: 'https://github.com/o/r/pull/1',
          pr_number: 1
        }
      }
    });
    runtime.queueStore.moveToPrWait(WS, {
      bead_id: 'M2',
      attempt_id: 'att-M2',
      patch: { status: 'done', finished_at: 1 }
    });
  }

  /**
   * @param {import('../worker/runtime.js').WorkerRuntime} runtime
   * @param {{ metadata: Record<string, string>, status: string }} bd_record
   * @param {{ pr_state: string, merged_sha: string, squash_calls: string[] }} world
   */
  function buildPrActions(runtime, bd_record, world) {
    return createPrActions({
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
            state: world.pr_state,
            mergeable: 'MERGEABLE',
            merge_state_status: 'CLEAN',
            base_ref: 'main',
            head_ref: 'M2',
            head_sha: NEW_HEAD,
            merged_sha: world.pr_state === 'MERGED' ? world.merged_sha : null
          }
        }),
        mergeSquash: async () => {
          world.squash_calls.push(NEW_HEAD);
          world.pr_state = 'MERGED';
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
        readIssue: async (/** @type {string} */ id) => ({
          id,
          status: bd_record.status,
          spec_id: 'docs/spec.md',
          metadata: bd_record.metadata
        }),
        listChildren: async () => []
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
      resolveVerify: async () => ({ state: 'absent' }),
      resolveBase: /** @type {any} */ (
        async () => ({
          ok: true,
          base: 'main',
          base_oid: world.merged_sha,
          declared: false,
          remote: 'origin',
          remote_ref: 'refs/remotes/origin/main',
          local_only: false
        })
      ),
      repoOperations: /** @type {any} */ ({
        hasConfig: async () => ({ ok: true, present: false })
      }),
      requeryDelayMs: 0,
      sleep: async () => {}
    });
  }

  /**
   * @param {import('../worker/runtime.js').WorkerRuntime} runtime
   * @param {ReturnType<typeof buildPrActions>} pr_actions
   * @param {{ metadata: Record<string, string>, status: string }} bd_record
   * @param {{ review_calls: any[] }} record
   */
  function buildManualDriver(runtime, pr_actions, bd_record, record) {
    const head_review = createHeadReview({
      workspace: WS,
      store: runtime.queueStore,
      selectReviewer: async () => ({
        ok: true,
        reviewer: 'codex',
        effort: 'xhigh'
      }),
      readReceipt: async () => {
        const raw = bd_record.metadata.impl_review || '';
        const m = /^([^@\s]+)@([0-9a-f]{40})$/i.exec(raw);
        return m ? { actor: m[1], head_sha: m[2].toLowerCase(), raw } : null;
      },
      lineage: async () => ({ queue_owned: true }),
      runReview: async (/** @type {any} */ packet) => {
        record.review_calls.push(packet);
        return { ok: true, verdict: 'APPROVE' };
      },
      writeReceipt: async (
        /** @type {string} */ _bead_id,
        /** @type {string} */ receipt
      ) => {
        bd_record.metadata.impl_review = receipt;
        return { ok: true, readback: receipt };
      },
      observeHead: async () => NEW_HEAD,
      runRepair: async () => ({ ok: false, reason: 'unexpected' })
    });
    return createMergeQueue({
      workspace: WS,
      store: runtime.queueStore,
      merge: (/** @type {string} */ bead_id) =>
        pr_actions.merge(bead_id, { allow_conflict_resolution: false }),
      probeMergeability: (/** @type {string} */ bead_id) =>
        pr_actions.probeMergeability(bead_id),
      observePr: (/** @type {string} */ bead_id) => pr_actions.prState(bead_id),
      headReview: head_review,
      headSha: () => NEW_HEAD,
      setResolutionPollTimer: () => 1
    });
  }

  test('manual click → stale receipt → automatic review → exactly-once merge', async () => {
    const runtime = createWorkerRuntime();
    /** @type {{ metadata: Record<string, string>, status: string }} */
    const bd_record = {
      metadata: {
        route: 'spec_backed',
        spec_review: `codex@${OLD_HEAD}`,
        impl_review: `codex@${OLD_HEAD}`
      },
      status: 'resolved'
    };
    seedStaleReviewed(runtime);
    const merged = await gitRun(['rev-parse', 'main'], { cwd: repo_dir });
    /** @type {{ pr_state: string, merged_sha: string, squash_calls: string[] }} */
    const world = {
      pr_state: 'OPEN',
      merged_sha: merged.stdout.trim(),
      squash_calls: []
    };
    const pr_actions = buildPrActions(runtime, bd_record, world);
    /** @type {{ review_calls: any[] }} */
    const record = { review_calls: [] };
    const mq = buildManualDriver(runtime, pr_actions, bd_record, record);
    const enqueue = runtime.queueStore.enqueueMergeManual(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      entries: [{ bead_id: 'M2', head_sha: NEW_HEAD, target_base: 'main' }]
    });
    expect(enqueue.ok).toBe(true);
    expect(runtime.queueStore.snapshot(WS).auto_merge).toBe(false);

    await mq.kick();

    // Exactly one automatic review of the moved head, receipt written and
    // bound, then exactly one pinned-head squash merge — under a FALSE global
    // toggle throughout.
    expect(record.review_calls).toHaveLength(1);
    expect(record.review_calls[0].head_sha).toBe(NEW_HEAD);
    expect(bd_record.metadata.impl_review).toBe(`codex@${NEW_HEAD}`);
    expect(world.squash_calls).toEqual([NEW_HEAD]);
    expect(runtime.queueStore.snapshot(WS).merge_queue).toEqual([]);
  });

  test('cancel during the review makes the late approval a no-op', async () => {
    const runtime = createWorkerRuntime();
    /** @type {{ metadata: Record<string, string>, status: string }} */
    const bd_record = {
      metadata: {
        route: 'spec_backed',
        spec_review: `codex@${OLD_HEAD}`,
        impl_review: `codex@${OLD_HEAD}`
      },
      status: 'resolved'
    };
    seedStaleReviewed(runtime);
    const merged = await gitRun(['rev-parse', 'main'], { cwd: repo_dir });
    /** @type {{ pr_state: string, merged_sha: string, squash_calls: string[] }} */
    const world = {
      pr_state: 'OPEN',
      merged_sha: merged.stdout.trim(),
      squash_calls: []
    };
    const pr_actions = buildPrActions(runtime, bd_record, world);
    const head_review = createHeadReview({
      workspace: WS,
      store: runtime.queueStore,
      selectReviewer: async () => ({
        ok: true,
        reviewer: 'codex',
        effort: 'xhigh'
      }),
      readReceipt: async () => null,
      lineage: async () => ({ queue_owned: true }),
      runReview: async () => {
        // The user clicks [취소] while the reviewer is still out.
        runtime.queueStore.cancelMerge(WS, {
          expected_revision: runtime.queueStore.snapshot(WS).revision,
          bead_id: 'M2'
        });
        return { ok: true, verdict: 'APPROVE' };
      },
      writeReceipt: async (
        /** @type {string} */ _bead_id,
        /** @type {string} */ receipt
      ) => {
        bd_record.metadata.impl_review = receipt;
        return { ok: true, readback: receipt };
      },
      observeHead: async () => NEW_HEAD,
      runRepair: async () => ({ ok: false, reason: 'unexpected' })
    });
    const mq = createMergeQueue({
      workspace: WS,
      store: runtime.queueStore,
      merge: (/** @type {string} */ bead_id) =>
        pr_actions.merge(bead_id, { allow_conflict_resolution: false }),
      probeMergeability: (/** @type {string} */ bead_id) =>
        pr_actions.probeMergeability(bead_id),
      observePr: (/** @type {string} */ bead_id) => pr_actions.prState(bead_id),
      headReview: head_review,
      headSha: () => NEW_HEAD,
      setResolutionPollTimer: () => 1
    });
    runtime.queueStore.enqueueMergeManual(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      entries: [{ bead_id: 'M2', head_sha: NEW_HEAD, target_base: 'main' }]
    });

    await mq.kick();

    // The cancelled authority's late approval writes no receipt and merges
    // nothing; the queue stays empty.
    expect(world.squash_calls).toEqual([]);
    expect(bd_record.metadata.impl_review).toBe(`codex@${OLD_HEAD}`);
    expect(runtime.queueStore.snapshot(WS).merge_queue).toEqual([]);
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
      execPresetCoordinator: runtime.execPresetCoordinator,
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
    await waitFor(() => scheduler.runningCount() === 0, MEMORY_WAIT_MS);
    expect(runtime.status(WS).running_count).toBe(0);
  });
});
