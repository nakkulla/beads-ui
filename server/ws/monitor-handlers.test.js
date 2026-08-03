import { describe, expect, test } from 'vitest';
import { buildMonitorPipeline, startOfLocalDay } from './monitor-handlers.js';

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/** 2026-08-03 14:00 local. */
const NOW = new Date(2026, 7, 3, 14, 0, 0).getTime();
const DAY_START = startOfLocalDay(NOW);

/**
 * A decorated snapshot shaped like the worker channel's, with the decorations
 * the monitor actually consumes.
 *
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function snapshot(patch = {}) {
  return {
    revision: 1,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    pr_observations: {},
    bead_titles: {},
    bead_times: {},
    ...patch
  };
}

/**
 * @param {{ workspaces?: string[], hidden?: string[], snapshots?: Record<string, any>, fail?: string[] }} input
 */
function build(input) {
  return buildMonitorPipeline({
    listWorkspaces: () => (input.workspaces || []).map((path) => ({ path })),
    listHidden: () => input.hidden || [],
    snapshotFor: (key) => {
      if ((input.fail || []).includes(key)) {
        throw new Error('snapshot boom');
      }
      return (input.snapshots || {})[key] || snapshot();
    },
    now: () => NOW
  });
}

describe('buildMonitorPipeline visibility (UI-nprg)', () => {
  test('includes every visible workspace with a live pipeline', () => {
    const out = build({
      workspaces: [WS_A, WS_B],
      snapshots: {
        [WS_A]: snapshot({ queue: [{ bead_id: 'A-1', added_at: NOW }] }),
        [WS_B]: snapshot({ pr_wait: [{ bead_id: 'B-1', added_at: NOW }] })
      }
    });

    expect(out.map((w) => w.root_dir)).toEqual([WS_A, WS_B]);
  });

  test('excludes a hidden workspace', () => {
    const out = build({
      workspaces: [WS_A, WS_B],
      hidden: [WS_B],
      snapshots: {
        [WS_A]: snapshot({ queue: [{ bead_id: 'A-1', added_at: NOW }] }),
        [WS_B]: snapshot({ queue: [{ bead_id: 'B-1', added_at: NOW }] })
      }
    });

    expect(out.map((w) => w.root_dir)).toEqual([WS_A]);
  });

  test('names each workspace by its path basename', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({ queue: [{ bead_id: 'A-1', added_at: NOW }] })
      }
    });

    expect(out[0].name).toBe('repo-a');
  });
});

describe('buildMonitorPipeline done-lane day filter (UI-nprg)', () => {
  test('keeps a done entry added after local midnight', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({ done: [{ bead_id: 'A-1', added_at: DAY_START }] })
      }
    });

    expect(out[0].done).toEqual([{ bead_id: 'A-1', added_at: DAY_START }]);
  });

  test('drops a done entry added just before local midnight', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'A-2', added_at: NOW }],
          done: [{ bead_id: 'A-1', added_at: DAY_START - 1 }]
        })
      }
    });

    expect(out[0].done).toEqual([]);
  });

  test('leaves the source snapshot lane untouched', () => {
    const source = snapshot({
      queue: [{ bead_id: 'A-2', added_at: NOW }],
      done: [{ bead_id: 'A-1', added_at: DAY_START - 1 }]
    });

    build({ workspaces: [WS_A], snapshots: { [WS_A]: source } });

    expect(source.done).toHaveLength(1);
  });
});

describe('buildMonitorPipeline empty-workspace omission (UI-nprg)', () => {
  test('omits a workspace whose lanes are all empty', () => {
    const out = build({ workspaces: [WS_A], snapshots: {} });

    expect(out).toEqual([]);
  });

  test('omits a workspace holding only past done entries', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({
          done: [{ bead_id: 'A-1', added_at: DAY_START - 1 }]
        })
      }
    });

    expect(out).toEqual([]);
  });

  test('keeps a workspace whose only activity is a running attempt', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({
          attempts: {
            a1: { attempt_id: 'a1', bead_id: 'A-1', status: 'running' }
          }
        })
      }
    });

    expect(out.map((w) => w.root_dir)).toEqual([WS_A]);
  });
});

describe('buildMonitorPipeline fail-quiet (UI-nprg §에러 처리)', () => {
  test('keeps the other workspaces when one snapshot throws', () => {
    const out = build({
      workspaces: [WS_A, WS_B],
      fail: [WS_A],
      snapshots: {
        [WS_B]: snapshot({ queue: [{ bead_id: 'B-1', added_at: NOW }] })
      }
    });

    expect(out.map((w) => w.root_dir)).toEqual([WS_B]);
  });

  test('skips a registry entry with a blank path', () => {
    const out = buildMonitorPipeline({
      listWorkspaces: () => [{ path: '' }],
      listHidden: () => [],
      snapshotFor: () =>
        snapshot({ queue: [{ bead_id: 'X-1', added_at: NOW }] }),
      now: () => NOW
    });

    expect(out).toEqual([]);
  });

  test('returns an empty payload when the workspace list is unreadable', () => {
    const out = buildMonitorPipeline({
      listWorkspaces: () => {
        throw new Error('registry boom');
      },
      listHidden: () => [],
      now: () => NOW
    });

    expect(out).toEqual([]);
  });
});

describe('buildMonitorPipeline decorated contract (UI-nprg)', () => {
  test('carries the decorated snapshot fields through untouched', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'A-1', added_at: NOW }],
          pr_observations: { 'A-1': { pr: { number: 42 } } },
          bead_titles: { 'A-1': '제목' },
          bead_times: { 'A-1': { created_at: 1, updated_at: 2 } },
          workspace_info: { slots: 2 }
        })
      }
    });

    expect(out[0].pr_observations).toEqual({ 'A-1': { pr: { number: 42 } } });
    expect(out[0].bead_titles).toEqual({ 'A-1': '제목' });
    expect(out[0].bead_times).toEqual({
      'A-1': { created_at: 1, updated_at: 2 }
    });
    expect(out[0].workspace_info).toEqual({ slots: 2 });
  });
});
