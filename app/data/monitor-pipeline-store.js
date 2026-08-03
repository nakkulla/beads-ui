/**
 * Client-side holder for the aggregated monitor pipeline snapshot (UI-nprg).
 *
 * The server pushes every visible workspace's worker pipeline as one
 * `monitor-pipeline-snapshot` event; the payload is total state (last snapshot
 * wins), so — like the worker queue store — this keeps no per-id bookkeeping.
 *
 * `null` means "nothing received yet", which the monitor renders as its empty
 * state; an empty array means "the server looked and every repo was idle".
 */

/**
 * @returns {{ get: () => Array<Record<string, any>>|null, set: (list: Array<Record<string, any>>|null) => void, clear: () => void, subscribe: (fn: () => void) => () => void }}
 */
export function createMonitorPipelineStore() {
  /** @type {Array<Record<string, any>>|null} */
  let workspaces = null;
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
      return workspaces;
    },
    /** @param {Array<Record<string, any>>|null} list */
    set(list) {
      workspaces = Array.isArray(list) ? list : null;
      emit();
    },
    clear() {
      workspaces = null;
      emit();
    },
    /** @param {() => void} fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}
