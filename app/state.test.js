import { describe, expect, test } from 'vitest';
import { createStore } from './state.js';

describe('state store', () => {
  test('get/set/subscribe works and dedupes unchanged', () => {
    const store = createStore();
    const seen = [];
    const off = store.subscribe((s) => seen.push(s));

    store.setState({ selected_id: 'UI-1' });
    store.setState({ filters: { status: 'open' } });
    // no-op (unchanged)
    store.setState({ filters: { status: 'open' } });
    off();

    expect(seen.length).toBe(2);
    const state = store.getState();
    expect(state.selected_id).toBe('UI-1');
    expect(state.filters.status).toBe('open');
  });

  test('emits when workspace list contents change with the same length', () => {
    const store = createStore({
      workspace: {
        current: null,
        available: [
          {
            path: '/tmp/a',
            database: '/tmp/a/.beads',
            backend: 'dolt',
            can_sync: true
          }
        ]
      }
    });
    /** @type {Array<import('./state.js').WorkspaceInfo[]>} */
    const seen = [];
    const off = store.subscribe((state) => seen.push(state.workspace.available));

    store.setState({
      workspace: {
        available: [
          {
            path: '/tmp/b',
            database: '/tmp/b/.beads',
            backend: 'dolt',
            can_sync: true
          }
        ]
      }
    });
    off();

    expect(seen).toHaveLength(1);
    expect(seen[0][0].path).toBe('/tmp/b');
  });
});
