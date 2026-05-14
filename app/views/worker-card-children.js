import { html } from 'lit-html';

/** @type {Record<string, string>} */
const STATUS_ICONS = {
  open: '▢',
  in_progress: '▶',
  resolved: '✓',
  closed: '✓'
};

/**
 * @param {string | undefined} status
 * @returns {string}
 */
function statusIcon(status) {
  const key = String(status || 'open');
  return STATUS_ICONS[key] || '▢';
}

/**
 * @param {any} card
 */
export function workerCardChildrenTemplate(card) {
  const children = Array.isArray(card.visible_children)
    ? card.visible_children
    : Array.isArray(card.children)
      ? card.children
      : [];
  const child_total = Number(card.child_total || children.length || 0);
  const child_done = Number(card.child_done || 0);

  if (child_total === 0) {
    return html`
      <section class="worker-card-children worker-card-children--empty">
        <span>No children</span>
      </section>
    `;
  }

  return html`
    <section class="worker-card-children">
      <div class="worker-card-children__summary">
        <span>${child_done}/${child_total} children done</span>
      </div>
      <div class="worker-card-children__list">
        ${children.slice(0, 4).map(
          (/** @type {any} */ child) => html`
            <div
              class="worker-card-children__item is-status-${String(
                child.status || 'open'
              ).replace(/\s+/g, '_')}"
              data-worker-card-child=${child.id}
            >
              <span class="worker-card-children__icon" aria-hidden="true"
                >${statusIcon(child.status)}</span
              >
              <span class="worker-card-children__id mono">${child.id}</span>
              <span class="worker-card-children__title"
                >${child.title || '(no title)'}</span
              >
            </div>
          `
        )}
        ${children.length > 4
          ? html`<div class="worker-card-children__more">
              +${children.length - 4} more
            </div>`
          : null}
      </div>
    </section>
  `;
}
