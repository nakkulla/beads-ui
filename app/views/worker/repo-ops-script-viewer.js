/**
 * The Worker screen's read-only viewer for one declared repo-operation script
 * (UI-k34k).
 *
 * The settings card shows the verify/deploy paths the Worker PINNED at a base
 * SHA, so this popup must show that same Git blob: it sends only workspace,
 * lane, and the displayed `base_sha`, and the server re-resolves the declaration
 * to decide which blob to read. There is no current-checkout fallback — showing
 * a working-tree file would claim a content the executor will never run.
 */
import { html, render } from 'lit-html';
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../utils/toast.js';

/**
 * @typedef {Object} RepoOpsScriptOpenInput
 * @property {'verify'|'deploy'} lane
 * @property {string} base_sha
 * @property {string} path
 * @property {string} base_ref
 */

/**
 * @typedef {Object} RepoOpsScriptViewerOptions
 * @property {() => string|null|undefined} getWorkspacePath
 * @property {typeof fetch} [fetchImpl]
 */

const SHELL_NAMES = new Set(['sh', 'bash', 'zsh', 'dash', 'ksh']);
const SHELL_TOKEN_PATTERN =
  /('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;

/**
 * @param {string} executable
 */
function executableName(executable) {
  const parts = executable.split('/');
  return parts[parts.length - 1] || '';
}

/**
 * Whether the shebang names one of the shells this viewer can safely tokenize.
 *
 * Only the EXECUTOR decides, never a later argument: `#!/usr/bin/env -S python
 * bash` runs python, so scanning every word would color a python script with
 * shell rules.
 *
 * @param {string} content
 */
function isShellContent(content) {
  const first_line = content.split('\n', 1)[0];
  if (!first_line.startsWith('#!')) {
    return false;
  }
  const words = first_line.slice(2).trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return false;
  }
  const direct_name = executableName(words[0]);
  if (direct_name !== 'env') {
    return SHELL_NAMES.has(direct_name);
  }
  const target = words
    .slice(1)
    .find((word) => !word.startsWith('-') && !word.includes('='));
  return target !== undefined && SHELL_NAMES.has(executableName(target));
}

/**
 * @param {string} token
 * @returns {'comment'|'string'|'variable'|'keyword'}
 */
function tokenKind(token) {
  if (token.startsWith('#')) {
    return 'comment';
  }
  if (token.startsWith("'") || token.startsWith('"')) {
    return 'string';
  }
  if (token.startsWith('$')) {
    return 'variable';
  }
  return 'keyword';
}

/**
 * @param {string} line
 * @returns {Array<{ text: string, kind: 'plain'|'comment'|'string'|'variable'|'keyword' }>}
 */
function tokenizeShellLine(line) {
  /** @type {Array<{ text: string, kind: 'plain'|'comment'|'string'|'variable'|'keyword' }>} */
  const tokens = [];
  let offset = 0;
  SHELL_TOKEN_PATTERN.lastIndex = 0;
  for (const match of line.matchAll(SHELL_TOKEN_PATTERN)) {
    const index = match.index;
    if (index > offset) {
      tokens.push({ text: line.slice(offset, index), kind: 'plain' });
    }
    tokens.push({ text: match[0], kind: tokenKind(match[0]) });
    offset = index + match[0].length;
  }
  if (offset < line.length) {
    tokens.push({ text: line.slice(offset), kind: 'plain' });
  }
  if (tokens.length === 0) {
    tokens.push({ text: line, kind: 'plain' });
  }
  return tokens;
}

/**
 * @param {string} code
 */
function errorMessage(code) {
  /** @type {Record<string, string>} */
  const messages = {
    bad_request: '스크립트 요청이 올바르지 않습니다.',
    forbidden: '등록되지 않은 워크스페이스의 스크립트는 읽을 수 없습니다.',
    lane_not_declared: '현재 고정 선언에 해당 스크립트가 없습니다.',
    stale_declaration:
      '저장소 작업 선언이 바뀌었습니다. 최신 화면에서 다시 열어 주세요.',
    too_large: '스크립트가 너무 커서 화면에 표시할 수 없습니다.',
    unsupported_content: '텍스트 형식의 스크립트만 표시할 수 있습니다.',
    unreadable: '고정된 스크립트 내용을 읽을 수 없습니다.'
  };
  return messages[code] || '스크립트를 불러오지 못했습니다.';
}

/**
 * @param {RepoOpsScriptViewerOptions} options
 * @returns {{ open: (input: RepoOpsScriptOpenInput, trigger_element?: HTMLElement|null) => Promise<void>, close: () => void, destroy: () => void }}
 */
