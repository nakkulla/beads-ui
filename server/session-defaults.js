/**
 * Workspace-global SESSION defaults — the `bd kv` layer between a Bead's own
 * metadata pins and the harness defaults (spec §A).
 *
 * beads-ui is a CONSUMER of this contract: the key name, schema number, the 21
 * allowed keys, and the `invalid_value: ignore_key_and_warn` / `absent:
 * skip_layer` rules are owned by dotfiles `workflow-state.yaml
 * workspace_kv_defaults`. Nothing here may widen that vocabulary, and no
 * harness default is ever copied into this repository.
 *
 * `impl_dispatch` is deliberately NOT one of them (UI-bu6d §6): it is
 * `write_rule: user_write_only`, so a workspace-global copy of it would pin a
 * dispatch nobody chose for the bead it lands on. A value left behind in an
 * older kv object drops through the ordinary `unknown_key:` warning.
 * The quick_fix profile, `base_sync_accept_local_commits`, and `bdui_url` run
 * the other way: all are kv-only keys with no bead-metadata layer, and the last
 * two carry the typings — `type: bool` and `enum: none` — that make them the
 * two values judged here rather than against an enum.
 *
 * @import { ResolvedCatalog } from './worker/runner-catalog.js'
 * @typedef {(value: string) => boolean} SessionDefaultFormat
 */
import { WORKSPACE_KV_KEYS, sessionDefaultEnums } from './worker/exec-enums.js';

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
 * True for an absolute `http`/`https` origin written exactly as `URL`
 * normalizes it — scheme, host, and optional port, with no trailing slash,
 * path, query, fragment, or userinfo.
 *
 * Comparing the raw string against `url.origin` is the whole rule: it rejects
 * `http://host:3000/` in the same step as `host:3000`, so the stored value is
 * always safe to concatenate with the session's `/api/worker/queue` path
 * instead of producing `//api/...`.
 *
 * @param {string} value
 */
export function isHttpOriginValue(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  return (
    (url.protocol === 'http:' || url.protocol === 'https:') &&
    value === url.origin
  );
}

/**
 * Session-default keys the contract types as a plain string with `enum: none`
 * (`workflow-state.yaml key_scoped`), mapped to the format that judges them.
 *
 * These keys deliberately have NO entry in `sessionDefaultEnums`: widening that
 * table with an empty list or a wildcard would make every enum-backed key's
 * check meaningless. The read and the write path both go through
 * {@link isValidSessionDefaultValue}, so one rule serves both.
 *
 * The client mirrors this in `app/views/settings-dialog/session-model.js`; the
 * two runtimes share no module, so the equality is asserted from both test
 * files instead.
 *
 * @type {Record<string, SessionDefaultFormat>}
 */
const SESSION_DEFAULT_FORMATS = {
  bdui_url: isHttpOriginValue
};

/**
 * Session-default keys the contract types `type: bool` — their kv value is a
 * JSON boolean, never the string `'true'`. `metadata_key: forbidden` and
 * `precedence: [workspace_kv]` make them kv-only: no bead pin and no current
 * user layer can carry one, so this file is the only place their type is
 * judged.
 *
 * `base_sync_accept_local_commits` is consumed by the dotfiles local base-sync
 * tail; absence and `false` mean the same thing to it, which is why the dialog
 * may store either for the off position.
 *
 * @type {ReadonlyArray<string>}
 */
export const SESSION_DEFAULT_BOOLEAN_KEYS = ['base_sync_accept_local_commits'];

/**
 * Judge one session-default value: by JSON type for a `type: bool` key, by
 * format when the contract gives the key no enum, otherwise against the key's
 * enum.
 *
 * @param {string} key
 * @param {unknown} value
 * @param {Record<string, ReadonlyArray<string>>} enums
 * @returns {value is string|boolean}
 */
function isValidSessionDefaultValue(key, value, enums) {
  if (SESSION_DEFAULT_BOOLEAN_KEYS.includes(key)) {
    return typeof value === 'boolean';
  }
  if (typeof value !== 'string') {
    return false;
  }
  const format = SESSION_DEFAULT_FORMATS[key];
  if (format) {
    return format(value);
  }
  return enums[key].includes(value);
}

/**
 * Read the durable kv object into the usable session-default layer.
 *
 * A key outside the contract's 21, or one whose value leaves its enum (or its
 * format or JSON type, for the keys the contract gives no enum), is DROPPED
 * with a warning rather than failing the whole layer: the workspace default is
 * not an explicit pin, so it fails quiet (spec §A).
 *
 * @param {unknown} raw - The decoded kv JSON object, or undefined when absent.
 * @param {{ catalog?: ResolvedCatalog }} [options]
 * @returns {{ values: Record<string, string|boolean>, warnings: string[] }}
 */
export function normalizeSessionDefaults(raw, options = {}) {
  /** @type {Record<string, string|boolean>} */
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
    if (!WORKSPACE_KV_KEYS.includes(key)) {
      warnings.push(`unknown_key:${key}`);
      continue;
    }
    if (!isValidSessionDefaultValue(key, value, enums)) {
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
 * A `null` value is the deletion request for that key. So is `''`, which a
 * `type: bool` key never sends: its off position is the deletion, and its
 * `false` is an ordinary storable value meaning the same thing.
 *
 * @param {unknown} raw
 * @param {{ catalog?: ResolvedCatalog }} [options]
 * @returns {{ ok: true, patch: Record<string, string|boolean|null> }|{ ok: false, reason: string }}
 */
export function validateSessionDefaultsPatch(raw, options = {}) {
  if (!isRecord(raw)) {
    return { ok: false, reason: 'values must be an object' };
  }
  const enums = sessionDefaultEnums(options.catalog);
  /** @type {Record<string, string|boolean|null>} */
  const patch = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!WORKSPACE_KV_KEYS.includes(key)) {
      return { ok: false, reason: `unknown session-default key: ${key}` };
    }
    if (value === null || value === '') {
      patch[key] = null;
      continue;
    }
    if (!isValidSessionDefaultValue(key, value, enums)) {
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
 * @param {Record<string, string|boolean|null>} patch
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
