/**
 * The unified settings dialog — the ONE entry point behind the nav-bar ⚙
 * (spec §D).
 *
 * The `실행` tab presents session and Worker-owned settings together while
 * preserving their separate storage paths.
 * - `표시` edits the per-workspace label/chip display policy.
 *
 * Failure handling follows spec §F: a kv value that cannot be parsed shows a
 * warning banner and leaves the layer empty, and a save failure raises a
 * notification while KEEPING the user's edits in the draft.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../utils/label-policy.js').DisplayPolicy} DisplayPolicy
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { showToast } from '../../utils/toast.js';
import { promptBlockTemplate, promptStatusTemplate } from '../prompt-block.js';
import { chipsSection, labelsSection, prefixesSection } from './display-tab.js';
import {
  AUTO_LITERAL,
  IMPL_PRESET_KEYS,
  IMPL_RUNTIMES,
  IMPL_SPEEDS,
  ORCHESTRATION_KEYS,
  PLAN_REVIEW_MODELS,
  REVIEW_EFFORTS,
  REVIEW_STEP_MODELS,
  WORKFLOW_MODES,
  buildExecutionOptionView,
  buildOrchestrationPatch,
  buildSessionDefaultsPatch,
  implEffortOptions,
  implModelOptions,
  orchestrationModelOptions
} from './session-model.js';

/** The rail's tabs, in display order. */
export const SETTINGS_TABS = [
  { id: 'execution', label: '실행', glyph: '◆' },
  { id: 'display', label: '표시', glyph: '◫' }
];

/** The `(기본)` sentinel a select uses for "no explicit value". */
const UNSET = '';

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Create the unified settings dialog (native `<dialog>`).
 *
 * @param {HTMLElement} mount_element
 * @param {{
 *   transport: (type: import('../../protocol.js').MessageType, payload?: unknown) => Promise<any>,
 *   policyStore: { get: () => DisplayPolicy|null, set: (p: DisplayPolicy|null) => void, subscribe?: (fn: () => void) => () => void },
 *   queueStore?: { get: () => any, set?: (queue: any) => void },
 *   implPresetStore?: { get: () => any, subscribe?: (fn: () => void) => () => void },
 *   labelOptions: () => string[],
 *   notify?: (message: string) => void,
 *   onOpenChange?: (open: boolean) => void
 * }} options
 */
