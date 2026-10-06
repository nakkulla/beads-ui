import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  CONVERSATION_CONFLICT_TOAST,
  createConversationSection
} from './conversation-section.js';

const FIELDS = {
  auto_launch: { kind: 'boolean', default: true },
  fresh_runtime: {
    kind: 'choice',
    default: 'claude',
    choices: ['inherit', 'claude', 'codex']
  },
  claude_model: {
    kind: 'model',
    runner: 'claude',
    default: null,
    choices: ['opus', 'opus-4.8']
  },
  claude_effort: {
    kind: 'effort',
    runner: 'claude',
    default: null,
    choices: ['low', 'high']
  },
  codex_model: {
    kind: 'model',
    runner: 'codex',
    default: null,
    choices: ['astra']
  },
  codex_effort: {
    kind: 'effort',
    runner: 'codex',
    default: null,
    choices: ['low', 'high']
  }
};

/**
 * @param {Partial<{ revision: number, values: Record<string, any>, overrides: Record<string, any>, fields: Record<string, any> }>} [patch]
 */
function snapshotOf(patch = {}) {
  return {
    revision: 4,
    values: {
      auto_launch: true,
      fresh_runtime: 'claude',
      claude_model: null,
      claude_effort: null,
      codex_model: null,
      codex_effort: null
    },
    overrides: {},
    fields: structuredClone(FIELDS),
    ...patch
  };
}

/**
 * @param {(type: string, payload: any) => Promise<any>} transport
 * @param {{ disabled_models?: string[] }|null} [visibility]
 */
function mountSection(transport, visibility = null) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const toast = vi.fn();
  const send = vi.fn(transport);
  const section = createConversationSection(host, {
    transport: send,
    modelVisibilityStore: { get: () => visibility },
    toast
  });
  section.render();
  return { host, section, toast, send };
}

/**
 * @param {any} snapshot
 * @returns {(type: string, payload: any) => Promise<any>}
 */
function serving(snapshot) {
  return async (type) =>
    type === 'conversation-settings-get'
      ? { snapshot }
      : { ok: true, snapshot };
}

/**
 * @param {HTMLElement} host
 * @param {string} key
 * @returns {HTMLElement}
 */
function rowOf(host, key) {
  return /** @type {HTMLElement} */ (host.querySelector(`[data-key="${key}"]`));
}

/**
 * @param {HTMLElement} host
 * @param {string} key
 * @returns {HTMLSelectElement}
 */
function selectOf(host, key) {
  return /** @type {HTMLSelectElement} */ (
    rowOf(host, key).querySelector('select')
  );
}

/**
 * @param {HTMLElement} host
 * @param {string} key
 * @returns {HTMLInputElement}
 */
function checkboxOf(host, key) {
  return /** @type {HTMLInputElement} */ (
    rowOf(host, key).querySelector('input[type="checkbox"]')
  );
}

/**
 * @param {HTMLSelectElement} select
 * @param {string} value
 */
function choose(select, value) {
  select.value = value;
  select.dispatchEvent(new Event('change', { bubbles: true }));
}

