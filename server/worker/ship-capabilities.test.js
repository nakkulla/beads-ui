import { describe, expect, test, vi } from 'vitest';
import { shipExportedCapabilities } from './ship-capabilities.js';

/**
 * A fake bd whose issues live in a plain map, so a ship's `provides:` write is
 * observable by the readback exactly as the real adapter's would be.
 *
 * @param {Record<string, { labels?: string[], metadata?: Record<string, unknown> }>} issues
 * @param {{ shipTarget?: (capability: string) => string|null, failShip?: string[], failRead?: string[], failRemove?: string[], silentShip?: string[], silentRemove?: string[] }} [behaviour]
 */
function fakeBd(issues, behaviour = {}) {
  /** @type {Record<string, { labels: string[], metadata: Record<string, unknown> }>} */
  const state = {};
  for (const [id, issue] of Object.entries(issues)) {
    state[id] = {
      labels: [...(issue.labels || [])],
      metadata: { ...(issue.metadata || {}) }
    };
  }
  /** @type {string[]} */
  const ship_calls = [];
  /** @type {string[]} */
  const remove_calls = [];
  return {
    state,
    ship_calls,
    remove_calls,
    readIssue: vi.fn(async (/** @type {string} */ id) => {
      if ((behaviour.failRead || []).includes(id)) {
        throw new Error(`bd show ${id} failed`);
      }
      if (!state[id]) {
        throw new Error(`bd show ${id} failed`);
      }
      return {
        id,
        labels: [...state[id].labels],
        metadata: state[id].metadata
      };
    }),
    ship: vi.fn(async (/** @type {string} */ capability) => {
      ship_calls.push(capability);
      if ((behaviour.failShip || []).includes(capability)) {
        throw new Error(`bd ship ${capability} failed`);
      }
      const target = behaviour.shipTarget
        ? behaviour.shipTarget(capability)
        : Object.keys(state).find((id) =>
            state[id].labels.includes(`export:${capability}`)
          ) || null;
      if (
        target &&
        state[target] &&
        !(behaviour.silentShip || []).includes(capability)
      ) {
        state[target].labels.push(`provides:${capability}`);
      }
      return { status: 'shipped', issue_id: target };
    }),
    removeLabel: vi.fn(
      async (/** @type {string} */ id, /** @type {string} */ label) => {
        remove_calls.push(`${id}:${label}`);
        if ((behaviour.failRemove || []).includes(id)) {
          throw new Error(`bd label remove failed`);
        }
        if (!(behaviour.silentRemove || []).includes(id)) {
          state[id].labels = state[id].labels.filter((l) => l !== label);
        }
      }
    )
  };
}

