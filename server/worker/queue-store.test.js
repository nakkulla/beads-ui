import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { activeAttemptStates } from '../../app/utils/active-attempts.js';
import { ensureDelegationMonitorDir } from './delegation-monitor.js';
import {
  GUARD_WARNINGS_CAP,
  GUARD_WARNING_COMMAND_MAX,
  createQueueStore,
  makeAttempt,
  orderLaneByBlocks
} from './queue-store.js';
import {
  delegationMonitorDir,
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

/** The dispatch head every resolution binding in this file is taken on. */
const RESOLUTION_DISPATCH_HEAD = 'd'.repeat(40);

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
  test('normalizes legacy moot-repair fields through load save and reload', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 0,
        attempts: {
          legacy: { attempt_id: 'legacy', bead_id: 'UI-legacy' }
        }
      })
    );
    const first_store = createQueueStore();

    const legacy = first_store.snapshot(WS).attempts.legacy;
    first_store.setSlots(WS, {
      expected_revision: first_store.snapshot(WS).revision,
      slots: 3
    });
    const reloaded = createQueueStore().snapshot(WS).attempts.legacy;

    expect(legacy).toMatchObject({
      halted_auto_advance: false
    });
    expect(reloaded).toMatchObject({
      halted_auto_advance: false
    });
  });

  test('normalizes malformed and explicit moot-repair fields', () => {
    const malformed = makeAttempt({
      attempt_id: 'malformed',
      bead_id: 'UI-malformed',
      halted_auto_advance: /** @type {any} */ ('true')
    });
    const repair = makeAttempt({
      attempt_id: 'repair',
      bead_id: 'UI-repair',
      halted_auto_advance: true
    });

    expect(malformed).toMatchObject({
      halted_auto_advance: false
    });
    expect(repair).toMatchObject({
      halted_auto_advance: true
    });
  });

  test('settles moot failures and restores auto advance in one durable write', () => {
    const store = createQueueStore({ now: () => 100 });
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'repair',
        bead_id: 'UI-repair',
        status: 'failed'
      }
    });
    store.setAutoAdvance(WS, true);
    store.haltAutoAdvanceForAttempt(WS, { attempt_id: 'repair' });

    const result = store.settleMootRepairFailures(WS, {
      attempt_ids: ['repair']
    });
    const durable_before_reload = JSON.parse(
      fs.readFileSync(queueFilePath(WS), 'utf8')
    );
    const cold = createQueueStore().snapshot(WS);
    const durable_after_reload = JSON.parse(
      fs.readFileSync(queueFilePath(WS), 'utf8')
    );

    expect(result.ok).toBe(true);
    expect(result.queue.attempts.repair.dismissed_at).toBe(100);
    expect(result.queue.auto_advance).toBe(true);
    expect(durable_before_reload.attempts.repair.dismissed_at).toBe(100);
    expect(durable_before_reload.auto_advance).toBe(true);
    expect(cold.attempts.repair.dismissed_at).toBe(100);
    expect(cold.auto_advance).toBe(false);
    expect(durable_after_reload.auto_advance).toBe(true);
  });

  test('halts auto advance and marks only the responsible attempt in one write', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    store.setAutoAdvance(WS, true);

    const transitioned = store.haltAutoAdvanceForAttempt(WS, {
      attempt_id: 'att-1'
    });
    const unchanged = store.haltAutoAdvanceForAttempt(WS, {
      attempt_id: 'att-1'
    });

    expect(transitioned.queue.auto_advance).toBe(false);
    expect(transitioned.queue.attempts['att-1'].halted_auto_advance).toBe(true);
    expect(unchanged.queue.revision).toBe(transitioned.queue.revision);
  });

  test('does not mark an attempt when auto advance was already halted', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });

    const result = store.haltAutoAdvanceForAttempt(WS, {
      attempt_id: 'att-1'
    });

    expect(result.queue.auto_advance).toBe(false);
    expect(result.queue.attempts['att-1'].halted_auto_advance).toBe(false);
  });

  test('halts auto advance when the responsible attempt is missing', () => {
    const store = createQueueStore();
    store.setAutoAdvance(WS, true);

    const result = store.haltAutoAdvanceForAttempt(WS, {
      attempt_id: 'missing'
    });

    expect(result.queue.auto_advance).toBe(false);
    expect(result.queue.attempts).toEqual({});
  });

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

  test('captures persisted auto advance before restart safety resets it', () => {
    const store = createQueueStore();
    store.toggleAutoAdvance(WS, { expected_revision: 0, on: true });
    const restarted = createQueueStore();

    restarted.load(WS);

    expect(restarted.autoAdvanceAtShutdown(WS)).toBe(true);
    expect(restarted.snapshot(WS).auto_advance).toBe(false);
  });

  test('consumes the restart snapshot only after a successful auto advance toggle', () => {
    const store = createQueueStore();
    store.toggleAutoAdvance(WS, { expected_revision: 0, on: true });
    const restarted = createQueueStore();
    restarted.load(WS);

    restarted.toggleAutoAdvance(WS, {
      expected_revision: 99,
      on: true
    });
    const before_success = restarted.autoAdvanceAtShutdown(WS);
    restarted.toggleAutoAdvance(WS, {
      expected_revision: restarted.snapshot(WS).revision,
      on: true
    });

    expect(before_success).toBe(true);
    expect(restarted.autoAdvanceAtShutdown(WS)).toBe(false);
  });

  test('consumes the restart snapshot after a successful automation toggle', () => {
    const store = createQueueStore();
    store.toggleAutoAdvance(WS, { expected_revision: 0, on: true });
    const restarted = createQueueStore();
    restarted.load(WS);

    restarted.toggleAutomation(WS, {
      expected_revision: restarted.snapshot(WS).revision,
      on: false
    });

    expect(restarted.autoAdvanceAtShutdown(WS)).toBe(false);
  });

  test('preserves the restart snapshot across scheduler-owned auto advance writes', () => {
    const store = createQueueStore();
    store.toggleAutoAdvance(WS, { expected_revision: 0, on: true });
    const restarted = createQueueStore();
    restarted.load(WS);

    restarted.setAutoAdvance(WS, true);
    restarted.setAutoAdvance(WS, false);

    expect(restarted.autoAdvanceAtShutdown(WS)).toBe(true);
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
      active_op: null,
      auto_resolution: null,
      paused_resolution: null,
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
            active_op: null,
            terminal_reason: null
          }
        }
      })
    );

    const loaded = createQueueStore().snapshot(WS);

    expect(loaded.attempts['legacy-root']).toMatchObject({
      completion_root_id: 'UI-root',
      completion_op_id: null,
      worker_serial: false
    });
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
            active_op: null,
            terminal_reason: null
          }
        }
      })
    );

    const loaded = createQueueStore().snapshot(WS);

    expect(loaded.attempts['legacy-root-a'].completion_root_id).toBe(null);
    expect(loaded.attempts['legacy-root-b'].completion_root_id).toBe(null);
  });

  test('loads a malformed completion intent as needs_human', () => {
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        completion_intents: {
          'UI-root': {
            target_base: 'main',
            phase: 'unknown',
            subject: { role: 'root', bead_id: 'UI-root' },
            active_op: { kind: 'merge_subject' },
            terminal_reason: null
          }
        }
      })
    );

    const intent =
      createQueueStore().snapshot(WS).completion_intents['UI-root'];

    expect(intent.phase).toBe('needs_human');
    expect(intent.active_op).toBe(null);
    expect(intent.terminal_reason).toMatchObject({
      reason: 'intent_state_invalid',
      stage: 'state'
    });
  });

  test('loads a non-root completion subject as needs_human', () => {
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
      {
        bead_id: 'UI-root',
        resolution_rounds: 0,
        rebase_rounds: 0,
        resolution: null
      }
    ]);
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'gating',
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
      {
        bead_id: 'UI-root',
        resolution_rounds: 0,
        rebase_rounds: 0,
        resolution: null
      }
    ]);
  });

  test('re-enables a paused intent at a fresh queue position', () => {
    const store = storeWithCompletionIntent();
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
    expect(result.queue.merge_queue[1]).toMatchObject({
      resolution_rounds: 0,
      rebase_rounds: 0
    });
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'gating',
      subject: {
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40)
      }
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
        rebase_rounds: 0,
        resolution: {
          attempt_id: 'legacy-resolution',
          subject_bead_id: 'UI-root',
          deadline_at: 150,
          state: 'waiting',
          yielded_at: null,
          settled_at: null,
          dispatch_head_sha: '',
          base_ref: '',
          head_ref: ''
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

  test('preserves a base_drift artifact_pushed array through load save and reload', () => {
    const drift = {
      pinned: 'a'.repeat(40),
      observed: 'b'.repeat(40),
      landed: false,
      pushed: [],
      artifact_pushed: ['c'.repeat(40)]
    };
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-artifact', bead_id: 'UI-7ufi' }
    });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.attempts['att-artifact'].base_drift = drift;
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));
    const first_store = createQueueStore();

    first_store.setSlots(WS, {
      expected_revision: first_store.snapshot(WS).revision,
      slots: 3
    });
    const reloaded = createQueueStore().snapshot(WS).attempts['att-artifact'];

    expect(reloaded.base_drift).toEqual(drift);
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

  test('stamps the source attempt while completing discard in one persist', () => {
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
      attempt: {
        attempt_id: 'att-1',
        bead_id: 'UI-1',
        status: 'discarded'
      }
    });
    store.createDiscardOperation(WS, {
      expected_revision: store.snapshot(WS).revision,
      operation: {
        operation_id: 'discard-1',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: { repo: '/repo' }
      }
    });
    writes = 0;

    const completed = store.completeDiscardOperation(WS, {
      operation_id: 'discard-1',
      expected_phase: 'requested'
    });

    expect(completed.queue.attempts['att-1']).toMatchObject({
      status: 'discarded',
      dismissed_at: 1234
    });
    expect(completed.queue.discard_operations['discard-1'].phase).toBe('done');
    expect(writes).toBe(1);
  });

  test('preserves an existing discard-handled stamp', () => {
    const store = createQueueStore({ now: () => 1234 });
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'att-1',
        bead_id: 'UI-1',
        status: 'discarded',
        dismissed_at: 777
      }
    });
    store.createDiscardOperation(WS, {
      expected_revision: store.snapshot(WS).revision,
      operation: {
        operation_id: 'discard-1',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: { repo: '/repo' }
      }
    });

    const completed = store.completeDiscardOperation(WS, {
      operation_id: 'discard-1',
      expected_phase: 'requested'
    });

    expect(completed.queue.attempts['att-1'].dismissed_at).toBe(777);
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
            effort: 'high',
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
    expect(reloaded.attempts['att-legs'].usage_legs[0].effort).toBe('high');
    expect(
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: { attempt_id: 'legacy', bead_id: 'UI-legacy' }
      }).queue.attempts.legacy.usage_legs
    ).toEqual([]);
  });

  test('observed effort survives updateAttempt and normalizes legacy attempts', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-effort', bead_id: 'UI-effort' }
    });

    const updated = store.updateAttempt(WS, {
      attempt_id: 'att-effort',
      patch: { observed_effort: 'high' }
    });
    const reloaded = createQueueStore().load(WS);

    expect(updated.queue.attempts['att-effort'].observed_effort).toBe('high');
    expect(reloaded.attempts['att-effort'].observed_effort).toBe('high');
    expect(
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: { attempt_id: 'legacy-effort', bead_id: 'UI-legacy' }
      }).queue.attempts['legacy-effort'].observed_effort
    ).toBe(null);
  });

  test('account pins survive updateAttempt and a cold reload', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-accounts', bead_id: 'UI-accounts' }
    });

    const updated = store.updateAttempt(WS, {
      attempt_id: 'att-accounts',
      patch: {
        claude_account: 'claude@example.com',
        codex_account: 'codex-key'
      }
    });
    const reloaded = createQueueStore().load(WS);

    expect(updated.queue.attempts['att-accounts']).toMatchObject({
      claude_account: 'claude@example.com',
      codex_account: 'codex-key'
    });
    expect(reloaded.attempts['att-accounts']).toMatchObject({
      claude_account: 'claude@example.com',
      codex_account: 'codex-key'
    });
  });

  test('normalizes absent and malformed account pins to null', () => {
    const legacy = makeAttempt({
      attempt_id: 'legacy-accounts',
      bead_id: 'UI-legacy'
    });
    const malformed = makeAttempt(
      /** @type {any} */ ({
        attempt_id: 'malformed-accounts',
        bead_id: 'UI-malformed',
        claude_account: 3,
        codex_account: false
      })
    );

    expect(legacy).toMatchObject({
      claude_account: null,
      codex_account: null
    });
    expect(malformed).toMatchObject({
      claude_account: null,
      codex_account: null
    });
  });

  test('normalizes absent delegation sessions to an empty list', () => {
    const store = createQueueStore();

    const result = store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'legacy-monitor', bead_id: 'UI-legacy' }
    });

    expect(result.queue.attempts['legacy-monitor'].delegation_sessions).toEqual(
      []
    );
  });

  test('normalizes garbage delegation sessions to an empty list on cold reload', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 0,
        attempts: {
          garbage: {
            attempt_id: 'garbage',
            bead_id: 'UI-garbage',
            delegation_sessions: { launch_id: 'not-an-array' }
          }
        }
      })
    );

    const result = createQueueStore().load(WS);

    expect(result.attempts.garbage.delegation_sessions).toEqual([]);
  });

  test('deduplicates and persists delegation sessions across a cold reload', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'monitor-attempt', bead_id: 'UI-monitor' }
    });
    /** @type {import('./queue-store.js').DelegationSession} */
    const first = {
      launch_id: 'launch-1',
      provider: 'codex',
      role: 'implementation',
      model: 'gpt-5.6-sol',
      effort: null,
      session_id: 'thread-1',
      turn_id: 'turn-1',
      status: 'done',
      started_at: 1,
      completed_at: '2026-08-18T04:27:02.000Z',
      last_event_at: 2
    };

    store.updateAttempt(WS, {
      attempt_id: 'monitor-attempt',
      patch: {
        delegation_sessions: [
          first,
          { ...first, role: 'review-consult', model: 'conflict' }
        ]
      }
    });
    const result = createQueueStore().load(WS);

    expect(result.attempts['monitor-attempt'].delegation_sessions).toEqual([
      first
    ]);
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

  test('persists finalized delegation sessions without consuming monitor files', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'monitor-terminal', bead_id: 'UI-monitor' }
    });
    ensureDelegationMonitorDir(WS, 'monitor-terminal');
    const monitor_file = path.join(
      delegationMonitorDir(WS, 'monitor-terminal'),
      'launch-1.jsonl'
    );
    fs.writeFileSync(
      monitor_file,
      `${JSON.stringify({
        schema: 'codex-delegation-monitor-v1',
        attempt_id: 'monitor-terminal',
        launch_id: 'launch-1',
        provider: 'codex',
        role: 'implementation',
        model: 'gpt-5.6-sol',
        thread_id: 'thread-1',
        turn_id: null,
        recorded_at: '2026-08-18T04:27:00.000Z',
        event: { type: 'session.started' }
      })}\n`,
      { mode: 0o600 }
    );

    const result = store.updateAttempt(WS, {
      attempt_id: 'monitor-terminal',
      patch: { status: 'done' }
    });

    expect(
      result.queue.attempts['monitor-terminal'].delegation_sessions
    ).toMatchObject([
      {
        launch_id: 'launch-1',
        status: 'interrupted',
        last_event_at: Date.parse('2026-08-18T04:27:00.000Z')
      }
    ]);
    expect(fs.existsSync(monitor_file)).toBe(true);
  });

  test('backfills a legacy durable session with re-observed effort', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'monitor-backfill',
        bead_id: 'UI-monitor',
        status: 'done',
        // A record persisted before `effort` existed: the key is absent, not null.
        delegation_sessions: /** @type {any} */ ([
          {
            launch_id: 'launch-1',
            provider: 'codex',
            role: 'implementation',
            model: 'gpt-5.6-sol',
            session_id: 'thread-1',
            turn_id: null,
            status: 'interrupted',
            started_at: Date.parse('2026-08-18T04:27:00.000Z'),
            completed_at: null,
            last_event_at: Date.parse('2026-08-18T04:27:00.000Z')
          }
        ])
      }
    });
    ensureDelegationMonitorDir(WS, 'monitor-backfill');
    fs.writeFileSync(
      path.join(delegationMonitorDir(WS, 'monitor-backfill'), 'launch-1.jsonl'),
      `${JSON.stringify({
        schema: 'codex-delegation-monitor-v1',
        attempt_id: 'monitor-backfill',
        launch_id: 'launch-1',
        provider: 'codex',
        role: 'implementation',
        model: 'gpt-5.6-sol',
        effort: 'high',
        thread_id: 'thread-1',
        turn_id: null,
        recorded_at: '2026-08-18T04:27:00.000Z',
        event: { type: 'session.started' }
      })}\n`,
      { mode: 0o600 }
    );

    const result = store.updateAttempt(WS, {
      attempt_id: 'monitor-backfill',
      patch: {}
    });

    expect(
      result.queue.attempts['monitor-backfill'].delegation_sessions
    ).toMatchObject([{ launch_id: 'launch-1', effort: 'high' }]);
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

  test('normalizes a persisted repairing operation to failed on load', () => {
    const store = createQueueStore();
    store.ensureRepoOperation(WS, {
      operation_id: 'deploy-repairing',
      repo_id: WS,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-1', merged_sha: 'a'.repeat(40) }],
      effective_base_sha: 'b'.repeat(40),
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'c'.repeat(40)
    });
    const attempt_id =
      store.snapshot(WS).repo_operations['deploy-repairing'].attempt_id;
    store.settleRepoOperation(WS, {
      operation_id: 'deploy-repairing',
      attempt_id,
      exit_code: 1,
      signal: null,
      failure: {
        code: 'script_failed',
        fingerprint: 'f'.repeat(64),
        detail: 'deploy failed',
        interrupted: false
      }
    });
    const queue_path = queueFilePath(WS);
    const legacy = JSON.parse(fs.readFileSync(queue_path, 'utf8'));
    legacy.auto_repair = false;
    legacy.repo_operations['deploy-repairing'].state = 'repairing';
    legacy.repo_operations['deploy-repairing'].repair = {
      chain_id: 'deploy-repairing',
      owner_bead: 'UI-1',
      auto_budget: 1,
      auto_used: 1,
      session_id: 'sess-1',
      attempt_id: 'att-1',
      ladder_stage: 'auto_repair_session'
    };
    fs.writeFileSync(queue_path, JSON.stringify(legacy));

    const reloaded = createQueueStore().snapshot(WS);
    const operation = reloaded.repo_operations['deploy-repairing'];

    expect(operation.state).toBe('failed');
    expect(operation.failure).toMatchObject({ code: 'script_failed' });
    expect(Object.hasOwn(operation, 'repair')).toBe(false);
    expect(Object.hasOwn(reloaded, 'auto_repair')).toBe(false);
  });

  test('drops a persisted cleanup repair record on load', () => {
    const store = createQueueStore();
    store.recordCleanupFailure(WS, {
      bead_id: 'UI-cleanup',
      step: 'base_containment',
      reason: 'base_fetch_failed'
    });
    const queue_path = queueFilePath(WS);
    const legacy = JSON.parse(fs.readFileSync(queue_path, 'utf8'));
    legacy.cleanup_failed['UI-cleanup'].repair = {
      chain_id: 'cleanup:UI-cleanup',
      auto_used: 1,
      attempt_id: 'att-1',
      session_id: 'sess-1',
      mode: 'auto',
      ladder_stage: 'auto_repair_session'
    };
    fs.writeFileSync(queue_path, JSON.stringify(legacy));

    const reloaded = createQueueStore().snapshot(WS);

    expect(reloaded.cleanup_failed['UI-cleanup']).toMatchObject({
      step: 'base_containment',
      reason: 'base_fetch_failed'
    });
    expect(Object.hasOwn(reloaded.cleanup_failed['UI-cleanup'], 'repair')).toBe(
      false
    );
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
  test('normalizes and reloads an optional stale-work admission', () => {
    const store = createQueueStore();
    const stale_work = {
      schema: 1,
      residue: 'branch',
      state: 'unique',
      cause: 'ahead_not_contained',
      summary: {
        staged_count: 1,
        unstaged_count: 0,
        untracked_count: 0,
        branch_ahead: 0,
        head_ahead: 0
      },
      identity_digest: 'a'.repeat(64),
      action_id: 'action-1',
      can_resume: false,
      can_continue: true,
      can_backup_fresh: true,
      can_recheck: true,
      identity: {
        worktree_realpath: null,
        branch: 'UI-1',
        head_sha: null,
        branch_head_sha: 'e'.repeat(40),
        base_oid: 'c'.repeat(40),
        status_digest: 'd'.repeat(64)
      }
    };

    store.recordAdmission(WS, {
      bead_id: 'UI-1',
      reason: 'worktree_stale_work',
      stale_work
    });
    const reloaded = createQueueStore().load(WS);

    expect(reloaded.admission['UI-1'].stale_work).toEqual(stale_work);
  });

  test('defaults a legacy stale-work residue to worktree', () => {
    const store = createQueueStore();
    const stale_work = {
      schema: 1,
      state: 'unique',
      cause: 'dirty_unique',
      summary: {
        staged_count: 1,
        unstaged_count: 0,
        untracked_count: 0,
        branch_ahead: 0,
        head_ahead: 0
      },
      identity_digest: 'a'.repeat(64),
      action_id: 'action-1',
      can_resume: false,
      can_continue: true,
      can_backup_fresh: true,
      can_recheck: false
    };

    store.recordAdmission(WS, {
      bead_id: 'UI-1',
      reason: 'worktree_stale_work',
      stale_work
    });

    expect(store.snapshot(WS).admission['UI-1'].stale_work).toMatchObject({
      residue: 'worktree'
    });
  });

  test('no-ops an unchanged stale-work snapshot without bumping revision', () => {
    const store = createQueueStore();
    const stale_work = {
      schema: 1,
      residue: 'branch',
      state: 'unknown',
      cause: 'observe_failed',
      summary: {
        staged_count: 0,
        unstaged_count: 0,
        untracked_count: 0,
        branch_ahead: 0,
        head_ahead: 0
      },
      identity_digest: 'a'.repeat(64),
      action_id: 'action-1',
      can_resume: false,
      can_continue: false,
      can_backup_fresh: false,
      can_recheck: true,
      identity: {
        worktree_realpath: null,
        branch: 'UI-1',
        head_sha: null,
        branch_head_sha: 'b'.repeat(40),
        base_oid: 'c'.repeat(40),
        status_digest: 'd'.repeat(64)
      }
    };
    store.recordAdmission(WS, {
      bead_id: 'UI-1',
      reason: 'worktree_stale_work',
      stale_work
    });
    const before = store.snapshot(WS).revision;

    const result = store.recordAdmission(WS, {
      bead_id: 'UI-1',
      reason: 'worktree_stale_work',
      stale_work: structuredClone(stale_work)
    });

    expect(result.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('replaces stale-work admission when a capability changes', () => {
    const store = createQueueStore();
    const stale_work = {
      schema: 1,
      state: 'unknown',
      cause: 'observe_failed',
      summary: {
        staged_count: 0,
        unstaged_count: 0,
        untracked_count: 0,
        branch_ahead: 0,
        head_ahead: 0
      },
      identity_digest: 'a'.repeat(64),
      action_id: 'action-1',
      can_resume: false,
      can_continue: false,
      can_backup_fresh: false,
      can_recheck: false
    };
    store.recordAdmission(WS, {
      bead_id: 'UI-1',
      reason: 'worktree_stale_work',
      stale_work
    });
    const before = store.snapshot(WS).revision;

    const result = store.recordAdmission(WS, {
      bead_id: 'UI-1',
      reason: 'worktree_stale_work',
      stale_work: { ...stale_work, can_recheck: true }
    });

    expect(result.ok).toBe(true);
    expect(result.queue.revision).toBe(before + 1);
    expect(
      /** @type {import('./queue-store.js').StaleWorkAdmission} */ (
        result.queue.admission['UI-1'].stale_work
      ).can_recheck
    ).toBe(true);
  });

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
      {
        bead_id: 'UI-1',
        resolution_rounds: 0,
        rebase_rounds: 0,
        resolution: null
      }
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
      {
        bead_id: 'UI-1',
        resolution_rounds: 1,
        rebase_rounds: 0,
        resolution: null
      }
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
      {
        bead_id: 'UI-1',
        resolution_rounds: 0,
        rebase_rounds: 0,
        resolution: null
      }
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
      settled_at: null,
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch'
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
            rebase_rounds: 0,
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
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch',

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
        rebase_rounds: 0,
        resolution: {
          attempt_id: 'res-1',
          subject_bead_id: 'UI-subject',
          deadline_at: 1_800_100,
          state: 'waiting',
          yielded_at: null,
          settled_at: null,
          dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
          base_ref: 'main',
          head_ref: 'feature-branch'
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
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch',

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
      settled_at: null,
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch'
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
        dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
        base_ref: 'main',
        head_ref: 'feature-branch',

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
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch',

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
        dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
        base_ref: 'main',
        head_ref: 'feature-branch',

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
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch',

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
      charge: 'session'
    });
    const duplicate = store.consumeResolutionWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-1',
      charge: 'session'
    });

    expect(consumed.queue.merge_queue[0]).toEqual({
      bead_id: 'UI-1',
      resolution_rounds: 1,
      rebase_rounds: 0,
      resolution: null
    });
    expect(duplicate.ok).toBe(false);
    expect(duplicate.queue.revision).toBe(consumed.queue.revision);
  });

  /**
   * A queue item whose ready resolution is waiting to be consumed.
   *
   * @param {{ rebase_rounds?: unknown }} [overrides] - Written straight into
   * `queue.json`, so a field can be made absent or nonsense the way a legacy
   * file or a missed creation point would leave it.
   */
  function storeWithReadyResolution(overrides = {}) {
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
      wait_ms: 100,
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch'
    });
    store.settleResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      settled_at: 150,
      active_bead_id: null
    });
    if (Object.hasOwn(overrides, 'rebase_rounds')) {
      const file = queueFilePath(WS);
      const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
      raw.merge_queue[0].rebase_rounds = overrides.rebase_rounds;
      fs.writeFileSync(file, JSON.stringify(raw));
      store.__clearCacheForTest();
    }
    return store;
  }

  test('charges the rebase budget without spending a resolution round', () => {
    const store = storeWithReadyResolution();

    const consumed = store.consumeResolutionWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-1',
      charge: 'rebase'
    });

    expect(consumed.queue.merge_queue[0]).toEqual({
      bead_id: 'UI-1',
      resolution_rounds: 0,
      rebase_rounds: 1,
      resolution: null
    });
  });

  test('clears a ready resolution without charging either budget', () => {
    const store = storeWithReadyResolution();

    const consumed = store.consumeResolutionWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-1',
      charge: 'none'
    });

    expect(consumed.queue.merge_queue[0]).toEqual({
      bead_id: 'UI-1',
      resolution_rounds: 0,
      rebase_rounds: 0,
      resolution: null
    });
  });

  test('refuses a charge it does not recognize, leaving the binding intact', () => {
    const store = storeWithReadyResolution();

    const consumed = store.consumeResolutionWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-1',
      charge: /** @type {any} */ ('rounds')
    });

    expect(consumed.ok).toBe(false);
    expect(consumed.queue.merge_queue[0].resolution).toMatchObject({
      attempt_id: 'res-1',
      state: 'ready'
    });
  });

  test('starts a rebase charge from zero when the stored count is unusable', () => {
    const store = storeWithReadyResolution({ rebase_rounds: 'many' });

    const consumed = store.consumeResolutionWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-1',
      charge: 'rebase'
    });

    expect(consumed.queue.merge_queue[0].rebase_rounds).toBe(1);
  });

  test('reads a legacy entry as zero rebase rounds and an unidentified wait', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 3,
        merge_queue: [
          {
            bead_id: 'UI-1',
            resolution_rounds: 1,
            resolution: {
              attempt_id: 'res-1',
              subject_bead_id: 'UI-1',
              deadline_at: 100,
              state: 'waiting',
              yielded_at: null,
              settled_at: null
            }
          }
        ]
      })
    );

    const [entry] = createQueueStore().snapshot(WS).merge_queue;

    expect(entry.rebase_rounds).toBe(0);
    expect(entry.resolution).toMatchObject({
      dispatch_head_sha: '',
      base_ref: '',
      head_ref: ''
    });
  });

  test('refuses a bind whose dispatch identity is incomplete', () => {
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

    const result = store.bindResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      wait_ms: 100,
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: ''
    });

    expect(result.ok).toBe(false);
    expect(result.queue.merge_queue[0].resolution).toBe(null);
  });

  test('refuses a prerecord whose dispatch head is not a commit id', () => {
    const store = storeWithPrWait(['UI-1']);
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });

    const result = store.appendResolutionAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      queue_bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      wait_ms: 100,
      dispatch_head_sha: 'HEAD',
      base_ref: 'main',
      head_ref: 'feature-branch',
      attempt: {
        attempt_id: 'res-atomic',
        bead_id: 'UI-1',
        status: 'running',
        conflict_resolution: true,
        started_at: 50
      }
    });

    expect(result.ok).toBe(false);
    expect(result.queue.attempts['res-atomic']).toBeUndefined();
    expect(result.queue.merge_queue[0].resolution).toBe(null);
  });

  test('gives a newly enqueued entry a zero rebase budget', () => {
    const store = storeWithPrWait(['UI-1']);

    const result = store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });

    expect(result.queue.merge_queue).toEqual([
      {
        bead_id: 'UI-1',
        resolution_rounds: 0,
        rebase_rounds: 0,
        resolution: null
      }
    ]);
  });

  test('pairs every queue-entry creation point with a zero rebase budget', () => {
    // The two budgets are written together at seven literal sites (spec §3.2;
    // the automatic-review enrolment site left with UI-d7fy §3.4).
    // Normalization and consumption both floor a missed one, so this is about
    // the third guarantee: no creation point drifts apart from the others.
    const source = fs.readFileSync(
      new URL('./queue-store.js', import.meta.url),
      'utf8'
    );

    const created = source.match(
      /resolution_rounds: 0,\n\s*rebase_rounds: 0,/g
    );

    expect(source.match(/resolution_rounds: 0,/g)).toHaveLength(7);
    expect(created).toHaveLength(7);
  });
});

