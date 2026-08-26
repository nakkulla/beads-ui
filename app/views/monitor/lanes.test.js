import { describe, expect, test } from 'vitest';
import {
  CANDIDATE_FILTER_DEFAULT,
  MIN_SLOTS,
  activeByBead,
  buildLanes,
  latestTerminalAttempt,
  validTime
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

/**
 * Build the 스냅샷 최상위 `cross_lanes` (UI-j92s §4.4). `root_dir`을 생략하면
 * repo-a다.
 *
 * @param {Array<{ id: string, status?: 'draft'|'confirmed', entries: Array<{ bead_id: string, root_dir?: string }> }>} lanes
 * @param {number} [revision]
 */
function crossLanes(lanes, revision = 1) {
  return {
    revision,
    lanes: lanes.map((lane) => ({
      id: lane.id,
      status: lane.status || 'draft',
      created_at: '2026-08-25T00:00:00.000Z',
      entries: lane.entries.map((entry) => ({
        bead_id: entry.bead_id,
        root_dir: entry.root_dir || WS_A
      }))
    }))
  };
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
      candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, show_blocked: false }
    });

    expect(lanes.runnable.map((r) => r.id).sort()).toEqual(['A-2', 'A-3']);
    expect(lanes.runnable_hidden.blocked).toBe(1);
  });

  test('filters on the runnable projection spec_id', () => {
    const with_spec = buildLanes([repo], [state()], {
      candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, spec: 'with' }
    });
    const without_spec = buildLanes([repo], [state()], {
      candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, spec: 'without' }
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

  test('projects lane occupants with the running item title and state badge', () => {
    const lanes = buildLanes(
      [
        workspace({
          bead_titles: { 'A-1': '점유 중인 작업' },
          serial_lanes: [
            { id: 's1', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
          ],
          lane_states: { s1: { occupied_by: ['A-1'] } },
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'paused',
              started_at: 10
            }
          }
        })
      ],
      [state()]
    );

    const serial = lanes.queue_groups[0].sublanes.serial;
    expect(serial[0].occupants).toEqual([
      { id: 'A-1', title: '점유 중인 작업', badge: '일시정지 · 점유' }
    ]);
    expect(serial[0].items.map((item) => item.id)).toEqual(['A-2']);
  });

  test('keeps a dismissed failure as one occupant row, not a second waiting row', () => {
    const lanes = buildLanes(
      [
        workspace({
          bead_titles: { 'A-1': '점유 중인 작업' },
          serial_lanes: [
            { id: 's1', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
          ],
          lane_states: { s1: { occupied_by: ['A-1'] } },
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'failed',
              started_at: 10,
              finished_at: 20,
              // ✕로 닫힌 실패: 실행중 레인에서는 빠지지만 레인 점유는 유지된다.
              dismissed_at: 30
            }
          }
        })
      ],
      [state()]
    );

    const serial = lanes.queue_groups[0].sublanes.serial;

    expect(serial[0].items.map((item) => item.id)).toEqual(['A-2']);
    expect(serial[0].occupants).toEqual([
      { id: 'A-1', title: '점유 중인 작업', badge: '실패 · 점유 유지' }
    ]);
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
  test('names only the blocker on a blocked chip', () => {
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
      '⛓ blocked: A-1'
    );
  });

  test('moves the blocker location into the chip tooltip', () => {
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
    expect(row?.dependency_chips?.predecessors?.[0].title).toBe(
      '이 이슈는 A-1가 close될 때까지 출발하지 않는다 (실행가능)'
    );
  });

  test('marks a blocker from another repo as foreign', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['B-1'] }
        })
      ],
      [state()]
    );

    const row = lanes.queue.find((r) => r.id === 'A-2');
    expect(row?.dependency_chips?.predecessors?.[0].foreign).toBe(true);
  });

  test('leaves a same-repo blocker chip unmarked', () => {
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
    expect(row?.dependency_chips?.predecessors?.[0].foreign).toBe(undefined);
  });

  test('keeps the same blocked wording on a foreign blocker', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['B-1'] }
        })
      ],
      [state()]
    );

    const row = lanes.queue.find((r) => r.id === 'A-2');
    expect(row?.dependency_chips?.predecessors?.[0].label).toBe(
      '⛓ blocked: B-1'
    );
  });

  test('draws no chip on the blocker card itself', () => {
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
    expect(blocker?.dependency_chips).toBe(undefined);
  });

  test('draws no chip on a running tile the snapshot names no blocker for', () => {
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

    expect(lanes.running[0].dependency_chips).toBe(undefined);
  });

  test('draws a blocked chip on a running tile the snapshot names a blocker for', () => {
    const lanes = buildLanes(
      [
        workspace({
          bead_blocked_by: { 'A-1': ['A-9'] },
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

    expect(lanes.running[0].dependency_chips?.predecessors?.[0].label).toBe(
      '⛓ blocked: A-9'
    );
  });

  test('draws a blocked chip on a paused running tile as well', () => {
    const lanes = buildLanes(
      [
        workspace({
          bead_blocked_by: { 'A-1': ['A-9'] },
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'paused',
              started_at: 1
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running[0].dependency_chips?.predecessors?.[0].label).toBe(
      '⛓ blocked: A-9'
    );
  });

  test('draws a blocked chip on a PR 대기 row', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }],
          bead_blocked_by: { 'A-1': ['A-9'] }
        })
      ],
      [state()]
    );

    expect(lanes.pr_wait[0].dependency_chips?.predecessors?.[0].label).toBe(
      '⛓ blocked: A-9'
    );
  });

  test('names the blocker location of a PR 대기 row in the chip tooltip', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }],
          queue: [{ bead_id: 'A-9' }],
          bead_blocked_by: { 'A-1': ['A-9'] }
        })
      ],
      [state()]
    );

    expect(lanes.pr_wait[0].dependency_chips?.predecessors?.[0].title).toBe(
      '이 이슈는 A-9가 close될 때까지 출발하지 않는다 (repo-a · 병렬 #1)'
    );
  });

  test('leaves the blocked chip clickable on the monitor', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }],
          bead_blocked_by: { 'A-1': ['A-9'] }
        })
      ],
      [state()]
    );

    expect(lanes.pr_wait[0].dependency_chips?.interactive).toBe(undefined);
  });

  test('draws no chip on a PR 대기 row the snapshot names no blocker for', () => {
    const lanes = buildLanes(
      [workspace({ pr_wait: [{ bead_id: 'A-1' }], bead_blocked_by: {} })],
      [state()]
    );

    expect(lanes.pr_wait[0].dependency_chips).toBe(undefined);
  });
});

