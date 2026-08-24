import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
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
});

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
  return {
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
 * @param {{ workspaces?: any[], workspaces_state?: any[], now?: () => number, current?: string, switchWorkspace?: (root: string) => Promise<unknown>, transport?: (type: string, payload?: any) => Promise<any>, confirm?: (message: string) => boolean }} [input]
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

    expect(el(mount, '.mon2-deck__row')).toBe(null);
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

    const badge = el(mount, '.mon2-parallel .worker-mini__repo');
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

    expect(el(mount, '.mon2-lane--empty')).toBeTruthy();
    expect(el(mount, '.mon2-lane__hint').textContent?.trim()).toBe(
      'repo-a 직렬 2 비어 있음'
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
    select.value = 'all';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(window.localStorage.getItem('bdui.monitor.done-range')).toBe('all');
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
            { bead_id: 'A-1', title: 'a', spec_id: 'docs/a.md' },
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

  test('splits the waiting lane into a parallel and a serial area', () => {
    const { mount, view } = setup({ workspaces, workspaces_state });

    view.load();

    expect(
      Array.from(mount.querySelectorAll('#monitor-queue .mon2-area')).map((a) =>
        a.getAttribute('data-area')
      )
    ).toEqual(['parallel', 'serial']);
    expect(el(mount, '#monitor-queue .mon2-sec')).toBeNull();
  });

  test('counts only the rows the parallel area actually shows', () => {
    const { mount, view } = setup({ workspaces, workspaces_state });

    view.load();

    // A-1과 B-1은 연결 레인이 가져갔다 — 카운트는 보이는 행 수다.
    expect(
      Array.from(mount.querySelectorAll('.mon2-parallel .mon2-item')).map((r) =>
        r.getAttribute('data-bead-id')
      )
    ).toEqual(['A-2']);
    expect(el(mount, '.mon2-area__count').textContent?.trim()).toBe('1');
  });

  test('names each derived chain lane by its display order', () => {
    const { mount, view } = setup({ workspaces, workspaces_state });

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

  test('marks a running chain row with the bullet its location label earns', () => {
    const { mount, view } = setup({
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

    expect(
      Array.from(mount.querySelectorAll('.mon2-crow__where')).map((w) =>
        w.textContent?.trim()
      )
    ).toEqual(['● 실행중', '#1']);
  });

  test('opens the bead a chain row points at', () => {
    const { mount, view, gotoIssue } = setup({ workspaces, workspaces_state });

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

    const badge = el(mount, '.mon2-lane .mon2-lane__badge');
    expect(badge.textContent?.trim()).toBe('A-1 점유');
    const ghost = el(mount, '.mon2-lane .mon2-item--ghost');
    expect(ghost.getAttribute('data-bead-id')).toBe('A-1');
    expect(ghost.textContent).toContain('점유 중인 작업');
    expect(ghost.textContent).toContain('실행 중 · 점유');
    expect(ghost.hasAttribute('data-row-index')).toBe(false);
    expect(ghost.hasAttribute('data-queue-index')).toBe(false);
    expect(
      Array.from(mount.querySelectorAll('.mon2-lane [data-queue-index]')).map(
        (row) => row.getAttribute('data-bead-id')
      )
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
      el(mount, '.mon2-lane .worker-pane__title').textContent?.trim()
    ).toBe('repo-a · 직렬 1');
  });

  test('adds one blank chain lane and then refuses a second', () => {
    const { mount, view } = setup({ workspaces, workspaces_state });

    view.load();
    click(mount, '.mon2-newlane');

    expect(mount.querySelectorAll('.mon2-clane')).toHaveLength(2);
    expect(
      /** @type {HTMLButtonElement} */ (el(mount, '.mon2-newlane')).disabled
    ).toBe(true);
  });

  test('collapses an area and remembers it', () => {
    const { mount, view } = setup({ workspaces, workspaces_state });

    view.load();
    click(mount, '.mon2-area__toggle[data-area="parallel"]');

    expect(mount.querySelectorAll('.mon2-parallel .mon2-item')).toHaveLength(0);
    expect(
      JSON.parse(
        window.localStorage.getItem('beads-ui.monitor.sections') || '{}'
      ).parallel
    ).toBe(true);
  });

  test('drops a pending lane once a derived chain absorbs its seed', async () => {
    const snapshot = [
      workspace({ queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }] })
    ];
    const { mount, view } = setup({
      workspaces: snapshot,
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.mon2-newlane');
    fireDrag(el(mount, '.mon2-parallel .worker-mini'), 'dragstart');
    fireDrag(el(mount, '[data-drop="chain"]'), 'drop');
    await flushMicrotasks();
    expect(el(mount, '.mon2-crow')?.getAttribute('data-bead-id')).toBe('A-1');

    snapshot[0].bead_blocked_by = { 'A-2': ['A-1'] };
    view.load();

    expect(
      Array.from(mount.querySelectorAll('.mon2-clane')).map((lane) =>
        lane.getAttribute('data-lane-id')
      )
    ).toEqual([`chain:${['A-1', 'A-2'].join('\u0000')}`]);
    expect(
      /** @type {HTMLButtonElement} */ (el(mount, '.mon2-newlane')).disabled
    ).toBe(false);
  });

  test('leaves no 🔗 popover behind', () => {
    const { mount, view } = setup({ workspaces, workspaces_state });

    view.load();

    expect(el(mount, '.mon-link')).toBeNull();
    expect(el(mount, '.mon2-chains')).toBeNull();
    expect(el(mount, '.mon2-item__ops')).toBeNull();
  });

  test('draws a cycle lane as an unordered node list', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-1': ['A-2'], 'A-2': ['A-1'] }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(el(mount, '.mon2-lane__cycle')?.textContent?.trim()).toBe(
      '⛔ 의존 사이클 — 자동 교정 불가'
    );
    expect(mount.querySelectorAll('.mon2-crow__seq')).toHaveLength(0);
    expect(
      Array.from(mount.querySelectorAll('.mon2-crow')).map((row) =>
        row.getAttribute('draggable')
      )
    ).toEqual(['false', 'false']);
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
});

describe('views/monitor [대기로 ↴] lane menu (UI-e6hw §6)', () => {
  /**
   * @returns {ReturnType<typeof setup>}
   */
  function menuSetup() {
    return setup({
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
    });
  }

  test('offers the parallel area, every chain lane, a new lane and its own serial lanes', () => {
    const { mount, view } = menuSetup();

    view.load();
    click(mount, '#monitor-runnable .worker-card__place');

    expect(
      Array.from(mount.querySelectorAll('.worker-card__place-lane')).map((b) =>
        b.getAttribute('data-lane')
      )
    ).toEqual(['parallel', 'lane:0', 'new-lane', 'serial:s1', 'serial:s2']);
    expect(
      Array.from(mount.querySelectorAll('.worker-card__place-lane span')).map(
        (s) => s.textContent?.trim()
      )
    ).toContain('연결 1 끝에');
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

  test('links to a chain lane tail before loading its own parallel queue', async () => {
    const { mount, view, sent } = menuSetup();

    view.load();
    click(mount, '#monitor-runnable .worker-card__place');
    click(mount, '.worker-card__place-lane[data-lane="lane:0"]');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual(['dep-add', 'worker-queue-place']);
    expect(sent[0].payload).toEqual({ a: 'A-9', b: 'B-1', root_dir: WS_A });
  });

  test('seeds a fresh chain lane from the new-lane item', async () => {
    const { mount, view, sent } = menuSetup();

    view.load();
    click(mount, '#monitor-runnable .worker-card__place');
    click(mount, '.worker-card__place-lane[data-lane="new-lane"]');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual(['worker-queue-place']);
    expect(
      Array.from(mount.querySelectorAll('.mon2-clane')).map((lane) =>
        lane.getAttribute('data-lane-id')
      )
    ).toContain('pending:0');
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
    click(mount, '.mon2-parallel .mon2-rowops__remove');
    await flushMicrotasks();

    expect(sent[0]).toEqual({
      type: 'worker-queue-remove',
      payload: { bead_id: 'A-1', root_dir: WS_A, expected_revision: 1 }
    });
  });

  test('moves a parallel row down between its own repo rows (§6)', async () => {
    const { mount, view, sent } = dragSetup();

    view.load();
    click(mount, '.mon2-parallel .mon2-rowops__down');
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

  test('splices a chain row out from its ✕ without touching the queue (§6)', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }, { bead_id: 'A-3' }],
          bead_blocked_by: { 'A-2': ['A-1'], 'A-3': ['A-2'] }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '.mon2-crow[data-bead-id="A-2"] .mon2-crow__detach');
    await flushMicrotasks();

    expect(sent).toEqual([
      { type: 'dep-remove', payload: { a: 'A-2', b: 'A-1', root_dir: WS_A } },
      { type: 'dep-remove', payload: { a: 'A-3', b: 'A-2', root_dir: WS_A } },
      { type: 'dep-add', payload: { a: 'A-3', b: 'A-1', root_dir: WS_A } }
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
});

describe('views/monitor dependency editing (UI-2gi1 §6.5, UI-e6hw §5)', () => {
  test('releases a predecessor from its chip ✕', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          runnable: [{ bead_id: 'A-2', title: 'blocked', blocked_by: ['A-0'] }]
        })
      ],
      workspaces_state: [state()]
    });

    view.load();
    click(mount, '#monitor-runnable .worker-dep__remove');
    await flushMicrotasks();

    expect(sent[0]).toEqual({
      type: 'dep-remove',
      payload: { a: 'A-2', b: 'A-0', root_dir: WS_A }
    });
  });

  test('sends the dependency op before the queue op of one drop', async () => {
    const { mount, view, sent } = setup({
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

    expect(sent).toEqual([
      { type: 'dep-add', payload: { a: 'A-9', b: 'B-1', root_dir: WS_A } },
      {
        type: 'worker-queue-place',
        payload: {
          bead_id: 'A-9',
          index: 1,
          root_dir: WS_A,
          expected_revision: 1
        }
      }
    ]);
  });

  test('stops at the first failing op of a drop', async () => {
    const { mount, view, sent } = setup({
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
        return null;
      }
    });

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    fireDrag(el(mount, '[data-drop="chain"]'), 'drop');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual(['dep-add']);
    expect(idsIn(mount, 'runnable')).toEqual(['A-9']);
  });

  test('refuses a repo serial row dropped on a chain lane', async () => {
    const { mount, view, sent } = setup({
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
          : null
    });

    view.load();
    fireDrag(el(mount, '#monitor-runnable .worker-card'), 'dragstart');
    fireDrag(el(mount, '[data-drop="chain"]'), 'drop');
    await flushMicrotasks();

    expect(sent.map((m) => m.type)).toEqual(['dep-add', 'worker-queue-place']);
    expect(
      Array.from(document.querySelectorAll('.toast')).map(
        (node) => node.textContent
      )
    ).toContain('큐 적재 거부: no_spec');
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

describe('views/monitor 연결 레인 route 칩 (UI-yrzu §7.2)', () => {
  const WORKFLOW = {
    route: 'spec_backed',
    chips: { route: 'spec_backed', route_source: 'explicit' }
  };

  test('draws the route chip after the id of a chain row', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] },
          bead_workflow: { 'A-1': WORKFLOW }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.mon2-crow[data-bead-id="A-1"]')
    );
    const order = Array.from(row.children).map((child) => child.className);
    expect(row.querySelector('.ctl-chip--route')?.textContent).toBe(
      'spec_backed'
    );
    expect(order.indexOf('ctl-chip ctl-chip--route')).toBe(
      order.indexOf('worker-mini__id') + 1
    );
  });

  test('draws no chip on a chain row whose bead has no workflow', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-1' }, { bead_id: 'A-2' }],
          bead_blocked_by: { 'A-2': ['A-1'] }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(el(mount, '.mon2-crow .ctl-chip--route')).toBeNull();
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
