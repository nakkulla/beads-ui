import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createDiscardCoordinator } from './discard-coordinator.js';
import { createQueueStore } from './queue-store.js';

/** @type {string} */
let tmp;
/** @type {string} */
let workspace;

const HEAD_SHA = 'b'.repeat(40);
const MERGED_SHA = 'd'.repeat(40);
const PARENT_AUTHORITY = {
  spec_id: { present: true, value: 'spec-current' },
  plan_path: { present: true, value: 'docs/plan.md' },
  spec_review: { present: true, value: 'codex@spec' },
  plan_review: { present: true, value: 'codex@plan' },
  plan_approval: { present: true, value: 'user@plan' }
};

/**
 * @param {string} id
 * @param {string} parent
 */
function phaseChild(id, parent = 'UI-1') {
  return {
    id,
    status: 'resolved',
    metadata: { parent, plan_task_anchor: `anchor-${id}` }
  };
}

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-discard-'));
  process.env.XDG_STATE_HOME = path.join(tmp, 'state');
  workspace = path.join(tmp, 'workspace');
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp, { recursive: true, force: true });
});

/**
 * @param {{ prState?: string, closeRace?: boolean, closeReturnsError?: boolean, remoteAutoDeleteOnClose?: boolean, remoteChangesAfterClose?: boolean, worktreeChangesAfterArchive?: boolean, sourceAbsent?: boolean, localRefSha?: string, remoteRefSha?: string, attemptHeadSha?: string, fetchedPrHeadSha?: string, lsRemoteErrorAt?: number, actionInFlight?: () => boolean, schedulerCanDiscard?: boolean, processController?: any, revertBuilder?: any, verifyRevert?: any, rollbackBaseSync?: any, rollbackVerify?: any, gitRun?: any, phaseChildren?: Record<string, any>[], newChildAfterArchive?: Record<string, any>, parentAuthorityChangesAfterArchive?: boolean, partialDeleteOnce?: boolean, readbackFindFailsOnce?: boolean }} [options]
 */
