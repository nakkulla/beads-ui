/**
 * The `실행` pane's section templates: `워커` (orchestration, implementation,
 * review gates and the system prompt under the general preset bar),
 * `quick fix` (its own bar and two groups) and `세션` (workflow mode and the
 * Worker address rows). Split out of `execution-pane.js` (UI-dbn6); the pane
 * owns every value and handler and hands getters in, so a section only draws.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {Object} SectionsOnlyContext
 * @property {(profile: 'general'|'quick_fix') => TemplateResult} presetStripTemplate
 * @property {() => TemplateResult} systemPromptSection
 * @property {() => boolean} sessionLoading - Whether the first read is pending.
 * @property {() => string[]} sessionWarnings - The session layer's warnings.
 * @property {() => any} workerUrl - The last `worker_url` readback.
 * @property {() => { value: string, revision: string|null, dirty: boolean }} commonDraft
 * @property {() => boolean} commonInvalid - Whether the common box failed.
 * @property {() => boolean} commonSaving - Whether a common save is in flight.
 * @property {() => boolean} commonEditable
 * @property {(event: Event) => void} onCommonInput
 * @property {(clear?: boolean) => Promise<void>} saveCommon
 * @property {() => void} cancelCommonEdit
 * @property {() => void} onWindowFocus
 * @property {(key: string, value: string) => void} onWorkerChange
 * @property {(runtime: string) => void} onOrchestrationRuntimeChange
 * @property {() => string|null} orchestrationRuntime
 * @property {() => Record<string, boolean>} speedVisibility
 * @property {() => boolean} quickFixDelegated
 * @typedef {import('./execution-rows.js').ExecutionRowsContext & SectionsOnlyContext} ExecutionSectionsContext
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import {
  AUTO_LITERAL,
  IMPL_DISPATCHES,
  IMPL_RUNTIMES,
  IMPL_SPEEDS,
  PLAN_REVIEW_MODELS,
  REVIEW_STEP_MODELS,
  WORKFLOW_MODES,
  buildExecutionOptionView,
  implEffortOptions,
  implModelOptions,
  isHttpOriginValue,
  orchestrationEffortOptions,
  orchestrationModelOptions,
  orchestrationRuntimeOptions,
  workerUrlMessage,
  workerUrlWarning
} from '../../model/session-model.js';
import { createExecutionRows } from './execution-rows.js';
import { UNSET } from './execution-shared.js';

/** A workspace quick_fix runtime is concrete; `inherit` has no controller yet. */
const QUICK_FIX_IMPL_RUNTIMES = ['claude', 'codex'];

/**
 * Build the section templates over one pane's state.
 *
 * @param {ExecutionSectionsContext} ctx
 */
