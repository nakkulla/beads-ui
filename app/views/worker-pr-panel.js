import { html } from 'lit-html';

/**
 * @param {Array<{ number: number, title: string, state?: string }>} items
 * @param {{ onRunPrReview: (item: { number: number, title: string, state?: string }) => void }} handlers
 */
export function workerPrPanelTemplate(items, handlers) {
  if (items.length === 0) {
    return html`<section class="worker-pr-panel">No open PRs</section>`;
  }

  return html`
    <section class="worker-pr-panel">
      ${items.map(
        (item) => html`
          <div class="worker-pr-panel__item">
            <span class="mono">#${item.number}</span>
            <span>${item.title}</span>
            <button
              type="button"
              data-run-pr-review-number=${item.number}
              @click=${() => handlers.onRunPrReview(item)}
            >
              Run pr-review
            </button>
          </div>
        `
      )}
    </section>
  `;
}
