/**
 * Squash-merge verify 정합 e2e (worker-autorun-policy §5, 수용 기준 4·11).
 *
 * The finishing contract mandates SQUASH merges, which sever work-branch
 * ancestry — the retired `merge-base --is-ancestor <work_tip> <base_tip>`
 * check refused every contract-compliant merge (latent
 * `verify_failed:work_not_in_base`). This e2e reproduces that defect on a
 * REAL git fixture and proves the redesigned pipeline passes it:
 *
 *   dispatch → session acquires the merge lock (REAL merge-lock router,
 *   observing mode over the real repo) → real `git merge --squash` commit →
 *   release (server observes the advanced tip, records merge_sha, hands the
 *   lock over) → a second acquirer keeps WAITING during the handover →
 *   session done → SERVER-OBSERVED PR verdict (worker-phase2 §1) → pr_wait →
 *   the handover release unblocks the second acquirer.
 *
 * The merge-lock layer itself survives until Phase 2 deletes it; the completion
 * verdict no longer consults it, so verify is stubbed at its own seam here.
 */
import express from 'express';
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createBreaker } from '../worker/breaker.js';
import { createLockManager } from '../worker/locks.js';
import { createMergeLockRouter } from '../worker/merge-lock-route.js';
import { createQueueStore } from '../worker/queue-store.js';
import { createScheduler } from '../worker/scheduler.js';
import { createSessionLog } from '../worker/session-log.js';
import { createTokenRegistry } from '../worker/session-tokens.js';

const execFileAsync = promisify(execFile);

/** @type {string} */
let tmp_state;
/** @type {string} */
let repo_dir;
/** @type {string} */
let WS;
/** @type {import('node:http').Server} */
let server;
/** @type {string} */
let base_url;

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
      code: typeof e.code === 'number' ? e.code : 1,
      stdout: e.stdout ?? '',
      stderr: e.stderr ?? ''
    };
  }
}

/**
 * @param {() => boolean} pred
 * @param {number} [timeout_ms]
 */
async function waitFor(pred, timeout_ms = 3000) {
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

beforeEach(async () => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-squash-state-'));
  process.env.XDG_STATE_HOME = tmp_state;
  WS = path.join(tmp_state, 'workspace');
  repo_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-squash-repo-'));
  await gitRun(['init', '-q'], { cwd: repo_dir });
  await gitRun(['checkout', '-q', '-b', 'main'], { cwd: repo_dir });
  await gitRun(['config', 'user.email', 'e2e@test'], { cwd: repo_dir });
  await gitRun(['config', 'user.name', 'e2e'], { cwd: repo_dir });
  fs.writeFileSync(path.join(repo_dir, 'f.txt'), 'base\n');
  await gitRun(['add', '.'], { cwd: repo_dir });
  await gitRun(['commit', '-q', '-m', 'base'], { cwd: repo_dir });
});

afterEach(async () => {
  delete process.env.XDG_STATE_HOME;
  if (server) {
    await new Promise((r) => server.close(() => r(undefined)));
  }
  for (const dir of [tmp_state, repo_dir]) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
});

/**
 * @param {Record<string, unknown>} body
 * @param {string} token
 * @returns {Promise<{ status: number, body: any }>}
 */
