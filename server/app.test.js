import fs from 'node:fs';
import { createServer } from 'node:http';
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

/**
 * @param {import('express').Express} app
 * @param {string} pathname
 * @returns {Promise<any>}
 */
async function fetchJsonFromApp(app, pathname) {
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, () => resolve(undefined)));
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('missing test server address');
  }

  try {
    const response = await fetch(`http://127.0.0.1:${address.port}${pathname}`);
    return await response.json();
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(undefined);
      });
    });
  }
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

  test('omits label policy from the bootstrap config', async () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();
    const config = getConfig();
    const app = createApp(config);

    const body = await fetchJsonFromApp(app, '/api/config');

    expect('label_display_policy' in body).toBe(false);
  });

  test('exposes the default workspace in the bootstrap config', async () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();
    const config = getConfig();
    const app = createApp({
      ...config,
      workspace_config: { ...config.workspace_config, default_workspace: '/w' }
    });

    const body = await fetchJsonFromApp(app, '/api/config');

    expect(body.workspace_config).toEqual({ default_workspace: '/w' });
  });

  test('index.html exists in configured app_dir', () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();
    const config = getConfig();
    const index_path = path.join(config.app_dir, 'index.html');
    expect(fs.existsSync(index_path)).toBe(true);
  });
});
