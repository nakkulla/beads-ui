/**
 * The external PR registry (UI-7agi §1) — the memory-only view of the beads a
 * normal session already delivered a PR for.
 */
import { describe, expect, test } from 'vitest';
import { createExternalPrStore } from './external-pr.js';

const WS = '/tmp/example-workspace/project-ext';

describe('worker/external-pr', () => {
  test('returns an empty list for an unseen workspace', () => {
    const store = createExternalPrStore();

    expect(store.list(WS)).toEqual([]);
  });

  test('stores a scanned row with its parsed PR number', () => {
    const store = createExternalPrStore({ now: () => 100 });

    store.replace(WS, [
      { bead_id: 'UI-1', pr_url: 'https://github.com/o/r/pull/7', pr_number: 7 }
    ]);

    expect(store.list(WS)).toEqual([
      {
        bead_id: 'UI-1',
        pr_url: 'https://github.com/o/r/pull/7',
        pr_number: 7,
        added_at: 100
      }
    ]);
  });

  test('keeps a null pr_number rather than guessing one', () => {
    const store = createExternalPrStore({ now: () => 100 });

    store.replace(WS, [
      { bead_id: 'UI-1', pr_url: 'not-a-pr-url', pr_number: null }
    ]);

    expect(store.get(WS, 'UI-1')?.pr_number).toBe(null);
  });

  test('preserves added_at across a re-scan so the row keeps its position', () => {
    let clock = 100;
    const store = createExternalPrStore({ now: () => clock });
    store.replace(WS, [{ bead_id: 'UI-1', pr_url: 'u', pr_number: 1 }]);

    clock = 500;
    store.replace(WS, [
      { bead_id: 'UI-1', pr_url: 'u', pr_number: 1 },
      { bead_id: 'UI-2', pr_url: 'v', pr_number: 2 }
    ]);

    expect(store.list(WS).map((r) => [r.bead_id, r.added_at])).toEqual([
      ['UI-1', 100],
      ['UI-2', 500]
    ]);
  });

  test('drops a row the latest scan no longer reports', () => {
    const store = createExternalPrStore();
    store.replace(WS, [{ bead_id: 'UI-1', pr_url: 'u', pr_number: 1 }]);

    store.replace(WS, []);

    expect(store.list(WS)).toEqual([]);
    expect(store.get(WS, 'UI-1')).toBe(null);
  });

  test('keys workspaces by resolved path', () => {
    const store = createExternalPrStore();

    store.replace(`${WS}/./`, [{ bead_id: 'UI-1', pr_url: 'u', pr_number: 1 }]);

    expect(store.get(WS, 'UI-1')?.bead_id).toBe('UI-1');
  });

  test('ignores a row with no bead id', () => {
    const store = createExternalPrStore();

    store.replace(WS, [
      /** @type {any} */ ({ bead_id: '', pr_url: 'u', pr_number: 1 })
    ]);

    expect(store.list(WS)).toEqual([]);
  });

  test('clear drops every workspace', () => {
    const store = createExternalPrStore();
    store.replace(WS, [{ bead_id: 'UI-1', pr_url: 'u', pr_number: 1 }]);

    store.clear();

    expect(store.list(WS)).toEqual([]);
  });
});
