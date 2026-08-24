import { createHash } from 'node:crypto';
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  COMPLETION_RETRY_DELAYS_MS,
  COMPLETION_RETRY_POLICY,
  classifyCompletionFailure,
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
    subject_stack: [],
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
      target_base: 'main',
      base_oid: 'b'.repeat(40),
      runner: 'claude'
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
    source_attempt_id: 'att-root',
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
      tier: 'verify',
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
 * @param {string|null} [op_id]
 */
function mergeOperation(op_id = null) {
  const failure_key = createCompletionFailureKey({
    stage: 'merge_subject',
    reason: 'merge_ready',
    subject_sha: 'a'.repeat(40),
    base_sha: 'b'.repeat(40),
    evidence: {}
  });
  const generated_id = `completion-${createHash('sha256')
    .update(
      JSON.stringify({
        root_bead_id: 'UI-root',
        kind: 'merge_subject',
        repair_round: null,
        stage: failure_key.stage,
        reason: failure_key.reason,
        subject_sha: failure_key.subject_sha,
        base_sha: failure_key.base_sha,
        result_digest: failure_key.result_digest
      })
    )
    .digest('hex')
    .slice(0, 24)}`;
  return {
    op_id: op_id || generated_id,
    kind: /** @type {const} */ ('merge_subject'),
    failure_key,
    attempt_id: null,
    repair_bead_id: null,
    status: /** @type {const} */ ('prepared')
  };
}

/**
 * @param {ReturnType<typeof seededCompletionStore>} store
 */
function terminalizeResolutionTimeout(store) {
  store.prepareCompletionOp(DRIVER_WS, {
    root_bead_id: 'UI-root',
    phase: 'merging',
    op: mergeOperation()
  });
  store.terminalizeCompletionIntent(DRIVER_WS, {
    root_bead_id: 'UI-root',
    terminal: {
      reason: 'resolution_timeout',
      stage: 'conflict_resolution',
      failure_key: null,
      evidence: 'historical timeout',
      log_path: null,
      at: 1
    }
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
        output_tail: 'line 1\r\nline 2'
      }
    });
    const second = createCompletionFailureKey({
      stage: 'merge_gate',
      reason: 'verify_cmd_failed',
      subject_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      evidence: {
        output_tail: 'line 1\nline 2'
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

  test('enters cleanup after a merged root is authoritatively re-pinned', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({ phase: 'gating' }),
      fact: { state: 'cleanup_repairable' }
    });

    expect(action).toEqual({ kind: 'enter_cleanup' });
  });

  test('leaves repairable cleanup with the resolution ladder owner', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({ phase: 'cleaning' }),
      fact: { state: 'cleanup_repairable' }
    });

    expect(action).toBe(null);
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

  test('leaves an already paused intent idle while auto-merge is off', () => {
    const action = decideCompletionAction({
      auto_merge: false,
      intent: intent({ phase: 'paused' }),
      fact: { state: 'waiting' }
    });

    expect(action).toBe(null);
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

  test('resumes paused state through the store-owned phase selector', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({ phase: 'paused' }),
      fact: { state: 'waiting' }
    });

    expect(action).toEqual({ kind: 'resume_intent' });
  });
});

