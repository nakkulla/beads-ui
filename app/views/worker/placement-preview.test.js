import { beforeEach, describe, expect, test, vi } from 'vitest';
import { placementPairKey } from '../../../server/placement/wire.js';
import { createSubscriptionIssueStore } from '../../data/subscription-issue-store.js';
import { createWorkerQueueStore } from '../../data/worker-queue-store.js';
import { createWorkerView } from './index.js';

/** A format-valid spec review receipt (`<reviewer>@<40-hex>`). */
const RECEIPT = 'codex@' + 'a'.repeat(40);

/**
 * The Worker tab's issue stores, the way `index.test.js` builds them.
 *
 * @param {any[]} ready
 */
function issueStores(ready) {
  /** @type {Map<string, any>} */
  const stores = new Map();
  /** @type {Set<(id: string) => void>} */
  const listeners = new Set();
  /** @param {string} id */
  function getStore(id) {
    let store = stores.get(id);
    if (!store) {
      store = createSubscriptionIssueStore(id);
      stores.set(id, store);
      store.subscribe(() => {
        for (const fn of Array.from(listeners)) {
          fn(id);
        }
      });
    }
    return store;
  }
  getStore('tab:worker:ready').applyPush({
    type: 'snapshot',
    id: 'tab:worker:ready',
    revision: 1,
    issues: ready
  });
  return {
    getStore,
    /** @param {string} id */
    snapshotFor: (id) => getStore(id).snapshot().slice(),
    /** @param {(id: string) => void} fn */
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}

/**
 * @param {string} id
 * @param {number} created_at
 * @returns {any}
 */
function readyIssue(id, created_at) {
  return {
    id,
    title: `${id} title`,
    status: 'open',
    priority: 1,
    created_at,
    updated_at: created_at,
    spec_id: `docs/specs/${id}.md`,
    metadata: { route: 'spec_backed', spec_review: RECEIPT }
  };
}

/**
 * A jev relation from the candidate's side (`c_first`, `x_first`, `conflict`,
 * `independent`).
 *
 * @param {string} c
 * @param {string} x
 * @param {string} kind
 * @param {number} [confidence]
 * @param {string[]} [overlap]
 * @returns {[string, any]}
 */
function rel(c, x, kind, confidence = 0.9, overlap = []) {
  const [a, b] = c < x ? [c, x] : [x, c];
  const wire =
    kind === 'c_first'
      ? c === a
        ? 'a_first'
        : 'b_first'
      : kind === 'x_first'
        ? c === a
          ? 'b_first'
          : 'a_first'
        : kind;
  return [
    placementPairKey(a, b),
    {
      a,
      b,
      relation: confidence >= 0.8 ? wire : 'unknown',
      source: 'jev',
      ...(overlap.length > 0 ? { overlap } : {}),
      confidence,
      jev_choice: wire,
      judged_at: Date.UTC(2026, 9, 16, 3, 4)
    }
  ];
}

/**
 * @param {Partial<any>} [over]
 * @returns {any}
 */
function queueOf(over = {}) {
  return {
    revision: 5,
    auto_advance: false,
    slots: 2,
    queue: [{ bead_id: 'P-1', added_at: 1 }],
    serial_lane_count: 2,
    serial_lanes: [
      { id: 's1', entries: [{ bead_id: 'S1-1', added_at: 1 }] },
      {
        id: 's2',
        entries: [
          { bead_id: 'S2-1', added_at: 1 },
          { bead_id: 'S2-2', added_at: 2 }
        ]
      }
    ],
    lane_states: {
      s1: { occupied_by: [], order: ['S1-1'], corrections: [], cycle: false },
      s2: {
        occupied_by: [],
        order: ['S2-1', 'S2-2'],
        corrections: [],
        cycle: false
      }
    },
    done: [],
    attempts: {},
    placement_status: {
      'RD-1': { state: 'ready', done: 2, total: 2 },
      'RD-3': { state: 'ready', done: 2, total: 2 }
    },
    placement_relations: Object.fromEntries([
      rel('RD-1', 'S2-1', 'x_first'),
      rel('RD-1', 'RD-3', 'independent'),
      rel('RD-3', 'P-1', 'independent')
    ]),
    ...over
  };
}

/**
 * @param {any} transport
 * @param {any} [queue]
 * @returns {{ mount: HTMLElement, queueStore: ReturnType<typeof createWorkerQueueStore> }}
 */
function mountView(transport, queue = queueOf()) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const queueStore = createWorkerQueueStore();
  queueStore.set(queue);
  createWorkerView(mount, {
    issueStores: issueStores([readyIssue('RD-1', 1), readyIssue('RD-3', 2)]),
    queueStore,
    transport
  });
  return { mount, queueStore };
}

/**
 * A fixed `blocks` relation from the candidate's side.
 *
 * @param {string} c
 * @param {string} x
 * @param {'c_first'|'x_first'} kind
 * @returns {[string, any]}
 */
function blocks(c, x, kind) {
  const [a, b] = c < x ? [c, x] : [x, c];
  const c_first = kind === 'c_first';
  return [
    placementPairKey(a, b),
    {
      a,
      b,
      relation: (c === a) === c_first ? 'a_first' : 'b_first',
      source: 'fixed',
      basis: 'blocks',
      confidence: null,
      jev_choice: null,
      judged_at: null
    }
  ];
}

