/**
 * Server-global IMPLEMENTATION-preset WebSocket channel (spec §C.6).
 *
 * A preset carries the full execution profile and has exactly two apply paths:
 * its 15 Bead-pin-compatible session keys go onto ONE Bead's metadata, while a
 * global apply replaces those session keys in `bd kv` and the three
 * orchestration keys in the workspace queue.
 * The retired 12-key family — `exec-preset-*`, `apply-exec-preset`,
 * `worker-queue-set-default-exec-preset` — is gone from the protocol, so a
 * client still sending one gets `unknown_type` rather than a silent no-op.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import {
  SESSION_DEFAULTS_KV_KEY,
  mergeSessionDefaults,
  normalizeSessionDefaults
} from '../session-defaults.js';
import {
  BEAD_APPLY_KEYS,
  ORCHESTRATION_KEYS,
  PRESET_KV_KEYS,
  implPresetEnums,
  validateImplPresetSettings
} from '../worker/exec-enums.js';
import {
  __resetWorkerRuntimeForTest,
  getWorkerRuntime
} from '../worker/runtime.js';
import {
  kvGetJsonAtRoot,
  kvGetJsonInWorkspace,
  kvSetJsonAtRoot,
  kvSetJsonInWorkspace,
  log,
  readbackFailureDetail,
  runBdInWorkspace,
  runBdJsonProjectedInWorkspace
} from './context.js';
import { invalidateSessionDefaults } from './monitor-handlers.js';
import { triggerMutationRefreshOnce } from './refresh.js';
import {
  decorateQueue,
  fanout as fanoutWorkerQueue
} from './worker-handlers.js';
import { targetWorkspaceOf } from './workspace-target.js';

const DEFAULT_CLIENT_ID = 'impl:presets';

/** @type {Set<{ ws: WebSocket, client_id: string }>} */
const SUBSCRIBERS = new Set();

/** @returns {ReturnType<typeof getWorkerRuntime>['execPresetCoordinator']} */
function coordinator() {
  return getWorkerRuntime().execPresetCoordinator;
}

/** @returns {ReturnType<typeof getWorkerRuntime>['queueStore']} */
function queueStore() {
  return getWorkerRuntime().queueStore;
}

/**
 * Build one `bd update` argv that pins every session-default key on a Bead.
 * A key the preset omits is explicitly UNSET rather than left behind: applying
 * a preset must leave the Bead describing that preset and nothing else.
 *
 * @param {string} issue_id
 * @param {Record<string, string>} settings
 * @returns {string[]}
 */
export function buildApplyImplPresetArgs(issue_id, settings) {
  const args = ['update', issue_id];
  for (const key of BEAD_APPLY_KEYS) {
    if (Object.hasOwn(settings, key)) {
      args.push('--set-metadata', `${key}=${settings[key]}`);
    } else {
      args.push('--unset-metadata', key);
    }
  }
  return args;
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
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {{ revision: number, presets: unknown[] }} snapshot
 */
function emitSnapshot(ws, client_id, snapshot) {
  try {
    ws.send(
      JSON.stringify({
        id: `evt-${Date.now()}`,
        ok: true,
        type: 'impl-presets-snapshot',
        payload: {
          type: 'impl-presets-snapshot',
          id: client_id,
          revision: snapshot.revision,
          presets: snapshot.presets
        }
      })
    );
  } catch {
    // One disconnected subscriber must not prevent fanout to the others.
  }
}

/**
 * @param {{ revision: number, presets: unknown[] }} snapshot
 */
function fanout(snapshot) {
  for (const subscriber of SUBSCRIBERS) {
    emitSnapshot(subscriber.ws, subscriber.client_id, snapshot);
  }
}

/**
 * Publish the current preset list to every subscriber without a client
 * mutation. The startup migration runs inside the `listen` callback, so a
 * client can already be subscribed while the §D reseed replaces the list;
 * without this push it would keep rendering the pre-reseed presets until its
 * next own mutation.
 */
export function broadcastImplPresets() {
  try {
    fanout(coordinator().snapshot());
  } catch (err) {
    log('impl preset broadcast failed: %o', err);
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {'create'|'update'|'delete'} operation
 */
function handleMutation(ws, req, operation) {
  try {
    const input = /** @type {any} */ (req.payload || {});
    const result = coordinator()[operation](input);
    ws.send(JSON.stringify(makeOk(req, result)));
    if (result.applied) {
      fanout({ revision: result.revision, presets: result.presets });
    }
  } catch (err) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'impl_preset_write_failed',
          'Failed to persist implementation presets',
          err instanceof Error ? err.message : String(err)
        )
      )
    );
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeImplPresets(ws, req) {
  const client_id = clientIdOf(req);
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws && subscriber.client_id === client_id) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
  SUBSCRIBERS.add({ ws, client_id });
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  emitSnapshot(ws, client_id, coordinator().snapshot());
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeImplPresets(ws, req) {
  const client_id = clientIdOf(req);
  let removed = false;
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws && subscriber.client_id === client_id) {
      SUBSCRIBERS.delete(subscriber);
      removed = true;
    }
  }
  ws.send(
    JSON.stringify(makeOk(req, { id: client_id, unsubscribed: removed }))
  );
}

