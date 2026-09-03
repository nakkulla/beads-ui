/**
 * claude runner adapter (spec §5.4) — the worker's only runner.
 *
 * CLI: `claude -p --output-format stream-json --verbose --model <alias>
 * [--effort <lv>] --permission-mode bypassPermissions "<prompt>"` with stdin
 * closed. Success is the confirmed 2-rule test over the LAST `result` event:
 * subtype==='success' ∧ is_error===false (runner-spike-findings.md).
 * `permission_denials` is NOT a rule: under bypassPermissions those are
 * hook/policy denials the session observes as tool errors and routinely
 * recovers from — real interactive asks are caught by the question-tool
 * blocker, and unrecovered work loss by independent PR verification.
 *
 * @import { AdapterSpec, RunnerEvent, RunnerHandle, EngineDeps } from './session.js'
 * @import { RunnerCatalogEntry } from '../runner-catalog.js'
 */
import { resolveCswapPath } from '../../routes/claude-usage.js';
import { builtinCatalog } from '../runner-catalog.js';
import { applyPreamble, defaultTaskPrompt } from './preamble.js';
import { runSession } from './session.js';

/**
 * Interactive question / approval tool names that must fail closed in
 * unattended mode. The canonical Claude Code interactive tool is
 * `AskUserQuestion`; the pattern also catches elicitation-style variants.
 *
 * @type {RegExp}
 */
const QUESTION_TOOL_RE = /ask.?user.?question|^ask_?user|elicit/i;

/**
 * Expand a catalog short name (`opus-4.6`) into the CLI model id
 * (`claude-opus-4-6`). A name the catalog does not know passes through
 * verbatim — the catalog is the curated list, not an allowlist.
 *
 * @param {RunnerCatalogEntry} entry
 * @param {unknown} model
 * @returns {string|null}
 */
function resolveModelId(entry, model) {
  if (typeof model !== 'string' || model.length === 0) {
    return null;
  }
  return Object.prototype.hasOwnProperty.call(entry.models, model)
    ? entry.models[model].id
    : model;
}

/**
 * @param {any} bead
 * @returns {string}
 */
function promptFor(bead) {
  if (bead && typeof bead.prompt === 'string') {
    return bead.prompt;
  }
  const id = bead && typeof bead.id === 'string' ? bead.id : 'bead';
  return defaultTaskPrompt(id);
}

/**
 * The usage fields the worker tallies (UI-raqh §1), lifted verbatim off a
 * stream payload. Everything else claude reports there (`cache_creation`
 * breakdowns, `server_tool_use`, `service_tier`) is dropped: the tally only
 * ever shows these five.
 *
 * @type {string[]}
 */
const USAGE_FIELDS = [
  'input_tokens',
  'output_tokens',
  'cache_read_input_tokens',
  'cache_creation_input_tokens'
];

/**
 * Project a raw `usage` payload onto the tallied fields, optionally stamped
 * with the message it belongs to (the id is what keeps a repeated streaming
 * message from being counted twice) and the session cost. Returns undefined
 * when there is nothing usable — fail-quiet, exactly like the rest of the
 * adapter: a runner build that stops reporting usage must degrade to "no
 * badge", never to a throw.
 *
 * @param {any} usage
 * @param {{ message_id?: unknown, total_cost_usd?: unknown }} [extra]
 * @returns {Record<string, number|string>|undefined}
 */
function pickUsage(usage, extra = {}) {
  if (!usage || typeof usage !== 'object') {
    return undefined;
  }
  /** @type {Record<string, number|string>} */
  const out = {};
  if (typeof extra.message_id === 'string' && extra.message_id.length > 0) {
    out.message_id = extra.message_id;
  }
  for (const field of USAGE_FIELDS) {
    const value = usage[field];
    if (typeof value === 'number' && Number.isFinite(value)) {
      out[field] = value;
    }
  }
  if (
    typeof extra.total_cost_usd === 'number' &&
    Number.isFinite(extra.total_cost_usd)
  ) {
    out.total_cost_usd = extra.total_cost_usd;
  }
  // A payload with an id but no number says nothing about consumption.
  const has_number = Object.keys(out).some((k) => k !== 'message_id');
  return has_number ? out : undefined;
}

