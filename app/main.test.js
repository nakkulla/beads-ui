import { describe, expect, test } from 'vitest';
import { bootstrap } from './main.js';

describe('app/main (jsdom)', () => {
  test('renders the shell (worker default, detail overlay)', () => {
    document.body.innerHTML = '<main id="app"></main>';
    const root_element = /** @type {HTMLElement} */ (
      document.getElementById('app')
    );
    bootstrap(root_element);

    const worker_root = root_element.querySelector('#worker-root');
    const detail_panel = root_element.querySelector('#detail-panel');
    expect(root_element.querySelector('#board-root')).toBeNull();
    expect(worker_root).not.toBeNull();
    expect(detail_panel).not.toBeNull();

    // Worker is the default visible route; the detail overlay starts hidden.
    expect(/** @type {HTMLElement} */ (worker_root).hidden).toBe(false);
    expect(/** @type {HTMLElement} */ (detail_panel).hidden).toBe(true);
  });

  test('creates exactly one md viewer mount for the whole shell', () => {
    document.body.innerHTML = '<main id="app"></main>';
    const root_element = /** @type {HTMLElement} */ (
      document.getElementById('app')
    );

    bootstrap(root_element);

    expect(document.querySelectorAll('.md-viewer-root').length).toBe(1);
  });
});