describe('worker/completion-intent action driver', () => {
  test('binds a verify failure key to the gate subject base authority', async () => {
    const store = seededCompletionStore();
    const base_sha = '1'.repeat(40);
    const subject = { ...intent().subject, base_sha };
    store.setCompletionSubject(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'gating',
      subject
    });
    const driver = actionDriver(store, {
      prActions: {
        completionGate: vi.fn(async () => redGate({ base_sha, subject }))
      }
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    const fact = await driver.observe('UI-root', current);

    expect(fact).toMatchObject({
      state: 'verify_red',
      failure_key: { base_sha },
      gated: { base_sha, subject: { base_sha } }
    });
  });

  test('keeps a repo-operation-owned verify intent active', async () => {
    const store = seededCompletionStore();
    const dispatchCompletionRepair = vi.fn();
    const ensureLinkedBead = vi.fn();
    const driver = actionDriver(store, {
      completionRepair: {
        probeOwnership: vi.fn(async () => ({ state: 'repo_operation' })),
        ensureLinkedBead
      },
      scheduler: { dispatchCompletionRepair }
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.observe('UI-root', current);
    await driver.onAction('UI-root', { kind: 'probe' }, current);

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({ phase: 'gating', active_op: null });
    expect(dispatchCompletionRepair).not.toHaveBeenCalled();
    expect(ensureLinkedBead).not.toHaveBeenCalled();
  });

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
        source: 'verify'
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

  test('uses a fresh operation identity for a second no-head-change repair round', async () => {
    const store = seededCompletionStore();
    /** @type {any[]} */
    const operations = [];
    const dispatchCompletionRepair = vi.fn(async (_workspace, input) => {
      operations.push(input.op);
      const result = store.beginRepairOp(DRIVER_WS, {
        root_bead_id: input.root_bead_id,
        op: input.op,
        attempt: {
          attempt_id: input.op.attempt_id,
          bead_id: 'UI-root',
          status: 'running'
        }
      });
      return { ok: result.ok };
    });
    const driver = actionDriver(store, {
      scheduler: { dispatchCompletionRepair }
    });

    for (let round = 0; round < 2; round += 1) {
      const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
      await driver.observe('UI-root', current);
      await driver.onAction('UI-root', { kind: 'resume_root' }, current);
      const active =
        store.snapshot(DRIVER_WS).completion_intents['UI-root'].active_op;
      if (round === 0) {
        if (!active) {
          throw new Error('first repair operation missing');
        }
        store.advanceCompletionOp(DRIVER_WS, {
          root_bead_id: 'UI-root',
          op_id: active.op_id,
          status: 'consumed',
          next_phase: 'gating',
          clear: true
        });
      }
    }

    expect(operations).toHaveLength(2);
    expect(operations[0].op_id).not.toBe(operations[1].op_id);
    expect(operations[0].attempt_id).not.toBe(operations[1].attempt_id);
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
        .repair_sessions_used
    ).toBe(2);
  });

  test('resumes the current repair subject when its own PR is red', async () => {
    const store = seededCompletionStore();
    linkRepairSubject(store);
    const repair_subject = {
      role: /** @type {const} */ ('repair'),
      bead_id: 'UI-repair',
      pr_url: 'https://github.com/o/r/pull/2',
      head_sha: 'c'.repeat(40),
      base_sha: 'b'.repeat(40),
      merged_sha: null
    };
    store.setCompletionSubject(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'gating',
      subject: repair_subject
    });
    const dispatchCompletionRepair = vi.fn(async () => ({ ok: true }));
    const driver = actionDriver(store, {
      prActions: {
        completionGate: vi.fn(async () => redGate({ subject: repair_subject }))
      },
      scheduler: { dispatchCompletionRepair }
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.observe('UI-root', current);
    await driver.onAction('UI-root', { kind: 'resume_root' }, current);

    expect(dispatchCompletionRepair).toHaveBeenCalledWith(
      DRIVER_WS,
      expect.objectContaining({
        op: expect.objectContaining({ kind: 'resume_root' })
      })
    );
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root'].phase
    ).not.toBe('needs_human');
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
      { bead_id: 'UI-root', resolution_rounds: 0, resolution: null }
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

  test('adopts a unique legacy terminal descendant with a fresh PR subject', async () => {
    const store = seededCompletionStore();
    const failure_key = createCompletionFailureKey({
      stage: 'merge_gate',
      reason: 'verify_cmd_failed',
      subject_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      evidence: { output_tail: 'regression' }
    });
    store.beginRepairOp(DRIVER_WS, {
      root_bead_id: 'UI-root',
      op: {
        op_id: 'legacy-resume',
        kind: 'resume_root',
        failure_key,
        attempt_id: 'legacy-source',
        repair_bead_id: null,
        status: 'prepared'
      },
      attempt: {
        attempt_id: 'legacy-source',
        bead_id: 'UI-root',
        status: 'paused',
        completion_root_id: 'UI-root',
        completion_op_id: 'legacy-resume',
        completion_mode: 'resume_root',
        completion_failure_key: failure_key
      }
    });
    store.appendAttempt(DRIVER_WS, {
      expected_revision: store.snapshot(DRIVER_WS).revision,
      attempt: {
        attempt_id: 'legacy-leaf',
        bead_id: 'UI-root',
        resumed_from: 'legacy-source',
        status: 'done'
      }
    });
    const fresh_subject = {
      ...intent().subject,
      head_sha: 'd'.repeat(40)
    };
    const completionGate = vi.fn(async () =>
      redGate({
        subject: fresh_subject,
        verdict: { enabled: true, tier: 'ready', reason: null },
        evidence: {}
      })
    );
    const driver = actionDriver(store, {
      prActions: { completionGate }
    });

    await driver.onAction(
      'UI-root',
      { kind: 'reconcile_op' },
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    );

    expect(completionGate).toHaveBeenCalledWith('UI-root', 'root');
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'gating',
      subject: fresh_subject,
      active_op: null,
      repair_sessions_used: 1
    });
    expect(store.snapshot(DRIVER_WS).attempts['legacy-leaf']).toMatchObject({
      completion_root_id: 'UI-root',
      completion_op_id: 'legacy-resume',
      completion_mode: 'resume_root',
      completion_failure_key: failure_key
    });
  });

  test('terminalizes an ambiguous legacy completion lineage', async () => {
    const store = seededCompletionStore();
    const failure_key = createCompletionFailureKey({
      stage: 'merge_gate',
      reason: 'verify_cmd_failed',
      subject_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      evidence: { output_tail: 'regression' }
    });
    store.beginRepairOp(DRIVER_WS, {
      root_bead_id: 'UI-root',
      op: {
        op_id: 'legacy-branch',
        kind: 'resume_root',
        failure_key,
        attempt_id: 'legacy-source',
        repair_bead_id: null,
        status: 'prepared'
      },
      attempt: {
        attempt_id: 'legacy-source',
        bead_id: 'UI-root',
        status: 'paused',
        completion_root_id: 'UI-root',
        completion_op_id: 'legacy-branch',
        completion_mode: 'resume_root',
        completion_failure_key: failure_key
      }
    });
    for (const attempt_id of ['legacy-a', 'legacy-b']) {
      store.appendAttempt(DRIVER_WS, {
        expected_revision: store.snapshot(DRIVER_WS).revision,
        attempt: {
          attempt_id,
          bead_id: 'UI-root',
          resumed_from: 'legacy-source',
          status: 'done'
        }
      });
    }
    const driver = actionDriver(store);

    await driver.onAction(
      'UI-root',
      { kind: 'reconcile_op' },
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    );

    expect(store.snapshot(DRIVER_WS)).toMatchObject({
      merge_queue: [],
      completion_intents: {
        'UI-root': {
          phase: 'needs_human',
          repair_sessions_used: 1,
          terminal_reason: {
            reason: 'repair_resume_lineage_ambiguous',
            stage: 'reconciliation',
            evidence: 'legacy_lineage_ambiguous'
          }
        }
      }
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
      { bead_id: 'UI-root', resolution_rounds: 0, resolution: null }
    ]);
    expect(queue.completion_intents['UI-root']).toMatchObject({
      phase: 'gating',
      subject: root_subject
    });
  });

  test('returns a nested repair to its prior repair subject', async () => {
    const store = seededCompletionStore();
    const first_failure = linkRepairSubject(store);
    const first_subject = {
      role: /** @type {const} */ ('repair'),
      bead_id: 'UI-repair',
      pr_url: 'https://github.com/o/r/pull/2',
      head_sha: 'c'.repeat(40),
      base_sha: 'b'.repeat(40),
      merged_sha: null
    };
    store.setCompletionSubject(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'gating',
      subject: first_subject
    });
    store.prepareCompletionOp(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'repairing',
      op: {
        op_id: 'create-2',
        kind: 'create_repair',
        failure_key: { ...first_failure, subject_sha: 'c'.repeat(40) },
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });
    store.recordCompletionRepairBead(DRIVER_WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-2',
      repair_bead_id: 'UI-repair-2'
    });
    store.advanceCompletionOp(DRIVER_WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-2',
      status: 'consumed',
      next_phase: 'repairing',
      clear: true
    });
    store.setCompletionSubject(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'merging',
      subject: {
        role: 'repair',
        bead_id: 'UI-repair-2',
        pr_url: 'https://github.com/o/r/pull/3',
        head_sha: 'd'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    const driver = actionDriver(store, {
      prActions: {
        completionGate: vi.fn(async () =>
          redGate({
            subject: first_subject,
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

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      subject: { bead_id: 'UI-repair-2' },
      subject_stack: [
        { role: 'root', bead_id: 'UI-root' },
        { role: 'repair', bead_id: 'UI-repair' }
      ]
    });

    await driver.onMergeResult('UI-root', 'UI-repair-2', {
      ok: true,
      action: 'merged'
    });

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'gating',
      subject: first_subject,
      subject_stack: [{ role: 'root', bead_id: 'UI-root' }]
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

  test('does not create a linked repair for merged cleanup failure', async () => {
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
    const ensureLinkedBead = vi.fn(async () => ({ bead_id: 'UI-repair' }));
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
        ensureLinkedBead
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

    expect(fact).toMatchObject({
      state: 'cleanup_repairable',
      failure_key: {
        stage: 'post_merge_verify',
        reason: 'verify_cmd_failed',
        subject_sha: 'c'.repeat(40),
        base_sha: 'c'.repeat(40)
      }
    });
    expect(action).toBe(null);
    expect(ensureLinkedBead).not.toHaveBeenCalled();
    expect(dispatchCompletionRepair).not.toHaveBeenCalled();
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'cleaning',
      repair_sessions_used: 0,
      active_op: null
    });
  });

  test('moves an initially observed merged root from gating into cleaning', async () => {
    const store = seededCompletionStore();
    const merged_subject = {
      ...intent().subject,
      base_sha: 'c'.repeat(40),
      merged_sha: 'c'.repeat(40)
    };
    store.setCompletionSubject(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'gating',
      subject: merged_subject
    });
    store.recordCleanupFailure(DRIVER_WS, {
      bead_id: 'UI-root',
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed'
    });
    const driver = actionDriver(store, {
      prActions: {
        completionGate: vi.fn(async () =>
          redGate({
            base_sha: merged_subject.base_sha,
            subject: merged_subject,
            verdict: { enabled: false, tier: 'merged', reason: null },
            evidence: {}
          })
        )
      }
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    const fact = await driver.observe('UI-root', current);
    const action = decideCompletionAction({
      auto_merge: true,
      intent: current,
      fact
    });
    if (!action) {
      throw new Error('cleanup entry action missing');
    }
    await driver.onAction('UI-root', action, current);

    expect(action).toEqual({ kind: 'enter_cleanup' });
    expect(store.snapshot(DRIVER_WS).completion_intents['UI-root'].phase).toBe(
      'cleaning'
    );
  });

  test('classifies a verified Adapter regression as repairable cleanup evidence', async () => {
    const store = seededCompletionStore();
    store.setCompletionSubject(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'cleaning',
      subject: { ...intent().subject, merged_sha: 'c'.repeat(40) }
    });
    store.recordCleanupFailure(DRIVER_WS, {
      bead_id: 'UI-root',
      step: 'deploy',
      reason: 'deploy_failed',
      failure_code: 'adapter_regression',
      retryable: false
    });
    const driver = actionDriver(store);
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    const fact = await driver.observe('UI-root', current);

    expect(fact).toMatchObject({
      state: 'cleanup_repairable',
      failure_key: { stage: 'deploy', reason: 'deploy_failed' }
    });
  });

  test.each([
    ['deploy_config_invalid', undefined],
    ['deploy_missing_for_self', undefined],
    ['deploy_not_detached_for_self', undefined],
    ['deploy_verify_missing', undefined],
    ['deploy_failed', undefined],
    ['managed_pointer_escape', 'pointer_escape'],
    ['managed_restart_effect_ambiguous', 'restart_effect_ambiguous']
  ])(
    'keeps %s on the unified cleanup resolution path',
    async (reason, failure_code) => {
      const store = seededCompletionStore();
      store.setCompletionSubject(DRIVER_WS, {
        root_bead_id: 'UI-root',
        phase: 'cleaning',
        subject: { ...intent().subject, merged_sha: 'c'.repeat(40) }
      });
      store.recordCleanupFailure(DRIVER_WS, {
        bead_id: 'UI-root',
        step: 'deploy',
        reason,
        ...(failure_code ? { failure_code, retryable: false } : {})
      });
      const driver = actionDriver(store);
      const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

      const fact = await driver.observe('UI-root', current);

      expect(fact).toMatchObject({
        state: 'cleanup_repairable',
        failure_key: { stage: 'deploy', reason }
      });
    }
  );

  test('does not notify when a gate subject mutation is refused', async () => {
    const store = seededCompletionStore();
    store.pauseCompletionIntent(DRIVER_WS, { root_bead_id: 'UI-root' });
    const notifyChanged = vi.fn();
    const driver = actionDriver(store, { notifyChanged });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.observe('UI-root', current);
    await driver.onAction('UI-root', { kind: 'gate' }, current);

    expect(notifyChanged).not.toHaveBeenCalled();
    expect(store.snapshot(DRIVER_WS).completion_intents['UI-root'].phase).toBe(
      'paused'
    );
  });

  test('does not notify when a pause mutation is refused', async () => {
    const store = seededCompletionStore();
    store.pauseCompletionIntent(DRIVER_WS, { root_bead_id: 'UI-root' });
    const notifyChanged = vi.fn();
    const driver = actionDriver(store, { notifyChanged });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.onAction('UI-root', { kind: 'pause' }, current);

    expect(notifyChanged).not.toHaveBeenCalled();
  });

  test('leaves a cleanup failure on the unified resolution path', async () => {
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
    expect(fact).toMatchObject({
      state: 'cleanup_repairable',
      failure_key: { stage: 'child_sweep', reason: 'bd_read_failed' }
    });
    expect(action).toBe(null);
  });

  test('opens no automatic repair session while auto_repair is off', async () => {
    const store = seededCompletionStore();
    store.setCompletionSubject(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'cleaning',
      subject: { ...intent().subject, merged_sha: 'c'.repeat(40) }
    });
    store.recordCleanupFailure(DRIVER_WS, {
      bead_id: 'UI-root',
      step: 'child_sweep',
      reason: 'bd_read_failed'
    });
    store.toggleAutoRepair(DRIVER_WS, {
      expected_revision: store.snapshot(DRIVER_WS).revision,
      on: false
    });
    const dispatchCompletionRepair = vi.fn(async () => ({ ok: true }));
    const driver = actionDriver(store, {
      scheduler: { dispatchCompletionRepair }
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.observe('UI-root', current);
    await driver.onAction('UI-root', { kind: 'create_repair' }, current);

    expect(dispatchCompletionRepair).not.toHaveBeenCalled();
  });

  test('leaves the intent untouched when the toggle blocks the dispatch', async () => {
    const store = seededCompletionStore();
    store.setCompletionSubject(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'cleaning',
      subject: { ...intent().subject, merged_sha: 'c'.repeat(40) }
    });
    store.recordCleanupFailure(DRIVER_WS, {
      bead_id: 'UI-root',
      step: 'child_sweep',
      reason: 'bd_read_failed'
    });
    store.toggleAutoRepair(DRIVER_WS, {
      expected_revision: store.snapshot(DRIVER_WS).revision,
      on: false
    });
    const driver = actionDriver(store);
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.observe('UI-root', current);
    await driver.onAction('UI-root', { kind: 'create_repair' }, current);

    const after = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    expect([after.terminal_reason, after.repair_sessions_used]).toEqual([
      null,
      0
    ]);
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

  test('keeps a live resolution deadline nonterminal', async () => {
    const store = seededCompletionStore();
    store.prepareCompletionOp(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'merging',
      op: mergeOperation()
    });
    const driver = actionDriver(store);

    await driver.onMergeResult('UI-root', 'UI-root', {
      ok: false,
      action: 'conflict_resolution',
      reason: 'resolution_timeout'
    });

    expect(store.snapshot(DRIVER_WS)).toMatchObject({
      merge_queue: [{ bead_id: 'UI-root' }],
      completion_intents: {
        'UI-root': {
          phase: 'merging',
          active_op: {
            kind: 'merge_subject',
            op_id: expect.stringMatching(/^completion-[0-9a-f]{24}$/)
          },
          terminal_reason: null
        }
      }
    });
  });

  test.each([
    'resolution_wait_invalid',
    'resolution_attempt_missing',
    'resolution_lineage_ambiguous',
    'resolution_subject_mismatch',
    'resolution_attempt_not_conflict',
    'resolution_attempt_status_invalid',
    'resolution_ready_lineage_active'
  ])(
    'preserves the concrete conflict-resolution failure %s',
    async (reason) => {
      const store = seededCompletionStore();
      store.prepareCompletionOp(DRIVER_WS, {
        root_bead_id: 'UI-root',
        phase: 'merging',
        op: mergeOperation()
      });
      const completionGate = vi.fn();
      const driver = actionDriver(store, { prActions: { completionGate } });

      await driver.onMergeResult('UI-root', 'UI-root', {
        ok: false,
        action: 'conflict_resolution',
        reason
      });

      expect(completionGate).not.toHaveBeenCalled();
      expect(store.snapshot(DRIVER_WS)).toMatchObject({
        merge_queue: [],
        completion_intents: {
          'UI-root': {
            phase: 'needs_human',
            terminal_reason: { reason, stage: 'conflict_resolution' }
          }
        }
      });
    }
  );

  test.each([
    [
      'CLEAN',
      { enabled: true, tier: 'ready', base_badge: '최신', reason: null }
    ],
    [
      'BEHIND',
      {
        enabled: false,
        tier: 'base',
        base_badge: 'base 뒤처짐',
        reason: 'branch_behind'
      }
    ]
  ])(
    'adopts one historical %s timeout exactly once',
    async (_label, verdict) => {
      const store = seededCompletionStore();
      terminalizeResolutionTimeout(store);
      const completionGate = vi.fn(async () => ({
        ok: true,
        target_base: 'main',
        base_sha: 'd'.repeat(40),
        subject: {
          ...intent().subject,
          head_sha: 'c'.repeat(40),
          base_sha: 'd'.repeat(40)
        },
        verdict,
        evidence: {}
      }));
      const driver = actionDriver(store, { prActions: { completionGate } });
      let queue = store.snapshot(DRIVER_WS);

      const adopted = await driver.adoptLegacyTimeout(
        'UI-root',
        queue.completion_intents['UI-root'],
        queue
      );
      queue = store.snapshot(DRIVER_WS);
      const repeated = await driver.adoptLegacyTimeout(
        'UI-root',
        queue.completion_intents['UI-root'],
        queue
      );

      expect(adopted).toBe(true);
      expect(repeated).toBe(false);
      expect(completionGate).toHaveBeenCalledTimes(1);
      expect(queue).toMatchObject({
        merge_queue: [
          { bead_id: 'UI-root', resolution_rounds: 0, resolution: null }
        ],
        completion_intents: {
          'UI-root': {
            phase: 'merging',
            active_op: {
              kind: 'merge_subject',
              op_id: expect.stringMatching(/^completion-[0-9a-f]{24}$/)
            },
            terminal_reason: null,
            subject: { head_sha: 'c'.repeat(40), base_sha: 'd'.repeat(40) }
          }
        }
      });
    }
  );

  test('adopts one exact live DIRTY leaf at the conservative last round', async () => {
    const store = seededCompletionStore();
    terminalizeResolutionTimeout(store);
    store.appendAttempt(DRIVER_WS, {
      expected_revision: store.snapshot(DRIVER_WS).revision,
      attempt: {
        attempt_id: 'legacy-resolution',
        bead_id: 'UI-root',
        conflict_resolution: true,
        status: 'running',
        started_at: 100
      }
    });
    const completionGate = vi.fn(async () => ({
      ok: true,
      subject: intent().subject,
      verdict: {
        enabled: false,
        tier: 'base',
        base_badge: '충돌',
        reason: 'merge_conflict'
      },
      evidence: {}
    }));
    const driver = actionDriver(store, { prActions: { completionGate } });
    const queue = store.snapshot(DRIVER_WS);

    const adopted = await driver.adoptLegacyTimeout(
      'UI-root',
      queue.completion_intents['UI-root'],
      queue
    );

    expect(adopted).toBe(true);
    expect(store.snapshot(DRIVER_WS).merge_queue).toMatchObject([
      {
        bead_id: 'UI-root',
        resolution_rounds: 1,
        resolution: {
          attempt_id: 'legacy-resolution',
          subject_bead_id: 'UI-root',
          state: 'waiting'
        }
      }
    ]);
  });

  test('preserves the legacy resolver deadline across a resumed leaf', async () => {
    const store = seededCompletionStore();
    terminalizeResolutionTimeout(store);
    store.appendAttempt(DRIVER_WS, {
      expected_revision: store.snapshot(DRIVER_WS).revision,
      attempt: {
        attempt_id: 'legacy-anchor',
        bead_id: 'UI-root',
        conflict_resolution: true,
        status: 'paused',
        started_at: 100
      }
    });
    store.appendAttempt(DRIVER_WS, {
      expected_revision: store.snapshot(DRIVER_WS).revision,
      attempt: {
        attempt_id: 'legacy-leaf',
        bead_id: 'UI-root',
        conflict_resolution: true,
        resumed_from: 'legacy-anchor',
        status: 'running',
        started_at: 10_000
      }
    });
    const completionGate = vi.fn(async () => ({
      ok: true,
      subject: intent().subject,
      verdict: {
        enabled: false,
        tier: 'base',
        base_badge: '충돌',
        reason: 'merge_conflict'
      },
      evidence: {}
    }));
    const driver = actionDriver(store, { prActions: { completionGate } });
    const queue = store.snapshot(DRIVER_WS);

    const adopted = await driver.adoptLegacyTimeout(
      'UI-root',
      queue.completion_intents['UI-root'],
      queue
    );

    expect(adopted).toBe(true);
    expect(store.snapshot(DRIVER_WS).merge_queue[0].resolution).toMatchObject({
      attempt_id: 'legacy-anchor',
      deadline_at: 100 + 30 * 60 * 1000,
      state: 'waiting'
    });
  });

  test('keeps an unprovable historical DIRTY budget terminal', async () => {
    const store = seededCompletionStore();
    terminalizeResolutionTimeout(store);
    const driver = actionDriver(store, {
      prActions: {
        completionGate: vi.fn(async () => ({
          ok: true,
          subject: intent().subject,
          verdict: {
            enabled: false,
            tier: 'base',
            base_badge: '충돌',
            reason: 'merge_conflict'
          },
          evidence: {}
        }))
      }
    });
    const queue = store.snapshot(DRIVER_WS);

    const handled = await driver.adoptLegacyTimeout(
      'UI-root',
      queue.completion_intents['UI-root'],
      queue
    );

    expect(handled).toBe(true);
    expect(store.snapshot(DRIVER_WS)).toMatchObject({
      merge_queue: [],
      completion_intents: {
        'UI-root': {
          phase: 'needs_human',
          terminal_reason: { reason: 'resolution_lineage_ambiguous' }
        }
      }
    });
  });

  test('does not adopt unrelated or contradictory terminal ownership', async () => {
    const unrelated = seededCompletionStore();
    unrelated.terminalizeCompletionIntent(DRIVER_WS, {
      root_bead_id: 'UI-root',
      terminal: {
        reason: 'resolution_round_cap',
        stage: 'conflict_resolution',
        failure_key: null,
        evidence: null,
        log_path: null,
        at: 1
      }
    });
    const contradictory = seededCompletionStore();
    contradictory.prepareCompletionOp(DRIVER_WS, {
      root_bead_id: 'UI-root',
      phase: 'repairing',
      op: {
        ...mergeOperation('wrong-owner'),
        kind: 'create_repair'
      }
    });
    contradictory.terminalizeCompletionIntent(DRIVER_WS, {
      root_bead_id: 'UI-root',
      terminal: {
        reason: 'resolution_timeout',
        stage: 'conflict_resolution',
        failure_key: null,
        evidence: null,
        log_path: null,
        at: 1
      }
    });
    const completionGate = vi.fn();

    for (const store of [unrelated, contradictory]) {
      const driver = actionDriver(store, { prActions: { completionGate } });
      const queue = store.snapshot(DRIVER_WS);
      const adopted = await driver.adoptLegacyTimeout(
        'UI-root',
        queue.completion_intents['UI-root'],
        queue
      );

      expect(adopted).toBe(false);
      expect(queue.completion_intents['UI-root'].phase).toBe('needs_human');
    }
    expect(completionGate).not.toHaveBeenCalled();
  });

  test('does not adopt a malformed historical timeout', async () => {
    const store = seededCompletionStore();
    terminalizeResolutionTimeout(store);
    const queue = store.snapshot(DRIVER_WS);
    queue.completion_intents['UI-root'] = /** @type {any} */ ({
      phase: 'needs_human',
      subject: null,
      active_op: null,
      terminal_reason: {
        reason: 'resolution_timeout',
        stage: 'conflict_resolution'
      }
    });
    const completionGate = vi.fn();
    const driver = actionDriver(store, { prActions: { completionGate } });

    const adopted = await driver.adoptLegacyTimeout(
      'UI-root',
      queue.completion_intents['UI-root'],
      queue
    );

    expect(adopted).toBe(false);
    expect(completionGate).not.toHaveBeenCalled();
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'needs_human',
      terminal_reason: { reason: 'resolution_timeout' }
    });
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

  test('runs one strict legacy adoption before the runnable head', async () => {
    const historical = intent({
      phase: 'needs_human',
      terminal_reason: {
        reason: 'resolution_timeout',
        stage: 'conflict_resolution'
      }
    });
    const adoptLegacy = vi.fn(async () => true);
    const observe = vi.fn();
    const onAction = vi.fn();
    const coordinator = createCompletionIntentCoordinator({
      workspace: '/repo',
      store: {
        snapshot: () => ({
          auto_merge: true,
          merge_queue: [{ bead_id: 'UI-later', resolution: null }],
          completion_intents: {
            'UI-root': historical,
            'UI-later': intent({
              subject: { ...intent().subject, bead_id: 'UI-later' }
            })
          }
        })
      },
      adoptLegacy,
      observe,
      onAction
    });

    await coordinator.reconcile();

    expect(adoptLegacy).toHaveBeenCalledWith(
      'UI-root',
      historical,
      expect.objectContaining({ auto_merge: true })
    );
    expect(observe).not.toHaveBeenCalled();
    expect(onAction).not.toHaveBeenCalled();
  });

  test('observes the first runnable completion instead of a yielded root', async () => {
    const later = intent({
      subject: { ...intent().subject, bead_id: 'UI-later' }
    });
    const observe = vi.fn(async () => ({
      state: /** @type {const} */ ('green')
    }));
    const onAction = vi.fn();
    const coordinator = createCompletionIntentCoordinator({
      workspace: '/repo',
      store: {
        snapshot: () => ({
          auto_merge: true,
          merge_queue: [
            {
              bead_id: 'UI-root',
              resolution: { state: 'yielded' }
            },
            { bead_id: 'UI-later', resolution: null }
          ],
          completion_intents: {
            'UI-root': intent({ phase: 'merging' }),
            'UI-later': later
          }
        })
      },
      observe,
      onAction
    });

    await coordinator.reconcile();

    expect(observe).toHaveBeenCalledWith(
      'UI-later',
      later,
      expect.objectContaining({ auto_merge: true })
    );
    expect(onAction).toHaveBeenCalledWith(
      'UI-later',
      { kind: 'merge_subject' },
      later
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

describe('worker/completion-intent resolution policy (UI-hk74 §3)', () => {
  test.each([
    [
      'receipt_unbacked:unit_plan_mismatch',
      'metadata_watch',
      'waiting_metadata'
    ],
    ['spec_id_missing', 'metadata_watch', 'waiting_metadata'],
    ['review_receipt_missing', 'auto_review', 'reviewing'],
    ['review_receipt_stale', 'auto_review', 'reviewing'],
    ['repair_bead_create_failed', 'retry', 'retrying'],
    ['repair_bead_readback_failed', 'retry', 'retrying'],
    ['repair_bead_record_failed', 'retry', 'retrying'],
    ['repair_dispatch_failed', 'retry', 'retrying'],
    ['continuation_persist_failed', 'retry', 'retrying'],
    ['cleanup_prerecord_failed', 'retry', 'retrying'],
    ['cleanup_settlement_record_failed', 'retry', 'retrying'],
    ['completion_gate_spawn_failed', 'retry', 'retrying'],
    ['verify_cmd_failed', 'retry', 'retrying']
  ])('maps %s to the %s class', (reason, expected_class, phase) => {
    const classified = classifyCompletionFailure(reason);

    expect(classified.class).toBe(expected_class);
    expect(classified.phase).toBe(phase);
  });

  test.each([
    ['reconciliation_ambiguous'],
    ['resolution_lineage_ambiguous'],
    ['repair_resume_lineage_ambiguous'],
    ['repair_attempt_missing'],
    ['cleanup_journal_conflict'],
    ['cleanup_completion_unrecorded'],
    ['repair_session_budget_exhausted'],
    ['intent_state_invalid'],
    ['ownership_undecidable']
  ])('keeps %s a human decision', (reason) => {
    const classified = classifyCompletionFailure(reason);

    expect(classified).toMatchObject({ class: 'human', phase: null });
  });

  test('classifies an unknown reason as human', () => {
    const classified = classifyCompletionFailure('brand_new_failure:detail');

    expect(classified.class).toBe('human');
  });

  test('classifies a non-string reason as human', () => {
    const classified = classifyCompletionFailure(null);

    expect(classified.class).toBe('human');
  });

  test.each([
    [
      'repair_bead_create_failed',
      'repairing',
      'create_repair',
      'repair_bead_recorded'
    ],
    [
      'repair_bead_readback_failed',
      'repairing',
      'create_repair',
      'repair_bead_recorded'
    ],
    [
      'repair_bead_record_failed',
      'repairing',
      'create_repair',
      'repair_bead_recorded'
    ],
    [
      'repair_dispatch_failed',
      'repairing',
      'dispatch_repair',
      'repair_attempt_dispatched'
    ],
    [
      'continuation_persist_failed',
      'repairing',
      'dispatch_repair',
      'repair_attempt_dispatched'
    ],
    [
      'completion_gate_spawn_failed',
      'gating',
      'gate',
      'verify_operation_created'
    ],
    ['verify_cmd_failed', 'gating', 'verify', 'verify_settled'],
    [
      'cleanup_prerecord_failed',
      'cleaning',
      'retry_cleanup',
      'cleanup_step_recorded'
    ],
    [
      'cleanup_settlement_record_failed',
      'cleaning',
      'retry_cleanup',
      'cleanup_step_recorded'
    ]
  ])('fixes the re-run of %s', (reason, return_phase, effect, success) => {
    const policy = classifyCompletionFailure(reason).retry;

    expect(policy).toMatchObject({ return_phase, effect, success });
  });

  test('names the durable inputs each retry family re-runs on', () => {
    expect(COMPLETION_RETRY_POLICY.repair_dispatch_failed.inputs).toEqual([
      'repair_bead_id'
    ]);
    expect(COMPLETION_RETRY_POLICY.verify_cmd_failed.inputs).toEqual([
      'operation_id',
      'head_sha',
      'base_sha'
    ]);
    expect(COMPLETION_RETRY_POLICY.cleanup_prerecord_failed.inputs).toEqual([
      'merged_sha',
      'cleanup_cursor'
    ]);
  });

  test('widens the retry delay ladder to one, five, and fifteen minutes', () => {
    expect(COMPLETION_RETRY_DELAYS_MS).toEqual([60_000, 300_000, 900_000]);
  });
});

describe('worker/completion-intent auto-resolution decisions (UI-hk74 §4)', () => {
  /**
   * @param {Record<string, unknown>} [patch]
   */
  function retryResolution(patch = {}) {
    return {
      class: 'retry',
      origin_reason: 'repair_dispatch_failed',
      origin_stage: 'repair_dispatch',
      return_phase: 'repairing',
      attempts: 0,
      next_at: 1_000,
      last_error: null,
      op: {
        completion_op_id: null,
        failure_key: null,
        repair_bead_id: 'UI-repair',
        continuation: null,
        continuation_mismatch: null,
        operation_id: null,
        head_sha: null,
        base_sha: null,
        merged_sha: null,
        cleanup_cursor: null
      },
      ...patch
    };
  }

  test('waits while a retry delay has not elapsed', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({ phase: 'retrying', auto_resolution: retryResolution() }),
      now: 999
    });

    expect(action).toBe(null);
  });

  test('runs a retry once its next_at has passed', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({ phase: 'retrying', auto_resolution: retryResolution() }),
      now: 1_000
    });

    expect(action).toEqual({ kind: 'retry_failed_op' });
  });

  test('runs an overdue retry immediately after a restart', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({ phase: 'retrying', auto_resolution: retryResolution() }),
      now: 9_000_000
    });

    expect(action).toEqual({ kind: 'retry_failed_op' });
  });

  test('waits out a live operation before spending a retry', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'retrying',
        auto_resolution: retryResolution(),
        active_op: mergeOperation()
      }),
      now: 9_000_000
    });

    expect(action).toEqual({ kind: 'reconcile_op' });
  });

  test('terminalizes a retry that exhausted its budget', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'retrying',
        auto_resolution: retryResolution({ attempts: 3, next_at: null })
      }),
      now: 9_000_000
    });

    expect(action).toEqual({
      kind: 'needs_human',
      reason: 'retry_exhausted:repair_dispatch_failed'
    });
  });

  test('pauses a retrying intent when auto-merge goes off', () => {
    const action = decideCompletionAction({
      auto_merge: false,
      intent: intent({ phase: 'retrying', auto_resolution: retryResolution() })
    });

    expect(action).toEqual({ kind: 'pause' });
  });

  test('re-checks metadata for a waiting_metadata intent', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'waiting_metadata',
        auto_resolution: retryResolution({
          class: 'metadata_watch',
          origin_reason: 'receipt_unbacked:unit_plan_mismatch',
          origin_stage: 'coordinator',
          return_phase: 'gating',
          next_at: null
        })
      }),
      now: 1
    });

    expect(action).toEqual({ kind: 'resume_metadata_check' });
  });

  test('fails a resolution phase closed when the record contradicts it', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'waiting_metadata',
        auto_resolution: retryResolution()
      }),
      now: 1
    });

    expect(action).toEqual({
      kind: 'needs_human',
      reason: 'auto_resolution_invalid'
    });
  });

  /**
   * @param {Record<string, unknown>} [patch]
   */
  function reviewResolution(patch = {}) {
    return retryResolution({
      class: 'auto_review',
      origin_reason: 'review_receipt_missing',
      origin_stage: 'coordinator',
      return_phase: 'gating',
      attempts: 1,
      next_at: null,
      ...patch
    });
  }

  test('refuses to re-dispatch a reviewing intent with no journal', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'reviewing',
        auto_resolution: reviewResolution()
      }),
      head_review: null,
      now: 1
    });

    expect(action).toEqual({
      kind: 'needs_human',
      reason: 'auto_review_journal_missing'
    });
  });

  test('dispatches a review that was enrolled but never started', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'reviewing',
        auto_resolution: reviewResolution()
      }),
      head_review: { state: 'pending', review_attempt_id: null },
      now: 1
    });

    expect(action).toEqual({ kind: 'dispatch_auto_review' });
  });

  test('waits while a dispatched review is still running', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'reviewing',
        auto_resolution: reviewResolution()
      }),
      head_review: { state: 'reviewing', review_attempt_id: 'review-1' },
      now: 1
    });

    expect(action).toBe(null);
  });

  test('returns an approved review to the gate', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'reviewing',
        auto_resolution: reviewResolution()
      }),
      head_review: { state: 'approved', review_attempt_id: 'review-1' },
      now: 1
    });

    expect(action).toEqual({ kind: 'gate' });
  });

  test('hands a rejected review to a human with the journal reason', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'reviewing',
        auto_resolution: reviewResolution()
      }),
      head_review: {
        state: 'failed',
        review_attempt_id: 'review-1',
        failure_reason: 'review_rejected'
      },
      now: 1
    });

    expect(action).toEqual({
      kind: 'needs_human',
      reason: 'review_rejected'
    });
  });
});

