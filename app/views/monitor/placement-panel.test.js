import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { placementPairKey } from '../../../server/placement/wire.js';
import { createMonitorView } from './index.js';

const NOW = 1_700_000_000_000;
const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';
const WS_C = '/tmp/example/repo-c';

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
 * A jev relation as the wire carries it.
 *
 * @param {string} c
 * @param {string} x
 * @param {string} relation
 * @returns {[string, any]}
 */
function rel(c, x, relation) {
  const [a, b] = c < x ? [c, x] : [x, c];
  return [
    placementPairKey(a, b),
    {
      a,
      b,
      relation,
      source: 'jev',
      confidence: 0.9,
      jev_choice: relation,
      judged_at: NOW - 60_000
    }
  ];
}

/**
 * One repository's queue: `<p>-P` waits in the parallel lane and `<p>-1` is a
 * ready candidate independent of it, so its place is `병렬 · 대기 #2`.
 *
 * @param {string} p
 * @param {Record<string, any>} [over]
 * @returns {Record<string, any>}
 */
function repoQueue(p, over = {}) {
  return {
    revision: 5,
    queue: [{ bead_id: `${p}-P`, added_at: 1 }],
    serial_lane_count: 1,
    serial_lanes: [{ id: 's1', entries: [] }],
    lane_states: {},
    attempts: {},
    done: [],
    pr_wait: [],
    placement_status: { [`${p}-1`]: { state: 'ready', done: 1, total: 1 } },
    placement_relations: Object.fromEntries([
      rel(`${p}-1`, `${p}-P`, 'independent')
    ]),
    ...over
  };
}

/**
 * A pipeline entry for one repository.
 *
 * @param {string} p
 * @param {string} name
 * @param {string} root_dir
 * @param {Record<string, any>} [over]
 * @returns {Record<string, any>}
 */
function repo(p, name, root_dir, over = {}) {
  const queue = repoQueue(p, over);
  return {
    root_dir,
    name,
    pr_observations: {},
    bead_titles: {},
    runnable: Object.keys(queue.placement_status).map((bead_id) => ({
      bead_id,
      title: `${bead_id} 제목`,
      blocked_by: []
    })),
    ...queue
  };
}

/**
 * @param {string} root_dir
 * @param {string} name
 * @returns {Record<string, any>}
 */
function state(root_dir, name) {
  return {
    root_dir,
    name,
    auto_advance: false,
    auto_merge: false,
    slots: 1,
    revision: 1,
    issue_prefix: name
  };
}

/**
 * @param {any[]} workspaces
 * @param {(type: string, payload: any) => Promise<any>} [transport]
 */
function setup(workspaces, transport) {
  document.body.innerHTML = '<div id="m"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const pipelineStore = {
    get: () => workspaces,
    getWorkspacesState: () =>
      workspaces.map((entry) => state(entry.root_dir, entry.name)),
    crossLanes: () => null,
    subscribe: () => () => {}
  };
  const send = vi.fn(
    async (/** @type {string} */ type, /** @type {any} */ payload) =>
      transport ? await transport(type, payload) : null
  );
  const view = createMonitorView(mount, {
    gotoIssue: vi.fn(),
    transport: send,
    router: { gotoView: vi.fn() },
    pipelineStore: /** @type {any} */ (pipelineStore),
    getWorkspacePath: () => WS_A,
    switchWorkspace: vi.fn(() => Promise.resolve(null)),
    confirm: () => true,
    now: () => NOW
  });
  active_views.push(view);
  view.load();
  return { mount, send };
}

/**
 * @param {HTMLElement} mount
 * @param {string} selector
 */
