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
 * The `워커 <name> · qf <name>` line, or null when neither part stands. A held
 * mutation reply wins over the row for a field it carries.
 *
 * @param {Record<string, any>|null|undefined} row
 * @param {Record<string, any>|null|undefined} adopted
 * @param {Array<{ id: string, name: string }>|null|undefined} presets
 * @returns {string|null}
 */
export function appliedPresetLine(row, adopted, presets) {
  const list = Array.isArray(presets) ? presets : [];
  const parts = PRESET_FIELDS.map(({ field, label }) => {
    const source =
      adopted && typeof adopted === 'object' && Object.hasOwn(adopted, field)
        ? adopted
        : row || {};
    const name = presetName(source, field, list);
    return name === null ? '' : `${label} ${name}`;
  }).filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : null;
}
