import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  createCompletionActionDriver,
  createCompletionFailureKey,
  createCompletionIntentCoordinator,
  decideCompletionAction
} from './completion-intent.js';
import { createQueueStore } from './queue-store.js';

const DRIVER_WS = '/repo';
/** @type {string[]} */
const tmp_dirs = [];

/**
 * @param {Record<string, unknown>} [patch]
 * @returns {any}
 */
function intent(patch = {}) {
  return {
    target_base: 'main',
    phase: 'gating',
    subject: {
      role: 'root',
      bead_id: 'UI-root',
      pr_url: 'https://github.com/o/r/pull/1',
      head_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      merged_sha: null
    },
    repair_sessions_used: 0,
    repair_bead_ids: [],
    active_op: null,
    terminal_reason: null,
    ...patch
  };
}

afterEach(() => {
  vi.restoreAllMocks();
  for (const dir of tmp_dirs.splice(0)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
});

/**
 * @returns {ReturnType<typeof createQueueStore>}
 */
function seededCompletionStore() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-completion-'));
  tmp_dirs.push(dir);
  const store = createQueueStore({
    filePathFor: () => path.join(dir, 'queue.json')
  });
  store.appendAttempt(DRIVER_WS, {
    expected_revision: 0,
    attempt: {
      attempt_id: 'att-root',
      bead_id: 'UI-root',
      repo: DRIVER_WS,
      target_base: 'main'
    }
  });
  store.moveToPrWait(DRIVER_WS, {
    bead_id: 'UI-root',
    attempt_id: 'att-root',
    patch: { status: 'done', finished_at: 1 }
  });
  store.toggleAutoMerge(DRIVER_WS, {
    expected_revision: store.snapshot(DRIVER_WS).revision,
    on: true
  });
  store.enqueueCompletionIntent(DRIVER_WS, {
    root_bead_id: 'UI-root',
    target_base: 'main',
    subject: intent().subject
  });
  return store;
}

/**
 * @param {Record<string, unknown>} [patch]
 */
function redGate(patch = {}) {
  return {
    ok: true,
    target_base: 'main',
    base_sha: 'b'.repeat(40),
    subject: intent().subject,
    verdict: {
      enabled: false,
      tier: 'local_verify',
      reason: 'verify_cmd_failed'
    },
    evidence: {
      verify: {
        head_sha: 'a'.repeat(40),
        ok: false,
        reason: 'verify_cmd_failed',
        output_tail: 'regression',
        log_path: '/state/verify.log'
      }
    },
    ...patch
  };
}

/**
 * @param {ReturnType<typeof createQueueStore>} store
 * @param {Record<string, any>} [overrides]
 */
function actionDriver(store, overrides = {}) {
  return createCompletionActionDriver({
    workspace: DRIVER_WS,
    store,
    prActions: {
      completionGate: vi.fn(async () => redGate())
    },
    completionRepair: {
      probeOwnership: vi.fn(async () => ({ state: 'pr_owned' })),
      ensureLinkedBead: vi.fn(async () => ({ bead_id: 'UI-repair' }))
    },
    scheduler: {
      dispatchCompletionRepair: vi.fn(async () => ({ ok: true }))
    },
    ...overrides
  });
}

/**
 * @param {ReturnType<typeof createQueueStore>} store
 */
