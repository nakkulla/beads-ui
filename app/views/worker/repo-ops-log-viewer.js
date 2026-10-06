/**
 * The read-only popup for one repository-operation log (UI-i8cy §5.4).
 *
 * A sibling of the script popup: the same backdrop, panel, header and Escape /
 * focus contract, sharing its `repo-ops-script-viewer*` classes, with no syntax
 * coloring. The request names a workspace, a record source and the record id —
 * never a file path; the server reads the path its own record stores and
 * answers with the log split into attempts at the runner's boundary lines.
 *
 * While the record is still running the popup asks again every few seconds;
 * closing it, the record settling, or the log disappearing stops that. No new
 * snapshot subscription exists for this.
 */
import { html, render } from 'lit-html';
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../utils/toast.js';
import { formatElapsed } from './lanes.js';

/** How often a running log is asked for again. */
export const LOG_POLL_MS = 3000;

/** Consecutive failed refreshes after which polling gives up. */
export const LOG_POLL_FAILURE_LIMIT = 3;

/** How close to the bottom still counts as "reading the end". */
const BOTTOM_SLACK_PX = 4;

/**
 * @typedef {Object} RepoOpsLogOpenInput
 * @property {string} workspace
 * @property {'operation'|'cleanup'|'completion'} source
 * @property {string} id
 * @property {string} [path] - The path the card shows; the header uses it
 * until the server answers with the path it read.
 */

/**
 * @typedef {Object} LogAttemptView
 * @property {string|null} attempt_id
 * @property {number|null} started_at
 * @property {number|null} finished_at
 * @property {number|null} exit_code
 * @property {string|null} signal
 * @property {boolean} timed_out
 * @property {string[]} lines
 * @property {boolean} [body_truncated]
 */

/**
 * @typedef {Object} RepoOpsLogResponse
 * @property {string} path
 * @property {number} total_bytes
 * @property {number} truncated_bytes
 * @property {boolean} running
 * @property {string|null} [summary]
 * @property {boolean} [summary_prefix]
 * @property {string[]} preamble
 * @property {LogAttemptView[]} attempts
 */

/**
 * @typedef {Object} RepoOpsLogViewerOptions
 * @property {typeof fetch} [fetchImpl]
 * @property {() => number} [now]
 * @property {(fn: () => void, ms: number) => unknown} [setTimer]
 * @property {(handle: unknown) => void} [clearTimer]
 */

/**
 * @param {number} value
 */
function pad2(value) {
  return String(value).padStart(2, '0');
}

/**
 * When an attempt started or ended: `HH:MM:SS`, with the date in front when
 * that is not today, and the year too when it is not this year.
 *
 * @param {number} at
 * @param {number} now
 * @returns {string}
 */
export function formatAttemptClock(at, now) {
  const date = new Date(at);
  const today = new Date(now);
  const clock = `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(
    date.getSeconds()
  )}`;
  const same_day =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();
  if (same_day) {
    return clock;
  }
  const year =
    date.getFullYear() === today.getFullYear()
      ? ''
      : `${date.getFullYear()}년 `;
  return `${year}${date.getMonth() + 1}월 ${date.getDate()}일 ${clock}`;
}

/**
 * One attempt's header:
 * `시도 N · HH:MM:SS 시작 · HH:MM:SS 종료 · 7분 45초 · exit 1` — start, end,
 * duration and result (spec §3). An attempt with no end line says `진행 중` when
 * it is the live last attempt of a running record, otherwise `끝 기록 없음`.
 *
 * @param {LogAttemptView} attempt
 * @param {number} number - 1-based position among the start lines.
 * @param {{ live: boolean, now: number }} context
 * @returns {string}
 */