async function post(body, token) {
  const res = await fetch(base_url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  return { status: res.status, body: await res.json() };
}

describe('worker e2e — squash merge passes the merge_sha verify (수용 기준 4)', () => {
  test('old ancestry check fails on the squash fixture; new pipeline passes it', async () => {
    const store = createQueueStore();
    const breaker = createBreaker();
    const tokens = createTokenRegistry();
    const locks = createLockManager({
      isMergeBlocked: (repo) => breaker.isTripped(repo)
    });

    // REAL merge-lock router in observing mode over the real repo; the
    // observer mirrors the app wiring, keyed to this test's workspace.
    const router = createMergeLockRouter({
      locks,
      tokens,
      breaker,
      gitRun,
      observer: {
        onMergeObserved: ({ attempt_id, merge_sha }) => {
          store.updateAttempt(WS, { attempt_id, patch: { merge_sha } });
        },
        onReleaseRejected: ({ attempt_id, reason }) => {
          store.updateAttempt(WS, {
            attempt_id,
            patch: { release_rejected: reason }
          });
        }
      }
    });
    const app = express();
    app.use('/api/worker/merge-lock', router);
    server = createServer(app);
    await new Promise((r) => server.listen(0, () => r(undefined)));
    const addr = server.address();
    if (!addr || typeof addr === 'string') {
      throw new Error('no address');
    }
    base_url = `http://127.0.0.1:${addr.port}/api/worker/merge-lock`;

    // Fake runner with a controllable done — the test performs the session's
    // git/HTTP work itself, capturing the injected worker token.
    /** @type {(v: any) => void} */
    let finishSession = () => {};
    /** @type {string} */
    let session_token = '';
    const makeRunner = () => ({
      name: 'claude',
      /**
       * @param {any} _bead
       * @param {string} _ws
       * @param {any} settings
       */
      spawn(_bead, _ws, settings) {
        session_token = settings.env.BDUI_WORKER_TOKEN;
        const done = new Promise((res) => {
          finishSession = res;
        });
        return /** @type {any} */ ({
          pid: 4242,
          kill() {},
          events: { on() {} },
          done
        });
      }
    });

    const scheduler = createScheduler({
      store,
      makeRunner,
      bd: /** @type {any} */ ({
        async snapshotBead() {
          return {
            ready: true,
            blocked: false,
            repo: repo_dir,
            target_base: 'main',
            runner: 'claude',
            workflow_mode: null,
            route: null,
            plan_path: null,
            status: '',
            plan_fresh: null,
            deps: []
          };
        },
        async setMetadata() {},
        async unsetMetadata() {},
        async readMetadata() {
          return 'fast_track';
        }
      }),
      worktree: {
        add: async () => ({
          path: path.join(repo_dir, '.wt', 'S1'),
          branch: 'S1',
          base_oid: 'oid'
        }),
        remove: async () => ({ code: 0 }),
        addDetached: async (/** @type {any} */ { name }) => ({
          path: path.join(repo_dir, '.worktrees', name)
        }),
        removeDetached: async () => ({ code: 0 })
      },
      tokens,
      verify: {
        verifyPrSubmitted: async () => ({
          ok: true,
          reason: 'ok',
          pr_url: 'https://github.com/o/r/pull/1'
        })
      },
      breaker,
      sessionLog: createSessionLog(),
      // auto_merge stays (a verify_cmd exists for this workspace); the
      // post-merge run itself passes.
      verifyCmd: () => ({ cmd: ['true'], timeout_ms: 5000 }),
      runVerifyCmd: async () => ({ ok: true, reason: 'ok', exit: 0 }),
      mergeLock: {
        takeHandover: (attempt_id) => router.takeHandover(attempt_id)
      },
      parallel_slots: 1
    });

    // Enqueue + dispatch.
    store.place(WS, { expected_revision: 0, bead_id: 'S1', lane: 'serial' });
    store.setAutoAdvance(WS, true);
    await scheduler.tick(WS);
    expect(scheduler.isRunning('S1')).toBe(true);
    expect(session_token.length).toBeGreaterThan(0);

    // The session acquires the (repo, main) merge lock.
    const acq = await post(
      { repo: repo_dir, target_base: 'main' },
      session_token
    );
    expect(acq.status).toBe(200);

    // Real work branch + CONTRACT-MANDATED squash merge into main.
    const wt = path.join(repo_dir, '.wt', 'S1');
    await gitRun(['worktree', 'add', '-b', 'S1', wt, 'main'], {
      cwd: repo_dir
    });
    fs.writeFileSync(path.join(wt, 'S1.txt'), 'work\n');
    await gitRun(['add', '.'], { cwd: wt });
    await gitRun(['commit', '-q', '-m', 'work S1'], { cwd: wt });
    await gitRun(['merge', '--squash', 'S1'], { cwd: repo_dir });
    await gitRun(['commit', '-q', '-m', 'squash S1'], { cwd: repo_dir });
    await gitRun(['worktree', 'remove', '--force', wt], { cwd: repo_dir });

    const work_tip = (
      await gitRun(['rev-parse', 'S1'], { cwd: repo_dir })
    ).stdout.trim();
    const base_tip = (
      await gitRun(['rev-parse', 'main'], { cwd: repo_dir })
    ).stdout.trim();

    // DEFECT REPRODUCTION: the retired ancestry check refuses this
    // contract-compliant squash merge (work tip is NOT an ancestor of base).
    const anc = await gitRun(
      ['merge-base', '--is-ancestor', work_tip, base_tip],
      { cwd: repo_dir }
    );
    expect(anc.code).not.toBe(0);

    // Release with the session's claimed sha — the server reads the tip
    // itself, verifies advance + claim match, records it, hands over.
    const rel = await post(
      {
        repo: repo_dir,
        target_base: 'main',
        action: 'release',
        merge_sha: base_tip
      },
      session_token
    );
    expect(rel.status).toBe(200);
    expect(rel.body.merge_sha).toBe(base_tip);

    // 수용 기준 11: during the handover a second acquirer keeps waiting.
    const second_token = tokens.issue('att-second', {
      repo: repo_dir,
      bead_id: 'X1',
      target_base: 'main'
    });
    let secondDone = false;
    const secondP = post(
      { repo: repo_dir, target_base: 'main' },
      second_token
    ).then((r) => {
      secondDone = true;
      return r;
    });
    await new Promise((r) => setTimeout(r, 30));
    expect(secondDone).toBe(false);

    // Session exits successfully → policy-aware verify (observed merge_sha +
    // bd closed) → Done → the worker releases the handover.
    finishSession({
      success: true,
      reason: 'ok',
      exit: 0,
      blocked: false,
      events: [],
      raw: []
    });
    await waitFor(() =>
      store
        .snapshot(WS)
        .pr_wait.map((e) => e.bead_id)
        .includes('S1')
    );

    const attempt = /** @type {any} */ (
      Object.values(store.snapshot(WS).attempts)[0]
    );
    expect(attempt.status).toBe('done');
    expect(attempt.done_kind).toBe('pr_stop');
    expect(attempt.merge_sha).toBe(base_tip);
    expect(attempt.verify_result.ok).toBe(true);
    expect(breaker.isTripped(repo_dir)).toBe(false);

    const second = await secondP;
    expect(second.body.acquired).toBe(true);
    vi.restoreAllMocks();
  });
});
