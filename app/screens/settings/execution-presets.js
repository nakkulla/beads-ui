/**
 * The `실행` pane's preset bars — one per profile (`general` on the `워커` tab,
 * `quick_fix` on its own tab) with the changed-keys preview under each. Split
 * out of `execution-pane.js` (UI-dbn6) with the per-profile selection and name
 * draft; the pane hands in its guarded `send`, its drafts and the adopt step
 * an apply response goes through.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {Object} PresetBarContext
 * @property {{ implPresetStore?: { get: () => any } }} binding
 * @property {string|null} root_dir - `null` = the connected workspace.
 * @property {() => any} queueOf
 * @property {() => boolean} supportsQuickFixLane
 * @property {(type: string, payload: Record<string, unknown>) => Promise<any>} send
 * @property {() => Record<string, string>} rootPayload
 * @property {(message: string) => void} notify
 * @property {() => void} doRender
 * @property {(profile: 'general'|'quick_fix') => Record<string, string>} executionDraftSettings
 * @property {(res: any) => void} adoptPresetApply - Adopts an applied response.
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { appliedPresetFieldFor } from '../../model/bulk-observation.js';
import {
  buildPresetDiff,
  normalizeAppliesTo
} from '../../model/session-model.js';
import { QUICK_FIX_UNSUPPORTED, isRecord } from './execution-shared.js';

/**
 * What every preset bar says about the list it edits: one list lives on the
 * server, so a save or a delete here is seen by every workspace (§6.1).
 */
const PRESET_LIST_GLOBAL =
  '프리셋 목록은 서버 전역이라 저장·삭제가 모든 저장소의 목록을 바꿉니다';

/**
 * The `적용` button's title: why it is locked, or what an apply that changes no
 * value still does. An apply also WRITES the profile's apply record (§4.1), so
 * a preset whose values already match is still appliable until that record
 * names it. An empty string leaves no tooltip, as before.
 *
 * @param {{ lane_locked: boolean, chosen: boolean, value_change: boolean, record_matches: boolean }} state
 * @returns {string}
 */
function presetApplyTitle(state) {
  if (state.lane_locked) {
    return '서버가 quick_fix 값을 받지 않습니다';
  }
  if (!state.chosen) {
    return '적용할 프리셋을 고르세요';
  }
  if (state.value_change) {
    return '';
  }
  return state.record_matches
    ? '이 프리셋이 이미 적용되어 있고 바뀔 값도 없습니다'
    : '값은 이미 같습니다 — 이 프리셋을 적용했다는 기록만 남깁니다';
}

/**
 * The `현재 → 프리셋` preview for the selected preset — only the keys that
 * change. One apply REPLACES the compared keys, so a key the preset omits
 * reads as `기본(해제)`.
 *
 * @param {{ rows: import('../../model/session-model.js').PresetDiffRow[], ignored_keys: string[] }} diff
 * @returns {TemplateResult}
 */
function presetDiffTemplate(diff) {
  return html`<div class="settings-dialog__preset-diff" data-preset-diff>
    <div class="settings-dialog__preset-diff-head">
      ${diff.rows.length > 0
        ? `변경 ${diff.rows.length}개 · 적용하면 아래와 같이 바뀝니다`
        : '현재 설정과 같습니다 — 적용할 변경이 없습니다'}
    </div>
    ${diff.rows.map(
      (row) =>
        html`<div
          class="settings-dialog__preset-diff-row"
          data-diff-kind=${row.kind}
        >
          <span class="settings-dialog__preset-diff-label">${row.label}</span>
          <span class="settings-dialog__preset-diff-value"
            >${row.before ?? '기본'}</span
          >
          <span class="settings-dialog__preset-diff-arrow">→</span>
          <span
            class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
            >${row.after ?? '기본(해제)'}</span
          >
        </div>`
    )}
    ${diff.ignored_keys.length > 0
      ? html`<div class="settings-dialog__preset-diff-note">
          ${diff.ignored_keys.join(', ')}은(는) 적용이 쓰지 않는 키라 무시됩니다
        </div>`
      : ''}
  </div>`;
}

/**
 * Hold both profiles' preset selections and draw their bars.
 *
 * @param {PresetBarContext} ctx
 */
