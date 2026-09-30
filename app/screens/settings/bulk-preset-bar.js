/**
 * The bulk pane's two preset bars and read-only `적용된 프리셋` lines (§4.1,
 * §6.2): choosing a preset fills that tab's form, and save/delete run the same
 * three ops and `expected_revision` race judgement as the single-repo window.
 * Split out of `bulk-pane.js` (UI-dbn6); the pane keeps the selection objects
 * and hands them in by reference.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {ReturnType<typeof import('./bulk-worker-form.js').createBulkWorkerForm>} BulkWorkerForm
 * @typedef {Object} BulkPresetBarContext
 * @property {(type: string, payload: any) => Promise<any>} transport
 * @property {() => { revision: number, presets: Array<Record<string, any>> }|null} presetState
 * @property {(tab: 'worker'|'quick_fix') => Array<Record<string, any>>} presetsOf
 * @property {(tab: 'worker'|'quick_fix') => Record<string, any>|null} chosenPreset
 * @property {(tab: 'worker'|'quick_fix') => BulkWorkerForm} formOf
 * @property {Record<string, string>} preset_choice - Selected id per tab.
 * @property {Record<string, string>} preset_name_draft - Name box per tab.
 * @property {Record<string, string>} preset_error - Last refusal per tab.
 * @property {() => boolean} isRunning - Whether a bulk run is in flight.
 * @property {() => boolean} quickFixSupported
 * @property {() => Array<Record<string, any>>} selectedRows
 * @property {() => void} doRender
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import {
  appliedPresetProjected,
  observationBadge,
  observeAppliedPreset
} from '../../model/bulk-observation.js';
import { messageOf } from '../../model/bulk-preset-apply.js';
import { normalizeAppliesTo } from '../../model/session-model.js';
import {
  DELETED_PRESET,
  NO_APPLIED_PRESET,
  PRESET_LIST_GLOBAL,
  QUICK_FIX_UNSUPPORTED,
  SECTION_PROFILE,
  isRecord,
  presetHintFor
} from './bulk-shared.js';
import { bulkFormRowKeysFor } from './bulk-worker-form.js';

/**
 * Build both tabs' preset bars over the pane's preset selection.
 *
 * @param {BulkPresetBarContext} ctx
 */
