/**
 * Ownership probes and deterministic repair-Bead lineage for completion intents.
 * External effects stay behind injected adapters so the coordinator can
 * prerecord them before calling this module.
 */
import { createHash } from 'node:crypto';

const REPAIR_SUFFIX_LENGTH = 8;

/**
 * Stable source-less recovery identity. Unlike completion repair this is not a
 * child of a user Bead: the exact provider failure owns it.
 *
 * @param {string} repo
 * @param {number} generation
 * @param {Record<string, unknown>} failure_key
 */
export function repoRecoveryIdentity(repo, generation, failure_key) {
  if (
    typeof repo !== 'string' ||
    repo.length === 0 ||
    !Number.isInteger(generation) ||
    generation <= 0 ||
    !failure_key ||
    typeof failure_key !== 'object'
  ) {
    throw new Error('repo_recovery_identity_invalid');
  }
  const canonical = JSON.stringify(
    Object.keys(failure_key)
      .sort()
      .map((key) => [key, failure_key[key]])
  );
  const digest = createHash('sha256')
    .update(`${repo}\u0000${generation}\u0000${canonical}`)
    .digest('hex');
  return { identity: digest, bead_id: `recovery-${digest.slice(0, 12)}` };
}

/**
 * @param {Record<string, any>} issue
 * @param {{ bead_id: string, title: string, marker: string }} expected
 */
function matchesRepoRecoveryIssue(issue, expected) {
  const description =
    typeof issue.description === 'string' ? issue.description : '';
  return (
    issue.id === expected.bead_id &&
    issue.title === expected.title &&
    issue.issue_type === 'bug' &&
    issue.priority === 1 &&
    description.includes(expected.marker) &&
    description.includes('provenance: no-source')
  );
}

/**
 * @param {string} root_bead_id
 * @param {string} op_id
 */
export function repairBeadIdentity(root_bead_id, op_id) {
  if (typeof op_id !== 'string' || op_id.length === 0) {
    throw new Error('completion_operation_id_invalid');
  }
  const digest = createHash('sha256').update(op_id).digest('hex');
  const bead_id = `${root_bead_id}-r${digest.slice(0, REPAIR_SUFFIX_LENGTH)}`;
  return { bead_id, branch: bead_id };
}

/**
 * @param {string} root_bead_id
 * @param {string} op_id
 * @param {{ stage: string, reason: string, result_digest: string }} failure_key
 */
function failureMarker(root_bead_id, op_id, failure_key) {
  return [
    `출처: ${root_bead_id}`,
    `completion_op=${op_id}`,
    `completion_failure=${failure_key.stage}/${failure_key.reason}/${failure_key.result_digest}`
  ].join('\n');
}

/**
 * @param {Record<string, any>} issue
 * @param {{ root_bead_id: string, marker: string, title: string }} expected
 */
function matchesIdentity(issue, expected) {
  const description =
    typeof issue.description === 'string' ? issue.description : '';
  const notes = typeof issue.notes === 'string' ? issue.notes : '';
  const dependencies = Array.isArray(issue.dependencies)
    ? issue.dependencies
    : [];
  return (
    issue.title === expected.title &&
    issue.issue_type === 'bug' &&
    issue.priority === 1 &&
    `${description}\n${notes}`.includes(expected.marker) &&
    dependencies.some(
      (dependency) =>
        dependency &&
        typeof dependency === 'object' &&
        dependency.depends_on_id === expected.root_bead_id &&
        dependency.type === 'discovered-from'
    )
  );
}

/**
 * @param {{
 *   bd: {
 *     findIssue?: (bead_id: string) => Promise<Record<string, any>|null>,
 *     createIssue?: (input: { id: string, title: string, description: string, type: string, priority: number, dependency?: string }) => Promise<void>
 *   },
 *   repo: string,
 *   resolveVerify?: (pin: { sha: string }) => Promise<any>,
 *   runVerify?: (input: any) => Promise<any>
 * }} deps
 */
