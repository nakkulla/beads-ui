/**
 * Server-global timing-settings WebSocket channel (UI-ny0h design §3.4).
 *
 * `subscribe-timing-settings` answers with the current snapshot at once; a
 * successful `timing-settings-set` replies `ok` and then pushes the new
 * snapshot to every subscriber. A refused set still replies on the same
 * envelope: `{ ok: false, code, key?, message, snapshot }`, so the client can
 * show the reason on the named row or adopt the latest snapshot.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 * @import { TimingSnapshot } from '../timing-settings.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { timingSettingsStore } from '../timing-settings.js';
import { log } from './context.js';

const DEFAULT_CLIENT_ID = 'timing-settings';

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
 * @param {TimingSnapshot} snapshot
 */
function emitSnapshot(ws, client_id, snapshot) {
  try {
    ws.send(
      JSON.stringify({
        id: `evt-${Date.now()}`,
        ok: true,
        type: 'timing-settings-snapshot',
        payload: {
          type: 'timing-settings-snapshot',
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
 * @param {TimingSnapshot} snapshot
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
export function detachTimingSettings(ws) {
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
}

/**
 * Test-only: clear the subscriber registry.
 */
export function __resetTimingSettingsChannelForTest() {
  SUBSCRIBERS.clear();
}

/**
 * Handle `subscribe-timing-settings`. Payload: `{ id?: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeTimingSettings(ws, req) {
  const client_id = clientIdOf(req);
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws && subscriber.client_id === client_id) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
  SUBSCRIBERS.add({ ws, client_id });
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  emitSnapshot(ws, client_id, timingSettingsStore().snapshot());
}

/**
 * Handle `unsubscribe-timing-settings`. Payload: `{ id?: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeTimingSettings(ws, req) {
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
 * Handle `timing-settings-set`. Payload: `{ expected_revision, values }` where
 * `values` maps a key to an integer (seconds), an integer array (a ladder), or
 * `null` (clear that override).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleTimingSettingsSet(ws, req) {
  const payload = /** @type {any} */ (req.payload ?? {});
  const store = timingSettingsStore();
  /** @type {import('../timing-settings.js').TimingSetResult} */
  let result;
  try {
    result = store.set({
      expected_revision: payload.expected_revision,
      values: payload.values
    });
  } catch (err) {
    log('timing-settings-set failed: %o', err);
    ws.send(
      JSON.stringify(
        makeError(req, 'internal_error', 'failed to persist timing settings', {
          snapshot: store.snapshot()
        })
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
