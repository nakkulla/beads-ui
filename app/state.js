/**
 * Minimal app state store with subscription.
 */
import { debug } from './utils/logging.js';

/**
 * @typedef {'all'|'open'|'in_progress'|'deferred'|'resolved'|'closed'|'ready'|string[]} StatusFilter
 */

/**
 * @typedef {{ status: StatusFilter, search: string, type: string }} Filters
 */

/**
 * @typedef {'issues'|'epics'|'board'|'worker'} ViewName
 */

/**
 * @typedef {'today'|'3'|'7'} ClosedFilter
 */

/**
 * @typedef {{ closed_filter: ClosedFilter, show_deferred_column: boolean }} BoardState
 */

/**
 * @typedef {'low'|'medium'|'high'} WorkerEffort
 */

/**
 * @typedef {{ default_model: string, default_effort: WorkerEffort, pr_review_wait_ms: number, advance_delay_ms: number }} WorkerConfig
 */

/**
 * @typedef {{ remainingMs?: number, nextIssueId?: string }} WorkerCountdown
 */

/**
 * @typedef {{ selected_parent_id: string | null, paused: boolean, live_jobs: Record<string, unknown>, countdown: WorkerCountdown | null, pr_review_waits: Record<string, unknown>, done_filter: ClosedFilter, default_model: string, default_effort: WorkerEffort, queue_blocked_reason: string | null, pr_finish_available: boolean, show_closed_children?: string[] }} WorkerState
 */

/**
 * @typedef {{ fg: string }} LabelColorRule
 */

/**
 * @typedef {{ prefix: Record<string, LabelColorRule>, exact: Record<string, LabelColorRule> }} LabelColorPolicy
 */

/**
 * @typedef {{ visible_prefixes: string[], visible_exact: string[], colors: LabelColorPolicy }} LabelDisplayPolicy
 */

/**
 * @typedef {{ default_workspace: string | null }} WorkspaceConfig
 */

/**
 * @typedef {{ sections: string[], [section: string]: unknown }} WorkflowSummaryConfig
 */

/**
 * @typedef {{ workflow_summary: WorkflowSummaryConfig }} DetailConfig
 */

/**
 * @typedef {{ label_display_policy?: Partial<LabelDisplayPolicy>, workspace_config?: WorkspaceConfig, detail?: any, worker?: Partial<WorkerConfig> }} AppConfig
 */

/**
 * @typedef {Object} WorkspaceInfo
 * @property {string} path - Full path to workspace
 * @property {string} database - Path to the database file
 * @property {number} [pid] - Process ID of the daemon
 * @property {string} [version] - Version of beads
 */

/**
 * @typedef {Object} WorkspaceState
 * @property {WorkspaceInfo | null} current - Currently active workspace
 * @property {WorkspaceInfo[]} available - All available workspaces
 */

/**
 * @typedef {{ selected_id: string | null, view: ViewName, filters: Filters, board: BoardState, worker: WorkerState, workspace: WorkspaceState, config: { label_display_policy: LabelDisplayPolicy, workspace_config: WorkspaceConfig, detail: DetailConfig, worker: WorkerConfig } }} AppState
 */

const DEFAULT_WORKER_CONFIG = Object.freeze({
  default_model: 'gpt-5.5',
  default_effort: 'high',
  pr_review_wait_ms: 300000,
  advance_delay_ms: 60000
});
const WORKER_EFFORTS = new Set(['low', 'medium', 'high']);