describe('worker/queue-store — manual merge continuation authority', () => {
  function manualStore() {
    const ids = ['authority-1', 'authority-2', 'authority-3'];
    const store = createQueueStore({
      now: () => 123,
      randomUUID: () => /** @type {string} */ (ids.shift())
    });
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-UI-1', bead_id: 'UI-1' }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'att-UI-1',
      patch: { status: 'done', finished_at: 1 }
    });
    return store;
  }

  /**
   * @param {string|null} [merged_sha]
   */
  function terminalManualStore(merged_sha = null) {
    const store = createQueueStore({ now: () => 123 });
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'att-UI-1',
        bead_id: 'UI-1',
        target_base: 'main',
        base_oid: 'b'.repeat(40)
      }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'att-UI-1',
      patch: { status: 'done', finished_at: 1 }
    });
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-1',
      source_attempt_id: 'att-UI-1',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-1',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha
      }
    });
    store.terminalizeCompletionIntent(WS, {
      root_bead_id: 'UI-1',
      terminal: {
        reason: 'review_receipt_stale',
        stage: 'merge_gate',
        failure_key: null,
        evidence: 'receipt is stale',
        log_path: null,
        at: 99
      }
    });
    return store;
  }

  /**
   * @param {ReturnType<typeof createQueueStore>} store
   * @param {number} [expected_revision]
   */
  function enqueueManual(
    store,
    expected_revision = store.snapshot(WS).revision
  ) {
    return store.enqueueMergeManual(WS, {
      expected_revision,
      entries: [
        {
          bead_id: 'UI-1',
          head_sha: 'a'.repeat(40),
          target_base: 'main'
        }
      ]
    });
  }

  test('resumes a needs_human intent at gating with terminal evidence', () => {
    const store = terminalManualStore();

    const result = enqueueManual(store);

    expect(result.ok).toBe(true);
    expect(result.queue.completion_intents['UI-1']).toMatchObject({
      phase: 'gating',
      terminal_reason: null,
      resumed_terminal: {
        reason: 'review_receipt_stale',
        stage: 'merge_gate',
        evidence: 'receipt is stale',
        at: 99,
        resumed_at: 123
      }
    });
  });

  test('carries the operation id and comment claim through both terminals', () => {
    const store = terminalManualStore();
    store.terminalizeCompletionIntent(WS, {
      root_bead_id: 'UI-1',
      terminal: {
        reason: 'verify_red',
        stage: 'coordinator',
        failure_key: null,
        evidence: null,
        log_path: '/state/repo-operation-logs/op-9.log',
        op_id: 'op-9',
        comment_at: 4242,
        at: 99
      }
    });

    const resumed = enqueueManual(store).queue.completion_intents['UI-1'];
    store.__clearCacheForTest();
    const reloaded = store.snapshot(WS).completion_intents['UI-1'];

    expect(resumed.resumed_terminal).toMatchObject({
      op_id: 'op-9',
      comment_at: 4242,
      resumed_at: 123
    });
    expect(reloaded.resumed_terminal).toMatchObject({
      op_id: 'op-9',
      comment_at: 4242
    });
  });

  test('defaults an operation-less terminal to a null op id and comment claim', () => {
    const store = terminalManualStore();

    const intent = store.snapshot(WS).completion_intents['UI-1'];

    expect(intent.terminal_reason).toMatchObject({
      op_id: null,
      comment_at: null
    });
  });

  test('resumes a merged needs_human intent at cleaning', () => {
    const store = terminalManualStore('c'.repeat(40));

    const result = enqueueManual(store);

    expect(result.queue.completion_intents['UI-1'].phase).toBe('cleaning');
  });

  test('stores a zero rebase budget on a manual merge entry', () => {
    const store = terminalManualStore();

    const result = enqueueManual(store);

    expect(
      result.queue.merge_queue.find((entry) => entry.bead_id === 'UI-1')
    ).toMatchObject({ resolution_rounds: 0, rebase_rounds: 0 });
  });

  test('preserves the completion operation during resume', () => {
    const store = terminalManualStore();
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    const intent = raw.completion_intents['UI-1'];
    intent.active_op = {
      op_id: 'merge-op',
      kind: 'merge_subject',
      failure_key: {
        stage: 'merge_gate',
        reason: 'verify_cmd_failed',
        subject_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        result_digest: 'c'.repeat(64)
      },
      attempt_id: null,
      status: 'prepared'
    };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));
    store.__clearCacheForTest();
    const before = store.snapshot(WS).completion_intents['UI-1'];

    const result = enqueueManual(store);
    const resumed = result.queue.completion_intents['UI-1'];

    expect(resumed.active_op).toEqual(before.active_op);
    expect(resumed.subject).toEqual(before.subject);
  });

  test('leaves a non-needs_human intent unchanged on duplicate click', () => {
    const store = terminalManualStore();
    enqueueManual(store);
    const before = store.snapshot(WS).completion_intents['UI-1'];

    const result = enqueueManual(store);

    expect(result.ok).toBe(false);
    expect(store.snapshot(WS).completion_intents['UI-1']).toEqual(before);
  });

  test('rejects completion resume with the rest of a stale CAS mutation', () => {
    const store = terminalManualStore();
    const current_revision = store.snapshot(WS).revision;

    const result = enqueueManual(store, current_revision - 1);
    const intent = store.snapshot(WS).completion_intents['UI-1'];

    expect(result).toMatchObject({ ok: false, conflict: true });
    expect(intent.phase).toBe('needs_human');
    expect(intent).not.toHaveProperty('resumed_terminal');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('drops only a malformed resumed terminal during cold load', () => {
    const store = terminalManualStore();
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.completion_intents['UI-1'].resumed_terminal = {
      ...raw.completion_intents['UI-1'].terminal_reason,
      resumed_at: 'not-a-number'
    };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));
    store.__clearCacheForTest();

    const intent = store.snapshot(WS).completion_intents['UI-1'];

    expect(intent.phase).toBe('needs_human');
    expect(intent.terminal_reason).toMatchObject({
      reason: 'review_receipt_stale',
      stage: 'merge_gate'
    });
    expect(intent).not.toHaveProperty('resumed_terminal');
  });

  test('records manual authority only with authoritative head and target base', () => {
    const store = manualStore();

    const unreadable = store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1', head_sha: null, target_base: null }]
    });
    const queued = store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        {
          bead_id: 'UI-1',
          head_sha: 'a'.repeat(40),
          target_base: 'main'
        }
      ]
    });

    expect(unreadable.ok).toBe(false);
    expect(queued.queue.merge_queue[0]).toMatchObject({
      authority: {
        id: 'authority-1',
        source: 'manual',
        granted_at: 123,
        requested_head_sha: 'a'.repeat(40),
        target_base: 'main'
      }
    });
  });

  test('records lane provenance on a manual authority', () => {
    const store = manualStore();

    const queued = store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        {
          bead_id: 'UI-1',
          head_sha: 'a'.repeat(40),
          target_base: 'main',
          via: 'lane'
        }
      ]
    });

    expect(queued.queue.merge_queue[0].authority).toEqual({
      id: 'authority-1',
      source: 'manual',
      granted_at: 123,
      requested_head_sha: 'a'.repeat(40),
      target_base: 'main',
      via: 'lane'
    });
  });

  test('keeps lane provenance across a reload', () => {
    const store = manualStore();
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        {
          bead_id: 'UI-1',
          head_sha: 'a'.repeat(40),
          target_base: 'main',
          via: 'lane'
        }
      ]
    });

    const reloaded = createQueueStore().snapshot(WS);

    expect(reloaded.merge_queue[0].authority?.via).toBe('lane');
  });

  test('omits via entirely for an authority granted by a click', () => {
    const store = manualStore();
    enqueueManual(store);

    const reloaded = createQueueStore().snapshot(WS);

    expect(reloaded.merge_queue[0].authority).not.toHaveProperty('via');
  });

  test('drops an unrecognized via value on load', () => {
    const store = manualStore();
    enqueueManual(store);
    const persisted = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    persisted.merge_queue[0].authority.via = 'not-a-lane';
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(persisted));

    const reloaded = createQueueStore().snapshot(WS);

    expect(reloaded.merge_queue[0].authority).not.toHaveProperty('via');
  });

  test('keeps manual authority when auto merge turns off', () => {
    const store = manualStore();
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        {
          bead_id: 'UI-1',
          head_sha: 'a'.repeat(40),
          target_base: 'main'
        }
      ]
    });
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: false,
      clear_waiting: true
    });

    expect(store.snapshot(WS).merge_queue[0].authority?.source).toBe('manual');
  });

  test('settles a running review session in the cancel write itself', () => {
    const store = manualStore();
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        {
          bead_id: 'UI-1',
          head_sha: 'a'.repeat(40),
          target_base: 'main'
        }
      ]
    });
    store.upsertReviewSessionAttempt(WS, {
      attempt_id: 'review:1',
      patch: {
        bead_id: 'UI-1',
        kind: 'review_session',
        status: 'running',
        authority_id: 'authority-1',
        head_sha: 'a'.repeat(40)
      }
    });

    const cancelled = store.cancelMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'UI-1'
    });

    // One write commits the authority reclaim AND the attempt terminal
    // (UI-d7fy §5.6); the process stop is the caller's, afterwards.
    expect(cancelled.ok).toBe(true);
    expect(cancelled.cancelled_attempt_ids).toEqual(['review:1']);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(store.snapshot(WS).attempts['review:1']).toMatchObject({
      status: 'failed',
      cause: 'cancelled'
    });
  });

  test('records automatic source when the auto enroller queues a row', () => {
    const store = manualStore();

    const r = store.enqueueMergeAuto(WS, {
      entries: [
        {
          bead_id: 'UI-1',
          head_sha: 'a'.repeat(40),
          target_base: 'main'
        }
      ],
      present_ids: ['UI-1']
    });

    expect(r.queue.merge_queue[0].authority).toMatchObject({
      source: 'automatic',
      requested_head_sha: 'a'.repeat(40),
      target_base: 'main'
    });
  });

  test('reuses the nonterminal authority on a duplicate manual click', () => {
    const store = manualStore();
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ]
    });

    const dup = store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'b'.repeat(40), target_base: 'main' }
      ]
    });

    expect(dup.ok).toBe(false);
    expect(store.snapshot(WS).merge_queue[0].authority?.id).toBe('authority-1');
  });

  test('drops the gate hold when a click issues a fresh authority', () => {
    const store = manualStore();
    store.enqueueMergeAuto(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ],
      present_ids: ['UI-1']
    });
    store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: { reason: 'review_receipt_missing', head_sha: 'a'.repeat(40) },
      at: 5
    });

    const reclick = store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'c'.repeat(40), target_base: 'main' }
      ]
    });

    expect(reclick.ok).toBe(true);
    expect(store.snapshot(WS).merge_queue[0]).toMatchObject({
      authority: { source: 'manual', requested_head_sha: 'c'.repeat(40) }
    });
    expect(store.snapshot(WS).merge_queue[0].hold).toBeUndefined();
  });

  test('attaches a fresh manual authority to a legacy authority-less entry', () => {
    const store = manualStore();
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });

    expect(store.snapshot(WS).merge_queue[0].authority).toBeUndefined();

    const reclick = store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ]
    });

    expect(reclick.ok).toBe(true);
    expect(store.snapshot(WS).merge_queue[0].authority?.source).toBe('manual');
  });

  test('commits the review-session attempt in the authority write itself', () => {
    const store = manualStore();
    const before = store.snapshot(WS).revision;

    const clicked = store.enqueueMergeManual(WS, {
      expected_revision: before,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ],
      review_session: { attempt_id: 'review:1', session_source: 'resume' }
    });

    // ONE write (UI-d7fy §5.2): the authority and the attempt are one decision.
    expect(clicked.ok).toBe(true);
    expect(clicked.review_session_registered).toBe(true);
    expect(store.snapshot(WS).revision).toBe(before + 1);
    expect(store.snapshot(WS).attempts['review:1']).toMatchObject({
      bead_id: 'UI-1',
      kind: 'review_session',
      origin: 'click',
      status: 'pending',
      authority_id: 'authority-1',
      head_sha: 'a'.repeat(40),
      continuation_mode: 'session'
    });
  });

  test('registers no attempt when a review session is already in flight', () => {
    const store = manualStore();
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ],
      review_session: { attempt_id: 'review:1', session_source: 'resume' }
    });

    const again = store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ],
      review_session: { attempt_id: 'review:2', session_source: 'fresh' }
    });

    expect(again.review_session_registered).toBe(false);
    expect(store.snapshot(WS).attempts['review:2']).toBeUndefined();
    expect(store.snapshot(WS).merge_queue[0].authority?.id).toBe('authority-1');
  });

  test("mints a fresh authority when this bead's last review session failed", () => {
    const store = manualStore();
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ],
      review_session: { attempt_id: 'review:1', session_source: 'resume' }
    });
    store.settleReviewSession(WS, {
      attempt_id: 'review:1',
      outcome: 'failed',
      cause: 'receipt_not_current',
      hold_reason: 'review_receipt_stale',
      at: 300
    });

    const reclick = store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'c'.repeat(40), target_base: 'main' }
      ]
    });

    expect(reclick.ok).toBe(true);
    expect(store.snapshot(WS).merge_queue[0].authority).toMatchObject({
      id: 'authority-2',
      source: 'manual',
      requested_head_sha: 'c'.repeat(40)
    });
  });

  test('reuses the authority after a review session that succeeded', () => {
    const store = manualStore();
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ],
      review_session: { attempt_id: 'review:1', session_source: 'resume' }
    });
    store.settleReviewSession(WS, {
      attempt_id: 'review:1',
      outcome: 'current',
      final_head_sha: 'a'.repeat(40),
      at: 300
    });

    const reclick = store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ]
    });

    expect(reclick.ok).toBe(false);
    expect(store.snapshot(WS).merge_queue[0].authority?.id).toBe('authority-1');
  });

  test('rebinds the authority to the final head when the receipt is current', () => {
    const store = manualStore();
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ],
      review_session: { attempt_id: 'review:1', session_source: 'resume' }
    });
    store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: { reason: 'review_receipt_missing', head_sha: 'a'.repeat(40) },
      at: 5
    });

    const settled = store.settleReviewSession(WS, {
      attempt_id: 'review:1',
      outcome: 'current',
      final_head_sha: 'b'.repeat(40),
      at: 900
    });

    expect(settled.ok).toBe(true);
    expect(store.snapshot(WS).attempts['review:1']).toMatchObject({
      status: 'done',
      finished_at: 900
    });
    expect(store.snapshot(WS).merge_queue[0]).toMatchObject({
      authority: { id: 'authority-1', requested_head_sha: 'b'.repeat(40) }
    });
    expect(store.snapshot(WS).merge_queue[0].hold).toBeUndefined();
  });

  test('writes nothing when the settle arrives after the authority is gone', () => {
    const store = manualStore();
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ],
      review_session: { attempt_id: 'review:1', session_source: 'resume' }
    });
    store.cancelMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'UI-1'
    });
    const revision = store.snapshot(WS).revision;

    const settled = store.settleReviewSession(WS, {
      attempt_id: 'review:1',
      outcome: 'current',
      final_head_sha: 'b'.repeat(40)
    });

    expect(settled).toMatchObject({ ok: false, reason: 'binding_gone' });
    expect(store.snapshot(WS).revision).toBe(revision);
  });

  test('persists authority and its gate hold across a cold reload', () => {
    const store = manualStore();
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ]
    });
    store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: { reason: 'review_receipt_stale', head_sha: 'b'.repeat(40) },
      at: 7
    });

    store.__clearCacheForTest();

    expect(store.snapshot(WS).merge_queue[0]).toMatchObject({
      authority: { id: 'authority-1', source: 'manual' },
      hold: {
        reason: 'review_receipt_stale',
        head_sha: 'b'.repeat(40),
        since: 7
      }
    });
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
      {
        bead_id: 'UI-1',
        resolution_rounds: 1,
        rebase_rounds: 0,
        resolution: null
      }
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

