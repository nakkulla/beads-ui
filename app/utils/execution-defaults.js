/**
 * @typedef {'pin'|'global'|'base'} ExecutionSource
 * @typedef {'explicit'|'default'|'dynamic'|'not_applicable'|'unavailable'|'incompatible'} ExecutionResolution
 * @typedef {{ value: string|null, source: ExecutionSource, display: string, full_value: string|null, resolution: ExecutionResolution }} ExecutionValue
 */

export const EXECUTION_SETTING_KEYS = [
  'workflow_mode',
  'spec_review_model',
  'spec_review_effort',
  'spec_review_speed',
  'plan_review_model',
  'plan_review_effort',
  'plan_review_speed',
  'impl_review_model',
  'impl_review_effort',
  'impl_review_speed',
  'impl_dispatch',
  'impl_runtime',
  'impl_model',
  'impl_effort',
  'impl_speed',
  'quick_fix_impl_dispatch',
  'quick_fix_impl_runtime',
  'quick_fix_impl_model',
  'quick_fix_impl_effort',
  'quick_fix_impl_speed',
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed',
  'quick_fix_orchestration_model',
  'quick_fix_orchestration_effort',
  'quick_fix_orchestration_speed'
];

const GENERAL_ORCHESTRATION_KEYS = [
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed'
];

const QUICK_FIX_ORCHESTRATION_KEYS = [
  'quick_fix_orchestration_model',
  'quick_fix_orchestration_effort',
  'quick_fix_orchestration_speed'
];

const ORCHESTRATION_SETTING_KEYS = [
  ...GENERAL_ORCHESTRATION_KEYS,
  ...QUICK_FIX_ORCHESTRATION_KEYS
];

/** @type {Record<string, string>} */
const QUICK_FIX_RESOLUTION_KEYS = {
  quick_fix_impl_dispatch: 'impl_dispatch',
  quick_fix_impl_runtime: 'impl_runtime',
  quick_fix_impl_model: 'impl_model',
  quick_fix_impl_effort: 'impl_effort',
  quick_fix_impl_speed: 'impl_speed',
  quick_fix_orchestration_model: 'orchestration_model',
  quick_fix_orchestration_effort: 'orchestration_effort',
  quick_fix_orchestration_speed: 'orchestration_speed'
};

const REVIEW_PAIRS = {
  spec_review_effort: 'spec_review_model',
  plan_review_effort: 'plan_review_model',
  impl_review_effort: 'impl_review_model'
};

const REVIEW_SPEED_PAIRS = {
  spec_review_speed: 'spec_review_model',
  plan_review_speed: 'plan_review_model',
  impl_review_speed: 'impl_review_model'
};