export function createCompletionRepairService(deps) {
  return {
    /**
     * Create or adopt the one recovery Bead for one exact repo failure. The
     * mandatory readback makes a crash after `bd create` safe to replay.
     *
     * @param {{ repo: string, generation: number, failure_key: Record<string, unknown> }} input
     */
    async ensureRepoRecoveryBead(input) {
      const identity = repoRecoveryIdentity(
        input.repo,
        input.generation,
        input.failure_key
      );
      const title = `${input.repo} 배포 실패 자동복구`;
      const marker = `repo-deployment:${input.repo}@generation:${input.generation}`;
      const findIssue = deps.bd.findIssue;
      const createIssue = deps.bd.createIssue;
      if (
        typeof findIssue !== 'function' ||
        typeof createIssue !== 'function'
      ) {
        throw new Error('repo_recovery_bead_adapter_missing');
      }
      const existing = await findIssue(identity.bead_id);
      if (existing) {
        if (
          !matchesRepoRecoveryIssue(existing, { ...identity, title, marker })
        ) {
          throw new Error('repo_recovery_bead_identity_conflict');
        }
        return { ...identity, created: false };
      }
      let created = true;
      try {
        await createIssue({
          id: identity.bead_id,
          title,
          description: [
            marker,
            'provenance: no-source',
            `recovery_identity=${identity.identity}`
          ].join('\n'),
          type: 'bug',
          priority: 1
        });
      } catch {
        created = false;
      }
      const confirmed = await findIssue(identity.bead_id);
      if (
        !confirmed ||
        !matchesRepoRecoveryIssue(confirmed, { ...identity, title, marker })
      ) {
        throw new Error(
          confirmed
            ? 'repo_recovery_bead_identity_conflict'
            : 'repo_recovery_bead_readback_failed'
        );
      }
      return { ...identity, created };
    },

    /**
     * Idempotently create or adopt the child whose id is derived from the
     * root failure. A concurrent creator and a crash after `bd create` both
     * converge through the same confirming readback.
     *
     * @param {{ root_bead_id: string, op_id: string, failure_key: any }} input
     */
    async ensureLinkedBead(input) {
      const { root_bead_id, op_id, failure_key } = input;
      const identity = repairBeadIdentity(root_bead_id, op_id);
      const marker = failureMarker(root_bead_id, op_id, failure_key);
      const title = `${root_bead_id} 자동머지 실패 복구`;
      const expected = { root_bead_id, marker, title };
      const findIssue = deps.bd.findIssue;
      const createIssue = deps.bd.createIssue;
      if (
        typeof findIssue !== 'function' ||
        typeof createIssue !== 'function'
      ) {
        throw new Error('repair_bead_adapter_missing');
      }
      const existing = await findIssue(identity.bead_id);
      if (existing) {
        if (!matchesIdentity(existing, expected)) {
          throw new Error('repair_bead_identity_conflict');
        }
        return { ...identity, created: false };
      }

      let created = true;
      try {
        await createIssue({
          id: identity.bead_id,
          title,
          description: [
            `${root_bead_id}의 자동머지 완료 의도에서 관측된 실패를 복구한다.`,
            '',
            marker
          ].join('\n'),
          type: 'bug',
          priority: 1,
          dependency: `discovered-from:${root_bead_id}`
        });
      } catch {
        created = false;
      }
      const confirmed = await findIssue(identity.bead_id);
      if (!confirmed || !matchesIdentity(confirmed, expected)) {
        throw new Error(
          confirmed
            ? 'repair_bead_identity_conflict'
            : 'repair_bead_readback_failed'
        );
      }
      return { ...identity, created };
    },

    /**
     * Re-run the same signal at the pinned target-base SHA. Green base means
     * the red belongs to the PR; matching red base means the base owns it.
     * Missing, pending, timeout, spawn, auth, or config evidence is never
     * guessed.
     *
     * @param {{ root_bead_id: string, source: 'verify', failure_key: any }} input
     */
    async probeOwnership(input) {
      const { root_bead_id, source, failure_key } = input;
      if (
        source !== 'verify' ||
        typeof deps.resolveVerify !== 'function' ||
        typeof deps.runVerify !== 'function'
      ) {
        return { state: 'undecidable', reason: 'verify_probe_unavailable' };
      }
      let resolved;
      try {
        resolved = await deps.resolveVerify({ sha: failure_key.base_sha });
      } catch {
        return { state: 'undecidable', reason: 'verify_config_unreadable' };
      }
      if (resolved?.state !== 'resolved') {
        return {
          state: 'undecidable',
          reason: `verify_config_${resolved?.state || 'unreadable'}`
        };
      }
      let result;
      try {
        result = await deps.runVerify({
          repo: deps.repo,
          bead_id: root_bead_id,
          sha: failure_key.base_sha,
          cmd: resolved.value.cmd,
          timeout_ms: resolved.value.timeout_ms,
          retry_flaky: false
        });
      } catch {
        return { state: 'undecidable', reason: 'verify_cmd_spawn_error' };
      }
      if (result.ok === true) {
        return { state: 'pr_owned' };
      }
      if (result.reason !== 'verify_cmd_failed') {
        return {
          state: 'undecidable',
          reason: result.reason || 'verify_probe_failed'
        };
      }
      const evidence = {
        output_tail:
          typeof result.output_tail === 'string'
            ? result.output_tail.slice(-4000)
            : undefined,
        log_path:
          typeof result.log_path === 'string' ? result.log_path : undefined
      };
      return { state: 'base_owned', evidence };
    }
  };
}
