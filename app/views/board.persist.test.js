import { describe, expect, test } from 'vitest';
import { createSubscriptionIssueStore } from '../data/subscription-issue-store.js';
import { createBoardView } from './board.js';

function createTestIssueStores() {
  /** @type {Map<string, any>} */
  const stores = new Map();
  /** @type {Set<() => void>} */
  const listeners = new Set();
  /**
   * @param {string} id
   * @returns {any}
   */
  function getStore(id) {
    let s = stores.get(id);
    if (!s) {
      s = createSubscriptionIssueStore(id);
      stores.set(id, s);
      s.subscribe(() => {
        for (const fn of Array.from(listeners)) {
          try {
            fn();
          } catch {
            /* ignore */
          }
        }
      });
    }
    return s;
  }
  return {
    getStore,
    /** @param {string} id */
    snapshotFor(id) {
      return getStore(id).snapshot().slice();
    },
    /** @param {() => void} fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}

describe('views/board persisted closed filter via store', () => {
  test('applies persisted closed_filter and updates store on change', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    const issues = [
      { id: 'A', closed_at: new Date(now - 8 * oneDay).getTime() },
      { id: 'B', closed_at: new Date(now - 2 * oneDay).getTime() },
      { id: 'C', closed_at: new Date(now).getTime() }
    ];
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:board:closed').applyPush({
      type: 'snapshot',
      id: 'tab:board:closed',
      revision: 1,
      issues
    });

    /** @type {{ state: any, subs: ((s:any)=>void)[], getState: () => any, setState: (patch:any)=>void, subscribe: (fn:(s:any)=>void)=>()=>void }} */
    const store = {
      state: {
        selected_id: null,
        view: 'board',
        filters: { status: 'all', search: '', type: '' },
        board: { closed_filter: '7' }
      },
      subs: [],
      getState() {
        return this.state;
      },
      setState(patch) {
        this.state = {
          ...this.state,
          ...(patch || {}),
          filters: { ...this.state.filters, ...(patch.filters || {}) },
          board: { ...this.state.board, ...(patch.board || {}) }
        };
        for (const fn of this.subs) {
          fn(this.state);
        }
      },
      subscribe(fn) {
        this.subs.push(fn);
        return () => {
          this.subs = this.subs.filter((f) => f !== fn);
        };
      }
    };

    const view = createBoardView(
      mount,
      null,
      () => {},
      store,
      undefined,
      issueStores
    );
    await view.load();

    // With persisted '7' days, B and C visible (A is 8 days old)
    let closed_ids = Array.from(
      mount.querySelectorAll('#closed-col .board-card')
    ).map((el) => el.getAttribute('data-issue-id'));
    expect(closed_ids).toEqual(['C', 'B']);

    // Select reflects persisted value
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('#closed-filter')
    );
    expect(select.value).toBe('7');

    // Change to '3' and ensure store updates
    select.value = '3';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    expect(store.getState().board.closed_filter).toBe('3');

    // Now still B and C visible (both within 3 days)
    closed_ids = Array.from(
      mount.querySelectorAll('#closed-col .board-card')
    ).map((el) => el.getAttribute('data-issue-id'));
    expect(closed_ids).toEqual(['C', 'B']);
  });

  test('keeps deferred column session-local in store and toggles from header button', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:board:deferred').applyPush({
      type: 'snapshot',
      id: 'tab:board:deferred',
      revision: 1,
      issues: [
        {
          id: 'D-1',
          title: 'deferred',
          status: 'deferred',
          created_at: Date.now(),
          updated_at: Date.now(),
          issue_type: 'task'
        }
      ]
    });

    /** @type {{ state: any, subs: ((s:any)=>void)[], getState: () => any, setState: (patch:any)=>void, subscribe: (fn:(s:any)=>void)=>()=>void }} */
    const store = {
      state: {
        selected_id: null,
        view: 'board',
        filters: { status: 'all', search: '', type: '' },
        board: { closed_filter: 'today', show_deferred_column: false }
      },
      subs: [],
      getState() {
        return this.state;
      },
      setState(patch) {
        this.state = {
          ...this.state,
          ...(patch || {}),
          filters: { ...this.state.filters, ...(patch.filters || {}) },
          board: { ...this.state.board, ...(patch.board || {}) }
        };
        for (const fn of this.subs) {
          fn(this.state);
        }
      },
      subscribe(fn) {
        this.subs.push(fn);
        return () => {
          this.subs = this.subs.filter((f) => f !== fn);
        };
      }
    };

    const view = createBoardView(
      mount,
      null,
      () => {},
      store,
      undefined,
      issueStores
    );
    await view.load();

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.board-deferred-toggle')
    );
    expect(button.textContent).toContain('Deferred (1)');
    expect(mount.querySelector('#deferred-col')).toBeNull();
    expect(store.getState().board.show_deferred_column).toBe(false);

    button.click();
    expect(store.getState().board.show_deferred_column).toBe(true);
    expect(mount.querySelector('#deferred-col')).not.toBeNull();

    button.click();
    expect(store.getState().board.show_deferred_column).toBe(false);
    expect(mount.querySelector('#deferred-col')).toBeNull();
  });
});
