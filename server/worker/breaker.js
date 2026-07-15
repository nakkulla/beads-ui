/**
 * Per-repo circuit breaker (spec §5.3).
 *
 * A session failure (abnormal exit, loud-fail blocker, merge-invariant
 * violation, or Worker independent-verification failure) trips the breaker for
 * that repo: new launches AND merge entries are blocked, a cause banner is
 * recorded, and auto_advance is turned OFF by the scheduler. Already-running
 * sessions are NOT force-killed — they finish and are blocked at the merge gate.
 * Manual ▶ resets the breaker.
 */

/**
 * @typedef {Object} BreakerBanner
 * @property {string} repo
 * @property {string} bead_id
 * @property {string} cause
 * @property {number} at - Epoch ms the breaker tripped.
 */

/**
 * Create a circuit-breaker state holder.
 *
 * @param {{ now?: () => number }} [options]
 * @returns {{
 *   trip: (repo: string, info: { bead_id: string, cause: string }) => BreakerBanner,
 *   isTripped: (repo: string) => boolean,
 *   banner: (repo: string) => BreakerBanner | null,
 *   reset: (repo: string) => void,
 *   anyTripped: () => boolean,
 *   snapshot: () => Record<string, BreakerBanner>
 * }}
 */
export function createBreaker(options = {}) {
  const now = options.now || (() => Date.now());
  /** @type {Map<string, BreakerBanner>} */
  const tripped = new Map();

  return {
    /**
     * @param {string} repo
     * @param {{ bead_id: string, cause: string }} info
     * @returns {BreakerBanner}
     */
    trip(repo, info) {
      /** @type {BreakerBanner} */
      const banner = {
        repo,
        bead_id: info.bead_id,
        cause: info.cause,
        at: now()
      };
      tripped.set(repo, banner);
      return banner;
    },

    /**
     * @param {string} repo
     * @returns {boolean}
     */
    isTripped(repo) {
      return tripped.has(repo);
    },

    /**
     * @param {string} repo
     * @returns {BreakerBanner | null}
     */
    banner(repo) {
      return tripped.get(repo) || null;
    },

    /**
     * @param {string} repo
     */
    reset(repo) {
      tripped.delete(repo);
    },

    /**
     * @returns {boolean}
     */
    anyTripped() {
      return tripped.size > 0;
    },

    /**
     * @returns {Record<string, BreakerBanner>}
     */
    snapshot() {
      return Object.fromEntries(tripped);
    }
  };
}
