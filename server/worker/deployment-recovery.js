/**
 * Repository deployment retry coordinator. Provider execution remains outside
 * this process; this module owns only the durable retry journal and the three
 * legal `repo-deployctl` client calls exposed by deployment-job.
 */
import { createHash } from 'node:crypto';
import { realpathSync } from 'node:fs';
import path from 'node:path';
import { repoRecoveryIdentity } from './completion-repair.js';

export const FIRST_RETRY_DELAY_MS = 30_000;
export const SECOND_RETRY_DELAY_MS = 120_000;

const RECOVERY_OUTCOMES = new Set([
  'retry_same',
  'repair_pr_open',
  'awaiting_confirmation',
  'unrecoverable'
]);

/** @type {Record<string, string>} */
const RECOVERY_EVIDENCE = {
  retry_same: 'environment_repair',
  repair_pr_open: 'repair_pr',
  awaiting_confirmation: 'confirmation',
  unrecoverable: 'diagnosis'
};

const RECOVERY_MARKER = 'BDUI_RECOVERY_OUTCOME ';

/**
 * Parse one final, bounded recovery marker without retaining surrounding logs.
 *
 * @param {string[]} texts
 * @param {{ identity: string, attempt_id: string }} expected
 * @returns {{ ok: true, outcome: { identity: string, attempt_id: string, outcome: 'retry_same'|'repair_pr_open'|'awaiting_confirmation'|'unrecoverable', evidence_kind: 'environment_repair'|'repair_pr'|'confirmation'|'diagnosis', evidence: string, reason: string|null }}|{ ok: false, reason: string }}
 */
