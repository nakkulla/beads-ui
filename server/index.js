import { createServer } from 'node:http';
import { createApp } from './app.js';
import { printServerUrl } from './cli/daemon.js';
import { getConfig } from './config.js';
import { resolveWorkspaceDatabase } from './db.js';
import { debug, enableAllDebug } from './logging.js';
import { createPoller } from './poller.js';
import { registerWorkspace, watchRegistry } from './registry-watcher.js';
import { watchDb } from './watcher.js';
import { initWorkerRuntime } from './worker/attach.js';
import {
  discoverWorkspaces,
  resolveStartupWorkspace
} from './workspace-discovery.js';
import { attachWsServer } from './ws.js';
import { workerQueueSubscriberCount } from './ws/worker-handlers.js';

if (process.argv.includes('--debug') || process.argv.includes('-d')) {
  enableAllDebug();
}

for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '--host' && process.argv[i + 1]) {
    process.env.HOST = process.argv[++i];
  }
  if (process.argv[i] === '--port' && process.argv[i + 1]) {
    process.env.PORT = process.argv[++i];
  }
}

const config = getConfig();
// No auth (spec §8): the server binds to the trusted tailnet interface, and the
// WS Origin allowlist remains the browser-CSRF boundary. No token gate.
const app = createApp(config);
const server = createServer(app);
const log = debug('server');
const configured_workspaces = discoverWorkspaces({
  workspace_config: config.workspace_config
});

for (const workspace of configured_workspaces) {
  registerWorkspace(workspace);
}

const startup_workspace_root = resolveStartupWorkspace({
  configured_workspaces,
  default_workspace: config.workspace_config.default_workspace,
  cwd: config.root_dir
});

if (
  startup_workspace_root &&
  !configured_workspaces.some(
    (workspace) => workspace.path === startup_workspace_root
  )
) {
  const workspace_database = resolveWorkspaceDatabase({
    cwd: startup_workspace_root
  });
  if (
    workspace_database.source !== 'home-default' &&
    workspace_database.exists
  ) {
    registerWorkspace({
      path: startup_workspace_root,
      database: workspace_database.path
    });
  }
}

const watch_root = startup_workspace_root || config.root_dir;
const db_watcher = watchDb(watch_root, () => {
  log('db change detected → schedule refresh');
  scheduleListRefresh();
});

const { wss, scheduleListRefresh } = attachWsServer(server, {
  path: '/ws',
  heartbeat_ms: 30000,
  refresh_debounce_ms: 75,
  root_dir: config.root_dir,
  initial_workspace_root: startup_workspace_root,
  watcher: db_watcher
});

// Periodic list-refresh poller (spec §7): remote `bd` writes through central
// dolt never reach the local fs watcher, so on a fixed cadence — while at least
// one client is connected — re-run the same refresh the watcher would trigger.
// `poll_interval_seconds = 0` disables it.
createPoller({
  intervalSeconds: config.poll_interval_seconds,
  getClientCount: () => wss.clients.size,
  onTick: scheduleListRefresh
}).start();

watchRegistry(
  (entries) => {
    log('registry changed: %d entries', entries.length);
  },
  { debounce_ms: 500 }
);

server.listen(config.port, config.host, () => {
  printServerUrl();
  // Bring up the live worker dispatch loop: build a scheduler per active
  // workspace and reap any orphaned attempts (spec §5.1–§5.3).
  /** @type {Set<string>} */
  const worker_roots = new Set();
  for (const workspace of configured_workspaces) {
    if (workspace && workspace.path) {
      worker_roots.add(workspace.path);
    }
  }
  if (startup_workspace_root) {
    worker_roots.add(startup_workspace_root);
  }
  try {
    // The subscriber-count provider is what arms the PR pollers: they observe
    // `pr_wait` PRs only while a client is actually watching that workspace's
    // queue (worker-phase2 §4).
    initWorkerRuntime({
      workspaces: Array.from(worker_roots),
      getSubscriberCount: workerQueueSubscriberCount
    });
  } catch (err) {
    log('worker runtime init failed: %o', err);
  }
});

server.on('error', (err) => {
  log('server error %o', err);
  process.exitCode = 1;
});
