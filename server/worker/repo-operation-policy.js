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
 * @property {string} manual_human_fix
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
    supported: policy.schema_version === 3
  };
  if (!deps.fs) {
    cached = loaded;
  }
  return loaded;
}

/**
 * Whether the pinned artifact has the one schema this consumer understands.
 * Unknown schemas stop only the automatic ladder step; callers keep operation
 * execution alive and settle the failure terminally instead.
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
  return operation.kind === 'verify'
    ? 'verify_script_failure'
    : 'deploy_script_failure';
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
    manual_human_fix: policy.manual_human_fix || '',
    never_automatic: Array.isArray(policy.never_automatic)
      ? [...policy.never_automatic]
      : []
  };
}
