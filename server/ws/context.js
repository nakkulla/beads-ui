/**
 * @import { WebSocket, WebSocketServer } from 'ws'
 * @import { MessageType } from '../../app/protocol.js'
 */
import { getGitUserName, runBd, runBdJson } from '../bd.js';
import { debug } from '../logging.js';
import { SubscriptionRegistry } from '../subscriptions.js';

export const log = debug('ws');

/**
 * @typedef {{
 *   show_id?: string | null,
 *   workspace?: Workspace | null,
 *   list_subs?: Map<string, { key: string, spec: { type: string, params?: Record<string, string | number | boolean> } }>,
 *   list_revisions?: Map<string, number>
 * }} ConnectionSubs
 */

/** @type {WeakMap<WebSocket, any>} */
const SUBS = new WeakMap();

/** @type {WebSocketServer | null} */
let CURRENT_WSS = null;

/**
 * @typedef {{ root_dir: string, db_path: string }} Workspace
 */

/**
 * Default workspace configuration applied to newly connected clients.
 *
 * Set once during `attachWsServer` from the startup workspace and READ-ONLY
 * afterwards; per-connection `set-workspace` never mutates it. The returned
 * `setWorkspace` closure repoints it to affect FUTURE connections only.
 *
 * @type {Workspace | null}
 */
let DEFAULT_WORKSPACE = null;

/**
 * Per-workspace subscription registries keyed by `root_dir`. Each workspace
 * gets an independent {@link SubscriptionRegistry} so connections in different
 * workspaces never share entries, cached snapshots, locks, or generations.
 *
 * @type {Map<string, SubscriptionRegistry>}
 */
const REGISTRIES = new Map();

/**
 * Read the current WebSocketServer reference (set by `attachWsServer`).
 *
 * @returns {WebSocketServer | null}
 */
export function getCurrentWss() {
  return CURRENT_WSS;
}

/**
 * Set the active WebSocketServer reference. Called from the connection layer.
 *
 * @param {WebSocketServer | null} wss
 */
export function setCurrentWss(wss) {
  CURRENT_WSS = wss;
}

/**
 * Read the server-wide default workspace applied to new connections.
 *
 * @returns {Workspace | null}
 */
export function getDefaultWorkspace() {
  return DEFAULT_WORKSPACE;
}

/**
 * Repoint the server-wide default workspace for FUTURE connections.
 *
 * @param {Workspace | null} workspace
 */
export function setDefaultWorkspace(workspace) {
  DEFAULT_WORKSPACE = workspace;
}

/**
 * Lazily create and cache the {@link SubscriptionRegistry} for a workspace
 * `root_dir`. Uses `String(root_dir || '')` as the stable map key so that a
 * null/undefined workspace maps to a single shared empty-key registry.
 *
 * Exported for tests so they can observe the active per-workspace registry.
 *
 * @param {string | null | undefined} root_dir
 * @returns {SubscriptionRegistry}
 */
export function registryFor(root_dir) {
  const map_key = String(root_dir || '');
  let reg = REGISTRIES.get(map_key);
  if (!reg) {
    reg = new SubscriptionRegistry();
    REGISTRIES.set(map_key, reg);
  }
  return reg;
}

/**
 * Reset all per-workspace registries. Test-only cleanup hook.
 */
export function __resetRegistriesForTest() {
  REGISTRIES.clear();
}

/**
 * Detach a connection from every per-workspace registry. Used by the
 * connection `close` handler.
 *
 * @param {WebSocket} ws
 */
export function detachConnectionFromAllRegistries(ws) {
  for (const reg of REGISTRIES.values()) {
    reg.onDisconnect(ws);
  }
}

/**
 * Resolve the effective workspace for a connection: the per-connection
 * workspace when set, otherwise the server-wide {@link DEFAULT_WORKSPACE}.
 *
 * @param {WebSocket} ws
 * @returns {Workspace | null}
 */
export function getConnWorkspace(ws) {
  return ensureSubs(ws).workspace || DEFAULT_WORKSPACE;
}

/**
 * Set the per-connection workspace for a connection.
 *
 * @param {WebSocket} ws
 * @param {Workspace | null} wsObj
 */
export function setConnWorkspace(ws, wsObj) {
  ensureSubs(ws).workspace = wsObj;
}

/**
 * Run bd in the connection's selected workspace when available.
 *
 * @param {WebSocket} ws
 * @param {string[]} args
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number, sandbox?: boolean }} [options]
 * @returns {Promise<{ code: number, stdout: string, stderr: string }>}
 */
