/**
 * The pinned runtime copy of the dotfiles-owned RepoOperation policy artifact
 * (master spec §4.5 / §9.1 / §10, reduced to `script_retry` by UI-s582 §5).
 *
 * beads-ui is a CONSUMER of that contract, never its author: every list this
 * module hands out — what the Worker does automatically, the resolution ladder,
 * what is never automatic — is read from
 * `generated/contracts/repo-operation-policy.json`, an exact byte copy of the
 * dotfiles artifact recorded in the sibling provenance file. Nothing here
 * restates a policy sentence, so a contract change lands as a re-pin plus a
 * failing digest test rather than as edited runtime code.
 */
import nodeCrypto from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTRACTS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'generated',
  'contracts'
);

export const REPO_OPERATION_POLICY_PATH = path.join(
  CONTRACTS_DIR,
  'repo-operation-policy.json'
);

export const REPO_OPERATION_POLICY_PROVENANCE_PATH = path.join(
  CONTRACTS_DIR,
  'repo-operation-policy.provenance.json'
);

/**
 * @typedef {Object} RepoOperationPolicyProvenance
 * @property {string} source_repo
 * @property {string} source_path
 * @property {string} source_commit
 * @property {string} source_blob_sha
 * @property {string} sha256
 * @property {number} bytes
 */

/**
 * @typedef {Object} RepoOperationPolicy
 * @property {number} schema_version
 * @property {string[]} worker_automatic
 * @property {Record<string, unknown>[]} resolution_ladder
 * @property {string} after_ladder
 * @property {Record<string, any>|null} [after_ladder_recovery]
 * @property {string} manual_human_fix
 * @property {string[]} never_automatic
 */

/** @type {{ policy: Record<string, any>, provenance: Record<string, any>, digest: string, supported: boolean }|null} */
let cached = null;

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/** @param {unknown} value */
function stringList(value) {
  return (
    Array.isArray(value) && value.length > 0 && value.every(nonEmptyString)
  );
}

/** @param {unknown} policy */
function validPolicy(policy) {
  if (!isRecord(policy)) {
    return false;
  }
  const recovery = policy.after_ladder_recovery;
  return (
    stringList(policy.worker_automatic) &&
    stringList(policy.never_automatic) &&
    nonEmptyString(policy.after_ladder) &&
    nonEmptyString(policy.manual_human_fix) &&
    Array.isArray(policy.resolution_ladder) &&
    policy.resolution_ladder.length > 0 &&
    policy.resolution_ladder.every(
      (entry) =>
        isRecord(entry) &&
        nonEmptyString(entry.id) &&
        nonEmptyString(entry.trigger) &&
        stringList(entry.consumption_key) &&
        Number.isInteger(entry.attempts_per_operation_attempt) &&
        entry.attempts_per_operation_attempt > 0
    ) &&
    isRecord(recovery) &&
    recovery.consumer_schema_required === 4 &&
    isRecord(recovery.diagnosis) &&
    stringList(recovery.diagnosis.requires) &&
    isRecord(recovery.code_defect_handoff) &&
    nonEmptyString(recovery.code_defect_handoff.requires) &&
    stringList(recovery.code_defect_handoff.procedure) &&
    stringList(recovery.code_defect_handoff.reservation_key) &&
    stringList(recovery.no_speculative_bead)
  );
}

/**
 * @param {unknown} provenance
 * @param {Buffer} bytes
 * @param {string} digest
 */
function provenanceMatches(provenance, bytes, digest) {
  const blob = nodeCrypto
    .createHash('sha1')
    .update(Buffer.from(`blob ${bytes.length}\0`, 'utf8'))
    .update(bytes)
    .digest('hex');
  return (
    isRecord(provenance) &&
    nonEmptyString(provenance.source_repo) &&
    nonEmptyString(provenance.source_path) &&
    nonEmptyString(provenance.source_commit) &&
    provenance.bytes === bytes.length &&
    provenance.sha256 === digest &&
    provenance.source_blob_sha === blob
  );
}

