/**
 * In-memory subagent session + receipt tally for RUNNING attempts (UI-2mpn §5.2).
 *
 * A Claude session that calls the `Agent` tool spawns a child whose events ride
 * the PARENT stream tagged with `parent_tool_use_id`. There is no child
 * `system/init` and no child `result`, and the parent's own `result.usage`
 * excludes the child's tokens — so the only place a subagent exists at all is
 * the sequence of lines `runner/claude.js liftDelegation` reads one at a time.
 *
 * This module is the other half of that pair: the parser is stateless, and
 * EVERY accumulation across lines — session identity, status transitions,
 * receipt creation — lives here. Modelled on `usage-store.js` and non-persistent
 * for the same reason: a live counter belongs to a live process, the durable
 * copy lands on the attempt record at termination, and a crash loses only what
 * the session log can replay back (§5.4).
 *
 * There is deliberately no `replayed` marker. A replayed session and a live one
 * are byte-identical because every value comes from the line's own `timestamp`
 * rather than the clock, so there is no partial state to disclose (§7).
 *
 * @import { DelegationSession, UsageLeg } from './queue-store.js'
 * @import { DelegationSignal } from './runner/claude.js'
 */
import path from 'node:path';
import { debug } from '../logging.js';

const log = debug('worker:delegation-store');

/**
 * One attempt's live subagent state: the sessions keyed by launch id (the
 * parent's `Agent` `tool_use.id`) and the terminal receipts they produced.
 *
 * @typedef {{ sessions: Map<string, DelegationSession>, legs: UsageLeg[] }} AttemptDelegations
 */

/**
 * Build the running-attempt session/receipt shape for one launch.
 *
 * `session_id` and `turn_id` are BOTH the launch id, from start to finish: a
 * running subagent has no `agentId` yet (it only arrives with the terminal
 * `tool_use_result`), and `attemptLegs` matches a session to its receipt on
 * `session_id + turn_id`, so a key that changes mid-flight would split one
 * subagent into two rows. The real `agentId` is preserved on the receipt's
 * optional `agent_id` instead (§5.2).
 *
 * @param {string} launch_id
 * @param {string|null} agent_type
 * @param {string|null} model
 * @param {number|null} at
 * @returns {DelegationSession}
 */
function startedSession(launch_id, agent_type, model, at) {
  return {
    launch_id,
    provider: 'claude',
    role: 'subagent',
    agent_type,
    model,
    effort: null,
    session_id: launch_id,
    turn_id: launch_id,
    status: 'running',
    started_at: at,
    completed_at: null,
    last_event_at: at
  };
}

/**
 * Create a delegation store. One instance is held by the worker runtime so the
 * scheduler and the session monitor (writers), the ws snapshot decoration
 * (reader), and the queue store's terminal settlement (reader + drain) share it.
 */
