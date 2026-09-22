/**
 * 여러 저장소 설정 창 `워커` 탭의 실행 프로필 폼 (UI-e1ta §3–§4, 편집면은
 * UI-628r §4.1).
 *
 * The bulk window IS a view of the ticked repos' current settings (UI-e1ta §3):
 * every row starts from `bulk-observation.js`'s reading of those repos. A row
 * whose repos agree stands on that value, a row nobody has set stands on
 * `기본값 사용`, and a row whose repos disagree — or whose layer one repo has
 * not read yet — stands on nothing at all and stays out of the apply payload
 * until the user touches it.
 *
 * A touched row is `편집됨` and no later observation overwrites it (§3.1).
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
  observationApplies,
  observationBadge,
  observeKey
} from './bulk-observation.js';
import {
  AUTO_LITERAL,
  GENERAL_PRESET_KEYS,
  GENERAL_PRESET_KV_KEYS,
  IMPL_DISPATCHES,
  IMPL_RUNTIMES,
  IMPL_SPEEDS,
  ORCHESTRATION_KEYS,
  PLAN_REVIEW_MODELS,
  QUICK_FIX_KV_KEYS,
  QUICK_FIX_LANE_MAP,
  QUICK_FIX_ORCHESTRATION_KEYS,
  QUICK_FIX_PRESET_KEYS,
  REVIEW_EFFORTS,
  REVIEW_SPEEDS,
  REVIEW_STEP_MODELS,
  buildExecutionOptionView,
  implEffortOptions,
  implModelOptions,
  narrowImplTarget,
  normalizeAppliesTo,
  orchestrationEffortOptions,
  orchestrationModelOptions,
  orchestrationRuntimeInitial,
  orchestrationRuntimeOptions,
  speedVisible
} from './session-model.js';

/** The `기본값 사용` sentinel every select carries as its first option. */
const UNSET = '';

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

/** Loading copy while no monitor row has arrived yet. */
const FORM_LOADING = '불러오는 중';

/**
 * The queue keys one profile's rows are stored under (design §4).
 *
 * @param {unknown} applies_to
 * @returns {ReadonlyArray<string>}
 */
export function bulkFormQueueKeysFor(applies_to) {
  return normalizeAppliesTo(applies_to) === 'quick_fix'
    ? QUICK_FIX_ORCHESTRATION_KEYS
    : ORCHESTRATION_KEYS;
}

/**
 * The rows one profile's tab DRAWS, in that profile's own STORAGE key names:
 * 17 canonical rows for `general` and 8 prefixed rows for `quick_fix` (§6.2).
 *
 * The general list keeps `impl_dispatch`, which exists only so a preset can
 * carry it (UI-e1ta §4) — the contract gives it no workspace-global storage
 * (ADR 0012), so it is never observed and never joins an apply payload. In the
 * quick_fix profile the contract DOES allow the global, so its
 * `quick_fix_impl_dispatch` row is an ordinary observed row.
 *
 * @param {unknown} applies_to
 * @returns {ReadonlyArray<string>}
 */
export function bulkFormRowKeysFor(applies_to) {
  return normalizeAppliesTo(applies_to) === 'quick_fix'
    ? QUICK_FIX_PRESET_KEYS.map((key) => QUICK_FIX_LANE_MAP[key])
    : GENERAL_PRESET_KEYS;
}

/**
 * The rows one profile actually WRITES — the drawn rows minus the ones no
 * workspace layer stores.
 *
 * @param {unknown} applies_to
 * @returns {ReadonlyArray<string>}
 */
export function bulkFormKeysFor(applies_to) {
  const profile = normalizeAppliesTo(applies_to);
  return bulkFormRowKeysFor(profile).filter(
    (key) => layerOf(key, profile) !== null
  );
}

/**
 * Which layer a row is observed from. A profile's kv keys come from the
 * session-defaults layer and its orchestration keys ride on the monitor row
 * itself; the general `impl_dispatch` comes from nowhere.
 *
 * @param {string} key
 * @param {unknown} applies_to
 * @returns {import('./bulk-observation.js').ObservationLayer|null}
 */
