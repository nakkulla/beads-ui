import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  AUTO_POOL_DEFAULTS_UNKNOWN,
  AUTO_POOL_EMPTY_HINT,
  AUTO_POOL_INTRO,
  AUTO_POOL_NOT_IN_CATALOG,
  AUTO_POOL_SINGLE_HINT,
  AUTO_POOL_STALE_LINE,
  createAutoPoolSection
} from './auto-pool-section.js';

const CHOICES = {
  claude: {
    models: ['opus', 'sonnet', 'haiku'],
    efforts: ['low', 'medium', 'high', 'xhigh'],
    defaults: null,
    catalog_models: null
  },
  codex: {
    models: ['astra', 'sol', 'terra', 'luna', 'sol-6.1', 'terra-6.1'],
    efforts: ['low', 'medium', 'high', 'xhigh'],
    defaults: null,
    catalog_models: ['astra', 'sol', 'terra', 'luna', 'sol-6.1', 'terra-6.1']
  }
};

const SNAPSHOT = {
  revision: 3,
  runtimes: {
    codex: {
      models: ['terra-6.1', 'sol-6.1'],
      effort: { min: 'high', max: 'xhigh' }
    }
  },
  choices: CHOICES
};

/**
 * @param {(type: string, payload: any) => Promise<any>} transport
 * @param {{ snapshot?: any, disabled?: string[]|null }} [options]
 */
