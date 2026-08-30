import { describe, expect, test, vi } from 'vitest';

/** @type {import('../worker/external-pr.js').ExternalPrRow[]} */
let external_rows = [];

let wt_present_probe = false;

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

// The worktree probe is the one filesystem read a synthesized row makes; faking
// just that export keeps `wt_present` an assertable value instead of whatever a
// nonexistent workspace happens to answer.
vi.mock('../worker/attach.js', async (importOriginal) => ({
  .../** @type {Record<string, unknown>} */ (await importOriginal()),
  workerWorktreeExists: () => wt_present_probe
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
    repo_slug: 'o/r',
    foreign: false,
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

describe('withExternalPrWait merge_queue source (UI-17mj §2.1)', () => {
  // The scan excludes a bead the worker is running (UI-b8n8), so a
  // conflict-resolution session used to erase its own row from the lane.
  test('synthesizes a pr_wait row for a merge_queue bead the registry dropped', () => {
    external_rows = [];
    wt_present_probe = true;

    const out = withExternalPrWait(WS, {
      pr_wait: [],
      done: [],
      merge_queue: [{ bead_id: 'UI-1', authority: { granted_at: 700 } }]
    });

    expect(out.pr_wait).toEqual([
      { bead_id: 'UI-1', added_at: 700, external: true, wt_present: true }
    ]);
  });

  test('leaves added_at null when the queue item has no granted authority', () => {
    external_rows = [];

    const out = withExternalPrWait(WS, {
      pr_wait: [],
      merge_queue: [{ bead_id: 'UI-1' }]
    });

    expect(/** @type {any[]} */ (out.pr_wait)[0].added_at).toBe(null);
  });

  test('yields a merge_queue bead to the durable pr_wait row', () => {
    external_rows = [];

    const out = withExternalPrWait(WS, {
      pr_wait: [{ bead_id: 'UI-1', added_at: 5 }],
      merge_queue: [{ bead_id: 'UI-1' }]
    });

    expect(/** @type {any[]} */ (out.pr_wait).map((e) => e.bead_id)).toEqual([
      'UI-1'
    ]);
  });

  test('draws no row for a merge_queue bead the waiting queue holds', () => {
    external_rows = [];

    const out = withExternalPrWait(WS, {
      pr_wait: [],
      queue: [{ bead_id: 'UI-1' }],
      merge_queue: [{ bead_id: 'UI-1' }]
    });

    expect(out.pr_wait).toEqual([]);
  });

  test('draws no row for a merge_queue bead the done lane holds', () => {
    external_rows = [];

    const out = withExternalPrWait(WS, {
      pr_wait: [],
      done: [{ bead_id: 'UI-1' }],
      merge_queue: [{ bead_id: 'UI-1' }]
    });

    expect(out.pr_wait).toEqual([]);
  });

  test('draws one row for a bead the registry and the merge queue both hold', () => {
    external_rows = [externalRow('UI-1')];

    const out = withExternalPrWait(WS, {
      pr_wait: [],
      merge_queue: [{ bead_id: 'UI-1', authority: { granted_at: 700 } }]
    });

    expect(/** @type {any[]} */ (out.pr_wait).map((e) => e.added_at)).toEqual([
      1000
    ]);
  });

  test('ignores a merge_queue entry with no bead id', () => {
    external_rows = [];

    const out = withExternalPrWait(WS, {
      pr_wait: [],
      merge_queue: [{ bead_id: '' }, { note: 'x' }, null]
    });

    expect(out.pr_wait).toEqual([]);
  });

  test('ignores a merge_queue that is not an array', () => {
    external_rows = [];

    const out = withExternalPrWait(WS, {
      pr_wait: [],
      merge_queue: { bead_id: 'UI-1' }
    });

    expect(out.pr_wait).toEqual([]);
  });

  test('returns the queue untouched when neither source has a row', () => {
    external_rows = [];
    const queue = { pr_wait: [], done: [], merge_queue: [] };

    const out = withExternalPrWait(WS, queue);

    expect(out).toBe(queue);
  });

  test('yields a registry row to the waiting queue lane', () => {
    external_rows = [externalRow('UI-1')];

    const out = withExternalPrWait(WS, {
      pr_wait: [],
      queue: [{ bead_id: 'UI-1' }]
    });

    expect(out.pr_wait).toEqual([]);
  });
});
