/**
 * Repository deployment saga E2E fixture (UI-f17c Phase 5).
 *
 * The provider itself remains external. This fixture composes the durable
 * queue with the public deployment-recovery coordinator and repeatedly
 * reloads the queue at each external-effect boundary to model a process crash.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { repoRecoveryIdentity } from '../worker/completion-repair.js';
import { createDeploymentRecovery } from '../worker/deployment-recovery.js';
import { createQueueStore } from '../worker/queue-store.js';

const REPO = '/tmp/deployment-saga/repo';
const SHA = 'a'.repeat(40);
const DESCENDANT_SHA = 'b'.repeat(40);

/** @type {string} */
let tmp_state;
/** @type {string} */
let workspace;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-deployment-saga-'));
  process.env.XDG_STATE_HOME = tmp_state;
  workspace = path.join(tmp_state, 'workspace');
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * @param {number} generation
 * @param {'pending'|'failed'|'succeeded'} state
 * @param {string} [target_sha]
 */
function deploymentStatus(generation, state, target_sha = SHA) {
  return {
    state,
    target_base: 'main',
    target_sha,
    deployed_sha: state === 'succeeded' ? target_sha : null,
    generation,
    error_code: state === 'failed' ? 'deploy_failed' : null,
    log_path: state === 'pending' ? null : '/logs/deploy.log'
  };
}

/**
 * @param {{ status: any, retries: any[], recovery_beads: string[], sessions: string[] }} fixture
 * @param {() => number} now
 */
function recoveryAfterRestart(fixture, now) {
  const store = createQueueStore();
  return {
    store,
    recovery: createDeploymentRecovery({
      workspace,
      repo: REPO,
      store,
      now,
      deploymentJob: {
        retryDeployment: vi.fn(async ({ current_binding }) => {
          const binding = {
            target_base: current_binding.target_base,
            target_sha: current_binding.target_sha,
            generation: current_binding.generation + 1
          };
          fixture.retries.push(binding);
          fixture.status = deploymentStatus(
            binding.generation,
            'pending',
            binding.target_sha
          );
          return binding;
        }),
        deploymentStatus: vi.fn(async () => fixture.status)
      },
      recoveryService: {
        ensureRepoRecoveryBead: vi.fn(
          async ({ repo, generation, failure_key }) => {
            const identity = repoRecoveryIdentity(
              repo,
              generation,
              failure_key
            );
            fixture.recovery_beads.push(identity.bead_id);
            return identity;
          }
        )
      },
      dispatchRecovery: vi.fn(async ({ bead_id }) => {
        const attempt_id = `session-${fixture.sessions.length + 1}`;
        fixture.sessions.push(`${bead_id}:${attempt_id}`);
        return { ok: true, attempt_id };
      })
    })
  };
}

