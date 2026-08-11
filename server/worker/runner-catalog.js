/**
 * Runner/model catalog — the single table mapping a MODEL NAME to the runner
 * that can spawn it, the CLI id it expands to, and the effort vocabulary it
 * accepts (worker-multi-provider-runner §B).
 *
 * Two layers: a builtin default so a zero-config install works, and the
 * `[runner.<name>]` sections of `~/.config/bdui/config.toml` deep-merged on top
 * so a new model is a config edit rather than a release. The config layer is
 * FAIL-QUIET by construction — a mistyped field is dropped with a warning and
 * the builtin value stands, because a malformed config must never take the
 * worker down.
 *
 * `ACTIVE_RUNNERS` is the adapter-existence gate: declaring `[runner.grok]`
 * cannot make grok dispatchable, since no adapter can spawn it. A section for
 * an inactive runner is therefore dropped, not merged.
 *
 * Model names are GLOBALLY unique across active runners, which is what lets the
 * UI use one grouped model selector and lets `policy.js` derive the runner by
 * reverse lookup. Uniqueness is enforced AFTER the merge: builtin names win, and
 * a config-added name that collides is dropped on its own (declaration order
 * cannot change the outcome).
 *
 * This module does not read the config file; `server/config.js` parses it and
 * the raw `[runner]` object is injected as `overrides`.
 */

/**
 * @typedef {{
 *   id: string,
 *   efforts?: string[],
 *   orchestration_efforts?: string[],
 *   speed_tiers?: string[]
 * }} CatalogModel
 * @typedef {{
 *   command: string,
 *   models: Record<string, CatalogModel>,
 *   efforts: string[],
 *   default_model?: string
 * }} RunnerCatalogEntry
 * @typedef {{
 *   runners: Record<string, RunnerCatalogEntry>,
 *   model_index: Record<string, string>
 * }} ResolvedCatalog
 */

/**
 * Runners with a spawn adapter — the single source of the active/inactive
 * judgement. Re-exported by `runner/index.js` as the adapter registry's
 * vocabulary.
 *
 * @type {ReadonlyArray<string>}
 */
export const ACTIVE_RUNNERS = ['claude', 'codex'];

/**
 * Builtin catalog. Values are measured against the installed CLIs, not copied
 * from provider docs: the codex per-model effort lists are curated (the API
 * enum is wider) and `luna`'s `max` is verified as actually supported.
 *
 * @type {Record<string, RunnerCatalogEntry>}
 */
const BUILTIN = {
  claude: {
    command: 'claude',
    models: {
      opus: { id: 'opus' },
      sonnet: { id: 'sonnet' },
      haiku: { id: 'haiku' },
      fable: { id: 'fable' }
    },
    efforts: ['low', 'medium', 'high', 'xhigh'],
    default_model: 'opus'
  },
  codex: {
    command: 'codex',
    models: {
      sol: {
        id: 'gpt-5.6-sol',
        efforts: ['low', 'medium', 'high', 'xhigh'],
        orchestration_efforts: [
          'low',
          'medium',
          'high',
          'xhigh',
          'max',
          'ultra'
        ],
        speed_tiers: ['default', 'fast']
      },
      terra: {
        id: 'gpt-5.6-terra',
        efforts: ['low', 'medium', 'high', 'xhigh'],
        orchestration_efforts: [
          'low',
          'medium',
          'high',
          'xhigh',
          'max',
          'ultra'
        ],
        speed_tiers: ['default', 'fast']
      },
      luna: {
        id: 'gpt-5.6-luna',
        efforts: ['low', 'medium', 'high', 'xhigh', 'max'],
        orchestration_efforts: ['low', 'medium', 'high', 'xhigh', 'max'],
        speed_tiers: ['default', 'fast']
      }
    },
    // Per-model `efforts` win over this runner-wide list.
    efforts: ['minimal', 'low', 'medium', 'high', 'xhigh']
  }
};

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is string[]}
 */
function isStringArray(value) {
  return (
    Array.isArray(value) &&
    value.every((entry) => typeof entry === 'string' && entry.length > 0)
  );
}

/**
 * @param {unknown} value
 * @returns {value is string[]}
 */
function isNonEmptyStringArray(value) {
  return isStringArray(value) && value.length > 0;
}

/**
 * @param {string} runner_name
 * @param {unknown} value
 * @returns {value is string[]}
 */
