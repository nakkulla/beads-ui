import nodeCrypto from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ORCHESTRATION_MODEL_FALLBACK } from './policy.js';

const CONTRACTS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'generated',
  'contracts'
);

export const EXECUTION_DEFAULTS_PATH = path.join(
  CONTRACTS_DIR,
  'execution-defaults.json'
);

export const EXECUTION_DEFAULTS_PROVENANCE_PATH = path.join(
  CONTRACTS_DIR,
  'execution-defaults.provenance.json'
);

/** @typedef {{ readFileSync: (path: string, encoding?: string) => Buffer|string }} ExecutionDefaultsFs */
/**
 * @typedef {Object} ExecutionDefaultsLoad
 * @property {number|null} schema_version
 * @property {boolean} supported
 * @property {string|null} source_commit
 * @property {string|null} digest
 * @property {Record<string, any>|null} session
 */

/** @type {ExecutionDefaultsLoad|null} */
let cached = null;

/**
 * @param {Record<string, any>} [facts]
 * @returns {ExecutionDefaultsLoad}
 */
function unsupported(facts = {}) {
  return {
    schema_version: null,
    supported: false,
    source_commit: null,
    digest: null,
    session: null,
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
 * @param {Record<string, any>} artifact
 */
function sessionFacts(artifact) {
  const session = { ...artifact };
  delete session.schema_version;
  const defaults = session.implementation?.default;
  const model_catalog = session.implementation?.model_catalog;
  if (
    isRecord(defaults) &&
    typeof defaults.runtime === 'string' &&
    typeof defaults.model === 'string' &&
    isRecord(model_catalog)
  ) {
    const runtime_models = model_catalog[defaults.runtime];
    const model_id = isRecord(runtime_models)
      ? runtime_models[defaults.model]
      : null;
    session.implementation = {
      ...session.implementation,
      default: {
        ...defaults,
        model_id: typeof model_id === 'string' ? model_id : defaults.model
      }
    };
  }
  return session;
}

/**
 * Read the pinned artifact once per process. Injected filesystems bypass cache
 * so tests can exercise each failure independently.
 *
 * @param {{ fs?: ExecutionDefaultsFs }} [deps]
 */
export function loadExecutionDefaults(deps = {}) {
  if (cached && !deps.fs) {
    return cached;
  }
  const fs = deps.fs || nodeFs;
  let loaded;
  try {
    const raw = fs.readFileSync(EXECUTION_DEFAULTS_PATH);
    const bytes = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
    const digest = nodeCrypto.createHash('sha256').update(bytes).digest('hex');
    const provenance = JSON.parse(
      String(fs.readFileSync(EXECUTION_DEFAULTS_PROVENANCE_PATH, 'utf8'))
    );
    const artifact = JSON.parse(bytes.toString('utf8'));
    const schema_version = isRecord(artifact) ? artifact.schema_version : null;
    const source_commit = isRecord(provenance)
      ? provenance.source_commit
      : null;
    const valid =
      isRecord(artifact) &&
      schema_version === 1 &&
      isRecord(provenance) &&
      provenance.bytes === bytes.length &&
      provenance.sha256 === digest &&
      typeof source_commit === 'string';
    loaded = valid
      ? {
          schema_version,
          supported: true,
          source_commit,
          digest,
          session: sessionFacts(artifact)
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

/**
 * @param {import('./runner-catalog.js').ResolvedCatalog|null|undefined} runner_catalog
 * @param {{ fs?: ExecutionDefaultsFs }} [deps]
 */
export function projectExecutionDefaults(runner_catalog, deps = {}) {
  const loaded = loadExecutionDefaults(deps);
  if (!loaded.supported || !loaded.session) {
    return { ...loaded, orchestration: null };
  }
  const runtime = runner_catalog?.model_index?.[ORCHESTRATION_MODEL_FALLBACK];
  const model_entry =
    typeof runtime === 'string'
      ? runner_catalog?.runners?.[runtime]?.models?.[
          ORCHESTRATION_MODEL_FALLBACK
        ]
      : null;
  return {
    ...loaded,
    orchestration: {
      runtime: typeof runtime === 'string' ? runtime : null,
      model: ORCHESTRATION_MODEL_FALLBACK,
      model_id:
        model_entry && typeof model_entry.id === 'string'
          ? model_entry.id
          : ORCHESTRATION_MODEL_FALLBACK,
      effort: null,
      speed: 'default'
    }
  };
}