function linkRepairSubject(store) {
  const failure_key = createCompletionFailureKey({
    stage: 'merge_gate',
    reason: 'verify_cmd_failed',
    subject_sha: 'a'.repeat(40),
    base_sha: 'b'.repeat(40),
    evidence: { output_tail: 'regression' }
  });
  store.prepareCompletionOp(DRIVER_WS, {
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
  store.recordCompletionRepairBead(DRIVER_WS, {
    root_bead_id: 'UI-root',
    op_id: 'create-1',
    repair_bead_id: 'UI-repair'
  });
  store.advanceCompletionOp(DRIVER_WS, {
    root_bead_id: 'UI-root',
    op_id: 'create-1',
    status: 'consumed',
    next_phase: 'repairing',
    clear: true
  });
  return failure_key;
}

describe('worker/completion-intent decisions', () => {
  test('creates the same SHA-bound key from equivalent bounded evidence', () => {
    const first = createCompletionFailureKey({
      stage: 'merge_gate',
      reason: 'verify_cmd_failed',
      subject_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      evidence: {
        output_tail: 'line 1\r\nline 2',
        checks: [
          { name: 'lint', conclusion: 'failure' },
          { name: 'test', conclusion: 'success' }
        ]
      }
    });
    const second = createCompletionFailureKey({
      stage: 'merge_gate',
      reason: 'verify_cmd_failed',
      subject_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      evidence: {
        output_tail: 'line 1\nline 2',
        checks: [
          { name: 'test', conclusion: 'success' },
          { name: 'lint', conclusion: 'failure' }
        ]
      }
    });

    expect(first).toEqual(second);
    expect(first).toMatchObject({
      subject_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      result_digest: expect.stringMatching(/^[0-9a-f]{64}$/)
    });
  });

  test('routes a green root through the existing merge owner', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent(),
      fact: { state: 'green' }
    });

    expect(action).toEqual({ kind: 'merge_subject' });
  });

  test('routes a conflict through the existing conflict owner', () => {
    const current = intent({ repair_sessions_used: 1 });

    const action = decideCompletionAction({
      auto_merge: true,
      intent: current,
      fact: { state: 'conflict' }
    });

    expect(action).toEqual({ kind: 'merge_subject' });
    expect(current.repair_sessions_used).toBe(1);
  });

  test('routes pinned ownership to same-root resume or linked repair creation', () => {
    const resume = decideCompletionAction({
      auto_merge: true,
      intent: intent(),
      fact: { state: 'pr_owned' }
    });
    const create = decideCompletionAction({
      auto_merge: true,
      intent: intent(),
      fact: { state: 'base_owned' }
    });

    expect(resume).toEqual({ kind: 'resume_root' });
    expect(create).toEqual({ kind: 'create_repair' });
  });

  test('routes a recorded repair child to session dispatch', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({ phase: 'repairing' }),
      fact: { state: 'repair_created' }
    });

    expect(action).toEqual({ kind: 'dispatch_repair' });
  });

  test('re-gates stale pinned evidence instead of consuming it', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent(),
      fact: { state: 'stale' }
    });

    expect(action).toEqual({ kind: 'gate' });
  });

  test('pauses new work while allowing an active operation to settle', () => {
    const pause = decideCompletionAction({
      auto_merge: false,
      intent: intent(),
      fact: { state: 'green' }
    });
    const settle = decideCompletionAction({
      auto_merge: false,
      intent: intent({
        active_op: {
          op_id: 'op-1',
          kind: 'resume_root',
          status: 'dispatched'
        }
      }),
      fact: { state: 'green' }
    });

    expect(pause).toEqual({ kind: 'pause' });
    expect(settle).toBe(null);
  });
});

