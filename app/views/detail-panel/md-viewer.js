import { html, render } from 'lit-html';
import { renderMarkdown } from '../../utils/markdown.js';

/**
 * Markdown document viewer (detail-panel.html `.mv`). Fetches a `docs/*.md`
 * file from `GET /api/doc` (no auth, spec §8) and renders it with
 * marked+dompurify. Appears as a centered overlay; fullscreen ≤640px. Closes on
 * ✕, backdrop, Esc.
 *
 * @typedef {Object} MdViewerOptions
 * @property {() => string | null | undefined} getWorkspacePath - Current workspace abs path.
 * @property {typeof fetch} [fetchImpl] - Injectable fetch (tests).
 */

/**
 * `spec_draft` is display-only state from the artifacts row; only
 * `plan_pending` has a dedicated message, so a missing draft file falls through
 * to the generic not-found error.
 *
 * @typedef {Object} MdViewerOpenOptions
 * @property {'plan_pending'|'spec_draft'|null} [missing_state]
 */

/**
 * Trim the docs prefix for a compact viewer path label.
 *
 * @param {string} p
 * @returns {string}
 */
function shortPath(p) {
  return String(p || '').replace(/^docs\/(superpowers\/)?/, '');
}

/**
 * Split a leading YAML frontmatter block off the document. marked would
 * otherwise render `---\nkey: v\n---` as a setext heading above the real title.
 *
 * @param {string} source
 * @returns {{ front: string | null, body: string }}
 */
export function splitFrontmatter(source) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!m) {
    return { front: null, body: source };
  }
  const front = m[1].trim();
  return {
    front: front.length > 0 ? front : null,
    body: source.slice(m[0].length)
  };
}

/**
 * @param {HTMLElement} mount_element
 * @param {MdViewerOptions} options
 * @returns {{ open: (doc_path: string, open_options?: MdViewerOpenOptions) => Promise<void>, close: () => void, destroy: () => void }}
 */
export function createMdViewer(mount_element, options) {
  const getWorkspacePath = options.getWorkspacePath;
  const doFetch = options.fetchImpl || globalThis.fetch?.bind(globalThis);

  /** @type {string | null} */
  let current_path = null;
  /** @type {'loading'|'ready'|'pending'|'error'} */
  let state = 'loading';
  let body_html = '';
  /** @type {string | null} */
  let front_text = null;
  let error_message = '';

  /**
   * @param {KeyboardEvent} ev
   */
  function onKeydown(ev) {
    if (ev.key === 'Escape' && current_path) {
      ev.preventDefault();
      close();
    }
  }
  document.addEventListener('keydown', onKeydown);

  function template() {
    if (!current_path) {
      return html``;
    }
    return html`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${() => close()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${current_path}
              >${shortPath(current_path)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${() => close()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${state === 'loading'
              ? html`<div class="mv__status">불러오는 중…</div>`
              : state === 'pending'
                ? html`<div class="mv__status">${error_message}</div>`
                : state === 'error'
                  ? html`<div class="mv__status mv__status--error">
                      ${error_message || '문서를 불러오지 못했습니다'}
                    </div>`
                  : html`${front_text === null
                      ? null
                      : html`<pre class="mv__front">
${front_text}</pre
                        >`}${renderMarkdown(body_html)}`}
          </div>
        </div>
      </div>
    `;
  }

  function doRender() {
    render(template(), mount_element);
  }

  /**
   * @param {string} doc_path
   * @param {MdViewerOpenOptions} [open_options]
   */
  async function open(doc_path, open_options = {}) {
    current_path = doc_path;
    state = 'loading';
    body_html = '';
    front_text = null;
    error_message = '';
    doRender();

    const workspace = getWorkspacePath ? getWorkspacePath() : '';
    if (!workspace) {
      state = 'error';
      error_message = '워크스페이스가 선택되지 않았습니다';
      doRender();
      return;
    }
    if (!doFetch) {
      state = 'error';
      error_message = 'fetch를 사용할 수 없습니다';
      doRender();
      return;
    }
    const url =
      '/api/doc?workspace=' +
      encodeURIComponent(workspace) +
      '&path=' +
      encodeURIComponent(doc_path);
    try {
      const resp = await doFetch(url);
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data || data.ok !== true) {
        if (
          data?.error === 'not_found' &&
          open_options.missing_state === 'plan_pending'
        ) {
          state = 'pending';
          error_message = '계획 작성 전 · 경로만 예약되어 있습니다';
          doRender();
          return;
        }
        state = 'error';
        error_message =
          '문서를 불러오지 못했습니다 (' +
          String((data && data.error) || resp.status) +
          ')';
        doRender();
        return;
      }
      const split = splitFrontmatter(String(data.content || ''));
      front_text = split.front;
      body_html = split.body;
      state = 'ready';
      doRender();
    } catch {
      state = 'error';
      error_message = '문서 요청 실패';
      doRender();
    }
  }

  function close() {
    current_path = null;
    render(html``, mount_element);
  }

  function destroy() {
    document.removeEventListener('keydown', onKeydown);
    close();
  }

  return { open, close, destroy };
}
