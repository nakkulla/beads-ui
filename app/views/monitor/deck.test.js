import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createRepoDeck } from './deck.js';

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

const CATALOG = {
  runners: {
    claude: { models: { opus: { id: 'opus', efforts: ['low', 'high'] } } },
    codex: { models: { sol: { id: 'gpt-5.6-sol', efforts: ['medium'] } } }
  },
  model_index: { opus: 'claude', sol: 'codex' }
};

const EXECUTION_DEFAULTS = {
  supported: true,
  schema_version: 1,
  session: {
    workflow_mode_default: 'standard',
    review: {
      default: 'codex',
      reviewers: { codex: { model: 'gpt-5.6-sol', effort: 'xhigh' } }
    },
    plan_review: { standard_recommended: 'codex', fast_track_default: 'fable' },
    implementation: {
      default: {
        dispatch: 'delegated',
        runtime: 'codex',
        model: 'sol',
        model_id: 'gpt-5.6-sol',
        effort: 'auto',
        speed: 'default'
      },
      model_catalog: { codex: { sol: 'gpt-5.6-sol' } },
      effort_by_transport: {}
    }
  },
  orchestration: {
    runtime: 'claude',
    model: 'opus',
    model_id: 'opus',
    effort: null,
    speed: 'default'
  }
};

/**
 * A `workspaces_state[]` row carrying every field Phase 1 added.
 *
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function state(patch = {}) {
  return {
    root_dir: WS_A,
    name: 'repo-a',
    issue_prefix: 'A',
    revision: 1,
    slots: 2,
    serial_lane_count: 1,
    auto_advance: false,
    auto_merge: false,
    auto_repair: false,
    orchestration_model: null,
    orchestration_effort: null,
    orchestration_speed: null,
    runner_catalog: CATALOG,
    execution_defaults: EXECUTION_DEFAULTS,
    session_defaults: {},
    session_defaults_warnings: [],
    counts: { running: 0, pr_wait: 0, queue: 0, runnable: 0 },
    ...patch
  };
}

/** @type {Array<ReturnType<typeof createRepoDeck>>} */
const active = [];

/**
 * @param {{ rows?: any[], done?: any[], transport?: (type: string, payload: any) => any }} [input]
 */
function setup(input = {}) {
  document.body.innerHTML = '<div id="d"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('d'));
  let rows = input.rows || [state()];
  /** @type {Array<[string, any]>} */
  const calls = [];
  const transport = vi.fn(
    async (/** @type {string} */ type, /** @type {any} */ payload) => {
      calls.push([type, payload]);
      return input.transport ? await input.transport(type, payload) : null;
    }
  );
  const gotoWorkerTab = vi.fn();
  const onFocusChange = vi.fn();
  const deck = createRepoDeck(mount, {
    workspacesState: () => rows,
    doneItems: () => input.done || [],
    rangeLabel: () => '오늘',
    transport,
    implPresetStore: { get: () => ({ revision: 1, presets: [] }) },
    gotoWorkerTab,
    onFocusChange
  });
  active.push(deck);
  return {
    mount,
    deck,
    calls,
    transport,
    gotoWorkerTab,
    onFocusChange,
    setRows: (/** @type {any[]} */ next) => {
      rows = next;
    }
  };
}

/**
 * @param {HTMLElement} mount
 * @param {string} selector
 * @returns {HTMLElement}
 */
function el(mount, selector) {
  return /** @type {HTMLElement} */ (mount.querySelector(selector));
}

/**
 * @param {HTMLElement} mount
 * @param {string} selector
 */
function click(mount, selector) {
  el(mount, selector).dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

/** Let a switch op and its retry settle. */
async function settle() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  while (active.length > 0) {
    active.pop()?.destroy();
  }
});

describe('createRepoDeck classification (UI-thwe)', () => {
  test('draws a tile for a repo whose only pipeline is runnable candidates', () => {
    const { mount, deck } = setup({
      rows: [
        state({ counts: { running: 0, pr_wait: 0, queue: 0, runnable: 2 } })
      ]
    });

    deck.render();

    expect(el(mount, '.mon2-deck__tile')?.getAttribute('data-root-dir')).toBe(
      WS_A
    );
  });

  test('draws a repo with no pipeline as the same tile', () => {
    const { mount, deck } = setup();

    deck.render();

    expect(el(mount, '.mon2-deck__tile')?.getAttribute('data-root-dir')).toBe(
      WS_A
    );
    expect(el(mount, '.mon2-deck__quiet')).toBe(null);
    expect(el(mount, '.mon2-deck__pill')).toBe(null);
  });

  test('draws every visible repo as a tile in snapshot order', () => {
    const { mount, deck } = setup({
      rows: [
        state({ counts: { running: 1, pr_wait: 0, queue: 0, runnable: 0 } }),
        state({
          root_dir: WS_B,
          name: 'repo-b',
          counts: { running: 0, pr_wait: 0, queue: 0, runnable: 0 }
        })
      ]
    });

    deck.render();

    expect(
      Array.from(mount.querySelectorAll('.mon2-deck__tile')).map((tile) =>
        tile.getAttribute('data-root-dir')
      )
    ).toEqual([WS_A, WS_B]);
  });
});

