/**
 * The transcript screen (UI-dbn6 §3.1·§3.6·§4.2): the shell's one session
 * transcript overlay. It hosts the UI-2dbn drawer (`transcript-drawer.js`,
 * whose display grammar is not redesigned here) above every screen and the
 * issue detail — a centred window on a wide viewport, a full-screen sheet
 * below 720px — and closes on ✕, the backdrop and the browser back.
 *
 * The drawer subscribes to `subscribe-session-log` on open and unsubscribes on
 * close, so the channel is open exactly while the transcript is shown. The
 * back button closes it through one same-URL history entry pushed on open: a
 * transcript has no address of its own, so the hash stays as it is.
 *
 * @import { DrawerOpenInput } from './transcript-drawer.js'
 * @import { MatchMedia } from '../../ui/viewport.js'
 */
import { createOverlayHost } from '../../ui/overlay.js';
import { viewportOf } from '../../ui/viewport.js';
import { sessionRefDrawerInput } from '../../utils/session-ref.js';
import { createTranscriptDrawer } from './transcript-drawer.js';

/** `history.state` marker of the entry an open transcript pushed. */
const HISTORY_MARK = 'transcript';

/**
 * @typedef {Object} TranscriptDeps
 * @property {(type: string, payload?: unknown) => Promise<any>} send
 * @property {any} sessionLogStore
 * @property {MatchMedia} [matchMedia]
 * @property {() => void} [onClose] - After the transcript closed.
 */

/**
 * @param {unknown} state
 * @returns {boolean}
 */
function isOwnEntry(state) {
  return (
    Boolean(state) &&
    typeof state === 'object' &&
    /** @type {any} */ (state).bdui_overlay === HISTORY_MARK
  );
}

/**
 * @param {TranscriptDeps} deps
 */
export function createTranscriptScreen(deps) {
  const { overlay, host } = createOverlayHost(document, 'tr-overlay');

  /** Whether the open transcript pushed a history entry not yet popped. */
  let pushed = false;
  /** @type {Set<() => void>} */
  const close_listeners = new Set();

  const drawer = createTranscriptDrawer(host, {
    transport: deps.send,
    sessionLogStore: deps.sessionLogStore,
    onClose: () => {
      overlay.hidden = true;
      if (pushed) {
        pushed = false;
        if (isOwnEntry(window.history.state)) {
          window.history.back();
        }
      }
      deps.onClose?.();
      for (const fn of Array.from(close_listeners)) {
        fn();
      }
    }
  });

  function onPopState() {
    if (drawer.isOpen() && !isOwnEntry(window.history.state)) {
      pushed = false;
      drawer.close();
    }
  }
  window.addEventListener('popstate', onPopState);

  /**
   * @param {DrawerOpenInput} input
   */
  function open(input) {
    const narrow = viewportOf(deps.matchMedia).size === 'narrow';
    overlay.classList.toggle('ui-overlay--sheet', narrow);
    overlay.classList.toggle('tr-overlay--sheet', narrow);
    overlay.hidden = false;
    drawer.open(input);
    if (!drawer.isOpen()) {
      overlay.hidden = true;
      return;
    }
    if (!pushed) {
      window.history.pushState({ bdui_overlay: HISTORY_MARK }, '');
      pushed = true;
    }
  }

  return {
    open,
    /**
     * Open one live interactive session's log by provider and session id.
     *
     * @param {'claude'|'codex'} provider
     * @param {string} session_id
     * @param {string} bead_id
     * @param {string} root_dir
     */
    openSessionLog(provider, session_id, bead_id, root_dir) {
      open(
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
    /**
     * @param {import('../../utils/session-ref.js').DrawerMeta} meta
     */
    updateMeta(meta) {
      drawer.updateMeta(meta);
    },
    close() {
      if (drawer.isOpen()) {
        drawer.close();
      }
    },
    isOpen: () => drawer.isOpen(),
    /**
     * Call `fn` after every close.
     *
     * @param {() => void} fn
     * @returns {() => void} Detach.
     */
    onClose(fn) {
      close_listeners.add(fn);
      return () => close_listeners.delete(fn);
    },
    destroy() {
      close_listeners.clear();
      window.removeEventListener('popstate', onPopState);
      drawer.destroy();
      overlay.remove();
    }
  };
}
