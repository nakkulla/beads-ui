/**
 * codex runner adapter (worker-multi-provider-runner §C).
 *
 * CLI (measured against codex 0.147.0):
 * `codex exec --json -m <full_id> [-c model_reasoning_effort=<effort>]
 * -c service_tier="default|fast"
 * --dangerously-bypass-approvals-and-sandbox --disable hooks "<prompt>"`, and on
 * the resume branch `codex exec resume <thread_id> --json -m <full_id> …`. The
 * resume branch KEEPS `-m`: codex emits a model-mismatch warning item when a
 * resumed thread is reopened without one.
 *
 * Two shape differences from claude drive most of this file. First, codex has no
 * system-prompt flag, so both preamble channels are concatenated into the single
 * positional prompt — the pair still rides back out on the build result so the
 * recording path reads the SAME assembly the argv carries (UI-rxp3 §3). Second,
 * codex reports an execution twice (`item.started` then `item.completed`); the
 * adapter reacts to `started` only, which is both the earliest point a guard can
 * act and the only way one execution stays one event.
 *
 * Success is the LAST terminal turn event: `turn.completed` passes,
 * `turn.failed` fails, and a stream with neither is `no_result`.
 *
 * @import { AdapterSpec, RunnerEvent, RunnerHandle, EngineDeps } from './session.js'
 * @import { RunnerCatalogEntry } from '../runner-catalog.js'
 */
import { builtinCatalog } from '../runner-catalog.js';
import { applyPreamble, defaultTaskPrompt } from './preamble.js';
import { runSession } from './session.js';

/**
 * Approval-shaped event/item types must fail closed in unattended mode. No
 * approval event is observable under
 * `--dangerously-bypass-approvals-and-sandbox`, so this is a safety net for a
 * codex build that starts emitting one rather than a path taken today.
 *
 * @type {RegExp}
 */
const APPROVAL_RE = /approval/i;

/**
 * The terminal turn events the verdict is judged over.
 *
 * @type {ReadonlySet<string>}
 */
const TERMINAL_TYPES = new Set(['turn.completed', 'turn.failed']);

/**
 * codex usage field → the tallied name the worker stores (UI-raqh §1). A codex
 * field with no counterpart here is dropped rather than invented into a tally
 * column. Reasoning output has a worker tally name, but remains a
 * breakdown-only field in the provider projection.
 *
 * @type {Record<string, string>}
 */
const USAGE_MAP = {
  input_tokens: 'input_tokens',
  output_tokens: 'output_tokens',
  cached_input_tokens: 'cache_read_input_tokens',
  cache_write_input_tokens: 'cache_creation_input_tokens'
};

/**
 * Codex CLI emits snake case, while app-server events use camel case.
 *
 * @type {readonly string[]}
 */
const REASONING_OUTPUT_FIELDS = [
  'reasoning_output_tokens',
  'reasoningOutputTokens'
];

/**
 * The task prompt this bead dispatches with. `defaultTaskPrompt` is the shared
 * source the scheduler also builds on, so the fallback cannot drift.
 *
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
 * The `item` payload of an item event, or null when the line carries none.
 *
 * @param {any} raw
 * @returns {any}
 */
function itemOf(raw) {
  const item = raw.item;
  return item && typeof item === 'object' ? item : null;
}

/**
 * @param {unknown} message
 * @param {any} raw
 * @returns {RunnerEvent}
 */
function errorEvent(message, raw) {
  return {
    kind: 'error',
    message:
      typeof message === 'string' && message.length > 0
        ? message
        : 'codex 러너가 메시지 없는 오류를 보고했습니다.',
    raw
  };
}

/**
 * Expand a catalog short name (`sol`) into the CLI model id (`gpt-5.6-sol`). A
 * name the catalog does not know passes through verbatim — the catalog is the
 * curated list, not an allowlist, so a model added on the CLI side is usable
 * before it is catalogued.
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
 * Lift the usage off ONE raw codex event. Only `turn.completed` carries any, and
 * it is the turn's authoritative total, so the lift is always `result`-kinded.
 * Fail-quiet like the claude adapter: a build that stops reporting usage must
 * degrade to "no badge", never to a throw.
 *
 * @param {any} raw
 * @returns {{ kind: 'message'|'result', usage: Record<string, number|string> }|null}
 */
export function liftUsage(raw) {
  if (!raw || typeof raw !== 'object' || raw.type !== 'turn.completed') {
    return null;
  }
  const usage = raw.usage;
  if (!usage || typeof usage !== 'object') {
    return null;
  }
  /** @type {Record<string, number|string>} */
  const out = {};
  for (const [source, target] of Object.entries(USAGE_MAP)) {
    const value = usage[source];
    if (typeof value === 'number' && Number.isFinite(value)) {
      out[target] = value;
    }
  }
  for (const source of REASONING_OUTPUT_FIELDS) {
    const value = usage[source];
    if (typeof value === 'number' && Number.isFinite(value)) {
      out.reasoning_output_tokens = value;
      break;
    }
  }
  return Object.keys(out).length > 0 ? { kind: 'result', usage: out } : null;
}

