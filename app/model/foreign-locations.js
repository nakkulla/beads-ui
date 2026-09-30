/**
 * Where the OTHER repos' issues stand (UI-dbn6 §3.2, P1-r2): the 레포 scope
 * assembles lanes from one repo, so a dependency chip naming another repo's
 * issue would read `위치 미확인` and stay closed. The unscoped monitor rows
 * already say where every visible issue is — the same rule the issue detail
 * uses (`depCandidateModel().all_issues`).
 */
import { buildBlockerLocationMap } from './blockers.js';
import { buildLanes } from './lane-model.js';

/**
 * @import { BlockerLocation } from './blockers.js'
 */

/**
 * The lane locations of every visible issue outside `root_dir`.
 *
 * @param {Array<Record<string, any>>} rows - Unscoped monitor rows.
 * @param {Array<Record<string, any>>} states - Unscoped `workspaces_state`.
 * @param {string} root_dir - The repo in view.
 * @returns {Map<string, BlockerLocation>}
 */
export function foreignLocations(rows, states, root_dir) {
  const others = rows.filter((row) => row && row.root_dir !== root_dir);
  /** @type {Map<string, BlockerLocation>} */
  const out = new Map();
  if (others.length === 0) {
    return out;
  }
  const lanes = buildLanes(
    others,
    states.filter((row) => row && row.root_dir !== root_dir)
  );
  for (const [id, location] of buildBlockerLocationMap(lanes)) {
    out.set(id, location);
  }
  return out;
}