export function attemptHeaderText(attempt, number, context) {
  /** @type {string[]} */
  const parts = [`시도 ${number}`];
  if (typeof attempt.started_at === 'number') {
    parts.push(`${formatAttemptClock(attempt.started_at, context.now)} 시작`);
  }
  if (typeof attempt.finished_at !== 'number') {
    parts.push(context.live ? '진행 중' : '끝 기록 없음');
    return parts.join(' · ');
  }
  parts.push(`${formatAttemptClock(attempt.finished_at, context.now)} 종료`);
  if (typeof attempt.started_at === 'number') {
    parts.push(formatElapsed(attempt.finished_at - attempt.started_at));
  }
  if (attempt.timed_out) {
    parts.push('시간 초과');
  }
  if (typeof attempt.exit_code === 'number') {
    parts.push(`exit ${attempt.exit_code}`);
  } else if (attempt.signal) {
    parts.push(`signal ${attempt.signal}`);
  }
  return parts.join(' · ');
}

/**
 * The note at the top of a log whose front was cut.
 *
 * @param {number} truncated_bytes
 * @returns {string}
 */
export function truncationText(truncated_bytes) {
  const kb = Math.max(1, Math.round(truncated_bytes / 1024));
  return `앞부분 ${kb} KB 생략 — 전체는 경로로 확인`;
}

/**
 * Whether one log line is the line settlement chose as the failure summary.
 * Settlement trims the line and keeps at most a fixed number of characters,
 * so a summary the server flags as cut (`prefix`) matches the line it starts.
 * Both sides arrive already redacted and ANSI-free from the server.
 *
 * @param {string} line
 * @param {string|null|undefined} summary
 * @param {boolean} [prefix] - The server's `summary_prefix`: the summary may
 * be a cut prefix of its line.
 * @returns {boolean}
 */
export function isSummaryLine(line, summary, prefix = false) {
  if (typeof summary !== 'string' || summary.length === 0) {
    return false;
  }
  const trimmed = line.trim();
  if (trimmed === summary) {
    return true;
  }
  return prefix === true && trimmed.startsWith(summary);
}

/**
 * @param {string} code
 * @returns {string}
 */
function errorMessage(code) {
  /** @type {Record<string, string>} */
  const messages = {
    not_found: '로그 파일을 찾을 수 없습니다',
    forbidden: '이 로그는 읽을 수 없습니다',
    unreadable: '로그 파일을 읽지 못했습니다',
    bad_request: '로그 요청이 올바르지 않습니다'
  };
  return messages[code] || '로그를 불러오지 못했습니다';
}

/**
 * @param {unknown} value
 * @returns {RepoOpsLogResponse|null}
 */
function responseOf(value) {
  if (!value || typeof value !== 'object') {
    return null;
  }
  const data = /** @type {Record<string, any>} */ (value);
  if (data.ok !== true) {
    return null;
  }
  return {
    path: typeof data.path === 'string' ? data.path : '',
    total_bytes: Number(data.total_bytes) || 0,
    truncated_bytes: Number(data.truncated_bytes) || 0,
    running: data.running === true,
    summary: typeof data.summary === 'string' ? data.summary : null,
    summary_prefix: data.summary_prefix === true,
    preamble: Array.isArray(data.preamble) ? data.preamble.map(String) : [],
    attempts: Array.isArray(data.attempts) ? data.attempts : []
  };
}

/**
 * @param {RepoOpsLogViewerOptions} [options]
 */