const DEFAULT_CONFIG = Object.freeze({
  label_display_policy: {
    visible_prefixes: ['has:', 'reviewed:'],
    visible_exact: [],
    colors: {
      prefix: {},
      exact: {}
    }
  },
  workspace_config: {
    default_workspace: null
  },
  worker: DEFAULT_WORKER_CONFIG,
  detail: {
    workflow_summary: {
      sections: [
        'workflow_settings',
        'artifacts',
        'review_gates',
        'freshness',
        'delivery',
        'followup',
        'human'
      ],
      workflow_settings: {
        fields: [
          'execution_lane',
          'workspace_policy',
          'branch_policy',
          'finish_action',
          'review_profile'
        ],
        editable_fields: [
          'execution_lane',
          'workspace_policy',
          'branch_policy',
          'finish_action',
          'review_profile'
        ]
      },
      artifacts: { fields: ['spec_id', 'plan', 'handoff'] },
      review_gates: {
        fields: [
          'status',
          'verdict',
          'final_source',
          'external_attempts',
          'reviewed_at_sha',
          'content_hash'
        ]
      },
      freshness: {
        fields: [
          'execution_base_sha',
          'spec_freshness_checked_at_sha',
          'plan_freshness_checked_at_sha',
          'spec_handoff_at_sha',
          'spec_handoff_content_hash'
        ]
      },
      delivery: { fields: ['pr_url'] },
      followup: {
        fields: [
          'followup_kind',
          'source_repo',
          'source_bead',
          'source_artifact',
          'source_pr',
          'target_repo',
          'target_paths',
          'required_action'
        ]
      },
      human: { fields: ['human_decision_required'] }
    }
  }
});

const HEX_COLOR_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * @template T
 * @param {T} value
 * @returns {T}
 */
function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
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
 * @returns {Record<string, LabelColorRule>}
 */
function normalizeLabelColorTable(value) {
  if (!isObjectTable(value)) {
    return {};
  }

  /** @type {Record<string, LabelColorRule>} */
  const normalized = {};
  for (const [key, rule] of Object.entries(value)) {
    if (
      key.length === 0 ||
      !isObjectTable(rule) ||
      typeof rule.fg !== 'string' ||
      !HEX_COLOR_RE.test(rule.fg)
    ) {
      continue;
    }
    normalized[key] = { fg: rule.fg };
  }

  return normalized;
}

/**
 * @param {unknown} value
 * @returns {LabelColorPolicy}
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
 * @param {number} fallback
 * @returns {number}
 */
function normalizePositiveInteger(value, fallback) {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
    ? value
    : fallback;
}

/**
 * @param {Partial<WorkerConfig> | undefined} input
 * @returns {WorkerConfig}
 */
function normalizeWorkerConfig(input) {
  const default_model =
    typeof input?.default_model === 'string' &&
    input.default_model.trim().length > 0
      ? input.default_model.trim()
      : DEFAULT_WORKER_CONFIG.default_model;
  const default_effort =
    typeof input?.default_effort === 'string' &&
    WORKER_EFFORTS.has(input.default_effort)
      ? input.default_effort
      : DEFAULT_WORKER_CONFIG.default_effort;

  return {
    default_model,
    default_effort: /** @type {WorkerEffort} */ (default_effort),
    pr_review_wait_ms: normalizePositiveInteger(
      input?.pr_review_wait_ms,
      DEFAULT_WORKER_CONFIG.pr_review_wait_ms
    ),
    advance_delay_ms: normalizePositiveInteger(
      input?.advance_delay_ms,
      DEFAULT_WORKER_CONFIG.advance_delay_ms
    )
  };
}

/**
 * @param {Partial<WorkerState> | undefined} input
 * @param {WorkerConfig} worker_config
 * @returns {WorkerState}
 */
