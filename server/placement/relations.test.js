import { describe, expect, test, vi } from 'vitest';
import { placementRelations } from './relations.js';

/**
 * A relations input with every fact empty and every material present.
 *
 * @param {Partial<import('./relations.js').RelationsInput>} overrides
 * @returns {import('./relations.js').RelationsInput}
 */
function input(overrides) {
  const candidates = overrides.candidates || [];
  const members = overrides.members || [];
  return {
    candidates,
    members,
    blocked_by: {},
    scopes: {},
    lane_edges: [],
    digests: Object.fromEntries(
      [...candidates, ...members].map((id) => [id, `d-${id}`])
    ),
    judgmentFor: () => null,
    key_state: 'present',
    ...overrides
  };
}

/**
 * @param {string} choice
 * @param {number} confidence
 * @returns {import('./relations.js').PairJudgment}
 */
function answered(choice, confidence) {
  return /** @type {any} */ ({
    kind: 'answer',
    choice,
    confidence,
    judged_at: 1_700
  });
}

describe('fixed relations', () => {
  test('orders a pair by a blocks edge in small-id orientation', () => {
    const facts = input({
      candidates: ['UI-b'],
      members: ['UI-a'],
      blocked_by: { 'UI-b': ['UI-a'] }
    });

    const out = placementRelations(facts);

    expect(out.relations['UI-a|UI-b']).toMatchObject({
      a: 'UI-a',
      b: 'UI-b',
      relation: 'a_first',
      source: 'fixed',
      basis: 'blocks'
    });
  });

  test('orders the candidate first when it blocks the other bead', () => {
    const facts = input({
      candidates: ['UI-b'],
      members: ['UI-a'],
      blocked_by: { 'UI-a': ['UI-b'] }
    });

    const out = placementRelations(facts);

    expect(out.relations['UI-a|UI-b'].relation).toBe('b_first');
  });

  test('relates a scope-only overlap through jev', () => {
    const facts = input({
      candidates: ['UI-1', 'UI-2'],
      scopes: { 'UI-1': ['server/worker/'], 'UI-2': ['server/worker/a.js'] }
    });

    const out = placementRelations(facts);

    expect(out.relations['UI-1|UI-2']).toBeUndefined();
    expect(out.jev_pairs).toEqual([
      { a: 'UI-1', b: 'UI-2', overlap: ['server/worker/a.js'] }
    ]);
    expect(out.progress).toEqual({ done: 0, total: 1 });
  });

  test('keeps a blocks pair fixed and unasked', () => {
    const judgmentFor = vi.fn(() => answered('independent', 0.99));
    const facts = input({
      candidates: ['UI-1', 'UI-2'],
      blocked_by: { 'UI-2': ['UI-1'] },
      scopes: { 'UI-1': ['server/worker/'], 'UI-2': ['server/worker/a.js'] },
      judgmentFor
    });

    const out = placementRelations(facts);

    expect(out.relations['UI-1|UI-2']).toMatchObject({
      relation: 'a_first',
      source: 'fixed',
      basis: 'blocks'
    });
    expect(out.relations['UI-1|UI-2'].overlap).toBeUndefined();
    expect(out.jev_pairs).toEqual([]);
    expect(judgmentFor).not.toHaveBeenCalled();
  });

  test('ships the overlap on a jev relation', () => {
    const facts = input({
      candidates: ['UI-1', 'UI-2'],
      scopes: { 'UI-1': ['tests'], 'UI-2': ['tests/a.test.js', 'app/'] },
      judgmentFor: () => answered('independent', 0.93)
    });

    const out = placementRelations(facts);

    expect(out.relations['UI-1|UI-2']).toMatchObject({
      relation: 'independent',
      source: 'jev',
      overlap: ['tests/a.test.js']
    });
  });

  test('leaves the overlap off a jev relation without one', () => {
    const facts = input({
      candidates: ['UI-1', 'UI-2'],
      scopes: { 'UI-1': ['app/'], 'UI-2': ['server/'] },
      judgmentFor: () => answered('independent', 0.93)
    });

    const out = placementRelations(facts);

    expect(out.relations['UI-1|UI-2'].overlap).toBeUndefined();
  });

  test('keeps a fixed pair away from jev even with a cached answer', () => {
    const judgmentFor = vi.fn(() => answered('independent', 0.99));
    const facts = input({
      candidates: ['UI-1'],
      members: ['UI-2'],
      blocked_by: { 'UI-1': ['UI-2'] },
      judgmentFor
    });

    const out = placementRelations(facts);

    expect(out.relations['UI-1|UI-2'].source).toBe('fixed');
    expect(out.jev_pairs).toEqual([]);
    expect(judgmentFor).not.toHaveBeenCalled();
  });

  test('ships an in-lane blocks edge between two lane members', () => {
    const facts = input({
      candidates: [],
      members: ['UI-5', 'UI-6'],
      lane_edges: [{ blocker: 'UI-6', blockee: 'UI-5' }]
    });

    const out = placementRelations(facts);

    expect(out.relations['UI-5|UI-6']).toMatchObject({
      relation: 'b_first',
      source: 'fixed',
      basis: 'blocks',
      in_lane: true
    });
  });

  test('ships an in-lane blocks cycle as conflict so both edges survive', () => {
    const facts = input({
      candidates: [],
      members: ['UI-5', 'UI-6'],
      lane_edges: [
        { blocker: 'UI-6', blockee: 'UI-5' },
        { blocker: 'UI-5', blockee: 'UI-6' }
      ]
    });

    const out = placementRelations(facts);

    expect(out.relations['UI-5|UI-6']).toMatchObject({
      relation: 'conflict',
      source: 'fixed',
      basis: 'blocks',
      in_lane: true
    });
  });
});

