import { describe, expect, test } from 'vitest';
import {
  buildBlockerLocationMap,
  classifyBlockerPrefix,
  describeBlocker,
  detectSerialLaneHeadCycles,
  isMissingInternalBlocker,
  serialCycleKey
} from './blockers.js';

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/**
 * @param {Partial<Record<string, any>>} patch
 */
function item(patch) {
  return {
    id: 'A-1',
    title: 'item',
    root_dir: WS_A,
    workspace_name: 'repo-a',
    // 직렬 카드는 언제나 소속 레인 기준 raw 좌표를 싣는다 (UI-2gi1 §5.1).
    queue_index: 0,
    ...patch
  };
}

describe('monitor blocker locations (UI-2gi1 §6.3)', () => {
  test('maps every visible pipeline state to its display location', () => {
    const lanes = {
      running: [item({ id: 'A-run' })],
      pr_wait: [item({ id: 'A-pr' })],
      runnable: [item({ id: 'A-ready' })],
      done: [item({ id: 'A-done' })],
      queue_groups: [
        {
          root_dir: WS_A,
          name: 'repo-a',
          items: [],
          sublanes: {
            parallel: [item({ id: 'A-par', queue_position: 2 })],
            serial: [
              {
                id: 's1',
                items: [item({ id: 'A-ser', queue_position: 3 })]
              }
            ]
          }
        }
      ]
    };

    const locations = buildBlockerLocationMap(lanes);

    expect(Object.fromEntries(locations)).toMatchObject({
      'A-run': { state: 'running' },
      'A-pr': { state: 'pr_wait' },
      'A-par': { lane: 'parallel', position: 2 },
      'A-ser': { lane: 's1', position: 3 },
      'A-ready': { state: 'runnable' },
      'A-done': { state: 'done' }
    });
  });

  test('classifies an unloaded matching-prefix blocker as internal', () => {
    const scope = classifyBlockerPrefix('A-missing', [
      { issue_prefix: 'A' },
      { issue_prefix: 'B' }
    ]);

    expect(scope).toBe('internal');
  });

  test('classifies an unmatched blocker as external when every prefix is known', () => {
    const scope = classifyBlockerPrefix('EXT-1', [
      { issue_prefix: 'A' },
      { issue_prefix: 'B' }
    ]);

    expect(scope).toBe('external');
  });

  test('keeps an unmatched blocker unknown when one workspace prefix is null', () => {
    const scope = classifyBlockerPrefix('EXT-1', [
      { issue_prefix: 'A' },
      { issue_prefix: null }
    ]);

    expect(scope).toBe('unknown');
  });

  test('warns only for an unloaded internal blocker', () => {
    const warns = [
      isMissingInternalBlocker('internal', undefined),
      isMissingInternalBlocker('external', undefined),
      isMissingInternalBlocker('unknown', undefined),
      isMissingInternalBlocker('internal', {
        root_dir: WS_A,
        workspace_name: 'repo-a',
        lane: 'done',
        state: 'done'
      })
    ];

    expect(warns).toEqual([true, false, false, false]);
  });

  test('describes a same-lane predecessor as normal waiting', () => {
    const locations = new Map([
      [
        'A-first',
        {
          root_dir: WS_A,
          workspace_name: 'repo-a',
          lane: 's1',
          position: 1
        }
      ]
    ]);

    const display = describeBlocker(
      'A-first',
      {
        root_dir: WS_A,
        workspace_name: 'repo-a',
        lane: 's1',
        position: 2
      },
      locations,
      [{ issue_prefix: 'A' }]
    );

    expect(display).toMatchObject({
      label: '🔒 A-first (같은 레인 앞)',
      same_lane_ahead: true,
      missing_internal: false
    });
  });

  test('describes a directly entered unloaded internal blocker as missing', () => {
    const display = describeBlocker('A-manual', undefined, new Map(), [
      { issue_prefix: 'A' }
    ]);

    expect(display).toMatchObject({
      label: '🔒 A-manual (미적재)',
      scope: 'internal',
      missing_internal: true
    });
  });
});