describe('monitor PR 대기 — 리뷰 판정 미결 (UI-32he)', () => {
  test('draws neither a badge nor an alert for an undetermined review verdict', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
          pr_observations: {
            'A-1': {
              pr: { number: 7, url: 'https://github.com/o/r/pull/7' },
              gate: {
                enabled: false,
                tier: 'review',
                gate_badge: '',
                base_badge: '최신',
                reason: 'review_receipt_undetermined'
              }
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.pr_wait[0]).toMatchObject({
      id: 'A-1',
      badges: [],
      alert: false
    });
  });

  test('still alerts on a stale review verdict', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
          pr_observations: {
            'A-1': {
              pr: { number: 7, url: 'https://github.com/o/r/pull/7' },
              gate: {
                enabled: false,
                tier: 'review',
                gate_badge: '리뷰 확인 필요',
                base_badge: '최신',
                reason: 'review_receipt_stale'
              }
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.pr_wait[0]).toMatchObject({
      badges: ['리뷰 확인 필요'],
      alert: true
    });
  });
});

describe('monitor 세션 타일 — head review·repair (UI-hk74 §7)', () => {
  test('draws a running head review as its own session tile', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'done',
              started_at: 10,
              finished_at: 40
            },
            r1: {
              attempt_id: 'r1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 50,
              kind: 'head_review',
              origin: 'auto',
              runner: 'codex'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running).toHaveLength(1);
    expect(lanes.running[0]).toMatchObject({
      id: 'A-1',
      attempt_id: 'r1',
      kind: 'session',
      non_occupying: true,
      can_pause: false,
      can_resume: false,
      badges: ['리뷰 · 자동']
    });
  });

  test('labels a clicked repair round without the automatic marker', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
          attempts: {
            r1: {
              attempt_id: 'r1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 50,
              kind: 'head_repair',
              origin: 'click'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running[0].badges).toEqual(['수리']);
  });

  test('leaves the bead in PR 대기 while its review runs', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
          attempts: {
            r1: {
              attempt_id: 'r1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 50,
              kind: 'head_review',
              origin: 'auto'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.pr_wait.map((item) => item.id)).toEqual(['A-1']);
  });

  test('never displaces the bead own running implementation tile', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 10
            },
            r1: {
              attempt_id: 'r1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 50,
              kind: 'head_review',
              origin: 'auto'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running).toHaveLength(1);
    expect(lanes.running[0].attempt_id).toBe('t1');
  });

  test('draws no tile for a settled head review', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
          attempts: {
            r1: {
              attempt_id: 'r1',
              bead_id: 'A-1',
              status: 'done',
              started_at: 50,
              finished_at: 60,
              kind: 'head_review',
              origin: 'auto'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running).toEqual([]);
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

  test('marks an automatic head review beside the done-kind badge (UI-hk74 §7)', () => {
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
            },
            r1: {
              attempt_id: 'r1',
              bead_id: 'A-1',
              status: 'done',
              started_at: 50,
              finished_at: 60,
              kind: 'head_review',
              origin: 'auto'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].badges).toEqual(['자동 머지', '리뷰 · 자동']);
  });

  test('keeps the done-kind badge when a later head review outlives it', () => {
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
            },
            r1: {
              attempt_id: 'r1',
              bead_id: 'A-1',
              status: 'done',
              started_at: 50,
              finished_at: 900,
              kind: 'head_repair',
              origin: 'click'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].done_kind).toBe('auto_merge');
    expect(lanes.done[0].badges).toEqual(['자동 머지', '수리']);
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
    expect(lanes.chain_lanes).toEqual([]);
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

  // 실행중 타일에서 stepper가 빠진 뒤에도 이 투영은 실린다 (UI-yrzu §7.2):
  // 이제는 route 칩 재료다. "stepper를 그리지 않는다"는 사실은 렌더 층
  // (`running-grid.test.js`, `monitor/index.test.js`)이 고정한다.
  test('carries the bead_workflow projection onto the running tile', () => {
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

describe('monitor 저장 연결 레인 투영 (UI-j92s §5.1·§5.2)', () => {
  test('numbers each stored lane by its position in the snapshot array', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] })],
      [state()],
      {
        cross_lanes: crossLanes([
          { id: 'cl_1', entries: [{ bead_id: 'A-1' }] },
          { id: 'cl_2', entries: [{ bead_id: 'A-2' }] }
        ])
      }
    );

    expect(lanes.chain_lanes.map((lane) => [lane.lane_id, lane.label])).toEqual(
      [
        ['cl_1', '연결 1 · 레포 간'],
        ['cl_2', '연결 2 · 레포 간']
      ]
    );
  });

  test('numbers the rows in the stored entry order', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      [state()],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            entries: [{ bead_id: 'A-2' }, { bead_id: 'A-1' }]
          }
        ])
      }
    );

    expect(lanes.chain_lanes[0].rows.map((row) => [row.id, row.seq])).toEqual([
      ['A-2', 1],
      ['A-1', 2]
    ]);
  });

  test('moves the per-repo queue number of a waiting member into the tooltip', () => {
    const lanes = buildLanes(
      [
        workspace({ queue: [{ bead_id: 'A-1' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-0' }, { bead_id: 'B-1' }]
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            entries: [{ bead_id: 'A-1' }, { bead_id: 'B-1', root_dir: WS_B }]
          }
        ])
      }
    );

    expect(
      lanes.chain_lanes[0].rows.map((row) => [
        row.location_label,
        row.location_title
      ])
    ).toEqual([
      ['대기', 'repo-a 병렬 #1'],
      ['대기', 'repo-b 병렬 #2']
    ]);
  });

  test('names the serial lane of a member a repo serial lane holds in the tooltip', () => {
    const lanes = buildLanes(
      [
        workspace({
          serial_lane_count: 2,
          serial_lanes: [{ id: 's2', entries: [{ bead_id: 'A-1' }] }]
        })
      ],
      [state()],
      {
        cross_lanes: crossLanes([{ id: 'cl_1', entries: [{ bead_id: 'A-1' }] }])
      }
    );

    const row = lanes.chain_lanes[0].rows[0];
    expect([row.location_label, row.location_title]).toEqual([
      '대기',
      'repo-a s2 #1'
    ]);
  });

  test('labels a member of an unknown repo 외부', () => {
    const lanes = buildLanes([workspace()], [state()], {
      cross_lanes: crossLanes([
        { id: 'cl_1', entries: [{ bead_id: 'Z-9', root_dir: '/tmp/other' }] }
      ])
    });

    expect(lanes.chain_lanes[0].rows[0].location_label).toBe('외부');
    expect(lanes.chain_lanes[0].rows[0].workspace_name).toBe('');
  });

  test('labels a visible-repo member that no lane holds 미적재', () => {
    const lanes = buildLanes([workspace()], [state()], {
      cross_lanes: crossLanes([{ id: 'cl_1', entries: [{ bead_id: 'A-9' }] }])
    });

    const row = lanes.chain_lanes[0].rows[0];
    expect(row.location_label).toBe('미적재');
    expect(row.unplaced).toBe(true);
  });

  test('marks a running member as a fixed row', () => {
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
      [state()],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
          }
        ])
      }
    );

    const rows = lanes.chain_lanes[0].rows;
    expect(rows[0].location_label).toBe('▶ 실행중');
    expect([rows[0].fixed, rows[0].draggable]).toEqual([true, false]);
    expect([rows[1].fixed, rows[1].draggable]).toEqual([false, true]);
  });

  test('flags a confirmed row whose predecessor is not its blocker', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] })],
      [state()],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            status: 'confirmed',
            entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
          }
        ])
      }
    );

    expect(lanes.chain_lanes[0].rows.map((row) => row.mismatch)).toEqual([
      false,
      true
    ]);
    expect(lanes.chain_lanes[0].has_mismatch).toBe(true);
  });

  test('clears the mismatch flag when the adjacent dependency exists', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      [state()],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            status: 'confirmed',
            entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
          }
        ])
      }
    );

    expect(lanes.chain_lanes[0].rows.map((row) => row.mismatch)).toEqual([
      false,
      false
    ]);
    expect(lanes.chain_lanes[0].has_mismatch).toBe(false);
  });

  test('leaves a draft lane free of mismatch flags', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] })],
      [state()],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
          }
        ])
      }
    );

    expect(lanes.chain_lanes[0].rows.map((row) => row.mismatch)).toEqual([
      false,
      false
    ]);
    expect(lanes.chain_lanes[0].has_mismatch).toBe(false);
  });

  test('treats a confirmed member in no queue as a mismatch', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_blocked_by: { 'A-9': ['A-1'] }
        })
      ],
      [state()],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            status: 'confirmed',
            entries: [{ bead_id: 'A-1' }, { bead_id: 'A-9' }]
          }
        ])
      }
    );

    const rows = lanes.chain_lanes[0].rows;
    expect([rows[1].mismatch, rows[1].unplaced]).toEqual([false, true]);
    expect(lanes.chain_lanes[0].has_mismatch).toBe(true);
  });

  test('reports 모두 완료 when every member is done', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [
            { bead_id: 'A-1', added_at: 1 },
            { bead_id: 'A-2', added_at: 2 }
          ]
        })
      ],
      [state()],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            status: 'confirmed',
            entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
          }
        ])
      }
    );

    expect(lanes.chain_lanes[0].all_done).toBe(true);
    expect(lanes.chain_lanes[0].rows.map((row) => row.location_label)).toEqual([
      '완료',
      '완료'
    ]);
  });

  test('enables 확정 only for a draft holding two members', () => {
    const lanes = buildLanes([workspace()], [state()], {
      cross_lanes: crossLanes([
        { id: 'cl_1', entries: [{ bead_id: 'A-1' }] },
        { id: 'cl_2', entries: [{ bead_id: 'A-2' }, { bead_id: 'A-3' }] },
        {
          id: 'cl_3',
          status: 'confirmed',
          entries: [{ bead_id: 'A-4' }, { bead_id: 'A-5' }]
        }
      ])
    });

    expect(lanes.chain_lanes.map((lane) => lane.can_confirm)).toEqual([
      false,
      true,
      false
    ]);
  });

  test('carries no route, overlap or predecessor material on a lane row', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_workflow: { 'A-1': { route: 'quick_fix' } },
          bead_scope: {
            'A-1': { scope: ['app/'] },
            'A-2': { scope: ['app/'] }
          },
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      [state()],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            status: 'confirmed',
            entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
          }
        ])
      }
    );

    const row = lanes.chain_lanes[0].rows[1];
    expect(Object.keys(row).sort()).toEqual([
      'done',
      'draggable',
      'fixed',
      'id',
      'location_label',
      'location_title',
      'mismatch',
      'queue_index',
      'root_dir',
      'seq',
      'title',
      'unplaced',
      'workspace_name'
    ]);
  });

  test('titles a lane row from the repo bead title cache', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_titles: { 'A-1': '앞 이슈' }
        })
      ],
      [state()],
      {
        cross_lanes: crossLanes([
          { id: 'cl_1', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-9' }] }
        ])
      }
    );

    expect(lanes.chain_lanes[0].rows.map((row) => row.title)).toEqual([
      '앞 이슈',
      'A-9'
    ]);
  });

  test('projects an unreadable lane store to an empty list', () => {
    const lanes = buildLanes([workspace()], [state()], { cross_lanes: null });

    expect(lanes.chain_lanes).toEqual([]);
    expect(lanes.cross_lanes_unreadable).toBe(true);
    expect(lanes.cross_lanes_revision).toBe(null);
  });

  test('separates an old server snapshot from an unreadable store', () => {
    const lanes = buildLanes([workspace()], [state()]);

    expect(lanes.chain_lanes).toEqual([]);
    expect(lanes.cross_lanes_unreadable).toBe(false);
    expect(lanes.cross_lanes_revision).toBe(null);
  });

  test('carries the store revision the lane ops CAS against', () => {
    const lanes = buildLanes([workspace()], [state()], {
      cross_lanes: crossLanes([], 7)
    });

    expect(lanes.cross_lanes_revision).toBe(7);
  });

  test('maps an unplaced lane member to the repo its entry names', () => {
    const lanes = buildLanes([workspace()], [state()], {
      cross_lanes: crossLanes([{ id: 'cl_1', entries: [{ bead_id: 'A-9' }] }])
    });

    expect(lanes.owner_of['A-9']).toBe(WS_A);
  });

  test('omits a lane member whose repo is not visible from owner_of', () => {
    const lanes = buildLanes([workspace()], [state()], {
      cross_lanes: crossLanes([
        { id: 'cl_1', entries: [{ bead_id: 'Z-9', root_dir: '/tmp/other' }] }
      ])
    });

    expect(Object.hasOwn(lanes.owner_of, 'Z-9')).toBe(false);
  });
});

