import { describe, expect, test } from 'vitest';
import {
  CANDIDATE_FILTER_DEFAULT,
  MIN_SLOTS,
  activeByBead,
  buildChains,
  buildLanes,
  latestTerminalAttempt
} from './lanes.js';

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/**
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function workspace(patch = {}) {
  return {
    root_dir: WS_A,
    name: 'repo-a',
    revision: 3,
    queue: [],
    serial_lanes: [],
    pr_wait: [],
    done: [],
    runnable: [],
    attempts: {},
    pr_observations: {},
    bead_titles: {},
    ...patch
  };
}

/**
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function state(patch = {}) {
  return {
    root_dir: WS_A,
    name: 'repo-a',
    auto_advance: false,
    auto_merge: false,
    slots: 1,
    revision: 3,
    issue_prefix: 'A',
    ...patch
  };
}

/**
 * @param {string} id
 * @param {Partial<Record<string, any>>} [patch]
 */
function runnable(id, patch = {}) {
  return { bead_id: id, title: `title ${id}`, ...patch };
}

describe('monitor lane exclusive priority (UI-qrfo §8)', () => {
  test('keeps a running bead out of the waiting lane it still occupies', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 10
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running.map((r) => r.id)).toEqual(['A-1']);
    expect(lanes.queue.map((r) => r.id)).toEqual(['A-2']);
  });

  test('keeps a pr_wait bead out of the runnable lane', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }],
          runnable: [runnable('A-1')]
        })
      ],
      [state()]
    );

    expect(lanes.pr_wait.map((r) => r.id)).toEqual(['A-1']);
    expect(lanes.runnable).toHaveLength(0);
  });

  test('carries the repo coordinate and its own CAS revision on every item', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }] })],
      [state({ revision: 9 })]
    );

    expect(lanes.queue[0].root_dir).toBe(WS_A);
    expect(lanes.queue[0].workspace_name).toBe('repo-a');
    expect(lanes.queue[0].expected_revision).toBe(9);
  });
});

describe('monitor 실행가능 repo sections (UI-eey2 §5)', () => {
  test('groups candidates per repo in workspaces_state order', () => {
    const lanes = buildLanes(
      [
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          runnable: [runnable('B-1')]
        }),
        workspace({ runnable: [runnable('A-1')] })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })]
    );

    expect(lanes.runnable_sections.map((s) => s.name)).toEqual([
      'repo-a',
      'repo-b'
    ]);
    expect(lanes.runnable_flat).toBe(false);
  });

  test('omits a repo with no candidate', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1')] })],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })]
    );

    expect(lanes.runnable_sections.map((s) => s.root_dir)).toEqual([WS_A]);
  });

  test('drops the repo badge from a card its section header already names', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1')] })],
      [state()]
    );

    expect(lanes.runnable_sections[0].items[0].workspace_name).toBe('');
  });

  test('keeps the repo badge on a flat sort that has no section header', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1')] })],
      [state()],
      { candidate_sort: 'updated_flat' }
    );

    expect(lanes.runnable_sections).toEqual([]);
    expect(lanes.runnable_flat).toBe(true);
    expect(lanes.runnable[0].workspace_name).toBe('repo-a');
  });
});