const KNOWN_TRANSPORT_EFFORTS = new Set([
  'native-fixed-posture',
  'unsupported',
  'claude-runner-model-default',
  'catalog-validated',
  'provider-tier-or-runtime-model-default',
  'actual-effort'
]);

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function usableString(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * @param {string} full_value
 */
export function compactModelId(full_value) {
  return full_value.startsWith('gpt-') ? full_value.slice(4) : full_value;
}

/**
 * @param {string|null} value
 * @param {ExecutionSource} source
 * @param {string} display
 * @param {string|null} full_value
 * @param {ExecutionResolution} resolution
 * @returns {ExecutionValue}
 */
function result(value, source, display, full_value, resolution) {
  return { value, source, display, full_value, resolution };
}

/**
 * @param {string} key
 * @param {Record<string, unknown>} pin
 * @param {Record<string, unknown>} global_values
 */
function explicitValue(key, pin, global_values) {
  const pinned = usableString(pin[key]);
  if (pinned !== null) {
    return { value: pinned, source: /** @type {const} */ ('pin') };
  }
  const global_value = usableString(global_values[key]);
  return global_value === null
    ? null
    : { value: global_value, source: /** @type {const} */ ('global') };
}

/**
 * @param {string} key
 * @param {Record<string, any>} pin
 * @param {Record<string, any>} global_values
 * @param {string|null} base
 */
function layeredValue(key, pin, global_values, base) {
  const explicit = explicitValue(key, pin, global_values);
  return explicit || { value: base, source: /** @type {const} */ ('base') };
}

/**
 * @param {string} token
 * @param {string|null} runtime
 * @param {Record<string, any>|null} session
 * @param {Record<string, any>|null} runner_catalog
 */
function implementationModelId(token, runtime, session, runner_catalog) {
  const models = session?.implementation?.model_catalog;
  if (runtime && isRecord(models?.[runtime])) {
    const mapped = usableString(models[runtime][token]);
    if (mapped !== null) {
      return mapped;
    }
  }
  if (
    runtime &&
    Array.isArray(models?.[runtime]) &&
    models[runtime].includes(token)
  ) {
    return token;
  }
  if (!runtime && isRecord(models)) {
    for (const runtime_models of Object.values(models)) {
      if (isRecord(runtime_models)) {
        const mapped = usableString(runtime_models[token]);
        if (mapped !== null) {
          return mapped;
        }
      } else if (
        Array.isArray(runtime_models) &&
        runtime_models.includes(token)
      ) {
        return token;
      }
    }
  }
  const catalog_runtime = runner_catalog?.model_index?.[token];
  return (
    usableString(
      runner_catalog?.runners?.[catalog_runtime]?.models?.[token]?.id
    ) || token
  );
}

/**
 * @param {string} token
 * @param {Record<string, any>|null} session
 */
function reviewerModelId(token, session) {
  return usableString(session?.review?.reviewers?.[token]?.model) || token;
}

/**
 * @param {string} value
 * @param {ExecutionSource} source
 * @param {boolean} [model]
 */
function explicitResult(value, source, model = false) {
  if (value === 'default') {
    const fixed = source === 'pin' ? '핀' : '전역 고정';
    return result(
      value,
      source,
      `default (일반 · ${fixed})`,
      value,
      'explicit'
    );
  }
  const display = model ? compactModelId(value) : value;
  return result(value, source, display, value, 'explicit');
}

/**
 * Every model token the runtime offers for `runtime`, from the projection's own
 * catalog first and the resolved runner catalog second. An empty list means the
 * runtime is unknown to both, which is not evidence that a token is wrong.
 *
 * @param {string} runtime
 * @param {Record<string, any>|null} session
 * @param {Record<string, any>|null} runner_catalog
 * @returns {string[]}
 */
function runtimeModelTokens(runtime, session, runner_catalog) {
  const projected = session?.implementation?.model_catalog?.[runtime];
  /** @type {string[]} */
  const tokens = [];
  if (isRecord(projected)) {
    tokens.push(...Object.keys(projected));
  } else if (Array.isArray(projected)) {
    tokens.push(...projected.filter((token) => typeof token === 'string'));
  }
  const catalog_models = runner_catalog?.runners?.[runtime]?.models;
  if (isRecord(catalog_models)) {
    for (const token of Object.keys(catalog_models)) {
      if (!tokens.includes(token)) {
        tokens.push(token);
      }
    }
  }
  return tokens;
}

/**
 * Every runtime name either the projection or the resolved runner catalog knows.
 *
 * @param {Record<string, any>|null} session
 * @param {Record<string, any>|null} runner_catalog
 * @returns {string[]}
 */
function knownRuntimes(session, runner_catalog) {
  /** @type {string[]} */
  const runtimes = [];
  const projected = session?.implementation?.model_catalog;
  if (isRecord(projected)) {
    runtimes.push(...Object.keys(projected));
  }
  const runners = runner_catalog?.runners;
  if (isRecord(runners)) {
    for (const runtime of Object.keys(runners)) {
      if (!runtimes.includes(runtime)) {
        runtimes.push(runtime);
      }
    }
  }
  return runtimes;
}

/**
 * The runtime a bare implementation model token belongs to, derived from the
 * catalog's globally-unique model names — the same derivation the contract uses
 * for `quick_fix_impl_model`, which stores no runtime of its own.
 *
 * `offered` says whether ANY runtime published a token list at all: with no
 * list, a token nobody matched is undecidable rather than wrong.
 *
 * @param {string|null} token
 * @param {Record<string, any>|null} session
 * @param {Record<string, any>|null} runner_catalog
 * @returns {{ runtime: string|null, offered: boolean }}
 */
function deriveModelRuntime(token, session, runner_catalog) {
  if (token === null) {
    return { runtime: null, offered: false };
  }
  let offered = false;
  for (const runtime of knownRuntimes(session, runner_catalog)) {
    const tokens = runtimeModelTokens(runtime, session, runner_catalog);
    if (tokens.length > 0) {
      offered = true;
    }
    if (tokens.includes(token)) {
      return { runtime, offered: true };
    }
  }
  return { runtime: null, offered };
}

/**
 * Mark a stored token the pinned projection does not recognize. The raw value
 * survives verbatim with a `비호환` marker (spec §9.2) — this consumer never
 * falls back to another reviewer, model, or effort, and never rewrites what the
 * user stored.
 *
 * @param {ExecutionValue} row
 * @returns {ExecutionValue}
 */
function incompatibleResult(row) {
  return result(
    row.value,
    row.source,
    `${row.value} (비호환)`,
    row.value,
    'incompatible'
  );
}

/**
 * @param {string} key
 * @param {Record<string, any>} pin
 * @param {Record<string, any>} global_values
 */
function unavailableResult(key, pin, global_values) {
  const explicit = explicitValue(key, pin, global_values);
  return explicit
    ? explicitResult(explicit.value, explicit.source)
    : result(null, 'base', '기본값 확인 불가', null, 'unavailable');
}

/**
 * Resolve every session and Worker execution key from its direct source layer.
 * Dependent effort follows the effective reviewer/model selected by those same
 * rows; it never changes the stored token.
 *
 * @param {{
 *   pin?: Record<string, unknown>|null,
 *   global?: Record<string, unknown>|null,
 *   execution_defaults?: Record<string, any>|null,
 *   runner_catalog?: Record<string, any>|null,
 *   route?: string|null,
 *   controller_runtime?: string|null,
 *   transport?: string|null
 * }} input
 * @returns {Record<string, ExecutionValue>}
 */
export function resolveExecutionSettings(input) {
  const pin = isRecord(input.pin) ? input.pin : {};
  const global_values = isRecord(input.global) ? input.global : {};
  const projection = isRecord(input.execution_defaults)
    ? input.execution_defaults
    : null;
  const session =
    projection?.supported === true && isRecord(projection.session)
      ? projection.session
      : null;
  const orchestration =
    projection?.supported === true && isRecord(projection.orchestration)
      ? projection.orchestration
      : null;
  const runner_catalog = isRecord(input.runner_catalog)
    ? input.runner_catalog
    : null;
  // The kv-only `quick_fix_impl_model` layer: read from `global` alone, since
  // the contract gives it no bead-metadata pin. Its runtime is DERIVED from the
  // token, and that derivation feeds both its own row and the dispatch flip.
  const quick_fix_model = usableString(global_values.quick_fix_impl_model);
  const quick_fix_derived = deriveModelRuntime(
    quick_fix_model,
    session,
    runner_catalog
  );
  /** @type {Record<string, ExecutionValue>} */
  const rows = {};

  if (!session) {
    for (const key of EXECUTION_SETTING_KEYS.filter(
      (candidate) => !ORCHESTRATION_SETTING_KEYS.includes(candidate)
    )) {
      rows[key] = unavailableResult(key, pin, global_values);
    }
  } else {
    const workflow = layeredValue(
      'workflow_mode',
      pin,
      global_values,
      usableString(session.workflow_mode_default)
    );
    rows.workflow_mode =
      workflow.source === 'base'
        ? result(
            workflow.value,
            'base',
            workflow.value || '기본값 확인 불가',
            workflow.value,
            'default'
          )
        : explicitResult(workflow.value, workflow.source);

    for (const prefix of ['spec_review', 'plan_review', 'impl_review']) {
      const model_key = `${prefix}_model`;
      const base_model =
        prefix === 'plan_review'
          ? usableString(
              workflow.value === 'fast_track'
                ? session.plan_review?.fast_track_default
                : session.plan_review?.standard_recommended
            )
          : usableString(session.review?.default);
      const chosen = layeredValue(model_key, pin, global_values, base_model);
      if (chosen.value === null) {
        rows[model_key] = result(
          null,
          'base',
          '기본값 확인 불가',
          null,
          'unavailable'
        );
      } else if (
        chosen.value !== 'self' &&
        chosen.value !== 'skip' &&
        !isRecord(session.review?.reviewers?.[chosen.value])
      ) {
        rows[model_key] = incompatibleResult(
          result(chosen.value, chosen.source, '', null, 'explicit')
        );
      } else {
        const full_value = reviewerModelId(chosen.value, session);
        rows[model_key] = result(
          chosen.value,
          chosen.source,
          compactModelId(full_value),
          full_value,
          chosen.source === 'base' ? 'default' : 'explicit'
        );
      }
    }

    for (const [effort_key, model_key] of Object.entries(REVIEW_PAIRS)) {
      const reviewer = rows[model_key].value;
      if (reviewer === 'self' || reviewer === 'skip') {
        rows[effort_key] = result(
          null,
          'base',
          '해당 없음',
          null,
          'not_applicable'
        );
        continue;
      }
      const preset = usableString(
        session.review?.reviewers?.[reviewer || '']?.effort
      );
      const chosen = layeredValue(effort_key, pin, global_values, preset);
      rows[effort_key] =
        chosen.value === null
          ? result(null, 'base', '기본값 확인 불가', null, 'unavailable')
          : result(
              chosen.value,
              chosen.source,
              chosen.value,
              chosen.value,
              chosen.source === 'base' ? 'default' : 'explicit'
            );
    }

    for (const [speed_key, model_key] of Object.entries(REVIEW_SPEED_PAIRS)) {
      const model_row = rows[model_key];
      if (
        model_row.resolution === 'incompatible' ||
        model_row.value === 'self' ||
        model_row.value === 'skip'
      ) {
        rows[speed_key] = result(
          null,
          'base',
          '해당 없음',
          null,
          'not_applicable'
        );
        continue;
      }
      if (model_row.resolution === 'unavailable') {
        rows[speed_key] = result(
          null,
          'base',
          '기본값 확인 불가',
          null,
          'unavailable'
        );
        continue;
      }
      const chosen = layeredValue(speed_key, pin, global_values, 'default');
      rows[speed_key] =
        chosen.source === 'base'
          ? result('default', 'base', 'default (일반)', 'default', 'default')
          : explicitResult(chosen.value, chosen.source);
    }

    const defaults = isRecord(session.implementation?.default)
      ? session.implementation.default
      : {};
    const route = usableString(input.route);
    const known_route =
      route !== null &&
      ['quick_fix', 'spec_backed', 'full_plan'].includes(route);
    const route_defaults = isRecord(session.implementation?.route_defaults)
      ? session.implementation.route_defaults
      : {};
    const route_default =
      known_route && isRecord(route_defaults[route])
        ? route_defaults[route]
        : {};
    /** @type {Record<string, 'pin'|'quick_fix'|'implied'|'derived'|'global'|'base'>} */
    const impl_origins = {};
    let quick_fix_model_accepted = false;
    if (route === 'quick_fix') {
      const pinned_runtime = usableString(pin.impl_runtime);
      const quick_fix_runtime = usableString(
        global_values.quick_fix_impl_runtime
      );
      const upper_runtime = pinned_runtime || quick_fix_runtime;
      const effective_upper_runtime =
        upper_runtime === 'inherit'
          ? usableString(input.controller_runtime)
          : upper_runtime;
      quick_fix_model_accepted =
        quick_fix_model !== null &&
        quick_fix_derived.runtime !== null &&
        (upper_runtime === null ||
          effective_upper_runtime === quick_fix_derived.runtime);

      const pinned_dispatch = usableString(pin.impl_dispatch);
      const quick_fix_dispatch = usableString(
        global_values.quick_fix_impl_dispatch
      );
      if (pinned_dispatch !== null) {
        rows.impl_dispatch = explicitResult(pinned_dispatch, 'pin');
        impl_origins.impl_dispatch = 'pin';
      } else if (quick_fix_dispatch !== null) {
        rows.impl_dispatch = explicitResult(quick_fix_dispatch, 'global');
        impl_origins.impl_dispatch = 'quick_fix';
      } else if (quick_fix_model_accepted) {
        rows.impl_dispatch = result(
          'delegated',
          'global',
          '위임 (모델 함의)',
          'delegated',
          'explicit'
        );
        impl_origins.impl_dispatch = 'implied';
      } else {
        const base_dispatch =
          usableString(route_default.dispatch) ||
          usableString(defaults.dispatch);
        rows.impl_dispatch = base_dispatch
          ? result(
              base_dispatch,
              'base',
              base_dispatch,
              base_dispatch,
              'default'
            )
          : result(null, 'base', '기본값 확인 불가', null, 'unavailable');
        impl_origins.impl_dispatch = 'base';
      }

      if (pinned_runtime !== null) {
        rows.impl_runtime = explicitResult(pinned_runtime, 'pin');
        impl_origins.impl_runtime = 'pin';
      } else if (quick_fix_runtime !== null) {
        rows.impl_runtime = explicitResult(quick_fix_runtime, 'global');
        impl_origins.impl_runtime = 'quick_fix';
      } else if (quick_fix_model_accepted) {
        const derived_runtime = /** @type {string} */ (
          quick_fix_derived.runtime
        );
        rows.impl_runtime = result(
          derived_runtime,
          'global',
          `${derived_runtime} (유도)`,
          derived_runtime,
          'explicit'
        );
        impl_origins.impl_runtime = 'derived';
      } else {
        const chosen = layeredValue(
          'impl_runtime',
          {},
          global_values,
          usableString(defaults.runtime)
        );
        rows.impl_runtime =
          chosen.value === null
            ? result(null, 'base', '기본값 확인 불가', null, 'unavailable')
            : result(
                chosen.value,
                chosen.source,
                chosen.value,
                chosen.value,
                chosen.source === 'base' ? 'default' : 'explicit'
              );
        impl_origins.impl_runtime = chosen.source;
      }

      for (const key of ['impl_model', 'impl_effort', 'impl_speed']) {
        const pinned = usableString(pin[key]);
        const quick_fix = usableString(global_values[`quick_fix_${key}`]);
        let chosen;
        if (pinned !== null) {
          chosen = { value: pinned, source: /** @type {const} */ ('pin') };
          impl_origins[key] = 'pin';
        } else if (
          key === 'impl_model' &&
          quick_fix_model_accepted &&
          quick_fix_model !== null
        ) {
          chosen = {
            value: quick_fix_model,
            source: /** @type {const} */ ('global')
          };
          impl_origins[key] = 'quick_fix';
        } else if (key !== 'impl_model' && quick_fix !== null) {
          chosen = {
            value: quick_fix,
            source: /** @type {const} */ ('global')
          };
          impl_origins[key] = 'quick_fix';
        } else {
          chosen = layeredValue(
            key,
            {},
            global_values,
            usableString(defaults[key.replace('impl_', '')])
          );
          impl_origins[key] = chosen.source;
        }
        rows[key] =
          chosen.value === null
            ? result(null, 'base', '기본값 확인 불가', null, 'unavailable')
            : result(
                chosen.value,
                chosen.source,
                chosen.value,
                chosen.value,
                chosen.source === 'base' ? 'default' : 'explicit'
              );
      }
    } else {
      for (const key of [
        'impl_dispatch',
        'impl_runtime',
        'impl_model',
        'impl_effort',
        'impl_speed'
      ]) {
        const chosen = layeredValue(
          key,
          pin,
          global_values,
          key === 'impl_dispatch'
            ? usableString(route_default.dispatch) ||
                usableString(defaults.dispatch)
            : usableString(defaults[key.replace('impl_', '')])
        );
        rows[key] =
          chosen.value === null
            ? result(null, 'base', '기본값 확인 불가', null, 'unavailable')
            : result(
                chosen.value,
                chosen.source,
                chosen.value,
                chosen.value,
                chosen.source === 'base' ? 'default' : 'explicit'
              );
      }
    }

    const main_dispatch = rows.impl_dispatch.value === 'main';
    if (main_dispatch) {
      // Only a quick_fix kv value renames this row. The harness route default
      // stays plain 메인 here; the dialog's own quick_fix_impl_dispatch row is
      // what names the harness layer, because that row has no general layer to
      // fall through to.
      rows.impl_dispatch.display =
        impl_origins.impl_dispatch === 'quick_fix'
          ? '메인 (quick_fix)'
          : '메인';
    } else if (rows.impl_dispatch.value === 'delegated') {
      if (impl_origins.impl_dispatch === 'quick_fix') {
        rows.impl_dispatch.display = '위임 (quick_fix)';
      } else if (impl_origins.impl_dispatch !== 'implied') {
        rows.impl_dispatch.display = '위임';
      }
    }
    if (rows.impl_runtime.value === 'inherit') {
      rows.impl_runtime.display = input.controller_runtime
        ? `inherit (${input.controller_runtime})`
        : 'inherit (실행 시 결정)';
      rows.impl_runtime.resolution = 'dynamic';
    }
    if (rows.impl_model.value !== null) {
      const runtime =
        rows.impl_runtime.value === 'inherit'
          ? usableString(input.controller_runtime)
          : rows.impl_runtime.value;
      const offered = runtime
        ? runtimeModelTokens(runtime, session, runner_catalog)
        : [];
      if (
        route === 'quick_fix' &&
        impl_origins.impl_model === 'base' &&
        impl_origins.impl_runtime !== 'base' &&
        offered.length > 0 &&
        !offered.includes(rows.impl_model.value)
      ) {
        rows.impl_model = result('auto', 'base', 'auto', 'auto', 'default');
      }
      const model_value = /** @type {string} */ (rows.impl_model.value);
      if (
        model_value !== 'auto' &&
        offered.length > 0 &&
        !offered.includes(model_value)
      ) {
        rows.impl_model = incompatibleResult(rows.impl_model);
      } else {
        const full_value = implementationModelId(
          model_value,
          runtime,
          session,
          runner_catalog
        );
        rows.impl_model.display = compactModelId(full_value);
        rows.impl_model.full_value = full_value;
        if (impl_origins.impl_model === 'quick_fix') {
          rows.impl_model.display = `${rows.impl_model.display} (quick_fix)`;
        }
      }
    }
    if (rows.impl_effort.value === 'auto') {
      const transport =
        usableString(input.transport) ||
        (rows.impl_runtime.value === 'codex'
          ? 'codex-native-spawn'
          : rows.impl_runtime.value === 'claude'
            ? 'implement-claude'
            : null);
      const token = transport
        ? usableString(
            session.implementation?.effort_by_transport?.[transport]?.auto
          )
        : null;
      if (token && !KNOWN_TRANSPORT_EFFORTS.has(token)) {
        rows.impl_effort.display = `${token} (비호환)`;
        rows.impl_effort.full_value = token;
        rows.impl_effort.resolution = 'incompatible';
      } else {
        rows.impl_effort.display = 'auto (실행 시 결정)';
        rows.impl_effort.resolution = 'dynamic';
      }
    }
    if (
      impl_origins.impl_effort === 'quick_fix' &&
      rows.impl_effort.value !== null
    ) {
      rows.impl_effort = result(
        rows.impl_effort.value,
        'global',
        `${rows.impl_effort.value} (quick_fix)`,
        rows.impl_effort.value,
        'explicit'
      );
    }
    if (rows.impl_speed.value === 'default') {
      rows.impl_speed =
        impl_origins.impl_speed === 'quick_fix'
          ? result(
              'default',
              'global',
              'default (quick_fix)',
              'default',
              'explicit'
            )
          : rows.impl_speed.source === 'base'
            ? result('default', 'base', 'default (일반)', 'default', 'default')
            : explicitResult('default', rows.impl_speed.source);
    }
    for (const key of ['impl_runtime', 'impl_effort', 'impl_speed']) {
      if (
        impl_origins[key] === 'quick_fix' &&
        rows[key].value !== null &&
        !rows[key].display.endsWith('(quick_fix)')
      ) {
        rows[key].display = `${rows[key].display} (quick_fix)`;
      }
    }

    if (route === 'quick_fix') {
      if (
        quick_fix_model !== null &&
        !quick_fix_model_accepted &&
        quick_fix_derived.offered
      ) {
        rows.quick_fix_impl_model = incompatibleResult(
          result(quick_fix_model, 'global', '', quick_fix_model, 'explicit')
        );
      }
      for (const [quick_key, resolved_key] of Object.entries(
        QUICK_FIX_RESOLUTION_KEYS
      )) {
        if (
          !quick_key.startsWith('quick_fix_orchestration_') &&
          !Object.hasOwn(rows, quick_key)
        ) {
          rows[quick_key] = { ...rows[resolved_key] };
        }
      }
      if (
        rows.impl_dispatch.source === 'base' &&
        rows.impl_dispatch.value === 'main'
      ) {
        rows.quick_fix_impl_dispatch = result(
          'main',
          'base',
          '메인 (하네스)',
          'main',
          'default'
        );
      }
    }
    if (main_dispatch) {
      for (const key of [
        'impl_runtime',
        'impl_model',
        'impl_effort',
        'impl_speed'
      ]) {
        rows[key] = result(null, 'base', '해당 없음', null, 'not_applicable');
      }
    }
  }

  if (!session) {
    for (const [effort_key, model_key] of Object.entries(REVIEW_PAIRS)) {
      if (
        rows[model_key].value === 'self' ||
        rows[model_key].value === 'skip'
      ) {
        rows[effort_key] = result(
          null,
          'base',
          '해당 없음',
          null,
          'not_applicable'
        );
      }
    }
    for (const [speed_key, model_key] of Object.entries(REVIEW_SPEED_PAIRS)) {
      if (
        rows[model_key].value === 'self' ||
        rows[model_key].value === 'skip'
      ) {
        rows[speed_key] = result(
          null,
          'base',
          '해당 없음',
          null,
          'not_applicable'
        );
      }
    }
    if (rows.impl_dispatch.value === 'main') {
      rows.impl_dispatch.display = '메인';
      for (const key of [
        'impl_runtime',
        'impl_model',
        'impl_effort',
        'impl_speed'
      ]) {
        rows[key] = result(null, 'base', '해당 없음', null, 'not_applicable');
      }
    } else {
      if (rows.impl_dispatch.value === 'delegated') {
        rows.impl_dispatch.display = '위임';
      }
      if (rows.impl_runtime.value === 'inherit') {
        rows.impl_runtime.display = input.controller_runtime
          ? `inherit (${input.controller_runtime})`
          : 'inherit (실행 시 결정)';
        rows.impl_runtime.resolution = 'dynamic';
      }
      if (rows.impl_effort.value === 'auto') {
        rows.impl_effort.display = 'auto (실행 시 결정)';
        rows.impl_effort.resolution = 'dynamic';
      }
    }
  }

  for (const key of GENERAL_ORCHESTRATION_KEYS) {
    if (!orchestration) {
      rows[key] = unavailableResult(key, pin, global_values);
      continue;
    }
    const base_key = key.replace('orchestration_', '');
    const base_value = usableString(orchestration[base_key]);
    const quick_fix_key = `quick_fix_${key}`;
    const quick_fix_value =
      input.route === 'quick_fix'
        ? usableString(global_values[quick_fix_key])
        : null;
    const pinned = usableString(pin[key]);
    const chosen =
      pinned !== null
        ? { value: pinned, source: /** @type {const} */ ('pin') }
        : quick_fix_value !== null
          ? {
              value: quick_fix_value,
              source: /** @type {const} */ ('global')
            }
          : layeredValue(key, {}, global_values, base_value);
    const from_quick_fix = pinned === null && quick_fix_value !== null;
    if (key === 'orchestration_effort' && chosen.source === 'base') {
      rows[key] = result(null, 'base', 'CLI 기본 (미지정)', null, 'default');
      continue;
    }
    if (chosen.value === null) {
      rows[key] = result(null, 'base', '기본값 확인 불가', null, 'unavailable');
      continue;
    }
    if (key === 'orchestration_model') {
      const full_value =
        chosen.source === 'base'
          ? usableString(orchestration.model_id) || chosen.value
          : implementationModelId(chosen.value, null, session, runner_catalog);
      rows[key] = result(
        chosen.value,
        chosen.source,
        `${compactModelId(full_value)}${from_quick_fix ? ' (quick_fix)' : ''}`,
        full_value,
        chosen.source === 'base' ? 'default' : 'explicit'
      );
      continue;
    }
    if (chosen.value === 'default') {
      rows[key] = from_quick_fix
        ? result(
            'default',
            'global',
            'default (quick_fix)',
            'default',
            'explicit'
          )
        : chosen.source === 'base'
          ? result('default', 'base', 'default (일반)', 'default', 'default')
          : explicitResult('default', chosen.source);
      continue;
    }
    rows[key] = from_quick_fix
      ? result(
          chosen.value,
          'global',
          `${chosen.value} (quick_fix)`,
          chosen.value,
          'explicit'
        )
      : explicitResult(chosen.value, chosen.source);
  }

  for (const quick_key of QUICK_FIX_ORCHESTRATION_KEYS) {
    const resolved_key = QUICK_FIX_RESOLUTION_KEYS[quick_key];
    rows[quick_key] = rows[resolved_key]
      ? { ...rows[resolved_key] }
      : unavailableResult(quick_key, pin, global_values);
  }

  if (session) {
    // Built last on purpose: its unset label quotes the orchestration model row,
    // which the loop above has only just resolved against the real workspace
    // value rather than the projection's fixed fallback.
    if (input.route === 'quick_fix') {
      // Route-scoped rows were copied from the effective ladder above.
    } else if (quick_fix_model === null) {
      const orchestration_model = rows.orchestration_model.full_value;
      rows.quick_fix_impl_model = result(
        null,
        'base',
        orchestration_model === null
          ? '메인'
          : `메인 (orchestration ${compactModelId(orchestration_model)})`,
        null,
        'default'
      );
    } else if (quick_fix_derived.runtime !== null) {
      const full_value = implementationModelId(
        quick_fix_model,
        quick_fix_derived.runtime,
        session,
        runner_catalog
      );
      rows.quick_fix_impl_model = result(
        quick_fix_model,
        'global',
        compactModelId(full_value),
        full_value,
        'explicit'
      );
    } else if (quick_fix_derived.offered) {
      rows.quick_fix_impl_model = incompatibleResult(
        result(quick_fix_model, 'global', '', null, 'explicit')
      );
    } else {
      rows.quick_fix_impl_model = explicitResult(quick_fix_model, 'global');
    }
  }

  return rows;
}

/**
 * The `기본값 사용 — …` label for the leading unset option.
 *
 * The settings dialog edits the global layer itself, so its unset option names
 * only the result. The per-bead editor sits one layer above and must also name
 * WHICH layer supplies that result (spec §7.5) — otherwise `기본값 사용` reads
 * the same whether the value comes from the workspace or the harness.
 *
 * @param {ExecutionValue} unset
 * @param {boolean} with_source
 * @returns {string}
 */
export function unsetOptionLabel(unset, with_source) {
  // A literal `default` stored one layer down is not fixed on THIS bead, so the
  // stored-value fixation marker would misdescribe it here.
  const body =
    with_source && unset.value === 'default' ? 'default (일반)' : unset.display;
  if (!with_source || unset.source === 'pin') {
    return `기본값 사용 — ${unset.display}`;
  }
  const layer = unset.source === 'global' ? '전역' : 'harness';
  return `기본값 사용 — ${body} (${layer})`;
}

/**
 * Option labels for one select, without touching its stored contract tokens.
 *
 * Every candidate is resolved as if it were stored in `layer`, so an option
 * reads exactly what choosing it would produce. Removing the key from that same
 * layer yields the leading unset option, and a stored value the current choice
 * list no longer offers is kept as an option — dropping it would render a
 * pinned value as unset.
 *
 * `route` is the bead's own route where one exists: the per-bead editor has it,
 * the settings dialog edits the global layer and has none. `resolution_global`
 * fills the OTHER keys' values when the edited draft is not the whole workspace
 * layer — the dialog's session draft holds no orchestration value, so a label
 * derived from one would otherwise read the projection fallback. The edited key
 * itself is never taken from it.
 *
 * @param {{
 *   key: string,
 *   choices: ReadonlyArray<string>,
 *   layer: 'pin'|'global',
 *   pin?: Record<string, any>|null,
 *   global?: Record<string, any>|null,
 *   execution_defaults?: Record<string, any>|null,
 *   runner_catalog?: Record<string, any>|null,
 *   route?: string|null,
 *   resolution_global?: Record<string, any>|null,
 *   controller_runtime?: string|null
 * }} input
 * @returns {{ unset_label: string, full_value: string|null, unavailable: boolean, disabled: boolean, options: Array<{ value: string, label: string, full_value: string|null }> }}
 */
export function buildOptionView(input) {
  const pin = isRecord(input.pin) ? input.pin : {};
  const global_values = isRecord(input.global) ? input.global : {};
  /** @type {Record<string, any>} */
  const resolution_extra = isRecord(input.resolution_global)
    ? { ...input.resolution_global }
    : {};
  delete resolution_extra[input.key];
  /** @param {Record<string, any>} layer_values */
  const resolveWith = (layer_values) => {
    const own = { ...resolution_extra, ...layer_values };
    return resolveExecutionSettings({
      pin: input.layer === 'pin' ? own : pin,
      global: input.layer === 'pin' ? global_values : own,
      execution_defaults: input.execution_defaults,
      runner_catalog: input.runner_catalog,
      route: input.route,
      controller_runtime: input.controller_runtime
    });
  };

  const own_values = input.layer === 'pin' ? pin : global_values;
  const unset_values = { ...own_values };
  delete unset_values[input.key];
  const unset = resolveWith(unset_values)[input.key];
  const current = resolveWith(own_values)[input.key];
  const stored = usableString(own_values[input.key]);
  /** @type {string[]} */
  const choices = [...input.choices];
  if (stored !== null && !choices.includes(stored)) {
    choices.unshift(stored);
  }
  return {
    unset_label: unsetOptionLabel(unset, input.layer === 'pin'),
    full_value: unset.full_value,
    unavailable: unset.resolution === 'unavailable',
    disabled: current?.resolution === 'not_applicable',
    options: choices.map((choice) => {
      const row = resolveWith({ ...own_values, [input.key]: choice })[
        input.key
      ];
      return { value: choice, label: row.display, full_value: row.full_value };
    })
  };
}
