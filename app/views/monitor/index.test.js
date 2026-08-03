import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MONITOR_IN_PROGRESS_KEY, createMonitorView } from './index.js';

const NOW = 1_700_000_000_000;

/**
 * @param {{ issues?: any[], queue?: any, now?: () => number }} [input]
 */
function setup(input = {}) {
  document.body.innerHTML = '<div id="m"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const issueStores = {
    /** @param {string} client_id */
    snapshotFor(client_id) {
      return client_id === MONITOR_IN_PROGRESS_KEY ? input.issues || [] : [];
    },
    subscribe() {
      return () => {};
    }
  };
  const queueStore = {
    get() {
      return input.queue || null;
    },
    subscribe() {
      return () => {};
    }
  };
  const gotoIssue = vi.fn();
  const view = createMonitorView(mount, {
    gotoIssue,
    issueStores: /** @type {any} */ (issueStores),
    queueStore: /** @type {any} */ (queueStore),
    now: input.now || (() => NOW)
  });
  return { mount, view, gotoIssue };
}

describe('views/monitor', () => {
  test('renders one row per in_progress issue', () => {
    const { mount, view } = setup({
      issues: [
        { id: 'UI-1', title: 'a', updated_at: NOW - 1_000 },
        { id: 'UI-2', title: 'b', updated_at: NOW - 2_000 }
      ]
    });

    view.load();

    expect(mount.querySelectorAll('.mon-row').length).toBe(2);
  });

  test('orders rows by updated_at descending', () => {
    const { mount, view } = setup({
      issues: [
        { id: 'UI-old', title: 'old', updated_at: NOW - 90_000 },
        { id: 'UI-new', title: 'new', updated_at: NOW - 1_000 }
      ]
    });

    view.load();

    const ids = Array.from(mount.querySelectorAll('.mon-row')).map((row) =>
      row.getAttribute('data-issue-id')
    );
    expect(ids).toEqual(['UI-new', 'UI-old']);
  });

  test('joins the current in_progress child onto its parent row', () => {
    const { mount, view } = setup({
      issues: [
        { id: 'UI-1', title: '부모', updated_at: NOW - 1_000 },
        {
          id: 'UI-1.2',
          title: 'T2: 구현',
          status: 'in_progress',
          parent: 'UI-1',
          updated_at: NOW - 5_000
        }
      ]
    });

    view.load();

    const parent_row = mount.querySelector('[data-issue-id="UI-1"]');
    expect(parent_row?.querySelector('.mon-row__child')?.textContent).toContain(
      'T2: 구현'
    );
  });

  test('joins the live attempt metrics of a running worker attempt', () => {
    const { mount, view } = setup({
      issues: [{ id: 'UI-1', title: '실행중', updated_at: NOW - 1_000 }],
      queue: {
        attempts: {
          'att-1': {
            attempt_id: 'att-1',
            bead_id: 'UI-1',
            status: 'running',
            started_at: NOW - 65_000,
            last_event_at: NOW - 5_000
          }
        }
      }
    });

    view.load();

    const row = mount.querySelector('[data-issue-id="UI-1"]');
    expect(row?.querySelector('.mon-row__elapsed')?.textContent?.trim()).toBe(
      '1m 05s'
    );
    expect(
      row
        ?.querySelector('.mon-row__beat')
        ?.classList.contains('mon-row__beat--live')
    ).toBe(true);
    expect(row?.querySelector('.mon-row__since')).toBe(null);
  });

  test('falls back to 마지막 갱신 경과 for a bead with no running attempt', () => {
    const { mount, view } = setup({
      issues: [{ id: 'UI-1', title: '대화형', updated_at: NOW - 600_000 }],
      queue: {
        attempts: {
          'att-old': {
            attempt_id: 'att-old',
            bead_id: 'UI-1',
            status: 'failed',
            started_at: NOW - 900_000
          }
        }
      }
    });

    view.load();

    const row = mount.querySelector('[data-issue-id="UI-1"]');
    expect(row?.querySelector('.mon-row__elapsed')).toBe(null);
    expect(row?.querySelector('.mon-row__since')?.textContent).toContain(
      '10분 전'
    );
  });

  test('opens the issue when a row is clicked', () => {
    const { mount, view, gotoIssue } = setup({
      issues: [{ id: 'UI-1', title: 'a', updated_at: NOW }]
    });
    view.load();

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('[data-issue-id="UI-1"]')
    );
    row.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(gotoIssue).toHaveBeenCalledWith('UI-1');
  });

  test('clear empties the mount', () => {
    const { mount, view } = setup({
      issues: [{ id: 'UI-1', title: 'a', updated_at: NOW }]
    });
    view.load();

    view.clear();

    expect(mount.querySelectorAll('.mon-row').length).toBe(0);
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
      issues: [{ id: 'UI-1', title: '실행중', updated_at: NOW }],
      queue: {
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'UI-1',
            status: 'running',
            started_at: NOW - 10_000,
            last_event_at: NOW - 5_000
          }
        }
      }
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
      issues: [{ id: 'UI-1', title: '실행중', updated_at: NOW }],
      queue: {
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'UI-1',
            status: 'running',
            started_at: NOW - 1_000,
            last_event_at: NOW
          }
        }
      }
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

  test('clear stops the clock', () => {
    const { mount, view } = setup({
      issues: [{ id: 'UI-1', title: 'a', updated_at: NOW }]
    });
    view.load();

    view.clear();
    vi.advanceTimersByTime(5_000);

    expect(mount.querySelectorAll('.mon-row').length).toBe(0);
  });
});
