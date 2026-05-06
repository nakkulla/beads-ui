import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { createDetailView } from './detail.js';

describe('views/detail', () => {
  test('renders configured workflow sections and artifact paths', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issue = {
      id: 'UI-1',
      title: 'Workflow detail',
      labels: ['reviewed:spec'],
      spec_id: 'docs/superpowers/specs/detail.md',
      metadata: {
        execution_lane: 'spec_backed',
        workspace_policy: 'worktree',
        branch_policy: 'feature',
        finish_action: 'pr',
        spec_review_verdict: 'APPROVE',
        spec_handoff_at_sha: 'abc123'
      },
      dependencies: [],
      dependents: []
    };
    const store = {
      getState() {
        return {
          config: {
            detail: {
              workflow_summary: {
                sections: ['route', 'artifacts', 'review_gates', 'freshness'],
                route: { fields: ['execution_lane', 'topology'] },
                artifacts: { fields: ['spec_id', 'plan'] },
                review_gates: { fields: ['status', 'verdict'] },
                freshness: {
                  fields: ['spec_handoff_at_sha', 'execution_base_sha']
                }
              }
            }
          }
        };
      },
      subscribe() {
        return () => {};
      }
    };
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-1' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };

    const view = createDetailView(
      mount,
      async () => ({}),
      undefined,
      stores,
      store
    );
    await view.load('UI-1');

    expect(mount.querySelector('.metadata-paths')).toBeNull();
    expect(mount.querySelector('.workflow-summary')).toBeTruthy();
    expect(mount.textContent).toContain('Execution lane');
    expect(mount.textContent).toContain('spec_backed');
    expect(mount.textContent).toContain('Topology');
    expect(mount.textContent).toContain('pr');
    expect(mount.textContent).toContain('Spec');
    expect(mount.textContent).toContain('docs/superpowers/specs/detail.md');
    expect(mount.textContent).toContain('Spec handoff SHA');
    expect(mount.textContent).not.toContain('Execution base SHA');
  });

  test('renders invalid topology warning', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issue = {
      id: 'UI-2',
      title: 'Invalid route',
      metadata: {
        execution_lane: 'plan',
        workspace_policy: 'current',
        branch_policy: 'feature',
        finish_action: 'direct'
      },
      dependencies: [],
      dependents: []
    };
    const store = {
      getState() {
        return {
          config: {
            detail: {
              workflow_summary: {
                sections: ['route'],
                route: {
                  fields: [
                    'execution_lane',
                    'topology',
                    'workspace_policy',
                    'branch_policy',
                    'finish_action'
                  ]
                }
              }
            }
          }
        };
      },
      subscribe() {
        return () => {};
      }
    };
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-2' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };

    const view = createDetailView(
      mount,
      async () => ({}),
      undefined,
      stores,
      store
    );
    await view.load('UI-2');

    expect(mount.textContent).toContain('Invalid route metadata');
  });

  test('edits route metadata with explicit save and cancel', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issue = {
      id: 'UI-2',
      title: 'Route edit',
      labels: ['lane:plan'],
      metadata: {
        execution_lane: 'plan',
        workspace_policy: 'worktree',
        branch_policy: 'feature',
        finish_action: 'pr'
      },
      dependencies: [],
      dependents: [],
      comments: []
    };
    /** @type {Array<{type: string, payload: unknown}>} */
    const sends = [];
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-2' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const store = {
      getState() {
        return {
          config: {
            detail: {
              workflow_summary: {
                sections: ['route'],
                route: {
                  fields: [
                    'execution_lane',
                    'topology',
                    'workspace_policy',
                    'branch_policy',
                    'finish_action'
                  ],
                  editable_fields: ['execution_lane', 'topology']
                }
              }
            }
          }
        };
      },
      subscribe() {
        return () => {};
      }
    };
    const view = createDetailView(
      mount,
      async (type, payload) => {
        sends.push({ type, payload });
        return {
          ...issue,
          labels: ['lane:quick_edit'],
          metadata: {
            ...issue.metadata,
            execution_lane: 'quick_edit',
            workspace_policy: 'current',
            branch_policy: 'same',
            finish_action: 'direct'
          }
        };
      },
      undefined,
      stores,
      store
    );

    await view.load('UI-2');
    /** @type {HTMLButtonElement|null} */ (
      mount.querySelector('[data-testid="route-edit"]')
    )?.click();
    /** @type {HTMLButtonElement|null} */ (
      mount.querySelector('[data-testid="route-cancel"]')
    )?.click();
    expect(mount.querySelector('[data-testid="route-lane"]')).toBeNull();

    /** @type {HTMLButtonElement|null} */ (
      mount.querySelector('[data-testid="route-edit"]')
    )?.click();
    const lane = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-testid="route-lane"]')
    );
    const topology = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-testid="route-topology"]')
    );
    lane.value = 'quick_edit';
    lane.dispatchEvent(new Event('change'));
    topology.value = 'direct';
    topology.dispatchEvent(new Event('change'));
    /** @type {HTMLButtonElement|null} */ (
      mount.querySelector('[data-testid="route-save"]')
    )?.click();
    await Promise.resolve();

    expect(sends).toEqual([
      {
        type: 'update-route-metadata',
        payload: {
          id: 'UI-2',
          values: { execution_lane: 'quick_edit', topology: 'direct' }
        }
      }
    ]);
    expect(mount.textContent).toContain('quick_edit');
    expect(mount.textContent).toContain('direct');
    expect(mount.querySelector('[data-testid="route-lane"]')).toBeNull();
    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('[data-testid="route-edit"]')
      ).disabled
    ).toBe(false);
  });

  test('requires topology selection before saving invalid route', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issue = {
      id: 'UI-3',
      title: 'Invalid route edit',
      metadata: {
        execution_lane: 'plan',
        workspace_policy: 'current',
        branch_policy: 'feature',
        finish_action: 'direct'
      },
      dependencies: [],
      dependents: [],
      comments: []
    };
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-3' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const store = {
      getState() {
        return {
          config: {
            detail: {
              workflow_summary: {
                sections: ['route'],
                route: {
                  fields: ['execution_lane', 'topology'],
                  editable_fields: ['execution_lane', 'topology']
                }
              }
            }
          }
        };
      },
      subscribe() {
        return () => {};
      }
    };
    const view = createDetailView(
      mount,
      async () => ({}),
      undefined,
      stores,
      store
    );

    await view.load('UI-3');
    /** @type {HTMLButtonElement|null} */ (
      mount.querySelector('[data-testid="route-edit"]')
    )?.click();

    const save_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-testid="route-save"]')
    );
    const topology = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-testid="route-topology"]')
    );
    expect(topology.value).toBe('');
    expect(save_button.disabled).toBe(true);

    topology.value = 'pr';
    topology.dispatchEvent(new Event('change'));

    const enabled_save_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-testid="route-save"]')
    );
    expect(enabled_save_button.disabled).toBe(false);
  });

  test('renders fields, markdown description, and dependency links', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const issue = {
      id: 'UI-29',
      title: 'Issue detail view',
      description:
        '# Heading\n\nImplement detail view with a [link](https://example.com) and `code`.',
      status: 'open',
      priority: 2,
      dependencies: [{ id: 'UI-25' }, { id: 'UI-27' }],
      dependents: [{ id: 'UI-34' }]
    };

    /** @type {string[]} */
    const navigations = [];
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-29' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const view = createDetailView(
      mount,
      async () => ({}),
      (hash) => {
        navigations.push(hash);
      },
      stores
    );

    await view.load('UI-29');

    // ID is no longer rendered within detail view; the dialog title shows it
    const titleSpan = /** @type {HTMLSpanElement} */ (
      mount.querySelector('h2 .editable')
    );
    expect(titleSpan.textContent).toBe('Issue detail view');
    // status select + priority select exist
    const selects = mount.querySelectorAll('select');
    expect(selects.length).toBeGreaterThanOrEqual(2);
    // description rendered as markdown in read mode
    const md = /** @type {HTMLDivElement} */ (mount.querySelector('.md'));
    expect(md).toBeTruthy();
    const a = /** @type {HTMLAnchorElement|null} */ (md.querySelector('a'));
    expect(a && a.getAttribute('href')).toBe('https://example.com');
    const code = md.querySelector('code');
    expect(code && code.textContent).toBe('code');

    const links = mount.querySelectorAll('li');
    const hrefs = Array.from(links)
      .map((a) => a.dataset.href)
      .filter(Boolean);
    expect(hrefs).toEqual([
      '#/issues?issue=UI-25',
      '#/issues?issue=UI-27',
      '#/issues?issue=UI-34'
    ]);

    // No description textarea in read mode (only comment input textarea should exist)
    const descInput0 = /** @type {HTMLTextAreaElement|null} */ (
      mount.querySelector('.description textarea')
    );
    expect(descInput0).toBeNull();

    // Simulate clicking the first internal link, ensure navigate_fn is used
    links[0].click();
    expect(navigations[navigations.length - 1]).toBe('#/issues?issue=UI-25');
  });

  test('renders type in Properties sidebar', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issue = {
      id: 'UI-50',
      title: 'With type',
      issue_type: 'feature',
      dependencies: [],
      dependents: []
    };
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-50' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const view = createDetailView(mount, async () => ({}), undefined, stores);
    await view.load('UI-50');
    const badge = mount.querySelector('.props-card .type-badge');
    expect(badge).toBeTruthy();
    expect(badge && badge.textContent).toBe('Feature');
  });

  test('inline editing toggles for title and description', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const issue = {
      id: 'UI-29',
      title: 'Issue detail view',
      description: 'Some text',
      status: 'open',
      priority: 2,
      dependencies: [],
      dependents: []
    };

    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-29' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const view = createDetailView(
      mount,
      async (type, payload) => {
        if (type === 'edit-text') {
          const f = /** @type {any} */ (payload).field;
          const v = /** @type {any} */ (payload).value;
          /** @type {any} */ (issue)[f] = v;
          return issue;
        }
        throw new Error('Unexpected type');
      },
      undefined,
      stores
    );

    await view.load('UI-29');

    // Title: click to edit -> input appears, Esc cancels
    const titleSpan = /** @type {HTMLSpanElement} */ (
      mount.querySelector('h2 .editable')
    );
    titleSpan.click();
    let titleInput = /** @type {HTMLInputElement} */ (
      mount.querySelector('h2 input')
    );
    expect(titleInput).toBeTruthy();
    const esc = new KeyboardEvent('keydown', { key: 'Escape' });
    titleInput.dispatchEvent(esc);
    expect(
      /** @type {HTMLInputElement|null} */ (mount.querySelector('h2 input'))
    ).toBeNull();

    // Description: click to edit -> textarea appears, Ctrl+Enter saves
    const md = /** @type {HTMLDivElement} */ (mount.querySelector('.md'));
    md.click();
    const area = /** @type {HTMLTextAreaElement} */ (
      mount.querySelector('textarea')
    );
    area.value = 'Changed';
    const key = new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true });
    area.dispatchEvent(key);
    // After save, returns to read mode (allow microtask flush)
    await Promise.resolve();
    // Only the comment input textarea should remain, no description textarea
    expect(
      /** @type {HTMLTextAreaElement|null} */ (
        mount.querySelector('.description textarea')
      )
    ).toBeNull();
  });

  test('shows placeholder when not found or bad payload', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const stores = {
      snapshotFor() {
        return [];
      },
      subscribe() {
        return () => {};
      }
    };
    const view = createDetailView(mount, async () => ({}), undefined, stores);

    await view.load('UI-404');
    expect((mount.textContent || '').toLowerCase()).toContain('loading');

    view.clear();
    expect((mount.textContent || '').toLowerCase()).toContain(
      'select an issue'
    );
  });

  test('renders comments section with author and timestamp', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const issue = {
      id: 'UI-99',
      title: 'Test issue',
      dependencies: [],
      dependents: [],
      comments: [
        {
          id: 1,
          author: 'Alice',
          text: 'This is a comment',
          created_at: '2025-01-15T10:30:00Z'
        },
        {
          id: 2,
          author: 'Bob',
          text: 'Another comment',
          created_at: '2025-01-15T11:00:00Z'
        }
      ]
    };

    const stores = {
      snapshotFor(/** @type {string} */ id) {
        return id === 'detail:UI-99' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };

    const view = createDetailView(mount, async () => ({}), undefined, stores);
    await view.load('UI-99');

    // Check comments section exists
    const commentsSection = mount.querySelector('.comments');
    expect(commentsSection).toBeTruthy();

    // Check comments are rendered
    const commentItems = mount.querySelectorAll('.comment-item');
    expect(commentItems.length).toBe(2);

    // Check first comment content
    const firstComment = commentItems[0];
    expect(firstComment.textContent).toContain('Alice');
    expect(firstComment.textContent).toContain('This is a comment');
  });

  test('shows placeholder when no comments', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const issue = {
      id: 'UI-100',
      title: 'Test issue',
      dependencies: [],
      dependents: [],
      comments: []
    };

    const stores = {
      snapshotFor(/** @type {string} */ id) {
        return id === 'detail:UI-100' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };

    const view = createDetailView(mount, async () => ({}), undefined, stores);
    await view.load('UI-100');

    const commentsSection = mount.querySelector('.comments');
    expect(commentsSection).toBeTruthy();
    expect(commentsSection && commentsSection.textContent).toContain(
      'No comments yet'
    );
  });

  test('submits new comment via sendFn', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const issue = {
      id: 'UI-101',
      title: 'Test issue',
      dependencies: [],
      dependents: [],
      comments: []
    };

    /** @type {Array<{type: string, payload: unknown}>} */
    const calls = [];
    const sendFn = async (
      /** @type {string} */ type,
      /** @type {unknown} */ payload
    ) => {
      calls.push({ type, payload });
      // Return updated comments
      return [
        {
          id: 1,
          author: 'Me',
          text: 'New comment',
          created_at: '2025-01-15T12:00:00Z'
        }
      ];
    };

    const stores = {
      snapshotFor(/** @type {string} */ id) {
        return id === 'detail:UI-101' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };

    const view = createDetailView(mount, sendFn, undefined, stores);
    await view.load('UI-101');

    // Find textarea and button
    const textarea = /** @type {HTMLTextAreaElement} */ (
      mount.querySelector('.comment-input textarea')
    );
    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.comment-input button')
    );

    expect(textarea).toBeTruthy();
    expect(button).toBeTruthy();

    // Type a comment
    textarea.value = 'Test comment';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    // Click submit
    button.click();

    // Wait for async
    await new Promise((r) => setTimeout(r, 10));

    // Verify sendFn was called correctly
    expect(calls.length).toBe(1);
    expect(calls[0].type).toBe('add-comment');
    expect(calls[0].payload).toEqual({ id: 'UI-101', text: 'Test comment' });
  });

  test('fetches comments on load when not in snapshot', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    // Issue without comments in snapshot
    const issue = {
      id: 'UI-102',
      title: 'Test issue',
      dependencies: [],
      dependents: []
      // No comments property
    };

    /** @type {Array<{type: string, payload: unknown}>} */
    const calls = [];
    const sendFn = async (
      /** @type {string} */ type,
      /** @type {unknown} */ payload
    ) => {
      calls.push({ type, payload });
      if (type === 'get-comments') {
        return [
          {
            id: 1,
            author: 'Fetched',
            text: 'Fetched comment',
            created_at: '2025-01-15T12:00:00Z'
          }
        ];
      }
      return {};
    };

    const stores = {
      snapshotFor(/** @type {string} */ id) {
        return id === 'detail:UI-102' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };

    const view = createDetailView(mount, sendFn, undefined, stores);
    await view.load('UI-102');

    // Wait for async fetch
    await new Promise((r) => setTimeout(r, 50));

    // Verify get-comments was called
    const getCommentsCall = calls.find((c) => c.type === 'get-comments');
    expect(getCommentsCall).toBeTruthy();
    expect(getCommentsCall?.payload).toEqual({ id: 'UI-102' });

    // Verify fetched comment is displayed
    const commentItems = mount.querySelectorAll('.comment-item');
    expect(commentItems.length).toBe(1);
    expect(commentItems[0].textContent).toContain('Fetched');
  });

  test('renders close reason when present on closed issue', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issue = {
      id: 'UI-60',
      title: 'Closed with reason',
      status: 'closed',
      close_reason: 'Duplicate of UI-55',
      dependencies: [],
      dependents: []
    };
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-60' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const view = createDetailView(mount, async () => ({}), undefined, stores);
    await view.load('UI-60');

    const props = mount.querySelectorAll('.props-card .prop');
    const closeReasonProp = Array.from(props).find(
      (p) => p.querySelector('.label')?.textContent === 'Close Reason'
    );
    expect(closeReasonProp).toBeTruthy();
    expect(closeReasonProp?.querySelector('.value')?.textContent).toBe(
      'Duplicate of UI-55'
    );
  });

  test('does not render close reason when absent', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issue = {
      id: 'UI-61',
      title: 'Open issue',
      status: 'open',
      dependencies: [],
      dependents: []
    };
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-61' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const view = createDetailView(mount, async () => ({}), undefined, stores);
    await view.load('UI-61');

    const props = mount.querySelectorAll('.props-card .prop');
    const closeReasonProp = Array.from(props).find(
      (p) => p.querySelector('.label')?.textContent === 'Close Reason'
    );
    expect(closeReasonProp).toBeUndefined();
  });

  test('renders artifact paths in workflow summary when values exist', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const issue = {
      id: 'UI-120',
      title: 'Has artifacts',
      dependencies: [],
      dependents: [],
      spec_id:
        'docs/superpowers/specs/2026-04-06-detail-metadata-paths-design.md',
      metadata: {
        plan: 'docs/superpowers/plans/2026-04-06-detail-metadata-paths.md',
        handoff: 'docs/handoffs/2026-04-06_12-00-00_detail-metadata.md'
      }
    };

    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-120' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const store = {
      getState() {
        return {
          config: {
            detail: {
              workflow_summary: {
                sections: ['artifacts'],
                artifacts: { fields: ['spec_id', 'plan', 'handoff'] }
              }
            }
          }
        };
      },
      subscribe() {
        return () => {};
      }
    };

    const view = createDetailView(
      mount,
      async () => ({}),
      undefined,
      stores,
      store
    );
    await view.load('UI-120');

    const workflow_card = mount.querySelector('.workflow-summary');
    const values = Array.from(
      mount.querySelectorAll('.workflow-artifact__value')
    );

    expect(mount.querySelector('.metadata-paths')).toBeNull();
    expect(workflow_card?.textContent).toContain('Artifacts');
    expect(workflow_card?.textContent).toContain('Spec');
    expect(workflow_card?.textContent).toContain('Plan');
    expect(workflow_card?.textContent).toContain('Handoff');
    expect(values.map((value) => value.textContent?.trim())).toEqual([
      'docs/superpowers/specs/2026-04-06-detail-metadata-paths-design.md',
      'docs/superpowers/plans/2026-04-06-detail-metadata-paths.md',
      'docs/handoffs/2026-04-06_12-00-00_detail-metadata.md'
    ]);
    expect(values.map((value) => value.getAttribute('title'))).toEqual([
      'docs/superpowers/specs/2026-04-06-detail-metadata-paths-design.md',
      'docs/superpowers/plans/2026-04-06-detail-metadata-paths.md',
      'docs/handoffs/2026-04-06_12-00-00_detail-metadata.md'
    ]);
  });

  test('renders route artifacts and delivery sections in configured order', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const issue = {
      id: 'UI-192',
      title: 'Workflow issue',
      dependencies: [],
      dependents: [],
      spec_id: 'docs/superpowers/specs/workflow.md',
      metadata: {
        plan: 'docs/superpowers/plans/workflow.md',
        pr_url: 'https://github.com/nakkulla/beads-ui/pull/92',
        execution_lane: 'plan',
        workspace_policy: 'worktree',
        branch_policy: 'feature',
        finish_action: 'pr'
      }
    };
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-192' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const store = {
      getState() {
        return {
          config: {
            detail: {
              workflow_summary: {
                sections: ['route', 'artifacts', 'delivery'],
                route: { fields: ['execution_lane', 'topology'] },
                artifacts: { fields: ['spec_id', 'plan'] },
                delivery: { fields: ['pr_url'] }
              }
            }
          }
        };
      },
      subscribe() {
        return () => {};
      }
    };
    const view = createDetailView(
      mount,
      async () => ({}),
      undefined,
      stores,
      store
    );

    await view.load('UI-192');

    const workflow_card = mount.querySelector('.workflow-summary');
    expect(workflow_card?.textContent).toContain('Workflow summary');
    expect(workflow_card?.textContent).toContain('Route');
    expect(workflow_card?.textContent).toContain('Execution lane');
    expect(workflow_card?.textContent).toContain('plan');
    expect(workflow_card?.textContent).toContain('Topology');
    expect(workflow_card?.textContent).toContain('pr');
    expect(workflow_card?.textContent).toContain('Artifacts');
    expect(workflow_card?.textContent).toContain('Spec');
    expect(workflow_card?.textContent).toContain('Plan');
    expect(workflow_card?.textContent).toContain('Delivery');

    const pr_link = /** @type {HTMLAnchorElement | null} */ (
      workflow_card?.querySelector('a') || null
    );
    expect(pr_link?.textContent).toBe('PR');
    expect(pr_link?.getAttribute('href')).toBe(
      'https://github.com/nakkulla/beads-ui/pull/92'
    );
    expect(pr_link?.getAttribute('target')).toBe('_blank');
    expect(pr_link?.getAttribute('rel')).toBe('noreferrer noopener');

    const section_titles = Array.from(
      mount.querySelectorAll('.workflow-summary__section-title')
    ).map((el) => el.textContent?.trim());
    expect(section_titles).toEqual(['Route', 'Artifacts', 'Delivery']);
    expect(mount.textContent || '').not.toContain('Metadata');
  });

  test('renders partial workflow summary and hides unsafe PR links', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const issue = {
      id: 'UI-193',
      title: 'Partial workflow issue',
      dependencies: [],
      dependents: [],
      metadata: {
        pr_url: 'javascript:alert(1)',
        execution_lane: 'quick_edit',
        workspace_policy: 'current',
        branch_policy: 'same',
        finish_action: 'direct'
      }
    };
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-193' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const store = {
      getState() {
        return {
          config: {
            detail: {
              workflow_summary: {
                sections: ['route', 'delivery'],
                route: { fields: ['execution_lane', 'topology'] },
                delivery: { fields: ['pr_url'] }
              }
            }
          }
        };
      },
      subscribe() {
        return () => {};
      }
    };
    const view = createDetailView(
      mount,
      async () => ({}),
      undefined,
      stores,
      store
    );

    await view.load('UI-193');

    const workflow_card = mount.querySelector('.workflow-summary');
    expect(workflow_card?.textContent).toContain('Execution lane');
    expect(workflow_card?.textContent).toContain('quick_edit');
    expect(workflow_card?.textContent).toContain('Topology');
    expect(workflow_card?.textContent).toContain('direct');
    expect(workflow_card?.textContent).not.toContain('javascript:alert(1)');
    expect(workflow_card?.querySelector('a')).toBeNull();
  });

  test('hides workflow summary when metadata has no displayable values', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const issue = {
      id: 'UI-194',
      title: 'No workflow issue',
      dependencies: [],
      dependents: [],
      metadata: {
        execution_lane: 'Plan',
        workspace_policy: 'current'
      }
    };
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-194' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const store = {
      getState() {
        return {
          config: {
            detail: {
              workflow_summary: {
                sections: ['route'],
                route: { fields: ['execution_lane'] }
              }
            }
          }
        };
      },
      subscribe() {
        return () => {};
      }
    };
    const view = createDetailView(
      mount,
      async () => ({}),
      undefined,
      stores,
      store
    );

    await view.load('UI-194');

    expect(mount.querySelector('.workflow-summary')).toBeNull();
  });

  test('hides artifact section when all artifact paths are missing', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const issue = {
      id: 'UI-121',
      title: 'No artifacts',
      dependencies: [],
      dependents: []
    };

    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-121' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const store = {
      getState() {
        return {
          config: {
            detail: {
              workflow_summary: {
                sections: ['artifacts'],
                artifacts: { fields: ['spec_id', 'plan', 'handoff'] }
              }
            }
          }
        };
      },
      subscribe() {
        return () => {};
      }
    };

    const view = createDetailView(
      mount,
      async () => ({}),
      undefined,
      stores,
      store
    );
    await view.load('UI-121');

    expect(mount.querySelector('.workflow-summary')).toBeNull();
    expect(mount.textContent || '').not.toContain('Metadata');
    expect(mount.textContent || '').not.toContain('Spec');
    expect(mount.textContent || '').not.toContain('Plan');
    expect(mount.textContent || '').not.toContain('Handoff');
  });

  test('renders only present artifact values and keeps full path in title', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const plan_path =
      'docs/superpowers/plans/2026-04-06-detail-metadata-paths-with-a-very-long-name-for-truncation.md';
    const issue = {
      id: 'UI-122',
      title: 'Partial artifacts',
      dependencies: [],
      dependents: [],
      spec_id: '   ',
      metadata: {
        plan: plan_path,
        handoff: null
      }
    };

    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-122' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const store = {
      getState() {
        return {
          config: {
            detail: {
              workflow_summary: {
                sections: ['artifacts'],
                artifacts: { fields: ['spec_id', 'plan', 'handoff'] }
              }
            }
          }
        };
      },
      subscribe() {
        return () => {};
      }
    };

    const view = createDetailView(
      mount,
      async () => ({}),
      undefined,
      stores,
      store
    );
    await view.load('UI-122');

    expect(mount.textContent || '').toContain('Artifacts');
    expect(mount.textContent || '').toContain('Plan');
    expect(mount.textContent || '').not.toContain('Spec');
    expect(mount.textContent || '').not.toContain('Handoff');

    const value = /** @type {HTMLElement|null} */ (
      mount.querySelector('.workflow-artifact__value')
    );
    expect(value).toBeTruthy();
    expect(value && value.getAttribute('title')).toBe(plan_path);
  });

  test('defines workflow artifact wrapping styles in the shared stylesheet', () => {
    const stylesheet = readFileSync('app/styles.css', 'utf8');

    expect(stylesheet).toContain('.workflow-artifact__value');
    expect(stylesheet).toContain('overflow-wrap: anywhere');
    expect(stylesheet).toContain('word-break: break-word');
  });

  describe('delete issue', () => {
    test('renders delete button in detail view', async () => {
      document.body.innerHTML =
        '<section class="panel"><div id="mount"></div></section>';
      const mount = /** @type {HTMLElement} */ (
        document.getElementById('mount')
      );
      const issue = {
        id: 'UI-99',
        title: 'Test delete',
        dependencies: [],
        dependents: []
      };
      const stores = {
        /** @param {string} id */
        snapshotFor(id) {
          return id === 'detail:UI-99' ? [issue] : [];
        },
        subscribe() {
          return () => {};
        }
      };
      const view = createDetailView(mount, async () => ({}), undefined, stores);
      await view.load('UI-99');

      const deleteBtn = mount.querySelector('.delete-issue-btn');
      expect(deleteBtn).toBeTruthy();
      expect(deleteBtn?.getAttribute('title')).toBe('Delete issue');
    });

    test('clicking delete button opens confirmation dialog', async () => {
      document.body.innerHTML =
        '<section class="panel"><div id="mount"></div></section>';
      const mount = /** @type {HTMLElement} */ (
        document.getElementById('mount')
      );
      const issue = {
        id: 'UI-100',
        title: 'Confirm delete test',
        dependencies: [],
        dependents: []
      };
      const stores = {
        /** @param {string} id */
        snapshotFor(id) {
          return id === 'detail:UI-100' ? [issue] : [];
        },
        subscribe() {
          return () => {};
        }
      };
      const view = createDetailView(mount, async () => ({}), undefined, stores);
      await view.load('UI-100');

      const deleteBtn = /** @type {HTMLButtonElement} */ (
        mount.querySelector('.delete-issue-btn')
      );
      deleteBtn.click();

      // Dialog should now be in document
      const dialog = document.getElementById('delete-confirm-dialog');
      expect(dialog).toBeTruthy();
      expect(dialog?.hasAttribute('open')).toBe(true);

      // Should show issue ID and title
      const message = dialog?.querySelector('.delete-confirm__message');
      expect(message?.innerHTML).toContain('<strong>UI-100</strong>');
      expect(message?.innerHTML).toContain(
        '<strong>Confirm delete test</strong>'
      );
    });

    test('cancel button closes dialog without deleting', async () => {
      document.body.innerHTML =
        '<section class="panel"><div id="mount"></div></section>';
      const mount = /** @type {HTMLElement} */ (
        document.getElementById('mount')
      );
      const issue = {
        id: 'UI-101',
        title: 'Cancel test',
        dependencies: [],
        dependents: []
      };
      let deleteCalled = false;
      const stores = {
        /** @param {string} id */
        snapshotFor(id) {
          return id === 'detail:UI-101' ? [issue] : [];
        },
        subscribe() {
          return () => {};
        }
      };
      const view = createDetailView(
        mount,
        async (type) => {
          if (type === 'delete-issue') deleteCalled = true;
          return {};
        },
        undefined,
        stores
      );
      await view.load('UI-101');

      const deleteBtn = /** @type {HTMLButtonElement} */ (
        mount.querySelector('.delete-issue-btn')
      );
      deleteBtn.click();

      const dialog = /** @type {HTMLDialogElement} */ (
        document.getElementById('delete-confirm-dialog')
      );
      const cancelBtn = /** @type {HTMLButtonElement} */ (
        dialog.querySelector('.btn:not(.danger)')
      );
      cancelBtn.click();

      expect(dialog.hasAttribute('open')).toBe(false);
      expect(deleteCalled).toBe(false);
    });

    test('confirm button sends delete-issue and clears view', async () => {
      document.body.innerHTML =
        '<section class="panel"><div id="mount"></div></section>';
      const mount = /** @type {HTMLElement} */ (
        document.getElementById('mount')
      );
      const issue = {
        id: 'UI-102',
        title: 'Delete me',
        dependencies: [],
        dependents: []
      };
      /** @type {{ type: string, payload: any }[]} */
      const calls = [];
      const stores = {
        /** @param {string} id */
        snapshotFor(id) {
          return id === 'detail:UI-102' ? [issue] : [];
        },
        subscribe() {
          return () => {};
        }
      };
      const view = createDetailView(
        mount,
        async (type, payload) => {
          calls.push({ type, payload });
          return { deleted: true };
        },
        undefined,
        stores
      );
      await view.load('UI-102');

      const deleteBtn = /** @type {HTMLButtonElement} */ (
        mount.querySelector('.delete-issue-btn')
      );
      deleteBtn.click();

      const dialog = /** @type {HTMLDialogElement} */ (
        document.getElementById('delete-confirm-dialog')
      );
      const confirmBtn = /** @type {HTMLButtonElement} */ (
        dialog.querySelector('.btn.danger')
      );
      confirmBtn.click();

      // Wait for async operation
      await new Promise((r) => setTimeout(r, 10));

      expect(calls).toContainEqual({
        type: 'delete-issue',
        payload: { id: 'UI-102' }
      });

      // View should be cleared (showing placeholder)
      const placeholder = mount.querySelector('.muted');
      expect(placeholder?.textContent).toContain('No issue selected');
    });
  });

  test('includes Deferred in the status select options and preserves deferred class', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issue = {
      id: 'UI-70',
      title: 'With deferred status option',
      status: 'deferred',
      dependencies: [],
      dependents: []
    };
    const stores = {
      snapshotFor(/** @type {string} */ id) {
        return id === 'detail:UI-70' ? [issue] : [];
      },
      subscribe() {
        return () => {};
      }
    };

    const view = createDetailView(mount, async () => ({}), undefined, stores);
    await view.load('UI-70');

    const status_select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.props-card .badge-select.badge--status')
    );
    const option_values = Array.from(status_select.options).map(
      (option) => option.value
    );

    expect(option_values).toContain('deferred');
    expect(status_select.value).toBe('deferred');
    expect(status_select.className).toContain('is-deferred');
  });

  test('defines deferred status badge/select styles in the shared stylesheet', () => {
    const stylesheet = readFileSync('app/styles.css', 'utf8');

    expect(stylesheet).toContain('.status-badge.is-deferred');
    expect(stylesheet).toContain('.badge-select.badge--status.is-deferred');
  });
});
