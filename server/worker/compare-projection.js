/**
 * Preset comparison projection (preset-compare §3).
 *
 * One row is ONE terminal implementation attempt; one group is one execution
 * SIGNATURE — the orchestration snapshot, the actual implementer the attempt's
 * own `receipt_check` preserved, and the three reviewer keys. The signature is
 * built from what RAN, never from what a Bead currently pins: a later attempt
 * overwrites `exec_receipt` on the Bead, so reading it there would relabel
 * finished history (§3.3).
 *
 * The module splits in two on purpose (§3.5): {@link buildCompareModel} and
 * everything above it are pure and unit-tested, while
 * {@link collectCompareWorkspaces} is the only part that touches the queue
 * store, the record tree and the workspace snapshot.
 *
 * @import { ResolvedCatalog } from './runner-catalog.js'
 */
import node_fs from 'node:fs';
import path from 'node:path';
import { projectAttemptUsage } from '../../app/utils/token-usage.js';
import { parseExecReceipt, parseReviewStats } from '../workflow-enrich.js';
import { peekWorkspaceSnapshot } from '../workspace-snapshot-runtime.js';
import {
  benchCellTerminal,
  benchRunBeadIds,
  listBenchManifests
} from './bench-runs.js';
import { visibleWorkspaceRoots } from './foreign-blocker-status.js';
import { TERMINAL_ATTEMPT_STATUSES } from './queue-store.js';
import {
  effectiveVerifyPolicy,
  repoOpsDisplayFor,
  repoOpsVerifyReceiptState
} from './repo-ops-display.js';
import { runtimeCatalog } from './runner/index.js';
import { getWorkerRuntime } from './runtime.js';
import { beadsRootDir } from './state-paths.js';

/**
 * Attempt statuses that ended the run, read from the queue store's own set
 * rather than copied. "Did this attempt reach an end" has one answer in this
 * process, and a second list would answer it differently the first time the
 * scheduler grows a status.
 *
 * @type {ReadonlySet<string>}
 */
export const COMPARE_TERMINAL_STATUSES = TERMINAL_ATTEMPT_STATUSES;

/**
 * The two statuses the 실패 column names. `stopped`/`discarded` are human
 * dispositions and `parked`/`waiting`/`retry_wait`/`superseded` are lane
 * states, so counting any of them as a failure would charge a preset for a
 * decision a person made.
 *
 * @type {ReadonlySet<string>}
 */
export const COMPARE_FAILED_STATUSES = new Set(['failed', 'orphaned']);

/** The label a signature axis takes when the record does not carry it. */
export const UNRECORDED = '미기록';

/** The label the 검증 column takes when neither source judged the row. */
export const VERIFY_UNKNOWN = '미상';

/**
 * The label a bench-experiment bead carries. `bench-runs.js` (§4) owns the
 * write; this projection only reads it, so an install without that unit simply
 * never sees one.
 *
 * @type {string}
 */
const BENCH_LABEL = 'bench';

/**
 * @typedef {Object} CompareFilters
 * @property {string[]} root_dirs - Empty means every workspace.
 * @property {string[]} issue_types - Empty means every type.
 * @property {string[]} routes - Empty means every route.
 * @property {number|null} since - Lower bound on `finished_at`, or null.
 * @property {boolean} include_bench
 */

/**
 * @typedef {Object} CompareIssueInput
 * @property {string} title
 * @property {string|null} issue_type
 * @property {string|null} route
 * @property {string[]} labels
 * @property {string|null} [status] - The bead's own status; a bench cell is
 * only finished once this reads `closed` (§4.6).
 * @property {{ round: number, blocking: number, minor: number, verdict: string, anchor: string }|null} impl_review_stats
 */

/**
 * @typedef {Object} CompareWorkspaceInput
 * @property {string} root_dir
 * @property {string} name
 * @property {Array<Record<string, any>>} attempts - Every attempt of every bead
 * this workspace knows, live rows and transferred records alike.
 * @property {Record<string, CompareIssueInput>} [issues]
 * @property {Record<string, { ok: boolean }|null>} [verify_receipts] - The
 * merge-candidate `[verify]` receipt per bead (§3.2).
 */

/**
 * @typedef {Object} ImplActor
 * @property {'delegated'|'main'|'missing'} kind
 * @property {string|null} model
 * @property {string|null} effort
 * @property {string} label
 */

