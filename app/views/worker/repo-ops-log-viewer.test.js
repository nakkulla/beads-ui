import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  LOG_POLL_MS,
  attemptHeaderText,
  createRepoOpsLogViewer,
  formatAttemptClock,
  isSummaryLine,
  truncationText
} from './repo-ops-log-viewer.js';

/** 2026-10-06 14:00:00 local — 고정 시계. */
const NOW = new Date(2026, 9, 6, 14, 0, 0).getTime();
const MINUTE = 60 * 1000;

/**
 * @param {Record<string, any>} [patch]
 */
function attempt(patch = {}) {
  return {
    attempt_id: 'op-1:1',
    started_at: NOW - 10 * MINUTE,
    finished_at: NOW - 10 * MINUTE + 7 * MINUTE + 45 * 1000,
    exit_code: 1,
    signal: null,
    timed_out: false,
    lines: ['step one', 'npm ERR! boom'],
    ...patch
  };
}

/**
 * @param {Record<string, any>} [patch]
 */
function logBody(patch = {}) {
  return {
    ok: true,
    path: '/state/repo-operation-logs/op-1.log',
    total_bytes: 100,
    truncated_bytes: 0,
    running: false,
    summary: 'npm ERR! boom',
    preamble: [],
    attempts: [attempt()],
    ...patch
  };
}

/**
 * @param {any} body
 * @param {boolean} [ok]
 */
function reply(body, ok = true) {
  return { ok, json: async () => body };
}

/**
 * A manual timer the tests fire by hand.
 */
function manualTimers() {
  /** @type {Array<{ fn: () => void, ms: number, cleared: boolean }>} */
  const timers = [];
  return {
    timers,
    /**
     * @param {() => void} fn
     * @param {number} ms
     */
    setTimer(fn, ms) {
      const entry = { fn, ms, cleared: false };
      timers.push(entry);
      return entry;
    },
    /** @param {any} handle */
    clearTimer(handle) {
      handle.cleared = true;
    },
    /** @returns {number} */
    pending() {
      return timers.filter((entry) => !entry.cleared).length;
    },
    /** Fire every pending timer once. */
    async fire() {
      const due = timers.filter((entry) => !entry.cleared);
      for (const entry of due) {
        entry.cleared = true;
        entry.fn();
      }
      await flush();
    }
  };
}

/** Let queued promise callbacks run. */
async function flush() {
  for (let i = 0; i < 5; i += 1) {
    await Promise.resolve();
  }
}

/**
 * @param {Array<any>} replies - Successive fetch outcomes; an Error rejects.
 * @param {ReturnType<typeof manualTimers>} [timers]
 */
function viewerWith(replies, timers = manualTimers()) {
  const queue = [...replies];
  const fetchImpl = vi.fn(
    async (/** @type {string} */ url, /** @type {any} */ init) => {
      void url;
      void init;
      const next = queue.length > 1 ? queue.shift() : queue[0];
      if (next instanceof Error) {
        throw next;
      }
      return next;
    }
  );
  const viewer = createRepoOpsLogViewer({
    fetchImpl: /** @type {any} */ (fetchImpl),
    now: () => NOW,
    setTimer: timers.setTimer,
    clearTimer: timers.clearTimer
  });
  return { viewer, fetchImpl, timers };
}

/**
 * @param {ReturnType<typeof createRepoOpsLogViewer>} viewer
 */
function openOperation(viewer) {
  return viewer.open(
    {
      workspace: '/repo',
      source: 'operation',
      id: 'op-1',
      path: '/state/repo-operation-logs/op-1.log'
    },
    /** @type {HTMLElement} */ (document.getElementById('trigger'))
  );
}

/** @returns {string[]} */
function headTexts() {
  return Array.from(
    document.querySelectorAll('.repo-ops-log-viewer__attempt-head')
  ).map((el) => (el.textContent || '').replace(/\s+/g, ' ').trim());
}

