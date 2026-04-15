import fs from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createApp } from './app.js';

/**
 * @param {import('node:http').Server} server
 */
async function listen(server) {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return /** @type {import('node:net').AddressInfo} */ (server.address());
}

/**
 * @param {import('node:http').Server} server
 */
async function close(server) {
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

    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir: process.cwd(),
      frontend_mode: 'live'
    });
    const server = createServer(app);
    const address = await listen(server);

    const response = await fetch(
      `http://127.0.0.1:${address.port}/main.bundle.js`
    );
    const text = await response.text();

    await close(server);

    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(response.headers.get('content-type')).toContain(
      'application/javascript'
    );
    expect(text).toContain('createHashRouter');
  });

  test('uses static bundle when frontend_mode is static and bundle file exists', async () => {
    const app = createApp({
      host: '127.0.0.1',
      port: 3000,
      app_dir,
      root_dir: process.cwd(),
      frontend_mode: 'static'
    });
    const server = createServer(app);
    const address = await listen(server);

    const response = await fetch(
      `http://127.0.0.1:${address.port}/main.bundle.js`
    );
    await response.arrayBuffer();

    await close(server);

    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).not.toBe('no-store');
  });
});
