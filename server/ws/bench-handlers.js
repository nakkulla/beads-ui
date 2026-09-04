/**
 * Bench experiment channel (preset-compare §4.3·§4.7).
 *
 * Two request/response pairs and no push: `bench-run-create` builds one
 * experiment's clones and its manifest, `bench-run-list` returns the manifests
 * of the selected workspace with each cell's state PROJECTED from that clone's
 * own attempt records. There is no second result ledger, so the list is always
 * as fresh as the attempt history it reads and never has to be reconciled with
 * it.
 *
 * Creation is fail-closed as one unit: the base tip, the source's eligibility
 * and every clone must all succeed, or `bench-runs.js` closes whatever it made
 * with `bench:<run_id>:aborted` and no manifest is written.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import nodeCrypto from 'node:crypto';
import { makeError, makeOk } from '../../app/protocol.js';
import { kvGetJson, runShell } from '../bd.js';
import { SESSION_DEFAULTS_KV_KEY } from '../session-defaults.js';
import { createdIdOf } from '../worker/bd-metadata.js';
import {
  BENCH_REVIEWER_KEYS,
  benchRunBeadIds,
  createBenchRun,
  listBenchManifests,
  resolveBenchTuple
} from '../worker/bench-runs.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { resolveTargetBase } from '../worker/target-base.js';
import {
  getConnWorkspace,
  log,
  runBdInWorkspace,
  runBdJsonProjectedInWorkspace
} from './context.js';
import { triggerMutationRefreshOnce } from './refresh.js';

/** Terminal attempt statuses — a cell that reached one is no longer pending. */
const TERMINAL_STATUSES = new Set([
  'done',
  'failed',
  'orphaned',
  'discarded',
  'parked',
  'stopped'
]);

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function usableString(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * A fresh run id in the contract's `^[A-Za-z0-9._-]+$` vocabulary. Time-ordered
 * so a directory listing reads chronologically, with random bytes so two
 * experiments started in the same millisecond cannot share a manifest.
 *
 * @param {() => number} [now]
 * @returns {string}
 */
export function newBenchRunId(now = Date.now) {
  const stamp = new Date(now())
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, 14);
  return `bench-${stamp}-${nodeCrypto.randomBytes(3).toString('hex')}`;
}

/**
 * The workspace this request acts in. An explicit `root_dir` is honoured only
 * when it names the connection's own workspace: a bench run writes beads, and
 * a write must never be steered at a workspace the connection did not select.
 *
 * @param {WebSocket} ws
 * @param {Record<string, any>} payload
 * @returns {string|null}
 */
function workspaceRootFor(ws, payload) {
  const selected = usableString(getConnWorkspace(ws)?.root_dir);
  const requested = usableString(payload.root_dir);
  if (requested !== null && requested !== selected) {
    return null;
  }
  return selected;
}

/**
 * Read the workspace kv layer the tuple ladder's middle two rungs live in
 * (§4.2). An unreadable kv is an EMPTY layer, not a refusal: the general and
 * harness rungs below it still answer, and refusing the whole experiment over
 * an optional default layer would be a stricter rule than dispatch itself has.
 *
 * @param {string} root_dir
 * @returns {Promise<Record<string, unknown>>}
 */
async function readKvDefaults(root_dir) {
  try {
    const read = await kvGetJson(SESSION_DEFAULTS_KV_KEY, { cwd: root_dir });
    return read?.ok === true && isRecord(read.value) ? read.value : {};
  } catch (err) {
    log('bench kv defaults read failed: %o', err);
    return {};
  }
}

/**
 * Project the source bead into the shape a clone is built from.
 *
 * @param {Record<string, any>} issue
 * @returns {{ id: string, title: string, description: string, issue_type: string|null, priority: number|null, labels: string[], quick_fix_review: string, route: unknown }}
 */
