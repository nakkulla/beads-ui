import { beforeEach, describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';
import { createWsClient } from './ws.js';

/**
 * @param {number} dropdownIndex
 * @param {string} optionText
 */
function toggleFilter(dropdownIndex, optionText) {
  const dropdowns = document.querySelectorAll('.filter-dropdown');
  const dropdown = dropdowns[dropdownIndex];
  const trigger = /** @type {HTMLButtonElement} */ (
    dropdown.querySelector('.filter-dropdown__trigger')
  );
  trigger.click();
  const option = Array.from(
    dropdown.querySelectorAll('.filter-dropdown__option')
  ).find((opt) => opt.textContent?.includes(optionText));
  const checkbox = /** @type {HTMLInputElement} */ (
    option?.querySelector('input[type="checkbox"]')
  );
  checkbox.click();
}

/** @type {{ type: string, payload: any }[]} */
const calls = [];

vi.mock('./ws.js', () => {
  /** @type {Record<string, (p: any) => void>} */
  const handlers = {};
  const singleton = {
    /**
     * @param {import('./protocol.js').MessageType} type
     * @param {any} payload
     */
    async send(type, payload) {
      calls.push({ type, payload });
      return null;
    },
    /**
     * @param {import('./protocol.js').MessageType} type
     * @param {(p:any)=>void} handler
     */
    on(type, handler) {
      handlers[type] = handler;
      return () => {
        delete handlers[type];
      };
    },
    /**
     * @param {import('./protocol.js').MessageType} type
     * @param {any} payload
     */
    _trigger(type, payload) {
      if (handlers[type]) {
        handlers[type](payload);
      }
    },
    onConnection() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  return { createWsClient: () => singleton };
});

describe('main deferred status wiring', () => {
  beforeEach(() => {
    calls.length = 0;
    window.localStorage.clear();
  });

  test('subscribes to deferred board column on board view', async () => {
    const client = /** @type {any} */ (createWsClient());
    void client;
    window.location.hash = '#/board';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();
    await Promise.resolve();

    const subscribeCalls = calls.filter((c) => c.type === 'subscribe-list');
    expect(subscribeCalls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          payload: expect.objectContaining({
            id: 'tab:board:deferred',
            type: 'deferred-issues'
          })
        })
      ])
    );
  });

  test('subscribes to deferred aux store and renders merged issues for open + deferred', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/issues';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();
    await Promise.resolve();

    client._trigger('snapshot', {
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues: [{ id: 'UI-1', title: 'Open issue', status: 'open' }]
    });
    await Promise.resolve();

    toggleFilter(0, 'Open');
    toggleFilter(0, 'Deferred');
    await Promise.resolve();
    await Promise.resolve();

    const subscribeCalls = calls.filter((c) => c.type === 'subscribe-list');
    expect(subscribeCalls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          payload: expect.objectContaining({
            id: 'tab:issues:deferred',
            type: 'deferred-issues'
          })
        })
      ])
    );

    client._trigger('snapshot', {
      type: 'snapshot',
      id: 'tab:issues:deferred',
      revision: 1,
      issues: [{ id: 'UI-8', title: 'Deferred issue', status: 'deferred' }]
    });
    await Promise.resolve();
    await Promise.resolve();

    const rows = Array.from(
      document.querySelectorAll('#list-root tr.issue-row')
    ).map((el) => el.getAttribute('data-issue-id') || '');
    expect(rows).toEqual(['UI-1', 'UI-8']);
  });
});
