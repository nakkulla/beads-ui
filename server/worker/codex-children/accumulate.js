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
 * Fold one attempt's rollout records into its child rows.
 *
 * @param {{
 *   root_thread_id: string,
 *   records: Array<{ thread_id: string, ordinal?: number, record: unknown }>,
 *   attempt_started_at?: number|null,
 *   attempt_ended_at?: number|null,
 *   parent_terminated?: boolean
 * }} input - `attempt_started_at`/`attempt_ended_at` are the attempt log
 * boundaries: activity outside them belongs to another root turn and never
 * becomes this attempt's row, which is what keeps a REUSED child thread from
 * being copied forward.
 * @returns {CodexChildRow[]}
 */
export function accumulateCodexChildren(input) {
  const root_thread_id =
    typeof input.root_thread_id === 'string' && input.root_thread_id.length > 0
      ? input.root_thread_id
      : null;
  if (root_thread_id === null || !Array.isArray(input.records)) {
    return [];
  }
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

  /** @type {Map<string, { parent_thread_id: string|null, agent_path: string|null }>} */
  const identities = new Map();
  for (const entry of input.records) {
    if (!entry || typeof entry.thread_id !== 'string') {
      continue;
    }
    const identity = rolloutThreadIdentity(entry.record);
    if (identity === null || identity.thread_id !== entry.thread_id) {
      continue;
    }
    identities.set(identity.thread_id, {
      parent_thread_id: identity.parent_thread_id,
      agent_path: identity.agent_path
    });
  }

  /**
   * Whether a thread's parent chain reaches the attempt's root. A thread whose
   * chain runs out, loops, or ends at another root is NOT this attempt's child.
   *
   * @param {string} thread_id
   * @returns {boolean}
   */
  function reachesRoot(thread_id) {
    /** @type {Set<string>} */
    const seen = new Set();
    let cursor = thread_id;
    for (let hop = 0; hop < MAX_CHAIN_DEPTH; hop += 1) {
      if (seen.has(cursor)) {
        return false;
      }
      seen.add(cursor);
      const identity = identities.get(cursor);
      const parent = identity ? identity.parent_thread_id : null;
      if (parent === null) {
        return false;
      }
      if (parent === root_thread_id) {
        return true;
      }
      cursor = parent;
    }
    return false;
  }

  /** @type {Array<{ launch_id: string|null, agent_key: string|null, agent_path: string|null, model: string|null, taken: boolean }>} */
  const launches = [];
  /** @type {Map<string, { row: CodexChildRow, usage_at: number|null, observed: number, terminal: boolean }>} */
  const rows = new Map();

  for (const entry of input.records) {
    if (!entry || typeof entry.thread_id !== 'string') {
      continue;
    }
    const signal = /** @type {CodexChildSignal|null} */ (
      liftCodexChildSignal(entry.record)
    );
    if (signal === null) {
      continue;
    }
    const inside =
      signal.at !== null &&
      (window_start === null || signal.at >= window_start) &&
      (window_end === null || signal.at <= window_end);

    if (entry.thread_id === root_thread_id) {
      if (signal.kind === 'spawn' && inside) {
        launches.push({
          launch_id: signal.launch_id ?? null,
          agent_key: agentKeyOf(signal.agent_path ?? null),
          agent_path: signal.agent_path ?? null,
          model: signal.model ?? null,
          taken: false
        });
      } else if (signal.kind === 'spawn_output' && inside) {
        const key = agentKeyOf(signal.agent_path ?? null);
        const match = launches.find(
          (launch) =>
            launch.launch_id !== null &&
            launch.launch_id === (signal.launch_id ?? null)
        );
        if (match) {
          match.agent_key = match.agent_key ?? key;
          match.agent_path = signal.agent_path ?? match.agent_path;
        } else {
          launches.push({
            launch_id: signal.launch_id ?? null,
            agent_key: key,
            agent_path: signal.agent_path ?? null,
            model: null,
            taken: false
          });
        }
      }
      continue;
    }
    if (!reachesRoot(entry.thread_id)) {
      continue;
    }
    if (!inside) {
      continue;
    }
    const identity = identities.get(entry.thread_id);
    let held = rows.get(entry.thread_id);
    if (!held) {
      held = {
        row: {
          thread_id: entry.thread_id,
          parent_thread_id: /** @type {string} */ (
            identity ? identity.parent_thread_id : null
          ),
          launch_id: null,
          agent_path: identity ? identity.agent_path : null,
          model: null,
          effort: null,
          status: 'running',
          started_at: null,
          completed_at: null,
          last_event_at: null,
          usage: null
        },
        usage_at: null,
        observed: 0,
        terminal: false
      };
      rows.set(entry.thread_id, held);
    }
    held.observed += 1;
    held.row.last_event_at = laterOf(held.row.last_event_at, signal.at);
    if (signal.kind === 'context') {
      held.row.model = signal.model ?? held.row.model;
      held.row.effort = signal.effort ?? held.row.effort;
    } else if (signal.kind === 'started') {
      held.row.started_at =
        held.row.started_at ?? signal.event_at ?? signal.at ?? null;
    } else if (signal.kind === 'completed') {
      held.row.status = 'done';
      held.row.completed_at =
        signal.event_at ?? signal.at ?? held.row.completed_at;
      held.terminal = true;
    } else if (signal.kind === 'failed') {
      held.row.status = 'failed';
      held.row.completed_at = signal.at ?? held.row.completed_at;
      held.terminal = true;
    } else if (signal.kind === 'usage' && signal.usage) {
      // Cumulative thread totals: the LATEST observation replaces the earlier
      // one. A record dated before the one already held is a duplicate or a
      // reordered arrival and is dropped rather than added.
      if (
        held.usage_at === null ||
        signal.at === null ||
        signal.at >= held.usage_at
      ) {
        held.row.usage = signal.usage;
        held.usage_at = signal.at ?? held.usage_at;
      }
    }
  }

  /** @type {CodexChildRow[]} */
  const out = [];
  for (const held of rows.values()) {
    if (held.observed === 0 || typeof held.row.parent_thread_id !== 'string') {
      continue;
    }
    if (!held.terminal && input.parent_terminated === true) {
      // An observation mark (§6.2): the parent ended and this child produced
      // no terminal evidence. It is not a claim that the child was killed, and
      // it never becomes a success.
      held.row.status = 'interrupted';
    }
    out.push(held.row);
  }

  const key_of = /** @param {CodexChildRow} row */ (row) =>
    `${row.agent_path || ''}`;
  for (const row of [...out].sort(
    (left, right) => (left.started_at || 0) - (right.started_at || 0)
  )) {
    const wanted = agentKeyOf(key_of(row));
    const match =
      launches.find((launch) => !launch.taken && launch.agent_key === wanted) ||
      null;
    if (match === null) {
      continue;
    }
    match.taken = true;
    row.launch_id = match.launch_id;
    // The spawn argument's model is an OBSERVED value, used only where the
    // child's own `turn_context` never named one.
    row.model = row.model ?? match.model;
  }

  out.sort((left, right) => {
    const by_start = (left.started_at || 0) - (right.started_at || 0);
    return by_start !== 0
      ? by_start
      : left.thread_id.localeCompare(right.thread_id);
  });
  return out;
}