/**
 * The ids a lane body draws, dotted cards included, in drawing order.
 *
 * @param {HTMLElement} mount
 * @param {string} lane
 * @returns {string[]}
 */
function laneOrder(mount, lane) {
  const body = mount.querySelector(
    `#worker-pane-lane-${lane} .worker-wait__rows`
  );
  return Array.from(body ? body.children : []).map(
    (row) =>
      row.getAttribute('data-preview-id') ||
      row.getAttribute('data-bead-id') ||
      ''
  );
}

/**
 * @param {HTMLElement} mount
 * @param {string} id
 * @returns {HTMLButtonElement|null}
 */
function recommendButton(mount, id) {
  return mount.querySelector(
    `.worker-card[data-bead-id="${id}"] .worker-card__recommend`
  );
}

/**
 * @param {Element|null} el
 */
function click(el) {
  /** @type {HTMLElement} */ (el).dispatchEvent(
    new MouseEvent('click', { bubbles: true })
  );
}

async function flush() {
  for (let i = 0; i < 8; i++) {
    await Promise.resolve();
  }
}

beforeEach(() => {
  document.body.innerHTML = '<div id="m"></div>';
  window.localStorage.clear();
});

describe('[추천 배치] button', () => {
  test('draws no button when the snapshot carries no placement_status', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({ placement_status: undefined, placement_relations: undefined })
    );

    expect(recommendButton(mount, 'RD-1')).toBeNull();
    expect(mount.querySelector('.worker-plan__open')).toBeNull();
  });

  test('draws no button for a candidate without a status entry', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({ placement_status: { 'RD-3': { state: 'ready' } } })
    );

    expect(recommendButton(mount, 'RD-1')).toBeNull();
  });

  test('stands right before [↴ 대기로] in the card foot', () => {
    const { mount } = mountView(vi.fn());

    const button = /** @type {HTMLElement} */ (recommendButton(mount, 'RD-1'));

    expect(
      /** @type {HTMLElement} */ (button.nextElementSibling).classList.contains(
        'worker-card__place'
      )
    ).toBe(true);
  });

  test('is enabled for a ready candidate', () => {
    const { mount } = mountView(vi.fn());

    expect(recommendButton(mount, 'RD-1')?.disabled).toBe(false);
  });

  test('is enabled for a fixed-only candidate', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({ placement_status: { 'RD-1': { state: 'fixed_only' } } })
    );

    const button = recommendButton(mount, 'RD-1');

    expect(button?.disabled).toBe(false);
    expect(button?.title).toBe(
      '고정 조건으로 계산한 자리를 대기 열에 미리 보입니다'
    );
  });

  test.each([
    [
      { state: 'pending', reason: 'judging', done: 1, total: 3 },
      'jev 판정 중 (3쌍 중 1쌍 완료)'
    ],
    [{ state: 'unavailable', reason: 'key_missing' }, 'jev 키 없음'],
    [{ state: 'unavailable', reason: 'timeout' }, 'jev 응답 없음'],
    [{ state: 'no_counterpart' }, '비교할 이슈 없음']
  ])('is disabled with its reason for %o', (status, title) => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({ placement_status: { 'RD-1': status } })
    );

    const button = recommendButton(mount, 'RD-1');

    expect(button?.disabled).toBe(true);
    expect(button?.title).toBe(title);
  });
});