/**
 * Lift the usage off ONE raw stream event, tagged with which recording rule it
 * obeys: `message` usage is keyed by `message_id` and a repeat REPLACES, while
 * `result` usage is the session's own authoritative total. Null when the event
 * carries no usable usage.
 *
 * `normalize()` (live path) and `usage-replay.js` (session-log replay path)
 * both go through this, so a restart-recovered tally can never drift from the
 * one the live stream would have produced.
 *
 * @param {any} raw
 * @returns {{ kind: 'message'|'result', usage: Record<string, number|string> }|null}
 */
export function liftUsage(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  // A subagent's `assistant` messages ride the PARENT stream (UI-2mpn §2.1),
  // but the parent's own authoritative `result.usage` EXCLUDES their tokens
  // (§2.3). Lifting them here would count the same tokens twice — once in the
  // attempt's live tally and again in the subagent's receipt — and an attempt
  // that ends without a `result` would keep the inflated total for good.
  if (
    typeof raw.parent_tool_use_id === 'string' &&
    raw.parent_tool_use_id.length > 0
  ) {
    return null;
  }
  if (raw.type === 'assistant') {
    const usage = raw.message
      ? pickUsage(raw.message.usage, { message_id: raw.message.id })
      : undefined;
    return usage ? { kind: 'message', usage } : null;
  }
  if (raw.type === 'result') {
    const usage = pickUsage(raw.usage, { total_cost_usd: raw.total_cost_usd });
    return usage ? { kind: 'result', usage } : null;
  }
  return null;
}

/**
 * The four token counters a subagent's terminal `tool_use_result` reports
 * (UI-2mpn §2.2). All four or none: a partial payload is not a receipt, and a
 * receipt with an invented zero would understate the Claude headline silently.
 *
 * @type {Array<'input_tokens'|'output_tokens'|'cache_read_input_tokens'|'cache_creation_input_tokens'>}
 */
const SUBAGENT_USAGE_FIELDS = [
  'input_tokens',
  'output_tokens',
  'cache_read_input_tokens',
  'cache_creation_input_tokens'
];

/**
 * One subagent signal read off ONE line (UI-2mpn §5.1, UI-1663 §5.1).
 *
 * `launch_ack` is NOT a termination: a backgrounded `Agent` call is answered
 * with an immediate `tool_result`, and the only reason to lift it at all is to
 * keep it from being read as the `end` it looks like. `end` names which receipt
 * it came from, because the two carry different accuracy (four fields versus a
 * total) and the store settles that with a source-aware upgrade rule (§5.2).
 *
 * @typedef {{ kind: 'start', launch_id: string, agent_type: string|null, model_alias: string|null, at: number|null }
 *   | { kind: 'progress', launch_id: string, model: string|null, proves_session: boolean, at: number|null }
 *   | { kind: 'launch_ack', launch_id: string, at: number|null }
 *   | { kind: 'end', source: 'tool_result'|'notification', launch_id: string, is_error: boolean, result_status: string|null, agent_id: string|null, agent_type: string|null, model: string|null, usage: { input_tokens: number, output_tokens: number, cache_read_input_tokens: number, cache_creation_input_tokens: number }|null, total_tokens: number|null, at: number|null }} DelegationSignal
 */

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function nonEmpty(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * The event's OWN timestamp in epoch ms, or null when the line carries none.
 *
 * Receipt time never comes from the clock: the live tail and the session-log
 * replay must read the same number out of the same line, and a wall clock read
 * at consumption time would differ between them by the length of the outage.
 *
 * @param {unknown} value
 * @returns {number|null}
 */
function epochOf(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return null;
  }
  const at = Date.parse(value);
  return Number.isFinite(at) ? at : null;
}

/**
 * The subagent usage block of a terminal `tool_use_result`, or null when it is
 * absent or not four integers.
 *
 * @param {any} usage
 * @returns {{ input_tokens: number, output_tokens: number, cache_read_input_tokens: number, cache_creation_input_tokens: number }|null}
 */
function pickSubagentUsage(usage) {
  if (!usage || typeof usage !== 'object') {
    return null;
  }
  for (const field of SUBAGENT_USAGE_FIELDS) {
    const value = usage[field];
    if (!Number.isInteger(value) || value < 0) {
      return null;
    }
  }
  return {
    input_tokens: usage.input_tokens,
    output_tokens: usage.output_tokens,
    cache_read_input_tokens: usage.cache_read_input_tokens,
    cache_creation_input_tokens: usage.cache_creation_input_tokens
  };
}

