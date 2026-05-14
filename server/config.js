import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseToml } from 'smol-toml';
import { debug } from './logging.js';

const log = debug('config');
const DEFAULT_VISIBLE_PREFIXES = ['has:', 'reviewed:'];
/** @type {string[]} */
const DEFAULT_VISIBLE_EXACT = [];
const HEX_COLOR_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const DEFAULT_WORKSPACE_CONFIG = {
  default_workspace: null,
  scan_roots: [],
  workspaces: []
};
export const DEFAULT_WORKER_CONFIG = Object.freeze({
  default_model: 'gpt-5.5',
  default_effort: 'high',
  pr_review_wait_ms: 300000,
  advance_delay_ms: 60000
});
const WORKER_EFFORTS = new Set(['low', 'medium', 'high']);
const WORKFLOW_SECTION_FIELDS = {
  workflow_settings: [
    'execution_lane',
    'workspace_policy',
    'branch_policy',
    'finish_action',
    'review_profile',
    'review_runtime'
  ],
  artifacts: ['spec_id', 'plan', 'handoff'],
  review_gates: [
    'status',
    'verdict',
    'final_source',
    'external_attempts',
    'reviewed_at_sha',
    'content_hash'
  ],
  freshness: [
    'execution_base_sha',
    'spec_freshness_checked_at_sha',
    'plan_freshness_checked_at_sha',
    'spec_handoff_at_sha',
    'spec_handoff_content_hash'
  ],
  delivery: ['pr_url'],
  followup: [
    'followup_kind',
    'source_repo',
    'source_bead',
    'source_artifact',
    'source_pr',
    'target_repo',
    'target_paths',
    'required_action'
  ],
  human: ['human_decision_required']
};
const WORKFLOW_SECTIONS = Object.keys(WORKFLOW_SECTION_FIELDS);
const EDITABLE_WORKFLOW_FIELDS = {
  workflow_settings: [
    'execution_lane',
    'workspace_policy',
    'branch_policy',
    'finish_action',
    'review_profile',
    'review_runtime'
  ]
};

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function normalizeVisiblePrefixes(value) {
  if (!Array.isArray(value)) {
    return DEFAULT_VISIBLE_PREFIXES.slice();
  }

  if (value.length === 0) {
    return [];
  }

  const normalized = value.filter(
    (entry) => typeof entry === 'string' && entry.length > 0
  );

  if (normalized.length === 0) {
    return DEFAULT_VISIBLE_PREFIXES.slice();
  }

  return normalized;
}

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function normalizeVisibleExact(value) {
  if (!Array.isArray(value)) {
    return DEFAULT_VISIBLE_EXACT.slice();
  }

  return value.filter((entry) => typeof entry === 'string' && entry.length > 0);
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isObjectTable(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function isHexColor(value) {
  return typeof value === 'string' && HEX_COLOR_RE.test(value);
}

/**
 * @param {unknown} value
 * @param {number} fallback
 * @returns {number}
 */
function normalizePositiveInteger(value, fallback) {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
    ? value
    : fallback;
}

/**
 * @param {any} parsed
 * @returns {{ default_model: string, default_effort: string, pr_review_wait_ms: number, advance_delay_ms: number }}
 */
function normalizeWorkerConfig(parsed) {
  const raw = isObjectTable(parsed?.worker) ? parsed.worker : {};
  const default_model =
    typeof raw.default_model === 'string' && raw.default_model.trim().length > 0
      ? raw.default_model.trim()
      : DEFAULT_WORKER_CONFIG.default_model;
  const default_effort =
    typeof raw.default_effort === 'string' &&
    WORKER_EFFORTS.has(raw.default_effort)
      ? raw.default_effort
      : DEFAULT_WORKER_CONFIG.default_effort;

  return {
    default_model,
    default_effort,
    pr_review_wait_ms: normalizePositiveInteger(
      raw.pr_review_wait_ms,
      DEFAULT_WORKER_CONFIG.pr_review_wait_ms
    ),
    advance_delay_ms: normalizePositiveInteger(
      raw.advance_delay_ms,
      DEFAULT_WORKER_CONFIG.advance_delay_ms
    )
  };
}

/**
 * @param {unknown} value
 * @returns {Record<string, { fg: string }>}
 */
function normalizeLabelColorTable(value) {
  if (!isObjectTable(value)) {
    return {};
  }

  /** @type {Record<string, { fg: string }>} */
  const normalized = {};
  for (const [key, rule] of Object.entries(value)) {
    if (key.length === 0 || !isObjectTable(rule) || !isHexColor(rule.fg)) {
      continue;
    }
    normalized[key] = { fg: rule.fg };
  }

  return normalized;
}

/**
 * @param {unknown} value
 * @returns {{ prefix: Record<string, { fg: string }>, exact: Record<string, { fg: string }> }}
 */
function normalizeLabelColorPolicy(value) {
  if (!isObjectTable(value)) {
    return { prefix: {}, exact: {} };
  }

  return {
    prefix: normalizeLabelColorTable(value.prefix),
    exact: normalizeLabelColorTable(value.exact)
  };
}

/**
 * @param {unknown} value
 * @param {string[]} allowed
 * @param {string[]} fallback
 * @returns {string[]}
 */
function normalizeStringAllowlist(value, allowed, fallback) {
  if (!Array.isArray(value)) {
    return fallback.slice();
  }

  const allowed_set = new Set(allowed);
  /** @type {string[]} */
  const normalized = [];
  for (const entry of value) {
    if (
      typeof entry === 'string' &&
      allowed_set.has(entry) &&
      !normalized.includes(entry)
    ) {
      normalized.push(entry);
    }
  }

  return normalized;
}

/**
 * @param {any} parsed
 * @returns {{
 *   sections: string[],
 *   workflow_settings: { fields: string[], editable_fields: string[] },
 *   artifacts: { fields: string[] },
 *   review_gates: { fields: string[] },
 *   freshness: { fields: string[] },
 *   delivery: { fields: string[] },
 *   followup: { fields: string[] },
 *   human: { fields: string[] }
 * }}
 */
function normalizeWorkflowSummaryConfig(parsed) {
  const raw = parsed?.detail?.workflow_summary;
  const raw_sections = Array.isArray(raw?.sections) ? raw.sections : undefined;
  const requested_sections = Array.isArray(raw_sections)
    ? raw_sections.map((section) =>
        section === 'route' ? 'workflow_settings' : section
      )
    : undefined;
  const sections = normalizeStringAllowlist(
    requested_sections,
    WORKFLOW_SECTIONS,
    WORKFLOW_SECTIONS
  );

  /** @type {Record<string, { fields: string[], editable_fields?: string[] }>} */
  const section_config = {};
  for (const section of WORKFLOW_SECTIONS) {
    const allowed_fields =
      WORKFLOW_SECTION_FIELDS[
        /** @type {keyof typeof WORKFLOW_SECTION_FIELDS} */ (section)
      ] || [];
    const default_editable_fields =
      EDITABLE_WORKFLOW_FIELDS[
        /** @type {keyof typeof EDITABLE_WORKFLOW_FIELDS} */ (section)
      ] || [];
    const legacy_section_raw =
      section === 'workflow_settings' ? raw?.route : null;
    const section_raw = raw?.[section] || legacy_section_raw;
    const legacy_section = Boolean(!raw?.[section] && legacy_section_raw);
    let fields = normalizeStringAllowlist(
      section_raw?.fields,
      allowed_fields,
      allowed_fields
    );
    let editable_fields = normalizeStringAllowlist(
      section_raw?.editable_fields,
      default_editable_fields,
      default_editable_fields
    );

    if (legacy_section && fields.length < allowed_fields.length) {
      fields = allowed_fields.slice();
    }
    if (
      legacy_section &&
      editable_fields.length < default_editable_fields.length
    ) {
      editable_fields = default_editable_fields.slice();
    }

    section_config[section] =
      editable_fields.length > 0 ? { fields, editable_fields } : { fields };
  }

  return /** @type {any} */ ({ sections, ...section_config });
}

export const DEFAULT_WORKFLOW_SUMMARY_CONFIG = normalizeWorkflowSummaryConfig(
  {}
);

/**
 * @param {unknown} value
 * @returns {string | null}
 */
function normalizeWorkspacePath(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (trimmed.length === 0 || !path.isAbsolute(trimmed)) {
    return null;
  }

  return path.resolve(trimmed);
}

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function normalizeWorkspacePathList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  /** @type {string[]} */
  const normalized = [];
  const seen = new Set();

  for (const entry of value) {
    const resolved = normalizeWorkspacePath(entry);
    if (!resolved || seen.has(resolved)) {
      continue;
    }
    seen.add(resolved);
    normalized.push(resolved);
  }

  return normalized;
}

/**
 * @param {any} parsed
 */
function normalizeWorkspaceConfig(parsed) {
  return {
    default_workspace: normalizeWorkspacePath(parsed?.default_workspace),
    scan_roots: normalizeWorkspacePathList(parsed?.scan_roots),
    workspaces: normalizeWorkspacePathList(parsed?.workspaces)
  };
}

/**
 * @param {string} config_path
 * @returns {{
 *   label_display_policy: {
 *     visible_prefixes: string[],
 *     visible_exact: string[],
 *     colors: {
 *       prefix: Record<string, { fg: string }>,
 *       exact: Record<string, { fg: string }>
 *     }
 *   },
 *   detail: { workflow_summary: typeof DEFAULT_WORKFLOW_SUMMARY_CONFIG },
 *   workspace_config: {
 *     default_workspace: string | null,
 *     scan_roots: string[],
 *     workspaces: string[]
 *   },
 *   worker: { default_model: string, default_effort: string, pr_review_wait_ms: number, advance_delay_ms: number }
 * }}
 */
function readRuntimeConfig(config_path) {
  try {
    const raw = fs.readFileSync(config_path, 'utf8');
    /** @type {any} */
    const parsed = parseToml(raw);

    return {
      label_display_policy: {
        visible_prefixes: normalizeVisiblePrefixes(
          parsed?.labels?.visible_prefixes
        ),
        visible_exact: normalizeVisibleExact(parsed?.labels?.visible_exact),
        colors: normalizeLabelColorPolicy(parsed?.labels?.colors)
      },
      detail: {
        workflow_summary: normalizeWorkflowSummaryConfig(parsed)
      },
      workspace_config: normalizeWorkspaceConfig(parsed),
      worker: normalizeWorkerConfig(parsed)
    };
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      log('missing bdui config %s', config_path);
    } else {
      log('invalid bdui config %s: %o', config_path, error);
    }
    return {
      label_display_policy: {
        visible_prefixes: DEFAULT_VISIBLE_PREFIXES.slice(),
        visible_exact: DEFAULT_VISIBLE_EXACT.slice(),
        colors: { prefix: {}, exact: {} }
      },
      detail: {
        workflow_summary: normalizeWorkflowSummaryConfig({})
      },
      workspace_config: {
        default_workspace: DEFAULT_WORKSPACE_CONFIG.default_workspace,
        scan_roots: DEFAULT_WORKSPACE_CONFIG.scan_roots.slice(),
        workspaces: DEFAULT_WORKSPACE_CONFIG.workspaces.slice()
      },
      worker: { ...DEFAULT_WORKER_CONFIG }
    };
  }
}

