/**
 * The drawers the pipeline screen opens (UI-dbn6 §4.4): the shared transcript
 * screen (`screens/transcript/`), the repo-ops timeline drawer
 * (`screens/repo-ops/index.js`) with its dismiss / cleanup controls, and the
 * 저장소 작업 declaration section of the repo toolbar with its script viewer
 * (`screens/repo-ops/settings.js`, `script-viewer.js`).
 */
import { createRepoOpsDrawerScreen } from '../repo-ops/index.js';
import { createRepoOpsScriptViewer } from '../repo-ops/script-viewer.js';
import { createRepoOpsSettings } from '../repo-ops/settings.js';
import { createTranscriptScreen } from '../transcript/index.js';

/**
 * @typedef {Object} DrawerDeps
 * @property {(type: string, payload?: unknown) => Promise<any>} send
 * @property {any} sessionLogStore
 * @property {any} queueStore
 * @property {() => string|null} getConnected
 * @property {() => string} getScope
 * @property {() => any} repoInput - The repo-ops timeline input of the scope.
 * @property {() => void} onTranscriptClose
 * @property {ReturnType<typeof createTranscriptScreen>} [transcript] - The
 * shell's shared transcript screen; a screen of its own when absent.
 * @property {() => void} onChanged
 * @property {{ dismissRepoOperation: (operation_id: string, root_dir: string) => Promise<unknown>, cleanupRetry: (bead_id: string, root_dir: string) => Promise<unknown>, resolve: (bead_id: string, root_dir: string) => Promise<unknown> }} actions
 */

/**
 * @param {HTMLElement} _mount - The pipeline root (the drawers live on the body).
 * @param {DrawerDeps} deps
 */
export function createDrawers(_mount, deps) {
  const own_transcript = deps.transcript
    ? null
    : createTranscriptScreen({
        send: deps.send,
        sessionLogStore: deps.sessionLogStore
      });
  const transcript = /** @type {ReturnType<typeof createTranscriptScreen>} */ (
    deps.transcript || own_transcript
  );
  /** Whether the transcript shown is one this screen opened. */
  let transcript_mine = false;
  const off_transcript_close = transcript.onClose(() => {
    if (transcript_mine) {
      transcript_mine = false;
      deps.onTranscriptClose();
    }
  });
  const repo_drawer = createRepoOpsDrawerScreen({
    getRoot: () => deps.getScope(),
    actions: deps.actions
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
   * @param {any} input - A `sessionRefDrawerInput` or an attempt input.
   */
  function openTranscript(input) {
    repo_drawer.close();
    transcript.open(input);
    transcript_mine = transcript.isOpen();
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
      repo_drawer.close();
      transcript.openSessionLog(provider, session_id, bead_id, root_dir);
      transcript_mine = transcript.isOpen();
    },
    openRepo() {
      transcript.close();
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
      off_transcript_close();
      own_transcript?.destroy();
      repo_drawer.destroy();
      script_viewer.destroy();
    }
  };
}