/** Let the section's async load and save settle. */
async function settle() {
  for (let i = 0; i < 8; i += 1) {
    await Promise.resolve();
  }
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('conversation section load (UI-jbl1 §3.4)', () => {
  test('requests the snapshot once on mount', async () => {
    const { send } = mountSection(serving(snapshotOf()));

    await settle();

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith('conversation-settings-get', {});
  });

  test('draws nothing before the snapshot arrives', () => {
    const { host } = mountSection(() => new Promise(() => {}));

    expect(host.querySelector('[data-group="conversation"]')).toBeNull();
  });

  test('draws the six rows in spec order under the group title', async () => {
    const { host } = mountSection(serving(snapshotOf()));

    await settle();

    expect(
      host.querySelector('.settings-dialog__group-title')?.textContent?.trim()
    ).toBe('대화 세션');
    expect(
      Array.from(host.querySelectorAll('[data-key]')).map((row) =>
        row.getAttribute('data-key')
      )
    ).toEqual([
      'auto_launch',
      'fresh_runtime',
      'claude_model',
      'claude_effort',
      'codex_model',
      'codex_effort'
    ]);
  });

  test('shows the stored values in the controls', async () => {
    const { host } = mountSection(
      serving(
        snapshotOf({
          values: {
            auto_launch: false,
            fresh_runtime: 'codex',
            claude_model: 'opus',
            claude_effort: 'high',
            codex_model: null,
            codex_effort: null
          },
          overrides: {
            auto_launch: false,
            fresh_runtime: 'codex',
            claude_model: 'opus',
            claude_effort: 'high'
          }
        })
      )
    );

    await settle();

    expect(checkboxOf(host, 'auto_launch').checked).toBe(false);
    expect(selectOf(host, 'fresh_runtime').value).toBe('codex');
    expect(selectOf(host, 'claude_model').value).toBe('opus');
    expect(selectOf(host, 'claude_effort').value).toBe('high');
  });

  test('shows the config.toml fallback when no value is stored', async () => {
    const { host } = mountSection(serving(snapshotOf()));

    await settle();

    expect(checkboxOf(host, 'auto_launch').checked).toBe(true);
    expect(
      rowOf(host, 'auto_launch').querySelector('.settings-timing__default')
        ?.textContent
    ).toBe('config.toml 켜짐');
    expect(host.querySelector('[data-action="conversation-reset"]')).toBeNull();
  });

  test('shows the config.toml off fallback for the switch', async () => {
    const { host } = mountSection(
      serving(
        snapshotOf({
          values: { auto_launch: false },
          fields: {
            ...FIELDS,
            auto_launch: { kind: 'boolean', default: false }
          }
        })
      )
    );

    await settle();

    expect(checkboxOf(host, 'auto_launch').checked).toBe(false);
    expect(
      rowOf(host, 'auto_launch').querySelector('.settings-timing__default')
        ?.textContent
    ).toBe('config.toml 꺼짐');
  });

  test('labels an unset model and effort as 따름 with a 따름 default', async () => {
    const { host } = mountSection(serving(snapshotOf()));

    await settle();

    const select = selectOf(host, 'claude_model');
    expect(select.value).toBe('');
    expect(select.options[select.selectedIndex].textContent?.trim()).toBe(
      '따름'
    );
    expect(
      rowOf(host, 'codex_effort').querySelector('.settings-timing__default')
        ?.textContent
    ).toBe('기본 따름');
  });

  test('labels the default fresh runtime from the server table', async () => {
    const { host } = mountSection(serving(snapshotOf()));

    await settle();

    expect(
      rowOf(host, 'fresh_runtime').querySelector('.settings-timing__default')
        ?.textContent
    ).toBe('기본 claude');
  });

  test('hides a disabled model choice but keeps a stored one visible', async () => {
    const { host } = mountSection(
      serving(
        snapshotOf({
          values: { claude_model: 'opus-4.8' },
          overrides: { claude_model: 'opus-4.8' }
        })
      ),
      { disabled_models: ['opus-4.8'] }
    );

    await settle();

    const labels = Array.from(selectOf(host, 'claude_model').options).map(
      (option) => option.textContent?.trim()
    );
    expect(labels).toEqual(['따름', 'opus', 'opus-4.8 (비활성)']);
  });

  test('draws no row for a field the server table lacks', async () => {
    const fields = structuredClone(FIELDS);
    delete (/** @type {any} */ (fields).codex_model);
    const { host } = mountSection(serving(snapshotOf({ fields })));

    await settle();

    expect(rowOf(host, 'codex_model')).toBeNull();
    expect(rowOf(host, 'codex_effort')).not.toBeNull();
  });

  test('shows the read error when the request fails', async () => {
    const { host } = mountSection(async () => {
      throw new Error('boom');
    });

    await settle();

    expect(host.querySelector('.settings-chips__error')?.textContent).toContain(
      '대화 세션 설정 읽기 실패'
    );
  });
});

describe('conversation section save (UI-jbl1 §3.4)', () => {
  test('sends the switch change under the snapshot revision', async () => {
    const { host, send } = mountSection(serving(snapshotOf()));
    await settle();

    const box = checkboxOf(host, 'auto_launch');
    box.checked = false;
    box.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(send).toHaveBeenLastCalledWith('conversation-settings-set', {
      expected_revision: 4,
      values: { auto_launch: false }
    });
  });

  test('sends a runtime choice as its own value', async () => {
    const { host, send } = mountSection(serving(snapshotOf()));
    await settle();

    choose(selectOf(host, 'fresh_runtime'), 'codex');
    await settle();

    expect(send).toHaveBeenLastCalledWith('conversation-settings-set', {
      expected_revision: 4,
      values: { fresh_runtime: 'codex' }
    });
  });

  test('sends a chosen model by name', async () => {
    const { host, send } = mountSection(serving(snapshotOf()));
    await settle();

    choose(selectOf(host, 'claude_model'), 'opus');
    await settle();

    expect(send).toHaveBeenLastCalledWith('conversation-settings-set', {
      expected_revision: 4,
      values: { claude_model: 'opus' }
    });
  });

  test('sends null when a model is set back to 따름', async () => {
    const { host, send } = mountSection(
      serving(
        snapshotOf({
          values: { claude_model: 'opus' },
          overrides: { claude_model: 'opus' }
        })
      )
    );
    await settle();

    choose(selectOf(host, 'claude_model'), '');
    await settle();

    expect(send).toHaveBeenLastCalledWith('conversation-settings-set', {
      expected_revision: 4,
      values: { claude_model: null }
    });
  });

  test('sends null for the 기본값 button of an overridden row', async () => {
    const { host, send } = mountSection(
      serving(
        snapshotOf({
          values: { fresh_runtime: 'codex' },
          overrides: { fresh_runtime: 'codex' }
        })
      )
    );
    await settle();

    /** @type {HTMLButtonElement} */ (
      rowOf(host, 'fresh_runtime').querySelector(
        '[data-action="conversation-reset"]'
      )
    ).click();
    await settle();

    expect(send).toHaveBeenLastCalledWith('conversation-settings-set', {
      expected_revision: 4,
      values: { fresh_runtime: null }
    });
  });

  test('adopts the reply snapshot and its revision after a save', async () => {
    const saved = snapshotOf({
      revision: 5,
      values: { fresh_runtime: 'codex' },
      overrides: { fresh_runtime: 'codex' }
    });
    const { host, send } = mountSection(async (type) =>
      type === 'conversation-settings-get'
        ? { snapshot: snapshotOf() }
        : { ok: true, snapshot: saved }
    );
    await settle();

    choose(selectOf(host, 'fresh_runtime'), 'codex');
    await settle();
    choose(selectOf(host, 'claude_effort'), 'low');
    await settle();

    expect(selectOf(host, 'fresh_runtime').value).toBe('codex');
    expect(send).toHaveBeenLastCalledWith('conversation-settings-set', {
      expected_revision: 5,
      values: { claude_effort: 'low' }
    });
  });

  test('toasts and adopts the fresh snapshot on a conflict', async () => {
    const fresh = snapshotOf({
      revision: 9,
      values: { fresh_runtime: 'inherit' },
      overrides: { fresh_runtime: 'inherit' }
    });
    const { host, toast } = mountSection(async (type) =>
      type === 'conversation-settings-get'
        ? { snapshot: snapshotOf() }
        : { ok: false, code: 'conflict', message: 'stale', snapshot: fresh }
    );
    await settle();

    choose(selectOf(host, 'claude_effort'), 'high');
    await settle();

    expect(toast).toHaveBeenCalledWith(CONVERSATION_CONFLICT_TOAST, 'warning');
    expect(selectOf(host, 'fresh_runtime').value).toBe('inherit');
  });

  test('shows the server message when a save is refused', async () => {
    const { host } = mountSection(async (type) =>
      type === 'conversation-settings-get'
        ? { snapshot: snapshotOf() }
        : {
            ok: false,
            code: 'invalid_value',
            message: 'bad effort',
            snapshot: snapshotOf()
          }
    );
    await settle();

    choose(selectOf(host, 'claude_effort'), 'high');
    await settle();

    expect(host.querySelector('.settings-chips__error')?.textContent).toContain(
      '대화 세션 설정 저장 실패: bad effort'
    );
  });
});
