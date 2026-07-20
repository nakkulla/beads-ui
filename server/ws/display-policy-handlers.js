/**
 * WebSocket handlers for the label/metadata display-policy channel.
 *
 * A `display-policy` subscription is per-workspace: on subscribe the client
 * receives the current policy snapshot, and every accepted mutation pushes the
 * whole policy back to every subscriber of that workspace. This replaces the
 * old one-shot bootstrap delivery of `config.toml [labels]`, so a settings
 * change reaches every open client (and survives workspace switches and
 * reconnects) instead of only the tab that made it.
 *
 * Concurrency: `display-policy-set` carries an `expected_revision`; the store
 * runs a revision CAS so a stale settings panel cannot clobber a newer policy.
 * On conflict the reply carries the current policy so the client can adopt and
 * retry.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { createDisplayPolicyStore } from '../display-policy-store.js';
import { emitDisplayPolicySnapshot, getConnWorkspace, log } from './context.js';

/**
 * Server-wide single display-policy store so all connections share one
 * in-memory revision — making the CAS authoritative in-process.
 *
 * @type {ReturnType<typeof createDisplayPolicyStore> | null}
 */
let STORE = null;

/**
 * @returns {ReturnType<typeof createDisplayPolicyStore>}
 */
function displayPolicyStore() {
  if (!STORE) {
    STORE = createDisplayPolicyStore();
  }
  return STORE;
}

/**
 * Per-workspace subscriber registry. Keyed by workspace root_dir; each value is
 * the set of `{ ws, client_id }` pairs currently subscribed to that workspace's
 * display policy.
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
 * Push a fresh policy snapshot to every subscriber of a workspace.
 *
 * @param {string} workspace_key
 * @param {import('../display-policy-store.js').DisplayPolicy} policy
 */
function fanout(workspace_key, policy) {
  for (const sub of subscribersFor(workspace_key)) {
    emitDisplayPolicySnapshot(sub.ws, sub.client_id, policy);
  }
}

/**
 * Detach a connection from the display-policy subscriber registry (close hook).
 *
 * @param {WebSocket} ws
 */
export function detachDisplayPolicy(ws) {
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
export function __resetDisplayPolicyForTest() {
  SUBSCRIBERS.clear();
  displayPolicyStore().__clearCacheForTest();
}

/**
 * Handle `subscribe-display-policy`. Payload: `{ id: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeDisplayPolicy(ws, req) {
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
  log('subscribe-display-policy %s ws=%s', client_id, key);
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  emitDisplayPolicySnapshot(ws, client_id, displayPolicyStore().snapshot(key));
}

/**
 * Handle `unsubscribe-display-policy`. Payload: `{ id: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeDisplayPolicy(ws, req) {
  const client_id = /** @type {any} */ (req.payload)?.id;
  // Search EVERY workspace registry, not just the connection's current one: the
  // client unsubscribes AFTER `set-workspace` has already switched the
  // connection, so the entry to remove lives under the PREVIOUS workspace key.
  // A leftover entry would keep fanning the old workspace's policy into this
  // socket and clobber the new workspace's policy client-side.
  let removed = false;
  for (const set of SUBSCRIBERS.values()) {
    for (const sub of set) {
      if (sub.ws === ws && sub.client_id === client_id) {
        set.delete(sub);
        removed = true;
      }
    }
  }
  ws.send(
    JSON.stringify(makeOk(req, { id: client_id, unsubscribed: removed }))
  );
}

/**
 * Handle `display-policy-set`. Payload: `{ expected_revision, policy }` where
 * `policy` is a patch (each present list key fully replaces that list; `chips`
 * merges per key). CAS-guarded; replies `{ applied, conflict, revision, policy }`
 * and, on success, fans out the new policy to every subscriber of the
 * workspace. On conflict the reply carries the current policy so the client can
 * adopt + retry.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleDisplayPolicySet(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (
    typeof p.expected_revision !== 'number' ||
    !Number.isFinite(p.expected_revision) ||
    !p.policy ||
    typeof p.policy !== 'object' ||
    Array.isArray(p.policy)
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { expected_revision: number, policy: object }'
        )
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const result = displayPolicyStore().setPolicy(key, {
    expected_revision: p.expected_revision,
    policy: p.policy
  });
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: result.ok,
        conflict: result.conflict,
        revision: result.revision,
        policy: result.policy
      })
    )
  );
  if (result.ok) {
    fanout(key, result.policy);
  }
}
