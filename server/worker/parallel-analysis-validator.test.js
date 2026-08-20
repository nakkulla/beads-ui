import { describe, expect, test } from 'vitest';
import {
  STRONG_CATEGORIES,
  isGroupEligible,
  validateAnalysisResult
} from './parallel-analysis-validator.js';

const DIGEST = 'd'.repeat(64);

/**
 * @param {any} over
 */
function resultOf(over = {}) {
  return {
    schema_version: 3,
    snapshot_digest: DIGEST,
    issues: [{ bead_id: 'UI-c', verdict: 'parallel_ok', reason: '독립' }],
    groups: [
      {
        members: ['UI-a', 'UI-b'],
        order: ['UI-a', 'UI-b'],
        confidence: 'high',
        categories: ['schema_or_migration'],
        reason: '같은 스키마',
        evidence: [
          { path: 'docs/spec.md', artifact_kind: 'spec', locator: 'queue.json' }
        ]
      }
    ],
    ...over
  };
}

/**
 * @param {any} over
 */
function contextOf(over = {}) {
  return {
    snapshot: {
      digest: DIGEST,
      target_ids: ['UI-a', 'UI-b', 'UI-c'],
      scope_overlaps: []
    },
    manifest: {
      files: [
        { path: 'docs/spec.md', kind: 'spec', bytes: 20, target_id: 'UI-a' }
      ],
      omissions: []
    },
    readBundleFile: (/** @type {string} */ p) =>
      p === 'docs/spec.md' ? '레인 상태는 queue.json 에 있다' : null,
    ...over
  };
}

