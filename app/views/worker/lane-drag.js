/**
 * Move waiting rows between repository-local parallel and serial queues.
 *
 * A mouse drags through the native HTML5 `draggable` events. Touch and pen
 * have no native drag here, so they drag through pointer events after a
 * {@link LONG_PRESS_MS} long press — a finger that moves first scrolls the page
 * instead — and land on the same drop targets and queue requests.
 *
 * @typedef {{ kind: 'candidate'|'parallel'|'repo-serial', bead_id: string, root_dir: string, queue_index?: number, lane_id?: string }} DropDrag
 * @typedef {{ kind: 'candidate' }|{ kind: 'parallel', marker_index: number }|{ kind: 'repo-serial', root_dir: string, lane_id: 's1'|'s2'|'s3'|'s4'|'s5', index: number }} DropTarget
 * @typedef {Object} LaneDragOptions
 * @property {((type: string, payload?: unknown) => Promise<any>)|undefined} transport
 * @property {HTMLElement} console_el
 * @property {() => import('./lane-model.js').LaneModel} getLanes
 * @property {() => Array<Record<string, any>>|null} getWorkspaces
 * @property {(message: string, kind?: 'error'|'success'|'info'|'warning', ms?: number) => void} showToast
 * @property {() => void} requestRender
 * @property {(root_dir: string, queue: any) => void} [adoptQueue]
 * @property {() => void} [onDragBegin]
 * @property {boolean} [candidate_drop]
 * @property {(x: number, y: number) => Element|null} [hitTest] - The element
 * under a touch point; defaults to `document.elementFromPoint`.
 */

/** How long a touch or pen press holds still before it becomes a drag. */
export const LONG_PRESS_MS = 350;
/** How far a press may wander before the long press counts as a scroll. */
const TOUCH_SLOP_PX = 8;
/** The band at a scroller's edge where a held drag scrolls it. */
const EDGE_PX = 48;
const SCROLL_STEP_PX = 14;
/** A press on one of these is that control's own gesture, never a row drag. */
const TOUCH_DRAG_SKIP = 'button, a, input, select, textarea, summary, label';

/**
 * The nearest vertically scrollable ancestor, or the page scroller.
 *
 * @param {Element|null} el
 * @returns {Element|null}
 */
function scrollerOf(el) {
  for (let node = el; node; node = node.parentElement) {
    const style = getComputedStyle(node);
    if (
      /(auto|scroll)/.test(style.overflowY) &&
      node.scrollHeight > node.clientHeight
    ) {
      return node;
    }
  }
  return document.scrollingElement;
}

/**
 * @param {unknown} error
 */
function mutationErrorMessage(error) {
  if (typeof error === 'string' && error.length > 0) {
    return error;
  }
  if (error && typeof error === 'object') {
    const value = /** @type {Record<string, any>} */ (error);
    if (typeof value.message === 'string' && value.message.length > 0) {
      return value.message;
    }
  }
  return '요청에 실패했습니다';
}

/**
 * @param {LaneDragOptions} options
 */
