/**
 * @typedef {'pin'|'global'|'base'} ExecutionSource
 * @typedef {'explicit'|'default'|'dynamic'|'not_applicable'|'unavailable'|'incompatible'} ExecutionResolution
 * @typedef {{ value: string|null, source: ExecutionSource, display: string, full_value: string|null, resolution: ExecutionResolution }} ExecutionValue
 */

export const EXECUTION_SETTING_KEYS = [
  'workflow_mode',
  'spec_review_model',
  'spec_review_effort',
  'plan_review_model',
  'plan_review_effort',
  'impl_review_model',
  'impl_review_effort',
  'impl_dispatch',
  'impl_runtime',
  'impl_model',
  'impl_effort',
  'impl_speed',
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed'
];

const REVIEW_PAIRS = {
  spec_review_effort: 'spec_review_model',
  plan_review_effort: 'plan_review_model',
  impl_review_effort: 'impl_review_model'
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
  /** @type {Record<string, ExecutionValue>} */
  const rows = {};

  if (!session) {
    for (const key of EXECUTION_SETTING_KEYS.filter(
      (candidate) => !candidate.startsWith('orchestration_')
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
      if (rows.impl_model.value !== null) {
        const runtime =
          rows.impl_runtime.value === 'inherit'
            ? usableString(input.controller_runtime)
            : rows.impl_runtime.value;
        const offered = runtime
          ? runtimeModelTokens(runtime, session, runner_catalog)
          : [];
        if (
          rows.impl_model.value !== 'auto' &&
          offered.length > 0 &&
          !offered.includes(rows.impl_model.value)
        ) {
          rows.impl_model = incompatibleResult(rows.impl_model);
        } else {
          const full_value = implementationModelId(
            rows.impl_model.value,
            runtime,
            session,
            runner_catalog
          );
          rows.impl_model.display = compactModelId(full_value);
          rows.impl_model.full_value = full_value;
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
      if (rows.impl_speed.value === 'default') {
        rows.impl_speed =
          rows.impl_speed.source === 'base'
            ? result('default', 'base', 'default (일반)', 'default', 'default')
            : explicitResult('default', rows.impl_speed.source);
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

  for (const key of [
    'orchestration_model',
    'orchestration_effort',
    'orchestration_speed'
  ]) {
    if (!orchestration) {
      rows[key] = unavailableResult(key, pin, global_values);
      continue;
    }
    const base_key = key.replace('orchestration_', '');
    const base_value = usableString(orchestration[base_key]);
    const chosen = layeredValue(key, pin, global_values, base_value);
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
        compactModelId(full_value),
        full_value,
        chosen.source === 'base' ? 'default' : 'explicit'
      );
      continue;
    }
    if (chosen.value === 'default') {
      rows[key] =
        chosen.source === 'base'
          ? result('default', 'base', 'default (일반)', 'default', 'default')
          : explicitResult('default', chosen.source);
      continue;
    }
    rows[key] = explicitResult(chosen.value, chosen.source);
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
 * @param {{
 *   key: string,
 *   choices: ReadonlyArray<string>,
 *   layer: 'pin'|'global',
 *   pin?: Record<string, any>|null,
 *   global?: Record<string, any>|null,
 *   execution_defaults?: Record<string, any>|null,
 *   runner_catalog?: Record<string, any>|null,
 *   controller_runtime?: string|null
 * }} input
 * @returns {{ unset_label: string, full_value: string|null, unavailable: boolean, disabled: boolean, options: Array<{ value: string, label: string, full_value: string|null }> }}
 */
export function buildOptionView(input) {
  const pin = isRecord(input.pin) ? input.pin : {};
  const global_values = isRecord(input.global) ? input.global : {};
  /** @param {Record<string, any>} layer_values */
  const resolveWith = (layer_values) =>
    resolveExecutionSettings({
      pin: input.layer === 'pin' ? layer_values : pin,
      global: input.layer === 'pin' ? global_values : layer_values,
      execution_defaults: input.execution_defaults,
      runner_catalog: input.runner_catalog,
      controller_runtime: input.controller_runtime
    });

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
