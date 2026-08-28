/**
 * Worker quick_fix landing settlement (UI-7tme §6/§11).
 *
 * Every repository, git, worktree, Beads, and RepoOperation contact is faked.
 * The suite therefore exercises the complete judgment without a checkout or a
 * live service, while one queue-store test separately holds down persistence.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, expect, test, vi } from 'vitest';
import { createQueueStore } from './queue-store.js';
import { createQuickfixLanding } from './quickfix-landing.js';

const WORKSPACE = '/tmp/example-workspace/quickfix';
const REPO = '/tmp/example-workspace/quickfix';
const BEAD = 'UI-quick';
const ATTEMPT = 'attempt-quick';
const HEAD_SHA = 'a'.repeat(40);
const FETCHED_SHA = 'f'.repeat(40);

/** @type {string[]} */
const temp_dirs = [];

afterEach(() => {
  for (const dir of temp_dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

/**
 * Build one landing module over minimal fakes and one shared ordered call log.
 *
 * @param {{
 *   status?: string,
 *   closeReason?: string,
 *   receipt?: string|null,
 *   worktreeExists?: boolean,
 *   worktreeHead?: string,
 *   fetchCode?: number,
 *   revCode?: number,
 *   containmentCode?: number,
 *   config?: any,
 *   deploy?: any,
 *   evidence?: any,
 *   repoOperations?: boolean,
 *   removeResult?: { ok: boolean, removed: boolean, reason: string|null },
 *   discardResult?: { ok: boolean, removed: boolean, reason: string|null },
 *   branchDeleteCode?: number,
 *   branchVerifyCode?: number,
 *   landingProgress?: { cursor: string, head_sha: string|null, reason: string|null },
 *   pushLog?: { ok: true, entries: Record<string, unknown>[] } | { ok: false, reason: string } | null,
 *   acceptSkippedReceipt?: boolean,
 *   resolveWriteSticks?: boolean,
 *   readIssueThrows?: boolean
 * }} [options]
 */
function makeLanding(options = {}) {
  /** @type {string[]} */
  const calls = [];
  let bead_status = options.status || 'resolved';
  const receipt = Object.hasOwn(options, 'receipt')
    ? options.receipt
    : `reviewer@${HEAD_SHA}`;
  // The attempt's own pre-push record (guard-hook record mode). `null` stands
  // for a landing wired without the dep at all, which must read exactly like a
  // missing log rather than like an innocent one.
  const push_log = Object.hasOwn(options, 'pushLog')
    ? options.pushLog
    : {
        ok: /** @type {const} */ (true),
        entries: [
          {
            local_ref: 'HEAD',
            local_oid: HEAD_SHA,
            remote_ref: 'refs/heads/main',
            remote_oid: 'e'.repeat(40)
          }
        ]
      };
  const readPushLog =
    push_log === null || push_log === undefined
      ? undefined
      : vi.fn(() => {
          calls.push('pushlog:read');
          return push_log;
        });

  const store = {
    updateAttempt: vi.fn((workspace, input) => {
      if (workspace !== WORKSPACE) {
        throw new Error(`unexpected workspace: ${workspace}`);
      }
      const progress = input.patch.quickfix_landing;
      calls.push(`store:update:${progress.cursor}:${progress.reason}`);
      return { ok: true };
    }),
    moveToDone: vi.fn(() => {
      calls.push('store:moveToDone');
      return { ok: true };
    }),
    snapshot: vi.fn(() => ({
      attempts: options.landingProgress
        ? {
            [ATTEMPT]: { quickfix_landing: options.landingProgress }
          }
        : {}
    }))
  };
  const bd = {
    readStatus: vi.fn(async () => {
      calls.push(`bd:readStatus:${bead_status}`);
      return bead_status;
    }),
    readIssue: vi.fn(async () => {
      if (options.readIssueThrows) {
        calls.push('bd:readIssue:threw');
        throw new Error('bd unreachable');
      }
      calls.push(`bd:readIssue:${bead_status}`);
      return Object.hasOwn(options, 'closeReason')
        ? { status: bead_status, close_reason: options.closeReason }
        : { status: bead_status };
    }),
    setStatus: vi.fn(async (bead_id, status) => {
      calls.push(`bd:setStatus:${status}`);
      // `resolveWriteSticks: false` is the write that RETURNS but does not
      // land — the readback is what catches it.
      if (status === 'resolved' && options.resolveWriteSticks === false) {
        return;
      }
      bead_status = status;
    }),
    readMetadata: vi.fn(async () => {
      calls.push('bd:readMetadata:impl_review');
      return receipt ?? null;
    })
  };
  const gitRun = vi.fn(async (args) => {
    calls.push(`git:${args.join(' ')}`);
    if (args[0] === 'fetch') {
      return { code: options.fetchCode ?? 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'rev-parse' && args[1] === 'HEAD') {
      return {
        code: 0,
        stdout: `${options.worktreeHead || HEAD_SHA}\n`,
        stderr: ''
      };
    }
    if (args[0] === 'rev-parse' && args[1] === 'origin/main') {
      return {
        code: options.revCode ?? 0,
        stdout: `${FETCHED_SHA}\n`,
        stderr: ''
      };
    }
    if (args[0] === 'merge-base') {
      return { code: options.containmentCode ?? 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'branch') {
      return {
        code: options.branchDeleteCode ?? 0,
        stdout: '',
        stderr: ''
      };
    }
    if (args[0] === 'rev-parse' && args[1] === '--verify') {
      return {
        code: options.branchVerifyCode ?? 1,
        stdout: '',
        stderr: ''
      };
    }
    throw new Error(`unexpected git call: ${args.join(' ')}`);
  });
  const worktree = {
    pathFor: vi.fn(() => `${REPO}/.worktrees/${BEAD}`),
    exists: vi.fn(() => options.worktreeExists !== false),
    removeByBranch: vi.fn(async () => {
      calls.push('worktree:removeByBranch');
      return options.removeResult || { ok: true, removed: true, reason: null };
    }),
    removeIfDiscardable: vi.fn(async () => {
      calls.push('worktree:removeIfDiscardable');
      return options.discardResult || { ok: true, removed: true, reason: null };
    }),
    withTopologyLock: vi.fn(async (repo, fn) => {
      calls.push('topology:enter');
      try {
        return await fn();
      } finally {
        calls.push('topology:exit');
      }
    })
  };
  const repoOperations = {
    hasConfig: vi.fn(async () => {
      calls.push('repoOperations:hasConfig');
      return options.config || { ok: true, present: false };
    }),
    ensureDeploy: vi.fn(async () => {
      calls.push('repoOperations:ensureDeploy');
      return options.deploy || { ok: true, inert: true };
    }),
    waitForDeployTerminal: vi.fn(async () => {
      calls.push('repoOperations:waitForDeployTerminal');
      return options.evidence || { state: 'succeeded' };
    })
  };
  const landing = createQuickfixLanding({
    workspace: WORKSPACE,
    repo: REPO,
    store,
    bd,
    gitRun,
    worktree,
    repoOperations: options.repoOperations === false ? null : repoOperations,
    readPushLog,
    accept_skipped_receipt: options.acceptSkippedReceipt === true,
    notifyChanged: () => calls.push('notify'),
    now: () => 1234
  });

  return {
    landing,
    calls,
    store,
    bd,
    gitRun,
    worktree,
    repoOperations,
    readPushLog
  };
}

/**
 * Run the standard settlement input.
 *
 * @param {ReturnType<typeof createQuickfixLanding>} landing
 */
function settle(landing) {
  return landing.settle({
    attempt_id: ATTEMPT,
    bead_id: BEAD,
    target_base: 'main'
  });
}

test('parses valid review receipt and completes landing', async () => {
  const { landing, bd } = makeLanding();

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
  expect(bd.readMetadata).toHaveBeenCalledWith(BEAD, 'impl_review');
});

test('rejects skipped review receipt', async () => {
  const { landing } = makeLanding({ receipt: `skipped@${HEAD_SHA}` });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'invalid_impl_review',
    step: null
  });
});

test.each([
  ['short hex', `reviewer@${'a'.repeat(39)}`],
  ['non-hex', `reviewer@${'z'.repeat(40)}`],
  ['missing separator', `reviewer${HEAD_SHA}`]
])('rejects malformed review receipt with %s', async (description, value) => {
  const { landing } = makeLanding({ receipt: value });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'invalid_impl_review',
    step: null
  });
});

test('rejects absent review receipt', async () => {
  const { landing } = makeLanding({ receipt: null });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'invalid_impl_review',
    step: null
  });
});

