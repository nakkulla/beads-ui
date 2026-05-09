export const EXECUTION_LANES = ['quick_edit', 'spec_backed', 'plan'];
export const WORKSPACE_POLICIES = ['current', 'worktree'];
export const BRANCH_POLICIES = ['same', 'feature'];
export const FINISH_ACTIONS = ['direct', 'pr'];
export const REVIEW_PROFILES = ['light', 'standard', 'deep'];
export const DEFAULT_REVIEW_PROFILE_LABEL = 'Default (standard)';
export const REVIEW_RUNTIMES = ['codex', 'claude'];
export const DEFAULT_REVIEW_RUNTIME_LABEL = 'Default (config)';

export const ROUTE_TUPLES = [
  {
    id: 'current_same_direct',
    workspace_policy: 'current',
    branch_policy: 'same',
    finish_action: 'direct',
    label: 'Direct'
  },
  {
    id: 'current_feature_direct',
    workspace_policy: 'current',
    branch_policy: 'feature',
    finish_action: 'direct',
    label: 'Current direct'
  },
  {
    id: 'current_feature_pr',
    workspace_policy: 'current',
    branch_policy: 'feature',
    finish_action: 'pr',
    label: 'Current PR'
  },
  {
    id: 'worktree_feature_direct',
    workspace_policy: 'worktree',
    branch_policy: 'feature',
    finish_action: 'direct',
    label: 'Worktree direct'
  },
  {
    id: 'worktree_feature_pr',
    workspace_policy: 'worktree',
    branch_policy: 'feature',
    finish_action: 'pr',
    label: 'Worktree PR'
  }
];

/** @type {Record<string, string>} */
const SECTION_LABELS = {
  workflow_settings: 'Workflow settings',
  artifacts: 'Artifacts',
  review_gates: 'Review gates',
  freshness: 'Freshness',
  delivery: 'Delivery',
  followup: 'Follow-up',
  human: 'Human blocker'
};
/** @type {Record<string, string>} */
const FIELD_LABELS = {
  execution_lane: 'Execution lane',
  workspace_policy: 'Workspace',
  branch_policy: 'Branch',
  finish_action: 'Finish',
  review_profile: 'Review profile',
  review_runtime: 'Review runtime',
  spec_id: 'Spec',
  plan: 'Plan',
  handoff: 'Handoff',
  status: 'Status',
  verdict: 'Verdict',
  final_source: 'Source',
  external_attempts: 'Attempts',
  reviewed_at_sha: 'Reviewed at SHA',
  content_hash: 'Content hash',
  execution_base_sha: 'Execution base SHA',
  spec_freshness_checked_at_sha: 'Spec freshness SHA',
  plan_freshness_checked_at_sha: 'Plan freshness SHA',
  spec_handoff_at_sha: 'Spec handoff SHA',
  spec_handoff_content_hash: 'Spec handoff hash',
  pr_url: 'PR',
  followup_kind: 'Kind',
  source_repo: 'Source repo',
  source_bead: 'Source bead',
  source_artifact: 'Source artifact',
  source_pr: 'Source PR',
  target_repo: 'Target repo',
  target_paths: 'Target paths',
  required_action: 'Required action',
  human_decision_required: 'Human decision required'
};
const REVIEW_GATES = ['spec', 'plan', 'impl'];

/**
 * @param {unknown} value
 * @returns {string}
 */
function stringValue(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function displayValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  return stringValue(value);
}

/**
 * @param {unknown} value
 * @returns {URL | null}
 */
