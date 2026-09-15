import { describe, expect, test } from 'vitest';
import { classifyRepoOperationFailure } from './repo-operation-policy.js';
import {
  cleanupFailureRetryClass,
  cleanupRetryParked,
  cleanupRetryWaitUntil,
  normalizeScriptRetry,
  resolutionAccess,
  scriptIdentity,
  scriptRetryConsumptionKey
} from './resolution-ladder.js';

describe('cleanup retry scheduling', () => {
  const failure = {
    step: 'base_containment',
    reason: 'base_fetch_failed',
    retry_count: 0,
    next_retry_at: 1000
  };

  test.each([
    [{}, 1000],
    [{ retry_count: 2 }, 1000],
    [{ retry_count: 3 }, null],
    [{ retry_count: -1 }, null],
    [{ retry_count: 0.5 }, null],
    [{ retry_count: undefined }, null],
    [{ next_retry_at: undefined }, null],
    [{ next_retry_at: NaN }, null],
    [{ next_retry_at: Infinity }, null],
    [{ next_retry_at: '1000' }, null],
    [{ step: 'repo_operations' }, null],
    [{ reason: 'base_unresolved' }, null]
  ])('reads the retry deadline with patch %j', (patch, expected) => {
    expect(cleanupRetryWaitUntil({ ...failure, ...patch })).toBe(expected);
  });

  test.each([
    ['cleaning', null, 999, true],
    ['cleaning', null, 1000, false],
    ['cleaning', null, 1001, false],
    ['cleaning', { kind: 'retry_cleanup' }, 999, false],
    ['merging', null, 999, false]
  ])(
    'parks phase %s with operation %j at %i',
    (phase, active_op, now, expected) => {
      const queue = {
        completion_intents: { 'UI-root': { phase, active_op } },
        cleanup_failed: { 'UI-root': failure }
      };

      expect(cleanupRetryParked(queue, 'UI-root', now)).toBe(expected);
    }
  );

  test.each([
    { retry_count: 3 },
    { next_retry_at: undefined },
    { next_retry_at: NaN }
  ])('keeps unschedulable cleanup at the head for patch %j', (patch) => {
    const queue = {
      completion_intents: { 'UI-root': { phase: 'cleaning', active_op: null } },
      cleanup_failed: { 'UI-root': { ...failure, ...patch } }
    };

    expect(cleanupRetryParked(queue, 'UI-root', 999)).toBe(false);
  });

  test.each([
    null,
    {},
    { completion_intents: { 'UI-root': { phase: 'cleaning' } } }
  ])('keeps missing retry evidence unparked for queue %j', (queue) => {
    expect(cleanupRetryParked(queue, 'UI-root', 999)).toBe(false);
  });
});

describe('cleanup failure retry classification', () => {
  test.each([
    ['branch_cleanup', 'worktree_remove_failed', 'observe_failed'],
    ['branch_cleanup', 'worktree_remove_failed', 'delivered_unobservable'],
    ['branch_cleanup', 'worktree_remove_failed', 'archive_failed'],
    ['branch_cleanup', 'local_branch_delete_failed', 'ref_delete_failed'],
    ['branch_cleanup', 'remote_branch_delete_failed', null],
    ['base_containment', 'merge_sha_unobserved', null],
    ['base_containment', 'base_fetch_failed', null],
    ['base_containment', 'base_rev_unavailable', null]
  ])('retries %s %s with manager %s', (step, reason, manager_reason) => {
    const failure = {
      step,
      reason,
      detail: manager_reason
        ? `manager_reason=${manager_reason} worktree_removed=false branch_removed=false`
        : null
    };

    const result = cleanupFailureRetryClass(failure);

    expect(result).toBe('transient');
  });

  test.each([
    'dirty_unique',
    'untracked_present',
    'special_file',
    'identity_changed',
    'ownership_changed',
    'foreign_worktree',
    'path_present',
    'identity_invalid',
    'archive_unavailable'
  ])('preserves manager refusal %s', (manager_reason) => {
    const failure = {
      step: 'branch_cleanup',
      reason: 'worktree_remove_failed',
      detail: `manager_reason=${manager_reason} worktree_removed=false branch_removed=false`
    };

    expect(cleanupFailureRetryClass(failure)).toBe('deterministic');
  });

  test.each([
    undefined,
    null,
    42,
    {},
    '',
    'manager_reason=',
    'prefix_manager_reason=observe_failed',
    'manager_reason=observe_failed!',
    'manager_reason=observe_failed manager_reason=dirty_unique'
  ])('rejects malformed manager evidence %j', (detail) => {
    expect(
      cleanupFailureRetryClass({
        step: 'branch_cleanup',
        reason: 'worktree_remove_failed',
        detail
      })
    ).toBe('deterministic');
  });

  test.each([
    'cleanup_journal_conflict',
    'cleanup_completion_unrecorded',
    'cleanup_replay_unavailable',
    'internal_record_failed:write'
  ])('leaves journal failure %s with its owner', (reason) => {
    expect(cleanupFailureRetryClass({ step: 'branch_cleanup', reason })).toBe(
      'unowned'
    );
  });

  test('leaves repository operations with the script retry owner', () => {
    expect(
      cleanupFailureRetryClass({
        step: 'repo_operations',
        reason: 'base_fetch_failed',
        retryable: true
      })
    ).toBe('unowned');
  });

  test.each([undefined, null, [], 42, {}])(
    'fails closed on unreadable record %j',
    (failure) => {
      expect(cleanupFailureRetryClass(failure)).toBe('deterministic');
    }
  );
});

