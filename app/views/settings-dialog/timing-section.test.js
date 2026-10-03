import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  TIMING_CONFLICT_TOAST,
  TIMING_INTRO,
  createTimingSection
} from './timing-section.js';

const FIELDS = {
  queue_grace_seconds: { default: 20, min: 0, max: 600, unit: 'seconds' },
  env_retry_delays_seconds: {
    default: [120, 300, 900],
    min: 60,
    max: 21600,
    rungs: 3,
    unit: 'minutes'
  },
  base_moved_retry_seconds: {
    default: 120,
    min: 60,
    max: 3600,
    unit: 'minutes'
  },
  list_poll_interval_seconds: {
    default: 30,
    min: 5,
    max: 600,
    unit: 'seconds',
    off_value: 0
  }
};

/**
 * @param {Partial<{ revision: number, values: Record<string, any>, overrides: Record<string, any> }>} [patch]
 */
function snapshotOf(patch = {}) {
  return {
    revision: 3,
    values: {
      queue_grace_seconds: 20,
      env_retry_delays_seconds: [120, 300, 900],
      base_moved_retry_seconds: 120,
      list_poll_interval_seconds: 30
    },
    overrides: {},
    fields: structuredClone(FIELDS),
    ...patch
  };
}

/**
 * @param {(type: string, payload: any) => Promise<any>} transport
 * @param {any} [initial]
 */
function mountSection(transport, initial = snapshotOf()) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  /** @type {any} */
  let state = structuredClone(initial);
  const store = {
    get: () => state,
    set: (/** @type {any} */ next) => {
      state = next;
    }
  };
  const toast = vi.fn();
  const send = vi.fn(transport);
  const section = createTimingSection(host, {
    transport: send,
    timingSettingsStore: store,
    toast
  });
  section.render();
  return { host, section, store, toast, send };
}

/**
 * @param {HTMLElement} host
 * @param {string} key
 * @param {number} index
 * @returns {HTMLInputElement}
 */
function inputOf(host, key, index = 0) {
  return /** @type {HTMLInputElement} */ (
    host.querySelectorAll(`[data-key="${key}"] input`)[index]
  );
}

/**
 * @param {HTMLInputElement} input
 * @param {string} text
 */
