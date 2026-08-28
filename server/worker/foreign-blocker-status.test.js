import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBdJsonProjected } from '../bd.js';
import {
  __resetForeignBlockerCachesForTest,
  applyForeignBlockerCleanup,
  cachedIssuePrefixFor,
  foreignBlockerClosedAtFor,
  foreignBlockerStatusFor,
  onForeignBlockerResolved,
  prewarmIssuePrefix,
  queryForeignBlockerStatus
} from './foreign-blocker-status.js';

vi.mock('../bd.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return { ...actual, runBdJsonProjected: vi.fn() };
});

const WS_A = '/repos/beads-ui';
const CLOSED_AT_ISO = '2026-08-20T09:30:00.000Z';
const WS_B = '/repos/dotfiles';

/** @type {Array<() => void>} */
let unsubscribes = [];

/**
 * Collect the requester sets every landed lookup reports.
 *
 * @returns {Array<string[]>}
 */
function captureResolved() {
  /** @type {Array<string[]>} */
  const seen = [];
  unsubscribes.push(
    onForeignBlockerResolved((requesters) => {
      seen.push([...requesters].sort());
    })
  );
  return seen;
}

/**
 * Move the clock forward for cache-expiry cases without freezing it: the real
 * time still advances underneath, so `vi.waitFor` keeps working.
 *
 * @returns {(ms: number) => void}
 */
function advanceableClock() {
  const real_now = Date.now.bind(Date);
  let offset = 0;

  vi.spyOn(Date, 'now').mockImplementation(() => real_now() + offset);

  return (ms) => {
    offset += ms;
  };
}

/**
 * Seams standing in for the live registry, prefix cache and status resolver.
 *
 * @param {{
 *   roots?: string[],
 *   prefixes?: Record<string, string|null>,
 *   status?: Record<string, string|null>,
 *   rootsCalls?: number[],
 *   prewarmCalls?: Array<[string, string]>
 * }} input
 */
function seams(input) {
  return {
    listRoots: () => {
      if (input.rootsCalls) {
        input.rootsCalls.push(1);
      }
      return input.roots || [];
    },
    issuePrefixFor: (/** @type {string} */ root_dir) =>
      (input.prefixes || {})[root_dir] ?? null,
    statusFor: (/** @type {string} */ bead_id) =>
      (input.status || {})[bead_id] ?? null,
    prewarm: (
      /** @type {string} */ root_dir,
      /** @type {string} */ requester_root
    ) => {
      if (input.prewarmCalls) {
        input.prewarmCalls.push([root_dir, requester_root]);
      }
    }
  };
}

beforeEach(() => {
  __resetForeignBlockerCachesForTest();
  vi.clearAllMocks();
});

afterEach(() => {
  for (const off of unsubscribes) {
    off();
  }
  unsubscribes = [];
  vi.restoreAllMocks();
});

