/**
 * Session transcript drawer (spec §5.6, mockup `worker-session-log.html`).
 *
 * A running tile (or a session-history row) opens this drawer as a modal
 * overlay above the lanes — the host owns the overlay/backdrop chrome, the
 * drawer only renders its own bar+body. It subscribes to the live append
 * stream via `subscribe-session-log` (server pushes a snapshot then per-event
 * appends into `sessionLogStore`), parses the raw stream with `parseTranscript`,
 * and renders assistant / thinking / tool / gate / phase / result / error lines.
 * The same viewer opens a Done/Failed session's persisted log (snapshot-only —
 * no appends ever fire for a finished attempt).
 *
 * Readability (UI-dixx): assistant and result bodies are markdown, so they go
 * through `renderMarkdown` (marked + DOMPurify) instead of `pre-wrap`; thinking
 * blocks — the only place a session says *why* — show as a dim one-liner that
 * expands; and the bar carries a current-stage chip sourced in three tiers
 * (see {@link stageOf}).
 *
 * Live-follow: the `⇣` pill auto-scrolls to the tail on each append while ON;
 * a manual scroll-up flips it OFF; clicking the pill toggles it back.
 *
 * Conversation view (UI-2dbn): what the session said is the main line, and each
 * run of tool/thinking lines between two narrative lines sits in one work
 * bundle whose summary a past bundle collapses to (see {@link blocksOf}).
 */
import { html } from 'lit-html';
import { copyWithToast } from '../../ui/copy.js';
import { copyIcon } from '../../ui/icons.js';
import {
  formatRecordedAt,
  promptBlockTemplate,
  promptStatusTemplate
} from '../../ui/prompt-block.js';
import { render } from '../../ui/render.js';
import {
  finishedState,
  firstLineOf,
  formatAgo,
  lastThinking,
  pendingTool,
  stageOf
} from './transcript-blocks.js';
import { parseTranscript } from './transcript-render.js';
import { bodyTemplate } from './transcript-view.js';

/**
 * @import { DisplayLine } from './transcript-render.js'
 */

/**
 * @typedef {import('../../utils/session-ref.js').DrawerMeta} DrawerMeta
 */

/**
 * One interactive session's transcript, addressed by the bead that recorded it
 * (UI-4xzk §4.3). Carried verbatim into the subscribe payload — the server
 * authorizes the read against that bead's own `session_ref` value.
 *
 * @typedef {Object} DrawerSessionRef
 * @property {string} bead_id
 * @property {string} provider
 * @property {string} session_id
 */

/**
 * @typedef {Object} DrawerOpenInput
 * @property {string} attempt_id
 * @property {string} [launch_id]
 * @property {DrawerSessionRef} [session_ref]
 * @property {string} [root_dir]
 * @property {DrawerMeta} [meta]
 * @property {boolean} [hide_prompt]
 */

/**
 * @param {HTMLElement} mount_element
 * @param {{
 *   transport?: (type: string, payload?: unknown) => Promise<any>,
 *   sessionLogStore?: { get: (id: string) => { lines: unknown[], last_event_at?: number|null } | null, subscribe: (fn: () => void) => () => void },
 *   onClose?: () => void
 * }} [options]
 * @returns {{ open: (input: DrawerOpenInput) => void, updateMeta: (meta: DrawerMeta) => void, close: () => void, isOpen: () => boolean, destroy: () => void }}
 */