/**
 * @param {Record<string, any>} [patch]
 */
function failedOperation(patch = {}) {
  return {
    schema: 1,
    repo_id: '/repo',
    kind: 'deploy',
    subjects: [{ bead_id: 'UI-a', merged_sha: 'a'.repeat(40) }],
    effective_base_sha: 'b'.repeat(40),
    target_base: 'main',
    target_sha: 'c'.repeat(40),
    target_tree: null,
    script_mode: '100755',
    script_blob_sha: 'd'.repeat(40),
    state: 'failed',
    attempt_id: 'attempt-1',
    started_at: null,
    log_path: null,
    failure: {
      code: 'script_failed',
      fingerprint: 'f'.repeat(64),
      detail: '',
      interrupted: false
    },
    retry: null,
    superseded_by: null,
    dismissed: null,
    ...patch
  };
}

describe('repo operation failure classification', () => {
  test.each([
    ['script_failed', 'deploy_script_failure'],
    ['timeout', 'deploy_script_failure'],
    ['verify_candidate_mismatch', 'verify_candidate_mismatch'],
    ['base_fetch_failed', 'base_fetch_failed'],
    ['repo_ops_worktree_unowned', 'repo_ops_worktree_unowned']
  ])('classifies %s as %s without a catch-all', (code, kind) => {
    const operation = failedOperation({
      failure: {
        code,
        fingerprint: 'f'.repeat(64),
        detail: '',
        interrupted: false
      }
    });

    expect(classifyRepoOperationFailure(operation)).toBe(kind);
  });
});

describe('script retry identity and legacy normalization', () => {
  test('derives script identity only from complete runner invocation evidence', () => {
    const complete = failedOperation({
      started_at: 10,
      log_path: '/logs/op.log'
    });
    const missing_started = failedOperation({ log_path: '/logs/op.log' });
    const missing_log = failedOperation({ started_at: 10 });

    expect([
      scriptIdentity(complete),
      scriptIdentity(missing_started),
      scriptIdentity(missing_log)
    ]).toEqual([`${'d'.repeat(40)}:100755`, null, null]);
  });

  test('separates identical post-spawn and pre-spawn mismatch codes', () => {
    const before_spawn = failedOperation({
      failure: {
        code: 'verify_candidate_mismatch',
        fingerprint: 'f'.repeat(64),
        detail: '',
        interrupted: false
      }
    });
    const after_spawn = failedOperation({
      ...before_spawn,
      started_at: 10,
      log_path: '/logs/verify.log'
    });

    expect([
      normalizeScriptRetry(before_spawn).status,
      scriptIdentity(after_spawn)
    ]).toEqual(['consumed', `${'d'.repeat(40)}:100755`]);
  });

  test('keeps invocation identity for an interrupted runner', () => {
    const operation = failedOperation({
      started_at: 10,
      log_path: '/logs/op.log',
      failure: {
        code: 'interrupted',
        fingerprint: 'f'.repeat(64),
        detail: '',
        interrupted: true
      }
    });

    expect(scriptIdentity(operation)).toBe(`${'d'.repeat(40)}:100755`);
  });

  test('binds the consumption key to attempt, target and script identity', () => {
    const operation = failedOperation({
      started_at: 10,
      log_path: '/logs/op.log'
    });

    expect(scriptRetryConsumptionKey(operation)).toEqual([
      'attempt-1',
      'c'.repeat(40),
      `${'d'.repeat(40)}:100755`
    ]);
  });

  test.each([
    ['failed', undefined, 'consumed'],
    ['succeeded', undefined, 'not_applicable'],
    ['queued', undefined, 'unconsumed'],
    ['running', undefined, 'unconsumed'],
    ['failed', { consumed_key: 42 }, 'consumed']
  ])('normalizes legacy %s retry state as %s', (state, retry, expected) => {
    const operation = failedOperation({ state });
    if (retry !== undefined) {
      operation.retry = /** @type {any} */ (retry);
    }

    expect(normalizeScriptRetry(operation).status).toBe(expected);
  });
});

describe('script retry access', () => {
  test('opens the one automatic step for a running invocation', () => {
    const access = resolutionAccess({
      policy_supported: true,
      subject: failedOperation({
        state: 'running',
        started_at: 10,
        log_path: '/logs/op.log',
        failure: null
      })
    });

    expect(access).toEqual({ script_retry: true });
  });

  test('stops the automatic step when the pinned schema is unsupported', () => {
    const access = resolutionAccess({
      policy_supported: false,
      subject: failedOperation({
        state: 'running',
        started_at: 10,
        log_path: '/logs/op.log',
        failure: null
      })
    });

    expect(access).toEqual({ script_retry: false });
  });

  test('stops the automatic step on a dismissed record', () => {
    const access = resolutionAccess({
      policy_supported: true,
      subject: failedOperation({
        state: 'running',
        started_at: 10,
        log_path: '/logs/op.log',
        failure: null,
        dismissed: { at: 1, by: 'user' }
      })
    });

    expect(access).toEqual({ script_retry: false });
  });

  test('stops the automatic step on a terminal record', () => {
    const access = resolutionAccess({
      policy_supported: true,
      subject: failedOperation({ started_at: 10, log_path: '/logs/op.log' })
    });

    expect(access).toEqual({ script_retry: false });
  });
});
