import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { workerPlacementPlan } from '../worker/queue-overlaps.js';
import { createMonitorView } from './index.js';

const NOW = 1_700_000_000_000;
const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';
/** A `counts` projection that makes a repo ACTIVE for the deck (§4.2). */
const RUNNING_COUNTS = { running: 1, pr_wait: 0, queue: 0, runnable: 0 };
/** @type {Array<ReturnType<typeof createMonitorView>>} */
const active_views = [];

beforeEach(() => {
  window.localStorage.clear();
  expandDoneLane();
});

/**
 * Expand the 완료 lane before mounting. 완료 is the one lane that starts
 * collapsed (UI-5ksp §3-3) and a collapsed pane renders neither its body nor
 * its header control, so every test that reads a done row says it wants the
 * lane open.
 */
function expandDoneLane() {
  window.localStorage.setItem(
    'beads-ui.monitor.lane-collapsed',
    JSON.stringify({ lanes: { done: false }, areas: {} })
  );
}

afterEach(() => {
  while (active_views.length > 0) {
    active_views.pop()?.clear();
  }
});

/**
 * One workspace entry of the aggregated payload's heavy array.
 *
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function workspace(patch = {}) {
  /** @type {Record<string, any>} */
  const merged = {
    root_dir: WS_A,
    name: 'repo-a',
    revision: 1,
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
  // 실행가능 행은 서버에서 언제나 `blocked_by`를 실어 온다 (빈 배열 포함,
  // `runnable-cache.js` `qualify`). UI-jaua §6.1의 완전성 판정이 그 존재를
  // 읽으므로 픽스처도 같은 모양이어야 한다 — 키가 없으면 "아직 모름"이다.
  merged.runnable = merged.runnable.map((/** @type {any} */ item) => ({
    blocked_by: [],
    ...item
  }));
  return merged;
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
    revision: 1,
    issue_prefix: 'A',
    ...patch
  };
}

/**
 * One `cross_lanes` snapshot (UI-j92s §4.1). 표시 번호는 배열 자리에서 나오므로
 * 기본 `id`도 그 자리를 따른다 — 테스트가 읽는 `연결 n`과 같은 수여야 한다.
 *
 * 확정 레인의 `entries[i>0]`은 기본이 `dep_created_by_lane: true`다 — 그 레인이
 * 확정하며 만든 의존이고, 삭제가 되돌리는 대상도 그 쌍뿐이다 (UI-jaua §7.1).
 *
 * @param {Array<{ id?: string, status?: 'draft'|'confirmed', entries: Array<{ bead_id: string, root_dir?: string, dep_created_by_lane?: boolean }> }>} lanes
 * @param {number} [revision]
 * @returns {{ revision: number, lanes: Array<Record<string, any>> }}
 */
function crossLanes(lanes, revision = 1) {
  return {
    revision,
    lanes: lanes.map((lane, index) => ({
      id: lane.id || `cl_${index + 1}`,
      status: lane.status || 'confirmed',
      created_at: '2026-08-25T00:00:00.000Z',
      entries: lane.entries.map((entry, position) => ({
        bead_id: entry.bead_id,
        root_dir: entry.root_dir || WS_A,
        ...(position > 0 && (lane.status || 'confirmed') === 'confirmed'
          ? {
              dep_created_by_lane: entry.dep_created_by_lane ?? true
            }
          : {})
      }))
    }))
  };
}

/**
 * @param {{ workspaces?: any[], workspaces_state?: any[], cross_lanes?: { revision: number, lanes: Array<Record<string, any>> }|null, now?: () => number, current?: string, switchWorkspace?: (root: string) => Promise<unknown>, transport?: (type: string, payload?: any) => Promise<any>, confirm?: (message: string) => boolean, openDoc?: (doc: any, root_dir?: string) => void }} [input]
 */
function setup(input = {}) {
  document.body.innerHTML = '<div id="m"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const pipelineStore = {
    get() {
      return input.workspaces || null;
    },
    getWorkspacesState() {
      return input.workspaces_state || [];
    },
    crossLanes() {
      return input.cross_lanes;
    },
    subscribe() {
      return () => {};
    }
  };
  /** @type {Array<{ type: string, payload: any }>} */
  const sent = [];
  const transport = vi.fn(
    async (/** @type {string} */ type, /** @type {any} */ payload) => {
      sent.push({ type, payload });
      return input.transport ? await input.transport(type, payload) : null;
    }
  );
  const gotoIssue = vi.fn();
  const gotoView = vi.fn();
  const switchWorkspace =
    input.switchWorkspace || vi.fn(() => Promise.resolve(null));
  const confirmFn = input.confirm || vi.fn(() => true);
  const view = createMonitorView(mount, {
    gotoIssue,
    transport,
    router: { gotoView },
    pipelineStore: /** @type {any} */ (pipelineStore),
    getWorkspacePath: () => input.current || WS_A,
    switchWorkspace,
    confirm: confirmFn,
    openDoc: input.openDoc,
    now: input.now || (() => NOW)
  });
  active_views.push(view);
  return {
    mount,
    view,
    gotoIssue,
    gotoView,
    switchWorkspace,
    transport,
    confirmFn,
    sent
  };
}

/**
 * @param {HTMLElement} mount
 * @param {string} lane
 * @returns {string[]}
 */
function idsIn(mount, lane) {
  return Array.from(
    mount.querySelectorAll(
      `#monitor-${lane} .worker-card, #monitor-${lane} .worker-mini, #monitor-${lane} .rtile`
    )
  ).map((card) => card.getAttribute('data-bead-id') || '');
}

/**
 * @param {HTMLElement} mount
 * @param {string} selector
 * @returns {HTMLElement}
 */
function el(mount, selector) {
  return /** @type {HTMLElement} */ (mount.querySelector(selector));
}

/**
 * @param {HTMLElement} mount
 * @param {string} selector
 * @returns {HTMLElement}
 */
function click(mount, selector) {
  const node = el(mount, selector);
  node.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  return node;
}

/**
 * Let every queued microtask settle. 드롭 하나가 여러 op가 되면 뷰는 그것을
 * 차례로 await하므로, 고정된 `Promise.resolve()` 횟수로는 끝을 잡을 수 없다.
 *
 * @returns {Promise<void>}
 */
function flushMicrotasks() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * Dispatch one drag-phase event. jsdom implements neither `DragEvent` nor
 * `DataTransfer`; the controller only touches `dataTransfer` optionally, so a
 * plain cancelable event exercises every decision path — whether a drop was
 * accepted reads off `defaultPrevented`.
 *
 * @param {Element|null} node
 * @param {string} type
 * @returns {Event}
 */
function fireDrag(node, type) {
  const ev = new Event(type, { bubbles: true, cancelable: true });
  /** @type {Element} */ (node).dispatchEvent(ev);
  return ev;
}

describe('views/monitor five vertical lanes (UI-eey2 §3)', () => {
  test('renders every bead through the Worker template of its lane', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-1', title: 'cand' }],
          queue: [{ bead_id: 'A-2' }],
          pr_wait: [{ bead_id: 'A-3' }],
          done: [{ bead_id: 'A-4', added_at: NOW }],
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-5',
              status: 'running',
              started_at: NOW - 1000
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(idsIn(mount, 'runnable')).toEqual(['A-1']);
    expect(idsIn(mount, 'queue')).toEqual(['A-2']);
    expect(idsIn(mount, 'running')).toEqual(['A-5']);
    expect(idsIn(mount, 'pr_wait')).toEqual(['A-3']);
    expect(idsIn(mount, 'done')).toEqual(['A-4']);
    expect(mount.querySelectorAll('.mon-card')).toHaveLength(0);
  });

  test('lays the five panes out as one Worker lane row', () => {
    const { mount, view } = setup();

    view.load();

    expect(el(mount, '.worker-lanes.mon2-lanes')).toBeTruthy();
    expect(mount.querySelectorAll('.mon2-lanes > .worker-pane')).toHaveLength(
      5
    );
  });

  test('mounts the repo deck into the deck container', () => {
    const { mount, view } = setup({
      workspaces_state: [state({ counts: RUNNING_COUNTS })]
    });

    view.load();

    const deck = el(mount, '.mon2-deck');
    expect(deck).toBeTruthy();
    expect(
      deck.querySelector('.mon2-deck__tile')?.getAttribute('data-root-dir')
    ).toBe(WS_A);
  });

  test('draws no deck row when no workspace state arrived', () => {
    const { mount, view } = setup();

    view.load();

    expect(el(mount, '.mon2-deck__bar')).toBe(null);
  });

  test('keeps an empty lane visible with its empty line', () => {
    const { mount, view } = setup();

    view.load();

    expect(
      el(mount, '#monitor-running .worker-rungrid__empty').textContent
    ).toContain('실행 세션 없음');
    expect(el(mount, '#monitor-done .worker-pane__empty')).toBeTruthy();
  });

  test('drops the master automation toggle from the UI', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1' }] })],
      workspaces_state: [state()]
    });

    view.load();

    expect(el(mount, '.mon-auto-all')).toBeNull();
    expect(el(mount, '.mon-top')).toBeNull();
  });
});

describe('views/monitor repo sections (UI-eey2 §5·§6)', () => {
  test('names each repo once in a section header instead of on every card', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ runnable: [{ bead_id: 'A-1', title: 't' }] })],
      workspaces_state: [state()]
    });

    view.load();

    const section = el(mount, '#monitor-runnable .mon2-sec');
    expect(section.getAttribute('data-root-dir')).toBe(WS_A);
    expect(el(mount, '.mon2-sec__name').textContent?.trim()).toBe('repo-a');
    expect(el(mount, '.mon2-sec__count').textContent?.trim()).toBe('1');
    expect(el(mount, '#monitor-runnable .worker-card__repo')).toBeNull();
  });

  test('names the repo automation state in the parallel row badge tooltip', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1' }] })],
      workspaces_state: [state({ auto_advance: true })]
    });

    view.load();

    const badge = el(mount, '.worker-wait__area--parallel .worker-mini__repo');
    expect(badge.getAttribute('title')).toBe('repo-a · 자동화 켜짐');
    expect(el(mount, '#monitor-queue .mon2-sec__auto')).toBeNull();
  });

  test('collapses a section and remembers it', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ runnable: [{ bead_id: 'A-1', title: 't' }] })],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '#monitor-runnable .mon2-sec__toggle');

    expect(
      mount.querySelectorAll('#monitor-runnable .worker-card')
    ).toHaveLength(0);
    expect(
      JSON.parse(
        window.localStorage.getItem('beads-ui.monitor.sections') || '{}'
      )[WS_A].runnable
    ).toBe(true);
  });

  test('collapses an empty serial lane behind a hint the CSS expands on drag', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          serial_lane_count: 2,
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }]
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(el(mount, '.worker-wait__lane--empty')).toBeTruthy();
    expect(el(mount, '.worker-wait__hint').textContent?.trim()).toBe(
      'repo-a · 직렬 2 · 비어 있음'
    );
  });
});

describe('views/monitor lane header controls (UI-eey2 §3)', () => {
  test('persists and applies the candidate sort', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          runnable: [
            { bead_id: 'A-1', title: 'a', updated_at: 10 },
            { bead_id: 'A-2', title: 'b', updated_at: 20 }
          ]
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    const select = /** @type {HTMLSelectElement} */ (
      el(mount, '.mon-candidate-sort')
    );
    select.value = 'updated_flat';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(window.localStorage.getItem('bdui.monitor.candidate_sort')).toBe(
      'updated_flat'
    );
    expect(mount.querySelectorAll('#monitor-runnable .mon2-sec')).toHaveLength(
      0
    );
    expect(idsIn(mount, 'runnable')).toEqual(['A-2', 'A-1']);
  });

  test('shows the repo badge again once the flat sort removes the headers', () => {
    window.localStorage.setItem('bdui.monitor.candidate_sort', 'updated_flat');
    const { mount, view } = setup({
      workspaces: [workspace({ runnable: [{ bead_id: 'A-1', title: 'a' }] })],
      workspaces_state: [state()]
    });

    view.load();

    expect(
      el(mount, '#monitor-runnable .worker-card__repo').textContent?.trim()
    ).toBe('repo-a');
  });

  test('persists the running sort', () => {
    const { mount, view } = setup({ workspaces_state: [state()] });

    view.load();
    const select = /** @type {HTMLSelectElement} */ (
      el(mount, '.mon-running-sort')
    );
    select.value = 'repo';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(window.localStorage.getItem('bdui.monitor.running_sort')).toBe(
      'repo'
    );
  });

  test('persists the done period', () => {
    const { mount, view } = setup({ workspaces_state: [state()] });

    view.load();
    const select = /** @type {HTMLSelectElement} */ (
      el(mount, '.mon-done-range')
    );
    select.value = '7d';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(window.localStorage.getItem('bdui.monitor.done-range')).toBe('7d');
  });

  test('shows blocked candidates by default and persists the toggle', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-1', title: 'a', blocked: true }]
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    expect(idsIn(mount, 'runnable')).toEqual(['A-1']);

    const toggle = /** @type {HTMLInputElement} */ (
      el(mount, '.mon-filter__blocked')
    );
    toggle.checked = false;
    toggle.dispatchEvent(new Event('change', { bubbles: true }));

    expect(idsIn(mount, 'runnable')).toEqual([]);
    expect(
      JSON.parse(
        window.localStorage.getItem('beads-ui.monitor.candidate-filter') || '{}'
      ).show_blocked
    ).toBe(false);
  });

  test('filters by spec presence from the segment', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          runnable: [
            {
              bead_id: 'A-1',
              title: 'a',
              spec_id: 'docs/a.md',
              published: true
            },
            { bead_id: 'A-2', title: 'b' }
          ]
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.mon-filter__spec[data-spec="without"]');

    expect(idsIn(mount, 'runnable')).toEqual(['A-2']);
  });
});