describe('parallel-analysis result validator (UI-04vo seam I)', () => {
  test('accepts a well-formed exact partition and stamps group eligibility', () => {
    const verdict = validateAnalysisResult({
      result: resultOf(),
      ...contextOf()
    });

    expect(verdict.ok).toBe(true);
    expect(verdict.result.groups[0].eligible).toBe(true);
  });

  test('judges eligibility as high confidence plus a strong category', () => {
    expect(
      isGroupEligible({
        confidence: 'high',
        categories: [STRONG_CATEGORIES[0]]
      })
    ).toBe(true);
    expect(
      isGroupEligible({
        confidence: 'medium',
        categories: [STRONG_CATEGORIES[0]]
      })
    ).toBe(false);
    expect(isGroupEligible({ confidence: 'high', categories: [] })).toBe(false);
    expect(
      isGroupEligible({
        confidence: 'high',
        categories: ['declared_scope_overlap']
      })
    ).toBe(true);
  });

  test('rejects a wrong schema version', () => {
    const verdict = validateAnalysisResult({
      result: resultOf({ schema_version: 1 }),
      ...contextOf()
    });

    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toBe('schema_version');
  });

  test('returns schema version 3 for a valid result', () => {
    const verdict = validateAnalysisResult({
      result: resultOf(),
      ...contextOf()
    });

    expect(verdict.result.schema_version).toBe(3);
  });

  test('accepts a declared scope overlap group connected by server edges', () => {
    const verdict = validateAnalysisResult({
      result: resultOf({
        issues: [],
        groups: [
          {
            members: ['UI-a', 'UI-b', 'UI-c'],
            order: ['UI-a', 'UI-b', 'UI-c'],
            confidence: 'high',
            categories: ['declared_scope_overlap'],
            reason: '연결된 선언 scope',
            evidence: [
              {
                path: 'docs/spec.md',
                artifact_kind: 'spec',
                locator: 'queue.json'
              }
            ]
          }
        ]
      }),
      ...contextOf({
        snapshot: {
          digest: DIGEST,
          target_ids: ['UI-a', 'UI-b', 'UI-c'],
          scope_overlaps: [
            { pair: ['UI-a', 'UI-b'], prefixes: ['server'] },
            { pair: ['UI-b', 'UI-c'], prefixes: ['app'] }
          ]
        }
      })
    });

    expect(verdict.ok).toBe(true);
    expect(verdict.result.groups[0].eligible).toBe(true);
  });

  test('rejects a declared scope overlap group with a disconnected member', () => {
    const verdict = validateAnalysisResult({
      result: resultOf({
        issues: [],
        groups: [
          {
            members: ['UI-a', 'UI-b', 'UI-c'],
            order: ['UI-a', 'UI-b', 'UI-c'],
            confidence: 'high',
            categories: ['declared_scope_overlap'],
            reason: '끊긴 선언 scope',
            evidence: [
              {
                path: 'docs/spec.md',
                artifact_kind: 'spec',
                locator: 'queue.json'
              }
            ]
          }
        ]
      }),
      ...contextOf({
        snapshot: {
          digest: DIGEST,
          target_ids: ['UI-a', 'UI-b', 'UI-c'],
          scope_overlaps: [{ pair: ['UI-a', 'UI-b'], prefixes: ['server'] }]
        }
      })
    });

    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toBe('scope_overlap');
    expect(verdict.detail).toBe('UI-c');
  });

  test('rejects a declared scope overlap claim without a matching edge', () => {
    const verdict = validateAnalysisResult({
      result: resultOf({
        groups: [
          {
            ...resultOf().groups[0],
            categories: ['declared_scope_overlap']
          }
        ]
      }),
      ...contextOf()
    });

    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toBe('scope_overlap');
    expect(verdict.detail).toBe('UI-b');
  });

  test('leaves other strong category groups independent of scope edges', () => {
    const verdict = validateAnalysisResult({
      result: resultOf(),
      ...contextOf()
    });

    expect(verdict.ok).toBe(true);
  });

  test('rejects a snapshot digest mismatch', () => {
    const verdict = validateAnalysisResult({
      result: resultOf({ snapshot_digest: 'e'.repeat(64) }),
      ...contextOf()
    });

    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toBe('digest_mismatch');
  });

  test('rejects a partition that omits a target', () => {
    const verdict = validateAnalysisResult({
      result: resultOf({ issues: [] }),
      ...contextOf()
    });

    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toBe('partition');
  });

  test('rejects a partition with a duplicated or unknown id', () => {
    const dup = validateAnalysisResult({
      result: resultOf({
        issues: [
          { bead_id: 'UI-c', verdict: 'parallel_ok', reason: 'x' },
          { bead_id: 'UI-a', verdict: 'uncertain', reason: 'y' }
        ]
      }),
      ...contextOf()
    });
    const unknown = validateAnalysisResult({
      result: resultOf({
        issues: [
          { bead_id: 'UI-c', verdict: 'parallel_ok', reason: 'x' },
          { bead_id: 'UI-zz', verdict: 'uncertain', reason: 'y' }
        ]
      }),
      ...contextOf()
    });

    expect(dup.ok).toBe(false);
    expect(dup.reason).toBe('partition');
    expect(unknown.ok).toBe(false);
    expect(unknown.reason).toBe('partition');
  });

  test('rejects non-disjoint groups', () => {
    const verdict = validateAnalysisResult({
      result: resultOf({
        issues: [],
        groups: [
          {
            members: ['UI-a', 'UI-b'],
            order: ['UI-a', 'UI-b'],
            confidence: 'high',
            categories: ['schema_or_migration'],
            reason: 'x',
            evidence: [
              {
                path: 'docs/spec.md',
                artifact_kind: 'spec',
                locator: 'queue.json'
              }
            ]
          },
          {
            members: ['UI-b', 'UI-c'],
            order: ['UI-b', 'UI-c'],
            confidence: 'high',
            categories: ['schema_or_migration'],
            reason: 'y',
            evidence: [
              {
                path: 'docs/spec.md',
                artifact_kind: 'spec',
                locator: 'queue.json'
              }
            ]
          }
        ]
      }),
      ...contextOf()
    });

    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toBe('groups_overlap');
  });

  test('rejects an order that is not a permutation of members', () => {
    const verdict = validateAnalysisResult({
      result: resultOf({
        groups: [
          {
            members: ['UI-a', 'UI-b'],
            order: ['UI-a', 'UI-a'],
            confidence: 'high',
            categories: ['schema_or_migration'],
            reason: 'x',
            evidence: [
              {
                path: 'docs/spec.md',
                artifact_kind: 'spec',
                locator: 'queue.json'
              }
            ]
          }
        ]
      }),
      ...contextOf()
    });

    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toBe('order');
  });

  test('rejects a single-member group', () => {
    const verdict = validateAnalysisResult({
      result: resultOf({
        issues: [
          { bead_id: 'UI-b', verdict: 'parallel_ok', reason: 'x' },
          { bead_id: 'UI-c', verdict: 'parallel_ok', reason: 'y' }
        ],
        groups: [
          {
            members: ['UI-a'],
            order: ['UI-a'],
            confidence: 'high',
            categories: ['schema_or_migration'],
            reason: 'x',
            evidence: [
              {
                path: 'docs/spec.md',
                artifact_kind: 'spec',
                locator: 'queue.json'
              }
            ]
          }
        ]
      }),
      ...contextOf()
    });

    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toBe('group_size');
  });

  test('rejects an unknown category value', () => {
    const verdict = validateAnalysisResult({
      result: resultOf({
        groups: [
          {
            members: ['UI-a', 'UI-b'],
            order: ['UI-a', 'UI-b'],
            confidence: 'high',
            categories: ['same_repo'],
            reason: 'x',
            evidence: [
              {
                path: 'docs/spec.md',
                artifact_kind: 'spec',
                locator: 'queue.json'
              }
            ]
          }
        ]
      }),
      ...contextOf()
    });

    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toBe('category');
  });

  test('rejects fabricated evidence paths and locators', () => {
    const bad_path = validateAnalysisResult({
      result: resultOf({
        groups: [
          {
            members: ['UI-a', 'UI-b'],
            order: ['UI-a', 'UI-b'],
            confidence: 'high',
            categories: ['schema_or_migration'],
            reason: 'x',
            evidence: [
              {
                path: 'docs/other.md',
                artifact_kind: 'spec',
                locator: 'queue.json'
              }
            ]
          }
        ]
      }),
      ...contextOf()
    });
    const bad_locator = validateAnalysisResult({
      result: resultOf({
        groups: [
          {
            members: ['UI-a', 'UI-b'],
            order: ['UI-a', 'UI-b'],
            confidence: 'high',
            categories: ['schema_or_migration'],
            reason: 'x',
            evidence: [
              {
                path: 'docs/spec.md',
                artifact_kind: 'spec',
                locator: '존재하지 않는 문구'
              }
            ]
          }
        ]
      }),
      ...contextOf()
    });

    expect(bad_path.ok).toBe(false);
    expect(bad_path.reason).toBe('evidence');
    expect(bad_locator.ok).toBe(false);
    expect(bad_locator.reason).toBe('evidence');
  });

  test('never promotes a weak group instead of rejecting the whole result', () => {
    const verdict = validateAnalysisResult({
      result: resultOf({
        groups: [
          {
            members: ['UI-a', 'UI-b'],
            order: ['UI-a', 'UI-b'],
            confidence: 'medium',
            categories: ['schema_or_migration'],
            reason: 'x',
            evidence: [
              {
                path: 'docs/spec.md',
                artifact_kind: 'spec',
                locator: 'queue.json'
              }
            ]
          }
        ]
      }),
      ...contextOf()
    });

    expect(verdict.ok).toBe(true);
    expect(verdict.result.groups[0].eligible).toBe(false);
  });

  test('rejects a malformed result shape outright', () => {
    const verdict = validateAnalysisResult({
      result: 'not json object',
      ...contextOf()
    });

    expect(verdict.ok).toBe(false);
    expect(verdict.reason).toBe('shape');
  });
});