describe('recommendation box', () => {
  test('opens a box with the position line on tap without sending', () => {
    const transport = vi.fn();
    const { mount } = mountView(transport);

    click(recommendButton(mount, 'RD-1'));

    expect(
      mount.querySelector('.worker-recommend__pos')?.textContent?.trim()
    ).toBe('직렬 2 · #3 — S2-2 뒤');
    expect(transport).not.toHaveBeenCalled();
  });

  test('closes the box with ✕', () => {
    const { mount } = mountView(vi.fn());
    click(recommendButton(mount, 'RD-1'));

    click(mount.querySelector('.worker-recommend__close'));

    expect(mount.querySelector('.worker-recommend')).toBeNull();
  });

  test('closes the box with Esc', () => {
    const { mount } = mountView(vi.fn());
    click(recommendButton(mount, 'RD-1'));

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(mount.querySelector('.worker-recommend')).toBeNull();
  });

  test('closes the box when the same button is pressed again', () => {
    const { mount } = mountView(vi.fn());
    click(recommendButton(mount, 'RD-1'));

    click(recommendButton(mount, 'RD-1'));

    expect(mount.querySelector('.worker-recommend')).toBeNull();
  });

  test('keeps only one box open at a time', () => {
    const { mount } = mountView(vi.fn());
    click(recommendButton(mount, 'RD-1'));

    click(recommendButton(mount, 'RD-3'));

    expect(
      Array.from(mount.querySelectorAll('.worker-recommend')).map((box) =>
        box.getAttribute('data-bead-id')
      )
    ).toEqual(['RD-3']);
  });

  test('draws the dotted card in the waiting lane at its final place', () => {
    const { mount } = mountView(vi.fn());

    click(recommendButton(mount, 'RD-1'));

    const rows = Array.from(
      /** @type {HTMLElement} */ (
        mount.querySelector('#worker-pane-lane-s2 .worker-wait__rows')
      ).children
    ).map(
      (row) =>
        row.getAttribute('data-preview-id') ||
        row.getAttribute('data-bead-id') ||
        ''
    );
    expect(rows).toEqual(['S2-1', 'S2-2', 'RD-1']);
  });

  test('recomputes the box on a new snapshot', () => {
    const { mount, queueStore } = mountView(vi.fn());
    click(recommendButton(mount, 'RD-1'));

    queueStore.set(
      queueOf({
        revision: 6,
        serial_lanes: [
          { id: 's1', entries: [{ bead_id: 'S2-1', added_at: 1 }] },
          { id: 's2', entries: [{ bead_id: 'S2-2', added_at: 2 }] }
        ]
      })
    );

    expect(
      mount.querySelector('.worker-recommend__pos')?.textContent?.trim()
    ).toBe('직렬 1 · #2 — S2-1 뒤');
  });

  test('leaves the [↴ 대기로] lane menu as it was', () => {
    const transport = vi.fn();
    const { mount } = mountView(transport);

    click(
      mount.querySelector(
        '.worker-card[data-bead-id="RD-1"] .worker-card__place'
      )
    );

    expect(
      Array.from(
        mount.querySelectorAll(
          '.worker-card[data-bead-id="RD-1"] .worker-card__place-lane'
        )
      ).map((choice) => choice.textContent?.replace(/\s+/g, ' ').trim())
    ).toEqual(['병렬 1', '직렬 1 1', '직렬 2 2']);
    expect(transport).not.toHaveBeenCalled();
  });
});

describe('[적용]', () => {
  test('sends the preview revision, lane and index', async () => {
    const transport = vi
      .fn()
      .mockResolvedValue({ applied: true, conflict: false, queue: queueOf() });
    const { mount } = mountView(transport);
    click(recommendButton(mount, 'RD-1'));

    click(mount.querySelector('.worker-recommend__apply'));
    await flush();

    expect(transport.mock.calls).toEqual([
      [
        'worker-queue-place',
        { bead_id: 'RD-1', lane: 's2', index: 2, expected_revision: 5 }
      ]
    ]);
  });

  test('resends once with the new revision when the place survives a conflict', async () => {
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        queue: queueOf({ revision: 8, queue: [] })
      })
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        queue: queueOf({ revision: 9 })
      });
    const { mount } = mountView(transport);
    click(recommendButton(mount, 'RD-1'));

    click(mount.querySelector('.worker-recommend__apply'));
    await flush();

    expect(transport.mock.calls.map((call) => call[1])).toEqual([
      { bead_id: 'RD-1', lane: 's2', index: 2, expected_revision: 5 },
      { bead_id: 'RD-1', lane: 's2', index: 2, expected_revision: 8 }
    ]);
  });

  test('sends nothing more and says 자리가 바뀌었습니다 when the place moved', async () => {
    const moved = queueOf({
      revision: 8,
      serial_lanes: [
        { id: 's1', entries: [{ bead_id: 'S1-1', added_at: 1 }] },
        {
          id: 's2',
          entries: [
            { bead_id: 'S2-1', added_at: 1 },
            { bead_id: 'S2-2', added_at: 2 },
            { bead_id: 'S2-3', added_at: 3 }
          ]
        }
      ]
    });
    const transport = vi
      .fn()
      .mockResolvedValue({ applied: false, conflict: true, queue: moved });
    const { mount } = mountView(transport);
    click(recommendButton(mount, 'RD-1'));

    click(mount.querySelector('.worker-recommend__apply'));
    await flush();

    expect(transport).toHaveBeenCalledTimes(1);
    expect(
      mount.querySelector('.worker-recommend__notice')?.textContent?.trim()
    ).toBe('자리가 바뀌었습니다');
    expect(
      mount.querySelector('.worker-recommend__pos')?.textContent?.trim()
    ).toBe('직렬 2 · #4 — S2-3 뒤');
  });

  test('distinguishes exhausted conflicts from a changed place', async () => {
    const transport = vi.fn().mockResolvedValue({
      applied: false,
      conflict: true,
      queue: queueOf({ revision: 8 })
    });
    const { mount } = mountView(transport);
    click(recommendButton(mount, 'RD-1'));

    click(mount.querySelector('.worker-recommend__apply'));
    await flush();

    expect(transport).toHaveBeenCalledTimes(6);
    expect(
      mount.querySelector('.worker-recommend__notice')?.textContent?.trim()
    ).toBe('큐가 계속 바뀌어 멈췄습니다');
  });
});

