import { describe, expect, test } from 'vitest';
import { createWorkerQueueStore } from '../../data/worker-queue-store.js';
import { normalizeCandidateSort } from './candidate-sort.js';
import {
  CANDIDATE_FILTER_DEFAULT,
  MIN_SLOTS,
  activeByBead,
  buildLanes,
  lastImplementationStatus,
  latestTerminalAttempt,
  routeChipValue,
  validTime
} from './lane-model.js';
import { createWorkspaceAdapter } from './workspace-adapter.js';

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

test.each([false, true])(
  'reads the latest occupancy status regardless of snapshot order (reverse=%s)',
  (reverse) => {
    const rows = [
      [
        'new',
        { attempt_id: 'new', bead_id: 'A-1', status: 'failed', started_at: 200 }
      ],
      [
        'old',
        {
          attempt_id: 'old',
          bead_id: 'A-1',
          status: 'discarded',
          started_at: 100
        }
      ]
    ];

    const status = lastImplementationStatus(
      Object.fromEntries(reverse ? rows.reverse() : rows),
      'A-1'
    );

    expect(status).toBe('failed');
  }
);

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

test('attaches prerequisite judgments to the second serial entry without admission', () => {
  const reason = {
    kind: 'prerequisite_foreign',
    subject: { root_dir: WS_A, bead_id: 'A-2' },
    headline: 'other/B-1 완료 대기',
    release: '자동 복귀',
    verdict: 'normal',
    targets: [{ id: 'B-1', kind: 'issue' }],
    actions: []
  };

  const lanes = buildLanes(
    [
      workspace({
        serial_lanes: [
          { id: 's1', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
        ],
        wait_reasons: [reason]
      })
    ],
    [state()]
  );

  const second = lanes.queue_groups[0].sublanes.serial[0].items[1];
  expect(second.id).toBe('A-2');
  expect(second.seq).toBe(2);
  expect(second.draggable).toBe(true);
  expect(second.badges).not.toContain('⛓ 선행 대기');
  expect(second.wait_reasons).toEqual([reason]);
  expect(lanes.queue.map((item) => item.id)).toEqual(['A-1', 'A-2']);
});

test('marks a waiting row manual_only without a gate when auto_advance is off (UI-3pu9 §4.1)', () => {
  const lanes = buildLanes(
    [workspace({ queue: [{ bead_id: 'A-1' }] })],
    [state({ auto_advance: false })]
  );

  const item = lanes.queue[0];
  expect(item.manual_only).toBe(true);
  expect(item.gate).toBeUndefined();
});

test('marks serial waiting rows manual_only as well (UI-3pu9 §4.1)', () => {
  const lanes = buildLanes(
    [
      workspace({
        serial_lanes: [
          { id: 's1', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
        ]
      })
    ],
    [state({ auto_advance: false })]
  );

  expect(lanes.queue.map((item) => item.manual_only)).toEqual([true, true]);
});

test('leaves manual_only false when auto_advance is on (UI-3pu9 §4.1)', () => {
  const lanes = buildLanes(
    [workspace({ queue: [{ bead_id: 'A-1' }] })],
    [state({ auto_advance: true })]
  );

  expect(lanes.queue[0].manual_only).toBe(false);
});

test('leaves manual_only false when auto_advance is absent (UI-3pu9 §4.1)', () => {
  const lanes = buildLanes(
    [workspace({ queue: [{ bead_id: 'A-1' }] })],
    [state({ auto_advance: undefined })]
  );

  expect(lanes.queue[0].manual_only).toBe(false);
});

test('ignores a retired queue hold while auto advance is off', () => {
  const lanes = buildLanes(
    [
      workspace({
        queue: [{ bead_id: 'A-1' }],
        hold: {
          kind: 'systemic',
          cause: 'verify_failed',
          since: 10,
          bead_ids: ['A-1']
        }
      })
    ],
    [state({ auto_advance: false })]
  );

  expect(lanes.queue[0].gate).toBeUndefined();
  expect(lanes.queue[0].manual_only).toBe(true);
});

test.each(['runnable', 'pr_wait', 'done', 'running'])(
  'excludes prerequisite judgments from %s items',
  (lane) => {
    const reason = {
      kind: 'prerequisite',
      subject: { root_dir: WS_A, bead_id: 'A-1' },
      headline: '선행 대기',
      targets: []
    };
    const patch =
      lane === 'running'
        ? {
            attempts: {
              a: {
                bead_id: 'A-1',
                attempt_id: 'a',
                status: 'running',
                started_at: 100
              }
            }
          }
        : {
            [lane]: [{ bead_id: 'A-1', title: 'issue', added_at: Date.now() }]
          };

    const lanes = buildLanes(
      [workspace({ ...patch, wait_reasons: [reason] })],
      [state()],
      { candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, show_blocked: true } }
    );

    const items = /** @type {any} */ (lanes)[lane];
    expect(items).toHaveLength(1);
    expect(items[0].wait_reasons || []).toEqual([]);
    expect(items[0].badges || []).not.toContain('⛓ 선행 대기');
  }
);

/**
 * @param {string} id
 * @param {Partial<Record<string, any>>} [patch]
 */
function runnable(id, patch = {}) {
  return { bead_id: id, title: `title ${id}`, ...patch };
}

/**
 * @param {Record<string, any>} [patch]
 * @returns {any}
 */
function externalWait(patch = {}) {
  return {
    wait_id: 'w-0123456789ab',
    root_dir: WS_A,
    bead_id: 'A-1',
    owner_kind: 'worker',
    stage: 'detached',
    budget: { turns_total: 3, turns_used: 3 },
    registered_at: '2026-09-21T00:00:00Z',
    next_observation_at: '2026-09-21T03:14:00Z',
    error_count: 0,
    last_error: null,
    jobs: [
      {
        adapter: 'slurm',
        ssh_host: 'wallace',
        job_id: '42',
        submitted_at: '2026-09-21T00:00:00Z',
        log_path: '/logs/job.log',
        state: 'RUNNING',
        observed_at: '2026-09-21T03:12:00Z',
        terminal: null
      }
    ],
    completion: null,
    resume: null,
    ...patch
  };
}

/**
 * @param {string} [action_id]
 * @returns {Record<string, any>}
 */
function staleAdmission(action_id = 'stale-action') {
  return {
    'A-1': {
      reason: 'worktree_stale_work',
      stale_work: { action_id }
    }
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

describe('external wait projection', () => {
  test('attaches the record to the consumer candidate without adding a lane', () => {
    const record = externalWait();
    const lanes = buildLanes(
      [
        workspace({
          runnable: [{ bead_id: 'A-1', title: 'consumer', admitted: true }],
          external_waits: [record]
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].external_wait).toEqual(record);
    expect(lanes.queue).toHaveLength(0);
    expect(lanes).not.toHaveProperty('external_waits');
    expect(lanes.runnable[0].dependency_chips?.predecessors || []).toEqual([]);
  });

  test.each(['done', 'stopped', 'resumed'])(
    'omits terminal records at %s',
    (stage) => {
      const lanes = buildLanes(
        [
          workspace({
            runnable: [{ bead_id: 'A-1', title: 'consumer', admitted: true }],
            external_waits: [externalWait({ stage })]
          })
        ],
        [state()]
      );

      expect(lanes.runnable[0].external_wait).toBeUndefined();
    }
  );

  test('keeps equal Bead identifiers isolated by workspace', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          external_waits: [externalWait()]
        }),
        workspace({ root_dir: WS_B, queue: [{ bead_id: 'A-1' }] })
      ],
      [state(), state({ root_dir: WS_B })]
    );

    expect(
      lanes.queue.find((item) => item.root_dir === WS_A)?.external_wait
    ).toBeDefined();
    expect(
      lanes.queue.find((item) => item.root_dir === WS_B)?.external_wait
    ).toBeUndefined();
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

describe('monitor candidate readiness filter and sort (UI-ff10 §5·§7)', () => {
  const repo = workspace({
    runnable: [
      runnable('A-1', {
        blocked: true,
        route: 'spec_backed',
        spec_state: 'published',
        has_description: false,
        awaiting_user: false,
        worker_ineligible: false,
        spec_id: 'docs/a.md',
        published: true,
        updated_at: 30
      }),
      runnable('A-2', {
        route: 'spec_backed',
        spec_state: 'draft',
        has_description: false,
        awaiting_user: false,
        worker_ineligible: false,
        spec_id: '',
        published: false,
        updated_at: 50
      }),
      runnable('A-3', {
        route: 'spec_backed',
        spec_state: 'published',
        has_description: false,
        awaiting_user: false,
        worker_ineligible: false,
        spec_id: 'docs/c.md',
        published: true,
        updated_at: 10
      })
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

  test('partitions all three readiness segment values', () => {
    const all = buildLanes([repo], [state()]);
    const ready = buildLanes([repo], [state()], {
      candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, readiness: 'ready' }
    });
    const not_ready = buildLanes([repo], [state()], {
      candidate_filter: {
        ...CANDIDATE_FILTER_DEFAULT,
        readiness: 'not_ready'
      }
    });

    expect(all.runnable.map((r) => r.id).sort()).toEqual(['A-1', 'A-2', 'A-3']);
    expect(ready.runnable.map((r) => r.id).sort()).toEqual(['A-1', 'A-3']);
    expect(not_ready.runnable.map((r) => r.id)).toEqual(['A-2']);
    expect(not_ready.runnable_hidden.readiness).toBe(2);
  });

  test('excludes compound-filtered rows from individual hidden counts', () => {
    const lanes = buildLanes([repo], [state()], {
      candidate_filter: {
        show_blocked: false,
        readiness: 'not_ready',
        routes: []
      }
    });

    // A-1 stays hidden when only one filter is relaxed.
    expect(lanes.runnable.map((r) => r.id)).toEqual(['A-2']);
    expect(lanes.runnable_hidden).toMatchObject({
      blocked: 0,
      readiness: 1,
      route: 0
    });
  });

  test('counts a compound-filtered row in neither control under per_control', () => {
    const lanes = buildLanes([repo], [state()], {
      candidate_filter: {
        show_blocked: false,
        readiness: 'not_ready',
        routes: []
      }
    });

    // 한쪽만 풀어도 A-1은 그대로 숨는다 — 어느 배지도 그것을 세지 않는다.
    expect(lanes.runnable.map((r) => r.id)).toEqual(['A-2']);
    expect(lanes.runnable_hidden).toMatchObject({
      blocked: 0,
      readiness: 1,
      route: 0
    });
  });

  test('counts each control alone under per_control when only one filters', () => {
    const blocked_only = buildLanes([repo], [state()], {
      candidate_filter: { show_blocked: false, readiness: 'all', routes: [] }
    });
    const readiness_only = buildLanes([repo], [state()], {
      candidate_filter: {
        show_blocked: true,
        readiness: 'not_ready',
        routes: []
      }
    });

    expect(blocked_only.runnable_hidden).toMatchObject({
      blocked: 1,
      readiness: 0,
      route: 0
    });
    expect(readiness_only.runnable_hidden).toMatchObject({
      blocked: 0,
      readiness: 2,
      route: 0
    });
  });

  test('sorts published candidates first inside their repo section', () => {
    const lanes = buildLanes([repo], [state()], {
      candidate_sort: 'repo_spec'
    });

    expect(lanes.runnable_sections[0].items.map((r) => r.id)).toEqual([
      'A-1',
      'A-3',
      'A-2'
    ]);
  });

  test('sorts ready before spec priority inside a repo', () => {
    const mixed = workspace({
      runnable: [
        runnable('A-8', {
          route: 'quick_fix',
          spec_state: 'n/a',
          has_description: true,
          awaiting_user: false,
          worker_ineligible: false,
          spec_id: 'docs/awaiting.md',
          published: false,
          updated_at: 10
        }),
        runnable('A-7', {
          route: 'spec_backed',
          spec_state: 'draft',
          has_description: false,
          awaiting_user: false,
          worker_ineligible: false,
          spec_id: 'docs/published.md',
          published: true,
          updated_at: 90
        })
      ]
    });

    const lanes = buildLanes([mixed], [state()], {
      candidate_sort: 'repo_spec'
    });

    expect(lanes.runnable_sections[0].items.map((r) => r.id)).toEqual([
      'A-8',
      'A-7'
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

  test('keeps projecting the serial lane correction count (UI-0bvr §4.3)', () => {
    const lanes = buildLanes(
      [
        workspace({
          serial_lanes: [
            { id: 's1', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
          ],
          lane_states: {
            s1: {
              occupied_by: [],
              order: ['A-1', 'A-2'],
              corrections: [{ bead_id: 'A-2', after: 'A-1' }]
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.queue_groups[0].sublanes.serial[0].corrections).toBe(1);
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

  test('keeps an occupant ghost when stale-work action_id is empty', () => {
    const lanes = buildLanes(
      [
        workspace({
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }],
          lane_states: { s1: { occupied_by: ['A-1'] } },
          admission: staleAdmission(''),
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'failed',
              dismissed_at: 30
            }
          }
        })
      ],
      [state()]
    );

    const serial = lanes.queue_groups[0].sublanes.serial[0];
    expect([
      serial.items.map((item) => item.id),
      serial.occupants.map((item) => item.id)
    ]).toEqual([[], ['A-1']]);
  });

  test('keeps an occupant ghost when stale_work is absent', () => {
    const lanes = buildLanes(
      [
        workspace({
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }],
          lane_states: { s1: { occupied_by: ['A-1'] } },
          admission: { 'A-1': { reason: 'worktree_stale_work' } },
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'failed',
              dismissed_at: 30
            }
          }
        })
      ],
      [state()]
    );

    const serial = lanes.queue_groups[0].sublanes.serial[0];
    expect(serial.occupants.map((item) => item.id)).toEqual(['A-1']);
  });

  test('keeps an entry-less stale-work occupant as a ghost', () => {
    const lanes = buildLanes(
      [
        workspace({
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-2' }] }],
          lane_states: { s1: { occupied_by: ['A-1'] } },
          admission: staleAdmission(),
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'failed',
              dismissed_at: 30
            }
          }
        })
      ],
      [state()]
    );

    const serial = lanes.queue_groups[0].sublanes.serial[0];
    expect(serial.occupants.map((item) => item.id)).toEqual(['A-1']);
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
    expect(row?.dependency_chips?.predecessors?.[0].label).toBe('⛓ A-1');
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
      '⛓ A-1 — 선행 — close될 때까지 출발하지 않는다 (실행가능)'
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
    expect(row?.dependency_chips?.predecessors?.[0].label).toBe('⛓ B-1');
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
      '⛓ A-9'
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
      '⛓ A-9'
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
      '⛓ A-9'
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
      '⛓ A-9 — 선행 — close될 때까지 출발하지 않는다 (repo-a · 병렬 #1)'
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

    expect(lanes.pr_wait[0].dependency_chips?.predecessors?.[0].openable).toBe(
      true
    );
  });

  test('draws no chip on a PR 대기 row the snapshot names no blocker for', () => {
    const lanes = buildLanes(
      [workspace({ pr_wait: [{ bead_id: 'A-1' }], bead_blocked_by: {} })],
      [state()]
    );

    expect(lanes.pr_wait[0].dependency_chips).toBe(undefined);
  });
});

describe('monitor PR 대기 — 정리 재시도 라벨 (UI-jw27 §3)', () => {
  test('names the stopped-cleanup action 정리 재시도', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
          cleanup_failed: {
            'A-1': { step: 'child_sweep', reason: 'boom', at: 42 }
          },
          pr_observations: {
            'A-1': {
              pr: { number: 7, url: 'https://github.com/o/r/pull/7' },
              gate: {
                enabled: false,
                tier: 'merged',
                gate_badge: '머지됨',
                base_badge: '머지됨',
                reason: null
              }
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.pr_wait[0].merge_label).toBe('정리 재시도');
  });
});

describe('monitor PR 대기 — 외부 저장소 PR (UI-kyky §6)', () => {
  const FOREIGN_GATE = {
    enabled: false,
    tier: 'undecidable',
    gate_badge: '관측 오류',
    base_badge: '',
    reason: 'pr_repo_foreign'
  };

  /**
   * @param {Record<string, unknown>} entry
   * @returns {any}
   */
  function foreignLane(entry) {
    return buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1', added_at: 1, external: true, ...entry }],
          pr_observations: { 'A-1': { pr: null, gate: FOREIGN_GATE } }
        })
      ],
      [state()]
    ).pr_wait[0];
  }

  test('carries the foreign PR reference the registry verified', () => {
    const row = foreignLane({
      foreign: true,
      repo_slug: 'other/repo',
      pr_url: 'https://github.com/other/repo/pull/12',
      pr_number: 12
    });

    expect(row.pr_url).toBe('https://github.com/other/repo/pull/12');
    expect(row.pr_number).toBe(12);
    expect(row.foreign_repo).toBe('other/repo');
  });

  test('says 외부 저장소 PR rather than an observation error', () => {
    const row = foreignLane({
      foreign: true,
      repo_slug: 'other/repo',
      pr_url: 'https://github.com/other/repo/pull/12',
      pr_number: 12
    });

    expect(row.badges).toEqual(['외부 저장소 PR']);
  });

  test('never re-derives foreign from the repo slug alone', () => {
    const row = foreignLane({
      repo_slug: 'other/repo',
      pr_url: 'https://github.com/other/repo/pull/12',
      pr_number: 12
    });

    expect(row.foreign_repo).toBe(undefined);
    expect(row.pr_url).toBe(undefined);
  });

  test('prefers the observed PR of a same-repo external row', () => {
    const row = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1', added_at: 1, external: true }],
          pr_observations: {
            'A-1': {
              pr: { number: 7, url: 'https://github.com/o/r/pull/7' },
              gate: {
                enabled: true,
                tier: 'eligible',
                gate_badge: '머지 가능',
                base_badge: '최신',
                reason: null
              }
            }
          }
        })
      ],
      [state()]
    ).pr_wait[0];

    expect(row.pr_url).toBe('https://github.com/o/r/pull/7');
    expect(row.foreign_repo).toBe(undefined);
  });

  test('leaves merge and discard refused on a foreign row', () => {
    const row = foreignLane({
      foreign: true,
      repo_slug: 'other/repo',
      pr_url: 'https://github.com/other/repo/pull/12',
      pr_number: 12
    });

    expect(row.merge_enabled).toBe(false);
    expect(row.discard?.action ?? false).toBe(false);
  });
});