describe('jev relations', () => {
  test('adopts an answer at the 0.8 confidence', () => {
    const facts = input({
      candidates: ['UI-1'],
      members: ['UI-2'],
      judgmentFor: () => answered('a_first', 0.8)
    });

    const out = placementRelations(facts);

    expect(out.relations['UI-1|UI-2']).toEqual({
      a: 'UI-1',
      b: 'UI-2',
      relation: 'a_first',
      source: 'jev',
      confidence: 0.8,
      jev_choice: 'a_first',
      judged_at: 1_700
    });
  });

  test('reads an answer below 0.8 as unknown and keeps its first choice', () => {
    const facts = input({
      candidates: ['UI-1'],
      members: ['UI-2'],
      judgmentFor: () => answered('conflict', 0.62)
    });

    const out = placementRelations(facts);

    expect(out.relations['UI-1|UI-2']).toMatchObject({
      relation: 'unknown',
      jev_choice: 'conflict',
      confidence: 0.62
    });
  });

  test('lists a candidate pair once in the jev pairs', () => {
    const facts = input({ candidates: ['UI-1', 'UI-2'] });

    const out = placementRelations(facts);

    expect(out.jev_pairs).toEqual([{ a: 'UI-1', b: 'UI-2' }]);
  });
});

describe('candidate states', () => {
  test('reads ready when every jev pair has an answer of any confidence', () => {
    const facts = input({
      candidates: ['UI-1'],
      members: ['UI-2', 'UI-3'],
      judgmentFor: () => answered('independent', 0.4)
    });

    const out = placementRelations(facts);

    expect(out.status['UI-1']).toEqual({ state: 'ready', done: 2, total: 2 });
  });

  test('reads pending with counts while a pair waits for its answer', () => {
    const facts = input({
      candidates: ['UI-1'],
      members: ['UI-2', 'UI-3', 'UI-4'],
      judgmentFor: (a, b) =>
        b === 'UI-2' ? answered('independent', 0.9) : null
    });

    const out = placementRelations(facts);

    expect(out.status['UI-1']).toEqual({
      state: 'pending',
      reason: 'judging',
      done: 1,
      total: 3
    });
  });

  test('reads pending for a pair whose material is missing', () => {
    const facts = input({
      candidates: ['UI-1'],
      members: ['UI-2'],
      digests: { 'UI-1': 'd-1', 'UI-2': null }
    });

    const out = placementRelations(facts);

    expect(out.status['UI-1']).toMatchObject({
      state: 'pending',
      reason: 'material_missing'
    });
    expect(out.jev_pairs).toEqual([]);
  });

  test('reads unavailable with the failure reason of a failed pair', () => {
    const facts = input({
      candidates: ['UI-1'],
      members: ['UI-2'],
      judgmentFor: () => ({ kind: 'failed', reason: 'timeout' })
    });

    const out = placementRelations(facts);

    expect(out.status['UI-1']).toEqual({
      state: 'unavailable',
      reason: 'timeout',
      done: 0,
      total: 1
    });
  });

  test('reads unavailable as key_missing once the key is known missing', () => {
    const facts = input({
      candidates: ['UI-1'],
      members: ['UI-2'],
      key_state: 'missing'
    });

    const out = placementRelations(facts);

    expect(out.status['UI-1']).toMatchObject({
      state: 'unavailable',
      reason: 'key_missing'
    });
  });

  test('reads fixed_only when blocks edges decide every pair', () => {
    const facts = input({
      candidates: ['UI-1'],
      members: ['UI-2'],
      blocked_by: { 'UI-1': ['UI-2'] }
    });

    const out = placementRelations(facts);

    expect(out.status['UI-1']).toEqual({ state: 'fixed_only' });
  });

  test('reads no_counterpart for a lone candidate', () => {
    const facts = input({ candidates: ['UI-1'] });

    const out = placementRelations(facts);

    expect(out.status['UI-1']).toEqual({ state: 'no_counterpart' });
  });
});