export const readRuntimeConfigForTest = readRuntimeConfig;

/**
 * Resolve runtime configuration for the server.
 * Notes:
 * - `app_dir` is resolved relative to the installed package location.
 * - `root_dir` represents the directory where the process was invoked
 * (i.e., the current working directory) so DB resolution follows the
 * caller's context rather than the install location.
 *
 * @returns {{
 *   host: string,
 *   port: number,
 *   app_dir: string,
 *   root_dir: string,
 *   frontend_mode: 'live' | 'static',
 *   url: string,
 *   config_path: string,
 *   label_display_policy: {
 *     visible_prefixes: string[],
 *     visible_exact: string[],
 *     colors: {
 *       prefix: Record<string, { fg: string }>,
 *       exact: Record<string, { fg: string }>
 *     }
 *   },
 *   detail: { workflow_summary: typeof DEFAULT_WORKFLOW_SUMMARY_CONFIG },
 *   workspace_config: {
 *     default_workspace: string | null,
 *     scan_roots: string[],
 *     workspaces: string[]
 *   },
 *   worker: { default_model: string, default_effort: string, pr_review_wait_ms: number, advance_delay_ms: number }
 * }}
 */
export function getConfig() {
  const this_file = fileURLToPath(new URL(import.meta.url));
  const server_dir = path.dirname(this_file);
  const package_root = path.resolve(server_dir, '..');
  const root_dir = process.cwd();
  const config_path =
    process.env.BDUI_CONFIG_PATH ||
    path.join(os.homedir(), '.config', 'bdui', 'config.toml');

  let port_value = Number.parseInt(process.env.PORT || '', 10);
  if (!Number.isFinite(port_value)) {
    port_value = 3000;
  }

  const host_env = process.env.HOST;
  const host_value = host_env && host_env.length > 0 ? host_env : '127.0.0.1';
  const frontend_mode_env = process.env.BDUI_FRONTEND_MODE;
  const frontend_mode = frontend_mode_env === 'live' ? 'live' : 'static';
  const runtime_config = readRuntimeConfig(config_path);

  return {
    host: host_value,
    port: port_value,
    app_dir: path.resolve(package_root, 'app'),
    root_dir,
    frontend_mode,
    url: `http://${host_value}:${port_value}`,
    config_path,
    ...runtime_config
  };
}
