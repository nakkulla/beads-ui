/**
 * Runner/model catalog — the single table mapping a MODEL NAME to the runner
 * that can spawn it, the CLI id it expands to, and the effort vocabulary it
 * accepts (worker-multi-provider-runner §B).
 *
 * The codex model names are injected as a name table (`codex_names`) built
 * from the Codex CLI model list by `codex-model-list.js`; this module stays a
 * pure function of its inputs so the browser bundle can import it.
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
 * Per-million-token unit prices. Every field is optional and there is no
 * builtin default, so an absent field means "unknown", never free — only an
 * explicit `0` is free (preset-compare §1.1).
 *
 * @typedef {{
 *   input?: number,
 *   output?: number,
 *   cache_read?: number,
 *   cache_write?: number
 * }} ModelPrice
 */

/**
 * @typedef {{
 *   id: string,
 *   efforts?: string[],
 *   orchestration_efforts?: string[],
 *   speed_tiers?: string[],
 *   price?: ModelPrice
 * }} CatalogModel
 * @typedef {{
 *   command: string,
 *   models: Record<string, CatalogModel>,
 *   efforts: string[],
 *   default_model?: string
 * }} RunnerCatalogEntry
 * @typedef {{
 *   source: 'seed'|'list',
 *   read_at: number|null,
 *   codex_version: string|null,
 *   families: string[]
 * }} CodexListStatus
 * @typedef {{
 *   runners: Record<string, RunnerCatalogEntry>,
 *   model_index: Record<string, string>,
 *   codex_list?: CodexListStatus
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
 * from provider docs. The codex runner carries no model of its own here: its
 * names come from the Codex CLI model list (`codex-model-list.js`), each one
 * inheriting its family template below.
 *
 * @type {Record<string, RunnerCatalogEntry>}
 */
const BUILTIN = {
  claude: {
    command: 'claude',
    models: {
      opus: { id: 'opus' },
      'opus-4.8': { id: 'claude-opus-4-8' },
      'opus-4.6': { id: 'claude-opus-4-6' },
      sonnet: { id: 'sonnet' },
      haiku: { id: 'haiku' },
      fable: { id: 'fable' }
    },
    efforts: ['low', 'medium', 'high', 'xhigh'],
    default_model: 'opus'
  },
  codex: {
    command: 'codex',
    models: {},
    // Per-model `efforts` win over this runner-wide list.
    efforts: ['minimal', 'low', 'medium', 'high', 'xhigh']
  }
};

/**
 * @typedef {{
 *   efforts: string[],
 *   orchestration_efforts: string[],
 *   speed_tiers: string[]
 * }} CodexFamilyTemplate
 * @typedef {{
 *   aliases: Record<string, string>,
 *   pinned: Record<string, string>
 * }} CodexNameTable
 */

/**
 * Capabilities per Codex family. An alias and every pinned version of the
 * family inherit the same template: the per-model effort lists are curated
 * (the API enum is wider) and `luna`'s `max` is verified as actually supported.
 *
 * @type {Readonly<Record<string, CodexFamilyTemplate>>}
 */
export const CODEX_FAMILY_TEMPLATES = Object.freeze({
  astra: {
    efforts: ['low', 'medium', 'high', 'xhigh', 'max'],
    orchestration_efforts: ['low', 'medium', 'high', 'xhigh', 'max', 'ultra'],
    speed_tiers: ['default', 'fast']
  },
  sol: {
    efforts: ['low', 'medium', 'high', 'xhigh'],
    orchestration_efforts: ['low', 'medium', 'high', 'xhigh', 'max', 'ultra'],
    speed_tiers: ['default', 'fast']
  },
  terra: {
    efforts: ['low', 'medium', 'high', 'xhigh'],
    orchestration_efforts: ['low', 'medium', 'high', 'xhigh', 'max', 'ultra'],
    speed_tiers: ['default', 'fast']
  },
  luna: {
    efforts: ['low', 'medium', 'high', 'xhigh', 'max'],
    orchestration_efforts: ['low', 'medium', 'high', 'xhigh', 'max'],
    speed_tiers: ['default', 'fast']
  }
});

/**
 * Families with a builtin template, in alias order.
 *
 * @type {ReadonlyArray<string>}
 */
