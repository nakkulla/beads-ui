import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createModelVisibilitySection } from './model-visibility-section.js';

const SNAPSHOT = {
  revision: 5,
  disabled_models: ['haiku'],
  runners: {
    claude: [
      { name: 'opus', id: 'claude-opus' },
      { name: 'sonnet', id: 'claude-sonnet' },
      { name: 'haiku', id: 'claude-haiku' }
    ]
  }
};

/**
 * @param {(type: string, payload: any) => Promise<any>} transport
 */
function mountSection(transport) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  /** @type {any} */
  let state = structuredClone(SNAPSHOT);
  const store = {
    get: () => state,
    set: (/** @type {any} */ next) => {
      state = next;
    }
  };
  const section = createModelVisibilitySection(host, {
    transport: vi.fn(transport),
    modelVisibilityStore: store
  });
  section.render();
  return { host, section, store };
}

/**
 * @param {HTMLElement} host
 * @param {string} model
 */
function toggle(host, model) {
  const input = /** @type {HTMLInputElement} */ (
    host.querySelector(`input[data-model="${model}"]`)
  );
  input.checked = !input.checked;
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

/** Let the section's async save settle. */
async function settle() {
  for (let i = 0; i < 5; i += 1) {
    await Promise.resolve();
  }
}

/**
 * @param {string} code
 */
function refusal(code) {
  return Object.assign(new Error(code), {
    code,
    details: { snapshot: structuredClone(SNAPSHOT) }
  });
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('model visibility section (UI-ooc0 §5)', () => {
  test('sends the whole disabled list under the snapshot revision', async () => {
    const calls = /** @type {any[]} */ ([]);
    const { host } = mountSection(async (type, payload) => {
      calls.push([type, payload]);
      return { snapshot: { ...SNAPSHOT, revision: 6 } };
    });

    toggle(host, 'sonnet');
    await settle();

    expect(calls).toEqual([
      [
        'model-visibility-set',
        { expected_revision: 5, disabled_models: ['haiku', 'sonnet'] }
      ]
    ]);
  });

  test('re-applies the toggle once on the snapshot a conflict returns', async () => {
    const calls = /** @type {any[]} */ ([]);
    const { host } = mountSection(async (type, payload) => {
      calls.push(payload);
      if (calls.length === 1) {
        throw Object.assign(new Error('conflict'), {
          code: 'conflict',
          details: { snapshot: { ...SNAPSHOT, revision: 9 } }
        });
      }
      return { snapshot: { ...SNAPSHOT, revision: 10 } };
    });

    toggle(host, 'sonnet');
    await settle();

    expect(calls.map((payload) => payload.expected_revision)).toEqual([5, 9]);
  });

  test.each([
    ['runner_all_disabled', '러너마다 하나 이상 켜 두어야 합니다'],
    ['unknown_model', '카탈로그에 없는 모델입니다'],
    ['conflict', '다른 창에서 먼저 바뀌었습니다']
  ])('explains a %s refusal', async (code, sentence) => {
    const { host } = mountSection(async () => {
      throw refusal(code);
    });

    toggle(host, 'sonnet');
    await settle();

    const error = host.querySelector('.settings-chips__error')?.textContent;
    expect(error).toContain(sentence);
    expect(error).toContain(code);
  });
});

describe('model visibility section codex list note (UI-gpac §3.7)', () => {
  /**
   * @param {Record<string, any>|null} runner_catalog
   */
  function mountWithCatalog(runner_catalog) {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const state = {
      ...structuredClone(SNAPSHOT),
      runners: {
        ...SNAPSHOT.runners,
        codex: [{ name: 'sol', id: 'gpt-6.1-sol' }]
      }
    };
    const section = createModelVisibilitySection(host, {
      transport: vi.fn(async () => ({})),
      modelVisibilityStore: { get: () => state },
      runnerCatalog: () => runner_catalog
    });
    section.render();
    return host;
  }

  test('names the read time of the codex model list', () => {
    const read_at = new Date(2026, 9, 12, 9, 30).getTime();

    const host = mountWithCatalog({
      codex_list: { source: 'list', read_at, codex_version: 'x', families: [] }
    });

    const note = host.querySelector(
      '[data-runner="codex"] [data-codex-model-list]'
    );
    expect(note?.textContent?.trim()).toBe('모델 목록: 2026-10-12 09:30 기준');
  });

  test('says the seed table is in use when no list was ever read', () => {
    const host = mountWithCatalog({
      codex_list: {
        source: 'seed',
        read_at: null,
        codex_version: null,
        families: []
      }
    });

    const note = host.querySelector('[data-codex-model-list]');
    expect(note?.textContent?.trim()).toBe(
      '모델 목록을 읽지 못해 기본 표를 씁니다'
    );
  });

  test('omits the note when the catalog carries no list status', () => {
    const host = mountWithCatalog(null);

    const note = host.querySelector('[data-codex-model-list]');

    expect(note).toBeNull();
  });
});
