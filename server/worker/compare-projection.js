/**
 * Compare terminal implementation attempts by preset, orchestration or executor.
 * buildCompareModel is pure; collection reads workspace-owned evidence on demand.
 *
 * @import { ResolvedCatalog } from './runner-catalog.js'
 */
import node_fs from 'node:fs';
import path from 'node:path';
import { projectAttemptUsage } from '../../app/utils/token-usage.js';
import { parseExecReceipt, parseReviewStats } from '../workflow-enrich.js';
import { peekWorkspaceSnapshot } from '../workspace-snapshot-runtime.js';
import { createBeadTimeline } from './bead-timeline.js';
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
 * @property {'preset'|'orchestration'|'impl_actor'} group_by
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
 * @property {string|null} [close_reason]
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
 * @property {Record<string, any[]>} [timeline_events]
 * @property {Record<string, string>} [pr_urls]
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
 * Normalize catalog names before ids, preserving unknown model tokens.
 *
 * @param {string|null} token
 * @param {ResolvedCatalog|null} catalog
 * @returns {string|null}
 */
function modelToken(token, catalog) {
  if (token === null || catalog === null) {
    return token;
  }
  const runner = catalog.model_index[token];
  if (runner) {
    return `${runner}:${token}`;
  }
  for (const [runner_name, entry] of Object.entries(catalog.runners)) {
    for (const [name, model] of Object.entries(entry.models)) {
      if (model.id === token) {
        return `${runner_name}:${name}`;
      }
    }
  }
  return token;
}

/**
 * Infer a preset using only recorded execution axes. Equal top scores remain
 * ambiguous, while candidates preserve every matching name for the UI.
 *
 * @param {{ route: string|null, orch_model: string|null, orch_effort: string|null, impl_actor: ImplActor }} attempt_facts
 * @param {Array<{ id?: string, name?: string, settings?: Record<string, any> }>} presets
 * @param {ResolvedCatalog|null} catalog
 * @returns {{ preset: { id: string, name: string, basis: 'inferred' }|null, candidates: string[] }}
 */
export function presetMatch(attempt_facts, presets, catalog) {
  /** @type {Array<{ id: string, name: string, score: number }>} */
  const matches = [];
  const orch_token = modelToken(attempt_facts.orch_model, catalog);
  const actor_token = modelToken(attempt_facts.impl_actor.model, catalog);
  for (const preset of presets) {
    const settings = isRecord(preset.settings) ? preset.settings : {};
    /** @param {string} key */
    const effectiveValue = (key) =>
      str(
        attempt_facts.route === 'quick_fix'
          ? (settings[`quick_fix_${key}`] ?? settings[key])
          : settings[key]
      );
    const id = str(preset.id);
    const name = str(preset.name);
    if (
      id === null ||
      name === null ||
      orch_token === null ||
      modelToken(effectiveValue('orchestration_model'), catalog) !== orch_token
    ) {
      continue;
    }
    let score = 0;
    if (attempt_facts.orch_effort !== null) {
      const effort = effectiveValue('orchestration_effort');
      if (effort !== attempt_facts.orch_effort) {
        continue;
      }
      score += effort === 'auto' ? 0 : 1;
    }
    if (attempt_facts.impl_actor.kind === 'delegated') {
      const runtime = effectiveValue('impl_runtime');
      const model = effectiveValue('impl_model');
      const actor_runtime =
        actor_token !== null && actor_token.includes(':')
          ? actor_token.split(':')[0]
          : null;
      if (
        (runtime !== 'auto' &&
          (runtime === null || runtime !== actor_runtime)) ||
        (model !== 'auto' &&
          (model === null || modelToken(model, catalog) !== actor_token))
      ) {
        continue;
      }
      score += (runtime === 'auto' ? 0 : 1) + (model === 'auto' ? 0 : 1);
    }
    matches.push({ id, name, score });
  }
  const highest = Math.max(...matches.map((match) => match.score));
  const winners = matches.filter((match) => match.score === highest);
  return {
    preset:
      winners.length === 1
        ? { id: winners[0].id, name: winners[0].name, basis: 'inferred' }
        : null,
    candidates: matches.map((match) => match.name)
  };
}