/** @param {WebSocket} ws - Socket. @param {RequestEnvelope} req - Request. */
export function handleImplPresetCreate(ws, req) {
  handleMutation(ws, req, 'create');
}

/** @param {WebSocket} ws - Socket. @param {RequestEnvelope} req - Request. */
export function handleImplPresetUpdate(ws, req) {
  handleMutation(ws, req, 'update');
}

/** @param {WebSocket} ws - Socket. @param {RequestEnvelope} req - Request. */
export function handleImplPresetDelete(ws, req) {
  handleMutation(ws, req, 'delete');
}

/**
 * Resolve the requested preset and validate its profile before any write.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {unknown} preset_id
 * @param {unknown} expected_revision
 * @returns {{ ok: true, preset: any, revision: number }|{ ok: false }}
 */
function resolvePresetForApply(ws, req, preset_id, expected_revision) {
  const snapshot = coordinator().snapshot();
  if (expected_revision !== snapshot.revision) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          conflict: true,
          revision: snapshot.revision,
          presets: snapshot.presets
        })
      )
    );
    return { ok: false };
  }
  const preset = snapshot.presets.find((entry) => entry.id === preset_id);
  if (!preset) {
    ws.send(
      JSON.stringify(
        makeError(req, 'impl_preset_missing', 'Implementation preset not found')
      )
    );
    return { ok: false };
  }
  const enums = implPresetEnums();
  for (const [key, value] of Object.entries(preset.settings)) {
    const allowed = enums[key];
    if (!Array.isArray(allowed) || !allowed.includes(value)) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'impl_preset_incompatible',
            `Implementation preset value is incompatible: ${key}`
          )
        )
      );
      return { ok: false };
    }
  }
  const coherence = validateImplPresetSettings(preset.settings);
  if (!coherence.ok) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'impl_preset_incompatible',
          `Implementation preset value is incompatible: ${coherence.reason}`
        )
      )
    );
    return { ok: false };
  }
  return { ok: true, preset, revision: snapshot.revision };
}

/**
 * Apply path 1 — pin one preset's 15 session keys onto ONE Bead's metadata.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleApplyImplPreset(ws, req) {
  const { id, preset_id, expected_revision } = /** @type {any} */ (
    req.payload || {}
  );
  if (
    typeof id !== 'string' ||
    id.length === 0 ||
    typeof preset_id !== 'string' ||
    preset_id.length === 0 ||
    !Number.isInteger(expected_revision) ||
    expected_revision < 0
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { id, preset_id, expected_revision }'
        )
      )
    );
    return;
  }
  const resolved = resolvePresetForApply(ws, req, preset_id, expected_revision);
  if (!resolved.ok) {
    return;
  }

  let updated;
  try {
    updated = await runBdInWorkspace(
      ws,
      buildApplyImplPresetArgs(id, resolved.preset.settings)
    );
  } catch (err) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bd_update_failed',
          err instanceof Error ? err.message : String(err)
        )
      )
    );
    return;
  }
  if (updated.code !== 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bd_update_failed', updated.stderr || 'bd update failed')
      )
    );
    return;
  }

  let shown;
  try {
    shown = await runBdJsonProjectedInWorkspace(
      ws,
      'show',
      ['show', id, '--json'],
      { expected_id: id }
    );
  } catch (err) {
    triggerMutationRefreshOnce(ws);
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bd_readback_failed',
          err instanceof Error ? err.message : String(err),
          readbackFailureDetail('bd_readback_threw')
        )
      )
    );
    return;
  }
  triggerMutationRefreshOnce(ws);
  if (shown.ok !== true) {
    // The write already landed, so this is a readback failure, not a retryable
    // write failure: replaying the update could apply it twice.
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bd_readback_failed',
          shown.error.message,
          readbackFailureDetail(shown.error.code)
        )
      )
    );
    return;
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: true,
        conflict: false,
        revision: resolved.revision,
        issue: shown.data,
        skipped_orchestration_keys: ORCHESTRATION_KEYS
      })
    )
  );
}

