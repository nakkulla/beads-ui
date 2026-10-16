/**
 * Read-only, cross-workspace incident aggregation for the self-improvement job.
 *
 * @import { Request, Response } from 'express'
 * @import { TimelineEvent } from './bead-timeline.js'
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { runBdJsonProjected } from '../bd.js';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import { classifyFailure } from './failure-class.js';
import {
  attemptRecordPath,
  beadTimelinePath,
  beadsRootDir,
  queueFilePath
} from './state-paths.js';
import {
  recoveryResultLineReasons,
  workRecoveryClassification,
  workRecoveryReady
} from './work-recovery-policy.js';

/**
 * @typedef {Object} Incident
 * @property {string} fp
 * @property {string} kind
 * @property {string} cause_head
 * @property {string} tier
 * @property {string|null} env_group
 * @property {number} count
 * @property {{ workspace_root: string, bead_id: string }[]} beads
 * @property {string} first_at
 * @property {string} last_at
 * @property {{ attempt_id: string|null, at: string, summary: string, events_path: string }[]} samples
 * @property {boolean} transient
 * @property {boolean} self_origin
 * @property {boolean} recurred_after_fix
 */

/**
 * @param {string} file
 * @returns {Record<string, any>|null}
 */
function readRecord(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    if (/** @type {NodeJS.ErrnoException} */ (err).code === 'ENOENT') {
      return null;
    }
    throw err;
  }
}

/**
 * @param {string} dir
 * @returns {import('node:fs').Dirent[]}
 */
function entriesIn(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    if (/** @type {NodeJS.ErrnoException} */ (err).code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

/**
 * Read errors must reach the caller before it advances the incident watermark.
 * Keep the timeline's first-event deduplication and torn-line tolerance.
 *
 * @param {string} file
 * @returns {TimelineEvent[]}
 */
function readEvents(file) {
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch (err) {
    if (/** @type {NodeJS.ErrnoException} */ (err).code === 'ENOENT') {
      return [];
    }
    throw err;
  }
  /** @type {Map<string, TimelineEvent>} */
  const events = new Map();
  for (const line of text.split('\n')) {
    if (!line.trim()) {
      continue;
    }
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      continue;
    }
    if (
      event &&
      typeof event.event_id === 'string' &&
      event.event_id.length > 0 &&
      !events.has(event.event_id)
    ) {
      events.set(event.event_id, event);
    }
  }
  return [...events.values()];
}

/**
 * @param {unknown} value
 */
function timestamp(value) {
  return typeof value === 'number'
    ? value
    : typeof value === 'string'
      ? Date.parse(value)
      : NaN;
}

/**
 * Join the permanent records with the live queue without initializing a store:
 * store initialization can migrate or persist state, which a GET must not do.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @param {Record<string, any>} live_attempts
 */
function readAttempts(workspace_root, bead_id, live_attempts) {
  /** @type {Map<string, Record<string, any>>} */
  const attempts = new Map();
  const dir = path.dirname(attemptRecordPath(workspace_root, bead_id, 'probe'));
  for (const entry of entriesIn(dir)) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) {
      continue;
    }
    const record = readRecord(path.join(dir, entry.name));
    if (record?.bead_id === bead_id && typeof record.attempt_id === 'string') {
      attempts.set(record.attempt_id, record);
    }
  }
  for (const record of Object.values(live_attempts)) {
    if (record?.bead_id === bead_id && typeof record.attempt_id === 'string') {
      attempts.set(record.attempt_id, record);
    }
  }
  return attempts;
}

/**
 * Timeline failures carry human summaries, so the machine cause comes from
 * their attempt record. Guard denials already carry their own reason code.
 *
 * @param {TimelineEvent} event
 * @param {Record<string, any>|undefined} attempt
 */
function incidentFields(event, attempt) {
  if (event.kind === 'guard_denied') {
    return {
      cause_head: event.reason || 'unknown',
      tier: 'individual',
      env_group: null
    };
  }
  const cause = typeof attempt?.cause === 'string' ? attempt.cause : 'unknown';
  const cause_head = cause.split(':').slice(0, 2).join(':');
  const env_pattern = attempt?.cause_detail?.env_pattern;
  if (typeof env_pattern === 'string' || env_pattern === null) {
    return { cause_head, tier: 'env', env_group: env_pattern };
  }
  const classification = classifyFailure({
    cause,
    cause_detail: attempt?.cause_detail,
    ...(workRecoveryReady()
      ? {
          recovery: {
            classify: workRecoveryClassification,
            resultLineReasons: recoveryResultLineReasons
          }
        }
      : {}),
    ...(attempt?.status === 'waiting' ? { tier_hint: 'waiting' } : {})
  });
  return {
    cause_head,
    tier: classification.tier,
    env_group: classification.env_group
  };
}

/**
 * @param {{ since: string, carry?: string[] }} input
 * @param {{ now?: () => number }} [options]
 */
