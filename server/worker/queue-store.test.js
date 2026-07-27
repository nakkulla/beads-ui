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
      bead_id: 'UI-1'
    });
    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(1);
    expect(r.queue.queue.map((e) => e.bead_id)).toEqual(['UI-1']);

    // On-disk file exists and is valid JSON (never partial).
    const file = queueFilePath(WS);
    expect(fs.existsSync(file)).toBe(true);
    expect(fs.existsSync(`${file}.tmp`)).toBe(false);
    JSON.parse(fs.readFileSync(file, 'utf8'));

    // A brand-new store instance cold-loads the same placement from disk.
    const b = createQueueStore();
    const snap = b.snapshot(WS);
    expect(snap.revision).toBe(1);
    expect(snap.queue.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('revision mismatch is rejected as a conflict with no write', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const before = fs.readFileSync(queueFilePath(WS), 'utf8');

    // Stale client uses expected_revision 0, but current is 1.
    const r = store.place(WS, {
      expected_revision: 0,
      bead_id: 'UI-2'
    });
    expect(r.ok).toBe(false);
    expect(r.conflict).toBe(true);
    // Returned snapshot is the current (unchanged) state so the client re-syncs.
    expect(r.queue.revision).toBe(1);
    expect(r.queue.queue.map((e) => e.bead_id)).toEqual(['UI-1']);
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

  test('re-placing a queued bead moves it without duplicating it', () => {
    const store = createQueueStore();
    let rev = 0;
    for (const id of ['A', 'B']) {
      rev = store.place(WS, {
        expected_revision: rev,
        bead_id: id
      }).queue.revision;
    }

    const r = store.place(WS, {
      expected_revision: rev,
      bead_id: 'A',
      index: 2
    });

    expect(r.queue.queue.map((e) => e.bead_id)).toEqual(['B', 'A']);
  });

  test('place drops a bead out of pr_wait and done (single-lane dedupe)', () => {
    const store = createQueueStore();
    store.moveToDone(WS, { bead_id: 'UI-1' });
    const rev = store.snapshot(WS).revision;

    const r = store.place(WS, { expected_revision: rev, bead_id: 'UI-1' });

    expect(r.queue.done).toEqual([]);
    expect(r.queue.queue.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('reorder moves a bead within the queue', () => {
    const store = createQueueStore();
    let rev = 0;
    for (const id of ['A', 'B', 'C']) {
      rev = store.place(WS, {
        expected_revision: rev,
        bead_id: id
      }).queue.revision;
    }
    const r = store.reorder(WS, {
      expected_revision: rev,
      bead_id: 'C',
      to_index: 0
    });
    expect(r.ok).toBe(true);
    expect(r.queue.queue.map((e) => e.bead_id)).toEqual(['C', 'A', 'B']);
  });

  test('remove drops a bead and appendAttempt persists the container', () => {
    const store = createQueueStore();
    let rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'UI-1'
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
    expect(removed.queue.queue).toEqual([]);
  });

  test('a failed write leaves memory and disk at the prior revision (atomic)', () => {
    // First a good write via the real fs.
    const good = createQueueStore();
    good.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
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
        bead_id: 'UI-2'
      })
    ).toThrow(/disk full/);

    // Disk untouched (still revision 1, only UI-1).
    expect(fs.readFileSync(queueFilePath(WS), 'utf8')).toBe(before);
    // In-memory cache uncommitted: still revision 1.
    expect(failing.snapshot(WS).revision).toBe(1);
    expect(failing.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['UI-1']);
  });
});

