import { createServer } from 'node:http';
import { createApp } from './app.js';
import { printServerUrl } from './cli/daemon.js';
import { getConfig } from './config.js';
import { resolveWorkspaceDatabase } from './db.js';
import { debug, enableAllDebug } from './logging.js';
import {
  registerWorkspace,
  replaceDiscoveredWorkspaces,
  watchRegistry
} from './registry-watcher.js';
import { watchDb } from './watcher.js';
import {
  discoverWorkspaces,
  watchWorkspaceDiscovery
} from './workspace-discovery.js';
import { attachWsServer } from './ws.js';

if (process.argv.includes('--debug') || process.argv.includes('-d')) {
  enableAllDebug();
}

// Parse --host and --port from argv and set env vars before getConfig()
for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '--host' && process.argv[i + 1]) {
    process.env.HOST = process.argv[++i];
  }
  if (process.argv[i] === '--port' && process.argv[i + 1]) {
    process.env.PORT = process.argv[++i];
  }
}

const config = getConfig();
const app = createApp(config);
const server = createServer(app);
const log = debug('server');

// Register the initial workspace (from cwd) so it appears in the workspace picker
// even without the beads daemon running
const workspace_database = resolveWorkspaceDatabase({ cwd: config.root_dir });
if (workspace_database.source !== 'home-default' && workspace_database.exists) {
  registerWorkspace({
    path: config.root_dir,
    database: workspace_database.path
  });
}

const discovered_workspaces = discoverWorkspaces();
replaceDiscoveredWorkspaces(discovered_workspaces);

// Watch the active beads DB and schedule subscription refresh for active lists
const db_watcher = watchDb(config.root_dir, () => {
  // Schedule subscription list refresh run for active subscriptions
  log('db change detected → schedule refresh');
  scheduleListRefresh();
  // v2: all updates flow via subscription push envelopes only
});

const { scheduleListRefresh, broadcast } = attachWsServer(server, {
  path: '/ws',
  heartbeat_ms: 30000,
  // Coalesce DB change bursts into one refresh run
  refresh_debounce_ms: 75,
  root_dir: config.root_dir,
  watcher: db_watcher
});

watchWorkspaceDiscovery({
  onChange(workspaces) {
    replaceDiscoveredWorkspaces(workspaces);
    broadcast('workspaces-updated', { count: workspaces.length });
  },
  onError(err) {
    log('workspace discovery watcher error %o', err);
  }
});

// Watch the global registry for workspace changes (e.g., when user starts
// bd daemon in a different project). This enables automatic workspace switching.
watchRegistry(
  (entries) => {
    log('registry changed: %d entries', entries.length);
    // Find if there's a newer workspace that matches our initial root
    // For now, we just log the change - users can switch via set-workspace
    // Future: could auto-switch if a workspace was started in a parent/child dir
  },
  { debounce_ms: 500 }
);

server.listen(config.port, config.host, () => {
  printServerUrl();
});

server.on('error', (err) => {
  log('server error %o', err);
  process.exitCode = 1;
});
