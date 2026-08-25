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
 *
 * `cross_lanes` (UI-j92s §4.4) is the third: the stored 연결 레인 membership.
 * Its THREE states are all distinct and none may collapse into another — a
 * server that never sends the key (`undefined`) has no lane feature at all,
 * `null` means the store exists but could not be read, and an object is the
 * real membership. 뷰는 그 셋을 각각 다르게 그린다.
 */

/**
 * @typedef {{ revision: number, lanes: Array<Record<string, any>> }} CrossLanesSnapshot
 */

/**
 * @returns {{ get: () => Array<Record<string, any>>|null, getWorkspacesState: () => Array<Record<string, any>>, crossLanes: () => CrossLanesSnapshot|null|undefined, set: (list: Array<Record<string, any>>|null, state?: Array<Record<string, any>>|null, cross_lanes?: CrossLanesSnapshot|null) => void, clear: () => void, subscribe: (fn: () => void) => () => void }}
 */
export function createMonitorPipelineStore() {
  /** @type {Array<Record<string, any>>|null} */
  let workspaces = null;
  /** @type {Array<Record<string, any>>} */
  let workspaces_state = [];
  /** @type {CrossLanesSnapshot|null|undefined} */
  let cross_lanes = undefined;
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
    crossLanes() {
      return cross_lanes;
    },
    /**
     * @param {Array<Record<string, any>>|null} list
     * @param {Array<Record<string, any>>|null} [state]
     * @param {CrossLanesSnapshot|null} [lanes]
     */
    set(list, state, lanes) {
      workspaces = Array.isArray(list) ? list : null;
      workspaces_state = Array.isArray(state) ? state : [];
      // 키가 없는 구서버 스냅샷은 `undefined`로 남는다 — 없는 기능과 읽지 못한
      // 저장소는 다른 말이고, 뷰는 그 둘을 다르게 그린다 (§4.4·§7).
      cross_lanes =
        lanes === undefined
          ? undefined
          : lanes !== null &&
              typeof lanes === 'object' &&
              typeof lanes.revision === 'number' &&
              Array.isArray(lanes.lanes)
            ? { revision: lanes.revision, lanes: lanes.lanes }
            : null;
      emit();
    },
    clear() {
      workspaces = null;
      workspaces_state = [];
      cross_lanes = undefined;
      emit();
    },
    /** @param {() => void} fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}
