import nodeFs from 'node:fs';
import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeEach, describe, expect, test } from 'vitest';
import { getWorkerRuntime } from '../worker/runtime.js';
import { decorateQueue } from './worker-handlers.js';

const WS = '/tmp/example-workspace/project-completion';
const ROOT = 'R-1';

/**
 * The durable `CompletionPhase` vocabulary, read from the queue schema itself
 * rather than retyped here. The projection keeps its own membership Set, and a
 * phase this file cannot see is a phase that reaches the card as
 * `intent_state_invalid` — the UI-hk74 §4 regression this guards.
 *
 * @returns {string[]}
 */
function durableCompletionPhases() {
  const source = nodeFs.readFileSync(
    nodePath.join(
      nodePath.dirname(fileURLToPath(import.meta.url)),
      '..',
      'worker',
      'queue-store.js'
    ),
    'utf8'
  );
  const match = source.match(/@typedef \{([^}]+)\} CompletionPhase/);
  if (!match) {
    throw new Error('CompletionPhase typedef not found in queue-store.js');
  }
  return match[1].split('|').map((part) => part.trim().replace(/'/g, ''));
}

/**
 * @param {Record<string, unknown>} [extra]
 */
function bareQueue(extra = {}) {
  return {
    revision: 1,
    auto_advance: false,
    auto_merge: true,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    ...extra
  };
}

/**
 * @param {string} phase
 * @param {Record<string, unknown>|null} auto_resolution
 * @param {Record<string, unknown>} [extra]
 */
function intentQueue(phase, auto_resolution, extra = {}) {
  return bareQueue({
    completion_intents: {
      [ROOT]: {
        target_base: 'main',
        phase,
        subject: { role: 'root', bead_id: ROOT },
        active_op: null,
        terminal_reason: null,
        auto_resolution,
        paused_resolution: null,
        ...extra
      }
    }
  });
}

/**
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, any>}
 */
function statusOf(queue) {
  return /** @type {any} */ (decorateQueue(WS, queue)).completion_status[ROOT];
}

describe('completion_status phase projection (UI-hk74 §4)', () => {
  test('projects every durable phase as itself', () => {
    const phases = durableCompletionPhases();

    const projected = phases.map((phase) => statusOf(intentQueue(phase, null)));

    expect(projected.map((status) => status.phase)).toEqual(phases);
  });

  test('names the three automatic resolution phases among them', () => {
    const phases = durableCompletionPhases();

    expect(phases).toEqual(
      expect.arrayContaining(['waiting_metadata', 'reviewing', 'retrying'])
    );
  });

  test('names exactly the nine surviving phases', () => {
    const phases = durableCompletionPhases();

    expect(phases).toEqual([
      'gating',
      'merging',
      'cleaning',
      'waiting_metadata',
      'reviewing',
      'retrying',
      'paused',
      'needs_human',
      'completed'
    ]);
  });

  test('carries exactly the fields the card reads', () => {
    const status = statusOf(intentQueue('cleaning', null));

    expect(Object.keys(status).sort()).toEqual([
      'active_attempt_id',
      'auto_resolution',
      'base_sha',
      'evidence',
      'failure_reason',
      'failure_stage',
      'head_sha',
      'log_path',
      'merged_sha',
      'phase',
      'root_bead_id',
      'subject_bead_id',
      'subject_role',
      'terminal_reason'
    ]);
  });

  test('still reports a malformed intent as terminal', () => {
    const status = statusOf(intentQueue('not_a_phase', null));

    expect(status.terminal_reason).toEqual('intent_state_invalid');
  });
});

describe('completion_status auto_resolution projection (UI-hk74 §9)', () => {
  test('carries the fields the row badge reads', () => {
    const status = statusOf(
      intentQueue('retrying', {
        class: 'retry',
        origin_reason: 'verify_cmd_failed',
        origin_stage: 'merge_gate',
        return_phase: 'gating',
        attempts: 2,
        next_at: 1_800_000,
        last_error: 'npm ci exited 1',
        op: { operation_id: 'op-1' }
      })
    );

    expect(status.auto_resolution).toEqual({
      class: 'retry',
      origin_reason: 'verify_cmd_failed',
      attempts: 2,
      attempt_cap: 3,
      next_at: 1_800_000,
      last_error: 'npm ci exited 1'
    });
  });

  test('leaves the coordinator-only op out of the wire', () => {
    const status = statusOf(
      intentQueue('waiting_metadata', {
        class: 'metadata_watch',
        origin_reason: 'receipt_unbacked:unit_plan_mismatch',
        origin_stage: 'merge_gate',
        return_phase: 'gating',
        attempts: 0,
        next_at: null,
        last_error: null,
        op: { failure_key: { stage: 'merge_gate' } }
      })
    );

    expect(status.auto_resolution).not.toHaveProperty('op');
  });

  test('drops a record whose class is not one the badge knows', () => {
    const status = statusOf(
      intentQueue('reviewing', { class: 'wat', attempts: 1 })
    );

    expect(status.auto_resolution).toBeNull();
  });

  test('carries null for a phase that has no resolution', () => {
    const status = statusOf(intentQueue('gating', null));

    expect(status.auto_resolution).toBeNull();
  });
});

describe('lane membership excludes head review attempts (UI-hk74 §7)', () => {
  beforeEach(() => {
    getWorkerRuntime().titleCache.clear();
    getWorkerRuntime().titleCache.refreshFromIssue(WS, {
      id: 'A-1',
      title: 'A-1 제목',
      metadata: { route: 'spec_backed' }
    });
  });

  test('leaves a bead whose only running attempt is a head review out', () => {
    const out = /** @type {any} */ (
      decorateQueue(
        WS,
        bareQueue({
          attempts: {
            r1: {
              attempt_id: 'r1',
              bead_id: 'A-1',
              status: 'running',
              kind: 'review_session',
              origin: 'auto'
            }
          }
        })
      )
    );

    expect(out.bead_workflow).not.toHaveProperty('A-1');
  });

  test('keeps a bead whose running attempt is an implementation run', () => {
    const out = /** @type {any} */ (
      decorateQueue(
        WS,
        bareQueue({
          attempts: {
            a1: { attempt_id: 'a1', bead_id: 'A-1', status: 'running' }
          }
        })
      )
    );

    expect(out.bead_workflow).toHaveProperty('A-1');
  });
});
