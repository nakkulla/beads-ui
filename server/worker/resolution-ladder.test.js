import { describe, expect, test } from 'vitest';
import {
  classifyRepoOperationFailure,
  isRepairEligible
} from './repo-operation-policy.js';
import {
  normalizeResolutionSubjects,
  normalizeScriptRetry,
  reproducedWithoutNewEvidence,
  resolutionAccess,
  scriptIdentity
} from './resolution-ladder.js';

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
    repair: {
      chain_id: 'op-1',
      owner_bead: 'UI-a',
      auto_budget: 1,
      auto_used: 0,
      ladder_stage: 'auto_repair_session',
      session_id: null,
      attempt_id: null
    },
    retry: null,
    superseded_by: null,
    dismissed: null,
    ...patch
  };
}

describe('resolution ladder failure classification', () => {
  test.each([
    ['script_failed', 'deploy_script_failure'],
    ['timeout', 'deploy_script_failure'],
    ['verify_candidate_mismatch', 'verify_candidate_mismatch'],
    ['base_fetch_failed', 'base_fetch_failed'],
    ['repo_ops_worktree_unowned', 'repo_ops_worktree_unowned']
  ])(
    'keeps %s repair-eligible without classifying it as other',
    (code, kind) => {
      const operation = failedOperation({
        failure: {
          code,
          fingerprint: 'f'.repeat(64),
          detail: '',
          interrupted: false
        }
      });

      expect([
        isRepairEligible(operation),
        classifyRepoOperationFailure(operation)
      ]).toEqual([true, kind]);
    }
  );
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

describe('resolution subject normalization', () => {
  test('promotes a cleanup cursor failure without an operation subject', () => {
    const subjects = normalizeResolutionSubjects({
      pr_wait: [{ bead_id: 'UI-a', cleanup_cursor: 'repo_operations' }],
      repo_operations: {},
      cleanup_failed: {
        'UI-a': { step: 'repo_operations', reason: 'verify_cmd_failed', at: 1 }
      }
    });

    expect(subjects).toEqual([
      expect.objectContaining({
        subject_id: 'cleanup:UI-a',
        owner_bead: 'UI-a',
        stage: 'auto_repair_session'
      })
    ]);
  });

  test('does not duplicate a cleanup subject bound to an operation', () => {
    const subjects = normalizeResolutionSubjects({
      pr_wait: [{ bead_id: 'UI-a', cleanup_cursor: 'repo_operations' }],
      repo_operations: { 'op-1': failedOperation() },
      cleanup_failed: {
        'UI-a': { step: 'repo_operations', reason: 'verify_cmd_failed', at: 1 }
      }
    });

    expect(subjects.map((subject) => subject.subject_id)).toEqual(['op:op-1']);
  });
});

describe('automatic and user-triggered access', () => {
  test('stops automatic steps but keeps user-triggered access when dismissed', () => {
    const access = resolutionAccess({
      policy_supported: true,
      auto_repair: true,
      subject: failedOperation({ dismissed: { at: 1, by: 'user' } })
    });

    expect(access).toEqual({
      script_retry: false,
      auto_repair_session: false,
      user_triggered_session: true
    });
  });

  test('stops automatic steps but keeps user-triggered access for schema v1', () => {
    const access = resolutionAccess({
      policy_supported: false,
      auto_repair: true,
      subject: failedOperation()
    });

    expect(access).toEqual({
      script_retry: false,
      auto_repair_session: false,
      user_triggered_session: true
    });
  });
});

describe('chain-bound fingerprint guard', () => {
  test('does not suppress the first automatic session in a different chain', () => {
    const operations = {
      prior: failedOperation({
        repair: {
          ...failedOperation().repair,
          chain_id: 'chain-a',
          auto_used: 1,
          ladder_stage: 'user_triggered_session'
        }
      }),
      current: failedOperation({
        repair: {
          ...failedOperation().repair,
          chain_id: 'chain-b',
          auto_used: 0,
          ladder_stage: 'auto_repair_session'
        }
      })
    };

    expect(reproducedWithoutNewEvidence(operations, 'current')).toBe(false);
  });

  test('descends after the same chain already consumed its automatic session', () => {
    const operations = {
      prior: failedOperation({
        repair: {
          ...failedOperation().repair,
          chain_id: 'chain-a',
          auto_used: 1,
          ladder_stage: 'user_triggered_session'
        }
      }),
      current: failedOperation({
        repair: {
          ...failedOperation().repair,
          chain_id: 'chain-a',
          auto_used: 1,
          ladder_stage: 'auto_repair_session'
        }
      })
    };

    expect(reproducedWithoutNewEvidence(operations, 'current')).toBe(true);
  });
});
