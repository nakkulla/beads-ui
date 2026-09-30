import { describe, expect, test } from 'vitest';
import { orderCandidates, orderRunning } from './candidate-order.js';

describe('candidate order presets (UI-dbn6 §3.3)', () => {
  test('puts published candidates first under the spec preset', () => {
    const items = [
      { id: 'A-1', published: false, created_at: 1 },
      { id: 'A-2', published: true, created_at: 2 }
    ];

    const ids = orderCandidates(items, 'spec').map((item) => item.id);

    expect(ids).toEqual(['A-2', 'A-1']);
  });

  test('sorts by newest update under the updated preset', () => {
    const items = [
      { id: 'A-1', updated_at: 10 },
      { id: 'A-2', updated_at: 30 },
      { id: 'A-3', updated_at: 20 }
    ];

    const ids = orderCandidates(items, 'updated').map((item) => item.id);

    expect(ids).toEqual(['A-2', 'A-3', 'A-1']);
  });

  test('sorts missing values last', () => {
    const items = [{ id: 'A-1' }, { id: 'A-2', priority: 2 }];

    const ids = orderCandidates(items, 'bottleneck').map((item) => item.id);

    expect(ids).toEqual(['A-2', 'A-1']);
  });

  test('pulls a dependent right behind its blocker in the same list', () => {
    const items = [
      { id: 'A-1', updated_at: 30, blocked_by: ['A-3'] },
      { id: 'A-2', updated_at: 20 },
      { id: 'A-3', updated_at: 10 }
    ];

    const ids = orderCandidates(items, 'updated').map((item) => item.id);

    expect(ids).toEqual(['A-2', 'A-3', 'A-1']);
  });

  test('falls back to the spec preset for an unknown name', () => {
    const items = [
      { id: 'A-1', published: false },
      { id: 'A-2', published: true }
    ];

    const ids = orderCandidates(items, 'nope').map((item) => item.id);

    expect(ids).toEqual(['A-2', 'A-1']);
  });
});

describe('running lane order (UI-dbn6 §3.3)', () => {
  test('keeps the lane model order for 시작순', () => {
    const items = [{ id: 'A-1' }, { id: 'A-2' }];

    const ids = orderRunning(items, 'started').map((item) => item.id);

    expect(ids).toEqual(['A-1', 'A-2']);
  });

  test('reverses worker tiles and keeps session tiles last for 경과순', () => {
    const items = [
      { id: 'A-1' },
      { id: 'A-2' },
      { id: 'S-1', kind: 'session' }
    ];

    const ids = orderRunning(items, 'elapsed').map((item) => item.id);

    expect(ids).toEqual(['A-2', 'A-1', 'S-1']);
  });
});
