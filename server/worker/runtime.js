/**
 * Shared Worker runtime singletons (spec §5).
 *
 * One process owns all Worker state, so the queue store, lock manager, `gh`
 * adapter, and session-log broker are process-wide singletons. Both the WS queue
 * handlers and `/healthz` read the SAME instances here so their views stay
 * coherent — a ws toggle of auto_advance is immediately visible to `/healthz`.
 *
 * The live auto-dispatch loop lives on the per-workspace attachment
 * (`worker/attach.js`), not here. The ws handlers kick it through
 * `tickWorkerQueue` on the two events that can newly fill a slot — auto_advance
 * turned ON and a successful queue placement (the only dispatch path a discarded
 * bead has, discard spec §1). Without a registered attachment those kicks are
 * inert and `running_count` stays 0.
 */
import { createActivityStore } from './activity-store.js';
import { createGh } from './gh.js';
import { createLockManager } from './locks.js';
import { createPrObservationStore } from './pr-observations.js';
import { createQueueStore } from './queue-store.js';
import { createSessionLog } from './session-log.js';
import { createUsageStore } from './usage-store.js';

/**
 * @typedef {Object} WorkerRuntime
 * @property {ReturnType<typeof createQueueStore>} queueStore
 * @property {ReturnType<typeof createLockManager>} locks
 * @property {ReturnType<typeof createGh>} gh
 * @property {ReturnType<typeof createPrObservationStore>} prObservations
 * @property {ReturnType<typeof createUsageStore>} usageStore
 * @property {ReturnType<typeof createActivityStore>} activityStore
 * @property {ReturnType<typeof createSessionLog>} sessionLog
 * @property {(fn: () => number) => void} setRunningCountProvider
 * @property {(root_dir: string) => { auto_advance: boolean, running_count: number }} status
 */

/**
 * Build a fresh Worker runtime.
 *
 * @returns {WorkerRuntime}
 */
export function createWorkerRuntime() {
  const queueStore = createQueueStore();
  const locks = createLockManager();
  // Process-wide `gh` adapter: the availability probe memoizes per instance, so
  // one shared instance keeps the admission check to a single probe across every
  // workspace + (Phase 4) the PR poller.
  const gh = createGh();
  // Process-wide PR observation cache (worker-phase2 §4): the per-workspace PR
  // pollers WRITE here and the ws queue-snapshot decoration READS here, so both
  // must share one instance. Deliberately never persisted — see the module.
  const prObservations = createPrObservationStore();
  // Process-wide live token-usage tally (UI-raqh §1): the scheduler WRITES it
  // off the runner stream and the ws queue-snapshot decoration READS it, so —
  // exactly like the observation cache — both must share one instance. Also
  // never persisted: the durable copy lands on the attempt at termination.
  const usageStore = createUsageStore();
  // Process-wide activity cache (UI-raqh §3/§4): the PR poller and the PR
  // actions WRITE what they are doing right now, the ws queue-snapshot
  // decoration READS it. Non-persistent — nothing is in flight after a restart.
  const activityStore = createActivityStore();
  // Shared session-log broker: the scheduler's `attach` persists the raw stream
  // AND the ws `subscribe-session-log` handler follows live appends off the
  // same instance (spec §5.6).
  const sessionLog = createSessionLog();
  /** @type {() => number} */
  let runningCount = () => 0;

  return {
    queueStore,
    locks,
    gh,
    prObservations,
    usageStore,
    activityStore,
    sessionLog,
    /**
     * @param {() => number} fn
     */
    setRunningCountProvider(fn) {
      runningCount = typeof fn === 'function' ? fn : () => 0;
    },
    /**
     * @param {string} root_dir
     * @returns {{ auto_advance: boolean, running_count: number }}
     */
    status(root_dir) {
      let auto_advance = false;
      try {
        auto_advance = !!queueStore.snapshot(root_dir).auto_advance;
      } catch {
        auto_advance = false;
      }
      return { auto_advance, running_count: runningCount() };
    }
  };
}

/** @type {WorkerRuntime|null} */
let RUNTIME = null;

/**
 * Get (lazily creating) the process-wide Worker runtime.
 *
 * @returns {WorkerRuntime}
 */
export function getWorkerRuntime() {
  if (!RUNTIME) {
    RUNTIME = createWorkerRuntime();
  }
  return RUNTIME;
}

/**
 * Test-only: drop the singleton so the next access rebuilds fresh state.
 */
export function __resetWorkerRuntimeForTest() {
  RUNTIME = null;
}
