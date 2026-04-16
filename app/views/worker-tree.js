import { html } from 'lit-html';
import { workerChildRowTemplate } from './worker-child-row.js';
import { workerParentRowTemplate } from './worker-parent-row.js';

/**
 * @param {any[]} rows
 * @param {{
 *   expanded_ids: Set<string>,
 *   selected_parent_id: string | null,
 *   onSelectParent: (id: string) => void,
 *   onToggleExpand: (id: string) => void,
 *   onToggleClosed: (id: string) => void,
 *   onRunRalph: (id: string) => void,
 *   onRunPrReview: (id: string) => void,
 *   onCancelJob: (job_id: string) => void
 * }} handlers
 */
export function workerTreeTemplate(rows, handlers) {
  if (rows.length === 0) {
    return html`<div class="worker-empty">No worker parents found.</div>`;
  }

  return html`
    <div class="worker-tree">
      ${rows.map((row) => {
        const expanded = handlers.expanded_ids.has(row.id);
        const pr_review_enabled =
          row.open_pr_count === 1 && !row.has_active_job && row.status !== 'closed';
        return html`
          <article class="worker-tree__item">
            ${workerParentRowTemplate(row, {
              expanded,
              selected: handlers.selected_parent_id === row.id,
              pr_review_enabled,
              onSelect: () => handlers.onSelectParent(row.id),
              onToggleExpand: () => handlers.onToggleExpand(row.id),
              onRunRalph: () => handlers.onRunRalph(row.id),
              onRunPrReview: () => handlers.onRunPrReview(row.id),
              onCancelJob: handlers.onCancelJob
            })}
            ${expanded
              ? html`
                  <div class="worker-tree__children">
                    ${row.visible_children.map((/** @type {any} */ child) =>
                      workerChildRowTemplate(child)
                    )}
                    ${row.hidden_closed_count > 0
                      ? html`
                          <button
                            type="button"
                            class="worker-tree__show-closed"
                            data-show-closed=${row.id}
                            @click=${() => handlers.onToggleClosed(row.id)}
                          >
                            Show closed (${row.hidden_closed_count})
                          </button>
                        `
                      : null}
                  </div>
                `
              : null}
          </article>
        `;
      })}
    </div>
  `;
}
