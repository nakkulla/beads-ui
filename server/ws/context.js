/**
 * @import { WebSocket, WebSocketServer } from 'ws'
 * @import { MessageType } from '../../app/protocol.js'
 */
import { requireBdJsonCapabilityForWorkspace } from '../bd-effect-gate.js';
import {
  getGitUserName,
  kvGetJson,
  kvSetJson,
  runBd,
  runBdJsonProjected
} from '../bd.js';
import { debug } from '../logging.js';
import { SubscriptionRegistry } from '../subscriptions.js';
import { EXPIRED_SESSION_LOG_NOTICE } from '../worker/session-log.js';

// Re-exported so the existing `ws/context.js` import path keeps working for the
// diff/emit callers and their tests; the filter itself lives in a leaf module.
export { applyClosedIssuesFilter } from '../closed-issues-filter.js';

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
 * Run bd in the connection's selected workspace, or an explicit `options.cwd`
 * after applying the same workspace effect gate (UI-2gi1 §6.6).
 *
 * @param {WebSocket} ws
 * @param {string[]} args
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number, sandbox?: boolean }} [options]
 * @returns {Promise<{ code: number, stdout: string, stderr: string }>}
 */
export async function runBdInWorkspace(ws, args, options = undefined) {
  const root_dir = options?.cwd || getConnWorkspace(ws)?.root_dir;

  // Every WS bd write goes through this one door, so the workspace effect gate
  // belongs here: a workspace whose bd JSON this build cannot read must not be
  // written to, and no handler can reach bd without passing this check.
  const allowed = await requireBdJsonCapabilityForWorkspace('write', root_dir);
  if (allowed.ok !== true) {
    return {
      code: 1,
      stdout: '',
      stderr: `bd write refused: ${allowed.error.code}`
    };
  }

  if (!root_dir) {
    return options === undefined ? runBd(args) : runBd(args, options);
  }

  return runBd(args, {
    ...(options || {}),
    cwd: root_dir
  });
}

/**
 * Run one bd JSON command in the connection's workspace (or explicit
 * `options.cwd`) and project it.
 *
 * Binding the connection's workspace to the command family is what makes a
 * protocol failure land on the right effect gate: a broken workspace must not
 * block writes in a healthy one.
 *
 * @param {WebSocket} ws
 * @param {string} command_family
 * @param {string[]} args
 * @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number, expected_id?: string, expected_issue_id?: string }} [options]
 * @returns {ReturnType<typeof runBdJsonProjected>}
 */
export function runBdJsonProjectedInWorkspace(
  ws,
  command_family,
  args,
  options = undefined
) {
  const root_dir = options?.cwd || getConnWorkspace(ws)?.root_dir;
  return runBdJsonProjected(command_family, args, {
    ...(options || {}),
    ...(root_dir ? { cwd: root_dir } : {})
  });
}

/**
 * The detail every post-write readback failure carries.
 *
 * The write already landed, so a client that retries would apply it twice —
 * `retry_safe: false` is the whole point of naming this separately from an
 * ordinary write failure.
 *
 * @param {string} reason - Stable failure code.
 */
export function readbackFailureDetail(reason) {
  return {
    phase: 'readback',
    write_applied: true,
    retry_safe: false,
    reason
  };
}

/**
 * Read a `bd kv` JSON entry in an EXPLICIT workspace root (UI-eey2 §9.5).
 *
 * The root-addressed pair is the primitive and the connection-addressed pair
 * below is a thin wrapper on it, because a repo panel in the monitor operates on
 * a workspace the connection is not bound to — reading the connected repo's kv
 * there would silently show (and, on write, clobber) the wrong repo's defaults.
 *
 * An empty root means "wherever bd defaults to", which is exactly what a
 * connection with no selected workspace has always meant.
 *
 * @param {string|null|undefined} root_dir
 * @param {string} key
 * @returns {ReturnType<typeof kvGetJson>}
 */
export function kvGetJsonAtRoot(root_dir, key) {
  return root_dir ? kvGetJson(key, { cwd: root_dir }) : kvGetJson(key);
}