describe('applyForeignBlockerCleanup judgments (UI-u6zf §3.2)', () => {
  test('drops a foreign blocker whose owning rig says it is closed', () => {
    const projected = {
      bead_blocked_by: { 'UI-24ow': ['dotfiles-a27g', 'UI-rewk'] }
    };

    applyForeignBlockerCleanup(
      projected,
      WS_A,
      seams({
        roots: [WS_A, WS_B],
        prefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' },
        status: { 'dotfiles-a27g': 'closed' }
      })
    );

    expect(projected.bead_blocked_by).toEqual({ 'UI-24ow': ['UI-rewk'] });
  });

  test('keeps a foreign blocker whose status is still unknown', () => {
    const projected = { bead_blocked_by: { 'UI-1': ['dotfiles-a27g'] } };

    applyForeignBlockerCleanup(
      projected,
      WS_A,
      seams({
        roots: [WS_A, WS_B],
        prefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' }
      })
    );

    expect(projected.bead_blocked_by).toEqual({ 'UI-1': ['dotfiles-a27g'] });
  });

  test('never consults the resolver for a same-rig blocker', () => {
    /** @type {string[]} */
    const asked = [];
    const projected = { bead_blocked_by: { 'UI-1': ['UI-x'] } };

    applyForeignBlockerCleanup(projected, WS_A, {
      ...seams({
        roots: [WS_A, WS_B],
        prefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' }
      }),
      statusFor: (bead_id) => {
        asked.push(bead_id);
        return 'closed';
      }
    });

    expect(asked).toEqual([]);
    expect(projected.bead_blocked_by).toEqual({ 'UI-1': ['UI-x'] });
  });

  test('leaves an id no visible rig prefix owns untouched', () => {
    const projected = { bead_blocked_by: { 'UI-1': ['ext-1'] } };

    applyForeignBlockerCleanup(
      projected,
      WS_A,
      seams({
        roots: [WS_A, WS_B],
        prefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' },
        status: { 'ext-1': 'closed' }
      })
    );

    expect(projected.bead_blocked_by).toEqual({ 'UI-1': ['ext-1'] });
  });

  test('resolves a foreign blocker in the rig that owns its prefix', () => {
    /** @type {Array<[string, string]>} */
    const asked = [];

    applyForeignBlockerCleanup(
      { bead_blocked_by: { 'UI-1': ['dotfiles-a27g'] } },
      WS_A,
      {
        ...seams({
          roots: [WS_A, WS_B],
          prefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' }
        }),
        statusFor: (bead_id, owner_root) => {
          asked.push([bead_id, owner_root]);
          return null;
        }
      }
    );

    expect(asked).toEqual([['dotfiles-a27g', WS_B]]);
  });

  test('names the blocked workspace as the requester of the lookup', () => {
    /** @type {string[]} */
    const requesters = [];

    applyForeignBlockerCleanup(
      { bead_blocked_by: { 'UI-1': ['dotfiles-a27g'] } },
      WS_A,
      {
        ...seams({
          roots: [WS_A, WS_B],
          prefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' }
        }),
        statusFor: (_bead_id, _owner_root, requester_root) => {
          requesters.push(requester_root);
          return null;
        }
      }
    );

    expect(requesters).toEqual([WS_A]);
  });
});

describe('applyForeignBlockerCleanup cost gate (UI-u6zf §3.5)', () => {
  test('never lists the workspaces for a snapshot with no blockers', () => {
    /** @type {number[]} */
    const rootsCalls = [];

    applyForeignBlockerCleanup(
      { bead_blocked_by: { 'UI-1': [] } },
      WS_A,
      seams({ rootsCalls, prefixes: { [WS_A]: 'UI' } })
    );

    expect(rootsCalls).toEqual([]);
  });

  test('never lists the workspaces when every blocker is same-rig', () => {
    /** @type {number[]} */
    const rootsCalls = [];

    applyForeignBlockerCleanup(
      { bead_blocked_by: { 'UI-1': ['UI-x', 'UI-y'] } },
      WS_A,
      seams({ rootsCalls, prefixes: { [WS_A]: 'UI' } })
    );

    expect(rootsCalls).toEqual([]);
  });

  test('lists the workspaces once a foreign candidate appears', () => {
    /** @type {number[]} */
    const rootsCalls = [];

    applyForeignBlockerCleanup(
      { bead_blocked_by: { 'UI-1': ['UI-x', 'dotfiles-a27g'] } },
      WS_A,
      seams({ rootsCalls, roots: [WS_A], prefixes: { [WS_A]: 'UI' } })
    );

    expect(rootsCalls.length).toBe(1);
  });
});

