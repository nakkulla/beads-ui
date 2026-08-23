/**
 * The PR-wait actions (worker-phase2 §6 · plan Test scope P5).
 *
 * `gh` is fully mocked here — this suite never reaches the network and never
 * merges anything real. What it holds down:
 *
 *   - the click's CLEAN merge, DIRTY resolution, and unclean refusal paths,
 *   - that a head SHA which moved between render and click re-opens the gate,
 *     that a stale green does not pass, and that an empty cache (restart)
 *     VERIFIES rather than passing,
 *   - the cleanup ORDER (asserted as a sequence, not just an end state), its
 *     mid-sequence failure behaviour, and that the externally-observed MERGED
 *     trigger runs the identical path,
 *   - the [폐기] transition, step by step and in order, its authoritative
 *     click-time re-read, and that the poller cannot publish a discard's own
 *     close as an abandonment.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createActivityStore } from './activity-store.js';
import { createPrActions } from './pr-actions.js';
import { createPrObservationStore } from './pr-observations.js';
import { createPrPoller } from './pr-poller.js';
import { createQueueStore } from './queue-store.js';

const WS = '/tmp/example-workspace/project-p5';
const REPO = '/tmp/example-workspace/project-p5';
const BEAD = 'UI-1';
const BASE_SHA = 'd'.repeat(40);

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
    base_ref: 'main',
    head_sha: 'sha-aaa',
    merged_sha: null,
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
    attempt: {
      attempt_id: 'a1',
      bead_id: BEAD,
      repo: REPO,
      target_base: 'main',
      base_oid: 'b'.repeat(40),
      runner: 'claude'
    }
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
 *   store?: any,
 *   verify?: { cmd: string[], timeout_ms: number }|null,
 *   verifyResults?: Array<{ ok: boolean, reason: string, detail?: string, output_tail?: string, log_path?: string, attempts?: { reason: string, log_path?: string }[] }>,
 *   verifyResolution?: any,
 *   verifyResolutions?: any[],
 *   repo?: string,
 *   gitFail?: (args: string[]) => boolean,
 *   gitResult?: (args: string[]) => number|null,
 *   gitBranch?: string,
 *   gitStatus?: string,
 *   gitHead?: string,
 *   children?: Record<string, { id: string, status: string }[]>,
 *   bdFail?: (method: string, id: string) => boolean,
 *   mergeFails?: boolean,
 *   updateBranchResult?: any,
 *   afterMerge?: any,
 *   worktreeExists?: boolean,
 *   worktrees?: Record<string, string>,
 *   removeByBranchResult?: { ok: boolean, removed: boolean, reason: string|null },
 *   resolveConflictResult?: any,
 *   externalConflictResult?: any,
 *   activity?: any,
 *   external?: Record<string, { bead_id: string, pr_url: string, pr_number: number|null, added_at: number }>,
 *   bdStatus?: Record<string, string>,
 *   bdPrUrl?: string|null,
 *   bdMetadata?: Record<string, unknown>,
 *   bdSpecId?: string|null,
 *   implReviewAncestry?: 'ancestor'|'non_ancestor'|'probe_error',
 *   declaredBase?: string,
 *   resolveBase?: (options?: { force?: boolean }) => Promise<any>,
 *   resolveVerify?: (pin?: { sha?: string|null, force?: boolean }) => Promise<any>,
 *   repoOperations?: any,
 *   noNotify?: boolean
 * }} [options]
 */
function makeActions(options = {}) {
  /** @type {string[]} */
  const calls = [];
  const store = options.store || seedStore();
  const observations = createPrObservationStore();
  const activity = options.activity ?? createActivityStore({ now: () => 1000 });
  /** @type {string[]} */
  const steps = [];

  const details = options.details || [prOf()];
  let detail_i = 0;
  /** How many verify resolutions the actions have asked for. */
  let verify_resolutions = 0;
  const resolveVerify =
    options.resolveVerify ||
    (async () =>
      (Array.isArray(options.verifyResolutions)
        ? options.verifyResolutions[
            Math.min(verify_resolutions++, options.verifyResolutions.length - 1)
          ]
        : null) ??
      options.verifyResolution ??
      (options.verify
        ? {
            state: /** @type {const} */ ('resolved'),
            source: /** @type {const} */ ('config'),
            value: options.verify
          }
        : { state: /** @type {const} */ ('absent') }));
  // What GitHub reports about the PR once OUR merge command has returned zero.
  // The default is the ordinary case (it really merged); a test overrides it to
  // model a merge queue that only ENQUEUED the PR, or an unreadable re-check.
  let merge_issued = false;
  const after_merge = Object.hasOwn(options, 'afterMerge')
    ? options.afterMerge
    : {
        state: 'ok',
        data: prOf({ state: 'MERGED', merged_sha: 'c'.repeat(40) })
      };
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
      return (
        options.updateBranchResult || {
          state: 'ok',
          data: 'b'.repeat(40)
        }
      );
    }),
    closePr: vi.fn(async () => {
      calls.push('gh:closePr');
      return { state: 'ok', data: true };
    })
  };

  const children = options.children || {};
  /** @type {Set<string>} */
  const closed_by_sweep = new Set();
  const bd = {
    setStatus: vi.fn(async (/** @type {string} */ id, s) => {
      calls.push(`bd:setStatus:${id}:${s}`);
      if (options.bdFail && options.bdFail('setStatus', id)) {
        throw new Error('bd down');
      }
      if (s === 'closed') {
        closed_by_sweep.add(id);
      }
    }),
    readStatus: vi.fn(async (/** @type {string} */ id) => {
      calls.push(`bd:readStatus:${id}`);
      if (options.bdFail && options.bdFail('readStatus', id)) {
        throw new Error('bd down');
      }
      return bd_status.get(id) ?? 'closed';
    }),
    unsetMetadata: vi.fn(async (/** @type {string} */ id, k) => {
      calls.push(`bd:unsetMetadata:${id}:${k}`);
    }),
    readMetadata: vi.fn(async (/** @type {string} */ id, k) => {
      calls.push(`bd:readMetadata:${id}:${k}`);
      if (k === 'pr_url' && Object.hasOwn(options, 'bdPrUrl')) {
        return options.bdPrUrl ?? null;
      }
      return null;
    }),
    listChildren: vi.fn(async (/** @type {string} */ id) => {
      calls.push(`bd:listChildren:${id}`);
      // A child this run already closed reads back as `closed`, so a SECOND
      // cleanup over the same bead sees the real post-close world (UI-4ii4:
      // the retry must enumerate already-closed descendants).
      return (children[id] || []).map((c) => ({
        ...c,
        status: closed_by_sweep.has(c.id) ? 'closed' : c.status
      }));
    }),
    readIssue: vi.fn(async (/** @type {string} */ id) => {
      calls.push(`bd:readIssue:${id}`);
      if (options.bdFail && options.bdFail('readIssue', id)) {
        throw new Error('bd down');
      }
      return {
        id,
        spec_id: options.bdSpecId ?? null,
        // The CLICK-TIME guard answer, kept apart from `bd_status` (which
        // models the cleanup's own close/restore readbacks).
        status: (options.bdStatus || {})[id] ?? bd_status.get(id) ?? 'closed',
        metadata: {
          route: 'quick_fix',
          ...(options.bdMetadata || {}),
          ...(Object.hasOwn(options, 'bdPrUrl')
            ? { pr_url: options.bdPrUrl ?? undefined }
            : {})
        }
      };
    }),
    updateFields: vi.fn(
      async (/** @type {string} */ id, /** @type {any} */ input) => {
        calls.push(`bd:updateFields:${id}`);
        if (options.bdFail && options.bdFail('updateFields', id)) {
          throw new Error('bd down');
        }
        return input;
      }
    )
  };
  /** @type {Map<string, string>} */
  const bd_status = new Map();

  // Which worktree holds which branch — the fake stands in for real git's
  // causality: a branch a worktree has checked out cannot be deleted, and only
  // taking that worktree down frees it. Without this the harness would let
  // `branch -D` succeed no matter what the worktree step did, and no test of
  // the cleanup could tell a found worktree from a missed one.
  /** @type {Map<string, string>} */
  const worktree_holds = new Map(Object.entries(options.worktrees || {}));
  /** @param {string} branch */
  const branchHeld = (branch) => [...worktree_holds.values()].includes(branch);

  const worktree = {
    remove: vi.fn(async (/** @type {{ bead_id: string }} */ input) => {
      calls.push('wt:remove');
      // Names the worktree, so it frees the branch only when that computed
      // name is the one actually holding it.
      worktree_holds.delete(input.bead_id);
      return { code: 0, stderr: '' };
    }),
    removeByBranch: vi.fn(async (/** @type {{ branch: string }} */ input) => {
      calls.push('wt:removeByBranch');
      if (options.removeByBranchResult) {
        return options.removeByBranchResult;
      }
      const name = [...worktree_holds.entries()].find(
        ([, held]) => held === input.branch
      )?.[0];
      if (name === undefined) {
        return { ok: true, removed: false, reason: null };
      }
      worktree_holds.delete(name);
      return { ok: true, removed: true, reason: null };
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

  // The local checkout cleanup reads: which branch it is on, whether it is
  // clean, and what HEAD points at.
  const git_branch = options.gitBranch ?? 'feature';
  const git_status = options.gitStatus ?? '';
  const git_head = options.gitHead ?? BASE_SHA;

  // The ancestry the shared probe (`merge-gate.js`) will read for this Bead's
  // `impl_review` receipt. Keyed on the receipt sha so it never answers for the
  // cleanup's own `merge-base --is-ancestor <merge_sha> <base>` probe.
  const impl_receipt_sha = String(
    (options.bdMetadata || {}).impl_review || ''
  ).split('@')[1];
  const impl_review_ancestry = options.implReviewAncestry ?? 'non_ancestor';

  /** @type {string[][]} */
  const git_argv = [];
  const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
    git_argv.push(args);
    calls.push(`git:${args.slice(0, 2).join(' ')}`);
    const forced_code = options.gitResult?.(args);
    if (typeof forced_code === 'number' && forced_code !== 0) {
      return { code: forced_code, stdout: '', stderr: 'boom' };
    }
    if (options.gitFail && options.gitFail(args)) {
      return { code: 1, stdout: '', stderr: 'boom' };
    }
    // git refuses to delete a branch a worktree has checked out; the
    // confirming `rev-parse --verify` then still finds it (the default below).
    if (args[0] === 'branch' && args[1] === '-D' && branchHeld(args[2])) {
      return { code: 1, stdout: '', stderr: 'used by worktree' };
    }
    if (
      impl_receipt_sha &&
      args[0] === 'merge-base' &&
      args[1] === '--is-ancestor' &&
      args[2] === impl_receipt_sha
    ) {
      return {
        code: impl_review_ancestry === 'ancestor' ? 0 : 1,
        stdout: '',
        stderr: ''
      };
    }
    if (
      impl_receipt_sha &&
      impl_review_ancestry === 'probe_error' &&
      args[0] === 'rev-parse' &&
      args[1] === '--verify'
    ) {
      return { code: 128, stdout: '', stderr: 'bad object' };
    }
    if (args[0] === 'rev-parse' && args[1] === 'origin/main') {
      return { code: 0, stdout: `${BASE_SHA}\n`, stderr: '' };
    }
    if (args[0] === 'rev-parse' && String(args[1]).endsWith('^')) {
      return { code: 0, stdout: `${'a'.repeat(40)}\n`, stderr: '' };
    }
    if (args.join(' ') === 'remote get-url origin') {
      return {
        code: 0,
        stdout: 'git@example.test:o/r.git\n',
        stderr: ''
      };
    }
    if (args[0] === 'rev-parse' && args[1] === '--abbrev-ref') {
      return { code: 0, stdout: `${git_branch}\n`, stderr: '' };
    }
    if (args[0] === 'rev-parse' && args[1] === 'HEAD') {
      return { code: 0, stdout: `${git_head}\n`, stderr: '' };
    }
    if (args[0] === 'status') {
      return { code: 0, stdout: git_status, stderr: '' };
    }
    if (args[0] === 'ls-remote') {
      return { code: 0, stdout: '', stderr: '' };
    }
    return { code: 0, stdout: '', stderr: '' };
  });

  // The merge notification (UI-9rrk), recorded on the same ordered log so a
  // test can place it relative to the cleanup's other outward calls.
  // The registry retirement the cleanup performs (UI-wwby §1). A spy rather
  // than a real store: the assertion is that the CLEANUP calls it, which is the
  // wiring `external-pr.test.js` cannot see.
  const external_drop = vi.fn(() => {
    calls.push('external:drop');
    return true;
  });
  /** @type {any[]} */
  const merge_notices = [];
  const notify = {
    mergeCompleted: vi.fn(async (/** @type {any} */ input) => {
      calls.push('notify:mergeCompleted');
      merge_notices.push(input);
      // The real notifier reads the bead title before it spawns, so the send
      // finishes a few ticks after the call. `notify:spawned` is that finish —
      // what the cleanup must not run past (UI-vb0t §3.4).
      await Promise.resolve();
      await Promise.resolve();
      calls.push('notify:spawned');
    })
  };

  const scheduler = {
    resolveConflict: vi.fn(async () => {
      calls.push('sched:resolveConflict');
      return options.resolveConflictResult || { ok: true, attempt_id: 'a2' };
    }),
    dispatchExternalConflict: vi.fn(async () => {
      calls.push('sched:dispatchExternalConflict');
      return options.externalConflictResult || { ok: true, attempt_id: 'x1' };
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
    // Distinct from `workspace` only where a test needs to prove which of the two
    // a path is keyed on (attach.js resolves `options.repo || workspace_root`, so
    // they really can differ).
    repo: options.repo || REPO,
    store,
    gh,
    observations,
    activity: {
      ...activity,
      /**
       * @param {string} ws
       * @param {string} bead_id
       * @param {string} step
       */
      setMergeProgress(ws, bead_id, step) {
        steps.push(step);
        activity.setMergeProgress(ws, bead_id, step);
      },
      /**
       * @param {string} ws
       * @param {string} bead_id
       */
      clearMergeProgress(ws, bead_id) {
        steps.push('(cleared)');
        activity.clearMergeProgress(ws, bead_id);
      }
    },
    bd,
    external: {
      get: (/** @type {string} */ _ws, /** @type {string} */ bead_id) =>
        (options.external || {})[bead_id] || null,
      drop: external_drop
    },
    worktree,
    gitRun,
    scheduler,
    // The repo declaration resolver (worker-base-scope-alignment §5). Default:
    // an undeclared repo, i.e. `main` — the same base every fixture PR here is
    // opened against. A test that needs a mismatch overrides it.
    resolveBase:
      options.resolveBase ||
      (async () => ({
        ok: /** @type {const} */ (true),
        base: options.declaredBase || 'main',
        declared: !!options.declaredBase,
        remote: 'origin',
        remote_ref: `refs/remotes/origin/${options.declaredBase || 'main'}`,
        base_oid: 'a'.repeat(40),
        local_only: false
      })),
    // The verify resolver's two-rung contract (UI-kfl4). `verify` is shorthand
    // for "this repo resolves THIS command"; `verifyResolution` drives the
    // three-state tests.
    resolveVerify,
    runVerify,
    // Every live attachment wires the coordinator; a base that declares no
    // `repo-ops/config.toml` is the default so cleanup runs straight to closure.
    repoOperations: options.repoOperations ?? {
      hasConfig: async () => ({ ok: true, present: false })
    },
    requeryDelayMs: 0,
    sleep: async () => {},
    now: () => 1000,
    // `noNotify` builds the actions with no notifier at all — the shape every
    // pre-UI-9rrk construction site still has.
    notify: options.noNotify === true ? undefined : notify
  });

  return {
    actions,
    calls,
    store,
    observations,
    activity,
    steps,
    gh,
    bd,
    bd_status,
    worktree,
    gitRun,
    git_argv,
    external_drop,
    scheduler,
    resolveVerify,
    runVerify,
    notify,
    merge_notices
  };
}

/** One declared verify command for post-merge verification tests. */
const VERIFY_CFG = {
  cmd: ['npm', 'test'],
  timeout_ms: 1000
};

/** What `hasConfig` reports for a base that declares `[verify]`. */
const VERIFY_SCRIPT_PATH = 'repo-ops/script/verify';

/**
 * @returns {any}
 */
function failedVerifyOperations() {
  let candidate = { base_sha: 'a'.repeat(40), head_sha: 'sha-aaa' };
  return {
    hasConfig: vi.fn(async () => ({
      ok: true,
      present: true,
      verify_script_path: VERIFY_SCRIPT_PATH
    })),
    ensureVerify: vi.fn(async (input) => {
      candidate = input;
      return {
        ok: true,
        operation_id: 'verify-failed',
        timeout_ms: 1000
      };
    }),
    waitForTerminal: vi.fn(async () => ({
      operation_id: 'verify-failed',
      effective_base_sha: candidate.base_sha,
      head_sha: candidate.head_sha,
      candidate_tree_sha: 'c'.repeat(40),
      script_object_type: 'blob',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40),
      ok: false,
      reason: 'verify_cmd_failed',
      state: 'failed',
      at: 1
    })),
    verifyReceipt: vi.fn()
  };
}

