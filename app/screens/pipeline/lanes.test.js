import { afterEach, describe, expect, test, vi } from 'vitest';
import { buildLanes } from '../../model/lane-model.js';
import { renderCount } from '../../ui/render.js';
import { NOW, mountPipeline } from './test-harness.js';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

afterEach(() => {
  for (const entry of mounted.splice(0)) {
    entry.destroy();
  }
  vi.useRealTimers();
});

/**
 * @param {Parameters<typeof mountPipeline>[0]} [options]
 */
function mount(options) {
  const handle = mountPipeline(options);
  mounted.push(handle);
  return handle;
}

describe('pipeline lanes (UI-dbn6 §3.3·§4.2)', () => {
  test('renders the five lanes in stage order from a keyed-frames snapshot', () => {
    const { mount: root } = mount({ now: NOW });

    const lanes = Array.from(root.querySelectorAll('.pl-lane')).map(
      (el) => /** @type {HTMLElement} */ (el).dataset.lane
    );

    expect(lanes).toEqual(['candidate', 'queue', 'running', 'pr_wait', 'done']);
  });

  test('groups the 대기 lane into one bundle per repo in the 전체 scope', () => {
    const { mount: root } = mount({ now: NOW });

    const names = Array.from(
      root.querySelectorAll('[data-lane-body="queue"] .pl-bundle__name')
    ).map((el) => el.textContent?.trim());

    expect(names).toHaveLength(8);
    expect(names[0]).toBe('repo-a');
  });

  test('recalls buildLanes only when a memo key input changes', () => {
    const spy = vi.fn(buildLanes);
    const handle = mount({ now: NOW, buildLanes: spy });
    handle.screen.refresh();
    const after_refresh = spy.mock.calls.length;
    const rows = /** @type {Array<Record<string, any>>} */ (
      handle.monitor.get()
    );

    handle.monitor.set(
      [{ ...rows[0], revision: rows[0].revision + 1 }, ...rows.slice(1)],
      handle.monitor.getWorkspacesState(),
      5
    );

    expect(after_refresh).toBe(1);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('renders nothing during an idle minute', () => {
    vi.useFakeTimers({ now: NOW + 120_000 });
    mount();
    const before = renderCount();

    vi.advanceTimersByTime(60_000);

    expect(renderCount()).toBe(before);
  });

  test('re-renders only the 대기 lane once at the grace boundary', () => {
    vi.useFakeTimers({ now: NOW });
    const { mount: root } = mount();
    const before = renderCount();
    const grace_before = root.querySelectorAll(
      '[data-lane-body="queue"] .pl-chip--grace'
    ).length;

    vi.advanceTimersByTime(40_000);

    expect(grace_before).toBe(1);
    expect(renderCount() - before).toBe(1);
    expect(
      root.querySelectorAll('[data-lane-body="queue"] .pl-chip--grace')
    ).toHaveLength(0);
  });
});
