/**
 * The settings dialog `프리셋·모델` tab's `프리셋 관리` group: every server-global
 * execution preset, one row each under its profile, with rename, duplicate,
 * and a two-step delete.
 *
 * The preset bars of the `워커`·`quick fix` tabs save the screen's run values
 * into a preset; this group never does. A rename sends the preset's STORED
 * settings back unchanged, a duplicate copies them into the same profile, and
 * a delete first shows which judgement chip bindings it would release. The
 * material is the `impl-presets-snapshot` alone, so the `적용 대상` repo
 * selection does not apply here.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */
import { html, render } from 'lit-html';
import { chipDisplayName } from '../../utils/chip-preset-binding.js';
import { errorText } from '../../utils/error-text.js';
import { CHIP_BINDING_KEYS, normalizeAppliesTo } from './session-model.js';

/** The two profile blocks, in display order. */
const PROFILES = /** @type {const} */ ([
  { profile: 'general', label: '일반' },
  { profile: 'quick_fix', label: 'quick fix' }
]);

/** The rejection a revision race answers with. */
export const CONFLICT_TEXT =
  '다른 곳에서 방금 변경되었습니다 — 다시 시도하세요';

/** The rejection a refused write (`reason: 'invalid'`) answers with. */
export const INVALID_TEXT =
  '이름이 다른 프리셋과 겹치거나 저장된 값이 지금 허용값과 맞지 않습니다';

/** The client-side duplicate-name refusal; nothing is sent. */
export const DUPLICATE_NAME_TEXT = '같은 이름의 프리셋이 이미 있습니다';

/**
 * Whether `name` already names a preset other than `except_id`, folded the
 * way the store folds (case-insensitive, across both profiles).
 *
 * @param {any[]} presets
 * @param {string} name
 * @param {string|null} except_id
 * @returns {boolean}
 */
function nameTaken(presets, name, except_id) {
  const folded = name.trim().toLowerCase();
  return presets.some(
    (preset) =>
      preset &&
      preset.id !== except_id &&
      typeof preset.name === 'string' &&
      preset.name.trim().toLowerCase() === folded
  );
}

/**
 * The name a duplicate of `name` takes: `<name> 복사본`, then ` 2`, ` 3`…
 * until no preset holds it.
 *
 * @param {any[]} presets
 * @param {string} name
 * @returns {string}
 */
export function copyName(presets, name) {
  const base = `${name} 복사본`;
  let candidate = base;
  let ordinal = 2;
  while (nameTaken(presets, candidate, null)) {
    candidate = `${base} ${ordinal++}`;
  }
  return candidate;
}

/**
 * Mount the group into `host`.
 *
 * @param {HTMLElement} host - The group's own host element.
 * @param {{ transport: (type: any, payload?: unknown) => Promise<any>, implPresetStore?: { get: () => any, set?: (state: any) => void, subscribe?: (fn: () => void) => () => void } }} options
 * @returns {{ render: () => void, destroy: () => void }}
 */
