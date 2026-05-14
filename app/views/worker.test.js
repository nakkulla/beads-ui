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
  test('renders four worker board lanes and selects a card', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = createStore({
      view: 'worker',
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
          id: 'UI-A',
          title: 'Inbox',
          status: 'open',
          issue_type: 'epic',
          spec_id: 'docs/a.md',
          metadata: {}
        },
        {
          id: 'UI-B',
          title: 'Waiting',
          status: 'open',
          issue_type: 'epic',
          spec_id: 'docs/b.md',
          metadata: { worker_lane: 'waiting', worker_queue_sort_key: '1000' }
        }
      ]),
      fetch_impl: vi.fn(async () => ({ ok: true, json: async () => ({}) })),
      getWorkerJobs: () => []
    });

    expect(mount.querySelector('#worker-lane-inbox')).not.toBeNull();
    expect(mount.querySelector('#worker-lane-waiting')).not.toBeNull();
    expect(mount.querySelector('#worker-lane-progress')).not.toBeNull();
    expect(mount.querySelector('#worker-lane-done')).not.toBeNull();

    /** @type {HTMLElement} */ (
      mount.querySelector('[data-worker-card="UI-A"]')
    ).click();
    await Promise.resolve();

    expect(store.getState().worker.selected_parent_id).toBe('UI-A');
  });

  test('blocks spec-less drop into waiting and shows toast handler', () => {
    const onMoveCard = vi.fn();
    const onShowToast = vi.fn();
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = createStore({ view: 'worker' });

    createWorkerView(mount, {
      store,
      issue_stores: createIssueStores([
        {
          id: 'UI-A',
          title: 'No spec',
          status: 'open',
          issue_type: 'epic',
          spec_id: '',
          metadata: {}
        }
      ]),
      getWorkerJobs: () => [],
      onMoveCard,
      onShowToast
    });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('[data-worker-card="UI-A"]')
    );
    const lane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-lane-waiting')
    );
    const drag_event = new Event('dragstart', { bubbles: true });
    Object.defineProperty(drag_event, 'dataTransfer', {
      value: { setData: vi.fn(), getData: () => 'UI-A' }
    });
    card.dispatchEvent(drag_event);
    const drop_event = new Event('drop', { bubbles: true });
    Object.defineProperty(drop_event, 'dataTransfer', {
      value: { getData: () => 'UI-A' }
    });
    lane.dispatchEvent(drop_event);

    expect(onMoveCard).not.toHaveBeenCalled();
    expect(onShowToast).toHaveBeenCalledWith('Spec required to enter queue');
  });

  test('defines route-shell and pane-body scroll contract for worker', () => {
    const stylesheet = readFileSync(
      join(import.meta.dirname, '../styles.css'),
      'utf8'
    );

    expect(stylesheet).toContain('#worker-root.route.worker');
    expect(stylesheet).toContain('#worker-root > .worker-layout');
    expect(stylesheet).toContain('.worker-layout__left');
    expect(stylesheet).toContain('.worker-board');
    expect(stylesheet).toContain('.worker-board__lane');
    expect(stylesheet).toContain('.worker-card');
    expect(stylesheet).toContain('@keyframes worker-blink');
    expect(stylesheet).toContain('#worker-detail-mount');
    expect(stylesheet).toContain('.worker-detail');
    expect(stylesheet).toContain('min-height: 0;');
    expect(stylesheet).not.toContain('.worker-tree');
  });
});