export function createTranscriptDrawer(mount_element, options = {}) {
  const { transport, sessionLogStore, onClose } = options;

  /** @type {string | null} */
  let attempt_id = null;
  /** @type {string | null} */
  let launch_id = null;
  /**
   * The interactive session this drawer opened, when it opened one instead of
   * an attempt (UI-4xzk §6.2).
   *
   * @type {DrawerSessionRef | null}
   */
  let session_ref = null;
  /** @type {string | null} */
  let subscription_id = null;
  /**
   * Which workspace the open attempt belongs to (UI-eey2 §9.5). The monitor
   * opens sessions of repos this connection is NOT pointed at, so both reads
   * carry it; absent keeps the server's own connection scope.
   *
   * @type {string | null}
   */
  let root_dir = null;
  /**
   * Whether the attempt-prompt toggle is suppressed for this session. An
   * analyzer run has a run id, not an attempt id, so `get-attempt-prompt` would
   * answer "기록 없음" for a prompt that is actually stored under the analysis
   * channel — the opener owns that surface instead.
   *
   * @type {boolean}
   */
  let hide_prompt = false;
  /** @type {DrawerMeta} */
  let meta = {};
  let follow = true;
  /** @type {Set<number>} */
  const expanded = new Set();
  /** @type {Set<number>} */
  const unfolded = new Set();
  /**
   * Work bundles the reader opened or closed, keyed by the bundle's first
   * segment idx. A choice here outlives re-renders and beats the default rule.
   *
   * @type {Map<number, boolean>}
   */
  const bundle_open = new Map();
  /** @type {null | (() => void)} */
  let storeOff = null;
  /** @type {ReturnType<typeof setInterval> | null} */
  let heartbeat = null;
  // The attempt's recorded send (UI-rxp3 §5), collapsed by default and fetched
  // on first expand. Scoped to the open attempt: opening another one drops it.
  let prompt_expanded = false;
  let prompt_loading = false;
  let prompt_error = false;
  /** @type {any} */
  let prompt_data = null;
  /** @type {string|null} */
  let prompt_loaded_for = null;

  function resetPrompt() {
    prompt_expanded = false;
    prompt_loading = false;
    prompt_error = false;
    prompt_data = null;
    prompt_loaded_for = null;
  }

  /**
   * Fetch the open attempt's send. Workspace scope is the server's: the request
   * resolves against the connection's verified workspace, the same one
   * `subscribe-session-log` reads, so an attempt of another workspace simply
   * comes back missing.
   *
   * @param {string} id
   */
  async function fetchPrompt(id) {
    if (!transport) {
      return;
    }
    prompt_loading = true;
    prompt_error = false;
    doRender();
    try {
      const res = await Promise.resolve(
        transport('get-attempt-prompt', {
          attempt_id: id,
          ...(root_dir ? { root_dir } : {})
        })
      );
      if (attempt_id !== id) {
        return;
      }
      if (!res || typeof res !== 'object' || Array.isArray(res)) {
        prompt_error = true;
      } else {
        prompt_data = res;
        prompt_loaded_for = id;
      }
    } catch {
      if (attempt_id === id) {
        prompt_error = true;
      }
    } finally {
      if (attempt_id === id) {
        prompt_loading = false;
        doRender();
      }
    }
  }

  function togglePrompt() {
    prompt_expanded = !prompt_expanded;
    if (prompt_expanded && attempt_id && prompt_loaded_for !== attempt_id) {
      void fetchPrompt(attempt_id);
      return;
    }
    doRender();
  }

  /**
   * The sent-prompt panel under the bar. Rendered only while expanded — the body is
   * the transcript's, and a prompt pinned above it would push the log down.
   *
   * @returns {import('lit-html').TemplateResult|''}
   */
  function promptTemplate() {
    if (!prompt_expanded) {
      return '';
    }
    const status = promptStatusTemplate({
      loading: prompt_loading,
      error: prompt_error
    });
    if (status) {
      return html`<div class="sv__prompt" data-seam="attempt-prompt">
        ${status}
      </div>`;
    }
    if (!prompt_data) {
      return '';
    }
    if (prompt_data.missing) {
      return html`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;
    }
    const recorded_at = formatRecordedAt(prompt_data.recorded_at);
    return html`<div class="sv__prompt" data-seam="attempt-prompt">
      ${recorded_at
        ? html`<div class="prompt-block__meta">${recorded_at} 발송</div>`
        : ''}
      ${typeof prompt_data.task_prompt === 'string'
        ? promptBlockTemplate('과업 (user)', prompt_data.task_prompt)
        : ''}
      ${typeof prompt_data.system_prompt === 'string'
        ? promptBlockTemplate(
            '시스템 계약 (--append-system-prompt)',
            prompt_data.system_prompt
          )
        : ''}
    </div>`;
  }

  /**
   * @returns {DisplayLine[]}
   */
  function currentLines() {
    if (!subscription_id || !sessionLogStore) {
      return [];
    }
    const rec = sessionLogStore.get(subscription_id);
    return parseTranscript(rec ? rec.lines : []);
  }

  /**
   * When the session last moved (epoch ms), or null for a log with no known
   * time (an old snapshot, or a store without the field).
   *
   * @returns {number|null}
   */
  function lastEventAt() {
    if (!subscription_id || !sessionLogStore) {
      return null;
    }
    const rec = sessionLogStore.get(subscription_id);
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

  /** @type {import('./transcript-view.js').TranscriptView} */
  const view = {
    expanded,
    unfolded,
    bundle_open,
    toggleExpand: (idx) => toggleExpand(idx),
    toggleBundle: (idx, is_open) => toggleBundle(idx, is_open),
    unfoldGroup: (idx) => unfoldGroup(idx)
  };

  function template() {
    if (!attempt_id) {
      return html``;
    }
    const lines = currentLines();
    // runner/model/effort stay inline; the worktree path is its own element so
    // ≤640px can hide it (title keeps the full path) without dropping the rest.
    const metaBits = (
      launch_id
        ? [meta.agent_type, meta.model, meta.effort]
        : [meta.runner, meta.model, meta.effort]
    )
      .filter(Boolean)
      .join(' · ');
    const session_id = meta.session_id || '';
    const follow_label = `라이브 따라가기 ${follow ? 'ON' : 'OFF'}`;
    const live = isLive();
    const ago = live ? formatAgo(lastEventAt(), Date.now()) : '';
    const finished = live ? null : finishedState(lines, meta.status);
    const title = meta.label || (launch_id ? meta.role || '' : attempt_id);
    const show_prompt = !(launch_id || hide_prompt);
    const has_info = Boolean(
      metaBits ||
      session_id ||
      meta.resume_command ||
      show_prompt ||
      meta.worktree
    );
    // Only a live attempt has a "지금" — a paused or finished session's dangling
    // tool line is history, and pinning it would claim work that is not running.
    const pending = live ? pendingTool(lines) : null;
    const thinking = live ? lastThinking(lines) : null;
    const stage = stageOf(lines);
    return html`<div class="sv" data-attempt-id=${attempt_id}>
      <div class="sv__bar">
        <div class="sv__head">
          ${live
            ? html`<span
                class="sv__state sv__live"
                title="세션이 진행 중입니다"
                aria-label=${ago ? `진행 중 · 마지막 이벤트 ${ago}` : '진행 중'}
                ><span class="sv__live-dot" aria-hidden="true"></span>${ago
                  ? html`<span class="sv__live-ago">${ago}</span>`
                  : ''}</span
              >`
            : finished === 'done'
              ? html`<span class="sv__state sv__state--done">✓ 완료</span>`
              : finished === 'failed'
                ? html`<span class="sv__state sv__state--failed">✗ 실패</span>`
                : ''}
          <span class="sv__id" title=${title}>${title}</span>
          ${stage
            ? html`<span
                class="sv__stage${stage.guess ? ' sv__stage--guess' : ''}"
                title=${stage.text}
                >${stage.text}</span
              >`
            : ''}
          <button
            type="button"
            class="sv__follow${follow ? ' sv__follow--on' : ''}"
            aria-pressed=${follow ? 'true' : 'false'}
            aria-label=${follow_label}
            @click=${toggleFollow}
          >
            <span class="sv__follow-full">⇣ 따라가기</span>
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
        ${has_info
          ? html`<div class="sv__info">
              ${metaBits ? html`<span class="sv__meta">${metaBits}</span>` : ''}
              ${session_id
                ? html`<button
                    type="button"
                    class="sv__session"
                    title=${session_id}
                    aria-label=${`세션 ID 복사: ${session_id}`}
                    @click=${() => copyValue(session_id)}
                  >
                    ${copyIcon()} ${session_id.slice(0, 8)}
                  </button>`
                : ''}
              ${meta.resume_command
                ? html`<button
                    type="button"
                    class="sv__resume-cmd"
                    title=${meta.resume_command}
                    aria-label=${`재개 명령 복사: ${meta.resume_command}`}
                    @click=${() => copyValue(meta.resume_command || '')}
                  >
                    ${copyIcon()} 재개 명령
                  </button>`
                : ''}
              ${show_prompt
                ? html`<button
                    type="button"
                    class="sv__prompt-toggle${prompt_expanded
                      ? ' sv__prompt-toggle--on'
                      : ''}"
                    data-seam="attempt-prompt-toggle"
                    aria-pressed=${prompt_expanded ? 'true' : 'false'}
                    aria-label="발송 프롬프트 보기"
                    title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
                    @click=${togglePrompt}
                  >
                    ✉ 프롬프트
                  </button>`
                : ''}
              ${meta.worktree
                ? html`<span class="sv__wt" title=${meta.worktree}
                    >${meta.worktree}</span
                  >`
                : ''}
            </div>`
          : ''}
      </div>
      ${show_prompt ? promptTemplate() : ''}
      <div class="sv__body">${bodyTemplate(lines, view)}</div>
      ${pending || thinking
        ? html`<div class="sv__now">
            <span class="sv__now-label"
              ><span class="sv__now-dot" aria-hidden="true"></span>지금</span
            >
            ${pending
              ? html`<span class="sv__now-name">${pending.tool}</span>
                  <span class="sv__now-detail"
                    >${pending.tool === 'Bash'
                      ? firstLineOf(pending.command)
                      : pending.path || pending.command || ''}</span
                  >`
              : ''}
            ${thinking
              ? html`<span class="sv__now-think"
                  >💭 ${firstLineOf(thinking.text)}</span
                >`
              : ''}
          </div>`
        : ''}
    </div>`;
  }

  /**
   * @param {number} idx
   * @param {boolean} is_open - What the bundle shows right now.
   */
  function toggleBundle(idx, is_open) {
    bundle_open.set(idx, !is_open);
    doRender();
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
   * Copy one bar value — the full session id, or the resume command — to the
   * clipboard (Board `복사됨`/`복사 실패` toast convention).
   *
   * @param {string} value
   */
  function copyValue(value) {
    void copyWithToast(value);
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
   * Close on an outside mousedown — the contract the other popovers already use
   * (workspace picker, usage meter, board label menu). `mousedown` rather than
   * `click`: the hosts open the drawer from a delegated click handler, so a
   * document-level click listener would close the drawer the same gesture just
   * opened.
   *
   * Two surfaces sit ABOVE an open drawer and must not close what they sit on:
   * a native `dialog` and the body-level md viewer.
   *
   * @param {MouseEvent} ev
   */
  function onDocMousedown(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    if (!target || typeof target.closest !== 'function') {
      return;
    }
    if (mount_element.contains(target)) {
      return;
    }
    if (target.closest('dialog') || target.closest('.md-viewer-root')) {
      return;
    }
    close();
  }

  let outside_close_bound = false;

  function bindOutsideClose() {
    if (outside_close_bound) {
      return;
    }
    document.addEventListener('mousedown', onDocMousedown);
    outside_close_bound = true;
  }

  function unbindOutsideClose() {
    if (!outside_close_bound) {
      return;
    }
    document.removeEventListener('mousedown', onDocMousedown);
    outside_close_bound = false;
  }

  /**
   * @param {DrawerOpenInput} input
   */
  function open(input) {
    const next_id = input && input.attempt_id;
    if (!next_id) {
      return;
    }
    const next_launch_id =
      typeof input.launch_id === 'string' && input.launch_id.length > 0
        ? input.launch_id
        : null;
    const next_session_ref =
      input.session_ref && typeof input.session_ref === 'object'
        ? input.session_ref
        : null;
    // The two variants are exclusive on the wire (`bad_request` server-side), so
    // a caller passing both has a bug. Dropping one silently would open SOME
    // transcript and hide which — refuse instead.
    if (next_launch_id && next_session_ref) {
      return;
    }
    const previous_subscription_id = subscription_id;
    attempt_id = next_id;
    launch_id = next_launch_id;
    session_ref = next_session_ref;
    subscription_id = launch_id
      ? `session-log:${attempt_id}:${launch_id}`
      : `session-log:${attempt_id}`;
    // Switching rows inside an open drawer replaces the subscription rather
    // than adding one: the server keys a subscription by (connection,
    // client_id), so a new id leaves the old listener pushing forever.
    if (
      transport &&
      previous_subscription_id &&
      previous_subscription_id !== subscription_id
    ) {
      void Promise.resolve(
        transport('unsubscribe-session-log', { id: previous_subscription_id })
      ).catch(() => {});
    }
    root_dir =
      typeof input.root_dir === 'string' && input.root_dir.length > 0
        ? input.root_dir
        : null;
    meta = input.meta || {};
    hide_prompt = input.hide_prompt === true;
    follow = true;
    expanded.clear();
    unfolded.clear();
    bundle_open.clear();
    resetPrompt();
    if (!storeOff && sessionLogStore) {
      storeOff = sessionLogStore.subscribe(doRender);
    }
    if (transport) {
      void Promise.resolve(
        transport('subscribe-session-log', {
          id: subscription_id,
          attempt_id,
          ...(launch_id ? { launch_id } : {}),
          ...(session_ref ? { session_ref } : {}),
          ...(root_dir ? { root_dir } : {})
        })
      ).catch(() => {});
    }
    bindOutsideClose();
    doRender();
  }

  function close() {
    const id = subscription_id;
    unbindOutsideClose();
    attempt_id = null;
    launch_id = null;
    session_ref = null;
    subscription_id = null;
    root_dir = null;
    hide_prompt = false;
    expanded.clear();
    unfolded.clear();
    bundle_open.clear();
    resetPrompt();
    stopHeartbeat();
    if (transport && id) {
      void Promise.resolve(transport('unsubscribe-session-log', { id })).catch(
        () => {}
      );
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
      unbindOutsideClose();
      if (storeOff) {
        storeOff();
        storeOff = null;
      }
      mount_element.removeEventListener('scroll', onScroll, true);
      attempt_id = null;
      launch_id = null;
      session_ref = null;
      subscription_id = null;
      root_dir = null;
      hide_prompt = false;
      bundle_open.clear();
      render(html``, mount_element);
    }
  };
}