describe('views/monitor 대기 레인 두 영역 (UI-e6hw §4)', () => {
  const workspaces = [
    workspace({ queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }),
    workspace({
      root_dir: WS_B,
      name: 'repo-b',
      queue: [{ bead_id: 'B-1' }],
      bead_blocked_by: { 'B-1': ['A-1'] }
    })
  ];
  const workspaces_state = [
    state(),
    state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
  ];
  const cross_lanes = crossLanes([
    {
      entries: [{ bead_id: 'A-1' }, { bead_id: 'B-1', root_dir: WS_B }]
    }
  ]);

  test('splits the waiting lane into a parallel and a serial area', () => {
    const { mount, view } = setup({ workspaces, workspaces_state });

    view.load();

    expect(
      Array.from(
        mount.querySelectorAll('#monitor-queue .worker-wait__area')
      ).map((a) => a.getAttribute('data-area'))
    ).toEqual(['parallel', 'serial']);
    expect(el(mount, '#monitor-queue .mon2-sec')).toBeNull();
  });

  test('counts only the rows the parallel area actually shows', () => {
    const { mount, view } = setup({
      workspaces,
      workspaces_state,
      cross_lanes
    });

    view.load();

    // A-1과 B-1은 연결 레인이 가져갔다 — 카운트는 보이는 행 수다.
    expect(
      Array.from(
        mount.querySelectorAll('.worker-wait__area--parallel .mon2-item')
      ).map((r) => r.getAttribute('data-bead-id'))
    ).toEqual(['A-2']);
    expect(el(mount, '.worker-wait__area-count').textContent?.trim()).toBe('1');
  });

  test('names each stored lane by its array position', () => {
    const { mount, view } = setup({
      workspaces,
      workspaces_state,
      cross_lanes
    });

    view.load();

    expect(el(mount, '.mon2-clane__name').textContent?.trim()).toBe(
      '연결 1 · 레포 간'
    );
    expect(
      Array.from(mount.querySelectorAll('.mon2-crow')).map((r) =>
        r.getAttribute('data-bead-id')
      )
    ).toEqual(['A-1', 'B-1']);
  });

  test('answers 지금 막혀 있나 in a chain row location chip', () => {
    const { mount, view } = setup({
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
      ]),
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] },
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 1000
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    // UI-jaua §8: 큐 순번은 라벨이 아니라 툴팁이다 — `#n`이 레인 순번 옆에서
    // 전역 실행 순서로 읽혔다.
    expect(
      Array.from(mount.querySelectorAll('.mon2-crow__where')).map((w) => [
        w.textContent?.trim(),
        w.getAttribute('title')
      ])
    ).toEqual([
      ['▶ 실행중', ''],
      ['🔒 대기', 'repo-a 병렬 #1']
    ]);
  });

  test('opens the bead a chain row points at', () => {
    const { mount, view, gotoIssue } = setup({
      workspaces,
      workspaces_state,
      cross_lanes
    });

    view.load();
    click(mount, '.mon2-crow__title');

    expect(gotoIssue).toHaveBeenCalledWith('A-1');
  });

  test('shows the occupying bead in the serial lane header and as a ghost row', () => {
    const { mount, view } = setup({
      workspaces: [
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
              status: 'running',
              started_at: 10
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const badge = el(mount, '.worker-wait__lane .worker-lane__badge');
    expect(badge.textContent?.trim()).toBe('A-1 점유');
    const ghost = el(mount, '.worker-wait__lane .mon2-item--ghost');
    expect(ghost.getAttribute('data-bead-id')).toBe('A-1');
    expect(ghost.textContent).toContain('점유 중인 작업');
    expect(ghost.textContent).toContain('실행 중 · 점유');
    expect(ghost.hasAttribute('data-row-index')).toBe(false);
    expect(ghost.hasAttribute('data-queue-index')).toBe(false);
    expect(
      Array.from(
        mount.querySelectorAll('.worker-wait__lane [data-queue-index]')
      ).map((row) => row.getAttribute('data-bead-id'))
    ).toEqual(['A-2']);
  });

  test('names each repo serial lane with its repo', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }]
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(
      el(mount, '.worker-wait__lane .worker-pane__title').textContent?.trim()
    ).toBe('repo-a · 직렬 1');
  });

  test('asks the server for an empty draft lane with the current revision', async () => {
    const { mount, view, sent } = setup({
      workspaces,
      workspaces_state,
      cross_lanes: crossLanes([], 4)
    });

    view.load();
    click(mount, '.mon2-newlane');
    await flushMicrotasks();

    expect(sent).toEqual([
      {
        type: 'monitor-lane-create',
        payload: { entries: [], expected_revision: 4 }
      }
    ]);
  });

  test('disables + 연결 레인 while an empty draft already exists', () => {
    const { mount, view } = setup({
      workspaces,
      workspaces_state,
      cross_lanes: crossLanes([{ status: 'draft', entries: [] }])
    });

    view.load();

    expect(
      /** @type {HTMLButtonElement} */ (el(mount, '.mon2-newlane')).disabled
    ).toBe(true);
  });

  test('collapses an area and remembers it', () => {
    const { mount, view } = setup({ workspaces, workspaces_state });

    view.load();
    click(mount, '.worker-wait__area-toggle[data-area="parallel"]');

    expect(
      mount.querySelectorAll('.worker-wait__area--parallel .mon2-item')
    ).toHaveLength(0);
    expect(
      JSON.parse(
        window.localStorage.getItem('beads-ui.monitor.lane-collapsed') || '{}'
      ).areas
    ).toEqual({ parallel: true });
  });

  test('draws the unreadable line and disables lane ops when the store failed', () => {
    const { mount, view } = setup({
      workspaces,
      workspaces_state,
      cross_lanes: null
    });

    view.load();

    expect(el(mount, '.mon2-clane__unreadable').textContent?.trim()).toBe(
      '연결 레인 저장소를 읽을 수 없음'
    );
    expect(
      /** @type {HTMLButtonElement} */ (el(mount, '.mon2-newlane')).disabled
    ).toBe(true);
  });

  test('leaves no 🔗 popover behind', () => {
    const { mount, view } = setup({ workspaces, workspaces_state });

    view.load();

    expect(el(mount, '.mon-link')).toBeNull();
    expect(el(mount, '.mon2-chains')).toBeNull();
    expect(el(mount, '.mon2-item__ops')).toBeNull();
  });

  test('disables lane ops when the server sends no cross_lanes key', () => {
    const { mount, view } = setup({ workspaces, workspaces_state });

    view.load();

    expect(el(mount, '.mon2-clane')).toBeNull();
    expect(el(mount, '.mon2-clane__unreadable')).toBeNull();
    expect(
      /** @type {HTMLButtonElement} */ (el(mount, '.mon2-newlane')).disabled
    ).toBe(true);
  });

  test('draws the 확정 badge and the row order of a confirmed lane', () => {
    const { mount, view } = setup({
      workspaces,
      workspaces_state,
      cross_lanes
    });

    view.load();

    expect(el(mount, '.mon2-clane__badge').textContent?.trim()).toBe('확정');
    expect(
      Array.from(mount.querySelectorAll('.mon2-crow__seq')).map((seq) =>
        seq.textContent?.trim()
      )
    ).toEqual(['①', '②']);
  });

  test('offers 확정 only once a draft holds two members', () => {
    const { mount, view } = setup({
      workspaces,
      workspaces_state,
      cross_lanes: crossLanes([
        { status: 'draft', entries: [{ bead_id: 'A-1' }] }
      ])
    });

    view.load();

    expect(el(mount, '.mon2-clane__badge').textContent?.trim()).toBe('draft');
    expect(
      /** @type {HTMLButtonElement} */ (el(mount, '.mon2-clane__confirm'))
        .disabled
    ).toBe(true);
  });

  test('draws 재적용 only when a confirmed lane has a mismatch', () => {
    const { mount, view } = setup({
      workspaces,
      workspaces_state,
      // B-1은 A-1을 blocker로 들고 있으므로 어긋남이 없다.
      cross_lanes
    });

    view.load();

    expect(el(mount, '.mon2-clane__reapply')).toBeNull();
    expect(el(mount, '.mon2-crow__mismatch')).toBeNull();
  });

  test('marks a mismatched member and offers 재적용', () => {
    const { mount, view } = setup({
      workspaces,
      workspaces_state,
      cross_lanes: crossLanes([
        {
          entries: [{ bead_id: 'B-1', root_dir: WS_B }, { bead_id: 'A-1' }]
        }
      ])
    });

    view.load();

    expect(el(mount, '.mon2-crow__mismatch').textContent?.trim()).toBe(
      '⚠ 의존 없음'
    );
    expect(el(mount, '.mon2-clane__reapply')).not.toBeNull();
  });

  test('draws no route chip and no 선행 chip on a lane row', () => {
    const { mount, view } = setup({
      workspaces,
      workspaces_state,
      cross_lanes
    });

    view.load();

    expect(el(mount, '.mon2-crow .ctl-chip--route')).toBeNull();
    expect(el(mount, '.mon2-crow .worker-dep--pred')).toBeNull();
    expect(el(mount, '.mon2-crow .mon-overlap__chip')).toBeNull();
  });
});

describe('views/monitor id copy (UI-eey2 §11)', () => {
  test('copies the bead id and does not open the detail', async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true
    });
    const { mount, view, gotoIssue } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1' }] })],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '#monitor-queue .worker-mini__id');
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith('A-1');
    expect(gotoIssue).not.toHaveBeenCalled();
  });
});

describe('views/monitor repo badge navigation (UI-eey2 §11)', () => {
  test('switches workspace and goes to the Worker tab from a section link', async () => {
    const { mount, view, switchWorkspace, gotoView } = setup({
      workspaces: [
        workspace({
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }]
        })
      ],
      workspaces_state: [state()],
      current: WS_B
    });

    view.load();
    click(mount, '#monitor-queue .mon2-sec__worker');
    await Promise.resolve();
    await Promise.resolve();

    expect(switchWorkspace).toHaveBeenCalledWith(WS_A);
    expect(gotoView).toHaveBeenCalledWith('worker');
  });

  test('goes to the Worker tab from a running tile repo badge', async () => {
    const { mount, view, gotoView } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 500
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.rtile__repo');
    await Promise.resolve();

    expect(gotoView).toHaveBeenCalledWith('worker');
  });

  test('stays put when the workspace switch fails', async () => {
    const { mount, view, gotoView } = setup({
      workspaces: [
        workspace({
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }]
        })
      ],
      workspaces_state: [state()],
      current: WS_B,
      switchWorkspace: vi.fn(() => Promise.reject(new Error('nope')))
    });

    view.load();
    click(mount, '#monitor-queue .mon2-sec__worker');
    await Promise.resolve();
    await Promise.resolve();

    expect(gotoView).not.toHaveBeenCalled();
  });
});

