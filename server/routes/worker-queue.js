/**
 * The session-facing HTTP entry points onto the Worker queue (UI-1gpj §3).
 *
 * Lane placement used to be browser-WS only, so a session that had just written
 * a spec could not put the bead anywhere. These two routes expose exactly what
 * the WS channel already exposed — read the waiting lanes, run the existing
 * `place` — and nothing else: which lane suits a bead stays a session judgement
 * (ADR 0009), never a server one.
 *
 * @import { Request, Response } from 'express'
 * @import { Queue } from '../worker/queue-store.js'
 */
import path from 'node:path';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import { placeBeadInQueue } from '../worker/queue-place.js';
import { getWorkerRuntime } from '../worker/runtime.js';

/**
 * Resolve a request-supplied `root_dir` to a workspace key.
 *
 * Same rule as `ws/workspace-target.js` — absolute, resolved BEFORE the
 * comparison so a `..` segment cannot smuggle a path past an allow list built
 * from resolved entries, and present in the registry. HTTP has no connected
 * workspace to fall back on, so an absent value is a rejection rather than a
 * default.
 *
 * @param {unknown} raw
 * @returns {string|null} The absolute workspace key, or `null` when the request
 * named a directory it may not touch.
 */
function workspaceKeyOf(raw) {
  if (typeof raw !== 'string' || raw.length === 0 || !path.isAbsolute(raw)) {
    return null;
  }
  const resolved = path.resolve(raw);
  /** @type {Set<string>} */
  let allowed;
  try {
    allowed = new Set(
      getAvailableWorkspaces().map((workspace) => path.resolve(workspace.path))
    );
  } catch {
    // An unreadable registry cannot vouch for anything, and fail-closed is the
    // only safe direction for a path check.
    return null;
  }
  return allowed.has(resolved) ? resolved : null;
}

/**
 * @param {unknown} entries
 * @returns {{ bead_id: string, added_at: number }[]}
 */
function projectEntries(entries) {
  return (Array.isArray(entries) ? entries : []).map((entry) => ({
    bead_id: entry.bead_id,
    added_at: entry.added_at
  }));
}

/**
 * The waiting lanes, parallel first, serial lanes truncated to the configured
 * count (UI-16b8 §4's cut: a lane beyond `serial_lane_count` is inert storage,
 * not a place anything may be put).
 *
 * @param {Queue} queue
 */
function projectLanes(queue) {
  const serial_lanes = Array.isArray(queue.serial_lanes)
    ? queue.serial_lanes
    : [];
  const count =
    typeof queue.serial_lane_count === 'number' ? queue.serial_lane_count : 0;
  return [
    { id: 'parallel', entries: projectEntries(queue.queue) },
    ...serial_lanes
      .slice(0, count)
      .map((lane) => ({ id: lane.id, entries: projectEntries(lane.entries) }))
  ];
}

/**
 * Beads holding a lane RIGHT NOW, one row per bead.
 *
 * `status === 'running'` is the whole test: a paused attempt keeps that status
 * (the pause lives in `control`) and keeps its lane binding, which is exactly
 * the occupancy a session must see before it picks a serial lane. When a bead
 * has several such attempts the LAST insertion wins, matching how every other
 * reader here resolves "this bead's latest attempt".
 *
 * @param {Queue} queue
 * @returns {{ bead_id: string, serial_lane_id: string|null }[]}
 */
function projectRunning(queue) {
  /** @type {Map<string, string|null>} */
  const by_bead = new Map();
  const attempts =
    queue.attempts && typeof queue.attempts === 'object' ? queue.attempts : {};
  for (const attempt of Object.values(attempts)) {
    if (attempt.status !== 'running') {
      continue;
    }
    by_bead.set(attempt.bead_id, attempt.serial_lane_id ?? null);
  }
  return [...by_bead].map(([bead_id, serial_lane_id]) => ({
    bead_id,
    serial_lane_id
  }));
}

/**
 * @param {Queue} queue
 * @returns {{ bead_id: string, serial_lane_id: string|null }[]}
 */
function projectPrWait(queue) {
  return (Array.isArray(queue.pr_wait) ? queue.pr_wait : []).map((entry) => ({
    bead_id: entry.bead_id,
    serial_lane_id: entry.serial_lane_id ?? null
  }));
}

/**
 * GET /api/worker/queue?root_dir=<abs>
 *
 * Projects the queue snapshot a session needs to choose a lane: the waiting
 * lanes plus who is occupying a serial lane without waiting in it (`running`,
 * `pr_wait`). Derived entirely from the existing snapshot — no new durable
 * field backs any of it.
 *
 * @param {Request} req
 * @param {Response} res
 */
export function workerQueueGetHandler(req, res) {
  const workspace_key = workspaceKeyOf(req.query.root_dir);
  if (workspace_key === null) {
    res.status(400).json({ ok: false, error: 'bad_request' });
    return;
  }
  const queue = getWorkerRuntime().queueStore.snapshot(workspace_key);
  res.set('Cache-Control', 'no-store');
  res.status(200).json({
    ok: true,
    revision: queue.revision,
    serial_lane_count: queue.serial_lane_count,
    lanes: projectLanes(queue),
    running: projectRunning(queue),
    pr_wait: projectPrWait(queue)
  });
}

/**
 * POST /api/worker/queue/place
 *
 * Body `{ root_dir, bead_id, lane?, index?, expected_revision }`. Runs the same
 * shared body the WS mutation runs, so a session placement is indistinguishable
 * from a drag in the Worker tab — including the fanout every subscriber sees.
 *
 * `expected_revision` is REQUIRED here, unlike the WS payload's tolerant
 * default: the session chose this seat from a snapshot it fetched separately,
 * so a revision that moved in between invalidates the judgement, not just the
 * ordering.
 *
 * @param {Request} req
 * @param {Response} res
 */
export async function workerQueuePlaceHandler(req, res) {
  const body = /** @type {any} */ (req.body || {});
  const workspace_key = workspaceKeyOf(body.root_dir);
  const lane_ok =
    body.lane === undefined ||
    (typeof body.lane === 'string' && /^(parallel|s[1-5])$/.test(body.lane));
  if (
    workspace_key === null ||
    typeof body.bead_id !== 'string' ||
    body.bead_id.length === 0 ||
    !lane_ok ||
    !Number.isInteger(body.expected_revision) ||
    (body.index !== undefined && !Number.isInteger(body.index))
  ) {
    res.status(400).json({ ok: false, error: 'bad_request' });
    return;
  }
  const outcome = await placeBeadInQueue(workspace_key, {
    bead_id: body.bead_id,
    lane: body.lane,
    index: body.index,
    expected_revision: body.expected_revision
  });
  res.set('Cache-Control', 'no-store');
  if (typeof outcome.admission_reason === 'string') {
    res.status(200).json({
      ok: true,
      applied: false,
      conflict: false,
      admission_reason: outcome.admission_reason
    });
    return;
  }
  if (!outcome.applied) {
    res.status(200).json(
      outcome.conflict
        ? {
            ok: true,
            applied: false,
            conflict: true,
            revision: outcome.queue.revision
          }
        : { ok: true, applied: false, conflict: false, reason: 'rejected' }
    );
    return;
  }
  res.status(200).json({
    ok: true,
    applied: true,
    lane: outcome.lane,
    index: outcome.index,
    revision: outcome.queue.revision
  });
}
