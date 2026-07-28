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

  test('usage survives updateAttempt and a cold reload (UI-raqh §1)', () => {
    const store = createQueueStore();
    const rev = store.place(WS, { expected_revision: 0, bead_id: 'UI-1' }).queue
      .revision;
    const appended = store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    expect(appended.queue.attempts['att-1'].usage).toBe(null);

    store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: {
        usage: {
          input_tokens: 18,
          output_tokens: 1113,
          cache_read_input_tokens: 45784,
          cache_creation_input_tokens: 12577,
          total_cost_usd: 0.0353
        }
      }
    });

    expect(createQueueStore().load(WS).attempts['att-1'].usage).toMatchObject({
      input_tokens: 18,
      output_tokens: 1113,
      total_cost_usd: 0.0353
    });
  });

  test('cause_detail survives updateAttempt and a cold reload (UI-2o4z §2)', () => {
    const store = createQueueStore();
    const rev = store.place(WS, { expected_revision: 0, bead_id: 'UI-1' }).queue
      .revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });

    const updated = store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: {
        status: 'failed',
        cause: 'loud_fail_blocker',
        cause_detail: {
          reason: 'merge_to_base_blocked',
          command: 'gh pr merge 311'
        }
      }
    });

    expect(updated.queue.attempts['att-1'].cause_detail).toEqual({
      reason: 'merge_to_base_blocked',
      command: 'gh pr merge 311'
    });
    expect(createQueueStore().load(WS).attempts['att-1'].cause_detail).toEqual({
      reason: 'merge_to_base_blocked',
      command: 'gh pr merge 311'
    });
  });

  test('normalizes a non-object cause_detail to null', () => {
    const store = createQueueStore();
    const rev = store.place(WS, { expected_revision: 0, bead_id: 'UI-1' }).queue
      .revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });

    const updated = store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: /** @type {any} */ ({ cause_detail: 'merge_to_base_blocked' })
    });

    expect(updated.queue.attempts['att-1'].cause_detail).toBeNull();
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

  test('round-trips a cleanup failure detail across a reload', () => {
    const store = createQueueStore();
    seedPrWait(store);

    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'post_merge_verify',
      reason: 'verify_worktree_failed',
      detail: "fatal: '.worktrees/verify-UI-1-abc1234' already exists"
    });

    expect(createQueueStore().load(WS).cleanup_failed['UI-1'].detail).toBe(
      "fatal: '.worktrees/verify-UI-1-abc1234' already exists"
    );
  });

  test('stores the verify output tail on a cleanup failure (UI-qult §1)', () => {
    const store = createQueueStore();
    seedPrWait(store);

    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed',
      output_tail: 'FAIL test/x.test.js\nrg: command not found'
    });

    expect(store.snapshot(WS).cleanup_failed['UI-1'].output_tail).toBe(
      'FAIL test/x.test.js\nrg: command not found'
    );
  });

  test('ignores an empty output tail rather than storing it', () => {
    const store = createQueueStore();
    seedPrWait(store);

    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed',
      output_tail: ''
    });

    expect(
      store.snapshot(WS).cleanup_failed['UI-1'].output_tail
    ).toBeUndefined();
  });

  test('round-trips the cleanup output tail across a reload', () => {
    const store = createQueueStore();
    seedPrWait(store);

    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'post_merge_verify',
      reason: 'verify_cmd_timeout',
      output_tail: 'step 3/9 building…'
    });

    expect(createQueueStore().load(WS).cleanup_failed['UI-1'].output_tail).toBe(
      'step 3/9 building…'
    );
  });

  test('drops a non-string output tail on load', () => {
    const store = createQueueStore();
    seedPrWait(store);
    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed',
      output_tail: 'tail'
    });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.cleanup_failed['UI-1'].output_tail = 42;
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.cleanup_failed['UI-1'].output_tail).toBeUndefined();
  });

  test('stores the full verify log path on a cleanup failure (UI-0x54)', () => {
    const store = createQueueStore();
    seedPrWait(store);

    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed',
      log_path: '/state/bdui/ws-abc/verify-logs/verify-UI-1-abc1234-17.log'
    });

    expect(store.snapshot(WS).cleanup_failed['UI-1'].log_path).toBe(
      '/state/bdui/ws-abc/verify-logs/verify-UI-1-abc1234-17.log'
    );
  });

  test('overwrites the log path when the cleanup is retried', () => {
    const store = createQueueStore();
    seedPrWait(store);
    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed',
      log_path: '/logs/first.log'
    });

    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed',
      log_path: '/logs/second.log'
    });

    expect(store.snapshot(WS).cleanup_failed['UI-1'].log_path).toBe(
      '/logs/second.log'
    );
  });

  test('round-trips the cleanup log path across a reload', () => {
    const store = createQueueStore();
    seedPrWait(store);

    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed',
      log_path: '/logs/verify-UI-1-abc1234-17.log'
    });

    expect(createQueueStore().load(WS).cleanup_failed['UI-1'].log_path).toBe(
      '/logs/verify-UI-1-abc1234-17.log'
    );
  });

  test('drops a non-string log path on load', () => {
    const store = createQueueStore();
    seedPrWait(store);
    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed',
      log_path: '/logs/verify.log'
    });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.cleanup_failed['UI-1'].log_path = 42;
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.cleanup_failed['UI-1'].log_path).toBeUndefined();
  });

  test('normalizes a legacy cleanup record with no detail to null', () => {
    const store = createQueueStore();
    seedPrWait(store);
    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'child_sweep',
      reason: 'child_close_failed'
    });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    delete raw.cleanup_failed['UI-1'].detail;
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.cleanup_failed['UI-1'].detail).toBeNull();
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

  test('removes a pr_wait bead from every lane in one revision', () => {
    const store = createQueueStore();
    seedPrWait(store);
    const before = store.snapshot(WS).revision;

    const r = store.removeFromPrWait(WS, { bead_id: 'UI-1' });

    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(before + 1);
    expect(r.queue.pr_wait).toEqual([]);
    // NOT requeued: the bead is `open` again and reappears as a candidate.
    expect(r.queue.queue).toEqual([]);
    expect(r.queue.done).toEqual([]);
  });

  test('drops the stale cleanup failure record of the removed bead', () => {
    const store = createQueueStore();
    seedPrWait(store);
    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'base_sync',
      reason: 'base_fetch_failed'
    });

    const r = store.removeFromPrWait(WS, { bead_id: 'UI-1' });

    expect(r.queue.cleanup_failed['UI-1']).toBeUndefined();
  });

  test('refuses to remove a bead that is not in pr_wait', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });

    const r = store.removeFromPrWait(WS, { bead_id: 'UI-1' });

    expect(r.ok).toBe(false);
    expect(r.queue.queue.map((e) => e.bead_id)).toEqual(['UI-1']);
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

