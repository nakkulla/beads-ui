/**
 * The versioned one-shot legacy state migration (master spec §11).
 *
 * It converts, exactly once per workspace, the legacy cleanup/deploy failure
 * records into the state the RepoOperation lane owns, so nothing after it has
 * to dual-read the retired provider journals. It classifies and converts
 * DURABLE STATE; it never creates operations itself. Operation creation stays
 * with the coordinator through the cleanup lane resume that runs on the same
 * boot, immediately after this migration — one owner, one identity.
 *
 * Three rules shape everything here:
 *
 *   1. The canonical subject SHA is the observed merge SHA first and the
 *      current head SHA only as a fallback, and it must be contained in the
 *      freshly fetched `origin/<base>` tip. A row that cannot prove that is
 *      NOT converted (this is the reverted `UI-qero` stale-subject bug).
 *   2. The retired provider status is read at most ONCE per migration, and
 *      only an EXACT terminal success (same base, target == deployed, and the
 *      subject contained in the deployed SHA) is adopted as terminal evidence.
 *   3. Ambiguity is never turned into a success: the legacy record is left
 *      exactly where it is with `legacy_manual` evidence for a human.
 *
 * The legacy failure never consumes the automatic repair budget — this module
 * writes no `repair` field at all.
 */
import { debug } from '../logging.js';

const log = debug('worker:repo-operation-migration');

/** Schema version of the one-shot `repo_operation_migration_v1`. */
export const REPO_OPERATION_MIGRATION_VERSION = 1;

/** Every disposition this migration may record (master spec §11 rules 2-6). */
export const REPO_OPERATION_MIGRATION_DISPOSITIONS = [
  'remote_materialization',
  'verify_operation',
  'verify_retired',
  'adopted_legacy_deploy',
  'new_deploy_operation',
  'closure_resumed',
  'legacy_manual'
];

const LEGACY_OPERATION_STEPS = new Set([
  'base_sync',
  'post_merge_verify',
  'deployment_request',
  'deploy'
]);

const LEGACY_CLOSURE_STEPS = new Set([
  'child_sweep',
  'branch_cleanup',
  'parent_close'
]);

const FETCH_TIMEOUT_MS = 60_000;

/**
 * @param {unknown} value
 */
function isSha(value) {
  return typeof value === 'string' && /^[0-9a-f]{40}$/i.test(value);
}

/**
 * @param {{ workspace: string, repo: string, store: ReturnType<typeof import('./queue-store.js').createQueueStore>, gitRun: (args: string[], options: { cwd?: string, timeout_ms?: number }) => Promise<{ code: number, stdout: string, stderr: string }>, cleanupFacts: (bead_id: string) => Promise<{ base: string|null, base_reason: string|null, merge_sha: string|null, head_sha: string|null, head_ref: string|null, pr_url: string|null }>, repoOperations?: { hasConfig: (sha: string) => Promise<any> }|null, deploymentJob?: { deploymentStatus: (input: { repo: string }) => Promise<any> }|null, resumeClosure?: ((bead_id: string) => Promise<any>)|null, now?: () => number }} deps
 */
