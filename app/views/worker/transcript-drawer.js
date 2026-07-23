/**
 * Session transcript drawer (spec §5.6, mockup `worker-session-log.html`).
 *
 * A running tile (or a session-history row) opens this drawer BELOW the running
 * grid — lanes push down, not a modal overlay. It subscribes to the live append
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
import { showToast } from '../../utils/toast.js';
import { parseTranscript } from './transcript-render.js';

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
 *   sessionLogStore?: { get: (id: string) => { lines: unknown[] } | null, subscribe: (fn: () => void) => () => void },
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
  /** @type {null | (() => void)} */
  let storeOff = null;

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
    return html`<div class="sv" data-attempt-id=${attempt_id}>
      <div class="sv__bar">
        <span class="sv__id">${attempt_id}</span>
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
          : lines.map((l, i) => lineTemplate(i, l))}
      </div>
    </div>`;
  }

  function doRender() {
    render(template(), mount_element);
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