export function createRepoOpsScriptViewer(options) {
  const getWorkspacePath = options.getWorkspacePath;
  const doFetch = options.fetchImpl || globalThis.fetch?.bind(globalThis);
  const mount_element = document.createElement('div');
  mount_element.className = 'repo-ops-script-viewer-root';
  document.body.appendChild(mount_element);

  /** @type {RepoOpsScriptOpenInput|null} */
  let current_input = null;
  /** @type {'loading'|'ready'|'error'} */
  let state = 'loading';
  let content = '';
  let error_message = '';
  let request_sequence = 0;
  /** @type {HTMLElement|null} */
  let restore_target = null;
  let keydown_attached = false;

  /**
   * @param {string} line
   * @param {boolean} shell
   */
  function codeLine(line, shell) {
    if (!shell) {
      return line;
    }
    return tokenizeShellLine(line).map((token) =>
      token.kind === 'plain'
        ? token.text
        : html`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${token.kind}"
            >${token.text}</span
          >`
    );
  }

  /** Render current modal state. */
  function template() {
    if (!current_input) {
      return html``;
    }
    const shell = state === 'ready' && isShellContent(content);
    const lines = state === 'ready' ? content.split('\n') : [];
    return html`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`스크립트 내용: ${current_input.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${() => close()}
      ></div>
      <section class="repo-ops-script-viewer__panel">
        <header class="repo-ops-script-viewer__header">
          <div class="repo-ops-script-viewer__identity">
            <span
              class="repo-ops-script-viewer__path"
              title=${current_input.path}
              >${current_input.path}</span
            >
            <span class="repo-ops-script-viewer__ref"
              >${current_input.base_ref}@${current_input.base_sha.slice(
                0,
                7
              )}</span
            >
          </div>
          <div class="repo-ops-script-viewer__actions">
            <button
              type="button"
              class="repo-ops-script-viewer__copy"
              ?disabled=${state !== 'ready'}
              @click=${() => void copyContent()}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${() => close()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${state === 'loading'
            ? html`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`
            : state === 'error'
              ? html`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${error_message}
                </div>`
              : html`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${lines.map(
                    (line, index) =>
                      html`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${index + 1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${codeLine(line, shell)}</code
                        >
                      </div>`
                  )}
                </div>`}
        </div>
      </section>
    </div>`;
  }

  /** Commit current modal state to its body mount. */
  function doRender() {
    render(template(), mount_element);
  }

  /** Copy the unmodified response content. */
  async function copyContent() {
    if (state !== 'ready') {
      return;
    }
    const copied = await copyToClipboard(content);
    showToast(
      copied ? '스크립트 복사됨' : '스크립트 복사 실패',
      copied ? 'success' : 'error'
    );
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
   * @param {RepoOpsScriptOpenInput} input
   * @param {HTMLElement|null} [trigger_element]
   */
  async function open(input, trigger_element = null) {
    const sequence = ++request_sequence;
    startKeydownListener();
    current_input = { ...input };
    restore_target =
      trigger_element ||
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null);
    state = 'loading';
    content = '';
    error_message = '';
    doRender();
    const close_button = /** @type {HTMLElement|null} */ (
      mount_element.querySelector('.repo-ops-script-viewer__close')
    );
    close_button?.focus();

    const workspace = getWorkspacePath ? getWorkspacePath() : '';
    if (!workspace) {
      state = 'error';
      error_message = '워크스페이스가 선택되지 않았습니다.';
      doRender();
      return;
    }
    if (!doFetch) {
      state = 'error';
      error_message = '스크립트 요청 기능을 사용할 수 없습니다.';
      doRender();
      return;
    }
    const url =
      '/api/repo-ops-script?workspace=' +
      encodeURIComponent(workspace) +
      '&lane=' +
      encodeURIComponent(input.lane) +
      '&base_sha=' +
      encodeURIComponent(input.base_sha);
    try {
      const response = await doFetch(url);
      const data = await response.json().catch(() => ({}));
      if (sequence !== request_sequence) {
        return;
      }
      const active_workspace = getWorkspacePath ? getWorkspacePath() : '';
      if (active_workspace !== workspace) {
        close();
        return;
      }
      if (!response.ok || !data || data.ok !== true) {
        state = 'error';
        error_message = errorMessage(
          data && typeof data.error === 'string' ? data.error : ''
        );
        doRender();
        return;
      }
      current_input = {
        lane: data.lane,
        base_sha: data.base_sha,
        path: data.path,
        base_ref: data.base_ref
      };
      content = String(data.content);
      state = 'ready';
      doRender();
    } catch {
      if (sequence !== request_sequence) {
        return;
      }
      state = 'error';
      error_message = '스크립트 요청에 실패했습니다.';
      doRender();
    }
  }

  /** Close the modal and return focus to its opening control. */
  function close() {
    request_sequence += 1;
    stopKeydownListener();
    current_input = null;
    content = '';
    doRender();
    const target = restore_target;
    restore_target = null;
    if (target?.isConnected) {
      target.focus();
    }
  }

  /** Remove listeners and the body-level mount. */
  function destroy() {
    close();
    mount_element.remove();
  }

  return { open, close, destroy };
}
