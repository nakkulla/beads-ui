import { createServer } from 'node:http';
import path from 'node:path';
import { activeLoginReturnStore } from './active-login-return-store.js';
import { createApp } from './app.js';
import { createClaudeActiveReturn } from './claude-active-return.js';
import { printServerUrl } from './cli/daemon.js';
import { createCodexActiveReturn } from './codex-active-return.js';
import {
  codexCreditStore,
  createCodexCreditPoller
} from './codex-credit-store.js';
import { getConfig } from './config.js';
import { resolveWorkspaceDatabase } from './db.js';
import { installHermesCodexFollow } from './hermes-codex-follow.js';
import {
  activeSwitchSettingsOf,
  limitPolicySettingsStore,
  onLimitPolicySettingsChanged
} from './limit-policy-settings.js';
import { debug, enableAllDebug } from './logging.js';
import { installPlacementService } from './placement/service.js';
import { createPoller } from './poller.js';
import {
  getAvailableWorkspaces,
  registerWorkspace,
  watchRegistry
} from './registry-watcher.js';
import { cleanupStaleLogins } from './routes/account-login.js';
import {
  acquireSwitchLock,
  createAccountSwitchRunner,
  isSwitchInFlight,
  performAccountSwitch,
  releaseSwitchLock
} from './routes/account-switch.js';
import {
  invalidateCache as invalidateClaudeUsageCache,
  listAccounts as listClaudeAccounts,
  listAccountsFresh as listClaudeAccountsFresh
} from './routes/claude-usage.js';
import {
  invalidateCache as invalidateCodexUsageCache,
  listAccounts as listCodexAccounts,
  listAccountsFresh as listCodexAccountsFresh,
  subscribeAccountListObservations,
  subscribeCreditObservations
} from './routes/codex-usage.js';
import { publishRuntimeIdentity } from './runtime-startup.js';
import { onTimingSettingsChanged, timingSeconds } from './timing-settings.js';
import { watchDb } from './watcher.js';
import { initWorkerRuntime } from './worker/attach.js';
import { codexModelList } from './worker/codex-model-list.js';
import { selectCodexSwitchCandidate } from './worker/codex-switch-candidate.js';
import { activeAccountOf } from './worker/instructions-restart.js';
import { createNotifier } from './worker/notify.js';
import { resolveCatalog } from './worker/runner-catalog.js';
import { getWorkerRuntime } from './worker/runtime.js';
import { CODEX_EXHAUSTED_WINDOW_PCT } from './worker/scheduler.js';
import {
  discoverWorkspaces,
  resolveStartupWorkspace
} from './workspace-discovery.js';
import { attachWsServer } from './ws.js';
import { notifyAutoPoolCatalogChanged } from './ws/auto-pool-handlers.js';
import { broadcastImplPresets } from './ws/exec-preset-handlers.js';
import {
  bindDepartureBroadcast,
  resumeLimitPolicyRebind
} from './ws/limit-policy-settings-handlers.js';
import { observeCodexModelList } from './ws/model-visibility-handlers.js';
import {
  notifyMonitorCatalogChanged,
  notifyMonitorRegistryChanged,
  pollDemandFor
} from './ws/monitor-handlers.js';
import {
  fanout as fanoutWorkerQueue,
  workerQueueSubscribedWorkspaces
} from './ws/worker-handlers.js';

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
/** @type {any|null} */
let runtime_identity = null;
// No auth (spec §8): the server binds to the trusted tailnet interface, and the
// WS Origin allowlist remains the browser-CSRF boundary. No token gate.
/** @type {import('express').Express} */
let app;
try {
  app = createApp({
    ...config,
    runtime_identity: () => runtime_identity
  });
} catch (err) {
  // A missing bundle is an operator mistake, not a defect: print the one line
  // that says what to run instead of a stack trace.
  console.error(String(err instanceof Error ? err.message : err));
  process.exit(1);
}
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

