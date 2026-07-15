import { html, render } from 'lit-html';
import { showToast } from '../../utils/toast.js';

/**
 * Minimal detail overlay (Phase 7). Clicking a board card opens this right-side
 * panel showing id / title / description / status / priority with a close
 * affordance (✕ · backdrop · Esc). It reads the already-pushed snapshot from
 * the `detail:<id>` subscription store — no new server calls.
 *
 * TODO(Phase 8): expand into the full detail panel (Artifacts, exec settings,
 * workflow receipts, md viewer) per detail-panel.html.
 */

/**
 * @typedef {Object} DetailPanelOptions
 * @property {{ snapshotFor?: (client_id: string) => any[], subscribe?: (fn: () => void) => () => void }} [issueStores]
 * @property {() => void} onClose - Invoked to request the overlay be closed.
 */

/**
 * @param {HTMLElement} mount_element
 * @param {DetailPanelOptions} options
 * @returns {{ load: (id: string) => void, clear: () => void, destroy: () => void }}
 */
export function createDetailPanel(mount_element, options) {
  const issueStores = options.issueStores;
  const onClose = options.onClose;

  /** @type {string | null} */
  let current_id = null;
  /** @type {any} */
  let current = null;

  /** @type {null | (() => void)} */
  let unsubscribe = null;
  if (issueStores && issueStores.subscribe) {
    unsubscribe = issueStores.subscribe(() => refreshFromStore());
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onKeydown(ev) {
    if (ev.key === 'Escape' && current_id) {
      ev.preventDefault();
      onClose();
    }
  }
  document.addEventListener('keydown', onKeydown);

  function refreshFromStore() {
    if (!current_id) {
      return;
    }
    if (issueStores && typeof issueStores.snapshotFor === 'function') {
      const snap = issueStores.snapshotFor('detail:' + current_id) || [];
      const found = snap.find((it) => it && it.id === current_id);
      current = found || snap[0] || current;
    }
    doRender();
  }

  /**
   * @param {Event} ev
   */
  function onCopyId(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (!current_id) {
      return;
    }
    try {
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === 'function'
      ) {
        void navigator.clipboard
          .writeText(String(current_id))
          .then(() => showToast('복사됨', 'success', 1200))
          .catch(() => {});
      }
    } catch {
      // ignore copy errors
    }
  }

  function template() {
    if (!current_id) {
      return html``;
    }
    const data = current || {};
    const id = String(data.id || current_id);
    const title = data.title || '(제목 없음)';
    const status = data.status || 'open';
    const priority =
      typeof data.priority === 'number'
        ? `P${Math.max(0, Math.min(4, data.priority))}`
        : '';
    const description = data.description || '';
    return html`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${() => onClose()}></div>
        <div class="detail-overlay__panel">
          <button
            type="button"
            class="detail-overlay__close"
            aria-label="닫기"
            @click=${() => onClose()}
          >
            ✕
          </button>
          <button
            type="button"
            class="detail-overlay__id"
            title="ID 복사"
            @click=${onCopyId}
          >
            ${id}
          </button>
          <h2 class="detail-overlay__title">${title}</h2>
          <div class="detail-overlay__meta">
            <span class="ctl-chip">${status}</span>
            ${priority ? html`<span class="ctl-chip">${priority}</span>` : ''}
          </div>
          <div class="detail-overlay__section-label">설명</div>
          <div class="detail-overlay__desc">
            ${description || '(설명 없음)'}
          </div>
        </div>
      </div>
    `;
  }

  function doRender() {
    render(template(), mount_element);
  }

  return {
    /**
     * @param {string} id
     */
    load(id) {
      current_id = id;
      current = null;
      refreshFromStore();
    },
    clear() {
      current_id = null;
      current = null;
      render(html``, mount_element);
    },
    destroy() {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      document.removeEventListener('keydown', onKeydown);
      current_id = null;
      current = null;
      render(html``, mount_element);
    }
  };
}
