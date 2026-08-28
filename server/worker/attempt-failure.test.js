import { describe, expect, test } from 'vitest';
import { createUnhandledFailurePredicate } from './attempt-failure.js';

describe('worker attempt failure projection', () => {
  test('returns only the latest unresolved undismissed failure', () => {
    const first = {
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      finished_at: 100,
      dismissed_at: null,
      halted_auto_advance: true
    };
    const latest = {
      attempt_id: 'att-2',
      bead_id: 'UI-1',
      finished_at: 200,
      dismissed_at: null,
      halted_auto_advance: true
    };
    const predicate = createUnhandledFailurePredicate({
      attempts: { first, latest },
      done: []
    });

    expect([first, latest].filter(predicate)).toEqual([latest]);
  });

  test('ignores a review session attempt when picking the bead last attempt', () => {
    const implementation = {
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      kind: 'implementation',
      finished_at: 100,
      dismissed_at: null,
      halted_auto_advance: true
    };
    const review_session = {
      attempt_id: 'review:authority-1:aaa',
      bead_id: 'UI-1',
      kind: 'review_session',
      finished_at: 200,
      dismissed_at: null,
      halted_auto_advance: true
    };
    const predicate = createUnhandledFailurePredicate({
      attempts: { implementation, review_session },
      done: []
    });

    expect([implementation, review_session].filter(predicate)).toEqual([
      implementation
    ]);
  });

  test('excludes failures resolved by done or dismissed explicitly', () => {
    const resolved = {
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      finished_at: 100,
      dismissed_at: null,
      halted_auto_advance: true
    };
    const dismissed = {
      attempt_id: 'att-2',
      bead_id: 'UI-2',
      finished_at: 200,
      dismissed_at: 250,
      halted_auto_advance: true
    };
    const predicate = createUnhandledFailurePredicate({
      attempts: { resolved, dismissed },
      done: [{ bead_id: 'UI-1', added_at: 100 }]
    });

    expect([resolved, dismissed].filter(predicate)).toEqual([]);
  });

  test('excludes a source attempt stamped by discard completion', () => {
    const discarded = {
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      status: 'discarded',
      finished_at: 100,
      dismissed_at: 200,
      halted_auto_advance: true
    };
    const predicate = createUnhandledFailurePredicate({
      attempts: { discarded },
      done: []
    });

    expect(predicate(discarded)).toBe(false);
  });
});

describe('worker attempt failure new-tier scope', () => {
  test('excludes an individual failure that never halted auto-advance', () => {
    const individual = {
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      kind: 'implementation',
      status: 'failed',
      cause: 'session_ended_unresolved',
      finished_at: 100,
      dismissed_at: null,
      halted_auto_advance: false
    };
    const predicate = createUnhandledFailurePredicate({
      attempts: { individual },
      done: []
    });

    expect(predicate(individual)).toBe(false);
  });

  test('does not let a new individual failure mask a legacy halt', () => {
    const legacy = {
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      kind: 'implementation',
      status: 'failed',
      finished_at: 100,
      dismissed_at: null,
      halted_auto_advance: true
    };
    const individual = {
      attempt_id: 'att-2',
      bead_id: 'UI-2',
      kind: 'implementation',
      status: 'failed',
      finished_at: 200,
      dismissed_at: null,
      halted_auto_advance: false
    };
    const predicate = createUnhandledFailurePredicate({
      attempts: { legacy, individual },
      done: []
    });

    expect([legacy, individual].filter(predicate)).toEqual([legacy]);
  });
});