describe('createRepoDeck tile content (§4.2)', () => {
  test('fills one rail cell per running session and dots the rest', () => {
    const { mount, deck } = setup({
      rows: [
        state({
          slots: 3,
          counts: { running: 2, pr_wait: 1, queue: 4, runnable: 0 }
        })
      ]
    });

    deck.render();

    const cells = mount.querySelectorAll('.mon2-deck__tile .mon2-deck__slot');
    expect(cells).toHaveLength(3);
    expect(
      Array.from(cells).map((cell) => cell.classList.contains('is-run'))
    ).toEqual([true, true, false]);
    expect(
      el(mount, '.mon2-deck__counts').textContent?.replace(/\s+/g, ' ').trim()
    ).toBe('2/3 실행 · 대기 4 · PR 1');
  });

  test('widens the rail past the cap when more sessions run than slots', () => {
    const { mount, deck } = setup({
      rows: [
        state({
          slots: 1,
          counts: { running: 2, pr_wait: 0, queue: 0, runnable: 0 }
        })
      ]
    });

    deck.render();

    expect(
      mount.querySelectorAll('.mon2-deck__tile .mon2-deck__slot')
    ).toHaveLength(2);
  });

  test('renders the orchestration and worker chips from the row projections', () => {
    const { mount, deck } = setup({
      rows: [
        state({
          orchestration_model: 'opus',
          session_defaults: { impl_runtime: 'codex', impl_model: 'sol' },
          counts: { running: 1, pr_wait: 0, queue: 0, runnable: 0 }
        })
      ]
    });

    deck.render();

    const chips = Array.from(mount.querySelectorAll('.mon2-deck__chip')).map(
      (chip) => chip.textContent?.replace(/\s+/g, ' ').trim()
    );
    expect(chips[0]).toContain('오케');
    expect(chips[0]).toContain('opus');
    expect(chips[1]).toContain('워커');
    expect(chips[1]).toContain('codex');
  });

  test('omits the chip row entirely on an older server payload (§12)', () => {
    const row = state({
      counts: { running: 1, pr_wait: 0, queue: 0, runnable: 0 }
    });
    delete row.session_defaults;
    delete row.execution_defaults;
    const { mount, deck } = setup({ rows: [row] });

    deck.render();

    expect(el(mount, '.mon2-deck__chips')).toBe(null);
    expect(el(mount, '.mon2-deck__tile')).toBeTruthy();
    expect(el(mount, '.mon2-deck__counts').textContent).toContain('1/2 실행');
  });

  test('sends the Worker ↗ click to the repo it belongs to', () => {
    const { mount, deck, gotoWorkerTab } = setup({
      rows: [
        state({ counts: { running: 1, pr_wait: 0, queue: 0, runnable: 0 } })
      ]
    });

    deck.render();
    click(mount, '.mon2-deck__tile .mon2-deck__worker');

    expect(gotoWorkerTab).toHaveBeenCalledWith(WS_A);
  });
});

describe('createRepoDeck totals (§4.1)', () => {
  test('adds every repo count and the period completion count', () => {
    const { mount, deck } = setup({
      rows: [
        state({ counts: { running: 1, pr_wait: 2, queue: 3, runnable: 0 } }),
        state({
          root_dir: WS_B,
          name: 'repo-b',
          counts: { running: 2, pr_wait: 0, queue: 1, runnable: 0 }
        })
      ],
      done: [{ usage: null }, { usage: null }]
    });

    deck.render();

    expect(
      el(mount, '.mon2-deck__total-counts').textContent?.replace(/\s+/g, ' ')
    ).toContain('실행 3 · 대기 4 · PR 2 · 오늘 완료 2');
  });

  test('shows one token badge per provider with its own tooltip', () => {
    const { mount, deck } = setup({
      done: [
        {
          usage: {
            providers: {
              claude: { subtotal: 1000, breakdown: { input_tokens: 1000 } },
              codex: { subtotal: 2000, breakdown: { input_tokens: 2000 } }
            },
            roles: {}
          }
        }
      ]
    });

    deck.render();

    const badges = Array.from(mount.querySelectorAll('.mon2-deck__tok'));
    expect(badges.map((b) => b.getAttribute('data-provider'))).toEqual([
      'claude',
      'codex'
    ]);
    expect(badges[0].textContent).toContain('τ');
  });

  test('draws no master automation toggle', () => {
    const { mount, deck } = setup({
      rows: [
        state({ counts: { running: 1, pr_wait: 0, queue: 0, runnable: 0 } })
      ]
    });

    deck.render();

    expect(el(mount, '.mon-auto-all')).toBe(null);
    expect(el(mount, '[data-act="auto-all"]')).toBe(null);
  });
});

