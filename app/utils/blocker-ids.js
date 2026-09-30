/**
 * A candidate row's blocker ids (UI-q1y7 §4.1).
 *
 * Extracted from `workspace-adapter.js` so the candidate sort can read the same
 * ladder without an adapter → sort → adapter import cycle. The behaviour, the
 * ladder order, and the fail-quiet fallbacks are unchanged.
 */

/**
 * The blocker ids of a blocked candidate. The server-synthesized
 * `blocked_info.blockers` is the primary source; when the whole object is absent
 * (older server) the embedded `blocks` dependency edges answer instead.
 *
 * @param {any} issue
 * @returns {string[]}
 */
export function blockerIdsOf(issue) {
  const info = issue?.blocked_info;
  if (info && typeof info === 'object') {
    return Array.isArray(info.blockers)
      ? info.blockers.filter(
          (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
        )
      : [];
  }
  const deps = Array.isArray(issue?.dependencies) ? issue.dependencies : [];
  return deps
    .map((/** @type {any} */ d) => {
      if (typeof d === 'string') {
        return d;
      }
      if (!d || typeof d !== 'object') {
        return '';
      }
      const kind = d.type ?? d.dependency_type;
      if (kind !== undefined && kind !== 'blocks') {
        return '';
      }
      return d.depends_on_id || d.id || '';
    })
    .filter(Boolean);
}