test('accepts a skipped review receipt once the contract flag is on', async () => {
  const { landing } = makeLanding({
    receipt: `skipped@${HEAD_SHA}`,
    acceptSkippedReceipt: true
  });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
});

test('reports an unreadable Bead as a read failure, not as an unresolved one', async () => {
  const { landing } = makeLanding({ readIssueThrows: true });

  const result = await settle(landing);

  expect(result).toEqual({ ok: false, reason: 'bd_read_failed', step: null });
});

test('resolves an unresolved Bead from push evidence and completes landing', async () => {
  const { landing, bd, store, calls } = makeLanding({ status: 'in_progress' });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
  expect(bd.setStatus).toHaveBeenCalledWith(BEAD, 'resolved');
  expect(calls.indexOf('bd:setStatus:resolved')).toBeLessThan(
    calls.indexOf('store:update:base_containment:null')
  );
  expect(store.updateAttempt).toHaveBeenCalledWith(WORKSPACE, {
    attempt_id: ATTEMPT,
    patch: {
      quickfix_landing: {
        cursor: null,
        head_sha: HEAD_SHA,
        reason: null,
        resolved_by: 'worker:evidence'
      }
    }
  });
});

test('keeps the evidence resolve on every later landing record', async () => {
  const { landing, store } = makeLanding({ status: 'in_progress' });

  await settle(landing);

  expect(store.moveToDone).toHaveBeenCalledWith(WORKSPACE, {
    bead_id: BEAD,
    attempt_id: ATTEMPT,
    patch: {
      status: 'done',
      finished_at: 1234,
      quickfix_landing: {
        cursor: 'parent_close',
        head_sha: HEAD_SHA,
        reason: null,
        resolved_by: 'worker:evidence'
      }
    }
  });
});

