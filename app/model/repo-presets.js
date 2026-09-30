/**
 * The applied-preset summary of one repo (UI-dbn6 P1-r2 item 14): the worker
 * (general) and quick-fix apply records the queue keeps
 * (`applied_exec_preset`·`applied_quick_fix_preset`, carried on
 * `workspaces_state` rows), named through the impl-presets snapshot. A field
 * the row does not carry, or an id no preset answers to, draws nothing
 * (fail-quiet); a field present and null is `프리셋 없음`.
 */

/** @type {ReadonlyArray<{ field: string, label: string }>} */
const PRESET_FIELDS = Object.freeze([
  { field: 'applied_exec_preset', label: '워커' },
  { field: 'applied_quick_fix_preset', label: 'qf' }
]);

/**
 * @param {Record<string, any>} source - A row or an adopted queue.
 * @param {string} field
 * @param {Array<{ id: string, name: string }>} presets
 * @returns {string|null}
 */
function presetName(source, field, presets) {
  if (!source || !Object.hasOwn(source, field)) {
    return null;
  }
  const record = source[field];
  if (record === null) {
    return '프리셋 없음';
  }
  const id = record && typeof record === 'object' ? record.id : null;
  const preset =
    typeof id === 'string' ? presets.find((entry) => entry.id === id) : null;
  return preset && typeof preset.name === 'string' && preset.name.length > 0
    ? preset.name
    : null;
}

/**
 * One applied preset's name for the repo strip (`applied_exec_preset` is the
 * general preset, `applied_quick_fix_preset` the quick-fix one): the name, or
 * `프리셋 없음` for a present null field, or null when the field is absent or
 * names no known preset (fail-quiet). A held mutation reply wins over the row
 * for a field it carries.
 *
 * @param {Record<string, any>|null|undefined} row
 * @param {Record<string, any>|null|undefined} adopted
 * @param {Array<{ id: string, name: string }>|null|undefined} presets
 * @param {'applied_exec_preset'|'applied_quick_fix_preset'} field
 * @returns {string|null}
 */
export function appliedPresetName(row, adopted, presets, field) {
  const source =
    adopted && typeof adopted === 'object' && Object.hasOwn(adopted, field)
      ? adopted
      : row || {};
  return presetName(source, field, Array.isArray(presets) ? presets : []);
}

/**
 * The `워커 <name> · qf <name>` line, or null when neither part stands. A held
 * mutation reply wins over the row for a field it carries.
 *
 * @param {Record<string, any>|null|undefined} row
 * @param {Record<string, any>|null|undefined} adopted
 * @param {Array<{ id: string, name: string }>|null|undefined} presets
 * @returns {string|null}
 */
export function appliedPresetLine(row, adopted, presets) {
  const parts = PRESET_FIELDS.map(({ field, label }) => {
    const name = appliedPresetName(
      row,
      adopted,
      presets,
      /** @type {'applied_exec_preset'|'applied_quick_fix_preset'} */ (field)
    );
    return name === null ? '' : `${label} ${name}`;
  }).filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : null;
}