describe('worker/queue-store retired policy axis (worker-phase2 §2/§9)', () => {
  test('a fresh queue carries no policy fields', () => {
    const store = createQueueStore();

    const q = store.snapshot(WS);

    expect('merge_policy' in q).toBe(false);
    expect('drift_policy' in q).toBe(false);
  });

  test('exposes no setPolicy mutator', () => {
    const store = createQueueStore();

    expect(/** @type {any} */ (store).setPolicy).toBeUndefined();
  });

  test('a legacy queue.json with policy keys loads clean with the keys dropped', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.merge_policy = 'auto_merge';
    raw.drift_policy = 'halt';
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const restarted = createQueueStore();
    const q = restarted.load(WS);

    expect('merge_policy' in q).toBe(false);
    expect('drift_policy' in q).toBe(false);
    // The rest of the legacy queue survives intact.
    expect(q.queue.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('a legacy attempt keeps its retired merge-axis fields (history is immutable)', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-old', bead_id: 'UI-1' }
    });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    Object.assign(raw.attempts['att-old'], {
      merge_policy: 'auto_merge',
      drift_policy: 'halt',
      demoted_reason: 'verify_cmd_unset',
      merge_sha: 'a'.repeat(40),
      done_kind: 'auto_merge',
      release_rejected: 'base_not_advanced',
      verify_cmd_result: { ok: false, reason: 'x', exit: 1 }
    });
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const restarted = createQueueStore();
    const att = restarted.load(WS).attempts['att-old'];

    expect(att.merge_policy).toBe('auto_merge');
    expect(att.drift_policy).toBe('halt');
    expect(att.demoted_reason).toBe('verify_cmd_unset');
    expect(att.merge_sha).toBe('a'.repeat(40));
    expect(att.done_kind).toBe('auto_merge');
    expect(att.release_rejected).toBe('base_not_advanced');
    expect(att.verify_cmd_result).toEqual({ ok: false, reason: 'x', exit: 1 });
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
      bead_id: 'UI-1'
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
    expect(r.queue.queue).toEqual([]);
    expect(r.queue.admission['UI-1']).toBeUndefined();

    // The single write is what landed on disk, too.
    const persisted = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect(persisted.revision).toBe(before + 1);
    expect(persisted.attempts['att-1'].status).toBe('stopped');
    expect(persisted.queue).toEqual([]);
  });

  test('discardAttempt rejects an unknown attempt without touching the lane', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const before = store.snapshot(WS).revision;

    const r = store.discardAttempt(WS, {
      attempt_id: 'nope',
      bead_id: 'UI-1',
      patch: { status: 'stopped' }
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(before);
    expect(store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('moveToPrWait writes the attempt patch AND the lane move in ONE revision', () => {
    const store = createQueueStore();
    const rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'UI-1'
    }).queue.revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    const before = store.snapshot(WS).revision;

    const r = store.moveToPrWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      patch: { status: 'done', finished_at: 7, done_kind: 'pr_stop' }
    });

    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(before + 1);
    expect(r.queue.attempts['att-1'].status).toBe('done');
    expect(r.queue.queue).toEqual([]);
    expect(r.queue.pr_wait.map((e) => e.bead_id)).toEqual(['UI-1']);

    const persisted = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect(persisted.revision).toBe(before + 1);
    expect(persisted.attempts['att-1'].status).toBe('done');
    expect(persisted.pr_wait.map((/** @type {any} */ e) => e.bead_id)).toEqual([
      'UI-1'
    ]);
  });

  test('moveToPrWait rejects an unknown attempt without moving the bead', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const before = store.snapshot(WS).revision;

    const r = store.moveToPrWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'nope',
      patch: { status: 'done' }
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(before);
    expect(store.snapshot(WS).pr_wait).toEqual([]);
    expect(store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('a legacy queue.json without pr_wait loads with an empty lane', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    delete raw.pr_wait;
    raw.done = [{ bead_id: 'UI-OLD', added_at: 1 }];
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.pr_wait).toEqual([]);
    // A past pr_stop completion is NOT retroactively re-filed as PR-waiting.
    expect(loaded.done.map((e) => e.bead_id)).toEqual(['UI-OLD']);
    expect(loaded.queue.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('a legacy stopped attempt migrates to `stopped` and keeps its lane (§3)', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
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
    expect(loaded.queue.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('exec_stamped_keys survive appendAttempt/updateAttempt and a reload', () => {
    const store = createQueueStore();
    let rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'UI-1'
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
      bead_id: 'UI-1'
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

describe('worker/queue-store single lane + slots (worker-phase2 §3/§9)', () => {
  test('a fresh queue carries one placeable lane and no serial/parallel lane', () => {
    const store = createQueueStore();

    const q = store.snapshot(WS);

    expect(q.queue).toEqual([]);
    expect('serial' in q).toBe(false);
    expect('parallel' in q).toBe(false);
  });

  test('defaults slots to 2 when the queue.json carries none', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    delete raw.slots;
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.slots).toBe(2);
  });

  test('merges a legacy serial+parallel queue.json into one lane, serial first', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'SEED' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    delete raw.queue;
    raw.serial = [
      { bead_id: 'S1', added_at: 1 },
      { bead_id: 'S2', added_at: 2 }
    ];
    raw.parallel = [
      { bead_id: 'P1', added_at: 3 },
      { bead_id: 'P2', added_at: 4 }
    ];
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.queue.map((e) => e.bead_id)).toEqual([
      'S1',
      'S2',
      'P1',
      'P2'
    ]);
  });

  test('dedupes a bead recorded in BOTH legacy lanes, keeping its serial position', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'SEED' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    delete raw.queue;
    raw.serial = [
      { bead_id: 'DUP', added_at: 1 },
      { bead_id: 'S2', added_at: 2 }
    ];
    raw.parallel = [
      { bead_id: 'P1', added_at: 3 },
      { bead_id: 'DUP', added_at: 4 }
    ];
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.queue.map((e) => e.bead_id)).toEqual(['DUP', 'S2', 'P1']);
  });

  test('leaves done and pr_wait untouched while merging the legacy lanes', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'SEED' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    delete raw.queue;
    raw.serial = [{ bead_id: 'S1', added_at: 1 }];
    raw.parallel = [{ bead_id: 'P1', added_at: 2 }];
    raw.pr_wait = [{ bead_id: 'W1', added_at: 3 }];
    raw.done = [{ bead_id: 'D1', added_at: 4 }];
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.pr_wait.map((e) => e.bead_id)).toEqual(['W1']);
    expect(loaded.done.map((e) => e.bead_id)).toEqual(['D1']);
    expect(loaded.queue.map((e) => e.bead_id)).toEqual(['S1', 'P1']);
  });

  test('setSlots persists a new cap under the revision CAS', () => {
    const store = createQueueStore();

    const r = store.setSlots(WS, { expected_revision: 0, slots: 5 });

    expect(r.ok).toBe(true);
    expect(r.queue.slots).toBe(5);
    expect(createQueueStore().load(WS).slots).toBe(5);
  });

  test('setSlots accepts the lower bound of 1 (the retired serial semantics)', () => {
    const store = createQueueStore();

    const r = store.setSlots(WS, { expected_revision: 0, slots: 1 });

    expect(r.ok).toBe(true);
    expect(r.queue.slots).toBe(1);
  });

  test('setSlots rejects a stale expected_revision without writing', () => {
    const store = createQueueStore();
    store.setSlots(WS, { expected_revision: 0, slots: 4 });
    const before = fs.readFileSync(queueFilePath(WS), 'utf8');

    const r = store.setSlots(WS, { expected_revision: 0, slots: 7 });

    expect(r.ok).toBe(false);
    expect(r.conflict).toBe(true);
    expect(r.queue.slots).toBe(4);
    expect(fs.readFileSync(queueFilePath(WS), 'utf8')).toBe(before);
  });

  test('setSlots rejects a value below the lower bound without writing', () => {
    const store = createQueueStore();
    store.setSlots(WS, { expected_revision: 0, slots: 3 });

    const r = store.setSlots(WS, { expected_revision: 1, slots: 0 });

    expect(r.ok).toBe(false);
    expect(r.conflict).toBe(false);
    expect(store.snapshot(WS).slots).toBe(3);
  });

  test('setSlots rejects a non-integer and a non-number without writing', () => {
    const store = createQueueStore();
    store.setSlots(WS, { expected_revision: 0, slots: 3 });

    const fractional = store.setSlots(WS, {
      expected_revision: 1,
      slots: 2.5
    });
    const textual = store.setSlots(WS, { expected_revision: 1, slots: '4' });

    expect(fractional.ok).toBe(false);
    expect(textual.ok).toBe(false);
    expect(store.snapshot(WS).slots).toBe(3);
  });

  test('falls back to the default when a stored slots value is unusable', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.slots = 0;
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.slots).toBe(2);
  });
});

