/**
 * The bulk `워커`/`quick fix` form's row and group templates: the hold-first
 * select, its observation badge, the review gate row and the five groups the
 * two profiles draw. Split out of `bulk-worker-form.js` (UI-dbn6); the form
 * keeps the row map, the edits and the observations, and hands them in.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../model/bulk-observation.js').Observation} Observation
 * @typedef {Object} BulkWorkerGroupsContext
 * @property {Record<string, string>} values - The sparse form map.
 * @property {Set<string>} edited - The rows the user has touched.
 * @property {(key: string) => 'mixed'|'pending'|null} holdStateOf
 * @property {(key: string) => 'mixed'|'pending'|null} holdOptionOf
 * @property {(key: string) => Observation|null} observationOf
 * @property {(key: string) => boolean} presetOnly - Whether no layer stores it.
 * @property {() => Record<string, any>|null} defaultsOf
 * @property {() => any} catalogOf
 * @property {() => Record<string, string>} resolutionOf
 * @property {() => ReadonlyArray<string>|null} disabledModelList
 * @property {(key: string, value: string) => void} onValueChange
 * @property {(key: string, value: string) => void} onImplTargetChange
 * @property {(runtime: string) => void} onOrchestrationRuntimeChange
 * @property {() => string|null} orchestrationRuntime
 * @property {() => boolean} quickFixSupported
 * @property {() => boolean} quickFixDelegated
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { observationBadge } from '../../model/bulk-observation.js';
import { visibleChoicesForKey } from '../../model/model-visibility.js';
import {
  AUTO_LITERAL,
  IMPL_DISPATCHES,
  IMPL_RUNTIMES,
  IMPL_SPEEDS,
  PLAN_REVIEW_MODELS,
  REVIEW_EFFORTS,
  REVIEW_SPEEDS,
  REVIEW_STEP_MODELS,
  buildExecutionOptionView,
  implEffortOptions,
  implModelOptions,
  orchestrationEffortOptions,
  orchestrationModelOptions,
  orchestrationRuntimeOptions
} from '../../model/session-model.js';

/** The `기본값 사용` sentinel every select carries as its first option. */
export const UNSET = '';

/**
 * The sentinel the `갈림 — 유지`·`미확인 — 유지` option carries (UI-e1ta §3).
 * It is not a value: picking it puts the row back on its observation.
 */
export const HOLD = '__bulk_hold__';

/** What the hold option is called, by the observation that put it there. */
const HOLD_LABEL = { mixed: '갈림 — 유지', pending: '미확인 — 유지' };

/** The badge the preset-only row carries instead of an observation (§4). */
const PRESET_ONLY_BADGE = '프리셋에만 담김 · 저장소에는 안 씀';

/** A workspace quick_fix runtime is concrete; `inherit` has no controller. */
const QUICK_FIX_IMPL_RUNTIMES = ['claude', 'codex'];

/** Disabled copy for a server that never had the quick_fix lane. */
const QUICK_FIX_UNSUPPORTED = '서버가 quick_fix 레인을 지원하지 않습니다';

/**
 * Build one form instance's group templates.
 *
 * @param {BulkWorkerGroupsContext} ctx
 */
