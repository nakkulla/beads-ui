import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { buildSections, createMonitorView } from './index.js';

const NOW = 1_700_000_000_000;
const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/**
 * One workspace entry of the aggregated payload.
 *
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function workspace(patch = {}) {
  return {
    root_dir: WS_A,
    name: 'repo-a',
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    pr_observations: {},
    bead_titles: {},
    ...patch
  };
}

/**
 * @param {{ workspaces?: any[], now?: () => number, current?: string, switchWorkspace?: (root: string) => Promise<unknown> }} [input]
 */
function setup(input = {}) {
  document.body.innerHTML = '<div id="m"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const pipelineStore = {
    get() {
      return input.workspaces || null;
    },
    subscribe() {
      return () => {};
    }
  };
  const gotoIssue = vi.fn();
  const switchWorkspace =
    input.switchWorkspace || vi.fn(() => Promise.resolve(null));
  const view = createMonitorView(mount, {
    gotoIssue,
    pipelineStore: /** @type {any} */ (pipelineStore),
    getWorkspacePath: () => input.current || WS_A,
    switchWorkspace,
    now: input.now || (() => NOW)
  });
  return { mount, view, gotoIssue, switchWorkspace };
}

/**
 * @param {HTMLElement} mount
 * @param {string} lane
 * @returns {string[]}
 */
function idsIn(mount, lane) {
  return Array.from(mount.querySelectorAll(`#monitor-${lane} .mon-row`)).map(
    (row) => row.getAttribute('data-issue-id') || ''
  );
}

describe('views/monitor lane grouping (UI-nprg)', () => {
  test('groups each bead into its pipeline stage section', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-wait', added_at: NOW }],
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          done: [{ bead_id: 'A-done', added_at: NOW }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'running',
              started_at: NOW - 1_000
            }
          }
        })
      ]
    });

    view.load();

    expect(idsIn(mount, 'running')).toEqual(['A-run']);
    expect(idsIn(mount, 'pr_wait')).toEqual(['A-pr']);
    expect(idsIn(mount, 'queue')).toEqual(['A-wait']);
    expect(idsIn(mount, 'done')).toEqual(['A-done']);
  });

  test('hides a section with no rows', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-wait', added_at: NOW }] })]
    });

    view.load();

    expect(mount.querySelector('#monitor-queue')).not.toBe(null);
    expect(mount.querySelector('#monitor-running')).toBe(null);
    expect(mount.querySelector('#monitor-done')).toBe(null);
  });

  test('renders one empty line when the whole pipeline is idle', () => {
    const { mount, view } = setup({ workspaces: [] });

    view.load();

    expect(mount.querySelector('.mon-group__empty')?.textContent).toContain(
      '진행 중인 워커 작업 없음'
    );
  });

  test('renders the empty line before any snapshot arrives', () => {
    const { mount, view } = setup({});

    view.load();

    expect(mount.querySelector('.mon-group__empty')).not.toBe(null);
  });
});

describe('views/monitor exclusive lane priority (UI-nprg)', () => {
  // 실행중인 버드는 `queue` 레인에 그대로 남아 있다 — 배타 우선순위가 없으면
  // 같은 버드가 실행중과 대기 두 섹션에 동시에 나타난다.
  test('keeps a running bead out of the waiting section it still sits in', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-run', added_at: NOW }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'running',
              started_at: NOW - 1_000
            }
          }
        })
      ]
    });

    view.load();

    expect(idsIn(mount, 'running')).toEqual(['A-run']);
    expect(mount.querySelector('#monitor-queue')).toBe(null);
  });

  test('shows a conflict-resolution bead only in the running section', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-pr',
              status: 'running',
              conflict_resolution: true,
              started_at: NOW - 1_000
            }
          }
        })
      ]
    });

    view.load();

    expect(idsIn(mount, 'running')).toEqual(['A-pr']);
    expect(mount.querySelector('#monitor-pr_wait')).toBe(null);
  });
});

