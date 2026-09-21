/**
 * 여러 저장소 설정 창 `워커` 탭의 실행 프로필 폼 (UI-628r §4.1).
 *
 * The bulk window is NOT a view of any repo's current settings: this form owns
 * one sparse value map of its own, starts every row at `기본값 사용`, lets a
 * preset fill it, and `[적용]` writes the whole map to each ticked repo
 * (UI-628r §2.3). No repo's stored values are ever read into it, so nothing
 * here needs a baseline or a per-repo draft.
 *
 * Option lists, narrowing and row visibility are NOT re-derived here. Each one
 * is a `session-model.js` export the single-repo `워커` 탭 calls with the same
 * arguments, so the two surfaces cannot drift apart. The label resolution gets
 * the WHOLE form as both the edited layer and the resolution layer, which is
 * what makes an empty quick_fix row show the general row it inherits
 * (UI-628r §1.4).
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import { supportsQuickFixLane } from '../monitor/bulk-preset-apply.js';
import {
  AUTO_LITERAL,
  IMPL_DISPATCHES,
  IMPL_PRESET_KEYS,
  IMPL_RUNTIMES,
  IMPL_SPEEDS,
  ORCHESTRATION_KEYS,
  PLAN_REVIEW_MODELS,
  PRESET_KV_KEYS,
  QUICK_FIX_ORCHESTRATION_KEYS,
  REVIEW_EFFORTS,
  REVIEW_SPEEDS,
  REVIEW_STEP_MODELS,
  buildExecutionOptionView,
  implEffortOptions,
  implModelOptions,
  narrowImplTarget,
  orchestrationEffortOptions,
  orchestrationModelOptions,
  orchestrationRuntimeInitial,
  orchestrationRuntimeOptions,
  speedVisible
} from './session-model.js';

/** The `기본값 사용` sentinel every select carries as its first option. */
const UNSET = '';

/** A workspace quick_fix runtime is concrete; `inherit` has no controller. */
const QUICK_FIX_IMPL_RUNTIMES = ['claude', 'codex'];

/** Disabled copy for a server that never had the quick_fix lane. */
const QUICK_FIX_UNSUPPORTED = '서버가 quick_fix 레인을 지원하지 않습니다';

/** Loading copy while no monitor row has arrived yet. */
const FORM_LOADING = '불러오는 중';

/** The six preset keys the workspace QUEUE stores rather than kv. */
export const BULK_FORM_QUEUE_KEYS = [
  ...ORCHESTRATION_KEYS,
  ...QUICK_FIX_ORCHESTRATION_KEYS
];

/**
 * The twenty-four keys this form edits: the preset profile minus
 * `impl_dispatch`, which the contract keeps `user_write_only` and no workspace
 * layer can store (UI-628r §2.1). 18 of them are kv keys (`PRESET_KV_KEYS`) and
 * 6 are queue keys ({@link BULK_FORM_QUEUE_KEYS}).
 */