describe('monitor 실행가능 filter and sort (UI-eey2 §5)', () => {
  const repo = workspace({
    runnable: [
      runnable('A-1', { blocked: true, spec_id: 'docs/a.md', updated_at: 30 }),
      runnable('A-2', { spec_id: '', updated_at: 50 }),
      runnable('A-3', { spec_id: 'docs/c.md', updated_at: 10 })
    ]
  });

  test('shows blocked candidates by default', () => {
    expect(CANDIDATE_FILTER_DEFAULT.show_blocked).toBe(true);

    const lanes = buildLanes([repo], [state()]);

    expect(lanes.runnable.map((r) => r.id).sort()).toEqual([
      'A-1',
      'A-2',
      'A-3'
    ]);
    expect(lanes.runnable_hidden.blocked).toBe(0);
  });

  test('hides blocked candidates and counts them when the toggle is off', () => {
    const lanes = buildLanes([repo], [state()], {
      candidate_filter: { show_blocked: false, spec: 'all' }
    });

    expect(lanes.runnable.map((r) => r.id).sort()).toEqual(['A-2', 'A-3']);
    expect(lanes.runnable_hidden.blocked).toBe(1);
  });

  test('filters on the runnable projection spec_id', () => {
    const with_spec = buildLanes([repo], [state()], {
      candidate_filter: { show_blocked: true, spec: 'with' }
    });
    const without_spec = buildLanes([repo], [state()], {
      candidate_filter: { show_blocked: true, spec: 'without' }
    });

    expect(with_spec.runnable.map((r) => r.id).sort()).toEqual(['A-1', 'A-3']);
    expect(without_spec.runnable.map((r) => r.id)).toEqual(['A-2']);
    expect(without_spec.runnable_hidden.spec).toBe(2);
  });

  test('sorts spec-bearing candidates first inside their repo section', () => {
    const lanes = buildLanes([repo], [state()], {
      candidate_sort: 'repo_spec'
    });

    expect(lanes.runnable_sections[0].items.map((r) => r.id)).toEqual([
      'A-1',
      'A-3',
      'A-2'
    ]);
  });

  test('sorts by newest update inside their repo section', () => {
    const lanes = buildLanes([repo], [state()], {
      candidate_sort: 'repo_updated'
    });

    expect(lanes.runnable_sections[0].items.map((r) => r.id)).toEqual([
      'A-2',
      'A-1',
      'A-3'
    ]);
  });

  test('produces one flat newest-first list across repos', () => {
    const lanes = buildLanes(
      [
        repo,
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          runnable: [runnable('B-1', { updated_at: 40 })]
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })],
      { candidate_sort: 'updated_flat' }
    );

    expect(lanes.runnable.map((r) => r.id)).toEqual([
      'A-2',
      'B-1',
      'A-1',
      'A-3'
    ]);
  });
});

describe('monitor 대기 repo sections (UI-eey2 §6)', () => {
  test('keeps an empty-queue section when that repo has candidates to drag', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1')] })],
      [state()]
    );

    expect(lanes.queue_groups.map((g) => g.root_dir)).toEqual([WS_A]);
    expect(lanes.queue_groups[0].sublanes.parallel).toHaveLength(0);
  });

  test('omits a repo with neither queue nor candidates', () => {
    const lanes = buildLanes([], [state()]);

    expect(lanes.queue_groups).toEqual([]);
  });

  test('carries the raw server queue length for drop-tail math', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 1
            }
          }
        })
      ],
      [state()]
    );

    // DOM에는 실행중으로 빠진 A-1이 없지만 서버 배열에는 남아 있다.
    expect(lanes.queue_groups[0].sublanes.parallel).toHaveLength(1);
    expect(lanes.queue_groups[0].raw_queue_length).toBe(2);
  });

  test('reports the automation state the section header reads', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }] })],
      [state({ auto_advance: true })]
    );

    expect(lanes.queue_groups[0].auto_advance).toBe(true);
    expect(lanes.queue_groups[0].slots).toBeGreaterThanOrEqual(MIN_SLOTS);
  });

  test('marks a configured but empty serial lane so it can collapse to a hint', () => {
    const lanes = buildLanes(
      [
        workspace({
          serial_lane_count: 2,
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }]
        })
      ],
      [state()]
    );

    const serial = lanes.queue_groups[0].sublanes.serial;
    expect(serial.map((lane) => lane.id)).toEqual(['s1', 's2']);
    expect(serial[0].empty).toBeUndefined();
    expect(serial[1].empty).toBe(true);
  });

  test('omits the hint entirely when the only configured serial lane is empty', () => {
    const lanes = buildLanes(
      [workspace({ serial_lane_count: 1, queue: [{ bead_id: 'A-1' }] })],
      [state()]
    );

    expect(lanes.queue_groups[0].sublanes.serial).toEqual([]);
  });

  test('keeps a non-empty single serial lane', () => {
    const lanes = buildLanes(
      [
        workspace({
          serial_lane_count: 1,
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }]
        })
      ],
      [state()]
    );

    expect(lanes.queue_groups[0].sublanes.serial.map((l) => l.id)).toEqual([
      's1'
    ]);
  });
});

