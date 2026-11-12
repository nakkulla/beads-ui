import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { errorText } from '../../utils/error-text.js';
import {
  disabledModelsOf,
  visibleModelChoices
} from '../../utils/model-visibility.js';

const ROWS = [
  ['claude.model', 'Claude 모델'],
  ['claude.effort', 'Claude effort'],
  ['codex.model', 'Codex 모델'],
  ['codex.effort', 'Codex effort'],
  ['codex.speed', 'Codex 속도']
];

/**
 * @param {HTMLElement} host
 * @param {{ transport: (type: any, payload?: unknown) => Promise<any>, modelVisibilityStore?: { get: () => any } }} options
 */
export function createRelayDefaultsSection(host, options) {
  /** @type {any} */
  let state = null;
  /** @type {Record<string, { id: string }>} */
  let codex_models = {};
  let requested = false;
  let busy = false;
  let readonly = true;
  let destroyed = false;
  let error = '';

  /** @param {any} result */
  function adopt(result) {
    const snapshot = result.snapshot;
    if (
      snapshot &&
      Number.isSafeInteger(snapshot.revision) &&
      snapshot.allowed &&
      snapshot.overrides &&
      snapshot.effective
    ) {
      state = snapshot;
      codex_models = result.codex_models || {};
      readonly = false;
    } else {
      readonly = true;
    }
    error =
      result.ok === false
        ? `${result.code}: ${result.message || '설정을 불러오지 못했습니다'}`
        : '';
  }

  async function load() {
    requested = true;
    try {
      adopt(await options.transport('relay-defaults-get', {}));
      if (!state && !error) {
        error = 'Hermes 세션 설정을 불러오지 못했습니다';
      }
    } catch (err) {
      error = `Hermes 세션 설정 읽기 실패: ${errorText(err)}`;
    }
    doRender();
  }

  /**
   * @param {string} key
   * @param {string|null} value
   */
  async function submit(key, value) {
    if (busy || readonly || !state || destroyed) {
      return;
    }
    busy = true;
    doRender();
    try {
      adopt(
        await options.transport('relay-defaults-set', {
          expected_revision: state.revision,
          values: { [key]: value }
        })
      );
    } catch (err) {
      readonly = true;
      error = `Hermes 세션 설정 저장 실패: ${errorText(err)}`;
    }
    busy = false;
    doRender();
  }

  /**
   * @param {string} key
   * @returns {Array<{ value: string, label: string }>}
   */
  function choicesOf(key) {
    /** @type {Array<{ value: string, label: string }>} */
    const choices = [{ value: '', label: '따름' }];
    if (key === 'codex.model') {
      const names = visibleModelChoices(
        Object.keys(codex_models),
        disabledModelsOf(options.modelVisibilityStore)
      );
      for (const name of names) {
        const value = codex_models[name].id;
        if (!choices.some((choice) => choice.value === value)) {
          choices.push({ value, label: name });
        }
      }
    } else {
      const allowed = state.allowed[key];
      if (Array.isArray(allowed)) {
        choices.push(...allowed.map((value) => ({ value, label: value })));
      }
    }
    const value = state.overrides[key];
    if (
      typeof value === 'string' &&
      !choices.some((choice) => choice.value === value)
    ) {
      choices.push({ value, label: `${value} (목록에 없음)` });
    }
    return choices;
  }

  /**
   * @param {string[]} row
   */
  function rowTemplate([key, label]) {
    if (!Object.hasOwn(state.allowed, key)) {
      return '';
    }
    const value = state.overrides[key] || '';
    return html`<div class="settings-timing__row" data-key=${key}>
      <div class="settings-timing__line">
        <span class="settings-timing__name">${label}</span>
        <span class="settings-timing__inputs">
          <select
            class="ui-select"
            aria-label=${label}
            .value=${live(value)}
            ?disabled=${busy || readonly}
            @change=${(/** @type {Event} */ event) => {
              const next = /** @type {HTMLSelectElement} */ (event.target)
                .value;
              void submit(key, next || null);
            }}
          >
            ${choicesOf(key).map(
              (choice) =>
                html`<option
                  value=${choice.value}
                  ?selected=${choice.value === value}
                >
                  ${choice.label}
                </option>`
            )}
          </select>
        </span>
        <span class="settings-timing__default"
          >적용: ${state.effective[key] || '에이전트 설정 따름'}</span
        >
      </div>
    </div>`;
  }

  function doRender() {
    if (destroyed) {
      return;
    }
    render(
      html`<section class="settings-dialog__group" data-group="relay-defaults">
        <div class="settings-dialog__group-title">Hermes 세션</div>
        <p class="settings-dialog__hint-block">
          모든 저장소에 공통으로 적용됩니다. 다음에 Hermes로 여는 세션부터
          씁니다. 따름을 고르면 허브 기본값을 씁니다.
        </p>
        ${state
          ? ROWS.map(rowTemplate)
          : html`<p class="settings-dialog__hint-block">
              ${requested && error
                ? '설정을 사용할 수 없습니다.'
                : '불러오는 중…'}
            </p>`}
        ${state?.note
          ? html`<p class="settings-dialog__hint-block">${state.note}</p>`
          : ''}
        ${error
          ? html`<p class="settings-chips__error" role="alert">${error}</p>`
          : ''}
      </section>`,
      host
    );
    if (!requested) {
      void load();
    }
  }

  return {
    render: doRender,
    destroy() {
      destroyed = true;
    }
  };
}
