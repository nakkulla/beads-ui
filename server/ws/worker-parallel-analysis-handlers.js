/**
 * Parallelism-analysis WebSocket channel (UI-04vo §5/§9).
 *
 * The analyzer runs ONLY on an explicit start: nothing here is wired to queue
 * placement, reorder, or auto-advance, so the ordinary lane paths never call a
 * model. A run pins a snapshot, bundles PINNED blobs, streams them to a
 * tool-free runner, and only a result that passes the full validator becomes
 * the workspace's last-good cache.
 *
 * The submit path is the security boundary: it re-derives the pinned snapshot,
 * re-checks the digest, re-judges group eligibility with the SAME function the
 * validator stamped, and converges through one queue CAS. Every refusal is
 * all-or-nothing and touches neither bd nor the repository.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import fs from 'node:fs';
import path from 'node:path';
import { makeError, makeOk } from '../../app/protocol.js';
import { workerAnalysisContext } from '../worker/attach.js';
import { collectAnalysisBundle } from '../worker/parallel-analysis-bundle.js';
import {
  analyzerModelId,
  buildAnalysisPayload,
  runAnalysis as realRunAnalysis
} from '../worker/parallel-analysis-runner.js';
import { parallelAnalysisPromptPath } from '../worker/parallel-analysis-runs.js';
import { analysisIdentityOf } from '../worker/parallel-analysis-store.js';
import {
  collectAnalysisSnapshot,
  describeAnalysisTargets
} from '../worker/parallel-analysis-targets.js';
import {
  isGroupEligible,
  validateAnalysisResult
} from '../worker/parallel-analysis-validator.js';
import { runtimeCatalog } from '../worker/runner/index.js';
import { analyzerSelectionValid, getWorkerRuntime } from '../worker/runtime.js';
import { sessionLogPath } from '../worker/state-paths.js';
import { log, runBdJsonProjectedInWorkspace } from './context.js';
import { decorateQueue, fanout as fanoutQueue } from './worker-handlers.js';
import { targetWorkspaceOf } from './workspace-target.js';

const DEFAULT_CLIENT_ID = 'worker:parallel-analysis';

/** @type {Map<string, Set<{ ws: WebSocket, client_id: string }>>} */
const SUBSCRIBERS = new Map();

/** @type {Map<string, Set<string>>} */
const ACTIVE_RUN_IDS = new Map();

/**
 * Injected collaborators. Tests replace all three so no real `bd`, git, or
 * model process is ever launched. The optional `validateSelection` lets a test
 * present a catalog that no longer carries a model without editing the
 * machine's config file.
 *
 * @type {{ listIssues: (ws: WebSocket, workspace: string) => Promise<any[]>, analysisContext: (workspace: string) => any, runAnalysis: (input: any) => { done: Promise<any>, cancel: () => void }, validateSelection?: (selection: any) => boolean, catalog?: any }|null}
 */
let TEST_DEPS = null;

/**
 * @param {any} deps - Null restores the real collaborators.
 */
export function __setAnalysisDepsForTest(deps) {
  TEST_DEPS = deps;
  if (deps === null) {
    ACTIVE_RUN_IDS.clear();
  }
}

/** @returns {ReturnType<typeof getWorkerRuntime>['parallelAnalysis']} */
function analysisStore() {
  return getWorkerRuntime().parallelAnalysis;
}

/** @returns {ReturnType<typeof getWorkerRuntime>['queueStore']} */
function queueStore() {
  return getWorkerRuntime().queueStore;
}

/** @returns {ReturnType<typeof getWorkerRuntime>['parallelAnalysisRuns']} */
function analysisRunsStore() {
  return getWorkerRuntime().parallelAnalysisRuns;
}

/**
 * Run ids still owned by this process, including the validation window after
 * the child exits but before its durable outcome is final.
 *
 * @param {string} workspace
 * @param {string|null} [job_id]
 * @returns {Set<string>}
 */
function activeRunIds(workspace, job_id = null) {
  const active = new Set(ACTIVE_RUN_IDS.get(workspace) || []);
  if (job_id !== null) {
    active.add(job_id);
  }
  return active;
}

/**
 * @param {RequestEnvelope} req
 * @returns {string}
 */
function clientIdOf(req) {
  const raw = /** @type {any} */ (req.payload)?.id;
  return typeof raw === 'string' && raw.length > 0 ? raw : DEFAULT_CLIENT_ID;
}

