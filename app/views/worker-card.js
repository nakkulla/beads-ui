import { html } from 'lit-html';
import { statusLabel } from '../utils/status.js';
import { workerCardChildrenTemplate } from './worker-card-children.js';
import { workerCardProgressTemplate } from './worker-card-progress.js';

const TYPE_MODIFIERS = new Set([
  'bug',
  'feature',
  'task',
  'epic',
  'chore',
  'decision'
]);

/**
 * @param {string | undefined | null} issue_type
 * @returns {string}
 */
function typeModifier(issue_type) {
  const key = String(issue_type || '').toLowerCase();
  return TYPE_MODIFIERS.has(key) ? key : 'neutral';
}

/**
 * @param {string | undefined | null} status
 * @returns {string}
 */
function statusModifier(status) {
  return String(status || 'open')
    .toLowerCase()
    .replace(/\s+/g, '_');
}

/**
 * @param {any} card
 * @param {any} state
 * @param {{
 *   selected: boolean,
 *   onSelectCard: (id: string) => void,
 *   onDragStart: (card: any, event: DragEvent) => void,
 *   onCancelJob?: (job_id: string) => void,
 *   onFinishNow?: (issue_id: string) => void,
 *   onCancelAutoPrFinish?: (issue_id: string) => void,
 *   onRunPrFinish?: (issue_id: string) => void
 * }} handlers
 */
export function workerCardTemplate(card, state, handlers) {
  const status_mod = statusModifier(card.status);
  const type_mod = typeModifier(card.issue_type);
  const metadata_tags = [card.parallel ? 'parallel' : 'serial'];
  if (card.model) {
    metadata_tags.push(card.model);
  }
  if (card.effort) {
    metadata_tags.push(card.effort);
  }

  return html`
    <article
      class="worker-card is-status-${status_mod} is-lane-${card.lane} ${handlers.selected
        ? 'is-selected'
        : ''}"
      data-worker-card=${card.id}
      data-worker-lane=${card.lane}
      draggable="true"
      role="button"
      tabindex="0"
      @click=${() => handlers.onSelectCard(card.id)}
      @keydown=${(/** @type {KeyboardEvent} */ event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handlers.onSelectCard(card.id);
        }
      }}
      @dragstart=${(/** @type {DragEvent} */ event) =>
        handlers.onDragStart(card, event)}
    >
      <header class="worker-card__header">
        <span class="worker-card__id mono">${card.id}</span>
        <span class="worker-badge worker-badge--type is-type-${type_mod}"
          >${card.issue_type || 'issue'}</span
        >
        <span class="worker-badge worker-badge--status is-${status_mod}"
          >${statusLabel(card.status)}</span
        >
      </header>

      <div class="worker-card__title">${card.title || '(no title)'}</div>

      <div class="worker-card__badges">
        ${card.spec_id
          ? html`<span class="worker-badge worker-badge--spec">✓ Spec</span>`
          : html`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${card.prNumber
          ? html`<span class="worker-badge worker-badge--pr"
              >PR #${card.prNumber}</span
            >`
          : null}
        ${metadata_tags.map(
          (tag) =>
            html`<span class="worker-badge worker-badge--muted">${tag}</span>`
        )}
      </div>

      ${workerCardChildrenTemplate(card)}
      ${workerCardProgressTemplate(card, state, handlers)}
    </article>
  `;
}
