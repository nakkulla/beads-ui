/**
 * Repository deployment saga E2E fixture (UI-f17c Phase 5).
 *
 * The provider itself remains external. This fixture composes the durable
 * queue with the public deployment-recovery coordinator and repeatedly
 * reloads the queue at each external-effect boundary to model a process crash.
 */
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  createCompletionRepairService,
  repoRecoveryIdentity
} from '../worker/completion-repair.js';
import { createDeploymentRecovery } from '../worker/deployment-recovery.js';
import { resolveExecSettings } from '../worker/policy.js';
import { createQueueStore } from '../worker/queue-store.js';
import { createScheduler } from '../worker/scheduler.js';

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
        deploymentStatus: vi.fn(async () => fixture.status),
        covers: vi.fn(async () => true)
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

/**
 * Build the real recovery scheduler around process-local fakes. Attempts and
 * recovery ownership still persist through the production queue store.
 *
 * @param {ReturnType<typeof createQueueStore>} store
 * @param {{ issues: Map<string, any>, metadata: Map<string, string>, sessions: string[] }} fixture
 */
function recoverySchedulerAfterRestart(store, fixture) {
  const bd = {
    async findIssue(/** @type {string} */ bead_id) {
      return fixture.issues.get(bead_id) ?? null;
    },
    async createIssue(/** @type {any} */ input) {
      fixture.issues.set(input.id, {
        id: input.id,
        title: input.title,
        description: input.description,
        issue_type: input.type,
        priority: input.priority
      });
    },
    async snapshotBead(/** @type {string} */ bead_id) {
      return {
        ready: true,
        blocked: false,
        repo: REPO,
        target_base: 'main',
        model: 'opus',
        effort: 'high',
        workflow_mode: fixture.metadata.get(`${bead_id}:workflow_mode`) ?? null,
        route: 'full_plan',
        status: 'open',
        labels: [],
        deps: []
      };
    },
    async setMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key,
      /** @type {string} */ value
    ) {
      fixture.metadata.set(`${bead_id}:${key}`, value);
    },
    async unsetMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key
    ) {
      fixture.metadata.delete(`${bead_id}:${key}`);
    },
    async readMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key
    ) {
      return fixture.metadata.get(`${bead_id}:${key}`) ?? null;
    },
    async setStatus() {},
    async readStatus() {
      return 'open';
    }
  };
  const scheduler = createScheduler({
    store,
    bd,
    execPresetCoordinator: /** @type {any} */ ({
      resolveForDispatch(/** @type {string} */ ws, /** @type {any} */ bead) {
        return {
          ok: true,
          preset_id: null,
          preset_revision: null,
          settings: {},
          exec: resolveExecSettings({
            bead,
            defaults: store.snapshot(ws).exec_defaults
          })
        };
      }
    }),
    resolveBase: async () => ({
      ok: true,
      base: 'main',
      declared: false,
      remote: 'origin',
      remote_ref: 'refs/remotes/origin/main',
      base_oid: 'c'.repeat(40),
      local_only: false
    }),
    worktree: {
      removeIfDiscardable: async () => ({
        ok: true,
        removed: false,
        reason: null
      }),
      add: async (/** @type {any} */ input) => ({
        path: path.join(workspace, '.wt', input.bead_id),
        branch: input.bead_id,
        base_oid: 'c'.repeat(40)
      }),
      remove: async () => ({ code: 0 }),
      pathFor: (/** @type {string} */ _repo, /** @type {string} */ bead_id) =>
        path.join(workspace, '.wt', bead_id),
      exists: () => true
    },
    makeRunner: () => ({
      name: 'claude',
      spawn(/** @type {any} */ bead) {
        fixture.sessions.push(bead.id);
        return {
          pid: 9000 + fixture.sessions.length,
          process_identity: {
            pid: 9000 + fixture.sessions.length,
            pgid: 9000 + fixture.sessions.length,
            started_at: 1000
          },
          events: new EventEmitter(),
          done: new Promise(() => {}),
          kill() {},
          prompts: { system_prompt: null, task_prompt: null }
        };
      }
    }),
    verify: {
      verifyPrSubmitted: async () => ({
        ok: false,
        reason: 'not_used',
        pr_url: null
      })
    },
    sessionLog: { attach() {} },
    guardHook: {
      install: () => ({ ok: true }),
      remove: () => true,
      envFor: () => ({}),
      readPushLog: () => ({ ok: true, entries: [] })
    },
    now: () => 1000
  });
  return {
    scheduler,
    recoveryService: createCompletionRepairService({ bd, repo: REPO })
  };
}

/**
 * Seed an exhausted exact failure through the durable retry store boundary.
 *
 * @param {ReturnType<typeof createQueueStore>} store
 */
