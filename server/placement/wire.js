/**
 * The worker-queue wire shape of the placement judgment (UI-izba §4.5), and
 * the pair key both sides build it with.
 *
 * Import-free on purpose: the browser's placement computation reads the same
 * key function and the same typedefs, so no `node:` module may enter here.
 *
 * Orientation is SMALL-ID: of the two ids of a pair, `a` is the one that sorts
 * first by UTF-16 code unit (`<`, never `localeCompare`, whose result depends
 * on the locale) and `b` the other. A relation is read from that orientation:
 * `a_first` means a must land before b, whichever of the two is the candidate.
 */

/**
 * A relation in small-id orientation. `unknown` is a jev answer below the
 * adoption confidence.
 *
 * @typedef {'independent'|'a_first'|'b_first'|'conflict'|'unknown'} PlacementRelationKind
 */

/**
 * jev's first choice, in the same orientation.
 *
 * @typedef {'independent'|'a_first'|'b_first'|'conflict'} PlacementJevChoice
 */

/**
 * One pair relation of `placement_relations`.
 *
 * - `source: 'fixed'` — decided by a machine-known condition; `basis` names it
 *   (`blocks`: a direct `blocks` edge, `scope`: the declared scopes overlap,
 *   with the colliding prefixes in `overlap`). `confidence`, `jev_choice` and
 *   `judged_at` are null. `in_lane: true` marks a `blocks` edge between two
 *   members of one serial lane, shipped so the browser can apply the store's
 *   ordering rule to a preview.
 * - `source: 'jev'` — jev's cached answer. `relation` is `jev_choice` when
 *   `confidence` ≥ 0.8, otherwise `unknown`; `judged_at` is the answer's
 *   epoch-ms time.
 *
 * @typedef {Object} PlacementRelation
 * @property {string} a - The smaller id.
 * @property {string} b - The larger id.
 * @property {PlacementRelationKind} relation
 * @property {'fixed'|'jev'} source
 * @property {'blocks'|'scope'} [basis] - Fixed relations only.
 * @property {string[]} [overlap] - `basis: 'scope'` only.
 * @property {true} [in_lane] - In-lane `blocks` edges only.
 * @property {number|null} confidence
 * @property {PlacementJevChoice|null} jev_choice
 * @property {number|null} judged_at
 */

/**
 * The state of one placeable candidate's recommendation.
 *
 * @typedef {'ready'|'pending'|'unavailable'|'fixed_only'|'no_counterpart'} PlacementState
 */

/**
 * One candidate entry of `placement_status`.
 *
 * - `ready`: every pair that needs jev has an answer (any confidence).
 * - `pending`: some such pair has no answer yet; `reason` is
 *   `material_missing` when a pair waits on issue material, else `judging`.
 * - `unavailable`: some such pair failed; `reason` is `key_missing`,
 *   `http_<status>`, `timeout`, `connection_failed` or `schema_mismatch`.
 * - `fixed_only`: every pair is decided by a fixed condition.
 * - `no_counterpart`: nothing to compare against.
 *
 * `done`/`total` count the pairs that need jev (answered / all) and are present
 * whenever `total` > 0, so the browser can say "3쌍 중 1쌍 완료".
 *
 * @typedef {Object} PlacementStatus
 * @property {PlacementState} state
 * @property {string} [reason]
 * @property {number} [done]
 * @property {number} [total]
 */

/**
 * The two worker-queue snapshot fields. Both are absent on a server without the
 * feature (or with it uninstalled), which the browser reads as "draw no
 * [추천 배치]". A placeable candidate with no `placement_status` entry is 모름
 * and is drawn disabled.
 *
 * @typedef {Object} PlacementWire
 * @property {Record<string, PlacementRelation>} placement_relations - Keyed by
 * {@link placementPairKey}.
 * @property {Record<string, PlacementStatus>} placement_status - Keyed by
 * candidate bead id.
 */

/** @type {number} A jev answer is adopted at this confidence or above. */
export const ADOPT_CONFIDENCE = 0.8;

/**
 * An unadopted non-`independent` first choice at this confidence or above is
 * shown as a 참고 line (never used for placement). The browser applies it; the
 * value rides here so both sides read one number.
 *
 * @type {number}
 */
export const REFERENCE_CONFIDENCE = 0.5;

/** @type {string} Separator of a pair key; never part of a bead id. */
export const PAIR_KEY_SEPARATOR = '|';

/**
 * The two ids of a pair in small-id orientation.
 *
 * @param {string} x
 * @param {string} y
 * @returns {[string, string]}
 */
export function orientPair(x, y) {
  return x < y ? [x, y] : [y, x];
}

/**
 * The `placement_relations` key of a pair: `<a>|<b>` with a < b, so either
 * argument order yields the same key.
 *
 * @param {string} x
 * @param {string} y
 * @returns {string}
 */
export function placementPairKey(x, y) {
  const [a, b] = orientPair(x, y);
  return `${a}${PAIR_KEY_SEPARATOR}${b}`;
}