export const CODEX_FAMILIES = Object.freeze(
  Object.keys(CODEX_FAMILY_TEMPLATES)
);

/**
 * The Codex names used until the CLI list has been read once: the alias table
 * the pin carried before it moved to CLI resolution (with `sol` at its current
 * `gpt-6.1-sol`) plus the version-pinned names the builtin table already had.
 *
 * @type {Readonly<CodexNameTable>}
 */
export const CODEX_SEED_NAMES = Object.freeze({
  aliases: Object.freeze({
    astra: 'gpt-6-astra',
    sol: 'gpt-6.1-sol',
    terra: 'gpt-5.6-terra',
    luna: 'gpt-6-luna'
  }),
  pinned: Object.freeze({
    'sol-5.6': 'gpt-5.6-sol',
    'luna-5.6': 'gpt-5.6-luna'
  })
});

const CODEX_NAME_RE = /^([a-z]+)(?:-([0-9]+(?:\.[0-9]+)*))?$/;
const CODEX_SLUG_RE = /^gpt-([0-9]+(?:\.[0-9]+)*)-([a-z]+)$/;

/**
 * The family a Codex alias or pinned name belongs to, or null when the name is
 * outside the `<family>` / `<family>-<version>` grammar for `families`.
 *
 * @param {unknown} name
 * @param {ReadonlyArray<string>} [families]
 * @returns {string|null}
 */
export function codexNameFamily(name, families = CODEX_FAMILIES) {
  if (typeof name !== 'string') {
    return null;
  }
  const match = CODEX_NAME_RE.exec(name);
  return match && families.includes(match[1]) ? match[1] : null;
}

/**
 * Whether `name` is a version-pinned Codex name (`<family>-<version>`).
 *
 * @param {unknown} name
 * @param {ReadonlyArray<string>} [families]
 * @returns {boolean}
 */
export function isCodexPinnedName(name, families = CODEX_FAMILIES) {
  if (codexNameFamily(name, families) === null) {
    return false;
  }
  return /** @type {string} */ (name).includes('-');
}

/**
 * The pinned name a Codex model id spells (`gpt-6.1-sol` -> `sol-6.1`), or
 * null when the id is not a `gpt-<version>-<family>` slug.
 *
 * @param {unknown} model_id
 * @returns {string|null}
 */
export function codexPinnedNameForId(model_id) {
  if (typeof model_id !== 'string') {
    return null;
  }
  const match = CODEX_SLUG_RE.exec(model_id);
  return match ? `${match[2]}-${match[1]}` : null;
}

/**
 * Codex catalog models for one name table: aliases first, then pinned names,
 * each carrying a copy of its family template.
 *
 * @param {CodexNameTable} names
 * @returns {Record<string, CatalogModel>}
 */
function codexModels(names) {
  /** @type {Record<string, CatalogModel>} */
  const models = {};
  for (const [name, id] of [
    ...Object.entries(names.aliases),
    ...Object.entries(names.pinned)
  ]) {
    const match = CODEX_NAME_RE.exec(name);
    const family = match ? match[1] : null;
    const template =
      family !== null && Object.hasOwn(CODEX_FAMILY_TEMPLATES, family)
        ? CODEX_FAMILY_TEMPLATES[family]
        : null;
    /** @type {CatalogModel} */
    const model = { id };
    if (template) {
      model.efforts = template.efforts.slice();
      model.orchestration_efforts = template.orchestration_efforts.slice();
      model.speed_tiers = template.speed_tiers.slice();
    }
    models[name] = model;
  }
  return models;
}

/**
 * Fresh copy of the builtin runner table with the codex names filled in.
 *
 * @param {string} runner_name
 * @param {CodexNameTable} codex_names
 * @returns {RunnerCatalogEntry}
 */
