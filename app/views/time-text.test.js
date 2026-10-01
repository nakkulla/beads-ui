import { html, render } from 'lit-html';
import { describe, expect, test } from 'vitest';
import { formatTs, refreshTimeText, timeSpan } from './time-text.js';

const NOW = new Date(2026, 9, 1, 12, 0, 0).getTime();

describe('time text formats (UI-yu2o)', () => {
  test('formats a relative timestamp', () => {
    const text = formatTs('rel', NOW - 5 * 60_000, NOW);

    expect(text).toBe('5분 전');
  });

  test('formats the running tile clock', () => {
    const text = formatTs('clock', NOW - 125_000, NOW);

    expect(text).toBe('2m 05s');
  });

  test('formats a turn duration without the running suffix', () => {
    const text = formatTs('dur', NOW - 7 * 60_000, NOW);

    expect(text).toBe('7분');
  });

  test('formats a countdown and blanks it once it passes', () => {
    const live = formatTs('countdown', NOW + 4_200, NOW);
    const over = formatTs('countdown', NOW - 1, NOW);

    expect([live, over]).toEqual(['5초', '']);
  });

  test('formats the minutes left until a reset and blanks it once it passes', () => {
    const live = formatTs('until-min', NOW + 61_000, NOW);
    const over = formatTs('until-min', NOW, NOW);

    expect([live, over]).toEqual(['2분', '']);
  });

  test('formats an hour-minute span since a start', () => {
    const text = formatTs('hm', NOW - 62 * 60_000, NOW);

    expect(text).toBe('1h02m');
  });
});

describe('time text ticker (UI-yu2o)', () => {
  test('rewrites only the text of data-ts elements', () => {
    const root = document.createElement('div');
    root.innerHTML = `<span class="keep" data-ts="${NOW - 2 * 3_600_000}" data-ts-fmt="rel" data-ts-pre="수정 ">old</span>`;
    const span = /** @type {HTMLElement} */ (root.querySelector('span'));

    refreshTimeText(root, NOW);

    expect([span.textContent, span.className]).toEqual([
      '수정 2시간 전',
      'keep'
    ]);
  });

  test('paints the first text with the ticker formatter', () => {
    const root = document.createElement('div');

    render(timeSpan(NOW - 90_000, 'since', NOW, { post: ' 대기' }), root);

    expect(root.textContent).toBe('1분째 대기');
  });

  test('keeps rendering the span after the ticker rewrote its text', () => {
    const root = document.createElement('div');
    /** @param {number} now */
    const view = (now) =>
      html`<p>${timeSpan(NOW - 1_000, 'clock', now, { pre: '실행 · ' })}</p>`;
    render(view(NOW), root);
    refreshTimeText(root, NOW + 4_000);

    render(view(NOW + 9_000), root);

    expect(root.textContent).toBe('실행 · 10s');
  });

  test('draws nothing for an unparseable timestamp', () => {
    const root = document.createElement('div');

    render(timeSpan('not a time', 'rel', NOW), root);

    expect(root.querySelector('[data-ts]')).toBeNull();
  });
});
