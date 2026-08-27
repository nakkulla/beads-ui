import { describe, expect, test } from 'vitest';
import {
  failureCategory,
  failureSentence,
  failureText,
  isKnownFailure,
  operationFailureText,
  retryOutcomeText,
  terminationText
} from './failure-labels.js';

describe('failureCategory', () => {
  test('maps a verify token to 검증 실패', () => {
    expect(failureCategory('verify_script_failure')).toBe('검증 실패');
  });

  test('maps a deploy token to 배포 실패', () => {
    expect(failureCategory('deploy_script_failure')).toBe('배포 실패');
  });

  test('maps an interruption token to 중단됨', () => {
    expect(failureCategory('interrupted_without_terminal_exit')).toBe('중단됨');
  });

  test('returns null for an unknown token', () => {
    expect(failureCategory('repo_ops_worktree_unowned')).toBeNull();
  });

  test('returns null for a non-string value', () => {
    expect(failureCategory(null)).toBeNull();
  });
});

describe('failureSentence', () => {
  test('maps a known code to its cause sentence', () => {
    expect(failureSentence('repo_ops_worktree_unowned')).toBe(
      '배포 워크트리가 아직 Worker 소유가 아니어서 스크립트 실행 전에 중단됐습니다.'
    );
  });

  test('takes the last matching segment of a composite code', () => {
    expect(failureSentence('verify_failed:gh_observation_failed')).toBe(
      'GitHub에서 PR 상태를 읽지 못했습니다.'
    );
  });

  test('returns null for an unknown code', () => {
    expect(failureSentence('surprise_new_token')).toBeNull();
  });
});

describe('failureText', () => {
  test('joins category and sentence for a composite code', () => {
    expect(failureText('verify_failed:gh_observation_failed')).toBe(
      '검증 실패 — GitHub에서 PR 상태를 읽지 못했습니다.'
    );
  });

  test('joins category and sentence for a single known code', () => {
    expect(failureText('deploy_script_failure')).toBe(
      '배포 실패 — 배포 스크립트가 실패했습니다.'
    );
  });

  test('returns the sentence alone when no category maps', () => {
    expect(failureText('repo_ops_worktree_unowned')).toBe(
      '배포 워크트리가 아직 Worker 소유가 아니어서 스크립트 실행 전에 중단됐습니다.'
    );
  });

  test('returns the category alone when no sentence maps', () => {
    expect(failureText('deploy_failed')).toBe('배포 실패');
  });

  test('falls back to the raw token for an unknown code', () => {
    expect(failureText('brand_new_contract_token')).toBe(
      'brand_new_contract_token'
    );
  });

  test('renders nothing for an absent code', () => {
    expect(failureText(undefined)).toBe('');
  });
});

describe('isKnownFailure', () => {
  test('reports a mapped code as known', () => {
    expect(isKnownFailure('verify_cmd_failed')).toBe(true);
  });

  test('reports an unmapped code as unknown', () => {
    expect(isKnownFailure('brand_new_contract_token')).toBe(false);
  });
});

describe('prototype-member tokens', () => {
  test('does not match a prototype member as a category', () => {
    expect(failureCategory('constructor')).toBeNull();
  });

  test('does not match a prototype member as a sentence', () => {
    expect(failureSentence('toString')).toBeNull();
  });

  test('falls back to the raw token for a prototype-member name', () => {
    expect(failureText('__proto__')).toBe('__proto__');
  });
});

describe('operationFailureText', () => {
  test('takes the category from the server classification', () => {
    expect(operationFailureText('deploy_script_failure', 'script_failed')).toBe(
      '배포 실패 — 배포 스크립트가 실패했습니다.'
    );
  });

  test('classifies a bare timeout by its lane too', () => {
    expect(operationFailureText('verify_script_failure', 'timeout')).toBe(
      '검증 실패 — 검증 스크립트가 실패했습니다.'
    );
  });

  test('prefers the specific cause sentence over the kind sentence', () => {
    expect(operationFailureText('other', 'repo_ops_worktree_unowned')).toBe(
      '배포 워크트리가 아직 Worker 소유가 아니어서 스크립트 실행 전에 중단됐습니다.'
    );
  });

  test('falls back to the raw code when neither half maps', () => {
    expect(operationFailureText('other', 'a_future_failure_code')).toBe(
      'a_future_failure_code'
    );
  });

  test('renders nothing when there is no failure at all', () => {
    expect(operationFailureText(null, '')).toBe('');
  });
});

