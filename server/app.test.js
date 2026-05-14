import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { createApp } from './app.js';
import { getConfig } from './config.js';

/** @type {string[]} */
const temp_dirs = [];

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
 * @param {string} content
 * @returns {string}
 */
function writeTomlFixture(content) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-app-config-'));
  const file_path = path.join(dir, 'config.toml');
  temp_dirs.push(dir);
  fs.writeFileSync(file_path, content);
  return file_path;
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
 * @param {RequestInit} [options]
 * @returns {Promise<any>}
 */
async function fetchJsonFromApp(app, pathname, options) {
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, () => resolve(undefined)));
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('missing test server address');
  }

  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}${pathname}`,
      options
    );
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
  for (const dir of temp_dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
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

  test('exposes exact labels and detail workflow config', async () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();
    const config = getConfig();
    const app = createApp({
      ...config,
      label_display_policy: {
        visible_prefixes: ['has:'],
        visible_exact: ['pr'],
        colors: {
          prefix: {
            'has:': { fg: '#16a34a' }
          },
          exact: {
            pr: { fg: '#7c3aed' }
          }
        }
      },
      detail: {
        workflow_summary: {
          sections: ['workflow_settings'],
          workflow_settings: {
            fields: ['execution_lane'],
            editable_fields: ['execution_lane']
          }
        }
      }
    });

    const body = await fetchJsonFromApp(app, '/api/config');

    expect(body.label_display_policy.visible_exact).toEqual(['pr']);
    expect(body.label_display_policy.colors).toEqual({
      prefix: {
        'has:': { fg: '#16a34a' }
      },
      exact: {
        pr: { fg: '#7c3aed' }
      }
    });
    expect(body.detail.workflow_summary.sections).toEqual([
      'workflow_settings'
    ]);
  });

  test('uses workflow summary defaults when detail config is absent', async () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();
    const config = getConfig();
    const app = createApp({
      ...config,
      detail: undefined
    });

    const body = await fetchJsonFromApp(app, '/api/config');

    expect(body.detail.workflow_summary.sections).toContain(
      'workflow_settings'
    );
    expect(body.detail.workflow_summary.workflow_settings.fields).toEqual([
      'execution_lane',
      'workspace_policy',
      'branch_policy',
      'finish_action',
      'review_profile',
      'review_runtime'
    ]);
  });

  test('updates worker defaults and returns bootstrap worker config', async () => {
    const config_path = writeTomlFixture(`
[worker]
pr_review_wait_ms = 120000
advance_delay_ms = 45000
`);
    process.env.BDUI_CONFIG_PATH = config_path;
    const config = getConfig();
    const app = createApp({
      ...config,
      host: '127.0.0.1',
      port: 0,
      app_dir: '.',
      root_dir: process.cwd(),
      frontend_mode: 'static'
    });

    const body = await fetchJsonFromApp(app, '/api/config/worker', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        default_model: 'gpt-5.4',
        default_effort: 'medium',
        pr_review_wait_ms: 999
      })
    });
    const file_content = fs.readFileSync(config_path, 'utf8');

    expect(body.worker).toEqual({
      default_model: 'gpt-5.4',
      default_effort: 'medium',
      pr_review_wait_ms: 120000,
      advance_delay_ms: 45000
    });
    expect(file_content).toContain('default_model = "gpt-5.4"');
    expect(file_content).toContain('default_effort = "medium"');
    expect(file_content).not.toContain('999');
  });

  test('index.html exists in configured app_dir', () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();
    const config = getConfig();
    const index_path = path.join(config.app_dir, 'index.html');
    expect(fs.existsSync(index_path)).toBe(true);
  });
});