describe('monitor PR 대기 — 리뷰 판정 미결 (UI-32he, UI-qksl §4 1번이 넓힘)', () => {
  test('alerts on an undetermined review verdict without a gate badge', () => {
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
      alert: true
    });
  });

  test('carries the receipt badge codes onto the Monitor PR 대기 row', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
          pr_observations: {
            'A-1': {
              pr: { number: 7, url: 'https://github.com/o/r/pull/7' },
              receipt_check: {
                ok: false,
                probe_error: false,
                codes: ['absent'],
                blocking_codes: [],
                badge_codes: ['absent']
              }
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.pr_wait[0].receipt_badge).toEqual({ codes: ['absent'] });
  });

  test('omits the receipt badge field for an empty code list', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
          pr_observations: {
            'A-1': {
              pr: { number: 7, url: 'https://github.com/o/r/pull/7' },
              receipt_check: {
                ok: true,
                probe_error: false,
                codes: [],
                blocking_codes: [],
                badge_codes: []
              }
            }
          }
        })
      ],
      [state()]
    );

    expect('receipt_badge' in lanes.pr_wait[0]).toBe(false);
  });

  test('omits the receipt badge field without an observation', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1', added_at: 1 }],
          pr_observations: {
            'A-1': { pr: { number: 7, url: 'https://github.com/o/r/pull/7' } }
          }
        })
      ],
      [state()]
    );

    expect('receipt_badge' in lanes.pr_wait[0]).toBe(false);
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

describe('monitor 세션 타일 — 리뷰 세션 (UI-d7fy §5.5)', () => {
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
              kind: 'review_session',
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

  test('labels a clicked review session without the automatic marker', () => {
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
              kind: 'review_session',
              origin: 'click'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running[0].badges).toEqual(['리뷰']);
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
              kind: 'review_session',
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
              kind: 'review_session',
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
              kind: 'review_session',
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
              kind: 'review_session',
              origin: 'auto'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].badges).toEqual(['자동 머지', '리뷰 · 자동']);
  });

  test('keeps the done-kind badge when a later review session outlives it', () => {
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
              kind: 'review_session',
              origin: 'click'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].done_kind).toBe('auto_merge');
    expect(lanes.done[0].badges).toEqual(['자동 머지', '리뷰']);
  });

  test('badges a no-delta quick_fix close as 무-delta', () => {
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
              done_kind: 'no_delta'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].badges).toEqual(['무-delta']);
  });

  test('badges a refuted quick_fix close as 반증', () => {
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
              done_kind: 'refuted'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].badges).toEqual(['반증']);
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

  test('draws unpinned default chips for an observed empty exec_pins object', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1', { exec_pins: {} })] })],
      [
        state({
          execution_defaults: {
            ...execution_defaults,
            session: ROUTED_EXECUTION_DEFAULTS.session
          },
          runner_catalog: { runtimes: {} },
          session_defaults: {}
        })
      ]
    );

    expect(lanes.runnable[0].exec_chips?.orchestration).toMatchObject({
      pinned: false
    });
    expect(lanes.runnable[0].exec_chips?.worker).toMatchObject({
      pinned: false
    });
  });

  test('omits candidate exec chips when exec_pins is unobserved', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1')] })],
      [
        state({
          execution_defaults: {
            ...execution_defaults,
            session: ROUTED_EXECUTION_DEFAULTS.session
          },
          runner_catalog: { runtimes: {} },
          session_defaults: {}
        })
      ]
    );

    expect(lanes.runnable[0]).not.toHaveProperty('exec_chips');
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

  test('drops the server instructions_restart verdict from the live tile', () => {
    const map = activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'running',
          started_at: 5,
          session_id: 's',
          instructions_restart: { eligible: true, reason: null }
        }
      },
      new Map()
    );

    expect(map.get('A-1')).not.toHaveProperty('instructions_restart');
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

  test('projects every failed-attempt decision field', () => {
    const usage = { total_cost_usd: 1.25 };
    const cause_detail = {
      reason: 'head moved',
      command: 'git rev-parse HEAD'
    };
    const quickfix_landing = {
      cursor: 'repo_operations',
      head_sha: 'a'.repeat(40),
      reason: 'deploy_failed'
    };
    const map = activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'failed',
          session_id: 'session-1',
          cause: 'quickfix_landing_failed:deploy_failed',
          cause_detail,
          finished_at: 123,
          runner: 'codex',
          model: 'sol',
          effort: 'xhigh',
          observed_effort: 'high',
          speed: 'default',
          usage,
          halted_auto_advance: true,
          quickfix_lane: true,
          quickfix_landing,
          merge_sha: 'b'.repeat(40)
        }
      },
      new Map()
    );

    expect(map.get('A-1')?.failure).toEqual({
      cause: 'quickfix_landing_failed:deploy_failed',
      cause_detail,
      // 이 기록에는 §6 이후 필드가 없다 — 있는 척하지 않고 null로 남는다.
      summary: null,
      retry: null,
      bead_id: 'A-1',
      finished_at: 123,
      runner: 'codex',
      model: 'sol',
      effort: 'xhigh',
      observed_effort: 'high',
      speed: 'default',
      attempt_id: 't1',
      usage,
      halted_auto_advance: true,
      quickfix_lane: true,
      quickfix_landing,
      resume_eligible: true,
      resume_reason: null,
      landed: true,
      confirmation: 'merged'
    });
  });
});

describe('타임라인 투영 (record-timeline-retention §9)', () => {
  /**
   * @param {Record<string, any>} [bead_timelines]
   */
  function projectFailure(bead_timelines) {
    return activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'failed',
          cause: 'session_failed:is_error',
          cause_detail: { summary: '세션 실패' }
        }
      },
      new Map(),
      bead_timelines ? { bead_timelines } : {}
    );
  }

  test('turns the snapshot events around so the newest is first', () => {
    const map = projectFailure({
      'A-1': {
        events: [
          { event_id: 'e1', at: 1000, kind: 'dispatched', summary: '디스패치' },
          {
            event_id: 'e2',
            at: 2000,
            kind: 'attempt_failed',
            summary: '세션 실패'
          }
        ],
        log_path: '/w/log.jsonl',
        log_expired: false
      }
    });

    const failure = map.get('A-1')?.failure;

    expect(
      failure?.timeline?.map((/** @type {any} */ row) => row.event_id)
    ).toEqual(['e2', 'e1']);
    expect(failure?.log_path).toBe('/w/log.jsonl');
  });

  test('marks a log the retention policy deleted as expired', () => {
    const map = projectFailure({
      'A-1': { events: [], log_path: null, log_expired: true }
    });

    const failure = map.get('A-1')?.failure;

    expect(failure?.log_expired).toBe(true);
    expect(failure?.log_path).toBeUndefined();
  });

  test('marks a log the ladder could not read as unreadable', () => {
    const map = projectFailure({
      'A-1': {
        events: [],
        log_path: null,
        log_expired: false,
        log_unreadable: true
      }
    });

    const failure = map.get('A-1')?.failure;

    expect(failure?.log_unreadable).toBe(true);
    expect(failure?.log_expired).toBeUndefined();
  });

  test('omits every history key for a bead with no snapshot entry', () => {
    const failure = projectFailure().get('A-1')?.failure;

    expect('timeline' in /** @type {any} */ (failure)).toBe(false);
    expect('log_path' in /** @type {any} */ (failure)).toBe(false);
    expect('log_expired' in /** @type {any} */ (failure)).toBe(false);
  });

  test('drops an event that carries no summary', () => {
    const map = projectFailure({
      'A-1': {
        events: [
          { event_id: 'e1', at: 1000, kind: 'dispatched', summary: '' },
          {
            event_id: 'e2',
            at: 2000,
            kind: 'attempt_failed',
            summary: '세션 실패'
          }
        ]
      }
    });

    expect(map.get('A-1')?.failure?.timeline).toHaveLength(1);
  });
});

describe('monitor 공급자 보류 attempt 투영', () => {
  /** @returns {Record<string, any>} */
  function providerAttempt() {
    return {
      t1: {
        attempt_id: 't1',
        bead_id: 'A-1',
        status: 'paused',
        cause: 'provider_outage:usage_limit',
        cause_detail: {
          summary: 'Claude 한도 도달',
          message: 'API Error: usage limit',
          resets_at: 2000
        },
        runner: 'claude',
        model: 'opus-4.8',
        claude_account: 'one@example.com'
      }
    };
  }

  test('classifies a provider pause as the held leaf state', () => {
    const map = activeByBead(providerAttempt(), new Map());

    expect(map.get('A-1')?.run_state).toBe('provider_hold');
  });

  test('keeps a user pause in the ordinary paused loop', () => {
    const map = activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'paused',
          cause: null
        }
      },
      new Map()
    );

    expect(map.get('A-1')?.run_state).toBe('paused');
  });

  test('projects the hold target and automatic recovery receipt', () => {
    const map = activeByBead(providerAttempt(), new Map(), {
      provider_hold: {
        claude: {
          since: 1000,
          generation: 1,
          targets: [
            {
              kind: 'usage_limit',
              model: 'opus-4.8',
              account: 'one@example.com',
              detail: 'usage_limit',
              resets_at: 2000,
              next_probe_at: 3000,
              rearm_count: 0,
              attempt_ids: ['t1'],
              auto_switch: 'none'
            }
          ]
        }
      },
      auto_resume_pending: [
        { attempt_id: 't1', generation: 1, kind: 'account_switch' }
      ],
      account_catalog: {
        claude: [
          { email: 'one@example.com', alias: '업무', status: 'ok', windows: [] }
        ]
      }
    });

    expect(map.get('A-1')?.hold).toMatchObject({
      kind: 'usage_limit',
      detail: 'usage_limit',
      summary: 'Claude 한도 도달',
      message: 'API Error: usage limit',
      resets_at: 2000,
      next_probe_at: 3000,
      auto_resume: 'pending',
      target: {
        model: 'opus-4.8',
        account: 'one@example.com',
        account_alias: '업무'
      }
    });
  });

  test('carries the account-switch refusal reason to the tile', () => {
    const map = activeByBead(providerAttempt(), new Map(), {
      provider_hold: {
        claude: {
          since: 1000,
          generation: 1,
          targets: [
            {
              kind: 'usage_limit',
              model: 'opus-4.8',
              account: 'one@example.com',
              detail: 'usage_limit',
              resets_at: null,
              rearm_count: 0,
              attempt_ids: ['t1'],
              auto_switch: 'disabled'
            }
          ]
        }
      }
    });

    expect(map.get('A-1')?.hold?.auto_switch).toBe('disabled');
  });

  test('omits the cap reason the auto-resume verdict already reports', () => {
    const map = activeByBead(providerAttempt(), new Map(), {
      provider_hold: {
        claude: {
          since: 1000,
          generation: 1,
          targets: [
            {
              kind: 'usage_limit',
              model: 'opus-4.8',
              account: 'one@example.com',
              detail: 'usage_limit',
              resets_at: null,
              rearm_count: 0,
              attempt_ids: ['t1'],
              auto_switch: 'cap'
            }
          ]
        }
      }
    });

    expect(map.get('A-1')?.hold?.auto_switch).toBe(undefined);
    expect(map.get('A-1')?.hold?.auto_resume).toBe('disarmed');
  });

  test('carries the last live preempt skip into the hold tile', () => {
    const attempts = providerAttempt();
    attempts.t1.live_preempt_last_skip = { at: 4000, reason: 'no_candidate' };

    const map = activeByBead(attempts, new Map());

    expect(map.get('A-1')?.hold?.live_preempt_skipped_at).toBe(4000);
  });

  test('keeps the manual-action verdict after the recovered target is removed', () => {
    const attempts = providerAttempt();
    attempts.t1.auto_resume_kind = 'provider_outage';

    const map = activeByBead(attempts, new Map());

    expect(map.get('A-1')?.hold?.auto_resume).toBe('disarmed');
  });

  test('carries workspace hold material into the running lane', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: providerAttempt(),
          provider_hold: {
            claude: {
              since: 1000,
              generation: 1,
              targets: [
                {
                  kind: 'usage_limit',
                  model: 'opus-4.8',
                  account: 'one@example.com',
                  detail: 'usage_limit',
                  resets_at: 2000,
                  next_probe_at: 3000,
                  rearm_count: 0,
                  attempt_ids: ['t1'],
                  auto_switch: 'cap'
                }
              ]
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running[0]).toMatchObject({
      run_state: 'provider_hold',
      hold: { auto_resume: 'disarmed' }
    });
  });
});

describe('monitor 대기 attempt 투영 (UI-5ym8 §3.1·§3.3·§6)', () => {
  test('projects a parked attempt as its own run state', () => {
    const map = activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'parked',
          started_at: 10,
          finished_at: 20,
          cause: 'session_parked',
          cause_detail: {
            summary: '사용자 결정 대기',
            awaiting_user: 'spec_review',
            bead_status: 'in_progress'
          }
        }
      },
      new Map()
    );

    expect(map.get('A-1')?.run_state).toBe('parked');
  });

  test('carries the parked session summary onto the tile projection', () => {
    const map = activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'parked',
          cause: 'session_parked',
          cause_detail: { summary: '사용자 결정 대기' }
        }
      },
      new Map()
    );

    expect(map.get('A-1')?.failure?.summary).toBe('사용자 결정 대기');
    expect(map.get('A-1')?.failure?.bead_id).toBe('A-1');
  });

  test('refuses to resume a parked attempt', () => {
    const map = activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'parked',
          session_id: 'sid',
          cause: 'session_parked'
        }
      },
      new Map()
    );

    expect(map.get('A-1')?.can_resume).toBe(false);
    expect(map.get('A-1')?.failure?.resume_eligible).toBe(false);
  });

  test('points a parked attempt at its inquiry session exit', () => {
    const map = activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'parked',
          cause: 'session_parked'
        }
      },
      new Map()
    );

    expect(map.get('A-1')?.failure?.resume_reason).toBe(
      '세션이 멈춤 — [세션에서 해결]로 문의를 이어갑니다'
    );
  });

  test('projects a retry_wait attempt with its backoff facts', () => {
    const map = activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'retry_wait',
          retry: {
            cause: 'session_failed:is_error',
            attempts: 1,
            max: 3,
            next_at: 5000,
            origin_attempt_id: 't1'
          }
        }
      },
      new Map()
    );

    expect(map.get('A-1')?.run_state).toBe('retry_wait');
    expect(map.get('A-1')?.retry).toEqual({
      cause: 'session_failed:is_error',
      attempts: 1,
      max: 3,
      next_at: 5000
    });
  });

  test('hides a superseded attempt', () => {
    const map = activeByBead(
      {
        t1: { attempt_id: 't1', bead_id: 'A-1', status: 'superseded' }
      },
      new Map()
    );

    expect(map.has('A-1')).toBe(false);
  });

  test('lets a newer running attempt win over an earlier park', () => {
    const map = activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'parked',
          started_at: 10
        },
        t2: {
          attempt_id: 't2',
          bead_id: 'A-1',
          status: 'running',
          started_at: 20
        }
      },
      new Map()
    );

    expect(map.get('A-1')?.run_state).toBe('running');
  });

  test('hides a dismissed park', () => {
    const map = activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'parked',
          dismissed_at: 99
        }
      },
      new Map()
    );

    expect(map.has('A-1')).toBe(false);
  });

  test('leaves a parked bead out of the failed lane state', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'parked',
              started_at: 5,
              cause: 'session_parked',
              cause_detail: { summary: '사용자 결정 대기' }
            }
          }
        })
      ],
      [state()]
    );

    const row = lanes.running.find((item) => item.id === 'A-1');
    expect(row?.run_state).toBe('parked');
    expect(row?.alert).toBe(false);
    expect(row?.badges).toEqual(['⏸ 세션이 멈춤']);
  });
});

