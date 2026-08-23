import { describe, expect, test } from 'vitest';
import { emitMonitorPipelineSnapshot } from './context.js';
import {
  buildMonitorPipeline,
  buildMonitorWorkspacesState
} from './monitor-handlers.js';

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/** 2026-08-03 14:00 local. */
const NOW = new Date(2026, 7, 3, 14, 0, 0).getTime();
/** Comfortably more than one day back — the old aggregation truncated this. */
const YESTERDAY = NOW - 26 * 60 * 60 * 1000;

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
 * A runnable candidate as the cache projects it.
 *
 * @param {string} bead_id
 * @returns {Record<string, any>}
 */
function candidate(bead_id) {
  return {
    bead_id,
    title: `${bead_id} 제목`,
    route: 'spec_backed',
    spec_id: 'docs/specs/thing.md',
    created_at: null,
    updated_at: null
  };
}

/**
 * @param {{
 *   workspaces?: string[],
 *   hidden?: string[],
 *   snapshots?: Record<string, any>,
 *   runnable?: Record<string, Array<Record<string, any>>>,
 *   fail?: string[],
 *   runnableFails?: string[],
 *   issuePrefixes?: Record<string, string|null>,
 *   foreignStatus?: Record<string, string|null>,
 *   foreignStatusCalls?: Array<[string, string]>
 * }} input
 */
function build(input) {
  return buildMonitorPipeline({
    listWorkspaces: () => (input.workspaces || []).map((path) => ({ path })),
    listHidden: () => input.hidden || [],
    issuePrefixFor: (key) => (input.issuePrefixes || {})[key] ?? null,
    foreignBlockerStatusFor: (bead_id, owner_root) => {
      if (input.foreignStatusCalls) {
        input.foreignStatusCalls.push([bead_id, owner_root]);
      }
      return (input.foreignStatus || {})[bead_id] ?? null;
    },
    snapshotFor: (key) => {
      if ((input.fail || []).includes(key)) {
        throw new Error('snapshot boom');
      }
      return (input.snapshots || {})[key] || snapshot();
    },
    runnableFor: (key, exclude_ids) => {
      if ((input.runnableFails || []).includes(key)) {
        throw new Error('runnable boom');
      }
      const items = (input.runnable || {})[key] || [];
      return items.filter((item) => !exclude_ids.has(item.bead_id));
    }
  });
}

/**
 * @param {{ workspaces?: string[], hidden?: string[], queues?: Record<string, any>, issuePrefixes?: Record<string, string|null>, sessionDefaults?: Record<string, { values: Record<string, string>, warnings: string[] }>, runnable?: Record<string, Array<Record<string, any>>> }} input
 */
function buildState(input) {
  return buildMonitorWorkspacesState({
    listWorkspaces: () => (input.workspaces || []).map((path) => ({ path })),
    listHidden: () => input.hidden || [],
    snapshotFor: (key) => (input.queues || {})[key] || snapshot(),
    issuePrefixFor: (key) => (input.issuePrefixes || {})[key] ?? null,
    sessionDefaultsFor: (key) =>
      (input.sessionDefaults || {})[key] || { values: {}, warnings: [] },
    runnableFor: (key, exclude_ids) =>
      ((input.runnable || {})[key] || []).filter(
        (item) => !exclude_ids.has(item.bead_id)
      )
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

  test('carries attempt usage legs through the monitor snapshot', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-1',
              status: 'running',
              runner: 'claude',
              model: 'claude-opus',
              session_id: 'outer-session',
              usage_legs: [{ receipt_id: 'launch-1', role: 'implementation' }]
            }
          }
        })
      }
    });

    expect(/** @type {any} */ (out[0]).attempts.a1).toMatchObject({
      runner: 'claude',
      model: 'claude-opus',
      session_id: 'outer-session',
      usage_legs: [{ receipt_id: 'launch-1', role: 'implementation' }]
    });
  });
});

