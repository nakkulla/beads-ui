import { describe, expect, test } from 'vitest';
import { bootstrap } from './main.js';

describe('app/main (jsdom)', () => {
  test('renders two-panel shell into root', () => {
    document.body.innerHTML = '<main id="app"></main>';
    const root_element = /** @type {HTMLElement} */ (
      document.getElementById('app')
    );
    bootstrap(root_element);

    const list_panel = root_element.querySelector('#list-panel');
    const detail_panel = root_element.querySelector('#detail-panel');
    const worker_root = root_element.querySelector('#worker-root');
    expect(list_panel).not.toBeNull();
    expect(detail_panel).not.toBeNull();
    expect(worker_root).not.toBeNull();
  });
});
