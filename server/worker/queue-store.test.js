import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createQueueStore } from './queue-store.js';
import {
  queueFilePath,
  workspaceSlug,
  workspaceStateDir
} from './state-paths.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/example-workspace/project-a';

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-queue-'));
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

describe('worker/state-paths', () => {
  test('honors XDG_STATE_HOME and derives a stable, unique dir slug', () => {
    const dir = workspaceStateDir(WS);
    expect(dir.startsWith(path.join(tmp_state, 'bdui'))).toBe(true);
    expect(queueFilePath(WS)).toBe(path.join(dir, 'queue.json'));

    // Stable: same input → same slug.
    expect(workspaceSlug(WS)).toBe(workspaceSlug(WS));
    // Unique: same basename, different parent → different slug.
    expect(workspaceSlug('/a/project-a')).not.toBe(
      workspaceSlug('/b/project-a')
    );
    // Filesystem-safe slug.
    expect(workspaceSlug(WS)).toMatch(/^[A-Za-z0-9._-]+$/);
  });
});

describe('worker/queue-store', () => {
  test('place persists and round-trips through a fresh store instance', () => {
    const a = createQueueStore();
    const r = a.place(WS, {
      expected_revision: 0,
      bead_id: 'UI-1',
      lane: 'serial'
    });
    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(1);
    expect(r.queue.serial.map((e) => e.bead_id)).toEqual(['UI-1']);

    // On-disk file exists and is valid JSON (never partial).
    const file = queueFilePath(WS);
    expect(fs.existsSync(file)).toBe(true);
    expect(fs.existsSync(`${file}.tmp`)).toBe(false);
    JSON.parse(fs.readFileSync(file, 'utf8'));

    // A brand-new store instance cold-loads the same placement from disk.
    const b = createQueueStore();
    const snap = b.snapshot(WS);
    expect(snap.revision).toBe(1);
    expect(snap.serial.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('revision mismatch is rejected as a conflict with no write', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1', lane: 'serial' });
    const before = fs.readFileSync(queueFilePath(WS), 'utf8');

    // Stale client uses expected_revision 0, but current is 1.
    const r = store.place(WS, {
      expected_revision: 0,
      bead_id: 'UI-2',
      lane: 'serial'
    });
    expect(r.ok).toBe(false);
    expect(r.conflict).toBe(true);
    // Returned snapshot is the current (unchanged) state so the client re-syncs.
    expect(r.queue.revision).toBe(1);
    expect(r.queue.serial.map((e) => e.bead_id)).toEqual(['UI-1']);
    // No write occurred.
    expect(fs.readFileSync(queueFilePath(WS), 'utf8')).toBe(before);
  });

  test('auto_advance is forced false on reload even when the file says true', () => {
    const store = createQueueStore();
    store.toggleAutoAdvance(WS, { expected_revision: 0, on: true });
    // Within the same session it stays on.
    expect(store.snapshot(WS).auto_advance).toBe(true);
    // Disk really recorded true.
    const persisted = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect(persisted.auto_advance).toBe(true);

    // A restart (fresh store instance / cold load) must reset it.
    const restarted = createQueueStore();
    expect(restarted.load(WS).auto_advance).toBe(false);
    expect(restarted.snapshot(WS).auto_advance).toBe(false);
  });

  test('two-way move dedupes across lanes', () => {
    const store = createQueueStore();
    let rev = 0;
    rev = store.place(WS, {
      expected_revision: rev,
      bead_id: 'UI-1',
      lane: 'serial'
    }).queue.revision;
    // Move the same bead into the parallel pool.
    const r = store.place(WS, {
      expected_revision: rev,
      bead_id: 'UI-1',
      lane: 'parallel'
    });
    expect(r.queue.serial.map((e) => e.bead_id)).toEqual([]);
    expect(r.queue.parallel.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('reorder moves a bead within a lane', () => {
    const store = createQueueStore();
    let rev = 0;
    for (const id of ['A', 'B', 'C']) {
      rev = store.place(WS, {
        expected_revision: rev,
        bead_id: id,
        lane: 'serial'
      }).queue.revision;
    }
    const r = store.reorder(WS, {
      expected_revision: rev,
      bead_id: 'C',
      lane: 'serial',
      to_index: 0
    });
    expect(r.ok).toBe(true);
    expect(r.queue.serial.map((e) => e.bead_id)).toEqual(['C', 'A', 'B']);
  });

  test('remove drops a bead and appendAttempt persists the container', () => {
    const store = createQueueStore();
    let rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'UI-1',
      lane: 'serial'
    }).queue.revision;

    const appended = store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    expect(appended.ok).toBe(true);
    expect(appended.queue.attempts['att-1']).toMatchObject({
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      base_oid: null,
      exit: null,
      verify_result: null
    });
    rev = appended.queue.revision;

    // Attempt survives a cold reload.
    expect(createQueueStore().load(WS).attempts['att-1'].bead_id).toBe('UI-1');

    const removed = store.remove(WS, {
      expected_revision: rev,
      bead_id: 'UI-1'
    });
    expect(removed.queue.serial).toEqual([]);
  });

  test('a failed write leaves memory and disk at the prior revision (atomic)', () => {
    // First a good write via the real fs.
    const good = createQueueStore();
    good.place(WS, { expected_revision: 0, bead_id: 'UI-1', lane: 'serial' });
    const before = fs.readFileSync(queueFilePath(WS), 'utf8');

    // A store whose writeFileSync always throws simulates a mid-write failure.
    const failing = createQueueStore({
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
      failing.place(WS, {
        expected_revision: 1,
        bead_id: 'UI-2',
        lane: 'serial'
      })
    ).toThrow(/disk full/);

    // Disk untouched (still revision 1, only UI-1).
    expect(fs.readFileSync(queueFilePath(WS), 'utf8')).toBe(before);
    // In-memory cache uncommitted: still revision 1.
    expect(failing.snapshot(WS).revision).toBe(1);
    expect(failing.snapshot(WS).serial.map((e) => e.bead_id)).toEqual(['UI-1']);
  });
});
