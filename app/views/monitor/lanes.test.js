import { render } from 'lit-html';
import { beforeEach, describe, expect, test } from 'vitest';
import {
  buildLanes,
  monitorGroupHeaderTemplate,
  monitorQueueRow,
  monitorRunnableCard,
  monitorRunningTile,
  monitorTopBarTemplate
} from './lanes.js';

const NOW = 1_700_000_000_000;
const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/** @type {HTMLElement} */
let mount;

beforeEach(() => {
  document.body.innerHTML = '<div id="m"></div>';
  mount = /** @type {HTMLElement} */ (document.getElementById('m'));
});

/**
 * One workspace entry of the aggregated payload's heavy array.
 *
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function workspace(patch = {}) {
  return {
    root_dir: WS_A,
    name: 'repo-a',
    revision: 1,
    queue: [],
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
 * One `workspaces_state` entry — every VISIBLE repo, pipeline-empty ones too.
 *
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function state(patch = {}) {
  return {
    root_dir: WS_A,
    name: 'repo-a',
    auto_advance: true,
    auto_merge: true,
    slots: 1,
    revision: 1,
    exec_defaults: {},
    ...patch
  };
}

/**
 * A full `monitorTopBarTemplate()` model with §7's period/token fields
 * defaulted to their inert values, so tests unrelated to §7 don't have to
 * restate them.
 *
 * @param {Partial<Parameters<typeof monitorTopBarTemplate>[0]>} [patch]
 * @returns {Parameters<typeof monitorTopBarTemplate>[0]}
 */
function topBarModel(patch = {}) {
  return {
    automation: { total: 0, both_on: 0 },
    counts: { running: 0, queue: 0, pr_wait: 0 },
    done_range: 'today',
    token_total: null,
    token_tooltip: '',
    ...patch
  };
}

/**
 * @param {Record<string, any>[]} items
 * @returns {string[]}
 */
function ids(items) {
  return items.map((i) => i.id);
}

describe('monitor lane builder exclusive priority (UI-qrfo §8)', () => {
  test('preserves attempt runner for Codex provider projection in a lane card', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-run', added_at: NOW }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'running',
              runner: 'codex',
              started_at: NOW - 1_000,
              usage: {
                input_tokens: 5,
                output_tokens: 3,
                cache_read_input_tokens: 100
              }
            }
          }
        })
      ],
      []
    );

    const usage =
      /** @type {import('../../utils/token-usage.js').UsageProjection} */ (
        lanes.running[0]?.usage
      );

    expect(usage.providers.codex?.subtotal).toBe(8);
    expect(usage.providers).not.toHaveProperty('claude');
  });

  test('keeps a running bead out of the waiting lane it still sits in', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-run', added_at: NOW }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'running',
              started_at: NOW - 1_000
            }
          }
        })
      ],
      []
    );

    expect(ids(lanes.running)).toEqual(['A-run']);
    expect(ids(lanes.queue)).toEqual([]);
  });

  test('shows a conflict-resolution bead only in the running lane', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-pr',
              status: 'running',
              conflict_resolution: true,
              started_at: NOW - 1_000
            }
          }
        })
      ],
      []
    );

    expect(ids(lanes.running)).toEqual(['A-pr']);
    expect(ids(lanes.pr_wait)).toEqual([]);
  });

  test('keeps a queued bead out of the runnable lane', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1', added_at: NOW }],
          runnable: [{ bead_id: 'A-1', title: '이미 적재됨' }]
        })
      ],
      []
    );

    expect(ids(lanes.queue)).toEqual(['A-1']);
    expect(ids(lanes.runnable)).toEqual([]);
  });

  test('keeps a runnable bead out of the done lane', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [{ bead_id: 'A-1', title: '실행 가능' }],
          done: [{ bead_id: 'A-1', added_at: NOW - 1_000 }]
        })
      ],
      []
    );

    expect(ids(lanes.runnable)).toEqual(['A-1']);
    expect(ids(lanes.done)).toEqual([]);
  });

  test('draws one bead in exactly one lane across all five sources', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1', added_at: NOW }],
          pr_wait: [{ bead_id: 'A-1', added_at: NOW }],
          done: [{ bead_id: 'A-1', added_at: NOW }],
          runnable: [{ bead_id: 'A-1', title: 'x' }],
          attempts: {
            a1: { attempt_id: 'a1', bead_id: 'A-1', status: 'running' }
          }
        })
      ],
      []
    );

    const placed = [
      lanes.runnable,
      lanes.queue,
      lanes.running,
      lanes.pr_wait,
      lanes.done
    ].filter((lane) => lane.length > 0);
    expect(placed).toHaveLength(1);
    expect(ids(lanes.running)).toEqual(['A-1']);
  });
});