beforeEach(() => {
  document.body.innerHTML = '<button id="trigger">로그 보기</button>';
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: vi.fn().mockResolvedValue(undefined) }
  });
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('attempt header text', () => {
  test('names number, start clock, end clock, duration and exit', () => {
    const text = attemptHeaderText(attempt(), 1, { live: false, now: NOW });

    expect(text).toBe(
      '시도 1 · 13:50:00 시작 · 13:57:45 종료 · 7분 45초 · exit 1'
    );
  });

  test('puts the date in front of an end clock that was not today', () => {
    const started_at = new Date(2026, 9, 5, 23, 58, 0).getTime();
    const finished_at = new Date(2026, 9, 6, 0, 3, 0).getTime();

    const text = attemptHeaderText(attempt({ started_at, finished_at }), 1, {
      live: false,
      now: new Date(2026, 9, 7, 9, 0, 0).getTime()
    });

    expect(text).toBe(
      '시도 1 · 10월 5일 23:58:00 시작 · 10월 6일 00:03:00 종료 · 5분 0초 · exit 1'
    );
  });

  test('puts the year in front of a clock from another year', () => {
    const at = new Date(2025, 11, 31, 23, 0, 0).getTime();

    const text = formatAttemptClock(at, NOW);

    expect(text).toBe('2025년 12월 31일 23:00:00');
  });

  test('puts the date in front of a start that was not today', () => {
    const at = new Date(2026, 9, 5, 23, 59, 30).getTime();

    const text = formatAttemptClock(at, NOW);

    expect(text).toBe('10월 5일 23:59:30');
  });

  test('says 진행 중 for the live last attempt with no end line', () => {
    const text = attemptHeaderText(
      attempt({ finished_at: null, exit_code: null }),
      2,
      { live: true, now: NOW }
    );

    expect(text).toBe('시도 2 · 13:50:00 시작 · 진행 중');
  });

  test('says 끝 기록 없음 for an attempt that never wrote its end line', () => {
    const text = attemptHeaderText(
      attempt({ finished_at: null, exit_code: null }),
      1,
      { live: false, now: NOW }
    );

    expect(text).toBe('시도 1 · 13:50:00 시작 · 끝 기록 없음');
  });

  test('names a timeout before its exit code', () => {
    const text = attemptHeaderText(
      attempt({ exit_code: 124, timed_out: true }),
      1,
      { live: false, now: NOW }
    );

    expect(text).toBe(
      '시도 1 · 13:50:00 시작 · 13:57:45 종료 · 7분 45초 · 시간 초과 · exit 124'
    );
  });
});

describe('summary line match', () => {
  test('matches the trimmed line equal to the summary', () => {
    const hit = isSummaryLine('  npm ERR! boom  ', 'npm ERR! boom');

    expect(hit).toBe(true);
  });

  test('matches a long line by the summary prefix settlement kept', () => {
    const line = `E${'x'.repeat(300)}`;

    const hit = isSummaryLine(line, line.slice(0, 200), true);

    expect(hit).toBe(true);
  });

  test('rejects a prefix the server did not flag as cut', () => {
    const line = `E${'x'.repeat(300)}`;

    const hit = isSummaryLine(line, line.slice(0, 200), false);

    expect(hit).toBe(false);
  });

  test('rejects a short summary that is only a prefix', () => {
    const hit = isSummaryLine('npm ERR! boom twice', 'npm ERR! boom');

    expect(hit).toBe(false);
  });
});

