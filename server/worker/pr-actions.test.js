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
 *   - the [폐기] transition, step by step and in order, its authoritative
 *     click-time re-read, and that the poller cannot publish a discard's own
 *     close as an abandonment.
 */
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createActivityStore } from './activity-store.js';
import { CLEANUP_STEPS, createPrActions } from './pr-actions.js';
import { createPrObservationStore } from './pr-observations.js';
import { createPrPoller } from './pr-poller.js';
import { createQueueStore } from './queue-store.js';
import { deployLogDir } from './state-paths.js';

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
    base_ref: 'main',
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
 *   verify?: { cmd: string[], timeout_ms: number }|null,
 *   verifyResults?: Array<{ ok: boolean, reason: string, detail?: string, output_tail?: string, log_path?: string }>,
 *   deploy?: { cmd: string[], timeout_ms: number, detached: boolean }|null,
 *   verifyResolution?: import('./repo-ops.js').VerifyResolution,
 *   verifyResolutions?: Array<import('./repo-ops.js').VerifyResolution>,
 *   deployResolution?: import('./repo-ops.js').DeployResolution,
 *   selfRepoState?: (repo: string) => 'self'|'other'|'unknown',
 *   deploySpawn?: 'ok'|'fail'|'hang'|'error'|'throw',
 *   deployOutput?: string[],
 *   repo?: string,
 *   gitFail?: (args: string[]) => boolean,
 *   gitBranch?: string,
 *   gitStatus?: string,
 *   gitHead?: string,
 *   children?: Record<string, { id: string, status: string }[]>,
 *   bdFail?: (method: string, id: string) => boolean,
 *   mergeFails?: boolean,
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
 *   labels?: Record<string, string[]>,
 *   dispositions?: Record<string, string>,
 *   shipFail?: (capability: string) => boolean,
 *   shipSilent?: string[],
 *   declaredBase?: string,
 *   resolveBase?: (options?: { force?: boolean }) => Promise<any>,
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
        // The CLICK-TIME guard answer, kept apart from `bd_status` (which
        // models the cleanup's own close/restore readbacks).
        status: (options.bdStatus || {})[id] ?? bd_status.get(id) ?? 'closed',
        labels: [...(bd_labels.get(id) || [])],
        metadata: {
          ...(Object.hasOwn(options, 'bdPrUrl')
            ? { pr_url: options.bdPrUrl ?? undefined }
            : {}),
          ...((options.dispositions || {})[id]
            ? { child_disposition: (options.dispositions || {})[id] }
            : {})
        }
      };
    }),
    ship: vi.fn(async (/** @type {string} */ capability) => {
      calls.push(`bd:ship:${capability}`);
      if (options.shipFail && options.shipFail(capability)) {
        throw new Error('bd ship failed');
      }
      const target =
        [...bd_labels.entries()].find(([, labels]) =>
          labels.includes(`export:${capability}`)
        )?.[0] || null;
      if (target && !(options.shipSilent || []).includes(capability)) {
        bd_labels.set(target, [
          ...(bd_labels.get(target) || []),
          `provides:${capability}`
        ]);
      }
      return { status: 'shipped', issue_id: target };
    }),
    removeLabel: vi.fn(
      async (/** @type {string} */ id, /** @type {string} */ label) => {
        calls.push(`bd:removeLabel:${id}:${label}`);
        bd_labels.set(
          id,
          (bd_labels.get(id) || []).filter((l) => l !== label)
        );
      }
    )
  };
  /** @type {Map<string, string[]>} */
  const bd_labels = new Map(
    Object.entries(options.labels || {}).map(([id, labels]) => [
      id,
      [...labels]
    ])
  );
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

  // The LOCAL checkout the deploy re-validation reads: which branch it is on,
  // whether it is clean, and what HEAD points at. The defaults reproduce the
  // pre-deploy harness (a `feature` checkout), so existing cases are untouched.
  const git_branch = options.gitBranch ?? 'feature';
  const git_status = options.gitStatus ?? '';
  const git_head = options.gitHead ?? 'base-sha-1';

  /** @type {string[][]} */
  const git_argv = [];
  const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
    git_argv.push(args);
    calls.push(`git:${args.slice(0, 2).join(' ')}`);
    if (options.gitFail && options.gitFail(args)) {
      return { code: 1, stdout: '', stderr: 'boom' };
    }
    // git refuses to delete a branch a worktree has checked out; the
    // confirming `rev-parse --verify` then still finds it (the default below).
    if (args[0] === 'branch' && args[1] === '-D' && branchHeld(args[2])) {
      return { code: 1, stdout: '', stderr: 'used by worktree' };
    }
    if (args[0] === 'rev-parse' && args[1] === 'origin/main') {
      return { code: 0, stdout: 'base-sha-1\n', stderr: '' };
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

  // The deploy process, faked at the spawn boundary — nothing here ever starts
  // a real process, in either the synchronous or the detached mode. The child
  // carries real stdout/stderr emitters so the synchronous mode's tail + log
  // capture (UI-l53x §2) runs against scripted output.
  const deploy_spawn_mode = options.deploySpawn || 'ok';
  const deploy_output = options.deployOutput || [];
  const spawnImpl = vi.fn(
    (
      /** @type {string} */ cmd,
      /** @type {string[]} */ _args,
      /** @type {any} */ spawn_options
    ) => {
      calls.push(
        `spawn:${cmd}:${spawn_options && spawn_options.detached === true ? 'detached' : 'sync'}`
      );
      if (deploy_spawn_mode === 'throw') {
        throw new Error('spawn ENOENT');
      }
      const child = /** @type {any} */ (new EventEmitter());
      child.stdout = Object.assign(new EventEmitter(), { setEncoding() {} });
      child.stderr = Object.assign(new EventEmitter(), { setEncoding() {} });
      child.kill = () => {
        child.emit('close', null);
      };
      child.unref = () => {
        calls.push('spawn:unref');
      };
      const emitOutput = () => {
        for (const chunk of deploy_output) {
          child.stdout.emit('data', chunk);
        }
      };
      if (deploy_spawn_mode === 'ok') {
        setTimeout(() => {
          emitOutput();
          child.emit('close', 0);
        }, 0);
      } else if (deploy_spawn_mode === 'fail') {
        setTimeout(() => {
          emitOutput();
          child.emit('close', 1);
        }, 0);
      } else if (deploy_spawn_mode === 'error') {
        setTimeout(() => child.emit('error', new Error('nope')), 0);
      } else {
        // 'hang' prints but never ends — the deadline is what ends it.
        setTimeout(emitOutput, 0);
      }
      return child;
    }
  );

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
    // The two-rung resolvers (UI-kfl4). `verify`/`deploy` stay the shorthand
    // for "this repo resolves THIS command"; `verifyResolution` /
    // `deployResolution` are what the three-state tests override with.
    resolveVerify: async () =>
      // `verifyResolutions` walks one entry per resolution call and holds on the
      // last — how a base that advanced between the click gate and the cleanup
      // is expressed.
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
        : { state: /** @type {const} */ ('absent') }),
    runVerify,
    resolveDeploy: async () =>
      options.deployResolution ??
      (options.deploy
        ? {
            state: /** @type {const} */ ('resolved'),
            source: /** @type {const} */ ('config'),
            value: options.deploy
          }
        : { state: /** @type {const} */ ('absent') }),
    selfRepoState: options.selfRepoState || (() => 'other'),
    spawnImpl: /** @type {any} */ (spawnImpl),
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
    runVerify,
    spawnImpl,
    notify,
    merge_notices
  };
}