describe('monitor waiting lane repo groups (UI-qrfo §6)', () => {
  test('splits the waiting lane into one group per repo', () => {
    const lanes = buildLanes(
      [
        workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1', added_at: NOW }]
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b' })]
    );

    expect(lanes.queue_groups.map((g) => [g.root_dir, ids(g.items)])).toEqual([
      [WS_A, ['A-1']],
      [WS_B, ['B-1']]
    ]);
  });

  test('numbers the ordinals inside each group', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [
            { bead_id: 'A-1', added_at: NOW },
            { bead_id: 'A-2', added_at: NOW }
          ]
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1', added_at: NOW }]
        })
      ],
      [state(), state({ root_dir: WS_B, name: 'repo-b' })]
    );

    expect(
      lanes.queue_groups.map((g) =>
        g.items.map((i) => [i.id, i.queue_position])
      )
    ).toEqual([
      [
        ['A-1', 1],
        ['A-2', 2]
      ],
      [['B-1', 1]]
    ]);
  });

  // 자동 진행이 꺼져 큐가 빈 레포가 바로 그 상태를 풀어야 하는 레포다 — 그
  // 레포의 헤더가 사라지면 제어할 방법 자체가 없어진다.
  test('renders a group for a repo whose waiting queue is empty', () => {
    const lanes = buildLanes(
      [],
      [state({ root_dir: WS_B, name: 'repo-b', auto_advance: false })]
    );

    expect(lanes.queue_groups.map((g) => [g.root_dir, g.items.length])).toEqual(
      [[WS_B, 0]]
    );
  });

  test('carries the runtime catalog into an empty repo group', () => {
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

    const lanes = buildLanes([], [state({ runner_catalog })]);

    expect(lanes.queue_groups[0].runner_catalog).toBe(runner_catalog);
    expect(lanes.queue_groups[0].runner_catalog).toEqual(runner_catalog);
    expect(
      lanes.queue_groups[0].runner_catalog.runners.codex.models.sol
    ).toMatchObject({
      orchestration_efforts: ['low', 'max', 'ultra'],
      speed_tiers: ['default', 'fast']
    });
  });

  // 파이프라인이 빈 workspace는 무거운 배열에 없다 — CAS 토큰은 그룹이
  // `workspaces_state`에서 받아 헤더에 실어 두는 것 말고는 도달할 길이 없다.
  test('carries the empty repo own revision on all four group controls', () => {
    const lanes = buildLanes(
      [],
      [state({ root_dir: WS_B, name: 'repo-b', revision: 42, slots: 3 })]
    );

    render(monitorGroupHeaderTemplate(lanes.queue_groups[0]), mount);

    const controls = Array.from(
      mount.querySelectorAll(
        '.mon-ctl--advance, .mon-ctl--merge-auto, .mon-slots__input, .mon-ctl--exec'
      )
    );
    expect(controls).toHaveLength(4);
    expect(controls.map((el) => el.getAttribute('data-revision'))).toEqual([
      '42',
      '42',
      '42',
      '42'
    ]);
    expect(controls.map((el) => el.getAttribute('data-root-dir'))).toEqual([
      WS_B,
      WS_B,
      WS_B,
      WS_B
    ]);
  });

  test('reflects the repo automation flags on the two toggles', () => {
    const lanes = buildLanes(
      [],
      [state({ auto_advance: true, auto_merge: false })]
    );

    render(monitorGroupHeaderTemplate(lanes.queue_groups[0]), mount);

    expect(
      mount.querySelector('.mon-ctl--advance')?.getAttribute('data-on')
    ).toBe('false');
    expect(
      mount.querySelector('.mon-ctl--merge-auto')?.getAttribute('data-on')
    ).toBe('true');
  });

  test('falls back to the pipeline array when no workspace state arrives', () => {
    const lanes = buildLanes(
      [workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] })],
      []
    );

    expect(lanes.queue_groups.map((g) => g.root_dir)).toEqual([WS_A]);
  });
});

