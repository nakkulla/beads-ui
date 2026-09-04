import { describe, expect, test } from 'vitest';
import {
  benchPassCaret,
  benchPresetGroups,
  benchProgress,
  medianStat
} from './bench-model.js';

/**
 * @param {Partial<Record<string, any>>} [overrides]
 * @returns {Record<string, any>}
 */
function makeRun(overrides = {}) {
  return {
    run_id: 'bench-1',
    source_bead_id: 'UI-src',
    repeats: 2,
    cell_count: 4,
    terminal_count: 3,
    presets: [
      { id: 'p1', name: '프리셋 A' },
      { id: 'p2', name: '프리셋 B' }
    ],
    cells: [
      {
        preset_id: 'p1',
        k: 1,
        bead_id: 'UI-c1',
        attempt_id: 'a1',
        status: 'done',
        terminal: true,
        bench_verify: { ok: true }
      },
      {
        preset_id: 'p1',
        k: 2,
        bead_id: 'UI-c2',
        attempt_id: 'a2',
        status: 'done',
        terminal: true,
        bench_verify: { ok: true }
      },
      {
        preset_id: 'p2',
        k: 1,
        bead_id: 'UI-c3',
        attempt_id: 'a3',
        status: 'done',
        terminal: true,
        bench_verify: { ok: false }
      },
      {
        preset_id: 'p2',
        k: 2,
        bead_id: 'UI-c4',
        attempt_id: null,
        status: null,
        terminal: false,
        bench_verify: null
      }
    ],
    ...overrides
  };
}

/**
 * @param {string} attempt_id
 * @param {Partial<Record<string, any>>} [overrides]
 * @returns {Record<string, any>}
 */
function makeRow(attempt_id, overrides = {}) {
  return {
    attempt_id,
    bead_id: `bead-${attempt_id}`,
    status: 'done',
    verify: 'pass',
    duration_ms: 60000,
    usage: { tokens: 1000, total_cost_usd: 1 },
    review: { blocking: 0, minor: 1, round: 1 },
    is_retry: false,
    failed: false,
    ...overrides
  };
}

describe('benchProgress', () => {
  test('renders the terminal over total fraction', () => {
    expect(benchProgress(makeRun())?.text).toBe('3/4');
  });

  test('returns null when the counts are absent', () => {
    expect(benchProgress({ run_id: 'x' })).toBeNull();
  });
});

describe('medianStat', () => {
  test('reports the median and its sample size', () => {
    const stat = medianStat([1, null, 3]);

    expect(stat).toEqual({ median: 2, sample: 2, total: 3 });
  });

  test('reports no median when nothing contributed', () => {
    expect(medianStat([null, null]).median).toBeNull();
  });
});

describe('benchPassCaret', () => {
  test('reports 1 when every judged repeat passed', () => {
    expect(benchPassCaret(['pass', 'pass'])).toEqual({ k: 2, value: 1 });
  });

  test('reports 0 when one judged repeat failed', () => {
    expect(benchPassCaret(['pass', 'fail'])).toEqual({ k: 2, value: 0 });
  });

  test('returns null below two judged cells', () => {
    expect(benchPassCaret(['pass', null])).toBeNull();
  });
});

describe('benchPresetGroups', () => {
  test('groups the cells of one run by preset', () => {
    const groups = benchPresetGroups(makeRun(), []);

    expect(groups.map((group) => group.name)).toEqual(['프리셋 A', '프리셋 B']);
  });

  test('joins comparison rows to cells by attempt id', () => {
    const groups = benchPresetGroups(makeRun(), [
      makeRow('a1'),
      makeRow('a2', { duration_ms: 120000 })
    ]);

    expect(groups[0].duration_ms).toEqual({
      median: 90000,
      sample: 2,
      total: 2
    });
  });

  test('writes pass^k when every repeat of a preset passed', () => {
    const groups = benchPresetGroups(makeRun(), [makeRow('a1'), makeRow('a2')]);

    expect(groups[0].pass_caret).toEqual({ k: 2, value: 1 });
  });

  test('counts an unjudged cell as 미상 rather than a failure', () => {
    const groups = benchPresetGroups(makeRun(), [
      makeRow('a3', { verify: 'fail' })
    ]);

    expect(groups[1].unknown_count).toBe(1);
    expect(groups[1].success_sample).toBe(1);
    expect(groups[1].success_rate).toBe(0);
  });

  test('keeps a cell without an attempt as an empty row', () => {
    const groups = benchPresetGroups(makeRun(), []);

    expect(groups[1].rows).toHaveLength(2);
    expect(groups[1].rows[1].bead_id).toBe('UI-c4');
    expect(groups[1].rows[1].verify).toBeNull();
  });

  test('falls back to the cell bench_verify when no row was found', () => {
    const groups = benchPresetGroups(makeRun(), []);

    expect(groups[0].success_rate).toBe(1);
    expect(groups[0].pass_caret).toEqual({ k: 2, value: 1 });
  });

  test('counts a failed cell status as a failure', () => {
    const run = makeRun();
    run.cells[3].status = 'failed';

    const groups = benchPresetGroups(run, []);

    expect(groups[1].failed_count).toBe(1);
  });

  test('returns nothing for a manifest it cannot read', () => {
    expect(benchPresetGroups(null, [])).toEqual([]);
  });
});
