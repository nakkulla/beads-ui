/**
 * @import { Server } from 'node:http'
 * @import { RawData, WebSocket } from 'ws'
 * @import { MessageType } from '../../app/protocol.js'
 */
import path from 'node:path';
import { WebSocketServer } from 'ws';
import { isRequest, makeError, makeOk } from '../../app/protocol.js';
import { verifyToken } from '../auth.js';
import { resolveWorkspaceDatabase } from '../db.js';
import {
  detachConnectionFromAllRegistries,
  ensureSubs,
  getDefaultWorkspace,
  log,
  setConnWorkspace,
  setCurrentWss,
  setDefaultWorkspace
} from './context.js';
import {
  handleAddComment,
  handleCreateIssue,
  handleDeleteIssue,
  handleDepAdd,
  handleDepRemove,
  handleEditText,
  handleGetComments,
  handleLabelAdd,
  handleLabelRemove,
  handleUpdateAssignee,
  handleUpdateExecSettings,
  handleUpdatePriority,
  handleUpdateStatus
} from './mutation-handlers.js';
import { scheduleListRefresh, setRefreshDebounceMs } from './refresh.js';
import {
  handleSubscribeList,
  handleUnsubscribeList
} from './subscription-handlers.js';
import {
  detachWorkerQueue,
  handleSubscribeSessionLog,
  handleSubscribeWorkerQueue,
  handleUnsubscribeSessionLog,
  handleUnsubscribeWorkerQueue,
  handleWorkerQueuePlace,
  handleWorkerQueueRemove,
  handleWorkerQueueReorder,
  handleWorkerQueueToggle
} from './worker-handlers.js';
import {
  handleGetWorkspace,
  handleGitPullWorkspace,
  handleListWorkspaces,
  handleSetWorkspace,
  handleSyncWorkspace
} from './workspace-handlers.js';

/**
 * Reference to the database watcher, retained for lifetime/ownership. The
 * single fs watcher follows only the startup workspace's local DB file;
 * central-dolt workspaces have no local DB writes, so cross-device live refresh
 * relies on mutation-driven `triggerMutationRefreshOnce` rather than rebinding
 * this watcher. It is intentionally write-only now that rebinding is gone.
 *
 * @type {{ rebind: (opts?: { root_dir?: string }) => void, path: string } | null}
 */
// eslint-disable-next-line no-unused-vars -- retained reference; no longer read after rebind removal
let DB_WATCHER = null;

/**
 * WebSocket Origin allowlist — browser cross-site WS hijack defense.
 *
 * Workspace mutations/queries are reachable over the WS protocol, so a
 * malicious web page the user visits must not be able to open a WS to this
 * server from the user's browser. Browsers always attach an `Origin` header to
 * WS handshakes, so a present-but-disallowed Origin (including the sandboxed
 * `"null"` origin) is rejected. An ABSENT Origin denotes a non-browser client
 * (CLI/tests); those are governed by network isolation (tailnet-only + ACL),
 * not by this check, so they are allowed here. The auth token is the real gate;
 * this Origin check is defense-in-depth against browser CSRF-style hijacks.
 *
 * Allowed origins come from `BDUI_ALLOWED_ORIGINS` (comma-separated exact
 * origins, e.g. `https://mong-nas.<tailnet>.ts.net`). When unset, only loopback
 * dev origins are permitted (fail-closed for remote origins).
 *
 * @param {string | undefined} origin - The request `Origin` header value.
 * @returns {boolean}
 */
export function isOriginAllowed(origin) {
  // Header absent → non-browser client; not the browser-hijack threat.
  if (origin === undefined) {
    return true;
  }
  // Present but empty or the sandboxed "null" origin → reject.
  if (typeof origin !== 'string' || origin.length === 0 || origin === 'null') {
    return false;
  }
  const allowed = (process.env.BDUI_ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length > 0) {
    return allowed.includes(origin);
  }
  // No explicit allowlist configured → permit loopback dev origins only.
  try {
    const { hostname } = new URL(origin);
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname === '[::1]'
    );
  } catch {
    return false;
  }
}

/**
 * Attach a WebSocket server to an existing HTTP server.
 *
 * When `options.auth_token` is a non-empty string, every new connection must
 * send `{ type: 'auth', token }` as its FIRST frame within `auth_deadline_ms`
 * (default 5000ms). A wrong/missing token, a non-auth first frame, or a timeout
 * closes the socket with code 4401 before any message is processed. When no
 * token is supplied (test/embedding contexts that never open real sockets), the
 * first-frame gate is disabled; production always supplies the token.
 *
 * @param {Server} http_server
 * @param {{ path?: string, heartbeat_ms?: number, refresh_debounce_ms?: number, root_dir?: string, initial_workspace_root?: string | null, watcher?: { rebind: (opts?: { root_dir?: string }) => void, path: string }, auth_token?: string, auth_deadline_ms?: number }} [options]
 * @returns {{ wss: WebSocketServer, broadcast: (type: MessageType, payload?: unknown) => void, scheduleListRefresh: () => void, setWorkspace: (root_dir: string) => { changed: boolean, workspace: { root_dir: string, db_path: string } } }}
 */