test('leaves the resolved path untouched by the evidence dep', async () => {
  const { landing, readPushLog, store } = makeLanding();

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
  expect(readPushLog).not.toHaveBeenCalled();
  expect(store.moveToDone).toHaveBeenCalledWith(
    WORKSPACE,
    expect.objectContaining({
      patch: expect.objectContaining({
        quickfix_landing: {
          cursor: 'parent_close',
          head_sha: HEAD_SHA,
          reason: null
        }
      })
    })
  );
});

test.each([
  [
    'an absent log',
    { pushLog: { ok: /** @type {const} */ (false), reason: 'absent' } }
  ],
  [
    'a log with no base push',
    { pushLog: { ok: /** @type {const} */ (true), entries: [] } }
  ],
  [
    'a log holding only a topic push',
    {
      pushLog: {
        ok: /** @type {const} */ (true),
        entries: [
          {
            local_ref: 'HEAD',
            local_oid: HEAD_SHA,
            remote_ref: 'refs/heads/UI-quick',
            remote_oid: '0'.repeat(40)
          }
        ]
      }
    }
  ],
  ['no push log dep at all', { pushLog: null }]
])('reports delivery unproven for %s', async (description, over) => {
  const { landing, bd } = makeLanding({ status: 'in_progress', ...over });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'delivery_unproven:push_log_absent',
    step: null
  });
  expect(bd.setStatus).not.toHaveBeenCalled();
});

test('reports delivery unproven when the review receipt is absent', async () => {
  const { landing, bd } = makeLanding({ status: 'in_progress', receipt: null });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'delivery_unproven:impl_review_missing',
    step: null
  });
  expect(bd.setStatus).not.toHaveBeenCalled();
});

