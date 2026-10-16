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
import { workflowScriptDir } from './attempt-facts.js';
import { beadDeferLockKey } from './bead-defer.js';
import { createCleanupInterruptionAnnouncer } from './completion-intent.js';
import {
  createCompletionActionDriver,
  decideCompletionAction
} from './completion-intent.js';
import { createLockManager } from './locks.js';
import { createMergeQueue } from './merge-queue.js';
import { CLEANUP_STEPS, createPrActions } from './pr-actions.js';
import { createPrObservationStore } from './pr-observations.js';
import { createPrPoller } from './pr-poller.js';
import { createQueueStore } from './queue-store.js';
import { createRepoOperationCoordinator } from './repo-operation-coordinator.js';
import { queueFilePath } from './state-paths.js';

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
 *   gitStdout?: (args: string[]) => string|undefined,
 *   gitBranch?: string,
 *   gitStatus?: string,
 *   gitHead?: string,
 *   baseSyncOutput?: string,
 *   baseSyncError?: Error,
 *   baseSyncInstalled?: boolean,
 *   baseSyncRunner?: string,
 *   bdFail?: (method: string, id: string) => boolean,
 *   mergeFails?: boolean,
 *   updateBranchResult?: any,
 *   afterMerge?: any,
 *   worktreeExists?: boolean,
 *   worktrees?: Record<string, string>,
 *   removeByBranchResult?: { ok: boolean, removed: boolean, reason: string|null, worktree_removed?: boolean, branch_removed?: boolean },
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
 *   locks?: { acquire: (key: string) => Promise<() => void> },
 *   noNotify?: boolean,
 *   failureConversation?: { launchForBead: (input: any) => Promise<any> },
 *   timeline?: { append: (input: any) => unknown }
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

  const bd = {
    setStatus: vi.fn(async (/** @type {string} */ id, s) => {
      calls.push(`bd:setStatus:${id}:${s}`);
      if (options.bdFail && options.bdFail('setStatus', id)) {
        throw new Error('bd down');
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
    pathFor: vi.fn(
      (/** @type {string} */ repo, /** @type {string} */ name) =>
        `${repo}/.worktrees/${name}`
    ),
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
    removeCompleted: vi.fn(async (/** @type {{ branch: string }} */ input) => {
      calls.push('wt:removeCompleted');
      if (options.removeByBranchResult) {
        return options.removeByBranchResult;
      }
      const name = [...worktree_holds.entries()].find(
        ([, held]) => held === input.branch
      )?.[0];
      if (name !== undefined) {
        worktree_holds.delete(name);
      }
      return { ok: true, removed: name !== undefined, reason: null };
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
    // What a specific read answers, for the probes whose VALUE is the verdict.
    const forced_stdout = options.gitStdout?.(args);
    if (typeof forced_stdout === 'string') {
      return { code: 0, stdout: forced_stdout, stderr: '' };
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
  /** @type {any[]} */
  const human_notices = [];
  const notify = {
    needsHuman: vi.fn(async (/** @type {any} */ input) => {
      calls.push('notify:needsHuman');
      human_notices.push(input);
    }),
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
    reconcileInteractiveSessions: vi.fn(async () => {}),
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

  const sync_script = path.join(
    workflowScriptDir(tmp_state, options.baseSyncRunner),
    'sync-target-base-checkout.py'
  );
  if (options.baseSyncInstalled !== false) {
    fs.mkdirSync(path.dirname(sync_script), { recursive: true });
    fs.writeFileSync(sync_script, '');
  }
  const runBaseSync = vi.fn(async () => {
    calls.push('base-sync:run');
    if (options.baseSyncError) {
      throw options.baseSyncError;
    }
    return {
      stdout:
        options.baseSyncOutput ??
        JSON.stringify({ result: 'synced', reason: 'fast_forwarded' })
    };
  });

  // The production `정리 중단` announcer over the same notifier (UI-gske §3.5).
  const cleanup_interruption = createCleanupInterruptionAnnouncer({
    workspace: WS,
    repo: options.repo || REPO,
    store,
    notify,
    failureConversation: options.failureConversation ?? null
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
      // The fixtures below carry only the fields the merge path reads; the
      // registry's display-only receipt observation (UI-17mj §2.2) is not one
      // of them.
      get: (/** @type {string} */ _ws, /** @type {string} */ bead_id) =>
        /** @type {any} */ ((options.external || {})[bead_id] || null),
      drop: external_drop
    },
    worktree,
    gitRun,
    runBaseSync,
    homeDir: tmp_state,
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
    notify: options.noNotify === true ? undefined : notify,
    announceCleanupInterruption:
      options.noNotify === true
        ? undefined
        : (bead_id) => cleanup_interruption.announce(bead_id),
    timeline: options.timeline,
    locks: options.locks
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
    runBaseSync,
    sync_script,
    external_drop,
    scheduler,
    resolveVerify,
    runVerify,
    notify,
    merge_notices,
    human_notices
  };
}

/** Let a fire-and-forget launch-then-notify chain run to its end. */
async function settleAnnouncements() {
  for (let i = 0; i < 5; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
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

  test('permits merge after the discard is abandoned', async () => {
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
    h.store.failDiscardOperation(WS, {
      operation_id: 'discard-1',
      expected_phase: 'requested',
      reason: 'archive_failed'
    });
    h.store.abandonDiscardOperation(WS, {
      operation_id: 'discard-1',
      resume: null
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, action: 'merged' });
    expect(h.gh.prDetail).toHaveBeenCalled();
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

  test('settles interactive sessions immediately after moving a merged row to done', async () => {
    const h = makeActions();
    h.store.recordInteractiveSession(WS, {
      bead_id: BEAD,
      kind: 'resolve',
      provider: 'claude',
      pane_id: '%1',
      tmux_session: 'interactive',
      tmux_window: 'resolve',
      launched_at: 10,
      state: 'live'
    });
    const moved = vi.spyOn(h.store, 'moveToDone');
    const settled = vi.spyOn(h.store, 'markInteractiveSessionsSettled');
    h.scheduler.reconcileInteractiveSessions.mockImplementation(async () => {
      expect(
        h.store.snapshot(WS).interactive_sessions[`${BEAD}:resolve`].settled_by
      ).toBe('done');
    });

    const result = await h.actions.merge(BEAD);

    expect(result.ok).toBe(true);
    expect(settled).toHaveBeenCalledWith(WS, BEAD, 'done');
    expect(h.scheduler.reconcileInteractiveSessions).toHaveBeenCalledWith(WS);
    expect(moved.mock.invocationCallOrder[0]).toBeLessThan(
      settled.mock.invocationCallOrder[0]
    );
    expect(settled.mock.invocationCallOrder[0]).toBeLessThan(
      h.scheduler.reconcileInteractiveSessions.mock.invocationCallOrder[0]
    );
  });

  test('keeps merged settlement durable when immediate pane reconciliation fails', async () => {
    const h = makeActions();
    h.scheduler.reconcileInteractiveSessions.mockRejectedValue(
      new Error('tmux unavailable')
    );
    h.store.recordInteractiveSession(WS, {
      bead_id: BEAD,
      kind: 'resolve',
      provider: 'claude',
      pane_id: '%1',
      tmux_session: 'interactive',
      tmux_window: 'resolve',
      launched_at: 10,
      state: 'live'
    });

    const result = await h.actions.merge(BEAD);

    expect(result.ok).toBe(true);
    expect(
      h.store.snapshot(WS).interactive_sessions[`${BEAD}:resolve`].settled_by
    ).toBe('done');
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
    // The observed head branch travels to the scheduler so a deleted
    // worktree can be restored rather than refused (UI-p49g §5.2).
    expect(h.scheduler.resolveConflict).toHaveBeenCalledWith(
      WS,
      BEAD,
      null,
      {},
      BEAD
    );
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
      bdMetadata: {
        unit_plan: '한 유닛 | core:server/core.js',
        exec_receipt: `delegated:sol:high@${'e'.repeat(40)}`
      }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({
      ok: false,
      reason: 'receipt_unbacked:unit_plan_mismatch'
    });
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
  });

  // 계약이 `badge` 등급으로 확정한 잔여는 머지를 잠그지 않는다 (UI-h6t1 §3.1).
  test('merges a receipt whose only finding is the badge grade', async () => {
    const h = makeActions({
      bdMetadata: { exec_receipt: `main:bead@${'e'.repeat(40)}` }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, action: 'merged' });
  });

  test('merges an unbacked receipt under a manual authority bound to this head', async () => {
    const head_sha = 'a'.repeat(40);
    const store = seedStore();
    const queued = store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: BEAD, head_sha, target_base: 'main', external: false }
      ]
    });
    expect(queued.ok).toBe(true);
    const h = makeActions({
      store,
      details: [prOf({ head_sha })],
      bdMetadata: {
        unit_plan: '한 유닛 | core:server/core.js',
        exec_receipt: `delegated:sol:high@${'e'.repeat(40)}`
      }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, action: 'merged' });
  });

  test('keeps holding an unbacked receipt when the manual authority binds another head', async () => {
    const store = seedStore();
    const queued = store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        {
          bead_id: BEAD,
          head_sha: 'b'.repeat(40),
          target_base: 'main',
          external: false
        }
      ]
    });
    expect(queued.ok).toBe(true);
    const h = makeActions({
      store,
      details: [prOf({ head_sha: 'a'.repeat(40) })],
      bdMetadata: {
        unit_plan: '한 유닛 | core:server/core.js',
        exec_receipt: `delegated:sol:high@${'e'.repeat(40)}`
      }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({
      ok: false,
      reason: 'receipt_unbacked:unit_plan_mismatch'
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

  test('judges the receipt against the implementation attempt, not a review', async () => {
    const store = seedStore();
    store.updateAttempt(WS, {
      attempt_id: 'a1',
      patch: {
        receipt_baseline: {
          exec_receipt: null,
          impl_entry: null,
          plan_approval: null,
          workflow_mode_source: null,
          impl_dispatch: null
        }
      }
    });
    // A LATER review session attempt for the same bead. It carries no
    // baseline, so winning "latest" would silently skip every
    // baseline-dependent check.
    store.upsertReviewSessionAttempt(WS, {
      attempt_id: 'review:authority-1:x',
      patch: {
        bead_id: BEAD,
        kind: 'review_session',
        status: 'done',
        finished_at: 9_999
      }
    });
    const h = makeActions({
      store,
      bdMetadata: {
        exec_receipt: `main:bead@${'e'.repeat(40)}`,
        impl_dispatch: 'main'
      }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: false });
    expect(String(result.reason)).toMatch(/^receipt_unbacked:/);
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
  });

  // 계보를 볼 수 없다는 사실은 이제 관측 실패가 아니라 그 자체가 `badge` 잔여다
  // (UI-h6t1 §3.1) — 머지는 진행하고 코드만 남는다.
  test('merges a takeover receipt whose lineage no attempt can prove', async () => {
    const h = makeActions({
      bdMetadata: { exec_receipt: `main:takeover@${'e'.repeat(40)}` }
    });

    const result = await h.actions.merge(BEAD);

    expect(result).toMatchObject({ ok: true, action: 'merged' });
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
      reason: 'review_receipt_undetermined'
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

  test('prefers the head branch the driver approved over the re-probed one', async () => {
    const h = makeActions({
      details: [prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' })]
    });

    await h.actions.dispatchConflict(BEAD, {
      head_sha: 'sha-aaa',
      base_ref: 'main',
      head_ref: 'approved-branch'
    });

    expect(h.scheduler.resolveConflict).toHaveBeenCalledWith(
      WS,
      BEAD,
      null,
      {},
      'approved-branch'
    );
  });

  test('carries head_ref into the attempt-less fallback when no session is resumable', async () => {
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
    // A PR-bearing attempt that never captured a session id: the relaunch path
    // has nothing to resume, so the resolver must fall through to the
    // attempt-less dispatch with the observed head branch intact.
    store.updateAttempt(WS, {
      attempt_id: 'a1',
      patch: {
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
    const h = makeActions({
      store,
      details: [prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' })]
    });

    await h.actions.merge(BEAD);

    expect(h.scheduler.resolveConflict).not.toHaveBeenCalled();
    expect(h.scheduler.dispatchExternalConflict).toHaveBeenCalledWith(
      WS,
      BEAD,
      'main',
      null,
      {},
      BEAD
    );
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
      resolution_wait,
      {},
      BEAD
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
      resolution_wait,
      {},
      BEAD
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

  test('permits cleanup after the discard is abandoned', async () => {
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
    h.store.failDiscardOperation(WS, {
      operation_id: 'discard-1',
      expected_phase: 'requested',
      reason: 'archive_failed'
    });
    h.store.abandonDiscardOperation(WS, {
      operation_id: 'discard-1',
      resume: null
    });

    const result = await h.actions.retryCleanup(BEAD);

    expect(result.reason).not.toBe('discard_in_progress');
    expect(h.calls.length).toBeGreaterThan(0);
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
    expect(h.worktree.removeCompleted).toHaveBeenCalledTimes(1);
    expect(h.bd.setStatus).toHaveBeenCalledWith(BEAD, 'closed');
  });
});

describe('post-merge cleanup — the retired child sweep (UI-ruwu §6)', () => {
  const MERGED = 'c'.repeat(40);

  /**
   * The queue a build that still ran the child sweep left behind. Its stop is
   * rewritten in the persisted file because no current code path writes the
   * `child_sweep` spelling any more.
   *
   * @param {{ keep_failure: boolean }} options
   */
  async function storeLeftAtChildSweep({ keep_failure }) {
    const first = makeActions({
      removeByBranchResult: {
        ok: false,
        removed: true,
        reason: 'ref_delete_failed',
        worktree_removed: true,
        branch_removed: false
      }
    });
    await first.actions.merge(BEAD);
    const file = queueFilePath(WS);
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    raw.pr_wait[0].cleanup_cursor = 'child_sweep';
    if (keep_failure) {
      raw.cleanup_failed[BEAD].step = 'child_sweep';
    } else {
      delete raw.cleanup_failed[BEAD];
    }
    fs.writeFileSync(file, JSON.stringify(raw));
    return createQueueStore();
  }

  test('lists the cleanup steps without a child sweep', () => {
    expect(CLEANUP_STEPS).toEqual([
      'base_containment',
      'repo_operations',
      'post_merge_jobs',
      'branch_cleanup',
      'parent_close'
    ]);
  });

  test('retries a stored child_sweep failure from branch_cleanup', async () => {
    const store = await storeLeftAtChildSweep({ keep_failure: true });
    const env = makeActions({
      store,
      details: [prOf({ state: 'MERGED', merged_sha: MERGED })]
    });

    await env.actions.retryCleanup(BEAD);

    expect(env.steps).toEqual(['branch_cleanup', 'parent_close', '(cleared)']);
  });

  test('resumes a stored child_sweep cursor on boot', async () => {
    const store = await storeLeftAtChildSweep({ keep_failure: false });
    const env = makeActions({
      ...ON_BASE,
      store,
      details: [prOf({ state: 'MERGED', merged_sha: MERGED })],
      repoOperations: { hasConfig: async () => ({ ok: true, present: false }) }
    });

    await env.actions.resumeRepoOperations();

    expect(
      env.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([]);
  });

  test('converts no deferred child into a carryover when it closes the parent', async () => {
    const env = makeActions({
      bdMetadata: {
        child_disposition: 'deferred',
        plan_path: 'docs/superpowers/plans/2026-09-01-example-plan.md',
        plan_task_anchor: 'Phase 2'
      }
    });
    const bd = /** @type {any} */ (env.bd);
    bd.listChildren = vi.fn(async () => [
      { id: `${BEAD}.2`, status: 'open', parent_child_dep: true }
    ]);
    bd.createTopLevelIssue = vi.fn(async () => 'UI-9');

    await env.actions.merge(BEAD);

    expect(bd.createTopLevelIssue).not.toHaveBeenCalled();
  });
});

describe('post-merge cleanup retry records', () => {
  test.each([false, true])(
    'runs the coordinator through the bounded cleanup retry sequence (recovers=%s)',
    async (recovers) => {
      const failure = { ok: false, removed: false, reason: 'observe_failed' };
      const h = makeActions({ removeByBranchResult: failure });
      await h.actions.merge(BEAD);
      const subject = {
        role: /** @type {const} */ ('root'),
        bead_id: BEAD,
        pr_url: 'https://github.com/o/r/pull/304',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: 'c'.repeat(40)
      };
      h.store.enqueueCompletionIntent(WS, {
        root_bead_id: BEAD,
        source_attempt_id: 'a1',
        target_base: 'main',
        subject
      });
      h.store.setCompletionSubject(WS, {
        root_bead_id: BEAD,
        phase: 'cleaning',
        subject
      });
      const driver = createCompletionActionDriver({
        workspace: WS,
        store: h.store,
        prActions: h.actions
      });

      for (let round = 0; round < 3; round++) {
        const queue = h.store.snapshot(WS);
        const intent = queue.completion_intents[BEAD];
        const fact = await driver.observe(BEAD, intent);
        const action = decideCompletionAction({
          auto_merge: true,
          intent,
          fact,
          now: queue.cleanup_failed[BEAD].next_retry_at
        });
        expect(action).toEqual({ kind: 'retry_cleanup' });
        if (!action) {
          throw new Error('cleanup retry action missing');
        }
        failure.ok = recovers && round === 2;
        await driver.onAction(BEAD, action, intent);
      }
      const after = h.store.snapshot(WS);
      const fact = await driver.observe(BEAD, after.completion_intents[BEAD]);
      const action = decideCompletionAction({
        auto_merge: true,
        intent: after.completion_intents[BEAD],
        fact,
        now: 1_000_000
      });

      expect(h.worktree.removeCompleted).toHaveBeenCalledTimes(4);
      if (recovers) {
        expect(after.completion_intents[BEAD]).toMatchObject({
          phase: 'completed',
          terminal_reason: null
        });
        expect(after.cleanup_failed[BEAD]).toBeUndefined();
        expect(action).toBeNull();
      } else {
        expect(action).toEqual({
          kind: 'needs_human',
          reason: 'retry_exhausted:cleanup_failed:worktree_remove_failed',
          terminal: true
        });
      }
      expect(after).not.toHaveProperty('hold');
    }
  );

  test('ignores a repository operation retry budget when recording a base failure', async () => {
    const h = makeActions({ gitFail: (args) => args[0] === 'fetch' });
    h.store.recordCleanupFailure(WS, {
      bead_id: BEAD,
      step: 'repo_operations',
      reason: 'script_failed',
      retryable: true,
      retry_count: 2
    });

    await h.actions.retryCleanup(BEAD);

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'base_containment',
      retry_count: 0,
      next_retry_at: 61_000
    });
  });

  test('persists consecutive observation failures with bounded retry deadlines', async () => {
    const h = makeActions({
      removeByBranchResult: {
        ok: false,
        removed: false,
        reason: 'observe_failed'
      }
    });

    await h.actions.merge(BEAD);

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'branch_cleanup',
      retryable: true,
      retry_count: 0,
      next_retry_at: 61_000
    });

    await h.actions.retryCleanup(BEAD);
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      retry_count: 1,
      next_retry_at: 301_000
    });
    await h.actions.retryCleanup(BEAD);
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      retry_count: 2,
      next_retry_at: 901_000
    });
    await h.actions.retryCleanup(BEAD);
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      retryable: true,
      retry_count: 3
    });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).not.toHaveProperty(
      'next_retry_at'
    );
  });

  test('records a base observation failure with the first retry deadline', async () => {
    const h = makeActions({ gitFail: (args) => args[0] === 'fetch' });

    await h.actions.merge(BEAD);

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'base_containment',
      reason: 'base_fetch_failed',
      retryable: true,
      retry_count: 0,
      next_retry_at: 61_000
    });
  });

  test('drops the retry deadline when an observation failure becomes deterministic', async () => {
    const failure = { ok: false, removed: false, reason: 'observe_failed' };
    const h = makeActions({ removeByBranchResult: failure });
    await h.actions.merge(BEAD);
    failure.reason = 'dirty_unique';

    await h.actions.retryCleanup(BEAD);

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      retryable: false,
      retry_count: 1
    });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).not.toHaveProperty(
      'next_retry_at'
    );
  });

  test('restarts the retry count after a deterministic failure', async () => {
    const failure = { ok: false, removed: false, reason: 'dirty_unique' };
    const h = makeActions({ removeByBranchResult: failure });
    await h.actions.merge(BEAD);
    failure.reason = 'observe_failed';

    await h.actions.retryCleanup(BEAD);

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      retryable: true,
      retry_count: 0,
      next_retry_at: 61_000
    });
  });

  test('finishes remaining cleanup after a human removes the blocked worktree', async () => {
    const h = makeActions();
    h.worktree.removeCompleted.mockResolvedValueOnce({
      ok: false,
      removed: false,
      reason: 'dirty_unique'
    });
    await h.actions.merge(BEAD);
    h.worktree.removeCompleted.mockResolvedValueOnce({
      ok: true,
      removed: false,
      reason: null
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
        merged_sha: 'c'.repeat(40)
      }
    });
    h.store.prepareCompletionOp(WS, {
      root_bead_id: BEAD,
      phase: 'cleaning',
      op: {
        op_id: 'cleanup-manual-removal',
        kind: 'retry_cleanup',
        failure_key: {
          stage: 'branch_cleanup',
          reason: 'worktree_remove_failed',
          subject_sha: 'c'.repeat(40),
          base_sha: BASE_SHA,
          result_digest: 'e'.repeat(64)
        },
        attempt_id: null,
        status: 'prepared'
      }
    });

    const result = await h.actions.resumeCompletionCleanup(BEAD);

    expect(result.ok).toBe(true);
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toBeUndefined();
    expect(h.store.snapshot(WS).done).toContainEqual(
      expect.objectContaining({ bead_id: BEAD })
    );
    expect(h.calls).toContain('git:push origin');
  });
});

