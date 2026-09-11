/**
 * Leg pricing — the one place a token record becomes a dollar figure
 * (preset-compare §1.2).
 *
 * Codex reports no cost at all, so an attempt that delegated to it used to lose
 * its whole price. Here a leg is priced from the catalog's per-model unit prices
 * instead, and the CLI-reported number is preferred whenever one exists.
 *
 * Nothing is stored: the price is derived at display time from the token
 * breakdown the record already carries, so editing a unit price re-prices past
 * attempts too. There is no builtin default price — a unit price is an external
 * fact that goes stale, so an unknown model is `none` rather than a guess.
 *
 * @import { ResolvedCatalog, ModelPrice } from './runner-catalog.js'
 */
import { modelRunner } from './runner-catalog.js';

/**
 * @typedef {'reported'|'computed'|'estimated'|'none'} PriceBasis
 */

/**
 * `usd` is null exactly when `basis` is `none`.
 *
 * @typedef {{ usd: number|null, basis: PriceBasis }} LegPrice
 */

/**
 * The token field of a usage record paired with the unit-price field that
 * multiplies it. `reasoning_output_tokens` is deliberately absent: Codex counts
 * it inside `output_tokens`, so pricing it again would double-charge.
 *
 * @type {ReadonlyArray<[string, keyof ModelPrice]>}
 */
const PRICED_FIELDS = [
  ['input_tokens', 'input'],
  ['output_tokens', 'output'],
  ['cache_read_input_tokens', 'cache_read'],
  ['cache_creation_input_tokens', 'cache_write']
];

/** Unit prices are quoted per million tokens. */
const TOKENS_PER_UNIT = 1_000_000;

/** @type {LegPrice} */
const NO_PRICE = { usd: null, basis: 'none' };

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is number}
 */
function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * The `price` table of `model`, matched by catalog name first and by CLI `id`
 * second. An attempt records whichever string its dispatcher used, so both
 * spellings have to resolve to the same table.
 *
 * @param {ResolvedCatalog|null|undefined} catalog
 * @param {unknown} model
 * @returns {ModelPrice|null}
 */
export function modelPrice(catalog, model) {
  if (
    !catalog ||
    typeof model !== 'string' ||
    model.length === 0 ||
    !isPlainObject(catalog.runners)
  ) {
    return null;
  }
  const entries = Object.values(catalog.runners).filter((entry) =>
    isPlainObject(entry?.models)
  );
  for (const entry of entries) {
    const by_name = entry.models[model];
    if (isPlainObject(by_name)) {
      return isPlainObject(by_name.price)
        ? /** @type {ModelPrice} */ (by_name.price)
        : null;
    }
  }
  for (const entry of entries) {
    for (const candidate of Object.values(entry.models)) {
      if (isPlainObject(candidate) && candidate.id === model) {
        return isPlainObject(candidate.price)
          ? /** @type {ModelPrice} */ (candidate.price)
          : null;
      }
    }
  }
  return null;
}

/**
 * Provider for a priced model name or CLI id.
 *
 * @param {ResolvedCatalog|null|undefined} catalog
 * @param {unknown} model
 */
function pricingRunner(catalog, model) {
  if (!catalog || typeof model !== 'string') {
    return null;
  }
  const by_name = modelRunner(catalog, model);
  if (by_name) {
    return by_name;
  }
  for (const [runner, entry] of Object.entries(catalog.runners)) {
    for (const candidate of Object.values(entry.models)) {
      if (candidate.id === model) {
        return runner;
      }
    }
  }
  return null;
}

/**
 * Price one usage record.
 *
 * Rules, in order (§1.2): a CLI-reported `total_cost_usd` wins; otherwise the
 * breakdown is multiplied by the model's unit prices; a record that carries
 * only `total_tokens` is charged at the input rate and marked `estimated`.
 *
 * A breakdown whose non-zero token kind has no unit price prices the whole leg
 * as `none` — a partial sum that looks like a complete `computed` figure would
 * understate the cost silently. Free is an explicit `0`, never an absent field.
 *
 * @param {Record<string, any>|null|undefined} record
 * @param {unknown} model
 * @param {ResolvedCatalog|null|undefined} catalog
 * @returns {LegPrice}
 */
export function priceUsage(record, model, catalog) {
  if (!isPlainObject(record)) {
    return NO_PRICE;
  }
  if (isFiniteNumber(record.total_cost_usd) && record.total_cost_usd >= 0) {
    return { usd: record.total_cost_usd, basis: 'reported' };
  }
  const price = modelPrice(catalog, model);
  if (!price) {
    return NO_PRICE;
  }
  const has_breakdown = PRICED_FIELDS.some(
    ([field]) => record[field] !== undefined
  );
  if (has_breakdown) {
    const provider = pricingRunner(catalog, model);
    const input = isFiniteNumber(record.input_tokens) ? record.input_tokens : 0;
    const cache_read = isFiniteNumber(record.cache_read_input_tokens)
      ? record.cache_read_input_tokens
      : 0;
    const cache_write = isFiniteNumber(record.cache_creation_input_tokens)
      ? record.cache_creation_input_tokens
      : 0;
    const invalid = PRICED_FIELDS.some(
      ([field]) =>
        record[field] !== undefined &&
        (!isFiniteNumber(record[field]) || record[field] < 0)
    );
    if (
      invalid ||
      (provider === 'codex' && (cache_read > input || cache_write > 0))
    ) {
      return NO_PRICE;
    }
    let usd = 0;
    for (const [field, unit_key] of PRICED_FIELDS) {
      let tokens = isFiniteNumber(record[field]) ? record[field] : 0;
      // Codex reports cached input as a subset of input. Charge the remainder
      // at the normal input rate and the cached subset once at cache-read rate.
      if (provider === 'codex' && field === 'input_tokens') {
        tokens -= cache_read;
      }
      if (tokens <= 0) {
        continue;
      }
      const unit = price[unit_key];
      if (!isFiniteNumber(unit)) {
        return NO_PRICE;
      }
      usd += (tokens * unit) / TOKENS_PER_UNIT;
    }
    return { usd, basis: 'computed' };
  }
  if (Object.prototype.hasOwnProperty.call(record, 'total_tokens')) {
    if (!isFiniteNumber(record.total_tokens) || record.total_tokens < 0) {
      return NO_PRICE;
    }
    if (!isFiniteNumber(price.input)) {
      return NO_PRICE;
    }
    return {
      usd: (record.total_tokens * price.input) / TOKENS_PER_UNIT,
      basis: 'estimated'
    };
  }
  return NO_PRICE;
}
