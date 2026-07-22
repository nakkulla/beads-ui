import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
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
/**
 * A REAL git repo — the merge-lock route runs in observing mode (it reads the
 * base tip itself at acquire), so an unreadable repo is refused fail-closed.
 *
 * @type {string}
 */
let repo_dir;

beforeEach(async () => {
  __resetWorkerRuntimeForTest();
  repo_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-applock-'));
  for (const args of [
    ['init', '-q'],
    ['checkout', '-q', '-b', 'main'],
    ['config', 'user.email', 't@t'],
    ['config', 'user.name', 't'],
    ['commit', '-q', '--allow-empty', '-m', 'base']
  ]) {
    execFileSync('git', args, { cwd: repo_dir });
  }
  const app = createApp({
    host: '127.0.0.1',
    port: 0,
    app_dir: path.resolve('app'),
    root_dir: process.cwd(),
    frontend_mode: 'static'
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
  try {
    fs.rmSync(repo_dir, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
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
      repo: repo_dir,
      bead_id: 'UI-1'
    });
    const res = await fetch(base, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ repo: repo_dir, target_base: 'main' })
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true, acquired: true });
  });
});
