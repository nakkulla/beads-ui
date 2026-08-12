import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  createDeploymentRecovery,
  parseDeploymentRecoveryOutcome
} from './deployment-recovery.js';
import { createQueueStore } from './queue-store.js';

const WS = '/tmp/deployment-recovery';
const REPO = '/tmp/deployment-recovery/repo';
const SHA = 'a'.repeat(40);

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(
    path.join(os.tmpdir(), 'bdui-deployment-recovery-')
  );
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * @param {number} generation
 * @param {'pending'|'running'|'failed'} state
 * @param {string} [sha]
 */
function status(generation, state, sha = SHA) {
  return {
    state,
    target_base: 'main',
    target_sha: sha,
    deployed_sha: null,
    generation,
    error_code: state === 'failed' ? 'deploy_failed' : null,
    log_path:
      state === 'failed' || state === 'running' ? '/logs/deploy.log' : null
  };
}

/**
 * @param {{ now?: number, repo?: string, deploymentJob?: any, recoveryService?: any, dispatchRecovery?: any }} [input]
 */
function setup(input = {}) {
  const store = createQueueStore();
  let now = input.now ?? 1000;
  const deploymentJob = input.deploymentJob ?? {
    retryDeployment: vi.fn(async () => ({
      target_base: 'main',
      target_sha: SHA,
      generation: 2
    })),
    deploymentStatus: vi.fn(async () => status(2, 'pending')),
    covers: vi.fn(async () => true)
  };
  const recovery = createDeploymentRecovery({
    workspace: WS,
    repo: input.repo ?? REPO,
    store,
    deploymentJob,
    recoveryService: input.recoveryService,
    dispatchRecovery: input.dispatchRecovery,
    now: () => now
  });
  return {
    store,
    deploymentJob,
    recovery,
    advance: (/** @type {number} */ ms) => {
      now += ms;
    }
  };
}

/**
 * Drive one deployment to its bound recovery attempt.
 *
 * @param {ReturnType<typeof setup>} h
 * @returns {Promise<{ identity: string, failure_key: any }>}
 */
async function prepareSpawnedRecovery(h) {
  await h.recovery.observe(status(1, 'failed'));
  h.advance(30_000);
  await h.recovery.tick();
  await h.recovery.observe(status(2, 'failed'));
  h.advance(120_000);
  h.deploymentJob.retryDeployment.mockResolvedValueOnce({
    target_base: 'main',
    target_sha: SHA,
    generation: 3
  });
  h.deploymentJob.deploymentStatus.mockResolvedValueOnce(status(3, 'pending'));
  await h.recovery.tick();
  await h.recovery.observe(status(3, 'failed'));
  await h.recovery.tick();
  const recovery = h.store.snapshot(WS).deployment?.recovery;
  if (!recovery || !recovery.bead_id) {
    throw new Error('expected deployment recovery');
  }
  if (!h.store.snapshot(WS).attempts['recovery-attempt-1']) {
    h.store.appendAttempt(WS, {
      expected_revision: h.store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'recovery-attempt-1',
        bead_id: recovery.bead_id,
        deployment_recovery_identity: recovery.identity,
        deployment_recovery_root: true,
        deployment_recovery_failure_key: recovery.failure_key
      }
    });
  }
  return { identity: recovery.identity, failure_key: recovery.failure_key };
}

