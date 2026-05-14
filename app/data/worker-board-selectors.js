import { parseSortKey } from '../utils/queue-sort.js';

const ACTIVE_STATUSES = new Set([
  'queued',
  'starting',
  'running',
  'cancelling'
]);
const FINAL_FAILURE_STATUSES = new Set(['failed', 'cancelled']);
const LANES = ['inbox', 'waiting', 'progress', 'done'];

/**
 * @typedef {'inbox'|'waiting'|'progress'|'done'} WorkerLane
 */

/**
 * @param {any} issue
 * @returns {Record<string, unknown>}
 */
function metadataOf(issue) {
  return issue?.metadata && typeof issue.metadata === 'object'
    ? issue.metadata
    : {};
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isTrue(value) {
  return String(value || '').toLowerCase() === 'true';
}

/**
 * @param {any} issue
 * @returns {boolean}
 */
function hasSpec(issue) {
  return typeof issue.spec_id === 'string' && issue.spec_id.trim().length > 0;
}

/**
 * @param {any} job
 * @returns {string}
 */
function jobIssueId(job) {
  return job.issueId || job.issue_id || job.parentId || job.parent_id || '';
}

/**
 * @param {any} job
 * @returns {boolean}
 */
function isActiveJob(job) {
  return ACTIVE_STATUSES.has(String(job?.status || ''));
}

/**
 * @param {any} job
 * @returns {boolean}
 */
function isTerminalFailureJob(job) {
  return (
    FINAL_FAILURE_STATUSES.has(String(job?.status || '')) ||
    job?.wasForceKilled === true
  );
}

/**
 * @param {any} job
 * @returns {string}
 */
function jobFinishedAt(job) {
  return job?.finishedAt || job?.finished_at || '';
}

/**
 * @param {any} issue
 * @param {Date} now
 * @param {'today'|'3'|'7'} done_filter
 * @param {any[]} jobs
 * @returns {boolean}
 */
function isDone(issue, now, done_filter, jobs) {
  if (metadataOf(issue).worker_lane === 'inbox') {
    return false;
  }
  const terminal_job = jobs
    .filter((job) => jobIssueId(job) === issue.id && isTerminalFailureJob(job))
    .sort(
      (a, b) =>
        Date.parse(jobFinishedAt(b) || '0') -
        Date.parse(jobFinishedAt(a) || '0')
    )[0];
  const status_done = issue.status === 'resolved' || issue.status === 'closed';
  if (!status_done && !terminal_job) {
    return false;
  }
  const days = done_filter === '7' ? 7 : done_filter === '3' ? 3 : 1;
  const since = new Date(now);
  since.setHours(0, 0, 0, 0);
  if (days > 1) {
    since.setDate(since.getDate() - (days - 1));
  }
  const done_at = terminal_job
    ? Date.parse(jobFinishedAt(terminal_job))
    : Date.parse(issue.closed_at || issue.updated_at || issue.created_at || '');
  return !Number.isFinite(done_at) || done_at >= since.getTime();
}

/**
 * @param {any} issue
 * @param {{ jobs?: any[], now?: Date, done_filter?: 'today'|'3'|'7' }} options
 * @returns {WorkerLane}
 */
export function deriveWorkerLane(issue, options = {}) {
  const metadata = metadataOf(issue);
  const jobs = Array.isArray(options.jobs) ? options.jobs : [];
  const now = options.now || new Date();
  const done_filter = options.done_filter || 'today';
  if (
    jobs.some((job) => jobIssueId(job) === issue.id && isActiveJob(job)) ||
    metadata.worker_pr_review_wait_started_at
  ) {
    return 'progress';
  }
  if (metadata.worker_lane === 'waiting') {
    return 'waiting';
  }
  if (metadata.worker_lane === 'inbox') {
    return 'inbox';
  }
  if (isDone(issue, now, done_filter, jobs)) {
    return 'done';
  }
  return 'inbox';
}

/**
 * @param {any} issue
 * @param {{ jobs?: any[], now?: Date, done_filter?: 'today'|'3'|'7' }} options
 */
export function buildWorkerCard(issue, options = {}) {
  const metadata = metadataOf(issue);
  const jobs = Array.isArray(options.jobs) ? options.jobs : [];
  const active_job =
    jobs.find((job) => jobIssueId(job) === issue.id && isActiveJob(job)) ||
    null;
  const phase =
    active_job?.phase ||
    (metadata.worker_pr_review_wait_started_at ? 'goal' : null);
  const sub_state = metadata.worker_pr_review_wait_started_at
    ? 'pr_review_wait'
    : phase === 'pr_finish'
      ? 'pr_finish_running'
      : active_job
        ? 'goal_running'
        : null;
  /** @type {any[]} */
  const children = Array.isArray(issue.children) ? issue.children : [];
  const child_total = children.length;
  const child_done =
    child_total === 0
      ? 0
      : children.filter(
          (child) => child.status === 'resolved' || child.status === 'closed'
        ).length;
  return {
    ...issue,
    metadata,
    lane: deriveWorkerLane(issue, { ...options, jobs }),
    sort_key: parseSortKey(
      typeof metadata.worker_queue_sort_key === 'string'
        ? metadata.worker_queue_sort_key
        : undefined
    ),
    parallel: isTrue(metadata.worker_parallel),
    model:
      typeof metadata.worker_model === 'string' ? metadata.worker_model : '',
    effort:
      typeof metadata.worker_effort === 'string' ? metadata.worker_effort : '',
    prNumber: metadata.pr_number
      ? Number.parseInt(String(metadata.pr_number), 10)
      : null,
    prUrl: typeof metadata.pr_url === 'string' ? metadata.pr_url : '',
    active_job,
    phase,
    sub_state,
    child_total,
    child_done
  };
}

/**
 * @param {any[]} parents
 * @param {{ jobs?: any[], now?: Date, done_filter?: 'today'|'3'|'7' }} options
 */
export function buildWorkerBoard(parents, options = {}) {
  /** @type {Record<WorkerLane, Array<ReturnType<typeof buildWorkerCard>>>} */
  const board = { inbox: [], waiting: [], progress: [], done: [] };
  for (const parent of parents) {
    const card = buildWorkerCard(parent, options);
    const lane = /** @type {WorkerLane} */ (card.lane);
    board[lane].push(card);
  }
  board.waiting.sort(
    (a, b) =>
      a.sort_key - b.sort_key || String(a.id).localeCompare(String(b.id))
  );
  board.inbox.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  board.progress.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  board.done.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  return board;
}

/**
 * @param {any} card
 * @param {string} from_lane
 * @param {string} to_lane
 * @param {{ serial_busy?: boolean }} context
 */
export function canMoveWorkerCard(card, from_lane, to_lane, context = {}) {
  if (!LANES.includes(to_lane)) {
    return { ok: false, reason: 'Invalid worker lane' };
  }
  if (
    from_lane === 'progress' &&
    (to_lane === 'inbox' || to_lane === 'waiting')
  ) {
    return { ok: false, reason: 'Cancel first' };
  }
  if ((to_lane === 'waiting' || to_lane === 'progress') && !hasSpec(card)) {
    return { ok: false, reason: 'Spec required to enter queue' };
  }
  if (
    to_lane === 'progress' &&
    context.serial_busy &&
    !isTrue(metadataOf(card).worker_parallel)
  ) {
    return {
      ok: false,
      reason: 'Serial slot busy. Mark as parallel or wait.'
    };
  }
  return { ok: true };
}