describe('cleanup step-1 (base 포함 확인) codes', () => {
  /** Every reason `base_containment` can record (server/worker/pr-actions.js). */
  const BASE_CODES = [
    'base_unresolved:no_resolver',
    'base_unresolved:git_error',
    'base_ref_unobserved',
    'merge_sha_unobserved',
    'base_fetch_failed',
    'base_rev_unavailable',
    'base_ff_diverged',
    'deployment_target_not_covering_merge',
    'deployment_candidate_ancestry_check_failed'
  ];

  test('names a diverged local base branch', () => {
    expect(failureSentence('base_ff_diverged')).toBe(
      '로컬 base 브랜치가 원격과 갈라져 fast-forward로 정렬할 수 없습니다.'
    );
  });

  test('names an unresolved base through the composite prefix', () => {
    expect(failureSentence('base_unresolved:no_resolver')).toBe(
      'PR이 어느 base 브랜치로 머지되는지 확정하지 못했습니다.'
    );
  });

  test('renders the sentence alone because no category maps', () => {
    expect(failureText('base_fetch_failed')).toBe(
      '원격 base 브랜치를 fetch하지 못했습니다.'
    );
  });

  test('leaves the step-1 codes out of the three category words', () => {
    expect(BASE_CODES.map(failureCategory)).toEqual(BASE_CODES.map(() => null));
  });

  test('maps every code the step can record', () => {
    expect(BASE_CODES.filter((code) => !isKnownFailure(code))).toEqual([]);
  });
});

/**
 * One `repo_operations[]` card in the SERVER's projected shape
 * (`projectRepoOperations`, server/ws/worker-handlers.js): every key that
 * projection emits, with the durable defaults a failed script run produces.
 *
 * The fixture matters more than usual here — the two derived lines read fields
 * the projection is the only writer of, so a fixture invented from the design
 * doc rather than from the projection could pass while the real card renders
 * nothing.
 *
 * @param {Record<string, any>} [patch]
 */
function card(patch = {}) {
  return {
    operation_id: 'op-1',
    kind: 'deploy',
    repo_id: '/repo',
    target_base: 'main',
    target_sha: 'c'.repeat(40),
    target_tree: 'd'.repeat(40),
    effective_base_sha: 'b'.repeat(40),
    script_path: 'repo-ops/script/deploy',
    script_blob_sha: 'e'.repeat(40),
    script_mode: '100755',
    state: 'failed',
    requested_at: 1000,
    started_at: 1100,
    finished_at: 43_100,
    elapsed_ms: 42_000,
    exit_code: 1,
    signal: null,
    log_path: '/logs/op-1.log',
    log_digest: 'a'.repeat(64),
    output_tail: 'deploy exited with 1',
    subjects: [],
    failure: {
      code: 'script_failed',
      fingerprint: 'f'.repeat(64),
      detail: '',
      interrupted: false
    },
    failure_kind: 'deploy_script_failure',
    verify_stage: null,
    retry: {
      status: 'not_applicable',
      first_fingerprint: 'f'.repeat(64),
      blocked_reason: null,
      absorbed: null
    },
    superseded_by: null,
    dismissed: null,
    ...patch
  };
}

describe('terminationText (UI-s582 §2 종료 원인)', () => {
  test('names a nonzero exit with its elapsed time', () => {
    expect(terminationText(card())).toBe('exit 1 · 42.0초');
  });

  test('names the signal instead when the process was killed', () => {
    expect(
      terminationText(
        card({ exit_code: null, signal: 'SIGKILL', elapsed_ms: 190_000 })
      )
    ).toBe('signal SIGKILL · 3분 10초');
  });

  test('names a timeout before the exit code the wrapper recorded', () => {
    expect(
      terminationText(
        card({
          exit_code: 124,
          failure: {
            code: 'timeout',
            fingerprint: 'f'.repeat(64),
            detail: '',
            interrupted: false
          }
        })
      )
    ).toBe('타임아웃 초과');
  });

  test('carries the declared limit when the caller has the declaration', () => {
    expect(
      terminationText(
        card({
          exit_code: 124,
          failure: {
            code: 'timeout',
            fingerprint: 'f'.repeat(64),
            detail: '',
            interrupted: false
          }
        }),
        600_000
      )
    ).toBe('타임아웃 600초 초과');
  });

  test('names an interruption before any exit code', () => {
    expect(
      terminationText(
        card({
          exit_code: 1,
          failure: {
            code: 'interrupted',
            fingerprint: 'f'.repeat(64),
            detail: 'marker_missing',
            interrupted: true
          },
          failure_kind: 'interrupted_without_terminal_exit'
        })
      )
    ).toBe('종료 기록 없음 — 중단됨');
  });

  test('omits the line for a declaration-stage failure', () => {
    expect(
      terminationText(
        card({
          failure: {
            code: 'repo_ops_fetch_failed',
            fingerprint: 'f'.repeat(64),
            detail: '',
            interrupted: false
          },
          failure_kind: 'repo_ops_fetch_failed'
        })
      )
    ).toBe('');
  });

  test('omits the line for an unresolved-sibling wait failure', () => {
    expect(
      terminationText(
        card({
          failure: {
            code: 'repo_operation_timeout_unresolved',
            fingerprint: 'f'.repeat(64),
            detail: '',
            interrupted: false
          },
          failure_kind: 'repo_operation_timeout_unresolved'
        })
      )
    ).toBe('');
  });

  test('omits the line when no field says how the process ended', () => {
    expect(terminationText(card({ exit_code: null, signal: null }))).toBe('');
  });

  test('omits the elapsed suffix when the card has no elapsed time', () => {
    expect(terminationText(card({ elapsed_ms: null }))).toBe('exit 1');
  });

  test('renders nothing for a card that did not fail', () => {
    expect(
      terminationText(card({ state: 'succeeded', exit_code: 0, failure: null }))
    ).toBe('');
  });
});

