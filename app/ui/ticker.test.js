import { afterEach, describe, expect, test, vi } from 'vitest';
import { renderCount } from './render.js';
import { createTicker, formatTs, refreshTimeText } from './ticker.js';

const NOW = new Date(2026, 8, 30, 12, 0, 0).getTime();

afterEach(() => {
  vi.useRealTimers();
});

describe('time text ticker (UI-dbn6 §3.4)', () => {
  test('formats a relative timestamp', () => {
    const text = formatTs('rel', NOW - 5 * 60_000, NOW);

    expect(text).toBe('5분 전');
  });

  test('formats a running elapsed clock', () => {
    const text = formatTs('elapsed', NOW - 125_000, NOW);

    expect(text).toBe('2m 05s');
  });

  test('formats a countdown and blanks it once it passes', () => {
    const live = formatTs('countdown', NOW + 4_200, NOW);
    const over = formatTs('countdown', NOW - 1, NOW);

    expect([live, over]).toEqual(['5초', '']);
  });

  test('rewrites only the text of data-ts elements', () => {
    const root = document.createElement('div');
    root.innerHTML =
      '<span class="keep" data-ts="0" data-ts-fmt="rel" data-ts-pre="수정 ">old</span>';
    const span = /** @type {HTMLElement} */ (root.querySelector('span'));
    span.dataset.ts = String(NOW - 2 * 3_600_000);

    refreshTimeText(root, NOW);

    expect(span.textContent).toBe('수정 2시간 전');
    expect(span.className).toBe('keep');
  });

  test('ticks every second without calling render', () => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
    const root = document.createElement('div');
    root.innerHTML = `<b data-ts="${NOW}" data-ts-fmt="elapsed"></b>`;
    const ticker = createTicker({ root: () => root });
    const before = renderCount();

    ticker.start();
    vi.advanceTimersByTime(3_000);
    ticker.stop();

    expect(root.querySelector('b')?.textContent).toBe('3s');
    expect(renderCount()).toBe(before);
  });
});