function isValidSpeedTiers(runner_name, value) {
  const allowed = runner_name === 'codex' ? ['default', 'fast'] : ['default'];
  return (
    isStringArray(value) &&
    value.includes('default') &&
    value.every((tier) => allowed.includes(tier))
  );
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

/**
 * @param {Record<string, unknown>} record
 * @param {string} key
 */
function hasOwn(record, key) {
  return Object.prototype.hasOwnProperty.call(record, key);
}

/**
 * @param {RunnerCatalogEntry} entry
 * @returns {RunnerCatalogEntry}
 */
function copyEntry(entry) {
  /** @type {Record<string, CatalogModel>} */
  const models = {};
  for (const [name, model] of Object.entries(entry.models)) {
    /** @type {CatalogModel} */
    const copy = { id: model.id };
    if (model.efforts) {
      copy.efforts = model.efforts.slice();
    }
    if (model.orchestration_efforts) {
      copy.orchestration_efforts = model.orchestration_efforts.slice();
    }
    if (model.speed_tiers) {
      copy.speed_tiers = model.speed_tiers.slice();
    }
    models[name] = copy;
  }
  /** @type {RunnerCatalogEntry} */
  const copy = {
    command: entry.command,
    models,
    efforts: entry.efforts.slice()
  };
  if (entry.default_model !== undefined) {
    copy.default_model = entry.default_model;
  }
  return copy;
}

/**
 * Fresh deep copy of the builtin catalog — callers may mutate it freely.
 *
 * @returns {Record<string, RunnerCatalogEntry>}
 */
export function builtinCatalog() {
  /** @type {Record<string, RunnerCatalogEntry>} */
  const out = {};
  for (const [name, entry] of Object.entries(BUILTIN)) {
    out[name] = copyEntry(entry);
  }
  return out;
}

/**
 * Merge one `[runner.<name>.models]` section into an entry, field by field so a
 * partial override keeps the builtin's other fields.
 *
 * @param {RunnerCatalogEntry} entry
 * @param {string} runner_name
 * @param {unknown} section
 * @param {(message: string) => void} warn
 */
function mergeModels(entry, runner_name, section, warn) {
  if (!isPlainObject(section)) {
    warn(`config.toml [runner.${runner_name}.models] 무시: 객체가 아닙니다.`);
    return;
  }
  for (const [model_name, raw_model] of Object.entries(section)) {
    if (!isPlainObject(raw_model)) {
      warn(
        `config.toml [runner.${runner_name}.models.${model_name}] 무시: 객체가 아닙니다.`
      );
      continue;
    }
    const existing = hasOwn(entry.models, model_name)
      ? entry.models[model_name]
      : null;
    /** @type {CatalogModel} */
    const merged = existing
      ? /** @type {CatalogModel} */ ({
          id: existing.id,
          ...(existing.efforts ? { efforts: existing.efforts.slice() } : {}),
          ...(existing.orchestration_efforts
            ? {
                orchestration_efforts: existing.orchestration_efforts.slice()
              }
            : {}),
          ...(existing.speed_tiers
            ? { speed_tiers: existing.speed_tiers.slice() }
            : {})
        })
      : { id: model_name };

    if (hasOwn(raw_model, 'id')) {
      if (isNonEmptyString(raw_model.id)) {
        merged.id = raw_model.id;
      } else {
        warn(
          `config.toml [runner.${runner_name}.models.${model_name}] id 무시: 문자열이 아닙니다.`
        );
      }
    }
    if (hasOwn(raw_model, 'efforts')) {
      if (isStringArray(raw_model.efforts)) {
        merged.efforts = raw_model.efforts.slice();
      } else {
        warn(
          `config.toml [runner.${runner_name}.models.${model_name}] efforts 무시: 문자열 배열이 아닙니다.`
        );
      }
    }
    if (hasOwn(raw_model, 'orchestration_efforts')) {
      if (isNonEmptyStringArray(raw_model.orchestration_efforts)) {
        merged.orchestration_efforts = raw_model.orchestration_efforts.slice();
      } else {
        warn(
          `config.toml [runner.${runner_name}.models.${model_name}] orchestration_efforts 무시: 문자열 배열이 아닙니다.`
        );
      }
    }
    if (hasOwn(raw_model, 'speed_tiers')) {
      if (isValidSpeedTiers(runner_name, raw_model.speed_tiers)) {
        merged.speed_tiers = raw_model.speed_tiers.slice();
      } else {
        warn(
          `config.toml [runner.${runner_name}.models.${model_name}] speed_tiers 무시: default를 포함한 지원 speed 문자열 배열이 아닙니다.`
        );
      }
    }
    entry.models[model_name] = merged;
  }
}

/**
 * Merge one `[runner.<name>]` section into the resolved runner map.
 *
 * @param {Record<string, RunnerCatalogEntry>} runners
 * @param {string} runner_name
 * @param {Record<string, unknown>} section
 * @param {(message: string) => void} warn
 */
function mergeRunnerSection(runners, runner_name, section, warn) {
  const entry = hasOwn(runners, runner_name)
    ? runners[runner_name]
    : { command: runner_name, models: {}, efforts: [] };
  runners[runner_name] = entry;

  if (hasOwn(section, 'command')) {
    if (isNonEmptyString(section.command)) {
      entry.command = section.command;
    } else {
      warn(
        `config.toml [runner.${runner_name}] command 무시: 문자열이 아닙니다.`
      );
    }
  }
  if (hasOwn(section, 'default_model')) {
    if (isNonEmptyString(section.default_model)) {
      entry.default_model = section.default_model;
    } else {
      warn(
        `config.toml [runner.${runner_name}] default_model 무시: 문자열이 아닙니다.`
      );
    }
  }
  if (hasOwn(section, 'efforts')) {
    if (isStringArray(section.efforts)) {
      entry.efforts = section.efforts.slice();
    } else {
      warn(
        `config.toml [runner.${runner_name}] efforts 무시: 문자열 배열이 아닙니다.`
      );
    }
  }
  if (hasOwn(section, 'models')) {
    mergeModels(entry, runner_name, section.models, warn);
  }
}

/**
 * Build the model → runner index, enforcing global model-name uniqueness.
 * Builtin names are registered first so they always win; a config-added name
 * that collides is dropped from its runner. Both passes walk `active` in order,
 * so the result does not depend on config declaration order.
 *
 * @param {Record<string, RunnerCatalogEntry>} runners
 * @param {ReadonlyArray<string>} active
 * @param {(message: string) => void} warn
 * @returns {Record<string, string>}
 */
function buildModelIndex(runners, active, warn) {
  /** @type {Record<string, string>} */
  const model_index = {};

  for (const runner_name of active) {
    const entry = hasOwn(runners, runner_name) ? runners[runner_name] : null;
    const builtin = hasOwn(BUILTIN, runner_name) ? BUILTIN[runner_name] : null;
    if (!entry || !builtin) {
      continue;
    }
    for (const model_name of Object.keys(entry.models)) {
      if (hasOwn(builtin.models, model_name)) {
        model_index[model_name] = runner_name;
      }
    }
  }

  for (const runner_name of active) {
    const entry = hasOwn(runners, runner_name) ? runners[runner_name] : null;
    if (!entry) {
      continue;
    }
    const builtin = hasOwn(BUILTIN, runner_name) ? BUILTIN[runner_name] : null;
    for (const model_name of Object.keys(entry.models)) {
      if (builtin && hasOwn(builtin.models, model_name)) {
        continue;
      }
      if (hasOwn(model_index, model_name)) {
        warn(
          `config.toml [runner.${runner_name}.models.${model_name}] 무시: 모델명이 ${model_index[model_name]} 러너와 충돌합니다.`
        );
        delete entry.models[model_name];
        continue;
      }
      model_index[model_name] = runner_name;
    }
  }

  return model_index;
}

/**
 * Resolve the effective catalog: builtin defaults, config overrides deep-merged
 * on top, inactive runners excluded, model names deduplicated.
 *
 * @param {{
 *   overrides?: unknown,
 *   active?: ReadonlyArray<string>,
 *   warn?: (message: string) => void
 * }} [options]
 * @returns {ResolvedCatalog}
 */
export function resolveCatalog(options = {}) {
  const active = options.active ?? ACTIVE_RUNNERS;
  const warn = options.warn ?? console.warn;

  /** @type {Record<string, RunnerCatalogEntry>} */
  const runners = {};
  for (const runner_name of active) {
    if (hasOwn(BUILTIN, runner_name)) {
      runners[runner_name] = copyEntry(BUILTIN[runner_name]);
    }
  }

  const overrides = options.overrides;
  if (overrides !== undefined && overrides !== null) {
    if (!isPlainObject(overrides)) {
      warn('config.toml [runner] 무시: 객체가 아닙니다.');
    } else {
      for (const [runner_name, section] of Object.entries(overrides)) {
        if (!isPlainObject(section)) {
          warn(`config.toml [runner.${runner_name}] 무시: 객체가 아닙니다.`);
          continue;
        }
        if (!active.includes(runner_name)) {
          warn(
            `config.toml [runner.${runner_name}] 무시: 어댑터가 없는 러너입니다.`
          );
          continue;
        }
        mergeRunnerSection(runners, runner_name, section, warn);
      }
    }
  }

  return { runners, model_index: buildModelIndex(runners, active, warn) };
}

/**
 * Runner that owns `model`, or null when the catalog does not know it.
 *
 * @param {ResolvedCatalog} catalog
 * @param {unknown} model
 * @returns {string | null}
 */
export function modelRunner(catalog, model) {
  if (typeof model !== 'string' || !hasOwn(catalog.model_index, model)) {
    return null;
  }
  return catalog.model_index[model];
}

/**
 * Every effort level ANY model in the catalog accepts, first-seen order.
 *
 * This is the vocabulary for the settings that name an effort WITHOUT pinning
 * the model it applies to — `impl_effort` is stored for a delegation leaf the
 * session picks later, so validating it against one model would reject a value
 * that is legal for the leaf actually chosen. A per-model check belongs to
 * `modelEfforts` and is used wherever the model IS known.
 *
 * @param {ResolvedCatalog} catalog
 * @returns {string[]}
 */
export function catalogEfforts(catalog) {
  /** @type {string[]} */
  const out = [];
  for (const entry of Object.values(catalog.runners)) {
    for (const model of Object.values(entry.models)) {
      for (const effort of model.efforts ?? entry.efforts) {
        if (!out.includes(effort)) {
          out.push(effort);
        }
      }
    }
  }
  return out;
}

/**
 * Every outer orchestration effort accepted by at least one catalog model,
 * first-seen order. Models that do not advertise a distinct outer vocabulary
 * retain their legacy implementation effort list.
 *
 * @param {ResolvedCatalog} catalog
 * @returns {string[]}
 */
export function catalogOrchestrationEfforts(catalog) {
  /** @type {string[]} */
  const out = [];
  for (const model of Object.keys(catalog.model_index)) {
    for (const effort of modelOrchestrationEfforts(catalog, model)) {
      if (!out.includes(effort)) {
        out.push(effort);
      }
    }
  }
  return out;
}

/**
 * Effort vocabulary accepted by `model`: its own list when it pins one, else
 * the owning runner's. An unknown model has no valid effort at all.
 *
 * @param {ResolvedCatalog} catalog
 * @param {unknown} model
 * @returns {string[]}
 */
export function modelEfforts(catalog, model) {
  const runner_name = modelRunner(catalog, model);
  if (!runner_name) {
    return [];
  }
  const entry = catalog.runners[runner_name];
  const model_entry = entry.models[/** @type {string} */ (model)];
  const efforts = model_entry.efforts ?? entry.efforts;
  return efforts.slice();
}

/**
 * Outer effort vocabulary accepted by `model`. A model without an explicit
 * outer capability remains backward-compatible with its implementation list.
 *
 * @param {ResolvedCatalog} catalog
 * @param {unknown} model
 * @returns {string[]}
 */
export function modelOrchestrationEfforts(catalog, model) {
  const runner_name = modelRunner(catalog, model);
  if (!runner_name) {
    return [];
  }
  const entry = catalog.runners[runner_name];
  const model_entry = entry.models[/** @type {string} */ (model)];
  const efforts =
    model_entry.orchestration_efforts ?? modelEfforts(catalog, model);
  return efforts.slice();
}

/**
 * Every speed tier accepted by at least one catalog model, first-seen order.
 *
 * @param {ResolvedCatalog} catalog
 * @returns {string[]}
 */
export function catalogSpeedTiers(catalog) {
  /** @type {string[]} */
  const out = [];
  for (const model of Object.keys(catalog.model_index)) {
    for (const tier of modelSpeedTiers(catalog, model)) {
      if (!out.includes(tier)) {
        out.push(tier);
      }
    }
  }
  return out;
}

/**
 * Speed tiers accepted by `model`. Absent catalog capability is deliberately
 * conservative: legacy and config-added models retain Standard only.
 *
 * @param {ResolvedCatalog} catalog
 * @param {unknown} model
 * @returns {string[]}
 */
export function modelSpeedTiers(catalog, model) {
  const runner_name = modelRunner(catalog, model);
  if (!runner_name) {
    return [];
  }
  const model_entry =
    catalog.runners[runner_name].models[/** @type {string} */ (model)];
  return (model_entry.speed_tiers ?? ['default']).slice();
}