export function createExecutionSections(ctx) {
  const {
    runnerCatalog,
    executionProjection,
    currentOrchestrationValues,
    onSessionChange,
    onWorkerChange
  } = ctx;
  const {
    selectRow,
    textRow,
    checkRow,
    gateRow,
    quickFixRow,
    quickFixDisabledTitle
  } = createExecutionRows(ctx);

  /** Render applied origin separately from both stored forms. */
  function workerAddressRows() {
    const worker_url = ctx.workerUrl();
    const common_draft = ctx.commonDraft();
    const common_invalid = ctx.commonInvalid();
    const common_editable = ctx.commonEditable();
    const common = worker_url?.common;
    const cause =
      common?.state === 'invalid'
        ? '공통 설정 형식 오류 — 편집할 수 없습니다'
        : common?.state === 'unavailable'
          ? '공통 설정 읽기 오류 — 편집할 수 없습니다'
          : common && common.revision === null
            ? '공통 설정의 버전을 확인할 수 없어 편집할 수 없습니다'
            : '';
    return html` <div class="settings-dialog__row" data-worker-url>
        <span class="settings-dialog__row-label">실제 적용 주소</span>
        <span class="settings-dialog__controls">
          <span data-worker-url-effective>${workerUrlMessage(worker_url)}</span>
          <button
            type="button"
            class="ui-btn ui-btn--ghost ui-btn--sm"
            data-worker-url-refresh
            @click=${ctx.onWindowFocus}
          >
            새로고침
          </button>
          ${worker_url?.warnings?.length
            ? html`<span class="settings-dialog__hint"
                >${worker_url.warnings.map(workerUrlWarning).join(', ')}</span
              >`
            : ''}
        </span>
      </div>
      ${textRow(
        'bdui_url',
        '이 저장소의 예외',
        'http://호스트:3000',
        `비워 저장하면 공통값을 사용합니다${!ctx.sessionDraft().bdui_url && worker_url?.status === 'ok' && common.value ? ` — 공통 기본값: ${common.value}` : ''}`,
        'http:// 또는 https:// 로 시작하는 주소만 저장됩니다 (경로 없이)',
        isHttpOriginValue
      )}
      <div class="settings-dialog__row" data-worker-url-common>
        <span class="settings-dialog__row-label">공통 기본값</span>
        <span class="settings-dialog__controls">
          <input
            type="text"
            data-worker-common-input
            aria-label="공통 기본값"
            class=${`ui-input settings-dialog__text${common_invalid ? ' settings-dialog__text--invalid' : ''}`}
            aria-invalid=${String(common_invalid)}
            .value=${live(common_draft.value)}
            ?disabled=${!common_editable}
            @input=${ctx.onCommonInput}
          />
          <button
            type="button"
            class="ui-btn ui-btn--primary ui-btn--sm"
            data-worker-common-save
            ?disabled=${!common_editable}
            @click=${() => ctx.saveCommon()}
          >
            저장
          </button>
          <button
            type="button"
            class="ui-btn ui-btn--ghost ui-btn--sm"
            data-worker-common-clear
            ?disabled=${!common_editable}
            @click=${() => ctx.saveCommon(true)}
          >
            지우기
          </button>
          <button
            type="button"
            class="ui-btn ui-btn--ghost ui-btn--sm"
            data-worker-common-cancel
            ?disabled=${ctx.commonSaving() || !common_draft.dirty}
            @click=${ctx.cancelCommonEdit}
          >
            취소/최신값 채택
          </button>
          <span class="settings-dialog__hint"
            >이 서버 운영 계정의 모든 저장소에 적용됩니다. 자체 예외가 있는
            저장소는 그 예외를 계속 사용합니다.</span
          >
          <span class="settings-dialog__hint" data-worker-common-latest
            >최근 조회값: ${common?.value ?? '없음'}</span
          >
          <span class="settings-dialog__hint"
            >${common_invalid
              ? 'http:// 또는 https:// 로 시작하는 주소만 저장됩니다 (경로 없이)'
              : cause}</span
          >
        </span>
      </div>`;
  }

  /** @returns {TemplateResult|''} */
  function sessionWarningBanner() {
    const session_warnings = ctx.sessionWarnings();
    if (session_warnings.length === 0) {
      return '';
    }
    return html`<div class="settings-dialog__banner" role="alert">
      워크스페이스 기본값을 일부 읽지 못했습니다 —
      ${session_warnings.join(', ')}
    </div>`;
  }

  /** @returns {TemplateResult|''} */
  function projectionBanner() {
    if (executionProjection()?.supported === true) {
      return '';
    }
    return html`<div
      class="settings-dialog__banner settings-dialog__banner--projection"
      data-execution-defaults-warning
      role="alert"
    >
      실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
    </div>`;
  }

  /**
   * @param {Record<string, boolean>} visibility
   * @returns {TemplateResult}
   */
  function orchestrationGroup(visibility) {
    const catalog = runnerCatalog();
    const orchestration = currentOrchestrationValues();
    const runtime = ctx.orchestrationRuntime();
    const models = orchestrationModelOptions(catalog, runtime);
    const efforts = orchestrationEffortOptions(
      catalog,
      runtime,
      orchestration.orchestration_model || AUTO_LITERAL
    ).filter((effort) => effort !== AUTO_LITERAL);
    return html`<div class="settings-dialog__group">
      <div class="settings-dialog__group-title">오케스트레이션</div>
      <div class="settings-dialog__row">
        <span class="settings-dialog__row-label">런타임</span>
        <span class="settings-dialog__controls">
          <select
            class="ui-select"
            aria-label="런타임"
            data-key="orchestration_runtime"
            .value=${live(runtime || UNSET)}
            @change=${(/** @type {Event} */ ev) =>
              ctx.onOrchestrationRuntimeChange(
                String(/** @type {HTMLSelectElement} */ (ev.target).value)
              )}
          >
            ${orchestrationRuntimeOptions(catalog).map(
              (option) =>
                html`<option value=${option} ?selected=${option === runtime}>
                  ${option}
                </option>`
            )}
          </select>
          <span class="settings-dialog__hint">이 provider의 모델만 냅니다</span>
        </span>
      </div>
      ${selectRow(
        'orchestration_model',
        '모델',
        models,
        onWorkerChange,
        orchestration
      )}
      ${selectRow(
        'orchestration_effort',
        'effort',
        efforts,
        onWorkerChange,
        orchestration
      )}
      ${visibility.orchestration_speed
        ? selectRow(
            'orchestration_speed',
            '속도',
            IMPL_SPEEDS,
            onWorkerChange,
            orchestration
          )
        : ''}
    </div>`;
  }

  /**
   * @param {Record<string, boolean>} visibility
   * @returns {TemplateResult}
   */
  function implGroup(visibility) {
    const catalog = runnerCatalog();
    const session_draft = ctx.sessionDraft();
    // No 실행 방식 row here: `impl_dispatch` is user_write_only per bead and has
    // no workspace-global storage (UI-bu6d §6), so this layer can never disable
    // the delegation rows and never offers the choice that would.
    const runtime = session_draft.impl_runtime;
    const model = session_draft.impl_model;
    return html`<div class="settings-dialog__group">
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
      ${visibility.impl_speed
        ? selectRow(
            'impl_speed',
            '속도',
            IMPL_SPEEDS,
            onSessionChange,
            session_draft
          )
        : ''}
    </div>`;
  }

  /**
   * @param {Record<string, boolean>} visibility
   * @returns {TemplateResult}
   */
  function reviewGatesGroup(visibility) {
    return html`<div class="settings-dialog__group">
      <div class="settings-dialog__group-title">
        리뷰 게이트
        <span class="settings-dialog__hint">모델 · effort · 속도</span>
      </div>
      ${gateRow(
        '사양 리뷰',
        'spec',
        'spec_review_model',
        REVIEW_STEP_MODELS,
        'spec_review_effort',
        'spec_review_speed',
        visibility.spec_review_speed
      )}
      ${gateRow(
        '계획 리뷰',
        'plan',
        'plan_review_model',
        PLAN_REVIEW_MODELS,
        'plan_review_effort',
        'plan_review_speed',
        visibility.plan_review_speed
      )}
      ${gateRow(
        '구현 리뷰',
        'impl',
        'impl_review_model',
        REVIEW_STEP_MODELS,
        'impl_review_effort',
        'impl_review_speed',
        visibility.impl_review_speed
      )}
    </div>`;
  }

  /**
   * The quick_fix tab's orchestration group — what carries a quick fix Bead's
   * own worker model, effort and speed (§6.1).
   *
   * @param {Record<string, boolean>} visibility
   * @returns {TemplateResult}
   */
  function quickFixOrchestrationGroup(visibility) {
    const catalog = runnerCatalog();
    const orchestration = currentOrchestrationValues();
    const disabled_title = quickFixDisabledTitle();
    const orchestration_efforts = orchestrationEffortOptions(
      catalog,
      null,
      null
    ).filter((effort) => effort !== AUTO_LITERAL);
    return html`<div
      class="settings-dialog__group"
      data-quick-fix-group="orchestration"
      title=${disabled_title || ''}
    >
      <div class="settings-dialog__group-title">
        오케스트레이션
        <span class="settings-dialog__hint"
          >${'비어 있는 값은 일반 프로파일로 떨어집니다.'}</span
        >
      </div>
      ${quickFixRow(
        'quick_fix_orchestration_model',
        '모델',
        orchestrationModelOptions(catalog, null),
        onWorkerChange,
        orchestration
      )}
      ${quickFixRow(
        'quick_fix_orchestration_effort',
        'effort',
        orchestration_efforts,
        onWorkerChange,
        orchestration
      )}
      ${visibility.quick_fix_orchestration_speed
        ? quickFixRow(
            'quick_fix_orchestration_speed',
            '속도',
            IMPL_SPEEDS,
            onWorkerChange,
            orchestration
          )
        : ''}
    </div>`;
  }

  /**
   * The quick_fix tab's implementation group. `실행 방식` leads it because it
   * governs whether the delegation rows exist at all; on `main` those rows are
   * absent from the template, not hidden, and the values they would edit stay
   * stored (UI-7yh2 §3.5).
   *
   * @param {Record<string, boolean>} visibility
   * @returns {TemplateResult}
   */
  function quickFixImplGroup(visibility) {
    const catalog = runnerCatalog();
    const session_draft = ctx.sessionDraft();
    const disabled_title = quickFixDisabledTitle();
    // Every catalog token, runtime-independent: the delegation runtime is
    // DERIVED from this key's model, so the 위임 대상 row must not narrow it.
    const models = implModelOptions(catalog, undefined).filter(
      (token) => token !== AUTO_LITERAL
    );
    const efforts = implEffortOptions(catalog, undefined, undefined);
    return html`<div
      class="settings-dialog__group"
      data-quick-fix-group="impl"
      title=${disabled_title || ''}
    >
      <div class="settings-dialog__group-title">
        구현
        <span class="settings-dialog__hint"
          >${'실행 방식은 quick fix에서만 저장소 값입니다 · 이슈 핀이 있으면 핀이 우선합니다'}</span
        >
      </div>
      ${quickFixRow(
        'quick_fix_impl_dispatch',
        '실행 방식',
        IMPL_DISPATCHES,
        onSessionChange,
        session_draft
      )}
      ${ctx.quickFixDelegated()
        ? html`
            ${quickFixRow(
              'quick_fix_impl_runtime',
              '위임 대상',
              QUICK_FIX_IMPL_RUNTIMES,
              onSessionChange,
              session_draft
            )}
            ${quickFixRow(
              'quick_fix_impl_model',
              '모델',
              models,
              onSessionChange,
              session_draft
            )}
            ${quickFixRow(
              'quick_fix_impl_effort',
              'effort',
              efforts,
              onSessionChange,
              session_draft
            )}
            ${visibility.quick_fix_impl_speed
              ? quickFixRow(
                  'quick_fix_impl_speed',
                  '속도',
                  IMPL_SPEEDS,
                  onSessionChange,
                  session_draft
                )
              : ''}
          `
        : html`<div class="settings-dialog__row" data-quick-fix-main-hint>
            <span class="settings-dialog__row-label"></span>
            <span class="settings-dialog__controls">
              <span class="settings-dialog__hint"
                >메인 세션이 직접 구현합니다</span
              >
            </span>
          </div>`}
    </div>`;
  }

  /**
   * The execution profile the Worker and an interactive session share. The
   * quick_fix rows are NOT here: they are their own tab, and this tab's preset
   * bar lists general presets only (§6.1).
   *
   * @returns {TemplateResult}
   */
  function workerSection() {
    if (ctx.sessionLoading()) {
      return html`<div class="settings-dialog__empty">불러오는 중…</div>`;
    }
    const visibility = ctx.speedVisibility();
    return html`
      ${sessionWarningBanner()} ${projectionBanner()}
      ${ctx.presetStripTemplate('general')} ${orchestrationGroup(visibility)}
      ${implGroup(visibility)} ${reviewGatesGroup(visibility)}
      ${ctx.systemPromptSection()}
    `;
  }

  /**
   * The route-scoped quick_fix profile: its own preset bar and two groups. A
   * server with no quick_fix lane leaves the rows locked with the same copy
   * they carried inside the Worker tab (§6.1).
   *
   * @returns {TemplateResult}
   */
  function quickFixSection() {
    if (ctx.sessionLoading()) {
      return html`<div class="settings-dialog__empty">불러오는 중…</div>`;
    }
    const visibility = ctx.speedVisibility();
    return html`
      ${sessionWarningBanner()} ${projectionBanner()}
      ${ctx.presetStripTemplate('quick_fix')}
      ${quickFixOrchestrationGroup(visibility)} ${quickFixImplGroup(visibility)}
    `;
  }

  /**
   * What only an INTERACTIVE session reads: the Worker always runs
   * `fast_track`, so the mode row is not part of the execution profile.
   *
   * @returns {TemplateResult}
   */
  function sessionSection() {
    if (ctx.sessionLoading()) {
      return html`<div class="settings-dialog__empty">불러오는 중…</div>`;
    }
    const session_draft = ctx.sessionDraft();
    const workflow_view = buildExecutionOptionView(
      'workflow_mode',
      WORKFLOW_MODES,
      session_draft,
      executionProjection(),
      runnerCatalog()
    );
    return html`
      ${sessionWarningBanner()}
      <div class="settings-dialog__group" data-session-workflow-group>
        <div class="settings-dialog__group-title">워크플로우</div>
        <div class="settings-dialog__row">
          <span class="settings-dialog__row-label">모드</span>
          <span class="settings-dialog__controls">
            <span class="settings-dialog__seg ui-seg" role="group">
              <button
                type="button"
                data-mode=${UNSET}
                aria-pressed=${String(!session_draft.workflow_mode)}
                @click=${() => onSessionChange('workflow_mode', UNSET)}
              >
                ${workflow_view.unset_label}
              </button>
              ${!session_draft.workflow_mode
                ? html`<span class="settings-dialog__source-badge">기본</span>`
                : ''}
              ${WORKFLOW_MODES.map(
                (mode) =>
                  html`<button
                    type="button"
                    data-mode=${mode}
                    aria-pressed=${String(session_draft.workflow_mode === mode)}
                    @click=${() => onSessionChange('workflow_mode', mode)}
                  >
                    ${mode}
                  </button>`
              )}
            </span>
          </span>
        </div>
        <div class="settings-dialog__row" data-workflow-mode-hint>
          <span class="settings-dialog__row-label"></span>
          <span class="settings-dialog__controls">
            <span class="settings-dialog__hint"
              >Worker는 항상 fast_track으로 돕니다. 이 값은 대화형 세션의
              기본입니다.</span
            >
          </span>
        </div>
      </div>
      <div class="settings-dialog__group" data-session-advanced-group>
        <div class="settings-dialog__group-title">고급</div>
        ${workerAddressRows()}
        ${checkRow(
          'base_sync_accept_local_commits',
          'base 동기화',
          '로컬 base 사용자 커밋 자동 rebase+push',
          '꺼두면 로컬 base 체크아웃의 사용자 커밋은 그대로 남습니다'
        )}
      </div>
    `;
  }

  return { workerSection, quickFixSection, sessionSection };
}
