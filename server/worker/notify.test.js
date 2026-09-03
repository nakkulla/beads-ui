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
      '🤖 🚀 시작 — UI-1 워커 알림\n리포: beads-ui\n실행: opus / high'
    ]);
  });

  test('names the runner ahead of the model on the exec line', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({
      bead_id: 'UI-1',
      title: '워커 알림',
      runner: 'codex',
      model: 'sol',
      effort: 'high',
      speed: 'fast',
      repo: '/r/proj',
      kind: 'dispatch'
    });

    expect(messageOf(spawn.last())).toBe(
      '🤖 🚀 시작 — UI-1 워커 알림\n리포: proj\n실행: codex sol / high / fast'
    );
  });

  test('names the runner alone when no model or effort resolved', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({
      bead_id: 'UI-1',
      title: '워커 알림',
      runner: 'codex',
      repo: '/r/proj',
      kind: 'dispatch'
    });

    expect(messageOf(spawn.last())).toBe(
      '🤖 🚀 시작 — UI-1 워커 알림\n리포: proj\n실행: codex'
    );
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
      '🤖 🚀 재개 — UI-1 워커 알림\n리포: proj'
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
      '🤖 🚀 충돌 해결 — UI-1 워커 알림\n리포: proj'
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

    expect(messageOf(spawn.last())).toBe('🤖 🚀 시작 — UI-1\n리포: proj');
  });

  test('truncates a bead title that would eat the preview budget', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({ bead_id: 'UI-1', title: '가'.repeat(61) });

    expect(messageOf(spawn.last())).toBe(
      `🤖 🚀 시작 — UI-1 ${'가'.repeat(60)}…`
    );
  });

  test('truncates on code points so a surrogate pair is never split', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({ bead_id: 'UI-1', title: '🚀'.repeat(61) });

    expect(messageOf(spawn.last())).toBe(
      `🤖 🚀 시작 — UI-1 ${'🚀'.repeat(60)}…`
    );
  });

  test('keeps an emoji title within the limit untouched', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({ bead_id: 'UI-1', title: '🚀'.repeat(60) });

    expect(messageOf(spawn.last())).toBe(
      `🤖 🚀 시작 — UI-1 ${'🚀'.repeat(60)}`
    );
  });

  test('keeps a bead title exactly at the limit intact', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.attemptStarted({ bead_id: 'UI-1', title: '가'.repeat(60) });

    expect(messageOf(spawn.last())).toBe(
      `🤖 🚀 시작 — UI-1 ${'가'.repeat(60)}`
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
      '🤖 ❌ 실패 — UI-1 워커 알림\n사유: session_failed:result_count\n리포: proj'
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
      '🤖 ❌ 실패 — UI-1\n사유: loud_fail_blocker\n리포: proj\n가드: git_merge_guard\n명령: git merge main'
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
      '🤖 ❌ 실패 — UI-1\n사유: loud_fail_blocker\n리포: proj\n가드: git_merge_guard'
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
      '🤖 📬 PR 제출 — UI-1 워커 알림\nhttps://github.com/o/r/pull/7\n리포: proj'
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

    expect(messageOf(spawn.last())).toBe('🤖 📬 PR 제출 — UI-1\n리포: proj');
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
      '🤖 ✅ 머지 완료 — UI-1 워커 알림\nhttps://github.com/o/r/pull/7\n리포: proj'
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

    expect(messageOf(spawn.last())).toBe('🤖 ✅ 머지 완료 — UI-1');
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
    expect(messageOf(spawn.last())).toBe('🤖 🚀 재개 — UI-1 조회된 제목');
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
    expect(messageOf(spawn.last())).toBe('🤖 🚀 시작 — UI-1 주어진 제목');
  });

  test('sends an id-only headline when the lookup finds nothing', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, {
      spawnImpl: spawn.spawnImpl,
      resolveTitle: async () => null
    });

    await notifier.mergeCompleted({ bead_id: 'UI-1' });

    expect(messageOf(spawn.last())).toBe('🤖 ✅ 머지 완료 — UI-1');
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

    expect(messageOf(spawn.last())).toBe('🤖 ✅ 머지 완료 — UI-1');
    expect(log).toHaveBeenCalled();
  });

  test('reads no title when notifications are off', async () => {
    const spawn = makeFakeSpawn();
    const resolveTitle = vi.fn(async () => '조회된 제목');
    const notifier = makeNotifier(
      { enabled: false, cmd: ['discord'] },
      { spawnImpl: spawn.spawnImpl, resolveTitle }
    );

    await notifier.attemptStarted({ bead_id: 'UI-1', kind: 'resume' });
    await notifier.attemptFailed({ bead_id: 'UI-1', cause: 'verify_failed' });
    await notifier.prWaitEntered({ bead_id: 'UI-1' });
    await notifier.mergeCompleted({ bead_id: 'UI-1' });

    // A disabled notifier is a pure no-op: it must not spend a `bd show` — nor,
    // on the awaited merge path, make the cleanup wait for one.
    expect(resolveTitle).not.toHaveBeenCalled();
    expect(spawn.calls).toHaveLength(0);
  });

  test('sends without a title when no lookup was injected', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.prWaitEntered({ bead_id: 'UI-1' });

    expect(messageOf(spawn.last())).toBe('🤖 📬 PR 제출 — UI-1');
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

describe('worker/notify awaiting_user transition (UI-7uid §3.5)', () => {
  test('names the launched inquiry session, its tmux window and the bridge', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.awaitingUser({
      bead_id: 'UI-7uid',
      title: '방향 질의 트리거',
      awaiting_user: 'spec_review_stale:revise',
      stale_kind: 'adr_conflict',
      session: 'launched',
      tmux_session: 'bdui-inquiry',
      tmux_window: 'UI-7uid',
      bridge_active: true,
      repo: '/Users/me/GitHub/beads-ui'
    });

    expect(messageOf(spawn.last())).toBe(
      [
        '🤖 ⏸️ 방향 질의 — UI-7uid 방향 질의 트리거',
        '파킹: spec_review_stale:revise (adr_conflict)',
        '질의 세션: 기동 — tmux bdui-inquiry:UI-7uid',
        '브리지: 활성',
        '리포: beads-ui'
      ].join('\n')
    );
  });

  test('reports an inquiry session that was already running', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.awaitingUser({
      bead_id: 'UI-7uid',
      title: '방향 질의 트리거',
      awaiting_user: 'plan_approval_stale:revise',
      stale_kind: 'intent_conflict',
      session: 'already_running',
      bridge_active: false,
      repo: '/r/beads-ui'
    });

    expect(messageOf(spawn.last())).toBe(
      [
        '🤖 ⏸️ 방향 질의 — UI-7uid 방향 질의 트리거',
        '파킹: plan_approval_stale:revise (intent_conflict)',
        '질의 세션: 이미 실행 중',
        '브리지: 비활성 — 질문은 tmux에서 직접 답',
        '리포: beads-ui'
      ].join('\n')
    );
  });

  test('points at the click disposition when no session was launched', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.awaitingUser({
      bead_id: 'UI-7uid',
      title: '방향 질의 트리거',
      awaiting_user: 'spec_review_stale:revise',
      stale_kind: null,
      session: 'not_launched',
      reason: 'stale_kind_missing',
      bridge_active: true,
      repo: '/r/beads-ui'
    });

    expect(messageOf(spawn.last())).toBe(
      [
        '🤖 ⏸️ 방향 질의 — UI-7uid 방향 질의 트리거',
        '파킹: spec_review_stale:revise',
        '질의 세션: 미기동 — stale_kind_missing',
        '처분: Worker 탭 fix/approve',
        '브리지: 활성',
        '리포: beads-ui'
      ].join('\n')
    );
  });

  test('sends nothing when notifications are off', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(
      { enabled: false, cmd: ['discord'] },
      { spawnImpl: spawn.spawnImpl }
    );

    await notifier.awaitingUser({
      bead_id: 'UI-7uid',
      awaiting_user: 'spec_review_stale:revise',
      session: 'launched',
      tmux_session: 'bdui-inquiry',
      tmux_window: 'UI-7uid'
    });

    expect(spawn.calls).toHaveLength(0);
  });

  test('swallows a spawn that throws', async () => {
    const log = vi.fn();
    const notifier = makeNotifier(ENABLED, {
      spawnImpl: () => {
        throw new Error('EACCES');
      },
      log
    });

    await expect(
      notifier.awaitingUser({
        bead_id: 'UI-7uid',
        awaiting_user: 'spec_review_stale:revise',
        session: 'already_running'
      })
    ).resolves.toBeUndefined();
    expect(log).toHaveBeenCalled();
  });
});