/**
 * Lift the `Agent` (subagent) delegation signal off ONE raw stream line
 * (UI-2mpn §5.1) — the sibling of {@link liftUsage}, and stateless for the same
 * reason: the live scheduler subscription, the detached-session monitor, and
 * the session-log replay all call it on the same line and must derive the same
 * fact from it. Everything that needs history — which launch ids exist, what a
 * session's status is, whether a receipt may be written — belongs to
 * `delegation-store.js`, not here.
 *
 * A `tool_result` this parser reports as `end` is only a CANDIDATE: one line
 * cannot tell an `Agent` result apart from any other tool's, so the store
 * drops the ones whose launch id it never saw start (§5.2).
 *
 * @param {any} raw
 * @returns {DelegationSignal|null}
 */
export function liftDelegation(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  const at = epochOf(raw.timestamp);
  // The ONLY termination a backgrounded subagent leaves in the parent stream,
  // and the one a synchronous subagent leaves FIRST (§2.5). It stays stateless
  // because the line carries both ids at once: `tool_use_id` is the launch id
  // and `task_id` is the `agentId` a synchronous receipt would report (§2.7).
  // `task_updated` cannot do that — it has no `tool_use_id` (§2.6) — so it is
  // not read here.
  if (raw.type === 'system' && raw.subtype === 'task_notification') {
    const launch_id = nonEmpty(raw.tool_use_id);
    if (!launch_id) {
      return null;
    }
    const notified_usage =
      raw.usage && typeof raw.usage === 'object' ? raw.usage : {};
    return {
      kind: 'end',
      source: 'notification',
      launch_id,
      is_error: false,
      result_status: nonEmpty(raw.status),
      agent_id: nonEmpty(raw.task_id),
      agent_type: null,
      model: null,
      // §2.1: the notification reports `{ total_tokens, tool_uses,
      // duration_ms }` — a total, never the four-field breakdown.
      usage: null,
      total_tokens:
        Number.isInteger(notified_usage.total_tokens) &&
        notified_usage.total_tokens >= 0
          ? notified_usage.total_tokens
          : null,
      // §2.1: the line carries no `timestamp`, and the receive clock would make
      // the live tail and the replay disagree about the same line.
      at: null
    };
  }
  const parent_tool_use_id = nonEmpty(raw.parent_tool_use_id);
  if (parent_tool_use_id) {
    if (
      raw.type !== 'assistant' &&
      raw.type !== 'user' &&
      raw.type !== 'tool_progress'
    ) {
      return null;
    }
    // A `tool_progress` line is not proof of a subagent: backgrounded tool
    // calls (a timed-out Bash task, `TaskOutput` polling) also stamp their
    // originating `tool_use.id` as `parent_tool_use_id` on progress lines. A
    // subagent's own turns ride as `assistant`/`user` — only those may
    // synthesize a session the store never saw start (§5.2).
    return {
      kind: 'progress',
      launch_id: parent_tool_use_id,
      model:
        raw.type === 'assistant' && raw.message
          ? nonEmpty(raw.message.model)
          : null,
      proves_session: raw.type !== 'tool_progress',
      at
    };
  }
  if (raw.type === 'assistant') {
    const content =
      raw.message && Array.isArray(raw.message.content)
        ? raw.message.content
        : [];
    for (const block of content) {
      if (
        !block ||
        typeof block !== 'object' ||
        block.type !== 'tool_use' ||
        block.name !== 'Agent'
      ) {
        continue;
      }
      const launch_id = nonEmpty(block.id);
      if (!launch_id) {
        continue;
      }
      const input =
        block.input && typeof block.input === 'object' ? block.input : {};
      return {
        kind: 'start',
        launch_id,
        agent_type: nonEmpty(input.subagent_type),
        model_alias: nonEmpty(input.model),
        at
      };
    }
    return null;
  }
  if (raw.type === 'user') {
    const content =
      raw.message && Array.isArray(raw.message.content)
        ? raw.message.content
        : [];
    for (const block of content) {
      if (!block || typeof block !== 'object' || block.type !== 'tool_result') {
        continue;
      }
      const launch_id = nonEmpty(block.tool_use_id);
      if (!launch_id) {
        continue;
      }
      const result =
        raw.tool_use_result && typeof raw.tool_use_result === 'object'
          ? raw.tool_use_result
          : {};
      // A `run_in_background: true` launch is acknowledged IMMEDIATELY with a
      // `tool_result` (§1.1). Reading it as an end closes the session before
      // the subagent has done anything, so it is lifted as its own signal.
      if (result.isAsync === true || result.status === 'async_launched') {
        return { kind: 'launch_ack', launch_id, at };
      }
      return {
        kind: 'end',
        source: 'tool_result',
        launch_id,
        is_error: block.is_error === true,
        result_status: nonEmpty(result.status),
        agent_id: nonEmpty(result.agentId),
        agent_type: nonEmpty(result.agentType),
        model: nonEmpty(result.resolvedModel),
        usage: pickSubagentUsage(result.usage),
        total_tokens:
          typeof result.totalTokens === 'number' &&
          Number.isFinite(result.totalTokens)
            ? result.totalTokens
            : null,
        at
      };
    }
    return null;
  }
  return null;
}

