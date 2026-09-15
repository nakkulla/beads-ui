/**
 * Keyed Worker queue state: subscription snapshots establish sequencing, while
 * mutation replies overlay keys without resetting the subscription baseline.
 *
 * @typedef {import('../../server/worker/queue-store.js').Queue} Queue
 * @typedef {Object} CompletionStatus
 * @property {string} root_bead_id
 * @property {'gating'|'merging'|'cleaning'|'waiting_metadata'|'reviewing'|'retrying'|'paused'|'needs_human'|'completed'} phase
 * @property {'root'|null} subject_role
 * @property {string|null} subject_bead_id
 * @property {string|null} [head_sha]
 * @property {string|null} [base_sha]
 * @property {string|null} [merged_sha]
 * @property {string|null} active_attempt_id
 * @property {string|null} [failure_stage]
 * @property {string|null} [failure_reason]
 * @property {string|null} [evidence]
 * @property {string|null} [log_path]
 * @property {string|null} terminal_reason
 * @property {{ class: string, origin_reason: string|null, attempts: number, attempt_cap?: number, next_at: number|null, last_error: string|null }|null} [auto_resolution] - The
 * non-terminal automatic resolution the coordinator is running (UI-hk74 §4).
 * Absent on a snapshot from a server that predates it.
 * @typedef {Object} ResolutionProjection
 * @property {string} attempt_id
 * @property {string} subject_bead_id
 * @property {number} deadline_at
 * @property {'waiting'|'yielded'|'ready'} state
 * @property {number|null} yielded_at
 * @property {number|null} settled_at
 * @typedef {Omit<Queue, 'completion_intents'|'merge_queue'> & { merge_queue: Array<{ bead_id: string, resolution_rounds: number, resolution?: ResolutionProjection|null, authority?: import('../../server/worker/queue-store.js').MergeAuthority|null, hold?: import('../../server/worker/queue-store.js').MergeHold|null, review_dispatch?: import('../../server/worker/queue-store.js').ReviewDispatchClaim|null }>, completion_status?: Record<string, CompletionStatus>, manual_merge_continuation?: { schema_version: number }, execution_defaults?: { supported: boolean, schema_version: number|null, source_commit: string|null, digest: string|null, session: Record<string, any>|null, orchestration: Record<string, any>|null }, bead_scope?: Record<string, { scope: string[], artifacts: string[] }|null> }} WorkerQueueSnapshot
 */
import {
  applyPatch as applyKeyedPatch,
  assembleWorkerQueue,
  canonicalJson,
  splitWorkerQueue
} from './keyed-patch.js';

/**
 * @returns {{ get: () => WorkerQueueSnapshot|null, setSnapshot: (body: import('./keyed-patch.js').WorkerQueueBody & { seq?: number }) => void, set: (q: WorkerQueueSnapshot|null) => void, applyPatch: (patch: import('./keyed-patch.js').KeyedPatch & { seq: number }) => boolean, clear: () => void, subscribe: (fn: () => void) => () => void }}
 */
export function createWorkerQueueStore() {
  /** @type {import('./keyed-patch.js').KeyedMap} */
  let keyed = new Map();
  /** @type {number|null} */
  let last_seq = null;
  /** @type {WorkerQueueSnapshot|null} */
  let queue = null;
  let canonical = canonicalJson(queue);
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

  /** @param {import('./keyed-patch.js').KeyedMap} next */
  function adopt(next) {
    const assembled = /** @type {WorkerQueueSnapshot} */ (
      assembleWorkerQueue(next).queue
    );
    const next_canonical = canonicalJson(assembled);
    keyed = next;
    if (canonical !== next_canonical) {
      queue = assembled;
      canonical = next_canonical;
      emit();
    }
  }

  function clear() {
    keyed = new Map();
    last_seq = null;
    if (queue !== null) {
      queue = null;
      canonical = canonicalJson(queue);
      emit();
    }
  }

  return {
    get() {
      return queue;
    },
    /** @param {import('./keyed-patch.js').WorkerQueueBody & { seq?: number }} body */
    setSnapshot(body) {
      const next = splitWorkerQueue(body);
      last_seq = body.seq ?? 1;
      adopt(next);
    },
    /** @param {WorkerQueueSnapshot|null} q */
    set(q) {
      if (q === null || q.revision < keyed.get('queue/revision')) {
        return;
      }
      const overlay = splitWorkerQueue({
        root_dir: keyed.get('root_dir') || '',
        queue: q
      });
      adopt(new Map([...keyed, ...overlay]));
    },
    /** @param {import('./keyed-patch.js').KeyedPatch & { seq: number }} patch */
    applyPatch(patch) {
      if (last_seq === null || patch.seq !== last_seq + 1) {
        clear();
        return false;
      }
      const next = applyKeyedPatch(keyed, patch);
      last_seq = patch.seq;
      adopt(next);
      return true;
    },
    clear,
    /** @param {() => void} fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}
