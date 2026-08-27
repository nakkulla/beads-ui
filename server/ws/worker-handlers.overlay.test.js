import { describe, expect, test, vi } from 'vitest';

/** @type {import('../worker/external-pr.js').ExternalPrRow[]} */
let external_rows = [];

// Only the external registry is faked: `withExternalPrWait` reads it through
// the shared runtime, and every other decoration it touches already fails quiet
// without an attachment.
vi.mock('../worker/runtime.js', () => ({
  getWorkerRuntime: () => ({
    externalPrs: {
      list: () => external_rows
    }
  })
}));

const { withExternalPrWait } = await import('./worker-handlers.js');

const WS = '/tmp/example-workspace/project-a';

/**
 * @param {string} bead_id
 * @returns {import('../worker/external-pr.js').ExternalPrRow}
 */
function externalRow(bead_id) {
  return {
    bead_id,
    pr_url: 'https://github.com/o/r/pull/7',
    pr_number: 7,
    added_at: 1000,
    receipt_key: null,
    receipt_check: null
  };
}

describe('withExternalPrWait overlay exclusion (UI-7agi §2, UI-m6bg)', () => {
  test('synthesizes a pr_wait row for a bead the durable lanes do not hold', () => {
    external_rows = [externalRow('UI-1')];

    const out = withExternalPrWait(WS, { pr_wait: [], done: [] });

    expect(/** @type {any[]} */ (out.pr_wait).map((e) => e.bead_id)).toEqual([
      'UI-1'
    ]);
  });

  test('yields to the durable pr_wait row for the same bead', () => {
    external_rows = [externalRow('UI-1')];

    const out = withExternalPrWait(WS, {
      pr_wait: [{ bead_id: 'UI-1', added_at: 5 }],
      done: []
    });

    expect(/** @type {any[]} */ (out.pr_wait).map((e) => e.bead_id)).toEqual([
      'UI-1'
    ]);
  });

  test('draws no pr_wait row for a bead the done lane already holds', () => {
    external_rows = [externalRow('UI-1')];

    const out = withExternalPrWait(WS, {
      pr_wait: [],
      done: [{ bead_id: 'UI-1', added_at: 9 }]
    });

    expect(out.pr_wait).toEqual([]);
  });

  test('tolerates a snapshot with no done lane', () => {
    external_rows = [externalRow('UI-1')];

    const out = withExternalPrWait(WS, { pr_wait: [] });

    expect(/** @type {any[]} */ (out.pr_wait).map((e) => e.bead_id)).toEqual([
      'UI-1'
    ]);
  });
});