export function createBulkWorkerGroups(ctx) {
  const {
    values,
    edited,
    holdStateOf,
    holdOptionOf,
    observationOf,
    defaultsOf,
    catalogOf,
    onValueChange,
    onImplTargetChange
  } = ctx;

  /**
   * @param {string} key
   * @param {string} label
   * @param {ReadonlyArray<string>} choices
   * @param {(key: string, value: string) => void} onSelect
   * @param {boolean} disabled
   * @param {string|null} route
   * @returns {TemplateResult}
   */
  function selectControl(key, label, choices, onSelect, disabled, route) {
    const hold = holdStateOf(key);
    const hold_option = holdOptionOf(key);
    const selected = hold === null ? (values[key] ?? UNSET) : HOLD;
    const visible = visibleChoicesForKey(
      key,
      choices,
      ctx.disabledModelList(),
      defaultsOf()
    );
    const view = buildExecutionOptionView(
      key,
      visible.choices,
      values,
      defaultsOf(),
      catalogOf(),
      ctx.resolutionOf(),
      route,
      visible.hidden_choices
    );
    const chosen = view.options.find((option) => option.value === selected);
    const full_value =
      selected === UNSET ? view.full_value : chosen?.full_value;
    return html`<select
        class=${`ui-select${selected === UNSET ? ' settings-dialog__unset' : ''}`}
        data-bulk-key=${key}
        aria-label=${label}
        title=${full_value || ''}
        ?disabled=${disabled || (route !== 'quick_fix' && view.disabled)}
        .value=${live(String(selected))}
        @change=${(/** @type {Event} */ ev) =>
          onSelect(
            key,
            String(/** @type {HTMLSelectElement} */ (ev.target).value)
          )}
      >
        ${hold_option === null
          ? ''
          : html`<option value=${HOLD} ?selected=${hold !== null}>
              ${HOLD_LABEL[hold_option]}
            </option>`}
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
        )}</select
      >${observationBadgeTemplate(key)}`;
  }

  /**
   * The badge that says what the ticked repos hold for this row (§3). A row
   * nothing observes — the general `impl_dispatch` — says so instead, and a
   * single ticked repo gets no badge because there is nothing to compare.
   *
   * @param {string} key
   * @returns {TemplateResult|''}
   */
  function observationBadgeTemplate(key) {
    if (ctx.presetOnly(key)) {
      return html`<span
        class="settings-dialog__obs settings-dialog__obs--note"
        data-bulk-badge=${key}
        >${PRESET_ONLY_BADGE}</span
      >`;
    }
    if (edited.has(key)) {
      return html`<span
        class="settings-dialog__obs settings-dialog__obs--edited"
        data-bulk-badge=${key}
        >편집됨</span
      >`;
    }
    const observation = observationOf(key);
    const badge = observation ? observationBadge(observation) : null;
    if (!badge) {
      return '';
    }
    return html`<span
      class=${`settings-dialog__obs settings-dialog__obs--${badge.state}`}
      data-bulk-badge=${key}
      data-bulk-observation=${badge.state}
      title=${badge.title}
      >${badge.text}</span
    >`;
  }

  /**
   * @param {string} key
   * @param {string} label
   * @param {ReadonlyArray<string>} choices
   * @param {(key: string, value: string) => void} onSelect
   * @param {boolean} disabled
   * @param {string|null} [route]
   * @returns {TemplateResult}
   */
  function selectRow(key, label, choices, onSelect, disabled, route = null) {
    return html`<div
      class=${`settings-dialog__row${disabled ? ' settings-dialog__row--off' : ''}`}
    >
      <span class="settings-dialog__row-label">${label}</span>
      <span class="settings-dialog__controls">
        ${selectControl(key, label, choices, onSelect, disabled, route)}
      </span>
    </div>`;
  }

  /**
   * One review gate row: model, effort and — when the catalog offers two
   * tiers — speed.
   *
   * @param {string} label
   * @param {string} stage
   * @param {string} model_key
   * @param {ReadonlyArray<string>} model_choices
   * @param {string} effort_key
   * @param {string} speed_key
   * @param {boolean} speed_shown
   * @param {boolean} disabled
   * @returns {TemplateResult}
   */
  function gateRow(
    label,
    stage,
    model_key,
    model_choices,
    effort_key,
    speed_key,
    speed_shown,
    disabled
  ) {
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
          onValueChange,
          disabled,
          null
        )}
        ${selectControl(
          effort_key,
          `${label} effort`,
          REVIEW_EFFORTS,
          onValueChange,
          disabled,
          null
        )}
        ${speed_shown
          ? selectControl(
              speed_key,
              `${label} 속도`,
              REVIEW_SPEEDS,
              onValueChange,
              disabled,
              null
            )
          : ''}
      </span>
    </div>`;
  }

  /**
   * @param {Record<string, boolean>} visibility
   * @param {boolean} disabled
   * @returns {TemplateResult}
   */
  function orchestrationGroup(visibility, disabled) {
    const catalog = catalogOf();
    const runtime = ctx.orchestrationRuntime();
    const models = orchestrationModelOptions(catalog, runtime);
    const efforts = orchestrationEffortOptions(
      catalog,
      runtime,
      values.orchestration_model || AUTO_LITERAL
    ).filter((effort) => effort !== AUTO_LITERAL);
    return html`<div
      class="settings-dialog__group"
      data-bulk-group="orchestration"
    >
      <div class="settings-dialog__group-title">오케스트레이션</div>
      <div class="settings-dialog__row">
        <span class="settings-dialog__row-label">런타임</span>
        <span class="settings-dialog__controls">
          <select
            class="ui-select"
            aria-label="런타임"
            data-bulk-key="orchestration_runtime"
            ?disabled=${disabled}
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
        onValueChange,
        disabled
      )}
      ${selectRow(
        'orchestration_effort',
        'effort',
        efforts,
        onValueChange,
        disabled
      )}
      ${visibility.orchestration_speed
        ? selectRow(
            'orchestration_speed',
            '속도',
            IMPL_SPEEDS,
            onValueChange,
            disabled
          )
        : ''}
    </div>`;
  }

  /**
   * @param {Record<string, boolean>} visibility
   * @param {boolean} disabled
   * @returns {TemplateResult}
   */
  function implGroup(visibility, disabled) {
    const catalog = catalogOf();
    // `impl_dispatch` HAS a row here even though no workspace layer stores it
    // (ADR 0012): the row exists so a preset saved from this window carries the
    // key, and it never joins an apply payload (UI-e1ta §4).
    const runtime = values.impl_runtime;
    const model = values.impl_model;
    return html`<div class="settings-dialog__group" data-bulk-group="impl">
      <div class="settings-dialog__group-title">
        구현
        <span class="settings-dialog__hint"
          >이슈 핀이 있으면 핀이 우선합니다</span
        >
      </div>
      ${selectRow(
        'impl_dispatch',
        'Bead 실행 방식',
        IMPL_DISPATCHES,
        onValueChange,
        disabled
      )}
      ${selectRow(
        'impl_runtime',
        '위임 대상',
        IMPL_RUNTIMES,
        onImplTargetChange,
        disabled
      )}
      ${selectRow(
        'impl_model',
        '모델',
        implModelOptions(catalog, runtime),
        onImplTargetChange,
        disabled
      )}
      ${selectRow(
        'impl_effort',
        'effort',
        implEffortOptions(catalog, runtime, model),
        onImplTargetChange,
        disabled
      )}
      ${visibility.impl_speed
        ? selectRow('impl_speed', '속도', IMPL_SPEEDS, onValueChange, disabled)
        : ''}
    </div>`;
  }

  /**
   * @param {Record<string, boolean>} visibility
   * @param {boolean} disabled
   * @returns {TemplateResult}
   */
  function reviewGatesGroup(visibility, disabled) {
    return html`<div class="settings-dialog__group" data-bulk-group="review">
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
        visibility.spec_review_speed,
        disabled
      )}
      ${gateRow(
        '계획 리뷰',
        'plan',
        'plan_review_model',
        PLAN_REVIEW_MODELS,
        'plan_review_effort',
        'plan_review_speed',
        visibility.plan_review_speed,
        disabled
      )}
      ${gateRow(
        '구현 리뷰',
        'impl',
        'impl_review_model',
        REVIEW_STEP_MODELS,
        'impl_review_effort',
        'impl_review_speed',
        visibility.impl_review_speed,
        disabled
      )}
    </div>`;
  }

  /**
   * One quick_fix row: the hold option, the disabled state of a server with no
   * lane, and the general-layer resolution behind an empty value.
   *
   * @param {string} key
   * @param {string} label
   * @param {ReadonlyArray<string>} choices
   * @param {(key: string, value: string) => void} onSelect
   * @param {boolean} disabled
   * @returns {TemplateResult}
   */
  function quickFixRow(key, label, choices, onSelect, disabled) {
    return selectRow(
      key,
      label,
      choices,
      onSelect,
      disabled || !ctx.quickFixSupported(),
      'quick_fix'
    );
  }

  /**
   * The quick_fix tab's orchestration group (§6.1).
   *
   * @param {Record<string, boolean>} visibility
   * @param {boolean} disabled
   * @returns {TemplateResult}
   */
  function quickFixOrchestrationGroup(visibility, disabled) {
    const catalog = catalogOf();
    const supported = ctx.quickFixSupported();
    const orchestration_efforts = orchestrationEffortOptions(
      catalog,
      null,
      null
    ).filter((effort) => effort !== AUTO_LITERAL);
    return html`<div
      class="settings-dialog__group"
      data-bulk-group="quick_fix_orchestration"
      title=${supported ? '' : QUICK_FIX_UNSUPPORTED}
    >
      <div class="settings-dialog__group-title">
        오케스트레이션
        <span class="settings-dialog__hint"
          >${supported
            ? '비어 있는 값은 일반 프로파일로 떨어집니다.'
            : QUICK_FIX_UNSUPPORTED}</span
        >
      </div>
      ${quickFixRow(
        'quick_fix_orchestration_model',
        '모델',
        orchestrationModelOptions(catalog, null),
        onValueChange,
        disabled
      )}
      ${quickFixRow(
        'quick_fix_orchestration_effort',
        'effort',
        orchestration_efforts,
        onValueChange,
        disabled
      )}
      ${visibility.quick_fix_orchestration_speed
        ? quickFixRow(
            'quick_fix_orchestration_speed',
            '속도',
            IMPL_SPEEDS,
            onValueChange,
            disabled
          )
        : ''}
    </div>`;
  }

  /**
   * The quick_fix tab's implementation group. `실행 방식` leads it because it
   * governs whether the delegation rows exist at all (UI-628r §3.2), and those
   * rows exist only while the resolved dispatch is `delegated`; on `main` they
   * are absent, not hidden.
   *
   * @param {Record<string, boolean>} visibility
   * @param {boolean} disabled
   * @returns {TemplateResult}
   */
  function quickFixImplGroup(visibility, disabled) {
    const catalog = catalogOf();
    const supported = ctx.quickFixSupported();
    // Every catalog token, runtime-independent: the delegation runtime is
    // DERIVED from this key's model, so the 위임 대상 row must not narrow it.
    const models = implModelOptions(catalog, undefined).filter(
      (token) => token !== AUTO_LITERAL
    );
    const efforts = implEffortOptions(catalog, undefined, undefined);
    return html`<div
      class="settings-dialog__group"
      data-bulk-group="quick_fix_impl"
      title=${supported ? '' : QUICK_FIX_UNSUPPORTED}
    >
      <div class="settings-dialog__group-title">
        구현
        <span class="settings-dialog__hint"
          >이슈 핀이 있으면 핀이 우선합니다</span
        >
      </div>
      ${quickFixRow(
        'quick_fix_impl_dispatch',
        '실행 방식',
        IMPL_DISPATCHES,
        onValueChange,
        disabled
      )}
      ${ctx.quickFixDelegated()
        ? html`
            ${quickFixRow(
              'quick_fix_impl_runtime',
              '위임 대상',
              QUICK_FIX_IMPL_RUNTIMES,
              onValueChange,
              disabled
            )}
            ${quickFixRow(
              'quick_fix_impl_model',
              '모델',
              models,
              onValueChange,
              disabled
            )}
            ${quickFixRow(
              'quick_fix_impl_effort',
              'effort',
              efforts,
              onValueChange,
              disabled
            )}
            ${visibility.quick_fix_impl_speed
              ? quickFixRow(
                  'quick_fix_impl_speed',
                  '속도',
                  IMPL_SPEEDS,
                  onValueChange,
                  disabled
                )
              : ''}
          `
        : html`<div class="settings-dialog__row" data-bulk-quick-fix-main>
            <span class="settings-dialog__row-label"></span>
            <span class="settings-dialog__controls">
              <span class="settings-dialog__hint"
                >메인 세션이 직접 구현합니다</span
              >
            </span>
          </div>`}
    </div>`;
  }

  return {
    orchestrationGroup,
    implGroup,
    reviewGatesGroup,
    quickFixOrchestrationGroup,
    quickFixImplGroup
  };
}