test('reports delivery unproven when the receipt does not bind the pushed head', async () => {
  const { landing, bd } = makeLanding({
    status: 'in_progress',
    receipt: `reviewer@${'b'.repeat(40)}`
  });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'delivery_unproven:impl_review_sha_mismatch',
    step: null
  });
  expect(bd.setStatus).not.toHaveBeenCalled();
});

test('binds the receipt to the LAST base push of the attempt', async () => {
  const { landing } = makeLanding({
    status: 'in_progress',
    pushLog: {
      ok: true,
      entries: [
        {
          local_ref: 'HEAD',
          local_oid: 'c'.repeat(40),
          remote_ref: 'refs/heads/main',
          remote_oid: 'e'.repeat(40)
        },
        {
          local_ref: 'HEAD',
          local_oid: HEAD_SHA,
          remote_ref: 'refs/heads/main',
          remote_oid: 'c'.repeat(40)
        }
      ]
    }
  });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
});

test('rejects a skipped receipt on the evidence path while the flag is off', async () => {
  const { landing, bd } = makeLanding({
    status: 'in_progress',
    receipt: `skipped@${HEAD_SHA}`
  });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'invalid_impl_review',
    step: null
  });
  expect(bd.setStatus).not.toHaveBeenCalled();
});

test('accepts a skipped receipt on the evidence path once the flag is on', async () => {
  const { landing, bd } = makeLanding({
    status: 'in_progress',
    receipt: `skipped@${HEAD_SHA}`,
    acceptSkippedReceipt: true
  });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
  expect(bd.setStatus).toHaveBeenCalledWith(BEAD, 'resolved');
});

test('reports a record failure when the Worker resolve does not read back', async () => {
  const { landing } = makeLanding({
    status: 'in_progress',
    resolveWriteSticks: false
  });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'bd_record_failed',
    step: null
  });
});

test('never reads the owned worktree HEAD to judge the landed head', async () => {
  const { landing, gitRun } = makeLanding({ worktreeHead: HEAD_SHA });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
  expect(gitRun).not.toHaveBeenCalledWith(['rev-parse', 'HEAD'], {
    cwd: `${REPO}/.worktrees/${BEAD}`
  });
});

test('accepts a worktree left at the dispatch base when the receipt head is contained', async () => {
  const { landing, gitRun } = makeLanding({
    worktreeHead: 'b'.repeat(40),
    containmentCode: 0
  });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
  expect(gitRun).toHaveBeenCalledWith(
    ['merge-base', '--is-ancestor', HEAD_SHA, FETCHED_SHA],
    { cwd: REPO }
  );
});

test('accepts a missing worktree when the receipt head is contained', async () => {
  const { landing } = makeLanding({ worktreeExists: false });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
});

test('accepts contained reviewed head', async () => {
  const { landing, gitRun } = makeLanding({ containmentCode: 0 });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
  expect(gitRun).toHaveBeenCalledWith(
    ['merge-base', '--is-ancestor', HEAD_SHA, FETCHED_SHA],
    { cwd: REPO }
  );
});

test('rejects reviewed head absent from fetched base', async () => {
  const { landing } = makeLanding({ containmentCode: 1 });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'push_not_contained',
    step: 'base_containment'
  });
});

test('delegates deployment with reviewed target and subject', async () => {
  const { landing, repoOperations } = makeLanding({
    config: { ok: true, present: true },
    deploy: { ok: true, inert: true }
  });

  await settle(landing);

  expect(repoOperations.hasConfig).toHaveBeenCalledWith(HEAD_SHA, {
    current_target_base: true
  });
  expect(repoOperations.ensureDeploy).toHaveBeenCalledWith({
    target_base: 'main',
    target_sha: HEAD_SHA,
    subjects: [{ bead_id: BEAD, merged_sha: HEAD_SHA }]
  });
});

