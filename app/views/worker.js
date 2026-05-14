import { html, render } from 'lit-html';
import { buildWorkerBoard } from '../data/worker-board-selectors.js';
import {
  buildWorkerParents,
  filterWorkerParents
} from '../data/worker-selectors.js';
import { workerBoardTemplate } from './worker-board.js';
import { createWorkerDetailView } from './worker-detail.js';
import { workerToolbarTemplate } from './worker-toolbar.js';

/**
 * @typedef {(input: string, init?: RequestInit) => Promise<{ json: () => Promise<any> }>} WorkerFetch
 * @typedef {{ search: string, status: string }} WorkerFilters
 */

/**
 * @param {ReturnType<typeof buildWorkerParents>} parents
 * @param {WorkerFilters} filters
 */
function filterBoardParents(parents, filters) {
  if (filters.status === 'resolved_closed') {
    return filterWorkerParents(parents, { ...filters, status: 'all' }).filter(
      (parent) => parent.status === 'resolved' || parent.status === 'closed'
    );
  }
  return filterWorkerParents(parents, filters);
}

/**
 * @param {Record<string, any[]>} board
 * @param {string | null} selected_parent_id
 * @returns {any | null}
 */
function findSelectedCard(board, selected_parent_id) {
  if (!selected_parent_id) {
    return null;
  }
  return (
    Object.values(board)
      .flat()
      .find((card) => card.id === selected_parent_id) || null
  );
}

/**
 * @param {HTMLElement} mount_element
 * @param {{
 *   store: { getState: () => any, setState: (patch: any) => void, subscribe: (fn: (s: any) => void) => () => void },
 *   issue_stores: { snapshotFor: (client_id: string) => any[], subscribe?: (fn: () => void) => () => void },
 *   fetch_impl?: WorkerFetch,
 *   getWorkerJobs?: () => any[],
 *   onMoveCard?: (input: { issueId: string, fromLane: string, toLane: string, beforeId?: string | null, afterId?: string | null }) => void,
 *   onStartGoal?: (issue_id: string) => void,
 *   onFinishNow?: (issue_id: string) => void,
 *   onCancelAutoPrFinish?: (issue_id: string) => void,
 *   onRunPrFinish?: (issue_id: string) => void,
 *   onSkipAdvance?: () => void,
 *   onCancelAutoStart?: () => void,
 *   onPauseToggle?: (paused: boolean) => void,
 *   onUpdateWorkerMetadata?: (issue_id: string, values: { worker_parallel?: string, worker_model?: string, worker_effort?: string }) => void,
 *   onDefaultModelChange?: (model: string) => void,
 *   onDefaultEffortChange?: (effort: string) => void,
 *   onShowToast?: (message: string) => void,
 *   onRunRalph?: (id: string) => void,
 *   onRunPrReview?: (target: any) => void,
 *   onCancelJob?: (job_id: string) => void
 * }} deps
 */
export function createWorkerView(mount_element, deps) {
  /** @type {ReturnType<typeof createWorkerDetailView> | null} */
  let detail_view = null;
  /** @type {WorkerFilters} */
  let filters = {
    search: '',
    status: 'all'
  };

  function renderView() {
    const state = deps.store.getState();
    const workspace_is_valid = !!state.workspace?.current;
    const jobs =
      typeof deps.getWorkerJobs === 'function' ? deps.getWorkerJobs() : [];
    const worker_state = state.worker || {};
    const selected_parent_id = worker_state.selected_parent_id || null;
    const parents = buildWorkerParents(
      deps.issue_stores.snapshotFor('tab:worker:all'),
      {
        jobs,
        workspace_is_valid,
        show_closed_children: worker_state.show_closed_children || []
      }
    );
    const rows = filterBoardParents(parents, filters);
    const board = buildWorkerBoard(rows, {
      jobs,
      done_filter: worker_state.done_filter || 'today',
      now: new Date()
    });
    const selected = findSelectedCard(board, selected_parent_id);

    render(
      html`
        <section
          class="worker-layout ${selected
            ? 'worker-layout--with-detail'
            : 'worker-layout--overview'}"
        >
          <aside class="worker-layout__left">
            ${workerToolbarTemplate(filters, worker_state, {
              onSearchInput(value) {
                filters = { ...filters, search: value };
                renderView();
              },
              onStatusChange(value) {
                filters = { ...filters, status: value };
                renderView();
              },
              onDoneFilterChange(value) {
                deps.store.setState({ worker: { done_filter: value } });
              },
              onDefaultModelChange(value) {
                deps.onDefaultModelChange?.(value);
              },
              onDefaultEffortChange(value) {
                deps.onDefaultEffortChange?.(value);
              },
              onPauseToggle(paused) {
                deps.onPauseToggle?.(paused);
              },
              onSkipAdvance() {
                deps.onSkipAdvance?.();
              },
              onCancelAutoStart() {
                deps.onCancelAutoStart?.();
              }
            })}
            ${workerBoardTemplate(board, state, {
              selected_parent_id,
              onSelectCard(id) {
                const next_selected_parent_id =
                  selected_parent_id === id ? null : id;
                deps.store.setState({
                  worker: { selected_parent_id: next_selected_parent_id }
                });
              },
              onMoveCard(input) {
                deps.onMoveCard?.(input);
              },
              onShowToast(message) {
                deps.onShowToast?.(message);
              },
              onCancelJob(job_id) {
                deps.onCancelJob?.(job_id);
              },
              onFinishNow(issue_id) {
                deps.onFinishNow?.(issue_id);
              },
              onCancelAutoPrFinish(issue_id) {
                deps.onCancelAutoPrFinish?.(issue_id);
              },
              onRunPrFinish(issue_id) {
                deps.onRunPrFinish?.(issue_id);
              }
            })}
          </aside>

          ${selected
            ? html`<section
                class="worker-layout__right"
                id="worker-detail-mount"
              ></section>`
            : null}
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
          onCancelJob: deps.onCancelJob,
          onUpdateWorkerMetadata: deps.onUpdateWorkerMetadata
        });
      }
      void detail_view.load(
        selected,
        state.workspace?.current?.path || '',
        jobs
      );
    } else {
      detail_view?.clear();
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
