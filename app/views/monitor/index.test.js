import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createMonitorView } from './index.js';

const NOW = 1_700_000_000_000;
const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/**
 * One workspace entry of the aggregated payload's heavy array.
 *
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function workspace(patch = {}) {
  return {
    root_dir: WS_A,
    name: 'repo-a',
    revision: 1,
    queue: [],
    pr_wait: [],
    done: [],
    runnable: [],
    attempts: {},
    pr_observations: {},
    bead_titles: {},
    ...patch
  };
}

/**
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function state(patch = {}) {
  return {
    root_dir: WS_A,
    name: 'repo-a',
    auto_advance: false,
    auto_merge: false,
    slots: 1,
    revision: 1,
    exec_defaults: {},
    ...patch
  };
}

/**
 * @param {{ workspaces?: any[], workspaces_state?: any[], now?: () => number, current?: string, switchWorkspace?: (root: string) => Promise<unknown>, transport?: (type: string, payload?: any) => Promise<any>, confirm?: (message: string) => boolean }} [input]
 */
function setup(input = {}) {
  document.body.innerHTML = '<div id="m"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const pipelineStore = {
    get() {
      return input.workspaces || null;
    },
    getWorkspacesState() {
      return input.workspaces_state || [];
    },
    subscribe() {
      return () => {};
    }
  };
  /** @type {Array<{ type: string, payload: any }>} */
  const sent = [];
  const transport =
    input.transport ||
    vi.fn(async (/** @type {string} */ type, /** @type {any} */ payload) => {
      sent.push({ type, payload });
      return null;
    });
  const gotoIssue = vi.fn();
  const switchWorkspace =
    input.switchWorkspace || vi.fn(() => Promise.resolve(null));
  const confirmFn = input.confirm || vi.fn(() => true);
  const view = createMonitorView(mount, {
    gotoIssue,
    transport,
    pipelineStore: /** @type {any} */ (pipelineStore),
    getWorkspacePath: () => input.current || WS_A,
    switchWorkspace,
    confirm: confirmFn,
    now: input.now || (() => NOW)
  });
  return {
    mount,
    view,
    gotoIssue,
    switchWorkspace,
    transport,
    confirmFn,
    sent
  };
}

/**
 * @param {HTMLElement} mount
 * @param {string} lane
 * @returns {string[]}
 */
function idsIn(mount, lane) {
  return Array.from(mount.querySelectorAll(`#monitor-${lane} .mon-card`)).map(
    (card) => card.getAttribute('data-issue-id') || ''
  );
}

/**
 * @param {HTMLElement} mount
 * @param {string} selector
 * @returns {HTMLElement}
 */
function click(mount, selector) {
  const el = /** @type {HTMLElement} */ (mount.querySelector(selector));
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  return el;
}

describe('views/monitor lanes (UI-qrfo §8)', () => {
  test('renders every bead in its own lane pane', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-wait', added_at: NOW }],
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          done: [{ bead_id: 'A-done', added_at: NOW }],
          runnable: [{ bead_id: 'A-next', title: '실행 가능' }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'running',
              started_at: NOW - 1_000
            }
          }
        })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(idsIn(mount, 'runnable')).toEqual(['A-next']);
    expect(idsIn(mount, 'queue')).toEqual(['A-wait']);
    expect(idsIn(mount, 'running')).toEqual(['A-run']);
    expect(idsIn(mount, 'pr_wait')).toEqual(['A-pr']);
    expect(idsIn(mount, 'done')).toEqual(['A-done']);
  });

  test('keeps an empty lane visible with its empty line', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({ queue: [{ bead_id: 'A-wait', added_at: NOW }] })
      ],
      workspaces_state: [state()]
    });

    view.load();

    expect(
      mount.querySelector('#monitor-running .worker-pane__empty')
    ).not.toBe(null);
    expect(mount.querySelector('#monitor-queue .worker-pane__empty')).toBe(
      null
    );
  });

  test('renders a group header for a repo with an empty waiting queue', () => {
    const { mount, view } = setup({
      workspaces: [],
      workspaces_state: [state({ root_dir: WS_B, name: 'repo-b' })]
    });

    view.load();

    expect(
      mount.querySelector('#monitor-queue .mon-group__name')?.textContent
    ).toContain('repo-b');
    expect(idsIn(mount, 'queue')).toEqual([]);
  });

  test('badges each card with the repo it belongs to', () => {
    const { mount, view } = setup({
      workspaces: [
        workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1', added_at: NOW }]
        })
      ],
      workspaces_state: [state(), state({ root_dir: WS_B, name: 'repo-b' })]
    });

    view.load();

    expect(
      Array.from(
        mount.querySelectorAll('#monitor-queue .worker-mini__repo')
      ).map((el) => el.textContent?.trim())
    ).toEqual(['repo-a', 'repo-b']);
  });
});

