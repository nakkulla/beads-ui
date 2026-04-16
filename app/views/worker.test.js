import { describe, expect, test, vi } from 'vitest';
import { createStore } from '../state.js';
import { createWorkerView } from './worker.js';

function createIssueStores(snapshot) {
  return {
    snapshotFor(client_id) {
      if (client_id === 'tab:worker:all') {
        return snapshot;
      }
      return [];
    },
    subscribe() {
      return () => {};
    }
  };
}

describe('views/worker', () => {
  test('renders toolbar, parent row badges/actions, and toggles closed children', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const onRunRalph = vi.fn();
    const onRunPrReview = vi.fn();
    const store = createStore({
      view: 'worker',
      worker: { selected_parent_id: 'UI-62lm' },
      workspace: {
        current: {
          path: '/tmp/workspace',
          database: '/tmp/workspace/.beads/test.db'
        }
      }
    });

    createWorkerView(mount, {
      store,
      issue_stores: createIssueStores([
        {
          id: 'UI-62lm',
          title: 'Worker 탭 추가',
          status: 'resolved',
          priority: 1,
          issue_type: 'feature',
          spec_id: 'docs/spec.md',
          updated_at: '2026-04-16T09:20:04Z',
          open_pr_count: 1
        },
        {
          id: 'UI-62lm.1',
          parent: 'UI-62lm',
          title: 'open child',
          status: 'open',
          priority: 2,
          issue_type: 'task'
        },
        {
          id: 'UI-62lm.2',
          parent: 'UI-62lm',
          title: 'closed child',
          status: 'closed',
          priority: 2,
          issue_type: 'task'
        }
      ]),
      onRunRalph,
      onRunPrReview
    });

    expect(
      mount.querySelector('input[type="search"][name="worker-search"]')
    ).not.toBeNull();
    expect(
      mount.querySelector('select[name="worker-status-filter"]')
    ).not.toBeNull();
    expect(
      mount.querySelector('input[name="worker-runnable-only"]')
    ).not.toBeNull();
    expect(
      mount.querySelector('input[name="worker-open-pr-only"]')
    ).not.toBeNull();
    expect(mount.textContent).toContain('Run bd-ralph-v2');
    expect(mount.textContent).toContain('Run pr-review');
    expect(mount.querySelector('progress')).not.toBeNull();
    expect(mount.textContent).toContain('Has spec');
    expect(mount.textContent).toContain('Open PR');

    const expand = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-expand-parent="UI-62lm"]')
    );
    expand.click();
    await Promise.resolve();

    expect(mount.textContent).toContain('open child');
    expect(mount.textContent).not.toContain('closed child');

    const show_closed = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-show-closed="UI-62lm"]')
    );
    show_closed.click();
    await Promise.resolve();

    expect(mount.textContent).toContain('closed child');

    const ralph_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-run-ralph="UI-62lm"]')
    );
    const pr_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-run-pr-review="UI-62lm"]')
    );
    expect(ralph_button.disabled).toBe(false);
    expect(pr_button.disabled).toBe(false);

    ralph_button.click();
    pr_button.click();

    expect(onRunRalph).toHaveBeenCalledWith('UI-62lm');
    expect(onRunPrReview).toHaveBeenCalledWith('UI-62lm');
  });

  test('disables action buttons when selector predicates fail', () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = createStore({
      view: 'worker',
      workspace: {
        current: null
      }
    });

    createWorkerView(mount, {
      store,
      issue_stores: createIssueStores([
        {
          id: 'UI-off',
          title: 'Not runnable',
          status: 'closed',
          priority: 1,
          issue_type: 'feature',
          total_children: 1
        }
      ])
    });

    const ralph_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-run-ralph="UI-off"]')
    );
    const pr_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-run-pr-review="UI-off"]')
    );

    expect(ralph_button.disabled).toBe(true);
    expect(pr_button.disabled).toBe(true);
  });
});