/** A configured, synchronous deploy command. */
const DEPLOY_SYNC = {
  cmd: ['bdui-shared', 'restart'],
  timeout_ms: 1000,
  detached: false
};

/** The same command in detached (terminal-launch) mode. */
const DEPLOY_DETACHED = {
  cmd: ['bdui-shared', 'restart'],
  timeout_ms: 1000,
  detached: true
};

/** A verify command, which the deploy step REQUIRES to be resolvable. */
const VERIFY_CFG = {
  cmd: ['npm', 'test'],
  timeout_ms: 1000
};

/**
 * The harness options that put the local checkout in the state the deploy
 * re-validation demands: on the target base, clean, HEAD == the synced base sha.
 *
 * @type {{ gitBranch: string, gitStatus: string, gitHead: string }}
 */
const ON_BASE = {
  gitBranch: 'main',
  gitStatus: '',
  gitHead: 'base-sha-1'
};

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

describe('merge click — click-time SHA re-evaluation (§5/§6)', () => {
  const VERIFY = {
    cmd: ['npm', 'test'],
    timeout_ms: 1000
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
  test('runs base sync → verification → deploy → child sweep → branch cleanup → parent close → done', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_SYNC,
      ...ON_BASE,
      children: {
        [BEAD]: [{ id: 'UI-1.1', status: 'open' }],
        'UI-1.1': [{ id: 'UI-1.1.1', status: 'open' }]
      }
    });

    await h.actions.merge(BEAD);

    // The SEQUENCE, not the end state: every step appears exactly once and in
    // the contract's order, with the deepest child closed before its parent and
    // the parent bead closed LAST (the contract's sweep order — install right
    // after verify, branch/worktree cleanup before the parent close).
    const ordered = h.calls.filter(
      (c) =>
        c === 'gh:mergeSquash' ||
        c === 'git:fetch --no-tags' ||
        c === 'verify:run' ||
        c.startsWith('spawn:bdui-shared') ||
        c.startsWith('bd:setStatus') ||
        c === 'wt:removeByBranch' ||
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
      'spawn:bdui-shared:sync',
      'bd:setStatus:UI-1.1.1:closed',
      'bd:setStatus:UI-1.1:closed',
      'wt:removeByBranch',
      'git:branch -D',
      'git:push origin',
      'bd:setStatus:UI-1:closed'
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
        timeout_ms: 1000
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
    expect(h.worktree.removeByBranch).not.toHaveBeenCalled();
  });

  test('refuses the click outright on an unreadable verify declaration (UI-kfl4 §4.2)', async () => {
    const h = makeActions({
      verifyResolution: {
        state: 'invalid',
        source: 'declaration',
        detail: 'verify:cmd_not_a_nonempty_argv_array'
      }
    });

    const r = await h.actions.merge(BEAD);

    // The gate goes undecidable rather than dropping to the no-signal tier, so
    // nothing merges and no cleanup starts.
    expect(r).toMatchObject({
      ok: false,
      action: 'refused',
      reason: 'verify_config_invalid'
    });
    expect(h.calls).not.toContain('gh:mergeSquash');
  });

  test('fails post_merge_verify when the declaration breaks after the gate passed', async () => {
    const h = makeActions({
      // 1st resolution = the click-time gate (a valid declaration), from the
      // 2nd on = the cleanup, pinned to a base that advanced onto a broken one.
      verifyResolutions: [
        { state: 'resolved', source: 'declaration', value: VERIFY_CFG },
        {
          state: 'invalid',
          source: 'declaration',
          detail: 'verify:cmd_not_a_nonempty_argv_array'
        }
      ]
    });

    const r = await h.actions.merge(BEAD);

    // "We could not tell what to run" must never be recorded as "there was
    // nothing to check", which is the passing branch right next to it.
    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'post_merge_verify',
      reason: 'verify_config_invalid'
    });
    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'post_merge_verify',
      reason: 'verify_config_invalid'
    });
  });

  test('survives a restart: the cleanup failure is reloaded from queue.json', async () => {
    const h = makeActions({
      verify: {
        cmd: ['npm', 'test'],
        timeout_ms: 1000
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

  test('records the verify detail and keeps it across a restart (UI-2o4z §3)', async () => {
    const h = makeActions({
      verify: {
        cmd: ['npm', 'test'],
        timeout_ms: 1000
      },
      verifyResults: [
        { ok: true, reason: 'ok' },
        {
          ok: false,
          reason: 'verify_worktree_failed',
          detail: "fatal: could not lock ref 'refs/heads/x'"
        }
      ]
    });

    await h.actions.merge(BEAD);
    h.store.__clearCacheForTest();

    expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'post_merge_verify',
      reason: 'verify_worktree_failed',
      detail: "fatal: could not lock ref 'refs/heads/x'"
    });
  });

  test('records the verify command output tail on a post-merge failure (UI-qult §1)', async () => {
    const h = makeActions({
      verify: {
        cmd: ['npm', 'test'],
        timeout_ms: 1000
      },
      verifyResults: [
        { ok: true, reason: 'ok' },
        {
          ok: false,
          reason: 'verify_cmd_failed',
          output_tail: 'FAIL test/x.test.js\nrg: command not found'
        }
      ]
    });

    await h.actions.merge(BEAD);
    h.store.__clearCacheForTest();

    expect(h.store.snapshot(WS).cleanup_failed[BEAD].output_tail).toBe(
      'FAIL test/x.test.js\nrg: command not found'
    );
  });

  test('records the full verify log path on a post-merge failure (UI-0x54)', async () => {
    const h = makeActions({
      verify: {
        cmd: ['npm', 'test'],
        timeout_ms: 1000
      },
      verifyResults: [
        { ok: true, reason: 'ok' },
        {
          ok: false,
          reason: 'verify_cmd_failed',
          log_path: '/state/bdui/ws-abc/verify-logs/verify-UI-1-abc1234-17.log'
        }
      ]
    });

    await h.actions.merge(BEAD);
    h.store.__clearCacheForTest();

    expect(h.store.snapshot(WS).cleanup_failed[BEAD].log_path).toBe(
      '/state/bdui/ws-abc/verify-logs/verify-UI-1-abc1234-17.log'
    );
  });

  test('leaves the log path absent when the verification wrote no log', async () => {
    const h = makeActions({
      verify: {
        cmd: ['npm', 'test'],
        timeout_ms: 1000
      },
      verifyResults: [
        { ok: true, reason: 'ok' },
        { ok: false, reason: 'verify_cmd_failed' }
      ]
    });

    await h.actions.merge(BEAD);

    expect(h.store.snapshot(WS).cleanup_failed[BEAD].log_path).toBeUndefined();
  });

  test('leaves the output tail absent when the verification reports none', async () => {
    const h = makeActions({
      verify: {
        cmd: ['npm', 'test'],
        timeout_ms: 1000
      },
      verifyResults: [
        { ok: true, reason: 'ok' },
        { ok: false, reason: 'verify_cmd_failed' }
      ]
    });

    await h.actions.merge(BEAD);

    expect(
      h.store.snapshot(WS).cleanup_failed[BEAD].output_tail
    ).toBeUndefined();
  });

  test('leaves detail null when the failing step reports none', async () => {
    const h = makeActions({ gitFail: (args) => args[0] === 'fetch' });

    await h.actions.merge(BEAD);

    expect(h.store.snapshot(WS).cleanup_failed[BEAD].detail).toBeNull();
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

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'branch_cleanup',
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
    // The parent close is LAST now, so the branch cleanup already ran.
    expect(h.worktree.removeByBranch).toHaveBeenCalled();
  });

  test('does not touch bd when the cleanup stops BEFORE the parent close', async () => {
    const h = makeActions({ gitFail: (args) => args[0] === 'fetch' });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: false, cleanup_step: 'base_sync' });
    expect(h.bd.setStatus).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).cleanup_failed[BEAD].bd_restore).toBeNull();
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

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'branch_cleanup',
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

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'branch_cleanup',
      reason: 'worktree_remove_failed'
    });
    expect(h.calls).not.toContain('git:branch -D');
    expect(h.calls).not.toContain('git:push origin');
  });
});