/**
 * Normalize a claude stream-json line to zero or more normalized events.
 *
 * @param {any} raw
 * @returns {RunnerEvent|RunnerEvent[]|null}
 */
function normalize(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  if (raw.type === 'assistant') {
    const content =
      raw.message && Array.isArray(raw.message.content)
        ? raw.message.content
        : [];
    // Every event of one assistant message carries the SAME usage snapshot, so
    // the consumer must key on `message_id` and replace rather than add.
    const usage = liftUsage(raw)?.usage;
    /** @type {RunnerEvent[]} */
    const out = [];
    for (const c of content) {
      if (!c || typeof c !== 'object') {
        continue;
      }
      if (c.type === 'text' && typeof c.text === 'string') {
        out.push({ kind: 'text', text: c.text, raw, usage });
      } else if (c.type === 'tool_use') {
        out.push({
          kind: 'tool',
          name: String(c.name || ''),
          input: c.input,
          raw,
          usage
        });
      }
    }
    return out.length > 0 ? out : null;
  }
  if (raw.type === 'result') {
    return {
      kind: 'result',
      message: typeof raw.result === 'string' ? raw.result : undefined,
      raw,
      // The session's own total — authoritative, so the consumer replaces the
      // per-message tally with it.
      usage: liftUsage(raw)?.usage
    };
  }
  return null;
}

/**
 * Detect a claude interactive request (fail-closed): a question tool_use mid
 * stream.
 *
 * @param {any} raw
 * @returns {string|null}
 */
function detectQuestion(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  if (raw.type === 'assistant') {
    const content =
      raw.message && Array.isArray(raw.message.content)
        ? raw.message.content
        : [];
    for (const c of content) {
      if (
        c &&
        c.type === 'tool_use' &&
        typeof c.name === 'string' &&
        QUESTION_TOOL_RE.test(c.name)
      ) {
        return `question tool: ${c.name}`;
      }
    }
  }
  return null;
}

/**
 * Extract the shell command from a claude Bash/Shell tool_use, else null. Feeds
 * the session engine's two fail-closed merge guards (worker-phase2 §1).
 *
 * @param {any} raw
 * @returns {string|null}
 */
function extractShellCommand(raw) {
  if (!raw || typeof raw !== 'object' || raw.type !== 'assistant') {
    return null;
  }
  const content =
    raw.message && Array.isArray(raw.message.content)
      ? raw.message.content
      : [];
  for (const c of content) {
    if (
      c &&
      c.type === 'tool_use' &&
      typeof c.name === 'string' &&
      /^(bash|shell)$/i.test(c.name) &&
      c.input &&
      typeof c.input.command === 'string'
    ) {
      return c.input.command;
    }
  }
  return null;
}

/**
 * Extract the claude session id from the `system`/`init` line's `session_id`
 * (the id `claude --resume` accepts). Only the `init` subtype is authoritative —
 * `hook_started` lines also carry a `session_id` but predate the real session
 * (spec §2).
 *
 * @param {any} raw
 * @returns {string|null}
 */
function extractSessionId(raw) {
  if (
    raw &&
    typeof raw === 'object' &&
    raw.type === 'system' &&
    raw.subtype === 'init' &&
    typeof raw.session_id === 'string' &&
    raw.session_id.length > 0
  ) {
    return raw.session_id;
  }
  return null;
}

