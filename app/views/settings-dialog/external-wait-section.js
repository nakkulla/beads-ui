/**
 * The bulk window `전역` tab's `외부 작업` group (UI-qbgj §3.6).
 *
 * Server-global defaults of the external-wait surface, read from and written
 * to the `external-wait-settings` channel. The server's `fields` table owns the
 * range and default, so this file copies neither. `[저장]` sends only the
 * changed keys in ONE `external-wait-settings-set`; `[기본값]` sends `null`,
 * which removes the override from the server file.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../data/external-wait-settings-store.js').ExternalWaitSettingsState} ExternalWaitSettingsState
 * @typedef {import('../../data/external-wait-settings-store.js').ExternalWaitSettingFieldWire} ExternalWaitSettingFieldWire
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { isExternalWaitSettingsSnapshot } from '../../data/external-wait-settings-store.js';
import { errorText } from '../../utils/error-text.js';

/** Toast shown when the server answered `conflict`. */
export const EXTERNAL_WAIT_CONFLICT_TOAST =
  '다른 곳에서 먼저 바뀌어 다시 불러왔습니다';

/**
 * The rows in display order. A key the server table lacks draws no row
 * (fail-quiet).
 *
 * @type {ReadonlyArray<{ key: string, label: string, note: string }>}
 */
export const EXTERNAL_WAIT_ROWS = [
  {
    key: 'takeover_ratio_percent',
    label: '바로 실행 기본 자원 비율(%)',
    note: '▶ 바로 실행 확인 창은 그 서버의 실제 여유(CPU 수 − 1분 부하, 쓸 수 있는 메모리)에 이 비율을 곱한 값으로 열립니다. 값은 실행마다 창에서 고칠 수 있습니다.'
  }
];

/**
 * Parse one input against the server field.
 *
 * @param {ExternalWaitSettingFieldWire} field
 * @param {string} text
 * @returns {{ value: number | null, reason: string }}
 */
function parseValue(field, text) {
  const trimmed = text.trim();
  if (trimmed === '') {
    return { value: null, reason: '값을 입력하세요' };
  }
  if (!/^\d+$/.test(trimmed)) {
    return { value: null, reason: '0 이상의 정수만 입력할 수 있습니다' };
  }
  const value = Number(trimmed);
  if (value < field.min || value > field.max) {
    return {
      value: null,
      reason: `${field.min} 이상 ${field.max} 이하여야 합니다`
    };
  }
  return { value, reason: '' };
}

/**
 * Mount the group into `host`.
 *
 * @param {HTMLElement} host
 * @param {{
 *   transport: (type: any, payload?: unknown) => Promise<any>,
 *   externalWaitSettingsStore?: { get: () => ExternalWaitSettingsState|null, set?: (state: ExternalWaitSettingsState|null) => void, subscribe?: (fn: () => void) => () => void },
 *   toast?: (message: string, kind?: string) => void
 * }} options
 * @returns {{ render: () => void, destroy: () => void }}
 */