describe('views/monitor card click (UI-nprg)', () => {
  test('opens a card of the current workspace immediately', () => {
    const { mount, view, gotoIssue, switchWorkspace } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1' }] })],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '#monitor-queue .worker-mini__title');

    expect(switchWorkspace).not.toHaveBeenCalled();
    expect(gotoIssue).toHaveBeenCalledWith('A-1');
  });

  test('switches workspace before opening a card of another repo', async () => {
    const { mount, view, gotoIssue, switchWorkspace } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1' }] })],
      workspaces_state: [state()],
      current: WS_B
    });

    view.load();
    click(mount, '#monitor-queue .worker-mini__title');
    await Promise.resolve();
    await Promise.resolve();

    expect(switchWorkspace).toHaveBeenCalledWith(WS_A);
    expect(gotoIssue).toHaveBeenCalledWith('A-1');
  });

  test('does not open the issue when an action button is clicked', () => {
    const { mount, view, gotoIssue, sent } = setup({
      workspaces: [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }],
          pr_observations: {
            'A-1': {
              pr: { number: 5, url: 'http://x' },
              gate: { tier: 'ready', enabled: true, gate_badge: 'ok' }
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.worker-mini__merge');

    expect(gotoIssue).not.toHaveBeenCalled();
    expect(sent[0].type).toBe('worker-merge-queue-add');
  });
});

describe('views/monitor mutations carry their own repo (UI-qrfo §5)', () => {
  test('sends the repo root and revision of the row it acted on', () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({ root_dir: WS_B, name: 'repo-b', revision: 7 }),
        workspace({
          queue: [{ bead_id: 'A-1' }],
          revise_parked: { 'A-1': { notes_tail: 'n' } }
        })
      ],
      workspaces_state: [
        state({
          root_dir: WS_B,
          name: 'repo-b',
          revision: 7,
          issue_prefix: 'B'
        }),
        state({ revision: 4 })
      ]
    });

    view.load();
    click(mount, '.worker-mini__revise-approve');

    expect(sent[0]).toEqual({
      type: 'worker-revise-approve',
      payload: { bead_id: 'A-1', root_dir: WS_A, expected_revision: 4 }
    });
  });

  test('retries once with the revision the conflict reply reported', async () => {
    /** @type {number[]} */
    const calls = [];
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          runnable: [{ bead_id: 'A-9', title: 'cand' }]
        })
      ],
      workspaces_state: [state({ revision: 4 })],
      transport: async (type, payload) => {
        calls.push(payload.expected_revision);
        return calls.length === 1
          ? { conflict: true, queue: { revision: 11 } }
          : { ok: true };
      }
    });

    view.load();
    const card = el(mount, '#monitor-queue .worker-mini');
    fireDrag(card, 'dragstart');
    fireDrag(el(mount, '#monitor-runnable .mon2-sec__body'), 'drop');
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(calls).toEqual([4, 11]);
  });

  test('pauses the running attempt of the tile it was clicked on', () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 100,
              session_id: 's'
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.rtile__pause');

    expect(sent[0]).toEqual({
      type: 'worker-attempt-pause',
      payload: { attempt_id: 't1', root_dir: WS_A }
    });
  });

  test('sends the bulk merge once per repo holding a PR', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({ pr_wait: [{ bead_id: 'A-1' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          revision: 2,
          pr_wait: [{ bead_id: 'B-1' }]
        })
      ],
      workspaces_state: [
        state(),
        state({
          root_dir: WS_B,
          name: 'repo-b',
          revision: 2,
          issue_prefix: 'B'
        })
      ]
    });

    view.load();
    click(mount, '.mon-merge-all');
    await Promise.resolve();
    await Promise.resolve();

    expect(sent.map((s) => s.payload.root_dir)).toEqual([WS_A, WS_B]);
    expect(sent.every((s) => s.type === 'worker-merge-queue-add-all')).toBe(
      true
    );
  });

  test('uses the shared unmerged confirmation for a running discard', () => {
    const { mount, view, sent, confirmFn } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 100,
              session_id: 's'
            }
          },
          discard_operations: {}
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    const button = el(mount, '.rtile__discard');
    if (button) {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(confirmFn).toHaveBeenCalled();
      expect(sent[0].type).toBe('worker-discard');
    } else {
      expect(button).toBeNull();
    }
  });

  test('opens failed detail from the badge and closes it outside', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'failed',
              cause: 'runner_exit',
              session_id: 's'
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.rtile__failure-badge');
    expect(mount.querySelector('.rtile__failure-pop')).not.toBeNull();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelector('.rtile__failure-pop')).toBeNull();
  });

  test('uses the failed projection confirmation for discard', () => {
    const confirmFn = vi.fn(() => false);
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'failed',
              cause: 'runner_exit',
              session_id: 's',
              merge_sha: 'a'.repeat(40)
            }
          }
        })
      ],
      workspaces_state: [state()],
      confirm: confirmFn
    });

    view.load();
    click(mount, '.rtile__discard');

    expect(confirmFn).toHaveBeenCalledWith(
      expect.stringContaining('revert PR')
    );
    expect(sent).toEqual([]);
  });

  test('sends no attempt-dismiss request from a failed tile', () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'failed',
              cause: 'runner_exit',
              session_id: 's'
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(mount.querySelector('.rtile__dismiss')).toBeNull();
    expect(
      sent.some((message) => message.type === 'worker-attempt-dismiss')
    ).toBe(false);
  });

  // 같은 렌더러를 쓰는 두 탭은 같은 사실을 같은 모양으로 그린다 (ADR 14):
  // 파킹 투영이 빠지면 기다리는 세션이 모니터에서만 돌아가는 시계를 얻는다.
  test('renders a parked attempt as a waiting tile, not a running one', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'parked',
              started_at: NOW - 100,
              cause: 'session_parked',
              cause_detail: { summary: '사용자 결정 대기' }
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const tile = el(mount, '.rtile[data-attempt-id="t1"]');
    expect(tile?.querySelector('.rtile__held-badge')?.textContent).toBe(
      '⏸ 세션 대기'
    );
    expect(tile?.querySelector('.rtile__held-summary')?.textContent).toBe(
      '사용자 결정 대기'
    );
    expect(tile?.querySelector('.rtile__elapsed')?.textContent).toBe(
      '세션 대기'
    );
    expect(tile?.querySelector('.rtile__pause')).toBeNull();
    expect(tile?.querySelector('.rtile__session')).toBeNull();
  });

  test('sends the parked retry from the monitor tile', () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'parked',
              cause: 'session_parked',
              cause_detail: { summary: '사용자 결정 대기' }
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.rtile__parked-retry');

    expect(sent[0].type).toBe('worker-parked-retry');
    expect(sent[0].payload).toMatchObject({
      bead_id: 'A-1',
      attempt_id: 't1'
    });
  });

  test('badges a retry_wait attempt with its backoff counts', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'retry_wait',
              started_at: NOW - 100,
              retry: {
                cause: 'session_failed:is_error',
                attempts: 2,
                max: 3,
                next_at: null
              }
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const tile = el(mount, '.rtile[data-attempt-id="t1"]');
    expect(tile?.querySelector('.rtile__held-badge')?.textContent).toBe(
      '↻ 재시도 대기 2/3'
    );
    expect(tile?.querySelector('.rtile__parked-retry')).toBeNull();
  });
});

describe('views/monitor [대기로 ↴] lane menu (UI-e6hw §6)', () => {
  /**
   * @returns {ReturnType<typeof setup>}
   */
  function menuSetup() {
    return setup(menuInput());
  }

  /**
   * @returns {Parameters<typeof setup>[0]}
   */
  function menuInput() {
    return {
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'B-1', root_dir: WS_B }] }
      ]),
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-9', title: 'cand' }],
          queue: [{ bead_id: 'A-1' }],
          serial_lane_count: 2,
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-2' }] }]
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }],
          bead_blocked_by: { 'B-1': ['A-1'] }
        })
      ],
      workspaces_state: [
        state(),
        state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
      ]
    };
  }

  test('offers the parallel area, every chain lane, a new lane and its own serial lanes', () => {
    const { mount, view } = menuSetup();

    view.load();
    click(mount, '#monitor-runnable .worker-card__place');

    expect(
      Array.from(mount.querySelectorAll('.worker-card__place-lane')).map((b) =>
        b.getAttribute('data-lane')
      )
    ).toEqual(['parallel', 'lane:cl_1', 'new-lane', 'serial:s1', 'serial:s2']);
    expect(
      Array.from(mount.querySelectorAll('.worker-card__place-lane span')).map(
        (s) => s.textContent?.trim()
      )
    ).toContain('연결 1 (확정) 끝에');
  });

  test('groups the lane menu under 연결 레인 and the repo serial header', () => {
    const { mount, view } = menuSetup();

    view.load();
    click(mount, '#monitor-runnable .worker-card__place');

    expect(
      Array.from(mount.querySelectorAll('.worker-card__place-group')).map((g) =>
        g.textContent?.trim()
      )
    ).toEqual(['연결 레인', 'repo-a 직렬']);
  });

  test('places at the chosen serial lane tail', () => {
    const { mount, view, sent } = menuSetup();

    view.load();
    click(mount, '#monitor-runnable .worker-card__place');
    click(mount, '.worker-card__place-lane[data-lane="serial:s1"]');

    expect(sent[0]).toEqual({
      type: 'worker-queue-place',
      payload: {
        bead_id: 'A-9',
        lane: 's1',
        index: 1,
        root_dir: WS_A,
        expected_revision: 1
      }
    });
  });

  test('places at the parallel queue tail without a lane key', () => {
    const { mount, view, sent } = menuSetup();

    view.load();
    click(mount, '#monitor-runnable .worker-card__place');
    click(mount, '.worker-card__place-lane[data-lane="parallel"]');

    expect(sent[0].payload).toEqual({
      bead_id: 'A-9',
      index: 1,
      root_dir: WS_A,
      expected_revision: 1
    });
  });

  test('appends to the chosen lane by its server id', async () => {
    const { mount, view, sent } = setup({
      ...menuInput(),
      transport: async (type) =>
        type === 'monitor-lane-update' ? { revision: 2 } : null
    });

    view.load();
    click(mount, '#monitor-runnable .worker-card__place');
    click(mount, '.worker-card__place-lane[data-lane="lane:cl_1"]');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual([
      'monitor-lane-update',
      'dep-add',
      'worker-queue-place'
    ]);
    expect(sent[0].payload).toEqual({
      lane_id: 'cl_1',
      entries: [
        { bead_id: 'B-1', root_dir: WS_B },
        { bead_id: 'A-9', root_dir: WS_A }
      ],
      expected_revision: 1
    });
  });

  test('seeds a fresh draft lane from the new-lane item', async () => {
    const { mount, view, sent } = menuSetup();

    view.load();
    click(mount, '#monitor-runnable .worker-card__place');
    click(mount, '.worker-card__place-lane[data-lane="new-lane"]');
    await flushMicrotasks();

    expect(sent).toEqual([
      {
        type: 'monitor-lane-create',
        payload: {
          entries: [{ bead_id: 'A-9', root_dir: WS_A }],
          expected_revision: 1
        }
      }
    ]);
  });

  test('closes the menu on cancel without sending anything', () => {
    const { mount, view, sent } = menuSetup();

    view.load();
    click(mount, '#monitor-runnable .worker-card__place');
    click(mount, '.worker-card__place-cancel');

    expect(mount.querySelectorAll('.worker-card__place-lane')).toHaveLength(0);
    expect(sent).toEqual([]);
  });

  test('offers the only configured serial lane even when it is empty', () => {
    // 빈 단일 직렬 레인은 pane이 접히므로, 모바일 메뉴가 유일한 적재 경로다.
    const { mount, view } = setup({
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-9', title: 'cand' }],
          serial_lane_count: 1,
          serial_lanes: [{ id: 's1', entries: [] }]
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '#monitor-runnable .worker-card__place');

    expect(
      Array.from(mount.querySelectorAll('.worker-card__place-lane')).map((b) =>
        b.getAttribute('data-lane')
      )
    ).toContain('serial:s1');
  });
});

