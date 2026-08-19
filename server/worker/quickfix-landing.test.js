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
 *   branchDeleteCode?: number,
 *   branchVerifyCode?: number,
 *   landingProgress?: { cursor: string, head_sha: string|null, reason: string|null }
 * }} [options]
 */
function makeLanding(options = {}) {
  /** @type {string[]} */
  const calls = [];
  let bead_status = options.status || 'resolved';
  const receipt = Object.hasOwn(options, 'receipt')
    ? options.receipt
    : `reviewer@${HEAD_SHA}`;

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
    setStatus: vi.fn(async (bead_id, status) => {
      calls.push(`bd:setStatus:${status}`);
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
    notifyChanged: () => calls.push('notify'),
    now: () => 1234
  });

  return { landing, calls, store, bd, gitRun, worktree, repoOperations };
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

test('accepts exact worktree HEAD', async () => {
  const { landing, gitRun } = makeLanding({ worktreeHead: HEAD_SHA });

  const result = await settle(landing);

  expect(result).toEqual({ ok: true });
  expect(gitRun).toHaveBeenCalledWith(['rev-parse', 'HEAD'], {
    cwd: `${REPO}/.worktrees/${BEAD}`
  });
});

test('rejects descendant worktree HEAD after reviewed commit', async () => {
  const { landing, gitRun } = makeLanding({
    worktreeHead: 'b'.repeat(40),
    containmentCode: 0
  });

  const result = await settle(landing);

  expect(result).toEqual({ ok: false, reason: 'head_mismatch', step: null });
  expect(gitRun).not.toHaveBeenCalledWith(
    ['merge-base', '--is-ancestor', HEAD_SHA, FETCHED_SHA],
    { cwd: REPO }
  );
});

test('rejects missing worktree', async () => {
  const { landing, gitRun } = makeLanding({ worktreeExists: false });

  const result = await settle(landing);

  expect(result).toEqual({ ok: false, reason: 'head_mismatch', step: null });
  expect(gitRun).not.toHaveBeenCalledWith(['rev-parse', 'HEAD'], {
    cwd: `${REPO}/.worktrees/${BEAD}`
  });
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
    calls.indexOf('worktree:removeByBranch')
  );
  expect(calls.indexOf('worktree:removeByBranch')).toBeLessThan(
    calls.indexOf('store:update:parent_close:null')
  );
  expect(calls.indexOf('store:update:parent_close:null')).toBeLessThan(
    calls.indexOf('bd:setStatus:closed')
  );
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
  const { landing, gitRun } = makeLanding({
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
