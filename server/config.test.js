import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { getConfig } from './config.js';

/** @type {string[]} */
const temp_dirs = [];

/**
 * @param {unknown} payload
 * @returns {string}
 */
function writeConfigFixture(payload) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-config-'));
  const file_path = path.join(dir, 'config.json');
  temp_dirs.push(dir);
  fs.writeFileSync(file_path, JSON.stringify(payload));
  return file_path;
}

/**
 * @returns {string}
 */
function missingConfigPath() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-config-missing-'));
  temp_dirs.push(dir);
  return path.join(dir, 'config.json');
}

afterEach(() => {
  delete process.env.BDUI_FRONTEND_MODE;
  delete process.env.BDUI_CONFIG_PATH;
  for (const dir of temp_dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('getConfig', () => {
  test('returns live frontend_mode when env is live', () => {
    process.env.BDUI_FRONTEND_MODE = 'live';

    const config = getConfig();

    expect(config.frontend_mode).toBe('live');
  });

  test('returns static frontend_mode when env is not live', () => {
    process.env.BDUI_FRONTEND_MODE = 'unexpected';

    const config = getConfig();

    expect(config.frontend_mode).toBe('static');
  });

  test('returns default label policy when config file is missing', () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:'
    ]);
  });

  test('reads label policy from global config file', () => {
    process.env.BDUI_CONFIG_PATH = writeConfigFixture({
      labels: {
        visible_prefixes: ['has:', 'reviewed:', 'area:', 'component:']
      }
    });

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:',
      'area:',
      'component:'
    ]);
  });

  test('falls back when config json is invalid', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-config-'));
    const file_path = path.join(dir, 'config.json');
    temp_dirs.push(dir);
    fs.writeFileSync(file_path, '{"labels":');
    process.env.BDUI_CONFIG_PATH = file_path;

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:'
    ]);
  });

  test('falls back when config has no valid prefixes', () => {
    process.env.BDUI_CONFIG_PATH = writeConfigFixture({
      labels: { visible_prefixes: [null, 3, ''] }
    });

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:'
    ]);
  });

  test('preserves explicit empty array to hide summary labels', () => {
    process.env.BDUI_CONFIG_PATH = writeConfigFixture({
      labels: { visible_prefixes: [] }
    });

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([]);
  });
});