export function createDelegationStore() {
  /** @type {Map<string, Map<string, AttemptDelegations>>} */
  const by_workspace = new Map();

  /**
   * Workspace keys are RESOLVED, exactly like the usage store's, so writer and
   * reader can never end up on two lanes for the same workspace.
   *
   * @param {string} workspace
   * @returns {Map<string, AttemptDelegations>}
   */
  function laneFor(workspace) {
    const key = path.resolve(String(workspace || ''));
    let lane = by_workspace.get(key);
    if (!lane) {
      lane = new Map();
      by_workspace.set(key, lane);
    }
    return lane;
  }

  /**
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {AttemptDelegations}
   */
  function entryFor(workspace, attempt_id) {
    const lane = laneFor(workspace);
    let entry = lane.get(attempt_id);
    if (!entry) {
      entry = { sessions: new Map(), legs: [] };
      lane.set(attempt_id, entry);
    }
    return entry;
  }

  /**
   * Fold one `end` signal into the session it closes, and write its receipt.
   *
   * @param {AttemptDelegations} entry
   * @param {DelegationSession} session
   * @param {Extract<DelegationSignal, { kind: 'end' }>} lifted
   */
  function closeSession(entry, session, lifted) {
    // A non-`completed` status the runner DID report is a failure; a status it
    // reported nothing about is not, so the null case falls through to `done`
    // rather than inventing a verdict the stream never stated.
    const failed =
      lifted.is_error === true ||
      (lifted.result_status !== null && lifted.result_status !== 'completed');
    session.status = failed ? 'failed' : 'done';
    session.completed_at = lifted.at;
    session.last_event_at = lifted.at;
    if (lifted.agent_type !== null) {
      session.agent_type = lifted.agent_type;
    }
    if (lifted.model !== null) {
      session.model = lifted.model;
    }
    if (!lifted.usage) {
      // §7: a missing or malformed `tool_use_result` still ends the session; it
      // just leaves no receipt. The warning names the launch, never the payload.
      log('subagent receipt missing for launch %s', session.launch_id);
      return;
    }
    const total =
      lifted.usage.input_tokens +
      lifted.usage.output_tokens +
      lifted.usage.cache_read_input_tokens +
      lifted.usage.cache_creation_input_tokens;
    if (lifted.total_tokens !== null && lifted.total_tokens !== total) {
      log(
        'subagent totalTokens disagrees with its usage fields for launch %s',
        session.launch_id
      );
    }
    entry.legs.push({
      receipt_id: session.launch_id,
      provider: 'claude',
      role: 'subagent',
      agent_type: session.agent_type,
      agent_id: lifted.agent_id,
      model: session.model,
      session_id: session.launch_id,
      turn_id: session.launch_id,
      effort: null,
      usage: {
        input_tokens: lifted.usage.input_tokens,
        output_tokens: lifted.usage.output_tokens,
        cache_read_input_tokens: lifted.usage.cache_read_input_tokens,
        cache_creation_input_tokens: lifted.usage.cache_creation_input_tokens,
        // The parent stream reports no reasoning breakdown for a subagent, and
        // the field is not part of a Claude headline anyway.
        reasoning_output_tokens: 0
      },
      completed_at: lifted.at
    });
  }

  return {
    /**
     * Fold one lifted signal into the attempt's subagent state.
     *
     * Returns whether anything changed, so the caller can arm its coalesced
     * fanout only when there is something new to send.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {DelegationSignal|null} lifted
     * @returns {boolean}
     */
    apply(workspace, attempt_id, lifted) {
      if (!lifted) {
        return false;
      }
      const entry = entryFor(workspace, attempt_id);
      const existing = entry.sessions.get(lifted.launch_id) || null;
      if (lifted.kind === 'start') {
        if (existing) {
          return false;
        }
        entry.sessions.set(
          lifted.launch_id,
          startedSession(
            lifted.launch_id,
            lifted.agent_type,
            lifted.model_alias,
            lifted.at
          )
        );
        return true;
      }
      if (lifted.kind === 'progress') {
        // A replay that starts after the `Agent` call — or a monitor that
        // reattached mid-flight — sees children whose header is behind the
        // boundary. The child lines alone prove the session exists, so it is
        // created here with the two facts they cannot carry left null.
        const session =
          existing || startedSession(lifted.launch_id, null, null, lifted.at);
        if (!existing) {
          entry.sessions.set(lifted.launch_id, session);
        }
        let changed = !existing;
        if (lifted.model !== null && session.model !== lifted.model) {
          session.model = lifted.model;
          changed = true;
        }
        if (lifted.at !== null && session.last_event_at !== lifted.at) {
          session.last_event_at = lifted.at;
          changed = true;
        }
        return changed;
      }
      // An `end` for a launch that never started is another tool's
      // `tool_result`: the parser cannot tell them apart, and this is where
      // that judgement is made (§5.1).
      if (!existing || existing.status !== 'running') {
        return false;
      }
      closeSession(entry, existing, lifted);
      return true;
    },

    /**
     * One attempt's subagent sessions and receipts. Copies, so a caller merging
     * them into a durable patch cannot mutate the live state.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @returns {{ sessions: DelegationSession[], legs: UsageLeg[] }}
     */
    get(workspace, attempt_id) {
      const entry = laneFor(workspace).get(attempt_id);
      if (!entry) {
        return { sessions: [], legs: [] };
      }
      return {
        sessions: [...entry.sessions.values()].map((session) => ({
          ...session
        })),
        legs: entry.legs.map((leg) => ({ ...leg, usage: { ...leg.usage } }))
      };
    },

    /**
     * Drop one attempt's state — called once the terminal settlement has folded
     * it onto the attempt record, so the live map holds only live sessions.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     */
    clearAttempt(workspace, attempt_id) {
      laneFor(workspace).delete(attempt_id);
    },

    /**
     * Drop everything (server restart semantics; test hook).
     */
    clear() {
      by_workspace.clear();
    }
  };
}
