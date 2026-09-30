/**
 * One repository's execution chips — 오케(총괄)·워커·구현 리뷰 — resolved from
 * the `workspaces_state` row projections (moved out of the retired repo deck,
 * `views/monitor/deck.js`, in the UI-dbn6 design-system round so the
 * pipeline repo strip can read it). Pure: no template, no browser globals.
 *
 * The chips draw only when the row carries **all three** projections
 * (`execution_defaults`·`runner_catalog`·`session_defaults`); an older server
 * without them gets nothing rather than a guessed default (fail-quiet).
 */
import { resolveExecutionSettings } from '../utils/execution-defaults.js';
import {
  formatImplReviewChip,
  formatOrchestrationChip,
  formatWorkerChip
} from './exec-settings-chip.js';
import { modelRunnerOf } from './runner-catalog.js';

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * One repo's 오케/워커 exec chips. 재료(투영 3종)가 하나라도 없으면 `null`이다.
 *
 * @param {any} row
 * @returns {{ orchestration: { text: string, title: string }|null, worker: { text: string, title: string }|null, review: { text: string, title: string }|null }|null}
 */
export function deckExecChips(row) {
  if (
    !isRecord(row) ||
    !isRecord(row.execution_defaults) ||
    !isRecord(row.runner_catalog) ||
    !isRecord(row.session_defaults)
  ) {
    return null;
  }
  /** @type {Record<string, unknown>} */
  const global_values = { ...row.session_defaults };
  for (const key of [
    'orchestration_model',
    'orchestration_effort',
    'orchestration_speed'
  ]) {
    if (typeof row[key] === 'string' && row[key].length > 0) {
      global_values[key] = row[key];
    }
  }
  const rows = resolveExecutionSettings({
    global: global_values,
    execution_defaults: row.execution_defaults,
    runner_catalog: row.runner_catalog
  });
  const controller_runtime = modelRunnerOf(
    row.runner_catalog,
    rows.orchestration_model.value ?? ''
  );
  const orchestration = formatOrchestrationChip(rows, row.runner_catalog);
  const worker = formatWorkerChip(rows, controller_runtime);
  const review = formatImplReviewChip(rows);
  return orchestration === null && worker === null && review === null
    ? null
    : { orchestration, worker, review };
}
