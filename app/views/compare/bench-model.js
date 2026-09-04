/**
 * Experiment view model (preset-compare §4.7).
 *
 * One bench run is projected into the SAME six columns as §3, grouped by
 * preset, by joining the run manifest's cells to the comparison rows the
 * `get-compare` snapshot already carries. The join key is the cell's
 * `attempt_id`, which `bench-run-list` projects from that clone's attempt
 * records — so nothing here is a second result ledger, it is the same two
 * server projections put side by side.
 *
 * Why the aggregation is not `server/worker/compare-projection.js`'s: that
 * module opens `node:fs` at import time and the browser bundle cannot resolve
 * it, and its `passCaret` groups by BEAD, which for an experiment is always one
 * attempt per clone bead (k=1) and therefore always null. An experiment's
 * `pass^k` is over the k CLONES of one (source, preset) pair, which is what
 * §4.7 asks for: "k번 모두 성공한 비율".
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {number|null}
 */
function num(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function usableString(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/** Cell statuses the 실패 column names, matching the comparison table's set. */
const FAILED_STATUSES = new Set(['failed', 'orphaned']);

/**
 * The `3/9` progress of one run (§4.7). Fail-quiet: a manifest without the
 * projected counts reports nothing rather than a wrong fraction.
 *
 * @param {unknown} run
 * @returns {{ terminal: number, total: number, text: string }|null}
 */
export function benchProgress(run) {
  if (!isRecord(run)) {
    return null;
  }
  const total = num(run.cell_count);
  const terminal = num(run.terminal_count);
  if (total === null || terminal === null) {
    return null;
  }
  return { terminal, total, text: `${terminal}/${total}` };
}

/**
 * The median and its sample size, over a list that keeps one entry per CELL so
 * the `n=3/9` note counts the cells that had nothing to contribute.
 *
 * @param {Array<number|null>} values
 * @returns {{ median: number|null, sample: number, total: number }}
 */
export function medianStat(values) {
  const list = values
    .map((value) => num(value))
    .filter((value) => value !== null)
    .sort(
      (left, right) =>
        /** @type {number} */ (left) - /** @type {number} */ (right)
    );
  const total = values.length;
  if (list.length === 0) {
    return { median: null, sample: 0, total };
  }
  const middle = Math.floor(list.length / 2);
  const median =
    list.length % 2 === 1
      ? /** @type {number} */ (list[middle])
      : /** @type {number} */ (
          list[middle - 1] + /** @type {number} */ (list[middle])
        ) / 2;
  return { median, sample: list.length, total };
}

/**
 * `pass^k` over one preset's clones: the share of source beads whose k judged
 * clones ALL passed. An experiment names one source, so the value is 1 or 0 —
 * which is the honest answer to "did every repeat pass", and is exactly the
 * tau-bench reading §4.7 cites.
 *
 * `k` is the number of JUDGED cells: an unverified cell is 미상 and may not be
 * counted as either a pass or a failure (§3.2). Below two judged cells there is
 * no `pass^k` to speak of.
 *
 * @param {Array<'pass'|'fail'|null>} verdicts
 * @returns {{ k: number, value: number }|null}
 */
export function benchPassCaret(verdicts) {
  const judged = verdicts.filter(
    (verdict) => verdict === 'pass' || verdict === 'fail'
  );
  if (judged.length < 2) {
    return null;
  }
  return {
    k: judged.length,
    value: judged.every((verdict) => verdict === 'pass') ? 1 : 0
  };
}

/**
 * The verify verdict of one cell. The comparison row is preferred because it
 * is the same reading the §3 table shows; the manifest's own `bench_verify` is
 * the fallback for a cell whose attempt the snapshot did not carry.
 *
 * @param {Record<string, any>} cell
 * @param {Record<string, any>|null} row
 * @returns {'pass'|'fail'|null}
 */
function cellVerify(cell, row) {
  if (row && (row.verify === 'pass' || row.verify === 'fail')) {
    return row.verify;
  }
  const verify = isRecord(cell.bench_verify) ? cell.bench_verify : null;
  if (verify === null) {
    return null;
  }
  return verify.ok === true ? 'pass' : 'fail';
}

/**
 * Join one run's cells to comparison rows and group them by preset (§4.7).
 *
 * Every group carries the field names the comparison table's group renderer
 * already reads, so the experiment table is the same renderer with a different
 * grouping key — no second set of column rules.
 *
 * @param {unknown} run
 * @param {Array<Record<string, any>>} rows
 * @returns {Array<Record<string, any>>}
 */
export function benchPresetGroups(run, rows) {
  if (!isRecord(run)) {
    return [];
  }
  /** @type {Map<string, Record<string, any>>} */
  const by_attempt = new Map();
  for (const row of Array.isArray(rows) ? rows : []) {
    const attempt_id = usableString(row?.attempt_id);
    if (attempt_id !== null) {
      by_attempt.set(attempt_id, row);
    }
  }
  const cells = Array.isArray(run.cells) ? run.cells : [];
  const presets = Array.isArray(run.presets) ? run.presets : [];
  /** @type {Array<Record<string, any>>} */
  const groups = [];
  for (const preset of presets) {
    const preset_id = usableString(preset?.id);
    if (preset_id === null) {
      continue;
    }
    const own = cells
      .filter((/** @type {any} */ cell) => cell?.preset_id === preset_id)
      .sort(
        (/** @type {any} */ left, /** @type {any} */ right) =>
          (num(left?.k) ?? 0) - (num(right?.k) ?? 0)
      );
    /** @type {Array<Record<string, any>>} */
    const group_rows = own.map((/** @type {any} */ cell) => {
      const attempt_id = usableString(cell.attempt_id);
      const row =
        attempt_id === null ? null : (by_attempt.get(attempt_id) ?? null);
      const verify = cellVerify(cell, row);
      return {
        ...(row ?? {}),
        bead_id: usableString(cell.bead_id) ?? '',
        attempt_id,
        cell_k: num(cell.k),
        status: usableString(row?.status) ?? usableString(cell.status),
        failed:
          row?.failed === true ||
          FAILED_STATUSES.has(String(cell.status ?? '')),
        verify,
        // The repeat index takes the note slot the comparison table gives the
        // workspace name: inside one experiment every cell is the same repo,
        // and #k is what tells two repeats apart.
        workspace_name: cell.k === null ? '' : `#${cell.k}`
      };
    });
    const judged = group_rows.filter(
      (row) => row.verify === 'pass' || row.verify === 'fail'
    );
    const passed = judged.filter(
      (row) => row.verify === 'pass' && row.status === 'done'
    );
    groups.push({
      key: `${usableString(run.run_id) ?? ''}:${preset_id}`,
      name: usableString(preset?.name) ?? preset_id,
      n: group_rows.length,
      success_rate: judged.length === 0 ? null : passed.length / judged.length,
      success_sample: judged.length,
      unknown_count: group_rows.length - judged.length,
      pass_caret: benchPassCaret(
        group_rows.map((row) => /** @type {'pass'|'fail'|null} */ (row.verify))
      ),
      failed_count: group_rows.filter((row) => row.failed === true).length,
      retry_count: group_rows.filter((row) => row.is_retry === true).length,
      duration_ms: medianStat(group_rows.map((row) => num(row.duration_ms))),
      tokens: medianStat(group_rows.map((row) => num(row.usage?.tokens))),
      cost_usd: medianStat(
        group_rows.map((row) => num(row.usage?.total_cost_usd))
      ),
      blocking: medianStat(group_rows.map((row) => num(row.review?.blocking))),
      minor: medianStat(group_rows.map((row) => num(row.review?.minor))),
      round: medianStat(group_rows.map((row) => num(row.review?.round))),
      rows: group_rows
    });
  }
  return groups;
}