describe('post-merge cleanup — the deploy step (worker-deploy-hook §2/§3)', () => {
  test('fixes the contract-aligned seven-step order', () => {
    expect(CLEANUP_STEPS).toEqual([
      'base_sync',
      'post_merge_verify',
      'deploy',
      'child_sweep',
      'branch_cleanup',
      'parent_close',
      'ship_exported_capabilities'
    ]);
  });

  test('passes straight through when the repo configures no deploy command', async () => {
    const h = makeActions({ verify: VERIFY_CFG, ...ON_BASE });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, reason: null });
    expect(h.spawnImpl).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).last_deploy).toBeNull();
  });

  test('records `deployed` when the synchronous command exits zero', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_SYNC,
      deploySpawn: 'ok',
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);

    expect(r.ok).toBe(true);
    // Spawned WITHOUT a shell, from the repo root, not detached.
    expect(h.spawnImpl).toHaveBeenCalledWith(
      'bdui-shared',
      ['restart'],
      expect.objectContaining({ cwd: REPO, shell: false })
    );
    expect(h.store.snapshot(WS).last_deploy).toMatchObject({
      outcome: 'deployed',
      reason: null,
      bead_id: BEAD,
      base_sha: 'base-sha-1'
    });
  });

  test('stops the cleanup at `deploy` when the command exits non-zero', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_SYNC,
      deploySpawn: 'fail',
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'deploy',
      reason: 'deploy_failed'
    });
    const q = h.store.snapshot(WS);
    expect(q.cleanup_failed[BEAD]).toMatchObject({
      step: 'deploy',
      reason: 'deploy_failed',
      bd_restore: null
    });
    expect(q.last_deploy).toMatchObject({
      outcome: 'failed',
      reason: 'deploy_failed'
    });
    // The steps after deploy never ran.
    expect(h.worktree.removeByBranch).not.toHaveBeenCalled();
    expect(h.calls).not.toContain('bd:setStatus:UI-1:closed');
  });

  test('records deploy_timeout when the command outlives its deadline', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: {
        cmd: ['bdui-shared', 'restart'],
        timeout_ms: 5,
        detached: false
      },
      deploySpawn: 'hang',
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      cleanup_step: 'deploy',
      reason: 'deploy_timeout'
    });
    expect(h.store.snapshot(WS).last_deploy).toMatchObject({
      outcome: 'failed',
      reason: 'deploy_timeout'
    });
  });

  test('records deploy_spawn_error when the process never starts', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_SYNC,
      deploySpawn: 'throw',
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      cleanup_step: 'deploy',
      reason: 'deploy_spawn_error'
    });
  });

  test('refuses a non-detached deploy of this server own repo (UI-kfl4 §4.3-2)', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_SYNC,
      selfRepoState: () => 'self',
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'deploy',
      reason: 'deploy_not_detached_for_self'
    });
    // A synchronous restart would kill this process mid-cleanup, so nothing is
    // allowed to spawn.
    expect(h.spawnImpl).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).last_deploy).toMatchObject({
      outcome: 'failed',
      reason: 'deploy_not_detached_for_self'
    });
  });

  test('still allows a DETACHED deploy of this server own repo', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_DETACHED,
      selfRepoState: () => 'self',
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, reason: null });
  });

  test('names the lost restart when this server own repo declares no deploy (UI-kfl4 §4.3-3)', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      selfRepoState: () => 'self',
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);

    // Elsewhere an absent deploy is an honest pass; here it means the merge
    // closes without the restart that makes it a delivery.
    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'deploy',
      reason: 'deploy_missing_for_self'
    });
    expect(h.store.snapshot(WS).last_deploy).toMatchObject({
      outcome: 'failed',
      reason: 'deploy_missing_for_self'
    });
  });

  test('refuses to deploy when the self-repo comparison cannot be made', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_SYNC,
      selfRepoState: () => 'unknown',
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);

    // Guessing `other` here would disarm both self-repo defences at once.
    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'deploy',
      reason: 'deploy_self_check_failed'
    });
    expect(h.spawnImpl).not.toHaveBeenCalled();
  });

  test('keeps an absent deploy a pass in any OTHER repo', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      selfRepoState: () => 'other',
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, reason: null });
    expect(h.store.snapshot(WS).last_deploy).toBeNull();
  });

  test('stops on an unreadable deploy declaration instead of falling back (UI-kfl4 §4.2)', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deployResolution: {
        state: 'invalid',
        source: 'declaration',
        detail: 'deploy:cmd_not_a_nonempty_argv_array'
      },
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'deploy',
      reason: 'deploy_config_invalid'
    });
    expect(h.spawnImpl).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).last_deploy).toMatchObject({
      outcome: 'failed',
      reason: 'deploy_config_invalid',
      detail: 'deploy:cmd_not_a_nonempty_argv_array'
    });
  });

  test('refuses to deploy a repo with no resolvable verify command', async () => {
    const h = makeActions({ verify: null, deploy: DEPLOY_SYNC, ...ON_BASE });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'deploy',
      reason: 'deploy_verify_missing'
    });
    // Fail CLOSED: nothing was spawned on an unverified base.
    expect(h.spawnImpl).not.toHaveBeenCalled();
  });

  test('refuses to deploy when the checkout sits on another branch', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_SYNC,
      gitBranch: 'feature',
      gitStatus: '',
      gitHead: 'base-sha-1'
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      cleanup_step: 'deploy',
      reason: 'deploy_base_not_synced'
    });
    expect(h.spawnImpl).not.toHaveBeenCalled();
  });

  test('refuses to deploy from a dirty checkout', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_SYNC,
      gitBranch: 'main',
      gitStatus: ' M app/x.js\n',
      gitHead: 'base-sha-1'
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      cleanup_step: 'deploy',
      reason: 'deploy_base_not_synced'
    });
    expect(h.spawnImpl).not.toHaveBeenCalled();
  });

  test('refuses to deploy when local HEAD drifted from the synced base sha', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_SYNC,
      // A clean checkout ON the base whose HEAD is AHEAD of origin: `--ff-only`
      // still succeeds, so base_sync alone cannot catch this.
      gitBranch: 'main',
      gitStatus: '',
      gitHead: 'local-ahead-sha'
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({
      cleanup_step: 'deploy',
      reason: 'deploy_base_not_synced'
    });
    expect(h.spawnImpl).not.toHaveBeenCalled();
  });

  test('never reaches deploy when the post-merge verification failed', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_SYNC,
      ...ON_BASE,
      verifyResults: [
        { ok: true, reason: 'ok' },
        { ok: false, reason: 'verify_cmd_failed' }
      ]
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ cleanup_step: 'post_merge_verify' });
    expect(h.spawnImpl).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).last_deploy).toBeNull();
  });

  test('launches a detached deploy only AFTER the durable record is written', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_DETACHED,
      ...ON_BASE
    });
    const moveToDoneWithDeploy = h.store.moveToDoneWithDeploy.bind(h.store);
    h.store.moveToDoneWithDeploy = (
      /** @type {string} */ ws,
      /** @type {any} */ input
    ) => {
      const result = moveToDoneWithDeploy(ws, input);
      h.calls.push('store:moveToDoneWithDeploy');
      return result;
    };

    const r = await h.actions.merge(BEAD);

    expect(r.ok).toBe(true);
    // The whole cleanup finishes, the durable record lands, and ONLY THEN is
    // the self-restarting command launched — it may kill this very server.
    const ordered = h.calls.filter(
      (c) =>
        c === 'bd:setStatus:UI-1:closed' ||
        c === 'store:moveToDoneWithDeploy' ||
        c.startsWith('spawn:')
    );
    expect(ordered).toEqual([
      'bd:setStatus:UI-1:closed',
      'store:moveToDoneWithDeploy',
      'spawn:bdui-shared:detached',
      'spawn:unref'
    ]);
    // Durable, not just in-memory: a restart mid-launch still sees the intent.
    expect(createQueueStore().load(WS).last_deploy).toMatchObject({
      outcome: 'launched',
      reason: null,
      bead_id: BEAD,
      base_sha: 'base-sha-1'
    });
    expect(
      h.store.snapshot(WS).done.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('spawns the detached deploy with detached + stdio ignore', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_DETACHED,
      ...ON_BASE
    });

    await h.actions.merge(BEAD);

    expect(h.spawnImpl).toHaveBeenCalledWith(
      'bdui-shared',
      ['restart'],
      expect.objectContaining({
        cwd: REPO,
        shell: false,
        detached: true,
        stdio: 'ignore'
      })
    );
  });

  test('overwrites `launched` with a failure when the detached spawn throws', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_DETACHED,
      deploySpawn: 'throw',
      ...ON_BASE
    });

    await h.actions.merge(BEAD);

    expect(createQueueStore().load(WS).last_deploy).toMatchObject({
      outcome: 'failed',
      reason: 'deploy_spawn_error',
      bead_id: BEAD
    });
  });

  test('overwrites `launched` when the detached spawn emits an async error event', async () => {
    // Node reports ENOENT-style pre-exec failures as an `error` EVENT, not a
    // throw — unhandled it would crash the server with `launched` left durable.
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_DETACHED,
      deploySpawn: 'error',
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);
    await new Promise((resolve) => setTimeout(resolve, 5));

    expect(r.ok).toBe(true);
    expect(createQueueStore().load(WS).last_deploy).toMatchObject({
      outcome: 'failed',
      reason: 'deploy_spawn_error',
      bead_id: BEAD
    });
  });
});

