/**
 * The PR-wait actions (worker-phase2 §6 · plan Test scope P5).
 *
 * `gh` is fully mocked here — this suite never reaches the network and never
 * merges anything real. What it holds down:
 *
 *   - the click's three branches (CLEAN / BEHIND / DIRTY) and what each calls,
 *   - that a head SHA which moved between render and click re-opens the gate,
 *     that a stale green does not pass, and that an empty cache (restart)
 *     VERIFIES rather than passing,
 *   - the cleanup ORDER (asserted as a sequence, not just an end state), its
 *     mid-sequence failure behaviour, and that the externally-observed MERGED
 *     trigger runs the identical path,
 *   - the [재실행] transition, step by step and in order, and that the poller
 *     cannot publish a rerun's own close as an abandonment.
 */
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createPrActions } from './pr-actions.js';
import { createPrObservationStore } from './pr-observations.js';
import { createPrPoller } from './pr-poller.js';
import { createQueueStore } from './queue-store.js';
import { createScheduler } from './scheduler.js';

const WS = '/tmp/example-workspace/project-p5';
const REPO = '/tmp/example-workspace/project-p5';
const BEAD = 'UI-1';

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-pract-'));
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
 * One PR detail shape, with the fields the branch logic reads.
 *
 * @param {Partial<import('./gh.js').PrDetail>} [over]
 * @returns {import('./gh.js').PrDetail}
 */
function prOf(over = {}) {
  return {
    number: 304,
    url: 'https://github.com/o/r/pull/304',
    state: 'OPEN',
    mergeable: 'MERGEABLE',
    merge_state_status: 'CLEAN',
    head_ref: BEAD,
    head_sha: 'sha-aaa',
    ...over
  };
}

/**
 * A queue store seeded with a `pr_wait` bead whose attempt records the PR.
 *
 * @param {{ cleanup_failed?: Record<string, any> }} [options]
 */
function seedStore(options = {}) {
  const store = createQueueStore();
  store.appendAttempt(WS, {
    expected_revision: store.snapshot(WS).revision,
    attempt: { attempt_id: 'a1', bead_id: BEAD }
  });
  store.updateAttempt(WS, {
    attempt_id: 'a1',
    patch: {
      repo: REPO,
      target_base: 'main',
      session_id: 'sess-1',
      finished_at: 10,
      verify_result: /** @type {any} */ ({
        ok: true,
        pr_url: 'https://github.com/o/r/pull/304',
        pr_number: 304
      })
    }
  });
  store.moveToPrWait(WS, {
    bead_id: BEAD,
    attempt_id: 'a1',
    patch: { status: 'done' }
  });
  if (options.cleanup_failed) {
    for (const [bead_id, rec] of Object.entries(options.cleanup_failed)) {
      store.recordCleanupFailure(WS, {
        bead_id,
        step: rec.step,
        reason: rec.reason
      });
    }
  }
  return store;
}

/**
 * Build the action module over fakes, recording EVERY outward call on one
 * shared ordered log — which is what lets a test assert the cleanup sequence
 * rather than only its outcome.
 *
 * @param {{
 *   details?: any[],
 *   checks?: any,
 *   store?: any,
 *   verify?: { cmd: string[], timeout_ms: number, source: 'config' }|null,
 *   verifyResults?: Array<{ ok: boolean, reason: string }>,
 *   gitFail?: (args: string[]) => boolean,
 *   children?: Record<string, { id: string, status: string }[]>,
 *   bdFail?: (method: string, id: string) => boolean,
 *   mergeFails?: boolean,
 *   afterMerge?: any,
 *   worktreeExists?: boolean,
 *   resolveConflictResult?: any
 * }} [options]
 */