describe('recovery wait projection', () => {
  /** @param {Record<string, any>} [patch] */
  function recoveryAttempt(patch = {}) {
    return {
      attempt_id: 'recovery',
      bead_id: 'A-1',
      status: 'waiting',
      started_at: 20,
      finished_at: 30,
      session_id: 'saved-session',
      cause: 'session_ended_unresolved',
      cause_detail: {
        recovery: {
          classification: 'unknown',
          disposition: 'wait',
          reason: 'unclassified',
          policy_schema: 1,
          no_progress: { count: 1, key: 'same-error' }
        }
      },
      ...patch
    };
  }

  test('preserves recovery facts separately from failure facts', () => {
    const projected = activeByBead(
      { recovery: recoveryAttempt() },
      new Map()
    ).get('A-1');

    expect(projected).toMatchObject({
      run_state: 'waiting',
      can_resume: false,
      wait: {
        cause: 'session_ended_unresolved',
        since: 30,
        blockers: [],
        recovery: {
          classification: 'unknown',
          disposition: 'wait',
          reason: 'unclassified',
          label: '세션이 멈춤',
          no_progress: { count: 1, key: 'same-error' }
        }
      }
    });
    expect(projected.wait.recovery.sentence).toContain(
      '세션에서 원인과 결과를 확인'
    );
    expect(projected.failure).toBeUndefined();
  });

  test.each(['', null, undefined])(
    'withholds resume without a saved session (%s)',
    (session_id) => {
      const projected = activeByBead(
        { recovery: recoveryAttempt({ session_id }) },
        new Map()
      ).get('A-1');

      expect(projected.can_resume).toBe(false);
    }
  );

  test('withholds resume after a child has already inherited the session', () => {
    const projected = activeByBead(
      {
        recovery: recoveryAttempt(),
        child: {
          attempt_id: 'child',
          bead_id: 'A-1',
          kind: 'review_session',
          status: 'done',
          resumed_from: 'recovery'
        }
      },
      new Map()
    ).get('A-1');

    expect(projected.can_resume).toBe(false);
  });

  test.each([false, true])(
    'keeps recovery ahead of historical failure regardless of snapshot order (%s)',
    (reverse) => {
      const entries = [
        [
          'old',
          {
            attempt_id: 'old',
            bead_id: 'A-1',
            status: 'failed',
            started_at: 10,
            finished_at: 15
          }
        ],
        ['recovery', recoveryAttempt()]
      ];
      const attempts = Object.fromEntries(
        reverse ? entries.reverse() : entries
      );

      const lanes = buildLanes(
        [workspace({ attempts, bead_blocked_by: { 'A-1': [] } })],
        [state()]
      );

      expect(lanes.running).toHaveLength(1);
      expect(lanes.running[0]).toMatchObject({
        run_state: 'waiting',
        badges: ['⏸ 세션이 멈춤'],
        alert: false,
        failure: null
      });
      expect(
        lanes.running.filter((item) => item.run_state === 'failed')
      ).toEqual([]);
      expect(attempts.old.status).toBe('failed');
    }
  );

  test('labels the live recovery child with its current work', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            recovery: recoveryAttempt(),
            child: {
              attempt_id: 'child',
              bead_id: 'A-1',
              status: 'running',
              started_at: 40,
              resumed_from: 'recovery'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running).toHaveLength(1);
    expect(lanes.running[0]).toMatchObject({
      run_state: 'running',
      status_label: '복구 중',
      alert: false
    });
  });
});

describe('선행 대기 attempt 투영 (선행 대기 계층 §5.1)', () => {
  /**
   * @param {Partial<Record<string, any>>} [patch]
   * @returns {Record<string, any>}
   */
  function waitingAttempt(patch = {}) {
    return {
      t1: {
        attempt_id: 't1',
        bead_id: 'A-1',
        status: 'waiting',
        started_at: 10,
        finished_at: 20,
        cause: 'prerequisite_unmet',
        cause_detail: {
          summary: '선행 Analysis-2zly 미충족으로 착수하지 않았습니다',
          blockers: [{ id: 'Analysis-2zly', rig: 'Analysis', status: 'open' }],
          bead_status: 'open'
        },
        ...patch
      }
    };
  }

  /**
   * Cause를 알 수 없는 `waiting` attempt — 강등 판정이 fail-closed로
   * 타일을 유지하는 갈래다 (false).
   *
   * @param {Partial<Record<string, any>>} [patch]
   * @returns {Record<string, any>}
   */
  function unknownWaitingAttempt(patch = {}) {
    const attempts = waitingAttempt(patch);
    delete attempts.t1.cause;
    return attempts;
  }

  /**
   * Queue lane 하나를 가진 워크스페이스이다. 강등된 bead는 실행 중 타일이
   * 아니라 이 병렬 큐 행이 대표한다.
   *
   * @param {Partial<Record<string, any>>} [patch]
   * @returns {Record<string, any>}
   */
  function queuedWorkspace(patch = {}) {
    return workspace({ queue: [{ bead_id: 'A-1' }], ...patch });
  }

  /**
   * @param {string[]} blocker_ids
   * @returns {Record<string, any>}
   */
  function waitingOn(blocker_ids) {
    const attempts = waitingAttempt();
    attempts.t1.cause_detail.blockers = blocker_ids.map((id) => ({
      id,
      rig: null,
      status: 'open'
    }));
    return attempts;
  }

  test('keeps a prerequisite wait out of the running projection', () => {
    const map = activeByBead(waitingAttempt(), new Map());

    expect(map.has('A-1')).toBe(false);
  });

  test('projects a waiting attempt of unknown cause as its own run state', () => {
    const map = activeByBead(unknownWaitingAttempt(), new Map());

    expect(map.get('A-1')?.run_state).toBe('waiting');
  });

  test('keeps a waiting tile when stale_work is absent', () => {
    const map = activeByBead(unknownWaitingAttempt(), new Map(), {
      admission: { 'A-1': { reason: 'worktree_stale_work' } }
    });

    expect(map.get('A-1')?.run_state).toBe('waiting');
  });

  test('keeps a waiting tile when stale-work action_id is empty', () => {
    const map = activeByBead(unknownWaitingAttempt(), new Map(), {
      admission: staleAdmission('')
    });

    expect(map.get('A-1')?.run_state).toBe('waiting');
  });

  test('carries the proven blockers onto the wait projection', () => {
    const map = activeByBead(unknownWaitingAttempt(), new Map());

    expect(map.get('A-1')?.wait).toEqual({
      summary: '선행 Analysis-2zly 미충족으로 착수하지 않았습니다',
      blockers: [{ id: 'Analysis-2zly', rig: 'Analysis', status: 'open' }],
      since: 20
    });
  });

  test('projects no failure material for a waiting attempt', () => {
    const map = activeByBead(unknownWaitingAttempt(), new Map());

    expect(map.get('A-1')?.failure).toBeUndefined();
  });

  test('refuses to resume a waiting attempt', () => {
    const map = activeByBead(
      unknownWaitingAttempt({ session_id: 'sid' }),
      new Map()
    );

    expect(map.get('A-1')?.can_resume).toBe(false);
  });

  test('withholds manual resume for a historic base movement wait', () => {
    const map = activeByBead(
      waitingAttempt({
        cause: 'base_moved',
        session_id: 'sid-base-moved',
        cause_detail: {
          candidate_sha: 'd'.repeat(40),
          base_sha: 'a'.repeat(40)
        }
      }),
      new Map()
    );

    expect(map.get('A-1')).toMatchObject({
      run_state: 'waiting',
      can_resume: false,
      wait: { blockers: [] }
    });
  });

  test('demotes a prerequisite wait to its parallel queue row', () => {
    const lanes = buildLanes(
      [queuedWorkspace({ attempts: waitingAttempt() })],
      [state()]
    );

    expect({
      running: lanes.running.map((item) => item.id),
      queue: lanes.queue.map((item) => item.id)
    }).toEqual({ running: [], queue: ['A-1'] });
  });

  test('demotes a prerequisite wait to its serial lane entry', () => {
    const lanes = buildLanes(
      [
        workspace({
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }],
          attempts: waitingAttempt()
        })
      ],
      [state()]
    );

    const serial = lanes.queue_groups[0].sublanes.serial[0];
    expect({
      running: lanes.running.map((item) => item.id),
      items: serial.items.map((item) => item.id),
      seq: serial.items[0]?.seq
    }).toEqual({ running: [], items: ['A-1'], seq: 1 });
  });

  test('keeps a base-moved wait on its running tile', () => {
    const lanes = buildLanes(
      [queuedWorkspace({ attempts: waitingAttempt({ cause: 'base_moved' }) })],
      [state()]
    );

    expect(lanes.running.map((item) => item.id)).toEqual(['A-1']);
  });

  test('keeps a recovery wait on its running tile', () => {
    const attempts = waitingAttempt({ cause: 'session_ended_unresolved' });
    attempts.t1.cause_detail.recovery = {
      classification: 'no_progress',
      disposition: 'hold',
      reason: '진행 없음',
      no_progress: null,
      label: null,
      sentence: null
    };

    const lanes = buildLanes([queuedWorkspace({ attempts })], [state()]);

    expect(lanes.running.map((item) => item.id)).toEqual(['A-1']);
  });

  test('keeps a waiting attempt of unknown cause on its running tile', () => {
    const lanes = buildLanes(
      [queuedWorkspace({ attempts: unknownWaitingAttempt() })],
      [state()]
    );

    const row = lanes.running.find((item) => item.id === 'A-1');
    expect(row?.badges).toEqual(['⛓ 선행 대기']);
    expect(row?.alert).toBe(false);
  });

  test('moves a frozen blocker missing from the open set to released', () => {
    const lanes = buildLanes(
      [
        queuedWorkspace({
          attempts: waitingOn(['A-X', 'A-Y']),
          bead_blocked_by: { 'A-1': ['A-Y'] }
        })
      ],
      [state()]
    );

    const row = lanes.queue.find((item) => item.id === 'A-1');
    expect({
      open: row?.blocked_by,
      released: row?.dependency_chips?.released?.map((chip) => chip.id)
    }).toEqual({
      open: ['A-Y'],
      released: ['A-X']
    });
  });

  test('lists a proven blocker once when the decoration already carries it', () => {
    const lanes = buildLanes(
      [
        queuedWorkspace({
          attempts: waitingAttempt(),
          bead_blocked_by: { 'A-1': ['Analysis-2zly'] }
        })
      ],
      [state()]
    );

    const row = lanes.queue.find((item) => item.id === 'A-1');
    expect(row?.blocked_by).toEqual(['Analysis-2zly']);
  });

  test('marks all frozen blockers released after their edges disappear', () => {
    const lanes = buildLanes(
      [
        queuedWorkspace({
          attempts: waitingOn(['A-X', 'A-Y']),
          bead_blocked_by: { 'A-1': [] }
        })
      ],
      [state()]
    );

    const row = lanes.queue.find((item) => item.id === 'A-1');
    expect({
      open: row?.blocked_by,
      released: row?.dependency_chips?.released?.map((chip) => chip.id)
    }).toEqual({ open: [], released: ['A-X', 'A-Y'] });
  });

  test('keeps every frozen blocker open when the current key is absent', () => {
    const lanes = buildLanes(
      [queuedWorkspace({ attempts: waitingOn(['A-X', 'A-Y']) })],
      [state()]
    );

    const row = lanes.queue.find((item) => item.id === 'A-1');
    expect({
      open: row?.blocked_by,
      released: row?.dependency_chips?.released
    }).toEqual({ open: ['A-X', 'A-Y'], released: undefined });
  });

  test('shows a newly added blocker beside the released frozen one', () => {
    const lanes = buildLanes(
      [
        queuedWorkspace({
          attempts: waitingOn(['A-X']),
          bead_blocked_by: { 'A-1': ['A-Z'] }
        })
      ],
      [state()]
    );

    const row = lanes.queue.find((item) => item.id === 'A-1');
    expect({
      open: row?.blocked_by,
      released: row?.dependency_chips?.released?.map((chip) => chip.id)
    }).toEqual({ open: ['A-Z'], released: ['A-X'] });
  });

  test('uses a visible blocker workspace name before its root basename', () => {
    const lanes = buildLanes(
      [
        queuedWorkspace({
          attempts: waitingOn(['B-1']),
          bead_blocked_by: { 'A-1': ['B-1'] },
          blocker_workspaces: { 'B-1': WS_B }
        }),
        workspace({
          root_dir: WS_B,
          name: '표시-repo-b',
          queue: [{ bead_id: 'B-1' }]
        })
      ],
      [
        state(),
        state({ root_dir: WS_B, name: '표시-repo-b', issue_prefix: 'B' })
      ]
    );

    const chip = lanes.queue.find((item) => item.id === 'A-1')?.dependency_chips
      ?.predecessors?.[0];
    expect([chip?.label, chip?.title]).toEqual([
      '⛓ B-1',
      expect.stringContaining('다른 저장소(표시-repo-b)의 이슈')
    ]);
  });

  test('falls back to a blocker owner root basename', () => {
    const lanes = buildLanes(
      [
        queuedWorkspace({
          attempts: waitingOn(['B-1']),
          bead_blocked_by: { 'A-1': ['B-1'] },
          blocker_workspaces: { 'B-1': WS_B }
        })
      ],
      [state()]
    );

    const chip = lanes.queue[0].dependency_chips?.predecessors?.[0];
    expect([chip?.label, chip?.title]).toEqual([
      '⛓ B-1',
      expect.stringContaining('다른 저장소(repo-b)의 이슈')
    ]);
  });

  test('carries a foreign owner onto a resolved blocker chip', () => {
    const lanes = buildLanes(
      [
        queuedWorkspace({
          attempts: waitingOn(['B-1']),
          bead_blocked_by: { 'A-1': [] },
          blocker_workspaces: { 'B-1': WS_B }
        })
      ],
      [state()]
    );

    const chip = lanes.queue[0].dependency_chips?.released?.[0];
    expect([chip?.label, chip?.title, chip?.openable, chip?.root_dir]).toEqual([
      '🔓 B-1',
      expect.stringContaining('다른 저장소(repo-b)의 이슈'),
      true,
      WS_B
    ]);
  });

  test('opens a foreign predecessor known only by the owner map', () => {
    const lanes = buildLanes(
      [
        queuedWorkspace({
          attempts: waitingOn(['B-1']),
          bead_blocked_by: { 'A-1': ['B-1'] },
          blocker_workspaces: { 'B-1': WS_B }
        })
      ],
      [state()]
    );

    const chip = lanes.queue[0].dependency_chips?.predecessors?.[0];
    expect([chip?.openable, chip?.root_dir]).toEqual([true, WS_B]);
  });

  test('carries the card repo onto an unplaced same-repo resolved chip', () => {
    const lanes = buildLanes(
      [
        queuedWorkspace({
          attempts: waitingOn(['A-X']),
          bead_blocked_by: { 'A-1': [] }
        })
      ],
      [state()]
    );

    const chip = lanes.queue[0].dependency_chips?.released?.[0];
    expect([chip?.openable, chip?.root_dir]).toEqual([true, WS_A]);
  });

  test('keeps other held states despite a stale-work admission', () => {
    const attempts = {
      parked: {
        attempt_id: 'parked',
        bead_id: 'A-1',
        status: 'parked',
        cause: 'session_parked'
      },
      retry: {
        attempt_id: 'retry',
        bead_id: 'A-2',
        status: 'retry_wait'
      },
      provider: {
        attempt_id: 'provider',
        bead_id: 'A-3',
        status: 'paused',
        cause: 'provider_outage:usage_limit'
      }
    };
    const admission = Object.fromEntries(
      ['A-1', 'A-2', 'A-3'].map((id) => [
        id,
        { reason: 'worktree_stale_work', stale_work: { action_id: id } }
      ])
    );

    const map = activeByBead(attempts, new Map(), { admission });

    expect(['A-1', 'A-2', 'A-3'].map((id) => map.get(id)?.run_state)).toEqual([
      'parked',
      'retry_wait',
      'provider_hold'
    ]);
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

  test('projects the current conversation usage and delegation facts', () => {
    const lanes = buildLanes(
      [
        workspace({
          session_active: [
            sessionActive('A-1', {
              session_observation: {
                provider: 'codex',
                session_id: 'root',
                model: 'gpt-5.6-sol',
                usage: { input_tokens: 100, output_tokens: 10 },
                usage_legs: [],
                delegations: [
                  {
                    agent_path: '/root/implementation',
                    model: 'gpt-5.6-terra',
                    status: 'failed',
                    usage: { input_tokens: 20, output_tokens: 2 }
                  }
                ]
              }
            })
          ]
        })
      ],
      [state()]
    );

    const tile = lanes.running[0];
    expect(/** @type {any} */ (tile.usage).providers.codex.subtotal).toBe(110);
    expect(tile.legs).toMatchObject([
      {
        label: 'implementation · codex · gpt-5.6-terra',
        state: 'failed',
        native: true
      }
    ]);
  });

  test('adds later live and external costs after a reported Claude scope', () => {
    const lanes = buildLanes(
      [
        workspace({
          session_active: [
            sessionActive('A-1', {
              session_observation: {
                provider: 'claude',
                session_id: 'root',
                model: 'claude-opus-4-8',
                usage: {
                  input_tokens: 24,
                  output_tokens: 5,
                  total_cost_usd: 0.75
                },
                usage_legs: [
                  {
                    provider: 'claude',
                    role: 'orchestrator',
                    turn_id: 'm1',
                    model: 'claude-opus-4-8',
                    usage: { input_tokens: 15, output_tokens: 3 },
                    cost_covered: true
                  },
                  {
                    provider: 'claude',
                    role: 'orchestrator',
                    turn_id: 'm2',
                    model: 'claude-opus-4-6',
                    usage: { input_tokens: 9, output_tokens: 2 },
                    cost_covered: true
                  },
                  {
                    provider: 'claude',
                    role: 'orchestrator',
                    turn_id: 'result:reported-cost',
                    model: null,
                    usage: { total_tokens: 0, total_cost_usd: 0.75 }
                  },
                  {
                    provider: 'claude',
                    role: 'orchestrator',
                    turn_id: 'm3-live',
                    model: 'claude-sonnet-4-6',
                    usage: { input_tokens: 1_000_000 }
                  },
                  {
                    provider: 'claude',
                    role: 'subagent',
                    receipt_id: 'external-child',
                    model: 'claude-opus-4-8',
                    usage: { total_tokens: 0, total_cost_usd: 0.5 }
                  }
                ],
                delegations: []
              }
            })
          ]
        })
      ],
      [
        state({
          runner_catalog: {
            model_index: {
              opus: 'claude',
              sonnet: 'claude',
              'claude-opus-4-8': 'claude',
              'claude-sonnet-4-6': 'claude'
            },
            runners: {
              claude: {
                models: {
                  opus: {
                    id: 'claude-opus-4-8',
                    price: { input: 1, output: 2 }
                  },
                  sonnet: {
                    id: 'claude-sonnet-4-6',
                    price: { input: 3, output: 4 }
                  }
                }
              }
            }
          }
        })
      ]
    );

    expect(
      /** @type {any} */ (lanes.running[0].usage).providers.claude
        .total_cost_usd
    ).toBe(4.25);
  });

  test('adds native child usage to the worker parent total', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              runner: 'codex',
              model: 'gpt-5.6-sol',
              usage: { input_tokens: 100, output_tokens: 10 },
              codex_children: [
                {
                  thread_id: 'child',
                  agent_path: '/root/unit',
                  model: 'gpt-5.6-terra',
                  status: 'done',
                  usage: { input_tokens: 50, output_tokens: 5 },
                  usage_segments: [
                    {
                      scope_id: 'thread:child:turn:t1:model:gpt-5.6-terra',
                      turn_id: 't1',
                      model: 'gpt-5.6-terra',
                      usage: { input_tokens: 50, output_tokens: 5 }
                    }
                  ]
                }
              ]
            }
          }
        })
      ],
      [state()]
    );

    const tile = lanes.running[0];
    expect(/** @type {any} */ (tile.usage).providers.codex.subtotal).toBe(165);
    expect(/** @type {any} */ (tile.legs)[0]).toMatchObject({
      label: 'unit · gpt-5.6-terra',
      state: 'done',
      native: true,
      usage_included: true
    });
  });

  test('prices native child model segments and includes safe segments from a partial row', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              runner: 'codex',
              codex_children: [
                {
                  thread_id: 'child',
                  agent_path: '/root/unit',
                  model: 'model-b',
                  status: 'done',
                  usage_partial: true,
                  usage_partial_reasons: ['response_conflict'],
                  usage_segments: [
                    {
                      scope_id: 'child:model-a',
                      turn_id: 't1',
                      model: 'model-a',
                      usage: { input_tokens: 10, output_tokens: 0 }
                    },
                    {
                      scope_id: 'child:model-b',
                      turn_id: 't2',
                      model: 'model-b',
                      usage: { input_tokens: 10, output_tokens: 0 }
                    }
                  ]
                }
              ]
            }
          }
        })
      ],
      [
        state({
          runner_catalog: {
            model_index: { 'model-a': 'codex', 'model-b': 'codex' },
            runners: {
              codex: {
                models: {
                  'model-a': { id: 'model-a', price: { input: 1, output: 1 } },
                  'model-b': { id: 'model-b', price: { input: 3, output: 1 } }
                }
              }
            }
          }
        })
      ]
    );

    expect(/** @type {any} */ (lanes.running[0].legs)[0]).toMatchObject({
      usage: { input_tokens: 20, output_tokens: 0 },
      usage_included: true,
      price_usd: 0.00004,
      price_basis: 'computed'
    });
    expect(
      /** @type {any} */ (lanes.running[0].usage).providers.codex.subtotal
    ).toBe(20);
    expect(
      /** @type {any} */ (lanes.running[0].usage).providers.codex
        .partial_reasons
    ).toContain('response_conflict');
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
    expect(row?.dependency_chips?.predecessors?.[0].label).toBe('⛓ A-1');
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

