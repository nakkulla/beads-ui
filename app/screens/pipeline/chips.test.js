import { describe, expect, test } from 'vitest';
import { render } from '../../ui/render.js';
import { refreshTimeText } from '../../ui/ticker.js';
import { timeSpan } from './chips.js';

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