function layerOf(key, applies_to) {
  const profile = normalizeAppliesTo(applies_to);
  const kv_keys =
    profile === 'quick_fix' ? QUICK_FIX_KV_KEYS : GENERAL_PRESET_KV_KEYS;
  if (kv_keys.includes(key)) {
    return 'session_defaults';
  }
  return bulkFormQueueKeysFor(profile).includes(key) ? 'queue' : null;
}

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
 * @property {'general'|'quick_fix'} [profile] - Which preset profile this form
 * edits; `general` by default.
 * @property {(row: Record<string, any>) => Record<string, any>} [queueOf] - How
 * to read one row's queue surface; the row itself by default.
 * @property {() => Array<Record<string, any>>} [selectedRows] - The ticked
 * repos, which is what the rows are OBSERVED from; `rows` by default.
 * @property {() => Record<string, string>} [resolutionValues] - The OTHER
 * profile's screen values a label resolves against, so an empty quick_fix row
 * names the general row it falls through to; this form's own values by default.
 * @property {() => void} [onChange] - Called after every edit so the pane
 * redraws.
 */

/**
 * One closure holding ONE profile's bulk row map, its group templates and the
 * payloads an apply sends. Two instances stand side by side in the bulk
 * window, one per tab, and neither sees the other's edits (§6.2).
 *
 * @param {BulkWorkerFormOptions} options
 */
