import { html } from 'lit-html';

/**
 * @typedef {{ search: string, status: string }} WorkerToolbarFilters
 * @typedef {{ paused?: boolean, countdown?: { remainingMs?: number, nextIssueId?: string } | null, done_filter?: 'today'|'3'|'7', default_model?: string, default_effort?: 'low'|'medium'|'high' }} WorkerToolbarState
 */

/**
 * @param {WorkerToolbarFilters} filters
 * @param {WorkerToolbarState | undefined} worker_state
 * @param {{
 *   onSearchInput: (value: string) => void,
 *   onStatusChange: (value: string) => void,
 *   onDoneFilterChange: (value: 'today'|'3'|'7') => void,
 *   onDefaultModelChange: (value: string) => void,
 *   onDefaultEffortChange: (value: 'low'|'medium'|'high') => void,
 *   onPauseToggle: (paused: boolean) => void,
 *   onSkipAdvance: () => void,
 *   onCancelAutoStart: () => void
 * }} handlers
 */
export function workerToolbarTemplate(filters, worker_state, handlers) {
  const state = worker_state || {};
  const done_filter = state.done_filter || 'today';
  const default_model = state.default_model || '';
  const default_effort = state.default_effort || 'high';
  const countdown = state.countdown || null;
  const next_issue_id = countdown?.nextIssueId || '';

  return html`
    <section class="worker-toolbar">
      <label class="worker-toolbar__field">
        <span>Search</span>
        <input
          type="search"
          name="worker-search"
          .value=${filters.search}
          @input=${(/** @type {Event} */ event) =>
            handlers.onSearchInput(
              /** @type {HTMLInputElement} */ (event.currentTarget).value
            )}
        />
      </label>

      <label class="worker-toolbar__field">
        <span>Status</span>
        <select
          name="worker-status-filter"
          .value=${filters.status}
          @change=${(/** @type {Event} */ event) =>
            handlers.onStatusChange(
              /** @type {HTMLSelectElement} */ (event.currentTarget).value
            )}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="resolved_closed">Resolved/closed</option>
        </select>
      </label>

      <label class="worker-toolbar__field">
        <span>Done</span>
        <select
          name="worker-done-filter"
          .value=${done_filter}
          @change=${(/** @type {Event} */ event) =>
            handlers.onDoneFilterChange(
              /** @type {'today'|'3'|'7'} */ (
                /** @type {HTMLSelectElement} */ (event.currentTarget).value
              )
            )}
        >
          <option value="today">Today</option>
          <option value="3">3 days</option>
          <option value="7">7 days</option>
        </select>
      </label>

      <label class="worker-toolbar__field">
        <span>Model</span>
        <input
          type="text"
          name="worker-default-model"
          .value=${default_model}
          @change=${(/** @type {Event} */ event) =>
            handlers.onDefaultModelChange(
              /** @type {HTMLInputElement} */ (event.currentTarget).value.trim()
            )}
        />
      </label>

      <label class="worker-toolbar__field">
        <span>Effort</span>
        <select
          name="worker-default-effort"
          .value=${default_effort}
          @change=${(/** @type {Event} */ event) =>
            handlers.onDefaultEffortChange(
              /** @type {'low'|'medium'|'high'} */ (
                /** @type {HTMLSelectElement} */ (event.currentTarget).value
              )
            )}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <div class="worker-toolbar__actions">
        <button
          type="button"
          class="worker-btn worker-btn--secondary"
          data-worker-pause-toggle
          @click=${() => handlers.onPauseToggle(!state.paused)}
        >
          ${state.paused ? 'Resume queue' : 'Pause queue'}
        </button>
        ${countdown
          ? html`
              <button
                type="button"
                class="worker-btn worker-btn--primary"
                data-worker-skip-advance
                title=${next_issue_id ? `Next: ${next_issue_id}` : ''}
                @click=${handlers.onSkipAdvance}
              >
                Skip wait
              </button>
              <button
                type="button"
                class="worker-btn worker-btn--secondary"
                data-worker-cancel-auto-start
                @click=${handlers.onCancelAutoStart}
              >
                Cancel auto-start
              </button>
            `
          : null}
      </div>
    </section>
  `;
}
