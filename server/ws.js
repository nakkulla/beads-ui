/**
 * @import { Server } from 'node:http'
 * @import { RawData, WebSocket } from 'ws'
 * @import { MessageType } from '../app/protocol.js'
 */
import path from 'node:path';
import { WebSocketServer } from 'ws';
import { isRequest, makeError, makeOk } from '../app/protocol.js';
import {
  getGitUserName,
  runBd,
  runBdJson,
  runShell,
  stderrTail
} from './bd.js';
import { resolveWorkspaceDatabase } from './db.js';
import { fetchListForSubscription } from './list-adapters.js';
import { debug } from './logging.js';
import { getAvailableWorkspaces } from './registry-watcher.js';
import { SubscriptionRegistry, keyOf } from './subscriptions.js';
import { validateSubscribeListPayload } from './validators.js';

const log = debug('ws');
const UPDATE_STATUS_ALLOWED = new Set([
  'open',
  'in_progress',
  'deferred',
  'resolved',
  'closed'
]);

/**
 * Debounced refresh scheduling for active list subscriptions.
 * A trailing window coalesces rapid change bursts into a single refresh run.
 */
/** @type {ReturnType<typeof setTimeout> | null} */
let REFRESH_TIMER = null;
let REFRESH_DEBOUNCE_MS = 75;

/**
 * Mutation refresh window gate. When active, watcher-driven list refresh
 * scheduling is suppressed. The gate resolves either when a watcher event
 * arrives (via scheduleListRefresh) or when a timeout elapses, at which
 * point a single refresh pass over all active list subscriptions is run.
 */
/**
 * @typedef {Object} MutationGate
 * @property {boolean} resolved
 * @property {(reason: 'watcher'|'timeout') => void} resolve
 * @property {ReturnType<typeof setTimeout>} timer
 */
/** @type {MutationGate | null} */
let MUTATION_GATE = null;

/**
 * Start a mutation window gate if not already active. The gate resolves on the
 * next watcher event or after `timeout_ms`, then triggers a single refresh run
 * across all active list subscriptions. Watcher-driven refresh scheduling is
 * suppressed during the window.
 *
 * Fire-and-forget; callers should not await this.
 *
 * @param {number} [timeout_ms]
 */
function triggerMutationRefreshOnce(timeout_ms = 500) {
  if (MUTATION_GATE) {
    return;
  }
  /** @type {(r: 'watcher'|'timeout') => void} */
  let doResolve = () => {};
  const p = new Promise((resolve) => {
    doResolve = resolve;
  });
  MUTATION_GATE = {
    resolved: false,
    resolve: (reason) => {
      if (!MUTATION_GATE || MUTATION_GATE.resolved) {
        return;
      }
      MUTATION_GATE.resolved = true;
      try {
        doResolve(reason);
      } catch {
        // ignore resolve errors
      }
    },
    timer: setTimeout(() => {
      try {
        MUTATION_GATE?.resolve('timeout');
      } catch {
        // ignore
      }
    }, timeout_ms)
  };
  MUTATION_GATE.timer.unref?.();

  // After resolution, run a single refresh across active subs and clear gate
  void p.then(async () => {
    log('mutation window resolved → refresh active subs');
    try {
      await refreshAllActiveListSubscriptions();
    } catch {
      // ignore refresh errors
    } finally {
      try {
        if (MUTATION_GATE?.timer) {
          clearTimeout(MUTATION_GATE.timer);
        }
      } catch {
        // ignore
      }
      MUTATION_GATE = null;
    }
  });
}

/**
 * Collect unique active list subscriptions across all connected clients,
 * scoped to each connection's workspace. De-duplicated by the
 * (`root_dir` + `key`) pair so the same spec in two different workspaces is
 * refreshed independently (each with its own cwd) instead of being collapsed
 * into a single workspace's data.
 *
 * @returns {Array<{ root_dir: string, spec: { type: string, params?: Record<string,string|number|boolean> }, key: string }>}
 */
function collectActiveListSubscriptions() {
  /** @type {Array<{ root_dir: string, spec: { type: string, params?: Record<string,string|number|boolean> }, key: string }>} */
  const pairs = [];
  /** @type {Set<string>} */
  const seen = new Set();
  const wss = CURRENT_WSS;
  if (!wss) {
    return pairs;
  }
  for (const ws of wss.clients) {
    if (ws.readyState !== ws.OPEN) {
      continue;
    }
    const s = ensureSubs(/** @type {any} */ (ws));
    if (!s.list_subs) {
      continue;
    }
    const root_dir = getConnWorkspace(/** @type {any} */ (ws))?.root_dir || '';
    for (const { key, spec } of s.list_subs.values()) {
      const dedupe_key = `${root_dir}\0${key}`;
      if (!seen.has(dedupe_key)) {
        seen.add(dedupe_key);
        pairs.push({ root_dir, spec, key });
      }
    }
  }
  return pairs;
}

/**
 * Run refresh for all active (workspace, spec) pairs and publish deltas.
 */
