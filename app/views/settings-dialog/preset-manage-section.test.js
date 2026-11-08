import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  CONFLICT_TEXT,
  DUPLICATE_NAME_TEXT,
  INVALID_TEXT,
  copyName,
  createPresetManageSection
} from './preset-manage-section.js';

/** @type {HTMLElement} */
let host;

const SNAPSHOT = {
  revision: 5,
  presets: [
    {
      id: 'g1',
      name: '위임',
      applies_to: 'general',
      settings: { impl_model: 'opus' }
    },
    {
      id: 'q1',
      name: '가벼운 수정',
      applies_to: 'quick_fix',
      settings: { quick_fix_impl_model: 'sonnet' }
    }
  ],
  chip_bindings: { complex: 'g1', frontend: 'g1', backend: null },
  quick_fix_chip_bindings: { complex: null, frontend: null, backend: null }
};

/**
 * @param {any} state
 * @param {any} [response]
 * @returns {{ transport: any, store: any, section: any }}
 */
function mount(state, response = { applied: true, revision: 6 }) {
  let current = state;
  const store = {
    get: () => current,
    set: (/** @type {any} */ next) => {
      current = next;
    }
  };
  const transport = vi.fn().mockResolvedValue(response);
  const section = createPresetManageSection(host, {
    transport,
    implPresetStore: store
  });
  section.render();
  return { transport, store, section };
}

/**
 * @param {string} id
 * @param {string} action
 * @returns {HTMLElement}
 */
function control(id, action) {
  return /** @type {HTMLElement} */ (
    host.querySelector(`[data-preset-id="${id}"] [data-action="${action}"]`)
  );
}

/**
 * @param {string} id
 * @param {string} value
 */
function typeName(id, value) {
  const input = /** @type {HTMLInputElement} */ (
    control(id, 'preset-rename-input')
  );
  input.value = value;
  input.dispatchEvent(new Event('input'));
}

/** Let the click's transport promise settle. */
async function settle() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

beforeEach(() => {
  host = document.createElement('div');
  document.body.replaceChildren(host);
});

