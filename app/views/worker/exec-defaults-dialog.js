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
 * Below the editing form the dialog also renders read-only verification and
 * external deployment declarations. Data rides the queue snapshot's
 * `workspace_info` decoration with no extra request or channel. Verification
 * may use config fallback; deployment comes only from the pinned repo declaration.
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
        return;
      }
      if (res && res.applied) {
        workspace_selection = null;
        doRender();
        return;
      }
      showToast('워크스페이스 기본 프리셋 저장 실패', 'error', 4000);
    } catch {
      showToast('워크스페이스 기본 프리셋 저장 실패', 'error', 4000);
    }
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
   * The verify row: what the merge gate runs before merging. Symmetric with
   * deploy since UI-uk6d — the command can only come from config, so unset it
   * names the section a user has to write.
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
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${workspace_path}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`;
  }

  /**
   * The deploy row: the pinned repository declaration the external deployment
   * provider consumes after Worker verification. The Worker displays this
   * command but never runs it.
   *
   * @param {any} deploy_cmd
   * @returns {import('lit-html').TemplateResult}
   */
  function deployGroup(deploy_cmd) {
    const cmd_text = deploy_cmd ? formatCmd(deploy_cmd.cmd) : '';
    const timeout_text = deploy_cmd ? formatTimeout(deploy_cmd.timeout_ms) : '';
    const note = timeout_text
      ? `timeout ${timeout_text} · external deployer 실행`
      : 'external deployer 실행';
    return html`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${cmd_text
        ? html`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${cmd_text}</span>
            ${badge('deployer', 'external')}
            <span class="exec-defaults__vd-meta">${note}</span>
          </div>`
        : html`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >docs/agents/repo-ops.toml [deploy]</span
            >
            선언으로 정의
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
   * @param {any} info
   * @returns {import('lit-html').TemplateResult}
   */
  function verifyDeploySection(info) {
    return html`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — repo 선언/config에서 정의</span
        >
      </p>
      ${verifyGroup(info.verify_cmd)} ${deployGroup(info.deploy_cmd)}
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
            ${systemPromptSection()}
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