describe('monitor top bar (UI-qrfo §6)', () => {
  test('counts a repo as automated only when both axes are on', () => {
    const lanes = buildLanes(
      [],
      [
        state(),
        state({ root_dir: WS_B, name: 'repo-b', auto_merge: false }),
        state({ root_dir: '/tmp/c', name: 'repo-c' })
      ]
    );

    expect(lanes.automation).toEqual({ total: 3, both_on: 2 });
  });

  test('renders the partial state as a fraction', () => {
    render(
      monitorTopBarTemplate(
        topBarModel({
          automation: { total: 4, both_on: 3 },
          counts: { running: 1, queue: 2, pr_wait: 3 }
        })
      ),
      mount
    );

    expect(mount.querySelector('.mon-auto-all')?.textContent?.trim()).toBe(
      '전체 자동화 3/4'
    );
    expect(mount.querySelector('.mon-auto-all')?.getAttribute('data-on')).toBe(
      'true'
    );
  });

  test('renders the all-on state as the stop label', () => {
    render(
      monitorTopBarTemplate(
        topBarModel({
          automation: { total: 4, both_on: 4 },
          counts: { running: 0, queue: 0, pr_wait: 0 }
        })
      ),
      mount
    );

    expect(mount.querySelector('.mon-auto-all')?.textContent?.trim()).toBe(
      '전체 자동화 멈춤'
    );
    expect(mount.querySelector('.mon-auto-all')?.getAttribute('data-on')).toBe(
      'false'
    );
  });

  test('renders the overall counts', () => {
    render(
      monitorTopBarTemplate(
        topBarModel({
          automation: { total: 1, both_on: 0 },
          counts: { running: 5, queue: 6, pr_wait: 7 }
        })
      ),
      mount
    );

    expect(
      Array.from(mount.querySelectorAll('.mon-kpi__chip b')).map(
        (el) => el.textContent
      )
    ).toEqual(['5', '6', '7']);
  });

  test('selects the current done-range option in the period select', () => {
    render(monitorTopBarTemplate(topBarModel({ done_range: '7d' })), mount);

    const selected = /** @type {HTMLOptionElement|null} */ (
      mount.querySelector('.mon-done-range option[selected]')
    );
    expect(selected?.getAttribute('value')).toBe('7d');
  });

  test('renders no token chip when the total is null', () => {
    render(monitorTopBarTemplate(topBarModel()), mount);

    expect(mount.querySelector('.mon-kpi__chip--tokens')).toBe(null);
  });

  test('renders the token chip with its tooltip when a total is given', () => {
    render(
      monitorTopBarTemplate(
        topBarModel({
          token_total: 'τ 2.0k',
          token_tooltip: '오늘 완료된 이슈들이 생애 전체에 쓴 토큰 누적'
        })
      ),
      mount
    );

    const chip = mount.querySelector('.mon-kpi__chip--tokens');
    expect(chip?.textContent?.trim()).toBe('오늘 완료 · 누적 τ 2.0k');
    expect(chip?.getAttribute('title')).toBe(
      '오늘 완료된 이슈들이 생애 전체에 쓴 토큰 누적'
    );
  });

  test('renders provider totals as separate top-bar chips', () => {
    render(
      monitorTopBarTemplate(
        topBarModel({
          token_total: [
            {
              provider: 'claude',
              label: 'Claude τ 15',
              tooltip: 'Claude subtotal = 입력 + 출력 + 캐시읽기 + 캐시생성'
            },
            {
              provider: 'codex',
              label: 'Codex τ 8',
              tooltip: 'Codex subtotal = 입력 + 출력; subset 제외'
            }
          ]
        })
      ),
      mount
    );

    const chips = Array.from(
      mount.querySelectorAll('.mon-kpi__chip--tokens')
    ).map((chip) => chip.textContent?.trim());

    expect(chips).toEqual([
      '오늘 완료 · 누적 Claude τ 15',
      '오늘 완료 · 누적 Codex τ 8'
    ]);
  });
});

