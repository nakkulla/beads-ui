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

describe('worker/queue-store policy settings (worker-autorun-policy §2)', () => {
  test('setPolicy persists merge_policy / drift_policy under the revision CAS', () => {
    const store = createQueueStore();
    expect(store.snapshot(WS).merge_policy).toBe(null);
    expect(store.snapshot(WS).drift_policy).toBe(null);

    let r = store.setPolicy(WS, {
      expected_revision: 0,
      key: 'merge_policy',
      value: 'pr_stop'
    });
    expect(r.ok).toBe(true);
    expect(r.queue.merge_policy).toBe('pr_stop');

    r = store.setPolicy(WS, {
      expected_revision: r.queue.revision,
      key: 'drift_policy',
      value: 'halt'
    });
    expect(r.ok).toBe(true);
    expect(r.queue.drift_policy).toBe('halt');

    // Stale revision → CAS conflict, no write.
    const stale = store.setPolicy(WS, {
      expected_revision: 0,
      key: 'merge_policy',
      value: 'auto_merge'
    });
    expect(stale.ok).toBe(false);
    expect(stale.conflict).toBe(true);
    expect(store.snapshot(WS).merge_policy).toBe('pr_stop');

    // null unsets (falls back to the default at resolution time).
    const unset = store.setPolicy(WS, {
      expected_revision: store.snapshot(WS).revision,
      key: 'merge_policy',
      value: null
    });
    expect(unset.ok).toBe(true);
    expect(unset.queue.merge_policy).toBe(null);
  });

  test('setPolicy rejects unknown keys and non-enum values', () => {
    const store = createQueueStore();
    const badKey = store.setPolicy(WS, {
      expected_revision: 0,
      key: 'auto_advance',
      value: 'pr_stop'
    });
    expect(badKey.ok).toBe(false);
    expect(badKey.conflict).toBe(false);
    const badValue = store.setPolicy(WS, {
      expected_revision: 0,
      key: 'merge_policy',
      value: 'yolo'
    });
    expect(badValue.ok).toBe(false);
    expect(store.snapshot(WS).merge_policy).toBe(null);
  });

  test('persisted policy values survive a reload; invalid persisted values do not', () => {
    const store = createQueueStore();
    let r = store.setPolicy(WS, {
      expected_revision: 0,
      key: 'merge_policy',
      value: 'pr_stop'
    });
    store.setPolicy(WS, {
      expected_revision: r.queue.revision,
      key: 'drift_policy',
      value: 'halt'
    });

    const restarted = createQueueStore();
    expect(restarted.load(WS).merge_policy).toBe('pr_stop');
    expect(restarted.load(WS).drift_policy).toBe('halt');

    // Corrupt the persisted values → normalize back to null.
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.merge_policy = 'yolo';
    raw.drift_policy = 7;
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));
    const again = createQueueStore();
    expect(again.load(WS).merge_policy).toBe(null);
    expect(again.load(WS).drift_policy).toBe(null);
  });
});