describe('monitor dependency chips (UI-eey2 §5.1)', () => {
  test('names the direction and the location on a 선행 chip', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] },
          runnable: [runnable('A-1')]
        })
      ],
      [state()]
    );

    const row = lanes.queue.find((r) => r.id === 'A-2');
    expect(row?.dependency_chips?.predecessors?.[0].label).toBe(
      '🔒 선행 A-1 (실행가능)'
    );
    expect(row?.dependency_chips?.predecessors?.[0].title).toBe(
      '이 이슈는 A-1가 close될 때까지 출발하지 않는다'
    );
  });

  test('derives the reverse 후속 chip on the blocker card', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] },
          runnable: [runnable('A-1')]
        })
      ],
      [state()]
    );

    const blocker = lanes.runnable.find((r) => r.id === 'A-1');
    expect(blocker?.dependency_chips?.successors?.[0].label).toBe(
      '→ 후속 A-2 (repo-a · 병렬 #1)'
    );
    expect(blocker?.dependency_chips?.successors?.[0].title).toBe(
      '이 이슈가 close되면 A-2가 자기 레포 큐에서 출발한다'
    );
  });

  test('omits a successor that is in no lane at all', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [runnable('A-1')],
          bead_blocked_by: { 'A-9': ['A-1'] }
        })
      ],
      [state()]
    );

    const blocker = lanes.runnable.find((r) => r.id === 'A-1');
    expect(blocker?.dependency_chips?.successors ?? []).toEqual([]);
  });

  test('gives a running tile successors but no 선행 chip', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] },
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 1
            }
          }
        })
      ],
      [state()]
    );

    const tile = lanes.running[0];
    expect(tile.dependency_chips?.predecessors).toEqual([]);
    expect(tile.dependency_chips?.successors?.[0].id).toBe('A-2');
  });
});

describe('monitor 🔗 연결 체인 (UI-eey2 §6.4)', () => {
  test('builds a chain from a cross-repo blocks edge', () => {
    const lanes = buildLanes(
      [
        workspace({ queue: [{ bead_id: 'A-1' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }],
          bead_blocked_by: { 'B-1': ['A-1'] }
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })]
    );

    expect(lanes.chains).toHaveLength(1);
    expect(lanes.chains[0].nodes.map((n) => n.id)).toEqual(['A-1', 'B-1']);
    expect(lanes.chains[0].nodes[0].location_label).toBe('repo-a · 병렬 #1');
  });

  test('drops a chain whose nodes all sit in one serial lane', () => {
    const lanes = buildLanes(
      [
        workspace({
          serial_lane_count: 1,
          serial_lanes: [
            { id: 's1', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
          ],
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      [state()]
    );

    expect(lanes.chains).toEqual([]);
  });

  test('keeps a chain inside one parallel queue', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      [state()]
    );

    expect(lanes.chains).toHaveLength(1);
  });

  test('indents a branch one step and leaves a linear chain flat', () => {
    const locations = new Map();
    const chains = buildChains(
      new Map([
        ['B', ['A']],
        ['C', ['A']],
        ['D', ['B']]
      ]),
      locations,
      []
    );

    const indents = Object.fromEntries(
      chains[0].nodes.map((n) => [n.id, n.indent])
    );
    expect(indents).toEqual({ A: 0, B: 1, C: 1, D: 1 });
  });

  test('reports a cycle instead of ordering it', () => {
    const chains = buildChains(
      new Map([
        ['A', ['B']],
        ['B', ['A']]
      ]),
      new Map(),
      []
    );

    expect(chains[0].cycle).toBe(true);
    expect(chains[0].nodes.map((n) => n.id)).toEqual(['A', 'B']);
  });

  test('drops a done blockee whose only edge is a dangling foreign blocker', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 1 }],
          bead_blocked_by: { 'A-1': ['Z-9'] }
        })
      ],
      [state()]
    );

    expect(lanes.chains).toEqual([]);
    expect(lanes.chain_lanes).toEqual([]);
  });

  test('drops a done blocker from an otherwise live chain', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          done: [{ bead_id: 'A-1', added_at: 1 }],
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      [state()]
    );

    expect(lanes.chains).toEqual([]);
  });

  test('labels an unplaced node from its prefix scope', () => {
    const chains = buildChains(
      new Map([['A-2', ['Z-9']]]),
      new Map([
        [
          'A-2',
          {
            root_dir: WS_A,
            workspace_name: 'repo-a',
            lane: 'parallel',
            position: 1
          }
        ]
      ]),
      [state()]
    );

    const node = chains[0].nodes.find((n) => n.id === 'Z-9');
    expect(node?.location_label).toBe('외부');
  });
});

