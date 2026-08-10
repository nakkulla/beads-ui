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

  test('reconciles an active operation after auto-merge restarts', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        active_op: {
          op_id: 'op-1',
          kind: 'create_repair',
          status: 'prepared'
        }
      }),
      fact: { state: 'waiting' }
    });

    expect(action).toEqual({ kind: 'reconcile_op' });
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
      active_op: {
        kind: 'create_repair',
        repair_bead_id: 'UI-repair',
        status: 'observed'
      }
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
      attempt: {
        attempt_id: 'att-repair',
        bead_id: 'UI-repair',
        status: 'done'
      }
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
      attempt: {
        attempt_id: 'att-repair',
        bead_id: 'UI-repair',
        status: 'done'
      }
    });

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root'].active_op
    ).toMatchObject({ op_id: 'dispatch-1' });
  });

  test('ignores a settlement from a different repair attempt identity', async () => {
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
      failure_key,
      attempt: {
        attempt_id: 'another-attempt',
        bead_id: 'UI-repair',
        status: 'done'
      }
    });

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root'].active_op
    ).toMatchObject({
      op_id: 'dispatch-1',
      attempt_id: 'att-repair'
    });
  });

  test('reconciles a terminal repair attempt after restart', async () => {
    const store = seededCompletionStore();
    const failure_key = linkRepairSubject(store);
    store.beginRepairOp(DRIVER_WS, {
      root_bead_id: 'UI-root',
      op: {
        op_id: 'dispatch-restart',
        kind: 'dispatch_repair',
        failure_key,
        attempt_id: 'att-restart',
        repair_bead_id: 'UI-repair',
        status: 'prepared'
      },
      attempt: { attempt_id: 'att-restart', bead_id: 'UI-repair' }
    });
    store.updateAttempt(DRIVER_WS, {
      attempt_id: 'att-restart',
      patch: { status: 'done', finished_at: 2 }
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
        completionGate: vi.fn(async () =>
          redGate({
            subject: repair_subject,
            verdict: { enabled: true, tier: 'ready', reason: null },
            evidence: {}
          })
        )
      }
    });

    await driver.onAction(
      'UI-root',
      { kind: 'reconcile_op' },
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    );

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'gating',
      subject: repair_subject,
      active_op: null,
      repair_sessions_used: 1
    });
  });

  test('adopts a repair PR observed after its session settlement', async () => {
    const store = seededCompletionStore();
    const failure_key = linkRepairSubject(store);
    store.beginRepairOp(DRIVER_WS, {
      root_bead_id: 'UI-root',
      op: {
        op_id: 'dispatch-wait',
        kind: 'dispatch_repair',
        failure_key,
        attempt_id: 'att-wait',
        repair_bead_id: 'UI-repair',
        status: 'prepared'
      },
      attempt: { attempt_id: 'att-wait', bead_id: 'UI-repair' }
    });
    const repair_subject = {
      role: 'repair',
      bead_id: 'UI-repair',
      pr_url: 'https://github.com/o/r/pull/2',
      head_sha: 'c'.repeat(40),
      base_sha: 'b'.repeat(40),
      merged_sha: null
    };
    const completionGate = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, reason: 'pr_ref_unknown' })
      .mockResolvedValue(
        redGate({
          subject: repair_subject,
          verdict: { enabled: true, tier: 'ready', reason: null },
          evidence: {}
        })
      );
    const driver = actionDriver(store, {
      prActions: { completionGate }
    });

    await driver.onAttemptSettled({
      root_bead_id: 'UI-root',
      op_id: 'dispatch-wait',
      failure_key,
      attempt: {
        attempt_id: 'att-wait',
        bead_id: 'UI-repair',
        status: 'done'
      }
    });
    const waiting = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    const fact = await driver.observe('UI-root', waiting);
    const action = decideCompletionAction({
      auto_merge: true,
      intent: waiting,
      fact
    });
    if (!action) {
      throw new Error('repair PR adoption action missing');
    }
    await driver.onAction('UI-root', action, waiting);

    expect(fact).toMatchObject({ state: 'repair_pr_open' });
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'gating',
      subject: repair_subject,
      active_op: null
    });
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

  test('prerecords a merge operation before kicking the existing driver', async () => {
    const store = seededCompletionStore();
    const kickMerge = vi.fn();
    const driver = actionDriver(store, {
      prActions: {
        completionGate: vi.fn(async () =>
          redGate({
            verdict: { enabled: true, tier: 'ready', reason: null },
            evidence: {}
          })
        )
      },
      kickMerge
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.observe('UI-root', current);
    await driver.onAction('UI-root', { kind: 'merge_subject' }, current);

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'merging',
      active_op: {
        kind: 'merge_subject',
        status: 'prepared',
        attempt_id: null
      }
    });
    expect(kickMerge).toHaveBeenCalledTimes(1);
  });

  test('routes a merged root verify failure into a linked base repair', async () => {
    const store = seededCompletionStore();
    store.recordCleanupFailure(DRIVER_WS, {
      bead_id: 'UI-root',
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed',
      output_tail: 'merged regression',
      log_path: '/state/postmerge.log'
    });
    const merged_subject = {
      ...intent().subject,
      base_sha: 'c'.repeat(40),
      merged_sha: 'c'.repeat(40)
    };
    const dispatchCompletionRepair = vi.fn(async () => ({ ok: true }));
    const driver = actionDriver(store, {
      prActions: {
        completionGate: vi.fn(async () =>
          redGate({
            base_sha: 'c'.repeat(40),
            subject: merged_subject,
            verdict: { enabled: false, tier: 'merged', reason: null },
            evidence: {}
          })
        )
      },
      completionRepair: {
        probeOwnership: vi.fn(),
        ensureLinkedBead: vi.fn(async () => ({ bead_id: 'UI-repair' }))
      },
      scheduler: { dispatchCompletionRepair }
    });
    await driver.onMergeResult('UI-root', 'UI-root', {
      ok: false,
      action: 'merged',
      reason: 'verify_cmd_failed',
      cleanup_step: 'post_merge_verify'
    });
    const cleaning = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    const fact = await driver.observe('UI-root', cleaning);
    const action = decideCompletionAction({
      auto_merge: true,
      intent: cleaning,
      fact
    });
    if (!action) {
      throw new Error('post-merge action missing');
    }
    await driver.onAction('UI-root', action, cleaning);

    expect(fact).toMatchObject({
      state: 'cleanup_repairable',
      failure_key: {
        stage: 'post_merge_verify',
        reason: 'verify_cmd_failed',
        subject_sha: 'c'.repeat(40),
        base_sha: 'c'.repeat(40)
      }
    });
    expect(dispatchCompletionRepair).toHaveBeenCalledWith(
      DRIVER_WS,
      expect.objectContaining({
        op: expect.objectContaining({
          kind: 'dispatch_repair',
          repair_bead_id: 'UI-repair'
        })
      })
    );
  });

  test('terminalizes a non-repairable cleanup failure with its evidence', async () => {
    const store = seededCompletionStore();
    store.setCompletionSubject(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'cleaning',
      subject: { ...intent().subject, merged_sha: 'c'.repeat(40) }
    });
    store.recordCleanupFailure(DRIVER_WS, {
      bead_id: 'UI-root',
      step: 'child_sweep',
      reason: 'bd_read_failed',
      detail: 'bd unavailable'
    });
    const driver = actionDriver(store);
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    const fact = await driver.observe('UI-root', current);
    const action = decideCompletionAction({
      auto_merge: true,
      intent: current,
      fact
    });
    if (!action) {
      throw new Error('cleanup terminal action missing');
    }
    await driver.onAction('UI-root', action, current);

    expect(store.snapshot(DRIVER_WS)).toMatchObject({
      merge_queue: [],
      completion_intents: {
        'UI-root': {
          phase: 'needs_human',
          terminal_reason: {
            reason: 'child_sweep:bd_read_failed',
            stage: 'coordinator',
            evidence: expect.stringContaining('bd unavailable')
          }
        }
      }
    });
  });

  test('adopts a journaled create operation without duplicating its repair session', async () => {
    const store = seededCompletionStore();
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
    const ensureLinkedBead = vi.fn(async () => ({ bead_id: 'UI-repair' }));
    const dispatchCompletionRepair = vi.fn(async (_workspace, input) => {
      const result = store.beginRepairOp(DRIVER_WS, {
        root_bead_id: input.root_bead_id,
        op: input.op,
        attempt: {
          attempt_id: input.op.attempt_id,
          bead_id: input.op.repair_bead_id,
          status: 'running'
        }
      });
      return { ok: result.ok };
    });
    const driver = actionDriver(store, {
      completionRepair: {
        probeOwnership: vi.fn(),
        ensureLinkedBead
      },
      scheduler: { dispatchCompletionRepair }
    });

    await driver.onAction(
      'UI-root',
      { kind: 'reconcile_op' },
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    );
    await driver.onAction(
      'UI-root',
      { kind: 'reconcile_op' },
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    );

    const queue = store.snapshot(DRIVER_WS);
    expect(ensureLinkedBead).toHaveBeenCalledTimes(1);
    expect(dispatchCompletionRepair).toHaveBeenCalledTimes(1);
    expect(queue.completion_intents['UI-root']).toMatchObject({
      repair_sessions_used: 1,
      active_op: {
        kind: 'dispatch_repair',
        status: 'dispatched',
        repair_bead_id: 'UI-repair'
      }
    });
  });

  test('replays root cleanup after the post-merge repair child lands', async () => {
    const store = seededCompletionStore();
    store.recordCleanupFailure(DRIVER_WS, {
      bead_id: 'UI-root',
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed'
    });
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
      base_sha: 'd'.repeat(40),
      merged_sha: 'd'.repeat(40)
    };
    const resumeCompletionCleanup = vi.fn(async () => {
      store.moveToDone(DRIVER_WS, { bead_id: 'UI-root' });
      return { ok: true, step: null, reason: null };
    });
    const driver = actionDriver(store, {
      prActions: {
        completionGate: vi.fn(async () =>
          redGate({
            subject: root_subject,
            verdict: { enabled: false, tier: 'merged', reason: null },
            evidence: {}
          })
        ),
        resumeCompletionCleanup
      }
    });

    await driver.onMergeResult('UI-root', 'UI-repair', {
      ok: true,
      action: 'merged'
    });

    expect(resumeCompletionCleanup).toHaveBeenCalledWith('UI-root');
    expect(store.snapshot(DRIVER_WS)).toMatchObject({
      merge_queue: [],
      completion_intents: {
        'UI-root': { phase: 'completed', active_op: null }
      }
    });
  });

  test('replays a prepared cleanup operation after restart', async () => {
    const store = seededCompletionStore();
    const failure_key = createCompletionFailureKey({
      stage: 'post_merge_cleanup',
      reason: 'cleanup_incomplete',
      subject_sha: 'c'.repeat(40),
      base_sha: 'b'.repeat(40),
      evidence: {}
    });
    store.setCompletionSubject(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'cleaning',
      subject: { ...intent().subject, merged_sha: 'c'.repeat(40) }
    });
    store.prepareCompletionOp(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'cleaning',
      op: {
        op_id: 'cleanup-restart',
        kind: 'retry_cleanup',
        failure_key,
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });
    const resumeCompletionCleanup = vi.fn(async () => {
      store.moveToDone(DRIVER_WS, { bead_id: 'UI-root' });
      return { ok: true, step: null, reason: null };
    });
    const driver = actionDriver(store, {
      prActions: {
        completionGate: vi.fn(),
        resumeCompletionCleanup
      }
    });

    await driver.onAction(
      'UI-root',
      { kind: 'reconcile_op' },
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    );

    expect(resumeCompletionCleanup).toHaveBeenCalledTimes(1);
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({ phase: 'completed', active_op: null });
  });

  test('terminalizes a third repair request without creating another child', async () => {
    const store = seededCompletionStore();
    for (const n of [1, 2]) {
      const failure_key = createCompletionFailureKey({
        stage: 'merge_gate',
        reason: 'verify_cmd_failed',
        subject_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        evidence: { output_tail: `red-${n}` }
      });
      store.beginRepairOp(DRIVER_WS, {
        root_bead_id: 'UI-root',
        op: {
          op_id: `resume-${n}`,
          kind: 'resume_root',
          failure_key,
          attempt_id: `repair-${n}`,
          repair_bead_id: null,
          status: 'prepared'
        },
        attempt: { attempt_id: `repair-${n}`, bead_id: 'UI-root' }
      });
      store.advanceCompletionOp(DRIVER_WS, {
        root_bead_id: 'UI-root',
        op_id: `resume-${n}`,
        status: 'consumed',
        next_phase: 'gating',
        clear: true
      });
    }
    const ensureLinkedBead = vi.fn();
    const driver = actionDriver(store, {
      completionRepair: {
        probeOwnership: vi.fn(),
        ensureLinkedBead
      }
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    await driver.observe('UI-root', current);

    await driver.onAction('UI-root', { kind: 'create_repair' }, current);

    expect(ensureLinkedBead).not.toHaveBeenCalled();
    expect(store.snapshot(DRIVER_WS)).toMatchObject({
      merge_queue: [],
      completion_intents: {
        'UI-root': {
          phase: 'needs_human',
          repair_sessions_used: 2,
          terminal_reason: { reason: 'repair_session_budget_exhausted' }
        }
      }
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
