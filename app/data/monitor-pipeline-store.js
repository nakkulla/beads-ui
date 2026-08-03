/**
 * Client-side holder for the aggregated monitor pipeline snapshot (UI-nprg).
 *
 * The server pushes every visible workspace's worker pipeline as one
 * `monitor-pipeline-snapshot` event; the payload is total state (last snapshot
 * wins), so — like the worker queue store — this keeps no per-id bookkeeping.
 *
 * `null` means "nothing received yet", which the monitor renders as its empty
 * state; an empty array means "the server looked and every repo was idle".
 *
 * `workspaces_state` (UI-qrfo §4) is the second half of the same snapshot: one
 * entry per VISIBLE repo — pipeline-empty ones included — carrying the
 * automation flags, slots, CAS `revision` and exec defaults the waiting lane's
 * group headers control. It defaults to an empty array rather than null because
 * a server that does not send it is simply a repo list with no controls, which
 * renders fine (fail-quiet).
 */

/**
 * @returns {{ get: () => Array<Record<string, any>>|null, getWorkspacesState: () => Array<Record<string, any>>, set: (list: Array<Record<string, any>>|null, state?: Array<Record<string, any>>|null) => void, clear: () => void, subscribe: (fn: () => void) => () => void }}
 */
export function createMonitorPipelineStore() {
  /** @type {Array<Record<string, any>>|null} */
  let workspaces = null;
  /** @type {Array<Record<string, any>>} */
  let workspaces_state = [];
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
    getWorkspacesState() {
      return workspaces_state;
    },
    /**
     * @param {Array<Record<string, any>>|null} list
     * @param {Array<Record<string, any>>|null} [state]
     */
    set(list, state) {
      workspaces = Array.isArray(list) ? list : null;
      workspaces_state = Array.isArray(state) ? state : [];
      emit();
    },
    clear() {
      workspaces = null;
      workspaces_state = [];
      emit();
    },
    /** @param {() => void} fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}
