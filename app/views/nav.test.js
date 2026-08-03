import { describe, expect, test, vi } from 'vitest';
import { createTopNav } from './nav.js';

function setup() {
  document.body.innerHTML = '<div id="m"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const store = {
    state: { view: 'board' },
    getState() {
      return this.state;
    },
    /** @param {any} v */
    set(v) {
      this.state = { ...this.state, ...v };
    },
    /** @param {(s: any) => void} fn */
    subscribe(fn) {
      this._fn = fn;
      return () => void 0;
    },
    _fn: /** @type {(s: any) => void} */ (() => {})
  };
  const router = { gotoView: vi.fn() };
  return { mount, store, router };
}

describe('views/nav', () => {
  test('renders three tabs and routes between Board, Worker and Monitor', async () => {
    const { mount, store, router } = setup();
    createTopNav(
      mount,
      /** @type {any} */ (store),
      /** @type {any} */ (router)
    );
    const links = mount.querySelectorAll('a.ctl-tab');
    expect(links.length).toBe(3);
    links[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(router.gotoView).toHaveBeenCalledWith('board');
    links[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(router.gotoView).toHaveBeenCalledWith('worker');
    links[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(router.gotoView).toHaveBeenCalledWith('monitor');
  });

  test('marks the Monitor tab active on the monitor view', async () => {
    const { mount, store, router } = setup();
    store.set({ view: 'monitor' });

    createTopNav(
      mount,
      /** @type {any} */ (store),
      /** @type {any} */ (router)
    );

    const active = mount.querySelector('a.ctl-tab.is-active');
    expect(active?.textContent?.trim()).toBe('Monitor');
  });
});