export function safeWorkflowUrl(value) {
  const raw = stringValue(value);
  if (!raw) {
    return null;
  }

  try {
    const url = new URL(raw);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}

/**
 * @param {Record<string, unknown>} metadata
 * @returns {{ kind: 'valid', id: string, label: string } | { kind: 'invalid' | 'absent', value: null }}
 */
export function deriveRouteTuple(metadata) {
  const workspace_policy = stringValue(metadata.workspace_policy);
  const branch_policy = stringValue(metadata.branch_policy);
  const finish_action = stringValue(metadata.finish_action);
  const has_any = Boolean(workspace_policy || branch_policy || finish_action);

  for (const tuple of ROUTE_TUPLES) {
    if (
      workspace_policy === tuple.workspace_policy &&
      branch_policy === tuple.branch_policy &&
      finish_action === tuple.finish_action
    ) {
      return { kind: 'valid', id: tuple.id, label: tuple.label };
    }
  }

  return has_any
    ? { kind: 'invalid', value: null }
    : { kind: 'absent', value: null };
}

/**
 * @param {Record<string, unknown>} metadata
 * @returns {{ kind: 'default', value: null, label: string } | { kind: 'valid', value: string, label: string } | { kind: 'invalid', value: string, label: string }}
 */
export function deriveReviewProfile(metadata) {
  const review_profile = stringValue(metadata.review_profile);
  if (!review_profile) {
    return {
      kind: 'default',
      value: null,
      label: DEFAULT_REVIEW_PROFILE_LABEL
    };
  }

  if (REVIEW_PROFILES.includes(review_profile)) {
    return { kind: 'valid', value: review_profile, label: review_profile };
  }

  return {
    kind: 'invalid',
    value: review_profile,
    label: 'Invalid review profile'
  };
}

/**
 * @param {Record<string, unknown>} metadata
 * @returns {{ kind: 'default', value: null, label: string } | { kind: 'valid', value: string, label: string } | { kind: 'invalid', value: string, label: string }}
 */
export function deriveReviewRuntime(metadata) {
  const review_runtime = stringValue(metadata.review_runtime);
  if (!review_runtime) {
    return {
      kind: 'default',
      value: null,
      label: DEFAULT_REVIEW_RUNTIME_LABEL
    };
  }

  if (REVIEW_RUNTIMES.includes(review_runtime)) {
    return { kind: 'valid', value: review_runtime, label: review_runtime };
  }

  return {
    kind: 'invalid',
    value: review_runtime,
    label: 'Invalid review runtime'
  };
}

/**
 * @param {unknown} lane
 * @param {unknown} workspace_policy
 * @param {unknown} branch_policy
 * @param {unknown} finish_action
 * @param {unknown} review_profile
 * @param {unknown} review_runtime
 * @returns {{ execution_lane: string, workspace_policy: string, branch_policy: string, finish_action: string, review_profile: string | null, review_runtime: string | null } | null}
 */
export function workflowSettingsMutationValues(
  lane,
  workspace_policy,
  branch_policy,
  finish_action,
  review_profile,
  review_runtime
) {
  const lane_value = stringValue(lane);
  const workspace_value = stringValue(workspace_policy);
  const branch_value = stringValue(branch_policy);
  const finish_value = stringValue(finish_action);
  const profile_value =
    review_profile === null ? '' : stringValue(review_profile);
  const runtime_value =
    review_runtime === null ? '' : stringValue(review_runtime);

  if (!EXECUTION_LANES.includes(lane_value)) {
    return null;
  }

  const route_tuple = deriveRouteTuple({
    workspace_policy: workspace_value,
    branch_policy: branch_value,
    finish_action: finish_value
  });
  if (route_tuple.kind !== 'valid') {
    return null;
  }

  if (profile_value && !REVIEW_PROFILES.includes(profile_value)) {
    return null;
  }

  if (runtime_value && !REVIEW_RUNTIMES.includes(runtime_value)) {
    return null;
  }

  return {
    execution_lane: lane_value,
    workspace_policy: workspace_value,
    branch_policy: branch_value,
    finish_action: finish_value,
    review_profile: profile_value || null,
    review_runtime: runtime_value || null
  };
}

/**
 * @param {string} id
 * @param {unknown} value
 * @param {{ kind?: string, href?: string, label?: string }} [options]
 */
function makeRow(id, value, options = {}) {
  return {
    id,
    label: options.label || FIELD_LABELS[id] || id,
    value: displayValue(value),
    kind: options.kind || 'value',
    href: options.href
  };
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {string} section
 * @param {string[]} fields
 * @param {any} issue
 * @param {Record<string, unknown>} metadata
 * @param {string[]} labels
 * @returns {Array<Record<string, unknown>>}
 */
function buildRowsForSection(section, fields, issue, metadata, labels) {
  switch (section) {
    case 'workflow_settings':
      return buildWorkflowSettingsRows(fields, metadata);
    case 'artifacts':
      return buildArtifactRows(fields, issue, metadata);
    case 'review_gates':
      return buildReviewRows(fields, metadata, labels);
    case 'delivery':
      return buildDeliveryRows(fields, metadata);
    case 'freshness':
    case 'followup':
    case 'human':
      return buildMetadataRows(fields, metadata);
    default:
      return [];
  }
}

/**
 * @param {string} field
 * @param {string} value
 * @param {string[]} allowed
 * @param {boolean} [force_invalid]
 */
function buildEnumRow(field, value, allowed, force_invalid = false) {
  if (allowed.includes(value) && !force_invalid) {
    return makeRow(field, value);
  }
  if (value) {
    return makeRow(field, value, { kind: 'invalid' });
  }
  return null;
}

/**
 * @param {string[]} fields
 * @param {Record<string, unknown>} metadata
 */
function buildWorkflowSettingsRows(fields, metadata) {
  /** @type {Array<Record<string, unknown>>} */
  const rows = [];
  const route_tuple = deriveRouteTuple(metadata);
  const route_invalid = route_tuple.kind === 'invalid';
  for (const field of fields) {
    if (field === 'topology') {
      continue;
    }
    if (field === 'execution_lane') {
      const row = buildEnumRow(
        field,
        stringValue(metadata.execution_lane),
        EXECUTION_LANES
      );
      if (row) {
        rows.push(row);
      }
      continue;
    }
    if (field === 'workspace_policy') {
      const row = buildEnumRow(
        field,
        stringValue(metadata.workspace_policy),
        WORKSPACE_POLICIES,
        route_invalid
      );
      if (row) {
        rows.push(row);
      }
      continue;
    }
    if (field === 'branch_policy') {
      const row = buildEnumRow(
        field,
        stringValue(metadata.branch_policy),
        BRANCH_POLICIES,
        route_invalid
      );
      if (row) {
        rows.push(row);
      }
      continue;
    }
    if (field === 'finish_action') {
      const row = buildEnumRow(
        field,
        stringValue(metadata.finish_action),
        FINISH_ACTIONS,
        route_invalid
      );
      if (row) {
        rows.push(row);
      }
      continue;
    }
    if (field === 'review_profile') {
      const profile = deriveReviewProfile(metadata);
      rows.push(
        makeRow(field, profile.label, {
          kind: profile.kind === 'invalid' ? 'invalid' : 'value'
        })
      );
    }
  }
  return rows;
}

/**
 * @param {string[]} fields
 * @param {any} issue
 * @param {Record<string, unknown>} metadata
 */
function buildArtifactRows(fields, issue, metadata) {
  /** @type {Array<Record<string, unknown>>} */
  const rows = [];
  const values = {
    spec_id: issue?.spec_id,
    plan: metadata.plan,
    handoff: metadata.handoff
  };
  for (const field of fields) {
    const value = displayValue(
      values[/** @type {keyof typeof values} */ (field)]
    );
    if (value) {
      rows.push(makeRow(field, value, { kind: 'artifact' }));
    }
  }
  return rows;
}

/**
 * @param {string[]} fields
 * @param {Record<string, unknown>} metadata
 * @param {string[]} labels
 */
function buildReviewRows(fields, metadata, labels) {
  /** @type {Array<Record<string, unknown>>} */
  const rows = [];
  for (const gate of REVIEW_GATES) {
    for (const field of fields) {
      const row = buildReviewRow(gate, field, metadata, labels);
      if (row) {
        rows.push(row);
      }
    }
  }
  return rows;
}

/**
 * @param {string} gate
 * @param {string} field
 * @param {Record<string, unknown>} metadata
 * @param {string[]} labels
 */
function buildReviewRow(gate, field, metadata, labels) {
  const prefix = `${gate}_review`;
  const reviewed_key = `${gate}_reviewed_at_sha`;
  const content_hash_key = `${gate}_content_hash`;
  if (field === 'status') {
    const reviewed_label = `reviewed:${gate}`;
    if (labels.includes(reviewed_label)) {
      return makeRow(`${gate}_${field}`, reviewed_label, {
        label: `${gate} ${FIELD_LABELS[field]}`
      });
    }
    return null;
  }

  const key_by_field = {
    verdict: `${prefix}_verdict`,
    final_source: `${prefix}_final_source`,
    external_attempts: `${prefix}_external_attempts`,
    reviewed_at_sha: reviewed_key,
    content_hash: content_hash_key
  };
  const key = key_by_field[/** @type {keyof typeof key_by_field} */ (field)];
  const value = key ? displayValue(metadata[key]) : '';
  if (!value) {
    return null;
  }

  return makeRow(`${gate}_${field}`, value, {
    label: `${gate} ${FIELD_LABELS[field] || field}`
  });
}

/**
 * @param {string[]} fields
 * @param {Record<string, unknown>} metadata
 */
function buildDeliveryRows(fields, metadata) {
  /** @type {Array<Record<string, unknown>>} */
  const rows = [];
  for (const field of fields) {
    if (field !== 'pr_url') {
      continue;
    }
    const url = safeWorkflowUrl(metadata.pr_url);
    if (url) {
      rows.push(makeRow(field, 'PR', { kind: 'link', href: url.href }));
    }
  }
  return rows;
}

/**
 * @param {string[]} fields
 * @param {Record<string, unknown>} metadata
 */
function buildMetadataRows(fields, metadata) {
  /** @type {Array<Record<string, unknown>>} */
  const rows = [];
  for (const field of fields) {
    const value = displayValue(metadata[field]);
    if (value) {
      rows.push(makeRow(field, value));
    }
  }
  return rows;
}

/**
 * @param {any} issue
 * @param {any} workflow_config
 * @returns {Array<{ id: string, label: string, rows: Array<Record<string, unknown>>, editable_fields: string[] }>}
 */
export function buildWorkflowSections(issue, workflow_config) {
  const metadata = isRecord(issue?.metadata) ? issue.metadata : {};
  const labels = Array.isArray(issue?.labels) ? issue.labels : [];
  const sections = Array.isArray(workflow_config?.sections)
    ? workflow_config.sections
    : [];
  /** @type {Array<{ id: string, label: string, rows: Array<Record<string, unknown>>, editable_fields: string[] }>} */
  const result = [];

  for (const section of sections) {
    const fields = Array.isArray(workflow_config?.[section]?.fields)
      ? workflow_config[section].fields
      : [];
    const editable_fields = Array.isArray(
      workflow_config?.[section]?.editable_fields
    )
      ? workflow_config[section].editable_fields
      : [];
    const rows = buildRowsForSection(section, fields, issue, metadata, labels);
    if (rows.length > 0) {
      result.push({
        id: section,
        label: SECTION_LABELS[section] || section,
        rows,
        editable_fields
      });
    }
  }

  return result;
}