export function createRepoOperationMigration(deps) {
  const now = deps.now || (() => Date.now());
  /** @type {Map<string, string|null>} */
  const remote_tips = new Map();
  /** @type {{ read: boolean, status: any, code: string|null }} */
  const provider = { read: false, status: null, code: null };

  /**
   * Master spec §6.1: one bounded fetch per target base, then the pinned tip.
   * A fetch that fails is not fatal by itself — the containment proof below is
   * what decides, and it fails closed.
   *
   * @param {string} target_base
   */
  async function remoteTip(target_base) {
    const cached = remote_tips.get(target_base);
    if (cached !== undefined) {
      return cached;
    }
    try {
      await deps.gitRun(['fetch', '--no-tags', 'origin', target_base], {
        cwd: deps.repo,
        timeout_ms: FETCH_TIMEOUT_MS
      });
    } catch (err) {
      log('legacy migration fetch failed for %s: %o', target_base, err);
    }
    let tip = null;
    try {
      const resolved = await deps.gitRun(
        ['rev-parse', `refs/remotes/origin/${target_base}`],
        { cwd: deps.repo }
      );
      const value = resolved.stdout.trim();
      tip = resolved.code === 0 && isSha(value) ? value.toLowerCase() : null;
    } catch (err) {
      log('legacy migration tip read failed for %s: %o', target_base, err);
    }
    remote_tips.set(target_base, tip);
    return tip;
  }

  /**
   * @param {string} sha
   * @param {string} descendant_sha
   */
  async function contains(sha, descendant_sha) {
    try {
      const result = await deps.gitRun(
        ['merge-base', '--is-ancestor', sha, descendant_sha],
        { cwd: deps.repo }
      );
      return result.code === 0;
    } catch {
      return false;
    }
  }

  /**
   * Master spec §11 rule 4: the retired provider is asked for its status at
   * most once per migration, whatever the number of legacy rows.
   */
  async function legacyProviderStatus() {
    if (provider.read) {
      return provider;
    }
    provider.read = true;
    if (!deps.deploymentJob) {
      return provider;
    }
    try {
      provider.status = await deps.deploymentJob.deploymentStatus({
        repo: deps.repo
      });
    } catch (err) {
      const code = /** @type {{ code?: unknown }} */ (err).code;
      provider.code =
        typeof code === 'string' ? code : 'deployment_status_failed';
    }
    return provider;
  }

  /**
   * @param {string} bead_id
   * @param {{ step: string, reason: string }} failure
   * @param {string} disposition
   * @param {{ subject_sha?: string|null, subject_source?: 'merge_sha'|'head_sha'|null, target_base?: string|null, reason?: string|null, evidence?: Record<string, unknown>|null }} fields
   */
  function result(bead_id, failure, disposition, fields) {
    return {
      bead_id,
      from_step: failure.step,
      from_reason: failure.reason,
      subject_sha: fields.subject_sha ?? null,
      subject_source: fields.subject_source ?? null,
      target_base: fields.target_base ?? null,
      disposition,
      reason: fields.reason ?? null,
      evidence: fields.evidence ?? null,
      at: now()
    };
  }

  /**
   * Classify ONE legacy record. Reads only — every durable effect is applied
   * by {@link run} in a single write.
   *
   * @param {any} queue
   * @param {string} bead_id
   * @param {{ step: string, reason: string }} failure
   */
  async function planOne(queue, bead_id, failure) {
    const row =
      queue.pr_wait.find(
        (/** @type {any} */ entry) => entry.bead_id === bead_id
      ) || null;
    if (!row) {
      return {
        result: result(bead_id, failure, 'legacy_manual', {
          reason: 'row_not_in_pr_wait'
        }),
        row: null
      };
    }
    const facts = await deps.cleanupFacts(bead_id);
    if (typeof facts.base !== 'string' || facts.base.length === 0) {
      return {
        result: result(bead_id, failure, 'legacy_manual', {
          reason: facts.base_reason || 'target_base_unresolved'
        }),
        row: null
      };
    }
    const target_base = facts.base;
    /** @type {'merge_sha'|'head_sha'|null} */
    const subject_source = isSha(facts.merge_sha)
      ? 'merge_sha'
      : isSha(facts.head_sha)
        ? 'head_sha'
        : null;
    if (subject_source === null) {
      return {
        result: result(bead_id, failure, 'legacy_manual', {
          target_base,
          reason: 'subject_missing'
        }),
        row: null
      };
    }
    const subject_sha = String(
      subject_source === 'merge_sha' ? facts.merge_sha : facts.head_sha
    ).toLowerCase();
    const tip = await remoteTip(target_base);
    if (tip === null) {
      return {
        result: result(bead_id, failure, 'legacy_manual', {
          subject_sha,
          subject_source,
          target_base,
          reason: 'remote_base_unresolved'
        }),
        row: null
      };
    }
    if (!(await contains(subject_sha, tip))) {
      return {
        result: result(bead_id, failure, 'legacy_manual', {
          subject_sha,
          subject_source,
          target_base,
          reason: 'subject_not_contained'
        }),
        row: null
      };
    }
    const converted = {
      bead_id,
      merge_sha: subject_sha,
      head_ref: facts.head_ref,
      pr_url: facts.pr_url
    };
    if (LEGACY_CLOSURE_STEPS.has(failure.step)) {
      return {
        result: result(bead_id, failure, 'closure_resumed', {
          subject_sha,
          subject_source,
          target_base
        }),
        row: converted
      };
    }
    // The handoff seed: the lane resume that runs right after this migration
    // only picks up rows whose cursor already entered the coordinator lane.
    const handoff = { ...converted, cursor: 'base_containment' };
    if (failure.step === 'base_sync') {
      return {
        result: result(bead_id, failure, 'remote_materialization', {
          subject_sha,
          subject_source,
          target_base
        }),
        row: handoff
      };
    }
    if (failure.step === 'post_merge_verify') {
      return await planVerify(bead_id, failure, {
        subject_sha,
        subject_source,
        target_base,
        tip,
        row: handoff
      });
    }
    return await planDeploy(bead_id, failure, {
      subject_sha,
      subject_source,
      target_base,
      row: handoff
    });
  }

  /**
   * Master spec §11 rule 3: a declared `[verify]` in the effective new config
   * becomes a verify operation; an absent one retires the legacy failure.
   *
   * @param {string} bead_id
   * @param {{ step: string, reason: string }} failure
   * @param {{ subject_sha: string, subject_source: 'merge_sha'|'head_sha', target_base: string, tip: string, row: any }} input
   */
  async function planVerify(bead_id, failure, input) {
    const fields = {
      subject_sha: input.subject_sha,
      subject_source: input.subject_source,
      target_base: input.target_base
    };
    if (!deps.repoOperations) {
      return {
        result: result(bead_id, failure, 'verify_retired', fields),
        row: input.row
      };
    }
    const config = await deps.repoOperations.hasConfig(input.tip);
    if (!config.ok) {
      return {
        result: result(bead_id, failure, 'legacy_manual', {
          ...fields,
          reason: config.code || 'repo_ops_config_invalid'
        }),
        row: null
      };
    }
    return {
      result: result(
        bead_id,
        failure,
        config.present && typeof config.verify_script_path === 'string'
          ? 'verify_operation'
          : 'verify_retired',
        fields
      ),
      row: input.row
    };
  }

  /**
   * Master spec §11 rule 4: adopt an exact terminal success as migrated
   * evidence, and otherwise hand the subject to a new deploy operation built
   * on the fetched `origin/<base>` tip.
   *
   * @param {string} bead_id
   * @param {{ step: string, reason: string }} failure
   * @param {{ subject_sha: string, subject_source: 'merge_sha'|'head_sha', target_base: string, row: any }} input
   */
  async function planDeploy(bead_id, failure, input) {
    const fields = {
      subject_sha: input.subject_sha,
      subject_source: input.subject_source,
      target_base: input.target_base
    };
    const observed = await legacyProviderStatus();
    if (observed.code !== null) {
      // The provider answered with an error: whether it ever deployed this
      // subject is unknowable, which is exactly rule 6's ambiguity.
      return {
        result: result(bead_id, failure, 'legacy_manual', {
          ...fields,
          reason: 'legacy_status_unreadable',
          evidence: { source: 'legacy_provider', error_code: observed.code }
        }),
        row: null
      };
    }
    const status = observed.status;
    const evidence = status
      ? {
          source: 'legacy_provider',
          state: status.state,
          target_base: status.target_base,
          target_sha: status.target_sha,
          deployed_sha: status.deployed_sha,
          generation: status.generation
        }
      : null;
    const exact =
      status !== null &&
      status.state === 'succeeded' &&
      status.target_base === input.target_base &&
      isSha(status.target_sha) &&
      isSha(status.deployed_sha) &&
      String(status.deployed_sha).toLowerCase() ===
        String(status.target_sha).toLowerCase() &&
      (await contains(
        input.subject_sha,
        String(status.deployed_sha).toLowerCase()
      ));
    if (exact) {
      return {
        result: result(bead_id, failure, 'adopted_legacy_deploy', {
          ...fields,
          evidence
        }),
        row: { ...input.row, cursor: null }
      };
    }
    return {
      result: result(bead_id, failure, 'new_deploy_operation', {
        ...fields,
        evidence
      }),
      row: input.row
    };
  }

  /**
   * Run the migration once. A workspace already stamped at this version adopts
   * its stored result: no provider read, no second conversion.
   *
   * @returns {Promise<{ ok: boolean, adopted: boolean, version: number, results: Record<string, any>, code: string|null }>}
   */
  async function run() {
    const queue = deps.store.snapshot(deps.workspace);
    const stamped = queue.repo_operation_migration;
    if (stamped && stamped.version >= REPO_OPERATION_MIGRATION_VERSION) {
      return {
        ok: true,
        adopted: true,
        version: stamped.version,
        results: stamped.results,
        code: null
      };
    }
    if (typeof deps.cleanupFacts !== 'function') {
      return {
        ok: false,
        adopted: false,
        version: REPO_OPERATION_MIGRATION_VERSION,
        results: {},
        code: 'migration_facts_unavailable'
      };
    }
    const legacy = Object.entries(queue.cleanup_failed)
      .filter(
        ([, failure]) =>
          LEGACY_OPERATION_STEPS.has(
            /** @type {{ step: string }} */ (failure).step
          ) ||
          LEGACY_CLOSURE_STEPS.has(
            /** @type {{ step: string }} */ (failure).step
          )
      )
      .sort(([left], [right]) => left.localeCompare(right));
    /** @type {Record<string, any>} */
    const results = {};
    /** @type {any[]} */
    const rows = [];
    /** @type {string[]} */
    const retire = [];
    for (const [bead_id, failure] of legacy) {
      const planned = await planOne(
        queue,
        bead_id,
        /** @type {{ step: string, reason: string }} */ (failure)
      );
      results[bead_id] = planned.result;
      if (planned.row) {
        rows.push(planned.row);
        retire.push(bead_id);
      }
    }
    const recorded = deps.store.recordRepoOperationMigration(deps.workspace, {
      version: REPO_OPERATION_MIGRATION_VERSION,
      at: now(),
      results,
      retire,
      rows
    });
    if (!recorded.ok) {
      return {
        ok: false,
        adopted: false,
        version: REPO_OPERATION_MIGRATION_VERSION,
        results,
        code: 'repo_operation_migration_persist_failed'
      };
    }
    for (const [bead_id, entry] of Object.entries(results)) {
      if (
        entry.disposition !== 'closure_resumed' &&
        entry.disposition !== 'adopted_legacy_deploy'
      ) {
        continue;
      }
      if (typeof deps.resumeClosure !== 'function') {
        continue;
      }
      try {
        await deps.resumeClosure(bead_id);
      } catch (err) {
        // One row's closure never blocks the rest of the migration: the lane
        // records its own failure and the row stays in `pr_wait`.
        log('migrated closure resume failed for %s: %o', bead_id, err);
      }
    }
    return {
      ok: true,
      adopted: false,
      version: REPO_OPERATION_MIGRATION_VERSION,
      results,
      code: null
    };
  }

  return { run };
}
