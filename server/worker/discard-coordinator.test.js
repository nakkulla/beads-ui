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
 * @param {{ prState?: string, closeRace?: boolean, closeReturnsError?: boolean, remoteAutoDeleteOnClose?: boolean, remoteChangesAfterClose?: boolean, worktreeChangesAfterArchive?: boolean, lsRemoteErrorAt?: number, actionInFlight?: () => boolean, schedulerCanDiscard?: boolean, processController?: any }} [options]
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
      head_oid: HEAD_SHA,
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
  let local_present = true;
  let remote_present = true;
  let remote_sha = HEAD_SHA;
  let worktree_present = true;
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
  const gitRun = vi.fn(async (args) => {
    const command = args.join(' ');
    calls.push(`git:${command}`);
    if (args[0] === 'rev-parse' && args[1] === '--verify') {
      return local_present
        ? { code: 0, stdout: `${HEAD_SHA}\n`, stderr: '' }
        : { code: 1, stdout: '', stderr: '' };
    }
    if (args[0] === 'update-ref' && args[1] === '-d') {
      local_present = false;
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
    actionInFlight: options.actionInFlight,
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
    [
      'worktree_removed',
      `git:update-ref -d refs/heads/UI-1 ${HEAD_SHA}`
    ],
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
});
