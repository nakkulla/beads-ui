import { describe, expect, test, vi } from 'vitest';
import { createAdrView } from './index.js';

/** Let pending microtasks run. */
function settle() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * @param {number | string} id
 * @param {Partial<Record<string, any>>} [extra]
 */
function adr(id, extra = {}) {
  const num = typeof id === 'number' ? String(id).padStart(4, '0') : id;
  return {
    file: `${num}-decision.md`,
    id,
    title: `결정 ${id}`,
    status: 'accepted',
    date: '2026-01-01',
    summary: `summary ${id}`,
    supersedes: [],
    superseded_by: null,
    superseded_by_note: null,
    spec: null,
    bead: null,
    ...extra
  };
}

/**
 * @param {Partial<Record<string, any>>} [extra]
 */
function workspace(extra = {}) {
  return {
    root_dir: '/repo/a',
    name: 'a',
    name_duplicate: false,
    computing: false,
    computed_at: null,
    env_errors: { index: null, citations: null, candidates: null },
    adr_dir_missing: false,
    current: [],
    history: [],
    frontmatter_errors: [],
    index_drift: { ok: true, detail: null },
    citations_stale: [],
    candidates: [],
    cross_citations: [],
    ...extra
  };
}

/**
 * @param {any[]} workspaces
 * @param {Record<string, any>} [options]
 */
function mount(workspaces, options = {}) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const store = {
    get: () => ({ workspaces }),
    subscribe: () => () => {}
  };
  const view = createAdrView(root, { adrStore: store, ...options });
  return { root, view };
}

/**
 * @param {HTMLElement} root
 * @param {string} selector
 */
function texts(root, selector) {
  return Array.from(root.querySelectorAll(selector)).map((el) =>
    (el.textContent || '').replace(/\s+/g, ' ').trim()
  );
}

