import { describe, expect, test, vi } from 'vitest';
import { createAdrView } from './index.js';

/** Let pending microtasks run. */
function settle() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * @param {number} id
 * @param {Partial<Record<string, any>>} [extra]
 */
function adr(id, extra = {}) {
  const num = String(id).padStart(4, '0');
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

describe('views/adr toolbar', () => {
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

    expect(texts(root, '.adr-table--current .adr-num')).toEqual(['2']);
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

    expect(texts(root, '.adr-table--current .adr-num')).toEqual(['3', '9']);

    const toggle = /** @type {HTMLElement} */ (root.querySelector('.adr-sort'));
    toggle.click();

    expect(texts(root, '.adr-table--current .adr-num')).toEqual(['9', '3']);
  });
});

describe('views/adr counts', () => {
  test('omits every zero count chip', () => {
    const { root } = mount([workspace({ current: [adr(1)] })]);

    expect(texts(root, '.adr-counts .adr-chip')).toEqual(['현재 유효 1']);
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

    expect(texts(root, '.adr-counts .adr-chip')).toContain('기타 2');
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

    expect(texts(root, '.adr-counts .adr-chip')).toContain('계산 중');
  });
});

describe('views/adr signals', () => {
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

    const rows = root.querySelectorAll('.adr-table--current tbody tr');
    expect(rows[0].getAttribute('data-adr')).toBe('12');
    expect(texts(/** @type {HTMLElement} */ (rows[0]), '.adr-chip')).toEqual([
      '인용 stale 1',
      '후보 1'
    ]);
    expect(texts(/** @type {HTMLElement} */ (rows[1]), '.adr-chip')).toEqual(
      []
    );
  });
});

describe('views/adr candidate section', () => {
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

describe('views/adr environment errors', () => {
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
    expect(root.querySelectorAll('.adr-table').length).toBe(0);
  });
});

describe('views/adr cross citations', () => {
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
});

describe('views/adr links', () => {
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

describe('views/adr header', () => {
  test('marks a duplicate repository name', () => {
    const { root } = mount([workspace({ name_duplicate: true })]);

    expect(texts(root, '.adr-chip--dup')).toEqual(['이름 중복']);
  });
});
