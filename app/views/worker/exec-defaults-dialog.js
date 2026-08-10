import { html, render } from 'lit-html';
import { formatTimestampLocal } from '../../utils/relative-time.js';
import { showToast } from '../../utils/toast.js';
import {
  DEFAULT_LABELS,
  EXEC_KEYS,
  EXEC_SETTING_PRESENTATION,
  execSettingLabelTemplate,
  execSettingRows,
  selectOptionsTemplate
} from '../detail-panel/exec-settings.js';
import { promptBlockTemplate, promptStatusTemplate } from '../prompt-block.js';

/**
 * Worker-tab "전역 실행 설정" dialog: the single editing surface for the
 * workspace-global exec defaults (the 10 exec keys, NOT workflow_mode). It mirrors
 * the display-settings dialog's native `<dialog>` shell (showModal/jsdom fallback,
 * close/cancel handling, destroy) and the Worker view's CAS contract:
 * a change sends `worker-queue-set-exec-default` with the current queue revision,
 * adopts the authoritative queue the reply carries, and replays the SAME edit once
 * against the fresh revision on a CAS conflict.
 *
 * Values resolve bead metadata > this global default > final fallback (`opus`
 * for orchestration_model, unset for the other 9), so selecting `(기본)` records
 * an unset (null) — the store drops the key. A stored value outside the current
 * vocabulary (e.g. a model dropped from `config.toml`, or an effort the chosen
 * model does not accept) shows as its own selected `(비호환)` option, still
 * resettable to `(기본)`.
 *
 * Below the editing form the dialog also renders the read-only 「검증·배포 설정」
 * section (worker-deploy-hook §4): what the merge click verifies and deploys for
 * the current workspace, plus the last deploy's outcome. Its data rides the
 * queue snapshot's `workspace_info` decoration — no extra request or channel —
 * and it carries NO editing control: the commands live in `config.toml` only,
 * which is the security boundary.
 *
 * @typedef {{ get: () => any, set: (q: any) => void, subscribe?: (fn: () => void) => () => void }} QueueStore
 * @typedef {{ get: () => any, set: (state: any) => void, subscribe?: (fn: () => void) => () => void }} PresetStore
 * @typedef {Object} ExecDefaultsOptions
 * @property {QueueStore} queueStore
 * @property {PresetStore} [presetStore]
 * @property {(type: import('../../protocol.js').MessageType, payload?: unknown) => Promise<any>} [transport]
 * @property {() => (string|undefined)} [getWorkspacePath] - Current workspace
 * path, used only to name the `[worker.deploy."<path>"]` section a user must
 * write when no deploy command is configured.
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
 * The badge each deploy outcome renders as. An outcome outside the vocabulary
 * has no badge, so the row is dropped (fail-quiet contract consumption).
 *
 * @type {Record<string, { modifier: string, label: string }>}
 */
const DEPLOY_OUTCOME_BADGES = {
  deployed: { modifier: 'ok', label: '성공' },
  // `launched` is an INTENT, never a confirmation — a self-restarting deploy
  // kills the only process that could have observed its exit. The label says so
  // rather than letting an unobserved run read as a success (UI-l53x §5).
  launched: { modifier: 'launched', label: '발사됨 · 결과 미관측' },
  failed: { modifier: 'fail', label: '실패' }
};

/**
 * How much of a preserved diagnostic string the dialog shows before eliding it —
 * the same value the worker banner uses (`running-grid.js`'s
 * `BANNER_DETAIL_MAX`). Deliberately duplicated rather than shared: the two are
 * separate modules with no existing common util, and one 160 is not worth a new
 * one (UI-l53x §5, 비범위).
 *
 * @type {number}
 */
const DETAIL_MAX = 160;

/**
 * Keep a diagnostic string to one dialog line.
 *
 * @param {string} text
 * @returns {string}
 */
