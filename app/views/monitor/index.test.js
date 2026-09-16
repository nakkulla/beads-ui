import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createMonitorView } from './index.js';

const NOW = 1_700_000_000_000;
const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

test('reveals the external gate from the summary when the wait pane is collapsed', () => {
  const row = {
    kind: 'external_wait',
    root_dir: '/repo',
    workspace_name: 'repo',
    gate_id: 'G-1',
    gate_title: '계산 관측',
    consumer_id: 'A-1',
    consumer_title: '분석',
    watch_id: 'a'.repeat(24),
    job_id: '42',
    stage: 'active',
    gate_open: true,
    recent_complete: false,
    job_state: '계산 중',
    previous_job_state: null,
    monitor_state: '자동 확인 중',
    monitor_reason: null,
    overdue: false,
    last_observed_at: 123,
    next_observation_at: 456,
    completed_at: null,
    recovery_needed: false
  };
  const reason = {
    kind: 'external_job',
    subject: { bead_id: 'A-1', root_dir: '/repo' },
    headline: '계산 종료 대기',
    release: '관측 후 자동 해제',
    verdict: 'normal',
    targets: [{ id: 'G-1', kind: 'gate' }],
    actions: []
  };
  window.localStorage.setItem(
    'beads-ui.monitor.lane-collapsed',
    JSON.stringify({ lanes: { queue: true }, areas: {} })
  );
  const original_scroll = HTMLElement.prototype.scrollIntoView;
  const scroll = vi.fn();
  HTMLElement.prototype.scrollIntoView = scroll;
  const { mount, view } = setup({
    workspaces: [
      workspace({
        root_dir: '/repo',
        external_waits: [row],
        wait_reasons: [reason]
      })
    ],
    workspaces_state: [state({ root_dir: '/repo' })]
  });
  view.load();
  expect(mount.querySelector('.worker-mini[data-bead-id="A-1"]')).toBeNull();
  expect(mount.querySelector('.worker-mini[data-bead-id="G-1"]')).toBeNull();

  try {
    /** @type {HTMLElement} */ (
      mount.querySelector('.wait-summary__item')
    ).click();

    const gate = mount.querySelector('.worker-mini[data-bead-id="G-1"]');
    expect(gate?.classList.contains('wait-reason--highlight')).toBe(true);
    expect(gate?.closest('details')?.open).toBe(true);
    expect(scroll).toHaveBeenCalled();
    expect(
      JSON.parse(
        window.localStorage.getItem('beads-ui.monitor.lane-collapsed') || '{}'
      ).lanes.queue
    ).toBe(false);
  } finally {
    view.clear();
    HTMLElement.prototype.scrollIntoView = original_scroll;
  }
});

test.each(['settled', 'still_waiting', 'skipped', 'running', 'error'])(
  'sends external check-now and disables its button until %s arrives',
  async (outcome) => {
    const row = {
      kind: 'external_wait',
      root_dir: '/repo',
      workspace_name: 'repo',
      gate_id: 'G-1',
      gate_title: '계산 관측',
      consumer_id: 'A-1',
      consumer_title: '분석',
      watch_id: 'a'.repeat(24),
      job_id: '42',
      stage: 'active',
      gate_open: true,
      recent_complete: false,
      job_state: '계산 중',
      previous_job_state: null,
      monitor_state: '자동 확인 중',
      monitor_reason: null,
      overdue: false,
      last_observed_at: 123,
      next_observation_at: 456,
      completed_at: null,
      recovery_needed: false
    };
    const reason = {
      kind: 'external_job',
      subject: { bead_id: 'A-1', root_dir: '/repo' },
      headline: '계산 종료 대기',
      release: '관측 후 자동 해제',
      verdict: 'normal',
      targets: [{ id: 'G-1', kind: 'gate' }],
      actions: [
        {
          op: 'monitor_tick_now',
          label: '지금 확인',
          payload: { root_dir: '/repo', watch_id: 'a'.repeat(24), since: 123 }
        }
      ]
    };
    /** @type {(value: any) => void} */
    let resolveCheck = () => {};
    const pending = new Promise((resolve) => {
      resolveCheck = resolve;
    });
    const transport = vi.fn((/** @type {string} */ type) =>
      type === 'worker-external-wait-check-now' ? pending : Promise.resolve({})
    );

    const { mount, view } = setup({
      workspaces: [
        workspace({
          root_dir: '/repo',
          external_waits: [row],
          wait_reasons: [reason]
        })
      ],
      workspaces_state: [state({ root_dir: '/repo' })],
      transport
    });
    view.load();

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-external-check-now]')
    );

    button.click();

    expect(transport).toHaveBeenCalledWith('worker-external-wait-check-now', {
      root_dir: '/repo',
      watch_id: 'a'.repeat(24),
      since: 123
    });
    expect(button.disabled).toBe(true);
    view.load();
    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('[data-external-check-now]')
      ).disabled
    ).toBe(true);
    resolveCheck({
      ok: outcome !== 'error',
      outcome,
      summary: '관측 결과: ' + outcome
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('[data-external-check-now]')
      ).disabled
    ).toBe(false);
    expect(document.querySelector('.toast')?.textContent).toBe(
      '관측 결과: ' + outcome
    );
    view.clear();
  }
);
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

