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
});
