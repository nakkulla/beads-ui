import { createHash } from 'node:crypto';
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { createBeadTimeline } from './bead-timeline.js';
import {
  COMPLETION_RETRY_DELAYS_MS,
  COMPLETION_RETRY_POLICY,
  NEEDS_HUMAN_FAMILIES,
  classifyCompletionFailure,
  completionFailureComment,
  completionFailureSummary,
  createCompletionActionDriver,
  createCompletionFailureKey,
  createCompletionIntentCoordinator,
  decideCompletionAction,
  foldNeedsHumanReason,
  migrateStoredNeedsHumanReason,
  needsHumanHoldKind
} from './completion-intent.js';
import { createQueueStore } from './queue-store.js';
import { EXEC_RECEIPT_MERGE_GATE } from './receipt-check.js';

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
    active_op: null,
    terminal_reason: null,
    ...patch
  };
}

afterEach(() => {
  vi.restoreAllMocks();
  // Only the timeline tests set it; deleting it unconditionally keeps a failed
  // one from leaking a temp state root into the rest of the file.
  delete process.env.XDG_STATE_HOME;
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
    ...overrides
  });
}

/**
 * A `bd.comment` stand-in whose recorded calls stay typed as the adapter's
 * `(bead_id, text)` pair.
 *
 * @param {() => void} [effect]
 * @returns {(bead_id: string, text: string) => Promise<void>}
 */