function makeActions(options = {}) {
  /** @type {string[]} */
  const calls = [];
  const store = options.store || seedStore();
  const observations = createPrObservationStore();

  const details = options.details || [prOf()];
  let detail_i = 0;
  // What GitHub reports about the PR once OUR merge command has returned zero.
  // The default is the ordinary case (it really merged); a test overrides it to
  // model a merge queue that only ENQUEUED the PR, or an unreadable re-check.
  let merge_issued = false;
  const after_merge = Object.hasOwn(options, 'afterMerge')
    ? options.afterMerge
    : { state: 'ok', data: prOf({ state: 'MERGED' }) };
  const gh = {
    prDetail: vi.fn(async () => {
      calls.push(`gh:prDetail`);
      if (merge_issued) {
        return after_merge;
      }
      const d = details[Math.min(detail_i, details.length - 1)];
      detail_i += 1;
      return d.state === 'error' ? d : { state: 'ok', data: d };
    }),
    prChecks: vi.fn(async () => {
      calls.push('gh:prChecks');
      return options.checks || { state: 'empty' };
    }),
    mergeSquash: vi.fn(async () => {
      calls.push('gh:mergeSquash');
      if (options.mergeFails) {
        return { state: 'error', reason: 'gh_failed' };
      }
      merge_issued = true;
      return { state: 'ok', data: true };
    }),
    updateBranch: vi.fn(async () => {
      calls.push('gh:updateBranch');
      return { state: 'ok', data: true };
    }),
    closePr: vi.fn(async () => {
      calls.push('gh:closePr');
      return { state: 'ok', data: true };
    })
  };

  const children = options.children || {};
  const bd = {
    setStatus: vi.fn(async (/** @type {string} */ id, s) => {
      calls.push(`bd:setStatus:${id}:${s}`);
      if (options.bdFail && options.bdFail('setStatus', id)) {
        throw new Error('bd down');
      }
    }),
    readStatus: vi.fn(async (/** @type {string} */ id) => {
      calls.push(`bd:readStatus:${id}`);
      return bd_status.get(id) ?? 'closed';
    }),
    unsetMetadata: vi.fn(async (/** @type {string} */ id, k) => {
      calls.push(`bd:unsetMetadata:${id}:${k}`);
    }),
    readMetadata: vi.fn(async (/** @type {string} */ id, k) => {
      calls.push(`bd:readMetadata:${id}:${k}`);
      return null;
    }),
    listChildren: vi.fn(async (/** @type {string} */ id) => {
      calls.push(`bd:listChildren:${id}`);
      return children[id] || [];
    })
  };
  /** @type {Map<string, string>} */
  const bd_status = new Map();

  const worktree = {
    remove: vi.fn(async () => {
      calls.push('wt:remove');
      return { code: 0, stderr: '' };
    }),
    exists: vi.fn(() => options.worktreeExists === true),
    // The repo topology lock, recorded on the SAME ordered log as the git and
    // worktree calls so a test can assert which commands run inside it.
    withTopologyLock: vi.fn(
      async (/** @type {string} */ _repo, /** @type {any} */ fn) => {
        calls.push('lock:acquire');
        try {
          return await fn();
        } finally {
          calls.push('lock:release');
        }
      }
    )
  };

  const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
    calls.push(`git:${args.slice(0, 2).join(' ')}`);
    if (options.gitFail && options.gitFail(args)) {
      return { code: 1, stdout: '', stderr: 'boom' };
    }
    if (args[0] === 'rev-parse' && args[1] === 'origin/main') {
      return { code: 0, stdout: 'base-sha-1\n', stderr: '' };
    }
    if (args[0] === 'rev-parse' && args[1] === '--abbrev-ref') {
      return { code: 0, stdout: 'feature\n', stderr: '' };
    }
    if (args[0] === 'ls-remote') {
      return { code: 0, stdout: '', stderr: '' };
    }
    return { code: 0, stdout: '', stderr: '' };
  });

  const scheduler = {
    resolveConflict: vi.fn(async () => {
      calls.push('sched:resolveConflict');
      return options.resolveConflictResult || { ok: true, attempt_id: 'a2' };
    }),
    tick: vi.fn(async () => {
      calls.push('sched:tick');
    })
  };

  const verify_results = options.verifyResults || [{ ok: true, reason: 'ok' }];
  let verify_i = 0;
  const runVerify = vi.fn(async () => {
    calls.push('verify:run');
    const r = verify_results[Math.min(verify_i, verify_results.length - 1)];
    verify_i += 1;
    return { ...r, exit: r.ok ? 0 : 1 };
  });

  const actions = createPrActions({
    workspace: WS,
    repo: REPO,
    store,
    gh,
    observations,
    bd,
    worktree,
    gitRun,
    scheduler,
    resolveVerify: () => options.verify ?? null,
    runVerify,
    requeryDelayMs: 0,
    sleep: async () => {},
    now: () => 1000
  });

  return {
    actions,
    calls,
    store,
    observations,
    gh,
    bd,
    bd_status,
    worktree,
    gitRun,
    scheduler,
    runVerify
  };
}

