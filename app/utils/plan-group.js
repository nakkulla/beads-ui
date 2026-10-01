/**
 * plan 묶음 모델 (UI-ruwu §1): the issues one full_plan landing produced.
 *
 * A confirmed plan lands as several top-level issues that share `plan_path` and
 * each carry their own `metadata.plan_task_anchor` (`Phase <a>` or
 * `Phase <a>-<b>`). This module groups an issue array by `plan_path` and keeps
 * only the groups whose members can be ordered unambiguously.
 *
 * It is a pure, node-free module so the server projections and the browser read
 * one definition of "이 이슈는 어느 plan 묶음의 몇 번째인가" — the same
 * precedent as `app/utils/scope-overlap.js`. Reading is all it does; the
 * contract keys `plan_path` and `plan_task_anchor` are a code-registry subset
 * of the dotfiles workflow contract (ADR UI-u6ud-2) and a missing or malformed
 * key means "no group" rather than an error (fail-quiet).
 */

/**
 * @typedef {Object} PlanGroupMember
 * @property {string} id
 * @property {string} anchor - Trimmed `plan_task_anchor`, e.g. `Phase 2-3`.
 * @property {string} status
 * @property {string[]} blocked_by - Open `blocks` blocker ids; empty when unknown.
 */

/**
 * @typedef {Object} PlanGroupSummary
 * @property {string} plan_path
 * @property {string} slug
 * @property {Array<PlanGroupMember & { first_phase: number }>} members - Ordered by `first_phase`.
 */

/**
 * The per-row projection: the group plus where this row stands in it.
 *
 * @typedef {Object} PlanGroup
 * @property {string} plan_path
 * @property {string} slug
 * @property {number} index - 1-based position of the row among `members`.
 * @property {number} total - `members.length`.
 * @property {PlanGroupMember[]} members
 */

const ANCHOR_RE = /^Phase (\d+)(?:-(\d+))?$/;
const SLUG_DATE_PREFIX_RE = /^\d{4}-\d{2}-\d{2}-/;

/**
 * Parse `Phase <a>` or `Phase <a>-<b>` (integers, b > a).
 *
 * @param {unknown} value
 * @returns {{ first_phase: number, last_phase: number } | null}
 */
export function parsePlanTaskAnchor(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const match = ANCHOR_RE.exec(value.trim());
  if (!match) {
    return null;
  }
  const first_phase = Number(match[1]);
  const last_phase = match[2] === undefined ? first_phase : Number(match[2]);
  if (!Number.isSafeInteger(first_phase) || !Number.isSafeInteger(last_phase)) {
    return null;
  }
  if (match[2] !== undefined && last_phase <= first_phase) {
    return null;
  }
  return { first_phase, last_phase };
}

/**
 * The plan file name without its `YYYY-MM-DD-` prefix and `.md` suffix.
 *
 * @param {string} plan_path
 * @returns {string}
 */
export function planGroupSlug(plan_path) {
  const base = plan_path.slice(plan_path.lastIndexOf('/') + 1);
  const without_ext = base.replace(/\.md$/, '');
  const slug = without_ext.replace(SLUG_DATE_PREFIX_RE, '');
  return slug.length > 0 ? slug : without_ext;
}

/**
 * Group an issue array by `metadata.plan_path`. A `plan_path` yields a group
 * only when at least two issues share it, every one of them has a valid
 * `plan_task_anchor`, and no two Phase ranges overlap; otherwise the WHOLE
 * `plan_path` is omitted. Closed, deferred or otherwise filtered members still
 * count, so the order and total do not move while the plan is worked.
 *
 * @param {ReadonlyArray<unknown>} issues
 * @param {(id: string) => string[]} [blockedByOf] - Open blocker ids of one issue.
 * @returns {Map<string, PlanGroupSummary>} Keyed by `plan_path`.
 */
export function buildPlanGroups(issues, blockedByOf) {
  /** @type {Map<string, Array<Record<string, any>>>} */
  const by_path = new Map();
  /** @type {Set<string>} */
  const seen_ids = new Set();
  for (const raw of issues) {
    if (!raw || typeof raw !== 'object') {
      continue;
    }
    const issue = /** @type {Record<string, any>} */ (raw);
    const id = typeof issue.id === 'string' ? issue.id : '';
    const meta = issue.metadata;
    if (
      id.length === 0 ||
      seen_ids.has(id) ||
      !meta ||
      typeof meta !== 'object'
    ) {
      continue;
    }
    const plan_path =
      typeof meta.plan_path === 'string' ? meta.plan_path.trim() : '';
    if (plan_path.length === 0) {
      continue;
    }
    seen_ids.add(id);
    const bucket = by_path.get(plan_path);
    if (bucket) {
      bucket.push(issue);
    } else {
      by_path.set(plan_path, [issue]);
    }
  }

  /** @type {Map<string, PlanGroupSummary>} */
  const groups = new Map();
  for (const [plan_path, bucket] of by_path) {
    if (bucket.length < 2) {
      continue;
    }
    /** @type {Array<PlanGroupMember & { first_phase: number, last_phase: number }>} */
    const members = [];
    for (const issue of bucket) {
      const anchor = parsePlanTaskAnchor(issue.metadata.plan_task_anchor);
      if (!anchor) {
        break;
      }
      members.push({
        id: issue.id,
        anchor: issue.metadata.plan_task_anchor.trim(),
        first_phase: anchor.first_phase,
        last_phase: anchor.last_phase,
        status: typeof issue.status === 'string' ? issue.status : '',
        blocked_by: blockedByOf ? [...blockedByOf(issue.id)] : []
      });
    }
    if (members.length !== bucket.length) {
      continue;
    }
    members.sort((a, b) => a.first_phase - b.first_phase);
    let overlapped = false;
    for (let i = 1; i < members.length; i += 1) {
      if (members[i - 1].last_phase >= members[i].first_phase) {
        overlapped = true;
        break;
      }
    }
    if (overlapped) {
      continue;
    }
    groups.set(plan_path, {
      plan_path,
      slug: planGroupSlug(plan_path),
      members: members.map((member) => ({
        id: member.id,
        anchor: member.anchor,
        first_phase: member.first_phase,
        status: member.status,
        blocked_by: member.blocked_by
      }))
    });
  }
  return groups;
}

/**
 * Bead id to its row-level `plan_group`, for every member of every valid group.
 *
 * @param {ReadonlyArray<unknown>} issues
 * @param {(id: string) => string[]} [blockedByOf]
 * @returns {Map<string, PlanGroup>}
 */
export function buildPlanGroupIndex(issues, blockedByOf) {
  /** @type {Map<string, PlanGroup>} */
  const index = new Map();
  for (const group of buildPlanGroups(issues, blockedByOf).values()) {
    const members = group.members.map((member) => ({
      id: member.id,
      anchor: member.anchor,
      status: member.status,
      blocked_by: member.blocked_by
    }));
    group.members.forEach((member, position) => {
      index.set(member.id, {
        plan_path: group.plan_path,
        slug: group.slug,
        index: position + 1,
        total: members.length,
        members
      });
    });
  }
  return index;
}
