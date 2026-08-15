/**
 * The pinned runtime copy of the dotfiles-owned RepoOperation policy artifact
 * (master spec §4.5 / §9.1 / §10).
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
 * @property {{ default: boolean, scope: string, resolution_subject: string, resolution_ladder: Record<string, unknown>[], manual_human_fix: string }} auto_repair
 * @property {Record<string, string>} completion_chain
 * @property {string[]} repair_session_packet
 * @property {string} resolution_entry_surface
 * @property {string[]} never_automatic
 */

/** @type {{ policy: RepoOperationPolicy, provenance: RepoOperationPolicyProvenance, digest: string, supported: boolean }|null} */
let cached = null;

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
  const bytes = fs.readFileSync(REPO_OPERATION_POLICY_PATH);
  const digest = nodeCrypto.createHash('sha256').update(bytes).digest('hex');
  const policy = JSON.parse(bytes.toString('utf8'));
  const provenance = JSON.parse(
    fs.readFileSync(REPO_OPERATION_POLICY_PROVENANCE_PATH, 'utf8')
  );
  const loaded = {
    policy,
    provenance,
    digest,
    supported: policy.schema_version === 2
  };
  if (!deps.fs) {
    cached = loaded;
  }
  return loaded;
}

/**
 * Whether the pinned artifact has the one schema this consumer understands.
 * Unknown schemas stop only automatic ladder steps; callers keep operation
 * execution and the user-triggered session surface alive.
 */
export function repoOperationPolicySupported() {
  return loadRepoOperationPolicy().supported;
}

/**
 * The prohibitions a repair session is dispatched under (§9.3 "session이 할 수
 * 없는 일"). They are the contract's `never_automatic` enum, so the packet and
 * the gates refuse exactly what the canonical artifact forbids.
 *
 * @returns {string[]}
 */
export function repairSessionProhibitions() {
  const { policy } = loadRepoOperationPolicy();
  return Array.isArray(policy.never_automatic)
    ? [...policy.never_automatic]
    : [];
}

/**
 * Classify one settled failure for display and repair packets. Eligibility is a
 * separate all-terminal-failures decision; unknown codes remain verbatim so a
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
  return operation.kind === 'verify'
    ? 'verify_script_failure'
    : 'deploy_script_failure';
}

/**
 * @param {{ kind?: string, state?: string, superseded_by?: string|null, failure: { code: string, interrupted?: boolean }|null }} operation
 */
export function isRepairEligible(operation) {
  return (
    operation.state === 'failed' &&
    !operation.superseded_by &&
    typeof operation.failure?.code === 'string'
  );
}

/**
 * The projection the protocol carries to the UI: the three §10 lists verbatim
 * from the pinned artifact plus the provenance that proves which artifact they
 * came from. The client renders these tokens; it never decides membership.
 */
export function projectRepoOperationPolicy() {
  const { policy, provenance, digest, supported } = loadRepoOperationPolicy();
  /** @type {Record<string, unknown>[]} */
  const ladder = Array.isArray(policy.auto_repair?.resolution_ladder)
    ? policy.auto_repair.resolution_ladder
    : [];
  return {
    schema_version: policy.schema_version,
    supported,
    source_commit: provenance.source_commit,
    digest,
    worker_automatic: Array.isArray(policy.worker_automatic)
      ? [...policy.worker_automatic]
      : [],
    auto_repair: {
      default: policy.auto_repair?.default === true,
      scope: policy.auto_repair?.scope || '',
      resolution_subject: policy.auto_repair?.resolution_subject || '',
      resolution_ladder: ladder.map(
        (entry) =>
          /** @type {Record<string, unknown>} */ ({
            ...entry,
            ...(Array.isArray(entry.consumption_key)
              ? { consumption_key: [...entry.consumption_key] }
              : {})
          })
      ),
      manual_human_fix: policy.auto_repair?.manual_human_fix || ''
    },
    completion_chain: { ...(policy.completion_chain || {}) },
    repair_session_packet: Array.isArray(policy.repair_session_packet)
      ? [...policy.repair_session_packet]
      : [],
    resolution_entry_surface: policy.resolution_entry_surface || '',
    never_automatic: repairSessionProhibitions()
  };
}