/**
 * Harness options that put the local checkout on a clean target-base SHA.
 *
 * @type {{ gitBranch: string, gitStatus: string, gitHead: string }}
 */
const ON_BASE = {
  gitBranch: 'main',
  gitStatus: '',
  gitHead: BASE_SHA
};

describe('worker/pr-actions — quick_fix merge non-participation', () => {
  test('issues no merge or cleanup effects for a quick_fix attempt naturally lacking pr_url and pr_wait', async () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'qf-a1',
        bead_id: BEAD,
        repo: REPO,
        target_base: 'main',
        runner: 'codex',
        quickfix_lane: true
      }
    });
    const env = makeActions({ store });

    const result = await env.actions.merge(BEAD);

    // The quick_fix lane creates neither natural merge input: no PR URL and no
    // durable pr_wait row, so the ordinary boundary refuses it before effects.
    expect(result).toEqual({
      ok: false,
      action: 'refused',
      reason: 'not_in_pr_wait'
    });
    expect(env.gh.prDetail).not.toHaveBeenCalled();
    expect(env.gh.mergeSquash).not.toHaveBeenCalled();
    expect(env.bd.setStatus).not.toHaveBeenCalled();
    expect(env.worktree.removeByBranch).not.toHaveBeenCalled();
  });
});

describe('worker/pr-actions rollback verify compatibility', () => {
  test('is inert when pinned repo ops declares no verify', async () => {
    const env = makeActions({ verifyResolution: { state: 'absent' } });

    const result = await env.actions.rollbackVerify(BEAD, BASE_SHA);

    expect(result).toEqual({ ok: true });
    expect(env.runVerify).not.toHaveBeenCalled();
  });

  test('fails closed without a raw run when pinned repo ops is invalid', async () => {
    const env = makeActions({
      verifyResolution: {
        state: 'invalid',
        reason: 'repo_ops_config_invalid'
      }
    });

    const result = await env.actions.rollbackVerify(BEAD, BASE_SHA);

    expect(result).toEqual({ ok: false, reason: 'repo_ops_config_invalid' });
    expect(env.runVerify).not.toHaveBeenCalled();
  });
});