describe('worker/queue-store — last_deploy record (worker-deploy-hook §3)', () => {
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

  test('starts null on a fresh queue', () => {
    const store = createQueueStore();

    expect(store.snapshot(WS).last_deploy).toBeNull();
  });

  test('records a deploy result durably', () => {
    const store = createQueueStore();

    store.recordLastDeploy(WS, {
      outcome: 'deployed',
      reason: null,
      bead_id: 'UI-1',
      base_sha: 'base-sha-1'
    });

    expect(createQueueStore().load(WS).last_deploy).toMatchObject({
      outcome: 'deployed',
      reason: null,
      bead_id: 'UI-1',
      base_sha: 'base-sha-1'
    });
  });

  test('overwrites the previous record instead of accumulating', () => {
    const store = createQueueStore();
    store.recordLastDeploy(WS, {
      outcome: 'deployed',
      reason: null,
      bead_id: 'UI-1',
      base_sha: 'base-sha-1'
    });

    store.recordLastDeploy(WS, {
      outcome: 'failed',
      reason: 'deploy_failed',
      bead_id: 'UI-2',
      base_sha: 'base-sha-2'
    });

    expect(store.snapshot(WS).last_deploy).toMatchObject({
      outcome: 'failed',
      reason: 'deploy_failed',
      bead_id: 'UI-2'
    });
  });

  test('rejects an unknown outcome without a write', () => {
    const store = createQueueStore();
    const before = store.snapshot(WS).revision;

    const r = store.recordLastDeploy(WS, {
      outcome: /** @type {any} */ ('exploded'),
      reason: null,
      bead_id: 'UI-1',
      base_sha: 'base-sha-1'
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('moves the bead to done and records launched in ONE revision', () => {
    const store = createQueueStore();
    seedPrWait(store);
    const before = store.snapshot(WS).revision;

    const r = store.moveToDoneWithDeploy(WS, {
      bead_id: 'UI-1',
      deploy: {
        outcome: 'launched',
        reason: null,
        bead_id: 'UI-1',
        base_sha: 'base-sha-1'
      }
    });

    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(before + 1);
    expect(r.queue.done.map((e) => e.bead_id)).toEqual(['UI-1']);
    expect(r.queue.pr_wait).toEqual([]);
    expect(r.queue.last_deploy).toMatchObject({ outcome: 'launched' });
  });

  test('drops a cleanup failure in the same atomic move', () => {
    const store = createQueueStore();
    seedPrWait(store);
    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'deploy',
      reason: 'deploy_failed'
    });

    store.moveToDoneWithDeploy(WS, {
      bead_id: 'UI-1',
      deploy: {
        outcome: 'launched',
        reason: null,
        bead_id: 'UI-1',
        base_sha: 'base-sha-1'
      }
    });

    expect(store.snapshot(WS).cleanup_failed['UI-1']).toBeUndefined();
  });

  test('a legacy queue.json without the key loads with a null record', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    delete raw.last_deploy;
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    expect(createQueueStore().load(WS).last_deploy).toBeNull();
  });

  test('a malformed persisted record loads as null', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.last_deploy = { outcome: 'exploded' };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    expect(createQueueStore().load(WS).last_deploy).toBeNull();
  });
});

