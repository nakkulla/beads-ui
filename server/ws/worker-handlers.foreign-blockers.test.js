import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBdJsonProjected } from '../bd.js';
import { registerWorkspace } from '../registry-watcher.js';
import {
  __resetForeignBlockerCachesForTest,
  cachedIssuePrefixFor,
  prewarmIssuePrefix
} from '../worker/foreign-blocker-status.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { decorateQueue, onWorkerSnapshotRefresh } from './worker-handlers.js';

// Every `bd` the decoration reaches for — the prefix reads and the cross-rig
// status read — is faked; the wiring between `decorateQueue` and the resolver
// is what these tests are about.
vi.mock('../bd.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return { ...actual, runBdJsonProjected: vi.fn() };
});

const TMP_ROOT = path.join(os.tmpdir(), 'bdui-foreign-blockers');
const WS_A = path.join(TMP_ROOT, 'beads-ui');
const WS_B = path.join(TMP_ROOT, 'dotfiles');

/** @type {Record<string, string|null>} */
let prefix_by_root = {};
/** @type {Record<string, string>} */
let status_by_id = {};
/** @type {string|undefined} */
let original_home;
/** @type {string} */
let tmp_home;
/** @type {Array<() => void>} */
let unsubscribes = [];

/**
 * One waiting bead whose `blocks` edges the title cache already holds. A
 * FOREIGN edge carries no `status` — the exact `bd show` shape that makes the
 * cross-rig resolver necessary.
 *
 * @param {string} bead_id
 * @param {string[]} blocker_ids
 */
function seedBlocked(bead_id, blocker_ids) {
  getWorkerRuntime().titleCache.refreshFromIssue(WS_A, {
    id: bead_id,
    title: `${bead_id} 제목`,
    dependencies: blocker_ids.map((id) => ({
      dependency_type: 'blocks',
      id
    })),
    metadata: {}
  });
}

/**
 * @param {string} bead_id
 * @returns {Record<string, unknown>}
 */
function queueOf(bead_id) {
  return {
    revision: 1,
    auto_advance: false,
    auto_merge: false,
    queue: [{ bead_id, added_at: 1 }],
    serial_lanes: [],
    pr_wait: [],
    done: [],
    attempts: {},
    exec_defaults: {}
  };
}

/**
 * @param {string} bead_id
 * @returns {string[]}
 */
function blockersOf(bead_id) {
  const decorated = /** @type {Record<string, any>} */ (
    decorateQueue(WS_A, queueOf(bead_id))
  );
  return decorated.bead_blocked_by[bead_id];
}

/**
 * Fill both rigs' prefix caches, which is the state a session that already
 * opened the monitor is in.
 */
async function warmPrefixes() {
  prewarmIssuePrefix(WS_A);
  prewarmIssuePrefix(WS_B);
  await vi.waitFor(() => {
    expect(cachedIssuePrefixFor(WS_A)).toBe('UI');
    expect(cachedIssuePrefixFor(WS_B)).toBe('dotfiles');
  });
}

/**
 * Record every workspace whose snapshot is re-pushed.
 *
 * @returns {string[]}
 */
function captureRefreshed() {
  /** @type {string[]} */
  const seen = [];
  unsubscribes.push(
    onWorkerSnapshotRefresh((workspace) => {
      seen.push(workspace);
    })
  );
  return seen;
}

beforeEach(() => {
  original_home = process.env.HOME;
  tmp_home = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-fb-home-'));
  // The registry lives under `$HOME/.beads`; an empty one keeps the visible set
  // to exactly the two rigs registered below.
  process.env.HOME = tmp_home;
  process.env.XDG_STATE_HOME = tmp_home;
  prefix_by_root = { [WS_A]: 'UI', [WS_B]: 'dotfiles' };
  status_by_id = {};
  __resetForeignBlockerCachesForTest();
  getWorkerRuntime().titleCache.clear();
  registerWorkspace({ path: WS_A, database: path.join(WS_A, '.beads/db') });
  registerWorkspace({ path: WS_B, database: path.join(WS_B, '.beads/db') });
  vi.mocked(runBdJsonProjected).mockImplementation(
    async (family, args, options) => {
      const cwd = String(options?.cwd || '');
      if (family === 'config') {
        return /** @type {any} */ ({
          ok: true,
          data: { issue_prefix: prefix_by_root[cwd] ?? null }
        });
      }
      if (family === 'show') {
        const id = String(args[1] || '');
        const status = status_by_id[id];
        return /** @type {any} */ (
          status ? { ok: true, data: { id, status } } : { ok: false }
        );
      }
      return /** @type {any} */ ({ ok: false });
    }
  );
});

afterEach(() => {
  for (const off of unsubscribes) {
    off();
  }
  unsubscribes = [];
  if (original_home === undefined) {
    delete process.env.HOME;
  } else {
    process.env.HOME = original_home;
  }
  delete process.env.XDG_STATE_HOME;
  vi.restoreAllMocks();
});