describe('buildMonitorPipeline done lane (UI-qrfo §7)', () => {
  // 기간 선택이 클라이언트로 갔으므로 서버가 오늘로 자르면 클라이언트는 더 넓은
  // 기간을 그릴 데이터 자체를 못 받는다.
  test('carries a done entry from an earlier day', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({ done: [{ bead_id: 'A-1', added_at: YESTERDAY }] })
      }
    });

    expect(out[0].done).toEqual([{ bead_id: 'A-1', added_at: YESTERDAY }]);
  });

  test('keeps a workspace whose only history is an earlier day', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({ done: [{ bead_id: 'A-1', added_at: YESTERDAY }] })
      }
    });

    expect(out.map((w) => w.root_dir)).toEqual([WS_A]);
  });

  test('leaves the source snapshot lane untouched', () => {
    const source = snapshot({
      done: [{ bead_id: 'A-1', added_at: YESTERDAY }]
    });

    build({ workspaces: [WS_A], snapshots: { [WS_A]: source } });

    expect(source.done).toHaveLength(1);
  });
});

describe('buildMonitorPipeline runnable lane (UI-qrfo §4)', () => {
  test('carries the runnable candidates of each workspace', () => {
    const out = build({
      workspaces: [WS_A, WS_B],
      snapshots: {
        [WS_A]: snapshot({ queue: [{ bead_id: 'A-1', added_at: NOW }] }),
        [WS_B]: snapshot({ queue: [{ bead_id: 'B-1', added_at: NOW }] })
      },
      runnable: { [WS_A]: [candidate('A-9')], [WS_B]: [candidate('B-9')] }
    });

    expect(out.map((w) => w.runnable)).toEqual([
      [candidate('A-9')],
      [candidate('B-9')]
    ]);
  });

  // hasPipeline()에서 runnable이 빠지면 "지금 막 실행하려는 바로 그 레포"가 집계에서
  // 통째로 사라진다.
  test('keeps a workspace whose only content is a runnable candidate', () => {
    const out = build({
      workspaces: [WS_A],
      runnable: { [WS_A]: [candidate('A-9')] }
    });

    expect(out.map((w) => w.root_dir)).toEqual([WS_A]);
  });

  test('excludes a candidate that already sits in a lane', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({ done: [{ bead_id: 'A-9', added_at: YESTERDAY }] })
      },
      runnable: { [WS_A]: [candidate('A-9'), candidate('A-8')] }
    });

    expect(out[0].runnable).toEqual([candidate('A-8')]);
  });

  test('keeps the rest of a workspace when its runnable lookup throws', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({ queue: [{ bead_id: 'A-1', added_at: NOW }] })
      },
      runnableFails: [WS_A]
    });

    expect(out[0].runnable).toEqual([]);
  });
});

describe('buildMonitorPipeline serial lanes (UI-2gi1 §4)', () => {
  test('excludes a candidate that already sits in a serial lane', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({
          serial_lanes: [
            { id: 's1', entries: [{ bead_id: 'A-9', added_at: NOW }] }
          ]
        })
      },
      runnable: { [WS_A]: [candidate('A-9'), candidate('A-8')] }
    });

    expect(out[0].runnable).toEqual([candidate('A-8')]);
  });

  test('keeps a workspace whose only content sits in a serial lane', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({
          serial_lanes: [
            { id: 's1', entries: [{ bead_id: 'A-1', added_at: NOW }] }
          ]
        })
      }
    });

    expect(out.map((w) => w.root_dir)).toEqual([WS_A]);
  });

  test('preserves behavior when serial lanes are absent or malformed', () => {
    const legacy_or_malformed_snapshots = [
      snapshot(),
      snapshot({ serial_lanes: {} }),
      snapshot({ serial_lanes: [null, 's1', [], { entries: null }] }),
      snapshot({
        serial_lanes: [
          {
            entries: [null, 'A-9', [], {}, { bead_id: '' }, { bead_id: 9 }]
          }
        ]
      })
    ];

    for (const current_snapshot of legacy_or_malformed_snapshots) {
      const without_pipeline = build({
        workspaces: [WS_A],
        snapshots: { [WS_A]: current_snapshot }
      });
      const with_runnable = build({
        workspaces: [WS_A],
        snapshots: { [WS_A]: current_snapshot },
        runnable: { [WS_A]: [candidate('A-9')] }
      });

      expect(without_pipeline).toEqual([]);
      expect(with_runnable[0].runnable).toEqual([candidate('A-9')]);
    }
  });
});

