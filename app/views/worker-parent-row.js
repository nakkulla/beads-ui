import { html } from 'lit-html';
import { statusLabel } from '../utils/status.js';

/**
 * @param {any} row
 * @param {{
 *   expanded: boolean,
 *   selected: boolean,
 *   pr_review_enabled: boolean,
 *   onSelect: () => void,
 *   onToggleExpand: () => void,
 *   onRunRalph: () => void,
 *   onRunPrReview: () => void
 * }} handlers
 */
export function workerParentRowTemplate(row, handlers) {
  return html`
    <div
      class="worker-parent-row ${handlers.selected ? 'is-selected' : ''}"
      data-worker-parent=${row.id}
    >
      <div class="worker-parent-row__header">
        <button
          type="button"
          class="worker-parent-row__expand"
          data-expand-parent=${row.id}
          @click=${handlers.onToggleExpand}
          aria-expanded=${handlers.expanded}
        >
          ${handlers.expanded ? '▾' : '▸'}
        </button>

        <button
          type="button"
          class="worker-parent-row__summary"
          @click=${handlers.onSelect}
        >
          <span class="worker-parent-row__id mono">${row.id}</span>
          <span class="worker-parent-row__title">${row.title || '(no title)'}</span>
        </button>
      </div>

      <div class="worker-parent-row__meta">
        <span class="worker-badge worker-badge--type"
          >${row.issue_type || 'issue'}</span
        >
        <span class="worker-badge worker-badge--status"
          >${statusLabel(row.status)}</span
        >
        ${row.spec_id
          ? html`<span class="worker-badge">Has spec</span>`
          : html`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${row.has_open_pr
          ? html`<span class="worker-badge">Open PR</span>`
          : null}
        ${row.has_active_job
          ? html`<span class="worker-badge worker-badge--active"
              >Running</span
            >`
          : row.runnable
            ? html`<span class="worker-badge worker-badge--ready"
                >Runnable</span
              >`
            : null}
      </div>

      <div class="worker-parent-row__progress">
        <progress value=${row.progress_percent} max="100"></progress>
        <span class="mono">${row.progress_percent}%</span>
      </div>

      <div class="worker-parent-row__counts">
        ${row.child_counts.open > 0
          ? html`<span>${row.child_counts.open} open</span>`
          : null}
        ${row.child_counts.in_progress > 0
          ? html`<span>${row.child_counts.in_progress} in progress</span>`
          : null}
        ${row.child_counts.resolved > 0
          ? html`<span>${row.child_counts.resolved} resolved</span>`
          : null}
        ${row.child_counts.closed > 0
          ? html`<span>${row.child_counts.closed} closed</span>`
          : null}
      </div>

      <div class="worker-parent-row__actions">
        <button
          type="button"
          data-run-ralph=${row.id}
          ?disabled=${!row.runnable}
          @click=${handlers.onRunRalph}
        >
          Run bd-ralph-v2
        </button>
        <button
          type="button"
          data-run-pr-review=${row.id}
          ?disabled=${!handlers.pr_review_enabled}
          @click=${handlers.onRunPrReview}
        >
          Run pr-review
        </button>
      </div>
    </div>
  `;
}