export function benchSourceOf(issue) {
  const metadata = isRecord(issue.metadata) ? issue.metadata : {};
  return {
    id: usableString(issue.id) ?? '',
    title: usableString(issue.title) ?? '',
    // Byte-for-byte: the self-review receipt is bound to this string's digest.
    description: typeof issue.description === 'string' ? issue.description : '',
    issue_type: usableString(issue.issue_type),
    priority:
      typeof issue.priority === 'number' && Number.isFinite(issue.priority)
        ? issue.priority
        : null,
    labels: Array.isArray(issue.labels)
      ? issue.labels.filter(
          (/** @type {unknown} */ label) => typeof label === 'string'
        )
      : [],
    quick_fix_review: usableString(metadata.quick_fix_review) ?? '',
    route: metadata.route
  };
}

/**
 * The bd surface `createBenchRun` writes through: the same workspace-scoped
 * runner every other mutation uses, so a bench write cannot reach a workspace
 * the effect gate would have refused.
 *
 * @param {WebSocket} ws
 * @param {string} root_dir
 */
function benchBd(ws, root_dir) {
  /**
   * @param {string[]} args
   */
  const run = (args) => runBdInWorkspace(ws, args, { cwd: root_dir });
  return {
    /**
     * @param {{ title: string, description: string, issue_type: string|null, priority: number|null }} input
     */
    async create(input) {
      const args = ['create', '--title', input.title, '--json'];
      if (input.issue_type !== null) {
        args.push('--type', input.issue_type);
      }
      if (input.priority !== null) {
        args.push('--priority', String(input.priority));
      }
      if (input.description.length > 0) {
        args.push('--description', input.description);
      }
      const res = await run(args);
      if (res.code !== 0) {
        return { ok: false, reason: 'clone_create_failed' };
      }
      // `bd create --json` prints the created issue; the id is the ONLY thing
      // that makes the rest of the cell addressable, so a payload without one
      // is a creation failure even though bd exited 0. The parse is the shared
      // one (`bd-metadata.js`), never a second reading of the same payload
      // shape, and the AUTHORITY is still the exact-id readback the metadata
      // write performs below.
      const id = createdIdOf(res.stdout);
      return id === null
        ? { ok: false, reason: 'clone_id_unreadable' }
        : { ok: true, id };
    },
    /**
     * @param {string} bead_id
     * @param {string[]} labels
     */
    async addLabels(bead_id, labels) {
      for (const label of labels) {
        const res = await run(['label', 'add', bead_id, label]);
        if (res.code !== 0) {
          return { ok: false, reason: 'clone_label_failed' };
        }
      }
      return { ok: true };
    },
    /**
     * @param {string} bead_id
     * @param {Record<string, string>} values
     */
    async setMetadata(bead_id, values) {
      const args = ['update', bead_id];
      for (const [key, value] of Object.entries(values)) {
        args.push('--set-metadata', `${key}=${value}`);
      }
      const res = await run(args);
      if (res.code !== 0) {
        return { ok: false, reason: 'clone_metadata_failed' };
      }
      // Readback: the whole tuple is what the experiment compares, so a write
      // nobody confirmed is not a pinned tuple.
      const shown = await runBdJsonProjectedInWorkspace(
        ws,
        'show',
        ['show', bead_id, '--json'],
        { expected_id: bead_id, cwd: root_dir }
      );
      if (shown.ok !== true) {
        return { ok: false, reason: 'clone_metadata_readback_failed' };
      }
      const metadata = isRecord(/** @type {any} */ (shown.data).metadata)
        ? /** @type {any} */ (shown.data).metadata
        : {};
      for (const [key, value] of Object.entries(values)) {
        if (metadata[key] !== value) {
          return { ok: false, reason: 'clone_metadata_readback_failed' };
        }
      }
      return { ok: true };
    },
    /**
     * @param {string} bead_id
     * @param {string} reason
     */
    async closeWithReason(bead_id, reason) {
      const res = await run(['close', bead_id, '--reason', reason]);
      return res.code === 0
        ? { ok: true }
        : { ok: false, reason: 'clone_close_failed' };
    }
  };
}