/**
 * @param {string} key
 * @returns {Set<{ ws: WebSocket, client_id: string }>}
 */
function subscribersFor(key) {
  let set = SUBSCRIBERS.get(key);
  if (!set) {
    set = new Set();
    SUBSCRIBERS.set(key, set);
  }
  return set;
}

/**
 * The resolved catalog handed to the analyzer, or null when it cannot be read.
 *
 * @returns {any}
 */
function analyzerCatalog() {
  if (TEST_DEPS && Object.hasOwn(TEST_DEPS, 'catalog')) {
    return TEST_DEPS.catalog;
  }
  try {
    return runtimeCatalog();
  } catch {
    return null;
  }
}

/**
 * Whether the given selection can run against the current catalog. Injectable
 * so a test can shrink the catalog without touching the machine's config file.
 *
 * @param {{ runner: string, model: string, effort: string }} selection
 * @param {any} [catalog]
 * @returns {boolean}
 */
function selectionRunnable(selection, catalog = analyzerCatalog()) {
  if (TEST_DEPS && typeof TEST_DEPS.validateSelection === 'function') {
    return TEST_DEPS.validateSelection(selection) === true;
  }
  return analyzerSelectionValid(catalog, selection);
}

/**
 * The channel's public snapshot: the EFFECTIVE settings (stored, or the
 * default marked `is_default`) with a `compatible` flag, the active job (if
 * any), and the workspace's last-good validated result with its identity
 * digest.
 *
 * `compatible` travels with the settings rather than replacing them: a stored
 * selection the catalog dropped must still be SHOWN, or the reader cannot see
 * what to fix (UI-yqw9 §2.1).
 *
 * @param {string} workspace
 */
function snapshotFor(workspace) {
  const store = analysisStore();
  const cache = store.readCache(workspace);
  const settings = store.effectiveSettings();
  const job = store.activeJob(workspace);
  return {
    settings: { ...settings, compatible: selectionRunnable(settings) },
    job,
    runs: analysisRunsStore().read(
      workspace,
      activeRunIds(workspace, job?.job_id || null)
    ),
    last_good: cache.last_good
      ? {
          identity_digest: cache.last_good.identity,
          at: cache.last_good.at,
          result: cache.last_good.result,
          target_ids: cache.last_good.target_ids
        }
      : null
  };
}

/**
 * Open the server-owned analysis transcript writer and live broker bridge.
 *
 * @param {string} workspace
 * @param {string} run_id
 * @param {(session_id: string) => void} onSessionId
 */
function createSessionRecorder(workspace, run_id, onSessionId) {
  /** @type {fs.WriteStream|null} */
  let stream = null;
  try {
    const file = sessionLogPath(workspace, run_id);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    stream = fs.createWriteStream(file, { flags: 'a' });
    stream.on('error', () => {});
  } catch {
    stream = null;
  }
  return {
    /**
     * @param {string} line
     */
    onLine(line) {
      if (stream && !stream.destroyed) {
        try {
          stream.write(`${line}\n`);
        } catch {
          stream = null;
        }
      }
      /** @type {unknown} */
      let event = line;
      try {
        event = JSON.parse(line);
      } catch {
        // Malformed progress still belongs in the raw transcript and broker.
      }
      try {
        getWorkerRuntime().sessionLog.publish(workspace, run_id, event);
      } catch {
        // A broken live subscriber must not affect the analysis.
      }
      if (!event || typeof event !== 'object') {
        return;
      }
      const record = /** @type {Record<string, any>} */ (event);
      const session_id =
        record.type === 'system' && record.subtype === 'init'
          ? record.session_id
          : record.type === 'thread.started'
            ? record.thread_id
            : null;
      if (typeof session_id === 'string' && session_id.length > 0) {
        onSessionId(session_id);
      }
    },

    /**
     * Finish pending transcript writes.
     *
     * @returns {Promise<void>}
     */
    close() {
      if (!stream || stream.destroyed) {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        const output = /** @type {fs.WriteStream} */ (stream);
        let settled = false;
        /** Resolve once, whether the flush ended cleanly or errored. */
        function finish() {
          if (settled) {
            return;
          }
          settled = true;
          resolve();
        }
        output.once('error', finish);
        output.end(finish);
      });
    }
  };
}

/**
 * @param {ReturnType<typeof createSessionRecorder>|null} recorder
 */
async function closeSessionRecorder(recorder) {
  if (recorder) {
    await recorder.close();
  }
}