export function createSettingsDialog(mount_element, options) {
  const { transport, policyStore, labelOptions } = options;
  const notify =
    options.notify || ((message) => showToast(message, 'error', 4000));

  const dialog = /** @type {HTMLDialogElement} */ (
    document.createElement('dialog')
  );
  dialog.id = 'settings-dialog';
  dialog.className = 'settings-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', '설정');
  mount_element.appendChild(dialog);

  let active_tab = 'execution';
  let is_open = false;
  let prefix_draft = '';

  /** Values last read from the server; the diff baseline. */
  /** @type {Record<string, string>} */
  let session_baseline = {};
  /** The user's in-progress edits — deliberately NOT reset on a save failure. */
  /** @type {Record<string, string>} */
  let session_draft = {};
  /** @type {string[]} */
  let session_warnings = [];
  let session_loading = false;

  /** UI-only Worker runtime filter; never stored. */
  /** @type {string|null} */
  let worker_runtime_filter = null;
  /** @type {Record<string, string|null>} */
  let worker_draft = {};

  /** @type {string} */
  let preset_choice = '';
  /** Draft name for saving the current execution settings as a preset. */
  let preset_name_draft = '';

  // The worker system prompt: read-only, server-assembled. It moved here with
  // the retired exec-defaults dialog so the surface is not lost (UI-rxp3 §4).
  let prompt_expanded = false;
  let prompt_loading = false;
  let prompt_error = false;
  /** @type {any} */
  let prompt_data = null;

  /**
   * @returns {any}
   */
  function runnerCatalog() {
    const queue = options.queueStore?.get();
    return isRecord(queue) ? queue.runner_catalog : null;
  }

  /** @returns {Record<string, any>|null} */
  function executionProjection() {
    const queue = options.queueStore?.get();
    return isRecord(queue) && isRecord(queue.execution_defaults)
      ? queue.execution_defaults
      : null;
  }

  /**
   * @returns {{ revision: number, presets: any[] }|null}
   */
  function presetState() {
    const state = options.implPresetStore?.get();
    return isRecord(state) && Array.isArray(state.presets)
      ? /** @type {any} */ (state)
      : null;
  }

  /** Read the workspace session defaults; a failure leaves the tab empty. */
  async function loadSessionDefaults() {
    session_loading = true;
    doRender();
    try {
      const res = await transport('get-session-defaults', {});
      session_baseline = isRecord(res?.values) ? { ...res.values } : {};
      session_draft = { ...session_baseline };
      session_warnings = Array.isArray(res?.warnings) ? res.warnings : [];
    } catch (err) {
      session_warnings = ['kv_read_failed'];
      notify(
        `세션 기본값을 읽지 못했습니다: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      session_loading = false;
      doRender();
    }
  }

  /** Save the session-tab diff. On failure the draft is KEPT (spec §F). */
  async function saveSessionDefaults() {
    const patch = buildSessionDefaultsPatch(session_baseline, session_draft);
    if (Object.keys(patch).length === 0) {
      return;
    }
    try {
      const res = await transport('set-session-defaults', { values: patch });
      session_baseline = isRecord(res?.values) ? { ...res.values } : {};
      session_draft = { ...session_baseline };
      session_warnings = Array.isArray(res?.warnings) ? res.warnings : [];
    } catch (err) {
      // Keep `session_draft` exactly as the user left it so a retry does not
      // ask them to re-enter anything.
      notify(
        `세션 기본값 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  function onSessionChange(key, value) {
    if (value === UNSET) {
      delete session_draft[key];
    } else {
      session_draft[key] = value;
    }
    doRender();
    void saveSessionDefaults();
  }

  /** Save the orchestration diff under the queue CAS. */
  async function saveOrchestration() {
    const queue = options.queueStore?.get();
    if (!isRecord(queue)) {
      return;
    }
    const baseline = {
      orchestration_model: queue.orchestration_model ?? null,
      orchestration_effort: queue.orchestration_effort ?? null,
      orchestration_speed: queue.orchestration_speed ?? null
    };
    const patch = buildOrchestrationPatch(baseline, {
      ...baseline,
      ...worker_draft
    });
    if (Object.keys(patch).length === 0) {
      return;
    }
    try {
      const res = await transport('worker-queue-set-orchestration-defaults', {
        expected_revision: queue.revision,
        values: patch
      });
      if (res && res.applied === false) {
        notify('Worker 설정 저장 실패: 다른 클라이언트와 충돌');
        return;
      }
      worker_draft = {};
    } catch (err) {
      notify(
        `Worker 설정 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  function onWorkerChange(key, value) {
    worker_draft[key] = value === UNSET ? null : value;
    doRender();
    void saveOrchestration();
  }

  /** @param {number} slots */
  async function onSlotsChange(slots) {
    const queue = options.queueStore?.get();
    if (!isRecord(queue) || slots < 1) {
      return;
    }
    try {
      await transport('worker-queue-set-slots', {
        expected_revision: queue.revision,
        slots
      });
    } catch (err) {
      notify(
        `slots 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /**
   * Current explicit execution values as preset settings — what the tab shows,
   * not what the stores hold. Orchestration reads the same draft-over-queue
   * overlay the rows render, so a value whose queue save failed is still the
   * one a save captures.
   *
   * @returns {Record<string, string>}
   */
  function executionDraftSettings() {
    /** @type {Record<string, string>} */
    const settings = {};
    const orchestration = currentOrchestrationValues();
    for (const key of IMPL_PRESET_KEYS) {
      const value = ORCHESTRATION_KEYS.includes(key)
        ? orchestration[key]
        : session_draft[key];
      if (typeof value === 'string' && value.length > 0) {
        settings[key] = value;
      }
    }
    return settings;
  }

  /**
   * Save the current execution settings as a preset: create when no
   * preset is selected, update the selected one otherwise. Conflicts notify
   * and re-render — the store snapshot arrives through the presets fanout.
   */
  async function onSavePreset() {
    const state = presetState();
    if (!state) {
      return;
    }
    const settings = executionDraftSettings();
    if (Object.keys(settings).length === 0) {
      notify('저장할 실행 설정이 없습니다 — 먼저 실행 값을 선택하세요');
      return;
    }
    const selected = (state.presets || []).find(
      (/** @type {any} */ preset) => preset.id === preset_choice
    );
    const name = preset_name_draft.trim() || (selected ? selected.name : '');
    if (!name) {
      notify('프리셋 이름을 입력하세요');
      return;
    }
    try {
      const res = selected
        ? await transport('impl-preset-update', {
            expected_revision: state.revision,
            id: selected.id,
            name,
            settings
          })
        : await transport('impl-preset-create', {
            expected_revision: state.revision,
            name,
            settings
          });
      if (res && res.applied) {
        preset_name_draft = '';
        if (!selected && Array.isArray(res.presets)) {
          const created = res.presets.find(
            (/** @type {any} */ preset) => preset.name === name
          );
          preset_choice = created ? created.id : preset_choice;
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

  /** Delete the selected execution preset. */
  async function onDeletePreset() {
    const state = presetState();
    if (!state || preset_choice.length === 0) {
      return;
    }
    try {
      const res = await transport('impl-preset-delete', {
        expected_revision: state.revision,
        id: preset_choice
      });
      if (res && res.applied) {
        preset_choice = '';
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

  /** Apply the chosen execution preset across the kv and queue stores. */
  async function onApplyPresetGlobally() {
    const state = presetState();
    const queue = options.queueStore?.get();
    if (!state || !isRecord(queue) || preset_choice.length === 0) {
      return;
    }
    try {
      const res = await transport('apply-impl-preset-global', {
        preset_id: preset_choice,
        expected_revision: state.revision,
        expected_queue_revision: queue.revision
      });
      if (res && res.applied) {
        session_baseline = isRecord(res.values) ? { ...res.values } : {};
        session_draft = { ...session_baseline };
        session_warnings = Array.isArray(res.warnings) ? res.warnings : [];
        if (isRecord(res.queue)) {
          options.queueStore?.set?.(res.queue);
          worker_draft = {};
        }
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

  /** Fetch the assembled contract; the client holds no copy to drift from it. */
  async function fetchSystemPrompt() {
    prompt_loading = true;
    prompt_error = false;
    doRender();
    try {
      const res = await transport('get-worker-system-prompt', {});
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
   * @returns {TemplateResult|''}
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
    return html`<div class="settings-dialog__sp-body">
      ${prompt_data.target_base_placeholder
        ? html`<div class="prompt-block__meta">
            \`${prompt_data.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`
        : ''}
      ${variants.map(
        (/** @type {any} */ v) =>
          html`<div class="settings-dialog__sp-variant" data-variant=${v.key}>
            <div class="settings-dialog__sp-cond">${v.condition}</div>
            ${promptBlockTemplate(v.label, v.system_prompt)}
          </div>`
      )}
    </div>`;
  }

  /**
   * @returns {TemplateResult}
   */
  function systemPromptSection() {
    return html`<section
      class="settings-dialog__group"
      data-seam="system-prompt"
    >
      <div class="settings-dialog__group-title">
        워커 시스템 프롬프트
        <span class="settings-dialog__hint">읽기 전용 — 서버가 조립</span>
      </div>
      <button
        type="button"
        class="settings-dialog__btn"
        data-seam="system-prompt-toggle"
        aria-expanded=${prompt_expanded ? 'true' : 'false'}
        @click=${toggleSystemPrompt}
      >
        ${prompt_expanded ? '접기' : '전문 보기'}
      </button>
      ${prompt_expanded ? systemPromptBody() : ''}
    </section>`;
  }

  /**
   * One `(기본)`-first select row.
   *
   * @param {string} key
   * @param {string} label
   * @param {ReadonlyArray<string>} choices
   * @param {(key: string, value: string) => void} onChange
   * @param {Record<string, string|null|undefined>} source
   * @param {boolean} [disabled]
   * @returns {TemplateResult}
   */
  /**
   * The bare `(기본)`-first select control. `?selected` covers the first
   * render (a `.value` property binding lands before the option children
   * exist) and `live(...)` re-syncs later renders against DOM state.
   *
   * @param {string} key
   * @param {string} label
   * @param {ReadonlyArray<string>} choices
   * @param {(key: string, value: string) => void} onChange
   * @param {Record<string, string|null|undefined>} source
   * @param {boolean} [disabled]
   * @returns {TemplateResult}
   */
  function selectControl(key, label, choices, onChange, source, disabled) {
    const selected = source[key] ?? UNSET;
    const view = buildExecutionOptionView(
      key,
      choices,
      source,
      executionProjection(),
      runnerCatalog()
    );
    const selected_option = view.options.find(
      (option) => option.value === selected
    );
    const full_value =
      selected === UNSET ? view.full_value : selected_option?.full_value;
    return html`<select
        class=${selected === UNSET ? 'settings-dialog__unset' : ''}
        data-key=${key}
        aria-label=${label}
        title=${full_value || ''}
        ?disabled=${disabled === true || view.disabled}
        .value=${live(String(selected))}
        @change=${(/** @type {Event} */ ev) =>
          onChange(
            key,
            String(/** @type {HTMLSelectElement} */ (ev.target).value)
          )}
      >
        <option value=${UNSET} ?selected=${selected === UNSET}>
          ${view.unset_label}
        </option>
        ${view.options.map(
          (option) =>
            html`<option
              value=${option.value}
              title=${option.full_value || ''}
              ?selected=${option.value === selected}
            >
              ${option.label}
            </option>`
        )}
      </select>
      ${selected === UNSET
        ? html`<span class="settings-dialog__source-badge">기본</span>`
        : ''}`;
  }

  /**
   * One `(기본)`-first select row.
   *
   * @param {string} key
   * @param {string} label
   * @param {ReadonlyArray<string>} choices
   * @param {(key: string, value: string) => void} onChange
   * @param {Record<string, string|null|undefined>} source
   * @param {boolean} [disabled]
   * @returns {TemplateResult}
   */
  function selectRow(key, label, choices, onChange, source, disabled = false) {
    return html`<div
      class=${`settings-dialog__row${disabled ? ' settings-dialog__row--off' : ''}`}
    >
      <span class="settings-dialog__row-label">${label}</span>
      <span class="settings-dialog__controls">
        ${selectControl(key, label, choices, onChange, source, disabled)}
      </span>
    </div>`;
  }

  /**
   * One review gate row: the gate's stage dot, its model select, and its
   * effort select side by side (spec §D — 게이트당 모델+effort 쌍).
   *
   * @param {string} label
   * @param {string} stage - Stage token suffix (spec|plan|impl).
   * @param {string} model_key
   * @param {ReadonlyArray<string>} model_choices
   * @param {string} effort_key
   * @returns {TemplateResult}
   */
  function gateRow(label, stage, model_key, model_choices, effort_key) {
    return html`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${stage}-on)`}
        ></i>
        ${label}
      </span>
      <span class="settings-dialog__controls">
        ${selectControl(
          model_key,
          `${label} 모델`,
          model_choices,
          onSessionChange,
          session_draft,
          false
        )}
        ${selectControl(
          effort_key,
          `${label} effort`,
          REVIEW_EFFORTS,
          onSessionChange,
          session_draft,
          false
        )}
      </span>
    </div>`;
  }

  /** @returns {Record<string, string|null>} */
  function currentOrchestrationValues() {
    const queue = options.queueStore?.get();
    /** @type {Record<string, string|null>} */
    const current = {};
    for (const key of ORCHESTRATION_KEYS) {
      current[key] = Object.prototype.hasOwnProperty.call(worker_draft, key)
        ? worker_draft[key]
        : isRecord(queue) && typeof queue[key] === 'string'
          ? queue[key]
          : null;
    }
    return current;
  }

  /**
   * @returns {TemplateResult}
   */
  function executionPane() {
    const catalog = runnerCatalog();
    // No 실행 방식 row here: `impl_dispatch` is user_write_only per bead and has
    // no workspace-global storage (UI-bu6d §6), so this layer can never disable
    // the delegation rows and never offers the choice that would.
    const runtime = session_draft.impl_runtime;
    const model = session_draft.impl_model;
    const state = presetState();
    const queue = options.queueStore?.get();
    const orchestration = currentOrchestrationValues();
    const orchestration_models = orchestrationModelOptions(
      catalog,
      worker_runtime_filter
    );
    const orchestration_efforts = implEffortOptions(
      catalog,
      worker_runtime_filter || undefined,
      orchestration.orchestration_model || AUTO_LITERAL
    ).filter((effort) => effort !== AUTO_LITERAL);
    const slots =
      isRecord(queue) && typeof queue.slots === 'number' ? queue.slots : 2;
    const projection_available = executionProjection()?.supported === true;
    const workflow_view = buildExecutionOptionView(
      'workflow_mode',
      WORKFLOW_MODES,
      session_draft,
      executionProjection(),
      catalog
    );
    return html`
      <section
        class=${`settings-dialog__pane${active_tab === 'execution' ? ' settings-dialog__pane--active' : ''}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        ${session_warnings.length > 0
          ? html`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${session_warnings.join(', ')}
            </div>`
          : ''}
        ${!projection_available
          ? html`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`
          : ''}
        ${session_loading
          ? html`<div class="settings-dialog__empty">불러오는 중…</div>`
          : html`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${live(preset_choice)}
                  @change=${(/** @type {Event} */ ev) => {
                    preset_choice = String(
                      /** @type {HTMLSelectElement} */ (ev.target).value
                    );
                    doRender();
                  }}
                >
                  <option value="" ?selected=${preset_choice === ''}>
                    실행 프리셋…
                  </option>
                  ${(state?.presets || []).map(
                    (preset) =>
                      html`<option
                        value=${preset.id}
                        ?selected=${preset.id === preset_choice}
                      >
                        ${preset.name}
                      </option>`
                  )}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${preset_choice.length === 0}
                  @click=${onApplyPresetGlobally}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${preset_choice
                    ? '이름 (비우면 유지)'
                    : '새 프리셋 이름'}
                  aria-label="프리셋 이름"
                  .value=${live(preset_name_draft)}
                  @input=${(/** @type {Event} */ ev) => {
                    preset_name_draft = String(
                      /** @type {HTMLInputElement} */ (ev.target).value
                    );
                  }}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${onSavePreset}
                >
                  ${preset_choice ? '갱신' : '저장'}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${preset_choice.length === 0}
                  @click=${onDeletePreset}
                >
                  삭제
                </button>
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">오케스트레이션</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">런타임</span>
                  <span class="settings-dialog__controls">
                    <select
                      aria-label="런타임"
                      data-key="orchestration_runtime_filter"
                      .value=${live(worker_runtime_filter || UNSET)}
                      @change=${(/** @type {Event} */ ev) => {
                        const next = String(
                          /** @type {HTMLSelectElement} */ (ev.target).value
                        );
                        worker_runtime_filter = next === UNSET ? null : next;
                        doRender();
                      }}
                    >
                      <option
                        value=${UNSET}
                        ?selected=${!worker_runtime_filter}
                      >
                        전체
                      </option>
                      <option
                        value="claude"
                        ?selected=${worker_runtime_filter === 'claude'}
                      >
                        claude
                      </option>
                      <option
                        value="codex"
                        ?selected=${worker_runtime_filter === 'codex'}
                      >
                        codex
                      </option>
                    </select>
                    <span class="settings-dialog__hint"
                      >모델 목록을 좁힙니다</span
                    >
                  </span>
                </div>
                ${selectRow(
                  'orchestration_model',
                  '모델',
                  orchestration_models,
                  onWorkerChange,
                  orchestration
                )}
                ${selectRow(
                  'orchestration_effort',
                  'effort',
                  orchestration_efforts,
                  onWorkerChange,
                  orchestration
                )}
                ${selectRow(
                  'orchestration_speed',
                  '속도',
                  IMPL_SPEEDS,
                  onWorkerChange,
                  orchestration
                )}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${UNSET}
                        aria-pressed=${String(!session_draft.workflow_mode)}
                        @click=${() => onSessionChange('workflow_mode', UNSET)}
                      >
                        ${workflow_view.unset_label}
                      </button>
                      ${!session_draft.workflow_mode
                        ? html`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`
                        : ''}
                      ${WORKFLOW_MODES.map(
                        (mode) =>
                          html`<button
                            type="button"
                            data-mode=${mode}
                            aria-pressed=${String(
                              session_draft.workflow_mode === mode
                            )}
                            @click=${() =>
                              onSessionChange('workflow_mode', mode)}
                          >
                            ${mode}
                          </button>`
                      )}
                    </span>
                  </span>
                </div>
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  리뷰 게이트
                  <span class="settings-dialog__hint">모델 · effort</span>
                </div>
                ${gateRow(
                  '사양 리뷰',
                  'spec',
                  'spec_review_model',
                  REVIEW_STEP_MODELS,
                  'spec_review_effort'
                )}
                ${gateRow(
                  '계획 리뷰',
                  'plan',
                  'plan_review_model',
                  PLAN_REVIEW_MODELS,
                  'plan_review_effort'
                )}
                ${gateRow(
                  '구현 리뷰',
                  'impl',
                  'impl_review_model',
                  REVIEW_STEP_MODELS,
                  'impl_review_effort'
                )}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${selectRow(
                  'impl_runtime',
                  '위임 대상',
                  IMPL_RUNTIMES,
                  onSessionChange,
                  session_draft
                )}
                ${selectRow(
                  'impl_model',
                  '모델',
                  implModelOptions(catalog, runtime),
                  onSessionChange,
                  session_draft
                )}
                ${selectRow(
                  'impl_effort',
                  'effort',
                  implEffortOptions(catalog, runtime, model),
                  onSessionChange,
                  session_draft
                )}
                ${selectRow(
                  'impl_speed',
                  '속도',
                  IMPL_SPEEDS,
                  onSessionChange,
                  session_draft
                )}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">동시 실행</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">slots</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__stepper">
                      <button
                        type="button"
                        aria-label="slots 감소"
                        @click=${() => onSlotsChange(slots - 1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${slots}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${() => onSlotsChange(slots + 1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${systemPromptSection()}
            `}
      </section>
    `;
  }

  /**
   * @returns {TemplateResult}
   */
  function displayPane() {
    const policy = policyStore.get();
    return html`
      <section
        class=${`settings-dialog__pane${active_tab === 'display' ? ' settings-dialog__pane--active' : ''}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${policy
          ? html`
              ${labelsSection(policy, labelOptions(), onLabelPillClick)}
              ${prefixesSection(policy, prefix_draft, {
                onDraft: (value) => {
                  prefix_draft = value;
                },
                onAdd: onPrefixAdd,
                onRemove: onPrefixRemove
              })}
              ${chipsSection(policy, onChipToggle)}
            `
          : html`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `;
  }

  /**
   * Send a display-policy patch with a CAS guard, retrying ONCE on conflict.
   *
   * @param {(policy: DisplayPolicy) => Record<string, unknown>} buildPatch
   */
  async function savePolicy(buildPatch) {
    const current = policyStore.get();
    if (!current) {
      return;
    }
    try {
      let res = await transport('display-policy-set', {
        expected_revision: current.revision,
        policy: buildPatch(current)
      });
      adoptPolicy(res);
      if (res && res.conflict && res.policy) {
        res = await transport('display-policy-set', {
          expected_revision: res.policy.revision,
          policy: buildPatch(res.policy)
        });
        adoptPolicy(res);
      }
      if (res && res.conflict) {
        notify('표시 설정 저장 실패: 다른 클라이언트와 충돌');
      }
    } catch {
      notify('표시 설정 저장 실패');
    }
  }

  /** @param {any} res */
  function adoptPolicy(res) {
    if (res && res.policy && typeof res.policy === 'object') {
      policyStore.set(res.policy);
    }
  }

  /** @param {(policy: DisplayPolicy) => Record<string, unknown>} buildPatch */
  function onPolicyPatch(buildPatch) {
    void savePolicy(buildPatch);
  }

  /** @param {string} label */
  function onLabelPillClick(label) {
    const current = policyStore.get();
    if (!current) {
      return;
    }
    const desired_visible = !labelIsVisible(label, current);
    onPolicyPatch((policy) => labelPatch(label, policy, desired_visible));
  }

  function onPrefixAdd() {
    const prefix = prefix_draft.trim();
    if (prefix.length === 0) {
      return;
    }
    prefix_draft = '';
    onPolicyPatch((policy) =>
      policy.hidden_prefixes.includes(prefix)
        ? { hidden_prefixes: policy.hidden_prefixes }
        : { hidden_prefixes: [...policy.hidden_prefixes, prefix] }
    );
    doRender();
  }

  /** @param {string} prefix */
  function onPrefixRemove(prefix) {
    onPolicyPatch((policy) => ({
      hidden_prefixes: policy.hidden_prefixes.filter((it) => it !== prefix)
    }));
  }

  /** @param {string} chip */
  function onChipToggle(chip) {
    const current = policyStore.get();
    if (!current) {
      return;
    }
    const desired = /** @type {any} */ (current.chips)[chip] === false;
    onPolicyPatch(() => ({ chips: { [chip]: desired } }));
  }

  function doRender() {
    render(
      html`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${SETTINGS_TABS.map(
              (tab) =>
                html`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${tab.id}
                  aria-selected=${String(active_tab === tab.id)}
                  aria-controls=${`settings-pane-${tab.id}`}
                  @click=${() => selectTab(tab.id)}
                >
                  <span class="settings-dialog__glyph">${tab.glyph}</span>
                  ${tab.label}
                </button>`
            )}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${close}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${executionPane()} ${displayPane()}
          </div>
        </div>
      `,
      dialog
    );
  }

  /** @param {string} tab_id */
  function selectTab(tab_id) {
    active_tab = tab_id;
    doRender();
  }

  const onDialogClose = () => {
    is_open = false;
    options.onOpenChange?.(false);
  };
  dialog.addEventListener('close', onDialogClose);
  dialog.addEventListener('cancel', onDialogClose);
  // Light dismiss: a click on the backdrop targets the <dialog> element itself
  // (its padding is 0, so any in-panel click targets a descendant instead).
  const onBackdropClick = (/** @type {MouseEvent} */ event) => {
    if (event.target === dialog) {
      close();
    }
  };
  dialog.addEventListener('click', onBackdropClick);

  /** @type {null | (() => void)} */
  let unsubscribe_policy = null;
  if (policyStore.subscribe) {
    unsubscribe_policy = policyStore.subscribe(() => {
      if (is_open) {
        doRender();
      }
    });
  }
  /** @type {null | (() => void)} */
  let unsubscribe_presets = null;
  if (options.implPresetStore?.subscribe) {
    unsubscribe_presets = options.implPresetStore.subscribe(() => {
      if (is_open) {
        doRender();
      }
    });
  }

  function open(tab_id = 'execution') {
    if (is_open) {
      return;
    }
    is_open = true;
    options.onOpenChange?.(true);
    active_tab = tab_id;
    prefix_draft = '';
    worker_draft = {};
    doRender();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    void loadSessionDefaults();
  }

  function close() {
    if (!is_open) {
      return;
    }
    is_open = false;
    options.onOpenChange?.(false);
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }

  return {
    open,
    close,
    /** Test/inspection seam: the draft the dialog would save. */
    sessionDraft: () => ({ ...session_draft }),
    destroy() {
      is_open = false;
      dialog.removeEventListener('close', onDialogClose);
      dialog.removeEventListener('cancel', onDialogClose);
      dialog.removeEventListener('click', onBackdropClick);
      if (unsubscribe_policy) {
        unsubscribe_policy();
        unsubscribe_policy = null;
      }
      if (unsubscribe_presets) {
        unsubscribe_presets();
        unsubscribe_presets = null;
      }
      dialog.remove();
    }
  };
}

/**
 * Whether a label survives the policy's three rule levels.
 *
 * @param {string} label
 * @param {DisplayPolicy} policy
 * @returns {boolean}
 */
function labelIsVisible(label, policy) {
  if (policy.visible_labels.includes(label)) {
    return true;
  }
  if (policy.hidden_labels.includes(label)) {
    return false;
  }
  return !policy.hidden_prefixes.some(
    (prefix) => prefix.length > 0 && label.startsWith(prefix)
  );
}

/**
 * The idempotent patch that puts `label` into a DESIRED visibility.
 *
 * @param {string} label
 * @param {DisplayPolicy} policy
 * @param {boolean} desired_visible
 * @returns {{ hidden_labels?: string[], visible_labels?: string[] }}
 */
function labelPatch(label, policy, desired_visible) {
  if (!desired_visible) {
    return {
      hidden_labels: policy.hidden_labels.includes(label)
        ? policy.hidden_labels
        : [...policy.hidden_labels, label],
      visible_labels: policy.visible_labels.filter((it) => it !== label)
    };
  }
  const hidden_labels = policy.hidden_labels.filter((it) => it !== label);
  const still_hidden = policy.hidden_prefixes.some(
    (prefix) => prefix.length > 0 && label.startsWith(prefix)
  );
  if (!still_hidden) {
    return { hidden_labels };
  }
  return {
    hidden_labels,
    visible_labels: policy.visible_labels.includes(label)
      ? policy.visible_labels
      : [...policy.visible_labels, label]
  };
}