describe('post-merge cleanup — the deploy failure keeps its output (UI-l53x)', () => {
  /**
   * The synchronous deploy options, with the checkout in the state the
   * re-validation demands so the command actually runs.
   *
   * @param {Record<string, any>} [over]
   */
  function syncDeploy(over = {}) {
    return {
      verify: VERIFY_CFG,
      deploy: DEPLOY_SYNC,
      ...ON_BASE,
      ...over
    };
  }

  test('records the deploy output tail and log path on cleanup_failed', async () => {
    const h = makeActions(
      syncDeploy({
        deploySpawn: 'fail',
        deployOutput: ['render failed: codex config.toml\n']
      })
    );

    await h.actions.merge(BEAD);

    const c = h.store.snapshot(WS).cleanup_failed[BEAD];
    expect(c).toMatchObject({
      step: 'deploy',
      reason: 'deploy_failed',
      output_tail: 'render failed: codex config.toml'
    });
    expect(String(c.log_path).startsWith(deployLogDir(REPO))).toBe(true);
  });

  test('preserves the whole deploy output in the log file, tail cap included', async () => {
    const h = makeActions(
      syncDeploy({
        deploySpawn: 'fail',
        deployOutput: ['FIRST: the real cause\n', `${'x'.repeat(40000)}\n`]
      })
    );

    await h.actions.merge(BEAD);

    const c = h.store.snapshot(WS).cleanup_failed[BEAD];
    expect(c.output_tail).not.toContain('FIRST: the real cause');
    expect(fs.readFileSync(String(c.log_path), 'utf8')).toContain(
      'FIRST: the real cause'
    );
  });

  test('records the tail and log path for a deploy that timed out too', async () => {
    const h = makeActions(
      syncDeploy({
        deploy: {
          cmd: ['bdui-shared', 'restart'],
          timeout_ms: 5,
          detached: false
        },
        deploySpawn: 'hang',
        deployOutput: ['step 2/4 installing…\n']
      })
    );

    await h.actions.merge(BEAD);

    const c = h.store.snapshot(WS).cleanup_failed[BEAD];
    expect(c).toMatchObject({
      reason: 'deploy_timeout',
      output_tail: 'step 2/4 installing…'
    });
    expect(c.log_path).toBeTruthy();
  });

  test('records the log path on a SUCCESSFUL last_deploy — the next failure needs a baseline', async () => {
    const h = makeActions(
      syncDeploy({ deploySpawn: 'ok', deployOutput: ['restarted\n'] })
    );

    await h.actions.merge(BEAD);

    const d = h.store.snapshot(WS).last_deploy;
    expect(d.outcome).toBe('deployed');
    expect(fs.readFileSync(String(d.log_path), 'utf8')).toBe('restarted\n');
  });

  test('records the log path on a FAILED last_deploy', async () => {
    const h = makeActions(
      syncDeploy({ deploySpawn: 'fail', deployOutput: ['boom\n'] })
    );

    await h.actions.merge(BEAD);

    const d = h.store.snapshot(WS).last_deploy;
    expect(d).toMatchObject({ outcome: 'failed', reason: 'deploy_failed' });
    expect(fs.readFileSync(String(d.log_path), 'utf8')).toBe('boom\n');
  });

  test('keys the deploy log on `repo`, not on `workspace`', async () => {
    const other_repo = '/tmp/example-workspace/other-repo-p5';
    const h = makeActions(
      syncDeploy({ repo: other_repo, deploySpawn: 'fail' })
    );

    await h.actions.merge(BEAD);

    const log_path = String(h.store.snapshot(WS).last_deploy.log_path);
    expect(log_path.startsWith(deployLogDir(other_repo))).toBe(true);
    expect(log_path.startsWith(deployLogDir(WS))).toBe(false);
  });

  test.each([
    ['checkout_not_on_base', { gitBranch: 'feature' }],
    ['checkout_dirty', { gitStatus: ' M app/main.js\n' }],
    ['head_not_base_sha', { gitHead: 'some-other-sha' }]
  ])(
    'names the %s guard as the base_not_synced detail',
    async (reason, over) => {
      const h = makeActions(syncDeploy(over));

      await h.actions.merge(BEAD);

      expect(h.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
        reason: 'deploy_base_not_synced',
        detail: reason
      });
      expect(h.store.snapshot(WS).last_deploy).toMatchObject({
        outcome: 'failed',
        reason: 'deploy_base_not_synced',
        detail: reason
      });
    }
  );

  test('preserves a SYNCHRONOUS deploy spawn throw as detail, with no log file', async () => {
    const h = makeActions(syncDeploy({ deploySpawn: 'throw' }));

    await h.actions.merge(BEAD);

    const q = h.store.snapshot(WS);
    expect(q.cleanup_failed[BEAD]).toMatchObject({
      reason: 'deploy_spawn_error',
      detail: 'spawn ENOENT'
    });
    expect(q.cleanup_failed[BEAD].log_path).toBeUndefined();
    expect(q.last_deploy).toMatchObject({
      reason: 'deploy_spawn_error',
      detail: 'spawn ENOENT'
    });
    expect(q.last_deploy.log_path).toBeUndefined();
  });

  test('preserves an ASYNCHRONOUS deploy error event as detail, with the empty log it opened', async () => {
    const h = makeActions(syncDeploy({ deploySpawn: 'error' }));

    await h.actions.merge(BEAD);

    const q = h.store.snapshot(WS);
    expect(q.cleanup_failed[BEAD]).toMatchObject({
      reason: 'deploy_spawn_error',
      detail: 'nope'
    });
    // The log was already open when the event fired, so the path is a real —
    // empty — file. The reason already says nothing ran.
    expect(fs.readFileSync(String(q.last_deploy.log_path), 'utf8')).toBe('');
  });

  test('adds no detail when the deploy argv itself is unusable', async () => {
    const h = makeActions(
      syncDeploy({ deploy: { cmd: [], timeout_ms: 1000, detached: false } })
    );

    await h.actions.merge(BEAD);

    const q = h.store.snapshot(WS);
    expect(q.cleanup_failed[BEAD]).toMatchObject({
      reason: 'deploy_spawn_error'
    });
    expect(q.cleanup_failed[BEAD].detail).toBeNull();
    expect(q.last_deploy.detail).toBeUndefined();
  });

  test('preserves a DETACHED deploy spawn throw as detail', async () => {
    const h = makeActions(
      syncDeploy({ deploy: DEPLOY_DETACHED, deploySpawn: 'throw' })
    );

    await h.actions.merge(BEAD);

    expect(createQueueStore().load(WS).last_deploy).toMatchObject({
      outcome: 'failed',
      reason: 'deploy_spawn_error',
      detail: 'spawn ENOENT'
    });
  });

  test("preserves a DETACHED deploy's asynchronous error event as detail", async () => {
    const h = makeActions(
      syncDeploy({ deploy: DEPLOY_DETACHED, deploySpawn: 'error' })
    );

    await h.actions.merge(BEAD);
    await new Promise((resolve) => setTimeout(resolve, 5));

    expect(createQueueStore().load(WS).last_deploy).toMatchObject({
      outcome: 'failed',
      reason: 'deploy_spawn_error',
      detail: 'nope'
    });
  });
});