/**
 * Read and cache the pinned artifact with its provenance. The digest is
 * computed over the exact bytes on disk, which is what the contract test
 * compares against the approved dotfiles artifact.
 *
 * @param {{ fs?: typeof import('node:fs') }} [deps]
 */
export function loadRepoOperationPolicy(deps = {}) {
  const fs = deps.fs || nodeFs;
  if (cached && !deps.fs) {
    return cached;
  }
  /** @type {NonNullable<typeof cached>} */
  let loaded;
  try {
    const bytes = fs.readFileSync(REPO_OPERATION_POLICY_PATH);
    const digest = nodeCrypto.createHash('sha256').update(bytes).digest('hex');
    const policy = JSON.parse(bytes.toString('utf8'));
    const provenance = JSON.parse(
      fs.readFileSync(REPO_OPERATION_POLICY_PROVENANCE_PATH, 'utf8')
    );
    loaded = {
      policy: isRecord(policy) ? policy : {},
      provenance: isRecord(provenance) ? provenance : {},
      digest,
      supported:
        isRecord(policy) &&
        policy.schema_version === 4 &&
        validPolicy(policy) &&
        provenanceMatches(provenance, bytes, digest)
    };
  } catch {
    loaded = { policy: {}, provenance: {}, digest: '', supported: false };
  }
  if (!deps.fs) {
    cached = loaded;
  }
  return loaded;
}

/**
 * Whether the pinned artifact has the one schema this consumer understands.
 * Unknown schemas stop only the automatic ladder step; callers keep operation
 * execution alive and preserve the raw failure for recovery judgment.
 */
export function repoOperationPolicySupported() {
  return loadRepoOperationPolicy().supported;
}

/**
 * Classify one settled failure for display. Unknown codes remain verbatim so a
 * new runner failure never falls into a hidden catch-all class.
 *
 * @param {{ kind: string, failure: { code: string, interrupted?: boolean }|null }} operation
 * @returns {string}
 */
export function classifyRepoOperationFailure(operation) {
  const failure = operation.failure;
  if (!failure || typeof failure.code !== 'string') {
    return '';
  }
  if (failure.interrupted === true) {
    return 'interrupted_without_terminal_exit';
  }
  if (failure.code !== 'script_failed' && failure.code !== 'timeout') {
    return failure.code;
  }
  if (operation.kind === 'verify') {
    return 'verify_script_failure';
  }
  // A post-merge job is its own lane (UI-i60a): without this it would classify
  // as `deploy_script_failure` and every surface would call it 배포 실패.
  if (operation.kind === 'job') {
    return 'job_script_failure';
  }
  return 'deploy_script_failure';
}

/**
 * The projection the protocol carries to the UI: the §10 lists verbatim from
 * the pinned artifact plus the provenance that proves which artifact they came
 * from. The client renders these tokens; it never decides membership.
 */
export function projectRepoOperationPolicy() {
  const { policy, provenance, digest, supported } = loadRepoOperationPolicy();
  /** @type {Record<string, unknown>[]} */
  const ladder = Array.isArray(policy.resolution_ladder)
    ? policy.resolution_ladder
    : [];
  return {
    schema_version: policy.schema_version,
    supported,
    source_commit: provenance.source_commit,
    digest,
    worker_automatic: Array.isArray(policy.worker_automatic)
      ? [...policy.worker_automatic]
      : [],
    resolution_ladder: ladder.map(
      (entry) =>
        /** @type {Record<string, unknown>} */ ({
          ...entry,
          ...(Array.isArray(entry.consumption_key)
            ? { consumption_key: [...entry.consumption_key] }
            : {})
        })
    ),
    after_ladder: policy.after_ladder || '',
    after_ladder_recovery: policy.after_ladder_recovery
      ? structuredClone(policy.after_ladder_recovery)
      : null,
    manual_human_fix: policy.manual_human_fix || '',
    never_automatic: Array.isArray(policy.never_automatic)
      ? [...policy.never_automatic]
      : []
  };
}