/**
 * Write a `bd kv` JSON entry in an EXPLICIT workspace root, behind the same
 * workspace effect gate the connection-addressed writer uses.
 *
 * @param {string|null|undefined} root_dir
 * @param {string} key
 * @param {Record<string, unknown>} value
 * @returns {ReturnType<typeof kvSetJson>}
 */
export async function kvSetJsonAtRoot(root_dir, key, value) {
  const allowed = await requireBdJsonCapabilityForWorkspace(
    'kv',
    root_dir || undefined
  );
  if (allowed.ok !== true) {
    return { ok: false, error: `bd write refused: ${allowed.error.code}` };
  }
  return root_dir
    ? kvSetJson(key, value, { cwd: root_dir })
    : kvSetJson(key, value);
}

/**
 * Read a `bd kv` JSON entry in the connection's selected workspace.
 *
 * @param {WebSocket} ws
 * @param {string} key
 * @returns {ReturnType<typeof kvGetJson>}
 */
export function kvGetJsonInWorkspace(ws, key) {
  return kvGetJsonAtRoot(getConnWorkspace(ws)?.root_dir, key);
}

/**
 * Write a `bd kv` JSON entry in the connection's selected workspace.
 *
 * @param {WebSocket} ws
 * @param {string} key
 * @param {Record<string, unknown>} value
 * @returns {ReturnType<typeof kvSetJson>}
 */
