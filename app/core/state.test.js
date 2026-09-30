import { describe, expect, test } from 'vitest';
import {
  SCOPE_KEY,
  WORKSPACE_KEY,
  createPipelinePrefs,
  createStore,
  pruneSavedWorkspace,
  readSavedWorkspace,
  readScope,
  writeSavedWorkspace,
  writeScope
} from './state.js';

describe('state store', () => {
  test('get/set/subscribe works and dedupes unchanged', () => {
    const store = createStore();
    const seen = [];
    const off = store.subscribe((s) => seen.push(s));

    store.setState({ selected_id: 'UI-1' });
    store.setState({ filters: { status: 'open' } });
    store.setState({ worker: { selected_parent_id: 'UI-62lm' } });
    // no-op (unchanged)
    store.setState({ filters: { status: 'open' } });
    off();

    expect(seen.length).toBe(3);
    const state = store.getState();
    expect(state.selected_id).toBe('UI-1');
    expect(state.filters.status).toBe('open');
    expect(state.worker.selected_parent_id).toBe('UI-62lm');
  });

  test('hydrates config into initial state', () => {
    const store = createStore({
      config: {
        workspace_config: {
          default_workspace: '/repo-a'
        }
      }
    });

    expect(store.getState().config.workspace_config.default_workspace).toBe(
      '/repo-a'
    );
  });

  test('defaults the workspace config when none is provided', () => {
    const store = createStore();

    expect(
      store.getState().config.workspace_config.default_workspace
    ).toBeNull();
  });

  test('emits when the default workspace changes', () => {
    const store = createStore();
    /** @type {Array<{ workspace_config: { default_workspace: string | null } }>} */
    const seen = [];
    const off = store.subscribe((state) => seen.push(state.config));

    store.setState({
      config: { workspace_config: { default_workspace: '/a' } }
    });
    store.setState({
      config: { workspace_config: { default_workspace: '/a' } }
    });
    off();

    expect(seen).toHaveLength(1);
    expect(seen[0].workspace_config.default_workspace).toBe('/a');
  });
});

describe('state view name', () => {
  test('accepts the adr view', () => {
    const store = createStore();

    store.setState({ view: 'adr' });

    expect(store.getState().view).toBe('adr');
  });
});

/**
 * A Map-backed `localStorage` stand-in.
 *
 * @param {Record<string, string>} [seed]
 */
function memoryStorage(seed = {}) {
  const map = new Map(Object.entries(seed));
  return {
    /** @param {string} key */
    getItem: (key) =>
      map.has(key) ? /** @type {string} */ (map.get(key)) : null,
    /**
     * @param {string} key
     * @param {string} value
     */
    setItem: (key, value) => {
      map.set(key, String(value));
    },
    /** @param {string} key */
    removeItem: (key) => {
      map.delete(key);
    },
    dump: () => Object.fromEntries(map)
  };
}

describe('display scope and connected workspace (UI-dbn6 §3.2)', () => {
  test('stores the display scope and the connected workspace under separate keys', () => {
    const storage = memoryStorage();

    writeScope(storage, '*');
    writeSavedWorkspace(storage, '/repo/a');

    expect(storage.dump()).toEqual({
      [SCOPE_KEY]: '*',
      [WORKSPACE_KEY]: '/repo/a'
    });
  });

  test('reads the 전체 scope when nothing is stored', () => {
    const storage = memoryStorage();

    const scope = readScope(storage);

    expect(scope).toBe('*');
  });

  test('removes an unregistered saved workspace and leaves the scope alone', () => {
    const storage = memoryStorage({
      [SCOPE_KEY]: '/repo/gone',
      [WORKSPACE_KEY]: '/repo/gone'
    });

    const kept = pruneSavedWorkspace(storage, ['/repo/a'], []);

    expect(kept).toBeNull();
    expect(storage.dump()).toEqual({ [SCOPE_KEY]: '/repo/gone' });
  });

  test('removes a hidden saved workspace', () => {
    const storage = memoryStorage({ [WORKSPACE_KEY]: '/repo/a' });

    const kept = pruneSavedWorkspace(storage, ['/repo/a'], ['/repo/a']);

    expect(kept).toBeNull();
    expect(readSavedWorkspace(storage)).toBeNull();
  });

  test('keeps a registered visible saved workspace', () => {
    const storage = memoryStorage({ [WORKSPACE_KEY]: '/repo/a' });

    const kept = pruneSavedWorkspace(storage, ['/repo/a', '/repo/b'], []);

    expect(kept).toBe('/repo/a');
  });

  test('carries the display scope and the issue root in the store', () => {
    const store = createStore({ scope: '/repo/a' });

    store.setState({ detail_root: '/repo/b' });

    expect(store.getState()).toMatchObject({
      scope: '/repo/a',
      detail_root: '/repo/b'
    });
  });
});

describe('pipeline view preferences (UI-dbn6 §3.3)', () => {
  test('keeps lane collapse per scope kind', () => {
    const storage = memoryStorage();
    const prefs = createPipelinePrefs(storage);

    prefs.setLaneCollapsed('all', 'running', true);

    expect(prefs.laneCollapsed('all', 'running')).toBe(true);
    expect(prefs.laneCollapsed('repo', 'running')).toBe(false);
  });

  test('stores repo bundle collapse in the monitor sections key shape', () => {
    const storage = memoryStorage();
    const prefs = createPipelinePrefs(storage);

    prefs.setBundleCollapsed('/repo/a', 'runnable', true);

    expect(JSON.parse(storage.dump()['beads-ui.monitor.sections'])).toEqual({
      '/repo/a': { runnable: true }
    });
  });
});
