/**
 * Declared-scope overlap primitives (UI-t4zy §3.3, moved here by UI-qm12 §5.1).
 *
 * A spec's front-matter `scope:` lists repo-relative path prefixes. Two issues
 * overlap when any pair of their declared items meets on a path-SEGMENT
 * boundary — `server/worker` and `server/worker/queue-store.js` overlap,
 * `server/worker` and `server/worker-extra` do not.
 *
 * It lives under `app/utils/` rather than beside one consumer because both the
 * monitor 겹침 chips (`app/views/worker/lane-model.js`) and the Worker tab's
 * (`app/views/worker/queue-overlaps.js`) derive from the same two functions.
 * One definition of "이 둘은 부딪힌다" — the same precedent as
 * `app/utils/transcript-lines.js`.
 */

/**
 * @param {string} prefix
 */
export function normalizeScopePrefix(prefix) {
  return prefix.replace(/\/+$/, '');
}

/**
 * Test whether two declared scope items overlap on a path-segment boundary.
 *
 * @param {string} left
 * @param {string} right
 */
export function scopeItemsOverlap(left, right) {
  const x = normalizeScopePrefix(left);
  const y = normalizeScopePrefix(right);
  return x === y || y.startsWith(`${x}/`) || x.startsWith(`${y}/`);
}

/**
 * The prefixes TWO declarations collide on, deduped and lexicographically
 * sorted. Each colliding pair contributes the LONGER of its two items: the
 * longer one is the narrower statement of where the two actually meet, and the
 * shorter one would name a directory neither side declared alone.
 *
 * @param {string[]} scope_a
 * @param {string[]} scope_b
 * @returns {string[]}
 */
export function overlapPrefixes(scope_a, scope_b) {
  /** @type {Set<string>} */
  const prefixes = new Set();
  for (const left_item of scope_a) {
    for (const right_item of scope_b) {
      if (!scopeItemsOverlap(left_item, right_item)) {
        continue;
      }
      const left_prefix = normalizeScopePrefix(left_item);
      const right_prefix = normalizeScopePrefix(right_item);
      prefixes.add(
        left_prefix.length >= right_prefix.length ? left_prefix : right_prefix
      );
    }
  }
  return [...prefixes].sort();
}

/**
 * Where a declared scope was read from (UI-ruwu §4): the spec and, when the
 * issue pins one, the plan. Either may be absent — an issue whose scope comes
 * from its description names neither.
 *
 * @typedef {Object} ScopeSource
 * @property {string} [spec_path]
 * @property {string} [plan_path]
 */

/**
 * The {@link ScopeSource} of a `bead_scope` entry's `artifacts`, which the
 * server lists spec first and plan second.
 *
 * @param {unknown} artifacts
 * @returns {ScopeSource}
 */
export function scopeSourceOf(artifacts) {
  const list = Array.isArray(artifacts) ? artifacts : [];
  return {
    spec_path: typeof list[0] === 'string' ? list[0] : '',
    plan_path: typeof list[1] === 'string' ? list[1] : ''
  };
}

/**
 * Whether two issues declare their scope from the same spec or the same plan.
 * The issues one plan landed as share a scope by design, so a `⧉` chip between
 * them says nothing; a pair that differs on both, or has nothing to compare,
 * keeps its overlap.
 *
 * @param {ScopeSource} left
 * @param {ScopeSource} right
 * @returns {boolean}
 */
export function sharesScopeSource(left, right) {
  return (
    (!!left.spec_path && left.spec_path === right.spec_path) ||
    (!!left.plan_path && left.plan_path === right.plan_path)
  );
}
