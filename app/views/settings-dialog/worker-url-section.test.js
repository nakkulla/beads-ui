import { afterEach, describe, expect, test, vi } from 'vitest';
import { createWorkerUrlSection } from './worker-url-section.js';

/** @type {Array<ReturnType<typeof createWorkerUrlSection>>} */
const mounted = [];

afterEach(() => {
  for (const section of mounted.splice(0)) {
    section.destroy();
  }
  document.body.innerHTML = '';
});

/**
 * @param {string|null} [value]
 * @param {string} [revision]
 * @param {string} [state]
 */
function readReply(value = 'http://common:3000', revision = 'original', state) {
  return {
    values: {},
    warnings: [],
    worker_url: {
      status: 'ok',
      effective_url: value,
      source: value === null ? 'unset' : 'common',
      workspace_override: null,
      common: {
        value,
        state: state ?? (value === null ? 'unset' : 'configured'),
        revision
      },
      warnings: []
    }
  };
}

/**
 * @param {(type: string, payload: any) => Promise<any>} reply
 */
async function mount(reply) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const transport = vi.fn(reply);
  const notify = vi.fn();
  const section = createWorkerUrlSection(host, { transport, notify });
  mounted.push(section);
  await section.load();
  return { host, transport, notify };
}

/**
 * @param {HTMLElement} host
 * @param {string} selector
 * @returns {any}
 */
function el(host, selector) {
  return host.querySelector(selector);
}

/**
 * @param {HTMLElement} host
 * @param {string} value
 */
function type(host, value) {
  const input = el(host, '[data-worker-common-input]');
  input.value = value;
  input.dispatchEvent(new Event('input'));
}

/**
 * @param {any} transport
 * @returns {any[]}
 */
function savesOf(transport) {
  return transport.mock.calls
    .filter((/** @type {any[]} */ call) => call[0] === 'set-worker-url-common')
    .map((/** @type {any[]} */ call) => call[1]);
}

