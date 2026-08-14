/**
 * The pinned runtime copy of the dotfiles-owned RepoOperation policy artifact
 * (master spec §4.5 / §9.1 / §10).
 *
 * beads-ui is a CONSUMER of that contract, never its author: every list this
 * module hands out — what the Worker does automatically, which failures buy an
 * automatic repair session, what is never automatic — is read from
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
 * @property {{ default: boolean, eligible: string[], budget_per_completion_chain: number }} auto_repair
 * @property {Record<string, string>} completion_chain
 * @property {string[]} never_automatic
 */

/** @type {{ policy: RepoOperationPolicy, provenance: RepoOperationPolicyProvenance, digest: string }|null} */
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
  const loaded = { policy, provenance, digest };
  if (!deps.fs) {
    cached = loaded;
  }
  return loaded;
}

/**
 * The failure classes the contract lets the Worker repair automatically.
 *
 * @returns {string[]}
 */
export function eligibleRepairFailures() {
  const { policy } = loadRepoOperationPolicy();
  return Array.isArray(policy.auto_repair?.eligible)
    ? [...policy.auto_repair.eligible]
    : [];
}

/**
 * The automatic budget one completion chain may spend.
 */
export function repairBudgetPerChain() {
  const { policy } = loadRepoOperationPolicy();
  const budget = policy.auto_repair?.budget_per_completion_chain;
  return Number.isInteger(budget) && budget >= 0 ? budget : 0;
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
 * Classify one settled failure into the contract's eligible-failure vocabulary.
 * Anything outside it stays manual — `other` is not an eligibility token, it is
 * the absence of one.
 *
 * @param {{ kind: string, failure: { code: string, interrupted?: boolean }|null }} operation
 * @returns {string} One of the contract's eligible tokens, or `other`.
 */
export function classifyRepoOperationFailure(operation) {
  const failure = operation.failure;
  if (!failure || typeof failure.code !== 'string') {
    return 'other';
  }
  if (failure.interrupted === true) {
    return 'interrupted_without_terminal_exit';
  }
  if (failure.code !== 'script_failed' && failure.code !== 'timeout') {
    return 'other';
  }
  return operation.kind === 'verify'
    ? 'verify_script_failure'
    : 'deploy_script_failure';
}

/**
 * @param {{ kind: string, failure: { code: string, interrupted?: boolean }|null }} operation
 */
export function isRepairEligible(operation) {
  return eligibleRepairFailures().includes(
    classifyRepoOperationFailure(operation)
  );
}

/**
 * The projection the protocol carries to the UI: the three §10 lists verbatim
 * from the pinned artifact plus the provenance that proves which artifact they
 * came from. The client renders these tokens; it never decides membership.
 */
export function projectRepoOperationPolicy() {
  const { policy, provenance, digest } = loadRepoOperationPolicy();
  return {
    schema_version: policy.schema_version,
    source_commit: provenance.source_commit,
    digest,
    worker_automatic: Array.isArray(policy.worker_automatic)
      ? [...policy.worker_automatic]
      : [],
    auto_repair: {
      default: policy.auto_repair?.default === true,
      eligible: eligibleRepairFailures(),
      budget_per_completion_chain: repairBudgetPerChain()
    },
    completion_chain: { ...(policy.completion_chain || {}) },
    never_automatic: repairSessionProhibitions()
  };
}
