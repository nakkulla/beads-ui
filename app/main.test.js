import { describe, expect, test } from 'vitest';
import { bootstrap } from './main.js';

describe('app/main (jsdom)', () => {
  test('renders the two-tab shell (board default, worker, detail overlay)', () => {
    document.body.innerHTML = '<main id="app"></main>';
    const root_element = /** @type {HTMLElement} */ (
      document.getElementById('app')
    );
    bootstrap(root_element);

    const board_root = root_element.querySelector('#board-root');
    const worker_root = root_element.querySelector('#worker-root');
    const detail_panel = root_element.querySelector('#detail-panel');
    expect(board_root).not.toBeNull();
    expect(worker_root).not.toBeNull();
    expect(detail_panel).not.toBeNull();

    // Board is the default visible route; worker + detail start hidden.
    expect(/** @type {HTMLElement} */ (board_root).hidden).toBe(false);
    expect(/** @type {HTMLElement} */ (worker_root).hidden).toBe(true);
    expect(/** @type {HTMLElement} */ (detail_panel).hidden).toBe(true);
  });
});
