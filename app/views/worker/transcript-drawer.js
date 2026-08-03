/**
 * Session transcript drawer (spec §5.6, mockup `worker-session-log.html`).
 *
 * A running tile (or a session-history row) opens this drawer as a modal
 * overlay above the lanes — the host owns the overlay/backdrop chrome, the
 * drawer only renders its own bar+body. It subscribes to the live append
 * stream via `subscribe-session-log` (server pushes a snapshot then per-event
 * appends into `sessionLogStore`), parses the raw stream with `parseTranscript`,
 * and renders assistant / tool / gate / phase / result / error lines. The same
 * viewer opens a Done/Failed session's persisted log (snapshot-only — no
 * appends ever fire for a finished attempt).
 *
 * Live-follow: the `⇣` pill auto-scrolls to the tail on each append while ON;
 * a manual scroll-up flips it OFF; clicking the pill toggles it back.
 */
import { html, render } from 'lit-html';
import { copyToClipboard } from '../../utils/clipboard.js';
import { formatRelativeTime } from '../../utils/relative-time.js';
import { showToast } from '../../utils/toast.js';
import { parseTranscript } from './transcript-render.js';

/** A run of this many identical tool lines collapses into one group. */
const FOLD_AT = 5;

/**
 * How long ago the session last moved, in the drawer's second-level register
 * (UI-rkly §2). `formatRelativeTime` floors everything under a minute to
 * "방금", which is exactly the resolution a heartbeat needs to show.
 *
 * @param {number|null|undefined} at - Epoch ms.
 * @param {number} now_ms
 * @returns {string}
 */
function formatAgo(at, now_ms) {
  if (typeof at !== 'number') {
    return '';
  }
  const seconds = Math.max(0, Math.floor((now_ms - at) / 1000));
  return seconds < 60 ? `${seconds}초 전` : formatRelativeTime(at, now_ms);
}

/**
 * @typedef {Object} DrawerMeta
 * @property {string} [runner] - claude/codex/ccx.
 * @property {string} [model]
 * @property {string} [effort]
 * @property {string} [worktree] - Worktree path shown in the bar.
 * @property {string} [status] - running/done/failed (for the bar label).
 * @property {string} [session_id] - Runner session id (claude session_id /
 * codex thread_id) for `--resume`; shown short (first 8) + click-to-copy (§2).
 */

/**
 * @param {HTMLElement} mount_element
 * @param {{
 *   transport?: (type: string, payload?: unknown) => Promise<any>,
 *   sessionLogStore?: { get: (id: string) => { lines: unknown[], last_event_at?: number|null } | null, subscribe: (fn: () => void) => () => void },
 *   onClose?: () => void
 * }} [options]
 * @returns {{ open: (input: { attempt_id: string, meta?: DrawerMeta }) => void, updateMeta: (meta: DrawerMeta) => void, close: () => void, isOpen: () => boolean, destroy: () => void }}
 */