export function attachWsServer(http_server, options = {}) {
  const ws_path = options.path || '/ws';
  const auth_token = options.auth_token;
  const auth_required = typeof auth_token === 'string' && auth_token.length > 0;
  const auth_deadline_ms = options.auth_deadline_ms ?? 5000;

  // Initialize the default workspace applied to newly connected clients.
  const initial_root =
    options.initial_workspace_root === undefined
      ? options.root_dir || process.cwd()
      : options.initial_workspace_root;
  if (initial_root) {
    const initial_db = resolveWorkspaceDatabase({ cwd: initial_root });
    setDefaultWorkspace({
      root_dir: initial_root,
      db_path: initial_db.path
    });
  } else {
    setDefaultWorkspace(null);
  }

  if (options.watcher) {
    DB_WATCHER = options.watcher;
  }
  const heartbeat_ms = options.heartbeat_ms ?? 30000;
  if (typeof options.refresh_debounce_ms === 'number') {
    setRefreshDebounceMs(options.refresh_debounce_ms);
  }

  const wss = new WebSocketServer({
    server: http_server,
    path: ws_path,
    verifyClient: (info, cb) => {
      if (isOriginAllowed(info.origin)) {
        cb(true);
        return;
      }
      log('WS upgrade rejected: disallowed Origin %o', info.origin);
      cb(false, 403, 'Forbidden origin');
    }
  });
  setCurrentWss(wss);

  // Heartbeat: track if client answered the last ping
  wss.on('connection', (ws) => {
    log('client connected');
    // @ts-expect-error add marker property
    ws.isAlive = true;

    // Initialize subscription state for this connection and seed its workspace
    // from a COPY of the current default so per-connection switches never
    // mutate the shared default.
    ensureSubs(ws);
    const current_default = getDefaultWorkspace();
    setConnWorkspace(ws, current_default ? { ...current_default } : null);

    // First-frame auth gate. When enabled, the socket may not run any
    // handleMessage flow until it presents a valid auth frame.
    let authed = !auth_required;
    /** @type {ReturnType<typeof setTimeout> | null} */
    let auth_timer = null;
    if (auth_required) {
      auth_timer = setTimeout(() => {
        try {
          ws.close(4401, 'auth timeout');
        } catch {
          // ignore close errors
        }
      }, auth_deadline_ms);
      auth_timer.unref?.();
    }

    ws.on('pong', () => {
      // @ts-expect-error marker
      ws.isAlive = true;
    });

    ws.on('message', (data) => {
      if (!authed) {
        /** @type {any} */
        let msg = null;
        try {
          msg = JSON.parse(data.toString());
        } catch {
          msg = null;
        }
        if (
          !msg ||
          typeof msg !== 'object' ||
          msg.type !== 'auth' ||
          !verifyToken(msg.token, auth_token)
        ) {
          try {
            ws.close(4401, 'auth failed');
          } catch {
            // ignore close errors
          }
          return;
        }
        authed = true;
        if (auth_timer) {
          clearTimeout(auth_timer);
          auth_timer = null;
        }
        return;
      }
      handleMessage(ws, data);
    });

    ws.on('close', () => {
      if (auth_timer) {
        clearTimeout(auth_timer);
        auth_timer = null;
      }
      try {
        // Detach this connection from every workspace registry.
        detachConnectionFromAllRegistries(ws);
        detachWorkerQueue(ws);
      } catch {
        // ignore cleanup errors
      }
    });
  });

  const interval = setInterval(() => {
    for (const ws of wss.clients) {
      // @ts-expect-error marker
      if (ws.isAlive === false) {
        ws.terminate();
        continue;
      }
      // @ts-expect-error marker
      ws.isAlive = false;
      ws.ping();
    }
  }, heartbeat_ms);

  interval.unref?.();

  wss.on('close', () => {
    clearInterval(interval);
  });

  /**
   * Broadcast a server-initiated event to all open clients.
   *
   * @param {MessageType} type
   * @param {unknown} [payload]
   */
  function broadcast(type, payload) {
    const msg = JSON.stringify({
      id: `evt-${Date.now()}`,
      ok: true,
      type,
      payload
    });
    for (const ws of wss.clients) {
      if (ws.readyState === ws.OPEN) {
        ws.send(msg);
      }
    }
  }

  /**
   * Repoint the DEFAULT workspace for FUTURE connections. Does not affect
   * existing connections (which each carry their own workspace) and performs
   * no broadcast, registry clear, or watcher rebind. To switch an existing
   * connection, that connection must send a `set-workspace` message.
   *
   * @param {string} new_root_dir - Absolute path to the new workspace root.
   * @returns {{ changed: boolean, workspace: { root_dir: string, db_path: string } }}
   */
  function setWorkspace(new_root_dir) {
    const resolved_root = path.resolve(new_root_dir);
    const new_db = resolveWorkspaceDatabase({ cwd: resolved_root });
    const old_path = getDefaultWorkspace()?.db_path || '';

    const next = {
      root_dir: resolved_root,
      db_path: new_db.path
    };
    setDefaultWorkspace(next);

    const changed = new_db.path !== old_path;

    if (changed) {
      log('default workspace changed: %s → %s', old_path, new_db.path);
    }

    return { changed, workspace: next };
  }

  return {
    wss,
    broadcast,
    scheduleListRefresh,
    setWorkspace
    // v2: list subscription refresh handles updates
  };
}

