import { issueHashFor } from './utils/issue-url.js';
import { debug } from './utils/logging.js';

/**
 * Hash-based router for the two-tab shell (board/worker) and deep-linked
 * issue ids. Legacy hashes (#/issues, #/epics, #/issue/<id>) redirect to the
 * canonical #/board form.
 */

/**
 * Parse an application hash and extract the selected issue id.
 * Supports canonical "#/(board|worker)?issue=<id>" and legacy "#/issue/<id>".
 *
 * @param {string} hash
 * @returns {string | null}
 */
export function parseHash(hash) {
  const h = String(hash || '');
  const frag = h.startsWith('#') ? h.slice(1) : h;
  const qIndex = frag.indexOf('?');
  const query = qIndex >= 0 ? frag.slice(qIndex + 1) : '';
  if (query) {
    const params = new URLSearchParams(query);
    const id = params.get('issue');
    if (id) {
      return decodeURIComponent(id);
    }
  }
  const m = /^\/issue\/([^\s?#]+)/.exec(frag);
  return m && m[1] ? decodeURIComponent(m[1]) : null;
}

/**
 * Parse the current view from hash. Only 'board' and 'worker' exist; every
 * other hash (including legacy #/issues and #/epics) resolves to 'board'.
 *
 * @param {string} hash
 * @returns {'board'|'worker'}
 */
export function parseView(hash) {
  const h = String(hash || '');
  if (/^#\/worker(\b|\/|$)/.test(h)) {
    return 'worker';
  }
  return 'board';
}

/**
 * @param {{ getState: () => any, setState: (patch: any) => void }} store
 */
export function createHashRouter(store) {
  const log = debug('router');
  /** @type {(ev?: HashChangeEvent) => any} */
  const onHashChange = () => {
    const hash = window.location.hash || '';
    const legacyMatch = /^#\/issue\/([^\s?#]+)/.exec(hash);
    const id =
      legacyMatch && legacyMatch[1]
        ? decodeURIComponent(legacyMatch[1])
        : parseHash(hash);
    const view = parseView(hash);

    // Set state synchronously so deep links resolve without a hashchange hop.
    log('hash change → view=%s id=%s', view, id);
    store.setState({
      selected_id: view === 'worker' ? null : id,
      view,
      worker: {
        selected_parent_id: view === 'worker' ? id : null
      }
    });

    // Normalize legacy hashes (#/issue/<id>, #/issues, #/epics) to canonical.
    const is_legacy =
      Boolean(legacyMatch) || /^#\/(issues|epics)(\b|\/|\?|$)/.test(hash);
    if (is_legacy) {
      const next = id
        ? `#/${view}?issue=${encodeURIComponent(id)}`
        : `#/${view}`;
      if (window.location.hash !== next) {
        window.location.hash = next;
      }
    }
  };

  return {
    start() {
      window.addEventListener('hashchange', onHashChange);
      onHashChange();
    },
    stop() {
      window.removeEventListener('hashchange', onHashChange);
    },
    /**
     * @param {string} id
     */
    gotoIssue(id) {
      const s = store.getState ? store.getState() : { view: 'board' };
      const view = s.view === 'worker' ? 'worker' : 'board';
      const next = issueHashFor(view, id);
      log('goto issue %s (view=%s)', id, view);
      if (window.location.hash !== next) {
        window.location.hash = next;
      } else {
        store.setState({
          selected_id: view === 'worker' ? null : id,
          view,
          worker: {
            selected_parent_id: view === 'worker' ? id : null
          }
        });
      }
    },
    /**
     * Navigate to a top-level view.
     *
     * @param {'board'|'worker'} view
     */
    gotoView(view) {
      const s = store.getState
        ? store.getState()
        : { selected_id: null, worker: { selected_parent_id: null } };
      const id =
        view === 'worker' ? s.worker?.selected_parent_id : s.selected_id;
      const next = id ? issueHashFor(view, id) : `#/${view}`;
      log('goto view %s (id=%s)', view, id || '');
      if (window.location.hash !== next) {
        window.location.hash = next;
      } else {
        store.setState({
          view,
          selected_id: view === 'worker' ? null : s.selected_id
        });
      }
    }
  };
}
