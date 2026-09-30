/**
 * Hash router of the unified shell (UI-dbn6 §3.1): three screens —
 * `#/pipeline` (default), `#/compare`, `#/adr` — and the issue overlay as a
 * query `?issue=<id>&root=<encodeURIComponent(root_dir)>` on any of them.
 *
 * Legacy hashes normalize onto the pipeline and are rewritten in place:
 * `#/worker` (scope: the saved repo) · `#/monitor` (scope: 전체) · `#/board` ·
 * `#/issues` · `#/epics` · `#/issue/<id>` · `#/worker?issue=<id>`. The scope a
 * legacy hash asks for is reported through `onScopeIntent` — the router owns
 * the hash, the shell owns the scope.
 */
import { debug } from '../utils/logging.js';

/**
 * @typedef {'pipeline'|'compare'|'adr'} ScreenName
 * @typedef {{ screen: ScreenName, issue: string|null, root: string|null, scope_intent: 'all'|'repo'|null, legacy: boolean }} Route
 */

/** @type {ReadonlyArray<ScreenName>} */
const SCREENS = ['pipeline', 'compare', 'adr'];

/**
 * @param {string|null} value
 * @returns {string|null}
 */
function nonEmpty(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * Parse one location hash.
 *
 * @param {string} hash
 * @returns {Route}
 */
export function parseRoute(hash) {
  const text = String(hash || '');
  const frag = text.startsWith('#') ? text.slice(1) : text;
  const q_index = frag.indexOf('?');
  const path = q_index >= 0 ? frag.slice(0, q_index) : frag;
  const params = new URLSearchParams(
    q_index >= 0 ? frag.slice(q_index + 1) : ''
  );
  let issue = nonEmpty(params.get('issue'));
  const root = nonEmpty(params.get('root'));
  const legacy_issue = /^\/issue\/([^\s?#/]+)/.exec(path);
  if (legacy_issue) {
    issue = decodeURIComponent(legacy_issue[1]);
  }
  const segment = path.replace(/^\/+/, '').split('/')[0] || '';
  const screen = /** @type {ScreenName} */ (
    SCREENS.includes(/** @type {ScreenName} */ (segment)) ? segment : 'pipeline'
  );
  return {
    screen,
    issue,
    root: issue ? root : null,
    scope_intent:
      segment === 'monitor' ? 'all' : segment === 'worker' ? 'repo' : null,
    legacy:
      segment.length > 0 && !SCREENS.includes(/** @type {any} */ (segment))
  };
}

/**
 * The canonical hash of a route.
 *
 * @param {{ screen: ScreenName, issue?: string|null, root?: string|null }} route
 * @returns {string}
 */
export function routeHash(route) {
  const screen = SCREENS.includes(route.screen) ? route.screen : 'pipeline';
  if (!route.issue) {
    return `#/${screen}`;
  }
  const root = route.root ? `&root=${encodeURIComponent(route.root)}` : '';
  return `#/${screen}?issue=${encodeURIComponent(route.issue)}${root}`;
}

/**
 * @param {{ getState: () => any, setState: (patch: any) => void }} store
 * @param {{ onScopeIntent?: (intent: 'all'|'repo') => void }} [options]
 */
export function createHashRouter(store, options = {}) {
  const log = debug('router');

  function onHashChange() {
    const route = parseRoute(window.location.hash || '');
    log(
      'hash → screen=%s issue=%s root=%s',
      route.screen,
      route.issue,
      route.root
    );
    store.setState({
      view: route.screen,
      selected_id: route.issue,
      detail_root: route.root
    });
    if (route.scope_intent && options.onScopeIntent) {
      options.onScopeIntent(route.scope_intent);
    }
    if (route.legacy) {
      const next = routeHash(route);
      if (window.location.hash !== next) {
        window.location.hash = next;
      }
    }
  }

  /**
   * @param {string} next
   * @param {Record<string, unknown>} patch - Applied directly when the hash
   * does not change (no hashchange event would fire).
   */
  function go(next, patch) {
    if (window.location.hash !== next) {
      window.location.hash = next;
    } else {
      store.setState(patch);
    }
  }

  /**
   * @returns {ScreenName}
   */
  function currentScreen() {
    const view = store.getState ? store.getState().view : 'pipeline';
    return SCREENS.includes(view) ? view : 'pipeline';
  }

  return {
    start() {
      window.addEventListener('hashchange', onHashChange);
      onHashChange();
    },
    stop() {
      window.removeEventListener('hashchange', onHashChange);
    },
    /**
     * Open the issue overlay on the current screen, keeping its repository.
     *
     * @param {string} id
     * @param {string|null} [root]
     */
    gotoIssue(id, root = null) {
      const screen = currentScreen();
      go(routeHash({ screen, issue: id, root }), {
        view: screen,
        selected_id: id,
        detail_root: root || null
      });
    },
    closeIssue() {
      const screen = currentScreen();
      go(routeHash({ screen }), {
        view: screen,
        selected_id: null,
        detail_root: null
      });
    },
    /**
     * @param {ScreenName} screen
     */
    gotoScreen(screen) {
      const state = store.getState ? store.getState() : {};
      const issue = state.selected_id || null;
      go(routeHash({ screen, issue, root: state.detail_root || null }), {
        view: screen
      });
    },
    /**
     * Bridge alias for legacy components that navigate by view name; every
     * legacy name lands on the pipeline.
     *
     * @param {string} view
     */
    gotoView(view) {
      this.gotoScreen(
        SCREENS.includes(/** @type {ScreenName} */ (view))
          ? /** @type {ScreenName} */ (view)
          : 'pipeline'
      );
    }
  };
}