export function createTranscriptDrawer(mount_element, options = {}) {
  const { transport, sessionLogStore, onClose } = options;

  /** @type {string | null} */
  let attempt_id = null;
  /** @type {DrawerMeta} */
  let meta = {};
  let follow = true;
  /** @type {Set<number>} */
  const expanded = new Set();
  /** @type {Set<number>} */
  const unfolded = new Set();
  /** @type {null | (() => void)} */
  let storeOff = null;
  /** @type {ReturnType<typeof setInterval> | null} */
  let heartbeat = null;

  /**
   * @returns {import('./transcript-render.js').DisplayLine[]}
   */
  function currentLines() {
    if (!attempt_id || !sessionLogStore) {
      return [];
    }
    const rec = sessionLogStore.get(attempt_id);
    return parseTranscript(rec ? rec.lines : []);
  }

  /**
   * When the session last moved (epoch ms), or null for a log with no known
   * time (an old snapshot, or a store without the field).
   *
   * @returns {number|null}
   */
  function lastEventAt() {
    if (!attempt_id || !sessionLogStore) {
      return null;
    }
    const rec = sessionLogStore.get(attempt_id);
    const at = rec ? rec.last_event_at : null;
    return typeof at === 'number' ? at : null;
  }

  function isLive() {
    return meta.status === 'running';
  }

  /**
   * The heartbeat's elapsed label has to move on its own — a session can go
   * minutes without emitting an event, and a frozen "3초 전" reads as a dead
   * drawer. Only a live attempt gets the ticker, and it stops the moment the
   * attempt stops being live (or the drawer closes).
   */
  function syncHeartbeat() {
    if (isLive() && attempt_id) {
      if (!heartbeat) {
        heartbeat = setInterval(() => doRender(), 1000);
      }
      return;
    }
    stopHeartbeat();
  }

  function stopHeartbeat() {
    if (heartbeat) {
      clearInterval(heartbeat);
      heartbeat = null;
    }
  }

  /**
   * Group consecutive same-tool lines so a 30-file read sweep does not bury the
   * one line that says what the session is doing. Anything shorter than
   * {@link FOLD_AT} renders as before — folding two lines hides more than it
   * saves.
   *
   * @param {import('./transcript-render.js').DisplayLine[]} lines
   * @returns {Array<{ kind: 'line', idx: number, line: import('./transcript-render.js').DisplayLine } | { kind: 'group', idx: number, tool: string, lines: Array<{ idx: number, line: import('./transcript-render.js').DisplayLine }> }>}
   */
  function segmentsOf(lines) {
    /** @type {any[]} */
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.kind === 'tool') {
        let j = i;
        while (
          j < lines.length &&
          lines[j].kind === 'tool' &&
          lines[j].tool === line.tool
        ) {
          j += 1;
        }
        if (j - i >= FOLD_AT && !unfolded.has(i)) {
          out.push({
            kind: 'group',
            idx: i,
            tool: line.tool || '',
            lines: lines.slice(i, j).map((l, k) => ({ idx: i + k, line: l }))
          });
          i = j;
          continue;
        }
      }
      out.push({ kind: 'line', idx: i, line });
      i += 1;
    }
    return out;
  }

  /**
   * The tool line the session is inside right now: the last tool line that
   * never got its result back. A finished session (a `result` line landed)
   * has none by definition.
   *
   * Completion is the PRESENCE of `result`, not its truthiness — a tool that
   * finished with empty output would otherwise look pending forever. And tools
   * do not always finish in order (one turn can open several), so a completed
   * tail tool means keep looking, not stop.
   *
   * @param {import('./transcript-render.js').DisplayLine[]} lines
   * @returns {import('./transcript-render.js').DisplayLine | null}
   */
  function pendingTool(lines) {
    for (let i = lines.length - 1; i >= 0; i -= 1) {
      const line = lines[i];
      if (line.kind === 'result' || line.kind === 'error') {
        return null;
      }
      if (line.kind === 'tool' && !Object.hasOwn(line, 'result')) {
        return line;
      }
    }
    return null;
  }

  /**
   * @param {number} idx
   * @param {import('./transcript-render.js').DisplayLine} line
   * @returns {import('lit-html').TemplateResult | string}
   */
  function lineTemplate(idx, line) {
    if (line.kind === 'gate') {
      return html`<div class="sv__gate">${line.text}</div>`;
    }
    if (line.kind === 'phase') {
      return html`<div class="sv__phase">${line.text}</div>`;
    }
    if (line.kind === 'result') {
      return html`<div
        class="sv__result${line.success
          ? ' sv__result--ok'
          : ' sv__result--fail'}"
      >
        ${line.success ? '✓' : '✗'}
        ${line.text || (line.success ? 'DONE' : '실패')}
      </div>`;
    }
    if (line.kind === 'error') {
      return html`<div class="sv__error">⛔ ${line.text}</div>`;
    }
    if (line.kind === 'blocker') {
      return html`<div class="sv__error">⛔ ${line.text}</div>`;
    }
    if (line.kind === 'tool') {
      const is_expanded = expanded.has(idx);
      const detail =
        line.tool === 'Bash' ? line.command : line.path || line.command || '';
      return html`<div
        class="sv__tool${is_expanded ? ' sv__tool--expanded' : ''}"
        role="button"
        tabindex="0"
        @click=${() => toggleExpand(idx)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${line.icon}</span>
          <span class="sv__tool-name">${line.tool}</span>
          ${detail ? html`<span class="sv__tool-detail">${detail}</span>` : ''}
          ${typeof line.added === 'number'
            ? html`<span class="sv__diff-add">+${line.added}</span>`
            : ''}
          ${typeof line.removed === 'number'
            ? html`<span class="sv__diff-del">−${line.removed}</span>`
            : ''}
          ${line.result
            ? html`<span class="sv__tool-ok">→ ${line.result}</span>`
            : ''}
        </span>
        ${is_expanded
          ? html`<pre class="sv__tool-expand">${expandBody(line)}</pre>`
          : ''}
      </div>`;
    }
    // assistant
    return html`<div class="sv__as">${line.text}</div>`;
  }

  /**
   * @param {import('./transcript-render.js').DisplayLine} line
   * @returns {string}
   */
  function expandBody(line) {
    const parts = [];
    if (line.input !== undefined) {
      try {
        parts.push(`input: ${JSON.stringify(line.input, null, 2)}`);
      } catch {
        /* ignore */
      }
    }
    if (typeof line.output === 'string' && line.output.length > 0) {
      parts.push(`output:\n${line.output}`);
    }
    return parts.join('\n\n');
  }

  function template() {
    if (!attempt_id) {
      return html``;
    }
    const lines = currentLines();
    // runner/model/effort stay inline; the worktree path is its own element so
    // ≤640px can hide it (title keeps the full path) without dropping the rest.
    const metaBits = [meta.runner, meta.model, meta.effort]
      .filter(Boolean)
      .join(' · ');
    const session_id = meta.session_id || '';
    const follow_label = `라이브 따라가기 ${follow ? 'ON' : 'OFF'}`;
    const live = isLive();
    const ago = live ? formatAgo(lastEventAt(), Date.now()) : '';
    // Only a live attempt has a "지금" — a paused or finished session's dangling
    // tool line is history, and pinning it would claim work that is not running.
    const pending = live ? pendingTool(lines) : null;
    return html`<div class="sv" data-attempt-id=${attempt_id}>
      <div class="sv__bar">
        <span class="sv__id">${attempt_id}</span>
        ${live
          ? html`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ago ? `진행 중 · 마지막 이벤트 ${ago}` : '진행 중'}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ago
                ? html`<span class="sv__live-ago">${ago}</span>`
                : ''}</span
            >`
          : ''}
        ${session_id
          ? html`<button
              type="button"
              class="sv__session"
              title=${session_id}
              aria-label=${`세션 ID 복사: ${session_id}`}
              @click=${() => copySession(session_id)}
            >
              ⧉ ${session_id.slice(0, 8)}
            </button>`
          : ''}
        ${metaBits ? html`<span class="sv__meta">${metaBits}</span>` : ''}
        ${meta.worktree
          ? html`<span class="sv__wt" title=${meta.worktree}
              >${meta.worktree}</span
            >`
          : ''}
        <button
          type="button"
          class="sv__follow${follow ? ' sv__follow--on' : ''}"
          aria-pressed=${follow ? 'true' : 'false'}
          aria-label=${follow_label}
          @click=${toggleFollow}
        >
          <span class="sv__follow-full">⇣ ${follow_label}</span>
          <span class="sv__follow-short">⇣ ${follow ? 'ON' : 'OFF'}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${() => close()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${lines.length === 0
          ? html`<div class="sv__empty">세션 로그 없음</div>`
          : segmentsOf(lines).map((seg) =>
              seg.kind === 'group'
                ? groupTemplate(seg)
                : lineTemplate(seg.idx, seg.line)
            )}
      </div>
      ${pending
        ? html`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            <span class="sv__now-icon">${pending.icon}</span>
            <span class="sv__now-name">${pending.tool}</span>
            <span class="sv__now-detail"
              >${pending.tool === 'Bash'
                ? pending.command
                : pending.path || pending.command || ''}</span
            >
          </div>`
        : ''}
    </div>`;
  }

  /**
   * @param {{ idx: number, tool: string, lines: Array<{ idx: number, line: import('./transcript-render.js').DisplayLine }> }} seg
   */
  function groupTemplate(seg) {
    return html`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${() => unfoldGroup(seg.idx)}
    >
      <span class="sv__group-icon">${seg.lines[0].line.icon}</span>
      <span class="sv__group-name">${seg.tool}</span>
      <span class="sv__group-count">${seg.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`;
  }

  /**
   * @param {number} idx
   */
  function unfoldGroup(idx) {
    unfolded.add(idx);
    doRender();
  }

  function doRender() {
    render(template(), mount_element);
    syncHeartbeat();
    if (follow) {
      scrollToTail();
    }
  }

  function scrollToTail() {
    const body = mount_element.querySelector('.sv__body');
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }

  /**
   * @param {number} idx
   */
  function toggleExpand(idx) {
    if (expanded.has(idx)) {
      expanded.delete(idx);
    } else {
      expanded.add(idx);
    }
    doRender();
  }

  function toggleFollow() {
    follow = !follow;
    doRender();
  }

  /**
   * Copy the full session id to the clipboard (Board `복사됨`/`복사 실패` toast
   * convention).
   *
   * @param {string} value
   */
  function copySession(value) {
    void copyToClipboard(value).then((ok) => {
      if (ok) {
        showToast('복사됨', 'success', 1200);
      } else {
        showToast('복사 실패', 'error', 1600);
      }
    });
  }

  /**
   * Merge fresh meta into the open drawer (spec §2 late arrival): the session id
   * lands on the stream's first event, so a drawer opened before that must be
   * refreshed from the attempt record without re-opening (which would reset
   * follow/expand state).
   *
   * @param {DrawerMeta} next
   */
  function updateMeta(next) {
    if (!attempt_id || !next) {
      return;
    }
    meta = { ...meta, ...next };
    doRender();
  }

  /**
   * A manual scroll-up (away from the tail) auto-disables live-follow.
   *
   * @param {Event} ev
   */
  function onScroll(ev) {
    const body = /** @type {HTMLElement} */ (ev.target);
    if (!body || !body.classList || !body.classList.contains('sv__body')) {
      return;
    }
    const atBottom =
      body.scrollHeight - body.scrollTop - body.clientHeight <= 4;
    if (!atBottom && follow) {
      follow = false;
      doRender();
    }
  }

  mount_element.addEventListener('scroll', onScroll, true);

  /**
   * @param {{ attempt_id: string, meta?: DrawerMeta }} input
   */
  function open(input) {
    const next_id = input && input.attempt_id;
    if (!next_id) {
      return;
    }
    attempt_id = next_id;
    meta = input.meta || {};
    follow = true;
    expanded.clear();
    unfolded.clear();
    if (!storeOff && sessionLogStore) {
      storeOff = sessionLogStore.subscribe(doRender);
    }
    if (transport) {
      void Promise.resolve(
        transport('subscribe-session-log', {
          id: `session-log:${attempt_id}`,
          attempt_id
        })
      ).catch(() => {});
    }
    doRender();
  }

  function close() {
    const id = attempt_id;
    attempt_id = null;
    expanded.clear();
    unfolded.clear();
    stopHeartbeat();
    if (transport && id) {
      void Promise.resolve(
        transport('unsubscribe-session-log', { id: `session-log:${id}` })
      ).catch(() => {});
    }
    render(html``, mount_element);
    if (onClose) {
      onClose();
    }
  }

  return {
    open,
    updateMeta,
    close,
    isOpen() {
      return attempt_id !== null;
    },
    destroy() {
      stopHeartbeat();
      if (storeOff) {
        storeOff();
        storeOff = null;
      }
      mount_element.removeEventListener('scroll', onScroll, true);
      attempt_id = null;
      render(html``, mount_element);
    }
  };
}