describe('전체 배치안', () => {
  test('starts every ready row checked, a row with a warning included', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        placement_relations: Object.fromEntries([
          rel('RD-1', 'S2-1', 'x_first'),
          rel('RD-1', 'RD-3', 'independent'),
          rel('RD-3', 'P-1', 'conflict')
        ])
      })
    );

    click(mount.querySelector('.worker-plan__open'));

    expect(
      Array.from(mount.querySelectorAll('.worker-plan__include')).map((box) => [
        box.getAttribute('data-bead-id'),
        /** @type {HTMLInputElement} */ (box).checked
      ])
    ).toEqual([
      ['RD-1', true],
      ['RD-3', true]
    ]);
  });

  test('shows a candidate that is not ready as a 판정 전 row it cannot select', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        placement_status: {
          'RD-1': { state: 'ready', done: 1, total: 1 },
          'RD-3': { state: 'pending', reason: 'judging', done: 0, total: 1 }
        }
      })
    );

    click(mount.querySelector('.worker-plan__open'));

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-plan__row[data-bead-id="RD-3"]')
    );
    expect(row.textContent).toContain('판정 전');
    expect(
      /** @type {HTMLInputElement} */ (
        row.querySelector('.worker-plan__include')
      ).disabled
    ).toBe(true);
  });

  test('recomputes the plan when a checkbox changes', () => {
    const { mount } = mountView(vi.fn());
    click(mount.querySelector('.worker-plan__open'));
    const box = /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-plan__include[data-bead-id="RD-3"]')
    );

    box.checked = false;
    box.dispatchEvent(new Event('change', { bubbles: true }));

    expect(
      mount.querySelector('.worker-plan__apply')?.textContent?.trim()
    ).toBe('전체 적용 (1)');
    expect(mount.querySelectorAll('.worker-card--preview')).toHaveLength(1);
  });

  test('continues checked rows after repeated conflicts keep the place unchanged', async () => {
    const after_first = queueOf({
      revision: 6,
      serial_lanes: [
        { id: 's1', entries: [{ bead_id: 'S1-1', added_at: 1 }] },
        {
          id: 's2',
          entries: [
            { bead_id: 'S2-1', added_at: 1 },
            { bead_id: 'S2-2', added_at: 2 },
            { bead_id: 'RD-1', added_at: 3 }
          ]
        }
      ],
      placement_status: { 'RD-3': { state: 'ready', done: 2, total: 2 } }
    });
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        queue: after_first
      })
      .mockResolvedValueOnce({
        conflict: true,
        queue: { ...after_first, revision: 7 }
      })
      .mockResolvedValueOnce({
        conflict: true,
        queue: { ...after_first, revision: 8 }
      })
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        queue: queueOf({ revision: 9, placement_status: {} })
      });
    const { mount } = mountView(transport);
    click(mount.querySelector('.worker-plan__open'));

    click(mount.querySelector('.worker-plan__apply'));
    await flush();

    expect(transport.mock.calls.map((call) => call[1])).toEqual([
      { bead_id: 'RD-1', lane: 's2', index: 2, expected_revision: 5 },
      { bead_id: 'RD-3', lane: 'parallel', index: 1, expected_revision: 6 },
      { bead_id: 'RD-3', lane: 'parallel', index: 1, expected_revision: 7 },
      { bead_id: 'RD-3', lane: 'parallel', index: 1, expected_revision: 8 }
    ]);
  });

  test('reports the placed count and contention when the next row exhausts retries', async () => {
    const after_first = queueOf({
      revision: 6,
      serial_lanes: [
        { id: 's1', entries: [{ bead_id: 'S1-1', added_at: 1 }] },
        {
          id: 's2',
          entries: [
            { bead_id: 'S2-1', added_at: 1 },
            { bead_id: 'S2-2', added_at: 2 },
            { bead_id: 'RD-1', added_at: 3 }
          ]
        }
      ],
      placement_status: { 'RD-3': { state: 'ready', done: 2, total: 2 } }
    });
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ applied: true, queue: after_first })
      .mockResolvedValue({ conflict: true, queue: after_first });
    const { mount } = mountView(transport);
    click(mount.querySelector('.worker-plan__open'));

    click(mount.querySelector('.worker-plan__apply'));
    await vi.waitFor(() => {
      expect(
        mount.querySelector('.worker-plan__notice')?.textContent?.trim()
      ).toBe('묶음 1개 넣음 — RD-3에서 멈춤: 큐가 계속 바뀌어 멈췄습니다');
    });

    expect(transport).toHaveBeenCalledTimes(7);
  });

  test('stops and says how many went in when a place differs', async () => {
    const after_first = queueOf({
      revision: 6,
      queue: [
        { bead_id: 'P-1', added_at: 1 },
        { bead_id: 'P-2', added_at: 2 }
      ],
      placement_status: { 'RD-3': { state: 'ready', done: 2, total: 2 } }
    });
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      conflict: false,
      queue: after_first
    });
    const { mount } = mountView(transport);
    click(mount.querySelector('.worker-plan__open'));

    click(mount.querySelector('.worker-plan__apply'));
    await flush();

    expect(transport).toHaveBeenCalledTimes(1);
    expect(
      mount.querySelector('.worker-plan__notice')?.textContent?.trim()
    ).toBe('묶음 1개 넣음 — RD-3에서 멈춤: 자리가 바뀌었습니다');
  });
});