describe('buildMonitorPipeline foreign blocker status (UI-eey2 §10)', () => {
  // 워커 큐를 거치지 않고 닫힌 다른 rig의 선행은 `done` 배열에 없어 클라이언트가
  // "내부인데 미적재"로 오판했다. 닫힌 선행은 blocker가 아니므로 집계에서 뺀다.
  test('drops a foreign blocker whose owning rig says it is closed', () => {
    const out = build({
      workspaces: [WS_A, WS_B],
      issuePrefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' },
      foreignStatus: { 'dotfiles-a27g': 'closed' },
      snapshots: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'UI-24ow' }],
          bead_blocked_by: { 'UI-24ow': ['dotfiles-a27g', 'UI-rewk'] }
        })
      }
    });

    expect(out[0].bead_blocked_by).toEqual({ 'UI-24ow': ['UI-rewk'] });
  });

  test('keeps a foreign blocker whose status is still unknown', () => {
    const out = build({
      workspaces: [WS_A, WS_B],
      issuePrefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' },
      foreignStatus: {},
      snapshots: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'UI-1' }],
          bead_blocked_by: { 'UI-1': ['dotfiles-a27g'] }
        })
      }
    });

    expect(out[0].bead_blocked_by).toEqual({ 'UI-1': ['dotfiles-a27g'] });
  });

  test('resolves a foreign blocker in the rig that owns its prefix', () => {
    /** @type {Array<[string, string]>} */
    const calls = [];
    build({
      workspaces: [WS_A, WS_B],
      issuePrefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' },
      foreignStatusCalls: calls,
      snapshots: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'UI-1' }],
          bead_blocked_by: { 'UI-1': ['dotfiles-a27g'] }
        })
      }
    });

    expect(calls).toEqual([['dotfiles-a27g', WS_B]]);
  });

  test('never consults the resolver for a same-rig or unowned blocker', () => {
    /** @type {Array<[string, string]>} */
    const calls = [];
    const out = build({
      workspaces: [WS_A, WS_B],
      issuePrefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' },
      foreignStatus: { 'UI-x': 'closed', 'ext-1': 'closed' },
      foreignStatusCalls: calls,
      snapshots: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'UI-1' }],
          bead_blocked_by: { 'UI-1': ['UI-x', 'ext-1'] }
        })
      }
    });

    expect(calls).toEqual([]);
    expect(out[0].bead_blocked_by).toEqual({ 'UI-1': ['UI-x', 'ext-1'] });
  });

  test('leaves bead_blocked_by untouched when no other rig prefix is known', () => {
    const out = build({
      workspaces: [WS_A, WS_B],
      issuePrefixes: { [WS_A]: 'UI', [WS_B]: null },
      foreignStatus: { 'dotfiles-a27g': 'closed' },
      snapshots: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'UI-1' }],
          bead_blocked_by: { 'UI-1': ['dotfiles-a27g'] }
        })
      }
    });

    expect(out[0].bead_blocked_by).toEqual({ 'UI-1': ['dotfiles-a27g'] });
  });
});