function type(input, text) {
  input.value = text;
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

/**
 * @param {HTMLElement} host
 * @param {string} action
 * @returns {HTMLButtonElement}
 */
function button(host, action) {
  return /** @type {HTMLButtonElement} */ (
    host.querySelector(`[data-action="${action}"]`)
  );
}

/** Let the section's async save settle. */
async function settle() {
  for (let i = 0; i < 6; i += 1) {
    await Promise.resolve();
  }
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('timing section render (UI-ny0h §3.5)', () => {
  test('draws the note first and the groups in spec order', () => {
    const { host } = mountSection(async () => ({}));

    const section = host.querySelector('[data-group="timing"]');
    expect(
      section?.querySelector('.settings-dialog__hint-block')?.textContent
    ).toBe(TIMING_INTRO);
    expect(
      Array.from(host.querySelectorAll('.settings-timing__title')).map(
        (title) => title.textContent
      )
    ).toEqual(['대기 진입', '재시도·재확인', 'PR·목록 새로고침']);
  });

  test('draws nothing before a snapshot arrives', () => {
    const host = document.createElement('div');
    const section = createTimingSection(host, {
      transport: async () => ({}),
      timingSettingsStore: { get: () => null }
    });

    section.render();

    expect(host.textContent?.trim()).toBe('');
  });

  test('draws a ladder as chained inputs in minutes with a default hint', () => {
    const { host } = mountSection(async () => ({}));

    const row = host.querySelector('[data-key="env_retry_delays_seconds"]');

    expect(
      Array.from(row?.querySelectorAll('input') ?? []).map((i) => i.value)
    ).toEqual(['2', '5', '15']);
    expect(row?.querySelectorAll('.settings-timing__arrow')).toHaveLength(2);
    expect(row?.querySelector('.settings-timing__unit')?.textContent).toBe(
      '분'
    );
    expect(row?.querySelector('.settings-timing__default')?.textContent).toBe(
      '기본 2 → 5 → 15분'
    );
  });

  test('adds the off hint to a row that has an off value', () => {
    const { host } = mountSection(async () => ({}));

    const hint = host.querySelector(
      '[data-key="list_poll_interval_seconds"] .settings-timing__default'
    );

    expect(hint?.textContent).toBe('기본 30초 · 0이면 끔');
  });

  test('draws 기본값 only on a row the server overrides', () => {
    const { host } = mountSection(
      async () => ({}),
      snapshotOf({
        values: { ...snapshotOf().values, queue_grace_seconds: 45 },
        overrides: { queue_grace_seconds: 45 }
      })
    );

    const rows = Array.from(host.querySelectorAll('.settings-timing__row'));

    expect(
      rows.map((row) => !!row.querySelector('[data-action="timing-reset"]'))
    ).toEqual([true, false, false, false]);
  });
});

describe('timing section input checks', () => {
  test('shows the range reason under the row and disables 저장', () => {
    const { host } = mountSection(async () => ({}));

    type(inputOf(host, 'queue_grace_seconds'), '9999');

    expect(
      host.querySelector(
        '[data-key="queue_grace_seconds"] .settings-timing__error'
      )?.textContent
    ).toContain('600초 이하');
    expect(button(host, 'timing-save').disabled).toBe(true);
  });

  test('rejects a shrinking ladder', () => {
    const { host } = mountSection(async () => ({}));

    type(inputOf(host, 'env_retry_delays_seconds', 2), '3');

    expect(
      host.querySelector(
        '[data-key="env_retry_delays_seconds"] .settings-timing__error'
      )?.textContent
    ).toContain('줄어들 수 없습니다');
    expect(button(host, 'timing-save').disabled).toBe(true);
  });

  test('accepts the off value and rejects the gap below the minimum', () => {
    const { host } = mountSection(async () => ({}));
    const input = inputOf(host, 'list_poll_interval_seconds');

    type(input, '0');
    const off_error = host.querySelector(
      '[data-key="list_poll_interval_seconds"] .settings-timing__error'
    );
    type(input, '3');
    const gap_error = host.querySelector(
      '[data-key="list_poll_interval_seconds"] .settings-timing__error'
    );

    expect(off_error).toBeNull();
    expect(gap_error?.textContent).toContain('5초 이상');
  });

  test('keeps 저장 off until something changed', () => {
    const { host } = mountSection(async () => ({}));

    const before = button(host, 'timing-save').disabled;
    type(inputOf(host, 'queue_grace_seconds'), '45');
    const after = button(host, 'timing-save').disabled;

    expect([before, after]).toEqual([true, false]);
  });
});

describe('timing section saves', () => {
  test('sends only the changed keys in one request, minutes as seconds', async () => {
    const { host, send } = mountSection(async () => ({
      ok: true,
      snapshot: snapshotOf({ revision: 4 })
    }));
    type(inputOf(host, 'queue_grace_seconds'), '45');
    type(inputOf(host, 'env_retry_delays_seconds', 0), '3');

    button(host, 'timing-save').click();
    await settle();

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith('timing-settings-set', {
      expected_revision: 3,
      values: {
        queue_grace_seconds: 45,
        env_retry_delays_seconds: [180, 300, 900]
      }
    });
  });

  test('sends null for 기본값 on an overridden row', async () => {
    const { host, send } = mountSection(
      async () => ({ ok: true, snapshot: snapshotOf({ revision: 4 }) }),
      snapshotOf({
        values: { ...snapshotOf().values, queue_grace_seconds: 45 },
        overrides: { queue_grace_seconds: 45 }
      })
    );

    button(host, 'timing-reset').click();
    await settle();

    expect(send).toHaveBeenCalledWith('timing-settings-set', {
      expected_revision: 3,
      values: { queue_grace_seconds: null }
    });
  });

  test('sends null for every override on 모두 기본값', async () => {
    const { host, send } = mountSection(
      async () => ({ ok: true, snapshot: snapshotOf({ revision: 4 }) }),
      snapshotOf({
        values: {
          ...snapshotOf().values,
          queue_grace_seconds: 45,
          base_moved_retry_seconds: 300
        },
        overrides: { queue_grace_seconds: 45, base_moved_retry_seconds: 300 }
      })
    );

    button(host, 'timing-reset-all').click();
    await settle();

    expect(send).toHaveBeenCalledWith('timing-settings-set', {
      expected_revision: 3,
      values: { queue_grace_seconds: null, base_moved_retry_seconds: null }
    });
  });

  test('redraws from the latest snapshot and toasts on conflict', async () => {
    const latest = snapshotOf({
      revision: 9,
      values: { ...snapshotOf().values, queue_grace_seconds: 99 },
      overrides: { queue_grace_seconds: 99 }
    });
    const { host, toast } = mountSection(async () => ({
      ok: false,
      code: 'conflict',
      snapshot: latest
    }));
    type(inputOf(host, 'queue_grace_seconds'), '45');

    button(host, 'timing-save').click();
    await settle();

    expect(inputOf(host, 'queue_grace_seconds').value).toBe('99');
    expect(toast).toHaveBeenCalledWith(TIMING_CONFLICT_TOAST, 'warning');
  });

  test('shows the server message on the named row for invalid_value', async () => {
    const { host } = mountSection(async () => ({
      ok: false,
      code: 'invalid_value',
      key: 'queue_grace_seconds',
      message: '서버가 거절했습니다',
      snapshot: snapshotOf()
    }));
    type(inputOf(host, 'queue_grace_seconds'), '45');

    button(host, 'timing-save').click();
    await settle();

    expect(
      host.querySelector(
        '[data-key="queue_grace_seconds"] .settings-timing__error'
      )?.textContent
    ).toContain('서버가 거절했습니다');
  });

  test('keeps an edit on a key the refused save did not move', async () => {
    const { host } = mountSection(async () => ({
      ok: false,
      code: 'invalid_value',
      key: 'queue_grace_seconds',
      message: '거절',
      snapshot: snapshotOf()
    }));
    type(inputOf(host, 'queue_grace_seconds'), '45');

    button(host, 'timing-save').click();
    await settle();

    expect(inputOf(host, 'queue_grace_seconds').value).toBe('45');
  });
});