describe('monitor serial lane head cycles (UI-2gi1 §6.4)', () => {
  test('detects a cross-repo head wait cycle', () => {
    const groups = [
      {
        root_dir: WS_A,
        name: 'repo-a',
        sublanes: {
          serial: [
            {
              id: 's1',
              items: [item({ id: 'A-head', blocked_by: ['B-head'] })]
            }
          ]
        }
      },
      {
        root_dir: WS_B,
        name: 'repo-b',
        sublanes: {
          serial: [
            {
              id: 's2',
              items: [
                item({
                  id: 'B-head',
                  root_dir: WS_B,
                  workspace_name: 'repo-b',
                  blocked_by: ['A-head']
                })
              ]
            }
          ]
        }
      }
    ];

    const cycles = detectSerialLaneHeadCycles(groups);

    expect(cycles.get(serialCycleKey(WS_A, 's1'))).toEqual([
      { root_dir: WS_B, workspace_name: 'repo-b', lane: 's2' }
    ]);
    expect(cycles.get(serialCycleKey(WS_B, 's2'))).toEqual([
      { root_dir: WS_A, workspace_name: 'repo-a', lane: 's1' }
    ]);
  });

  test('ignores a one-way cross-lane wait', () => {
    const groups = [
      {
        root_dir: WS_A,
        name: 'repo-a',
        sublanes: {
          serial: [
            {
              id: 's1',
              items: [item({ id: 'A-head', blocked_by: ['A-other'] })]
            },
            { id: 's2', items: [item({ id: 'A-other', blocked_by: [] })] }
          ]
        }
      }
    ];

    const cycles = detectSerialLaneHeadCycles(groups);

    expect(cycles.size).toBe(0);
  });

  test('ignores a lane whose first card stands behind a claimed bead', () => {
    const groups = [
      {
        root_dir: WS_A,
        name: 'repo-a',
        sublanes: {
          serial: [
            {
              id: 's1',
              items: [
                item({ id: 'A-second', queue_index: 1, blocked_by: ['B-head'] })
              ]
            }
          ]
        }
      },
      {
        root_dir: WS_B,
        name: 'repo-b',
        sublanes: {
          serial: [
            {
              id: 's2',
              items: [
                item({
                  id: 'B-head',
                  root_dir: WS_B,
                  workspace_name: 'repo-b',
                  blocked_by: ['A-second']
                })
              ]
            }
          ]
        }
      }
    ];

    const cycles = detectSerialLaneHeadCycles(groups);

    expect(cycles.size).toBe(0);
  });

  test('ignores an occupied lane as a waiting source', () => {
    const groups = [
      {
        root_dir: WS_A,
        name: 'repo-a',
        sublanes: {
          serial: [
            {
              id: 's1',
              occupied_by: ['A-running'],
              items: [item({ id: 'A-head', blocked_by: ['B-head'] })]
            }
          ]
        }
      },
      {
        root_dir: WS_B,
        name: 'repo-b',
        sublanes: {
          serial: [
            {
              id: 's2',
              items: [
                item({
                  id: 'B-head',
                  root_dir: WS_B,
                  workspace_name: 'repo-b',
                  blocked_by: ['A-head']
                })
              ]
            }
          ]
        }
      }
    ];

    const cycles = detectSerialLaneHeadCycles(groups);

    expect(cycles.size).toBe(0);
  });
});

/**
 * UI-eey2 §5.1: the dependency chips name the DIRECTION themselves
 * (`🔒 선행 …` / `→ 후속 …`), so they need the 위치 phrase on its own rather
 * than the whole `🔒 <id> (<위치>)` label this module has always produced.
 */
describe('blocker location phrase (UI-eey2 §5.1)', () => {
  test('exposes the lane phrase without the lock prefix', () => {
    const locations = new Map([
      [
        'A-1',
        {
          root_dir: '/tmp/a',
          workspace_name: 'repo-a',
          lane: 'parallel',
          position: 2
        }
      ]
    ]);

    const display = describeBlocker('A-1', undefined, locations, []);

    expect(display.location_label).toBe('repo-a · 병렬 #2');
    expect(display.label).toBe('🔒 A-1 (repo-a · 병렬 #2)');
  });

  test('exposes the same-lane phrase', () => {
    const locations = new Map([
      [
        'A-1',
        {
          root_dir: '/tmp/a',
          workspace_name: 'repo-a',
          lane: 'parallel',
          position: 1
        }
      ]
    ]);
    const current = {
      root_dir: '/tmp/a',
      workspace_name: 'repo-a',
      lane: 'parallel',
      position: 3
    };

    expect(describeBlocker('A-1', current, locations, []).location_label).toBe(
      '같은 레인 앞'
    );
  });

  test('exposes the scope phrase for an unplaced blocker', () => {
    const display = describeBlocker('Z-9', undefined, new Map(), [
      { root_dir: '/tmp/a', issue_prefix: 'A' }
    ]);

    expect(display.location_label).toBe('외부');
  });
});