describe('preview lanes', () => {
  test('draws the dotted cards of a bundle in the single empty serial lane', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        queue: [],
        serial_lane_count: 1,
        serial_lanes: [{ id: 's1', entries: [] }],
        lane_states: {},
        placement_relations: Object.fromEntries([
          rel('RD-1', 'RD-3', 'conflict')
        ])
      })
    );

    click(mount.querySelector('.worker-plan__open'));

    expect(laneOrder(mount, 's1')).toEqual(['RD-1', 'RD-3']);
  });

  test('keeps an empty serial lane with dotted cards from reading as empty', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        queue: [],
        serial_lanes: [
          { id: 's1', entries: [] },
          { id: 's2', entries: [] }
        ],
        lane_states: {},
        placement_relations: Object.fromEntries([
          rel('RD-1', 'RD-3', 'conflict')
        ])
      })
    );

    click(mount.querySelector('.worker-plan__open'));

    const lane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-lane-s1')
    ).closest('.worker-wait__lane');
    expect(lane?.classList.contains('worker-wait__lane--empty')).toBe(false);
  });

  test('draws a blocks predecessor of a lane member in the parallel area and leaves that lane as it is', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        placement_relations: Object.fromEntries([
          blocks('RD-1', 'S2-1', 'c_first'),
          blocks('RD-1', 'S2-2', 'x_first')
        ])
      })
    );

    click(recommendButton(mount, 'RD-1'));

    expect({
      s2: laneOrder(mount, 's2'),
      parallel: Boolean(
        mount
          .querySelector('[data-preview-id="RD-1"]')
          ?.closest('[data-area="parallel"]')
      )
    }).toEqual({ s2: ['S2-1', 'S2-2'], parallel: true });
  });
});

describe('workspace switch', () => {
  test('adopts an apply reply only for the workspace it was sent to', async () => {
    /** @type {(value: any) => void} */
    let answer = () => {};
    const transport = vi.fn(
      () =>
        new Promise((resolve) => {
          answer = resolve;
        })
    );
    let workspace = '/repo-a';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.setSnapshot({ root_dir: '/repo-a', queue: queueOf() });
    createWorkerView(mount, {
      issueStores: issueStores([readyIssue('RD-1', 1), readyIssue('RD-3', 2)]),
      queueStore,
      transport,
      getWorkspacePath: () => workspace
    });
    click(recommendButton(mount, 'RD-1'));
    click(mount.querySelector('.worker-recommend__apply'));
    workspace = '/repo-b';
    queueStore.setSnapshot({
      root_dir: '/repo-b',
      queue: queueOf({ revision: 2, placement_status: {} })
    });

    answer({
      applied: true,
      conflict: false,
      queue: queueOf({ revision: 99 })
    });
    await flush();

    expect(queueStore.get()?.revision).toBe(2);
  });
});

/**
 * Uncheck one full-plan row the way a reader does.
 *
 * @param {HTMLElement} mount
 * @param {string} id
 */
function uncheck(mount, id) {
  const box = /** @type {HTMLInputElement} */ (
    mount.querySelector(`.worker-plan__include[data-bead-id="${id}"]`)
  );
  box.checked = false;
  box.dispatchEvent(new Event('change', { bubbles: true }));
}

describe('전체 배치안 explanations', () => {
  // P-1 blocks S1-1, so RD-3 leaves it where it is and keeps the warning.
  test('keeps the warning of a row the reader unchecks', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        placement_relations: Object.fromEntries([
          rel('RD-1', 'S2-1', 'x_first'),
          rel('RD-1', 'RD-3', 'independent'),
          rel('RD-3', 'P-1', 'conflict'),
          blocks('P-1', 'S1-1', 'c_first')
        ])
      })
    );
    click(mount.querySelector('.worker-plan__open'));

    uncheck(mount, 'RD-3');

    expect(
      mount.querySelector('.worker-plan__row[data-bead-id="RD-3"]')?.textContent
    ).toContain('P-1(병렬)과 동시에 돌 수 있음');
  });

  test('draws no dotted card for a row the reader unchecks', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        placement_relations: Object.fromEntries([
          rel('RD-1', 'S2-1', 'x_first'),
          rel('RD-1', 'RD-3', 'independent'),
          rel('RD-3', 'P-1', 'conflict')
        ])
      })
    );
    click(mount.querySelector('.worker-plan__open'));

    uncheck(mount, 'RD-3');

    expect(
      Array.from(mount.querySelectorAll('.worker-card--preview')).map((card) =>
        card.getAttribute('data-preview-id')
      )
    ).toEqual(['RD-1']);
  });
});

