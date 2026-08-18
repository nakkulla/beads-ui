/**
 * The SINGLE rule for "which efforts does this model accept" (UI-yqw9 §2).
 *
 * The catalog carries a runner-wide `efforts` list and an optional per-model
 * one, and the two disagree on purpose: codex's `sol`/`terra` accept
 * low…xhigh while the runner list still offers `minimal`. Reading only the
 * runner list therefore admits combinations the CLI refuses.
 *
 * This module is imported by BOTH the server's settings/start validation and
 * the dialog's effort dropdown, so the value the UI offers and the value the
 * server accepts cannot drift. It lives under `app/` because the browser
 * cannot import from `server/` — it is pure, side-effect free, and imports
 * nothing.
 *
 * The catalog shape is stated loosely on purpose: the server passes the
 * resolved catalog and the browser passes the copy riding the queue snapshot,
 * and both carry fields (`id`, `command`, speed tiers) this rule never reads.
 *
 * @typedef {{ efforts?: string[], [key: string]: any }} EffortModel
 * @typedef {{ models?: Record<string, EffortModel>, efforts?: string[], [key: string]: any }} EffortRunner
 * @typedef {{ runners?: Record<string, EffortRunner>, [key: string]: any }} EffortCatalog
 */

/**
 * Effort vocabulary the given runner+model pair accepts: the model's own list
 * when it declares one, else the runner's. A runner or model the catalog does
 * not know has NO valid effort — an empty list, never a permissive fallback.
 *
 * @param {EffortCatalog|null|undefined} catalog
 * @param {unknown} runner
 * @param {unknown} model
 * @returns {string[]}
 */
export function analyzerEfforts(catalog, runner, model) {
  if (typeof runner !== 'string' || typeof model !== 'string') {
    return [];
  }
  const runners = catalog?.runners;
  if (!runners || !Object.hasOwn(runners, runner)) {
    return [];
  }
  const entry = runners[runner];
  const models = entry?.models;
  if (!models || !Object.hasOwn(models, model)) {
    return [];
  }
  const model_efforts = models[model]?.efforts;
  if (Array.isArray(model_efforts)) {
    return model_efforts.slice();
  }
  return Array.isArray(entry.efforts) ? entry.efforts.slice() : [];
}

/**
 * Whether `effort` is one of the values {@link analyzerEfforts} allows for the
 * pair. Membership in the catalog is part of the answer: an unknown runner or
 * model is invalid for every effort.
 *
 * @param {EffortCatalog|null|undefined} catalog
 * @param {{ runner: unknown, model: unknown, effort: unknown }} selection
 * @returns {boolean}
 */
export function isAnalyzerEffortValid(catalog, selection) {
  if (typeof selection.effort !== 'string') {
    return false;
  }
  return analyzerEfforts(catalog, selection.runner, selection.model).includes(
    selection.effort
  );
}