/**
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {string} workspace
 */
function emitSnapshot(ws, client_id, workspace) {
  try {
    ws.send(
      JSON.stringify({
        id: `evt-${Date.now()}`,
        ok: true,
        type: 'worker-parallel-analysis-snapshot',
        payload: {
          type: 'worker-parallel-analysis-snapshot',
          id: client_id,
          root_dir: workspace,
          ...snapshotFor(workspace)
        }
      })
    );
  } catch {
    // One disconnected subscriber must not stop the fanout.
  }
}

/**
 * @param {string} workspace
 */
function fanout(workspace) {
  for (const subscriber of subscribersFor(workspace)) {
    emitSnapshot(subscriber.ws, subscriber.client_id, workspace);
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @returns {string|null}
 */
function workspaceOf(ws, req) {
  const key = targetWorkspaceOf(ws, req.payload);
  if (key === null) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload.root_dir must be an absolute path in the available workspace list'
        )
      )
    );
  }
  return key;
}

/**
 * Every analyzable issue in the workspace. Read through `bd list --json` so
 * qualification sees dependencies and metadata; a failure yields an empty set
 * rather than a partial one.
 *
 * @param {WebSocket} ws
 * @param {string} workspace
 * @returns {Promise<any[]>}
 */
async function listIssues(ws, workspace) {
  if (TEST_DEPS) {
    return TEST_DEPS.listIssues(ws, workspace);
  }
  try {
    const result = await runBdJsonProjectedInWorkspace(ws, 'list', [
      'list',
      '--json',
      '--limit',
      '1000'
    ]);
    const rows = result && result.ok === true ? result.data : null;
    return Array.isArray(rows) ? rows : [];
  } catch (err) {
    log('parallel analysis issue list failed for %s: %o', workspace, err);
    return [];
  }
}

/**
 * Build the pinned snapshot for a workspace, or a refusal reason.
 *
 * @param {WebSocket} ws
 * @param {string} workspace
 * @param {string[]|undefined} target_ids
 * @returns {Promise<{ ok: true, snapshot: any, gitRun: any }|{ ok: false, reason: string, detail?: string[] }>}
 */
