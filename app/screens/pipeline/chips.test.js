import { describe, expect, test } from 'vitest';
import { render } from '../../ui/render.js';
import { refreshTimeText } from '../../ui/ticker.js';
import { opButton, priorityBadge, timeSpan } from './chips.js';

const NOW = Date.parse('2026-09-30T03:00:00Z');

describe('ticker time spans (UI-dbn6 §3.4)', () => {
  test('re-renders a span the ticker already rewrote', () => {
    const host = document.createElement('div');
    render(timeSpan(NOW - 60_000, 'elapsed', { now: NOW }), host);
    refreshTimeText(host, NOW + 5_000);

    render(timeSpan(NOW - 120_000, 'elapsed', { now: NOW }), host);

    expect(host.querySelector('[data-ts]')?.textContent).toBe('2m 00s');
  });
});

describe('chip and op primitives (UI-dbn6 design-system round)', () => {
  test('stamps the priority level for its role colour', () => {
    const host = document.createElement('div');

    render(priorityBadge(0), host);

    const chip = host.querySelector('.pl-pri');
    expect(chip?.getAttribute('data-priority')).toBe('0');
    expect(chip?.classList.contains('ui-chip')).toBe(true);
  });

  test.each([
    ['primary', 'primary', 'ui-btn ui-btn--primary pl-op pl-op--primary'],
    ['danger', 'danger', 'ui-btn ui-btn--danger pl-op pl-op--danger'],
    ['ghost', 'ghost', 'ui-btn ui-btn--ghost pl-op pl-op--ghost'],
    ['plain', undefined, 'ui-btn pl-op pl-op--plain']
  ])('draws a %s op with its button tier', (_name, tone, cls) => {
    const host = document.createElement('div');

    render(
      opButton({
        op: 'merge',
        label: '머지',
        .../** @type {any} */ (tone ? { tone } : {})
      }),
      host
    );

    expect(host.querySelector('button')?.className).toBe(cls);
  });
});
