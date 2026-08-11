import { describe, expect, test } from 'vitest';
import { createLockManager } from './locks.js';

describe('worker/locks acquire ordering', () => {
  test('same key serializes: second waits until first releases', async () => {
    const locks = createLockManager();
    /** @type {string[]} */
    const log = [];

    const r1 = await locks.acquire('k');
    log.push('a1-held');

    let r2Held = false;
    const p2 = locks.acquire('k').then((release) => {
      r2Held = true;
      log.push('a2-held');
      return release;
    });

    // Give the microtask queue a chance; a2 must still be waiting.
    await Promise.resolve();
    await Promise.resolve();
    expect(r2Held).toBe(false);

    log.push('a1-release');
    r1();
    const r2 = await p2;
    expect(r2Held).toBe(true);
    r2();

    expect(log).toEqual(['a1-held', 'a1-release', 'a2-held']);
  });

  test('different keys do not block each other', async () => {
    const locks = createLockManager();
    const a = await locks.acquire('a');
    // b should acquire immediately even though a is held.
    const b = await locks.acquire('b');
    expect(typeof a).toBe('function');
    expect(typeof b).toBe('function');
    a();
    b();
  });

  test('named layers use distinct keyspaces', async () => {
    const locks = createLockManager();
    const dup = await locks.dupRunLock('db1', 'UI-1');
    const topo = await locks.topologyLock('/repo');
    const svc = await locks.serviceLock();
    // All three held concurrently (independent keys).
    expect([dup, topo, svc].every((r) => typeof r === 'function')).toBe(true);
    dup();
    topo();
    svc();
  });

  test('serializes deployment work per repo without blocking another repo', async () => {
    const locks = createLockManager();
    const first = await locks.deployLock('/repo/a');
    let second_held = false;
    const second = locks.deployLock('/repo/a').then((release) => {
      second_held = true;
      return release;
    });
    const other = await locks.deployLock('/repo/b');

    await Promise.resolve();
    expect(second_held).toBe(false);

    first();
    const release_second = await second;
    expect(second_held).toBe(true);
    release_second();
    other();
  });
});