describe('worker/notify needs_human transition', () => {
  test('sends the class, cause, next action, PR and repo in one body', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.needsHuman({
      bead_id: 'UI-1',
      title: '워커 알림',
      failure_class: '배포 실패',
      reason: 'cleanup_failed:script_failed',
      reason_detail: 'deploy exited 2',
      next_action: '[정리 재시도] 또는 [세션에서 해결]',
      pr_url: 'https://github.com/o/r/pull/7',
      repo: '/Users/me/GitHub/beads-ui'
    });

    expect(messageOf(spawn.last())).toBe(
      [
        '🤖 🚨 사람 필요 — UI-1 워커 알림',
        '클래스: 배포 실패',
        '사유: cleanup_failed:script_failed — deploy exited 2',
        '다음: [정리 재시도] 또는 [세션에서 해결]',
        'https://github.com/o/r/pull/7',
        '리포: beads-ui'
      ].join('\n')
    );
  });

  test('drops the absent fields instead of printing them empty', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.needsHuman({
      bead_id: 'UI-2',
      failure_class: '폐기 실패',
      reason: 'attempt_settling'
    });

    expect(messageOf(spawn.last())).toBe(
      '🤖 🚨 사람 필요 — UI-2\n클래스: 폐기 실패\n사유: attempt_settling'
    );
  });

  test('quotes only the first line of a multi-line cause tail', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.needsHuman({
      bead_id: 'UI-3',
      failure_class: '정리 중단',
      reason: 'verify_cmd_failed',
      reason_detail: 'FAIL server/x.test.js\n  expected 1\n  received 2'
    });

    expect(messageOf(spawn.last())).toContain(
      '사유: verify_cmd_failed — FAIL server/x.test.js'
    );
    expect(messageOf(spawn.last())).not.toContain('received 2');
  });

  test('spawns nothing and reads no title when notifications are off', async () => {
    const spawn = makeFakeSpawn();
    const resolveTitle = vi.fn(async () => '조회된 제목');
    const notifier = makeNotifier(
      { enabled: false, cmd: ['discord'] },
      { spawnImpl: spawn.spawnImpl, resolveTitle }
    );

    await notifier.needsHuman({
      bead_id: 'UI-4',
      failure_class: '수동 배포 실패',
      reason: 'script_failed'
    });

    expect(spawn.calls).toHaveLength(0);
    expect(resolveTitle).not.toHaveBeenCalled();
  });

  test('resolves after a spawn that throws', async () => {
    const log = vi.fn();
    const notifier = makeNotifier(ENABLED, {
      spawnImpl: () => {
        throw new Error('EACCES');
      },
      log
    });

    await expect(
      notifier.needsHuman({
        bead_id: 'UI-5',
        failure_class: '폐기 실패',
        reason: 'attempt_settling'
      })
    ).resolves.toBeUndefined();
    expect(log).toHaveBeenCalled();
  });
});