describe('worker/deployment-recovery', () => {
  test('parses one exact bounded recovery outcome marker', () => {
    const identity = 'b'.repeat(64);

    const parsed = parseDeploymentRecoveryOutcome(
      [
        '진단 완료',
        `BDUI_RECOVERY_OUTCOME ${JSON.stringify({
          identity,
          attempt_id: 'recovery-attempt-1',
          outcome: 'retry_same',
          evidence_kind: 'environment_repair',
          evidence: 'service_config_repaired',
          reason: null
        })}`
      ],
      { identity, attempt_id: 'recovery-attempt-1' }
    );

    expect(parsed).toEqual({
      ok: true,
      outcome: {
        identity,
        attempt_id: 'recovery-attempt-1',
        outcome: 'retry_same',
        evidence_kind: 'environment_repair',
        evidence: 'service_config_repaired',
        reason: null
      }
    });
  });

  test('rejects duplicate or mismatched recovery outcome markers', () => {
    const identity = 'c'.repeat(64);
    const marker = `BDUI_RECOVERY_OUTCOME ${JSON.stringify({
      identity,
      attempt_id: 'recovery-attempt-1',
      outcome: 'retry_same',
      evidence_kind: 'environment_repair',
      evidence: 'service_config_repaired',
      reason: null
    })}`;

    expect(
      parseDeploymentRecoveryOutcome([marker, marker], {
        identity,
        attempt_id: 'recovery-attempt-1'
      })
    ).toEqual({ ok: false, reason: 'recovery_outcome_multiple' });
    expect(
      parseDeploymentRecoveryOutcome([marker], {
        identity,
        attempt_id: 'other-attempt'
      })
    ).toEqual({ ok: false, reason: 'recovery_outcome_unowned' });
  });

  test('schedules the first matching failed binding after thirty seconds', async () => {
    const h = setup();

    await h.recovery.observe(status(1, 'failed'));

    expect(h.store.snapshot(WS).deployment).toMatchObject({
      automatic_retry_count: 0,
      next_retry_at: 31_000,
      retry_operation: { phase: 'scheduled' }
    });
    expect(h.deploymentJob.retryDeployment).not.toHaveBeenCalled();

    await h.recovery.tick();
    h.advance(30_000);
    await h.recovery.tick();

    expect(h.deploymentJob.retryDeployment).toHaveBeenCalledOnce();
    expect(h.store.snapshot(WS).deployment).toMatchObject({
      state: 'pending',
      generation: 2,
      automatic_retry_count: 1,
      retry_operation: null
    });
  });

  test('fences a provider parser rejection behind durable confirmation', async () => {
    const malformed = Object.assign(new Error('malformed provider status'), {
      code: 'deployment_provider_malformed'
    });
    const h = setup({
      deploymentJob: {
        retryDeployment: vi.fn(),
        deploymentStatus: vi.fn(async () => {
          throw malformed;
        }),
        covers: vi.fn(async () => true)
      }
    });
    h.store.recordDeploymentObservation(WS, status(1, 'failed'));

    const result = await h.recovery.poll();

    expect(result).toMatchObject({
      ok: false,
      reason: 'deployment_observation_confirmation_required'
    });
    expect(h.store.snapshot(WS).deployment?.recovery).toMatchObject({
      phase: 'awaiting_confirmation',
      confirmation_reason: 'deployment_binding_malformed'
    });
  });

  test('adopts a manual retry journal after readback crashes without repeating the effect', async () => {
    const deploymentJob = {
      retryDeployment: vi.fn(async () => ({
        target_base: 'main',
        target_sha: SHA,
        generation: 2
      })),
      deploymentStatus: vi
        .fn()
        .mockRejectedValueOnce(new Error('coordinator crashed'))
        .mockResolvedValueOnce(status(2, 'pending')),
      covers: vi.fn(async () => true)
    };
    const h = setup({ deploymentJob });
    h.store.recordDeploymentObservation(WS, status(1, 'failed'));

    const interrupted = await h.recovery.retryNow();

    expect(interrupted).toMatchObject({
      ok: false,
      reason: 'deployment_retry_status_failed'
    });
    expect(h.store.snapshot(WS).deployment?.retry_operation).toMatchObject({
      phase: 'returned',
      retry_binding: {
        target_base: 'main',
        target_sha: SHA,
        generation: 2
      }
    });

    const restarted = createDeploymentRecovery({
      workspace: WS,
      repo: REPO,
      store: h.store,
      deploymentJob
    });
    const adopted = await restarted.tick();

    expect(adopted).toMatchObject({
      ok: true,
      reason: 'deployment_retry_settled'
    });
    expect(deploymentJob.retryDeployment).toHaveBeenCalledOnce();
    expect(h.store.snapshot(WS).deployment).toMatchObject({
      state: 'pending',
      generation: 2,
      retry_operation: null
    });
  });

  test('uses a second one-hundred-twenty-second delay and stops after two retries', async () => {
    const h = setup();

    await h.recovery.observe(status(1, 'failed'));
    h.advance(30_000);
    await h.recovery.tick();
    await h.recovery.observe(status(2, 'failed'));

    expect(h.store.snapshot(WS).deployment).toMatchObject({
      automatic_retry_count: 1,
      next_retry_at: 151_000
    });
    h.advance(120_000);
    h.deploymentJob.deploymentStatus.mockResolvedValueOnce(
      status(3, 'pending')
    );
    h.deploymentJob.retryDeployment.mockResolvedValueOnce({
      target_base: 'main',
      target_sha: SHA,
      generation: 3
    });
    await h.recovery.tick();
    await h.recovery.observe(status(3, 'failed'));

    expect(h.deploymentJob.retryDeployment).toHaveBeenCalledTimes(2);
    expect(h.store.snapshot(WS).deployment).toMatchObject({
      automatic_retry_count: 2,
      retry_operation: { phase: 'recovery_ready' }
    });
  });

  test('prerecords, creates, readbacks, and binds one fresh recovery attempt', async () => {
    const recoveryService = {
      ensureRepoRecoveryBead: vi.fn(async (input) => {
        const { repoRecoveryIdentity } = await import('./completion-repair.js');
        return repoRecoveryIdentity(
          input.repo,
          input.generation,
          input.failure_key
        );
      })
    };
    const dispatchRecovery = vi.fn(async () => ({
      ok: true,
      attempt_id: 'recovery-1'
    }));
    const h = setup({ recoveryService, dispatchRecovery });

    await h.recovery.observe(status(1, 'failed'));
    h.advance(30_000);
    await h.recovery.tick();
    await h.recovery.observe(status(2, 'failed'));
    h.advance(120_000);
    h.deploymentJob.retryDeployment.mockResolvedValueOnce({
      target_base: 'main',
      target_sha: SHA,
      generation: 3
    });
    h.deploymentJob.deploymentStatus.mockResolvedValueOnce(
      status(3, 'pending')
    );
    await h.recovery.tick();
    await h.recovery.observe(status(3, 'failed'));

    const result = await h.recovery.tick();
    await h.recovery.tick();

    expect(result).toMatchObject({
      ok: true,
      reason: 'deployment_recovery_spawned'
    });
    expect(recoveryService.ensureRepoRecoveryBead).toHaveBeenCalledOnce();
    expect(dispatchRecovery).toHaveBeenCalledOnce();
    expect(h.store.snapshot(WS).deployment?.recovery).toMatchObject({
      bead_id: expect.stringMatching(/^recovery-/),
      attempt_id: 'recovery-1',
      phase: 'spawned'
    });
  });

  test('adopts a persisted prerecord through create and bind without a second Bead', async () => {
    const recoveryService = {
      ensureRepoRecoveryBead: vi.fn(async (input) => {
        const { repoRecoveryIdentity } = await import('./completion-repair.js');
        return repoRecoveryIdentity(
          input.repo,
          input.generation,
          input.failure_key
        );
      })
    };
    const dispatchRecovery = vi.fn(async () => ({
      ok: true,
      attempt_id: 'recovery-adopted'
    }));
    const h = setup({ recoveryService, dispatchRecovery });
    await h.recovery.observe(status(1, 'failed'));
    h.advance(30_000);
    await h.recovery.tick();
    await h.recovery.observe(status(2, 'failed'));
    h.advance(120_000);
    h.deploymentJob.retryDeployment.mockResolvedValueOnce({
      target_base: 'main',
      target_sha: SHA,
      generation: 3
    });
    h.deploymentJob.deploymentStatus.mockResolvedValueOnce(
      status(3, 'pending')
    );
    await h.recovery.tick();
    await h.recovery.observe(status(3, 'failed'));
    const operation = h.store.snapshot(WS).deployment?.retry_operation;
    if (!operation) throw new Error('expected recovery operation');
    const { repoRecoveryIdentity } = await import('./completion-repair.js');
    const identity = repoRecoveryIdentity(REPO, 3, operation.failure_key);
    h.store.prerecordDeploymentRecovery(WS, operation.failure_key, {
      identity: identity.identity,
      prepared_at: 999
    });

    const reloaded = createQueueStore();
    const recovery = createDeploymentRecovery({
      workspace: WS,
      repo: REPO,
      store: reloaded,
      deploymentJob: h.deploymentJob,
      recoveryService,
      dispatchRecovery
    });
    await recovery.tick();
    await recovery.tick();

    expect(recoveryService.ensureRepoRecoveryBead).toHaveBeenCalledOnce();
    expect(dispatchRecovery).toHaveBeenCalledOnce();
    expect(reloaded.snapshot(WS).deployment?.recovery).toMatchObject({
      identity: identity.identity,
      bead_id: identity.bead_id,
      attempt_id: 'recovery-adopted'
    });
  });

  test('fences an ambiguous returned retry behind confirmation without another effect', async () => {
    const h = setup();
    await h.recovery.observe(status(1, 'failed'));
    const operation = h.store.snapshot(WS).deployment?.retry_operation;
    if (!operation) throw new Error('expected retry operation');
    h.store.prerecordDeploymentRetry(WS, operation.failure_key, 31_000);
    h.deploymentJob.deploymentStatus.mockResolvedValueOnce(status(1, 'failed'));

    const result = await h.recovery.tick();

    expect(result).toMatchObject({ reason: 'deployment_retry_call_ambiguous' });
    expect(h.deploymentJob.retryDeployment).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).deployment?.recovery).toMatchObject({
      phase: 'awaiting_confirmation',
      outcome: 'awaiting_confirmation'
    });
  });

  test('fences malformed recovery output before a provider mutation', async () => {
    const recoveryService = {
      ensureRepoRecoveryBead: vi.fn(async (input) => {
        const { repoRecoveryIdentity } = await import('./completion-repair.js');
        return repoRecoveryIdentity(
          input.repo,
          input.generation,
          input.failure_key
        );
      })
    };
    const h = setup({ recoveryService });
    await h.recovery.observe(status(1, 'failed'));
    h.advance(30_000);
    await h.recovery.tick();
    await h.recovery.observe(status(2, 'failed'));
    h.advance(120_000);
    h.deploymentJob.retryDeployment.mockResolvedValueOnce({
      target_base: 'main',
      target_sha: SHA,
      generation: 3
    });
    h.deploymentJob.deploymentStatus.mockResolvedValueOnce(
      status(3, 'pending')
    );
    await h.recovery.tick();
    await h.recovery.observe(status(3, 'failed'));
    await h.recovery.tick();
    const identity = h.store.snapshot(WS).deployment?.recovery?.identity;
    if (!identity) throw new Error('expected recovery identity');
    h.deploymentJob.retryDeployment.mockClear();

    const result = await h.recovery.consumeOutcome({
      identity,
      outcome: 'unbounded_shell_output'
    });

    expect(result).toMatchObject({ reason: 'recovery_outcome_malformed' });
    expect(h.deploymentJob.retryDeployment).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).deployment?.recovery).toMatchObject({
      phase: 'awaiting_confirmation',
      confirmation_reason: 'recovery_outcome_malformed'
    });
  });

  test('adopts a recovery retry that returned before restart without another effect', async () => {
    const recoveryService = {
      ensureRepoRecoveryBead: vi.fn(async (input) => {
        const { repoRecoveryIdentity } = await import('./completion-repair.js');
        return repoRecoveryIdentity(
          input.repo,
          input.generation,
          input.failure_key
        );
      })
    };
    const dispatchRecovery = vi.fn(async () => ({
      ok: true,
      attempt_id: 'recovery-attempt-1'
    }));
    const h = setup({ recoveryService, dispatchRecovery });
    const { identity } = await prepareSpawnedRecovery(h);
    h.deploymentJob.retryDeployment.mockClear();
    h.store.prerecordDeploymentRecoveryRetry(WS, {
      identity,
      attempt_id: 'recovery-attempt-1',
      evidence: 'service_config_repaired',
      called_at: 200_000
    });
    h.store.recordDeploymentRecoveryRetryReturned(WS, {
      identity,
      retry_binding: {
        target_base: 'main',
        target_sha: SHA,
        generation: 4
      }
    });
    h.deploymentJob.deploymentStatus.mockResolvedValueOnce(
      status(4, 'pending')
    );

    const result = await h.recovery.consumeOutcome({
      identity,
      attempt_id: 'recovery-attempt-1',
      outcome: 'retry_same',
      evidence_kind: 'environment_repair',
      evidence: 'service_config_repaired',
      reason: null
    });

    expect(result).toMatchObject({ ok: true, reason: 'retry_same_adopted' });
    expect(h.deploymentJob.retryDeployment).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).deployment).toMatchObject({
      generation: 4,
      recovery: { identity, phase: 'completed', outcome: 'retry_same' }
    });
  });

  test('fences a recovery retry whose provider call became ambiguous', async () => {
    const recoveryService = {
      ensureRepoRecoveryBead: vi.fn(async (input) => {
        const { repoRecoveryIdentity } = await import('./completion-repair.js');
        return repoRecoveryIdentity(
          input.repo,
          input.generation,
          input.failure_key
        );
      })
    };
    const dispatchRecovery = vi.fn(async () => ({
      ok: true,
      attempt_id: 'recovery-attempt-1'
    }));
    const h = setup({ recoveryService, dispatchRecovery });
    const { identity } = await prepareSpawnedRecovery(h);
    h.deploymentJob.retryDeployment.mockClear();
    h.store.prerecordDeploymentRecoveryRetry(WS, {
      identity,
      attempt_id: 'recovery-attempt-1',
      evidence: 'service_config_repaired',
      called_at: 200_000
    });
    h.deploymentJob.deploymentStatus.mockResolvedValueOnce(status(3, 'failed'));

    const result = await h.recovery.consumeOutcome({
      identity,
      attempt_id: 'recovery-attempt-1',
      outcome: 'retry_same',
      evidence_kind: 'environment_repair',
      evidence: 'service_config_repaired',
      reason: null
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'retry_same_call_ambiguous'
    });
    expect(h.deploymentJob.retryDeployment).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).deployment?.recovery).toMatchObject({
      phase: 'awaiting_confirmation',
      confirmation_reason: 'retry_same_call_ambiguous'
    });
  });

  test('settles a returned recovery retry from the coordinator tick after restart', async () => {
    const recoveryService = {
      ensureRepoRecoveryBead: vi.fn(async (input) => {
        const { repoRecoveryIdentity } = await import('./completion-repair.js');
        return repoRecoveryIdentity(
          input.repo,
          input.generation,
          input.failure_key
        );
      })
    };
    const dispatchRecovery = vi.fn(async () => ({
      ok: true,
      attempt_id: 'recovery-attempt-1'
    }));
    const h = setup({ recoveryService, dispatchRecovery });
    const { identity } = await prepareSpawnedRecovery(h);
    h.deploymentJob.retryDeployment.mockClear();
    h.store.prerecordDeploymentRecoveryRetry(WS, {
      identity,
      attempt_id: 'recovery-attempt-1',
      evidence: 'service_config_repaired',
      called_at: 200_000
    });
    h.store.recordDeploymentRecoveryRetryReturned(WS, {
      identity,
      retry_binding: {
        target_base: 'main',
        target_sha: SHA,
        generation: 4
      }
    });
    h.deploymentJob.deploymentStatus.mockResolvedValueOnce(
      status(4, 'pending')
    );

    const result = await h.recovery.tick();

    expect(result).toMatchObject({ ok: true, reason: 'retry_same_adopted' });
    expect(h.deploymentJob.retryDeployment).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).deployment).toMatchObject({
      generation: 4,
      recovery: { phase: 'completed', outcome: 'retry_same' }
    });
  });

  test('preserves repair PR recovery evidence on its descendant desired generation', async () => {
    const recoveryService = {
      ensureRepoRecoveryBead: vi.fn(async (input) => {
        const { repoRecoveryIdentity } = await import('./completion-repair.js');
        return repoRecoveryIdentity(
          input.repo,
          input.generation,
          input.failure_key
        );
      })
    };
    const dispatchRecovery = vi.fn(async () => ({
      ok: true,
      attempt_id: 'recovery-attempt-1'
    }));
    const h = setup({ recoveryService, dispatchRecovery });
    const { identity } = await prepareSpawnedRecovery(h);
    await h.recovery.consumeOutcome({
      identity,
      attempt_id: 'recovery-attempt-1',
      outcome: 'repair_pr_open',
      evidence_kind: 'repair_pr',
      evidence: 'repair_pr_submitted',
      reason: null,
      pr_verified: true
    });

    await h.recovery.observe(status(4, 'pending'));

    expect(h.store.snapshot(WS).deployment).toMatchObject({
      generation: 4,
      recovery: {
        identity,
        phase: 'completed',
        outcome: 'repair_pr_open'
      }
    });
  });

  test('adopts a returned binding after restart without a duplicate provider retry', async () => {
    const h = setup();
    await h.recovery.observe(status(1, 'failed'));
    h.advance(30_000);
    h.deploymentJob.deploymentStatus.mockResolvedValueOnce(
      status(2, 'pending')
    );
    await h.recovery.tick();

    expect(h.deploymentJob.retryDeployment).toHaveBeenCalledOnce();
    expect(h.store.snapshot(WS).deployment?.automatic_retry_count).toBe(1);

    await h.recovery.tick();

    expect(h.deploymentJob.retryDeployment).toHaveBeenCalledOnce();
  });

  test('adopts a persisted calling operation after restart without another retry', async () => {
    const h = setup();
    await h.recovery.observe(status(1, 'failed'));
    const operation = h.store.snapshot(WS).deployment?.retry_operation;
    if (!operation) {
      throw new Error('expected scheduled retry operation');
    }
    h.store.prerecordDeploymentRetry(WS, operation.failure_key, 31_000);

    const reloaded = createQueueStore();
    const recovery = createDeploymentRecovery({
      workspace: WS,
      repo: REPO,
      store: reloaded,
      deploymentJob: h.deploymentJob,
      now: () => 31_000
    });

    await recovery.tick();
    await recovery.tick();

    expect(h.deploymentJob.retryDeployment).not.toHaveBeenCalled();
    expect(reloaded.snapshot(WS).deployment).toMatchObject({
      generation: 2,
      automatic_retry_count: 1,
      retry_operation: null
    });
  });

  test('settles a persisted returned operation after restart without another retry', async () => {
    const h = setup();
    await h.recovery.observe(status(1, 'failed'));
    const operation = h.store.snapshot(WS).deployment?.retry_operation;
    if (!operation) {
      throw new Error('expected scheduled retry operation');
    }
    h.store.prerecordDeploymentRetry(WS, operation.failure_key, 31_000);
    h.store.recordDeploymentRetryReturned(WS, operation.failure_key, {
      target_base: 'main',
      target_sha: SHA,
      generation: 2
    });

    const reloaded = createQueueStore();
    const recovery = createDeploymentRecovery({
      workspace: WS,
      repo: REPO,
      store: reloaded,
      deploymentJob: h.deploymentJob,
      now: () => 31_000
    });

    await recovery.tick();
    await recovery.tick();

    expect(h.deploymentJob.retryDeployment).not.toHaveBeenCalled();
    expect(reloaded.snapshot(WS).deployment).toMatchObject({
      generation: 2,
      automatic_retry_count: 1,
      retry_operation: null
    });
  });

  test('supersedes a retry budget for a higher desired generation', async () => {
    const h = setup();
    await h.recovery.observe(status(1, 'failed'));
    await h.recovery.observe(status(2, 'pending', 'b'.repeat(40)));
    await h.recovery.observe(status(2, 'failed', 'b'.repeat(40)));

    expect(h.store.snapshot(WS).deployment).toMatchObject({
      target_sha: 'b'.repeat(40),
      generation: 2,
      automatic_retry_count: 0,
      next_retry_at: 31_000,
      superseded_retry_operation: { phase: 'superseded' }
    });
    expect(h.deploymentJob.covers).toHaveBeenCalledWith(
      REPO,
      'b'.repeat(40),
      SHA
    );
  });

  test('preserves settled retry budget evidence when a higher generation arrives', async () => {
    const h = setup();
    await h.recovery.observe(status(1, 'failed'));
    h.advance(30_000);
    await h.recovery.tick();
    await h.recovery.observe(status(3, 'pending', 'b'.repeat(40)));

    const reloaded = createQueueStore();

    expect(reloaded.snapshot(WS).deployment).toMatchObject({
      generation: 3,
      automatic_retry_count: 0,
      superseded_retry_evidence: {
        source: 'budget',
        automatic_retry_count: 1,
        binding: { generation: 2 }
      }
    });
  });

  test('uses the realpath canonical repo in the persisted failure identity', async () => {
    const target = path.join(tmp_state, 'target');
    const symlink = path.join(tmp_state, 'repo-link');
    fs.mkdirSync(target);
    fs.symlinkSync(target, symlink);
    const h = setup({ repo: symlink });

    await h.recovery.observe(status(1, 'failed'));

    expect(h.store.snapshot(WS).deployment?.failure_key?.repo).toBe(
      fs.realpathSync(symlink)
    );
  });

  test('fences malformed and divergent higher observations behind durable confirmation', async () => {
    const deploymentJob = {
      retryDeployment: vi.fn(),
      deploymentStatus: vi.fn(),
      covers: vi.fn(async () => false)
    };
    const h = setup({ deploymentJob });
    await h.recovery.observe(status(1, 'failed'));

    const malformed = await h.recovery.observe({
      ...status(1, 'failed'),
      target_sha: 'not-a-sha'
    });
    const divergent = await h.recovery.observe(
      status(2, 'pending', 'b'.repeat(40))
    );

    expect(malformed).toMatchObject({
      ok: false,
      reason: 'deployment_observation_confirmation_required'
    });
    expect(divergent).toMatchObject({
      ok: false,
      reason: 'deployment_observation_confirmation_required'
    });
    expect(deploymentJob.retryDeployment).not.toHaveBeenCalled();
    expect(deploymentJob.covers).toHaveBeenCalledWith(
      REPO,
      'b'.repeat(40),
      SHA
    );
    expect(h.store.snapshot(WS).deployment).toMatchObject({
      generation: 1,
      target_sha: SHA,
      recovery: {
        phase: 'awaiting_confirmation',
        outcome: 'awaiting_confirmation',
        confirmation_reason: 'deployment_binding_divergent'
      }
    });
    const notifications = h.store.snapshot(WS).deployment?.notifications || [];
    expect(notifications).toHaveLength(2);
    expect(
      notifications.every(
        (notification) => notification.kind === 'awaiting_confirmation'
      )
    ).toBe(true);
  });

  test('keeps an observation confirmation fenced after the valid binding reappears', async () => {
    const deploymentJob = {
      retryDeployment: vi.fn(),
      deploymentStatus: vi.fn(),
      covers: vi.fn(async () => false)
    };
    const h = setup({ deploymentJob });
    await h.recovery.observe(status(1, 'failed'));
    await h.recovery.observe(status(2, 'pending', 'b'.repeat(40)));

    const repeated = await h.recovery.observe(status(1, 'failed'));
    const ticked = await h.recovery.tick();

    expect(repeated).toMatchObject({
      ok: true,
      reason: 'awaiting_confirmation'
    });
    expect(ticked).toMatchObject({ ok: true, reason: 'idle' });
    expect(h.store.snapshot(WS).deployment).toMatchObject({
      retry_operation: null,
      recovery: { phase: 'awaiting_confirmation' }
    });
    expect(deploymentJob.retryDeployment).not.toHaveBeenCalled();
  });
});