// Codex model names come from the Codex CLI list (UI-gpac §3.1). The last good
// list is adopted synchronously here, before anything resolves the runtime
// catalog, so a restart does not flap seed -> list; the CLI is then read
// asynchronously now and hourly.
const codex_model_list = codexModelList();
codex_model_list.loadPersisted();
// The names the catalog had before the CLI list (seed + config.toml), which an
// older model-visibility file without `seen_models` has already seen (§3.6).
const legacy_model_names = Object.keys(
  resolveCatalog({ overrides: config.runner_overrides, warn: () => {} })
    .model_index
);
observeCodexModelList({
  pinned_names: codex_model_list.listedPinnedNames(),
  legacy_names: legacy_model_names
});
codex_model_list.onChange(() => {
  observeCodexModelList({
    pinned_names: codex_model_list.listedPinnedNames(),
    legacy_names: legacy_model_names
  });
  notifyMonitorCatalogChanged();
  notifyAutoPoolCatalogChanged();
  for (const workspace of workerQueueSubscribedWorkspaces()) {
    try {
      fanoutWorkerQueue(
        workspace,
        getWorkerRuntime().queueStore.snapshot(workspace)
      );
    } catch (err) {
      log(
        'codex model list: worker queue push failed for %s: %o',
        workspace,
        err
      );
    }
  }
});
codex_model_list.start();

// Worker queue placement judgment (UI-izba §4.2): the jev pair cache is read
// from the state directory here, so a restart asks no pair again. Installed
// only by the server process — a test that decorates a queue never reaches
// jev or the key.
installPlacementService();

