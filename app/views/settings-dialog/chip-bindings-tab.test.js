import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createChipBindingsTab } from './chip-bindings-tab.js';

/** @type {HTMLElement} */
let host;

/**
 * @param {any} state
 * @param {any} [response]
 * @returns {{ tab: any, transport: any, store: any }}
 */
function mount(state, response = { applied: true, revision: 8 }) {
  let current = state;
  const store = {
    get: () => current,
    set: (/** @type {any} */ next) => {
      current = next;
    }
  };
  const transport = vi.fn().mockResolvedValue(response);
  const tab = createChipBindingsTab(host, {
    transport,
    implPresetStore: store
  });
  tab.render();
  return { tab, transport, store };
}

const SNAPSHOT = {
  revision: 5,
  presets: [
    { id: 'g1', name: '일반 하나', applies_to: 'general' },
    { id: 'g2', name: '일반 둘', applies_to: 'general', compatible: false },
    { id: 'q1', name: 'quick fix 하나', applies_to: 'quick_fix' }
  ],
  chip_bindings: { complex: 'g1', frontend: null, backend: null }
};

beforeEach(() => {
  host = document.createElement('div');
  document.body.replaceChildren(host);
});

describe('칩 탭 (UI-wg68 §6)', () => {
  test('draws one row per judgement chip', () => {
    mount(SNAPSHOT);

    const chips = Array.from(host.querySelectorAll('[data-chip]')).map((el) =>
      el.getAttribute('data-chip')
    );

    expect(
      chips.filter((chip, index) => chips.indexOf(chip) === index)
    ).toEqual(['complex', 'frontend', 'backend']);
  });

  test('lists only the general presets beside 없음', () => {
    mount(SNAPSHOT);

    const select = /** @type {HTMLSelectElement} */ (
      host.querySelector('select[data-chip="complex"]')
    );
    const options = Array.from(select.options).map((option) => option.text);

    expect(options).toEqual(['없음', '일반 하나', '일반 둘']);
  });

  test('disables an incompatible preset option', () => {
    mount(SNAPSHOT);

    const select = /** @type {HTMLSelectElement} */ (
      host.querySelector('select[data-chip="complex"]')
    );

    expect(select.options[2].disabled).toBe(true);
  });

  test('disables every row until the snapshot arrives', () => {
    mount(null);

    const selects = Array.from(host.querySelectorAll('select'));

    expect(selects.every((select) => select.disabled)).toBe(true);
  });

  test('binds on change without a save button', async () => {
    const { transport } = mount(SNAPSHOT);
    const select = /** @type {HTMLSelectElement} */ (
      host.querySelector('select[data-chip="frontend"]')
    );

    select.value = 'g1';
    select.dispatchEvent(new Event('change'));
    await Promise.resolve();

    expect(transport).toHaveBeenCalledWith('impl-preset-bind', {
      expected_revision: 5,
      chip: 'frontend',
      preset_id: 'g1'
    });
  });

  test('sends null when 없음 is chosen', async () => {
    const { transport } = mount(SNAPSHOT);
    const select = /** @type {HTMLSelectElement} */ (
      host.querySelector('select[data-chip="complex"]')
    );

    select.value = '';
    select.dispatchEvent(new Event('change'));
    await Promise.resolve();

    expect(transport).toHaveBeenCalledWith('impl-preset-bind', {
      expected_revision: 5,
      chip: 'complex',
      preset_id: null
    });
  });

  test('rebuilds the form from the snapshot a conflict answered', async () => {
    const { store } = mount(SNAPSHOT, {
      applied: false,
      conflict: true,
      revision: 9,
      presets: [{ id: 'g9', name: '새 프리셋', applies_to: 'general' }],
      chip_bindings: { complex: 'g9', frontend: null, backend: null }
    });
    const select = /** @type {HTMLSelectElement} */ (
      host.querySelector('select[data-chip="complex"]')
    );

    select.value = '';
    select.dispatchEvent(new Event('change'));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(store.get().revision).toBe(9);
  });

  test('names the click contract in its header line', () => {
    mount(SNAPSHOT);

    const intro = host.querySelector('.settings-chips__intro');

    expect(intro?.textContent).toContain(
      'quick fix 이슈에는 적용되지 않습니다'
    );
  });
});
