import { EventEmitter } from 'node:events';
import { describe, expect, test, vi } from 'vitest';
import { createNotifier } from './notify.js';

/**
 * A fake spawn that records every call and hands back a child whose `error`
 * event a test can drive. `unref` is a spy so the fire-and-forget contract is
 * observable.
 */
function makeFakeSpawn() {
  /** @type {Array<{ command: string, args: string[], options: any, child: any }>} */
  const calls = [];
  const spawnImpl = (
    /** @type {string} */ command,
    /** @type {string[]} */ args,
    /** @type {any} */ options
  ) => {
    const child = /** @type {any} */ (new EventEmitter());
    child.unref = vi.fn();
    calls.push({ command, args, options, child });
    return child;
  };
  return { calls, spawnImpl, last: () => calls[calls.length - 1] };
}

/**
 * @param {any} worker_notify
 * @param {{ spawnImpl?: any, log?: any }} [overrides]
 */
function makeNotifier(worker_notify, overrides = {}) {
  return createNotifier({
    getConfig: () => ({ worker_notify }),
    spawnImpl: overrides.spawnImpl,
    log: overrides.log || (() => {})
  });
}

const ENABLED = { enabled: true, cmd: ['discord'] };

describe('worker/notify argv assembly', () => {
  test('sends the start event quietly with bead id, title, repo and exec', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    notifier.attemptStarted({
      bead_id: 'UI-1',
      title: '워커 알림',
      model: 'opus',
      effort: 'high',
      repo: '/Users/me/GitHub/beads-ui',
      kind: 'dispatch'
    });

    const call = spawn.last();
    expect(call.command).toBe('discord');
    expect(call.args.slice(0, 3)).toEqual(['-q', '-t', '워커 시작']);
    expect(call.args[3]).toBe(
      'UI-1 — 워커 알림\n리포: beads-ui\n실행: opus / high'
    );
  });

  test('labels a resume launch in the start message', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    notifier.attemptStarted({
      bead_id: 'UI-1',
      repo: '/r/proj',
      kind: 'resume'
    });

    expect(spawn.last().args[3]).toBe('[재개] UI-1\n리포: proj');
  });

  test('labels a conflict-resolution launch in the start message', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    notifier.attemptStarted({
      bead_id: 'UI-1',
      repo: '/r/proj',
      kind: 'conflict'
    });

    expect(spawn.last().args[3]).toBe('[충돌 해결] UI-1\n리포: proj');
  });

  test('omits an absent title and absent exec settings', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    notifier.attemptStarted({
      bead_id: 'UI-1',
      title: null,
      model: null,
      effort: null,
      repo: '/r/proj'
    });

    expect(spawn.last().args[3]).toBe('UI-1\n리포: proj');
  });

  test('sends the failure event in red with the cause', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    notifier.attemptFailed({
      bead_id: 'UI-1',
      cause: 'session_failed:result_count',
      repo: '/r/proj'
    });

    const call = spawn.last();
    expect(call.args.slice(0, 4)).toEqual(['-c', 'red', '-t', '워커 실패']);
    expect(call.args[4]).toBe(
      'UI-1\n사유: session_failed:result_count\n리포: proj'
    );
  });

  test('carries the blocker cause_detail into the failure message', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    notifier.attemptFailed({
      bead_id: 'UI-1',
      cause: 'loud_fail_blocker',
      repo: '/r/proj',
      cause_detail: { reason: 'git_merge_guard', command: 'git merge main' }
    });

    expect(spawn.last().args[4]).toBe(
      'UI-1\n사유: loud_fail_blocker\n리포: proj\n가드: git_merge_guard\n명령: git merge main'
    );
  });

  test('drops a null command from the cause_detail', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    notifier.attemptFailed({
      bead_id: 'UI-1',
      cause: 'loud_fail_blocker',
      repo: '/r/proj',
      cause_detail: { reason: 'git_merge_guard', command: null }
    });

    expect(spawn.last().args[4]).toBe(
      'UI-1\n사유: loud_fail_blocker\n리포: proj\n가드: git_merge_guard'
    );
  });

  test('sends the pr_wait event in green with the PR url', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    notifier.prWaitEntered({
      bead_id: 'UI-1',
      pr_url: 'https://github.com/o/r/pull/7',
      repo: '/r/proj'
    });

    const call = spawn.last();
    expect(call.args.slice(0, 4)).toEqual(['-c', 'green', '-t', 'PR 대기']);
    expect(call.args[4]).toBe(
      'UI-1\nhttps://github.com/o/r/pull/7\n리포: proj'
    );
  });

  test('omits an unobserved PR url', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    notifier.prWaitEntered({ bead_id: 'UI-1', pr_url: null, repo: '/r/proj' });

    expect(spawn.last().args[4]).toBe('UI-1\n리포: proj');
  });

  test('spawns the configured command argv without a shell', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(
      { enabled: true, cmd: ['/opt/bin/notify', '--to', 'ops'] },
      { spawnImpl: spawn.spawnImpl }
    );

    notifier.attemptFailed({ bead_id: 'UI-1', cause: 'spawn_failed' });

    const call = spawn.last();
    expect(call.command).toBe('/opt/bin/notify');
    expect(call.args.slice(0, 2)).toEqual(['--to', 'ops']);
  });

  test('detaches and unrefs the child so nothing waits on it', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    notifier.attemptStarted({ bead_id: 'UI-1' });

    const call = spawn.last();
    expect(call.options).toEqual({ stdio: 'ignore', detached: true });
    expect(call.child.unref).toHaveBeenCalledTimes(1);
  });
});

