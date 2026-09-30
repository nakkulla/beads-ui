import { html } from 'lit-html';
import { describe, expect, test } from 'vitest';
import { render, renderCount } from './render.js';

describe('render observation wrapper (UI-dbn6 §4.1)', () => {
  test('counts each call it forwards to lit-html', () => {
    const host = document.createElement('div');
    const before = renderCount();

    render(html`<p>one</p>`, host);
    render(html`<p>two</p>`, host);

    expect(renderCount()).toBe(before + 2);
  });

  test('draws the template into the container', () => {
    const host = document.createElement('div');

    render(html`<span class="probe">hi</span>`, host);

    expect(host.querySelector('.probe')?.textContent).toBe('hi');
  });

  test('exposes the same count on window.__bdui.render_count', () => {
    const host = document.createElement('div');

    render(html`<i></i>`, host);

    expect(/** @type {any} */ (window).__bdui.render_count).toBe(renderCount());
  });
});
