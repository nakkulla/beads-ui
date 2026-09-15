/**
 * Execution lanes are derived from the current route. This dependency-free
 * leaf keeps initial dispatch and attempt continuation on the same rule.
 */

/**
 * @param {unknown} route
 * @returns {'quick_fix'|'pr'}
 */
export function laneOfRoute(route) {
  return route === 'quick_fix' ? 'quick_fix' : 'pr';
}

/**
 * @param {{ quickfix_lane?: boolean }} prior
 * @param {{ route?: string|null }} bead_snapshot
 * @returns {{ ok: false, reason: 'route_changed', route_change: { prior_lane: 'quick_fix'|'pr', current_route: string|null } }|null}
 */
export function laneMismatchOf(prior, bead_snapshot) {
  const prior_lane = prior.quickfix_lane === true ? 'quick_fix' : 'pr';
  if (prior_lane === laneOfRoute(bead_snapshot.route)) {
    return null;
  }
  return {
    ok: false,
    reason: 'route_changed',
    route_change: { prior_lane, current_route: bead_snapshot.route ?? null }
  };
}