describe('post-merge cleanup — a REFUSED deploy still records last_deploy (UI-l53x §2)', () => {
  /**
   * A prior success, so a test can prove the refusal OVERWRITES it rather than
   * leaving `last_deploy` answering "is the running service the merged code?"
   * with a stale yes.
   *
   * @param {any} store
   */
  function seedSuccess(store) {
    store.recordLastDeploy(WS, {
      outcome: 'deployed',
      reason: null,
      bead_id: 'UI-old',
      base_sha: 'older-sha'
    });
  }

  test('deploy_verify_missing overwrites the previous success record', async () => {
    const store = seedStore();
    seedSuccess(store);
    const h = makeActions({
      store,
      verify: null,
      deploy: DEPLOY_SYNC,
      ...ON_BASE
    });

    await h.actions.merge(BEAD);

    expect(h.store.snapshot(WS).last_deploy).toMatchObject({
      outcome: 'failed',
      reason: 'deploy_verify_missing',
      bead_id: BEAD
    });
  });

  test('deploy_base_not_synced overwrites the previous success record', async () => {
    const store = seedStore();
    seedSuccess(store);
    const h = makeActions({
      store,
      verify: VERIFY_CFG,
      deploy: DEPLOY_SYNC,
      ...ON_BASE,
      gitBranch: 'feature'
    });

    await h.actions.merge(BEAD);

    expect(h.store.snapshot(WS).last_deploy).toMatchObject({
      outcome: 'failed',
      reason: 'deploy_base_not_synced',
      bead_id: BEAD
    });
  });

  test('an unconfigured deploy still records nothing — silence is not a refusal', async () => {
    const store = seedStore();
    seedSuccess(store);
    const h = makeActions({ store, verify: VERIFY_CFG, deploy: null });

    await h.actions.merge(BEAD);

    expect(h.store.snapshot(WS).last_deploy).toMatchObject({
      outcome: 'deployed',
      bead_id: 'UI-old'
    });
  });

  test.each([
    ['deploy_verify_missing', { verify: null, deploy: DEPLOY_SYNC }],
    [
      'deploy_base_not_synced',
      { verify: VERIFY_CFG, deploy: DEPLOY_SYNC, gitBranch: 'feature' }
    ]
  ])(
    'an EXTERNAL row records %s in last_deploy only — cleanup_failed is lane state',
    async (reason, over) => {
      const external_bead = 'UI-ext-deploy';
      const store = createQueueStore();
      seedSuccess(store);
      const h = makeActions({
        store,
        external: {
          [external_bead]: {
            bead_id: external_bead,
            pr_url: 'https://github.com/o/r/pull/777',
            pr_number: 777,
            added_at: 1
          }
        },
        bdStatus: { [external_bead]: 'resolved' },
        bdPrUrl: 'https://github.com/o/r/pull/777',
        ...ON_BASE,
        ...over
      });

      await h.actions.merge(external_bead);

      const q = h.store.snapshot(WS);
      expect(q.cleanup_failed).toEqual({});
      // With no lane membership this record is the ONLY durable trace the
      // refusal leaves anywhere.
      expect(q.last_deploy).toMatchObject({
        outcome: 'failed',
        reason,
        bead_id: external_bead
      });
    }
  );
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

    // An external row never enters `done` (its path is non-durable), so the
    // registry drop is the ONLY record that it is finished.
    expect(h.external_drop).toHaveBeenCalledWith(WS, 'UI-ext2');
    expect(h.store.snapshot(WS).done).toEqual([]);
  });

  test('does not drop the row when the cleanup fails before it', async () => {
    // The drop sits behind `clearShipFailure`, i.e. behind every step that can
    // stop the cleanup — a bead whose close failed is still `resolved` and must
    // stay a registry row so the [정리] retry can find it.
    const h = makeActions({
      bdFail: (/** @type {string} */ method) => method === 'setStatus'
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: false, cleanup_step: 'parent_close' });
    expect(h.external_drop).not.toHaveBeenCalled();
  });
});