function click(mount, selector) {
  const node = /** @type {HTMLElement} */ (mount.querySelector(selector));
  node.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

/**
 * @param {Element|null} node
 * @returns {string}
 */
function text(node) {
  return (node?.textContent || '').replace(/\s+/g, ' ').trim();
}

/** @returns {Promise<void>} */
function flush() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * @param {HTMLElement} mount
 * @param {string} root_dir
 * @returns {HTMLElement}
 */
function card(mount, root_dir) {
  return /** @type {HTMLElement} */ (
    mount.querySelector(`.mon-plan__repo[data-root-dir="${root_dir}"]`)
  );
}

/** @returns {string} */
function toastText() {
  return Array.from(document.querySelectorAll('.toast'))
    .map((node) => node.textContent)
    .join('\n');
}

describe('monitor queue header controls (UI-hf8v §3.2)', () => {
  test('counts the repositories with candidate entries on [전체 배치안]', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A),
      repo('B', 'repo-b', WS_B),
      repo('C', 'repo-c', WS_C, { placement_status: {} })
    ]);

    expect(text(mount.querySelector('.mon-plan__open'))).toBe(
      '전체 배치안 · 2개 레포'
    );
  });

  test('counts the repositories still being judged', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A, { placement_progress: { done: 1, total: 3 } }),
      repo('B', 'repo-b', WS_B, { placement_progress: { done: 2, total: 2 } })
    ]);

    expect(text(mount.querySelector('.mon-plan__judging'))).toBe(
      '판정 중 · 1개 레포'
    );
  });

  test('draws no judging text when every pair is settled', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A, { placement_progress: { done: 2, total: 2 } })
    ]);

    expect(mount.querySelector('.mon-plan__judging')).toBeNull();
  });

  test('draws nothing when no repository carries placement material', () => {
    const entry = repo('A', 'repo-a', WS_A);
    delete entry.placement_status;
    delete entry.placement_relations;

    const { mount } = setup([entry]);

    expect(mount.querySelector('.mon-plan-controls')).toBeNull();
  });

  test('disables [전체 배치안] with a reason when no repository has entries', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A, { placement_status: {} })
    ]);

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.mon-plan__open')
    );
    expect(button.disabled).toBe(true);
    expect(button.title).toBe('배치안을 볼 후보가 있는 레포가 없습니다');
  });
});