describe('applyForeignBlockerCleanup prefix prewarm (UI-u6zf §3.4)', () => {
  test('warms every visible rig for the workspace that is blocked', () => {
    /** @type {Array<[string, string]>} */
    const prewarmCalls = [];

    applyForeignBlockerCleanup(
      { bead_blocked_by: { 'UI-1': ['dotfiles-a27g'] } },
      WS_A,
      seams({ prewarmCalls, roots: [WS_A, WS_B], prefixes: { [WS_A]: 'UI' } })
    );

    expect(prewarmCalls).toEqual([
      [WS_A, WS_A],
      [WS_B, WS_A]
    ]);
  });

  test('skips the warm-up once every foreign blocker found an owner', () => {
    /** @type {Array<[string, string]>} */
    const prewarmCalls = [];

    applyForeignBlockerCleanup(
      { bead_blocked_by: { 'UI-1': ['dotfiles-a27g'] } },
      WS_A,
      seams({
        prewarmCalls,
        roots: [WS_A, WS_B],
        prefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' }
      })
    );

    expect(prewarmCalls).toEqual([]);
  });
});

describe('blocker_workspaces projection (UI-u6zf §4)', () => {
  test('names the owning workspace of a surviving foreign blocker', () => {
    /** @type {Record<string, any>} */
    const projected = { bead_blocked_by: { 'UI-1': ['dotfiles-a27g'] } };

    applyForeignBlockerCleanup(
      projected,
      WS_A,
      seams({
        roots: [WS_A, WS_B],
        prefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' },
        status: { 'dotfiles-a27g': 'open' }
      })
    );

    expect(projected.blocker_workspaces).toEqual({
      'dotfiles-a27g': WS_B
    });
  });

  test('omits a same-rig blocker, which the client already places', () => {
    /** @type {Record<string, any>} */
    const projected = {
      bead_blocked_by: { 'UI-1': ['UI-x', 'dotfiles-a27g'] }
    };

    applyForeignBlockerCleanup(
      projected,
      WS_A,
      seams({
        roots: [WS_A, WS_B],
        prefixes: { [WS_A]: 'UI', [WS_B]: 'dotfiles' }
      })
    );

    expect(projected.blocker_workspaces).toEqual({
      'dotfiles-a27g': WS_B
    });
  });

  test('carries no key at all when no owner is known', () => {
    /** @type {Record<string, any>} */
    const projected = { bead_blocked_by: { 'UI-1': ['ext-1'] } };

    applyForeignBlockerCleanup(
      projected,
      WS_A,
      seams({ roots: [WS_A, WS_B], prefixes: { [WS_A]: 'UI' } })
    );

    expect(Object.hasOwn(projected, 'blocker_workspaces')).toBe(false);
  });
});

describe('requester-aware wake-up (UI-u6zf §3.3)', () => {
  test('reports the asking workspace, not the rig that owns the blocker', async () => {
    const seen = captureResolved();
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'closed' }
      })
    );

    foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A);

    await vi.waitFor(() => expect(seen).toEqual([[WS_A]]));
  });

  test('wakes nobody when the blocker is still open', async () => {
    const seen = captureResolved();
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'open' }
      })
    );

    foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A);

    await vi.waitFor(() =>
      expect(foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A)).toBe('open')
    );
    expect(seen).toEqual([]);
  });

  test('collects every workspace that joined one in-flight lookup', async () => {
    const seen = captureResolved();
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'closed' }
      })
    );

    foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A);
    foreignBlockerStatusFor('dotfiles-1', WS_B, '/repos/third');

    await vi.waitFor(() =>
      expect(seen).toEqual([[WS_A, '/repos/third'].sort()])
    );
  });

  test('still wakes an earlier waiter when a later lookup finds the close', async () => {
    const seen = captureResolved();
    const advance = advanceableClock();
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'open' }
      })
    );

    foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A);
    await vi.waitFor(() =>
      expect(foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A)).toBe('open')
    );
    advance(6 * 60_000);
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'closed' }
      })
    );
    foreignBlockerStatusFor('dotfiles-1', WS_B, '/repos/third');

    await vi.waitFor(() =>
      expect(seen).toEqual([[WS_A, '/repos/third'].sort()])
    );
  });

  test('keeps a waiter that arrived while a failed lookup was backing off', async () => {
    const seen = captureResolved();
    const advance = advanceableClock();
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({ ok: false })
    );

    foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A);
    await vi.waitFor(() => expect(runBdJsonProjected).toHaveBeenCalledTimes(1));
    foreignBlockerStatusFor('dotfiles-1', WS_B, '/repos/third');
    advance(2 * 60_000);
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'closed' }
      })
    );
    foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A);

    await vi.waitFor(() =>
      expect(seen).toEqual([[WS_A, '/repos/third'].sort()])
    );
  });
});