export function createPresetBar(ctx) {
  const { root_dir, queueOf, send, rootPayload, notify, doRender } = ctx;

  /**
   * The selected preset, PER PROFILE. One shared variable would carry a
   * general preset's id into the `quick fix` tab's bar the moment the user
   * switched tabs, and the bar there lists only quick_fix presets (§6.1).
   *
   * @type {Record<string, string>}
   */
  const preset_choice = { general: '', quick_fix: '' };
  /**
   * Draft name for saving the current execution settings as a preset, per
   * profile for the same reason.
   *
   * @type {Record<string, string>}
   */
  const preset_name_draft = { general: '', quick_fix: '' };

  /** @returns {{ revision: number, presets: any[] }|null} */
  function presetState() {
    const state = ctx.binding.implPresetStore?.get();
    return isRecord(state) && Array.isArray(state.presets)
      ? /** @type {any} */ (state)
      : null;
  }

  /**
   * The presets of ONE profile, in store order. A preset written before
   * `applies_to` existed reads as `general` (§3.1).
   *
   * @param {'general'|'quick_fix'} profile
   * @returns {any[]}
   */
  function presetsOf(profile) {
    const state = presetState();
    return (state?.presets || []).filter(
      (/** @type {any} */ preset) =>
        normalizeAppliesTo(preset?.applies_to) === profile
    );
  }

  /**
   * The id this workspace's queue records as the applied preset OF ONE
   * PROFILE, or `null` with no record. The two records are independent, so a
   * tab reads only its own field (§4.1) — the names are the server's
   * `APPLIED_PRESET_FIELDS`, mirrored by `appliedPresetFieldFor`.
   *
   * @param {'general'|'quick_fix'} profile
   * @returns {string|null}
   */
  function appliedPresetIdOf(profile) {
    const queue = queueOf();
    const record = queue ? queue[appliedPresetFieldFor(profile)] : null;
    return isRecord(record) && typeof record.id === 'string' ? record.id : null;
  }

  /**
   * The selected preset of one profile, or `null`. The lookup stays inside
   * that profile's list, so a stale id from the other tab selects nothing.
   *
   * @param {'general'|'quick_fix'} profile
   * @returns {any}
   */
  function selectedPresetOf(profile) {
    const id = preset_choice[profile];
    return id
      ? (presetsOf(profile).find(
          (/** @type {any} */ preset) => preset.id === id
        ) ?? null)
      : null;
  }

  /**
   * Save this tab's execution settings as a preset OF THIS TAB'S PROFILE:
   * create when no preset is selected, update the selected one otherwise.
   * Conflicts notify and re-render — the store snapshot arrives through the
   * presets fanout.
   *
   * Presets are workspace-independent (one global catalog), so these three ops
   * take no `root_dir`.
   *
   * @param {'general'|'quick_fix'} profile
   */
  async function onSavePreset(profile) {
    const state = presetState();
    if (!state) {
      return;
    }
    const settings = ctx.executionDraftSettings(profile);
    if (Object.keys(settings).length === 0) {
      notify('저장할 실행 설정이 없습니다 — 먼저 실행 값을 선택하세요');
      return;
    }
    const selected = selectedPresetOf(profile);
    const name =
      preset_name_draft[profile].trim() || (selected ? selected.name : '');
    if (!name) {
      notify('프리셋 이름을 입력하세요');
      return;
    }
    try {
      const res = selected
        ? await send('impl-preset-update', {
            expected_revision: state.revision,
            id: selected.id,
            name,
            settings
          })
        : await send('impl-preset-create', {
            expected_revision: state.revision,
            name,
            applies_to: profile,
            settings
          });
      if (res && res.applied) {
        preset_name_draft[profile] = '';
        if (!selected && Array.isArray(res.presets)) {
          const created = res.presets.find(
            (/** @type {any} */ preset) =>
              preset.name === name &&
              normalizeAppliesTo(preset?.applies_to) === profile
          );
          preset_choice[profile] = created
            ? created.id
            : preset_choice[profile];
        }
        doRender();
      } else {
        notify('프리셋 저장 실패: 다른 곳에서 방금 변경되었습니다');
        doRender();
      }
    } catch (err) {
      notify(
        `프리셋 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  /**
   * Delete this tab's selected execution preset.
   *
   * @param {'general'|'quick_fix'} profile
   */
  async function onDeletePreset(profile) {
    const state = presetState();
    const selected = selectedPresetOf(profile);
    if (!state || !selected) {
      return;
    }
    try {
      const res = await send('impl-preset-delete', {
        expected_revision: state.revision,
        id: selected.id
      });
      if (res && res.applied) {
        preset_choice[profile] = '';
        doRender();
      } else {
        notify('프리셋 삭제 실패: 다른 곳에서 방금 변경되었습니다');
        doRender();
      }
    } catch (err) {
      notify(
        `프리셋 삭제 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  /**
   * Apply this tab's chosen execution preset to this workspace. The payload is
   * unchanged: the SERVER reads the preset's `applies_to` and decides which
   * keys it replaces, and the other profile's values are preserved (§4).
   *
   * @param {'general'|'quick_fix'} profile
   */
  async function onApplyPresetGlobally(profile) {
    const state = presetState();
    const queue = queueOf();
    const selected = selectedPresetOf(profile);
    if (!state || !queue || !selected) {
      return;
    }
    // Only a quick_fix apply needs the lane: a general preset replaces general
    // keys alone, so an old server drops nothing (§4).
    if (profile === 'quick_fix' && !ctx.supportsQuickFixLane()) {
      return;
    }
    /** @param {number} queue_revision */
    const payloadFor = (queue_revision) => ({
      preset_id: selected.id,
      expected_revision: state.revision,
      expected_queue_revision: queue_revision,
      ...rootPayload()
    });
    try {
      let res = await send(
        'apply-impl-preset-global',
        payloadFor(queue.revision)
      );
      if (res && res.applied) {
        ctx.adoptPresetApply(res);
      }
      // A bound pane races a repo whose queue this client does not subscribe
      // to, so the queue half gets the same one-shot CAS retry as every other
      // op here (§12).
      if (root_dir !== null && res && res.queue_applied === false) {
        const fresh =
          res.queue && typeof res.queue.revision === 'number'
            ? res.queue.revision
            : (queueOf()?.revision ?? queue.revision);
        res = await send('apply-impl-preset-global', payloadFor(fresh));
        if (res && res.applied) {
          ctx.adoptPresetApply(res);
        }
      }
      if (res && res.applied) {
        if (res.queue_applied === false) {
          notify('오케스트레이션 값은 적용되지 않았습니다 — 다시 시도하세요');
        }
      } else if (res && res.conflict) {
        notify('실행 프리셋 적용 실패: 프리셋이 방금 변경되었습니다');
      }
    } catch (err) {
      notify(
        `실행 프리셋 적용 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /**
   * One profile's preset bar: preset select · `적용` · name · save · delete on
   * one line, with the changed-keys preview under it. The list, the selection
   * and the name box are all that profile's own, so a choice made here never
   * reaches the other tab's bar (§6.1).
   *
   * A server with no quick_fix lane locks the WHOLE quick fix bar, not its
   * `적용` alone (§6.1); the general bar is untouched by that probe because a
   * general apply writes no quick_fix key (§4).
   *
   * @param {'general'|'quick_fix'} profile
   * @returns {TemplateResult}
   */
  function presetStripTemplate(profile) {
    const presets = presetsOf(profile);
    const chosen_id = preset_choice[profile];
    const selected_preset = selectedPresetOf(profile);
    const preset_diff = selected_preset
      ? buildPresetDiff(
          ctx.executionDraftSettings(profile),
          isRecord(selected_preset.settings) ? selected_preset.settings : {},
          profile
        )
      : null;
    const lane_locked = profile === 'quick_fix' && !ctx.supportsQuickFixLane();
    const lane_title = lane_locked ? QUICK_FIX_UNSUPPORTED : '';
    const value_change = Boolean(preset_diff && preset_diff.rows.length > 0);
    const record_matches =
      selected_preset !== null &&
      appliedPresetIdOf(profile) === selected_preset.id;
    const apply_title = presetApplyTitle({
      lane_locked,
      chosen: selected_preset !== null,
      value_change,
      record_matches
    });
    const save_title = lane_locked
      ? QUICK_FIX_UNSUPPORTED
      : `${
          selected_preset
            ? '현재 화면의 실행 설정을 이 프리셋에 저장합니다 (프리셋 → 설정 방향이 아님)'
            : '현재 화면의 실행 설정을 새 프리셋으로 저장합니다'
        } — ${PRESET_LIST_GLOBAL}`;
    return html`
      <div class="settings-dialog__preset-bar" data-preset-bar=${profile}>
        <select
          class="ui-select"
          aria-label="실행 프리셋"
          title=${lane_title}
          ?disabled=${lane_locked}
          .value=${live(chosen_id)}
          @change=${(/** @type {Event} */ ev) => {
            preset_choice[profile] = String(
              /** @type {HTMLSelectElement} */ (ev.target).value
            );
            doRender();
          }}
        >
          <option value="" ?selected=${chosen_id === ''}>실행 프리셋…</option>
          ${presets.map(
            (preset) =>
              html`<option
                value=${preset.id}
                ?selected=${preset.id === chosen_id}
              >
                ${preset.name}
              </option>`
          )}
        </select>
        <button
          type="button"
          class="ui-btn ui-btn--primary ui-btn--sm"
          data-preset-apply-global
          title=${apply_title}
          ?disabled=${lane_locked ||
          selected_preset === null ||
          (!value_change && record_matches)}
          @click=${() => onApplyPresetGlobally(profile)}
        >
          적용
        </button>
        <input
          type="text"
          class="ui-input settings-dialog__preset-name"
          placeholder=${selected_preset
            ? '이름 (비우면 유지)'
            : '새 프리셋 이름'}
          aria-label="프리셋 이름"
          title=${lane_title}
          ?disabled=${lane_locked}
          .value=${live(preset_name_draft[profile])}
          @input=${(/** @type {Event} */ ev) => {
            preset_name_draft[profile] = String(
              /** @type {HTMLInputElement} */ (ev.target).value
            );
          }}
        />
        <button
          type="button"
          class="ui-btn ui-btn--sm"
          data-preset-save
          title=${save_title}
          ?disabled=${lane_locked}
          @click=${() => onSavePreset(profile)}
        >
          ${selected_preset ? '현재 설정으로 덮어쓰기' : '새 프리셋 저장'}
        </button>
        <button
          type="button"
          class="ui-btn ui-btn--danger ui-btn--sm"
          data-preset-delete
          title=${lane_title}
          ?disabled=${lane_locked || selected_preset === null}
          @click=${() => onDeletePreset(profile)}
        >
          삭제
        </button>
      </div>
      ${preset_diff ? presetDiffTemplate(preset_diff) : ''}
    `;
  }

  return { presetStripTemplate };
}
