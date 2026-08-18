/**
 * Client-side holder for the latest parallelism-analysis snapshot (UI-04vo §9).
 *
 * Total-state like the queue store: the server pushes the whole channel
 * snapshot (settings, active job, last-good result) and the last one wins.
 * Views subscribe for re-render; nothing is derived here, because every
 * judgment that matters — group eligibility above all — is the server's and
 * travels stamped on the result.
 *
 * @typedef {Object} AnalysisSettings
 * @property {number} revision
 * @property {string|null} runner
 * @property {string|null} model
 * @property {string|null} effort
 * @typedef {Object} AnalysisSnapshot
 * @property {AnalysisSettings} settings
 * @property {{ job_id: string, identity: string }|null} job
 * @property {{ identity_digest: string, at: number|null, result: any }|null} last_good
 */

/**
 * @returns {{ get: () => AnalysisSnapshot|null, set: (s: AnalysisSnapshot|null) => void, clear: () => void, subscribe: (fn: () => void) => () => void }}
 */
export function createWorkerParallelAnalysisStore() {
  /** @type {AnalysisSnapshot|null} */
  let snapshot = null;
  /** @type {Set<() => void>} */
  const listeners = new Set();

  function emit() {
    for (const fn of Array.from(listeners)) {
      try {
        fn();
      } catch {
        /* ignore listener errors */
      }
    }
  }

  return {
    get() {
      return snapshot;
    },

    /**
     * @param {AnalysisSnapshot|null} next
     */
    set(next) {
      snapshot = next;
      emit();
    },

    clear() {
      snapshot = null;
      emit();
    },

    /**
     * @param {() => void} fn
     */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}