/**
 * Normalize one codex jsonl line.
 *
 * @param {any} raw
 * @returns {RunnerEvent|null}
 */
function normalize(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  if (raw.type === 'item.started') {
    const item = itemOf(raw);
    if (item && item.type === 'command_execution') {
      return {
        kind: 'tool',
        name: 'shell',
        input: {
          command: typeof item.command === 'string' ? item.command : ''
        },
        raw
      };
    }
    return null;
  }
  if (raw.type === 'item.completed') {
    const item = itemOf(raw);
    if (!item) {
      return null;
    }
    if (item.type === 'agent_message' && typeof item.text === 'string') {
      return { kind: 'text', text: item.text, raw };
    }
    if (item.type === 'error') {
      return errorEvent(item.message, raw);
    }
    // `command_execution` is deliberately dropped here: its `item.started` twin
    // already produced the tool event. `reasoning` carries no consumer.
    return null;
  }
  if (raw.type === 'error') {
    return errorEvent(raw.message, raw);
  }
  if (raw.type === 'turn.failed') {
    const error = raw.error;
    return errorEvent(
      error && typeof error === 'object' ? error.message : undefined,
      raw
    );
  }
  if (raw.type === 'turn.completed') {
    return { kind: 'result', usage: liftUsage(raw)?.usage, raw };
  }
  return null;
}

/**
 * Detect a codex approval request (fail-closed safety net).
 *
 * @param {any} raw
 * @returns {string|null}
 */
function detectQuestion(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  const type = typeof raw.type === 'string' ? raw.type : '';
  if (APPROVAL_RE.test(type)) {
    return `approval event: ${type}`;
  }
  if (type === 'item.started' || type === 'item.completed') {
    const item = itemOf(raw);
    if (item && typeof item.type === 'string' && APPROVAL_RE.test(item.type)) {
      return `approval item: ${item.type}`;
    }
  }
  return null;
}

/**
 * Extract the shell command a codex execution is starting, else null. Feeds the
 * engine's merge guards off the SAME line `normalize` emits its tool event from,
 * so the guard and the visible tool event can never disagree about what ran.
 *
 * @param {any} raw
 * @returns {string|null}
 */
function extractShellCommand(raw) {
  if (!raw || typeof raw !== 'object' || raw.type !== 'item.started') {
    return null;
  }
  const item = itemOf(raw);
  if (
    item &&
    item.type === 'command_execution' &&
    typeof item.command === 'string' &&
    item.command.length > 0
  ) {
    return item.command;
  }
  return null;
}

/**
 * Extract the codex thread id (what `codex exec resume` accepts) from the
 * `thread.started` line. A resumed run re-announces the SAME id, so the engine's
 * emit-once contract stays coherent across a resume.
 *
 * @param {any} raw
 * @returns {string|null}
 */