test('demotes a prerequisite wait to its queue row and keeps the summary', () => {
  const reason = {
    kind: 'prerequisite',
    subject: { root_dir: WS_A, bead_id: 'A-1' },
    headline: 'A-2 완료를 기다림',
    release: '재스캔으로 자동 복귀',
    verdict: 'normal',
    targets: [{ id: 'A-2', kind: 'issue' }],
    actions: []
  };
  const { mount, view } = setup({
    workspaces: [
      workspace({
        queue: [{ bead_id: 'A-1' }],
        attempts: {
          a: {
            bead_id: 'A-1',
            attempt_id: 'a',
            status: 'waiting',
            cause: 'prerequisite_unmet',
            cause_detail: {
              summary: '선행 대기',
              blockers: [{ id: 'A-2', status: 'closed' }]
            },
            finished_at: NOW - 1000
          }
        },
        bead_blocked_by: { 'A-1': [] },
        wait_reasons: [reason]
      })
    ],
    workspaces_state: [state()]
  });

  view.load();

  expect(mount.querySelector('.rtile[data-bead-id="A-1"]')).toBeNull();
  expect(
    mount.querySelector('.worker-mini[data-bead-id="A-1"]')
  ).not.toBeNull();
  expect(mount.querySelector('.wait-summary > summary')?.textContent).toMatch(
    /\ub9c9\ud798\s*1/
  );
});

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

  test('filters by readiness from the segment', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          runnable: [
            {
              bead_id: 'A-1',
              title: 'a',
              route: 'spec_backed',
              spec_state: 'published',
              has_description: false,
              awaiting_user: false,
              worker_ineligible: false,
              spec_id: 'docs/a.md',
              published: true
            },
            {
              bead_id: 'A-2',
              title: 'b',
              route: 'spec_backed',
              spec_state: 'draft',
              has_description: false,
              awaiting_user: false,
              worker_ineligible: false
            }
          ]
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.mon-filter__readiness[data-readiness="not_ready"]');

    expect(idsIn(mount, 'runnable')).toEqual(['A-2']);
  });

  test('ignores the retired stored spec axis', () => {
    window.localStorage.setItem(
      'beads-ui.monitor.candidate-filter',
      JSON.stringify({ show_blocked: true, spec: 'without' })
    );
    const { mount, view } = setup({
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-1', title: 'a' }]
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(
      mount.querySelector(
        '.mon-filter__readiness[data-readiness="all"].is-active'
      )
    ).not.toBeNull();
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

  test('keeps recovery actions beside occupancy after an older discarded attempt', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }],
          lane_states: { s1: { occupied_by: ['A-1'] } },
          attempts: {
            new: {
              attempt_id: 'new',
              bead_id: 'A-1',
              status: 'failed',
              started_at: 200,
              finished_at: 300,
              runner: 'codex',
              session_id: 'session-new'
            },
            old: {
              attempt_id: 'old',
              bead_id: 'A-1',
              status: 'discarded',
              started_at: 100,
              finished_at: 150,
              dismissed_at: 160
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(el(mount, '.mon2-item--ghost').textContent).toContain(
      '실패 · 점유 유지'
    );
    const tile = el(mount, '.rtile[data-attempt-id="new"]');
    expect(tile.querySelector('.rtile__resume')).not.toBeNull();
    expect(tile.querySelector('.rtile__discard')).not.toBeNull();
  });

  test('shows stale occupied work as an admission row without a ghost', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          bead_titles: { 'A-1': '처분 대기 작업' },
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }],
          lane_states: { s1: { occupied_by: ['A-1'], order: ['A-1'] } },
          admission: {
            'A-1': {
              reason: 'worktree_stale_work',
              stale_work: { action_id: 'stale-action' }
            }
          },
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'failed',
              serial_lane_id: 's1',
              finished_at: 10,
              dismissed_at: 20
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const row = mount.querySelector(
      '.worker-wait__lane .mon2-item[data-bead-id="A-1"]:not(.mon2-item--ghost)'
    );
    expect({
      row_text: row?.textContent || '',
      ghost_count: mount.querySelectorAll(
        '.worker-wait__lane .mon2-item--ghost[data-bead-id="A-1"]'
      ).length
    }).toEqual({
      row_text: expect.stringContaining('⛔ worktree_stale_work'),
      ghost_count: 0
    });
  });

  // 두 탭이 같은 조각(`queueRowOps`)을 쓰기 전에는 Monitor 직렬 행만 `nudgeable`
  // false로 묶음 전체가 비어 `✕`가 없었다 (UI-6g3t §4).
  test('stands the remove ✕ on a serial lane row too', () => {
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
      el(mount, '.worker-wait__lane .worker-mini__rowops-remove')
    ).not.toBeNull();
  });

  test('keeps ↑ ↓ off a serial lane row', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-1' }] }]
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const ops = el(mount, '.worker-wait__lane .worker-mini__rowops');

    expect(
      Array.from(ops.querySelectorAll('button')).map((button) =>
        (button.textContent || '').trim()
      )
    ).toEqual(['✕']);
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

  test('leaves no 🔗 popover behind', () => {
    const { mount, view } = setup({ workspaces, workspaces_state });

    view.load();

    expect(el(mount, '.mon-link')).toBeNull();
    expect(el(mount, '.mon2-chains')).toBeNull();
    expect(el(mount, '.mon2-item__ops')).toBeNull();
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

  test('resumes a recovery wait with its repository and queue revision', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'waiting',
              cause: 'session_ended_unresolved',
              cause_detail: { recovery: { reason: 'unclassified' } },
              started_at: NOW - 100,
              finished_at: NOW - 50,
              session_id: 'saved-session'
            }
          }
        })
      ],
      workspaces_state: [state()],
      transport: async () => ({ resumed: true })
    });
    view.load();

    click(mount, '.rtile__resume');
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await vi.waitFor(() =>
      expect(
        sent.filter((call) => call.type === 'worker-attempt-resume')
      ).toHaveLength(1)
    );

    expect(sent[0]).toMatchObject({
      type: 'worker-attempt-resume',
      payload: { attempt_id: 't1', root_dir: WS_A, expected_revision: 1 }
    });
  });

  test('resumes a base-moved wait from the shared tile header', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'waiting',
              cause: 'base_moved',
              cause_detail: {
                candidate_sha: 'a'.repeat(40),
                base_sha: 'b'.repeat(40)
              },
              started_at: NOW - 100,
              finished_at: NOW - 50,
              session_id: 'session-base-moved'
            }
          }
        })
      ],
      workspaces_state: [state()],
      transport: async () => ({ resumed: true })
    });

    view.load();
    const button = el(mount, '.rtile__resume');
    expect(button.closest('.rtile__hd-actions')).not.toBeNull();
    expect(button.closest('.rtile__foot')).toBeNull();
    button.click();
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await vi.waitFor(() =>
      expect(
        sent.filter((call) => call.type === 'worker-attempt-resume')
      ).toHaveLength(1)
    );

    expect(sent[0]).toMatchObject({
      type: 'worker-attempt-resume',
      payload: {
        attempt_id: 't1',
        root_dir: WS_A,
        expected_revision: 1
      }
    });
  });

  test('draws no restart-instructions button for an old instructions_restart snapshot', async () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 100,
              session_id: 's',
              instructions_restart: { eligible: true, reason: null }
            }
          }
        })
      ],
      workspaces_state: [state()],
      transport: async () => ({ resumed: true })
    });

    view.load();
    await vi.waitFor(() =>
      expect(mount.querySelector('.rtile')).not.toBeNull()
    );

    expect(mount.querySelector('.rtile__restart-instructions')).toBeNull();
  });

  test('resumes a paused tile immediately without continuation or instructions', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'paused',
              started_at: NOW - 100,
              session_id: 's'
            }
          }
        })
      ],
      workspaces_state: [state()],
      transport: async () => ({ resumed: true })
    });

    view.load();
    click(mount, '.rtile__resume');
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await vi.waitFor(() => expect(sent.length).toBe(1));

    expect(sent[0]).toEqual({
      type: 'worker-attempt-resume',
      payload: { attempt_id: 't1', root_dir: WS_A, expected_revision: 1 }
    });
  });

  test('carries the typed instructions from the paused tile resume dialog', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'paused',
              started_at: NOW - 100,
              session_id: 's'
            }
          }
        })
      ],
      workspaces_state: [state()],
      transport: async () => ({ resumed: true })
    });

    view.load();
    click(mount, '.rtile__resume');
    /** @type {HTMLButtonElement} */ (
      document.querySelectorAll('.resume-instructions-dialog button')[1]
    ).click();
    const textarea = /** @type {HTMLTextAreaElement} */ (
      document.querySelector('.resume-instructions-dialog textarea')
    );
    textarea.value = '이어서 고쳐라';
    textarea.dispatchEvent(new Event('input'));
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog .op-btn--primary')
    ).click();
    await vi.waitFor(() => expect(sent.length).toBe(1));

    expect(sent[0]).toMatchObject({
      type: 'worker-attempt-resume',
      payload: {
        attempt_id: 't1',
        instructions: '이어서 고쳐라',
        root_dir: WS_A
      }
    });
    expect(sent[0].payload).not.toHaveProperty('continuation');
  });

  test('re-reads the revision for each resume send and never retries twice', async () => {
    const attempt = {
      attempt_id: 't1',
      bead_id: 'A-1',
      status: 'failed',
      cause: 'verify_failed:x',
      started_at: NOW - 100,
      session_id: 's'
    };
    const { mount, view, sent } = setup({
      workspaces: [workspace({ attempts: { t1: attempt } })],
      workspaces_state: [state()],
      transport: async () => ({
        resumed: false,
        conflict: true,
        queue: workspace({ revision: 9, attempts: { t1: attempt } })
      })
    });

    view.load();
    click(mount, '.rtile__resume');
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await vi.waitFor(() =>
      expect(
        sent.filter((call) => call.type === 'worker-attempt-resume')
      ).toHaveLength(2)
    );
    await flushMicrotasks();

    expect(
      sent
        .filter((call) => call.type === 'worker-attempt-resume')
        .map((call) => call.payload.expected_revision)
    ).toEqual([1, 9]);
  });

  test('raises the refusal toast the tab used to swallow', async () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'failed',
              cause: 'verify_failed:x',
              started_at: NOW - 100,
              session_id: 's'
            }
          }
        })
      ],
      workspaces_state: [state()],
      transport: async () => ({ resumed: false, reason: 'no_session_id' })
    });

    view.load();
    click(mount, '.rtile__resume');
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await vi.waitFor(() =>
      expect(document.querySelector('.toast')).not.toBeNull()
    );

    expect(document.querySelector('.toast')?.textContent).toBe(
      '이어하기 거부: no_session_id'
    );
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

  test('confirms and retries abandon with the workspace revision', async () => {
    const operation = {
      operation_id: 'op1',
      bead_id: 'A-1',
      requested_at: 1,
      phase: 'requested',
      last_error: 'archive_failed'
    };
    let calls = 0;
    const confirmFn = vi.fn(() => true);
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1', added_at: 1 }],
          discard_operations: { op1: operation }
        })
      ],
      workspaces_state: [state()],
      confirm: confirmFn,
      transport: async () => {
        calls += 1;
        return calls === 1
          ? { conflict: true, queue: { revision: 7 } }
          : { abandoned: true, conflict: false, queue: { revision: 8 } };
      }
    });
    view.load();

    click(mount, '.worker-mini__discard-abandon');
    await vi.waitFor(() => expect(sent).toHaveLength(2));

    expect(confirmFn).toHaveBeenCalledWith(
      'A-1: 실패한 폐기 작업을 포기합니다. 백업과 폐기는 수행되지 않았고 bead는 폐기 이전 상태로 돌아갑니다. 계속할까요?'
    );
    expect(sent).toEqual([
      {
        type: 'worker-discard-abandon',
        payload: {
          bead_id: 'A-1',
          operation_id: 'op1',
          root_dir: WS_A,
          expected_revision: 1
        }
      },
      {
        type: 'worker-discard-abandon',
        payload: {
          bead_id: 'A-1',
          operation_id: 'op1',
          root_dir: WS_A,
          expected_revision: 7
        }
      }
    ]);
    expect(document.querySelector('.toast')?.textContent).toContain(
      '폐기 포기됨 · 폐기는 수행되지 않았습니다 (원인: archive_failed)'
    );
  });

  test('abandons a failed archive-step discard from the failed tile', () => {
    const confirmFn = vi.fn(() => true);
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
          },
          discard_operations: {
            op1: {
              operation_id: 'op1',
              bead_id: 'A-1',
              attempt_id: 't1',
              requested_at: 1,
              phase: 'requested',
              last_error: 'submodule_observation_failed'
            }
          }
        })
      ],
      workspaces_state: [state()],
      confirm: confirmFn
    });

    view.load();
    click(mount, '.rtile__discard-abandon');

    expect(confirmFn).toHaveBeenCalledWith(
      expect.stringContaining('실패한 폐기 작업을 포기합니다')
    );
    expect(sent).toEqual([
      {
        type: 'worker-discard-abandon',
        payload: {
          bead_id: 'A-1',
          operation_id: 'op1',
          root_dir: WS_A,
          expected_revision: 1
        }
      }
    ]);
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
    expect(
      tile?.querySelector('.wait-verdict summary')?.textContent?.trim()
    ).toBe('⏸ 세션 대기');
    expect(tile?.querySelector('.rtile__held-summary')?.textContent).toBe(
      '사용자 결정 대기'
    );
    expect(tile?.querySelector('.rtile__elapsed')).toBeNull();
    expect(tile?.querySelector('.rtile__pause')).toBeNull();
    expect(tile?.querySelector('.rtile__session')).toBeNull();
  });

  test('opens an inquiry session from the monitor parked tile', async () => {
    const { mount, view, sent } = setup({
      transport: async () => ({
        launched: false,
        session: 'already_running',
        tmux_window: 'UI-1'
      }),
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
    click(mount, '.rtile__resolve');
    await vi.waitFor(() =>
      expect(document.querySelector('.toast')).not.toBeNull()
    );

    expect(sent[0].type).toBe('worker-resolve-in-session');
    expect(sent[0].payload).toMatchObject({
      bead_id: 'A-1',
      root_dir: WS_A,
      expected_revision: 1
    });
    expect(document.querySelector('.toast')?.textContent).toBe(
      '이미 열려 있습니다 · UI-1'
    );
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
    expect(
      tile?.querySelector('.wait-verdict summary')?.textContent?.trim()
    ).toBe('↻ 재시도 대기 2/3');
    expect(tile?.querySelector('.rtile__resolve')).toBeNull();
  });

  // 선행 대기도 같은 배타 자리를 쓰는 held 타일이다 (선행 대기 계층 §5.4).
  test('renders recovery with wait actions and includes it in the blocked summary', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'waiting',
              session_id: 'saved',
              started_at: NOW - 100,
              finished_at: NOW - 50,
              cause: 'session_ended_unresolved',
              cause_detail: {
                recovery: {
                  reason: 'authority',
                  classification: 'authority',
                  disposition: 'wait',
                  policy_schema: 1
                }
              }
            }
          },
          wait_reasons: [
            {
              kind: 'recovery',
              subject: { bead_id: 'A-1', root_dir: WS_A },
              headline: '조건 대기 · 승인 확인 · 원인 session_ended_unresolved',
              release: '안전 판단 뒤 이어하기',
              verdict: 'action_required',
              targets: [],
              actions: []
            }
          ]
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const tile = el(mount, '.rtile[data-attempt-id="t1"]');
    expect(tile?.querySelector('.rtile__elapsed')).toBeNull();
    expect(
      tile?.querySelector('.wait-verdict summary')?.textContent?.trim()
    ).toContain('조건 대기');
    expect(tile?.querySelector('.op-btn.rtile__resume')).not.toBeNull();
    expect(tile?.querySelector('.rtile__foot .rtile__discard')).not.toBeNull();
    expect(mount.querySelectorAll('.rtile--failed')).toHaveLength(0);
    expect(mount.querySelector('.wait-summary')?.textContent).toMatch(
      /막힘\s*1\s*·\s*⛔\s*1/
    );
  });

  test('carries the running recovery label through the Monitor adapter', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            old: {
              attempt_id: 'old',
              bead_id: 'A-1',
              status: 'waiting',
              started_at: NOW - 100,
              cause_detail: { recovery: { reason: 'verification' } }
            },
            live: {
              attempt_id: 'live',
              bead_id: 'A-1',
              status: 'running',
              started_at: NOW - 50,
              resumed_from: 'old'
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(
      el(mount, '.rtile[data-attempt-id="live"] .rtile__elapsed')?.textContent
    ).toBe('복구 중');
  });

  test('renders a waiting attempt as a held tile with the 선행 대기 badge', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'waiting',
              started_at: NOW - 100,
              finished_at: NOW - 50,
              cause_detail: {
                summary: '선행 미충족으로 착수하지 않았습니다',
                blockers: [{ id: 'A-9', rig: null, status: 'open' }],
                bead_status: 'open'
              }
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const tile = el(mount, '.rtile[data-attempt-id="t1"]');
    expect(
      tile?.querySelector('.wait-verdict summary')?.textContent?.trim()
    ).toBe('⛓ 선행 대기');
    expect(tile?.querySelector('.rtile__elapsed')).toBeNull();
    expect(tile?.querySelector('.rtile__held-summary')?.textContent).toBe(
      '선행 미충족으로 착수하지 않았습니다'
    );
    expect(tile?.querySelector('.rtile__resolve')).toBeNull();
    expect(tile?.querySelector('.rtile__pause')).toBeNull();
  });

  test('draws the blocker chip on a waiting tile', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            t1: {
              attempt_id: 't1',
              bead_id: 'A-1',
              status: 'waiting',
              started_at: NOW - 100,
              finished_at: NOW - 50,
              cause_detail: {
                summary: '선행 미충족으로 착수하지 않았습니다',
                blockers: [{ id: 'A-9', rig: null, status: 'open' }],
                bead_status: 'open'
              }
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const tile = el(mount, '.rtile[data-attempt-id="t1"]');
    expect(tile?.querySelector('.worker-dep--pred')?.textContent).toContain(
      '⛓ A-9'
    );
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

describe('views/monitor 공급자 보류 타일 (UI-jr8v §10, UI-fdjk)', () => {
  const HELD_ATTEMPT = {
    attempt_id: 't1',
    bead_id: 'A-1',
    status: 'paused',
    cause: 'provider_outage:overloaded_529',
    cause_detail: { summary: 'Claude API 과부하', message: '529' },
    runner: 'claude',
    model: 'opus',
    started_at: NOW - 100,
    session_id: 's'
  };

  /**
   * @param {Partial<Record<string, any>>} [patch]
   * @returns {ReturnType<typeof setup>}
   */
  function held(patch = {}) {
    return setup({
      workspaces: [
        workspace({
          attempts: { t1: HELD_ATTEMPT },
          runner_catalog: {
            runners: {
              claude: { default_model: 'opus', models: { opus: {} } },
              codex: { default_model: 'sol', models: { sol: {} } }
            }
          },
          ...patch
        })
      ],
      workspaces_state: [state()],
      ...(patch.transport ? { transport: patch.transport } : {})
    });
  }

  test('draws the provider verdict badge instead of a running tile', () => {
    const { mount, view } = held();

    view.load();

    const tile = el(mount, '#monitor-running .rtile[data-attempt-id="t1"]');
    expect(tile.classList.contains('rtile--provider-hold')).toBe(true);
    expect(tile.querySelector('.wait-verdict summary')).not.toBeNull();
    expect(tile.querySelector('.rtile__pause')).toBeNull();
  });

  test('opens the non-failure popover from the verdict badge', () => {
    const { mount, view } = held();

    view.load();
    click(mount, '.wait-verdict summary');

    expect(
      mount.querySelector('.wait-verdict .chip-popover')?.textContent
    ).toContain('작업 실패 아님');
  });

  test('opens the alternate selector from the tile action foot', () => {
    const { mount, view } = held();

    view.load();
    click(mount, '.rtile__resume-alternate');

    const model = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.provider-resume-dialog__model')
    );
    expect(model.value).toBe(JSON.stringify(['claude', 'opus']));
    expect(model.querySelectorAll('optgroup')).toHaveLength(2);
  });

  test('sends a cross-runner override as fresh_current with the tile repo', async () => {
    const { mount, view, sent } = held({
      transport: async () => ({ resumed: true })
    });

    view.load();
    click(mount, '.rtile__resume-alternate');
    const model = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.provider-resume-dialog__model')
    );
    model.value = JSON.stringify(['codex', 'sol']);
    model.dispatchEvent(new Event('change', { bubbles: true }));
    click(mount, '.provider-resume-dialog__confirm');
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await vi.waitFor(() =>
      expect(
        sent.filter((call) => call.type === 'worker-attempt-resume')
      ).toHaveLength(1)
    );

    expect(
      sent.find((call) => call.type === 'worker-attempt-resume')?.payload
    ).toEqual({
      attempt_id: 't1',
      root_dir: WS_A,
      expected_revision: 1,
      exec_override: { runner: 'codex', model: 'sol' },
      continuation: 'fresh_current',
      decision_token: {}
    });
  });

  test('closes the alternate selector without resuming on 취소', () => {
    const { mount, view, sent } = held();

    view.load();
    click(mount, '.rtile__resume-alternate');
    click(mount, '.provider-resume-dialog__cancel');

    expect(mount.querySelector('.provider-resume-dialog')).toBeNull();
    expect(sent).toEqual([]);
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
    click(mount, '#monitor-runnable .worker-dep--pred.worker-dep__open');

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
    click(mount, '#monitor-runnable .worker-dep--pred.worker-dep__open');

    expect(gotoIssue).toHaveBeenCalledWith('A-1');
    expect(switchWorkspace).not.toHaveBeenCalled();
  });

  test('switches to the confirmed source repo before opening a Worker source', async () => {
    const { mount, view, gotoIssue, switchWorkspace } = setup({
      workspaces: [
        workspace({
          runnable: [
            {
              bead_id: 'A-9',
              title: '가운데',
              workflow: { worker_created_from: 'B-source' }
            }
          ],
          bead_overlay: {
            'A-9': {
              worker_created_from: 'B-source',
              worker_created_from_root_dir: WS_B
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '#monitor-runnable .worker-created-source');
    await flushMicrotasks();

    expect(switchWorkspace).toHaveBeenCalledWith(WS_B);
    expect(gotoIssue).toHaveBeenCalledWith('B-source');
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
    click(mount, '#monitor-runnable .worker-dep--pred.worker-dep__open');

    expect(switchWorkspace).toHaveBeenCalledWith(WS_B);
    expect(gotoIssue).not.toHaveBeenCalled();

    await flushMicrotasks();

    expect(gotoIssue).toHaveBeenCalledWith('B-1');
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

describe('monitor 겹침 칩 (UI-qm12 §5.3, 클릭은 UI-8x90 §4.3)', () => {
  /**
   * @param {string[]} [scope]
   * @returns {{ scope: string[], artifacts: string[] }}
   */
  function declared(scope = ['server/worker']) {
    return { scope, artifacts: ['docs/spec.md'] };
  }

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
        mount.querySelectorAll('[data-bead-id="A-1"] .worker-dep--overlap')
      ).map((chip) => chip.getAttribute('data-dep-id'))
    ).toEqual(['A-2', 'A-3', 'A-4', 'A-5']);
  });

  test('lists the shared paths in the chip tooltip', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(
      el(mount, '[data-bead-id="A-1"] .worker-dep--overlap')?.getAttribute(
        'title'
      )
    ).toBe('겹침 · #2\nserver/worker');
  });

  test('opens a 후속 issue from the same button (UI-8x90 §4.3)', () => {
    const { mount, view, gotoIssue } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_dependents: { 'A-1': { ids: ['A-8'] } }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '[data-bead-id="A-1"] .worker-dep--dependents');

    expect(gotoIssue).toHaveBeenCalledWith('A-8');
  });

  test('switches the repo before opening a foreign 후속', async () => {
    const { mount, view, gotoIssue, switchWorkspace } = setup({
      workspaces: [
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }],
          bead_dependents: { 'B-1': { ids: ['B-8'] } }
        })
      ],
      workspaces_state: [
        state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
      ]
    });

    view.load();
    click(mount, '[data-bead-id="B-1"] .worker-dep--dependents');

    expect(switchWorkspace).toHaveBeenCalledWith(WS_B);

    await flushMicrotasks();

    expect(gotoIssue).toHaveBeenCalledWith('B-8');
  });

  test('opens the counterpart issue on a chip click', () => {
    const { mount, view, gotoIssue } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_scope: { 'A-1': declared(), 'A-2': declared() }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '[data-bead-id="A-1"] .worker-dep--overlap');

    expect(gotoIssue).toHaveBeenCalledWith('A-2');
  });

  test('switches the repo before opening a counterpart of another one', async () => {
    const { mount, view, gotoIssue, switchWorkspace } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          bead_scope: { 'A-1': declared() }
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1' }, { bead_id: 'B-2' }],
          bead_scope: { 'B-1': declared(), 'B-2': declared() }
        })
      ],
      workspaces_state: [
        state(),
        state({ root_dir: WS_B, name: 'repo-b', issue_prefix: 'B' })
      ]
    });

    view.load();
    click(mount, '[data-bead-id="B-1"] .worker-dep--overlap');

    expect(switchWorkspace).toHaveBeenCalledWith(WS_B);

    await flushMicrotasks();

    expect(gotoIssue).toHaveBeenCalledWith('B-2');
  });

  test('keeps no 팝오버 or 배치 markup on the card', () => {
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
    click(mount, '[data-bead-id="A-1"] .worker-dep--overlap');

    expect(mount.querySelector('.mon-overlap__popover')).toBeNull();
    expect(mount.querySelector('.mon-overlap__place')).toBeNull();
  });
});

