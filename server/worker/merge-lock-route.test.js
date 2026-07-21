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

  test('revoking a holder token releases its merge lock so the next acquire resolves [F4]', async () => {
    const second_token = tokens.issue('att-2', {
      repo: '/repo',
      bead_id: 'UI-2'
    });
    // First session acquires and then DIES without releasing.
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
    // The second acquire blocks while the dead session still holds the lock.
    await new Promise((r) => setTimeout(r, 30));
    expect(secondDone).toBe(false);

    // Revoking the dead session's token releases the held lock (no route call).
    tokens.revoke('att-1');

    const second = await secondP;
    expect(second.body.acquired).toBe(true);
    await post(
      { repo: '/repo', target_base: 'main', action: 'release' },
      second_token
    );
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

/**
 * Observing-mode fixture: a fake gitRun with a mutable base tip so the router
 * reads acquire/release tips without a real repo. `merge-base --is-ancestor`
 * succeeds unless the test flips `ancestor_fails`.
 */
function makeFakeGit() {
  const state = {
    tip: 'a'.repeat(40),
    fail_rev_parse: false,
    ancestor_fails: false
  };
  /**
   * @param {string[]} args
   */
  async function gitRun(args) {
    if (args[0] === 'rev-parse') {
      return state.fail_rev_parse
        ? { code: 128, stdout: '', stderr: 'fatal' }
        : { code: 0, stdout: `${state.tip}\n`, stderr: '' };
    }
    if (args[0] === 'merge-base') {
      return {
        code: state.ancestor_fails ? 1 : 0,
        stdout: '',
        stderr: ''
      };
    }
    return { code: 0, stdout: '', stderr: '' };
  }
  return { state, gitRun };
}

describe('merge-lock observing mode (worker-autorun-policy §5)', () => {
  /** @type {ReturnType<typeof makeFakeGit>} */
  let fake_git;
  /** @type {any[]} */
  let observed;
  /** @type {any[]} */
  let rejected;
  /** @type {ReturnType<typeof createMergeLockRouter>} */
  let router;

  /**
   * @param {string} attempt_id
   * @param {string} [target_base]
   */
  function issueToken(attempt_id, target_base = 'main') {
    return tokens.issue(attempt_id, {
      repo: '/repo',
      bead_id: 'UI-1',
      target_base
    });
  }

  beforeEach(async () => {
    await new Promise((r) => server.close(() => r(undefined)));
    fake_git = makeFakeGit();
    observed = [];
    rejected = [];
    const locks = createLockManager({
      isMergeBlocked: (repo) => breaker.isTripped(repo)
    });
    router = createMergeLockRouter({
      locks,
      tokens,
      breaker,
      gitRun: fake_git.gitRun,
      observer: {
        onMergeObserved: (info) => observed.push(info),
        onReleaseRejected: (info) => rejected.push(info)
      }
    });
    const app = express();
    app.use('/api/worker/merge-lock', router);
    server = createServer(app);
    await new Promise((r) => server.listen(0, () => r(undefined)));
    const addr = server.address();
    if (!addr || typeof addr === 'string') {
      throw new Error('no address');
    }
    base_url = `http://127.0.0.1:${addr.port}/api/worker/merge-lock`;
  });

  test('release without base advance is rejected and the lock stays held', async () => {
    const token = issueToken('att-adv');
    const acq = await post({ repo: '/repo', target_base: 'main' }, token);
    expect(acq.status).toBe(200);

    // Tip unchanged since acquire → no merge happened → release refused.
    const rel = await post(
      { repo: '/repo', target_base: 'main', action: 'release' },
      token
    );
    expect(rel.status).toBe(409);
    expect(rel.body.reason).toBe('base_not_advanced');
    expect(router.isHeldBy(token)).toBe(true);
    expect(rejected).toEqual([
      { attempt_id: 'att-adv', repo: '/repo', reason: 'base_not_advanced' }
    ]);
    expect(observed).toEqual([]);
  });

  test('a forged merge_sha claim (mismatch with the server-read tip) is rejected', async () => {
    const token = issueToken('att-forge');
    await post({ repo: '/repo', target_base: 'main' }, token);
    fake_git.state.tip = 'b'.repeat(40); // merge really advanced the base…

    const rel = await post(
      {
        repo: '/repo',
        target_base: 'main',
        action: 'release',
        merge_sha: 'c'.repeat(40) // …but the session claims a different sha.
      },
      token
    );
    expect(rel.status).toBe(409);
    expect(rel.body.reason).toBe('merge_sha_mismatch');
    expect(router.isHeldBy(token)).toBe(true);
  });

  test('a valid release records the SERVER-read tip and hands the lock over', async () => {
    const token = issueToken('att-ok');
    await post({ repo: '/repo', target_base: 'main' }, token);
    fake_git.state.tip = 'b'.repeat(40);

    const rel = await post(
      { repo: '/repo', target_base: 'main', action: 'release' },
      token
    );
    expect(rel.status).toBe(200);
    expect(rel.body).toEqual({
      ok: true,
      released: true,
      merge_sha: 'b'.repeat(40)
    });
    expect(observed).toEqual([
      { attempt_id: 'att-ok', repo: '/repo', merge_sha: 'b'.repeat(40) }
    ]);
    // The session no longer holds it — the WORKER does (handover), so a token
    // revoke can no longer free it and a second acquirer must keep waiting.
    expect(router.isHeldBy(token)).toBe(false);

    const second = issueToken('att-2nd');
    let secondDone = false;
    const secondP = post({ repo: '/repo', target_base: 'main' }, second).then(
      (r) => {
        secondDone = true;
        return r;
      }
    );
    await new Promise((r) => setTimeout(r, 30));
    expect(secondDone).toBe(false);

    // The worker finishes post-merge verification and releases the handover.
    const release = router.takeHandover('att-ok');
    expect(typeof release).toBe('function');
    if (release) {
      release();
    }
    const s = await secondP;
    expect(s.body.acquired).toBe(true);
  });

  test('a woken waiter re-checks the breaker and is refused with 423', async () => {
    const first = issueToken('att-w1');
    const second = issueToken('att-w2');
    await post({ repo: '/repo', target_base: 'main' }, first);

    let secondDone = false;
    const secondP = post({ repo: '/repo', target_base: 'main' }, second).then(
      (r) => {
        secondDone = true;
        return r;
      }
    );
    await new Promise((r) => setTimeout(r, 30));
    expect(secondDone).toBe(false);

    // The repo fails while the waiter sleeps; the holder's token is revoked
    // (lock freed) → the waiter wakes into a TRIPPED repo and must be refused.
    breaker.trip('/repo', { bead_id: 'UI-1', cause: 'verify_failed' });
    tokens.revoke('att-w1');

    const s = await secondP;
    expect(s.status).toBe(423);
    expect(s.body.error).toBe('breaker_tripped');
  });

  test('a token bound to another target_base is forbidden (403)', async () => {
    const token = issueToken('att-base', 'main');
    const r = await post({ repo: '/repo', target_base: 'dev' }, token);
    expect(r.status).toBe(403);
  });

  test('an unreadable base at release rejects with git_error', async () => {
    const token = issueToken('att-git');
    await post({ repo: '/repo', target_base: 'main' }, token);
    fake_git.state.fail_rev_parse = true;
    const rel = await post(
      { repo: '/repo', target_base: 'main', action: 'release' },
      token
    );
    expect(rel.status).toBe(409);
    expect(rel.body.reason).toBe('git_error');
  });
});