export function runBdInWorkspace(ws, args, options = undefined) {
  const root_dir = getConnWorkspace(ws)?.root_dir;
  if (!root_dir) {
    return options === undefined ? runBd(args) : runBd(args, options);
  }

  return runBd(args, {
    ...(options || {}),
    cwd: root_dir
  });
}

/**
 * Run bd JSON commands in the connection's selected workspace when available.
 *
 * @param {WebSocket} ws
 * @param {string[]} args
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number }} [options]
 * @returns {Promise<{ code: number, stdoutJson?: unknown, stderr?: string }>}
 */
export function runBdJsonInWorkspace(ws, args, options = undefined) {
  const root_dir = getConnWorkspace(ws)?.root_dir;
  if (!root_dir) {
    return options === undefined ? runBdJson(args) : runBdJson(args, options);
  }

  return runBdJson(args, {
    ...(options || {}),
    cwd: root_dir
  });
}

/**
 * Resolve git user name from the connection's selected workspace when available.
 *
 * @param {WebSocket} ws
 * @returns {Promise<string>}
 */
export function getGitUserNameInWorkspace(ws) {
  const root_dir = getConnWorkspace(ws)?.root_dir;
  if (!root_dir) {
    return getGitUserName();
  }

  return getGitUserName({ cwd: root_dir });
}

/**
 * Get or initialize the subscription state for a socket.
 *
 * @param {WebSocket} ws
 * @returns {any}
 */
export function ensureSubs(ws) {
  let s = SUBS.get(ws);
  if (!s) {
    s = {
      show_id: null,
      workspace: null,
      list_subs: new Map(),
      list_revisions: new Map()
    };
    SUBS.set(ws, s);
  }
  return s;
}

/**
 * Get next monotonically increasing revision for a subscription key on this connection.
 *
 * @param {WebSocket} ws
 * @param {string} key
 */
export function nextListRevision(ws, key) {
  const s = ensureSubs(ws);
  const m = s.list_revisions || new Map();
  s.list_revisions = m;
  const prev = m.get(key) || 0;
  const next = prev + 1;
  m.set(key, next);
  return next;
}

/**
 * Emit a per-subscription snapshot envelope to a specific client id on a socket.
 *
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {string} key
 * @param {Array<Record<string, unknown>>} issues
 */
export function emitSubscriptionSnapshot(ws, client_id, key, issues) {
  const revision = nextListRevision(ws, key);
  const payload = {
    type: /** @type {const} */ ('snapshot'),
    id: client_id,
    revision,
    issues
  };
  const msg = JSON.stringify({
    id: `evt-${Date.now()}`,
    ok: true,
    type: /** @type {MessageType} */ ('snapshot'),
    payload
  });
  try {
    ws.send(msg);
  } catch (err) {
    log('emit snapshot send failed key=%s id=%s: %o', key, client_id, err);
  }
}

/**
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {string} key
 * @param {Record<string, unknown>} issue
 */
export function emitSubscriptionUpsert(ws, client_id, key, issue) {
  const revision = nextListRevision(ws, key);
  const payload = {
    type: 'upsert',
    id: client_id,
    revision,
    issue
  };
  const msg = JSON.stringify({
    id: `evt-${Date.now()}`,
    ok: true,
    type: /** @type {MessageType} */ ('upsert'),
    payload
  });
  try {
    ws.send(msg);
  } catch (err) {
    log('emit upsert send failed key=%s id=%s: %o', key, client_id, err);
  }
}

/**
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {string} key
 * @param {string} issue_id
 */
export function emitSubscriptionDelete(ws, client_id, key, issue_id) {
  const revision = nextListRevision(ws, key);
  const payload = {
    type: 'delete',
    id: client_id,
    revision,
    issue_id
  };
  const msg = JSON.stringify({
    id: `evt-${Date.now()}`,
    ok: true,
    type: /** @type {MessageType} */ ('delete'),
    payload
  });
  try {
    ws.send(msg);
  } catch (err) {
    log('emit delete send failed key=%s id=%s: %o', key, client_id, err);
  }
}

/**
 * Emit a Worker queue snapshot to a specific client id on a socket.
 *
 * Reuses the exact server-push envelope shape as {@link emitSubscriptionSnapshot}
 * (id/ok/type/payload) so Worker data flows through the SAME push protocol as
 * issues. The top-level `type` is a distinct `'worker-queue-snapshot'` event so
 * the client dispatches queue snapshots separately from issue `'snapshot'`
 * events. The queue carries its own CAS `revision` inside the payload.
 *
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {Record<string, unknown>} queue
 */