describe('worker/queue-store — 직렬 레인 스키마 (UI-04vo seam A)', () => {
  test('defaults to one empty fixed serial lane', () => {
    const store = createQueueStore();

    const q = store.snapshot(WS);

    expect(q.serial_lane_count).toBe(1);
    expect(q.serial_lanes).toEqual([{ id: 's1', entries: [] }]);
  });

  test('normalizes stored serial lanes onto the stored count with fixed ids', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'SEED' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.serial_lane_count = 3;
    raw.serial_lanes = [{ id: 's2', entries: [{ bead_id: 'B', added_at: 1 }] }];
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.serial_lane_count).toBe(3);
    expect(loaded.serial_lanes.map((l) => l.id)).toEqual(['s1', 's2', 's3']);
    expect(loaded.serial_lanes[1].entries.map((e) => e.bead_id)).toEqual(['B']);
    expect(loaded.serial_lanes[0].entries).toEqual([]);
    expect(loaded.serial_lanes[2].entries).toEqual([]);
  });

  test('falls back to the default count when the stored value is unusable', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'SEED' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.serial_lane_count = 9;
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.serial_lane_count).toBe(1);
    expect(loaded.serial_lanes).toHaveLength(1);
  });

  test('drops pr_wait_holds_slot on load instead of round-tripping it', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'SEED' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.pr_wait_holds_slot = true;
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect('pr_wait_holds_slot' in loaded).toBe(false);
  });

  test('enforces single membership across parallel and serial lanes on load', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'SEED' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.queue = [
      { bead_id: 'A', added_at: 1 },
      { bead_id: 'B', added_at: 2 }
    ];
    raw.serial_lane_count = 2;
    raw.serial_lanes = [
      {
        id: 's1',
        entries: [
          { bead_id: 'B', added_at: 3 },
          { bead_id: 'C', added_at: 4 }
        ]
      },
      {
        id: 's2',
        entries: [
          { bead_id: 'C', added_at: 5 },
          { bead_id: 'D', added_at: 6 }
        ]
      }
    ];
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.queue.map((e) => e.bead_id)).toEqual(['A', 'B']);
    expect(loaded.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual(['C']);
    expect(loaded.serial_lanes[1].entries.map((e) => e.bead_id)).toEqual(['D']);
  });

  test('returns entries of lanes beyond the stored count to the parallel tail', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.serial_lane_count = 1;
    raw.serial_lanes = [
      { id: 's1', entries: [{ bead_id: 'B', added_at: 1 }] },
      { id: 's3', entries: [{ bead_id: 'X', added_at: 2 }] }
    ];
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.serial_lanes).toHaveLength(1);
    expect(loaded.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual(['B']);
    expect(loaded.queue.map((e) => e.bead_id)).toEqual(['A', 'X']);
  });

  test('place moves a bead into a serial lane and out of its origin lane', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });

    const r = store.place(WS, {
      expected_revision: 1,
      bead_id: 'A',
      lane: 's1'
    });

    expect(r.ok).toBe(true);
    expect(r.queue.queue).toEqual([]);
    expect(r.queue.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual([
      'A'
    ]);
  });

  test('place without a lane lands in the parallel lane', () => {
    const store = createQueueStore();

    const r = store.place(WS, { expected_revision: 0, bead_id: 'A' });

    expect(r.ok).toBe(true);
    expect(r.queue.queue.map((e) => e.bead_id)).toEqual(['A']);
    expect(r.queue.serial_lanes.every((l) => l.entries.length === 0)).toBe(
      true
    );
  });

  test('place inserts at an index inside a serial lane', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A', lane: 's1' });
    store.place(WS, { expected_revision: 1, bead_id: 'B', lane: 's1' });

    const r = store.place(WS, {
      expected_revision: 2,
      bead_id: 'C',
      lane: 's1',
      index: 1
    });

    expect(r.ok).toBe(true);
    expect(r.queue.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual([
      'A',
      'C',
      'B'
    ]);
  });

  test('place rejects an unknown lane and a lane beyond the configured count', () => {
    const store = createQueueStore();

    const unknown = store.place(WS, {
      expected_revision: 0,
      bead_id: 'A',
      lane: 'nope'
    });
    const beyond = store.place(WS, {
      expected_revision: 0,
      bead_id: 'A',
      lane: 's3'
    });

    expect(unknown.ok).toBe(false);
    expect(unknown.conflict).toBe(false);
    expect(beyond.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(0);
  });

  test('reorder reorders within a serial lane', () => {
    const store = createQueueStore();
    store.setSerialLaneCount(WS, { expected_revision: 0, count: 2 });
    store.place(WS, { expected_revision: 1, bead_id: 'A', lane: 's2' });
    store.place(WS, { expected_revision: 2, bead_id: 'B', lane: 's2' });
    store.place(WS, { expected_revision: 3, bead_id: 'C', lane: 's2' });

    const r = store.reorder(WS, {
      expected_revision: 4,
      bead_id: 'C',
      lane: 's2',
      to_index: 0
    });

    expect(r.ok).toBe(true);
    expect(r.queue.serial_lanes[1].entries.map((e) => e.bead_id)).toEqual([
      'C',
      'A',
      'B'
    ]);
  });

  test('reorder rejects a bead absent from the target lane', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });

    const r = store.reorder(WS, {
      expected_revision: 1,
      bead_id: 'A',
      lane: 's1',
      to_index: 0
    });

    expect(r.ok).toBe(false);
    expect(r.conflict).toBe(false);
    expect(store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['A']);
  });

  test('setSerialLaneCount grows the lane set with empty lanes', () => {
    const store = createQueueStore();

    const r = store.setSerialLaneCount(WS, { expected_revision: 0, count: 4 });

    expect(r.ok).toBe(true);
    expect(r.queue.serial_lane_count).toBe(4);
    expect(r.queue.serial_lanes.map((l) => l.id)).toEqual([
      's1',
      's2',
      's3',
      's4'
    ]);
    expect(createQueueStore().load(WS).serial_lane_count).toBe(4);
  });

  test('setSerialLaneCount returns truncated waiting entries to the parallel tail', () => {
    const store = createQueueStore();
    store.setSerialLaneCount(WS, { expected_revision: 0, count: 2 });
    store.place(WS, { expected_revision: 1, bead_id: 'A' });
    store.place(WS, { expected_revision: 2, bead_id: 'X', lane: 's2' });
    store.place(WS, { expected_revision: 3, bead_id: 'Y', lane: 's2' });

    const r = store.setSerialLaneCount(WS, { expected_revision: 4, count: 1 });

    expect(r.ok).toBe(true);
    expect(r.queue.serial_lanes).toHaveLength(1);
    expect(r.queue.queue.map((e) => e.bead_id)).toEqual(['A', 'X', 'Y']);
  });

  test('setSerialLaneCount rejects values outside 1..5 and non-integers', () => {
    const store = createQueueStore();

    const zero = store.setSerialLaneCount(WS, {
      expected_revision: 0,
      count: 0
    });
    const six = store.setSerialLaneCount(WS, {
      expected_revision: 0,
      count: 6
    });
    const frac = store.setSerialLaneCount(WS, {
      expected_revision: 0,
      count: 2.5
    });

    expect(zero.ok).toBe(false);
    expect(six.ok).toBe(false);
    expect(frac.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(0);
  });

  test('retires the setPrWaitHoldsSlot mutator', () => {
    const store = createQueueStore();

    expect('setPrWaitHoldsSlot' in store).toBe(false);
  });

  test('makeAttempt normalizes serial_lane_id and keeps legacy worker_serial round-trip', () => {
    const laned = makeAttempt({
      attempt_id: 'a1',
      bead_id: 'UI-a',
      serial_lane_id: 's2'
    });
    const legacy = makeAttempt({
      attempt_id: 'a2',
      bead_id: 'UI-b',
      worker_serial: true
    });
    const malformed = makeAttempt({
      attempt_id: 'a3',
      bead_id: 'UI-c',
      serial_lane_id: /** @type {any} */ (7)
    });

    expect(laned.serial_lane_id).toBe('s2');
    expect(legacy.serial_lane_id).toBeNull();
    expect(legacy.worker_serial).toBe(true);
    expect(malformed.serial_lane_id).toBeNull();
  });

  test('settles a legacy in-progress worker_serial attempt as a lane-less attempt on load', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'SEED' });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.attempts = {
      legacy: {
        attempt_id: 'legacy',
        bead_id: 'UI-legacy',
        status: 'running',
        worker_serial: true
      }
    };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.attempts.legacy.serial_lane_id).toBeNull();
    expect(loaded.attempts.legacy.worker_serial).toBe(true);
  });
});