function truncateDetail(text) {
  return text.length > DETAIL_MAX ? `${text.slice(0, DETAIL_MAX)}…` : text;
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
  function currentDefaults() {
    const d = currentQueue().exec_defaults;
    return d && typeof d === 'object' ? d : {};
  }

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
   * Set (or unset with '') a global exec default, retrying ONCE on a CAS conflict
   * against the revision the server just reported — the Worker view's adopt-and-
   * replay discipline. `''` (the `(기본)` option) is sent as `null` = unset.
   *
   * @param {string} key
   * @param {string} value
   */
  async function save(key, value) {
    if (!transport) {
      return;
    }
    const payload = { key, value: value || null };
    try {
      let res = await transport('worker-queue-set-exec-default', {
        ...payload,
        expected_revision: currentRevision()
      });
      adopt(res);
      if (res && res.conflict) {
        res = await transport('worker-queue-set-exec-default', {
          ...payload,
          expected_revision: currentRevision()
        });
        adopt(res);
      }
      if (res && res.conflict) {
        showToast(
          '전역 실행 설정 저장 실패: 다른 클라이언트와 충돌',
          'error',
          4000
        );
      }
    } catch {
      showToast('전역 실행 설정 저장 실패', 'error', 4000);
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

  /**
   * One global exec-default row. The option model comes from the SAME
   * `execSettingRows` the detail panel uses, so the two surfaces share the
   * grouping, the per-model effort narrowing, the self/skip gate and the
   * `(비호환)` rule instead of implementing them twice. This dialog edits the
   * global layer itself, so `selected` and `effective` are the one value.
   *
   * @param {import('../detail-panel/exec-settings.js').ExecRow} row
   * @returns {import('lit-html').TemplateResult}
   */
  function selectRow(row) {
    const { key } = row;
    return html`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${execSettingLabelTemplate(key)}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`전역 ${key}`}
        data-key=${key}
        ?disabled=${row.disabled}
        @change=${(/** @type {Event} */ ev) =>
          void save(key, /** @type {HTMLSelectElement} */ (ev.target).value)}
      >
        ${selectOptionsTemplate(
          row.groups,
          row.selected,
          DEFAULT_LABELS[key] || '(기본)'
        )}
      </select>
      ${row.runner
        ? html`<span class="exec-defaults__runner" data-runner-for=${key}
            >${row.runner}</span
          >`
        : ''}
    </div>`;
  }

  /** @param {any} preset */
  function editPreset(preset) {
    preset_draft = {
      id: preset.id,
      name: preset.name,
      settings: { ...(preset.settings || {}) }
    };
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
    const valueOf = (key) =>
      typeof settings[key] === 'string' ? settings[key] : '';
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

  /** @param {any} preset */
  function presetSummary(preset) {
    const settings =
      preset && preset.settings && typeof preset.settings === 'object'
        ? preset.settings
        : {};
    const count = EXEC_KEYS.filter(
      (key) => typeof settings[key] === 'string'
    ).length;
    const model_keys = [
      'orchestration_model',
      'spec_review_model',
      'plan_review_model',
      'impl_review_model',
      'impl_model'
    ];
    const choices = model_keys
      .filter((key) => typeof settings[key] === 'string')
      .map(
        (key) =>
          `${EXEC_SETTING_PRESENTATION[key]?.title || key}: ${settings[key]}`
      );
    return {
      count: `${count}/10 지정`,
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
      runner_catalog: currentCatalog()
    });
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
      ${rows.map(presetSelectRow)}
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
        : state.presets.length === 0
          ? html`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`
          : state.presets.map((preset) => {
              const summary = presetSummary(preset);
              return html`<article
                class="exec-preset-card"
                data-preset-id=${preset.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${preset.name}</strong>
                  <span>${summary.count}</span>
                  ${presetIsIncompatible(preset)
                    ? html`<span data-preset-incompatible>비호환</span>`
                    : ''}
                  <small>${summary.choices}</small>
                </div>
                <div class="exec-preset-card__actions">
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
                    @click=${() => void deletePreset(preset)}
                  >
                    삭제
                  </button>
                </div>
              </article>`;
            })}
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
   * The deploy row: what the merge click runs after a green verify. Unset, it
   * names the config section a user has to write — the only place a deploy
   * command can be defined.
   *
   * @param {any} deploy_cmd
   * @returns {import('lit-html').TemplateResult}
   */
  function deployGroup(deploy_cmd) {
    const cmd_text = deploy_cmd ? formatCmd(deploy_cmd.cmd) : '';
    const timeout_text = deploy_cmd ? formatTimeout(deploy_cmd.timeout_ms) : '';
    const note = timeout_text
      ? `timeout ${timeout_text} · verify 통과 시에만 실행`
      : 'verify 통과 시에만 실행';
    const workspace_path =
      (getWorkspacePath && getWorkspacePath()) || '<workspace 경로>';
    return html`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${cmd_text
        ? html`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${cmd_text}</span>
            ${badge('config', 'config')}
            ${deploy_cmd.detached === true ? badge('detached', 'detached') : ''}
            <span class="exec-defaults__vd-meta">${note}</span>
          </div>`
        : html`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${workspace_path}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`;
  }

  /**
   * The last-deploy row, or nothing at all when the workspace has never
   * deployed (or recorded an outcome outside the vocabulary) — the row is
   * omitted rather than rendered empty.
   *
   * `detail` and `log_path` are rendered when present and silently skipped when
   * not (UI-l53x §5): they only exist for the failures that could produce them,
   * and fail-quiet is what keeps every other record unchanged. Both are TEXT
   * bindings — command output and error messages are untrusted input, so
   * lit-html's escaping is what handles them.
   *
   * @param {any} last_deploy
   * @returns {import('lit-html').TemplateResult|string}
   */
  function lastDeployGroup(last_deploy) {
    if (!last_deploy || typeof last_deploy !== 'object') {
      return '';
    }
    const spec = DEPLOY_OUTCOME_BADGES[String(last_deploy.outcome)];
    if (!spec) {
      return '';
    }
    const label =
      last_deploy.outcome === 'failed' && last_deploy.reason
        ? `${spec.label} · ${last_deploy.reason}`
        : spec.label;
    const meta = [
      formatTimestampLocal(last_deploy.at),
      typeof last_deploy.bead_id === 'string' ? last_deploy.bead_id : '',
      typeof last_deploy.base_sha === 'string'
        ? last_deploy.base_sha.slice(0, 7)
        : ''
    ]
      .filter((part) => part.length > 0)
      .join(' · ');
    const detail =
      typeof last_deploy.detail === 'string' && last_deploy.detail.length > 0
        ? truncateDetail(last_deploy.detail)
        : '';
    const log_path =
      typeof last_deploy.log_path === 'string' &&
      last_deploy.log_path.length > 0
        ? last_deploy.log_path
        : '';
    return html`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${badge(spec.modifier, label)}
        ${meta ? html`<span class="exec-defaults__vd-meta">${meta}</span>` : ''}
      </div>
      ${detail
        ? html`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${detail}</code>
          </div>`
        : ''}
      ${log_path
        ? html`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${log_path}</code>
          </div>`
        : ''}
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
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${verifyGroup(info.verify_cmd)} ${deployGroup(info.deploy_cmd)}
      ${lastDeployGroup(info.last_deploy)}
    </section>`;
  }

  function doRender() {
    const defaults = currentDefaults();
    /** @param {string} key */
    const valueOf = (key) =>
      typeof defaults[key] === 'string' ? defaults[key] : '';
    const rows = execSettingRows({
      selectedOf: valueOf,
      effectiveOf: valueOf,
      runner_catalog: currentCatalog()
    });
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
            ${presetSection()}
            <section class="exec-defaults__workspace">
              <h3>현재 워크스페이스 기본값</h3>
              <p class="exec-defaults__hint">
                현재 워크스페이스에만 적용됩니다. bead metadata가 우선하며,
                '(기본: …)'은 이 전역값도 미설정일 때 실제 적용되는
                하드코딩·CLI·워크플로 기본입니다.
              </p>
              ${rows.map((row) => selectRow(row))}
            </section>
            ${verifyDeploySection(currentWorkspaceInfo())}
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