describe('monitor lane ordering (ported from buildSections, UI-nprg)', () => {
  test('orders running items by started_at ascending by default', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-new',
              status: 'running',
              started_at: NOW - 1_000
            },
            a2: {
              attempt_id: 'a2',
              bead_id: 'A-old',
              status: 'running',
              started_at: NOW - 90_000
            }
          }
        })
      ],
      []
    );

    expect(ids(lanes.running)).toEqual(['A-old', 'A-new']);
  });

  test('puts missing running start times last with a bead id tie-break', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            a1: { attempt_id: 'a1', bead_id: 'A-z', status: 'running' },
            a2: {
              attempt_id: 'a2',
              bead_id: 'A-started',
              status: 'running',
              started_at: NOW
            },
            a3: { attempt_id: 'a3', bead_id: 'A-a', status: 'running' }
          }
        })
      ],
      []
    );

    expect(ids(lanes.running)).toEqual(['A-started', 'A-a', 'A-z']);
  });

  test('groups running items by workspace state order in repo mode', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-first',
              status: 'running',
              started_at: NOW - 90_000
            }
          }
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          attempts: {
            b1: {
              attempt_id: 'b1',
              bead_id: 'B-later',
              status: 'running',
              started_at: NOW - 1_000
            }
          }
        }),
        workspace({
          root_dir: '/tmp/example/repo-unknown',
          name: 'repo-unknown',
          attempts: {
            c1: {
              attempt_id: 'c1',
              bead_id: 'C-unknown',
              status: 'running',
              started_at: NOW - 120_000
            }
          }
        })
      ],
      [state({ root_dir: WS_B, name: 'repo-b' }), state()],
      { running_sort: 'repo' }
    );

    expect(ids(lanes.running)).toEqual(['B-later', 'A-first', 'C-unknown']);
  });

  test('orders done items by completion time descending across repos', () => {
    const lanes = buildLanes(
      [
        workspace({ done: [{ bead_id: 'A-old', added_at: NOW - 60_000 }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          done: [{ bead_id: 'B-new', added_at: NOW - 1_000 }]
        })
      ],
      []
    );

    expect(ids(lanes.done)).toEqual(['B-new', 'A-old']);
  });

  test('keeps the waiting lane in dispatch order with its lane positions', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [
            { bead_id: 'A-1', added_at: NOW },
            { bead_id: 'A-2', added_at: NOW }
          ]
        })
      ],
      []
    );

    expect(lanes.queue.map((i) => [i.id, i.queue_position])).toEqual([
      ['A-1', 1],
      ['A-2', 2]
    ]);
  });

  // 순번은 레인에서의 디스패치 순서다 — 실행중으로 빠진 버드를 건너뛴 뒤의
  // 인덱스를 쓰면 남은 카드가 자기 자리를 잘못 말한다.
  test('numbers a waiting bead by its lane slot, not the rendered index', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [
            { bead_id: 'A-run', added_at: NOW },
            { bead_id: 'A-next', added_at: NOW }
          ],
          attempts: {
            a1: { attempt_id: 'a1', bead_id: 'A-run', status: 'running' }
          }
        })
      ],
      []
    );

    expect(lanes.queue.map((i) => [i.id, i.queue_position])).toEqual([
      ['A-next', 2]
    ]);
  });
});

