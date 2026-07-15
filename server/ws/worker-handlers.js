/**
 * WebSocket handlers for the Worker queue channel (spec §5.1).
 *
 * A `worker-queue` subscription is per-workspace: on subscribe the client
 * receives a snapshot of the queue; on any queue mutation the whole queue is
 * pushed as a fresh snapshot to every subscriber of that workspace. This reuses
 * the same server-push envelope machinery as issue lists ({@link emitWorkerQueueSnapshot})
 * so Worker data and issue data flow through one unified push protocol.
 *
 * Concurrency: every mutation carries an `expected_revision`; the queue store
 * runs a revision CAS so a stale client's drag cannot clobber a newer ordering.
 * On conflict the handler replies with the current snapshot so the client
 * re-syncs and retries.
 *
 * NO EXECUTION here (Phase 10): `worker-queue-toggle` only persists the
 * `auto_advance` flag; nothing is dispatched.
 *
 * Auth: these handlers only run for already-authenticated sockets — the
 * connection layer's first-frame auth gate fronts `handleMessage`, and these
 * are reached through the same post-auth dispatch switch as every other
 * mutation (no auth special-casing).
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { emitWorkerQueueSnapshot, getConnWorkspace, log } from './context.js';

/**
 * Server-wide single queue store (from the shared Worker runtime) so all
 * connections share one in-memory revision — making the CAS authoritative
 * in-process across concurrent clients — AND so `/healthz` reports the same
 * auto_advance the ws toggle mutates.
 *
 * @returns {ReturnType<typeof import('../worker/queue-store.js').createQueueStore>}
 */
function queueStore() {
  return getWorkerRuntime().queueStore;
}

/**
 * Per-workspace subscriber registry. Keyed by workspace root_dir; each value is
 * the set of `{ ws, client_id }` pairs currently subscribed to that workspace's
 * queue.
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
 * Push the current queue snapshot to every subscriber of a workspace.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 */
function fanout(workspace_key, queue) {
  for (const sub of subscribersFor(workspace_key)) {
    emitWorkerQueueSnapshot(sub.ws, sub.client_id, queue);
  }
}

/**
 * Detach a connection from the worker-queue subscriber registry (close hook).
 *
 * @param {WebSocket} ws
 */
export function detachWorkerQueue(ws) {
  for (const set of SUBSCRIBERS.values()) {
    for (const sub of set) {
      if (sub.ws === ws) {
        set.delete(sub);
      }
    }
  }
}

/**
 * Test-only: clear subscribers and the queue store's in-memory cache.
 */
export function __resetWorkerQueueForTest() {
  SUBSCRIBERS.clear();
  queueStore().__clearCacheForTest();
}

/**
 * Handle `subscribe-worker-queue`. Payload: `{ id: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeWorkerQueue(ws, req) {
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
  log('subscribe-worker-queue %s ws=%s', client_id, key);
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  emitWorkerQueueSnapshot(ws, client_id, queueStore().snapshot(key));
}

/**
 * Handle `unsubscribe-worker-queue`. Payload: `{ id: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeWorkerQueue(ws, req) {
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
 * Reply with the mutation result and fan out a fresh snapshot on success.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {string} workspace_key
 * @param {import('../worker/queue-store.js').QueueOpResult} result
 */
function replyMutation(ws, req, workspace_key, result) {
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: result.ok,
        conflict: result.conflict,
        queue: result.queue
      })
    )
  );
  if (result.ok) {
    fanout(workspace_key, /** @type {any} */ (result.queue));
  }
}

/**
 * @param {any} payload
 * @returns {number}
 */
function revisionOf(payload) {
  const rev = payload?.expected_revision;
  return typeof rev === 'number' && Number.isFinite(rev) ? rev : -1;
}

/**
 * Handle `worker-queue-place`. Payload:
 * `{ bead_id, lane: 'serial'|'parallel', index?, expected_revision }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueuePlace(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (
    typeof p.bead_id !== 'string' ||
    (p.lane !== 'serial' && p.lane !== 'parallel')
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { bead_id: string, lane: serial|parallel }'
        )
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const result = queueStore().place(key, {
    expected_revision: revisionOf(p),
    bead_id: p.bead_id,
    lane: p.lane,
    index: typeof p.index === 'number' ? p.index : undefined
  });
  replyMutation(ws, req, key, result);
}

/**
 * Handle `worker-queue-reorder`. Payload:
 * `{ bead_id, lane, to_index, expected_revision }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueReorder(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (
    typeof p.bead_id !== 'string' ||
    (p.lane !== 'serial' && p.lane !== 'parallel') ||
    typeof p.to_index !== 'number'
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { bead_id, lane, to_index }'
        )
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const result = queueStore().reorder(key, {
    expected_revision: revisionOf(p),
    bead_id: p.bead_id,
    lane: p.lane,
    to_index: p.to_index
  });
  replyMutation(ws, req, key, result);
}

/**
 * Handle `worker-queue-toggle`. Payload: `{ on: boolean, expected_revision }`.
 * Phase 9 only persists the flag (no dispatch).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueToggle(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.on !== 'boolean') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { on: boolean }')
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const result = queueStore().toggleAutoAdvance(key, {
    expected_revision: revisionOf(p),
    on: p.on
  });
  replyMutation(ws, req, key, result);
}

/**
 * Handle `worker-queue-remove`. Payload: `{ bead_id, expected_revision }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueRemove(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const result = queueStore().remove(key, {
    expected_revision: revisionOf(p),
    bead_id: p.bead_id
  });
  replyMutation(ws, req, key, result);
}