function builtinEntry(runner_name, codex_names) {
  const entry = copyEntry(BUILTIN[runner_name]);
  if (runner_name === 'codex') {
    entry.models = codexModels(codex_names);
  }
  return entry;
}

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
    if (model.price) {
      copy.price = { ...model.price };
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
 * Fresh deep copy of the builtin catalog — callers may mutate it freely. The
 * codex runner is filled from `codex_names` (the seed table by default).
 *
 * @param {CodexNameTable} [codex_names]
 * @returns {Record<string, RunnerCatalogEntry>}
 */
export function builtinCatalog(codex_names = CODEX_SEED_NAMES) {
  /** @type {Record<string, RunnerCatalogEntry>} */
  const out = {};
  for (const name of Object.keys(BUILTIN)) {
    out[name] = builtinEntry(name, codex_names);
  }
  return out;
}

/**
 * The unit-price fields a model may declare, in tooltip order.
 *
 * @type {ReadonlyArray<'input'|'output'|'cache_read'|'cache_write'>}
 */
const PRICE_FIELDS = ['input', 'output', 'cache_read', 'cache_write'];

/**
 * Merge a model's `price` table field by field. A field that is not a finite
 * number >= 0 is dropped ALONE, so one typo cannot silently zero the rest; a
 * `price` that is not an object at all leaves the model with no price.
 *
 * @param {CatalogModel} merged
 * @param {string} runner_name
 * @param {string} model_name
 * @param {unknown} raw_price
 * @param {(message: string) => void} warn
 */
function mergePrice(merged, runner_name, model_name, raw_price, warn) {
  if (!isPlainObject(raw_price)) {
    warn(
      `config.toml [runner.${runner_name}.models.${model_name}] price 무시: 객체가 아닙니다.`
    );
    return;
  }
  /** @type {ModelPrice} */
  const price = { ...(merged.price ?? {}) };
  for (const field of PRICE_FIELDS) {
    if (!hasOwn(raw_price, field)) {
      continue;
    }
    const value = raw_price[field];
    if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
      price[field] = value;
    } else {
      warn(
        `config.toml [runner.${runner_name}.models.${model_name}] price.${field} 무시: 0 이상의 유한한 숫자가 아닙니다.`
      );
    }
  }
  merged.price = price;
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
            : {}),
          ...(existing.price ? { price: { ...existing.price } } : {})
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
    if (hasOwn(raw_model, 'price')) {
      mergePrice(merged, runner_name, model_name, raw_model.price, warn);
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
 * Builtin names (including the codex names generated from the CLI list) are
 * registered first so they always win; a config-added name that collides is
 * dropped from its runner. Both passes walk `active` in order, so the result
 * does not depend on config declaration order.
 *
 * @param {Record<string, RunnerCatalogEntry>} runners
 * @param {ReadonlyArray<string>} active
 * @param {Record<string, Set<string>>} builtin_names
 * @param {(message: string) => void} warn
 * @returns {Record<string, string>}
 */
function buildModelIndex(runners, active, builtin_names, warn) {
  /** @type {Record<string, string>} */
  const model_index = {};

  for (const runner_name of active) {
    const entry = hasOwn(runners, runner_name) ? runners[runner_name] : null;
    const builtin = hasOwn(builtin_names, runner_name)
      ? builtin_names[runner_name]
      : null;
    if (!entry || !builtin) {
      continue;
    }
    for (const model_name of Object.keys(entry.models)) {
      if (builtin.has(model_name)) {
        model_index[model_name] = runner_name;
      }
    }
  }

  for (const runner_name of active) {
    const entry = hasOwn(runners, runner_name) ? runners[runner_name] : null;
    if (!entry) {
      continue;
    }
    const builtin = hasOwn(builtin_names, runner_name)
      ? builtin_names[runner_name]
      : null;
    for (const model_name of Object.keys(entry.models)) {
      if (builtin && builtin.has(model_name)) {
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
 *   codex_names?: CodexNameTable,
 *   warn?: (message: string) => void
 * }} [options]
 * @returns {ResolvedCatalog}
 */
export function resolveCatalog(options = {}) {
  const active = options.active ?? ACTIVE_RUNNERS;
  const warn = options.warn ?? console.warn;
  const codex_names = options.codex_names ?? CODEX_SEED_NAMES;

  /** @type {Record<string, RunnerCatalogEntry>} */
  const runners = {};
  /** @type {Record<string, Set<string>>} */
  const builtin_names = {};
  for (const runner_name of active) {
    if (hasOwn(BUILTIN, runner_name)) {
      runners[runner_name] = builtinEntry(runner_name, codex_names);
      builtin_names[runner_name] = new Set(
        Object.keys(runners[runner_name].models)
      );
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

  return {
    runners,
    model_index: buildModelIndex(runners, active, builtin_names, warn)
  };
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
