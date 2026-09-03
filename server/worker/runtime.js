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
import fs from 'node:fs';
import path from 'node:path';
import { kvGetJson, kvSetJson, runBdJsonProjected } from '../bd.js';
import { getConfig } from '../config.js';
import { createExecPresetStore } from '../exec-preset-store.js';
import { createActivityStore } from './activity-store.js';
import { createDelegationStore } from './delegation-store.js';
import { createDirectionInquiry } from './direction-inquiry.js';
import { createExecPresetCoordinator } from './exec-preset-coordinator.js';
import { createExternalPrStore } from './external-pr.js';
import { createGh } from './gh.js';
import { createLockManager } from './locks.js';
import { createNotifier } from './notify.js';
import { createPrObservationStore } from './pr-observations.js';
import { MANUAL_MERGE_CONTINUATION, createQueueStore } from './queue-store.js';
import { createResolveSession } from './resolve-session.js';
import { createReviseParkedStore } from './revise-parked.js';
import { createRunnableCache } from './runnable-cache.js';
import { createSessionLog } from './session-log.js';
import { workspaceSlug, workspaceStateDir } from './state-paths.js';
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
 * @property {ReturnType<typeof createDelegationStore>} delegationStore
 * @property {ReturnType<typeof createActivityStore>} activityStore
 * @property {ReturnType<typeof createTitleCache>} titleCache
 * @property {ReturnType<typeof createRunnableCache>} runnableCache
 * @property {ReturnType<typeof createReviseParkedStore>} reviseParked
 * @property {ReturnType<typeof createDirectionInquiry>} directionInquiry
 * @property {ReturnType<typeof createResolveSession>} resolveSession
 * @property {ReturnType<typeof createSessionLog>} sessionLog
 * @property {(fn: () => number) => void} setRunningCountProvider
 * @property {(root_dir: string) => { auto_advance: boolean, running_count: number, auto_merge: boolean, manual_merge_continuation: typeof MANUAL_MERGE_CONTINUATION }} status
 */

/**
 * Build a fresh Worker runtime.
 *
 * @returns {WorkerRuntime}
 */
export function createWorkerRuntime() {
  // Process-wide live subagent tally (UI-2mpn §5.2), on the same contract as
  // the usage store below. Built BEFORE the queue store because the terminal
  // settlement drains it into the durable patch in the same mutation.
  const delegationStore = createDelegationStore();
  const queueStore = createQueueStore({ delegationStore });
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
  // Process-wide parked-attempt inquiry trigger (UI-gjp2 §1). Process-wide
  // rather than per-attachment because its duplicate guard is a tmux pane
  // marker, which is one truth for the whole machine; the workspace it acts on
  // rides each call. Its own notifier instance carries the `awaitingUser`
  // transition — the title comes from the `bd show` the trigger already makes,
  // so no title cache has to be bound to it.
  const directionInquiry = createDirectionInquiry({
    getConfig,
    readAttempt: (workspace, attempt_id) =>
      queueStore.snapshot(workspace).attempts?.[attempt_id] ?? null,
    bd: {
      readIssue: async (workspace, bead_id) => {
        const result = await runBdJsonProjected(
          'show',
          ['show', bead_id, '--json'],
          { cwd: workspace, expected_id: bead_id }
        );
        return result.ok === true ? result.data : null;
      }
    },
    notifier: createNotifier({ getConfig })
  });
  // Process-wide `[세션에서 해결]` launcher (UI-jw27 §4). Process-wide for the
  // same reason as the trigger above — its duplicate guard is a tmux pane
  // marker, one truth for the whole machine — and it shares that trigger's bd
  // reader shape. No notifier: this launch is a click the user already made, so
  // the reply on their own socket IS the report.
  const resolveSession = createResolveSession({
    getConfig,
    bd: {
      readIssue: async (workspace, bead_id) => {
        const result = await runBdJsonProjected(
          'show',
          ['show', bead_id, '--json'],
          { cwd: workspace, expected_id: bead_id }
        );
        return result.ok === true ? result.data : null;
      }
    }
  });
  // Shared session-log broker: the scheduler's `attach` persists the raw stream
  // AND the ws `subscribe-session-log` handler follows live appends off the
  // same instance (spec §5.6).
  // `onBeadWrite` closes the freshness loop the other way (UI-eey2 §9.2): a
  // RUNNING session's own `bd update|close|dep` is a write this server never
  // made, so only the session log can see it. Expiring the record on the
  // command's COMPLETION — never on its start — is what keeps a refill from
  // reading the pre-write value back.
  const sessionLog = createSessionLog({
    onBeadWrite: (workspace, bead_id) => titleCache.expire(workspace, bead_id),
    // A session spawned outside the scheduler writes its transcript beside its
    // own marker rather than under `sessions/` (UI-hk74 §7). The attempt record
    // POINTS at the file; the drawer reads it in place and nothing is ever
    // copied.
    //
    // Containment is checked here rather than in the log module because this is
    // the trust boundary: the path comes out of durable state, and a reader
    // that followed it anywhere would turn `queue.json` into a file-read
    // primitive. Outside the workspace's own state dir the record is ignored
    // and the default path answers, which reads as an empty transcript.
    attemptLogPath: (workspace, attempt_id) => {
      /** @type {any} */
      let attempt;
      try {
        attempt = queueStore.snapshot(workspace).attempts?.[attempt_id];
      } catch {
        return null;
      }
      const recorded = attempt?.log_path;
      if (typeof recorded !== 'string' || recorded.length === 0) {
        return null;
      }
      // Containment is judged on CANONICAL paths, never on the lexical ones
      // (UI-hk74 review F4): `path.resolve` collapses `..` but follows no
      // link, so a symlink written inside the state directory would pass a
      // string-prefix test while pointing at any file the server can read.
      // Resolving both sides through `realpath` removes every link from the
      // comparison AND from the path the reader is handed back.
      /** @type {string} */
      let root;
      /** @type {string} */
      let resolved;
      try {
        root = fs.realpathSync(workspaceStateDir(workspace));
        resolved = fs.realpathSync(recorded);
      } catch {
        // Absent file, unreadable directory, or a broken link: fail quiet to
        // the default session-log path, exactly as an unrecorded log does.
        return null;
      }
      return resolved === root || resolved.startsWith(`${root}${path.sep}`)
        ? resolved
        : null;
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
    delegationStore,
    activityStore,
    titleCache,
    runnableCache,
    reviseParked,
    directionInquiry,
    resolveSession,
    sessionLog,
    /**
     * @param {() => number} fn
     */
    setRunningCountProvider(fn) {
      runningCount = typeof fn === 'function' ? fn : () => 0;
    },
    /**
     * @param {string} root_dir
     * @returns {{ auto_advance: boolean, running_count: number, auto_merge: boolean, manual_merge_continuation: typeof MANUAL_MERGE_CONTINUATION }}
     */
    status(root_dir) {
      let auto_advance = false;
      let auto_merge = false;
      try {
        const snapshot = queueStore.snapshot(root_dir);
        auto_advance = !!snapshot.auto_advance;
        auto_merge = snapshot.auto_merge === true;
      } catch {
        auto_advance = false;
        auto_merge = false;
      }
      // `auto_merge` and the manual-continuation capability are INDEPENDENT
      // fields by contract (UI-58w8 §8): the toggle is workspace state from
      // the actual queue store, the capability is the queue schema's own
      // constant — health never authors a meaning of its own.
      return {
        auto_advance,
        running_count: runningCount(),
        auto_merge,
        manual_merge_continuation: MANUAL_MERGE_CONTINUATION
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