describe('monitor 연결 레인과 다른 영역 (UI-j92s §5.2a)', () => {
  test('hides a confirmed lane member from the parallel area', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] })],
      [state()],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            status: 'confirmed',
            entries: [{ bead_id: 'A-1' }]
          }
        ])
      }
    );

    expect(lanes.parallel_rows.map((row) => row.id)).toEqual(['A-2']);
  });

  test('keeps a draft lane member visible in the parallel area', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] })],
      [state()],
      {
        cross_lanes: crossLanes([{ id: 'cl_1', entries: [{ bead_id: 'A-1' }] }])
      }
    );

    expect(lanes.parallel_rows.map((row) => row.id)).toEqual(['A-1', 'A-2']);
  });

  test('chips a draft member with its lane number', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }] })],
      [state()],
      {
        cross_lanes: crossLanes([{ id: 'cl_1', entries: [{ bead_id: 'A-1' }] }])
      }
    );

    expect(lanes.parallel_rows[0].cross_lane_chip).toEqual({
      lane_id: 'cl_1',
      number: 1,
      status: 'draft',
      label: '연결 1 (draft)'
    });
  });

  test('chips a confirmed member that is only 실행가능', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          runnable: [runnable('A-1')]
        })
      ],
      [state()],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            status: 'confirmed',
            entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
          }
        ])
      }
    );

    expect(lanes.runnable[0].cross_lane_chip?.label).toBe('연결 1');
    expect(lanes.parallel_rows).toEqual([]);
  });
});

