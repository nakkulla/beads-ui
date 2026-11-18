/**
 * @import { TimelineEvent, TimelineOperation } from './bead-timeline.js'
 */
import {
  OPERATION_KIND_WORDS,
  failureSummaryWords,
  reportedFailureSummary
} from '../../app/utils/failure-sentences.js';

/**
 * How many incident lines the failed tile's 경위 shows on each side of the
 * failure itself (UI-lx9o §4.2): the three incidents just before it and the
 * three most recent after it.
 *
 * @type {number}
 */
const INCIDENT_SIDE_LIMIT = 3;

/**
 * Which record of one incident speaks for it, most telling first: the
 * operation failure names the script, the landing step where it stopped, the
 * attempt failure what the session saw, and the recovery line only how it was
 * classified.
 *
 * @type {readonly string[]}
 */
const SPEAKER_ORDER = Object.freeze([
  'operation_failed',
  'landing_step',
  'attempt_failed',
  'operation_recovery'
]);

/**
 * @typedef {Object} IncidentLine
 * @property {string} event_id
 * @property {number|null} at
 * @property {string} kind
 * @property {string} summary
 * @property {true} [failure] - The incident that failed this attempt.
 */

/**
 * @typedef {Object} FailureIncidents
 * @property {IncidentLine[]} incidents - Oldest first.
 * @property {TimelineOperation} [failure_operation]
 * @property {{ summary: string, code?: string }} [failure_recovery]
 */

/**
 * @param {TimelineEvent[]} group
 * @returns {TimelineEvent}
 */
function speakerOf(group) {
  for (const kind of SPEAKER_ORDER) {
    const found = group.find((event) => event.kind === kind);
    if (found) {
      return found;
    }
  }
  return group[0];
}

/**
 * @param {TimelineEvent[]} group
 * @param {(event: TimelineEvent) => boolean} test
 * @returns {TimelineEvent|undefined}
 */