describe('monitor 완료 행 PR 링크', () => {
  const PR_WORKFLOW = {
    route: 'quick_fix',
    chips: {
      route: 'quick_fix',
      pr: { number: 213, url: 'https://github.com/o/r/pull/213' }
    }
  };

  test('fills the done row PR link from bead_workflow', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 1 }],
          bead_workflow: { 'A-1': PR_WORKFLOW }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].pr_number).toBe(213);
    expect(lanes.done[0].pr_url).toBe('https://github.com/o/r/pull/213');
  });

  test('leaves the done row without PR fields when the bead pinned no PR', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 1 }],
          bead_workflow: { 'A-1': { route: 'quick_fix', chips: {} } }
        })
      ],
      [state()]
    );

    expect(lanes.done[0]).not.toHaveProperty('pr_number');
    expect(lanes.done[0]).not.toHaveProperty('pr_url');
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
        prefixes: ['server/worker/queue-store.js'],
        root_dir: WS_A
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
      prefixes: ['app/views/monitor/index.js'],
      root_dir: WS_A
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
              kind: 'review_session',
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
              kind: 'review_session',
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
              kind: 'review_session',
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
              kind: 'review_session',
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

describe('monitor runnable rec projection (UI-sbum §4)', () => {
  test('reads the recommendation against the row exec pins', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-1', {
              rec: {
                rec_orchestration_model: 'fable',
                rec_impl_runtime: 'claude',
                rec_reason: 'hard_diagnosis'
              },
              exec_pins: { orchestration_model: 'opus' }
            })
          ]
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].rec).toEqual({
      reasons: ['hard_diagnosis'],
      rec: { orchestration_model: 'fable', impl_runtime: 'claude' },
      state: 'diverged'
    });
  });

  test('reads applied when the pins already carry the whole recommendation', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-1', {
              rec: { rec_orchestration_model: 'fable' },
              exec_pins: { orchestration_model: 'fable' }
            })
          ]
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].rec?.state).toBe('applied');
  });

  test('leaves the field off a row with no recommendation', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1', { rec: null })] })],
      [state()]
    );

    expect(lanes.runnable[0].rec).toBeUndefined();
  });

  test('leaves the field off a legacy row from a server that sends no rec', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1')] })],
      [state()]
    );

    expect(lanes.runnable[0].rec).toBeUndefined();
  });
});

const EXECUTION_DEFAULTS = {
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

/**
 * A projection whose implementation defaults are ROUTE-CONDITIONAL
 * (`quick_fix → main`), so the resolved route is visible in the worker chip.
 */
const ROUTED_EXECUTION_DEFAULTS = {
  supported: true,
  schema_version: 1,
  session: {
    implementation: {
      default: {
        dispatch: 'delegated',
        runtime: 'inherit',
        model: 'auto',
        effort: 'auto',
        speed: 'default'
      },
      route_defaults: { quick_fix: { dispatch: 'main' } }
    }
  },
  orchestration: {
    runtime: 'claude',
    model: 'sonnet',
    model_id: 'claude-sonnet',
    effort: null,
    speed: null
  }
};

const MERGE_SHA = 'a'.repeat(40);

describe('candidate facts parity', () => {
  test.each([
    'defaults',
    'one pin',
    'released predecessor',
    'blocked without ids'
  ])('projects identical card materials from both sources: %s', (scenario) => {
    const now = Date.now();
    const blocked_without_ids = scenario === 'blocked without ids';
    const blocked_by = blocked_without_ids ? [] : ['A-2'];
    const exec_pins =
      scenario === 'one pin' ? { orchestration_model: 'opus' } : {};
    const release_info =
      scenario === 'released predecessor'
        ? {
            released_by: [
              { id: 'A-9', closed_at: now - 86400000, foreign: false }
            ],
            last_released_at: now - 86400000
          }
        : undefined;
    const metadata = {
      route: 'spec_backed',
      spec_review: `codex@${'a'.repeat(40)}`,
      ...(blocked_without_ids ? {} : { awaiting_user: 'spec_review_stale' }),
      session_preferred_reason: 'user_feedback_loop',
      ...exec_pins
    };
    const issue = {
      id: 'A-1',
      title: 'same bead',
      status: 'open',
      description: 'body',
      spec_id: 'docs/a.md',
      labels: ['session-preferred', 'spec-after-blocker'],
      metadata,
      blocked_info: { blockers: blocked_by },
      release_info,
      dependents_info: { count: 1, ids: ['A-3'] }
    };
    const queue_store = createWorkerQueueStore();
    queue_store.set(/** @type {any} */ (workspace()));
    const adapter = createWorkspaceAdapter({
      queueStore: queue_store,
      issueStores: {
        snapshotFor: (/** @type {string} */ key) =>
          key === 'tab:worker:blocked' ? [issue] : []
      },
      getWorkspacePath: () => WS_A
    });
    const input = adapter.read({
      candidate_sort: normalizeCandidateSort(null)
    });
    const states = [
      state({
        execution_defaults: ROUTED_EXECUTION_DEFAULTS,
        runner_catalog: { runtimes: {} },
        session_defaults: {}
      })
    ];
    const server_row = runnable('A-1', {
      title: issue.title,
      route: 'spec_backed',
      spec_state: 'published',
      has_description: true,
      awaiting_user: !blocked_without_ids,
      ...(blocked_without_ids
        ? { blocked_without_ids: true }
        : { awaiting_user_reason: '사용자 리뷰 필요: spec_review_stale' }),
      worker_ineligible: false,
      session_preferred_reason: 'user_feedback_loop',
      spec_after_blocker: !blocked_without_ids,
      blocked: true,
      blocked_by,
      labels: issue.labels,
      published: true,
      exec_pins,
      release_info,
      dependents_info: issue.dependents_info
    });

    const observed = buildLanes(input.workspaces, states).runnable[0];
    const server = buildLanes([workspace({ runnable: [server_row] })], states)
      .runnable[0];

    for (const key of [
      'queue_placeable',
      'route_ok',
      'placement_spec',
      'session_preferred',
      'session_preferred_reason',
      'spec_after_blocker',
      'reason',
      'exec_chips',
      'dependency_chips'
    ]) {
      expect(/** @type {any} */ (observed)[key], key).toEqual(
        /** @type {any} */ (server)[key]
      );
    }
    expect(observed.reason).toBe(
      blocked_without_ids ? '🔒 blocked' : '사용자 리뷰 필요: spec_review_stale'
    );
    expect(observed.reason).not.toContain('대기 큐에 넣을 수 없습니다');
    expect(observed.exec_chips?.orchestration?.pinned).toBe(
      scenario === 'one pin'
    );
    expect(observed.exec_chips?.worker?.pinned).toBe(false);
    if (scenario === 'one pin') {
      expect(observed.exec_chips?.orchestration?.title).toContain(
        '이슈 핀 — 레포 기본값과 다름'
      );
      expect(observed.exec_chips?.worker?.title).not.toContain(
        '이슈 핀 — 레포 기본값과 다름'
      );
    }
    if (release_info) {
      expect(observed.dependency_chips?.released?.[0].label).toContain('🔓');
    }
    adapter.destroy();
  });

  test('marks a stale waiting admission separately from its reason', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          admission: { 'A-1': { stale: true, reason: 'spec_review_stale' } }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].rereview_required).toBe(true);
    expect(lanes.queue[0].reason).toBe('');
  });
});

describe('lane model worker group values (UI-4tud §4.3)', () => {
  test('counts running attempts against the repo slot cap', () => {
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
            t2: {
              attempt_id: 't2',
              bead_id: 'A-2',
              status: 'running',
              started_at: 20
            }
          }
        })
      ],
      [state({ slots: 1 })],
      { groups: 'all' }
    );

    expect([
      lanes.queue_groups[0].live_count,
      lanes.queue_groups[0].over_cap
    ]).toEqual([2, true]);
  });

  test('leaves paused and failed tiles out of the live count', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: { attempt_id: 't1', bead_id: 'A-1', status: 'paused' },
            t2: { attempt_id: 't2', bead_id: 'A-2', status: 'failed' }
          }
        })
      ],
      [state({ slots: 2 })],
      { groups: 'all' }
    );

    expect([
      lanes.queue_groups[0].live_count,
      lanes.queue_groups[0].over_cap
    ]).toEqual([0, false]);
  });

  test('carries the merge queue positions and driver state on the group', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          merge_queue: [
            { bead_id: 'A-1', resolution: { state: 'ready' }, authority: 'ui' },
            { bead_id: 'A-2', continuation_action: { continuation: null } }
          ],
          merge_queue_state: {
            active: 'A-1',
            failures: { 'A-2': 'boom' },
            waiting: { bead_id: 'A-2', reason: '충돌 해소 대기' }
          }
        })
      ],
      [state()],
      { groups: 'all' }
    );

    const merge = lanes.queue_groups[0].merge;
    expect([
      merge.positions.get('A-1'),
      merge.positions.get('A-2'),
      merge.resolutions.get('A-1'),
      merge.authorities.get('A-1'),
      merge.continuations.get('A-2'),
      merge.state.active,
      merge.state.failures,
      merge.state.waiting,
      merge.running
    ]).toEqual([
      1,
      2,
      { state: 'ready' },
      'ui',
      { continuation: null },
      'A-1',
      { 'A-2': 'boom' },
      { bead_id: 'A-2', reason: '충돌 해소 대기' },
      true
    ]);
  });

  test('counts an auto-merge skip only while the recorded head still stands', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          auto_merge_skips: {
            'A-1': { head_sha: 'h1', reason: 'verify_failed', at: 1 },
            'A-2': { head_sha: 'old', reason: 'verify_failed', at: 1 }
          },
          pr_observations: {
            'A-1': { pr: { head_sha: 'h1' } },
            'A-2': { pr: { head_sha: 'h2' } }
          }
        })
      ],
      [state()],
      { groups: 'all' }
    );

    expect(lanes.queue_groups[0].merge.auto_excluded).toEqual(['A-1']);
  });

  test('sums the completed lane usage into the group token total', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 5 }],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'succeeded',
              runner: 'claude',
              usage: { input_tokens: 10, output_tokens: 20 }
            }
          }
        })
      ],
      [state()],
      { groups: 'all' }
    );

    expect(lanes.queue_groups[0].token_total).toEqual([
      expect.objectContaining({
        provider: 'claude',
        label: 'Claude τ 30 · 단가 없음'
      })
    ]);
  });

  test('reports no token total when no completed row reported usage', () => {
    const lanes = buildLanes([workspace()], [state()], { groups: 'all' });

    expect(lanes.queue_groups[0].token_total).toBeNull();
  });

  test('projects the durable cleanup failures onto the group', () => {
    const lanes = buildLanes(
      [
        workspace({
          cleanup_failed: {
            'A-1': {
              step: 'branch_cleanup',
              reason: 'push rejected',
              at: 42,
              detail: 'detail',
              retry_count: 2,
              failure_code: 'push_rejected'
            }
          }
        })
      ],
      [state()],
      { groups: 'all' }
    );

    expect(lanes.queue_groups[0].cleanup_failures).toEqual([
      {
        bead_id: 'A-1',
        step: 'branch_cleanup',
        reason: 'push rejected',
        at: 42,
        detail: 'detail',
        output_tail: undefined,
        log_path: undefined,
        retry_count: 2,
        failure_code: 'push_rejected'
      }
    ]);
  });

  // UI-i60a §1: `post_merge_jobs` is the first closure step, so the Monitor
  // mirror offers the same resume it offers the other closure steps.
  test('offers the cleanup resume for a stop at post_merge_jobs', () => {
    const lanes = buildLanes(
      [
        workspace({
          cleanup_failed: {
            'A-1': {
              step: 'post_merge_jobs',
              reason: 'post_merge_job_failed',
              at: 42
            }
          }
        })
      ],
      [state()],
      { groups: 'all' }
    );

    expect(lanes.queue_groups[0].cleanup_failures[0].step).toBe(
      'post_merge_jobs'
    );
  });

  test('passes the declared base and repo operations through to the group', () => {
    const lanes = buildLanes(
      [
        workspace({
          declared_base: 'main',
          repo_operations: [{ operation_id: 'op-1', kind: 'deploy' }]
        })
      ],
      [state()],
      { groups: 'all' }
    );

    expect([
      lanes.queue_groups[0].declared_base,
      lanes.queue_groups[0].repo_operations
    ]).toEqual(['main', [{ operation_id: 'op-1', kind: 'deploy' }]]);
  });
});

