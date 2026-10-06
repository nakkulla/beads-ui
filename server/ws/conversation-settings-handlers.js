/**
 * Server-global conversation settings WebSocket requests (UI-jbl1 §3.4).
 *
 * A request/response pair, not a subscription: the `전역` tab's section reads
 * the snapshot when it mounts (`conversation-settings-get`) and every write
 * answers with the new snapshot (`conversation-settings-set`). Nothing a
 * Worker tick changes moves these values, so no push channel exists. A
 * refused set still replies on the same envelope:
 * `{ ok: false, code, key?, message, snapshot }`.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 * @import { ConversationSettingsSetResult } from '../conversation-settings.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { conversationSettingsStore } from '../conversation-settings.js';
import { log } from './context.js';

/**
 * Handle `conversation-settings-get`. Payload: none.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleConversationSettingsGet(ws, req) {
  try {
    ws.send(
      JSON.stringify(
        makeOk(req, { snapshot: conversationSettingsStore().snapshot() })
      )
    );
  } catch (err) {
    log('conversation-settings-get failed: %o', err);
    ws.send(
      JSON.stringify(
        makeError(req, 'internal_error', 'failed to read conversation settings')
      )
    );
  }
}

/**
 * Handle `conversation-settings-set`. Payload: `{ expected_revision, values }`
 * where `values` maps a key to its value or `null` (clear that override).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleConversationSettingsSet(ws, req) {
  const payload = /** @type {any} */ (req.payload ?? {});
  const store = conversationSettingsStore();
  /** @type {ConversationSettingsSetResult} */
  let result;
  try {
    result = store.set({
      expected_revision: payload.expected_revision,
      values: payload.values
    });
  } catch (err) {
    log('conversation-settings-set failed: %o', err);
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'internal_error',
          'failed to persist conversation settings',
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
}