/**
 * Apply path 2 — replace the session profile in `bd kv`, then replace the
 * orchestration profile in the workspace queue under its separate CAS.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleApplyImplPresetGlobal(ws, req) {
  const { preset_id, expected_revision, expected_queue_revision } =
    /** @type {any} */ (req.payload || {});
  if (
    typeof preset_id !== 'string' ||
    preset_id.length === 0 ||
    !Number.isInteger(expected_revision) ||
    expected_revision < 0 ||
    !Number.isInteger(expected_queue_revision) ||
    expected_queue_revision < 0
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { preset_id, expected_revision, expected_queue_revision }'
        )
      )
    );
    return;
  }
  const workspace_key = targetWorkspaceOf(ws, req.payload);
  if (workspace_key === null) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload.root_dir must be an absolute path in the available workspace list'
        )
      )
    );
    return;
  }
  const resolved = resolvePresetForApply(ws, req, preset_id, expected_revision);
  if (!resolved.ok) {
    return;
  }

  // The kv side now follows `root_dir` too (UI-eey2 §9.5). Before this, a
  // profile applied from another repo's panel wrote that repo's QUEUE but the
  // CONNECTED repo's session defaults — the two halves of one profile landing in
  // two different repos. Absent `root_dir` keeps the connection-addressed
  // helpers, so the Worker tab's own payload is unchanged.
  const targets_other_root =
    /** @type {any} */ (req.payload || {}).root_dir !== undefined &&
    /** @type {any} */ (req.payload || {}).root_dir !== null;
  /** @param {string} key */
  const readKv = (key) =>
    targets_other_root
      ? kvGetJsonAtRoot(workspace_key, key)
      : kvGetJsonInWorkspace(ws, key);
  /**
   * @param {string} key
   * @param {Record<string, unknown>} value
   */
  const writeKv = (key, value) =>
    targets_other_root
      ? kvSetJsonAtRoot(workspace_key, key, value)
      : kvSetJsonInWorkspace(ws, key, value);

  const read = await readKv(SESSION_DEFAULTS_KV_KEY);
  if (!read.ok) {
    ws.send(
      JSON.stringify(
        makeError(req, 'kv_read_failed', read.error || 'bd kv get failed')
      )
    );
    return;
  }
  // The preset replaces the kv keys it CAN carry and no others: iterating the
  // whole kv list would clear `quick_fix_impl_model` on every apply, since no
  // preset is able to name it.
  /** @type {Record<string, string|null>} */
  const patch = {};
  for (const key of PRESET_KV_KEYS) {
    patch[key] = Object.hasOwn(resolved.preset.settings, key)
      ? resolved.preset.settings[key]
      : null;
  }
  const written = await writeKv(
    SESSION_DEFAULTS_KV_KEY,
    mergeSessionDefaults(read.value, patch)
  );
  if (!written.ok) {
    ws.send(
      JSON.stringify(
        makeError(req, 'kv_write_failed', written.error || 'bd kv set failed')
      )
    );
    return;
  }
  const readback = await readKv(SESSION_DEFAULTS_KV_KEY);
  if (!readback.ok) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bd_readback_failed',
          readback.error || 'bd kv get failed',
          readbackFailureDetail('kv_readback_failed')
        )
      )
    );
    return;
  }
  const confirmed = normalizeSessionDefaults(readback.value);
  for (const [key, value] of Object.entries(patch)) {
    const observed = Object.hasOwn(confirmed.values, key)
      ? confirmed.values[key]
      : null;
    if (observed !== value) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bd_readback_failed',
            `session default did not persist: ${key}`,
            readbackFailureDetail('kv_readback_mismatch')
          )
        )
      );
      return;
    }
  }

  // The kv half landed; the monitor's per-repo cache for THIS root is now stale.
  invalidateSessionDefaults(workspace_key);

  /** @type {Record<string, string|null>} */
  const orchestration_values = {};
  for (const key of ORCHESTRATION_KEYS) {
    orchestration_values[key] = Object.hasOwn(resolved.preset.settings, key)
      ? resolved.preset.settings[key]
      : null;
  }
  /** @type {import('../worker/queue-store.js').QueueOpResult} */
  let queue_result;
  try {
    queue_result = queueStore().setOrchestrationDefaults(workspace_key, {
      expected_revision: expected_queue_revision,
      values: orchestration_values
    });
  } catch {
    const queue = queueStore().snapshot(workspace_key);
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: true,
          conflict: false,
          revision: resolved.revision,
          values: confirmed.values,
          warnings: confirmed.warnings,
          queue_applied: false,
          queue_conflict: false,
          queue: decorateQueue(workspace_key, queue)
        })
      )
    );
    return;
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: true,
        conflict: false,
        revision: resolved.revision,
        values: confirmed.values,
        warnings: confirmed.warnings,
        queue_applied: queue_result.ok,
        queue_conflict: queue_result.conflict,
        queue: decorateQueue(workspace_key, queue_result.queue)
      })
    )
  );
  if (queue_result.ok) {
    fanoutWorkerQueue(workspace_key, queue_result.queue);
  }
}

/** @param {WebSocket} ws */
export function detachImplPresets(ws) {
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
}

/** Reset global channel state and re-resolve the XDG path for tests. */
export function __resetImplPresetsForTest() {
  SUBSCRIBERS.clear();
  __resetWorkerRuntimeForTest();
}