function extractSessionId(raw) {
  if (
    raw &&
    typeof raw === 'object' &&
    raw.type === 'thread.started' &&
    typeof raw.thread_id === 'string' &&
    raw.thread_id.length > 0
  ) {
    return raw.thread_id;
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
 * The literal a codex stream that reported nothing about itself carries
 * (worker-failure-tiers §6). It is a summary VALUE rather than a null, so the
 * classifier and the tile both read the same "the session said nothing" fact
 * instead of one of them inventing it.
 *
 * @type {string}
 */
const NO_RESULT_SUMMARY = 'no_result';

/**
 * The first non-empty line of a reported sentence, trimmed to
 * {@link SUMMARY_MAX_CHARS}. A non-string yields null: a stringified object
 * would match no environment pattern while still looking like evidence.
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
 * The session's own last sentence, in the priority the design fixes
 * (worker-failure-tiers §6): a failed turn's `error.message` first, because it
 * names why the turn ended; otherwise the last agent message, which is what a
 * session that ended on its own terms reported; otherwise the `no_result`
 * literal.
 *
 * @param {any[]} raw
 * @returns {string}
 */
function extractSummary(raw) {
  /** @type {string|null} */
  let agent_message = null;
  /** @type {string|null} */
  let turn_failure = null;
  for (const event of raw) {
    if (!event || typeof event !== 'object') {
      continue;
    }
    if (event.type === 'turn.failed') {
      const error = event.error;
      const message =
        error && typeof error === 'object' ? summaryOf(error.message) : null;
      if (message) {
        turn_failure = message;
      }
      continue;
    }
    if (event.type === 'item.completed') {
      const item = itemOf(event);
      if (item && item.type === 'agent_message') {
        const text = summaryOf(item.text);
        if (text) {
          agent_message = text;
        }
      }
    }
  }
  return turn_failure ?? agent_message ?? NO_RESULT_SUMMARY;
}

/**
 * Judge the LAST terminal turn event, and lift the session's own sentence off
 * the same stream (worker-failure-tiers §6).
 *
 * @param {{ raw: any[], exit: number|null, blocked: boolean }} ctx
 * @returns {{ success: boolean, reason: string, summary: string|null }}
 */
function verdict(ctx) {
  const summary = extractSummary(ctx.raw);
  const terminals = ctx.raw.filter(
    (e) => e && typeof e === 'object' && TERMINAL_TYPES.has(e.type)
  );
  if (terminals.length === 0) {
    return { success: false, reason: 'no_result', summary };
  }
  const last = terminals[terminals.length - 1];
  if (last.type === 'turn.failed') {
    return { success: false, reason: 'turn_failed', summary };
  }
  return { success: true, reason: 'ok', summary };
}

/**
 * Build the codex adapter spec. `catalog_entry` is the resolved catalog's codex
 * entry, so a `[runner.codex]` config override reaches the argv; absent one the
 * builtin entry stands and a zero-config install still dispatches.
 *
 * @param {RunnerCatalogEntry} [catalog_entry]
 * @param {{ env?: Record<string, string|undefined> }} [options]
 * @returns {AdapterSpec}
 */
export function codexSpec(catalog_entry, options = {}) {
  const entry = catalog_entry ?? builtinCatalog().codex;
  const routing_env = options.env || {};
  return {
    name: 'codex',
    buildArgv(bead, _workspace, settings) {
      const s = settings || {};
      const model_id = resolveModelId(entry, s.model);
      // Fork branch (UI-p206 §4): `fork` inherits the named thread's context
      // onto a NEW thread id, leaving the original rollout file untouched. It
      // is a MODIFIER of the resume branch — without a thread id there is
      // nothing to fork, so the flag alone leaves the fresh argv exactly as it
      // was.
      //
      // MEASURED 2026-08-26 (§8's required experiment), codex-cli 0.148.0:
      // `codex exec fork 01a03b2f-266d-… --json -m gpt-5.6-luna` announced a
      // DIFFERENT thread_id (01a03b2f-58e2-…) on the `thread.started` line that
      // `extractSessionId` reads, and still answered the token the base thread
      // had been told to remember. The base rollout file was byte-identical
      // before and after. `fork` also takes `-m` in the same position `resume`
      // does, which is why the model/effort/service_tier assembly below needs no
      // branch of its own.
      /** @type {string[]} */
      const args = s.resume_session_id
        ? [
            'exec',
            s.fork_session ? 'fork' : 'resume',
            String(s.resume_session_id),
            '--json'
          ]
        : ['exec', '--json'];
      if (model_id) {
        args.push('-m', model_id);
      }
      if (s.effort) {
        args.push('-c', `model_reasoning_effort=${String(s.effort)}`);
      }
      const speed = s.speed ?? 'default';
      if (speed !== 'default' && speed !== 'fast') {
        throw new Error(`unknown orchestration speed: ${String(speed)}`);
      }
      args.push('-c', `service_tier="${speed}"`);
      // Unattended: no approval prompt can appear, and the user's codex hooks
      // (features.hooks) stay off so a worker session fires none of them.
      // A review-mode attempt gets codex's native read-only sandbox instead of
      // the writable bypass (UI-58w8 §3) — the reviewer cannot mutate the
      // checkout even if its prompt contract were ignored.
      if (s.mode === 'review') {
        args.push('--sandbox', 'read-only');
      } else {
        args.push('--dangerously-bypass-approvals-and-sandbox');
      }
      args.push('--disable', 'hooks');
      const { system_prompt, task_prompt } = applyPreamble(promptFor(bead), {
        review: s.mode === 'review',
        fast_track: !!s.fast_track,
        pr_submit: !s.disposition && !s.quickfix_lane,
        disposition: !!s.disposition,
        quickfix_lane: !!s.quickfix_lane,
        target_base: typeof s.target_base === 'string' ? s.target_base : null
      });
      // codex has no `--append-system-prompt` equivalent, so the two channels
      // collapse into the one positional prompt. The pair still rides back out
      // unconcatenated: the recording path reads THIS build's fields instead of
      // re-splitting the positional string (UI-rxp3 §3).
      args.push(`${system_prompt}\n\n${task_prompt}`);
      return {
        command: entry.command,
        args,
        env: { CODEX_SILENT: '1', ...routing_env },
        system_prompt,
        task_prompt
      };
    },
    normalize,
    liftUsage,
    detectQuestion,
    extractShellCommand,
    extractSessionId,
    verdict
  };
}

/**
 * Spawn a codex headless session.
 *
 * @param {any} bead
 * @param {string} workspace
 * @param {any} settings
 * @param {EngineDeps & { name?: 'codex', catalog_entry?: RunnerCatalogEntry, routing_env?: Record<string, string|undefined> }} deps
 * @returns {RunnerHandle}
 */
export function spawnCodex(bead, workspace, settings, deps) {
  const spec = codexSpec(deps.catalog_entry, { env: deps.routing_env });
  return runSession(spec, bead, workspace, settings, deps);
}
