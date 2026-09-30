/**
 * Pointer-event drag for the pipeline lanes (UI-dbn6 §3.6), replacing the
 * HTML5 `draggable` controller. A mouse drags as soon as it moves past a small
 * threshold; touch and pen drag only after a 350ms long press, so a finger
 * that moves first scrolls the page instead. While dragging, the lane body or
 * page under the pointer auto-scrolls near its edge.
 *
 * Sources carry `data-drag-kind` (`candidate`·`parallel`·`repo-serial`) with
 * `data-bead-id`·`data-root-dir` and, for waiting rows, `data-queue-index` and
 * `data-lane-id`. Zones carry `data-drop` (`candidate`·`parallel`·
 * `repo-serial`) with `data-root-dir`, `data-lane-id` and `data-lane-length`.
 * A drop onto another repository's zone is refused (the serial-lane rule kept,
 * and the parallel area is per repo in this screen).
 */

export const LONG_PRESS_MS = 350;
const MOUSE_THRESHOLD_PX = 5;
const TOUCH_SLOP_PX = 8;
const EDGE_PX = 48;
const SCROLL_STEP_PX = 14;

/**
 * @typedef {{ kind: 'candidate'|'parallel'|'repo-serial', bead_id: string, root_dir: string, queue_index?: number, lane_id?: string }} DragSource
 * @typedef {{ kind: 'candidate' }|{ kind: 'parallel', root_dir: string, index: number }|{ kind: 'repo-serial', root_dir: string, lane_id: string, index: number }} DropTarget
 * @typedef {{ type: string, payload: Record<string, unknown>, root_dir: string }} QueueRequest
 */

/**
 * The one queue request a drop stands for, or a refusal, or nothing (a drop
 * onto the place it came from).
 *
 * @param {DragSource} drag
 * @param {DropTarget} target
 * @returns {QueueRequest|{ refused: string }|null}
 */
export function dropRequest(drag, target) {
  if (target.kind === 'candidate') {
    return drag.kind === 'candidate'
      ? null
      : {
          type: 'worker-queue-remove',
          payload: { bead_id: drag.bead_id },
          root_dir: drag.root_dir
        };
  }
  if (target.root_dir !== drag.root_dir) {
    return {
      refused:
        target.kind === 'repo-serial'
          ? '다른 레포 이슈는 이 직렬 레인에 넣을 수 없습니다'
          : '다른 레포 이슈는 이 병렬 영역에 넣을 수 없습니다'
    };
  }
  const same_lane =
    (target.kind === 'parallel' && drag.kind === 'parallel') ||
    (target.kind === 'repo-serial' &&
      drag.kind === 'repo-serial' &&
      drag.lane_id === target.lane_id);
  if (same_lane) {
    const source = drag.queue_index;
    if (typeof source !== 'number') {
      return null;
    }
    const to_index = source < target.index ? target.index - 1 : target.index;
    if (to_index < 0 || to_index === source) {
      return null;
    }
    return {
      type: 'worker-queue-reorder',
      payload: {
        bead_id: drag.bead_id,
        to_index,
        ...(target.kind === 'repo-serial' ? { lane: target.lane_id } : {})
      },
      root_dir: drag.root_dir
    };
  }
  return {
    type: 'worker-queue-place',
    payload: {
      bead_id: drag.bead_id,
      index: target.index,
      ...(target.kind === 'repo-serial' ? { lane: target.lane_id } : {})
    },
    root_dir: drag.root_dir
  };
}

/**
 * @param {Element} el
 * @returns {DragSource|null}
 */
export function sourceOf(el) {
  const holder = el.closest('[data-drag-kind]');
  if (!(holder instanceof HTMLElement)) {
    return null;
  }
  const kind = holder.dataset.dragKind;
  const bead_id = holder.dataset.beadId || '';
  const root_dir = holder.dataset.rootDir || '';
  if (
    (kind !== 'candidate' && kind !== 'parallel' && kind !== 'repo-serial') ||
    !bead_id ||
    !root_dir
  ) {
    return null;
  }
  const index = Number(holder.dataset.queueIndex);
  return {
    kind,
    bead_id,
    root_dir,
    ...(holder.dataset.queueIndex !== undefined && Number.isFinite(index)
      ? { queue_index: index }
      : {}),
    ...(holder.dataset.laneId ? { lane_id: holder.dataset.laneId } : {})
  };
}

