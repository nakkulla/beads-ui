import { render } from 'lit-html';
import { describe, expect, test } from 'vitest';
import { workerPrPanelTemplate } from './worker-pr-panel.js';

describe('views/worker-pr-panel', () => {
  test('renders selected parent PR list with action buttons', () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    render(
      workerPrPanelTemplate(
        [
          { number: 42, title: 'Add Worker tab', state: 'OPEN' },
          { number: 43, title: 'Polish Worker tab', state: 'OPEN' }
        ],
        {
          onRunPrReview() {}
        }
      ),
      mount
    );

    expect(mount.textContent).toContain('Add Worker tab');
    expect(mount.textContent).toContain('Polish Worker tab');
    expect(
      mount.querySelectorAll('[data-run-pr-review-number]').length
    ).toBe(2);
  });

  test('renders empty state when there are no PRs', () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    render(
      workerPrPanelTemplate([], {
        onRunPrReview() {}
      }),
      mount
    );

    expect(mount.textContent).toContain('No open PRs');
  });
});