test('pins deployment target when fetched base is ahead of reviewed head', async () => {
  const { landing, gitRun, repoOperations } = makeLanding({
    config: { ok: true, present: true },
    deploy: { ok: true, inert: true },
    containmentCode: 0
  });

  await settle(landing);

  expect(gitRun).toHaveBeenCalledWith(
    ['merge-base', '--is-ancestor', HEAD_SHA, FETCHED_SHA],
    { cwd: REPO }
  );
  expect(repoOperations.ensureDeploy).toHaveBeenCalledWith(
    expect.objectContaining({ target_sha: HEAD_SHA })
  );
});

test('skips deployment when repository config is absent', async () => {
  const { landing, repoOperations } = makeLanding({
    config: { ok: true, present: false }
  });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
  expect(repoOperations.ensureDeploy).not.toHaveBeenCalled();
});

test('propagates terminal deployment failure', async () => {
  const { landing } = makeLanding({
    config: { ok: true, present: true },
    deploy: {
      ok: true,
      inert: false,
      operation_id: 'deploy-1',
      timeout_ms: 500
    },
    evidence: { state: 'failed', code: 'deploy_script_failed' }
  });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'deploy_script_failed',
    step: 'repo_operations'
  });
});

test('cleans branch before closing parent', async () => {
  const { landing, calls } = makeLanding();

  await settle(landing);

  expect(calls.indexOf('store:update:branch_cleanup:null')).toBeLessThan(
    calls.indexOf('worktree:removeIfDiscardable')
  );
  expect(calls.indexOf('worktree:removeIfDiscardable')).toBeLessThan(
    calls.indexOf('store:update:parent_close:null')
  );
  expect(calls.indexOf('store:update:parent_close:null')).toBeLessThan(
    calls.indexOf('bd:setStatus:closed')
  );
});

test('removes the owned worktree against the fetched base that contains the head', async () => {
  const { landing, worktree } = makeLanding();

  await settle(landing);

  expect(worktree.removeIfDiscardable).toHaveBeenCalledWith({
    repo: REPO,
    bead_id: BEAD,
    base: FETCHED_SHA
  });
  expect(worktree.removeByBranch).not.toHaveBeenCalled();
});

test('fails closed when the owned worktree holds unique work', async () => {
  const { landing } = makeLanding({
    discardResult: { ok: false, removed: false, reason: 'unique' }
  });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'worktree_remove_failed',
    step: 'branch_cleanup'
  });
});

test('records premature close without rewriting Bead status', async () => {
  const { landing, bd } = makeLanding({ status: 'closed' });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'premature_close',
    step: null
  });
  expect(bd.setStatus).not.toHaveBeenCalled();
});

test('settles a refuted no-change close by removing residue only', async () => {
  const { landing, calls, bd, store, worktree, repoOperations } = makeLanding({
    status: 'closed',
    closeReason: 'refuted: 대상 파일이 base에서 이미 timeout을 선언한다'
  });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
  expect(worktree.removeIfDiscardable).toHaveBeenCalledWith({
    repo: REPO,
    bead_id: BEAD,
    base: FETCHED_SHA
  });
  expect(store.moveToDone).toHaveBeenCalledWith(
    WORKSPACE,
    expect.objectContaining({
      patch: expect.objectContaining({
        quickfix_landing: {
          cursor: 'no_change_close',
          head_sha: null,
          reason: null
        }
      })
    })
  );
  expect(bd.readMetadata).not.toHaveBeenCalled();
  expect(bd.setStatus).not.toHaveBeenCalled();
  expect(repoOperations.ensureDeploy).not.toHaveBeenCalled();
  expect(calls).not.toContain('worktree:removeByBranch');
});

test('rejects closed Bead whose close_reason is not the contract refuted form', async () => {
  const { landing, worktree, store } = makeLanding({
    status: 'closed',
    closeReason: 'done: landed manually'
  });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'premature_close',
    step: null
  });
  expect(worktree.removeIfDiscardable).not.toHaveBeenCalled();
  expect(store.moveToDone).not.toHaveBeenCalled();
});

test('rejects multi-line refuted close_reason', async () => {
  const { landing } = makeLanding({
    status: 'closed',
    closeReason: 'refuted: 첫 줄\n둘째 줄'
  });

  const result = await settle(landing);

  expect(result).toEqual({ ok: false, reason: 'premature_close', step: null });
});