describe('merge click — the three branches (worker-phase2 §6)', () => {
  test('squash-merges a CLEAN pull request', async () => {
    const h = makeActions({ details: [prOf({ merge_state_status: 'CLEAN' })] });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, action: 'merged', reason: null });
    // Pinned to the gated head — a push landing mid-click cannot slip in.
    expect(h.gh.mergeSquash).toHaveBeenCalledWith(REPO, 304, 'sha-aaa');
    expect(h.gh.updateBranch).not.toHaveBeenCalled();
    expect(h.scheduler.resolveConflict).not.toHaveBeenCalled();
  });

  test('updates the branch, re-checks, then merges a BEHIND pull request', async () => {
    const h = makeActions({
      details: [
        prOf({ merge_state_status: 'BEHIND' }),
        prOf({ merge_state_status: 'CLEAN', head_sha: 'sha-bbb' })
      ]
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, action: 'updated_and_merged' });
    expect(h.calls.filter((c) => c.startsWith('gh:'))).toEqual([
      'gh:prDetail',
      'gh:prChecks',
      'gh:updateBranch',
      'gh:prDetail',
      'gh:prChecks',
      'gh:mergeSquash',
      // The merge is CONFIRMED by re-reading the PR before any cleanup runs.
      'gh:prDetail'
    ]);
  });

  test('dispatches a conflict-resolution session for a DIRTY pull request without merging', async () => {
    const h = makeActions({
      details: [prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' })]
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: true,
      action: 'conflict_resolution',
      attempt_id: 'a2'
    });
    expect(h.scheduler.resolveConflict).toHaveBeenCalledWith(WS, BEAD);
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('refuses without merging when the click-time gate is red', async () => {
    const h = makeActions({
      checks: {
        state: 'ok',
        data: [{ name: 'ci', conclusion: 'fail' }]
      }
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      action: 'refused',
      reason: 'ci_failed'
    });
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('refuses a merge whose gh call fails, and never cleans up', async () => {
    const h = makeActions({ mergeFails: true });

    const r = await h.actions.merge(BEAD);

    expect(r.ok).toBe(false);
    expect(r.reason).toBe('merge_failed:gh_failed');
    expect(h.calls).not.toContain('bd:setStatus:UI-1:closed');
  });
});

describe('merge click — a zero exit is not a merge (§6)', () => {
  test('leaves the bead in pr_wait when a merge queue only enqueued the PR', async () => {
    // `gh pr merge` returned 0, but GitHub still reports the PR OPEN: a merge
    // queue accepted it and will land it later. Cleaning up here would close the
    // bead and delete both branches out from under a live PR.
    const h = makeActions({ afterMerge: { state: 'ok', data: prOf() } });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: true,
      action: 'merge_unconfirmed',
      reason: 'merge_pending'
    });
    expect(h.gh.mergeSquash).toHaveBeenCalled();
    expect(h.calls).not.toContain('bd:setStatus:UI-1:closed');
    expect(h.worktree.remove).not.toHaveBeenCalled();
    const q = h.store.snapshot(WS);
    expect(q.pr_wait.map((/** @type {any} */ e) => e.bead_id)).toEqual([BEAD]);
    expect(q.done).toEqual([]);
    // Nothing is recorded as a cleanup FAILURE either — the poller finishes it
    // when it observes the real MERGED.
    expect(q.cleanup_failed[BEAD]).toBeUndefined();
  });

  test('refuses to clean up when the post-merge re-read cannot be completed', async () => {
    const h = makeActions({
      afterMerge: { state: 'error', reason: 'gh_failed' }
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      action: 'merge_unconfirmed',
      reason: 'merge_state_unconfirmed:gh_failed'
    });
    expect(h.calls).not.toContain('bd:setStatus:UI-1:closed');
    expect(
      h.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('cleans up once the re-read observes MERGED', async () => {
    const h = makeActions();

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, action: 'merged' });
    expect(
      h.store.snapshot(WS).done.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });
});

describe('merge click — click-time SHA re-evaluation (§5/§6)', () => {
  const VERIFY = {
    cmd: ['npm', 'test'],
    timeout_ms: 1000,
    source: /** @type {const} */ ('config')
  };

  test('re-runs local verification when the head SHA moved past a cached green', async () => {
    const h = makeActions({
      verify: VERIFY,
      details: [prOf({ head_sha: 'sha-new' })]
    });
    // A green earned on the PREVIOUS head — exactly the stale green §5 refuses.
    h.observations.recordVerify(WS, BEAD, {
      head_sha: 'sha-old',
      ok: true,
      reason: 'ok',
      at: 1
    });

    const r = await h.actions.merge(BEAD);

    // The FIRST run is the click-time one, pinned to the sha just read.
    expect(/** @type {any} */ (h.runVerify).mock.calls[0][0]).toMatchObject({
      sha: 'sha-new'
    });
    expect(h.calls.indexOf('verify:run')).toBeLessThan(
      h.calls.indexOf('gh:mergeSquash')
    );
    expect(r).toMatchObject({ ok: true, action: 'merged' });
  });

  test('does not merge on a stale green when the fresh verification is red', async () => {
    const h = makeActions({
      verify: VERIFY,
      details: [prOf({ head_sha: 'sha-new' })],
      verifyResults: [{ ok: false, reason: 'verify_cmd_failed' }]
    });
    h.observations.recordVerify(WS, BEAD, {
      head_sha: 'sha-old',
      ok: true,
      reason: 'ok',
      at: 1
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      action: 'refused',
      reason: 'verify_cmd_failed'
    });
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('verifies rather than passing when the cache is empty (restart)', async () => {
    const h = makeActions({ verify: VERIFY });

    const r = await h.actions.merge(BEAD);

    // Nothing was cached, so the gate could not have passed on a prior result:
    // a verification ran BEFORE the merge.
    expect(h.calls.indexOf('verify:run')).toBeGreaterThanOrEqual(0);
    expect(h.calls.indexOf('verify:run')).toBeLessThan(
      h.calls.indexOf('gh:mergeSquash')
    );
    expect(/** @type {any} */ (h.runVerify).mock.calls[0][0]).toMatchObject({
      sha: 'sha-aaa'
    });
    expect(r.ok).toBe(true);
  });

  test('re-evaluates the gate against the NEW SHA the branch update produced', async () => {
    const h = makeActions({
      verify: VERIFY,
      details: [
        prOf({ merge_state_status: 'BEHIND', head_sha: 'sha-old' }),
        prOf({ merge_state_status: 'CLEAN', head_sha: 'sha-updated' })
      ]
    });

    await h.actions.merge(BEAD);

    // Two click-time runs: one on the sha as read, one on the sha the branch
    // update produced. The third is the post-merge run, pinned to the base.
    const shas = /** @type {any[]} */ (
      /** @type {any} */ (h.runVerify).mock.calls
    )
      .slice(0, 2)
      .map((c) => c[0].sha);
    expect(shas).toEqual(['sha-old', 'sha-updated']);
  });
});

describe('post-merge cleanup — the pr-finish contract ORDER (§6)', () => {
  test('runs base sync → verification → child sweep → parent close → branch cleanup → done', async () => {
    const h = makeActions({
      verify: {
        cmd: ['npm', 'test'],
        timeout_ms: 1000,
        source: /** @type {const} */ ('config')
      },
      children: {
        [BEAD]: [{ id: 'UI-1.1', status: 'open' }],
        'UI-1.1': [{ id: 'UI-1.1.1', status: 'open' }]
      }
    });

    await h.actions.merge(BEAD);

    // The SEQUENCE, not the end state: every step appears exactly once and in
    // the contract's order, with the deepest child closed before its parent and
    // the parent bead closed before anything is deleted.
    const ordered = h.calls.filter(
      (c) =>
        c === 'gh:mergeSquash' ||
        c === 'git:fetch --no-tags' ||
        c === 'verify:run' ||
        c.startsWith('bd:setStatus') ||
        c === 'wt:remove' ||
        c === 'git:branch -D' ||
        c === 'git:push origin'
    );
    expect(ordered).toEqual([
      // The click-time gate verification precedes the merge; the post-merge one
      // follows the base sync. Same command, different moments — and the
      // ordering between them is the whole point.
      'verify:run',
      'gh:mergeSquash',
      'git:fetch --no-tags',
      'verify:run',
      'bd:setStatus:UI-1.1.1:closed',
      'bd:setStatus:UI-1.1:closed',
      'bd:setStatus:UI-1:closed',
      'wt:remove',
      'git:branch -D',
      'git:push origin'
    ]);
    expect(
      h.store.snapshot(WS).done.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
    expect(h.store.snapshot(WS).pr_wait).toEqual([]);
  });

  test('stops mid-sequence on a failed post-merge verification, leaving a durable record and no bd close', async () => {
    const h = makeActions({
      verify: {
        cmd: ['npm', 'test'],
        timeout_ms: 1000,
        source: /** @type {const} */ ('config')
      },
      // 1st run = the pre-merge gate (green), 2nd = the post-merge run (red).
      verifyResults: [
        { ok: true, reason: 'ok' },
        { ok: false, reason: 'verify_cmd_failed' }
      ]
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'post_merge_verify',
      reason: 'verify_cmd_failed'
    });
    const q = h.store.snapshot(WS);
    expect(q.cleanup_failed[BEAD]).toMatchObject({
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed'
    });
    // The bead stays in `pr_wait` (bd untouched ⇒ still `resolved`), and the
    // later steps never ran.
    expect(q.pr_wait.map((/** @type {any} */ e) => e.bead_id)).toEqual([BEAD]);
    expect(q.done).toEqual([]);
    expect(h.calls).not.toContain('bd:setStatus:UI-1:closed');
    expect(h.worktree.remove).not.toHaveBeenCalled();
  });

  test('survives a restart: the cleanup failure is reloaded from queue.json', async () => {
    const h = makeActions({
      verify: {
        cmd: ['npm', 'test'],
        timeout_ms: 1000,
        source: /** @type {const} */ ('config')
      },
      verifyResults: [
        { ok: true, reason: 'ok' },
        { ok: false, reason: 'verify_cmd_failed' }
      ]
    });
    await h.actions.merge(BEAD);

    h.store.__clearCacheForTest();

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'post_merge_verify'
    });
  });

  test('stops on an unreadable child list rather than closing the parent', async () => {
    const h = makeActions();
    h.bd.listChildren.mockImplementation(async () => {
      throw new Error('bd down');
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: false, cleanup_step: 'child_sweep' });
    expect(h.calls).not.toContain('bd:setStatus:UI-1:closed');
  });

  test('records base_ff_diverged instead of forcing a diverged base branch', async () => {
    const h = makeActions();
    h.gitRun.mockImplementation(async (/** @type {string[]} */ args) => {
      h.calls.push(`git:${args.slice(0, 2).join(' ')}`);
      if (args[0] === 'rev-parse' && args[1] === 'origin/main') {
        return { code: 0, stdout: 'base-sha-1\n', stderr: '' };
      }
      if (args[0] === 'rev-parse' && args[1] === '--abbrev-ref') {
        return { code: 0, stdout: 'main\n', stderr: '' };
      }
      if (args[0] === 'status') {
        return { code: 0, stdout: '', stderr: '' };
      }
      if (args[0] === 'merge') {
        return { code: 1, stdout: '', stderr: 'not a fast-forward' };
      }
      return { code: 0, stdout: '', stderr: '' };
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'base_sync',
      reason: 'base_ff_diverged'
    });
  });

  test('leaves a dirty base checkout alone instead of fast-forwarding it, and says so', async () => {
    const h = makeActions();
    h.gitRun.mockImplementation(async (/** @type {string[]} */ args) => {
      h.calls.push(`git:${args.slice(0, 2).join(' ')}`);
      if (args[0] === 'rev-parse' && args[1] === 'origin/main') {
        return { code: 0, stdout: 'base-sha-1\n', stderr: '' };
      }
      if (args[0] === 'rev-parse' && args[1] === '--abbrev-ref') {
        return { code: 0, stdout: 'main\n', stderr: '' };
      }
      if (args[0] === 'status') {
        return { code: 0, stdout: ' M app/x.js\n', stderr: '' };
      }
      return { code: 0, stdout: '', stderr: '' };
    });

    const r = await h.actions.merge(BEAD);

    expect(r.ok).toBe(true);
    expect(h.calls).not.toContain('git:merge --ff-only');
    // Reported apart from a real fast-forward: the user's checkout was NOT
    // moved, which is a different fact about their repo than "it was".
    expect(r.base_sync).toBe('fetch_only:dirty');
  });

  test('reports a fast-forward distinctly when the base checkout is clean', async () => {
    const h = makeActions();
    h.gitRun.mockImplementation(async (/** @type {string[]} */ args) => {
      h.calls.push(`git:${args.slice(0, 2).join(' ')}`);
      if (args[0] === 'rev-parse' && args[1] === 'origin/main') {
        return { code: 0, stdout: 'base-sha-1\n', stderr: '' };
      }
      if (args[0] === 'rev-parse' && args[1] === '--abbrev-ref') {
        return { code: 0, stdout: 'main\n', stderr: '' };
      }
      if (args[0] === 'ls-remote') {
        return { code: 0, stdout: '', stderr: '' };
      }
      return { code: 0, stdout: '', stderr: '' };
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, base_sync: 'fast_forwarded' });
    expect(h.calls).toContain('git:merge --ff-only');
  });

  test('reports fetch_only when the checkout sits on another branch', async () => {
    // The default git fake answers `--abbrev-ref HEAD` with `feature`.
    const h = makeActions();

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, base_sync: 'fetch_only:not_on_base' });
  });
});

describe('post-merge cleanup — bd status after a LATE failure (§6)', () => {
  test('restores the bead to resolved when the branch cleanup fails after the close', async () => {
    const h = makeActions({
      // The local branch delete fails and the confirming `rev-parse --verify`
      // still finds the branch → the cleanup stops at `branch_cleanup`, one
      // step PAST the parent close.
      gitFail: (args) => args[0] === 'branch'
    });
    h.bd.readStatus.mockImplementation(async (/** @type {string} */ id) => {
      h.calls.push(`bd:readStatus:${id}`);
      return h.bd_status.get(id) ?? 'closed';
    });
    h.bd.setStatus.mockImplementation(
      async (/** @type {string} */ id, /** @type {string} */ s) => {
        h.calls.push(`bd:setStatus:${id}:${s}`);
        h.bd_status.set(id, s);
      }
    );

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'branch_cleanup',
      reason: 'local_branch_delete_failed'
    });
    // The close really happened, and was really undone: the contract says a
    // cleanup failure hands back a `resolved` bead, not a `closed` one.
    expect(h.calls).toContain('bd:setStatus:UI-1:closed');
    expect(h.calls).toContain('bd:setStatus:UI-1:resolved');
    expect(h.bd_status.get(BEAD)).toBe('resolved');
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'branch_cleanup',
      bd_restore: 'restored'
    });
  });

  test('restores the bead when the close WROTE but its readback did not confirm', async () => {
    const h = makeActions();
    // bd took the write and then stopped answering reads: `closed` may well
    // have landed, so the restore must run rather than assume nothing happened.
    h.bd.readStatus.mockImplementation(async (/** @type {string} */ id) => {
      h.calls.push(`bd:readStatus:${id}`);
      throw new Error('bd down');
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'parent_close',
      reason: 'bd_close_failed'
    });
    expect(h.calls).toContain('bd:setStatus:UI-1:resolved');
    // The restore's own readback failed too — recorded, never left silent.
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'parent_close',
      bd_restore: 'restore_failed'
    });
    expect(h.worktree.remove).not.toHaveBeenCalled();
  });

  test('does not touch bd when the cleanup stops BEFORE the parent close', async () => {
    const h = makeActions({ gitFail: (args) => args[0] === 'fetch' });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: false, cleanup_step: 'base_sync' });
    expect(h.bd.setStatus).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).cleanup_failed[BEAD].bd_restore).toBeNull();
  });
});

