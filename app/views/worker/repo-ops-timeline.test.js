import { render } from 'lit-html';
import { describe, expect, test } from 'vitest';
import {
  createRepoOpsDrawer,
  repoOpsTimelineTemplate,
  timelineEvents,
  timelineView
} from './repo-ops-timeline.js';

/**
 * @param {Record<string, any>} [patch]
 */
function operation(patch = {}) {
  return {
    operation_id: 'op-1',
    kind: 'deploy',
    state: 'succeeded',
    target_base: 'main',
    target_sha: 'c'.repeat(40),
    requested_at: 100,
    finished_at: 200,
    ...patch
  };
}

/**
 * @param {Record<string, any>} [patch]
 */
function cleanup(patch = {}) {
  return {
    bead_id: 'UI-a',
    step: 'child_sweep',
    reason: 'x',
    at: 300,
    ...patch
  };
}

describe('timelineEvents', () => {
  test('merges operations and cleanups into one newest-first list', () => {
    const events = timelineEvents([operation()], [cleanup()]);

    expect(events.map((event) => event.type)).toEqual(['cleanup', 'operation']);
  });

  test('sorts an operation by its finish time', () => {
    const events = timelineEvents(
      [operation({ operation_id: 'old', finished_at: 10 }), operation()],
      []
    );

    expect(events.map((event) => event.id)).toEqual(['op-1', 'old']);
  });

  test('falls back to the request time when nothing finished', () => {
    const events = timelineEvents([operation({ finished_at: null })], []);

    expect(events[0].at).toBe(100);
  });

  test('sorts an event with no time to the oldest end', () => {
    const events = timelineEvents(
      [
        operation({
          operation_id: 'timeless',
          finished_at: null,
          requested_at: null
        }),
        operation({ operation_id: 'timed', finished_at: 5 })
      ],
      []
    );

    expect(events.map((event) => event.id)).toEqual(['timed', 'timeless']);
  });

  test('orders two timeless events by id so the list is stable', () => {
    const events = timelineEvents(
      [
        operation({ operation_id: 'b', finished_at: null, requested_at: null }),
        operation({ operation_id: 'a', finished_at: null, requested_at: null })
      ],
      []
    );

    expect(events.map((event) => event.id)).toEqual(['a', 'b']);
  });

  test('caps the list at twenty events', () => {
    const events = timelineEvents(
      Array.from({ length: 30 }, (_unused, index) =>
        operation({ operation_id: `op-${index}`, finished_at: index })
      ),
      []
    );

    expect(events).toHaveLength(20);
  });

  test('keeps the newest events when it caps', () => {
    const events = timelineEvents(
      Array.from({ length: 25 }, (_unused, index) =>
        operation({ operation_id: `op-${index}`, finished_at: index })
      ),
      []
    );

    expect(events[0].id).toBe('op-24');
  });

  test('renders nothing from absent projections', () => {
    expect(timelineEvents(undefined, null)).toEqual([]);
  });

  test('skips a malformed row rather than throwing', () => {
    const events = timelineEvents([null, operation()], [undefined]);

    expect(events).toHaveLength(1);
  });

  test('renders retry pending as 재시도 중', () => {
    const mount = document.createElement('div');
    const events = timelineEvents(
      [operation({ state: 'retry_pending', finished_at: null })],
      []
    );

    render(repoOpsTimelineTemplate({ events, repo: '/repo' }), mount);

    expect(mount.querySelector('.worker-ev__st')?.textContent).toBe(
      '재시도 중'
    );
  });

  test('never offers a resolve entry on a stopped cleanup row', () => {
    const mount = document.createElement('div');
    const events = timelineEvents([], [cleanup()]);

    render(repoOpsTimelineTemplate({ events, repo: '/repo' }), mount);

    expect(mount.querySelector('.worker-cleanup__resume')).not.toBeNull();
    expect(mount.querySelector('.worker-repo-op__resolve')).toBeNull();
  });
});

