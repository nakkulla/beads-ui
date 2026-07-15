import express from 'express';
import { createServer } from 'node:http';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createBreaker } from './breaker.js';
import { createLockManager } from './locks.js';
import { createMergeLockRouter } from './merge-lock-route.js';
import { createTokenRegistry } from './session-tokens.js';

/** @type {import('node:http').Server} */
let server;
/** @type {string} */
let base_url;
/** @type {ReturnType<typeof createBreaker>} */
let breaker;
/** @type {ReturnType<typeof createTokenRegistry>} */
let tokens;
/** @type {string} */
let session_token;

beforeEach(async () => {
  breaker = createBreaker();
  tokens = createTokenRegistry();
  const locks = createLockManager({
    isMergeBlocked: (repo) => breaker.isTripped(repo)
  });
  session_token = tokens.issue('att-1', { repo: '/repo', bead_id: 'UI-1' });

  const app = express();
  app.use(
    '/api/worker/merge-lock',
    createMergeLockRouter({ locks, tokens, breaker })
  );
  server = createServer(app);
  await new Promise((r) => server.listen(0, () => r(undefined)));
  const addr = server.address();
  if (!addr || typeof addr === 'string') {
    throw new Error('no address');
  }
  base_url = `http://127.0.0.1:${addr.port}/api/worker/merge-lock`;
});

afterEach(async () => {
  await new Promise((r) => server.close(() => r(undefined)));
});

/**
 * @param {Record<string, unknown>} body
 * @param {string|null} [token]
 * @returns {Promise<{ status: number, body: any }>}
 */
async function post(body, token = session_token) {
  const res = await fetch(base_url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  });
  return { status: res.status, body: await res.json() };
}

describe('POST /api/worker/merge-lock', () => {
  test('401 without a valid session token', async () => {
    const missing = await post({ repo: '/repo', target_base: 'main' }, null);
    expect(missing.status).toBe(401);
    const wrong = await post({ repo: '/repo', target_base: 'main' }, 'bogus');
    expect(wrong.status).toBe(401);
  });

  test('acquire → release round-trip', async () => {
    const acq = await post({ repo: '/repo', target_base: 'main' });
    expect(acq.status).toBe(200);
    expect(acq.body).toEqual({ ok: true, acquired: true });
    const rel = await post({
      repo: '/repo',
      target_base: 'main',
      action: 'release'
    });
    expect(rel.status).toBe(200);
    expect(rel.body.released).toBe(true);
  });

  test('breaker-tripped repo refuses acquire with 423', async () => {
    breaker.trip('/repo', { bead_id: 'UI-1', cause: 'verify_failed' });
    const acq = await post({ repo: '/repo', target_base: 'main' });
    expect(acq.status).toBe(423);
    expect(acq.body.error).toBe('breaker_tripped');
  });

  test('repo mismatch is forbidden', async () => {
    const acq = await post({ repo: '/other', target_base: 'main' });
    expect(acq.status).toBe(403);
  });

  test('a second acquirer waits until the first releases', async () => {
    const second_token = tokens.issue('att-2', {
      repo: '/repo',
      bead_id: 'UI-2'
    });
    const first = await post({ repo: '/repo', target_base: 'main' });
    expect(first.body.acquired).toBe(true);

    let secondDone = false;
    const secondP = post(
      { repo: '/repo', target_base: 'main' },
      second_token
    ).then((r) => {
      secondDone = true;
      return r;
    });
    // The second acquire must block while the first holds the lock.
    await new Promise((r) => setTimeout(r, 30));
    expect(secondDone).toBe(false);

    await post({ repo: '/repo', target_base: 'main', action: 'release' });
    const second = await secondP;
    expect(second.body.acquired).toBe(true);
    await post(
      { repo: '/repo', target_base: 'main', action: 'release' },
      second_token
    );
  });
});