/**
 * @param {Record<string, any>} attempt
 * @param {CompareIssueInput|null|undefined} issue
 * @returns {string|null}
 */
function attemptRoute(attempt, issue) {
  return (
    str(attempt.exec_values?.route) ??
    str(attempt.route) ??
    str(attempt.bead_snapshot?.route) ??
    str(issue?.route)
  );
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
 * @returns {{ tokens: number, total_cost_usd: number|null, unpriced_leg_count: number, cost_estimated: boolean, partial: boolean, partial_reasons: string[] }|null}
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
  let partial = false;
  const partial_reasons = new Set();
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
    if (summary.partial === true) {
      partial = true;
      for (const reason of Array.isArray(summary.partial_reasons)
        ? summary.partial_reasons
        : []) {
        partial_reasons.add(reason);
      }
    }
  }
  return {
    tokens,
    total_cost_usd: priced ? cost : null,
    unpriced_leg_count: unpriced,
    cost_estimated: estimated,
    partial,
    partial_reasons: [...partial_reasons]
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
    group_by:
      input.group_by === 'orchestration' || input.group_by === 'impl_actor'
        ? input.group_by
        : 'preset',
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
    const impl_actor = implActorOf(attempt.receipt_check);
    const model = str(attempt.model);
    const effort = str(attempt.effort);
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
      route: attemptRoute(attempt, issue),
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
      orchestration: { model, effort },
      impl_actor,
      composition: `${model ?? UNRECORDED}/${effort ?? UNRECORDED} → ${impl_actor.label}`,
      attempt,
      representative: false
    });
  }
  attachBeadLevelFacts(rows, issues, verify_receipts);
  const human_events = humanEventsByAttempt(workspace);
  for (const row of rows) {
    row.outcome = outcomeOf(
      row,
      issues[row.bead_id],
      workspace.pr_urls?.[row.bead_id]
    );
    const summaries = human_events.get(row.attempt_id) || [];
    const review = row.review;
    row.problems = {
      failed: ['failed', 'aborted'].includes(row.outcome.kind),
      retry: row.is_retry,
      review: review !== null && (review.round >= 2 || review.blocking >= 1),
      human:
        row.attempt.halted_auto_advance === true ||
        row.attempt.awaiting_user_present === true ||
        row.status === 'parked' ||
        summaries.length > 0,
      evidence: {
        failed: ['failed', 'aborted'].includes(row.outcome.kind)
          ? row.outcome.evidence
          : null,
        retry:
          str(row.attempt.retry?.origin_attempt_id) ??
          str(row.attempt.resumed_from),
        review:
          review === null
            ? null
            : {
                round: review.round,
                blocking: review.blocking,
                minor: review.minor
              },
        human: summaries
      }
    };
  }
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
    row.representative = true;
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
    filters.routes.length > 0 &&
    (row.route === null || !filters.routes.includes(row.route))
  ) {
    return false;
  }
  return true;
}

/**
 * @param {Record<string, any>} row
 * @param {CompareIssueInput|undefined} issue
 * @param {string|undefined} pr_url
 * @returns {Record<string, any>}
 */
function outcomeOf(row, issue, pr_url) {
  const status = row.status;
  if (COMPARE_FAILED_STATUSES.has(status)) {
    return {
      kind: 'failed',
      evidence: row.cause ?? (status === 'orphaned' ? 'orphaned' : null)
    };
  }
  if (status === 'discarded' || status === 'stopped') {
    return { kind: 'aborted', evidence: status };
  }
  if (status === 'parked' || status === 'waiting') {
    return { kind: status, evidence: null };
  }
  if (status === 'retry_wait' || status === 'superseded') {
    return { kind: 'superseded', evidence: status };
  }
  if (!row.representative) {
    return { kind: 'superseded', evidence: 'later_done' };
  }
  if (
    ['no_delta', 'bench'].includes(row.attempt.done_kind) ||
    /^(refuted:|no-delta:)/u.test(issue?.close_reason ?? '')
  ) {
    return { kind: 'landed', evidence: 'no_change' };
  }
  if (
    isRecord(row.attempt.quickfix_landing) &&
    row.attempt.quickfix_landing.reason === null
  ) {
    return {
      kind: 'landed',
      evidence: 'push',
      head_sha: str(row.attempt.quickfix_landing.head_sha)
    };
  }
  if (issue?.status === 'closed') {
    return {
      kind: 'landed',
      evidence: 'closed',
      ...(pr_url ? { pr_url } : {})
    };
  }
  if (!issue) {
    return { kind: 'unknown', evidence: null };
  }
  return {
    kind: 'in_flight',
    evidence: pr_url ? 'pr_open' : null,
    ...(pr_url ? { pr_url } : {})
  };
}