describe('worker/queue-store — post-merge cleanup state (worker-phase2 §6)', () => {
  /**
   * @param {any} store
   */
  function seedPrWait(store) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'a1', bead_id: 'UI-1' }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'a1',
      patch: { status: 'done' }
    });
  }

  test('records a cleanup failure durably', () => {
    const store = createQueueStore();
    seedPrWait(store);

    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'child_sweep',
      reason: 'child_close_failed:UI-1.1'
    });

    expect(createQueueStore().load(WS).cleanup_failed['UI-1']).toMatchObject({
      step: 'child_sweep',
      reason: 'child_close_failed:UI-1.1'
    });
  });

  test('drops the cleanup failure when the bead reaches done', () => {
    const store = createQueueStore();
    seedPrWait(store);
    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'base_sync',
      reason: 'base_fetch_failed'
    });

    store.moveToDone(WS, { bead_id: 'UI-1' });

    const q = store.snapshot(WS);
    expect(q.cleanup_failed['UI-1']).toBeUndefined();
    expect(q.done.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('requeues a pr_wait bead into the waiting queue in one revision', () => {
    const store = createQueueStore();
    seedPrWait(store);
    const before = store.snapshot(WS).revision;

    const r = store.requeueFromPrWait(WS, { bead_id: 'UI-1' });

    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(before + 1);
    expect(r.queue.pr_wait).toEqual([]);
    expect(r.queue.queue.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('refuses to requeue a bead that is not in pr_wait', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });

    const r = store.requeueFromPrWait(WS, { bead_id: 'UI-1' });

    expect(r.ok).toBe(false);
  });

  test('a legacy queue.json without the key loads with an empty map', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    delete raw.cleanup_failed;
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    expect(createQueueStore().load(WS).cleanup_failed).toEqual({});
  });

  test('a new attempt is not a conflict-resolution attempt by default', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'a1', bead_id: 'UI-1' }
    });

    expect(store.snapshot(WS).attempts.a1.conflict_resolution).toBe(false);
  });
});

