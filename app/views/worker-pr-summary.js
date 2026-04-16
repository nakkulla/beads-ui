import { html } from 'lit-html';

/**
 * @param {Array<{ number: number, title: string, state?: string }>} items
 */
export function workerPrSummaryTemplate(items) {
  return html`
    <section class="worker-pr-summary">
      ${items.length === 0
        ? html`<div>No workspace PRs</div>`
        : items.map(
            (item) => html`
              <div class="worker-pr-summary__item">
                <span class="mono">#${item.number}</span>
                <span>${item.title}</span>
              </div>
            `
          )}
    </section>
  `;
}