/**
 * The zone and insert position under a point. Over a row, the upper half
 * inserts before it and the lower half after it; past every row, the zone's
 * raw lane length (append).
 *
 * @param {Element|null} hit
 * @param {number} y
 * @returns {{ zone: HTMLElement, row: HTMLElement|null, after: boolean, target: DropTarget }|null}
 */
export function targetAt(hit, y) {
  const zone = hit ? hit.closest('[data-drop]') : null;
  if (!(zone instanceof HTMLElement)) {
    return null;
  }
  const kind = zone.dataset.drop;
  if (kind === 'candidate') {
    return { zone, row: null, after: false, target: { kind: 'candidate' } };
  }
  const root_dir = zone.dataset.rootDir || '';
  const row_el = hit ? hit.closest('[data-queue-index]') : null;
  const row =
    row_el instanceof HTMLElement && zone.contains(row_el) ? row_el : null;
  let index = Number(zone.dataset.laneLength || '0');
  let after = false;
  if (row) {
    const rect = row.getBoundingClientRect();
    const row_index = Number(row.dataset.queueIndex);
    after = rect.height > 0 && y > rect.top + rect.height / 2;
    index = (Number.isFinite(row_index) ? row_index : 0) + (after ? 1 : 0);
  }
  if (kind === 'parallel') {
    return { zone, row, after, target: { kind: 'parallel', root_dir, index } };
  }
  if (kind === 'repo-serial') {
    return {
      zone,
      row,
      after,
      target: {
        kind: 'repo-serial',
        root_dir,
        lane_id: zone.dataset.laneId || '',
        index
      }
    };
  }
  return null;
}

/**
 * The nearest vertically scrollable ancestor (or the page scroller).
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
 * @param {{
 *   root: HTMLElement,
 *   onDrop: (drag: DragSource, target: DropTarget) => void,
 *   onDragChange?: (dragging: boolean) => void,
 *   hitTest?: (x: number, y: number) => Element|null,
 *   longPressMs?: number
 * }} options
 */