describe('full plan table columns (UI-5cmo §3.4, UI-msmj)', () => {
  test('heads the table with 포함 · 후보', () => {
    const { mount } = mountView(vi.fn());

    click(mount.querySelector('.worker-plan__open'));

    expect(
      Array.from(mount.querySelectorAll('.worker-plan__table th'), (cell) =>
        cell.textContent?.trim()
      )
    ).toEqual(['포함', '후보']);
  });

  test('puts the include checkbox in the first cell of a row', () => {
    const { mount } = mountView(vi.fn());

    click(mount.querySelector('.worker-plan__open'));

    const first = mount.querySelector('.worker-plan__row td');
    expect(first?.querySelector('.worker-plan__include')).not.toBeNull();
  });

  test('names the state after 판정 전 on a row not judged yet', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        placement_status: {
          'RD-1': { state: 'ready', done: 1, total: 1 },
          'RD-3': { state: 'pending', reason: 'judging' }
        }
      })
    );

    click(mount.querySelector('.worker-plan__open'));

    expect(
      Array.from(
        candidateCell(mount, 'RD-3').children,
        (child) => `${child.className} ${child.textContent?.trim()}`
      )
    ).toEqual([
      'worker-plan__id RD-3',
      'worker-plan__line worker-plan__state 판정 전 · jev 판정 중'
    ]);
  });

  test('draws the warning line under the candidate title of its row only', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        placement_relations: Object.fromEntries([
          rel('RD-1', 'S2-1', 'x_first'),
          rel('RD-1', 'RD-3', 'independent'),
          rel('RD-3', 'P-1', 'conflict'),
          blocks('P-1', 'S1-1', 'c_first')
        ])
      })
    );

    click(mount.querySelector('.worker-plan__open'));

    expect({
      warned: Array.from(
        candidateCell(mount, 'RD-3').children,
        (child) => child.className
      ),
      text: candidateCell(mount, 'RD-3')
        .querySelector('.worker-plan__warn')
        ?.textContent?.trim(),
      quiet: candidateCell(mount, 'RD-1').querySelector('.worker-plan__line')
    }).toEqual({
      warned: ['worker-plan__id', 'worker-plan__line worker-plan__warn'],
      text: expect.stringContaining('P-1(병렬)과 동시에 돌 수 있음'),
      quiet: null
    });
  });

  test('keeps only the id and the title in the candidate cell of a judged row without a warning', () => {
    const { mount } = mountView(vi.fn());

    click(mount.querySelector('.worker-plan__open'));

    const cell = candidateCell(mount, 'RD-1');
    expect({
      children: Array.from(cell.children, (child) => child.className),
      text: (cell.textContent || '').replace(/\s+/g, ' ').trim(),
      fold: mount.querySelector('.worker-plan details')
    }).toEqual({
      children: ['worker-plan__id'],
      text: 'RD-1 RD-1 title',
      fold: null
    });
  });

  test('leaves the move out of the full plan row and draws the 옮김 card in the lane', () => {
    const { mount } = mountView(vi.fn(), partnerQueue());

    click(mount.querySelector('.worker-plan__open'));

    expect({
      row: mount
        .querySelector('.worker-plan__row[data-bead-id="RD-3"]')
        ?.textContent?.includes('옮김'),
      lane: Boolean(
        mount.querySelector('#worker-pane-lane-s1 [data-preview-id="P-1"]')
      )
    }).toEqual({ row: false, lane: true });
  });
});

/**
 * The candidate cell of one full-plan row.
 *
 * @param {HTMLElement} mount
 * @param {string} id
 * @returns {HTMLElement}
 */
function candidateCell(mount, id) {
  return /** @type {HTMLElement} */ (
    mount.querySelector(`.worker-plan__row[data-bead-id="${id}"] td:last-child`)
  );
}

/**
 * RD-3 conflicts with P-1, which waits in the parallel lane; s1 is empty,
 * so the bundle moves P-1 there and puts RD-3 after it.
 *
 * @returns {any}
 */
function partnerQueue() {
  return queueOf({
    serial_lanes: [
      { id: 's1', entries: [] },
      {
        id: 's2',
        entries: [
          { bead_id: 'S2-1', added_at: 1 },
          { bead_id: 'S2-2', added_at: 2 }
        ]
      }
    ],
    lane_states: {},
    bead_titles: { 'P-1': 'P-1 title' },
    placement_relations: Object.fromEntries([
      rel('RD-1', 'S2-1', 'x_first'),
      rel('RD-3', 'P-1', 'conflict')
    ])
  });
}

describe('reason line overlap', () => {
  test('appends the overlap to a jev reason line in the box', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        placement_relations: Object.fromEntries([
          rel('RD-1', 'S2-1', 'x_first'),
          rel('RD-1', 'P-1', 'independent', 0.93, ['tests', 'app/styles.css']),
          rel('RD-1', 'RD-3', 'independent')
        ])
      })
    );

    click(recommendButton(mount, 'RD-1'));

    const box = mount.querySelector('.worker-recommend')?.textContent || '';
    expect(box).toContain(
      'P-1 — 독립 · jev 0.93 (겹침: tests, app/styles.css)'
    );
    expect(box).not.toContain('고정(scope');
  });
});

describe('jev progress bar', () => {
  test('draws the bar and the count while pairs are still judged', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({ placement_progress: { done: 34, total: 130 } })
    );

    const bar = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-plan__progress')
    );

    expect(bar.textContent?.trim()).toBe('jev 판정 34/130');
    expect(bar.getAttribute('style')).toContain('--progress: 26%');
  });

  test('draws no bar once every pair is settled', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({ placement_progress: { done: 130, total: 130 } })
    );

    const bar = mount.querySelector('.worker-plan__progress');

    expect(bar).toBeNull();
  });
});

/**
 * A fixed same-file conflict between two beads.
 *
 * @param {string} x
 * @param {string} y
 * @param {string[]} files
 * @returns {[string, any]}
 */
