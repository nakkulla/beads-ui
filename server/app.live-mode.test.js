import fs from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createApp } from './app.js';

/**
 * @param {import('node:http').Server} server
 */
async function listen(server) {
  await new Promise((resolve) => {
    server.listen({ port: 0, host: '127.0.0.1' }, () => {
      resolve(undefined);
    });
  });
  return /** @type {import('node:net').AddressInfo} */ (server.address());
}

/**
 * @param {import('node:http').Server} server
 */
async function close(server) {
  if (!server.listening) {
    return;
  }

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

describe('createApp live frontend mode', () => {
  const app_dir = path.resolve('app');

  /**
   * @param {Partial<{ host: string, port: number, app_dir: string, root_dir: string, frontend_mode: 'live' | 'static', label_display_policy: { visible_prefixes: string[] } }>} [overrides]
   * @returns {{ host: string, port: number, app_dir: string, root_dir: string, frontend_mode: 'live' | 'static', label_display_policy: { visible_prefixes: string[] } }}
   */
  function makeConfig(overrides = {}) {
    return {
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir: process.cwd(),
      frontend_mode: 'static',
      label_display_policy: {
        visible_prefixes: ['has:', 'reviewed:']
      },
      ...overrides
    };
  }

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('serves on-demand bundle when frontend_mode is live even if bundle file exists', async () => {
    vi.spyOn(fs, 'statSync').mockReturnValue(
      /** @type {import('node:fs').Stats} */ ({ isFile: () => true })
    );

    const app = createApp(makeConfig({ frontend_mode: 'live' }));
    const server = createServer(app);
    let response;
    let text;

    try {
      const address = await listen(server);
      response = await fetch(`http://127.0.0.1:${address.port}/main.bundle.js`);
      text = await response.text();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(response.headers.get('content-type')).toContain(
      'application/javascript'
    );
    expect(text).toContain('createHashRouter');
  });

  test('uses static bundle when frontend_mode is static and bundle file exists', async () => {
    const app = createApp(makeConfig({ frontend_mode: 'static' }));
    const server = createServer(app);
    let response;

    try {
      const address = await listen(server);
      response = await fetch(`http://127.0.0.1:${address.port}/main.bundle.js`);
      await response.arrayBuffer();
    } finally {
      await close(server);
    }

    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).not.toBe('no-store');
  });

  test('serves bootstrapped root html and config endpoint', async () => {
    const app = createApp(
      makeConfig({
        label_display_policy: {
          visible_prefixes: ['area:<tag>', '</script>']
        }
      })
    );
    const server = createServer(app);
    let root_response;
    let root_text;
    let config_response;
    let config_payload;

    try {
      const address = await listen(server);
      root_response = await fetch(`http://127.0.0.1:${address.port}/`);
      root_text = await root_response.text();
      config_response = await fetch(
        `http://127.0.0.1:${address.port}/api/config`
      );
      config_payload = await config_response.json();
    } finally {
      await close(server);
    }

    expect(root_response.status).toBe(200);
    expect(root_text).toContain('window.__BDUI_BOOTSTRAP__');
    expect(root_text).toContain('\\u003c');
    expect(config_response.status).toBe(200);
    expect(config_payload).toEqual({
      label_display_policy: {
        visible_prefixes: ['area:<tag>', '</script>']
      }
    });
  });
});