describe('prefix prewarm ownership (UI-u6zf §3.4)', () => {
  test('wakes the requester, never the rig whose prefix was read', async () => {
    const seen = captureResolved();
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({ ok: true, data: { issue_prefix: 'dotfiles' } })
    );

    prewarmIssuePrefix(WS_B, WS_A);

    await vi.waitFor(() => expect(seen).toEqual([[WS_A]]));
    expect(cachedIssuePrefixFor(WS_B)).toBe('dotfiles');
  });

  test('keeps a waiter that joined while a failed prewarm was backing off', async () => {
    const seen = captureResolved();
    const advance = advanceableClock();
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({ ok: true, data: {} })
    );

    prewarmIssuePrefix(WS_B, WS_A);
    await vi.waitFor(() => expect(cachedIssuePrefixFor(WS_B)).toBe(null));
    prewarmIssuePrefix(WS_B, '/repos/third');
    advance(10_000);
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({ ok: true, data: { issue_prefix: 'dotfiles' } })
    );
    prewarmIssuePrefix(WS_B, WS_A);

    await vi.waitFor(() =>
      expect(seen).toEqual([[WS_A, '/repos/third'].sort()])
    );
  });

  test('wakes nobody when the rig declares no prefix', async () => {
    const seen = captureResolved();
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({ ok: true, data: {} })
    );

    prewarmIssuePrefix(WS_B, WS_A);

    await vi.mocked(runBdJsonProjected).mock.results[0].value;
    await Promise.resolve();
    expect(seen).toEqual([]);
    expect(cachedIssuePrefixFor(WS_B)).toBe(null);
  });
});

describe('foreign blocker close time (UI-d13v §3.4)', () => {
  test('reports no close time while the lookup has not landed', () => {
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'closed', closed_at: CLOSED_AT_ISO }
      })
    );

    const closed_at = foreignBlockerClosedAtFor('dotfiles-1', WS_B, WS_A);

    expect(closed_at).toBe(null);
  });

  test('reports the close time once the owning rig answers closed', async () => {
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'closed', closed_at: CLOSED_AT_ISO }
      })
    );

    foreignBlockerClosedAtFor('dotfiles-1', WS_B, WS_A);

    await vi.waitFor(() =>
      expect(foreignBlockerClosedAtFor('dotfiles-1', WS_B, WS_A)).toBe(
        Date.parse(CLOSED_AT_ISO)
      )
    );
  });

  test('reports no close time for a blocker that is still open', async () => {
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'open', closed_at: null }
      })
    );

    foreignBlockerClosedAtFor('dotfiles-1', WS_B, WS_A);

    await vi.waitFor(() =>
      expect(foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A)).toBe('open')
    );
    expect(foreignBlockerClosedAtFor('dotfiles-1', WS_B, WS_A)).toBe(null);
  });

  test('reports no close time when a closed blocker carries no timestamp', async () => {
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'closed' }
      })
    );

    foreignBlockerClosedAtFor('dotfiles-1', WS_B, WS_A);

    await vi.waitFor(() =>
      expect(foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A)).toBe('closed')
    );
    expect(foreignBlockerClosedAtFor('dotfiles-1', WS_B, WS_A)).toBe(null);
  });

  test('keeps the status reader signature it shares the lookup with', async () => {
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'closed', closed_at: CLOSED_AT_ISO }
      })
    );

    foreignBlockerClosedAtFor('dotfiles-1', WS_B, WS_A);

    await vi.waitFor(() => expect(runBdJsonProjected).toHaveBeenCalledTimes(1));
    expect(vi.mocked(runBdJsonProjected).mock.calls[0][1]).toEqual([
      'show',
      'dotfiles-1',
      '--json'
    ]);
  });
});

