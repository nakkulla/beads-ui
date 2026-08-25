import { describe, expect, test } from 'vitest';
import { depCandidates, filterDepCandidates } from './dep-candidates.js';

/**
 * @import { DepCandidateIssue, DepCandidateModel } from './dep-candidates.js'
 */

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/**
 * @param {string} bead_id
 * @param {Partial<DepCandidateIssue>} [patch]
 * @returns {DepCandidateIssue}
 */
function issue(bead_id, patch = {}) {
  return {
    bead_id,
    root_dir: WS_A,
    workspace_name: 'repo-a',
    title: `title ${bead_id}`,
    lane: 'runnable',
    ...patch
  };
}

/**
 * @param {DepCandidateIssue[]} issues
 * @param {Array<[string, string[]]>} [edges]
 * @returns {DepCandidateModel}
 */
function candidateModel(issues, edges = []) {
  return { issues, blocked_by_map: new Map(edges) };
}

describe('depCandidates — 모집단 (UI-j92s §6.1)', () => {
  test('includes a waiting issue from another repo', () => {
    const model = candidateModel([
      issue('A-1'),
      issue('B-1', {
        root_dir: WS_B,
        workspace_name: 'repo-b',
        lane: 'queue'
      })
    ]);

    const candidates = depCandidates('A-1', model);

    expect(candidates.map((candidate) => candidate.bead_id)).toEqual(['B-1']);
  });

  test('excludes the issue the panel belongs to', () => {
    const model = candidateModel([issue('A-1'), issue('A-2')]);

    const candidates = depCandidates('A-1', model);

    expect(candidates.map((candidate) => candidate.bead_id)).toEqual(['A-2']);
  });

  test('excludes a done issue', () => {
    const model = candidateModel([
      issue('A-1'),
      issue('A-2', { lane: 'done' })
    ]);

    const candidates = depCandidates('A-1', model);

    expect(candidates).toEqual([]);
  });

  test('carries the repo badge and title of each candidate', () => {
    const model = candidateModel([
      issue('A-1'),
      issue('B-1', { root_dir: WS_B, workspace_name: 'repo-b' })
    ]);

    const candidates = depCandidates('A-1', model);

    expect([
      candidates[0].workspace_name,
      candidates[0].title,
      candidates[0].disabled
    ]).toEqual(['repo-b', 'title B-1', false]);
  });
});

describe('depCandidates — 제외 (UI-j92s §6.1)', () => {
  test('excludes a blocker that is already linked', () => {
    const model = candidateModel(
      [issue('A-1'), issue('A-2'), issue('A-3')],
      [['A-1', ['A-2']]]
    );

    const candidates = depCandidates('A-1', model);

    expect(candidates.map((candidate) => candidate.bead_id)).toEqual(['A-3']);
  });

  // 이미 출발한 이슈도 이 이슈를 막을 수 있다 — 막는 쪽의 진행 상태는 간선의
  // 성립과 무관하다.
  test('allows a running candidate', () => {
    const model = candidateModel([
      issue('A-1'),
      issue('A-2', { lane: 'running' })
    ]);

    const candidates = depCandidates('A-1', model);

    expect(candidates.map((candidate) => candidate.bead_id)).toEqual(['A-2']);
  });

  test('allows a PR 대기 candidate', () => {
    const model = candidateModel([
      issue('A-1'),
      issue('A-2', { lane: 'pr_wait' })
    ]);

    const candidates = depCandidates('A-1', model);

    expect(candidates.map((candidate) => candidate.bead_id)).toEqual(['A-2']);
  });
});

describe('depCandidates — 사이클 (UI-j92s §6.1)', () => {
  test('disables a predecessor that would close a cycle', () => {
    const model = candidateModel(
      [issue('A-1'), issue('A-2')],
      [['A-2', ['A-1']]]
    );

    const candidates = depCandidates('A-1', model);

    expect([candidates[0].disabled, candidates[0].reason]).toEqual([
      true,
      '사이클'
    ]);
  });

  test('disables a candidate reachable only through a transitive chain', () => {
    const model = candidateModel(
      [issue('A-1'), issue('A-2'), issue('A-3')],
      [
        ['A-2', ['A-1']],
        ['A-3', ['A-2']]
      ]
    );

    const candidates = depCandidates('A-1', model);

    expect(
      candidates.map((candidate) => [candidate.bead_id, candidate.disabled])
    ).toEqual([
      ['A-2', true],
      ['A-3', true]
    ]);
  });

  test('keeps an allowed candidate enabled with no reason', () => {
    const model = candidateModel([issue('A-1'), issue('A-2')]);

    const candidates = depCandidates('A-1', model);

    expect(candidates[0].disabled).toBe(false);
    expect(Object.hasOwn(candidates[0], 'reason')).toBe(false);
  });
});

describe('depCandidates — 정렬 (UI-j92s §6.1)', () => {
  test('sorts same-repo candidates before other repos', () => {
    const model = candidateModel([
      issue('A-5'),
      issue('B-1', { root_dir: WS_B, workspace_name: 'repo-b' }),
      issue('A-9')
    ]);

    const candidates = depCandidates('A-5', model);

    expect(candidates.map((candidate) => candidate.bead_id)).toEqual([
      'A-9',
      'B-1'
    ]);
  });

  test('sorts candidates of one repo by ascending id', () => {
    const model = candidateModel([
      issue('A-1'),
      issue('A-9'),
      issue('A-3'),
      issue('A-2')
    ]);

    const candidates = depCandidates('A-1', model);

    expect(candidates.map((candidate) => candidate.bead_id)).toEqual([
      'A-2',
      'A-3',
      'A-9'
    ]);
  });
});

describe('filterDepCandidates — 검색 (UI-j92s §6.1)', () => {
  test('matches a substring of the id', () => {
    const model = candidateModel([issue('A-1'), issue('A-2'), issue('B-11')]);
    const candidates = depCandidates('A-1', model);

    const found = filterDepCandidates(candidates, '-2');

    expect(found.map((candidate) => candidate.bead_id)).toEqual(['A-2']);
  });

  test('matches the title ignoring case', () => {
    const model = candidateModel([
      issue('A-1'),
      issue('A-2', { title: '레인 Refactor' }),
      issue('A-3')
    ]);
    const candidates = depCandidates('A-1', model);

    const found = filterDepCandidates(candidates, 'refactor');

    expect(found.map((candidate) => candidate.bead_id)).toEqual(['A-2']);
  });

  test('returns every candidate for an empty query', () => {
    const model = candidateModel([issue('A-1'), issue('A-2'), issue('A-3')]);
    const candidates = depCandidates('A-1', model);

    const found = filterDepCandidates(candidates, '   ');

    expect(found.map((candidate) => candidate.bead_id)).toEqual(['A-2', 'A-3']);
  });
});