test('preserves non-discardable residue on a refuted close', async () => {
  const { landing, store } = makeLanding({
    status: 'closed',
    closeReason: 'refuted: 근거',
    discardResult: { ok: false, removed: false, reason: 'unique' }
  });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'worktree_remove_failed',
    step: 'no_change_close'
  });
  expect(store.moveToDone).not.toHaveBeenCalled();
});

test('fails refuted close observably when base cannot be fetched', async () => {
  const { landing, worktree } = makeLanding({
    status: 'closed',
    closeReason: 'refuted: 근거',
    fetchCode: 1
  });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'containment_unobservable',
    step: 'no_change_close'
  });
  expect(worktree.removeIfDiscardable).not.toHaveBeenCalled();
});

test('resumes completed parent close without rewriting Bead status', async () => {
  const { landing, bd, store } = makeLanding({
    status: 'closed',
    landingProgress: {
      cursor: 'parent_close',
      head_sha: HEAD_SHA,
      reason: null
    }
  });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
  expect(store.moveToDone).toHaveBeenCalled();
  expect(bd.setStatus).not.toHaveBeenCalled();
});

test('resumes branch cleanup without a worktree', async () => {
  const { landing, gitRun, worktree } = makeLanding({
    worktreeExists: false,
    landingProgress: {
      cursor: 'branch_cleanup',
      head_sha: HEAD_SHA,
      reason: null
    }
  });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
  expect(gitRun).not.toHaveBeenCalledWith(['rev-parse', 'HEAD'], {
    cwd: `${REPO}/.worktrees/${BEAD}`
  });
  expect(worktree.removeIfDiscardable).toHaveBeenCalledWith({
    repo: REPO,
    bead_id: BEAD,
    base: FETCHED_SHA
  });
});

test('rejects receipt mismatch against durable branch cleanup head', async () => {
  const durable_head_sha = 'b'.repeat(40);
  const { landing } = makeLanding({
    worktreeExists: false,
    landingProgress: {
      cursor: 'branch_cleanup',
      head_sha: durable_head_sha,
      reason: null
    }
  });

  const result = await settle(landing);

  expect(result).toEqual({
    ok: false,
    reason: 'head_mismatch',
    step: null
  });
});

test('moves successful attempt to done', async () => {
  const { landing, store } = makeLanding();

  await settle(landing);

  expect(store.moveToDone).toHaveBeenCalledWith(WORKSPACE, {
    bead_id: BEAD,
    attempt_id: ATTEMPT,
    patch: {
      status: 'done',
      finished_at: 1234,
      quickfix_landing: {
        cursor: 'parent_close',
        head_sha: HEAD_SHA,
        reason: null
      }
    }
  });
});

test('records failure reason without moving attempt to done', async () => {
  const { landing, store } = makeLanding({ containmentCode: 1 });

  await settle(landing);

  expect(store.moveToDone).not.toHaveBeenCalled();
  expect(store.updateAttempt).toHaveBeenLastCalledWith(WORKSPACE, {
    attempt_id: ATTEMPT,
    patch: {
      quickfix_landing: {
        cursor: 'base_containment',
        head_sha: HEAD_SHA,
        reason: 'push_not_contained'
      }
    }
  });
});

test('preserves quickfix fields through queue normalization', () => {
  const state_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-qfl-'));
  temp_dirs.push(state_dir);
  const store = createQueueStore({
    filePathFor: () => path.join(state_dir, 'queue.json')
  });
  const progress = {
    cursor: /** @type {const} */ ('base_containment'),
    head_sha: HEAD_SHA,
    reason: null
  };

  store.appendAttempt(WORKSPACE, {
    expected_revision: store.snapshot(WORKSPACE).revision,
    attempt: {
      attempt_id: ATTEMPT,
      bead_id: BEAD,
      quickfix_lane: true,
      quickfix_landing: progress
    }
  });
  const attempt = store.snapshot(WORKSPACE).attempts[ATTEMPT];

  expect(attempt.quickfix_lane).toBe(true);
  expect(attempt.quickfix_landing).toEqual(progress);
});