/**
 * Handle an incoming message frame and respond to the same socket. Auth-agnostic:
 * the connection layer owns the first-frame auth gate, so this dispatcher runs
 * only for already-authenticated sockets (or test sockets driven directly).
 *
 * @param {WebSocket} ws
 * @param {RawData} data
 */
export async function handleMessage(ws, data) {
  /** @type {unknown} */
  let json;
  try {
    json = JSON.parse(data.toString());
  } catch {
    const reply = {
      id: 'unknown',
      ok: false,
      type: 'bad-json',
      error: { code: 'bad_json', message: 'Invalid JSON' }
    };
    ws.send(JSON.stringify(reply));
    return;
  }

  if (!isRequest(json)) {
    log('invalid request');
    const reply = {
      id: 'unknown',
      ok: false,
      type: 'bad-request',
      error: { code: 'bad_request', message: 'Invalid request envelope' }
    };
    ws.send(JSON.stringify(reply));
    return;
  }

  const req = json;

  switch (/** @type {string} */ (req.type)) {
    case 'ping':
      ws.send(JSON.stringify(makeOk(req, { ts: Date.now() })));
      return;
    case 'subscribe-list':
      await handleSubscribeList(ws, req);
      return;
    case 'unsubscribe-list':
      handleUnsubscribeList(ws, req);
      return;
    case 'update-assignee':
      await handleUpdateAssignee(ws, req);
      return;
    case 'update-exec-settings':
      await handleUpdateExecSettings(ws, req);
      return;
    case 'update-status':
      await handleUpdateStatus(ws, req);
      return;
    case 'update-priority':
      await handleUpdatePriority(ws, req);
      return;
    case 'edit-text':
      await handleEditText(ws, req);
      return;
    case 'create-issue':
      await handleCreateIssue(ws, req);
      return;
    case 'dep-add':
      await handleDepAdd(ws, req);
      return;
    case 'dep-remove':
      await handleDepRemove(ws, req);
      return;
    case 'label-add':
      await handleLabelAdd(ws, req);
      return;
    case 'label-remove':
      await handleLabelRemove(ws, req);
      return;
    case 'get-comments':
      await handleGetComments(ws, req);
      return;
    case 'add-comment':
      await handleAddComment(ws, req);
      return;
    case 'delete-issue':
      await handleDeleteIssue(ws, req);
      return;
    case 'list-workspaces':
      handleListWorkspaces(ws, req);
      return;
    case 'get-workspace':
      handleGetWorkspace(ws, req);
      return;
    case 'set-workspace':
      handleSetWorkspace(ws, req);
      return;
    case 'sync-workspace':
      await handleSyncWorkspace(ws, req);
      return;
    case 'git-pull-workspace':
      await handleGitPullWorkspace(ws, req);
      return;
    case 'subscribe-worker-queue':
      handleSubscribeWorkerQueue(ws, req);
      return;
    case 'unsubscribe-worker-queue':
      handleUnsubscribeWorkerQueue(ws, req);
      return;
    case 'worker-queue-place':
      handleWorkerQueuePlace(ws, req);
      return;
    case 'worker-queue-reorder':
      handleWorkerQueueReorder(ws, req);
      return;
    case 'worker-queue-toggle':
      handleWorkerQueueToggle(ws, req);
      return;
    case 'worker-queue-remove':
      handleWorkerQueueRemove(ws, req);
      return;
    case 'subscribe-session-log':
      handleSubscribeSessionLog(ws, req);
      return;
    case 'unsubscribe-session-log':
      handleUnsubscribeSessionLog(ws, req);
      return;
    default: {
      const err = makeError(
        req,
        'unknown_type',
        `Unknown message type: ${req.type}`
      );
      ws.send(JSON.stringify(err));
      return;
    }
  }
}