/**
 * Attribute bead events before row filtering, including nonterminal attempts.
 *
 * @param {CompareWorkspaceInput} workspace
 * @returns {Map<string, string[]>}
 */
function humanEventsByAttempt(workspace) {
  /** @type {Map<string, string[]>} */
  const out = new Map();
  for (const [bead_id, events] of Object.entries(
    workspace.timeline_events || {}
  )) {
    const attempts = workspace.attempts.filter(
      (attempt) =>
        attempt.bead_id === bead_id &&
        (attempt.kind ?? 'implementation') === 'implementation'
    );
    for (const event of events) {
      if (
        !['needs_human', 'queue_hold'].includes(event.kind) &&
        !(
          event.kind === 'session_ended' &&
          str(event.attempt_id) !== null &&
          typeof event.summary === 'string' &&
          event.summary.startsWith('파킹 ·')
        )
      ) {
        continue;
      }
      let attempt_id = str(event.attempt_id);
      if (attempt_id === null) {
        const at = num(event.at);
        if (at === null) {
          continue;
        }
        const containing = attempts
          .filter(
            (attempt) =>
              num(attempt.started_at) !== null &&
              num(attempt.finished_at) !== null &&
              attempt.started_at <= at &&
              at <= attempt.finished_at
          )
          .sort(
            (left, right) =>
              right.started_at - left.started_at ||
              String(right.attempt_id).localeCompare(String(left.attempt_id))
          );
        const preceding = attempts
          .filter(
            (attempt) =>
              num(attempt.finished_at) !== null && attempt.finished_at <= at
          )
          .sort(
            (left, right) =>
              right.finished_at - left.finished_at ||
              String(right.attempt_id).localeCompare(String(left.attempt_id))
          );
        const earliest = attempts
          .filter((attempt) => num(attempt.started_at) !== null)
          .sort(
            (left, right) =>
              left.started_at - right.started_at ||
              String(left.attempt_id).localeCompare(String(right.attempt_id))
          );
        attempt_id = str(
          (containing[0] || preceding[0] || earliest[0])?.attempt_id
        );
      }
      const summary = str(event.summary);
      if (attempt_id !== null && summary !== null) {
        const list = out.get(attempt_id) || [];
        list.push(summary);
        out.set(attempt_id, list);
      }
    }
  }
  return out;
}

/**
 * @param {Array<number|null|undefined>} values
 */
function meanAndMedian(values) {
  const median = medianOf(values);
  let sum = 0;
  for (const value of values) {
    sum += num(value) ?? 0;
  }
  return {
    ...median,
    mean: median.sample === 0 ? null : sum / median.sample
  };
}

/**
 * @param {Array<Record<string, any>>} rows
 * @returns {Record<string, any>}
 */