function mountSection(transport, options = {}) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  /** @type {any} */
  let state = structuredClone(options.snapshot ?? SNAPSHOT);
  /** @type {Set<() => void>} */
  const listeners = new Set();
  const store = {
    get: () => state,
    set: (/** @type {any} */ next) => {
      state = next;
      for (const listener of listeners) {
        listener();
      }
    },
    subscribe: (/** @type {() => void} */ fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
  const notify = vi.fn();
  const send = vi.fn(transport);
  const section = createAutoPoolSection(host, {
    transport: send,
    autoPoolStore: store,
    modelVisibilityStore: {
      get: () =>
        options.disabled === undefined
          ? null
          : { revision: 1, disabled_models: options.disabled, runners: {} }
    },
    notify
  });
  section.render();
  return { host, section, store, send, notify };
}

/**
 * @param {HTMLElement} host
 * @param {string} runtime
 * @param {string} field
 * @param {string} value
 */
function pick(host, runtime, field, value) {
  const select = /** @type {HTMLSelectElement} */ (
    host.querySelector(
      `select[data-runtime="${runtime}"][data-auto-pool-field="${field}"]`
    )
  );
  select.value = value;
  select.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * @param {HTMLElement} host
 * @param {string} runtime
 */
function toggleFollow(host, runtime) {
  const input = /** @type {HTMLInputElement} */ (
    host.querySelector(`input[data-auto-pool-follow="${runtime}"]`)
  );
  input.checked = !input.checked;
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * @param {HTMLElement} host
 */
function save(host) {
  /** @type {HTMLButtonElement} */ (
    host.querySelector('[data-auto-pool-save]')
  ).click();
}

/**
 * @param {HTMLElement} host
 * @param {string} runtime
 * @returns {string}
 */
function hintOf(host, runtime) {
  return (
    host
      .querySelector(`[data-auto-pool-hint="${runtime}"]`)
      ?.textContent?.trim() ?? ''
  );
}

/**
 * @param {HTMLElement} host
 * @param {string} runtime
 * @param {string} field
 * @returns {string[]}
 */
function optionValues(host, runtime, field) {
  return Array.from(
    host.querySelectorAll(
      `select[data-runtime="${runtime}"][data-auto-pool-field="${field}"] option`
    )
  ).map((option) => /** @type {HTMLOptionElement} */ (option).value);
}

/** Let the section's async save settle. */
async function settle() {
  for (let i = 0; i < 5; i += 1) {
    await Promise.resolve();
  }
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('auto pool section (UI-y7h1 §3.4)', () => {
  test('heads the group with the auto-only sentence', () => {
    const { host } = mountSection(async () => ({}));

    const intro = host.querySelector(
      '[data-group="auto-pool"] .settings-dialog__hint'
    );

    expect(intro?.textContent?.trim()).toBe(AUTO_POOL_INTRO);
  });

  test('draws nothing before the first snapshot', () => {
    const host = document.createElement('div');

    createAutoPoolSection(host, {
      transport: vi.fn(),
      autoPoolStore: { get: () => null }
    }).render();

    expect(host.querySelector('[data-group="auto-pool"]')).toBeNull();
  });

  test('locks a runtime that follows the defaults', () => {
    const { host } = mountSection(async () => ({}));

    const claude = /** @type {HTMLElement} */ (
      host.querySelector('[data-auto-pool-runtime="claude"]')
    );

    expect(
      /** @type {HTMLInputElement} */ (
        claude.querySelector('[data-auto-pool-follow]')
      ).checked
    ).toBe(true);
    expect(claude.querySelectorAll('select')).toHaveLength(0);
  });

  test('names only the dotfiles default while the pin has no defaults key', () => {
    const { host } = mountSection(async () => ({}));

    expect(hintOf(host, 'claude')).toBe(AUTO_POOL_DEFAULTS_UNKNOWN);
  });

  test('shows the projection defaults read-only when the pin has them', () => {
    const snapshot = structuredClone(SNAPSHOT);
    snapshot.choices.claude.defaults = /** @type {any} */ ({
      models: ['sonnet', 'opus'],
      effort: { min: 'medium', max: 'high' }
    });

    const { host } = mountSection(async () => ({}), { snapshot });

    expect(hintOf(host, 'claude')).toBe(
      '기본값: sonnet → opus · effort medium~high'
    );
  });

  test('drops a runtime from the saved document when it follows the defaults', async () => {
    const { host, send } = mountSection(async () => ({}));

    toggleFollow(host, 'codex');
    save(host);
    await settle();

    expect(send).toHaveBeenCalledWith('auto-pool-set', {
      expected_revision: 3,
      runtimes: {}
    });
  });

  test('saves the whole document with the slots lowest first', async () => {
    const { host, send } = mountSection(async () => ({}));

    toggleFollow(host, 'claude');
    pick(host, 'claude', 'low', 'sonnet');
    pick(host, 'claude', 'high', 'opus');
    save(host);
    await settle();

    expect(send).toHaveBeenCalledWith('auto-pool-set', {
      expected_revision: 3,
      runtimes: {
        claude: {
          models: ['sonnet', 'opus'],
          effort: { min: 'low', max: 'xhigh' }
        },
        codex: {
          models: ['terra-6.1', 'sol-6.1'],
          effort: { min: 'high', max: 'xhigh' }
        }
      }
    });
  });

  test('says auto skips a runtime whose two slots are none', () => {
    const { host } = mountSection(async () => ({}));

    pick(host, 'codex', 'low', '');
    pick(host, 'codex', 'high', '');

    expect(hintOf(host, 'codex')).toBe(AUTO_POOL_EMPTY_HINT);
  });

  test('says one model is used without an experiment when only the low slot is none', () => {
    const { host } = mountSection(async () => ({}));

    pick(host, 'codex', 'low', '');

    expect(hintOf(host, 'codex')).toBe(AUTO_POOL_SINGLE_HINT);
  });

  test('saves the high slot alone when the low slot is none', async () => {
    const { host, send } = mountSection(async () => ({}));
    pick(host, 'codex', 'low', '');

    save(host);
    await settle();

    expect(send.mock.calls[0][1].runtimes.codex.models).toEqual(['sol-6.1']);
  });

  test('offers effort choices up to xhigh only', () => {
    const { host } = mountSection(async () => ({}));

    expect(optionValues(host, 'codex', 'max')).toEqual([
      'low',
      'medium',
      'high',
      'xhigh'
    ]);
  });

  test('hides hidden models but keeps a stored one', () => {
    const { host } = mountSection(async () => ({}), {
      disabled: ['terra', 'terra-6.1', 'luna']
    });

    expect(optionValues(host, 'codex', 'low')).toEqual([
      '',
      'astra',
      'sol',
      'sol-6.1',
      'terra-6.1'
    ]);
  });

  test('marks a stored Codex name the server catalog lacks', () => {
    const snapshot = structuredClone(SNAPSHOT);
    snapshot.runtimes.codex.models = ['luna-9.7'];

    const { host } = mountSection(async () => ({}), { snapshot });

    const option = host.querySelector(
      'select[data-runtime="codex"][data-auto-pool-field="low"] option[value="luna-9.7"]'
    );
    expect(option?.textContent?.trim()).toBe(
      `luna-9.7 · ${AUTO_POOL_NOT_IN_CATALOG}`
    );
  });
});

describe('auto pool section concurrency (UI-y7h1 §3.4)', () => {
  test('redraws at once when a snapshot arrives without a draft', () => {
    const { host, store } = mountSection(async () => ({}));

    store.set({ ...structuredClone(SNAPSHOT), revision: 4, runtimes: {} });

    expect(hintOf(host, 'codex')).toBe(AUTO_POOL_DEFAULTS_UNKNOWN);
    expect(host.querySelector('[data-auto-pool-stale]')).toBeNull();
  });

  test('keeps the draft and says it changed elsewhere when a snapshot arrives while editing', () => {
    const { host, store } = mountSection(async () => ({}));
    pick(host, 'codex', 'low', 'astra');

    store.set({ ...structuredClone(SNAPSHOT), revision: 4, runtimes: {} });

    expect(
      /** @type {HTMLSelectElement} */ (
        host.querySelector(
          'select[data-runtime="codex"][data-auto-pool-field="low"]'
        )
      ).value
    ).toBe('astra');
    expect(
      host.querySelector('[data-auto-pool-stale]')?.textContent?.trim()
    ).toBe(AUTO_POOL_STALE_LINE);
  });

  test('keeps the draft after a conflict and saves it under the answered revision', async () => {
    const calls = /** @type {any[]} */ ([]);
    const { host } = mountSection(async (_type, payload) => {
      calls.push(payload);
      if (calls.length === 1) {
        throw Object.assign(new Error('conflict'), {
          code: 'conflict',
          details: {
            snapshot: {
              ...structuredClone(SNAPSHOT),
              revision: 8,
              runtimes: {}
            },
            runtime: null
          }
        });
      }
      return {
        snapshot: { ...structuredClone(SNAPSHOT), revision: 9 }
      };
    });
    pick(host, 'codex', 'low', 'astra');

    save(host);
    await settle();
    const kept = /** @type {HTMLSelectElement} */ (
      host.querySelector(
        'select[data-runtime="codex"][data-auto-pool-field="low"]'
      )
    ).value;
    save(host);
    await settle();

    expect(kept).toBe('astra');
    expect(calls.map((payload) => payload.expected_revision)).toEqual([3, 8]);
    expect(calls[1].runtimes.codex.models).toEqual(['astra', 'sol-6.1']);
  });

  test('explains a conflict without the changed-elsewhere line', async () => {
    const { host } = mountSection(async () => {
      throw Object.assign(new Error('conflict'), {
        code: 'conflict',
        details: {
          snapshot: { ...structuredClone(SNAPSHOT), revision: 8 },
          runtime: null
        }
      });
    });
    pick(host, 'codex', 'low', 'astra');

    save(host);
    await settle();

    expect(host.querySelector('[data-auto-pool-error]')?.textContent).toContain(
      'conflict'
    );
    expect(host.querySelector('[data-auto-pool-stale]')).toBeNull();
  });

  test('shows a refusal on the runtime line and keeps the draft', async () => {
    const { host } = mountSection(async () => {
      throw Object.assign(new Error('invalid_effort_range'), {
        code: 'invalid_effort_range',
        details: { snapshot: structuredClone(SNAPSHOT), runtime: 'codex' }
      });
    });
    pick(host, 'codex', 'min', 'xhigh');
    pick(host, 'codex', 'max', 'low');

    save(host);
    await settle();

    expect(
      host.querySelector('[data-auto-pool-error="codex"]')?.textContent
    ).toContain('effort 범위가 올바르지 않습니다');
    expect(
      /** @type {HTMLSelectElement} */ (
        host.querySelector(
          'select[data-runtime="codex"][data-auto-pool-field="min"]'
        )
      ).value
    ).toBe('xhigh');
  });

  test('notifies a write failure and keeps the draft', async () => {
    const { host, notify } = mountSection(async () => {
      throw Object.assign(new Error('failed to persist auto pool'), {
        code: 'internal_error',
        details: { snapshot: structuredClone(SNAPSHOT) }
      });
    });
    pick(host, 'codex', 'low', 'astra');

    save(host);
    await settle();

    expect(notify).toHaveBeenCalledTimes(1);
    expect(
      /** @type {HTMLButtonElement} */ (
        host.querySelector('[data-auto-pool-save]')
      ).disabled
    ).toBe(false);
  });

  test('clears the draft after a successful save', async () => {
    const { host } = mountSection(async () => ({
      snapshot: { ...structuredClone(SNAPSHOT), revision: 4 }
    }));
    pick(host, 'codex', 'low', 'astra');

    save(host);
    await settle();

    expect(
      /** @type {HTMLButtonElement} */ (
        host.querySelector('[data-auto-pool-save]')
      ).disabled
    ).toBe(true);
    expect(host.querySelector('[data-auto-pool-stale]')).toBeNull();
  });
});