/**
 * How much of the session's closing sentence a summary keeps
 * (worker-failure-tiers §6).
 *
 * @type {number}
 */
const SUMMARY_MAX_CHARS = 200;

/**
 * The session's own sentence, cut to what a failure tile can carry
 * (worker-failure-tiers §6): the first non-empty line, trimmed, at most 200
 * characters. A non-string carries no sentence and yields null rather than a
 * stringified object — the classifier matches environment patterns against
 * this, and `[object Object]` would match nothing while looking like evidence.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function summaryOf(value) {
  if (typeof value !== 'string') {
    return null;
  }
  for (const line of value.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      return trimmed.slice(0, SUMMARY_MAX_CHARS);
    }
  }
  return null;
}

/**
 * Compute the claude 2-rule success verdict over the LAST `result` event. A
 * headless session may accumulate multiple `result` events (e.g. background
 * task-notification re-entry mid-session); only the final one is judged.
 *
 * The same event supplies the verdict's `summary`: claude reports its closing
 * text in `result`, and an errored run may put the sentence in `error` instead
 * (worker-failure-tiers §6). The summary is lifted for a PASSING result too —
 * a session that ended unresolved is judged on what it said, not on its exit.
 *
 * @param {{ raw: any[], exit: number|null, blocked: boolean }} ctx
 * @returns {{ success: boolean, reason: string, summary: string|null }}
 */
function verdict(ctx) {
  const results = ctx.raw.filter((e) => e && e.type === 'result');
  if (results.length === 0) {
    return { success: false, reason: 'no_result', summary: null };
  }
  const r = results[results.length - 1];
  const summary =
    r.is_error === true
      ? (summaryOf(r.result) ?? summaryOf(r.error))
      : summaryOf(r.result);
  if (r.subtype !== 'success') {
    return { success: false, reason: 'subtype', summary };
  }
  if (r.is_error !== false) {
    return { success: false, reason: 'is_error', summary };
  }
  return { success: true, reason: 'ok', summary };
}

/**
 * Build the claude adapter spec.
 *
 * @param {{ catalog_entry?: RunnerCatalogEntry, env?: Record<string, string|undefined>, cswap_path?: string|null }} [options]
 * @returns {AdapterSpec}
 */