export function createExternalWaitSection(host, options) {
  /** @type {Record<string, string>} */
  let drafts = {};
  /** @type {Record<string, string>} */
  let server_errors = {};
  let error = '';
  let busy = false;
  /** @type {ExternalWaitSettingsState|null} */
  let seen = null;
  /** @type {(() => void)|null} */
  let unsubscribe = null;

  if (options.externalWaitSettingsStore?.subscribe) {
    unsubscribe = options.externalWaitSettingsStore.subscribe(() => doRender());
  }

  /** @returns {ExternalWaitSettingsState|null} */
  function snapshot() {
    const state = options.externalWaitSettingsStore?.get() ?? null;
    return isExternalWaitSettingsSnapshot(state) ? state : null;
  }

  /**
   * Keep an edit only while the server value under it has not moved.
   *
   * @param {ExternalWaitSettingsState} state
   */
  function syncDrafts(state) {
    if (seen === state) {
      return;
    }
    if (!seen || seen.revision !== state.revision) {
      /** @type {Record<string, string>} */
      const next = {};
      for (const [key, text] of Object.entries(drafts)) {
        if (seen && seen.values[key] === state.values[key]) {
          next[key] = text;
        }
      }
      drafts = next;
      server_errors = {};
    }
    seen = state;
  }

  /**
   * @param {ExternalWaitSettingsState} state
   * @param {string} key
   * @returns {string}
   */
  function textOf(state, key) {
    return drafts[key] ?? String(state.values[key]);
  }

  /**
   * The keys whose valid draft differs from the server's value.
   *
   * @param {ExternalWaitSettingsState} state
   * @returns {Record<string, number>}
   */
  function changedValues(state) {
    /** @type {Record<string, number>} */
    const changed = {};
    for (const key of Object.keys(drafts)) {
      const field = state.fields[key];
      if (!field) {
        continue;
      }
      const { value } = parseValue(field, drafts[key]);
      if (value !== null && value !== state.values[key]) {
        changed[key] = value;
      }
    }
    return changed;
  }

  /**
   * @param {ExternalWaitSettingsState} state
   * @returns {boolean}
   */
  function hasInvalidDraft(state) {
    return Object.keys(drafts).some(
      (key) =>
        !!state.fields[key] &&
        parseValue(state.fields[key], drafts[key]).reason !== ''
    );
  }

  /**
   * Adopt a server snapshot into the shared store.
   *
   * @param {any} next
   */
  function adopt(next) {
    if (isExternalWaitSettingsSnapshot(next)) {
      options.externalWaitSettingsStore?.set?.({
        revision: next.revision,
        values: next.values,
        overrides: next.overrides,
        fields: next.fields
      });
    }
  }

  /**
   * Send one request and settle its outcome on the screen.
   *
   * @param {ExternalWaitSettingsState} base
   * @param {Record<string, number | null>} values
   */
  async function submit(base, values) {
    if (busy || Object.keys(values).length === 0) {
      return;
    }
    busy = true;
    error = '';
    doRender();
    try {
      const res = await options.transport('external-wait-settings-set', {
        expected_revision: base.revision,
        values
      });
      if (res?.ok === false) {
        adopt(res.snapshot);
        if (res.code === 'conflict') {
          drafts = {};
          options.toast?.(EXTERNAL_WAIT_CONFLICT_TOAST, 'warning');
        } else if (
          res.code === 'invalid_value' &&
          typeof res.key === 'string'
        ) {
          server_errors = {
            [res.key]: String(res.message || '서버가 값을 거절했습니다')
          };
        } else {
          error = `외부 작업 설정 저장 실패: ${String(res.message || res.code)}`;
        }
      } else {
        for (const key of Object.keys(values)) {
          delete drafts[key];
        }
        adopt(res?.snapshot);
      }
    } catch (err) {
      adopt(/** @type {any} */ (err)?.details?.snapshot);
      error = `외부 작업 설정 저장 실패: ${errorText(err)}`;
    } finally {
      busy = false;
      doRender();
    }
  }

  function onSave() {
    const state = snapshot();
    if (!state || hasInvalidDraft(state)) {
      return;
    }
    void submit(state, changedValues(state));
  }

  /**
   * `[기본값]`: drop one key's override on the server, or just the edit when the
   * key was never overridden.
   *
   * @param {string} key
   */
  function onReset(key) {
    const state = snapshot();
    if (!state) {
      return;
    }
    delete drafts[key];
    if (Object.hasOwn(state.overrides, key)) {
      void submit(state, { [key]: null });
      return;
    }
    doRender();
  }

  /**
   * @param {ExternalWaitSettingsState} state
   * @param {(typeof EXTERNAL_WAIT_ROWS)[number]} row
   * @returns {TemplateResult|''}
   */
  function rowTemplate(state, row) {
    const field = state.fields[row.key];
    if (!field || typeof state.values[row.key] !== 'number') {
      return '';
    }
    const text = textOf(state, row.key);
    const dirty = drafts[row.key] !== undefined;
    const reason =
      (dirty ? parseValue(field, text).reason : '') || server_errors[row.key];
    const changed =
      Object.hasOwn(state.overrides, row.key) ||
      (dirty && parseValue(field, text).value !== field.default);
    return html`<div class="settings-timing__row" data-key=${row.key}>
      <div class="settings-timing__line">
        <span class="settings-timing__name">${row.label}</span>
        <span class="settings-timing__inputs">
          <input
            type="number"
            class="ui-input settings-timing__input"
            inputmode="numeric"
            step="1"
            min=${field.min}
            max=${field.max}
            aria-label=${row.label}
            .value=${live(text)}
            ?disabled=${busy}
            @input=${(/** @type {Event} */ ev) => {
              drafts[row.key] = /** @type {HTMLInputElement} */ (
                ev.target
              ).value;
              delete server_errors[row.key];
              doRender();
            }}
          />
          <span class="settings-timing__unit">%</span>
        </span>
        <span class="settings-timing__default"
          >기본 ${field.default}% · ${field.min}–${field.max}</span
        >
        ${changed
          ? html`<button
              type="button"
              class="op-btn settings-timing__reset"
              data-action="external-wait-reset"
              ?disabled=${busy}
              @click=${() => onReset(row.key)}
            >
              기본값
            </button>`
          : ''}
      </div>
      ${reason
        ? html`<p class="settings-chips__error settings-timing__error">
            ${reason}
          </p>`
        : ''}
      <p class="settings-dialog__hint-block">${row.note}</p>
    </div>`;
  }

  function doRender() {
    const state = snapshot();
    if (!state) {
      render(html``, host);
      return;
    }
    syncDrafts(state);
    const rows = EXTERNAL_WAIT_ROWS.filter((row) => !!state.fields[row.key]);
    if (rows.length === 0) {
      render(html``, host);
      return;
    }
    const can_save =
      !busy &&
      !hasInvalidDraft(state) &&
      Object.keys(changedValues(state)).length > 0;
    render(
      html`<section class="settings-dialog__group" data-group="external-wait">
        <div class="settings-dialog__group-title">외부 작업</div>
        ${rows.map((row) => rowTemplate(state, row))}
        <div class="settings-timing__foot">
          <button
            type="button"
            class="op-btn op-btn--primary"
            data-action="external-wait-save"
            ?disabled=${!can_save}
            @click=${onSave}
          >
            저장
          </button>
        </div>
        ${error ? html`<p class="settings-chips__error">${error}</p>` : ''}
      </section>`,
      host
    );
  }

  return {
    render: doRender,
    destroy() {
      unsubscribe?.();
      unsubscribe = null;
    }
  };
}
