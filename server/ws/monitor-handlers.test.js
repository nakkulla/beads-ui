import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  __resetScopeCacheForTest,
  __setScopeCacheForTest,
  createScopeCache
} from '../worker/scope-cache.js';
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
 * A session-held bead as the cache projects it (UI-yrzu §4.1).
 *
 * @param {string} bead_id
 * @returns {Record<string, any>}
 */
function sessionItem(bead_id) {
  return {
    bead_id,
    title: `${bead_id} 제목`,
    status: 'in_progress',
    route: 'spec_backed',
    spec_id: 'docs/specs/thing.md',
    labels: [],
    created_at: null,
    updated_at: null,
    started_at: null,
    workflow: null,
    blocked: false,
    blocked_by: []
  };
}

/**
 * @param {{
 *   workspaces?: string[],
 *   hidden?: string[],
 *   snapshots?: Record<string, any>,
 *   runnable?: Record<string, Array<Record<string, any>>>,
 *   sessionActive?: Record<string, Array<Record<string, any>>>,
 *   sessionExcludes?: Record<string, Set<string>>,
 *   fail?: string[],
 *   runnableFails?: string[],
 *   sessionActiveFails?: string[]
 * }} input
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
    runnableFor: (key, exclude_ids) => {
      if ((input.runnableFails || []).includes(key)) {
        throw new Error('runnable boom');
      }
      const items = (input.runnable || {})[key] || [];
      return items.filter((item) => !exclude_ids.has(item.bead_id));
    },
    sessionActiveFor: (key, exclude_ids) => {
      if ((input.sessionActiveFails || []).includes(key)) {
        throw new Error('session boom');
      }
      if (input.sessionExcludes) {
        input.sessionExcludes[key] = exclude_ids;
      }
      const items = (input.sessionActive || {})[key] || [];
      return items.filter((item) => !exclude_ids.has(item.bead_id));
    }
  });
}

/**
 * @param {{ workspaces?: string[], hidden?: string[], queues?: Record<string, any>, issuePrefixes?: Record<string, string|null>, sessionDefaults?: Record<string, { values: Record<string, string>, warnings: string[] }>, runnable?: Record<string, Array<Record<string, any>>>, sessionActive?: Record<string, Array<Record<string, any>>> }} input
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
      ),
    sessionActiveFor: (key, exclude_ids) =>
      ((input.sessionActive || {})[key] || []).filter(
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

describe('buildMonitorPipeline session_active lane (UI-yrzu §3)', () => {
  test('carries the session-held beads of each workspace', () => {
    const out = build({
      workspaces: [WS_A, WS_B],
      sessionActive: {
        [WS_A]: [sessionItem('A-s')],
        [WS_B]: [sessionItem('B-s')]
      }
    });

    expect(out.map((w) => w.session_active)).toEqual([
      [sessionItem('A-s')],
      [sessionItem('B-s')]
    ]);
  });

  // 세션 작업만 있는 레포도 데크에 나타나야 한다 (§4.2).
  test('keeps a workspace whose only content is a session-held bead', () => {
    const out = build({
      workspaces: [WS_A],
      sessionActive: { [WS_A]: [sessionItem('A-s')] }
    });

    expect(out.map((w) => w.root_dir)).toEqual([WS_A]);
  });

  test('excludes a bead an active worker attempt already draws', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({
          attempts: {
            'att-1': {
              attempt_id: 'att-1',
              bead_id: 'A-run',
              status: 'running'
            }
          }
        })
      },
      sessionActive: { [WS_A]: [sessionItem('A-run'), sessionItem('A-s')] }
    });

    expect(out[0].session_active).toEqual([sessionItem('A-s')]);
  });

  test('excludes a queue, serial and pr_wait member', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'A-q', added_at: NOW }],
          serial_lanes: [{ id: 'lane-1', entries: [{ bead_id: 'A-serial' }] }],
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }]
        })
      },
      sessionActive: {
        [WS_A]: [
          sessionItem('A-q'),
          sessionItem('A-serial'),
          sessionItem('A-pr'),
          sessionItem('A-s')
        ]
      }
    });

    expect(out[0].session_active).toEqual([sessionItem('A-s')]);
  });

  // §3: 완료 이력이 있는 이슈를 세션이 다시 열면 지금 진행 중인 일이 사실이다.
  test('keeps a done-lane member the session reopened', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({ done: [{ bead_id: 'A-done', added_at: YESTERDAY }] })
      },
      sessionActive: { [WS_A]: [sessionItem('A-done')] }
    });

    expect(out[0].session_active).toEqual([sessionItem('A-done')]);
  });

  test('leaves the done lane in the runnable exclusion set', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({ done: [{ bead_id: 'A-done', added_at: YESTERDAY }] })
      },
      runnable: { [WS_A]: [candidate('A-done')] },
      sessionActive: { [WS_A]: [sessionItem('A-done')] }
    });

    expect(out[0].runnable).toEqual([]);
  });

  test('keeps a failure the done lane already resolved out of the exclusion set', () => {
    /** @type {Record<string, Set<string>>} */
    const sessionExcludes = {};
    build({
      workspaces: [WS_A],
      snapshots: {
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
      },
      sessionActive: { [WS_A]: [sessionItem('A-failed')] },
      sessionExcludes
    });

    expect([...sessionExcludes[WS_A]]).toEqual([]);
  });

  test('keeps the rest of a workspace when its session lookup throws', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({ queue: [{ bead_id: 'A-1', added_at: NOW }] })
      },
      sessionActiveFails: [WS_A]
    });

    expect(out[0].session_active).toEqual([]);
  });
});

