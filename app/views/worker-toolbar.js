import { html } from 'lit-html';

/**
 * @typedef {(input: string, init?: RequestInit) => Promise<{ json: () => Promise<any> }>} WorkerFetch
 */

/**
 * @param {{
 *   search: string,
 *   status: string,
 *   runnable_only: boolean,
 *   has_open_pr_only: boolean
 * }} filters
 * @param {{
 *   onSearchInput: (value: string) => void,
 *   onStatusChange: (value: string) => void,
 *   onRunnableToggle: (checked: boolean) => void,
 *   onOpenPrToggle: (checked: boolean) => void
 * }} handlers
 */
export function workerToolbarTemplate(filters, handlers) {
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
          <option value="resolved">Resolved</option>
        </select>
      </label>

      <label class="worker-toolbar__toggle">
        <input
          type="checkbox"
          name="worker-runnable-only"
          .checked=${filters.runnable_only}
          @change=${(/** @type {Event} */ event) =>
            handlers.onRunnableToggle(
              /** @type {HTMLInputElement} */ (event.currentTarget).checked
            )}
        />
        <span>Runnable only</span>
      </label>

      <label class="worker-toolbar__toggle">
        <input
          type="checkbox"
          name="worker-open-pr-only"
          .checked=${filters.has_open_pr_only}
          @change=${(/** @type {Event} */ event) =>
            handlers.onOpenPrToggle(
              /** @type {HTMLInputElement} */ (event.currentTarget).checked
            )}
        />
        <span>Has open PR only</span>
      </label>
    </section>
  `;
}