describe('monitor lane item decoration (ported from buildSections, UI-nprg)', () => {
  test('uses the decorated bead title and falls back to the id', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [
            { bead_id: 'A-1', added_at: NOW },
            { bead_id: 'A-2', added_at: NOW }
          ],
          bead_titles: { 'A-1': '제목 있음' }
        })
      ],
      []
    );

    expect(lanes.queue.map((i) => i.title)).toEqual(['제목 있음', 'A-2']);
  });

  test('carries the owning repo on every item', () => {
    const lanes = buildLanes(
      [
        workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1', added_at: NOW }]
        })
      ],
      []
    );

    expect(lanes.queue.map((i) => [i.root_dir, i.workspace_name])).toEqual([
      [WS_A, 'repo-a'],
      [WS_B, 'repo-b']
    ]);
  });

  test('derives the PR number from the observations', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          pr_observations: {
            'A-pr': { pr: { number: 91, url: 'https://x/91' } }
          }
        })
      ],
      []
    );

    expect(lanes.pr_wait[0].pr_number).toBe(91);
    expect(lanes.pr_wait[0].pr_url).toBe('https://x/91');
  });

  // 아래 네 판정은 Worker 탭 `prWaitRow`와 같은 값이어야 한다 — 서버가 거부할
  // 조작을 모니터가 제시하면 클릭이 실패로만 돌아온다.
  test('keeps merge disabled while the gate is closed', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          pr_observations: {
            'A-pr': { gate: { enabled: false, tier: 'ci_pending' } }
          }
        })
      ],
      []
    );

    expect(lanes.pr_wait[0].merge_action).toBe(true);
    expect(lanes.pr_wait[0].merge_enabled).toBe(false);
  });

  test('enables merge on a conflicting gate so the click dispatches resolution', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          pr_observations: {
            'A-pr': { gate: { enabled: false, base_badge: '충돌' } }
          }
        })
      ],
      []
    );

    expect(lanes.pr_wait[0].merge_enabled).toBe(true);
    expect(lanes.pr_wait[0].merge_label).toBe('충돌 해소 후 머지');
  });

  test('enables merge as a cleanup retry on a merged gate with a recorded failure', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          pr_observations: {
            'A-pr': { gate: { enabled: false, tier: 'merged' } }
          },
          cleanup_failed: { 'A-pr': { step: 'verify', reason: 'x' } }
        })
      ],
      []
    );

    expect(lanes.pr_wait[0].merge_enabled).toBe(true);
    expect(lanes.pr_wait[0].merge_label).toBe('정리');
    expect(lanes.pr_wait[0].badges).toContain('정리 실패');
  });

  test('shows durable managed restart progress on a PR-wait row', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          deployment_reconcile: {
            'A-pr': {
              adapter: 'managed',
              stage: 'restarting',
              retry_count: 0
            }
          }
        })
      ],
      []
    );

    expect(lanes.pr_wait[0].badges).toContain('정리 중 · 재시작');
    expect(lanes.pr_wait[0].reason).toBe('정리 중 · 재시작');
    expect(lanes.pr_wait[0].alert).toBe(false);
  });

  test('keeps cleanup disabled while a failed discard awaits retry', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          pr_observations: {
            'A-pr': { gate: { enabled: false, tier: 'merged' } }
          },
          cleanup_failed: { 'A-pr': { step: 'verify', reason: 'x' } },
          discard_operations: {
            op1: {
              operation_id: 'op1',
              bead_id: 'A-pr',
              requested_at: 1,
              mode: 'merged_revert',
              phase: 'revert_pr_created',
              last_error: 'revert_pr_failed'
            }
          }
        })
      ],
      []
    );

    expect(lanes.pr_wait[0].merge_enabled).toBe(false);
    expect(lanes.pr_wait[0].merge_title).toContain(
      '폐기 실패: revert_pr_failed'
    );
    expect(lanes.pr_wait[0].discard?.enabled).toBe(true);
    expect(lanes.pr_wait[0].discard?.label).toBe('재시도');
  });

  test('offers discard on an already merged worker-owned row', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          pr_observations: {
            'A-pr': { gate: { enabled: true, tier: 'merged' } }
          }
        })
      ],
      []
    );

    expect(lanes.pr_wait[0].discard_action).toBe(true);
    expect(lanes.pr_wait[0].discard?.confirmation).toBe('merged');
  });

  test('hides discard on an external PR row', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW, external: true }]
        })
      ],
      []
    );

    expect(lanes.pr_wait[0].discard_action).toBe(false);
  });

  test('marks an external PR row and renders it with no number', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW, external: true }]
        })
      ],
      []
    );

    expect(lanes.pr_wait[0].external).toBe(true);
    expect(lanes.pr_wait[0].pr_number).toBe(null);
  });

  test('derives the completion kind from the latest terminal attempt', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-done', added_at: NOW - 1_000 }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-done',
              status: 'done',
              finished_at: NOW - 2_000,
              done_kind: 'pr_stop'
            },
            a2: {
              attempt_id: 'a2',
              bead_id: 'A-done',
              status: 'done',
              finished_at: NOW - 1_000,
              done_kind: 'auto_merge'
            }
          }
        })
      ],
      []
    );

    expect(lanes.done[0].done_kind).toBe('auto_merge');
  });

  test('omits the completion kind when no attempt matches', () => {
    const lanes = buildLanes(
      [workspace({ done: [{ bead_id: 'A-done', added_at: NOW - 1_000 }] })],
      []
    );

    expect(lanes.done[0].done_kind).toBe(null);
    expect(lanes.done[0].done_at).toBe(NOW - 1_000);
  });

  test('renders the full done history when no period filter is given', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [
            { bead_id: 'A-old', added_at: NOW - 40 * 86_400_000 },
            { bead_id: 'A-new', added_at: NOW - 1_000 }
          ]
        })
      ],
      []
    );

    expect(ids(lanes.done)).toEqual(['A-new', 'A-old']);
  });

  test('gives every item its own repo CAS revision', () => {
    const lanes = buildLanes(
      [
        workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1', added_at: NOW }]
        })
      ],
      [state({ revision: 4 }), state({ root_dir: WS_B, revision: 9 })]
    );

    expect(lanes.queue.map((i) => i.expected_revision)).toEqual([4, 9]);
  });

  test('places a runnable card at the tail of that repo waiting queue', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [
            { bead_id: 'A-1', added_at: NOW },
            { bead_id: 'A-2', added_at: NOW }
          ],
          runnable: [
            { bead_id: 'A-3', title: '실행 가능', route: 'spec_backed' }
          ]
        })
      ],
      []
    );

    expect(lanes.runnable[0].place_index).toBe(2);
  });

  test('surfaces the admission refusal on a runnable card', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [{ bead_id: 'A-3', title: '실행 가능' }],
          admission: { 'A-3': { reason: 'spec_missing:docs/x.md' } }
        })
      ],
      []
    );

    expect(lanes.runnable[0].reason).toBe('⛔ spec_missing (docs/x.md)');
  });

  test('carries the server labels onto the runnable item', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            {
              bead_id: 'A-3',
              title: '실행 가능',
              labels: ['worker-ineligible']
            }
          ]
        })
      ],
      []
    );

    expect(lanes.runnable[0].labels).toEqual(['worker-ineligible']);
  });

  test('carries review progress fields onto the runnable item', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            {
              bead_id: 'A-3',
              title: '실행 가능',
              spec_reviewer: 'codex',
              plan_state: 'approved'
            }
          ]
        })
      ],
      []
    );

    expect([
      lanes.runnable[0].spec_reviewer,
      lanes.runnable[0].plan_state
    ]).toEqual(['codex', 'approved']);
  });

  test('leaves the runnable labels empty when the server sends none', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [{ bead_id: 'A-3', title: '실행 가능' }] })],
      []
    );

    expect(lanes.runnable[0].labels).toEqual([]);
  });
});