describe('post-merge cleanup — bd status after a LATE failure (§6)', () => {
  test('leaves bd untouched when the branch cleanup fails — it now runs BEFORE the close', async () => {
    const h = makeActions({
      // The local branch delete fails and the confirming `rev-parse --verify`
      // still finds the branch → the cleanup stops at `branch_cleanup`, which
      // in the contract-aligned order is one step BEFORE the parent close.
      removeByBranchResult: {
        ok: false,
        removed: true,
        reason: 'ref_delete_failed',
        worktree_removed: true,
        branch_removed: false
      }
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
      reason: 'local_branch_delete_failed',
      detail:
        'manager_reason=ref_delete_failed worktree_removed=true branch_removed=false'
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
    expect(h.worktree.removeCompleted).toHaveBeenCalled();
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
  test.each([
    ['preserved', 'dirty_conflict'],
    ['synced', 'rebased_and_pushed'],
    ['failed', 'sync_failure']
  ])('reports %s:%s without stopping cleanup', async (result, reason) => {
    const h = makeActions({
      gitBranch: 'main',
      baseSyncOutput: JSON.stringify({ result, reason })
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: true,
      base_sync: `base_sync:${result}:${reason}`
    });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toBeUndefined();
  });

  test('delegates local checkout changes to the installed helper', async () => {
    const h = makeActions({ gitBranch: 'main' });

    await h.actions.merge(BEAD);

    expect(
      h.git_argv.filter((args) =>
        ['status', 'merge', 'reset', 'rebase'].includes(args[0])
      )
    ).toEqual([]);
    expect(h.runBaseSync).toHaveBeenCalledExactlyOnceWith(
      'python3',
      [
        h.sync_script,
        '--repo',
        REPO,
        '--remote',
        'origin',
        '--base',
        'main',
        '--target-sha',
        BASE_SHA
      ],
      { cwd: REPO, encoding: 'utf8' }
    );
  });

  test('syncs a dirty checkout while preserving the fetched containment SHA', async () => {
    const h = makeActions({
      gitBranch: 'main',
      gitStatus: ' M app/x.js\n',
      baseSyncOutput: JSON.stringify({
        result: 'synced',
        reason: 'fast_forwarded_with_exact_overlay',
        target_sha: 'e'.repeat(40)
      })
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: true,
      base_sync: 'base_sync:synced:fast_forwarded_with_exact_overlay'
    });
    expect(h.git_argv).toContainEqual([
      'merge-base',
      '--is-ancestor',
      'c'.repeat(40),
      BASE_SHA
    ]);
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toBeUndefined();
  });

  test('uses a Codex-only workflow installation', async () => {
    const h = makeActions({ gitBranch: 'main', baseSyncRunner: 'codex' });

    const r = await h.actions.merge(BEAD);

    expect(r.base_sync).toBe('base_sync:synced:fast_forwarded');
    expect(h.runBaseSync).toHaveBeenCalledWith(
      'python3',
      expect.arrayContaining([h.sync_script]),
      expect.any(Object)
    );
  });

  test('leaves a different branch untouched without invoking the helper', async () => {
    const h = makeActions({ gitBranch: 'feature' });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, base_sync: 'fetch_only:not_on_base' });
    expect(h.runBaseSync).not.toHaveBeenCalled();
  });

  test('records a missing script without failing cleanup', async () => {
    const h = makeActions({ gitBranch: 'main', baseSyncInstalled: false });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: true,
      base_sync: 'base_sync:failed:script_missing'
    });
    expect(h.runBaseSync).not.toHaveBeenCalled();
  });

  test.each([
    [Object.assign(new Error('nonzero exit'), { code: 1 }), '1'],
    [
      Object.assign(new Error('sync failed'), {
        code: 1,
        stdout: '{"result":"failed","reason":"projectmgr_unavailable"}'
      }),
      'projectmgr_unavailable'
    ],
    [
      Object.assign(new Error('broken output'), {
        code: 1,
        stdout: 'not json'
      }),
      '1'
    ],
    [
      Object.assign(new Error('inconsistent output'), {
        code: 1,
        stdout: '{"result":"synced","reason":"fast_forwarded"}'
      }),
      '1'
    ],
    [
      Object.assign(new Error('python unavailable'), { code: 'ENOENT' }),
      'ENOENT'
    ],
    [new Error('execution failed'), 'script_error']
  ])(
    'records an execution failure without failing cleanup: %s',
    async (error, reason) => {
      const h = makeActions({ gitBranch: 'main', baseSyncError: error });

      const r = await h.actions.merge(BEAD);

      expect(r).toMatchObject({
        ok: true,
        base_sync: `base_sync:failed:${reason}`
      });
      expect(h.runBaseSync).toHaveBeenCalledTimes(1);
    }
  );

  test.each([
    ['not json', 'invalid_json'],
    ['null', 'invalid_response'],
    ['{}', 'invalid_response'],
    ['{"result":"synced","reason":7}', 'invalid_response']
  ])(
    'records invalid helper output without failing cleanup: %s',
    async (stdout, reason) => {
      const h = makeActions({ gitBranch: 'main', baseSyncOutput: stdout });

      const r = await h.actions.merge(BEAD);

      expect(r).toMatchObject({
        ok: true,
        base_sync: `base_sync:failed:${reason}`
      });
    }
  );

  test('still stops when the fetched base does not contain the merge', async () => {
    const h = makeActions({
      gitBranch: 'main',
      gitStatus: '',
      gitResult: (args) => (args[0] === 'merge-base' ? 1 : null)
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: false, cleanup_step: 'base_containment' });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'base_containment',
      reason: 'deployment_target_not_covering_merge',
      // This step runs no command, so the token's own sentence is the summary
      // the card and the timeline read (UI-8wpb §6 row 4).
      summary: '배포 대상 base가 이 머지 커밋을 포함하지 않습니다.'
    });
  });

  test('records the token sentence as summary for a step that printed nothing', async () => {
    const h = makeActions({
      bdFail: (/** @type {string} */ method) => method === 'setStatus'
    });

    await h.actions.merge(BEAD);

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'parent_close',
      reason: 'bd_close_failed',
      summary: 'Bead를 닫지 못했습니다.'
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
    expect(h.worktree.removeCompleted).toHaveBeenCalledWith(
      expect.objectContaining({
        repo: REPO,
        branch: fallback,
        expected_path: `${REPO}/.worktrees/${fallback}`
      })
    );
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
    const h = makeActions({ gitBranch: 'main' });

    await h.actions.merge(BEAD);
    const ordered = h.calls.filter(
      (c) =>
        c.startsWith('lock:') ||
        c === 'base-sync:run' ||
        c === 'git:fetch --no-tags' ||
        c === 'wt:removeCompleted' ||
        c === 'git:push origin'
    );
    expect(ordered).toEqual([
      // Fetch and the single helper invocation share the topology lock.
      'lock:acquire',
      'git:fetch --no-tags',
      'base-sync:run',
      'lock:release',
      // Local worktree and ref cleanup is one manager lock; the second visible
      // hold here is only the existing remote branch ownership cleanup.
      'wt:removeCompleted',
      'lock:acquire',
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
          c === 'wt:removeCompleted'
      )
    ).toEqual([
      'git:fetch --no-tags',
      'wt:removeCompleted',
      'bd:setStatus:UI-1:closed'
    ]);
    expect(
      h.store.snapshot(WS).done.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('never auto-retries a cleanup that already failed', async () => {
    const store = seedStore({
      cleanup_failed: { [BEAD]: { step: 'branch_cleanup', reason: 'boom' } }
    });
    const h = makeActions({ store, details: [prOf({ state: 'MERGED' })] });

    const r = await h.actions.cleanupObservedMerge(BEAD);

    expect(r).toMatchObject({ ok: false, reason: 'merged_cleanup_failed' });
    expect(h.calls).toEqual([]);
  });

  test('runs no cleanup step while the bead is deferred (UI-0d9i §3.4)', async () => {
    const merge_sha = 'c'.repeat(40);
    const h = makeActions({ details: [prOf({ state: 'MERGED', merge_sha })] });
    h.bd.readStatus.mockImplementation(async (/** @type {string} */ id) => {
      h.calls.push(`bd:readStatus:${id}`);
      return 'deferred';
    });

    const r = await h.actions.cleanupObservedMerge(BEAD, merge_sha);

    expect(r).toMatchObject({ ok: false, reason: 'bead_deferred' });
    expect(h.calls).toEqual([`bd:readStatus:${BEAD}`]);
    expect(
      h.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
    expect(h.store.snapshot(WS).cleanup_failed?.[BEAD]).toBeUndefined();
  });

  test('skips this observation when the bead status cannot be read (UI-0d9i §3.4)', async () => {
    const merge_sha = 'c'.repeat(40);
    const h = makeActions({
      details: [prOf({ state: 'MERGED', merge_sha })],
      bdFail: (/** @type {string} */ op) => op === 'readStatus'
    });

    const r = await h.actions.cleanupObservedMerge(BEAD, merge_sha);

    expect(r).toMatchObject({ ok: false, reason: 'bead_status_unreadable' });
    expect(h.calls).toEqual([`bd:readStatus:${BEAD}`]);
    expect(
      h.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('completes the cleanup on the observation after the revival (UI-0d9i §3.4)', async () => {
    const merge_sha = 'c'.repeat(40);
    const h = makeActions({ details: [prOf({ state: 'MERGED', merge_sha })] });
    let status = 'deferred';
    const closed = vi.fn();
    h.bd.readStatus.mockImplementation(async () => status);
    h.bd.setStatus.mockImplementation(
      async (/** @type {string} */ _id, /** @type {string} */ s) => {
        status = s;
        closed(s);
      }
    );
    await h.actions.cleanupObservedMerge(BEAD, merge_sha);
    status = 'resolved';

    const r = await h.actions.cleanupObservedMerge(BEAD, merge_sha);

    expect(r.ok).toBe(true);
    expect(closed).toHaveBeenCalledWith('closed');
    expect(
      h.store.snapshot(WS).done.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });
});

describe('post-merge cleanup under the bead defer lock (UI-0d9i §3.4)', () => {
  test('waits for a held defer lock before reading the bead status', async () => {
    const merge_sha = 'c'.repeat(40);
    const locks = createLockManager();
    const h = makeActions({
      details: [prOf({ state: 'MERGED', merge_sha })],
      locks
    });
    const release = await locks.acquire(beadDeferLockKey(WS, BEAD));

    const pending = h.actions.cleanupObservedMerge(BEAD, merge_sha);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(h.bd.readStatus).not.toHaveBeenCalled();
    release();
    await pending;
  });

  test('skips the cleanup when the defer it waited for landed deferred', async () => {
    const merge_sha = 'c'.repeat(40);
    const locks = createLockManager();
    const h = makeActions({
      details: [prOf({ state: 'MERGED', merge_sha })],
      locks
    });
    let status = 'resolved';
    h.bd.readStatus.mockImplementation(async (/** @type {string} */ id) => {
      h.calls.push(`bd:readStatus:${id}`);
      return status;
    });
    const release = await locks.acquire(beadDeferLockKey(WS, BEAD));
    const pending = h.actions.cleanupObservedMerge(BEAD, merge_sha);
    await new Promise((resolve) => setTimeout(resolve, 0));
    status = 'deferred';
    release();

    const r = await pending;

    expect(r).toMatchObject({ ok: false, reason: 'bead_deferred' });
    expect(h.calls).toEqual([`bd:readStatus:${BEAD}`]);
    expect(
      h.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('holds the defer lock until the cleanup settles', async () => {
    const merge_sha = 'c'.repeat(40);
    const locks = createLockManager();
    const h = makeActions({
      details: [prOf({ state: 'MERGED', merge_sha })],
      locks
    });
    /** @type {boolean[]} */
    const held_at_close = [];
    h.bd.setStatus.mockImplementation(async () => {
      held_at_close.push(locks.isLocked(beadDeferLockKey(WS, BEAD)));
    });

    const r = await h.actions.cleanupObservedMerge(BEAD, merge_sha);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(r.ok).toBe(true);
    expect(held_at_close).toEqual([true]);
    expect(locks.isLocked(beadDeferLockKey(WS, BEAD))).toBe(false);
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
      'post_merge_jobs',
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
      gitFail: (args) => args[0] === 'fetch'
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
    for (const key of ['retryable', 'retry_count', 'next_retry_at']) {
      expect(env.store.snapshot(WS).cleanup_failed[BEAD]).not.toHaveProperty(
        key
      );
    }
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
    for (const step of [
      'repo_operations',
      'post_merge_jobs',
      'branch_cleanup'
    ]) {
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

  test.each(['branch_cleanup', 'parent_close'])(
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

  test('continues the external cleanup when a concurrent promote already made the row durable', async () => {
    const options = externalMergedOptions(coordinatorFor(null));
    const promote = options.store.promoteMergedExternal.bind(options.store);
    let poller_won = false;
    options.store.promoteMergedExternal = (
      /** @type {string} */ workspace,
      /** @type {any} */ input
    ) => {
      if (!poller_won) {
        poller_won = true;
        promote(workspace, input);
      }
      return promote(workspace, input);
    };
    const env = makeActions(options);

    const result = await env.actions.merge(NO_VERIFY_BEAD);

    expect(result).toMatchObject({ ok: true, reason: null });
  });

  test('fails the external cleanup when a refused promote left the row outside the lane', async () => {
    const options = externalMergedOptions(coordinatorFor(null));
    options.store.promoteMergedExternal = () => ({
      ok: false,
      conflict: false,
      queue: options.store.snapshot(WS)
    });
    const env = makeActions(options);

    const result = await env.actions.merge(NO_VERIFY_BEAD);

    expect(result).toMatchObject({
      ok: false,
      cleanup_step: 'repo_operations',
      reason: 'external_deployment_promote_failed'
    });
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

  /**
   * A completion intent already terminalized as `needs_human`: the state a
   * `[정리 재시도]` click starts from.
   *
   * @param {any} store
   */
  function seedTerminalIntent(store) {
    store.enqueueCompletionIntent(WS, {
      root_bead_id: BEAD,
      source_attempt_id: 'a1',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: BEAD,
        pr_url: 'https://github.com/o/r/pull/304',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: 'c'.repeat(40)
      }
    });
    store.terminalizeCompletionIntent(WS, {
      root_bead_id: BEAD,
      terminal: {
        reason: 'cleanup_failed:repo_operation_timeout_unresolved',
        stage: 'repo_operations',
        failure_key: null,
        evidence: null,
        log_path: null,
        op_id: 'deploy-0',
        comment_at: 1,
        at: 1
      },
      hold_event: null,
      now: 1
    });
  }

  // UI-jw27 §6 acceptance 6: `decideCompletionAction` answers null for an
  // intent already in `needs_human`, so a retry that fails at the SAME ladder
  // step is never terminalized again. The record write announces there
  // (UI-gske §3.5), or the user's own retry failure reaches nobody.
  test('announces the deploy step again as 정리 중단 once the intent is already terminal', async () => {
    const operations = coordinatorFor(null);
    operations.findExactDeployOperation.mockResolvedValue({
      operation_id: 'deploy-2',
      code: 'repo_operation_timeout_unresolved'
    });
    const env = makeActions({ ...ON_BASE, repoOperations: operations });
    seedResumableRow(env.store);
    seedTerminalIntent(env.store);
    expect(env.store.snapshot(WS).completion_intents[BEAD].phase).toBe(
      'needs_human'
    );

    await env.actions.resumeRepoOperations();
    await settleAnnouncements();

    expect(env.human_notices).toEqual([
      expect.objectContaining({
        bead_id: BEAD,
        failure_class: '정리 중단',
        reason: 'repo_operation_timeout_unresolved'
      })
    ]);
  });

  // UI-gske §3.5: with no completion intent nothing runs the `script_retry`
  // ladder, so the record of the deploy step is itself the terminal.
  test('announces the deploy step record as 정리 중단 without a completion intent', async () => {
    const operations = coordinatorFor(null);
    operations.findExactDeployOperation.mockResolvedValue({
      operation_id: 'deploy-1',
      code: 'repo_operation_timeout_unresolved'
    });
    const env = makeActions({ ...ON_BASE, repoOperations: operations });
    seedResumableRow(env.store);

    await env.actions.resumeRepoOperations();
    await settleAnnouncements();

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'repo_operations'
    });
    expect(env.human_notices).toEqual([
      expect.objectContaining({ failure_class: '정리 중단' })
    ]);
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

  // The registry drops a bead while any attempt of its own runs — the queue's
  // resolution / review / repair attempts included — and the queue re-observes
  // the head before the next scan refills it (UI-w25i). The queue item keeps
  // the row observable; bd still confirms it.
  test('accepts a queue-held external bead the registry has dropped', async () => {
    const store = createQueueStore();
    const snapshot = store.snapshot.bind(store);
    store.snapshot = (/** @type {string} */ ws) => ({
      ...snapshot(ws),
      merge_queue: /** @type {any} */ ([{ bead_id: EXTERNAL_BEAD }])
    });
    const env = makeActions(externalOptions({ store, external: {} }));

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r.action).toBe('merged');
  });

  test('still refuses a queue-held bead bd no longer reports resolved', async () => {
    const store = createQueueStore();
    const snapshot = store.snapshot.bind(store);
    store.snapshot = (/** @type {string} */ ws) => ({
      ...snapshot(ws),
      merge_queue: /** @type {any} */ ([{ bead_id: EXTERNAL_BEAD }])
    });
    const env = makeActions(
      externalOptions({
        store,
        external: {},
        bdStatus: { [EXTERNAL_BEAD]: 'closed' }
      })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r).toEqual({ ok: false, action: 'refused', reason: 'not_resolved' });
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
      'develop',
      null,
      {},
      BEAD
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
    expect(env.worktree.removeCompleted).toHaveBeenCalledWith(
      expect.objectContaining({ branch: 'feature/from-session' })
    );
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

describe('merge head cleanup identity', () => {
  test('cleans the head used by the merge after conflict resolution moves the branch', async () => {
    const final_head = 'd'.repeat(40);
    const env = makeActions({ details: [prOf({ head_sha: final_head })] });
    env.store.enqueueCompletionIntent(WS, {
      root_bead_id: BEAD,
      source_attempt_id: 'a1',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: BEAD,
        pr_url: 'https://github.com/o/r/pull/304',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    env.worktree.removeCompleted.mockImplementation(async (input) => ({
      ok: /** @type {any} */ (input).expected_head === final_head,
      removed: true,
      reason: null
    }));

    const observedGet = env.observations.get.bind(env.observations);
    vi.spyOn(env.observations, 'get').mockImplementation(
      (workspace, bead_id) => {
        const observed = observedGet(workspace, bead_id);
        return observed?.pr
          ? { ...observed, pr: { ...observed.pr, head_sha: 'a'.repeat(40) } }
          : observed;
      }
    );

    const result = await env.actions.merge(BEAD);

    expect(result.ok).toBe(true);
    expect(env.gh.mergeSquash).toHaveBeenCalledWith(REPO, 304, final_head);
    expect(env.worktree.removeCompleted).toHaveBeenCalledWith(
      expect.objectContaining({ expected_head: final_head })
    );
    expect(
      env.store.snapshot(WS).completion_intents[BEAD]?.merge_head_sha
    ).toBe(final_head);
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
    const env = makeActions({
      details: [prOf({ state: 'MERGED', merged_sha: 'c'.repeat(40) })]
    });

    const result = await env.actions.resumeMigratedClosure(BEAD);

    expect(result).toMatchObject({ ok: true, reason: null });
    expect(env.store.snapshot(WS).done).toEqual(
      expect.arrayContaining([expect.objectContaining({ bead_id: BEAD })])
    );
  });

  test('resumes a closure the migration already retired the failure for', async () => {
    const store = seedStore({
      cleanup_failed: { [BEAD]: { step: 'branch_cleanup', reason: 'boom' } }
    });
    const env = makeActions({
      store,
      details: [prOf({ state: 'MERGED', merged_sha: 'c'.repeat(40) })]
    });
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

describe('worker/pr-actions — base containment probe (UI-p49g §4.1)', () => {
  /** The head the resolution session pushed, which the probe judges. */
  const PUSHED_HEAD = 'e'.repeat(40);

  test('refuses a verdict when the branches cannot be fetched', async () => {
    const h = makeActions({
      gitResult: (/** @type {string[]} */ args) => (args[0] === 'fetch' ? 1 : 0)
    });

    const result = await h.actions.baseContained(BEAD, {
      base_ref: 'main',
      head_ref: BEAD,
      head_sha: PUSHED_HEAD
    });

    expect(result).toBe(null);
  });

  test('refuses a verdict when the head moved again before the fetch', async () => {
    const h = makeActions({
      gitStdout: (/** @type {string[]} */ args) =>
        args[0] === 'rev-parse' && args[1] === `origin/${BEAD}`
          ? `${'f'.repeat(40)}\n`
          : undefined
    });

    const result = await h.actions.baseContained(BEAD, {
      base_ref: 'main',
      head_ref: BEAD,
      head_sha: PUSHED_HEAD
    });

    expect(result).toBe(null);
  });

  test('reports the base as contained when the head is a descendant of it', async () => {
    const h = makeActions({
      gitStdout: (/** @type {string[]} */ args) =>
        args[0] === 'rev-parse' && args[1] === `origin/${BEAD}`
          ? `${PUSHED_HEAD}\n`
          : undefined
    });

    const result = await h.actions.baseContained(BEAD, {
      base_ref: 'main',
      head_ref: BEAD,
      head_sha: PUSHED_HEAD
    });

    expect(result).toBe('contained');
    expect(h.git_argv).toContainEqual([
      'merge-base',
      '--is-ancestor',
      'origin/main',
      PUSHED_HEAD
    ]);
  });

  test('reports the base as not contained when the ancestry check says no', async () => {
    const h = makeActions({
      gitStdout: (/** @type {string[]} */ args) =>
        args[0] === 'rev-parse' && args[1] === `origin/${BEAD}`
          ? `${PUSHED_HEAD}\n`
          : undefined,
      gitResult: (/** @type {string[]} */ args) =>
        args[0] === 'merge-base' ? 1 : 0
    });

    const result = await h.actions.baseContained(BEAD, {
      base_ref: 'main',
      head_ref: BEAD,
      head_sha: PUSHED_HEAD
    });

    expect(result).toBe('not_contained');
  });
});

describe('post-merge cleanup — the post-merge job step (UI-i60a §1–§3)', () => {
  const MERGE_SHA = 'c'.repeat(40);
  const BLOB_FIRST = '1'.repeat(40);
  const BLOB_SECOND = '2'.repeat(40);
  const BLOB_CHANGED = '3'.repeat(40);
  const KEY_FIRST = `10-first@${BLOB_FIRST}`;
  const KEY_SECOND = `20-second@${BLOB_SECOND}`;

  /**
   * One `git ls-tree -z` listing of `repo-ops/post-merge.d/`.
   *
   * @param {{ name: string, sha: string, mode?: string, type?: string }[]} entries
   */
  function listing(entries) {
    return entries
      .map(
        (entry) =>
          `${entry.mode ?? '100755'} ${entry.type ?? 'blob'} ${entry.sha}\trepo-ops/post-merge.d/${entry.name}`
      )
      .map((record) => `${record}\0`)
      .join('');
  }

  /**
   * @param {{ name: string, sha: string, mode?: string, type?: string }[]} entries
   * @param {Record<string, string>} [sources]
   */
  function gitListing(entries, sources = {}) {
    return (/** @type {string[]} */ args) => {
      if (args[0] === 'ls-tree') {
        return listing(entries);
      }
      return args[0] === 'cat-file' && Object.hasOwn(sources, args[2])
        ? sources[args[2]]
        : undefined;
    };
  }

  /**
   * The coordinator's job lane, recording what each phase was asked to do.
   *
   * @param {any} [overrides]
   */
  function jobCoordinator(overrides = {}) {
    /** @type {string[]} */
    const prepared = [];
    /** @type {string[]} */
    const launched = [];
    let seq = 0;
    const coordinator = {
      hasConfig: vi.fn(async () => ({ ok: true, present: false })),
      // No advanced deploy HEAD: every job keeps the merged commit as target.
      eligibleJobHead: vi.fn(async () => null),
      prepareJob: vi.fn(async (/** @type {any} */ input) => {
        prepared.push(input.script_path);
        seq += 1;
        return { ok: true, operation_id: `job-${seq}`, timeout_ms: 1000 };
      }),
      launchJob: vi.fn(async (/** @type {any} */ input) => {
        launched.push(input.operation_id);
        return { ok: true, operation_id: input.operation_id };
      }),
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'unknown',
        operation_id
      })),
      waitForJobTerminal: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'succeeded',
        operation_id
      })),
      ...overrides
    };
    return { coordinator, prepared, launched };
  }

  /**
   * The durable record a ledger intent already names, so the retry's supersede
   * lineage has a real operation to point back at.
   *
   * @param {any} store
   * @param {string} operation_id
   * @param {string} [blob]
   * @param {string} [target]
   */
  function prerecordJobOperation(
    store,
    operation_id,
    blob = BLOB_FIRST,
    target = MERGE_SHA
  ) {
    store.ensureRepoOperation(WS, {
      operation_id,
      repo_id: REPO,
      kind: 'job',
      subjects: [{ bead_id: BEAD, merged_sha: target }],
      effective_base_sha: target,
      target_base: 'main',
      target_sha: target,
      script_path: 'repo-ops/post-merge.d/10-first',
      script_mode: '100755',
      script_blob_sha: blob
    });
  }

  /**
   * A row whose post-merge job step already failed, waiting to be re-entered.
   *
   * @param {{ reason?: string }} [options]
   */
  function storeAtFailedJob(options = {}) {
    const store = seedStore();
    store.setCleanupCursor(WS, {
      bead_id: BEAD,
      cursor: 'base_containment',
      merge_sha: MERGE_SHA
    });
    prerecordJobOperation(store, 'job-prior');
    const prior = store.snapshot(WS).repo_operations['job-prior'];
    store.startRepoOperation(WS, {
      operation_id: 'job-prior',
      attempt_id: prior.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: '/tmp/job-prior.log'
    });
    store.settleRepoOperation(WS, {
      operation_id: 'job-prior',
      attempt_id: prior.attempt_id,
      exit_code: 1,
      signal: null
    });
    store.recordPostMergeJobIntent(WS, {
      key: KEY_FIRST,
      operation_id: 'job-prior',
      repo_id: REPO
    });
    store.recordCleanupFailure(WS, {
      bead_id: BEAD,
      step: 'post_merge_jobs',
      reason: options.reason ?? `post_merge_job_outcome_unknown:${KEY_FIRST}`
    });
    return store;
  }

  /**
   * Put the row under a prerecorded `retry_cleanup` completion op, which is
   * what {@link resumeCompletionCleanup} requires to own the replay.
   *
   * @param {any} store
   */
  function ownCompletionCleanup(store) {
    store.enqueueCompletionIntent(WS, {
      root_bead_id: BEAD,
      source_attempt_id: 'a1',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: BEAD,
        pr_url: 'https://github.com/o/r/pull/304',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: MERGE_SHA
      }
    });
    store.setCompletionSubject(WS, {
      root_bead_id: BEAD,
      phase: 'cleaning',
      subject: store.snapshot(WS).completion_intents[BEAD].subject
    });
    store.prepareCompletionOp(WS, {
      root_bead_id: BEAD,
      phase: 'cleaning',
      op: {
        op_id: 'cleanup-1',
        kind: 'retry_cleanup',
        failure_key: {
          stage: 'post_merge_jobs',
          reason: `post_merge_job_outcome_unknown:${KEY_FIRST}`,
          subject_sha: MERGE_SHA,
          base_sha: 'b'.repeat(40),
          result_digest: 'c'.repeat(64)
        },
        attempt_id: null,
        status: 'prepared'
      }
    });
    return store;
  }

  /**
   * @param {{ entries?: any[], coordinator: any, store?: any, sources?: Record<string, string>, gitFail?: (args: string[]) => boolean }} options
   */
  function jobEnv(options) {
    return makeActions({
      ...ON_BASE,
      ...(options.store ? { store: options.store } : {}),
      ...(options.gitFail ? { gitFail: options.gitFail } : {}),
      gitStdout: gitListing(options.entries ?? [], options.sources),
      repoOperations: options.coordinator
    });
  }

  test('runs no job when the merged tree carries no job directory', async () => {
    const { coordinator } = jobCoordinator();
    const env = jobEnv({ coordinator });

    await env.actions.merge(BEAD);

    expect(coordinator.prepareJob).not.toHaveBeenCalled();
  });

  test('closes the row when the merged tree carries no job directory', async () => {
    const { coordinator } = jobCoordinator();
    const env = jobEnv({ coordinator });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).pr_wait).toEqual([]);
  });

  test('runs pending jobs in filename order', async () => {
    const { coordinator, prepared } = jobCoordinator();
    const env = jobEnv({
      coordinator,
      entries: [
        { name: '20-second', sha: BLOB_SECOND },
        { name: '10-first', sha: BLOB_FIRST }
      ]
    });

    await env.actions.merge(BEAD);

    expect(prepared).toEqual([
      'repo-ops/post-merge.d/10-first',
      'repo-ops/post-merge.d/20-second'
    ]);
  });

  test('rejects every job before spawn when one replacement declaration is malformed', async () => {
    const { coordinator } = jobCoordinator();
    const env = jobEnv({
      coordinator,
      entries: [
        { name: '10-first', sha: BLOB_FIRST },
        { name: '20-second', sha: BLOB_SECOND }
      ],
      sources: {
        [BLOB_SECOND]: '# repo-ops-replaces: other@' + BLOB_FIRST
      }
    });

    await env.actions.merge(BEAD);

    expect(coordinator.prepareJob).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).cleanup_failed[BEAD].reason).toBe(
      'post_merge_job_replacement_invalid:20-second'
    );
  });

  test.each([
    [
      'duplicate declaration',
      `# repo-ops-replaces: 20-second@${BLOB_FIRST}\n# repo-ops-replaces: 20-second@${BLOB_CHANGED}`
    ],
    ['self declaration', `# repo-ops-replaces: 20-second@${BLOB_SECOND}`]
  ])('rejects every job before spawn for a %s', async (_label, source) => {
    const { coordinator } = jobCoordinator();
    const env = jobEnv({
      coordinator,
      entries: [
        { name: '10-first', sha: BLOB_FIRST },
        { name: '20-second', sha: BLOB_SECOND }
      ],
      sources: { [BLOB_SECOND]: source }
    });

    await env.actions.merge(BEAD);

    expect(coordinator.prepareJob).not.toHaveBeenCalled();
    expect(env.calls).not.toContain('bd:setStatus:UI-1:closed');
  });

  test('rejects every job before spawn when one blob read fails', async () => {
    const { coordinator } = jobCoordinator();
    const env = jobEnv({
      coordinator,
      entries: [
        { name: '10-first', sha: BLOB_FIRST },
        { name: '20-second', sha: BLOB_SECOND }
      ],
      gitFail: (args) => args[0] === 'cat-file' && args[2] === BLOB_SECOND
    });

    await env.actions.merge(BEAD);

    expect(coordinator.prepareJob).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).cleanup_failed[BEAD].reason).toBe(
      'post_merge_job_unreadable:20-second'
    );
  });

  test('writes the ledger intent before the job is launched', async () => {
    /** @type {any} */
    let ledger_at_launch = null;
    /** @type {any} */
    let env;
    const { coordinator } = jobCoordinator({
      launchJob: vi.fn(async (/** @type {any} */ input) => {
        ledger_at_launch = env.store.snapshot(WS).post_merge_jobs[KEY_FIRST];
        return { ok: true, operation_id: input.operation_id };
      })
    });
    env = jobEnv({
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.merge(BEAD);

    expect(ledger_at_launch).toMatchObject({
      state: 'intent',
      operation_id: 'job-1'
    });
  });

  test('writes applied after the job reaches terminal success', async () => {
    const { coordinator } = jobCoordinator();
    const env = jobEnv({
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).post_merge_jobs[KEY_FIRST]).toMatchObject({
      state: 'applied',
      operation_id: 'job-1'
    });
  });

  test('skips a key the ledger already applied', async () => {
    const store = seedStore();
    store.recordPostMergeJobIntent(WS, {
      key: KEY_FIRST,
      operation_id: 'job-old',
      repo_id: REPO
    });
    store.applyPostMergeJob(WS, { key: KEY_FIRST, operation_id: 'job-old' });
    const { coordinator } = jobCoordinator();
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.merge(BEAD);

    expect(coordinator.prepareJob).not.toHaveBeenCalled();
  });

  test('runs a job once more when the file bytes change', async () => {
    const store = seedStore();
    store.recordPostMergeJobIntent(WS, {
      key: KEY_FIRST,
      operation_id: 'job-old',
      repo_id: REPO
    });
    store.applyPostMergeJob(WS, { key: KEY_FIRST, operation_id: 'job-old' });
    const { coordinator, prepared } = jobCoordinator();
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_CHANGED }]
    });

    await env.actions.merge(BEAD);

    expect(prepared).toEqual(['repo-ops/post-merge.d/10-first']);
    expect(
      env.store.snapshot(WS).post_merge_jobs[`10-first@${BLOB_CHANGED}`]
    ).toMatchObject({ state: 'applied' });
  });

  test('re-adopts an exit-zero run instead of spawning it again', async () => {
    const store = seedStore();
    store.recordPostMergeJobIntent(WS, {
      key: KEY_FIRST,
      operation_id: 'job-prior',
      repo_id: REPO
    });
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'succeeded',
        operation_id
      }))
    });
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.merge(BEAD);

    expect(coordinator.launchJob).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).post_merge_jobs[KEY_FIRST]).toMatchObject({
      state: 'applied',
      operation_id: 'job-prior'
    });
  });

  test('terminates cleanup when an intent has no terminal evidence', async () => {
    const store = seedStore();
    store.recordPostMergeJobIntent(WS, {
      key: KEY_FIRST,
      operation_id: 'job-prior',
      repo_id: REPO
    });
    const { coordinator } = jobCoordinator();
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'post_merge_jobs',
      reason: `post_merge_job_outcome_unknown:${KEY_FIRST}`
    });
    expect(coordinator.prepareJob).not.toHaveBeenCalled();
  });

  test('re-judges the evidence on the cleanup retry click', async () => {
    const store = seedStore();
    store.setCleanupCursor(WS, {
      bead_id: BEAD,
      cursor: 'base_containment',
      merge_sha: MERGE_SHA
    });
    store.recordPostMergeJobIntent(WS, {
      key: KEY_FIRST,
      operation_id: 'job-prior',
      repo_id: REPO
    });
    store.recordCleanupFailure(WS, {
      bead_id: BEAD,
      step: 'post_merge_jobs',
      reason: `post_merge_job_outcome_unknown:${KEY_FIRST}`
    });
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'succeeded',
        operation_id
      }))
    });
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.retryCleanup(BEAD);

    expect(coordinator.launchJob).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).post_merge_jobs[KEY_FIRST].state).toBe(
      'applied'
    );
  });

  test('refuses a new spawn while the recorded run is still alive', async () => {
    const store = seedStore();
    store.setCleanupCursor(WS, {
      bead_id: BEAD,
      cursor: 'base_containment',
      merge_sha: MERGE_SHA
    });
    store.recordPostMergeJobIntent(WS, {
      key: KEY_FIRST,
      operation_id: 'job-prior',
      repo_id: REPO
    });
    store.recordCleanupFailure(WS, {
      bead_id: BEAD,
      step: 'post_merge_jobs',
      reason: `post_merge_job_outcome_unknown:${KEY_FIRST}`
    });
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'running',
        operation_id
      }))
    });
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    const result = await env.actions.retryCleanup(BEAD);

    expect(result).toMatchObject({ ok: true, pending: true });
    expect(coordinator.prepareJob).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).post_merge_jobs[KEY_FIRST].state).toBe(
      'intent'
    );
  });

  test('keeps the row in pr_wait while a live run is waited on', async () => {
    const store = seedStore();
    store.setCleanupCursor(WS, {
      bead_id: BEAD,
      cursor: 'base_containment',
      merge_sha: MERGE_SHA
    });
    store.recordPostMergeJobIntent(WS, {
      key: KEY_FIRST,
      operation_id: 'job-prior',
      repo_id: REPO
    });
    store.recordCleanupFailure(WS, {
      bead_id: BEAD,
      step: 'post_merge_jobs',
      reason: `post_merge_job_outcome_unknown:${KEY_FIRST}`
    });
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'running',
        operation_id
      }))
    });
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.retryCleanup(BEAD);

    expect(
      env.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('re-records a new operation when the recorded run failed terminally', async () => {
    const store = storeAtFailedJob({ reason: 'script_failed' });
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'failed',
        started: true,
        operation_id,
        code: 'script_failed'
      }))
    });
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.retryCleanup(BEAD);

    expect(env.store.snapshot(WS).post_merge_jobs[KEY_FIRST]).toMatchObject({
      state: 'applied',
      operation_id: 'job-1'
    });
  });

  test('preserves the superseded operation lineage across the retry swap', async () => {
    const store = storeAtFailedJob({ reason: 'script_failed' });
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'failed',
        started: true,
        operation_id,
        code: 'script_failed'
      }))
    });
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.retryCleanup(BEAD);

    expect(env.store.snapshot(WS).repo_operations['job-prior']).toMatchObject({
      superseded_by: 'job-1'
    });
  });

  test('completes a failed predecessor from the declared corrective success', async () => {
    const store = storeAtFailedJob({ reason: 'script_failed' });
    const corrective_bead = 'UI-repair';
    const repair_merge_sha = 'e'.repeat(40);
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'repair-attempt',
        bead_id: corrective_bead,
        repo: REPO,
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        runner: 'codex'
      }
    });
    store.updateAttempt(WS, {
      attempt_id: 'repair-attempt',
      patch: {
        session_id: 'repair-session',
        finished_at: 20,
        verify_result: {
          ok: true,
          pr_url: 'https://github.com/o/r/pull/305',
          pr_number: 305
        }
      }
    });
    store.moveToPrWait(WS, {
      bead_id: corrective_bead,
      attempt_id: 'repair-attempt',
      patch: { status: 'done' }
    });
    let prepared_target = null;
    const { coordinator, launched } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'failed',
        started: true,
        operation_id,
        code: 'script_failed'
      })),
      prepareJob: vi.fn(async (/** @type {any} */ input) => {
        prepared_target = input.target_sha;
        prerecordJobOperation(
          store,
          'job-repair',
          BLOB_CHANGED,
          repair_merge_sha
        );
        return { ok: true, operation_id: 'job-repair', timeout_ms: 1000 };
      }),
      waitForJobTerminal: vi.fn(async () => {
        const operation = store.snapshot(WS).repo_operations['job-repair'];
        store.startRepoOperation(WS, {
          operation_id: 'job-repair',
          attempt_id: operation.attempt_id,
          process_identity: { pid: 2, pgid: 2, started_at: 2 },
          log_path: '/tmp/job-repair.log'
        });
        store.settleRepoOperation(WS, {
          operation_id: 'job-repair',
          attempt_id: operation.attempt_id,
          exit_code: 0,
          signal: null
        });
        return { state: 'succeeded', operation_id: 'job-repair' };
      })
    });
    const successor_key = `10-first@${BLOB_CHANGED}`;
    const repair_env = makeActions({
      ...ON_BASE,
      store,
      repoOperations: coordinator,
      details: [prOf({ number: 305, head_ref: corrective_bead })],
      afterMerge: {
        state: 'ok',
        data: prOf({
          number: 305,
          state: 'MERGED',
          head_ref: corrective_bead,
          merged_sha: repair_merge_sha
        })
      },
      gitStdout: gitListing([{ name: '10-first', sha: BLOB_CHANGED }], {
        [BLOB_CHANGED]: `# repo-ops-replaces: 10-first@${BLOB_FIRST}`
      })
    });

    await repair_env.actions.merge(corrective_bead);

    const original_env = jobEnv({
      store,
      coordinator: jobCoordinator().coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await original_env.actions.retryCleanup(BEAD);

    expect(launched).toEqual(['job-repair']);
    expect(prepared_target).toBe(repair_merge_sha);
    expect(store.snapshot(WS).post_merge_jobs).toMatchObject({
      [KEY_FIRST]: {
        state: 'superseded',
        operation_id: 'job-prior',
        repair: { key: successor_key, operation_id: 'job-repair' }
      },
      [successor_key]: {
        state: 'applied',
        operation_id: 'job-repair',
        replaces: { key: KEY_FIRST, operation_id: 'job-prior' }
      }
    });
    expect(store.snapshot(WS).repo_operations['job-prior']).toMatchObject({
      state: 'failed',
      exit_code: 1,
      log_path: '/tmp/job-prior.log',
      superseded_by: 'job-repair'
    });
    expect(original_env.calls).toContain(`bd:setStatus:${BEAD}:closed`);
    expect(store.snapshot(WS).pr_wait).toEqual([]);
    expect(
      store.snapshot(WS).done.find((entry) => entry.bead_id === BEAD)
    ).toMatchObject({ merge_sha: MERGE_SHA });
  });

  test('follows a reserved corrective operation instead of retrying the old blob', async () => {
    const store = storeAtFailedJob({ reason: 'script_failed' });
    prerecordJobOperation(store, 'job-repair', BLOB_CHANGED);
    store.recordPostMergeJobIntent(WS, {
      key: `10-first@${BLOB_CHANGED}`,
      operation_id: 'job-repair',
      repo_id: REPO,
      replaces: { key: KEY_FIRST, operation_id: 'job-prior' }
    });
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'running',
        started: true,
        operation_id
      }))
    });
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    const result = await env.actions.retryCleanup(BEAD);

    expect(result).toMatchObject({ ok: true, pending: true });
    expect(coordinator.reconcileJob).toHaveBeenCalledWith('job-repair');
    expect(coordinator.prepareJob).not.toHaveBeenCalled();
  });

  test('keeps the predecessor unfinished when the declared corrective job fails', async () => {
    const store = storeAtFailedJob({ reason: 'script_failed' });
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'failed',
        started: true,
        operation_id,
        code: 'script_failed'
      })),
      prepareJob: vi.fn(async () => {
        prerecordJobOperation(store, 'job-repair', BLOB_CHANGED);
        return { ok: true, operation_id: 'job-repair', timeout_ms: 1000 };
      }),
      waitForJobTerminal: vi.fn(async () => {
        const operation = store.snapshot(WS).repo_operations['job-repair'];
        store.settleRepoOperation(WS, {
          operation_id: 'job-repair',
          attempt_id: operation.attempt_id,
          exit_code: 2,
          signal: null
        });
        return {
          state: 'failed',
          operation_id: 'job-repair',
          code: 'script_failed'
        };
      })
    });
    const successor_key = `10-first@${BLOB_CHANGED}`;
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_CHANGED }],
      sources: {
        [BLOB_CHANGED]: `# repo-ops-replaces: 10-first@${BLOB_FIRST}`
      }
    });

    await env.actions.retryCleanup(BEAD);

    expect(store.snapshot(WS).post_merge_jobs).toMatchObject({
      [KEY_FIRST]: {
        state: 'intent',
        repair: { key: successor_key, operation_id: 'job-repair' }
      },
      [successor_key]: { state: 'intent', operation_id: 'job-repair' }
    });
    expect(store.snapshot(WS).repo_operations['job-prior']).toMatchObject({
      state: 'failed',
      log_path: '/tmp/job-prior.log',
      superseded_by: null
    });
    expect(env.calls).not.toContain(`bd:setStatus:${BEAD}:closed`);
  });

  test.each(['running', 'unknown'])(
    'blocks a corrective launch while predecessor evidence is %s',
    async (state) => {
      const store = storeAtFailedJob({ reason: 'script_failed' });
      const { coordinator } = jobCoordinator({
        reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
          state,
          operation_id
        }))
      });
      const env = jobEnv({
        store,
        coordinator,
        entries: [{ name: '10-first', sha: BLOB_CHANGED }],
        sources: {
          [BLOB_CHANGED]: `# repo-ops-replaces: 10-first@${BLOB_FIRST}`
        }
      });

      await env.actions.retryCleanup(BEAD);

      expect(coordinator.prepareJob).not.toHaveBeenCalled();
      expect(env.calls).not.toContain(`bd:setStatus:${BEAD}:closed`);
    }
  );

  test('blocks a corrective launch when predecessor reconciliation throws', async () => {
    const store = storeAtFailedJob({ reason: 'script_failed' });
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async () => {
        throw new Error('probe unavailable');
      })
    });
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_CHANGED }],
      sources: {
        [BLOB_CHANGED]: `# repo-ops-replaces: 10-first@${BLOB_FIRST}`
      }
    });

    await env.actions.retryCleanup(BEAD);

    expect(coordinator.prepareJob).not.toHaveBeenCalled();
    expect(env.calls).not.toContain(`bd:setStatus:${BEAD}:closed`);
  });

  test.each(['absent', 'applied', 'successful intent'])(
    'runs a declared corrective job normally when the predecessor is %s',
    async (predecessor_state) => {
      const store = seedStore();
      if (predecessor_state !== 'absent') {
        prerecordJobOperation(store, 'job-prior');
        store.recordPostMergeJobIntent(WS, {
          key: KEY_FIRST,
          operation_id: 'job-prior',
          repo_id: REPO
        });
        if (predecessor_state === 'applied') {
          store.applyPostMergeJob(WS, {
            key: KEY_FIRST,
            operation_id: 'job-prior'
          });
        }
      }
      const { coordinator, prepared } = jobCoordinator({
        reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
          state: 'succeeded',
          operation_id
        }))
      });
      const env = jobEnv({
        store,
        coordinator,
        entries: [{ name: '10-first', sha: BLOB_CHANGED }],
        sources: {
          [BLOB_CHANGED]: `# repo-ops-replaces: 10-first@${BLOB_FIRST}`
        }
      });

      await env.actions.merge(BEAD);

      expect(prepared).toEqual(['repo-ops/post-merge.d/10-first']);
      expect(store.snapshot(WS).post_merge_jobs[KEY_FIRST]?.repair).toBeFalsy();
    }
  );

  test('re-runs a coordinator-refused job the cleanup replay finds pending', async () => {
    const store = seedStore();
    prerecordJobOperation(store, 'job-prior');
    store.recordPostMergeJobIntent(WS, {
      key: KEY_FIRST,
      operation_id: 'job-prior',
      repo_id: REPO
    });
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'failed',
        started: false,
        operation_id,
        code: 'post_merge_job_target_moved'
      }))
    });
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).post_merge_jobs[KEY_FIRST]).toMatchObject({
      state: 'applied',
      operation_id: 'job-1'
    });
  });

  test('terminates a job that started and then died without terminal evidence', async () => {
    const store = seedStore();
    prerecordJobOperation(store, 'job-prior');
    store.recordPostMergeJobIntent(WS, {
      key: KEY_FIRST,
      operation_id: 'job-prior',
      repo_id: REPO
    });
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'failed',
        started: true,
        operation_id,
        code: 'interrupted'
      }))
    });
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'post_merge_jobs',
      reason: `post_merge_job_outcome_unknown:${KEY_FIRST}`
    });
    expect(coordinator.prepareJob).not.toHaveBeenCalled();
  });

  test('refuses to re-run an outcome-unknown job on a completion cleanup replay', async () => {
    const store = ownCompletionCleanup(storeAtFailedJob());
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'failed',
        started: true,
        operation_id,
        code: 'interrupted'
      }))
    });
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.resumeCompletionCleanup(BEAD);

    expect(coordinator.prepareJob).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).post_merge_jobs[KEY_FIRST]).toMatchObject({
      state: 'intent',
      operation_id: 'job-prior'
    });
  });

  test('re-runs the same outcome-unknown job on the cleanup retry click', async () => {
    const store = ownCompletionCleanup(storeAtFailedJob());
    const { coordinator } = jobCoordinator({
      reconcileJob: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'failed',
        started: true,
        operation_id,
        code: 'interrupted'
      }))
    });
    const env = jobEnv({
      store,
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.retryCleanup(BEAD);

    expect(env.store.snapshot(WS).post_merge_jobs[KEY_FIRST]).toMatchObject({
      state: 'applied',
      operation_id: 'job-1'
    });
  });

  test('stops the cleanup on a job entry that is not a regular file', async () => {
    const { coordinator } = jobCoordinator();
    const env = jobEnv({
      coordinator,
      entries: [
        { name: 'nested', sha: BLOB_FIRST, mode: '040000', type: 'tree' }
      ]
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'post_merge_jobs',
      reason: 'post_merge_job_invalid:nested'
    });
    expect(coordinator.prepareJob).not.toHaveBeenCalled();
  });

  test('stops the cleanup on a symlinked job entry', async () => {
    const { coordinator } = jobCoordinator();
    const env = jobEnv({
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST, mode: '120000' }]
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      reason: 'post_merge_job_invalid:10-first'
    });
  });

  test('blocks the parent close when a job fails', async () => {
    const { coordinator } = jobCoordinator({
      waitForJobTerminal: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'failed',
        operation_id,
        code: 'script_failed',
        log_path: '/tmp/job.log'
      }))
    });
    const env = jobEnv({
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'post_merge_jobs',
      reason: 'script_failed',
      log_path: '/tmp/job.log'
    });
    expect(
      env.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
    expect(env.calls).not.toContain(`bd:setStatus:${BEAD}:closed`);
  });

  test('writes no applied key for a failed job', async () => {
    const { coordinator } = jobCoordinator({
      waitForJobTerminal: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'failed',
        operation_id,
        code: 'script_failed'
      }))
    });
    const env = jobEnv({
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).post_merge_jobs[KEY_FIRST].state).toBe(
      'intent'
    );
  });

  test('runs no later job once an earlier one failed', async () => {
    const { coordinator, prepared } = jobCoordinator({
      waitForJobTerminal: vi.fn(async (/** @type {string} */ operation_id) => ({
        state: 'failed',
        operation_id,
        code: 'script_failed'
      }))
    });
    const env = jobEnv({
      coordinator,
      entries: [
        { name: '10-first', sha: BLOB_FIRST },
        { name: '20-second', sha: BLOB_SECOND }
      ]
    });

    await env.actions.merge(BEAD);

    expect(prepared).toEqual(['repo-ops/post-merge.d/10-first']);
    expect(env.store.snapshot(WS).post_merge_jobs[KEY_SECOND]).toBeUndefined();
  });

  test('refuses to run a job whose aligned target moved', async () => {
    const { coordinator } = jobCoordinator({
      prepareJob: vi.fn(async () => ({
        ok: false,
        code: 'post_merge_job_target_moved'
      }))
    });
    const env = jobEnv({
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'post_merge_jobs',
      reason: `post_merge_job_target_moved:${KEY_FIRST}`
    });
  });

  test('leaves the ledger untouched when the target moved', async () => {
    const { coordinator } = jobCoordinator({
      prepareJob: vi.fn(async () => ({
        ok: false,
        code: 'post_merge_job_target_moved'
      }))
    });
    const env = jobEnv({
      coordinator,
      entries: [{ name: '10-first', sha: BLOB_FIRST }]
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).post_merge_jobs).toEqual({});
  });

  test('resumes a row parked past the job step without re-running it', async () => {
    const { coordinator } = jobCoordinator();
    const env = jobEnv({ coordinator });
    env.store.setCleanupCursor(WS, {
      bead_id: BEAD,
      cursor: 'base_containment',
      merge_sha: MERGE_SHA
    });
    env.store.setCleanupCursor(WS, {
      bead_id: BEAD,
      cursor: 'repo_operations'
    });
    env.store.setCleanupCursor(WS, {
      bead_id: BEAD,
      cursor: 'post_merge_jobs'
    });
    env.store.setCleanupCursor(WS, { bead_id: BEAD, cursor: 'branch_cleanup' });

    await env.actions.resumeRepoOperations();

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toBeUndefined();
  });

  test('stops on an unreadable job listing rather than reading it as empty', async () => {
    const { coordinator } = jobCoordinator();
    const env = makeActions({
      ...ON_BASE,
      gitResult: (/** @type {string[]} */ args) =>
        args[0] === 'ls-tree' ? 128 : 0,
      repoOperations: coordinator
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'post_merge_jobs',
      reason: 'post_merge_jobs_unreadable'
    });
  });

  // UI-gske §3.5: same rule — with no completion intent the job step's record
  // is the terminal.
  test('announces the job step record as 정리 중단 without a completion intent', async () => {
    const { coordinator } = jobCoordinator();
    const env = makeActions({
      ...ON_BASE,
      gitResult: (/** @type {string[]} */ args) =>
        args[0] === 'ls-tree' ? 128 : 0,
      repoOperations: coordinator
    });

    await env.actions.merge(BEAD);
    await settleAnnouncements();

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'post_merge_jobs'
    });
    expect(env.human_notices).toEqual([
      expect.objectContaining({
        failure_class: '정리 중단',
        reason: 'post_merge_jobs_unreadable'
      })
    ]);
  });
});

