import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createDeploymentRecovery } from './deployment-recovery.js';
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
 * @param {{ now?: number, repo?: string, deploymentJob?: any }} [input]
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
    deploymentStatus: vi.fn(async () => status(2, 'pending'))
  };
  const recovery = createDeploymentRecovery({
    workspace: WS,
    repo: input.repo ?? REPO,
    store,
    deploymentJob,
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

describe('worker/deployment-recovery', () => {
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

  test('rejects malformed and divergent observations without provider effects', async () => {
    const h = setup();
    await h.recovery.observe(status(1, 'failed'));

    const result = await h.recovery.observe({
      ...status(1, 'failed'),
      target_sha: 'not-a-sha'
    });
    await h.recovery.observe(status(0, 'failed'));

    expect(result).toMatchObject({ ok: false });
    expect(h.deploymentJob.retryDeployment).not.toHaveBeenCalled();
    expect(h.store.snapshot(WS).deployment?.generation).toBe(1);
  });
});
