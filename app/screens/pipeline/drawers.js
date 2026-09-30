/**
 * The Worker drawers the pipeline screen bridge-mounts (UI-dbn6 §4.4): the
 * attempt/session transcript drawer, the repo-ops timeline drawer with its
 * dismiss / cleanup controls, and the repo-ops settings strip with its script
 * viewer. They keep their own markup until a later phase replaces them.
 */
import { sessionRefDrawerInput } from '../../utils/session-ref.js';
import { createRepoOpsScriptViewer } from '../../views/worker/repo-ops-script-viewer.js';
import { createRepoOpsSettings } from '../../views/worker/repo-ops-settings.js';
import { createRepoOpsDrawer } from '../../views/worker/repo-ops-timeline.js';
import { createTranscriptDrawer } from '../../views/worker/transcript-drawer.js';

/**
 * @typedef {Object} DrawerDeps
 * @property {(type: string, payload?: unknown) => Promise<any>} send
 * @property {any} sessionLogStore
 * @property {any} queueStore
 * @property {() => string|null} getConnected
 * @property {() => string} getScope
 * @property {() => any} repoInput - The repo-ops timeline input of the scope.
 * @property {() => void} onTranscriptClose
 * @property {() => void} onChanged
 * @property {{ dismissRepoOperation: (operation_id: string, root_dir: string) => Promise<unknown>, cleanupRetry: (bead_id: string, root_dir: string) => Promise<unknown>, resolve: (bead_id: string, root_dir: string) => Promise<unknown> }} actions
 */

/**
 * @param {HTMLElement} mount
 * @param {DrawerDeps} deps
 */
export function createDrawers(mount, deps) {
  const overlay_el = document.createElement('div');
  overlay_el.className = 'worker-drawer-overlay';
  overlay_el.hidden = true;
  const backdrop_el = document.createElement('div');
  backdrop_el.className = 'worker-drawer-overlay__backdrop';
  const drawer_el = document.createElement('div');
  drawer_el.className = 'worker-drawer-host';
  const repo_drawer_el = document.createElement('div');
  repo_drawer_el.className = 'worker-drawer-host worker-repo-drawer-host';
  repo_drawer_el.hidden = true;
  overlay_el.append(backdrop_el, drawer_el, repo_drawer_el);
  mount.appendChild(overlay_el);

  const drawer = createTranscriptDrawer(drawer_el, {
    transport: deps.send,
    sessionLogStore: deps.sessionLogStore,
    onClose: () => {
      overlay_el.hidden = true;
      deps.onTranscriptClose();
    }
  });
  const repo_drawer = createRepoOpsDrawer(repo_drawer_el, {
    onClose: () => {
      repo_drawer_el.hidden = true;
      overlay_el.hidden = true;
    }
  });
  const script_viewer = createRepoOpsScriptViewer({
    getWorkspacePath: () => deps.getConnected() || ''
  });
  const repo_ops_settings = createRepoOpsSettings({
    queueStore: deps.queueStore,
    transport: deps.send,
    onChanged: () => deps.onChanged(),
    onOpenScript: (input, trigger) => {
      void script_viewer.open(input, trigger);
    }
  });

  /**
   * @param {Event} ev
   */
  function onRepoDrawerClick(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    const root_dir = deps.getScope();
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
  repo_drawer_el.addEventListener('click', onRepoDrawerClick);

  /**
   * @param {any} input - A `sessionRefDrawerInput` or an attempt input.
   */
  function openTranscript(input) {
    overlay_el.hidden = false;
    repo_drawer_el.hidden = true;
    drawer.open(input);
  }

  return {
    openTranscript,
    /**
     * Open one live interactive session's log by provider and session id.
     *
     * @param {'claude'|'codex'} provider
     * @param {string} session_id
     * @param {string} bead_id
     * @param {string} root_dir
     */
    openSessionLog(provider, session_id, bead_id, root_dir) {
      openTranscript(
        sessionRefDrawerInput(
          {
            provider,
            session_id,
            current: true,
            locality: 'local',
            index: 0,
            host: '',
            last_event_at: null,
            resume_command: null
          },
          bead_id,
          'in_progress',
          root_dir
        )
      );
    },
    openRepo() {
      drawer.close();
      overlay_el.hidden = false;
      repo_drawer_el.hidden = false;
      repo_drawer.open(deps.repoInput());
    },
    refreshRepo() {
      if (repo_drawer.isOpen()) {
        repo_drawer.refresh(deps.repoInput());
      }
    },
    /** @returns {any} */
    settingsTemplate: () => repo_ops_settings.template(),
    destroy() {
      repo_drawer_el.removeEventListener('click', onRepoDrawerClick);
      drawer.destroy();
    }
  };
}