describe('monitor 완료 lane (UI-eey2 §8)', () => {
  test('asks for the three-line layout so the repo badge cannot squeeze the title', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 100 }],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'done',
              started_at: 10,
              finished_at: 40,
              done_kind: 'auto_merge'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].done_layout).toBe('three_line');
    expect(lanes.done[0].work_ms).toBe(30);
    expect(lanes.done[0].badges).toEqual(['자동 머지']);
    expect(lanes.done[0].workspace_name).toBe('repo-a');
  });

  test('drops entries older than the period bound but keeps undated ones', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [
            { bead_id: 'A-1', added_at: 10 },
            { bead_id: 'A-2', added_at: 200 },
            { bead_id: 'A-3' }
          ]
        })
      ],
      [state()],
      { done_since: 100 }
    );

    expect(lanes.done.map((r) => r.id).sort()).toEqual(['A-2', 'A-3']);
  });
});

describe('monitor exec chips (UI-eey2 §5)', () => {
  const execution_defaults = {
    supported: true,
    schema_version: 1,
    source_commit: 'abc',
    digest: 'd',
    session: { impl_runtime: 'claude' },
    orchestration: {
      runtime: 'claude',
      model: 'sonnet',
      model_id: 'claude-sonnet',
      effort: null,
      speed: null
    }
  };

  test('draws no chip when the row carries no execution pin', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1', { exec_pins: {} })] })],
      [
        state({
          execution_defaults,
          runner_catalog: { runtimes: {} },
          session_defaults: {}
        })
      ]
    );

    expect(lanes.runnable[0].exec_chips).toBeUndefined();
  });

  test('omits the chip row entirely when the repo defaults are unknown', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [runnable('A-1', { exec_pins: { impl_runtime: 'codex' } })]
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].exec_chips).toBeUndefined();
  });
});

describe('monitor lane fail-quiet', () => {
  test('builds empty lanes from a null payload', () => {
    const lanes = buildLanes(null, null);

    expect(lanes.runnable).toEqual([]);
    expect(lanes.queue).toEqual([]);
    expect(lanes.running).toEqual([]);
    expect(lanes.pr_wait).toEqual([]);
    expect(lanes.done).toEqual([]);
    expect(lanes.chains).toEqual([]);
    expect(lanes.runnable_sections).toEqual([]);
  });

  test('renders a legacy runnable row that carries no workflow projection', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1', { route: 'quick_fix' })] })],
      [state()]
    );

    expect(lanes.runnable[0].workflow).toEqual({
      route: 'quick_fix',
      chips: { route: 'quick_fix' }
    });
  });

  test('uses the server workflow projection when Phase 1 supplies one', () => {
    const workflow = { route: 'full_plan', stages: { spec: { fill: 'full' } } };
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1', { workflow })] })],
      [state()]
    );

    expect(lanes.runnable[0].workflow).toBe(workflow);
  });

  test('feeds the bead_workflow projection into the running tile stepper', () => {
    const workflow = {
      route: 'spec_backed',
      stages: { spec: { fill: 'full' } }
    };
    const lanes = buildLanes(
      [
        workspace({
          bead_workflow: { 'A-1': workflow },
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 5
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running[0].workflow).toBe(workflow);
  });

  test('omits the stepper for a running bead the cache has not filled yet', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 5
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running[0].workflow).toBeNull();
  });

  test('carries the running attempt activity and legs overlay through', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 5,
              last_activity: { at: 9, kind: 'tool', text: 'npm test' },
              legs: [{ label: '구현 unit 1 · codex', state: 'live' }]
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running[0].last_activity?.text).toBe('npm test');
    expect(lanes.running[0].legs?.[0].state).toBe('live');
  });
});

describe('monitor attempt folding', () => {
  test('prefers the live attempt over an older paused one', () => {
    const map = activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'paused',
          started_at: 10,
          session_id: 's'
        },
        t2: {
          attempt_id: 't2',
          bead_id: 'A-1',
          status: 'running',
          started_at: 5,
          session_id: 's'
        }
      },
      new Map()
    );

    expect(map.get('A-1')?.attempt_id).toBe('t2');
  });

  test('picks the newest ended attempt for the completion kind', () => {
    const attempt = latestTerminalAttempt(
      {
        t1: { attempt_id: 't1', bead_id: 'A-1', finished_at: 10 },
        t2: { attempt_id: 't2', bead_id: 'A-1', finished_at: 20 }
      },
      'A-1'
    );

    expect(attempt.attempt_id).toBe('t2');
  });
});