export function kvSetJsonInWorkspace(ws, key, value) {
  return kvSetJsonAtRoot(getConnWorkspace(ws)?.root_dir, key, value);
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
 * `root_dir` names the workspace this snapshot describes so a client can drop a
 * snapshot addressed to a workspace it is no longer looking at. It rides the
 * payload top level, NOT inside `queue`, because `queue` is the persisted store
 * shape and this is envelope addressing.
 *
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {string} root_dir
 * @param {Record<string, unknown>} queue
 */
export function emitWorkerQueueSnapshot(ws, client_id, root_dir, queue) {
  const msg = JSON.stringify({
    id: `evt-${Date.now()}`,
    ok: true,
    type: /** @type {MessageType} */ ('worker-queue-snapshot'),
    payload: {
      type: 'worker-queue-snapshot',
      id: client_id,
      root_dir,
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
 * Emit the aggregated monitor-pipeline snapshot (UI-nprg) to a client.
 *
 * Rides the same id/ok/type/payload push envelope as the queue snapshot, but
 * carries NO `root_dir`: the payload spans every visible workspace and each
 * entry names its own repo, so there is nothing connection-scoped to address it
 * against.
 *
 * `workspaces_state` rides the SAME envelope rather than a second event
 * (UI-qrfo §4): it is the control-state half of one snapshot — every visible
 * repo's automation flags, slots, CAS `revision` and exec defaults, including
 * the repos whose pipeline is empty and therefore absent from `workspaces`.
 * Splitting them would let a group header render against a revision from a
 * different push.
 *
 * `cross_lanes` rides the SAME envelope for the same reason (UI-j92s §4.4): the
 * stored 연결 레인 are drawn against the pipeline of this very push, and a
 * separate event would let a lane render against members from another one.
 * `null` means the store could not be read — distinct from an empty lane list,
 * which is a store that read fine and holds nothing.
 *
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {Array<Record<string, unknown>>} workspaces
 * @param {Array<Record<string, unknown>>} [workspaces_state]
 * @param {import('../worker/cross-lanes-store.js').CrossLanesState|null} [cross_lanes]
 */
export function emitMonitorPipelineSnapshot(
  ws,
  client_id,
  workspaces,
  workspaces_state = [],
  cross_lanes = null
) {
  const msg = JSON.stringify({
    id: `evt-${Date.now()}`,
    ok: true,
    type: /** @type {MessageType} */ ('monitor-pipeline-snapshot'),
    payload: {
      type: 'monitor-pipeline-snapshot',
      id: client_id,
      workspaces,
      workspaces_state,
      cross_lanes
    }
  });
  try {
    ws.send(msg);
  } catch (err) {
    log('emit monitor-pipeline snapshot send failed id=%s: %o', client_id, err);
  }
}

/**
 * Push a snapshot frame to one subscriber unless it already holds this exact
 * body (UI-d509). The queue and monitor channels re-push whole snapshots on
 * every refresh tick, and consecutive bodies are almost always byte-identical —
 * only the envelope `id` (`evt-<ts>`) differed, so the client kept parsing
 * megabytes that changed nothing.
 *
 * `body_json` is the serialized push body WITHOUT the `type`/`id` addressing
 * fields (e.g. `{"root_dir":…,"queue":…}`): the caller serializes it once per
 * push and every subscriber shares the string, and the frame is assembled by
 * splicing the addressing head in front of it. The memory lives on the
 * subscriber entry, so a fresh subscribe (new entry) always receives its first
 * frame, and a failed send leaves it unset so the next push retries.
 *
 * @param {{ ws: WebSocket, client_id: string, last_body?: string }} sub
 * @param {MessageType} type
 * @param {string} body_json - Non-empty JSON object text.
 * @returns {boolean} Whether a frame was sent.
 */
export function pushSnapshotIfChanged(sub, type, body_json) {
  if (sub.last_body === body_json) {
    return false;
  }
  const head = JSON.stringify({ type, id: sub.client_id });
  const payload = `${head.slice(0, -1)},${body_json.slice(1)}`;
  const msg = `{"id":"evt-${Date.now()}","ok":true,"type":${JSON.stringify(type)},"payload":${payload}}`;
  try {
    sub.ws.send(msg);
  } catch (err) {
    log('push %s send failed id=%s: %o', type, sub.client_id, err);
    return false;
  }
  sub.last_body = body_json;
  return true;
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
 * Emit a label/metadata display-policy snapshot to a specific client id on a
 * socket.
 *
 * Reuses the same id/ok/type/payload push envelope as the queue/ui-order
 * snapshots. The whole policy is pushed as one document (there is no partial
 * update) and carries its own CAS `revision` inside the payload.
 *
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {import('../display-policy-store.js').DisplayPolicy} policy
 */
export function emitDisplayPolicySnapshot(ws, client_id, policy) {
  const msg = JSON.stringify({
    id: `evt-${Date.now()}`,
    ok: true,
    type: /** @type {MessageType} */ ('display-policy-snapshot'),
    payload: {
      type: 'display-policy-snapshot',
      id: client_id,
      policy
    }
  });
  try {
    ws.send(msg);
  } catch (err) {
    log('emit display-policy snapshot send failed id=%s: %o', client_id, err);
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
 * @param {number|null} [last_event_at] - Log file mtime in epoch ms (UI-rkly
 * §2): the raw events carry no timestamp, so this is the drawer's only source
 * for "how long ago did this session last move". Null when unknown.
 * @param {string} [launch_id] - Delegated session identity. Omitted for the
 * main attempt log so legacy payload bytes remain unchanged.
 * @param {{ expired?: boolean }} [options] - `expired` marks a transcript the
 * §4 read-resolution order found in NONE of its three locations, which for a
 * settled attempt means the 180-day retention policy deleted it. It travels as
 * its own flag rather than as an empty `lines` array because "deleted by
 * policy" and "wrote nothing" are different answers to the drawer's question.
 */
export function emitSessionLogSnapshot(
  ws,
  client_id,
  attempt_id,
  lines,
  last_event_at = null,
  launch_id,
  options = {}
) {
  const msg = JSON.stringify({
    id: `evt-${Date.now()}`,
    ok: true,
    type: /** @type {MessageType} */ ('session-log-snapshot'),
    payload: {
      type: 'session-log-snapshot',
      id: client_id,
      attempt_id,
      ...(typeof launch_id === 'string' && launch_id.length > 0
        ? { launch_id }
        : {}),
      lines,
      last_event_at,
      ...(options.expired === true
        ? { expired: true, notice: EXPIRED_SESSION_LOG_NOTICE }
        : {})
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
 * @param {string} [launch_id] - Delegated session identity; omitted for main.
 */
export function emitSessionLogAppend(
  ws,
  client_id,
  attempt_id,
  event,
  launch_id
) {
  const msg = JSON.stringify({
    id: `evt-${Date.now()}`,
    ok: true,
    type: /** @type {MessageType} */ ('session-log-append'),
    payload: {
      type: 'session-log-append',
      id: client_id,
      attempt_id,
      ...(typeof launch_id === 'string' && launch_id.length > 0
        ? { launch_id }
        : {}),
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