function sameFile(x, y, files) {
  const [a, b] = x < y ? [x, y] : [y, x];
  return [
    placementPairKey(a, b),
    {
      a,
      b,
      relation: 'conflict',
      source: 'fixed',
      basis: 'file',
      overlap: files,
      confidence: null,
      jev_choice: null,
      judged_at: null
    }
  ];
}

/**
 * The place sentence of one candidate's recommendation box.
 *
 * @param {HTMLElement} mount
 * @param {string} id
 * @returns {string}
 */
function boxPosition(mount, id) {
  click(recommendButton(mount, id));
  return (
    mount.querySelector('.worker-recommend__pos')?.textContent || ''
  ).trim();
}

/**
 * The text of the open recommendation box of one candidate.
 *
 * @param {HTMLElement} mount
 * @param {string} id
 * @returns {string}
 */
function boxText(mount, id) {
  click(recommendButton(mount, id));
  return mount.querySelector('.worker-recommend')?.textContent || '';
}

describe('position and reason wording (UI-lsr4 §3.4)', () => {
  test('shows only the order on a parallel row', () => {
    const { mount } = mountView(vi.fn());

    const shown = [boxPosition(mount, 'RD-3'), boxPosition(mount, 'RD-1')];

    expect(shown).toEqual(['병렬 · 대기 #2', '직렬 2 · #3 — S2-2 뒤']);
  });

  test('names the same file on a fixed reason line', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        placement_status: {
          'RD-1': { state: 'fixed_only' },
          'RD-3': { state: 'fixed_only' }
        },
        placement_relations: Object.fromEntries([
          sameFile('RD-1', 'P-1', ['a.js', 'b.js'])
        ])
      })
    );

    const text = boxText(mount, 'RD-1');

    expect(text).toContain('P-1 — 부딪힘 · 고정(같은 파일: a.js, b.js)');
  });

  test('names the missed threshold on an overlap-guard reason line', () => {
    const [key, wire] = rel('RD-1', 'P-1', 'independent', 0.85, ['tests']);
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        placement_relations: {
          [key]: { ...wire, relation: 'conflict', overlap_guard: true }
        }
      })
    );

    const text = boxText(mount, 'RD-1');

    expect(text).toContain('P-1 — 부딪힘 · jev 독립 0.85 < 0.9 (겹침: tests)');
  });

  test('recommends two fixed-only same-file candidates into one serial lane in one bundle send', async () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: [{ bead_id: 'S2-1', added_at: 1 }] }
      ],
      lane_states: {},
      placement_status: {
        'RD-1': { state: 'fixed_only' },
        'RD-3': { state: 'fixed_only' }
      },
      placement_relations: Object.fromEntries([
        sameFile('RD-1', 'RD-3', ['a.js'])
      ])
    });
    const after_first = {
      ...queue,
      revision: 6,
      serial_lanes: [
        { id: 's1', entries: [{ bead_id: 'RD-1', added_at: 2 }] },
        queue.serial_lanes[1]
      ],
      placement_status: { 'RD-3': { state: 'fixed_only' } }
    };
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        queue: after_first
      })
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        queue: queueOf({ revision: 7, placement_status: {} })
      });
    const { mount } = mountView(transport, queue);
    click(mount.querySelector('.worker-plan__open'));

    click(mount.querySelector('.worker-plan__apply'));
    await flush();

    expect(transport.mock.calls).toEqual([
      [
        'worker-queue-place-bundle',
        {
          lane: 's1',
          binds: [],
          steps: [
            { bead_id: 'RD-1', index: 0 },
            { bead_id: 'RD-3', index: 1 }
          ],
          expected_revision: 5
        }
      ]
    ]);
  });
});

describe('single recommendation of a same-file pair (UI-lsr4 gate-r1)', () => {
  test('shows a serial lane in the box for a fixed-only same-file candidate', () => {
    const { mount } = mountView(
      vi.fn(),
      queueOf({
        serial_lanes: [
          { id: 's1', entries: [] },
          { id: 's2', entries: [{ bead_id: 'S2-1', added_at: 1 }] }
        ],
        lane_states: {},
        placement_status: {
          'RD-1': { state: 'fixed_only' },
          'RD-3': { state: 'fixed_only' }
        },
        placement_relations: Object.fromEntries([
          sameFile('RD-1', 'RD-3', ['a.js'])
        ])
      })
    );

    click(recommendButton(mount, 'RD-1'));

    expect(
      mount.querySelector('.worker-recommend__pos')?.textContent?.trim()
    ).toBe('직렬 1 · #1 — 맨 앞');
  });
});