/**
 * @typedef {Object} CompareSignature
 * @property {string|null} orch_model
 * @property {string|null} orch_effort
 * @property {ImplActor} impl_actor
 * @property {string|null} review_model
 * @property {string|null} review_effort
 * @property {string|null} review_speed
 * @property {Record<string, any>} exec_values - The attempt's own pinned
 * settings, kept out of {@link CompareSignature.key} but needed to answer
 * "did this preset describe what ran" on the axes the key does not carry.
 * @property {string} key
 */

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function str(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

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
 * @returns {string[]}
 */
function stringList(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  /** @type {string[]} */
  const out = [];
  for (const entry of value) {
    const text = str(entry);
    if (text !== null) {
      out.push(text);
    }
  }
  return out;
}

/**
 * Read one attempt's PRESERVED executor. The record keeps the completion-time
 * `checkReceipts` result, whose `checks.exec_receipt` is already parsed; a
 * legacy record that stored the raw receipt STRING is parsed here instead, so
 * both generations answer the same question.
 *
 * A multi-unit receipt (`checks.units`) resolves only when every unit names the
 * same executor — a plan whose units ran on different actors has no single
 * implementation axis, and inventing one would merge two executors into a row
 * that compares neither.
 *
 * @param {Record<string, any>|null|undefined} receipt_check
 * @returns {ImplActor}
 */
export function implActorOf(receipt_check) {
  /** @type {ImplActor} */
  const missing = {
    kind: 'missing',
    model: null,
    effort: null,
    label: UNRECORDED
  };
  if (!isRecord(receipt_check) || !isRecord(receipt_check.checks)) {
    return missing;
  }
  const checks = receipt_check.checks;
  const parsed = parseActorEntry(checks.exec_receipt);
  if (parsed) {
    return parsed;
  }
  if (!Array.isArray(checks.units) || checks.units.length === 0) {
    return missing;
  }
  /** @type {ImplActor|null} */
  let agreed = null;
  for (const unit of checks.units) {
    const unit_actor = parseActorEntry(unit);
    if (!unit_actor) {
      return missing;
    }
    if (agreed === null) {
      agreed = unit_actor;
      continue;
    }
    if (agreed.label !== unit_actor.label) {
      return missing;
    }
  }
  return agreed ?? missing;
}

/**
 * @param {unknown} value - A parsed receipt note, or a raw receipt string.
 * @returns {ImplActor|null}
 */
function parseActorEntry(value) {
  const parsed = typeof value === 'string' ? parseExecReceipt(value) : value;
  if (!isRecord(parsed)) {
    return null;
  }
  const kind = str(parsed.kind);
  const actor = str(parsed.actor);
  if (kind === null || actor === null) {
    return null;
  }
  if (kind === 'main') {
    // The `main:` reason token varies (`bead`, `quick_fix_default`, …) and is
    // not an executor difference, so it stays out of the axis entirely.
    return { kind: 'main', model: null, effort: null, label: 'main' };
  }
  if (kind !== 'delegated') {
    return null;
  }
  const effort = str(parsed.effort);
  return {
    kind: 'delegated',
    model: actor,
    effort,
    label: effort === null ? actor : `${actor}/${effort}`
  };
}

/**
 * Build the group signature of one attempt (§3.3). The reviewer triple is part
 * of the key: presets that differ only in their reviewer would otherwise share
 * a group and their 리뷰 지적 columns would be averaged together.
 *
 * @param {Record<string, any>} attempt
 * @returns {CompareSignature}
 */
export function attemptSignature(attempt) {
  const exec_values = isRecord(attempt.exec_values) ? attempt.exec_values : {};
  const orch_model = str(attempt.model);
  const orch_effort = str(attempt.effort);
  const impl_actor = implActorOf(attempt.receipt_check);
  const review_model = str(exec_values.impl_review_model);
  const review_effort = str(exec_values.impl_review_effort);
  const review_speed = str(exec_values.impl_review_speed);
  const key =
    `${orch_model ?? UNRECORDED}/${orch_effort ?? UNRECORDED}` +
    ` → ${impl_actor.label}` +
    ` · 리뷰 ${review_model ?? UNRECORDED}/${review_effort ?? UNRECORDED}/${review_speed ?? UNRECORDED}`;
  return {
    orch_model,
    orch_effort,
    impl_actor,
    review_model,
    review_effort,
    review_speed,
    exec_values,
    key
  };
}

/**
 * Does one stored preset describe what actually ran, on EVERY key it declares
 * (§3.3)?
 *
 * "Every key" is literal. A preset is sparse, so the keys it omits say nothing
 * — but a key it DOES declare and that cannot be checked against the attempt is
 * not a match either, because naming the group after that preset would tell a
 * reader the ignored setting was the one in force. So an unanswerable key is a
 * refusal, and the group keeps its signature string.
 *
 * Three axes are answered by the EXECUTION rather than by the pin, which is the
 * whole point of §3.3: `impl_dispatch`, `impl_model` and `impl_effort` are read
 * off the preserved `exec_receipt`. A `main` executor therefore refuses a
 * preset that declares `impl_model` or `impl_effort` — those describe a
 * delegate that never ran. Every other declared key is compared against the
 * attempt's own `exec_values` snapshot.
 *
 * @param {CompareSignature} signature
 * @param {{ settings?: Record<string, any> }} preset
 * @returns {boolean}
 */
export function presetMatchesSignature(signature, preset) {
  const settings = isRecord(preset?.settings) ? preset.settings : null;
  if (!settings) {
    return false;
  }
  if (signature.impl_actor.kind === 'missing') {
    // An attempt with no preserved receipt names no executor, so no preset can
    // be shown to be the one that ran it.
    return false;
  }
  const delegated = signature.impl_actor.kind === 'delegated';
  /** @type {Record<string, string|null>} */
  const executed = {
    orchestration_model: signature.orch_model,
    orchestration_effort: signature.orch_effort,
    impl_review_model: signature.review_model,
    impl_review_effort: signature.review_effort,
    impl_review_speed: signature.review_speed,
    impl_dispatch: delegated ? 'delegated' : 'main'
  };
  if (delegated) {
    executed.impl_model = signature.impl_actor.model;
    executed.impl_effort = signature.impl_actor.effort;
  }
  const exec_values = isRecord(signature.exec_values)
    ? signature.exec_values
    : {};
  let declared = 0;
  for (const key of Object.keys(settings)) {
    const expected = str(settings[key]);
    if (expected === null) {
      // A preset entry with no readable value declares nothing.
      continue;
    }
    declared += 1;
    if (Object.hasOwn(executed, key)) {
      if (executed[key] !== expected) {
        return false;
      }
      continue;
    }
    if (!delegated && (key === 'impl_model' || key === 'impl_effort')) {
      return false;
    }
    if (str(exec_values[key]) !== expected) {
      return false;
    }
  }
  return declared > 0;
}

/**
 * The display name of a signature: the first stored preset (in storage order)
 * that matches it on every key it declares, else the signature string itself.
 *
 * @param {CompareSignature} signature
 * @param {Array<{ id?: string, name?: string, settings?: Record<string, any> }>} presets
 * @returns {string}
 */
export function signatureName(signature, presets) {
  for (const preset of Array.isArray(presets) ? presets : []) {
    if (presetMatchesSignature(signature, preset)) {
      const name = str(preset.name);
      if (name !== null) {
        return name;
      }
    }
  }
  return signature.key;
}

/**
 * Is this attempt a rung of an earlier one (§3.2)? `retry.attempts` is the
 * lineage's cumulative rung number, so summing it across rows would count one
 * retry once per surviving row; the row's own origin is the only per-row fact.
 *
 * @param {Record<string, any>} attempt
 * @returns {boolean}
 */
export function isRetryAttempt(attempt) {
  const retry = isRecord(attempt.retry) ? attempt.retry : null;
  return (
    str(retry?.origin_attempt_id) !== null || str(attempt.resumed_from) !== null
  );
}

/**
 * The token and price summary of one attempt, priced through the SAME module
 * every other surface uses (§1.3). `null` when the record carries no usage at
 * all, so an empty cell stays an empty cell.
 *
 * @param {Record<string, any>} attempt
 * @param {ResolvedCatalog|null} catalog
 * @returns {{ tokens: number, total_cost_usd: number|null, unpriced_leg_count: number, cost_estimated: boolean }|null}
 */
export function attemptUsageSummary(attempt, catalog) {
  /** @type {any} */
  let projection = null;
  try {
    projection = projectAttemptUsage(attempt, catalog ?? null);
  } catch {
    projection = null;
  }
  if (!projection || !isRecord(projection.providers)) {
    return null;
  }
  let tokens = 0;
  let cost = 0;
  let priced = false;
  let unpriced = 0;
  let estimated = false;
  for (const summary of Object.values(projection.providers)) {
    if (!isRecord(summary)) {
      continue;
    }
    tokens += num(summary.subtotal) ?? 0;
    const summary_cost = num(summary.total_cost_usd);
    if (summary_cost !== null) {
      cost += summary_cost;
      priced = true;
    }
    unpriced += num(summary.unpriced_leg_count) ?? 0;
    if (summary.cost_estimated === true) {
      estimated = true;
    }
  }
  return {
    tokens,
    total_cost_usd: priced ? cost : null,
    unpriced_leg_count: unpriced,
    cost_estimated: estimated
  };
}

/**
 * The median of the values that exist, with the sample it was taken over
 * (§3.4). `total` is the row count the column COULD have used, so a reader can
 * see `n=3/5` rather than a number standing in for missing rows.
 *
 * @param {Array<number|null|undefined>} values
 * @returns {{ median: number|null, sample: number, total: number }}
 */
export function medianOf(values) {
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
 * `pass^k` over the judged rows of one group (§4.7): the share of beads whose
 * FIRST `k` judged attempts all passed, where `k` is the smallest judged count
 * any bead in the group has. A group where some bead was run once has no `k`
 * above one to speak of, so it reports null rather than degrading to the plain
 * success rate.
 *
 * @param {Array<{ bead_id: string, verify: 'pass'|'fail'|null, finished_at: number|null }>} rows
 * @returns {{ k: number, value: number }|null}
 */
export function passCaret(rows) {
  /** @type {Map<string, Array<{ verify: 'pass'|'fail'|null, finished_at: number|null }>>} */
  const by_bead = new Map();
  for (const row of rows) {
    if (row.verify !== 'pass' && row.verify !== 'fail') {
      continue;
    }
    const list = by_bead.get(row.bead_id) || [];
    list.push(row);
    by_bead.set(row.bead_id, list);
  }
  if (by_bead.size === 0) {
    return null;
  }
  let k = Infinity;
  for (const list of by_bead.values()) {
    k = Math.min(k, list.length);
  }
  if (!Number.isFinite(k) || k < 2) {
    return null;
  }
  let all_passed = 0;
  for (const list of by_bead.values()) {
    const ordered = [...list].sort(
      (left, right) => (left.finished_at ?? 0) - (right.finished_at ?? 0)
    );
    if (ordered.slice(0, k).every((row) => row.verify === 'pass')) {
      all_passed += 1;
    }
  }
  return { k, value: all_passed / by_bead.size };
}

/**
 * Normalize a client filter payload. Everything is optional and an unreadable
 * value falls back to "no restriction" — except `include_bench`, whose default
 * is EXCLUDE (§3.4): a comparison of real work must not silently absorb
 * synthetic clone runs.
 *
 * @param {unknown} raw
 * @returns {CompareFilters}
 */
export function normalizeCompareFilters(raw) {
  const input = isRecord(raw) ? raw : {};
  return {
    root_dirs: stringList(input.root_dirs).map((value) => path.resolve(value)),
    issue_types: stringList(input.issue_types),
    routes: stringList(input.routes),
    since: num(input.since),
    include_bench: input.include_bench === true
  };
}

/**
 * Every terminal implementation attempt of one workspace, as unfiltered rows.
 * Review stats and the merge-candidate `[verify]` receipt are Bead-level facts,
 * so they land on the bead's LAST successful attempt and nowhere else (§3.2).
 *
 * @param {CompareWorkspaceInput} workspace
 * @param {ResolvedCatalog|null} catalog
 * @returns {Array<Record<string, any>>}
 */
function workspaceRows(workspace, catalog) {
  const issues = isRecord(workspace.issues) ? workspace.issues : {};
  const verify_receipts = isRecord(workspace.verify_receipts)
    ? workspace.verify_receipts
    : {};
  /** @type {Array<Record<string, any>>} */
  const rows = [];
  for (const attempt of Array.isArray(workspace.attempts)
    ? workspace.attempts
    : []) {
    if (!isRecord(attempt)) {
      continue;
    }
    const kind = str(attempt.kind) ?? 'implementation';
    if (kind !== 'implementation') {
      continue;
    }
    const status = str(attempt.status);
    if (status === null || !COMPARE_TERMINAL_STATUSES.has(status)) {
      continue;
    }
    const bead_id = str(attempt.bead_id);
    const attempt_id = str(attempt.attempt_id);
    if (bead_id === null || attempt_id === null) {
      continue;
    }
    const issue = isRecord(issues[bead_id])
      ? /** @type {CompareIssueInput} */ (issues[bead_id])
      : null;
    const started_at = num(attempt.started_at);
    const finished_at = num(attempt.finished_at);
    const signature = attemptSignature(attempt);
    const bench_verify = isRecord(attempt.bench_verify)
      ? attempt.bench_verify
      : null;
    const labels = issue ? stringList(issue.labels) : [];
    rows.push({
      attempt_id,
      bead_id,
      root_dir: workspace.root_dir,
      workspace_name: workspace.name,
      title: issue ? (str(issue.title) ?? '') : '',
      issue_type: issue ? str(issue.issue_type) : null,
      route: issue ? str(issue.route) : null,
      started_at,
      finished_at,
      duration_ms:
        started_at !== null && finished_at !== null && finished_at >= started_at
          ? finished_at - started_at
          : null,
      status,
      cause: str(attempt.cause),
      failed: COMPARE_FAILED_STATUSES.has(status),
      is_retry: isRetryAttempt(attempt),
      is_bench: labels.includes(BENCH_LABEL) || bench_verify !== null,
      verify:
        bench_verify === null
          ? null
          : bench_verify.ok === true
            ? 'pass'
            : 'fail',
      verify_source: bench_verify === null ? null : 'bench_verify',
      review: null,
      usage: attemptUsageSummary(attempt, catalog),
      signature: signature.key,
      signature_parts: signature
    });
  }
  attachBeadLevelFacts(rows, issues, verify_receipts);
  return rows;
}

/**
 * Put the Bead-level columns on each bead's LAST successful attempt. Done
 * BEFORE any filter runs so a period filter cannot move the attribution to a
 * different row than the one the whole history elects.
 *
 * @param {Array<Record<string, any>>} rows
 * @param {Record<string, any>} issues
 * @param {Record<string, any>} verify_receipts
 */
function attachBeadLevelFacts(rows, issues, verify_receipts) {
  /** @type {Map<string, Record<string, any>>} */
  const last_success = new Map();
  for (const row of rows) {
    if (row.status !== 'done') {
      continue;
    }
    const current = last_success.get(row.bead_id);
    if (
      !current ||
      (row.finished_at ?? 0) > (current.finished_at ?? 0) ||
      ((row.finished_at ?? 0) === (current.finished_at ?? 0) &&
        row.attempt_id > current.attempt_id)
    ) {
      last_success.set(row.bead_id, row);
    }
  }
  for (const [bead_id, row] of last_success) {
    const issue = isRecord(issues[bead_id]) ? issues[bead_id] : null;
    const stats =
      issue && isRecord(issue.impl_review_stats)
        ? issue.impl_review_stats
        : null;
    if (stats) {
      row.review = {
        round: num(stats.round),
        blocking: num(stats.blocking),
        minor: num(stats.minor),
        verdict: str(stats.verdict),
        anchor: str(stats.anchor)
      };
    }
    if (row.verify !== null) {
      continue;
    }
    const receipt = verify_receipts[bead_id];
    if (isRecord(receipt) && typeof receipt.ok === 'boolean') {
      row.verify = receipt.ok ? 'pass' : 'fail';
      row.verify_source = 'merge_verify';
    }
  }
}

/**
 * @param {Record<string, any>} row
 * @param {CompareFilters} filters
 * @returns {boolean}
 */
function rowPassesFilters(row, filters) {
  if (!filters.include_bench && row.is_bench) {
    return false;
  }
  if (
    filters.root_dirs.length > 0 &&
    !filters.root_dirs.includes(path.resolve(String(row.root_dir || '')))
  ) {
    return false;
  }
  if (filters.since !== null) {
    if (row.finished_at === null || row.finished_at < filters.since) {
      return false;
    }
  }
  if (
    filters.issue_types.length > 0 &&
    (row.issue_type === null || !filters.issue_types.includes(row.issue_type))
  ) {
    return false;
  }
  if (
    filters.routes.length > 0 &&
    (row.route === null || !filters.routes.includes(row.route))
  ) {
    return false;
  }
  return true;
}

/**
 * Aggregate the rows of one signature (§3.4).
 *
 * @param {string} key
 * @param {string} name
 * @param {Array<Record<string, any>>} rows
 * @returns {Record<string, any>}
 */
function groupOf(key, name, rows) {
  const judged = rows.filter(
    (row) => row.verify === 'pass' || row.verify === 'fail'
  );
  const passed = judged.filter(
    (row) => row.verify === 'pass' && row.status === 'done'
  );
  return {
    key,
    name,
    n: rows.length,
    // Only judged rows are in the denominator: 미상 is not a failure, and
    // counting it as one would reward a lane that never got verified.
    success_rate: judged.length === 0 ? null : passed.length / judged.length,
    success_sample: judged.length,
    unknown_count: rows.length - judged.length,
    pass_caret: passCaret(
      /** @type {any} */ (
        rows.map((row) => ({
          bead_id: row.bead_id,
          verify: row.verify,
          finished_at: row.finished_at
        }))
      )
    ),
    failed_count: rows.filter((row) => row.failed).length,
    retry_count: rows.filter((row) => row.is_retry).length,
    duration_ms: medianOf(rows.map((row) => row.duration_ms)),
    tokens: medianOf(rows.map((row) => row.usage?.tokens ?? null)),
    cost_usd: medianOf(rows.map((row) => row.usage?.total_cost_usd ?? null)),
    blocking: medianOf(rows.map((row) => row.review?.blocking ?? null)),
    minor: medianOf(rows.map((row) => row.review?.minor ?? null)),
    round: medianOf(rows.map((row) => row.review?.round ?? null)),
    attempt_ids: rows.map((row) => row.attempt_id)
  };
}

/**
 * @param {Record<string, any>} left
 * @param {Record<string, any>} right
 * @returns {number}
 */
function compareGroups(left, right) {
  const left_rate = num(left.success_rate);
  const right_rate = num(right.success_rate);
  if (left_rate !== right_rate) {
    // A group with no judged row sorts last: it is not a zero success rate, it
    // is an unanswered question.
    if (left_rate === null) {
      return 1;
    }
    if (right_rate === null) {
      return -1;
    }
    return right_rate - left_rate;
  }
  const left_cost = num(left.cost_usd?.median);
  const right_cost = num(right.cost_usd?.median);
  if (left_cost !== right_cost) {
    if (left_cost === null) {
      return 1;
    }
    if (right_cost === null) {
      return -1;
    }
    return left_cost - right_cost;
  }
  return String(left.key).localeCompare(String(right.key));
}

/**
 * @param {Array<Record<string, any>>} rows
 */
function sortedRows(rows) {
  return [...rows].sort(
    (left, right) =>
      (right.finished_at ?? 0) - (left.finished_at ?? 0) ||
      left.attempt_id.localeCompare(right.attempt_id)
  );
}

/**
 * Strip the parsed signature before a row goes on the wire: the wire carries
 * the string the group is keyed by, and one shape on the wire is one thing to
 * keep true.
 *
 * @param {Array<Record<string, any>>} rows
 */
function wireRows(rows) {
  return rows.map((row) => {
    const rest = { ...row };
    delete rest.signature_parts;
    return rest;
  });
}

/**
 * The whole comparison model — pure (§3.5).
 *
 * `bench_rows` is the experiment half and is deliberately NOT filtered: an
 * experiment is chosen by name, and a person who picked one must not get an
 * empty table because the main table's period or repository filter happened to
 * be narrower (§4.7). It is the same row material either way — one projection,
 * two selections of it, never a second ledger.
 *
 * @param {{ workspaces: CompareWorkspaceInput[], presets?: Array<{ id?: string, name?: string, settings?: Record<string, any> }>, catalog?: ResolvedCatalog|null, filters?: unknown }} input
 * @returns {{ rows: Array<Record<string, any>>, groups: Array<Record<string, any>>, bench_rows: Array<Record<string, any>> }}
 */
export function buildCompareModel(input) {
  const filters = normalizeCompareFilters(input?.filters);
  const presets = Array.isArray(input?.presets) ? input.presets : [];
  const catalog = input?.catalog ?? null;
  /** @type {Array<Record<string, any>>} */
  const rows = [];
  /** @type {Array<Record<string, any>>} */
  const bench_rows = [];
  for (const workspace of Array.isArray(input?.workspaces)
    ? input.workspaces
    : []) {
    for (const row of workspaceRows(workspace, catalog)) {
      if (row.is_bench) {
        bench_rows.push(row);
      }
      if (rowPassesFilters(row, filters)) {
        rows.push(row);
      }
    }
  }
  rows.sort(
    (left, right) =>
      (right.finished_at ?? 0) - (left.finished_at ?? 0) ||
      left.attempt_id.localeCompare(right.attempt_id)
  );
  /** @type {Map<string, Array<Record<string, any>>>} */
  const by_signature = new Map();
  for (const row of rows) {
    const list = by_signature.get(row.signature) || [];
    list.push(row);
    by_signature.set(row.signature, list);
  }
  /** @type {Array<Record<string, any>>} */
  const groups = [];
  for (const [key, group_rows] of by_signature) {
    groups.push(
      groupOf(
        key,
        signatureName(group_rows[0].signature_parts, presets),
        group_rows
      )
    );
  }
  groups.sort(compareGroups);
  return {
    rows: wireRows(rows),
    groups,
    bench_rows: wireRows(sortedRows(bench_rows))
  };
}

/**
 * Every bead this workspace has a record for: the live queue's attempt rows
 * plus the per-bead record tree the transferred attempts live in (ADR 0029).
 * Fail-quiet — an unreadable state directory yields the live half alone.
 *
 * @param {string} root_dir
 * @param {{ queueStore?: any }} [seams]
 * @returns {string[]}
 */
export function compareBeadIds(root_dir, seams = {}) {
  /** @type {Set<string>} */
  const ids = new Set();
  const store = seams.queueStore || getWorkerRuntime().queueStore;
  try {
    const queue = store.snapshot(root_dir);
    for (const attempt of Object.values(queue?.attempts || {})) {
      const bead_id = str(/** @type {any} */ (attempt)?.bead_id);
      if (bead_id !== null) {
        ids.add(bead_id);
      }
    }
  } catch {
    // A workspace with no Worker attachment simply has no live rows.
  }
  try {
    for (const entry of node_fs.readdirSync(beadsRootDir(root_dir), {
      withFileTypes: true
    })) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        ids.add(entry.name);
      }
    }
  } catch {
    // No record tree yet.
  }
  return [...ids];
}

