/**
 * Server-global model-visibility WebSocket channel (design §3.2).
 *
 * `subscribe-model-visibility` answers with the current snapshot at once; a
 * successful `model-visibility-set` replies `ok` and then pushes the new
 * snapshot to every subscriber. A rejected set answers with the error code and
 * the current snapshot in `error.details` so the client can adopt and retry.
 *
 * The snapshot carries each runner's catalog models (`{ name, id }`, catalog
 * order), so the settings section draws from this channel alone.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 * @import { ResolvedCatalog } from '../worker/runner-catalog.js'
 * @import { ModelVisibilityState } from '../model-visibility-store.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { createModelVisibilityStore } from '../model-visibility-store.js';
import { runtimeCatalog } from '../worker/runner/index.js';
import { log } from './context.js';

const DEFAULT_CLIENT_ID = 'model-visibility';

/** @type {ReturnType<typeof createModelVisibilityStore> | null} */
let STORE = null;

/**
 * @returns {ReturnType<typeof createModelVisibilityStore>}
 */
function store() {
  if (!STORE) {
    STORE = createModelVisibilityStore();
  }
  return STORE;
}

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
 * The wire payload: stored state plus the catalog models per runner.
 *
 * @param {ModelVisibilityState} state
 * @param {ResolvedCatalog} catalog
 * @returns {{ revision: number, disabled_models: string[], runners: Record<string, Array<{ name: string, id: string }>> }}
 */
function wireSnapshot(state, catalog) {
  /** @type {Record<string, Array<{ name: string, id: string }>>} */
  const runners = {};
  for (const [runner_name, entry] of Object.entries(catalog.runners)) {
    runners[runner_name] = Object.entries(entry.models).map(
      ([name, model]) => ({ name, id: model.id })
    );
  }
  return {
    revision: state.revision,
    disabled_models: state.disabled_models,
    runners
  };
}

/**
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {ReturnType<typeof wireSnapshot>} snapshot
 */
function emitSnapshot(ws, client_id, snapshot) {
  try {
    ws.send(
      JSON.stringify({
        id: `evt-${Date.now()}`,
        ok: true,
        type: 'model-visibility-snapshot',
        payload: {
          type: 'model-visibility-snapshot',
          id: client_id,
          ...snapshot
        }
      })
    );
  } catch {
    // One disconnected subscriber must not prevent fanout to the others.
  }
}

/**
 * @param {ReturnType<typeof wireSnapshot>} snapshot
 */
function fanout(snapshot) {
  for (const subscriber of SUBSCRIBERS) {
    emitSnapshot(subscriber.ws, subscriber.client_id, snapshot);
  }
}

/**
 * Detach a connection from the subscriber registry (close hook).
 *
 * @param {WebSocket} ws
 */
export function detachModelVisibility(ws) {
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
}

/**
 * Test-only: clear subscribers and the store cache.
 */
export function __resetModelVisibilityForTest() {
  SUBSCRIBERS.clear();
  STORE = null;
}

/**
 * Handle `subscribe-model-visibility`. Payload: `{ id?: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeModelVisibility(ws, req) {
  const client_id = clientIdOf(req);
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws && subscriber.client_id === client_id) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
  SUBSCRIBERS.add({ ws, client_id });
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  const catalog = runtimeCatalog();
  emitSnapshot(ws, client_id, wireSnapshot(store().snapshot(catalog), catalog));
}

/**
 * Handle `unsubscribe-model-visibility`. Payload: `{ id?: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeModelVisibility(ws, req) {
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
 * Handle `model-visibility-set`. Payload:
 * `{ expected_revision, disabled_models }` replacing the whole list.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleModelVisibilitySet(ws, req) {
  const payload = /** @type {any} */ (req.payload ?? {});
  const catalog = runtimeCatalog();
  /** @type {import('../model-visibility-store.js').ModelVisibilitySetResult} */
  let result;
  try {
    result = store().set(
      {
        expected_revision: payload.expected_revision,
        disabled_models: payload.disabled_models
      },
      catalog
    );
  } catch (err) {
    log('model-visibility-set failed: %o', err);
    ws.send(
      JSON.stringify(
        makeError(req, 'internal_error', 'failed to persist model visibility', {
          snapshot: wireSnapshot(store().snapshot(catalog), catalog)
        })
      )
    );
    return;
  }
  const snapshot = wireSnapshot(result.snapshot, catalog);
  if (!result.ok) {
    ws.send(
      JSON.stringify(
        makeError(req, result.code, `model-visibility-set: ${result.code}`, {
          snapshot
        })
      )
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, { snapshot })));
  fanout(snapshot);
}
