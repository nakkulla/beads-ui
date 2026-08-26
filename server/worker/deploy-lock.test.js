import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { acquireDeployLock } from './deploy-lock.js';

// Waits on REAL child processes (git, node, python), so wall time here is
// process startup under the load the parallel suite creates, not product work.
// Assertions are unchanged; only the waiting budget is sized for that load.
vi.setConfig({ testTimeout: 30_000 });

/**
 * Vitest's own default budget, restated because this file raises the file-level
 * budget for the rows that spawn the real python3 holder. The rows below inject
 * a fake spawn or fs and never wait on a process, so they keep that default.
 */
const PURE = { timeout: 5_000 };

/**
 * Wait budget for an acquisition whose outcome is decided by the holder, not
 * by expiry. The holder is a real python3 process, so this covers its startup
 * under suite load; the test that asserts expiry keeps its own tiny budget.
 * Kept below the file's test budget so two sequential acquisitions still
 * finish, and fail, inside it.
 */
const ACQUIRE_BUDGET_MS = 10_000;

/** @type {string} */
let root;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'deploy-lock-'));
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

describe('worker/deploy-lock', () => {
  test('waits for the current holder before acquiring', async () => {
    const first = await acquireDeployLock({
      repo: root,
      timeout_ms: ACQUIRE_BUDGET_MS
    });
    let second_settled = false;

    const second_promise = acquireDeployLock({
      repo: root,
      timeout_ms: ACQUIRE_BUDGET_MS
    }).then((result) => {
      second_settled = true;
      return result;
    });
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(first.ok).toBe(true);
    expect(second_settled).toBe(false);
    if (!first.ok) {
      throw new Error(first.code);
    }
    await first.release();
    const second = await second_promise;
    expect(second.ok).toBe(true);
    if (!second.ok) {
      throw new Error(second.code);
    }
    await second.release();
  });

  test('releases when the holder child exits', async () => {
    const first = await acquireDeployLock({
      repo: root,
      timeout_ms: ACQUIRE_BUDGET_MS
    });
    if (!first.ok) {
      throw new Error(first.code);
    }
    first.child.kill('SIGKILL');

    const second = await acquireDeployLock({
      repo: root,
      timeout_ms: ACQUIRE_BUDGET_MS
    });

    expect(second.ok).toBe(true);
    if (!second.ok) {
      throw new Error(second.code);
    }
    await second.release();
  });

  test('returns a stable timeout failure when bounded waiting expires', async () => {
    const first = await acquireDeployLock({
      repo: root,
      timeout_ms: ACQUIRE_BUDGET_MS
    });

    const second = await acquireDeployLock({ repo: root, timeout_ms: 25 });

    expect(second).toMatchObject({ ok: false, code: 'deploy_lock_timeout' });
    if (!first.ok) {
      throw new Error(first.code);
    }
    await first.release();
  });

  test('returns unavailable when python cannot be launched', PURE, async () => {
    const result = await acquireDeployLock({
      repo: root,
      timeout_ms: ACQUIRE_BUDGET_MS,
      spawn: /** @type {any} */ (
        () => spawn(path.join(root, 'missing-python'), [])
      )
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'deploy_lock_unavailable'
    });
  });

  test(
    'returns unavailable when spawning throws synchronously',
    PURE,
    async () => {
      const result = await acquireDeployLock({
        repo: root,
        timeout_ms: ACQUIRE_BUDGET_MS,
        spawn: /** @type {any} */ (
          () => {
            throw new Error('spawn failed');
          }
        )
      });

      expect(result).toEqual({
        ok: false,
        code: 'deploy_lock_unavailable'
      });
    }
  );

  test(
    'returns unavailable when preparing the lock directory throws',
    PURE,
    async () => {
      const result = await acquireDeployLock({
        repo: root,
        timeout_ms: ACQUIRE_BUDGET_MS,
        fs: /** @type {any} */ ({
          mkdirSync: () => {
            throw new Error('mkdir failed');
          }
        })
      });

      expect(result).toEqual({
        ok: false,
        code: 'deploy_lock_unavailable'
      });
    }
  );
});
