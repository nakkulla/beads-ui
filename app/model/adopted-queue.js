/**
 * Adopted queue snapshots over monitor rows (UI-nu43 §4.1).
 *
 * A mutation response carries an authoritative queue that is ahead of the
 * aggregate snapshot. The monitor deck and the settings dialog's bulk pane both
 * hold such snapshots per repo, read rows through {@link mergeQueue}, and drop a
 * held snapshot once the row has caught up ({@link pruneAdopted}).
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Lay an adopted queue over its row. mutation 응답이 실어 온 권위 있는 queue
 * 스냅샷은 집계 스냅샷보다 앞서므로 위에 덮되, `session_defaults`처럼 집계에만
 * 있는 필드는 행에서 그대로 가져온다.
 *
 * @param {any} row
 * @param {any} adopted
 * @returns {any}
 */
export function mergeQueue(row, adopted) {
  if (!isRecord(adopted)) {
    return row;
  }
  const merged = { ...row };
  for (const [key, value] of Object.entries(adopted)) {
    if (value !== undefined) {
      merged[key] = value;
    }
  }
  return merged;
}

/**
 * Drop every adopted queue the aggregate rows have caught up with — 새
 * 스냅샷이 권위다.
 *
 * @param {Map<string, any>} adopted
 * @param {Array<Record<string, any>>} rows
 */
export function pruneAdopted(adopted, rows) {
  for (const row of rows) {
    const held = adopted.get(row.root_dir);
    if (
      held &&
      typeof held.revision === 'number' &&
      typeof row.revision === 'number' &&
      row.revision >= held.revision
    ) {
      adopted.delete(row.root_dir);
    }
  }
}