export function createLaneDrag(options) {
  const {
    transport,
    console_el,
    getLanes,
    showToast,
    requestRender,
    adoptQueue,
    onDragBegin,
    candidate_drop
  } = options;
  const hitTest =
    options.hitTest ||
    ((/** @type {number} */ x, /** @type {number} */ y) =>
      typeof document.elementFromPoint === 'function'
        ? document.elementFromPoint(x, y)
        : null);
  /** @type {DropDrag|null} */
  let dragging = null;
  let suppress_open_click = false;
  /** @type {any} */
  let suppress_timer = null;
  /** @type {Element|null} */
  let press_target = null;
  /** @type {HTMLElement|null} */
  let mounted_el = null;
  /**
   * A touch or pen press on a draggable row: waiting out the long press, or —
   * once `touch_active` — dragging.
   *
   * @type {{ id: number, x: number, y: number, handle: HTMLElement, holder: HTMLElement }|null}
   */
  let touch_press = null;
  let touch_active = false;
  /**
   * Whether the dragging finger has left the slop since it pressed. Starting a
   * drag reveals the empty serial lanes and moves the rows, so a finger that
   * lifts without moving is over a different row than the one it meant.
   */
  let touch_moved = false;
  /** @type {any} */
  let long_press_timer = null;
  /** @type {{ zone: HTMLElement, target: DropTarget }|null} */
  let touch_over = null;
  /** @type {HTMLElement|null} */
  let ghost = null;
  let last_x = 0;
  let last_y = 0;
  /** @type {number|null} */
  let scroll_frame = null;

  function expireDragSuppressSoon() {
    if (suppress_timer !== null) {
      clearTimeout(suppress_timer);
    }
    suppress_timer = setTimeout(() => {
      suppress_timer = null;
      suppress_open_click = false;
    }, 0);
  }

  /** @param {string} root_dir - @param {string} bead_id */
  function revisionOfRoot(root_dir, bead_id) {
    const lanes = getLanes();
    for (const item of [
      ...lanes.runnable,
      ...lanes.queue,
      ...lanes.running,
      ...lanes.pr_wait,
      ...lanes.done
    ]) {
      if (
        !item.non_occupying &&
        item.id === bead_id &&
        item.root_dir === root_dir
      ) {
        return item.expected_revision;
      }
    }
    return (
      lanes.queue_groups.find((entry) => entry.root_dir === root_dir)
        ?.revision ?? 0
    );
  }

  /** @param {string} type - @param {Record<string, unknown>} payload @param {string} root_dir @param {number} revision */
  async function sendCas(type, payload, root_dir, revision) {
    if (!transport) {
      return null;
    }
    /** @param {number} expected_revision */
    const body = (expected_revision) => ({
      ...payload,
      ...(root_dir ? { root_dir } : {}),
      expected_revision
    });
    let response = await transport(type, body(revision));
    if (response?.conflict) {
      if (response.queue) {
        adoptQueue?.(root_dir, response.queue);
      }
      response = await transport(
        type,
        body(
          typeof response.queue?.revision === 'number'
            ? response.queue.revision
            : revision
        )
      );
    }
    if (response?.queue) {
      adoptQueue?.(root_dir, response.queue);
    }
    return response;
  }

  /** @param {string} type - @param {Record<string, any>} payload @param {string} root_dir @param {Map<string, number>} revisions @param {{ bead_id: string }} coordinate */
  async function sendQueueCas(type, payload, root_dir, revisions, coordinate) {
    try {
      const response = await sendCas(
        type,
        payload,
        root_dir,
        revisions.get(root_dir) ?? revisionOfRoot(root_dir, coordinate.bead_id)
      );
      if (
        !response ||
        typeof response.applied !== 'boolean' ||
        response.conflict ||
        !response.applied
      ) {
        showToast(
          response?.admission_reason
            ? `큐 적재 거부: ${response.admission_reason}`
            : response?.conflict
              ? '큐가 바뀌었습니다 — 다시 시도해 주세요'
              : '큐 요청이 적용되지 않았습니다',
          'error'
        );
        return null;
      }
      if (typeof response.queue?.revision === 'number') {
        revisions.set(root_dir, response.queue.revision);
      }
      return response.queue?.revision ?? revisions.get(root_dir) ?? 0;
    } catch (error) {
      showToast(mutationErrorMessage(error), 'error');
      return null;
    }
  }

  /** @param {{ type: string, payload: Record<string, any>, root_dir: string }} op - @param {string} bead_id */
  async function sendOp(op, bead_id) {
    return (
      (await sendQueueCas(op.type, op.payload, op.root_dir, new Map(), {
        bead_id
      })) !== null
    );
  }

  /** @param {string} root_dir - @param {number} marker_index */
  function parallelInsertIndex(root_dir, marker_index) {
    const lanes = getLanes();
    const rows = lanes.parallel_rows;
    const marker = Math.max(0, Math.min(rows.length, marker_index));
    const over = rows[marker];
    if (over?.root_dir === root_dir) {
      return over.queue_index ?? 0;
    }
    for (let i = marker - 1; i >= 0; i -= 1) {
      if (rows[i].root_dir === root_dir) {
        return (rows[i].queue_index ?? 0) + 1;
      }
    }
    for (let i = marker; i < rows.length; i += 1) {
      if (rows[i].root_dir === root_dir) {
        return rows[i].queue_index ?? 0;
      }
    }
    return lanes.parallel_raw_length[root_dir] ?? 0;
  }

  /** @param {DropDrag} drag - @param {DropTarget} target */
  async function applyDrop(drag, target) {
    if (target.kind === 'repo-serial' && drag.root_dir !== target.root_dir) {
      showToast('다른 레포 이슈는 이 직렬 레인에 넣을 수 없습니다', 'error');
      return;
    }
    /** @type {{ type: string, payload: Record<string, any>, root_dir: string }|null} */
    let op = null;
    if (target.kind === 'candidate') {
      if (drag.kind !== 'candidate') {
        op = {
          type: 'worker-queue-remove',
          payload: { bead_id: drag.bead_id },
          root_dir: drag.root_dir
        };
      }
    } else if (target.kind === 'parallel') {
      const index = parallelInsertIndex(drag.root_dir, target.marker_index);
      if (drag.kind === 'candidate' || drag.kind === 'repo-serial') {
        op = {
          type: 'worker-queue-place',
          payload: { bead_id: drag.bead_id, index },
          root_dir: drag.root_dir
        };
      } else {
        const source = drag.queue_index;
        const over = getLanes().parallel_rows[target.marker_index];
        if (source !== undefined && over?.id !== drag.bead_id) {
          const to_index = source > index ? index : index - 1;
          if (to_index >= 0 && to_index !== source) {
            op = {
              type: 'worker-queue-reorder',
              payload: { bead_id: drag.bead_id, to_index },
              root_dir: drag.root_dir
            };
          }
        }
      }
    } else if (drag.kind === 'repo-serial' && drag.lane_id === target.lane_id) {
      const source = drag.queue_index;
      const to_index =
        source !== undefined && source > target.index
          ? target.index
          : target.index - 1;
      if (
        source !== undefined &&
        target.index !== source &&
        to_index >= 0 &&
        to_index !== source
      ) {
        op = {
          type: 'worker-queue-reorder',
          payload: { bead_id: drag.bead_id, lane: target.lane_id, to_index },
          root_dir: drag.root_dir
        };
      }
    } else {
      op = {
        type: 'worker-queue-place',
        payload: {
          bead_id: drag.bead_id,
          lane: target.lane_id,
          index: target.index
        },
        root_dir: drag.root_dir
      };
    }
    if (op) {
      await sendOp(op, drag.bead_id);
    }
    requestRender();
  }

  // --- 네이티브 HTML5 드래그 (§5). 좌표는 DOM 속성이 아니라 투영 모델에서
  // 나온다 — 실행중으로 빠진 버드는 DOM에 없다.

  /**
   * Where the drop marker sits: 지금 **보이는** 그 영역/레인 행 기준
   * 0..rows.length.
   *
   * @param {HTMLElement} zone
   * @param {HTMLElement|null} node
   * @returns {number}
   */
  function markerIndexIn(zone, node) {
    const row =
      node && typeof node.closest === 'function'
        ? /** @type {HTMLElement|null} */ (node.closest('[data-row-index]'))
        : null;
    if (row && zone.contains(row)) {
      const index = Number(row.getAttribute('data-row-index'));
      return Number.isFinite(index) ? index : 0;
    }
    return zone.querySelectorAll('[data-row-index]').length;
  }

  /**
   * The collapsed 세로 띠 as a drop target (UI-5ksp §4.4). 접힌 pane은 본문을
   * 그리지 않으므로 `[data-drop]`이 하나도 없다 — 그래도 띠는 같은 타깃이다:
   * 띠에 떨어뜨린 사람이 원한 것은 "대기에 넣기"이지 "다음으로 실행"이 아니므로
   * 병렬 큐 **말미**로 적재하고, 레인을 자동으로 펼치지 않는다.
   *
   * 후보 띠는 `candidate_drop`을 켠 탭(Monitor)에서만 타깃이다 — 대기 행을 거기
   * 떨어뜨리면 큐에서 빠지는 그 조작은 Worker에 없던 문법이다.
   *
   * @param {HTMLElement|null} node
   * @returns {{ zone: HTMLElement, target: DropTarget }|null}
   */
  function collapsedDropTarget(node) {
    const pane =
      typeof node?.closest === 'function'
        ? /** @type {HTMLElement|null} */ (
            node.closest('.worker-pane--collapsed[data-lane]')
          )
        : null;
    if (!pane) {
      return null;
    }
    const lane = pane.getAttribute('data-lane');
    if (lane === 'queue') {
      return {
        zone: pane,
        target: {
          kind: 'parallel',
          marker_index: getLanes().parallel_rows.length
        }
      };
    }
    if (lane === 'candidate' && candidate_drop === true) {
      return { zone: pane, target: { kind: 'candidate' } };
    }
    return null;
  }

  /**
   * The zone a drop may actually land on. 레포 직렬 레인만 `root_dir` 일치를
   * 요구한다 (§4.2).
   *
   * @param {EventTarget|null} hit - The drag event's target, or the element
   * under a touch point.
   * @returns {{ zone: HTMLElement, target: DropTarget }|null}
   */
  function dropTarget(hit) {
    const node = /** @type {HTMLElement|null} */ (hit);
    if (!dragging) {
      return null;
    }
    const zone =
      typeof node?.closest === 'function'
        ? /** @type {HTMLElement|null} */ (node.closest('[data-drop]'))
        : null;
    if (!zone) {
      return collapsedDropTarget(node);
    }
    const kind = zone.getAttribute('data-drop');
    if (kind === 'candidate') {
      return { zone, target: { kind: 'candidate' } };
    }
    if (kind === 'parallel') {
      return {
        zone,
        target: { kind: 'parallel', marker_index: markerIndexIn(zone, node) }
      };
    }
    if (kind === 'repo-serial') {
      const root_dir = zone.getAttribute('data-root-dir') || '';
      if (root_dir !== dragging.root_dir) {
        return null;
      }
      const row =
        typeof node?.closest === 'function'
          ? /** @type {HTMLElement|null} */ (node.closest('[data-queue-index]'))
          : null;
      const raw =
        row && zone.contains(row)
          ? row.getAttribute('data-queue-index')
          : zone.getAttribute('data-lane-length');
      const index = Number(raw);
      return {
        zone,
        target: {
          kind: 'repo-serial',
          root_dir,
          lane_id: /** @type {any} */ (zone.getAttribute('data-lane-id') || ''),
          index: Number.isFinite(index) ? index : 0
        }
      };
    }
    return null;
  }

  function clearDragOver() {
    for (const el of Array.from(console_el.querySelectorAll('.is-drop-over'))) {
      el.classList.remove('is-drop-over');
    }
  }

  /**
   * Start a drag of the row `holder` stands for — the step the native and the
   * touch drags share.
   *
   * @param {HTMLElement} holder
   * @returns {boolean} false when the row carries no drag coordinate.
   */
  function beginDrag(holder) {
    const bead_id = holder.getAttribute('data-bead-id') || '';
    const kind = holder.getAttribute('data-drag-kind') || '';
    const root_dir = holder.getAttribute('data-root-dir') || '';
    if (!bead_id || !kind) {
      return false;
    }
    const raw_index = holder.getAttribute('data-queue-index') || '';
    const queue_index = Number(raw_index);
    const lane_id = holder.getAttribute('data-lane-id') || '';
    dragging = {
      kind: /** @type {any} */ (kind),
      bead_id,
      root_dir,
      ...(raw_index !== '' && Number.isFinite(queue_index)
        ? { queue_index }
        : {}),
      ...(lane_id ? { lane_id } : {})
    };
    suppress_open_click = true;
    onDragBegin?.();
    // ≤640px에서 접혀 있던 빈 직렬 레인을 드롭 타깃으로 되살린다 — 표시 조건은
    // CSS 한 곳이 소유하고, 여기서는 "지금 드래그 중"만 말한다.
    console_el.classList.add('is-dragging');
    return true;
  }

  function endDrag() {
    dragging = null;
    clearDragOver();
    console_el.classList.remove('is-dragging');
  }

  function autoScroll() {
    scroll_frame = null;
    if (!touch_active) {
      return;
    }
    const scroller = scrollerOf(hitTest(last_x, last_y));
    if (scroller) {
      const rect =
        scroller === document.scrollingElement
          ? { top: 0, bottom: window.innerHeight }
          : scroller.getBoundingClientRect();
      if (last_y < rect.top + EDGE_PX) {
        scroller.scrollTop -= SCROLL_STEP_PX;
      } else if (last_y > rect.bottom - EDGE_PX) {
        scroller.scrollTop += SCROLL_STEP_PX;
      }
    }
    if (typeof requestAnimationFrame === 'function') {
      scroll_frame = requestAnimationFrame(autoScroll);
    }
  }

  function beginTouchDrag() {
    long_press_timer = null;
    const press = touch_press;
    // Read before `beginDrag` reveals the empty lanes and moves the row.
    const rect = press ? press.handle.getBoundingClientRect() : null;
    if (!press || !rect || !beginDrag(press.holder)) {
      touch_press = null;
      return;
    }
    touch_active = true;
    touch_moved = false;
    // The auto-scroll reads the last pointer position; until the finger moves
    // that is where it pressed, not (0,0), which would scroll the page up while
    // a long press holds still.
    last_x = press.x;
    last_y = press.y;
    ghost = /** @type {HTMLElement} */ (press.handle.cloneNode(true));
    ghost.classList.add('worker-drag-ghost');
    ghost.setAttribute('aria-hidden', 'true');
    ghost.style.width = `${rect.width}px`;
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    document.body.appendChild(ghost);
    press.handle.classList.add('is-drag-source');
    try {
      mounted_el?.setPointerCapture?.(press.id);
    } catch {
      /* capture keeps events coming if the row re-renders; hit-testing works without it */
    }
    if (typeof requestAnimationFrame === 'function') {
      scroll_frame = requestAnimationFrame(autoScroll);
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  function trackTouch(x, y) {
    last_x = x;
    last_y = y;
    if (ghost && touch_press) {
      ghost.style.transform = `translate(${x - touch_press.x}px, ${y - touch_press.y}px)`;
    }
    clearDragOver();
    touch_over = dropTarget(hitTest(x, y));
    touch_over?.zone.classList.add('is-drop-over');
  }

  /** End a touch press, dragging or not, without dropping. */
  function endTouch() {
    if (long_press_timer !== null) {
      clearTimeout(long_press_timer);
      long_press_timer = null;
    }
    if (scroll_frame !== null && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(scroll_frame);
    }
    scroll_frame = null;
    touch_press?.handle.classList.remove('is-drag-source');
    touch_press = null;
    touch_over = null;
    ghost?.remove();
    ghost = null;
    if (touch_active) {
      touch_active = false;
      endDrag();
      expireDragSuppressSoon();
    }
  }

  /**
   * @param {PointerEvent} ev
   */
  function onPointerDown(ev) {
    press_target = ev.target instanceof Element ? ev.target : null;
    if (!ev.pointerType || ev.pointerType === 'mouse' || touch_press) {
      return;
    }
    const target = press_target;
    if (!target || target.closest(TOUCH_DRAG_SKIP)) {
      return;
    }
    const handle = target.closest('[draggable="true"][data-bead-id]');
    const holder = handle ? handle.closest('[data-drag-kind]') : null;
    if (!(handle instanceof HTMLElement) || !(holder instanceof HTMLElement)) {
      return;
    }
    touch_press = {
      id: ev.pointerId,
      x: ev.clientX,
      y: ev.clientY,
      handle,
      holder
    };
    long_press_timer = setTimeout(beginTouchDrag, LONG_PRESS_MS);
  }

  /**
   * @param {PointerEvent} ev
   */
  function onPointerMove(ev) {
    if (!touch_press || ev.pointerId !== touch_press.id) {
      return;
    }
    const beyond_slop =
      Math.hypot(ev.clientX - touch_press.x, ev.clientY - touch_press.y) >
      TOUCH_SLOP_PX;
    if (!touch_active) {
      if (beyond_slop) {
        // The finger moved before the long press finished: that is a scroll.
        endTouch();
      }
      return;
    }
    ev.preventDefault();
    if (!touch_moved && !beyond_slop) {
      return;
    }
    touch_moved = true;
    trackTouch(ev.clientX, ev.clientY);
  }

  /**
   * @param {PointerEvent} ev
   */
  function onPointerUp(ev) {
    if (!touch_press || ev.pointerId !== touch_press.id) {
      return;
    }
    if (!touch_active || !touch_moved) {
      endTouch();
      return;
    }
    trackTouch(ev.clientX, ev.clientY);
    const drag = dragging;
    const target = touch_over;
    endTouch();
    if (drag && target) {
      void applyDrop(drag, target.target);
    }
  }

  /**
   * @param {PointerEvent} ev
   */
  function onPointerCancel(ev) {
    if (touch_press && ev.pointerId === touch_press.id) {
      endTouch();
    }
  }

  /**
   * Holds the page still under a dragging finger; before the long press
   * finishes the move stays a scroll.
   *
   * @param {TouchEvent} ev
   */
  function onTouchMove(ev) {
    if (touch_active) {
      ev.preventDefault();
    }
  }

  /**
   * A long press must not open the 길게 누르기 menu over the row it drags.
   *
   * @param {Event} ev
   */
  function onContextMenu(ev) {
    if (touch_press) {
      ev.preventDefault();
    }
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragStart(ev) {
    // A touch or pen press is the pointer drag's; a browser that would also
    // start its own native drag from the long press must not run a second one.
    if (touch_press) {
      ev.preventDefault();
      return;
    }
    const target = /** @type {HTMLElement|null} */ (ev.target);
    const handle =
      typeof target?.closest === 'function'
        ? /** @type {HTMLElement|null} */ (
            target.closest('[draggable="true"][data-bead-id]')
          )
        : null;
    const holder = handle
      ? /** @type {HTMLElement|null} */ (handle.closest('[data-drag-kind]'))
      : null;
    if (!holder) {
      return;
    }
    // 인터랙티브 자식에서 시작한 드래그는 행 이동이 아니라 오조작이다 — 상태
    // 없는 유령 드래그를 남기지 않도록 취소한다.
    if (
      handle &&
      press_target &&
      handle.contains(press_target) &&
      typeof (/** @type {Element} */ (press_target).closest) === 'function' &&
      press_target.closest('input, button, a')
    ) {
      ev.preventDefault();
      return;
    }
    if (!beginDrag(holder)) {
      return;
    }
    try {
      ev.dataTransfer?.setData(
        'text/plain',
        holder.getAttribute('data-bead-id') || ''
      );
      if (ev.dataTransfer) {
        ev.dataTransfer.effectAllowed = 'move';
      }
    } catch {
      /* ignore — 드래그 자체는 상태만으로도 성립한다 */
    }
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragOver(ev) {
    const target = dropTarget(ev.target);
    if (!target) {
      return;
    }
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = 'move';
    }
    target.zone.classList.add('is-drop-over');
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragLeave(ev) {
    const node = /** @type {HTMLElement|null} */ (ev.target);
    if (typeof node?.closest === 'function') {
      node.closest('[data-drop]')?.classList.remove('is-drop-over');
      // 접힌 띠는 `[data-drop]`을 갖지 않으므로 자기 이름으로 지운다.
      node.closest('.worker-pane--collapsed')?.classList.remove('is-drop-over');
    }
  }

  function onDragEnd() {
    endDrag();
    expireDragSuppressSoon();
  }

  /**
   * @param {DragEvent} ev
   */
  function onDrop(ev) {
    const target = dropTarget(ev.target);
    const drag = dragging;
    endDrag();
    if (!target || !drag) {
      return;
    }
    ev.preventDefault();
    void applyDrop(drag, target.target);
  }

  return {
    /**
     * @param {HTMLElement} mount_el
     */
    attach(mount_el) {
      if (mounted_el) {
        return;
      }
      mounted_el = mount_el;
      mount_el.addEventListener(
        'pointerdown',
        /** @type {any} */ (onPointerDown)
      );
      mount_el.addEventListener('dragstart', /** @type {any} */ (onDragStart));
      mount_el.addEventListener('dragover', /** @type {any} */ (onDragOver));
      mount_el.addEventListener('dragleave', /** @type {any} */ (onDragLeave));
      mount_el.addEventListener('drop', /** @type {any} */ (onDrop));
      mount_el.addEventListener('dragend', onDragEnd);
      mount_el.addEventListener(
        'pointermove',
        /** @type {any} */ (onPointerMove)
      );
      mount_el.addEventListener('pointerup', /** @type {any} */ (onPointerUp));
      mount_el.addEventListener(
        'pointercancel',
        /** @type {any} */ (onPointerCancel)
      );
      mount_el.addEventListener('touchmove', onTouchMove, { passive: false });
      mount_el.addEventListener('contextmenu', onContextMenu);
    },
    detach() {
      endTouch();
      if (suppress_timer !== null) {
        clearTimeout(suppress_timer);
        suppress_timer = null;
      }
      const mount_el = mounted_el;
      mounted_el = null;
      if (!mount_el) {
        return;
      }
      mount_el.removeEventListener(
        'pointermove',
        /** @type {any} */ (onPointerMove)
      );
      mount_el.removeEventListener(
        'pointerup',
        /** @type {any} */ (onPointerUp)
      );
      mount_el.removeEventListener(
        'pointercancel',
        /** @type {any} */ (onPointerCancel)
      );
      mount_el.removeEventListener('touchmove', onTouchMove);
      mount_el.removeEventListener('contextmenu', onContextMenu);
      mount_el.removeEventListener(
        'pointerdown',
        /** @type {any} */ (onPointerDown)
      );
      mount_el.removeEventListener(
        'dragstart',
        /** @type {any} */ (onDragStart)
      );
      mount_el.removeEventListener('dragover', /** @type {any} */ (onDragOver));
      mount_el.removeEventListener(
        'dragleave',
        /** @type {any} */ (onDragLeave)
      );
      mount_el.removeEventListener('drop', /** @type {any} */ (onDrop));
      mount_el.removeEventListener('dragend', onDragEnd);
    },
    isDragging() {
      return dragging !== null;
    },
    /**
     * Whether the click that follows a drop must NOT open a detail panel. 읽는
     * 즉시 소진된다 — 한 드롭이 막는 클릭은 하나뿐이다.
     */
    consumeClickSuppression() {
      const suppressed = suppress_open_click;
      suppress_open_click = false;
      return suppressed;
    },
    applyDrop,
    sendOp
  };
}
