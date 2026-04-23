import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { createApp } from './app.js';
import { getConfig } from './config.js';

/**
 * Narrow to function type for basic checks.
 *
 * @param {unknown} value
 * @returns {value is Function}
 */
function isFunction(value) {
  return typeof value === 'function';
}

/**
 * @returns {string}
 */
function missingConfigPath() {
  return path.join(
    os.tmpdir(),
    `bdui-missing-${process.pid}-${Date.now()}-${Math.random()}.json`
  );
}

afterEach(() => {
  delete process.env.BDUI_CONFIG_PATH;
});

describe('server app wiring (no listen)', () => {
  test('createApp returns an express-like app', () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();
    const config = getConfig();
    const app = createApp(config);
    expect(isFunction(app.get)).toBe(true);
    expect(isFunction(app.use)).toBe(true);
  });

  test('createApp accepts label_display_policy config', () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();
    const config = getConfig();
    const app = createApp(config);

    expect(isFunction(app.get)).toBe(true);
    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:'
    ]);
  });

  test('index.html exists in configured app_dir', () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();
    const config = getConfig();
    const index_path = path.join(config.app_dir, 'index.html');
    expect(fs.existsSync(index_path)).toBe(true);
  });
});
