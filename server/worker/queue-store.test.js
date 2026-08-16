import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  GUARD_WARNINGS_CAP,
  GUARD_WARNING_COMMAND_MAX,
  createQueueStore,
  makeAttempt
} from './queue-store.js';
import {
  deployLogDir,
  queueFilePath,
  usageReceiptInboxDir,
  verifyLogDir,
  workspaceSlug,
  workspaceStateDir
} from './state-paths.js';
import { ensureUsageReceiptInbox } from './usage-receipts.js';

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

  test('gives deploy logs their own directory beside the verify logs (UI-l53x §1)', () => {
    const dir = workspaceStateDir(WS);

    expect(deployLogDir(WS)).toBe(path.join(dir, 'deploy-logs'));
    expect(deployLogDir(WS)).not.toBe(verifyLogDir(WS));
  });
});

describe('worker/queue-store', () => {
  test('normalizes the durable worker serial snapshot', () => {
    const serial = makeAttempt({
      attempt_id: 'serial-attempt',
      bead_id: 'UI-serial',
      worker_serial: true
    });
    const legacy = makeAttempt({
      attempt_id: 'legacy-attempt',
      bead_id: 'UI-legacy'
    });
    const malformed = makeAttempt({
      attempt_id: 'malformed-attempt',
      bead_id: 'UI-malformed',
      worker_serial: /** @type {any} */ ('true')
    });

    expect(serial.worker_serial).toBe(true);
    expect(legacy.worker_serial).toBe(false);
    expect(malformed.worker_serial).toBe(false);
  });

  /**
   * @param {string} [root_bead_id]
   */
  function storeWithCompletionIntent(root_bead_id = 'UI-root') {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: `att-${root_bead_id}`,
        bead_id: root_bead_id,
        target_base: 'main',
        base_oid: 'b'.repeat(40)
      }
    });
    store.moveToPrWait(WS, {
      bead_id: root_bead_id,
      attempt_id: `att-${root_bead_id}`,
      patch: { status: 'done', finished_at: 1 }
    });
    store.enqueueCompletionIntent(WS, {
      root_bead_id,
      source_attempt_id: `att-${root_bead_id}`,
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: root_bead_id,
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    return store;
  }

  /**
   * @param {string} op_id
   * @param {string} attempt_id
   */
  function resumeRepairOp(op_id, attempt_id) {
    return {
      op_id,
      kind: /** @type {const} */ ('resume_root'),
      failure_key: {
        stage: 'merge_gate',
        reason: 'verify_cmd_failed',
        subject_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        result_digest: 'c'.repeat(64)
      },
      attempt_id,
      repair_bead_id: null,
      status: /** @type {const} */ ('prepared')
    };
  }

  /**
   * @param {any} store
   * @param {string} [attempt_id]
   */
  function beginPausedCompletionAttempt(store, attempt_id = 'att-repair-1') {
    const op = resumeRepairOp('op-1', attempt_id);
    const result = store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op,
      attempt: {
        attempt_id,
        bead_id: 'UI-root',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        runner: 'codex',
        status: 'paused',
        completion_root_id: 'UI-root',
        completion_op_id: op.op_id,
        completion_mode: op.kind,
        completion_failure_key: op.failure_key
      }
    });
    if (!result.ok) {
      throw new Error('completion attempt setup failed');
    }
    return op;
  }

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

  test('turns both automation flags on in one revision', () => {
    const store = createQueueStore();

    const result = store.toggleAutomation(WS, {
      expected_revision: 0,
      on: true
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(1);
    expect(result.queue.auto_advance).toBe(true);
    expect(result.queue.auto_merge).toBe(true);
  });

  test('turns both automation flags off and clears ordinary merge waits', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 3,
        auto_advance: true,
        auto_merge: true,
        merge_queue: [{ bead_id: 'UI-1' }, { bead_id: 'UI-2' }]
      })
    );
    const store = createQueueStore();

    const result = store.toggleAutomation(WS, {
      expected_revision: 3,
      on: false
    });

    expect(result.queue.revision).toBe(4);
    expect(result.queue.auto_advance).toBe(false);
    expect(result.queue.auto_merge).toBe(false);
    expect(result.queue.merge_queue).toEqual([]);
  });

  test('preserves the active merge and resolution journal while turning automation off', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 7,
        auto_advance: true,
        auto_merge: true,
        merge_queue: [
          { bead_id: 'UI-active' },
          { bead_id: 'UI-waiting' },
          {
            bead_id: 'UI-resolution',
            resolution: {
              attempt_id: 'res-1',
              subject_bead_id: 'UI-subject',
              deadline_at: 100,
              state: 'waiting',
              yielded_at: null,
              settled_at: null
            }
          }
        ]
      })
    );
    const store = createQueueStore();

    const result = store.toggleAutomation(WS, {
      expected_revision: 7,
      on: false,
      keep: 'UI-active'
    });

    expect(result.queue.merge_queue.map((entry) => entry.bead_id)).toEqual([
      'UI-active',
      'UI-resolution'
    ]);
  });

  test('rejects a stale automation revision without changing state', () => {
    const store = createQueueStore();
    store.toggleAutomation(WS, { expected_revision: 0, on: true });
    const before = store.snapshot(WS);

    const result = store.toggleAutomation(WS, {
      expected_revision: 0,
      on: false,
      keep: 'UI-active'
    });

    expect(result.conflict).toBe(true);
    expect(store.snapshot(WS)).toEqual(before);
  });

  test('defaults pr_wait_holds_slot off for a legacy queue', () => {
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(queueFilePath(WS), JSON.stringify({ revision: 4 }));

    const q = createQueueStore().snapshot(WS);

    expect(q.pr_wait_holds_slot).toBe(false);
  });

  test('preserves unknown legacy queue and row fields through a mutation', () => {
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        legacy_extension: { keep: true },
        queue: [
          {
            bead_id: 'UI-legacy',
            added_at: 1,
            legacy_row_extension: 'keep'
          }
        ]
      })
    );
    const store = createQueueStore();

    store.place(WS, { expected_revision: 0, bead_id: 'UI-new' });

    const persisted = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect(persisted.legacy_extension).toEqual({ keep: true });
    expect(persisted.queue[0].legacy_row_extension).toBe('keep');
  });

  test('loads a legacy queue with no completion intents', () => {
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(queueFilePath(WS), JSON.stringify({ revision: 4 }));

    const q = createQueueStore().snapshot(WS);

    expect(q.completion_intents).toEqual({});
  });

  test('round-trips a valid completion intent', () => {
    const head_sha = 'a'.repeat(40);
    const base_sha = 'b'.repeat(40);
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        completion_intents: {
          'UI-root': {
            target_base: 'main',
            phase: 'gating',
            subject: {
              role: 'root',
              bead_id: 'UI-root',
              pr_url: 'https://github.com/o/r/pull/1',
              head_sha,
              base_sha,
              merged_sha: null
            },
            repair_sessions_used: 0,
            repair_bead_ids: [],
            subject_stack: [],
            active_op: null,
            terminal_reason: null
          }
        }
      })
    );

    const q = createQueueStore().snapshot(WS);

    expect(q.completion_intents['UI-root']).toEqual({
      target_base: 'main',
      phase: 'gating',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha,
        base_sha,
        merged_sha: null
      },
      repair_sessions_used: 0,
      repair_bead_ids: [],
      subject_stack: [],
      active_op: null,
      terminal_reason: null
    });
  });

  test('recovers one legacy root attempt as a completion anchor on cold load', () => {
    const base_sha = 'b'.repeat(40);
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        attempts: {
          'legacy-root': {
            bead_id: 'UI-root',
            target_base: 'main',
            base_oid: base_sha,
            status: 'done'
          }
        },
        completion_intents: {
          'UI-root': {
            target_base: 'main',
            phase: 'gating',
            subject: {
              role: 'root',
              bead_id: 'UI-root',
              pr_url: 'https://github.com/o/r/pull/1',
              head_sha: 'a'.repeat(40),
              base_sha,
              merged_sha: null
            },
            repair_sessions_used: 0,
            repair_bead_ids: [],
            subject_stack: [],
            active_op: null,
            terminal_reason: null
          }
        }
      })
    );

    const store = createQueueStore();
    const loaded = store.snapshot(WS);
    const result = store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op: resumeRepairOp('legacy-anchor-repair', 'legacy-anchor-child'),
      attempt: { attempt_id: 'legacy-anchor-child', bead_id: 'UI-root' }
    });

    expect(loaded.attempts['legacy-root']).toMatchObject({
      completion_root_id: 'UI-root',
      completion_op_id: null,
      worker_serial: false
    });
    expect(result.ok).toBe(true);
  });

  test('keeps ambiguous legacy root attempts unanchored on cold load', () => {
    const base_sha = 'b'.repeat(40);
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        attempts: {
          'legacy-root-a': {
            bead_id: 'UI-root',
            target_base: 'main',
            base_oid: base_sha,
            status: 'done'
          },
          'legacy-root-b': {
            bead_id: 'UI-root',
            target_base: 'main',
            base_oid: base_sha,
            status: 'done'
          }
        },
        completion_intents: {
          'UI-root': {
            target_base: 'main',
            phase: 'gating',
            subject: {
              role: 'root',
              bead_id: 'UI-root',
              pr_url: 'https://github.com/o/r/pull/1',
              head_sha: 'a'.repeat(40),
              base_sha,
              merged_sha: null
            },
            repair_sessions_used: 0,
            repair_bead_ids: [],
            subject_stack: [],
            active_op: null,
            terminal_reason: null
          }
        }
      })
    );

    const store = createQueueStore();
    const loaded = store.snapshot(WS);
    const result = store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op: resumeRepairOp('ambiguous-anchor-repair', 'ambiguous-anchor-child'),
      attempt: { attempt_id: 'ambiguous-anchor-child', bead_id: 'UI-root' }
    });

    expect(loaded.attempts['legacy-root-a'].completion_root_id).toBe(null);
    expect(loaded.attempts['legacy-root-b'].completion_root_id).toBe(null);
    expect(result.ok).toBe(false);
  });

  test('loads a malformed completion intent as needs_human without resetting budget', () => {
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        completion_intents: {
          'UI-root': {
            target_base: 'main',
            phase: 'unknown',
            subject: { role: 'root', bead_id: 'UI-root' },
            repair_sessions_used: 'bad',
            repair_bead_ids: ['UI-repair'],
            active_op: { kind: 'resume_root' },
            terminal_reason: null
          }
        }
      })
    );

    const intent =
      createQueueStore().snapshot(WS).completion_intents['UI-root'];

    expect(intent.phase).toBe('needs_human');
    expect(intent.repair_sessions_used).toBe(2);
    expect(intent.repair_bead_ids).toEqual(['UI-repair']);
    expect(intent.active_op).toBe(null);
    expect(intent.terminal_reason).toMatchObject({
      reason: 'intent_state_invalid',
      stage: 'state'
    });
  });

  test('loads a repair subject without return lineage as needs_human', () => {
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        completion_intents: {
          'UI-root': {
            target_base: 'main',
            phase: 'gating',
            subject: {
              role: 'repair',
              bead_id: 'UI-repair',
              pr_url: 'https://github.com/o/r/pull/2',
              head_sha: 'a'.repeat(40),
              base_sha: 'b'.repeat(40),
              merged_sha: null
            },
            repair_sessions_used: 1,
            repair_bead_ids: ['UI-repair'],
            active_op: null,
            terminal_reason: null
          }
        }
      })
    );

    const intent =
      createQueueStore().snapshot(WS).completion_intents['UI-root'];

    expect(intent).toMatchObject({
      phase: 'needs_human',
      repair_sessions_used: 1,
      terminal_reason: { reason: 'intent_state_invalid' }
    });
  });

  test('creates a root intent and merge queue entry in one revision', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'att-root',
        bead_id: 'UI-root',
        target_base: 'main',
        base_oid: 'b'.repeat(40)
      }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-root',
      attempt_id: 'att-root',
      patch: { status: 'done', finished_at: 1 }
    });
    const revision = store.snapshot(WS).revision;

    const result = store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.merge_queue).toEqual([
      { bead_id: 'UI-root', resolution_rounds: 0, resolution: null }
    ]);
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'gating',
      repair_sessions_used: 0,
      repair_bead_ids: [],
      active_op: null
    });
  });

  test('anchors a completion intent to the exact source attempt atomically', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'completion-source',
        bead_id: 'UI-root',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        status: 'done'
      }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-root',
      attempt_id: 'completion-source',
      patch: { status: 'done', finished_at: 1 }
    });
    const revision = store.snapshot(WS).revision;

    const result = store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'completion-source',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.attempts['completion-source']).toMatchObject({
      completion_root_id: 'UI-root',
      completion_op_id: null
    });
    expect(result.queue.completion_intents['UI-root']).not.toHaveProperty(
      'source_attempt_id'
    );
  });

  test('rejects a completion intent whose source attempt belongs to another root', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'root-source',
        bead_id: 'UI-root',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        status: 'done'
      }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-root',
      attempt_id: 'root-source',
      patch: { status: 'done', finished_at: 1 }
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'foreign-source',
        bead_id: 'UI-other',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        status: 'done'
      }
    });
    const revision = store.snapshot(WS).revision;

    const result = store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'foreign-source',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });

    expect(result.ok).toBe(false);
    expect(result.queue.revision).toBe(revision);
    expect(result.queue.completion_intents).toEqual({});
    expect(result.queue.attempts['root-source'].completion_root_id).toBe(null);
  });

  test('prerecords repair op, budget, and attempt in one revision', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'att-root',
        bead_id: 'UI-root',
        target_base: 'main',
        base_oid: 'b'.repeat(40)
      }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-root',
      attempt_id: 'att-root',
      patch: { status: 'done', finished_at: 1 }
    });
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    const revision = store.snapshot(WS).revision;

    const result = store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op: {
        op_id: 'op-1',
        kind: 'resume_root',
        failure_key: {
          stage: 'merge_gate',
          reason: 'verify_cmd_failed',
          subject_sha: 'a'.repeat(40),
          base_sha: 'b'.repeat(40),
          result_digest: 'c'.repeat(64)
        },
        attempt_id: 'att-repair-1',
        repair_bead_id: null,
        status: 'prepared'
      },
      attempt: {
        attempt_id: 'att-repair-1',
        bead_id: 'UI-root',
        resumed_from: 'att-root'
      }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'repairing',
      repair_sessions_used: 1,
      active_op: { op_id: 'op-1', attempt_id: 'att-repair-1' }
    });
    expect(result.queue.attempts['att-repair-1']).toMatchObject({
      attempt_id: 'att-repair-1',
      bead_id: 'UI-root',
      resumed_from: 'att-root'
    });
  });

  test('transfers completion ownership while appending a resumed child', () => {
    const store = storeWithCompletionIntent();
    const op = beginPausedCompletionAttempt(store);
    store.updateAttempt(WS, {
      attempt_id: 'att-repair-1',
      patch: { worker_serial: true }
    });
    const revision = store.snapshot(WS).revision;

    const result = store.appendResumedCompletionAttempt(WS, {
      expected_revision: revision,
      source_attempt_id: 'att-repair-1',
      attempt: {
        attempt_id: 'att-repair-2',
        bead_id: 'UI-root',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        runner: 'codex',
        resumed_from: 'att-repair-1',
        status: 'running'
      }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      repair_sessions_used: 1,
      active_op: { op_id: op.op_id, attempt_id: 'att-repair-2' }
    });
    expect(result.queue.attempts['att-repair-2']).toMatchObject({
      completion_root_id: 'UI-root',
      completion_op_id: op.op_id,
      completion_mode: op.kind,
      completion_failure_key: op.failure_key,
      worker_serial: true
    });
  });

  test('forces the completion root serial snapshot for a different repair bead', () => {
    const store = storeWithCompletionIntent();
    store.updateAttempt(WS, {
      attempt_id: 'att-UI-root',
      patch: { worker_serial: true }
    });
    // A later physical root record is not the completion source.
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'root-admin-attempt',
        bead_id: 'UI-root',
        worker_serial: false,
        status: 'done'
      }
    });
    const failure_key = resumeRepairOp('unused', 'unused').failure_key;
    store.prepareCompletionOp(WS, {
      root_bead_id: 'UI-root',
      phase: 'repairing',
      op: {
        op_id: 'create-child',
        kind: 'create_repair',
        failure_key,
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });
    store.recordCompletionRepairBead(WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-child',
      repair_bead_id: 'UI-repair'
    });
    const op = {
      op_id: 'dispatch-child',
      kind: /** @type {const} */ ('dispatch_repair'),
      failure_key,
      attempt_id: 'repair-attempt',
      repair_bead_id: 'UI-repair',
      status: /** @type {const} */ ('prepared')
    };

    const result = store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op,
      attempt: { attempt_id: 'repair-attempt', bead_id: 'UI-repair' }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.attempts['repair-attempt'].worker_serial).toBe(true);
  });

  test('inherits nonserial mode from the unique anchored source', () => {
    const store = storeWithCompletionIntent();
    store.updateAttempt(WS, {
      attempt_id: 'att-UI-root',
      patch: { worker_serial: false }
    });

    const result = store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op: resumeRepairOp('anchored-nonserial-op', 'anchored-nonserial-child'),
      attempt: {
        attempt_id: 'anchored-nonserial-child',
        bead_id: 'UI-root'
      }
    });

    expect(result.ok).toBe(true);
    expect(
      result.queue.attempts['anchored-nonserial-child'].worker_serial
    ).toBe(false);
  });

  test('inherits serial mode from the unique anchored source', () => {
    const store = storeWithCompletionIntent();
    store.updateAttempt(WS, {
      attempt_id: 'att-UI-root',
      patch: { worker_serial: true }
    });

    const result = store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op: resumeRepairOp('anchored-serial-op', 'anchored-serial-child'),
      attempt: {
        attempt_id: 'anchored-serial-child',
        bead_id: 'UI-root'
      }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.attempts['anchored-serial-child'].worker_serial).toBe(
      true
    );
  });

  test('fails closed when a completion source anchor is absent', () => {
    const store = storeWithCompletionIntent();
    store.updateAttempt(WS, {
      attempt_id: 'att-UI-root',
      patch: { completion_root_id: null }
    });

    const result = store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op: resumeRepairOp('missing-anchor-op', 'missing-anchor-child'),
      attempt: {
        attempt_id: 'missing-anchor-child',
        bead_id: 'UI-root'
      }
    });

    expect(result.ok).toBe(false);
    expect(result.queue.attempts['missing-anchor-child']).toBeUndefined();
    expect(result.queue.completion_intents['UI-root'].active_op).toBe(null);
  });

  test('fails closed when completion source anchors are duplicated', () => {
    const store = storeWithCompletionIntent();
    store.updateAttempt(WS, {
      attempt_id: 'att-UI-root',
      patch: {
        completion_root_id: 'UI-root',
        completion_op_id: null,
        worker_serial: false
      }
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'duplicate-anchor',
        bead_id: 'UI-root',
        completion_root_id: 'UI-root',
        completion_op_id: null,
        worker_serial: false,
        status: 'done'
      }
    });

    const result = store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op: resumeRepairOp('duplicate-anchor-op', 'duplicate-anchor-child'),
      attempt: {
        attempt_id: 'duplicate-anchor-child',
        bead_id: 'UI-root'
      }
    });

    expect(result.ok).toBe(false);
    expect(result.queue.attempts['duplicate-anchor-child']).toBeUndefined();
    expect(result.queue.completion_intents['UI-root'].active_op).toBe(null);
  });

  test('round-trips the anchored source before beginning repair', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'older-serial',
        bead_id: 'UI-root',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        worker_serial: true,
        status: 'done'
      }
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'roundtrip-source',
        bead_id: 'UI-root',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        worker_serial: false,
        status: 'done'
      }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-root',
      attempt_id: 'roundtrip-source',
      patch: { status: 'done', finished_at: 1 }
    });
    const created = store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'roundtrip-source',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    expect(created.ok).toBe(true);

    const reloaded = createQueueStore();
    expect(reloaded.snapshot(WS).attempts['roundtrip-source']).toMatchObject({
      completion_root_id: 'UI-root',
      completion_op_id: null
    });
    const result = reloaded.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op: resumeRepairOp('roundtrip-op', 'roundtrip-child'),
      attempt: {
        attempt_id: 'roundtrip-child',
        bead_id: 'UI-root'
      }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.attempts['roundtrip-child'].worker_serial).toBe(false);
  });

  test('rejects a resumed completion child with mismatched lineage', () => {
    const store = storeWithCompletionIntent();
    beginPausedCompletionAttempt(store);
    const revision = store.snapshot(WS).revision;

    const result = store.appendResumedCompletionAttempt(WS, {
      expected_revision: revision,
      source_attempt_id: 'att-repair-1',
      attempt: {
        attempt_id: 'att-repair-2',
        bead_id: 'UI-root',
        repo: '/repo',
        target_base: 'develop',
        base_oid: 'b'.repeat(40),
        runner: 'codex',
        resumed_from: 'att-repair-1',
        status: 'running'
      }
    });

    expect(result.ok).toBe(false);
    expect(result.queue.revision).toBe(revision);
    expect(result.queue.attempts['att-repair-2']).toBeUndefined();
    expect(
      result.queue.completion_intents['UI-root'].active_op?.attempt_id
    ).toBe('att-repair-1');
  });

  test('rejects a second child for one completion attempt', () => {
    const store = storeWithCompletionIntent();
    beginPausedCompletionAttempt(store);
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'legacy-child',
        bead_id: 'UI-root',
        resumed_from: 'att-repair-1'
      }
    });
    const revision = store.snapshot(WS).revision;

    const result = store.appendResumedCompletionAttempt(WS, {
      expected_revision: revision,
      source_attempt_id: 'att-repair-1',
      attempt: {
        attempt_id: 'att-repair-2',
        bead_id: 'UI-root',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        runner: 'codex',
        resumed_from: 'att-repair-1',
        status: 'running'
      }
    });

    expect(result.ok).toBe(false);
    expect(result.queue.revision).toBe(revision);
    expect(result.queue.attempts['att-repair-2']).toBeUndefined();
  });

  test('rejects a stale completion transfer revision', () => {
    const store = storeWithCompletionIntent();
    beginPausedCompletionAttempt(store);
    const revision = store.snapshot(WS).revision;

    const result = store.appendResumedCompletionAttempt(WS, {
      expected_revision: revision - 1,
      source_attempt_id: 'att-repair-1',
      attempt: {
        attempt_id: 'att-repair-2',
        bead_id: 'UI-root',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        runner: 'codex',
        resumed_from: 'att-repair-1',
        status: 'running'
      }
    });

    expect(result.ok).toBe(false);
    expect(result.conflict).toBe(true);
    expect(result.queue.revision).toBe(revision);
    expect(result.queue.attempts['att-repair-2']).toBeUndefined();
  });

  test('adopts a unique legacy completion descendant', () => {
    const store = storeWithCompletionIntent();
    const op = beginPausedCompletionAttempt(store);
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'legacy-child',
        bead_id: 'UI-root',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        runner: 'codex',
        resumed_from: 'att-repair-1',
        status: 'done'
      }
    });
    const revision = store.snapshot(WS).revision;

    const result = store.adoptLegacyCompletionAttempt(WS, {
      root_bead_id: 'UI-root'
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      repair_sessions_used: 1,
      active_op: { op_id: op.op_id, attempt_id: 'legacy-child' }
    });
    expect(result.queue.attempts['legacy-child']).toMatchObject({
      completion_root_id: 'UI-root',
      completion_op_id: op.op_id,
      completion_mode: op.kind,
      completion_failure_key: op.failure_key
    });
  });

  test('rejects a branched legacy completion lineage', () => {
    const store = storeWithCompletionIntent();
    beginPausedCompletionAttempt(store);
    for (const attempt_id of ['legacy-a', 'legacy-b']) {
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: {
          attempt_id,
          bead_id: 'UI-root',
          resumed_from: 'att-repair-1',
          status: 'done'
        }
      });
    }
    const revision = store.snapshot(WS).revision;

    const result = store.adoptLegacyCompletionAttempt(WS, {
      root_bead_id: 'UI-root'
    });

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('legacy_lineage_ambiguous');
    expect(result.queue.revision).toBe(revision);
    expect(
      result.queue.completion_intents['UI-root'].active_op?.attempt_id
    ).toBe('att-repair-1');
  });

  test('rejects a cyclic legacy completion lineage', () => {
    const store = storeWithCompletionIntent();
    beginPausedCompletionAttempt(store);
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'legacy-child',
        bead_id: 'UI-root',
        resumed_from: 'att-repair-1',
        status: 'paused'
      }
    });
    store.updateAttempt(WS, {
      attempt_id: 'att-repair-1',
      patch: { resumed_from: 'legacy-child' }
    });
    const revision = store.snapshot(WS).revision;

    const result = store.adoptLegacyCompletionAttempt(WS, {
      root_bead_id: 'UI-root'
    });

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('legacy_lineage_ambiguous');
    expect(result.queue.revision).toBe(revision);
  });

  test('rejects a third repair session after two consumed operations', () => {
    const store = storeWithCompletionIntent();
    for (const n of [1, 2]) {
      const attempt_id = `att-repair-${n}`;
      const started = store.beginRepairOp(WS, {
        root_bead_id: 'UI-root',
        op: resumeRepairOp(`op-${n}`, attempt_id),
        attempt: { attempt_id, bead_id: 'UI-root' }
      });
      expect(started.ok).toBe(true);
      const consumed = store.advanceCompletionOp(WS, {
        root_bead_id: 'UI-root',
        op_id: `op-${n}`,
        status: 'consumed',
        next_phase: 'gating',
        clear: true
      });
      expect(consumed.ok).toBe(true);
    }
    const revision = store.snapshot(WS).revision;

    const rejected = store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op: resumeRepairOp('op-3', 'att-repair-3'),
      attempt: { attempt_id: 'att-repair-3', bead_id: 'UI-root' }
    });

    expect(rejected.ok).toBe(false);
    expect(rejected.queue.revision).toBe(revision);
    expect(rejected.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'gating',
      repair_sessions_used: 2,
      active_op: null
    });
    expect(rejected.queue.attempts['att-repair-3']).toBeUndefined();
  });

  test('records repair child membership and refuses it a new root intent', () => {
    const store = storeWithCompletionIntent();
    const prepared = store.prepareCompletionOp(WS, {
      root_bead_id: 'UI-root',
      phase: 'repairing',
      op: {
        op_id: 'create-1',
        kind: 'create_repair',
        failure_key: {
          stage: 'merge_gate',
          reason: 'verify_cmd_failed',
          subject_sha: 'a'.repeat(40),
          base_sha: 'b'.repeat(40),
          result_digest: 'c'.repeat(64)
        },
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });
    expect(prepared.ok).toBe(true);

    const recorded = store.recordCompletionRepairBead(WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-1',
      repair_bead_id: 'UI-repair'
    });
    const rejected = store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-repair',
      source_attempt_id: 'missing-repair-source',
      target_base: 'main',
      external: true,
      subject: {
        role: 'root',
        bead_id: 'UI-repair',
        pr_url: 'https://github.com/o/r/pull/2',
        head_sha: 'd'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });

    expect(recorded.ok).toBe(true);
    expect(recorded.queue.completion_intents['UI-root']).toMatchObject({
      repair_bead_ids: ['UI-repair'],
      subject_stack: [{ role: 'root', bead_id: 'UI-root' }],
      active_op: { repair_bead_id: 'UI-repair', status: 'observed' }
    });
    expect(rejected.ok).toBe(false);
    expect(rejected.queue.completion_intents['UI-repair']).toBeUndefined();
  });

  test('atomically replaces an observed create op with its repair attempt', () => {
    const store = storeWithCompletionIntent();
    const failure_key = resumeRepairOp('unused', 'unused').failure_key;
    store.prepareCompletionOp(WS, {
      root_bead_id: 'UI-root',
      phase: 'repairing',
      op: {
        op_id: 'create-1',
        kind: 'create_repair',
        failure_key,
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });
    store.recordCompletionRepairBead(WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-1',
      repair_bead_id: 'UI-repair'
    });
    const revision = store.snapshot(WS).revision;

    const result = store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op: {
        op_id: 'dispatch-1',
        kind: 'dispatch_repair',
        failure_key,
        attempt_id: 'att-repair',
        repair_bead_id: 'UI-repair',
        status: 'prepared'
      },
      attempt: { attempt_id: 'att-repair', bead_id: 'UI-repair' }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'repairing',
      repair_sessions_used: 1,
      active_op: {
        op_id: 'dispatch-1',
        kind: 'dispatch_repair',
        repair_bead_id: 'UI-repair'
      }
    });
    expect(result.queue.attempts['att-repair']).toMatchObject({
      bead_id: 'UI-repair'
    });
  });

  test('switches the current subject to a recorded repair child in one revision', () => {
    const store = storeWithCompletionIntent();
    store.prepareCompletionOp(WS, {
      root_bead_id: 'UI-root',
      phase: 'repairing',
      op: {
        op_id: 'create-1',
        kind: 'create_repair',
        failure_key: {
          stage: 'merge_gate',
          reason: 'verify_cmd_failed',
          subject_sha: 'a'.repeat(40),
          base_sha: 'b'.repeat(40),
          result_digest: 'c'.repeat(64)
        },
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });
    store.recordCompletionRepairBead(WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-1',
      repair_bead_id: 'UI-repair'
    });
    store.advanceCompletionOp(WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-1',
      status: 'consumed',
      next_phase: 'repairing',
      clear: true
    });
    const revision = store.snapshot(WS).revision;

    const result = store.setCompletionSubject(WS, {
      root_bead_id: 'UI-root',
      phase: 'waiting_repair_pr',
      subject: {
        role: 'repair',
        bead_id: 'UI-repair',
        pr_url: 'https://github.com/o/r/pull/2',
        head_sha: 'd'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'waiting_repair_pr',
      subject: { role: 'repair', bead_id: 'UI-repair' }
    });
  });

  test('pauses an idle completion intent and releases its queue position', () => {
    const store = storeWithCompletionIntent();
    const revision = store.snapshot(WS).revision;

    const result = store.pauseCompletionIntent(WS, {
      root_bead_id: 'UI-root'
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.completion_intents['UI-root'].phase).toBe('paused');
    expect(result.queue.merge_queue).toEqual([]);
  });

  test.each([
    [null, 'gating'],
    ['c'.repeat(40), 'cleaning']
  ])('resumes a paused intent into %s-aware phase', (merged_sha, phase) => {
    const store = storeWithCompletionIntent();
    if (merged_sha) {
      store.setCompletionSubject(WS, {
        root_bead_id: 'UI-root',
        phase: 'cleaning',
        subject: {
          ...store.snapshot(WS).completion_intents['UI-root'].subject,
          merged_sha
        }
      });
    }
    store.pauseCompletionIntent(WS, { root_bead_id: 'UI-root' });
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const revision = store.snapshot(WS).revision;

    const result = store.resumeCompletionIntent(WS, {
      root_bead_id: 'UI-root'
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.completion_intents['UI-root'].phase).toBe(phase);
    expect(result.queue.merge_queue).toEqual([
      { bead_id: 'UI-root', resolution_rounds: 0, resolution: null }
    ]);
  });

  test('re-enables a paused intent at a fresh queue position without resetting budget', () => {
    const store = storeWithCompletionIntent();
    store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op: resumeRepairOp('op-1', 'att-repair-1'),
      attempt: { attempt_id: 'att-repair-1', bead_id: 'UI-root' }
    });
    store.advanceCompletionOp(WS, {
      root_bead_id: 'UI-root',
      op_id: 'op-1',
      status: 'consumed',
      next_phase: 'gating',
      clear: true
    });
    store.pauseCompletionIntent(WS, { root_bead_id: 'UI-root' });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-later', bead_id: 'UI-later' }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-later',
      attempt_id: 'att-later',
      patch: { status: 'done', finished_at: 2 }
    });
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-later' }]
    });
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });

    const result = store.enqueueMergeAuto(WS, {
      entries: [
        {
          bead_id: 'UI-root',
          head_sha: 'c'.repeat(40),
          completion: {
            source_attempt_id: 'att-UI-root',
            target_base: 'main',
            subject: {
              role: 'root',
              bead_id: 'UI-root',
              pr_url: 'https://github.com/o/r/pull/1',
              head_sha: 'c'.repeat(40),
              base_sha: 'd'.repeat(40),
              merged_sha: null
            }
          }
        }
      ]
    });

    expect(result.ok).toBe(true);
    expect(result.queue.merge_queue.map((entry) => entry.bead_id)).toEqual([
      'UI-later',
      'UI-root'
    ]);
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'gating',
      repair_sessions_used: 1,
      subject: {
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40)
      }
    });
  });

  test('restores the prior subject and pops its durable lineage atomically', () => {
    const store = storeWithCompletionIntent();
    const failure_key = resumeRepairOp('unused', 'unused').failure_key;
    store.prepareCompletionOp(WS, {
      root_bead_id: 'UI-root',
      phase: 'repairing',
      op: {
        op_id: 'create-1',
        kind: 'create_repair',
        failure_key,
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });
    store.recordCompletionRepairBead(WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-1',
      repair_bead_id: 'UI-repair'
    });
    store.advanceCompletionOp(WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-1',
      status: 'consumed',
      next_phase: 'gating',
      subject: {
        role: 'repair',
        bead_id: 'UI-repair',
        pr_url: 'https://github.com/o/r/pull/2',
        head_sha: 'c'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      },
      clear: true
    });

    const result = store.restoreCompletionSubject(WS, {
      root_bead_id: 'UI-root',
      phase: 'gating',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'd'.repeat(40),
        base_sha: 'e'.repeat(40),
        merged_sha: null
      }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'gating',
      subject: { role: 'root', bead_id: 'UI-root' },
      subject_stack: []
    });
  });

  test('terminalizes an intent with bounded evidence in one revision', () => {
    const store = storeWithCompletionIntent();
    const revision = store.snapshot(WS).revision;

    const result = store.terminalizeCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      terminal: {
        reason: 'ownership_undecidable',
        stage: 'base_probe',
        failure_key: null,
        evidence: 'base probe timed out',
        log_path: '/tmp/probe.log',
        at: 12
      }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'needs_human',
      terminal_reason: {
        reason: 'ownership_undecidable',
        stage: 'base_probe',
        evidence: 'base probe timed out',
        log_path: '/tmp/probe.log',
        at: 12
      }
    });
    expect(result.queue.merge_queue).toEqual([]);
  });

  test('adopts a historical timeout with its merge owner and wait atomically', () => {
    const store = storeWithCompletionIntent();
    const failure_key = {
      stage: 'merge_subject',
      reason: 'merge_ready',
      subject_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      result_digest: 'c'.repeat(64)
    };
    const op = {
      op_id: 'merge-op',
      kind: /** @type {const} */ ('merge_subject'),
      failure_key,
      attempt_id: null,
      repair_bead_id: null,
      status: /** @type {const} */ ('prepared')
    };
    store.prepareCompletionOp(WS, {
      root_bead_id: 'UI-root',
      phase: 'merging',
      op
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'legacy-resolution',
        bead_id: 'UI-root',
        status: 'running',
        conflict_resolution: true,
        started_at: 50
      }
    });
    store.terminalizeCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      terminal: {
        reason: 'resolution_timeout',
        stage: 'conflict_resolution',
        failure_key: null,
        evidence: null,
        log_path: null,
        at: 100
      }
    });
    const revision = store.snapshot(WS).revision;

    const result = store.adoptLegacyResolutionTimeout(WS, {
      root_bead_id: 'UI-root',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'd'.repeat(40),
        base_sha: 'e'.repeat(40),
        merged_sha: null
      },
      op: {
        ...op,
        op_id: 'latest-merge-op',
        failure_key: {
          ...failure_key,
          subject_sha: 'd'.repeat(40),
          base_sha: 'e'.repeat(40)
        }
      },
      resolution_attempt_id: 'legacy-resolution',
      resolution_rounds: 1,
      wait_ms: 100
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'merging',
      active_op: { op_id: 'merge-op', kind: 'merge_subject' },
      terminal_reason: null,
      subject: { head_sha: 'd'.repeat(40), base_sha: 'e'.repeat(40) }
    });
    expect(result.queue.merge_queue).toEqual([
      {
        bead_id: 'UI-root',
        resolution_rounds: 1,
        resolution: {
          attempt_id: 'legacy-resolution',
          subject_bead_id: 'UI-root',
          deadline_at: 150,
          state: 'waiting',
          yielded_at: null,
          settled_at: null
        }
      }
    ]);

    const repeated = store.adoptLegacyResolutionTimeout(WS, {
      root_bead_id: 'UI-root',
      subject: result.queue.completion_intents['UI-root'].subject,
      op,
      resolution_attempt_id: null,
      resolution_rounds: 0,
      wait_ms: 100
    });
    expect(repeated.ok).toBe(false);
    expect(repeated.queue.revision).toBe(revision + 1);
  });

  test('marks the root intent completed in the same move to done', () => {
    const store = storeWithCompletionIntent();
    const revision = store.snapshot(WS).revision;

    const result = store.moveToDone(WS, { bead_id: 'UI-root' });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.done.map((entry) => entry.bead_id)).toContain(
      'UI-root'
    );
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'completed',
      active_op: null,
      terminal_reason: null
    });
  });

  test('prunes a completed intent with its expired done row', () => {
    const store = storeWithCompletionIntent();
    store.moveToDone(WS, { bead_id: 'UI-root' });

    const result = store.pruneDoneBefore(WS, {
      before: Number.MAX_SAFE_INTEGER
    });

    expect(result.ok).toBe(true);
    expect(result.queue.done).toEqual([]);
    expect(result.queue.completion_intents['UI-root']).toBeUndefined();
  });

  test('persists pr_wait_holds_slot through a cold load', () => {
    const store = createQueueStore();

    const r = store.setPrWaitHoldsSlot(WS, {
      expected_revision: 0,
      on: true
    });

    expect(r.ok).toBe(true);
    expect(createQueueStore().snapshot(WS).pr_wait_holds_slot).toBe(true);
  });

  test('rejects a stale pr_wait_holds_slot revision without writing', () => {
    const store = createQueueStore();
    store.setPrWaitHoldsSlot(WS, { expected_revision: 0, on: true });
    const before = fs.readFileSync(queueFilePath(WS), 'utf8');

    const r = store.setPrWaitHoldsSlot(WS, {
      expected_revision: 0,
      on: false
    });

    expect(r.conflict).toBe(true);
    expect(fs.readFileSync(queueFilePath(WS), 'utf8')).toBe(before);
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

describe('worker/queue-store orchestration defaults (spec §C.5)', () => {
  test('starts a fresh queue with no orchestration default and no legacy preset fields', () => {
    const store = createQueueStore();

    const q = store.snapshot(WS);

    expect(q.orchestration_model).toBe(null);
    expect(q.orchestration_effort).toBe(null);
    expect(q.orchestration_speed).toBe(null);
    expect(Object.hasOwn(q, 'default_exec_preset_id')).toBe(false);
    expect(Object.hasOwn(q, 'exec_defaults')).toBe(false);
  });

  test('exposes no legacy preset-reference or per-key exec-default mutation', () => {
    const store = /** @type {any} */ (createQueueStore());

    expect(store.setDefaultExecPresetId).toBeUndefined();
    expect(store.setExecDefault).toBeUndefined();
    expect(store.clearLegacyExecDefaults).toBeUndefined();
  });

  test('setOrchestrationDefaults stores the three values directly under the CAS', () => {
    const store = createQueueStore();

    const r = store.setOrchestrationDefaults(WS, {
      expected_revision: 0,
      values: {
        orchestration_model: 'sonnet',
        orchestration_effort: 'high',
        orchestration_speed: 'fast'
      }
    });

    expect(r.ok).toBe(true);
    expect(r.queue.orchestration_model).toBe('sonnet');
    expect(r.queue.orchestration_effort).toBe('high');
    expect(r.queue.orchestration_speed).toBe('fast');
  });

  test('setOrchestrationDefaults clears a key given null', () => {
    const store = createQueueStore();
    const rev = store.setOrchestrationDefaults(WS, {
      expected_revision: 0,
      values: { orchestration_model: 'sonnet' }
    }).queue.revision;

    const r = store.setOrchestrationDefaults(WS, {
      expected_revision: rev,
      values: { orchestration_model: null }
    });

    expect(r.queue.orchestration_model).toBe(null);
  });

  test('setOrchestrationDefaults rejects a stale revision without writing', () => {
    const store = createQueueStore();
    store.setOrchestrationDefaults(WS, {
      expected_revision: 0,
      values: { orchestration_model: 'sonnet' }
    });

    const stale = store.setOrchestrationDefaults(WS, {
      expected_revision: 0,
      values: { orchestration_model: 'opus' }
    });

    expect(stale.ok).toBe(false);
    expect(stale.conflict).toBe(true);
    expect(store.snapshot(WS).orchestration_model).toBe('sonnet');
  });

  test('setOrchestrationDefaults rejects a non-orchestration key', () => {
    const store = createQueueStore();

    const r = store.setOrchestrationDefaults(WS, {
      expected_revision: 0,
      values: /** @type {any} */ ({ spec_review_model: 'codex' })
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).orchestration_model).toBe(null);
  });

  test('setOrchestrationDefaults rejects a value outside the catalog enum', () => {
    const store = createQueueStore();

    const r = store.setOrchestrationDefaults(WS, {
      expected_revision: 0,
      values: { orchestration_model: 'no-such-model' }
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).orchestration_model).toBe(null);
  });

  test('orchestration defaults survive a reload', () => {
    const store = createQueueStore();
    store.setOrchestrationDefaults(WS, {
      expected_revision: 0,
      values: { orchestration_model: 'sonnet', orchestration_effort: 'high' }
    });

    const restarted = createQueueStore();

    expect(restarted.load(WS).orchestration_model).toBe('sonnet');
    expect(restarted.load(WS).orchestration_effort).toBe('high');
  });

  test('drops a persisted orchestration value the current catalog rejects', () => {
    const store = createQueueStore();
    store.setOrchestrationDefaults(WS, {
      expected_revision: 0,
      values: { orchestration_model: 'sonnet' }
    });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.orchestration_model = 'gpt-5.6';
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    expect(createQueueStore().load(WS).orchestration_model).toBe(null);
  });
});

describe('worker/queue-store session-defaults migration state (spec §F)', () => {
  test('preserves legacy preset fields so a partial migration can re-converge', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.default_exec_preset_id = 'preset-1';
    raw.exec_defaults = { orchestration_model: 'sonnet' };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const reloaded = createQueueStore();
    const q = reloaded.snapshot(WS);

    expect(/** @type {any} */ (q).default_exec_preset_id).toBe('preset-1');
    expect(/** @type {any} */ (q).exec_defaults).toEqual({
      orchestration_model: 'sonnet'
    });
  });

  test('starts with no migration marker and records one under the CAS', () => {
    const store = createQueueStore();
    expect(store.snapshot(WS).session_defaults_migration).toBe(null);

    const r = store.markSessionDefaultsMigrated(WS, { expected_revision: 0 });

    expect(r.ok).toBe(true);
    expect(r.queue.session_defaults_migration).toMatchObject({ version: 1 });
  });

  test('clearLegacyExecFields removes both legacy fields after the marker', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.default_exec_preset_id = 'preset-1';
    raw.exec_defaults = { orchestration_model: 'sonnet' };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));
    const reloaded = createQueueStore();
    const rev = reloaded.snapshot(WS).revision;

    const r = reloaded.clearLegacyExecFields(WS, { expected_revision: rev });

    expect(r.ok).toBe(true);
    const persisted = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect(Object.hasOwn(persisted, 'default_exec_preset_id')).toBe(false);
    expect(Object.hasOwn(persisted, 'exec_defaults')).toBe(false);
  });
});

