import { render } from 'lit-html';
import { describe, expect, test, vi } from 'vitest';
import { workerCardProgressTemplate } from './worker-card-progress.js';

describe('worker-card-progress', () => {
  test('renders manual pr-finish action for cancelled review wait snapshots', () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const onRunPrFinish = vi.fn();
    const onCancelReviewWait = vi.fn();

    render(
      workerCardProgressTemplate(
        { id: 'UI-A', sub_state: 'pr_review_wait', metadata: {} },
        {
          worker: {
            pr_review_waits: {
              'UI-A': { issueId: 'UI-A', cancelled: true, remainingMs: 120000 }
            }
          }
        },
        { onRunPrFinish, onCancelReviewWait }
      ),
      mount
    );

    expect(mount.textContent).toContain('Review wait cancelled');

    const buttons = Array.from(mount.querySelectorAll('button'));

    buttons[0].click();
    buttons[1].click();

    expect(onRunPrFinish).toHaveBeenCalledWith('UI-A');
    expect(onCancelReviewWait).toHaveBeenCalledWith('UI-A');
  });
});
