/**
 * The `운영` tab's `Worker 주소` group (UI-32oq §4.5).
 *
 * The common Worker address is ONE server-wide value, so it is edited here
 * regardless of the dialog's target. The group reads it through the connected
 * workspace's `get-session-defaults` reply (`worker_url.common`) and writes it
 * with `set-worker-url-common` under the revision it read. It shows the stored
 * state and the resolver's common-address warnings only — there is no
 * connectivity probe. A repository's own stored exception is not edited here:
 * the `저장소` tab shows it read-only with `지우기`.
 *
 * It reads again only on window focus and on `새로고침` (ADR UI-32oq-2, the
 * UI-u6ud-11 clause it inherits) — no watcher, no polling. A re-read keeps an
 * unsaved edit and the revision it was started on, and a reply that a newer
 * read or a save overtook is dropped.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { errorText } from '../../utils/error-text.js';
import {
  adoptWorkerCommon,
  isHttpOriginValue,
  workerUrlMessage,
  workerUrlWarning
} from './session-model.js';

/** What a value that fails the origin format is refused with. */
const ORIGIN_FORMAT =
  'http:// 또는 https:// 로 시작하는 주소만 저장됩니다 (경로 없이)';

/** Resolver warnings about the common value; a repo exception is not one. */
const COMMON_WARNINGS = ['common_invalid', 'common_unavailable'];

/**
 * The stored state of the common value in words.
 *
 * @param {any} worker_url - A `get-session-defaults` reply's `worker_url`.
 * @returns {string}
 */
export function commonStateText(worker_url) {
  if (!worker_url || worker_url.status !== 'ok') {
    return workerUrlMessage(worker_url);
  }
  const common = worker_url.common;
  switch (common?.state) {
    case 'configured':
      return String(common.value ?? '');
    case 'unset':
      return '미설정';
    case 'invalid':
      return '공통 설정 형식 오류 — 편집할 수 없습니다';
    case 'unavailable':
      return '공통 설정 읽기 오류 — 편집할 수 없습니다';
    default:
      return '공통 주소를 확인할 수 없습니다';
  }
}

/**
 * Mount the group into `host`.
 *
 * @param {HTMLElement} host
 * @param {{
 *   transport: (type: any, payload?: unknown) => Promise<any>,
 *   notify?: (message: string) => void
 * }} options
 * @returns {{ load: () => Promise<void>, render: () => void, destroy: () => void }}
 */
