/**
 * @import { TimelineEvent, TimelineOperation } from './bead-timeline.js'
 */
import { failureSummaryWords } from '../../app/utils/failure-sentences.js';

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
 * Group one bead's history into incidents and pick the failed tile's 경위
 * (UI-lx9o §4.2). Records carrying the same `incident` are one incident; a
 * record without one — every line written before this change — stands alone,
 * because nothing proves which failure it belonged to.
 *
 * The failure incident is the one the attempt's landing names
 * (`quickfix_landing.incident`, else its deploy operation id), else the latest
 * incident holding this attempt's `attempt_failed`. When the history holds no
 * such record the line is made from the attempt's own cause and finish time,
 * so the 경위 always says what failed.
 *
 * @param {TimelineEvent[]} events - The bead's whole history, oldest first.
 * @param {any} attempt - The failed or orphaned attempt the tile shows.
 * @returns {FailureIncidents}
 */
export function failureIncidentLines(events, attempt) {
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
        event.attempt_id === attempt?.attempt_id
    );
    if (holds_failure) {
      failure_index = index;
    }
  }

  /** @type {IncidentLine[]} */
  const lines = keys.map((key) => {
    const speaker = speakerOf(/** @type {TimelineEvent[]} */ (groups.get(key)));
    return {
      event_id: speaker.event_id,
      at: typeof speaker.at === 'number' ? speaker.at : null,
      kind: speaker.kind,
      summary: speaker.summary
    };
  });
  if (failure_index === -1) {
    const cause = typeof attempt?.cause === 'string' ? attempt.cause : null;
    return {
      incidents: [
        ...lines.slice(-INCIDENT_SIDE_LIMIT),
        {
          event_id: `attempt_failed:${String(attempt?.attempt_id ?? '')}:synthesized`,
          at:
            typeof attempt?.finished_at === 'number'
              ? attempt.finished_at
              : null,
          kind: 'attempt_failed',
          summary: `세션 실패 — ${failureSummaryWords(cause)}`,
          failure: true
        }
      ]
    };
  }
  const group = /** @type {TimelineEvent[]} */ (
    groups.get(keys[failure_index])
  );
  const operation = lastOf(
    group,
    (event) => event.kind === 'operation_failed' && Boolean(event.operation)
  )?.operation;
  const recovery = lastOf(
    group,
    (event) => event.kind === 'operation_recovery'
  );
  const after = lines.slice(failure_index + 1);
  return {
    incidents: [
      ...lines.slice(
        Math.max(0, failure_index - INCIDENT_SIDE_LIMIT),
        failure_index
      ),
      { ...lines[failure_index], failure: true },
      ...after.slice(-INCIDENT_SIDE_LIMIT)
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