export async function collectWorkerIncidents(input, options = {}) {
  // Pin the watermark before reading files, so an append racing this scan is
  // still inside the next consumer window.
  const through = (options.now || Date.now)();
  const since = Date.parse(input.since);
  const carry = new Set(input.carry || []);
  const roots = [
    ...new Set(
      getAvailableWorkspaces().map((entry) => path.resolve(entry.path))
    )
  ].sort();
  /** @type {Map<string, Record<string, any>[]>} */
  const issues_by_root = new Map();
  /** @type {Map<string, number>} */
  const fixed_at = new Map();
  for (const root of roots) {
    const result = await runBdJsonProjected(
      'list',
      ['list', '--json', '--tree=false', '--all', '--limit', '0'],
      { cwd: root }
    );
    if (!result.ok) {
      throw new Error(`incident metadata read failed: ${root}`);
    }
    issues_by_root.set(root, result.data);
    for (const issue of result.data) {
      const fp = issue.metadata?.incident_fp;
      const closed_at = timestamp(issue.closed_at);
      if (
        issue.status === 'closed' &&
        typeof fp === 'string' &&
        Number.isFinite(closed_at) &&
        closed_at <= through
      ) {
        fixed_at.set(fp, Math.min(fixed_at.get(fp) ?? Infinity, closed_at));
      }
    }
  }

  /** @type {Map<string, Incident>} */
  const incidents = new Map();
  for (const workspace_root of roots) {
    const queue = readRecord(queueFilePath(workspace_root));
    const issues = new Map(
      (issues_by_root.get(workspace_root) || []).map((issue) => [
        issue.id,
        issue
      ])
    );
    for (const entry of entriesIn(beadsRootDir(workspace_root))) {
      if (!entry.isDirectory()) {
        continue;
      }
      const bead_id = entry.name;
      const attempts = readAttempts(
        workspace_root,
        bead_id,
        queue?.attempts || {}
      );
      const events = readEvents(beadTimelinePath(workspace_root, bead_id));
      for (const event of events) {
        if (
          !['attempt_failed', 'guard_denied'].includes(event.kind) ||
          !Number.isFinite(event.at) ||
          event.at > through
        ) {
          continue;
        }
        const attempt = attempts.get(event.attempt_id || '');
        const fields = incidentFields(event, attempt);
        const fp = createHash('sha256')
          .update(
            `${event.kind}|${fields.cause_head}|${fields.env_group || ''}`
          )
          .digest('hex')
          .slice(0, 12);
        if (event.at < since && !carry.has(fp)) {
          continue;
        }
        const at = new Date(event.at).toISOString();
        let incident = incidents.get(fp);
        if (!incident) {
          incident = {
            fp,
            kind: event.kind,
            ...fields,
            count: 0,
            beads: [],
            first_at: at,
            last_at: at,
            samples: [],
            transient: fields.tier === 'env',
            self_origin: false,
            recurred_after_fix: false
          };
          incidents.set(fp, incident);
        }
        incident.count += 1;
        if (
          !incident.beads.some(
            (bead) =>
              bead.workspace_root === workspace_root && bead.bead_id === bead_id
          )
        ) {
          incident.beads.push({ workspace_root, bead_id });
        }
        incident.first_at = at < incident.first_at ? at : incident.first_at;
        incident.last_at = at > incident.last_at ? at : incident.last_at;
        incident.samples.push({
          attempt_id: event.attempt_id || null,
          at,
          summary: event.summary,
          events_path: beadTimelinePath(workspace_root, bead_id)
        });
        incident.samples.sort((left, right) => right.at.localeCompare(left.at));
        incident.samples.length = Math.min(3, incident.samples.length);
        incident.transient &&= [...attempts.values()].some(
          (candidate) =>
            candidate.attempt_id !== event.attempt_id &&
            candidate.status === 'done' &&
            timestamp(candidate.finished_at) > event.at &&
            timestamp(candidate.finished_at) <= through
        );
        incident.self_origin ||= Boolean(
          issues.get(bead_id)?.metadata?.self_improvement_from
        );
        incident.recurred_after_fix ||=
          event.at > (fixed_at.get(fp) ?? Infinity);
      }
    }
  }
  return {
    schema_version: 1,
    since: input.since,
    through: new Date(through).toISOString(),
    fingerprints: [...incidents.values()].sort((left, right) =>
      left.fp.localeCompare(right.fp)
    )
  };
}

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function workerIncidentsHandler(req, res) {
  res.set('Cache-Control', 'no-store');
  const since = req.query.since;
  const carry = req.query.carry;
  if (
    typeof since !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(
      since
    ) ||
    !Number.isFinite(Date.parse(since)) ||
    (carry !== undefined &&
      (typeof carry !== 'string' ||
        !/^[a-f0-9]{12}(?:,[a-f0-9]{12})*$/.test(carry)))
  ) {
    res
      .status(400)
      .json({ error: 'Expected since=ISO8601 and optional carry=fp,...' });
    return;
  }
  try {
    res.json(
      await collectWorkerIncidents({
        since,
        carry: typeof carry === 'string' ? carry.split(',') : []
      })
    );
  } catch {
    res.status(503).json({ error: 'Worker incident history is unavailable' });
  }
}
