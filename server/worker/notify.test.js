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
 * @param {{ spawnImpl?: any, log?: any, resolveTitle?: any }} [overrides]
 */
function makeNotifier(worker_notify, overrides = {}) {
  return createNotifier({
    getConfig: () => ({ worker_notify }),
    spawnImpl: overrides.spawnImpl,
    resolveTitle: overrides.resolveTitle,
    log: overrides.log || (() => {})
  });
}

const ENABLED = { enabled: true, cmd: ['discord'] };

/** The message is the last argument, and the only one after the argv. */
const messageOf = (/** @type {{ args: string[] }} */ call) =>
  call.args[call.args.length - 1];

describe('worker/notify argv assembly', () => {
  test('sends the start event with the transition, bead, repo and exec', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({
      bead_id: 'UI-1',
      title: '워커 알림',
      model: 'opus',
      effort: 'high',
      repo: '/Users/me/GitHub/beads-ui',
      kind: 'dispatch'
    });

    const call = spawn.last();
    expect(call.command).toBe('discord');
    expect(call.args).toEqual([
      '🚀 beads worker · 시작 — UI-1 워커 알림\n리포: beads-ui\n실행: opus / high'
    ]);
  });

  test('sends no title, colour or quiet flag', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({ bead_id: 'UI-1' });
    await notifier.attemptFailed({ bead_id: 'UI-1', cause: 'verify_failed' });
    await notifier.prWaitEntered({ bead_id: 'UI-1' });
    await notifier.mergeCompleted({ bead_id: 'UI-1' });

    for (const call of spawn.calls) {
      expect(call.args).toHaveLength(1);
      expect(call.args).not.toContain('-t');
      expect(call.args).not.toContain('-c');
      expect(call.args).not.toContain('-q');
    }
  });

  test('names a resume launch as its own transition', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({
      bead_id: 'UI-1',
      title: '워커 알림',
      repo: '/r/proj',
      kind: 'resume'
    });

    expect(messageOf(spawn.last())).toBe(
      '🚀 beads worker · 재개 — UI-1 워커 알림\n리포: proj'
    );
  });

  test('names a conflict-resolution launch as its own transition', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({
      bead_id: 'UI-1',
      title: '워커 알림',
      repo: '/r/proj',
      kind: 'conflict'
    });

    expect(messageOf(spawn.last())).toBe(
      '🚀 beads worker · 충돌 해결 — UI-1 워커 알림\n리포: proj'
    );
  });

  test('omits an absent title and absent exec settings', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({
      bead_id: 'UI-1',
      title: null,
      model: null,
      effort: null,
      repo: '/r/proj'
    });

    expect(messageOf(spawn.last())).toBe(
      '🚀 beads worker · 시작 — UI-1\n리포: proj'
    );
  });

  test('truncates a bead title that would eat the preview budget', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({ bead_id: 'UI-1', title: '가'.repeat(61) });

    expect(messageOf(spawn.last())).toBe(
      `🚀 beads worker · 시작 — UI-1 ${'가'.repeat(60)}…`
    );
  });

  test('keeps a bead title exactly at the limit intact', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({ bead_id: 'UI-1', title: '가'.repeat(60) });

    expect(messageOf(spawn.last())).toBe(
      `🚀 beads worker · 시작 — UI-1 ${'가'.repeat(60)}`
    );
  });

  test('sends the failure event with the cause', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, {
      spawnImpl: spawn.spawnImpl,
      resolveTitle: async () => '워커 알림'
    });

    await notifier.attemptFailed({
      bead_id: 'UI-1',
      cause: 'session_failed:result_count',
      repo: '/r/proj'
    });

    expect(messageOf(spawn.last())).toBe(
      '❌ beads worker · 실패 — UI-1 워커 알림\n사유: session_failed:result_count\n리포: proj'
    );
  });

  test('carries the blocker cause_detail into the failure message', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptFailed({
      bead_id: 'UI-1',
      cause: 'loud_fail_blocker',
      repo: '/r/proj',
      cause_detail: { reason: 'git_merge_guard', command: 'git merge main' }
    });

    expect(messageOf(spawn.last())).toBe(
      '❌ beads worker · 실패 — UI-1\n사유: loud_fail_blocker\n리포: proj\n가드: git_merge_guard\n명령: git merge main'
    );
  });

  test('drops a null command from the cause_detail', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptFailed({
      bead_id: 'UI-1',
      cause: 'loud_fail_blocker',
      repo: '/r/proj',
      cause_detail: { reason: 'git_merge_guard', command: null }
    });

    expect(messageOf(spawn.last())).toBe(
      '❌ beads worker · 실패 — UI-1\n사유: loud_fail_blocker\n리포: proj\n가드: git_merge_guard'
    );
  });

  test('sends the pr_wait event with the PR url', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, {
      spawnImpl: spawn.spawnImpl,
      resolveTitle: async () => '워커 알림'
    });

    await notifier.prWaitEntered({
      bead_id: 'UI-1',
      pr_url: 'https://github.com/o/r/pull/7',
      repo: '/r/proj'
    });

    expect(messageOf(spawn.last())).toBe(
      '📬 beads worker · PR 제출 — UI-1 워커 알림\nhttps://github.com/o/r/pull/7\n리포: proj'
    );
  });

  test('omits an unobserved PR url', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.prWaitEntered({
      bead_id: 'UI-1',
      pr_url: null,
      repo: '/r/proj'
    });

    expect(messageOf(spawn.last())).toBe(
      '📬 beads worker · PR 제출 — UI-1\n리포: proj'
    );
  });

  test('sends the merge event with the PR url', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, {
      spawnImpl: spawn.spawnImpl,
      resolveTitle: async () => '워커 알림'
    });

    await notifier.mergeCompleted({
      bead_id: 'UI-1',
      pr_url: 'https://github.com/o/r/pull/7',
      repo: '/r/proj'
    });

    expect(messageOf(spawn.last())).toBe(
      '✅ beads worker · 머지 완료 — UI-1 워커 알림\nhttps://github.com/o/r/pull/7\n리포: proj'
    );
  });

  test('omits an unknown PR url and repo from the merge message', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.mergeCompleted({
      bead_id: 'UI-1',
      pr_url: null,
      repo: null
    });

    expect(messageOf(spawn.last())).toBe('✅ beads worker · 머지 완료 — UI-1');
  });

  test('spawns the configured command argv without a shell', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(
      { enabled: true, cmd: ['/opt/bin/notify', '--to', 'ops'] },
      { spawnImpl: spawn.spawnImpl }
    );

    await notifier.attemptFailed({ bead_id: 'UI-1', cause: 'spawn_failed' });

    const call = spawn.last();
    expect(call.command).toBe('/opt/bin/notify');
    expect(call.args.slice(0, 2)).toEqual(['--to', 'ops']);
  });

  test('detaches and unrefs the child so nothing waits on it', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({ bead_id: 'UI-1' });

    const call = spawn.last();
    expect(call.options).toEqual({ stdio: 'ignore', detached: true });
    expect(call.child.unref).toHaveBeenCalledTimes(1);
  });
});

