/**
 * Fold rollout observations into one attempt's `codex_children` rows
 * (UI-mn5u §6.2).
 *
 * This is the accumulation half of the parser pair, and the ONLY place a row
 * is created, advanced or terminated. Live observation, a post-restart re-read
 * and the terminal settlement all call {@link accumulateCodexChildren} over the
 * same records, which is what makes the three results identical.
 *
 * Every rule here is an observation rule, not a completion rule: a child is
 * accepted only when its parent chain reaches the attempt's own root thread,
 * only activity dated inside the attempt's window becomes that attempt's row,
 * a repeated wait or send never creates a second row, cumulative usage
 * REPLACES rather than accumulates, and a parent that ended with no terminal
 * evidence for a child marks it `interrupted` — which says what was observed,
 * never that anything was killed.
 *
 * @import { CodexChildSignal, CodexChildUsage } from './rollout.js'
 */
import {
  createCodexResponseLedger,
  registerCodexResponseRecord
} from './response-ledger.js';
import { liftCodexChildSignal, rolloutThreadIdentity } from './rollout.js';

/**
 * How many parent hops a child may be from the root before the chain is
 * refused. Depth 1 is the measured case; deeper nesting is admitted by the
 * same `parent_thread_id` links, and the bound only stops a cycle.
 *
 * @type {number}
 */
const MAX_CHAIN_DEPTH = 8;

/**
 * One normalized observation row, as stored on the attempt.
 *
 * @typedef {Object} CodexChildRow
 * @property {string} thread_id
 * @property {string} parent_thread_id
 * @property {string|null} launch_id
 * @property {string|null} agent_path
 * @property {string|null} model
 * @property {string|null} effort
 * @property {'running'|'done'|'failed'|'interrupted'} status
 * @property {number|null} started_at
 * @property {number|null} completed_at
 * @property {number|null} last_event_at
 * @property {CodexChildUsage|null} usage
 * @property {Array<{ scope_id: string, turn_id: string|null, model: string|null, usage: CodexChildUsage, observed_from: number|null, observed_through: number|null, partial?: boolean, partial_reasons?: string[] }>} [usage_segments]
 * @property {boolean} [usage_partial]
 * @property {string[]} [usage_partial_reasons]
 */

/**
 * The agent's own name, shared by the root's `spawn_agent` argument
 * (`create_child_note`) and the child's `agent_path` (`/root/create_child_note`).
 *
 * @param {string|null} agent_path
 * @returns {string|null}
 */
function agentKeyOf(agent_path) {
  if (typeof agent_path !== 'string' || agent_path.length === 0) {
    return null;
  }
  const segments = agent_path.split('/').filter((part) => part.length > 0);
  return segments.length > 0 ? segments[segments.length - 1] : null;
}

/**
 * @param {number|null} left
 * @param {number|null} right
 * @returns {number|null}
 */
function laterOf(left, right) {
  if (typeof left !== 'number') {
    return typeof right === 'number' ? right : null;
  }
  if (typeof right !== 'number') {
    return left;
  }
  return Math.max(left, right);
}

/**
 * Incrementally fold already-linked rollout records.
 *
 * @param {{ root_thread_id: string, attempt_started_at?: number|null, attempt_ended_at?: number|null, responseLedger?: ReturnType<typeof createCodexResponseLedger> }} input
 */
