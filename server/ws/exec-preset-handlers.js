/**
 * Server-global execution-preset WebSocket channel.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { createExecPresetStore } from '../exec-preset-store.js';

const DEFAULT_CLIENT_ID = 'exec:presets';

/** @type {ReturnType<typeof createExecPresetStore>} */
let STORE = createExecPresetStore();

/** @type {Set<{ ws: WebSocket, client_id: string }>} */
const SUBSCRIBERS = new Set();

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
