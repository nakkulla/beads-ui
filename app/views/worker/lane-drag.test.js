import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createLaneDrag } from './lane-drag.js';

/**
 * A LaneModel with only the fields the drop controller reads (§4.5). 나머지
 * 레인은 이 모듈이 보지 않으므로 빈 배열이면 충분하다.
 *
 * @param {Record<string, any>} [over]
 * @returns {any}
 */
function laneModelOf(over = {}) {
  return {
    runnable: [],
    queue: [],
    running: [],
    pr_wait: [],
    done: [],
    queue_groups: [],
    chain_lanes: [],
    parallel_rows: [],
    parallel_raw_length: {},
    owner_of: {},
    cross_lanes_revision: null,
    ...over
  };
}

/**
 * One 병렬 대기 행 in the projection.
 *
 * @param {string} id
 * @param {number} queue_index
 * @param {string} [root_dir]
 * @returns {any}
 */
function parallelRow(id, queue_index, root_dir = '/r') {
  return { id, root_dir, queue_index, expected_revision: 1 };
}

/**
 * One 대기 그룹 (`queue_groups[i]`) with the sublanes the model always carries.
 *
 * @param {number} revision
 * @param {string} [root_dir]
 * @returns {any}
 */
function groupOf(revision, root_dir = '/r') {
  return {
    root_dir,
    revision,
    sublanes: { parallel: [], serial: [] }
  };
}

/**
 * Mount the shared drag DOM: 병렬 영역 · 직렬 레인 · 연결 레인 · 후보 · 접힌 띠.
 *
 * @param {{ rows?: string, extra?: string }} [parts]
 */
function mountDom(parts = {}) {
  document.body.innerHTML = `
    <div id="mount"><div id="console">
      <div id="parallel" data-drop="parallel" data-root-dir="/r">
        ${parts.rows ?? ''}
      </div>
      <div
        id="serial"
        data-drop="repo-serial"
        data-root-dir="/r"
        data-lane-id="s1"
        data-lane-length="2"
      ></div>
      <div id="chain" data-drop="chain" data-lane-id="cl_1"></div>
      <div id="candidate" data-drop="candidate"></div>
      <div
        id="strip"
        class="worker-pane worker-pane--collapsed"
        data-lane="queue"
      ></div>
      <div
        id="cand-strip"
        class="worker-pane worker-pane--collapsed"
        data-lane="candidate"
      ></div>
      ${parts.extra ?? ''}
    </div></div>`;
  return {
    mount: /** @type {HTMLElement} */ (document.getElementById('mount')),
    console_el: /** @type {HTMLElement} */ (document.getElementById('console'))
  };
}

/**
 * One drag-source shell, the same identifiers both tabs render (§4.5).
 *
 * @param {{ id: string, kind: string, root_dir?: string, row_index?: number, queue_index?: number, lane_id?: string }} input
 */
function sourceHtml(input) {
  const lane_attr =
    input.lane_id === undefined ? '' : ` data-lane-id="${input.lane_id}"`;
  const row_attr =
    input.row_index === undefined ? '' : ` data-row-index="${input.row_index}"`;
  const queue_attr =
    input.queue_index === undefined
      ? ''
      : ` data-queue-index="${input.queue_index}"`;
  return `<div data-bead-id="${input.id}" data-drag-kind="${input.kind}"
      data-root-dir="${input.root_dir ?? '/r'}"${lane_attr}${row_attr}${queue_attr}>
      <div class="worker-mini" draggable="true" data-bead-id="${input.id}"></div>
    </div>`;
}

/**
 * @param {Element|null} node
 * @param {string} type
 */
function fireDrag(node, type) {
  const ev = new Event(type, { bubbles: true, cancelable: true });
  /** @type {Element} */ (node).dispatchEvent(ev);
  return ev;
}

async function flush() {
  for (let i = 0; i < 40; i++) {
    await Promise.resolve();
  }
}

/**
 * @param {Record<string, any>} [over]
 */
