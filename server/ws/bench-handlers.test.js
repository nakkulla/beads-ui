import { describe, expect, test } from 'vitest';
import {
  benchSourceOf,
  newBenchRunId,
  projectBenchRun
} from './bench-handlers.js';

describe('newBenchRunId', () => {
  test('produces an id in the contract run-id vocabulary', () => {
    const id = newBenchRunId(() => Date.parse('2026-09-04T10:20:30Z'));

    expect(id).toMatch(/^[A-Za-z0-9._-]+$/);
    expect(id.startsWith('bench-20260904102030')).toBe(true);
  });

  test('does not repeat within one millisecond', () => {
    const at = () => 1700000000000;

    expect(newBenchRunId(at)).not.toBe(newBenchRunId(at));
  });
});

describe('benchSourceOf', () => {
  test('keeps the description byte for byte', () => {
    const source = benchSourceOf({
      id: 'UI-a',
      title: '제목',
      description: '본문\n\n마지막 줄\n',
      metadata: { route: 'quick_fix', quick_fix_review: 'self@abc' }
    });

    expect(source.description).toBe('본문\n\n마지막 줄\n');
    expect(source.quick_fix_review).toBe('self@abc');
    expect(source.route).toBe('quick_fix');
  });

  test('reads an absent body as an empty one rather than throwing', () => {
    const source = benchSourceOf({ id: 'UI-a', title: '제목' });

    expect(source.description).toBe('');
    expect(source.quick_fix_review).toBe('');
  });
});

const MANIFEST = {
  run_id: 'bench-1',
  source_bead_id: 'UI-src',
  cells: [
    { preset_id: 'p1', k: 1, bead_id: 'UI-c1' },
    { preset_id: 'p1', k: 2, bead_id: 'UI-c2' }
  ]
};

/**
 * @param {Record<string, any[]>} rows
 */
function fakeStore(rows) {
  return {
    /**
     * @param {string} root_dir
     * @param {string} bead_id
     */
    readAttemptsForBead(root_dir, bead_id) {
      return rows[bead_id] ?? [];
    }
  };
}

describe('projectBenchRun', () => {
  test('counts the cells that reached a terminal attempt', () => {
    const run = projectBenchRun(MANIFEST, '/repo', {
      queueStore: fakeStore({
        'UI-c1': [{ attempt_id: 'a1', status: 'done', done_kind: 'bench' }],
        'UI-c2': [{ attempt_id: 'a2', status: 'running' }]
      })
    });

    expect(run.cell_count).toBe(2);
    expect(run.terminal_count).toBe(1);
  });

  test('carries the last implementation attempt of each cell', () => {
    const run = projectBenchRun(MANIFEST, '/repo', {
      queueStore: fakeStore({
        'UI-c1': [
          { attempt_id: 'a0', status: 'failed' },
          { attempt_id: 'a1', status: 'done', done_kind: 'bench' }
        ]
      })
    });

    expect(run.cells[0]).toMatchObject({
      bead_id: 'UI-c1',
      attempt_id: 'a1',
      status: 'done',
      done_kind: 'bench',
      terminal: true
    });
  });

  test('ignores a review session when picking the cell attempt', () => {
    const run = projectBenchRun(MANIFEST, '/repo', {
      queueStore: fakeStore({
        'UI-c1': [
          { attempt_id: 'a1', status: 'done' },
          { attempt_id: 'r1', status: 'done', kind: 'review_session' }
        ]
      })
    });

    expect(run.cells[0].attempt_id).toBe('a1');
  });

  test('carries the cell verify score the comparison table reads', () => {
    const run = projectBenchRun(MANIFEST, '/repo', {
      queueStore: fakeStore({
        'UI-c1': [
          {
            attempt_id: 'a1',
            status: 'done',
            bench_verify: { ok: false, exit: 1, duration_ms: 5, head_sha: 'a' }
          }
        ]
      })
    });

    expect(run.cells[0].bench_verify).toEqual({
      ok: false,
      exit: 1,
      duration_ms: 5,
      head_sha: 'a'
    });
  });

  test('reports an unrun cell as non-terminal instead of failing', () => {
    const run = projectBenchRun(MANIFEST, '/repo', {
      queueStore: fakeStore({})
    });

    expect(run.terminal_count).toBe(0);
    expect(run.cells[0]).toMatchObject({ status: null, terminal: false });
  });

  test('keeps the manifest fields it was given', () => {
    const run = projectBenchRun(MANIFEST, '/repo', {
      queueStore: fakeStore({})
    });

    expect(run.run_id).toBe('bench-1');
    expect(run.source_bead_id).toBe('UI-src');
    expect(run.root_dir).toBe('/repo');
  });
});
