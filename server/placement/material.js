/**
 * Issue material of the placement judgment (UI-izba §4.2): what jev reads about
 * one issue, the digest a cached answer is keyed by, and the pair state text.
 *
 * The issue fields come from the workspace snapshot's `id_index` row (a `bd
 * list` row, which carries `description`), the spec part from the spec material
 * cache. Nothing here runs `bd show`: one per issue would wake the db watcher
 * on every pass.
 *
 * Truncation is deterministic — a fixed character cap per issue and for the
 * whole state — so the same inputs always yield the same digest and the same
 * request.
 */
import crypto from 'node:crypto';
import { ISSUE_MATERIAL_CAP, STATE_CAP } from './question.js';

/**
 * @typedef {Object} IssueMaterial
 * @property {string} text - The capped material text jev reads.
 * @property {string} digest - sha256 of `text` and, when known, the whole
 * declared scope, first 16 hex digits.
 */

/**
 * The spec part as the cache answered it: `null` when the issue names no spec,
 * `{ state: 'miss' }` while it is not read yet.
 *
 * @typedef {import('./spec-sections.js').SpecPeek|null} SpecPart
 */

/**
 * The material of one issue, or null when it is not there yet: no snapshot
 * row, a row without a string `description`, or a named spec that is not read
 * — not read yet (`miss`) or not readable at the base (`failed`). §4.2 keeps a
 * pair with missing material `pending`, so jev never judges a spec-backed
 * issue from its body alone; the spec cache retries a failed read and its
 * fill fanout brings the material in once a read succeeds.
 *
 * The declared scope is serialized ahead of the body and the digest also hashes
 * it whole, so a scope change past the material cap still changes the digest; a
 * known empty scope serializes as `[]` and an issue whose scope is unknown has
 * no such field.
 *
 * @param {Record<string, unknown>|undefined} row
 * @param {string} spec_path
 * @param {SpecPart} spec
 * @param {string[]} [scope] - The declared scope the overlap is computed from.
 * @returns {IssueMaterial|null}
 */
export function issueMaterial(row, spec_path, spec, scope) {
  if (!row || typeof row.description !== 'string') {
    return null;
  }
  if (spec && spec.state !== 'hit') {
    return null;
  }
  const metadata =
    row.metadata && typeof row.metadata === 'object'
      ? /** @type {Record<string, unknown>} */ (row.metadata)
      : {};
  /** @type {Record<string, unknown>} */
  const material = {
    id: String(row.id ?? ''),
    title: typeof row.title === 'string' ? row.title : '',
    type: typeof row.issue_type === 'string' ? row.issue_type : '',
    route: typeof metadata.route === 'string' ? metadata.route : ''
  };
  if (Array.isArray(scope)) {
    material.declared_scope = scope;
  }
  material.description = row.description;
  if (spec && spec.state === 'hit') {
    material.spec = {
      path: spec_path,
      scope: spec.value.scope,
      sections: spec.value.sections
    };
  }
  const text = JSON.stringify(material).slice(0, ISSUE_MATERIAL_CAP);
  const hash = crypto.createHash('sha256').update(text);
  if (Array.isArray(scope)) {
    hash.update(`\n${JSON.stringify(scope)}`);
  }
  return { text, digest: hash.digest('hex').slice(0, 16) };
}

/**
 * The state text of one pair in small-id orientation, capped at the whole-state
 * limit. jev accepts text state, so a cut need not keep JSON syntax (the same
 * reading the workflow judge relies on). A declared-scope overlap goes first as
 * one line the cap never cuts; the two materials share what budget is left.
 *
 * @param {string} a
 * @param {string} text_a
 * @param {string} b
 * @param {string} text_b
 * @param {string[]} [overlap] - Prefixes the two declared scopes meet on.
 * @returns {string}
 */
export function pairState(a, text_a, b, text_b, overlap = []) {
  const head =
    overlap.length > 0
      ? `Declared scopes overlap on: ${overlap.join(', ')}\n`
      : '';
  const body = `A (${a}):\n${text_a}\n\nB (${b}):\n${text_b}`;
  return head + body.slice(0, Math.max(0, STATE_CAP - head.length));
}
