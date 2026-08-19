import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { discardConfirmationMessage } from '../worker/lanes.js';
import { createMonitorView } from './index.js';

const NOW = 1_700_000_000_000;
const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

beforeEach(() => {
  window.localStorage.clear();
});

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

/**
 * Dispatch one drag-phase event. jsdom은 `DragEvent`/`DataTransfer`를 구현하지
 * 않는다. 컨트롤러는 dataTransfer를
 * 옵셔널로만 만지므로 취소 가능한 평범한 이벤트로도 판정 경로가 전부 돈다 —
 * 드롭 허용 여부는 `defaultPrevented`로 읽는다.
 *
 * @param {HTMLElement|null} el
 * @param {string} type
 * @returns {Event}
 */
function fireDrag(el, type) {
  const ev = new Event(type, { bubbles: true, cancelable: true });
  /** @type {HTMLElement} */ (el).dispatchEvent(ev);
  return ev;
}

/**
 * @param {HTMLElement} mount
 * @param {string} selector
 * @returns {HTMLElement}
 */
function el(mount, selector) {
  return /** @type {HTMLElement} */ (mount.querySelector(selector));
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
        workspace({ done: [{ bead_id: 'A-1', added_at: NOW }] }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          done: [{ bead_id: 'B-1', added_at: NOW }]
        })
      ],
      workspaces_state: [state(), state({ root_dir: WS_B, name: 'repo-b' })]
    });

    view.load();

    expect(
      Array.from(mount.querySelectorAll('#monitor-done .mon-c__repo')).map(
        (el) => el.textContent?.trim()
      )
    ).toEqual(['repo-a', 'repo-b']);
  });

  // 대기 레인은 이미 레포별 그룹이다 — 행마다 레포 칩을 또 실으면 같은 사실을 두
  // 번 말하면서 제목이 쓸 폭만 줄인다 (UI-gwkl §2.2).
  test('leaves the repo chip off a waiting row the group header already names', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ queue: [{ bead_id: 'A-1', added_at: NOW }] })],
      workspaces_state: [state()]
    });

    view.load();

    expect(mount.querySelector('#monitor-queue .mon-c__repo')).toBe(null);
    expect(
      mount.querySelector('#monitor-queue .mon-group__name')?.textContent
    ).toContain('repo-a');
  });
});