async function refreshAllActiveListSubscriptions() {
  const pairs = collectActiveListSubscriptions();
  // Run refreshes concurrently; locking is handled per key per registry
  await Promise.all(
    pairs.map(async ({ root_dir, spec }) => {
      try {
        await refreshAndPublish(root_dir, spec);
      } catch {
        // ignore refresh errors per (workspace, spec) pair
      }
    })
  );
}

/**
 * Schedule a coalesced refresh of all active list subscriptions.
 */
export function scheduleListRefresh() {
  // Suppress watcher-driven refreshes during an active mutation gate; resolve gate once
  if (MUTATION_GATE) {
    try {
      MUTATION_GATE.resolve('watcher');
    } catch {
      // ignore
    }
    return;
  }
  if (REFRESH_TIMER) {
    clearTimeout(REFRESH_TIMER);
  }
  REFRESH_TIMER = setTimeout(() => {
    REFRESH_TIMER = null;
    // Fire and forget; callers don't await scheduling
    void refreshAllActiveListSubscriptions();
  }, REFRESH_DEBOUNCE_MS);
  REFRESH_TIMER.unref?.();
}

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
 * Per-workspace subscription registries keyed by `root_dir`. Each workspace
 * gets an independent {@link SubscriptionRegistry} so connections in different
 * workspaces never share entries, cached snapshots, locks, or generations.
 *
 * @type {Map<string, SubscriptionRegistry>}
 */
const REGISTRIES = new Map();

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
 * Resolve the effective workspace for a connection: the per-connection
 * workspace when set, otherwise the server-wide {@link DEFAULT_WORKSPACE}.
 *
 * @param {WebSocket} ws
 * @returns {Workspace | null}
 */
function getConnWorkspace(ws) {
  return ensureSubs(ws).workspace || DEFAULT_WORKSPACE;
}

/**
 * Set the per-connection workspace for a connection.
 *
 * @param {WebSocket} ws
 * @param {Workspace | null} wsObj
 */
function setConnWorkspace(ws, wsObj) {
  ensureSubs(ws).workspace = wsObj;
}

/**
 * In-flight workspace operations keyed by workspace `root_dir`. Prevents the
 * same workspace from running `sync-workspace` and `git-pull-workspace`
 * concurrently across multiple clients or raw requests.
 *
 * @type {Map<string, { kind: 'sync' | 'git-pull' }>}
 */
const ACTIVE_WORKSPACE_OPS = new Map();

/**
 * Classify the result of a successful `git pull --rebase --autostash` run.
 * Stash pop conflict requires an explicit failure marker; absence of
 * "Applied autostash" is not enough since no-op / no-stash cases also lack it.
 *
 * @param {string} combined - stdout and stderr concatenated.
 * @returns {'updated' | 'up_to_date' | 'stash_pop_conflict'}
 */
function detectGitPullStatus(combined) {
  const stash_failed_markers = [
    'cannot apply stash',
    'could not restore stash',
    'Applied autostash failed'
  ];
  if (stash_failed_markers.some((m) => combined.includes(m))) {
    return 'stash_pop_conflict';
  }
  if (
    combined.includes('Already up to date') ||
    combined.includes('Already up-to-date')
  ) {
    return 'up_to_date';
  }
  return 'updated';
}

/**
 * Try to acquire a per-workspace operation lock.
 *
 * @param {string} root - Absolute workspace root directory.
 * @param {'sync' | 'git-pull'} kind
 * @returns {{ ok: true } | { ok: false, existing_kind: 'sync' | 'git-pull' }}
 */
function acquireWorkspaceLock(root, kind) {
  const existing = ACTIVE_WORKSPACE_OPS.get(root);
  if (existing) {
    return { ok: false, existing_kind: existing.kind };
  }
  ACTIVE_WORKSPACE_OPS.set(root, { kind });
  return { ok: true };
}

/**
 * Release a per-workspace operation lock.
 *
 * @param {string} root
 */
function releaseWorkspaceLock(root) {
  ACTIVE_WORKSPACE_OPS.delete(root);
}

/**
 * Run bd in the connection's selected workspace when available.
 *
 * @param {WebSocket} ws
 * @param {string[]} args
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number, sandbox?: boolean }} [options]
 * @returns {Promise<{ code: number, stdout: string, stderr: string }>}
 */
