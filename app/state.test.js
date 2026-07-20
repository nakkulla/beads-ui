import { describe, expect, test } from 'vitest';
import { createStore } from './state.js';

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

  test('tracks board deferred column state without emitting unchanged values', () => {
    const store = createStore();
    /** @type {boolean[]} */
    const seen = [];
    const off = store.subscribe((s) => seen.push(s.board.show_deferred_column));

    store.setState({ board: { show_deferred_column: true } });
    store.setState({ board: { show_deferred_column: true } });
    store.setState({ board: { show_deferred_column: false } });
    off();

    expect(seen).toEqual([true, false]);
    expect(store.getState().board.show_deferred_column).toBe(false);
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