describe('worker/queue-store exec defaults (worker-global-exec-defaults §1)', () => {
  test('setExecDefault persists exec_defaults under the revision CAS + unsets', () => {
    const store = createQueueStore();
    // Fresh queue starts with no exec defaults.
    expect(store.snapshot(WS).exec_defaults).toEqual({});

    let r = store.setExecDefault(WS, {
      expected_revision: 0,
      key: 'review_model',
      value: 'codex'
    });
    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(1);
    expect(r.queue.exec_defaults).toEqual({ review_model: 'codex' });

    r = store.setExecDefault(WS, {
      expected_revision: r.queue.revision,
      key: 'orchestration_model',
      value: 'sonnet'
    });
    expect(r.ok).toBe(true);
    expect(r.queue.exec_defaults).toEqual({
      review_model: 'codex',
      orchestration_model: 'sonnet'
    });

    // Stale revision → CAS conflict, no write.
    const stale = store.setExecDefault(WS, {
      expected_revision: 0,
      key: 'review_model',
      value: 'opus'
    });
    expect(stale.ok).toBe(false);
    expect(stale.conflict).toBe(true);
    expect(store.snapshot(WS).exec_defaults.review_model).toBe('codex');

    // null unsets the key entirely.
    const unsetNull = store.setExecDefault(WS, {
      expected_revision: store.snapshot(WS).revision,
      key: 'review_model',
      value: null
    });
    expect(unsetNull.ok).toBe(true);
    expect(unsetNull.queue.exec_defaults).toEqual({
      orchestration_model: 'sonnet'
    });

    // '' also unsets the key.
    const unsetEmpty = store.setExecDefault(WS, {
      expected_revision: unsetNull.queue.revision,
      key: 'orchestration_model',
      value: ''
    });
    expect(unsetEmpty.ok).toBe(true);
    expect(unsetEmpty.queue.exec_defaults).toEqual({});
  });

  test('the retired worker_runner key is rejected (worker-phase1 §4)', () => {
    const store = createQueueStore();
    const r = store.setExecDefault(WS, {
      expected_revision: 0,
      key: 'worker_runner',
      value: 'claude'
    });
    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).exec_defaults).toEqual({});
  });

  test('setExecDefault rejects unknown keys (incl. workflow_mode) and non-enum values', () => {
    const store = createQueueStore();
    // workflow_mode is NOT a workspace-global key (spec 비-목표).
    const wfMode = store.setExecDefault(WS, {
      expected_revision: 0,
      key: 'workflow_mode',
      value: 'fast_track'
    });
    expect(wfMode.ok).toBe(false);
    expect(wfMode.conflict).toBe(false);

    const nonExecKey = store.setExecDefault(WS, {
      expected_revision: 0,
      key: 'merge_policy',
      value: 'pr_stop'
    });
    expect(nonExecKey.ok).toBe(false);

    const badValue = store.setExecDefault(WS, {
      expected_revision: 0,
      key: 'orchestration_model',
      value: 'yolo'
    });
    expect(badValue.ok).toBe(false);

    // review_model enum does not include 'sonnet'.
    const wrongEnum = store.setExecDefault(WS, {
      expected_revision: 0,
      key: 'review_model',
      value: 'sonnet'
    });
    expect(wrongEnum.ok).toBe(false);

    expect(store.snapshot(WS).exec_defaults).toEqual({});
  });

  test('exec_defaults survive a reload; invalid persisted keys/values drop in normalize', () => {
    const store = createQueueStore();
    const r = store.setExecDefault(WS, {
      expected_revision: 0,
      key: 'review_model',
      value: 'opus'
    });
    store.setExecDefault(WS, {
      expected_revision: r.queue.revision,
      key: 'orchestration_effort',
      value: 'high'
    });

    const restarted = createQueueStore();
    expect(restarted.load(WS).exec_defaults).toEqual({
      review_model: 'opus',
      orchestration_effort: 'high'
    });

    // Corrupt the persisted map: unknown key, invalid value, valid survivor.
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.exec_defaults = {
      bogus_key: 'x',
      orchestration_effort: 'ultra',
      review_model: 'opus'
    };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));
    const again = createQueueStore();
    expect(again.load(WS).exec_defaults).toEqual({ review_model: 'opus' });
  });

  test('retired/stale exec defaults drop on load (worker-phase1 §3)', () => {
    const store = createQueueStore();
    store.setExecDefault(WS, {
      expected_revision: 0,
      key: 'orchestration_effort',
      value: 'high'
    });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.exec_defaults = {
      worker_runner: 'ccx',
      orchestration_model: 'gpt-5.6',
      orchestration_effort: 'high'
    };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    // The retired key and the codex-era model both vanish; the still-valid
    // setting survives untouched.
    expect(createQueueStore().load(WS).exec_defaults).toEqual({
      orchestration_effort: 'high'
    });
  });

  test('discardAttempt writes the state AND clears the lane in ONE revision (§2.2)', () => {
    const store = createQueueStore();
    const rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'UI-1',
      lane: 'serial'
    }).queue.revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    store.recordAdmission(WS, { bead_id: 'UI-1', reason: 'git_error' });
    const before = store.snapshot(WS).revision;

    const r = store.discardAttempt(WS, {
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      patch: { status: 'stopped', cause: null, finished_at: 5 }
    });

    expect(r.ok).toBe(true);
    // Exactly ONE revision bump: a split write would leave a window where the
    // attempt is stopped but the bead is still queued (re-dispatchable).
    expect(r.queue.revision).toBe(before + 1);
    expect(r.queue.attempts['att-1'].status).toBe('stopped');
    expect(r.queue.serial).toEqual([]);
    expect(r.queue.admission['UI-1']).toBeUndefined();

    // The single write is what landed on disk, too.
    const persisted = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect(persisted.revision).toBe(before + 1);
    expect(persisted.attempts['att-1'].status).toBe('stopped');
    expect(persisted.serial).toEqual([]);
  });

  test('discardAttempt rejects an unknown attempt without touching the lane', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1', lane: 'serial' });
    const before = store.snapshot(WS).revision;

    const r = store.discardAttempt(WS, {
      attempt_id: 'nope',
      bead_id: 'UI-1',
      patch: { status: 'stopped' }
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(before);
    expect(store.snapshot(WS).serial.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('a legacy stopped attempt migrates to `stopped` and keeps its lane (§3)', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1', lane: 'serial' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.attempts = {
      'att-old': {
        attempt_id: 'att-old',
        bead_id: 'UI-1',
        status: 'failed',
        cause: 'stopped'
      },
      'att-real': {
        attempt_id: 'att-real',
        bead_id: 'UI-1',
        status: 'failed',
        cause: 'verify_failed:bd_not_resolved'
      }
    };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);
    // A user ■ is no longer a failure...
    expect(loaded.attempts['att-old'].status).toBe('stopped');
    expect(loaded.attempts['att-old'].cause).toBe(null);
    // ...but a genuine failure is untouched.
    expect(loaded.attempts['att-real'].status).toBe('failed');
    expect(loaded.attempts['att-real'].cause).toBe(
      'verify_failed:bd_not_resolved'
    );
    // Lane placement is never rewritten retroactively.
    expect(loaded.serial.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('exec_stamped_keys survive appendAttempt/updateAttempt and a reload', () => {
    const store = createQueueStore();
    let rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'UI-1',
      lane: 'serial'
    }).queue.revision;

    // Default (unset) is null.
    const bare = store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-0', bead_id: 'UI-1' }
    });
    expect(bare.ok).toBe(true);
    expect(bare.queue.attempts['att-0'].exec_stamped_keys).toBe(null);
    rev = bare.queue.revision;

    const appended = store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: {
        attempt_id: 'att-1',
        bead_id: 'UI-1',
        exec_stamped_keys: ['worker_runner', 'review_model']
      }
    });
    expect(appended.ok).toBe(true);
    expect(appended.queue.attempts['att-1'].exec_stamped_keys).toEqual([
      'worker_runner',
      'review_model'
    ]);

    // updateAttempt patch (makeAttempt shape) must carry the field, not drop it.
    const updated = store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: { exec_stamped_keys: ['impl_model'] }
    });
    expect(updated.ok).toBe(true);
    expect(updated.queue.attempts['att-1'].exec_stamped_keys).toEqual([
      'impl_model'
    ]);

    // Survives a cold reload (durable across restart for orphan revert).
    const restarted = createQueueStore();
    expect(restarted.load(WS).attempts['att-1'].exec_stamped_keys).toEqual([
      'impl_model'
    ]);
    expect(restarted.load(WS).attempts['att-0'].exec_stamped_keys).toBe(null);
  });

  test('session_id survives updateAttempt and a cold reload (spec §2)', () => {
    const store = createQueueStore();
    let rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'UI-1',
      lane: 'serial'
    }).queue.revision;

    // Default (runtime field, unfilled) is null.
    const appended = store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    expect(appended.ok).toBe(true);
    expect(appended.queue.attempts['att-1'].session_id).toBe(null);
    rev = appended.queue.revision;

    // The scheduler patches it via updateAttempt (makeAttempt shape) — the field
    // must pass the whitelist, not be dropped.
    const updated = store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: { session_id: 'a39855e0-c3ac' }
    });
    expect(updated.ok).toBe(true);
    expect(updated.queue.attempts['att-1'].session_id).toBe('a39855e0-c3ac');

    // Survives a cold reload (durable for --resume/transcript after restart).
    const restarted = createQueueStore();
    expect(restarted.load(WS).attempts['att-1'].session_id).toBe(
      'a39855e0-c3ac'
    );
  });
});