describe('monitor 완료 레인 기간 필터 (UI-qrfo §7)', () => {
  test('excludes a done entry completed before the period lower bound', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [
            { bead_id: 'A-old', added_at: NOW - 10 * 86_400_000 },
            { bead_id: 'A-new', added_at: NOW - 1_000 }
          ]
        })
      ],
      [],
      { done_since: NOW - 86_400_000 }
    );

    expect(ids(lanes.done)).toEqual(['A-new']);
  });

  test('keeps a done entry completed exactly at the period lower bound', () => {
    const lanes = buildLanes(
      [workspace({ done: [{ bead_id: 'A-boundary', added_at: NOW }] })],
      [],
      { done_since: NOW }
    );

    expect(ids(lanes.done)).toEqual(['A-boundary']);
  });

  // Worker 탭과 같은 규약(§10) — 판정할 수 없는 엔트리를 지우는 쪽이 더 나쁜
  // 오답이므로, 기간이 아무리 좁아도 이 엔트리는 항상 남는다.
  test('keeps a done entry with no added_at regardless of the selected period', () => {
    const lanes = buildLanes(
      [workspace({ done: [{ bead_id: 'A-legacy' }] })],
      [],
      { done_since: NOW }
    );

    expect(ids(lanes.done)).toEqual(['A-legacy']);
  });

  test('does not filter across repos when one repo has no matching entry', () => {
    const lanes = buildLanes(
      [
        workspace({ done: [{ bead_id: 'A-old', added_at: NOW - 100_000 }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          done: [{ bead_id: 'B-new', added_at: NOW - 1_000 }]
        })
      ],
      [],
      { done_since: NOW - 50_000 }
    );

    expect(ids(lanes.done)).toEqual(['B-new']);
  });
});

describe('monitor running lane attempt states (UI-qrfo §8 조작)', () => {
  test('offers resume on a leaf paused attempt', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1', added_at: NOW }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-1',
              status: 'paused',
              session_id: 's1',
              started_at: NOW - 5_000
            }
          }
        })
      ],
      []
    );

    expect(lanes.running[0].run_state).toBe('paused');
    expect(lanes.running[0].can_resume).toBe(true);
  });

  test('offers dismiss on an unhandled failure', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-1',
              status: 'failed',
              finished_at: NOW - 5_000
            }
          }
        })
      ],
      []
    );

    expect(lanes.running[0].run_state).toBe('failed');
    expect(lanes.running[0].attempt_id).toBe('a1');
  });

  test('drops a failure a later done entry already resolved', () => {
    const lanes = buildLanes(
      [
        workspace({
          done: [{ bead_id: 'A-1', added_at: NOW - 1_000 }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-1',
              status: 'failed',
              finished_at: NOW - 5_000
            }
          }
        })
      ],
      []
    );

    expect(lanes.running).toEqual([]);
    expect(ids(lanes.done)).toEqual(['A-1']);
  });

  test('prefers the live attempt over a paused one on the same bead', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-1',
              status: 'paused',
              started_at: NOW - 10_000
            },
            a2: {
              attempt_id: 'a2',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 1_000
            }
          }
        })
      ],
      []
    );

    expect(lanes.running).toHaveLength(1);
    expect(lanes.running[0].run_state).toBe('running');
  });
});

