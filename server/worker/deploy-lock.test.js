import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { acquireDeployLock } from './deploy-lock.js';

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
    const first = await acquireDeployLock({ repo: root, timeout_ms: 1000 });
    let second_settled = false;

    const second_promise = acquireDeployLock({
      repo: root,
      timeout_ms: 1000
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
    const first = await acquireDeployLock({ repo: root, timeout_ms: 1000 });
    if (!first.ok) {
      throw new Error(first.code);
    }
    first.child.kill('SIGKILL');

    const second = await acquireDeployLock({ repo: root, timeout_ms: 1000 });

    expect(second.ok).toBe(true);
    if (!second.ok) {
      throw new Error(second.code);
    }
    await second.release();
  });

  test('returns a stable timeout failure when bounded waiting expires', async () => {
    const first = await acquireDeployLock({ repo: root, timeout_ms: 1000 });

    const second = await acquireDeployLock({ repo: root, timeout_ms: 25 });

    expect(second).toMatchObject({ ok: false, code: 'deploy_lock_timeout' });
    if (!first.ok) {
      throw new Error(first.code);
    }
    await first.release();
  });

  test('returns unavailable when python cannot be launched', async () => {
    const result = await acquireDeployLock({
      repo: root,
      timeout_ms: 1000,
      spawn: /** @type {any} */ (
        () => spawn(path.join(root, 'missing-python'), [])
      )
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'deploy_lock_unavailable'
    });
  });

  test('returns unavailable when spawning throws synchronously', async () => {
    const result = await acquireDeployLock({
      repo: root,
      timeout_ms: 1000,
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
  });

  test('returns unavailable when preparing the lock directory throws', async () => {
    const result = await acquireDeployLock({
      repo: root,
      timeout_ms: 1000,
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
  });
});