function lastOf(group, test) {
  for (let index = group.length - 1; index >= 0; index -= 1) {
    if (test(group[index])) {
      return group[index];
    }
  }
  return undefined;
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function nonEmpty(value) {
  return typeof value === 'string' && value.length > 0;
}

/**
 * The repo operation facts a failed card's cause line and badge read
 * (UI-lx9o §4.3), from one operation and the failure it settled with: the
 * kind, the exit code, the script's own error summary (never a code or a
 * sentence made from one, {@link reportedFailureSummary}), whether the
 * automatic retry was spent, and — only when both runs' log evidence was
 * confirmed, as the recovery classification requires — whether the retry
 * failed the same way. `null` for an operation kind the card has no word for.
 *
 * The coordinator calls it when it writes the `operation_failed` line, and the
 * snapshot calls it on the stored record when a failure's history carries no
 * facts, so the two can never say different things about one run.
 *
 * @param {any} operation - The operation; its `retry` is the consumed retry.
 * @param {any} failure - The failure the run settled with.
 * @param {unknown} exit_code
 * @returns {TimelineOperation|null}
 */
export function repoOperationFacts(operation, failure, exit_code) {
  const kind = operation?.kind;
  if (typeof kind !== 'string' || !Object.hasOwn(OPERATION_KIND_WORDS, kind)) {
    return null;
  }
  const summary = reportedFailureSummary(failure?.summary, failure?.code);
  const retry = operation?.retry;
  const retry_exhausted = Array.isArray(retry?.consumed_key);
  const retry_same_error =
    retry_exhausted &&
    nonEmpty(failure?.fingerprint) &&
    retry.first_failure?.fingerprint === failure.fingerprint &&
    retry.first_failure?.evidence_confirmed === true &&
    failure.evidence_confirmed === true;
  return {
    kind,
    ...(Number.isInteger(exit_code)
      ? { exit_code: /** @type {number} */ (exit_code) }
      : {}),
    ...(summary.length > 0 ? { summary } : {}),
    ...(retry_exhausted ? { retry_exhausted: true } : {}),
    ...(retry_same_error ? { retry_same_error: true } : {})
  };
}

/**
 * The facts of the failed repo operation a failure incident names, read from
 * the stored record (UI-lx9o §4.3) — for a line written before the history
 * carried them, or a failure whose `operation_failed` line is missing.
 *
 * @param {Record<string, any>|null|undefined} repo_operations
 * @param {Array<string|null>} operation_ids - Candidates, first match wins.
 * @returns {TimelineOperation|null}
 */
function storedOperationFacts(repo_operations, operation_ids) {
  for (const operation_id of operation_ids) {
    if (operation_id === null || !repo_operations) {
      continue;
    }
    const record = Object.hasOwn(repo_operations, operation_id)
      ? repo_operations[operation_id]
      : null;
    if (!record || typeof record !== 'object' || !record.failure) {
      continue;
    }
    return repoOperationFacts(record, record.failure, record.exit_code);
  }
  return null;
}

/**
 * Group one bead's history into incidents and pick the failed tile's 경위
 * (UI-lx9o §4.2). Records carrying the same `incident` are one incident; a
 * record without one — every line written before this change — stands alone,
 * because nothing proves which failure it belonged to.
 *
 * The failure incident is the one the attempt's landing names
 * (`quickfix_landing.incident`, else its deploy operation id), else the latest
 * incident holding this attempt's `attempt_failed`. When the landing names an
 * incident the history lacks, an `attempt_failed` only counts when it is not
 * older than the attempt's finish — an earlier failure of the same attempt (a
 * previous cleanup retry) is not this one. Without such a record the line is
 * made from the attempt's own cause and finish time and placed at that time,
 * so the 경위 always says what failed.
 *
 * Lines are ordered by the time they show (a line without a time keeps its
 * place after the one before it), then the failure line, the three before it
 * and the three most recent after it are kept.
 *
 * @param {TimelineEvent[]} events - The bead's whole history, oldest first.
 * @param {any} attempt - The failed or orphaned attempt the tile shows.
 * @param {Record<string, any>|null} [repo_operations] - The stored repo
 * operation records, for the facts a failure's history does not carry.
 * @returns {FailureIncidents}
 */
export function failureIncidentLines(events, attempt, repo_operations = null) {
  /** @type {Map<string, TimelineEvent[]>} */
  const groups = new Map();
  for (const event of events) {
    if (!event || !nonEmpty(event.summary)) {
      continue;
    }
    const key = nonEmpty(event.incident)
      ? `incident:${event.incident}`
      : `event:${event.event_id}`;
    const group = groups.get(key);
    if (group) {
      group.push(event);
    } else {
      groups.set(key, [event]);
    }
  }
  const keys = [...groups.keys()];
  const landing = attempt?.quickfix_landing;
  const named_incident = nonEmpty(landing?.incident)
    ? landing.incident
    : nonEmpty(landing?.deploy_operation_id)
      ? landing.deploy_operation_id
      : null;
  const finished_at =
    typeof attempt?.finished_at === 'number' ? attempt.finished_at : null;
  let failure_index =
    named_incident === null ? -1 : keys.indexOf(`incident:${named_incident}`);
  for (
    let index = keys.length - 1;
    failure_index === -1 && index >= 0;
    index -= 1
  ) {
    const holds_failure = /** @type {TimelineEvent[]} */ (
      groups.get(keys[index])
    ).some(
      (event) =>
        event.kind === 'attempt_failed' &&
        event.attempt_id === attempt?.attempt_id &&
        (named_incident === null ||
          (finished_at !== null &&
            typeof event.at === 'number' &&
            event.at >= finished_at))
    );
    if (holds_failure) {
      failure_index = index;
    }
  }

  /** @type {Array<{ line: IncidentLine, at: number }>} */
  const timed = [];
  let previous_at = -Infinity;
  for (const [index, key] of keys.entries()) {
    const speaker = speakerOf(/** @type {TimelineEvent[]} */ (groups.get(key)));
    const at = typeof speaker.at === 'number' ? speaker.at : null;
    previous_at = at ?? previous_at;
    timed.push({
      line: {
        event_id: speaker.event_id,
        at,
        kind: speaker.kind,
        summary: speaker.summary,
        ...(index === failure_index
          ? { failure: /** @type {true} */ (true) }
          : {})
      },
      at: previous_at
    });
  }
  /** @type {TimelineEvent[]} */
  const group =
    failure_index === -1
      ? []
      : /** @type {TimelineEvent[]} */ (groups.get(keys[failure_index]));
  if (failure_index === -1) {
    const cause = typeof attempt?.cause === 'string' ? attempt.cause : null;
    timed.push({
      line: {
        event_id: `attempt_failed:${String(attempt?.attempt_id ?? '')}:synthesized`,
        at: finished_at,
        kind: 'attempt_failed',
        summary: `세션 실패 — ${failureSummaryWords(cause)}`,
        failure: true
      },
      at: finished_at ?? Infinity
    });
  }
  // Array sort is stable, so equal times keep their recorded order and the
  // made-up failure line stands after the lines of its own moment.
  const lines = timed
    .sort((left, right) => left.at - right.at)
    .map((entry) => entry.line);
  const shown_index = lines.findIndex((line) => line.failure === true);

  const operation =
    lastOf(
      group,
      (event) => event.kind === 'operation_failed' && Boolean(event.operation)
    )?.operation ??
    storedOperationFacts(repo_operations, [
      failure_index === -1 ? null : incidentOf(group),
      named_incident
    ]);
  const recovery = lastOf(
    group,
    (event) => event.kind === 'operation_recovery'
  );
  return {
    incidents: [
      ...lines.slice(
        Math.max(0, shown_index - INCIDENT_SIDE_LIMIT),
        shown_index
      ),
      lines[shown_index],
      ...lines.slice(shown_index + 1).slice(-INCIDENT_SIDE_LIMIT)
    ],
    ...(operation ? { failure_operation: operation } : {}),
    ...(recovery
      ? {
          failure_recovery: {
            summary: recovery.summary,
            ...(nonEmpty(recovery.code) ? { code: recovery.code } : {})
          }
        }
      : {})
  };
}

/**
 * The incident id a group of records shares, or null for a lone old record.
 *
 * @param {TimelineEvent[]} group
 * @returns {string|null}
 */
function incidentOf(group) {
  const incident = group[0]?.incident;
  return nonEmpty(incident) ? incident : null;
}
