/**
 * Server-global IMPLEMENTATION-preset WebSocket channel (spec §C.6).
 *
 * A preset belongs to one profile (`applies_to`) and has exactly two apply
 * paths: its profile's pin keys go onto ONE Bead's metadata whose route
 * matches that profile, while a global apply replaces that profile's
 * workspace storage and leaves the other profile's values standing.
 * The retired 12-key family — `exec-preset-*`, `apply-exec-preset`,
 * `worker-queue-set-default-exec-preset` — is gone from the protocol, so a
 * client still sending one gets `unknown_type` rather than a silent no-op.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import {
  SESSION_DEFAULTS_KV_KEY,
  mergeSessionDefaults,
  normalizeSessionDefaults
} from '../session-defaults.js';
import {
  APPLIED_EXEC_PRESET_KEY,
  BEAD_PIN_KEYS,
  ORCHESTRATION_KEYS,
  QUICK_FIX_LANE_MAP,
  implPresetEnums,
  inferImplRuntime,
  normalizeAppliesTo,
  presetKeysFor,
  presetKvKeysFor,
  validateImplPresetSettings,
  validateImplSettings,
  validateOrchestrationPin
} from '../worker/exec-enums.js';
import { APPLIED_PRESET_FIELDS } from '../worker/queue-store.js';
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
 * The name one canonical preset key is STORED under in a workspace, for one
 * profile. The general profile stores canonical names; the quick_fix profile
 * stores the route-scoped prefixed names in both kv and the queue.
 *
 * @param {string} canonical_key
 * @param {'general'|'quick_fix'} applies_to
 * @returns {string}
 */
function storageKeyFor(canonical_key, applies_to) {
  return applies_to === 'quick_fix'
    ? QUICK_FIX_LANE_MAP[canonical_key]
    : canonical_key;
}

/**
 * Build one `bd update` argv that replaces the profile's pin keys on a Bead.
 * A key the preset omits is explicitly UNSET rather than left behind: applying
 * a preset must leave the Bead describing that preset and nothing else.
 *
 * The replaced set is the PROFILE's, so a quick_fix apply never names the nine
 * review keys and leaves whatever stands there (design §5). A general apply
 * keeps replacing all 17.
 *
 * `APPLIED_EXEC_PRESET_KEY` rides the SAME argv outside that loop, so the pins
 * and the identity that explains them never land separately.
 *
 * @param {string} issue_id
 * @param {Record<string, string>} settings
 * @param {string} preset_id
 * @param {ReadonlyArray<string>} [replaced_keys]
 * @returns {string[]}
 */