describe('worker/queue-store — ship_failure record (UI-4ii4)', () => {
  test('starts null on a fresh queue', () => {
    const store = createQueueStore();

    expect(store.snapshot(WS).ship_failure).toBeNull();
  });

  test('records a ship failure durably at workspace level', () => {
    const store = createQueueStore();

    store.recordShipFailure(WS, {
      bead_id: 'UI-1',
      reason: 'ship_failed:cap-a',
      detail: 'pending=cap-a',
      pr_url: 'https://example.test/pr/1'
    });

    expect(createQueueStore().load(WS).ship_failure).toMatchObject({
      bead_id: 'UI-1',
      reason: 'ship_failed:cap-a',
      detail: 'pending=cap-a',
      pr_url: 'https://example.test/pr/1'
    });
  });

  test('survives the bead leaving every lane', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'a1', bead_id: 'UI-1' }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'a1',
      patch: { status: 'done' }
    });
    store.recordShipFailure(WS, {
      bead_id: 'UI-1',
      reason: 'ship_failed:cap-a'
    });

    store.removeFromPrWait(WS, { bead_id: 'UI-1' });

    expect(store.snapshot(WS).ship_failure).toMatchObject({
      reason: 'ship_failed:cap-a'
    });
  });

  test('overwrites the previous record instead of accumulating', () => {
    const store = createQueueStore();
    store.recordShipFailure(WS, { bead_id: 'UI-1', reason: 'ship_failed:a' });

    store.recordShipFailure(WS, { bead_id: 'UI-2', reason: 'ship_failed:b' });

    expect(store.snapshot(WS).ship_failure).toMatchObject({
      bead_id: 'UI-2',
      reason: 'ship_failed:b'
    });
  });

  test('rejects a record without a reason without a write', () => {
    const store = createQueueStore();
    const before = store.snapshot(WS).revision;

    const r = store.recordShipFailure(WS, {
      bead_id: 'UI-1',
      reason: /** @type {any} */ ('')
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('clears the record and no-ops when there is none', () => {
    const store = createQueueStore();
    store.recordShipFailure(WS, { bead_id: 'UI-1', reason: 'ship_failed:a' });

    expect(store.clearShipFailure(WS).ok).toBe(true);
    expect(store.snapshot(WS).ship_failure).toBeNull();
    const after = store.snapshot(WS).revision;
    expect(store.clearShipFailure(WS).ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(after);
  });

  test('a legacy queue.json without the key loads with a null record', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    delete raw.ship_failure;
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    expect(createQueueStore().load(WS).ship_failure).toBeNull();
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

describe('worker/queue-store attempt dismissal (UI-dcw7)', () => {
  /**
   * Seed one attempt with the given status, returning the store it lives in.
   *
   * @param {string} status
   * @param {Partial<import('./queue-store.js').Attempt>} [extra]
   */
  function storeWithAttempt(status, extra = {}) {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1', status, ...extra }
    });
    return store;
  }

  test('stamps dismissed_at and bumps the revision in one persist', () => {
    let writes = 0;
    const store = createQueueStore({
      now: () => 1234,
      fs: /** @type {any} */ ({
        readFileSync: fs.readFileSync,
        mkdirSync: fs.mkdirSync,
        renameSync: fs.renameSync,
        /**
         * @param {string} file
         * @param {string} data
         */
        writeFileSync(file, data) {
          writes += 1;
          fs.writeFileSync(file, data);
        }
      })
    });
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1', status: 'failed' }
    });
    writes = 0;

    const r = store.dismissAttempt(WS, {
      attempt_id: 'att-1',
      expected_revision: 1
    });

    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(2);
    expect(r.queue.attempts['att-1'].dismissed_at).toBe(1234);
    expect(writes).toBe(1);
  });

  test('dismisses an orphaned attempt too', () => {
    const store = storeWithAttempt('orphaned');

    const r = store.dismissAttempt(WS, {
      attempt_id: 'att-1',
      expected_revision: 1
    });

    expect(r.ok).toBe(true);
    expect(typeof r.queue.attempts['att-1'].dismissed_at).toBe('number');
  });

  test('rejects a non-failed attempt with reason not_dismissable', () => {
    const store = storeWithAttempt('running');

    const r = store.dismissAttempt(WS, {
      attempt_id: 'att-1',
      expected_revision: 1
    });

    expect(r).toMatchObject({
      ok: false,
      conflict: false,
      reason: 'not_dismissable'
    });
    expect(r.queue.revision).toBe(1);
  });

  test('rejects an already-dismissed attempt without bumping the revision', () => {
    const store = storeWithAttempt('failed');
    store.dismissAttempt(WS, { attempt_id: 'att-1', expected_revision: 1 });

    const r = store.dismissAttempt(WS, {
      attempt_id: 'att-1',
      expected_revision: 2
    });

    expect(r).toMatchObject({
      ok: false,
      conflict: false,
      reason: 'already_dismissed'
    });
    expect(r.queue.revision).toBe(2);
  });

  test('rejects an unknown attempt with reason attempt_not_found', () => {
    const store = storeWithAttempt('failed');

    const r = store.dismissAttempt(WS, {
      attempt_id: 'nope',
      expected_revision: 1
    });

    expect(r).toMatchObject({
      ok: false,
      conflict: false,
      reason: 'attempt_not_found'
    });
  });

  test('rejects an inherited-property attempt_id with reason attempt_not_found', () => {
    const store = storeWithAttempt('failed');

    const r = store.dismissAttempt(WS, {
      attempt_id: 'toString',
      expected_revision: 1
    });

    expect(r).toMatchObject({
      ok: false,
      conflict: false,
      reason: 'attempt_not_found'
    });
  });

  test('rejects a stale expected_revision as a conflict carrying no reason', () => {
    const store = storeWithAttempt('failed');

    const r = store.dismissAttempt(WS, {
      attempt_id: 'att-1',
      expected_revision: 0
    });

    expect(r).toMatchObject({ ok: false, conflict: true });
    expect(r.reason).toBeUndefined();
    expect(r.queue.attempts['att-1'].dismissed_at).toBe(null);
  });

  test('round-trips dismissed_at through a cold reload', () => {
    const store = storeWithAttempt('failed');
    store.dismissAttempt(WS, { attempt_id: 'att-1', expected_revision: 1 });

    const reloaded = createQueueStore().snapshot(WS);

    expect(typeof reloaded.attempts['att-1'].dismissed_at).toBe('number');
  });

  test('defaults dismissed_at to null on a record that carries none', () => {
    const store = storeWithAttempt('failed');

    const snap = store.snapshot(WS);

    expect(snap.attempts['att-1'].dismissed_at).toBe(null);
  });
});

describe('worker/queue-store — merge queue (UI-5v7d §1)', () => {
  /**
   * @param {string[]} bead_ids
   */
  function storeWithPrWait(bead_ids) {
    const store = createQueueStore();
    for (const bead_id of bead_ids) {
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: { attempt_id: `att-${bead_id}`, bead_id }
      });
      store.moveToPrWait(WS, {
        bead_id,
        attempt_id: `att-${bead_id}`,
        patch: { status: 'done', finished_at: 1 }
      });
    }
    return store;
  }

  test('enqueues a pr_wait bead at zero consumed rounds', () => {
    const store = storeWithPrWait(['UI-1']);

    const r = store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });

    expect(r.ok).toBe(true);
    expect(r.queue.merge_queue).toEqual([
      { bead_id: 'UI-1', resolution_rounds: 0 }
    ]);
  });

  test('rejects a bead that is not in pr_wait', () => {
    const store = createQueueStore();

    const r = store.enqueueMerge(WS, {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-9' }]
    });

    expect(r).toMatchObject({ ok: false, conflict: false });
    expect(r.queue.merge_queue).toEqual([]);
  });

  test('accepts an EXTERNAL row the caller vouches for', () => {
    const store = createQueueStore();

    const r = store.enqueueMerge(WS, {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-9', external: true }]
    });

    expect(r.ok).toBe(true);
    expect(r.queue.merge_queue.map((e) => e.bead_id)).toEqual(['UI-9']);
  });

  test('duplicate queuing is a no-op, not a second place in line', () => {
    const store = storeWithPrWait(['UI-1']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });

    const r = store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });

    expect(r.ok).toBe(false);
    expect(r.queue.merge_queue.length).toBe(1);
  });

  test('add-all queues the new rows in one write and skips the queued ones', () => {
    const store = storeWithPrWait(['UI-1', 'UI-2']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });

    const r = store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }, { bead_id: 'UI-2' }]
    });

    expect(r.ok).toBe(true);
    expect(r.queue.merge_queue.map((e) => e.bead_id)).toEqual(['UI-1', 'UI-2']);
  });

  test('rejects a stale expected_revision as a conflict without queuing', () => {
    const store = storeWithPrWait(['UI-1']);

    const r = store.enqueueMerge(WS, {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-1' }]
    });

    expect(r).toMatchObject({ ok: false, conflict: true });
    expect(r.queue.merge_queue).toEqual([]);
  });

  test('cancelMerge is CAS-guarded; dequeueMerge (driver-owned) is not', () => {
    const store = storeWithPrWait(['UI-1', 'UI-2']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }, { bead_id: 'UI-2' }]
    });

    const stale = store.cancelMerge(WS, {
      expected_revision: 0,
      bead_id: 'UI-1'
    });
    const dequeued = store.dequeueMerge(WS, 'UI-1');

    expect(stale).toMatchObject({ ok: false, conflict: true });
    expect(dequeued.ok).toBe(true);
    expect(dequeued.queue.merge_queue.map((e) => e.bead_id)).toEqual(['UI-2']);
  });

  test('bumpResolutionRound counts one round and round-trips a cold reload', () => {
    const store = storeWithPrWait(['UI-1']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });

    store.bumpResolutionRound(WS, 'UI-1');

    expect(createQueueStore().snapshot(WS).merge_queue).toEqual([
      { bead_id: 'UI-1', resolution_rounds: 1 }
    ]);
  });

  test('leaving pr_wait drops the bead from the merge queue', () => {
    const store = storeWithPrWait(['UI-1']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });

    store.removeFromPrWait(WS, { bead_id: 'UI-1' });

    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('a queue.json written before the merge queue existed loads as empty', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({ revision: 3, pr_wait: [{ bead_id: 'UI-1' }] })
    );

    expect(createQueueStore().snapshot(WS).merge_queue).toEqual([]);
  });

  test('drops an unusable persisted entry and floors a bad round count', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 3,
        merge_queue: [
          { bead_id: 'UI-1', resolution_rounds: -2 },
          { resolution_rounds: 1 },
          { bead_id: 'UI-1', resolution_rounds: 5 }
        ]
      })
    );

    expect(createQueueStore().snapshot(WS).merge_queue).toEqual([
      { bead_id: 'UI-1', resolution_rounds: 0 }
    ]);
  });
});