describe('views/monitor running sort persistence (UI-fmwh §4.1)', () => {
  /**
   * @returns {{ workspaces: Record<string, any>[], workspaces_state: Record<string, any>[] }}
   */
  function runningPayload() {
    return {
      workspaces: [
        workspace({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-new',
              status: 'running',
              started_at: NOW - 1_000
            }
          }
        }),
        workspace({
          root_dir: WS_B,
          name: 'repo-b',
          attempts: {
            b1: {
              attempt_id: 'b1',
              bead_id: 'B-old',
              status: 'running',
              started_at: NOW - 90_000
            }
          }
        })
      ],
      workspaces_state: [state(), state({ root_dir: WS_B, name: 'repo-b' })]
    };
  }

  test('uses started order by default', () => {
    const { mount, view } = setup(runningPayload());

    view.load();

    expect(idsIn(mount, 'running')).toEqual(['B-old', 'A-new']);
  });

  test('restores repo order from localStorage', () => {
    window.localStorage.setItem('bdui.monitor.running_sort', 'repo');
    const { mount, view } = setup(runningPayload());

    view.load();

    expect(idsIn(mount, 'running')).toEqual(['A-new', 'B-old']);
  });

  test('falls back from an unknown saved order', () => {
    window.localStorage.setItem('bdui.monitor.running_sort', 'unknown');
    const { mount, view } = setup(runningPayload());

    view.load();

    expect(idsIn(mount, 'running')).toEqual(['B-old', 'A-new']);
  });

  test('saves and applies the selected repo order', () => {
    const { mount, view } = setup(runningPayload());
    view.load();

    click(mount, '.mon-running-sort[data-sort="repo"]');

    expect(window.localStorage.getItem('bdui.monitor.running_sort')).toBe(
      'repo'
    );
    expect(idsIn(mount, 'running')).toEqual(['A-new', 'B-old']);
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

  test('sends the group automation toggle with that repo revision', () => {
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
        type: 'worker-automation-toggle',
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

  test('preserves resume instructions through initial, conflict, and continuation sends', async () => {
    const decision_token = { source_attempt_id: 'a1', digest: 'one' };
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ conflict: true, queue: { revision: 77 } })
      .mockResolvedValueOnce({
        resumed: false,
        conflict: false,
        reason: 'runner_mismatch',
        continuation_mismatch: {
          prior_available: true,
          prior: { runner: 'codex', model: 'sol' },
          current: { runner: 'claude', model: 'opus' },
          decision_token
        }
      })
      .mockResolvedValueOnce({ resumed: true, conflict: false });
    const { mount, view } = setup({
      transport,
      workspaces: [
        workspace({
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'paused',
              session_id: 's1',
              started_at: NOW - 1_000
            }
          }
        })
      ],
      workspaces_state: [state({ revision: 2 })]
    });
    view.load();

    click(mount, '#monitor-running .mon-op--resume');
    const textarea = /** @type {HTMLTextAreaElement} */ (
      document.querySelector('.resume-instructions-dialog textarea')
    );
    textarea.value = '  변경 파일부터 검토  ';
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await vi.waitFor(() => expect(transport).toHaveBeenCalledTimes(2));
    /** @type {HTMLButtonElement} */ (
      document.querySelectorAll('.continuation-dialog button')[1]
    ).click();
    await vi.waitFor(() => expect(transport).toHaveBeenCalledTimes(3));

    expect(transport.mock.calls).toEqual([
      [
        'worker-attempt-resume',
        {
          attempt_id: 'a1',
          instructions: '변경 파일부터 검토',
          root_dir: WS_A,
          expected_revision: 2
        }
      ],
      [
        'worker-attempt-resume',
        {
          attempt_id: 'a1',
          instructions: '변경 파일부터 검토',
          root_dir: WS_A,
          expected_revision: 77
        }
      ],
      [
        'worker-attempt-resume',
        {
          attempt_id: 'a1',
          instructions: '변경 파일부터 검토',
          continuation: 'fresh_current',
          decision_token,
          root_dir: WS_A,
          expected_revision: 77
        }
      ]
    ]);
  });

  test('uses the shared unmerged confirmation and worker-discard action', () => {
    const { mount, view, sent, confirmFn } = setup({
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
      workspaces_state: [state({ revision: 4 })]
    });
    view.load();

    click(mount, '#monitor-running .mon-op--discard');

    expect(confirmFn).toHaveBeenCalledWith(
      discardConfirmationMessage('A-run', 'unmerged')
    );
    expect(sent).toEqual([
      {
        type: 'worker-discard',
        payload: {
          bead_id: 'A-run',
          attempt_id: 'a1',
          root_dir: WS_A,
          expected_revision: 4
        }
      }
    ]);
  });

  test('surfaces an immediate discard refusal', async () => {
    const transport = vi.fn(async () => ({
      accepted: true,
      operation_id: 'op-failed',
      conflict: false,
      reason: 'operation_not_retryable'
    }));
    const { mount, view } = setup({
      transport,
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
      workspaces_state: [state({ revision: 4 })]
    });
    view.load();

    click(mount, '#monitor-running .mon-op--discard');
    await Promise.resolve();
    await Promise.resolve();

    expect(document.querySelector('.toast')?.textContent).toContain(
      'operation_not_retryable'
    );
  });

  test('uses the shared merged confirmation for cleanup discard', () => {
    const { mount, view, sent, confirmFn } = setup({
      workspaces: [
        workspace({
          pr_wait: [{ bead_id: 'A-pr', added_at: NOW }],
          pr_observations: {
            'A-pr': { gate: { enabled: false, tier: 'merged' } }
          },
          cleanup_failed: {
            'A-pr': { step: 'verify', reason: 'verify_failed' }
          }
        })
      ],
      workspaces_state: [state({ revision: 5 })]
    });
    view.load();

    click(mount, '#monitor-pr_wait .worker-mini__discard');

    expect(confirmFn).toHaveBeenCalledWith(
      discardConfirmationMessage('A-pr', 'merged')
    );
    expect(sent).toEqual([
      {
        type: 'worker-discard',
        payload: {
          bead_id: 'A-pr',
          root_dir: WS_A,
          expected_revision: 5
        }
      }
    ]);
  });

  test('retries a failed post-runner discard from the queue row', () => {
    const { mount, view, sent } = setup({
      workspaces: [
        workspace({
          queue: [{ bead_id: 'A-queue', added_at: NOW }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-queue',
              status: 'discarded'
            }
          },
          discard_operations: {
            'op-queue': {
              operation_id: 'op-queue',
              bead_id: 'A-queue',
              attempt_id: 'a1',
              requested_at: 1,
              mode: 'unmerged',
              phase: 'runner_terminated',
              last_error: 'pr_observe_failed'
            }
          }
        })
      ],
      workspaces_state: [state({ revision: 6 })]
    });
    view.load();

    click(mount, '#monitor-queue .worker-mini__discard');

    expect(sent).toEqual([
      {
        type: 'worker-discard',
        payload: {
          bead_id: 'A-queue',
          attempt_id: 'a1',
          operation_id: 'op-queue',
          root_dir: WS_A,
          expected_revision: 6
        }
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

  // 완료 레인에는 조작 버튼이 없다 — Worker 탭의 완료 행과 같다. 큐 스토어의
  // 레인 배타성(UI-wwby §2)이 `done` 소속 버드의 머지 큐 적재를 항상 거부하므로,
  // 여기 머지 버튼을 두면 누를 때마다 거부로만 돌아온다.
  test('offers neither merge nor discard in the done lane', () => {
    const { mount, view } = setup({
      workspaces: [workspace({ done: [{ bead_id: 'A-done', added_at: NOW }] })],
      workspaces_state: [state()]
    });

    view.load();

    expect(
      mount.querySelector('#monitor-done [data-issue-id="A-done"]')
    ).not.toBe(null);
    expect(mount.querySelector('#monitor-done .worker-mini__merge')).toBe(null);
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

    click(mount, '[data-issue-id="A-1"] .mon-c__title');

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

    click(mount, '[data-issue-id="B-1"] .mon-c__title');
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

    click(mount, '[data-issue-id="B-1"] .mon-c__title');
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

describe('views/monitor 드래그앤드롭 (UI-gwkl §2.4)', () => {
  /**
   * Two repos whose waiting head is hidden by a running attempt. repo-a의 대기
   * 큐는 [A-run(실행중이라 화면에서 숨음), A-1, A-2]다. DOM은 두
   * 행만 그리므로 DOM 서수와 raw 좌표가 어긋난다 — 이 어긋남이 산식 테스트의
   * 전부다.
   */
  function twoRepoSetup() {
    return setup({
      workspaces: [
        workspace({
          queue: [
            { bead_id: 'A-run', added_at: NOW },
            { bead_id: 'A-1', added_at: NOW },
            { bead_id: 'A-2', added_at: NOW }
          ],
          runnable: [{ bead_id: 'A-next', title: '실행 가능' }],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'A-run',
              status: 'running',
              started_at: NOW - 1_000
            }
          }
        }),
        workspace({ root_dir: WS_B, name: 'repo-b' })
      ],
      workspaces_state: [
        state({ revision: 4 }),
        state({ root_dir: WS_B, name: 'repo-b', revision: 9 })
      ]
    });
  }

  test('highlights only the waiting group of the dragged card own repo', () => {
    const { mount, view } = twoRepoSetup();
    view.load();
    const own = el(mount, `#monitor-queue .mon-group[data-root-dir="${WS_A}"]`);
    const other = el(
      mount,
      `#monitor-queue .mon-group[data-root-dir="${WS_B}"]`
    );

    fireDrag(
      el(mount, '#monitor-runnable [data-issue-id="A-next"]'),
      'dragstart'
    );
    const on_own = fireDrag(own.querySelector('.mon-group__list'), 'dragover');
    const on_other = fireDrag(
      other.querySelector('.mon-group__list'),
      'dragover'
    );

    expect(on_own.defaultPrevented).toBe(true);
    expect(own.classList.contains('mon-group--drag-over')).toBe(true);
    expect(on_other.defaultPrevented).toBe(false);
    expect(other.classList.contains('mon-group--drag-over')).toBe(false);
  });

  // 크로스레포 적재는 서버에 없는 개념이다 — 허용하면 클릭이 거부로만 돌아온다.
  test('sends nothing when a runnable card is dropped on another repo group', () => {
    const { mount, view, sent } = twoRepoSetup();
    view.load();

    fireDrag(
      el(mount, '#monitor-runnable [data-issue-id="A-next"]'),
      'dragstart'
    );
    fireDrag(
      el(
        mount,
        `#monitor-queue .mon-group[data-root-dir="${WS_B}"] .mon-group__list`
      ),
      'drop'
    );

    expect(sent).toEqual([]);
  });

  test('places a runnable card at the raw queue index of the row it was dropped before', () => {
    const { mount, view, sent } = twoRepoSetup();
    view.load();

    fireDrag(
      el(mount, '#monitor-runnable [data-issue-id="A-next"]'),
      'dragstart'
    );
    fireDrag(el(mount, '#monitor-queue [data-issue-id="A-2"]'), 'drop');

    expect(sent).toEqual([
      {
        type: 'worker-queue-place',
        payload: {
          bead_id: 'A-next',
          index: 2,
          root_dir: WS_A,
          expected_revision: 4
        }
      }
    ]);
  });

  test('places a runnable card at the raw queue length when dropped past the last row', () => {
    const { mount, view, sent } = twoRepoSetup();
    view.load();

    fireDrag(
      el(mount, '#monitor-runnable [data-issue-id="A-next"]'),
      'dragstart'
    );
    fireDrag(
      el(
        mount,
        `#monitor-queue .mon-group[data-root-dir="${WS_A}"] .mon-group__list`
      ),
      'drop'
    );

    expect(sent[0].payload).toEqual({
      bead_id: 'A-next',
      index: 3,
      root_dir: WS_A,
      expected_revision: 4
    });
  });

  test('reorders upward to the raw index of the row it was dropped before', () => {
    const { mount, view, sent } = twoRepoSetup();
    view.load();

    fireDrag(el(mount, '#monitor-queue [data-issue-id="A-2"]'), 'dragstart');
    fireDrag(el(mount, '#monitor-queue [data-issue-id="A-1"]'), 'drop');

    expect(sent).toEqual([
      {
        type: 'worker-queue-reorder',
        payload: {
          bead_id: 'A-2',
          to_index: 1,
          root_dir: WS_A,
          expected_revision: 4
        }
      }
    ]);
  });

  // 아래로 보내는 이동은 제거 후 삽입이라 한 칸 보정이 붙는다.
  test('reorders to the last raw slot when dropped past the last row', () => {
    const { mount, view, sent } = twoRepoSetup();
    view.load();

    fireDrag(el(mount, '#monitor-queue [data-issue-id="A-1"]'), 'dragstart');
    fireDrag(
      el(
        mount,
        `#monitor-queue .mon-group[data-root-dir="${WS_A}"] .mon-group__list`
      ),
      'drop'
    );

    expect(sent[0].payload.to_index).toBe(2);
  });

  test('sends nothing when a waiting row is dropped on itself', () => {
    const { mount, view, sent } = twoRepoSetup();
    view.load();

    fireDrag(el(mount, '#monitor-queue [data-issue-id="A-1"]'), 'dragstart');
    fireDrag(el(mount, '#monitor-queue [data-issue-id="A-1"]'), 'drop');

    expect(sent).toEqual([]);
  });

  // 드롭의 마우스업이 그대로 click으로 이어지면 방금 옮긴 카드가 열려 버린다.
  test('swallows only the first click after a drop, then opens normally', () => {
    const { mount, view, gotoIssue } = twoRepoSetup();
    view.load();

    fireDrag(el(mount, '#monitor-queue [data-issue-id="A-2"]'), 'dragstart');
    fireDrag(el(mount, '#monitor-queue [data-issue-id="A-1"]'), 'drop');
    click(mount, '#monitor-queue [data-issue-id="A-1"] .mon-c__title');

    expect(gotoIssue).not.toHaveBeenCalled();

    click(mount, '#monitor-queue [data-issue-id="A-1"] .mon-c__title');

    expect(gotoIssue).toHaveBeenCalledWith('A-1');
  });

  // 브라우저 대부분은 드래그 뒤에 click을 아예 발행하지 않는다 — 소비만 기다리면
  // 플래그가 남아 한참 뒤의 정상 클릭을 삼킨다.
  test('expires the suppression when the drop is followed by no click at all', async () => {
    const { mount, view, gotoIssue } = twoRepoSetup();
    view.load();

    fireDrag(el(mount, '#monitor-queue [data-issue-id="A-2"]'), 'dragstart');
    fireDrag(el(mount, '#monitor-queue [data-issue-id="A-1"]'), 'drop');
    fireDrag(el(mount, '#monitor-queue [data-issue-id="A-2"]'), 'dragend');
    await new Promise((resolve) => setTimeout(resolve, 0));
    click(mount, '#monitor-queue [data-issue-id="A-1"] .mon-c__title');

    expect(gotoIssue).toHaveBeenCalledWith('A-1');
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
