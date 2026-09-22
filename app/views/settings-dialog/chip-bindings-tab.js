/**
 * The bulk window's `칩` tab: which `general` preset each judgement chip applies
 * when it is clicked (UI-wg68 §6).
 *
 * The bindings are SERVER-GLOBAL, so this tab reads and writes exactly one
 * material — the `impl-presets-snapshot` — and is the only tab in this dialog
 * that ignores the `적용 대상` repo selection. There is no save button: a
 * `<select>` change IS the mutation, under the preset list's own revision CAS.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */
import { html, render } from 'lit-html';
import { chipDisplayName } from '../../utils/chip-preset-binding.js';
import { CHIP_BINDING_KEYS, normalizeAppliesTo } from './session-model.js';

/** The one-line header every row reads under. */
export const CHIP_TAB_INTRO =
  '칩을 클릭하면 여기 맨 프리셋이 그 이슈에 적용됩니다. 다시 클릭하면 클릭 전 설정으로 돌아갑니다. quick fix 이슈에는 적용되지 않습니다.';

/** The `없음` option value — an unbind, not a preset id. */
const UNBOUND = '';

/**
 * Mount the tab into `host`.
 *
 * @param {HTMLElement} host - The tab body element.
 * @param {{ transport: (type: any, payload?: unknown) => Promise<any>, implPresetStore?: { get: () => any, set?: (state: any) => void, subscribe?: (fn: () => void) => () => void }, toast?: (message: string, kind?: string) => void }} options
 * @returns {{ render: () => void, destroy: () => void }}
 */
export function createChipBindingsTab(host, options) {
  /** @type {string} */
  let error = '';
  /** @type {Set<string>} */
  const busy = new Set();
  /** @type {(() => void)|null} */
  let unsubscribe = null;

  if (options.implPresetStore?.subscribe) {
    unsubscribe = options.implPresetStore.subscribe(() => doRender());
  }

  /** @returns {{ revision: number, presets: any[], chip_bindings: Record<string, string|null> }|null} */
  function snapshot() {
    const state = options.implPresetStore?.get();
    if (!state || typeof state.revision !== 'number') {
      return null;
    }
    return {
      revision: state.revision,
      presets: Array.isArray(state.presets) ? state.presets : [],
      chip_bindings: state.chip_bindings || {}
    };
  }

  /**
   * The bindable presets — `general` only, because a chip click refuses a
   * `route=quick_fix` issue outright (§0), so a quick fix preset could never
   * apply from here.
   *
   * @returns {any[]}
   */
  function generalPresets() {
    return (snapshot()?.presets || []).filter(
      (preset) => preset && normalizeAppliesTo(preset.applies_to) === 'general'
    );
  }

  /**
   * Send one binding change and adopt whatever the server answers with.
   *
   * @param {string} chip
   * @param {string} value
   * @returns {Promise<void>}
   */
  async function onChange(chip, value) {
    const state = snapshot();
    if (!state || busy.has(chip)) {
      return;
    }
    busy.add(chip);
    error = '';
    doRender();
    try {
      const res = await options.transport('impl-preset-bind', {
        expected_revision: state.revision,
        chip,
        preset_id: value === UNBOUND ? null : value
      });
      if (
        res &&
        typeof res.revision === 'number' &&
        options.implPresetStore?.set
      ) {
        options.implPresetStore.set({
          revision: res.revision,
          presets: res.presets,
          chip_bindings: res.chip_bindings
        });
      }
      if (res && res.conflict === true) {
        error = '프리셋 목록이 방금 바뀌었습니다 — 다시 고르세요';
        options.toast?.(error, 'error');
      }
    } catch (err) {
      error = `바인딩 실패: ${err instanceof Error ? err.message : String(err)}`;
    } finally {
      busy.delete(chip);
      doRender();
    }
  }

  /**
   * One chip's row. Disabled until the snapshot arrives — a select that cannot
   * name the current binding must not invite a change.
   *
   * @param {string} chip
   * @returns {TemplateResult}
   */
  function rowTemplate(chip) {
    const state = snapshot();
    const bound = state ? state.chip_bindings[chip] || UNBOUND : UNBOUND;
    return html`<div class="settings-chips__row" data-chip=${chip}>
      <span class="settings-chips__label">${chipDisplayName(chip)}</span>
      <select
        class="settings-chips__select"
        data-chip=${chip}
        ?disabled=${state === null || busy.has(chip)}
        .value=${bound}
        @change=${(/** @type {Event} */ ev) =>
          void onChange(
            chip,
            /** @type {HTMLSelectElement} */ (ev.target).value
          )}
      >
        <option value=${UNBOUND} ?selected=${bound === UNBOUND}>없음</option>
        ${generalPresets().map(
          (preset) =>
            html`<option
              value=${preset.id}
              ?selected=${preset.id === bound}
              ?disabled=${preset.compatible === false}
            >
              ${preset.name}
            </option>`
        )}
      </select>
    </div>`;
  }

  function doRender() {
    render(
      html`<div class="settings-chips">
        <p class="settings-chips__intro">${CHIP_TAB_INTRO}</p>
        ${CHIP_BINDING_KEYS.map((chip) => rowTemplate(chip))}
        ${error ? html`<p class="settings-chips__error">${error}</p>` : ''}
      </div>`,
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