function runBdInWorkspace(ws, args, options = undefined) {
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
function runBdJsonInWorkspace(ws, args, options = undefined) {
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
function getGitUserNameInWorkspace(ws) {
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
function ensureSubs(ws) {
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
/**
 * @param {WebSocket} ws
 * @param {string} key
 */
function nextListRevision(ws, key) {
  const s = ensureSubs(ws);
  const m = s.list_revisions || new Map();
  s.list_revisions = m;
  const prev = m.get(key) || 0;
  const next = prev + 1;
  m.set(key, next);
  return next;
}

/**
 * Emit per-subscription envelopes to a specific client id on a socket.
 * Helpers for snapshot / upsert / delete.
 */
/**
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {string} key
 * @param {Array<Record<string, unknown>>} issues
 */
function emitSubscriptionSnapshot(ws, client_id, key, issues) {
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
function emitSubscriptionUpsert(ws, client_id, key, issue) {
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
function emitSubscriptionDelete(ws, client_id, key, issue_id) {
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

// issues-changed removed in v2: detail and lists are pushed via subscriptions

/**
 * Replace a registry entry's cached snapshot with a filtered immutable array,
 * operating on the workspace registry for `root_dir`.
 *
 * @param {string} root_dir
 * @param {string} key
 * @param {Array<Record<string, unknown>>} items
 */
function setCachedSnapshot(root_dir, key, items) {
  const entry = registryFor(root_dir).get(key);
  if (!entry) {
    return;
  }
  entry.cachedSnapshot = items.filter((it) => it && typeof it.id === 'string');
}

/**
 * Run a refresh in the background for a subscription spec in a workspace.
 *
 * @param {string} root_dir
 * @param {{ type: string, params?: Record<string, string|number|boolean> }} spec
 */
function scheduleBackgroundRefresh(root_dir, spec) {
  void refreshAndPublish(root_dir, spec).catch((err) => {
    log('background refresh failed for %s: %o', keyOf(spec), err);
  });
}

/**
 * Refresh a subscription spec within a workspace: fetch via adapter (cwd =
 * `root_dir`), apply to that workspace's registry and emit per-subscription
 * full-issue envelopes ONLY to subscribers currently in that workspace.
 * Serialized per key within the workspace registry.
 *
 * @param {string} root_dir
 * @param {{ type: string, params?: Record<string, string|number|boolean> }} spec
 */
async function refreshAndPublish(root_dir, spec) {
  const reg = registryFor(root_dir);
  const gen = reg.generation;
  const key = keyOf(spec);
  await reg.withKeyLock(key, async () => {
    if (reg.generation !== gen) {
      return;
    }
    const res = await fetchListForSubscription(spec, {
      cwd: root_dir || undefined
    });
    if (!res.ok) {
      log('refresh failed for %s: %s %o', key, res.error.message, res.error);
      return;
    }
    if (reg.generation !== gen) {
      return;
    }
    const items = applyClosedIssuesFilter(spec, res.items);
    const prev_size = reg.get(key)?.itemsById.size || 0;
    const delta = reg.applyItems(key, items);
    setCachedSnapshot(root_dir, key, items);
    const entry = reg.get(key);
    if (!entry || entry.subscribers.size === 0) {
      return;
    }
    /** @type {Map<string, any>} */
    const by_id = new Map();
    for (const it of items) {
      if (it && typeof it.id === 'string') {
        by_id.set(it.id, it);
      }
    }
    for (const ws of entry.subscribers) {
      if (ws.readyState !== ws.OPEN) continue;
      const s = ensureSubs(ws);
      const subs = s.list_subs || new Map();
      /** @type {string[]} */
      const client_ids = [];
      for (const [cid, v] of subs.entries()) {
        if (v.key === key) client_ids.push(cid);
      }
      if (client_ids.length === 0) continue;
      if (prev_size === 0) {
        for (const cid of client_ids) {
          emitSubscriptionSnapshot(ws, cid, key, items);
        }
        continue;
      }
      for (const cid of client_ids) {
        for (const id of [...delta.added, ...delta.updated]) {
          const issue = by_id.get(id);
          if (issue) {
            emitSubscriptionUpsert(ws, cid, key, issue);
          }
        }
        for (const id of delta.removed) {
          emitSubscriptionDelete(ws, cid, key, id);
        }
      }
    }
  });
}

/**
 * Apply pre-diff filtering for closed-issues lists based on spec.params.since (epoch ms).
 *
 * @param {{ type: string, params?: Record<string, string|number|boolean> }} spec
 * @param {Array<{ id: string, updated_at: number, closed_at: number | null } & Record<string, unknown>>} items
 */
function applyClosedIssuesFilter(spec, items) {
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

/**
 * WebSocket Origin allowlist — browser cross-site WS hijack defense.
 *
 * Workspace mutations/queries are reachable over the WS protocol, so a
 * malicious web page the user visits must not be able to open a WS to this
 * server from the user's browser. Browsers always attach an `Origin` header to
 * WS handshakes, so a present-but-disallowed Origin (including the sandboxed
 * `"null"` origin) is rejected. An ABSENT Origin denotes a non-browser client
 * (CLI/tests); those are governed by network isolation (tailnet-only + ACL),
 * not by this check, so they are allowed here.
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
 * @param {Server} http_server
 * @param {{ path?: string, heartbeat_ms?: number, refresh_debounce_ms?: number, root_dir?: string, initial_workspace_root?: string | null, watcher?: { rebind: (opts?: { root_dir?: string }) => void, path: string } }} [options]
 * @returns {{ wss: WebSocketServer, broadcast: (type: MessageType, payload?: unknown) => void, scheduleListRefresh: () => void, setWorkspace: (root_dir: string) => { changed: boolean, workspace: { root_dir: string, db_path: string } } }}
 */
export function attachWsServer(http_server, options = {}) {
  const ws_path = options.path || '/ws';

  // Initialize the default workspace applied to newly connected clients.
  const initial_root =
    options.initial_workspace_root === undefined
      ? options.root_dir || process.cwd()
      : options.initial_workspace_root;
  if (initial_root) {
    const initial_db = resolveWorkspaceDatabase({ cwd: initial_root });
    DEFAULT_WORKSPACE = {
      root_dir: initial_root,
      db_path: initial_db.path
    };
  } else {
    DEFAULT_WORKSPACE = null;
  }

  if (options.watcher) {
    DB_WATCHER = options.watcher;
  }
  const heartbeat_ms = options.heartbeat_ms ?? 30000;
  if (typeof options.refresh_debounce_ms === 'number') {
    const n = options.refresh_debounce_ms;
    if (Number.isFinite(n) && n >= 0) {
      REFRESH_DEBOUNCE_MS = n;
    }
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
  CURRENT_WSS = wss;

  // Heartbeat: track if client answered the last ping
  wss.on('connection', (ws) => {
    log('client connected');
    // @ts-expect-error add marker property
    ws.isAlive = true;

    // Initialize subscription state for this connection and seed its workspace
    // from a COPY of the current default so per-connection switches never
    // mutate the shared default.
    ensureSubs(ws);
    setConnWorkspace(ws, DEFAULT_WORKSPACE ? { ...DEFAULT_WORKSPACE } : null);

    ws.on('pong', () => {
      // @ts-expect-error marker
      ws.isAlive = true;
    });

    ws.on('message', (data) => {
      handleMessage(ws, data);
    });

    ws.on('close', () => {
      try {
        // Detach this connection from every workspace registry.
        for (const reg of REGISTRIES.values()) {
          reg.onDisconnect(ws);
        }
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
   * @returns {{ changed: boolean, workspace: Workspace }}
   */
  function setWorkspace(new_root_dir) {
    const resolved_root = path.resolve(new_root_dir);
    const new_db = resolveWorkspaceDatabase({ cwd: resolved_root });
    const old_path = DEFAULT_WORKSPACE?.db_path || '';

    DEFAULT_WORKSPACE = {
      root_dir: resolved_root,
      db_path: new_db.path
    };

    const changed = new_db.path !== old_path;

    if (changed) {
      log('default workspace changed: %s → %s', old_path, new_db.path);
    }

    return { changed, workspace: DEFAULT_WORKSPACE };
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
 * Handle an incoming message frame and respond to the same socket.
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

  // Dispatch known types here as we implement them. For now, only a ping utility.
  if (req.type === /** @type {MessageType} */ ('ping')) {
    ws.send(JSON.stringify(makeOk(req, { ts: Date.now() })));
    return;
  }

  // subscribe-list: payload { id: string, type: string, params?: object }
  if (req.type === 'subscribe-list') {
    const payload_id = /** @type {any} */ (req.payload)?.id || '';
    log('subscribe-list %s', payload_id);
    const validation = validateSubscribeListPayload(
      /** @type {any} */ (req.payload || {})
    );
    if (!validation.ok) {
      ws.send(
        JSON.stringify(makeError(req, validation.code, validation.message))
      );
      return;
    }
    const client_id = validation.id;
    const spec = validation.spec;
    const key = keyOf(spec);
    const root_dir = getConnWorkspace(ws)?.root_dir || '';
    const reg = registryFor(root_dir);
    const { entry: existing_entry } = reg.ensure(spec);

    /**
     * Reply with an error and avoid attaching the subscription when
     * initialization fails.
     *
     * @param {string} code
     * @param {string} message
     * @param {Record<string, unknown>|undefined} details
     */
    const replyWithError = (code, message, details = undefined) => {
      ws.send(JSON.stringify(makeError(req, code, message, details)));
    };

    if (existing_entry.cachedSnapshot !== null) {
      const s = ensureSubs(ws);
      const { key: attached_key } = reg.attach(spec, ws);
      s.list_subs?.set(client_id, { key: attached_key, spec });

      try {
        emitSubscriptionSnapshot(
          ws,
          client_id,
          attached_key,
          existing_entry.cachedSnapshot
        );
      } catch (err) {
        log('cache hit snapshot send failed for %s: %o', attached_key, err);
        s.list_subs?.delete(client_id);
        try {
          reg.detach(spec, ws);
        } catch {
          // ignore detach errors
        }
        replyWithError('bd_error', 'Failed to publish cached snapshot', {
          key
        });
        return;
      }

      ws.send(
        JSON.stringify(makeOk(req, { id: client_id, key: attached_key }))
      );
      scheduleBackgroundRefresh(root_dir, spec);
      return;
    }

    /** @type {Awaited<ReturnType<typeof fetchListForSubscription>> | null} */
    let initial = null;
    try {
      initial = await fetchListForSubscription(spec, {
        cwd: root_dir || undefined
      });
    } catch (err) {
      log('subscribe-list snapshot error for %s: %o', key, err);
      const message =
        (err && /** @type {any} */ (err).message) || 'Failed to load list';
      replyWithError('bd_error', String(message), { key });
      return;
    }

    if (!initial.ok) {
      log(
        'initial snapshot failed for %s: %s %o',
        key,
        initial.error.message,
        initial.error
      );
      const details = { ...(initial.error.details || {}), key };
      replyWithError(initial.error.code, initial.error.message, details);
      return;
    }

    const s = ensureSubs(ws);
    const { key: attached_key } = reg.attach(spec, ws);
    s.list_subs?.set(client_id, { key: attached_key, spec });

    try {
      await reg.withKeyLock(attached_key, async () => {
        const items = applyClosedIssuesFilter(
          spec,
          initial ? initial.items : []
        );
        void reg.applyItems(attached_key, items);
        setCachedSnapshot(root_dir, attached_key, items);
        emitSubscriptionSnapshot(ws, client_id, attached_key, items);
      });
    } catch (err) {
      log('subscribe-list snapshot error for %s: %o', attached_key, err);
      s.list_subs?.delete(client_id);
      try {
        reg.detach(spec, ws);
      } catch {
        // ignore detach errors
      }
      replyWithError('bd_error', 'Failed to publish snapshot', { key });
      return;
    }

    ws.send(JSON.stringify(makeOk(req, { id: client_id, key: attached_key })));
    return;
  }

  // unsubscribe-list: payload { id: string }
  if (req.type === 'unsubscribe-list') {
    log('unsubscribe-list %s', /** @type {any} */ (req.payload)?.id || '');
    const { id: client_id } = /** @type {any} */ (req.payload || {});
    if (typeof client_id !== 'string' || client_id.length === 0) {
      ws.send(
        JSON.stringify(
          makeError(req, 'bad_request', 'payload.id must be a non-empty string')
        )
      );
      return;
    }
    const s = ensureSubs(ws);
    const sub = s.list_subs?.get(client_id) || null;
    let removed = false;
    if (sub) {
      try {
        removed = registryFor(getConnWorkspace(ws)?.root_dir).detach(
          sub.spec,
          ws
        );
      } catch {
        removed = false;
      }
      s.list_subs?.delete(client_id);
    }
    ws.send(
      JSON.stringify(
        makeOk(req, {
          id: client_id,
          unsubscribed: removed
        })
      )
    );
    return;
  }

  // Removed: subscribe-updates and subscribe-issues. No-ops in v2.

  // Legacy read RPCs were removed in favor of push-only subscriptions

  // Removed: show-issue. Details flow is push-only via `subscribe-list { type: 'issue-detail' }`.

  // type updates are not exposed via UI; no handler

  // update-assignee
  if (req.type === 'update-assignee') {
    const { id, assignee } = /** @type {any} */ (req.payload || {});
    if (
      typeof id !== 'string' ||
      id.length === 0 ||
      typeof assignee !== 'string'
    ) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bad_request',
            'payload requires { id: string, assignee: string }'
          )
        )
      );
      return;
    }
    // Pass empty string to clear assignee when requested
    const res = await runBdInWorkspace(ws, [
      'update',
      id,
      '--assignee',
      assignee
    ]);
    if (res.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
      );
      return;
    }
    const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
    if (shown.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
      );
      return;
    }
    ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
    try {
      triggerMutationRefreshOnce();
    } catch {
      // ignore
    }
    return;
  }

  // update-status
  if (req.type === 'update-status') {
    log('update-status');
    const { id, status } = /** @type {any} */ (req.payload);
    if (
      typeof id !== 'string' ||
      id.length === 0 ||
      typeof status !== 'string' ||
      !UPDATE_STATUS_ALLOWED.has(status)
    ) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bad_request',
            "payload requires { id: string, status: 'open'|'in_progress'|'deferred'|'resolved'|'closed' }"
          )
        )
      );
      return;
    }
    const res = await runBdInWorkspace(ws, ['update', id, '--status', status]);
    if (res.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
      );
      return;
    }
    const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
    if (shown.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
      );
      return;
    }
    ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
    // After mutation, refresh active subscriptions once (watcher or timeout)
    try {
      triggerMutationRefreshOnce();
    } catch {
      // ignore
    }
    return;
  }

  // update-priority
  if (req.type === 'update-priority') {
    log('update-priority');
    const { id, priority } = /** @type {any} */ (req.payload);
    if (
      typeof id !== 'string' ||
      id.length === 0 ||
      typeof priority !== 'number' ||
      priority < 0 ||
      priority > 4
    ) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bad_request',
            'payload requires { id: string, priority: 0..4 }'
          )
        )
      );
      return;
    }
    const res = await runBdInWorkspace(ws, [
      'update',
      id,
      '--priority',
      String(priority)
    ]);
    if (res.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
      );
      return;
    }
    const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
    if (shown.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
      );
      return;
    }
    ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
    try {
      triggerMutationRefreshOnce();
    } catch {
      // ignore
    }
    return;
  }

  // edit-text
  if (req.type === 'edit-text') {
    log('edit-text');
    const { id, field, value } = /** @type {any} */ (req.payload);
    if (
      typeof id !== 'string' ||
      id.length === 0 ||
      (field !== 'title' &&
        field !== 'description' &&
        field !== 'acceptance' &&
        field !== 'notes' &&
        field !== 'design') ||
      typeof value !== 'string'
    ) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bad_request',
            "payload requires { id: string, field: 'title'|'description'|'acceptance'|'notes'|'design', value: string }"
          )
        )
      );
      return;
    }
    // Map UI fields to bd CLI flags
    // title       → --title
    // description → --description
    // acceptance  → --acceptance-criteria
    // notes       → --notes
    // design      → --design
    const flag =
      field === 'title'
        ? '--title'
        : field === 'description'
          ? '--description'
          : field === 'acceptance'
            ? '--acceptance-criteria'
            : field === 'notes'
              ? '--notes'
              : '--design';
    const res = await runBdInWorkspace(ws, ['update', id, flag, value]);
    if (res.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
      );
      return;
    }
    const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
    if (shown.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
      );
      return;
    }
    ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
    try {
      triggerMutationRefreshOnce();
    } catch {
      // ignore
    }
    return;
  }

  // create-issue
  if (req.type === 'create-issue') {
    log('create-issue');
    const { title, type, priority, description } = /** @type {any} */ (
      req.payload || {}
    );
    if (typeof title !== 'string' || title.length === 0) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bad_request',
            'payload requires { title: string, ... }'
          )
        )
      );
      return;
    }
    const args = ['create', title];
    if (
      typeof type === 'string' &&
      (type === 'bug' ||
        type === 'feature' ||
        type === 'task' ||
        type === 'epic' ||
        type === 'chore')
    ) {
      args.push('-t', type);
    }
    if (typeof priority === 'number' && priority >= 0 && priority <= 4) {
      args.push('-p', String(priority));
    }
    if (typeof description === 'string' && description.length > 0) {
      args.push('-d', description);
    }
    const res = await runBdInWorkspace(ws, args);
    if (res.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
      );
      return;
    }
    // Reply with a minimal ack
    ws.send(JSON.stringify(makeOk(req, { created: true })));
    // Refresh active subscriptions once (watcher or timeout)
    try {
      triggerMutationRefreshOnce();
    } catch {
      // ignore
    }
    return;
  }

  // dep-add: payload { a: string, b: string, view_id?: string }
  if (req.type === 'dep-add') {
    const { a, b, view_id } = /** @type {any} */ (req.payload || {});
    if (
      typeof a !== 'string' ||
      a.length === 0 ||
      typeof b !== 'string' ||
      b.length === 0
    ) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bad_request',
            'payload requires { a: string, b: string }'
          )
        )
      );
      return;
    }
    const res = await runBdInWorkspace(ws, ['dep', 'add', a, b]);
    if (res.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
      );
      return;
    }
    const id = typeof view_id === 'string' && view_id.length > 0 ? view_id : a;
    const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
    if (shown.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
      );
      return;
    }
    ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
    try {
      triggerMutationRefreshOnce();
    } catch {
      // ignore
    }
    return;
  }

  // dep-remove: payload { a: string, b: string, view_id?: string }
  if (req.type === 'dep-remove') {
    const { a, b, view_id } = /** @type {any} */ (req.payload || {});
    if (
      typeof a !== 'string' ||
      a.length === 0 ||
      typeof b !== 'string' ||
      b.length === 0
    ) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bad_request',
            'payload requires { a: string, b: string }'
          )
        )
      );
      return;
    }
    const res = await runBdInWorkspace(ws, ['dep', 'remove', a, b]);
    if (res.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
      );
      return;
    }
    const id = typeof view_id === 'string' && view_id.length > 0 ? view_id : a;
    const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
    if (shown.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
      );
      return;
    }
    ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
    try {
      triggerMutationRefreshOnce();
    } catch {
      // ignore
    }
    return;
  }

  // label-add: payload { id: string, label: string }
  if (req.type === 'label-add') {
    const { id, label } = /** @type {any} */ (req.payload || {});
    if (
      typeof id !== 'string' ||
      id.length === 0 ||
      typeof label !== 'string' ||
      label.trim().length === 0
    ) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bad_request',
            'payload requires { id: string, label: non-empty string }'
          )
        )
      );
      return;
    }
    const res = await runBdInWorkspace(ws, ['label', 'add', id, label.trim()]);
    if (res.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
      );
      return;
    }
    const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
    if (shown.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
      );
      return;
    }
    ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
    try {
      triggerMutationRefreshOnce();
    } catch {
      // ignore
    }
    return;
  }

  // label-remove: payload { id: string, label: string }
  if (req.type === 'label-remove') {
    const { id, label } = /** @type {any} */ (req.payload || {});
    if (
      typeof id !== 'string' ||
      id.length === 0 ||
      typeof label !== 'string' ||
      label.trim().length === 0
    ) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bad_request',
            'payload requires { id: string, label: non-empty string }'
          )
        )
      );
      return;
    }
    const res = await runBdInWorkspace(ws, [
      'label',
      'remove',
      id,
      label.trim()
    ]);
    if (res.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
      );
      return;
    }
    const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
    if (shown.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
      );
      return;
    }
    ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
    try {
      triggerMutationRefreshOnce();
    } catch {
      // ignore
    }
    return;
  }

  // get-comments: payload { id: string }
  if (req.type === 'get-comments') {
    const { id } = /** @type {any} */ (req.payload || {});
    if (typeof id !== 'string' || id.length === 0) {
      ws.send(
        JSON.stringify(
          makeError(req, 'bad_request', 'payload requires { id: string }')
        )
      );
      return;
    }
    const res = await runBdJsonInWorkspace(ws, ['comments', id, '--json']);
    if (res.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
      );
      return;
    }
    ws.send(JSON.stringify(makeOk(req, res.stdoutJson || [])));
    return;
  }

  // add-comment: payload { id: string, text: string }
  if (req.type === 'add-comment') {
    const { id, text } = /** @type {any} */ (req.payload || {});
    if (
      typeof id !== 'string' ||
      id.length === 0 ||
      typeof text !== 'string' ||
      text.trim().length === 0
    ) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bad_request',
            'payload requires { id: string, text: non-empty string }'
          )
        )
      );
      return;
    }

    // Get git user name for author attribution
    const author = await getGitUserNameInWorkspace(ws);
    const args = ['comment', id, text.trim()];
    if (author) {
      args.push('--actor', author);
    }

    const res = await runBdInWorkspace(ws, args);
    if (res.code !== 0) {
      ws.send(
        JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
      );
      return;
    }

    // Return updated comments list
    const comments = await runBdJsonInWorkspace(ws, ['comments', id, '--json']);
    if (comments.code !== 0) {
      ws.send(
        JSON.stringify(
          makeError(req, 'bd_error', comments.stderr || 'bd failed')
        )
      );
      return;
    }
    ws.send(JSON.stringify(makeOk(req, comments.stdoutJson || [])));
    return;
  }

  // delete-issue: payload { id: string }
  if (req.type === 'delete-issue') {
    const { id } = /** @type {any} */ (req.payload || {});
    if (typeof id !== 'string' || id.length === 0) {
      ws.send(
        JSON.stringify(
          makeError(req, 'bad_request', 'payload requires { id: string }')
        )
      );
      return;
    }
    const res = await runBdInWorkspace(ws, ['delete', id, '--force']);
    if (res.code !== 0) {
      ws.send(
        JSON.stringify(
          makeError(req, 'bd_error', res.stderr || 'bd delete failed')
        )
      );
      return;
    }
    ws.send(JSON.stringify(makeOk(req, { deleted: true, id })));
    try {
      triggerMutationRefreshOnce();
    } catch {
      // ignore
    }
    return;
  }

  // list-workspaces: returns all available workspaces from the registry
  if (req.type === 'list-workspaces') {
    log('list-workspaces');
    const workspaces = getAvailableWorkspaces();
    ws.send(
      JSON.stringify(
        makeOk(req, {
          workspaces,
          current: getConnWorkspace(ws)
        })
      )
    );
    return;
  }

  // get-workspace: returns this connection's current workspace
  if (req.type === 'get-workspace') {
    log('get-workspace');
    ws.send(JSON.stringify(makeOk(req, getConnWorkspace(ws))));
    return;
  }

  // set-workspace: payload { path: string } — switches THIS connection only
  if (req.type === 'set-workspace') {
    log('set-workspace');
    const { path: workspace_path } = /** @type {any} */ (req.payload || {});
    if (
      typeof workspace_path !== 'string' ||
      workspace_path.length === 0 ||
      !path.isAbsolute(workspace_path)
    ) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bad_request',
            'payload requires { path: string } (absolute workspace path)'
          )
        )
      );
      return;
    }

    // Resolve and validate the path against the available workspace allowlist.
    const resolved = path.resolve(workspace_path);
    const allowed = new Set(
      getAvailableWorkspaces().map((workspace) => path.resolve(workspace.path))
    );
    if (!allowed.has(resolved)) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'bad_request',
            'Workspace must be in the available workspace list'
          )
        )
      );
      return;
    }

    const old = getConnWorkspace(ws);
    const new_db = resolveWorkspaceDatabase({ cwd: resolved });

    // Detach this connection from its OLD workspace registry and drop its
    // subscription bookkeeping so it only ever holds subscriptions in its
    // current workspace registry.
    const s = ensureSubs(ws);
    const old_reg = registryFor(old?.root_dir);
    if (s.list_subs) {
      for (const { spec } of s.list_subs.values()) {
        try {
          old_reg.detach(spec, ws);
        } catch {
          // ignore detach errors
        }
      }
      s.list_subs.clear();
    }
    if (s.list_revisions) {
      s.list_revisions.clear();
    }

    setConnWorkspace(ws, { root_dir: resolved, db_path: new_db.path });

    const changed = new_db.path !== (old?.db_path || '');

    if (changed) {
      log(
        'connection workspace changed via set-workspace: %s → %s',
        old?.db_path || '',
        new_db.path
      );
    }

    ws.send(
      JSON.stringify(
        makeOk(req, {
          changed,
          workspace: getConnWorkspace(ws)
        })
      )
    );
    return;
  }

  if (req.type === 'sync-workspace') {
    log('sync-workspace');

    const conn_ws = getConnWorkspace(ws);
    const root_snapshot = conn_ws?.root_dir;
    if (!root_snapshot) {
      ws.send(
        JSON.stringify(makeError(req, 'server_error', 'No active workspace'))
      );
      return;
    }

    const lock = acquireWorkspaceLock(root_snapshot, 'sync');
    if (!lock.ok) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'busy',
            `${lock.existing_kind} in progress for workspace`
          )
        )
      );
      return;
    }

    const workspace_snapshot = { ...conn_ws };

    try {
      const pull_res = await runBd(['dolt', 'pull'], {
        cwd: root_snapshot,
        sandbox: false
      });
      if (pull_res.code !== 0) {
        ws.send(
          JSON.stringify(
            makeError(
              req,
              'bd_error',
              stderrTail(pull_res.stderr) || 'bd failed'
            )
          )
        );
        return;
      }

      triggerMutationRefreshOnce();

      let push_res = await runBd(['dolt', 'push'], {
        cwd: root_snapshot,
        sandbox: false
      });

      if (push_res.code !== 0) {
        const retry_pull = await runBd(['dolt', 'pull'], {
          cwd: root_snapshot,
          sandbox: false
        });
        if (retry_pull.code !== 0) {
          triggerMutationRefreshOnce();
          ws.send(
            JSON.stringify(
              makeOk(req, {
                workspace: workspace_snapshot,
                pulled: true,
                pushed: false,
                push_error: stderrTail(retry_pull.stderr)
              })
            )
          );
          return;
        }
        triggerMutationRefreshOnce();
        push_res = await runBd(['dolt', 'push'], {
          cwd: root_snapshot,
          sandbox: false
        });
      }

      if (push_res.code !== 0) {
        ws.send(
          JSON.stringify(
            makeOk(req, {
              workspace: workspace_snapshot,
              pulled: true,
              pushed: false,
              push_error: stderrTail(push_res.stderr)
            })
          )
        );
        return;
      }

      ws.send(
        JSON.stringify(
          makeOk(req, {
            workspace: workspace_snapshot,
            pulled: true,
            pushed: true
          })
        )
      );
    } finally {
      releaseWorkspaceLock(root_snapshot);
    }
    return;
  }

  if (req.type === 'git-pull-workspace') {
    log('git-pull-workspace');

    const conn_ws = getConnWorkspace(ws);
    const root_snapshot = conn_ws?.root_dir;
    if (!root_snapshot) {
      ws.send(
        JSON.stringify(makeError(req, 'server_error', 'No active workspace'))
      );
      return;
    }

    const lock = acquireWorkspaceLock(root_snapshot, 'git-pull');
    if (!lock.ok) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'busy',
            `${lock.existing_kind} in progress for workspace`
          )
        )
      );
      return;
    }

    const workspace_snapshot = { ...conn_ws };

    try {
      const res = await runShell('git', ['pull', '--rebase', '--autostash'], {
        cwd: root_snapshot
      });

      const combined = `${res.stdout}\n${res.stderr}`;
      const conflict_markers = [
        'CONFLICT',
        'could not apply',
        'Resolve all conflicts manually',
        'rebase --abort',
        'Failed to merge in the changes'
      ];
      const is_rebase_conflict = conflict_markers.some((m) =>
        combined.includes(m)
      );

      if (res.code === 0 && !is_rebase_conflict) {
        const status = detectGitPullStatus(combined);
        ws.send(
          JSON.stringify(
            makeOk(req, {
              workspace: workspace_snapshot,
              status,
              stdout_tail: stderrTail(res.stdout),
              stderr_tail: stderrTail(res.stderr)
            })
          )
        );
        return;
      }

      if (is_rebase_conflict) {
        const abort_res = await runShell('git', ['rebase', '--abort'], {
          cwd: root_snapshot
        });
        if (abort_res.code === 0) {
          ws.send(
            JSON.stringify(
              makeError(
                req,
                'rebase_conflict',
                stderrTail(res.stderr) ||
                  stderrTail(res.stdout) ||
                  'rebase conflict'
              )
            )
          );
          return;
        }
        log(
          'git rebase --abort failed (code=%d, stderr=%s)',
          abort_res.code,
          abort_res.stderr
        );
        ws.send(
          JSON.stringify(
            makeError(
              req,
              'rebase_conflict_abort_failed',
              stderrTail(abort_res.stderr) ||
                stderrTail(res.stderr) ||
                'rebase abort failed'
            )
          )
        );
        return;
      }

      ws.send(
        JSON.stringify(
          makeError(
            req,
            'git_error',
            stderrTail(res.stderr) || stderrTail(res.stdout) || 'git failed'
          )
        )
      );
    } finally {
      releaseWorkspaceLock(root_snapshot);
    }
    return;
  }

  // Unknown type
  const err = makeError(
    req,
    'unknown_type',
    `Unknown message type: ${req.type}`
  );
  ws.send(JSON.stringify(err));
}