describe('decorateQueue foreign blocker cleanup (UI-u6zf §3.2)', () => {
  test('drops a closed foreign blocker from bead_blocked_by', async () => {
    seedBlocked('UI-1', ['dotfiles-a27g']);
    status_by_id['dotfiles-a27g'] = 'closed';
    await warmPrefixes();

    blockersOf('UI-1');

    await vi.waitFor(() => expect(blockersOf('UI-1')).toEqual([]));
  });

  test('keeps a foreign blocker whose status is still unknown', async () => {
    seedBlocked('UI-1', ['dotfiles-a27g']);
    await warmPrefixes();

    blockersOf('UI-1');

    await vi.waitFor(() =>
      expect(vi.mocked(runBdJsonProjected)).toHaveBeenCalledWith(
        'show',
        ['show', 'dotfiles-a27g', '--json'],
        expect.anything()
      )
    );
    expect(blockersOf('UI-1')).toEqual(['dotfiles-a27g']);
  });

  test('leaves a same-rig blocker alone whatever its status says', async () => {
    seedBlocked('UI-1', ['UI-x']);
    status_by_id['UI-x'] = 'closed';
    await warmPrefixes();

    blockersOf('UI-1');

    await vi.waitFor(() => expect(cachedIssuePrefixFor(WS_A)).toBe('UI'));
    expect(blockersOf('UI-1')).toEqual(['UI-x']);
  });

  test('leaves an id no visible rig prefix owns alone', async () => {
    seedBlocked('UI-1', ['ext-1']);
    status_by_id['ext-1'] = 'closed';
    await warmPrefixes();

    blockersOf('UI-1');

    await vi.waitFor(() => expect(cachedIssuePrefixFor(WS_B)).toBe('dotfiles'));
    expect(blockersOf('UI-1')).toEqual(['ext-1']);
  });
});

describe('decorateQueue blocker_workspaces (UI-u6zf §4)', () => {
  test('names the owning workspace of a surviving foreign blocker', async () => {
    seedBlocked('UI-1', ['dotfiles-a27g']);
    status_by_id['dotfiles-a27g'] = 'open';
    await warmPrefixes();

    const decorated = /** @type {Record<string, any>} */ (
      decorateQueue(WS_A, queueOf('UI-1'))
    );

    expect(decorated.blocker_workspaces).toEqual({ 'dotfiles-a27g': WS_B });
  });

  test('carries no key for a blocker whose owner is unknown', async () => {
    seedBlocked('UI-1', ['ext-1']);
    await warmPrefixes();

    const decorated = /** @type {Record<string, any>} */ (
      decorateQueue(WS_A, queueOf('UI-1'))
    );

    expect(Object.hasOwn(decorated, 'blocker_workspaces')).toBe(false);
  });

  test('carries no key when the snapshot has no foreign blocker at all', async () => {
    seedBlocked('UI-1', ['UI-x']);
    await warmPrefixes();

    const decorated = /** @type {Record<string, any>} */ (
      decorateQueue(WS_A, queueOf('UI-1'))
    );

    expect(Object.hasOwn(decorated, 'blocker_workspaces')).toBe(false);
  });
});

describe('decorateQueue requester wake-up (UI-u6zf §3.3·§3.4)', () => {
  test('re-pushes the blocked workspace when a late closed status lands', async () => {
    seedBlocked('UI-1', ['dotfiles-a27g']);
    status_by_id['dotfiles-a27g'] = 'closed';
    await warmPrefixes();
    const refreshed = captureRefreshed();

    blockersOf('UI-1');

    await vi.waitFor(() => expect(refreshed.length).toBeGreaterThan(0));
    expect(new Set(refreshed)).toEqual(new Set([WS_A]));
  });

  test('never re-pushes the rig that merely owns the blocker', async () => {
    seedBlocked('UI-1', ['dotfiles-a27g']);
    status_by_id['dotfiles-a27g'] = 'closed';
    await warmPrefixes();
    const refreshed = captureRefreshed();

    blockersOf('UI-1');

    await vi.waitFor(() => expect(refreshed.length).toBeGreaterThan(0));
    expect(refreshed).not.toContain(WS_B);
  });

  test('warms the prefixes itself in a session that never opened the monitor', async () => {
    seedBlocked('UI-1', ['dotfiles-a27g']);
    status_by_id['dotfiles-a27g'] = 'closed';
    const refreshed = captureRefreshed();

    // 프리픽스 캐시가 비어 있으므로 첫 스냅샷은 owner를 못 찾고 blocker를 남긴다.
    expect(blockersOf('UI-1')).toEqual(['dotfiles-a27g']);

    await vi.waitFor(() => expect(refreshed.length).toBeGreaterThan(0));
    expect(new Set(refreshed)).toEqual(new Set([WS_A]));
    await vi.waitFor(() => expect(blockersOf('UI-1')).toEqual([]));
  });
});
