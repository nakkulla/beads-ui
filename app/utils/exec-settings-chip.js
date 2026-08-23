/**
 * Execution-settings chips for the Worker console (worker-card-exec-chips §1).
 *
 * Pure formatter: it turns `resolveExecutionSettings` rows — or an attempt's
 * recorded tuple — into a one-line chip text plus a multi-line tooltip. It owns
 * no vocabulary of its own; the key and source labels are imported from the
 * issue detail's effective-settings card so the two surfaces cannot drift.
 *
 * A chip is `null` rather than empty whenever the underlying rows cannot say
 * anything true — a missing chip is preferable to a wrong one.
 *
 * @import { ExecutionValue } from './execution-defaults.js'
 * @typedef {{ text: string, title: string }} ExecChip
 * @typedef {{ orchestration: ExecChip|null, worker: ExecChip|null }} ExecChips
 */
import {
  SETTING_LABELS,
  SOURCE_LABELS
} from '../views/detail-panel/effective-settings.js';
import { modelRunnerOf } from '../views/detail-panel/exec-settings.js';
import { formatAttemptTuple } from './attempt-display.js';

/** Resolutions that carry no value worth showing as a chip token. */
const EMPTY_RESOLUTIONS = new Set(['unavailable', 'not_applicable']);

/**
 * One resolver row, or null when the caller handed in rows that lack the key.
 *
 * @param {Record<string, ExecutionValue>|null|undefined} rows
 * @param {string} key
 * @returns {ExecutionValue|null}
 */
function rowOf(rows, key) {
  if (typeof rows !== 'object' || rows === null) {
    return null;
  }
  const row = rows[key];
  return typeof row === 'object' && row !== null ? row : null;
}

/**
 * @param {Array<string|null>} tokens
 * @returns {string}
 */
function joinTokens(tokens) {
  return tokens.filter((token) => token !== null).join(' · ');
}

/**
 * A tooltip line naming which layer supplied the value.
 *
 * @param {string} key
 * @param {ExecutionValue|null} row
 * @returns {string|null}
 */
function layerLine(key, row) {
  return row === null
    ? null
    : `${SETTING_LABELS[key]}: ${row.display} (${SOURCE_LABELS[row.source]})`;
}

/**
 * @param {Array<string|null>} lines
 * @returns {string}
 */
function joinLines(lines) {
  return lines.filter((line) => line !== null).join('\n');
}

/**
 * The running tile's orchestration chip: what this attempt actually ran with.
 * Immutable, so no source layer is named.
 *
 * @param {{ runner?: unknown, model?: unknown, effort?: unknown, speed?: unknown }|null|undefined} attempt
 * @returns {ExecChip|null}
 */
export function formatAttemptOrchestrationChip(attempt) {
  if (typeof attempt !== 'object' || attempt === null) {
    return null;
  }
  const text = formatAttemptTuple(attempt);
  if (text === '') {
    return null;
  }
  /**
   * @param {string} label
   * @param {unknown} value
   * @returns {string|null}
   */
  const line = (label, value) =>
    typeof value === 'string' && value.length > 0 ? `${label}: ${value}` : null;
  return {
    text,
    title: joinLines([
      '오케스트레이션 — 이 attempt에 기록된 실행값',
      line('runner', attempt.runner),
      line(SETTING_LABELS.orchestration_model, attempt.model),
      line(SETTING_LABELS.orchestration_effort, attempt.effort),
      line(SETTING_LABELS.orchestration_speed, attempt.speed)
    ])
  };
}

/**
 * The waiting row / candidate card orchestration chip: what the bead WOULD run
 * with, resolved from pin over queue defaults. The runner is derived from the
 * model token because the resolver stores no runner of its own.
 *
 * @param {Record<string, ExecutionValue>|null|undefined} rows
 * @param {any} runner_catalog
 * @returns {ExecChip|null}
 */