/**
 * The Bead-level display facts of one workspace, read from the snapshot
 * generation every other list is projected from (ADR 0025). A workspace nobody
 * has subscribed to peeks as `null`, and every bead then renders with its id
 * alone (§3.5).
 *
 * @param {string} root_dir
 * @param {{ peek?: (root_dir: string) => any }} [seams]
 * @returns {Record<string, CompareIssueInput>}
 */
export function compareIssueIndex(root_dir, seams = {}) {
  const peek = seams.peek || peekWorkspaceSnapshot;
  /** @type {Record<string, CompareIssueInput>} */
  const out = {};
  /** @type {any} */
  let snapshot = null;
  try {
    snapshot = peek(root_dir);
  } catch {
    snapshot = null;
  }
  const index = snapshot?.id_index;
  if (!index || typeof index.entries !== 'function') {
    return out;
  }
  for (const [id, issue] of index.entries()) {
    if (typeof id !== 'string' || !isRecord(issue)) {
      continue;
    }
    const metadata = isRecord(issue.metadata) ? issue.metadata : {};
    out[id] = {
      title: str(issue.title) ?? '',
      issue_type: str(issue.issue_type),
      route: str(metadata.route),
      labels: stringList(issue.labels),
      status: str(issue.status),
      impl_review_stats: parseReviewStats('impl', metadata.impl_review_stats)
    };
  }
  return out;
}