function commentSpy(effect) {
  return async () => {
    if (effect) {
      effect();
    }
  };
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
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent(),
      fact: { state: 'conflict' }
    });

    expect(action).toEqual({ kind: 'merge_subject' });
  });

  test('enters cleanup after a merged root is authoritatively re-pinned', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({ phase: 'gating' }),
      fact: { state: 'cleanup_repairable' }
    });

    expect(action).toEqual({ kind: 'enter_cleanup' });
  });

  test('stops a repairable cleanup failure for a human with its cause', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({ phase: 'cleaning' }),
      fact: {
        state: 'cleanup_repairable',
        evidence: { failure_code: 'deploy_script_failure' }
      }
    });

    expect(action).toEqual({
      kind: 'needs_human',
      reason: 'cleanup_failed:deploy_script_failure',
      terminal: true
    });
  });

  test('reads the cleanup cause from failure_code, reason, then failure_key', () => {
    const cleaning = intent({ phase: 'cleaning' });
    const of = (/** @type {any} */ fact) =>
      decideCompletionAction({ auto_merge: true, intent: cleaning, fact })
        ?.reason;

    expect(
      of({
        state: 'cleanup_repairable',
        evidence: { failure_code: 'deploy_script_failure', reason: 'raw' },
        failure_key: { reason: 'keyed' }
      })
    ).toBe('cleanup_failed:deploy_script_failure');
    expect(
      of({
        state: 'cleanup_repairable',
        evidence: { reason: 'raw' },
        failure_key: { reason: 'keyed' }
      })
    ).toBe('cleanup_failed:raw');
    expect(
      of({
        state: 'cleanup_repairable',
        evidence: {},
        failure_key: { reason: 'keyed' }
      })
    ).toBe('cleanup_failed:keyed');
    expect(of({ state: 'cleanup_repairable' })).toBe(
      'cleanup_failed:unrecorded'
    );
  });

  test('stops a post-merge verify red for a human instead of probing', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent(),
      fact: { state: 'verify_red' }
    });

    expect(action).toEqual({
      kind: 'needs_human',
      reason: 'verify_red',
      terminal: true
    });
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
          kind: 'merge_subject',
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
          kind: 'retry_cleanup',
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

  test('terminalizes a post-merge verify red without consulting the policy table', async () => {
    const store = seededCompletionStore();
    const comment = vi.fn(commentSpy(() => undefined));
    const driver = actionDriver(store, { bd: { comment } });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    const fact = await driver.observe('UI-root', current);
    const action = decideCompletionAction({
      auto_merge: true,
      intent: current,
      fact
    });
    if (!action) {
      throw new Error('verify red action missing');
    }
    await driver.onAction('UI-root', action, current);
    await driver.commentsIdle();

    // `verify_cmd_failed` is still a `retry` reason for the paths that own it,
    // so a needs_human that went through the tables would have parked here.
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'needs_human',
      auto_resolution: null,
      terminal_reason: {
        reason: 'verify_red',
        stage: 'coordinator',
        log_path: '/state/verify.log',
        op_id: 'verify',
        comment_at: expect.any(Number)
      }
    });
    expect(comment).toHaveBeenCalledTimes(1);
    expect(comment.mock.calls[0][1]).toContain(
      '- 원인: verify_red — 머지 후 검증이 실패했습니다.'
    );
    // UI-5ym8 §3.4: a post-merge pipeline failure raises the SYSTEMIC hold.
    expect(store.snapshot(DRIVER_WS).hold).toMatchObject({
      kind: 'systemic',
      cause: 'verify_red',
      bead_ids: ['UI-root']
    });
  });

  test('records needs_human on the root bead timeline', async () => {
    const store = seededCompletionStore();
    /** @type {any[]} */
    const events = [];
    const driver = actionDriver(store, {
      bd: { comment: vi.fn(commentSpy()) },
      timeline: { append: (/** @type {any} */ input) => events.push(input) }
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    const fact = await driver.observe('UI-root', current);
    const action = decideCompletionAction({
      auto_merge: true,
      intent: current,
      fact
    });
    if (!action) {
      throw new Error('verify red action missing');
    }
    await driver.onAction('UI-root', action, current);

    expect(events).toContainEqual({
      bead_id: 'UI-root',
      kind: 'needs_human',
      seq: 'verify_red',
      summary: '확인 필요 — verify_red'
    });
  });

  test('reads one event back when the same wall is settled twice', async () => {
    const store = seededCompletionStore();
    const state_root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-ci-tl-'));
    tmp_dirs.push(state_root);
    process.env.XDG_STATE_HOME = state_root;
    const timeline = createBeadTimeline({ workspace_root: DRIVER_WS });
    const driver = actionDriver(store, {
      bd: { comment: vi.fn(commentSpy()) },
      timeline
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    const fact = await driver.observe('UI-root', current);
    const action = decideCompletionAction({
      auto_merge: true,
      intent: current,
      fact
    });
    if (!action) {
      throw new Error('verify red action missing');
    }

    await driver.onAction('UI-root', action, current);
    await driver.onAction('UI-root', action, current);

    expect(
      timeline
        .readTimeline('UI-root')
        .filter((event) => event.kind === 'needs_human')
    ).toHaveLength(1);
  });

  test('terminalizes when no timeline is injected', async () => {
    const store = seededCompletionStore();
    const driver = actionDriver(store, {
      bd: { comment: vi.fn(commentSpy()) }
    });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    const fact = await driver.observe('UI-root', current);
    const action = decideCompletionAction({
      auto_merge: true,
      intent: current,
      fact
    });
    if (!action) {
      throw new Error('verify red action missing');
    }
    await driver.onAction('UI-root', action, current);

    expect(store.snapshot(DRIVER_WS).completion_intents['UI-root'].phase).toBe(
      'needs_human'
    );
  });

  test('terminalizes when the timeline append fails', async () => {
    const store = seededCompletionStore();
    const driver = actionDriver(store, {
      bd: { comment: vi.fn(commentSpy()) },
      timeline: {
        append: () => ({ ok: false, reason: 'write_failed', detail: 'nope' })
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
      throw new Error('verify red action missing');
    }
    await driver.onAction('UI-root', action, current);

    expect(store.snapshot(DRIVER_WS).completion_intents['UI-root'].phase).toBe(
      'needs_human'
    );
  });

  test('leaves the queue hold alone on a bead-local needs_human family', () => {
    const store = seededCompletionStore();

    store.terminalizeCompletionIntent(DRIVER_WS, {
      root_bead_id: 'UI-root',
      terminal: {
        reason: 'internal_record_failed:merge_subject_pin_failed',
        stage: 'coordinator',
        failure_key: null,
        evidence: null,
        log_path: null,
        at: 1
      }
    });

    expect(store.snapshot(DRIVER_WS).hold ?? null).toBeNull();
  });

  test('comments one failure once across a [머지] re-click', async () => {
    const store = seededCompletionStore();
    const comment = vi.fn(commentSpy(() => undefined));
    const driver = actionDriver(store, { bd: { comment } });
    const first = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.observe('UI-root', first);
    const action = {
      kind: /** @type {const} */ ('needs_human'),
      reason: 'verify_red',
      terminal: true
    };
    await driver.onAction('UI-root', action, first);
    // The re-click moves the terminal to `resumed_terminal`, which is where the
    // second pass has to look for the claim it already made.
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
    const resumed = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    await driver.observe('UI-root', resumed);
    await driver.onAction('UI-root', action, resumed);
    await driver.commentsIdle();

    const settled = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    expect(comment).toHaveBeenCalledTimes(1);
    expect(settled.phase).toBe('needs_human');
    expect(settled.terminal_reason?.comment_at).toBe(
      settled.resumed_terminal?.comment_at
    );
  });

  test('comments a second, different operation-less failure', async () => {
    const store = seededCompletionStore();
    const comment = vi.fn(commentSpy(() => undefined));
    const driver = actionDriver(store, { bd: { comment } });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    /**
     * @param {string} reason
     */
    const stop = async (reason) => {
      store.enqueueMergeManual(DRIVER_WS, {
        expected_revision: store.snapshot(DRIVER_WS).revision,
        entries: [
          { bead_id: 'UI-root', head_sha: 'a'.repeat(40), target_base: 'main' }
        ]
      });
      await driver.onAction(
        'UI-root',
        { kind: 'needs_human', reason, terminal: true },
        current
      );
    };

    await stop('root_cleanup_pin_failed');
    await stop('reconciliation_ambiguous');
    await driver.commentsIdle();

    expect(comment).toHaveBeenCalledTimes(2);
  });

  test('keeps the terminal when the failure comment cannot be posted', async () => {
    const store = seededCompletionStore();
    const comment = vi.fn(
      commentSpy(() => {
        throw new Error('bd unavailable');
      })
    );
    const log = vi.fn();
    const driver = actionDriver(store, { bd: { comment }, log });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.observe('UI-root', current);
    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'verify_red', terminal: true },
      current
    );
    await driver.commentsIdle();

    expect(comment).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalled();
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'needs_human',
      terminal_reason: { reason: 'verify_red', comment_at: expect.any(Number) }
    });
  });

  test('skips the failure comment when no bd adapter is injected', async () => {
    const store = seededCompletionStore();
    const driver = actionDriver(store, { bd: {} });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.observe('UI-root', current);
    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'verify_red', terminal: true },
      current
    );
    await driver.commentsIdle();

    expect(store.snapshot(DRIVER_WS).completion_intents['UI-root'].phase).toBe(
      'needs_human'
    );
  });

  test('keeps a re-driven verify red terminal instead of retrying it', async () => {
    const store = seededCompletionStore();
    const driver = actionDriver(store);
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    const fact = await driver.observe('UI-root', current);
    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'verify_red', terminal: true },
      current
    );
    const settled = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    const again = decideCompletionAction({
      auto_merge: true,
      intent: settled,
      fact
    });

    expect(again).toBe(null);
    expect(settled).toMatchObject({
      phase: 'needs_human',
      auto_resolution: null
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

  test('stops a merged-root cleanup failure with its log, op id and one comment', async () => {
    const store = seededCompletionStore();
    store.recordCleanupFailure(DRIVER_WS, {
      bead_id: 'UI-root',
      step: 'post_merge_verify',
      reason: 'verify_cmd_failed',
      output_tail: 'merged regression',
      log_path: '/state/repo-operation-logs/op-77.log'
    });
    const merged_subject = {
      ...intent().subject,
      base_sha: 'c'.repeat(40),
      merged_sha: 'c'.repeat(40)
    };
    const comment = vi.fn(commentSpy(() => undefined));
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
      bd: { comment }
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
      throw new Error('cleanup action missing');
    }
    await driver.onAction('UI-root', action, cleaning);
    await driver.commentsIdle();

    expect(fact).toMatchObject({
      state: 'cleanup_repairable',
      op_id: 'op-77',
      failure_key: {
        stage: 'post_merge_verify',
        reason: 'verify_cmd_failed',
        subject_sha: 'c'.repeat(40),
        base_sha: 'c'.repeat(40)
      }
    });
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'needs_human',
      auto_resolution: null,
      terminal_reason: {
        reason: 'cleanup_failed:verify_cmd_failed',
        op_id: 'op-77',
        log_path: '/state/repo-operation-logs/op-77.log',
        comment_at: expect.any(Number)
      }
    });
    expect(comment).toHaveBeenCalledTimes(1);
    expect(comment.mock.calls[0][0]).toBe('UI-root');
    expect(comment.mock.calls[0][1]).toBe(
      [
        '## 🤖 완료 실패 기록',
        '- 단계: verify',
        '- 원인: cleanup_failed:verify_cmd_failed — 머지 후 검증 명령이 실패했습니다.',
        // The failing run's own line, extracted from the evidence tail once
        // (UI-8wpb §6 row 2).
        '- 요약: merged regression',
        `- 대상: ${'c'.repeat(40)} (base main)`,
        '- 로그: /state/repo-operation-logs/op-77.log',
        '- 재시도: 없음',
        '- 다음: [머지] 재클릭 · 설정 카드 배포 실행 · 코드 수정은 새 Bead'
      ].join('\n')
    );
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

  test('stops a cleanup failure the ladder cannot resolve', async () => {
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
    expect(action).toEqual({
      kind: 'needs_human',
      reason: 'cleanup_failed:bd_read_failed',
      terminal: true
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
            terminal_reason: {
              reason: `conflict_unresolved:${reason}`,
              stage: 'conflict_resolution'
            }
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
          {
            bead_id: 'UI-root',
            resolution_rounds: 0,
            rebase_rounds: 0,
            resolution: null
          }
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
        rebase_rounds: 0,
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
          terminal_reason: {
            reason: 'conflict_unresolved:resolution_lineage_ambiguous'
          }
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
      phase: 'cleaning',
      op: {
        ...mergeOperation('wrong-owner'),
        kind: 'retry_cleanup'
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
    ['review_receipt_missing', 'metadata_watch', 'waiting_metadata'],
    ['review_receipt_stale', 'metadata_watch', 'waiting_metadata'],
    ['review_receipt_undetermined', 'metadata_watch', 'waiting_metadata'],
    ['cleanup_prerecord_failed', 'retry', 'retrying'],
    ['cleanup_settlement_record_failed', 'retry', 'retrying'],
    ['completion_gate_spawn_failed', 'retry', 'retrying'],
    ['verify_cmd_failed', 'retry', 'retrying']
  ])('maps %s to the %s class', (reason, expected_class, phase) => {
    const classified = classifyCompletionFailure(reason);

    expect(classified.class).toBe(expected_class);
    expect(classified.phase).toBe(phase);
  });

  // UI-h6t1 §3.4: 계약이 영수증 판정을 두 등급으로 나눈 뒤에도 이 매핑은 그대로다.
  // `badge` 등급은 게이트를 통과해 `receipt_unbacked:*` 사유 자체를 만들지 않으므로
  // 여기 도달하지 않고, 도달하는 `hold` 등급은 전부 사람이 고칠 metadata 문제다.
  test.each(EXEC_RECEIPT_MERGE_GATE.hold.map((code) => [code]))(
    'keeps receipt_unbacked:%s on the metadata watch',
    (code) => {
      const classified = classifyCompletionFailure(`receipt_unbacked:${code}`);

      expect(classified).toMatchObject({
        class: 'metadata_watch',
        phase: 'waiting_metadata'
      });
    }
  );

  test.each([
    ['reconciliation_ambiguous'],
    ['resolution_lineage_ambiguous'],
    ['cleanup_journal_conflict'],
    ['cleanup_completion_unrecorded'],
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
      origin_reason: 'verify_cmd_failed',
      origin_stage: 'merge_gate',
      return_phase: 'gating',
      attempts: 0,
      next_at: 1_000,
      last_error: null,
      op: {
        completion_op_id: null,
        failure_key: null,
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

  test('holds the retry delay over the operation that failed', () => {
    const failed_op = mergeOperation();
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'retrying',
        auto_resolution: retryResolution({
          op: {
            ...retryResolution().op,
            completion_op_id: failed_op.op_id
          }
        }),
        active_op: failed_op
      }),
      now: 999
    });

    expect(action).toBe(null);
  });

  test('spends a retry on the operation that failed once it is due', () => {
    const failed_op = mergeOperation();
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'retrying',
        auto_resolution: retryResolution({
          op: {
            ...retryResolution().op,
            completion_op_id: failed_op.op_id
          }
        }),
        active_op: failed_op
      }),
      now: 9_000_000
    });

    expect(action).toEqual({ kind: 'retry_failed_op' });
  });

  test('exhausts a retry whose failed operation is still journaled', () => {
    const failed_op = mergeOperation();
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'retrying',
        auto_resolution: retryResolution({
          attempts: 3,
          next_at: null,
          op: {
            ...retryResolution().op,
            completion_op_id: failed_op.op_id
          }
        }),
        active_op: failed_op
      }),
      now: 9_000_000
    });

    expect(action).toEqual({
      kind: 'needs_human',
      reason: 'retry_exhausted:verify_cmd_failed'
    });
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
      reason: 'retry_exhausted:verify_cmd_failed'
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

  test('stops a legacy reviewing intent as a retired lane', () => {
    const action = decideCompletionAction({
      auto_merge: true,
      intent: intent({
        phase: 'reviewing',
        auto_resolution: retryResolution({
          class: 'auto_review',
          origin_reason: 'review_receipt_missing',
          origin_stage: 'coordinator',
          return_phase: 'gating',
          attempts: 1,
          next_at: null
        })
      }),
      now: 1
    });

    // Nothing creates a `reviewing` intent any more (UI-d7fy §3.5) and no
    // owner is left to re-drive one, so a record that survived the upgrade
    // stops with the retirement as its cause — folded, since the retired lane
    // is a migration residue and not one of the five families (UI-5ym8 §7).
    expect(action).toEqual({
      kind: 'needs_human',
      reason: 'internal_record_failed:migration:auto_review_retired',
      terminal: true
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
      terminal_reason: { reason: 'internal_record_failed:brand_new_failure' }
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

  test('keeps the watch in place when the gate could not read the bead', async () => {
    const store = seededCompletionStore();
    const completionGate = vi.fn(async () => ({
      ...redGate(),
      authority_unreadable: true,
      verdict: {
        enabled: false,
        tier: 'blocked',
        reason: 'review_receipt_invalid'
      }
    }));
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
      terminal_reason: null,
      auto_resolution: { last_error: 'metadata_check_unreadable' }
    });
  });

  test('checks metadata once per process from coordinator passes', async () => {
    const store = seededCompletionStore();
    const completionGate = vi.fn(async () => ({
      ok: false,
      reason: 'receipt_unbacked:unit_plan_mismatch'
    }));
    const driver = settleDriver(store, { prActions: { completionGate } });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'receipt_unbacked:unit_plan_mismatch' },
      current
    );
    completionGate.mockClear();

    await driver.onAction(
      'UI-root',
      { kind: 'resume_metadata_check' },
      current
    );
    await driver.onAction(
      'UI-root',
      { kind: 'resume_metadata_check' },
      current
    );
    await driver.onAction(
      'UI-root',
      { kind: 'resume_metadata_check' },
      current
    );

    expect(completionGate).toHaveBeenCalledTimes(1);
  });

  test('re-checks metadata on every bd issue-change event', async () => {
    const store = seededCompletionStore();
    const completionGate = vi.fn(async () => ({
      ok: false,
      reason: 'receipt_unbacked:unit_plan_mismatch'
    }));
    const driver = settleDriver(store, { prActions: { completionGate } });
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'receipt_unbacked:unit_plan_mismatch' },
      current
    );
    completionGate.mockClear();

    await driver.onIssuesChanged();
    await driver.onIssuesChanged();

    expect(completionGate).toHaveBeenCalledTimes(2);
  });

  test('ignores roots outside the metadata watch on a bd issue-change event', async () => {
    const store = seededCompletionStore();
    const completionGate = vi.fn(async () => redGate());
    const driver = settleDriver(store, { prActions: { completionGate } });

    await driver.onIssuesChanged();

    expect(completionGate).not.toHaveBeenCalled();
  });

  test('parks a review-receipt refusal on the metadata watch, not a terminal', async () => {
    const store = seededCompletionStore();
    const driver = settleDriver(store);
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'review_receipt_missing' },
      current
    );

    // The exit is a receipt written to the Bead, which the bd issue-change
    // trigger re-gates (UI-d7fy §3.5) — never a `needs_human` terminal.
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'waiting_metadata',
      auto_resolution: {
        class: 'metadata_watch',
        origin_reason: 'review_receipt_missing'
      }
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

  test('waits instead of hardening when the ancestry probe could not be taken', async () => {
    const store = seededCompletionStore();
    const driver = settleDriver(store);
    const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    await driver.onAction(
      'UI-root',
      { kind: 'needs_human', reason: 'review_receipt_undetermined' },
      current
    );

    // A probe error is not a verdict (UI-d7fy §3.3/§3.5): the next observation
    // re-takes it, so ending the saga on `needs_human` here would make a
    // transient `git` failure terminal.
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'waiting_metadata',
      auto_resolution: { class: 'metadata_watch' }
    });
  });

  test('keeps a second review-receipt refusal on the same metadata watch', async () => {
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

    // There is no per-root review budget left to exhaust (UI-d7fy §3.5): the
    // row waits on the receipt for as long as it takes.
    expect(
      store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'waiting_metadata',
      auto_resolution: { class: 'metadata_watch' }
    });
  });
});

