import express from 'express';
import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  __setAutoPoolStoreForTest,
  createAutoPoolStore
} from '../auto-pool-store.js';
import { loadExecutionDefaults } from '../worker/execution-defaults.js';
import {
  __resetAutoPoolForTest,
  handleAutoPoolSet
} from '../ws/auto-pool-handlers.js';
import { autoPoolHandler, createAutoPoolHandler } from './auto-pool.js';

/** The pinned projection's `implementation` block. */
const IMPLEMENTATION = loadExecutionDefaults().session?.implementation ?? null;

/** A Codex pool stored with high~xhigh (UI-y7h1 §4 first criterion). */
const CODEX_POOL = {
  models: ['terra-6.1', 'sol-6.1'],
  effort: { min: 'high', max: 'xhigh' }
};

/** @type {string} */
let tmp_dir;
/** @type {string} */
let file;

/**
 * @returns {ReturnType<typeof createAutoPoolStore>}
 */
function makeStore() {
  return createAutoPoolStore({
    filePath: () => file,
    warn: () => {},
    implementation: () => IMPLEMENTATION
  });
}

/**
 * GET /api/auto-pool through a real HTTP server.
 *
 * @param {import('express').RequestHandler} handler
 */
async function requestPool(handler) {
  const app = express();
  app.get('/api/auto-pool', handler);
  const server = createServer(app);
  await new Promise((resolve) => {
    server.listen({ port: 0, host: '127.0.0.1' }, () => resolve(undefined));
  });
  const address = /** @type {import('node:net').AddressInfo} */ (
    server.address()
  );
  try {
    const response = await fetch(
      `http://127.0.0.1:${address.port}/api/auto-pool`
    );
    return {
      status: response.status,
      cache_control: response.headers.get('cache-control'),
      cors: response.headers.get('access-control-allow-origin'),
      body: await response.json()
    };
  } finally {
    await new Promise((resolve) => server.close(() => resolve(undefined)));
  }
}

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-auto-pool-route-'));
  file = path.join(tmp_dir, 'auto-pool.json');
});

afterEach(() => {
  __setAutoPoolStoreForTest(null);
  __resetAutoPoolForTest();
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('GET /api/auto-pool', () => {
  test('answers revision 0 and empty runtimes on a server with nothing saved', async () => {
    const store = makeStore();

    const res = await requestPool(
      createAutoPoolHandler({ store: () => store })
    );

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      ok: true,
      schema: 1,
      revision: 0,
      runtimes: {}
    });
  });

  test('answers the stored document without filling defaults', async () => {
    const store = makeStore();
    store.set({ expected_revision: 0, runtimes: { codex: CODEX_POOL } });

    const res = await requestPool(
      createAutoPoolHandler({ store: () => store })
    );

    expect(res.body).toEqual({
      ok: true,
      schema: 1,
      revision: 1,
      runtimes: { codex: CODEX_POOL }
    });
  });

  test('sends no-store caching and no CORS header', async () => {
    const store = makeStore();

    const res = await requestPool(
      createAutoPoolHandler({ store: () => store })
    );

    expect(res.cache_control).toBe('no-store');
    expect(res.cors).toBeNull();
  });

  test('reads a WebSocket save and keeps it across a restart', async () => {
    __setAutoPoolStoreForTest(makeStore());
    __resetAutoPoolForTest({
      implementation: () => IMPLEMENTATION,
      catalog: () => /** @type {any} */ ({ runners: {}, model_index: {} })
    });
    const sock = {
      sent: /** @type {string[]} */ ([]),
      send(/** @type {string} */ m) {
        this.sent.push(m);
      }
    };
    handleAutoPoolSet(
      /** @type {any} */ (sock),
      /** @type {any} */ ({
        id: 'w1',
        type: 'auto-pool-set',
        payload: { expected_revision: 0, runtimes: { codex: CODEX_POOL } }
      })
    );

    const live = await requestPool(autoPoolHandler);
    __setAutoPoolStoreForTest(makeStore());
    const restarted = await requestPool(autoPoolHandler);

    const expected = {
      ok: true,
      schema: 1,
      revision: 1,
      runtimes: { codex: CODEX_POOL }
    };
    expect(live.body).toEqual(expected);
    expect(restarted.body).toEqual(expected);
  });
});
