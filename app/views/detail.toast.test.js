import { describe, expect, test, vi } from 'vitest';
import { createDetailView } from './detail.js';

/** @type {(impl: (type: string, payload?: unknown) => Promise<any>) => (type: string, payload?: unknown) => Promise<any>} */
const mockSend = (impl) => vi.fn(impl);

describe('views/detail toast', () => {
  test('copies artifact path and shows success toast', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    });
    const issue = {
      id: 'UI-111',
      title: 'Artifact copy',
      spec_id: 'docs/superpowers/specs/detail.md',
      dependencies: [],
      dependents: []
    };
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-111' ? [issue] : [];
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
                artifacts: { fields: ['spec_id'] }
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
    await view.load('UI-111');

    const artifact = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.workflow-artifact__value')
    );
    artifact.click();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith('docs/superpowers/specs/detail.md');
    expect(document.body.querySelector('.toast')?.textContent).toContain(
      'Copied path'
    );
  });

  test('workflow settings save failure shows error toast and preserves issue state', async () => {
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const issue = {
      id: 'UI-112',
      title: 'Route failure',
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
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-112' ? [issue] : [];
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
                sections: ['workflow_settings'],
                workflow_settings: {
                  fields: [
                    'execution_lane',
                    'workspace_policy',
                    'branch_policy',
                    'finish_action',
                    'review_profile'
                  ],
                  editable_fields: [
                    'execution_lane',
                    'workspace_policy',
                    'branch_policy',
                    'finish_action',
                    'review_profile'
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
    const send = mockSend(async (type) => {
      if (type === 'update-workflow-settings') {
        throw new Error('boom');
      }
      throw new Error('Unexpected');
    });
    const view = createDetailView(mount, send, undefined, stores, store);

    await view.load('UI-112');
    /** @type {HTMLButtonElement|null} */ (
      mount.querySelector('[data-testid="workflow-settings-edit"]')
    )?.click();
    const lane = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-testid="workflow-settings-lane"]')
    );
    const topology = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-testid="workflow-settings-finish"]')
    );
    lane.value = 'quick_edit';
    lane.dispatchEvent(new Event('change'));
    const workspace = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-testid="workflow-settings-workspace"]')
    );
    const branch = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-testid="workflow-settings-branch"]')
    );
    workspace.value = 'current';
    workspace.dispatchEvent(new Event('change'));
    branch.value = 'same';
    branch.dispatchEvent(new Event('change'));
    topology.value = 'direct';
    topology.dispatchEvent(new Event('change'));
    /** @type {HTMLButtonElement|null} */ (
      mount.querySelector('[data-testid="workflow-settings-save"]')
    )?.click();
    await Promise.resolve();

    expect(document.body.querySelector('.toast')?.textContent).toContain(
      'Failed to save workflow settings'
    );
    expect(
      /** @type {HTMLSelectElement} */ (
        mount.querySelector('[data-testid="workflow-settings-lane"]')
      ).value
    ).toBe('quick_edit');
    expect(
      /** @type {HTMLSelectElement} */ (
        mount.querySelector('[data-testid="workflow-settings-finish"]')
      ).value
    ).toBe('direct');
    expect(mount.querySelector('[data-testid="workflow-settings-edit"]')).toBeNull();
  });

  test('applies fixed positioning to toast', async () => {
    vi.useFakeTimers();
    document.body.innerHTML =
      '<section class="panel"><div id="mount"></div></section>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));

    const initial = { id: 'UI-110', title: 'X', status: 'open', priority: 2 };
    const stores = {
      /** @param {string} id */
      snapshotFor(id) {
        return id === 'detail:UI-110' ? [initial] : [];
      },
      subscribe() {
        return () => {};
      }
    };
    const send = mockSend(async (type) => {
      if (type === 'update-priority') {
        throw new Error('boom');
      }
      throw new Error('Unexpected');
    });

    const view = createDetailView(mount, send, undefined, stores);
    await view.load('UI-110');

    const prio = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select.badge--priority')
    );
    prio.value = '3';
    prio.dispatchEvent(new Event('change'));

    await Promise.resolve();

    const toast = /** @type {HTMLDivElement} */ (
      document.body.querySelector('.toast')
    );
    expect(toast).not.toBeNull();
    expect(toast.style.position).toBe('fixed');
    expect(toast.style.zIndex).toBe('1000');

    await vi.advanceTimersByTimeAsync(3000);
    vi.useRealTimers();
  });
});
