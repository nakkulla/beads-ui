import { afterEach, describe, expect, test, vi } from 'vitest';
import { NOW, mountPipeline, payloadsOf, settle } from './test-harness.js';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

afterEach(() => {
  for (const entry of mounted.splice(0)) {
    entry.destroy();
  }
  vi.useRealTimers();
});

const REPO_A = '/fixture/repo-a';
const REPO_B = '/fixture/repo-b';

/**
 * @param {Parameters<typeof mountPipeline>[0]} options
 * @param {{ current: Element|null }} hit
 */
function mount(options, hit) {
  const handle = mountPipeline({
    now: NOW,
    ...options,
    hitTest: () => hit.current
  });
  mounted.push(handle);
  return handle;
}

/**
 * @param {Element} target
 * @param {string} type
 * @param {{ pointerType: string, x: number, y: number }} input
 */
function pointer(target, type, input) {
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
 * @param {ParentNode} root
 * @param {string} bead_id
 * @returns {HTMLElement}
 */
function rowOf(root, bead_id) {
  return /** @type {HTMLElement} */ (
    root.querySelector(`.pl-row[data-bead-id="${bead_id}"]`)
  );
}

describe('pipeline pointer drag (UI-dbn6 §3.6)', () => {
  test('starts no touch drag before the 350 ms long press', () => {
    vi.useFakeTimers({ now: NOW });
    /** @type {{ current: Element|null }} */
    const hit = { current: null };
    const { mount: root } = mount({}, hit);
    const source = rowOf(root, 'A-3');
    pointer(source, 'pointerdown', { pointerType: 'touch', x: 10, y: 10 });

    vi.advanceTimersByTime(300);

    expect(root.classList.contains('is-dragging')).toBe(false);
  });

  test('sends no queue op when a touch lifts before the long press', async () => {
    vi.useFakeTimers({ now: NOW });
    /** @type {{ current: Element|null }} */
    const hit = { current: null };
    const { mount: root, send } = mount({}, hit);
    const source = rowOf(root, 'A-3');
    pointer(source, 'pointerdown', { pointerType: 'touch', x: 10, y: 10 });
    vi.advanceTimersByTime(300);
    hit.current = rowOf(root, 'A-1');

    pointer(source, 'pointerup', { pointerType: 'touch', x: 10, y: 12 });
    await settle();

    expect(payloadsOf(send, 'worker-queue-reorder')).toEqual([]);
  });

  test('reorders after the 350 ms touch long press', async () => {
    vi.useFakeTimers({ now: NOW });
    /** @type {{ current: Element|null }} */
    const hit = { current: null };
    const { mount: root, send } = mount({}, hit);
    const source = rowOf(root, 'A-3');
    pointer(source, 'pointerdown', { pointerType: 'touch', x: 10, y: 10 });
    vi.advanceTimersByTime(360);
    hit.current = rowOf(root, 'A-1');

    pointer(source, 'pointermove', { pointerType: 'touch', x: 10, y: 40 });
    pointer(source, 'pointerup', { pointerType: 'touch', x: 10, y: 40 });
    await settle();

    expect(payloadsOf(send, 'worker-queue-reorder')).toEqual([
      { bead_id: 'A-3', to_index: 0, root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('holds the lane still after a long press until the finger moves', () => {
    vi.useFakeTimers({ now: NOW });
    /** @type {{ current: Element|null }} */
    const hit = { current: null };
    const { mount: root } = mount({}, hit);
    const source = rowOf(root, 'A-3');
    const scroller = /** @type {HTMLElement} */ (
      source.closest('[data-lane-body]')
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
    hit.current = source;
    pointer(source, 'pointerdown', { pointerType: 'touch', x: 10, y: 400 });

    vi.advanceTimersByTime(360 + 160);

    expect(root.classList.contains('is-dragging')).toBe(true);
    expect(writes).not.toHaveBeenCalled();
  });

  test('sends worker-queue-reorder for a mouse drag onto an earlier row', async () => {
    /** @type {{ current: Element|null }} */
    const hit = { current: null };
    const { mount: root, send } = mount({}, hit);
    const source = rowOf(root, 'A-3');
    pointer(source, 'pointerdown', { pointerType: 'mouse', x: 10, y: 10 });
    hit.current = rowOf(root, 'A-2');

    pointer(source, 'pointermove', { pointerType: 'mouse', x: 10, y: 30 });
    pointer(source, 'pointerup', { pointerType: 'mouse', x: 10, y: 30 });
    await settle();

    expect(payloadsOf(send, 'worker-queue-reorder')).toEqual([
      { bead_id: 'A-3', to_index: 1, root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('refuses a drop onto another repo serial lane', async () => {
    /** @type {{ current: Element|null }} */
    const hit = { current: null };
    const {
      mount: root,
      send,
      toast
    } = mount(
      {
        edit: (fixture) => {
          fixture.workspaces[1].serial_lanes = [
            { id: 's1', entries: [{ bead_id: 'B-7', added_at: NOW - 60_000 }] }
          ];
          fixture.workspaces[1].serial_lane_count = 1;
          fixture.workspaces_state[1].serial_lane_count = 1;
        }
      },
      hit
    );
    const source = rowOf(root, 'A-3');
    pointer(source, 'pointerdown', { pointerType: 'mouse', x: 10, y: 10 });
    hit.current = /** @type {Element} */ (
      root.querySelector(`[data-drop="repo-serial"][data-root-dir="${REPO_B}"]`)
    );

    pointer(source, 'pointermove', { pointerType: 'mouse', x: 10, y: 60 });
    pointer(source, 'pointerup', { pointerType: 'mouse', x: 10, y: 60 });
    await settle();

    expect(toast).toHaveBeenCalledWith(
      '다른 레포 이슈는 이 직렬 레인에 넣을 수 없습니다',
      'error'
    );
    expect(
      send.mock.calls.filter((call) =>
        String(call[0]).startsWith('worker-queue-')
      )
    ).toEqual([]);
  });
});