describe('완료 실패 summary 추출 (UI-8wpb §6 row 2)', () => {
  test('takes the failing line of the verify run output', () => {
    const summary = completionFailureSummary({
      output_tail: ['+ npm test', 'FAIL server/a.test.js', 'done'].join('\n')
    });

    expect(summary).toBe('FAIL server/a.test.js');
  });

  test('falls back to the last line of a run that announced nothing', () => {
    const summary = completionFailureSummary({
      output_tail: ['+ npm test', 'killed after 600s'].join('\n')
    });

    expect(summary).toBe('killed after 600s');
  });

  test('returns null when the failure ran no command', () => {
    expect(completionFailureSummary(null)).toBeNull();
    expect(completionFailureSummary({ log_path: '/x.log' })).toBeNull();
  });

  test('caps the summary at 200 characters', () => {
    expect(
      completionFailureSummary({ output_tail: `Error: ${'x'.repeat(300)}` })
    ).toHaveLength(200);
  });
});

describe('완료 실패 comment 형식 (UI-8w4t §4)', () => {
  /**
   * @param {Record<string, unknown>} patch
   * @returns {string[]}
   */
  function commentLines(patch) {
    return completionFailureComment(
      intent(),
      { repo_operations: {} },
      {
        reason: 'cleanup_incomplete',
        stage: 'coordinator',
        failure_key: null,
        evidence: null,
        log_path: null,
        op_id: null,
        comment_at: null,
        at: 1,
        ...patch
      }
    ).split('\n');
  }

  test('omits the summary line when the failure ran no command', () => {
    expect(commentLines({}).some((line) => line.startsWith('- 요약:'))).toBe(
      false
    );
  });

  test('says verify for the stages a post-merge verification fails in', () => {
    expect(commentLines({ failure_key: { stage: 'merge_gate' } })[1]).toBe(
      '- 단계: verify'
    );
    expect(
      commentLines({ failure_key: { stage: 'post_merge_verify' } })[1]
    ).toBe('- 단계: verify');
  });

  test('says deploy for a deployment stage', () => {
    expect(commentLines({ failure_key: { stage: 'deploy' } })[1]).toBe(
      '- 단계: deploy'
    );
  });

  test('says cleanup for the cleanup cursor steps', () => {
    expect(
      commentLines({ failure_key: { stage: 'post_merge_cleanup' } })[1]
    ).toBe('- 단계: cleanup');
    expect(commentLines({ failure_key: { stage: 'branch_cleanup' } })[1]).toBe(
      '- 단계: cleanup'
    );
  });

  test('says cleanup for the post-merge job cursor step', () => {
    expect(commentLines({ failure_key: { stage: 'post_merge_jobs' } })[1]).toBe(
      '- 단계: cleanup'
    );
  });

  test('carries an unmapped stage token through raw', () => {
    expect(commentLines({ failure_key: { stage: 'merge_subject' } })[1]).toBe(
      '- 단계: merge_subject'
    );
    expect(commentLines({ stage: 'coordinator' })[1]).toBe(
      '- 단계: coordinator'
    );
  });

  test('explains a cleanup failure code with the shared sentence', () => {
    expect(commentLines({ reason: 'base_ff_diverged' })[2]).toBe(
      '- 원인: base_ff_diverged — 로컬 base 브랜치가 원격과 갈라져 fast-forward로 정렬할 수 없습니다.'
    );
  });

  test('carries a code it has no sentence for alone', () => {
    expect(commentLines({ reason: 'cleanup_incomplete' })[2]).toBe(
      '- 원인: cleanup_incomplete'
    );
  });

  test('explains a folded cause with its family sentence', () => {
    expect(commentLines({ reason: 'cleanup_failed:bd_read_failed' })[2]).toBe(
      '- 원인: cleanup_failed:bd_read_failed — 머지 후 정리가 끝나지 못했습니다.'
    );
  });

  test('prefers the detail sentence over the family sentence', () => {
    expect(
      commentLines({ reason: 'cleanup_failed:verify_cmd_failed' })[2]
    ).toBe(
      '- 원인: cleanup_failed:verify_cmd_failed — 머지 후 검증 명령이 실패했습니다.'
    );
  });
});