describe('lane model group retention (UI-4tud §4.3)', () => {
  const only_running = workspace({
    attempts: {
      t1: { attempt_id: 't1', bead_id: 'A-1', status: 'running', started_at: 1 }
    }
  });
  const only_pr_wait = workspace({ pr_wait: [{ bead_id: 'A-1' }] });
  const only_done = workspace({ done: [{ bead_id: 'A-1', added_at: 1 }] });
  const only_repo_ops = workspace({
    repo_operations: [{ operation_id: 'op-1', kind: 'deploy' }]
  });

  /** @type {Array<{ label: string, ws: Record<string, any> }>} */
  const cases = [
    { label: 'running', ws: only_running },
    { label: 'pr_wait', ws: only_pr_wait },
    { label: 'done', ws: only_done },
    { label: 'repo_operations', ws: only_repo_ops }
  ];
  for (const { label, ws } of cases) {
    test(`keeps one group per state row with groups all (${label} only)`, () => {
      const lanes = buildLanes([ws], [state()], { groups: 'all' });

      expect(lanes.queue_groups.map((group) => group.root_dir)).toEqual([WS_A]);
    });

    test(`drops the empty group by default (${label} only)`, () => {
      const lanes = buildLanes([ws], [state()]);

      expect(lanes.queue_groups).toEqual([]);
    });
  }
});

describe('lane model running tile worker fields (UI-4tud §4.3)', () => {
  test('carries the failed tile discard, conflict, base and rollup facts', () => {
    const lanes = buildLanes(
      [
        workspace({
          declared_base: 'main',
          bead_overlay: {
            'A-1': {
              rollup: { total: 3, count: 1, current: null, children: [] }
            }
          },
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'failed',
              cause: 'verify_failed',
              conflict_resolution: true,
              target_base: 'release',
              finished_at: 9
            }
          }
        })
      ],
      [state()]
    );

    const tile = lanes.running[0];
    expect([
      tile.conflict_resolution,
      tile.base_exception,
      tile.rollup,
      !!tile.discard
    ]).toEqual([
      true,
      '→ release',
      { total: 3, count: 1, current: null, children: [] },
      true
    ]);
  });

  test('inherits conflict resolution through the resumed attempt chain', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t0: {
              attempt_id: 't0',
              bead_id: 'A-1',
              status: 'paused',
              conflict_resolution: true
            },
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 5,
              resumed_from: 't0'
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running[0].conflict_resolution).toBe(true);
  });

  test('projects the quick_fix landing progress onto the running tile', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 5,
              quickfix_lane: true,
              quickfix_landing: {
                cursor: 'branch_cleanup',
                head_sha: MERGE_SHA,
                reason: null
              }
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.running[0].landing).toEqual(
      expect.objectContaining({ step: 'branch', active: true, failed: false })
    );
  });

  test('omits the landing key on a tile with no landing material', () => {
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

    expect(Object.hasOwn(lanes.running[0], 'landing')).toBe(false);
  });
});

describe('lane model session done rows (UI-4tud §4.3)', () => {
  test('merges session rows into the completed lane by done_at desc', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [
            { bead_id: 'A-1', added_at: 100 },
            { bead_id: 'A-3', added_at: 900 }
          ],
          session_done: [
            {
              id: 'A-2',
              title: '세션이 끝낸 일',
              done_at: 500,
              badges: ['세션 작업'],
              work_kind: 'session'
            }
          ]
        })
      ],
      [state()]
    );

    expect(lanes.done.map((row) => row.id)).toEqual(['A-3', 'A-2', 'A-1']);
  });

  test('carries the session row badge and repo coordinate', () => {
    const lanes = buildLanes(
      [
        workspace({
          session_done: [
            { id: 'A-2', title: '세션', done_at: 5, badges: ['세션 작업'] }
          ]
        })
      ],
      [state()]
    );

    expect([
      lanes.done[0].badges,
      lanes.done[0].root_dir,
      lanes.done[0].lane
    ]).toEqual([['세션 작업'], WS_A, 'done']);
  });

  test('drops a session row whose bead already stands in another lane', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          session_done: [{ id: 'A-2', title: '세션', done_at: 5 }]
        })
      ],
      [state()]
    );

    expect(lanes.done).toEqual([]);
  });
});

describe('lane model candidate eligibility (UI-4tud §4.2)', () => {
  test('places an eligible observation row without making it draggable', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-1', {
              observation: true,
              route: 'spec_backed',
              spec_state: 'published',
              has_description: true,
              awaiting_user: false,
              worker_ineligible: false
            })
          ]
        })
      ],
      [state()]
    );

    expect([
      lanes.runnable[0].draggable,
      lanes.runnable[0].queue_placeable
    ]).toEqual([false, true]);
  });

  test('refuses placement for a worker-ineligible observation row', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-1', {
              observation: true,
              route: 'spec_backed',
              spec_state: 'published',
              has_description: true,
              awaiting_user: false,
              worker_ineligible: true
            })
          ]
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].queue_placeable).toBe(false);
  });

  test('refuses placement for an ineligible observation row', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-1', {
              observation: true,
              route: 'spec_backed',
              spec_state: 'draft',
              has_description: true,
              awaiting_user: false,
              worker_ineligible: false
            })
          ]
        })
      ],
      [state()]
    );

    expect([
      lanes.runnable[0].draggable,
      lanes.runnable[0].queue_placeable
    ]).toEqual([false, false]);
  });

  test('makes a ready Monitor row draggable and placeable', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-1', {
              route: 'spec_backed',
              spec_state: 'published',
              has_description: false,
              awaiting_user: false,
              worker_ineligible: false
            })
          ]
        })
      ],
      [state()]
    );

    expect([
      lanes.runnable[0].draggable,
      lanes.runnable[0].queue_placeable
    ]).toEqual([true, true]);
  });

  test('keeps an unready Monitor row fixed and unplaceable', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-1', {
              route: 'spec_backed',
              spec_state: 'draft',
              has_description: false,
              awaiting_user: false,
              worker_ineligible: false
            })
          ]
        })
      ],
      [state()]
    );

    expect([
      lanes.runnable[0].draggable,
      lanes.runnable[0].queue_placeable,
      lanes.runnable[0].reason
    ]).toEqual([false, false, '']);
  });

  test('keeps a legacy server row draggable and placeable', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1')] })],
      [state()]
    );

    expect([
      lanes.runnable[0].draggable,
      lanes.runnable[0].queue_placeable
    ]).toEqual([true, true]);
  });

  test('joins the blocked observation before the admission badge', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [runnable('A-1', { blocked_without_ids: true })],
          admission: { 'A-1': { reason: 'not_ready:A-9', at: 1 } }
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].reason).toBe('🔒 blocked · ⛔ not_ready (A-9)');
  });

  test('keeps the admission badge alone when the row carries no reason', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [runnable('A-1')],
          admission: { 'A-1': { reason: 'not_ready', at: 1 } }
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].reason).toBe('⛔ not_ready');
  });

  test('leaves a prerequisite admission without a row reason (UI-0bvr §4.1)', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          admission: {
            'A-1': {
              reason: 'prerequisite_unmet',
              at: 1,
              blockers: [{ id: 'B-2', rig: 'repo-b', status: 'in_progress' }]
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].reason).toBe('');
  });

  test('draws no refusal badge for a prerequisite record without blockers', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_blocked_by: { 'A-1': [] },
          admission: { 'A-1': { reason: 'prerequisite_unmet', at: 1 } }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].reason).toBe('');
  });

  test('keeps only the open admission blockers on the queue row chips', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_blocked_by: { 'A-1': ['A-7'] },
          admission: {
            'A-1': {
              reason: 'prerequisite_unmet',
              at: 1,
              blockers: [
                { id: 'A-7', rig: null, status: 'open' },
                { id: 'B-2', rig: 'repo-b', status: 'in_progress' }
              ]
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].blocked_by).toEqual(['A-7']);
  });

  test('releases an admission blocker the open list no longer carries', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_blocked_by: { 'A-1': ['A-7'] },
          admission: {
            'A-1': {
              reason: 'prerequisite_unmet',
              at: 1,
              blockers: [
                { id: 'A-7', rig: null, status: 'open' },
                { id: 'B-2', rig: 'repo-b', status: 'in_progress' }
              ]
            }
          }
        })
      ],
      [state()]
    );

    expect(
      lanes.queue[0].dependency_chips?.released?.map((chip) => chip.id)
    ).toEqual(['B-2']);
  });

  test('drops the chain badge when the open prerequisite list is empty', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_blocked_by: { 'A-1': [] },
          admission: {
            'A-1': {
              reason: 'prerequisite_unmet',
              at: 1,
              blockers: [{ id: 'A-7', rig: null, status: 'open' }]
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].reason).toBe('');
    expect(
      lanes.queue[0].dependency_chips?.released?.map((chip) => chip.id)
    ).toEqual(['A-7']);
  });

  test('draws no badge for a serial lane head refusal', () => {
    const lanes = buildLanes(
      [
        workspace({
          serial_lanes: [
            { id: 's1', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
          ],
          admission: { 'A-2': { reason: 'serial_lane_not_head', at: 1 } }
        })
      ],
      [state()]
    );

    expect(lanes.queue.find((item) => item.id === 'A-2')?.reason).toBe('');
  });

  test('marks an admitted stale receipt as a re-review, not a refusal', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [runnable('A-1')],
          admission: {
            'A-1': { reason: 'spec_review_stale', at: 1, stale: true }
          }
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].rereview_required).toBe(true);
    expect(lanes.runnable[0].reason).toBe('');
  });

  test('carries the session-preferred advisory onto the candidate row', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-1', {
              session_preferred_reason: 'user_feedback_loop'
            })
          ]
        })
      ],
      [state()]
    );

    expect([
      lanes.runnable[0].session_preferred,
      lanes.runnable[0].session_preferred_reason
    ]).toEqual([true, 'user_feedback_loop']);
  });

  test('carries the 스펙 대기 judgement onto the candidate row', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [runnable('A-1', { spec_after_blocker: true })]
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].spec_after_blocker).toBe(true);
  });

  test('leaves a row without the judgement carrying no spec-after-blocker key', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1')] })],
      [state()]
    );

    expect(Object.hasOwn(lanes.runnable[0], 'spec_after_blocker')).toBe(false);
  });

  test('leaves a row without the advisory carrying no session-preferred key', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1')] })],
      [state()]
    );

    expect(Object.hasOwn(lanes.runnable[0], 'session_preferred')).toBe(false);
  });
});

describe('lane model candidate release chips (UI-d13v §5.3)', () => {
  test('draws every released chip in the window, newest first', () => {
    const now = Date.now();
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-1', {
              release_info: {
                released_by: [
                  { id: 'A-7', closed_at: now - 1000 },
                  { id: 'A-8', closed_at: now - 10 },
                  { id: 'A-9', closed_at: now - 500 }
                ]
              }
            })
          ]
        })
      ],
      [state()]
    );

    const released = lanes.runnable[0].dependency_chips?.released || [];
    expect(released.map((chip) => chip.label)).toEqual([
      '🔓 A-8',
      '🔓 A-9',
      '🔓 A-7'
    ]);
  });

  test('drops a released fact that fell outside the seven day window', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-1', {
              release_info: {
                released_by: [
                  { id: 'A-7', closed_at: Date.now() - 8 * 86400000 }
                ]
              }
            })
          ]
        })
      ],
      [state()]
    );

    expect(lanes.runnable[0].dependency_chips).toBeUndefined();
  });

  test('draws one dependents chip per id the candidate row carries', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-1', {
              dependents_info: { count: 2, ids: ['A-3', 'A-2'] }
            })
          ]
        })
      ],
      [state()]
    );

    expect(
      lanes.runnable[0].dependency_chips?.dependents?.map((chip) => chip.label)
    ).toEqual(['→ A-2', '→ A-3']);
  });

  test('draws the dependents chips on all four lanes (UI-8x90 §4.4)', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          pr_wait: [{ bead_id: 'A-4' }],
          runnable: [runnable('A-3')],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-2',
              status: 'running',
              started_at: 10
            }
          },
          bead_dependents: {
            'A-1': { ids: ['A-8'] },
            'A-2': { ids: ['A-8'] },
            'A-3': { ids: ['A-8'] },
            'A-4': { ids: ['A-8'] }
          }
        })
      ],
      [state()]
    );

    const labels = [
      lanes.queue[0],
      lanes.running[0],
      lanes.runnable[0],
      lanes.pr_wait[0]
    ].map((item) => item.dependency_chips?.dependents?.[0]?.label);

    expect(labels).toEqual(['→ A-8', '→ A-8', '→ A-8', '→ A-8']);
  });

  test('stands the dependents chip on a row with no predecessor', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_blocked_by: { 'A-1': [] },
          bead_dependents: { 'A-1': { ids: ['A-8'] } }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].dependency_chips?.predecessors).toBeUndefined();
    expect(
      lanes.queue[0].dependency_chips?.dependents?.map((chip) => chip.id)
    ).toEqual(['A-8']);
  });

  test('unions the queue decoration with the candidate row material', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [runnable('A-1', { dependents_info: { ids: ['A-9'] } })],
          bead_dependents: { 'A-1': { ids: ['A-8'] } }
        })
      ],
      [state()]
    );

    expect(
      lanes.runnable[0].dependency_chips?.dependents?.map((chip) => chip.id)
    ).toEqual(['A-8', 'A-9']);
  });

  test('keeps the candidate material when the decoration is empty', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [runnable('A-1', { dependents_info: { ids: ['A-9'] } })],
          bead_dependents: { 'A-1': { ids: [] } }
        })
      ],
      [state()]
    );

    expect(
      lanes.runnable[0].dependency_chips?.dependents?.map((chip) => chip.id)
    ).toEqual(['A-9']);
  });

  test('prefers the owner the server named for a follow-up', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_dependents: {
            'A-1': { ids: ['B-9'], root_dirs: { 'B-9': WS_B } }
          }
        })
      ],
      [state()]
    );

    const chip = lanes.queue[0].dependency_chips?.dependents?.[0];
    expect(chip?.openable).toBe(true);
    expect(chip?.root_dir).toBe(WS_B);
  });

  test('gives a same-repo follow-up outside every lane the card own repo', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_dependents: { 'A-1': { ids: ['A-8'] } }
        })
      ],
      [state()]
    );

    const chip = lanes.queue[0].dependency_chips?.dependents?.[0];
    expect(chip?.openable).toBe(true);
    expect(chip?.root_dir).toBe(WS_A);
  });

  test('falls back to the location map for a foreign follow-up', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_dependents: { 'A-1': { ids: ['B-9'] } }
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-9' }]
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })]
    );

    expect(lanes.queue[0].dependency_chips?.dependents?.[0].root_dir).toBe(
      WS_B
    );
  });

  test('leaves a foreign follow-up of unknown owner unopenable', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_dependents: { 'A-1': { ids: ['B-9'] } }
        })
      ],
      [state()]
    );

    expect(
      lanes.queue[0].dependency_chips?.dependents?.[0].openable
    ).toBeUndefined();
  });

  test('gives a same-repo blocker outside every lane the card own repo', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_blocked_by: { 'A-1': ['A-9'] }
        })
      ],
      [state()]
    );

    const chip = lanes.queue[0].dependency_chips?.predecessors?.[0];
    expect(chip?.openable).toBe(true);
    expect(chip?.root_dir).toBe(WS_A);
  });

  test('leaves a foreign blocker of unknown owner unopenable', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_blocked_by: { 'A-1': ['B-9'] }
        })
      ],
      [state()]
    );

    const chip = lanes.queue[0].dependency_chips?.predecessors?.[0];
    expect(chip?.openable).toBeUndefined();
    expect(chip?.root_dir).toBeUndefined();
  });

  test('falls back to the location map for a foreign blocker', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_blocked_by: { 'A-1': ['B-9'] }
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-9' }]
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })]
    );

    expect(lanes.queue[0].dependency_chips?.predecessors?.[0].root_dir).toBe(
      WS_B
    );
  });

  test('draws no dependents chip without the queue decoration', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1' }] })],
      [state()]
    );

    expect(lanes.queue[0].dependency_chips).toBeUndefined();
  });

  test('draws no release chips when the row carries no material', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [runnable('A-1')] })],
      [state()]
    );

    expect(lanes.runnable[0].dependency_chips).toBeUndefined();
  });

  test('carries the card own repo on a same-repo release chip', () => {
    const now = Date.now();
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-1', {
              release_info: {
                released_by: [{ id: 'A-9', closed_at: now - 1000 }]
              }
            })
          ]
        })
      ],
      [state()]
    );

    const chip = lanes.runnable[0].dependency_chips?.released?.[0];
    expect(chip?.openable).toBe(true);
    expect(chip?.root_dir).toBe(WS_A);
  });

  test('keeps the released chips when a predecessor chip is added', () => {
    const now = Date.now();
    const lanes = buildLanes(
      [
        workspace({
          bead_blocked_by: { 'A-1': ['A-9'] },
          runnable: [
            runnable('A-1', {
              blocked: true,
              blocked_by: ['A-9'],
              release_info: {
                released_by: [{ id: 'A-7', closed_at: now - 10 }]
              }
            })
          ]
        })
      ],
      [state()]
    );

    const chips = lanes.runnable[0].dependency_chips;
    expect([chips?.released?.length, chips?.predecessors?.length]).toEqual([
      1, 1
    ]);
  });
});

