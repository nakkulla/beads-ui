import fs from 'node:fs';
import { createServer, request } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { afterEach, describe, expect, test } from 'vitest';
import { createApp } from './app.js';

/** @type {string[]} */
const temporary_roots = [];

afterEach(() => {
  for (const root of temporary_roots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

/**
 * A temporary `app_dir` with a bundle, a stylesheet and optional `.gz` files.
 *
 * @param {{ gzip?: boolean, stale_gzip?: boolean }} [options]
 * @returns {string}
 */
function appDir(options = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-gzip-app-'));
  temporary_roots.push(root);
  fs.copyFileSync(
    path.resolve('app', 'index.html'),
    path.join(root, 'index.html')
  );
  fs.writeFileSync(
    path.join(root, 'main.js'),
    "export const MARKER = 'on-demand-marker';\n"
  );
  fs.writeFileSync(
    path.join(root, 'main.bundle.js'),
    "export const MARKER = 'static-marker';\n"
  );
  if (options.gzip === true) {
    const gz_path = path.join(root, 'main.bundle.js.gz');
    fs.writeFileSync(gz_path, zlib.gzipSync('gzipped-marker'));
    if (options.stale_gzip === true) {
      const old = new Date(Date.now() - 60_000);
      fs.utimesSync(gz_path, old, old);
    }
  }
  return root;
}

/**
 * GET a path with raw headers (no automatic decompression).
 *
 * @param {import('express').Express} app
 * @param {string} url_path
 * @param {Record<string, string>} headers
 * @returns {Promise<{ status: number, headers: import('node:http').IncomingHttpHeaders, body: Buffer }>}
 */
async function rawGet(app, url_path, headers) {
  const server = createServer(app);
  await new Promise((resolve) => {
    server.listen({ port: 0, host: '127.0.0.1' }, () => resolve(undefined));
  });
  const address = /** @type {import('node:net').AddressInfo} */ (
    server.address()
  );
  try {
    return await new Promise((resolve, reject) => {
      const req = request(
        { host: '127.0.0.1', port: address.port, path: url_path, headers },
        (res) => {
          /** @type {Buffer[]} */
          const chunks = [];
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () =>
            resolve({
              status: res.statusCode || 0,
              headers: res.headers,
              body: Buffer.concat(chunks)
            })
          );
        }
      );
      req.on('error', reject);
      req.end();
    });
  } finally {
    await new Promise((resolve) => server.close(() => resolve(undefined)));
  }
}

/**
 * @param {string} app_dir
 * @param {'live'|'static'} [frontend_mode]
 */
function makeApp(app_dir, frontend_mode = 'static') {
  return createApp({
    host: '127.0.0.1',
    port: 3000,
    app_dir,
    root_dir: process.cwd(),
    frontend_mode,
    workspace_config: { default_workspace: null }
  });
}

describe('pre-compressed static assets (UI-j2h3 §4.5)', () => {
  test('serves the fresh gz sibling with gzip headers', async () => {
    const app = makeApp(appDir({ gzip: true }));

    const res = await rawGet(app, '/main.bundle.js', {
      'accept-encoding': 'gzip, deflate'
    });

    expect([
      res.headers['content-encoding'],
      res.headers.vary,
      res.headers['content-type'],
      zlib.gunzipSync(res.body).toString()
    ]).toEqual([
      'gzip',
      'Accept-Encoding',
      'text/javascript; charset=utf-8',
      'gzipped-marker'
    ]);
  });

  test('serves the original when no gz sibling exists', async () => {
    const app = makeApp(appDir());

    const res = await rawGet(app, '/main.bundle.js', {
      'accept-encoding': 'gzip'
    });

    expect(res.headers['content-encoding']).toBeUndefined();
    expect(res.body.toString()).toContain('static-marker');
  });

  test('serves the original when the gz sibling is older', async () => {
    const app = makeApp(appDir({ gzip: true, stale_gzip: true }));

    const res = await rawGet(app, '/main.bundle.js', {
      'accept-encoding': 'gzip'
    });

    expect(res.body.toString()).toContain('static-marker');
  });

  test('serves the original without an Accept-Encoding header', async () => {
    const app = makeApp(appDir({ gzip: true }));

    const res = await rawGet(app, '/main.bundle.js', {});

    expect(res.body.toString()).toContain('static-marker');
  });

  test('gzips the live bundle for a gzip request', async () => {
    const app = makeApp(appDir(), 'live');

    const res = await rawGet(app, '/main.bundle.js', {
      'accept-encoding': 'gzip'
    });

    expect(res.headers['content-encoding']).toBe('gzip');
    expect(zlib.gunzipSync(res.body).toString()).toContain('on-demand-marker');
  });
});
