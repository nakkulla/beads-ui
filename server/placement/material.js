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
 * @property {string} digest - sha256 of `text`, first 16 hex digits.
 */

/**
 * The spec part as the cache answered it: `null` when the issue names no spec,
 * `{ state: 'miss' }` while it is not read yet.
 *
 * @typedef {import('./spec-sections.js').SpecPeek|null} SpecPart
 */

/**
 * The material of one issue, or null when it is not there yet: no snapshot
 * row, a row without a string `description`, or a spec not read yet. A spec
 * that cannot be read at the base (`failed`) does not hold the issue back —
 * the material says so and jev judges from the issue alone.
 *
 * @param {Record<string, unknown>|undefined} row
 * @param {string} spec_path
 * @param {SpecPart} spec
 * @returns {IssueMaterial|null}
 */
export function issueMaterial(row, spec_path, spec) {
  if (!row || typeof row.description !== 'string') {
    return null;
  }
  if (spec && spec.state === 'miss') {
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
    route: typeof metadata.route === 'string' ? metadata.route : '',
    description: row.description
  };
  if (spec && spec.state === 'hit') {
    material.spec = {
      path: spec_path,
      scope: spec.value.scope,
      sections: spec.value.sections
    };
  } else if (spec && spec.state === 'failed') {
    material.spec = { path: spec_path, unreadable: true };
  }
  const text = JSON.stringify(material).slice(0, ISSUE_MATERIAL_CAP);
  return {
    text,
    digest: crypto.createHash('sha256').update(text).digest('hex').slice(0, 16)
  };
}

/**
 * The state text of one pair in small-id orientation, capped at the whole-state
 * limit. jev accepts text state, so a cut need not keep JSON syntax (the same
 * reading the workflow judge relies on).
 *
 * @param {string} a
 * @param {string} text_a
 * @param {string} b
 * @param {string} text_b
 * @returns {string}
 */
export function pairState(a, text_a, b, text_b) {
  return `A (${a}):\n${text_a}\n\nB (${b}):\n${text_b}`.slice(0, STATE_CAP);
}