export function createCodexChildAccumulator(input) {
  const root_thread_id = input.root_thread_id;
  const window_start =
    typeof input.attempt_started_at === 'number' &&
    Number.isFinite(input.attempt_started_at)
      ? input.attempt_started_at
      : null;
  const window_end =
    typeof input.attempt_ended_at === 'number' &&
    Number.isFinite(input.attempt_ended_at)
      ? input.attempt_ended_at
      : null;
  const response_ledger = input.responseLedger || createCodexResponseLedger();
  /** @type {Map<string, { parent_thread_id: string|null, agent_path: string|null }>} */
  const identities = new Map();
  /** @type {Map<string, Array<{ launch_id: string|null, agent_key: string|null, agent_path: string|null, model: string|null }>>} */
  const launches_by_parent = new Map();
  /** @type {Map<string, { row: CodexChildRow, usage_at: number|null, cumulative_usage: CodexChildUsage|null, observed: number, terminal: boolean, terminal_at: number|null, last_start_at: number|null, responses: Map<string, { usage: CodexChildUsage, turn_id: string|null, model: string|null, at: number|null }>, response_conflicts: Set<string> }>} */
  const rows = new Map();

  /** @param {string} thread_id */
  function launchesOf(thread_id) {
    let held = launches_by_parent.get(thread_id);
    if (!held) {
      held = [];
      launches_by_parent.set(thread_id, held);
    }
    return held;
  }

  /** @param {string} thread_id */
  function reachesRoot(thread_id) {
    const seen = new Set();
    let cursor = thread_id;
    for (let hop = 0; hop < MAX_CHAIN_DEPTH; hop += 1) {
      if (seen.has(cursor)) {
        return false;
      }
      seen.add(cursor);
      const parent = identities.get(cursor)?.parent_thread_id ?? null;
      if (parent === root_thread_id) {
        return true;
      }
      if (parent === null) {
        return false;
      }
      cursor = parent;
    }
    return false;
  }

  /** @param {{ thread_id: string, record: unknown }} entry */
  function apply(entry) {
    const identity = rolloutThreadIdentity(entry.record);
    if (identity && identity.thread_id === entry.thread_id) {
      identities.set(identity.thread_id, {
        parent_thread_id: identity.parent_thread_id,
        agent_path: identity.agent_path
      });
    }
    const signal = /** @type {CodexChildSignal|null} */ (
      liftCodexChildSignal(entry.record)
    );
    if (!signal) {
      return;
    }
    const inside =
      signal.at !== null &&
      (window_start === null || signal.at >= window_start) &&
      (window_end === null || signal.at < window_end);
    if (signal.kind === 'usage' && inside) {
      registerCodexResponseRecord(
        response_ledger,
        entry.thread_id,
        entry.record
      );
    }
    if (signal.kind === 'spawn' && inside) {
      launchesOf(entry.thread_id).push({
        launch_id: signal.launch_id ?? null,
        agent_key: agentKeyOf(signal.agent_path ?? null),
        agent_path: signal.agent_path ?? null,
        model: signal.model ?? null
      });
    } else if (signal.kind === 'spawn_output' && inside) {
      const launches = launchesOf(entry.thread_id);
      const match = launches.find(
        (launch) =>
          launch.launch_id !== null &&
          launch.launch_id === (signal.launch_id ?? null)
      );
      if (match) {
        match.agent_key =
          match.agent_key ?? agentKeyOf(signal.agent_path ?? null);
        match.agent_path = signal.agent_path ?? match.agent_path;
      } else {
        launches.push({
          launch_id: signal.launch_id ?? null,
          agent_key: agentKeyOf(signal.agent_path ?? null),
          agent_path: signal.agent_path ?? null,
          model: null
        });
      }
    }
    if (
      entry.thread_id === root_thread_id ||
      !reachesRoot(entry.thread_id) ||
      !inside
    ) {
      return;
    }
    const known = identities.get(entry.thread_id);
    if (!known || typeof known.parent_thread_id !== 'string') {
      return;
    }
    let held = rows.get(entry.thread_id);
    if (!held) {
      held = {
        row: {
          thread_id: entry.thread_id,
          parent_thread_id: known.parent_thread_id,
          launch_id: null,
          agent_path: known.agent_path,
          model: null,
          effort: null,
          status: 'running',
          started_at: null,
          completed_at: null,
          last_event_at: null,
          usage: null,
          usage_segments: []
        },
        usage_at: null,
        cumulative_usage: null,
        observed: 0,
        terminal: false,
        terminal_at: null,
        last_start_at: null,
        responses: new Map(),
        response_conflicts: new Set()
      };
      rows.set(entry.thread_id, held);
    }
    held.observed += 1;
    held.row.last_event_at = laterOf(held.row.last_event_at, signal.at);
    if (signal.kind === 'context') {
      held.row.model = signal.model ?? held.row.model;
      held.row.effort = signal.effort ?? held.row.effort;
    } else if (signal.kind === 'started') {
      const at = signal.event_at ?? signal.at;
      held.row.started_at = held.row.started_at ?? at;
      if (
        held.terminal &&
        (at === null || held.terminal_at === null || at >= held.terminal_at)
      ) {
        held.terminal = false;
        held.terminal_at = null;
        held.row.status = 'running';
        held.row.completed_at = null;
      }
      held.last_start_at = laterOf(held.last_start_at, at);
    } else if (signal.kind === 'completed' || signal.kind === 'failed') {
      const at =
        (signal.kind === 'completed' ? signal.event_at : null) ?? signal.at;
      if (
        held.last_start_at !== null &&
        at !== null &&
        at < held.last_start_at
      ) {
        return;
      }
      held.row.status = signal.kind === 'completed' ? 'done' : 'failed';
      held.row.completed_at = at ?? held.row.completed_at;
      held.terminal = true;
      held.terminal_at = at ?? held.terminal_at;
    } else if (
      signal.kind === 'usage' &&
      signal.usage &&
      (held.usage_at === null ||
        signal.at === null ||
        signal.at >= held.usage_at)
    ) {
      held.cumulative_usage = signal.cumulative_usage ?? held.cumulative_usage;
      if (signal.response_id) {
        if (!held.responses.has(signal.response_id)) {
          held.responses.set(signal.response_id, {
            usage: signal.usage,
            turn_id: signal.turn_id ?? null,
            model: held.row.model,
            at: signal.at
          });
        }
      } else if (held.responses.size === 0) {
        held.row.usage = signal.usage;
        held.usage_at = signal.at ?? held.usage_at;
      }
    }
  }

  /** @param {boolean} [parent_terminated] */
  function snapshot(parent_terminated = false) {
    /** @type {CodexChildRow[]} */
    const out = [...rows.values()]
      .filter((held) => reachesRoot(held.row.thread_id))
      .map((held) => {
        const grouped = new Map();
        for (const [response_id, response] of held.responses) {
          if (!response_ledger.isValid(response_id)) {
            continue;
          }
          const key = `${response.turn_id || 'unknown'}\0${response.model || 'unknown'}`;
          let segment = grouped.get(key);
          if (!segment) {
            segment = {
              scope_id: `thread:${held.row.thread_id}:turn:${response.turn_id || 'unknown'}:model:${response.model || 'unknown'}:window:${window_start ?? 'open'}:${window_end ?? 'open'}`,
              turn_id: response.turn_id,
              model: response.model,
              usage: {},
              observed_from:
                window_start !== null && response.at !== null
                  ? Math.max(window_start, response.at)
                  : response.at,
              observed_through: response.at
            };
            grouped.set(key, segment);
          }
          for (const [field, value] of Object.entries(response.usage)) {
            if (field !== 'total_tokens' && Number.isFinite(value)) {
              segment.usage[field] = (segment.usage[field] || 0) + value;
            }
          }
          if (response.at !== null) {
            segment.observed_from =
              segment.observed_from === null
                ? response.at
                : Math.min(segment.observed_from, response.at);
          }
          segment.observed_through = laterOf(
            segment.observed_through,
            response.at
          );
        }
        const usage_segments = [...grouped.values()];
        const usage =
          usage_segments.length > 0
            ? usage_segments.reduce((total, segment) => {
                for (const [field, value] of Object.entries(segment.usage)) {
                  total[field] = (total[field] || 0) + value;
                }
                return total;
              }, {})
            : held.row.usage;
        if (
          usage &&
          Number.isFinite(usage.input_tokens) &&
          Number.isFinite(usage.output_tokens)
        ) {
          usage.total_tokens = usage.input_tokens + usage.output_tokens;
        }
        const partial_reasons = [];
        if (response_ledger.hasConflictFor(held.row.thread_id)) {
          partial_reasons.push('response_conflict');
        }
        if (held.responses.size > 0 && held.cumulative_usage) {
          for (const [field, value] of Object.entries(held.cumulative_usage)) {
            if (
              field !== 'total_tokens' &&
              Number.isFinite(value) &&
              Number(value) > Number(usage?.[field] || 0)
            ) {
              partial_reasons.push('cumulative_gap');
              break;
            }
          }
        }
        if (!held.terminal && parent_terminated) {
          partial_reasons.push('child_terminal_unconfirmed');
        }
        return {
          ...held.row,
          usage,
          usage_segments,
          ...(partial_reasons.length > 0
            ? { usage_partial: true, usage_partial_reasons: partial_reasons }
            : {}),
          ...(!held.terminal && parent_terminated
            ? { status: 'interrupted' }
            : {})
        };
      });
    const taken = new Set();
    for (const row of out.sort(
      (left, right) => (left.started_at || 0) - (right.started_at || 0)
    )) {
      const launches = launches_by_parent.get(row.parent_thread_id) || [];
      const name = agentKeyOf(row.agent_path);
      const match =
        launches.find(
          (launch, index) =>
            !taken.has(`${row.parent_thread_id}:${index}`) &&
            row.agent_path !== null &&
            launch.agent_path === row.agent_path
        ) ||
        launches.find(
          (launch, index) =>
            !taken.has(`${row.parent_thread_id}:${index}`) &&
            name !== null &&
            launch.agent_key === name
        );
      if (match) {
        const index = launches.indexOf(match);
        taken.add(`${row.parent_thread_id}:${index}`);
        row.launch_id = match.launch_id;
        row.model = row.model ?? match.model;
      }
    }
    return out.sort((left, right) => {
      const by_start = (left.started_at || 0) - (right.started_at || 0);
      return by_start || left.thread_id.localeCompare(right.thread_id);
    });
  }
  return {
    apply,
    snapshot,
    /** @param {string} thread_id - Transcript whose replacement invalidated prior observations. */
    resetThread(thread_id) {
      response_ledger.resetThread(thread_id);
      identities.delete(thread_id);
      launches_by_parent.delete(thread_id);
      rows.delete(thread_id);
    }
  };
}