describe('merge click — the three branches (worker-phase2 §6)', () => {
  test('returns the authoritative base-update result head', async () => {
    const result_head_sha = 'd'.repeat(40);
    const h = makeActions({
      updateBranchResult: { state: 'ok', data: result_head_sha }
    });

    const result = await h.actions.updateBase(BEAD);

    expect(result).toEqual({
      ok: true,
      reason: null,
      result_head_sha
    });
    expect(h.gh.updateBranch).toHaveBeenCalledWith(REPO, 304);
  });

  test('fails closed when a base update returns no result head', async () => {
    const h = makeActions({
      updateBranchResult: { state: 'ok', data: true }
    });

    const result = await h.actions.updateBase(BEAD);

    expect(result).toEqual({
      ok: false,
      reason: 'update_branch_failed',
      result_head_sha: null
    });
  });

  test('refuses a bead fenced by an active discard operation', async () => {
    const h = makeActions();
    const snapshot = h.store.snapshot(WS);
    h.store.createDiscardOperation(WS, {
      expected_revision: snapshot.revision,
      operation: {
        operation_id: 'discard-1',
        bead_id: BEAD,
        attempt_id: 'a1',
        source_snapshot: { repo: REPO, branch: BEAD }
      }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({
      ok: false,
      action: 'refused',
      reason: 'discard_in_progress'
    });
    expect(h.gh.prDetail).not.toHaveBeenCalled();
  });

  test('squash-merges a CLEAN pull request', async () => {
    const h = makeActions({ details: [prOf({ merge_state_status: 'CLEAN' })] });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, action: 'merged', reason: null });
    // Pinned to the gated head — a push landing mid-click cannot slip in.
    expect(h.gh.mergeSquash).toHaveBeenCalledWith(REPO, 304, 'sha-aaa');
    expect(h.gh.updateBranch).not.toHaveBeenCalled();
    expect(h.scheduler.resolveConflict).not.toHaveBeenCalled();
  });

  test('refuses a BEHIND pull request', async () => {
    const h = makeActions({
      details: [
        prOf({ merge_state_status: 'BEHIND' }),
        prOf({ merge_state_status: 'CLEAN', head_sha: 'sha-bbb' })
      ]
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      action: 'refused',
      reason: 'base_behind'
    });
    expect(h.gh.updateBranch).not.toHaveBeenCalled();
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
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
      repoOperations: failedVerifyOperations()
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      action: 'verify_blocked',
      reason: 'verify_cmd_failed'
    });
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('merges a spec-backed PR with current review receipts', async () => {
    const head_sha = 'a'.repeat(40);
    const h = makeActions({
      details: [prOf({ head_sha })],
      bdSpecId: 'docs/spec.md',
      bdMetadata: {
        route: 'spec_backed',
        spec_review: `codex@${'b'.repeat(40)}`,
        impl_review: `self@${head_sha}`
      }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, action: 'merged' });
  });

  test('merges a spec-backed PR whose head descends from the receipt', async () => {
    const head_sha = 'a'.repeat(40);
    const h = makeActions({
      details: [prOf({ head_sha })],
      bdSpecId: 'docs/spec.md',
      bdMetadata: {
        route: 'spec_backed',
        spec_review: `codex@${'b'.repeat(40)}`,
        impl_review: `self@${'c'.repeat(40)}`
      },
      implReviewAncestry: 'ancestor'
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, action: 'merged' });
    expect(h.observations.get(WS, BEAD)?.review_receipt).toEqual({
      state: 'current',
      head_sha
    });
  });

  test('refuses a spec-backed PR whose head does not descend from the receipt', async () => {
    const h = makeActions({
      details: [prOf({ head_sha: 'a'.repeat(40) })],
      bdSpecId: 'docs/spec.md',
      bdMetadata: {
        route: 'spec_backed',
        spec_review: `codex@${'b'.repeat(40)}`,
        impl_review: `self@${'c'.repeat(40)}`
      },
      implReviewAncestry: 'non_ancestor'
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({
      ok: false,
      reason: 'review_receipt_stale'
    });
    expect(h.observations.get(WS, BEAD)?.review_receipt).toEqual({
      state: 'stale',
      head_sha: 'a'.repeat(40)
    });
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('refuses a merge whose execution receipt is unbacked', async () => {
    const h = makeActions({
      bdMetadata: { exec_receipt: `main:bead@${'e'.repeat(40)}` }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({
      ok: false,
      reason: 'receipt_unbacked:main_receipt_unbacked'
    });
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('merges once the receipt names the dispatch that backs it', async () => {
    const h = makeActions({
      bdMetadata: {
        exec_receipt: `main:bead@${'e'.repeat(40)}`,
        impl_dispatch: 'main'
      }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, action: 'merged' });
  });

  test('judges a candidate with no attempt record on current metadata alone', async () => {
    const h = makeActions({
      bdMetadata: {
        // Baseline-dependent findings are unsayable without a Worker attempt to
        // compare against, so an externally opened PR is judged only by what
        // current metadata can back on its own.
        exec_receipt: `main:bead@${'e'.repeat(40)}`,
        impl_dispatch: 'main'
      }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, action: 'merged' });
  });

  test('never judges a baseline-less attempt against an older attempt snapshot', async () => {
    const store = seedStore();
    // An OLDER attempt that did snapshot a baseline. The latest attempt (`a1`)
    // has none, so nothing here may be read as "this key appeared".
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'a0',
        bead_id: BEAD,
        repo: REPO,
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        runner: 'claude',
        receipt_baseline: {
          exec_receipt: null,
          impl_entry: null,
          plan_approval: null,
          workflow_mode_source: null,
          impl_dispatch: null
        }
      }
    });
    store.updateAttempt(WS, {
      attempt_id: 'a0',
      patch: { finished_at: 1, status: 'done' }
    });
    const h = makeActions({
      store,
      bdMetadata: {
        exec_receipt: `main:bead@${'e'.repeat(40)}`,
        impl_dispatch: 'main'
      }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, action: 'merged' });
  });

  test('holds a takeover receipt whose lineage no attempt can prove', async () => {
    const h = makeActions({
      bdMetadata: { exec_receipt: `main:takeover@${'e'.repeat(40)}` }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({
      ok: false,
      reason: 'receipt_unbacked:probe_error'
    });
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('fails closed when the ancestry probe cannot answer', async () => {
    const h = makeActions({
      details: [prOf({ head_sha: 'a'.repeat(40) })],
      bdSpecId: 'docs/spec.md',
      bdMetadata: {
        route: 'spec_backed',
        spec_review: `codex@${'b'.repeat(40)}`,
        impl_review: `self@${'c'.repeat(40)}`
      },
      implReviewAncestry: 'probe_error'
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({
      ok: false,
      reason: 'review_receipt_stale'
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

describe('merge click — driver-approved latest probe (UI-yup9)', () => {
  test.each([
    ['CLEAN', prOf({ merge_state_status: 'CLEAN' }), 'clean'],
    ['MERGED', prOf({ state: 'MERGED' }), 'merged'],
    [
      'DIRTY',
      prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' }),
      'dirty'
    ]
  ])('classifies latest %s without an effect', async (_label, detail, kind) => {
    const h = makeActions({ details: [detail] });

    const result = await h.actions.probeMergeability(BEAD);

    expect(result).toMatchObject({ ok: true, kind, head_sha: 'sha-aaa' });
    expect(h.gh.updateBranch).not.toHaveBeenCalled();
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
    expect(h.scheduler.resolveConflict).not.toHaveBeenCalled();
  });

  test('blocks latest BEHIND without an effect', async () => {
    const h = makeActions({
      details: [prOf({ merge_state_status: 'BEHIND' })]
    });

    const result = await h.actions.probeMergeability(BEAD);

    expect(result).toMatchObject({
      ok: false,
      kind: 'blocked',
      reason: 'base_behind',
      head_sha: 'sha-aaa'
    });
    expect(h.gh.updateBranch).not.toHaveBeenCalled();
  });

  test('refuses DIRTY without dispatch when the driver disallows it', async () => {
    const h = makeActions({
      details: [prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' })]
    });

    const result = await h.actions.merge(BEAD, {
      allow_conflict_resolution: false
    });

    expect(result).toMatchObject({
      ok: false,
      action: 'refused',
      reason: 'conflict_resolution_required'
    });
    expect(h.scheduler.resolveConflict).not.toHaveBeenCalled();
  });

  test('dispatches one resolver for the exact re-probed DIRTY identity', async () => {
    const h = makeActions({
      details: [prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' })]
    });
    const resolution_wait = { queue_bead_id: BEAD, wait_ms: 1_800_000 };

    const result = await h.actions.dispatchConflict(
      BEAD,
      {
        head_sha: 'sha-aaa',
        base_ref: 'main'
      },
      resolution_wait
    );

    expect(result).toMatchObject({
      ok: true,
      action: 'conflict_resolution',
      attempt_id: 'a2'
    });
    expect(h.scheduler.resolveConflict).toHaveBeenCalledTimes(1);
    expect(h.scheduler.resolveConflict).toHaveBeenCalledWith(
      WS,
      BEAD,
      resolution_wait
    );
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('dispatches a fresh attempt-less resolver for a reconciled pr_wait row', async () => {
    const store = createQueueStore();
    store.place(WS, {
      expected_revision: 0,
      bead_id: BEAD,
      lane: 's1'
    });
    store.reconcileExternalPrWait(WS, {
      bead_id: BEAD,
      pr_url: 'https://github.com/o/r/pull/304',
      head_ref: BEAD
    });
    const h = makeActions({
      store,
      external: {
        [BEAD]: {
          bead_id: BEAD,
          pr_url: 'https://github.com/o/r/pull/304',
          pr_number: 304,
          added_at: 1
        }
      },
      details: [prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' })]
    });
    const resolution_wait = {
      queue_bead_id: BEAD,
      wait_ms: 1_800_000,
      manual_authority: false
    };

    const result = await h.actions.dispatchConflict(
      BEAD,
      { head_sha: 'sha-aaa', base_ref: 'main' },
      resolution_wait
    );

    expect(result).toMatchObject({
      ok: true,
      action: 'conflict_resolution',
      attempt_id: 'x1'
    });
    expect(h.scheduler.resolveConflict).not.toHaveBeenCalled();
    expect(h.scheduler.dispatchExternalConflict).toHaveBeenCalledWith(
      WS,
      BEAD,
      'main',
      resolution_wait
    );
  });

  test('refuses a moved DIRTY identity without dispatching', async () => {
    const h = makeActions({
      details: [
        prOf({
          head_sha: 'sha-new',
          mergeable: 'CONFLICTING',
          merge_state_status: 'DIRTY'
        })
      ]
    });

    const result = await h.actions.dispatchConflict(BEAD, {
      head_sha: 'sha-old',
      base_ref: 'main'
    });

    expect(result).toMatchObject({
      ok: false,
      action: 'refused',
      reason: 'mergeability_identity_changed'
    });
    expect(h.scheduler.resolveConflict).not.toHaveBeenCalled();
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
    expect(h.worktree.removeByBranch).not.toHaveBeenCalled();
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

describe('post-merge cleanup — the pr-finish contract ORDER (§6)', () => {
  test('clears a base containment failure after a successful cleanup retry', async () => {
    let fail_fetch = true;
    const h = makeActions({
      gitFail: (args) => fail_fetch && args[0] === 'fetch'
    });

    await h.actions.merge(BEAD);
    fail_fetch = false;
    const result = await h.actions.retryCleanup(BEAD);

    expect(result).toMatchObject({ ok: true, step: null, reason: null });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toBeUndefined();
  });

  test('refuses a cleanup retry while an active discard owns the bead', async () => {
    const h = makeActions();
    h.store.recordCleanupFailure(WS, {
      bead_id: BEAD,
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed'
    });
    h.store.createDiscardOperation(WS, {
      expected_revision: h.store.snapshot(WS).revision,
      operation: {
        operation_id: 'discard-1',
        bead_id: BEAD,
        attempt_id: 'a1',
        source_snapshot: { repo: REPO, branch: BEAD }
      }
    });

    const result = await h.actions.retryCleanup(BEAD);

    expect(result).toMatchObject({
      ok: false,
      reason: 'discard_in_progress'
    });
    expect(h.calls).toEqual([]);
  });

  test('replays the complete cleanup from a prerecorded completion operation', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      verifyResults: [{ ok: true, reason: 'ok' }]
    });
    h.store.enqueueCompletionIntent(WS, {
      root_bead_id: BEAD,
      source_attempt_id: 'a1',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: BEAD,
        pr_url: 'https://github.com/o/r/pull/304',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: 'b'.repeat(40)
      }
    });
    h.store.setCompletionSubject(WS, {
      root_bead_id: BEAD,
      phase: 'cleaning',
      subject: h.store.snapshot(WS).completion_intents[BEAD].subject
    });
    h.store.prepareCompletionOp(WS, {
      root_bead_id: BEAD,
      phase: 'cleaning',
      op: {
        op_id: 'cleanup-1',
        kind: 'retry_cleanup',
        failure_key: {
          stage: 'post_merge_verify',
          reason: 'verify_cmd_failed',
          subject_sha: 'b'.repeat(40),
          base_sha: 'b'.repeat(40),
          result_digest: 'c'.repeat(64)
        },
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });

    const result = await h.actions.resumeCompletionCleanup(BEAD);
    expect(result).toMatchObject({ ok: true, step: null, reason: null });
    const queue = h.store.snapshot(WS);
    expect(
      queue.done.map((/** @type {any} */ entry) => entry.bead_id)
    ).toContain(BEAD);
    expect(queue.completion_intents[BEAD]).toMatchObject({
      phase: 'completed',
      active_op: null
    });
    expect(h.worktree.removeByBranch).toHaveBeenCalledTimes(1);
    expect(h.bd.setStatus).toHaveBeenCalledWith(BEAD, 'closed');
  });
});

describe('post-merge cleanup — bd status after a LATE failure (§6)', () => {
  test('leaves bd untouched when the branch cleanup fails — it now runs BEFORE the close', async () => {
    const h = makeActions({
      // The local branch delete fails and the confirming `rev-parse --verify`
      // still finds the branch → the cleanup stops at `branch_cleanup`, which
      // in the contract-aligned order is one step BEFORE the parent close.
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

    const requested = await h.actions.merge(BEAD);
    expect(requested).toMatchObject({ ok: false, action: 'merged' });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'branch_cleanup',
      reason: 'local_branch_delete_failed'
    });
    // Nothing closed the parent, so there is nothing to restore — `resolved`
    // still holds by itself.
    expect(h.calls).not.toContain('bd:setStatus:UI-1:closed');
    expect(h.calls).not.toContain('bd:setStatus:UI-1:resolved');
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'branch_cleanup',
      bd_restore: null
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

    const requested = await h.actions.merge(BEAD);
    expect(requested).toMatchObject({ ok: false, action: 'merged' });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'parent_close',
      reason: 'bd_close_failed'
    });
    expect(h.calls).toContain('bd:setStatus:UI-1:resolved');
    // The restore's own readback failed too — recorded, never left silent.
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'parent_close',
      bd_restore: 'restore_failed'
    });
    // The parent close is LAST now, so the branch cleanup already ran.
    expect(h.worktree.removeByBranch).toHaveBeenCalled();
  });

  test('does not touch bd when the cleanup stops BEFORE the parent close', async () => {
    const h = makeActions({ gitFail: (args) => args[0] === 'fetch' });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: false, cleanup_step: 'base_containment' });
    expect(h.bd.setStatus).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).cleanup_failed[BEAD].bd_restore).toBeNull();
  });
});

describe('post-merge cleanup — what step 1 did to the LOCAL checkout', () => {
  /** Checkout sitting on a clean base branch that cannot fast-forward. */
  function divergedCheckout() {
    return makeActions({
      gitBranch: 'main',
      gitStatus: '',
      gitResult: (args) => (args[0] === 'merge' ? 1 : null)
    });
  }

  test('reports a diverged local base without stopping the cleanup', async () => {
    const h = divergedCheckout();

    const r = await h.actions.merge(BEAD);

    expect(r.base_sync).toBe('fetch_only:diverged');
    expect(r.cleanup_step).not.toBe('base_containment');
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toBeUndefined();
  });

  test('leaves a diverged local base branch exactly where it was', async () => {
    const h = divergedCheckout();

    await h.actions.merge(BEAD);

    expect(
      h.git_argv.filter((args) => args[0] === 'reset' || args[0] === 'rebase')
    ).toEqual([]);
    expect(
      h.git_argv.filter(
        (args) => args[0] === 'merge' && !args.includes('--ff-only')
      )
    ).toEqual([]);
  });

  test('reports a dirty checkout the cleanup deliberately left alone', async () => {
    const h = makeActions({ gitBranch: 'main', gitStatus: ' M app/x.js\n' });

    const r = await h.actions.merge(BEAD);

    expect(r.base_sync).toBe('fetch_only:dirty');
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toBeUndefined();
  });

  test('reports a fast-forwarded base branch when the checkout allows it', async () => {
    const h = makeActions({ gitBranch: 'main', gitStatus: '' });

    const r = await h.actions.merge(BEAD);

    expect(r.base_sync).toBe('fast_forwarded');
  });

  test('still stops when the fetched base does not contain the merge', async () => {
    const h = makeActions({
      gitBranch: 'main',
      gitStatus: '',
      gitResult: (args) =>
        args[0] === 'merge' ? 1 : args[0] === 'merge-base' ? 1 : null
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: false, cleanup_step: 'base_containment' });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'base_containment',
      reason: 'deployment_target_not_covering_merge'
    });
  });

  test('still stops when the base cannot be fetched at all', async () => {
    const h = makeActions({
      gitBranch: 'main',
      gitStatus: '',
      gitFail: (args) => args[0] === 'fetch'
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: false, cleanup_step: 'base_containment' });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      reason: 'base_fetch_failed'
    });
  });
});

describe('post-merge cleanup — the worktree is FOUND, not named (UI-u7hh)', () => {
  test('clears a branch held by a worktree whose name is the collision fallback', async () => {
    const fallback = `${BEAD}-20260804`;
    const h = makeActions({
      // The contract's collision-ladder fallback: branch and worktree share the
      // `<bead-id>-<YYYYMMDD>` name, and neither is the bead id.
      details: [prOf({ head_ref: fallback })],
      worktrees: { [fallback]: fallback }
    });

    const r = await h.actions.merge(BEAD);
    expect(r).toMatchObject({ ok: true, reason: null });
    expect(h.worktree.removeByBranch).toHaveBeenCalledWith({
      repo: REPO,
      branch: fallback
    });
    expect(h.calls).toContain('git:push origin');
  });

  test('stops at branch_cleanup when the worktree observation itself fails', async () => {
    const h = makeActions({
      removeByBranchResult: {
        ok: false,
        removed: false,
        reason: 'observe_failed'
      }
    });

    const requested = await h.actions.merge(BEAD);
    expect(requested).toMatchObject({ ok: false, action: 'merged' });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'branch_cleanup',
      reason: 'worktree_remove_failed'
    });
    // A failed observation is never read as "already gone": nothing downstream
    // of it may run.
    expect(h.calls).not.toContain('git:branch -D');
    expect(h.calls).not.toContain('git:push origin');
  });

  test('stops at branch_cleanup when the match falls outside the owned worktree area', async () => {
    const h = makeActions({
      removeByBranchResult: {
        ok: false,
        removed: false,
        reason: 'foreign_worktree'
      }
    });

    const requested = await h.actions.merge(BEAD);
    expect(requested).toMatchObject({ ok: false, action: 'merged' });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'branch_cleanup',
      reason: 'worktree_remove_failed'
    });
    expect(h.calls).not.toContain('git:branch -D');
    expect(h.calls).not.toContain('git:push origin');
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
        c === 'wt:removeByBranch' ||
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
      'wt:removeByBranch',
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
  test('refuses observed cleanup while an active discard owns the bead', async () => {
    const h = makeActions();
    h.store.createDiscardOperation(WS, {
      expected_revision: h.store.snapshot(WS).revision,
      operation: {
        operation_id: 'discard-1',
        bead_id: BEAD,
        attempt_id: 'a1',
        source_snapshot: { repo: REPO, branch: BEAD }
      }
    });

    const result = await h.actions.cleanupObservedMerge(BEAD);

    expect(result).toMatchObject({
      ok: false,
      reason: 'discard_in_progress'
    });
    expect(h.calls).toEqual([]);
  });

  test('runs the identical cleanup path when a human merged on github.com', async () => {
    const merge_sha = 'c'.repeat(40);
    const h = makeActions({
      details: [prOf({ state: 'MERGED', merge_sha })]
    });
    const poller = createPrPoller({
      workspace: WS,
      repo: REPO,
      store: h.store,
      gh: /** @type {any} */ (h.gh),
      observations: h.observations,
      getSubscriberCount: () => 1,
      onMerged: (bead_id, observed_merge_sha) =>
        h.actions.cleanupObservedMerge(bead_id, observed_merge_sha),
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
          c === 'wt:removeByBranch'
      )
    ).toEqual([
      'git:fetch --no-tags',
      'wt:removeByBranch',
      'bd:setStatus:UI-1:closed'
    ]);
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

describe('post-merge cleanup — retiring the external row (UI-wwby §1)', () => {
  test('drops the bead from the external registry on a successful cleanup', async () => {
    const h = makeActions();

    await h.actions.merge(BEAD);
    expect(h.external_drop).toHaveBeenCalledWith(WS, BEAD);
  });

  test('drops it before the lane move, so no scan window can outlive it', async () => {
    const h = makeActions();
    /** @type {boolean|null} */
    let in_done_at_drop = null;
    h.external_drop.mockImplementation(() => {
      in_done_at_drop = h.store
        .snapshot(WS)
        .done.some((/** @type {any} */ e) => e.bead_id === BEAD);
      return true;
    });

    await h.actions.merge(BEAD);
    // The registry is the stale surface: retiring it only AFTER the bead lands
    // in `done` is the window this bug came through, so the drop is read
    // against the lane state at the moment it happens.
    expect(in_done_at_drop).toBe(false);
    expect(
      h.store.snapshot(WS).done.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('drops the row on the EXTERNAL cleanup path too', async () => {
    const h = makeActions({
      store: createQueueStore(),
      external: {
        'UI-ext2': {
          bead_id: 'UI-ext2',
          pr_url: 'https://github.com/o/r/pull/778',
          pr_number: 778,
          added_at: 1
        }
      },
      bdStatus: { 'UI-ext2': 'resolved' },
      bdPrUrl: 'https://github.com/o/r/pull/778'
    });

    await h.actions.merge('UI-ext2');
    // Promotion makes the provider handoff durable before request submission;
    // covered success retires the registry row and lands the promoted row.
    expect(h.external_drop).toHaveBeenCalledWith(WS, 'UI-ext2');
    expect(h.store.snapshot(WS).done).toEqual(
      expect.arrayContaining([expect.objectContaining({ bead_id: 'UI-ext2' })])
    );
  });

  test('does not drop the row when the cleanup fails before it', async () => {
    // The drop sits after every step that can stop the cleanup — a bead whose
    // close failed is still `resolved` and must
    // stay a registry row so the [정리] retry can find it.
    const h = makeActions({
      bdFail: (/** @type {string} */ method) => method === 'setStatus'
    });

    const requested = await h.actions.merge(BEAD);
    expect(requested).toMatchObject({ ok: false, action: 'merged' });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'parent_close'
    });
    expect(h.external_drop).not.toHaveBeenCalled();
  });
});

describe('[폐기] — the order-sensitive discard transition (discard spec §1)', () => {
  test('refuses the retired discard path while a unified discard is active', async () => {
    const h = makeActions();
    h.store.createDiscardOperation(WS, {
      expected_revision: h.store.snapshot(WS).revision,
      operation: {
        operation_id: 'discard-1',
        bead_id: BEAD,
        attempt_id: 'a1',
        source_snapshot: { repo: REPO, branch: BEAD }
      }
    });

    const result = await h.actions.discard(BEAD);

    expect(result).toEqual({ ok: false, reason: 'discard_in_progress' });
    expect(h.gh.prDetail).not.toHaveBeenCalled();
  });

  test('closes an OPEN pull request, restores bd, discards the worktree, and removes the bead from pr_wait', async () => {
    const h = makeActions();
    h.bd_status.set(BEAD, 'open');

    const r = await h.actions.discard(BEAD);

    expect(r).toEqual({ ok: true, reason: null });
    expect(
      h.calls.filter(
        (c) =>
          c === 'gh:prDetail' ||
          c === 'gh:closePr' ||
          c.startsWith('bd:') ||
          c === 'wt:removeByBranch' ||
          c === 'git:push origin'
      )
    ).toEqual([
      // The click re-reads the PR state before it closes anything.
      'gh:prDetail',
      'gh:closePr',
      'bd:setStatus:UI-1:open',
      'bd:readStatus:UI-1',
      'bd:unsetMetadata:UI-1:pr_url',
      'bd:readMetadata:UI-1:pr_url',
      'wt:removeByBranch',
      'git:push origin'
    ]);
  });

  test('leaves the bead in NO lane so the candidate lane reclaims it', async () => {
    const h = makeActions();
    h.bd_status.set(BEAD, 'open');

    await h.actions.discard(BEAD);

    const q = h.store.snapshot(WS);
    expect(q.pr_wait).toEqual([]);
    // Not requeued: re-running is the 후보 → 대기 drag, which re-passes
    // admission — so nothing is dispatched from here either.
    expect(q.queue).toEqual([]);
    expect(h.scheduler.tick).toHaveBeenCalledWith(WS);
  });

  test('skips the close when the authoritative re-read reports CLOSED-unmerged', async () => {
    const h = makeActions({ details: [prOf({ state: 'CLOSED' })] });
    h.bd_status.set(BEAD, 'open');

    const r = await h.actions.discard(BEAD);

    expect(r).toEqual({ ok: true, reason: null });
    expect(h.gh.closePr).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).pr_wait).toEqual([]);
  });

  test('closes a PR the cached observation called CLOSED but gh reports OPEN', async () => {
    const h = makeActions({ details: [prOf({ state: 'OPEN' })] });
    h.bd_status.set(BEAD, 'open');
    // A stale cache is advisory only — acting on it would skip the close of a
    // live PR and leave it open forever.
    h.observations.record(WS, BEAD, {
      error: null,
      pr: prOf({ state: 'CLOSED' })
    });

    const r = await h.actions.discard(BEAD);

    expect(r.ok).toBe(true);
    expect(h.gh.closePr).toHaveBeenCalledWith(REPO, 304);
  });

  test('refuses a MERGED pull request without touching bd', async () => {
    const h = makeActions({ details: [prOf({ state: 'MERGED' })] });

    const r = await h.actions.discard(BEAD);

    expect(r).toEqual({ ok: false, reason: 'pr_already_merged' });
    expect(h.gh.closePr).not.toHaveBeenCalled();
    expect(h.bd.setStatus).not.toHaveBeenCalled();
    expect(
      h.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('fails closed when the authoritative re-read cannot be completed', async () => {
    const h = makeActions({
      details: [{ state: 'error', reason: 'gh_failed' }]
    });

    const r = await h.actions.discard(BEAD);

    expect(r).toEqual({ ok: false, reason: 'pr_state_unknown:gh_failed' });
    expect(h.gh.closePr).not.toHaveBeenCalled();
    expect(h.bd.setStatus).not.toHaveBeenCalled();
    expect(
      h.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('stops before touching bd when the close fails', async () => {
    const h = makeActions();
    h.bd_status.set(BEAD, 'open');
    // A merge that landed between the re-read and the close shows up exactly
    // here: `gh pr close` refuses, and the bead is left for the poller's MERGED
    // cleanup.
    h.gh.closePr.mockImplementation(
      async () => /** @type {any} */ ({ state: 'error', reason: 'gh_failed' })
    );

    const r = await h.actions.discard(BEAD);

    expect(r).toEqual({ ok: false, reason: 'pr_close_failed:gh_failed' });
    expect(h.bd.setStatus).not.toHaveBeenCalled();
    expect(h.worktree.removeByBranch).not.toHaveBeenCalled();
    expect(
      h.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('refuses when the bd status readback does not confirm open', async () => {
    const h = makeActions();
    h.bd_status.set(BEAD, 'resolved');

    const r = await h.actions.discard(BEAD);

    expect(r).toMatchObject({ ok: false, reason: 'bd_status_readback_failed' });
    // The bead stays in `pr_wait` — a half-applied transition never leaves the
    // lane the poller and the banners read.
    expect(
      h.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('the poller cannot publish a discard own close as an abandonment', async () => {
    const h = makeActions({
      details: [prOf(), prOf({ state: 'CLOSED' })]
    });
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
    // A poll pass lands INSIDE the discard window: the PR is already closed by
    // the discard, and the bead has not left `pr_wait` yet.
    h.gh.closePr.mockImplementation(async () => {
      h.calls.push('gh:closePr');
      await poller.tick();
      return { state: 'ok', data: true };
    });

    await h.actions.discard(BEAD);

    // The poller really did read the closed PR inside the window (otherwise
    // this test would pass vacuously)…
    expect(h.gh.prDetail.mock.calls.length).toBeGreaterThan(1);
    // …and nothing about that CLOSED reading survives: it was refused at the
    // cache, so no "PR closed — 사람 처분 대기" can ever be published for it.
    expect(h.observations.get(WS, BEAD)).toBeNull();
    expect(h.observations.isDiscarding(WS, BEAD)).toBe(false);
    expect(h.store.snapshot(WS).pr_wait).toEqual([]);
  });

  test('releases the barrier after a refused discard so the real state is observable again', async () => {
    const h = makeActions({ details: [prOf({ state: 'MERGED' })] });

    await h.actions.discard(BEAD);

    expect(h.observations.isDiscarding(WS, BEAD)).toBe(false);
  });
});

describe('worker/pr-actions — merge progress (UI-raqh §4)', () => {
  test('walks request-bound closure steps in contract order', async () => {
    const env = makeActions();

    await env.actions.merge(BEAD);

    expect(env.steps).toEqual([
      'merging',
      'base_containment',
      'repo_operations',
      'child_sweep',
      'branch_cleanup',
      'parent_close',
      '(cleared)'
    ]);
  });

  test('holds no progress once the merge finished', async () => {
    const env = makeActions();

    await env.actions.merge(BEAD);

    expect(env.activity.get(WS, BEAD)).toBe(null);
  });

  test('releases the progress when a cleanup step fails', async () => {
    const env = makeActions({
      children: { [BEAD]: [{ id: `${BEAD}.1`, status: 'open' }] }
    });

    await env.actions.merge(BEAD);

    expect(env.activity.get(WS, BEAD)).toBe(null);
  });

  test('releases the progress before a conflict resolution is dispatched', async () => {
    const env = makeActions({
      details: [prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' })]
    });

    const r = await env.actions.merge(BEAD);

    expect(r.action).toBe('conflict_resolution');
    expect(env.steps.indexOf('(cleared)')).toBeLessThan(env.steps.length);
    expect(env.activity.get(WS, BEAD)).toBe(null);
  });

  test('releases the progress when the gate refuses the click', async () => {
    const env = makeActions({
      repoOperations: failedVerifyOperations()
    });

    const r = await env.actions.merge(BEAD);

    expect(r.ok).toBe(false);
    expect(env.activity.get(WS, BEAD)).toBe(null);
  });

  test('reports progress for an externally observed merge too', async () => {
    const env = makeActions({ details: [prOf({ state: 'MERGED' })] });

    await env.actions.cleanupObservedMerge(BEAD, 'c'.repeat(40));

    expect(env.steps[0]).toBe('base_containment');
    expect(env.steps[env.steps.length - 1]).toBe('(cleared)');

    expect(env.steps).toContain('parent_close');
  });
});

describe('worker/pr-actions — RepoOperation cleanup lane', () => {
  function repoOperations(overrides = {}) {
    return {
      hasConfig: vi.fn(async () => ({
        ok: true,
        present: true,
        verify_script_path: VERIFY_SCRIPT_PATH
      })),
      ensureVerify: vi.fn(async () => ({ ok: true, inert: true })),
      ensureDeploy: vi.fn(async () => ({ ok: true, inert: true })),
      waitForTerminal: vi.fn(),
      waitForDeployTerminal: vi.fn(async () => ({ state: 'succeeded' })),
      verifyReceipt: vi.fn(),
      findExactDeployOperation: vi.fn(async () => null),
      deploymentEvidence: vi.fn(async () => ({ state: 'succeeded' })),
      ...overrides
    };
  }

  test('uses an absent repo-ops gate without consulting legacy verify hooks', async () => {
    const resolveVerify = vi.fn(async () => ({ state: 'resolved' }));
    const operations = repoOperations({
      hasConfig: vi.fn(async () => ({ ok: true, present: false }))
    });
    const env = makeActions({
      repoOperations: operations,
      resolveVerify,
      details: [prOf({ head_sha: 'a'.repeat(40) })]
    });

    const result = await env.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, reason: null });
    expect(resolveVerify).not.toHaveBeenCalled();
    expect(env.runVerify).not.toHaveBeenCalled();
    expect(operations.ensureVerify).not.toHaveBeenCalled();
  });

  test('refuses an invalid repo-ops policy before merge or raw verify', async () => {
    const resolveVerify = vi.fn(async () => ({ state: 'resolved' }));
    const operations = repoOperations({
      hasConfig: vi.fn(async () => ({
        ok: false,
        code: 'repo_ops_config_invalid'
      }))
    });
    const env = makeActions({ repoOperations: operations, resolveVerify });

    const result = await env.actions.merge(BEAD);

    expect(result).toMatchObject({
      ok: false,
      action: 'refused',
      reason: 'repo_ops_config_invalid'
    });
    expect(resolveVerify).not.toHaveBeenCalled();
    expect(env.runVerify).not.toHaveBeenCalled();
    expect(env.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('uses coordinator and skips legacy verify and deploy for configured repos', async () => {
    const operations = repoOperations();
    const env = makeActions({
      repoOperations: operations,
      details: [prOf({ head_sha: 'a'.repeat(40) })]
    });

    const result = await env.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, reason: null });
    expect(operations.hasConfig).toHaveBeenNthCalledWith(1, 'a'.repeat(40), {
      current_target_base: true
    });
    expect(operations.ensureVerify).toHaveBeenCalledWith(
      expect.objectContaining({
        base_sha: 'a'.repeat(40),
        head_sha: 'a'.repeat(40)
      })
    );
    expect(operations.ensureDeploy).toHaveBeenCalledWith(
      expect.objectContaining({ target_sha: BASE_SHA })
    );
    expect(env.runVerify).not.toHaveBeenCalled();
    expect(env.calls).not.toContain('deploy:request');
    expect(env.store.snapshot(WS).done).toEqual(
      expect.arrayContaining([expect.objectContaining({ bead_id: BEAD })])
    );
  });

  test('returns a durable continuation outcome for pre-merge verify failure', async () => {
    const operations = repoOperations({
      ensureVerify: vi.fn(async () => ({
        ok: true,
        operation_id: 'verify-1',
        timeout_ms: 100
      })),
      waitForTerminal: vi.fn(async () => ({
        operation_id: 'verify-1',
        effective_base_sha: BASE_SHA,
        head_sha: 'a'.repeat(40),
        candidate_tree_sha: 'c'.repeat(40),
        script_object_type: 'blob',
        script_mode: '100755',
        script_blob_sha: 'd'.repeat(40),
        ok: false,
        reason: 'verify_cmd_failed',
        state: 'failed',
        at: 1
      }))
    });
    const env = makeActions({
      repoOperations: operations,
      details: [prOf({ state: 'OPEN', head_sha: 'a'.repeat(40) })]
    });

    const result = await env.actions.merge(BEAD);

    expect(result).toMatchObject({
      ok: false,
      action: 'verify_blocked',
      reason: 'verify_cmd_failed',
      head_sha: 'a'.repeat(40)
    });
    expect(operations.waitForTerminal).toHaveBeenCalledWith('verify-1', {
      head_sha: 'a'.repeat(40),
      timeout_ms: 100
    });
  });

  test('waits for terminal deploy evidence before closing one cleanup', async () => {
    const operations = repoOperations({
      ensureDeploy: vi.fn(async () => ({
        ok: true,
        operation_id: 'deploy-1',
        timeout_ms: 321
      })),
      waitForDeployTerminal: vi.fn(async () => ({ state: 'succeeded' })),
      deploymentEvidence: vi.fn(async () => ({ state: 'running' }))
    });
    const env = makeActions({
      repoOperations: operations,
      details: [prOf({ head_sha: 'a'.repeat(40) })]
    });

    const completed = await env.actions.merge(BEAD);

    expect(operations.waitForDeployTerminal).toHaveBeenCalledWith('deploy-1', {
      target_base: 'main',
      merged_sha: 'c'.repeat(40),
      timeout_ms: 321
    });
    expect(completed).toMatchObject({ ok: true, reason: null });
    expect(env.bd.setStatus).toHaveBeenCalledWith(BEAD, 'closed');
    expect(env.store.snapshot(WS).done).toEqual(
      expect.arrayContaining([expect.objectContaining({ bead_id: BEAD })])
    );
  });

  test('keeps cleanup pending when deploy wait reaches its deadline', async () => {
    const operations = repoOperations({
      ensureDeploy: vi.fn(async () => ({
        ok: true,
        operation_id: 'deploy-1',
        timeout_ms: 321
      })),
      waitForDeployTerminal: vi.fn(async () => ({
        state: 'running',
        operation_id: 'deploy-1'
      }))
    });
    const env = makeActions({
      repoOperations: operations,
      details: [prOf({ head_sha: 'a'.repeat(40) })]
    });

    const result = await env.actions.merge(BEAD);

    expect(result).toMatchObject({
      ok: true,
      action: 'cleanup_pending',
      cleanup_step: 'repo_operations',
      reason: null
    });
    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toBeUndefined();
  });

  test('records terminal deploy failure diagnostics and log', async () => {
    const operations = repoOperations({
      ensureDeploy: vi.fn(async () => ({
        ok: true,
        operation_id: 'deploy-1',
        timeout_ms: 321
      })),
      waitForDeployTerminal: vi.fn(async () => ({
        state: 'failed',
        operation_id: 'deploy-1',
        code: 'repo_ops_fetch_failed',
        fetch_failure: 'nonzero',
        elapsed_ms: 28,
        log_path: '/tmp/deploy.log'
      }))
    });
    const env = makeActions({
      repoOperations: operations,
      details: [prOf({ head_sha: 'a'.repeat(40) })]
    });

    const result = await env.actions.merge(BEAD);

    expect(result).toMatchObject({
      ok: false,
      cleanup_step: 'repo_operations',
      reason: 'repo_ops_fetch_failed'
    });
    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      reason: 'repo_ops_fetch_failed',
      failure_code: 'repo_ops_fetch_failed',
      fetch_failure: 'nonzero',
      elapsed_ms: 28,
      log_path: '/tmp/deploy.log'
    });
  });

  test('records deploy fetch diagnostics on the durable cleanup failure', async () => {
    const operations = repoOperations({
      ensureDeploy: vi.fn(async () => ({
        ok: false,
        code: 'repo_ops_fetch_failed',
        fetch_failure: 'timeout',
        elapsed_ms: 60_123
      }))
    });
    const env = makeActions({
      repoOperations: operations,
      details: [prOf({ head_sha: 'a'.repeat(40) })]
    });

    const result = await env.actions.merge(BEAD);

    expect(result).toMatchObject({
      ok: false,
      cleanup_step: 'repo_operations',
      reason: 'repo_ops_fetch_failed'
    });
    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      reason: 'repo_ops_fetch_failed',
      fetch_failure: 'timeout',
      elapsed_ms: 60_123
    });
  });
});

describe('post-merge cleanup — verify absent builds no verify stage (§7.2/§8)', () => {
  const NO_VERIFY_BEAD = 'UI-nv';
  const NO_VERIFY_URL = 'https://github.com/o/r/pull/777';

  /**
   * The coordinator interface over a base whose repo-ops config declares
   * `[deploy]` only — `verify_script_path: null` is exactly what `hasConfig`
   * reports for a `[verify]`-less base.
   *
   * @param {string|null} verify_script_path
   * @returns {any}
   */
  function coordinatorFor(verify_script_path) {
    return {
      hasConfig: vi.fn(async () => ({
        ok: true,
        present: true,
        verify_script_path
      })),
      ensureVerify: vi.fn(async () => ({ ok: true, inert: true })),
      ensureDeploy: vi.fn(async () => ({ ok: true, inert: true })),
      waitForTerminal: vi.fn(),
      waitForDeployTerminal: vi.fn(async () => ({ state: 'succeeded' })),
      verifyReceipt: vi.fn(),
      findExactDeployOperation: vi.fn(async () => null),
      deploymentEvidence: vi.fn(async () => ({ state: 'succeeded' }))
    };
  }

  /**
   * The boot-resume shape `resumeRepoOperations` reads back after a restart: a
   * nonterminal `repo_operations` row carrying its merge SHA, and nothing at
   * all in the non-persistent observation cache.
   *
   * @param {any} store
   */
  function seedResumableRow(store) {
    store.setCleanupCursor(WS, {
      bead_id: BEAD,
      cursor: 'base_containment',
      merge_sha: 'c'.repeat(40),
      head_ref: BEAD,
      pr_url: 'https://github.com/o/r/pull/304'
    });
    store.setCleanupCursor(WS, { bead_id: BEAD, cursor: 'repo_operations' });
  }

  /**
   * An external merged row whose PR detail carries no usable head SHA — the
   * [정리] click's only source for one.
   *
   * @param {any} operations
   */
  function externalMergedOptions(operations) {
    return {
      ...ON_BASE,
      store: createQueueStore(),
      external: {
        [NO_VERIFY_BEAD]: {
          bead_id: NO_VERIFY_BEAD,
          pr_url: NO_VERIFY_URL,
          pr_number: 777,
          added_at: 1
        }
      },
      bdStatus: { [NO_VERIFY_BEAD]: 'resolved' },
      bdPrUrl: NO_VERIFY_URL,
      details: [prOf({ state: 'MERGED', merged_sha: 'c'.repeat(40) })],
      repoOperations: operations
    };
  }

  test('runs no verify operation when a boot-resumed base declares none', async () => {
    const operations = coordinatorFor(null);
    const env = makeActions({ ...ON_BASE, repoOperations: operations });
    seedResumableRow(env.store);

    await env.actions.resumeRepoOperations();

    expect(operations.ensureVerify).not.toHaveBeenCalled();
  });

  test('reaches deploy on a boot-resumed base that declares no verify', async () => {
    const operations = coordinatorFor(null);
    const env = makeActions({ ...ON_BASE, repoOperations: operations });
    seedResumableRow(env.store);

    await env.actions.resumeRepoOperations();

    expect(operations.ensureDeploy).toHaveBeenCalledOnce();
  });

  test('records no cleanup failure for a boot-resumed base without verify', async () => {
    const operations = coordinatorFor(null);
    const env = makeActions({ ...ON_BASE, repoOperations: operations });
    seedResumableRow(env.store);

    await env.actions.resumeRepoOperations();

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toBeUndefined();
  });

  test('adopts an exact boot-resumed deploy without fetching the base again', async () => {
    const operations = coordinatorFor(null);
    operations.findExactDeployOperation.mockResolvedValue({
      operation_id: 'deploy-1',
      timeout_ms: 4321
    });
    operations.waitForDeployTerminal.mockResolvedValue({
      state: 'succeeded',
      operation_id: 'deploy-1'
    });
    const env = makeActions({ ...ON_BASE, repoOperations: operations });
    seedResumableRow(env.store);

    await env.actions.resumeRepoOperations();

    expect(operations.findExactDeployOperation).toHaveBeenCalledWith({
      target_base: 'main',
      bead_id: BEAD,
      merged_sha: 'c'.repeat(40)
    });
    expect(operations.waitForDeployTerminal).toHaveBeenCalledWith('deploy-1', {
      target_base: 'main',
      merged_sha: 'c'.repeat(40),
      timeout_ms: 4321
    });
    expect(env.git_argv.some((args) => args[0] === 'fetch')).toBe(false);
    expect(operations.ensureDeploy).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).pr_wait).toEqual([]);
  });

  test('keeps an exact boot-resumed deploy pending without a cleanup failure', async () => {
    const operations = coordinatorFor(null);
    operations.findExactDeployOperation.mockResolvedValue({
      operation_id: 'deploy-1',
      timeout_ms: 4321
    });
    operations.waitForDeployTerminal.mockResolvedValue({
      state: 'running',
      operation_id: 'deploy-1'
    });
    const env = makeActions({ ...ON_BASE, repoOperations: operations });
    seedResumableRow(env.store);

    await env.actions.resumeRepoOperations();

    expect(env.store.snapshot(WS).pr_wait[0]).toMatchObject({
      bead_id: BEAD,
      cleanup_cursor: 'repo_operations'
    });
    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toBeUndefined();
    expect(env.git_argv.some((args) => args[0] === 'fetch')).toBe(false);
  });

  test('preserves exact boot-resumed deploy failure diagnostics and log', async () => {
    const operations = coordinatorFor(null);
    operations.findExactDeployOperation.mockResolvedValue({
      operation_id: 'deploy-1',
      timeout_ms: 4321
    });
    operations.waitForDeployTerminal.mockResolvedValue({
      state: 'failed',
      operation_id: 'deploy-1',
      code: 'repo_ops_fetch_failed',
      fetch_failure: 'timeout',
      elapsed_ms: 99,
      log_path: '/tmp/deploy.log'
    });
    const env = makeActions({ ...ON_BASE, repoOperations: operations });
    seedResumableRow(env.store);

    await env.actions.resumeRepoOperations();

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'repo_operations',
      reason: 'repo_ops_fetch_failed',
      failure_code: 'repo_ops_fetch_failed',
      fetch_failure: 'timeout',
      elapsed_ms: 99,
      log_path: '/tmp/deploy.log'
    });
    expect(env.git_argv.some((args) => args[0] === 'fetch')).toBe(false);
  });

  test('fails closed when exact boot-resumed deploy timeout is unresolved', async () => {
    const operations = coordinatorFor(null);
    operations.findExactDeployOperation.mockResolvedValue({
      operation_id: 'deploy-1',
      code: 'repo_operation_timeout_unresolved'
    });
    const env = makeActions({ ...ON_BASE, repoOperations: operations });
    seedResumableRow(env.store);

    await env.actions.resumeRepoOperations();

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'repo_operations',
      reason: 'repo_operation_timeout_unresolved',
      failure_code: 'repo_operation_timeout_unresolved'
    });
    expect(operations.waitForDeployTerminal).not.toHaveBeenCalled();
    expect(env.git_argv.some((args) => args[0] === 'fetch')).toBe(false);
  });

  /**
   * A row interrupted INSIDE the closure half: the repo operations already
   * reached terminal success (that is the only way the cursor gets this far),
   * and the process died before the step could record success or failure — so
   * there is no `cleanup_failed` entry for the [정리] click to resume from.
   * beads-ui deploys itself by restarting its own service, so this window is
   * reachable on every self-deploy.
   *
   * @param {any} store
   * @param {string} cursor
   */
  function seedInterruptedClosureRow(store, cursor) {
    store.setCleanupCursor(WS, {
      bead_id: BEAD,
      cursor: 'base_containment',
      merge_sha: 'c'.repeat(40),
      head_ref: BEAD,
      pr_url: 'https://github.com/o/r/pull/305'
    });
    // The cursor is monotonic and advances ONE step at a time, exactly as the
    // live closure walks it — a seed that jumps is silently ignored.
    for (const step of ['repo_operations', 'child_sweep', 'branch_cleanup']) {
      store.setCleanupCursor(WS, { bead_id: BEAD, cursor: step });
      if (step === cursor) {
        break;
      }
    }
    if (cursor === 'parent_close') {
      store.setCleanupCursor(WS, { bead_id: BEAD, cursor });
    }
    if (store.snapshot(WS).pr_wait[0]?.cleanup_cursor !== cursor) {
      throw new Error(`seed failed to reach ${cursor}`);
    }
  }

  test.each(['child_sweep', 'branch_cleanup', 'parent_close'])(
    'resumes a row interrupted at %s and takes it out of pr_wait',
    async (cursor) => {
      const env = makeActions({
        ...ON_BASE,
        repoOperations: coordinatorFor(null)
      });
      seedInterruptedClosureRow(env.store, cursor);

      await env.actions.resumeRepoOperations();

      expect(
        env.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
      ).toEqual([]);
    }
  );

  test('runs no repo operation when resuming a row already past them', async () => {
    const operations = coordinatorFor(null);
    const env = makeActions({ ...ON_BASE, repoOperations: operations });
    seedInterruptedClosureRow(env.store, 'branch_cleanup');

    await env.actions.resumeRepoOperations();

    expect(operations.ensureDeploy).not.toHaveBeenCalled();
  });

  test('completes the external merged [정리] click when the base declares no verify', async () => {
    const operations = coordinatorFor(null);
    const env = makeActions(externalMergedOptions(operations));

    const result = await env.actions.merge(NO_VERIFY_BEAD);

    expect(result).toMatchObject({ ok: true, reason: null });
  });

  test('runs no verify operation on the external merged [정리] click without a head SHA', async () => {
    const operations = coordinatorFor(null);
    const env = makeActions(externalMergedOptions(operations));

    await env.actions.merge(NO_VERIFY_BEAD);

    expect(operations.ensureVerify).not.toHaveBeenCalled();
  });

  test('fails closed with the missing-input reason when verify is declared but no head SHA exists', async () => {
    const operations = coordinatorFor(VERIFY_SCRIPT_PATH);
    const env = makeActions(externalMergedOptions(operations));

    const result = await env.actions.merge(NO_VERIFY_BEAD);

    expect(result).toMatchObject({
      ok: false,
      cleanup_step: 'repo_operations',
      reason: 'verify_head_sha_unobserved'
    });
  });

  test('starts no verify operation when the declared verify has no head SHA', async () => {
    const operations = coordinatorFor(VERIFY_SCRIPT_PATH);
    const env = makeActions(externalMergedOptions(operations));

    await env.actions.merge(NO_VERIFY_BEAD);

    expect(operations.ensureVerify).not.toHaveBeenCalled();
  });
});

describe('worker/pr-actions — external PR rows (UI-7agi §4)', () => {
  const EXTERNAL_BEAD = 'UI-ext';
  const EXTERNAL_URL = 'https://github.com/o/r/pull/777';

  /**
   * A registry row for a bead the durable lane never held, plus the bd answers
   * the click-time re-read expects. `bdStatus` defaults to `resolved` because
   * that is what makes the row exist at all.
   *
   * @param {Record<string, any>} [over]
   */
  function externalOptions(over = {}) {
    return {
      store: createQueueStore(),
      external: {
        [EXTERNAL_BEAD]: {
          bead_id: EXTERNAL_BEAD,
          pr_url: EXTERNAL_URL,
          pr_number: 777,
          added_at: 1
        }
      },
      bdStatus: { [EXTERNAL_BEAD]: 'resolved' },
      bdPrUrl: EXTERNAL_URL,
      ...over
    };
  }

  test('merges an external row the durable pr_wait never held', async () => {
    const env = makeActions(externalOptions());

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r.action).toBe('merged');
    expect(env.gh.mergeSquash).toHaveBeenCalled();
  });

  test('resolves the PR number from the registry when no attempt exists', async () => {
    const env = makeActions(externalOptions());

    await env.actions.merge(EXTERNAL_BEAD);

    expect(env.gh.prDetail).toHaveBeenCalledWith(REPO, 777);
  });

  test('refuses when bd no longer reports the bead resolved', async () => {
    const env = makeActions(
      externalOptions({ bdStatus: { [EXTERNAL_BEAD]: 'closed' } })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r).toEqual({ ok: false, action: 'refused', reason: 'not_resolved' });
    expect(env.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('refuses when pr_url was removed between render and click', async () => {
    const env = makeActions(externalOptions({ bdPrUrl: null }));

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r).toEqual({
      ok: false,
      action: 'refused',
      reason: 'pr_url_missing'
    });
  });

  test('refuses a bead in neither the lane nor the registry', async () => {
    const env = makeActions(externalOptions({ external: {} }));

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r).toEqual({
      ok: false,
      action: 'refused',
      reason: 'not_in_pr_wait'
    });
  });

  test('refuses when the click-time bd re-read fails', async () => {
    const env = makeActions(
      externalOptions({
        bdFail: (/** @type {string} */ method) => method === 'readIssue'
      })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r).toEqual({
      ok: false,
      action: 'refused',
      reason: 'bd_read_failed'
    });
  });

  test('runs cleanup only for an external MERGED row, never a second merge', async () => {
    const env = makeActions(
      externalOptions({
        details: [prOf({ state: 'MERGED', merged_sha: 'c'.repeat(40) })]
      })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r.action).toBe('already_merged');
    expect(env.gh.mergeSquash).not.toHaveBeenCalled();
    expect(env.calls).toContain('git:fetch --no-tags');
  });

  test('refuses an external CLOSED PR', async () => {
    const env = makeActions(
      externalOptions({ details: [prOf({ state: 'CLOSED' })] })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r.reason).toBe('pr_closed_unmerged');
  });

  test('dispatches an attempt-less resolution session for an external conflict', async () => {
    const env = makeActions(
      externalOptions({
        details: [
          prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' })
        ]
      })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r).toMatchObject({
      ok: true,
      action: 'conflict_resolution',
      reason: null,
      attempt_id: 'x1'
    });
    // The attempt-less path, never the relaunch one.
    expect(env.scheduler.resolveConflict).not.toHaveBeenCalled();
  });

  test('forwards the base_ref this click observed as the resolution target_base', async () => {
    const env = makeActions(
      externalOptions({
        // The base gate (worker-base-scope-alignment §5) runs first, so the
        // declaration must agree with the observation for the click to get as
        // far as the conflict dispatch.
        declaredBase: 'develop',
        details: [
          prOf({
            mergeable: 'CONFLICTING',
            merge_state_status: 'DIRTY',
            base_ref: 'develop'
          })
        ]
      })
    );

    await env.actions.merge(EXTERNAL_BEAD);

    expect(env.scheduler.dispatchExternalConflict).toHaveBeenCalledWith(
      WS,
      EXTERNAL_BEAD,
      'develop'
    );
  });

  test('refuses an external BEHIND row without updating it', async () => {
    const env = makeActions(
      externalOptions({
        declaredBase: 'release',
        details: [
          prOf({ merge_state_status: 'BEHIND', base_ref: 'release' }),
          prOf({
            mergeable: 'CONFLICTING',
            merge_state_status: 'DIRTY',
            base_ref: 'release'
          })
        ]
      })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(env.gh.updateBranch).not.toHaveBeenCalled();
    expect(r).toMatchObject({ ok: false, reason: 'base_behind' });
    expect(env.scheduler.dispatchExternalConflict).not.toHaveBeenCalled();
    expect(env.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('routes an externally merged row through the coordinator interface', async () => {
    const ensureVerify = vi.fn(async () => ({
      ok: true,
      operation_id: 'verify-final',
      timeout_ms: 100
    }));
    const ensureDeploy = vi.fn(async () => ({ ok: true, inert: true }));
    const env = makeActions(
      externalOptions({
        details: [
          prOf({
            state: 'MERGED',
            head_sha: 'a'.repeat(40),
            merged_sha: 'c'.repeat(40)
          })
        ],
        repoOperations: {
          hasConfig: vi.fn(async () => ({
            ok: true,
            present: true,
            verify_script_path: VERIFY_SCRIPT_PATH
          })),
          ensureVerify,
          ensureDeploy,
          waitForTerminal: vi.fn(async () => ({
            state: 'succeeded',
            ok: true,
            reason: 'ok'
          })),
          waitForDeployTerminal: vi.fn(async () => ({ state: 'succeeded' })),
          verifyReceipt: vi.fn(),
          findExactDeployOperation: vi.fn(async () => null),
          deploymentEvidence: vi.fn()
        }
      })
    );

    const result = await env.actions.merge(EXTERNAL_BEAD);

    expect(result).toMatchObject({ ok: true, action: 'already_merged' });
    expect(ensureVerify).toHaveBeenCalledWith(
      expect.objectContaining({
        final_sha: 'c'.repeat(40),
        receipt_operation_id: null
      })
    );
    expect(ensureDeploy).toHaveBeenCalledOnce();
    expect(env.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('reports a refused external dispatch on the same result channel', async () => {
    const env = makeActions(
      externalOptions({
        details: [
          prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' })
        ],
        externalConflictResult: { ok: false, reason: 'worktree_missing' }
      })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r).toMatchObject({
      ok: false,
      action: 'conflict_resolution',
      reason: 'worktree_missing',
      attempt_id: null
    });
  });

  test('refuses a second click while an external dispatch is in flight', async () => {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((r) => {
      release = () => r(undefined);
    });
    const env = makeActions(
      externalOptions({
        details: [
          prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' })
        ]
      })
    );
    env.scheduler.dispatchExternalConflict.mockImplementation(async () => {
      await gate;
      return { ok: true, attempt_id: 'x1' };
    });

    const first = env.actions.merge(EXTERNAL_BEAD);
    const second = await env.actions.merge(EXTERNAL_BEAD);
    release();
    await first;

    expect(second).toEqual({
      ok: false,
      action: 'refused',
      reason: 'action_in_flight'
    });
    expect(env.scheduler.dispatchExternalConflict).toHaveBeenCalledTimes(1);
  });

  test('syncs the DECLARED base, never the one gh reports', async () => {
    const env = makeActions(
      externalOptions({
        declaredBase: 'develop',
        details: [
          prOf({
            state: 'MERGED',
            base_ref: 'develop',
            merged_sha: 'c'.repeat(40)
          })
        ]
      })
    );

    await env.actions.merge(EXTERNAL_BEAD);

    expect(env.git_argv).toContainEqual([
      'fetch',
      '--no-tags',
      'origin',
      'develop'
    ]);
  });

  test('refuses fail-closed when the observed base differs from the declared one', async () => {
    const env = makeActions(
      externalOptions({
        // An external PR opened with no `--base` lands on the GitHub default;
        // the repo declares something else. This is the bug §5 exists for.
        declaredBase: 'ilsun/dev',
        details: [prOf({ state: 'OPEN', base_ref: 'main' })]
      })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r).toMatchObject({
      ok: false,
      reason: 'base_mismatch:ilsun/dev!=main'
    });
    expect(env.gh.mergeSquash).not.toHaveBeenCalled();
    expect(env.git_argv).toEqual([]);
  });

  test('never auto-retargets a mismatched PR', async () => {
    const env = makeActions(
      externalOptions({
        declaredBase: 'ilsun/dev',
        details: [prOf({ state: 'OPEN', base_ref: 'main' })]
      })
    );

    await env.actions.merge(EXTERNAL_BEAD);

    expect(env.calls.filter((c) => c.includes('edit'))).toEqual([]);
  });

  test('refuses an already-merged PR whose base was wrong instead of cleaning up', async () => {
    const env = makeActions(
      externalOptions({
        declaredBase: 'ilsun/dev',
        details: [prOf({ state: 'MERGED', base_ref: 'main' })]
      })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r).toMatchObject({
      ok: false,
      reason: 'base_mismatch:ilsun/dev!=main'
    });
    // No sync, no verify, no deploy, no bead close — the landing is REPORTED,
    // not papered over.
    expect(env.git_argv).toEqual([]);
  });

  test('refuses when the declaration itself cannot be resolved', async () => {
    const env = makeActions(
      externalOptions({
        resolveBase: async () => ({
          ok: false,
          step: 'ref',
          base: 'ilsun/dv',
          detail: 'refs/remotes/origin/ilsun/dv'
        }),
        details: [prOf({ state: 'OPEN', base_ref: 'main' })]
      })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r).toMatchObject({ ok: false, reason: 'base_unresolved:ref' });
    expect(env.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('ignores a prior resolution attempt when resolving the cleanup base', async () => {
    const env = makeActions(
      externalOptions({
        declaredBase: 'develop',
        details: [
          prOf({
            state: 'MERGED',
            base_ref: 'develop',
            merged_sha: 'c'.repeat(40)
          })
        ]
      })
    );
    // A resolution session ran against the base the CLICK saw back then, and it
    // is not the record that produced the PR (UI-w0hi). It must not outrank the
    // repo DECLARATION either — the expected base has exactly two sources and an
    // external-conflict attempt is neither (worker-base-scope-alignment §5).
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'ext-conf-1', bead_id: EXTERNAL_BEAD }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'ext-conf-1',
      patch: {
        status: 'done',
        finished_at: 9999,
        repo: REPO,
        target_base: 'main',
        conflict_resolution: true,
        external_conflict: true
      }
    });

    await env.actions.merge(EXTERNAL_BEAD);

    expect(env.git_argv).toContainEqual([
      'fetch',
      '--no-tags',
      'origin',
      'develop'
    ]);
  });

  test('deletes the head branch gh names when it differs from the bead id', async () => {
    const env = makeActions(
      externalOptions({
        details: [
          prOf({
            state: 'MERGED',
            head_ref: 'feature/from-session',
            merged_sha: 'c'.repeat(40)
          })
        ]
      })
    );

    await env.actions.merge(EXTERNAL_BEAD);
    expect(env.git_argv).toContainEqual([
      'branch',
      '-D',
      'feature/from-session'
    ]);
  });

  test('refuses [폐기] on an external row — it has no durable lane membership', async () => {
    const env = makeActions(externalOptions());

    const r = await env.actions.discard(EXTERNAL_BEAD);

    expect(r).toEqual({ ok: false, reason: 'not_in_pr_wait' });
  });

  test('re-reads review authority before merging a durable pr_wait row', async () => {
    const env = makeActions();

    const r = await env.actions.merge(BEAD);

    expect(r.action).toBe('merged');
    const click = env.calls.slice(0, env.calls.indexOf('gh:mergeSquash'));
    expect(click).toContain(`bd:readIssue:${BEAD}`);
  });
});

describe('worker/pr-actions — external rows acquire a durable deployment handoff', () => {
  const EXTERNAL_BEAD = 'UI-ext';
  const EXTERNAL_URL = 'https://github.com/o/r/pull/777';

  /**
   * @param {Record<string, any>} [over]
   */
  function externalOptions(over = {}) {
    return {
      store: createQueueStore(),
      external: {
        [EXTERNAL_BEAD]: {
          bead_id: EXTERNAL_BEAD,
          pr_url: EXTERNAL_URL,
          pr_number: 777,
          added_at: 1
        }
      },
      bdStatus: { [EXTERNAL_BEAD]: 'resolved' },
      bdPrUrl: EXTERNAL_URL,
      ...over
    };
  }

  test('a covered external cleanup moves the promoted row into done', async () => {
    const env = makeActions(externalOptions());

    await env.actions.merge(EXTERNAL_BEAD);
    expect(
      env.store.snapshot(WS).done.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([EXTERNAL_BEAD]);
  });

  test('a completed WORKER cleanup still pushes the bead into done', async () => {
    const env = makeActions();

    await env.actions.merge(BEAD);
    expect(
      env.store.snapshot(WS).done.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('a failed external handoff records durable cleanup_failed', async () => {
    const env = makeActions(
      externalOptions({
        gitFail: (/** @type {string[]} */ args) => args[0] === 'fetch'
      })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r.ok).toBe(false);
    expect(env.store.snapshot(WS).cleanup_failed[EXTERNAL_BEAD]).toMatchObject({
      step: 'base_containment',
      reason: 'base_fetch_failed'
    });
  });

  test('a failed WORKER cleanup still records cleanup_failed', async () => {
    const env = makeActions({
      gitFail: (/** @type {string[]} */ args) => args[0] === 'fetch'
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'base_containment'
    });
  });

  test('reads status and pr_url atomically before the review read', async () => {
    const env = makeActions(externalOptions());

    await env.actions.merge(EXTERNAL_BEAD);

    const click = env.calls.slice(0, env.calls.indexOf('gh:mergeSquash'));
    expect(click.filter((c) => c.startsWith('bd:readIssue:'))).toHaveLength(2);
  });

  test('refuses when the bd adapter cannot answer atomically', async () => {
    const env = makeActions(externalOptions());
    // @ts-expect-error - modelling a legacy adapter without the atomic read.
    delete env.bd.readIssue;

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r).toEqual({
      ok: false,
      action: 'refused',
      reason: 'bd_read_unsupported'
    });
  });

  test('takes the PR number from the click-time url, not the cached row', async () => {
    const env = makeActions(
      externalOptions({
        // The registry row is one scan stale: the bead has since been
        // re-delivered against PR 778.
        bdPrUrl: 'https://github.com/o/r/pull/778'
      })
    );

    await env.actions.merge(EXTERNAL_BEAD);

    expect(env.gh.prDetail).toHaveBeenCalledWith(REPO, 778);
    expect(env.gh.prDetail).not.toHaveBeenCalledWith(REPO, 777);
  });
});

describe('post-merge cleanup — the merge notification (UI-9rrk)', () => {
  const EXT_BEAD = 'UI-EXT';
  const EXT_URL = 'https://github.com/o/r/pull/777';

  test('announces the merge once on the immediate success path', async () => {
    const h = makeActions({ verify: VERIFY_CFG, ...ON_BASE });

    const r = await h.actions.merge(BEAD);
    expect(r.ok).toBe(true);
    expect(h.notify.mergeCompleted).toHaveBeenCalledTimes(1);
    expect(h.merge_notices[0]).toEqual({
      bead_id: BEAD,
      pr_url: 'https://github.com/o/r/pull/304',
      repo: REPO
    });
  });

  test('announces the externally-observed merge through the same hook', async () => {
    const h = makeActions({ details: [prOf({ state: 'MERGED' })] });

    const r = await h.actions.cleanupObservedMerge(BEAD, 'c'.repeat(40));
    expect(r.ok).toBe(true);
    expect(h.notify.mergeCompleted).toHaveBeenCalledTimes(1);
    // No click resolved a url here, so this is the snapshot fallback: the
    // attempt's own recorded PR.
    expect(h.merge_notices[0]).toEqual({
      bead_id: BEAD,
      pr_url: 'https://github.com/o/r/pull/304',
      repo: REPO
    });
  });

  test('names the PR the click merged, not a stale external registry row', async () => {
    const fresh_url = 'https://github.com/o/r/pull/778';
    const h = makeActions({
      store: createQueueStore(),
      external: {
        // One scan stale: the bead has since been re-delivered against 778.
        [EXT_BEAD]: {
          bead_id: EXT_BEAD,
          pr_url: EXT_URL,
          pr_number: 777,
          added_at: 1
        }
      },
      bdStatus: { [EXT_BEAD]: 'resolved' },
      bdPrUrl: fresh_url,
      details: [prOf({ number: 778, url: fresh_url })]
    });

    await h.actions.merge(EXT_BEAD);
    expect(h.merge_notices[0]).toEqual({
      bead_id: EXT_BEAD,
      pr_url: fresh_url,
      repo: REPO
    });
  });

  test('announces nothing when the cleanup stops mid-sequence', async () => {
    // The merge lands, then the base sync fails: the cleanup stops before the
    // parent close, so nothing may be announced.
    const h = makeActions({
      gitFail: (args) => args[0] === 'fetch',
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: false, cleanup_step: 'base_containment' });
    expect(h.notify.mergeCompleted).not.toHaveBeenCalled();
  });

  test('announces nothing when the click-time gate refuses the merge', async () => {
    const h = makeActions({
      repoOperations: failedVerifyOperations()
    });

    const r = await h.actions.merge(BEAD);

    expect(r.ok).toBe(false);
    expect(h.notify.mergeCompleted).not.toHaveBeenCalled();
  });

  test('cleans up normally when no notifier is injected at all', async () => {
    const h = makeActions({ noNotify: true, verify: VERIFY_CFG, ...ON_BASE });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, reason: null });
    expect(h.notify.mergeCompleted).not.toHaveBeenCalled();
  });
});

describe('worker/pr-actions — base gate operand separation (worker-base-scope-alignment §5)', () => {
  /**
   * A worker attempt PR: the attempt that PRODUCED the PR recorded the base its
   * branch was cut from.
   *
   * @param {string|null} target_base - null models a legacy attempt.
   */
  function attemptStore(target_base) {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'a1', bead_id: BEAD }
    });
    store.updateAttempt(WS, {
      attempt_id: 'a1',
      patch: {
        repo: REPO,
        ...(target_base === null ? {} : { target_base }),
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
    return store;
  }

  test('a worker attempt base outranks the declaration', async () => {
    const env = makeActions({
      store: attemptStore('main'),
      declaredBase: 'ilsun/dev',
      details: [prOf({ base_ref: 'main' })]
    });

    const r = await env.actions.merge(BEAD);

    expect(r.action).toBe('merged');
  });

  test('a worker attempt base is compared against the observation, not derived from it', async () => {
    const env = makeActions({
      store: attemptStore('ilsun/dev'),
      details: [prOf({ base_ref: 'main' })]
    });

    const r = await env.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      reason: 'base_mismatch:ilsun/dev!=main'
    });
    expect(env.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('a legacy attempt with no target_base falls to the declaration, never to main', async () => {
    const env = makeActions({
      store: attemptStore(null),
      declaredBase: 'ilsun/dev',
      details: [prOf({ base_ref: 'main' })]
    });

    const r = await env.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      reason: 'base_mismatch:ilsun/dev!=main'
    });
  });

  test('a legacy attempt on an undeclared repo still merges into main (no regression)', async () => {
    const env = makeActions({
      store: attemptStore(null),
      details: [prOf({ base_ref: 'main' })]
    });

    const r = await env.actions.merge(BEAD);

    expect(r.action).toBe('merged');
  });

  test('refuses when GitHub reported no base at all', async () => {
    const env = makeActions({
      store: attemptStore('main'),
      details: [prOf({ base_ref: '' })]
    });

    const r = await env.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: false, reason: 'base_ref_unobserved' });
  });

  test('refuses BEHIND before updating or re-comparing the base', async () => {
    const env = makeActions({
      store: attemptStore('main'),
      details: [
        prOf({ merge_state_status: 'BEHIND', base_ref: 'main' }),
        prOf({ base_ref: 'ilsun/dev' })
      ]
    });

    const r = await env.actions.merge(BEAD);

    expect(env.gh.updateBranch).not.toHaveBeenCalled();
    expect(r).toMatchObject({
      ok: false,
      reason: 'base_behind'
    });
    expect(env.gh.mergeSquash).not.toHaveBeenCalled();
  });
});

describe('worker/pr-actions base gate freshness (implementation review 2026-07-30)', () => {
  test('re-resolves the declaration with force before an irreversible merge', async () => {
    /** @type {Array<{ force?: boolean }|undefined>} */
    const calls = [];
    const env = makeActions({
      details: [prOf({ base_ref: 'main' })],
      resolveBase: async (/** @type {any} */ options) => {
        calls.push(options);
        return {
          ok: true,
          base: 'main',
          declared: false,
          remote: 'origin',
          remote_ref: 'refs/remotes/origin/main',
          base_oid: 'a'.repeat(40),
          local_only: false
        };
      },
      store: (() => {
        const store = createQueueStore();
        store.appendAttempt(WS, {
          expected_revision: store.snapshot(WS).revision,
          attempt: { attempt_id: 'a1', bead_id: BEAD }
        });
        store.updateAttempt(WS, {
          attempt_id: 'a1',
          patch: {
            repo: REPO,
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
        return store;
      })()
    });

    await env.actions.merge(BEAD);

    expect(calls.length).toBeGreaterThan(0);
    expect(calls.every((c) => c && c.force === true)).toBe(true);
  });
});

describe('worker/pr-actions completion gate evidence', () => {
  test('binds an open completion gate to one exact base pin', async () => {
    const first_base = '1'.repeat(40);
    const second_base = '2'.repeat(40);
    const resolveBase = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        base: 'main',
        base_oid: first_base
      })
      .mockResolvedValue({
        ok: true,
        base: 'main',
        base_oid: second_base
      });
    const repoOperations = failedVerifyOperations();
    const env = makeActions({
      resolveBase,
      repoOperations,
      details: [prOf({ head_sha: 'a'.repeat(40), base_ref: 'main' })]
    });

    const result = await env.actions.completionGate(BEAD);

    expect(resolveBase).toHaveBeenCalledTimes(1);
    expect(repoOperations.ensureVerify).toHaveBeenCalledWith(
      expect.objectContaining({ base_sha: first_base })
    );
    expect(result).toMatchObject({
      ok: true,
      base_sha: first_base,
      subject: { base_sha: first_base },
      verdict: { reason: 'verify_cmd_failed' }
    });
  });

  test('returns a bounded pinned gate result without issuing a merge', async () => {
    const env = makeActions({
      repoOperations: failedVerifyOperations(),
      details: [prOf({ head_sha: 'a'.repeat(40), base_ref: 'main' })]
    });

    const result = await env.actions.completionGate(BEAD);

    expect(result).toMatchObject({
      ok: true,
      target_base: 'main',
      base_sha: 'a'.repeat(40),
      subject: {
        role: 'root',
        bead_id: BEAD,
        pr_url: 'https://github.com/o/r/pull/304',
        head_sha: 'a'.repeat(40),
        base_sha: 'a'.repeat(40),
        merged_sha: null
      },
      verdict: {
        enabled: false,
        tier: 'verify',
        reason: 'verify_cmd_failed'
      },
      evidence: {
        verify: {
          head_sha: 'a'.repeat(40),
          ok: false,
          reason: 'verify_cmd_failed'
        }
      }
    });
    expect(env.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('uses the authoritative merge commit SHA for a merged subject', async () => {
    const merge_sha = 'c'.repeat(40);
    const env = makeActions({
      details: [
        prOf({
          state: 'MERGED',
          head_sha: 'a'.repeat(40),
          merged_sha: merge_sha
        })
      ]
    });

    const result = await env.actions.completionGate(BEAD);

    expect(result).toMatchObject({
      ok: true,
      subject: {
        head_sha: 'a'.repeat(40),
        merged_sha: merge_sha
      }
    });
  });

  test('fails closed when a merged subject has no merge commit SHA', async () => {
    const env = makeActions({
      details: [
        prOf({ state: 'MERGED', head_sha: 'a'.repeat(40), merged_sha: null })
      ]
    });

    const result = await env.actions.completionGate(BEAD);

    expect(result).toEqual({ ok: false, reason: 'merge_sha_unobserved' });
  });
});

describe('worker/pr-actions — legacy migration seams (master spec §11)', () => {
  test('reports the expected base and the observed merge SHA for a row', async () => {
    const env = makeActions({
      details: [prOf({ state: 'MERGED', merged_sha: 'c'.repeat(40) })]
    });

    const facts = await env.actions.cleanupFacts(BEAD);

    expect(facts).toMatchObject({
      base: 'main',
      base_reason: null,
      merge_sha: 'c'.repeat(40)
    });
  });

  test('reports the base resolution failure instead of guessing a base', async () => {
    const env = makeActions({
      store: createQueueStore(),
      resolveBase: async () => ({ ok: false, step: 'declaration_missing' })
    });

    const facts = await env.actions.cleanupFacts('UI-unknown');

    expect(facts).toMatchObject({
      base: null,
      base_reason: 'base_unresolved:declaration_missing'
    });
  });

  test('closes a migrated row through the standard closure', async () => {
    const env = makeActions({ details: [prOf({ state: 'MERGED' })] });

    const result = await env.actions.resumeMigratedClosure(BEAD);

    expect(result).toMatchObject({ ok: true, reason: null });
    expect(env.store.snapshot(WS).done).toEqual(
      expect.arrayContaining([expect.objectContaining({ bead_id: BEAD })])
    );
  });

  test('resumes a closure the migration already retired the failure for', async () => {
    const store = seedStore({
      cleanup_failed: { [BEAD]: { step: 'child_sweep', reason: 'boom' } }
    });
    const env = makeActions({ store, details: [prOf({ state: 'MERGED' })] });
    store.clearCleanupFailure(WS, BEAD);

    const result = await env.actions.resumeMigratedClosure(BEAD);

    expect(result).toMatchObject({ ok: true, reason: null });
    expect(env.calls).toContain(`bd:setStatus:${BEAD}:closed`);
  });
});

describe('worker/pr-actions — workspace repo-ops opt-out (UI-lsti §2)', () => {
  /**
   * The coordinator's answer for a workspace that opted out of the declared
   * verify lane: the declaration is still `present`, but the script the caller
   * would build a candidate from is gone.
   *
   * @param {Record<string, any>} [overrides]
   */
  function optedOutOperations(overrides = {}) {
    return {
      hasConfig: vi.fn(async () => ({
        ok: true,
        present: true,
        verify_script_path: null,
        verify_timeout_ms: null,
        verify_opted_out: true,
        deploy_opted_out: false
      })),
      ensureVerify: vi.fn(async () => ({
        ok: true,
        inert: true,
        opted_out: true
      })),
      ensureDeploy: vi.fn(async () => ({ ok: true, inert: true })),
      waitForTerminal: vi.fn(),
      waitForDeployTerminal: vi.fn(async () => ({ state: 'succeeded' })),
      verifyReceipt: vi.fn(),
      findExactDeployOperation: vi.fn(async () => null),
      deploymentEvidence: vi.fn(async () => ({ state: 'succeeded' })),
      ...overrides
    };
  }

  test('merges on review receipts alone when verify is opted out', async () => {
    const operations = optedOutOperations();
    const env = makeActions({
      repoOperations: operations,
      details: [prOf({ head_sha: 'a'.repeat(40) })]
    });

    const result = await env.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, reason: null });
    expect(operations.ensureVerify).not.toHaveBeenCalled();
    expect(env.runVerify).not.toHaveBeenCalled();
    expect(env.gh.mergeSquash).toHaveBeenCalled();
  });

  test('closes the row without waiting for a deploy that is opted out', async () => {
    const operations = optedOutOperations({
      ensureDeploy: vi.fn(async () => ({
        ok: true,
        inert: true,
        opted_out: true
      }))
    });
    const env = makeActions({
      repoOperations: operations,
      details: [prOf({ head_sha: 'a'.repeat(40) })]
    });

    const result = await env.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, reason: null });
    expect(operations.waitForDeployTerminal).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).done).toEqual(
      expect.arrayContaining([expect.objectContaining({ bead_id: BEAD })])
    );
  });
});