describe('post-merge cleanup — a landed row finishes its jobs at the deployed HEAD (UI-1eag §5)', () => {
  // The 2026-10-16 dotfiles-gqsok shape: the row merged at MERGED, whose
  // Discord job failed there; a later landing deployed DEPLOYED, which carries
  // the Discord revision and the same oracle job.
  const MERGED = '6a59ee4'.padEnd(40, '0');
  const DEPLOYED = 'c50e34c'.padEnd(40, '0');
  const DISCORD = 'dotfiles-79429-retire-discord.py';
  const ORACLE = 'dotfiles-ptx3h-retire-oracle.py';
  const DISCORD_OLD = '32aa369e'.padEnd(40, '0');
  const DISCORD_FIX = '604204c3'.padEnd(40, '0');
  const ORACLE_BLOB = '6d045412'.padEnd(40, '0');
  const KEY_DISCORD_OLD = `${DISCORD}@${DISCORD_OLD}`;
  const KEY_DISCORD_FIX = `${DISCORD}@${DISCORD_FIX}`;
  const KEY_ORACLE = `${ORACLE}@${ORACLE_BLOB}`;
  const OLD_OPERATION = 'f07f5e1f';
  const OLD_LOG = '/tmp/f07f5e1f.log';
  const LANDED_ROWS = ['dotfiles-ptx3h', 'dotfiles-79429', 'dotfiles-41zm2'];

  /** @type {Record<string, { name: string, sha: string }[]>} */
  const TREES = {
    [MERGED]: [
      { name: DISCORD, sha: DISCORD_OLD },
      { name: ORACLE, sha: ORACLE_BLOB }
    ],
    [DEPLOYED]: [
      { name: DISCORD, sha: DISCORD_FIX },
      { name: ORACLE, sha: ORACLE_BLOB }
    ]
  };

  /** @type {Record<string, string>} */
  const SOURCES = {
    [DISCORD_FIX]: `#!/usr/bin/env python3\n# repo-ops-replaces: ${KEY_DISCORD_OLD}\nprint("retire")\n`
  };

  /**
   * @param {string[]} args
   * @returns {string|undefined}
   */
  function repositoryReads(args) {
    if (args[0] === 'ls-tree' && args[1] === '-z') {
      return (TREES[args[2]] ?? [])
        .map(
          (entry) =>
            `100755 blob ${entry.sha}\trepo-ops/post-merge.d/${entry.name}\0`
        )
        .join('');
    }
    if (args[0] === 'ls-tree' && args.at(-1) === 'repo-ops/config.toml') {
      return '';
    }
    if (args[0] === 'cat-file' && args[1] === 'blob') {
      return SOURCES[args[2]] ?? '#!/bin/sh\n';
    }
    return undefined;
  }

  /**
   * DEPLOYED descends from MERGED; no repository declaration exists.
   *
   * @param {string[]} args
   * @returns {number|null}
   */
  function repositoryCodes(args) {
    if (args[0] === 'show') {
      return 128;
    }
    if (
      args[0] === 'merge-base' &&
      args[1] === '--is-ancestor' &&
      args[2] === DEPLOYED &&
      args[3] === MERGED
    ) {
      return 1;
    }
    return null;
  }

  /** The row stopped at its job step with the Discord key's run failed. */
  function storeAtMovedTarget() {
    const store = seedStore();
    store.setCleanupCursor(WS, {
      bead_id: BEAD,
      cursor: 'base_containment',
      merge_sha: MERGED
    });
    store.ensureRepoOperation(WS, {
      operation_id: OLD_OPERATION,
      repo_id: REPO,
      kind: 'job',
      subjects: [{ bead_id: BEAD, merged_sha: MERGED }],
      effective_base_sha: MERGED,
      target_base: 'main',
      target_sha: MERGED,
      script_path: `repo-ops/post-merge.d/${DISCORD}`,
      script_mode: '100755',
      script_blob_sha: DISCORD_OLD
    });
    const old = store.snapshot(WS).repo_operations[OLD_OPERATION];
    store.startRepoOperation(WS, {
      operation_id: OLD_OPERATION,
      attempt_id: old.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: OLD_LOG
    });
    store.settleRepoOperation(WS, {
      operation_id: OLD_OPERATION,
      attempt_id: old.attempt_id,
      exit_code: 1,
      signal: null,
      failure: {
        code: 'script_failed',
        fingerprint: 'f'.repeat(64),
        detail: '',
        interrupted: false
      }
    });
    store.recordPostMergeJobIntent(WS, {
      key: KEY_DISCORD_OLD,
      operation_id: OLD_OPERATION,
      repo_id: REPO
    });
    store.recordCleanupFailure(WS, {
      bead_id: BEAD,
      step: 'post_merge_jobs',
      reason: `post_merge_job_target_moved:${KEY_DISCORD_OLD}`
    });
    for (const bead_id of LANDED_ROWS) {
      store.moveToDone(WS, { bead_id });
    }
    return store;
  }

  /** One human [정리 재시도] of that row over a real coordinator. */
  async function retriedRow() {
    const store = storeAtMovedTarget();
    const world = {
      head: DEPLOYED,
      /** @type {{ blob: string, target_sha: string }[]} */
      spawns: [],
      /** @type {Map<string, { exit_code: number, signal: null }>} */
      markers: new Map()
    };
    /** @type {any} */
    let git = null;
    let clock = 0;
    const coordinator = createRepoOperationCoordinator({
      workspace: WS,
      repo: REPO,
      store,
      locks: createLockManager(),
      gitRun: (args, options) => git(args, options),
      runner: /** @type {never} */ ({
        start: vi.fn(async (/** @type {any} */ input) => {
          world.spawns.push({
            blob: store.snapshot(WS).repo_operations[input.operation_id]
              .script_blob_sha,
            target_sha: input.target_sha
          });
          world.markers.set(input.operation_id, {
            exit_code: 0,
            signal: null
          });
          return {
            ok: true,
            process_identity: { pid: 2, pgid: 2, started_at: 2 },
            log_path: path.join(tmp_state, `${input.operation_id}.log`)
          };
        }),
        readMarker: (
          /** @type {string} */ _workspace,
          /** @type {string} */ operation_id
        ) => world.markers.get(operation_id) ?? null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }),
      transition: /** @type {never} */ ({
        materialize: async () => ({
          ok: true,
          path: path.join(tmp_state, 'script')
        }),
        reclaim: () => {}
      }),
      deployWorktree: /** @type {never} */ ({
        bindTarget: async () => ({ ok: true, target_sha: DEPLOYED }),
        readState: async () => ({ ok: true, head: world.head, clean: true }),
        ensureAligned: async (/** @type {any} */ aligned) => {
          world.head = aligned.target_sha;
          return {
            ok: true,
            path: path.join(tmp_state, 'deploy'),
            target_sha: aligned.target_sha
          };
        },
        verifyAligned: async (/** @type {any} */ aligned) => ({
          ok: world.head === aligned.target_sha
        }),
        verifyCovered: async () => ({ ok: true })
      }),
      deployLock: /** @type {never} */ (
        async () => ({ ok: true, release: async () => {} })
      ),
      now: () => clock,
      sleep: async (ms) => {
        clock += ms;
      }
    });
    const env = makeActions({
      ...ON_BASE,
      store,
      repoOperations: coordinator,
      gitStdout: repositoryReads,
      gitResult: repositoryCodes
    });
    git = env.gitRun;
    const result = await env.actions.retryCleanup(BEAD);
    return { store, world, env, result };
  }

  test('supersedes the failed Discord key through its revision on one human retry', async () => {
    const { store } = await retriedRow();

    const ledger = store.snapshot(WS).post_merge_jobs;
    expect(ledger[KEY_DISCORD_OLD]).toMatchObject({
      state: 'superseded',
      operation_id: OLD_OPERATION,
      repair: {
        key: KEY_DISCORD_FIX,
        operation_id: ledger[KEY_DISCORD_FIX].operation_id
      }
    });
  });

  test('applies the Discord revision and the oracle job on the same retry', async () => {
    const { store } = await retriedRow();

    const ledger = store.snapshot(WS).post_merge_jobs;
    expect({
      revision: ledger[KEY_DISCORD_FIX]?.state,
      oracle: ledger[KEY_ORACLE]?.state
    }).toEqual({ revision: 'applied', oracle: 'applied' });
  });

  test('runs the revision and the oracle job at the deployed HEAD in name order', async () => {
    const { world } = await retriedRow();

    expect(world.spawns).toEqual([
      { blob: DISCORD_FIX, target_sha: DEPLOYED },
      { blob: ORACLE_BLOB, target_sha: DEPLOYED }
    ]);
  });

  test('never spawns the superseded Discord blob', async () => {
    const { world } = await retriedRow();

    expect(world.spawns.filter((spawn) => spawn.blob === DISCORD_OLD)).toEqual(
      []
    );
  });

  test('keeps the old failed operation evidence as it was', async () => {
    const { store } = await retriedRow();

    expect(store.snapshot(WS).repo_operations[OLD_OPERATION]).toMatchObject({
      state: 'failed',
      exit_code: 1,
      log_path: OLD_LOG,
      target_sha: MERGED,
      failure: { code: 'script_failed' }
    });
  });

  test('carries the cleanup past the job step to the close', async () => {
    const { store, env, result } = await retriedRow();

    expect(result).toMatchObject({ ok: true, step: null, reason: null });
    expect(env.calls).toContain(`bd:setStatus:${BEAD}:closed`);
    expect(store.snapshot(WS).pr_wait).toEqual([]);
  });

  test('leaves the landed done rows without a merge sha', async () => {
    const { store } = await retriedRow();

    expect(
      store
        .snapshot(WS)
        .done.filter((/** @type {any} */ entry) =>
          LANDED_ROWS.includes(entry.bead_id)
        )
        .map((/** @type {any} */ entry) => entry.merge_sha)
    ).toEqual([null, null, null]);
  });
});

