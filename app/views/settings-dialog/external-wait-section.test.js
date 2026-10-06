import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createExternalWaitSection } from './external-wait-section.js';

/**
 * @param {Partial<{ revision: number, values: Record<string, any>, overrides: Record<string, any> }>} [patch]
 */
function snapshotOf(patch = {}) {
  return {
    revision: 2,
    values: { takeover_ratio_percent: 80 },
    overrides: {},
    fields: {
      takeover_ratio_percent: {
        default: 80,
        min: 10,
        max: 100,
        unit: 'percent'
      }
    },
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
  const send = vi.fn(transport);
  const section = createExternalWaitSection(host, {
    transport: send,
    externalWaitSettingsStore: store
  });
  section.render();
  return { host, section, store, send };
}

/**
 * @param {HTMLElement} host
 * @returns {HTMLInputElement}
 */
function ratioInput(host) {
  return /** @type {HTMLInputElement} */ (
    host.querySelector('[data-key="takeover_ratio_percent"] input')
  );
}

/**
 * @param {HTMLElement} host
 * @param {string} text
 */
function typeRatio(host, text) {
  const input = ratioInput(host);
  input.value = text;
  input.dispatchEvent(new Event('input'));
}

/**
 * @param {HTMLElement} host
 * @returns {HTMLButtonElement}
 */
function saveButton(host) {
  return /** @type {HTMLButtonElement} */ (
    host.querySelector('[data-action="external-wait-save"]')
  );
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('settings 외부 작업 group (UI-qbgj §3.6)', () => {
  test('draws the run-now ratio row with its current value', () => {
    const { host } = mountSection(vi.fn());

    expect(
      host.querySelector(
        '[data-group="external-wait"] .settings-dialog__group-title'
      )?.textContent
    ).toBe('외부 작업');
    expect(host.querySelector('.settings-timing__name')?.textContent).toBe(
      '바로 실행 기본 자원 비율(%)'
    );
    expect(ratioInput(host).value).toBe('80');
  });

  test('sends only the changed ratio with the expected revision', async () => {
    const { host, send } = mountSection(async () => ({
      ok: true,
      snapshot: snapshotOf({
        revision: 3,
        values: { takeover_ratio_percent: 60 },
        overrides: { takeover_ratio_percent: 60 }
      })
    }));
    typeRatio(host, '60');

    saveButton(host).click();
    await Promise.resolve();

    expect(send).toHaveBeenCalledWith('external-wait-settings-set', {
      expected_revision: 2,
      values: { takeover_ratio_percent: 60 }
    });
  });

  test('keeps the save button off for a value outside the range', () => {
    const { host } = mountSection(vi.fn());

    typeRatio(host, '5');

    expect(saveButton(host).disabled).toBe(true);
    expect(
      host.querySelector('.settings-timing__error')?.textContent?.trim()
    ).toBe('10 이상 100 이하여야 합니다');
  });

  test('draws nothing before a snapshot arrives', () => {
    const { host } = mountSection(vi.fn(), null);

    expect(host.querySelector('[data-group="external-wait"]')).toBeNull();
  });
});