describe('views/monitor ordering (UI-nprg)', () => {
  test('orders running rows by last_event_at descending', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-quiet',
              status: 'running',
              last_event_at: NOW - 90_000
            },
            a2: {
              attempt_id: 'a2',
              bead_id: 'A-live',
              status: 'running',
              last_event_at: NOW - 1_000
            }
          }
        })
      ]
    });

    view.load();

    expect(idsIn(mount, 'running')).toEqual(['A-live', 'A-quiet']);
  });

  test('orders done rows by completion time descending across repos', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({ done: [{ bead_id: 'A-old', added_at: NOW - 60_000 }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          done: [{ bead_id: 'B-new', added_at: NOW - 1_000 }]
        })
      ]
    });

    view.load();

    expect(idsIn(mount, 'done')).toEqual(['B-new', 'A-old']);
  });

  test('keeps the waiting lane in dispatch order with its lane positions', () => {
    const sections = buildSections([
      workspace({
        queue: [
          { bead_id: 'A-1', added_at: NOW },
          { bead_id: 'A-2', added_at: NOW }
        ]
      })
    ]);

    const waiting = sections.find((s) => s.lane === 'queue');
    expect(waiting?.items.map((i) => [i.id, i.queue_position])).toEqual([
      ['A-1', 1],
      ['A-2', 2]
    ]);
  });

  test('numbers a waiting bead by its lane position, not the rendered index', () => {
    const sections = buildSections([
      workspace({
        queue: [
          { bead_id: 'A-run', added_at: NOW },
          { bead_id: 'A-next', added_at: NOW }
        ],
        attempts: {
          a1: { attempt_id: 'a1', bead_id: 'A-run', status: 'running' }
        }
      })
    ]);

    const waiting = sections.find((s) => s.lane === 'queue');
    expect(waiting?.items.map((i) => [i.id, i.queue_position])).toEqual([
      ['A-next', 2]
    ]);
  });
});

describe('views/monitor row decoration (UI-nprg)', () => {
  test('renders the workspace badge on every row', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1', added_at: NOW }]
        })
      ]
    });

    view.load();

    const badges = Array.from(
      mount.querySelectorAll('#monitor-queue .mon-row__repo')
    ).map((el) => el.textContent?.trim());
    expect(badges).toEqual(['repo-a', 'repo-b']);
  });

  test('uses the decorated bead title and falls back to the id', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [
            { bead_id: 'A-1', added_at: NOW },
            { bead_id: 'A-2', added_at: NOW }
          ],
          bead_titles: { 'A-1': '제목 있음' }
        })
      ]
    });

    view.load();

    const titles = Array.from(
      mount.querySelectorAll('#monitor-queue .mon-row__title')
    ).map((el) => el.textContent?.trim());
    expect(titles).toEqual(['제목 있음', 'A-2']);
  });

  test('derives the PR number from the observations', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          pr_observations: { 'A-pr': { pr: { number: 91 } } }
        })
      ]
    });

    view.load();

    expect(
      mount.querySelector('#monitor-pr_wait .mon-row__pr')?.textContent
    ).toContain('#91');
  });

  test('marks an external PR row and renders it with no number', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW, external: true }]
        })
      ]
    });

    view.load();

    expect(
      mount.querySelector('#monitor-pr_wait .mon-row__chip')?.textContent
    ).toContain('외부 PR');
    expect(mount.querySelector('#monitor-pr_wait .mon-row__pr')).toBe(null);
  });

  test('derives the completion kind from the latest terminal attempt', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          done: [{ bead_id: 'A-done', added_at: NOW - 1_000 }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-done',
              status: 'done',
              finished_at: NOW - 2_000,
              done_kind: 'pr_stop'
            },
            a2: {
              attempt_id: 'a2',
              bead_id: 'A-done',
              status: 'done',
              finished_at: NOW - 1_000,
              done_kind: 'auto_merge'
            }
          }
        })
      ]
    });

    view.load();

    const kind = mount.querySelector('#monitor-done .mon-row__kind');
    expect(kind?.textContent?.trim()).toBe('자동 머지');
    expect(kind?.classList.contains('mon-row__kind--ok')).toBe(true);
  });

  test('omits the completion kind when no attempt matches', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({ done: [{ bead_id: 'A-done', added_at: NOW - 1_000 }] })
      ]
    });

    view.load();

    expect(mount.querySelector('#monitor-done .mon-row__kind')).toBe(null);
    expect(mount.querySelector('#monitor-done .mon-row__done-at')).not.toBe(
      null
    );
  });

  test('renders the live heartbeat of a running attempt', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'running',
              started_at: NOW - 65_000,
              last_event_at: NOW - 5_000,
              model: 'opus'
            }
          }
        })
      ]
    });

    view.load();

    const row = mount.querySelector('#monitor-running .mon-row');
    expect(row?.querySelector('.mon-row__elapsed')?.textContent?.trim()).toBe(
      '1m 05s'
    );
    expect(
      row
        ?.querySelector('.mon-row__beat')
        ?.classList.contains('mon-row__beat--live')
    ).toBe(true);
    expect(row?.querySelector('.mon-row__model')?.textContent?.trim()).toBe(
      'opus'
    );
  });
});

