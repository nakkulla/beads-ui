/**
 * The host of the 저장소 작업 타임라인 drawer (UI-dbn6 §3.3·§3.6): a body-level
 * overlay (`ui/overlay.js`) — a centred window from 720px, a full-screen
 * sheet below — closed by its ✕, the backdrop and Escape. It routes the
 * drawer's actions for the scope repository: `기록 닫기`
 * (`worker-repo-operation-dismiss`), `정리 재시도` (`worker-cleanup-retry`) and
 * `세션에서 해결` (`worker-resolve-in-session`). The timeline itself is
 * `timeline.js`.
 */
import { createOverlayHost } from '../../ui/overlay.js';
import { viewportOf } from '../../ui/viewport.js';
import { createRepoOpsDrawer } from './timeline.js';

/**
 * @typedef {Object} RepoOpsDrawerDeps
 * @property {() => string} getRoot - The repository the drawer's actions name.
 * @property {{ dismissRepoOperation: (operation_id: string, root_dir: string) => Promise<unknown>, cleanupRetry: (bead_id: string, root_dir: string) => Promise<unknown>, resolve: (bead_id: string, root_dir: string) => Promise<unknown> }} actions
 * @property {() => void} [onClose]
 * @property {(query: string) => MediaQueryList} [matchMedia]
 */

/**
 * @param {RepoOpsDrawerDeps} deps
 */
export function createRepoOpsDrawerScreen(deps) {
  const { overlay, backdrop, host } = createOverlayHost(document, 'ro-overlay');

  const drawer = createRepoOpsDrawer(host, {
    onClose: () => {
      overlay.hidden = true;
      document.removeEventListener('keydown', onKeydown);
      deps.onClose?.();
    }
  });

  /** @param {KeyboardEvent} ev */
  function onKeydown(ev) {
    if (ev.key === 'Escape' && drawer.isOpen()) {
      drawer.close();
    }
  }

  backdrop.addEventListener('click', () => drawer.close());

  /** @param {Event} ev */
  function onClick(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    const root_dir = deps.getRoot();
    /** @param {string} selector */
    const hit = (selector) =>
      /** @type {HTMLElement|null} */ (target?.closest?.(selector) || null);
    const dismiss = hit('.worker-repo-op__dismiss');
    if (dismiss) {
      void deps.actions.dismissRepoOperation(
        dismiss.dataset.operationId || '',
        root_dir
      );
      return;
    }
    const resume = hit('.worker-cleanup__resume');
    if (resume && resume.dataset.beadId) {
      void deps.actions.cleanupRetry(resume.dataset.beadId, root_dir);
      return;
    }
    const resolve = hit('.worker-cleanup__resolve');
    if (resolve && resolve.dataset.beadId) {
      void deps.actions.resolve(resolve.dataset.beadId, root_dir);
    }
  }
  host.addEventListener('click', onClick);

  return {
    /**
     * @param {{ operations: any, cleanup_failures: any, repo?: string, repo_ops?: any }} input
     */
    open(input) {
      const narrow = viewportOf(deps.matchMedia).size === 'narrow';
      overlay.classList.toggle('ui-overlay--sheet', narrow);
      overlay.classList.toggle('ro-overlay--sheet', narrow);
      overlay.hidden = false;
      document.addEventListener('keydown', onKeydown);
      drawer.open(input);
    },
    /**
     * @param {{ operations: any, cleanup_failures: any, repo?: string, repo_ops?: any }} input
     */
    refresh(input) {
      drawer.refresh(input);
    },
    close() {
      drawer.close();
    },
    isOpen: () => drawer.isOpen(),
    destroy() {
      host.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeydown);
      overlay.remove();
    }
  };
}