describe('worker/queue-store — blocks topological 보정 (UI-04vo seam C)', () => {
  test('keeps an order that already satisfies its blocks edges', () => {
    const result = orderLaneByBlocks(
      ['A', 'B', 'C'],
      [{ blocker: 'A', blockee: 'B' }]
    );

    expect(result.order).toEqual(['A', 'B', 'C']);
    expect(result.corrections).toEqual([]);
    expect(result.cycle).toBe(false);
  });

  test('moves a blockee after its blocker and records the correction', () => {
    const result = orderLaneByBlocks(
      ['B', 'A', 'C'],
      [{ blocker: 'A', blockee: 'B' }]
    );

    expect(result.order).toEqual(['A', 'B', 'C']);
    expect(result.corrections).toEqual([{ bead_id: 'B', after: 'A' }]);
    expect(result.cycle).toBe(false);
  });

  test('breaks ties by user order across independent chains', () => {
    const result = orderLaneByBlocks(
      ['D', 'B', 'A', 'C'],
      [
        { blocker: 'A', blockee: 'B' },
        { blocker: 'C', blockee: 'D' }
      ]
    );

    expect(result.order).toEqual(['A', 'B', 'C', 'D']);
    expect(result.corrections).toEqual([
      { bead_id: 'B', after: 'A' },
      { bead_id: 'D', after: 'C' }
    ]);
  });

  test('ignores edges that reference ids outside the lane', () => {
    const result = orderLaneByBlocks(
      ['B', 'A'],
      [
        { blocker: 'X', blockee: 'B' },
        { blocker: 'A', blockee: 'Y' }
      ]
    );

    expect(result.order).toEqual(['B', 'A']);
    expect(result.corrections).toEqual([]);
    expect(result.cycle).toBe(false);
  });

  test('returns the input order untouched and flags a cycle', () => {
    const result = orderLaneByBlocks(
      ['A', 'B', 'C'],
      [
        { blocker: 'A', blockee: 'B' },
        { blocker: 'B', blockee: 'A' }
      ]
    );

    expect(result.order).toEqual(['A', 'B', 'C']);
    expect(result.corrections).toEqual([]);
    expect(result.cycle).toBe(true);
  });

  test('is recomputable purely from order and edges without mutating inputs', () => {
    const order = ['B', 'A'];
    const edges = [{ blocker: 'A', blockee: 'B' }];

    const first = orderLaneByBlocks(order, edges);
    const second = orderLaneByBlocks(order, edges);

    expect(first).toEqual(second);
    expect(order).toEqual(['B', 'A']);
    expect(edges).toEqual([{ blocker: 'A', blockee: 'B' }]);
  });

  test('recalibrates an existing lane after a dependency edge is added', () => {
    const store = createQueueStore();
    let revision = store.place(WS, {
      expected_revision: 0,
      bead_id: 'B',
      lane: 's1'
    }).queue.revision;
    revision = store.place(WS, {
      expected_revision: revision,
      bead_id: 'A',
      lane: 's1'
    }).queue.revision;

    const result = store.recalibrateSerialLane(WS, {
      lane: 's1',
      blocks_edges: [{ blocker: 'A', blockee: 'B' }]
    });

    expect(result.changed).toBe(true);
    expect(result.queue.revision).toBe(revision + 1);
    expect(result.queue.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual([
      'A',
      'B'
    ]);
  });

  test('keeps the revision when recalibration changes no order', () => {
    const store = createQueueStore();
    let revision = store.place(WS, {
      expected_revision: 0,
      bead_id: 'A',
      lane: 's1'
    }).queue.revision;
    revision = store.place(WS, {
      expected_revision: revision,
      bead_id: 'B',
      lane: 's1'
    }).queue.revision;

    const result = store.recalibrateSerialLane(WS, {
      lane: 's1',
      blocks_edges: [{ blocker: 'A', blockee: 'B' }]
    });

    expect(result.changed).toBe(false);
    expect(result.queue.revision).toBe(revision);
  });

  test('keeps the order and reports a recalibration cycle', () => {
    const store = createQueueStore();
    let revision = store.place(WS, {
      expected_revision: 0,
      bead_id: 'A',
      lane: 's1'
    }).queue.revision;
    revision = store.place(WS, {
      expected_revision: revision,
      bead_id: 'B',
      lane: 's1'
    }).queue.revision;

    const result = store.recalibrateSerialLane(WS, {
      lane: 's1',
      blocks_edges: [
        { blocker: 'A', blockee: 'B' },
        { blocker: 'B', blockee: 'A' }
      ]
    });

    expect(result.cycle).toBe(true);
    expect(result.changed).toBe(false);
    expect(result.queue.revision).toBe(revision);
    expect(result.queue.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual([
      'A',
      'B'
    ]);
  });
});

describe('worker/queue-store — 분석 제출 단일 CAS (UI-04vo seam J)', () => {
  test('moves every submitted bead into the target lane in one revision', () => {
    const store = createQueueStore();
    store.setSerialLaneCount(WS, { expected_revision: 0, count: 2 });
    store.place(WS, { expected_revision: 1, bead_id: 'A' });
    store.place(WS, { expected_revision: 2, bead_id: 'B' });
    store.place(WS, { expected_revision: 3, bead_id: 'C', lane: 's2' });
    const before = store.snapshot(WS).revision;

    const r = store.applySerialGroup(WS, {
      expected_revision: before,
      lane: 's1',
      ordered_bead_ids: ['B', 'A', 'C']
    });

    expect(r.ok).toBe(true);
    expect(r.queue.revision).toBe(before + 1);
    expect(r.queue.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual([
      'B',
      'A',
      'C'
    ]);
    expect(r.queue.queue).toEqual([]);
    expect(r.queue.serial_lanes[1].entries).toEqual([]);
  });

  test('appends after existing lane entries', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'HEAD', lane: 's1' });
    store.place(WS, { expected_revision: 1, bead_id: 'A' });
    store.place(WS, { expected_revision: 2, bead_id: 'B' });

    const r = store.applySerialGroup(WS, {
      expected_revision: 3,
      lane: 's1',
      ordered_bead_ids: ['A', 'B']
    });

    expect(r.ok).toBe(true);
    expect(r.queue.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual([
      'HEAD',
      'A',
      'B'
    ]);
  });

  test('applies the blocks correction as the final order', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    store.place(WS, { expected_revision: 1, bead_id: 'B' });

    const r = store.applySerialGroup(WS, {
      expected_revision: 2,
      lane: 's1',
      ordered_bead_ids: ['B', 'A'],
      blocks_edges: [{ blocker: 'A', blockee: 'B' }]
    });

    expect(r.ok).toBe(true);
    expect(r.queue.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual([
      'A',
      'B'
    ]);
  });

  test('rejects the whole submission when one bead is not queued', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    const before = store.snapshot(WS);

    const r = store.applySerialGroup(WS, {
      expected_revision: before.revision,
      lane: 's1',
      ordered_bead_ids: ['A', 'GHOST']
    });

    expect(r.ok).toBe(false);
    expect(r.conflict).toBe(false);
    expect(r.reason).toBe('member_absent');
    expect(store.snapshot(WS)).toEqual(before);
  });

  test('rejects the whole submission when one bead has an active lineage', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    store.place(WS, { expected_revision: 1, bead_id: 'B' });
    store.appendAttempt(WS, {
      expected_revision: 2,
      attempt: { attempt_id: 'att-B', bead_id: 'B', status: 'running' }
    });
    const before = store.snapshot(WS);

    const r = store.applySerialGroup(WS, {
      expected_revision: before.revision,
      lane: 's1',
      ordered_bead_ids: ['A', 'B']
    });

    expect(r.ok).toBe(false);
    expect(r.reason).toBe('member_active');
    expect(store.snapshot(WS)).toEqual(before);
  });

  test('rejects a lane outside the configured count and a short group', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    store.place(WS, { expected_revision: 1, bead_id: 'B' });

    const bad_lane = store.applySerialGroup(WS, {
      expected_revision: 2,
      lane: 's4',
      ordered_bead_ids: ['A', 'B']
    });
    const short = store.applySerialGroup(WS, {
      expected_revision: 2,
      lane: 's1',
      ordered_bead_ids: ['A']
    });

    expect(bad_lane.ok).toBe(false);
    expect(bad_lane.reason).toBe('lane_invalid');
    expect(short.ok).toBe(false);
    expect(short.reason).toBe('group_size');
    expect(store.snapshot(WS).revision).toBe(2);
  });

  test('rejects a stale revision as a conflict without writing', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    store.place(WS, { expected_revision: 1, bead_id: 'B' });

    const r = store.applySerialGroup(WS, {
      expected_revision: 0,
      lane: 's1',
      ordered_bead_ids: ['A', 'B']
    });

    expect(r.ok).toBe(false);
    expect(r.conflict).toBe(true);
    expect(store.snapshot(WS).serial_lanes[0].entries).toEqual([]);
  });

  test('rejects duplicated member ids', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });

    const r = store.applySerialGroup(WS, {
      expected_revision: 1,
      lane: 's1',
      ordered_bead_ids: ['A', 'A']
    });

    expect(r.ok).toBe(false);
    expect(r.reason).toBe('duplicate_member');
  });
});

describe('worker/queue-store — 레인 이동 시 lineage 재바인딩 (UI-04vo 구현 리뷰 1)', () => {
  test('moving a failed bead to another lane moves its lane occupancy with it', () => {
    const store = createQueueStore();
    let rev = store.setSerialLaneCount(WS, {
      expected_revision: 0,
      count: 2
    }).queue.revision;
    rev = store.place(WS, {
      expected_revision: rev,
      bead_id: 'A',
      lane: 's1'
    }).queue.revision;
    rev = store.place(WS, {
      expected_revision: rev,
      bead_id: 'B',
      lane: 's1'
    }).queue.revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: {
        attempt_id: 'a1',
        bead_id: 'A',
        status: 'failed',
        serial_lane_id: 's1'
      }
    });

    const moved = store.place(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'A',
      lane: 's2'
    });

    expect(moved.ok).toBe(true);
    expect(moved.queue.attempts.a1.serial_lane_id).toBe('s2');
  });

  test('removing a bead from the waiting area clears its lane occupancy', () => {
    const store = createQueueStore();
    const rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'A',
      lane: 's1'
    }).queue.revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: {
        attempt_id: 'a1',
        bead_id: 'A',
        status: 'failed',
        serial_lane_id: 's1'
      }
    });

    const removed = store.remove(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'A'
    });

    expect(removed.ok).toBe(true);
    expect(removed.queue.attempts.a1.serial_lane_id).toBeNull();
  });

  test('keeps a released attempt lane snapshot as history', () => {
    const store = createQueueStore();
    const rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'A',
      lane: 's1'
    }).queue.revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: {
        attempt_id: 'a1',
        bead_id: 'A',
        status: 'done',
        serial_lane_id: 's1'
      }
    });

    const moved = store.place(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'A',
      lane: 's2'
    });

    expect(moved.queue.attempts.a1.serial_lane_id).toBe('s1');
  });

  test('releases the lane when a failed lineage lands in done', () => {
    const store = createQueueStore();
    const rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'A',
      lane: 's1'
    }).queue.revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: {
        attempt_id: 'a1',
        bead_id: 'A',
        status: 'failed',
        serial_lane_id: 's1'
      }
    });

    const moved = store.moveToDone(WS, { bead_id: 'A' });

    expect(moved.ok).toBe(true);
    expect(moved.queue.attempts.a1.serial_lane_id).toBeNull();
    expect(moved.queue.attempts.a1.status).toBe('failed');
  });

  test('keeps a running attempt bound to its lane when its bead lands in done', () => {
    const store = createQueueStore();
    const rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'A',
      lane: 's1'
    }).queue.revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: {
        attempt_id: 'a1',
        bead_id: 'A',
        status: 'running',
        serial_lane_id: 's1'
      }
    });

    const moved = store.moveToDone(WS, { bead_id: 'A' });

    expect(moved.queue.attempts.a1.serial_lane_id).toBe('s1');
  });

  test('heals a lane binding a landed lineage left behind on load', () => {
    const store = createQueueStore();
    const rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'A',
      lane: 's1'
    }).queue.revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: {
        attempt_id: 'a1',
        bead_id: 'A',
        status: 'failed',
        serial_lane_id: 's1'
      }
    });
    store.moveToDone(WS, { bead_id: 'A' });
    // The residue every queue.json written before the release carries.
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.attempts.a1.serial_lane_id = 's1';
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));

    const loaded = createQueueStore().load(WS);

    expect(loaded.attempts.a1.serial_lane_id).toBeNull();
    expect(loaded.done.map((e) => e.bead_id)).toEqual(['A']);
  });

  test('place applies the blocks correction to the durable lane order', () => {
    const store = createQueueStore();
    const rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'B',
      lane: 's1'
    }).queue.revision;

    const placed = store.place(WS, {
      expected_revision: rev,
      bead_id: 'A',
      lane: 's1',
      blocks_edges: [{ blocker: 'A', blockee: 'B' }]
    });

    expect(placed.queue.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual([
      'A',
      'B'
    ]);
  });

  test('reorder cannot leave a blocker behind its blockee', () => {
    const store = createQueueStore();
    let rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'A',
      lane: 's1'
    }).queue.revision;
    rev = store.place(WS, {
      expected_revision: rev,
      bead_id: 'B',
      lane: 's1'
    }).queue.revision;

    const reordered = store.reorder(WS, {
      expected_revision: rev,
      bead_id: 'B',
      lane: 's1',
      to_index: 0,
      blocks_edges: [{ blocker: 'A', blockee: 'B' }]
    });

    expect(
      reordered.queue.serial_lanes[0].entries.map((e) => e.bead_id)
    ).toEqual(['A', 'B']);
  });

  test('a blocks cycle leaves the user order untouched', () => {
    const store = createQueueStore();
    const rev = store.place(WS, {
      expected_revision: 0,
      bead_id: 'B',
      lane: 's1'
    }).queue.revision;

    const placed = store.place(WS, {
      expected_revision: rev,
      bead_id: 'A',
      lane: 's1',
      blocks_edges: [
        { blocker: 'A', blockee: 'B' },
        { blocker: 'B', blockee: 'A' }
      ]
    });

    expect(placed.queue.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual([
      'B',
      'A'
    ]);
  });

  test('persists an attempt-less stale-work operation across restart', () => {
    const store = createQueueStore();
    store.setSerialLaneCount(WS, { expected_revision: 0, count: 2 });
    const placed = store.place(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'UI-stale',
      lane: 's2'
    });

    const created = store.createDiscardOperation(WS, {
      expected_revision: placed.queue.revision,
      operation: {
        operation_id: 'stale-work-1',
        bead_id: 'UI-stale',
        attempt_id: null,
        kind: 'stale_work_backup_fresh',
        source_snapshot: {
          repo: '/repo',
          worktree: '/repo/.worktrees/UI-stale',
          branch: 'UI-stale',
          source_head: 'a'.repeat(40),
          base_oid: 'b'.repeat(40),
          identity_digest: 'identity-1'
        }
      }
    });
    const restarted = createQueueStore().load(WS);

    expect(created.ok).toBe(true);
    expect(restarted.discard_operations['stale-work-1']).toMatchObject({
      attempt_id: null,
      kind: 'stale_work_backup_fresh',
      phase: 'requested'
    });
    expect(
      restarted.serial_lanes[1].entries.map((entry) => entry.bead_id)
    ).toEqual(['UI-stale']);
  });

  test('fences lane mutations until stale-work recovery completes', () => {
    const store = createQueueStore();
    store.place(WS, {
      expected_revision: 0,
      bead_id: 'UI-stale',
      lane: 's1'
    });
    store.recordAdmission(WS, {
      bead_id: 'UI-stale',
      reason: 'worktree_stale_work'
    });
    const created = store.createDiscardOperation(WS, {
      expected_revision: store.snapshot(WS).revision,
      operation: {
        operation_id: 'stale-work-1',
        bead_id: 'UI-stale',
        attempt_id: null,
        kind: 'stale_work_backup_fresh',
        source_snapshot: { repo: '/repo' }
      }
    });
    const active_revision = created.queue.revision;

    const moved = store.place(WS, {
      expected_revision: active_revision,
      bead_id: 'UI-stale',
      lane: 's2'
    });
    const reordered = store.reorder(WS, {
      expected_revision: active_revision,
      bead_id: 'UI-stale',
      lane: 's1',
      to_index: 0
    });
    const removed = store.remove(WS, {
      expected_revision: active_revision,
      bead_id: 'UI-stale'
    });

    expect(moved.ok).toBe(false);
    expect(reordered.ok).toBe(false);
    expect(removed.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(active_revision);
    expect(store.snapshot(WS).serial_lanes[0].entries[0].bead_id).toBe(
      'UI-stale'
    );

    const completed = store.completeDiscardOperation(WS, {
      operation_id: 'stale-work-1',
      expected_phase: 'requested'
    });

    expect(completed.ok).toBe(true);
    expect(completed.queue.admission['UI-stale']).toBeUndefined();
    expect(completed.queue.serial_lanes[0].entries[0].bead_id).toBe('UI-stale');
  });
});