/**
 * `bench-run-create` — build one experiment (§4.3).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {{ resolveBase?: typeof resolveTargetBase, create?: typeof createBenchRun, now?: () => number }} [seams]
 */
export async function handleBenchRunCreate(ws, req, seams = {}) {
  log('bench-run-create');
  const payload = /** @type {Record<string, any>} */ (req.payload || {});
  const root_dir = workspaceRootFor(ws, payload);
  const source_id = usableString(payload.source_id);
  const preset_ids = Array.isArray(payload.preset_ids)
    ? payload.preset_ids.filter(
        (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
      )
    : [];
  const repeats = payload.repeats ?? 1;
  const reviewer_mode = payload.reviewer_mode === 'preset' ? 'preset' : 'fixed';
  if (
    root_dir === null ||
    source_id === null ||
    preset_ids.length === 0 ||
    !Number.isInteger(repeats) ||
    repeats < 1 ||
    repeats > 5
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { source_id, preset_ids: string[], repeats: 1..5 } in the selected workspace'
        )
      )
    );
    return;
  }
  /** @type {Record<string, string>|null} */
  let reviewer = null;
  if (reviewer_mode === 'fixed') {
    const raw = isRecord(payload.reviewer) ? payload.reviewer : {};
    /** @type {Record<string, string>} */
    const values = {};
    for (const key of BENCH_REVIEWER_KEYS) {
      const value = usableString(raw[key]);
      if (value === null) {
        ws.send(
          JSON.stringify(
            makeError(
              req,
              'bad_request',
              `reviewer_mode=fixed requires reviewer.${key}`
            )
          )
        );
        return;
      }
      values[key] = value;
    }
    reviewer = values;
  }

  const shown = await runBdJsonProjectedInWorkspace(
    ws,
    'show',
    ['show', source_id, '--json'],
    { expected_id: source_id, cwd: root_dir }
  );
  if (shown.ok !== true) {
    ws.send(JSON.stringify(makeError(req, 'bd_error', shown.error.message)));
    return;
  }
  const source = benchSourceOf(/** @type {any} */ (shown.data));

  // §6 fail-closed: without the base tip the experiment does not start.
  const resolve_base = seams.resolveBase || resolveTargetBase;
  /** @type {any} */
  let base;
  try {
    base = await resolve_base({
      repo: root_dir,
      gitRun: (/** @type {string[]} */ args, /** @type {any} */ options = {}) =>
        runShell('git', args, options)
    });
  } catch (err) {
    log('bench base resolution threw: %o', err);
    base = { ok: false };
  }
  const base_sha = base?.ok === true ? usableString(base.base_oid) : null;
  if (base_sha === null) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bench_base_unreadable', 'base tip could not be read')
      )
    );
    return;
  }

  /** @type {any} */
  let runtime;
  try {
    runtime = getWorkerRuntime();
  } catch (err) {
    log('bench worker runtime unavailable: %o', err);
    ws.send(
      JSON.stringify(
        makeError(req, 'worker_unavailable', 'worker runtime is not attached')
      )
    );
    return;
  }
  const coordinator = runtime.execPresetCoordinator;
  const available = coordinator.snapshot().presets;
  const kv_values = await readKvDefaults(root_dir);
  /** @type {Array<{ id: string, name: string, tuple: Record<string, string> }>} */
  const presets = [];
  for (const preset_id of preset_ids) {
    const preset = available.find(
      (/** @type {any} */ entry) => entry.id === preset_id
    );
    if (!preset) {
      ws.send(
        JSON.stringify(
          makeError(req, 'bad_request', `unknown preset: ${preset_id}`)
        )
      );
      return;
    }
    const tuple = resolveBenchTuple({
      coordinator,
      workspace: root_dir,
      preset_settings: preset.settings,
      kv_values
    });
    if (!tuple.ok) {
      ws.send(
        JSON.stringify(makeError(req, 'bench_tuple_unresolved', tuple.reason))
      );
      return;
    }
    presets.push({ id: preset.id, name: preset.name, tuple: tuple.values });
  }

  const create = seams.create || createBenchRun;
  const run_id = newBenchRunId(seams.now);
  /** @type {any} */
  let result;
  try {
    result = await create({
      workspace_root: root_dir,
      run_id,
      base_sha,
      source,
      presets,
      repeats,
      reviewer_mode,
      reviewer,
      bd: benchBd(ws, root_dir),
      ...(seams.now ? { now: seams.now } : {})
    });
  } catch (err) {
    log('bench run creation threw: %o', err);
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bench_run_create_failed',
          err instanceof Error ? err.message : String(err)
        )
      )
    );
    return;
  }
  if (result.ok !== true) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bench_run_create_failed', result.reason, {
          aborted: result.aborted
        })
      )
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, { run: result.manifest })));
  try {
    triggerMutationRefreshOnce(ws);
  } catch {
    // ignore
  }
}