describe('screens/adr toolbar', () => {
  test('filters the sections down to the pressed repository', () => {
    const { root } = mount([
      workspace({ current: [adr(1)] }),
      workspace({ root_dir: '/repo/b', name: 'b', current: [adr(2)] })
    ]);

    const button = /** @type {HTMLElement} */ (
      root.querySelector('.adr-filter[data-repo="/repo/b"]')
    );
    button.click();

    expect(texts(root, '.adr-ws h2')).toEqual(['b']);
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  test('opens on the current workspace with the other repositories filtered out', () => {
    const { root } = mount(
      [
        workspace({ current: [adr(1)] }),
        workspace({ root_dir: '/repo/b', name: 'b', current: [adr(2)] })
      ],
      { getWorkspacePath: () => '/repo/b' }
    );

    expect(texts(root, '.adr-ws h2')).toEqual(['b']);
    expect(
      root
        .querySelector('.adr-filter[data-repo="/repo/b"]')
        ?.getAttribute('aria-pressed')
    ).toBe('true');
  });

  /**
   * Mount with a workspace subscription and NO snapshot re-push: the ADR
   * snapshot is server-global, so a project switch never resends it.
   */
  function mountFollowing() {
    const state = { current: '/repo/a' };
    /** @type {(() => void)[]} */
    const listeners = [];
    const workspaces = [
      workspace({ current: [adr(1)] }),
      workspace({ root_dir: '/repo/b', name: 'b', current: [adr(2)] })
    ];
    const root = document.createElement('div');
    document.body.appendChild(root);
    const view = createAdrView(root, {
      adrStore: { get: () => ({ workspaces }), subscribe: () => () => {} },
      getWorkspacePath: () => state.current,
      subscribeWorkspace: (fn) => {
        listeners.push(fn);
        return () => {
          listeners.splice(listeners.indexOf(fn), 1);
        };
      }
    });
    return {
      root,
      view,
      listeners,
      /** @param {string} path */
      switchTo(path) {
        state.current = path;
        listeners.forEach((fn) => fn());
      }
    };
  }

  test('follows a workspace switch without a new snapshot until a filter is pressed', () => {
    const { root, switchTo } = mountFollowing();

    switchTo('/repo/b');

    expect(texts(root, '.adr-ws h2')).toEqual(['b']);
    expect(
      root
        .querySelector('.adr-filter[data-repo="/repo/b"]')
        ?.getAttribute('aria-pressed')
    ).toBe('true');
  });

  test('keeps the pressed 전체 filter across a workspace switch', () => {
    const { root, switchTo } = mountFollowing();
    /** @type {HTMLElement} */ (
      root.querySelector('.adr-filter:not([data-repo])')
    ).click();

    switchTo('/repo/b');

    expect(texts(root, '.adr-ws h2')).toEqual(['a', 'b']);
  });

  test('ignores app-state changes that leave the workspace alone', () => {
    const { root, listeners } = mountFollowing();
    const before = root.innerHTML;
    /** @type {HTMLInputElement} */ (root.querySelector('.adr-search')).value =
      'x';

    listeners.forEach((fn) => fn());

    expect(root.innerHTML).toBe(before);
    expect(
      /** @type {HTMLInputElement} */ (root.querySelector('.adr-search')).value
    ).toBe('x');
  });

  test('stops listening to the workspace on destroy', () => {
    const { view, listeners } = mountFollowing();

    view.destroy();

    expect(listeners).toEqual([]);
  });

  test('shows every repository when the current workspace is not in the snapshot', () => {
    const { root } = mount([workspace({ current: [adr(1)] })], {
      getWorkspacePath: () => '/repo/other'
    });

    expect(texts(root, '.adr-ws h2')).toEqual(['a']);
  });

  test('searches number, title, summary, spec and bead', () => {
    const { root } = mount([
      workspace({
        current: [
          adr(1, { title: '가나다' }),
          adr(2, { bead: 'UI-8uz7', summary: '' })
        ]
      })
    ]);

    const input = /** @type {HTMLInputElement} */ (
      root.querySelector('.adr-search')
    );
    input.value = 'ui-8uz7';
    input.dispatchEvent(new Event('input'));

    expect(texts(root, '.adr-list--current .adr-num')).toEqual(['2']);
  });

  test('puts rows carrying a signal first while stale 우선 is pressed', () => {
    const { root } = mount([
      workspace({
        current: [adr(9), adr(3)],
        citations_stale: [
          {
            kind: 'retired',
            file: 'AGENTS.md',
            line: 4,
            adr: 3,
            detail: 'retired'
          }
        ]
      })
    ]);

    expect(texts(root, '.adr-list--current .adr-num')).toEqual(['3', '9']);

    const toggle = /** @type {HTMLElement} */ (root.querySelector('.adr-sort'));
    toggle.click();

    expect(texts(root, '.adr-list--current .adr-num')).toEqual(['9', '3']);
  });

  test('puts legacy numbers ahead of string ids in the current table', () => {
    const { root } = mount([
      workspace({
        current: [
          adr('dotfiles-60u8', { date: '2026-09-09' }),
          adr('dotfiles-60u8-2', { date: '2026-09-10' }),
          adr(45)
        ]
      })
    ]);

    expect(texts(root, '.adr-list--current .adr-num')).toEqual([
      '45',
      'dotfiles-60u8-2',
      'dotfiles-60u8'
    ]);
  });

  test('breaks a string id date tie by the id text ascending', () => {
    const { root } = mount([
      workspace({
        current: [
          adr('dotfiles-60u8-2', { date: '2026-09-09' }),
          adr('dotfiles-60u8', { date: '2026-09-09' })
        ]
      })
    ]);

    expect(texts(root, '.adr-list--current .adr-num')).toEqual([
      'dotfiles-60u8',
      'dotfiles-60u8-2'
    ]);
  });

  test('puts legacy numbers ahead of string ids in the history list', () => {
    const { root } = mount([
      workspace({
        history: [
          adr('dotfiles-60u8', { status: 'superseded', date: '2026-09-09' }),
          adr(45, { status: 'superseded' })
        ]
      })
    ]);

    expect(texts(root, '.adr-list--history .adr-num')).toEqual([
      '45',
      'dotfiles-60u8'
    ]);
  });

  test('keeps the stale 우선 toggle working across mixed identifiers', () => {
    const { root } = mount([
      workspace({
        current: [adr(45), adr('dotfiles-60u8', { date: '2026-09-09' })],
        citations_stale: [
          {
            kind: 'retired',
            file: 'AGENTS.md',
            line: 4,
            adr: 'dotfiles-60u8',
            detail: 'retired'
          }
        ]
      })
    ]);

    expect(texts(root, '.adr-list--current .adr-num')).toEqual([
      'dotfiles-60u8',
      '45'
    ]);

    const toggle = /** @type {HTMLElement} */ (root.querySelector('.adr-sort'));
    toggle.click();

    expect(texts(root, '.adr-list--current .adr-num')).toEqual([
      '45',
      'dotfiles-60u8'
    ]);
  });
});

describe('screens/adr counts', () => {
  test('heads a repository with its current and history counts', () => {
    const { root } = mount([
      workspace({
        current: [adr(1), adr(2)],
        history: [adr(0, { status: 'superseded' })]
      })
    ]);

    expect(texts(root, '.adr-ws__counts')).toEqual(['현재 2 · 이력 1']);
  });

  test('omits every zero count chip from the 인용 popup', () => {
    const { root } = mount([workspace({ current: [adr(1)] })]);

    /** @type {HTMLElement} */ (
      root.querySelector('[data-signal="cite"]')
    ).click();

    expect(texts(root, '.adr-pop .adr-counts .adr-chip')).toEqual([]);
  });

  test('counts unknown and adr_status kinds under 기타', () => {
    const { root } = mount([
      workspace({
        candidates: [
          {
            spec: 'docs/superpowers/specs/s.md',
            ok: false,
            errors: [
              { kind: 'adr_status', file: 's.md', line: 1, adr: 7, detail: '' },
              {
                kind: 'brand_new',
                file: 's.md',
                line: 2,
                adr: null,
                detail: ''
              }
            ]
          }
        ]
      })
    ]);

    /** @type {HTMLElement} */ (
      root.querySelector('[data-signal="cite"]')
    ).click();

    expect(texts(root, '.adr-pop .adr-counts .adr-chip')).toContain('기타 2');
  });

  test('draws an unknown kind chip as 기타 and a file-less row without a link', () => {
    const { root } = mount([
      workspace({
        citations_stale: [{ kind: 'unknown', detail: 'checker said no' }],
        candidates: [
          {
            spec: 'docs/superpowers/specs/s.md',
            ok: false,
            errors: [
              {
                kind: 'brand_new',
                file: 's.md',
                line: 2,
                adr: null,
                detail: ''
              }
            ]
          }
        ]
      })
    ]);

    expect(texts(root, '.adr-sec--cite .adr-chip--kind')).toEqual(['기타']);
    expect(root.querySelectorAll('.adr-sec--cite .adr-doc').length).toBe(0);
    expect(root.textContent).not.toContain('undefined');
    expect(root.textContent).not.toContain('brand_new');
  });

  test('shows 계산 중 while a repository is computing', () => {
    const { root } = mount([workspace({ computing: true })]);

    expect(texts(root, '.adr-ws__state')).toEqual(['계산 중']);
  });
});

describe('screens/adr signal badges', () => {
  test('reads 색인 ✓ and 인용 ✓ on a clean repository', () => {
    const { root } = mount([workspace({ current: [adr(1)] })]);

    expect(texts(root, '.adr-ws__hd .adr-badge')).toEqual(['색인 ✓', '인용 ✓']);
  });

  test('warns on the 색인 badge while the index drifts', () => {
    const { root } = mount([
      workspace({ index_drift: { ok: false, detail: 'index is stale' } })
    ]);

    const badge = root.querySelector('[data-signal="index"]');
    expect(badge?.textContent?.trim()).toBe('색인 ⚠');
    expect(badge?.classList.contains('is-warn')).toBe(true);
  });

  test('marks a checker environment error on its badge', () => {
    const { root } = mount([
      workspace({
        env_errors: {
          index: 'adr-index.py: python3 not found',
          citations: null,
          candidates: null
        }
      })
    ]);

    expect(
      root.querySelector('[data-signal="index"]')?.textContent?.trim()
    ).toBe('색인 · 환경');
  });

  test('counts citation and candidate errors on the 인용 badge', () => {
    const { root } = mount([
      workspace({
        current: [adr(3)],
        citations_stale: [
          { kind: 'retired', file: 'AGENTS.md', line: 4, adr: 3, detail: 'r' }
        ],
        candidates: [
          {
            spec: 'docs/superpowers/specs/s.md',
            ok: false,
            errors: [
              {
                kind: 'adr_missing',
                file: 's.md',
                line: 1,
                adr: null,
                detail: ''
              }
            ]
          }
        ]
      })
    ]);

    expect(
      root.querySelector('[data-signal="cite"]')?.textContent?.trim()
    ).toBe('인용 ⚠ 2');
  });

  test('opens the checker errors of the 인용 badge in a popup', () => {
    const { root } = mount([
      workspace({
        citations_stale: [
          {
            kind: 'missing',
            file: 'AGENTS.md',
            line: 12,
            adr: 3,
            detail: 'no such ADR'
          }
        ],
        candidates: [
          {
            spec: 'docs/superpowers/specs/open.md',
            ok: false,
            errors: [
              {
                kind: 'adr_missing',
                file: 'open.md',
                line: 2,
                adr: null,
                detail: 'no ADR'
              }
            ]
          }
        ],
        cross_citations: [
          {
            file: 'docs/adr/0001-a.md',
            line: 1,
            repo: 'dotfiles',
            adr: 45,
            target: null
          }
        ]
      })
    ]);

    /** @type {HTMLElement} */ (
      root.querySelector('[data-signal="cite"]')
    ).click();

    expect(texts(root, '.adr-pop .adr-err')).toEqual([
      'AGENTS.md:12 ADR 3 missing no such ADR',
      'docs/superpowers/specs/open.md adr_missing no ADR',
      'docs/adr/0001-a.md:1 → ADR dotfiles/0045 미확인'
    ]);
  });

  test('opens the drift detail and frontmatter errors of the 색인 badge', () => {
    const { root } = mount([
      workspace({
        index_drift: { ok: false, detail: 'index is stale' },
        frontmatter_errors: [{ file: '0009-old.md', error: 'bad date' }]
      })
    ]);

    /** @type {HTMLElement} */ (
      root.querySelector('[data-signal="index"]')
    ).click();

    expect(texts(root, '.adr-pop .adr-err')).toEqual([
      'index is stale',
      '0009-old.md bad date'
    ]);
  });

  test('closes the popup on a second click of its badge', () => {
    const { root } = mount([workspace({ current: [adr(1)] })]);
    const badge = /** @type {HTMLElement} */ (
      root.querySelector('[data-signal="cite"]')
    );
    badge.click();

    /** @type {HTMLElement} */ (
      root.querySelector('[data-signal="cite"]')
    ).click();

    expect(root.querySelector('.adr-pop')).toBeNull();
  });

  test('closes the popup on Escape', () => {
    const { root } = mount([workspace({ current: [adr(1)] })]);
    /** @type {HTMLElement} */ (
      root.querySelector('[data-signal="cite"]')
    ).click();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(root.querySelector('.adr-pop')).toBeNull();
  });

  test('draws no badge for a repository without an ADR directory', () => {
    const { root } = mount([workspace({ adr_dir_missing: true })]);

    expect(root.querySelectorAll('.adr-badge').length).toBe(0);
  });
});

describe('screens/adr current decisions', () => {
  test('folds the history under 이력 n건 보기', () => {
    const { root } = mount([
      workspace({
        current: [adr(2)],
        history: [adr(1, { status: 'superseded', superseded_by: 2 })]
      })
    ]);

    const history = /** @type {HTMLDetailsElement} */ (
      root.querySelector('.adr-history')
    );
    expect(history.open).toBe(false);
    expect(texts(root, '.adr-history > summary')).toEqual(['이력 1건 보기']);
  });

  test('opens the decision document from a click on its row', () => {
    const openDoc = vi.fn();
    const { root } = mount([workspace({ current: [adr(12)] })], { openDoc });

    /** @type {HTMLElement} */ (
      root.querySelector('.adr-item[data-adr="12"] .adr-date')
    ).click();

    expect(openDoc).toHaveBeenCalledWith(
      { path: 'docs/adr/0012-decision.md', missing_state: null },
      '/repo/a'
    );
  });

  test('keeps ID, title, summary and date on one decision line', () => {
    const { root } = mount([
      workspace({ current: [adr(12, { date: '2026-09-03' })] })
    ]);

    const item = /** @type {HTMLElement} */ (
      root.querySelector('.adr-list--current .adr-item')
    );
    expect(texts(item, '.adr-num')).toEqual(['12']);
    expect(texts(item, '.adr-title__top')).toEqual(['결정 12']);
    expect(texts(item, '.adr-title__summary')).toEqual(['summary 12']);
    expect(texts(item, '.adr-date')).toEqual(['2026-09-03']);
  });
});

describe('screens/adr signals', () => {
  test('joins signal chips onto the row with the same ADR number', () => {
    const { root } = mount([
      workspace({
        current: [adr(12), adr(11)],
        citations_stale: [
          {
            kind: 'retired',
            file: 'AGENTS.md',
            line: 3,
            adr: 12,
            detail: 'x'
          }
        ],
        candidates: [
          {
            spec: 'docs/superpowers/specs/s.md',
            ok: false,
            errors: [
              {
                kind: 'adr_missing',
                file: 's.md',
                line: 1,
                adr: 12,
                detail: ''
              }
            ]
          }
        ]
      })
    ]);

    const rows = root.querySelectorAll('.adr-list--current .adr-item');
    expect(rows[0].getAttribute('data-adr')).toBe('12');
    expect(texts(/** @type {HTMLElement} */ (rows[0]), '.adr-chip')).toEqual([
      '인용 stale 1',
      '후보 1'
    ]);
    expect(texts(/** @type {HTMLElement} */ (rows[1]), '.adr-chip')).toEqual(
      []
    );
  });

  test('shows a string ADR identifier on a citation error row', () => {
    const { root } = mount([
      workspace({
        citations_stale: [
          {
            kind: 'retired',
            file: 'AGENTS.md',
            line: 3,
            adr: 'dotfiles-60u8',
            detail: 'x'
          }
        ]
      })
    ]);

    expect(texts(root, '.adr-row__mid')).toEqual(['ADR dotfiles-60u8']);
  });

  test('keeps the summary and signal beside the title and shortens the spec path', () => {
    const { root } = mount([
      workspace({
        current: [
          adr(12, {
            spec: 'docs/superpowers/specs/2026-09-21-table-design.md'
          })
        ],
        citations_stale: [
          {
            kind: 'retired',
            file: 'AGENTS.md',
            line: 3,
            adr: 12,
            detail: 'x'
          }
        ]
      })
    ]);
    expect(texts(root, '.adr-list--current .adr-title__top')).toEqual([
      '결정 12 인용 stale 1'
    ]);
    expect(texts(root, '.adr-list--current .adr-title__summary')).toEqual([
      'summary 12'
    ]);
    expect(texts(root, '.adr-list--current .adr-spec')).toEqual([
      '2026-09-21-table-design.md'
    ]);
    expect(root.querySelector('.adr-list--current .adr-summary')).toBeNull();
  });
});

describe('screens/adr candidate section', () => {
  test('collapses specs that only carry section_missing', () => {
    const { root } = mount([
      workspace({
        candidates: [
          {
            spec: 'docs/superpowers/specs/pending.md',
            ok: false,
            errors: [
              {
                kind: 'section_missing',
                file: 'pending.md',
                line: null,
                adr: null,
                detail: ''
              }
            ]
          },
          {
            spec: 'docs/superpowers/specs/open.md',
            ok: false,
            errors: [
              {
                kind: 'adr_missing',
                file: 'open.md',
                line: 2,
                adr: null,
                detail: 'no ADR'
              }
            ]
          }
        ]
      })
    ]);

    expect(texts(root, '.adr-pending > summary')).toEqual(['이행 전 스펙 1']);
    expect(root.querySelector('.adr-candspec')?.getAttribute('data-spec')).toBe(
      'docs/superpowers/specs/open.md'
    );
  });

  test('marks a spec whose own usage error is local with 환경', () => {
    const { root } = mount([
      workspace({
        candidates: [
          {
            spec: 'docs/superpowers/specs/u.md',
            ok: false,
            errors: [
              {
                kind: 'usage',
                file: 'u.md',
                line: null,
                adr: null,
                detail: 'bad flag'
              },
              {
                kind: 'token_missing',
                file: 'u.md',
                line: 3,
                adr: null,
                detail: ''
              }
            ]
          }
        ]
      })
    ]);

    expect(texts(root, '.adr-chip--env')).toEqual(['환경']);
  });
});

describe('screens/adr environment errors', () => {
  test('replaces only the failing checker section and keeps cross citations', () => {
    const { root } = mount([
      workspace({
        env_errors: {
          index: null,
          citations: 'adr-cite-check.py: python3 not found',
          candidates: null
        },
        citations_stale: [],
        index_drift: { ok: false, detail: 'index is stale' },
        cross_citations: [
          {
            file: 'docs/adr/0001-x.md',
            line: 9,
            repo: 'dotfiles',
            adr: 45,
            target: { root_dir: '/repo/dotfiles', status: 'accepted' }
          }
        ]
      })
    ]);

    expect(texts(root, '.adr-sec--cite .adr-env')).toEqual([
      '환경 · adr-cite-check.py: python3 not found'
    ]);
    expect(texts(root, '.adr-sec--drift .adr-drift')).toEqual([
      'index is stale'
    ]);
    expect(root.querySelectorAll('.adr-sec--cross .adr-row').length).toBe(1);
  });

  test('omits every signal section when docs/adr is missing', () => {
    const { root } = mount([
      workspace({
        adr_dir_missing: true,
        index_drift: null,
        cross_citations: []
      })
    ]);

    expect(root.querySelectorAll('.adr-sec').length).toBe(0);
    expect(root.querySelectorAll('.adr-list').length).toBe(0);
  });
});

describe('screens/adr cross citations', () => {
  test('tones the status chip by the target ADR status', () => {
    const { root } = mount([
      workspace({
        cross_citations: [
          {
            file: 'docs/adr/0001-a.md',
            line: 1,
            repo: 'dotfiles',
            adr: 45,
            target: { root_dir: '/d', status: 'accepted' }
          },
          {
            file: 'docs/adr/0002-b.md',
            line: 2,
            repo: 'dotfiles',
            adr: 46,
            target: { root_dir: '/d', status: 'superseded' }
          },
          {
            file: 'docs/adr/0003-c.md',
            line: 3,
            repo: 'gone',
            adr: 47,
            target: null
          }
        ]
      })
    ]);

    const chips = Array.from(root.querySelectorAll('.adr-chip--cross'));
    expect(chips.map((c) => c.className.split(' ').pop())).toEqual([
      'is-ok',
      'is-warn',
      'is-unknown'
    ]);
    expect(chips[2].textContent?.trim()).toBe('미확인');
  });

  test('pads only a legacy number and shows a string identifier verbatim', () => {
    const { root } = mount([
      workspace({
        cross_citations: [
          {
            file: 'docs/adr/0001-a.md',
            line: 1,
            repo: 'dotfiles',
            adr: 45,
            target: { root_dir: '/d', status: 'accepted' }
          },
          {
            file: 'docs/adr/0002-b.md',
            line: 2,
            repo: 'dotfiles',
            adr: 'a-1',
            target: null
          }
        ]
      })
    ]);

    expect(texts(root, '.adr-sec--cross .adr-row__mid')).toEqual([
      '→ ADR dotfiles/0045',
      '→ ADR dotfiles/a-1'
    ]);
  });
});

describe('screens/adr legacy-only regression', () => {
  test('renders a numeric-only workspace with the compact current row', () => {
    const { root } = mount([
      workspace({
        current: [
          adr(30, { date: '2026-09-01' }),
          adr(24, { date: '2026-09-03', supersedes: [9] })
        ],
        history: [
          adr(9, {
            status: 'superseded',
            date: '2026-01-01',
            superseded_by: 24
          })
        ],
        citations_stale: [
          {
            kind: 'retired',
            file: 'AGENTS.md',
            line: 4,
            adr: 24,
            detail: 'retired'
          }
        ]
      })
    ]);

    expect(texts(root, '.adr-list--current .adr-item')).toEqual([
      '24 결정 24 인용 stale 1 summary 24 2026-09-03',
      '30 결정 30 summary 30 2026-09-01'
    ]);
    expect(texts(root, '.adr-list--history .adr-item')).toEqual([
      '9 결정 9 superseded → 24'
    ]);
  });
});

describe('screens/adr links', () => {
  test('opens a docs path through openDoc and leaves other paths unlinked', () => {
    const openDoc = vi.fn();
    const { root } = mount(
      [
        workspace({
          citations_stale: [
            {
              kind: 'missing',
              file: 'AGENTS.md',
              line: 12,
              adr: 3,
              detail: 'no such ADR'
            },
            {
              kind: 'retired',
              file: 'docs/agents/policy.md',
              line: 4,
              adr: 5,
              detail: 'retired'
            }
          ]
        })
      ],
      { openDoc }
    );

    const links = root.querySelectorAll('.adr-sec--cite .adr-doc--link');
    /** @type {HTMLElement} */ (links[0]).click();

    expect(links.length).toBe(1);
    expect(texts(root, '.adr-sec--cite .adr-doc--plain')).toEqual([
      'AGENTS.md:12'
    ]);
    expect(openDoc).toHaveBeenCalledWith(
      { path: 'docs/agents/policy.md', missing_state: null },
      '/repo/a'
    );
  });

  test('switches the workspace before opening a bead from another repository', async () => {
    const switchWorkspace = vi.fn(async () => {});
    const gotoIssue = vi.fn();
    const { root } = mount(
      [workspace({ current: [adr(1, { bead: 'UI-1' })] })],
      {
        switchWorkspace,
        gotoIssue,
        getWorkspacePath: () => '/repo/other'
      }
    );

    /** @type {HTMLElement} */ (root.querySelector('.adr-bead')).click();
    await settle();

    expect(switchWorkspace).toHaveBeenCalledWith('/repo/a');
    expect(gotoIssue).toHaveBeenCalledWith('UI-1');
  });

  test('opens a bead directly when the row belongs to the current workspace', () => {
    const switchWorkspace = vi.fn();
    const gotoIssue = vi.fn();
    mount([workspace({ current: [adr(1, { bead: 'UI-1' })] })], {
      switchWorkspace,
      gotoIssue,
      getWorkspacePath: () => '/repo/a'
    });

    /** @type {HTMLElement} */ (
      document.querySelectorAll('.adr-bead')[
        document.querySelectorAll('.adr-bead').length - 1
      ]
    ).click();

    expect(switchWorkspace).not.toHaveBeenCalled();
    expect(gotoIssue).toHaveBeenCalledWith('UI-1');
  });
});

describe('screens/adr inspect section', () => {
  test('folds the checker signal sections into a closed 점검 details', () => {
    const { root } = mount([
      workspace({
        current: [adr(1)],
        index_drift: { ok: false, detail: 'drift' },
        cross_citations: [
          { file: 'docs/x.md', line: 1, repo: 'b', adr: 2, target: null }
        ]
      })
    ]);

    const inspect = /** @type {HTMLDetailsElement} */ (
      root.querySelector('.adr-inspect')
    );
    expect(inspect.open).toBe(false);
    expect(texts(root, '.adr-inspect > summary')).toEqual(['점검']);
    expect(inspect.querySelector('.adr-sec--drift')).not.toBeNull();
    expect(inspect.querySelector('.adr-sec--cross')).not.toBeNull();
    expect(root.querySelector('.adr-ws > .adr-sec')).toBeNull();
  });

  test('draws no 점검 area for a repository without an ADR directory', () => {
    const { root } = mount([workspace({ adr_dir_missing: true })]);

    expect(root.querySelector('.adr-inspect')).toBeNull();
  });
});

describe('screens/adr header', () => {
  test('marks a duplicate repository name', () => {
    const { root } = mount([workspace({ name_duplicate: true })]);

    expect(texts(root, '.adr-chip--dup')).toEqual(['이름 중복']);
  });
});

describe('screens/adr history directory', () => {
  test('links a history/ record and flags its frontmatter error in the history table', () => {
    const openDoc = vi.fn();
    const { root } = mount(
      [
        workspace({
          history: [
            adr(9, {
              file: 'history/0009-old.md',
              status: 'superseded',
              superseded_by: null
            })
          ],
          frontmatter_errors: [{ file: 'history/0009-old.md', error: 'bad' }]
        })
      ],
      { openDoc }
    );

    const link = /** @type {HTMLElement} */ (
      root.querySelector('.adr-list--history .adr-doc--link')
    );
    link.click();

    expect(openDoc).toHaveBeenCalledWith(
      { path: 'docs/adr/history/0009-old.md', missing_state: null },
      '/repo/a'
    );
    expect(texts(root, '.adr-list--history .adr-chip--signal')).toEqual([
      'frontmatter 오류'
    ]);
  });

  test('links a superseded_by target present in the snapshot and leaves a missing one as text', () => {
    const openDoc = vi.fn();
    const { root } = mount(
      [
        workspace({
          current: [adr(24)],
          history: [
            adr(9, {
              file: 'history/0009-a.md',
              status: 'superseded',
              superseded_by: 24
            }),
            adr(8, {
              file: 'history/0008-b.md',
              status: 'superseded',
              superseded_by: 77
            })
          ]
        })
      ],
      { openDoc }
    );

    const cells = root.querySelectorAll('.adr-list--history .adr-superseded');
    /** @type {HTMLElement} */ (
      cells[0].querySelector('.adr-doc--link')
    ).click();

    expect(cells[1].querySelector('.adr-doc')).toBeNull();
    expect((cells[1].textContent || '').trim()).toBe('→ 77');
    expect(openDoc).toHaveBeenCalledWith(
      { path: 'docs/adr/0024-decision.md', missing_state: null },
      '/repo/a'
    );
  });

  test('draws a title_too_long candidate error as 제목 초과', () => {
    const { root } = mount([
      workspace({
        candidates: [
          {
            spec: 'docs/superpowers/specs/s.md',
            ok: false,
            errors: [
              {
                kind: 'title_too_long',
                file: 's.md',
                line: 1,
                adr: 'UI-1',
                detail: ''
              }
            ]
          }
        ]
      })
    ]);

    expect(texts(root, '.adr-sec--cand .adr-chip--kind')).toEqual([
      '제목 초과'
    ]);
  });
});
