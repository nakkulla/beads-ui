import { render } from 'lit-html';
import { beforeEach, describe, expect, test } from 'vitest';
import { miniRow } from './lanes.js';

/** @type {HTMLElement} */
let mount;

/**
 * @param {Partial<import('./lanes.js').MiniItem>} item
 * @returns {HTMLElement}
 */
function renderRow(item) {
  render(
    miniRow(
      /** @type {any} */ ({
        id: 'UI-x1',
        title: '완료된 아주 긴 제목이 한 줄을 다 써도 잘리지 않아야 한다',
        draggable: false,
        lane: 'done',
        done: true,
        ...item
      })
    ),
    mount
  );
  return /** @type {HTMLElement} */ (mount.querySelector('.worker-mini'));
}

const USAGE = {
  input_tokens: 1000,
  output_tokens: 500,
  total_tokens: 1500,
  cost_usd: 0.42
};

beforeEach(() => {
  document.body.innerHTML = '<div id="lane"></div>';
  mount = /** @type {HTMLElement} */ (document.getElementById('lane'));
});

describe('done lane row', () => {
  test('gives the first line the id and title with no usage badge', () => {
    const row = renderRow({ usage: USAGE });

    const first = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__row1')
    );
    expect(first.querySelector('.worker-mini__id')?.textContent).toContain(
      'UI-x1'
    );
    expect(first.querySelector('.worker-mini__title')?.textContent).toContain(
      '잘리지 않아야'
    );
    expect(first.querySelector('.worker-usage')).toBeNull();
  });

  test('puts usage and the completion time on the second line', () => {
    const row = renderRow({ usage: USAGE, done_at: Date.now() - 3_600_000 });

    const second = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__row2')
    );
    expect(second.querySelector('.worker-usage')).not.toBeNull();
    expect(second.querySelector('.worker-mini__done-at')?.textContent).toContain(
      '1시간 전'
    );
  });

  test('omits the completion time when the entry carries none', () => {
    const row = renderRow({ usage: USAGE });

    expect(row.querySelector('.worker-mini__done-at')).toBeNull();
  });

  test('keeps the drag contract attributes on the row shell', () => {
    const row = renderRow({});

    expect(row.getAttribute('data-bead-id')).toBe('UI-x1');
    expect(row.getAttribute('data-lane')).toBe('done');
    expect(row.classList.contains('worker-mini--done')).toBe(true);
  });

  test('leaves a queue row as a single line', () => {
    const row = renderRow({ lane: 'queue', done: false, draggable: true });

    expect(row.querySelector('.worker-mini__row1')).toBeNull();
    expect(row.querySelector('.worker-mini__line')).not.toBeNull();
  });
});
