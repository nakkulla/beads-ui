import { html, render } from 'lit-html';
import { showToast } from '../../utils/toast.js';
import {
  DEFAULT_LABELS,
  EXEC_ADVANCED_GROUPS,
  EXEC_CORE_KEYS,
  EXEC_KEYS,
  EXEC_SETTING_PRESENTATION,
  execSettingLabelTemplate,
  execSettingRows,
  modelRunnerOf,
  normalizeImplTarget,
  selectOptionsTemplate
} from '../detail-panel/exec-settings.js';
import { promptBlockTemplate, promptStatusTemplate } from '../prompt-block.js';

/**
 * Worker-tab "전역 실행 설정" dialog: the single editing surface for the
 * workspace-global preset reference (not per-key defaults or workflow_mode). It mirrors
 * the display-settings dialog's native `<dialog>` shell (showModal/jsdom fallback,
 * close/cancel handling, destroy) and the Worker view's CAS contract:
 * a change sends `worker-queue-set-default-exec-preset` with queue and preset
 * revisions, and adopts both authoritative snapshots on a conflict without retry.
 *
 * Values resolve bead metadata > this global default > final fallback (`opus`
 * for orchestration_model, `default` for orchestration_speed, unset for the
 * other 10), so selecting `(기본)` records
 * an unset (null) — the store drops the key. A stored value outside the current
 * vocabulary (e.g. a model dropped from `config.toml`, or an effort the chosen
 * model does not accept) shows as its own selected `(비호환)` option, still
 * resettable to `(기본)`.
 *
 * Below the editing form the dialog also renders the read-only verification
 * declaration. Data rides the queue snapshot's `workspace_info` decoration with
 * no extra request or channel.
 *
 * @typedef {{ get: () => any, set: (q: any) => void, subscribe?: (fn: () => void) => () => void }} QueueStore
 * @typedef {{ get: () => any, set: (state: any) => void, subscribe?: (fn: () => void) => () => void }} PresetStore
 * @typedef {Object} ExecDefaultsOptions
 * @property {QueueStore} queueStore
 * @property {PresetStore} [presetStore]
 * @property {(type: import('../../protocol.js').MessageType, payload?: unknown) => Promise<any>} [transport]
 * @property {() => (string|undefined)} [getWorkspacePath] - Current workspace
 * path, used by the verify fallback hint.
 */

/**
 * Render a timeout in the unit the dialog shows it in (minutes above a minute,
 * seconds below it). An unusable value renders as '' so the caller drops it.
 *
 * @param {unknown} timeout_ms
 * @returns {string}
 */
function formatTimeout(timeout_ms) {
  if (typeof timeout_ms !== 'number' || !Number.isFinite(timeout_ms)) {
    return '';
  }
  if (timeout_ms <= 0) {
    return '';
  }
  if (timeout_ms < 60000) {
    return `${Math.round(timeout_ms / 1000)}초`;
  }
  const minutes = timeout_ms / 60000;
  return `${Number.isInteger(minutes) ? minutes : Math.round(minutes * 10) / 10}분`;
}

/**
 * Join an argv array the way the dialog displays it. A non-argv value (a legacy
 * or malformed record) renders as '' so the row falls back to its absent form.
 *
 * @param {unknown} cmd
 * @returns {string}
 */
function formatCmd(cmd) {
  if (!Array.isArray(cmd)) {
    return '';
  }
  return cmd.filter((part) => typeof part === 'string').join(' ');
}

/**
 * Create the exec-defaults dialog (native `<dialog>`).
 *
 * @param {HTMLElement} mount_element
 * @param {ExecDefaultsOptions} options
 * @returns {{ open: () => void, close: () => void, destroy: () => void }}
 */
