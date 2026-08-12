/**
 * Repository deployment retry coordinator. Provider execution remains outside
 * this process; this module owns only the durable retry journal and the three
 * legal `repo-deployctl` client calls exposed by deployment-job.
 */
import { createHash } from 'node:crypto';
import { realpathSync } from 'node:fs';
import path from 'node:path';

export const FIRST_RETRY_DELAY_MS = 30_000;
export const SECOND_RETRY_DELAY_MS = 120_000;

/**
 * @param {string} repo
 */
function canonicalRepo(repo) {
  const resolved = path.resolve(repo);
  try {
    return realpathSync(resolved);
  } catch {
    return resolved;
  }
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} value
 */
function isSha(value) {
  return typeof value === 'string' && /^[0-9a-f]{40}$/i.test(value);
}

/**
 * @param {unknown} value
 */
function isGeneration(value) {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

/**
 * @param {string} repo
 * @param {any} status
 */
function failureKey(repo, status) {
  if (
    !isRecord(status) ||
    status.state !== 'failed' ||
    typeof status.target_base !== 'string' ||
    status.target_base.length === 0 ||
    !isSha(status.target_sha) ||
    !isGeneration(status.generation) ||
    typeof status.error_code !== 'string' ||
    status.error_code.length === 0
  ) {
    return null;
  }
  // The provider exposes only a sanitized log reference. Keep failure identity
  // bounded without opening provider-owned files or copying log contents.
  const log_source =
    typeof status.log_path === 'string' ? status.log_path.slice(0, 1024) : '';
  return {
    repo,
    target_base: status.target_base,
    target_sha: String(status.target_sha).toLowerCase(),
    generation: Number(status.generation),
    error_code: status.error_code.slice(0, 200),
    log_digest: createHash('sha256').update(log_source).digest('hex')
  };
}

/**
 * @param {any} status
 * @param {any} binding
 */
function matchesBinding(status, binding) {
  return (
    status?.target_base === binding?.target_base &&
    status?.target_sha === binding?.target_sha &&
    status?.generation === binding?.generation
  );
}

/**
 * @param {{
 *   workspace: string,
 *   repo: string,
 *   store: any,
 *   deploymentJob: { retryDeployment: (input: any) => Promise<any>, deploymentStatus: (input: any) => Promise<any> },
 *   now?: () => number,
 *   notifyChanged?: (workspace: string) => void
 * }} deps
 */
export function createDeploymentRecovery(deps) {
  const workspace = deps.workspace;
  const repo = canonicalRepo(deps.repo);
  const now = deps.now || (() => Date.now());
  const notifyChanged = deps.notifyChanged || (() => {});

  /**
   * @param {any} status
   */
  async function observe(status) {
    const recorded = deps.store.recordDeploymentObservation(workspace, status);
    if (!recorded.ok) {
      return { ok: false, reason: 'deployment_observation_rejected' };
    }
    notifyChanged(workspace);
    const key = failureKey(repo, status);
    if (!key) {
      return { ok: true, reason: status.state };
    }
    const deployment = deps.store.snapshot(workspace).deployment;
    if (deployment?.retry_operation) {
      return { ok: true, reason: deployment.retry_operation.phase };
    }
    const count = deployment?.automatic_retry_count ?? 0;
    const delay = count === 0 ? FIRST_RETRY_DELAY_MS : SECOND_RETRY_DELAY_MS;
    const scheduled = deps.store.scheduleDeploymentRetry(
      workspace,
      key,
      now() + delay
    );
    if (!scheduled.ok && !scheduled.exhausted) {
      return { ok: false, reason: 'deployment_retry_schedule_rejected' };
    }
    notifyChanged(workspace);
    return {
      ok: true,
      reason: scheduled.exhausted ? 'recovery_ready' : 'retry_scheduled'
    };
  }

  /** Read the current provider status through the legal client boundary. */
  async function poll() {
    try {
      const status = await deps.deploymentJob.deploymentStatus({ repo });
      return await observe(status);
    } catch {
      return { ok: false, reason: 'deployment_recovery_status_failed' };
    }
  }

  /**
   * Complete an operation whose provider retry returned before a restart.
   *
   * @param {any} deployment
   */
  async function adoptCallingOperation(deployment) {
    const operation = deployment.retry_operation;
    const status = await deps.deploymentJob.deploymentStatus({ repo });
    const expected = {
      target_base: operation.failure_key.target_base,
      target_sha: operation.failure_key.target_sha,
      generation: operation.failure_key.generation + 1
    };
    if (!matchesBinding(status, expected)) {
      return { ok: false, reason: 'deployment_retry_call_ambiguous' };
    }
    const returned = deps.store.recordDeploymentRetryReturned(
      workspace,
      operation.failure_key,
      expected
    );
    if (!returned.ok) {
      return { ok: false, reason: 'deployment_retry_adoption_rejected' };
    }
    const settled = deps.store.settleDeploymentRetry(
      workspace,
      operation.failure_key,
      status
    );
    if (!settled.ok) {
      return { ok: false, reason: 'deployment_retry_adoption_settle_rejected' };
    }
    notifyChanged(workspace);
    return { ok: true, reason: 'deployment_retry_adopted' };
  }

  /**
   * Run at most one repo-local automatic retry operation.
   */
  async function tick() {
    const deployment = deps.store.snapshot(workspace).deployment;
    const operation = deployment?.retry_operation;
    if (!deployment || !operation) {
      return { ok: true, reason: 'idle' };
    }
    if (
      operation.phase === 'recovery_ready' ||
      operation.phase === 'superseded'
    ) {
      return { ok: true, reason: operation.phase };
    }
    if (operation.phase === 'calling') {
      try {
        return await adoptCallingOperation(deployment);
      } catch {
        return { ok: false, reason: 'deployment_retry_adoption_status_failed' };
      }
    }
    if (operation.phase === 'returned') {
      try {
        const status = await deps.deploymentJob.deploymentStatus({
          repo,
          current_binding: operation.retry_binding
        });
        const settled = deps.store.settleDeploymentRetry(
          workspace,
          operation.failure_key,
          status
        );
        if (!settled.ok) {
          return { ok: false, reason: 'deployment_retry_settle_rejected' };
        }
        notifyChanged(workspace);
        return { ok: true, reason: 'deployment_retry_settled' };
      } catch {
        return { ok: false, reason: 'deployment_retry_status_failed' };
      }
    }
    if (now() < operation.next_retry_at) {
      return { ok: true, reason: 'retry_not_due' };
    }
    const prerecord = deps.store.prerecordDeploymentRetry(
      workspace,
      operation.failure_key,
      now()
    );
    if (!prerecord.ok) {
      return { ok: false, reason: 'deployment_retry_prerecord_rejected' };
    }
    notifyChanged(workspace);
    let binding;
    try {
      binding = await deps.deploymentJob.retryDeployment({
        repo,
        current_binding: {
          target_base: operation.failure_key.target_base,
          target_sha: operation.failure_key.target_sha,
          generation: operation.failure_key.generation
        }
      });
    } catch {
      return { ok: false, reason: 'deployment_retry_effect_failed' };
    }
    if (
      !matchesBinding(binding, {
        target_base: operation.failure_key.target_base,
        target_sha: operation.failure_key.target_sha,
        generation: operation.failure_key.generation + 1
      })
    ) {
      return { ok: false, reason: 'deployment_retry_binding_mismatch' };
    }
    const returned = deps.store.recordDeploymentRetryReturned(
      workspace,
      operation.failure_key,
      binding
    );
    if (!returned.ok) {
      return { ok: false, reason: 'deployment_retry_return_rejected' };
    }
    try {
      const status = await deps.deploymentJob.deploymentStatus({
        repo,
        current_binding: binding
      });
      const settled = deps.store.settleDeploymentRetry(
        workspace,
        operation.failure_key,
        status
      );
      if (!settled.ok) {
        return { ok: false, reason: 'deployment_retry_settle_rejected' };
      }
      notifyChanged(workspace);
      return { ok: true, reason: 'deployment_retry_settled' };
    } catch {
      return { ok: false, reason: 'deployment_retry_status_failed' };
    }
  }

  return { observe, poll, tick };
}
