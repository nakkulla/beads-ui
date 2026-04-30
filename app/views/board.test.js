import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test, vi } from 'vitest';
import { createSubscriptionIssueStore } from '../data/subscription-issue-store.js';
import { createStore } from '../state.js';
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

describe('views/board', () => {
  test('renders five columns (Blocked, Ready, In Progress, Resolved, Closed) with sorted cards and navigates on click', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const now = Date.now();
    const issues = [
      // Blocked
      {
        id: 'B-2',
        title: 'b2',
        priority: 1,
        created_at: new Date('2025-10-22T07:00:00.000Z').getTime(),
        updated_at: new Date('2025-10-22T07:00:00.000Z').getTime(),
        issue_type: 'task'
      },
      {
        id: 'B-1',
        title: 'b1',
        priority: 0,
        created_at: new Date('2025-10-21T07:00:00.000Z').getTime(),
        updated_at: new Date('2025-10-21T07:00:00.000Z').getTime(),
        issue_type: 'bug'
      },
      // Ready
      {
        id: 'R-2',
        title: 'r2',
        priority: 1,
        created_at: new Date('2025-10-20T08:00:00.000Z').getTime(),
        updated_at: new Date('2025-10-20T08:00:00.000Z').getTime(),
        issue_type: 'task'
      },
      {
        id: 'R-1',
        title: 'r1',
        priority: 0,
        created_at: new Date('2025-10-21T08:00:00.000Z').getTime(),
        updated_at: new Date('2025-10-21T08:00:00.000Z').getTime(),
        issue_type: 'bug'
      },
      {
        id: 'R-3',
        title: 'r3',
        priority: 1,
        created_at: new Date('2025-10-22T08:00:00.000Z').getTime(),
        updated_at: new Date('2025-10-22T08:00:00.000Z').getTime(),
        issue_type: 'feature'
      },
      // In progress
      {
        id: 'P-1',
        title: 'p1',
        created_at: new Date('2025-10-23T09:00:00.000Z').getTime(),
        updated_at: new Date('2025-10-23T09:00:00.000Z').getTime(),
        issue_type: 'task'
      },
      {
        id: 'P-2',
        title: 'p2',
        created_at: new Date('2025-10-22T09:00:00.000Z').getTime(),
        updated_at: new Date('2025-10-22T09:00:00.000Z').getTime(),
        issue_type: 'feature'
      },
      // Resolved
      {
        id: 'RS-2',
        title: 'rs2',
        updated_at: new Date('2025-10-20T08:00:00.000Z').getTime(),
        created_at: new Date('2025-10-20T08:00:00.000Z').getTime(),
        issue_type: 'task'
      },
      {
        id: 'RS-1',
        title: 'rs1',
        updated_at: new Date('2025-10-19T08:00:00.000Z').getTime(),
        created_at: new Date('2025-10-19T08:00:00.000Z').getTime(),
        priority: 0,
        issue_type: 'bug'
      },
      // Closed
      {
        id: 'C-2',
        title: 'c2',
        updated_at: new Date('2025-10-20T09:00:00.000Z').getTime(),
        closed_at: new Date(now).getTime(),
        issue_type: 'task'
      },
      {
        id: 'C-1',
        title: 'c1',
        updated_at: new Date('2025-10-21T09:00:00.000Z').getTime(),
        closed_at: new Date(now - 1000).getTime(),
        issue_type: 'bug'
      }
    ];
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:board:blocked').applyPush({
      type: 'snapshot',
      id: 'tab:board:blocked',
      revision: 1,
      issues: issues.filter((i) => i.id.startsWith('B-'))
    });
    issueStores.getStore('tab:board:ready').applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
      revision: 1,
      issues: issues.filter((i) => i.id.startsWith('R-'))
    });
    issueStores.getStore('tab:board:in-progress').applyPush({
      type: 'snapshot',
      id: 'tab:board:in-progress',
      revision: 1,
      issues: issues.filter((i) => i.id.startsWith('P-'))
    });
    issueStores.getStore('tab:board:resolved').applyPush({
      type: 'snapshot',
      id: 'tab:board:resolved',
      revision: 1,
      issues: issues.filter((i) => i.id.startsWith('RS-'))
    });
    issueStores.getStore('tab:board:closed').applyPush({
      type: 'snapshot',
      id: 'tab:board:closed',
      revision: 1,
      issues: issues.filter((i) => i.id.startsWith('C-'))
    });

    /** @type {string[]} */
    const navigations = [];
    const view = createBoardView(
      mount,
      null,
      (id) => {
        navigations.push(id);
      },
      undefined,
      undefined,
      issueStores
    );

    await view.load();

    // Blocked: created_at desc, then priority asc for equal timestamps
    const blocked_ids = Array.from(
      mount.querySelectorAll('#blocked-col .board-card .mono')
    ).map((el) => el.textContent?.trim());
    expect(blocked_ids).toEqual(['B-2', 'B-1']);

    // Ready: created_at desc before priority tie-breaks
    const ready_ids = Array.from(
      mount.querySelectorAll('#ready-col .board-card .mono')
    ).map((el) => el.textContent?.trim());
    expect(ready_ids).toEqual(['R-3', 'R-1', 'R-2']);

    // In progress: created_at desc
    const prog_ids = Array.from(
      mount.querySelectorAll('#in-progress-col .board-card .mono')
    ).map((el) => el.textContent?.trim());
    expect(prog_ids).toEqual(['P-1', 'P-2']);

    // Resolved: created_at desc
    const resolved_ids = Array.from(
      mount.querySelectorAll('#resolved-col .board-card .mono')
    ).map((el) => el.textContent?.trim());
    expect(resolved_ids).toEqual(['RS-2', 'RS-1']);

    // Closed: closed_at desc
    const closed_ids = Array.from(
      mount.querySelectorAll('#closed-col .board-card .mono')
    ).map((el) => el.textContent?.trim());
    expect(closed_ids).toEqual(['C-2', 'C-1']);

    // Click navigates
    const first_ready = /** @type {HTMLElement|null} */ (
      mount.querySelector('#ready-col .board-card')
    );
    first_ready?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(navigations[0]).toBe('R-3');
  });

  test('renders workflow chips from board card metadata', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:board:ready').applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
      revision: 1,
      issues: [
        {
          id: 'WF-1',
          title: 'workflow card',
          created_at: Date.parse('2026-04-30T06:00:00Z'),
          labels: ['has:spec'],
          metadata: {
            execution_lane: 'plan',
            skill_workflow: 'skill_creator',
            pr_url: 'https://github.com/nakkulla/beads-ui/pull/92'
          }
        }
      ]
    });
    const view = createBoardView(
      mount,
      null,
      () => {},
      createStore(),
      undefined,
      issueStores
    );

    await view.load();

    const card = /** @type {HTMLElement | null} */ (
      mount.querySelector('[data-issue-id="WF-1"]')
    );
    const chip_text = Array.from(
      card?.querySelectorAll('.workflow-chip') || []
    ).map((el) => el.textContent?.trim());
    expect(chip_text).toEqual(['plan', 'skill_creator', 'PR']);
    expect(card?.querySelector('.label-badge')?.textContent).toBe('has:spec');
  });

  test('suppresses workflow chips for invalid metadata values', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:board:ready').applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
      revision: 1,
      issues: [
        {
          id: 'WF-2',
          title: 'invalid workflow card',
          created_at: Date.parse('2026-04-30T06:00:00Z'),
          metadata: {
            execution_lane: 'Plan',
            skill_workflow: 'none',
            pr_url: 'data:text/html,<h1>x</h1>'
          }
        }
      ]
    });
    const view = createBoardView(
      mount,
      null,
      () => {},
      createStore(),
      undefined,
      issueStores
    );

    await view.load();

    expect(
      mount.querySelector('[data-issue-id="WF-2"] .workflow-chip')
    ).toBeNull();
  });

  test('preserves workflow metadata in fallback fetch mode', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(
      mount,
      {
        async getReady() {
          return [
            {
              id: 'WF-3',
              title: 'fallback workflow card',
              created_at: Date.parse('2026-04-30T06:00:00Z'),
              metadata: {
                execution_lane: 'quick_edit',
                skill_workflow: 'writing_skills'
              }
            }
          ];
        },
        async getBlocked() {
          return [];
        },
        async getInProgress() {
          return [];
        },
        async getResolved() {
          return [];
        },
        async getClosed() {
          return [];
        }
      },
      () => {},
      undefined,
      { selectors: { getIds: () => [], count: () => 0 } },
      undefined
    );

    await view.load();

    const chip_text = Array.from(
      mount.querySelectorAll('[data-issue-id="WF-3"] .workflow-chip')
    ).map((el) => el.textContent?.trim());
    expect(chip_text).toEqual(['quick_edit', 'writing_skills']);
  });

  test('applies latest-first sorting in fallback fetch mode without push stores', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(
      mount,
      {
        async getReady() {
          return [
            {
              id: 'R-1',
              title: 'older high priority',
              priority: 0,
              created_at: Date.parse('2025-10-20T08:00:00.000Z')
            },
            {
              id: 'R-2',
              title: 'newer lower priority',
              priority: 3,
              created_at: Date.parse('2025-10-22T08:00:00.000Z')
            }
          ];
        },
        async getBlocked() {
          return [];
        },
        async getInProgress() {
          return [];
        },
        async getResolved() {
          return [
            {
              id: 'RS-1',
              title: 'older resolved',
              priority: 0,
              created_at: Date.parse('2025-10-19T08:00:00.000Z')
            },
            {
              id: 'RS-2',
              title: 'newer resolved',
              priority: 4,
              created_at: Date.parse('2025-10-23T08:00:00.000Z')
            }
          ];
        },
        async getClosed() {
          return [];
        }
      },
      () => {}
    );

    await view.load();

    const ready_ids = Array.from(
      mount.querySelectorAll('#ready-col .board-card .mono')
    ).map((el) => el.textContent?.trim());
    const resolved_ids = Array.from(
      mount.querySelectorAll('#resolved-col .board-card .mono')
    ).map((el) => el.textContent?.trim());

    expect(ready_ids).toEqual(['R-2', 'R-1']);
    expect(resolved_ids).toEqual(['RS-2', 'RS-1']);
  });

  test('shows column count badges next to titles', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const now = Date.now();
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:board:blocked').applyPush({
      type: 'snapshot',
      id: 'tab:board:blocked',
      revision: 1,
      issues: [
        {
          id: 'B-1',
          title: 'blocked 1',
          created_at: now - 5,
          updated_at: now - 5,
          issue_type: 'task'
        },
        {
          id: 'B-2',
          title: 'blocked 2',
          created_at: now - 4,
          updated_at: now - 4,
          issue_type: 'task'
        }
      ]
    });
    issueStores.getStore('tab:board:ready').applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
      revision: 1,
      issues: [
        {
          id: 'R-1',
          title: 'ready 1',
          created_at: now - 3,
          updated_at: now - 3,
          issue_type: 'feature'
        },
        {
          id: 'R-2',
          title: 'ready 2',
          created_at: now - 2,
          updated_at: now - 2,
          issue_type: 'task'
        },
        {
          id: 'R-3',
          title: 'ready 3',
          created_at: now - 1,
          updated_at: now - 1,
          issue_type: 'task'
        }
      ]
    });
    issueStores.getStore('tab:board:in-progress').applyPush({
      type: 'snapshot',
      id: 'tab:board:in-progress',
      revision: 1,
      issues: [
        {
          id: 'P-1',
          title: 'progress 1',
          created_at: now,
          updated_at: now,
          issue_type: 'feature'
        }
      ]
    });
    issueStores.getStore('tab:board:resolved').applyPush({
      type: 'snapshot',
      id: 'tab:board:resolved',
      revision: 1,
      issues: [
        {
          id: 'RS-1',
          title: 'resolved 1',
          created_at: now + 1,
          updated_at: now + 1,
          issue_type: 'task'
        }
      ]
    });
    issueStores.getStore('tab:board:closed').applyPush({
      type: 'snapshot',
      id: 'tab:board:closed',
      revision: 1,
      issues: [
        {
          id: 'C-1',
          title: 'closed 1',
          updated_at: now,
          closed_at: now,
          issue_type: 'chore'
        }
      ]
    });

    const view = createBoardView(
      mount,
      null,
      () => {},
      undefined,
      undefined,
      issueStores
    );

    await view.load();

    const blocked_count = mount
      .querySelector('#blocked-col .board-column__count')
      ?.textContent?.trim();
    const ready_count = mount
      .querySelector('#ready-col .board-column__count')
      ?.textContent?.trim();
    const in_progress_count = mount
      .querySelector('#in-progress-col .board-column__count')
      ?.textContent?.trim();
    const resolved_count = mount
      .querySelector('#resolved-col .board-column__count')
      ?.textContent?.trim();
    const closed_count = mount
      .querySelector('#closed-col .board-column__count')
      ?.textContent?.trim();

    expect(blocked_count).toBe('2');
    expect(ready_count).toBe('3');
    expect(in_progress_count).toBe('1');
    expect(resolved_count).toBe('1');
    expect(closed_count).toBe('1');

    const closed_label = mount
      .querySelector('#closed-col .board-column__count')
      ?.getAttribute('aria-label');
    expect(closed_label).toBe('1 issue');
  });

  test('filters Ready to exclude items that are In Progress', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const issues = [
      {
        id: 'X-1',
        title: 'x1',
        priority: 1,
        created_at: '2025-10-23T10:00:00.000Z',
        updated_at: '2025-10-23T10:00:00.000Z',
        issue_type: 'task'
      },
      {
        id: 'X-2',
        title: 'x2',
        priority: 1,
        created_at: '2025-10-23T09:00:00.000Z',
        updated_at: '2025-10-23T09:00:00.000Z',
        issue_type: 'task'
      }
    ];
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:board:ready').applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
      revision: 1,
      issues: issues
    });
    issueStores.getStore('tab:board:in-progress').applyPush({
      type: 'snapshot',
      id: 'tab:board:in-progress',
      revision: 1,
      issues: issues.filter((i) => i.id.startsWith('X-2'))
    });

    const view = createBoardView(
      mount,
      null,
      () => {},
      undefined,
      undefined,
      issueStores
    );

    await view.load();

    const ready_ids = Array.from(
      mount.querySelectorAll('#ready-col .board-card .mono')
    ).map((el) => el.textContent?.trim());

    // X-2 is in progress, so Ready should only show X-1
    expect(ready_ids).toEqual(['X-1']);

    const prog_ids = Array.from(
      mount.querySelectorAll('#in-progress-col .board-card .mono')
    ).map((el) => el.textContent?.trim());
    expect(prog_ids).toEqual(['X-2']);
  });

  test('filters Blocked and Ready to exclude resolved issues', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const now = Date.now();
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:board:blocked').applyPush({
      type: 'snapshot',
      id: 'tab:board:blocked',
      revision: 1,
      issues: [
        {
          id: 'B-1',
          title: 'blocked open',
          status: 'open',
          created_at: now - 20,
          updated_at: now - 20,
          issue_type: 'task'
        },
        {
          id: 'RS-1',
          title: 'blocked resolved',
          status: 'resolved',
          created_at: now - 10,
          updated_at: now - 10,
          issue_type: 'task'
        }
      ]
    });
    issueStores.getStore('tab:board:ready').applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
      revision: 1,
      issues: [
        {
          id: 'R-1',
          title: 'ready open',
          status: 'open',
          created_at: now - 30,
          updated_at: now - 30,
          issue_type: 'task'
        },
        {
          id: 'RS-2',
          title: 'ready resolved',
          status: 'resolved',
          created_at: now - 5,
          updated_at: now - 5,
          issue_type: 'task'
        }
      ]
    });
    issueStores.getStore('tab:board:resolved').applyPush({
      type: 'snapshot',
      id: 'tab:board:resolved',
      revision: 1,
      issues: [
        {
          id: 'RS-1',
          title: 'resolved 1',
          status: 'resolved',
          created_at: now - 10,
          updated_at: now - 10,
          issue_type: 'task'
        },
        {
          id: 'RS-2',
          title: 'resolved 2',
          status: 'resolved',
          created_at: now - 5,
          updated_at: now - 5,
          issue_type: 'task'
        }
      ]
    });

    const view = createBoardView(
      mount,
      null,
      () => {},
      undefined,
      undefined,
      issueStores
    );

    await view.load();

    const blocked_ids = Array.from(
      mount.querySelectorAll('#blocked-col .board-card .mono')
    ).map((el) => el.textContent?.trim());
    const ready_ids = Array.from(
      mount.querySelectorAll('#ready-col .board-card .mono')
    ).map((el) => el.textContent?.trim());
    const resolved_ids = Array.from(
      mount.querySelectorAll('#resolved-col .board-card .mono')
    ).map((el) => el.textContent?.trim());

    expect(blocked_ids).toEqual(['B-1']);
    expect(ready_ids).toEqual(['R-1']);
    expect(resolved_ids).toEqual(['RS-2', 'RS-1']);
  });

  test('renders filtered labels and relative created dates on cards', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-10-25T10:00:00.000Z'));

    try {
      document.body.innerHTML = '<div id="m"></div>';
      const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
      const issueStores = createTestIssueStores();
      issueStores.getStore('tab:board:ready').applyPush({
        type: 'snapshot',
        id: 'tab:board:ready',
        revision: 1,
        issues: [
          {
            id: 'UI-1',
            title: 'Card with labels',
            status: 'open',
            priority: 1,
            issue_type: 'task',
            labels: ['area:auth', 'has:spec', 'reviewed:plan'],
            created_at: '2025-10-24T10:00:00.000Z',
            updated_at: '2025-10-24T10:00:00.000Z'
          },
          {
            id: 'UI-2',
            title: 'Card without labels',
            status: 'open',
            priority: 2,
            issue_type: 'bug',
            labels: ['area:auth'],
            created_at: Date.parse('2025-10-25T08:00:00.000Z'),
            updated_at: Date.parse('2025-10-25T08:00:00.000Z')
          }
        ]
      });

      const view = createBoardView(
        mount,
        null,
        () => {},
        undefined,
        undefined,
        issueStores
      );

      await view.load();

      const cards = mount.querySelectorAll('#ready-col .board-card');
      const first_card = /** @type {HTMLElement} */ (cards[1]);
      const second_card = /** @type {HTMLElement} */ (cards[0]);
      const badge_text = Array.from(
        first_card.querySelectorAll('.label-badge')
      ).map((element) => element.textContent?.trim());

      expect(badge_text).toEqual(['has:spec', 'reviewed:plan']);
      expect(first_card.querySelector('.board-card__labels')).not.toBeNull();
      expect(second_card.querySelector('.board-card__labels')).toBeNull();
      expect(
        first_card.querySelector('.board-card__date')?.textContent?.trim()
      ).toBe('1일 전');
      expect(
        second_card.querySelector('.board-card__date')?.textContent?.trim()
      ).toBe('2시간 전');
    } finally {
      vi.useRealTimers();
    }
  });

  test('renders empty created date for invalid timestamp without crashing', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:board:ready').applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
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

    const view = createBoardView(
      mount,
      null,
      () => {},
      undefined,
      undefined,
      issueStores
    );

    await view.load();

    const date_element = mount.querySelector('#ready-col .board-card__date');

    expect(date_element).not.toBeNull();
    expect(date_element?.textContent?.trim()).toBe('');
    expect(date_element?.getAttribute('title')).toBe('');
  });

  test('defines shared min-width contract for six-column deferred layout', () => {
    const stylesheet = readFileSync(
      join(import.meta.dirname, '../styles.css'),
      'utf8'
    );

    expect(stylesheet).toContain('--board-column-min-width: 300px;');
    expect(stylesheet).toContain('minmax(var(--board-column-min-width), 1fr)');
    expect(stylesheet).toContain('min-width: var(--board-column-min-width);');
    expect(stylesheet).toContain('@media (max-width: 1100px)');
    expect(stylesheet).toContain('grid-template-columns: 1fr;');
  });

  test('defines route-shell and column-body scroll contract for board', () => {
    const stylesheet = readFileSync(
      join(import.meta.dirname, '../styles.css'),
      'utf8'
    );

    expect(stylesheet).toContain('#board-root.route.board');
    expect(stylesheet).toContain('#board-root > .panel__body');
    expect(stylesheet).toContain('.board-column {');
    expect(stylesheet).toContain('overflow: hidden;');
    expect(stylesheet).toContain('.board-column__body');
    expect(stylesheet).toContain('overflow-y: auto;');
  });

  test('toggles deferred column from header button and shows deferred count while hidden', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const now = Date.now();
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:board:deferred').applyPush({
      type: 'snapshot',
      id: 'tab:board:deferred',
      revision: 1,
      issues: [
        {
          id: 'D-1',
          title: 'deferred 1',
          status: 'deferred',
          created_at: now - 1,
          updated_at: now - 1,
          issue_type: 'task'
        },
        {
          id: 'D-2',
          title: 'deferred 2',
          status: 'deferred',
          created_at: now,
          updated_at: now,
          issue_type: 'bug'
        }
      ]
    });

    const store = {
      state: {
        selected_id: null,
        view: 'board',
        filters: { status: 'all', search: '', type: '' },
        board: { closed_filter: 'today', show_deferred_column: false }
      },
      getState() {
        return this.state;
      },
      setState(/** @type {any} */ patch) {
        this.state = {
          ...this.state,
          ...(patch || {}),
          filters: { ...this.state.filters, ...(patch.filters || {}) },
          board: { ...this.state.board, ...(patch.board || {}) }
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
    expect(button.textContent?.trim()).toContain('Deferred (2)');
    expect(mount.querySelector('#deferred-col')).toBeNull();

    button.click();
    const deferred_cards = Array.from(
      mount.querySelectorAll('#deferred-col .board-card .mono')
    ).map((el) => el.textContent?.trim());
    expect(deferred_cards).toEqual(['D-2', 'D-1']);

    button.click();
    expect(mount.querySelector('#deferred-col')).toBeNull();
  });

  test('updates issue status when dropping on deferred column', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const now = Date.now();
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:board:ready').applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
      revision: 1,
      issues: [
        {
          id: 'R-1',
          title: 'ready 1',
          status: 'open',
          created_at: now,
          updated_at: now,
          issue_type: 'task'
        }
      ]
    });
    issueStores.getStore('tab:board:deferred').applyPush({
      type: 'snapshot',
      id: 'tab:board:deferred',
      revision: 1,
      issues: []
    });

    /** @type {{ type: string, payload: unknown }[]} */
    const calls = [];
    const store = {
      state: {
        selected_id: null,
        view: 'board',
        filters: { status: 'all', search: '', type: '' },
        board: { closed_filter: 'today', show_deferred_column: true }
      },
      getState() {
        return this.state;
      },
      setState(/** @type {any} */ patch) {
        this.state = {
          ...this.state,
          ...(patch || {}),
          filters: { ...this.state.filters, ...(patch.filters || {}) },
          board: { ...this.state.board, ...(patch.board || {}) }
        };
      }
    };

    const view = createBoardView(
      mount,
      null,
      () => {},
      store,
      undefined,
      issueStores,
      async (/** @type {string} */ type, payload) => {
        calls.push({ type, payload });
        return {};
      }
    );
    await view.load();

    const deferred_col = /** @type {HTMLElement} */ (
      mount.querySelector('#deferred-col')
    );
    const drop_event = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(drop_event, 'dataTransfer', {
      value: {
        getData(/** @type {string} */ type) {
          return type === 'text/plain' ? 'R-1' : '';
        }
      }
    });
    deferred_col.dispatchEvent(drop_event);
    await Promise.resolve();

    expect(calls).toEqual([
      {
        type: 'update-status',
        payload: { id: 'R-1', status: 'deferred' }
      }
    ]);
  });

  test('rerenders board labels when config prefixes change', async () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const issueStores = createTestIssueStores();
    issueStores.getStore('tab:board:ready').applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
      revision: 1,
      issues: [
        {
          id: 'UI-1',
          title: 'Config labels',
          status: 'open',
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
    const view = createBoardView(
      mount,
      null,
      () => {},
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