describe('worker/notify provider transitions', () => {
  test('sends provider hold details and reset time', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.providerHoldEntered({
      bead_id: 'UI-1',
      runner: 'claude',
      kind: 'usage_limit',
      detail: 'usage_limit',
      summary: 'session limit reached',
      account: 'held@example.com',
      resets_at: Date.parse('2026-09-03T09:00:00Z'),
      repo: '/r/proj'
    });

    expect(messageOf(spawn.last())).toContain(
      '공급자: claude / usage_limit / usage_limit'
    );
    expect(messageOf(spawn.last())).toContain('계정: held@example.com');
    expect(messageOf(spawn.last())).toContain('리셋: 2026-09-03T09:00:00.000Z');
  });

  test('names why a limit hold did not switch accounts', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.providerHoldEntered({
      bead_id: 'UI-1',
      runner: 'claude',
      kind: 'usage_limit',
      detail: 'usage_limit',
      summary: 'session limit reached',
      account: 'held@example.com',
      auto_switch: 'disabled'
    });

    expect(messageOf(spawn.last())).toContain(
      '계정 전환: 안 함 — 자동 전환 꺼짐'
    );
  });

  test('omits the switch reason when the cap already reports it', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.providerHoldEntered({
      bead_id: 'UI-1',
      runner: 'claude',
      kind: 'usage_limit',
      detail: 'usage_limit',
      summary: 'session limit reached',
      account: 'held@example.com',
      auto_switch: 'cap'
    });

    expect(messageOf(spawn.last())).not.toContain('계정 전환:');
  });

  test('sends recovered beads and a resume refusal', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.providerRecovered({
      bead_id: 'UI-1',
      runner: 'claude',
      duration_ms: 61_000,
      resumed_beads: ['UI-1'],
      refusal: 'UI-2:worktree_missing'
    });

    expect(messageOf(spawn.last())).toContain('보류: 61초');
    expect(messageOf(spawn.last())).toContain('자동 재개: UI-1');
    expect(messageOf(spawn.last())).toContain(
      '재개 거부: UI-2:worktree_missing'
    );
  });

  test('points a disarmed provider hold at manual resume', async () => {
    const spawn = makeFakeSpawn();
    const notifier = makeNotifier(ENABLED, { spawnImpl: spawn.spawnImpl });

    await notifier.providerAutoResumeDisarmed({
      bead_id: 'UI-1',
      runner: 'claude',
      reason: 'auto_resume_cap'
    });

    expect(messageOf(spawn.last())).toContain('사유: auto_resume_cap');
    expect(messageOf(spawn.last())).toContain('다음: 수동 재개 필요');
  });
});
