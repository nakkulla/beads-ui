/**
 * Server-global Codex credit WebSocket channel (UI-9y1k §4.5). Same contract
 * as the external-wait settings channel: `subscribe-codex-credits` answers with
 * the current snapshot at once; a successful `codex-credits-set` replies `ok`
 * and every subscriber then receives the new snapshot. A refused set still
 * replies on the same envelope: `{ ok: false, code, key?, message, snapshot }`.
 *
 * Unlike the other settings channels the snapshot also moves on its own: the
 * ledger's consumption changes whenever a usage read observes a balance, so
 * every store change is pushed, not only a set.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 * @import { CreditSnapshot, CreditSetResult } from '../codex-credit-store.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { codexCreditStore } from '../codex-credit-store.js';
import { log } from './context.js';

const DEFAULT_CLIENT_ID = 'codex-credits';

/** @type {Set<{ ws: WebSocket, client_id: string }>} */
const SUBSCRIBERS = new Set();

/** @type {(() => void)|null} */
let unsubscribe_store = null;

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
 * @param {CreditSnapshot} snapshot
 */
function emitSnapshot(ws, client_id, snapshot) {
  try {
    ws.send(
      JSON.stringify({
        id: `evt-${Date.now()}`,
        ok: true,
        type: 'codex-credits-snapshot',
        payload: {
          type: 'codex-credits-snapshot',
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
 * @param {CreditSnapshot} snapshot
 */
function fanout(snapshot) {
  for (const subscriber of SUBSCRIBERS) {
    emitSnapshot(subscriber.ws, subscriber.client_id, snapshot);
  }
}

/**
 * Listen to the store once, on the first subscription.
 */
function ensureStoreListener() {
  if (unsubscribe_store === null) {
    unsubscribe_store = codexCreditStore().onChange(fanout);
  }
}

/**
 * Detach a connection from the subscriber registry (close hook).
 *
 * @param {WebSocket} ws
 */
export function detachCodexCredits(ws) {
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
}

/**
 * Test-only: clear the subscriber registry and the store listener.
 */
export function __resetCodexCreditsChannelForTest() {
  SUBSCRIBERS.clear();
  if (unsubscribe_store) {
    unsubscribe_store();
  }
  unsubscribe_store = null;
}

/**
 * Handle `subscribe-codex-credits`. Payload: `{ id?: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeCodexCredits(ws, req) {
  const client_id = clientIdOf(req);
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws && subscriber.client_id === client_id) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
  SUBSCRIBERS.add({ ws, client_id });
  ensureStoreListener();
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  emitSnapshot(ws, client_id, codexCreditStore().snapshot());
}

/**
 * Handle `unsubscribe-codex-credits`. Payload: `{ id?: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeCodexCredits(ws, req) {
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
 * Handle `codex-credits-set`. Payload: `{ expected_revision, accounts }` where
 * `accounts` maps an account key to `{ allow_credits?, daily_cap? }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleCodexCreditsSet(ws, req) {
  const payload = /** @type {any} */ (req.payload ?? {});
  const store = codexCreditStore();
  ensureStoreListener();
  /** @type {CreditSetResult} */
  let result;
  try {
    result = store.set({
      expected_revision: payload.expected_revision,
      accounts: payload.accounts
    });
  } catch (err) {
    log('codex-credits-set failed: %o', err);
    ws.send(
      JSON.stringify(
        makeError(req, 'internal_error', 'failed to persist codex credits', {
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
}