export function claudeSpec(options = {}) {
  const entry = options.catalog_entry ?? builtinCatalog().claude;
  const routing_env = options.env || {};
  return {
    name: 'claude',
    buildArgv(bead, _workspace, settings) {
      const s = settings || {};
      const speed = s.speed ?? 'default';
      if (speed !== 'default') {
        throw new Error(`unknown orchestration speed: ${String(speed)}`);
      }
      const args = ['-p', '--output-format', 'stream-json', '--verbose'];
      // Resume branch (spec §1.4): continue the PRIOR claude session id so the
      // resumed run inherits the interrupted session's context.
      if (s.resume_session_id) {
        args.push('--resume', String(s.resume_session_id));
        // Fork branch (UI-p206 §4): inherit the named session's context but
        // branch onto a NEW session id, so the transcript this resumes from is
        // never appended to. It is a MODIFIER of the resume branch, not a mode
        // of its own — `fork_session` without a session to fork means nothing,
        // and is therefore ignored rather than turned into a fresh-session flag.
        //
        // MEASURED 2026-08-26 (§8's required experiment), claude 2.1.246 under
        // this exact headless argv: `--resume 93e77430-… --fork-session`
        // announced a DIFFERENT session_id (596e4dc9-…) on the `system`/`init`
        // line that `extractSessionId` reads, and still answered the token the
        // base session had been told to remember — so context is inherited on
        // the new id. The base transcript file was byte-identical before and
        // after (same length, mtime and sha256) and the forked run wrote its own
        // separate file.
        if (s.fork_session) {
          args.push('--fork-session');
        }
      }
      const model_id = resolveModelId(entry, s.model);
      if (model_id) {
        args.push('--model', model_id);
      }
      if (s.effort) {
        args.push('--effort', String(s.effort));
      }
      args.push('--permission-mode', 'bypassPermissions');
      // The two channels (UI-rxp3 §2): the session-constant contract goes to
      // `--append-system-prompt`, and only the task stays positional. The
      // resume branch above takes the same path deliberately — a `--resume`
      // run re-declares the contract instead of relying on it surviving deep in
      // the resumed history.
      //
      // MEASURED 2026-08-06 (§2's required experiment): `--resume <sid>` DOES
      // apply a fresh `--append-system-prompt`. A resumed session was given a
      // second marker on that channel and echoed both the original and the new
      // one, so the resumed run sees the current contract, not a frozen copy.
      // The spec's fallback — re-prefixing the contract onto the task prompt on
      // the resume path only — is therefore not applied.
      const { system_prompt, task_prompt } = applyPreamble(promptFor(bead), {
        // Review mode swaps in the read-only review contract; claude has no
        // native read-only sandbox for a Bash-capable session, so the
        // contract plus the Worker's post-verdict drift checks are the
        // enforcement pair here.
        review: s.mode === 'review',
        fast_track: !!s.fast_track,
        pr_submit: !s.disposition && !s.quickfix_lane,
        disposition: !!s.disposition,
        quickfix_lane: !!s.quickfix_lane,
        // The base the session must open its PR against
        // (worker-base-scope-alignment §4).
        target_base: typeof s.target_base === 'string' ? s.target_base : null
      });
      args.push('--append-system-prompt', system_prompt);
      args.push(task_prompt);
      // Worker sessions inherit the user's `~/.claude/settings.json` hooks, so a
      // headless run would fire the Stop hook's "응답 완료" Discord notice on top
      // of the worker lane's own. `CLAUDE_HOOK_SUPPRESS` is the dotfiles-side
      // blanket switch; `routing_env` still wins if it names the same key.
      // Claude print mode's default ceiling kills the process 600 s after the
      // last turn while background tasks are still running. A Worker session may
      // leave a delegated run (Codex bridge, hard timeout 7200 s) in the
      // background, so raise the ceiling to that same 7200 s rather than remove
      // it. A subagent's completion notification resets the clock, so consecutive
      // delegations survive, while a holder that never ends is bounded instead of
      // hanging the slot forever (UI-q2fa, UI-3wkt). `routing_env` still wins if
      // it names the same key.
      //
      // `system_prompt`/`task_prompt` ride back out with the argv so the spawn
      // path records what was ACTUALLY sent (UI-rxp3 §3) — the recording reads
      // this one assembly rather than repeating it, which is what makes the two
      // incapable of drifting.
      const claude_account =
        typeof s.claude_account === 'string' && s.claude_account.length > 0
          ? s.claude_account
          : null;
      const cswap_path = claude_account
        ? typeof s.cswap_path === 'string' && s.cswap_path.length > 0
          ? s.cswap_path
          : options.cswap_path || resolveCswapPath()
        : null;
      if (claude_account && !cswap_path) {
        throw new Error('cswap_unavailable');
      }
      return {
        command: cswap_path || 'claude',
        args: claude_account
          ? ['run', claude_account, '--share-history', '--', ...args]
          : args,
        env: {
          CLAUDE_HOOK_SUPPRESS: '1',
          CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS: '7200000',
          ...routing_env
        },
        system_prompt,
        task_prompt
      };
    },
    normalize,
    // Also a named export, still imported directly by `usage-replay.js`. The
    // spec member is what the engine-facing contract requires (AdapterSpec), and
    // both names resolve to the one function, so the replay path cannot drift
    // from the live one while that import is rewired.
    liftUsage,
    // Claude-only (UI-2mpn §5.4): the codex adapter defines no such member, so
    // a codex log read through `adapterSpec()` simply skips the delegation
    // pass instead of parsing a shape it never wrote.
    liftDelegation,
    detectQuestion,
    extractShellCommand,
    extractSessionId,
    verdict
  };
}

/**
 * Spawn a claude headless session.
 *
 * @param {any} bead
 * @param {string} workspace
 * @param {any} settings
 * @param {EngineDeps & { name?: 'claude', catalog_entry?: RunnerCatalogEntry, routing_env?: Record<string, string|undefined> }} deps
 * @returns {RunnerHandle}
 */
export function spawnClaude(bead, workspace, settings, deps) {
  const spec = claudeSpec({
    catalog_entry: deps.catalog_entry,
    env: deps.routing_env
  });
  return runSession(spec, bead, workspace, settings, deps);
}
