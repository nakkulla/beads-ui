import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
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

/** @type {string[]} */
const temporary_roots = [];

/**
 * A self-contained `app_dir`: the real `index.html` (the bootstrap assertions
 * read it) plus a bundle fixture of our own, so no test here depends on a
 * committed `app/main.bundle.js` — it is an untracked build output (UI-47y7).
 *
 * @param {{ bundle?: boolean }} [options]
 * @returns {string} absolute path of the temporary app dir
 */
function appDir(options = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-app-dir-'));
  temporary_roots.push(root);
  fs.copyFileSync(
    path.resolve('app', 'index.html'),
    path.join(root, 'index.html')
  );
  fs.writeFileSync(
    path.join(root, 'main.js'),
    "export const MARKER = 'on-demand-marker';\n"
  );
  if (options.bundle !== false) {
    fs.writeFileSync(
      path.join(root, 'main.bundle.js'),
      "export const MARKER = 'static-marker';\n"
    );
  }
  return root;
}

afterEach(() => {
  for (const root of temporary_roots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

describe('createApp frontend bundle modes', () => {
  /**
   * @param {Partial<{ host: string, port: number, app_dir: string, root_dir: string, frontend_mode: 'live' | 'static', workspace_config: { default_workspace: string | null } }>} [overrides]
   * @returns {{ host: string, port: number, app_dir: string, root_dir: string, frontend_mode: 'live' | 'static', workspace_config: { default_workspace: string | null } }}
   */
  function makeConfig(overrides = {}) {
    return {
      host: '127.0.0.1',
      port: 3000,
      app_dir: appDir(),
      root_dir: process.cwd(),
      frontend_mode: 'static',
      workspace_config: { default_workspace: null },
      ...overrides
    };
  }

  test('serves an on-demand bundle in live mode even when the bundle file exists', async () => {
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
    expect(text).toContain('on-demand-marker');
  });

  test('serves the built bundle in static mode', async () => {
    const app = createApp(makeConfig({ frontend_mode: 'static' }));
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
    expect(response.headers.get('cache-control')).not.toBe('no-store');
    expect(text).toContain('static-marker');
  });

  test('refuses to start in static mode without a built bundle', () => {
    const config = makeConfig({
      frontend_mode: 'static',
      app_dir: appDir({ bundle: false })
    });

    expect(() => createApp(config)).toThrow(/npm run build/);
  });

  test('starts without a built bundle in live mode', async () => {
    const app = createApp(
      makeConfig({ frontend_mode: 'live', app_dir: appDir({ bundle: false }) })
    );
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
    expect(text).toContain('on-demand-marker');
  });

  test('serves bootstrapped root html and config endpoint', async () => {
    const app = createApp(
      makeConfig({
        workspace_config: { default_workspace: '/repo/</script>' }
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
    expect(root_response.headers.get('cache-control')).toBe('no-store');
    expect(root_text).toContain('window.__BDUI_BOOTSTRAP__');
    expect(root_text).toContain('\\u003c');
    expect(config_response.status).toBe(200);
    expect(config_response.headers.get('cache-control')).toBe('no-store');
    expect(config_payload.workspace_config).toEqual({
      default_workspace: '/repo/</script>'
    });
  });
});