describe('worker/completion-intent needs_human 5종 접기 (UI-5ym8 §7)', () => {
  test('names exactly the five families', () => {
    expect(NEEDS_HUMAN_FAMILIES).toEqual([
      'verify_red',
      'cleanup_failed',
      'retry_exhausted',
      'conflict_unresolved',
      'internal_record_failed'
    ]);
  });

  test.each([
    ['verify_red', 'verify_red'],
    ['cleanup_incomplete', 'cleanup_failed:cleanup_incomplete'],
    ['cleanup_journal_conflict', 'cleanup_failed:cleanup_journal_conflict'],
    [
      'cleanup_completion_unrecorded',
      'cleanup_failed:cleanup_completion_unrecorded'
    ],
    ['cleanup_replay_unavailable', 'cleanup_failed:cleanup_replay_unavailable'],
    ['retry_exhausted:verify_cmd_failed', 'retry_exhausted:verify_cmd_failed'],
    ['resolution_wait_invalid', 'conflict_unresolved:resolution_wait_invalid'],
    [
      'resolution_attempt_missing',
      'conflict_unresolved:resolution_attempt_missing'
    ],
    [
      'resolution_lineage_ambiguous',
      'conflict_unresolved:resolution_lineage_ambiguous'
    ],
    [
      'resolution_subject_mismatch',
      'conflict_unresolved:resolution_subject_mismatch'
    ],
    [
      'resolution_attempt_not_conflict',
      'conflict_unresolved:resolution_attempt_not_conflict'
    ],
    [
      'resolution_attempt_status_invalid',
      'conflict_unresolved:resolution_attempt_status_invalid'
    ],
    [
      'resolution_ready_lineage_active',
      'conflict_unresolved:resolution_ready_lineage_active'
    ],
    ['resolution_round_cap', 'conflict_unresolved:resolution_round_cap'],
    [
      'cleanup_prerecord_failed',
      'internal_record_failed:cleanup_prerecord_failed'
    ],
    [
      'merge_settlement_record_failed',
      'internal_record_failed:merge_settlement_record_failed'
    ],
    [
      'root_cleanup_pin_missing',
      'internal_record_failed:root_cleanup_pin_missing'
    ],
    [
      'merge_subject_pin_failed',
      'internal_record_failed:merge_subject_pin_failed'
    ],
    [
      'reconciliation_ambiguous',
      'internal_record_failed:reconciliation_ambiguous'
    ],
    [
      'auto_resolution_invalid',
      'internal_record_failed:auto_resolution_invalid'
    ],
    ['intent_state_invalid', 'internal_record_failed:intent_state_invalid'],
    ['ownership_undecidable', 'internal_record_failed:ownership_undecidable'],
    [
      'completion_subject_missing',
      'internal_record_failed:completion_subject_missing'
    ],
    [
      'completion_op_in_flight',
      'internal_record_failed:completion_op_in_flight'
    ],
    [
      'auto_review_retired',
      'internal_record_failed:migration:auto_review_retired'
    ],
    [
      'repair_lane_retired',
      'internal_record_failed:migration:repair_lane_retired'
    ]
  ])('folds %s into %s', (raw, folded) => {
    expect(foldNeedsHumanReason(raw)).toBe(folded);
  });

  test.each(
    NEEDS_HUMAN_FAMILIES.flatMap((family) => [family, `${family}:detail:more`])
  )('returns the already-folded %s unchanged', (folded) => {
    expect(foldNeedsHumanReason(folded)).toBe(folded);
  });

  test('folds a second time to the same value', () => {
    const once = foldNeedsHumanReason('cleanup_journal_conflict');

    expect(foldNeedsHumanReason(once)).toBe(once);
  });

  test.each([[undefined], [null], [''], ['   '], [42]])(
    'names a missing reason instead of guessing one for %s',
    (absent) => {
      expect(foldNeedsHumanReason(absent)).toBe(
        'internal_record_failed:reason_missing'
      );
    }
  );

  test('leaves the legacy adoption key resolution_timeout out of the conflict family', () => {
    // `adoptLegacyTimeout` matches this token EXACTLY, so a `resolution_`
    // prefix rule would strand every saga it is the only handle for.
    expect(foldNeedsHumanReason('resolution_timeout')).toBe(
      'internal_record_failed:resolution_timeout'
    );
  });

  test.each([
    ['verify_red', 'systemic'],
    ['cleanup_failed:verify_cmd_failed', 'systemic'],
    ['cleanup_journal_conflict', 'systemic'],
    ['retry_exhausted:verify_cmd_failed', null],
    ['conflict_unresolved:resolution_round_cap', null],
    ['internal_record_failed:intent_state_invalid', null],
    ['', null]
  ])('holds the queue for %s as %s', (reason, kind) => {
    expect(needsHumanHoldKind(reason)).toBe(kind);
  });
});