describe('views/monitor drag and drop (UI-e6hw §5)', () => {
  /**
   * @param {{ queue?: any[], serial_lane_count?: number, serial_lanes?: any[], attempts?: any }} [patch]
   */
  function dragSetup(patch = {}) {
    return setup({
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-9', title: 'cand' }],
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          ...patch
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          revision: 5,
          queue: [{ bead_id: 'B-1' }],
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'B-2' }] }]
        })
      ],
      workspaces_state: [
        state(),
        state({
          root_dir: WS_B,
          name: 'repo-b',
          revision: 5,
          issue_prefix: 'B'
        })
      ]
    });
  }

  test('marks the root while a drag is in flight so empty lanes can open', () => {
    const { mount, view } = dragSetup();

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    expect(el(mount, '.mon').classList.contains('is-dragging')).toBe(true);

    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragend');
    expect(el(mount, '.mon').classList.contains('is-dragging')).toBe(false);
  });

  test('shows no drop target on another repo serial lane', () => {
    const { mount, view, sent } = dragSetup();

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    const other = Array.from(
      mount.querySelectorAll('[data-drop="repo-serial"]')
    ).find((zone) => zone.getAttribute('data-root-dir') === WS_B);
    const ev = fireDrag(/** @type {Element} */ (other), 'drop');

    expect(ev.defaultPrevented).toBe(false);
    expect(sent).toEqual([]);
  });

  test('places a candidate at the raw queue index of the row it was dropped before', async () => {
    const { mount, view, sent } = dragSetup({
      attempts: {
        t1: {
          attempt_id: 't1',
          bead_id: 'A-1',
          status: 'running',
          started_at: 1
        }
      }
    });

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    // A-1은 실행중으로 빠져 DOM에 없다 — A-2의 raw index는 여전히 1이다.
    fireDrag(el(mount, '#monitor-queue .mon2-item .worker-mini'), 'drop');
    await flushMicrotasks();

    expect(sent[0]).toEqual({
      type: 'worker-queue-place',
      payload: {
        bead_id: 'A-9',
        index: 1,
        root_dir: WS_A,
        expected_revision: 1
      }
    });
  });

  test('places a candidate at the raw queue length when dropped past the last row', async () => {
    const { mount, view, sent } = dragSetup();

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    fireDrag(el(mount, '[data-drop="parallel"]'), 'drop');
    await flushMicrotasks();

    expect(sent[0].payload.index).toBe(2);
  });

  test('places a candidate into a serial lane with its lane id', async () => {
    const { mount, view, sent } = dragSetup({
      serial_lane_count: 2,
      serial_lanes: [{ id: 's1', entries: [] }]
    });

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    const zone = Array.from(
      mount.querySelectorAll('[data-drop="repo-serial"]')
    ).find((z) => z.getAttribute('data-lane-id') === 's2');
    fireDrag(/** @type {Element} */ (zone), 'drop');
    await flushMicrotasks();

    expect(sent[0]).toEqual({
      type: 'worker-queue-place',
      payload: {
        bead_id: 'A-9',
        lane: 's2',
        index: 0,
        root_dir: WS_A,
        expected_revision: 1
      }
    });
  });

  test('reorders inside the same lane with the removal correction', async () => {
    const { mount, view, sent } = dragSetup();

    view.load();
    const rows = mount.querySelectorAll('#monitor-queue .mon2-item');
    fireDrag(rows[1].querySelector('.worker-mini'), 'dragstart');
    fireDrag(rows[0].querySelector('.worker-mini'), 'drop');
    await flushMicrotasks();

    expect(sent[0]).toEqual({
      type: 'worker-queue-reorder',
      payload: {
        bead_id: 'A-2',
        to_index: 0,
        root_dir: WS_A,
        expected_revision: 1
      }
    });
  });

  test('removes a waiting row dragged back to its own candidate section', async () => {
    const { mount, view, sent } = dragSetup();

    view.load();
    fireDrag(el(mount, '#monitor-queue .mon2-item .worker-mini'), 'dragstart');
    fireDrag(el(mount, '#monitor-runnable .mon2-sec__body'), 'drop');
    await flushMicrotasks();

    expect(sent[0]).toEqual({
      type: 'worker-queue-remove',
      payload: { bead_id: 'A-1', root_dir: WS_A, expected_revision: 1 }
    });
  });

  test('sends nothing when a waiting row is dropped on itself', async () => {
    const { mount, view, sent } = dragSetup();

    view.load();
    const row = el(mount, '#monitor-queue .mon2-item .worker-mini');
    fireDrag(row, 'dragstart');
    fireDrag(row, 'drop');
    await flushMicrotasks();

    expect(sent).toEqual([]);
  });

  test('removes a parallel row from its own ✕ (§6)', async () => {
    const { mount, view, sent } = dragSetup();

    view.load();
    click(mount, '.worker-wait__area--parallel .worker-mini__rowops-remove');
    await flushMicrotasks();

    expect(sent[0]).toEqual({
      type: 'worker-queue-remove',
      payload: { bead_id: 'A-1', root_dir: WS_A, expected_revision: 1 }
    });
  });

  test('moves a parallel row down between its own repo rows (§6)', async () => {
    const { mount, view, sent } = dragSetup();

    view.load();
    click(mount, '.worker-wait__area--parallel .worker-mini__rowops-down');
    await flushMicrotasks();

    expect(sent[0]).toEqual({
      type: 'worker-queue-reorder',
      payload: {
        bead_id: 'A-1',
        to_index: 1,
        root_dir: WS_A,
        expected_revision: 1
      }
    });
  });

  test('splices a chain row out from its ✕ with the lane update between the dep ops', async () => {
    const { mount, view, sent } = setup({
      cross_lanes: crossLanes([
        {
          entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }, { bead_id: 'A-3' }]
        }
      ]),
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }, { bead_id: 'A-3' }],
          bead_blocked_by: { 'A-2': ['A-1'], 'A-3': ['A-2'] }
        })
      ],
      workspaces_state: [state()],
      transport: async (type) =>
        type === 'monitor-lane-update' ? { revision: 2 } : null
    });

    view.load();
    click(mount, '.mon2-crow[data-bead-id="A-2"] .mon2-crow__detach');
    await flushMicrotasks();

    // UI-jaua §7.2: 빠지는 멤버의 `disarm`이 `dep-remove` 뒤·레인 op 앞에 서고,
    // 이어 붙인 쌍은 §7.1 2단계가 `true`로 올린다.
    expect(sent).toEqual([
      { type: 'dep-remove', payload: { a: 'A-2', b: 'A-1', root_dir: WS_A } },
      { type: 'dep-remove', payload: { a: 'A-3', b: 'A-2', root_dir: WS_A } },
      {
        type: 'worker-queue-disarm',
        payload: {
          bead_ids: ['A-2'],
          lane_id: 'cl_1',
          root_dir: WS_A,
          expected_revision: 1
        }
      },
      {
        type: 'monitor-lane-update',
        payload: {
          lane_id: 'cl_1',
          entries: [
            { bead_id: 'A-1', root_dir: WS_A },
            { bead_id: 'A-3', root_dir: WS_A }
          ],
          expected_revision: 1
        }
      },
      { type: 'dep-add', payload: { a: 'A-3', b: 'A-1', root_dir: WS_A } },
      {
        type: 'monitor-lane-provenance',
        payload: {
          lane_id: 'cl_1',
          pairs: [{ bead_id: 'A-3', after: 'A-1', value: true }],
          expected_revision: 2
        }
      }
    ]);
  });

  test('swallows only the first click after a drop, then opens normally', () => {
    const { mount, view, gotoIssue } = dragSetup();

    view.load();
    const row = el(mount, '#monitor-queue .mon2-item .worker-mini');
    fireDrag(row, 'dragstart');
    fireDrag(row, 'drop');
    el(mount, '#monitor-queue .worker-mini__title').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    expect(gotoIssue).not.toHaveBeenCalled();

    el(mount, '#monitor-queue .worker-mini__title').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    expect(gotoIssue).toHaveBeenCalledWith('A-1');
  });
});

describe('views/monitor running tile detail (UI-eey2 §7)', () => {
  test('draws the last activity and the live delegation without a stepper', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          bead_workflow: {
            'A-1': {
              route: 'spec_backed',
              stages: { spec: { fill: 'full' }, impl: {}, pr: {}, merge: {} }
            }
          },
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 60_000,
              session_id: 's',
              last_activity: {
                at: NOW - 41_000,
                kind: 'tool',
                text: '⚡ npm test — 통과 41'
              },
              legs: [
                { label: '구현 unit 3 · codex', state: 'live' },
                { label: 'review-consult · codex', state: 'done' }
              ]
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const tile = el(mount, '#monitor-running .rtile');
    expect(tile.querySelector('.stp')).toBeNull();
    expect(tile.querySelector('.rtile__activity-text')?.textContent).toContain(
      'npm test'
    );
    expect(tile.querySelector('.rtile__leg--live')?.textContent).toContain(
      '위임 중 · 구현 unit 3'
    );
    expect(tile.querySelector('.rtile__leg--done')?.textContent).toContain(
      '위임 완료 1'
    );
  });

  test('omits every detail line the server said nothing about', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 1000
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const tile = el(mount, '#monitor-running .rtile');
    expect(tile.querySelector('.stp')).toBeNull();
    expect(tile.querySelector('.rtile__activity')).toBeNull();
    expect(tile.querySelector('.rtile__legs')).toBeNull();
    expect(tile.querySelector('.rtile__repo')).toBeTruthy();
  });
});

describe('views/monitor session drawer (UI-eey2 §7)', () => {
  test('subscribes to the session log of the tile repo', () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 100,
              session_id: 's'
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.rtile__session');

    const subscribe = sent.find((s) => s.type === 'subscribe-session-log');
    expect(subscribe?.payload).toMatchObject({
      attempt_id: 't1',
      root_dir: WS_A
    });
    expect(el(mount, '.mon2-drawer')?.children.length).toBeGreaterThan(0);
  });

  test('opens the drawer in the same overlay modal the Worker tab uses', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 100,
              session_id: 's'
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.rtile__session');

    const overlay = /** @type {HTMLElement} */ (
      el(mount, '.worker-drawer-overlay')
    );
    expect(overlay.hidden).toBe(false);
    expect(el(overlay, '.worker-drawer-overlay__backdrop')).toBeTruthy();
    expect(
      el(mount, '.mon2-drawer')?.classList.contains('worker-drawer-host')
    ).toBe(true);
  });

  test('hides the overlay again when the drawer closes', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 100,
              session_id: 's'
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.rtile__session');
    click(mount, '.sv__close');

    const overlay = /** @type {HTMLElement} */ (
      el(mount, '.worker-drawer-overlay')
    );
    expect(overlay.hidden).toBe(true);
  });
});

describe('views/monitor dependency editing (UI-2gi1 §6.5, UI-e6hw §5)', () => {
  test('draws no release button on the card chip itself', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-2', title: 'blocked', blocked_by: ['A-0'] }]
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(el(mount, '#monitor-runnable .worker-dep--pred')).not.toBeNull();
    expect(mount.querySelector('.worker-dep__remove')).toBeNull();
  });

  test('sends one drop in the dep-remove → lane → dep-add → queue order', async () => {
    const { mount, view, sent } = setup({
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'B-1', root_dir: WS_B }] }
      ]),
      transport: async (type) =>
        type === 'monitor-lane-update' ? { revision: 2 } : null,
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-9', title: 'cand' }],
          queue: [{ bead_id: 'A-1' }]
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }],
          bead_blocked_by: { 'B-1': ['A-1'] }
        })
      ],
      workspaces_state: [
        state(),
        state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
      ]
    });

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    fireDrag(el(mount, '[data-drop="chain"]'), 'drop');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual([
      'monitor-lane-update',
      'dep-add',
      'worker-queue-place'
    ]);
    expect(sent[1].payload).toEqual({ a: 'A-9', b: 'B-1', root_dir: WS_A });
    expect(sent[2].payload).toEqual({
      bead_id: 'A-9',
      index: 1,
      root_dir: WS_A,
      expected_revision: 1
    });
  });

  test('stops at the first failing op of a drop', async () => {
    const { mount, view, sent } = setup({
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'B-1', root_dir: WS_B }] }
      ]),
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-9', title: 'cand' }],
          queue: [{ bead_id: 'A-1' }]
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }],
          bead_blocked_by: { 'B-1': ['A-1'] }
        })
      ],
      workspaces_state: [
        state(),
        state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
      ],
      transport: async (type) => {
        if (type === 'dep-add') {
          throw new Error('bd: cycle detected');
        }
        return type === 'monitor-lane-update' ? { revision: 2 } : null;
      }
    });

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    fireDrag(el(mount, '[data-drop="chain"]'), 'drop');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual(['monitor-lane-update', 'dep-add']);
    expect(idsIn(mount, 'runnable')).toEqual(['A-9']);
  });

  test('refuses a repo serial row dropped on a chain lane', async () => {
    const { mount, view, sent } = setup({
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'B-1', root_dir: WS_B }] }
      ]),
      workspaces: [
        workspace({
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-3' }] }],
          queue: [{ bead_id: 'A-1' }]
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }],
          bead_blocked_by: { 'B-1': ['A-1'] }
        })
      ],
      workspaces_state: [
        state(),
        state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
      ]
    });

    view.load();
    fireDrag(
      el(mount, '[data-drag-kind="repo-serial"] .worker-mini'),
      'dragstart'
    );
    fireDrag(el(mount, '[data-drop="chain"]'), 'drop');
    await flushMicrotasks();

    expect(sent).toEqual([]);
  });

  test('stops the plan when the queue op is refused by admission', async () => {
    // 입장 거부는 CAS 충돌이 아니라 `applied:false`로 온다 — 조용히 지나가면
    // 앞선 의존 op만 남은 상태가 설명 없이 보인다 (§7).
    const { mount, view, sent } = setup({
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'B-1', root_dir: WS_B }] }
      ]),
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-9', title: 'cand' }],
          queue: [{ bead_id: 'A-1' }]
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }],
          bead_blocked_by: { 'B-1': ['A-1'] }
        })
      ],
      workspaces_state: [
        state(),
        state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
      ],
      transport: async (type) =>
        type === 'worker-queue-place'
          ? { applied: false, conflict: false, admission_reason: 'no_spec' }
          : type === 'monitor-lane-update'
            ? { revision: 2 }
            : null
    });

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    fireDrag(el(mount, '[data-drop="chain"]'), 'drop');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual([
      'monitor-lane-update',
      'dep-add',
      'worker-queue-place'
    ]);
    expect(
      Array.from(document.querySelectorAll('.toast')).map(
        (node) => node.textContent
      )
    ).toContain('큐 적재 거부: no_spec');
  });
});

