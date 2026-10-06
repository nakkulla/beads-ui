/**
 * The bulk window `전역` tab's `대화 세션` group (UI-jbl1 §3.4).
 *
 * Server-global launch settings of every Worker session conversation, read
 * from and written to the `conversation-settings` request pair: the ONE
 * automatic-launch switch the 멈춤 and 실패 conversations share, the runtime a
 * fresh conversation runs, and the model/effort each runtime launches with.
 * The server's `fields` table owns the choices and defaults, so this file
 * copies neither; the model choices pass through the model visibility filter
 * (UI-ooc0). A change IS the mutation: one select or checkbox sends one
 * `conversation-settings-set` under the snapshot's revision CAS, and
 * `[기본값]` sends `null`, which removes the override from the server file.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {{ kind: 'boolean'|'choice'|'model'|'effort', default: boolean|string|null, choices?: string[], runner?: string }} ConversationFieldWire
 * @typedef {{ revision: number, values: Record<string, any>, overrides: Record<string, any>, fields: Record<string, ConversationFieldWire> }} ConversationSettingsState
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { errorText } from '../../utils/error-text.js';
import {
  disabledModelsOf,
  visibleModelChoices
} from '../../utils/model-visibility.js';

/** Toast shown when the server answered `conflict`. */
export const CONVERSATION_CONFLICT_TOAST =
  '다른 곳에서 먼저 바뀌어 다시 불러왔습니다';

/** The option label of a model or effort left to the CLI's own default. */
export const FOLLOW_LABEL = '따름';

/** The fresh-runtime option labels. */
const RUNTIME_LABELS = /** @type {Record<string, string>} */ ({
  inherit: '원래 세션 따름',
  claude: 'claude',
  codex: 'codex'
});

/**
 * The rows in display order. A key the server table lacks draws no row
 * (fail-quiet).
 *
 * @type {ReadonlyArray<{ key: string, label: string, note?: string }>}
 */
export const CONVERSATION_ROWS = [
  {
    key: 'auto_launch',
    label: '대화 자동 기동',
    note: '멈춤과 실패에 함께 쓰는 스위치입니다. 켜 두면 사람 판단 멈춤과 종단 실패(배포·post-merge 잡 실패, 머지 게이트 보류, 폐기 실패, 수동 배포 실패)에서 대화 세션을 분리 창에 한 번 띄웁니다. 실패 대화는 답을 받기 전에는 읽기 전용 진단만 합니다. 저장값이 없으면 config.toml [worker.direction_inquiry] enabled를 따릅니다.'
  },
  {
    key: 'fresh_runtime',
    label: '새 세션 런타임',
    note: '새 세션으로 여는 대화에만 씁니다. 원래 세션을 이어 쓰거나 fork하는 대화는 원래 세션의 런타임으로 엽니다.'
  },
  { key: 'claude_model', label: 'Claude 모델' },
  { key: 'claude_effort', label: 'Claude effort' },
  { key: 'codex_model', label: 'Codex 모델' },
  {
    key: 'codex_effort',
    label: 'Codex effort',
    note: '모델·effort는 그 런타임으로 여는 모든 대화(클릭·자동, 멈춤·실패·외부 작업 완료)에 붙습니다. 따름이면 플래그를 붙이지 않습니다.'
  }
];

/**
 * Whether a reply carries a usable snapshot.
 *
 * @param {any} value
 * @returns {value is ConversationSettingsState}
 */
export function isConversationSettingsSnapshot(value) {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof value.revision === 'number' &&
    !!value.values &&
    typeof value.values === 'object' &&
    !!value.overrides &&
    typeof value.overrides === 'object' &&
    !!value.fields &&
    typeof value.fields === 'object'
  );
}

/**
 * Mount the group into `host`.
 *
 * @param {HTMLElement} host
 * @param {{
 *   transport: (type: any, payload?: unknown) => Promise<any>,
 *   modelVisibilityStore?: { get: () => any, subscribe?: (fn: () => void) => () => void },
 *   toast?: (message: string, kind?: string) => void
 * }} options
 * @returns {{ render: () => void, destroy: () => void }}
 */