describe('monitor 병렬 통합 큐 (UI-e6hw §4.1)', () => {
  test('flattens every visible repo queue into one list ordered by repo name', () => {
    const lanes = buildLanes(
      [
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }]
        }),
        workspace({ queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] })
      ],
      [state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' }), state()]
    );

    expect(lanes.parallel_rows.map((row) => row.id)).toEqual([
      'A-1',
      'A-2',
      'B-1'
    ]);
  });

  test('keeps each row numbered inside its own repo queue', () => {
    const lanes = buildLanes(
      [
        workspace({ queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }]
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })]
    );

    expect(
      lanes.parallel_rows.map((row) => [row.id, row.queue_position])
    ).toEqual([
      ['A-1', 1],
      ['A-2', 2],
      ['B-1', 1]
    ]);
  });

  test('carries the repo badge on every parallel row', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }] })],
      [state()]
    );

    expect(lanes.parallel_rows[0].workspace_name).toBe('repo-a');
  });

  test('hides a parallel row a chain lane already shows', () => {
    const lanes = buildLanes(
      [
        workspace({ queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }],
          bead_blocked_by: { 'B-1': ['A-1'] }
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })]
    );

    expect(lanes.parallel_rows.map((row) => row.id)).toEqual(['A-2']);
  });

  test('exposes the raw server queue length per repo', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 10
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.parallel_raw_length).toEqual({ [WS_A]: 2 });
    expect(lanes.parallel_rows.map((row) => row.id)).toEqual(['A-2']);
  });

  test('maps every placed bead to the repo that owns it', () => {
    const lanes = buildLanes(
      [
        workspace({ queue: [{ bead_id: 'A-1' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          runnable: [runnable('B-1')]
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })]
    );

    expect(lanes.owner_of).toEqual({ 'A-1': WS_A, 'B-1': WS_B });
  });
});

