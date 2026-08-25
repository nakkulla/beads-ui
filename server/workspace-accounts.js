/**
 * Workspace-global EXEC ACCOUNT defaults — the `bd kv` layer between a Bead's
 * own account pins and the machine's current active login (UI-d3cb §3).
 *
 * Unlike `session-defaults.js` this layer is NOT fail-quiet. A session default
 * that cannot be read simply leaves the harness default in place, but an
 * account default that cannot be read decides WHICH ACCOUNT'S TOKENS a launch
 * spends. So the normalizer reports three states and the launch path refuses on
 * `unusable` (§5.2) rather than degrading it to "no default".
 *
 * That is also why normalization takes the WHOLE kv read result rather than its
 * value: an absent key and a corrupt stored value both arrive as
 * `value: undefined`, and only the `warning` field tells them apart.
 *
 * This key is deliberately outside dotfiles `workflow-state.yaml` (§2.2): no
 * dotfiles skill reads it, and the contract's `workspace_kv_defaults` clause
 * describes the single `workflow_session_defaults` key rather than registering
 * a set of them.
 *
 * This module holds no bd dependency of its own — it judges a result someone
 * else already read, which is what lets both the WS handler and the Worker
 * scheduler reuse one judgment.
 *
 * @typedef {{ ok: boolean, value?: Record<string, unknown>, warning?: string, error?: string }} KvReadResult
 * The `server/bd.js` kv read shape, restated so this module stays pure.
 */
import { ACCOUNT_KEYS } from './worker/exec-enums.js';

/** The single `bd kv` key holding a repo's exec account defaults. */
export const WORKSPACE_ACCOUNTS_KV_KEY = 'workspace_exec_accounts';

/** Schema number written into that key's JSON object. */
export const WORKSPACE_ACCOUNTS_SCHEMA = 1;

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * The per-issue pin's value rule, reused verbatim (§3.1): the same string is
 * legal in both layers, so a value the detail panel accepts must not be
 * refused here. EXISTENCE is not checked — the account list depends on external
 * tools, and an unreadable list must not block storing a value the user knows.
 *
 * @param {unknown} value
 * @returns {value is string}
 */
function isLegalAccountValue(value) {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value.length <= 256 &&
    !/\s/.test(value)
  );
}

/**
 * @typedef {Object} WorkspaceAccountsLayer
 * @property {'absent'|'usable'|'unusable'} state
 * @property {Record<string, string>} values
 * @property {string[]} warnings
 */

/**
 * Judge one `bd kv` read into the workspace account layer.
 *
 * @param {KvReadResult|unknown} read - The kv read result, whole.
 * @returns {WorkspaceAccountsLayer}
 */
export function normalizeWorkspaceAccounts(read) {
  /** @type {Record<string, string>} */
  const values = {};
  /** @type {string[]} */
  const warnings = [];
  const result = isRecord(read) ? read : null;
  if (result === null || result.ok !== true) {
    return { state: 'unusable', values, warnings: ['kv_read_failed'] };
  }
  const raw = result.value;
  if (!isRecord(raw)) {
    // The one branch value-only normalization cannot make: an absent key and a
    // value that is not a JSON object both land here, and only the warning
    // separates "no repo default" from "a default nobody can read".
    if (typeof result.warning === 'string' && result.warning.length > 0) {
      return { state: 'unusable', values, warnings: [result.warning] };
    }
    return { state: 'absent', values, warnings };
  }
  if (
    Object.hasOwn(raw, 'schema') &&
    raw.schema !== WORKSPACE_ACCOUNTS_SCHEMA
  ) {
    return {
      state: 'unusable',
      values,
      warnings: [`unsupported_schema:${String(raw.schema)}`]
    };
  }
  let invalid = false;
  for (const [key, value] of Object.entries(raw)) {
    if (key === 'schema') {
      continue;
    }
    if (!ACCOUNT_KEYS.includes(key)) {
      // A neighbouring key nobody recognizes drops WITHOUT lowering the state:
      // both account values are still settled, so it cannot decide a launch.
      warnings.push(`unknown_key:${key}`);
      continue;
    }
    if (!isLegalAccountValue(value)) {
      // One illegal provider condemns the whole layer: applying only the other
      // one is the same silent substitution §5.2 exists to refuse.
      warnings.push(`invalid_value:${key}`);
      invalid = true;
      continue;
    }
    values[key] = value;
  }
  return { state: invalid ? 'unusable' : 'usable', values, warnings };
}

/**
 * Validate a client-requested account patch before any write. Strict where the
 * read path is tolerant: an explicit user edit naming an unknown key or an
 * illegal value is refused rather than dropped.
 *
 * A `null` (or empty-string) value is the deletion request for that key.
 *
 * @param {unknown} patch
 * @returns {string|null} An error message, or null when the patch is legal.
 */
export function validateWorkspaceAccountsPatch(patch) {
  if (!isRecord(patch)) {
    return 'values must be an object';
  }
  for (const [key, value] of Object.entries(patch)) {
    if (!ACCOUNT_KEYS.includes(key)) {
      return `unknown workspace account key: ${key}`;
    }
    if (value === null || value === '') {
      continue;
    }
    if (!isLegalAccountValue(value)) {
      return `invalid value for ${key}: ${String(value)}`;
    }
  }
  return null;
}

/**
 * Merge a validated patch onto the durable kv object read moments earlier.
 * `bd kv` has no compare-and-swap, so that immediately preceding re-read is
 * what makes the write last-write-wins per KEY rather than per object.
 *
 * `schema` is always rewritten to the current number, so a value this path
 * leaves behind can never normalize as `unusable`.
 *
 * @param {Record<string, unknown>|undefined} raw
 * @param {Record<string, string|null>} patch
 * @returns {Record<string, unknown>}
 */
export function mergeWorkspaceAccounts(raw, patch) {
  /** @type {Record<string, unknown>} */
  const next = isRecord(raw) ? { ...raw } : {};
  next.schema = WORKSPACE_ACCOUNTS_SCHEMA;
  for (const [key, value] of Object.entries(patch)) {
    if (value === null || value === '') {
      delete next[key];
    } else {
      next[key] = value;
    }
  }
  return next;
}