describe('monitor 연결 레인 발차 축 (UI-jaua §5.5·§5.6)', () => {
  /**
   * One lane over one repo, the default fixture. 상태 파생만 보는 테스트가 매번
   * 같은 스냅샷을 다시 쓰지 않도록 여기서 한 번만 세운다.
   *
   * @param {{ queue?: any[], pr_wait?: any[], attempts?: Record<string, any>, disarmed_on_load?: string[], done?: any[] }} patch
   * @param {Array<{ bead_id: string }>} entries
   */
  function laneModel(
    patch,
    entries = [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
  ) {
    return buildLanes([workspace(patch)], [state()], {
      cross_lanes: crossLanes([{ id: 'cl_1', status: 'confirmed', entries }])
    });
  }

  /**
   * @param {string} bead_id
   * @param {string|null} armed_by_lane
   */
  function failedAttempt(bead_id, armed_by_lane) {
    return {
      attempt_id: `t_${bead_id}`,
      bead_id,
      status: 'failed',
      started_at: 10,
      finished_at: 20,
      armed_by_lane
    };
  }

  test('derives ⛔ 실패 from an attempt this lane armed', () => {
    const lanes = laneModel({
      queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2', armed_by_lane: 'cl_1' }],
      attempts: { t1: failedAttempt('A-1', 'cl_1') }
    });

    const lane = lanes.chain_lanes[0];
    expect([lane.state, lane.badge, lane.run_label, lane.can_stop]).toEqual([
      'failed',
      '⛔ 실패',
      '▶ 다시 진행',
      false
    ]);
  });

  test('leaves the lane 진행 중 when the failed attempt carries another lane arm', () => {
    const lanes = laneModel({
      queue: [{ bead_id: 'A-2', armed_by_lane: 'cl_1' }],
      attempts: { t1: failedAttempt('A-1', 'cl_9') }
    });

    expect(lanes.chain_lanes[0].state).toBe('running');
  });

  test('leaves the lane 진행 중 when the failed attempt was never armed', () => {
    const lanes = laneModel({
      queue: [{ bead_id: 'A-2', armed_by_lane: 'cl_1' }],
      attempts: { t1: failedAttempt('A-1', null) }
    });

    expect(lanes.chain_lanes[0].state).toBe('running');
  });

  test('derives ⏸ 재시작 over 진행 중 from disarmed_on_load', () => {
    const lanes = laneModel({
      queue: [{ bead_id: 'A-2', armed_by_lane: 'cl_1' }],
      disarmed_on_load: ['cl_1']
    });

    const lane = lanes.chain_lanes[0];
    expect([lane.state, lane.badge, lane.run_label]).toEqual([
      'restart',
      '⏸ 재시작',
      '▶ 진행'
    ]);
  });

  test('unions disarmed_on_load over the visible workspaces', () => {
    const lanes = buildLanes(
      [
        workspace({ queue: [{ bead_id: 'A-1' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }],
          disarmed_on_load: ['cl_1']
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            status: 'confirmed',
            entries: [{ bead_id: 'A-1' }, { bead_id: 'B-1', root_dir: WS_B }]
          }
        ])
      }
    );

    expect(lanes.chain_lanes[0].state).toBe('restart');
  });

  test('derives ▶ 진행 중 from an armed queue entry', () => {
    const lanes = laneModel({
      queue: [{ bead_id: 'A-1', armed_by_lane: 'cl_1' }, { bead_id: 'A-2' }]
    });

    const lane = lanes.chain_lanes[0];
    expect([lane.state, lane.badge, lane.can_stop]).toEqual([
      'running',
      '▶ 진행 중',
      true
    ]);
  });

  test('reads the arm a pr_wait row carries', () => {
    const lanes = laneModel({
      pr_wait: [{ bead_id: 'A-1', armed_by_lane: 'cl_1' }],
      queue: [{ bead_id: 'A-2' }]
    });

    expect(lanes.chain_lanes[0].state).toBe('running');
  });

  test('keeps ▶ 이어서 진행 while an unlaunched member remains', () => {
    const lanes = laneModel({
      queue: [{ bead_id: 'A-1', armed_by_lane: 'cl_1' }, { bead_id: 'A-2' }]
    });

    const lane = lanes.chain_lanes[0];
    expect([lane.run_label, lane.unlaunched]).toEqual([
      '▶ 이어서 진행',
      ['A-2']
    ]);
  });

  test('drops the run action once every member is launched', () => {
    const lanes = laneModel({
      queue: [
        { bead_id: 'A-1', armed_by_lane: 'cl_1' },
        { bead_id: 'A-2', armed_by_lane: 'cl_1' }
      ]
    });

    const lane = lanes.chain_lanes[0];
    expect([lane.run_label, lane.can_stop]).toEqual([null, true]);
  });

  test('offers ▶ 진행 to a confirmed lane that never started', () => {
    const lanes = laneModel({
      queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
    });

    const lane = lanes.chain_lanes[0];
    expect([lane.state, lane.badge, lane.run_label]).toEqual([
      'confirmed',
      '확정',
      '▶ 진행'
    ]);
  });

  test('offers no run action once every member is done', () => {
    const lanes = laneModel({
      done: [
        { bead_id: 'A-1', added_at: 1 },
        { bead_id: 'A-2', added_at: 2 }
      ]
    });

    const lane = lanes.chain_lanes[0];
    expect([lane.state, lane.run_label, lane.all_done]).toEqual([
      'all_done',
      null,
      true
    ]);
  });

  test('gives a draft lane no run axis', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1', armed_by_lane: 'cl_1' }] })],
      [state()],
      {
        cross_lanes: crossLanes([
          { id: 'cl_1', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
        ])
      }
    );

    const lane = lanes.chain_lanes[0];
    expect([lane.state, lane.badge, lane.run_label, lane.can_stop]).toEqual([
      'draft',
      'draft',
      null,
      false
    ]);
  });

  test('chips an armed running tile with its lane number', () => {
    const lanes = laneModel({
      queue: [{ bead_id: 'A-1', armed_by_lane: 'cl_1' }],
      attempts: {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'running',
          started_at: 10
        }
      }
    });

    expect(lanes.running[0].armed_lane_chip).toEqual({
      lane_id: 'cl_1',
      label: '▶ 연결 1',
      orphan: false
    });
  });

  test('reveals an arm whose lane is absent from the snapshot', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1', armed_by_lane: 'cl_gone' }] })],
      [state()],
      { cross_lanes: crossLanes([]) }
    );

    expect(lanes.parallel_rows[0].armed_lane_chip).toEqual({
      lane_id: 'cl_gone',
      label: '▶ 진행 중 · 레인 없음',
      orphan: true
    });
  });

  test('draws no arm chip on an unarmed waiting row', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }] })],
      [state()]
    );

    expect(lanes.parallel_rows[0].armed_lane_chip).toBeUndefined();
  });
});

