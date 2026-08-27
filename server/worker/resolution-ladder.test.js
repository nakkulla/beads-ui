import { describe, expect, test } from 'vitest';
import { classifyRepoOperationFailure } from './repo-operation-policy.js';
import {
  normalizeScriptRetry,
  resolutionAccess,
  scriptIdentity,
  scriptRetryConsumptionKey
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
