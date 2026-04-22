import { describe, expect, test, vi } from 'vitest';
import { createSubscriptionIssueStore } from '../data/subscription-issue-store.js';
import { createStore } from '../state.js';
import { createListView } from './list.js';

/**
 * Helper to toggle a filter option in a dropdown.
 *
 * @param {HTMLElement} mount - The container element
 * @param {number} dropdownIndex - 0 = status, 1 = types
 * @param {string} optionText - Text to match in the option label
 */
function toggleFilter(mount, dropdownIndex, optionText) {
  const dropdowns = mount.querySelectorAll('.filter-dropdown');
  const dropdown = dropdowns[dropdownIndex];
  // Open the dropdown
  const trigger = /** @type {HTMLButtonElement} */ (
    dropdown.querySelector('.filter-dropdown__trigger')
  );
  trigger.click();
  // Find and click the checkbox
  const option = Array.from(
    dropdown.querySelectorAll('.filter-dropdown__option')
  ).find((opt) => opt.textContent?.includes(optionText));
  const checkbox = /** @type {HTMLInputElement} */ (
    option?.querySelector('input[type="checkbox"]')
  );
  checkbox.click();
}

/**
 * Check if a filter option is checked in a dropdown.
 *
 * @param {HTMLElement} mount - The container element
 * @param {number} dropdownIndex - 0 = status, 1 = types
 * @param {string} optionText - Text to match in the option label
 * @returns {boolean}
 */
function isFilterChecked(mount, dropdownIndex, optionText) {
  const dropdowns = mount.querySelectorAll('.filter-dropdown');
  const dropdown = dropdowns[dropdownIndex];
  const option = Array.from(
    dropdown.querySelectorAll('.filter-dropdown__option')
  ).find((opt) => opt.textContent?.includes(optionText));
  const checkbox = /** @type {HTMLInputElement} */ (
    option?.querySelector('input[type="checkbox"]')
  );
  return checkbox?.checked ?? false;
}

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