describe('lane model bead overlay (UI-4tud §4.1)', () => {
  /**
   * @returns {Record<string, any>}
   */
  function overlayWorkspace() {
    return workspace({
      queue: [{ bead_id: 'A-2' }],
      serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-3' }] }],
      serial_lane_count: 1,
      pr_wait: [{ bead_id: 'A-4' }],
      done: [{ bead_id: 'A-6', added_at: 5 }],
      runnable: [runnable('A-5')],
      attempts: {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'running',
          started_at: 1
        }
      },
      bead_overlay: {
        'A-1': { priority: 0, from_id: 'A-100' },
        'A-2': {
          priority: 1,
          from_id: 'A-100',
          worker_created_from: 'SRC',
          worker_created_from_root_dir: '/repo/source'
        },
        'A-3': { priority: 2, from_id: 'A-100' },
        'A-4': {
          priority: 3,
          from_id: 'A-100',
          worker_created_from: 'SRC',
          worker_created_from_root_dir: '/repo/source'
        },
        'A-5': { priority: 4, from_id: 'A-100' },
        'A-6': {
          priority: 1,
          from_id: 'A-100',
          worker_created_from: 'SRC',
          worker_created_from_root_dir: '/repo/source'
        }
      }
    });
  }

  test('overlays priority and origin on every lane row', () => {
    const lanes = buildLanes([overlayWorkspace()], [state()]);

    const rows = [
      ...lanes.runnable,
      ...lanes.queue,
      ...lanes.running,
      ...lanes.pr_wait,
      ...lanes.done
    ];
    expect(
      rows.map((row) => [row.id, row.priority, row.from_id]).sort()
    ).toEqual(
      [
        ['A-1', 0, 'A-100'],
        ['A-2', 1, 'A-100'],
        ['A-3', 2, 'A-100'],
        ['A-4', 3, 'A-100'],
        ['A-5', 4, 'A-100'],
        ['A-6', 1, 'A-100']
      ].sort()
    );
  });

  test('preserves creation provenance on noncandidate and done rows', () => {
    const lanes = buildLanes([overlayWorkspace()], [state()]);

    expect([lanes.queue[0], lanes.pr_wait[0], lanes.done[0]]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          worker_created_from: 'SRC',
          worker_created_from_root_dir: '/repo/source'
        })
      ])
    );
    for (const row of [lanes.queue[0], lanes.pr_wait[0], lanes.done[0]]) {
      expect(row.worker_created_from).toBe('SRC');
      expect(row.worker_created_from_root_dir).toBe('/repo/source');
    }
  });

  test('overlays the carryover successors on the done row (UI-btj6 §3)', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-6', added_at: 5 }],
          bead_overlay: { 'A-6': { carried_to: ['A-7', 'A-8'] } }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].carried_to).toEqual(['A-7', 'A-8']);
  });

  test('omits the carryover successors on a row outside the done lane', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_overlay: { 'A-2': { carried_to: ['A-7'] } }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].carried_to).toBeUndefined();
  });

  test('leaves a bead without an overlay key unchanged', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_overlay: { 'A-9': { priority: 0, from_id: 'A-100' } }
        })
      ],
      [state()]
    );

    expect([lanes.queue[0].priority, lanes.queue[0].from_id]).toEqual([
      undefined,
      undefined
    ]);
  });

  test('derives the rec chip from the overlay metadata', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_overlay: {
            'A-2': {
              metadata: {
                rec_orchestration_model: 'fable',
                rec_reason: 'cross_file'
              }
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].rec?.rec).toEqual({ orchestration_model: 'fable' });
  });

  test('derives the waiting row exec chips from the overlay metadata', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_overlay: { 'A-2': { metadata: {} } }
        })
      ],
      [
        state({
          execution_defaults: EXECUTION_DEFAULTS,
          runner_catalog: { runtimes: {} },
          session_defaults: {}
        })
      ]
    );

    expect(lanes.queue[0].exec_chips?.orchestration?.text).toBe(
      'claude-sonnet'
    );
  });

  test('prefers the quick_fix orchestration value on a quick_fix bead', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_overlay: { 'A-2': { metadata: { route: 'quick_fix' } } }
        })
      ],
      [
        state({
          execution_defaults: EXECUTION_DEFAULTS,
          runner_catalog: { runtimes: {} },
          session_defaults: {},
          orchestration_model: 'sonnet',
          quick_fix_orchestration_model: 'opus'
        })
      ]
    );

    expect(lanes.queue[0].exec_chips?.orchestration?.text).toBe(
      'opus (quick_fix)'
    );
  });

  test('leaves a general bead on the general orchestration value', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_overlay: { 'A-2': { metadata: { route: 'spec_backed' } } }
        })
      ],
      [
        state({
          execution_defaults: EXECUTION_DEFAULTS,
          runner_catalog: { runtimes: {} },
          session_defaults: {},
          orchestration_model: 'sonnet',
          quick_fix_orchestration_model: 'opus'
        })
      ]
    );

    expect(lanes.queue[0].exec_chips?.orchestration?.text).toBe('sonnet');
  });

  test('resolves the running tile worker chip against the attempt runner', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 1,
              runner: 'codex',
              model: 'sonnet'
            }
          },
          bead_overlay: { 'A-1': { metadata: {} } }
        })
      ],
      [
        state({
          execution_defaults: ROUTED_EXECUTION_DEFAULTS,
          runner_catalog: { runtimes: {} },
          session_defaults: {}
        })
      ]
    );

    expect(lanes.running[0].exec_chips?.worker?.text).toBe(
      'inherit→codex · auto · auto'
    );
  });

  test('resolves the running tile worker chip against the pinned route', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 1,
              runner: 'codex'
            }
          },
          bead_overlay: { 'A-1': { metadata: {}, route: 'quick_fix' } }
        })
      ],
      [
        state({
          execution_defaults: ROUTED_EXECUTION_DEFAULTS,
          runner_catalog: { runtimes: {} },
          session_defaults: {}
        })
      ]
    );

    expect(lanes.running[0].exec_chips?.worker?.text).toBe('메인');
  });

  test('leaves the running tile worker chip null without overlay metadata', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: 1,
              runner: 'codex'
            }
          },
          bead_overlay: { 'A-1': { priority: 1 } }
        })
      ],
      [
        state({
          execution_defaults: ROUTED_EXECUTION_DEFAULTS,
          runner_catalog: { runtimes: {} },
          session_defaults: {}
        })
      ]
    );

    expect(lanes.running[0].exec_chips?.worker).toBeNull();
  });

  test('resolves the exec chips against the route the overlay names', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_overlay: { 'A-2': { metadata: {}, route: 'quick_fix' } }
        })
      ],
      [
        state({
          execution_defaults: ROUTED_EXECUTION_DEFAULTS,
          runner_catalog: { runtimes: {} },
          session_defaults: {}
        })
      ]
    );

    expect(lanes.queue[0].exec_chips?.worker?.text).toBe('메인');
  });

  test('falls back to no route when the overlay names none', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_overlay: { 'A-2': { metadata: {} } }
        })
      ],
      [
        state({
          execution_defaults: ROUTED_EXECUTION_DEFAULTS,
          runner_catalog: { runtimes: {} },
          session_defaults: {}
        })
      ]
    );

    expect(lanes.queue[0].exec_chips?.worker?.text).not.toBe('메인');
  });

  test('reads the repo execution defaults from the workspaces_state row', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_overlay: { 'A-2': { metadata: {} } }
        })
      ],
      [state({ runner_catalog: { runtimes: {} }, session_defaults: {} })]
    );

    expect(lanes.queue[0].exec_chips).toBeUndefined();
  });
});

describe('lane model as_given candidate order (UI-4tud §4.3)', () => {
  test('keeps the input order and draws no repo sections', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-3', { updated_at: 1 }),
            runnable('A-1', { updated_at: 300 }),
            runnable('A-2', { updated_at: 200 })
          ]
        })
      ],
      [state()],
      { candidate_sort: 'as_given' }
    );

    expect([
      lanes.runnable.map((row) => row.id),
      lanes.runnable_sections,
      lanes.runnable_flat
    ]).toEqual([['A-3', 'A-1', 'A-2'], [], true]);
  });

  test('still applies the display filter to the given order', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            runnable('A-3', { blocked: true }),
            runnable('A-1'),
            runnable('A-2')
          ]
        })
      ],
      [state()],
      {
        candidate_sort: 'as_given',
        candidate_filter: { show_blocked: false, readiness: 'all', routes: [] }
      }
    );

    expect(lanes.runnable.map((row) => row.id)).toEqual(['A-1', 'A-2']);
  });
});

describe('quick_fix 착지 재개 자격 (UI-8h1x §3.3b)', () => {
  test.each([undefined, 'route_changed:quick_fix→spec_backed'])(
    'preserves resume eligibility with diagnostic %s',
    (resume_refused) => {
      const attempts = {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'failed',
          session_id: 'sid',
          cause: 'no_pr',
          resume_refused
        }
      };

      const tile = activeByBead(attempts, new Map()).get('A-1');

      expect(tile?.can_resume).toBe(true);
      expect(tile?.failure?.resume_eligible).toBe(true);
      if (resume_refused) {
        expect(tile?.failure?.resume_refused_sentence).toBe(
          '승인된 작업 방식이 quick_fix에서 spec_backed로 바뀌어 이전 세션을 이어갈 수 없습니다. [폐기] 뒤 후보에서 대기열에 다시 배치하면 현재 방식으로 새로 시작됩니다.'
        );
      } else {
        expect(tile?.failure).not.toHaveProperty('resume_refused_sentence');
      }
    }
  );

  /**
   * One failed quick_fix landing attempt that never recorded a session id.
   *
   * @param {string} reason
   */
  function sessionlessLandingFailure(reason) {
    return {
      t1: {
        attempt_id: 't1',
        bead_id: 'A-1',
        status: 'failed',
        finished_at: 123,
        cause: `quickfix_landing_failed:${reason}`,
        quickfix_lane: true,
        quickfix_landing: {
          cursor: 'base_containment',
          head_sha: 'a'.repeat(40),
          reason
        }
      }
    };
  }

  test('resumes a settlement-natured failure that carries no session id', () => {
    const map = activeByBead(
      sessionlessLandingFailure('containment_unobservable'),
      new Map()
    );

    expect(map.get('A-1')?.failure?.resume_eligible).toBe(true);
    expect(map.get('A-1')?.failure?.resume_reason).toBeNull();
  });

  test('refuses a session-natured failure that carries no session id', () => {
    const map = activeByBead(
      sessionlessLandingFailure('push_not_contained'),
      new Map()
    );

    expect(map.get('A-1')?.failure?.resume_eligible).toBe(false);
    expect(map.get('A-1')?.failure?.resume_reason).toBe(
      'session_id 없는 구 attempt — 이어하기 불가'
    );
  });

  test('keeps refusing an already-resumed settlement failure', () => {
    const attempts = sessionlessLandingFailure('containment_unobservable');

    const map = activeByBead(
      {
        ...attempts,
        t2: {
          attempt_id: 't2',
          bead_id: 'A-1',
          status: 'failed',
          finished_at: 456,
          resumed_from: 't1'
        }
      },
      new Map()
    );

    expect(map.get('A-1')?.failure?.attempt_id).toBe('t2');
    expect(map.get('A-1')?.failure?.resume_eligible).toBe(false);
  });

  test('leaves an ordinary failure without a landing record on the session rule', () => {
    const map = activeByBead(
      {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'failed',
          finished_at: 123,
          cause: 'session_failed:is_error'
        }
      },
      new Map()
    );

    expect(map.get('A-1')?.failure?.resume_eligible).toBe(false);
    expect(map.get('A-1')?.failure?.resume_reason).toBe(
      'session_id 없는 구 attempt — 이어하기 불가'
    );
  });
});

/**
 * One workspace carrying exactly one item of every lane kind the Worker search
 * tags (UI-6g3t §7): 후보 · 병렬 · 직렬 · 실행중 · 세션 · PR 대기 · 완료.
 *
 * @returns {Record<string, any>}
 */
function everyLaneWorkspace() {
  return workspace({
    runnable: [runnable('CAND-1')],
    queue: [{ bead_id: 'PAR-1' }],
    serial_lanes: [{ id: 's1', entries: [{ bead_id: 'SER-1' }] }],
    session_active: [{ bead_id: 'SES-1', title: 'title SES-1' }],
    pr_wait: [{ bead_id: 'PR-1' }],
    done: [{ bead_id: 'DONE-1', added_at: 1 }],
    attempts: {
      t1: {
        attempt_id: 't1',
        bead_id: 'RUN-1',
        status: 'running',
        started_at: 10
      }
    },
    bead_titles: {
      'PAR-1': 'title PAR-1',
      'SER-1': 'title SER-1',
      'RUN-1': 'title RUN-1',
      'PR-1': 'title PR-1',
      'DONE-1': 'title DONE-1'
    }
  });
}

/**
 * The search verdict of every lane kind, keyed by bead id.
 *
 * @param {Record<string, any>} lanes
 * @returns {Record<string, any>}
 */
function searchVerdicts(lanes) {
  return Object.fromEntries(
    [
      lanes.runnable[0],
      lanes.queue_groups[0].sublanes.parallel[0],
      lanes.queue_groups[0].sublanes.serial[0].items[0],
      ...lanes.running,
      lanes.pr_wait[0],
      lanes.done[0]
    ].map((/** @type {any} */ item) => [item.id, item.search_match])
  );
}

