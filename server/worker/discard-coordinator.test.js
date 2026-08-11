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
 * @param {{ prState?: string, closeRace?: boolean, closeReturnsError?: boolean, remoteAutoDeleteOnClose?: boolean, remoteChangesAfterClose?: boolean, worktreeChangesAfterArchive?: boolean, sourceAbsent?: boolean, localRefSha?: string, remoteRefSha?: string, attemptHeadSha?: string, fetchedPrHeadSha?: string, lsRemoteErrorAt?: number, actionInFlight?: () => boolean, schedulerCanDiscard?: boolean, processController?: any, revertBuilder?: any, verifyRevert?: any, rollbackBaseSync?: any, rollbackVerify?: any, rollbackResolveDeploy?: any, launchRollbackDeploy?: (bead_id: string, pending_deploy: any) => any, gitRun?: any }} [options]
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
    }),
    readMetadata: vi.fn(async () => {
      calls.push(`bd:pr-read:${pr_url === null ? 'null' : 'set'}`);
      return pr_url;
    }),
    unsetMetadata: vi.fn(async () => {
      calls.push('bd:pr-unset');
      pr_url = null;
    }),
    setMetadata: vi.fn(async (_id, _key, value) => {
      calls.push('bd:pr-set');
      pr_url = value;
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
    rollbackResolveDeploy:
      options.rollbackResolveDeploy || vi.fn(async () => ({ ok: true })),
    launchRollbackDeploy: options.launchRollbackDeploy,
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
  test('finalizes a merged revert after restart without ordinary merge cleanup', async () => {
    /** @type {any} */
    let launch_snapshot = null;
    /** @type {ReturnType<typeof setup>} */
    let env;
    const launchRollbackDeploy = vi.fn(() => {
      launch_snapshot = env.store.snapshot(workspace);
      return { ok: true };
    });
    env = setup({
      prState: 'MERGED',
      rollbackResolveDeploy: vi.fn(async () => ({
        ok: true,
        pending: { cmd: ['restart'] }
      })),
      launchRollbackDeploy
    });
    const created = env.store.createDiscardOperation(workspace, {
      expected_revision: env.store.snapshot(workspace).revision,
      operation: {
        operation_id: 'discard-rollback',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: {
          repo: '/repo',
          worktree: '/repo/.worktrees/UI-1',
          branch: 'UI-1',
          source_head: HEAD_SHA,
          local_branch_sha: HEAD_SHA,
          remote_branch_sha: HEAD_SHA,
          pr: { number: 304, url: 'https://github.com/acme/repo/pull/304' }
        }
      }
    });
    expect(created.ok).toBe(true);
    const advanced = env.store.advanceDiscardOperation(workspace, {
      operation_id: 'discard-rollback',
      expected_phase: 'requested',
      next_phase: 'revert_pr_wait',
      patch: {
        mode: 'merged_revert',
        original_pr: { base_ref: 'main' },
        revert_pr: {
          number: 304,
          url: 'https://github.com/acme/repo/pull/304',
          head_ref: 'revert-UI-1-op',
          branch: 'revert-UI-1-op',
          head_sha: HEAD_SHA,
          target_base: 'main'
        }
      }
    });
    expect(advanced.ok).toBe(true);
    env.gh.prDetail.mockResolvedValue({
      state: 'ok',
      data: {
        number: 304,
        url: 'https://github.com/acme/repo/pull/304',
        state: 'MERGED',
        head_ref: 'revert-UI-1-op',
        base_ref: 'main',
        head_sha: HEAD_SHA,
        merged_sha: MERGED_SHA
      }
    });

    await env.coordinator.recover();

    expect(
      env.store.snapshot(workspace).discard_operations['discard-rollback']
    ).toMatchObject({ phase: 'done', mode: 'merged_revert' });
    expect(env.store.snapshot(workspace).pr_wait).toEqual([]);
    expect(launchRollbackDeploy).toHaveBeenCalledWith(
      'UI-1',
      expect.objectContaining({ base_sha: 'base-sha' })
    );
    expect(launch_snapshot).toMatchObject({
      discard_operations: {
        'discard-rollback': { phase: 'done' }
      },
      last_deploy: { outcome: 'launched', bead_id: 'UI-1' }
    });
  });

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
    ],
    ['rollback_bead_opened', 'bd:status:open'],
    ['rollback_pr_url_cleared', 'bd:pr-unset']
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
            remote_branch_sha: HEAD_SHA
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
    const bd_at = env.calls.indexOf('bd:status:open');
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
    ['remote_ref_removed', 'bd:status:open'],
    ['bead_opened', 'bd:pr-unset']
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

  test('refuses cleanup discard after the same bead launched a detached deploy', async () => {
    const env = setup();
    env.store.recordLastDeploy(workspace, {
      outcome: 'launched',
      reason: null,
      bead_id: 'UI-1',
      base_sha: HEAD_SHA
    });

    const result = await env.coordinator.discard({
      bead_id: 'UI-1',
      expected_revision: env.store.snapshot(workspace).revision
    });

    expect(result).toEqual({
      ok: false,
      conflict: false,
      reason: 'deploy_outcome_unknown'
    });
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
