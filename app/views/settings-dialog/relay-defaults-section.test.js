import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createRelayDefaultsSection } from './relay-defaults-section.js';

const SNAPSHOT = {
  revision: 0,
  overrides: {},
  effective: { 'claude.model': 'opus', 'claude.effort': 'high' },
  allowed: {
    'claude.model': ['opus', 'fable', 'sonnet', 'haiku'],
    'claude.effort': ['low', 'high', 'max'],
    'codex.model': '[A-Za-z0-9._-]+',
    'codex.effort': ['minimal', 'low', 'medium', 'high', 'xhigh'],
    'codex.speed': ['default', 'fast']
  }
};
const MODELS = { sol: { id: 'gpt-6.1-sol' }, 'sol-6.1': { id: 'gpt-6.1-sol' } };

/** @param {any} [patch] */
function reply(patch = {}) {
  return {
    ok: true,
    snapshot: structuredClone(SNAPSHOT),
    codex_models: MODELS,
    ...patch
  };
}

/** @param {any} transport */
function mount(transport) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const section = createRelayDefaultsSection(host, { transport });
  section.render();
  return { host, section };
}

async function settle() {
  for (let i = 0; i < 8; i += 1) {
    await Promise.resolve();
  }
}

/**
 * @param {HTMLElement} host
 * @param {string} key
 */
function selectOf(host, key) {
  return /** @type {HTMLSelectElement} */ (
    host.querySelector(`[data-key="${key}"] select`)
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

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('Hermes session defaults section', () => {
  test('loads hub choices and shows effective defaults', async () => {
    const transport = vi.fn().mockResolvedValue(reply());
    const { host } = mount(transport);

    await settle();

    expect(transport).toHaveBeenCalledExactlyOnceWith('relay-defaults-get', {});
    expect(host.querySelectorAll('select')).toHaveLength(5);
    expect(selectOf(host, 'claude.model').value).toBe('');
    expect(host.textContent).toContain('적용: opus');
    expect(
      Array.from(selectOf(host, 'codex.model').options).map((option) => [
        option.value,
        option.textContent?.trim()
      ])
    ).toEqual([
      ['', '따름'],
      ['gpt-6.1-sol', 'sol']
    ]);
  });

  test('saves the catalog CLI model id under the current revision', async () => {
    const transport = vi.fn().mockResolvedValue(reply());
    const { host } = mount(transport);
    await settle();

    choose(selectOf(host, 'codex.model'), 'gpt-6.1-sol');
    await settle();

    expect(transport).toHaveBeenLastCalledWith('relay-defaults-set', {
      expected_revision: 0,
      values: { 'codex.model': 'gpt-6.1-sol' }
    });
  });

  test('clears an override when following the hub defaults', async () => {
    const snapshot = {
      ...SNAPSHOT,
      revision: 2,
      overrides: { 'codex.speed': 'fast' },
      effective: { 'codex.speed': 'fast' }
    };
    const transport = vi.fn().mockResolvedValue(reply({ snapshot }));
    const { host } = mount(transport);
    await settle();

    choose(selectOf(host, 'codex.speed'), '');
    await settle();

    expect(transport).toHaveBeenLastCalledWith('relay-defaults-set', {
      expected_revision: 2,
      values: { 'codex.speed': null }
    });
  });

  test.each(['conflict', 'invalid_value'])(
    'shows %s and adopts the returned revision',
    async (code) => {
      const transport = vi
        .fn()
        .mockResolvedValueOnce(reply())
        .mockResolvedValueOnce(
          reply({
            ok: false,
            code,
            message: 'refused',
            snapshot: { ...SNAPSHOT, revision: 5 }
          })
        )
        .mockResolvedValue(reply());
      const { host } = mount(transport);
      await settle();

      choose(selectOf(host, 'codex.speed'), 'fast');
      await settle();
      expect(host.querySelector('[role="alert"]')?.textContent).toContain(code);
      choose(selectOf(host, 'codex.effort'), 'high');
      await settle();

      expect(transport).toHaveBeenLastCalledWith('relay-defaults-set', {
        expected_revision: 5,
        values: { 'codex.effort': 'high' }
      });
    }
  );

  test('disables editing after the hub fails to save', async () => {
    const transport = vi
      .fn()
      .mockResolvedValueOnce(reply())
      .mockResolvedValueOnce({
        ok: false,
        code: 'hub_unavailable',
        message: 'unavailable'
      });
    const { host } = mount(transport);
    await settle();

    choose(selectOf(host, 'codex.speed'), 'fast');
    await settle();

    expect(
      Array.from(host.querySelectorAll('select')).every(
        (select) => select.disabled
      )
    ).toBe(true);
    expect(host.textContent).toContain('hub_unavailable');
  });

  test('shows a read-only error when the hub is missing', async () => {
    const transport = vi.fn().mockRejectedValue(new Error('missing CLI'));
    const { host } = mount(transport);

    await settle();

    expect(host.querySelectorAll('select')).toHaveLength(0);
    expect(host.textContent).toContain('missing CLI');
  });

  test('keeps an unknown stored model visible', async () => {
    const transport = vi.fn().mockResolvedValue(
      reply({
        snapshot: { ...SNAPSHOT, overrides: { 'codex.model': 'old-model' } }
      })
    );
    const { host } = mount(transport);

    await settle();

    expect(selectOf(host, 'codex.model').value).toBe('old-model');
    expect(host.textContent).toContain('old-model (목록에 없음)');
  });
});
