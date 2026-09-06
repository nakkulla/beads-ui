/**
 * @import { Server } from 'node:http'
 * @import { RawData, WebSocket } from 'ws'
 * @import { MessageType } from '../../app/protocol.js'
 */
import path from 'node:path';
import { WebSocketServer } from 'ws';
import { isRequest, makeError, makeOk } from '../../app/protocol.js';
import { resolveWorkspaceDatabase } from '../db.js';
import {
  detachAdr,
  handleSubscribeAdr,
  handleUnsubscribeAdr
} from './adr-handlers.js';
import { handleBenchRunCreate } from './bench-handlers.js';
import { handleGetCompare } from './compare-handlers.js';
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
  detachDisplayPolicy,
  handleDisplayPolicySet,
  handleSubscribeDisplayPolicy,
  handleUnsubscribeDisplayPolicy
} from './display-policy-handlers.js';
import {
  detachImplPresets,
  handleApplyImplPreset,
  handleApplyImplPresetGlobal,
  handleImplPresetCreate,
  handleImplPresetDelete,
  handleImplPresetUpdate,
  handleSubscribeImplPresets,
  handleUnsubscribeImplPresets
} from './exec-preset-handlers.js';
import {
  detachMonitorPipeline,
  ensureRunnableScanWired,
  handleMonitorAutoToggle,
  handleMonitorLaneConfirm,
  handleMonitorLaneCreate,
  handleMonitorLaneProvenance,
  handleMonitorLaneRemove,
  handleMonitorLaneUpdate,
  handleSubscribeMonitorPipeline,
  handleUnsubscribeMonitorPipeline
} from './monitor-handlers.js';
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
  handleUpdateImplTarget,
  handleUpdatePriority,
  handleUpdateStatus,
  handleUpdateWorkflowMeta
} from './mutation-handlers.js';
import { scheduleListRefresh, setRefreshDebounceMs } from './refresh.js';
import {
  handleGetSessionDefaults,
  handleGetWorkspaceAccounts,
  handleSetSessionDefaults,
  handleSetWorkspaceAccounts
} from './session-defaults-handlers.js';
import {
  handleSubscribeList,
  handleUnsubscribeList
} from './subscription-handlers.js';
import {
  detachUiOrder,
  handleSubscribeUiOrder,
  handleUiOrderSet,
  handleUnsubscribeUiOrder
} from './ui-order-handlers.js';
import {
  detachWorkerQueue,
  handleGetAttemptPrompt,
  handleGetBeadPrompt,
  handleGetBeadTimeline,
  handleGetSessionRefs,
  handleGetWorkerSystemPrompt,
  handleSubscribeSessionLog,
  handleSubscribeWorkerQueue,
  handleUnsubscribeSessionLog,
  handleUnsubscribeWorkerQueue,
  handleWorkerAttemptPause,
  handleWorkerAttemptResume,
  handleWorkerAttemptStop,
  handleWorkerAutomationToggle,
  handleWorkerCleanupRetry,
  handleWorkerDiscard,
  handleWorkerDiscardAbandon,
  handleWorkerMergeAutoToggle,
  handleWorkerMergeQueueAdd,
  handleWorkerMergeQueueAddAll,
  handleWorkerMergeQueueRemove,
  handleWorkerPrDiscard,
  handleWorkerProviderAutoSwitchToggle,
  handleWorkerQueueArm,
  handleWorkerQueueDisarm,
  handleWorkerQueueHoldResume,
  handleWorkerQueueHoldRetryNow,
  handleWorkerQueuePlace,
  handleWorkerQueueRemove,
  handleWorkerQueueReorder,
  handleWorkerQueueSetOrchestrationDefaults,
  handleWorkerQueueSetSerialLaneCount,
  handleWorkerQueueSetSlots,
  handleWorkerQueueStartNow,
  handleWorkerQueueToggle,
  handleWorkerRepoOperationDeployRun,
  handleWorkerRepoOperationDismiss,
  handleWorkerRepoOpsOptOutToggle,
  handleWorkerResolveInSession,
  handleWorkerReviseApprove,
  handleWorkerReviseFix,
  handleWorkerStaleWorkBackupFresh,
  handleWorkerStaleWorkContinue,
  handleWorkerStaleWorkRecheck
} from './worker-handlers.js';
import {
  handleGetWorkspace,
  handleGitPullWorkspace,
  handleListWorkspaces,
  handleSetWorkspace,
  handleSetWorkspaceVisibility
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
 * not by this check, so they are allowed here. With no token auth (spec §8),
 * this Origin check is the sole browser-CSRF defense for the WS surface.
 *
 * Acceptance is (in order): SAME-ORIGIN (the Origin's host:port equals the
 * request `Host` — the page was served by THIS very server, so it is by
 * definition not a cross-site hijack), then the `BDUI_ALLOWED_ORIGINS` allowlist
 * (comma-separated exact origins, e.g. `http://100.122.98.8:3000`), then a
 * loopback-only default when no allowlist is configured (fail-closed for remote
 * origins). Same-origin acceptance is what lets the tailscale-IP deployment work
 * without any allowlist entry: the browser loads `http://<ip>:<port>` and opens
 * its WS to the same `<ip>:<port>`.
 *
 * @param {string | undefined} origin - The request `Origin` header value.
 * @param {string | undefined} [host] - The request `Host` header (host:port).
 * @returns {boolean}
 */
export function isOriginAllowed(origin, host) {
  // Header absent → non-browser client; not the browser-hijack threat.
  if (origin === undefined) {
    return true;
  }
  // Present but empty or the sandboxed "null" origin → reject.
  if (typeof origin !== 'string' || origin.length === 0 || origin === 'null') {
    return false;
  }
  // Same-origin: the Origin's authority (host:port) equals the request Host.
  if (typeof host === 'string' && host.length > 0) {
    try {
      if (new URL(origin).host === host) {
        return true;
      }
    } catch {
      // Fall through — a malformed Origin is handled by the checks below.
    }
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
 * There is no token auth (spec §8): a connection may send application messages
 * immediately. The only handshake-time gate is the Origin allowlist enforced by
 * `verifyClient` below; network isolation (tailnet-only bind + ACL) covers
 * non-browser clients.
 *
 * @param {Server} http_server
 * @param {{ path?: string, heartbeat_ms?: number, refresh_debounce_ms?: number, root_dir?: string, initial_workspace_root?: string | null, watcher?: { rebind: (opts?: { root_dir?: string }) => void, path: string } }} [options]
 * @returns {{ wss: WebSocketServer, broadcast: (type: MessageType, payload?: unknown) => void, scheduleListRefresh: (cause?: string, root_dir?: string) => void, setWorkspace: (root_dir: string) => { changed: boolean, workspace: { root_dir: string, db_path: string } } }}
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
      // Pass the request Host so a same-origin browser socket (page served by
      // this very server, e.g. the tailscale-IP deployment) is accepted.
      const host =
        info.req && info.req.headers ? info.req.headers.host : undefined;
      if (isOriginAllowed(info.origin, host)) {
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
        detachConnectionFromAllRegistries(ws);
        detachWorkerQueue(ws);
        detachMonitorPipeline(ws);
        detachAdr(ws);
        detachUiOrder(ws);
        detachDisplayPolicy(ws);
        detachImplPresets(ws);
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
 * Handle an incoming message frame and respond to the same socket. There is no
 * auth gate (spec §8), so every framed request is dispatched directly.
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
    case 'update-impl-target':
      await handleUpdateImplTarget(ws, req);
      return;
    case 'get-session-defaults':
      await handleGetSessionDefaults(ws, req);
      return;
    case 'set-session-defaults':
      await handleSetSessionDefaults(ws, req);
      return;
    case 'get-workspace-accounts':
      await handleGetWorkspaceAccounts(ws, req);
      return;
    case 'set-workspace-accounts':
      await handleSetWorkspaceAccounts(ws, req);
      return;
    case 'update-workflow-meta':
      await handleUpdateWorkflowMeta(ws, req);
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
    case 'set-workspace-visibility':
      handleSetWorkspaceVisibility(ws, req);
      return;
    case 'git-pull-workspace':
      await handleGitPullWorkspace(ws, req);
      return;
    case 'subscribe-worker-queue':
      // 워커 탭도 session_active 레인을 그리므로 스캔 배선을 여기서도 arm한다
      // (UI-0a2m). 핸들러보다 먼저: 첫 스냅샷의 콜드 미스가 등록한 fill이
      // 완료됐을 때 재전송 배선이 이미 있어야 한다.
      ensureRunnableScanWired();
      handleSubscribeWorkerQueue(ws, req);
      return;
    case 'unsubscribe-worker-queue':
      handleUnsubscribeWorkerQueue(ws, req);
      return;
    case 'subscribe-monitor-pipeline':
      handleSubscribeMonitorPipeline(ws, req);
      return;
    case 'unsubscribe-monitor-pipeline':
      handleUnsubscribeMonitorPipeline(ws, req);
      return;
    case 'subscribe-adr':
      handleSubscribeAdr(ws, req);
      return;
    case 'unsubscribe-adr':
      handleUnsubscribeAdr(ws, req);
      return;
    case 'subscribe-impl-presets':
      handleSubscribeImplPresets(ws, req);
      return;
    case 'unsubscribe-impl-presets':
      handleUnsubscribeImplPresets(ws, req);
      return;
    case 'impl-preset-create':
      handleImplPresetCreate(ws, req);
      return;
    case 'impl-preset-update':
      handleImplPresetUpdate(ws, req);
      return;
    case 'impl-preset-delete':
      handleImplPresetDelete(ws, req);
      return;
    case 'apply-impl-preset':
      await handleApplyImplPreset(ws, req);
      return;
    case 'apply-impl-preset-global':
      await handleApplyImplPresetGlobal(ws, req);
      return;
    case 'monitor-auto-toggle':
      handleMonitorAutoToggle(ws, req);
      return;
    case 'monitor-lane-create':
      handleMonitorLaneCreate(ws, req);
      return;
    case 'monitor-lane-update':
      handleMonitorLaneUpdate(ws, req);
      return;
    case 'monitor-lane-confirm':
      handleMonitorLaneConfirm(ws, req);
      return;
    case 'monitor-lane-remove':
      handleMonitorLaneRemove(ws, req);
      return;
    case 'monitor-lane-provenance':
      handleMonitorLaneProvenance(ws, req);
      return;
    case 'worker-queue-place':
      await handleWorkerQueuePlace(ws, req);
      return;
    case 'worker-queue-reorder':
      handleWorkerQueueReorder(ws, req);
      return;
    case 'worker-queue-arm':
      handleWorkerQueueArm(ws, req);
      return;
    case 'worker-queue-disarm':
      handleWorkerQueueDisarm(ws, req);
      return;
    case 'worker-queue-start-now':
      handleWorkerQueueStartNow(ws, req);
      return;
    case 'worker-queue-toggle':
      handleWorkerQueueToggle(ws, req);
      return;
    case 'worker-automation-toggle':
      handleWorkerAutomationToggle(ws, req);
      return;
    case 'worker-provider-auto-switch-toggle':
      handleWorkerProviderAutoSwitchToggle(ws, req);
      return;
    case 'worker-repo-ops-opt-out-toggle':
      handleWorkerRepoOpsOptOutToggle(ws, req);
      return;
    case 'worker-repo-operation-dismiss':
      await handleWorkerRepoOperationDismiss(ws, req);
      return;
    // UI-5ym8: protocol.js union updated by worker-ui unit
    case /** @type {any} */ ('worker-queue-hold-resume'):
      await handleWorkerQueueHoldResume(ws, req);
      return;
    // UI-5ym8: protocol.js union updated by worker-ui unit
    case /** @type {any} */ ('worker-queue-hold-retry-now'):
      await handleWorkerQueueHoldRetryNow(ws, req);
      return;
    case 'worker-repo-operation-deploy-run':
      await handleWorkerRepoOperationDeployRun(ws, req);
      return;
    case 'worker-queue-set-slots':
      handleWorkerQueueSetSlots(ws, req);
      return;
    case 'worker-queue-set-serial-lane-count':
      handleWorkerQueueSetSerialLaneCount(ws, req);
      return;
    case 'worker-queue-set-orchestration-defaults':
      handleWorkerQueueSetOrchestrationDefaults(ws, req);
      return;
    case 'worker-queue-remove':
      handleWorkerQueueRemove(ws, req);
      return;
    case 'worker-attempt-pause':
      await handleWorkerAttemptPause(ws, req);
      return;
    case 'worker-attempt-stop':
      await handleWorkerAttemptStop(ws, req);
      return;
    case 'worker-attempt-resume':
      await handleWorkerAttemptResume(ws, req);
      return;
    case 'worker-cleanup-retry':
      await handleWorkerCleanupRetry(ws, req);
      return;
    case 'worker-resolve-in-session':
      await handleWorkerResolveInSession(ws, req);
      return;
    case 'worker-merge-queue-add':
      handleWorkerMergeQueueAdd(ws, req);
      return;
    case 'worker-merge-queue-add-all':
      handleWorkerMergeQueueAddAll(ws, req);
      return;
    case 'worker-merge-auto-toggle':
      handleWorkerMergeAutoToggle(ws, req);
      return;
    case 'worker-merge-queue-remove':
      handleWorkerMergeQueueRemove(ws, req);
      return;
    case 'worker-discard':
      await handleWorkerDiscard(ws, req);
      return;
    case 'worker-discard-abandon':
      await handleWorkerDiscardAbandon(ws, req);
      return;
    case 'worker-stale-work-continue':
      await handleWorkerStaleWorkContinue(ws, req);
      return;
    case 'worker-stale-work-backup-fresh':
      await handleWorkerStaleWorkBackupFresh(ws, req);
      return;
    case 'worker-stale-work-recheck':
      await handleWorkerStaleWorkRecheck(ws, req);
      return;
    case 'worker-pr-discard':
      await handleWorkerPrDiscard(ws, req);
      return;
    case 'worker-revise-fix':
      await handleWorkerReviseFix(ws, req);
      return;
    case 'worker-revise-approve':
      await handleWorkerReviseApprove(ws, req);
      return;
    case 'subscribe-ui-order':
      handleSubscribeUiOrder(ws, req);
      return;
    case 'unsubscribe-ui-order':
      handleUnsubscribeUiOrder(ws, req);
      return;
    case 'ui-order-set':
      handleUiOrderSet(ws, req);
      return;
    case 'subscribe-display-policy':
      handleSubscribeDisplayPolicy(ws, req);
      return;
    case 'unsubscribe-display-policy':
      handleUnsubscribeDisplayPolicy(ws, req);
      return;
    case 'display-policy-set':
      handleDisplayPolicySet(ws, req);
      return;
    case 'subscribe-session-log':
      await handleSubscribeSessionLog(ws, req);
      return;
    case 'get-session-refs':
      await handleGetSessionRefs(ws, req);
      return;
    case 'get-attempt-prompt':
      handleGetAttemptPrompt(ws, req);
      return;
    case 'get-bead-prompt':
      handleGetBeadPrompt(ws, req);
      return;
    case 'get-bead-timeline':
      handleGetBeadTimeline(ws, req);
      return;
    case 'get-worker-system-prompt':
      handleGetWorkerSystemPrompt(ws, req);
      return;
    case 'get-compare':
      handleGetCompare(ws, req);
      return;
    case 'bench-run-create':
      void handleBenchRunCreate(ws, req);
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