function seedRecoveryReady(store) {
  const failure_key = {
    repo: REPO,
    target_base: 'main',
    target_sha: SHA,
    generation: 3,
    error_code: 'deploy_failed',
    log_digest: 'f'.repeat(64)
  };
  store.recordDeploymentObservation(workspace, deploymentStatus(1, 'failed'));
  for (let generation = 1; generation < 3; generation += 1) {
    const key = { ...failure_key, generation };
    store.scheduleDeploymentRetry(workspace, key, 1000);
    store.prerecordDeploymentRetry(workspace, key, 1000);
    store.recordDeploymentRetryReturned(workspace, key, {
      target_base: 'main',
      target_sha: SHA,
      generation: generation + 1
    });
    store.settleDeploymentRetry(
      workspace,
      key,
      deploymentStatus(generation + 1, 'pending')
    );
    store.recordDeploymentObservation(
      workspace,
      deploymentStatus(generation + 1, 'failed')
    );
  }
  store.scheduleDeploymentRetry(workspace, failure_key, 1000);
  return failure_key;
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

  test('adopts recovery Bead and real scheduler spawn crashes without duplicate effects', async () => {
    const store = createQueueStore();
    const failure_key = seedRecoveryReady(store);
    const fixture = {
      status: deploymentStatus(3, 'failed'),
      issues: new Map(),
      metadata: new Map(),
      sessions: /** @type {string[]} */ ([])
    };
    let runtime = recoverySchedulerAfterRestart(store, fixture);
    const crash_after_bead_readback = {
      async ensureRepoRecoveryBead(/** @type {any} */ input) {
        await runtime.recoveryService.ensureRepoRecoveryBead(input);
        throw new Error('crash after bead readback');
      }
    };
    let recovery = createDeploymentRecovery({
      workspace,
      repo: REPO,
      store,
      deploymentJob: {
        retryDeployment: vi.fn(),
        deploymentStatus: vi.fn(async () => fixture.status),
        covers: vi.fn(async () => true)
      },
      recoveryService: crash_after_bead_readback,
      dispatchRecovery: (input) =>
        runtime.scheduler.dispatchRepoRecovery(workspace, input),
      now: () => 1000
    });

    const bead_crash = await recovery.tick();

    expect(bead_crash).toMatchObject({
      ok: false,
      reason: 'deployment_recovery_bead_failed'
    });
    expect(fixture.issues.size).toBe(1);
    expect(store.snapshot(workspace).deployment?.recovery?.bead_id).toBeNull();

    runtime = recoverySchedulerAfterRestart(store, fixture);
    recovery = createDeploymentRecovery({
      workspace,
      repo: REPO,
      store,
      deploymentJob: {
        retryDeployment: vi.fn(),
        deploymentStatus: vi.fn(async () => fixture.status),
        covers: vi.fn(async () => true)
      },
      recoveryService: runtime.recoveryService,
      dispatchRecovery: async (input) => {
        await runtime.scheduler.dispatchRepoRecovery(workspace, input);
        throw new Error('crash after session spawn');
      },
      now: () => 1000
    });

    const spawn_crash = await recovery.tick();

    expect(spawn_crash).toMatchObject({
      ok: false,
      reason: 'deployment_recovery_spawn_failed'
    });
    expect(fixture.issues.size).toBe(1);
    expect(fixture.sessions).toHaveLength(1);
    expect(store.snapshot(workspace).deployment?.recovery).toMatchObject({
      bead_id: expect.any(String),
      attempt_id: null
    });

    runtime = recoverySchedulerAfterRestart(store, fixture);
    recovery = createDeploymentRecovery({
      workspace,
      repo: REPO,
      store,
      deploymentJob: {
        retryDeployment: vi.fn(),
        deploymentStatus: vi.fn(async () => fixture.status),
        covers: vi.fn(async () => true)
      },
      recoveryService: runtime.recoveryService,
      dispatchRecovery: (input) =>
        runtime.scheduler.dispatchRepoRecovery(workspace, input),
      now: () => 1000
    });

    const adopted = await recovery.tick();

    expect(adopted).toMatchObject({
      ok: true,
      reason: 'deployment_recovery_spawned'
    });
    expect(fixture.issues.size).toBe(1);
    expect(fixture.sessions).toHaveLength(1);
    expect(store.snapshot(workspace).deployment?.recovery).toMatchObject({
      bead_id: expect.any(String),
      attempt_id: expect.any(String)
    });
    expect(
      Object.values(store.snapshot(workspace).attempts).filter(
        (attempt) =>
          attempt.deployment_recovery_failure_key?.generation ===
          failure_key.generation
      )
    ).toHaveLength(1);
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