export function createExecDefaultsDialog(mount_element, options) {
  const { queueStore, presetStore, transport, getWorkspacePath } = options;

  const dialog = /** @type {HTMLDialogElement} */ (
    document.createElement('dialog')
  );
  dialog.id = 'worker-exec-defaults-dialog';
  dialog.className = 'exec-defaults';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  mount_element.appendChild(dialog);

  /** @type {{ id: string|null, name: string, settings: Record<string, string> }|null} */
  let preset_draft = null;
  let preset_conflict = false;

  /**
   * @returns {any} Current queue snapshot (or an empty shape, mirroring the
   * Worker view so a pre-snapshot open still renders the selects at revision 0).
   */
  function currentQueue() {
    return (
      (queueStore && queueStore.get()) || { revision: 0, exec_defaults: {} }
    );
  }

  /**
   * @returns {number}
   */
  function currentRevision() {
    const q = currentQueue();
    return typeof q.revision === 'number' ? q.revision : 0;
  }

  /**
   * @returns {Record<string, string>}
   */
  /** @returns {{ revision: number, presets: any[] }|null} */
  function currentPresetState() {
    const state = presetStore ? presetStore.get() : null;
    if (!state || typeof state.revision !== 'number') {
      return null;
    }
    return {
      revision: state.revision,
      presets: Array.isArray(state.presets) ? state.presets : []
    };
  }

  /** @param {any} res */
  function adoptPresets(res) {
    if (
      presetStore &&
      res &&
      typeof res.revision === 'number' &&
      Array.isArray(res.presets)
    ) {
      presetStore.set({ revision: res.revision, presets: res.presets });
    }
  }

  /**
   * Adopt the authoritative queue a mutation reply carries so the view reflects
   * state before the fanout push arrives (and in tests without a socket).
   *
   * @param {any} res
   */
  function adopt(res) {
    if (res && res.queue && queueStore) {
      queueStore.set(res.queue);
    }
  }

  /**
   * The snapshot's `runner_catalog` decoration — the source of the grouped model
   * options and the per-model effort lists. Absent on a pre-snapshot or legacy
   * queue, which the shared row builder degrades fail-quiet.
   *
   * @returns {any}
   */
  function currentCatalog() {
    return currentQueue().runner_catalog ?? null;
  }

  /** @type {string|null} */
  let workspace_selection = null;

  /** @returns {string|null} */
  function selectedWorkspacePresetId() {
    if (workspace_selection !== null) {
      return workspace_selection;
    }
    const id = currentQueue().default_exec_preset_id;
    return typeof id === 'string' && id.length > 0 ? id : null;
  }

  /** @param {string} preset_id */
  async function saveWorkspacePreset(preset_id) {
    if (!transport) {
      return;
    }
    const state = currentPresetState();
    if (!state) {
      return;
    }
    // Optimistic only while the CAS request is in flight: every terminal
    // path below must fall back to the authoritative queue snapshot, or a
    // failed release would keep hiding the badge/release controls for good.
    workspace_selection = preset_id || '';
    const selection = workspacePresetSelection(preset_id);
    doRender();
    if (!selection.viable) {
      showToast(
        selection.missing
          ? '선택한 프리셋을 찾을 수 없어 저장하지 않았습니다.'
          : '비호환 프리셋은 워크스페이스 기본값으로 저장할 수 없습니다.',
        'error',
        4000
      );
      workspace_selection = null;
      doRender();
      return;
    }
    try {
      const res = await transport('worker-queue-set-default-exec-preset', {
        preset_id: preset_id || null,
        expected_queue_revision: currentRevision(),
        expected_preset_revision: state.revision
      });
      adopt(res);
      if (res && res.presets && presetStore) {
        presetStore.set(res.presets);
      }
      if (res && res.conflict) {
        showToast(
          '기본 프리셋이 변경됐습니다. 선택을 검토한 뒤 다시 저장하세요.',
          'error',
          4000
        );
      } else if (!(res && res.applied)) {
        showToast('워크스페이스 기본 프리셋 저장 실패', 'error', 4000);
      }
    } catch {
      showToast('워크스페이스 기본 프리셋 저장 실패', 'error', 4000);
    }
    workspace_selection = null;
    doRender();
  }

  /** @param {any} preset */
  function editPreset(preset) {
    preset_draft = {
      id: preset.id,
      name: preset.name,
      settings: { ...(preset.settings || {}) }
    };
    normalizePresetDraftImplTarget();
    preset_conflict = false;
    doRender();
  }

  function newPreset() {
    preset_draft = { id: null, name: '', settings: {} };
    preset_conflict = false;
    doRender();
  }

  /** @param {any} preset */
  function presetIsIncompatible(preset) {
    const settings =
      preset && preset.settings && typeof preset.settings === 'object'
        ? preset.settings
        : {};
    /** @param {string} key */
    const valueOf = (key) => {
      if (typeof settings[key] === 'string') {
        return settings[key];
      }
      return key === 'impl_runtime' && typeof settings.impl_model === 'string'
        ? modelRunnerOf(currentCatalog(), settings.impl_model) || ''
        : '';
    };
    return execSettingRows({
      selectedOf: valueOf,
      effectiveOf: valueOf,
      runner_catalog: currentCatalog()
    }).some((row) =>
      row.groups.some((group) =>
        group.options.some(
          (option) =>
            option.value === row.selected && option.label.endsWith('(비호환)')
        )
      )
    );
  }

  /**
   * @param {string} preset_id
   * @returns {{ viable: boolean, missing: boolean, incompatible: boolean, preset: any|null }}
   */
  function workspacePresetSelection(preset_id) {
    if (!preset_id) {
      return {
        viable: true,
        missing: false,
        incompatible: false,
        preset: null
      };
    }
    const state = currentPresetState();
    const preset = state?.presets.find((entry) => entry.id === preset_id);
    if (!preset || preset.migration_pending === true) {
      return {
        viable: false,
        missing: true,
        incompatible: false,
        preset: null
      };
    }
    const incompatible =
      preset.compatible === false || presetIsIncompatible(preset);
    return {
      viable: !incompatible,
      missing: false,
      incompatible,
      preset
    };
  }

  /** @returns {string|null} */
  function presetDraftControllerRuntime() {
    const model = preset_draft?.settings.orchestration_model;
    if (typeof model !== 'string') {
      return null;
    }
    return modelRunnerOf(currentCatalog(), model);
  }

  function normalizePresetDraftImplTarget() {
    if (!preset_draft) {
      return;
    }
    const normalized = normalizeImplTarget(
      {
        impl_runtime: preset_draft.settings.impl_runtime || '',
        impl_model: preset_draft.settings.impl_model || '',
        impl_effort: preset_draft.settings.impl_effort || ''
      },
      currentCatalog(),
      presetDraftControllerRuntime()
    );
    for (const key of /** @type {const} */ ([
      'impl_runtime',
      'impl_model',
      'impl_effort'
    ])) {
      if (normalized[key]) {
        preset_draft.settings[key] = normalized[key];
      } else {
        delete preset_draft.settings[key];
      }
    }
  }

  /** @param {any} preset */
  function presetSummary(preset) {
    const settings =
      preset && preset.settings && typeof preset.settings === 'object'
        ? preset.settings
        : {};
    const count = EXEC_KEYS.filter(
      (key) => typeof settings[key] === 'string'
    ).length;
    const choices = EXEC_KEYS.filter(
      (key) => typeof settings[key] === 'string'
    ).map(
      (key) =>
        `${EXEC_SETTING_PRESENTATION[key]?.title || key}: ${settings[key]}`
    );
    return {
      count: `${count}/12 지정`,
      choices: choices.length > 0 ? choices.join(' · ') : '모든 항목 기본값'
    };
  }

  /** @param {any} preset */
  async function deletePreset(preset) {
    if (!transport) {
      return;
    }
    if (
      !window.confirm(
        `“${preset.name}” 프리셋을 삭제할까요? 이미 적용된 이슈는 변경되지 않습니다.`
      )
    ) {
      return;
    }
    const state = currentPresetState();
    if (!state) {
      return;
    }
    try {
      const res = await transport('exec-preset-delete', {
        expected_revision: state.revision,
        id: preset.id
      });
      adoptPresets(res);
      if (res && res.conflict) {
        showToast(
          '프리셋이 다른 곳에서 변경됐습니다. 다시 확인하세요.',
          'error',
          4000
        );
      }
    } catch {
      showToast('프리셋 삭제 실패', 'error', 4000);
    }
  }

  /** @param {boolean} [as_new] */
  async function savePresetDraft(as_new = false) {
    if (!transport || !preset_draft) {
      return;
    }
    const state = currentPresetState();
    if (!state) {
      return;
    }
    const create = as_new || preset_draft.id === null;
    const payload = {
      expected_revision: state.revision,
      ...(create ? {} : { id: preset_draft.id }),
      name: preset_draft.name,
      settings: { ...preset_draft.settings }
    };
    try {
      const res = await transport(
        create ? 'exec-preset-create' : 'exec-preset-update',
        payload
      );
      adoptPresets(res);
      if (res && res.conflict) {
        preset_conflict = true;
        doRender();
        return;
      }
      if (res && res.applied) {
        preset_draft = null;
        preset_conflict = false;
        doRender();
        return;
      }
      showToast('프리셋 저장 실패', 'error', 4000);
    } catch {
      showToast('프리셋 저장 실패', 'error', 4000);
    }
  }

  /** @param {import('../detail-panel/exec-settings.js').ExecRow} row */
  function presetSelectRow(row) {
    return html`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${execSettingLabelTemplate(row.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${row.key}
        ?disabled=${row.disabled}
        @change=${(/** @type {Event} */ ev) => {
          if (!preset_draft) {
            return;
          }
          const value = /** @type {HTMLSelectElement} */ (ev.target).value;
          if (value) {
            preset_draft.settings[row.key] = value;
          } else {
            delete preset_draft.settings[row.key];
          }
          if (
            row.key === 'impl_runtime' ||
            row.key === 'impl_model' ||
            row.key === 'impl_effort' ||
            row.key === 'orchestration_model'
          ) {
            normalizePresetDraftImplTarget();
          }
          preset_conflict = false;
          doRender();
        }}
      >
        ${selectOptionsTemplate(
          row.groups,
          row.selected,
          DEFAULT_LABELS[row.key] || '(기본)'
        )}
      </select>
    </div>`;
  }

  function presetEditor() {
    if (!preset_draft) {
      return '';
    }
    /** @param {string} key */
    const valueOf = (key) =>
      typeof preset_draft?.settings[key] === 'string'
        ? preset_draft.settings[key]
        : '';
    const rows = execSettingRows({
      selectedOf: valueOf,
      effectiveOf: valueOf,
      runner_catalog: currentCatalog(),
      controller_runtime: presetDraftControllerRuntime()
    });
    const advanced_count = EXEC_ADVANCED_GROUPS.flatMap(
      (group) => group.keys
    ).filter((key) => typeof preset_draft?.settings[key] === 'string').length;
    /**
     * @param {string} key
     * @returns {import('lit-html').TemplateResult|string}
     */
    const rowTemplate = (key) => {
      const row = rows.find((entry) => entry.key === key);
      return row ? presetSelectRow(row) : '';
    };
    const state = currentPresetState();
    const deleted =
      preset_draft.id !== null &&
      state !== null &&
      !state.presets.some((preset) => preset.id === preset_draft?.id);
    return html`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${preset_draft.name}
          data-preset-name
          @input=${(/** @type {Event} */ ev) => {
            if (preset_draft) {
              preset_draft.name = /** @type {HTMLInputElement} */ (
                ev.target
              ).value;
              preset_conflict = false;
            }
          }}
        />
      </label>
      ${preset_conflict
        ? html`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`
        : ''}
      ${deleted
        ? html`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`
        : ''}
      <section class="exec-preset-editor__core" data-preset-core>
        ${EXEC_CORE_KEYS.map(rowTemplate)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${advanced_count}개 변경됨</summary>
        ${EXEC_ADVANCED_GROUPS.map(
          (group) =>
            html`<section
              class="exec-preset-editor__group"
              data-preset-group=${group.id}
            >
              <h4>${group.label}</h4>
              ${group.keys.map(rowTemplate)}
            </section>`
        )}
      </details>
      <div class="exec-preset-editor__actions">
        ${deleted
          ? html`<button
              type="button"
              data-preset-save-as-new
              @click=${() => void savePresetDraft(true)}
            >
              새 프리셋으로 저장
            </button>`
          : html`<button
              type="button"
              data-preset-save
              @click=${() => void savePresetDraft(false)}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${() => {
            preset_draft = null;
            preset_conflict = false;
            doRender();
          }}
        >
          취소
        </button>
      </div>
    </div>`;
  }

  function presetSection() {
    const state = currentPresetState();
    const presets = state
      ? state.presets.filter((preset) => preset?.migration_pending !== true)
      : [];
    const selected_id = selectedWorkspacePresetId() || '';
    const selected_workspace = workspacePresetSelection(selected_id);
    return html`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${newPreset}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${state === null
        ? html`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`
        : presets.length === 0
          ? html`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`
          : presets.map((preset) => {
              const summary = presetSummary(preset);
              const assignment = workspacePresetSelection(preset.id);
              const is_default = preset.id === selected_id;
              const assignment_reason = assignment.missing
                ? '프리셋을 찾을 수 없어 기본으로 지정할 수 없습니다'
                : assignment.incompatible
                  ? '비호환 프리셋은 기본으로 지정할 수 없습니다'
                  : '';
              const has_reference_count =
                typeof preset.reference_count === 'number';
              const reference_count = has_reference_count
                ? preset.reference_count
                : null;
              const impact = Array.isArray(preset.reference_summary)
                ? preset.reference_summary
                    .map(
                      (/** @type {any} */ entry) =>
                        entry?.display_name || entry?.workspace_key
                    )
                    .filter(Boolean)
                    .join(', ')
                : '';
              return html`<article
                class="exec-preset-card"
                data-preset-id=${preset.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${preset.name}</strong>
                  ${is_default
                    ? html`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`
                    : ''}
                  <span>${summary.count}</span>
                  <span data-preset-references=${preset.id}
                    >${has_reference_count
                      ? `참조 ${reference_count}개`
                      : '참조 확인 불가'}</span
                  >
                  ${assignment.incompatible
                    ? html`<span data-preset-incompatible>비호환</span>`
                    : ''}
                  <small>${summary.choices}</small>
                  ${impact
                    ? html`<small data-preset-impact=${preset.id}
                        >업데이트 영향: ${impact}</small
                      >`
                    : ''}
                </div>
                <div class="exec-preset-card__actions">
                  ${is_default
                    ? html`<button
                        type="button"
                        data-workspace-preset-release=${preset.id}
                        @click=${() => void saveWorkspacePreset('')}
                      >
                        기본 해제
                      </button>`
                    : html`<button
                        type="button"
                        data-workspace-preset-assign=${preset.id}
                        ?disabled=${!assignment.viable}
                        title=${assignment_reason}
                        @click=${() => void saveWorkspacePreset(preset.id)}
                      >
                        기본으로
                      </button>`}
                  <button
                    type="button"
                    data-preset-edit=${preset.id}
                    @click=${() => editPreset(preset)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${preset.id}
                    ?disabled=${reference_count === null ||
                    reference_count > 0 ||
                    preset.reference_scan_complete === false}
                    title=${reference_count === null
                      ? '참조 수를 확인할 수 없어 삭제할 수 없습니다'
                      : reference_count > 0
                        ? '참조 중인 워크스페이스가 있어 삭제할 수 없습니다'
                        : preset.reference_scan_complete === false
                          ? '참조 스캔이 완료되지 않아 삭제할 수 없습니다'
                          : ''}
                    @click=${() => void deletePreset(preset)}
                  >
                    삭제
                  </button>
                </div>
              </article>`;
            })}
      ${state !== null && selected_id && selected_workspace.missing
        ? html`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${selected_id} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${selected_id}
                @click=${() => void saveWorkspacePreset('')}
              >
                기본 해제
              </button>
            </div>
          </article>`
        : ''}
      ${presetEditor()}
    </section>`;
  }

  /**
   * @returns {any} The snapshot's `workspace_info` decoration (or an empty
   * shape: a pre-snapshot or legacy queue simply has nothing to show).
   */
  function currentWorkspaceInfo() {
    const info = currentQueue().workspace_info;
    return info && typeof info === 'object' ? info : {};
  }

  /**
   * @param {string} modifier
   * @param {string} label
   * @returns {import('lit-html').TemplateResult}
   */
  function badge(modifier, label) {
    return html`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${modifier}"
      >${label}</span
    >`;
  }

  /**
   * The verify row: what the merge gate runs before merging. The command can
   * only come from config (UI-uk6d), so unset it names the section a user has
   * to write.
   *
   * @param {any} verify_cmd
   * @returns {import('lit-html').TemplateResult}
   */
  function verifyGroup(verify_cmd) {
    const cmd_text = verify_cmd ? formatCmd(verify_cmd.cmd) : '';
    const timeout_text = verify_cmd ? formatTimeout(verify_cmd.timeout_ms) : '';
    const workspace_path =
      (getWorkspacePath && getWorkspacePath()) || '<workspace 경로>';
    return html`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${cmd_text
        ? html`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${cmd_text}</span>
            ${badge('config', 'config')}
            ${timeout_text
              ? html`<span class="exec-defaults__vd-meta"
                  >timeout ${timeout_text}</span
                >`
              : ''}
          </div>`
        : html`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            ${badge('absent', '안 함')} 검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${workspace_path}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`;
  }

  // Worker system-prompt section state (UI-rxp3 §4). Collapsed by default and
  // fetched once per dialog lifetime — the contract is a constant, so a second
  // open of the same dialog re-renders the text it already has.
  let prompt_expanded = false;
  let prompt_loading = false;
  let prompt_error = false;
  /** @type {any} */
  let prompt_data = null;

  /**
   * Fetch the assembled contract. The server builds it through `preamble.js`,
   * the single owner of the text — the client holds no copy to drift from it.
   */
  async function fetchSystemPrompt() {
    if (!transport) {
      return;
    }
    prompt_loading = true;
    prompt_error = false;
    doRender();
    try {
      const res = await Promise.resolve(
        transport(/** @type {any} */ ('get-worker-system-prompt'), {})
      );
      if (!res || typeof res !== 'object' || Array.isArray(res)) {
        prompt_error = true;
      } else {
        prompt_data = res;
      }
    } catch {
      prompt_error = true;
    } finally {
      prompt_loading = false;
      doRender();
    }
  }

  function toggleSystemPrompt() {
    prompt_expanded = !prompt_expanded;
    if (prompt_expanded && !prompt_data) {
      void fetchSystemPrompt();
      return;
    }
    doRender();
  }

  /**
   * The 「워커 시스템 프롬프트」 section: the full contract every worker session
   * is launched with, plus the conditional variants and the condition that
   * selects each. Read-only, like the verify/deploy section above it — the text
   * is owned by the server and there is nothing to edit here.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function systemPromptSection() {
    return html`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${prompt_expanded ? 'true' : 'false'}
          @click=${toggleSystemPrompt}
        >
          ${prompt_expanded ? '접기' : '전문 보기'}
        </button>
      </p>
      ${prompt_expanded ? systemPromptBody() : ''}
    </section>`;
  }

  /**
   * @returns {import('lit-html').TemplateResult|''}
   */
  function systemPromptBody() {
    const status = promptStatusTemplate({
      loading: prompt_loading,
      error: prompt_error
    });
    if (status) {
      return status;
    }
    if (!prompt_data) {
      return '';
    }
    const variants = Array.isArray(prompt_data.variants)
      ? prompt_data.variants
      : [];
    return html`<div class="exec-defaults__sp-body">
      ${prompt_data.target_base_placeholder
        ? html`<div class="prompt-block__meta">
            \`${prompt_data.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`
        : ''}
      ${variants.map(
        (/** @type {any} */ v) =>
          html`<div class="exec-defaults__sp-variant" data-variant=${v.key}>
            <div class="exec-defaults__sp-cond">${v.condition}</div>
            ${promptBlockTemplate(v.label, v.system_prompt)}
          </div>`
      )}
    </div>`;
  }

  /**
   * Format a timeout for display. `10분` reads; `600000` does not.
   *
   * @param {unknown} timeout_ms
   * @returns {string}
   */
  function formatLaneTimeout(timeout_ms) {
    if (typeof timeout_ms !== 'number' || !Number.isFinite(timeout_ms)) {
      return '';
    }
    const minutes = timeout_ms / 60000;
    return Number.isInteger(minutes)
      ? `timeout ${minutes}분`
      : `timeout ${Math.round(timeout_ms / 1000)}초`;
  }

  /**
   * The 저장소 작업 선언 card (UI-q0uy §4.5): what the WORKER actually consumes —
   * `repo-ops/config.toml` read from a pinned base SHA — rather than the legacy
   * path the old rows read, which is why this repo's `[deploy]` was invisible.
   *
   * @param {any} repo_ops
   * @returns {import('lit-html').TemplateResult}
   */
  /**
   * The timeout badge for one declared lane, or nothing when the declaration
   * carries no readable timeout — an empty badge is a shape with no fact in it.
   *
   * @param {unknown} timeout_ms
   * @returns {import('lit-html').TemplateResult|string}
   */
  function laneTimeoutBadge(timeout_ms) {
    const text = formatLaneTimeout(timeout_ms);
    return text ? badge('config', text) : '';
  }

  /**
   * @param {any} repo_ops
   * @returns {import('lit-html').TemplateResult}
   */
  function repoOpsDeclarationSection(repo_ops) {
    const sha = typeof repo_ops.base_sha === 'string' ? repo_ops.base_sha : '';
    const source = `${repo_ops.source_path || 'repo-ops/config.toml'} @ ${
      repo_ops.base_ref || '?'
    }${sha ? `@${sha.slice(0, 7)}` : ''}`;
    return html`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">
        저장소 작업 선언
        <span class="exec-defaults__vd-src">${source}</span>
      </p>
      <div class="exec-defaults__lane" data-lane="verify">
        <span class="exec-defaults__lane-k">머지 전 검증</span>
        <span class="exec-defaults__lane-v"
          >${repo_ops.verify
            ? html`<code class="exec-defaults__vd-cmd"
                  >${repo_ops.verify.script}</code
                >${laneTimeoutBadge(repo_ops.verify.timeout_ms)}`
            : html`선언 없음${badge('absent', 'verify 없이 판정')}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${repo_ops.verify
            ? '머지 전에 이 스크립트가 통과해야 자격을 얻습니다.'
            : '머지 자격은 PR/base/head 신선도·mergeability·리뷰 영수증으로만 판정합니다.'}</span
        >
      </div>
      <div class="exec-defaults__lane" data-lane="deploy">
        <span class="exec-defaults__lane-k">머지 후 배포</span>
        <span class="exec-defaults__lane-v"
          >${repo_ops.deploy
            ? html`<code class="exec-defaults__vd-cmd"
                  >${repo_ops.deploy.script}</code
                >${laneTimeoutBadge(repo_ops.deploy.timeout_ms)}`
            : html`선언 없음${badge('absent', '배포 없음')}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${repo_ops.deploy
            ? html`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`
            : '머지 후 배포 단계 없이 곧바로 정리로 넘어갑니다.'}</span
        >
      </div>
    </section>`;
  }

  /**
   * The declaration surface. Only a PROVEN absence (`absent`, or a snapshot from
   * a server that predates the field) falls back to the legacy verify row —
   * `pending` and `error` say what they are, so a repo that HAS a declaration
   * never quietly reads as one that does not (§4.5/§4.6-1).
   *
   * @param {any} info
   * @returns {import('lit-html').TemplateResult}
   */
  function verifyDeploySection(info) {
    const repo_ops =
      info.repo_ops && typeof info.repo_ops === 'object' ? info.repo_ops : null;
    if (repo_ops && repo_ops.status === 'resolved') {
      return repoOpsDeclarationSection(repo_ops);
    }
    if (
      repo_ops &&
      (repo_ops.status === 'pending' || repo_ops.status === 'error')
    ) {
      return html`<section class="exec-defaults__vd" data-seam="repo-ops">
        <p class="exec-defaults__vd-title">
          저장소 작업 선언
          <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
        </p>
        <div
          class="exec-defaults__vd-line exec-defaults__vd-absent"
          data-seam="repo-ops-status"
        >
          ${repo_ops.status === 'pending'
            ? '선언 확인 중'
            : html`선언 읽기
              실패${repo_ops.error_code
                ? html` — <code>${repo_ops.error_code}</code>`
                : ''}`}
        </div>
      </section>`;
    }
    return html`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증 설정
        <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
      </p>
      ${verifyGroup(info.verify_cmd)}
    </section>`;
  }

  /**
   * Send the INDEPENDENT `자동 해결` mutation (master spec §9.3). It carries only
   * the queue revision and its own boolean: this switch never reads or writes
   * 자동화 (`auto_advance`/`auto_merge`), and 자동화 never writes this one.
   *
   * @param {boolean} on
   */
  async function saveAutoRepair(on) {
    if (!transport) {
      return;
    }
    const res = await transport(
      /** @type {any} */ ('worker-auto-repair-toggle'),
      { on, expected_revision: currentRevision() }
    );
    adopt(res);
    if (res && res.conflict) {
      const retried = await transport(
        /** @type {any} */ ('worker-auto-repair-toggle'),
        { on, expected_revision: currentRevision() }
      );
      adopt(retried);
    }
    doRender();
  }

  /**
   * The three §10 lists. Their MEMBERSHIP comes entirely from the pinned policy
   * the server projects — this map only says each contract token in Korean and
   * falls back to the token itself, so a contract that gains an entry shows up
   * here without anyone editing a sentence into the client.
   *
   * @type {Record<string, string>}
   */
  const POLICY_TOKEN_LABELS = {
    owned_deploy_worktree_fetch_detached_alignment_recreate:
      '전용 배포 워크트리 정렬·복구',
    recovered_pre_execution_fetch_timeout_retry_once: 'fetch 타임아웃 1회 복구',
    repo_serial_lock_wait: '저장소 순차 실행 대기',
    restart_operation_adoption: '재시작 후 작업 인계',
    exact_input_exit_zero_evidence_adoption: '동일 입력 성공 증거 인계',
    descendant_success_covers_ancestor_rows: '최신 SHA 성공이 이전 행 커버',
    owned_verify_candidate_cleanup: '검증 임시 체크아웃 정리',
    script_retry: '스크립트 재시도',
    auto_repair_session: '자동 해결 세션',
    user_triggered_session: '사용자 해결 세션',
    automatic: '자동',
    user_action_only: '사용자 클릭',
    script_identity_present: '스크립트가 있을 때만',
    per_completion_chain: '완료 체인당',
    unbounded: '횟수 제한 없음',
    bounded_single_script_retry_exceeded: '단일 스크립트 재시도 한도 초과',
    baseline_failure_ignore: '기존 실패 무시',
    config_or_script_deletion_to_bypass_gate:
      '설정·스크립트 삭제로 게이트 우회',
    credential_entry: '자격증명 입력·출력',
    destructive_action: '파괴적 작업',
    history_rewrite: '히스토리 재작성',
    agent_self_report_as_success: '세션 자기보고를 성공 처리',
    unbounded_repair_session_retry: '무한 해결 세션 반복'
  };

  /**
   * @param {string} title
   * @param {string[]} tokens
   * @param {string} seam
   * @returns {import('lit-html').TemplateResult}
   */
  function policyList(title, tokens, seam) {
    return html`<div class="exec-defaults__policy-group" data-policy=${seam}>
      <div class="exec-defaults__policy-label">${title}</div>
      <ul class="exec-defaults__policy-list">
        ${tokens.map(
          (token) =>
            html`<li data-token=${token}>
              ${POLICY_TOKEN_LABELS[token] || token}
            </li>`
        )}
      </ul>
    </div>`;
  }

  /**
   * Render the ordered ladder from artifact fields. Unknown ids, triggers, and
   * limit tokens stay visible verbatim instead of being dropped by the client.
   *
   * @param {Record<string, any>[]} entries
   * @returns {import('lit-html').TemplateResult}
   */
  function resolutionLadder(entries) {
    return html`<div
      class="exec-defaults__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="exec-defaults__policy-label">해결 사다리</div>
      <ol class="exec-defaults__policy-list">
        ${entries.map((entry) => {
          /** @type {string[]} */
          const details = [POLICY_TOKEN_LABELS[entry.trigger] || entry.trigger];
          if (Number.isInteger(entry.attempts_per_operation_attempt)) {
            details.push(
              `operation당 ${entry.attempts_per_operation_attempt}회`
            );
          } else if (Number.isInteger(entry.attempts)) {
            details.push(
              `${POLICY_TOKEN_LABELS[entry.budget] || entry.budget} ${entry.attempts}회`
            );
          } else if (Number.isInteger(entry.sessions_per_user_action)) {
            details.push(
              `${entry.sessions_per_user_action}회`,
              POLICY_TOKEN_LABELS[entry.user_actions] || entry.user_actions
            );
          }
          if (entry.applies_when) {
            details.push(
              POLICY_TOKEN_LABELS[entry.applies_when] || entry.applies_when
            );
          }
          return html`<li data-token=${entry.id}>
            <strong>${POLICY_TOKEN_LABELS[entry.id] || entry.id}</strong>
            <span>${details.filter(Boolean).join(' · ')}</span>
          </li>`;
        })}
      </ol>
    </div>`;
  }

  /**
   * The `자동 해결` section: the durable toggle, the remaining automatic budget,
   * the active repair session, and the three policy lists the backend sends.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function autoRepairSection() {
    const q = currentQueue();
    const on = q.auto_repair !== false;
    const policy =
      q.repo_operation_policy && typeof q.repo_operation_policy === 'object'
        ? q.repo_operation_policy
        : null;
    const operations = Array.isArray(q.repo_operations)
      ? q.repo_operations
      : [];
    const active = operations.find(
      (/** @type {any} */ card) => card.state === 'repairing'
    );
    // The remaining budget the reader cares about is the one closest to being
    // spent: the smallest remaining count across the operations that still
    // have a live repair chain.
    const open_chains = operations.filter(
      (/** @type {any} */ card) =>
        card.state === 'failed' || card.state === 'repairing'
    );
    const remaining = open_chains.length
      ? Math.min(
          ...open_chains.map((/** @type {any} */ card) =>
            typeof card.repair?.remaining === 'number'
              ? card.repair.remaining
              : 0
          )
        )
      : (policy?.auto_repair?.resolution_ladder?.find(
          (/** @type {any} */ entry) => entry.id === 'auto_repair_session'
        )?.attempts ?? 1);
    const ladder = Array.isArray(policy?.auto_repair?.resolution_ladder)
      ? policy.auto_repair.resolution_ladder
      : [];
    return html`<section class="exec-defaults__repair" data-seam="auto-repair">
      <p class="exec-defaults__vd-title">
        자동 해결
        <span class="exec-defaults__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="exec-defaults__repair-toggle">
        <input
          type="checkbox"
          class="exec-defaults__repair-input"
          .checked=${on}
          @change=${(/** @type {Event} */ ev) =>
            void saveAutoRepair(
              /** @type {HTMLInputElement} */ (ev.target).checked
            )}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="exec-defaults__repair-state">
        <span class="exec-defaults__repair-value" data-seam="auto-repair-value"
          >${on ? '켜짐' : '꺼짐'}</span
        >
        <span
          class="exec-defaults__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${remaining}회</span
        >
        <span
          class="exec-defaults__repair-session"
          data-seam="auto-repair-session"
          >${active
            ? `해결 세션 실행 중 · ${active.repair?.owner_bead || active.operation_id}`
            : '실행 중인 해결 세션 없음'}</span
        >
      </div>
      ${policy
        ? html`<details class="exec-defaults__policy" data-seam="policy-lists">
            <summary>
              Worker 자동 처리 기준
              <span class="exec-defaults__policy-count"
                >자동 ${(policy.worker_automatic || []).length} · 해결 사다리
                ${ladder.length} · 금지
                ${(policy.never_automatic || []).length}</span
              >
            </summary>
            ${policyList(
              'Worker가 자동 처리',
              policy.worker_automatic || [],
              'worker-automatic'
            )}
            ${policy.supported === false || policy.schema_version !== 2
              ? html`<div
                  class="exec-defaults__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`계약 스키마 불일치 — 자동 해결이 정지되었습니다 (v${policy.schema_version})`}
                </div>`
              : resolutionLadder(ladder)}
            ${policyList(
              '자동으로 하지 않음',
              policy.never_automatic || [],
              'never-automatic'
            )}
          </details>`
        : ''}
    </section>`;
  }

  function doRender() {
    render(
      html`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${close}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${presetSection()} ${verifyDeploySection(currentWorkspaceInfo())}
            ${autoRepairSection()} ${systemPromptSection()}
          </div>
        </div>
      `,
      dialog
    );
  }

  // Tracked separately from `dialog.open` so a pushed snapshot still re-renders
  // where `showModal` is unavailable (jsdom) and the native flag never flips.
  let is_open = false;

  // Escape dismisses a native <dialog> without going through close(), so the flag
  // has to follow the element or the dialog could never be reopened.
  const onDialogClose = () => {
    is_open = false;
  };

  /** @param {MouseEvent} ev */
  const onDialogClick = (ev) => {
    if (ev.target === ev.currentTarget) {
      close();
    }
  };
  dialog.addEventListener('close', onDialogClose);
  dialog.addEventListener('cancel', onDialogClose);
  dialog.addEventListener('click', onDialogClick);

  /** @type {null | (() => void)} */
  let unsubscribe_queue = null;
  if (queueStore && queueStore.subscribe) {
    unsubscribe_queue = queueStore.subscribe(() => {
      if (is_open) {
        doRender();
      }
    });
  }
  /** @type {null | (() => void)} */
  let unsubscribe_presets = null;
  if (presetStore && presetStore.subscribe) {
    unsubscribe_presets = presetStore.subscribe(() => {
      if (is_open) {
        doRender();
      }
    });
  }

  function open() {
    if (is_open) {
      return;
    }
    is_open = true;
    doRender();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function close() {
    if (!is_open) {
      return;
    }
    is_open = false;
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }

  return {
    open,
    close,
    destroy() {
      is_open = false;
      dialog.removeEventListener('close', onDialogClose);
      dialog.removeEventListener('cancel', onDialogClose);
      dialog.removeEventListener('click', onDialogClick);
      if (unsubscribe_queue) {
        unsubscribe_queue();
        unsubscribe_queue = null;
      }
      if (unsubscribe_presets) {
        unsubscribe_presets();
        unsubscribe_presets = null;
      }
      dialog.remove();
    }
  };
}
