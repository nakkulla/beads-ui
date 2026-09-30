import { describe, expect, test } from 'vitest';
import {
  depCandidateModel,
  depCandidates,
  filterDepCandidates,
  isBeadIdLike
} from './dep-candidates.js';

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

describe('depCandidateModel — 후보 공급자 (UI-lx45 §3.1)', () => {
  const NOW = 1_700_000_000_000;

  test('collects running, PR 대기, queue and runnable issues with their lane', () => {
    const workspaces = [
      {
        root_dir: WS_A,
        name: 'repo-a',
        queue: [{ bead_id: 'A-queue', added_at: NOW }],
        pr_wait: [{ bead_id: 'A-pr', pr_url: 'https://example/pr/1' }],
        runnable: [{ bead_id: 'A-run', title: '실행가능' }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'A-live',
            status: 'running',
            started_at: NOW - 30_000,
            last_event_at: NOW - 2_000
          }
        },
        bead_titles: { 'A-live': '실행중', 'A-queue': '대기', 'A-pr': 'PR' },
        pr_observations: {}
      }
    ];

    const model = depCandidateModel(workspaces, []);

    expect(model.issues.map((issue) => [issue.bead_id, issue.lane])).toEqual([
      ['A-live', 'running'],
      ['A-pr', 'pr_wait'],
      ['A-queue', 'queue'],
      ['A-run', 'runnable']
    ]);
  });

  test('keeps only the first occurrence of a duplicated id', () => {
    const workspaces = [
      {
        root_dir: WS_A,
        name: 'repo-a',
        queue: [{ bead_id: 'A-dup', added_at: NOW }],
        pr_wait: [],
        runnable: [{ bead_id: 'A-dup', title: '실행가능' }],
        attempts: {},
        bead_titles: { 'A-dup': '대기' },
        pr_observations: {}
      }
    ];

    const model = depCandidateModel(workspaces, []);

    expect(model.issues.map((issue) => [issue.bead_id, issue.lane])).toEqual([
      ['A-dup', 'queue']
    ]);
  });

  test('carries the repo badge and title onto each candidate issue', () => {
    const workspaces = [
      {
        root_dir: WS_B,
        name: 'repo-b',
        queue: [],
        pr_wait: [],
        runnable: [{ bead_id: 'B-1', title: '레인 정합' }],
        attempts: {},
        bead_titles: {},
        pr_observations: {}
      }
    ];

    const model = depCandidateModel(workspaces, []);

    expect([
      model.issues[0].root_dir,
      model.issues[0].workspace_name,
      model.issues[0].title
    ]).toEqual([WS_B, 'repo-b', '레인 정합']);
  });

  test('filters issues by the root_dir option', () => {
    const workspaces = [
      {
        root_dir: WS_A,
        name: 'repo-a',
        queue: [],
        pr_wait: [],
        runnable: [{ bead_id: 'A-1', title: 'a' }],
        attempts: {},
        bead_titles: {},
        pr_observations: {}
      },
      {
        root_dir: WS_B,
        name: 'repo-b',
        queue: [],
        pr_wait: [],
        runnable: [{ bead_id: 'B-1', title: 'b' }],
        attempts: {},
        bead_titles: {},
        pr_observations: {}
      }
    ];

    const model = depCandidateModel(workspaces, [], { root_dir: WS_A });

    expect(model.issues.map((issue) => issue.bead_id)).toEqual(['A-1']);
  });

  test('keeps every repo in blocked_by_map even when issues are filtered', () => {
    const workspaces = [
      {
        root_dir: WS_A,
        name: 'repo-a',
        queue: [],
        pr_wait: [],
        runnable: [],
        attempts: {},
        bead_titles: {},
        pr_observations: {},
        bead_blocked_by: { 'A-1': ['B-1'] }
      },
      {
        root_dir: WS_B,
        name: 'repo-b',
        queue: [],
        pr_wait: [],
        runnable: [],
        attempts: {},
        bead_titles: {},
        pr_observations: {},
        bead_blocked_by: { 'B-1': ['B-2'] }
      }
    ];

    const model = depCandidateModel(workspaces, [], { root_dir: WS_A });

    expect(Array.from(model.blocked_by_map.entries())).toEqual([
      ['A-1', ['B-1']],
      ['B-1', ['B-2']]
    ]);
  });

  test('merges the blocked_by a runnable row carries itself', () => {
    const workspaces = [
      {
        root_dir: WS_A,
        name: 'repo-a',
        queue: [],
        pr_wait: [],
        runnable: [{ bead_id: 'A-1', title: 'a', blocked_by: ['A-9'] }],
        attempts: {},
        bead_titles: {},
        pr_observations: {}
      }
    ];

    const model = depCandidateModel(workspaces, []);

    expect(model.blocked_by_map.get('A-1')).toEqual(['A-9']);
  });

  test('returns empty collections for a missing snapshot', () => {
    const model = depCandidateModel(null, null);

    expect([model.issues, model.blocked_by_map.size]).toEqual([[], 0]);
  });
});

describe('isBeadIdLike', () => {
  test('accepts a prefix-suffix id of another rig', () => {
    expect(isBeadIdLike('dotfiles-98gr')).toBe(true);
  });

  test('accepts an id padded with surrounding spaces', () => {
    expect(isBeadIdLike('  UI-k9e9  ')).toBe(true);
  });

  test('rejects a query without a hyphen', () => {
    expect(isBeadIdLike('k9e9')).toBe(false);
  });

  test('rejects a query with an empty side of the hyphen', () => {
    expect([isBeadIdLike('UI-'), isBeadIdLike('-98gr')]).toEqual([
      false,
      false
    ]);
  });

  test('rejects a multi word query', () => {
    expect(isBeadIdLike('dep add UI-1')).toBe(false);
  });

  test('rejects an empty query', () => {
    expect(isBeadIdLike('   ')).toBe(false);
  });
});
