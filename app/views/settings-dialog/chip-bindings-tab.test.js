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
    { id: 'q1', name: 'quick fix 하나', applies_to: 'quick_fix' },
    {
      id: 'q2',
      name: 'quick fix 둘',
      applies_to: 'quick_fix',
      compatible: false
    }
  ],
  chip_bindings: { complex: 'g1', frontend: null, backend: null },
  quick_fix_chip_bindings: { complex: null, frontend: 'q1', backend: null }
};

/**
 * @param {string} chip
 * @param {'general'|'quick_fix'} profile
 * @returns {HTMLSelectElement}
 */
function selectOf(chip, profile) {
  return /** @type {HTMLSelectElement} */ (
    host.querySelector(`select[data-chip="${chip}"][data-profile="${profile}"]`)
  );
}

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

  test('draws two selects per chip row', () => {
    mount(SNAPSHOT);

    const counts = Array.from(host.querySelectorAll('.settings-chips__row'))
      .filter((row) => row.hasAttribute('data-chip'))
      .map((row) => row.querySelectorAll('select').length);

    expect(counts).toEqual([2, 2, 2]);
  });

  test('draws the column headings once above the rows', () => {
    mount(SNAPSHOT);

    const headings = Array.from(
      host.querySelectorAll('.settings-chips__col')
    ).map((el) => el.textContent?.trim());

    expect(headings).toEqual(['일반', 'quick fix']);
  });

  test('lists only the general presets beside 없음 in the general select', () => {
    mount(SNAPSHOT);

    const select = selectOf('complex', 'general');
    const options = Array.from(select.options).map((option) => option.text);

    expect(options).toEqual(['없음', '일반 하나', '일반 둘']);
  });

  test('lists only the quick fix presets beside 없음 in the quick fix select', () => {
    mount(SNAPSHOT);

    const select = selectOf('complex', 'quick_fix');
    const options = Array.from(select.options).map((option) => option.text);

    expect(options).toEqual(['없음', 'quick fix 하나', 'quick fix 둘']);
  });

  test('disables an incompatible preset option', () => {
    mount(SNAPSHOT);

    const select = selectOf('complex', 'general');

    expect(select.options[2].disabled).toBe(true);
  });

  test('disables an incompatible quick fix preset option', () => {
    mount(SNAPSHOT);

    const select = selectOf('complex', 'quick_fix');

    expect(select.options[2].disabled).toBe(true);
  });

  test('selects each map binding in its own column', () => {
    mount(SNAPSHOT);

    expect(selectOf('complex', 'general').value).toBe('g1');
    expect(selectOf('complex', 'quick_fix').value).toBe('');
    expect(selectOf('frontend', 'quick_fix').value).toBe('q1');
  });

  test('disables every row until the snapshot arrives', () => {
    mount(null);

    const selects = Array.from(host.querySelectorAll('select'));

    expect(selects.every((select) => select.disabled)).toBe(true);
  });

  test('binds on change without a save button', async () => {
    const { transport } = mount(SNAPSHOT);
    const select = selectOf('frontend', 'general');

    select.value = 'g1';
    select.dispatchEvent(new Event('change'));
    await Promise.resolve();

    expect(transport).toHaveBeenCalledWith('impl-preset-bind', {
      expected_revision: 5,
      chip: 'frontend',
      preset_id: 'g1',
      applies_to: 'general'
    });
  });

  test('binds a quick fix preset with applies_to quick_fix', async () => {
    const { transport } = mount(SNAPSHOT);
    const select = selectOf('backend', 'quick_fix');

    select.value = 'q1';
    select.dispatchEvent(new Event('change'));
    await Promise.resolve();

    expect(transport).toHaveBeenCalledWith('impl-preset-bind', {
      expected_revision: 5,
      chip: 'backend',
      preset_id: 'q1',
      applies_to: 'quick_fix'
    });
  });

  test('unbinds the quick fix column with 없음', async () => {
    const { transport } = mount(SNAPSHOT);
    const select = selectOf('frontend', 'quick_fix');

    select.value = '';
    select.dispatchEvent(new Event('change'));
    await Promise.resolve();

    expect(transport).toHaveBeenCalledWith('impl-preset-bind', {
      expected_revision: 5,
      chip: 'frontend',
      preset_id: null,
      applies_to: 'quick_fix'
    });
  });

  test('stores both maps the bind answer carries', async () => {
    const { store } = mount(SNAPSHOT, {
      applied: true,
      revision: 6,
      presets: SNAPSHOT.presets,
      chip_bindings: { complex: 'g1', frontend: null, backend: null },
      quick_fix_chip_bindings: { complex: null, frontend: 'q1', backend: 'q1' }
    });
    const select = selectOf('backend', 'quick_fix');

    select.value = 'q1';
    select.dispatchEvent(new Event('change'));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(store.get().quick_fix_chip_bindings.backend).toBe('q1');
  });

  test('sends null when 없음 is chosen', async () => {
    const { transport } = mount(SNAPSHOT);
    const select = selectOf('complex', 'general');

    select.value = '';
    select.dispatchEvent(new Event('change'));
    await Promise.resolve();

    expect(transport).toHaveBeenCalledWith('impl-preset-bind', {
      expected_revision: 5,
      chip: 'complex',
      preset_id: null,
      applies_to: 'general'
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
    const select = selectOf('complex', 'general');

    select.value = '';
    select.dispatchEvent(new Event('change'));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(store.get().revision).toBe(9);
  });

  test('names the click contract in its header line', () => {
    mount(SNAPSHOT);

    const intro = host.querySelector('.settings-chips__intro');

    expect(intro?.textContent).toContain(
      'quick fix 이슈는 quick fix 열, 그 밖은 일반 열'
    );
  });
});
