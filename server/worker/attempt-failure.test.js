import { describe, expect, test } from 'vitest';
import { createUnhandledFailurePredicate } from './attempt-failure.js';

describe('worker attempt failure projection', () => {
  test('returns only the latest unresolved undismissed failure', () => {
    const first = {
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      finished_at: 100,
      dismissed_at: null
    };
    const latest = {
      attempt_id: 'att-2',
      bead_id: 'UI-1',
      finished_at: 200,
      dismissed_at: null
    };
    const predicate = createUnhandledFailurePredicate({
      attempts: { first, latest },
      done: []
    });

    expect([first, latest].filter(predicate)).toEqual([latest]);
  });

  test('ignores a head review attempt when picking the bead last attempt', () => {
    const implementation = {
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      kind: 'implementation',
      finished_at: 100,
      dismissed_at: null
    };
    const head_review = {
      attempt_id: 'review:authority-1:aaa',
      bead_id: 'UI-1',
      kind: 'head_review',
      finished_at: 200,
      dismissed_at: null
    };
    const predicate = createUnhandledFailurePredicate({
      attempts: { implementation, head_review },
      done: []
    });

    expect([implementation, head_review].filter(predicate)).toEqual([
      implementation
    ]);
  });

  test('excludes failures resolved by done or dismissed explicitly', () => {
    const resolved = {
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      finished_at: 100,
      dismissed_at: null
    };
    const dismissed = {
      attempt_id: 'att-2',
      bead_id: 'UI-2',
      finished_at: 200,
      dismissed_at: 250
    };
    const predicate = createUnhandledFailurePredicate({
      attempts: { resolved, dismissed },
      done: [{ bead_id: 'UI-1', added_at: 100 }]
    });

    expect([resolved, dismissed].filter(predicate)).toEqual([]);
  });
});