const watch_root = startup_workspace_root || config.root_dir;
const db_watcher = watchDb(watch_root, () => {
  log('db change detected → schedule refresh');
  scheduleListRefresh('watcher', watch_root);
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
// The cadence is the server-global timing setting, whose default is config.toml
// `poll_interval_seconds`; an off value (0) disables it and a settings change
// re-arms the running poller at once (UI-ny0h §3.3).
const list_poller = createPoller({
  intervalSeconds: timingSeconds('list_poll_interval_seconds'),
  getClientCount: () => wss.clients.size,
  onTick: () => scheduleListRefresh('poll')
});
list_poller.start();
onTimingSettingsChanged((snapshot) => {
  list_poller.setIntervalSeconds(
    /** @type {number} */ (snapshot.values.list_poll_interval_seconds)
  );
});

// Codex credit ledger (UI-9y1k §4.3): every parsed codex-auth list feeds the
// ledger, and while any account allows credits the server re-reads usage with
// `--api` every ten minutes so a session spending credits unwatched still
// moves the ledger and its notices. A settings change re-arms or stops it.
subscribeCreditObservations((observations, accounts) => {
  codexCreditStore().observe(observations, accounts);
});
const codex_credit_poller = createCodexCreditPoller({
  store: codexCreditStore(),
  readFresh: () => listCodexAccountsFresh(),
  log
});
codexCreditStore().onChange(() => codex_credit_poller.sync());
codex_credit_poller.sync();

// Limit-policy settings (UI-32oq §4.1): a file still in the UI-giog shape is
// rewritten once in the new shape, recording in `rebind_pending` the runners
// whose hold verdicts the retired global override had bound. The re-binding
// itself waits for the worker runtime (see the listen callback). A failed
// write leaves the converted value serving from memory and retries next start.
const limit_policy_migration = limitPolicySettingsStore().migrate();
if (limit_policy_migration.migrated) {
  log(
    'limit-policy settings migrated; rebind pending for %o',
    limit_policy_migration.rebind_pending
  );
}

// The departure records both active-login passes share (UI-32oq §4.2): one
// file, so a return still due after a redeploy happens.
const active_login_departures = activeLoginReturnStore();
// A record created, followed or cleared reaches the settings channel's
// subscribers, whose status lines name the return (UI-32oq §4.4).
bindDepartureBroadcast(active_login_departures);

// Codex active-account return (UI-tyc2 §4, UI-32oq §4.2): every parsed
// codex-auth list is judged. While Codex's auto switch is on, an active
// account at the trigger moves to a window-headroom account the target list
// holds, and a login moved off the default goes back once the default reset,
// through the manual switch's own lock and switch path.
const codex_switch_notifier = createNotifier({ getConfig });
const run_codex_switch = createAccountSwitchRunner({ provider: 'codex' });
const codex_active_return = createCodexActiveReturn({
  listAccounts: () => listCodexAccounts(),
  listAccountsFresh: () => listCodexAccountsFresh(),
  settingsOf: (provider) => activeSwitchSettingsOf(provider),
  departures: active_login_departures,
  listWorkspaces: () =>
    getAvailableWorkspaces().map((workspace) => ({
      key: path.resolve(workspace.path),
      name: path.basename(path.resolve(workspace.path))
    })),
  queueSnapshot: (workspace) =>
    getWorkerRuntime().queueStore.snapshot(workspace),
  activeAccountOf,
  acquireLock: acquireSwitchLock,
  releaseLock: releaseSwitchLock,
  isLocked: isSwitchInFlight,
  switchAccount: (account_number) =>
    performAccountSwitch({
      provider: 'codex',
      account_number,
      runSwitch: run_codex_switch,
      invalidateUsageCache: invalidateCodexUsageCache
    }),
  selectCandidate: selectCodexSwitchCandidate,
  notify: (message) => {
    codex_switch_notifier.codexCreditNotice({ channel: 'ops', message });
  },
  exhausted_pct: CODEX_EXHAUSTED_WINDOW_PCT,
  log
});
subscribeAccountListObservations((list) => {
  void codex_active_return.observe(list);
});
// Hermes's own openai-codex pool puts the same account first after every
// Codex switch, manual or automatic (UI-ow0x).
installHermesCodexFollow();
// The Codex timer otherwise arms only on an observed trigger; a departure
// record that survived the restart arms it here so the return still happens.
codex_active_return.start();

// Claude active-account return (UI-btp3 §4, UI-32oq §4.2): the same flow,
// lock and departure records as the Codex pass, but always on — nothing else
// reads the Claude list while the usage view and the Worker are idle.
const run_claude_switch = createAccountSwitchRunner({ provider: 'claude' });
const claude_active_return = createClaudeActiveReturn({
  listAccounts: () => listClaudeAccounts(),
  listAccountsFresh: () => listClaudeAccountsFresh(),
  settingsOf: (provider) => activeSwitchSettingsOf(provider),
  departures: active_login_departures,
  listWorkspaces: () =>
    getAvailableWorkspaces().map((workspace) => ({
      key: path.resolve(workspace.path),
      name: path.basename(path.resolve(workspace.path))
    })),
  queueSnapshot: (workspace) =>
    getWorkerRuntime().queueStore.snapshot(workspace),
  acquireLock: acquireSwitchLock,
  releaseLock: releaseSwitchLock,
  isLocked: isSwitchInFlight,
  switchAccount: (account_number) =>
    performAccountSwitch({
      provider: 'claude',
      account_number,
      runSwitch: run_claude_switch,
      invalidateUsageCache: invalidateClaudeUsageCache
    }),
  notify: (message) => {
    codex_switch_notifier.codexCreditNotice({ channel: 'ops', message });
  },
  log
});
claude_active_return.start();

// A settings write hands both passes one judgment at once: the Codex timer is
// idle until a trigger, and a changed default or a switch turned off ends a
// departure record at the top of the next pass (UI-32oq §4.2 rule 5).
onLimitPolicySettingsChanged(() => {
  void codex_active_return.evaluateNow();
  void claude_active_return.evaluateNow();
});

watchRegistry(
  (entries) => {
    log('registry changed: %d entries', entries.length);
    // The monitor aggregates whatever the registry currently lists (UI-nprg),
    // so a repo appearing or leaving changes its snapshot.
    notifyMonitorRegistryChanged();
  },
  { debounce_ms: 500 }
);

server.listen(config.port, config.host, async () => {
  // Sweep what account logins of a server process that is no longer alive
  // left behind (UI-xm29 §4.1): its `bdui-login-<pid>` tmux session, recorded
  // `codex login` process groups and temp CODEX_HOMEs; a live server's stay.
  // Here, once, and never at import or inside createApp, so tests and app
  // builds never touch a real tmux or process.
  void cleanupStaleLogins()
    .then((summary) => {
      log('account login startup sweep: %o', summary);
    })
    .catch((err) => {
      log('account login startup sweep failed: %o', err);
    });
  const runtime = publishRuntimeIdentity({ server });
  if (!runtime.ok) {
    process.exitCode = 1;
    log(
      'runtime identity publication failed; worker startup stays closed: %s',
      runtime.reason
    );
    return;
  }
  runtime_identity = runtime.identity;
  printServerUrl();
  // Bring up the live worker dispatch loop: build a scheduler per active
  // workspace, reconcile the `running` attempts a prior run left behind, and
  // arm each workspace's periodic reconcile
  // (spec §5.1–§5.3, worker-detached-session-reconcile §2).
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
    const migration =
      await getWorkerRuntime().execPresetCoordinator.migrateWorkspaces(
        Array.from(worker_roots)
      );
    // A deferred workspace keeps its legacy fields and no marker, so the next
    // start retries it. Dispatch does NOT depend on that migration — the
    // launcher reads the queue's own orchestration values, and the session
    // defaults it did not migrate simply fall through to the harness — so an
    // unmigrated workspace is never a reason to leave every workspace's worker
    // unattached.
    if (Array.isArray(migration.deferred) && migration.deferred.length > 0) {
      log(
        'exec preset migration deferred for %d workspace(s): %o',
        migration.deferred.length,
        migration.deferred
      );
    }
    if (!migration.ok) {
      log(
        'exec preset migration failed before any workspace pass: %o',
        migration.outcomes
      );
    }
    // The migration ran after `listen`, so a client may already hold the
    // pre-reseed preset list; push the current one rather than leaving it
    // stale until that client's next own mutation.
    broadcastImplPresets();
    // The subscriber-count provider is what arms the PR pollers: they observe
    // `pr_wait` PRs only while a client is actually watching that workspace's
    // queue (worker-phase2 §4) — or, since UI-nprg, while a monitor subscriber
    // is watching every visible workspace at once.
    // The self-deploy auto-advance restore controller judges against the same
    // identity `/healthz` serves, so it reads the published one rather than
    // deriving a second source_sha of its own.
    initWorkerRuntime({
      workspaces: Array.from(worker_roots),
      getSubscriberCount: pollDemandFor,
      runtime_identity
    });
    // Finish the re-binding the limit-policy migration left pending (UI-32oq
    // §4.1) now that every workspace's switch pass is attached. A runner a
    // workspace failed for stays pending and is retried next start.
    void resumeLimitPolicyRebind()
      .then((outcome) => {
        if (outcome.done.length > 0 || outcome.pending.length > 0) {
          log('limit-policy verdict rebind: %o', outcome);
        }
      })
      .catch((err) => {
        log('limit-policy verdict rebind failed: %o', err);
      });
    // The direction-inquiry environment premise, checked ONCE at startup
    // (UI-7uid §3.7): whether this process can reach the user's tmux socket at
    // all. Here rather than inside the runtime factory so that unit tests,
    // which build the runtime freely, never spawn tmux. No-op when the feature
    // is not enabled in config.
    void getWorkerRuntime().directionInquiry.probeTmux();
  } catch (err) {
    log('worker runtime init failed: %o', err);
  }
});

server.on('error', (err) => {
  log('server error %o', err);
  process.exitCode = 1;
});