describe('워커 탭 검색 태깅 (UI-6g3t §7)', () => {
  test('tags every lane kind with the search verdict', () => {
    const lanes = buildLanes([everyLaneWorkspace()], [state()], {
      search: 'ser-1'
    });

    expect(searchVerdicts(lanes)).toEqual({
      'CAND-1': false,
      'PAR-1': false,
      'SER-1': true,
      'RUN-1': false,
      'SES-1': false,
      'PR-1': false,
      'DONE-1': false
    });
  });

  test('matches a title as well as an id, case-insensitively', () => {
    const lanes = buildLanes([everyLaneWorkspace()], [state()], {
      search: '  TITLE Par  '
    });

    expect(lanes.queue_groups[0].sublanes.parallel[0].search_match).toBe(true);
  });

  test('tags the candidate section copies the renderer draws', () => {
    const lanes = buildLanes([everyLaneWorkspace()], [state()], {
      search: 'cand'
    });

    expect(lanes.runnable_sections[0].items[0].search_match).toBe(true);
  });

  test('sets no search key for a blank query', () => {
    const lanes = buildLanes([everyLaneWorkspace()], [state()], {
      search: '   '
    });

    expect(Object.hasOwn(lanes.runnable[0], 'search_match')).toBe(false);
  });

  test('sets no search key when no search option is given', () => {
    const lanes = buildLanes([everyLaneWorkspace()], [state()]);

    const untagged = [
      lanes.runnable[0],
      lanes.queue_groups[0].sublanes.parallel[0],
      lanes.queue_groups[0].sublanes.serial[0].items[0],
      ...lanes.running,
      lanes.pr_wait[0],
      lanes.done[0]
    ].every((/** @type {any} */ item) => !Object.hasOwn(item, 'search_match'));

    expect(untagged).toBe(true);
  });

  test('tags a serial lane occupant ghost with the search verdict', () => {
    const lanes = buildLanes(
      [
        workspace({
          bead_titles: { 'OCC-1': '점유 중인 작업', 'SER-1': 'title SER-1' },
          serial_lanes: [
            {
              id: 's1',
              entries: [{ bead_id: 'OCC-1' }, { bead_id: 'SER-1' }]
            }
          ],
          lane_states: { s1: { occupied_by: ['OCC-1'] } },
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'OCC-1',
              status: 'paused',
              started_at: 10
            }
          }
        })
      ],
      [state()],
      { search: 'occ' }
    );

    const lane = lanes.queue_groups[0].sublanes.serial[0];
    expect([
      lane.occupants[0].search_match,
      lane.items[0].search_match
    ]).toEqual([true, false]);
  });

  test('leaves lane membership and order unchanged while searching', () => {
    const plain = buildLanes([everyLaneWorkspace()], [state()]);

    const searched = buildLanes([everyLaneWorkspace()], [state()], {
      search: 'ser'
    });

    expect([
      searched.runnable.map((/** @type {any} */ i) => i.id),
      searched.queue.map((/** @type {any} */ i) => i.id),
      searched.running.map((/** @type {any} */ i) => i.id),
      searched.pr_wait.map((/** @type {any} */ i) => i.id),
      searched.done.map((/** @type {any} */ i) => i.id)
    ]).toEqual([
      plain.runnable.map((/** @type {any} */ i) => i.id),
      plain.queue.map((/** @type {any} */ i) => i.id),
      plain.running.map((/** @type {any} */ i) => i.id),
      plain.pr_wait.map((/** @type {any} */ i) => i.id),
      plain.done.map((/** @type {any} */ i) => i.id)
    ]);
  });
});

describe('candidate route filter (UI-q1tg §3.2)', () => {
  const repo = () =>
    workspace({
      runnable: [
        runnable('A-1', { workflow: { route: 'quick_fix' } }),
        runnable('A-2', { workflow: { route: 'spec_backed' } }),
        runnable('A-3', { workflow: { route: 'full_plan' } }),
        runnable('A-4', {
          workflow: { route: 'quick_fix', route_source: 'derived' }
        }),
        runnable('A-5')
      ]
    });

  /**
   * @param {string[]} routes
   */
  const filtered = (routes) =>
    buildLanes([repo()], [state()], {
      candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, routes }
    });

  test('shows every candidate when no route is selected', () => {
    const lanes = filtered([]);

    expect(lanes.runnable.map((r) => r.id).sort()).toEqual([
      'A-1',
      'A-2',
      'A-3',
      'A-4',
      'A-5'
    ]);
  });

  test('hides candidates outside the one selected route', () => {
    const lanes = filtered(['quick_fix']);

    expect(lanes.runnable.map((r) => r.id)).toEqual(['A-1']);
  });

  test('keeps candidates from every selected route', () => {
    const lanes = filtered(['quick_fix', 'full_plan']);

    expect(lanes.runnable.map((r) => r.id).sort()).toEqual(['A-1', 'A-3']);
  });

  test('catches a derived route with the unset value', () => {
    const lanes = filtered(['unset']);

    expect(lanes.runnable.map((r) => r.id).sort()).toEqual(['A-4', 'A-5']);
  });

  test('counts the rows the route filter alone hid', () => {
    const lanes = filtered(['spec_backed']);

    expect(lanes.runnable_hidden.route).toBe(4);
  });

  test('counts a route-hidden row per control under per_control', () => {
    const lanes = filtered(['spec_backed']);

    expect(lanes.runnable_hidden).toMatchObject({
      blocked: 0,
      readiness: 0,
      route: 4
    });
  });

  test('ignores an unknown stored route value', () => {
    const lanes = filtered(['not_a_route']);

    expect(lanes.runnable.map((r) => r.id).sort()).toEqual([
      'A-1',
      'A-2',
      'A-3',
      'A-4',
      'A-5'
    ]);
  });
});

describe('완료 행 실행 사실 (UI-q1tg §3.4)', () => {
  const IMPL_ATTEMPT = {
    t1: {
      attempt_id: 't1',
      bead_id: 'A-1',
      status: 'done',
      finished_at: 20,
      runner: 'codex',
      model: 'sonnet'
    }
  };

  test('derives the done row exec chips from the last implementation attempt', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 30 }],
          attempts: IMPL_ATTEMPT
        })
      ],
      [state()]
    );

    expect(lanes.done[0].exec_chips?.orchestration?.text).toBe(
      'codex · sonnet'
    );
  });

  test('keeps the done row exec chips when the pin changes after the run', () => {
    const done_row = (/** @type {Record<string, any>} */ overlay) =>
      buildLanes(
        [
          workspace({
            done: [{ bead_id: 'A-1', added_at: 30 }],
            attempts: IMPL_ATTEMPT,
            bead_overlay: overlay
          })
        ],
        [
          state({
            execution_defaults: EXECUTION_DEFAULTS,
            runner_catalog: { runtimes: {} },
            session_defaults: {}
          })
        ]
      ).done[0];

    const before = done_row({});
    const after = done_row({
      'A-1': { metadata: { orchestration_model: 'opus' } }
    });

    expect(after.exec_chips?.orchestration?.text).toBe(
      before.exec_chips?.orchestration?.text
    );
  });

  test('draws no done row exec chips when the attempt record is gone', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 30 }],
          bead_overlay: { 'A-1': { metadata: { orchestration_model: 'opus' } } }
        })
      ],
      [
        state({
          execution_defaults: EXECUTION_DEFAULTS,
          runner_catalog: { runtimes: {} },
          session_defaults: {}
        })
      ]
    );

    expect(lanes.done[0].exec_chips).toBeUndefined();
  });

  test('derives the done worker chip from the attempt impl_actor', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 30 }],
          attempts: {
            t1: {
              ...IMPL_ATTEMPT.t1,
              impl_actor: {
                kind: 'delegated',
                model: 'gpt-5-codex',
                effort: 'high',
                label: 'gpt-5-codex/high'
              }
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].exec_chips?.worker?.text).toBe('gpt-5-codex · high');
  });

  test('keeps the done worker chip when the current pin names another model', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 30 }],
          attempts: {
            t1: {
              ...IMPL_ATTEMPT.t1,
              impl_actor: {
                kind: 'delegated',
                model: 'gpt-5-codex',
                effort: 'high',
                label: 'gpt-5-codex/high'
              }
            }
          },
          bead_overlay: {
            'A-1': { metadata: { impl_model: 'opus', impl_effort: 'low' } }
          }
        })
      ],
      [
        state({
          execution_defaults: EXECUTION_DEFAULTS,
          runner_catalog: { runtimes: {} },
          session_defaults: {}
        })
      ]
    );

    expect(lanes.done[0].exec_chips?.worker?.text).toBe('gpt-5-codex · high');
  });

  test('shows the direct implementation as the main worker chip', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 30 }],
          attempts: {
            t1: {
              ...IMPL_ATTEMPT.t1,
              impl_actor: {
                kind: 'main',
                model: null,
                effort: null,
                label: 'main'
              }
            }
          }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].exec_chips?.worker?.text).toBe('메인');
  });

  test('omits the done worker chip when the attempt carries no impl_actor', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 30 }],
          attempts: IMPL_ATTEMPT,
          bead_overlay: {
            'A-1': { metadata: { impl_model: 'opus', impl_effort: 'low' } }
          }
        })
      ],
      [
        state({
          execution_defaults: EXECUTION_DEFAULTS,
          runner_catalog: { runtimes: {} },
          session_defaults: {}
        })
      ]
    );

    expect(lanes.done[0].exec_chips?.worker).toBeNull();
  });

  test('carries the done row route from the workflow projection', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 30 }],
          bead_workflow: { 'A-1': { route: 'spec_backed' } }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].workflow?.route).toBe('spec_backed');
  });

  test('carries the done row route from the monitor overlay', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: 30 }],
          bead_overlay: { 'A-1': { route: 'full_plan' } }
        })
      ],
      [state()]
    );

    expect(lanes.done[0].workflow?.route).toBe('full_plan');
  });
});

describe('대기 진입 유예 재료 (UI-q1tg §3.3·§3.5)', () => {
  test('carries the queue entry added_at onto a waiting row', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1', added_at: 1000 }] })],
      [state()]
    );

    expect(lanes.queue[0].added_at).toBe(1000);
  });

  test('draws no admission badge for a grace refusal', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1', added_at: 1000 }],
          admission: { 'A-1': { reason: 'grace_period' } }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].reason).toBe('');
  });

  test('fills a waiting row route from the monitor overlay', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1', added_at: 1000 }],
          bead_overlay: { 'A-1': { route: 'quick_fix' } }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].workflow?.route).toBe('quick_fix');
  });

  test('classifies route the one way the chip and the filter share', () => {
    const values = [
      routeChipValue(null),
      routeChipValue({ chips: {} }),
      routeChipValue({
        chips: { route: 'quick_fix', route_source: 'derived' }
      }),
      routeChipValue({
        chips: { route: 'quick_fix', route_source: 'explicit' }
      })
    ];

    expect(values).toEqual([null, 'unset', 'unset', 'quick_fix']);
  });
});

