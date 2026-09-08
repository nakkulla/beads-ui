import { describe, expect, test } from 'vitest';
import { createSubscriptionIssueStores } from './subscription-issue-stores.js';

/**
 * @param {any} registry
 * @param {string} id
 * @param {number} revision
 * @param {any[]} issues
 */
function pushSnapshot(registry, id, revision, issues) {
  registry.getStore(id).applyPush({ type: 'snapshot', id, revision, issues });
}

describe('subscription issue stores registry', () => {
  test('passes the changed subscription id to listeners', () => {
    const registry = createSubscriptionIssueStores();
    registry.register('tab:board:ready', { type: 'ready-issues' });
    /** @type {string[]} */
    const seen = [];
    registry.subscribe((client_id) => {
      seen.push(client_id);
    });

    pushSnapshot(registry, 'tab:board:ready', 1, [
      { id: 'A', created_at: 1, updated_at: 1 }
    ]);

    expect(seen).toEqual(['tab:board:ready']);
  });

  test('names the replacement store when the subscription spec changes', () => {
    const registry = createSubscriptionIssueStores();
    registry.register('tab:board:closed', { type: 'closed-issues' });
    /** @type {string[]} */
    const seen = [];
    registry.subscribe((client_id) => {
      seen.push(client_id);
    });

    registry.register('tab:board:closed', {
      type: 'closed-issues',
      params: { since: 5 }
    });
    pushSnapshot(registry, 'tab:board:closed', 1, [
      { id: 'C', created_at: 1, updated_at: 1 }
    ]);

    expect(seen).toEqual(['tab:board:closed']);
  });

  test('does not notify on register or unregister', () => {
    const registry = createSubscriptionIssueStores();
    let hits = 0;
    registry.subscribe(() => {
      hits += 1;
    });

    registry.register('tab:board:ready', { type: 'ready-issues' });
    registry.unregister('tab:board:ready');

    expect(hits).toBe(0);
  });

  test('returns a consumer-owned copy from snapshotFor', () => {
    const registry = createSubscriptionIssueStores();
    registry.register('tab:board:ready', { type: 'ready-issues' });
    pushSnapshot(registry, 'tab:board:ready', 1, [
      { id: 'A', created_at: 1, updated_at: 1 },
      { id: 'B', created_at: 2, updated_at: 2 }
    ]);

    const copy = registry.snapshotFor('tab:board:ready');
    copy.reverse();

    expect(
      registry.snapshotFor('tab:board:ready').map((i) => i.id)
    ).not.toEqual(copy.map((i) => i.id));
  });
});