describe('monitor placement panel (UI-hf8v §3.3, UI-5cmo §3.3)', () => {
  test('opens with only the apply buttons off when nothing is recommendable', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A, {
        placement_status: {
          'A-1': { state: 'pending', reason: 'judging', done: 0, total: 1 }
        }
      })
    ]);

    click(mount, '.mon-plan__open');

    expect(
      mount.querySelector('#monitor-queue .mon-plan__summary')
    ).not.toBeNull();
    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('.mon-plan__apply-all')
      ).disabled
    ).toBe(true);
  });

  test('draws the repository table blocks in name order', () => {
    const { mount } = setup([
      repo('B', 'repo-b', WS_B),
      repo('A', 'repo-a', WS_A)
    ]);

    click(mount, '.mon-plan__open');

    expect(
      Array.from(mount.querySelectorAll('.mon-plan__repo'), (block) =>
        block.getAttribute('data-root-dir')
      )
    ).toEqual([WS_A, WS_B]);
  });

  test('stands each table block at the bottom of its own repo group', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A),
      repo('B', 'repo-b', WS_B)
    ]);

    click(mount, '.mon-plan__open');

    expect(
      [WS_A, WS_B].map((root) => {
        const block = card(mount, root);
        return [
          block.closest('.mon2-sec')?.getAttribute('data-root-dir'),
          block.parentElement?.lastElementChild === block
        ];
      })
    ).toEqual([
      [WS_A, true],
      [WS_B, true]
    ]);
  });

  test('leaves the repository name out of the block head', () => {
    const { mount } = setup([repo('A', 'repo-a', WS_A)]);

    click(mount, '.mon-plan__open');

    const head = text(card(mount, WS_A).querySelector('.mon-plan__repo-hd'));
    expect(head.startsWith('적용 대상 추천 1 / 1')).toBe(true);
    expect(head).not.toContain('repo-a');
  });

  test('draws no panel frame at the top of the queue body', () => {
    const { mount } = setup([repo('A', 'repo-a', WS_A)]);

    click(mount, '.mon-plan__open');

    const body = /** @type {HTMLElement} */ (
      mount.querySelector('#monitor-queue .mon2-queue-body')
    );
    expect(mount.querySelector('.mon-plan__hd')).toBeNull();
    expect(body.firstElementChild?.classList.contains('mon2-sec')).toBe(true);
  });

  test('puts the summary row at the bottom of the queue body', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A),
      repo('B', 'repo-b', WS_B)
    ]);

    click(mount, '.mon-plan__open');

    const body = /** @type {HTMLElement} */ (
      mount.querySelector('#monitor-queue .mon2-queue-body')
    );
    expect(body.lastElementChild?.classList.contains('mon-plan__summary')).toBe(
      true
    );
    expect(text(mount.querySelector('.mon-plan__total'))).toBe(
      '2건 · 2개 레포 — repo-a 1 · repo-b 1'
    );
  });

  test('lays the preview card among the lane rows in the plan order', () => {
    const { mount } = setup([repo('A', 'repo-a', WS_A)]);

    click(mount, '.mon-plan__open');

    const lane = /** @type {HTMLElement} */ (
      mount.querySelector(`[data-drop="parallel"][data-root-dir="${WS_A}"]`)
    );
    expect(
      Array.from(
        lane.children,
        (node) =>
          node.getAttribute('data-bead-id') ||
          `preview:${node.getAttribute('data-preview-id')}`
      )
    ).toEqual(['A-P', 'preview:A-1']);
  });

  test('draws the preview card in the configured 직렬 1 a plan names (UI-5cmo §3.1)', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A, {
        placement_relations: Object.fromEntries([rel('A-1', 'A-P', 'conflict')])
      })
    ]);

    click(mount, '.mon-plan__open');

    const lane = /** @type {HTMLElement} */ (
      mount.querySelector(
        `[data-drop="repo-serial"][data-root-dir="${WS_A}"][data-lane-id="s1"]`
      )
    );
    expect(lane.querySelector('[data-preview-id="A-1"]')).not.toBeNull();
    expect(
      text(
        lane.closest('.worker-pane')?.querySelector('.worker-pane__title') ||
          null
      )
    ).toBe('직렬 1');
  });

  test('draws no preview card while the full plan is closed', () => {
    const { mount } = setup([repo('A', 'repo-a', WS_A)]);

    expect(mount.querySelector('.worker-card--preview')).toBeNull();
  });

  test('numbers the preview cards from 1 in every repository', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A),
      repo('B', 'repo-b', WS_B)
    ]);

    click(mount, '.mon-plan__open');

    expect(
      [WS_A, WS_B].map((root) =>
        text(
          mount.querySelector(
            `[data-drop="parallel"][data-root-dir="${root}"] .worker-card__preview-no`
          )
        )
      )
    ).toEqual(['#1', '#1']);
  });

  test('heads every repository table with 포함 · 후보 (UI-msmj)', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A),
      repo('B', 'repo-b', WS_B)
    ]);

    click(mount, '.mon-plan__open');

    expect(
      [WS_A, WS_B].map((root) =>
        Array.from(
          card(mount, root).querySelectorAll('.worker-plan__table th'),
          (cell) => text(cell)
        )
      )
    ).toEqual([
      ['포함', '후보'],
      ['포함', '후보']
    ]);
  });

  test('folds a repository without a recommendable candidate into one line', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A),
      repo('C', 'repo-c', WS_C, {
        placement_status: {
          'C-1': { state: 'pending', reason: 'judging', done: 0, total: 1 },
          'C-2': { state: 'pending', reason: 'judging', done: 0, total: 1 },
          'C-3': { state: 'no_counterpart' }
        }
      })
    ]);

    click(mount, '.mon-plan__open');

    expect(
      text(mount.querySelector('details.mon-plan__repo--folded > summary'))
    ).toBe('배치안 · 추천할 후보 없음 — jev 판정 중 2 · 비교할 이슈 없음 1');
  });

  test('keeps open the repo group of a repository with only a folded block', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A),
      repo('C', 'repo-c', WS_C, {
        queue: [],
        placement_status: { 'C-3': { state: 'no_counterpart' } }
      })
    ]);

    click(mount, '.mon-plan__open');

    expect(
      mount.querySelector(
        `#monitor-queue .mon2-sec[data-root-dir="${WS_C}"] details.mon-plan__repo--folded`
      )
    ).not.toBeNull();
  });

  test('stands a repo group with its block for a repository the lane model leaves out', () => {
    const entry = repo('A', 'repo-a', WS_A, { queue: [] });
    entry.runnable = [];

    const { mount } = setup([entry]);
    click(mount, '.mon-plan__open');

    expect(
      mount.querySelector(
        `#monitor-queue .mon2-sec[data-root-dir="${WS_A}"] .mon-plan__repo`
      )
    ).not.toBeNull();
  });

  test('closes the panel with Esc', () => {
    const { mount } = setup([repo('A', 'repo-a', WS_A)]);
    click(mount, '.mon-plan__open');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(
      mount.querySelector('.mon-plan__summary, .mon-plan__repo')
    ).toBeNull();
    expect(mount.querySelector('.worker-card--preview')).toBeNull();
  });

  test('closes the panel with the summary row ✕', () => {
    const { mount } = setup([repo('A', 'repo-a', WS_A)]);
    click(mount, '.mon-plan__open');

    click(mount, '.mon-plan__summary .mon-plan__close');

    expect(
      mount.querySelector('.mon-plan__summary, .mon-plan__repo')
    ).toBeNull();
  });

  test('keeps a checkbox change to its own repository', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A),
      repo('B', 'repo-b', WS_B)
    ]);
    click(mount, '.mon-plan__open');
    const box = /** @type {HTMLInputElement} */ (
      card(mount, WS_A).querySelector('.worker-plan__include')
    );

    box.checked = false;
    box.dispatchEvent(new Event('change', { bubbles: true }));

    expect(
      [WS_A, WS_B].map((root) =>
        text(card(mount, root).querySelector('.mon-plan__apply-repo'))
      )
    ).toEqual(['이 레포만 적용 (0)', '이 레포만 적용 (1)']);
    expect(text(mount.querySelector('.mon-plan__total'))).toBe(
      '1건 · 1개 레포 — repo-b 1'
    );
  });
});