describe('worker/completion-intent 마이그레이션 토큰 읽기 (UI-5ym8 §7)', () => {
  /**
   * @param {string} reason
   * @returns {ReturnType<typeof createQueueStore>}
   */
  function storeWithTerminal(reason) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-fold-'));
    tmp_dirs.push(dir);
    const file = path.join(dir, 'queue.json');
    fs.writeFileSync(
      file,
      JSON.stringify({
        completion_intents: {
          'UI-root': {
            ...intent({ phase: 'needs_human' }),
            terminal_reason: {
              reason,
              stage: 'conflict_resolution',
              failure_key: null,
              evidence: null,
              log_path: null,
              op_id: null,
              comment_at: null,
              at: 1
            }
          }
        }
      })
    );
    return createQueueStore({ filePathFor: () => file });
  }

  test.each(['auto_review_retired', 'repair_lane_retired'])(
    'reads the retired-lane residue %s as an internal record failure',
    (retired) => {
      const store = storeWithTerminal(retired);

      const loaded = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

      expect(loaded.terminal_reason?.reason).toBe(
        `internal_record_failed:migration:${retired}`
      );
    }
  );

  test('leaves a live adoption key untouched on load', () => {
    const store = storeWithTerminal('resolution_timeout');

    const loaded = store.snapshot(DRIVER_WS).completion_intents['UI-root'];

    expect(loaded.terminal_reason?.reason).toBe('resolution_timeout');
  });

  test('passes a non-retired cause straight through', () => {
    expect(migrateStoredNeedsHumanReason('cleanup_journal_conflict')).toBe(
      'cleanup_journal_conflict'
    );
  });
});