async function buildSnapshot(ws, workspace, target_ids) {
  const context = TEST_DEPS
    ? TEST_DEPS.analysisContext(workspace)
    : workerAnalysisContext(workspace);
  if (!context) {
    return { ok: false, reason: 'workspace_inactive' };
  }
  let base;
  try {
    base = await context.resolveBase({ force: false });
  } catch {
    return { ok: false, reason: 'base_unresolved' };
  }
  if (!base || base.ok !== true) {
    return { ok: false, reason: 'base_unresolved' };
  }
  const issues = await listIssues(ws, workspace);
  const collected = await collectAnalysisSnapshot({
    workspace,
    issues,
    queue: queueStore().snapshot(workspace),
    base: { ref: base.base, sha: base.base_oid },
    gitRun: context.gitRun,
    ...(Array.isArray(target_ids) ? { target_ids } : {})
  });
  return collected.ok
    ? { ok: true, snapshot: collected.snapshot, gitRun: context.gitRun }
    : {
        ok: false,
        reason: String(collected.reason),
        ...(Array.isArray(collected.detail) ? { detail: collected.detail } : {})
      };
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeParallelAnalysis(ws, req) {
  const key = workspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const client_id = clientIdOf(req);
  const set = subscribersFor(key);
  for (const subscriber of set) {
    if (subscriber.ws === ws && subscriber.client_id === client_id) {
      set.delete(subscriber);
    }
  }
  set.add({ ws, client_id });
  ws.send(JSON.stringify(makeOk(req, { id: client_id, root_dir: key })));
  emitSnapshot(ws, client_id, key);
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeParallelAnalysis(ws, req) {
  const key = workspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const client_id = clientIdOf(req);
  const set = subscribersFor(key);
  let removed = false;
  for (const subscriber of set) {
    if (subscriber.ws === ws && subscriber.client_id === client_id) {
      set.delete(subscriber);
      removed = true;
    }
  }
  ws.send(
    JSON.stringify(makeOk(req, { id: client_id, unsubscribed: removed }))
  );
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleParallelAnalysisSnapshot(ws, req) {
  const key = workspaceOf(ws, req);
  if (key === null) {
    return;
  }
  ws.send(JSON.stringify(makeOk(req, snapshotFor(key))));
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleParallelAnalysisTargets(ws, req) {
  const key = workspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const issues = await listIssues(ws, key);
  ws.send(
    JSON.stringify(
      makeOk(req, describeAnalysisTargets(issues, queueStore().snapshot(key)))
    )
  );
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleParallelAnalysisPrompt(ws, req) {
  const key = workspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const run_id = /** @type {any} */ (req.payload || {}).run_id;
  if (typeof run_id !== 'string') {
    ws.send(
      JSON.stringify(makeError(req, 'bad_request', 'payload.run_id required'))
    );
    return;
  }
  const job = analysisStore().activeJob(key);
  const run = analysisRunsStore()
    .read(key, activeRunIds(key, job?.job_id || null))
    .find((entry) => entry.run_id === run_id);
  if (!run) {
    ws.send(JSON.stringify(makeOk(req, { ok: false, reason: 'not_found' })));
    return;
  }
  try {
    const prompt = fs.readFileSync(
      parallelAnalysisPromptPath(key, run_id),
      'utf8'
    );
    ws.send(JSON.stringify(makeOk(req, { ok: true, prompt })));
  } catch {
    ws.send(JSON.stringify(makeOk(req, { ok: false, reason: 'not_found' })));
  }
}

/**
 * Start (or serve from cache) one analysis. The ONLY path that launches a
 * model process — and only after an explicit click reaches this handler.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleParallelAnalysisStart(ws, req) {
  const key = workspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const p = /** @type {any} */ (req.payload || {});
  const force = p.force === true;
  if (
    Object.hasOwn(p, 'target_ids') &&
    (!Array.isArray(p.target_ids) ||
      p.target_ids.some(
        (/** @type {unknown} */ target_id) => typeof target_id !== 'string'
      ))
  ) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload.target_ids must be a string[]')
      )
    );
    return;
  }
  const target_ids = Array.isArray(p.target_ids) ? p.target_ids : undefined;
  const store = analysisStore();
  const settings = store.effectiveSettings();
  const catalog = analyzerCatalog();
  if (!selectionRunnable(settings, catalog)) {
    // Re-validated HERE, not only at save time (UI-yqw9 §2.1): the catalog can
    // move under a stored selection. The refusal happens before the snapshot,
    // the bundle, and any spawn — and never picks a substitute. The reason
    // splits on where the effective selection came from, because the two need
    // different repairs.
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          reason: settings.is_default
            ? 'settings_missing'
            : 'settings_incompatible'
        })
      )
    );
    return;
  }
  const model_id =
    settings.runner === 'codex'
      ? analyzerModelId(catalog, settings.runner, settings.model)
      : settings.model;
  if (!model_id) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          reason: settings.is_default
            ? 'settings_missing'
            : 'settings_incompatible'
        })
      )
    );
    return;
  }
  const built = await buildSnapshot(ws, key, target_ids);
  if (!built.ok) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          reason: built.reason,
          ...(Array.isArray(built.detail) ? { detail: built.detail } : {})
        })
      )
    );
    return;
  }
  const snapshot = built.snapshot;
  const identity = analysisIdentityOf({
    snapshot,
    runner: settings.runner,
    model: settings.model,
    model_id,
    effort: settings.effort
  });
  const cache = store.readCache(key);
  if (!force && cache.last_good && cache.last_good.identity === identity) {
    ws.send(
      JSON.stringify(makeOk(req, { applied: true, cached: true, identity }))
    );
    return;
  }
  const bundle = await collectAnalysisBundle({
    snapshot,
    gitRun: built.gitRun
  });
  const payload = buildAnalysisPayload({
    bundle_dir: bundle.dir,
    manifest: bundle.manifest,
    snapshot
  });
  const selection = {
    runner: String(settings.runner),
    model: String(settings.model),
    effort: String(settings.effort)
  };
  /** @type {ReturnType<typeof createSessionRecorder>|null} */
  let session_recorder = null;
  /** @type {string|null} */
  let pending_session_id = null;
  let owns_run = false;
  const job = /** @type {any} */ (
    store.startJob(key, {
      identity,
      selection,
      start: (/** @type {string} */ job_id) => {
        owns_run = true;
        let active = ACTIVE_RUN_IDS.get(key);
        if (!active) {
          active = new Set();
          ACTIVE_RUN_IDS.set(key, active);
        }
        active.add(job_id);
        let prompt_saved = false;
        try {
          const prompt_path = parallelAnalysisPromptPath(key, job_id);
          fs.mkdirSync(path.dirname(prompt_path), { recursive: true });
          fs.writeFileSync(prompt_path, payload);
          prompt_saved = true;
        } catch {
          prompt_saved = false;
        }
        analysisRunsStore().create(key, {
          run_id: job_id,
          session_id: null,
          runner: selection.runner,
          model: selection.model,
          model_id,
          effort: selection.effort,
          target_ids: [...snapshot.target_ids],
          snapshot_digest: snapshot.digest,
          identity,
          started_at: Date.now(),
          ended_at: null,
          outcome: 'running',
          reason: null,
          diagnostic: null,
          prompt_saved
        });
        let observed_session_id = '';
        session_recorder = createSessionRecorder(key, job_id, (session_id) => {
          if (session_id === observed_session_id) {
            return;
          }
          observed_session_id = session_id;
          analysisRunsStore().update(key, job_id, { session_id });
          if (store.setJobSessionId(key, job_id, session_id)) {
            fanout(key);
          } else {
            pending_session_id = session_id;
          }
        });
        return (TEST_DEPS ? TEST_DEPS.runAnalysis : realRunAnalysis)({
          ...selection,
          model_id,
          // The analyzer verifies the pinned CLI model id against this same
          // catalog allowlist before spawning. The cache identity and spawned
          // model therefore use exactly the same value (UI-yqw9 §1.2).
          catalog,
          bundle_dir: bundle.dir,
          payload,
          onStreamLine: session_recorder.onLine,
          manifest: bundle.manifest,
          snapshot
        });
      }
    })
  );
  if (job.ok === false) {
    // Another identity is mid-flight: serving its result under this identity
    // would cache a run the caller never asked for (UI-04vo §9).
    bundle.cleanup();
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          reason: job.reason,
          job_id: job.job_id
        })
      )
    );
    return;
  }
  if (pending_session_id !== null) {
    store.setJobSessionId(key, job.job_id, pending_session_id);
  }
  if (owns_run) {
    const active_job = store.activeJob(key);
    if (active_job) {
      analysisRunsStore().update(key, job.job_id, {
        started_at: active_job.started_at
      });
    }
  }
  fanout(key);
  // The bundle outlives the run: evidence locators are checked against the
  // materialized bytes the model was actually given, so cleanup happens only
  // after validation has read them.
  try {
    const outcome = await job.done;
    if (!outcome || outcome.ok !== true) {
      // Cancel, timeout, spawn failure and a non-zero exit all land here: the
      // last-good cache is deliberately untouched (UI-04vo §9).
      const reason = outcome?.reason || 'run_failed';
      analysisRunsStore().update(key, job.job_id, {
        ended_at: Date.now(),
        outcome: reason === 'cancelled' ? 'cancelled' : 'failure',
        reason,
        diagnostic:
          typeof outcome?.diagnostic === 'string'
            ? outcome.diagnostic.slice(0, 200)
            : null
      });
      ws.send(
        JSON.stringify(
          makeOk(req, {
            applied: false,
            reason,
            job_id: job.job_id
          })
        )
      );
      fanout(key);
      return;
    }
    const verdict = validateAnalysisResult({
      result: outcome.result,
      snapshot,
      manifest: bundle.manifest,
      readBundleFile: (/** @type {string} */ file) => {
        try {
          return fs.readFileSync(path.join(bundle.dir, file), 'utf8');
        } catch {
          return null;
        }
      }
    });
    if (!verdict.ok) {
      analysisRunsStore().update(key, job.job_id, {
        ended_at: Date.now(),
        outcome: 'failure',
        reason: verdict.reason,
        diagnostic: null
      });
      ws.send(
        JSON.stringify(
          makeOk(req, {
            applied: false,
            reason: verdict.reason,
            detail: verdict.detail || null
          })
        )
      );
      fanout(key);
      return;
    }
    store.saveLastGood(key, {
      identity,
      result: verdict.result,
      target_ids: snapshot.target_ids
    });
    analysisRunsStore().update(key, job.job_id, {
      ended_at: Date.now(),
      outcome: 'success',
      reason: null,
      diagnostic: null
    });
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: true,
          cached: false,
          identity,
          job_id: job.job_id
        })
      )
    );
    fanout(key);
  } finally {
    await closeSessionRecorder(session_recorder);
    if (owns_run) {
      const active = ACTIVE_RUN_IDS.get(key);
      active?.delete(job.job_id);
      if (active && active.size === 0) {
        ACTIVE_RUN_IDS.delete(key);
      }
    }
    bundle.cleanup();
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleParallelAnalysisCancel(ws, req) {
  const key = workspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const job_id = /** @type {any} */ (req.payload || {}).job_id;
  const cancelled =
    typeof job_id === 'string' ? analysisStore().cancelJob(key, job_id) : false;
  ws.send(JSON.stringify(makeOk(req, { cancelled })));
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleParallelAnalysisSettingsUpdate(ws, req) {
  const key = workspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const p = /** @type {any} */ (req.payload || {});
  if (
    !Number.isInteger(p.expected_revision) ||
    typeof p.runner !== 'string' ||
    typeof p.model !== 'string' ||
    typeof p.effort !== 'string'
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { expected_revision, runner, model, effort }'
        )
      )
    );
    return;
  }
  const result = analysisStore().updateSettings({
    expected_revision: p.expected_revision,
    runner: p.runner,
    model: p.model,
    effort: p.effort
  });
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: result.ok,
        conflict: result.conflict === true,
        reason: result.reason || null,
        settings: result.settings
      })
    )
  );
  if (result.ok) {
    fanout(key);
  }
}

