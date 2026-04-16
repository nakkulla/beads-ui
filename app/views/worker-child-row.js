import { html } from 'lit-html';
import { statusLabel } from '../utils/status.js';

/**
 * @param {{ id: string, title?: string, status?: string }} child
 */
export function workerChildRowTemplate(child) {
  return html`
    <div class="worker-child-row" data-worker-child=${child.id}>
      <span class="worker-child-row__id mono">${child.id}</span>
      <span class="worker-child-row__title">${child.title || '(no title)'}</span>
      <span class="worker-badge worker-badge--status"
        >${statusLabel(child.status)}</span
      >
    </div>
  `;
}