describe('monitor 연결 레인 위치 칩 (UI-jaua §8)', () => {
  test('locks a waiting member whose blocker is still open', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-1': [], 'A-2': ['A-1'] }
        })
      ],
      [state()],
      {
        cross_lanes: crossLanes([
          {
            id: 'cl_1',
            status: 'confirmed',
            entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
          }
        ])
      }
    );

    expect(lanes.chain_lanes[0].rows.map((row) => row.location_label)).toEqual([
      '대기',
      '🔒 대기'
    ]);
  });

  test('falls back to the number-less 대기 when no blocker material arrived', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }] })],
      [state()],
      {
        cross_lanes: crossLanes([{ id: 'cl_1', entries: [{ bead_id: 'A-1' }] }])
      }
    );

    const row = lanes.chain_lanes[0].rows[0];
    expect([row.location_label, row.location_title]).toEqual([
      '대기',
      'repo-a 병렬 #1'
    ]);
  });

  test('names a running member with the play mark', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
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
      [state()],
      {
        cross_lanes: crossLanes([{ id: 'cl_1', entries: [{ bead_id: 'A-1' }] }])
      }
    );

    const row = lanes.chain_lanes[0].rows[0];
    expect([row.location_label, row.location_title]).toEqual(['▶ 실행중', '']);
  });
});