describe('views/monitor row click (UI-nprg)', () => {
  test('opens a row of the current workspace immediately', () => {
    const { mount, view, gotoIssue, switchWorkspace } = setup({
      current: WS_A,
      workspaces: [workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] })]
    });
    view.load();

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('[data-issue-id="A-1"]')
    );
    row.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(gotoIssue).toHaveBeenCalledWith('A-1');
    expect(switchWorkspace).not.toHaveBeenCalled();
  });

  test('switches workspace before opening a row of another repo', async () => {
    const { mount, view, gotoIssue, switchWorkspace } = setup({
      current: WS_A,
      workspaces: [
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1', added_at: NOW }]
        })
      ]
    });
    view.load();

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('[data-issue-id="B-1"]')
    );
    row.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(switchWorkspace).toHaveBeenCalledWith(WS_B);
    expect(gotoIssue).toHaveBeenCalledWith('B-1');
  });

  test('does not navigate when the workspace switch fails', async () => {
    const { mount, view, gotoIssue } = setup({
      current: WS_A,
      switchWorkspace: () => Promise.reject(new Error('switch failed')),
      workspaces: [
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1', added_at: NOW }]
        })
      ]
    });
    view.load();

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('[data-issue-id="B-1"]')
    );
    row.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(gotoIssue).not.toHaveBeenCalled();
  });
});

describe('views/monitor live clock', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // 세션이 조용해지면 push fanout도 멈춘다 — 그때 하트비트가 활성으로 굳으면
  // 죽은 세션이 살아 있다고 말하게 된다.
  test('lets a heartbeat go stale with no further push', () => {
    let now = NOW;
    const { mount, view } = setup({
      now: () => now,
      workspaces: [
        workspace({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'running',
              started_at: NOW - 10_000,
              last_event_at: NOW - 5_000
            }
          }
        })
      ]
    });
    view.load();

    expect(
      mount
        .querySelector('.mon-row__beat')
        ?.classList.contains('mon-row__beat--live')
    ).toBe(true);

    now = NOW + 120_000;
    vi.advanceTimersByTime(1_000);

    expect(
      mount
        .querySelector('.mon-row__beat')
        ?.classList.contains('mon-row__beat--live')
    ).toBe(false);
    expect(mount.querySelector('.mon-row__beat-age')?.textContent).toContain(
      '2분 전'
    );
  });

  test('pause stops the clock and load restarts it', () => {
    let now = NOW;
    const { mount, view } = setup({
      now: () => now,
      workspaces: [
        workspace({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'running',
              started_at: NOW - 1_000,
              last_event_at: NOW
            }
          }
        })
      ]
    });
    view.load();

    view.pause();
    now = NOW + 120_000;
    vi.advanceTimersByTime(5_000);
    expect(
      mount
        .querySelector('.mon-row__beat')
        ?.classList.contains('mon-row__beat--live')
    ).toBe(true);

    view.load();
    expect(
      mount
        .querySelector('.mon-row__beat')
        ?.classList.contains('mon-row__beat--live')
    ).toBe(false);
  });

  test('clear stops the clock and empties the mount', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] })]
    });
    view.load();

    view.clear();
    vi.advanceTimersByTime(5_000);

    expect(mount.querySelectorAll('.mon-row').length).toBe(0);
  });
});