/**
 * Turn one repository's `적용 대상` box on or off.
 *
 * @param {HTMLElement} mount
 * @param {string} root_dir
 * @param {boolean} on
 */
function setTarget(mount, root_dir, on) {
  const box = /** @type {HTMLInputElement} */ (
    card(mount, root_dir).querySelector('.mon-plan__target-box')
  );
  box.checked = on;
  box.dispatchEvent(new Event('change', { bubbles: true }));
}

describe('monitor placement apply targets (UI-5cmo §3.5)', () => {
  test('starts every repository block with its target box on', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A),
      repo('B', 'repo-b', WS_B)
    ]);

    click(mount, '.mon-plan__open');

    expect(
      Array.from(
        mount.querySelectorAll('.mon-plan__target-box'),
        (box) => /** @type {HTMLInputElement} */ (box).checked
      )
    ).toEqual([true, true]);
  });

  test('leaves a repository turned off out of the summary count', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A),
      repo('B', 'repo-b', WS_B)
    ]);
    click(mount, '.mon-plan__open');

    setTarget(mount, WS_A, false);

    expect(text(mount.querySelector('.mon-plan__total'))).toBe(
      '1건 · 1개 레포 — repo-b 1'
    );
  });

  test('dims the block and preview cards of a repository turned off', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A),
      repo('B', 'repo-b', WS_B)
    ]);
    click(mount, '.mon-plan__open');

    setTarget(mount, WS_A, false);

    expect(
      [WS_A, WS_B].map((root) => [
        card(mount, root).classList.contains('mon-plan__repo--off'),
        mount
          .querySelector(`.mon2-sec--queue[data-root-dir="${root}"]`)
          ?.classList.contains('mon2-sec--plan-off')
      ])
    ).toEqual([
      [true, true],
      [false, false]
    ]);
    expect(text(card(mount, WS_A).querySelector('.mon-plan__off'))).toBe(
      '적용 대상에서 뺌'
    );
  });

  test('sends nothing to a repository turned off on [선택한 레포 적용]', async () => {
    const { mount, send } = setup(
      [repo('A', 'repo-a', WS_A), repo('B', 'repo-b', WS_B)],
      async (type, payload) => ({
        applied: true,
        conflict: false,
        queue: repoQueue(payload.root_dir === WS_A ? 'A' : 'B', {
          placement_status: {}
        })
      })
    );
    click(mount, '.mon-plan__open');
    setTarget(mount, WS_A, false);

    click(mount, '.mon-plan__apply-all');
    await vi.waitFor(() => {
      expect(toastText()).toContain('넣음');
    });

    expect(send.mock.calls.map((call) => call[1].root_dir)).toEqual([WS_B]);
  });

  test('turns [선택한 레포 적용] off and asks for a choice when every repository is off', () => {
    const { mount } = setup([
      repo('A', 'repo-a', WS_A),
      repo('B', 'repo-b', WS_B)
    ]);
    click(mount, '.mon-plan__open');

    setTarget(mount, WS_A, false);
    setTarget(mount, WS_B, false);

    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('.mon-plan__apply-all')
      ).disabled
    ).toBe(true);
    expect(text(mount.querySelector('.mon-plan__total'))).toBe(
      '적용할 레포를 고르세요'
    );
  });

  test('still sends [이 레포만 적용] of a repository turned off', async () => {
    const { mount, send } = setup(
      [repo('A', 'repo-a', WS_A), repo('B', 'repo-b', WS_B)],
      async () => ({
        applied: true,
        conflict: false,
        queue: repoQueue('A', { placement_status: {} })
      })
    );
    click(mount, '.mon-plan__open');
    setTarget(mount, WS_A, false);

    click(mount, `.mon-plan__apply-repo[data-root-dir="${WS_A}"]`);
    await flush();

    expect(send.mock.calls.map((call) => call[1].root_dir)).toEqual([WS_A]);
  });

  test('forgets the target choices when the panel closes', () => {
    const { mount } = setup([repo('A', 'repo-a', WS_A)]);
    click(mount, '.mon-plan__open');
    setTarget(mount, WS_A, false);

    click(mount, '.mon-plan__close');
    click(mount, '.mon-plan__open');

    expect(
      /** @type {HTMLInputElement} */ (
        card(mount, WS_A).querySelector('.mon-plan__target-box')
      ).checked
    ).toBe(true);
  });
});

