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

export const WORK_RECOVERY_POLICY_PATH = path.join(
  CONTRACTS_DIR,
  'work-recovery-policy.json'
);
export const WORK_RECOVERY_POLICY_PROVENANCE_PATH = path.join(
  CONTRACTS_DIR,
  'work-recovery-policy.provenance.json'
);
export const WORK_RECOVERY_RESULT_LINE_PREFIX = '대기 · recovery:';

/** @typedef {{ readFileSync: (path: string, encoding?: string) => Buffer|string }} WorkRecoveryFs */
/**
 * @typedef {Object} WorkRecoveryLoad
 * @property {number|null} schema_version
 * @property {boolean} supported
 * @property {string|null} source_commit
 * @property {string|null} digest
 * @property {Record<string, any>|null} policy
 */
/**
 * @typedef {Object} WorkRecoveryClassification
 * @property {string} classification
 * @property {string} disposition
 * @property {string|null} reason
 * @property {string|null} next
 */

/** @type {WorkRecoveryLoad|null} */
let cached = null;

/**
 * @param {Partial<WorkRecoveryLoad>} [facts]
 * @returns {WorkRecoveryLoad}
 */
function unsupported(facts = {}) {
  return {
    schema_version: null,
    supported: false,
    source_commit: null,
    digest: null,
    policy: null,
    ...facts
  };
}

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

/**
 * @param {unknown} value
 * @returns {value is string[]}
 */
function stringList(value) {
  return (
    Array.isArray(value) && value.length > 0 && value.every(nonEmptyString)
  );
}

/**
 * @param {Buffer} bytes
 */
function gitBlobSha(bytes) {
  return nodeCrypto
    .createHash('sha1')
    .update(Buffer.from(`blob ${bytes.length}\0`, 'utf8'))
    .update(bytes)
    .digest('hex');
}

/**
 * @param {unknown} provenance
 * @param {Buffer} bytes
 * @param {string} digest
 */
function provenanceMatches(provenance, bytes, digest) {
  return (
    isRecord(provenance) &&
    nonEmptyString(provenance.source_repo) &&
    nonEmptyString(provenance.source_path) &&
    nonEmptyString(provenance.source_commit) &&
    provenance.bytes === bytes.length &&
    provenance.sha256 === digest &&
    provenance.source_blob_sha === gitBlobSha(bytes)
  );
}

/**
 * @param {unknown} policy
 * @returns {policy is Record<string, any>}
 */
function validPolicy(policy) {
  if (
    !isRecord(policy) ||
    !stringList(policy.dispositions) ||
    !stringList(policy.wait_reasons) ||
    !isRecord(policy.classification) ||
    !nonEmptyString(policy.readiness_env) ||
    !nonEmptyString(policy.readiness_value) ||
    policy.result_line_reasons !== 'wait_reasons_plus_reconcile'
  ) {
    return false;
  }
  return Object.values(policy.classification).every(
    (entry) =>
      isRecord(entry) &&
      policy.dispositions.includes(entry.disposition) &&
      (!['wait', 'reconcile'].includes(entry.disposition) ||
        nonEmptyString(entry.reason))
  );
}

/**
 * Load the pinned bytes once per process; injected fs fixtures bypass cache.
 *
 * @param {{ fs?: WorkRecoveryFs }} [deps]
 * @returns {WorkRecoveryLoad}
 */
export function loadWorkRecoveryPolicy(deps = {}) {
  if (cached && !deps.fs) {
    return cached;
  }
  const fs = deps.fs || nodeFs;
  /** @type {WorkRecoveryLoad} */
  let loaded;
  try {
    const raw = fs.readFileSync(WORK_RECOVERY_POLICY_PATH);
    const bytes = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
    const digest = nodeCrypto.createHash('sha256').update(bytes).digest('hex');
    const provenance = JSON.parse(
      String(fs.readFileSync(WORK_RECOVERY_POLICY_PROVENANCE_PATH, 'utf8'))
    );
    const artifact = JSON.parse(bytes.toString('utf8'));
    const schema_version = isRecord(artifact) ? artifact.schema_version : null;
    const source_commit = isRecord(provenance)
      ? provenance.source_commit
      : null;
    loaded =
      isRecord(artifact) &&
      schema_version === 1 &&
      provenanceMatches(provenance, bytes, digest) &&
      validPolicy(artifact.work_recovery)
        ? {
            schema_version,
            supported: true,
            source_commit,
            digest,
            policy: artifact.work_recovery
          }
        : unsupported({
            schema_version:
              typeof schema_version === 'number' ? schema_version : null,
            source_commit:
              typeof source_commit === 'string' ? source_commit : null,
            digest
          });
  } catch {
    loaded = unsupported();
  }
  if (!deps.fs) {
    cached = loaded;
  }
  return loaded;
}

/** Report whether the pinned work_recovery contract validated. */
export function workRecoveryPolicySupported() {
  return loadWorkRecoveryPolicy().supported;
}

/**
 * @param {string} key
 * @returns {WorkRecoveryClassification|null}
 */
export function workRecoveryClassification(key) {
  const loaded = loadWorkRecoveryPolicy();
  if (
    !loaded.supported ||
    !loaded.policy ||
    !Object.hasOwn(loaded.policy.classification, key)
  ) {
    return null;
  }
  const entry = loaded.policy.classification[key];
  return {
    classification: key,
    disposition: entry.disposition,
    reason: typeof entry.reason === 'string' ? entry.reason : null,
    next: typeof entry.next === 'string' ? entry.next : null
  };
}

/**
 * Read the result-line tokens from the pinned contract.
 *
 * @returns {string[]}
 */
export function recoveryResultLineReasons() {
  const loaded = loadWorkRecoveryPolicy();
  return loaded.supported && loaded.policy
    ? [...loaded.policy.wait_reasons, 'reconcile']
    : [];
}

/**
 * Advertise only a validated contract, never execution authority.
 *
 * @returns {Record<string, string>}
 */
export function workRecoveryReadinessEnv() {
  const loaded = loadWorkRecoveryPolicy();
  return loaded.supported && loaded.policy
    ? { [loaded.policy.readiness_env]: loaded.policy.readiness_value }
    : {};
}
