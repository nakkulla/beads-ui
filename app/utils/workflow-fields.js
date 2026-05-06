const EXECUTION_LANES = ['quick_edit', 'spec_backed', 'plan'];
const TOPOLOGIES = {
  direct: {
    workspace_policy: 'current',
    branch_policy: 'same',
    finish_action: 'direct'
  },
  pr: {
    workspace_policy: 'worktree',
    branch_policy: 'feature',
    finish_action: 'pr'
  }
};
/** @type {Record<string, string>} */
const SECTION_LABELS = {
  route: 'Route',
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
  topology: 'Topology',
  workspace_policy: 'Workspace',
  branch_policy: 'Branch',
  finish_action: 'Finish',
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
 * @returns {{ kind: 'valid', value: string } | { kind: 'invalid' | 'absent', value: null }}
 */
export function deriveTopology(metadata) {
  const workspace_policy = stringValue(metadata.workspace_policy);
  const branch_policy = stringValue(metadata.branch_policy);
  const finish_action = stringValue(metadata.finish_action);
  const has_any = Boolean(workspace_policy || branch_policy || finish_action);

  for (const [name, values] of Object.entries(TOPOLOGIES)) {
    if (
      workspace_policy === values.workspace_policy &&
      branch_policy === values.branch_policy &&
      finish_action === values.finish_action
    ) {
      return { kind: 'valid', value: name };
    }
  }

  return has_any
    ? { kind: 'invalid', value: null }
    : { kind: 'absent', value: null };
}

/**
 * @param {unknown} lane
 * @param {unknown} topology
 * @returns {{ execution_lane: string, topology: string } | null}
 */
export function routeMutationValues(lane, topology) {
  const lane_value = String(lane);
  const topology_value = String(topology);
  if (
    !EXECUTION_LANES.includes(lane_value) ||
    !Object.prototype.hasOwnProperty.call(TOPOLOGIES, topology_value)
  ) {
    return null;
  }

  return { execution_lane: lane_value, topology: topology_value };
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
    case 'route':
      return buildRouteRows(fields, metadata);
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
 * @param {string[]} fields
 * @param {Record<string, unknown>} metadata
 */
function buildRouteRows(fields, metadata) {
  /** @type {Array<Record<string, unknown>>} */
  const rows = [];
  for (const field of fields) {
    if (field === 'execution_lane') {
      const lane = stringValue(metadata.execution_lane);
      if (EXECUTION_LANES.includes(lane)) {
        rows.push(makeRow(field, lane));
      }
      continue;
    }
    if (field === 'topology') {
      const topology = deriveTopology(metadata);
      if (topology.kind === 'valid') {
        rows.push(makeRow(field, topology.value));
      } else if (topology.kind === 'invalid') {
        rows.push(
          makeRow(field, 'Invalid route metadata', { kind: 'invalid' })
        );
      }
      continue;
    }
    const value = displayValue(metadata[field]);
    if (value) {
      rows.push(makeRow(field, value));
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