describe('worker/queue-store — external OPEN PR 레인 reconcile (UI-75xw)', () => {
  /**
   * @param {any} store
   * @param {string} [lane]
   */
  function placeExternal(store, lane = 's1') {
    store.place(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'UI-ext',
      lane
    });
  }

  /**
   * @param {any} store
   * @param {string} status
   */
  function appendExternalAttempt(store, status) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: `attempt-${status}`,
        bead_id: 'UI-ext',
        status
      }
    });
  }

  /**
   * @param {ReturnType<typeof createQueueStore>} store
   */
  function reconcile(store) {
    return store.reconcileExternalPrWait(WS, {
      bead_id: 'UI-ext',
      pr_url: 'https://github.com/o/r/pull/75',
      head_ref: 'UI-ext'
    });
  }

  test('moves a terminal serial member and records observed PR identity and lane', () => {
    const store = createQueueStore({ now: () => 75 });
    placeExternal(store);
    appendExternalAttempt(store, 'done');

    const result = reconcile(store);

    expect(result.ok).toBe(true);
    expect(result.queue.serial_lanes[0].entries).toEqual([]);
    expect(result.queue.pr_wait).toEqual([
      expect.objectContaining({
        bead_id: 'UI-ext',
        added_at: 75,
        pr_url: 'https://github.com/o/r/pull/75',
        head_ref: 'UI-ext',
        serial_lane_id: 's1'
      })
    ]);
  });

  test('moves a parallel member with no attempts', () => {
    const store = createQueueStore();
    placeExternal(store, 'parallel');

    const result = reconcile(store);

    expect(result.ok).toBe(true);
    expect(result.queue.queue).toEqual([]);
    expect(result.queue.pr_wait[0].bead_id).toBe('UI-ext');
    expect(result.queue.pr_wait[0].serial_lane_id).toBeUndefined();
  });

  test('does not move a nonmember', () => {
    const store = createQueueStore();

    const result = reconcile(store);

    expect(result.ok).toBe(false);
    expect(result.queue.pr_wait).toEqual([]);
  });

  test('does not move a member with a running attempt', () => {
    const store = createQueueStore();
    placeExternal(store);
    appendExternalAttempt(store, 'running');

    const result = reconcile(store);

    expect(result.ok).toBe(false);
    expect(result.queue.serial_lanes[0].entries[0].bead_id).toBe('UI-ext');
  });

  test('does not move a member with a paused attempt', () => {
    const store = createQueueStore();
    placeExternal(store);
    appendExternalAttempt(store, 'paused');

    const result = reconcile(store);

    expect(result.ok).toBe(false);
    expect(result.queue.serial_lanes[0].entries[0].bead_id).toBe('UI-ext');
  });

  test('does not move a discard-fenced member', () => {
    const store = createQueueStore();
    placeExternal(store);
    store.createDiscardOperation(WS, {
      expected_revision: store.snapshot(WS).revision,
      operation: {
        operation_id: 'discard-ext',
        bead_id: 'UI-ext',
        source_snapshot: { repo: '/repo', branch: 'UI-ext' }
      }
    });

    const result = reconcile(store);

    expect(result.ok).toBe(false);
    expect(result.queue.serial_lanes[0].entries[0].bead_id).toBe('UI-ext');
  });

  test('keeps repeated reconciliation idempotent', () => {
    const store = createQueueStore();
    placeExternal(store);

    const first = reconcile(store);
    const second = reconcile(store);

    expect(first.ok).toBe(true);
    expect(second.ok).toBe(false);
    expect(second.queue.pr_wait.map((entry) => entry.bead_id)).toEqual([
      'UI-ext'
    ]);
  });

  test('records the launch lane on the normal completion path', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'lane-attempt',
        bead_id: 'UI-lane',
        status: 'running',
        serial_lane_id: 's1'
      }
    });

    const result = store.moveToPrWait(WS, {
      bead_id: 'UI-lane',
      attempt_id: 'lane-attempt',
      patch: { status: 'done' }
    });

    expect(result.queue.pr_wait[0].serial_lane_id).toBe('s1');
  });

  test('reports lane_occupied for a rejected manual merge placement', () => {
    const store = createQueueStore();
    placeExternal(store);

    const result = store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        {
          bead_id: 'UI-ext',
          head_sha: 'a'.repeat(40),
          target_base: 'main',
          external: true
        }
      ]
    });

    expect(result).toMatchObject({
      ok: false,
      conflict: false,
      reason: 'lane_occupied'
    });
  });
});

describe('worker/queue-store repo_ops_opt_out (UI-lsti §1)', () => {
  test('defaults both kinds to running the declared operation', () => {
    const store = createQueueStore();

    const queue = store.snapshot(WS);

    expect(queue.repo_ops_opt_out).toEqual({ verify: false, deploy: false });
  });

  test('opts one kind out under the expected revision', () => {
    const store = createQueueStore();

    const result = store.setRepoOpsOptOut(WS, {
      expected_revision: store.snapshot(WS).revision,
      kind: 'verify',
      opted_out: true
    });

    expect(result.queue.repo_ops_opt_out).toEqual({
      verify: true,
      deploy: false
    });
  });

  test('leaves the other kind untouched', () => {
    const store = createQueueStore();
    store.setRepoOpsOptOut(WS, {
      expected_revision: store.snapshot(WS).revision,
      kind: 'deploy',
      opted_out: true
    });

    const result = store.setRepoOpsOptOut(WS, {
      expected_revision: store.snapshot(WS).revision,
      kind: 'verify',
      opted_out: true
    });

    expect(result.queue.repo_ops_opt_out).toEqual({
      verify: true,
      deploy: true
    });
  });

  test('opts a kind back in', () => {
    const store = createQueueStore();
    store.setRepoOpsOptOut(WS, {
      expected_revision: store.snapshot(WS).revision,
      kind: 'deploy',
      opted_out: true
    });

    const result = store.setRepoOpsOptOut(WS, {
      expected_revision: store.snapshot(WS).revision,
      kind: 'deploy',
      opted_out: false
    });

    expect(result.queue.repo_ops_opt_out.deploy).toBe(false);
  });

  test('reports a conflict on a stale revision without mutating', () => {
    const store = createQueueStore();
    const stale = store.snapshot(WS).revision;
    store.setRepoOpsOptOut(WS, {
      expected_revision: stale,
      kind: 'verify',
      opted_out: true
    });

    const result = store.setRepoOpsOptOut(WS, {
      expected_revision: stale,
      kind: 'deploy',
      opted_out: true
    });

    expect(result).toMatchObject({ ok: false, conflict: true });
    expect(result.queue.repo_ops_opt_out).toEqual({
      verify: true,
      deploy: false
    });
  });

  test('refuses an unknown kind', () => {
    const store = createQueueStore();
    const before = store.snapshot(WS).revision;

    const result = store.setRepoOpsOptOut(WS, {
      expected_revision: before,
      kind: /** @type {any} */ ('publish'),
      opted_out: true
    });

    expect(result).toMatchObject({ ok: false, conflict: false });
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('refuses a non-boolean opted_out', () => {
    const store = createQueueStore();
    const before = store.snapshot(WS).revision;

    const result = store.setRepoOpsOptOut(WS, {
      expected_revision: before,
      kind: 'verify',
      opted_out: /** @type {any} */ ('yes')
    });

    expect(result).toMatchObject({ ok: false, conflict: false });
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('round-trips the setting through a fresh store instance', () => {
    const first = createQueueStore();
    first.setRepoOpsOptOut(WS, {
      expected_revision: first.snapshot(WS).revision,
      kind: 'deploy',
      opted_out: true
    });

    const reloaded = createQueueStore().snapshot(WS);

    expect(reloaded.repo_ops_opt_out).toEqual({
      verify: false,
      deploy: true
    });
  });

  test('reads a legacy queue file with no key as both kinds running', () => {
    const store = createQueueStore();
    store.setSlots(WS, {
      expected_revision: store.snapshot(WS).revision,
      slots: 3
    });
    const file = queueFilePath(WS);
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    delete raw.repo_ops_opt_out;
    fs.writeFileSync(file, JSON.stringify(raw));

    const reloaded = createQueueStore().snapshot(WS);

    expect(reloaded.repo_ops_opt_out).toEqual({
      verify: false,
      deploy: false
    });
  });

  test('takes only booleans from a malformed persisted value', () => {
    const store = createQueueStore();
    store.setSlots(WS, {
      expected_revision: store.snapshot(WS).revision,
      slots: 3
    });
    const file = queueFilePath(WS);
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    raw.repo_ops_opt_out = { verify: 'true', deploy: true };
    fs.writeFileSync(file, JSON.stringify(raw));

    const reloaded = createQueueStore().snapshot(WS);

    expect(reloaded.repo_ops_opt_out).toEqual({
      verify: false,
      deploy: true
    });
  });

  test('normalizes a non-object persisted value to both kinds running', () => {
    const store = createQueueStore();
    store.setSlots(WS, {
      expected_revision: store.snapshot(WS).revision,
      slots: 3
    });
    const file = queueFilePath(WS);
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    raw.repo_ops_opt_out = 'verify';
    fs.writeFileSync(file, JSON.stringify(raw));

    const reloaded = createQueueStore().snapshot(WS);

    expect(reloaded.repo_ops_opt_out).toEqual({
      verify: false,
      deploy: false
    });
  });
});

describe('worker/queue-store completion auto-resolution (UI-hk74)', () => {
  const HEAD_SHA = 'a'.repeat(40);
  const BASE_SHA = 'b'.repeat(40);
  const MERGED_SHA = 'c'.repeat(40);

  /**
   * @param {Record<string, unknown>} [patch]
   */
  function subjectOf(patch = {}) {
    return {
      role: 'root',
      bead_id: 'UI-root',
      pr_url: 'https://github.com/o/r/pull/1',
      head_sha: HEAD_SHA,
      base_sha: BASE_SHA,
      merged_sha: null,
      ...patch
    };
  }

  /**
   * @param {Record<string, unknown>} [patch]
   * @returns {any}
   */
  function resolutionOf(patch = {}) {
    return {
      class: 'retry',
      origin_reason: 'cleanup_dispatch_failed',
      origin_stage: 'post_merge_cleanup',
      return_phase: 'cleaning',
      attempts: 1,
      next_at: 5_000,
      last_error: 'boom',
      op: {
        completion_op_id: 'completion-abc',
        failure_key: null,
        continuation: {
          continuation: 'prior_session',
          decision_token: 'token-1'
        },
        continuation_mismatch: null,
        operation_id: null,
        head_sha: HEAD_SHA,
        base_sha: BASE_SHA,
        merged_sha: null,
        cleanup_cursor: null
      },
      ...patch
    };
  }

  /**
   * @param {Record<string, unknown>} [patch]
   */
  function writeIntent(patch = {}) {
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        auto_merge: true,
        completion_intents: {
          'UI-root': {
            target_base: 'main',
            phase: 'gating',
            subject: subjectOf(),
            active_op: null,
            auto_resolution: null,
            paused_resolution: null,
            terminal_reason: null,
            ...patch
          }
        }
      })
    );
    return createQueueStore();
  }

  const FAILURE_KEY = {
    stage: 'post_merge_cleanup',
    reason: 'cleanup_failed',
    subject_sha: HEAD_SHA,
    base_sha: BASE_SHA,
    result_digest: 'd'.repeat(64)
  };

  test('holds the retrying phase while a re-run opens its operation', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf()
    });

    const prepared = store.prepareCompletionOp(WS, {
      root_bead_id: 'UI-root',
      phase: 'cleaning',
      op: {
        op_id: 'completion-abc',
        kind: 'retry_cleanup',
        failure_key: FAILURE_KEY,
        attempt_id: null,
        status: 'prepared'
      }
    });

    expect(prepared.ok).toBe(true);
    expect(prepared.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'retrying',
      active_op: { kind: 'retry_cleanup' }
    });
  });

  test('preserves the retry budget across a re-run and a cold reload', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf({ attempts: 2 })
    });
    store.prepareCompletionOp(WS, {
      root_bead_id: 'UI-root',
      phase: 'cleaning',
      op: {
        op_id: 'completion-abc',
        kind: 'retry_cleanup',
        failure_key: FAILURE_KEY,
        attempt_id: null,
        status: 'prepared'
      }
    });

    const reloaded =
      createQueueStore().snapshot(WS).completion_intents['UI-root'];

    expect(reloaded).toMatchObject({
      phase: 'retrying',
      auto_resolution: { attempts: 2 }
    });
  });

  test('releases the phase and the record together on a consumed operation', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf(),
      active_op: {
        op_id: 'completion-abc',
        kind: 'retry_cleanup',
        failure_key: FAILURE_KEY,
        attempt_id: null,
        status: 'prepared'
      }
    });

    const advanced = store.advanceCompletionOp(WS, {
      root_bead_id: 'UI-root',
      op_id: 'completion-abc',
      status: 'consumed',
      next_phase: 'cleaning',
      clear: true
    });

    expect(advanced.ok).toBe(true);
    expect(advanced.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'cleaning',
      auto_resolution: null
    });
  });

  test('retires the named failed operation with the budget it spends', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf(),
      active_op: {
        op_id: 'completion-abc',
        kind: 'retry_cleanup',
        failure_key: FAILURE_KEY,
        attempt_id: null,
        status: 'prepared'
      }
    });

    const bumped = store.updateCompletionAutoResolution(WS, {
      root_bead_id: 'UI-root',
      patch: { attempts: 2, next_at: null, last_error: null },
      supersede_op_id: 'completion-abc'
    });

    expect(bumped.ok).toBe(true);
    expect(bumped.queue.completion_intents['UI-root']).toMatchObject({
      active_op: null,
      auto_resolution: { attempts: 2 }
    });
  });

  test('refuses to retire an operation the record does not name', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf(),
      active_op: {
        op_id: 'completion-live',
        kind: 'merge_subject',
        failure_key: FAILURE_KEY,
        attempt_id: null,
        status: 'dispatched'
      }
    });

    const bumped = store.updateCompletionAutoResolution(WS, {
      root_bead_id: 'UI-root',
      patch: { attempts: 2 },
      supersede_op_id: 'completion-abc'
    });

    expect(bumped.ok).toBe(false);
    expect(store.snapshot(WS).completion_intents['UI-root']).toMatchObject({
      active_op: { op_id: 'completion-live' }
    });
  });

  test('round-trips an auto_resolution in its own phase', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf()
    });

    const intent = store.snapshot(WS).completion_intents['UI-root'];

    expect(intent.phase).toBe('retrying');
    expect(intent.auto_resolution).toEqual(resolutionOf());
  });

  test('drops an auto_resolution recorded in an unrelated phase', () => {
    const store = writeIntent({
      phase: 'gating',
      auto_resolution: resolutionOf()
    });

    const intent = store.snapshot(WS).completion_intents['UI-root'];

    expect(intent.phase).toBe('gating');
    expect(intent.auto_resolution).toBe(null);
  });

  test('fails an auto-resolution phase closed when its record is missing', () => {
    const store = writeIntent({ phase: 'retrying', auto_resolution: null });

    const intent = store.snapshot(WS).completion_intents['UI-root'];

    expect(intent.phase).toBe('needs_human');
    expect(intent.terminal_reason?.reason).toBe('intent_state_invalid');
  });

  test('fails a class that contradicts its phase closed', () => {
    const store = writeIntent({
      phase: 'reviewing',
      auto_resolution: resolutionOf()
    });

    const intent = store.snapshot(WS).completion_intents['UI-root'];

    expect(intent.phase).toBe('needs_human');
  });

  test('rejects a next_at on a class that has no schedule', () => {
    const store = writeIntent({
      phase: 'waiting_metadata',
      auto_resolution: resolutionOf({
        class: 'metadata_watch',
        origin_reason: 'receipt_unbacked:unit_plan_mismatch',
        origin_stage: 'coordinator',
        return_phase: 'gating',
        attempts: 0,
        next_at: 5_000
      })
    });

    const intent = store.snapshot(WS).completion_intents['UI-root'];

    expect(intent.phase).toBe('needs_human');
  });

  test('rejects an attempts count past the retry cap', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf({ attempts: 4 })
    });

    const intent = store.snapshot(WS).completion_intents['UI-root'];

    expect(intent.phase).toBe('needs_human');
  });

  test('rejects a return_phase that is itself a wait', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf({ return_phase: 'retrying' })
    });

    const intent = store.snapshot(WS).completion_intents['UI-root'];

    expect(intent.phase).toBe('needs_human');
  });

  test('enters a resolution phase from the class alone', () => {
    const store = writeIntent();

    const result = store.startCompletionAutoResolution(WS, {
      root_bead_id: 'UI-root',
      resolution: resolutionOf({ attempts: 0, next_at: 1_000 })
    });

    expect(result.ok).toBe(true);
    expect(result.queue.completion_intents['UI-root'].phase).toBe('retrying');
  });

  test('refuses to enter a resolution from needs_human', () => {
    const store = writeIntent({
      phase: 'needs_human',
      terminal_reason: {
        reason: 'ownership_undecidable',
        stage: 'coordinator',
        failure_key: null,
        evidence: null,
        log_path: null,
        at: 1
      }
    });

    const result = store.startCompletionAutoResolution(WS, {
      root_bead_id: 'UI-root',
      resolution: resolutionOf()
    });

    expect(result.ok).toBe(false);
  });

  test('updates only the bounded per-attempt fields', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf({ attempts: 0, next_at: 1_000 })
    });

    const result = store.updateCompletionAutoResolution(WS, {
      root_bead_id: 'UI-root',
      patch: { attempts: 2, next_at: 9_000, last_error: 'again' }
    });

    expect(result.queue.completion_intents['UI-root'].auto_resolution).toEqual(
      resolutionOf({ attempts: 2, next_at: 9_000, last_error: 'again' })
    );
  });

  test('clears a resolution back to its return phase', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf()
    });

    const result = store.clearCompletionAutoResolution(WS, {
      root_bead_id: 'UI-root',
      phase: 'cleaning'
    });

    expect(result.ok).toBe(true);
    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'cleaning',
      auto_resolution: null
    });
  });

  test('refuses to clear a resolution into another wait', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf()
    });

    const result = store.clearCompletionAutoResolution(WS, {
      root_bead_id: 'UI-root',
      phase: 'reviewing'
    });

    expect(result.ok).toBe(false);
  });

  test('terminalization drops the resolution record', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf()
    });

    const result = store.terminalizeCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      terminal: {
        reason: 'retry_exhausted:repair_dispatch_failed',
        stage: 'repair_dispatch',
        failure_key: null,
        evidence: null,
        log_path: null,
        at: 2
      }
    });

    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'needs_human',
      auto_resolution: null,
      paused_resolution: null
    });
  });

  test('parks a resolution across a pause and restores it on resume', () => {
    const store = writeIntent({
      phase: 'retrying',
      auto_resolution: resolutionOf({ attempts: 2 })
    });

    store.pauseCompletionIntent(WS, { root_bead_id: 'UI-root' });
    const paused = store.snapshot(WS).completion_intents['UI-root'];
    const resumed = store.resumeCompletionIntent(WS, {
      root_bead_id: 'UI-root'
    });

    expect(paused).toMatchObject({
      phase: 'paused',
      auto_resolution: null,
      paused_resolution: resolutionOf({ attempts: 2 })
    });
    expect(resumed.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'retrying',
      auto_resolution: resolutionOf({ attempts: 2 }),
      paused_resolution: null
    });
  });

  test('round-trips a parked resolution through a cold load', () => {
    const store = writeIntent({
      phase: 'paused',
      paused_resolution: resolutionOf({ attempts: 3, next_at: null })
    });

    const intent = store.snapshot(WS).completion_intents['UI-root'];

    expect(intent.paused_resolution).toEqual(
      resolutionOf({ attempts: 3, next_at: null })
    );
  });

  test('drops a parked resolution outside paused', () => {
    const store = writeIntent({
      phase: 'gating',
      paused_resolution: resolutionOf()
    });

    const intent = store.snapshot(WS).completion_intents['UI-root'];

    expect(intent.paused_resolution).toBe(null);
  });

  test('a consumed operation ends the resolution it re-ran', () => {
    const failure_key = {
      stage: 'post_merge_cleanup',
      reason: 'cleanup_incomplete',
      subject_sha: MERGED_SHA,
      base_sha: BASE_SHA,
      result_digest: 'f'.repeat(64)
    };
    const store = writeIntent({
      phase: 'retrying',
      subject: subjectOf({ merged_sha: MERGED_SHA }),
      auto_resolution: resolutionOf({
        origin_reason: 'cleanup_prerecord_failed',
        return_phase: 'cleaning'
      }),
      active_op: {
        op_id: 'completion-cleanup',
        kind: 'retry_cleanup',
        failure_key,
        attempt_id: null,
        status: 'dispatched'
      }
    });

    const result = store.advanceCompletionOp(WS, {
      root_bead_id: 'UI-root',
      op_id: 'completion-cleanup',
      status: 'consumed',
      next_phase: 'cleaning',
      clear: true
    });

    expect(result.queue.completion_intents['UI-root']).toMatchObject({
      phase: 'cleaning',
      active_op: null,
      auto_resolution: null
    });
  });
});