describe('timelineView (UI-lsti §5)', () => {
  /**
   * @param {number} count
   * @param {Record<string, any>} [patch]
   */
  function succeeded(count, patch = {}) {
    return Array.from({ length: count }, (_unused, index) =>
      operation({ operation_id: `op-${index}`, finished_at: index, ...patch })
    );
  }

  test('shows only the five newest events by default', () => {
    const view = timelineView(succeeded(8), [], { expanded: false });

    expect(view.visible.map((event) => event.id)).toEqual([
      'op-7',
      'op-6',
      'op-5',
      'op-4',
      'op-3'
    ]);
  });

  test('counts everything it folded away', () => {
    const view = timelineView(succeeded(8), [], { expanded: false });

    expect(view.hidden).toBe(3);
  });

  test('keeps an unresolved row visible however old it is', () => {
    const operations = succeeded(25);
    operations[0] = operation({
      operation_id: 'op-0',
      finished_at: 0,
      state: 'failed'
    });

    const view = timelineView(operations, [], { expanded: false });

    expect(view.visible.map((event) => event.id)).toContain('op-0');
    expect(view.visible).toHaveLength(6);
  });

  test('keeps that unresolved row visible when expanded too', () => {
    const operations = succeeded(25);
    operations[0] = operation({
      operation_id: 'op-0',
      finished_at: 0,
      state: 'failed'
    });

    const view = timelineView(operations, [], { expanded: true });

    expect(view.visible.map((event) => event.id)).toContain('op-0');
    expect(view.visible).toHaveLength(21);
    expect(view.hidden).toBe(4);
  });

  test('opens the timeline to twenty events when expanded', () => {
    const view = timelineView(succeeded(30), [], { expanded: true });

    expect(view.visible).toHaveLength(20);
    expect(view.hidden).toBe(10);
  });

  test('hides nothing when everything already fits expanded', () => {
    const view = timelineView(succeeded(8), [], { expanded: true });

    expect(view.hidden).toBe(0);
  });

  test('always shows a stopped cleanup', () => {
    const view = timelineView(succeeded(10), [cleanup({ at: 0 })], {
      expanded: false
    });

    expect(view.visible.map((event) => event.type)).toContain('cleanup');
  });

  test('does not treat a dismissed failure as unresolved', () => {
    const operations = succeeded(10);
    operations[0] = operation({
      operation_id: 'op-0',
      finished_at: 0,
      state: 'failed',
      dismissed: true
    });

    const view = timelineView(operations, [], { expanded: false });

    expect(view.visible.map((event) => event.id)).not.toContain('op-0');
  });

  test('does not treat a superseded failure as unresolved', () => {
    const operations = succeeded(10);
    operations[0] = operation({
      operation_id: 'op-0',
      finished_at: 0,
      state: 'failed',
      superseded_by: 'op-9'
    });

    const view = timelineView(operations, [], { expanded: false });

    expect(view.visible.map((event) => event.id)).not.toContain('op-0');
  });

  test('keeps a still-running operation visible', () => {
    const operations = succeeded(10);
    operations[0] = operation({
      operation_id: 'op-0',
      finished_at: 0,
      state: 'running'
    });

    const view = timelineView(operations, [], { expanded: false });

    expect(view.visible.map((event) => event.id)).toContain('op-0');
  });
});

describe('timeline more-button (UI-lsti §5)', () => {
  test('offers the fold-out with the hidden count', () => {
    const mount = document.createElement('div');
    const view = timelineView(
      Array.from({ length: 8 }, (_unused, index) =>
        operation({ operation_id: `op-${index}`, finished_at: index })
      ),
      [],
      { expanded: false }
    );

    render(
      repoOpsTimelineTemplate({
        events: view.visible,
        hidden: view.hidden,
        expanded: false,
        repo: '/repo'
      }),
      mount
    );

    expect(
      mount.querySelector('[data-seam="repo-ops-more"]')?.textContent?.trim()
    ).toBe('이전 3개 더 보기');
  });

  test('offers a fold-back once expanded', () => {
    const mount = document.createElement('div');

    render(
      repoOpsTimelineTemplate({
        events: [],
        hidden: 0,
        expanded: true,
        repo: '/repo'
      }),
      mount
    );

    expect(
      mount.querySelector('[data-seam="repo-ops-more"]')?.textContent?.trim()
    ).toBe('접기');
  });

  test('omits the button when nothing is folded away', () => {
    const mount = document.createElement('div');
    const view = timelineView([operation()], [], { expanded: false });

    render(
      repoOpsTimelineTemplate({
        events: view.visible,
        hidden: view.hidden,
        expanded: false,
        repo: '/repo'
      }),
      mount
    );

    expect(mount.querySelector('[data-seam="repo-ops-more"]')).toBeNull();
  });
});