describe('monitor 연결 레인 (UI-e6hw §4.2)', () => {
  test('numbers each chain lane by its position in the final list', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      [state()]
    );

    expect(lanes.chain_lanes).toHaveLength(1);
    expect(lanes.chain_lanes[0].label).toBe('연결 1 · 레포 간');
    expect(lanes.chain_lanes[0].pending).toBe(false);
  });

  test('numbers the rows in topological order', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }, { bead_id: 'A-3' }],
          bead_blocked_by: { 'A-2': ['A-1'], 'A-3': ['A-2'] }
        })
      ],
      [state()]
    );

    expect(lanes.chain_lanes[0].rows.map((row) => [row.id, row.seq])).toEqual([
      ['A-1', 1],
      ['A-2', 2],
      ['A-3', 3]
    ]);
  });

  test('lists every direct predecessor a row has inside the lane', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }, { bead_id: 'A-3' }],
          bead_blocked_by: { 'A-3': ['A-1', 'A-2'] }
        })
      ],
      [state()]
    );

    const rows = lanes.chain_lanes[0].rows;
    expect(rows.find((row) => row.id === 'A-3')?.predecessors).toEqual([
      'A-1',
      'A-2'
    ]);
    expect(rows.find((row) => row.id === 'A-1')?.predecessors).toEqual([]);
  });

  test('shows the queue position of a row that sits in a parallel queue', () => {
    const lanes = buildLanes(
      [
        workspace({ queue: [{ bead_id: 'A-1' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-0' }, { bead_id: 'B-1' }],
          bead_blocked_by: { 'B-1': ['A-1'] }
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })]
    );

    const rows = lanes.chain_lanes[0].rows;
    expect(rows.map((row) => [row.id, row.location_label])).toEqual([
      ['A-1', '#1'],
      ['B-1', '#2']
    ]);
  });

  test('names the serial lane of a row a repo serial lane holds', () => {
    const lanes = buildLanes(
      [
        workspace({
          serial_lane_count: 2,
          serial_lanes: [{ id: 's2', entries: [{ bead_id: 'A-1' }] }],
          queue: [{ bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      [state()]
    );

    expect(lanes.chain_lanes[0].rows.map((row) => row.location_label)).toEqual([
      's2 #1',
      '#1'
    ]);
  });

  test('reuses the running location label for a row outside every queue', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] },
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 10
            }
          }
        })
      ],
      [state()]
    );

    const rows = lanes.chain_lanes[0].rows;
    expect(rows[0].location_label).toBe('실행중');
    expect(rows[0].draggable).toBe(false);
    expect(rows[1].draggable).toBe(true);
    // 실행중으로 빠진 A-1이 서버 배열에는 남아 있으므로 raw 좌표는 1이다 (§5.1).
    expect(rows[1].queue_index).toBe(1);
    expect(rows[1].location_label).toBe('#2');
  });

  test('keeps a pending lane whose seed no derived chain holds', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      [state()],
      { pending_lanes: [{ seed: 'A-9' }] }
    );

    expect(lanes.chain_lanes.map((lane) => lane.lane_id)).toEqual([
      `chain:${['A-1', 'A-2'].join('\u0000')}`,
      'pending:0'
    ]);
    expect(lanes.chain_lanes[1].label).toBe('연결 2 · 레포 간');
    expect(lanes.pending_lanes_kept).toEqual([0]);
  });

  test('drops a pending lane a derived chain has absorbed', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      [state()],
      { pending_lanes: [{ seed: 'A-1' }] }
    );

    expect(lanes.chain_lanes).toHaveLength(1);
    expect(lanes.chain_lanes[0].pending).toBe(false);
    expect(lanes.pending_lanes_kept).toEqual([]);
  });

  test('leaves a seed that vanished from the snapshot unplaced', () => {
    const lanes = buildLanes([workspace()], [state()], {
      pending_lanes: [{ seed: 'A-9' }]
    });

    expect(lanes.chain_lanes[0].rows.map((row) => row.location_label)).toEqual([
      '미적재'
    ]);
    expect(lanes.chain_lanes[0].rows[0].draggable).toBe(false);
  });

  test('renders a seedless pending lane with no row', () => {
    const lanes = buildLanes([workspace()], [state()], {
      pending_lanes: [{ seed: null }]
    });

    expect(lanes.chain_lanes[0].rows).toEqual([]);
    expect(lanes.chain_lanes[0].pending).toBe(true);
    expect(lanes.pending_lanes_kept).toEqual([0]);
  });

  test('keeps a cycle lane unordered and free of predecessor chips', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-1': ['A-2'], 'A-2': ['A-1'] }
        })
      ],
      [state()]
    );

    expect(lanes.chain_lanes[0].cycle).toBe(true);
    expect(lanes.chain_lanes[0].rows.map((row) => row.predecessors)).toEqual([
      [],
      []
    ]);
  });

  test('titles a chain row from the repo bead title cache', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_titles: { 'A-1': '앞 이슈' },
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      [state()]
    );

    expect(lanes.chain_lanes[0].rows.map((row) => row.title)).toEqual([
      '앞 이슈',
      'A-2'
    ]);
  });

  test('titles a chain row from the 실행가능 entry when the cache lacks it', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          runnable: [runnable('A-1')],
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      [state()]
    );

    expect(lanes.chain_lanes[0].rows.map((row) => row.title)).toEqual([
      'title A-1',
      'A-2'
    ]);
  });

  test('refuses to drag a cycle lane row', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-1': ['A-2'], 'A-2': ['A-1'] }
        })
      ],
      [state()]
    );

    expect(lanes.chain_lanes[0].rows.map((row) => row.draggable)).toEqual([
      false,
      false
    ]);
  });

  test('numbers lanes by their sorted member ids, not by dependency direction', () => {
    const forward = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }, { bead_id: 'B-2' }],
          bead_blocked_by: { 'A-2': ['A-1'], 'B-2': ['B-1'] }
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b' })]
    );
    const reversed = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }, { bead_id: 'B-2' }],
          bead_blocked_by: { 'A-1': ['A-2'], 'B-2': ['B-1'] }
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b' })]
    );

    expect(forward.chain_lanes.map((lane) => lane.lane_id)).toEqual(
      reversed.chain_lanes.map((lane) => lane.lane_id)
    );
  });
});