function setup(options = {}) {
  const store = createQueueStore({ now: () => 100 });
  store.appendAttempt(workspace, {
    expected_revision: 0,
    attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
  });
  store.updateAttempt(workspace, {
    attempt_id: 'att-1',
    patch: {
      status: 'failed',
      repo: '/repo',
      target_base: 'main',
      base_oid: 'base-sha',
      head_oid: options.attemptHeadSha || HEAD_SHA,
      session_id: 'sid-1',
      verify_result: {
        pr_number: 304,
        pr_url: 'https://github.com/acme/repo/pull/304'
      }
    }
  });
  store.moveToPrWait(workspace, {
    bead_id: 'UI-1',
    attempt_id: 'att-1',
    patch: { status: 'done', finished_at: 90 }
  });
  /** @type {string[]} */
  const calls = [];
  let pr_state = options.prState || 'OPEN';
  let local_present = !options.sourceAbsent || !!options.localRefSha;
  let local_sha = options.localRefSha || HEAD_SHA;
  let remote_present = !options.sourceAbsent || !!options.remoteRefSha;
  let remote_sha = options.remoteRefSha || HEAD_SHA;
  let worktree_present = !options.sourceAbsent;
  let worktree_observations = 0;
  let ls_remote_calls = 0;
  let bead_status = 'resolved';
  /** @type {Record<string, any>[]} */
  let phase_children = [...(options.phaseChildren || [])];
  let partial_delete_pending = options.partialDeleteOnce === true;
  let deleted_children = false;
  let readback_find_failure_pending = options.readbackFindFailsOnce === true;
  const parent_issue = /** @type {Record<string, any>} */ ({
    id: 'UI-1',
    status: bead_status,
    spec_id: 'spec-current',
    metadata: {
      pr_url: 'https://github.com/acme/repo/pull/304',
      impl_review: 'codex@abc',
      last_checked_sha: HEAD_SHA,
      plan_path: 'docs/plan.md',
      spec_review: 'codex@spec',
      plan_review: 'codex@plan',
      plan_approval: 'user@plan'
    }
  });
  /** @type {string|null} */
  let pr_url = 'https://github.com/acme/repo/pull/304';
  const gh = {
    prDetail: vi.fn(async () => {
      calls.push(`gh:detail:${pr_state}`);
      return {
        state: 'ok',
        data: {
          number: 304,
          url: 'https://github.com/acme/repo/pull/304',
          state: pr_state,
          head_ref: 'UI-1',
          base_ref: 'main',
          head_sha: HEAD_SHA,
          merged_sha: pr_state === 'MERGED' ? 'merge-sha' : null
        }
      };
    }),
    closePr: vi.fn(async () => {
      calls.push('gh:close');
      pr_state = options.closeRace ? 'MERGED' : 'CLOSED';
      if (options.remoteAutoDeleteOnClose) {
        remote_present = false;
      }
      if (options.remoteChangesAfterClose) {
        remote_sha = 'c'.repeat(40);
      }
      return options.closeRace
        ? { state: 'error', reason: 'already_merged' }
        : options.closeReturnsError
          ? { state: 'error', reason: 'gh_failed_after_close' }
          : { state: 'ok', data: true };
    })
  };
  const bd = {
    readStatus: vi.fn(async () => {
      calls.push(`bd:status-read:${bead_status}`);
      return bead_status;
    }),
    setStatus: vi.fn(async (_id, status) => {
      calls.push(`bd:status:${status}`);
      bead_status = status;
      parent_issue.status = status;
    }),
    readMetadata: vi.fn(async () => {
      calls.push(`bd:pr-read:${pr_url === null ? 'null' : 'set'}`);
      return pr_url;
    }),
    unsetMetadata: vi.fn(async () => {
      calls.push('bd:pr-unset');
      pr_url = null;
      delete parent_issue.metadata.pr_url;
    }),
    setMetadata: vi.fn(async (_id, _key, value) => {
      calls.push('bd:pr-set');
      pr_url = value;
      parent_issue.metadata.pr_url = value;
    }),
    listChildren: vi.fn(async (bead_id) => {
      calls.push(`bd:children:${bead_id}`);
      return phase_children
        .filter((child) => child.metadata?.parent === bead_id)
        .map((child) => ({ id: child.id, status: child.status }));
    }),
    readIssue: vi.fn(async (bead_id) => {
      calls.push(`bd:issue:${bead_id}`);
      if (bead_id === 'UI-1') {
        return structuredClone(parent_issue);
      }
      const child = phase_children.find(
        (candidate) => candidate.id === bead_id
      );
      if (!child) {
        throw new Error('issue absent');
      }
      return structuredClone(child);
    }),
    findIssue: vi.fn(async (bead_id) => {
      calls.push(`bd:find:${bead_id}`);
      if (deleted_children && readback_find_failure_pending) {
        readback_find_failure_pending = false;
        throw new Error('readback unavailable');
      }
      const child = phase_children.find(
        (candidate) => candidate.id === bead_id
      );
      return child ? structuredClone(child) : null;
    }),
    deleteIssues: vi.fn(async (bead_ids) => {
      calls.push(`bd:delete:${bead_ids.join(',')}`);
      if (partial_delete_pending) {
        partial_delete_pending = false;
        deleted_children = true;
        phase_children = phase_children.filter(
          (child) => child.id !== bead_ids[0]
        );
        throw new Error('delete interrupted');
      }
      deleted_children = true;
      phase_children = phase_children.filter(
        (child) => !bead_ids.includes(child.id)
      );
    }),
    updateFields: vi.fn(async (_bead_id, input) => {
      calls.push('bd:update');
      if (input.status) {
        bead_status = input.status;
        parent_issue.status = input.status;
      }
      for (const key of input.unset || []) {
        delete parent_issue.metadata[key];
      }
    })
  };
  const worktree = {
    observeOwnedByBead: vi.fn(async () => {
      worktree_observations += 1;
      return {
        ok: true,
        present: worktree_present,
        path: worktree_present ? '/repo/.worktrees/UI-1' : null,
        branch: worktree_present ? 'UI-1' : null,
        head_sha:
          worktree_present &&
          options.worktreeChangesAfterArchive &&
          worktree_observations > 1
            ? 'c'.repeat(40)
            : worktree_present
              ? HEAD_SHA
              : null
      };
    }),
    removeByBranch: vi.fn(async (input) => {
      if (
        options.worktreeChangesAfterArchive &&
        input.expected_head === HEAD_SHA
      ) {
        return { ok: false, removed: false, reason: 'identity_changed' };
      }
      if (worktree_present) {
        calls.push('worktree:remove');
        worktree_present = false;
        return { ok: true, removed: true, reason: null };
      }
      return { ok: true, removed: false, reason: null };
    }),
    withTopologyLock: vi.fn(async (_repo, work) => work())
  };
  const defaultGitRun = vi.fn(async (args) => {
    const command = args.join(' ');
    calls.push(`git:${command}`);
    if (args[0] === 'rev-parse' && args[1] === '--verify') {
      return local_present
        ? { code: 0, stdout: `${local_sha}\n`, stderr: '' }
        : { code: 1, stdout: '', stderr: '' };
    }
    if (args[0] === 'fetch') {
      return { code: 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'rev-parse' && args[1] === 'FETCH_HEAD') {
      return {
        code: 0,
        stdout: `${options.fetchedPrHeadSha || HEAD_SHA}\n`,
        stderr: ''
      };
    }
    if (args[0] === 'cat-file' && args[1] === '-e') {
      return { code: 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'update-ref' && args[1] === '-d') {
      local_present = false;
      local_sha = HEAD_SHA;
      return { code: 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'ls-remote') {
      ls_remote_calls += 1;
      if (ls_remote_calls === options.lsRemoteErrorAt) {
        return { code: 1, stdout: '', stderr: 'network failed' };
      }
      return remote_present
        ? {
            code: 0,
            stdout: `${remote_sha}\trefs/heads/UI-1\n`,
            stderr: ''
          }
        : { code: 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'push') {
      remote_present = false;
      return { code: 0, stdout: '', stderr: '' };
    }
    return { code: 0, stdout: '', stderr: '' };
  });
  const gitRun = options.gitRun || defaultGitRun;
  const scheduler = {
    canDiscardAttempt: vi.fn(() => options.schedulerCanDiscard ?? true),
    fenceDiscardAttempt: vi.fn(() => true),
    finalizeDiscardAttempt: vi.fn(async () => ({ ok: true })),
    tick: vi.fn(async () => {})
  };
  const archive = {
    create: vi.fn(() => {
      calls.push('archive');
      if (options.newChildAfterArchive) {
        phase_children.push(options.newChildAfterArchive);
      }
      if (options.parentAuthorityChangesAfterArchive) {
        parent_issue.metadata.plan_approval = 'user@new-plan';
      }
      return {
        ok: true,
        receipt: {
          path: '/state/archive',
          manifest_sha256: 'a'.repeat(64),
          verified_at: 200
        }
      };
    }),
    createCommittedSource: vi.fn(() => {
      calls.push('archive:committed-source');
      return {
        ok: true,
        receipt: {
          path: '/state/committed-source-archive',
          manifest_sha256: 'b'.repeat(64),
          verified_at: 200
        }
      };
    })
  };
  const coordinator = createDiscardCoordinator({
    workspace,
    repo: '/repo',
    store,
    gh,
    bd,
    worktree,
    gitRun,
    scheduler,
    archive,
    processController: options.processController || {},
    sessionLog: { pathFor: () => '/state/session.jsonl' },
    revertBuilder: options.revertBuilder,
    verifyRevert: options.verifyRevert,
    actionInFlight: options.actionInFlight,
    rollbackBaseSync:
      options.rollbackBaseSync ||
      vi.fn(async () => ({ ok: true, sha: 'base-sha' })),
    rollbackVerify: options.rollbackVerify || vi.fn(async () => ({ ok: true })),
    makeOperationId: () => 'discard-1',
    now: () => 300,
    notifyChanged: vi.fn()
  });
  return {
    store,
    calls,
    gh,
    bd,
    worktree,
    gitRun,
    scheduler,
    archive,
    coordinator
  };
}

describe('worker discard coordinator unmerged lifecycle', () => {
  test('persists a closed revert PR state before recording the failure', async () => {
    const env = setup({ prState: 'CLOSED' });
    env.store.createDiscardOperation(workspace, {
      expected_revision: env.store.snapshot(workspace).revision,
      operation: {
        operation_id: 'discard-closed-revert',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: { repo: '/repo' }
      }
    });
    env.store.advanceDiscardOperation(workspace, {
      operation_id: 'discard-closed-revert',
      expected_phase: 'requested',
      next_phase: 'revert_pr_wait',
      patch: {
        mode: 'merged_revert',
        revert_pr: {
          number: 404,
          url: 'https://github.com/acme/repo/pull/404',
          branch: 'revert-UI-1-op',
          head_sha: HEAD_SHA,
          target_base: 'main',
          state: 'OPEN'
        }
      }
    });
    env.gh.prDetail.mockResolvedValue({
      state: 'ok',
      data: {
        number: 404,
        url: 'https://github.com/acme/repo/pull/404',
        state: 'CLOSED',
        head_ref: 'revert-UI-1-op',
        base_ref: 'main',
        head_sha: HEAD_SHA,
        merged_sha: null
      }
    });

    await env.coordinator.recover();

    expect(
      env.store.snapshot(workspace).discard_operations['discard-closed-revert']
    ).toMatchObject({
      phase: 'revert_pr_wait',
      last_error: 'revert_pr_closed_unmerged',
      revert_pr: { state: 'CLOSED', merged_sha: null }
    });
  });

  test('persists a merged revert PR state before rollback failure', async () => {
    const env = setup({
      prState: 'MERGED',
      rollbackBaseSync: vi.fn(async () => ({
        ok: false,
        reason: 'base_sync_failed'
      }))
    });
    env.store.createDiscardOperation(workspace, {
      expected_revision: env.store.snapshot(workspace).revision,
      operation: {
        operation_id: 'discard-merged-revert',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: { repo: '/repo' }
      }
    });
    env.store.advanceDiscardOperation(workspace, {
      operation_id: 'discard-merged-revert',
      expected_phase: 'requested',
      next_phase: 'revert_pr_wait',
      patch: {
        mode: 'merged_revert',
        original_pr: { base_ref: 'main' },
        revert_pr: {
          number: 404,
          url: 'https://github.com/acme/repo/pull/404',
          branch: 'revert-UI-1-op',
          head_sha: HEAD_SHA,
          target_base: 'main',
          state: 'OPEN'
        }
      }
    });
    env.gh.prDetail.mockResolvedValue({
      state: 'ok',
      data: {
        number: 404,
        url: 'https://github.com/acme/repo/pull/404',
        state: 'MERGED',
        head_ref: 'revert-UI-1-op',
        base_ref: 'main',
        head_sha: HEAD_SHA,
        merged_sha: MERGED_SHA
      }
    });

    await env.coordinator.recover();

    expect(
      env.store.snapshot(workspace).discard_operations['discard-merged-revert']
    ).toMatchObject({
      phase: 'rollback_base_sync',
      last_error: 'rollback_base_sync_failed:base_sync_failed',
      revert_pr: { state: 'MERGED', merged_sha: MERGED_SHA }
    });
  });

  test('refuses a merged revert PR whose persisted head identity changed', async () => {
    const env = setup({ prState: 'MERGED' });
    env.store.createDiscardOperation(workspace, {
      expected_revision: env.store.snapshot(workspace).revision,
      operation: {
        operation_id: 'discard-drift',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: { repo: '/repo' }
      }
    });
    env.store.advanceDiscardOperation(workspace, {
      operation_id: 'discard-drift',
      expected_phase: 'requested',
      next_phase: 'revert_pr_wait',
      patch: {
        mode: 'merged_revert',
        original_pr: { base_ref: 'main' },
        revert_pr: {
          number: 404,
          url: 'https://github.com/acme/repo/pull/404',
          branch: 'revert-UI-1-op',
          head_sha: HEAD_SHA,
          target_base: 'main'
        }
      }
    });
    env.gh.prDetail.mockResolvedValue({
      state: 'ok',
      data: {
        number: 404,
        url: 'https://github.com/acme/repo/pull/404',
        state: 'MERGED',
        head_ref: 'revert-UI-1-op',
        base_ref: 'main',
        head_sha: 'c'.repeat(40),
        merged_sha: MERGED_SHA
      }
    });

    await env.coordinator.recover();

    expect(
      env.store.snapshot(workspace).discard_operations['discard-drift']
    ).toMatchObject({
      phase: 'revert_pr_wait',
      last_error: 'revert_pr_identity_changed'
    });
    expect(env.worktree.removeByBranch).not.toHaveBeenCalled();
  });

  test.each([
    ['rollback_source_cleanup', 'worktree:remove'],
    [
      'rollback_source_local_removed',
      `git:update-ref -d refs/heads/UI-1 ${HEAD_SHA}`
    ],
    [
      'rollback_source_remote_removed',
      `git:push --force-with-lease=refs/heads/UI-1:${HEAD_SHA} origin :refs/heads/UI-1`
    ],
    [
      'rollback_revert_local_removed',
      `git:update-ref -d refs/heads/revert-UI-1-op ${HEAD_SHA}`
    ],
    [
      'rollback_revert_remote_removed',
      `git:push --force-with-lease=refs/heads/revert-UI-1-op:${HEAD_SHA} origin :refs/heads/revert-UI-1-op`
    ]
  ])(
    'reconciles a crash after the %s side effect without repeating the mutation',
    async (phase, side_effect) => {
      const env = setup();
      env.store.createDiscardOperation(workspace, {
        expected_revision: env.store.snapshot(workspace).revision,
        operation: {
          operation_id: 'discard-rollback-crash',
          bead_id: 'UI-1',
          attempt_id: 'att-1',
          source_snapshot: {
            repo: '/repo',
            worktree: '/repo/.worktrees/UI-1',
            branch: 'UI-1',
            source_head: HEAD_SHA,
            local_branch_sha: HEAD_SHA,
            remote_branch_sha: HEAD_SHA,
            phase_children: [],
            parent_authority: PARENT_AUTHORITY
          }
        }
      });
      env.store.advanceDiscardOperation(workspace, {
        operation_id: 'discard-rollback-crash',
        expected_phase: 'requested',
        next_phase: phase,
        patch: {
          mode: 'merged_revert',
          original_pr: { base_ref: 'main' },
          revert_pr: {
            number: 404,
            url: 'https://github.com/acme/repo/pull/404',
            branch: 'revert-UI-1-op',
            head_sha: HEAD_SHA,
            target_base: 'main'
          }
        }
      });
      const advance = env.store.advanceDiscardOperation.bind(env.store);
      let injected = false;
      vi.spyOn(env.store, 'advanceDiscardOperation').mockImplementation(
        (ws, input) => {
          if (!injected && input.expected_phase === phase) {
            injected = true;
            return {
              ok: false,
              conflict: false,
              queue: env.store.snapshot(ws)
            };
          }
          return advance(ws, input);
        }
      );

      await env.coordinator.recover();
      const retried = await env.coordinator.retry('discard-rollback-crash');

      expect(retried).toMatchObject({ ok: true });
      expect(env.calls.filter((call) => call === side_effect)).toHaveLength(1);
      expect(
        env.store.snapshot(workspace).discard_operations[
          'discard-rollback-crash'
        ].phase
      ).toBe('done');
    }
  );

  test('resumes after a crash following revert PR readback without recreating the PR', async () => {
    const env = setup();
    const created = env.store.createDiscardOperation(workspace, {
      expected_revision: env.store.snapshot(workspace).revision,
      operation: {
        operation_id: 'discard-revert-worktree',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: { repo: '/repo', pr: { number: 304 } }
      }
    });
    expect(created.ok).toBe(true);
    env.store.advanceDiscardOperation(workspace, {
      operation_id: 'discard-revert-worktree',
      expected_phase: 'requested',
      next_phase: 'revert_pr_created',
      patch: {
        mode: 'merged_revert',
        revert_pr: {
          number: 404,
          url: 'https://github.com/acme/repo/pull/404',
          branch: 'revert-UI-1-op',
          worktree: '/tmp/revert-UI-1-op',
          head_sha: HEAD_SHA
        }
      }
    });

    await env.coordinator.recover();

    expect(
      env.store.snapshot(workspace).discard_operations[
        'discard-revert-worktree'
      ]
    ).toMatchObject({ phase: 'revert_pr_wait' });
    expect(env.bd.setMetadata).toHaveBeenCalledTimes(1);
  });

  test('reuses the exact local revert commit after a crash before phase persistence', async () => {
    const base_sha = 'a'.repeat(40);
    const tree_sha = 'e'.repeat(40);
    const revert_sha = 'f'.repeat(40);
    let head_sha = base_sha;
    /** @type {string|null} */
    let remote_sha = null;
    const gitRun = vi.fn(async (args) => {
      if (args[0] === 'symbolic-ref') {
        return { code: 0, stdout: 'revert-UI-1-op\n', stderr: '' };
      }
      if (args[0] === 'rev-parse' && args[1] === 'HEAD') {
        return { code: 0, stdout: `${head_sha}\n`, stderr: '' };
      }
      if (args[0] === 'rev-parse' && args[1] === 'HEAD^') {
        return { code: 0, stdout: `${base_sha}\n`, stderr: '' };
      }
      if (args[0] === 'rev-parse' && args[1] === 'HEAD^{tree}') {
        return { code: 0, stdout: `${tree_sha}\n`, stderr: '' };
      }
      if (args[0] === 'status') {
        return { code: 0, stdout: '', stderr: '' };
      }
      if (args[0] === 'log') {
        return {
          code: 0,
          stdout: 'Revert UI-1\n\nDiscard operation: discard-local\n',
          stderr: ''
        };
      }
      if (args[0] === 'write-tree') {
        return { code: 0, stdout: `${tree_sha}\n`, stderr: '' };
      }
      if (args[0] === 'commit') {
        head_sha = revert_sha;
        return { code: 0, stdout: '', stderr: '' };
      }
      if (args[0] === 'ls-remote') {
        return remote_sha === null
          ? { code: 0, stdout: '', stderr: '' }
          : {
              code: 0,
              stdout: `${remote_sha}\trefs/heads/revert-UI-1-op\n`,
              stderr: ''
            };
      }
      if (args[0] === 'push') {
        remote_sha = revert_sha;
        return { code: 0, stdout: '', stderr: '' };
      }
      return { code: 0, stdout: '', stderr: '' };
    });
    const verifyRevert = vi.fn(async () => ({ ok: true }));
    const env = setup({ gitRun, verifyRevert });
    env.store.createDiscardOperation(workspace, {
      expected_revision: env.store.snapshot(workspace).revision,
      operation: {
        operation_id: 'discard-local',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: { repo: '/repo' }
      }
    });
    env.store.advanceDiscardOperation(workspace, {
      operation_id: 'discard-local',
      expected_phase: 'requested',
      next_phase: 'revert_local_prepared',
      patch: {
        mode: 'merged_revert',
        original_pr: { url: 'https://github.com/acme/repo/pull/304' },
        revert_pr: {
          branch: 'revert-UI-1-op',
          worktree: '/state/revert-UI-1-op',
          base_sha,
          tree_sha,
          target_base: 'main'
        }
      }
    });
    const advance = env.store.advanceDiscardOperation.bind(env.store);
    let injected = false;
    vi.spyOn(env.store, 'advanceDiscardOperation').mockImplementation(
      (ws, input) => {
        if (!injected && input.expected_phase === 'revert_local_prepared') {
          injected = true;
          return {
            ok: false,
            conflict: false,
            queue: env.store.snapshot(ws)
          };
        }
        return advance(ws, input);
      }
    );

    await env.coordinator.recover();
    await env.coordinator.retry('discard-local');

    expect(
      gitRun.mock.calls.filter(([args]) => args[0] === 'commit')
    ).toHaveLength(1);
    expect(verifyRevert).toHaveBeenCalledTimes(2);
    expect(
      env.store.snapshot(workspace).discard_operations['discard-local']
    ).toMatchObject({
      phase: 'revert_remote_pushed',
      revert_pr: { head_sha: revert_sha }
    });
  });

  test('rebuilds only an exact deterministic prepare residue after a phase crash', async () => {
    const target_sha = 'a'.repeat(40);
    const tree_sha = 'e'.repeat(40);
    let worktree_present = false;
    let local_present = false;
    let worktree_path = '';
    let branch = '';
    const gitRun = vi.fn(async (args) => {
      if (args[0] === 'ls-remote') {
        return { code: 0, stdout: '', stderr: '' };
      }
      if (args[0] === 'worktree' && args[1] === 'list') {
        return {
          code: 0,
          stdout: worktree_present
            ? `worktree ${worktree_path}\nHEAD ${target_sha}\nbranch refs/heads/${branch}\n\n`
            : '',
          stderr: ''
        };
      }
      if (args[0] === 'worktree' && args[1] === 'remove') {
        worktree_present = false;
        return { code: 0, stdout: '', stderr: '' };
      }
      if (args[0] === 'rev-parse' && args[1] === '--verify') {
        return local_present
          ? { code: 0, stdout: `${target_sha}\n`, stderr: '' }
          : { code: 1, stdout: '', stderr: '' };
      }
      if (args[0] === 'update-ref') {
        local_present = false;
        return { code: 0, stdout: '', stderr: '' };
      }
      return { code: 0, stdout: '', stderr: '' };
    });
    const revertBuilder = {
      prepare: vi.fn(async (input) => {
        worktree_path = input.worktree;
        branch = input.branch;
        worktree_present = true;
        local_present = true;
        return {
          ok: true,
          worktree: input.worktree,
          branch: input.branch,
          base_sha: target_sha,
          tree_sha
        };
      })
    };
    const env = setup({
      gitRun,
      revertBuilder,
      verifyRevert: vi.fn(async () => ({ ok: true }))
    });
    env.store.createDiscardOperation(workspace, {
      expected_revision: env.store.snapshot(workspace).revision,
      operation: {
        operation_id: 'discard-prepare',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: { repo: '/repo' }
      }
    });
    env.store.advanceDiscardOperation(workspace, {
      operation_id: 'discard-prepare',
      expected_phase: 'requested',
      next_phase: 'revert_source_observed',
      patch: {
        mode: 'merged_revert',
        original_pr: { base_ref: 'main' },
        receipts: {
          revert_source_observed: {
            target_base: 'main',
            target_sha
          }
        }
      }
    });
    const advance = env.store.advanceDiscardOperation.bind(env.store);
    let injected = false;
    vi.spyOn(env.store, 'advanceDiscardOperation').mockImplementation(
      (ws, input) => {
        if (!injected && input.expected_phase === 'revert_source_observed') {
          injected = true;
          return {
            ok: false,
            conflict: false,
            queue: env.store.snapshot(ws)
          };
        }
        return advance(ws, input);
      }
    );

    await env.coordinator.recover();
    await env.coordinator.retry('discard-prepare');

    expect(revertBuilder.prepare).toHaveBeenCalledTimes(2);
    expect(
      gitRun.mock.calls.filter(
        ([args]) => args[0] === 'worktree' && args[1] === 'remove'
      )
    ).toHaveLength(1);
    expect(
      gitRun.mock.calls.filter(([args]) => args[0] === 'update-ref')
    ).toHaveLength(1);
    expect(
      env.store.snapshot(workspace).discard_operations['discard-prepare']
    ).toMatchObject({ phase: 'revert_local_prepared' });
  });

  test('keeps the revert PR and operation when exact worktree removal fails', async () => {
    const gitRun = vi.fn(async (args) => {
      if (args[0] === 'worktree' && args[1] === 'list') {
        return {
          code: 0,
          stdout: `worktree /tmp/revert-UI-1-op\nHEAD ${HEAD_SHA}\nbranch refs/heads/revert-UI-1-op\n\n`,
          stderr: ''
        };
      }
      if (args[0] === 'rev-parse') {
        return { code: 0, stdout: `${HEAD_SHA}\n`, stderr: '' };
      }
      if (args[0] === 'worktree' && args[1] === 'remove') {
        return { code: 1, stdout: '', stderr: 'busy' };
      }
      return { code: 0, stdout: '', stderr: '' };
    });
    const env = setup({ gitRun });
    env.store.createDiscardOperation(workspace, {
      expected_revision: env.store.snapshot(workspace).revision,
      operation: {
        operation_id: 'discard-revert-failure',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: { repo: '/repo', pr: { number: 304 } }
      }
    });
    env.store.advanceDiscardOperation(workspace, {
      operation_id: 'discard-revert-failure',
      expected_phase: 'requested',
      next_phase: 'revert_pr_created',
      patch: {
        mode: 'merged_revert',
        revert_pr: {
          number: 404,
          url: 'https://github.com/acme/repo/pull/404',
          branch: 'revert-UI-1-op',
          worktree: '/tmp/revert-UI-1-op',
          head_sha: HEAD_SHA
        }
      }
    });

    await env.coordinator.recover();

    expect(
      env.store.snapshot(workspace).discard_operations['discard-revert-failure']
    ).toMatchObject({
      phase: 'revert_pr_created',
      last_error: 'revert_worktree_remove_failed'
    });
    expect(env.bd.setMetadata).not.toHaveBeenCalled();
  });

  test('archives before cleanup and completes the exact destructive order', async () => {
    const env = setup();
    const revision = env.store.snapshot(workspace).revision;

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      expected_revision: revision
    });

    expect(result).toMatchObject({ ok: true, operation_id: 'discard-1' });
    const archive_at = env.calls.indexOf('archive');
    const close_at = env.calls.indexOf('gh:close');
    const worktree_at = env.calls.indexOf('worktree:remove');
    const bd_at = env.calls.indexOf('bd:update');
    expect(archive_at).toBeGreaterThanOrEqual(0);
    expect(archive_at).toBeLessThan(close_at);
    expect(close_at).toBeLessThan(worktree_at);
    expect(worktree_at).toBeLessThan(bd_at);
    expect(
      env.store.snapshot(workspace).discard_operations['discard-1']
    ).toMatchObject({
      phase: 'done',
      mode: 'unmerged',
      backup: { path: '/state/archive' }
    });
    expect(env.store.snapshot(workspace).pr_wait).toEqual([]);
    expect(env.scheduler.finalizeDiscardAttempt).toHaveBeenCalledWith(
      workspace,
      'att-1'
    );
    expect(env.worktree.withTopologyLock).toHaveBeenCalledTimes(3);
  });

  test('archives complete direct phase child JSON before mutation', async () => {
    const child = {
      id: 'UI-1.1',
      status: 'in_progress',
      metadata: { parent: 'UI-1', plan_task_anchor: 'phase-1' },
      description: 'original phase child'
    };
    const env = setup({ phaseChildren: [child] });

    await env.coordinator.discard({
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(env.archive.create).toHaveBeenCalledWith(
      expect.objectContaining({
        source_snapshot: expect.objectContaining({
          phase_children: [child],
          parent_authority: expect.objectContaining({
            spec_id: { present: true, value: 'spec-current' },
            plan_path: { present: true, value: 'docs/plan.md' }
          })
        })
      })
    );
  });

  test('deletes snapshotted phase children after archive and git cleanup', async () => {
    const env = setup({
      phaseChildren: [
        {
          id: 'UI-1.1',
          status: 'resolved',
          metadata: { parent: 'UI-1', plan_task_anchor: 'phase-1' }
        }
      ]
    });

    await env.coordinator.discard({
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(env.bd.deleteIssues).toHaveBeenCalledWith(['UI-1.1']);
    expect(env.calls.indexOf('archive')).toBeLessThan(
      env.calls.indexOf('bd:delete:UI-1.1')
    );
    expect(env.calls.indexOf('worktree:remove')).toBeLessThan(
      env.calls.indexOf('bd:delete:UI-1.1')
    );
  });

  test('rejects a nested phase child before creating the archive', async () => {
    const env = setup({
      phaseChildren: [phaseChild('UI-1.1'), phaseChild('UI-1.1.1', 'UI-1.1')]
    });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({ ok: false, reason: 'phase_child_nested' });
    expect(env.archive.create).not.toHaveBeenCalled();
    expect(env.worktree.removeByBranch).not.toHaveBeenCalled();
  });

  test('rejects a direct child missing its phase anchor before mutation', async () => {
    const env = setup({
      phaseChildren: [
        {
          id: 'UI-1.1',
          status: 'resolved',
          metadata: { parent: 'UI-1' }
        }
      ]
    });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'phase_child_snapshot_failed'
    });
    expect(env.archive.create).not.toHaveBeenCalled();
  });

  test('stops before delete when a new direct child appears after snapshot', async () => {
    const env = setup({
      phaseChildren: [phaseChild('UI-1.1')],
      newChildAfterArchive: phaseChild('UI-1.2')
    });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'phase_child_set_changed'
    });
    expect(env.bd.deleteIssues).not.toHaveBeenCalled();
  });

  test('retries only phase children remaining after partial deletion', async () => {
    const env = setup({
      phaseChildren: [phaseChild('UI-1.1'), phaseChild('UI-1.2')],
      partialDeleteOnce: true
    });

    const first = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });
    const retry = await env.coordinator.retry('discard-1');

    expect(first).toMatchObject({
      ok: false,
      reason: 'phase_children_delete_failed'
    });
    expect(retry).toMatchObject({ ok: true });
    expect(env.bd.deleteIssues.mock.calls).toEqual([
      [['UI-1.1', 'UI-1.2']],
      [['UI-1.2']]
    ]);
  });

  test('resets parent implementation state without changing approval authority', async () => {
    const env = setup({ phaseChildren: [phaseChild('UI-1.1')] });

    await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    const parent = await env.bd.readIssue('UI-1');

    expect(env.bd.updateFields).toHaveBeenCalledWith('UI-1', {
      status: 'open',
      unset: ['pr_url', 'impl_review', 'last_checked_sha']
    });
    expect(parent.status).toBe('open');
    expect(parent.metadata).not.toHaveProperty('pr_url');
    expect(parent.metadata).not.toHaveProperty('impl_review');
    expect(parent.metadata).not.toHaveProperty('last_checked_sha');
    expect(parent.spec_id).toBe('spec-current');
    expect(parent.metadata.plan_path).toBe('docs/plan.md');
    expect(parent.metadata.spec_review).toBe('codex@spec');
    expect(parent.metadata.plan_review).toBe('codex@plan');
    expect(parent.metadata.plan_approval).toBe('user@plan');
  });

  test('stops parent reset when preserved authority changed after snapshot', async () => {
    const env = setup({
      phaseChildren: [phaseChild('UI-1.1')],
      parentAuthorityChangesAfterArchive: true
    });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'bd_parent_authority_changed'
    });
    expect(env.bd.updateFields).not.toHaveBeenCalled();
  });

  test('uses child deletion and readback before merged-revert finalization', async () => {
    const env = setup({ phaseChildren: [phaseChild('UI-1.1')] });
    env.store.createDiscardOperation(workspace, {
      expected_revision: env.store.snapshot(workspace).revision,
      operation: {
        operation_id: 'discard-merged-delete',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: {
          repo: '/repo',
          phase_children: [phaseChild('UI-1.1')],
          parent_authority: PARENT_AUTHORITY
        }
      }
    });
    env.store.advanceDiscardOperation(workspace, {
      operation_id: 'discard-merged-delete',
      expected_phase: 'requested',
      next_phase: 'rollback_revert_remote_removed',
      patch: {
        mode: 'merged_revert',
        revert_pr: { branch: 'revert-UI-1-op', head_sha: HEAD_SHA }
      }
    });

    await env.coordinator.recover();

    expect(env.bd.deleteIssues).toHaveBeenCalledWith(['UI-1.1']);
    expect(env.bd.findIssue).toHaveBeenCalledWith('UI-1.1');
    expect(
      env.store.snapshot(workspace).discard_operations['discard-merged-delete']
    ).toMatchObject({ phase: 'done' });
  });

  test('preserves the operation and archive when child readback fails', async () => {
    const env = setup({
      phaseChildren: [phaseChild('UI-1.1')],
      readbackFindFailsOnce: true
    });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });
    const repeated = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });
    const operation =
      env.store.snapshot(workspace).discard_operations['discard-1'];

    expect(result).toMatchObject({
      ok: false,
      reason: 'phase_children_readback_failed'
    });
    expect(operation).toMatchObject({
      phase: 'remote_ref_removed',
      backup: { path: '/state/archive' },
      last_error: 'phase_children_readback_failed'
    });
    expect(repeated).toMatchObject({ ok: true, reused: true });
  });

  test('fails closed when a legacy merged-revert operation lacks a child snapshot', async () => {
    const env = setup();
    env.store.createDiscardOperation(workspace, {
      expected_revision: env.store.snapshot(workspace).revision,
      operation: {
        operation_id: 'discard-legacy-merged',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: { repo: '/repo' }
      }
    });
    env.store.advanceDiscardOperation(workspace, {
      operation_id: 'discard-legacy-merged',
      expected_phase: 'requested',
      next_phase: 'rollback_bead_opened',
      patch: { mode: 'merged_revert' }
    });

    await env.coordinator.recover();

    expect(
      env.store.snapshot(workspace).discard_operations['discard-legacy-merged']
    ).toMatchObject({
      phase: 'rollback_bead_opened',
      last_error: 'phase_child_snapshot_missing'
    });
    expect(env.bd.updateFields).not.toHaveBeenCalled();
  });

  test('switches an OPEN-close race to merged revert without deleting anything', async () => {
    const env = setup({ closeRace: true });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({ ok: true, pending: 'merged_revert' });
    expect(
      env.store.snapshot(workspace).discard_operations['discard-1']
    ).toMatchObject({
      phase: 'merged_revert',
      mode: 'merged_revert'
    });
    expect(env.worktree.removeByBranch).not.toHaveBeenCalled();
    expect(env.bd.setStatus).not.toHaveBeenCalled();
  });

  test('returns the active operation for a duplicate click', async () => {
    const env = setup({ prState: 'MERGED' });
    const first = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    const second = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(first).toMatchObject({ pending: 'merged_revert' });
    expect(second).toMatchObject({
      ok: true,
      reused: true,
      operation_id: 'discard-1'
    });
    expect(env.archive.create).toHaveBeenCalledTimes(1);
  });

  test('recovers a persisted post-close phase without closing the PR twice', async () => {
    const env = setup({ prState: 'CLOSED' });
    const started = env.store.createDiscardOperation(workspace, {
      expected_revision: env.store.snapshot(workspace).revision,
      operation: {
        operation_id: 'discard-1',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: {
          repo: '/repo',
          workspace,
          worktree: '/repo/.worktrees/UI-1',
          branch: 'UI-1',
          target_base: 'main',
          source_head: HEAD_SHA,
          local_branch_sha: HEAD_SHA,
          remote_branch_sha: HEAD_SHA,
          phase_children: [],
          parent_authority: PARENT_AUTHORITY,
          pr: { number: 304 }
        }
      }
    });
    env.store.advanceDiscardOperation(workspace, {
      operation_id: 'discard-1',
      expected_phase: 'requested',
      next_phase: 'pr_closed',
      patch: {
        mode: 'unmerged',
        backup: {
          path: '/state/archive',
          manifest_sha256: 'a'.repeat(64),
          verified_at: 200
        }
      }
    });
    expect(started.ok).toBe(true);

    await env.coordinator.recover();

    expect(env.gh.closePr).not.toHaveBeenCalled();
    expect(
      env.store.snapshot(workspace).discard_operations['discard-1'].phase
    ).toBe('done');
  });

  test('accepts a failed close command when the authoritative readback is CLOSED', async () => {
    const env = setup({ closeReturnsError: true });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({ ok: true });
    expect(env.gh.closePr).toHaveBeenCalledTimes(1);
  });

  test('skips PR mutation when the worker attempt has no PR', async () => {
    const env = setup();
    env.store.updateAttempt(workspace, {
      attempt_id: 'att-1',
      patch: { verify_result: null }
    });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({ ok: true });
    expect(env.gh.prDetail).not.toHaveBeenCalled();
    expect(env.gh.closePr).not.toHaveBeenCalled();
  });

  test('refuses a normal external PR row without a worker attempt', async () => {
    const env = setup();
    const store = createQueueStore({ now: () => 100 });
    const external_workspace = `${workspace}-external`;
    const coordinator = createDiscardCoordinator({
      workspace: external_workspace,
      repo: '/repo',
      store,
      gh: env.gh,
      bd: env.bd,
      worktree: env.worktree,
      gitRun: env.gitRun,
      scheduler: env.scheduler,
      archive: env.archive,
      processController: {},
      sessionLog: { pathFor: () => '/state/session.jsonl' },
      external: {
        get: () => ({
          bead_id: 'UI-1',
          pr_url: 'https://github.com/acme/repo/pull/304',
          pr_number: 304
        })
      },
      makeOperationId: () => 'discard-external',
      now: () => 300
    });

    const result = await coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: store.snapshot(external_workspace).revision
    });

    expect(result).toEqual({
      ok: false,
      conflict: false,
      reason: 'attempt_not_found'
    });
    expect(store.snapshot(external_workspace).discard_operations).toEqual({});
    expect(env.gh.closePr).not.toHaveBeenCalled();
    expect(env.archive.create).not.toHaveBeenCalled();
    expect(env.scheduler.finalizeDiscardAttempt).not.toHaveBeenCalled();
  });

  test('uses the legacy pid identity before archiving a running attempt', async () => {
    const processController = {
      probe: vi.fn(() => ({ state: 'owned' })),
      signal: vi.fn(() => ({ ok: true, state: 'owned' })),
      terminate: vi.fn(async () => ({ ok: true, state: 'gone' }))
    };
    const env = setup({ processController });
    env.store.updateAttempt(workspace, {
      attempt_id: 'att-1',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1_000,
        process_identity: null
      }
    });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({ ok: true });
    expect(
      env.store.snapshot(workspace).discard_operations['discard-1']
    ).toMatchObject({
      process_identity: { pid: 4242, pgid: 4242, started_at: 1_000 }
    });
    expect(processController.signal).toHaveBeenCalledWith(
      { pid: 4242, pgid: 4242, started_at: 1_000 },
      'SIGSTOP'
    );
    expect(processController.terminate).toHaveBeenCalledWith({
      pid: 4242,
      pgid: 4242,
      started_at: 1_000
    });
  });

  test('refuses a running attempt whose process identity is unavailable', async () => {
    const env = setup();
    env.store.updateAttempt(workspace, {
      attempt_id: 'att-1',
      patch: {
        status: 'running',
        pid: null,
        process_identity: null
      }
    });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toEqual({
      ok: false,
      conflict: false,
      reason: 'identity_unknown'
    });
    expect(env.store.snapshot(workspace).discard_operations).toEqual({});
    expect(env.archive.create).not.toHaveBeenCalled();
  });

  test('accepts a branch GitHub auto-deleted after PR close', async () => {
    const env = setup({ remoteAutoDeleteOnClose: true });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({ ok: true });
    expect(env.calls.some((call) => call.startsWith('git:push '))).toBe(false);
  });

  test('preserves a worktree whose head changed after the archive snapshot', async () => {
    const env = setup({ worktreeChangesAfterArchive: true });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({
      ok: false,
      phase: 'pr_closed',
      reason: 'worktree_identity_changed'
    });
    expect(env.worktree.removeByBranch).toHaveBeenCalledWith({
      repo: '/repo',
      branch: 'UI-1',
      expected_path: '/repo/.worktrees/UI-1',
      expected_head: HEAD_SHA
    });
    expect(env.calls).not.toContain('worktree:remove');
  });

  test('preserves a remote branch whose head changed after PR close', async () => {
    const env = setup({ remoteChangesAfterClose: true });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({
      ok: false,
      phase: 'local_ref_removed',
      reason: 'remote_ref_changed'
    });
    expect(env.calls.some((call) => call.startsWith('git:push '))).toBe(false);
  });

  test('fails closed when remote ref observation errors during cleanup', async () => {
    const env = setup({ lsRemoteErrorAt: 2 });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({
      ok: false,
      phase: 'local_ref_removed',
      reason: 'remote_ref_observe_failed'
    });
    expect(env.calls.some((call) => call.startsWith('git:push '))).toBe(false);
  });

  test('persists a stable operation error when an external effect throws', async () => {
    const env = setup();
    env.worktree.removeByBranch.mockRejectedValueOnce(
      new Error('spawn failed')
    );

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({
      ok: false,
      operation_id: 'discard-1',
      phase: 'pr_closed',
      reason: 'discard_driver_error'
    });
    expect(
      env.store.snapshot(workspace).discard_operations['discard-1']
    ).toMatchObject({
      phase: 'pr_closed',
      last_error: 'discard_driver_error'
    });
  });

  test.each([
    ['runner_terminated', 'gh:close'],
    ['pr_closed', 'worktree:remove'],
    ['worktree_removed', `git:update-ref -d refs/heads/UI-1 ${HEAD_SHA}`],
    [
      'local_ref_removed',
      `git:push --force-with-lease=refs/heads/UI-1:${HEAD_SHA} origin :refs/heads/UI-1`
    ],
    ['remote_ref_removed', 'bd:update']
  ])(
    'retries a crash after the %s side effect without repeating it',
    async (phase, side_effect) => {
      const env = setup();
      const original = env.store.advanceDiscardOperation.bind(env.store);
      let injected = false;
      vi.spyOn(env.store, 'advanceDiscardOperation').mockImplementation(
        (ws, input) => {
          if (!injected && input.expected_phase === phase) {
            injected = true;
            return {
              ok: false,
              conflict: false,
              queue: env.store.snapshot(ws)
            };
          }
          return original(ws, input);
        }
      );

      const first = await env.coordinator.discard({
        bead_id: 'UI-1',
        expected_revision: env.store.snapshot(workspace).revision
      });
      const retried = await env.coordinator.retry('discard-1');

      expect(first).toMatchObject({ ok: false });
      expect(retried).toMatchObject({ ok: true });
      expect(env.calls.filter((call) => call === side_effect)).toHaveLength(1);
    }
  );

  test('deduplicates two concurrent browser requests onto one operation', async () => {
    const env = setup();
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(undefined);
    });
    env.worktree.observeOwnedByBead.mockImplementation(async () => {
      await gate;
      return {
        ok: true,
        present: true,
        path: '/repo/.worktrees/UI-1',
        branch: 'UI-1',
        head_sha: HEAD_SHA
      };
    });
    const revision = env.store.snapshot(workspace).revision;

    const first = env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: revision
    });
    const second = env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: revision
    });
    release();
    const results = await Promise.all([first, second]);

    expect(results.some((result) => result.reused === true)).toBe(true);
    expect(
      Object.keys(env.store.snapshot(workspace).discard_operations)
    ).toEqual(['discard-1']);
    expect(env.archive.create).toHaveBeenCalledTimes(1);
  });

  test('refuses when merge cleanup starts during source capture', async () => {
    const actionInFlight = vi
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    const env = setup({ actionInFlight });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toEqual({
      ok: false,
      conflict: false,
      reason: 'action_in_flight'
    });
    expect(actionInFlight).toHaveBeenCalledTimes(2);
    expect(env.archive.create).not.toHaveBeenCalled();
    expect(env.store.snapshot(workspace).discard_operations).toEqual({});
  });

  test('refuses an attempt whose normal completion is settling', async () => {
    const env = setup({ schedulerCanDiscard: false });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toEqual({
      ok: false,
      conflict: false,
      reason: 'attempt_settling'
    });
    expect(env.store.snapshot(workspace).discard_operations).toEqual({});
    expect(env.archive.create).not.toHaveBeenCalled();
  });

  test('archives the pinned PR head when merged cleanup source topology is absent', async () => {
    const attempt_head = 'e'.repeat(40);
    const env = setup({
      prState: 'MERGED',
      sourceAbsent: true,
      attemptHeadSha: attempt_head
    });
    env.store.recordCleanupFailure(workspace, {
      bead_id: 'UI-1',
      step: 'parent_close',
      reason: 'bd_close_failed'
    });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({ ok: true, pending: 'merged_revert' });
    expect(env.archive.create).not.toHaveBeenCalled();
    expect(env.archive.createCommittedSource).toHaveBeenCalledWith(
      expect.objectContaining({
        source_snapshot: expect.objectContaining({
          branch: 'UI-1',
          source_head: HEAD_SHA,
          attempt_head,
          preexisting_absent: true,
          local_branch_sha: null,
          remote_branch_sha: null
        })
      })
    );
    expect(env.gitRun).toHaveBeenCalledWith(
      ['fetch', 'origin', 'refs/pull/304/head'],
      { cwd: '/repo' }
    );
    expect(
      env.store.snapshot(workspace).discard_operations['discard-1']
    ).toMatchObject({
      phase: 'merged_revert',
      backup: { path: '/state/committed-source-archive' }
    });
  });

  test.each([
    ['local', { localRefSha: HEAD_SHA }, HEAD_SHA, null],
    ['remote', { remoteRefSha: HEAD_SHA }, null, HEAD_SHA]
  ])(
    'accepts an exact %s branch residue for an absent merged cleanup worktree',
    async (_kind, residue, local_sha, remote_sha) => {
      const env = setup({
        prState: 'MERGED',
        sourceAbsent: true,
        ...residue
      });
      env.store.recordCleanupFailure(workspace, {
        bead_id: 'UI-1',
        step: 'source_local_removed',
        reason: 'branch_remove_failed'
      });

      const result = await env.coordinator.discard({
        bead_id: 'UI-1',
        expected_revision: env.store.snapshot(workspace).revision
      });

      expect(result).toMatchObject({ ok: true, pending: 'merged_revert' });
      expect(env.archive.createCommittedSource).toHaveBeenCalledWith(
        expect.objectContaining({
          source_snapshot: expect.objectContaining({
            source_head: HEAD_SHA,
            local_branch_sha: local_sha,
            remote_branch_sha: remote_sha
          })
        })
      );
    }
  );

  test('refuses a changed branch residue for an absent merged cleanup worktree', async () => {
    const env = setup({
      prState: 'MERGED',
      sourceAbsent: true,
      remoteRefSha: 'e'.repeat(40)
    });
    env.store.recordCleanupFailure(workspace, {
      bead_id: 'UI-1',
      step: 'source_remote_removed',
      reason: 'branch_remove_failed'
    });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'source_residue_identity_changed'
    });
    expect(env.archive.createCommittedSource).not.toHaveBeenCalled();
  });

  test('refuses a remote source ref outside the recovery archive head', async () => {
    const env = setup({ remoteRefSha: 'e'.repeat(40) });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'source_remote_ref_mismatch'
    });
    expect(env.archive.create).not.toHaveBeenCalled();
    expect(env.archive.createCommittedSource).not.toHaveBeenCalled();
  });

  test('fails closed when fetched cleanup PR head differs from the pin', async () => {
    const env = setup({
      prState: 'MERGED',
      sourceAbsent: true,
      fetchedPrHeadSha: 'e'.repeat(40)
    });
    env.store.recordCleanupFailure(workspace, {
      bead_id: 'UI-1',
      step: 'parent_close',
      reason: 'bd_close_failed'
    });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'pull_ref_head_mismatch'
    });
    expect(env.archive.createCommittedSource).not.toHaveBeenCalled();
  });
});