describe('worker/queue-store review session attempts (UI-d7fy §5.5)', () => {
  const HEAD_SHA = 'a'.repeat(40);

  test('defaults a legacy attempt record to the implementation kind', () => {
    const attempt = makeAttempt({ attempt_id: 'att-1', bead_id: 'UI-1' });

    expect(attempt.kind).toBe('implementation');
    expect(attempt.origin).toBe(null);
  });

  test('round-trips the review session attempt fields', () => {
    const store = createQueueStore();

    store.upsertReviewSessionAttempt(WS, {
      attempt_id: 'review-1',
      patch: {
        bead_id: 'UI-1',
        kind: 'review_session',
        origin: 'click',
        authority_id: 'authority-1',
        head_sha: HEAD_SHA,
        log_path: 'review-sessions/review-1.log.jsonl',
        status: 'running'
      }
    });

    expect(createQueueStore().snapshot(WS).attempts['review-1']).toMatchObject({
      kind: 'review_session',
      origin: 'click',
      authority_id: 'authority-1',
      head_sha: HEAD_SHA,
      log_path: 'review-sessions/review-1.log.jsonl'
    });
  });

  test('adopts a prerecorded attempt without losing earlier fields', () => {
    const store = createQueueStore();
    store.upsertReviewSessionAttempt(WS, {
      attempt_id: 'review-1',
      patch: { bead_id: 'UI-1', kind: 'review_session', origin: 'click' }
    });

    const result = store.upsertReviewSessionAttempt(WS, {
      attempt_id: 'review-1',
      patch: { status: 'running', session_id: 'sess-1' }
    });

    expect(result.queue.attempts['review-1']).toMatchObject({
      kind: 'review_session',
      origin: 'click',
      status: 'running',
      session_id: 'sess-1'
    });
  });

  test('refuses to overwrite a terminal record of the same attempt', () => {
    const store = createQueueStore();
    store.upsertReviewSessionAttempt(WS, {
      attempt_id: 'review-1',
      patch: { bead_id: 'UI-1', kind: 'review_session', status: 'done' }
    });

    const result = store.upsertReviewSessionAttempt(WS, {
      attempt_id: 'review-1',
      patch: { status: 'running' }
    });

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('review_session_attempt_terminal');
    expect(store.snapshot(WS).attempts['review-1'].status).toBe('done');
  });

  test('refuses a patch that names no review session kind', () => {
    const store = createQueueStore();

    const result = store.upsertReviewSessionAttempt(WS, {
      attempt_id: 'review-1',
      patch: { bead_id: 'UI-1' }
    });

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('review_session_attempt_invalid');
  });
});

describe('worker/queue-store — retired head-review migration (UI-d7fy §3.8)', () => {
  const HEAD = 'a'.repeat(40);

  /**
   * A `queue.json` written by the head-review build: one running `head_review`
   * attempt and one queue entry whose journal is mid-flight.
   *
   * @param {Record<string, unknown>} extra
   */
  function seedLegacyFile(extra = {}) {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 3,
        attempts: {
          'review:authority-1:aaa': {
            attempt_id: 'review:authority-1:aaa',
            bead_id: 'UI-1',
            kind: 'head_review',
            status: 'running',
            pid: 4242,
            started_at: 1000
          }
        },
        merge_queue: [
          {
            bead_id: 'UI-1',
            resolution_rounds: 0,
            rebase_rounds: 0,
            resolution: null,
            authority: {
              id: 'authority-1',
              source: 'manual',
              granted_at: 1,
              requested_head_sha: HEAD,
              target_base: 'main'
            },
            head_review: {
              authority_id: 'authority-1',
              head_sha: HEAD,
              state: 'reviewing',
              reviewer: 'codex',
              effort: 'xhigh',
              reviewer_source: 'bead',
              review_attempt_id: 'review:authority-1:aaa',
              findings_digest: null,
              repair_attempt_id: null,
              repair_rounds: 0,
              approval_source: null,
              receipt: null,
              failure_reason: null,
              updated_at: 2
            }
          }
        ],
        ...extra
      })
    );
  }

  test('terminalizes a running retired-kind attempt as retired_kind', () => {
    seedLegacyFile();
    const store = createQueueStore();

    const attempt = store.snapshot(WS).attempts['review:authority-1:aaa'];

    expect(attempt).toMatchObject({
      status: 'failed',
      cause: 'retired_kind',
      kind: 'retired_kind'
    });
    // The pid stays readable: the caller still owes this process a stop.
    expect(attempt.pid).toBe(4242);
  });

  test('keeps a migrated retired-kind attempt out of implementation occupancy', () => {
    seedLegacyFile();
    const store = createQueueStore();

    const { winners } = activeAttemptStates(
      store.snapshot(WS).attempts,
      new Map()
    );

    expect(winners.has('UI-1')).toBe(false);
  });

  test('names the running retired-kind attempts the caller must stop', () => {
    seedLegacyFile();
    const store = createQueueStore();

    expect(store.pendingRetiredKindAttempts(WS)).toEqual([
      {
        attempt_id: 'review:authority-1:aaa',
        bead_id: 'UI-1',
        kind: 'head_review'
      }
    ]);
  });

  test('moves a mid-flight journal entry to a gate hold and keeps authority', () => {
    seedLegacyFile();
    const store = createQueueStore();

    const entry = store.snapshot(WS).merge_queue[0];

    expect(entry.authority).toMatchObject({ id: 'authority-1' });
    expect(entry.hold).toMatchObject({
      reason: 'review_receipt_missing',
      head_sha: HEAD
    });
    expect('head_review' in entry).toBe(false);
  });

  test('drops the head_review field from the saved file', () => {
    seedLegacyFile();
    const store = createQueueStore();

    store.commitRetiredKindAttempts(WS);

    const saved = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect(saved.merge_queue[0].head_review).toBeUndefined();
    expect(saved.merge_queue[0].authority.id).toBe('authority-1');
    expect(saved.attempts['review:authority-1:aaa'].cause).toBe('retired_kind');
    expect(store.pendingRetiredKindAttempts(WS)).toEqual([]);
  });

  test('loads a settled head_review journal by dropping the field alone', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 1,
        merge_queue: [
          {
            bead_id: 'UI-1',
            resolution_rounds: 0,
            rebase_rounds: 0,
            resolution: null,
            authority: {
              id: 'authority-1',
              source: 'manual',
              granted_at: 1,
              requested_head_sha: HEAD,
              target_base: 'main'
            },
            head_review: {
              authority_id: 'authority-1',
              head_sha: HEAD,
              state: 'approved',
              reviewer: 'codex',
              effort: 'xhigh',
              reviewer_source: null,
              review_attempt_id: null,
              findings_digest: null,
              repair_attempt_id: null,
              repair_rounds: 0,
              approval_source: 'existing_current',
              receipt: `codex@${HEAD}`,
              failure_reason: null,
              updated_at: 2
            }
          }
        ]
      })
    );

    const entry = createQueueStore().snapshot(WS).merge_queue[0];

    // `approved`/`failed` had nowhere left to go: the gate re-judges them.
    expect(entry.authority).toMatchObject({ id: 'authority-1' });
    expect(entry.hold).toBeUndefined();
    expect('head_review' in entry).toBe(false);
  });
});