/**
 * The merge-candidate `[verify]` receipts of one workspace, keyed by bead
 * (§3.2). A pure read of the observation cache the PR poller owns — but NOT a
 * pure read of `verify.ok`.
 *
 * The receipt is only evidence about the CURRENT candidate, so this reuses the
 * merge gate's own binding rather than restating it: `repoOpsVerifyReceiptState`
 * refuses a receipt that was produced at a different base than the declaration
 * in force, and the head check below is the same `receipt.head_sha !==
 * pr.head_sha` test `evaluateMergeGate` applies before it will call a receipt a
 * pass. A workspace that declares no `[verify]` (or opted out of that lane)
 * reports nothing at all, which the table reads as 미상.
 *
 * Anything not proven is simply absent: an unbound receipt must not be counted
 * as either a pass or a failure.
 *
 * @param {string} root_dir
 * @param {{ prObservations?: any, queueStore?: any, verifyPolicy?: { declaration_state: 'present'|'absent'|'invalid', base_sha: string|null } }} [seams]
 * @returns {Record<string, { ok: boolean }|null>}
 */
export function compareVerifyReceipts(root_dir, seams = {}) {
  /** @type {Record<string, { ok: boolean }|null>} */
  const out = {};
  /** @type {Record<string, any>} */
  let observed = {};
  try {
    observed = (
      seams.prObservations || getWorkerRuntime().prObservations
    ).snapshot(root_dir);
  } catch {
    return out;
  }
  /** @type {{ declaration_state: 'present'|'absent'|'invalid', base_sha: string|null }} */
  let policy;
  if (seams.verifyPolicy) {
    policy = seams.verifyPolicy;
  } else {
    /** @type {Record<string, unknown>} */
    let queue = {};
    try {
      queue = (seams.queueStore || getWorkerRuntime().queueStore).snapshot(
        root_dir
      );
    } catch {
      queue = {};
    }
    try {
      policy = effectiveVerifyPolicy(repoOpsDisplayFor(root_dir), queue);
    } catch {
      return out;
    }
  }
  if (policy.declaration_state !== 'present') {
    return out;
  }
  for (const [bead_id, entry] of Object.entries(observed || {})) {
    const state = repoOpsVerifyReceiptState(
      policy,
      isRecord(entry) ? entry.verify : null
    );
    const receipt = isRecord(state.receipt) ? state.receipt : null;
    if (receipt === null || typeof receipt.ok !== 'boolean') {
      continue;
    }
    const head =
      isRecord(entry) && isRecord(entry.pr) ? str(entry.pr.head_sha) : null;
    if (head === null || str(receipt.head_sha) !== head) {
      continue;
    }
    out[bead_id] = { ok: receipt.ok };
  }
  return out;
}