describe('monitor lane fail-quiet', () => {
  test('renders nothing at all before the first snapshot', () => {
    const lanes = buildLanes(null, null);

    expect(lanes.queue_groups).toEqual([]);
    expect(lanes.automation).toEqual({ total: 0, both_on: 0 });
  });

  test('leaves the runnable lane empty when the server sends no such key', () => {
    const lanes = buildLanes([workspace()], [state()]);

    expect(lanes.runnable).toEqual([]);
  });
});

describe('monitor 카드 문법 (UI-gwkl §2.2)', () => {
  test('gives a running tile a title block outside its meta line', () => {
    const lanes = buildLanes(
      [
        workspace({
          bead_titles: { 'A-run': '모니터 탭 시각 디자인 개선·모바일 호환' },
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'running',
              started_at: NOW - 65_000,
              last_event_at: NOW
            }
          }
        })
      ],
      [state()]
    );

    render(monitorRunningTile(lanes.running[0], NOW), mount);

    expect(mount.querySelector('.mon-c__title')?.textContent?.trim()).toBe(
      '모니터 탭 시각 디자인 개선·모바일 호환'
    );
    expect(mount.querySelector('.mon-c__meta .mon-c__title')).toBe(null);
    expect(mount.querySelector('.mon-c__meta .mon-c__id')?.textContent).toBe(
      'A-run'
    );
    expect(mount.querySelector('.mon-c__meta .mon-live__elapsed')).not.toBe(
      null
    );
  });

  // 실패는 카드에서 가장 먼저 읽혀야 하는 사실이다.
  test('leads the running meta line with the failure state', () => {
    const lanes = buildLanes(
      [
        workspace({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'failed',
              started_at: NOW - 1_000,
              finished_at: NOW
            }
          }
        })
      ],
      [state()]
    );

    render(monitorRunningTile(lanes.running[0], NOW), mount);

    const first = mount.querySelector('.mon-c__meta')?.firstElementChild;
    expect(first?.className).toContain('mon-c__badge--alert');
    expect(first?.textContent).toContain('실패');
  });

  // 좌측 레일은 1fr이라 현재보다 좁다 — 대기 행만 한 줄로 두면 제목 압축이
  // 그대로 재발한다 (spec 리뷰 finding 1).
  test('gives a waiting row the same title-first two-line structure', () => {
    const lanes = buildLanes(
      [
        workspace({
          bead_titles: { 'A-1': '대기 중인 아주 긴 한글 제목' },
          queue: [{ bead_id: 'A-1', added_at: NOW }]
        })
      ],
      [state()]
    );

    render(monitorQueueRow(lanes.queue[0]), mount);

    expect(mount.querySelector('.mon-c__title')?.textContent?.trim()).toBe(
      '대기 중인 아주 긴 한글 제목'
    );
    expect(mount.querySelector('.mon-c__meta .mon-c__title')).toBe(null);
    expect(
      mount.querySelector('.mon-c__meta .mon-live__pos')?.textContent
    ).toBe('#1');
    expect(mount.querySelector('.mon-c__meta .mon-c__id')?.textContent).toBe(
      'A-1'
    );
  });

  test('keeps a failed post-runner discard reachable from the queue row', () => {
    const lanes = buildLanes(
      [
        workspace({
          queue: [{ bead_id: 'A-1', added_at: NOW }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-1',
              status: 'discarded'
            }
          },
          discard_operations: {
            'op-queue': {
              operation_id: 'op-queue',
              bead_id: 'A-1',
              attempt_id: 'a1',
              requested_at: 1,
              mode: 'unmerged',
              phase: 'runner_terminated',
              backup: { path: '/state/op-queue' },
              last_error: 'pr_observe_failed'
            }
          }
        })
      ],
      [state()]
    );

    render(monitorQueueRow(lanes.queue[0]), mount);

    expect(lanes.queue[0].draggable).toBe(false);
    expect(
      mount.querySelector('.worker-mini__discard')?.textContent?.trim()
    ).toBe('재시도');
    expect(mount.textContent).toContain('/state/op-queue');
    expect(
      /** @type {HTMLButtonElement} */ (mount.querySelector('.mon-op--remove'))
        .disabled
    ).toBe(true);
  });

  // 큐잉 판단이 일어나는 화면이 실행가능 레인이므로, 라우팅 라벨은 여기서
  // 읽혀야 한다 (UI-lzfa §4.2).
  test('renders the bead labels as chips on a runnable card', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            {
              bead_id: 'A-3',
              title: '실행 가능',
              route: 'spec_backed',
              labels: ['worker-ineligible', 'frontend']
            }
          ]
        })
      ],
      [state()]
    );

    render(monitorRunnableCard(lanes.runnable[0]), mount);

    expect(
      Array.from(
        mount.querySelectorAll('.mon-c__meta .ctl-chip--label'),
        (el) => el.textContent
      )
    ).toEqual(['worker-ineligible', 'frontend']);
  });

  test('draws no label chip on a runnable card with no labels', () => {
    const lanes = buildLanes(
      [workspace({ runnable: [{ bead_id: 'A-3', title: '실행 가능' }] })],
      [state()]
    );

    render(monitorRunnableCard(lanes.runnable[0]), mount);

    expect(mount.querySelectorAll('.ctl-chip--label').length).toBe(0);
  });

  test('renders the spec reviewer chip on a runnable card', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            {
              bead_id: 'A-3',
              title: '실행 가능',
              route: 'spec_backed',
              spec_reviewer: 'codex',
              plan_state: 'none'
            }
          ]
        })
      ],
      [state()]
    );

    render(monitorRunnableCard(lanes.runnable[0]), mount);

    expect(mount.querySelector('.mon-c__review')?.textContent).toBe(
      'spec:codex'
    );
  });

  test('dims a skipped spec reviewer chip', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            {
              bead_id: 'A-3',
              title: '실행 가능',
              route: 'spec_backed',
              spec_reviewer: 'skipped',
              plan_state: 'none'
            }
          ]
        })
      ],
      [state()]
    );

    render(monitorRunnableCard(lanes.runnable[0]), mount);

    expect(mount.querySelector('.mon-c__review')?.classList).toContain(
      'mon-c__review--dim'
    );
  });

  for (const [plan_state, label, dimmed] of [
    ['approved', 'plan ✓', false],
    ['authored', 'plan ✎', false],
    ['none', 'plan –', true]
  ]) {
    test(`renders the ${plan_state} full-plan chip`, () => {
      const lanes = buildLanes(
        [
          workspace({
            runnable: [
              {
                bead_id: 'A-3',
                title: '실행 가능',
                route: 'full_plan',
                spec_reviewer: 'codex',
                plan_state
              }
            ]
          })
        ],
        [state()]
      );

      render(monitorRunnableCard(lanes.runnable[0]), mount);

      const chip = mount.querySelector('.mon-c__plan');
      expect([
        chip?.textContent,
        chip?.classList.contains('mon-c__review--dim')
      ]).toEqual([label, dimmed]);
    });
  }

  test('omits the plan chip from a spec-backed runnable card', () => {
    const lanes = buildLanes(
      [
        workspace({
          runnable: [
            {
              bead_id: 'A-3',
              title: '실행 가능',
              route: 'spec_backed',
              spec_reviewer: 'codex',
              plan_state: 'none'
            }
          ]
        })
      ],
      [state()]
    );

    render(monitorRunnableCard(lanes.runnable[0]), mount);

    expect(mount.querySelector('.mon-c__plan')).toBe(null);
  });
});

