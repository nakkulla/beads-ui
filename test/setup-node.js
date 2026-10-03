/**
 * Node-suite isolation from the OPERATOR's runtime config.
 *
 * `getConfig()` (server/config.js) falls back to `~/.config/bdui/config.toml`
 * when `BDUI_CONFIG_PATH` is unset, and `createWorkerAttachment` wires that
 * real accessor into the notifier. A machine with `[worker.notify] enabled =
 * true` therefore made `npm test` spawn the real `discord` CLI with fixture
 * payloads — four pushes per run, naming beads that do not exist. Pointing the
 * whole node suite at an absent path resolves the config to its disabled
 * defaults instead, so no test can reach the operator's machine.
 *
 * Re-applied before AND after every test, not once at load: suites that own
 * the variable `delete` it in their own `afterEach`, which would hand the next
 * test — or a lingering async send from the one that just ended — the real
 * config back.
 */
/* global process */
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach } from 'vitest';

/**
 * A path that does not exist, inside a directory that does not exist either.
 * `readRuntimeConfig` treats ENOENT as "no config" and returns the defaults.
 */
const ABSENT_CONFIG = path.join(
  os.tmpdir(),
  'bdui-test-no-config',
  'config.toml'
);

/**
 * The same isolation for the operator's state directory. The server-global
 * timing settings (`server/timing-settings.js`) are read by the scheduler,
 * retry, poller, and merge-queue code every suite exercises, so a value the
 * operator changed in `~/.local/state/bdui/timing-settings.json` would make a
 * test that assumes the defaults fail on that machine. A suite that arms its
 * own `XDG_STATE_HOME` keeps it; only an unset variable is pointed here.
 */
const ABSENT_STATE_HOME = path.join(os.tmpdir(), 'bdui-test-no-state');

function isolateConfigPath() {
  process.env.BDUI_CONFIG_PATH = ABSENT_CONFIG;
  if (!process.env.XDG_STATE_HOME) {
    process.env.XDG_STATE_HOME = ABSENT_STATE_HOME;
  }
}

isolateConfigPath();
beforeEach(isolateConfigPath);
afterEach(isolateConfigPath);