describe('post-merge cleanup — ref operations hold the topology lock (§8)', () => {
  test('runs the base sync under the lock, and the branch deletes under a lock taken after the worktree removal', async () => {
    const h = makeActions();

    await h.actions.merge(BEAD);

    const ordered = h.calls.filter(
      (c) =>
        c.startsWith('lock:') ||
        c === 'git:fetch --no-tags' ||
        c === 'wt:remove' ||
        c === 'git:branch -D' ||
        c === 'git:push origin'
    );
    expect(ordered).toEqual([
      // Base sync: fetch inside the lock.
      'lock:acquire',
      'git:fetch --no-tags',
      'lock:release',
      // Branch cleanup: the worktree removal takes the same lock INSIDE the
      // worktree manager, so it runs before this hold — nesting would deadlock.
      'wt:remove',
      'lock:acquire',
      'git:branch -D',
      'git:push origin',
      'lock:release'
    ]);
    expect(h.worktree.withTopologyLock).toHaveBeenCalledWith(
      REPO,
      expect.any(Function)
    );
  });
});

describe('post-merge cleanup — the externally-observed MERGED trigger (§4/§6)', () => {
  test('runs the identical cleanup path when a human merged on github.com', async () => {
    const h = makeActions({ details: [prOf({ state: 'MERGED' })] });
    const poller = createPrPoller({
      workspace: WS,
      repo: REPO,
      store: h.store,
      gh: /** @type {any} */ (h.gh),
      observations: h.observations,
      getSubscriberCount: () => 1,
      onMerged: (bead_id) => h.actions.cleanupObservedMerge(bead_id),
      sleep: async () => {}
    });

    await poller.tick();

    // No merge was performed by us — the cleanup ran off the OBSERVATION.
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
    expect(
      h.calls.filter(
        (c) =>
          c === 'git:fetch --no-tags' ||
          c === 'bd:setStatus:UI-1:closed' ||
          c === 'wt:remove'
      )
    ).toEqual(['git:fetch --no-tags', 'bd:setStatus:UI-1:closed', 'wt:remove']);
    expect(
      h.store.snapshot(WS).done.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('never auto-retries a cleanup that already failed', async () => {
    const store = seedStore({
      cleanup_failed: { [BEAD]: { step: 'child_sweep', reason: 'boom' } }
    });
    const h = makeActions({ store, details: [prOf({ state: 'MERGED' })] });

    const r = await h.actions.cleanupObservedMerge(BEAD);

    expect(r).toMatchObject({ ok: false, reason: 'merged_cleanup_failed' });
    expect(h.calls).toEqual([]);
  });
});

describe('[재실행] — the order-sensitive discard transition (§6)', () => {
  test('closes the PR, restores bd to open with pr_url gone, discards the worktree, and requeues', async () => {
    const h = makeActions();
    h.bd_status.set(BEAD, 'open');

    const r = await h.actions.rerun(BEAD);

    expect(r).toMatchObject({ ok: true });
    expect(
      h.calls.filter(
        (c) =>
          c.startsWith('gh:closePr') ||
          c.startsWith('bd:') ||
          c === 'wt:remove' ||
          c === 'git:push origin' ||
          c === 'sched:tick'
      )
    ).toEqual([
      'gh:closePr',
      'bd:setStatus:UI-1:open',
      'bd:readStatus:UI-1',
      'bd:unsetMetadata:UI-1:pr_url',
      'bd:readMetadata:UI-1:pr_url',
      'wt:remove',
      'git:push origin',
      'sched:tick'
    ]);
    const q = h.store.snapshot(WS);
    expect(q.pr_wait).toEqual([]);
    expect(q.queue.map((/** @type {any} */ e) => e.bead_id)).toEqual([BEAD]);
  });

  test('refuses when the bd status readback does not confirm open', async () => {
    const h = makeActions();
    h.bd_status.set(BEAD, 'resolved');

    const r = await h.actions.rerun(BEAD);

    expect(r).toMatchObject({ ok: false, reason: 'bd_status_readback_failed' });
    // The bead stays in `pr_wait` — a half-applied transition never lands in
    // the queue, where dispatch would skip it as not-ready anyway.
    expect(
      h.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('reports redispatched:false when the transition itself failed', async () => {
    const h = makeActions();
    h.bd_status.set(BEAD, 'resolved');

    const r = await h.actions.rerun(BEAD);

    expect(r).toMatchObject({ ok: false, redispatched: false });
  });

  test('the poller cannot publish a rerun own close as an abandonment', async () => {
    const h = makeActions({ details: [prOf({ state: 'CLOSED' })] });
    h.bd_status.set(BEAD, 'open');
    const poller = createPrPoller({
      workspace: WS,
      repo: REPO,
      store: h.store,
      gh: /** @type {any} */ (h.gh),
      observations: h.observations,
      getSubscriberCount: () => 1,
      sleep: async () => {}
    });
    // A poll pass lands INSIDE the rerun window: the PR is already closed by
    // the rerun, and the bead has not left `pr_wait` yet.
    h.gh.closePr.mockImplementation(async () => {
      h.calls.push('gh:closePr');
      await poller.tick();
      return { state: 'ok', data: true };
    });

    await h.actions.rerun(BEAD);

    // The poller really did read the closed PR inside the window (otherwise
    // this test would pass vacuously)…
    expect(h.gh.prDetail).toHaveBeenCalled();
    // …and nothing about that CLOSED reading survives: it was refused at the
    // cache, so no "PR closed — 사람 처분 대기" can ever be published for it.
    expect(h.observations.get(WS, BEAD)).toBeNull();
    expect(h.observations.isRerunning(WS, BEAD)).toBe(false);
    expect(
      h.store.snapshot(WS).queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });
});

describe('[재실행] — the re-dispatch is real, and respects ⏸ (§6 · phase1 §1)', () => {
  /**
   * Wire the actions to a REAL scheduler over the SAME store, so the follow-up
   * tick either genuinely dispatches or genuinely does not — a fake scheduler
   * could only prove that `tick()` was called.
   *
   * @param {{ auto_advance: boolean }} options
   */
  function makeRerunSystem(options) {
    const h = makeActions();
    /** @type {string[]} */
    const spawned = [];
    const bd = {
      ...h.bd,
      async snapshotBead() {
        return {
          ready: true,
          blocked: false,
          repo: REPO,
          target_base: 'main',
          workflow_mode: null,
          route: null,
          status: 'open',
          deps: []
        };
      },
      setMetadata: vi.fn(async () => {}),
      // The dispatch stamps read back what they wrote; `pr_url` is genuinely
      // gone by the time the tick runs, which is what the rerun asserted.
      readMetadata: vi.fn(async (/** @type {string} */ _id, key) =>
        key === 'pr_url' ? null : 'fast_track'
      )
    };
    const scheduler = createScheduler({
      store: h.store,
      makeRunner: () => ({
        name: 'claude',
        spawn(/** @type {any} */ bead) {
          spawned.push(bead.id);
          return {
            pid: 4242,
            kill: vi.fn(),
            events: new EventEmitter(),
            done: new Promise(() => {})
          };
        }
      }),
      bd,
      worktree: {
        ...h.worktree,
        add: vi.fn(async (/** @type {any} */ { bead_id }) => ({
          path: `/wt/${bead_id}`,
          branch: bead_id,
          base_oid: 'base-1'
        }))
      },
      verify: {
        verifyPrSubmitted: vi.fn(async () => ({ ok: true, reason: 'ok' }))
      },
      sessionLog: { attach: vi.fn() }
    });
    const actions = createPrActions({
      workspace: WS,
      repo: REPO,
      store: h.store,
      gh: /** @type {any} */ (h.gh),
      observations: h.observations,
      bd: /** @type {any} */ (bd),
      worktree: /** @type {any} */ (h.worktree),
      gitRun: h.gitRun,
      scheduler,
      requeryDelayMs: 0,
      sleep: async () => {},
      now: () => 1000
    });
    h.store.setAutoAdvance(WS, options.auto_advance);
    h.bd_status.set(BEAD, 'open');
    return { h, actions, scheduler, spawned };
  }

  test('starts a NEW attempt for the bead when auto_advance is on', async () => {
    const s = makeRerunSystem({ auto_advance: true });

    const r = await s.actions.rerun(BEAD);

    // Not merely a lane move: a session really spawned for this bead, and the
    // store carries a second, RUNNING attempt for it.
    expect(r).toMatchObject({ ok: true, redispatched: true });
    expect(s.spawned).toEqual([BEAD]);
    expect(s.scheduler.runningBeads()).toEqual([BEAD]);
    const attempts = Object.values(s.h.store.snapshot(WS).attempts);
    expect(
      attempts.filter(
        (/** @type {any} */ a) => a.bead_id === BEAD && a.status === 'running'
      )
    ).toHaveLength(1);
  });

  test('leaves the bead waiting in queue with no session when auto_advance is off', async () => {
    const s = makeRerunSystem({ auto_advance: false });

    const r = await s.actions.rerun(BEAD);

    // ⏸ starts no new sessions — a human-clicked rerun defers rather than
    // overriding the pause (worker-phase1, spec §8 protected core).
    expect(r).toMatchObject({ ok: true, redispatched: false });
    expect(s.spawned).toEqual([]);
    expect(s.scheduler.runningCount()).toBe(0);
    expect(
      s.h.store.snapshot(WS).queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });
});