describe('views/monitor mutations carry their own repo (UI-qrfo §5)', () => {
  test('places a runnable bead into that repo waiting queue', () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1', added_at: NOW }],
          runnable: [{ bead_id: 'B-2', title: '실행 가능' }]
        })
      ],
      workspaces_state: [state({ root_dir: WS_B, name: 'repo-b', revision: 5 })]
    });
    view.load();

    click(mount, '#monitor-runnable .worker-card__place');

    expect(sent).toEqual([
      {
        type: 'worker-queue-place',
        payload: {
          bead_id: 'B-2',
          index: 1,
          root_dir: WS_B,
          expected_revision: 5
        }
      }
    ]);
  });

  test('sends the group auto-advance toggle with that repo revision', () => {
    const { mount, view, sent } = setup({
      workspaces: [],
      workspaces_state: [
        state({ root_dir: WS_B, name: 'repo-b', revision: 12 })
      ]
    });
    view.load();

    click(mount, '#monitor-queue .mon-ctl--advance');

    expect(sent).toEqual([
      {
        type: 'worker-queue-toggle',
        payload: { on: true, root_dir: WS_B, expected_revision: 12 }
      }
    ]);
  });

  test('sends the group auto-merge toggle with that repo revision', () => {
    const { mount, view, sent } = setup({
      workspaces: [],
      workspaces_state: [
        state({
          root_dir: WS_B,
          name: 'repo-b',
          revision: 12,
          auto_merge: true
        })
      ]
    });
    view.load();

    click(mount, '#monitor-queue .mon-ctl--merge-auto');

    expect(sent).toEqual([
      {
        type: 'worker-merge-auto-toggle',
        payload: { on: false, root_dir: WS_B, expected_revision: 12 }
      }
    ]);
  });

  test('sends the slot count of the group it was edited in', () => {
    const { mount, view, sent } = setup({
      workspaces: [],
      workspaces_state: [state({ root_dir: WS_B, revision: 3, slots: 1 })]
    });
    view.load();

    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.mon-slots__input')
    );
    input.value = '4';
    input.dispatchEvent(new Event('change', { bubbles: true }));

    expect(sent).toEqual([
      {
        type: 'worker-queue-set-slots',
        payload: { slots: 4, root_dir: WS_B, expected_revision: 3 }
      }
    ]);
  });

  test('reorders a waiting bead inside its own group', () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [
            { bead_id: 'A-1', added_at: NOW },
            { bead_id: 'A-2', added_at: NOW }
          ]
        })
      ],
      workspaces_state: [state({ revision: 2 })]
    });
    view.load();

    click(mount, '[data-issue-id="A-2"] .mon-op--up');

    expect(sent).toEqual([
      {
        type: 'worker-queue-reorder',
        payload: {
          bead_id: 'A-2',
          to_index: 0,
          root_dir: WS_A,
          expected_revision: 2
        }
      }
    ]);
  });

  test('removes a waiting bead from its own repo', () => {
    const { mount, view, sent } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] })],
      workspaces_state: [state({ revision: 2 })]
    });
    view.load();

    click(mount, '[data-issue-id="A-1"] .mon-op--remove');

    expect(sent[0]).toEqual({
      type: 'worker-queue-remove',
      payload: { bead_id: 'A-1', root_dir: WS_A, expected_revision: 2 }
    });
  });

  test('pauses the running attempt of the card it was clicked on', () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'running',
              session_id: 's1',
              started_at: NOW - 1_000
            }
          }
        })
      ],
      workspaces_state: [state()]
    });
    view.load();

    click(mount, '#monitor-running .mon-op--pause');

    expect(sent).toEqual([
      {
        type: 'worker-attempt-pause',
        payload: { attempt_id: 'a1', root_dir: WS_A }
      }
    ]);
  });

  test('queues a PR for merge from the PR lane', () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({ pr_wait: [{ bead_id: 'A-pr', added_at: NOW }] })
      ],
      workspaces_state: [state({ revision: 8 })]
    });
    view.load();

    click(mount, '#monitor-pr_wait .worker-mini__merge');

    expect(sent).toEqual([
      {
        type: 'worker-merge-queue-add',
        payload: { bead_id: 'A-pr', root_dir: WS_A, expected_revision: 8 }
      }
    ]);
  });

  test('sends the bulk merge once per repo holding a PR', async () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({ pr_wait: [{ bead_id: 'A-pr', added_at: NOW }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          pr_wait: [{ bead_id: 'B-pr', added_at: NOW }]
        })
      ],
      workspaces_state: [
        state({ revision: 1 }),
        state({ root_dir: WS_B, revision: 2 })
      ]
    });
    view.load();

    click(mount, '.mon-merge-all');
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(sent.map((m) => [m.type, m.payload.root_dir])).toEqual([
      ['worker-merge-queue-add-all', WS_A],
      ['worker-merge-queue-add-all', WS_B]
    ]);
  });

  // 완료 레인의 머지는 이미 머지된 항목의 cleanup 재시도다 — 같은 자리에 폐기를
  // 두지 않는다 (§8).
  test('offers merge but never discard in the done lane', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ done: [{ bead_id: 'A-done', added_at: NOW }] })],
      workspaces_state: [state()]
    });

    view.load();

    expect(mount.querySelector('#monitor-done .worker-mini__merge')).not.toBe(
      null
    );
    expect(mount.querySelector('#monitor-done .worker-mini__discard')).toBe(
      null
    );
  });

  test('retries once with the revision the conflict reply reported', async () => {
    /** @type {Array<{ type: string, payload: any }>} */
    const sent = [];
    const transport = vi.fn(
      async (/** @type {string} */ type, /** @type {any} */ payload) => {
        sent.push({ type, payload });
        return sent.length === 1
          ? { conflict: true, queue: { revision: 77 } }
          : { applied: true };
      }
    );
    const { mount, view } = setup({
      transport,
      workspaces: [workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] })],
      workspaces_state: [state({ revision: 2 })]
    });
    view.load();

    click(mount, '[data-issue-id="A-1"] .mon-op--remove');
    await Promise.resolve();
    await Promise.resolve();

    expect(sent.map((m) => m.payload.expected_revision)).toEqual([2, 77]);
  });
});