describe('worker/queue-store — 연결 레인 arm 축 (UI-jaua §5.1)', () => {
  test('arms only the named parallel entries for a lane', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    store.place(WS, { expected_revision: 1, bead_id: 'B' });

    const result = store.arm(WS, {
      expected_revision: 2,
      bead_ids: ['A'],
      lane_id: 'cl_1'
    });

    expect(result.ok).toBe(true);
    expect(result.queue.queue.map((e) => e.armed_by_lane)).toEqual([
      'cl_1',
      undefined
    ]);
  });

  test('rejects an arm carrying a stale revision', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });

    const result = store.arm(WS, {
      expected_revision: 0,
      bead_ids: ['A'],
      lane_id: 'cl_1'
    });

    expect(result).toMatchObject({ ok: false, conflict: true });
    expect(store.snapshot(WS).queue[0].armed_by_lane).toBeUndefined();
  });

  test('ignores bead ids absent from this queue without failing the op', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });

    const result = store.arm(WS, {
      expected_revision: 1,
      bead_ids: ['A', 'ELSEWHERE'],
      lane_id: 'cl_1'
    });

    expect(result.ok).toBe(true);
    expect(result.queue.queue.map((e) => e.bead_id)).toEqual(['A']);
  });

  test('leaves serial lane entries unarmed', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'S', lane: 's1' });

    const result = store.arm(WS, {
      expected_revision: 1,
      bead_ids: ['S'],
      lane_id: 'cl_1'
    });

    expect(result.ok).toBe(true);
    expect(
      result.queue.serial_lanes[0].entries[0].armed_by_lane
    ).toBeUndefined();
  });

  test('disarms exactly the named entries', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    store.place(WS, { expected_revision: 1, bead_id: 'B' });
    store.arm(WS, {
      expected_revision: 2,
      bead_ids: ['A', 'B'],
      lane_id: 'cl_1'
    });

    const result = store.disarm(WS, {
      expected_revision: 3,
      bead_ids: ['A']
    });

    expect(result.ok).toBe(true);
    expect(result.queue.queue.map((e) => e.armed_by_lane)).toEqual([
      undefined,
      'cl_1'
    ]);
  });

  test('disarms every entry armed to one lane when only the lane is named', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    store.place(WS, { expected_revision: 1, bead_id: 'B' });
    store.arm(WS, { expected_revision: 2, bead_ids: ['A'], lane_id: 'cl_1' });
    store.arm(WS, { expected_revision: 3, bead_ids: ['B'], lane_id: 'cl_2' });

    const result = store.disarm(WS, {
      expected_revision: 4,
      lane_id: 'cl_1'
    });

    expect(result.ok).toBe(true);
    expect(result.queue.queue.map((e) => e.armed_by_lane)).toEqual([
      undefined,
      'cl_2'
    ]);
  });

  test('rejects a disarm carrying a stale revision', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    store.arm(WS, { expected_revision: 1, bead_ids: ['A'], lane_id: 'cl_1' });

    const result = store.disarm(WS, { expected_revision: 1, lane_id: 'cl_1' });

    expect(result).toMatchObject({ ok: false, conflict: true });
    expect(store.snapshot(WS).queue[0].armed_by_lane).toBe('cl_1');
  });

  test('carries the attempt arm snapshot onto the pr_wait entry', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    store.arm(WS, { expected_revision: 1, bead_ids: ['A'], lane_id: 'cl_1' });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-A', bead_id: 'A', armed_by_lane: 'cl_1' }
    });

    store.moveToPrWait(WS, {
      bead_id: 'A',
      attempt_id: 'att-A',
      patch: { status: 'done' }
    });

    expect(store.snapshot(WS).pr_wait[0].armed_by_lane).toBe('cl_1');
  });

  test('does not re-plant an arm this process disarmed at load', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 4,
        queue: [{ bead_id: 'A', added_at: 1, armed_by_lane: 'cl_1' }],
        attempts: {
          'att-A': {
            attempt_id: 'att-A',
            bead_id: 'A',
            armed_by_lane: 'cl_1',
            status: 'running'
          }
        }
      })
    );
    const store = createQueueStore();

    store.moveToPrWait(WS, {
      bead_id: 'A',
      attempt_id: 'att-A',
      patch: { status: 'done' }
    });

    expect(store.snapshot(WS).pr_wait[0].armed_by_lane).toBeUndefined();
  });

  test('leaves an unarmed dispatch out of the pr_wait entry', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-A', bead_id: 'A' }
    });

    store.moveToPrWait(WS, {
      bead_id: 'A',
      attempt_id: 'att-A',
      patch: { status: 'done' }
    });

    expect(store.snapshot(WS).pr_wait[0].armed_by_lane).toBeUndefined();
  });

  test('keeps the attempt arm snapshot when the entry is disarmed', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    store.arm(WS, { expected_revision: 1, bead_ids: ['A'], lane_id: 'cl_1' });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-A', bead_id: 'A', armed_by_lane: 'cl_1' }
    });

    store.disarm(WS, {
      expected_revision: store.snapshot(WS).revision,
      lane_id: 'cl_1'
    });

    expect(store.snapshot(WS).attempts['att-A'].armed_by_lane).toBe('cl_1');
    expect(store.snapshot(WS).queue[0].armed_by_lane).toBeUndefined();
  });

  test('drops the failed row arm without touching auto_advance', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    store.place(WS, { expected_revision: 1, bead_id: 'B' });
    store.arm(WS, {
      expected_revision: 2,
      bead_ids: ['A', 'B'],
      lane_id: 'cl_1'
    });
    store.setAutoAdvance(WS, true);

    const result = store.disarmEntry(WS, { bead_id: 'A' });

    expect(result.queue.queue.map((e) => e.armed_by_lane)).toEqual([
      undefined,
      'cl_1'
    ]);
    expect(result.queue.auto_advance).toBe(true);
  });

  test('no-ops disarmEntry on a row that carries no arm', () => {
    const store = createQueueStore();
    store.place(WS, { expected_revision: 0, bead_id: 'A' });
    const before = store.snapshot(WS).revision;

    const result = store.disarmEntry(WS, { bead_id: 'A' });

    expect(result.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('arms a PR-wait row the restart disarmed', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 3,
        pr_wait: [{ bead_id: 'B', added_at: 2, armed_by_lane: 'cl_1' }]
      })
    );
    const store = createQueueStore();

    const result = store.arm(WS, {
      expected_revision: 3,
      bead_ids: ['B'],
      lane_id: 'cl_1'
    });

    expect(result.queue.pr_wait[0].armed_by_lane).toBe('cl_1');
  });

  test('clears armed_by_lane on both lanes at cold load and remembers the lane', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 7,
        auto_advance: true,
        queue: [{ bead_id: 'A', added_at: 1, armed_by_lane: 'cl_1' }],
        pr_wait: [{ bead_id: 'B', added_at: 2, armed_by_lane: 'cl_2' }]
      })
    );

    const loaded = createQueueStore().load(WS);

    expect(loaded.queue[0].armed_by_lane).toBeUndefined();
    expect(loaded.pr_wait[0].armed_by_lane).toBeUndefined();
    expect([...(loaded.disarmed_on_load || [])].sort()).toEqual([
      'cl_1',
      'cl_2'
    ]);
  });

  test('never writes disarmed_on_load to disk', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 1,
        queue: [{ bead_id: 'A', added_at: 1, armed_by_lane: 'cl_1' }]
      })
    );
    const store = createQueueStore();

    store.place(WS, { expected_revision: 1, bead_id: 'C' });

    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect('disarmed_on_load' in raw).toBe(false);
    expect(
      raw.queue.every(
        (/** @type {Record<string, unknown>} */ e) => !('armed_by_lane' in e)
      )
    ).toBe(true);
  });

  test('drops the lane from disarmed_on_load after a successful arm', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 3,
        queue: [
          { bead_id: 'A', added_at: 1, armed_by_lane: 'cl_1' },
          { bead_id: 'B', added_at: 2, armed_by_lane: 'cl_2' }
        ]
      })
    );
    const store = createQueueStore();

    const result = store.arm(WS, {
      expected_revision: 3,
      bead_ids: ['A'],
      lane_id: 'cl_1'
    });

    expect(result.queue.disarmed_on_load).toEqual(['cl_2']);
  });

  test('round-trips a legacy queue that has no arm fields', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 2,
        queue: [{ bead_id: 'A', added_at: 1 }],
        attempts: { legacy: { attempt_id: 'legacy', bead_id: 'A' } }
      })
    );

    const loaded = createQueueStore().load(WS);

    expect(loaded.queue[0].armed_by_lane).toBeUndefined();
    expect(loaded.attempts.legacy.armed_by_lane).toBeNull();
    expect(loaded.disarmed_on_load).toEqual([]);
  });

  test('normalizes a blank stored arm to absent', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 1,
        queue: [{ bead_id: 'A', added_at: 1, armed_by_lane: '' }]
      })
    );

    const loaded = createQueueStore().load(WS);

    expect(loaded.queue[0].armed_by_lane).toBeUndefined();
    expect(loaded.disarmed_on_load).toEqual([]);
  });
});

describe('queue store failure-tier fields (UI-5ym8)', () => {
  test('starts a fresh queue with no hold and no lineages', () => {
    const store = createQueueStore();

    const snap = store.snapshot(WS);

    expect(snap.hold).toBe(null);
    expect(snap.lineages).toEqual([]);
    expect(snap.hold_history).toEqual([]);
  });

  test('round-trips the durable hold triple through a reload', () => {
    const store = createQueueStore();
    store.applyQueueHold(WS, {
      event: {
        kind: 'env_failure',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        cause: 'verify_cmd_spawn_error',
        at: 1000
      },
      now: 1000
    });

    const loaded = createQueueStore().load(WS);

    expect(loaded.hold).toMatchObject({
      kind: 'env',
      cause: 'verify_cmd_spawn_error',
      since: 1000,
      bead_ids: ['UI-1']
    });
    expect(loaded.lineages).toEqual([
      {
        bead_id: 'UI-1',
        origin_attempt_id: 'att-1',
        cause: 'verify_cmd_spawn_error',
        next_at: 1000 + 120000,
        attempts: 1
      }
    ]);
    expect(loaded.hold_history).toEqual([
      { bead_id: 'UI-1', cause: 'verify_cmd_spawn_error', at: 1000 }
    ]);
  });

  test('drops a malformed hold rather than refusing the load', () => {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 3,
        hold: { kind: 'weird', cause: '', since: 'soon' },
        lineages: [{ bead_id: 'UI-1' }, { bead_id: 'UI-2', cause: 'x' }],
        hold_history: [{ bead_id: 'UI-1' }]
      })
    );

    const loaded = createQueueStore().load(WS);

    expect(loaded.hold).toBe(null);
    expect(loaded.lineages).toEqual([
      {
        bead_id: 'UI-2',
        origin_attempt_id: null,
        cause: 'x',
        next_at: null,
        attempts: 1
      }
    ]);
    expect(loaded.hold_history).toEqual([]);
  });

  test('returns the reducer effects alongside the persisted state', () => {
    const store = createQueueStore();

    const result = store.applyQueueHold(WS, {
      event: {
        kind: 'env_failure',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        cause: 'spawn_failed',
        at: 500
      },
      now: 500
    });

    expect(result.ok).toBe(true);
    expect(result.effects).toEqual([
      {
        kind: 'retry_scheduled',
        bead_id: 'UI-1',
        origin_attempt_id: 'att-1',
        next_at: 500 + 120000,
        attempts: 1
      }
    ]);
    expect(result.hold).toMatchObject({ kind: 'env' });
  });

  test('defaults the new attempt fields on a legacy record', () => {
    const attempt = makeAttempt({ attempt_id: 'a1', bead_id: 'UI-1' });

    expect(attempt.retry).toBe(null);
    expect(attempt.awaiting_user_present).toBe(false);
    expect(attempt.parked_resumed_at).toBe(null);
  });

  test('keeps a retry stamp and a free-form cause_detail through makeAttempt', () => {
    const attempt = makeAttempt({
      attempt_id: 'a1',
      bead_id: 'UI-1',
      status: 'retry_wait',
      retry: {
        cause: 'session_failed:is_error:api',
        attempts: 2,
        max: 3,
        next_at: 900,
        origin_attempt_id: 'a0'
      },
      cause_detail: {
        summary: 'API Error: 529 Overloaded',
        awaiting_user: null,
        bead_status: 'in_progress'
      }
    });

    expect(attempt.retry).toEqual({
      cause: 'session_failed:is_error:api',
      attempts: 2,
      max: 3,
      next_at: 900,
      origin_attempt_id: 'a0'
    });
    expect(attempt.cause_detail).toEqual({
      summary: 'API Error: 529 Overloaded',
      awaiting_user: null,
      bead_status: 'in_progress'
    });
  });

  test('drops a retry stamp that cannot name its cause', () => {
    const attempt = makeAttempt({
      attempt_id: 'a1',
      bead_id: 'UI-1',
      retry: /** @type {any} */ ({ attempts: 2 })
    });

    expect(attempt.retry).toBe(null);
  });

  test('stamps a parked attempt resumed exactly once', () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'a1', bead_id: 'UI-1' }
    });
    store.updateAttempt(WS, {
      attempt_id: 'a1',
      patch: { status: 'parked', awaiting_user_present: true }
    });

    const first = store.markParkedResumed(WS, { attempt_id: 'a1', at: 700 });
    const second = store.markParkedResumed(WS, { attempt_id: 'a1', at: 800 });

    expect(first.ok).toBe(true);
    expect(second.ok).toBe(false);
    expect(store.snapshot(WS).attempts.a1.parked_resumed_at).toBe(700);
  });

  test('supersedes a bead other retry_wait attempts', () => {
    const store = createQueueStore();
    for (const attempt_id of ['a1', 'a2', 'a3']) {
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: { attempt_id, bead_id: 'UI-1' }
      });
      store.updateAttempt(WS, {
        attempt_id,
        patch: { status: 'retry_wait' }
      });
    }
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'other', bead_id: 'UI-2' }
    });
    store.updateAttempt(WS, {
      attempt_id: 'other',
      patch: { status: 'retry_wait' }
    });

    store.supersedeRetryAttempts(WS, {
      bead_id: 'UI-1',
      except_attempt_id: 'a3'
    });

    const snap = store.snapshot(WS);
    expect(snap.attempts.a1.status).toBe('superseded');
    expect(snap.attempts.a2.status).toBe('superseded');
    expect(snap.attempts.a3.status).toBe('retry_wait');
    expect(snap.attempts.other.status).toBe('retry_wait');
  });
});

