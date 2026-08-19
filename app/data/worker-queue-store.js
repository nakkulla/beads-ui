/**
 * Client-side holder for the latest Worker queue snapshot.
 *
 * The server pushes the whole queue as a `worker-queue-snapshot` event and also
 * returns the authoritative queue in every mutation reply; both paths land here
 * via {@link set}. Views subscribe for re-render. This is intentionally tiny —
 * the queue is total-state (last snapshot wins), so there is no per-id
 * bookkeeping like the issue stores.
 *
 * @typedef {import('../../server/worker/queue-store.js').Queue} Queue
 * @typedef {Object} CompletionStatus
 * @property {string} root_bead_id
 * @property {'gating'|'repairing'|'waiting_repair_pr'|'merging'|'cleaning'|'paused'|'needs_human'|'completed'} phase
 * @property {'root'|'repair'|null} subject_role
 * @property {string|null} subject_bead_id
 * @property {string|null} [head_sha]
 * @property {string|null} [base_sha]
 * @property {string|null} [merged_sha]
 * @property {number} repair_sessions_used
 * @property {number} repair_session_cap
 * @property {{ bead_id: string, pr_url?: string|null, pr_number?: number|null }|null} current_repair
 * @property {string|null} active_attempt_id
 * @property {string|null} [failure_stage]
 * @property {string|null} [failure_reason]
 * @property {string|null} [evidence]
 * @property {string|null} [log_path]
 * @property {string|null} terminal_reason
 * @typedef {Object} ResolutionProjection
 * @property {string} attempt_id
 * @property {string} subject_bead_id
 * @property {number} deadline_at
 * @property {'waiting'|'yielded'|'ready'} state
 * @property {number|null} yielded_at
 * @property {number|null} settled_at
 * @typedef {Omit<Queue, 'completion_intents'|'merge_queue'> & { merge_queue: Array<{ bead_id: string, resolution_rounds: number, resolution?: ResolutionProjection|null, authority?: import('../../server/worker/queue-store.js').MergeAuthority|null, head_review?: import('../../server/worker/queue-store.js').HeadReview|null }>, completion_status?: Record<string, CompletionStatus>, manual_merge_continuation?: { schema_version: number, head_review_projection: boolean }, execution_defaults?: { supported: boolean, schema_version: number|null, source_commit: string|null, digest: string|null, session: Record<string, any>|null, orchestration: Record<string, any>|null } }} WorkerQueueSnapshot
 */

/**
 * @returns {{ get: () => WorkerQueueSnapshot|null, set: (q: WorkerQueueSnapshot|null) => void, clear: () => void, subscribe: (fn: () => void) => () => void }}
 */
export function createWorkerQueueStore() {
  /** @type {WorkerQueueSnapshot|null} */
  let queue = null;
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
      return queue;
    },
    /** @param {WorkerQueueSnapshot|null} q */
    set(q) {
      queue = q;
      emit();
    },
    clear() {
      queue = null;
      emit();
    },
    /** @param {() => void} fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}