/**
 * Fold one attempt's rollout records into its child rows.
 *
 * @param {{
 *   root_thread_id: string,
 *   records: Array<{ thread_id: string, ordinal?: number, record: unknown }>,
 *   attempt_started_at?: number|null,
 *   attempt_ended_at?: number|null,
 *   parent_terminated?: boolean,
 *   responseLedger?: ReturnType<typeof createCodexResponseLedger>
 * }} input - `attempt_started_at`/`attempt_ended_at` are the attempt log
 * boundaries: activity outside them belongs to another root turn and never
 * becomes this attempt's row, which is what keeps a REUSED child thread from
 * being copied forward.
 * @returns {CodexChildRow[]}
 */
export function accumulateCodexChildren(input) {
  if (
    typeof input.root_thread_id !== 'string' ||
    input.root_thread_id.length === 0 ||
    !Array.isArray(input.records)
  ) {
    return [];
  }
  const accumulator = createCodexChildAccumulator(input);
  const records = input.records.filter(
    (entry) => entry && typeof entry.thread_id === 'string'
  );
  // Register the full parent chain before replaying any nested child activity.
  for (const entry of records) {
    if (rolloutThreadIdentity(entry.record)) {
      accumulator.apply(entry);
    }
  }
  for (const entry of records) {
    accumulator.apply(entry);
  }
  return accumulator.snapshot(input.parent_terminated === true);
}
