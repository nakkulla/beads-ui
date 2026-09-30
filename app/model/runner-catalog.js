/**
 * Runner-catalog lookups shared by the lane model, the exec chips and the
 * detail panel's execution controls (moved from
 * `views/detail-panel/exec-settings.js`, UI-dbn6 Phase 1).
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * The snapshot catalog's runners as ordered `[name, entry]` pairs, or null when
 * the decoration is absent or unreadable. Null is the FAIL-QUIET signal: the
 * caller shows the stored value alone rather than an empty selector, because a
 * server that could not resolve the catalog has told us nothing about which
 * models exist — not that none do.
 *
 * @param {any} runner_catalog
 * @returns {[string, any][] | null}
 */
export function catalogRunners(runner_catalog) {
  if (!isRecord(runner_catalog) || !isRecord(runner_catalog.runners)) {
    return null;
  }
  const pairs = Object.entries(runner_catalog.runners).filter(
    ([, entry]) => isRecord(entry) && isRecord(entry.models)
  );
  return pairs.length > 0 ? pairs : null;
}

/**
 * The runner that owns `model` per the snapshot catalog, or null.
 *
 * @param {any} runner_catalog
 * @param {string} model
 * @returns {string|null}
 */
export function modelRunnerOf(runner_catalog, model) {
  const runners = catalogRunners(runner_catalog);
  if (!runners || !model) {
    return null;
  }
  for (const [name, entry] of runners) {
    if (Object.hasOwn(entry.models, model)) {
      return name;
    }
  }
  return null;
}