describe('worker/queue-store skip-reason recording', () => {
  test('records a first reason and reports it as applied', () => {
    const store = createQueueStore();
    const before = store.snapshot(WS).revision;

    const r = store.recordAdmission(WS, {
      bead_id: 'UI-1',
      reason: 'not_ready:in_progress'
    });

    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(before + 1);
    expect(r.queue.admission['UI-1'].reason).toBe('not_ready:in_progress');
  });

  test('no-ops an unchanged reason without bumping the revision', () => {
    const store = createQueueStore();
    store.recordAdmission(WS, { bead_id: 'UI-1', reason: 'not_ready:open' });
    const before = store.snapshot(WS).revision;

    const r = store.recordAdmission(WS, {
      bead_id: 'UI-1',
      reason: 'not_ready:open'
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('overwrites a different reason for the same bead', () => {
    const store = createQueueStore();
    store.recordAdmission(WS, {
      bead_id: 'UI-1',
      reason: 'not_ready:in_progress'
    });

    const r = store.recordAdmission(WS, {
      bead_id: 'UI-1',
      reason: 'bd_snapshot_failed'
    });

    expect(r.ok).toBe(true);
    expect(r.queue.admission['UI-1'].reason).toBe('bd_snapshot_failed');
  });

  test('drops a queued bead and its badge in one persist', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    store.recordAdmission(WS, { bead_id: 'UI-1', reason: 'not_ready:closed' });
    const before = store.snapshot(WS).revision;

    const r = store.dropFromQueue(WS, { bead_id: 'UI-1' });

    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(before + 1);
    expect(r.queue.queue.map((e) => e.bead_id)).toEqual([]);
    expect(r.queue.admission['UI-1']).toBeUndefined();
  });

  test('drops a leftover badge for a bead that is in no lane', () => {
    const store = createQueueStore();
    store.recordAdmission(WS, { bead_id: 'UI-1', reason: 'not_ready:closed' });

    const r = store.dropFromQueue(WS, { bead_id: 'UI-1' });

    expect(r.ok).toBe(true);
    expect(r.queue.admission['UI-1']).toBeUndefined();
  });

  test('no-ops without bumping the revision when there is nothing to drop', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const before = store.snapshot(WS).revision;

    const r = store.dropFromQueue(WS, { bead_id: 'UI-2' });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('records the same reason again after it was cleared', () => {
    const store = createQueueStore();
    store.recordAdmission(WS, { bead_id: 'UI-1', reason: 'spec_missing' });
    store.clearAdmission(WS, 'UI-1');

    const r = store.recordAdmission(WS, {
      bead_id: 'UI-1',
      reason: 'spec_missing'
    });

    expect(r.ok).toBe(true);
    expect(r.queue.admission['UI-1'].reason).toBe('spec_missing');
  });
});