describe('monitor 레인 op 전송 순서와 충돌 재계획 (UI-j92s §5.5)', () => {
  const workspaces = [
    workspace({
      runnable: [{ bead_id: 'A-9', title: 'cand', spec_id: 'docs/a.md' }],
      queue: [{ bead_id: 'A-1' }]
    }),
    workspace({
      root_dir: WS_B,
      name: 'repo-b',
      queue: [{ bead_id: 'B-1' }]
    })
  ];
  const workspaces_state = [
    state(),
    state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
  ];

  /** The lane the conflict reply says is now stored. */
  const FRESH = {
    revision: 9,
    lanes: [
      {
        id: 'cl_1',
        status: 'confirmed',
        created_at: '2026-08-25T00:00:00.000Z',
        entries: [{ bead_id: 'A-1', root_dir: WS_A }]
      }
    ]
  };

  /**
   * @param {(type: string, payload: any) => Promise<any>} transport
   * @returns {ReturnType<typeof setup>}
   */
  function conflictSetup(transport) {
    return setup({
      workspaces,
      workspaces_state,
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'B-1', root_dir: WS_B }] }
      ]),
      transport
    });
  }

  test('re-plans on the cross_lanes the conflict carried and retries once', async () => {
    let lane_calls = 0;
    const { mount, view, sent } = conflictSetup(async (type) => {
      if (type !== 'monitor-lane-update') {
        return null;
      }
      lane_calls += 1;
      if (lane_calls === 1) {
        throw {
          code: 'conflict',
          message: 'revision mismatch',
          details: { cross_lanes: FRESH }
        };
      }
      return { revision: 10 };
    });

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    fireDrag(el(mount, '[data-drop="chain"]'), 'drop');
    await flushMicrotasks();

    const updates = sent.filter((m) => m.type === 'monitor-lane-update');
    expect(updates.map((m) => m.payload)).toEqual([
      {
        lane_id: 'cl_1',
        entries: [
          { bead_id: 'B-1', root_dir: WS_B },
          { bead_id: 'A-9', root_dir: WS_A }
        ],
        expected_revision: 1
      },
      {
        lane_id: 'cl_1',
        entries: [
          { bead_id: 'A-1', root_dir: WS_A },
          { bead_id: 'A-9', root_dir: WS_A }
        ],
        expected_revision: 9
      }
    ]);
  });

  test('recomputes the dependency ops from the latest lane too', async () => {
    let lane_calls = 0;
    const { mount, view, sent } = conflictSetup(async (type) => {
      if (type !== 'monitor-lane-update') {
        return null;
      }
      lane_calls += 1;
      if (lane_calls === 1) {
        throw {
          code: 'conflict',
          message: 'revision mismatch',
          details: { cross_lanes: FRESH }
        };
      }
      return { revision: 10 };
    });

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    fireDrag(el(mount, '[data-drop="chain"]'), 'drop');
    await flushMicrotasks();

    // 옛 레인의 선행은 B-1이었고 최신 레인의 선행은 A-1이다.
    expect(
      sent.filter((m) => m.type === 'dep-add').map((m) => m.payload)
    ).toEqual([{ a: 'A-9', b: 'A-1', root_dir: WS_A }]);
  });

  test('stops after a second conflict and says the lane moved elsewhere', async () => {
    const { mount, view, sent } = conflictSetup(async (type) => {
      if (type !== 'monitor-lane-update') {
        return null;
      }
      throw {
        code: 'conflict',
        message: 'revision mismatch',
        details: { cross_lanes: FRESH }
      };
    });

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    fireDrag(el(mount, '[data-drop="chain"]'), 'drop');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual([
      'monitor-lane-update',
      'monitor-lane-update'
    ]);
    expect(
      Array.from(document.querySelectorAll('.toast')).map(
        (node) => node.textContent
      )
    ).toContain('레인이 다른 곳에서 바뀌었습니다');
  });

  test('moves a bead between lanes with the revision threaded across both ops', async () => {
    let revision = 4;
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }, { bead_id: 'A-3' }]
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes(
        [
          {
            status: 'draft',
            entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
          },
          { status: 'draft', entries: [{ bead_id: 'A-3' }] }
        ],
        4
      ),
      transport: async (type) => {
        if (type !== 'monitor-lane-update') {
          return null;
        }
        revision += 1;
        return { revision };
      }
    });

    view.load();
    fireDrag(el(mount, '.mon2-crow[data-bead-id="A-2"]'), 'dragstart');
    fireDrag(
      el(mount, '.mon2-clane[data-lane-id="cl_2"] [data-drop="chain"]'),
      'drop'
    );
    await flushMicrotasks();

    expect(sent.map((m) => m.payload)).toEqual([
      {
        lane_id: 'cl_1',
        entries: [{ bead_id: 'A-1', root_dir: WS_A }],
        expected_revision: 4
      },
      {
        lane_id: 'cl_2',
        entries: [
          { bead_id: 'A-3', root_dir: WS_A },
          { bead_id: 'A-2', root_dir: WS_A }
        ],
        expected_revision: 5
      }
    ]);
  });

  test('threads the revision through several queue ops of one repo', async () => {
    /** @type {number[]} */
    const revisions = [];
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          runnable: [
            { bead_id: 'A-8', title: '앞', spec_id: 'docs/a.md' },
            { bead_id: 'A-9', title: '뒤', spec_id: 'docs/b.md' }
          ]
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        {
          status: 'draft',
          entries: [{ bead_id: 'A-8' }, { bead_id: 'A-9' }]
        }
      ]),
      transport: async (type, payload) => {
        if (type === 'monitor-lane-confirm') {
          return { revision: 2 };
        }
        if (type === 'worker-queue-place') {
          revisions.push(payload.expected_revision);
          return { applied: true, queue: { revision: 7 + revisions.length } };
        }
        return null;
      }
    });

    view.load();
    click(mount, '.mon2-clane__confirm');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual([
      'monitor-lane-confirm',
      'dep-add',
      'worker-queue-place',
      'worker-queue-place',
      // UI-jaua §7.1 2단계: 성공한 `dep-add`의 쌍만 `true`로 올린다.
      'monitor-lane-provenance'
    ]);
    expect(revisions).toEqual([1, 8]);
  });

  test('leaves 재적용 as the recovery when a dep-add fails after the lane op', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          runnable: [
            { bead_id: 'A-8', title: '앞', spec_id: 'docs/a.md' },
            { bead_id: 'A-9', title: '뒤', spec_id: 'docs/b.md' }
          ]
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        {
          status: 'draft',
          entries: [{ bead_id: 'A-8' }, { bead_id: 'A-9' }]
        }
      ]),
      transport: async (type) => {
        if (type === 'monitor-lane-confirm') {
          return { revision: 2 };
        }
        if (type === 'dep-add') {
          throw new Error('bd: dep add refused');
        }
        return null;
      }
    });

    view.load();
    click(mount, '.mon2-clane__confirm');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual([
      'monitor-lane-confirm',
      'dep-add'
    ]);
    expect(
      Array.from(document.querySelectorAll('.toast')).map(
        (node) => node.textContent
      )
    ).toContain('bd: dep add refused');
  });

  test('재적용 re-adds the missing dep and loads the unplaced member', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          runnable: [
            { bead_id: 'A-8', title: '앞', spec_id: 'docs/a.md' },
            { bead_id: 'A-9', title: '뒤', spec_id: 'docs/b.md' }
          ]
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'A-8' }, { bead_id: 'A-9' }] }
      ]),
      transport: async () => ({ applied: true, queue: { revision: 5 } })
    });

    view.load();
    click(mount, '.mon2-clane__reapply');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual([
      'dep-add',
      'worker-queue-place',
      'worker-queue-place',
      'monitor-lane-provenance'
    ]);
    expect(sent[0].payload).toEqual({ a: 'A-9', b: 'A-8', root_dir: WS_A });
  });

  test('confirms once before removing a confirmed lane and its dependencies', async () => {
    const confirmFn = vi.fn(() => true);
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-8' }, { bead_id: 'A-9' }],
          bead_blocked_by: { 'A-9': ['A-8'] }
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'A-8' }, { bead_id: 'A-9' }] }
      ]),
      confirm: confirmFn,
      transport: async (type) =>
        type === 'monitor-lane-remove' ? { revision: 2 } : null
    });

    view.load();
    click(mount, '.mon2-clane__remove');
    await flushMicrotasks();

    // UI-jaua §7.3: 문장이 어느 의존을 지우고 어느 것을 두는지 말한다.
    expect(confirmFn).toHaveBeenCalledWith(
      '연결 1을 지웁니다.\n함께 제거할 의존:\n  A-9 ← A-8'
    );
    expect(sent.map((m) => m.type)).toEqual([
      'dep-remove',
      'worker-queue-disarm',
      'monitor-lane-remove'
    ]);
  });

  test('deletes a draft lane without asking', async () => {
    const confirmFn = vi.fn(() => true);
    const { mount, view, sent } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-8' }] })],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        { status: 'draft', entries: [{ bead_id: 'A-8' }] }
      ]),
      confirm: confirmFn,
      transport: async () => ({ revision: 2 })
    });

    view.load();
    click(mount, '.mon2-clane__remove');
    await flushMicrotasks();

    expect(confirmFn).not.toHaveBeenCalled();
    expect(sent.map((m) => m.type)).toEqual(['monitor-lane-remove']);
  });

  // 전송 래퍼는 큐 op 오류를 `[]`로 삼킨다 (`app/main.js`). 그것을 성공으로
  // 읽으면 앞 op가 실패했는데도 뒤 op가 나가 부분 상태가 남는다 (§5.5·§7).
  test('stops the remaining queue ops when one comes back without a reply', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          runnable: [
            { bead_id: 'A-1', title: '첫', spec_id: 'docs/a.md' },
            { bead_id: 'A-2', title: '둘', spec_id: 'docs/b.md' }
          ]
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        {
          status: 'draft',
          entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }]
        }
      ]),
      transport: async (type) => {
        if (type === 'monitor-lane-confirm') {
          return { revision: 2 };
        }
        if (type === 'worker-queue-place') {
          return [];
        }
        return null;
      }
    });

    view.load();
    click(mount, '.mon2-clane__confirm');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual([
      'monitor-lane-confirm',
      'dep-add',
      'worker-queue-place'
    ]);
  });

  // `연결 n 끝에`는 좌표가 아니라 **끝**이다 (§5.4). 충돌 재계획이 최초 행 수를
  // 재사용하면 그 사이 늘어난 레인의 새 마지막 행 **앞**에 끼워 넣는다.
  test('recounts the lane tail when the place menu choice is re-planned', async () => {
    let lane_calls = 0;
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({ runnable: [{ bead_id: 'A-9', title: 'cand' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }, { bead_id: 'B-2' }]
        })
      ],
      workspaces_state: [
        state(),
        state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
      ],
      cross_lanes: crossLanes([
        { status: 'draft', entries: [{ bead_id: 'B-1', root_dir: WS_B }] }
      ]),
      transport: async (type) => {
        if (type !== 'monitor-lane-update') {
          return null;
        }
        lane_calls += 1;
        if (lane_calls === 1) {
          throw {
            code: 'conflict',
            message: 'revision mismatch',
            details: {
              cross_lanes: {
                revision: 9,
                lanes: [
                  {
                    id: 'cl_1',
                    status: 'draft',
                    created_at: '2026-08-25T00:00:00.000Z',
                    entries: [
                      { bead_id: 'B-1', root_dir: WS_B },
                      { bead_id: 'B-2', root_dir: WS_B }
                    ]
                  }
                ]
              }
            }
          };
        }
        return { revision: 10 };
      }
    });

    view.load();
    click(mount, '#monitor-runnable .worker-card__place');
    click(mount, '.worker-card__place-lane[data-lane="lane:cl_1"]');
    await flushMicrotasks();

    expect(
      sent
        .filter((m) => m.type === 'monitor-lane-update')
        .map((m) => m.payload.entries.map((/** @type {any} */ e) => e.bead_id))
    ).toEqual([
      ['B-1', 'A-9'],
      ['B-1', 'B-2', 'A-9']
    ]);
  });
});