// 게이트 투영 (UI-01wh §3.1). 막힌 대기 행이 정지·보류를 말하는 유일한 자리이므로
// "어느 행이 막힌 행인가"의 판정이 이 블록의 주제다.
describe('waiting row gate projection (UI-01wh §3.1)', () => {
  const GATE_CATALOG = {
    runners: {
      claude: {
        command: 'claude',
        models: { sonnet: { id: 'claude-sonnet' } }
      },
      codex: { command: 'codex', models: { sol: { id: 'gpt-sol' } } }
    }
  };

  /**
   * @param {Partial<Record<string, any>>} [patch]
   */
  function gateState(patch = {}) {
    return state({
      execution_defaults: EXECUTION_DEFAULTS,
      runner_catalog: GATE_CATALOG,
      session_defaults: {},
      ...patch
    });
  }

  /**
   * @param {string[]} ids
   */
  function overlays(ids) {
    /** @type {Record<string, any>} */
    const out = {};
    for (const id of ids) {
      out[id] = { metadata: {} };
    }
    return out;
  }

  const SYSTEMIC = {
    kind: 'systemic',
    cause: 'loud_fail_blocker',
    since: 5000,
    bead_ids: ['A-1'],
    halted_by_attempt_id: 't9'
  };

  test('ignores a retired queue hold on every parallel and serial row', () => {
    const lanes = buildLanes(
      [
        workspace({
          hold: SYSTEMIC,
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          serial_lanes: [
            { id: 's1', entries: [{ bead_id: 'A-3' }, { bead_id: 'A-4' }] }
          ]
        })
      ],
      [gateState()]
    );

    const by_id = new Map(lanes.queue.map((row) => [row.id, row.gate]));
    expect([
      by_id.get('A-1')?.kind,
      by_id.get('A-1')?.since,
      by_id.get('A-2')?.kind,
      by_id.get('A-3')?.kind,
      by_id.get('A-4')
    ]).toEqual([undefined, undefined, undefined, undefined, undefined]);
  });

  test('draws no gate anywhere when a hold stands with no waiting row', () => {
    const lanes = buildLanes(
      [workspace({ hold: SYSTEMIC, runnable: [runnable('A-9')] })],
      [gateState()]
    );

    expect([
      lanes.queue.length,
      lanes.runnable.some((row) => row.gate !== undefined)
    ]).toEqual([0, false]);
  });

  test('gates only the rows whose resolved runner carries the outage target', () => {
    const outage_hold = {
      claude: {
        since: 1,
        generation: 1,
        targets: [
          {
            kind: 'outage',
            model: 'sonnet',
            account: null,
            next_probe_at: 9000
          }
        ]
      }
    };
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          provider_hold: outage_hold,
          bead_overlay: {
            'A-1': { metadata: {} },
            'A-2': { metadata: { orchestration_model: 'sol' } }
          }
        })
      ],
      [gateState()]
    );

    expect([
      lanes.queue[0].gate?.kind,
      lanes.queue[0].gate?.next_at,
      lanes.queue[1].gate
    ]).toEqual(['provider_outage', 9000, undefined]);
  });

  // RED 16 (spec §5)
  test('carries the provider hold since and its resolved runner on the gate', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          provider_hold: {
            claude: {
              since: 4242,
              generation: 1,
              targets: [
                {
                  kind: 'outage',
                  model: 'sonnet',
                  account: null,
                  next_probe_at: 9000
                }
              ]
            }
          },
          bead_overlay: { 'A-1': { metadata: {} } }
        })
      ],
      [gateState()]
    );

    expect([lanes.queue[0].gate?.since, lanes.queue[0].gate?.runner]).toEqual([
      4242,
      'claude'
    ]);
  });

  // RED 17 (spec §5)
  test('marks a runner with a probeable target as probe ready', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          provider_hold: {
            claude: {
              since: 4242,
              generation: 1,
              targets: [
                {
                  kind: 'outage',
                  model: 'sonnet',
                  account: null,
                  next_probe_at: 9000
                }
              ]
            }
          },
          bead_overlay: { 'A-1': { metadata: {} } }
        })
      ],
      [gateState()]
    );

    expect(lanes.queue[0].gate?.probe_ready).toBe(true);
  });

  test('draws no provider gate without a runner catalog to resolve', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_overlay: overlays(['A-1']),
          provider_hold: {
            claude: {
              since: 1,
              generation: 1,
              targets: [{ kind: 'outage', model: 'sonnet', account: null }]
            }
          }
        })
      ],
      [gateState({ runner_catalog: null })]
    );

    expect(lanes.queue[0].gate).toBeUndefined();
  });

  test('gates the whole runner on a usage_limit target with no account', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_overlay: overlays(['A-1']),
          provider_hold: {
            claude: {
              since: 1,
              generation: 1,
              targets: [
                {
                  kind: 'usage_limit',
                  model: 'sonnet',
                  account: null,
                  resets_at: 7000
                }
              ]
            }
          }
        })
      ],
      [gateState()]
    );

    expect([lanes.queue[0].gate?.kind, lanes.queue[0].gate?.next_at]).toEqual([
      'provider_usage',
      7000
    ]);
  });

  test('gates a usage_limit account only on the row that resolves to it', () => {
    const limit_hold = {
      claude: {
        since: 1,
        generation: 1,
        targets: [
          {
            kind: 'usage_limit',
            model: 'sonnet',
            account: 'a@example.com',
            resets_at: 7000
          }
        ]
      }
    };
    const account_catalog = {
      claude: [
        { email: 'a@example.com', alias: '업무', active: false },
        { email: 'b@example.com', alias: '개인', active: true }
      ]
    };
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          provider_hold: limit_hold,
          account_catalog,
          bead_overlay: {
            'A-1': { metadata: { claude_account: 'a@example.com' } },
            'A-2': { metadata: { claude_account: 'b@example.com' } }
          }
        })
      ],
      [gateState()]
    );

    expect([lanes.queue[0].gate?.kind, lanes.queue[1].gate]).toEqual([
      'provider_usage',
      undefined
    ]);
  });

  test('resolves the row account from the workspace default before the active login', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_overlay: overlays(['A-1']),
          workspace_account_defaults: { claude_account: 'repo@example.com' },
          account_catalog: {
            claude: [
              { email: 'repo@example.com', alias: '저장소', active: false },
              { email: 'active@example.com', alias: '로그인', active: true }
            ]
          },
          provider_hold: {
            claude: {
              since: 1,
              generation: 1,
              targets: [
                {
                  kind: 'usage_limit',
                  model: 'sonnet',
                  account: 'repo@example.com',
                  resets_at: 7000
                }
              ]
            }
          }
        })
      ],
      [gateState()]
    );

    expect([lanes.queue[0].gate?.kind, lanes.queue[0].gate?.next_at]).toEqual([
      'provider_usage',
      7000
    ]);
  });

  test('draws no usage gate when the row account cannot be resolved', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_overlay: overlays(['A-1']),
          provider_hold: {
            claude: {
              since: 1,
              generation: 1,
              targets: [
                {
                  kind: 'usage_limit',
                  model: 'sonnet',
                  account: 'a@example.com',
                  resets_at: 7000
                }
              ]
            }
          }
        })
      ],
      [gateState()]
    );

    expect(lanes.queue[0].gate).toBeUndefined();
  });

  test('keeps the queue gate on the chip and appends the provider reason', () => {
    const lanes = buildLanes(
      [
        workspace({
          hold: SYSTEMIC,
          queue: [{ bead_id: 'A-1' }],
          bead_overlay: overlays(['A-1']),
          provider_hold: {
            claude: {
              since: 1,
              generation: 1,
              targets: [
                {
                  kind: 'outage',
                  model: 'sonnet',
                  account: null,
                  next_probe_at: 9000
                }
              ]
            }
          }
        })
      ],
      [gateState()]
    );

    const gate = lanes.queue[0].gate;
    expect(gate?.kind).toBe('provider_outage');
  });

  test('skips the provider judgment until the row metadata was observed', () => {
    const outage_hold = {
      claude: {
        since: 1,
        generation: 1,
        targets: [
          {
            kind: 'outage',
            model: 'sonnet',
            account: null,
            next_probe_at: 9000
          }
        ]
      }
    };

    const lanes = buildLanes(
      [
        workspace({
          hold: SYSTEMIC,
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          provider_hold: outage_hold,
          // A-1: 오버레이 없음, A-2: 오버레이는 있으나 metadata 키 없음
          bead_overlay: { 'A-2': { route: 'spec_backed' } }
        })
      ],
      [gateState()]
    );

    expect(
      lanes.queue.map((item) => [
        item.gate?.kind,
        item.gate?.lines.some((line) => line.startsWith('공급자:')) === true
      ])
    ).toEqual([
      [undefined, false],
      [undefined, false]
    ]);
  });

  test('opens the provider popup with the chip sentence and the hold start', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_overlay: overlays(['A-1']),
          provider_hold: {
            claude: {
              since: 1_800_000_000_000,
              generation: 1,
              targets: [
                {
                  kind: 'outage',
                  model: 'sonnet',
                  account: null,
                  next_probe_at: 9000
                }
              ]
            }
          }
        })
      ],
      [gateState()]
    );

    const gate = lanes.queue[0].gate;
    expect([
      gate?.lines[0] === gate?.title,
      gate?.lines[0] === gate?.label,
      gate?.lines[1]?.startsWith('시작 ')
    ]).toEqual([true, true, true]);
  });

  test('resolves a codex row account by the active durable key', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          account_catalog: {
            codex: [
              { key: 'acct-1', email: 'one@example.com', active: true },
              { key: 'acct-2', email: 'two@example.com', active: false }
            ]
          },
          provider_hold: {
            codex: {
              since: 1,
              generation: 1,
              targets: [
                {
                  kind: 'usage_limit',
                  model: 'sol',
                  account: 'acct-1',
                  resets_at: 7000
                }
              ]
            }
          },
          bead_overlay: {
            'A-1': { metadata: { orchestration_model: 'sol' } },
            'A-2': {
              metadata: { orchestration_model: 'sol', codex_account: 'acct-2' }
            }
          }
        })
      ],
      [gateState()]
    );

    expect([lanes.queue[0].gate?.kind, lanes.queue[1].gate]).toEqual([
      'provider_usage',
      undefined
    ]);
  });

  // 서버 판정이 기록으로 오면 그것이 칩의 재료이고 자체 판정은 예측으로 내려간다
  // (UI-1l3a §3.3). 두 층이 어긋나는 행이 이 블록의 주제다.
  describe('서버 기록으로 선 공급자 게이트 (UI-1l3a §3.3)', () => {
    const LIMIT_HOLD = {
      claude: {
        since: 4242,
        generation: 1,
        targets: [
          {
            kind: 'usage_limit',
            model: 'sonnet',
            account: 'a@example.com',
            resets_at: 7000
          }
        ]
      }
    };

    /**
     * @param {Partial<Record<string, any>>} [patch]
     * @returns {Record<string, any>}
     */
    function admission(patch = {}) {
      return {
        'A-1': {
          reason: 'provider_gate',
          at: 5000,
          gate: {
            runner: 'claude',
            kind: 'usage_limit',
            account: null,
            unresolved: true,
            ...patch
          }
        }
      };
    }

    test('draws the recorded gate as a chip without a slot 1 badge', () => {
      const lanes = buildLanes(
        [
          workspace({
            queue: [{ bead_id: 'A-1' }],
            bead_overlay: overlays(['A-1']),
            provider_hold: LIMIT_HOLD,
            admission: admission()
          })
        ],
        [gateState()]
      );

      expect([lanes.queue[0].reason, lanes.queue[0].gate?.kind]).toEqual([
        '',
        'provider_usage'
      ]);
    });

    test('keeps the recorded gate where the row resolves no account of its own', () => {
      const lanes = buildLanes(
        [
          workspace({
            queue: [{ bead_id: 'A-1' }],
            bead_overlay: overlays(['A-1']),
            provider_hold: LIMIT_HOLD,
            admission: admission()
          })
        ],
        [gateState()]
      );

      const gate = lanes.queue[0].gate;
      expect([
        gate?.probe_ready,
        gate?.lines.some((line) => line.startsWith('계정: 미해석'))
      ]).toEqual([true, true]);
    });

    test('draws the recorded outage gate on a target that kept its account', () => {
      const lanes = buildLanes(
        [
          workspace({
            queue: [{ bead_id: 'A-1' }],
            bead_overlay: overlays(['A-1']),
            provider_hold: {
              claude: {
                since: 1,
                generation: 1,
                targets: [
                  {
                    kind: 'outage',
                    model: 'sonnet',
                    account: 'a@example.com',
                    next_probe_at: 9000
                  }
                ]
              }
            },
            admission: admission({
              kind: 'outage',
              account: 'a@example.com',
              unresolved: false
            })
          })
        ],
        [gateState()]
      );

      expect([
        lanes.queue[0].gate?.kind,
        lanes.queue[0].gate?.lines.some((line) =>
          line.startsWith('계정: 미해석')
        )
      ]).toEqual(['provider_outage', false]);
    });

    test('drops the recorded gate once that runner hold is gone', () => {
      const lanes = buildLanes(
        [
          workspace({
            queue: [{ bead_id: 'A-1' }],
            bead_overlay: overlays(['A-1']),
            provider_hold: {},
            admission: admission()
          })
        ],
        [gateState()]
      );

      expect(lanes.queue[0].gate).toBeUndefined();
    });

    test('keeps an unresolved record the front-end catalog alone contradicts', () => {
      const lanes = buildLanes(
        [
          workspace({
            queue: [{ bead_id: 'A-1' }],
            bead_overlay: overlays(['A-1']),
            account_catalog: {
              claude: [
                { email: 'a@example.com', alias: '업무', active: false },
                { email: 'b@example.com', alias: '개인', active: true }
              ]
            },
            provider_hold: LIMIT_HOLD,
            admission: admission()
          })
        ],
        [gateState()]
      );

      expect(lanes.queue[0].gate?.kind).toBe('provider_usage');
    });

    test('ignores an unresolved record once the repo declares a default account', () => {
      const lanes = buildLanes(
        [
          workspace({
            queue: [{ bead_id: 'A-1' }],
            bead_overlay: overlays(['A-1']),
            workspace_account_defaults: { claude_account: 'b@example.com' },
            account_catalog: {
              claude: [
                { email: 'a@example.com', alias: '업무', active: false },
                { email: 'b@example.com', alias: '개인', active: false }
              ]
            },
            provider_hold: LIMIT_HOLD,
            admission: admission()
          })
        ],
        [gateState()]
      );

      expect(lanes.queue[0].gate).toBeUndefined();
    });

    test('ignores a recorded gate whose account the row no longer resolves', () => {
      const lanes = buildLanes(
        [
          workspace({
            queue: [{ bead_id: 'A-1' }],
            bead_overlay: overlays(['A-1']),
            workspace_account_defaults: { claude_account: 'b@example.com' },
            account_catalog: {
              claude: [
                { email: 'a@example.com', alias: '업무', active: false },
                { email: 'b@example.com', alias: '개인', active: false }
              ]
            },
            provider_hold: LIMIT_HOLD,
            admission: admission({
              account: 'a@example.com',
              unresolved: false
            })
          })
        ],
        [gateState()]
      );

      expect(lanes.queue[0].gate).toBeUndefined();
    });
  });
});

describe('보류 선반과 세 필터 축 (UI-p7s2 §3·§6)', () => {
  /**
   * @param {Partial<Record<string, any>>} [patch]
   * @returns {Record<string, any>}
   */
  function shelfWorkspace(patch = {}) {
    return workspace({
      runnable: [
        {
          bead_id: 'A-1',
          title: 'candidate one',
          priority: 1,
          issue_type: 'bug',
          labels: ['infra'],
          queue_placeable: true
        }
      ],
      deferred: [
        {
          bead_id: 'A-9',
          title: 'held one',
          priority: 3,
          issue_type: 'chore',
          labels: ['later'],
          updated_at: 10
        }
      ],
      ...patch
    });
  }

  test('keeps a deferred row out of the candidate lane', () => {
    const lanes = buildLanes([shelfWorkspace()], [state()]);

    expect(lanes.runnable.map((r) => r.id)).toEqual(['A-1']);
    expect(lanes.deferred.map((r) => r.id)).toEqual(['A-9']);
  });

  test('leaves a deferred row untouched by the readiness filter', () => {
    const lanes = buildLanes([shelfWorkspace()], [state()], {
      candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, readiness: 'ready' }
    });

    expect(lanes.deferred.map((r) => r.id)).toEqual(['A-9']);
    expect(lanes.runnable_hidden.readiness).toBe(0);
  });

  test('leaves a deferred row untouched by the route filter', () => {
    const lanes = buildLanes([shelfWorkspace()], [state()], {
      candidate_filter: {
        ...CANDIDATE_FILTER_DEFAULT,
        routes: ['quick_fix']
      }
    });

    expect(lanes.deferred.map((r) => r.id)).toEqual(['A-9']);
  });

  test('hides a deferred row the type filter excludes', () => {
    const lanes = buildLanes([shelfWorkspace()], [state()], {
      candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, type: 'bug' }
    });

    expect(lanes.deferred).toEqual([]);
  });

  test('dims a deferred row the search query does not match', () => {
    const lanes = buildLanes([shelfWorkspace()], [state()], {
      search: 'candidate'
    });

    expect(lanes.deferred[0].search_match).toBe(false);
  });

  test('counts priority-hidden candidate and deferred rows under the priority control', () => {
    const lanes = buildLanes([shelfWorkspace()], [state()], {
      candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, priorities: [0] }
    });

    expect(lanes.runnable).toEqual([]);
    expect(lanes.deferred).toEqual([]);
    expect(lanes.runnable_hidden.priority).toBe(2);
  });

  test('counts type-hidden candidate and deferred rows under the type control', () => {
    const lanes = buildLanes([shelfWorkspace()], [state()], {
      candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, type: 'feature' }
    });

    expect(lanes.runnable).toEqual([]);
    expect(lanes.deferred).toEqual([]);
    expect(lanes.runnable_hidden.type).toBe(2);
  });

  test('attaches a predecessor chip to a deferred row from its blocker ids', () => {
    const lanes = buildLanes(
      [
        shelfWorkspace({
          deferred: [
            {
              bead_id: 'A-9',
              title: 'held one',
              updated_at: 10,
              blocked_by: ['A-1']
            }
          ]
        })
      ],
      [state()]
    );

    expect(lanes.deferred[0].dependency_chips?.predecessors?.[0].label).toBe(
      '⛓ A-1'
    );
  });

  test('keeps a filtered-out deferred row in deferred_all', () => {
    const lanes = buildLanes([shelfWorkspace()], [state()], {
      candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, type: 'bug' }
    });

    expect(lanes.deferred).toEqual([]);
    expect(lanes.deferred_all.map((r) => r.id)).toEqual(['A-9']);
  });

  test('counts a type-hidden deferred row under the type control', () => {
    const lanes = buildLanes([shelfWorkspace()], [state()], {
      candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, type: 'bug' }
    });

    expect(lanes.deferred).toEqual([]);
    expect(lanes.runnable_hidden.type).toBe(1);
  });

  test('hides an unlabeled candidate when a label filter is on', () => {
    const lanes = buildLanes(
      [
        shelfWorkspace({
          runnable: [{ bead_id: 'A-1', labels: [], queue_placeable: true }],
          deferred: []
        })
      ],
      [state()],
      { candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, labels: ['ops'] } }
    );

    expect(lanes.runnable).toEqual([]);
    expect(lanes.runnable_hidden.label).toBe(1);
  });

  test('dims a queue row whose overlay confirms it has no labels', () => {
    const lanes = buildLanes(
      [
        shelfWorkspace({
          queue: [{ bead_id: 'A-2' }],
          bead_overlay: { 'A-2': { labels: [] } }
        })
      ],
      [state()],
      { candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, labels: ['ops'] } }
    );

    expect(lanes.queue[0].filter_match).toBe(false);
  });

  test('keeps a queue row without label facts matched by the label filter', () => {
    const lanes = buildLanes(
      [shelfWorkspace({ queue: [{ bead_id: 'A-2' }] })],
      [state()],
      { candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, labels: ['ops'] } }
    );

    expect(lanes.queue[0].filter_match).toBe(true);
  });

  test('counts label-hidden candidate and deferred rows under the label control', () => {
    const lanes = buildLanes([shelfWorkspace()], [state()], {
      candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, labels: ['ops'] }
    });

    expect(lanes.runnable).toEqual([]);
    expect(lanes.deferred).toEqual([]);
    expect(lanes.runnable_hidden.label).toBe(2);
  });

  test('dims rather than hides a queue row the label filter excludes', () => {
    const lanes = buildLanes(
      [
        shelfWorkspace({
          queue: [{ bead_id: 'A-2' }],
          bead_overlay: { 'A-2': { labels: ['infra'] } }
        })
      ],
      [state()],
      { candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, labels: ['ops'] } }
    );

    expect(lanes.queue.map((r) => r.id)).toEqual(['A-2']);
    expect(lanes.queue[0].filter_match).toBe(false);
  });

  test('dims a done row the label filter excludes', () => {
    const lanes = buildLanes(
      [
        shelfWorkspace({
          done: [{ bead_id: 'A-3', added_at: 5 }],
          bead_overlay: { 'A-3': { labels: ['infra'] } }
        })
      ],
      [state()],
      { candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, labels: ['ops'] } }
    );

    expect(lanes.done.map((r) => r.id)).toEqual(['A-3']);
    expect(lanes.done[0].filter_match).toBe(false);
  });

  test('treats a queue row with no issue_type as matching the type filter', () => {
    const lanes = buildLanes(
      [shelfWorkspace({ queue: [{ bead_id: 'A-2' }] })],
      [state()],
      { candidate_filter: { ...CANDIDATE_FILTER_DEFAULT, type: 'bug' } }
    );

    expect(lanes.queue[0].filter_match).toBe(true);
  });

  test('attaches no filter verdict when the three axes are untouched', () => {
    const lanes = buildLanes(
      [shelfWorkspace({ queue: [{ bead_id: 'A-2' }] })],
      [state()]
    );

    expect(lanes.queue[0].filter_match).toBe(undefined);
  });

  test('reads issue_type and labels for a queue row from the overlay', () => {
    const lanes = buildLanes(
      [
        shelfWorkspace({
          queue: [{ bead_id: 'A-2' }],
          bead_overlay: { 'A-2': { issue_type: 'epic', labels: ['ops'] } }
        })
      ],
      [state()]
    );

    expect(lanes.queue[0].issue_type).toBe('epic');
    expect(lanes.queue[0].labels).toEqual(['ops']);
  });
});