export function createRepoOpsLogViewer(options = {}) {
  const doFetch = options.fetchImpl || globalThis.fetch?.bind(globalThis);
  const now = options.now || (() => Date.now());
  const setTimer =
    options.setTimer ||
    ((/** @type {() => void} */ fn, /** @type {number} */ ms) =>
      setTimeout(fn, ms));
  const clearTimer =
    options.clearTimer ||
    ((/** @type {unknown} */ handle) =>
      clearTimeout(/** @type {any} */ (handle)));
  const mount_element = document.createElement('div');
  mount_element.className = 'repo-ops-log-viewer-root';
  document.body.appendChild(mount_element);

  /** @type {RepoOpsLogOpenInput|null} */
  let current_input = null;
  /** @type {'loading'|'ready'|'error'} */
  let state = 'loading';
  /** @type {RepoOpsLogResponse|null} */
  let data = null;
  /** The last path the server confirmed; outlives a later `not_found`. */
  let known_path = '';
  let error_message = '';
  /** Whether the last refresh failed while older content stays on screen. */
  let stale = false;
  let poll_failures = 0;
  /** Whether polling gave up and the reload control is offered. */
  let offer_reload = false;
  let request_sequence = 0;
  /** @type {unknown} */
  let poll_timer = null;
  /** @type {Map<number, boolean>} */
  const fold_overrides = new Map();
  /** @type {HTMLElement|null} */
  let restore_target = null;
  let keydown_attached = false;

  /** The scroll container of the log body, when drawn. */
  function scroller() {
    return /** @type {HTMLElement|null} */ (
      mount_element.querySelector('.repo-ops-log-viewer__scroll')
    );
  }

  /**
   * @param {number} index
   * @param {number} count
   */
  function isOpenAttempt(index, count) {
    const override = fold_overrides.get(index);
    if (typeof override === 'boolean') {
      return override;
    }
    return index === count - 1;
  }

  /**
   * @param {string} line
   * @param {RepoOpsLogResponse} log - Carries the summary to highlight.
   */
  function lineTemplate(line, log) {
    const hit = isSummaryLine(line, log.summary, log.summary_prefix);
    return html`<div
      class="repo-ops-log-viewer__line${hit
        ? ' repo-ops-log-viewer__line--summary'
        : ''}"
    >
      ${line}
    </div>`;
  }

  /**
   * @param {LogAttemptView} attempt
   * @param {RepoOpsLogResponse} log
   */
  function attemptBody(attempt, log) {
    if (attempt.body_truncated === true) {
      return html`<div class="repo-ops-log-viewer__note">
        본문은 앞부분 생략에 포함됨
      </div>`;
    }
    return (Array.isArray(attempt.lines) ? attempt.lines : []).map((line) =>
      lineTemplate(String(line), log)
    );
  }

  /**
   * @param {RepoOpsLogResponse} log
   */
  function logTemplate(log) {
    const count = log.attempts.length;
    const clock = now();
    const attempts = log.attempts.map((attempt, index) => {
      const header = attemptHeaderText(attempt, index + 1, {
        live: log.running && index === count - 1,
        now: clock
      });
      if (count === 1) {
        return html`<section class="repo-ops-log-viewer__attempt">
          <div class="repo-ops-log-viewer__attempt-head">${header}</div>
          ${attemptBody(attempt, log)}
        </section>`;
      }
      return html`<details
        class="repo-ops-log-viewer__attempt"
        .open=${isOpenAttempt(index, count)}
        @toggle=${(/** @type {Event} */ event) => {
          // Only a reader's fold is remembered: the render's own open state
          // also fires `toggle`, and recording it would pin an old "last".
          const opened = /** @type {HTMLDetailsElement} */ (event.currentTarget)
            .open;
          if (opened === (index === count - 1)) {
            fold_overrides.delete(index);
          } else {
            fold_overrides.set(index, opened);
          }
        }}
      >
        <summary class="repo-ops-log-viewer__attempt-head">${header}</summary>
        ${attemptBody(attempt, log)}
      </details>`;
    });
    const empty = count === 0 && log.preamble.length === 0;
    return html`<div class="repo-ops-log-viewer__scroll" tabindex="0">
      ${log.truncated_bytes > 0
        ? html`<div class="repo-ops-log-viewer__note">
            ${truncationText(log.truncated_bytes)}
          </div>`
        : ''}
      ${log.preamble.map((line) => lineTemplate(line, log))} ${attempts}
      ${empty
        ? html`<div class="repo-ops-log-viewer__note">
            로그가 비어 있습니다
          </div>`
        : ''}
    </div>`;
  }

  /** Render current modal state. */
  function template() {
    if (!current_input) {
      return html``;
    }
    const shown_path = known_path || current_input.path || '';
    return html`<div
      class="repo-ops-script-viewer repo-ops-log-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`로그: ${shown_path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${() => close()}
      ></div>
      <section class="repo-ops-script-viewer__panel">
        <header class="repo-ops-script-viewer__header">
          <div class="repo-ops-script-viewer__identity">
            <span class="repo-ops-script-viewer__path" title=${shown_path}
              >${shown_path}</span
            >
            ${stale
              ? html`<span class="repo-ops-log-viewer__stale">갱신 실패</span>`
              : ''}
          </div>
          <div class="repo-ops-script-viewer__actions">
            ${offer_reload
              ? html`<button
                  type="button"
                  class="op-btn repo-ops-log-viewer__reload"
                  @click=${() => reload()}
                >
                  다시 불러오기
                </button>`
              : ''}
            <button
              type="button"
              class="op-btn op-btn--icon repo-ops-log-viewer__copy"
              title="로그 경로 복사"
              aria-label=${`로그 경로 복사: ${shown_path}`}
              ?disabled=${shown_path.length === 0}
              @click=${() => void copyPath(shown_path)}
            >
              ⧉
            </button>
            <button
              type="button"
              class="op-btn op-btn--icon repo-ops-script-viewer__close repo-ops-log-viewer__close"
              aria-label="로그 팝업 닫기"
              @click=${() => close()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${state === 'ready' && data
            ? logTemplate(data)
            : state === 'loading'
              ? html`<div class="repo-ops-script-viewer__status">
                  로그 불러오는 중…
                </div>`
              : html`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${error_message}
                </div>`}
        </div>
      </section>
    </div>`;
  }

  /** Commit current modal state to its body mount. */
  function doRender() {
    render(template(), mount_element);
  }

  /**
   * Re-render, following the bottom only when the reader was already there.
   *
   * @param {boolean} first - The first content render scrolls to the end.
   */
  function renderKeepingScroll(first) {
    const before = scroller();
    const at_bottom =
      first ||
      !before ||
      before.scrollTop + before.clientHeight >=
        before.scrollHeight - BOTTOM_SLACK_PX;
    doRender();
    const after = scroller();
    if (after && at_bottom) {
      after.scrollTop = after.scrollHeight;
    }
  }

  /**
   * @param {string} value
   */
  async function copyPath(value) {
    if (!value) {
      return;
    }
    const copied = await copyToClipboard(value);
    showToast(
      copied ? '복사됨' : '복사 실패',
      copied ? 'success' : 'error',
      1200
    );
  }

  /** Cancel a scheduled refresh. */
  function stopPolling() {
    if (poll_timer !== null) {
      clearTimer(poll_timer);
      poll_timer = null;
    }
  }

  /**
   * @param {number} sequence
   */
  function schedulePoll(sequence) {
    stopPolling();
    poll_timer = setTimer(() => {
      poll_timer = null;
      if (sequence === request_sequence && current_input) {
        void load(sequence);
      }
    }, LOG_POLL_MS);
  }

  /**
   * A refresh that did not reach an answer (network, server error). Older
   * content stays; a running log keeps polling until the failure limit.
   *
   * @param {number} sequence
   */
  function onTransportFailure(sequence) {
    poll_failures += 1;
    if (!data) {
      state = 'error';
      error_message = errorMessage('');
      offer_reload = true;
      doRender();
      return;
    }
    stale = true;
    if (data.running && poll_failures < LOG_POLL_FAILURE_LIMIT) {
      doRender();
      schedulePoll(sequence);
      return;
    }
    offer_reload = true;
    doRender();
  }

  /**
   * @param {number} sequence
   */
  async function load(sequence) {
    const input = current_input;
    if (!input) {
      return;
    }
    if (!doFetch) {
      state = 'error';
      error_message = errorMessage('');
      doRender();
      return;
    }
    const url =
      '/api/repo-ops-log?workspace=' +
      encodeURIComponent(input.workspace) +
      '&source=' +
      encodeURIComponent(input.source) +
      '&id=' +
      encodeURIComponent(input.id);
    /** @type {any} */
    let body = null;
    let status_ok = false;
    try {
      const response = await doFetch(url, { cache: 'no-store' });
      status_ok = response.ok;
      body = await response.json().catch(() => null);
    } catch {
      body = null;
      status_ok = false;
    }
    if (sequence !== request_sequence || !current_input) {
      return;
    }
    const parsed = status_ok ? responseOf(body) : null;
    if (parsed) {
      const first = data === null;
      data = parsed;
      known_path = parsed.path || known_path;
      state = 'ready';
      stale = false;
      poll_failures = 0;
      offer_reload = false;
      renderKeepingScroll(first);
      if (parsed.running) {
        schedulePoll(sequence);
      }
      return;
    }
    const code =
      body && typeof body === 'object' && typeof body.error === 'string'
        ? body.error
        : '';
    if (code) {
      // The record or file answered for itself: nothing to wait for.
      state = 'error';
      error_message = errorMessage(code);
      stale = false;
      offer_reload = false;
      data = null;
      doRender();
      return;
    }
    onTransportFailure(sequence);
  }

  /** Ask again after polling gave up. */
  function reload() {
    stopPolling();
    poll_failures = 0;
    offer_reload = false;
    const sequence = ++request_sequence;
    doRender();
    void load(sequence);
  }

  /**
   * @param {KeyboardEvent} event
   */
  function onKeydown(event) {
    if (event.key === 'Escape' && current_input) {
      event.preventDefault();
      close();
    }
  }

  /** Listen for Escape only while the modal is open. */
  function startKeydownListener() {
    if (!keydown_attached) {
      document.addEventListener('keydown', onKeydown);
      keydown_attached = true;
    }
  }

  /** Drop the modal-scoped Escape listener. */
  function stopKeydownListener() {
    if (keydown_attached) {
      document.removeEventListener('keydown', onKeydown);
      keydown_attached = false;
    }
  }

  /**
   * @param {RepoOpsLogOpenInput} input
   * @param {HTMLElement|null} [trigger_element]
   */
  async function open(input, trigger_element = null) {
    stopPolling();
    const sequence = ++request_sequence;
    startKeydownListener();
    current_input = { ...input };
    restore_target =
      trigger_element ||
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null);
    state = 'loading';
    data = null;
    known_path = '';
    error_message = '';
    stale = false;
    poll_failures = 0;
    offer_reload = false;
    fold_overrides.clear();
    doRender();
    const close_button = /** @type {HTMLElement|null} */ (
      mount_element.querySelector('.repo-ops-log-viewer__close')
    );
    close_button?.focus();
    await load(sequence);
  }

  /**
   * Open from a `[로그 보기]` control's data attributes (delegated click).
   *
   * @param {HTMLElement} control
   * @returns {boolean} false when the control lacks its material.
   */
  function openFrom(control) {
    const workspace = control.dataset.workspace || '';
    const source = control.dataset.logSource || '';
    const id = control.dataset.logId || '';
    if (
      !workspace ||
      !id ||
      (source !== 'operation' &&
        source !== 'cleanup' &&
        source !== 'completion')
    ) {
      return false;
    }
    void open(
      { workspace, source, id, path: control.dataset.logPath || '' },
      control
    );
    return true;
  }

  /** Close the modal and return focus to its opening control. */
  function close() {
    request_sequence += 1;
    stopPolling();
    stopKeydownListener();
    const was_open = current_input !== null;
    current_input = null;
    data = null;
    doRender();
    const target = restore_target;
    restore_target = null;
    if (was_open && target?.isConnected) {
      target.focus();
    }
  }

  /** Remove listeners and the body-level mount. */
  function destroy() {
    close();
    mount_element.remove();
  }

  return {
    open,
    openFrom,
    close,
    destroy,
    /** @returns {boolean} */
    isOpen: () => current_input !== null,
    /** @returns {string} The workspace the open popup reads, or ''. */
    workspace: () => (current_input ? current_input.workspace : '')
  };
}
