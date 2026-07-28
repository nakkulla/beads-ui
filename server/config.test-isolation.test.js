/**
 * Guards the node suite's config isolation (test/setup-node.js).
 *
 * Without it `getConfig()` reads the operator's `~/.config/bdui/config.toml`,
 * and a real `[worker.notify] enabled = true` turns fixture transitions into
 * real Discord pushes. The failure is invisible from inside the suite — every
 * test still passes — so it needs an assertion of its own.
 */
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { getConfig } from './config.js';

describe('node suite config isolation', () => {
  test('resolves the config outside the operator home', () => {
    const home_config = path.join(os.homedir(), '.config', 'bdui');

    const { config_path } = getConfig();

    expect(config_path.startsWith(home_config)).toBe(false);
  });

  test('leaves worker notifications disabled', () => {
    const { worker_notify } = getConfig();

    expect(worker_notify.enabled).toBe(false);
  });
});