describe('monitor 연결 레인 진행·정지 (UI-jaua §5.5·§9)', () => {
  test('places an unplaced member before arming its repo', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          runnable: [{ bead_id: 'A-2', title: '뒤' }]
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
      ]),
      transport: async () => ({ applied: true, queue: { revision: 5 } })
    });

    view.load();
    click(mount, '.mon2-clane__run');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual([
      'worker-queue-place',
      'worker-queue-arm'
    ]);
    expect(sent[1].payload).toEqual({
      bead_ids: ['A-1', 'A-2'],
      lane_id: 'cl_1',
      root_dir: WS_A,
      // 앞 op의 응답 revision이 다음 op의 CAS 값이다 (UI-j92s §5.5 규약).
      expected_revision: 5
    });
  });

  test('arms each member repo once', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({ queue: [{ bead_id: 'A-1' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          revision: 4,
          queue: [{ bead_id: 'B-1' }]
        })
      ],
      workspaces_state: [
        state(),
        state({
          root_dir: WS_B,
          name: 'repo-b',
          issue_prefix: 'B',
          revision: 4
        })
      ],
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'A-1' }, { bead_id: 'B-1', root_dir: WS_B }] }
      ]),
      transport: async () => ({ applied: true, queue: { revision: 9 } })
    });

    view.load();
    click(mount, '.mon2-clane__run');
    await flushMicrotasks();

    expect(sent.map((m) => [m.type, m.payload.root_dir])).toEqual([
      ['worker-queue-arm', WS_A],
      ['worker-queue-arm', WS_B]
    ]);
  });

  test('stops at the repo that refused the arm and names the recovery', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({ queue: [{ bead_id: 'A-1' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }]
        })
      ],
      workspaces_state: [
        state(),
        state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
      ],
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'A-1' }, { bead_id: 'B-1', root_dir: WS_B }] }
      ]),
      transport: async (_type, payload) =>
        payload.root_dir === WS_A
          ? { applied: false, queue: { revision: 2 } }
          : { applied: true, queue: { revision: 2 } }
    });

    view.load();
    click(mount, '.mon2-clane__run');
    await flushMicrotasks();

    expect(sent.map((m) => m.payload.root_dir)).toEqual([WS_A]);
    expect(
      Array.from(document.querySelectorAll('.toast')).map(
        (node) => node.textContent
      )
    ).toContain(
      '일부 레포에서 진행을 켜지 못했습니다 — [▶ 이어서 진행]으로 다시 시도하세요'
    );
  });

  test('keeps ▶ 이어서 진행 next to ⏸ 정지 while a member is unlaunched', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1', armed_by_lane: 'cl_1' }, { bead_id: 'A-2' }]
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
      ])
    });

    view.load();

    expect([
      el(mount, '.mon2-clane__badge')?.textContent?.trim(),
      el(mount, '.mon2-clane__run')?.textContent?.trim(),
      el(mount, '.mon2-clane__stop') !== null
    ]).toEqual(['▶ 진행 중', '▶ 이어서 진행', true]);
  });

  test('⏸ 정지 disarms the lane in every member repo', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({ queue: [{ bead_id: 'A-1', armed_by_lane: 'cl_1' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1', armed_by_lane: 'cl_1' }]
        })
      ],
      workspaces_state: [
        state(),
        state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
      ],
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'A-1' }, { bead_id: 'B-1', root_dir: WS_B }] }
      ]),
      transport: async () => ({ applied: true, queue: { revision: 3 } })
    });

    view.load();
    click(mount, '.mon2-clane__stop');
    await flushMicrotasks();

    expect(
      sent.map((m) => [m.type, m.payload.lane_id, m.payload.root_dir])
    ).toEqual([
      ['worker-queue-disarm', 'cl_1', WS_A],
      ['worker-queue-disarm', 'cl_1', WS_B]
    ]);
  });

  test('disables 진행 while the lane store is unreadable', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1' }] })],
      workspaces_state: [state()],
      cross_lanes: null
    });

    view.load();

    expect(el(mount, '.mon2-clane__run')).toBeNull();
  });

  test('releases an orphan arm from the row that reveals it', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({ queue: [{ bead_id: 'A-1', armed_by_lane: 'cl_gone' }] })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([]),
      transport: async () => ({ applied: true, queue: { revision: 3 } })
    });

    view.load();
    const chip = el(mount, '.worker-dep--armed-orphan');
    click(mount, '.mon2-arm__release');
    await flushMicrotasks();

    expect(chip.textContent?.trim().startsWith('▶ 진행 중 · 레인 없음')).toBe(
      true
    );
    expect(sent).toEqual([
      {
        type: 'worker-queue-disarm',
        payload: {
          bead_ids: ['A-1'],
          lane_id: 'cl_gone',
          root_dir: WS_A,
          expected_revision: 1
        }
      }
    ]);
  });
});

describe('monitor 연결 레인 교정 표시 (UI-jaua §6.3)', () => {
  test('disables 확정 with the hold reason while a member has no blocker material', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          runnable: [{ bead_id: 'A-1', title: '앞' }]
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        { status: 'draft', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
      ])
    });

    view.load();

    expect([
      /** @type {HTMLButtonElement} */ (el(mount, '.mon2-clane__confirm'))
        .disabled,
      el(mount, '.mon2-clane__hold')?.textContent?.trim()
    ]).toEqual([true, '의존 자료 미확정 — 교정 보류']);
  });

  test('names the cycle that no order can satisfy', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-1': ['A-2'], 'A-2': ['A-1'] }
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        { status: 'draft', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
      ])
    });

    view.load();

    expect(el(mount, '.mon2-clane__cycle')?.textContent?.trim()).toBe(
      '⛔ 의존 사이클 — 자동 교정 불가'
    );
  });

  test('reports how many rows the correction moved', async () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-1': [], 'A-2': ['A-1'] }
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'A-2' }, { bead_id: 'A-1' }] }
      ]),
      transport: async () => ({
        applied: true,
        revision: 4,
        queue: { revision: 4 }
      })
    });

    view.load();
    click(mount, '.mon2-clane__reapply');
    await flushMicrotasks();

    expect(el(mount, '.mon2-clane__corrected')?.textContent?.trim()).toBe(
      '의존에 맞춰 1건 자동 교정'
    );
  });

  test('marks a fixed row the correction cannot move', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-1': ['A-2'], 'A-2': [] }
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
      ])
    });

    view.load();

    expect(
      Array.from(mount.querySelectorAll('.mon2-crow')).map((row) =>
        row.textContent?.includes('⚠ 의존 순서와 다름')
      )
    ).toEqual([true, false]);
  });
});

describe('monitor 의존성 편집 이관 (UI-lx45 §5)', () => {
  test('draws no ⛓ button on a candidate card', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({ runnable: [{ bead_id: 'A-9', title: '가운데' }] })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(el(mount, '#monitor-runnable .worker-card')).not.toBeNull();
    expect(mount.querySelector('.mon-dep__btn')).toBeNull();
    expect(mount.querySelector('.worker-card__head-actions')).toBeNull();
  });

  test('draws no ⛓ button on a wait row', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1' }] })],
      workspaces_state: [state()]
    });

    view.load();

    expect(el(mount, '.worker-mini__rowops')).not.toBeNull();
    expect(mount.querySelector('.mon-dep__btn')).toBeNull();
  });

  test('opens no inline panel anywhere', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-9', title: '가운데', blocked_by: ['A-1'] }],
          queue: [{ bead_id: 'A-1' }],
          bead_blocked_by: { 'A-9': ['A-1'] }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '#monitor-runnable .worker-dep--pred .worker-dep__open');

    expect(mount.querySelector('.mon-deppanel')).toBeNull();
  });

  test('goes straight to a blocker of this repo from its blocked chip', () => {
    // 실행가능 행은 자기 `blocked_by`를 스스로 싣는다 (UI-yrzu §5) — 레포 장식만
    // 있는 픽스처로는 카드에 blocked 칩이 서지 않는다.
    const { mount, view, gotoIssue, switchWorkspace } = setup({
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-9', title: '가운데', blocked_by: ['A-1'] }],
          queue: [{ bead_id: 'A-1' }],
          bead_titles: { 'A-1': '선행' }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '#monitor-runnable .worker-dep--pred .worker-dep__open');

    expect(gotoIssue).toHaveBeenCalledWith('A-1');
    expect(switchWorkspace).not.toHaveBeenCalled();
  });

  test('switches the repo before opening a blocker of another one', async () => {
    const { mount, view, gotoIssue, switchWorkspace } = setup({
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-9', title: '가운데', blocked_by: ['B-1'] }]
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }],
          bead_titles: { 'B-1': '남의 선행' }
        })
      ],
      workspaces_state: [
        state(),
        state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
      ]
    });

    view.load();
    click(mount, '#monitor-runnable .worker-dep--pred .worker-dep__open');

    expect(switchWorkspace).toHaveBeenCalledWith(WS_B);
    expect(gotoIssue).not.toHaveBeenCalled();

    await flushMicrotasks();

    expect(gotoIssue).toHaveBeenCalledWith('B-1');
  });

  test('re-runs the lane correction for a new edge inside one chain lane', async () => {
    const { view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-1': [], 'A-2': [] }
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([
        { entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
      ]),
      transport: async () => ({
        applied: true,
        revision: 4,
        queue: { revision: 4 }
      })
    });

    view.load();
    await view.recorrectSharedLane('dep-add', 'A-1', 'A-2');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toContain('monitor-lane-update');
    expect(
      /** @type {any} */ (
        sent.find((m) => m.type === 'monitor-lane-update')
      ).payload.entries.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['A-2', 'A-1']);
  });

  test('leaves the lanes alone for an edge whose ends share no chain lane', async () => {
    const { view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-1': [], 'A-2': [] }
        })
      ],
      workspaces_state: [state()],
      cross_lanes: crossLanes([{ entries: [{ bead_id: 'A-1' }] }])
    });

    view.load();
    await view.recorrectSharedLane('dep-add', 'A-1', 'A-2');
    await flushMicrotasks();

    expect(sent).toEqual([]);
  });
});

describe('views/monitor live clock', () => {
  test('pause stops the clock and load restarts it', () => {
    vi.useFakeTimers();
    let now = NOW;
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 1000
            }
          }
        })
      ],
      workspaces_state: [state()],
      now: () => now
    });

    view.load();
    const first = el(mount, '.rtile__elapsed').textContent;
    now = NOW + 30_000;
    vi.advanceTimersByTime(1000);
    const ticked = el(mount, '.rtile__elapsed').textContent;
    view.pause();
    now = NOW + 90_000;
    vi.advanceTimersByTime(5000);
    const paused = el(mount, '.rtile__elapsed').textContent;

    expect(ticked).not.toBe(first);
    expect(paused).toBe(ticked);
    vi.useRealTimers();
  });

  test('clear stops the clock and empties the mount', () => {
    vi.useFakeTimers();
    const { mount, view } = setup({ workspaces_state: [state()] });

    view.load();
    view.clear();
    vi.advanceTimersByTime(5000);

    expect(mount.children).toHaveLength(0);
    vi.useRealTimers();
  });
});

describe('views/monitor focus filter (UI-eey2 §4.2)', () => {
  /**
   * Two repos, each with one candidate, so a focus decision has something to
   * dim on the other side.
   *
   * @returns {ReturnType<typeof setup>}
   */
  function twoRepos() {
    return setup({
      workspaces: [
        workspace({ runnable: [{ bead_id: 'A-1', title: 'a' }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          runnable: [{ bead_id: 'B-1', title: 'b' }]
        })
      ],
      workspaces_state: [
        state({ counts: { running: 0, pr_wait: 0, queue: 0, runnable: 1 } }),
        state({
          root_dir: WS_B,
          name: 'repo-b',
          issue_prefix: 'B',
          counts: { running: 0, pr_wait: 0, queue: 0, runnable: 1 }
        })
      ]
    });
  }

  test('marks the clicked repo and blurs the rest through the root class', () => {
    const { mount, view } = twoRepos();

    view.load();
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"]`);

    expect(el(mount, '.mon').classList.contains('has-focus')).toBe(true);
    expect(
      el(mount, `#monitor-runnable .mon2-sec[data-root-dir="${WS_A}"]`)
        .classList
    ).toContain('is-focus');
    expect(
      el(mount, `#monitor-runnable .mon2-sec[data-root-dir="${WS_B}"]`)
        .classList
    ).not.toContain('is-focus');
  });

  test('marks the focused repo cards by their bead ownership', () => {
    const { mount, view } = twoRepos();

    view.load();
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"]`);

    expect(
      el(mount, '.mon2-item[data-bead-id="A-1"]').classList.contains('is-focus')
    ).toBe(true);
    expect(
      el(mount, '.mon2-item[data-bead-id="B-1"]').classList.contains('is-focus')
    ).toBe(false);
  });

  test('drops the root class when the same tile is clicked again', () => {
    const { mount, view } = twoRepos();

    view.load();
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"]`);
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"]`);

    expect(el(mount, '.mon').classList.contains('has-focus')).toBe(false);
  });
});

describe('views/monitor 세션 타일 (UI-yrzu §6·§9)', () => {
  const session_workspaces = [
    workspace({
      session_active: [
        {
          bead_id: 'A-7',
          title: '세션이 잡은 이슈',
          status: 'in_progress',
          route: 'spec_backed',
          spec_id: '',
          labels: [],
          created_at: null,
          updated_at: NOW - 120_000,
          started_at: NOW - 4000,
          workflow: {
            route: 'spec_backed',
            chips: { route: 'spec_backed', route_source: 'explicit' },
            stages: { spec: { fill: 'full' }, impl: {}, pr: {}, merge: {} }
          },
          blocked: false,
          blocked_by: []
        }
      ]
    })
  ];

  test('renders the session tile in the 실행중 lane', () => {
    const { mount, view } = setup({
      workspaces: session_workspaces,
      workspaces_state: [state()]
    });

    view.load();

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('#monitor-running .rtile')
    );
    expect(tile.classList.contains('rtile--session')).toBe(true);
    expect(tile.getAttribute('data-bead-id')).toBe('A-7');
    expect(tile.querySelector('.rtile__session-badge')?.textContent).toBe(
      '세션'
    );
    expect(tile.querySelector('.ctl-chip--route')?.textContent).toBe(
      'spec_backed'
    );
    expect(tile.querySelector('.rtile__activity-text')?.textContent).toBe(
      '갱신 2분 전'
    );
  });

  test('gives the session tile no drag source and no drop zone', () => {
    const { mount, view } = setup({
      workspaces: session_workspaces,
      workspaces_state: [state()]
    });

    view.load();

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('#monitor-running .rtile')
    );
    expect(tile.closest('[data-drag-kind]')).toBeNull();
    expect(tile.getAttribute('draggable')).toBeNull();
    expect(el(mount, '#monitor-running [data-drop]')).toBeNull();
  });
});

