import { describe, expect, test } from 'vitest';
import {
  failureCategory,
  failureSentence,
  failureText,
  isKnownFailure,
  operationFailureText
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
