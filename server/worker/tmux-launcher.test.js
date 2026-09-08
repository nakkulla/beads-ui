import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { __resetRuntimeCatalogForTest } from './runner/index.js';
import { defaultResolveRunner } from './tmux-launcher.js';

/** @type {string[]} */
const temp_dirs = [];
/** @type {string|undefined} */
let previous_config;

/**
 * Point the runtime catalog at a config that names an absolute `command` for
 * codex, the way an operator with a non-PATH install does.
 *
 * @param {string} command
 * @returns {void}
 */
function withCodexCommand(command) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-tmux-launcher-'));
  temp_dirs.push(dir);
  const config_path = path.join(dir, 'config.toml');
  fs.writeFileSync(
    config_path,
    `[runner.codex]\ncommand = ${JSON.stringify(command)}\n`
  );
  previous_config = process.env.BDUI_CONFIG_PATH;
  process.env.BDUI_CONFIG_PATH = config_path;
  __resetRuntimeCatalogForTest();
}

afterEach(() => {
  if (previous_config === undefined) {
    delete process.env.BDUI_CONFIG_PATH;
  } else {
    process.env.BDUI_CONFIG_PATH = previous_config;
  }
  previous_config = undefined;
  __resetRuntimeCatalogForTest();
  for (const dir of temp_dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('tmux-launcher runner resolution (UI-mn5u §4.2)', () => {
  test('accepts an absolute catalog command that exists', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-codex-bin-'));
    temp_dirs.push(dir);
    const command = path.join(dir, 'codex');
    fs.writeFileSync(command, '#!/bin/sh\n', { mode: 0o755 });
    withCodexCommand(command);

    expect(defaultResolveRunner('codex')).toBe(command);
  });

  test('reports nothing for an absolute command that does not exist', () => {
    withCodexCommand('/nonexistent/bin/codex');

    expect(defaultResolveRunner('codex')).toBeNull();
  });

  test('refuses a runner outside the active vocabulary', () => {
    expect(defaultResolveRunner('grok')).toBeNull();
  });
});
