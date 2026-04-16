import { html, render } from 'lit-html';
import {
  buildWorkerParents,
  filterWorkerParents
} from '../data/worker-selectors.js';
import { createWorkerDetailView } from './worker-detail.js';
import { workerToolbarTemplate } from './worker-toolbar.js';
import { workerTreeTemplate } from './worker-tree.js';

/**
 * @typedef {(input: string, init?: RequestInit) => Promise<{ json: () => Promise<any> }>} WorkerFetch
 */

/**
 * @param {HTMLElement} mount_element
 * @param {{
 *   store: { getState: () => any, setState: (patch: any) => void, subscribe: (fn: (s: any) => void) => () => void },
 *   issue_stores: { snapshotFor: (client_id: string) => any[], subscribe?: (fn: () => void) => () => void },
 *   fetch_impl?: WorkerFetch,
 *   getWorkerJobs?: () => any[],
 *   onRunRalph?: (id: string) => void,
 *   onRunPrReview?: (target: any) => void
 * }} deps
 */
export function createWorkerView(mount_element, deps) {
  const expanded_ids = new Set();
  /** @type {ReturnType<typeof createWorkerDetailView> | null} */
  let detail_view = null;
  let filters = {
    search: '',
    status: 'all',
    runnable_only: false,
    has_open_pr_only: false
  };

  /**
   * @param {string} parent_id
   */
  function toggleClosedParent(parent_id) {
    const state = deps.store.getState();
    const current = Array.isArray(state.worker?.show_closed_children)
      ? state.worker.show_closed_children
      : [];
    const next = current.includes(parent_id)
      ? current.filter((/** @type {string} */ id) => id !== parent_id)
      : [...current, parent_id];
    deps.store.setState({
      worker: {
        show_closed_children: next
      }
    });
  }

  function renderView() {
    const state = deps.store.getState();
    const workspace_is_valid = !!state.workspace?.current;
    const jobs =
      typeof deps.getWorkerJobs === 'function' ? deps.getWorkerJobs() : [];
    const selected_parent_id = state.worker?.selected_parent_id || null;
    const rows = filterWorkerParents(
      buildWorkerParents(deps.issue_stores.snapshotFor('tab:worker:all'), {
        jobs,
        workspace_is_valid,
        show_closed_children: state.worker?.show_closed_children || []
      }),
      filters
    );
    const selected =
      rows.find((row) => row.id === selected_parent_id) || rows[0] || null;

    render(
      html`
        <section class="worker-layout">
          <aside class="worker-layout__left">
            ${workerToolbarTemplate(filters, {
              onSearchInput(value) {
                filters = { ...filters, search: value };
                renderView();
              },
              onStatusChange(value) {
                filters = { ...filters, status: value };
                renderView();
              },
              onRunnableToggle(checked) {
                filters = { ...filters, runnable_only: checked };
                renderView();
              },
              onOpenPrToggle(checked) {
                filters = { ...filters, has_open_pr_only: checked };
                renderView();
              }
            })}
            ${workerTreeTemplate(rows, {
              expanded_ids,
              selected_parent_id,
              onSelectParent(id) {
                deps.store.setState({
                  worker: { selected_parent_id: id }
                });
              },
              onToggleExpand(id) {
                if (expanded_ids.has(id)) {
                  expanded_ids.delete(id);
                } else {
                  expanded_ids.add(id);
                }
                renderView();
              },
              onToggleClosed(id) {
                toggleClosedParent(id);
                renderView();
              },
              onRunRalph(id) {
                deps.onRunRalph?.(id);
              },
              onRunPrReview(id) {
                deps.onRunPrReview?.(id);
              }
            })}
          </aside>

          <section
            class="worker-layout__right"
            id="worker-detail-mount"
          ></section>
        </section>
      `,
      mount_element
    );

    const detail_mount = /** @type {HTMLElement | null} */ (
      mount_element.querySelector('#worker-detail-mount')
    );
    if (detail_mount) {
      if (!detail_view) {
        detail_view = createWorkerDetailView(detail_mount, {
          fetch_impl: deps.fetch_impl,
          onRunRalph: deps.onRunRalph,
          onRunPrReview: deps.onRunPrReview
        });
      }
      void detail_view.load(
        selected,
        state.workspace?.current?.path || '',
        jobs
      );
    }
  }

  const unsub_store = deps.store.subscribe(() => renderView());
  const unsub_issue_stores =
    typeof deps.issue_stores.subscribe === 'function'
      ? deps.issue_stores.subscribe(() => renderView())
      : () => {};

  renderView();

  return {
    load() {
      renderView();
    },
    clear() {
      detail_view?.clear();
      render(html``, mount_element);
    },
    destroy() {
      unsub_store();
      unsub_issue_stores();
      detail_view?.clear();
      render(html``, mount_element);
    }
  };
}