describe('monitor 세션 진행 이슈 (UI-yrzu §5)', () => {
  /**
   * @param {string} id
   * @param {Partial<Record<string, any>>} [patch]
   */
  function sessionActive(id, patch = {}) {
    return {
      bead_id: id,
      title: `title ${id}`,
      status: 'in_progress',
      route: 'spec_backed',
      spec_id: '',
      labels: [],
      created_at: null,
      updated_at: 2000,
      started_at: 1000,
      workflow: null,
      blocked: false,
      blocked_by: [],
      ...patch
    };
  }

  test('projects a session row into the running lane as a session tile', () => {
    const lanes = buildLanes(
      [workspace({ session_active: [sessionActive('A-1')] })],
      [state()]
    );

    const tile = lanes.running[0];
    expect(tile.kind).toBe('session');
    expect(tile.lane).toBe('running');
    expect(tile.status).toBe('in_progress');
    expect(tile.draggable).toBe(false);
    expect(tile.can_pause).toBe(false);
    expect(tile.can_resume).toBe(false);
    expect(tile.exec_chips).toBe(null);
    expect(tile.usage).toBe(null);
    expect(tile.legs).toEqual([]);
    expect(tile.last_activity).toBe(null);
    expect(tile.badges).toEqual([]);
    expect(tile.alert).toBe(false);
  });

  test('orders every session tile after the worker tiles by newest update', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-9',
              status: 'running',
              started_at: 50
            }
          },
          session_active: [
            sessionActive('A-1', { updated_at: 1000 }),
            sessionActive('A-2', { updated_at: 3000 })
          ]
        })
      ],
      [state()]
    );

    expect(lanes.running.map((r) => r.id)).toEqual(['A-9', 'A-2', 'A-1']);
  });

  test('keeps worker tiles ahead of session tiles under the repo sort', () => {
    const lanes = buildLanes(
      [
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'B-1',
              status: 'running',
              started_at: 50
            }
          }
        }),
        workspace({ session_active: [sessionActive('A-1')] })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b' })],
      { running_sort: 'repo' }
    );

    expect(lanes.running.map((r) => r.id)).toEqual(['B-1', 'A-1']);
  });

  test('draws only the worker tile when the same bead is also session active', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 50
            }
          },
          session_active: [sessionActive('A-1')]
        })
      ],
      [state()]
    );

    expect(lanes.running.map((r) => [r.id, r.kind])).toEqual([
      ['A-1', undefined]
    ]);
  });

  test('keeps a session bead that also has a done entry out of the 완료 lane', () => {
    const lanes = buildLanes(
      [
        workspace({
          session_active: [sessionActive('A-1')],
          done: [{ bead_id: 'A-1', added_at: 10 }]
        })
      ],
      [state()]
    );

    expect(lanes.running.map((r) => r.id)).toEqual(['A-1']);
    expect(lanes.done).toHaveLength(0);
  });

  test('falls back to the update time when a session row has no start time', () => {
    const lanes = buildLanes(
      [
        workspace({
          session_active: [
            sessionActive('A-1', { started_at: null, updated_at: 2000 })
          ]
        })
      ],
      [state()]
    );

    expect(lanes.running[0].started_at).toBe(2000);
  });

  test('omits both times when neither one parses', () => {
    const lanes = buildLanes(
      [
        workspace({
          session_active: [
            sessionActive('A-1', { started_at: 'nope', updated_at: null })
          ]
        })
      ],
      [state()]
    );

    expect(lanes.running[0].started_at).toBe(undefined);
    expect(lanes.running[0].updated_at).toBe(undefined);
  });

  test('parses an ISO session time into epoch milliseconds', () => {
    const lanes = buildLanes(
      [
        workspace({
          session_active: [
            sessionActive('A-1', {
              started_at: '2026-08-24T00:00:00.000Z',
              updated_at: '2026-08-24T00:00:00.000Z'
            })
          ]
        })
      ],
      [state()]
    );

    expect(lanes.running[0].started_at).toBe(
      Date.parse('2026-08-24T00:00:00.000Z')
    );
  });

  test('registers a session tile as 실행중 for a blocked waiting row', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] },
          session_active: [sessionActive('A-1')]
        })
      ],
      [state()]
    );

    const row = lanes.queue.find((r) => r.id === 'A-2');
    expect(row?.dependency_chips?.predecessors?.[0].label).toBe(
      '⛓ blocked: A-1'
    );
    expect(lanes.running[0].dependency_chips).toBe(undefined);
  });

  test('carries the session workflow snapshot onto the tile', () => {
    const lanes = buildLanes(
      [
        workspace({
          session_active: [
            sessionActive('A-1', {
              workflow: {
                route: 'spec_backed',
                chips: { route: 'spec_backed' }
              }
            })
          ]
        })
      ],
      [state()]
    );

    expect(lanes.running[0].workflow?.chips?.route).toBe('spec_backed');
  });

  test('leaves the tile without a workflow when enrichment failed', () => {
    const lanes = buildLanes(
      [workspace({ session_active: [sessionActive('A-1')] })],
      [state()]
    );

    expect(lanes.running[0].workflow).toBe(null);
  });

  test('ignores session rows an older server never sends', () => {
    const lanes = buildLanes([workspace({})], [state()]);

    expect(lanes.running).toEqual([]);
  });
});

