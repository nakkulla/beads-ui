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
          sections: ['route'],
          route: {
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
    expect(body.detail.workflow_summary.sections).toEqual(['route']);
  });

  test('uses workflow summary defaults when detail config is absent', async () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();
    const config = getConfig();
    const app = createApp({
      ...config,
      detail: undefined
    });

    const body = await fetchJsonFromApp(app, '/api/config');

    expect(body.detail.workflow_summary.sections).toContain('route');
    expect(body.detail.workflow_summary.route.fields).toContain('topology');
  });

  test('index.html exists in configured app_dir', () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();
    const config = getConfig();
    const index_path = path.join(config.app_dir, 'index.html');
    expect(fs.existsSync(index_path)).toBe(true);
  });
});
