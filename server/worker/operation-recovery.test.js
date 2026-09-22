import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { describe, expect, test } from 'vitest';
import {
  classifyOperationRecovery,
  repairHandoffDescription
} from './operation-recovery.js';
import { workRecoveryClassification } from './work-recovery-policy.js';

/** @param {Record<string, any>} [patch] */
function operation(patch = {}) {
  return {
    repo_id: '/repo',
    kind: 'deploy',
    state: 'failed',
    target_sha: 'a'.repeat(40),
    target_base: 'main',
    effective_base_sha: 'b'.repeat(40),
    script_blob_sha: 'c'.repeat(40),
    script_mode: '100755',
    script_path: 'repo-ops/script/deploy',
    started_at: 1,
    log_path: '/logs/op.log',
    exit_code: 2,
    subjects: [{ bead_id: 'UI-source' }],
    failure: {
      code: 'script_failed',
      fingerprint: 'same',
      summary: 'npm ERR! Test failed'
    },
    retry: { outcome: 'consumed', first_failure: { fingerprint: 'same' } },
    ...patch
  };
}

/**
 * @param {Record<string, any>} [patch]
 * @param {boolean} [policy_supported]
 */
function classify(patch = {}, policy_supported = true) {
  return classifyOperationRecovery({
    operation: operation(patch),
    policy_supported,
    classify: workRecoveryClassification
  });
}

describe('operation recovery classification', () => {
  test.each(['verify', 'deploy', 'job'])(
    'proves reproduced owned %s failure',
    (kind) => {
      const result = classify({ kind });

      expect(result).toMatchObject({
        classification: 'local_code_defect',
        disposition: 'repair',
        reason: null,
        code_defect: true
      });
    }
  );

  test('hashes execution inputs and cause independently of the operation id', () => {
    const input = operation();
    const key = createHash('sha256')
      .update(
        JSON.stringify({
          repo_id: input.repo_id,
          kind: input.kind,
          target_sha: input.target_sha,
          script_blob_sha: input.script_blob_sha,
          script_mode: input.script_mode,
          failure_code: input.failure.code,
          fingerprint: input.failure.fingerprint
        })
      )
      .digest('hex');

    expect(classify({ operation_id: 'other' })?.handoff_key).toBe(key);
  });

  test.each(['queued', 'running', 'retry_pending', 'succeeded'])(
    'ignores %s operations',
    (state) => {
      expect(classify({ state })).toBeNull();
    }
  );

  test.each([
    ['repo_ops_worktree_unowned', 'ownership_uncertain'],
    ['repo_ops_ancestry_check_failed', 'ownership_uncertain'],
    ['remote_history_not_monotonic', 'ownership_uncertain'],
    ['repo_ops_worktree_align_failed', 'ownership_uncertain'],
    ['manual_target_missing', 'ownership_uncertain'],
    ['bootstrap_not_approved', 'ownership_uncertain'],
    ['interrupted_without_terminal_exit', 'unknown_outcome'],
    ['timeout', 'unknown_error'],
    ['credential_missing', 'credential_missing'],
    ['receipt_forgery', 'unknown_error'],
    ['discard_failed', 'unknown_error'],
    ['user_decision', 'unknown_error'],
    ['something_new', 'unknown_error']
  ])('preserves %s as %s without handoff', (code, classification) => {
    expect(classify({ failure: { code, fingerprint: 'same' } })).toMatchObject({
      classification,
      code_defect: false,
      handoff_key: null
    });
  });

  test('prioritizes interrupted effects over reproduced script evidence', () => {
    expect(
      classify({ failure: { ...operation().failure, interrupted: true } })
        ?.classification
    ).toBe('unknown_outcome');
  });

  test.each(['timeout', 'nonzero'])(
    'preserves fetch %s without a speculative repair',
    (fetch_failure) => {
      expect(
        classify({ failure: { ...operation().failure, fetch_failure } })
      ).toMatchObject({ classification: 'unknown_error', code_defect: false });
    }
  );

  test('holds an unsupported policy before ownership judgment', () => {
    expect(
      classify({ failure: { code: 'repo_ops_worktree_unowned' } }, false)
        ?.classification
    ).toBe('unknown_error');
  });

  test('rejudges raw evidence after retry policy support returns', () => {
    expect(
      classify({
        retry: { ...operation().retry, blocked_reason: 'schema_unsupported' }
      })?.classification
    ).toBe('local_code_defect');
  });

  test.each([
    ['Error: ECONNRESET', '', 'env_or_auth_pattern'],
    ['Error: not authenticated', '', 'env_or_auth_pattern'],
    ['npm ERR! Test failed', 'permission denied', 'env_or_auth_pattern'],
    ['npm ERR! Test failed', 'fetch failed', 'env_or_auth_pattern'],
    ['same exit code', '', 'no_script_failure_line']
  ])(
    'withholds code proof for reproduced output %s %s',
    (summary, detail, proof_gap) => {
      const result = classify({
        failure: { ...operation().failure, summary, detail }
      });

      expect(result).toMatchObject({
        classification: 'verification_failure',
        disposition: 'wait',
        reason: 'verification',
        code_defect: false,
        prover: null,
        proof_gap,
        handoff_key: null
      });
    }
  );

  test('waits for verification when the retry is inapplicable', () => {
    expect(
      classify({ retry: { ...operation().retry, outcome: 'not_applicable' } })
        ?.classification
    ).toBe('verification_failure');
  });

  test('waits for verification when reproduction changes the fingerprint', () => {
    expect(
      classify({
        failure: { ...operation().failure, fingerprint: 'different' }
      })?.classification
    ).toBe('verification_failure');
  });

  test.each([
    { started_at: null },
    { log_path: null },
    { target_sha: null },
    { kind: 'cleanup' },
    { retry: null },
    { retry: { outcome: 'pending' } }
  ])('requires complete reproduction evidence %j', (patch) => {
    expect(classify(patch)).toMatchObject({
      classification: 'unknown_error',
      code_defect: false,
      handoff_key: null
    });
  });

  test('withholds code proof for a signal-killed reproduction with no exit code', () => {
    expect(classify({ exit_code: null })).toMatchObject({
      classification: 'unknown_error',
      code_defect: false,
      handoff_key: null
    });
  });

  test('falls back to an unclassified wait if the contract cannot classify', () => {
    expect(
      classifyOperationRecovery({
        operation: operation(),
        policy_supported: false,
        classify: () => null
      })
    ).toMatchObject({
      classification: 'unknown_error',
      disposition: 'wait',
      reason: 'unclassified',
      code_defect: false
    });
  });
});