describe('workspaces_state session_active count (UI-yrzu §4.2)', () => {
  test('counts the session-held beads beside the four lane counts', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'A-wait', added_at: NOW }],
          attempts: {
            'att-1': {
              attempt_id: 'att-1',
              bead_id: 'A-run',
              status: 'running'
            }
          }
        })
      },
      sessionActive: { [WS_A]: [sessionItem('A-s1'), sessionItem('A-s2')] }
    });

    expect(out[0].counts).toEqual({
      running: 1,
      pr_wait: 0,
      queue: 1,
      runnable: 0,
      session_active: 2
    });
  });

  // `running`은 Worker attempt 수 그대로다 — 세션은 그 다음 순위다.
  test('leaves running unchanged when a session holds the same bead', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: {
        [WS_A]: snapshot({
          attempts: {
            'att-1': {
              attempt_id: 'att-1',
              bead_id: 'A-run',
              status: 'running'
            }
          }
        })
      },
      sessionActive: { [WS_A]: [sessionItem('A-run')] }
    });

    expect(out[0].counts).toEqual({
      running: 1,
      pr_wait: 0,
      queue: 0,
      runnable: 0,
      session_active: 0
    });
  });

  test('counts a session-held bead the done lane also carries', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: {
        [WS_A]: snapshot({ done: [{ bead_id: 'A-done', added_at: YESTERDAY }] })
      },
      sessionActive: { [WS_A]: [sessionItem('A-done')] }
    });

    expect(out[0].counts).toEqual({
      running: 0,
      pr_wait: 0,
      queue: 0,
      runnable: 0,
      session_active: 1
    });
  });

  test('keeps counting the other lanes when the session lookup throws', () => {
    const out = buildMonitorWorkspacesState({
      listWorkspaces: () => [{ path: WS_A }],
      listHidden: () => [],
      snapshotFor: () =>
        snapshot({ queue: [{ bead_id: 'A-1', added_at: NOW }] }),
      issuePrefixFor: () => null,
      sessionDefaultsFor: () => ({ values: {}, warnings: [] }),
      runnableFor: () => [],
      sessionActiveFor: () => {
        throw new Error('session boom');
      }
    });

    expect(out[0].counts).toEqual({
      running: 0,
      pr_wait: 0,
      queue: 1,
      runnable: 0,
      session_active: 0
    });
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

describe('buildMonitorPipeline foreign blocker cleanup (UI-u6zf §3.2)', () => {
  // 정리는 `decorateQueue`가 스냅샷을 만들 때 이미 끝난다 — 이 집계에는 그
  // 후처리가 없다. 여기서 지키는 것은 이동의 회귀 조건 하나다: 받은 것을 그대로
  // 통과시킨다.
  test('passes a cleaned bead_blocked_by through unchanged', () => {
    const out = build({
      workspaces: [WS_A, WS_B],
      snapshots: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'UI-24ow' }],
          bead_blocked_by: { 'UI-24ow': ['UI-rewk'] }
        })
      }
    });

    expect(out[0].bead_blocked_by).toEqual({ 'UI-24ow': ['UI-rewk'] });
  });

  test('never prunes a blocker of its own', () => {
    const out = build({
      workspaces: [WS_A, WS_B],
      snapshots: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'UI-1' }],
          bead_blocked_by: { 'UI-1': ['dotfiles-a27g'] }
        })
      }
    });

    expect(out[0].bead_blocked_by).toEqual({ 'UI-1': ['dotfiles-a27g'] });
  });

  test('carries the blocker_workspaces projection through', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({
          queue: [{ bead_id: 'UI-1' }],
          bead_blocked_by: { 'UI-1': ['dotfiles-a27g'] },
          blocker_workspaces: { 'dotfiles-a27g': WS_B }
        })
      }
    });

    expect(out[0].blocker_workspaces).toEqual({ 'dotfiles-a27g': WS_B });
  });
});