describe('retryOutcomeText (UI-s582 §2 재시도 결과)', () => {
  test('reads blocked_reason first, without comparing fingerprints', () => {
    expect(
      retryOutcomeText(
        card({
          retry: {
            status: 'not_applicable',
            first_fingerprint: 'a'.repeat(64),
            blocked_reason: 'schema_unsupported',
            absorbed: null
          }
        })
      )
    ).toBe('자동 재시도 못 함 — 핀된 정책 스키마를 지원하지 않습니다.');
  });

  test('falls back to the raw token for an unknown block reason', () => {
    expect(
      retryOutcomeText(
        card({
          retry: {
            status: 'not_applicable',
            first_fingerprint: null,
            blocked_reason: 'a_future_reason',
            absorbed: null
          }
        })
      )
    ).toBe('자동 재시도 못 함 — a_future_reason');
  });

  test('names an absorbed first failure on the succeeded card', () => {
    expect(
      retryOutcomeText(
        card({
          state: 'succeeded',
          exit_code: 0,
          failure: null,
          failure_kind: null,
          retry: {
            status: 'absorbed',
            first_fingerprint: 'a'.repeat(64),
            blocked_reason: null,
            absorbed: {
              first_failure: {
                code: 'deploy_script_failure',
                fingerprint: 'a'.repeat(64),
                detail: '',
                interrupted: false
              },
              first_fingerprint: 'a'.repeat(64),
              at: 40_000
            }
          }
        })
      )
    ).toBe(
      '자동 재시도로 해소됨 — 첫 실패: 배포 실패 — 배포 스크립트가 실패했습니다.'
    );
  });

  test('reports a consumed retry that hit the same failure', () => {
    expect(
      retryOutcomeText(
        card({
          retry: {
            status: 'consumed',
            first_fingerprint: 'f'.repeat(64),
            blocked_reason: null,
            absorbed: null
          }
        })
      )
    ).toBe('자동 재시도 1회 — 같은 실패');
  });

  test('reports a consumed retry that hit a different failure', () => {
    expect(
      retryOutcomeText(
        card({
          retry: {
            status: 'consumed',
            first_fingerprint: 'a'.repeat(64),
            blocked_reason: null,
            absorbed: null
          }
        })
      )
    ).toBe('자동 재시도 1회 — 다른 실패');
  });

  test('says a failure was never a retry candidate', () => {
    expect(retryOutcomeText(card())).toBe(
      '재시도 대상 아님 — 스크립트 실행 전 실패'
    );
  });

  test('says nothing on a plain success the normalizer calls not_applicable', () => {
    expect(
      retryOutcomeText(
        card({
          state: 'succeeded',
          exit_code: 0,
          failure: null,
          failure_kind: null,
          retry: {
            status: 'not_applicable',
            first_fingerprint: null,
            blocked_reason: null,
            absorbed: null
          }
        })
      )
    ).toBe('');
  });

  test('says nothing while the retry has not been used yet', () => {
    expect(
      retryOutcomeText(
        card({
          state: 'retry_pending',
          retry: {
            status: 'unconsumed',
            first_fingerprint: 'f'.repeat(64),
            blocked_reason: null,
            absorbed: null
          }
        })
      )
    ).toBe('');
  });

  test('treats a consumed status with no first fingerprint as no evidence', () => {
    expect(
      retryOutcomeText(
        card({
          retry: {
            status: 'consumed',
            first_fingerprint: null,
            blocked_reason: null,
            absorbed: null
          }
        })
      )
    ).toBe('');
  });
});
