import { html, render } from 'lit-html';
import {
  buildWorkerParents,
  filterWorkerParents
} from '../data/worker-selectors.js';
import { workerToolbarTemplate } from './worker-toolbar.js';
import { workerTreeTemplate } from './worker-tree.js';

/**
 * @param {HTMLElement} mount_element
 * @param {{
 *   store: { getState: () => any, setState: (patch: any) => void, subscribe: (fn: (s: any) => void) => () => void },
 *   issue_stores: { snapshotFor: (client_id: string) => any[], subscribe?: (fn: () => void) => () => void },
 *   onRunRalph?: (id: string) => void,
 *   onRunPrReview?: (id: string) => void
 * }} deps
 */
export function createWorkerView(mount_element, deps) {
  const expanded_ids = new Set();
  let filters = {
    search: '',
    status: 'all',
    runnable_only: false,
    has_open_pr_only: false
  };

  function toggleClosedParent(parent_id) {
    const state = deps.store.getState();
    const current = Array.isArray(state.worker?.show_closed_children)
      ? state.worker.show_closed_children
      : [];
    const next = current.includes(parent_id)
      ? current.filter((id) => id !== parent_id)
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
    const selected_parent_id = state.worker?.selected_parent_id || null;
    const rows = filterWorkerParents(
      buildWorkerParents(deps.issue_stores.snapshotFor('tab:worker:all'), {
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

          <section class="worker-layout__right">
            ${selected
              ? html`
                  <div class="worker-detail-placeholder">
                    <h2>${selected.id}</h2>
                    <p>${selected.title || '(no title)'}</p>
                  </div>
                `
              : html`
                  <div class="worker-detail-placeholder">
                    <h2>No parent selected</h2>
                    <p>Select a worker parent to inspect details.</p>
                  </div>
                `}
          </section>
        </section>
      `,
      mount_element
    );
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
      render(html``, mount_element);
    },
    destroy() {
      unsub_store();
      unsub_issue_stores();
      render(html``, mount_element);
    }
  };
}