/**
 * Project one run manifest's cells from the clone beads' own attempt records
 * (§4.7). The manifest is never rewritten, so this — not a stored result — is
 * what "how far has the experiment got" means.
 *
 * Terminality is {@link benchCellTerminal}'s answer, the same one the
 * scheduler's residue sweep asks: a cell is finished when its clone bead is
 * closed AND no attempt of its lineage is resumable. A `parked` cell therefore
 * reads as still running here exactly as it does there.
 *
 * @param {Record<string, any>} manifest
 * @param {string} root_dir
 * @param {{ queueStore?: any, issues?: Record<string, CompareIssueInput> }} [seams]
 * @returns {Record<string, any>}
 */
export function projectBenchRun(manifest, root_dir, seams = {}) {
  /** @type {any} */
  let store = seams.queueStore ?? null;
  if (store === null) {
    try {
      store = getWorkerRuntime().queueStore;
    } catch {
      store = null;
    }
  }
  const issues = isRecord(seams.issues) ? seams.issues : {};
  const cells = Array.isArray(manifest.cells) ? manifest.cells : [];
  const projected = cells.map((/** @type {any} */ cell) => {
    const bead_id = str(cell?.bead_id);
    /** @type {Array<Record<string, any>>} */
    let attempts = [];
    if (
      bead_id !== null &&
      store &&
      typeof store.readAttemptsForBead === 'function'
    ) {
      try {
        attempts = store.readAttemptsForBead(root_dir, bead_id) || [];
      } catch {
        attempts = [];
      }
    }
    const implementations = attempts.filter(
      (attempt) => attempt?.kind !== 'review_session'
    );
    const last = implementations[implementations.length - 1] ?? null;
    const status = last ? str(last.status) : null;
    const issue =
      bead_id !== null && isRecord(issues[bead_id]) ? issues[bead_id] : null;
    return {
      preset_id: str(cell?.preset_id),
      k: typeof cell?.k === 'number' ? cell.k : null,
      bead_id,
      attempt_id: last ? str(last.attempt_id) : null,
      status,
      terminal: benchCellTerminal({
        attempts,
        bead_closed: issue ? str(issue.status) === 'closed' : false
      }),
      done_kind: last ? str(last.done_kind) : null,
      bench_verify:
        last && isRecord(last.bench_verify) ? last.bench_verify : null
    };
  });
  return {
    ...manifest,
    root_dir,
    cell_count: benchRunBeadIds(manifest).length,
    terminal_count: projected.filter((cell) => cell.terminal).length,
    cells: projected
  };
}