export function emitWorkerQueueSnapshot(ws, client_id, queue) {
  const msg = JSON.stringify({
    id: `evt-${Date.now()}`,
    ok: true,
    type: /** @type {MessageType} */ ('worker-queue-snapshot'),
    payload: {
      type: 'worker-queue-snapshot',
      id: client_id,
      queue
    }
  });
  try {
    ws.send(msg);
  } catch (err) {
    log('emit worker-queue snapshot send failed id=%s: %o', client_id, err);
  }
}

/**
 * Emit a manual UI-order snapshot to a specific client id on a socket.
 *
 * Reuses the same id/ok/type/payload push envelope as the queue/issue snapshots
 * so manual-order data flows through the SAME push protocol. The top-level
 * `type` is a distinct `'ui-order-snapshot'` event; the order carries its own
 * CAS `revision` inside the payload (spec §2).
 *
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {{ revision: number, order: Record<string, number> }} snapshot
 */
export function emitUiOrderSnapshot(ws, client_id, snapshot) {
  const msg = JSON.stringify({
    id: `evt-${Date.now()}`,
    ok: true,
    type: /** @type {MessageType} */ ('ui-order-snapshot'),
    payload: {
      type: 'ui-order-snapshot',
      id: client_id,
      revision: snapshot.revision,
      order: snapshot.order
    }
  });
  try {
    ws.send(msg);
  } catch (err) {
    log('emit ui-order snapshot send failed id=%s: %o', client_id, err);
  }
}

/**
 * Emit a session-log SNAPSHOT (all persisted raw lines) for an attempt to a
 * client. Reuses the same id/ok/type/payload envelope as the queue/issue pushes
 * so the transcript viewer flows through one push protocol (spec §5.6).
 *
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {string} attempt_id
 * @param {unknown[]} lines - Raw parsed jsonl events (untransformed stream).
 */
export function emitSessionLogSnapshot(ws, client_id, attempt_id, lines) {
  const msg = JSON.stringify({
    id: `evt-${Date.now()}`,
    ok: true,
    type: /** @type {MessageType} */ ('session-log-snapshot'),
    payload: {
      type: 'session-log-snapshot',
      id: client_id,
      attempt_id,
      lines
    }
  });
  try {
    ws.send(msg);
  } catch (err) {
    log('emit session-log snapshot send failed id=%s: %o', client_id, err);
  }
}

/**
 * Emit ONE live session-log APPEND (a single raw event) for a live attempt.
 *
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {string} attempt_id
 * @param {unknown} event - One raw parsed jsonl event.
 */
export function emitSessionLogAppend(ws, client_id, attempt_id, event) {
  const msg = JSON.stringify({
    id: `evt-${Date.now()}`,
    ok: true,
    type: /** @type {MessageType} */ ('session-log-append'),
    payload: {
      type: 'session-log-append',
      id: client_id,
      attempt_id,
      event
    }
  });
  try {
    ws.send(msg);
  } catch (err) {
    log('emit session-log append send failed id=%s: %o', client_id, err);
  }
}

/**
 * Replace a registry entry's cached snapshot with a filtered immutable array,
 * operating on the workspace registry for `root_dir`.
 *
 * @param {string} root_dir
 * @param {string} key
 * @param {Array<Record<string, unknown>>} items
 */
export function setCachedSnapshot(root_dir, key, items) {
  const entry = registryFor(root_dir).get(key);
  if (!entry) {
    return;
  }
  entry.cachedSnapshot = items.filter((it) => it && typeof it.id === 'string');
}

/**
 * Apply pre-diff filtering for closed-issues lists based on spec.params.since (epoch ms).
 *
 * @param {{ type: string, params?: Record<string, string|number|boolean> }} spec
 * @param {Array<{ id: string, updated_at: number, closed_at: number | null } & Record<string, unknown>>} items
 */
export function applyClosedIssuesFilter(spec, items) {
  if (String(spec.type) !== 'closed-issues') {
    return items;
  }
  const p = spec.params || {};
  const since = typeof p.since === 'number' ? p.since : 0;
  if (!Number.isFinite(since) || since <= 0) {
    return items;
  }
  /** @type {typeof items} */
  const out = [];
  for (const it of items) {
    const ca = it.closed_at;
    if (typeof ca === 'number' && Number.isFinite(ca) && ca >= since) {
      out.push(it);
    }
  }
  return out;
}