describe('buildMonitorPipeline empty-workspace omission (UI-nprg)', () => {
  test('omits a workspace whose lanes are all empty', () => {
    const out = build({ workspaces: [WS_A], snapshots: {} });

    expect(out).toEqual([]);
  });

  test('omits a workspace whose only activity is a running head review', () => {
    const out = build({
      workspaces: [WS_A],
      snapshots: {
        [WS_A]: snapshot({
          attempts: {
            r1: {
              attempt_id: 'r1',
              bead_id: 'A-1',
              status: 'running',
              kind: 'review_session',
              origin: 'auto'
            }
          }
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
      serial_lane_count: 2,
      orchestration_model: 'sol',
      orchestration_effort: 'high',
      orchestration_speed: 'priority',
      session_defaults: { impl_runtime: 'codex' },
      session_defaults_warnings: ['w1']
    });
    expect(out[0]).toHaveProperty('execution_defaults');
  });

  test('reads a legacy queue as one serial lane', () => {
    const out = buildState({
      workspaces: [WS_A],
      queues: { [WS_A]: snapshot() }
    });

    expect(out[0]).toMatchObject({
      serial_lane_count: 1,
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
      runnable: 1,
      session_active: 0
    });
  });

  test('counts a repo with nothing in flight as all zeros', () => {
    const out = buildState({ workspaces: [WS_A] });

    expect(out[0].counts).toEqual({
      running: 0,
      pr_wait: 0,
      queue: 0,
      runnable: 0,
      session_active: 0
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
      runnable: 0,
      session_active: 0
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
      runnable: 0,
      session_active: 0
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
      runnable: 0,
      session_active: 0
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
      runnable: 0,
      session_active: 0
    });
  });
});

/**
 * A scope cache reading from a blob map at a fixed base, so the pipeline sees
 * real cache states without touching git.
 *
 * @param {Record<string, string>} blobs
 */
function scopeCacheOver(blobs) {
  const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
    const target = String(args[2] || '');
    const content = blobs[target.slice(target.indexOf(':') + 1)];
    return typeof content === 'string'
      ? { code: 0, stdout: content }
      : { code: 128, stdout: '' };
  });
  const resolveBase = vi.fn(
    async () =>
      /** @type {import('../worker/target-base.js').TargetBaseResult} */ ({
        ok: true,
        base: 'main',
        declared: true,
        remote: 'origin',
        remote_ref: 'refs/remotes/origin/main',
        base_oid: 'a'.repeat(40),
        local_only: false
      })
  );
  return createScopeCache({
    contextFor: () => ({ repo: WS_A, resolveBase, gitRun })
  });
}

/**
 * An artifact whose front matter declares `prefixes`.
 *
 * @param {string[]} prefixes
 * @returns {string}
 */
function scopeArtifact(prefixes) {
  return ['---', 'scope:', ...prefixes.map((p) => `  - ${p}`), '---', ''].join(
    '\n'
  );
}

/**
 * A 후보 row whose scope source is the resolved artifact. The source is named by
 * `scope_spec_id`, never by the admission `spec_id` (UI-f1qy §4.4).
 *
 * @param {string} bead_id
 * @param {Record<string, any>} [patch]
 * @returns {Record<string, any>}
 */
function artifactCandidate(bead_id, patch = {}) {
  return {
    ...candidate(bead_id),
    scope_spec_id: 'docs/specs/thing.md',
    ...patch
  };
}

/**
 * A 후보 row with no artifact, declaring `scope` in its description instead.
 *
 * @param {string} bead_id
 * @param {string[]|null} description_scope
 * @returns {Record<string, any>}
 */
function describedCandidate(bead_id, description_scope) {
  return {
    ...candidate(bead_id),
    route: 'quick_fix',
    spec_id: '',
    scope_spec_id: '',
    description_scope
  };
}

describe('buildMonitorPipeline runnable scope (UI-qm12 §4.4)', () => {
  afterEach(() => {
    __resetScopeCacheForTest();
  });

  test('attaches the declared scope to a runnable candidate on a cache hit', async () => {
    const cache = scopeCacheOver({
      'docs/specs/thing.md': scopeArtifact(['server/worker/'])
    });
    await cache.fill(WS_A, ['docs/specs/thing.md']);
    __setScopeCacheForTest(cache);

    const out = build({
      workspaces: [WS_A],
      runnable: { [WS_A]: [artifactCandidate('A-1')] }
    });

    expect(out[0].runnable).toEqual([
      { ...candidate('A-1'), scope: ['server/worker/'] }
    ]);
  });

  test('reads the plan artifact alongside the spec when the row pins one', async () => {
    const cache = scopeCacheOver({
      'docs/specs/thing.md': scopeArtifact(['server/']),
      'docs/plans/thing.md': scopeArtifact(['app/'])
    });
    await cache.fill(WS_A, ['docs/specs/thing.md', 'docs/plans/thing.md']);
    __setScopeCacheForTest(cache);

    const out = build({
      workspaces: [WS_A],
      runnable: {
        [WS_A]: [artifactCandidate('A-1', { plan_path: 'docs/plans/thing.md' })]
      }
    });

    expect(
      /** @type {any[]} */ (out[0].runnable).map((item) => item.scope)
    ).toEqual([['app/', 'server/']]);
  });

  test('omits the scope field while the read has not landed', () => {
    __setScopeCacheForTest(
      scopeCacheOver({ 'docs/specs/thing.md': scopeArtifact(['server/']) })
    );

    const out = build({
      workspaces: [WS_A],
      runnable: { [WS_A]: [artifactCandidate('A-1')] }
    });

    expect(
      Object.hasOwn(/** @type {any[]} */ (out[0].runnable)[0], 'scope')
    ).toBe(false);
  });

  test('omits the scope field when the artifacts cannot be read', async () => {
    const cache = scopeCacheOver({});
    await cache.fill(WS_A, ['docs/specs/thing.md']);
    __setScopeCacheForTest(cache);

    const out = build({
      workspaces: [WS_A],
      runnable: { [WS_A]: [artifactCandidate('A-1')] }
    });

    expect(
      Object.hasOwn(/** @type {any[]} */ (out[0].runnable)[0], 'scope')
    ).toBe(false);
  });

  test('leaves the cached runnable row itself unmodified', async () => {
    const cache = scopeCacheOver({
      'docs/specs/thing.md': scopeArtifact(['server/'])
    });
    await cache.fill(WS_A, ['docs/specs/thing.md']);
    __setScopeCacheForTest(cache);
    const cached_row = artifactCandidate('A-1');

    build({ workspaces: [WS_A], runnable: { [WS_A]: [cached_row] } });

    expect(Object.hasOwn(cached_row, 'scope')).toBe(false);
  });
});

describe('buildMonitorPipeline runnable description scope (UI-f1qy §4.4)', () => {
  afterEach(() => {
    __resetScopeCacheForTest();
  });

  test('projects the description declaration of a spec-less row', () => {
    __setScopeCacheForTest(scopeCacheOver({}));

    const out = build({
      workspaces: [WS_A],
      runnable: { [WS_A]: [describedCandidate('A-1', ['server/worker/'])] }
    });

    expect(/** @type {any[]} */ (out[0].runnable)[0].scope).toEqual([
      'server/worker/'
    ]);
  });

  test('keeps an empty description declaration as an empty scope', () => {
    __setScopeCacheForTest(scopeCacheOver({}));

    const out = build({
      workspaces: [WS_A],
      runnable: { [WS_A]: [describedCandidate('A-1', [])] }
    });

    expect(/** @type {any[]} */ (out[0].runnable)[0].scope).toEqual([]);
  });

  test('omits the scope field when the row declares nothing anywhere', () => {
    __setScopeCacheForTest(scopeCacheOver({}));

    const out = build({
      workspaces: [WS_A],
      runnable: { [WS_A]: [describedCandidate('A-1', null)] }
    });

    expect(
      Object.hasOwn(/** @type {any[]} */ (out[0].runnable)[0], 'scope')
    ).toBe(false);
  });

  test('ships neither internal source field on the wire', () => {
    __setScopeCacheForTest(scopeCacheOver({}));

    const out = build({
      workspaces: [WS_A],
      runnable: {
        [WS_A]: [
          describedCandidate('A-1', ['server/worker/']),
          artifactCandidate('A-2')
        ]
      }
    });

    for (const row of /** @type {any[]} */ (out[0].runnable)) {
      expect(Object.hasOwn(row, 'description_scope')).toBe(false);
      expect(Object.hasOwn(row, 'scope_spec_id')).toBe(false);
    }
  });

  test('ships neither internal source field when the scope attach throws', () => {
    __setScopeCacheForTest(
      /** @type {any} */ ({
        peek: () => {
          throw new Error('scope cache unavailable');
        }
      })
    );

    const out = build({
      workspaces: [WS_A],
      runnable: { [WS_A]: [artifactCandidate('A-2')] }
    });

    const row = /** @type {any[]} */ (out[0].runnable)[0];
    expect(Object.hasOwn(row, 'description_scope')).toBe(false);
    expect(Object.hasOwn(row, 'scope_spec_id')).toBe(false);
  });

  test('prefers the resolved artifact of a quick_fix row over its description', async () => {
    const cache = scopeCacheOver({
      'docs/specs/thing.md': scopeArtifact(['server/worker/'])
    });
    await cache.fill(WS_A, ['docs/specs/thing.md']);
    __setScopeCacheForTest(cache);

    const out = build({
      workspaces: [WS_A],
      runnable: {
        [WS_A]: [
          {
            ...describedCandidate('A-1', ['app/views/']),
            scope_spec_id: 'docs/specs/thing.md'
          }
        ]
      }
    });

    expect(/** @type {any[]} */ (out[0].runnable)[0].scope).toEqual([
      'server/worker/'
    ]);
  });
});
