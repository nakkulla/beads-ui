/**
 * Pure planning for the one-shot execution-preset replacement (UI-s8qn §3.7,
 * §4.2). The live 13 presets of revision 55 are replaced by the five targets
 * below; everything the plan does not recognise is PRESERVED rather than
 * deleted, so a preset someone created between two runs survives.
 *
 * The module holds no I/O — the ws client in `scripts/exec-presets-replace.js`
 * feeds it a snapshot and executes the returned plan under the preset CAS.
 */

/**
 * The five target presets (spec §3.7). Every entry carries exactly the same 11
 * keys: the three review pairs on `astra`/`xhigh`, the worker delegation on
 * `auto`/`auto`, plus its own orchestration pair and `impl_runtime`.
 * `workflow_mode` is deliberately absent — a preset must not pin the route.
 *
 * @type {ReadonlyArray<{ name: string, settings: Readonly<Record<string, string>> }>}
 */
export const TARGET_PRESETS = Object.freeze([
  Object.freeze({
    name: '최고효율',
    settings: Object.freeze({
      orchestration_model: 'opus',
      orchestration_effort: 'high',
      spec_review_model: 'astra',
      spec_review_effort: 'xhigh',
      plan_review_model: 'astra',
      plan_review_effort: 'xhigh',
      impl_review_model: 'astra',
      impl_review_effort: 'xhigh',
      impl_runtime: 'codex',
      impl_model: 'auto',
      impl_effort: 'auto'
    })
  }),
  Object.freeze({
    name: '완성도',
    settings: Object.freeze({
      orchestration_model: 'fable',
      orchestration_effort: 'high',
      spec_review_model: 'astra',
      spec_review_effort: 'xhigh',
      plan_review_model: 'astra',
      plan_review_effort: 'xhigh',
      impl_review_model: 'astra',
      impl_review_effort: 'xhigh',
      impl_runtime: 'auto',
      impl_model: 'auto',
      impl_effort: 'auto'
    })
  }),
  Object.freeze({
    name: '가성비',
    settings: Object.freeze({
      orchestration_model: 'sol',
      orchestration_effort: 'medium',
      spec_review_model: 'astra',
      spec_review_effort: 'xhigh',
      plan_review_model: 'astra',
      plan_review_effort: 'xhigh',
      impl_review_model: 'astra',
      impl_review_effort: 'xhigh',
      impl_runtime: 'codex',
      impl_model: 'auto',
      impl_effort: 'auto'
    })
  }),
  Object.freeze({
    name: '코덱스 메인',
    settings: Object.freeze({
      orchestration_model: 'astra',
      orchestration_effort: 'high',
      spec_review_model: 'astra',
      spec_review_effort: 'xhigh',
      plan_review_model: 'astra',
      plan_review_effort: 'xhigh',
      impl_review_model: 'astra',
      impl_review_effort: 'xhigh',
      impl_runtime: 'auto',
      impl_model: 'auto',
      impl_effort: 'auto'
    })
  }),
  Object.freeze({
    name: '클로드 메인',
    settings: Object.freeze({
      orchestration_model: 'opus',
      orchestration_effort: 'high',
      spec_review_model: 'astra',
      spec_review_effort: 'xhigh',
      plan_review_model: 'astra',
      plan_review_effort: 'xhigh',
      impl_review_model: 'astra',
      impl_review_effort: 'xhigh',
      impl_runtime: 'claude',
      impl_model: 'auto',
      impl_effort: 'auto'
    })
  })
]);

/**
 * The name of the target whose profile also becomes the workspace kv and queue
 * default (spec §3.8). Exported so the client script never re-types it.
 *
 * @type {string}
 */
export const KV_DEFAULT_PRESET_NAME = '최고효율';

/**
 * The 13 preset ids observed live at revision 55 (spec §4.2). Only these are
 * deleted; an id outside the list is preserved, which is what makes a rerun
 * after a partial run safe.
 *
 * @type {ReadonlyArray<string>}
 */