describe('buildMonitorPipeline empty-workspace omission (UI-nprg)', () => {
  test('omits a workspace whose lanes are all empty', () => {
    const out = build({ workspaces: [WS_A], snapshots: {} });

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
      runnableFor: () => []
    });

    expect(out).toEqual([]);
  });

  test('returns an empty payload when the workspace list is unreadable', () => {
    const out = buildMonitorPipeline({
      listWorkspaces: () => {
        throw new Error('registry boom');
      },
      listHidden: () => [],
      runnableFor: () => []
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

describe('buildMonitorWorkspacesState (UI-qrfo §4)', () => {
  // 파이프라인이 빈 레포가 바로 자동 진행이 꺼져 있는 레포다 — 그 상태를 풀 제어가
  // payload에 없으면 모니터에서 손댈 방법이 사라진다.
  test('includes a workspace whose pipeline is empty', () => {
    const out = buildState({ workspaces: [WS_A, WS_B] });

    expect(out.map((w) => w.root_dir)).toEqual([WS_A, WS_B]);
  });

  test('carries the CAS revision of each workspace', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: { [WS_A]: snapshot({ revision: 7 }) }
    });

    expect(out[0].revision).toBe(7);
  });

  test('carries the cached issue prefix of each workspace', () => {
    const out = buildState({
      workspaces: [WS_A, WS_B],
      issuePrefixes: { [WS_A]: 'A', [WS_B]: 'B' }
    });

    expect(out.map((workspace) => workspace.issue_prefix)).toEqual(['A', 'B']);
  });

  test('fails quiet when an issue prefix lookup throws', () => {
    const out = buildMonitorWorkspacesState({
      listWorkspaces: () => [{ path: WS_A }],
      listHidden: () => [],
      snapshotFor: () => snapshot(),
      issuePrefixFor: () => {
        throw new Error('config boom');
      }
    });

    expect(out[0].issue_prefix).toBeNull();
  });

  test('carries no retired exec-defaults map', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: { [WS_A]: snapshot({ revision: 7 }) }
    });

    expect(Object.hasOwn(out[0], 'exec_defaults')).toBe(false);
  });

  test('decorates every workspace control state with the runtime catalog', () => {
    const runner_catalog = {
      runners: {
        codex: {
          models: {
            sol: {
              orchestration_efforts: ['low', 'max', 'ultra'],
              speed_tiers: ['default', 'fast']
            }
          }
        }
      }
    };

    const out = buildMonitorWorkspacesState({
      listWorkspaces: () => [{ path: WS_A }],
      listHidden: () => [],
      snapshotFor: () => snapshot(),
      runnerCatalog: () => runner_catalog
    });

    expect(out[0].runner_catalog).toBe(runner_catalog);
    const catalog = /** @type {any} */ (out[0].runner_catalog);
    expect(catalog).toEqual(runner_catalog);
    expect(catalog.runners.codex.models.sol).toMatchObject({
      orchestration_efforts: ['low', 'max', 'ultra'],
      speed_tiers: ['default', 'fast']
    });
    const wire_state = JSON.parse(JSON.stringify(out));
    expect(wire_state[0].runner_catalog.runners.codex.models.sol).toEqual(
      runner_catalog.runners.codex.models.sol
    );
  });

  test('carries the automation flags and slot count', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: {
        [WS_A]: snapshot({ auto_advance: true, auto_merge: true, slots: 3 })
      }
    });

    expect(out[0]).toMatchObject({
      name: 'repo-a',
      auto_advance: true,
      auto_merge: true,
      slots: 3
    });
  });

  test('excludes a hidden workspace', () => {
    const out = buildState({ workspaces: [WS_A, WS_B], hidden: [WS_B] });

    expect(out.map((w) => w.root_dir)).toEqual([WS_A]);
  });

  test('keeps the other workspaces when one queue is unreadable', () => {
    const out = buildMonitorWorkspacesState({
      listWorkspaces: () => [{ path: WS_A }, { path: WS_B }],
      listHidden: () => [],
      snapshotFor: (key) => {
        if (key === WS_A) {
          throw new Error('queue boom');
        }
        return snapshot();
      }
    });

    expect(out.map((w) => w.root_dir)).toEqual([WS_B]);
  });
});

describe('monitor pipeline envelope (UI-qrfo §4)', () => {
  test('serializes workspaces_state alongside the pipeline array', () => {
    /** @type {any[]} */
    const frames = [];
    const ws = {
      send: (/** @type {string} */ raw) => frames.push(JSON.parse(raw))
    };
    const state = [{ root_dir: WS_A, name: 'repo-a', revision: 7 }];

    emitMonitorPipelineSnapshot(/** @type {any} */ (ws), 'm1', [], state);

    expect(frames[0].payload.workspaces_state).toEqual(state);
  });

  test('sends an empty workspaces_state when the caller omits it', () => {
    /** @type {any[]} */
    const frames = [];
    const ws = {
      send: (/** @type {string} */ raw) => frames.push(JSON.parse(raw))
    };

    emitMonitorPipelineSnapshot(/** @type {any} */ (ws), 'm1', []);

    expect(frames[0].payload.workspaces_state).toEqual([]);
  });
});

describe('workspaces_state control fields (UI-eey2 §9.4)', () => {
  test('carries the repo panel fields beside the existing ones', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: {
        [WS_A]: snapshot({
          revision: 7,
          slots: 3,
          auto_advance: true,
          auto_merge: true,
          auto_repair: false,
          serial_lane_count: 2,
          orchestration_model: 'sol',
          orchestration_effort: 'high',
          orchestration_speed: 'priority'
        })
      },
      sessionDefaults: {
        [WS_A]: { values: { impl_runtime: 'codex' }, warnings: ['w1'] }
      }
    });

    expect(out[0]).toMatchObject({
      root_dir: WS_A,
      revision: 7,
      slots: 3,
      auto_advance: true,
      auto_merge: true,
      auto_repair: false,
      serial_lane_count: 2,
      orchestration_model: 'sol',
      orchestration_effort: 'high',
      orchestration_speed: 'priority',
      session_defaults: { impl_runtime: 'codex' },
      session_defaults_warnings: ['w1']
    });
    expect(out[0]).toHaveProperty('execution_defaults');
  });

  test('reads a legacy queue as one serial lane with auto_repair on', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: { [WS_A]: snapshot() }
    });

    expect(out[0]).toMatchObject({
      serial_lane_count: 1,
      auto_repair: true,
      orchestration_model: null,
      orchestration_effort: null,
      orchestration_speed: null,
      session_defaults: {},
      session_defaults_warnings: []
    });
  });
});