export function createConversationSection(host, options) {
  /** @type {ConversationSettingsState|null} */
  let state = null;
  let error = '';
  let busy = false;
  let requested = false;
  let destroyed = false;
  /** @type {(() => void)|null} */
  let unsubscribe = null;

  if (options.modelVisibilityStore?.subscribe) {
    unsubscribe = options.modelVisibilityStore.subscribe(() => doRender());
  }

  /**
   * Adopt a server snapshot.
   *
   * @param {any} next
   */
  function adopt(next) {
    if (isConversationSettingsSnapshot(next)) {
      state = next;
    }
  }

  /**
   * Read the snapshot once per mount; a failed read shows its error and is not
   * retried until the tab is opened again.
   */
  async function load() {
    if (requested || state !== null) {
      return;
    }
    requested = true;
    try {
      const res = await options.transport('conversation-settings-get', {});
      adopt(res?.snapshot);
      error = '';
    } catch (err) {
      error = `대화 세션 설정 읽기 실패: ${errorText(err)}`;
    } finally {
      if (!destroyed) {
        doRender();
      }
    }
  }

  /**
   * Send one key's new value (`null` clears its override).
   *
   * @param {string} key
   * @param {unknown} value
   */
  async function submit(key, value) {
    if (busy || !state) {
      return;
    }
    busy = true;
    error = '';
    doRender();
    try {
      const res = await options.transport('conversation-settings-set', {
        expected_revision: state.revision,
        values: { [key]: value }
      });
      adopt(res?.snapshot);
      if (res?.ok === false) {
        if (res.code === 'conflict') {
          options.toast?.(CONVERSATION_CONFLICT_TOAST, 'warning');
        } else {
          error = `대화 세션 설정 저장 실패: ${String(res.message || res.code)}`;
        }
      }
    } catch (err) {
      adopt(/** @type {any} */ (err)?.details?.snapshot);
      error = `대화 세션 설정 저장 실패: ${errorText(err)}`;
    } finally {
      busy = false;
      doRender();
    }
  }

  /**
   * The choices one select offers: the server's, the model list filtered by
   * visibility, and the stored value kept visible even when it was filtered.
   *
   * @param {ConversationFieldWire} field
   * @param {unknown} value
   * @returns {Array<{ value: string, label: string }>}
   */
  function optionsOf(field, value) {
    const choices = Array.isArray(field.choices) ? field.choices : [];
    if (field.kind === 'choice') {
      return choices.map((choice) => ({
        value: choice,
        label: RUNTIME_LABELS[choice] ?? choice
      }));
    }
    const shown =
      field.kind === 'model'
        ? visibleModelChoices(
            choices,
            disabledModelsOf(options.modelVisibilityStore)
          )
        : [...choices];
    /** @type {Array<{ value: string, label: string }>} */
    const out = [
      { value: '', label: FOLLOW_LABEL },
      ...shown.map((choice) => ({ value: choice, label: choice }))
    ];
    if (typeof value === 'string' && value && !shown.includes(value)) {
      out.push({ value, label: `${value} (비활성)` });
    }
    return out;
  }

  /**
   * @param {ConversationSettingsState} current
   * @param {(typeof CONVERSATION_ROWS)[number]} row
   * @returns {TemplateResult|''}
   */
  function rowTemplate(current, row) {
    const field = current.fields[row.key];
    if (!field) {
      return '';
    }
    const value = current.values[row.key];
    const overridden = Object.hasOwn(current.overrides, row.key);
    const control =
      field.kind === 'boolean'
        ? html`<label class="ui-field settings-timing__inputs">
            <input
              type="checkbox"
              aria-label=${row.label}
              .checked=${live(value === true)}
              ?disabled=${busy}
              @change=${(/** @type {Event} */ ev) =>
                void submit(
                  row.key,
                  /** @type {HTMLInputElement} */ (ev.target).checked
                )}
            />
            ${value === true ? '켜짐' : '꺼짐'}
          </label>`
        : html`<span class="settings-timing__inputs">
            <select
              class="ui-select"
              aria-label=${row.label}
              .value=${live(String(value ?? ''))}
              ?disabled=${busy}
              @change=${(/** @type {Event} */ ev) => {
                const next = /** @type {HTMLSelectElement} */ (ev.target).value;
                void submit(
                  row.key,
                  field.kind === 'choice' ? next : next === '' ? null : next
                );
              }}
            >
              ${optionsOf(field, value).map(
                (option) =>
                  html`<option
                    value=${option.value}
                    ?selected=${option.value === (value ?? '')}
                  >
                    ${option.label}
                  </option>`
              )}
            </select>
          </span>`;
    const default_text =
      field.kind === 'boolean'
        ? `config.toml ${field.default === true ? '켜짐' : '꺼짐'}`
        : field.kind === 'choice'
          ? `기본 ${RUNTIME_LABELS[String(field.default)] ?? field.default}`
          : `기본 ${FOLLOW_LABEL}`;
    return html`<div class="settings-timing__row" data-key=${row.key}>
      <div class="settings-timing__line">
        <span class="settings-timing__name">${row.label}</span>
        ${control}
        <span class="settings-timing__default">${default_text}</span>
        ${overridden
          ? html`<button
              type="button"
              class="op-btn settings-timing__reset"
              data-action="conversation-reset"
              ?disabled=${busy}
              @click=${() => void submit(row.key, null)}
            >
              기본값
            </button>`
          : ''}
      </div>
      ${row.note
        ? html`<p class="settings-dialog__hint-block">${row.note}</p>`
        : ''}
    </div>`;
  }

  function doRender() {
    if (destroyed) {
      return;
    }
    if (!state) {
      render(
        error
          ? html`<section
              class="settings-dialog__group"
              data-group="conversation"
            >
              <div class="settings-dialog__group-title">대화 세션</div>
              <p class="settings-chips__error">${error}</p>
            </section>`
          : html``,
        host
      );
      void load();
      return;
    }
    const current = state;
    render(
      html`<section class="settings-dialog__group" data-group="conversation">
        <div class="settings-dialog__group-title">대화 세션</div>
        ${CONVERSATION_ROWS.map((row) => rowTemplate(current, row))}
        ${error ? html`<p class="settings-chips__error">${error}</p>` : ''}
      </section>`,
      host
    );
  }

  return {
    render: doRender,
    destroy() {
      destroyed = true;
      unsubscribe?.();
      unsubscribe = null;
    }
  };
}
