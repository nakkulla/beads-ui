import { EventEmitter } from 'node:events';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  createCompletionFailureKey,
  createCompletionIntentCoordinator,
  decideCompletionAction
} from './completion-intent.js';

/**
 * @param {Record<string, unknown>} [patch]
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
});

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