describe('cleanup stop notification (UI-jw27 §2, UI-gske §3.5)', () => {
  // With no completion intent nothing runs a scheduled cleanup retry, so each
  // recorded stop is announced once as 정리 중단 (UI-gske §3.5).
  test('announces a base containment stop with its cause and PR as 정리 중단', async () => {
    const h = makeActions({ gitFail: (args) => args[0] === 'fetch' });
    h.store.recordCleanupFailure(WS, {
      bead_id: BEAD,
      step: 'base_containment',
      reason: 'base_fetch_failed',
      retryable: true,
      retry_count: 2
    });

    await h.actions.merge(BEAD);
    await settleAnnouncements();

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'base_containment',
      retry_count: 3
    });
    expect(h.human_notices).toEqual([
      expect.objectContaining({
        bead_id: BEAD,
        failure_class: '정리 중단',
        reason: 'base_fetch_failed',
        next_action: '[세션에서 이어가기] 또는 [정리 재시도]',
        repo: REPO
      })
    ]);
  });

  test('announces a base containment stop once even while its retry is scheduled', async () => {
    const h = makeActions({ gitFail: (args) => args[0] === 'fetch' });

    await h.actions.merge(BEAD);
    await settleAnnouncements();

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      retry_count: 0,
      next_retry_at: 61_000,
      interruption_notified_at: expect.any(Number)
    });
    expect(h.human_notices).toEqual([
      expect.objectContaining({ failure_class: '정리 중단' })
    ]);
  });

  test('sends nothing when the store refuses the failure record', async () => {
    const h = makeActions({ gitFail: (args) => args[0] === 'fetch' });
    vi.spyOn(h.store, 'recordCleanupFailure').mockReturnValue({
      ok: false,
      conflict: false,
      queue: h.store.snapshot(WS)
    });

    await h.actions.merge(BEAD);
    await settleAnnouncements();

    expect(h.human_notices).toEqual([]);
  });

  test('announces a branch cleanup stop a [정리 재시도] click recorded again', async () => {
    const h = makeActions({
      removeByBranchResult: {
        ok: false,
        removed: false,
        reason: 'ref_delete_failed'
      }
    });
    await h.actions.merge(BEAD);
    h.store.recordCleanupFailure(WS, {
      bead_id: BEAD,
      step: 'branch_cleanup',
      reason: 'local_branch_delete_failed',
      detail: 'manager_reason=ref_delete_failed',
      retryable: true,
      retry_count: 2
    });
    await settleAnnouncements();
    h.human_notices.length = 0;

    await h.actions.retryCleanup(BEAD);
    await settleAnnouncements();

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'branch_cleanup',
      retry_count: 3
    });
    expect(h.human_notices).toEqual([
      expect.objectContaining({
        failure_class: '정리 중단',
        reason: 'local_branch_delete_failed'
      })
    ]);
  });

  test('announces a branch cleanup stop once even while its retry is scheduled', async () => {
    const h = makeActions({
      removeByBranchResult: {
        ok: false,
        removed: false,
        reason: 'ref_delete_failed'
      }
    });

    await h.actions.merge(BEAD);
    await settleAnnouncements();

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      retry_count: 0,
      next_retry_at: 61_000
    });
    expect(h.human_notices).toEqual([
      expect.objectContaining({ failure_class: '정리 중단' })
    ]);
  });

  test('announces a parent close stop as 정리 중단', async () => {
    const h = makeActions();
    h.bd.readStatus.mockImplementation(async () => {
      throw new Error('bd down');
    });

    await h.actions.merge(BEAD);
    await settleAnnouncements();

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'parent_close'
    });
    expect(h.human_notices).toEqual([
      expect.objectContaining({ failure_class: '정리 중단' })
    ]);
  });

  test('opens the 정리 중단 conversation once before its push', async () => {
    const launchForBead = vi.fn(async () => ({ session: 'launched' }));
    const h = makeActions({
      gitFail: (args) => args[0] === 'fetch',
      failureConversation: { launchForBead }
    });

    await h.actions.merge(BEAD);
    await settleAnnouncements();

    expect(launchForBead).toHaveBeenCalledExactlyOnceWith({
      workspace: WS,
      repo: REPO,
      bead_id: BEAD,
      cleanup_at: h.store.snapshot(WS).cleanup_failed[BEAD].at
    });
    expect(h.human_notices).toEqual([
      expect.objectContaining({ conversation: { session: 'launched' } })
    ]);
  });

  test('sends nothing again when the merged row is observed again', async () => {
    const launchForBead = vi.fn(async () => ({ session: 'launched' }));
    const h = makeActions({
      gitFail: (args) => args[0] === 'fetch',
      failureConversation: { launchForBead }
    });
    await h.actions.merge(BEAD);
    await settleAnnouncements();

    const again = await h.actions.cleanupObservedMerge(BEAD, 'c'.repeat(40));
    await settleAnnouncements();

    expect(again).toMatchObject({ ok: false, reason: 'merged_cleanup_failed' });
    expect(launchForBead).toHaveBeenCalledTimes(1);
    expect(h.human_notices).toHaveLength(1);
  });

  test('sends nothing for a recorded stop after a server restart', async () => {
    const first = makeActions({ gitFail: (args) => args[0] === 'fetch' });
    await first.actions.merge(BEAD);
    await settleAnnouncements();
    const launchForBead = vi.fn(async () => ({ session: 'launched' }));
    const restarted = makeActions({
      store: first.store,
      gitFail: (args) => args[0] === 'fetch',
      failureConversation: { launchForBead }
    });

    await restarted.actions.resumeRepoOperations();
    await settleAnnouncements();

    expect(launchForBead).not.toHaveBeenCalled();
    expect(restarted.human_notices).toEqual([]);
  });

  test('completes the merge normally when the notifier throws', async () => {
    const h = makeActions({ gitFail: (args) => args[0] === 'fetch' });
    h.store.recordCleanupFailure(WS, {
      bead_id: BEAD,
      step: 'base_containment',
      reason: 'base_fetch_failed',
      retryable: true,
      retry_count: 2
    });
    h.notify.needsHuman.mockImplementation(() => {
      throw new Error('notifier broken');
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: false, cleanup_step: 'base_containment' });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'base_containment'
    });
  });
});