/**
 * @param {{ in_flight?: boolean, residue?: 'worktree'|'branch', archive_failure?: boolean, local_ref_failure?: boolean }} [options]
 */
function setupStaleRecovery(options = {}) {
  const residue = options.residue || 'worktree';
  const store = createQueueStore({ now: () => 100 });
  store.place(workspace, {
    expected_revision: 0,
    bead_id: 'UI-stale',
    lane: 's1'
  });
  const identity = {
    worktree_realpath:
      residue === 'worktree' ? '/repo/.worktrees/UI-stale' : null,
    branch: 'UI-stale',
    head_sha: residue === 'worktree' ? HEAD_SHA : null,
    branch_head_sha: residue === 'branch' ? HEAD_SHA : null,
    base_oid: 'a'.repeat(40),
    status_digest: 'status-1'
  };
  store.recordAdmission(workspace, {
    bead_id: 'UI-stale',
    reason: 'worktree_stale_work',
    stale_work: {
      schema: 1,
      residue,
      state: 'unique',
      cause: residue === 'worktree' ? 'dirty_unique' : 'ahead_not_contained',
      summary: {
        staged_count: 1,
        unstaged_count: 1,
        untracked_count: 1,
        branch_ahead: residue === 'branch' ? 1 : 0,
        head_ahead: 0
      },
      identity_digest: 'identity-1',
      action_id: 'action-1',
      can_resume: false,
      can_continue: residue === 'worktree',
      can_backup_fresh: true,
      can_recheck: residue === 'branch',
      identity
    }
  });
  /** @type {string[]} */
  const calls = [];
  let local_ref = HEAD_SHA;
  let local_ref_failure = options.local_ref_failure === true;
  let worktree_present = residue === 'worktree';
  const worktree = {
    removeIfDiscardable: vi.fn(async () => {
      if (residue === 'branch') {
        return local_ref
          ? {
              ok: false,
              state: 'unique',
              cause: 'ahead_not_contained',
              owned: true,
              removed: false,
              identity,
              summary: {
                staged_count: 0,
                unstaged_count: 0,
                untracked_count: 0,
                branch_ahead: 1,
                head_ahead: 0
              }
            }
          : {
              ok: true,
              state: 'absent',
              cause: null,
              owned: false,
              removed: false,
              identity: {
                worktree_realpath: null,
                branch: null,
                head_sha: null,
                branch_head_sha: null,
                base_oid: identity.base_oid,
                status_digest: 'spent-branch'
              },
              summary: {
                staged_count: 0,
                unstaged_count: 0,
                untracked_count: 0,
                branch_ahead: 0,
                head_ahead: 0
              }
            };
      }
      return worktree_present
        ? {
            ok: false,
            state: 'unique',
            cause: 'dirty_unique',
            owned: true,
            removed: false,
            identity,
            summary: {
              staged_count: 1,
              unstaged_count: 1,
              untracked_count: 1,
              branch_ahead: 0,
              head_ahead: 0
            }
          }
        : {
            ok: true,
            state: 'discardable',
            cause: null,
            owned: true,
            removed: false,
            identity: {
              worktree_realpath: null,
              branch: 'UI-stale',
              head_sha: null,
              branch_head_sha: null,
              base_oid: identity.base_oid,
              status_digest: 'spent-branch'
            },
            summary: {
              staged_count: 0,
              unstaged_count: 0,
              untracked_count: 0,
              branch_ahead: 0,
              head_ahead: 0
            }
          };
    }),
    removeByBranch: vi.fn(
      /** @returns {Promise<{ ok: boolean, removed: boolean, reason: string|null }>} */
      async () => {
        if (!worktree_present) {
          return { ok: true, removed: false, reason: null };
        }
        calls.push('cleanup:worktree');
        worktree_present = false;
        return { ok: true, removed: true, reason: null };
      }
    ),
    withTopologyLock: vi.fn(async (_repo, work) => work())
  };
  const archive = {
    create: vi.fn(() => {
      calls.push('archive:verified');
      return {
        ok: true,
        receipt: {
          path: '/state/archive',
          manifest_sha256: 'a'.repeat(64),
          verified_at: 200
        }
      };
    }),
    createBranch: vi.fn(() => {
      if (options.archive_failure) {
        return { ok: false, reason: 'archive_create_failed' };
      }
      calls.push('archive:branch-verified');
      return {
        ok: true,
        receipt: {
          path: '/state/branch-archive',
          manifest_sha256: 'b'.repeat(64),
          verified_at: 200
        }
      };
    })
  };
  const scheduler = {
    activeBeadIds: vi.fn(() => new Set(['UI-stale'])),
    staleWorkActionInFlight: vi.fn(() => options.in_flight === true),
    fenceDiscardAttempt: vi.fn(() => true),
    tick: vi.fn(async () => {
      calls.push('scheduler:tick');
    })
  };
  const deps = {
    workspace,
    repo: '/repo',
    store,
    gh: {},
    bd: {},
    worktree,
    gitRun: vi.fn(async (args) => {
      if (args[0] === 'ls-remote') {
        return { code: 0, stdout: '', stderr: '' };
      }
      if (args[0] === 'rev-parse') {
        return local_ref
          ? { code: 0, stdout: `${local_ref}\n`, stderr: '' }
          : { code: 1, stdout: '', stderr: '' };
      }
      if (args[0] === 'update-ref') {
        calls.push('cleanup:local-ref');
        if (local_ref_failure) {
          local_ref_failure = false;
          return { code: 1, stdout: '', stderr: '' };
        }
        local_ref = '';
      }
      return { code: 0, stdout: '', stderr: '' };
    }),
    scheduler,
    archive,
    processController: {},
    sessionLog: { pathFor: () => '/state/session.jsonl' },
    makeOperationId: () => 'stale-work-1',
    now: () => 300
  };
  const coordinator_options = {
    resolveBase: vi.fn(async () => ({
      ok: true,
      base: 'main',
      base_oid: identity.base_oid
    }))
  };
  const createCoordinator = () =>
    createDiscardCoordinator(deps, coordinator_options);
  return {
    store,
    identity,
    calls,
    worktree,
    scheduler,
    archive,
    createCoordinator,
    coordinator: createCoordinator()
  };
}