describe('worker/completion-intent action driver', () => {
  test('dispatches a PR-owned failure through the root resume path', async () => {
    const store = seededCompletionStore();
    const dispatchCompletionRepair = vi.fn(async () => ({ ok: true }));
    const probeOwnership = vi.fn(async () => ({ state: 'pr_owned' }));
    const driver = actionDriver(store, {
      completionRepair: {
        probeOwnership,
        ensureLinkedBead: vi.fn()
      },
      scheduler: { dispatchCompletionRepair }
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.observe('UI-root', current);
    await driver.onAction('UI-root', { kind: 'probe' }, current);

    expect(probeOwnership).toHaveBeenCalledWith(
      expect.objectContaining({
        root_bead_id: 'UI-root',
        source: 'local_verify'
      })
    );
    expect(dispatchCompletionRepair).toHaveBeenCalledWith(
      DRIVER_WS,
      expect.objectContaining({
        root_bead_id: 'UI-root',
        op: expect.objectContaining({
          kind: 'resume_root',
          repair_bead_id: null,
          op_id: expect.stringMatching(/^completion-[0-9a-f]{24}$/)
        })
      })
    );
  });

  test('records a base-owned repair child without surrendering the root queue slot', async () => {
    const store = seededCompletionStore();
    const dispatchCompletionRepair = vi.fn(async () => ({ ok: true }));
    const driver = actionDriver(store, {
      completionRepair: {
        probeOwnership: vi.fn(async () => ({ state: 'base_owned' })),
        ensureLinkedBead: vi.fn(async () => ({ bead_id: 'UI-repair' }))
      },
      scheduler: { dispatchCompletionRepair }
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.observe('UI-root', current);
    await driver.onAction('UI-root', { kind: 'probe' }, current);

    const queue = store.snapshot(DRIVER_WS);
    expect(queue.merge_queue).toEqual([
      { bead_id: 'UI-root', resolution_rounds: 0 }
    ]);
    expect(queue.completion_intents['UI-root']).toMatchObject({
      phase: 'repairing',
      repair_bead_ids: ['UI-repair'],
      active_op: null
    });
    expect(dispatchCompletionRepair).toHaveBeenCalledWith(
      DRIVER_WS,
      expect.objectContaining({
        root_bead_id: 'UI-root',
        op: expect.objectContaining({
          kind: 'dispatch_repair',
          repair_bead_id: 'UI-repair'
        })
      })
    );
  });

  test('adopts a settled repair attempt only for its exact failure identity', async () => {
    const store = seededCompletionStore();
    const failure_key = linkRepairSubject(store);
    store.beginRepairOp(DRIVER_WS, {
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
    const repair_subject = {
      role: 'repair',
      bead_id: 'UI-repair',
      pr_url: 'https://github.com/o/r/pull/2',
      head_sha: 'c'.repeat(40),
      base_sha: 'b'.repeat(40),
      merged_sha: null
    };
    const driver = actionDriver(store, {
      prActions: {
        completionGate: vi.fn(async () => redGate({ subject: repair_subject }))
      }
    });

    await driver.onAttemptSettled({
      root_bead_id: 'UI-root',
      op_id: 'dispatch-1',
      failure_key,
      attempt: { bead_id: 'UI-repair', status: 'done' }
    });

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'gating',
      subject: repair_subject,
      active_op: null,
      repair_sessions_used: 1
    });
  });

  test('ignores a stale repair settlement with a different digest', async () => {
    const store = seededCompletionStore();
    const failure_key = linkRepairSubject(store);
    store.beginRepairOp(DRIVER_WS, {
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
    const driver = actionDriver(store);

    await driver.onAttemptSettled({
      root_bead_id: 'UI-root',
      op_id: 'dispatch-1',
      failure_key: { ...failure_key, result_digest: 'f'.repeat(64) },
      attempt: { bead_id: 'UI-repair', status: 'done' }
    });

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root'].active_op
    ).toMatchObject({ op_id: 'dispatch-1' });
  });

  test('returns to the root gate after a repair child merges', async () => {
    const store = seededCompletionStore();
    linkRepairSubject(store);
    store.setCompletionSubject(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'merging',
      subject: {
        role: 'repair',
        bead_id: 'UI-repair',
        pr_url: 'https://github.com/o/r/pull/2',
        head_sha: 'c'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    const root_subject = {
      ...intent().subject,
      head_sha: 'd'.repeat(40)
    };
    const driver = actionDriver(store, {
      prActions: {
        completionGate: vi.fn(async () =>
          redGate({
            subject: root_subject,
            verdict: { enabled: true, tier: 'ready', reason: null },
            evidence: {}
          })
        )
      }
    });

    await driver.onMergeResult('UI-root', 'UI-repair', {
      ok: true,
      action: 'merged'
    });

    const queue = store.snapshot(DRIVER_WS);
    expect(queue.merge_queue).toEqual([
      { bead_id: 'UI-root', resolution_rounds: 0 }
    ]);
    expect(queue.completion_intents['UI-root']).toMatchObject({
      phase: 'gating',
      subject: root_subject
    });
  });
});

describe('worker/completion-intent lifecycle', () => {
  test('does nothing for a legacy workspace with no intents', async () => {
    const observe = vi.fn();
    const onAction = vi.fn();
    const coordinator = createCompletionIntentCoordinator({
      workspace: '/repo',
      store: {
        snapshot: () => ({ auto_merge: false, completion_intents: {} })
      },
      observe,
      onAction
    });

    coordinator.start();
    await coordinator.idle();
    coordinator.stop();

    expect(observe).not.toHaveBeenCalled();
    expect(onAction).not.toHaveBeenCalled();
  });

  test('pauses an idle intent after auto-merge clears its queue position', async () => {
    const onAction = vi.fn();
    const coordinator = createCompletionIntentCoordinator({
      workspace: '/repo',
      store: {
        snapshot: () => ({
          auto_merge: false,
          merge_queue: [],
          completion_intents: { 'UI-root': intent() }
        })
      },
      onAction
    });

    coordinator.start();
    await coordinator.idle();
    coordinator.stop();

    expect(onAction).toHaveBeenCalledWith(
      'UI-root',
      { kind: 'pause' },
      expect.objectContaining({ phase: 'gating' })
    );
  });

  test('coalesces queue wakeups and stops its subscription', async () => {
    const events = new EventEmitter();
    const unsubscribe = vi.fn();
    const onAction = vi.fn(async () => {});
    const coordinator = createCompletionIntentCoordinator({
      workspace: '/repo',
      store: {
        snapshot: () => ({
          auto_merge: true,
          merge_queue: [{ bead_id: 'UI-root' }, { bead_id: 'UI-later' }],
          completion_intents: {
            'UI-root': intent(),
            'UI-later': intent({
              subject: {
                ...intent().subject,
                bead_id: 'UI-later'
              }
            })
          }
        })
      },
      subscribeQueueChanged: (fn) => {
        events.on('changed', fn);
        return unsubscribe;
      },
      observe: async () => ({ state: 'green' }),
      onAction
    });

    coordinator.start();
    events.emit('changed', '/repo');
    events.emit('changed', '/repo');
    await coordinator.idle();
    coordinator.stop();

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledWith(
      'UI-root',
      { kind: 'merge_subject' },
      expect.objectContaining({ phase: 'gating' })
    );
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
