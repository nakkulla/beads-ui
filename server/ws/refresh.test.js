import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBdJsonProjected } from '../bd.js';
import { fetchListForSubscription } from '../list-adapters.js';
import {
  __resetForeignBlockerCachesForTest,
  foreignBlockerStatusFor
} from '../worker/foreign-blocker-status.js';
import {
  __resetRegistriesForTest,
  ensureSubs,
  setConnWorkspace,
  setCurrentWss
} from './context.js';
import { refreshForeignBlockerRequesters } from './refresh.js';

vi.mock('../bd.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return { ...actual, runBdJsonProjected: vi.fn() };
});
vi.mock('../list-adapters.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return {
    ...actual,
    fetchListForSubscription: vi.fn(async () => ({ ok: true, items: [] }))
  };
});

const WS_A = '/repos/beads-ui';
const WS_B = '/repos/dotfiles';

beforeEach(() => {
  __resetForeignBlockerCachesForTest();
  __resetRegistriesForTest();
  vi.clearAllMocks();
});

afterEach(() => {
  setCurrentWss(null);
});

/**
 * A connected client holding one Ready subscription in `root_dir`.
 *
 * @param {string} root_dir
 */
function connectListSubscriber(root_dir) {
  const ws = /** @type {any} */ ({ readyState: 1, OPEN: 1, send: () => {} });
  setConnWorkspace(ws, /** @type {any} */ ({ root_dir }));
  ensureSubs(ws).list_subs = new Map([
    ['client-1', { key: 'ready-issues', spec: { type: 'ready-issues' } }]
  ]);
  setCurrentWss(/** @type {any} */ ({ clients: new Set([ws]) }));
  return ws;
}

describe('foreign blocker list refresh (UI-d13v §3.7)', () => {
  test('schedules one refresh per requester root', () => {
    /** @type {Array<[string, string]>} */
    const scheduled = [];

    refreshForeignBlockerRequesters(
      new Set([WS_A, WS_B]),
      (cause, root_dir) => {
        scheduled.push([cause, root_dir]);
      }
    );

    expect(scheduled).toEqual([
      ['foreign-blocker', WS_A],
      ['foreign-blocker', WS_B]
    ]);
  });

  test('keeps scheduling after one root throws', () => {
    /** @type {string[]} */
    const scheduled = [];

    refreshForeignBlockerRequesters(
      new Set([WS_A, WS_B]),
      (_cause, root_dir) => {
        if (root_dir === WS_A) {
          throw new Error('scheduler down');
        }
        scheduled.push(root_dir);
      }
    );

    expect(scheduled).toEqual([WS_B]);
  });

  test('refreshes the list subscriptions of the workspace that waited', async () => {
    connectListSubscriber(WS_A);
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'closed' }
      })
    );

    foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A);

    await vi.waitFor(() =>
      expect(fetchListForSubscription).toHaveBeenCalledWith(
        { type: 'ready-issues' },
        expect.objectContaining({
          cwd: WS_A,
          snapshot_cause: 'foreign-blocker'
        })
      )
    );
  });
});