export function createPointerDrag(options) {
  const root = options.root;
  const hitTest =
    options.hitTest || ((x, y) => document.elementFromPoint(x, y));
  const long_press_ms = options.longPressMs ?? LONG_PRESS_MS;
  /** @type {{ id: number, type: string, x: number, y: number, source: DragSource, el: HTMLElement }|null} */
  let press = null;
  /** @type {ReturnType<typeof setTimeout>|null} */
  let timer = null;
  let dragging = false;
  let suppress_click = false;
  /** @type {HTMLElement|null} */
  let ghost = null;
  /** @type {{ zone: HTMLElement, row: HTMLElement|null, after: boolean, target: DropTarget }|null} */
  let over = null;
  let last_x = 0;
  let last_y = 0;
  /** @type {number|null} */
  let frame = null;

  function clearMarks() {
    for (const el of Array.from(
      root.querySelectorAll('.is-drop-over, .is-drop-before, .is-drop-after')
    )) {
      el.classList.remove('is-drop-over', 'is-drop-before', 'is-drop-after');
    }
  }

  function stopTimer() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function autoScroll() {
    frame = null;
    if (!dragging) {
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
      frame = requestAnimationFrame(autoScroll);
    }
  }

  function begin() {
    stopTimer();
    if (!press) {
      return;
    }
    dragging = true;
    suppress_click = true;
    root.classList.add('is-dragging');
    press.el.classList.add('is-drag-source');
    const rect = press.el.getBoundingClientRect();
    ghost = /** @type {HTMLElement} */ (press.el.cloneNode(true));
    ghost.classList.add('pl-drag-ghost');
    ghost.style.width = `${rect.width}px`;
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    document.body.appendChild(ghost);
    try {
      root.setPointerCapture?.(press.id);
    } catch {
      // capture is an optimisation; hit-testing still works without it
    }
    options.onDragChange?.(true);
    if (typeof requestAnimationFrame === 'function') {
      frame = requestAnimationFrame(autoScroll);
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  function track(x, y) {
    last_x = x;
    last_y = y;
    if (ghost && press) {
      const dx = x - press.x;
      const dy = y - press.y;
      ghost.style.transform = `translate(${dx}px, ${dy}px)`;
    }
    clearMarks();
    over = targetAt(hitTest(x, y), y);
    if (over) {
      over.zone.classList.add('is-drop-over');
      if (over.row) {
        over.row.classList.add(over.after ? 'is-drop-after' : 'is-drop-before');
      }
    }
  }

  /**
   * @param {boolean} drop
   */
  function finish(drop) {
    stopTimer();
    const source = press?.source || null;
    const target = over?.target || null;
    const was_dragging = dragging;
    press?.el.classList.remove('is-drag-source');
    press = null;
    dragging = false;
    over = null;
    clearMarks();
    root.classList.remove('is-dragging');
    ghost?.remove();
    ghost = null;
    if (frame !== null && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(frame);
    }
    frame = null;
    if (was_dragging) {
      // The click that follows this pointerup is swallowed once; any later
      // click is a new gesture.
      setTimeout(() => {
        suppress_click = false;
      }, 0);
      options.onDragChange?.(false);
      if (drop && source && target) {
        options.onDrop(source, target);
      }
    }
  }

  /** @param {PointerEvent} ev */
  function onPointerDown(ev) {
    if (press || (ev.pointerType === 'mouse' && ev.button !== 0)) {
      return;
    }
    const target = /** @type {Element} */ (ev.target);
    if (
      !target ||
      typeof target.closest !== 'function' ||
      target.closest('button, a, input, select, textarea, summary, label')
    ) {
      return;
    }
    const source = sourceOf(target);
    const el = /** @type {HTMLElement|null} */ (
      target.closest('[data-drag-kind]')
    );
    if (!source || !el) {
      return;
    }
    press = {
      id: ev.pointerId,
      type: ev.pointerType || 'mouse',
      x: ev.clientX,
      y: ev.clientY,
      source,
      el
    };
    if (press.type !== 'mouse') {
      timer = setTimeout(begin, long_press_ms);
    }
  }

  /** @param {PointerEvent} ev */
  function onPointerMove(ev) {
    if (!press || ev.pointerId !== press.id) {
      return;
    }
    const distance = Math.hypot(ev.clientX - press.x, ev.clientY - press.y);
    if (!dragging) {
      if (press.type === 'mouse') {
        if (distance >= MOUSE_THRESHOLD_PX) {
          begin();
        } else {
          return;
        }
      } else if (distance > TOUCH_SLOP_PX) {
        // the finger moved before the long press finished: that is a scroll
        stopTimer();
        press = null;
        return;
      } else {
        return;
      }
    }
    ev.preventDefault();
    track(ev.clientX, ev.clientY);
  }

  /** @param {PointerEvent} ev */
  function onPointerUp(ev) {
    if (!press || ev.pointerId !== press.id) {
      return;
    }
    if (dragging) {
      track(ev.clientX, ev.clientY);
    }
    finish(true);
  }

  function onPointerCancel() {
    finish(false);
  }

  /** @param {TouchEvent} ev */
  function onTouchMove(ev) {
    if (dragging) {
      ev.preventDefault();
    }
  }

  /** @param {Event} ev */
  function onContextMenu(ev) {
    if (press && press.type !== 'mouse') {
      ev.preventDefault();
    }
  }

  /** @param {KeyboardEvent} ev */
  function onKeyDown(ev) {
    if (ev.key === 'Escape' && press) {
      finish(false);
    }
  }

  return {
    attach() {
      root.addEventListener('pointerdown', onPointerDown);
      root.addEventListener('pointermove', onPointerMove);
      root.addEventListener('pointerup', onPointerUp);
      root.addEventListener('pointercancel', onPointerCancel);
      root.addEventListener('touchmove', onTouchMove, { passive: false });
      root.addEventListener('contextmenu', onContextMenu);
      document.addEventListener('keydown', onKeyDown);
    },
    detach() {
      finish(false);
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', onPointerUp);
      root.removeEventListener('pointercancel', onPointerCancel);
      root.removeEventListener('touchmove', onTouchMove);
      root.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('keydown', onKeyDown);
    },
    /** @returns {boolean} */
    isDragging: () => dragging,
    /**
     * Whether the click that follows a drop must not open a card. Reading it
     * consumes it.
     *
     * @returns {boolean}
     */
    consumeClick() {
      const value = suppress_click;
      suppress_click = false;
      return value;
    }
  };
}