describe('monitor 세션 정체 (UI-4xzk §6.4)', () => {
  const VIEW = {
    index: 0,
    provider: 'claude',
    session_id: 'a1b2c3d4-5e6f',
    host: 'mac-studio',
    current: true,
    locality: 'local',
    last_event_at: 1_700_000_000_000,
    resume_command: "claude --resume 'a1b2c3d4-5e6f'"
  };

  /**
   * @param {Partial<Record<string, any>>} [patch]
   */
  function sessionActive(patch = {}) {
    return {
      bead_id: 'A-1',
      title: 'title A-1',
      status: 'in_progress',
      route: 'spec_backed',
      spec_id: '',
      labels: [],
      created_at: null,
      updated_at: 2000,
      started_at: 1000,
      workflow: null,
      blocked: false,
      blocked_by: [],
      ...patch
    };
  }

  test('carries the server session_refs onto the running item', () => {
    const lanes = buildLanes(
      [
        workspace({ session_active: [sessionActive({ session_refs: [VIEW] })] })
      ],
      [state()]
    );

    expect(lanes.running[0].session_refs).toEqual([VIEW]);
  });

  test('falls back to an empty list when the key is absent', () => {
    const lanes = buildLanes(
      [workspace({ session_active: [sessionActive()] })],
      [state()]
    );

    expect(lanes.running[0].session_refs).toEqual([]);
  });

  test('falls back to an empty list for a non-array session_refs', () => {
    const lanes = buildLanes(
      [
        workspace({
          session_active: [sessionActive({ session_refs: 'claude:x@host' })]
        })
      ],
      [state()]
    );

    expect(lanes.running[0].session_refs).toEqual([]);
  });
});

describe('monitor 대기 행 route 재료 (UI-yrzu §5)', () => {
  const WORKFLOW = {
    route: 'quick_fix',
    chips: { route: 'quick_fix', route_source: 'explicit' }
  };

  test('fills a parallel waiting row from bead_workflow', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_workflow: { 'A-1': WORKFLOW }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].workflow?.chips?.route).toBe('quick_fix');
  });

  test('fills a serial waiting row from bead_workflow', () => {
    const lanes = buildLanes(
      [
        workspace({
          serial_lane_count: 1,
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }],
          bead_workflow: { 'A-1': WORKFLOW }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].workflow?.chips?.route).toBe('quick_fix');
  });

  test('fills a PR 대기 row from bead_workflow', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }],
          bead_workflow: { 'A-1': WORKFLOW }
        })
      ],
      [state()]
    );

    expect(lanes.pr_wait[0].workflow?.chips?.route).toBe('quick_fix');
  });

  test('leaves the row without a workflow when the server sends none', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }] })],
      [state()]
    );

    expect(lanes.queue[0].workflow).toBe(null);
  });
});

describe('validTime (UI-yrzu §5)', () => {
  test('returns a finite number unchanged', () => {
    expect(validTime(1700000000000)).toBe(1700000000000);
  });

  test('parses a date string into epoch milliseconds', () => {
    expect(validTime('2026-08-24T00:00:00.000Z')).toBe(
      Date.parse('2026-08-24T00:00:00.000Z')
    );
  });

  test('returns null for anything that is not a time', () => {
    expect(validTime('nope')).toBe(null);
    expect(validTime(Number.NaN)).toBe(null);
    expect(validTime(null)).toBe(null);
    expect(validTime(undefined)).toBe(null);
  });
});