describe('프리셋 관리 묶음 (UI-u3po)', () => {
  test('draws one row per preset under its profile block', () => {
    mount(SNAPSHOT);

    const blocks = Array.from(host.querySelectorAll('[data-profile]')).map(
      (block) => [
        block.getAttribute('data-profile'),
        Array.from(block.querySelectorAll('[data-preset-id]')).map((row) =>
          row.getAttribute('data-preset-id')
        )
      ]
    );

    expect(blocks).toEqual([
      ['general', ['g1']],
      ['quick_fix', ['q1']]
    ]);
  });

  test('names the chips bound to a preset on its row', () => {
    mount(SNAPSHOT);

    const chips = host
      .querySelector('[data-preset-id="g1"] [data-role="preset-chips"]')
      ?.textContent?.trim();

    expect(chips).toBe('칩 복잡·frontend');
  });

  test('sends the stored settings with the new name on rename', async () => {
    const { transport } = mount(SNAPSHOT);
    control('g1', 'preset-rename').click();
    typeName('g1', '위임 고정');

    control('g1', 'preset-rename-save').click();
    await settle();

    expect(transport).toHaveBeenCalledWith('impl-preset-update', {
      expected_revision: 5,
      id: 'g1',
      name: '위임 고정',
      settings: { impl_model: 'opus' }
    });
  });

  test('cancels the rename on Escape without sending', async () => {
    const { transport } = mount(SNAPSHOT);
    control('g1', 'preset-rename').click();
    typeName('g1', '다른 이름');

    control('g1', 'preset-rename-input').dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    await settle();

    expect([
      transport.mock.calls.length,
      control('g1', 'preset-rename-input'),
      control('g1', 'preset-rename') !== null
    ]).toEqual([0, null, true]);
  });

  test('keeps the IME composition Enter from saving the rename', async () => {
    const { transport } = mount(SNAPSHOT);
    control('g1', 'preset-rename').click();
    typeName('g1', '위임 고정');

    control('g1', 'preset-rename-input').dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        isComposing: true,
        bubbles: true
      })
    );
    await settle();

    expect([
      transport.mock.calls.length,
      control('g1', 'preset-rename-input') !== null
    ]).toEqual([0, true]);
  });

  test('blocks a rename onto another preset name ignoring case', async () => {
    const snapshot = {
      ...SNAPSHOT,
      presets: [
        ...SNAPSHOT.presets,
        { id: 'g2', name: 'Sonnet', applies_to: 'general', settings: {} }
      ]
    };
    const { transport } = mount(snapshot);
    control('g1', 'preset-rename').click();
    typeName('g1', 'sonnet');

    control('g1', 'preset-rename-save').click();
    await settle();

    expect([
      transport.mock.calls.length,
      host.querySelector('[data-role="preset-error"]')?.textContent?.trim()
    ]).toEqual([0, DUPLICATE_NAME_TEXT]);
  });

  test('numbers the duplicate name past every taken copy', () => {
    const presets = [
      { id: 'a', name: '위임' },
      { id: 'b', name: '위임 복사본' },
      { id: 'c', name: '위임 복사본 2' }
    ];

    const name = copyName(presets, '위임');

    expect(name).toBe('위임 복사본 3');
  });

  test('creates the duplicate in the original profile with its settings', async () => {
    const { transport } = mount(SNAPSHOT);

    control('q1', 'preset-duplicate').click();
    await settle();

    expect(transport).toHaveBeenCalledWith('impl-preset-create', {
      expected_revision: 5,
      name: '가벼운 수정 복사본',
      applies_to: 'quick_fix',
      settings: { quick_fix_impl_model: 'sonnet' }
    });
  });

  test('shows the chip release warning on the first delete click without sending', async () => {
    const { transport } = mount(SNAPSHOT);

    control('g1', 'preset-delete').click();
    await settle();

    expect([
      transport.mock.calls.length,
      host
        .querySelector('[data-role="preset-delete-warning"]')
        ?.textContent?.trim()
    ]).toEqual([0, '삭제하면 판정 칩 복잡·frontend의 바인딩이 풀립니다.']);
  });

  test('sends the delete on the confirm click', async () => {
    const { transport } = mount(SNAPSHOT);
    control('g1', 'preset-delete').click();

    control('g1', 'preset-delete-confirm').click();
    await settle();

    expect(transport).toHaveBeenCalledWith('impl-preset-delete', {
      expected_revision: 5,
      id: 'g1'
    });
  });

  test('reports a revision race with the conflict text', async () => {
    mount(SNAPSHOT, { ...SNAPSHOT, applied: false, conflict: true });

    control('q1', 'preset-duplicate').click();
    await settle();

    expect(
      host.querySelector('[data-role="preset-error"]')?.textContent?.trim()
    ).toBe(CONFLICT_TEXT);
  });

  test('reports a refused write with the invalid text', async () => {
    mount(SNAPSHOT, {
      ...SNAPSHOT,
      applied: false,
      conflict: false,
      reason: 'invalid'
    });

    control('q1', 'preset-duplicate').click();
    await settle();

    expect(
      host.querySelector('[data-role="preset-error"]')?.textContent?.trim()
    ).toBe(INVALID_TEXT);
  });

  test('adopts the answered preset list into the store', async () => {
    const answered = {
      applied: true,
      conflict: false,
      revision: 6,
      presets: [SNAPSHOT.presets[1]],
      chip_bindings: { complex: null, frontend: null, backend: null },
      quick_fix_chip_bindings: SNAPSHOT.quick_fix_chip_bindings
    };
    const { store } = mount(SNAPSHOT, answered);
    control('g1', 'preset-delete').click();

    control('g1', 'preset-delete-confirm').click();
    await settle();

    expect([
      store.get().revision,
      host.querySelector('[data-preset-id="g1"]')
    ]).toEqual([6, null]);
  });

  test('leaves the host alone when a reply lands after destroy', async () => {
    /** @type {(value: any) => void} */
    let answer = () => {};
    const { transport, section } = mount(SNAPSHOT);
    transport.mockReturnValueOnce(
      new Promise((resolve) => {
        answer = resolve;
      })
    );
    control('q1', 'preset-duplicate').click();
    section.destroy();
    host.replaceChildren(document.createElement('p'));

    answer({ ...SNAPSHOT, applied: false, conflict: true });
    await settle();

    expect(host.innerHTML).toBe('<p></p>');
  });

  test('draws nothing before the preset snapshot arrives', () => {
    mount(null);

    expect(host.querySelector('[data-group="preset-manage"]')).toBeNull();
  });
});
