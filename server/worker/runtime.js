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
import { kvGetJson, kvSetJson } from '../bd.js';
import { createExecPresetStore } from '../exec-preset-store.js';
import { createActivityStore } from './activity-store.js';
import { createExecPresetCoordinator } from './exec-preset-coordinator.js';
import { createExternalPrStore } from './external-pr.js';
import { createGh } from './gh.js';
import { createLockManager } from './locks.js';
import { ANALYZER_RUNNERS } from './parallel-analysis-runner.js';
import { createParallelAnalysisStore } from './parallel-analysis-store.js';
import { createPrObservationStore } from './pr-observations.js';
import { createQueueStore } from './queue-store.js';
import { createReviseParkedStore } from './revise-parked.js';
import { createRunnableCache } from './runnable-cache.js';
import { runtimeCatalog } from './runner/index.js';
import { createSessionLog } from './session-log.js';
import { workspaceSlug } from './state-paths.js';
import { createTitleCache } from './title-cache.js';
import { createUsageStore } from './usage-store.js';

/**
 * @typedef {Object} WorkerRuntime
 * @property {ReturnType<typeof createQueueStore>} queueStore
 * @property {ReturnType<typeof createExecPresetCoordinator>} execPresetCoordinator
 * @property {ReturnType<typeof createLockManager>} locks
 * @property {ReturnType<typeof createGh>} gh
 * @property {ReturnType<typeof createPrObservationStore>} prObservations
 * @property {ReturnType<typeof createExternalPrStore>} externalPrs
 * @property {ReturnType<typeof createUsageStore>} usageStore
 * @property {ReturnType<typeof createActivityStore>} activityStore
 * @property {ReturnType<typeof createTitleCache>} titleCache
 * @property {ReturnType<typeof createRunnableCache>} runnableCache
 * @property {ReturnType<typeof createReviseParkedStore>} reviseParked
 * @property {ReturnType<typeof createSessionLog>} sessionLog
 * @property {ReturnType<typeof createParallelAnalysisStore>} parallelAnalysis
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
  const execPresetCoordinator = createExecPresetCoordinator({
    queueStore,
    presetStore: createExecPresetStore(),
    workspaceKeyFor: workspaceSlug,
    kvGet: (workspace, key) => kvGetJson(key, { cwd: workspace }),
    kvSet: (workspace, key, value) => kvSetJson(key, value, { cwd: workspace })
  });
  const locks = createLockManager();
  // Process-wide `gh` adapter: the availability probe memoizes per instance, so
  // one shared instance keeps the admission check to a single probe across every
  // workspace + (Phase 4) the PR poller.
  const gh = createGh();
  // Process-wide PR observation cache (worker-phase2 §4): the per-workspace PR
  // pollers WRITE here and the ws queue-snapshot decoration READS here, so both
  // must share one instance. Deliberately never persisted — see the module.
  const prObservations = createPrObservationStore();
  // Process-wide external PR registry (UI-7agi §1): the per-workspace scan
  // WRITES it, the PR poller and the ws queue-snapshot overlay READ it. Also
  // never persisted — bd is the source of truth and every scan re-derives it.
  const externalPrs = createExternalPrStore();
  // Process-wide live token-usage tally (UI-raqh §1): the scheduler WRITES it
  // off the runner stream and the ws queue-snapshot decoration READS it, so —
  // exactly like the observation cache — both must share one instance. Also
  // never persisted: the durable copy lands on the attempt at termination.
  const usageStore = createUsageStore();
  // Process-wide activity cache (UI-raqh §3/§4): the PR poller and the PR
  // actions WRITE what they are doing right now, the ws queue-snapshot
  // decoration READS it. Non-persistent — nothing is in flight after a restart.
  const activityStore = createActivityStore();
  // Process-wide bead title cache (UI-12k6): the ws queue-snapshot decoration
  // READS it and its own async `bd show` fill WRITES it. Non-persistent, and
  // display-only — see the module for why staleness is accepted here.
  const titleCache = createTitleCache();
  // Process-wide monitor runnable-candidate cache (UI-qrfo §4): the monitor
  // aggregation READS it and its own async `bd list` fill WRITES it. Also
  // non-persistent, and — like the title cache — display-only: the binding
  // eligibility verdict stays with `validateAdmission()` at placement time. The
  // ws monitor channel wires its subscriber count and push callback on the first
  // subscribe; an unwired cache is simply never asked.
  const runnableCache = createRunnableCache();
  // Process-wide REVISE-parking observation cache (UI-hs11 §3.1): the ws
  // queue-snapshot decoration READS it, its own async `bd show` fill WRITES it,
  // and the two disposition handlers re-verify through the same instance so a
  // click and a badge can never disagree about which bead is parked.
  const reviseParked = createReviseParkedStore();
  // Shared session-log broker: the scheduler's `attach` persists the raw stream
  // AND the ws `subscribe-session-log` handler follows live appends off the
  // same instance (spec §5.6).
  const sessionLog = createSessionLog();
  // Process-wide parallelism-analysis store (UI-04vo §9): server-global
  // settings, the per-workspace last-good cache, and the single-flight job
  // registry. Process memory is what makes single-flight true across every
  // connection, and what makes an on-disk job marker an orphan after a restart.
  const parallelAnalysis = createParallelAnalysisStore({
    // Only a selection the catalog offers AND a tool-free analyzer can execute
    // may be stored (UI-04vo §7). Without this the settings could name a model
    // the runner would refuse at spawn time, and the cache identity would
    // describe a run that can never happen.
    validateSelection: (selection) => {
      if (!ANALYZER_RUNNERS.has(selection.runner)) {
        return false;
      }
      let catalog;
      try {
        catalog = runtimeCatalog();
      } catch {
        return false;
      }
      const runner = catalog?.runners?.[selection.runner];
      return (
        !!runner &&
        Object.hasOwn(runner.models || {}, selection.model) &&
        Array.isArray(runner.efforts) &&
        runner.efforts.includes(selection.effort)
      );
    }
  });
  /** @type {() => number} */
  let runningCount = () => 0;

  return {
    queueStore,
    execPresetCoordinator,
    locks,
    gh,
    prObservations,
    externalPrs,
    usageStore,
    activityStore,
    titleCache,
    runnableCache,
    reviseParked,
    sessionLog,
    parallelAnalysis,
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
