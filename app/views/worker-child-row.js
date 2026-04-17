import { html } from 'lit-html';
import { statusLabel } from '../utils/status.js';

/**
 * @param {{ id: string, title?: string, status?: string }} child
 */
export function workerChildRowTemplate(child) {
  const status_mod = (child.status || 'open')
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '_');
  return html`
    <div
      class="worker-child-row is-status-${status_mod}"
      data-worker-child=${child.id}
    >
      <span class="worker-child-row__dot" aria-hidden="true"></span>
      <span class="worker-child-row__id mono">${child.id}</span>
      <span class="worker-child-row__title"
        >${child.title || '(no title)'}</span
      >
      <span class="worker-badge worker-badge--status is-${status_mod}"
        >${statusLabel(child.status)}</span
      >
    </div>
  `;
}