describe('timeline drawer expansion (UI-lsti §5)', () => {
  /**
   * @param {number} count
   */
  function manyOperations(count) {
    return Array.from({ length: count }, (_unused, index) =>
      operation({ operation_id: `op-${index}`, finished_at: index })
    );
  }

  test('opens collapsed', () => {
    const mount = document.createElement('div');
    const drawer = createRepoOpsDrawer(mount);

    drawer.open({ operations: manyOperations(8), cleanup_failures: [] });

    expect(mount.querySelectorAll('.worker-ev')).toHaveLength(5);
  });

  test('expands on the more click', () => {
    const mount = document.createElement('div');
    const drawer = createRepoOpsDrawer(mount);
    drawer.open({ operations: manyOperations(8), cleanup_failures: [] });

    /** @type {HTMLElement} */ (
      mount.querySelector('[data-seam="repo-ops-more"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelectorAll('.worker-ev')).toHaveLength(8);
  });

  test('caps an expanded timeline at twenty rows', () => {
    const mount = document.createElement('div');
    const drawer = createRepoOpsDrawer(mount);
    drawer.open({ operations: manyOperations(30), cleanup_failures: [] });

    /** @type {HTMLElement} */ (
      mount.querySelector('[data-seam="repo-ops-more"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelectorAll('.worker-ev')).toHaveLength(20);
  });

  test('keeps the expansion through a snapshot refresh', () => {
    const mount = document.createElement('div');
    const drawer = createRepoOpsDrawer(mount);
    drawer.open({ operations: manyOperations(8), cleanup_failures: [] });
    /** @type {HTMLElement} */ (
      mount.querySelector('[data-seam="repo-ops-more"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    drawer.refresh({ operations: manyOperations(9), cleanup_failures: [] });

    expect(mount.querySelectorAll('.worker-ev')).toHaveLength(9);
  });

  test('opens collapsed again after a close', () => {
    const mount = document.createElement('div');
    const drawer = createRepoOpsDrawer(mount);
    drawer.open({ operations: manyOperations(8), cleanup_failures: [] });
    /** @type {HTMLElement} */ (
      mount.querySelector('[data-seam="repo-ops-more"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    drawer.close();

    drawer.open({ operations: manyOperations(8), cleanup_failures: [] });

    expect(mount.querySelectorAll('.worker-ev')).toHaveLength(5);
  });
});

describe('operation card 종료 원인 · 재시도 결과 (UI-s582 §2)', () => {
  /**
   * A `repo_operations[]` card in the SERVER's projected shape
   * (`projectRepoOperations`, server/ws/worker-handlers.js). The renderer reads
   * the projection and nothing else, so the fixture copies it key for key.
   *
   * @param {Record<string, any>} [patch]
   */
  function projected(patch = {}) {
    return {
      operation_id: 'op-1',
      kind: 'deploy',
      repo_id: '/repo',
      target_base: 'main',
      target_sha: 'c'.repeat(40),
      target_tree: 'd'.repeat(40),
      effective_base_sha: 'b'.repeat(40),
      script_path: 'repo-ops/script/deploy',
      script_blob_sha: 'e'.repeat(40),
      script_mode: '100755',
      state: 'failed',
      requested_at: 1000,
      started_at: 1100,
      finished_at: 43_100,
      elapsed_ms: 42_000,
      exit_code: 1,
      signal: null,
      log_path: '/logs/op-1.log',
      log_digest: 'a'.repeat(64),
      output_tail: 'deploy exited with 1',
      subjects: [],
      failure: {
        code: 'script_failed',
        fingerprint: 'f'.repeat(64),
        detail: '',
        interrupted: false
      },
      failure_kind: 'deploy_script_failure',
      verify_stage: null,
      retry: {
        status: 'not_applicable',
        first_fingerprint: 'f'.repeat(64),
        blocked_reason: null,
        absorbed: null
      },
      superseded_by: null,
      dismissed: null,
      ...patch
    };
  }

  /**
   * @param {Record<string, any>} operation_card
   * @returns {string[]}
   */
  function whyLines(operation_card) {
    const mount = document.createElement('div');
    const view = timelineView([operation_card], [], { expanded: false });

    render(
      repoOpsTimelineTemplate({
        events: view.visible,
        hidden: view.hidden,
        expanded: false,
        repo: '/repo'
      }),
      mount
    );

    return Array.from(mount.querySelectorAll('.worker-ev__why-line'), (node) =>
      (node.textContent || '').trim()
    );
  }

  test('renders the exit code and the retry outcome as two lines', () => {
    expect(whyLines(projected())).toEqual([
      'exit 1 · 42.0초',
      '재시도 대상 아님 — 스크립트 실행 전 실패'
    ]);
  });

  test('renders the signal when the process was killed', () => {
    expect(
      whyLines(
        projected({ exit_code: null, signal: 'SIGKILL', elapsed_ms: 190_000 })
      )[0]
    ).toBe('signal SIGKILL · 3분 10초');
  });

  test('renders a timeout rather than the wrapper exit code', () => {
    expect(
      whyLines(
        projected({
          exit_code: 124,
          failure: {
            code: 'timeout',
            fingerprint: 'f'.repeat(64),
            detail: '',
            interrupted: false
          }
        })
      )[0]
    ).toBe('타임아웃 초과');
  });

  test('renders an interruption rather than a stale exit code', () => {
    expect(
      whyLines(
        projected({
          failure: {
            code: 'interrupted',
            fingerprint: 'f'.repeat(64),
            detail: 'marker_missing',
            interrupted: true
          },
          failure_kind: 'interrupted_without_terminal_exit'
        })
      )[0]
    ).toBe('종료 기록 없음 — 중단됨');
  });

  test('omits the termination line for a declaration-stage failure', () => {
    expect(
      whyLines(
        projected({
          exit_code: null,
          failure: {
            code: 'repo_ops_worktree_unowned',
            fingerprint: 'f'.repeat(64),
            detail: '',
            interrupted: false
          },
          failure_kind: 'repo_ops_worktree_unowned'
        })
      )
    ).toEqual(['재시도 대상 아님 — 스크립트 실행 전 실패']);
  });

  test('renders the block reason ahead of any fingerprint comparison', () => {
    expect(
      whyLines(
        projected({
          retry: {
            status: 'not_applicable',
            first_fingerprint: 'a'.repeat(64),
            blocked_reason: 'schema_unsupported',
            absorbed: null
          }
        })
      )[1]
    ).toBe('자동 재시도 못 함 — 핀된 정책 스키마를 지원하지 않습니다.');
  });

  test('renders a consumed retry that hit the same failure', () => {
    expect(
      whyLines(
        projected({
          retry: {
            status: 'consumed',
            first_fingerprint: 'f'.repeat(64),
            blocked_reason: null,
            absorbed: null
          }
        })
      )[1]
    ).toBe('자동 재시도 1회 — 같은 실패');
  });

  test('renders a consumed retry that hit a different failure', () => {
    expect(
      whyLines(
        projected({
          retry: {
            status: 'consumed',
            first_fingerprint: 'a'.repeat(64),
            blocked_reason: null,
            absorbed: null
          }
        })
      )[1]
    ).toBe('자동 재시도 1회 — 다른 실패');
  });

  test('renders the absorbed first failure on the succeeded card', () => {
    expect(
      whyLines(
        projected({
          state: 'succeeded',
          exit_code: 0,
          failure: null,
          failure_kind: null,
          output_tail: '',
          retry: {
            status: 'absorbed',
            first_fingerprint: 'a'.repeat(64),
            blocked_reason: null,
            absorbed: {
              first_failure: {
                code: 'deploy_script_failure',
                fingerprint: 'a'.repeat(64),
                detail: '',
                interrupted: false
              },
              first_fingerprint: 'a'.repeat(64),
              at: 40_000
            }
          }
        })
      )
    ).toEqual([
      '자동 재시도로 해소됨 — 첫 실패: 배포 실패 — 배포 스크립트가 실패했습니다.'
    ]);
  });

  test('leaves a plain success with no derived lines at all', () => {
    expect(
      whyLines(
        projected({
          state: 'succeeded',
          exit_code: 0,
          failure: null,
          failure_kind: null,
          output_tail: '',
          retry: {
            status: 'not_applicable',
            first_fingerprint: null,
            blocked_reason: null,
            absorbed: null
          }
        })
      )
    ).toEqual([]);
  });
});
