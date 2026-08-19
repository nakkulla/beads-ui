/**
 * Client-side holder for the latest parallelism-analysis snapshot (UI-04vo §9).
 *
 * Total-state like the queue store: the server pushes the whole channel
 * snapshot (settings, active job, durable run history, last-good result) and
 * the last one wins.
 * Views subscribe for re-render; nothing is derived here, because every
 * judgment that matters — group eligibility above all — is the server's and
 * travels stamped on the result.
 *
 * One value here is NOT the server's: `pending` marks the preparation window
 * between a start request leaving this browser and the server's `job`
 * appearing (UI-yqw9 §4.0). It is browser-local on purpose — another tab did
 * not send that request, so only this one may claim to be preparing. The
 * moment the job exists, every tab sees it.
 *
 * @typedef {Object} AnalysisSettings
 * @property {number} revision
 * @property {string|null} runner
 * @property {string|null} model
 * @property {string|null} effort
 * @property {boolean} [is_default]
 * @property {boolean} [compatible]
 * @typedef {Object} AnalysisJob
 * @property {string} job_id
 * @property {string} identity
 * @property {string|null} [runner]
 * @property {string|null} [model]
 * @property {string|null} [effort]
 * @property {number} [started_at]
 * @property {string|null} [session_id]
 * @typedef {Object} AnalysisRun
 * @property {string} run_id
 * @property {string|null} session_id
 * @property {string} runner
 * @property {string} model
 * @property {string} effort
 * @property {number} started_at
 * @property {number|null} ended_at
 * @property {'running'|'success'|'failure'|'cancelled'|'interrupted'} outcome
 * @property {string|null} reason
 * @property {boolean} prompt_saved
 * @typedef {Object} AnalysisSnapshot
 * @property {AnalysisSettings} settings
 * @property {AnalysisJob|null} job
 * @property {AnalysisRun[]} [runs]
 * @property {{ identity_digest: string, at: number|null, result: any, target_ids?: string[]|null }|null} last_good
 */

/**
 * @returns {{ get: () => AnalysisSnapshot|null, set: (s: AnalysisSnapshot|null) => void, isPending: () => boolean, setPending: (p: boolean) => void, clear: () => void, subscribe: (fn: () => void) => () => void }}
 */
export function createWorkerParallelAnalysisStore() {
  /** @type {AnalysisSnapshot|null} */
  let snapshot = null;
  /** @type {boolean} */
  let pending = false;
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
     * Adopt a server push. It deliberately does NOT touch `pending`: the
     * server has no opinion about a request this browser has in flight, and
     * clearing it here would blank the 준비 중 line on the first unrelated
     * fanout.
     *
     * @param {AnalysisSnapshot|null} next
     */
    set(next) {
      snapshot = next;
      emit();
    },

    isPending() {
      return pending;
    },

    /**
     * @param {boolean} next
     */
    setPending(next) {
      const value = next === true;
      if (value === pending) {
        return;
      }
      pending = value;
      emit();
    },

    clear() {
      snapshot = null;
      pending = false;
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