describe('worker/completion-intent auto-resolution driver (UI-hk74 §4/§5)', () => {
  /**
   * Drive one failure through the driver's own settle path.
   *
   * @param {ReturnType<typeof seededCompletionStore>} store
   * @param {Record<string, any>} [overrides]
   */
  function settleDriver(store, overrides = {}) {
    return actionDriver(store, {
      prActions: {
        completionGate: vi.fn(async () => ({
          ok: false,
          reason: 'receipt_unbacked:unit_plan_mismatch'
        }))
      },
      ...overrides
    });
  }

  test('parks a metadata failure instead of terminalizing it', async () => {
    const store = seededCompletionStore();
    const driver = settleDriver(store);
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.observe('UI-root', current);
    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'receipt_unbacked:unit_plan_mismatch' },
      current
    );

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'waiting_metadata',
      terminal_reason: null,
      auto_resolution: {
        class: 'metadata_watch',
        origin_reason: 'receipt_unbacked:unit_plan_mismatch',
        return_phase: 'gating',
        attempts: 0
      }
    });
  });

  test('terminalizes a reason the policy table does not cover', async () => {
    const store = seededCompletionStore();
    const driver = settleDriver(store);
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'brand_new_failure' },
      current
    );

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'needs_human',
      terminal_reason: { reason: 'brand_new_failure' }
    });
  });

  test('returns a corrected metadata watch to the gate', async () => {
    const store = seededCompletionStore();
    const completionGate = vi.fn(async () => redGate());
    const driver = settleDriver(store, { prActions: { completionGate } });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'receipt_unbacked:unit_plan_mismatch' },
      current
    );
    await driver.onAction(
      'UI-root',
      { kind: 'resume_metadata_check' },
      current
    );

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({ phase: 'gating', auto_resolution: null });
  });

  test('keeps the watch in place when the bd read fails', async () => {
    const store = seededCompletionStore();
    const completionGate = vi.fn(async () => {
      throw new Error('bd unreachable');
    });
    const driver = settleDriver(store, { prActions: { completionGate } });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'receipt_unbacked:unit_plan_mismatch' },
      current
    );
    await driver.onAction(
      'UI-root',
      { kind: 'resume_metadata_check' },
      current
    );

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'waiting_metadata',
      auto_resolution: { last_error: 'metadata_check_unreadable' }
    });
  });

  test('arms the first retry one minute out', async () => {
    const store = seededCompletionStore();
    const driver = settleDriver(store, { now: () => 10_000 });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'completion_gate_spawn_failed' },
      current
    );

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root'].auto_resolution
    ).toMatchObject({
      class: 'retry',
      return_phase: 'gating',
      attempts: 0,
      next_at: 70_000
    });
  });

  test('clears the retry once the gate produces a verdict', async () => {
    const store = seededCompletionStore();
    const completionGate = vi.fn(async () => redGate());
    const driver = settleDriver(store, {
      prActions: { completionGate },
      now: () => 10_000
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'completion_gate_spawn_failed' },
      current
    );
    await driver.onAction('UI-root', { kind: 'retry_failed_op' }, current);

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({ phase: 'gating', auto_resolution: null });
  });

  test('spends the budget and widens the delay when a retry fails again', async () => {
    const store = seededCompletionStore();
    const completionGate = vi.fn(async () => ({
      ok: false,
      reason: 'completion_gate_spawn_failed'
    }));
    const driver = settleDriver(store, {
      prActions: { completionGate },
      now: () => 10_000
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'completion_gate_spawn_failed' },
      current
    );
    await driver.onAction('UI-root', { kind: 'retry_failed_op' }, current);

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root'].auto_resolution
    ).toMatchObject({ attempts: 1, next_at: 310_000 });
  });

  test('terminalizes with the original reason once the budget is gone', async () => {
    const store = seededCompletionStore();
    const completionGate = vi.fn(async () => ({
      ok: false,
      reason: 'completion_gate_spawn_failed'
    }));
    const driver = settleDriver(store, {
      prActions: { completionGate },
      now: () => 10_000
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'completion_gate_spawn_failed' },
      current
    );
    for (let round = 0; round < 3; round += 1) {
      await driver.onAction('UI-root', { kind: 'retry_failed_op' }, current);
    }
    const exhausted = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    const action = decideCompletionAction({
      auto_merge: true,
      intent: exhausted,
      now: 9_000_000
    });
    await driver.onAction('UI-root', /** @type {any} */ (action), exhausted);

    expect(action).toEqual({
      kind: 'needs_human',
      reason: 'retry_exhausted:completion_gate_spawn_failed'
    });
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'needs_human',
      terminal_reason: {
        reason: 'retry_exhausted:completion_gate_spawn_failed'
      }
    });
  });

  test('preserves the retry budget across a pause and resume', async () => {
    const store = seededCompletionStore();
    const completionGate = vi.fn(async () => ({
      ok: false,
      reason: 'completion_gate_spawn_failed'
    }));
    const driver = settleDriver(store, {
      prActions: { completionGate },
      now: () => 10_000
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'completion_gate_spawn_failed' },
      current
    );
    await driver.onAction('UI-root', { kind: 'retry_failed_op' }, current);

    await driver.onAction('UI-root', { kind: 'pause' }, current);
    await driver.onAction('UI-root', { kind: 'resume_intent' }, current);

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'retrying',
      auto_resolution: { attempts: 1, next_at: 310_000 }
    });
  });

  test('keeps the attempt history across a pause and resume', async () => {
    const store = seededCompletionStore();
    const driver = settleDriver(store, { now: () => 10_000 });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'completion_gate_spawn_failed' },
      current
    );

    await driver.onAction('UI-root', { kind: 'pause' }, current);
    await driver.onAction('UI-root', { kind: 'resume_intent' }, current);

    expect(store.snapshot(DRIVER_WS).attempts['att-root']).toBeTruthy();
  });

  test('a manual click ends the wait and clears the resolution', async () => {
    const store = seededCompletionStore();
    const driver = settleDriver(store);
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'receipt_unbacked:unit_plan_mismatch' },
      current
    );

    store.enqueueMergeManual(DRIVER_WS, {
      expected_revision: store.snapshot(DRIVER_WS).revision,
      entries: [
        {
          bead_id: 'UI-root',
          head_sha: 'a'.repeat(40),
          target_base: 'main'
        }
      ]
    });

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({ phase: 'gating', auto_resolution: null });
  });

  test('refuses a second automatic review for the same root', async () => {
    const store = seededCompletionStore();
    const driver = settleDriver(store);
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'review_receipt_missing' },
      current
    );

    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'review_receipt_stale' },
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    );

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'needs_human',
      terminal_reason: {
        reason: 'auto_review_exhausted:review_receipt_stale'
      }
    });
  });

  test('an approved review hands back to the gate with no record left', async () => {
    const store = seededCompletionStore();
    const driver = settleDriver(store, {
      prActions: { completionGate: vi.fn(async () => redGate()) }
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'review_receipt_missing' },
      current
    );

    await driver.observe('UI-root', current);
    await driver.onAction('UI-root', { kind: 'gate' }, current);

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({ phase: 'gating', auto_resolution: null });
  });

  test('re-runs a failed repair dispatch on the same repair Bead', async () => {
    const store = seededCompletionStore();
    const dispatchCompletionRepair = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, reason: 'repair_dispatch_failed' })
      .mockResolvedValue({ ok: true });
    const driver = settleDriver(store, {
      completionRepair: {
        probeOwnership: vi.fn(async () => ({ state: 'pr_owned' })),
        ensureLinkedBead: vi.fn(async () => ({ bead_id: 'UI-repair' }))
      },
      scheduler: { dispatchCompletionRepair },
      prActions: { completionGate: vi.fn(async () => redGate()) },
      now: () => 10_000
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    await driver.observe('UI-root', current);
    await driver.onAction('UI-root', { kind: 'probe' }, current);

    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'retrying',
      auto_resolution: { origin_reason: 'repair_dispatch_failed' }
    });

    await driver.onAction('UI-root', { kind: 'retry_failed_op' }, current);

    expect(dispatchCompletionRepair).toHaveBeenCalledTimes(2);
  });
});