export function formatOrchestrationChip(rows, runner_catalog) {
  const model = rowOf(rows, 'orchestration_model');
  if (model === null || model.resolution === 'unavailable') {
    return null;
  }
  const effort = rowOf(rows, 'orchestration_effort');
  const speed = rowOf(rows, 'orchestration_speed');
  const text = joinTokens([
    modelRunnerOf(runner_catalog, model.value ?? ''),
    model.display,
    effort !== null && effort.value !== null ? effort.display : null,
    speed !== null && speed.value === 'fast' ? 'Fast' : null
  ]);
  if (text === '') {
    return null;
  }
  return {
    text,
    title: joinLines([
      '오케스트레이션 — 현재 해석값 (핀 > 큐 기본값)',
      layerLine('orchestration_model', model),
      layerLine('orchestration_effort', effort),
      layerLine('orchestration_speed', speed)
    ])
  };
}

/**
 * `impl_runtime` as a chip token: `inherit` names its controller when one is
 * known, and says nothing more when it is not.
 *
 * @param {ExecutionValue|null} row
 * @param {string|null} controller_runtime
 * @returns {string|null}
 */
function runtimeToken(row, controller_runtime) {
  if (
    row === null ||
    row.value === null ||
    EMPTY_RESOLUTIONS.has(row.resolution)
  ) {
    return null;
  }
  if (row.value !== 'inherit') {
    return row.value;
  }
  return controller_runtime ? `inherit→${controller_runtime}` : 'inherit';
}

/**
 * `impl_model` as a chip token. `auto` is shortened; every other value keeps the
 * resolver's own display, so `compactModelId` shortening and the ` (비호환)`
 * marker survive verbatim.
 *
 * @param {ExecutionValue|null} row
 * @returns {string|null}
 */
function modelToken(row) {
  if (row === null || EMPTY_RESOLUTIONS.has(row.resolution)) {
    return null;
  }
  return row.value === 'auto' ? 'auto' : row.display;
}

/**
 * `impl_effort` as a chip token; the resolver's `auto (실행 시 결정)` is too
 * long for one line.
 *
 * @param {ExecutionValue|null} row
 * @returns {string|null}
 */
function effortToken(row) {
  if (row === null) {
    return null;
  }
  if (row.value === 'auto') {
    return 'auto';
  }
  return EMPTY_RESOLUTIONS.has(row.resolution) ? null : row.display;
}

/**
 * The worker (implementation delegation) chip, shared by the running tile,
 * waiting rows and candidate cards.
 *
 * `main` collapses to a single token: nothing is delegated, so runtime, model,
 * effort and speed are all `해당 없음`.
 *
 * @param {Record<string, ExecutionValue>|null|undefined} rows
 * @param {string|null|undefined} controller_runtime
 * @returns {ExecChip|null}
 */
export function formatWorkerChip(rows, controller_runtime) {
  if (typeof rows !== 'object' || rows === null) {
    return null;
  }
  const dispatch = rowOf(rows, 'impl_dispatch');
  const runtime = rowOf(rows, 'impl_runtime');
  const model = rowOf(rows, 'impl_model');
  const effort = rowOf(rows, 'impl_effort');
  const speed = rowOf(rows, 'impl_speed');
  const text =
    dispatch !== null && dispatch.value === 'main'
      ? '메인'
      : joinTokens([
          runtimeToken(runtime, controller_runtime ?? null),
          modelToken(model),
          effortToken(effort),
          speed !== null && speed.value === 'fast' ? 'Fast' : null
        ]);
  if (text === '') {
    return null;
  }
  return {
    text,
    title: joinLines([
      '워커(구현 위임) — 현재 해석값 (핀 > 전역 kv > 기본). 실행 중이면 세션이 시작 시 고정한 값과 다를 수 있음',
      layerLine('impl_dispatch', dispatch),
      layerLine('impl_runtime', runtime),
      layerLine('impl_model', model),
      layerLine('impl_effort', effort),
      layerLine('impl_speed', speed)
    ])
  };
}