describe('repo deployment saga e2e', () => {
  test('coalesces two merged issue bindings onto one desired generation and retains both completed rows', () => {
    const store = createQueueStore();
    const status = deploymentStatus(7, 'pending');
    const issues = [
      ['UI-merge-a', 'c'.repeat(40)],
      ['UI-merge-b', 'd'.repeat(40)]
    ];

    for (const [bead_id, merge_sha] of issues) {
      store.appendAttempt(workspace, {
        expected_revision: store.snapshot(workspace).revision,
        attempt: { attempt_id: `${bead_id}-attempt`, bead_id }
      });
      store.moveToPrWait(workspace, {
        bead_id,
        attempt_id: `${bead_id}-attempt`,
        patch: { status: 'done' }
      });
      expect(
        store.recordDeploymentBinding(workspace, {
          bead_id,
          merge_sha,
          verified_target_sha: SHA,
          deployment_generation: 7,
          target_base: 'main',
          status
        }).ok
      ).toBe(true);
    }

    for (const [bead_id] of issues) {
      expect(store.moveToDone(workspace, { bead_id }).ok).toBe(true);
    }

    const queue = store.snapshot(workspace);
    expect(queue.deployment).toMatchObject({
      target_base: 'main',
      target_sha: SHA,
      generation: 7
    });
    expect(queue.done.map((row) => row.bead_id)).toEqual([
      'UI-merge-a',
      'UI-merge-b'
    ]);
    expect(queue.pr_wait).toEqual([]);
  });

  test('adopts retry and recovery restart boundaries and retries one repaired same-SHA deployment once', async () => {
    let now = 1_000;
    const fixture = {
      status: deploymentStatus(1, 'failed'),
      retries: /** @type {any[]} */ ([]),
      recovery_beads: /** @type {string[]} */ ([]),
      sessions: /** @type {string[]} */ ([])
    };
    let current = recoveryAfterRestart(fixture, () => now);

    await current.recovery.observe(fixture.status);
    now += 30_000;
    await current.recovery.tick();
    current = recoveryAfterRestart(fixture, () => now);
    await current.recovery.tick();

    fixture.status = deploymentStatus(2, 'failed');
    await current.recovery.observe(fixture.status);
    now += 120_000;
    await current.recovery.tick();
    current = recoveryAfterRestart(fixture, () => now);
    await current.recovery.tick();

    fixture.status = deploymentStatus(3, 'failed');
    await current.recovery.observe(fixture.status);
    await current.recovery.tick();
    current = recoveryAfterRestart(fixture, () => now);
    await current.recovery.tick();

    const prepared = current.store.snapshot(workspace).deployment?.recovery;
    if (!prepared?.identity || !prepared.bead_id || !prepared.attempt_id) {
      throw new Error('expected one bound recovery session');
    }
    current.store.appendAttempt(workspace, {
      expected_revision: current.store.snapshot(workspace).revision,
      attempt: {
        attempt_id: prepared.attempt_id,
        bead_id: prepared.bead_id,
        deployment_recovery_identity: prepared.identity,
        deployment_recovery_failure_key: prepared.failure_key
      }
    });

    fixture.status = deploymentStatus(3, 'failed');
    await current.recovery.consumeOutcome({
      identity: prepared.identity,
      attempt_id: prepared.attempt_id,
      outcome: 'retry_same',
      evidence_kind: 'environment_repair',
      evidence: 'service_config_repaired',
      reason: null
    });
    current = recoveryAfterRestart(fixture, () => now);
    await current.recovery.tick();
    fixture.status = deploymentStatus(4, 'succeeded');
    await current.recovery.observe(fixture.status);
    await current.recovery.observe(fixture.status);

    const deployment = current.store.snapshot(workspace).deployment;
    if (!deployment) {
      throw new Error('expected persisted deployment');
    }
    if (!deployment.notifications) {
      throw new Error('expected persisted deployment notifications');
    }
    expect(fixture.retries).toEqual([
      { target_base: 'main', target_sha: SHA, generation: 2 },
      { target_base: 'main', target_sha: SHA, generation: 3 },
      { target_base: 'main', target_sha: SHA, generation: 4 }
    ]);
    expect(fixture.recovery_beads).toHaveLength(1);
    expect(fixture.sessions).toHaveLength(1);
    expect(deployment).toMatchObject({
      state: 'succeeded',
      target_sha: SHA,
      generation: 4,
      automatic_retry_count: 2,
      recovery: { identity: prepared.identity, outcome: 'retry_same' }
    });
    expect(deployment.notifications).toEqual([
      expect.objectContaining({
        identity: prepared.identity,
        kind: 'recovery_prepared'
      }),
      expect.objectContaining({
        identity: prepared.identity,
        kind: 'deployment_succeeded'
      })
    ]);
    expect(
      new Set(deployment.notifications.map((notification) => notification.key))
        .size
    ).toBe(deployment.notifications.length);
  });

  test('keeps a recovery PR disposition through a descendant desired success after restart', async () => {
    let now = 1_000;
    const fixture = {
      status: deploymentStatus(1, 'failed'),
      retries: /** @type {any[]} */ ([]),
      recovery_beads: /** @type {string[]} */ ([]),
      sessions: /** @type {string[]} */ ([])
    };
    let current = recoveryAfterRestart(fixture, () => now);

    await current.recovery.observe(fixture.status);
    now += 30_000;
    await current.recovery.tick();
    fixture.status = deploymentStatus(2, 'failed');
    await current.recovery.observe(fixture.status);
    now += 120_000;
    await current.recovery.tick();
    fixture.status = deploymentStatus(3, 'failed');
    await current.recovery.observe(fixture.status);
    await current.recovery.tick();

    const recovery = current.store.snapshot(workspace).deployment?.recovery;
    if (!recovery?.identity || !recovery.bead_id || !recovery.attempt_id) {
      throw new Error('expected one bound recovery session');
    }
    current.store.appendAttempt(workspace, {
      expected_revision: current.store.snapshot(workspace).revision,
      attempt: {
        attempt_id: recovery.attempt_id,
        bead_id: recovery.bead_id,
        deployment_recovery_identity: recovery.identity,
        deployment_recovery_failure_key: recovery.failure_key
      }
    });
    await current.recovery.consumeOutcome({
      identity: recovery.identity,
      attempt_id: recovery.attempt_id,
      outcome: 'repair_pr_open',
      evidence_kind: 'repair_pr',
      evidence: 'repair_pr_submitted',
      reason: null,
      pr_verified: true
    });

    current = recoveryAfterRestart(fixture, () => now);
    fixture.status = deploymentStatus(4, 'succeeded', DESCENDANT_SHA);
    await current.recovery.observe(fixture.status);

    expect(current.store.snapshot(workspace).deployment).toMatchObject({
      state: 'succeeded',
      target_sha: DESCENDANT_SHA,
      generation: 4,
      recovery: { identity: recovery.identity, outcome: 'repair_pr_open' }
    });
    expect(fixture.recovery_beads).toHaveLength(1);
    expect(fixture.sessions).toHaveLength(1);
  });
});