export function buildApplyImplPresetArgs(
  issue_id,
  settings,
  preset_id,
  replaced_keys = BEAD_PIN_KEYS
) {
  const args = ['update', issue_id];
  for (const key of replaced_keys) {
    if (Object.hasOwn(settings, key)) {
      args.push('--set-metadata', `${key}=${settings[key]}`);
    } else {
      args.push('--unset-metadata', key);
    }
  }
  args.push('--set-metadata', `${APPLIED_EXEC_PRESET_KEY}=${preset_id}`);
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
    const before =
      operation === 'update'
        ? coordinator()
            .snapshot()
            .presets.find((preset) => preset.id === input.id)
        : null;
    const result = coordinator()[operation](input);
    if (result.applied && before) {
      const after = result.presets.find((preset) => preset.id === input.id);
      const changed =
        after &&
        (before.name !== after.name ||
          Object.keys({ ...before.settings, ...after.settings }).some(
            (key) => before.settings[key] !== after.settings[key]
          ));
      if (changed) {
        const workspaces = new Set(
          getAvailableWorkspaces().map((entry) => entry.path)
        );
        const connected = targetWorkspaceOf(ws, {});
        if (connected !== null) {
          workspaces.add(connected);
        }
        // Only the edited preset's OWN profile record can have stopped being
        // true; the other profile's record names a different preset.
        const applies_to = normalizeAppliesTo(before.applies_to);
        const field = APPLIED_PRESET_FIELDS[applies_to];
        for (const workspace of workspaces) {
          const queue = /** @type {Record<string, any>} */ (
            /** @type {unknown} */ (queueStore().snapshot(workspace))
          );
          if (queue[field]?.id === input.id) {
            const cleared = queueStore().clearAppliedExecPreset(workspace, {
              expected_revision: queue.revision,
              applies_to
            });
            if (cleared.ok) {
              fanoutWorkerQueue(workspace, cleared.queue);
            }
          }
        }
      }
    }
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

/**
 * Create one preset. `payload.applies_to` names the profile and an absent
 * value reads as `general`, so a client written before the split keeps
 * creating general presets.
 *
 * @param {WebSocket} ws - Socket.
 * @param {RequestEnvelope} req - Request.
 */
export function handleImplPresetCreate(ws, req) {
  handleMutation(ws, req, 'create');
}

/**
 * Rewrite one preset within its stored profile. `applies_to` is NOT an update
 * input: the store keeps the profile it holds (design §3.1).
 *
 * @param {WebSocket} ws - Socket.
 * @param {RequestEnvelope} req - Request.
 */
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
    const response = {
      applied: false,
      conflict: true,
      revision: snapshot.revision,
      presets: snapshot.presets
    };
    ws.send(JSON.stringify(makeOk(req, response)));
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
  const enums = implPresetEnums(preset.applies_to);
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
  const coherence = validateImplPresetSettings(preset.settings, {
    applies_to: preset.applies_to
  });
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
 * Project one preset onto the canonical per-Bead keys of ITS OWN profile, for
 * an issue whose observed route must match that profile (design §5).
 *
 * The prefixed reverse lookup is gone: a preset carries canonical names in
 * either profile, so the projection is a copy. What stays is the runtime
 * DERIVATION — preset storage accepts a model with no runtime
 * (`active_writer:false`) while the Bead pin validator rejects that same pair
 * with `impl_runtime_required`, so a model-only preset would otherwise fail to
 * apply. An explicit `impl_runtime` still wins over the derived one.
 *
 * @param {{ applies_to?: unknown, settings: Record<string, string> }} preset
 * @param {unknown} route
 * @returns {{ ok: true, settings: Record<string, string>, replaced_keys: ReadonlyArray<string> }|{ ok: false, reason: string }}
 */
function presetSettingsForIssue(preset, route) {
  const applies_to = normalizeAppliesTo(preset.applies_to);
  if ((route === 'quick_fix') !== (applies_to === 'quick_fix')) {
    return { ok: false, reason: 'preset_route_mismatch' };
  }
  const settings = preset.settings;
  const replaced_keys = presetKeysFor(applies_to);
  /** @type {Record<string, string>} */
  const projected = {};
  for (const key of replaced_keys) {
    if (typeof settings[key] === 'string') {
      projected[key] = settings[key];
    }
  }
  const orchestration = validateOrchestrationPin(projected);
  if (!orchestration.ok) {
    return orchestration;
  }
  const derived_runtime = inferImplRuntime(projected);
  if (derived_runtime !== undefined) {
    projected.impl_runtime = derived_runtime;
  }
  const coherence = validateImplSettings(projected);
  if (!coherence.ok) {
    return { ok: false, reason: coherence.reason };
  }
  return { ok: true, settings: projected, replaced_keys };
}

/**
 * Apply path 1 — pin one preset's 17 pin keys onto ONE Bead's metadata.
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

  let current;
  try {
    current = await runBdJsonProjectedInWorkspace(
      ws,
      'show',
      ['show', id, '--json'],
      { expected_id: id }
    );
  } catch (err) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bd_read_failed',
          err instanceof Error ? err.message : String(err)
        )
      )
    );
    return;
  }
  if (current.ok !== true) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_read_failed', current.error.message))
    );
    return;
  }
  const route = current.data?.metadata?.route;
  const projected = presetSettingsForIssue(resolved.preset, route);
  if (!projected.ok) {
    // The route/profile refusal is its own code: nothing about the preset is
    // incompatible, it simply belongs to the other profile.
    ws.send(
      JSON.stringify(
        projected.reason === 'preset_route_mismatch'
          ? makeError(
              req,
              'preset_route_mismatch',
              'Implementation preset profile does not match the issue route'
            )
          : makeError(
              req,
              'impl_preset_incompatible',
              `Implementation preset value is incompatible: ${projected.reason}`
            )
      )
    );
    return;
  }

  let updated;
  try {
    updated = await runBdInWorkspace(
      ws,
      buildApplyImplPresetArgs(
        id,
        projected.settings,
        resolved.preset.id,
        projected.replaced_keys
      )
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
        issue: shown.data
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
  const payload = /** @type {any} */ (req.payload || {});
  const { preset_id, expected_revision, expected_queue_revision } = payload;
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
  if (payload.lane !== undefined) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload.lane is not supported')
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
  // The preset's profile decides WHAT this apply replaces. Only that profile's
  // storage keys appear in the patch, so the other profile's kv values — and
  // `workflow_mode`, the address, base sync, accounts and concurrency, which
  // belong to no profile — keep whatever the workspace holds (design §4).
  const applies_to = normalizeAppliesTo(resolved.preset.applies_to);
  const kv_keys = presetKvKeysFor(applies_to);
  /** @type {Record<string, string|null>} */
  const patch = {};
  for (const canonical_key of presetKeysFor(applies_to)) {
    const storage_key = storageKeyFor(canonical_key, applies_to);
    if (!kv_keys.includes(storage_key)) {
      continue;
    }
    patch[storage_key] = Object.hasOwn(resolved.preset.settings, canonical_key)
      ? resolved.preset.settings[canonical_key]
      : null;
  }
  let cleared;
  try {
    cleared = queueStore().clearAppliedExecPreset(workspace_key, {
      expected_revision: expected_queue_revision,
      applies_to
    });
  } catch (err) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'queue_write_failed',
          err instanceof Error ? err.message : String(err)
        )
      )
    );
    return;
  }
  if (!cleared.ok) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          conflict: false,
          revision: resolved.revision,
          values: normalizeSessionDefaults(read.value).values,
          warnings: normalizeSessionDefaults(read.value).warnings,
          queue_applied: false,
          queue_conflict: cleared.conflict,
          queue: decorateQueue(workspace_key, cleared.queue)
        })
      )
    );
    return;
  }
  if (cleared.queue.revision !== expected_queue_revision) {
    fanoutWorkerQueue(workspace_key, cleared.queue);
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
  for (const canonical_key of ORCHESTRATION_KEYS) {
    orchestration_values[storageKeyFor(canonical_key, applies_to)] =
      Object.hasOwn(resolved.preset.settings, canonical_key)
        ? resolved.preset.settings[canonical_key]
        : null;
  }
  /** @type {import('../worker/queue-store.js').QueueOpResult} */
  let queue_result;
  try {
    queue_result = queueStore().setOrchestrationDefaults(workspace_key, {
      expected_revision: cleared.queue.revision,
      values: orchestration_values,
      [APPLIED_PRESET_FIELDS[applies_to]]: {
        id: resolved.preset.id,
        name: resolved.preset.name,
        revision: resolved.revision,
        applied_at: Date.now()
      }
    });
  } catch {
    const queue = queueStore().snapshot(workspace_key);
    const response = {
      applied: true,
      conflict: false,
      revision: resolved.revision,
      values: confirmed.values,
      warnings: confirmed.warnings,
      queue_applied: false,
      queue_conflict: false,
      queue: decorateQueue(workspace_key, queue)
    };
    ws.send(JSON.stringify(makeOk(req, response)));
    return;
  }
  const response = {
    applied: true,
    conflict: false,
    revision: resolved.revision,
    values: confirmed.values,
    warnings: confirmed.warnings,
    queue_applied: queue_result.ok,
    queue_conflict: queue_result.conflict,
    queue: decorateQueue(workspace_key, queue_result.queue)
  };
  ws.send(JSON.stringify(makeOk(req, response)));
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