describe('monitor scope 겹침 파생 (UI-qm12 §5.2)', () => {
  /**
   * @param {string[]} scope
   * @returns {{ scope: string[], artifacts: string[] }}
   */
  function declared(scope) {
    return { scope, artifacts: ['docs/spec.md'] };
  }

  test('gives a running and a waiting bead each other as an overlap chip', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 10
            }
          },
          bead_scope: {
            'A-1': declared(['server/worker']),
            'A-2': declared(['server/worker/queue-store.js'])
          }
        })
      ],
      [state()]
    );

    expect(lanes.running[0].overlap_chips).toEqual([
      {
        id: 'A-2',
        title: 'A-2',
        location_label: '#1',
        prefixes: ['server/worker/queue-store.js']
      }
    ]);
    expect(lanes.queue[0].overlap_chips?.[0].location_label).toBe('실행중');
  });

  test('compares a quick_fix bead declaring scope without any artifact', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_scope: {
            'A-1': { scope: ['server/worker/'], artifacts: [] },
            'A-2': declared(['server/worker/queue-store.js'])
          }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].overlap_chips?.[0].id).toBe('A-2');
    expect(lanes.queue[0].scope_state).toBe('declared');
  });

  test('compares a waiting bead with a runnable candidate', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          runnable: [
            runnable('A-9', { spec_id: 'docs/x.md', scope: ['app/views'] })
          ],
          bead_scope: { 'A-1': declared(['app/views/monitor/index.js']) }
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].overlap_chips?.[0]).toEqual({
      id: 'A-1',
      title: 'A-1',
      location_label: '#1',
      prefixes: ['app/views/monitor/index.js']
    });
    expect(lanes.queue[0].overlap_chips?.[0].location_label).toBe('실행가능');
  });

  test('labels a serial member by its lane and position', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }],
          bead_scope: {
            'A-1': declared(['server/worker']),
            'A-2': declared(['server/worker'])
          }
        })
      ],
      [state()]
    );

    const parallel = lanes.queue.find((item) => item.id === 'A-2');
    expect(parallel?.overlap_chips?.[0].location_label).toBe('s1 #1');
  });

  test('skips a pair when either declaration is empty', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_scope: {
            'A-1': declared(['server/worker']),
            'A-2': declared([])
          }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].overlap_chips).toBeUndefined();
    expect(lanes.queue[1].overlap_chips).toBeUndefined();
  });

  test('marks a read declaration with no items as missing', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_scope: {
            'A-1': declared(['server/worker']),
            'A-2': declared([])
          }
        })
      ],
      [state()]
    );

    expect(lanes.queue.map((item) => item.scope_state)).toEqual([
      'declared',
      'missing'
    ]);
  });

  test('marks a runnable candidate with a spec but no scope as missing', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [runnable('A-9', { spec_id: 'docs/x.md', scope: [] })],
          bead_scope: {}
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].scope_state).toBe('missing');
  });

  test('marks a spec-less runnable candidate with an empty scope as missing', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-9', { route: 'quick_fix', spec_id: '', scope: [] })
          ],
          bead_scope: {}
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].scope_state).toBe('missing');
  });

  test('says nothing about a runnable candidate carrying no scope field', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [runnable('A-9', { route: 'quick_fix', spec_id: '' })],
          bead_scope: {}
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].scope_state).toBeUndefined();
  });

  test('says nothing about a bead whose read failed', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }], bead_scope: { 'A-1': null } })],
      [state()]
    );

    expect(lanes.queue[0].scope_state).toBeUndefined();
  });

  test('never compares beads of different repos', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_scope: { 'A-1': declared(['server/worker']) }
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }],
          bead_scope: { 'B-1': declared(['server/worker']) }
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })]
    );

    expect(lanes.queue.map((item) => item.overlap_chips)).toEqual([
      undefined,
      undefined
    ]);
  });

  test('gives a PR 대기 bead and a waiting bead each other as an overlap chip', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          pr_wait: [{ bead_id: 'A-1' }],
          bead_scope: {
            'A-1': declared(['server/worker']),
            'A-2': declared(['server/worker/queue-store.js'])
          }
        })
      ],
      [state()]
    );

    expect(lanes.pr_wait[0].overlap_chips?.[0].id).toBe('A-2');
    expect(lanes.queue[0].overlap_chips?.[0].location_label).toBe('PR 대기');
  });

  test('marks a PR 대기 bead whose read declaration is empty as missing', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }],
          bead_scope: { 'A-1': declared([]) }
        })
      ],
      [state()]
    );

    expect(lanes.pr_wait[0].scope_state).toBe('missing');
  });

  test('never gives a bead standing in two lanes itself as an overlap', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              kind: 'head_review',
              status: 'running',
              started_at: 1
            }
          },
          bead_scope: { 'A-1': declared(['server/worker']) }
        })
      ],
      [state()]
    );

    expect(lanes.running[0].id).toBe('A-1');
    expect(lanes.running[0].overlap_chips).toBeUndefined();
    expect(lanes.pr_wait[0].overlap_chips).toBeUndefined();
  });

  test('names a bead standing in two lanes once on a third card', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          pr_wait: [{ bead_id: 'A-1' }],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              kind: 'head_review',
              status: 'running',
              started_at: 1
            }
          },
          bead_scope: {
            'A-1': declared(['server/worker']),
            'A-2': declared(['server/worker/queue-store.js'])
          }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].overlap_chips?.map((chip) => chip.id)).toEqual([
      'A-1'
    ]);
  });

  test('copies the overlap verdict onto every card of the same bead', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          pr_wait: [{ bead_id: 'A-1' }],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              kind: 'head_review',
              status: 'running',
              started_at: 1
            }
          },
          bead_scope: {
            'A-1': declared(['server/worker']),
            'A-2': declared(['server/worker/queue-store.js'])
          }
        })
      ],
      [state()]
    );

    expect(lanes.running[0].overlap_chips?.map((chip) => chip.id)).toEqual([
      'A-2'
    ]);
    expect(lanes.pr_wait[0].overlap_chips?.map((chip) => chip.id)).toEqual([
      'A-2'
    ]);
  });

  test('copies the scope_state onto every card of the same bead', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              kind: 'head_review',
              status: 'running',
              started_at: 1
            }
          },
          bead_scope: { 'A-1': declared([]) }
        })
      ],
      [state()]
    );

    expect(lanes.running[0].scope_state).toBe('missing');
    expect(lanes.pr_wait[0].scope_state).toBe('missing');
  });

  test('derives nothing from a snapshot without the bead_scope key', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          runnable: [
            runnable('A-9', { spec_id: 'docs/x.md', scope: ['server/worker'] })
          ]
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].overlap_chips).toBeUndefined();
    expect(lanes.runnable[0].scope_state).toBeUndefined();
  });
});