function setup(over = {}) {
  const dom = over.dom ?? mountDom();
  /** @type {Array<{ type: string, payload: any }>} */
  const sent = [];
  const transport =
    over.transport ??
    vi.fn(async (/** @type {string} */ type, /** @type {any} */ payload) => {
      sent.push({ type, payload });
      return { applied: true, conflict: false, queue: { revision: 2 } };
    });
  const record = /** @type {any} */ (transport);
  if (!over.transport) {
    // 기본 transport만 `sent`를 채운다 — 케이스가 준 mock은 자기 기록을 쓴다.
  }
  const showToast = vi.fn();
  const onCorrection = vi.fn();
  const requestRender = vi.fn();
  const reproject = vi.fn(() => ({
    lanes: over.reprojected ?? over.lanes ?? laneModelOf(),
    raw_lanes: over.reprojected_raw ?? null
  }));
  const drag = createLaneDrag({
    transport: record,
    console_el: dom.console_el,
    getLanes: () => over.lanes ?? laneModelOf(),
    getWorkspaces: () => over.workspaces ?? [],
    getCrossLanes: () => over.cross_lanes ?? null,
    reproject,
    onCorrection,
    showToast,
    requestRender,
    adoptQueue: over.adoptQueue ?? (() => {}),
    candidate_drop: over.candidate_drop
  });
  drag.attach(dom.mount);
  return {
    ...dom,
    drag,
    transport: record,
    sent,
    showToast,
    onCorrection,
    requestRender,
    reproject
  };
}

/**
 * @param {HTMLElement} mount
 * @param {string} bead_id
 */
