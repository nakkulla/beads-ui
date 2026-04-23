import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test, vi } from 'vitest';
import { createStore } from '../state.js';
import { createWorkerView } from './worker.js';

/**
 * @param {any[]} snapshot
 */
function createIssueStores(snapshot) {
  return {
    /**
     * @param {string} client_id
     */
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
  test('shows right detail panel only when a parent is selected', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = createStore({
      view: 'worker',
      worker: {
        selected_parent_id: null,
        show_closed_children: []
      },
      workspace: {
        current: {
          path: '/tmp/workspace',
          database: '/tmp/workspace/.beads/test.db'
        },
        available: []
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
        }
      ]),
      getWorkerJobs: () => []
    });

    expect(mount.querySelector('#worker-detail-mount')).toBeNull();
    expect(mount.querySelector('.worker-layout--overview')).not.toBeNull();

    const summary_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-parent-row__summary')
    );
    summary_button.click();
    await Promise.resolve();

    expect(mount.querySelector('#worker-detail-mount')).not.toBeNull();
    expect(mount.querySelector('.worker-layout--with-detail')).not.toBeNull();
  });

  test('renders active job chip/elapsed and fires cancel action from parent row', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const onRunRalph = vi.fn();
    const onRunPrReview = vi.fn();
    const onCancelJob = vi.fn();
    const store = createStore({
      view: 'worker',
      worker: {
        selected_parent_id: 'UI-62lm',
        show_closed_children: []
      },
      workspace: {
        current: {
          path: '/tmp/workspace',
          database: '/tmp/workspace/.beads/test.db'
        },
        available: []
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
        }
      ]),
      getWorkerJobs: () => [
        {
          id: 'job-2',
          issueId: 'UI-62lm',
          status: 'running',
          elapsedMs: 65000,
          isCancellable: true,
          workspace: '/tmp/workspace'
        },
        {
          id: 'job-1',
          issueId: 'UI-62lm',
          status: 'failed',
          elapsedMs: 5000,
          errorSummary: 'boom',
          workspace: '/tmp/workspace'
        }
      ],
      onRunRalph,
      onRunPrReview,
      onCancelJob,
      fetch_impl: vi.fn(async () => ({
        ok: true,
        json: async () => ({ items: [] })
      }))
    });

    expect(mount.textContent).toContain('Running');
    expect(mount.textContent).toContain('1m 5s');

    const ralph_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-run-ralph="UI-62lm"]')
    );
    expect(ralph_button.disabled).toBe(true);

    const cancel_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-cancel-job="job-2"]')
    );
    cancel_button.click();

    expect(onCancelJob).toHaveBeenCalledWith('job-2');
    expect(onRunRalph).not.toHaveBeenCalled();
    expect(onRunPrReview).not.toHaveBeenCalled();
  });

  test('defines route-shell and pane-body scroll contract for worker', () => {
    const stylesheet = readFileSync(
      join(import.meta.dirname, '../styles.css'),
      'utf8'
    );

    expect(stylesheet).toContain('#worker-root.route.worker');
    expect(stylesheet).toContain('#worker-root > .worker-layout');
    expect(stylesheet).toContain('.worker-layout__left');
    expect(stylesheet).toContain('.worker-tree');
    expect(stylesheet).toContain('#worker-detail-mount');
    expect(stylesheet).toContain('.worker-detail');
    expect(stylesheet).toContain('min-height: 0;');
  });
});