describe('worker/queue-store — merge queue lane coupling (UI-5v7d)', () => {
  test('re-entering pr_wait keeps the queue entry and its consumed rounds', () => {
    // The scheduler's `moveToPrWait` is how a finished conflict-resolution
    // attempt lands, and the driver is waiting on exactly that item — its lane
    // dedupe must not cancel the pending re-merge.
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      patch: { status: 'done' }
    });
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });
    store.bumpResolutionRound(WS, 'UI-1');
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'res-1',
        bead_id: 'UI-1',
        conflict_resolution: true
      }
    });

    store.moveToPrWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-1',
      patch: { status: 'done' }
    });

    expect(store.snapshot(WS).merge_queue).toEqual([
      { bead_id: 'UI-1', resolution_rounds: 1 }
    ]);
  });

  test('a re-entering item keeps its position instead of jumping the queue', () => {
    const store = createQueueStore();
    for (const bead_id of ['UI-1', 'UI-2']) {
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: { attempt_id: `att-${bead_id}`, bead_id }
      });
      store.moveToPrWait(WS, {
        bead_id,
        attempt_id: `att-${bead_id}`,
        patch: { status: 'done' }
      });
    }
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }, { bead_id: 'UI-2' }]
    });

    store.moveToPrWait(WS, {
      bead_id: 'UI-2',
      attempt_id: 'att-UI-2',
      patch: { status: 'done' }
    });

    expect(store.snapshot(WS).merge_queue.map((e) => e.bead_id)).toEqual([
      'UI-1',
      'UI-2'
    ]);
  });

  test('bulk cancel drops every waiting item but the kept one, in one write', () => {
    const store = createQueueStore();
    for (const bead_id of ['UI-1', 'UI-2', 'UI-3']) {
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: { attempt_id: `att-${bead_id}`, bead_id }
      });
      store.moveToPrWait(WS, {
        bead_id,
        attempt_id: `att-${bead_id}`,
        patch: { status: 'done' }
      });
    }
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }, { bead_id: 'UI-2' }, { bead_id: 'UI-3' }]
    });
    const rev = store.snapshot(WS).revision;

    const r = store.cancelMerge(WS, {
      expected_revision: rev,
      all: true,
      keep: 'UI-1'
    });

    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(rev + 1);
    expect(r.queue.merge_queue.map((e) => e.bead_id)).toEqual(['UI-1']);
  });
});