describe('worker discard coordinator stale-work recovery', () => {
  test('cleans branch-only residue with a verified archive and CAS ref delete', async () => {
    const env = setupStaleRecovery({ residue: 'branch' });

    const result = await env.coordinator.backupFresh({
      bead_id: 'UI-stale',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toEqual({ ok: true, operation_id: 'stale-work-1' });
    expect(env.calls).toEqual([
      'archive:branch-verified',
      'cleanup:local-ref',
      'scheduler:tick'
    ]);
    expect(env.worktree.removeByBranch).not.toHaveBeenCalled();
    expect(env.archive.createBranch).toHaveBeenCalledWith({
      workspace,
      archive_id: 'stale-work-1',
      repo: '/repo',
      ref: 'refs/heads/UI-stale',
      base_oid: env.identity.base_oid,
      branch_head_sha: HEAD_SHA
    });
  });

  test('runs no cleanup when branch-only archive creation fails', async () => {
    const env = setupStaleRecovery({
      residue: 'branch',
      archive_failure: true
    });

    const result = await env.coordinator.backupFresh({
      bead_id: 'UI-stale',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({ ok: false });
    expect(env.calls).toEqual([]);
    expect(env.worktree.removeByBranch).not.toHaveBeenCalled();
  });

  test('preserves a verified branch archive across cleanup failure and retry', async () => {
    const env = setupStaleRecovery({
      residue: 'branch',
      local_ref_failure: true
    });

    const first = await env.coordinator.backupFresh({
      bead_id: 'UI-stale',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(workspace).revision
    });
    const failed_operation =
      env.store.snapshot(workspace).discard_operations['stale-work-1'];
    const retried = await env.createCoordinator().retry('stale-work-1');
    const operation =
      env.store.snapshot(workspace).discard_operations['stale-work-1'];

    expect(first).toMatchObject({
      ok: false,
      reason: 'local_ref_delete_failed'
    });
    expect(failed_operation).toMatchObject({
      phase: 'backup_verified',
      backup: { path: '/state/branch-archive' },
      last_error: 'local_ref_delete_failed'
    });
    expect(retried).toEqual({ ok: true, operation_id: 'stale-work-1' });
    expect(env.archive.createBranch).toHaveBeenCalledTimes(1);
    expect(env.worktree.removeByBranch).not.toHaveBeenCalled();
    expect(operation).toMatchObject({
      phase: 'done',
      backup: { path: '/state/branch-archive' },
      last_error: null
    });
  });

  test('starts recovery while dispatch refusal remains visible', async () => {
    const env = setupStaleRecovery();

    const result = await env.coordinator.backupFresh({
      bead_id: 'UI-stale',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(workspace).revision
    });
    const queue = env.store.snapshot(workspace);

    expect(result).toEqual({ ok: true, operation_id: 'stale-work-1' });
    expect(env.calls).toEqual([
      'archive:verified',
      'cleanup:worktree',
      'cleanup:local-ref',
      'scheduler:tick'
    ]);
    expect(queue.discard_operations['stale-work-1']).toMatchObject({
      kind: 'stale_work_backup_fresh',
      phase: 'done',
      backup: { path: '/state/archive' }
    });
    expect(queue.admission['UI-stale']).toBeUndefined();
    expect(queue.serial_lanes[0].entries[0].bead_id).toBe('UI-stale');
    expect(env.scheduler.activeBeadIds).not.toHaveBeenCalled();
    expect(env.scheduler.staleWorkActionInFlight).toHaveBeenCalledWith(
      workspace,
      'UI-stale'
    );
    expect(env.scheduler.tick).toHaveBeenCalledTimes(1);
  });

  test('refuses recovery while a narrow scheduler action is in flight', async () => {
    const env = setupStaleRecovery({ in_flight: true });

    const result = await env.coordinator.backupFresh({
      bead_id: 'UI-stale',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toEqual({
      ok: false,
      conflict: true,
      reason: 'action_in_flight'
    });
    expect(env.store.snapshot(workspace).discard_operations).toEqual({});
    expect(env.archive.create).not.toHaveBeenCalled();
  });

  test('refuses recovery while a durable discard operation is active', async () => {
    const env = setupStaleRecovery();
    env.store.createDiscardOperation(workspace, {
      expected_revision: env.store.snapshot(workspace).revision,
      operation: {
        operation_id: 'other-operation',
        bead_id: 'UI-stale',
        source_snapshot: { repo: '/repo', branch: 'UI-stale' }
      }
    });

    const result = await env.coordinator.backupFresh({
      bead_id: 'UI-stale',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toEqual({
      ok: false,
      conflict: true,
      reason: 'action_in_flight'
    });
    expect(env.archive.create).not.toHaveBeenCalled();
  });

  test('preserves stale work when status changes after archive verification', async () => {
    const env = setupStaleRecovery();
    env.worktree.removeByBranch.mockResolvedValueOnce({
      ok: false,
      removed: false,
      reason: 'identity_changed'
    });

    const result = await env.coordinator.backupFresh({
      bead_id: 'UI-stale',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'worktree_identity_changed'
    });
    expect(env.worktree.removeByBranch).toHaveBeenCalledWith({
      repo: '/repo',
      branch: 'UI-stale',
      expected_path: env.identity.worktree_realpath,
      expected_head: env.identity.head_sha,
      expected_base_oid: env.identity.base_oid,
      expected_status_digest: env.identity.status_digest
    });
    expect(env.calls).not.toContain('cleanup:worktree');
    expect(
      env.store.snapshot(workspace).discard_operations['stale-work-1']
    ).toMatchObject({
      phase: 'backup_verified',
      last_error: 'worktree_identity_changed'
    });
  });

  test('adopts an already removed worktree after restart', async () => {
    const env = setupStaleRecovery();
    const original = env.store.advanceDiscardOperation.bind(env.store);
    let interrupted = false;
    vi.spyOn(env.store, 'advanceDiscardOperation').mockImplementation(
      (ws, input) => {
        if (!interrupted && input.expected_phase === 'backup_verified') {
          interrupted = true;
          return { ok: false, conflict: false, queue: env.store.snapshot(ws) };
        }
        return original(ws, input);
      }
    );

    const first = await env.coordinator.backupFresh({
      bead_id: 'UI-stale',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(workspace).revision
    });
    const restarted = env.createCoordinator();
    const retried = await restarted.retry('stale-work-1');

    expect(first).toMatchObject({ ok: false });
    expect(retried).toEqual({ ok: true, operation_id: 'stale-work-1' });
    expect(
      env.calls.filter((call) => call === 'cleanup:worktree')
    ).toHaveLength(1);
    expect(
      env.store.snapshot(workspace).discard_operations['stale-work-1']
    ).toMatchObject({ phase: 'done', last_error: null });
  });

  test('preserves a replacement worktree after restart', async () => {
    const env = setupStaleRecovery();
    const original_advance = env.store.advanceDiscardOperation.bind(env.store);
    let interrupted = false;
    vi.spyOn(env.store, 'advanceDiscardOperation').mockImplementation(
      (ws, input) => {
        if (!interrupted && input.expected_phase === 'backup_verified') {
          interrupted = true;
          return { ok: false, conflict: false, queue: env.store.snapshot(ws) };
        }
        return original_advance(ws, input);
      }
    );
    const original_observe =
      env.worktree.removeIfDiscardable.getMockImplementation();
    let observations = 0;
    env.worktree.removeIfDiscardable.mockImplementation(async (...args) => {
      observations += 1;
      if (observations <= 2 && original_observe) {
        return original_observe(...args);
      }
      return {
        ok: false,
        state: 'unique',
        cause: 'dirty_unique',
        owned: true,
        removed: false,
        identity: {
          ...env.identity,
          worktree_realpath: '/repo/.worktrees/UI-stale-replacement',
          status_digest: 'replacement-status'
        },
        summary: {
          staged_count: 0,
          unstaged_count: 1,
          untracked_count: 0,
          branch_ahead: 0,
          head_ahead: 0
        }
      };
    });

    await env.coordinator.backupFresh({
      bead_id: 'UI-stale',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(workspace).revision
    });
    const restarted = env.createCoordinator();
    const retried = await restarted.retry('stale-work-1');

    expect(retried).toMatchObject({
      ok: false,
      reason: 'worktree_identity_changed'
    });
    expect(
      env.store.snapshot(workspace).discard_operations['stale-work-1']
    ).toMatchObject({
      phase: 'backup_verified',
      last_error: 'worktree_identity_changed'
    });
  });
});
