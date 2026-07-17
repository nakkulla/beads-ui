import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createUiOrderStore } from './ui-order-store.js';
import { uiOrderFilePath, workspaceStateDir } from './worker/state-paths.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/example-workspace/project-a';

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-uiorder-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('worker/state-paths ui-order', () => {
  test('derives ui-order.json next to the queue file under the state dir', () => {
    const dir = workspaceStateDir(WS);
    expect(uiOrderFilePath(WS)).toBe(path.join(dir, 'ui-order.json'));
    expect(uiOrderFilePath(WS).startsWith(path.join(tmp_state, 'bdui'))).toBe(
      true
    );
  });
});

describe('ui-order-store', () => {
  test('setRanks persists and round-trips through a fresh store instance', () => {
    const a = createUiOrderStore();
    const r = a.setRanks(WS, {
      expected_revision: 0,
      entries: [
        { bead_id: 'UI-1', rank: 1048576 },
        { bead_id: 'UI-2', rank: 2097152 }
      ]
    });
    expect(r.ok).toBe(true);
    expect(r.conflict).toBe(false);
    expect(r.revision).toBe(1);
    expect(r.order).toEqual({ 'UI-1': 1048576, 'UI-2': 2097152 });

    // On-disk file exists and is valid JSON (never partial).
    const file = uiOrderFilePath(WS);
    expect(fs.existsSync(file)).toBe(true);
    expect(fs.existsSync(`${file}.tmp`)).toBe(false);
    JSON.parse(fs.readFileSync(file, 'utf8'));

    // A brand-new store instance cold-loads the same order from disk.
    const b = createUiOrderStore();
    const snap = b.snapshot(WS);
    expect(snap.revision).toBe(1);
    expect(snap.order).toEqual({ 'UI-1': 1048576, 'UI-2': 2097152 });
  });

  test('setRanks merges/overwrites given entries and bumps revision', () => {
    const store = createUiOrderStore();
    const first = store.setRanks(WS, {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-1', rank: 10 }]
    });
    expect(first.revision).toBe(1);
    // Overwrite UI-1 + add UI-2.
    const second = store.setRanks(WS, {
      expected_revision: 1,
      entries: [
        { bead_id: 'UI-1', rank: 5 },
        { bead_id: 'UI-2', rank: 20 }
      ]
    });
    expect(second.ok).toBe(true);
    expect(second.revision).toBe(2);
    expect(second.order).toEqual({ 'UI-1': 5, 'UI-2': 20 });
  });

  test('revision mismatch is rejected as a conflict with no write', () => {
    const store = createUiOrderStore();
    store.setRanks(WS, {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-1', rank: 1 }]
    });
    const before = fs.readFileSync(uiOrderFilePath(WS), 'utf8');

    // Stale client still thinks revision is 0, but current is 1.
    const r = store.setRanks(WS, {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-2', rank: 2 }]
    });
    expect(r.ok).toBe(false);
    expect(r.conflict).toBe(true);
    // Current (unchanged) snapshot returned so the client re-syncs.
    expect(r.revision).toBe(1);
    expect(r.order).toEqual({ 'UI-1': 1 });
    // No write occurred.
    expect(fs.readFileSync(uiOrderFilePath(WS), 'utf8')).toBe(before);
  });

  test('invalid entry rejects the whole batch (no partial apply)', () => {
    const store = createUiOrderStore();
    store.setRanks(WS, {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-1', rank: 1 }]
    });
    const before = fs.readFileSync(uiOrderFilePath(WS), 'utf8');

    // Non-finite rank.
    const r1 = store.setRanks(WS, {
      expected_revision: 1,
      entries: [{ bead_id: 'UI-2', rank: Infinity }]
    });
    expect(r1.ok).toBe(false);
    expect(r1.conflict).toBe(false);
    expect(r1.revision).toBe(1);

    // Blank bead_id.
    const r2 = store.setRanks(WS, {
      expected_revision: 1,
      entries: [{ bead_id: '   ', rank: 5 }]
    });
    expect(r2.ok).toBe(false);
    expect(r2.conflict).toBe(false);

    // One valid + one invalid → neither is applied.
    const r3 = store.setRanks(WS, {
      expected_revision: 1,
      entries: [
        { bead_id: 'UI-9', rank: 9 },
        { bead_id: 'UI-2', rank: Number.NaN }
      ]
    });
    expect(r3.ok).toBe(false);

    // Order untouched, disk untouched.
    expect(store.snapshot(WS).order).toEqual({ 'UI-1': 1 });
    expect(fs.readFileSync(uiOrderFilePath(WS), 'utf8')).toBe(before);
  });

  test('pruneIds removes present ids (bump) and is a no-op otherwise', () => {
    const store = createUiOrderStore();
    store.setRanks(WS, {
      expected_revision: 0,
      entries: [
        { bead_id: 'UI-1', rank: 1 },
        { bead_id: 'UI-2', rank: 2 }
      ]
    });

    // Removal bumps revision + persists.
    const removed = store.pruneIds(WS, ['UI-1']);
    expect(removed.ok).toBe(true);
    expect(removed.revision).toBe(2);
    expect(removed.order).toEqual({ 'UI-2': 2 });

    // No-op prune (id absent): no bump, no persist.
    const before = fs.readFileSync(uiOrderFilePath(WS), 'utf8');
    const noop = store.pruneIds(WS, ['NOPE']);
    expect(noop.ok).toBe(false);
    expect(noop.revision).toBe(2);
    expect(noop.order).toEqual({ 'UI-2': 2 });
    expect(fs.readFileSync(uiOrderFilePath(WS), 'utf8')).toBe(before);
  });

  test('a failed write leaves memory and disk at the prior revision (atomic)', () => {
    const good = createUiOrderStore();
    good.setRanks(WS, {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-1', rank: 1 }]
    });
    const before = fs.readFileSync(uiOrderFilePath(WS), 'utf8');

    const failing = createUiOrderStore({
      fs: /** @type {any} */ ({
        readFileSync: fs.readFileSync,
        mkdirSync: fs.mkdirSync,
        renameSync: fs.renameSync,
        writeFileSync: () => {
          throw new Error('disk full');
        }
      })
    });
    expect(() =>
      failing.setRanks(WS, {
        expected_revision: 1,
        entries: [{ bead_id: 'UI-2', rank: 2 }]
      })
    ).toThrow(/disk full/);

    // Disk untouched (still revision 1, only UI-1).
    expect(fs.readFileSync(uiOrderFilePath(WS), 'utf8')).toBe(before);
    // In-memory cache uncommitted: still revision 1.
    expect(failing.snapshot(WS).revision).toBe(1);
    expect(failing.snapshot(WS).order).toEqual({ 'UI-1': 1 });
  });
});