describe('createRepoDeck switches (§4.2·§12)', () => {
  /** @returns {ReturnType<typeof setup>} */
  function withActiveRepo(extra = {}) {
    return setup({
      rows: [
        state({
          counts: { running: 1, pr_wait: 0, queue: 0, runnable: 0 },
          ...extra
        })
      ]
    });
  }

  test('toggles automation for that repo under its own revision', async () => {
    const { mount, deck, calls } = withActiveRepo();

    deck.render();
    click(mount, '.mon2-deck__auto');
    await settle();

    expect(calls).toEqual([
      [
        'worker-automation-toggle',
        { on: true, root_dir: WS_A, expected_revision: 1 }
      ]
    ]);
  });

  test('toggles auto-merge OFF when the row says it is on', async () => {
    const { mount, deck, calls } = withActiveRepo({ auto_merge: true });

    deck.render();
    click(mount, '.mon2-deck__merge');
    await settle();

    expect(calls[0]).toEqual([
      'worker-merge-auto-toggle',
      { on: false, root_dir: WS_A, expected_revision: 1 }
    ]);
  });

  test('retries a conflicted switch once with the response revision', async () => {
    let seen = 0;
    const { mount, deck, calls } = setup({
      rows: [
        state({ counts: { running: 1, pr_wait: 0, queue: 0, runnable: 0 } })
      ],
      transport: async () => {
        seen += 1;
        return seen === 1
          ? { conflict: true, queue: { revision: 7 } }
          : { applied: true, queue: { revision: 8 } };
      }
    });

    deck.render();
    click(mount, '.mon2-deck__auto');
    await settle();

    expect(calls.map(([, payload]) => payload.expected_revision)).toEqual([
      1, 7
    ]);
  });
});

describe('createRepoDeck focus filter (§4.2)', () => {
  /** @returns {ReturnType<typeof setup>} */
  function twoActive() {
    return setup({
      rows: [
        state({ counts: { running: 1, pr_wait: 0, queue: 0, runnable: 0 } }),
        state({
          root_dir: WS_B,
          name: 'repo-b',
          counts: { running: 1, pr_wait: 0, queue: 0, runnable: 0 }
        })
      ]
    });
  }

  test('exposes each tile as a keyboard-reachable button', () => {
    const { mount, deck } = twoActive();

    deck.render();

    const tile = el(mount, '.mon2-deck__tile');
    expect(tile.getAttribute('role')).toBe('button');
    expect(tile.getAttribute('tabindex')).toBe('0');
  });

  test('reports the clicked repo and marks only that tile', () => {
    const { mount, deck, onFocusChange } = twoActive();

    deck.render();
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"]`);

    expect(onFocusChange).toHaveBeenCalledWith(WS_A);
    expect(deck.focusRoot()).toBe(WS_A);
    expect(
      el(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"]`).classList
    ).toContain('is-focus');
    expect(
      el(mount, `.mon2-deck__tile[data-root-dir="${WS_B}"]`).classList
    ).not.toContain('is-focus');
  });

  test('clears the focus when the same tile is clicked again', () => {
    const { mount, deck } = twoActive();

    deck.render();
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"]`);
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"]`);

    expect(deck.focusRoot()).toBe(null);
  });

  test('toggles the focus from Enter and Space on the tile', () => {
    const { mount, deck } = twoActive();

    deck.render();
    const tile = el(mount, `.mon2-deck__tile[data-root-dir="${WS_B}"]`);
    tile.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    );
    expect(deck.focusRoot()).toBe(WS_B);

    el(mount, `.mon2-deck__tile[data-root-dir="${WS_B}"]`).dispatchEvent(
      new KeyboardEvent('keydown', { key: ' ', bubbles: true })
    );
    expect(deck.focusRoot()).toBe(null);
  });

  test('releases the focus on Escape', () => {
    const { mount, deck, onFocusChange } = twoActive();

    deck.render();
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"]`);
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );

    expect(deck.focusRoot()).toBe(null);
    expect(onFocusChange).toHaveBeenLastCalledWith(null);
  });

  test('releases the focus when the repo leaves the visible set', () => {
    const { deck, setRows, onFocusChange, mount } = twoActive();

    deck.render();
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"]`);
    setRows([
      state({
        root_dir: WS_B,
        name: 'repo-b',
        counts: { running: 1, pr_wait: 0, queue: 0, runnable: 0 }
      })
    ]);
    deck.render();

    expect(deck.focusRoot()).toBe(null);
    expect(onFocusChange).toHaveBeenLastCalledWith(null);
  });
});

