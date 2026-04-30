/**
 * @typedef {'plan'|'quick_edit'} ExecutionLane
 * @typedef {'none'|'writing_skills'|'skill_creator'} SkillWorkflow
 * @typedef {'lane'|'skill'|'pr'} WorkflowChipKind
 * @typedef {{ label: string, value: string, kind?: 'link', href?: string }} WorkflowDetailRow
 * @typedef {{ label: string, kind: WorkflowChipKind }} WorkflowBoardChip
 * @typedef {{ detail_rows: WorkflowDetailRow[], board_chips: WorkflowBoardChip[] }} WorkflowSummary
 */

/**
 * @param {unknown} value
 */
export function normalizeExecutionLane(value) {
  if (value === 'plan' || value === 'quick_edit') {
    return value;
  }

  return null;
}

/**
 * @param {unknown} value
 */
export function normalizeSkillWorkflow(value) {
  if (
    value === 'none' ||
    value === 'writing_skills' ||
    value === 'skill_creator'
  ) {
    return value;
  }

  return null;
}

/**
 * @param {unknown} value
 */
export function parseWorkflowTimestamp(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const timestamp_ms = Date.parse(value);
  return Number.isFinite(timestamp_ms) ? timestamp_ms : null;
}

/**
 * @param {number} timestamp_ms
 */
export function formatWorkflowTimestamp(timestamp_ms) {
  const date = new Date(timestamp_ms);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * @param {number | null} started_ms
 * @param {number | null} finished_ms
 */
export function formatWorkflowDuration(started_ms, finished_ms) {
  if (
    typeof started_ms !== 'number' ||
    typeof finished_ms !== 'number' ||
    !Number.isFinite(started_ms) ||
    !Number.isFinite(finished_ms) ||
    finished_ms < started_ms
  ) {
    return null;
  }

  const duration_seconds = Math.floor((finished_ms - started_ms) / 1000);
  if (duration_seconds < 60) {
    return `${duration_seconds}s`;
  }

  const duration_minutes = Math.floor(duration_seconds / 60);
  const seconds = duration_seconds % 60;
  if (duration_minutes < 60) {
    return `${duration_minutes}m ${seconds}s`;
  }

  const duration_hours = Math.floor(duration_minutes / 60);
  const minutes = duration_minutes % 60;
  if (duration_hours < 24) {
    return `${duration_hours}h ${minutes}m`;
  }

  const days = Math.floor(duration_hours / 24);
  const hours = duration_hours % 24;
  return `${days}d ${hours}h`;
}

/**
 * @param {unknown} value
 */
export function safeWorkflowUrl(value) {
  if (typeof value !== 'string') {
    return null;
  }

  try {
    const url = new URL(value);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return url;
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * @param {unknown} value
 */
function formatPrNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(Math.trunc(value));
  }

  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  return /^\d+$/.test(trimmed) ? trimmed : '';
}

/**
 * @param {unknown} issue
 * @returns {WorkflowSummary}
 */
export function workflowSummaryFromIssue(issue) {
  const metadata =
    issue && typeof issue === 'object'
      ? /** @type {{ metadata?: Record<string, unknown> }} */ (issue).metadata
      : undefined;
  const source = metadata && typeof metadata === 'object' ? metadata : {};

  const started_ms = parseWorkflowTimestamp(source.run_started_at);
  const finished_ms = parseWorkflowTimestamp(source.run_finished_at);
  const duration = formatWorkflowDuration(started_ms, finished_ms);
  const pr_url = safeWorkflowUrl(source.pr_url);
  const pr_number = formatPrNumber(source.pr_number);
  const execution_lane = normalizeExecutionLane(source.execution_lane);
  const skill_workflow = normalizeSkillWorkflow(source.skill_workflow);

  /** @type {WorkflowDetailRow[]} */
  const detail_rows = [];
  if (duration) {
    detail_rows.push({ label: 'Duration', value: duration });
  }
  if (started_ms !== null) {
    detail_rows.push({
      label: 'Started',
      value: formatWorkflowTimestamp(started_ms)
    });
  }
  if (finished_ms !== null) {
    detail_rows.push({
      label: 'Finished',
      value: formatWorkflowTimestamp(finished_ms)
    });
  }
  if (pr_url) {
    detail_rows.push({
      label: 'PR',
      value: pr_number ? `PR #${pr_number}` : 'PR',
      kind: 'link',
      href: pr_url.href
    });
  }
  if (execution_lane) {
    detail_rows.push({ label: 'Lane', value: execution_lane });
  }
  if (skill_workflow) {
    detail_rows.push({ label: 'Skill workflow', value: skill_workflow });
  }

  /** @type {WorkflowBoardChip[]} */
  const board_chips = [];
  if (execution_lane) {
    board_chips.push({ label: execution_lane, kind: 'lane' });
  }
  if (skill_workflow && skill_workflow !== 'none') {
    board_chips.push({ label: skill_workflow, kind: 'skill' });
  }
  if (pr_url) {
    board_chips.push({ label: 'PR', kind: 'pr' });
  }

  return { detail_rows, board_chips };
}