describe('views/monitor 세션 타일 drawer (UI-4xzk §6.4)', () => {
  const VIEW = {
    index: 0,
    provider: 'claude',
    session_id: 'a1b2c3d4-5e6f',
    host: 'mac-studio',
    current: true,
    locality: 'local',
    last_event_at: NOW - 30_000,
    resume_command: "claude --resume 'a1b2c3d4-5e6f'"
  };

  /**
   * @param {any[]} session_refs
   */
  function sessionWorkspaces(session_refs) {
    return [
      workspace({
        session_active: [
          {
            bead_id: 'A-7',
            title: '세션이 잡은 이슈',
            status: 'in_progress',
            route: 'spec_backed',
            spec_id: '',
            labels: [],
            created_at: null,
            updated_at: NOW - 120_000,
            started_at: NOW - 4000,
            workflow: null,
            blocked: false,
            blocked_by: [],
            session_refs
          }
        ]
      })
    ];
  }

  test('subscribes to the session transcript instead of an attempt log', () => {
    const { mount, view, sent } = setup({
      workspaces: sessionWorkspaces([VIEW]),
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.rtile__session');

    expect(
      sent.find((s) => s.type === 'subscribe-session-log')?.payload
    ).toMatchObject({
      attempt_id: 'session:claude:a1b2c3d4-5e6f',
      session_ref: {
        bead_id: 'A-7',
        provider: 'claude',
        session_id: 'a1b2c3d4-5e6f'
      },
      root_dir: WS_A
    });
  });

  test('opens the session drawer with a running status and its own label', () => {
    const { mount, view } = setup({
      workspaces: sessionWorkspaces([VIEW]),
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.rtile__session');

    expect(el(mount, '.sv__id')?.textContent?.trim()).toBe('claude · a1b2c3d4');
    expect(el(mount, '.sv__live')).toBeTruthy();
    expect(el(mount, '.sv__resume-cmd')?.getAttribute('title')).toBe(
      "claude --resume 'a1b2c3d4-5e6f'"
    );
  });

  test('leaves the session tile unselected — it owns no attempt to highlight', () => {
    const { mount, view } = setup({
      workspaces: sessionWorkspaces([VIEW]),
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.rtile__session');

    expect(el(mount, '#monitor-running .rtile--sel')).toBeNull();
  });

  test('renders no session button for an issue with no parseable session_ref', () => {
    const { mount, view } = setup({
      workspaces: sessionWorkspaces([]),
      workspaces_state: [state()]
    });

    view.load();

    expect(el(mount, '#monitor-running .rtile__session')).toBeNull();
  });
});

describe('monitor 겹침 팝오버·1클릭 직렬 배치 (UI-qm12 §5.3·§5.4)', () => {
  /**
   * @param {string[]} [scope]
   * @returns {{ scope: string[], artifacts: string[] }}
   */
  function declared(scope = ['server/worker']) {
    return { scope, artifacts: ['docs/spec.md'] };
  }

  /**
   * @param {string} id
   * @returns {Record<string, any>}
   */
  function running(id) {
    return {
      [`t-${id}`]: {
        attempt_id: `t-${id}`,
        bead_id: id,
        status: 'running',
        started_at: NOW - 1000
      }
    };
  }

  /**
   * A running review session on a bead that keeps its PR 대기 seat
   * (UI-hk74 §7). 그 비점유 타일이 겹침 칩을 그리므로, PR 대기 카드가 팝오버의
   * 주인이 되는 조합은 이 타일을 통해 도달한다.
   *
   * @param {string} id
   * @returns {Record<string, any>}
   */
  function reviewSession(id) {
    return {
      [`r-${id}`]: {
        attempt_id: `r-${id}`,
        bead_id: id,
        kind: 'review_session',
        status: 'running',
        origin: 'auto',
        started_at: NOW - 1000
      }
    };
  }

  /**
   * @param {HTMLElement} mount
   * @param {string} bead_id
   * @returns {HTMLElement}
   */
  function openPopover(mount, bead_id) {
    click(mount, `[data-bead-id="${bead_id}"] .mon-overlap__chip`);
    return el(mount, `[data-bead-id="${bead_id}"] .mon-overlap__popover`);
  }

  test('opens a dialog popover naming the counterpart and the shared path', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_titles: { 'A-2': '상대 제목' },
          serial_lane_count: 2,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    const popover = openPopover(mount, 'A-1');

    expect(popover.getAttribute('role')).toBe('dialog');
    expect(popover.querySelector('.mon-overlap__rid')?.textContent).toBe('A-2');
    expect(popover.querySelector('.mon-overlap__rtitle')?.textContent).toBe(
      '상대 제목'
    );
    expect(popover.querySelector('.mon-overlap__paths')?.textContent).toContain(
      'server/worker'
    );
  });

  test('closes the popover on an outside click', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          serial_lane_count: 2,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    openPopover(mount, 'A-1');
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelector('.mon-overlap__popover')).toBeNull();
  });

  test('closes the popover on Escape', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          serial_lane_count: 2,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    openPopover(mount, 'A-1');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(mount.querySelector('.mon-overlap__popover')).toBeNull();
  });

  test('draws one chip per counterpart with no +n fold', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [
            { bead_id: 'A-1' },
            { bead_id: 'A-2' },
            { bead_id: 'A-3' },
            { bead_id: 'A-4' },
            { bead_id: 'A-5' }
          ],
          serial_lane_count: 2,
          bead_scope: {
            'A-1': declared(),
            'A-2': declared(),
            'A-3': declared(),
            'A-4': declared(),
            'A-5': declared()
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(
      Array.from(
        mount.querySelectorAll('[data-bead-id="A-1"] .mon-overlap__chip')
      ).map((chip) => chip.getAttribute('data-overlap-id'))
    ).toEqual(['A-2', 'A-3', 'A-4', 'A-5']);
  });

  test('offers no button when both already share one serial lane', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          serial_lanes: [
            { id: 's1', entries: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] }
          ],
          serial_lane_count: 1,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    const popover = openPopover(mount, 'A-1');

    expect(popover.querySelector('.mon-overlap__place')).toBeNull();
    expect(
      popover.querySelector('.mon-overlap__note')?.textContent?.trim()
    ).toBe('이미 같은 직렬 레인 — 순서가 있습니다');
  });

  test('moves me to the counterpart serial lane in one op', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-2' }] }],
          serial_lane_count: 1,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    openPopover(mount, 'A-1');
    click(mount, '[data-bead-id="A-1"] .mon-overlap__place');
    await flushMicrotasks();

    expect(sent).toEqual([
      {
        type: 'worker-queue-place',
        payload: {
          bead_id: 'A-1',
          lane: 's1',
          index: 1,
          root_dir: WS_A,
          expected_revision: 1
        }
      }
    ]);
  });

  test('moves the counterpart into my serial lane in one op', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-2' }] }],
          serial_lane_count: 1,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    openPopover(mount, 'A-2');
    click(mount, '[data-bead-id="A-2"] .mon-overlap__place');
    await flushMicrotasks();

    expect(sent.map((message) => message.payload)).toEqual([
      {
        bead_id: 'A-1',
        lane: 's1',
        index: 1,
        root_dir: WS_A,
        expected_revision: 1
      }
    ]);
  });

  test('fills the first empty serial lane with two ops in counterpart-first order', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          serial_lane_count: 2,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()],
      transport: async () => ({ applied: true, queue: { revision: 7 } })
    });

    view.load();
    openPopover(mount, 'A-1');
    click(mount, '[data-bead-id="A-1"] .mon-overlap__place');
    await flushMicrotasks();

    expect(sent.map((message) => message.payload)).toEqual([
      {
        bead_id: 'A-2',
        lane: 's1',
        index: 0,
        root_dir: WS_A,
        expected_revision: 1
      },
      {
        bead_id: 'A-1',
        lane: 's1',
        index: 1,
        root_dir: WS_A,
        expected_revision: 7
      }
    ]);
  });

  test('sends no second op and no retry when the first one conflicts', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          serial_lane_count: 2,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()],
      transport: async () => ({ conflict: true })
    });

    view.load();
    openPopover(mount, 'A-1');
    click(mount, '[data-bead-id="A-1"] .mon-overlap__place');
    await flushMicrotasks();

    expect(sent.map((message) => message.payload.bead_id)).toEqual(['A-2']);
  });

  test('sends no second op when the first response is not applied', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          serial_lane_count: 2,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()],
      transport: async () => null
    });

    view.load();
    openPopover(mount, 'A-1');
    click(mount, '[data-bead-id="A-1"] .mon-overlap__place');
    await flushMicrotasks();

    expect(sent.map((message) => message.payload.bead_id)).toEqual(['A-2']);
  });

  test('sends no second op when the first response carries no revision', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          serial_lane_count: 2,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()],
      transport: async () => ({ applied: true, queue: {} })
    });

    view.load();
    openPopover(mount, 'A-1');
    click(mount, '[data-bead-id="A-1"] .mon-overlap__place');
    await flushMicrotasks();

    expect(sent.map((message) => message.payload.bead_id)).toEqual(['A-2']);
  });

  test('disables the button when no serial lane is empty', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-3' }] }],
          serial_lane_count: 1,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    const popover = openPopover(mount, 'A-1');
    const button = /** @type {HTMLButtonElement} */ (
      popover.querySelector('.mon-overlap__place')
    );

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('title')).toBe(
      '빈 직렬 레인 없음 — Worker 탭에서 레인 수 조절'
    );
  });

  test('says no order can be made while both are running', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: { ...running('A-1'), ...running('A-2') },
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    const popover = openPopover(mount, 'A-1');

    expect(
      popover.querySelector('.mon-overlap__note')?.textContent?.trim()
    ).toBe('둘 다 이미 출발 — 순서를 만들 수 없습니다');
  });

  test('asks the counterpart to take a serial lane while I am running', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          attempts: running('A-1'),
          serial_lane_count: 2,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    const popover = openPopover(mount, 'A-1');

    expect(
      popover.querySelector('.mon-overlap__note')?.textContent?.trim()
    ).toBe('실행 중 — 순서를 만들려면 상대를 직렬 레인에 두세요');
  });

  test('tells a waiting row to take a serial lane while the counterpart runs', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          attempts: running('A-1'),
          serial_lane_count: 2,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    const popover = openPopover(mount, 'A-2');

    expect(
      popover.querySelector('.mon-overlap__note')?.textContent?.trim()
    ).toBe('실행 중 — 종료 후 출발하려면 직렬 레인에 두세요');
  });

  /**
   * The same 화면 사실, Worker 탭 어휘로 (UI-2htv). 두 탭이 같은 조합에 같은
   * 문장을 내는지는 문자열을 눈으로 맞춰서는 지킬 수 없으므로, Worker의
   * 판정기를 직접 불러 비교한다.
   *
   * @param {string} me_id
   * @param {string} counterpart_id
   * @param {Array<{ id: string, kind: import('../worker/queue-overlaps.js').LaneMember['kind'], location_label: string }>} members
   * @returns {string|null}
   */
  function workerNote(me_id, counterpart_id, members) {
    const plan = workerPlacementPlan(me_id, counterpart_id, {
      members_by_id: new Map(
        members.map((entry) => [
          entry.id,
          { ...entry, title: entry.id, lane_id: null }
        ])
      ),
      serial_raw_lengths: {},
      serial_lane_count: 2,
      occupied_lanes: new Set()
    });
    return plan.kind === 'note' ? plan.text : null;
  }

  test('names the PR 대기 lane when the popover owner keeps its PR 대기 seat', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          pr_wait: [{ bead_id: 'A-1' }],
          attempts: reviewSession('A-1'),
          serial_lane_count: 2,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    const popover = openPopover(mount, 'A-1');
    const note = popover
      .querySelector('.mon-overlap__note')
      ?.textContent?.trim();

    expect(note).toBe('PR 대기 — 순서를 만들려면 상대를 직렬 레인에 두세요');
    expect(note).toBe(
      workerNote('A-1', 'A-2', [
        { id: 'A-1', kind: 'pr_wait', location_label: 'PR 대기' },
        { id: 'A-2', kind: 'parallel', location_label: '#1' }
      ])
    );
  });

  test('names the PR 대기 lane when the counterpart waits on a PR', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-2' }],
          pr_wait: [{ bead_id: 'A-1' }],
          serial_lane_count: 2,
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    const popover = openPopover(mount, 'A-2');
    const note = popover
      .querySelector('.mon-overlap__note')
      ?.textContent?.trim();

    expect(note).toBe('PR 대기 — 종료 후 출발하려면 직렬 레인에 두세요');
    expect(note).toBe(
      workerNote('A-2', 'A-1', [
        { id: 'A-2', kind: 'parallel', location_label: '#1' },
        { id: 'A-1', kind: 'pr_wait', location_label: 'PR 대기' }
      ])
    );
  });

  test('says both already departed when one runs and one waits on a PR', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: running('A-1'),
          pr_wait: [{ bead_id: 'A-2' }],
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    const popover = openPopover(mount, 'A-1');
    const note = popover
      .querySelector('.mon-overlap__note')
      ?.textContent?.trim();

    expect(note).toBe('둘 다 이미 출발 — 순서를 만들 수 없습니다');
    expect(note).toBe(
      workerNote('A-1', 'A-2', [
        { id: 'A-1', kind: 'running', location_label: '실행중' },
        { id: 'A-2', kind: 'pr_wait', location_label: 'PR 대기' }
      ])
    );
  });
});