function normalizeWorkerState(input, worker_config) {
  const default_effort =
    typeof input?.default_effort === 'string' &&
    WORKER_EFFORTS.has(input.default_effort)
      ? input.default_effort
      : worker_config.default_effort;
  const default_model =
    typeof input?.default_model === 'string' &&
    input.default_model.trim().length > 0
      ? input.default_model.trim()
      : worker_config.default_model;
  const done_filter =
    input?.done_filter === '3' ||
    input?.done_filter === '7' ||
    input?.done_filter === 'today'
      ? input.done_filter
      : 'today';
  const queue_blocked_reason =
    typeof input?.queue_blocked_reason === 'string' &&
    input.queue_blocked_reason.length > 0
      ? input.queue_blocked_reason
      : null;
  const worker_state = {
    selected_parent_id: input?.selected_parent_id ?? null,
    paused: input?.paused === true,
    live_jobs: isObjectTable(input?.live_jobs)
      ? cloneJson(input.live_jobs)
      : {},
    countdown: isObjectTable(input?.countdown)
      ? cloneJson(input.countdown)
      : null,
    pr_review_waits: isObjectTable(input?.pr_review_waits)
      ? cloneJson(input.pr_review_waits)
      : {},
    done_filter: /** @type {ClosedFilter} */ (done_filter),
    default_model,
    default_effort: /** @type {WorkerEffort} */ (default_effort),
    queue_blocked_reason,
    pr_finish_available: input?.pr_finish_available !== false
  };

  if (Array.isArray(input?.show_closed_children)) {
    return {
      ...worker_state,
      show_closed_children: input.show_closed_children
    };
  }

  return worker_state;
}

/**
 * @param {AppConfig | undefined} input
 * @returns {{ label_display_policy: LabelDisplayPolicy, workspace_config: WorkspaceConfig, detail: DetailConfig, worker: WorkerConfig }}
 */
function normalizeConfig(input) {
  const prefixes = input?.label_display_policy?.visible_prefixes;
  const exact = input?.label_display_policy?.visible_exact;
  const colors = normalizeLabelColorPolicy(input?.label_display_policy?.colors);
  const default_workspace =
    typeof input?.workspace_config?.default_workspace === 'string' &&
    input.workspace_config.default_workspace.length > 0
      ? input.workspace_config.default_workspace
      : null;
  const detail =
    input?.detail && typeof input.detail === 'object'
      ? cloneJson(input.detail)
      : cloneJson(DEFAULT_CONFIG.detail);
  const worker = normalizeWorkerConfig(input?.worker);

  if (!Array.isArray(prefixes)) {
    return {
      label_display_policy: {
        visible_prefixes:
          DEFAULT_CONFIG.label_display_policy.visible_prefixes.slice(),
        visible_exact: Array.isArray(exact)
          ? exact.filter((value) => typeof value === 'string')
          : DEFAULT_CONFIG.label_display_policy.visible_exact.slice(),
        colors
      },
      workspace_config: {
        default_workspace
      },
      detail: /** @type {DetailConfig} */ (detail),
      worker
    };
  }

  return {
    label_display_policy: {
      visible_prefixes: prefixes.filter((value) => typeof value === 'string'),
      visible_exact: Array.isArray(exact)
        ? exact.filter((value) => typeof value === 'string')
        : DEFAULT_CONFIG.label_display_policy.visible_exact.slice(),
      colors
    },
    workspace_config: {
      default_workspace
    },
    detail: /** @type {DetailConfig} */ (detail),
    worker
  };
}

/**
 * Create a simple store for application state.
 *
 * @param {{ selected_id?: string | null, view?: ViewName, filters?: Partial<Filters>, board?: Partial<BoardState>, worker?: Partial<WorkerState>, workspace?: Partial<WorkspaceState>, config?: AppConfig }} [initial]
 * @returns {{ getState: () => AppState, setState: (patch: { selected_id?: string | null, view?: ViewName, filters?: Partial<Filters>, board?: Partial<BoardState>, worker?: Partial<WorkerState>, workspace?: Partial<WorkspaceState>, config?: AppConfig }) => void, subscribe: (fn: (s: AppState) => void) => () => void }}
 */