describe('createRepoOpsLogViewer rendering', () => {
  test('requests the record, never a path', async () => {
    const { viewer, fetchImpl } = viewerWith([reply(logBody())]);

    await openOperation(viewer);

    expect(fetchImpl).toHaveBeenCalledWith(
      `/api/repo-ops-log?workspace=${encodeURIComponent('/repo')}&source=operation&id=op-1`,
      { cache: 'no-store' }
    );
    viewer.destroy();
  });

  test('shows the path in the header with a copy control', async () => {
    const { viewer } = viewerWith([reply(logBody())]);

    await openOperation(viewer);

    expect(
      document.querySelector('.repo-ops-script-viewer__path')?.textContent
    ).toBe('/state/repo-operation-logs/op-1.log');
    expect(document.querySelector('.repo-ops-log-viewer__copy')).not.toBeNull();
    viewer.destroy();
  });

  test('draws a single attempt without folding', async () => {
    const { viewer } = viewerWith([reply(logBody())]);

    await openOperation(viewer);

    expect(document.querySelector('details.repo-ops-log-viewer__attempt')).toBe(
      null
    );
    expect(headTexts()).toEqual([
      '시도 1 · 13:50:00 시작 · 13:57:45 종료 · 7분 45초 · exit 1'
    ]);
    viewer.destroy();
  });

  test('opens the last attempt and folds the earlier ones', async () => {
    const { viewer } = viewerWith([
      reply(logBody({ attempts: [attempt(), attempt(), attempt()] }))
    ]);

    await openOperation(viewer);

    const folds = Array.from(
      document.querySelectorAll('details.repo-ops-log-viewer__attempt')
    ).map((el) => /** @type {HTMLDetailsElement} */ (el).open);
    expect(folds).toEqual([false, false, true]);
    viewer.destroy();
  });

  test('puts the truncation line on top of a cut log', async () => {
    const { viewer } = viewerWith([
      reply(logBody({ truncated_bytes: 600 * 1024 }))
    ]);

    await openOperation(viewer);

    const first = document.querySelector(
      '.repo-ops-log-viewer__scroll'
    )?.firstElementChild;
    expect(first?.textContent?.trim()).toBe(
      '앞부분 600 KB 생략 — 전체는 경로로 확인'
    );
    expect(truncationText(100)).toBe('앞부분 1 KB 생략 — 전체는 경로로 확인');
    viewer.destroy();
  });

  test('marks an attempt whose body was cut with a note', async () => {
    const { viewer } = viewerWith([
      reply(
        logBody({
          truncated_bytes: 2048,
          attempts: [attempt({ lines: [], body_truncated: true }), attempt()]
        })
      )
    ]);

    await openOperation(viewer);

    const first_attempt = document.querySelector(
      'details.repo-ops-log-viewer__attempt'
    );
    expect(first_attempt?.textContent).toContain('본문은 앞부분 생략에 포함됨');
    viewer.destroy();
  });

  test('highlights the line equal to the failure summary', async () => {
    const { viewer } = viewerWith([reply(logBody())]);

    await openOperation(viewer);

    const hits = Array.from(
      document.querySelectorAll('.repo-ops-log-viewer__line--summary')
    ).map((el) => el.textContent?.trim());
    expect(hits).toEqual(['npm ERR! boom']);
    viewer.destroy();
  });

  test('highlights a cut summary of a long line the server flagged as a prefix', async () => {
    const long_line = `npm ERR! ${'y'.repeat(300)}`;
    const { viewer } = viewerWith([
      reply(
        logBody({
          summary: long_line.slice(0, 190),
          summary_prefix: true,
          attempts: [attempt({ lines: ['before', long_line] })]
        })
      )
    ]);

    await openOperation(viewer);

    const hits = document.querySelectorAll(
      '.repo-ops-log-viewer__line--summary'
    );
    expect(hits).toHaveLength(1);
    expect(hits[0].textContent?.trim()).toBe(long_line);
    viewer.destroy();
  });

  test('draws a log without boundary lines as plain preamble lines', async () => {
    const { viewer } = viewerWith([
      reply(logBody({ preamble: ['git push failed'], attempts: [] }))
    ]);

    await openOperation(viewer);

    expect(headTexts()).toEqual([]);
    expect(
      document.querySelector('.repo-ops-log-viewer__line')?.textContent?.trim()
    ).toBe('git push failed');
    viewer.destroy();
  });

  test('closes on Escape and returns focus to the opening control', async () => {
    const { viewer } = viewerWith([reply(logBody())]);
    const trigger = /** @type {HTMLElement} */ (
      document.getElementById('trigger')
    );
    await openOperation(viewer);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(document.querySelector('.repo-ops-log-viewer')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    viewer.destroy();
  });

  test('opens from a log-view control through its data attributes', async () => {
    const { viewer, fetchImpl } = viewerWith([reply(logBody())]);
    const control = document.createElement('button');
    control.dataset.workspace = '/repo';
    control.dataset.logSource = 'cleanup';
    control.dataset.logId = 'UI-1';
    control.dataset.logPath = '/state/verify-logs/c.log';
    document.body.append(control);

    const opened = viewer.openFrom(control);
    await flush();

    expect(opened).toBe(true);
    expect(fetchImpl.mock.calls[0][0]).toContain('source=cleanup&id=UI-1');
    viewer.destroy();
  });
});

describe('createRepoOpsLogViewer errors', () => {
  test('says the file cannot be found and keeps the path copy', async () => {
    const { viewer } = viewerWith([
      reply({ ok: false, error: 'not_found' }, false)
    ]);

    await openOperation(viewer);

    expect(
      document.querySelector('.repo-ops-script-viewer__status')?.textContent
    ).toContain('로그 파일을 찾을 수 없습니다');
    expect(
      document
        .querySelector('.repo-ops-log-viewer__copy')
        ?.hasAttribute('disabled')
    ).toBe(false);
    viewer.destroy();
  });

  test('says a refused log cannot be read', async () => {
    const { viewer } = viewerWith([
      reply({ ok: false, error: 'forbidden' }, false)
    ]);

    await openOperation(viewer);

    expect(
      document.querySelector('.repo-ops-script-viewer__status')?.textContent
    ).toContain('이 로그는 읽을 수 없습니다');
    viewer.destroy();
  });
});

describe('createRepoOpsLogViewer polling', () => {
  test('asks again every few seconds while the record runs', async () => {
    const timers = manualTimers();
    const { viewer, fetchImpl } = viewerWith(
      [reply(logBody({ running: true }))],
      timers
    );
    await openOperation(viewer);

    await timers.fire();

    expect(timers.timers[0].ms).toBe(LOG_POLL_MS);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    viewer.destroy();
  });

  test('stops asking once the record is no longer running', async () => {
    const timers = manualTimers();
    const { viewer, fetchImpl } = viewerWith(
      [reply(logBody({ running: true })), reply(logBody({ running: false }))],
      timers
    );
    await openOperation(viewer);

    await timers.fire();

    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(timers.pending()).toBe(0);
    viewer.destroy();
  });

  test('stops asking when the popup closes', async () => {
    const timers = manualTimers();
    const { viewer } = viewerWith([reply(logBody({ running: true }))], timers);
    await openOperation(viewer);

    viewer.close();

    expect(timers.pending()).toBe(0);
    viewer.destroy();
  });

  test('stops asking when the log is gone', async () => {
    const timers = manualTimers();
    const { viewer } = viewerWith(
      [
        reply(logBody({ running: true })),
        reply({ ok: false, error: 'not_found' }, false)
      ],
      timers
    );
    await openOperation(viewer);

    await timers.fire();

    expect(timers.pending()).toBe(0);
    expect(
      document.querySelector('.repo-ops-script-viewer__status')?.textContent
    ).toContain('로그 파일을 찾을 수 없습니다');
    viewer.destroy();
  });

  test('keeps the last content and marks 갱신 실패 on a failed refresh', async () => {
    const timers = manualTimers();
    const { viewer } = viewerWith(
      [reply(logBody({ running: true })), new Error('offline')],
      timers
    );
    await openOperation(viewer);

    await timers.fire();

    expect(
      document.querySelector('.repo-ops-log-viewer__stale')?.textContent
    ).toBe('갱신 실패');
    expect(document.querySelector('.repo-ops-log-viewer__line')).not.toBeNull();
    expect(timers.pending()).toBe(1);
    viewer.destroy();
  });

  test('gives up after three failed refreshes and offers a reload', async () => {
    const timers = manualTimers();
    const { viewer, fetchImpl } = viewerWith(
      [reply(logBody({ running: true })), new Error('offline')],
      timers
    );
    await openOperation(viewer);

    await timers.fire();
    await timers.fire();
    await timers.fire();

    expect(fetchImpl).toHaveBeenCalledTimes(4);
    expect(timers.pending()).toBe(0);
    expect(
      document
        .querySelector('.repo-ops-log-viewer__reload')
        ?.textContent?.trim()
    ).toBe('다시 불러오기');
    viewer.destroy();
  });
});

describe('createRepoOpsLogViewer scroll follow', () => {
  /**
   * Give the scroll container a fixed geometry jsdom does not compute.
   *
   * @param {{ scrollTop: number }} position
   */
  function fakeGeometry(position) {
    const scroller = /** @type {HTMLElement} */ (
      document.querySelector('.repo-ops-log-viewer__scroll')
    );
    Object.defineProperty(scroller, 'scrollHeight', {
      configurable: true,
      get: () => 1000
    });
    Object.defineProperty(scroller, 'clientHeight', {
      configurable: true,
      get: () => 200
    });
    scroller.scrollTop = position.scrollTop;
    return scroller;
  }

  test('follows the bottom when the reader was at the bottom', async () => {
    const timers = manualTimers();
    const { viewer } = viewerWith([reply(logBody({ running: true }))], timers);
    await openOperation(viewer);
    const scroller = fakeGeometry({ scrollTop: 800 });

    await timers.fire();

    expect(scroller.scrollTop).toBe(1000);
    viewer.destroy();
  });

  test('keeps the position when the reader scrolled up', async () => {
    const timers = manualTimers();
    const { viewer } = viewerWith([reply(logBody({ running: true }))], timers);
    await openOperation(viewer);
    const scroller = fakeGeometry({ scrollTop: 300 });

    await timers.fire();

    expect(scroller.scrollTop).toBe(300);
    viewer.destroy();
  });
});