export function createBulkWorkerForm({
  rows,
  profile = 'general',
  queueOf,
  selectedRows,
  resolutionValues,
  onChange
}) {
  /** The rows this instance draws, in storage key names. */
  const row_keys = bulkFormRowKeysFor(profile);
  /** The rows this instance writes. */
  const applied_key_list = bulkFormKeysFor(profile);
  /** The queue keys of this profile. */
  const queue_keys = bulkFormQueueKeysFor(profile);
  const is_quick_fix = profile === 'quick_fix';

  /** @type {Record<string, string>} */
  const values = {};

  /** Keys the user has touched; no observation overwrites these (§3.1). */
  /** @type {Set<string>} */
  const edited = new Set();

  /** The last observation per key, `null` for a key nothing observes. */
  /** @type {Record<string, import('./bulk-observation.js').Observation|null>} */
  const observations = {};

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
   * The ticked repos, which is what every row is observed from. With nothing
   * ticked there is nothing to observe, not "every repo".
   *
   * @returns {Array<Record<string, any>>}
   */
  function observedRows() {
    const list =
      typeof selectedRows === 'function' ? selectedRows() : rowList();
    return Array.isArray(list) ? list.filter((row) => isRecord(row)) : [];
  }

  /**
   * Re-read every row that the user has NOT touched (§3.1). Called on a target
   * change and on a new snapshot; a run in flight freezes it (§9).
   *
   * @param {boolean} [frozen] - `true` while a run is in flight.
   */
  function observe(frozen = false) {
    if (frozen === true) {
      return;
    }
    const list = observedRows();
    for (const key of row_keys) {
      const layer = layerOf(key, profile);
      if (layer === null) {
        observations[key] = null;
        continue;
      }
      const observation = observeKey(list, key, layer);
      observations[key] = observation;
      if (edited.has(key)) {
        continue;
      }
      writeValue(key, observation.state === 'same' ? observation.value : null);
    }
  }

  /**
   * The observation a row stands on, or `null` when nothing observes it.
   *
   * @param {string} key
   * @returns {import('./bulk-observation.js').Observation|null}
   */
  function observationOf(key) {
    return observations[key] ?? null;
  }

  /**
   * Whether this row is standing on a hold rather than a value — the state
   * that keeps it out of the apply payload (§3.2).
   *
   * @param {string} key
   * @returns {'mixed'|'pending'|null}
   */
  function holdStateOf(key) {
    return edited.has(key) ? null : holdOptionOf(key);
  }

  /**
   * Whether the row OFFERS the hold option. An edited row keeps offering it —
   * re-picking it is how the user withdraws the edit (§3.1) — so this ignores
   * the edit and reads the observation alone.
   *
   * @param {string} key
   * @returns {'mixed'|'pending'|null}
   */
  function holdOptionOf(key) {
    const observation = observationOf(key);
    if (!observation || observationApplies(observation)) {
      return null;
    }
    return /** @type {'mixed'|'pending'} */ (observation.state);
  }

  /**
   * Which of this profile's applied keys carry a value this round. A row no
   * workspace layer stores is absent by construction.
   *
   * @returns {string[]}
   */
  function appliedKeys() {
    return applied_key_list.filter((key) => holdStateOf(key) === null);
  }

  /**
   * The screen values a row's label resolves against: this form's own values,
   * with the other tab's underneath when the pane supplies them. An empty
   * quick_fix row then names the general value it falls through to.
   *
   * @returns {Record<string, string>}
   */
  function resolutionOf() {
    const outer =
      typeof resolutionValues === 'function' ? resolutionValues() : null;
    return isRecord(outer) ? { ...outer, ...values } : values;
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
      resolutionOf().orchestration_model ?? null,
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
    if (is_quick_fix) {
      return {
        // An unset quick_fix orchestration model falls through to the general
        // profile, so the row follows the general provider until it names one.
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
      global: { ...resolutionOf() },
      execution_defaults: defaultsOf(),
      runner_catalog: catalogOf(),
      route: 'quick_fix'
    });
    return resolved.impl_dispatch?.value === 'delegated';
  }

  /**
   * @param {string} key
   * @param {string|null|undefined} value
   */
  function writeValue(key, value) {
    if (typeof value === 'string' && value.length > 0) {
      values[key] = value;
    } else {
      delete values[key];
    }
  }

  /**
   * Put one row back on its observation: the `갈림 — 유지` option is a
   * withdrawal of the edit, not a value (§3.1).
   *
   * @param {string} key
   */
  function releaseEdit(key) {
    edited.delete(key);
    const observation = observationOf(key);
    writeValue(
      key,
      observation && observation.state === 'same' ? observation.value : null
    );
    pruneHiddenSpeeds();
    notifyChange();
  }

  /**
   * Edit one ordinary row.
   *
   * @param {string} key
   * @param {string} value
   */
  function onValueChange(key, value) {
    if (value === HOLD) {
      releaseEdit(key);
      return;
    }
    edited.add(key);
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
    if (value === HOLD) {
      releaseEdit(key);
      return;
    }
    /** @type {Array<'impl_runtime'|'impl_model'|'impl_effort'>} */
    const coupled_keys = ['impl_runtime', 'impl_model', 'impl_effort'];
    const before = {
      impl_runtime: values.impl_runtime,
      impl_model: values.impl_model,
      impl_effort: values.impl_effort
    };
    const next = value === UNSET ? undefined : value;
    const narrowed = narrowImplTarget(
      {
        impl_runtime: key === 'impl_runtime' ? next : before.impl_runtime,
        impl_model: key === 'impl_model' ? next : before.impl_model,
        impl_effort: key === 'impl_effort' ? next : before.impl_effort
      },
      catalogOf()
    );
    // Only the row the user touched and the coupled rows the narrowing ACTUALLY
    // moved become `편집됨`. A coupled row still on its hold whose value the
    // narrowing left alone keeps that hold, so changing one setting cannot send
    // a null deletion for a sibling nobody touched (§3.1).
    edited.add(key);
    for (const coupled of coupled_keys) {
      if (storedValue(narrowed[coupled]) !== storedValue(before[coupled])) {
        edited.add(coupled);
      }
    }
    for (const coupled of coupled_keys) {
      writeValue(coupled, narrowed[coupled]);
    }
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
      edited.add('orchestration_model');
      edited.add('orchestration_effort');
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
      edited.add('orchestration_effort');
    }
    pruneHiddenSpeeds();
    notifyChange();
  }

  /**
   * The canonical preset key one screen row stands for. The `general` rows
   * already carry canonical names; the `quick_fix` rows carry the prefixed
   * storage names a preset never holds (design §3.2).
   *
   * @param {string} key - A storage key of this profile.
   * @returns {string}
   */
  function canonicalKeyOf(key) {
    if (!is_quick_fix) {
      return key;
    }
    const found = QUICK_FIX_PRESET_KEYS.find(
      (canonical) => QUICK_FIX_LANE_MAP[canonical] === key
    );
    return found ?? key;
  }

  /**
   * Fill THIS TAB's rows from one preset of THIS TAB's profile: the keys it
   * names take its values and the keys it leaves empty go back to
   * `기본값 사용` (UI-628r §2.2). The other tab's rows are untouched — one
   * tab's choice never becomes the other tab's plan (§6.2).
   *
   * Every row of this tab becomes `편집됨`, `갈림`과 `미확인` included: picking
   * a preset is the user naming one whole profile, so those rows now stand on
   * its value and go into the apply (UI-e1ta §3.1).
   *
   * @param {Record<string, any>|null|undefined} settings
   */
  function applyPreset(settings) {
    const source = isRecord(settings) ? settings : {};
    for (const key of row_keys) {
      writeValue(key, storedValue(source[canonicalKeyOf(key)]) ?? undefined);
      edited.add(key);
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
    // A row still on a hold has promised to leave each repo's own value alone
    // (§3.2). The whole-preset apply path writes EVERY key the preset names and
    // deletes the ones it omits, so it would break that promise: an empty hold
    // and an empty preset key compare equal while meaning opposite things.
    if (applied_key_list.some((key) => holdStateOf(key) !== null)) {
      return false;
    }
    return row_keys.every(
      (key) =>
        storedValue(source[canonicalKeyOf(key)]) === storedValue(values[key])
    );
  }

  /**
   * One `{ key: value|null }` map over a key list. Every key that STANDS ON A
   * VALUE is present — a row left at `기본값 사용` is a deletion request, not an
   * omission — and a row still holding `갈림`이나 `미확인` is absent, which is
   * what leaves each repo's own value alone (§3.2).
   *
   * @param {ReadonlyArray<string>} keys
   * @returns {Record<string, string|null>}
   */
  function mapOf(keys) {
    const applied = new Set(appliedKeys());
    /** @type {Record<string, string|null>} */
    const out = {};
    for (const key of keys) {
      if (applied.has(key)) {
        out[key] = storedValue(values[key]);
      }
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
    const hold = holdStateOf(key);
    const hold_option = holdOptionOf(key);
    const selected = hold === null ? (values[key] ?? UNSET) : HOLD;
    const view = buildExecutionOptionView(
      key,
      choices,
      values,
      defaultsOf(),
      catalogOf(),
      resolutionOf(),
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
    if (layerOf(key, profile) === null) {
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
      disabled || !quickFixSupported(),
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
    const supported = quickFixSupported();
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
    const supported = quickFixSupported();
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
      ${quickFixDelegated()
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
    applyPreset,
    equalsPreset,
    observe,
    observationOf,
    holdStateOf,

    /**
     * How many of this profile's applied rows are still standing on a hold,
     * split by which hold it is — what the footer line counts (§3.2).
     *
     * @returns {{ mixed: number, pending: number }}
     */
    holdCounts() {
      let mixed = 0;
      let pending = 0;
      for (const key of applied_key_list) {
        const hold = holdStateOf(key);
        if (hold === 'mixed') {
          mixed += 1;
        } else if (hold === 'pending') {
          pending += 1;
        }
      }
      return { mixed, pending };
    },

    /**
     * The sparse profile a preset save stores, in CANONICAL key names — the
     * screen as it stands, `기본값 사용` rows omitted (§4.1). A quick_fix save
     * carries 8 canonical keys, never the prefixed storage names (§3.2).
     *
     * @returns {Record<string, string>}
     */
    presetSettings() {
      /** @type {Record<string, string>} */
      const out = {};
      for (const key of row_keys) {
        const value = storedValue(values[key]);
        if (value !== null) {
          out[canonicalKeyOf(key)] = value;
        }
      }
      return out;
    },

    /**
     * This profile's kv keys, every one present (UI-628r §4.1).
     *
     * @returns {Record<string, string|null>}
     */
    kvValues() {
      return mapOf(applied_key_list.filter((key) => !queue_keys.includes(key)));
    },

    /**
     * This profile's queue keys, every one present (UI-628r §4.1).
     *
     * @returns {Record<string, string|null>}
     */
    queueValues() {
      return mapOf(queue_keys);
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
     * This profile's groups, in tab order: three for `워커` and two for
     * `quick fix`. With no row yet there is no catalog to draw options from,
     * so the form says so instead of guessing.
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
      if (is_quick_fix) {
        return html`${quickFixOrchestrationGroup(visibility, disabled)}
        ${quickFixImplGroup(visibility, disabled)}`;
      }
      return html`${orchestrationGroup(visibility, disabled)}
      ${implGroup(visibility, disabled)}
      ${reviewGatesGroup(visibility, disabled)}`;
    }
  };
}
