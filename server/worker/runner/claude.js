/**
 * claude runner adapter (spec §5.4), shared by the `claude` and `ccx` runners.
 *
 * ccx (claude-code-proxy) presents the SAME CLI interface as claude and differs
 * only by environment routing (runner-spike-findings.md), so both are one
 * implementation parameterized by `{ name, env }`.
 *
 * CLI: `claude -p --output-format stream-json --verbose --model <alias>
 * [--effort <lv>] --permission-mode bypassPermissions "<prompt>"` with stdin
 * closed. Success is the confirmed 4-rule test over the single `result` event:
 * exactly one result ∧ subtype==='success' ∧ is_error===false ∧
 * permission_denials===[] (runner-spike-findings.md).
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
 * Detect a claude interactive request (fail-closed). A question tool_use mid
 * stream, or non-empty `permission_denials` on the terminal result event.
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
  if (
    raw.type === 'result' &&
    Array.isArray(raw.permission_denials) &&
    raw.permission_denials.length > 0
  ) {
    return 'permission_denials non-empty';
  }
  return null;
}

/**
 * Extract the shell command from a claude Bash/Shell tool_use, else null. Used
 * by the session engine's merge-lock fail-closed guard (spec §5.2).
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
 * Compute the claude 4-rule success verdict.
 *
 * @param {{ raw: any[], exit: number|null, blocked: boolean }} ctx
 * @returns {{ success: boolean, reason: string }}
 */
function verdict(ctx) {
  const results = ctx.raw.filter((e) => e && e.type === 'result');
  if (results.length === 0) {
    return { success: false, reason: 'no_result' };
  }
  if (results.length !== 1) {
    return { success: false, reason: 'result_count' };
  }
  const r = results[0];
  if (r.subtype !== 'success') {
    return { success: false, reason: 'subtype' };
  }
  if (r.is_error !== false) {
    return { success: false, reason: 'is_error' };
  }
  if (
    !Array.isArray(r.permission_denials) ||
    r.permission_denials.length !== 0
  ) {
    return { success: false, reason: 'permission_denials' };
  }
  return { success: true, reason: 'ok' };
}

/**
 * Build the claude adapter spec (used by both claude and ccx).
 *
 * @param {{ name?: 'claude'|'ccx', env?: Record<string, string|undefined> }} [options]
 * @returns {AdapterSpec}
 */
export function claudeSpec(options = {}) {
  const name = options.name === 'ccx' ? 'ccx' : 'claude';
  const routing_env = options.env || {};
  return {
    name,
    buildArgv(bead, _workspace, settings) {
      const s = settings || {};
      const args = ['-p', '--output-format', 'stream-json', '--verbose'];
      if (s.model) {
        args.push('--model', String(s.model));
      }
      if (s.effort) {
        args.push('--effort', String(s.effort));
      }
      args.push('--permission-mode', 'bypassPermissions');
      args.push(
        applyPreamble(promptFor(bead), {
          fast_track: !!s.fast_track,
          merge_lock: s.merge_lock,
          merge_policy: s.merge_policy,
          drift_policy: s.drift_policy
        })
      );
      return { command: 'claude', args, env: routing_env };
    },
    normalize,
    detectQuestion,
    extractShellCommand,
    verdict
  };
}

/**
 * Spawn a claude (or ccx) headless session.
 *
 * @param {any} bead
 * @param {string} workspace
 * @param {any} settings
 * @param {EngineDeps & { name?: 'claude'|'ccx', routing_env?: Record<string, string|undefined> }} deps
 * @returns {RunnerHandle}
 */
export function spawnClaude(bead, workspace, settings, deps) {
  const spec = claudeSpec({ name: deps.name, env: deps.routing_env });
  return runSession(spec, bead, workspace, settings, deps);
}