export const BULK_FORM_KEYS = IMPL_PRESET_KEYS.filter(
  (key) => key !== 'impl_dispatch'
);

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * The stored form of one cell: a non-empty string, else `null` for
 * `기본값 사용`.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function storedValue(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * @typedef {Object} BulkWorkerFormOptions
 * @property {() => Array<Record<string, any>>} rows - The monitor rows the form
 * reads its catalog from, selected repos first.
 * @property {(row: Record<string, any>) => Record<string, any>} [queueOf] - How
 * to read one row's queue surface; the row itself by default.
 * @property {() => void} [onChange] - Called after every edit so the pane
 * redraws.
 */

/**
 * One closure holding the bulk `워커` tab's 24-key map, its group templates
 * and the payloads an apply sends.
 *
 * @param {BulkWorkerFormOptions} options
 */
export function createBulkWorkerForm({ rows, queueOf, onChange }) {
  /** @type {Record<string, string>} */
  const values = {};

  /** The UI-only orchestration provider axis; `null` = derive it. */
  /** @type {string|null} */
  let runtime_pick = null;

  /**
   * @param {Record<string, any>} row
   * @returns {Record<string, any>}
   */
  const readQueue = (row) =>
    typeof queueOf === 'function' ? queueOf(row) : row;

  /** @returns {Array<Record<string, any>>} */
  function rowList() {
    const list = typeof rows === 'function' ? rows() : [];
    return Array.isArray(list) ? list.filter((row) => isRecord(row)) : [];
  }

  /**
   * The row the catalog and the harness defaults come from — the first
   * selected repo. Every repo on one server publishes the same catalog, so no
   * repo-by-repo merge is needed (UI-8ncz §1.2).
   *
   * @returns {Record<string, any>|null}
   */
  function firstRow() {
    const list = rowList();
    return list.length > 0 ? readQueue(list[0]) : null;
  }

  /** @returns {any} */
  function catalogOf() {
    const row = firstRow();
    return row ? row.runner_catalog : null;
  }

  /** @returns {Record<string, any>|null} */
  function defaultsOf() {
    const row = firstRow();
    return row && isRecord(row.execution_defaults)
      ? row.execution_defaults
      : null;
  }

  /** @returns {boolean} */
  function quickFixSupported() {
    return supportsQuickFixLane(rowList().map((row) => readQueue(row)));
  }

  /** Redraw after an edit; the pane owns the render. */
  function notifyChange() {
    if (typeof onChange === 'function') {
      onChange();
    }
  }

  /**
   * The provider the orchestration rows are narrowed to: the user's pick, then
   * the runner of the chosen model, then the projection default.
   *
   * @returns {string|null}
   */
  function orchestrationRuntime() {
    if (runtime_pick !== null) {
      return runtime_pick;
    }
    const projection = defaultsOf();
    const projected =
      projection && isRecord(projection.orchestration)
        ? projection.orchestration.model
        : null;
    return orchestrationRuntimeInitial(
      catalogOf(),
      values.orchestration_model ?? null,
      typeof projected === 'string' ? projected : null
    );
  }

  /**
   * The catalog token a review gate's reviewer stands for, so the `속도` row
   * follows the provider that will actually run it. `self`, `skip` and an unset
   * gate name no runner.
   *
   * @param {string|undefined} reviewer
   * @returns {string|null}
   */
  function reviewerModelToken(reviewer) {
    if (
      typeof reviewer !== 'string' ||
      reviewer.length === 0 ||
      reviewer === 'self' ||
      reviewer === 'skip'
    ) {
      return null;
    }
    const reviewers = defaultsOf()?.session?.review?.reviewers;
    const mapped =
      isRecord(reviewers) && isRecord(reviewers[reviewer])
        ? reviewers[reviewer].model
        : null;
    return typeof mapped === 'string' && mapped.length > 0 ? mapped : reviewer;
  }

  /**
   * Which `속도` rows the catalog admits right now, keyed by their stored key.
   * The template and {@link pruneHiddenSpeeds} read this same map.
   *
   * @returns {Record<string, boolean>}
   */
  function speedVisibility() {
    const catalog = catalogOf();
    const worker_runtime = orchestrationRuntime();
    return {
      orchestration_speed: speedVisible(catalog, { runtime: worker_runtime }),
      spec_review_speed: speedVisible(catalog, {
        model: reviewerModelToken(values.spec_review_model)
      }),
      plan_review_speed: speedVisible(catalog, {
        model: reviewerModelToken(values.plan_review_model)
      }),
      impl_review_speed: speedVisible(catalog, {
        model: reviewerModelToken(values.impl_review_model)
      }),
      impl_speed: speedVisible(catalog, {
        runtime: values.impl_runtime,
        model: values.impl_model
      }),
      quick_fix_orchestration_speed: values.quick_fix_orchestration_model
        ? speedVisible(catalog, {
            model: values.quick_fix_orchestration_model
          })
        : speedVisible(catalog, { runtime: worker_runtime }),
      quick_fix_impl_speed: speedVisible(catalog, {
        runtime: values.quick_fix_impl_runtime,
        model: values.quick_fix_impl_model
      })
    };
  }

  /** Drop every 속도 value whose row just left the screen (UI-7yh2 §3.4). */
  function pruneHiddenSpeeds() {
    for (const [key, visible] of Object.entries(speedVisibility())) {
      if (!visible && typeof values[key] === 'string') {
        delete values[key];
      }
    }
  }

  /**
   * Whether a quick_fix Bead would run `delegated` under this form alone —
   * what puts the quick_fix delegation rows on screen (UI-7yh2 §3.5).
   *
   * @returns {boolean}
   */
  function quickFixDelegated() {
    const resolved = resolveExecutionSettings({
      pin: null,
      global: { ...values },
      execution_defaults: defaultsOf(),
      runner_catalog: catalogOf(),
      route: 'quick_fix'
    });
    return resolved.impl_dispatch?.value === 'delegated';
  }

  /**
   * @param {string} key
   * @param {string|undefined} value
   */
  function writeValue(key, value) {
    if (typeof value === 'string' && value.length > 0) {
      values[key] = value;
    } else {
      delete values[key];
    }
  }

  /**
   * Edit one ordinary row.
   *
   * @param {string} key
   * @param {string} value
   */
  function onValueChange(key, value) {
    writeValue(key, value === UNSET ? undefined : value);
    pruneHiddenSpeeds();
    notifyChange();
  }

  /**
   * Edit one of the three coupled implementation keys, then drop whatever the
   * new delegation target cannot run — the same narrowing one repo's tab does.
   *
   * @param {string} key
   * @param {string} value
   */
  function onImplTargetChange(key, value) {
    const next = value === UNSET ? undefined : value;
    const narrowed = narrowImplTarget(
      {
        impl_runtime: key === 'impl_runtime' ? next : values.impl_runtime,
        impl_model: key === 'impl_model' ? next : values.impl_model,
        impl_effort: key === 'impl_effort' ? next : values.impl_effort
      },
      catalogOf()
    );
    writeValue('impl_runtime', narrowed.impl_runtime);
    writeValue('impl_model', narrowed.impl_model);
    writeValue('impl_effort', narrowed.impl_effort);
    pruneHiddenSpeeds();
    notifyChange();
  }

  /**
   * Pick the orchestration provider, then drop the model and effort it cannot
   * run. An unset model stays unset: its default belongs to the projection.
   *
   * @param {string} runtime
   */
  function onOrchestrationRuntimeChange(runtime) {
    runtime_pick = runtime;
    const catalog = catalogOf();
    /** @type {string|undefined} */
    let model = values.orchestration_model;
    if (model && !orchestrationModelOptions(catalog, runtime).includes(model)) {
      delete values.orchestration_model;
      delete values.orchestration_effort;
      model = undefined;
    }
    const effort = values.orchestration_effort;
    if (
      effort &&
      !orchestrationEffortOptions(
        catalog,
        runtime,
        model || AUTO_LITERAL
      ).includes(effort)
    ) {
      delete values.orchestration_effort;
    }
    pruneHiddenSpeeds();
    notifyChange();
  }

  /**
   * Fill the whole form from one preset: the keys it names take its values and
   * the keys it leaves empty go back to `기본값 사용` (UI-628r §2.2).
   *
   * @param {Record<string, any>|null|undefined} settings
   */
  function applyPreset(settings) {
    const source = isRecord(settings) ? settings : {};
    for (const key of BULK_FORM_KEYS) {
      writeValue(key, storedValue(source[key]) ?? undefined);
    }
    // The provider axis follows the preset's own orchestration model.
    runtime_pick = null;
    notifyChange();
  }

  /**
   * Whether the form still holds exactly one preset — the only thing that
   * decides which apply path `[적용]` takes (UI-628r §4.2).
   *
   * @param {Record<string, any>|null|undefined} settings
   * @returns {boolean}
   */
  function equalsPreset(settings) {
    const source = isRecord(settings) ? settings : {};
    return BULK_FORM_KEYS.every(
      (key) => storedValue(source[key]) === storedValue(values[key])
    );
  }

  /**
   * One `{ key: value|null }` map over a key list. EVERY key is present: a row
   * left at `기본값 사용` is a deletion request, not an omission.
   *
   * @param {ReadonlyArray<string>} keys
   * @returns {Record<string, string|null>}
   */
  function mapOf(keys) {
    /** @type {Record<string, string|null>} */
    const out = {};
    for (const key of keys) {
      out[key] = storedValue(values[key]);
    }
    return out;
  }

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
    const selected = values[key] ?? UNSET;
    const view = buildExecutionOptionView(
      key,
      choices,
      values,
      defaultsOf(),
      catalogOf(),
      values,
      route
    );
    const chosen = view.options.find((option) => option.value === selected);
    const full_value =
      selected === UNSET ? view.full_value : chosen?.full_value;
    return html`<select
      class=${selected === UNSET ? 'settings-dialog__unset' : ''}
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
    </select>`;
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
    const runtime = orchestrationRuntime();
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
            aria-label="런타임"
            data-bulk-key="orchestration_runtime"
            ?disabled=${disabled}
            .value=${live(runtime || UNSET)}
            @change=${(/** @type {Event} */ ev) =>
              onOrchestrationRuntimeChange(
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
    // No 실행 방식 row: `impl_dispatch` has no workspace-global storage, so
    // this layer never offers it (UI-628r §2.1).
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
   * The quick_fix lane. `실행 방식` leads the group because it governs whether
   * the delegation rows exist at all (UI-628r §3.2), and those rows exist only
   * while the resolved dispatch is `delegated`; on `main` they are absent, not
   * hidden.
   *
   * @param {Record<string, boolean>} visibility
   * @param {boolean} disabled
   * @returns {TemplateResult}
   */
  function quickFixGroup(visibility, disabled) {
    const catalog = catalogOf();
    const supported = quickFixSupported();
    const off = disabled || !supported;
    // Every catalog token, runtime-independent: the delegation runtime is
    // DERIVED from this key's model, so the 위임 대상 row must not narrow it.
    const models = implModelOptions(catalog, undefined).filter(
      (token) => token !== AUTO_LITERAL
    );
    const efforts = implEffortOptions(catalog, undefined, undefined);
    const orchestration_efforts = orchestrationEffortOptions(
      catalog,
      null,
      null
    ).filter((effort) => effort !== AUTO_LITERAL);
    /**
     * @param {string} key
     * @param {string} label
     * @param {ReadonlyArray<string>} choices
     * @param {(key: string, value: string) => void} onSelect
     * @returns {TemplateResult}
     */
    const quickFixRow = (key, label, choices, onSelect) =>
      selectRow(key, label, choices, onSelect, off, 'quick_fix');
    return html`<div
      class="settings-dialog__group"
      data-bulk-group="quick_fix"
      title=${supported ? '' : QUICK_FIX_UNSUPPORTED}
    >
      <div class="settings-dialog__group-title">
        quick_fix
        <span class="settings-dialog__hint"
          >${supported
            ? '비어 있는 값은 일반 프로파일로 떨어집니다.'
            : QUICK_FIX_UNSUPPORTED}</span
        >
      </div>
      ${quickFixRow(
        'quick_fix_impl_dispatch',
        '실행 방식',
        IMPL_DISPATCHES,
        onValueChange
      )}
      ${quickFixRow(
        'quick_fix_orchestration_model',
        '오케스트레이션 모델',
        orchestrationModelOptions(catalog, null),
        onValueChange
      )}
      ${quickFixRow(
        'quick_fix_orchestration_effort',
        '오케스트레이션 effort',
        orchestration_efforts,
        onValueChange
      )}
      ${visibility.quick_fix_orchestration_speed
        ? quickFixRow(
            'quick_fix_orchestration_speed',
            '오케스트레이션 속도',
            IMPL_SPEEDS,
            onValueChange
          )
        : ''}
      ${quickFixDelegated()
        ? html`
            ${quickFixRow(
              'quick_fix_impl_runtime',
              '위임 대상',
              QUICK_FIX_IMPL_RUNTIMES,
              onValueChange
            )}
            ${quickFixRow(
              'quick_fix_impl_model',
              '모델',
              models,
              onValueChange
            )}
            ${quickFixRow(
              'quick_fix_impl_effort',
              'effort',
              efforts,
              onValueChange
            )}
            ${visibility.quick_fix_impl_speed
              ? quickFixRow(
                  'quick_fix_impl_speed',
                  '속도',
                  IMPL_SPEEDS,
                  onValueChange
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
    applyPreset,
    equalsPreset,

    /**
     * The eighteen kv keys, every one present (UI-628r §4.1).
     *
     * @returns {Record<string, string|null>}
     */
    kvValues() {
      return mapOf(PRESET_KV_KEYS);
    },

    /**
     * The six queue keys, every one present (UI-628r §4.1).
     *
     * @returns {Record<string, string|null>}
     */
    queueValues() {
      return mapOf(BULK_FORM_QUEUE_KEYS);
    },

    /**
     * A copy of the sparse form map — what the rows show right now.
     *
     * @returns {Record<string, string>}
     */
    values() {
      return { ...values };
    },

    /**
     * The four groups, in `워커` 탭 order. With no row yet there is no catalog
     * to draw options from, so the form says so instead of guessing.
     *
     * @param {boolean} [disabled] - `true` while a run is in flight.
     * @returns {TemplateResult}
     */
    template(disabled = false) {
      if (rowList().length === 0) {
        return html`<p
          class="settings-dialog__bulk-loading"
          data-bulk-form-loading
        >
          ${FORM_LOADING}
        </p>`;
      }
      const visibility = speedVisibility();
      return html`${orchestrationGroup(visibility, disabled)}
      ${implGroup(visibility, disabled)}
      ${reviewGatesGroup(visibility, disabled)}
      ${quickFixGroup(visibility, disabled)}`;
    }
  };
}
