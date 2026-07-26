/**
 * Shared Worker runtime singletons (spec §5).
 *
 * One process owns all Worker state, so the queue store, lock manager, `gh`
 * adapter, and session-log broker are process-wide singletons. Both the WS queue
 * handlers and `/healthz` read the SAME instances here so their views stay
 * coherent — a ws toggle of auto_advance is immediately visible to `/healthz`.
 *
 * NOTE (Phase 10 boundary): the live auto-dispatch loop that calls
 * `scheduler.tick()` is intentionally NOT triggered from the ws handlers in this
 * phase — Phase 9's contract is that toggling auto_advance persists the flag
 * without dispatching. The scheduler engine + all its parts are complete and
 * tested; a live loop attaches here via `setRunningCountProvider` and drives
 * `tick` with real deps. Until then `running_count` is 0.
 */
import { createGh } from './gh.js';
import { createLockManager } from './locks.js';
import { createQueueStore } from './queue-store.js';
import { createSessionLog } from './session-log.js';

/**
 * @typedef {Object} WorkerRuntime
 * @property {ReturnType<typeof createQueueStore>} queueStore
 * @property {ReturnType<typeof createLockManager>} locks
 * @property {ReturnType<typeof createGh>} gh
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