describe('[폐기] — the order-sensitive discard transition (discard spec §1)', () => {
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
    expect(h.scheduler.tick).not.toHaveBeenCalled();
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
  test('walks the eight steps in contract order on a clean merge', async () => {
    const env = makeActions();

    await env.actions.merge(BEAD);

    expect(env.steps).toEqual([
      'merging',
      'base_sync',
      'post_merge_verify',
      'deploy',
      'child_sweep',
      'branch_cleanup',
      'parent_close',
      'ship_exported_capabilities',
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
      checks: {
        state: 'ok',
        data: [{ name: 'ci', conclusion: 'fail', status: 'completed' }]
      }
    });

    const r = await env.actions.merge(BEAD);

    expect(r.ok).toBe(false);
    expect(env.activity.get(WS, BEAD)).toBe(null);
  });

  test('reports progress for an externally observed merge too', async () => {
    const env = makeActions({ details: [prOf({ state: 'MERGED' })] });

    await env.actions.cleanupObservedMerge(BEAD);

    expect(env.steps[0]).toBe('base_sync');
    expect(env.steps[env.steps.length - 1]).toBe('(cleared)');
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
      externalOptions({ details: [prOf({ state: 'MERGED' })] })
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

  test('dispatches after the BEHIND update-branch re-observes a conflict', async () => {
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

    expect(env.gh.updateBranch).toHaveBeenCalled();
    expect(r.action).toBe('conflict_resolution');
    expect(env.scheduler.dispatchExternalConflict).toHaveBeenCalledWith(
      WS,
      EXTERNAL_BEAD,
      'release'
    );
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
        details: [prOf({ state: 'MERGED', base_ref: 'develop' })]
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
        details: [prOf({ state: 'MERGED', base_ref: 'develop' })]
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
        details: [prOf({ state: 'MERGED', head_ref: 'feature/from-session' })]
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

  test('a durable pr_wait row still merges without any bd re-read', async () => {
    const env = makeActions();

    const r = await env.actions.merge(BEAD);

    expect(r.action).toBe('merged');
    // Scoped to the CLICK: the cleanup's ship step reads the bead again on
    // purpose (UI-4ii4), so the claim is about lane membership, not the run.
    const click = env.calls.slice(0, env.calls.indexOf('gh:mergeSquash'));
    expect(click).not.toContain(`bd:readIssue:${BEAD}`);
  });
});

describe('worker/pr-actions — external rows write no durable lane state (impl review 2026-07-28)', () => {
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

  test('a completed external cleanup does not push the bead into done', async () => {
    const env = makeActions(externalOptions());

    await env.actions.merge(EXTERNAL_BEAD);

    expect(env.store.snapshot(WS).done).toEqual([]);
  });

  test('a completed WORKER cleanup still pushes the bead into done', async () => {
    const env = makeActions();

    await env.actions.merge(BEAD);

    expect(
      env.store.snapshot(WS).done.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('a failed external cleanup records no durable cleanup_failed', async () => {
    const env = makeActions(
      externalOptions({
        gitFail: (/** @type {string[]} */ args) => args[0] === 'fetch'
      })
    );

    const r = await env.actions.merge(EXTERNAL_BEAD);

    expect(r.ok).toBe(false);
    expect(env.store.snapshot(WS).cleanup_failed).toEqual({});
  });

  test('a failed WORKER cleanup still records cleanup_failed', async () => {
    const env = makeActions({
      gitFail: (/** @type {string[]} */ args) => args[0] === 'fetch'
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'base_sync'
    });
  });

  test('a detached deploy for an external row still records the launch durably', async () => {
    const env = makeActions(
      externalOptions({
        verify: VERIFY_CFG,
        deploy: DEPLOY_DETACHED,
        ...ON_BASE
      })
    );

    await env.actions.merge(EXTERNAL_BEAD);

    expect(env.store.snapshot(WS).last_deploy).toMatchObject({
      outcome: 'launched',
      bead_id: EXTERNAL_BEAD
    });
    expect(env.store.snapshot(WS).done).toEqual([]);
  });

  test('reads status and pr_url in ONE bd show so they cannot disagree', async () => {
    const env = makeActions(externalOptions());

    await env.actions.merge(EXTERNAL_BEAD);

    // ONE read up to the merge — the later reads belong to the ship step
    // (UI-4ii4), which runs long after the click-time guard has decided.
    const click = env.calls.slice(0, env.calls.indexOf('gh:mergeSquash'));
    expect(click.filter((c) => c.startsWith('bd:readIssue:'))).toHaveLength(1);
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

  test('announces the merge BEFORE the detached deploy launch', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_DETACHED,
      deploySpawn: 'ok',
      ...ON_BASE
    });

    await h.actions.merge(BEAD);

    expect(h.notify.mergeCompleted).toHaveBeenCalledTimes(1);
    // The launch may restart this process, so an announcement after it is one
    // that may never be sent.
    const announced_at = h.calls.indexOf('notify:mergeCompleted');
    const launched_at = h.calls.indexOf('spawn:bdui-shared:detached');
    expect(announced_at).toBeGreaterThanOrEqual(0);
    expect(launched_at).toBeGreaterThan(announced_at);
  });

  test('waits for the merge send to finish before launching the deploy', async () => {
    const h = makeActions({
      verify: VERIFY_CFG,
      deploy: DEPLOY_DETACHED,
      deploySpawn: 'ok',
      ...ON_BASE
    });

    await h.actions.merge(BEAD);

    // Calling the notifier first is not enough: an asynchronous send that has
    // not spawned yet when the deploy restarts this process is a merge nobody
    // hears about (UI-vb0t §3.4).
    const spawned_at = h.calls.indexOf('notify:spawned');
    const launched_at = h.calls.indexOf('spawn:bdui-shared:detached');
    expect(spawned_at).toBeGreaterThanOrEqual(0);
    expect(launched_at).toBeGreaterThan(spawned_at);
  });

  test('announces the externally-observed merge through the same hook', async () => {
    const h = makeActions({ details: [prOf({ state: 'MERGED' })] });

    const r = await h.actions.cleanupObservedMerge(BEAD);

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
    const h = makeActions({
      verify: VERIFY_CFG,
      // Green at the CLICK-time gate, red at `post_merge_verify` — otherwise
      // the click would refuse and the cleanup would never run at all.
      verifyResults: [
        { ok: true, reason: 'ok' },
        { ok: false, reason: 'verify_cmd_failed' }
      ],
      ...ON_BASE
    });

    const r = await h.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: false, cleanup_step: 'post_merge_verify' });
    expect(h.notify.mergeCompleted).not.toHaveBeenCalled();
  });

  test('announces nothing when the click-time gate refuses the merge', async () => {
    const h = makeActions({
      checks: { state: 'ok', data: [{ name: 'ci', conclusion: 'fail' }] }
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

describe('worker/pr-actions — capability ship after the close (UI-4ii4)', () => {
  const CHILD = 'UI-1-c1';

  test('ships the parent and every closed descendant, then moves the bead to done', async () => {
    const env = makeActions({
      children: { [BEAD]: [{ id: CHILD, status: 'open' }] },
      labels: { [BEAD]: ['export:cap-a'], [CHILD]: ['export:cap-b'] }
    });

    const r = await env.actions.merge(BEAD);

    expect(r).toMatchObject({ ok: true, reason: null });
    expect(env.calls).toContain('bd:ship:cap-a');
    expect(env.calls).toContain('bd:ship:cap-b');
    expect(
      env.store.snapshot(WS).done.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
  });

  test('leaves bd CLOSED when the ship fails — the close is not rolled back', async () => {
    const env = makeActions({
      labels: { [BEAD]: ['export:cap-a'] },
      shipFail: (cap) => cap === 'cap-a'
    });

    const r = await env.actions.merge(BEAD);

    expect(r).toMatchObject({
      ok: false,
      cleanup_step: 'ship_exported_capabilities',
      reason: 'ship_failed:cap-a'
    });
    expect(env.calls).toContain(`bd:setStatus:${BEAD}:closed`);
    expect(env.calls).not.toContain(`bd:setStatus:${BEAD}:resolved`);
    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toMatchObject({
      step: 'ship_exported_capabilities',
      reason: 'ship_failed:cap-a',
      bd_restore: null,
      detail: 'pending=cap-a'
    });
  });

  test('keeps the bead in pr_wait so [정리] can retry the whole sequence', async () => {
    const env = makeActions({
      labels: { [BEAD]: ['export:cap-a'] },
      shipFail: () => true
    });

    await env.actions.merge(BEAD);

    expect(
      env.store.snapshot(WS).pr_wait.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
    expect(env.store.snapshot(WS).done).toEqual([]);
  });

  test('a [정리] retry over already-closed beads still publishes every capability', async () => {
    let ship_broken = true;
    const env = makeActions({
      children: { [BEAD]: [{ id: CHILD, status: 'open' }] },
      labels: { [BEAD]: ['export:cap-a'], [CHILD]: ['export:cap-b'] },
      shipFail: () => ship_broken
    });
    const first = await env.actions.merge(BEAD);
    expect(first).toMatchObject({ ok: false, reason: 'ship_failed:cap-a' });

    // The retry finds parent AND child already `closed` — the enumeration is
    // deliberately the whole walked set, not "what this sweep closed".
    ship_broken = false;
    const closes_before = env.calls.filter(
      (c) => c === `bd:setStatus:${CHILD}:closed`
    ).length;
    const second = await env.actions.merge(BEAD);

    expect(second).toMatchObject({ ok: true, reason: null });
    // The child is NOT closed a second time — so its capability was published
    // purely off the wide enumeration, which is acceptance criterion 6.
    expect(
      env.calls.filter((c) => c === `bd:setStatus:${CHILD}:closed`)
    ).toHaveLength(closes_before);
    expect(env.bd.ship.mock.calls.map((c) => c[0])).toEqual([
      'cap-a',
      'cap-a',
      'cap-b'
    ]);
    expect(
      env.store.snapshot(WS).done.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual([BEAD]);
    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toBeUndefined();
  });

  test('strips the export: label of a canceled descendant instead of shipping it', async () => {
    const env = makeActions({
      children: { [BEAD]: [{ id: CHILD, status: 'open' }] },
      labels: { [CHILD]: ['export:cap-b'] },
      dispositions: { [CHILD]: 'canceled' }
    });

    const r = await env.actions.merge(BEAD);

    expect(r.ok).toBe(true);
    expect(env.bd.ship).not.toHaveBeenCalled();
    expect(env.calls).toContain(`bd:removeLabel:${CHILD}:export:cap-b`);
  });

  test('an external row records a workspace ship failure and no cleanup_failed', async () => {
    const EXT = 'UI-ext-ship';
    const env = makeActions({
      store: createQueueStore(),
      external: {
        [EXT]: {
          bead_id: EXT,
          pr_url: 'https://github.com/o/r/pull/909',
          pr_number: 909,
          added_at: 1
        }
      },
      bdStatus: { [EXT]: 'resolved' },
      bdPrUrl: 'https://github.com/o/r/pull/909',
      labels: { [EXT]: ['export:cap-x'] },
      shipFail: () => true
    });

    const r = await env.actions.merge(EXT);

    expect(r).toMatchObject({ ok: false, reason: 'ship_failed:cap-x' });
    expect(env.store.snapshot(WS).cleanup_failed[EXT]).toBeUndefined();
    expect(env.store.snapshot(WS).ship_failure).toMatchObject({
      bead_id: EXT,
      reason: 'ship_failed:cap-x',
      detail: 'pending=cap-x',
      pr_url: 'https://github.com/o/r/pull/909'
    });
  });

  test('a durable-row ship failure writes cleanup_failed and no workspace record', async () => {
    const env = makeActions({
      labels: { [BEAD]: ['export:cap-a'] },
      shipFail: () => true
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).ship_failure).toBeNull();
    expect(env.store.snapshot(WS).cleanup_failed[BEAD]).toBeDefined();
  });

  test('a successful ship clears a workspace record an earlier failure left', async () => {
    const env = makeActions({ labels: { [BEAD]: ['export:cap-a'] } });
    env.store.recordShipFailure(WS, {
      bead_id: 'UI-old',
      reason: 'ship_failed:cap-old'
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).ship_failure).toBeNull();
  });
});

describe('worker/pr-actions — ship failure records exactly one place (impl review)', () => {
  test('a bead that left the lane mid-cleanup still gets the workspace record', async () => {
    const env = makeActions({
      labels: { [BEAD]: ['export:cap-a'] },
      shipFail: () => true
    });
    // The lane loses the bead WHILE the cleanup runs (a [폐기] during a long
    // post-merge suite): the start-of-cleanup snapshot said durable, the
    // failure-time one says otherwise.
    env.bd.ship.mockImplementationOnce(async () => {
      env.store.removeFromPrWait(WS, { bead_id: BEAD });
      throw new Error('bd ship failed');
    });

    await env.actions.merge(BEAD);

    expect(env.store.snapshot(WS).ship_failure).toMatchObject({
      bead_id: BEAD,
      reason: 'ship_failed:cap-a'
    });
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

  test('re-compares the base after the BEHIND update-branch', async () => {
    const env = makeActions({
      store: attemptStore('main'),
      details: [
        prOf({ merge_state_status: 'BEHIND', base_ref: 'main' }),
        prOf({ base_ref: 'ilsun/dev' })
      ]
    });

    const r = await env.actions.merge(BEAD);

    expect(env.gh.updateBranch).toHaveBeenCalled();
    expect(r).toMatchObject({
      ok: false,
      reason: 'base_mismatch:main!=ilsun/dev'
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