/**
 * Project one run's cells from the clone beads' attempt records (§4.7).
 *
 * @param {Record<string, any>} manifest
 * @param {string} root_dir
 * @param {{ queueStore?: any }} [seams]
 * @returns {Record<string, any>}
 */
export function projectBenchRun(manifest, root_dir, seams = {}) {
  /** @type {any} */
  let store = seams.queueStore ?? null;
  if (store === null) {
    try {
      store = getWorkerRuntime().queueStore;
    } catch {
      store = null;
    }
  }
  const cells = Array.isArray(manifest.cells) ? manifest.cells : [];
  const projected = cells.map((/** @type {any} */ cell) => {
    /** @type {Array<Record<string, any>>} */
    let attempts = [];
    if (store && typeof store.readAttemptsForBead === 'function') {
      try {
        attempts = store.readAttemptsForBead(root_dir, cell.bead_id) || [];
      } catch {
        attempts = [];
      }
    }
    const implementations = attempts.filter(
      (attempt) => attempt?.kind !== 'review_session'
    );
    const last = implementations[implementations.length - 1] ?? null;
    const status = last ? usableString(last.status) : null;
    return {
      preset_id: usableString(cell.preset_id),
      k: typeof cell.k === 'number' ? cell.k : null,
      bead_id: usableString(cell.bead_id),
      attempt_id: last ? usableString(last.attempt_id) : null,
      status,
      terminal: status !== null && TERMINAL_STATUSES.has(status),
      done_kind: last ? usableString(last.done_kind) : null,
      bench_verify:
        last && isRecord(last.bench_verify) ? last.bench_verify : null
    };
  });
  return {
    ...manifest,
    root_dir,
    cell_count: benchRunBeadIds(manifest).length,
    terminal_count: projected.filter((cell) => cell.terminal).length,
    cells: projected
  };
}

/**
 * `bench-run-list` — the selected workspace's experiments, newest first.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {{ list?: typeof listBenchManifests, queueStore?: any }} [seams]
 */
export function handleBenchRunList(ws, req, seams = {}) {
  const payload = /** @type {Record<string, any>} */ (req.payload || {});
  const root_dir = workspaceRootFor(ws, payload);
  if (root_dir === null) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'root_dir must be the selected workspace')
      )
    );
    return;
  }
  const list = seams.list || listBenchManifests;
  /** @type {Record<string, any>[]} */
  let runs;
  try {
    runs = list(root_dir).map((manifest) =>
      projectBenchRun(
        manifest,
        root_dir,
        seams.queueStore ? { queueStore: seams.queueStore } : {}
      )
    );
  } catch (err) {
    log('bench run list failed: %o', err);
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bench_run_list_failed',
          err instanceof Error ? err.message : String(err)
        )
      )
    );
    return;
  }
  ws.send(
    JSON.stringify({
      id: req.id,
      ok: true,
      type: /** @type {import('../../app/protocol.js').MessageType} */ (
        'bench-runs-snapshot'
      ),
      payload: { root_dir, runs }
    })
  );
}
