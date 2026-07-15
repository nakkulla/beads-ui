/**
 * Lane + mini-row templates for the Worker console (spec §5.1).
 *
 * Four lanes: candidates (Board Ready/Blocked, dashed `.pane.src`), Serial
 * queue, Parallel pool, and Done. Styling mirrors `worker-final.html`
 * (`.pane`/`.mini`/`⠿` grip) via the `worker-*` class namespace.
 */
import { html } from 'lit-html';

/**
 * @typedef {Object} MiniItem
 * @property {string} id - Bead id.
 * @property {string} title - Bead title (falls back to id).
 * @property {string} [reason] - Candidate reason chip (spec 없음 / 🔒 target).
 * @property {boolean} draggable - Whether this row can be dragged.
 * @property {'candidate'|'serial'|'parallel'|'done'} lane - Owning lane.
 * @property {boolean} [done] - Rendered dimmed with no grip.
 */

/**
 * One `.mini` row.
 *
 * @param {MiniItem} item
 * @returns {import('lit-html').TemplateResult}
 */
export function miniRow(item) {
  const draggable = item.draggable && !item.done;
  return html`<div
    class="worker-mini${draggable ? '' : ' worker-mini--static'}${item.done
      ? ' worker-mini--done'
      : ''}"
    draggable=${draggable ? 'true' : 'false'}
    data-bead-id=${item.id}
    data-lane=${item.lane}
  >
    ${draggable
      ? html`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`
      : ''}
    <span class="worker-mini__id">${item.id}</span>
    <span class="worker-mini__title">${item.title}</span>
    ${item.reason
      ? html`<span class="worker-mini__reason">${item.reason}</span>`
      : ''}
  </div>`;
}

/**
 * One lane pane.
 *
 * @param {{ id: string, lane: 'candidate'|'serial'|'parallel'|'done', title: string, items: MiniItem[], src?: boolean, empty?: string }} pane
 * @returns {import('lit-html').TemplateResult}
 */
export function paneTemplate(pane) {
  return html`<section
    class="worker-pane${pane.src ? ' worker-pane--src' : ''}"
    id=${pane.id}
    data-lane=${pane.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${pane.title}</span>
      <span class="worker-pane__count">${pane.items.length}</span>
    </header>
    <div class="worker-pane__body">
      ${pane.items.length === 0
        ? html`<div class="worker-pane__empty">${pane.empty || ''}</div>`
        : pane.items.map((it) => miniRow(it))}
    </div>
  </section>`;
}
