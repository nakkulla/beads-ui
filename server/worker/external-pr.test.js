/**
 * The external PR registry (UI-7agi §1) — the memory-only view of the beads a
 * normal session already delivered a PR for.
 */
import { describe, expect, test } from 'vitest';
import { createExternalPrStore } from './external-pr.js';
import { receiptProbeError } from './receipt-check.js';

const WS = '/tmp/example-workspace/project-ext';

/** @type {import('./receipt-check.js').ReceiptCheckResult} */
const OK_CHECK = {
  ok: true,
  violations: [],
  checks: {},
  probe_error: false
};

/** @type {import('./receipt-check.js').ReceiptCheckResult} */
const PROBE_CHECK = receiptProbeError('check_threw');

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
        repo_slug: 'o/r',
        foreign: false,
        added_at: 100,
        receipt_key: null,
        receipt_check: null
      }
    ]);
  });

  test('marks a row foreign when its url names another repository', () => {
    const store = createExternalPrStore({ now: () => 100 });

    store.replace(
      WS,
      [
        {
          bead_id: 'UI-1',
          pr_url: 'https://github.com/other/repo/pull/1',
          pr_number: 1
        },
        {
          bead_id: 'UI-2',
          pr_url: 'https://github.com/O/R/pull/2',
          pr_number: 2
        }
      ],
      { origin_slug: 'ghe.example.com/o/r' }
    );

    expect(store.list(WS).map((row) => [row.repo_slug, row.foreign])).toEqual([
      ['other/repo', true],
      ['O/R', false]
    ]);
  });

  test('marks nothing foreign without a resolvable origin', () => {
    const store = createExternalPrStore({ now: () => 100 });

    store.replace(
      WS,
      [
        {
          bead_id: 'UI-1',
          pr_url: 'https://github.com/other/repo/pull/1',
          pr_number: 1
        }
      ],
      { origin_slug: null }
    );

    expect(store.list(WS)[0].foreign).toBe(false);
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

  test('drop retires one row ahead of the next scan (UI-wwby §1)', () => {
    const store = createExternalPrStore();
    store.replace(WS, [
      { bead_id: 'UI-1', pr_url: 'u1', pr_number: 1 },
      { bead_id: 'UI-2', pr_url: 'u2', pr_number: 2 }
    ]);

    const dropped = store.drop(WS, 'UI-1');

    expect(dropped).toBe(true);
    expect(store.get(WS, 'UI-1')).toBe(null);
    expect(store.list(WS).map((r) => r.bead_id)).toEqual(['UI-2']);
  });

  test('drop reports false for a bead with no row', () => {
    const store = createExternalPrStore();
    store.replace(WS, [{ bead_id: 'UI-1', pr_url: 'u1', pr_number: 1 }]);

    expect(store.drop(WS, 'UI-9')).toBe(false);
    expect(store.list(WS).map((r) => r.bead_id)).toEqual(['UI-1']);
  });

  test('starts a new row with no receipt observation at all', () => {
    const store = createExternalPrStore();

    store.replace(WS, [{ bead_id: 'UI-1', pr_url: 'u', pr_number: 1 }]);

    expect(store.get(WS, 'UI-1')).toMatchObject({
      receipt_key: null,
      receipt_check: null
    });
  });

  test('preserves the receipt observation when the scan passes undefined', () => {
    const store = createExternalPrStore();
    store.replace(WS, [
      {
        bead_id: 'UI-1',
        pr_url: 'u',
        pr_number: 1,
        receipt_key: '["a"]',
        receipt_check: OK_CHECK
      }
    ]);

    store.replace(WS, [{ bead_id: 'UI-1', pr_url: 'u', pr_number: 1 }]);

    expect(store.get(WS, 'UI-1')).toMatchObject({
      receipt_key: '["a"]',
      receipt_check: OK_CHECK
    });
  });

  test('preserves receipt_check while the scan re-states an unchanged key', () => {
    const store = createExternalPrStore();
    store.replace(WS, [
      {
        bead_id: 'UI-1',
        pr_url: 'u',
        pr_number: 1,
        receipt_key: '["a"]',
        receipt_check: OK_CHECK
      }
    ]);

    store.replace(WS, [
      { bead_id: 'UI-1', pr_url: 'u', pr_number: 1, receipt_key: '["a"]' }
    ]);

    expect(store.get(WS, 'UI-1')?.receipt_check).toEqual(OK_CHECK);
  });

  test('replaces the receipt observation when the scan passes a new one', () => {
    const store = createExternalPrStore();
    store.replace(WS, [
      {
        bead_id: 'UI-1',
        pr_url: 'u',
        pr_number: 1,
        receipt_key: '["a"]',
        receipt_check: OK_CHECK
      }
    ]);

    store.replace(WS, [
      {
        bead_id: 'UI-1',
        pr_url: 'u',
        pr_number: 1,
        receipt_key: '["b"]',
        receipt_check: PROBE_CHECK
      }
    ]);

    expect(store.get(WS, 'UI-1')).toMatchObject({
      receipt_key: '["b"]',
      receipt_check: PROBE_CHECK
    });
  });

  test('clears the receipt observation when the scan passes an explicit null', () => {
    const store = createExternalPrStore();
    store.replace(WS, [
      {
        bead_id: 'UI-1',
        pr_url: 'u',
        pr_number: 1,
        receipt_key: '["a"]',
        receipt_check: OK_CHECK
      }
    ]);

    store.replace(WS, [
      {
        bead_id: 'UI-1',
        pr_url: 'u',
        pr_number: 1,
        receipt_key: null,
        receipt_check: null
      }
    ]);

    expect(store.get(WS, 'UI-1')).toMatchObject({
      receipt_key: null,
      receipt_check: null
    });
  });

  test('does not resurrect the receipt observation of a dropped row', () => {
    const store = createExternalPrStore();
    store.replace(WS, [
      {
        bead_id: 'UI-1',
        pr_url: 'u',
        pr_number: 1,
        receipt_key: '["a"]',
        receipt_check: OK_CHECK
      }
    ]);
    store.replace(WS, []);

    store.replace(WS, [{ bead_id: 'UI-1', pr_url: 'u', pr_number: 1 }]);

    expect(store.get(WS, 'UI-1')).toMatchObject({
      receipt_key: null,
      receipt_check: null
    });
  });

  test('clear drops every workspace', () => {
    const store = createExternalPrStore();
    store.replace(WS, [{ bead_id: 'UI-1', pr_url: 'u', pr_number: 1 }]);

    store.clear();

    expect(store.list(WS)).toEqual([]);
  });
});