describe('needs_human notification at terminalize (UI-jw27 §2)', () => {
  /** A notifier fake that records every `needsHuman` body it is handed. */
  function makeNotify() {
    /** @type {any[]} */
    const sent = [];
    return {
      sent,
      needsHuman: vi.fn(async (/** @type {any} */ input) => {
        sent.push(input);
      })
    };
  }

  /**
   * Drive one merged root to a terminal cleanup failure recorded at `step`,
   * which is what puts that step into the terminal's `failure_key.stage`.
   *
   * @param {string} step
   * @param {{ notify?: any }} [overrides]
   */
  async function terminalizeCleanupStep(step, overrides = {}) {
    const store = seededCompletionStore();
    store.recordCleanupFailure(DRIVER_WS, {
      bead_id: 'UI-root',
      step,
      reason: 'script_failed',
      output_tail: 'deploy exited 2',
      log_path: '/state/repo-operation-logs/op-9.log'
    });
    const merged_subject = {
      ...intent().subject,
      base_sha: 'c'.repeat(40),
      merged_sha: 'c'.repeat(40)
    };
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
      repo: '/Users/me/GitHub/beads-ui',
      ...overrides
    });
    await driver.onMergeResult('UI-root', 'UI-root', {
      ok: false,
      action: 'merged',
      reason: 'script_failed',
      cleanup_step: step
    });

    /** Settle the cleaning-phase intent once, as a reconcile pass would. */
    async function settleOnce() {
      const current = store.snapshot(DRIVER_WS).completion_intents['UI-root'];
      const fact = await driver.observe('UI-root', current);
      const action = decideCompletionAction({
        auto_merge: true,
        intent: current,
        fact
      });
      if (!action) {
        throw new Error('cleanup action missing');
      }
      await driver.onAction('UI-root', action, current);
      await driver.commentsIdle();
    }

    await settleOnce();
    return { store, settleOnce };
  }

  test('announces a deploy-step terminal as 배포 실패', async () => {
    const notify = makeNotify();

    await terminalizeCleanupStep('repo_operations', { notify });

    expect(notify.sent).toEqual([
      expect.objectContaining({
        bead_id: 'UI-root',
        failure_class: '배포 실패',
        reason: 'cleanup_failed:script_failed',
        reason_detail: 'deploy exited 2',
        next_action: '[정리 재시도] 또는 [세션에서 해결]',
        pr_url: 'https://github.com/o/r/pull/1',
        repo: '/Users/me/GitHub/beads-ui'
      })
    ]);
  });

  test('announces a job-step terminal as post-merge 잡 실패', async () => {
    const notify = makeNotify();

    await terminalizeCleanupStep('post_merge_jobs', { notify });

    expect(notify.sent).toEqual([
      expect.objectContaining({
        failure_class: 'post-merge 잡 실패',
        reason: 'cleanup_failed:script_failed'
      })
    ]);
  });

  test('sends nothing for a stage outside the two owned classes', async () => {
    const notify = makeNotify();

    await terminalizeCleanupStep('branch_cleanup', { notify });

    expect(notify.sent).toEqual([]);
  });

  test('does not resend when a re-click re-settles the same terminal', async () => {
    const notify = makeNotify();
    const driven = await terminalizeCleanupStep('repo_operations', { notify });

    // The re-click moves the terminal to `resumed_terminal`, which is where the
    // second pass has to look for the announcement it already made.
    driven.store.enqueueMergeManual(DRIVER_WS, {
      expected_revision: driven.store.snapshot(DRIVER_WS).revision,
      entries: [
        { bead_id: 'UI-root', head_sha: 'a'.repeat(40), target_base: 'main' }
      ]
    });
    await driven.settleOnce();

    expect(notify.sent).toHaveLength(1);
  });

  test('terminalizes normally when the notifier throws', async () => {
    const notify = {
      needsHuman: vi.fn(() => {
        throw new Error('notifier broken');
      })
    };

    const driven = await terminalizeCleanupStep('repo_operations', { notify });

    expect(
      driven.store.snapshot(DRIVER_WS).completion_intents['UI-root']
    ).toMatchObject({
      phase: 'needs_human',
      terminal_reason: { reason: 'cleanup_failed:script_failed' }
    });
  });
});