function aggregateRows(rows) {
  const landed = rows.filter((row) => row.outcome.kind === 'landed').length;
  const judged = rows.filter((row) =>
    ['landed', 'failed', 'aborted'].includes(row.outcome.kind)
  ).length;
  const problem_keys = ['failed', 'retry', 'review', 'human'];
  const problem_count = rows.filter((row) =>
    problem_keys.some((key) => row.problems[key])
  ).length;
  /** @type {Map<string, number>} */
  const compositions = new Map();
  for (const row of rows) {
    compositions.set(
      row.composition,
      (compositions.get(row.composition) || 0) + 1
    );
  }
  return {
    n: rows.length,
    issue_count: new Set(
      rows.map((row) => JSON.stringify([row.root_dir, row.bead_id]))
    ).size,
    compositions: [...compositions]
      .map(([composition, count]) => ({ composition, count }))
      .sort(
        (left, right) =>
          right.count - left.count ||
          left.composition.localeCompare(right.composition)
      ),
    landed,
    judged,
    in_flight: rows.filter((row) =>
      ['in_flight', 'waiting', 'parked'].includes(row.outcome.kind)
    ).length,
    landing_rate: judged === 0 ? null : landed / judged,
    problem_count,
    problem_rate: rows.length === 0 ? null : problem_count / rows.length,
    problems: Object.fromEntries(
      problem_keys.map((key) => [
        key,
        rows.filter((row) => row.problems[key]).length
      ])
    ),
    duration_ms: meanAndMedian(rows.map((row) => row.duration_ms)),
    tokens: meanAndMedian(rows.map((row) => row.usage?.tokens ?? null)),
    cost_usd: {
      ...meanAndMedian(rows.map((row) => row.usage?.total_cost_usd ?? null)),
      partial_count: rows.filter((row) => row.usage?.partial === true).length
    },
    attempt_ids: rows.map((row) => row.attempt_id)
  };
}

/**
 * @param {Record<string, any>} row
 * @param {CompareFilters['group_by']} group_by
 */
function groupIdentity(row, group_by) {
  if (group_by === 'orchestration') {
    const key = `${row.orchestration.model ?? UNRECORDED}/${row.orchestration.effort ?? UNRECORDED}`;
    return { key, name: key, badge: 'none' };
  }
  if (group_by === 'impl_actor') {
    const key =
      row.impl_actor.kind === 'main'
        ? 'main'
        : row.impl_actor.kind === 'missing'
          ? UNRECORDED
          : row.impl_actor.label;
    return { key, name: key, badge: 'none' };
  }
  return row.preset === null
    ? {
        key: `sig:${row.composition}`,
        name: row.composition,
        badge: 'unmatched'
      }
    : {
        key: `preset:${row.preset.id}`,
        name: row.preset.name,
        badge: 'preset'
      };
}

/**
 * @param {Array<Record<string, any>>} groups
 */
function markBest(groups) {
  const eligible = groups.filter((group) => group.n >= 3 && group.judged >= 3);
  for (const metric of ['landing', 'duration', 'cost']) {
    /** @param {Record<string, any>} group */
    const metricValue = (group) =>
      metric === 'landing'
        ? group.landing_rate
        : metric === 'duration'
          ? group.duration_ms.mean
          : group.cost_usd.mean;
    const candidates = eligible.filter((group) => metricValue(group) !== null);
    const values = candidates.map(metricValue);
    const best =
      metric === 'landing' ? Math.max(...values) : Math.min(...values);
    const winners = candidates.filter((group) => metricValue(group) === best);
    if (winners.length === 1) {
      winners[0].best.push(metric);
    }
  }
}

/**
 * @param {Record<string, any>} left
 * @param {Record<string, any>} right
 * @returns {number}
 */