describe('createRepoDeck settings panel (§4.4)', () => {
  /** @returns {ReturnType<typeof setup>} */
  function twoActive() {
    return setup({
      rows: [
        state({ counts: { running: 1, pr_wait: 0, queue: 0, runnable: 0 } }),
        state({
          root_dir: WS_B,
          name: 'repo-b',
          revision: 5,
          counts: { running: 1, pr_wait: 0, queue: 0, runnable: 0 }
        })
      ]
    });
  }

  test('mounts the shared execution pane bound to that repo', async () => {
    const { mount, deck, calls } = twoActive();

    deck.render();
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_B}"] .mon2-deck__gear`);
    await settle();

    expect(el(mount, '.mon2-deck__panel-title').textContent).toContain(
      'repo-b 실행 설정'
    );
    expect(el(mount, '.mon2-deck__panel-body [data-automation]')).toBeTruthy();
    expect(calls).toContainEqual(['get-session-defaults', { root_dir: WS_B }]);
  });

  test('replaces the pane when another repo gear is clicked', async () => {
    const { mount, deck, calls } = twoActive();

    deck.render();
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_B}"] .mon2-deck__gear`);
    await settle();
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"] .mon2-deck__gear`);
    await settle();

    expect(deck.panelRoot()).toBe(WS_A);
    expect(el(mount, '.mon2-deck__panel-title').textContent).toContain(
      'repo-a 실행 설정'
    );
    expect(
      calls.filter(([type]) => type === 'get-session-defaults')
    ).toHaveLength(2);
  });

  test('closes and destroys the pane from the ✕', async () => {
    const { mount, deck } = twoActive();

    deck.render();
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"] .mon2-deck__gear`);
    await settle();
    click(mount, '.mon2-deck__panel-close');

    expect(deck.panelRoot()).toBe(null);
    expect(el(mount, '.mon2-deck__panel-body')?.children).toHaveLength(0);
    expect(
      /** @type {HTMLElement} */ (el(mount, '.mon2-deck__panel')).hidden
    ).toBe(true);
  });

  test('destroy empties the mount and stops listening for Escape', async () => {
    const { mount, deck } = twoActive();

    deck.render();
    click(mount, `.mon2-deck__tile[data-root-dir="${WS_A}"]`);
    deck.destroy();
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );

    expect(mount.children).toHaveLength(0);
  });
});

describe('createRepoDeck 세션 counts (UI-yrzu §8)', () => {
  test('says nothing about sessions when a repo has none', () => {
    const { mount, deck } = setup({
      rows: [
        state({
          counts: {
            running: 1,
            pr_wait: 0,
            queue: 2,
            runnable: 0,
            session_active: 0
          }
        })
      ]
    });

    deck.render();

    expect(el(mount, '.mon2-deck__counts').textContent).not.toContain('세션');
    expect(el(mount, '.mon2-deck__total-counts').textContent).not.toContain(
      '세션'
    );
  });

  test('adds the session count to a repo tile and to the totals', () => {
    const { mount, deck } = setup({
      rows: [
        state({
          counts: {
            running: 1,
            pr_wait: 0,
            queue: 2,
            runnable: 0,
            session_active: 2
          }
        }),
        state({
          root_dir: WS_B,
          name: 'repo-b',
          counts: {
            running: 0,
            pr_wait: 0,
            queue: 0,
            runnable: 0,
            session_active: 1
          }
        })
      ]
    });

    deck.render();

    const tiles = Array.from(mount.querySelectorAll('.mon2-deck__counts'));
    expect(tiles[0].textContent?.replace(/\s+/g, ' ')).toContain(
      '대기 2 · PR 0 · 세션 2'
    );
    expect(
      el(mount, '.mon2-deck__total-counts').textContent?.replace(/\s+/g, ' ')
    ).toContain('실행 1 · 대기 2 · PR 0 · 세션 3 · 오늘 완료 0');
  });

  test('omits the session count for an older server that sends no key', () => {
    const { mount, deck } = setup({
      rows: [state({ counts: { running: 1, pr_wait: 0, queue: 0 } })]
    });

    deck.render();

    expect(el(mount, '.mon2-deck__counts').textContent).not.toContain('세션');
  });
});
