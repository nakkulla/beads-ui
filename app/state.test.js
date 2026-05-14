import { describe, expect, test } from 'vitest';
import { createStore } from './state.js';

describe('state store', () => {
  test('initializes worker queue state defaults', () => {
    const store = createStore();

    const state = store.getState();

    expect(state.worker).toEqual({
      selected_parent_id: null,
      paused: false,
      live_jobs: {},
      countdown: null,
      pr_review_waits: {},
      done_filter: 'today',
      default_model: 'gpt-5.5',
      default_effort: 'high',
      queue_blocked_reason: null,
      pr_finish_available: true
    });
  });

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

  test('emits when worker live job changes', () => {
    const store = createStore();
    /** @type {Array<Record<string, unknown>>} */
    const seen = [];
    const off = store.subscribe((state) => seen.push(state.worker.live_jobs));

    store.setState({
      worker: {
        live_jobs: {
          'job-1': { status: 'running' }
        }
      }
    });
    store.setState({
      worker: {
        live_jobs: {
          'job-1': { status: 'running' }
        }
      }
    });
    off();

    expect(seen).toHaveLength(1);
    expect(seen[0]).toEqual({
      'job-1': { status: 'running' }
    });
  });

  test('hydrates worker defaults from bootstrap config', () => {
    const store = createStore({
      config: {
        worker: {
          default_model: 'gpt-5.4',
          default_effort: 'medium',
          pr_review_wait_ms: 120000,
          advance_delay_ms: 45000
        }
      }
    });

    expect(store.getState().worker.default_model).toBe('gpt-5.4');
    expect(store.getState().worker.default_effort).toBe('medium');
    expect(store.getState().config.worker).toEqual({
      default_model: 'gpt-5.4',
      default_effort: 'medium',
      pr_review_wait_ms: 120000,
      advance_delay_ms: 45000
    });
  });

  test('hydrates config into initial state', () => {
    const store = createStore({
      config: {
        label_display_policy: {
          visible_prefixes: ['area:', 'agent:'],
          visible_exact: ['pr'],
          colors: {
            prefix: {
              'area:': { fg: '#16a34a' }
            },
            exact: {
              pr: { fg: '#7c3aed' }
            }
          }
        },
        workspace_config: {
          default_workspace: '/repo-a'
        },
        detail: {
          workflow_summary: {
            sections: ['workflow_settings'],
            workflow_settings: {
              fields: ['execution_lane'],
              editable_fields: ['execution_lane']
            }
          }
        }
      }
    });

    expect(
      store.getState().config.label_display_policy.visible_prefixes
    ).toEqual(['area:', 'agent:']);
    expect(store.getState().config.label_display_policy.visible_exact).toEqual([
      'pr'
    ]);
    expect(store.getState().config.label_display_policy.colors).toEqual({
      prefix: {
        'area:': { fg: '#16a34a' }
      },
      exact: {
        pr: { fg: '#7c3aed' }
      }
    });
    expect(store.getState().config.detail.workflow_summary.sections).toEqual([
      'workflow_settings'
    ]);
    expect(store.getState().config.workspace_config.default_workspace).toBe(
      '/repo-a'
    );
  });

  test('emits when config visible policy changes', () => {
    const store = createStore();
    /** @type {Array<{ label_display_policy: { visible_prefixes: string[], visible_exact: string[] } }>} */
    const seen = [];
    const off = store.subscribe((state) => seen.push(state.config));

    store.setState({
      config: {
        label_display_policy: {
          visible_prefixes: ['area:'],
          visible_exact: ['pr']
        }
      }
    });
    store.setState({
      config: {
        label_display_policy: {
          visible_prefixes: ['area:'],
          visible_exact: ['pr']
        }
      }
    });
    off();

    expect(seen).toHaveLength(1);
    expect(seen[0].label_display_policy.visible_prefixes).toEqual(['area:']);
    expect(seen[0].label_display_policy.visible_exact).toEqual(['pr']);
  });

  test('emits when config color policy changes', () => {
    const store = createStore({
      config: {
        label_display_policy: {
          visible_prefixes: ['has:'],
          colors: {
            prefix: {
              'has:': { fg: '#16a34a' }
            },
            exact: {}
          }
        }
      }
    });
    /** @type {Array<{ label_display_policy: { colors: { prefix: Record<string, { fg: string }>, exact: Record<string, { fg: string }> } } }>} */
    const seen = [];
    const off = store.subscribe((state) => seen.push(state.config));

    store.setState({
      config: {
        label_display_policy: {
          visible_prefixes: ['has:'],
          colors: {
            prefix: {
              'has:': { fg: '#dc2626' }
            },
            exact: {}
          }
        }
      }
    });
    store.setState({
      config: {
        label_display_policy: {
          visible_prefixes: ['has:'],
          colors: {
            prefix: {
              'has:': { fg: '#dc2626' }
            },
            exact: {}
          }
        }
      }
    });
    off();

    expect(seen).toHaveLength(1);
    expect(seen[0].label_display_policy.colors).toEqual({
      prefix: {
        'has:': { fg: '#dc2626' }
      },
      exact: {}
    });
  });
});
