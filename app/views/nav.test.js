import { describe, expect, test, vi } from 'vitest';
import { createTopNav } from './nav.js';

function setup() {
  document.body.innerHTML =
    '<nav id="global-nav"></nav><nav id="repo-nav"></nav>';
  const global_mount = /** @type {HTMLElement} */ (
    document.getElementById('global-nav')
  );
  const repo_mount = /** @type {HTMLElement} */ (
    document.getElementById('repo-nav')
  );
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
  return { global_mount, repo_mount, store, router };
}

describe('views/nav', () => {
  test('renders Monitor on the global mount and routes to it', async () => {
    const { global_mount, repo_mount, store, router } = setup();

    createTopNav(
      { global_element: global_mount, repo_element: repo_mount },
      /** @type {any} */ (store),
      /** @type {any} */ (router)
    );
    const links = global_mount.querySelectorAll('a.ctl-tab');
    links[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(links.length).toBe(2);
    expect(links[0].classList.contains('ctl-tab--monitor')).toBe(true);
    expect(links[0].getAttribute('href')).toBe('#/monitor');
    expect(router.gotoView).toHaveBeenCalledWith('monitor');
  });

  test('renders the fourth tab 비교 beside Monitor on the global mount', async () => {
    const { global_mount, repo_mount, store, router } = setup();

    createTopNav(
      { global_element: global_mount, repo_element: repo_mount },
      /** @type {any} */ (store),
      /** @type {any} */ (router)
    );
    const compare = global_mount.querySelectorAll('a.ctl-tab')[1];
    compare.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(compare.getAttribute('href')).toBe('#/compare');
    expect(compare.textContent?.trim()).toBe('비교');
    expect(router.gotoView).toHaveBeenCalledWith('compare');
  });

  test('marks only the 비교 link active on the compare view', async () => {
    const { global_mount, repo_mount, store, router } = setup();
    store.set({ view: 'compare' });

    createTopNav(
      { global_element: global_mount, repo_element: repo_mount },
      /** @type {any} */ (store),
      /** @type {any} */ (router)
    );

    const active = global_mount.querySelectorAll('a.ctl-tab.is-active');
    expect(active.length).toBe(1);
    expect(active[0].getAttribute('href')).toBe('#/compare');
    expect(repo_mount.querySelectorAll('a.ctl-tab.is-active').length).toBe(0);
  });

  test('keeps the active 비교 tab on 비교 rather than toggling away', async () => {
    const { global_mount, repo_mount, store, router } = setup();
    store.set({ view: 'compare' });

    createTopNav(
      { global_element: global_mount, repo_element: repo_mount },
      /** @type {any} */ (store),
      /** @type {any} */ (router)
    );
    global_mount
      .querySelectorAll('a.ctl-tab')[1]
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(router.gotoView).toHaveBeenCalledWith('compare');
  });

  test('renders Board and Worker on the repo mount and routes between them', async () => {
    const { global_mount, repo_mount, store, router } = setup();

    createTopNav(
      { global_element: global_mount, repo_element: repo_mount },
      /** @type {any} */ (store),
      /** @type {any} */ (router)
    );
    const links = repo_mount.querySelectorAll('a.ctl-tab');
    links[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    links[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(links.length).toBe(2);
    expect(router.gotoView).toHaveBeenCalledWith('board');
    expect(router.gotoView).toHaveBeenCalledWith('worker');
  });

  test('marks only the global Monitor link active on the monitor view', async () => {
    const { global_mount, repo_mount, store, router } = setup();
    store.set({ view: 'monitor' });

    createTopNav(
      { global_element: global_mount, repo_element: repo_mount },
      /** @type {any} */ (store),
      /** @type {any} */ (router)
    );

    const active = global_mount.querySelector('a.ctl-tab.is-active');
    expect(active?.textContent?.trim()).toBe('Monitor');
    expect(repo_mount.querySelectorAll('a.ctl-tab.is-active').length).toBe(0);
  });

  test('routes back to Worker when the active Monitor tab is clicked again', async () => {
    const { global_mount, repo_mount, store, router } = setup();
    store.set({ view: 'monitor' });

    createTopNav(
      { global_element: global_mount, repo_element: repo_mount },
      /** @type {any} */ (store),
      /** @type {any} */ (router)
    );
    const monitor_link = global_mount.querySelectorAll('a.ctl-tab')[0];
    monitor_link.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(router.gotoView).toHaveBeenCalledWith('worker');
  });

  test('marks only the Board tab active on the board view', async () => {
    const { global_mount, repo_mount, store, router } = setup();

    createTopNav(
      { global_element: global_mount, repo_element: repo_mount },
      /** @type {any} */ (store),
      /** @type {any} */ (router)
    );

    const active = repo_mount.querySelectorAll('a.ctl-tab.is-active');
    expect(active.length).toBe(1);
    expect(active[0].textContent?.trim()).toBe('Board');
    expect(global_mount.querySelectorAll('a.ctl-tab.is-active').length).toBe(0);
  });

  test('renders the remaining mount when one mount is null', async () => {
    const { repo_mount, store, router } = setup();

    createTopNav(
      { global_element: null, repo_element: repo_mount },
      /** @type {any} */ (store),
      /** @type {any} */ (router)
    );

    expect(repo_mount.querySelectorAll('a.ctl-tab').length).toBe(2);
  });

  test('clears both mounts on destroy', async () => {
    const { global_mount, repo_mount, store, router } = setup();
    const nav = createTopNav(
      { global_element: global_mount, repo_element: repo_mount },
      /** @type {any} */ (store),
      /** @type {any} */ (router)
    );

    nav.destroy();

    expect(global_mount.querySelectorAll('a.ctl-tab').length).toBe(0);
    expect(repo_mount.querySelectorAll('a.ctl-tab').length).toBe(0);
  });
});
