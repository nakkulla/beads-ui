import { PassThrough } from 'node:stream';
import { describe, expect, test, vi } from 'vitest';
import { createDeploymentJob } from './deployment-job.js';

const REPO = '/workspace/repo';
const BASE = 'main';
const SHA = 'a'.repeat(40);

/**
 * @param {unknown} payload
 * @param {number} [code]
 */
function jsonSpawn(payload, code = 0, include_repo = true) {
  const response =
    include_repo &&
    payload !== null &&
    typeof payload === 'object' &&
    !Array.isArray(payload)
      ? { repo: REPO, ...payload }
      : payload;
  return /** @type {any} */ (
    vi.fn(() => {
      const child = /** @type {any} */ (new PassThrough());
      child.stdout = new PassThrough();
      child.stderr = new PassThrough();
      queueMicrotask(() => {
        child.stdout.end(JSON.stringify(response));
        child.emit('close', code);
      });
      return child;
    })
  );
}

/**
 * @param {number} generation
 * @param {string} [target_sha]
 */
function pending(generation, target_sha = SHA) {
  return {
    state: 'pending',
    target_base: BASE,
    target_sha,
    deployed_sha: null,
    generation,
    error_code: null,
    log_path: null
  };
}

describe('worker/deployment-job', () => {
  test('requests a verified SHA with shell-free provider argv', async () => {
    const spawn_impl = jsonSpawn({
      accepted: true,
      noop: false,
      target_base: BASE,
      target_sha: SHA,
      generation: 4,
      error_code: null
    });
    const job = createDeploymentJob({ spawn_impl });

    const result = await job.requestDeployment({
      repo: REPO,
      target_base: BASE,
      verified_sha: SHA
    });

    expect(result).toEqual({
      accepted: true,
      noop: false,
      target_base: BASE,
      target_sha: SHA,
      generation: 4,
      error_code: null
    });
    expect(spawn_impl).toHaveBeenCalledWith(
      'repo-deployctl',
      [
        'request',
        '--repo',
        REPO,
        '--base',
        BASE,
        '--verified-sha',
        SHA,
        '--json'
      ],
      expect.objectContaining({ cwd: REPO, shell: false })
    );
  });

  test('rejects an accepted request whose target SHA differs from the verified SHA', async () => {
    const job = createDeploymentJob({
      spawn_impl: jsonSpawn({
        accepted: true,
        noop: false,
        target_base: BASE,
        target_sha: 'b'.repeat(40),
        generation: 4,
        error_code: null
      })
    });

    await expect(
      job.requestDeployment({
        repo: REPO,
        target_base: BASE,
        verified_sha: SHA
      })
    ).rejects.toMatchObject({ code: 'deployment_binding_mismatch' });
  });

  test('accepts only a descendant SHA for a noop request', async () => {
    const descendant = 'b'.repeat(40);
    const response = {
      accepted: false,
      noop: true,
      target_base: BASE,
      target_sha: descendant,
      generation: 4,
      error_code: null
    };
    const covered = createDeploymentJob({
      spawn_impl: jsonSpawn(response),
      isAncestor: async (repo, ancestor, candidate) =>
        repo === REPO && ancestor === SHA && candidate === descendant
    });
    const unrelated = createDeploymentJob({
      spawn_impl: jsonSpawn(response),
      isAncestor: async () => false
    });

    await expect(
      covered.requestDeployment({
        repo: REPO,
        target_base: BASE,
        verified_sha: SHA
      })
    ).resolves.toMatchObject({ noop: true, target_sha: descendant });
    await expect(
      unrelated.requestDeployment({
        repo: REPO,
        target_base: BASE,
        verified_sha: SHA
      })
    ).rejects.toMatchObject({ code: 'deployment_binding_mismatch' });
  });

  test('returns every provider deployment state after strict JSON parsing', async () => {
    for (const state of ['idle', 'pending', 'running', 'succeeded', 'failed']) {
      const payload =
        state === 'idle'
          ? {
              state,
              target_base: null,
              target_sha: null,
              deployed_sha: null,
              generation: null,
              error_code: null,
              log_path: null
            }
          : {
              ...pending(3),
              state,
              deployed_sha: state === 'succeeded' ? SHA : null,
              error_code: state === 'failed' ? 'deploy_exit_nonzero' : null,
              log_path: state === 'pending' ? null : '/tmp/deploy.log'
            };
      const job = createDeploymentJob({ spawn_impl: jsonSpawn(payload) });

      const result = await job.deploymentStatus({ repo: REPO });

      expect(result.state).toBe(state);
    }
  });

  test('accepts the installed provider grammar without an echoed repository', async () => {
    const job = createDeploymentJob({
      spawn_impl: jsonSpawn(pending(4), 0, false)
    });

    await expect(job.deploymentStatus({ repo: REPO })).resolves.toMatchObject({
      state: 'pending',
      generation: 4
    });
  });

  test('returns an unbound provider failure without treating it as idle', async () => {
    const job = createDeploymentJob({
      spawn_impl: jsonSpawn({
        state: 'failed',
        target_base: null,
        target_sha: null,
        deployed_sha: null,
        generation: null,
        error_code: 'desired_invalid',
        log_path: null
      })
    });

    await expect(job.deploymentStatus({ repo: REPO })).resolves.toMatchObject({
      state: 'failed',
      target_sha: null,
      error_code: 'desired_invalid'
    });
  });

  test('returns a valid unbound status failure emitted with nonzero exit', async () => {
    const job = createDeploymentJob({
      spawn_impl: jsonSpawn(
        {
          state: 'failed',
          target_base: null,
          target_sha: null,
          deployed_sha: null,
          generation: null,
          error_code: 'desired_invalid',
          log_path: null
        },
        1
      )
    });

    await expect(job.deploymentStatus({ repo: REPO })).resolves.toMatchObject({
      state: 'failed',
      error_code: 'desired_invalid'
    });
  });

  test('maps nonzero structured request and retry failures to their operation rejection', async () => {
    const rejected = {
      accepted: false,
      noop: false,
      target_base: null,
      target_sha: null,
      generation: null,
      error_code: 'desired_invalid'
    };
    const request = createDeploymentJob({ spawn_impl: jsonSpawn(rejected, 1) });
    const retry = createDeploymentJob({ spawn_impl: jsonSpawn(rejected, 1) });

    await expect(
      request.requestDeployment({
        repo: REPO,
        target_base: BASE,
        verified_sha: SHA
      })
    ).rejects.toMatchObject({ code: 'deployment_request_rejected' });
    await expect(
      retry.retryDeployment({
        repo: REPO,
        current_binding: { target_base: BASE, target_sha: SHA, generation: 4 }
      })
    ).rejects.toMatchObject({ code: 'deployment_retry_binding_mismatch' });
  });

  test('rejects malformed provider output and a wrong desired binding', async () => {
    const malformed = createDeploymentJob({
      spawn_impl: jsonSpawn('not an object')
    });

    await expect(
      malformed.deploymentStatus({ repo: REPO })
    ).rejects.toMatchObject({
      code: 'deployment_provider_malformed'
    });

    const wrong_binding = createDeploymentJob({
      spawn_impl: jsonSpawn(pending(2, 'b'.repeat(40)))
    });

    await expect(
      wrong_binding.deploymentStatus({
        repo: REPO,
        current_binding: { target_base: BASE, target_sha: SHA, generation: 2 }
      })
    ).rejects.toMatchObject({ code: 'deployment_binding_mismatch' });
  });

  test('rejects a request response for another repository', async () => {
    const job = createDeploymentJob({
      spawn_impl: jsonSpawn({
        repo: '/workspace/other',
        accepted: true,
        noop: false,
        target_base: BASE,
        target_sha: SHA,
        generation: 4,
        error_code: null
      })
    });

    await expect(
      job.requestDeployment({
        repo: REPO,
        target_base: BASE,
        verified_sha: SHA
      })
    ).rejects.toMatchObject({ code: 'deployment_binding_mismatch' });
  });

  test('rejects a status response for another repository', async () => {
    const job = createDeploymentJob({
      spawn_impl: jsonSpawn({ repo: '/workspace/other', ...pending(4) })
    });

    await expect(job.deploymentStatus({ repo: REPO })).rejects.toMatchObject({
      code: 'deployment_binding_mismatch'
    });
  });

  test('rejects a retry response for another repository', async () => {
    const job = createDeploymentJob({
      spawn_impl: jsonSpawn({
        repo: '/workspace/other',
        accepted: true,
        noop: false,
        target_base: BASE,
        target_sha: SHA,
        generation: 5,
        error_code: null
      })
    });

    await expect(
      job.retryDeployment({
        repo: REPO,
        current_binding: { target_base: BASE, target_sha: SHA, generation: 4 }
      })
    ).rejects.toMatchObject({ code: 'deployment_binding_mismatch' });
  });

  test('rejects a stale provider regression but accepts newer generation coverage', async () => {
    const stale = createDeploymentJob({ spawn_impl: jsonSpawn(pending(3)) });

    await expect(
      stale.deploymentStatus({
        repo: REPO,
        row_binding: { verified_target_sha: SHA, deployment_generation: 4 }
      })
    ).rejects.toMatchObject({ code: 'deployment_generation_stale' });

    const newer_sha = 'b'.repeat(40);
    const newer = createDeploymentJob({
      spawn_impl: jsonSpawn({
        ...pending(5, newer_sha),
        state: 'succeeded',
        deployed_sha: newer_sha,
        log_path: '/tmp/deploy.log'
      })
    });

    await expect(
      newer.deploymentStatus({
        repo: REPO,
        row_binding: { verified_target_sha: SHA, deployment_generation: 4 }
      })
    ).resolves.toMatchObject({ generation: 5, deployed_sha: newer_sha });
  });

  test('delegates merged-floor coverage with repository-aware async ancestry', async () => {
    const isAncestor = vi.fn(
      async (repo, ancestor, descendant) =>
        repo === REPO && ancestor === SHA && descendant === 'b'.repeat(40)
    );
    const job = createDeploymentJob({ isAncestor });

    const covered = await job.covers(REPO, 'b'.repeat(40), SHA);

    expect(covered).toBe(true);
    expect(isAncestor).toHaveBeenCalledWith(REPO, SHA, 'b'.repeat(40));
  });

  test('retries only against the current failed binding', async () => {
    const spawn_impl = jsonSpawn({
      accepted: true,
      noop: false,
      target_base: BASE,
      target_sha: SHA,
      generation: 8,
      error_code: null
    });
    const job = createDeploymentJob({ spawn_impl });

    await expect(
      job.retryDeployment({
        repo: REPO,
        current_binding: { target_base: BASE, target_sha: SHA, generation: 7 }
      })
    ).resolves.toMatchObject({ generation: 8 });

    const wrong = createDeploymentJob({
      spawn_impl: jsonSpawn({
        accepted: true,
        noop: false,
        target_base: BASE,
        target_sha: 'c'.repeat(40),
        generation: 8,
        error_code: null
      })
    });

    await expect(
      wrong.retryDeployment({
        repo: REPO,
        current_binding: { target_base: BASE, target_sha: SHA, generation: 7 }
      })
    ).rejects.toMatchObject({ code: 'deployment_retry_binding_mismatch' });
  });

  test('rejects a retry response that skips a deployment generation', async () => {
    const job = createDeploymentJob({
      spawn_impl: jsonSpawn({
        accepted: true,
        noop: false,
        target_base: BASE,
        target_sha: SHA,
        generation: 9,
        error_code: null
      })
    });

    await expect(
      job.retryDeployment({
        repo: REPO,
        current_binding: { target_base: BASE, target_sha: SHA, generation: 7 }
      })
    ).rejects.toMatchObject({ code: 'deployment_retry_binding_mismatch' });
  });
});
