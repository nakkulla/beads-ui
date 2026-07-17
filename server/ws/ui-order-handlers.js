/**
 * WebSocket handlers for the manual UI-order channel (spec §2).
 *
 * A `ui-order` subscription is per-workspace: on subscribe the client receives a
 * snapshot of the order map; on any order mutation the whole `{revision, order}`
 * is pushed as a fresh snapshot to every subscriber of that workspace. This
 * reuses the same server-push envelope machinery as the queue/issue lists
 * ({@link emitUiOrderSnapshot}) so manual-order data flows through one unified
 * push protocol.
 *
 * Concurrency: `ui-order-set` carries an `expected_revision`; the store runs a
 * revision CAS so a stale client's drag cannot clobber a newer ordering. On
 * conflict the handler replies with the current snapshot so the client re-syncs
 * and retries.
 *
 * Close-time pruning: {@link pruneUiOrderForClose} drops a bead's rank when it is
 * closed via a WS mutation (scope: WS-originated closes only — an external bd
 * CLI close leaving a stale entry is harmless and intentionally not watched).
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { createUiOrderStore } from '../ui-order-store.js';
import { emitUiOrderSnapshot, getConnWorkspace, log } from './context.js';

/**
 * Server-wide single UI-order store so all connections share one in-memory
 * revision — making the CAS authoritative in-process across concurrent clients.
 *
 * @type {ReturnType<typeof createUiOrderStore> | null}
 */
let STORE = null;

/**
 * @returns {ReturnType<typeof createUiOrderStore>}
 */
function uiOrderStore() {
  if (!STORE) {
    STORE = createUiOrderStore();
  }
  return STORE;
}

/**
 * Per-workspace subscriber registry. Keyed by workspace root_dir; each value is
 * the set of `{ ws, client_id }` pairs currently subscribed to that workspace's
 * order.
 *
 * @type {Map<string, Set<{ ws: WebSocket, client_id: string }>>}
 */
const SUBSCRIBERS = new Map();

/**
 * @param {WebSocket} ws
 * @returns {string}
 */
function workspaceKeyOf(ws) {
  return getConnWorkspace(ws)?.root_dir || '';
}

/**
 * @param {string} key
 * @returns {Set<{ ws: WebSocket, client_id: string }>}
 */
function subscribersFor(key) {
  let set = SUBSCRIBERS.get(key);
  if (!set) {
    set = new Set();
    SUBSCRIBERS.set(key, set);
  }
  return set;
}

/**
 * Push a fresh order snapshot to every subscriber of a workspace.
 *
 * @param {string} workspace_key
 * @param {{ revision: number, order: Record<string, number> }} snapshot
 */
function fanout(workspace_key, snapshot) {
  for (const sub of subscribersFor(workspace_key)) {
    emitUiOrderSnapshot(sub.ws, sub.client_id, snapshot);
  }
}

/**
 * Detach a connection from the ui-order subscriber registry (close hook).
 *
 * @param {WebSocket} ws
 */
export function detachUiOrder(ws) {
  for (const set of SUBSCRIBERS.values()) {
    for (const sub of set) {
      if (sub.ws === ws) {
        set.delete(sub);
      }
    }
  }
}

/**
 * Test-only: clear subscribers and the store's in-memory cache.
 */
export function __resetUiOrderForTest() {
  SUBSCRIBERS.clear();
  uiOrderStore().__clearCacheForTest();
}

/**
 * Handle `subscribe-ui-order`. Payload: `{ id: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeUiOrder(ws, req) {
  const client_id = /** @type {any} */ (req.payload)?.id;
  if (typeof client_id !== 'string' || client_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload.id must be a non-empty string')
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  subscribersFor(key).add({ ws, client_id });
  log('subscribe-ui-order %s ws=%s', client_id, key);
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  emitUiOrderSnapshot(ws, client_id, uiOrderStore().snapshot(key));
}

/**
 * Handle `unsubscribe-ui-order`. Payload: `{ id: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeUiOrder(ws, req) {
  const client_id = /** @type {any} */ (req.payload)?.id;
  const key = workspaceKeyOf(ws);
  const set = subscribersFor(key);
  let removed = false;
  for (const sub of set) {
    if (sub.ws === ws && sub.client_id === client_id) {
      set.delete(sub);
      removed = true;
    }
  }
  ws.send(
    JSON.stringify(makeOk(req, { id: client_id, unsubscribed: removed }))
  );
}

/**
 * Handle `ui-order-set`. Payload: `{ expected_revision, entries }`. CAS-guarded;
 * replies `{ applied, conflict, revision, order }` and, on success, fans out a
 * fresh snapshot to every subscriber of the workspace. On conflict the reply
 * carries the current snapshot so the client can adopt + retry.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUiOrderSet(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (
    typeof p.expected_revision !== 'number' ||
    !Number.isFinite(p.expected_revision) ||
    !Array.isArray(p.entries)
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { expected_revision: number, entries: Array<{ bead_id, rank }> }'
        )
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const result = uiOrderStore().setRanks(key, {
    expected_revision: p.expected_revision,
    entries: p.entries
  });
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: result.ok,
        conflict: result.conflict,
        revision: result.revision,
        order: result.order
      })
    )
  );
  if (result.ok) {
    fanout(key, { revision: result.revision, order: result.order });
  }
}

/**
 * Prune a set of bead ids from the workspace order when they are closed via a WS
 * mutation, fanning out a fresh snapshot only when something was actually
 * removed. Called from the `update-status` success path (status === 'closed').
 *
 * @param {WebSocket} ws
 * @param {string[]} ids
 */
export function pruneUiOrderForClose(ws, ids) {
  const key = workspaceKeyOf(ws);
  const result = uiOrderStore().pruneIds(key, ids);
  if (result.ok) {
    fanout(key, { revision: result.revision, order: result.order });
  }
}
