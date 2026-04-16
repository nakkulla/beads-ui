import { render } from 'lit-html';
import { describe, expect, test } from 'vitest';
import { workerPrSummaryTemplate } from './worker-pr-summary.js';

describe('views/worker-pr-summary', () => {
  test('renders workspace-wide open PR summary', () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    render(
      workerPrSummaryTemplate([
        { number: 7, title: 'Workspace summary', state: 'OPEN' }
      ]),
      mount
    );

    expect(mount.textContent).toContain('Workspace summary');
    expect(mount.textContent).toContain('#7');
  });
});
