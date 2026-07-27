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
 */
import { applyPreamble } from './preamble.js';
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
 * @param {any} bead
 * @returns {string}
 */
function promptFor(bead) {
  if (bead && typeof bead.prompt === 'string') {
    return bead.prompt;
  }
  const id = bead && typeof bead.id === 'string' ? bead.id : 'bead';
  return `Bead ${id} 작업을 계약 네이티브 흐름으로 완료하라.`;
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
    /** @type {RunnerEvent[]} */
    const out = [];
    for (const c of content) {
      if (!c || typeof c !== 'object') {
        continue;
      }
      if (c.type === 'text' && typeof c.text === 'string') {
        out.push({ kind: 'text', text: c.text, raw });
      } else if (c.type === 'tool_use') {
        out.push({
          kind: 'tool',
          name: String(c.name || ''),
          input: c.input,
          raw
        });
      }
    }
    return out.length > 0 ? out : null;
  }
  if (raw.type === 'result') {
    return {
      kind: 'result',
      message: typeof raw.result === 'string' ? raw.result : undefined,
      raw
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
 * Compute the claude 2-rule success verdict over the LAST `result` event. A
 * headless session may accumulate multiple `result` events (e.g. background
 * task-notification re-entry mid-session); only the final one is judged.
 *
 * @param {{ raw: any[], exit: number|null, blocked: boolean }} ctx
 * @returns {{ success: boolean, reason: string }}
 */
function verdict(ctx) {
  const results = ctx.raw.filter((e) => e && e.type === 'result');
  if (results.length === 0) {
    return { success: false, reason: 'no_result' };
  }
  const r = results[results.length - 1];
  if (r.subtype !== 'success') {
    return { success: false, reason: 'subtype' };
  }
  if (r.is_error !== false) {
    return { success: false, reason: 'is_error' };
  }
  return { success: true, reason: 'ok' };
}

/**
 * Build the claude adapter spec.
 *
 * @param {{ env?: Record<string, string|undefined> }} [options]
 * @returns {AdapterSpec}
 */
export function claudeSpec(options = {}) {
  const routing_env = options.env || {};
  return {
    name: 'claude',
    buildArgv(bead, _workspace, settings) {
      const s = settings || {};
      const args = ['-p', '--output-format', 'stream-json', '--verbose'];
      // Resume branch (spec §1.4): continue the PRIOR claude session id so the
      // resumed run inherits the interrupted session's context.
      if (s.resume_session_id) {
        args.push('--resume', String(s.resume_session_id));
      }
      if (s.model) {
        args.push('--model', String(s.model));
      }
      if (s.effort) {
        args.push('--effort', String(s.effort));
      }
      args.push('--permission-mode', 'bypassPermissions');
      args.push(applyPreamble(promptFor(bead), { fast_track: !!s.fast_track }));
      return { command: 'claude', args, env: routing_env };
    },
    normalize,
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
 * @param {EngineDeps & { name?: 'claude', routing_env?: Record<string, string|undefined> }} deps
 * @returns {RunnerHandle}
 */
export function spawnClaude(bead, workspace, settings, deps) {
  const spec = claudeSpec({ env: deps.routing_env });
  return runSession(spec, bead, workspace, settings, deps);
}