describe('views/monitor master automation toggle (UI-qrfo §6)', () => {
  test('turns automation on with no confirmation', () => {
    const { mount, view, sent, confirmFn } = setup({
      workspaces: [],
      workspaces_state: [state(), state({ root_dir: WS_B })]
    });
    view.load();

    click(mount, '.mon-auto-all');

    expect(confirmFn).not.toHaveBeenCalled();
    expect(sent).toEqual([
      { type: 'monitor-auto-toggle', payload: { on: true } }
    ]);
  });

  // 끄기는 전 레포의 머지 대기열을 비운다 — 확인 없이 보내서는 안 된다.
  test('asks before turning automation off', () => {
    const { mount, view, sent, confirmFn } = setup({
      workspaces: [],
      workspaces_state: [
        state({ auto_advance: true, auto_merge: true }),
        state({ root_dir: WS_B, auto_advance: true, auto_merge: true })
      ]
    });
    view.load();

    click(mount, '.mon-auto-all');

    expect(confirmFn).toHaveBeenCalled();
    expect(sent).toEqual([
      { type: 'monitor-auto-toggle', payload: { on: false } }
    ]);
  });

  test('sends nothing when the off confirmation is declined', () => {
    const { mount, view, sent } = setup({
      confirm: () => false,
      workspaces: [],
      workspaces_state: [state({ auto_advance: true, auto_merge: true })]
    });
    view.load();

    click(mount, '.mon-auto-all');

    expect(sent).toEqual([]);
  });
});

describe('views/monitor card click (UI-nprg)', () => {
  test('opens a card of the current workspace immediately', () => {
    const { mount, view, gotoIssue, switchWorkspace } = setup({
      current: WS_A,
      workspaces: [workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] })],
      workspaces_state: [state()]
    });
    view.load();

    click(mount, '[data-issue-id="A-1"] .worker-mini__title');

    expect(gotoIssue).toHaveBeenCalledWith('A-1');
    expect(switchWorkspace).not.toHaveBeenCalled();
  });

  test('switches workspace before opening a card of another repo', async () => {
    const { mount, view, gotoIssue, switchWorkspace } = setup({
      current: WS_A,
      workspaces: [
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          queue: [{ bead_id: 'B-1', added_at: NOW }]
        })
      ],
      workspaces_state: [state({ root_dir: WS_B, name: 'repo-b' })]
    });
    view.load();

    click(mount, '[data-issue-id="B-1"] .worker-mini__title');
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
      ],
      workspaces_state: [state({ root_dir: WS_B, name: 'repo-b' })]
    });
    view.load();

    click(mount, '[data-issue-id="B-1"] .worker-mini__title');
    await Promise.resolve();
    await Promise.resolve();

    expect(gotoIssue).not.toHaveBeenCalled();
  });

  test('does not open the issue when an action button is clicked', () => {
    const { mount, view, gotoIssue } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] })],
      workspaces_state: [state()]
    });
    view.load();

    click(mount, '[data-issue-id="A-1"] .mon-op--remove');

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
      ],
      workspaces_state: [state()]
    });
    view.load();

    expect(
      mount.querySelector('.mon-beat')?.classList.contains('mon-beat--live')
    ).toBe(true);

    now = NOW + 120_000;
    vi.advanceTimersByTime(1_000);

    expect(
      mount.querySelector('.mon-beat')?.classList.contains('mon-beat--live')
    ).toBe(false);
    expect(mount.querySelector('.mon-beat__age')?.textContent).toContain(
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
      ],
      workspaces_state: [state()]
    });
    view.load();

    view.pause();
    now = NOW + 120_000;
    vi.advanceTimersByTime(5_000);
    expect(
      mount.querySelector('.mon-beat')?.classList.contains('mon-beat--live')
    ).toBe(true);

    view.load();
    expect(
      mount.querySelector('.mon-beat')?.classList.contains('mon-beat--live')
    ).toBe(false);
  });

  test('clear stops the clock and empties the mount', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] })],
      workspaces_state: [state()]
    });
    view.load();

    view.clear();
    vi.advanceTimersByTime(5_000);

    expect(mount.querySelectorAll('.mon-card').length).toBe(0);
  });
});
