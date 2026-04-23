import { html } from 'lit-html';
import { statusLabel } from '../utils/status.js';

const TYPE_MODIFIERS = new Set([
  'bug',
  'feature',
  'task',
  'epic',
  'chore',
  'decision'
]);

/**
 * @param {string | null | undefined} issue_type
 */
function typeModifier(issue_type) {
  const key = (issue_type || '').toString().toLowerCase();
  return TYPE_MODIFIERS.has(key) ? key : 'neutral';
}

/**
 * @param {string | null | undefined} status
 */
function statusModifier(status) {
  return (status || 'open').toString().toLowerCase().replace(/\s+/g, '_');
}

/**
 * @param {any} row
 * @param {{
 *   expanded: boolean,
 *   selected: boolean,
 *   pr_review_enabled: boolean,
 *   onSelect: () => void,
 *   onToggleExpand: () => void,
 *   onRunRalph: () => void,
 *   onRunPrReview: () => void,
 *   onCancelJob: (job_id: string) => void
 * }} handlers
 */
export function workerParentRowTemplate(row, handlers) {
  const current_job = row.current_job || null;
  const status_mod = statusModifier(row.status);
  const type_mod = typeModifier(row.issue_type);

  return html`
    <div
      class="worker-parent-row is-status-${status_mod} ${handlers.selected
        ? 'is-selected'
        : ''}"
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
          <span class="worker-parent-row__title"
            >${row.title || '(no title)'}</span
          >
        </button>
      </div>

      <div class="worker-parent-row__meta">
        <span class="worker-badge worker-badge--type is-type-${type_mod}"
          >${row.issue_type || 'issue'}</span
        >
        <span class="worker-badge worker-badge--status is-${status_mod}"
          >${statusLabel(row.status)}</span
        >
        ${row.spec_id
          ? html`<span class="worker-badge worker-badge--spec">✓ Spec</span>`
          : html`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${row.has_open_pr
          ? html`<span class="worker-badge worker-badge--pr">PR open</span>`
          : null}
        ${current_job
          ? html`
              <span class="worker-badge worker-badge--active"
                >● ${statusLabel(current_job.status || 'running')}</span
              >
              <span class="worker-badge worker-badge--elapsed mono"
                >${row.current_job_elapsed_label}</span
              >
            `
          : row.runnable
            ? html`<span class="worker-badge worker-badge--ready"
                >Runnable</span
              >`
            : null}
      </div>

      <div class="worker-parent-row__progress">
        <div class="worker-progress" data-pct=${row.progress_percent}>
          <div
            class="worker-progress__fill"
            style="width:${row.progress_percent}%"
          ></div>
        </div>
        <span class="worker-parent-row__progress-label mono"
          >${row.progress_percent}%</span
        >
      </div>

      <div class="worker-parent-row__counts">
        ${row.child_counts.open > 0
          ? html`<span class="worker-count worker-count--open"
              ><b>${row.child_counts.open}</b> open</span
            >`
          : null}
        ${row.child_counts.in_progress > 0
          ? html`<span class="worker-count worker-count--in-progress"
              ><b>${row.child_counts.in_progress}</b> in progress</span
            >`
          : null}
        ${row.child_counts.resolved > 0
          ? html`<span class="worker-count worker-count--resolved"
              ><b>${row.child_counts.resolved}</b> resolved</span
            >`
          : null}
        ${row.child_counts.closed > 0
          ? html`<span class="worker-count worker-count--closed"
              ><b>${row.child_counts.closed}</b> closed</span
            >`
          : null}
      </div>

      <div class="worker-parent-row__actions">
        <button
          type="button"
          class="worker-btn worker-btn--primary"
          data-run-ralph=${row.id}
          ?disabled=${!row.runnable}
          @click=${handlers.onRunRalph}
        >
          ▶ Run bd-ralph
        </button>
        <button
          type="button"
          class="worker-btn worker-btn--secondary"
          data-run-pr-review=${row.id}
          ?disabled=${!handlers.pr_review_enabled}
          @click=${handlers.onRunPrReview}
        >
          Run pr-review
        </button>
        ${current_job?.isCancellable
          ? html`
              <button
                type="button"
                class="worker-btn worker-btn--danger"
                data-cancel-job=${current_job.id}
                @click=${() => handlers.onCancelJob(current_job.id)}
              >
                Cancel
              </button>
            `
          : null}
      </div>
    </div>
  `;
}