export function createWorkerUrlSection(host, options) {
  const notify = options.notify || (() => {});
  /** @type {any} */
  let worker_url = null;
  /** @type {{ value: string, revision: string|null, dirty: boolean }} */
  let draft = { value: '', revision: null, dirty: false };
  let loading = true;
  let saving = false;
  let invalid = false;
  let destroyed = false;
  /** The newest read; an older reply, or one a save overtook, is dropped. */
  let read_query = 0;

  /** Permit writes only with a readable common document and revision. */
  function editable() {
    return (
      worker_url?.status === 'ok' &&
      ['configured', 'unset'].includes(worker_url.common?.state) &&
      typeof worker_url.common?.revision === 'string' &&
      !saving
    );
  }

  /**
   * Read the common value through the connected workspace. The first read
   * fills the box; a later one (focus, `새로고침`, after a conflict) keeps the
   * user's typed value and only moves what `취소/최신값 채택` would adopt.
   *
   * @param {boolean} initial
   */
  async function read(initial) {
    const query = ++read_query;
    /** @type {any} */
    let next;
    try {
      const res = await options.transport('get-session-defaults', {});
      next = res?.worker_url ?? null;
    } catch {
      next = {
        status: 'unavailable',
        error: { code: 'workspace_unavailable' }
      };
    }
    if (destroyed || query !== read_query) {
      return;
    }
    worker_url = next;
    draft = adoptWorkerCommon(draft, worker_url?.common ?? null, initial);
    loading = false;
    doRender();
  }

  /** Re-read on focus or `새로고침`, keeping any unsaved edit. */
  function refresh() {
    void read(false);
  }

  /** The first read; from here on window focus reads again. */
  function load() {
    loading = true;
    window.addEventListener('focus', refresh);
    doRender();
    return read(true);
  }

  /** @param {boolean} clear */
  async function save(clear) {
    if (!editable() || draft.revision === null) {
      return;
    }
    const value = clear ? null : draft.value.trim() || null;
    if (value !== null && !isHttpOriginValue(value)) {
      invalid = true;
      doRender();
      return;
    }
    saving = true;
    doRender();
    try {
      const res = await options.transport('set-worker-url-common', {
        value,
        expected_revision: draft.revision
      });
      if (destroyed) {
        return;
      }
      if (res?.common_saved === true) {
        // The save's readback is newer than any read still in flight.
        ++read_query;
        draft = adoptWorkerCommon(draft, res.common, true);
        worker_url = res.worker_url ?? worker_url;
        invalid = false;
      }
    } catch (err) {
      if (destroyed) {
        return;
      }
      const conflict = /** @type {any} */ (err)?.code === 'revision_conflict';
      notify(
        conflict
          ? '다른 창에서 변경됨 — 취소/최신값 채택 후 다시 시도'
          : `공통 주소 저장 실패: ${errorText(err)}`
      );
      if (conflict) {
        saving = false;
        await read(false);
      }
    } finally {
      saving = false;
      doRender();
    }
  }

  /** Drop the edit and bind the latest observed revision. */
  function cancelEdit() {
    draft = adoptWorkerCommon(draft, worker_url?.common ?? null, true);
    invalid = false;
    doRender();
  }

  /** @returns {string[]} */
  function warnings() {
    const list = Array.isArray(worker_url?.warnings) ? worker_url.warnings : [];
    return list
      .filter((/** @type {any} */ warning) =>
        COMMON_WARNINGS.includes(
          typeof warning === 'string' ? warning : warning?.code
        )
      )
      .map(workerUrlWarning);
  }

  /** @returns {TemplateResult} */
  function template() {
    if (loading) {
      return html`<div class="settings-dialog__empty">
        Worker 주소를 불러오는 중…
      </div>`;
    }
    const notes = warnings();
    return html`<section
      class="settings-dialog__group"
      data-worker-url-common-group
    >
      <div class="settings-dialog__group-title">Worker 주소</div>
      <p class="settings-dialog__hint-block">
        세션이 quick fix를 Worker 레인에 넣거나 이어받을 때 찾아가는 beads-ui
        서버 주소입니다. 모든 저장소에 적용됩니다.
      </p>
      <div class="settings-dialog__row">
        <span class="settings-dialog__row-label">지금 값</span>
        <span class="settings-dialog__controls">
          <span data-worker-url-state>${commonStateText(worker_url)}</span>
          <button
            type="button"
            class="op-btn"
            data-worker-url-refresh
            @click=${refresh}
          >
            새로고침
          </button>
          ${notes.length > 0
            ? html`<span class="settings-dialog__hint" data-worker-url-warnings
                >${notes.join(', ')}</span
              >`
            : ''}
        </span>
      </div>
      <div class="settings-dialog__row" data-worker-url-common>
        <span class="settings-dialog__row-label">바꾸기</span>
        <span class="settings-dialog__controls">
          <input
            type="text"
            data-worker-common-input
            aria-label="Worker 공통 주소"
            placeholder="http://호스트:3000"
            class=${`ui-input settings-dialog__text${invalid ? ' settings-dialog__text--invalid' : ''}`}
            aria-invalid=${String(invalid)}
            .value=${live(draft.value)}
            ?disabled=${!editable()}
            @input=${(/** @type {Event} */ ev) => {
              draft = {
                ...draft,
                value: /** @type {HTMLInputElement} */ (ev.target).value,
                dirty: true
              };
              invalid = false;
              doRender();
            }}
          />
          <button
            type="button"
            class="op-btn"
            data-worker-common-save
            ?disabled=${!editable()}
            @click=${() => save(false)}
          >
            저장
          </button>
          <button
            type="button"
            class="op-btn"
            data-worker-common-clear
            ?disabled=${!editable()}
            @click=${() => save(true)}
          >
            지우기
          </button>
          <button
            type="button"
            class="op-btn"
            data-worker-common-cancel
            ?disabled=${saving || !draft.dirty}
            @click=${cancelEdit}
          >
            취소/최신값 채택
          </button>
          ${invalid
            ? html`<span class="settings-dialog__hint">${ORIGIN_FORMAT}</span>`
            : ''}
        </span>
      </div>
    </section>`;
  }

  function doRender() {
    if (destroyed) {
      return;
    }
    render(template(), host);
  }

  return {
    load,
    render: doRender,
    destroy() {
      destroyed = true;
      window.removeEventListener('focus', refresh);
      render(html``, host);
    }
  };
}
