/**
 * Server-global execution-preset WebSocket channel.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { createExecPresetStore } from '../exec-preset-store.js';
import { EXEC_SETTING_KEYS, execSettingEnums } from '../worker/exec-enums.js';
import { runBdInWorkspace, runBdJsonInWorkspace } from './context.js';
import { triggerMutationRefreshOnce } from './refresh.js';

const DEFAULT_CLIENT_ID = 'exec:presets';

/** @type {ReturnType<typeof createExecPresetStore>} */
let STORE = createExecPresetStore();

/** @type {Set<{ ws: WebSocket, client_id: string }>} */
const SUBSCRIBERS = new Set();

/**
 * Build one `bd update` argv that replaces every canonical exec metadata key.
 * Missing preset keys become explicit `--unset-metadata` entries.
 *
 * @param {string} issue_id
 * @param {Record<string, string>} settings
 * @returns {string[]}
 */
export function buildApplyExecPresetArgs(issue_id, settings) {
  const args = ['update', issue_id];
  for (const key of EXEC_SETTING_KEYS) {
    if (Object.prototype.hasOwnProperty.call(settings, key)) {
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
 * @param {{ revision: number, presets: import('../exec-preset-store.js').ExecPreset[] }} snapshot
 */
function emitSnapshot(ws, client_id, snapshot) {
  try {
    ws.send(
      JSON.stringify({
        id: `evt-${Date.now()}`,
        ok: true,
        type: 'exec-presets-snapshot',
        payload: {
          type: 'exec-presets-snapshot',
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
 * @param {{ revision: number, presets: import('../exec-preset-store.js').ExecPreset[] }} snapshot
 */
function fanout(snapshot) {
  for (const subscriber of SUBSCRIBERS) {
    emitSnapshot(subscriber.ws, subscriber.client_id, snapshot);
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
    const result = STORE[operation](input);
    ws.send(JSON.stringify(makeOk(req, result)));
    if (result.applied) {
      fanout({ revision: result.revision, presets: result.presets });
    }
  } catch (err) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'exec_preset_write_failed',
          'Failed to persist execution presets',
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
export function handleSubscribeExecPresets(ws, req) {
  const client_id = clientIdOf(req);
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws && subscriber.client_id === client_id) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
  SUBSCRIBERS.add({ ws, client_id });
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  emitSnapshot(ws, client_id, STORE.snapshot());
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeExecPresets(ws, req) {
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
export function handleExecPresetCreate(ws, req) {
  handleMutation(ws, req, 'create');
}

/** @param {WebSocket} ws - Socket. @param {RequestEnvelope} req - Request. */
export function handleExecPresetUpdate(ws, req) {
  handleMutation(ws, req, 'update');
}

/** @param {WebSocket} ws - Socket. @param {RequestEnvelope} req - Request. */
export function handleExecPresetDelete(ws, req) {
  handleMutation(ws, req, 'delete');
}

/**
 * Apply one preset to all 10 issue metadata keys without changing preset state.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleApplyExecPreset(ws, req) {
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

  const snapshot = STORE.snapshot();
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
    return;
  }
  const preset = snapshot.presets.find((entry) => entry.id === preset_id);
  if (!preset) {
    ws.send(
      JSON.stringify(
        makeError(req, 'exec_preset_missing', 'Execution preset not found')
      )
    );
    return;
  }
  const enums = execSettingEnums();
  for (const [key, value] of Object.entries(preset.settings)) {
    const allowed = enums[key];
    if (!Array.isArray(allowed) || !allowed.includes(value)) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'exec_preset_incompatible',
            `Execution preset value is incompatible: ${key}`
          )
        )
      );
      return;
    }
  }

  let updated;
  try {
    updated = await runBdInWorkspace(
      ws,
      buildApplyExecPresetArgs(id, preset.settings)
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
    shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
  } catch (err) {
    triggerMutationRefreshOnce();
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bd_readback_failed',
          err instanceof Error ? err.message : String(err)
        )
      )
    );
    return;
  }
  triggerMutationRefreshOnce();
  const raw_issue = Array.isArray(shown.stdoutJson)
    ? shown.stdoutJson[0]
    : shown.stdoutJson;
  if (
    shown.code !== 0 ||
    !raw_issue ||
    typeof raw_issue !== 'object' ||
    Array.isArray(raw_issue) ||
    typeof (/** @type {any} */ (raw_issue).id) !== 'string'
  ) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bd_readback_failed', shown.stderr || 'bd show failed')
      )
    );
    return;
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: true,
        conflict: false,
        revision: snapshot.revision,
        issue: raw_issue
      })
    )
  );
}

/** @param {WebSocket} ws */
export function detachExecPresets(ws) {
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
}

/** Reset global channel state and re-resolve the XDG path for tests. */
export function __resetExecPresetsForTest() {
  SUBSCRIBERS.clear();
  STORE = createExecPresetStore();
}