describe('worker/pr-actions — 영수증 detail과 verify 원인 전달 (UI-jxs3 §4.2/§6.2)', () => {
  /**
   * A store whose implementation attempt froze a baseline with no
   * `impl_entry`, so a bead that now carries one reads as `approval_forged`.
   */
  function forgedBaselineStore() {
    const store = seedStore();
    store.updateAttempt(WS, {
      attempt_id: 'a1',
      patch: {
        receipt_baseline: {
          exec_receipt: null,
          impl_entry: null,
          plan_approval: null,
          workflow_mode_source: null,
          impl_dispatch: null
        }
      }
    });
    return store;
  }

  test('carries the moved key from the receipt check to the gate evidence', async () => {
    const env = makeActions({
      store: forgedBaselineStore(),
      details: [prOf({ head_sha: 'a'.repeat(40), base_ref: 'main' })],
      bdMetadata: {
        exec_receipt: `main:bead@${'a'.repeat(40)}`,
        impl_dispatch: 'main',
        impl_entry: `user@${'b'.repeat(40)}`
      }
    });

    const result = await env.actions.completionGate(BEAD);

    expect(result).toMatchObject({
      ok: true,
      verdict: { reason: 'receipt_unbacked:approval_forged' }
    });
    expect(result.evidence.receipt.codes).toEqual([
      'approval_forged',
      'dispatch_forged'
    ]);
    expect(result.evidence.receipt.details[0]).toContain('impl_entry');
    expect(result.evidence.receipt.details[0]).toContain('user@');
    expect(result.evidence.receipt.details[1]).toContain('impl_dispatch');
  });

  test('carries no receipt evidence when the receipt backing is clean', async () => {
    const env = makeActions({
      repoOperations: failedVerifyOperations(),
      details: [prOf({ head_sha: 'a'.repeat(40), base_ref: 'main' })]
    });

    const result = await env.actions.completionGate(BEAD);

    expect(result.evidence.receipt).toBeUndefined();
  });

  test('names the ensureVerify failure code in the gate reason', async () => {
    const env = makeActions({
      details: [prOf({ head_sha: 'a'.repeat(40), base_ref: 'main' })],
      repoOperations: {
        hasConfig: vi.fn(async () => ({
          ok: true,
          present: true,
          verify_script_path: VERIFY_SCRIPT_PATH
        })),
        ensureVerify: vi.fn(async () => ({
          ok: false,
          code: 'verify_candidate_mismatch'
        })),
        waitForTerminal: vi.fn(),
        verifyReceipt: vi.fn()
      }
    });

    const result = await env.actions.completionGate(BEAD);

    expect(result).toMatchObject({
      ok: true,
      verdict: {
        enabled: false,
        reason: 'verify_config_invalid:verify_candidate_mismatch'
      }
    });
  });

  test('falls back to operation_id_missing when ensureVerify reported no code', async () => {
    const env = makeActions({
      details: [prOf({ head_sha: 'a'.repeat(40), base_ref: 'main' })],
      repoOperations: {
        hasConfig: vi.fn(async () => ({
          ok: true,
          present: true,
          verify_script_path: VERIFY_SCRIPT_PATH
        })),
        ensureVerify: vi.fn(async () => ({ ok: true })),
        waitForTerminal: vi.fn(),
        verifyReceipt: vi.fn()
      }
    });

    const result = await env.actions.completionGate(BEAD);

    expect(result.verdict.reason).toBe(
      'verify_config_invalid:operation_id_missing'
    );
  });
});