describe('worker/queue-store attempt discard (§2.2)', () => {
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

  test('normalizes durable process identity and pause control across reload', () => {
    const store = createQueueStore({ now: () => 100 });
    const appended = store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    expect(appended.queue.attempts['att-1']).toMatchObject({
      process_identity: null,
      control: null
    });

    store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: {
        status: 'running',
        process_identity: { pid: 4242, pgid: 4242, started_at: 1_000 }
      }
    });
    const requested = store.requestAttemptControl(WS, {
      attempt_id: 'att-1',
      kind: 'pause'
    });

    expect(requested.ok).toBe(true);
    expect(requested.queue.attempts['att-1'].control).toEqual({
      kind: 'pause',
      phase: 'requested',
      requested_at: 100,
      last_error: null
    });
    expect(createQueueStore().load(WS).attempts['att-1']).toMatchObject({
      process_identity: { pid: 4242, pgid: 4242, started_at: 1_000 },
      control: {
        kind: 'pause',
        phase: 'requested',
        requested_at: 100,
        last_error: null
      }
    });
  });

  test('advances pause control monotonically and rejects stale phases', () => {
    const store = createQueueStore({ now: () => 100 });
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1', status: 'running' }
    });
    store.requestAttemptControl(WS, {
      attempt_id: 'att-1',
      kind: 'pause'
    });

    const signaled = store.advanceAttemptControl(WS, {
      attempt_id: 'att-1',
      expected_phase: 'requested',
      next_phase: 'signaled'
    });
    const stale = store.advanceAttemptControl(WS, {
      attempt_id: 'att-1',
      expected_phase: 'requested',
      next_phase: 'terminated'
    });
    const terminated = store.advanceAttemptControl(WS, {
      attempt_id: 'att-1',
      expected_phase: 'signaled',
      next_phase: 'terminated'
    });

    expect(signaled.ok).toBe(true);
    expect(stale).toMatchObject({ ok: false, reason: 'phase_mismatch' });
    expect(terminated.ok).toBe(true);
    expect(terminated.queue.attempts['att-1'].control?.phase).toBe(
      'terminated'
    );
  });

  test('records a terminal control failure without changing attempt status', () => {
    const store = createQueueStore({ now: () => 100 });
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1', status: 'running' }
    });
    store.requestAttemptControl(WS, {
      attempt_id: 'att-1',
      kind: 'pause'
    });

    const failed = store.advanceAttemptControl(WS, {
      attempt_id: 'att-1',
      expected_phase: 'requested',
      next_phase: 'failed',
      last_error: 'identity_unknown'
    });

    expect(failed.ok).toBe(true);
    expect(failed.queue.attempts['att-1']).toMatchObject({
      status: 'running',
      control: {
        kind: 'pause',
        phase: 'failed',
        requested_at: 100,
        last_error: 'identity_unknown'
      }
    });
  });

  test('normalizes legacy queues with an empty discard operation map', () => {
    const store = createQueueStore();

    expect(store.snapshot(WS).discard_operations).toEqual({});
  });

  test('creates one active discard operation and fences its merge queue entry', () => {
    const store = createQueueStore({ now: () => 100 });
    const revision = store.enqueueMerge(WS, {
      expected_revision: 0,
      entries: [{ bead_id: 'UI-1', external: true }]
    }).queue.revision;
    /** @type {any} */
    const operation = {
      operation_id: 'discard-1',
      bead_id: 'UI-1',
      attempt_id: null,
      mode: 'undecided',
      phase: 'requested',
      process_identity: null,
      source_snapshot: { repo: '/repo', branch: 'UI-1' }
    };

    const created = store.createDiscardOperation(WS, {
      expected_revision: revision,
      operation
    });
    const reused = store.createDiscardOperation(WS, {
      expected_revision: created.queue.revision,
      operation: { ...operation, operation_id: 'discard-2' }
    });

    expect(created.ok).toBe(true);
    expect(created.queue.merge_queue).toEqual([]);
    expect(created.queue.discard_operations['discard-1']).toMatchObject({
      requested_at: 100,
      backup: null,
      last_error: null
    });
    expect(reused).toMatchObject({ ok: true, reused: true });
    expect(Object.keys(reused.queue.discard_operations)).toEqual(['discard-1']);
  });

  test('advances discard phases with CAS while source snapshot stays immutable', () => {
    const store = createQueueStore({ now: () => 100 });
    const created = store.createDiscardOperation(WS, {
      expected_revision: 0,
      operation: {
        operation_id: 'discard-1',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        process_identity: null,
        source_snapshot: { repo: '/repo', branch: 'UI-1' }
      }
    });

    const advanced = store.advanceDiscardOperation(WS, {
      operation_id: 'discard-1',
      expected_phase: 'requested',
      next_phase: 'backup_verified',
      patch: {
        mode: 'unmerged',
        source_snapshot: { repo: '/other' },
        backup: {
          path: '/state/archive',
          manifest_sha256: 'a'.repeat(64),
          verified_at: 200
        }
      }
    });
    const stale = store.advanceDiscardOperation(WS, {
      operation_id: 'discard-1',
      expected_phase: 'requested',
      next_phase: 'runner_terminated'
    });

    expect(created.ok).toBe(true);
    expect(advanced.ok).toBe(true);
    expect(advanced.queue.discard_operations['discard-1']).toMatchObject({
      phase: 'backup_verified',
      mode: 'unmerged',
      source_snapshot: { repo: '/repo', branch: 'UI-1' },
      backup: { path: '/state/archive' }
    });
    expect(stale).toMatchObject({ ok: false, reason: 'phase_mismatch' });
  });

  test('keeps a failed discard active and finalizes all lane cleanup atomically', () => {
    const store = createQueueStore({ now: () => 100 });
    let revision = store.place(WS, {
      expected_revision: 0,
      bead_id: 'UI-1'
    }).queue.revision;
    const created = store.createDiscardOperation(WS, {
      expected_revision: revision,
      operation: {
        operation_id: 'discard-1',
        bead_id: 'UI-1',
        attempt_id: null,
        process_identity: null,
        source_snapshot: { repo: '/repo' }
      }
    });
    const advanced = store.advanceDiscardOperation(WS, {
      operation_id: 'discard-1',
      expected_phase: 'requested',
      next_phase: 'backup_verified',
      patch: { mode: 'unmerged' }
    });
    const failed = store.failDiscardOperation(WS, {
      operation_id: 'discard-1',
      expected_phase: 'backup_verified',
      reason: 'archive_corrupt'
    });
    const active_before = store.activeDiscardBeadIds(WS);

    const completed = store.completeDiscardOperation(WS, {
      operation_id: 'discard-1',
      expected_phase: 'backup_verified'
    });

    expect(created.ok).toBe(true);
    expect(advanced.ok).toBe(true);
    expect(failed.queue.discard_operations['discard-1']).toMatchObject({
      phase: 'backup_verified',
      last_error: 'archive_corrupt'
    });
    expect(active_before).toEqual(new Set(['UI-1']));
    expect(store.activeDiscardBeadIds(WS)).toEqual(new Set());
    expect(completed.queue.queue).toEqual([]);
    expect(completed.queue.discard_operations['discard-1']).toMatchObject({
      phase: 'done',
      last_error: null
    });
    expect(
      createQueueStore().load(WS).discard_operations['discard-1'].phase
    ).toBe('done');
  });

  test('exec provenance survives appendAttempt/updateAttempt and a reload', () => {
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
    expect(bare.queue.attempts['att-0'].exec_default_preset_id).toBe(null);
    expect(bare.queue.attempts['att-0'].exec_default_preset_revision).toBe(
      null
    );
    expect(bare.queue.attempts['att-0'].exec_values).toBe(null);
    rev = bare.queue.revision;

    const appended = store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: {
        attempt_id: 'att-1',
        bead_id: 'UI-1',
        exec_default_preset_id: 'preset-1',
        exec_default_preset_revision: 7,
        exec_stamped_keys: ['worker_runner', 'review_model'],
        exec_values: {
          orchestration_model: 'opus',
          orchestration_speed: 'fast',
          spec_review_model: 'codex'
        },
        exec_restore_values: { orchestration_model: 'sonnet' },
        continuation_mode: 'fresh',
        continuation_action: {
          mismatch: {
            continuation_required: true,
            decision_token: { source_attempt_id: 'att-0' }
          },
          continuation: null
        },
        speed: 'fast'
      }
    });
    expect(appended.ok).toBe(true);
    expect(appended.queue.attempts['att-1'].exec_stamped_keys).toEqual([
      'worker_runner',
      'review_model'
    ]);
    expect(appended.queue.attempts['att-1']).toMatchObject({
      exec_default_preset_id: 'preset-1',
      exec_default_preset_revision: 7,
      speed: 'fast',
      continuation_mode: 'fresh',
      exec_restore_values: { orchestration_model: 'sonnet' },
      continuation_action: {
        mismatch: { continuation_required: true }
      },
      exec_values: {
        orchestration_model: 'opus',
        orchestration_speed: 'fast',
        spec_review_model: 'codex'
      }
    });

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
    expect(restarted.load(WS).attempts['att-1']).toMatchObject({
      exec_default_preset_id: 'preset-1',
      exec_default_preset_revision: 7,
      speed: 'fast',
      continuation_mode: 'fresh',
      exec_restore_values: { orchestration_model: 'sonnet' },
      continuation_action: {
        mismatch: { continuation_required: true }
      },
      exec_values: {
        orchestration_model: 'opus',
        orchestration_speed: 'fast',
        spec_review_model: 'codex'
      }
    });
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
          reasoning_output_tokens: 37,
          total_cost_usd: 0.0353
        }
      }
    });

    expect(createQueueStore().load(WS).attempts['att-1'].usage).toMatchObject({
      input_tokens: 18,
      output_tokens: 1113,
      reasoning_output_tokens: 37,
      total_cost_usd: 0.0353
    });
  });

  test('usage legs survive updateAttempt and normalize legacy attempts', () => {
    const store = createQueueStore();
    const rev = store.place(WS, { expected_revision: 0, bead_id: 'UI-legs' })
      .queue.revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-legs', bead_id: 'UI-legs' }
    });
    store.updateAttempt(WS, {
      attempt_id: 'att-legs',
      patch: {
        usage_legs: [
          {
            receipt_id: 'launch-1',
            provider: 'codex',
            role: 'implementation',
            session_id: 'thread-1',
            turn_id: 'turn-1',
            model: 'gpt-5.6-terra',
            usage: {
              input_tokens: 10,
              output_tokens: 2,
              cache_read_input_tokens: 1,
              cache_creation_input_tokens: 0,
              reasoning_output_tokens: 3
            },
            completed_at: '2026-08-11T12:34:56Z'
          }
        ]
      }
    });

    const reloaded = createQueueStore().load(WS);

    expect(reloaded.attempts['att-legs'].usage_legs).toHaveLength(1);
    expect(reloaded.attempts['att-legs'].usage_legs[0].receipt_id).toBe(
      'launch-1'
    );
    expect(
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: { attempt_id: 'legacy', bead_id: 'UI-legacy' }
      }).queue.attempts.legacy.usage_legs
    ).toEqual([]);
  });

  test('persists terminal receipt legs before consuming their files', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'receipt-attempt', bead_id: 'UI-receipt' }
    });
    const inbox = usageReceiptInboxDir(WS, 'receipt-attempt');
    ensureUsageReceiptInbox(WS, 'receipt-attempt');
    const receipt_file = path.join(inbox, 'launch-1.json');
    fs.writeFileSync(
      receipt_file,
      JSON.stringify({
        schema: 'codex-usage-receipt-v1',
        receipt_id: 'launch-1',
        attempt_id: 'receipt-attempt',
        provider: 'codex',
        role: 'implementation',
        thread_id: 'thread-1',
        turn_id: 'turn-1',
        model: 'gpt-5.6-terra',
        usage: {
          input_tokens: 1,
          output_tokens: 2,
          cache_read_input_tokens: 0,
          cache_creation_input_tokens: 0,
          reasoning_output_tokens: 0
        },
        completed_at: '2026-08-11T12:34:56Z'
      }),
      { mode: 0o600 }
    );

    const result = store.updateAttempt(WS, {
      attempt_id: 'receipt-attempt',
      patch: { status: 'done' }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.attempts['receipt-attempt'].usage_legs).toHaveLength(1);
    expect(fs.existsSync(receipt_file)).toBe(false);
  });

  test('keeps receipt files when terminal queue persistence fails', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'receipt-failure', bead_id: 'UI-receipt' }
    });
    const inbox = usageReceiptInboxDir(WS, 'receipt-failure');
    ensureUsageReceiptInbox(WS, 'receipt-failure');
    const receipt_file = path.join(inbox, 'launch-1.json');
    fs.writeFileSync(
      receipt_file,
      JSON.stringify({
        schema: 'codex-usage-receipt-v1',
        receipt_id: 'launch-1',
        attempt_id: 'receipt-failure',
        provider: 'codex',
        role: 'implementation',
        thread_id: 'thread-1',
        turn_id: 'turn-1',
        model: 'gpt-5.6-terra',
        usage: {
          input_tokens: 1,
          output_tokens: 2,
          cache_read_input_tokens: 0,
          cache_creation_input_tokens: 0,
          reasoning_output_tokens: 0
        },
        completed_at: '2026-08-11T12:34:56Z'
      }),
      { mode: 0o600 }
    );
    const failing_fs = {
      ...fs,
      renameSync() {
        throw new Error('queue persistence failed');
      }
    };
    const failing = createQueueStore({ fs: failing_fs });

    expect(() =>
      failing.updateAttempt(WS, {
        attempt_id: 'receipt-failure',
        patch: { status: 'done' }
      })
    ).toThrow('queue persistence failed');
    expect(fs.existsSync(receipt_file)).toBe(true);
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

  test('base_drift survives updateAttempt and a cold reload (UI-8mvc §3)', () => {
    const store = createQueueStore();
    const rev = store.place(WS, { expected_revision: 0, bead_id: 'UI-1' }).queue
      .revision;
    const appended = store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    expect(appended.queue.attempts['att-1'].base_drift).toBeNull();

    const record = {
      pinned: 'a'.repeat(40),
      observed: 'b'.repeat(40),
      landed: true,
      via: 'direct_push',
      shas: ['c'.repeat(40)]
    };
    const updated = store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: { base_drift: record }
    });

    expect(updated.queue.attempts['att-1'].base_drift).toEqual(record);
    expect(createQueueStore().load(WS).attempts['att-1'].base_drift).toEqual(
      record
    );
  });

  test('normalizes a non-object base_drift to null', () => {
    const store = createQueueStore();
    const rev = store.place(WS, { expected_revision: 0, bead_id: 'UI-1' }).queue
      .revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });

    const updated = store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: /** @type {any} */ ({ base_drift: 'landed' })
    });

    expect(updated.queue.attempts['att-1'].base_drift).toBeNull();
  });

  test('guard_warnings survive updateAttempt and a cold reload (UI-1xcd §1)', () => {
    const store = createQueueStore();
    const rev = store.place(WS, { expected_revision: 0, bead_id: 'UI-1' }).queue
      .revision;
    const appended = store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    expect(appended.queue.attempts['att-1'].guard_warnings).toBeNull();

    const warnings = [
      {
        reason: 'base_merge_blocked',
        command: 'git merge origin/main --no-edit',
        at: 1_700_000_000_000
      }
    ];
    const updated = store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: { guard_warnings: warnings }
    });

    expect(updated.queue.attempts['att-1'].guard_warnings).toEqual(warnings);
    expect(
      createQueueStore().load(WS).attempts['att-1'].guard_warnings
    ).toEqual(warnings);
  });

  // `queue.json` is durable and rewritten per update, so an unbounded append is
  // a file that grows for as long as a session keeps warning (implementation
  // review 2026-08-04).
  test('bounds guard_warnings at the cap, keeping the earliest', () => {
    const store = createQueueStore();
    const rev = store.place(WS, { expected_revision: 0, bead_id: 'UI-1' }).queue
      .revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    const many = Array.from({ length: GUARD_WARNINGS_CAP + 20 }, (_, i) => ({
      reason: 'base_merge_blocked',
      command: `git merge ${i}`,
      at: i
    }));

    const updated = store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: { guard_warnings: many }
    });

    const kept = updated.queue.attempts['att-1'].guard_warnings || [];
    expect(kept).toHaveLength(GUARD_WARNINGS_CAP);
    expect(kept[0].command).toBe('git merge 0');
  });

  test('truncates an over-long guard warning command', () => {
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
        guard_warnings: [
          {
            reason: 'base_merge_blocked',
            command: 'x'.repeat(GUARD_WARNING_COMMAND_MAX + 100),
            at: 1
          }
        ]
      }
    });

    expect(updated.queue.attempts['att-1'].guard_warnings?.[0].command).toBe(
      'x'.repeat(GUARD_WARNING_COMMAND_MAX)
    );
  });

  test('normalizes a non-array guard_warnings to null', () => {
    const store = createQueueStore();
    const rev = store.place(WS, { expected_revision: 0, bead_id: 'UI-1' }).queue
      .revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });

    const updated = store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: /** @type {any} */ ({ guard_warnings: 'base_merge_blocked' })
    });

    expect(updated.queue.attempts['att-1'].guard_warnings).toBeNull();
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