function startDrag(mount, bead_id) {
  const row = /** @type {HTMLElement} */ (
    mount.querySelector(`.worker-mini[data-bead-id="${bead_id}"]`)
  );
  row.dispatchEvent(new Event('pointerdown', { bubbles: true }));
  fireDrag(row, 'dragstart');
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('드롭 타깃 식별자 (UI-4tud §4.5)', () => {
  test('reads a serial lane target from data-lane-id and data-lane-length', async () => {
    const dom = mountDom({
      rows: sourceHtml({
        id: 'A',
        kind: 'parallel',
        row_index: 0,
        queue_index: 0
      })
    });
    const ctx = setup({
      dom,
      lanes: laneModelOf({
        parallel_rows: [parallelRow('A', 0)],
        parallel_raw_length: { '/r': 1 },
        owner_of: { A: '/r' },
        queue: [parallelRow('A', 0)],
        queue_groups: [groupOf(7)]
      })
    });

    startDrag(ctx.mount, 'A');
    fireDrag(document.getElementById('serial'), 'drop');
    await flush();

    expect(ctx.sent).toEqual([
      {
        type: 'worker-queue-place',
        payload: {
          bead_id: 'A',
          lane: 's1',
          index: 2,
          root_dir: '/r',
          expected_revision: 1
        }
      }
    ]);
  });

  test('refuses a serial target owned by another repo', async () => {
    const dom = mountDom({
      rows: sourceHtml({
        id: 'A',
        kind: 'parallel',
        root_dir: '/other',
        row_index: 0,
        queue_index: 0
      })
    });
    const ctx = setup({ dom });

    startDrag(ctx.mount, 'A');
    const ev = fireDrag(document.getElementById('serial'), 'drop');
    await flush();

    expect(ev.defaultPrevented).toBe(false);
    expect(ctx.sent).toEqual([]);
  });

  test('removes a queued row dropped on the 후보 target', async () => {
    const dom = mountDom({
      rows: sourceHtml({
        id: 'A',
        kind: 'parallel',
        row_index: 0,
        queue_index: 0
      })
    });
    const ctx = setup({
      dom,
      lanes: laneModelOf({
        parallel_rows: [parallelRow('A', 0)],
        owner_of: { A: '/r' },
        queue: [parallelRow('A', 0)],
        queue_groups: [groupOf(3)]
      })
    });

    startDrag(ctx.mount, 'A');
    fireDrag(document.getElementById('candidate'), 'drop');
    await flush();

    expect(ctx.sent).toEqual([
      {
        type: 'worker-queue-remove',
        payload: { bead_id: 'A', root_dir: '/r', expected_revision: 1 }
      }
    ]);
  });

  test('appends to the parallel tail when dropped on the collapsed 대기 strip', async () => {
    const dom = mountDom({
      extra: sourceHtml({ id: 'C', kind: 'candidate' })
    });
    const ctx = setup({
      dom,
      lanes: laneModelOf({
        parallel_rows: [parallelRow('A', 0)],
        parallel_raw_length: { '/r': 1 },
        owner_of: { A: '/r', C: '/r' },
        queue_groups: [groupOf(4)]
      })
    });

    startDrag(ctx.mount, 'C');
    const ev = fireDrag(document.getElementById('strip'), 'drop');
    await flush();

    expect(ev.defaultPrevented).toBe(true);
    expect(ctx.sent).toEqual([
      {
        type: 'worker-queue-place',
        payload: {
          bead_id: 'C',
          index: 1,
          root_dir: '/r',
          expected_revision: 4
        }
      }
    ]);
  });

  test('ignores the collapsed 후보 strip when the tab does not enable it', async () => {
    const dom = mountDom({
      rows: sourceHtml({
        id: 'A',
        kind: 'parallel',
        row_index: 0,
        queue_index: 0
      })
    });
    const ctx = setup({
      dom,
      lanes: laneModelOf({
        parallel_rows: [parallelRow('A', 0)],
        owner_of: { A: '/r' },
        queue: [parallelRow('A', 0)],
        queue_groups: [groupOf(3)]
      })
    });

    startDrag(ctx.mount, 'A');
    const ev = fireDrag(document.getElementById('cand-strip'), 'drop');
    await flush();

    expect(ev.defaultPrevented).toBe(false);
    expect(ctx.sent).toEqual([]);
  });

  test('removes a queue row dropped on the collapsed 후보 strip under candidate_drop', async () => {
    const dom = mountDom({
      rows: sourceHtml({
        id: 'A',
        kind: 'parallel',
        row_index: 0,
        queue_index: 0
      })
    });
    const ctx = setup({
      dom,
      candidate_drop: true,
      lanes: laneModelOf({
        parallel_rows: [parallelRow('A', 0)],
        owner_of: { A: '/r' },
        queue: [parallelRow('A', 0)],
        queue_groups: [groupOf(3)]
      })
    });

    startDrag(ctx.mount, 'A');
    fireDrag(document.getElementById('cand-strip'), 'drop');
    await flush();

    expect(ctx.sent).toEqual([
      {
        type: 'worker-queue-remove',
        payload: { bead_id: 'A', root_dir: '/r', expected_revision: 1 }
      }
    ]);
  });

  test('refuses a chain target when the model has no chain lanes', async () => {
    const dom = mountDom({
      extra: sourceHtml({ id: 'C', kind: 'candidate' })
    });
    const ctx = setup({ dom });

    startDrag(ctx.mount, 'C');
    fireDrag(document.getElementById('chain'), 'drop');
    await flush();

    expect(ctx.sent).toEqual([]);
    expect(ctx.showToast).toHaveBeenCalledWith('연결 레인이 없습니다', 'error');
  });

  test('marks the console as dragging while a row is held', () => {
    const dom = mountDom({
      rows: sourceHtml({
        id: 'A',
        kind: 'parallel',
        row_index: 0,
        queue_index: 0
      })
    });
    const ctx = setup({ dom });

    startDrag(ctx.mount, 'A');

    expect(ctx.console_el.classList.contains('is-dragging')).toBe(true);
    expect(ctx.drag.isDragging()).toBe(true);

    fireDrag(ctx.mount, 'dragend');

    expect(ctx.console_el.classList.contains('is-dragging')).toBe(false);
    expect(ctx.drag.isDragging()).toBe(false);
  });
});

/**
 * A projection that carries one confirmed 연결 레인 (Monitor 모양) plus the
 * candidate row a drop starts from.
 *
 * @param {Record<string, any>} [over]
 */
function chainSetup(over = {}) {
  const dom = mountDom({ extra: sourceHtml({ id: 'C', kind: 'candidate' }) });
  const lanes = laneModelOf({
    cross_lanes_revision: 5,
    owner_of: { A: '/r', B: '/r', C: '/r' },
    parallel_raw_length: { '/r': 2 },
    queue_groups: [groupOf(1)],
    chain_lanes: [
      {
        lane_id: 'cl_1',
        status: 'confirmed',
        rows: [
          { id: 'A', root_dir: '/r' },
          { id: 'B', root_dir: '/r' }
        ]
      }
    ],
    ...(over.lanes ?? {})
  });
  return { dom, lanes };
}

describe('계획 전송 (§5.5)', () => {
  test('sends one plan in the 레인 op → dep-add → provenance order', async () => {
    const { dom, lanes } = chainSetup();
    /** @type {string[]} */
    const order = [];
    const transport = vi.fn(async (/** @type {string} */ type) => {
      order.push(type);
      if (
        type === 'monitor-lane-update' ||
        type === 'monitor-lane-provenance'
      ) {
        return { revision: 6 };
      }
      return { applied: true, conflict: false, queue: { revision: 2 } };
    });
    const ctx = setup({
      dom,
      lanes,
      transport,
      cross_lanes: {
        revision: 5,
        lanes: [{ id: 'cl_1', entries: [{ bead_id: 'A' }, { bead_id: 'B' }] }]
      },
      workspaces: [
        { root_dir: '/r', bead_blocked_by: { A: [], B: ['A'], C: [] } }
      ]
    });

    startDrag(ctx.mount, 'C');
    fireDrag(document.getElementById('chain'), 'drop');
    await flush();

    expect(order).toEqual([
      'monitor-lane-update',
      'dep-add',
      'monitor-lane-provenance'
    ]);
  });

  test('replans the whole drop once from the reprojected lanes on a CAS conflict', async () => {
    const { dom, lanes } = chainSetup();
    let lane_calls = 0;
    const transport = vi.fn(async (/** @type {string} */ type) => {
      if (type === 'monitor-lane-update') {
        lane_calls += 1;
        if (lane_calls === 1) {
          throw {
            code: 'conflict',
            details: {
              cross_lanes: {
                revision: 9,
                lanes: [
                  {
                    id: 'cl_1',
                    entries: [{ bead_id: 'A' }, { bead_id: 'B' }]
                  }
                ]
              }
            }
          };
        }
        return { revision: 10 };
      }
      if (type === 'monitor-lane-provenance') {
        return { revision: 11 };
      }
      return { applied: true, conflict: false, queue: { revision: 2 } };
    });
    const ctx = setup({
      dom,
      lanes,
      transport,
      reprojected: lanes,
      reprojected_raw: {
        revision: 9,
        lanes: [{ id: 'cl_1', entries: [{ bead_id: 'A' }, { bead_id: 'B' }] }]
      },
      cross_lanes: {
        revision: 5,
        lanes: [{ id: 'cl_1', entries: [{ bead_id: 'A' }, { bead_id: 'B' }] }]
      },
      workspaces: [
        { root_dir: '/r', bead_blocked_by: { A: [], B: ['A'], C: [] } }
      ]
    });

    startDrag(ctx.mount, 'C');
    fireDrag(document.getElementById('chain'), 'drop');
    await flush();

    expect(ctx.reproject).toHaveBeenCalledTimes(1);
    expect(ctx.reproject.mock.calls[0][0]).toEqual({
      revision: 9,
      lanes: [{ id: 'cl_1', entries: [{ bead_id: 'A' }, { bead_id: 'B' }] }]
    });
    expect(lane_calls).toBe(2);
    expect(ctx.requestRender).toHaveBeenCalledTimes(1);
  });

  test('reports the plan correction to the caller', async () => {
    // C는 B가 막고 있으므로 맨 앞에 놓아도 교정이 B 뒤로 옮긴다 (UI-jaua §6.2).
    const { dom, lanes } = chainSetup();
    const ctx = setup({
      dom,
      lanes,
      cross_lanes: {
        revision: 5,
        lanes: [{ id: 'cl_1', entries: [{ bead_id: 'A' }, { bead_id: 'B' }] }]
      },
      workspaces: [
        {
          root_dir: '/r',
          bead_blocked_by: { A: [], B: ['A'], C: ['B'] },
          runnable: [{ bead_id: 'C', blocked_by: ['B'] }]
        }
      ]
    });

    startDrag(ctx.mount, 'C');
    fireDrag(document.getElementById('chain'), 'drop');
    await flush();

    const call = ctx.onCorrection.mock.calls.find(
      (/** @type {any[]} */ args) => args[1] > 0
    );
    expect(call?.[0]).toBe('cl_1');
  });

  test('makes no dep op for a queue-only model whose snapshot declares no blockers', async () => {
    const dom = mountDom({
      rows: sourceHtml({
        id: 'A',
        kind: 'parallel',
        row_index: 0,
        queue_index: 0
      })
    });
    const ctx = setup({
      dom,
      lanes: laneModelOf({
        parallel_rows: [parallelRow('A', 0)],
        parallel_raw_length: { '/r': 1 },
        owner_of: { A: '/r' },
        queue: [parallelRow('A', 0)],
        queue_groups: [groupOf(1)]
      }),
      workspaces: [{ root_dir: '/r' }]
    });

    startDrag(ctx.mount, 'A');
    fireDrag(document.getElementById('serial'), 'drop');
    await flush();

    expect(ctx.sent.map((/** @type {any} */ entry) => entry.type)).toEqual([
      'worker-queue-place'
    ]);
    expect(ctx.drag.dropModel().snapshot_blocked_by?.size).toBe(0);
    expect(ctx.drag.dropModel().runnable_blocked_by?.size).toBe(0);
  });

  test('reads blocker completeness from the snapshot, not the projection', () => {
    const ctx = setup({
      workspaces: [
        {
          root_dir: '/r',
          bead_blocked_by: { A: [] },
          runnable: [{ bead_id: 'C', blocked_by: ['A'] }]
        }
      ]
    });

    const model = ctx.drag.dropModel();

    expect(model.snapshot_blocked_by?.get('A')).toEqual([]);
    expect(model.runnable_blocked_by?.get('C')).toEqual(['A']);
  });

  test('folds a remembered dep op into the next plan model', () => {
    const ctx = setup({
      workspaces: [{ root_dir: '/r', bead_blocked_by: { B: ['A'] } }]
    });

    ctx.drag.rememberDep({
      type: 'dep-remove',
      a: 'B',
      b: 'A',
      root_dir: '/r'
    });

    expect(ctx.drag.dropModel().blocked_by_map.get('B')).toEqual([]);
    expect(ctx.drag.dropModel().snapshot_blocked_by?.get('B')).toEqual([]);
  });
});

describe('단일 op 전송 (§4.5)', () => {
  test('adapts the revision once when a queue op conflicts', async () => {
    const calls = /** @type {any[]} */ ([]);
    const transport = vi.fn(async (/** @type {string} */ type, payload) => {
      calls.push({ type, payload });
      return calls.length === 1
        ? { applied: false, conflict: true, queue: { revision: 9 } }
        : { applied: true, conflict: false, queue: { revision: 10 } };
    });
    const ctx = setup({
      transport,
      lanes: laneModelOf({ queue_groups: [groupOf(3)] })
    });

    const ok = await ctx.drag.sendOp(
      { type: 'worker-queue-place', payload: { bead_id: 'A' }, root_dir: '/r' },
      'A'
    );

    expect(ok).toBe(true);
    expect(calls.map((call) => call.payload.expected_revision)).toEqual([3, 9]);
  });

  test('omits root_dir when the tab has no workspace coordinate', async () => {
    const calls = /** @type {any[]} */ ([]);
    const transport = vi.fn(async (/** @type {string} */ type, payload) => {
      calls.push({ type, payload });
      return { applied: true, conflict: false, queue: { revision: 2 } };
    });
    const ctx = setup({
      transport,
      lanes: laneModelOf({ queue_groups: [groupOf(4, '')] })
    });

    await ctx.drag.sendOp(
      { type: 'worker-queue-remove', payload: { bead_id: 'A' }, root_dir: '' },
      'A'
    );

    expect(calls).toEqual([
      {
        type: 'worker-queue-remove',
        payload: { bead_id: 'A', expected_revision: 4 }
      }
    ]);
  });

  test('adopts the queue a mutation reply carries', async () => {
    const adoptQueue = vi.fn();
    const ctx = setup({
      adoptQueue,
      lanes: laneModelOf({ queue_groups: [groupOf(1)] })
    });

    await ctx.drag.sendOp(
      {
        type: 'worker-queue-remove',
        payload: { bead_id: 'A' },
        root_dir: '/r'
      },
      'A'
    );

    expect(adoptQueue).toHaveBeenCalledWith('/r', { revision: 2 });
  });
});

describe('생명주기', () => {
  test('stops handling drags after detach', () => {
    const dom = mountDom({
      rows: sourceHtml({
        id: 'A',
        kind: 'parallel',
        row_index: 0,
        queue_index: 0
      })
    });
    const ctx = setup({ dom });

    ctx.drag.detach();
    startDrag(ctx.mount, 'A');

    expect(ctx.drag.isDragging()).toBe(false);
    expect(ctx.console_el.classList.contains('is-dragging')).toBe(false);
  });
});