function compareGroups(left, right) {
  const left_rate = num(left.landing_rate);
  const right_rate = num(right.landing_rate);
  if (left_rate !== right_rate) {
    // A group with no judged row sorts last: it is not a zero landing rate, it
    // is an unanswered question.
    if (left_rate === null) {
      return 1;
    }
    if (right_rate === null) {
      return -1;
    }
    return right_rate - left_rate;
  }
  const left_cost = num(left.cost_usd?.mean);
  const right_cost = num(right.cost_usd?.mean);
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
 * Strip private evidence and obsolete main-table fields before serialization.
 *
 * @param {Array<Record<string, any>>} rows
 * @param {boolean} [bench]
 */
function wireRows(rows, bench = false) {
  return rows.map((row) => {
    const rest = { ...row };
    delete rest.attempt;
    delete rest.representative;
    if (!bench) {
      delete rest.verify_source;
    }
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
 * @param {{ workspaces: CompareWorkspaceInput[], presets?: Array<{ id?: string, name?: string, settings?: Record<string, any> }>, catalog?: ResolvedCatalog|null, filters?: unknown, warnings?: string[] }} input
 * @returns {{ rows: Array<Record<string, any>>, groups: Array<Record<string, any>>, bench_rows: Array<Record<string, any>>, summary: Record<string, any>, warnings: string[] }}
 */
export function buildCompareModel(input) {
  const filters = normalizeCompareFilters(input?.filters);
  const presets = Array.isArray(input?.presets) ? input.presets : [];
  const catalog = input?.catalog ?? null;
  const warnings = input.warnings || [];
  /** @type {Array<Record<string, any>>} */
  const rows = [];
  /** @type {Array<Record<string, any>>} */
  const bench_rows = [];
  for (const workspace of Array.isArray(input?.workspaces)
    ? input.workspaces
    : []) {
    for (const row of workspaceRows(workspace, catalog)) {
      row.preset = null;
      row.preset_candidates = [];
      if (!warnings.includes('preset_store_unreadable')) {
        const recorded = row.attempt.exec_preset;
        if (isRecord(recorded) && str(recorded.id) !== null) {
          const current = presets.find((preset) => preset.id === recorded.id);
          row.preset = {
            id: recorded.id,
            name: current
              ? current.name
              : `${str(recorded.name) ?? recorded.id}(삭제됨)`,
            basis: 'recorded',
            deviated_keys: stringList(recorded.deviated_keys)
          };
        } else {
          const match = presetMatch(
            {
              route: row.route,
              orch_model: row.orchestration.model,
              orch_effort: row.orchestration.effort,
              impl_actor: row.impl_actor
            },
            presets,
            catalog
          );
          row.preset =
            match.preset === null
              ? null
              : { ...match.preset, deviated_keys: [] };
          row.preset_candidates = match.candidates;
        }
      }
      if (row.preset !== null) {
        delete row.preset_candidates;
      }
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
  const by_group = new Map();
  for (const row of rows) {
    const { key } = groupIdentity(row, filters.group_by);
    const list = by_group.get(key) || [];
    list.push(row);
    by_group.set(key, list);
  }
  const groups = [...by_group.values()].map((group_rows) => ({
    ...groupIdentity(group_rows[0], filters.group_by),
    ...aggregateRows(group_rows),
    best: []
  }));
  markBest(groups);
  groups.sort(compareGroups);
  return {
    rows: wireRows(rows),
    groups,
    bench_rows: wireRows(sortedRows(bench_rows), true),
    summary: aggregateRows(rows),
    warnings
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
      close_reason: str(issue.close_reason),
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
 * Collect the first PR URL found in queue lane order, then completion intents.
 *
 * @param {string} root_dir
 * @param {any} store
 * @returns {Record<string, string>}
 */
function comparePrUrls(root_dir, store) {
  /** @type {Record<string, string>} */
  const out = {};
  try {
    const queue = store.snapshot(root_dir);
    const lanes = [
      queue.queue,
      ...(queue.serial_lanes || []).map(
        (/** @type {any} */ lane) => lane.entries
      ),
      queue.pr_wait,
      queue.done,
      queue.merge_queue
    ];
    for (const lane of lanes) {
      for (const entry of Array.isArray(lane) ? lane : []) {
        const bead_id = str(entry.bead_id);
        const pr_url = str(entry.pr_url);
        if (
          bead_id !== null &&
          pr_url !== null &&
          !Object.hasOwn(out, bead_id)
        ) {
          out[bead_id] = pr_url;
        }
      }
    }
    for (const [bead_id, intent] of Object.entries(
      queue.completion_intents || {}
    )) {
      const pr_url = str(/** @type {any} */ (intent)?.merge_subject?.pr_url);
      if (pr_url !== null && !Object.hasOwn(out, bead_id)) {
        out[bead_id] = pr_url;
      }
    }
  } catch {
    // An unreadable queue does not discard transferred attempt history.
  }
  return out;
}

/**
 * Read every visible workspace into {@link buildCompareModel}'s input shape.
 * The ONLY impure half of this module.
 *
 * @param {{ roots?: string[], queueStore?: any, peek?: (root_dir: string) => any, prObservations?: any, timeline?: (root_dir: string) => { readTimeline: (bead_id: string) => any[] } }} [seams]
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
    /** @type {Record<string, any[]>} */
    const timeline_events = {};
    try {
      const timeline = seams.timeline
        ? seams.timeline(root_dir)
        : createBeadTimeline({ workspace_root: root_dir });
      for (const bead_id of new Set(
        attempts.map((attempt) => attempt.bead_id)
      )) {
        try {
          timeline_events[bead_id] = timeline
            .readTimeline(bead_id)
            .filter((event) =>
              ['needs_human', 'queue_hold', 'session_ended'].includes(
                event.kind
              )
            );
        } catch {
          // Timeline failures affect human evidence only, never the workspace.
        }
      }
    } catch {
      // A workspace without a readable timeline keeps attempt-local evidence.
    }
    out.push({
      root_dir,
      name: path.basename(root_dir),
      attempts,
      timeline_events,
      pr_urls: comparePrUrls(root_dir, store),
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
 * @param {{ roots?: string[], workspaces?: CompareWorkspaceInput[], queueStore?: any, peek?: (root_dir: string) => any, prObservations?: any, timeline?: (root_dir: string) => { readTimeline: (bead_id: string) => any[] }, presets?: any[], catalog?: ResolvedCatalog|null, listRuns?: typeof listBenchManifests }} [seams]
 */
export function compareSnapshot(filters, seams = {}) {
  /** @type {any[]} */
  let presets = [];
  /** @type {string[]} */
  const warnings = [];
  if (Array.isArray(seams.presets)) {
    presets = seams.presets;
  } else {
    try {
      const snapshot = getWorkerRuntime().execPresetCoordinator.snapshot();
      if (snapshot.read_failed || !Array.isArray(snapshot.presets)) {
        throw new Error('preset_store_unreadable');
      }
      presets = snapshot.presets;
    } catch {
      presets = [];
      warnings.push('preset_store_unreadable');
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
  const workspaces = seams.workspaces || collectCompareWorkspaces(seams);
  const model = buildCompareModel({
    workspaces,
    presets,
    catalog,
    filters,
    warnings
  });
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

/**
 * Prepare ended Codex attempts before projecting the comparison response. The
 * observation store single-flights identical attempts across simultaneous
 * detail and compare requests.
 *
 * @param {unknown} filters - User-selected row restrictions.
 * @param {{ roots?: string[], workspaces?: CompareWorkspaceInput[], queueStore?: any, peek?: (root_dir: string) => any, prObservations?: any, timeline?: (root_dir: string) => { readTimeline: (bead_id: string) => any[] }, presets?: any[], catalog?: ResolvedCatalog|null, listRuns?: typeof listBenchManifests, observations?: ReturnType<typeof import('./session-observation.js').createWorkerSessionObservationStore> }} [seams]
 */
export async function prepareCompareSnapshot(filters, seams = {}) {
  const workspaces = seams.workspaces || collectCompareWorkspaces(seams);
  const normalized = normalizeCompareFilters(filters);
  const observations =
    seams.observations || getWorkerRuntime().workerSessionObservations;
  await Promise.all(
    workspaces.flatMap((workspace) =>
      workspace.attempts
        .filter((attempt) => {
          const issue = workspace.issues?.[attempt.bead_id];
          const bench =
            stringList(issue?.labels).includes(BENCH_LABEL) ||
            isRecord(attempt.bench_verify);
          if (bench) {
            return true;
          }
          return (
            (normalized.root_dirs.length === 0 ||
              normalized.root_dirs.includes(
                path.resolve(workspace.root_dir)
              )) &&
            (normalized.since === null ||
              (Number.isFinite(attempt.finished_at) &&
                attempt.finished_at >= normalized.since)) &&
            (normalized.routes.length === 0 ||
              normalized.routes.includes(attemptRoute(attempt, issue) || ''))
          );
        })
        .map(async (attempt) => {
          await observations.prepareHistorical(workspace.root_dir, attempt);
        })
    )
  );
  const prepared = workspaces.map((workspace) => ({
    ...workspace,
    attempts: workspace.attempts.map((attempt) => {
      const value = observations.get(workspace.root_dir, attempt.attempt_id);
      return value ? { ...attempt, ...value } : attempt;
    })
  }));
  return compareSnapshot(filters, { ...seams, workspaces: prepared });
}