describe('monitor placement apply (UI-hf8v §3.4)', () => {
  test('sends [이 레포만 적용] to that repository only', async () => {
    const { mount, send } = setup(
      [repo('A', 'repo-a', WS_A), repo('B', 'repo-b', WS_B)],
      async (type, payload) => ({
        applied: true,
        conflict: false,
        queue: repoQueue(payload.root_dir === WS_A ? 'A' : 'B', {
          placement_status: {}
        })
      })
    );
    click(mount, '.mon-plan__open');

    click(mount, `.mon-plan__apply-repo[data-root-dir="${WS_B}"]`);
    await flush();

    expect(send.mock.calls).toEqual([
      [
        'worker-queue-place',
        {
          bead_id: 'B-1',
          lane: 'parallel',
          index: 1,
          root_dir: WS_B,
          expected_revision: 5
        }
      ]
    ]);
  });

  test('goes on to the next repository after one stops on a moved place', async () => {
    const { mount, send } = setup(
      [repo('A', 'repo-a', WS_A), repo('B', 'repo-b', WS_B, { revision: 9 })],
      async (type, payload) =>
        payload.root_dir === WS_A
          ? {
              conflict: true,
              queue: repoQueue('A', {
                revision: 6,
                queue: [
                  { bead_id: 'A-P', added_at: 1 },
                  { bead_id: 'A-X', added_at: 2 }
                ]
              })
            }
          : {
              applied: true,
              conflict: false,
              queue: repoQueue('B', { revision: 10, placement_status: {} })
            }
    );
    click(mount, '.mon-plan__open');

    click(mount, '.mon-plan__apply-all');
    await vi.waitFor(() => {
      expect(
        card(mount, WS_B).querySelector('.mon-plan__result')
      ).not.toBeNull();
    });

    expect(send.mock.calls[1]).toEqual([
      'worker-queue-place',
      {
        bead_id: 'B-1',
        lane: 'parallel',
        index: 1,
        root_dir: WS_B,
        expected_revision: 9
      }
    ]);
    expect(
      [WS_A, WS_B].map((root) =>
        text(card(mount, root).querySelector('.mon-plan__result'))
      )
    ).toEqual(['✕ 0건 넣음 — A-1에서 멈춤: 자리가 바뀌었습니다', '✓ 1건 넣음']);
    expect(card(mount, WS_A).querySelector('.mon-plan__review')).not.toBeNull();
  });

  test('stops a repository whose place changed while an earlier one was sent', async () => {
    /** @type {any[]} */
    const workspaces = [repo('A', 'repo-a', WS_A), repo('B', 'repo-b', WS_B)];
    const { mount, send } = setup(workspaces, async (type, payload) => {
      if (payload.root_dir === WS_A) {
        workspaces[1] = repo('B', 'repo-b', WS_B, {
          revision: 6,
          queue: [
            { bead_id: 'B-P', added_at: 1 },
            { bead_id: 'B-X', added_at: 2 }
          ]
        });
      }
      return {
        applied: true,
        conflict: false,
        queue: repoQueue('A', { revision: 6, placement_status: {} })
      };
    });
    click(mount, '.mon-plan__open');

    click(mount, '.mon-plan__apply-all');
    await vi.waitFor(() => {
      expect(
        card(mount, WS_B).querySelector('.mon-plan__result')
      ).not.toBeNull();
    });

    expect(send.mock.calls.map((call) => call[1].root_dir)).toEqual([WS_A]);
    expect(text(card(mount, WS_B).querySelector('.mon-plan__result'))).toBe(
      '✕ 0건 넣음 — B-1에서 멈춤: 자리가 바뀌었습니다'
    );
  });

  test('grows the serial lanes only of the repository that needs them', async () => {
    const busy = {
      queue: [],
      lane_states: {
        s1: { occupied_by: ['R-1'], order: [], corrections: [], cycle: false }
      },
      placement_status: {
        'A-1': { state: 'ready', done: 1, total: 1 },
        'A-2': { state: 'ready', done: 1, total: 1 }
      },
      placement_relations: Object.fromEntries([rel('A-1', 'A-2', 'conflict')])
    };
    const grown = repoQueue('A', {
      ...busy,
      revision: 6,
      serial_lane_count: 2,
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: [] }
      ]
    });
    const after_first = {
      ...grown,
      revision: 7,
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: [{ bead_id: 'A-1', added_at: 3 }] }
      ],
      placement_status: { 'A-2': { state: 'ready', done: 1, total: 1 } }
    };
    const a_replies = [grown, after_first, { ...after_first, revision: 8 }];
    const { mount, send } = setup(
      [repo('A', 'repo-a', WS_A, busy), repo('B', 'repo-b', WS_B)],
      async (type, payload) => ({
        applied: true,
        conflict: false,
        queue:
          payload.root_dir === WS_A
            ? a_replies.shift()
            : repoQueue('B', { revision: 6, placement_status: {} })
      })
    );
    click(mount, '.mon-plan__open');

    click(mount, '.mon-plan__apply-all');
    await vi.waitFor(() => {
      expect(
        card(mount, WS_B).querySelector('.mon-plan__result')
      ).not.toBeNull();
    });

    expect(
      send.mock.calls
        .filter((call) => call[0] === 'worker-queue-set-serial-lane-count')
        .map((call) => call[1])
    ).toEqual([{ count: 2, root_dir: WS_A, expected_revision: 5 }]);
  });

  test('ends with one toast naming the placed count and the stopped repositories', async () => {
    const { mount } = setup(
      [repo('A', 'repo-a', WS_A), repo('B', 'repo-b', WS_B)],
      async (type, payload) =>
        payload.root_dir === WS_A
          ? { applied: false, conflict: false, admission_reason: 'blocked' }
          : {
              applied: true,
              conflict: false,
              queue: repoQueue('B', { revision: 6, placement_status: {} })
            }
    );
    click(mount, '.mon-plan__open');

    click(mount, '.mon-plan__apply-all');
    await vi.waitFor(() => {
      expect(toastText()).toContain('넣음');
    });

    expect(toastText()).toBe('1건 넣음 · 2개 레포 · 멈춤 1개 레포');
  });

  test('shows the apply progress and turns the controls off while sending', async () => {
    /** @type {(value: any) => void} */
    let release = () => {};
    const { mount } = setup(
      [repo('A', 'repo-a', WS_A), repo('B', 'repo-b', WS_B)],
      () =>
        new Promise((resolve) => {
          release = resolve;
        })
    );
    click(mount, '.mon-plan__open');

    click(mount, '.mon-plan__apply-all');
    await flush();

    expect(text(mount.querySelector('.mon-plan__total'))).toBe(
      '적용 중 · 1/2 레포'
    );
    expect(
      Array.from(
        mount.querySelectorAll(
          '.mon-plan__apply-repo, .mon-plan__apply-all, .mon-plan__repo .worker-plan__include, .mon-plan__target-box'
        ),
        (node) => /** @type {HTMLButtonElement} */ (node).disabled
      ).every(Boolean)
    ).toBe(true);
    release({ applied: false, conflict: false });
  });

  test('redraws the table of a stopped repository on [이 레포 배치안 다시 보기]', async () => {
    const { mount } = setup([repo('A', 'repo-a', WS_A)], async () => ({
      applied: false,
      conflict: false
    }));
    click(mount, '.mon-plan__open');
    click(mount, '.mon-plan__apply-all');
    await vi.waitFor(() => {
      expect(mount.querySelector('.mon-plan__review')).not.toBeNull();
    });

    click(mount, '.mon-plan__review');

    expect(card(mount, WS_A).querySelector('.mon-plan__result')).toBeNull();
    expect(
      card(mount, WS_A).querySelector('.worker-plan__row[data-bead-id="A-1"]')
    ).not.toBeNull();
  });

  test('drops the result of an apply that outlived a closed panel', async () => {
    /** @type {(value: any) => void} */
    let release = () => {};
    const { mount } = setup(
      [repo('A', 'repo-a', WS_A)],
      () =>
        new Promise((resolve) => {
          release = resolve;
        })
    );
    click(mount, '.mon-plan__open');
    click(mount, '.mon-plan__apply-all');
    await flush();
    click(mount, '.mon-plan__close');
    click(mount, '.mon-plan__open');

    release({ applied: false, conflict: false });
    await vi.waitFor(() => {
      expect(toastText()).toContain('넣음');
    });

    expect(mount.querySelector('.mon-plan__result')).toBeNull();
    expect(
      card(mount, WS_A).querySelector('.worker-plan__row[data-bead-id="A-1"]')
    ).not.toBeNull();
  });

  test('keeps the table of a stopped repository with its checks disabled', async () => {
    const { mount } = setup([repo('A', 'repo-a', WS_A)], async () => ({
      applied: false,
      conflict: false
    }));
    click(mount, '.mon-plan__open');

    click(mount, '.mon-plan__apply-all');
    await vi.waitFor(() => {
      expect(mount.querySelector('.mon-plan__review')).not.toBeNull();
    });

    const box = /** @type {HTMLInputElement|null} */ (
      card(mount, WS_A).querySelector('.worker-plan__include')
    );
    expect(box).not.toBeNull();
    expect(box?.disabled).toBe(true);
  });

  test('folds the table of a repository that took every place', async () => {
    const { mount } = setup([repo('A', 'repo-a', WS_A)], async () => ({
      applied: true,
      conflict: false,
      queue: repoQueue('A', { revision: 6, placement_status: {} })
    }));
    click(mount, '.mon-plan__open');

    click(mount, '.mon-plan__apply-all');
    await vi.waitFor(() => {
      expect(
        card(mount, WS_A).querySelector('.mon-plan__result')
      ).not.toBeNull();
    });

    expect(card(mount, WS_A).querySelector('.worker-plan__table')).toBeNull();
  });
});