export function createPresetManageSection(host, options) {
  /** @type {string|null} */
  let editing_id = null;
  let name_draft = '';
  /** @type {string|null} */
  let pending_delete_id = null;
  let busy = false;
  let error = '';
  /** @type {(() => void)|null} */
  let unsubscribe = null;
  // The dialog reuses `host` for the next open's instance, so a reply that
  // lands after destroy must not draw over it.
  let destroyed = false;

  if (options.implPresetStore?.subscribe) {
    unsubscribe = options.implPresetStore.subscribe(() => doRender());
  }

  /** @returns {{ revision: number, presets: any[], chip_bindings: Record<string, string|null>, quick_fix_chip_bindings: Record<string, string|null> }|null} */
  function snapshot() {
    const state = options.implPresetStore?.get();
    if (!state || typeof state.revision !== 'number') {
      return null;
    }
    return {
      revision: state.revision,
      presets: Array.isArray(state.presets) ? state.presets : [],
      chip_bindings: state.chip_bindings || {},
      quick_fix_chip_bindings: state.quick_fix_chip_bindings || {}
    };
  }

  /**
   * The display names of the chips bound to `preset` in its own profile map.
   *
   * @param {NonNullable<ReturnType<typeof snapshot>>} state
   * @param {any} preset
   * @returns {string[]}
   */
  function boundChips(state, preset) {
    const bindings =
      normalizeAppliesTo(preset.applies_to) === 'quick_fix'
        ? state.quick_fix_chip_bindings
        : state.chip_bindings;
    return CHIP_BINDING_KEYS.filter((chip) => bindings[chip] === preset.id).map(
      (chip) => chipDisplayName(chip)
    );
  }

  /**
   * Send one mutation and adopt whatever list the server answers with.
   *
   * @param {'impl-preset-update'|'impl-preset-create'|'impl-preset-delete'} type
   * @param {Record<string, unknown>} payload
   * @param {string} failure - The message prefix of a thrown error.
   * @returns {Promise<boolean>} true when the server applied the write.
   */
  async function send(type, payload, failure) {
    const state = snapshot();
    if (!state || busy) {
      return false;
    }
    busy = true;
    error = '';
    doRender();
    let applied = false;
    try {
      const res = await options.transport(type, {
        expected_revision: state.revision,
        ...payload
      });
      if (
        res &&
        typeof res.revision === 'number' &&
        options.implPresetStore?.set
      ) {
        options.implPresetStore.set({
          revision: res.revision,
          presets: res.presets,
          chip_bindings: res.chip_bindings,
          quick_fix_chip_bindings: res.quick_fix_chip_bindings
        });
      }
      if (res && res.applied === true) {
        applied = true;
      } else if (res && res.conflict === true) {
        error = CONFLICT_TEXT;
      } else {
        error = INVALID_TEXT;
      }
    } catch (err) {
      error = `${failure}: ${errorText(err)}`;
    } finally {
      busy = false;
    }
    return applied;
  }

  /** @param {any} preset */
  function onStartRename(preset) {
    editing_id = preset.id;
    name_draft = preset.name;
    pending_delete_id = null;
    error = '';
    doRender();
    const input = /** @type {HTMLInputElement|null} */ (
      host.querySelector('[data-action="preset-rename-input"]')
    );
    input?.focus();
    input?.select();
  }

  function onCancelRename() {
    editing_id = null;
    name_draft = '';
    error = '';
    doRender();
  }

  /** @param {any} preset */
  async function onSaveRename(preset) {
    const state = snapshot();
    const name = name_draft.trim();
    if (!state || name.length === 0) {
      return;
    }
    if (name === preset.name) {
      onCancelRename();
      return;
    }
    if (nameTaken(state.presets, name, preset.id)) {
      error = DUPLICATE_NAME_TEXT;
      doRender();
      return;
    }
    const applied = await send(
      'impl-preset-update',
      { id: preset.id, name, settings: preset.settings || {} },
      '이름 바꾸기 실패'
    );
    if (applied) {
      editing_id = null;
      name_draft = '';
    }
    doRender();
  }

  /** @param {any} preset */
  async function onDuplicate(preset) {
    const state = snapshot();
    if (!state) {
      return;
    }
    editing_id = null;
    pending_delete_id = null;
    await send(
      'impl-preset-create',
      {
        name: copyName(state.presets, preset.name),
        applies_to: normalizeAppliesTo(preset.applies_to),
        settings: preset.settings || {}
      },
      '복제 실패'
    );
    doRender();
  }

  /** @param {any} preset */
  function onAskDelete(preset) {
    pending_delete_id = preset.id;
    editing_id = null;
    error = '';
    doRender();
  }

  function onCancelDelete() {
    pending_delete_id = null;
    doRender();
  }

  /** @param {any} preset */
  async function onConfirmDelete(preset) {
    const applied = await send(
      'impl-preset-delete',
      { id: preset.id },
      '삭제 실패'
    );
    if (applied) {
      pending_delete_id = null;
    }
    doRender();
  }

  /**
   * The rename row's input and its two buttons. Escape cancels without
   * sending and is kept from closing the dialog; Enter saves.
   *
   * @param {any} preset
   * @returns {TemplateResult}
   */
  function renameTemplate(preset) {
    return html`<input
        type="text"
        class="ui-input preset-manage__input"
        data-action="preset-rename-input"
        aria-label=${`${preset.name} 새 이름`}
        .value=${name_draft}
        ?disabled=${busy}
        @input=${(/** @type {Event} */ ev) => {
          name_draft = /** @type {HTMLInputElement} */ (ev.target).value;
        }}
        @keydown=${(/** @type {KeyboardEvent} */ ev) => {
          // The Enter that commits a Hangul IME composition is not a save.
          if (ev.isComposing) {
            return;
          }
          if (ev.key === 'Escape') {
            ev.preventDefault();
            ev.stopPropagation();
            onCancelRename();
          } else if (ev.key === 'Enter') {
            ev.preventDefault();
            void onSaveRename(preset);
          }
        }}
      />
      <span class="preset-manage__actions">
        <button
          type="button"
          class="op-btn op-btn--primary"
          data-action="preset-rename-save"
          ?disabled=${busy}
          @click=${() => void onSaveRename(preset)}
        >
          저장
        </button>
        <button
          type="button"
          class="op-btn"
          data-action="preset-rename-cancel"
          ?disabled=${busy}
          @click=${onCancelRename}
        >
          취소
        </button>
      </span>`;
  }

  /**
   * The delete confirmation: what the delete releases, then confirm/cancel.
   *
   * @param {any} preset
   * @param {string[]} chips
   * @returns {TemplateResult}
   */
  function confirmTemplate(preset, chips) {
    const warning =
      chips.length > 0
        ? `삭제하면 판정 칩 ${chips.join('·')}의 바인딩이 풀립니다.`
        : '이 프리셋을 삭제합니다.';
    return html`<span class="preset-manage__name">${preset.name}</span>
      <span class="preset-manage__actions">
        <button
          type="button"
          class="op-btn op-btn--danger"
          data-action="preset-delete-confirm"
          ?disabled=${busy}
          @click=${() => void onConfirmDelete(preset)}
        >
          삭제 확인
        </button>
        <button
          type="button"
          class="op-btn"
          data-action="preset-delete-cancel"
          ?disabled=${busy}
          @click=${onCancelDelete}
        >
          취소
        </button>
      </span>
      <span class="preset-manage__warn" data-role="preset-delete-warning"
        >${warning}</span
      >`;
  }

  /**
   * One preset's resting row: name, bound chips, and the three actions.
   *
   * @param {any} preset
   * @param {string[]} chips
   * @returns {TemplateResult}
   */
  function restingTemplate(preset, chips) {
    return html`<span class="preset-manage__name">${preset.name}</span>
      ${chips.length > 0
        ? html`<span class="preset-manage__chips" data-role="preset-chips"
            >칩 ${chips.join('·')}</span
          >`
        : ''}
      <span class="preset-manage__actions">
        <button
          type="button"
          class="op-btn"
          data-action="preset-rename"
          ?disabled=${busy}
          @click=${() => onStartRename(preset)}
        >
          이름 바꾸기
        </button>
        <button
          type="button"
          class="op-btn"
          data-action="preset-duplicate"
          ?disabled=${busy}
          @click=${() => void onDuplicate(preset)}
        >
          복제
        </button>
        <button
          type="button"
          class="op-btn op-btn--danger"
          data-action="preset-delete"
          ?disabled=${busy}
          @click=${() => onAskDelete(preset)}
        >
          삭제
        </button>
      </span>`;
  }

  /**
   * @param {NonNullable<ReturnType<typeof snapshot>>} state
   * @param {any} preset
   * @returns {TemplateResult}
   */
  function rowTemplate(state, preset) {
    const chips = boundChips(state, preset);
    let body = restingTemplate(preset, chips);
    if (editing_id === preset.id) {
      body = renameTemplate(preset);
    } else if (pending_delete_id === preset.id) {
      body = confirmTemplate(preset, chips);
    }
    return html`<div class="preset-manage__row" data-preset-id=${preset.id}>
      ${body}
    </div>`;
  }

  function doRender() {
    if (destroyed) {
      return;
    }
    const state = snapshot();
    if (!state) {
      render(html``, host);
      return;
    }
    const presets = state.presets.filter(
      (preset) => preset && typeof preset.id === 'string'
    );
    // A row whose preset left the list drops its rename or confirm state.
    if (!presets.some((preset) => preset.id === editing_id)) {
      editing_id = null;
    }
    if (!presets.some((preset) => preset.id === pending_delete_id)) {
      pending_delete_id = null;
    }
    const blocks = PROFILES.map(({ profile, label }) => ({
      profile,
      label,
      presets: presets.filter(
        (preset) => normalizeAppliesTo(preset.applies_to) === profile
      )
    })).filter((block) => block.presets.length > 0);
    render(
      html`<section class="settings-dialog__group" data-group="preset-manage">
        <div class="settings-dialog__group-title">프리셋 관리</div>
        <p class="settings-dialog__hint-block">
          이름 바꾸기는 저장된 실행 값을 그대로 둡니다. 새 프리셋은 워커·quick
          fix 탭의 프리셋 바에서 만듭니다.
        </p>
        ${blocks.length === 0
          ? html`<p class="settings-dialog__hint-block">
              저장된 프리셋이 없습니다.
            </p>`
          : blocks.map(
              (block) =>
                html`<div
                  class="preset-manage__profile"
                  data-profile=${block.profile}
                >
                  <div class="preset-manage__profile-title">${block.label}</div>
                  ${block.presets.map((preset) => rowTemplate(state, preset))}
                </div>`
            )}
        ${error
          ? html`<p class="settings-chips__error" data-role="preset-error">
              ${error}
            </p>`
          : ''}
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
