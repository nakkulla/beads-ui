/**
 * Workspace-global SESSION defaults — the `bd kv` layer between a Bead's own
 * metadata pins and the harness defaults (spec §A).
 *
 * beads-ui is a CONSUMER of this contract: the key name, schema number, the 12
 * allowed keys, and the `invalid_value: ignore_key_and_warn` / `absent:
 * skip_layer` rules are owned by dotfiles `workflow.yaml
 * workspace_kv_defaults`. Nothing here may widen that vocabulary, and no
 * harness default is ever copied into this repository.
 *
 * @import { ResolvedCatalog } from './worker/runner-catalog.js'
 */
import {
  SESSION_DEFAULT_KEYS,
  sessionDefaultEnums
} from './worker/exec-enums.js';

/** The single `bd kv` key holding every workspace session default. */
export const SESSION_DEFAULTS_KV_KEY = 'workflow_session_defaults';

/** Schema number the contract pins for that key's JSON object. */
export const SESSION_DEFAULTS_SCHEMA = 1;

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Read the durable kv object into the usable session-default layer.
 *
 * A key outside the contract's 12, or one whose value leaves its enum, is
 * DROPPED with a warning rather than failing the whole layer: the workspace
 * default is not an explicit pin, so it fails quiet (spec §A).
 *
 * @param {unknown} raw - The decoded kv JSON object, or undefined when absent.
 * @param {{ catalog?: ResolvedCatalog }} [options]
 * @returns {{ values: Record<string, string>, warnings: string[] }}
 */
export function normalizeSessionDefaults(raw, options = {}) {
  /** @type {Record<string, string>} */
  const values = {};
  /** @type {string[]} */
  const warnings = [];
  if (!isRecord(raw)) {
    return { values, warnings };
  }
  const enums = sessionDefaultEnums(options.catalog);
  for (const [key, value] of Object.entries(raw)) {
    if (key === 'schema') {
      continue;
    }
    if (!SESSION_DEFAULT_KEYS.includes(key)) {
      warnings.push(`unknown_key:${key}`);
      continue;
    }
    const allowed = enums[key];
    if (typeof value !== 'string' || !allowed.includes(value)) {
      warnings.push(`invalid_value:${key}`);
      continue;
    }
    values[key] = value;
  }
  return { values, warnings };
}

/**
 * Validate a client-requested session-default patch before any write. Unlike
 * the read path this is STRICT: an explicit user edit that names an unknown key
 * or an illegal value is refused rather than silently dropped.
 *
 * A `null` value is the deletion request for that key.
 *
 * @param {unknown} raw
 * @param {{ catalog?: ResolvedCatalog }} [options]
 * @returns {{ ok: true, patch: Record<string, string|null> }|{ ok: false, reason: string }}
 */
export function validateSessionDefaultsPatch(raw, options = {}) {
  if (!isRecord(raw)) {
    return { ok: false, reason: 'values must be an object' };
  }
  const enums = sessionDefaultEnums(options.catalog);
  /** @type {Record<string, string|null>} */
  const patch = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!SESSION_DEFAULT_KEYS.includes(key)) {
      return { ok: false, reason: `unknown session-default key: ${key}` };
    }
    if (value === null || value === '') {
      patch[key] = null;
      continue;
    }
    const allowed = enums[key];
    if (typeof value !== 'string' || !allowed.includes(value)) {
      return {
        ok: false,
        reason: `invalid value for ${key}: ${String(value)}`
      };
    }
    patch[key] = value;
  }
  return { ok: true, patch };
}

/**
 * Merge a validated patch onto the durable kv object read moments earlier.
 * `bd kv` has no compare-and-swap, so the re-read immediately before this merge
 * is what makes the write last-write-wins per KEY rather than per object
 * (spec §C.2).
 *
 * @param {Record<string, unknown>|undefined} current
 * @param {Record<string, string|null>} patch
 * @returns {Record<string, unknown>}
 */
export function mergeSessionDefaults(current, patch) {
  /** @type {Record<string, unknown>} */
  const next = isRecord(current) ? { ...current } : {};
  next.schema = SESSION_DEFAULTS_SCHEMA;
  for (const [key, value] of Object.entries(patch)) {
    if (value === null) {
      delete next[key];
    } else {
      next[key] = value;
    }
  }
  return next;
}