describe('queryForeignBlockerStatus (선행 대기 계층 §4.2)', () => {
  /**
   * @param {Record<string, string|null>} prefixes
   */
  function querySeams(prefixes) {
    return {
      listRoots: () => [WS_A, WS_B],
      issuePrefixFor: (/** @type {string} */ root) => prefixes[root] ?? null
    };
  }

  test('answers the owning rig status when a prefix maps', async () => {
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'open' }
      })
    );

    const result = await queryForeignBlockerStatus(
      'dotfiles-1',
      WS_A,
      querySeams({ [WS_B]: 'dotfiles' })
    );

    expect(result).toEqual({ ok: true, status: 'open' });
  });

  test('reports no_rig when no visible rig owns the prefix', async () => {
    const result = await queryForeignBlockerStatus(
      'Analysis-2zly',
      WS_A,
      querySeams({ [WS_B]: 'dotfiles' })
    );

    expect(result).toEqual({ ok: false, reason: 'no_rig' });
  });

  test('reports bd_failed when the owning rig lookup fails', async () => {
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({ ok: false, error: { code: 'exit_1' } })
    );

    const result = await queryForeignBlockerStatus(
      'dotfiles-1',
      WS_A,
      querySeams({ [WS_B]: 'dotfiles' })
    );

    expect(result).toEqual({ ok: false, reason: 'bd_failed' });
  });

  test('reports unparsable when the payload carries no status', async () => {
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({ ok: true, data: { id: 'dotfiles-1' } })
    );

    const result = await queryForeignBlockerStatus(
      'dotfiles-1',
      WS_A,
      querySeams({ [WS_B]: 'dotfiles' })
    );

    expect(result).toEqual({ ok: false, reason: 'unparsable' });
  });

  test('never fills the status cache the display path reads', async () => {
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'closed' }
      })
    );

    await queryForeignBlockerStatus(
      'dotfiles-1',
      WS_A,
      querySeams({ [WS_B]: 'dotfiles' })
    );

    expect(foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A)).toBeNull();
  });

  test('never reads a cached status instead of asking bd', async () => {
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'closed' }
      })
    );
    foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A);
    await vi.waitFor(() =>
      expect(foreignBlockerStatusFor('dotfiles-1', WS_B, WS_A)).toBe('closed')
    );
    vi.mocked(runBdJsonProjected).mockResolvedValue(
      /** @type {any} */ ({
        ok: true,
        data: { id: 'dotfiles-1', status: 'open' }
      })
    );

    const result = await queryForeignBlockerStatus(
      'dotfiles-1',
      WS_A,
      querySeams({ [WS_B]: 'dotfiles' })
    );

    expect(result).toEqual({ ok: true, status: 'open' });
  });

  test('excludes the requesting workspace from the rig search', async () => {
    const result = await queryForeignBlockerStatus(
      'UI-1',
      WS_A,
      querySeams({ [WS_A]: 'UI', [WS_B]: 'dotfiles' })
    );

    expect(result).toEqual({ ok: false, reason: 'no_rig' });
  });

  test('resolves a cold prefix with an immediate bd config read', async () => {
    vi.mocked(runBdJsonProjected).mockImplementation(
      /** @type {any} */ (
        (/** @type {string} */ family) =>
          Promise.resolve(
            family === 'config'
              ? { ok: true, data: { issue_prefix: 'dotfiles' } }
              : { ok: true, data: { id: 'dotfiles-1', status: 'open' } }
          )
      )
    );

    const result = await queryForeignBlockerStatus('dotfiles-1', WS_A, {
      listRoots: () => [WS_B]
    });

    expect(result).toEqual({ ok: true, status: 'open' });
    expect(cachedIssuePrefixFor(WS_B)).toBeNull();
  });
});