describe('monitor 판정 칩 사유 팝업 (UI-8x90 §4.5)', () => {
  /**
   * A runnable row carrying the `복잡` judgement.
   *
   * @returns {ReturnType<typeof setup>}
   */
  function judgementSetup() {
    return setup({
      workspaces: [
        workspace({
          runnable: [
            {
              bead_id: 'A-1',
              title: '복잡 후보',
              rec: {
                rec_orchestration_model: 'fable',
                rec_reason: 'invariant_reasoning'
              }
            }
          ]
        })
      ],
      workspaces_state: [state()]
    });
  }

  test('opens the 사유 popup on a 복잡 chip click', () => {
    const { mount, view } = judgementSetup();

    view.load();
    click(mount, '.worker-card[data-bead-id="A-1"] .judgement-chip');

    expect(el(mount, '.chip-popover')?.getAttribute('role')).toBe('dialog');
  });

  test('writes the 사유 sentence rather than the signal code', () => {
    const { mount, view } = judgementSetup();

    view.load();
    click(mount, '.worker-card[data-bead-id="A-1"] .judgement-chip');

    expect(el(mount, '.chip-popover')?.textContent).toContain(
      '정합성이 상태기계·동시성·불변식 추론에 달려 있다'
    );
  });

  test('does not open the issue detail on that click', () => {
    const { mount, view, gotoIssue } = judgementSetup();

    view.load();
    click(mount, '.worker-card[data-bead-id="A-1"] .judgement-chip');

    expect(gotoIssue).not.toHaveBeenCalled();
  });

  test('closes the popup on Escape', () => {
    const { mount, view } = judgementSetup();
    view.load();
    click(mount, '.worker-card[data-bead-id="A-1"] .judgement-chip');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(mount.querySelector('.chip-popover')).toBeNull();
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

describe('Monitor 외부 저장소 PR 표시 (UI-kyky §6.2)', () => {
  test('draws the foreign target beside the PR link and refuses the merge', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          pr_wait: [
            {
              bead_id: 'A-3',
              added_at: 1,
              external: true,
              foreign: true,
              repo_slug: 'other/repo',
              pr_url: 'https://github.com/other/repo/pull/12',
              pr_number: 12
            }
          ],
          pr_observations: {
            'A-3': {
              pr: null,
              gate: {
                enabled: false,
                tier: 'undecidable',
                gate_badge: '관측 오류',
                base_badge: '',
                reason: 'pr_repo_foreign'
              }
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const row = el(mount, '.worker-mini[data-bead-id="A-3"]');
    const badge = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__foreign-pr')
    );
    expect(badge.textContent?.trim()).toBe('↗ other/repo');
    expect(badge.title).toBe(
      '다른 저장소의 PR입니다. 이 워크스페이스에서는 상태를 관측·머지·정리하지 않습니다.'
    );
    expect(row.querySelector('.worker-mini__pr')?.getAttribute('href')).toBe(
      'https://github.com/other/repo/pull/12'
    );
    expect(row.textContent).toContain('외부 저장소 PR');
    const merge = /** @type {HTMLButtonElement|null} */ (
      row.querySelector('.worker-mini__merge')
    );
    expect(merge === null || merge.disabled).toBe(true);
    expect(row.querySelector('.worker-mini__discard')).toBeNull();
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
      el(mount, '#monitor-pr_wait [data-bead-id="A-1"] .worker-dep--overlap')
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

  test('opens the counterpart issue from a PR 대기 row chip', () => {
    const { mount, view, gotoIssue } = setup({
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
    click(mount, '#monitor-pr_wait [data-bead-id="A-1"] .worker-dep--overlap');

    expect(gotoIssue).toHaveBeenCalledWith('A-2');
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
      el(mount, '#monitor-done [data-bead-id="A-1"] .worker-dep--overlap')
    ).toBeNull();
  });
});

describe('views/monitor 숨김과 lifecycle (UI-hhn9 §6)', () => {
  test('clear stops the display tick it started', () => {
    vi.useFakeTimers();
    try {
      const { view } = setup({
        workspaces: [workspace({ runnable: [{ bead_id: 'A-1', title: 't' }] })]
      });
      view.load();
      const with_tick = vi.getTimerCount();

      view.clear();

      expect(with_tick).toBeGreaterThan(0);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });
});

// 막힌 대기 행의 `▶ 재개`는 두 탭이 같은 렌더러를 쓰므로 Monitor에도 선다
// (UI-01wh §3.6). 다른 점은 어느 저장소의 큐인지를 `root_dir`이 말한다는 것뿐이다.
describe('monitor blocked waiting row resume (UI-01wh §3.6)', () => {
  test('sends the hold since with the row repo on a 재개 click', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }],
          hold: {
            kind: 'systemic',
            cause: 'loud_fail_blocker',
            since: 77,
            bead_ids: ['A-1']
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.worker-mini[data-bead-id="A-1"] .worker-mini__hold-resume');
    await flushMicrotasks();

    expect(sent).toEqual([
      {
        type: 'worker-queue-hold-resume',
        payload: { since: 77, root_dir: WS_A }
      }
    ]);
  });
});