describe('views/list', () => {
  test('renders issues from push stores and navigates on row click', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issues = [
      {
        id: 'UI-1',
        title: 'One',
        status: 'open',
        priority: 1,
        issue_type: 'task'
      },
      {
        id: 'UI-2',
        title: 'Two',
        status: 'closed',
        priority: 2,
        issue_type: 'bug'
      }
    ];
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues
    });

    const view = createListView(
      mount,
      async () => [],
      (hash) => {
        window.location.hash = hash;
      },
      undefined,
      undefined,
      issueStores
    );
    await view.load();
    const rows = mount.querySelectorAll('tr.issue-row');
    expect(rows.length).toBe(2);

    // badge present
    const badges = mount.querySelectorAll('.type-badge');
    expect(badges.length).toBeGreaterThanOrEqual(2);

    const first = /** @type {HTMLElement} */ (rows[0]);
    first.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(window.location.hash).toBe('#/issues?issue=UI-1');
  });

  test('filters by status and search', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issues = [
      { id: 'UI-1', title: 'Alpha', status: 'open', priority: 1 },
      { id: 'UI-2', title: 'Beta', status: 'in_progress', priority: 2 },
      { id: 'UI-3', title: 'Gamma', status: 'closed', priority: 3 }
    ];
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      undefined,
      undefined,
      issueStores
    );
    await view.load();
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('input[type="search"]')
    );

    // Filter by status using dropdown checkbox
    toggleFilter(mount, 0, 'Open');
    await Promise.resolve();
    expect(mount.querySelectorAll('tr.issue-row').length).toBe(1);

    // Clear status filter and search
    toggleFilter(mount, 0, 'Open'); // toggle off to show all
    await Promise.resolve();
    input.value = 'ga';
    input.dispatchEvent(new Event('input'));
    const visible = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => ({
        id: el.getAttribute('data-issue-id') || '',
        text: el.textContent || ''
      })
    );
    expect(visible.length).toBe(1);
    expect(visible[0].id).toBe('UI-3');
    expect(visible[0].text.toLowerCase()).toContain('gamma');
  });

  test('shows Deferred in status filter and inline status select', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues: [
        {
          id: 'UI-5',
          title: 'Deferred option',
          status: 'open',
          priority: 2,
          issue_type: 'task'
        }
      ]
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      undefined,
      undefined,
      issueStores
    );

    await view.load();

    const filter_option = Array.from(
      mount.querySelectorAll('.filter-dropdown__option')
    ).find((option) => option.textContent?.includes('Deferred'));
    const status_select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('tr.issue-row .badge-select.badge--status')
    );
    const option_values = Array.from(status_select.options).map(
      (option) => option.value
    );

    expect(filter_option).toBeTruthy();
    expect(option_values).toContain('deferred');
  });

  test('filters by issue type and combines with search', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issues = [
      {
        id: 'UI-1',
        title: 'Alpha',
        status: 'open',
        priority: 1,
        issue_type: 'bug'
      },
      {
        id: 'UI-2',
        title: 'Beta',
        status: 'open',
        priority: 2,
        issue_type: 'feature'
      },
      {
        id: 'UI-3',
        title: 'Gamma',
        status: 'open',
        priority: 3,
        issue_type: 'bug'
      },
      {
        id: 'UI-4',
        title: 'Delta',
        status: 'open',
        priority: 2,
        issue_type: 'task'
      }
    ];
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      undefined,
      undefined,
      issueStores
    );
    await view.load();

    // Initially shows all
    expect(mount.querySelectorAll('tr.issue-row').length).toBe(4);

    // Select bug using dropdown
    toggleFilter(mount, 1, 'Bug');
    await Promise.resolve();
    const bug_only = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(bug_only).toEqual(['UI-1', 'UI-3']);

    // Toggle off bug, toggle on feature
    toggleFilter(mount, 1, 'Bug');
    toggleFilter(mount, 1, 'Feature');
    await Promise.resolve();
    const feature_only = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(feature_only).toEqual(['UI-2']);

    // Toggle off feature, toggle on bug, combine with search
    toggleFilter(mount, 1, 'Feature');
    toggleFilter(mount, 1, 'Bug');
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('input[type="search"]')
    );
    input.value = 'ga';
    input.dispatchEvent(new Event('input'));
    await Promise.resolve();
    const filtered = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(filtered).toEqual(['UI-3']);
  });

  test('applies type filters after Ready reload', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const allIssues = [
      {
        id: 'UI-1',
        title: 'One',
        status: 'open',
        priority: 1,
        issue_type: 'task'
      },
      {
        id: 'UI-2',
        title: 'Two',
        status: 'open',
        priority: 2,
        issue_type: 'feature'
      },
      {
        id: 'UI-3',
        title: 'Three',
        status: 'open',
        priority: 2,
        issue_type: 'bug'
      }
    ];
    const readyIssues = [
      {
        id: 'UI-2',
        title: 'Two',
        status: 'open',
        priority: 2,
        issue_type: 'feature'
      },
      {
        id: 'UI-3',
        title: 'Three',
        status: 'open',
        priority: 2,
        issue_type: 'bug'
      }
    ];

    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues: allIssues
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      undefined,
      undefined,
      issueStores
    );
    await view.load();
    const statusSelect = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select')
    );
    statusSelect.value = 'ready';
    statusSelect.dispatchEvent(new Event('change'));
    // switch subscription key and apply ready membership
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 2,
      issues: readyIssues
    });
    await view.load();

    // Apply type filter (feature) using dropdown checkbox
    toggleFilter(mount, 1, 'Feature');
    await Promise.resolve();

    const rows = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(rows).toEqual(['UI-2']);

    // No RPC calls expected; derived from stores
  });

  test('initializes type filter from store and reflects in controls', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const issues = [
      {
        id: 'UI-1',
        title: 'Alpha',
        status: 'open',
        priority: 1,
        issue_type: 'bug'
      },
      {
        id: 'UI-2',
        title: 'Beta',
        status: 'open',
        priority: 2,
        issue_type: 'feature'
      },
      {
        id: 'UI-3',
        title: 'Gamma closed',
        status: 'closed',
        priority: 3,
        issue_type: 'bug'
      }
    ];

    /** @type {{ state: any, subs: ((s:any)=>void)[], getState: () => any, setState: (patch:any)=>void, subscribe: (fn:(s:any)=>void)=>()=>void }} */
    const store = {
      state: {
        selected_id: null,
        filters: { status: 'all', search: '', type: 'bug' }
      },
      subs: [],
      getState() {
        return this.state;
      },
      setState(patch) {
        this.state = {
          ...this.state,
          ...(patch || {}),
          filters: { ...this.state.filters, ...(patch.filters || {}) }
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

    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      store,
      undefined,
      issueStores
    );
    await view.load();

    // Only bug issues visible
    const rows = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(rows).toEqual(['UI-1', 'UI-3']);

    // Bug checkbox should be checked in the types dropdown
    expect(isFilterChecked(mount, 1, 'Bug')).toBe(true);
  });

  test('ready filter via select composes from push membership', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const allIssues = [
      { id: 'UI-1', title: 'One', status: 'open', priority: 1 },
      { id: 'UI-2', title: 'Two', status: 'open', priority: 2 }
    ];
    const readyIssues = [
      { id: 'UI-2', title: 'Two', status: 'open', priority: 2 }
    ];

    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues: allIssues
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      undefined,
      undefined,
      issueStores
    );
    await view.load();
    expect(mount.querySelectorAll('tr.issue-row').length).toBe(2);

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select')
    );
    select.value = 'ready';
    select.dispatchEvent(new Event('change'));
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 2,
      issues: readyIssues
    });
    await view.load();
    expect(mount.querySelectorAll('tr.issue-row').length).toBe(1);
  });

  test('switching ready → all reloads full list', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const allIssues = [
      { id: 'UI-1', title: 'One', status: 'open', priority: 1 },
      { id: 'UI-2', title: 'Two', status: 'closed', priority: 2 }
    ];
    const readyIssues = [
      { id: 'UI-2', title: 'Two', status: 'closed', priority: 2 }
    ];

    // No RPC calls are made in push-only mode

    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues: allIssues
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      undefined,
      undefined,
      issueStores
    );
    await view.load();
    expect(mount.querySelectorAll('tr.issue-row').length).toBe(2);

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select')
    );

    // Switch to ready (subscription now maps to ready-issues)
    select.value = 'ready';
    select.dispatchEvent(new Event('change'));
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 2,
      issues: readyIssues
    });
    await view.load();
    expect(mount.querySelectorAll('tr.issue-row').length).toBe(1);

    // Switch back to all; view should compose from all-issues membership
    select.value = 'all';
    select.dispatchEvent(new Event('change'));
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 3,
      issues: allIssues
    });
    await view.load();
    expect(mount.querySelectorAll('tr.issue-row').length).toBe(2);

    // No RPC calls are expected in push-only model
  });

  test('applies persisted filters from store on initial load', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const issues = [
      { id: 'UI-1', title: 'Alpha', status: 'open', priority: 1 },
      { id: 'UI-2', title: 'Gamma', status: 'open', priority: 2 },
      { id: 'UI-3', title: 'Gamma closed', status: 'closed', priority: 3 }
    ];

    /** @type {{ state: any, subs: ((s:any)=>void)[], getState: () => any, setState: (patch:any)=>void, subscribe: (fn:(s:any)=>void)=>()=>void }} */
    const store = {
      state: { selected_id: null, filters: { status: ['open'], search: 'ga' } },
      subs: [],
      getState() {
        return this.state;
      },
      setState(patch) {
        this.state = {
          ...this.state,
          ...(patch || {}),
          filters: { ...this.state.filters, ...(patch.filters || {}) }
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

    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      store,
      undefined,
      issueStores
    );
    await view.load();

    // Expect only UI-2 ("Gamma" open) to be visible
    const items = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => ({
        id: el.getAttribute('data-issue-id') || '',
        text: el.textContent || ''
      })
    );
    expect(items.length).toBe(1);
    expect(items[0].id).toBe('UI-2');

    // Controls reflect persisted filters
    expect(isFilterChecked(mount, 0, 'Open')).toBe(true);
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('input[type="search"]')
    );
    expect(input.value).toBe('ga');
  });

  test('filters by multiple statuses with dropdown checkboxes', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issues = [
      { id: 'UI-1', title: 'Alpha', status: 'open', priority: 1 },
      { id: 'UI-2', title: 'Beta', status: 'in_progress', priority: 2 },
      { id: 'UI-3', title: 'Gamma', status: 'closed', priority: 3 }
    ];
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      undefined,
      undefined,
      issueStores
    );
    await view.load();

    // Click Open checkbox to select it
    toggleFilter(mount, 0, 'Open');
    await Promise.resolve();

    // Should show only open issues
    let rows = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(rows).toEqual(['UI-1']);

    // Click In progress checkbox to add it (multi-select)
    toggleFilter(mount, 0, 'In progress');
    await Promise.resolve();

    // Should show both open and in_progress
    rows = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(rows).toEqual(['UI-1', 'UI-2']);
  });

  test('shows resolved option and merges resolved aux store for multi-status filters', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues: [
        { id: 'UI-1', title: 'Alpha', status: 'open', priority: 1 },
        { id: 'UI-2', title: 'Beta', status: 'in_progress', priority: 2 }
      ]
    });
    issueStores.getStore('tab:issues:resolved').applyPush({
      type: 'snapshot',
      id: 'tab:issues:resolved',
      revision: 1,
      issues: [{ id: 'UI-9', title: 'Gamma', status: 'resolved', priority: 3 }]
    });

    const view = createListView(
      mount,
      async () => [],
      undefined,
      undefined,
      undefined,
      issueStores
    );
    await view.load();

    const statusOptions = Array.from(
      mount.querySelectorAll('.filter-dropdown__option')
    ).map((el) => el.textContent?.trim());
    expect(statusOptions).toContain('Resolved');

    toggleFilter(mount, 0, 'Open');
    await Promise.resolve();
    toggleFilter(mount, 0, 'Resolved');
    await Promise.resolve();

    const rows = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(rows).toEqual(['UI-1', 'UI-9']);
  });

  test('uses only primary resolved store for resolved-only filters', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues: [{ id: 'UI-9', title: 'Resolved issue', status: 'resolved' }]
    });
    issueStores.getStore('tab:issues:resolved').applyPush({
      type: 'snapshot',
      id: 'tab:issues:resolved',
      revision: 1,
      issues: [{ id: 'UI-10', title: 'Stale resolved aux', status: 'resolved' }]
    });

    const view = createListView(
      mount,
      async () => [],
      undefined,
      {
        getState() {
          return {
            selected_id: null,
            view: 'issues',
            filters: {
              status: ['resolved'],
              search: '',
              type: ''
            }
          };
        },
        setState() {},
        subscribe() {
          return () => {};
        }
      },
      undefined,
      issueStores
    );

    await view.load();

    const rows = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(rows).toEqual(['UI-9']);
  });

  test('uses only primary deferred store for deferred-only filters', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues: [{ id: 'UI-8', title: 'Deferred issue', status: 'deferred' }]
    });
    issueStores.getStore('tab:issues:deferred').applyPush({
      type: 'snapshot',
      id: 'tab:issues:deferred',
      revision: 1,
      issues: [{ id: 'UI-11', title: 'Stale deferred aux', status: 'deferred' }]
    });

    const view = createListView(
      mount,
      async () => [],
      undefined,
      {
        getState() {
          return {
            selected_id: null,
            view: 'issues',
            filters: {
              status: ['deferred'],
              search: '',
              type: ''
            }
          };
        },
        setState() {},
        subscribe() {
          return () => {};
        }
      },
      undefined,
      issueStores
    );

    await view.load();

    const rows = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(rows).toEqual(['UI-8']);
  });

  test('merges resolved and deferred aux stores without duplicate rows', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues: [{ id: 'UI-1', title: 'Open issue', status: 'open', priority: 1 }]
    });
    issueStores.getStore('tab:issues:resolved').applyPush({
      type: 'snapshot',
      id: 'tab:issues:resolved',
      revision: 1,
      issues: [
        {
          id: 'UI-9',
          title: 'Resolved issue',
          status: 'resolved',
          priority: 2
        }
      ]
    });
    issueStores.getStore('tab:issues:deferred').applyPush({
      type: 'snapshot',
      id: 'tab:issues:deferred',
      revision: 1,
      issues: [
        {
          id: 'UI-8',
          title: 'Deferred issue',
          status: 'deferred',
          priority: 3
        },
        {
          id: 'UI-9',
          title: 'Resolved issue duplicate',
          status: 'resolved',
          priority: 2
        }
      ]
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      {
        getState() {
          return {
            selected_id: null,
            view: 'issues',
            filters: {
              status: ['open', 'resolved', 'deferred'],
              search: '',
              type: ''
            }
          };
        },
        setState() {},
        subscribe() {
          return () => {};
        }
      },
      undefined,
      issueStores
    );

    await view.load();

    const rows = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(rows).toEqual(['UI-1', 'UI-9', 'UI-8']);
  });

  test('filters by multiple types with dropdown checkboxes', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issues = [
      { id: 'UI-1', title: 'A', status: 'open', issue_type: 'bug' },
      { id: 'UI-2', title: 'B', status: 'open', issue_type: 'feature' },
      { id: 'UI-3', title: 'C', status: 'open', issue_type: 'task' },
      { id: 'UI-4', title: 'D', status: 'open', issue_type: 'epic' }
    ];
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      undefined,
      undefined,
      issueStores
    );
    await view.load();

    // Click Bug checkbox
    toggleFilter(mount, 1, 'Bug');
    await Promise.resolve();

    let rows = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(rows).toEqual(['UI-1']);

    // Click Feature checkbox to add it
    toggleFilter(mount, 1, 'Feature');
    await Promise.resolve();

    rows = Array.from(mount.querySelectorAll('tr.issue-row')).map(
      (el) => el.getAttribute('data-issue-id') || ''
    );
    expect(rows).toEqual(['UI-1', 'UI-2']);
  });

  test('deselecting all checkboxes shows all issues', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issues = [
      { id: 'UI-1', title: 'A', status: 'open' },
      { id: 'UI-2', title: 'B', status: 'closed' }
    ];
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      undefined,
      undefined,
      issueStores
    );
    await view.load();

    // Initially all shown
    expect(mount.querySelectorAll('tr.issue-row').length).toBe(2);

    // Click Open checkbox to filter
    toggleFilter(mount, 0, 'Open');
    await Promise.resolve();
    expect(mount.querySelectorAll('tr.issue-row').length).toBe(1);

    // Click Open checkbox again to deselect - should show all
    toggleFilter(mount, 0, 'Open');
    await Promise.resolve();
    expect(mount.querySelectorAll('tr.issue-row').length).toBe(2);
  });

  test('renders labels and created columns in the issues table', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-10-25T10:00:00.000Z'));

    try {
      document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
      const mount = /** @type {HTMLElement} */ (
        document.getElementById('mount')
      );
      const issues = [
        {
          id: 'UI-1',
          title: 'Has labels',
          status: 'open',
          priority: 1,
          issue_type: 'task',
          labels: ['area:auth', 'has:spec', 'reviewed:code'],
          created_at: Date.parse('2025-10-24T10:00:00.000Z')
        },
        {
          id: 'UI-2',
          title: 'ISO string date',
          status: 'open',
          priority: 2,
          issue_type: 'bug',
          labels: ['component:api'],
          created_at: '2025-10-25T08:00:00.000Z'
        }
      ];
      const issueStores = createTestIssueStores();
      issueStores.getStore('tab:issues').applyPush({
        type: 'snapshot',
        id: 'tab:issues',
        revision: 1,
        issues
      });
      const view = createListView(
        mount,
        async () => [],
        undefined,
        undefined,
        undefined,
        issueStores
      );

      await view.load();

      const headers = Array.from(mount.querySelectorAll('thead th')).map(
        (element) => element.textContent?.trim()
      );
      const label_badges = Array.from(
        mount.querySelectorAll(
          'tbody tr.issue-row:nth-child(1) td:nth-child(4) .label-badge'
        )
      ).map((element) => element.textContent?.trim());
      const created_text = mount
        .querySelector('tbody tr.issue-row:nth-child(1) td:nth-child(8)')
        ?.textContent?.trim();
      const iso_created_text = mount
        .querySelector('tbody tr.issue-row:nth-child(2) td:nth-child(8)')
        ?.textContent?.trim();

      expect(headers).toEqual([
        'ID',
        'Type',
        'Title',
        'Labels',
        'Status',
        'Assignee',
        'Priority',
        'Created',
        'Deps'
      ]);
      expect(
        mount.querySelectorAll('tbody tr.issue-row:nth-child(1) td')
      ).toHaveLength(9);
      expect(label_badges).toEqual(['has:spec', 'reviewed:code']);
      expect(created_text).toBe('1일 전');
      expect(iso_created_text).toBe('2시간 전');
    } finally {
      vi.useRealTimers();
    }
  });

  test('renders empty created cell for invalid timestamp without crashing', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues: [
        {
          id: 'UI-3',
          title: 'Invalid timestamp',
          status: 'open',
          priority: 1,
          issue_type: 'task',
          created_at: 'not-a-date'
        }
      ]
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      undefined,
      undefined,
      issueStores
    );

    await view.load();

    const created_cell = mount.querySelector(
      'tbody tr.issue-row:nth-child(1) td:nth-child(8)'
    );

    expect(created_cell?.textContent?.trim()).toBe('');
    expect(created_cell?.getAttribute('title')).toBe('');
  });

  test('rerenders list labels when config prefixes change', async () => {
    document.body.innerHTML = '<aside id="mount" class="panel"></aside>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:issues').applyPush({
      type: 'snapshot',
      id: 'tab:issues',
      revision: 1,
      issues: [
        {
          id: 'UI-1',
          title: 'Label policy',
          status: 'open',
          priority: 1,
          labels: ['area:auth', 'agent:codex']
        }
      ]
    });
    const store = createStore({
      config: {
        label_display_policy: {
          visible_prefixes: ['area:']
        }
      }
    });
    const view = createListView(
      mount,
      async () => [],
      undefined,
      store,
      undefined,
      issueStores
    );

    await view.load();
    expect(mount.textContent).toContain('area:auth');
    expect(mount.textContent).not.toContain('agent:codex');

    store.setState({
      config: {
        label_display_policy: {
          visible_prefixes: ['agent:']
        }
      }
    });
    await Promise.resolve();

    expect(mount.textContent).toContain('agent:codex');
    expect(mount.textContent).not.toContain('area:auth');
  });
});