describe('post-merge cleanup — completed worktree backup (UI-w2ou §3.4)', () => {
  const RECEIPT = Object.freeze({
    path: '/tmp/example-state/discard-backups/completed-worktree-abc',
    manifest_sha256: 'd'.repeat(64),
    file_count: 3
  });

  test('appends the backup path to the cleanup failure detail', async () => {
    const h = makeActions();
    h.worktree.removeCompleted.mockResolvedValueOnce(
      /** @type {any} */ ({
        ok: false,
        removed: true,
        reason: 'ref_delete_failed',
        worktree_removed: true,
        branch_removed: false,
        backup: RECEIPT
      })
    );

    await h.actions.merge(BEAD);

    expect(h.store.snapshot(WS).cleanup_failed[BEAD].detail).toBe(
      `manager_reason=ref_delete_failed worktree_removed=true branch_removed=false backup=${RECEIPT.path}`
    );
  });

  test('records one timeline line for a cleanup that made a backup', async () => {
    /** @type {any[]} */
    const events = [];
    const h = makeActions({
      timeline: {
        append: (/** @type {any} */ input) => {
          events.push(input);
          return { ok: true };
        }
      }
    });
    h.worktree.removeCompleted.mockResolvedValueOnce(
      /** @type {any} */ ({
        ok: true,
        removed: true,
        reason: null,
        worktree_removed: true,
        branch_removed: true,
        backup: RECEIPT
      })
    );

    await h.actions.merge(BEAD);

    expect(events.filter((event) => event.detail === RECEIPT.path)).toEqual([
      expect.objectContaining({
        bead_id: BEAD,
        kind: 'merge_step',
        seq: 'branch_cleanup:backup:completed-worktree-abc:removed',
        summary: '정리 — 커밋 안 된 변경 3개를 백업하고 워크트리를 지움'
      })
    ]);
  });

  test('records one timeline line for a cleanup that made a backup but kept the worktree', async () => {
    /** @type {any[]} */
    const events = [];
    const h = makeActions({
      timeline: {
        append: (/** @type {any} */ input) => {
          events.push(input);
          return { ok: true };
        }
      }
    });
    h.worktree.removeCompleted.mockResolvedValueOnce(
      /** @type {any} */ ({
        ok: false,
        removed: false,
        reason: 'identity_changed',
        worktree_removed: false,
        branch_removed: false,
        backup: RECEIPT
      })
    );

    await h.actions.merge(BEAD);

    expect(events.filter((event) => event.detail === RECEIPT.path)).toEqual([
      expect.objectContaining({
        bead_id: BEAD,
        kind: 'merge_step',
        seq: 'branch_cleanup:backup:completed-worktree-abc:kept',
        summary: '정리 — 커밋 안 된 변경 3개를 백업함(워크트리는 남김)'
      })
    ]);
  });
});