describe('worker/ship-capabilities', () => {
  test('returns ok without shipping when no bead carries an export: label', async () => {
    const bd = fakeBd({ 'UI-1': { labels: ['frontend'] } });

    const r = await shipExportedCapabilities({ bd, bead_ids: ['UI-1'] });

    expect(r).toEqual({ ok: true, removed: [] });
    expect(bd.ship).not.toHaveBeenCalled();
  });

  test('ships one export: capability and confirms it by provides: readback', async () => {
    const bd = fakeBd({ 'UI-1': { labels: ['export:cap-a'] } });

    const r = await shipExportedCapabilities({ bd, bead_ids: ['UI-1'] });

    expect(r.ok).toBe(true);
    expect(bd.ship_calls).toEqual(['cap-a']);
    expect(bd.state['UI-1'].labels).toContain('provides:cap-a');
  });

  test('skips a capability that already carries its provides: label', async () => {
    const bd = fakeBd({
      'UI-1': { labels: ['export:cap-a', 'provides:cap-a'] }
    });

    const r = await shipExportedCapabilities({ bd, bead_ids: ['UI-1'] });

    expect(r.ok).toBe(true);
    expect(bd.ship).not.toHaveBeenCalled();
  });

  test('ships the capabilities of the parent and every descendant', async () => {
    const bd = fakeBd({
      'UI-1': { labels: ['export:cap-a'] },
      'UI-2': { labels: ['export:cap-b'] },
      'UI-3': { labels: ['export:cap-c'] }
    });

    const r = await shipExportedCapabilities({
      bd,
      bead_ids: ['UI-1', 'UI-2', 'UI-3']
    });

    expect(r.ok).toBe(true);
    expect(bd.ship_calls).toEqual(['cap-a', 'cap-b', 'cap-c']);
  });

  test('does not ship a canceled descendant and removes its export: label', async () => {
    const bd = fakeBd({
      'UI-1': { labels: ['export:cap-a'] },
      'UI-2': {
        labels: ['export:cap-b'],
        metadata: { child_disposition: 'canceled' }
      }
    });

    const r = await shipExportedCapabilities({
      bd,
      bead_ids: ['UI-1', 'UI-2']
    });

    expect(r).toEqual({ ok: true, removed: ['UI-2:cap-b'] });
    expect(bd.ship_calls).toEqual(['cap-a']);
    expect(bd.state['UI-2'].labels).not.toContain('export:cap-b');
  });

  test('treats an out_of_scope descendant the same as a canceled one', async () => {
    const bd = fakeBd({
      'UI-2': {
        labels: ['export:cap-b'],
        metadata: { child_disposition: 'out_of_scope' }
      }
    });

    const r = await shipExportedCapabilities({ bd, bead_ids: ['UI-2'] });

    expect(r).toEqual({ ok: true, removed: ['UI-2:cap-b'] });
    expect(bd.ship).not.toHaveBeenCalled();
  });

  test('neither ships nor unlabels a deferred descendant', async () => {
    const bd = fakeBd({
      'UI-2': {
        labels: ['export:cap-b'],
        metadata: { child_disposition: 'deferred' }
      }
    });

    const r = await shipExportedCapabilities({ bd, bead_ids: ['UI-2'] });

    expect(r).toEqual({ ok: true, removed: [] });
    expect(bd.ship).not.toHaveBeenCalled();
    expect(bd.removeLabel).not.toHaveBeenCalled();
    expect(bd.state['UI-2'].labels).toContain('export:cap-b');
  });

  test('ships a bead carrying no child_disposition key at all', async () => {
    const bd = fakeBd({ 'UI-1': { labels: ['export:cap-a'], metadata: {} } });

    const r = await shipExportedCapabilities({ bd, bead_ids: ['UI-1'] });

    expect(r.ok).toBe(true);
    expect(bd.ship_calls).toEqual(['cap-a']);
  });

  test('fails when an export: label survives its removal', async () => {
    const bd = fakeBd(
      {
        'UI-2': {
          labels: ['export:cap-b'],
          metadata: { child_disposition: 'canceled' }
        }
      },
      { silentRemove: ['UI-2'] }
    );

    const r = await shipExportedCapabilities({ bd, bead_ids: ['UI-2'] });

    expect(r).toMatchObject({
      ok: false,
      reason: 'export_removal_failed:UI-2:cap-b'
    });
  });

  test('a collection read failure separates confirmed remainder from unread beads', async () => {
    const bd = fakeBd(
      {
        'UI-1': { labels: ['export:cap-a'] },
        'UI-2': { labels: ['export:cap-b'] },
        'UI-3': { labels: ['export:cap-c'] }
      },
      { failRead: ['UI-2'] }
    );

    const r = await shipExportedCapabilities({
      bd,
      bead_ids: ['UI-1', 'UI-2', 'UI-3']
    });

    expect(r).toEqual({
      ok: false,
      reason: 'ship_read_failed:UI-2',
      detail: 'pending=cap-a unread=UI-2,UI-3'
    });
    expect(bd.ship).not.toHaveBeenCalled();
  });

  test('a bd ship failure reports the whole remaining capability list', async () => {
    const bd = fakeBd(
      {
        'UI-1': { labels: ['export:cap-a'] },
        'UI-2': { labels: ['export:cap-b'] },
        'UI-3': { labels: ['export:cap-c'] }
      },
      { failShip: ['cap-b'] }
    );

    const r = await shipExportedCapabilities({
      bd,
      bead_ids: ['UI-1', 'UI-2', 'UI-3']
    });

    expect(r).toEqual({
      ok: false,
      reason: 'ship_failed:cap-b',
      detail: 'pending=cap-b,cap-c'
    });
  });

  test('a ship whose provides: label never appears fails the readback', async () => {
    const bd = fakeBd(
      { 'UI-1': { labels: ['export:cap-a'] } },
      { silentShip: ['cap-a'] }
    );

    const r = await shipExportedCapabilities({ bd, bead_ids: ['UI-1'] });

    expect(r).toMatchObject({
      ok: false,
      reason: 'ship_readback_failed:cap-a'
    });
  });

  test('a ship that lands on another issue is a mismatch, not a success', async () => {
    const bd = fakeBd(
      { 'UI-1': { labels: ['export:cap-a'] } },
      { shipTarget: () => 'UI-99' }
    );

    const r = await shipExportedCapabilities({ bd, bead_ids: ['UI-1'] });

    expect(r).toMatchObject({
      ok: false,
      reason: 'ship_target_mismatch:cap-a'
    });
  });

  test('an unreadable collection payload fails closed instead of reading as no labels', async () => {
    const bd = {
      readIssue: vi.fn(async () => null),
      ship: vi.fn(),
      removeLabel: vi.fn()
    };

    const r = await shipExportedCapabilities({
      bd: /** @type {any} */ (bd),
      bead_ids: ['UI-1']
    });

    expect(r).toMatchObject({ ok: false, reason: 'ship_read_failed:UI-1' });
    expect(bd.ship).not.toHaveBeenCalled();
  });

  test('an unreadable removal readback is not a confirmed removal', async () => {
    let reads = 0;
    const bd = {
      readIssue: vi.fn(async (/** @type {string} */ id) => {
        reads += 1;
        return reads === 1
          ? {
              id,
              labels: ['export:cap-b'],
              metadata: { child_disposition: 'canceled' }
            }
          : null;
      }),
      ship: vi.fn(),
      removeLabel: vi.fn(async () => {})
    };

    const r = await shipExportedCapabilities({
      bd: /** @type {any} */ (bd),
      bead_ids: ['UI-2']
    });

    expect(r).toMatchObject({
      ok: false,
      reason: 'export_removal_failed:UI-2:cap-b'
    });
  });

  test('an unreadable ship readback fails closed', async () => {
    let reads = 0;
    const bd = {
      readIssue: vi.fn(async (/** @type {string} */ id) => {
        reads += 1;
        return reads === 1 ? { id, labels: ['export:cap-a'] } : 'nonsense';
      }),
      ship: vi.fn(async () => ({ status: 'shipped', issue_id: 'UI-1' })),
      removeLabel: vi.fn()
    };

    const r = await shipExportedCapabilities({
      bd: /** @type {any} */ (bd),
      bead_ids: ['UI-1']
    });

    expect(r).toMatchObject({
      ok: false,
      reason: 'ship_readback_failed:cap-a'
    });
  });

  test('an adapter without ship/removeLabel is unavailable, not a no-op', async () => {
    const readIssue = vi.fn();

    const r = await shipExportedCapabilities({
      bd: { readIssue },
      bead_ids: ['UI-1']
    });

    expect(r).toEqual({ ok: false, reason: 'ship_unavailable' });
    expect(readIssue).not.toHaveBeenCalled();
  });
});