describe('worker/notify bead title lookup (UI-vb0t)', () => {
  test('reads the bead title for a launch the caller could not name', async () => {
    const spawn = makeFakeSpawn();
    const resolveTitle = vi.fn(async () => '조회된 제목');
    const notifier = makeNotifier(ENABLED, {
      spawnImpl: spawn.spawnImpl,
      resolveTitle
    });

    await notifier.attemptStarted({ bead_id: 'UI-1', kind: 'resume' });

    expect(resolveTitle).toHaveBeenCalledWith('UI-1');
    expect(messageOf(spawn.last())).toBe(
      '🚀 beads worker · 재개 — UI-1 조회된 제목'
    );
  });

  test('skips the lookup when the caller already supplied a title', async () => {
    const spawn = makeFakeSpawn();
    const resolveTitle = vi.fn(async () => '조회된 제목');
    const notifier = makeNotifier(ENABLED, {
      spawnImpl: spawn.spawnImpl,
      resolveTitle
    });

    await notifier.attemptStarted({ bead_id: 'UI-1', title: '주어진 제목' });

    expect(resolveTitle).not.toHaveBeenCalled();
    expect(messageOf(spawn.last())).toBe(
      '🚀 beads worker · 시작 — UI-1 주어진 제목'
    );
  });

  test('sends an id-only headline when the lookup finds nothing', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, {
      spawnImpl: spawn.spawnImpl,
      resolveTitle: async () => null
    });

    await notifier.mergeCompleted({ bead_id: 'UI-1' });

    expect(messageOf(spawn.last())).toBe('✅ beads worker · 머지 완료 — UI-1');
  });

  test('still sends when the lookup rejects', async () => {
    const spawn = makeFakeSpawn();
    const log = vi.fn();
    const notifier = makeNotifier(ENABLED, {
      spawnImpl: spawn.spawnImpl,
      resolveTitle: async () => {
        throw new Error('bd exploded');
      },
      log
    });

    await notifier.mergeCompleted({ bead_id: 'UI-1' });

    expect(messageOf(spawn.last())).toBe('✅ beads worker · 머지 완료 — UI-1');
    expect(log).toHaveBeenCalled();
  });

  test('sends without a title when no lookup was injected', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.prWaitEntered({ bead_id: 'UI-1' });

    expect(messageOf(spawn.last())).toBe('📬 beads worker · PR 제출 — UI-1');
  });
});

describe('worker/notify fail-quiet', () => {
  test('sends nothing when the section is absent', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(undefined, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({ bead_id: 'UI-1' });
    await notifier.attemptFailed({ bead_id: 'UI-1', cause: 'spawn_failed' });
    await notifier.prWaitEntered({ bead_id: 'UI-1' });
    await notifier.mergeCompleted({ bead_id: 'UI-1' });

    expect(spawn.calls).toHaveLength(0);
  });

  test('sends nothing when disabled', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(
      { enabled: false, cmd: ['discord'] },
      { spawnImpl: spawn.spawnImpl }
    );

    await notifier.attemptStarted({ bead_id: 'UI-1' });

    expect(spawn.calls).toHaveLength(0);
  });

  test('sends nothing when the configured cmd is empty', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(
      { enabled: true, cmd: [] },
      { spawnImpl: spawn.spawnImpl }
    );

    await notifier.attemptStarted({ bead_id: 'UI-1' });

    expect(spawn.calls).toHaveLength(0);
  });

  test('swallows a config read that throws', async () => {
    const notifier = createNotifier({
      getConfig: () => {
        throw new Error('config exploded');
      },
      spawnImpl: () => {
        throw new Error('must not spawn');
      },
      log: () => {}
    });

    await expect(
      notifier.attemptStarted({ bead_id: 'UI-1' })
    ).resolves.toBeUndefined();
  });

  test('swallows a spawn that throws synchronously', async () => {
    const log = vi.fn();
    const notifier = makeNotifier(ENABLED, {
      spawnImpl: () => {
        throw new Error('EACCES');
      },
      log
    });

    await expect(
      notifier.attemptFailed({ bead_id: 'UI-1', cause: 'spawn_failed' })
    ).resolves.toBeUndefined();
    expect(log).toHaveBeenCalled();
  });

  test('swallows the async error event a missing CLI emits', async () => {
    const spawn = makeFakeSpawn();
    const log = vi.fn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl, log });

    await notifier.attemptStarted({ bead_id: 'UI-1' });

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