describe('worker/notify fail-quiet', () => {
  test('sends nothing when the section is absent', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(undefined, { spawnImpl: spawn.spawnImpl });

    notifier.attemptStarted({ bead_id: 'UI-1' });
    notifier.attemptFailed({ bead_id: 'UI-1', cause: 'spawn_failed' });
    notifier.prWaitEntered({ bead_id: 'UI-1' });

    expect(spawn.calls).toHaveLength(0);
  });

  test('sends nothing when disabled', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(
      { enabled: false, cmd: ['discord'] },
      { spawnImpl: spawn.spawnImpl }
    );

    notifier.attemptStarted({ bead_id: 'UI-1' });

    expect(spawn.calls).toHaveLength(0);
  });

  test('sends nothing when the configured cmd is empty', () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(
      { enabled: true, cmd: [] },
      { spawnImpl: spawn.spawnImpl }
    );

    notifier.attemptStarted({ bead_id: 'UI-1' });

    expect(spawn.calls).toHaveLength(0);
  });

  test('swallows a config read that throws', () => {
    const notifier = createNotifier({
      getConfig: () => {
        throw new Error('config exploded');
      },
      spawnImpl: () => {
        throw new Error('must not spawn');
      },
      log: () => {}
    });

    expect(() => notifier.attemptStarted({ bead_id: 'UI-1' })).not.toThrow();
  });

  test('swallows a spawn that throws synchronously', () => {
    const log = vi.fn();
    const notifier = makeNotifier(ENABLED, {
      spawnImpl: () => {
        throw new Error('EACCES');
      },
      log
    });

    expect(() =>
      notifier.attemptFailed({ bead_id: 'UI-1', cause: 'spawn_failed' })
    ).not.toThrow();
    expect(log).toHaveBeenCalled();
  });

  test('swallows the async error event a missing CLI emits', () => {
    const spawn = makeFakeSpawn();
    const log = vi.fn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl, log });

    notifier.attemptStarted({ bead_id: 'UI-1' });

    expect(() =>
      spawn
        .last()
        .child.emit(
          'error',
          Object.assign(new Error('spawn discord ENOENT'), { code: 'ENOENT' })
        )
    ).not.toThrow();
    expect(log).toHaveBeenCalled();
  });
});