export function createStore(initial = {}) {
  const log = debug('state');
  const initial_config = normalizeConfig(initial.config);
  /** @type {AppState} */
  let state = {
    selected_id: initial.selected_id ?? null,
    view: initial.view ?? 'issues',
    filters: {
      status: initial.filters?.status ?? 'all',
      search: initial.filters?.search ?? '',
      type:
        typeof initial.filters?.type === 'string' ? initial.filters?.type : ''
    },
    board: {
      closed_filter:
        initial.board?.closed_filter === '3' ||
        initial.board?.closed_filter === '7' ||
        initial.board?.closed_filter === 'today'
          ? initial.board?.closed_filter
          : 'today',
      show_deferred_column: initial.board?.show_deferred_column === true
    },
    worker: normalizeWorkerState(initial.worker, initial_config.worker),
    workspace: {
      current: initial.workspace?.current ?? null,
      available: initial.workspace?.available ?? []
    },
    config: initial_config
  };

  /** @type {Set<(s: AppState) => void>} */
  const subs = new Set();

  function emit() {
    for (const fn of Array.from(subs)) {
      try {
        fn(state);
      } catch {
        // ignore
      }
    }
  }

  return {
    getState() {
      return state;
    },
    /**
     * Update state. Nested filters can be partial.
     *
     * @param {{ selected_id?: string | null, view?: ViewName, filters?: Partial<Filters>, board?: Partial<BoardState>, worker?: Partial<WorkerState>, workspace?: Partial<WorkspaceState>, config?: AppConfig }} patch
     */
    setState(patch) {
      const next_config =
        patch.config !== undefined
          ? normalizeConfig(patch.config)
          : state.config;
      const worker_source =
        patch.config !== undefined
          ? {
              ...state.worker,
              default_model: next_config.worker.default_model,
              default_effort: next_config.worker.default_effort,
              ...(patch.worker || {})
            }
          : { ...state.worker, ...(patch.worker || {}) };
      /** @type {AppState} */
      const next = {
        ...state,
        ...patch,
        filters: { ...state.filters, ...(patch.filters || {}) },
        board: { ...state.board, ...(patch.board || {}) },
        worker: normalizeWorkerState(worker_source, next_config.worker),
        workspace: {
          current:
            patch.workspace?.current !== undefined
              ? patch.workspace.current
              : state.workspace.current,
          available:
            patch.workspace?.available !== undefined
              ? patch.workspace.available
              : state.workspace.available
        },
        config: next_config
      };
      const workspace_changed =
        next.workspace.current?.path !== state.workspace.current?.path ||
        next.workspace.available.length !== state.workspace.available.length;
      const config_changed =
        next.config.label_display_policy.visible_prefixes.length !==
          state.config.label_display_policy.visible_prefixes.length ||
        next.config.label_display_policy.visible_prefixes.some(
          (prefix, index) =>
            prefix !== state.config.label_display_policy.visible_prefixes[index]
        ) ||
        next.config.label_display_policy.visible_exact.length !==
          state.config.label_display_policy.visible_exact.length ||
        next.config.label_display_policy.visible_exact.some(
          (label, index) =>
            label !== state.config.label_display_policy.visible_exact[index]
        ) ||
        JSON.stringify(next.config.label_display_policy.colors) !==
          JSON.stringify(state.config.label_display_policy.colors) ||
        next.config.workspace_config.default_workspace !==
          state.config.workspace_config.default_workspace ||
        JSON.stringify(next.config.detail) !==
          JSON.stringify(state.config.detail) ||
        JSON.stringify(next.config.worker) !==
          JSON.stringify(state.config.worker);
      const worker_changed =
        JSON.stringify(next.worker) !== JSON.stringify(state.worker);
      if (
        next.selected_id === state.selected_id &&
        next.view === state.view &&
        next.filters.status === state.filters.status &&
        next.filters.search === state.filters.search &&
        next.filters.type === state.filters.type &&
        next.board.closed_filter === state.board.closed_filter &&
        next.board.show_deferred_column === state.board.show_deferred_column &&
        !worker_changed &&
        !workspace_changed &&
        !config_changed
      ) {
        return;
      }
      state = next;
      log('state change %o', {
        selected_id: state.selected_id,
        view: state.view,
        filters: state.filters,
        board: state.board,
        worker: state.worker,
        workspace: state.workspace.current?.path,
        config: {
          visible_prefixes: state.config.label_display_policy.visible_prefixes,
          default_workspace: state.config.workspace_config.default_workspace,
          worker: state.config.worker
        }
      });
      emit();
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
}