describe('views/monitor candidate stepper doc cells (UI-ajkn §5)', () => {
  const SPEC_DOC = { path: 'docs/spec.md', missing_state: null };

  /** @type {any} */
  const CANDIDATE = {
    bead_id: 'B-1',
    title: '타 레포 후보',
    workflow: {
      route: 'spec_backed',
      stages: {
        spec: { fill: 'full', glyph: null, stale: false, doc: SPEC_DOC },
        impl: { fill: 'none', glyph: null, stale: false },
        pr: { fill: 'none', glyph: null, stale: false },
        merge: { fill: 'none', glyph: null, stale: false }
      }
    }
  };

  test("opens a candidate's document with that card's own root_dir", () => {
    const openDoc = vi.fn();
    const { mount, view } = setup({
      workspaces: [
        workspace({ root_dir: WS_B, name: 'repo-b', runnable: [CANDIDATE] })
      ],
      workspaces_state: [state({ root_dir: WS_B, name: 'repo-b' })],
      current: WS_A,
      openDoc
    });

    view.load();
    click(mount, '#monitor-runnable .seg--doc');

    expect(openDoc).toHaveBeenCalledTimes(1);
    expect(openDoc).toHaveBeenCalledWith(SPEC_DOC, WS_B);
  });

  test('renders a static stepper when no openDoc handler is given', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ runnable: [CANDIDATE] })],
      workspaces_state: [state()]
    });

    view.load();

    expect(mount.querySelector('#monitor-runnable .stp')).not.toBeNull();
    expect(mount.querySelector('#monitor-runnable .seg--doc')).toBeNull();
  });
});

describe('레인 표면 정합 — 접기·제목·조작 (UI-5ksp)', () => {
  const LANE_IDS = [
    'monitor-runnable',
    'monitor-queue',
    'monitor-running',
    'monitor-pr_wait',
    'monitor-done'
  ];

  test('makes every one of the five lanes collapsible', () => {
    const { mount, view } = setup();

    view.load();

    const toggles = LANE_IDS.map((id) =>
      mount.querySelector(`#${id} > .worker-pane__hd > .worker-pane__toggle`)
    );
    expect(toggles.every((node) => node !== null)).toBe(true);
  });

  test('collapses only the 완료 lane on a first visit', () => {
    window.localStorage.clear();
    const { mount, view } = setup();

    view.load();

    const collapsed = LANE_IDS.filter((id) =>
      /** @type {HTMLElement} */ (
        mount.querySelector(`#${id}`)
      ).classList.contains('worker-pane--collapsed')
    );
    expect(collapsed).toEqual(['monitor-done']);
  });

  test('folds one lane when its toggle is clicked', () => {
    const { mount, view } = setup();

    view.load();
    click(mount, '#monitor-running .worker-pane__toggle');

    const pane = el(mount, '#monitor-running');
    expect(pane.classList.contains('worker-pane--collapsed')).toBe(true);
    expect(pane.querySelector('.worker-pane__body')).toBeNull();
    expect(
      JSON.parse(
        window.localStorage.getItem('beads-ui.monitor.lane-collapsed') || '{}'
      ).lanes.running
    ).toBe(true);
  });

  test('names the five lanes with the vocabulary Worker uses', () => {
    const { mount, view } = setup();

    view.load();

    const titles = Array.from(
      mount.querySelectorAll(
        '.worker-lanes > .worker-pane > .worker-pane__hd .worker-pane__title'
      )
    ).map((node) => (node.textContent || '').trim());
    expect(titles).toEqual(['후보', '대기', '실행 중', 'PR 대기', '완료']);
  });

  test('draws the 후보 lane as a source pane', () => {
    const { mount, view } = setup();

    view.load();

    expect(
      el(mount, '#monitor-runnable').classList.contains('worker-pane--src')
    ).toBe(true);
  });

  test('leaves the lane expanded when its header control changes', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ runnable: [{ bead_id: 'A-1', title: 'a' }] })],
      workspaces_state: [state()]
    });

    view.load();
    const select = /** @type {HTMLSelectElement} */ (
      el(mount, '#monitor-runnable .mon-candidate-sort')
    );
    select.value = 'updated_flat';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(
      el(mount, '#monitor-runnable').classList.contains(
        'worker-pane--collapsed'
      )
    ).toBe(false);
  });

  test('puts the wait row ops inside the row first line', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1' }] })],
      workspaces_state: [state()]
    });

    view.load();

    const ops = el(mount, '.worker-mini__rowops');
    expect(ops.closest('.worker-mini__line')).not.toBeNull();
    expect(
      Array.from(ops.querySelectorAll('button')).map((b) =>
        (b.textContent || '').trim()
      )
    ).toEqual(['↑', '↓', '✕']);
  });

  test('keeps the cross-repo mutual-wait warning under its serial lane', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }],
          bead_blocked_by: { 'A-1': ['B-1'] }
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'B-1' }] }],
          bead_blocked_by: { 'B-1': ['A-1'] }
        })
      ],
      workspaces_state: [
        state(),
        state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
      ]
    });

    view.load();

    const warning = el(mount, '.mon2-lane__cross-wait');
    expect(warning.closest('.worker-wait__lane')).not.toBeNull();
    expect(warning.textContent).toContain('상호 정지');
  });
});

describe('모니터 모바일 관제 우선 배치 (UI-5ksp §4.7)', () => {
  /** @type {Array<(ev: any) => void>} */
  let listeners = [];

  beforeEach(() => {
    listeners = [];
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: () => ({
        matches: true,
        media: '(max-width: 640px)',
        /**
         * @param {string} _type
         * @param {(ev: any) => void} fn
         */
        addEventListener(_type, fn) {
          listeners.push(fn);
        },
        removeEventListener() {}
      })
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: undefined
    });
  });

  const RUNNING = {
    t1: {
      attempt_id: 't1',
      bead_id: 'A-5',
      status: 'running',
      started_at: NOW - 1000
    }
  };

  test('stacks 지금 · 대기 · 후보 · 완료 in DOM order', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-1', title: 'cand' }],
          queue: [{ bead_id: 'A-2' }],
          pr_wait: [{ bead_id: 'A-3' }],
          done: [{ bead_id: 'A-4', added_at: NOW }],
          attempts: RUNNING
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(
      Array.from(
        mount.querySelectorAll('.worker-now, .worker-lanes > .worker-pane')
      ).map((node) => node.id)
    ).toEqual([
      'worker-now',
      'monitor-queue',
      'monitor-runnable',
      'monitor-done'
    ]);
  });

  test('moves the running tiles and PR rows into the 지금 panel', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({ pr_wait: [{ bead_id: 'A-3' }], attempts: RUNNING })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const now_panel = el(mount, '#worker-now');
    expect(
      now_panel.querySelector('.rtile[data-bead-id="A-5"]')
    ).not.toBeNull();
    expect(
      now_panel.querySelector('.worker-mini[data-bead-id="A-3"]')
    ).not.toBeNull();
    expect(el(mount, '#monitor-running')).toBeNull();
    expect(el(mount, '#monitor-pr_wait')).toBeNull();
  });
});

describe('접힌 레인 띠 드롭·행 조작 드래그 가드 (UI-5ksp REVISE)', () => {
  /**
   * Fold one lane before mounting. 접힌 pane은 본문을 그리지 않으므로
   * `[data-drop]`도 없다 — 띠 드롭이 성립하는지 묻는 유일한 방법이다.
   *
   * @param {Record<string, boolean>} lanes
   */
  function collapseLanes(lanes) {
    window.localStorage.setItem(
      'beads-ui.monitor.lane-collapsed',
      JSON.stringify({ lanes, areas: {} })
    );
  }

  /**
   * @param {Record<string, any>} [patch]
   */
  function dropSetup(patch = {}) {
    return setup({
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-9', title: 'cand' }],
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          ...patch
        })
      ],
      workspaces_state: [state()]
    });
  }

  test('places a candidate at the parallel tail when dropped on the collapsed 대기 strip', async () => {
    collapseLanes({ queue: true, done: false });
    const { mount, view, sent } = dropSetup();

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    const strip = el(mount, '#monitor-queue');
    expect(strip.classList.contains('worker-pane--collapsed')).toBe(true);
    expect(strip.querySelector('[data-drop]')).toBeNull();
    const ev = fireDrag(strip, 'drop');
    await flushMicrotasks();

    expect(ev.defaultPrevented).toBe(true);
    expect(sent).toEqual([
      {
        type: 'worker-queue-place',
        payload: {
          bead_id: 'A-9',
          index: 2,
          root_dir: WS_A,
          expected_revision: 1
        }
      }
    ]);
  });

  test('removes a queued row from the queue when dropped on the collapsed 후보 strip', async () => {
    collapseLanes({ candidate: true, done: false });
    const { mount, view, sent } = dropSetup();

    view.load();
    fireDrag(el(mount, '#monitor-queue .mon2-item .worker-mini'), 'dragstart');
    const strip = el(mount, '#monitor-runnable');
    expect(strip.classList.contains('worker-pane--collapsed')).toBe(true);
    const ev = fireDrag(strip, 'drop');
    await flushMicrotasks();

    expect(ev.defaultPrevented).toBe(true);
    expect(sent).toEqual([
      {
        type: 'worker-queue-remove',
        payload: { bead_id: 'A-1', root_dir: WS_A, expected_revision: 1 }
      }
    ]);
  });

  test('matches the expanded 후보 pane when a queued row is dropped on it', async () => {
    const { mount, view, sent } = dropSetup();

    view.load();
    fireDrag(el(mount, '#monitor-queue .mon2-item .worker-mini'), 'dragstart');
    fireDrag(el(mount, '#monitor-runnable [data-drop="candidate"]'), 'drop');
    await flushMicrotasks();

    expect(sent).toEqual([
      {
        type: 'worker-queue-remove',
        payload: { bead_id: 'A-1', root_dir: WS_A, expected_revision: 1 }
      }
    ]);
  });

  test('cancels a drag that started on a row operation button', () => {
    const { mount, view } = dropSetup();

    view.load();
    const button = el(mount, '.worker-mini__rowops .worker-mini__rowops-up');
    const row = /** @type {HTMLElement} */ (button.closest('.worker-mini'));
    button.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    const start = fireDrag(row, 'dragstart');

    expect(start.defaultPrevented).toBe(true);
    expect(el(mount, '.mon').classList.contains('is-dragging')).toBe(false);
  });

  test('still starts a drag pressed on the row body', () => {
    const { mount, view } = dropSetup();

    view.load();
    const row = el(mount, '#monitor-queue .mon2-item .worker-mini');
    row
      .querySelector('.worker-mini__title')
      ?.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    const start = fireDrag(row, 'dragstart');

    expect(start.defaultPrevented).toBe(false);
    expect(el(mount, '.mon').classList.contains('is-dragging')).toBe(true);
  });

  test('keeps the unreadable cross-lane notice when the wait lane is otherwise empty', () => {
    const { mount, view } = setup({
      workspaces: [workspace()],
      workspaces_state: [state()],
      cross_lanes: null
    });

    view.load();

    expect(el(mount, '.mon2-clane__unreadable').textContent?.trim()).toBe(
      '연결 레인 저장소를 읽을 수 없음'
    );
  });
});

describe('monitor PR 대기·완료 레인 겹침 칩 (UI-e9sg)', () => {
  /**
   * @param {string[]} [scope]
   * @returns {{ scope: string[], artifacts: string[] }}
   */
  function declared(scope = ['server/worker']) {
    return { scope, artifacts: ['docs/spec.md'] };
  }

  test('draws the overlap chip on a PR 대기 row', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_titles: { 'A-2': '상대 제목' },
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(
      el(mount, '#monitor-pr_wait [data-bead-id="A-1"] .mon-overlap__chip')
        ?.textContent
    ).toContain('A-2');
  });

  test('draws the scope 없음 chip on a PR 대기 row', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }],
          bead_scope: { 'A-1': { scope: [], artifacts: [] } }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(
      el(mount, '#monitor-pr_wait [data-bead-id="A-1"] .worker-dep--muted')
        ?.textContent
    ).toContain('scope 없음');
  });

  test('opens the overlap popover from a PR 대기 row chip', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          pr_wait: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_titles: { 'A-2': '상대 제목' },
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '#monitor-pr_wait [data-bead-id="A-1"] .mon-overlap__chip');

    expect(
      el(
        mount,
        '#monitor-pr_wait [data-bead-id="A-1"] .mon-overlap__popover'
      )?.getAttribute('role')
    ).toBe('dialog');
  });

  test('leaves a 완료 row without overlap chips', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          done: [{ bead_id: 'A-1', added_at: NOW - 10 }],
          pr_wait: [{ bead_id: 'A-2' }],
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(
      el(mount, '#monitor-done [data-bead-id="A-1"] .mon-overlap__chip')
    ).toBeNull();
  });
});