describe('new serial lane (UI-lsr4 §3.3)', () => {
  /**
   * Two candidates in conflict while both configured lanes are held.
   *
   * @returns {any}
   */
  function busyQueue() {
    return queueOf({
      queue: [],
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: [] }
      ],
      lane_states: {
        s1: { occupied_by: ['R-1'], order: [], corrections: [], cycle: false },
        s2: { occupied_by: ['R-2'], order: [], corrections: [], cycle: false }
      },
      placement_relations: Object.fromEntries([rel('RD-1', 'RD-3', 'conflict')])
    });
  }

  test('names the growth under the full plan', () => {
    const { mount } = mountView(vi.fn(), busyQueue());

    click(mount.querySelector('.worker-plan__open'));

    expect(
      mount.querySelector('.worker-plan__growth')?.textContent?.trim()
    ).toBe('적용하면 직렬 레인을 2개에서 3개로 늘립니다');
  });

  test('draws no dotted card for a place in a new lane', () => {
    const { mount } = mountView(vi.fn(), busyQueue());

    click(mount.querySelector('.worker-plan__open'));

    expect(mount.querySelectorAll('.worker-card--preview').length).toBe(0);
  });

  test('grows the lanes before [전체 적용] puts a bundle in a new lane', async () => {
    const grown = {
      ...busyQueue(),
      revision: 6,
      serial_lane_count: 3,
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: [] },
        { id: 's3', entries: [] }
      ]
    };
    const after_first = {
      ...grown,
      revision: 7,
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: [] },
        { id: 's3', entries: [{ bead_id: 'RD-1', added_at: 3 }] }
      ],
      placement_status: { 'RD-3': { state: 'ready', done: 1, total: 1 } }
    };
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ applied: true, conflict: false, queue: grown })
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        queue: after_first
      })
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        queue: { ...after_first, revision: 8, placement_status: {} }
      });
    const { mount } = mountView(transport, busyQueue());
    click(mount.querySelector('.worker-plan__open'));

    click(mount.querySelector('.worker-plan__apply'));
    await flush();

    expect(transport.mock.calls).toEqual([
      [
        'worker-queue-set-serial-lane-count',
        { count: 3, expected_revision: 5 }
      ],
      [
        'worker-queue-place-bundle',
        {
          lane: 's3',
          binds: [],
          steps: [
            { bead_id: 'RD-1', index: 0 },
            { bead_id: 'RD-3', index: 1 }
          ],
          expected_revision: 6
        }
      ]
    ]);
  });

  test('grows the lanes before a single [적용] into a new lane', async () => {
    const queue = {
      ...busyQueue(),
      placement_status: {
        'RD-1': { state: 'fixed_only' },
        'RD-3': { state: 'fixed_only' }
      },
      placement_relations: Object.fromEntries([
        sameFile('RD-1', 'RD-3', ['a.js'])
      ])
    };
    const grown = {
      ...queue,
      revision: 6,
      serial_lane_count: 3,
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: [] },
        { id: 's3', entries: [] }
      ]
    };
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ applied: true, conflict: false, queue: grown })
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        queue: { ...grown, revision: 7 }
      });
    const { mount } = mountView(transport, queue);
    click(recommendButton(mount, 'RD-1'));
    const shown = mount
      .querySelector('.worker-recommend__pos')
      ?.textContent?.trim();

    click(mount.querySelector('.worker-recommend__apply'));
    await flush();

    expect(shown).toBe('직렬 3(새 레인) · #1 — 맨 앞');
    expect(transport.mock.calls).toEqual([
      [
        'worker-queue-set-serial-lane-count',
        { count: 3, expected_revision: 5 }
      ],
      [
        'worker-queue-place',
        { bead_id: 'RD-1', lane: 's3', index: 0, expected_revision: 6 }
      ]
    ]);
  });
});

describe('conflicting partner bundle (UI-blx2 §3.7)', () => {
  test('sends the bundle of a single [적용] as one worker-queue-place-bundle', async () => {
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      conflict: false,
      queue: partnerQueue()
    });
    const { mount } = mountView(transport, partnerQueue());
    click(recommendButton(mount, 'RD-3'));

    click(mount.querySelector('.worker-recommend__apply'));
    await flush();

    expect(transport.mock.calls).toEqual([
      [
        'worker-queue-place-bundle',
        {
          lane: 's1',
          binds: [],
          steps: [
            { bead_id: 'P-1', index: 0 },
            { bead_id: 'RD-3', index: 1 }
          ],
          expected_revision: 5
        }
      ]
    ]);
  });

  test('draws the move line in the box under the position line', () => {
    const { mount } = mountView(vi.fn(), partnerQueue());

    click(recommendButton(mount, 'RD-3'));

    expect(
      mount.querySelector('.worker-recommend__move')?.textContent?.trim()
    ).toBe('↪ P-1: 병렬 #1 → 직렬 1 #1 (옮김)');
  });

  test('draws a dotted 옮김 card in the new lane and keeps the partner card in place', () => {
    const { mount } = mountView(vi.fn(), partnerQueue());

    click(recommendButton(mount, 'RD-3'));

    const moved = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-lane-s1 [data-preview-id="P-1"]')
    );
    expect({
      s1: laneOrder(mount, 's1'),
      tag: moved.querySelector('.worker-card__preview-tag')?.textContent,
      title: moved.querySelector('.worker-card__title')?.textContent,
      own: Boolean(
        mount.querySelector('[data-area="parallel"] [data-bead-id="P-1"]')
      )
    }).toEqual({
      s1: ['P-1', 'RD-3'],
      tag: '옮김',
      title: 'P-1 title',
      own: true
    });
  });
});