describe('worker/queue-store — 외부 머지 durable 승격 (UI-exua §3.2)', () => {
  test('keeps external origin on the promoted pr_wait entry', () => {
    const store = createQueueStore();

    const r = store.promoteMergedExternal(WS, {
      bead_id: 'X1',
      merge_sha: 'a'.repeat(40),
      head_ref: 'X1',
      pr_url: 'https://github.com/o/r/pull/9'
    });

    expect(r.ok).toBe(true);
    const row = store
      .snapshot(WS)
      .pr_wait.find((/** @type {any} */ e) => e.bead_id === 'X1');
    expect(row).toMatchObject({
      external: true,
      merge_sha: 'a'.repeat(40)
    });
  });

  test('keeps external origin across normalization on cold load', () => {
    const store = createQueueStore();
    store.promoteMergedExternal(WS, {
      bead_id: 'X1',
      merge_sha: 'a'.repeat(40)
    });

    const restarted = createQueueStore();

    const row = restarted
      .load(WS)
      .pr_wait.find((/** @type {any} */ e) => e.bead_id === 'X1');
    expect(row?.external).toBe(true);
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

  test('round-trips raw historical diagnosis fields across a later cleanup failure write', () => {
    const store = createQueueStore();
    seedPrWait(store);
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.attempts.a1.cleanup_diagnosis = true;
    raw.attempts.a1.cleanup_diagnosis_result_path = '/legacy-result.json';
    raw.cleanup_failed = {
      'UI-1': {
        step: 'post_merge_verify',
        reason: 'verify_cmd_failed',
        bd_restore: null,
        at: 1,
        detail: null,
        diagnosis: {
          verdict: 'regression',
          attempt_id: 'diag-1',
          consumed: true,
          evidence: 'reproduced by verify',
          fix_bead_id: 'UI-fix'
        }
      }
    };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore();
    loaded.load(WS);
    loaded.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'deploy',
      reason: 'adapter_failed'
    });

    const persisted = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect(persisted.attempts.a1).toMatchObject({
      cleanup_diagnosis: true,
      cleanup_diagnosis_result_path: '/legacy-result.json'
    });
    expect(persisted.cleanup_failed['UI-1']).toMatchObject({
      step: 'deploy',
      reason: 'adapter_failed'
    });
    expect(persisted.cleanup_failed['UI-1'].diagnosis).toEqual({
      verdict: 'regression',
      attempt_id: 'diag-1',
      consumed: true,
      evidence: 'reproduced by verify',
      fix_bead_id: 'UI-fix'
    });
  });

  test('does not expose cleanup diagnosis writer APIs', () => {
    const store = createQueueStore();

    expect(/** @type {any} */ (store).recordCleanupDiagnosis).toBeUndefined();
    expect(/** @type {any} */ (store).markDiagnosisConsumed).toBeUndefined();
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

  test('round-trips managed failure ownership and actual retry count', () => {
    const store = createQueueStore();
    seedPrWait(store);

    store.recordCleanupFailure(WS, {
      bead_id: 'UI-1',
      step: 'deploy',
      reason: 'deploy_failed',
      detail: 'install_failed',
      failure_code: 'adapter_regression',
      retryable: false,
      retry_count: 0,
      fetch_failure: 'nonzero',
      elapsed_ms: 37
    });

    expect(createQueueStore().load(WS).cleanup_failed['UI-1']).toMatchObject({
      step: 'deploy',
      reason: 'deploy_failed',
      detail: 'install_failed',
      failure_code: 'adapter_regression',
      retryable: false,
      retry_count: 0,
      fetch_failure: 'nonzero',
      elapsed_ms: 37
    });
  });

  test('preserves fetch diagnostics through RepoOperation retry copies and reload', () => {
    const store = createQueueStore();
    store.ensureRepoOperation(WS, {
      operation_id: 'deploy-fetch',
      repo_id: WS,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-1', merged_sha: 'a'.repeat(40) }],
      effective_base_sha: 'b'.repeat(40),
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'c'.repeat(40)
    });
    const attempt_id =
      store.snapshot(WS).repo_operations['deploy-fetch'].attempt_id;
    store.startRepoOperation(WS, {
      operation_id: 'deploy-fetch',
      attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: '/tmp/deploy-fetch.log',
      target_sha: 'd'.repeat(40)
    });
    store.deferRepoOperationRetry(WS, {
      operation_id: 'deploy-fetch',
      attempt_id,
      exit_code: 1,
      signal: null,
      failure: {
        code: 'repo_ops_fetch_failed',
        fingerprint: 'f'.repeat(64),
        detail: 'original script failure',
        interrupted: false,
        fetch_failure: 'timeout',
        elapsed_ms: 60_005
      }
    });

    const reloaded = createQueueStore();
    const retry = reloaded.snapshot(WS).repo_operations['deploy-fetch'].retry;

    expect(retry?.first_failure).toMatchObject({
      fetch_failure: 'timeout',
      elapsed_ms: 60_005
    });

    reloaded.consumeRepoOperationRetry(WS, {
      operation_id: 'deploy-fetch',
      attempt_id,
      consumed_key: ['script', 'blob', 'failure']
    });
    reloaded.settleConsumedRepoOperationRetry(WS, {
      operation_id: 'deploy-fetch'
    });

    expect(
      createQueueStore().snapshot(WS).repo_operations['deploy-fetch'].failure
    ).toMatchObject({
      code: 'repo_ops_fetch_failed',
      detail: 'original script failure',
      fetch_failure: 'timeout',
      elapsed_ms: 60_005
    });
  });

  test('normalizes a legacy verify head into the binding set', () => {
    const initial_head_sha = 'a'.repeat(40);
    const store = createQueueStore();
    store.ensureRepoOperation(WS, {
      operation_id: 'verify-same-tree',
      repo_id: WS,
      kind: 'verify',
      subjects: [{ bead_id: 'UI-1', merged_sha: initial_head_sha }],
      effective_base_sha: 'b'.repeat(40),
      target_base: 'main',
      target_tree: 'c'.repeat(40),
      verify_head_sha: initial_head_sha,
      script_mode: '100755',
      script_blob_sha: 'e'.repeat(40)
    });
    const operation = store.snapshot(WS).repo_operations['verify-same-tree'];
    store.startRepoOperation(WS, {
      operation_id: 'verify-same-tree',
      attempt_id: operation.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: '/tmp/verify-same-tree.log'
    });
    store.settleRepoOperation(WS, {
      operation_id: 'verify-same-tree',
      attempt_id: operation.attempt_id,
      exit_code: 0,
      signal: null
    });
    const queue_path = queueFilePath(WS);
    const legacy = JSON.parse(fs.readFileSync(queue_path, 'utf8'));
    delete legacy.repo_operations['verify-same-tree'].verify_head_shas;
    fs.writeFileSync(queue_path, JSON.stringify(legacy));

    expect(
      createQueueStore().snapshot(WS).repo_operations['verify-same-tree']
    ).toMatchObject({
      verify_head_sha: initial_head_sha,
      verify_head_shas: [initial_head_sha],
      state: 'succeeded'
    });
  });

  test('extends verify head bindings on a terminal operation', () => {
    const initial_head_sha = 'a'.repeat(40);
    const advanced_head_sha = 'd'.repeat(40);
    const store = createQueueStore();
    store.ensureRepoOperation(WS, {
      operation_id: 'verify-same-tree',
      repo_id: WS,
      kind: 'verify',
      subjects: [{ bead_id: 'UI-1', merged_sha: initial_head_sha }],
      effective_base_sha: 'b'.repeat(40),
      target_base: 'main',
      target_tree: 'c'.repeat(40),
      verify_head_sha: initial_head_sha,
      script_mode: '100755',
      script_blob_sha: 'e'.repeat(40)
    });
    const operation = store.snapshot(WS).repo_operations['verify-same-tree'];
    store.startRepoOperation(WS, {
      operation_id: 'verify-same-tree',
      attempt_id: operation.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: '/tmp/verify-same-tree.log'
    });
    store.settleRepoOperation(WS, {
      operation_id: 'verify-same-tree',
      attempt_id: operation.attempt_id,
      exit_code: 0,
      signal: null
    });

    store.ensureRepoOperation(WS, {
      operation_id: 'verify-same-tree',
      repo_id: WS,
      kind: 'verify',
      subjects: [{ bead_id: 'UI-2', merged_sha: advanced_head_sha }],
      effective_base_sha: 'b'.repeat(40),
      target_base: 'main',
      target_tree: 'c'.repeat(40),
      verify_head_sha: advanced_head_sha,
      script_mode: '100755',
      script_blob_sha: 'e'.repeat(40)
    });

    expect(
      store.snapshot(WS).repo_operations['verify-same-tree']
    ).toMatchObject({
      verify_head_sha: initial_head_sha,
      verify_head_shas: [initial_head_sha, advanced_head_sha],
      state: 'succeeded'
    });
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

  test('terminates the attempt and moves the bead in one revision (UI-b8n8)', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'a1', bead_id: 'UI-1' }
    });
    store.place(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'UI-1'
    });
    const before = store.snapshot(WS).revision;

    const r = store.moveToDone(WS, {
      bead_id: 'UI-1',
      attempt_id: 'a1',
      patch: { status: 'done', finished_at: 7 }
    });

    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(before + 1);
    expect(r.queue.attempts.a1.status).toBe('done');
    expect(r.queue.attempts.a1.finished_at).toBe(7);
    expect(r.queue.queue).toEqual([]);
    expect(r.queue.done.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('refuses the whole move when the named attempt is unknown (UI-b8n8)', () => {
    const store = createQueueStore();
    store.place(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'UI-1'
    });
    const before = store.snapshot(WS).revision;

    const r = store.moveToDone(WS, {
      bead_id: 'UI-1',
      attempt_id: 'nope',
      patch: { status: 'done' }
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(before);
    expect(store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['UI-1']);
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

  test('ignores legacy ship_failure and drops it on the next flush', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.ship_failure = {
      bead_id: 'UI-old',
      reason: 'ship_failed:legacy'
    };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const restarted = createQueueStore();
    const loaded = restarted.load(WS);
    expect(Object.hasOwn(loaded, 'ship_failure')).toBe(false);

    restarted.place(WS, {
      expected_revision: loaded.revision,
      bead_id: 'UI-2'
    });

    const persisted = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect(Object.hasOwn(persisted, 'ship_failure')).toBe(false);
  });

  test('a new attempt is not a conflict-resolution attempt by default', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'a1', bead_id: 'UI-1' }
    });

    expect(store.snapshot(WS).attempts.a1.conflict_resolution).toBe(false);
  });

  test('external_conflict defaults false and survives a cold reload (UI-w0hi §1)', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'a1', bead_id: 'UI-1' }
    });
    expect(store.snapshot(WS).attempts.a1.external_conflict).toBe(false);

    store.updateAttempt(WS, {
      attempt_id: 'a1',
      patch: { external_conflict: true, status: 'running' }
    });

    // The restart-recovery branch reads this off the reloaded record, so the
    // whitelist has to carry it through the persist.
    expect(createQueueStore().load(WS).attempts.a1.external_conflict).toBe(
      true
    );
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
      { bead_id: 'UI-1', resolution_rounds: 0, resolution: null }
    ]);
  });

  test('round-trips a required continuation and CAS-binds its decision', () => {
    const store = storeWithPrWait(['UI-1']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });
    const token = {
      source_attempt_id: 'att-UI-1',
      source_attempt_digest: 'source',
      observed_queue_revision: store.snapshot(WS).revision,
      preset_id: 'p1',
      preset_revision: 2,
      effective_exec_digest: 'exec'
    };

    store.requireMergeContinuation(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      mismatch: {
        continuation_required: true,
        prior: { runner: 'codex' },
        current: { runner: 'claude' },
        decision_token: token
      }
    });
    const reloaded = createQueueStore();
    const action = reloaded.snapshot(WS).merge_queue[0].continuation_action;
    const decided = reloaded.decideMergeContinuation(WS, {
      expected_revision: reloaded.snapshot(WS).revision,
      bead_id: 'UI-1',
      continuation: 'fresh_current',
      decision_token: /** @type {Record<string, unknown>} */ (
        action?.mismatch.decision_token
      )
    });

    expect(decided.ok).toBe(true);
    expect(
      createQueueStore().snapshot(WS).merge_queue[0].continuation_action
    ).toMatchObject({
      subject_bead_id: 'UI-1',
      continuation: 'fresh_current',
      decision_token: { observed_queue_revision: decided.queue.revision }
    });
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
      { bead_id: 'UI-1', resolution_rounds: 1, resolution: null }
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
      { bead_id: 'UI-1', resolution_rounds: 0, resolution: null }
    ]);
  });

  test('loads a legacy merge entry with explicit null resolution', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 3,
        merge_queue: [{ bead_id: 'UI-1', resolution_rounds: 1 }]
      })
    );

    const [entry] = createQueueStore().snapshot(WS).merge_queue;

    expect(entry.resolution).toBe(null);
  });

  test('round-trips a valid resolution wait through a cold load', () => {
    const resolution = {
      attempt_id: 'res-1',
      subject_bead_id: 'UI-subject',
      deadline_at: 1_800_001,
      state: 'yielded',
      yielded_at: 1_800_002,
      settled_at: null
    };
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 3,
        merge_queue: [{ bead_id: 'UI-1', resolution_rounds: 1, resolution }]
      })
    );

    const [entry] = createQueueStore().snapshot(WS).merge_queue;

    expect(entry.resolution).toEqual(resolution);
  });

  test('preserves malformed resolution as fail-closed evidence', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 3,
        merge_queue: [
          {
            bead_id: 'UI-1',
            resolution_rounds: 1,
            resolution: { state: 'waiting', attempt_id: '' }
          }
        ]
      })
    );

    const [entry] = createQueueStore().snapshot(WS).merge_queue;

    expect(entry.resolution).toEqual({
      state: 'invalid',
      reason: 'resolution_wait_invalid'
    });
  });

  test('binds exact resolution identity to the attempt absolute deadline', () => {
    const store = storeWithPrWait(['UI-1']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });
    store.bumpResolutionRound(WS, 'UI-1');
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'res-1',
        bead_id: 'UI-subject',
        status: 'running',
        conflict_resolution: true,
        started_at: 100
      }
    });

    const result = store.bindResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-subject',
      attempt_id: 'res-1',
      wait_ms: 1_800_000
    });

    expect(result.ok).toBe(true);
    expect(result.queue.merge_queue).toEqual([
      {
        bead_id: 'UI-1',
        resolution_rounds: 1,
        resolution: {
          attempt_id: 'res-1',
          subject_bead_id: 'UI-subject',
          deadline_at: 1_800_100,
          state: 'waiting',
          yielded_at: null,
          settled_at: null
        }
      }
    ]);
  });

  test('prerecords the resolver and wait binding in one revision', () => {
    const store = storeWithPrWait(['UI-root']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-root' }]
    });
    const revision = store.snapshot(WS).revision;

    const result = store.appendResolutionAttempt(WS, {
      expected_revision: revision,
      queue_bead_id: 'UI-root',
      subject_bead_id: 'UI-subject',
      wait_ms: 100,
      attempt: {
        attempt_id: 'res-atomic',
        bead_id: 'UI-subject',
        status: 'running',
        conflict_resolution: true,
        started_at: 50
      }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.attempts['res-atomic']).toMatchObject({
      bead_id: 'UI-subject',
      status: 'running'
    });
    expect(result.queue.merge_queue[0].resolution).toEqual({
      attempt_id: 'res-atomic',
      subject_bead_id: 'UI-subject',
      deadline_at: 150,
      state: 'waiting',
      yielded_at: null,
      settled_at: null
    });
  });

  test('leaves the prior journal intact when resolution binding cannot persist', () => {
    const store = storeWithPrWait(['UI-1']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'res-1',
        bead_id: 'UI-1',
        status: 'running',
        conflict_resolution: true,
        started_at: 100
      }
    });
    const before = fs.readFileSync(queueFilePath(WS), 'utf8');
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
      failing.bindResolutionWait(WS, {
        bead_id: 'UI-1',
        subject_bead_id: 'UI-1',
        attempt_id: 'res-1',
        wait_ms: 1_800_000
      })
    ).toThrow(/disk full/);

    expect(fs.readFileSync(queueFilePath(WS), 'utf8')).toBe(before);
    expect(failing.snapshot(WS).merge_queue[0].resolution).toBe(null);
  });

  test('yields behind runnable items and enrolls new work before the suffix', () => {
    const store = storeWithPrWait(['UI-1', 'UI-2', 'UI-3', 'UI-4']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }, { bead_id: 'UI-2' }, { bead_id: 'UI-3' }]
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'res-1',
        bead_id: 'UI-1',
        status: 'running',
        conflict_resolution: true,
        started_at: 100
      }
    });
    store.bindResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      wait_ms: 100
    });

    const yielded = store.yieldResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      yielded_at: 200
    });
    const enrolled = store.enqueueMerge(WS, {
      expected_revision: yielded.queue.revision,
      entries: [{ bead_id: 'UI-4' }]
    });

    expect(enrolled.queue.merge_queue.map((entry) => entry.bead_id)).toEqual([
      'UI-2',
      'UI-3',
      'UI-4',
      'UI-1'
    ]);
    expect(enrolled.queue.merge_queue[3].resolution).toMatchObject({
      state: 'yielded',
      yielded_at: 200
    });
  });

  test('promotes ready waits by settlement time after the active item', () => {
    const store = storeWithPrWait(['UI-active', 'UI-1', 'UI-2']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-active' },
        { bead_id: 'UI-1' },
        { bead_id: 'UI-2' }
      ]
    });
    for (const bead_id of ['UI-1', 'UI-2']) {
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: {
          attempt_id: `res-${bead_id}`,
          bead_id,
          status: 'running',
          conflict_resolution: true,
          started_at: 100
        }
      });
      store.bindResolutionWait(WS, {
        bead_id,
        subject_bead_id: bead_id,
        attempt_id: `res-${bead_id}`,
        wait_ms: 100
      });
      store.yieldResolutionWait(WS, {
        bead_id,
        subject_bead_id: bead_id,
        attempt_id: `res-${bead_id}`,
        yielded_at: 200
      });
    }

    store.settleResolutionWait(WS, {
      bead_id: 'UI-2',
      subject_bead_id: 'UI-2',
      attempt_id: 'res-UI-2',
      settled_at: 300,
      active_bead_id: 'UI-active'
    });
    const promoted = store.settleResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-UI-1',
      settled_at: 250,
      active_bead_id: 'UI-active'
    });
    const duplicate = store.settleResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-UI-1',
      settled_at: 250,
      active_bead_id: 'UI-active'
    });

    expect(promoted.queue.merge_queue.map((entry) => entry.bead_id)).toEqual([
      'UI-active',
      'UI-1',
      'UI-2'
    ]);
    expect(duplicate.ok).toBe(false);
    expect(duplicate.queue.revision).toBe(promoted.queue.revision);
  });

  test('consumes a ready round exactly once', () => {
    const store = storeWithPrWait(['UI-1']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'res-1',
        bead_id: 'UI-1',
        status: 'done',
        conflict_resolution: true,
        started_at: 100
      }
    });
    store.bindResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      wait_ms: 100
    });
    store.settleResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      settled_at: 150,
      active_bead_id: null
    });

    const consumed = store.consumeResolutionWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-1',
      consume_round: true
    });
    const duplicate = store.consumeResolutionWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-1',
      consume_round: true
    });

    expect(consumed.queue.merge_queue[0]).toEqual({
      bead_id: 'UI-1',
      resolution_rounds: 1,
      resolution: null
    });
    expect(duplicate.ok).toBe(false);
    expect(duplicate.queue.revision).toBe(consumed.queue.revision);
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
      { bead_id: 'UI-1', resolution_rounds: 1, resolution: null }
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

