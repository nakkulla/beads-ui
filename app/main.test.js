import { describe, expect, test } from 'vitest';
import { bootstrap } from './main.js';

describe('app/main (jsdom)', () => {
  test('renders the shell (pipeline default, detail overlay)', () => {
    document.body.innerHTML = '<main id="app"></main>';
    const root_element = /** @type {HTMLElement} */ (
      document.getElementById('app')
    );
    bootstrap(root_element);

    const pipeline_root = root_element.querySelector('#pipeline-root');
    const detail_panel = root_element.querySelector('#detail-panel');
    expect(root_element.querySelector('#worker-root')).toBeNull();
    expect(pipeline_root).not.toBeNull();
    expect(detail_panel).not.toBeNull();

    // The pipeline is the default visible route (UI-dbn6 §3.1); the detail
    // overlay starts hidden.
    expect(/** @type {HTMLElement} */ (pipeline_root).hidden).toBe(false);
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
