/**
 * codex runner adapter (worker-multi-provider-runner §C).
 *
 * CLI (measured against codex 0.147.0):
 * `codex exec --json -m <full_id> [-c model_reasoning_effort=<effort>]
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
 * field with no counterpart here (`reasoning_output_tokens`) is dropped rather
 * than invented into a tally column.
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
 * Judge the LAST terminal turn event.
 *
 * @param {{ raw: any[], exit: number|null, blocked: boolean }} ctx
 * @returns {{ success: boolean, reason: string }}
 */
function verdict(ctx) {
  const terminals = ctx.raw.filter(
    (e) => e && typeof e === 'object' && TERMINAL_TYPES.has(e.type)
  );
  if (terminals.length === 0) {
    return { success: false, reason: 'no_result' };
  }
  const last = terminals[terminals.length - 1];
  if (last.type === 'turn.failed') {
    return { success: false, reason: 'turn_failed' };
  }
  return { success: true, reason: 'ok' };
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
      /** @type {string[]} */
      const args = s.resume_session_id
        ? ['exec', 'resume', String(s.resume_session_id), '--json']
        : ['exec', '--json'];
      if (model_id) {
        args.push('-m', model_id);
      }
      if (s.effort) {
        args.push('-c', `model_reasoning_effort=${String(s.effort)}`);
      }
      // Unattended: no approval prompt can appear, and the user's codex hooks
      // (features.hooks) stay off so a worker session fires none of them.
      args.push('--dangerously-bypass-approvals-and-sandbox');
      args.push('--disable', 'hooks');
      const { system_prompt, task_prompt } = applyPreamble(promptFor(bead), {
        fast_track: !!s.fast_track,
        pr_submit: !s.disposition,
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
