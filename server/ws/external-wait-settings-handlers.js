/**
 * Server-global external-wait settings WebSocket channel (UI-qbgj §3.6). Same
 * contract as the timing-settings channel: `subscribe-external-wait-settings`
 * answers with the current snapshot at once; a successful
 * `external-wait-settings-set` replies `ok` and then pushes the new snapshot to
 * every subscriber. A refused set still replies on the same envelope:
 * `{ ok: false, code, key?, message, snapshot }`.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 * @import { ExternalWaitSettingsSnapshot, ExternalWaitSettingsSetResult } from '../external-wait-settings.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { externalWaitSettingsStore } from '../external-wait-settings.js';
import { log } from './context.js';

const DEFAULT_CLIENT_ID = 'external-wait-settings';

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
 * @param {ExternalWaitSettingsSnapshot} snapshot
 */
function emitSnapshot(ws, client_id, snapshot) {
  try {
    ws.send(
      JSON.stringify({
        id: `evt-${Date.now()}`,
        ok: true,
        type: 'external-wait-settings-snapshot',
        payload: {
          type: 'external-wait-settings-snapshot',
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
 * @param {ExternalWaitSettingsSnapshot} snapshot
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
export function detachExternalWaitSettings(ws) {
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
}

/**
 * Test-only: clear the subscriber registry.
 */
export function __resetExternalWaitSettingsChannelForTest() {
  SUBSCRIBERS.clear();
}

/**
 * Handle `subscribe-external-wait-settings`. Payload: `{ id?: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeExternalWaitSettings(ws, req) {
  const client_id = clientIdOf(req);
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws && subscriber.client_id === client_id) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
  SUBSCRIBERS.add({ ws, client_id });
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  emitSnapshot(ws, client_id, externalWaitSettingsStore().snapshot());
}

/**
 * Handle `unsubscribe-external-wait-settings`. Payload: `{ id?: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeExternalWaitSettings(ws, req) {
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
 * Handle `external-wait-settings-set`. Payload: `{ expected_revision, values }`
 * where `values` maps a key to an integer or `null` (clear that override).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleExternalWaitSettingsSet(ws, req) {
  const payload = /** @type {any} */ (req.payload ?? {});
  const store = externalWaitSettingsStore();
  /** @type {ExternalWaitSettingsSetResult} */
  let result;
  try {
    result = store.set({
      expected_revision: payload.expected_revision,
      values: payload.values
    });
  } catch (err) {
    log('external-wait-settings-set failed: %o', err);
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'internal_error',
          'failed to persist external-wait settings',
          { snapshot: store.snapshot() }
        )
      )
    );
    return;
  }
  if (!result.ok) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          ok: false,
          code: result.code,
          ...(result.key === undefined ? {} : { key: result.key }),
          message: result.message,
          snapshot: result.snapshot
        })
      )
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, { ok: true, snapshot: result.snapshot })));
  fanout(result.snapshot);
}
