/**
 * Shared Worker runtime singletons (spec §5).
 *
 * One process owns all Worker state, so the queue store, circuit breaker, lock
 * manager, and session-token registry are process-wide singletons. Both the WS
 * queue handlers and the REST surfaces (`/healthz`, merge-lock) read the SAME
 * instances here so their views stay coherent — a ws toggle of auto_advance is
 * immediately visible to `/healthz`, and a tripped breaker blocks the merge-lock
 * endpoint.
 *
 * NOTE (Phase 10 boundary): the live auto-dispatch loop that calls
 * `scheduler.tick()` is intentionally NOT triggered from the ws handlers in this
 * phase — Phase 9's contract is that toggling auto_advance persists the flag
 * without dispatching. The scheduler engine + all its parts are complete and
 * tested; a live loop attaches here via `setRunningCountProvider` and drives
 * `tick` with real deps. Until then `running_count` is 0.
 */
import { createBreaker } from './breaker.js';
import { createGh } from './gh.js';
import { createLockManager } from './locks.js';
import { createQueueStore } from './queue-store.js';
import { createSessionLog } from './session-log.js';
import { createTokenRegistry } from './session-tokens.js';

/**
 * @typedef {Object} WorkerRuntime
 * @property {ReturnType<typeof createBreaker>} breaker
 * @property {ReturnType<typeof createQueueStore>} queueStore
 * @property {ReturnType<typeof createLockManager>} locks
 * @property {ReturnType<typeof createGh>} gh
 * @property {ReturnType<typeof createTokenRegistry>} tokens
 * @property {ReturnType<typeof createSessionLog>} sessionLog
 * @property {{ isHeldBy: (token: string) => boolean, releaseAllForToken: (token: string) => boolean, takeHandover?: (attempt_id: string) => (() => void) | null } | null} mergeLock
 * @property {(ledger: { isHeldBy: (token: string) => boolean, releaseAllForToken: (token: string) => boolean, takeHandover?: (attempt_id: string) => (() => void) | null }) => void} setMergeLock
 * @property {(fn: () => number) => void} setRunningCountProvider
 * @property {(root_dir: string) => { auto_advance: boolean, running_count: number, breaker_tripped: boolean }} status
 */

/**
 * Build a fresh Worker runtime. The merge lock is breaker-aware (a tripped repo
 * refuses merge acquisition).
 *
 * @returns {WorkerRuntime}
 */
export function createWorkerRuntime() {
  const breaker = createBreaker();
  const queueStore = createQueueStore();
  const locks = createLockManager({
    isMergeBlocked: (repo) => breaker.isTripped(repo)
  });
  // Process-wide `gh` adapter: the availability probe memoizes per instance, so
  // one shared instance keeps the admission check to a single probe across every
  // workspace + (Phase 4) the PR poller.
  const gh = createGh();
  const tokens = createTokenRegistry();
  // Shared session-log broker: the scheduler's `attach` persists the raw stream
  // AND the ws `subscribe-session-log` handler follows live appends off the
  // same instance (spec §5.6).
  const sessionLog = createSessionLog();
  /** @type {() => number} */
  let runningCount = () => 0;
  /**
   * The merge-lock ledger (the merge-lock route's held-by-token accessor). The
   * session-side merge guard reads `isHeldBy(token)` through this; wired by the
   * app when the merge-lock router is mounted (spec §5.2, F3).
   *
   * @type {{ isHeldBy: (token: string) => boolean, releaseAllForToken: (token: string) => boolean, takeHandover?: (attempt_id: string) => (() => void) | null } | null}
   */
  let mergeLock = null;

  return {
    breaker,
    queueStore,
    locks,
    gh,
    tokens,
    sessionLog,
    get mergeLock() {
      return mergeLock;
    },
    /**
     * @param {{ isHeldBy: (token: string) => boolean, releaseAllForToken: (token: string) => boolean, takeHandover?: (attempt_id: string) => (() => void) | null }} ledger
     */
    setMergeLock(ledger) {
      mergeLock = ledger || null;
    },
    /**
     * @param {() => number} fn
     */
    setRunningCountProvider(fn) {
      runningCount = typeof fn === 'function' ? fn : () => 0;
    },
    /**
     * @param {string} root_dir
     * @returns {{ auto_advance: boolean, running_count: number, breaker_tripped: boolean }}
     */
    status(root_dir) {
      let auto_advance = false;
      try {
        auto_advance = !!queueStore.snapshot(root_dir).auto_advance;
      } catch {
        auto_advance = false;
      }
      return {
        auto_advance,
        running_count: runningCount(),
        breaker_tripped: breaker.anyTripped()
      };
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
