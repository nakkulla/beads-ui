/**
 * Worker tab selector utilities.
 */

const PROGRESS_WEIGHTS = {
  open: 0,
  in_progress: 0.5,
  resolved: 0.85,
  closed: 1
};

const ACTIVE_JOB_STATUSES = new Set([
  'queued',
  'starting',
  'running',
  'cancelling'
]);

const STATUS_SORT_ORDER = {
  in_progress: 0,
  open: 1,
  resolved: 2,
  closed: 3
};

/**
 * @typedef {{
 *   id: string,
 *   title?: string,
 *   status?: string,
 *   priority?: number,
 *   issue_type?: string,
 *   parent?: string,
 *   spec_id?: string,
 *   updated_at?: number | string,
 *   created_at?: number | string,
 *   dependents?: WorkerIssue[],
 *   total_children?: number,
 *   open_pr_count?: number
 * }} WorkerIssue
 */

/**
 * @typedef {{
 *   id?: string,
 *   issue_id?: string,
 *   issueId?: string,
 *   parent_id?: string,
 *   parentId?: string,
 *   status?: string,
 *   elapsedMs?: number,
 *   errorSummary?: string,
 *   isCancellable?: boolean
 * }} WorkerJob
 */

/**
 * @typedef {{
 *   is_parent?: boolean,
 *   has_spec_id?: boolean,
 *   has_active_job?: boolean,
 *   workspace_is_valid?: boolean
 * }} RunnableContext
 */

/**
 * @typedef {{
 *   jobs?: WorkerJob[],
 *   workspace_is_valid?: boolean,
 *   open_pr_ids_by_parent?: Record<string, string[]>,
 *   show_closed_children?: string[]
 * }} BuildWorkerOptions
 */

/**
 * @typedef {{
 *   id?: string,
 *   search?: string,
 *   status?: string,
 *   runnable_only?: boolean,
 *   has_open_pr_only?: boolean
 * }} WorkerFilters
 */

/**
 * @param {number | string | undefined} value
 * @returns {number}
 */
