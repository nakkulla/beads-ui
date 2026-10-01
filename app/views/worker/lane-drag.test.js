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
    parallel_rows: [],
    parallel_raw_length: {},
    owner_of: {},
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
 * Mount the shared drag DOM: 병렬 영역 · 직렬 레인 · 후보 · 접힌 띠.
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
    showToast,
    requestRender,
    adoptQueue: over.adoptQueue ?? (() => {}),
    candidate_drop: over.candidate_drop,
    hitTest: over.hitTest
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

/**
 * @param {Element} target
 * @param {string} type
 * @param {{ pointerType: string, x: number, y: number }} input
 */
function firePointer(target, type, input) {
  target.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      cancelable: true,
      pointerId: 7,
      pointerType: input.pointerType,
      button: 0,
      clientX: input.x,
      clientY: input.y
    })
  );
}

/**
 * @param {HTMLElement} mount
 * @param {string} bead_id
 * @returns {HTMLElement}
 */
function rowOf(mount, bead_id) {
  return /** @type {HTMLElement} */ (
    mount.querySelector(`.worker-mini[data-bead-id="${bead_id}"]`)
  );
}

/**
 * A queue row `A` in the parallel area, and a hit-test the case points at.
 *
 * @returns {{ ctx: ReturnType<typeof setup>, hit: { current: Element|null } }}
 */
function setupTouch() {
  /** @type {{ current: Element|null }} */
  const hit = { current: null };
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
    hitTest: () => hit.current,
    lanes: laneModelOf({
      parallel_rows: [parallelRow('A', 0)],
      parallel_raw_length: { '/r': 1 },
      owner_of: { A: '/r' },
      queue: [parallelRow('A', 0)],
      queue_groups: [groupOf(7)]
    })
  });
  return { ctx, hit };
}

beforeEach(() => {
  document.body.innerHTML = '';
  vi.useRealTimers();
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

describe('터치 길게 누르기 끌기 (UI-97xm)', () => {
  test('starts no touch drag before the 350 ms long press', () => {
    vi.useFakeTimers();
    const { ctx } = setupTouch();
    firePointer(rowOf(ctx.mount, 'A'), 'pointerdown', {
      pointerType: 'touch',
      x: 10,
      y: 10
    });

    vi.advanceTimersByTime(300);

    expect(ctx.drag.isDragging()).toBe(false);
    expect(ctx.console_el.classList.contains('is-dragging')).toBe(false);
  });

  test('places a long-pressed row on the serial lane it is dropped on', async () => {
    vi.useFakeTimers();
    const { ctx, hit } = setupTouch();
    const row = rowOf(ctx.mount, 'A');
    firePointer(row, 'pointerdown', { pointerType: 'touch', x: 10, y: 10 });
    vi.advanceTimersByTime(360);
    hit.current = document.getElementById('serial');

    firePointer(row, 'pointermove', { pointerType: 'touch', x: 10, y: 60 });
    firePointer(row, 'pointerup', { pointerType: 'touch', x: 10, y: 60 });
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

  test('leaves a finger that moves before the long press to scroll', async () => {
    vi.useFakeTimers();
    const { ctx, hit } = setupTouch();
    const row = rowOf(ctx.mount, 'A');
    firePointer(row, 'pointerdown', { pointerType: 'touch', x: 10, y: 10 });
    vi.advanceTimersByTime(100);
    hit.current = document.getElementById('serial');

    firePointer(row, 'pointermove', { pointerType: 'touch', x: 10, y: 60 });
    vi.advanceTimersByTime(400);
    firePointer(row, 'pointerup', { pointerType: 'touch', x: 10, y: 60 });
    await flush();

    expect(ctx.drag.isDragging()).toBe(false);
    expect(ctx.sent).toEqual([]);
  });

  test('holds the lane still after a long press until the finger moves', () => {
    vi.useFakeTimers();
    const { ctx, hit } = setupTouch();
    const scroller = /** @type {HTMLElement} */ (
      document.getElementById('parallel')
    );
    const writes = vi.fn();
    scroller.style.overflowY = 'auto';
    Object.defineProperties(scroller, {
      scrollHeight: { configurable: true, get: () => 2000 },
      clientHeight: { configurable: true, get: () => 800 },
      scrollTop: { configurable: true, get: () => 400, set: writes }
    });
    scroller.getBoundingClientRect = () =>
      /** @type {DOMRect} */ ({ top: 0, bottom: 800, left: 0, right: 400 });
    const row = rowOf(ctx.mount, 'A');
    hit.current = row;
    firePointer(row, 'pointerdown', { pointerType: 'touch', x: 10, y: 400 });

    vi.advanceTimersByTime(360 + 160);

    expect(ctx.drag.isDragging()).toBe(true);
    expect(writes).not.toHaveBeenCalled();
  });

  test('drops nothing when a long press lifts without moving', async () => {
    vi.useFakeTimers();
    const { ctx, hit } = setupTouch();
    const row = rowOf(ctx.mount, 'A');
    firePointer(row, 'pointerdown', { pointerType: 'touch', x: 10, y: 10 });
    vi.advanceTimersByTime(360);
    // Starting the drag revealed the empty lanes: another lane now sits under
    // the finger that never moved.
    hit.current = document.getElementById('serial');

    firePointer(row, 'pointermove', { pointerType: 'touch', x: 12, y: 13 });
    firePointer(row, 'pointerup', { pointerType: 'touch', x: 12, y: 13 });
    await flush();

    expect(ctx.sent).toEqual([]);
    expect(ctx.drag.isDragging()).toBe(false);
  });

  test('places the ghost where the row was before the lanes moved', () => {
    vi.useFakeTimers();
    const { ctx } = setupTouch();
    const row = rowOf(ctx.mount, 'A');
    row.getBoundingClientRect = () =>
      /** @type {DOMRect} */ ({
        top: ctx.console_el.classList.contains('is-dragging') ? 300 : 100,
        left: 0,
        width: 200,
        height: 40
      });
    firePointer(row, 'pointerdown', { pointerType: 'touch', x: 10, y: 110 });

    vi.advanceTimersByTime(360);

    const ghost = /** @type {HTMLElement} */ (
      document.querySelector('.worker-drag-ghost')
    );
    expect(ghost.style.top).toBe('100px');
  });

  test('keeps a native drag out of a touch press', () => {
    vi.useFakeTimers();
    const { ctx } = setupTouch();
    const row = rowOf(ctx.mount, 'A');
    firePointer(row, 'pointerdown', { pointerType: 'touch', x: 10, y: 10 });

    const ev = fireDrag(row, 'dragstart');

    expect(ev.defaultPrevented).toBe(true);
  });

  test('leaves a mouse press to the native drag', () => {
    vi.useFakeTimers();
    const { ctx } = setupTouch();
    firePointer(rowOf(ctx.mount, 'A'), 'pointerdown', {
      pointerType: 'mouse',
      x: 10,
      y: 10
    });

    vi.advanceTimersByTime(400);

    expect(ctx.drag.isDragging()).toBe(false);
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