describe('workspaces_state counts (UI-eey2 §9.4)', () => {
  test('counts each bead in exactly one lane by the client priority', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: {
        [WS_A]: snapshot({
          queue: [
            { bead_id: 'A-run', added_at: NOW },
            { bead_id: 'A-wait', added_at: NOW }
          ],
          serial_lanes: [
            { id: 'lane-1', entries: [{ bead_id: 'A-serial' }] },
            { id: 'lane-2', entries: [{ bead_id: 'A-run' }] }
          ],
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          done: [{ bead_id: 'A-done', added_at: NOW }],
          attempts: {
            'att-1': {
              attempt_id: 'att-1',
              bead_id: 'A-run',
              status: 'running'
            },
            'att-2': {
              attempt_id: 'att-2',
              bead_id: 'A-old',
              status: 'done'
            }
          }
        })
      },
      runnable: { [WS_A]: [candidate('A-cand'), candidate('A-pr')] }
    });

    expect(out[0].counts).toEqual({
      running: 1,
      pr_wait: 1,
      queue: 2,
      runnable: 1
    });
  });

  test('counts a repo with nothing in flight as all zeros', () => {
    const out = buildState({ workspaces: [WS_A] });

    expect(out[0].counts).toEqual({
      running: 0,
      pr_wait: 0,
      queue: 0,
      runnable: 0
    });
  });

  test('counts a paused and an unhandled failed bead as running', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'A-paused', added_at: NOW }],
          attempts: {
            'att-p': {
              attempt_id: 'att-p',
              bead_id: 'A-paused',
              status: 'paused',
              session_id: 's-1'
            },
            'att-f': {
              attempt_id: 'att-f',
              bead_id: 'A-failed',
              status: 'failed',
              finished_at: NOW
            }
          }
        })
      },
      runnable: { [WS_A]: [candidate('A-failed')] }
    });

    expect(out[0].counts).toEqual({
      running: 2,
      pr_wait: 0,
      queue: 0,
      runnable: 0
    });
  });

  test('counts one bead once when it carries several running attempts', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: {
        [WS_A]: snapshot({
          attempts: {
            'att-1': {
              attempt_id: 'att-1',
              bead_id: 'A-run',
              status: 'running',
              started_at: NOW - 1000
            },
            'att-2': {
              attempt_id: 'att-2',
              bead_id: 'A-run',
              status: 'running',
              started_at: NOW
            }
          }
        })
      }
    });

    expect(out[0].counts).toEqual({
      running: 1,
      pr_wait: 0,
      queue: 0,
      runnable: 0
    });
  });

  test('leaves a failure the done lane already resolved out of running', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: {
        [WS_A]: snapshot({
          done: [{ bead_id: 'A-failed', added_at: NOW }],
          attempts: {
            'att-f': {
              attempt_id: 'att-f',
              bead_id: 'A-failed',
              status: 'failed',
              finished_at: NOW - 1000
            }
          }
        })
      }
    });

    expect(out[0].counts).toEqual({
      running: 0,
      pr_wait: 0,
      queue: 0,
      runnable: 0
    });
  });

  test('keeps counting the other lanes when the runnable lookup throws', () => {
    const out = buildMonitorWorkspacesState({
      listWorkspaces: () => [{ path: WS_A }],
      listHidden: () => [],
      snapshotFor: () =>
        snapshot({ queue: [{ bead_id: 'A-1', added_at: NOW }] }),
      issuePrefixFor: () => null,
      sessionDefaultsFor: () => ({ values: {}, warnings: [] }),
      runnableFor: () => {
        throw new Error('runnable boom');
      }
    });

    expect(out[0].counts).toEqual({
      running: 0,
      pr_wait: 0,
      queue: 1,
      runnable: 0
    });
  });
});