describe('worker/queue-store — 자동 머지 durable 상태 (UI-yk55 §2/§3)', () => {
  /**
   * @param {any} store
   * @param {string[]} bead_ids
   */
  function park(store, bead_ids) {
    for (const bead_id of bead_ids) {
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
  }

  test('defaults auto_merge off with no exclusions', () => {
    const store = createQueueStore();

    const q = store.snapshot(WS);

    expect(q.auto_merge).toBe(false);
    expect(q.auto_merge_skips).toEqual({});
  });

  test('loads a legacy queue.json that has neither key', () => {
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({ revision: 4, pr_wait: [{ bead_id: 'UI-1' }] })
    );

    const q = createQueueStore().snapshot(WS);

    expect(q.auto_merge).toBe(false);
    expect(q.auto_merge_skips).toEqual({});
    expect(q.pr_wait.map((/** @type {any} */ e) => e.bead_id)).toEqual([
      'UI-1'
    ]);
  });

  test('honors a persisted auto_merge across a cold load, unlike auto_advance', () => {
    const a = createQueueStore();
    a.toggleAutoMerge(WS, { expected_revision: 0, on: true });
    a.setAutoAdvance(WS, true);

    const q = createQueueStore().snapshot(WS);

    // The merge toggle survives the restart a merge itself causes; the session
    // toggle deliberately does not.
    expect(q.auto_merge).toBe(true);
    expect(q.auto_advance).toBe(false);
  });

  test('drops an exclusion record that names no head SHA', () => {
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 1,
        auto_merge_skips: {
          'UI-1': { reason: 'refused' },
          'UI-2': { head_sha: 'abc', reason: 'refused', at: 5 }
        }
      })
    );

    const q = createQueueStore().snapshot(WS);

    expect(Object.keys(q.auto_merge_skips)).toEqual(['UI-2']);
  });

  test('refuses the toggle on a stale revision', () => {
    const store = createQueueStore();

    const r = store.toggleAutoMerge(WS, { expected_revision: 99, on: true });

    expect(r.conflict).toBe(true);
    expect(store.snapshot(WS).auto_merge).toBe(false);
  });

  test('records the exclusion and dequeues in ONE revision', () => {
    const store = createQueueStore();
    park(store, ['UI-1', 'UI-2']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }, { bead_id: 'UI-2' }]
    });
    const rev = store.snapshot(WS).revision;

    const r = store.recordMergeSkip(WS, {
      bead_id: 'UI-1',
      head_sha: 'a'.repeat(40),
      reason: 'resolution_round_cap'
    });

    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(rev + 1);
    expect(r.queue.merge_queue.map((e) => e.bead_id)).toEqual(['UI-2']);
    expect(r.queue.auto_merge_skips['UI-1']).toMatchObject({
      head_sha: 'a'.repeat(40),
      reason: 'resolution_round_cap'
    });
  });

  test('leaving pr_wait drops the exclusion with the row', () => {
    const store = createQueueStore();
    park(store, ['UI-1']);
    store.recordMergeSkip(WS, {
      bead_id: 'UI-1',
      head_sha: 'a'.repeat(40),
      reason: 'refused'
    });

    store.removeFromPrWait(WS, { bead_id: 'UI-1' });

    expect(store.snapshot(WS).auto_merge_skips).toEqual({});
  });

  test('a manual [머지] clears the exclusion even when the row is already queued', () => {
    const store = createQueueStore();
    park(store, ['UI-1']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });
    store.recordMergeSkip(WS, {
      bead_id: 'UI-1',
      head_sha: 'a'.repeat(40),
      reason: 'refused'
    });
    // Back in line by hand, then excluded again while queued.
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });
    store.recordMergeSkip(WS, {
      bead_id: 'UI-1',
      head_sha: 'a'.repeat(40),
      reason: 'refused'
    });
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });

    const r = store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });

    expect(store.snapshot(WS).auto_merge_skips).toEqual({});
    expect(r.queue.merge_queue.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('turning the toggle OFF empties the waiting queue in the same write', () => {
    const store = createQueueStore();
    park(store, ['UI-1', 'UI-2']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }, { bead_id: 'UI-2' }]
    });
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const rev = store.snapshot(WS).revision;

    const r = store.toggleAutoMerge(WS, {
      expected_revision: rev,
      on: false,
      clear_waiting: true,
      keep: 'UI-1'
    });

    // Two writes would leave a restart in between with the flag off and the
    // queue full — the boot driver would merge what a stop click just cancelled.
    expect(r.queue.revision).toBe(rev + 1);
    expect(r.queue.auto_merge).toBe(false);
    expect(r.queue.merge_queue.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('auto enrolment passes over a row excluded at the SAME head', () => {
    const store = createQueueStore();
    park(store, ['UI-1']);
    store.recordMergeSkip(WS, {
      bead_id: 'UI-1',
      head_sha: 'a'.repeat(40),
      reason: 'refused'
    });

    const r = store.enqueueMergeAuto(WS, {
      entries: [{ bead_id: 'UI-1', head_sha: 'a'.repeat(40) }],
      present_ids: ['UI-1']
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('a moved head clears the exclusion and enrolls the row', () => {
    const store = createQueueStore();
    park(store, ['UI-1']);
    store.recordMergeSkip(WS, {
      bead_id: 'UI-1',
      head_sha: 'a'.repeat(40),
      reason: 'refused'
    });

    const r = store.enqueueMergeAuto(WS, {
      entries: [{ bead_id: 'UI-1', head_sha: 'b'.repeat(40) }],
      present_ids: ['UI-1']
    });

    expect(r.ok).toBe(true);
    expect(r.queue.merge_queue.map((e) => e.bead_id)).toEqual(['UI-1']);
    expect(r.queue.auto_merge_skips).toEqual({});
  });

  test('prunes exclusions whose row is no longer in the lane at all', () => {
    const store = createQueueStore();
    park(store, ['UI-1']);
    store.recordMergeSkip(WS, {
      bead_id: 'UI-1',
      head_sha: 'a'.repeat(40),
      reason: 'refused'
    });

    // An EXTERNAL row that vanished leaves no lane mutation behind, so this
    // scan is the only reclaim path (§3.2.1).
    const r = store.enqueueMergeAuto(WS, { entries: [], present_ids: [] });

    expect(r.ok).toBe(true);
    expect(r.queue.auto_merge_skips).toEqual({});
  });

  test('an auto pass with nothing to enroll or prune writes nothing', () => {
    const store = createQueueStore();
    park(store, ['UI-1']);
    const rev = store.snapshot(WS).revision;

    const r = store.enqueueMergeAuto(WS, {
      entries: [],
      present_ids: ['UI-1']
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(rev);
  });

  test('auto enrolment honours the CAS when the caller passes a revision', () => {
    const store = createQueueStore();
    park(store, ['UI-1']);

    const r = store.enqueueMergeAuto(WS, {
      expected_revision: 99,
      entries: [{ bead_id: 'UI-1', head_sha: 'a'.repeat(40) }],
      present_ids: ['UI-1']
    });

    expect(r.conflict).toBe(true);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('enrols an EXTERNAL row the durable lane cannot vouch for', () => {
    const store = createQueueStore();

    const r = store.enqueueMergeAuto(WS, {
      entries: [
        { bead_id: 'UI-9', external: true, head_sha: 'a'.repeat(40) },
        { bead_id: 'UI-8', head_sha: 'a'.repeat(40) }
      ],
      present_ids: ['UI-9']
    });

    expect(r.queue.merge_queue.map((e) => e.bead_id)).toEqual(['UI-9']);
  });

  // UI-wwby §2 — the store is the LAST gate on lane exclusivity. The incident
  // is exactly this shape: `moveToDone` empties the merge queue, a stale
  // external registry row vouches for the same bead a moment later, and the
  // done bead retakes the head it can never leave.
  test('refuses an EXTERNAL entry for a bead already in done', () => {
    const store = createQueueStore();
    park(store, ['UI-1']);
    store.moveToDone(WS, { bead_id: 'UI-1' });

    const r = store.enqueueMergeAuto(WS, {
      entries: [{ bead_id: 'UI-1', external: true, head_sha: 'a'.repeat(40) }],
      present_ids: ['UI-1']
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('refuses an EXTERNAL entry for a bead already in the waiting queue', () => {
    const store = createQueueStore();
    store.place(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'UI-1'
    });

    const r = store.enqueueMergeAuto(WS, {
      entries: [{ bead_id: 'UI-1', external: true, head_sha: 'a'.repeat(40) }],
      present_ids: ['UI-1']
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('the manual [머지] path obeys the same lane exclusivity', () => {
    const store = createQueueStore();
    park(store, ['UI-1']);
    store.moveToDone(WS, { bead_id: 'UI-1' });
    store.place(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'UI-2'
    });

    const r = store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', external: true },
        { bead_id: 'UI-2', external: true }
      ]
    });

    expect(r.ok).toBe(false);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('advances cleanup through the canonical cursor sequence', () => {
    const store = createQueueStore();
    park(store, ['UI-cursor']);

    for (const cursor of [
      'base_containment',
      'repo_operations',
      'child_sweep',
      'branch_cleanup',
      'parent_close'
    ]) {
      const result = store.setCleanupCursor(WS, {
        bead_id: 'UI-cursor',
        cursor,
        merge_sha: 'a'.repeat(40)
      });
      expect(result.ok).toBe(true);
    }

    expect(store.snapshot(WS).pr_wait[0]).toMatchObject({
      cleanup_cursor: 'parent_close',
      merge_sha: 'a'.repeat(40)
    });
  });

  test('rejects skipped and retired cleanup cursor steps', () => {
    const store = createQueueStore();
    park(store, ['UI-cursor']);

    const skipped = store.setCleanupCursor(WS, {
      bead_id: 'UI-cursor',
      cursor: 'child_sweep'
    });
    const retired = store.setCleanupCursor(WS, {
      bead_id: 'UI-cursor',
      cursor: 'post_merge_verify'
    });

    expect(skipped.ok).toBe(false);
    expect(retired.ok).toBe(false);
    expect(store.snapshot(WS).pr_wait[0].cleanup_cursor).toBeNull();
  });
});

describe('worker/queue-store — legacy migration stamp (master spec §11)', () => {
  const SUBJECT = 'a'.repeat(40);

  /**
   * @param {ReturnType<typeof createQueueStore>} store
   * @param {string[]} bead_ids
   */
  function park(store, bead_ids) {
    for (const bead_id of bead_ids) {
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
  }

  /**
   * @param {Partial<Record<string, unknown>>} [overrides]
   */
  function migrationInput(overrides = {}) {
    return {
      version: 1,
      at: 1000,
      results: {
        'UI-mig': {
          bead_id: 'UI-mig',
          from_step: 'deploy',
          from_reason: 'deploy_failed',
          subject_sha: SUBJECT,
          subject_source: 'merge_sha',
          target_base: 'main',
          disposition: 'new_deploy_operation',
          reason: null,
          evidence: null,
          at: 1000
        }
      },
      ...overrides
    };
  }

  test('defaults to an unmigrated workspace', () => {
    const store = createQueueStore();

    expect(store.snapshot(WS).repo_operation_migration).toBeNull();
  });

  test('stores the result and its schema version', () => {
    const store = createQueueStore();

    const result = store.recordRepoOperationMigration(WS, migrationInput());

    expect(result.ok).toBe(true);
    expect(store.snapshot(WS).repo_operation_migration).toMatchObject({
      version: 1,
      results: { 'UI-mig': { disposition: 'new_deploy_operation' } }
    });
  });

  test('retires the legacy failure records it converted in the same write', () => {
    const store = createQueueStore();
    park(store, ['UI-mig']);
    store.recordCleanupFailure(WS, {
      bead_id: 'UI-mig',
      step: 'deploy',
      reason: 'deploy_failed'
    });
    const before = store.snapshot(WS).revision;

    store.recordRepoOperationMigration(
      WS,
      migrationInput({ retire: ['UI-mig'] })
    );

    expect(store.snapshot(WS).cleanup_failed['UI-mig']).toBeUndefined();
    expect(store.snapshot(WS).revision).toBe(before + 1);
  });

  test('pins the canonical subject SHA on the converted row', () => {
    const store = createQueueStore();
    park(store, ['UI-mig']);

    store.recordRepoOperationMigration(
      WS,
      migrationInput({
        rows: [
          {
            bead_id: 'UI-mig',
            merge_sha: SUBJECT,
            cursor: 'base_containment'
          }
        ]
      })
    );

    expect(store.snapshot(WS).pr_wait[0]).toMatchObject({
      merge_sha: SUBJECT,
      cleanup_cursor: 'base_containment'
    });
  });

  test('keeps a row that already entered the lane on its own cursor', () => {
    const store = createQueueStore();
    park(store, ['UI-mig']);
    store.setCleanupCursor(WS, {
      bead_id: 'UI-mig',
      cursor: 'base_containment'
    });
    store.setCleanupCursor(WS, {
      bead_id: 'UI-mig',
      cursor: 'repo_operations'
    });

    store.recordRepoOperationMigration(
      WS,
      migrationInput({
        rows: [
          { bead_id: 'UI-mig', merge_sha: SUBJECT, cursor: 'base_containment' }
        ]
      })
    );

    expect(store.snapshot(WS).pr_wait[0].cleanup_cursor).toBe(
      'repo_operations'
    );
  });

  test('rejects a second stamp at the same schema version', () => {
    const store = createQueueStore();
    store.recordRepoOperationMigration(WS, migrationInput());

    const again = store.recordRepoOperationMigration(
      WS,
      migrationInput({ at: 2000, results: {} })
    );

    expect(again.ok).toBe(false);
    expect(store.snapshot(WS).repo_operation_migration).toMatchObject({
      at: 1000
    });
  });

  test('rejects a stamp without a readable result entry', () => {
    const store = createQueueStore();

    const result = store.recordRepoOperationMigration(
      WS,
      migrationInput({ results: { 'UI-mig': { from_step: 'deploy' } } })
    );

    expect(result.ok).toBe(false);
    expect(store.snapshot(WS).repo_operation_migration).toBeNull();
  });

  test('reads a damaged stored stamp as never migrated', () => {
    const file = queueFilePath(WS);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(
      file,
      JSON.stringify({ revision: 3, repo_operation_migration: { version: 0 } })
    );

    const store = createQueueStore();

    expect(store.snapshot(WS).repo_operation_migration).toBeNull();
  });

  test('survives a reload of the persisted stamp', () => {
    const first = createQueueStore();
    first.recordRepoOperationMigration(WS, migrationInput());

    const reloaded = createQueueStore();

    expect(reloaded.snapshot(WS).repo_operation_migration).toMatchObject({
      version: 1,
      results: { 'UI-mig': { subject_sha: SUBJECT } }
    });
  });
});