/**
 * Every visible workspace's run manifests, newest first (§4.7). Fail-quiet per
 * workspace: a state directory that cannot be listed contributes nothing
 * rather than emptying the list.
 *
 * @param {CompareWorkspaceInput[]} workspaces
 * @param {{ queueStore?: any, list?: typeof listBenchManifests }} [seams]
 * @returns {Array<Record<string, any>>}
 */
export function compareBenchRuns(workspaces, seams = {}) {
  const list = seams.list || listBenchManifests;
  /** @type {Array<Record<string, any>>} */
  const runs = [];
  for (const workspace of Array.isArray(workspaces) ? workspaces : []) {
    /** @type {Array<Record<string, any>>} */
    let manifests = [];
    try {
      manifests = list(workspace.root_dir);
    } catch {
      manifests = [];
    }
    for (const manifest of manifests) {
      runs.push(
        projectBenchRun(manifest, workspace.root_dir, {
          ...(seams.queueStore ? { queueStore: seams.queueStore } : {}),
          issues: isRecord(workspace.issues) ? workspace.issues : {}
        })
      );
    }
  }
  runs.sort(
    (left, right) =>
      Number(right.created_at ?? 0) - Number(left.created_at ?? 0)
  );
  return runs;
}

/**
 * Read every visible workspace into {@link buildCompareModel}'s input shape.
 * The ONLY impure half of this module.
 *
 * @param {{ roots?: string[], queueStore?: any, peek?: (root_dir: string) => any, prObservations?: any }} [seams]
 * @returns {CompareWorkspaceInput[]}
 */