/** Let a click's save settle. */
async function settle() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('createWorkerUrlSection (UI-32oq §4.5)', () => {
  test('reads the common value through the connected workspace', async () => {
    const { transport } = await mount(async () => readReply());

    expect(transport.mock.calls).toEqual([['get-session-defaults', {}]]);
  });

  test('shows the stored common value', async () => {
    const { host } = await mount(async () => readReply());

    expect(el(host, '[data-worker-url-state]').textContent).toBe(
      'http://common:3000'
    );
  });

  test('shows an unset common value as 미설정', async () => {
    const { host } = await mount(async () => readReply(null));

    expect(el(host, '[data-worker-url-state]').textContent).toBe('미설정');
  });

  test('names the helper failure when the resolver is unavailable', async () => {
    const { host } = await mount(async () => ({
      values: {},
      worker_url: {
        status: 'unavailable',
        error: { code: 'helper_unavailable' }
      }
    }));

    expect(el(host, '[data-worker-url-state]').textContent).toContain(
      '도우미 설치/실행 필요'
    );
    expect(el(host, '[data-worker-common-input]').disabled).toBe(true);
  });

  test('shows only the common-address resolver warnings', async () => {
    const reply = readReply();
    reply.worker_url.warnings = /** @type {any} */ ([
      'workspace_invalid',
      'common_unavailable'
    ]);
    const { host } = await mount(async () => reply);

    expect(el(host, '[data-worker-url-warnings]').textContent).toBe(
      '공통 설정을 읽지 못해 공통값을 사용하지 않습니다'
    );
  });

  test('draws no connectivity check control', async () => {
    const { host } = await mount(async () => readReply());

    expect(el(host, '[data-worker-url-refresh]')).toBe(null);
  });

  test.each(['invalid', 'unavailable'])(
    'disables editing of a %s common document',
    async (state) => {
      const { host } = await mount(async () =>
        readReply('http://common:3000', 'original', state)
      );

      expect(el(host, '[data-worker-common-save]').disabled).toBe(true);
    }
  );

  test('saves a typed origin under the revision it read', async () => {
    const { host, transport } = await mount(async (kind, payload) => {
      if (kind === 'set-worker-url-common') {
        const saved = readReply(payload.value, 'saved');
        return {
          common_saved: true,
          common: saved.worker_url.common,
          worker_url: saved.worker_url
        };
      }
      return readReply();
    });
    type(host, 'http://new:3000');

    el(host, '[data-worker-common-save]').click();
    await settle();

    expect(savesOf(transport)).toEqual([
      { value: 'http://new:3000', expected_revision: 'original' }
    ]);
    expect(el(host, '[data-worker-url-state]').textContent).toBe(
      'http://new:3000'
    );
  });

  test('sends null from 지우기', async () => {
    const { host, transport } = await mount(async () => readReply());

    el(host, '[data-worker-common-clear]').click();
    await settle();

    expect(savesOf(transport)).toEqual([
      { value: null, expected_revision: 'original' }
    ]);
  });

  test('refuses an origin with a path before sending', async () => {
    const { host, transport } = await mount(async () => readReply());
    type(host, 'http://host/path');

    el(host, '[data-worker-common-save]').click();
    await settle();

    expect(savesOf(transport)).toEqual([]);
    expect(
      el(host, '[data-worker-common-input]').getAttribute('aria-invalid')
    ).toBe('true');
  });

  test('keeps the typed value and notifies on a revision conflict', async () => {
    const { host, notify } = await mount(async (kind) => {
      if (kind === 'set-worker-url-common') {
        throw { code: 'revision_conflict' };
      }
      return readReply();
    });
    type(host, 'http://draft:3000');

    el(host, '[data-worker-common-save]').click();
    await settle();

    expect(notify).toHaveBeenCalledWith(
      '다른 창에서 변경됨 — 취소/최신값 채택 후 다시 시도'
    );
    expect(el(host, '[data-worker-common-input]').value).toBe(
      'http://draft:3000'
    );
  });

  test('adopts the value saved elsewhere after a conflict on 취소/최신값 채택', async () => {
    let stored = readReply();
    let conflicts = 1;
    const { host, transport } = await mount(async (kind, payload) => {
      if (kind === 'set-worker-url-common') {
        if (conflicts > 0) {
          conflicts -= 1;
          stored = readReply('http://external:3000', 'external');
          throw { code: 'revision_conflict' };
        }
        const saved = readReply(payload.value, 'saved');
        return {
          common_saved: true,
          common: saved.worker_url.common,
          worker_url: saved.worker_url
        };
      }
      return stored;
    });
    type(host, 'http://draft:3000');
    el(host, '[data-worker-common-save]').click();
    await settle();

    el(host, '[data-worker-common-cancel]').click();
    el(host, '[data-worker-common-save]').click();
    await settle();

    expect(savesOf(transport)).toEqual([
      { value: 'http://draft:3000', expected_revision: 'original' },
      { value: 'http://external:3000', expected_revision: 'external' }
    ]);
  });

  test('shows the value saved elsewhere once a conflict is read back', async () => {
    let stored = readReply();
    const { host } = await mount(async (kind) => {
      if (kind === 'set-worker-url-common') {
        stored = readReply('http://external:3000', 'external');
        throw { code: 'revision_conflict' };
      }
      return stored;
    });
    type(host, 'http://draft:3000');

    el(host, '[data-worker-common-save]').click();
    await settle();

    expect([
      el(host, '[data-worker-url-state]').textContent,
      el(host, '[data-worker-common-input]').value
    ]).toEqual(['http://external:3000', 'http://draft:3000']);
  });

  test('puts the read value back on 취소/최신값 채택', async () => {
    const { host } = await mount(async () => readReply());
    type(host, 'http://draft:3000');

    el(host, '[data-worker-common-cancel]').click();

    expect(el(host, '[data-worker-common-input]').value).toBe(
      'http://common:3000'
    );
  });
});