export function createBulkPresetBar(ctx) {
  const {
    presetState,
    presetsOf,
    chosenPreset,
    formOf,
    preset_choice,
    preset_name_draft,
    preset_error,
    doRender
  } = ctx;

  /**
   * The preset select fills THIS TAB's form and nothing else: the apply path
   * is decided later by comparing that form against it (§2.2), and the other
   * tab's rows keep their own observations (§6.2).
   *
   * @param {'worker'|'quick_fix'} tab
   * @param {string} id
   */
  function onPresetChoice(tab, id) {
    preset_choice[tab] = id;
    const preset = chosenPreset(tab);
    if (preset) {
      formOf(tab).applyPreset(preset.settings);
      return;
    }
    doRender();
  }

  /**
   * Save this tab's rows as a preset OF THIS TAB'S PROFILE: create when
   * nothing is selected, overwrite the selected one otherwise. Same three ops
   * and the same `expected_revision` race judgement as the single-repo window
   * (§4.1).
   *
   * @param {'worker'|'quick_fix'} tab
   */
  async function onSavePreset(tab) {
    const state = presetState();
    if (!state) {
      return;
    }
    const profile = SECTION_PROFILE[tab];
    const settings = formOf(tab).presetSettings();
    const chosen = chosenPreset(tab);
    const name = preset_name_draft[tab].trim() || (chosen ? chosen.name : '');
    if (!name) {
      return;
    }
    try {
      const res = chosen
        ? await ctx.transport('impl-preset-update', {
            expected_revision: state.revision,
            id: chosen.id,
            name,
            settings
          })
        : await ctx.transport('impl-preset-create', {
            expected_revision: state.revision,
            name,
            applies_to: profile,
            settings
          });
      if (isRecord(res) && res.applied === true) {
        preset_name_draft[tab] = '';
        if (!chosen && Array.isArray(res.presets)) {
          const created = res.presets.find(
            (/** @type {any} */ preset) =>
              preset &&
              preset.name === name &&
              normalizeAppliesTo(preset.applies_to) === profile
          );
          preset_choice[tab] = created ? created.id : preset_choice[tab];
        }
      } else {
        preset_error[tab] = '프리셋 저장 실패: 다른 곳에서 방금 변경되었습니다';
      }
    } catch (err) {
      preset_error[tab] = `프리셋 저장 실패: ${messageOf(err)}`;
    }
    doRender();
  }

  /**
   * Delete this tab's selected preset; nothing else is touched (§4.1).
   *
   * @param {'worker'|'quick_fix'} tab
   */
  async function onDeletePreset(tab) {
    const state = presetState();
    const chosen = chosenPreset(tab);
    if (!state || !chosen) {
      return;
    }
    try {
      const res = await ctx.transport('impl-preset-delete', {
        expected_revision: state.revision,
        id: chosen.id
      });
      if (isRecord(res) && res.applied === true) {
        preset_choice[tab] = '';
      } else {
        preset_error[tab] = '프리셋 삭제 실패: 다른 곳에서 방금 변경되었습니다';
      }
    } catch (err) {
      preset_error[tab] = `프리셋 삭제 실패: ${messageOf(err)}`;
    }
    doRender();
  }

  /**
   * The read-only `적용된 프리셋` line of ONE tab (§4.1): each tab reads its
   * own profile's record, and the two are independent. The record's identity
   * is its `id`, and the NAME is looked up in the preset list the window
   * already holds — the stored `name` is a copy from apply time and lies after
   * a rename. An id nothing names is `삭제된 프리셋`, never an invented name.
   *
   * @param {'worker'|'quick_fix'} tab
   * @returns {TemplateResult|''}
   */
  function appliedPresetTemplate(tab) {
    const chosen = ctx.selectedRows();
    const profile = SECTION_PROFILE[tab];
    if (!appliedPresetProjected(chosen, profile)) {
      return '';
    }
    const observation = observeAppliedPreset(chosen, profile);
    const presets = presetState()?.presets || [];
    /** @param {string|null} id */
    const nameOf = (id) => {
      if (id === null) {
        return NO_APPLIED_PRESET;
      }
      const found = presets.find(
        (/** @type {any} */ preset) => preset && preset.id === id
      );
      return found ? String(found.name) : DELETED_PRESET;
    };
    const badge = observationBadge(observation, nameOf);
    return html`<div class="settings-dialog__row" data-bulk-applied-preset>
      <span class="settings-dialog__row-label">적용된 프리셋</span>
      <span class="settings-dialog__controls">
        <span data-bulk-applied-preset-value
          >${nameOf(
            observation.state === 'same' ? observation.value : null
          )}</span
        >
        ${badge
          ? html`<span
              class=${`settings-dialog__obs settings-dialog__obs--${badge.state}`}
              data-bulk-observation=${badge.state}
              title=${badge.title}
              >${badge.text}</span
            >`
          : ''}
      </span>
    </div>`;
  }

  /**
   * One tab's preset bar. The list is that tab's profile alone, so neither bar
   * ever offers the other's presets (§6.2). A server with no quick_fix lane
   * locks the quick fix bar whole — select, name, save and delete — with the
   * same copy its rows carry (§6.1); the worker bar is untouched by that probe.
   *
   * @param {'worker'|'quick_fix'} tab
   * @returns {TemplateResult}
   */
  function presetBarTemplate(tab) {
    const running = ctx.isRunning();
    const profile = SECTION_PROFILE[tab];
    const form = formOf(tab);
    const presets = presetsOf(tab);
    const chosen_id = preset_choice[tab];
    const chosen = chosenPreset(tab);
    const row_count = bulkFormRowKeysFor(profile).length;
    const holds = form.holdCounts();
    const unsettled = holds.mixed + holds.pending;
    const lane_locked = tab === 'quick_fix' && !ctx.quickFixSupported();
    const lane_title = lane_locked ? QUICK_FIX_UNSUPPORTED : '';
    const save_title = lane_locked
      ? QUICK_FIX_UNSUPPORTED
      : unsettled > 0
        ? `값이 서지 않은 ${unsettled}행을 먼저 정하세요`
        : `${
            chosen
              ? `현재 화면의 ${row_count}행을 이 프리셋에 저장합니다`
              : `현재 화면의 ${row_count}행을 새 프리셋으로 저장합니다`
          } — ${PRESET_LIST_GLOBAL}`;
    return html`<div
      class="settings-dialog__bulk-hd settings-dialog__preset-bar"
      data-bulk-preset-bar=${profile}
    >
      <select
        class="ui-select settings-dialog__bulk-preset"
        aria-label="적용할 실행 프리셋"
        data-bulk-preset
        title=${lane_title}
        ?disabled=${running || lane_locked}
        @change=${(/** @type {Event} */ ev) =>
          onPresetChoice(
            tab,
            String(/** @type {HTMLSelectElement} */ (ev.target).value)
          )}
      >
        <option value="" ?selected=${chosen_id === ''}>실행 프리셋…</option>
        ${presets.map(
          (preset) =>
            html`<option
              value=${preset.id}
              ?selected=${preset.id === chosen_id}
              ?disabled=${preset.compatible === false}
              title=${preset.compatible === false
                ? preset.incompatibility_reason || ''
                : ''}
            >
              ${preset.name}
            </option>`
        )}
      </select>
      <input
        type="text"
        class="ui-input settings-dialog__preset-name"
        aria-label="프리셋 이름"
        data-bulk-preset-name
        placeholder=${chosen ? '이름 (비우면 유지)' : '새 프리셋 이름'}
        title=${lane_title}
        .value=${live(preset_name_draft[tab])}
        ?disabled=${running || lane_locked}
        @input=${(/** @type {Event} */ ev) => {
          preset_name_draft[tab] = String(
            /** @type {HTMLInputElement} */ (ev.target).value
          );
        }}
      />
      <button
        type="button"
        class="ui-btn ui-btn--primary ui-btn--sm"
        data-bulk-preset-save
        title=${save_title}
        ?disabled=${running || unsettled > 0 || lane_locked}
        @click=${() => void onSavePreset(tab)}
      >
        ${chosen ? '현재 설정으로 덮어쓰기' : '새 프리셋 저장'}
      </button>
      <button
        type="button"
        class="ui-btn ui-btn--danger ui-btn--sm"
        data-bulk-preset-delete
        title=${lane_title}
        ?disabled=${running || chosen === null || lane_locked}
        @click=${() => void onDeletePreset(tab)}
      >
        삭제
      </button>
      <span class="settings-dialog__hint" data-bulk-preset-hint
        >${presetHintFor(profile)}</span
      >
      ${preset_error[tab]
        ? html`<span class="settings-dialog__bulk-reason" data-bulk-preset-error
            >${preset_error[tab]}</span
          >`
        : ''}
    </div>`;
  }

  return { presetBarTemplate, appliedPresetTemplate };
}