describe('queue store atomic terminalize + hold (UI-5ym8 §7)', () => {
  /**
   * @param {string} root_bead_id
   * @returns {any}
   */
  function storeWithIntent(root_bead_id) {
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

  test('lands the terminal and the systemic hold in ONE revision bump', () => {
    const store = storeWithIntent('UI-1');
    const before = store.snapshot(WS).revision;

    const written = store.terminalizeCompletionIntent(WS, {
      root_bead_id: 'UI-1',
      terminal: {
        reason: 'verify_red',
        stage: 'repo_verify',
        failure_key: null,
        evidence: null,
        log_path: null,
        at: 2000
      },
      hold_event: {
        kind: 'systemic_failure',
        bead_id: 'UI-1',
        cause: 'verify_red',
        at: 2000
      },
      now: 2000
    });

    const snap = store.snapshot(WS);
    expect(written.ok).toBe(true);
    expect(snap.revision).toBe(before + 1);
    expect(snap.completion_intents['UI-1'].phase).toBe('needs_human');
    expect(snap.hold).toMatchObject({
      kind: 'systemic',
      cause: 'verify_red',
      since: 2000,
      bead_ids: ['UI-1']
    });
  });

  test('leaves the queue running when no hold event is given', () => {
    const store = storeWithIntent('UI-1');

    store.terminalizeCompletionIntent(WS, {
      root_bead_id: 'UI-1',
      terminal: {
        reason: 'conflict_unresolved:rebase',
        stage: 'merge_subject',
        failure_key: null,
        evidence: null,
        log_path: null,
        at: 2000
      }
    });

    expect(store.snapshot(WS).completion_intents['UI-1'].phase).toBe(
      'needs_human'
    );
    expect(store.snapshot(WS).hold).toBe(null);
  });

  test('does not stop the queue when the terminal itself is rejected', () => {
    const store = createQueueStore();

    const written = store.terminalizeCompletionIntent(WS, {
      root_bead_id: 'UI-absent',
      terminal: {
        reason: 'verify_red',
        stage: 'repo_verify',
        failure_key: null,
        evidence: null,
        log_path: null,
        at: 2000
      },
      hold_event: {
        kind: 'systemic_failure',
        bead_id: 'UI-absent',
        cause: 'verify_red',
        at: 2000
      },
      now: 2000
    });

    expect(written.ok).toBe(false);
    expect(store.snapshot(WS).hold).toBe(null);
  });
});

describe('worker/queue-store — 자동 리뷰 dispatch claim (2026-08-28 auto-review-dispatch §3/§5)', () => {
  const CLAIM_HEAD = 'a'.repeat(40);
  const MOVED_HEAD = 'b'.repeat(40);

  /** A held row with a manual authority, the state §4 judges. */
  function heldStore() {
    const ids = ['authority-1', 'authority-2'];
    const store = createQueueStore({
      now: () => 500,
      randomUUID: () => /** @type {string} */ (ids.shift())
    });
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-UI-1', bead_id: 'UI-1' }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'att-UI-1',
      patch: { status: 'done', finished_at: 1 }
    });
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1', head_sha: CLAIM_HEAD, target_base: 'main' }]
    });
    store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: { reason: 'review_receipt_missing', head_sha: CLAIM_HEAD },
      at: 7
    });
    return store;
  }

  /**
   * @param {Partial<{ authority_id: string, authority_source: 'manual'|'automatic', hold_reason: string, head_sha: string }>} [overrides]
   */
  function expectedFacts(overrides = {}) {
    return {
      authority_id: 'authority-1',
      /** @type {'manual'} */
      authority_source: 'manual',
      hold_reason: 'review_receipt_missing',
      head_sha: CLAIM_HEAD,
      ...overrides
    };
  }

  /**
   * @param {ReturnType<typeof createQueueStore>} store
   * @param {string} attempt_id
   */
  function clickReviewSession(store, attempt_id) {
    return store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1', head_sha: CLAIM_HEAD, target_base: 'main' }],
      review_session: { attempt_id, session_source: 'resume' }
    });
  }

  test('registers the auto attempt on the row existing authority', () => {
    const store = heldStore();
    const before = store.snapshot(WS).revision;

    const claimed = store.claimAutoReviewDispatch(WS, {
      bead_id: 'UI-1',
      attempt_id: 'review:auto',
      session_source: 'resume',
      expected: expectedFacts()
    });

    expect(claimed.ok).toBe(true);
    expect(store.snapshot(WS).revision).toBe(before + 1);
    expect(store.snapshot(WS).attempts['review:auto']).toMatchObject({
      bead_id: 'UI-1',
      kind: 'review_session',
      origin: 'auto',
      status: 'pending',
      authority_id: 'authority-1',
      head_sha: CLAIM_HEAD,
      continuation_mode: 'session'
    });
  });

  test('writes the active claim in that same write', () => {
    const store = heldStore();

    store.claimAutoReviewDispatch(WS, {
      bead_id: 'UI-1',
      attempt_id: 'review:auto',
      expected: expectedFacts()
    });

    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toEqual({
      head_sha: CLAIM_HEAD,
      attempt_id: 'review:auto',
      state: 'active',
      at: 500
    });
  });

  test('leaves the authority untouched when it claims', () => {
    const store = heldStore();

    store.claimAutoReviewDispatch(WS, {
      bead_id: 'UI-1',
      attempt_id: 'review:auto',
      expected: expectedFacts()
    });

    expect(store.snapshot(WS).merge_queue[0].authority).toMatchObject({
      id: 'authority-1',
      source: 'manual',
      requested_head_sha: CLAIM_HEAD
    });
  });

  test('rejects a claim on a row that has no authority', () => {
    const store = createQueueStore({ now: () => 500 });
    store.appendAttempt(WS, {
      expected_revision: 0,
      attempt: { attempt_id: 'att-UI-1', bead_id: 'UI-1' }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'att-UI-1',
      patch: { status: 'done', finished_at: 1 }
    });
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1' }]
    });
    store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: { reason: 'review_receipt_missing', head_sha: CLAIM_HEAD },
      at: 7
    });
    const before = store.snapshot(WS).revision;

    const claimed = store.claimAutoReviewDispatch(WS, {
      bead_id: 'UI-1',
      attempt_id: 'review:auto',
      expected: expectedFacts()
    });

    expect(claimed).toMatchObject({ ok: false, reason: 'authority_missing' });
    expect(store.snapshot(WS).revision).toBe(before);
    expect(store.snapshot(WS).attempts['review:auto']).toBeUndefined();
    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toBeUndefined();
  });

  test('rejects a claim while a review session is in flight', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');
    const before = store.snapshot(WS).revision;

    const claimed = store.claimAutoReviewDispatch(WS, {
      bead_id: 'UI-1',
      attempt_id: 'review:auto',
      expected: expectedFacts()
    });

    expect(claimed).toMatchObject({
      ok: false,
      reason: 'review_session_in_flight'
    });
    expect(store.snapshot(WS).revision).toBe(before);
    expect(store.snapshot(WS).attempts['review:auto']).toBeUndefined();
    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toMatchObject({
      attempt_id: 'review:click'
    });
  });

  test('rejects a second claim on the head already claimed', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');
    store.settleReviewSession(WS, {
      attempt_id: 'review:click',
      outcome: 'failed',
      cause: 'session_failed:exit',
      hold_reason: 'review_receipt_missing',
      final_head_sha: CLAIM_HEAD,
      head_moved_by_session: false,
      at: 800
    });
    const before = store.snapshot(WS).revision;

    const claimed = store.claimAutoReviewDispatch(WS, {
      bead_id: 'UI-1',
      attempt_id: 'review:auto',
      expected: expectedFacts()
    });

    expect(claimed).toMatchObject({
      ok: false,
      reason: 'review_dispatch_claimed'
    });
    expect(store.snapshot(WS).revision).toBe(before);
    expect(store.snapshot(WS).attempts['review:auto']).toBeUndefined();
  });

  test('rejects a claim at any head while the claim head is undetermined', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');
    store.settleReviewSession(WS, {
      attempt_id: 'review:click',
      outcome: 'failed',
      cause: 'session_failed:exit',
      hold_reason: 'review_receipt_missing',
      at: 800
    });
    store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: { reason: 'review_receipt_missing', head_sha: MOVED_HEAD },
      at: 900
    });
    const before = store.snapshot(WS).revision;

    const claimed = store.claimAutoReviewDispatch(WS, {
      bead_id: 'UI-1',
      attempt_id: 'review:auto',
      expected: expectedFacts({ head_sha: MOVED_HEAD })
    });

    expect(claimed).toMatchObject({
      ok: false,
      reason: 'review_dispatch_claimed'
    });
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('rejects a claim whose expected authority id is stale', () => {
    const store = heldStore();
    const before = store.snapshot(WS).revision;

    const claimed = store.claimAutoReviewDispatch(WS, {
      bead_id: 'UI-1',
      attempt_id: 'review:auto',
      expected: expectedFacts({ authority_id: 'authority-9' })
    });

    expect(claimed).toMatchObject({ ok: false, reason: 'claim_input_stale' });
    expect(store.snapshot(WS).revision).toBe(before);
    expect(store.snapshot(WS).attempts['review:auto']).toBeUndefined();
  });

  test('rejects a claim whose expected authority source is stale', () => {
    const store = heldStore();
    const before = store.snapshot(WS).revision;

    const claimed = store.claimAutoReviewDispatch(WS, {
      bead_id: 'UI-1',
      attempt_id: 'review:auto',
      expected: expectedFacts({ authority_source: 'automatic' })
    });

    expect(claimed).toMatchObject({ ok: false, reason: 'claim_input_stale' });
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('rejects a claim whose expected hold reason is stale', () => {
    const store = heldStore();
    const before = store.snapshot(WS).revision;

    const claimed = store.claimAutoReviewDispatch(WS, {
      bead_id: 'UI-1',
      attempt_id: 'review:auto',
      expected: expectedFacts({ hold_reason: 'review_receipt_stale' })
    });

    expect(claimed).toMatchObject({ ok: false, reason: 'claim_input_stale' });
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('rejects a claim whose expected head is stale', () => {
    const store = heldStore();
    const before = store.snapshot(WS).revision;

    const claimed = store.claimAutoReviewDispatch(WS, {
      bead_id: 'UI-1',
      attempt_id: 'review:auto',
      expected: expectedFacts({ head_sha: MOVED_HEAD })
    });

    expect(claimed).toMatchObject({ ok: false, reason: 'claim_input_stale' });
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('claims the head in the click write that registers the session', () => {
    const store = heldStore();
    const before = store.snapshot(WS).revision;

    const clicked = clickReviewSession(store, 'review:click');

    expect(clicked.review_session_registered).toBe(true);
    expect(store.snapshot(WS).revision).toBe(before + 1);
    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toEqual({
      head_sha: CLAIM_HEAD,
      attempt_id: 'review:click',
      state: 'active',
      at: 500
    });
  });

  test('returns a complete no-op click while a review session is in flight', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');
    const before = store.snapshot(WS).revision;

    const again = store.enqueueMergeManual(WS, {
      expected_revision: before,
      entries: [{ bead_id: 'UI-1', head_sha: MOVED_HEAD, target_base: 'main' }]
    });

    expect(again).toMatchObject({
      ok: true,
      review_session_registered: false,
      reason: 'review_session_in_flight'
    });
    expect(store.snapshot(WS).revision).toBe(before);
    expect(store.snapshot(WS).merge_queue[0]).toMatchObject({
      authority: { id: 'authority-1', requested_head_sha: CLAIM_HEAD },
      hold: { reason: 'review_receipt_missing' },
      review_dispatch: { attempt_id: 'review:click', state: 'active' }
    });
  });

  test('enrols the unguarded beads of a mixed lane call', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-UI-2', bead_id: 'UI-2' }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-2',
      attempt_id: 'att-UI-2',
      patch: { status: 'done', finished_at: 1 }
    });
    const before = store.snapshot(WS).revision;

    const enrolled = store.enqueueMergeManual(WS, {
      expected_revision: before,
      entries: [
        { bead_id: 'UI-1', head_sha: MOVED_HEAD, target_base: 'main' },
        { bead_id: 'UI-2', head_sha: MOVED_HEAD, target_base: 'main' }
      ]
    });

    expect(enrolled.ok).toBe(true);
    expect(
      store.snapshot(WS).merge_queue.map((entry) => entry.bead_id)
    ).toEqual(['UI-1', 'UI-2']);
    expect(store.snapshot(WS).merge_queue[0]).toMatchObject({
      authority: { id: 'authority-1', requested_head_sha: CLAIM_HEAD },
      hold: { reason: 'review_receipt_missing' },
      review_dispatch: { attempt_id: 'review:click', state: 'active' }
    });
  });

  test('exhausts an active claim at the same head and writes nothing otherwise', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');
    const before = store.snapshot(WS).revision;

    store.expireReviewDispatchClaim(WS, {
      bead_id: 'UI-1',
      head_sha: MOVED_HEAD
    });
    const untouched = store.snapshot(WS).merge_queue[0].review_dispatch;
    store.expireReviewDispatchClaim(WS, {
      bead_id: 'UI-1',
      head_sha: CLAIM_HEAD
    });

    expect(untouched).toMatchObject({ state: 'active' });
    expect(store.snapshot(WS).revision).toBe(before + 1);
    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toMatchObject({
      head_sha: CLAIM_HEAD,
      attempt_id: 'review:click',
      state: 'exhausted'
    });
  });

  test('deletes the claim when the receipt settles current', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');

    store.settleReviewSession(WS, {
      attempt_id: 'review:click',
      outcome: 'current',
      final_head_sha: MOVED_HEAD,
      at: 800
    });

    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toBeUndefined();
  });

  test('exhausts the claim on its own head when the head did not move', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');

    store.settleReviewSession(WS, {
      attempt_id: 'review:click',
      outcome: 'failed',
      cause: 'receipt_not_current',
      final_head_sha: CLAIM_HEAD,
      head_moved_by_session: true,
      at: 800
    });

    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toEqual({
      head_sha: CLAIM_HEAD,
      attempt_id: 'review:click',
      state: 'exhausted',
      at: 800
    });
  });

  test('carries the claim to the final head the session itself pushed', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');

    store.settleReviewSession(WS, {
      attempt_id: 'review:click',
      outcome: 'failed',
      cause: 'session_failed:exit',
      final_head_sha: MOVED_HEAD,
      head_moved_by_session: true,
      at: 800
    });

    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toMatchObject({
      head_sha: MOVED_HEAD,
      state: 'exhausted'
    });
  });

  test('keeps the claim head when something else moved the head', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');

    store.settleReviewSession(WS, {
      attempt_id: 'review:click',
      outcome: 'failed',
      cause: 'session_failed:exit',
      final_head_sha: MOVED_HEAD,
      head_moved_by_session: false,
      at: 800
    });

    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toMatchObject({
      head_sha: CLAIM_HEAD,
      state: 'exhausted'
    });
  });

  test('exhausts the claim with no head when the move is unjudged', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');

    store.settleReviewSession(WS, {
      attempt_id: 'review:click',
      outcome: 'failed',
      cause: 'session_failed:exit',
      final_head_sha: MOVED_HEAD,
      head_moved_by_session: null,
      at: 800
    });

    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toMatchObject({
      head_sha: null,
      state: 'exhausted'
    });
  });

  test('exhausts the claim with no head when no final head was observed', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');

    store.settleReviewSession(WS, {
      attempt_id: 'review:click',
      outcome: 'failed',
      cause: 'session_failed:exit',
      at: 800
    });

    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toMatchObject({
      head_sha: null,
      state: 'exhausted'
    });
  });

  test('leaves the claim untouched when another attempt settles', () => {
    const store = heldStore();
    store.claimAutoReviewDispatch(WS, {
      bead_id: 'UI-1',
      attempt_id: 'review:auto',
      expected: expectedFacts()
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'review:stray',
        bead_id: 'UI-1',
        kind: 'review_session',
        status: 'pending',
        authority_id: 'authority-1',
        head_sha: CLAIM_HEAD
      }
    });

    store.settleReviewSession(WS, {
      attempt_id: 'review:stray',
      outcome: 'failed',
      cause: 'session_failed:exit',
      final_head_sha: MOVED_HEAD,
      head_moved_by_session: true,
      at: 800
    });

    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toEqual({
      head_sha: CLAIM_HEAD,
      attempt_id: 'review:auto',
      state: 'active',
      at: 500
    });
  });

  test('keeps the claim when only the hold is released', () => {
    const store = heldStore();
    clickReviewSession(store, 'review:click');

    store.setMergeHold(WS, { bead_id: 'UI-1', hold: null, at: 900 });

    expect(store.snapshot(WS).merge_queue[0].hold).toBeUndefined();
    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toMatchObject({
      attempt_id: 'review:click',
      state: 'active'
    });
  });

  test('preserves the slot wait when the field is omitted', () => {
    const store = heldStore();
    store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: {
        reason: 'review_receipt_missing',
        head_sha: CLAIM_HEAD,
        auto_review_wait: 'slot'
      },
      at: 900
    });

    store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: { reason: 'review_receipt_stale', head_sha: CLAIM_HEAD },
      at: 950
    });

    expect(store.snapshot(WS).merge_queue[0].hold).toMatchObject({
      reason: 'review_receipt_stale',
      auto_review_wait: 'slot'
    });
  });

  test('writes nothing when the same slot wait repeats', () => {
    const store = heldStore();
    store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: {
        reason: 'review_receipt_missing',
        head_sha: CLAIM_HEAD,
        auto_review_wait: 'slot'
      },
      at: 900
    });
    const before = store.snapshot(WS).revision;

    const again = store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: {
        reason: 'review_receipt_missing',
        head_sha: CLAIM_HEAD,
        auto_review_wait: 'slot'
      },
      at: 950
    });

    expect(again.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(before);
  });

  test('clears the slot wait when null is passed explicitly', () => {
    const store = heldStore();
    store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: {
        reason: 'review_receipt_missing',
        head_sha: CLAIM_HEAD,
        auto_review_wait: 'slot'
      },
      at: 900
    });

    const cleared = store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: {
        reason: 'review_receipt_missing',
        head_sha: CLAIM_HEAD,
        auto_review_wait: null
      },
      at: 950
    });

    expect(cleared.ok).toBe(true);
    expect(store.snapshot(WS).merge_queue[0].hold?.auto_review_wait).toBe(
      undefined
    );
  });
});

describe('worker/queue-store — review_dispatch 정규화 (2026-08-28 auto-review-dispatch §3.1)', () => {
  const HEAD = 'a'.repeat(40);

  /**
   * @param {Record<string, unknown>} row
   */
  function seedRow(row) {
    fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        revision: 3,
        merge_queue: [
          {
            bead_id: 'UI-1',
            resolution_rounds: 0,
            rebase_rounds: 0,
            resolution: null,
            ...row
          }
        ]
      })
    );
  }

  test('loads an old queue.json that has no claim at all', () => {
    seedRow({});

    const entry = createQueueStore().snapshot(WS).merge_queue[0];

    expect(entry).toMatchObject({ bead_id: 'UI-1' });
    expect(entry.review_dispatch).toBeUndefined();
  });

  test('round-trips a well-formed claim', () => {
    seedRow({
      review_dispatch: {
        head_sha: HEAD.toUpperCase(),
        attempt_id: 'review:1',
        state: 'active',
        at: 12
      }
    });

    const entry = createQueueStore().snapshot(WS).merge_queue[0];

    expect(entry.review_dispatch).toEqual({
      head_sha: HEAD,
      attempt_id: 'review:1',
      state: 'active',
      at: 12
    });
  });

  test('keeps an exhausted claim whose head is undetermined', () => {
    seedRow({
      review_dispatch: {
        head_sha: null,
        attempt_id: 'review:1',
        state: 'exhausted',
        at: 12
      }
    });

    const entry = createQueueStore().snapshot(WS).merge_queue[0];

    expect(entry.review_dispatch).toMatchObject({
      head_sha: null,
      state: 'exhausted'
    });
  });

  test('drops a claim whose head is neither a sha nor null', () => {
    seedRow({
      review_dispatch: {
        head_sha: 'not-a-sha',
        attempt_id: 'review:1',
        state: 'active',
        at: 12
      }
    });

    const entry = createQueueStore().snapshot(WS).merge_queue[0];

    expect(entry.review_dispatch).toBeUndefined();
  });

  test('drops an active claim that names no head', () => {
    seedRow({
      review_dispatch: {
        head_sha: null,
        attempt_id: 'review:1',
        state: 'active',
        at: 12
      }
    });

    const entry = createQueueStore().snapshot(WS).merge_queue[0];

    expect(entry.review_dispatch).toBeUndefined();
  });

  test('drops a claim whose state is outside the enum', () => {
    seedRow({
      review_dispatch: {
        head_sha: HEAD,
        attempt_id: 'review:1',
        state: 'running',
        at: 12
      }
    });

    const entry = createQueueStore().snapshot(WS).merge_queue[0];

    expect(entry.review_dispatch).toBeUndefined();
  });

  test('drops a claim that names no attempt', () => {
    seedRow({
      review_dispatch: { head_sha: HEAD, state: 'exhausted', at: 12 }
    });

    const entry = createQueueStore().snapshot(WS).merge_queue[0];

    expect(entry.review_dispatch).toBeUndefined();
  });

  test('keeps a persisted slot wait on the hold', () => {
    seedRow({
      hold: {
        reason: 'review_receipt_missing',
        head_sha: HEAD,
        since: 4,
        auto_review_wait: 'slot'
      }
    });

    const entry = createQueueStore().snapshot(WS).merge_queue[0];

    expect(entry.hold).toMatchObject({ auto_review_wait: 'slot' });
  });

  test('drops an unknown wait value from the hold', () => {
    seedRow({
      hold: {
        reason: 'review_receipt_missing',
        head_sha: HEAD,
        since: 4,
        auto_review_wait: 'runner'
      }
    });

    const entry = createQueueStore().snapshot(WS).merge_queue[0];

    expect(entry.hold).toMatchObject({ reason: 'review_receipt_missing' });
    expect(entry.hold?.auto_review_wait).toBeUndefined();
  });
});
