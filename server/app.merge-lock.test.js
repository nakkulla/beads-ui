import { createServer } from 'node:http';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createApp } from './app.js';
import {
  __resetWorkerRuntimeForTest,
  getWorkerRuntime
} from './worker/runtime.js';

/** @type {import('node:http').Server} */
let server;
/** @type {string} */
let base;

beforeEach(async () => {
  __resetWorkerRuntimeForTest();
  const app = createApp({
    host: '127.0.0.1',
    port: 0,
    app_dir: path.resolve('app'),
    root_dir: process.cwd(),
    frontend_mode: 'static',
    label_display_policy: {
      visible_prefixes: ['has:'],
      visible_exact: [],
      colors: { prefix: {}, exact: {} }
    }
  });
  server = createServer(app);
  await new Promise((r) => server.listen(0, () => r(undefined)));
  const addr = server.address();
  if (!addr || typeof addr === 'string') {
    throw new Error('no address');
  }
  base = `http://127.0.0.1:${addr.port}/api/worker/merge-lock`;
});

afterEach(async () => {
  await new Promise((r) => server.close(() => r(undefined)));
  __resetWorkerRuntimeForTest();
});

describe('app: /api/worker/merge-lock mounted (session-token auth)', () => {
  test('401 without a session token (config token does NOT authorize)', async () => {
    const res = await fetch(base, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer cfg-token'
      },
      body: JSON.stringify({ repo: '/r', target_base: 'main' })
    });
    expect(res.status).toBe(401);
  });

  test('acquires with a per-session token issued on the shared runtime', async () => {
    const token = getWorkerRuntime().tokens.issue('att-1', {
      repo: '/r',
      bead_id: 'UI-1'
    });
    const res = await fetch(base, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ repo: '/r', target_base: 'main' })
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true, acquired: true });
  });
});