describe('monitor 그룹 컨트롤 라벨 (UI-gwkl §2.3)', () => {
  test('labels all four group controls and keeps their CAS attributes', () => {
    const lanes = buildLanes(
      [],
      [
        state({
          root_dir: WS_B,
          name: 'repo-b',
          revision: 9,
          auto_advance: false
        })
      ]
    );

    render(monitorGroupHeaderTemplate(lanes.queue_groups[0]), mount);

    expect(
      Array.from(mount.querySelectorAll('.mon-ctl__label')).map((el) =>
        el.textContent?.trim()
      )
    ).toEqual(['진행', '머지', '슬롯', '설정']);
    const advance = mount.querySelector('.mon-ctl--advance');
    expect(advance?.getAttribute('data-on')).toBe('true');
    expect(advance?.getAttribute('data-revision')).toBe('9');
    expect(advance?.getAttribute('data-root-dir')).toBe(WS_B);
  });

  // 이모지는 폰트마다 크기·색이 제각각이라 라벨보다 시각적으로 앞선다.
  test('draws an svg icon on every control and no emoji glyph', () => {
    const lanes = buildLanes([], [state()]);

    render(monitorGroupHeaderTemplate(lanes.queue_groups[0]), mount);

    for (const selector of [
      '.mon-ctl--advance',
      '.mon-ctl--merge-auto',
      '.mon-ctl--slots',
      '.mon-ctl--exec'
    ]) {
      expect(
        mount.querySelector(
          `${selector} svg.mon-i path, ${selector} svg.mon-i rect, ${selector} svg.mon-i circle`
        )
      ).not.toBe(null);
    }
    expect(/[▶🔀⧉⚙]/u.test(mount.textContent || '')).toBe(false);
  });
});