/**
 * Submit one edited group draft into a serial lane (UI-04vo §9).
 *
 * Every check runs HERE, on the server, against the pinned last-good result —
 * the client's draft is an input, never an authority. Eligibility is re-judged
 * with {@link isGroupEligible}, the same function the validator stamped with,
 * so the overlay, the button, and this gate can never disagree. The move is
 * one queue CAS: any refusal leaves the queue, bd, and the repository
 * untouched.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleParallelAnalysisSubmit(ws, req) {
  const key = workspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const p = /** @type {any} */ (req.payload || {});
  if (
    typeof p.snapshot_digest !== 'string' ||
    !Number.isInteger(p.group_index) ||
    typeof p.lane !== 'string' ||
    !Array.isArray(p.ordered_bead_ids) ||
    !Number.isInteger(p.expected_revision)
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { snapshot_digest, group_index, lane, ordered_bead_ids, expected_revision }'
        )
      )
    );
    return;
  }
  /**
   * @param {string} reason
   */
  const workspace = key;
  function refuse(/** @type {string} */ reason) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          reason,
          queue: decorateQueue(workspace, queueStore().snapshot(workspace))
        })
      )
    );
  }
  const cache = analysisStore().readCache(key);
  if (!cache.last_good || cache.last_good.identity !== p.snapshot_digest) {
    refuse('stale_digest');
    return;
  }
  const group = cache.last_good.result?.groups?.[p.group_index];
  if (!group) {
    refuse('group_missing');
    return;
  }
  if (!isGroupEligible(group)) {
    refuse('group_ineligible');
    return;
  }
  const members = new Set(group.members);
  if (
    p.ordered_bead_ids.length < 2 ||
    new Set(p.ordered_bead_ids).size !== p.ordered_bead_ids.length ||
    p.ordered_bead_ids.some((/** @type {unknown} */ id) => !members.has(id))
  ) {
    refuse('member_mismatch');
    return;
  }
  const built = await buildSnapshot(
    ws,
    key,
    Array.isArray(cache.last_good.target_ids)
      ? cache.last_good.target_ids
      : undefined
  );
  if (!built.ok) {
    refuse(String(built.reason));
    return;
  }
  if (built.snapshot.digest !== cache.last_good.result.snapshot_digest) {
    // The pinned inputs moved since the result was produced; a submit built on
    // the stale reading is refused rather than silently applied.
    refuse('snapshot_drift');
    return;
  }
  /** @type {{ blocker: string, blockee: string }[]} */
  const blocks_edges = [];
  for (const bead_id of p.ordered_bead_ids) {
    for (const blocker of built.snapshot.targets[bead_id]?.deps || []) {
      if (p.ordered_bead_ids.includes(blocker)) {
        blocks_edges.push({ blocker, blockee: bead_id });
      }
    }
  }
  const result = queueStore().applySerialGroup(key, {
    expected_revision: p.expected_revision,
    lane: p.lane,
    ordered_bead_ids: p.ordered_bead_ids,
    blocks_edges
  });
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: result.ok,
        conflict: result.conflict === true,
        reason: result.ok ? null : result.reason || 'rejected',
        queue: decorateQueue(key, result.queue)
      })
    )
  );
  if (result.ok) {
    fanoutQueue(key, result.queue);
  }
}