describe('monitor placement rejudge (UI-hf8v §3.5)', () => {
  test('sends one rejudge per repository with placement material', async () => {
    const bare = repo('C', 'repo-c', WS_C);
    delete bare.placement_status;
    const { mount, send } = setup([
      repo('A', 'repo-a', WS_A),
      repo('B', 'repo-b', WS_B, { placement_status: {} }),
      bare
    ]);

    click(mount, '.mon-plan__rejudge');
    await flush();

    expect(send.mock.calls).toEqual([
      ['worker-placement-rejudge', { root_dir: WS_A }],
      ['worker-placement-rejudge', { root_dir: WS_B }]
    ]);
  });

  test('names the repositories whose rejudge failed in the toast', async () => {
    const { mount } = setup(
      [repo('A', 'repo-a', WS_A), repo('B', 'repo-b', WS_B)],
      async (type, payload) => {
        if (payload.root_dir === WS_B) {
          throw { code: 'placement_unavailable', message: 'not running' };
        }
        return { cleared: 1 };
      }
    );

    click(mount, '.mon-plan__rejudge');
    await vi.waitFor(() => {
      expect(toastText()).toContain('jev');
    });

    expect(toastText()).toBe(
      '1개 레포 jev 판정을 다시 요청했습니다 · 실패 repo-b'
    );
  });
});