describe('pinned foreign PR target (UI-k467 §3.4–§3.6)', () => {
  const TARGET_PATH = '/targets/research-repo-template';
  const FOREIGN_URL = 'https://github.com/acme/research-repo-template/pull/304';
  const SLUG = 'acme/research-repo-template';
  const HEAD = 'e'.repeat(40);
  const TIP = 'f'.repeat(40);
  const MERGE = '7'.repeat(40);
  const PARENT = '6'.repeat(40);
  const TREE = '9'.repeat(40);

  /**
   * @param {Partial<import('./gh.js').PrDetail>} [over]
   */
  function foreignPr(over = {}) {
    return prOf({
      url: FOREIGN_URL,
      head_sha: HEAD,
      ...over
    });
  }

  /**
   * A harness whose bd carries the three pins, whose gh answers ONLY through
   * the pinned slug, and whose git models the bound target checkout.
   *
   * @param {{ pr?: Partial<import('./gh.js').PrDetail>, after?: Partial<import('./gh.js').PrDetail>, policy?: (sha: string) => any, containment?: number, post_merge_jobs?: boolean, remote_head?: string|null, verify_receipt?: any, tips?: string[], metadata?: Record<string, string> }} [opts]
   */
  function makeForeign(opts = {}) {
    const store = seedStore();
    // The Worker's own verify recorded the TARGET PR on the attempt.
    store.updateAttempt(WS, {
      attempt_id: 'a1',
      patch: {
        verify_result: /** @type {any} */ ({
          ok: true,
          pr_url: FOREIGN_URL,
          pr_number: 304
        })
      }
    });
    const observations = createPrObservationStore();
    /** @type {string[]} */
    const calls = [];
    /** @type {Record<string, string>} */
    const metadata = {
      route: 'quick_fix',
      pr_url: FOREIGN_URL,
      foreign_repo: 'git@github.com:acme/research-repo-template.git',
      foreign_path: TARGET_PATH,
      foreign_base: 'main',
      ...opts.metadata
    };
    let status = 'resolved';
    let merged = false;
    let tip_reads = 0;
    const foreign = {
      prDetail: vi.fn(async () => ({
        state: 'ok',
        data: merged
          ? foreignPr({
              state: 'MERGED',
              merged_sha: MERGE,
              merge_sha: MERGE,
              ...opts.after
            })
          : foreignPr(opts.pr)
      })),
      mergeSquash: vi.fn(async () => {
        merged = true;
        return { state: 'ok', data: true };
      }),
      updateBranch: vi.fn(async () => ({ state: 'ok', data: 'b'.repeat(40) })),
      closePr: vi.fn(async () => ({ state: 'ok', data: true }))
    };
    const gh = {
      prDetail: vi.fn(async () => ({
        state: 'error',
        reason: 'workspace_read'
      })),
      mergeSquash: vi.fn(async () => ({ state: 'error', reason: 'workspace' })),
      updateBranch: vi.fn(async () => ({
        state: 'error',
        reason: 'workspace'
      })),
      closePr: vi.fn(async () => ({ state: 'error', reason: 'workspace' })),
      forSlug: vi.fn(() => foreign)
    };
    const bd = {
      setStatus: vi.fn(async (/** @type {string} */ _id, s) => {
        status = s;
      }),
      readStatus: vi.fn(async () => status),
      unsetMetadata: vi.fn(async () => {}),
      readMetadata: vi.fn(
        async (/** @type {string} */ _id, /** @type {string} */ key) =>
          metadata[key] ?? null
      ),
      readIssue: vi.fn(async (/** @type {string} */ id) => ({
        id,
        status,
        spec_id: null,
        metadata
      }))
    };
    const gitRun = vi.fn(async (/** @type {string[]} */ args, options) => {
      calls.push(`git:${options?.cwd}:${args.join(' ')}`);
      const ok = (/** @type {string} */ stdout = '') => ({
        code: 0,
        stdout,
        stderr: ''
      });
      if (args[0] === 'rev-parse' && args[1] === '--show-toplevel') {
        return ok(`${TARGET_PATH}\n`);
      }
      if (args[0] === 'remote' && args.length === 1) {
        return ok('upstream\n');
      }
      if (args[0] === 'remote' && args[1] === 'get-url') {
        return ok('git@github.com:acme/research-repo-template.git\n');
      }
      if (args[0] === 'rev-parse' && String(args[1]).endsWith('^1')) {
        return ok(`${PARENT}\n`);
      }
      if (args[0] === 'rev-parse' && args[1] === '--verify') {
        return { code: 1, stdout: '', stderr: '' };
      }
      if (
        args[0] === 'rev-parse' &&
        String(args[1]).startsWith('refs/remotes/') &&
        Array.isArray(opts.tips)
      ) {
        const tip = opts.tips[Math.min(tip_reads, opts.tips.length - 1)];
        tip_reads += 1;
        return ok(`${tip}\n`);
      }
      if (args[0] === 'rev-parse') {
        return ok(`${TIP}\n`);
      }
      if (args[0] === 'merge-tree') {
        return ok(`${TREE}\n`);
      }
      if (args[0] === 'ls-tree') {
        return ok(
          opts.post_merge_jobs ? 'repo-ops/post-merge.d/10-sync\n' : ''
        );
      }
      if (args[0] === 'merge-base') {
        return { code: opts.containment ?? 0, stdout: '', stderr: '' };
      }
      if (args[0] === 'ls-remote') {
        return ok(
          opts.remote_head === null
            ? ''
            : `${opts.remote_head ?? HEAD}\trefs/heads/${BEAD}\n`
        );
      }
      return ok();
    });
    const scheduler = {
      reconcileInteractiveSessions: vi.fn(async () => {}),
      resolveConflict: vi.fn(async () => ({ ok: true, attempt_id: 'r1' })),
      dispatchExternalConflict: vi.fn(async () => ({
        ok: true,
        attempt_id: 'x1'
      })),
      tick: vi.fn(async () => {})
    };
    const repoOperations = {
      ensureVerify: vi.fn(async () => ({
        ok: true,
        operation_id: 'verify-op',
        timeout_ms: 1000
      })),
      waitForTerminal: vi.fn(async () => opts.verify_receipt ?? null),
      verifyReceipt: vi.fn(() => opts.verify_receipt ?? null),
      hasConfig: vi.fn(async () => ({ ok: true, present: false })),
      ensureDeploy: vi.fn(async () => ({ ok: true, inert: true })),
      waitForDeployTerminal: vi.fn(),
      findExactDeployOperation: vi.fn(async () => null),
      deploymentEvidence: vi.fn(),
      sweepForeignCandidates: vi.fn(async () => [])
    };
    const worktree = {
      pathFor: (/** @type {string} */ repo, /** @type {string} */ name) =>
        `${repo}/.worktrees/${name}`,
      remove: vi.fn(),
      removeByBranch: vi.fn(),
      removeCompleted: vi.fn(),
      removeIfDiscardable: vi.fn(async () => ({
        ok: true,
        removed: true,
        reason: null
      })),
      withTopologyLock: vi.fn(
        async (/** @type {string} */ _repo, /** @type {any} */ fn) => fn()
      )
    };
    const announce = vi.fn();
    const actions = createPrActions({
      workspace: WS,
      repo: REPO,
      store,
      gh,
      observations,
      bd,
      worktree: /** @type {any} */ (worktree),
      gitRun,
      scheduler,
      resolveBase: async () => {
        throw new Error('workspace base resolution must not run');
      },
      repoOperations: /** @type {any} */ (repoOperations),
      requeryDelayMs: 0,
      sleep: async () => {},
      announceForeignHandoff: announce,
      resolveRepoOps: async (/** @type {{ sha: string }} */ input) =>
        opts.policy
          ? opts.policy(input.sha)
          : { base: 'main', verify: null, deploy: null, config_blob_sha: null }
    });
    return {
      actions,
      store,
      gh,
      foreign,
      bd,
      calls,
      scheduler,
      repoOperations,
      worktree,
      announce,
      observations,
      status: () => status
    };
  }

  test('blocks a conflicting PR as foreign_conflict_needs_human', async () => {
    const h = makeForeign({
      pr: { mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' }
    });

    const probe = await h.actions.probeMergeability(BEAD);

    expect(probe).toMatchObject({
      ok: false,
      kind: 'blocked',
      reason: 'foreign_handoff:foreign_conflict_needs_human',
      head_sha: HEAD
    });
  });

  test('never dispatches a resolver for a conflicting foreign PR', async () => {
    const h = makeForeign({
      pr: { mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' }
    });

    const clicked = await h.actions.merge(BEAD);
    const dispatched = await h.actions.dispatchConflict(BEAD, {
      head_sha: HEAD,
      base_ref: 'main'
    });

    expect(clicked.reason).toBe('foreign_handoff:foreign_conflict_needs_human');
    expect(dispatched.action).toBe('refused');
    expect(h.scheduler.resolveConflict).not.toHaveBeenCalled();
    expect(h.scheduler.dispatchExternalConflict).not.toHaveBeenCalled();
    expect(h.foreign.mergeSquash).not.toHaveBeenCalled();
  });

  test('refuses a PR whose base is not foreign_base without retargeting', async () => {
    const h = makeForeign({ pr: { base_ref: 'develop' } });

    const r = await h.actions.merge(BEAD);

    expect(r.reason).toBe('foreign_handoff:foreign_pr_base_mismatch');
    expect(h.foreign.mergeSquash).not.toHaveBeenCalled();
  });

  test('refuses a PR whose fetched base tip declares [deploy] before merging', async () => {
    const h = makeForeign({
      policy: () => ({
        base: 'main',
        verify: null,
        deploy: { script: 'repo-ops/script/deploy' },
        config_blob_sha: 'c'.repeat(40)
      })
    });

    const r = await h.actions.merge(BEAD);

    expect(r.reason).toBe('foreign_handoff:foreign_deploy_unsupported');
    expect(h.foreign.mergeSquash).not.toHaveBeenCalled();
  });

  test('announces the handoff it refused with', async () => {
    const h = makeForeign({ pr: { base_ref: 'develop' } });

    await h.actions.merge(BEAD);

    expect(h.announce).toHaveBeenCalledWith(
      expect.objectContaining({
        bead_id: BEAD,
        cause: 'foreign_pr_base_mismatch',
        foreign_path: TARGET_PATH
      })
    );
  });

  test('keeps a manual [머지] authority from releasing a handoff', async () => {
    const h = makeForeign({
      pr: { mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' }
    });
    h.store.enqueueMergeManual(WS, {
      expected_revision: h.store.snapshot(WS).revision,
      entries: [
        { bead_id: BEAD, head_sha: HEAD, target_base: 'main', external: false }
      ]
    });

    const r = await h.actions.merge(BEAD);

    expect(r.reason).toBe('foreign_handoff:foreign_conflict_needs_human');
    expect(h.foreign.mergeSquash).not.toHaveBeenCalled();
  });

  test('merges through the pinned slug pinned to the gated head', async () => {
    const h = makeForeign();

    await h.actions.merge(BEAD);

    expect(h.gh.forSlug).toHaveBeenCalledWith(SLUG);
    expect(h.foreign.mergeSquash).toHaveBeenCalledWith(REPO, 304, HEAD);
  });

  test('never reads or changes the workspace PR of the same number', async () => {
    const h = makeForeign();

    await h.actions.merge(BEAD);

    expect(h.gh.prDetail).not.toHaveBeenCalled();
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
  });

  test('closes the bead after proving the merge in the target base', async () => {
    const h = makeForeign();

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, action: 'merged' });
    expect(h.calls).toContain(
      `git:${TARGET_PATH}:merge-base --is-ancestor ${MERGE} ${TIP}`
    );
    expect(h.status()).toBe('closed');
    expect(h.store.snapshot(WS).pr_wait).toEqual([]);
  });

  test('closes a PR merged directly on GitHub through the same tail', async () => {
    const h = makeForeign({
      pr: { state: 'MERGED', merged_sha: MERGE, merge_sha: MERGE }
    });

    const r = await h.actions.cleanupObservedMerge(BEAD, MERGE, {
      pr_url: FOREIGN_URL
    });

    expect(r.ok).toBe(true);
    expect(h.status()).toBe('closed');
  });

  test('runs no cleanup of a PR merged on GitHub while the bead is deferred (UI-0d9i §3.4)', async () => {
    const h = makeForeign({
      pr: { state: 'MERGED', merged_sha: MERGE, merge_sha: MERGE }
    });
    await h.bd.setStatus(BEAD, 'deferred');

    const r = await h.actions.cleanupObservedMerge(BEAD, MERGE, {
      pr_url: FOREIGN_URL
    });

    expect(r).toMatchObject({ ok: false, reason: 'bead_deferred' });
    expect(h.status()).toBe('deferred');
    expect(
      h.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('keeps the bead resolved when the target base does not contain the merge', async () => {
    const h = makeForeign({
      pr: { state: 'MERGED', merged_sha: MERGE, merge_sha: MERGE },
      containment: 1
    });

    const r = await h.actions.cleanupObservedMerge(BEAD, MERGE, {
      pr_url: FOREIGN_URL
    });

    expect(r).toMatchObject({
      ok: false,
      step: 'base_containment',
      reason: 'deployment_target_not_covering_merge'
    });
    expect(h.status()).toBe('resolved');
  });

  test('hands a merge whose first parent declares [deploy] to a person', async () => {
    const h = makeForeign({
      pr: { state: 'MERGED', merged_sha: MERGE, merge_sha: MERGE },
      policy: (sha) =>
        sha === PARENT
          ? {
              base: 'main',
              verify: null,
              deploy: { script: 'repo-ops/script/deploy' },
              config_blob_sha: 'c'.repeat(40)
            }
          : { base: 'main', verify: null, deploy: null, config_blob_sha: null }
    });

    const r = await h.actions.cleanupObservedMerge(BEAD, MERGE, {
      pr_url: FOREIGN_URL
    });

    expect(r).toMatchObject({
      ok: false,
      step: 'repo_operations',
      reason: 'foreign_handoff:foreign_deploy_unsupported'
    });
    expect(h.status()).toBe('resolved');
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]?.reason).toBe(
      'foreign_handoff:foreign_deploy_unsupported'
    );
  });

  test('records the post-merge handoff before announcing it', async () => {
    const h = makeForeign({
      pr: { state: 'MERGED', merged_sha: MERGE, merge_sha: MERGE },
      policy: (sha) =>
        sha === PARENT
          ? {
              base: 'main',
              verify: null,
              deploy: { script: 'repo-ops/script/deploy' },
              config_blob_sha: 'c'.repeat(40)
            }
          : { base: 'main', verify: null, deploy: null, config_blob_sha: null }
    });
    /** @type {Array<string|null>} */
    const seen = [];
    h.announce.mockImplementation(() => {
      seen.push(h.store.snapshot(WS).cleanup_failed[BEAD]?.reason ?? null);
    });

    await h.actions.cleanupObservedMerge(BEAD, MERGE, { pr_url: FOREIGN_URL });

    expect(seen).toEqual(['foreign_handoff:foreign_deploy_unsupported']);
  });

  test('runs the first-parent [verify] bound to PR head and first parent before closing', async () => {
    const h = makeForeign({
      pr: { state: 'MERGED', merged_sha: MERGE, merge_sha: MERGE },
      policy: (sha) => ({
        base: 'main',
        verify: sha === PARENT ? { script: 'repo-ops/script/verify' } : null,
        deploy: null,
        config_blob_sha: 'c'.repeat(40)
      }),
      verify_receipt: { state: 'succeeded', ok: true, head_sha: HEAD }
    });
    h.observations.record(WS, BEAD, {
      error: null,
      pr: /** @type {any} */ (foreignPr({ state: 'MERGED', merge_sha: MERGE }))
    });

    await h.actions.cleanupObservedMerge(BEAD, MERGE, { pr_url: FOREIGN_URL });

    expect(h.repoOperations.ensureVerify).toHaveBeenCalledWith(
      expect.objectContaining({
        repo: TARGET_PATH,
        origin: 'upstream',
        base_sha: PARENT,
        head_sha: HEAD,
        final_sha: MERGE
      })
    );
    expect(h.status()).toBe('closed');
  });

  test('removes only the owned remote head branch that still points at the head', async () => {
    const h = makeForeign({
      pr: { state: 'MERGED', merged_sha: MERGE, merge_sha: MERGE }
    });
    h.observations.record(WS, BEAD, {
      error: null,
      pr: /** @type {any} */ (foreignPr({ state: 'MERGED', merge_sha: MERGE }))
    });

    await h.actions.cleanupObservedMerge(BEAD, MERGE, { pr_url: FOREIGN_URL });

    expect(h.calls).toContain(
      `git:${TARGET_PATH}:push --force-with-lease=refs/heads/${BEAD}:${HEAD} upstream --delete ${BEAD}`
    );
    expect(h.calls.some((call) => call.includes('push origin'))).toBe(false);
  });

  test('keeps a remote head branch that moved past the pinned head and still closes', async () => {
    const h = makeForeign({
      pr: { state: 'MERGED', merged_sha: MERGE, merge_sha: MERGE },
      remote_head: '5'.repeat(40)
    });
    h.observations.record(WS, BEAD, {
      error: null,
      pr: /** @type {any} */ (foreignPr({ state: 'MERGED', merge_sha: MERGE }))
    });

    await h.actions.cleanupObservedMerge(BEAD, MERGE, { pr_url: FOREIGN_URL });

    expect(h.calls.some((call) => call.includes('--delete'))).toBe(false);
    expect(h.status()).toBe('closed');
  });

  test('never runs the target post-merge jobs', async () => {
    const h = makeForeign({
      pr: { state: 'MERGED', merged_sha: MERGE, merge_sha: MERGE }
    });

    await h.actions.cleanupObservedMerge(BEAD, MERGE, { pr_url: FOREIGN_URL });

    expect(
      h.calls.filter((call) => call.includes('repo-ops/post-merge.d/'))
    ).toEqual([
      `git:${TARGET_PATH}:ls-tree -r --name-only ${MERGE} -- repo-ops/post-merge.d/`
    ]);
  });

  test('runs the target [verify] in the pinned checkout bound to head and base tip', async () => {
    const receipt = {
      state: 'succeeded',
      ok: true,
      reason: 'ok',
      head_sha: HEAD,
      effective_base_sha: TIP,
      candidate_tree_sha: TREE,
      script_object_type: 'blob',
      script_mode: '100755',
      script_blob_sha: '4'.repeat(40)
    };
    const h = makeForeign({
      policy: () => ({
        base: 'main',
        verify: { script: 'repo-ops/script/verify' },
        deploy: null,
        config_blob_sha: 'c'.repeat(40)
      }),
      verify_receipt: receipt
    });

    const r = await h.actions.merge(BEAD);

    expect(h.repoOperations.ensureVerify).toHaveBeenCalledWith(
      expect.objectContaining({
        repo: TARGET_PATH,
        origin: 'upstream',
        target_base: 'main',
        base_sha: TIP,
        head_sha: HEAD,
        foreign: expect.objectContaining({ slug: SLUG })
      })
    );
    expect(r.action).toBe('merged');
  });

  test('refuses the merge when the base tip moved after the verify', async () => {
    const h = makeForeign({
      policy: () => ({
        base: 'main',
        verify: { script: 'repo-ops/script/verify' },
        deploy: null,
        config_blob_sha: 'c'.repeat(40)
      }),
      verify_receipt: {
        state: 'succeeded',
        ok: true,
        reason: 'ok',
        head_sha: HEAD,
        effective_base_sha: TIP,
        candidate_tree_sha: TREE,
        script_object_type: 'blob',
        script_mode: '100755',
        script_blob_sha: '4'.repeat(40)
      },
      tips: [TIP, '8'.repeat(40)]
    });

    const r = await h.actions.merge(BEAD);

    expect(r.reason).toBe('verify_candidate_stale');
    expect(h.foreign.mergeSquash).not.toHaveBeenCalled();
  });

  /**
   * Enrol the foreign row the way the auto-merge enroller does with the
   * global switch on: a completion-owned queue entry.
   *
   * @param {ReturnType<typeof makeForeign>} h
   */
  function enrolAuto(h) {
    h.store.toggleAutoMerge(WS, {
      expected_revision: h.store.snapshot(WS).revision,
      on: true
    });
    h.store.enqueueMergeAuto(WS, {
      entries: [
        {
          bead_id: BEAD,
          external: false,
          head_sha: HEAD,
          completion: {
            source_attempt_id: 'a1',
            target_base: 'main',
            subject: {
              role: 'root',
              bead_id: BEAD,
              pr_url: FOREIGN_URL,
              head_sha: HEAD,
              base_sha: 'b'.repeat(40),
              merged_sha: null
            }
          }
        }
      ],
      present_ids: [BEAD]
    });
  }

  /**
   * Run the completion driver's own decisions until the intent leaves
   * `gating` (or nothing more is decided).
   *
   * @param {ReturnType<typeof makeForeign>} h
   * @param {ReturnType<typeof createCompletionActionDriver>} driver
   */
  async function driveCompletion(h, driver) {
    for (let round = 0; round < 5; round++) {
      const intent = h.store.snapshot(WS).completion_intents[BEAD];
      if (!intent || intent.phase !== 'gating') {
        return;
      }
      const fact = await driver.observe(BEAD, intent);
      const action = decideCompletionAction({
        auto_merge: true,
        intent,
        fact,
        now: 0
      });
      if (!action) {
        return;
      }
      await driver.onAction(BEAD, action, intent);
    }
  }

  test('gates a pinned foreign PR for the completion saga against foreign_base', async () => {
    const h = makeForeign();

    const gated = await h.actions.completionGate(BEAD);

    expect(gated).toMatchObject({
      ok: true,
      target_base: 'main',
      base_sha: TIP,
      subject: { pr_url: FOREIGN_URL, head_sha: HEAD, base_sha: TIP }
    });
  });

  test('merges an auto-enrolled pinned foreign PR through the queue with the pinned slug', async () => {
    const h = makeForeign();
    enrolAuto(h);
    const driver = createCompletionActionDriver({
      workspace: WS,
      store: h.store,
      prActions: h.actions
    });
    await driveCompletion(h, driver);
    const mq = createMergeQueue({
      workspace: WS,
      store: h.store,
      merge: (/** @type {string} */ id) => h.actions.merge(id),
      probeMergeability: (/** @type {string} */ id) =>
        h.actions.probeMergeability(id),
      observePr: (/** @type {string} */ id) => h.actions.prState(id),
      headSha: () => HEAD,
      onCompletionResult: (root, subject, result) =>
        driver.onMergeResult(root, subject, result)
    });

    await mq.kick();

    expect(h.gh.forSlug).toHaveBeenCalledWith(SLUG);
    expect(h.foreign.mergeSquash).toHaveBeenCalledWith(REPO, 304, HEAD);
    expect(h.gh.mergeSquash).not.toHaveBeenCalled();
    expect(h.status()).toBe('closed');
    expect(h.store.snapshot(WS).completion_intents[BEAD]?.phase).not.toBe(
      'needs_human'
    );
  });

  test('holds a pinned foreign PR whose target [verify] failed as pre_merge_hold', async () => {
    const h = makeForeign({
      policy: () => ({
        base: 'main',
        verify: { script: 'repo-ops/script/verify' },
        deploy: null,
        config_blob_sha: 'c'.repeat(40)
      }),
      verify_receipt: {
        state: 'failed',
        ok: false,
        reason: 'verify_cmd_failed',
        head_sha: HEAD,
        effective_base_sha: TIP,
        candidate_tree_sha: TREE,
        script_object_type: 'blob',
        script_mode: '100755',
        script_blob_sha: '4'.repeat(40),
        output_tail: 'boom'
      }
    });
    enrolAuto(h);
    const driver = createCompletionActionDriver({
      workspace: WS,
      store: h.store,
      prActions: h.actions
    });

    await driveCompletion(h, driver);

    const intent = h.store.snapshot(WS).completion_intents[BEAD];
    expect(intent.phase).toBe('holding');
    expect(intent.hold).toMatchObject({
      class: 'pre_merge_hold',
      cause: 'verify_failure',
      head_sha: HEAD,
      base_sha: TIP
    });
    expect(h.foreign.mergeSquash).not.toHaveBeenCalled();
  });

  test('stops an auto-enrolled saga on a foreign handoff without merging', async () => {
    const h = makeForeign({ pr: { base_ref: 'develop' } });
    enrolAuto(h);
    const driver = createCompletionActionDriver({
      workspace: WS,
      store: h.store,
      prActions: h.actions
    });

    await driveCompletion(h, driver);

    const after = h.store.snapshot(WS);
    const intent = /** @type {any} */ (after.completion_intents[BEAD]);
    expect(intent.phase).toBe('needs_human');
    expect(intent.terminal_reason.reason).toContain(
      'foreign_handoff:foreign_pr_base_mismatch'
    );
    expect(after.merge_queue).toEqual([]);
    expect(h.announce).toHaveBeenCalledTimes(1);
    expect(h.foreign.mergeSquash).not.toHaveBeenCalled();
  });

  test('refuses a merge before any gh call when the pins moved to another PR than the attempt records', async () => {
    const h = makeForeign({
      metadata: {
        foreign_repo: 'git@github.com:acme/other.git',
        pr_url: 'https://github.com/acme/other/pull/8'
      }
    });

    const r = await h.actions.merge(BEAD);

    expect(r.reason).toBe('foreign_pr_ref_mismatch');
    expect(h.gh.forSlug).not.toHaveBeenCalled();
    expect(h.gh.prDetail).not.toHaveBeenCalled();
    expect(h.foreign.mergeSquash).not.toHaveBeenCalled();
  });

  test('aligns a behind base through the pinned slug', async () => {
    const h = makeForeign();

    const r = await h.actions.updateBase(BEAD);

    expect(r.ok).toBe(true);
    expect(h.foreign.updateBranch).toHaveBeenCalledWith(REPO, 304);
    expect(h.gh.updateBranch).not.toHaveBeenCalled();
  });
});

describe('cleanup retry reruns the failed repo operation (UI-btsr §3.1–§3.3)', () => {
  const MERGED = 'c'.repeat(40);
  const PREVIOUS = 'e'.repeat(40);
  const PR_HEAD = '9'.repeat(40);
  const DEPLOY_ONLY =
    '[deploy]\nscript = "repo-ops/script/deploy"\ntimeout_ms = 1000';
  const VERIFY_ONLY = '[verify]\nscript = "repo-ops/script/verify"';

  /**
   * The one repo-ops declaration every SHA of this repository carries, read
   * by the real coordinator through the harness git.
   *
   * @param {string} config
   * @returns {(args: string[]) => string|undefined}
   */
  function declaring(config) {
    return (args) => {
      if (
        args[0] === 'show' &&
        String(args[1]).endsWith(':repo-ops/config.toml')
      ) {
        return config;
      }
      if (args[0] !== 'ls-tree') {
        return undefined;
      }
      const requested = args.at(-1);
      if (requested === 'repo-ops/config.toml') {
        return `100644 blob ${'4'.repeat(40)}\trepo-ops/config.toml`;
      }
      if (requested === 'repo-ops/script/deploy') {
        return `100755 blob ${'5'.repeat(40)}\trepo-ops/script/deploy`;
      }
      if (requested === 'repo-ops/script/verify') {
        return `100755 blob ${'6'.repeat(40)}\trepo-ops/script/verify`;
      }
      return undefined;
    };
  }

  /**
   * The previous successful deploy, so the automatic run reads its policy
   * from a declared base. Its target does not contain the merge: only a new
   * run can deliver it.
   *
   * @param {any} store
   * @param {string} repo
   */
  function seedPreviousDeploy(store, repo) {
    store.ensureRepoOperation(WS, {
      operation_id: 'previous-deploy',
      repo_id: repo,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-0', merged_sha: PREVIOUS }],
      effective_base_sha: PREVIOUS,
      target_base: 'main',
      script_path: 'repo-ops/script/deploy',
      script_mode: '100755',
      script_blob_sha: '5'.repeat(40)
    });
    const seeded = store.snapshot(WS).repo_operations['previous-deploy'];
    store.startRepoOperation(WS, {
      operation_id: 'previous-deploy',
      attempt_id: seeded.attempt_id,
      process_identity: { pid: 9, pgid: 9, started_at: 1 },
      log_path: path.join(tmp_state, 'previous.log'),
      target_sha: PREVIOUS
    });
    store.settleRepoOperation(WS, {
      operation_id: 'previous-deploy',
      attempt_id: seeded.attempt_id,
      exit_code: 0,
      signal: null
    });
  }

  /**
   * The runner, marker and deploy worktree HEAD shared across a restart: the
   * script and the shared worktree outlive the Worker process.
   */
  function processWorld() {
    return {
      start: vi.fn(() => ({
        ok: true,
        process_identity: { pid: 1, pgid: 1, started_at: 1 },
        log_path: path.join(tmp_state, 'operation.log')
      })),
      /** @type {{ current: { exit_code: number, signal: null }|null }} */
      marker: { current: null },
      deploy: { head: /** @type {string|null} */ (null) }
    };
  }

  /**
   * The cleanup actions over a REAL coordinator and queue store, so the
   * retry's identity, chain and launch are the production code. The base tip
   * (`origin/main`) and the deploy worktree HEAD both sit at `BASE_SHA` once
   * the first run aligned it.
   *
   * @param {{ store: any, config: string, world: ReturnType<typeof processWorld>, repo?: string, gitResult?: (args: string[]) => number|null }} input
   */
  function cleanupRig(input) {
    /** @type {any} */
    let git = null;
    let clock = 0;
    const repo = input.repo ?? REPO;
    const world = input.world;
    const materialize = vi.fn(async () => ({
      ok: true,
      path: tmp_state,
      tree_sha: '7'.repeat(40)
    }));
    const coordinator = createRepoOperationCoordinator({
      workspace: WS,
      repo,
      store: input.store,
      locks: createLockManager(),
      gitRun: (args, options) => git(args, options),
      runner: /** @type {never} */ ({
        start: world.start,
        readMarker: () => world.marker.current,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }),
      transition: /** @type {never} */ ({
        materialize: async () => ({
          ok: true,
          path: path.join(tmp_state, 'script')
        }),
        reclaim: () => {}
      }),
      deployWorktree: /** @type {never} */ ({
        bindTarget: async () => ({ ok: true, target_sha: BASE_SHA }),
        readState: async () => ({
          ok: true,
          head: world.deploy.head,
          clean: true
        }),
        ensureAligned: async (/** @type {any} */ aligned) => {
          world.deploy.head = aligned.target_sha;
          return {
            ok: true,
            path: path.join(tmp_state, 'deploy'),
            target_sha: aligned.target_sha
          };
        },
        verifyCovered: async () => ({ ok: true })
      }),
      deployLock: /** @type {never} */ (
        async () => ({ ok: true, release: async () => {} })
      ),
      verifyCheckout: /** @type {never} */ ({
        materialize,
        verify: async () => ({ ok: true }),
        cleanup: async () => {}
      }),
      now: () => clock,
      sleep: async (ms) => {
        clock += ms;
      }
    });
    const env = makeActions({
      ...ON_BASE,
      store: input.store,
      repo,
      repoOperations: coordinator,
      details: [
        prOf({ state: 'MERGED', merged_sha: MERGED, head_sha: PR_HEAD })
      ],
      gitStdout: declaring(input.config),
      // The previous deploy's target does not contain the merge.
      gitResult: (args) =>
        input.gitResult?.(args) ??
        (args[0] === 'merge-base' && args[2] === MERGED && args[3] === PREVIOUS
          ? 1
          : null)
    });
    git = env.gitRun;
    return { env, coordinator, materialize };
  }

  /**
   * A row whose cleanup stopped at a deploy that failed after its alignment
   * left the deploy worktree HEAD at the target.
   */
  async function deployFailedRow() {
    const world = processWorld();
    const store = seedStore({
      cleanup_failed: {
        [BEAD]: { step: 'repo_operations', reason: 'script_failed' }
      }
    });
    seedPreviousDeploy(store, REPO);
    const rig = cleanupRig({ store, config: DEPLOY_ONLY, world });
    world.start.mockReturnValueOnce(
      /** @type {any} */ ({ ok: false, code: 'repo_operation_spawn_failed' })
    );
    await rig.env.actions.retryCleanup(BEAD);
    return { world, store, rig };
  }

  test('reruns the failed deploy once on a human retry and closes the bead', async () => {
    const { world, store, rig } = await deployFailedRow();
    world.marker.current = { exit_code: 0, signal: null };

    const result = await rig.env.actions.retryCleanup(BEAD);

    expect(result).toMatchObject({ ok: true, step: null });
    expect(world.start).toHaveBeenCalledTimes(2);
    expect(store.snapshot(WS).done).toContainEqual(
      expect.objectContaining({ bead_id: BEAD })
    );
  });

  test('clears the cleanup failure and keeps the cursor at repo_operations once the retry is prerecorded', async () => {
    const { store, rig } = await deployFailedRow();

    await rig.env.actions.retryCleanup(BEAD);

    const queue = store.snapshot(WS);
    expect(queue.cleanup_failed[BEAD]).toBeUndefined();
    expect(queue.pr_wait[0]).toMatchObject({
      bead_id: BEAD,
      cleanup_cursor: 'repo_operations'
    });
  });

  test('drops the stop record before the retry deploy run is spawned', async () => {
    const { world, store, rig } = await deployFailedRow();
    /** @type {unknown} */
    let stop_at_spawn = 'not spawned';
    world.start.mockImplementation(() => {
      stop_at_spawn = store.snapshot(WS).cleanup_failed[BEAD] ?? null;
      return {
        ok: true,
        process_identity: { pid: 1, pgid: 1, started_at: 1 },
        log_path: path.join(tmp_state, 'operation.log')
      };
    });

    await rig.env.actions.retryCleanup(BEAD);

    expect(stop_at_spawn).toBeNull();
  });

  test('drops the stop record before the retry verify run is spawned', async () => {
    const world = processWorld();
    const store = seedStore({
      cleanup_failed: {
        [BEAD]: { step: 'repo_operations', reason: 'script_failed' }
      }
    });
    const rig = cleanupRig({
      store,
      config: VERIFY_ONLY,
      world,
      repo: tmp_state
    });
    rig.env.observations.record(WS, BEAD, {
      error: null,
      pr: prOf({ state: 'MERGED', merged_sha: MERGED, head_sha: PR_HEAD })
    });
    world.start.mockReturnValueOnce(
      /** @type {any} */ ({ ok: false, code: 'repo_operation_spawn_failed' })
    );
    await rig.env.actions.retryCleanup(BEAD);
    /** @type {unknown} */
    let stop_at_spawn = 'not spawned';
    world.start.mockImplementation(() => {
      stop_at_spawn = store.snapshot(WS).cleanup_failed[BEAD] ?? null;
      return {
        ok: true,
        process_identity: { pid: 1, pgid: 1, started_at: 1 },
        log_path: path.join(tmp_state, 'operation.log')
      };
    });
    world.marker.current = { exit_code: 0, signal: null };

    await rig.env.actions.retryCleanup(BEAD);

    expect(stop_at_spawn).toBeNull();
  });

  test('waits on the running retry after a restart instead of recording the old failure', async () => {
    const { world, rig } = await deployFailedRow();
    await rig.env.actions.retryCleanup(BEAD);
    const restarted_store = createQueueStore();
    const restarted = cleanupRig({
      store: restarted_store,
      config: DEPLOY_ONLY,
      world
    });
    world.marker.current = { exit_code: 0, signal: null };

    await restarted.env.actions.resumeRepoOperations();

    const queue = restarted_store.snapshot(WS);
    expect(queue.cleanup_failed[BEAD]).toBeUndefined();
    expect(queue.done).toContainEqual(
      expect.objectContaining({ bead_id: BEAD })
    );
  });

  test('reruns a failed post-merge verify with its stored PR head after a restart and closes the bead', async () => {
    const world = processWorld();
    const store = seedStore({
      cleanup_failed: {
        [BEAD]: { step: 'repo_operations', reason: 'script_failed' }
      }
    });
    const first = cleanupRig({
      store,
      config: VERIFY_ONLY,
      world,
      repo: tmp_state
    });
    first.env.observations.record(WS, BEAD, {
      error: null,
      pr: prOf({ state: 'MERGED', merged_sha: MERGED, head_sha: PR_HEAD })
    });
    world.start.mockReturnValueOnce(
      /** @type {any} */ ({ ok: false, code: 'repo_operation_spawn_failed' })
    );
    await first.env.actions.retryCleanup(BEAD);
    const restarted_store = createQueueStore();
    const restarted = cleanupRig({
      store: restarted_store,
      config: VERIFY_ONLY,
      world,
      repo: tmp_state
    });
    world.marker.current = { exit_code: 0, signal: null };

    const result = await restarted.env.actions.retryCleanup(BEAD);

    expect(result).toMatchObject({ ok: true, step: null });
    expect(world.start).toHaveBeenCalledTimes(2);
    expect(restarted_store.snapshot(WS).done).toContainEqual(
      expect.objectContaining({ bead_id: BEAD })
    );
  });

  test('waits on a running verify retry after a restart and then goes on to the deploy step', async () => {
    const world = processWorld();
    const store = seedStore({
      cleanup_failed: {
        [BEAD]: { step: 'repo_operations', reason: 'script_failed' }
      }
    });
    const first = cleanupRig({
      store,
      config: VERIFY_ONLY,
      world,
      repo: tmp_state
    });
    first.env.observations.record(WS, BEAD, {
      error: null,
      pr: prOf({ state: 'MERGED', merged_sha: MERGED, head_sha: PR_HEAD })
    });
    world.start.mockReturnValueOnce(
      /** @type {any} */ ({ ok: false, code: 'repo_operation_spawn_failed' })
    );
    await first.env.actions.retryCleanup(BEAD);
    // The retry recorded its verify run and the server died before it ended.
    const retry = await first.coordinator.ensureVerify({
      repo: tmp_state,
      origin: 'origin',
      target_base: 'main',
      base_sha: 'a'.repeat(40),
      head_sha: PR_HEAD,
      final_sha: MERGED,
      bead_id: BEAD,
      pr_number: 304,
      script_path: 'repo-ops/script/verify',
      retry_chain: true,
      retry_authorized: true,
      on_retry_recorded: () => store.clearCleanupFailure(WS, BEAD)
    });
    const restarted_store = createQueueStore();
    const restarted = cleanupRig({
      store: restarted_store,
      config: VERIFY_ONLY,
      world,
      repo: tmp_state,
      // The base fetch is down for as long as that verify has not settled:
      // replaying the cleanup in front of it would stop the row.
      gitResult: (args) =>
        args[0] === 'fetch' &&
        restarted_store.snapshot(WS).repo_operations[String(retry.operation_id)]
          ?.state !== 'succeeded'
          ? 1
          : null
    });
    world.marker.current = { exit_code: 0, signal: null };

    await restarted.env.actions.resumeRepoOperations();

    const queue = restarted_store.snapshot(WS);
    expect(queue.cleanup_failed[BEAD]).toBeUndefined();
    expect(queue.done).toContainEqual(
      expect.objectContaining({ bead_id: BEAD })
    );
    expect(restarted.materialize).not.toHaveBeenCalled();
    expect(world.start).toHaveBeenCalledTimes(2);
  });

  test.each([
    ['boot resume', 'resume'],
    ['the first cleanup run', 'merge']
  ])('passes no retry authority from %s', async (_name, entry) => {
    const operations = {
      hasConfig: vi.fn(async () => ({
        ok: true,
        present: true,
        verify_script_path: null
      })),
      ensureVerify: vi.fn(async () => ({ ok: true, inert: true })),
      ensureDeploy: vi.fn(async () => ({ ok: true, inert: true })),
      waitForTerminal: vi.fn(),
      waitForDeployTerminal: vi.fn(async () => ({ state: 'succeeded' })),
      verifyReceipt: vi.fn(),
      findExactDeployOperation: vi.fn(async () => null),
      deploymentEvidence: vi.fn(async () => ({ state: 'succeeded' }))
    };
    const env = makeActions({
      ...ON_BASE,
      repoOperations: operations,
      details: [prOf({ head_sha: 'a'.repeat(40) })]
    });
    if (entry === 'resume') {
      env.store.setCleanupCursor(WS, {
        bead_id: BEAD,
        cursor: 'base_containment',
        merge_sha: MERGED,
        head_ref: BEAD,
        pr_url: 'https://github.com/o/r/pull/304'
      });
      env.store.setCleanupCursor(WS, {
        bead_id: BEAD,
        cursor: 'repo_operations'
      });
    }

    if (entry === 'resume') {
      await env.actions.resumeRepoOperations();
    } else {
      await env.actions.merge(BEAD);
    }

    expect(operations.ensureDeploy).toHaveBeenCalledOnce();
    expect(operations.ensureDeploy.mock.calls[0]).not.toContainEqual(
      expect.objectContaining({ retry_authorized: true })
    );
  });
});