describe('repair handoff description', () => {
  test('meets the pinned section and baseline-red syntax', () => {
    const contract = JSON.parse(
      fs.readFileSync(
        new URL(
          '../../generated/contracts/quick-fix-handoff.json',
          import.meta.url
        ),
        'utf8'
      )
    );
    const checks = contract.quick_fix_handoff.checks;
    const description = repairHandoffDescription({
      operation_id: 'op',
      operation: operation()
    });

    for (const name of checks.sections.required) {
      expect(description).toMatch(
        new RegExp(checks.sections.heading_regex.replace('<name>', name), 'm')
      );
    }
    expect(description).toMatch(
      new RegExp(checks.baseline_red.line_regex, 'm')
    );
    expect(description).toContain(
      '- baseline_red: command=REPO_OPS_TARGET_SHA=' +
        'a'.repeat(40) +
        ' REPO_OPS_TARGET_BASE=main REPO_OPS_REPO_ROOT="$PWD" repo-ops/script/deploy' +
        ' | base=' +
        'a'.repeat(40) +
        ' | exit=2'
    );
    expect(description).toContain('## scope\n- repo-ops/script/deploy');
  });

  test('names the source evidence and log reference without reading the log', () => {
    const description = repairHandoffDescription({
      operation_id: 'op-123',
      operation: operation()
    });

    for (const value of [
      'UI-source',
      'op-123',
      'a'.repeat(40),
      'c'.repeat(40),
      'base main',
      'exit 2',
      'script_failed',
      'npm ERR! Test failed',
      '/logs/op.log',
      'exit=2'
    ]) {
      expect(description).toContain(value);
    }
  });
});