function toTimestamp(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }
  if (typeof value === 'string') {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

/**
 * @param {string | undefined} status
 * @returns {number}
 */
function weightForStatus(status) {
  if (status && status in PROGRESS_WEIGHTS) {
    return PROGRESS_WEIGHTS[
      /** @type {'open'|'in_progress'|'resolved'|'closed'} */ (status)
    ];
  }
  return 0;
}

/**
 * @param {string | undefined} status
 * @returns {number}
 */
function statusRank(status) {
  if (status && status in STATUS_SORT_ORDER) {
    return STATUS_SORT_ORDER[
      /** @type {'open'|'in_progress'|'resolved'|'closed'} */ (status)
    ];
  }
  return Number.MAX_SAFE_INTEGER;
}

/**
 * @param {WorkerIssue} issue
 * @returns {boolean}
 */
function hasSpecId(issue) {
  return typeof issue.spec_id === 'string' && issue.spec_id.trim().length > 0;
}

/**
 * @param {WorkerIssue} issue
 * @returns {boolean}
 */
function isTopLevelParentCandidate(issue) {
  return (
    (!issue.parent || issue.parent.length === 0) &&
    (issue.issue_type === 'feature' || issue.issue_type === 'epic')
  );
}

/**
 * @param {WorkerJob} job
 * @returns {string}
 */
function getJobParentId(job) {
  if (typeof job.parent_id === 'string' && job.parent_id.length > 0) {
    return job.parent_id;
  }
  if (typeof job.parentId === 'string' && job.parentId.length > 0) {
    return job.parentId;
  }
  if (typeof job.issue_id === 'string' && job.issue_id.length > 0) {
    return job.issue_id;
  }
  return typeof job.issueId === 'string' ? job.issueId : '';
}

/**
 * @param {string} parent_id
 * @param {WorkerJob[]} jobs
 * @returns {WorkerJob[]}
 */
function selectParentJobs(parent_id, jobs) {
  return jobs.filter((job) => getJobParentId(job) === parent_id);
}

/**
 * @param {string} parent_id
 * @param {WorkerJob[]} jobs
 * @returns {boolean}
 */
function hasActiveJob(parent_id, jobs) {
  return selectParentJobs(parent_id, jobs).some(
    (job) =>
      typeof job.status === 'string' && ACTIVE_JOB_STATUSES.has(job.status)
  );
}

/**
 * @param {number | undefined} elapsed_ms
 * @returns {string}
 */
export function formatElapsedMs(elapsed_ms) {
  if (!elapsed_ms || elapsed_ms <= 0) {
    return '0s';
  }
  const total_seconds = Math.floor(elapsed_ms / 1000);
  const minutes = Math.floor(total_seconds / 60);
  const seconds = total_seconds % 60;
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

/**
 * @param {string[]} statuses
 * @returns {number}
 */
export function computeProgressFromStatuses(statuses) {
  if (!Array.isArray(statuses) || statuses.length === 0) {
    return 0;
  }
  const total = statuses.reduce(
    (sum, status) => sum + weightForStatus(status),
    0
  );
  return Math.round((total / statuses.length) * 100);
}

/**
 * @param {WorkerIssue} parent
 * @param {RunnableContext} context
 * @returns {boolean}
 */
export function isRunnableParent(parent, context) {
  const is_parent = context.is_parent ?? false;
  const has_spec_id =
    context.has_spec_id !== undefined ? context.has_spec_id : hasSpecId(parent);
  const has_active_job = context.has_active_job ?? false;
  const workspace_is_valid = context.workspace_is_valid ?? false;
  return (
    is_parent &&
    has_spec_id &&
    !has_active_job &&
    workspace_is_valid &&
    String(parent.status || '') !== 'closed'
  );
}

/**
 * @param {WorkerIssue} parent
 * @param {WorkerIssue[]} children
 * @param {BuildWorkerOptions} [options]
 */
export function buildWorkerParentViewModel(parent, children, options = {}) {
  const show_closed_children = Array.isArray(options.show_closed_children)
    ? options.show_closed_children
    : [];
  const visible_children =
    show_closed_children.includes(parent.id) ||
    show_closed_children.includes('*')
      ? children.slice()
      : children.filter((child) => child.status !== 'closed');
  const hidden_closed_count = children.filter(
    (child) => child.status === 'closed'
  ).length;
  const statuses = children.map((child) => String(child.status || 'open'));
  const jobs = Array.isArray(options.jobs) ? options.jobs : [];
  const parent_jobs = selectParentJobs(parent.id, jobs);
  const current_job =
    parent_jobs.find(
      (job) =>
        typeof job.status === 'string' && ACTIVE_JOB_STATUSES.has(job.status)
    ) || null;
  const recent_jobs = current_job
    ? parent_jobs.slice(1, 4)
    : parent_jobs.slice(0, 3);
  const active_job = current_job !== null;
  const open_pr_count = Array.isArray(
    options.open_pr_ids_by_parent?.[parent.id]
  )
    ? options.open_pr_ids_by_parent[parent.id].length
    : Number(parent.open_pr_count || 0);
  const counts = {
    open: children.filter((child) => child.status === 'open').length,
    in_progress: children.filter((child) => child.status === 'in_progress')
      .length,
    resolved: children.filter((child) => child.status === 'resolved').length,
    closed: children.filter((child) => child.status === 'closed').length
  };
  const runnable = isRunnableParent(parent, {
    is_parent: true,
    has_spec_id: hasSpecId(parent),
    has_active_job: active_job,
    workspace_is_valid: options.workspace_is_valid ?? false
  });

  return {
    ...parent,
    children: children.slice(),
    visible_children,
    hidden_closed_count,
    child_counts: counts,
    progress_percent: computeProgressFromStatuses(statuses),
    current_job,
    current_job_elapsed_label: formatElapsedMs(current_job?.elapsedMs),
    recent_jobs,
    has_active_job: active_job,
    has_open_pr: open_pr_count > 0,
    open_pr_count,
    runnable
  };
}

/**
 * @param {WorkerIssue[]} issues
 * @param {BuildWorkerOptions} [options]
 */
export function buildWorkerParents(issues, options = {}) {
  /** @type {Map<string, WorkerIssue[]>} */
  const children_by_parent = new Map();
  /** @type {Map<string, WorkerIssue>} */
  const issue_by_id = new Map();

  for (const issue of issues) {
    issue_by_id.set(issue.id, issue);
    if (typeof issue.parent === 'string' && issue.parent.length > 0) {
      const children = children_by_parent.get(issue.parent) || [];
      children.push(issue);
      children_by_parent.set(issue.parent, children);
    }
  }

  /** @type {ReturnType<typeof buildWorkerParentViewModel>[]} */
  const parents = [];
  for (const issue of issues) {
    const direct_children = children_by_parent.get(issue.id) || [];
    const dependent_children = Array.isArray(issue.dependents)
      ? issue.dependents.filter((child) => !!child?.id)
      : [];
    /** @type {WorkerIssue[]} */
    const merged_children = [];
    if (direct_children.length > 0) {
      merged_children.push(...direct_children);
    } else {
      for (const child of dependent_children) {
        if (!issue_by_id.has(child.id)) {
          merged_children.push({ ...child, parent: issue.id });
        }
      }
    }
    const jobs = Array.isArray(options.jobs) ? options.jobs : [];
    const open_pr_count = Array.isArray(
      options.open_pr_ids_by_parent?.[issue.id]
    )
      ? options.open_pr_ids_by_parent[issue.id].length
      : Number(issue.open_pr_count || 0);
    const is_parent =
      merged_children.length > 0 ||
      (typeof issue.total_children === 'number' && issue.total_children > 0) ||
      hasActiveJob(issue.id, jobs) ||
      open_pr_count > 0 ||
      (isTopLevelParentCandidate(issue) && hasSpecId(issue));
    if (!is_parent) {
      continue;
    }
    parents.push(buildWorkerParentViewModel(issue, merged_children, options));
  }

  parents.sort(compareWorkerParents);
  return parents;
}

/**
 * @param {ReturnType<typeof buildWorkerParentViewModel>} a
 * @param {ReturnType<typeof buildWorkerParentViewModel>} b
 * @returns {number}
 */
function compareWorkerParents(a, b) {
  if (a.has_active_job !== b.has_active_job) {
    return a.has_active_job ? -1 : 1;
  }
  if (a.runnable !== b.runnable) {
    return a.runnable ? -1 : 1;
  }
  const status_diff = statusRank(a.status) - statusRank(b.status);
  if (status_diff !== 0) {
    return status_diff;
  }
  const priority_diff = (a.priority ?? 2) - (b.priority ?? 2);
  if (priority_diff !== 0) {
    return priority_diff;
  }
  const time_diff =
    toTimestamp(b.updated_at ?? b.created_at) -
    toTimestamp(a.updated_at ?? a.created_at);
  if (time_diff !== 0) {
    return time_diff;
  }
  return String(a.id).localeCompare(String(b.id));
}

/**
 * @param {ReturnType<typeof buildWorkerParentViewModel>[]} items
 * @param {WorkerFilters} [filters]
 */
export function filterWorkerParents(items, filters = {}) {
  const search = String(filters.search || '')
    .trim()
    .toLowerCase();
  const status = String(filters.status || 'all');

  return items.filter((item) => {
    if (status !== 'all' && String(item.status || '') !== status) {
      return false;
    }
    if (filters.runnable_only && !item.runnable) {
      return false;
    }
    if (filters.has_open_pr_only && !item.has_open_pr) {
      return false;
    }
    if (search.length > 0) {
      const haystack =
        `${String(item.id)} ${String(item.title || '')}`.toLowerCase();
      if (!haystack.includes(search)) {
        return false;
      }
    }
    return true;
  });
}
