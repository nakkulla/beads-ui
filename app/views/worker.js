import { html, render } from 'lit-html';

/**
 * Placeholder Worker view.
 *
 * The v3-era worker board was excised during the beads-ui redesign. The new
 * queue console lands in a later phase; until then this renders a minimal
 * centered notice so the Worker tab and `#/worker` route stay navigable.
 *
 * @param {HTMLElement} mount_element - Element to render into.
 * @returns {{ load: () => void, destroy: () => void }} View API.
 */
export function createWorkerView(mount_element) {
  function doRender() {
    render(
      html`<div class="worker-placeholder">
        <p>Worker 재구축 중 — Phase 9~10에서 새 큐 관제 UI가 들어옵니다.</p>
      </div>`,
      mount_element
    );
  }

  doRender();

  return {
    load() {
      doRender();
    },
    destroy() {
      render(html``, mount_element);
    }
  };
}