export function parseDeploymentRecoveryOutcome(texts, expected) {
  /** @type {string[]} */
  const markers = [];
  /** @type {string|null} */
  let last_nonempty = null;
  for (const text of texts.slice(-256)) {
    if (typeof text !== 'string') {
      continue;
    }
    const bounded = text.length > 8192 ? text.slice(-8192) : text;
    for (const line of bounded.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (trimmed.length > 0) {
        last_nonempty = trimmed;
      }
      if (trimmed.startsWith(RECOVERY_MARKER)) {
        markers.push(trimmed.slice(RECOVERY_MARKER.length));
      }
    }
  }
  if (markers.length === 0) {
    return { ok: false, reason: 'recovery_outcome_missing' };
  }
  if (markers.length !== 1) {
    return { ok: false, reason: 'recovery_outcome_multiple' };
  }
  if (last_nonempty !== `${RECOVERY_MARKER}${markers[0]}`) {
    return { ok: false, reason: 'recovery_outcome_not_final' };
  }
  if (markers[0].length > 2048) {
    return { ok: false, reason: 'recovery_outcome_oversize' };
  }
  let value;
  try {
    value = JSON.parse(markers[0]);
  } catch {
    return { ok: false, reason: 'recovery_outcome_malformed' };
  }
  if (!isRecord(value)) {
    return { ok: false, reason: 'recovery_outcome_malformed' };
  }
  const keys = Object.keys(value).sort();
  if (
    keys.join('\u0000') !==
    [
      'attempt_id',
      'evidence',
      'evidence_kind',
      'identity',
      'outcome',
      'reason'
    ].join('\u0000')
  ) {
    return { ok: false, reason: 'recovery_outcome_malformed' };
  }
  if (
    value.identity !== expected.identity ||
    value.attempt_id !== expected.attempt_id
  ) {
    return { ok: false, reason: 'recovery_outcome_unowned' };
  }
  if (
    typeof value.outcome !== 'string' ||
    !RECOVERY_OUTCOMES.has(value.outcome) ||
    value.evidence_kind !== RECOVERY_EVIDENCE[value.outcome] ||
    typeof value.evidence !== 'string' ||
    !/^[a-z0-9][a-z0-9_.:-]{0,239}$/.test(value.evidence) ||
    (value.reason !== null &&
      (typeof value.reason !== 'string' ||
        !/^[a-z0-9][a-z0-9_.:-]{0,199}$/.test(value.reason)))
  ) {
    return { ok: false, reason: 'recovery_outcome_malformed' };
  }
  return {
    ok: true,
    outcome: /** @type {any} */ ({
      identity: value.identity,
      attempt_id: value.attempt_id,
      outcome: value.outcome,
      evidence_kind: value.evidence_kind,
      evidence: value.evidence,
      reason: value.reason
    })
  };
}

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
 *   recoveryService?: { ensureRepoRecoveryBead: (input: { repo: string, generation: number, failure_key: Record<string, unknown> }) => Promise<{ identity: string, bead_id: string }> },
 *   dispatchRecovery?: (input: { identity: string, bead_id: string, failure_key: any }) => Promise<{ ok: boolean, attempt_id?: string, reason?: string }>,
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
   * Adopt each durable recovery window before starting its next external step.
   *
   * @param {any} deployment
   */
  async function prepareRecovery(deployment) {
    const operation = deployment.retry_operation;
    if (!deps.recoveryService || operation?.phase !== 'recovery_ready') {
      return { ok: false, reason: 'deployment_recovery_service_missing' };
    }
    let recovery = deployment.recovery;
    const identity = repoRecoveryIdentity(
      repo,
      operation.failure_key.generation,
      operation.failure_key
    );
    if (!recovery) {
      const prerecord = deps.store.prerecordDeploymentRecovery(
        workspace,
        operation.failure_key,
        { identity: identity.identity, prepared_at: now() }
      );
      if (!prerecord.ok) {
        return { ok: false, reason: 'deployment_recovery_prerecord_rejected' };
      }
      recovery = deps.store.snapshot(workspace).deployment?.recovery;
    }
    if (recovery?.identity !== identity.identity) {
      return { ok: false, reason: 'deployment_recovery_identity_mismatch' };
    }
    if (!recovery.bead_id) {
      let ensured;
      try {
        ensured = await deps.recoveryService.ensureRepoRecoveryBead({
          repo,
          generation: operation.failure_key.generation,
          failure_key: operation.failure_key
        });
      } catch {
        return { ok: false, reason: 'deployment_recovery_bead_failed' };
      }
      if (
        ensured.identity !== identity.identity ||
        ensured.bead_id !== identity.bead_id
      ) {
        return { ok: false, reason: 'deployment_recovery_identity_mismatch' };
      }
      const bound = deps.store.bindDeploymentRecoveryBead(workspace, ensured);
      if (!bound.ok) {
        return { ok: false, reason: 'deployment_recovery_bind_rejected' };
      }
      recovery = deps.store.snapshot(workspace).deployment?.recovery;
      notifyChanged(workspace);
    }
    if (!recovery?.identity || !recovery.bead_id) {
      return { ok: false, reason: 'deployment_recovery_binding_missing' };
    }
    if (recovery.attempt_id) {
      return {
        ok: true,
        reason: 'deployment_recovery_adopted',
        attempt_id: recovery.attempt_id
      };
    }
    if (typeof deps.dispatchRecovery !== 'function') {
      return { ok: true, reason: 'deployment_recovery_bound' };
    }
    let dispatched;
    try {
      dispatched = await deps.dispatchRecovery({
        identity: recovery.identity,
        bead_id: recovery.bead_id,
        failure_key: operation.failure_key
      });
    } catch {
      return { ok: false, reason: 'deployment_recovery_spawn_failed' };
    }
    if (!dispatched?.ok || typeof dispatched.attempt_id !== 'string') {
      return {
        ok: false,
        reason: dispatched?.reason || 'deployment_recovery_spawn_failed'
      };
    }
    const bound = deps.store.bindDeploymentRecoveryAttempt(workspace, {
      identity: recovery.identity,
      attempt_id: dispatched.attempt_id
    });
    if (!bound.ok) {
      return { ok: false, reason: 'deployment_recovery_attempt_bind_rejected' };
    }
    notifyChanged(workspace);
    return {
      ok: true,
      reason: 'deployment_recovery_spawned',
      attempt_id: dispatched.attempt_id
    };
  }

  /**
   * Consume a recovery session's bounded disposition. Session prose is never
   * executable: malformed or sensitive dispositions become confirmation-only.
   *
   * @param {{ identity: string, attempt_id?: string, outcome: string, evidence_kind?: string, evidence?: string, reason?: string|null, confirmation_reason?: string, pr_verified?: boolean }} input
   */
  async function consumeOutcome(input) {
    const deployment = deps.store.snapshot(workspace).deployment;
    const recovery = deployment?.recovery;
    const operation = deployment?.retry_operation;
    if (
      !recovery ||
      recovery.identity !== input?.identity ||
      !operation ||
      !isRecord(recovery.failure_key) ||
      JSON.stringify(recovery.failure_key) !==
        JSON.stringify(operation.failure_key)
    ) {
      return { ok: false, reason: 'deployment_recovery_outcome_unowned' };
    }
    if (!RECOVERY_OUTCOMES.has(input.outcome)) {
      deps.store.recordDeploymentRecoveryOutcome(workspace, {
        identity: recovery.identity,
        outcome: 'invalid',
        confirmation_reason: 'recovery_outcome_malformed'
      });
      notifyChanged(workspace);
      return { ok: false, reason: 'recovery_outcome_malformed' };
    }
    if (typeof input.attempt_id !== 'string') {
      return { ok: false, reason: 'deployment_recovery_outcome_unowned' };
    }
    const attempt = deps.store.snapshot(workspace).attempts?.[input.attempt_id];
    if (
      !attempt ||
      attempt.bead_id !== recovery.bead_id ||
      attempt.deployment_recovery_identity !== recovery.identity ||
      JSON.stringify(attempt.deployment_recovery_failure_key) !==
        JSON.stringify(recovery.failure_key)
    ) {
      return { ok: false, reason: 'deployment_recovery_outcome_unowned' };
    }
    if (
      input.evidence_kind !== RECOVERY_EVIDENCE[input.outcome] ||
      typeof input.evidence !== 'string' ||
      !/^[a-z0-9][a-z0-9_.:-]{0,239}$/.test(input.evidence)
    ) {
      deps.store.recordDeploymentRecoveryOutcome(workspace, {
        identity: recovery.identity,
        outcome: 'invalid',
        confirmation_reason: 'recovery_outcome_malformed'
      });
      notifyChanged(workspace);
      return { ok: false, reason: 'recovery_outcome_malformed' };
    }
    if (input.outcome === 'repair_pr_open' && input.pr_verified !== true) {
      return { ok: true, reason: 'repair_pr_verification_required' };
    }
    if (input.outcome !== 'retry_same') {
      const recorded = deps.store.recordDeploymentRecoveryOutcome(workspace, {
        ...input,
        confirmation_reason:
          input.outcome === 'awaiting_confirmation'
            ? input.reason || 'recovery_confirmation_required'
            : undefined
      });
      if (!recorded.ok) {
        return { ok: false, reason: 'deployment_recovery_outcome_rejected' };
      }
      notifyChanged(workspace);
      return { ok: true, reason: input.outcome };
    }
    const current_binding = {
      target_base: operation.failure_key.target_base,
      target_sha: operation.failure_key.target_sha,
      generation: operation.failure_key.generation
    };
    if (recovery.retry_operation) {
      return adoptRecoveryRetryOperation(deployment);
    }
    let status;
    try {
      status = await deps.deploymentJob.deploymentStatus({ repo });
    } catch {
      return { ok: false, reason: 'deployment_recovery_status_failed' };
    }
    if (
      status?.state !== 'failed' ||
      !matchesBinding(status, current_binding)
    ) {
      deps.store.recordDeploymentRecoveryOutcome(workspace, {
        identity: recovery.identity,
        outcome: 'awaiting_confirmation',
        confirmation_reason: 'retry_same_status_mismatch'
      });
      notifyChanged(workspace);
      return { ok: false, reason: 'retry_same_status_mismatch' };
    }
    const prerecord = deps.store.prerecordDeploymentRecoveryRetry(workspace, {
      identity: recovery.identity,
      attempt_id: input.attempt_id,
      evidence: input.evidence,
      called_at: now()
    });
    if (!prerecord.ok) {
      return {
        ok: false,
        reason: 'deployment_recovery_retry_prerecord_rejected'
      };
    }
    notifyChanged(workspace);
    let binding;
    try {
      binding = await deps.deploymentJob.retryDeployment({
        repo,
        current_binding
      });
    } catch {
      return { ok: false, reason: 'deployment_recovery_retry_effect_failed' };
    }
    if (
      !matchesBinding(binding, {
        ...current_binding,
        generation: current_binding.generation + 1
      })
    ) {
      deps.store.requireDeploymentRecoveryConfirmation(
        workspace,
        operation.failure_key,
        'retry_same_binding_mismatch',
        recovery.identity
      );
      notifyChanged(workspace);
      return { ok: false, reason: 'retry_same_binding_mismatch' };
    }
    const returned = deps.store.recordDeploymentRecoveryRetryReturned(
      workspace,
      { identity: recovery.identity, retry_binding: binding }
    );
    if (!returned.ok) {
      return { ok: false, reason: 'retry_same_return_rejected' };
    }
    try {
      const observed = await deps.deploymentJob.deploymentStatus({
        repo,
        current_binding: binding
      });
      if (!matchesBinding(observed, binding)) {
        throw new Error('retry_same_readback_mismatch');
      }
      const recorded = deps.store.settleDeploymentRecoveryRetry(workspace, {
        identity: recovery.identity,
        status: observed
      });
      if (!recorded.ok) {
        return { ok: false, reason: 'retry_same_observation_rejected' };
      }
    } catch {
      return { ok: false, reason: 'retry_same_readback_failed' };
    }
    notifyChanged(workspace);
    return { ok: true, reason: 'retry_same_requested' };
  }

  /**
   * Settle a prerecord whose provider call returned before the coordinator did.
   * A still-current failed generation is ambiguous: never repeat the effect.
   *
   * @param {any} deployment
   */
  async function adoptRecoveryRetryOperation(deployment) {
    const recovery = deployment.recovery;
    const recovery_retry = recovery?.retry_operation;
    if (!recovery || !recovery_retry) {
      return { ok: false, reason: 'retry_same_operation_missing' };
    }
    let observed;
    try {
      observed = await deps.deploymentJob.deploymentStatus({
        repo,
        current_binding: recovery_retry.retry_binding
      });
    } catch {
      return { ok: false, reason: 'retry_same_readback_failed' };
    }
    if (recovery_retry.phase === 'calling') {
      const expected = {
        target_base: recovery.failure_key.target_base,
        target_sha: recovery.failure_key.target_sha,
        generation: recovery.failure_key.generation + 1
      };
      if (!matchesBinding(observed, expected)) {
        deps.store.requireDeploymentRecoveryConfirmation(
          workspace,
          recovery.failure_key,
          'retry_same_call_ambiguous',
          recovery.identity
        );
        notifyChanged(workspace);
        return { ok: false, reason: 'retry_same_call_ambiguous' };
      }
      const returned = deps.store.recordDeploymentRecoveryRetryReturned(
        workspace,
        { identity: recovery.identity, retry_binding: expected }
      );
      if (!returned.ok) {
        return { ok: false, reason: 'retry_same_return_rejected' };
      }
    }
    const settled = deps.store.settleDeploymentRecoveryRetry(workspace, {
      identity: recovery.identity,
      status: observed
    });
    if (!settled.ok) {
      return { ok: false, reason: 'retry_same_readback_mismatch' };
    }
    notifyChanged(workspace);
    return { ok: true, reason: 'retry_same_adopted' };
  }

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
    if (
      deployment?.recovery?.phase === 'completed' &&
      deployment.recovery.outcome === 'retry_same' &&
      deployment.generation ===
        deployment.recovery.failure_key.generation + 1 &&
      deployment.target_base === deployment.recovery.failure_key.target_base &&
      deployment.target_sha === deployment.recovery.failure_key.target_sha
    ) {
      deps.store.recordDeploymentRecoveryOutcome(workspace, {
        identity: deployment.recovery.identity,
        outcome: 'awaiting_confirmation',
        confirmation_reason: 'recovery_retry_failed'
      });
      notifyChanged(workspace);
      return { ok: false, reason: 'recovery_retry_failed' };
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
      deps.store.requireDeploymentRecoveryConfirmation(
        workspace,
        operation.failure_key,
        'deployment_retry_call_ambiguous',
        repoRecoveryIdentity(
          repo,
          operation.failure_key.generation,
          operation.failure_key
        ).identity
      );
      notifyChanged(workspace);
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
    if (!deployment) {
      return { ok: true, reason: 'idle' };
    }
    if (deployment.recovery?.retry_operation) {
      return adoptRecoveryRetryOperation(deployment);
    }
    if (!operation) {
      return { ok: true, reason: 'idle' };
    }
    if (
      operation.phase === 'recovery_ready' ||
      operation.phase === 'superseded'
    ) {
      return operation.phase === 'recovery_ready'
        ? prepareRecovery(deployment)
        : { ok: true, reason: operation.phase };
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
      deps.store.requireDeploymentRecoveryConfirmation(
        workspace,
        operation.failure_key,
        'deployment_retry_binding_mismatch',
        repoRecoveryIdentity(
          repo,
          operation.failure_key.generation,
          operation.failure_key
        ).identity
      );
      notifyChanged(workspace);
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

  return { observe, poll, tick, consumeOutcome };
}
