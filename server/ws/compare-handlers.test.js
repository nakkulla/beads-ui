import { describe, expect, test, vi } from 'vitest';
import { compareRangeSince, handleGetCompare } from './compare-handlers.js';

function makeSocket() {
  /** @type {any[]} */
  const sent = [];
  return {
    sent,
    send: (/** @type {string} */ raw) => sent.push(JSON.parse(raw))
  };
}

describe('ws/compare-handlers', () => {
  test('replies with a compare-snapshot envelope', () => {
    const ws = makeSocket();
    const snapshot = vi.fn(() => ({ rows: [], groups: [], workspaces: [] }));

    handleGetCompare(
      /** @type {any} */ (ws),
      /** @type {any} */ ({ id: 'r1', type: 'get-compare', payload: {} }),
      { snapshot: /** @type {any} */ (snapshot) }
    );

    expect(ws.sent[0].type).toBe('compare-snapshot');
    expect(ws.sent[0].ok).toBe(true);
    expect(ws.sent[0].payload).toEqual({
      rows: [],
      groups: [],
      workspaces: []
    });
  });

  test('forwards the filters and resolves the period into a since bound', () => {
    const ws = makeSocket();
    const snapshot = vi.fn(() => ({ rows: [], groups: [], workspaces: [] }));

    handleGetCompare(
      /** @type {any} */ (ws),
      /** @type {any} */ ({
        id: 'r2',
        type: 'get-compare',
        payload: {
          range: '7d',
          root_dirs: ['/repo/one'],
          issue_types: ['bug'],
          routes: ['quick_fix'],
          include_bench: true
        }
      }),
      { snapshot: /** @type {any} */ (snapshot) }
    );

    const passed = /** @type {any} */ (snapshot.mock.calls[0])[0];
    expect(passed.root_dirs).toEqual(['/repo/one']);
    expect(passed.include_bench).toBe(true);
    expect(typeof passed.since).toBe('number');
  });

  test('answers a projection failure with an error reply', () => {
    const ws = makeSocket();

    handleGetCompare(
      /** @type {any} */ (ws),
      /** @type {any} */ ({ id: 'r3', type: 'get-compare', payload: {} }),
      {
        snapshot: /** @type {any} */ (
          () => {
            throw new Error('state unreadable');
          }
        )
      }
    );

    expect(ws.sent[0].ok).toBe(false);
    expect(ws.sent[0].error.code).toBe('compare_projection_failed');
  });

  test('keeps the whole history when the period value is unknown', () => {
    expect(compareRangeSince('nonsense')).toBeNull();
    expect(compareRangeSince('all')).toBeNull();
    expect(compareRangeSince('7d', 1_000_000_000)).toBe(
      1_000_000_000 - 7 * 864e5
    );
  });
});