export const LEGACY_PRESET_IDS = Object.freeze([
  '887cd92c-f118-4a5e-a944-bcfbac7e1e05',
  'ed8ece50-42c4-4ab4-8780-6e2d1cf3f6e7',
  '36696046-adb5-4061-930a-89e4b9e75643',
  '02126255-1ff1-416c-9b36-124bddfaa493',
  '0f1971a9-7dd0-4771-9711-4ed42df7f965',
  'b9f3cb25-1b52-48ae-9551-dc42e9d7e803',
  '24ba76f3-564b-4d32-8506-9196c5496b1b',
  '6f138a94-3194-4f87-a274-3c553b1fe70e',
  '5caecc42-80bf-41d6-9908-5f97bbfa8b47',
  'd3472b95-2e12-4d14-9e46-177a6acb6560',
  '162f3e7f-4db2-46c4-b27c-32c38293268f',
  'c184c980-cc83-48f5-a0c3-2b5cafe860b3',
  'bb1fc774-5535-437b-bfd9-de6fba071481'
]);

/**
 * Compare two sparse settings objects for exact equality — same key set, same
 * string values. A preset that merely shares a target's name is NOT a match.
 *
 * @param {Record<string, unknown>} left - One settings object.
 * @param {Record<string, unknown>} right - The other settings object.
 * @returns {boolean}
 */
function settingsEqual(left, right) {
  const left_keys = Object.keys(left);
  const right_keys = Object.keys(right);
  if (left_keys.length !== right_keys.length) {
    return false;
  }
  for (const key of left_keys) {
    if (!Object.hasOwn(right, key) || left[key] !== right[key]) {
      return false;
    }
  }
  return true;
}

/**
 * @typedef {{ id: string, name: string, settings: Record<string, unknown> }} SnapshotPreset
 * @typedef {{ name: string, settings: Readonly<Record<string, string>> }} TargetPreset
 * @typedef {{
 *   keep: Array<{ id: string, name: string }>,
 *   delete: Array<{ id: string, name: string }>,
 *   preserve: Array<{ id: string, name: string, reason: string }>,
 *   create: TargetPreset[]
 * }} ReplacementPlan
 */

/**
 * Classify every preset of a snapshot against the targets (spec §4.2).
 *
 * A snapshot preset is `keep` when it matches a not-yet-matched target by name
 * AND settings, `delete` when its id is a known legacy id, and `preserve`
 * otherwise — including a same-name-different-settings entry, which is a value
 * this job did not write and must not destroy. `create` is the targets left
 * without a keeper, so a snapshot already holding the five yields an empty plan.
 *
 * @param {{ revision: number, presets: SnapshotPreset[] }} snapshot - The live
 * preset snapshot to plan against.
 * @param {ReadonlyArray<TargetPreset>} targets - Desired presets.
 * @param {ReadonlyArray<string>} legacy_ids - Ids eligible for deletion.
 * @returns {ReplacementPlan}
 */
export function planPresetReplacement(snapshot, targets, legacy_ids) {
  const legacy = new Set(legacy_ids);
  const presets = Array.isArray(snapshot.presets) ? snapshot.presets : [];
  /** @type {Set<string>} */
  const matched_names = new Set();
  /** @type {ReplacementPlan} */
  const plan = { keep: [], delete: [], preserve: [], create: [] };

  for (const preset of presets) {
    const target = targets.find(
      (candidate) =>
        candidate.name === preset.name &&
        !matched_names.has(candidate.name) &&
        settingsEqual(candidate.settings, preset.settings)
    );
    if (target) {
      matched_names.add(target.name);
      plan.keep.push({ id: preset.id, name: preset.name });
      continue;
    }
    if (legacy.has(preset.id)) {
      plan.delete.push({ id: preset.id, name: preset.name });
      continue;
    }
    plan.preserve.push({
      id: preset.id,
      name: preset.name,
      reason: targets.some((candidate) => candidate.name === preset.name)
        ? 'name_matches_settings_differ'
        : 'unknown_preset'
    });
  }

  for (const target of targets) {
    if (!matched_names.has(target.name)) {
      plan.create.push(target);
    }
  }
  return plan;
}