export function collectCompareWorkspaces(seams = {}) {
  const roots = seams.roots || visibleWorkspaceRoots();
  const store = seams.queueStore || getWorkerRuntime().queueStore;
  /** @type {CompareWorkspaceInput[]} */
  const out = [];
  for (const root_dir of roots) {
    /** @type {Array<Record<string, any>>} */
    const attempts = [];
    for (const bead_id of compareBeadIds(root_dir, { queueStore: store })) {
      try {
        // The same union `transferredAttemptsFor` reads: live rows win over the
        // record tree, so a bead mid-flight is never counted twice.
        attempts.push(...store.readAttemptsForBead(root_dir, bead_id));
      } catch {
        // One unreadable bead must not drop the workspace.
      }
    }
    out.push({
      root_dir,
      name: path.basename(root_dir),
      attempts,
      issues: compareIssueIndex(root_dir, seams),
      verify_receipts: compareVerifyReceipts(root_dir, seams)
    });
  }
  return out;
}

/**
 * The `compare-snapshot` payload: collect, then project.
 *
 * The experiment list rides HERE rather than on an op of its own: §3.5
 * enumerates the three ws ops this design adds, and the run manifests are read
 * against the same rows in the same response — which also removes the second
 * `get-compare` the client used to need for its experiment table.
 *
 * @param {unknown} filters
 * @param {{ roots?: string[], queueStore?: any, peek?: (root_dir: string) => any, prObservations?: any, presets?: any[], catalog?: ResolvedCatalog|null, listRuns?: typeof listBenchManifests }} [seams]
 */
export function compareSnapshot(filters, seams = {}) {
  /** @type {any[]} */
  let presets = [];
  if (Array.isArray(seams.presets)) {
    presets = seams.presets;
  } else {
    try {
      presets = getWorkerRuntime().execPresetCoordinator.snapshot().presets;
    } catch {
      presets = [];
    }
  }
  /** @type {ResolvedCatalog|null} */
  let catalog = null;
  if (seams.catalog !== undefined) {
    catalog = seams.catalog;
  } else {
    try {
      catalog = /** @type {ResolvedCatalog} */ (runtimeCatalog());
    } catch {
      catalog = null;
    }
  }
  const workspaces = collectCompareWorkspaces(seams);
  const model = buildCompareModel({ workspaces, presets, catalog, filters });
  return {
    ...model,
    runs: compareBenchRuns(workspaces, {
      ...(seams.queueStore ? { queueStore: seams.queueStore } : {}),
      ...(seams.listRuns ? { list: seams.listRuns } : {})
    }),
    workspaces: workspaces.map((workspace) => ({
      root_dir: workspace.root_dir,
      name: workspace.name
    }))
  };
}
