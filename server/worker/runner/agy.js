/**
 * agy runner adapter (agy-runtime §3.2).
 *
 * CLI (measured against the installed launcher, 2026-11-28):
 * `agy -p <prompt> --output-format stream-json --model <id>
 * --dangerously-skip-permissions`, and on the resume branch the same argv with
 * `--conversation <id>` appended. agy runs only through the launcher
 * `~/.local/bin/agy`, which carries the paid-credit guard, so the catalog
 * command (`[runner.agy] command` included) is never read; tests inject a path
 * through `options.launcher`.
 *
 * agy has no system-prompt flag, so the preamble is prepended to the task
 * prompt — the pair still rides back out on the build result so the recording
 * path reads the SAME assembly the argv carries (UI-rxp3 §3). The model id
 * already names its effort (`gemini-4-neon-high`), so no effort flag exists,
 * and fork and the `fast` speed are refused rather than silently dropped.
 *
 * The stream is one JSON object per line keyed by `event`: one `init` (whose
 * top-level `conversation_id` is the session id), `step_update` lines for every
 * step of the parent conversation — a subagent appears as the parent's
 * `invoke_subagent` step, not as an interleaved child stream — and one closing
 * `result`. Success is the LAST `result` line's `status === 'SUCCESS'`; a
 * stream with no `result` fails, and the exit code is never read (a silently
 * refused permission still exits 0).
 *
 * The PreToolUse guard does not reach agy through a settings file: the Worker
 * hands the attempt's hook script as `BDUI_PRETOOL_HOOK`, and the dotfiles agy
 * guard runs it as `<path> agy` for every shell command. Nothing is written to
 * the attempt worktree's `.agents/hooks.json`.
 *
 * @import { AdapterSpec, RunnerEvent, RunnerHandle, EngineDeps } from './session.js'
 * @import { RunnerCatalogEntry } from '../runner-catalog.js'
 */
import os from 'node:os';
import path from 'node:path';
import { preToolHookEnv } from '../guard-hook.js';
import { builtinCatalog } from '../runner-catalog.js';
import { workRecoveryReadinessEnv } from '../work-recovery-policy.js';
import { applyPreamble, defaultTaskPrompt } from './preamble.js';
import { runSession } from './session.js';

/**
 * Tools that ask the operator something. An unattended run cannot answer, so
 * one of them is a fail-closed interactive request.
 *
 * @type {ReadonlySet<string>}
 */
const QUESTION_TOOLS = new Set([
  'ask_question',
  'ask_permission',
  'ask_custom_permission'
]);

/**
 * agy usage field → the tallied name the worker stores (UI-raqh §1). A field
 * with no counterpart here is dropped rather than invented into a tally column.
 *
 * @type {Record<string, string>}
 */
const USAGE_MAP = {
  input_tokens: 'input_tokens',
  output_tokens: 'output_tokens',
  cache_read_tokens: 'cache_read_input_tokens',
  thinking_tokens: 'reasoning_output_tokens'
};

/**
 * How much of the session's closing sentence a summary keeps
 * (worker-failure-tiers §6).
 *
 * @type {number}
 */
const SUMMARY_MAX_CHARS = 200;

/**
 * The literal a stream that reported nothing about itself carries
 * (worker-failure-tiers §6).
 *
 * @type {string}
 */
const NO_RESULT_SUMMARY = 'no_result';

/**
 * The agy launcher path for a home directory.
 *
 * @param {string} [home]
 * @returns {string}
 */
export function agyLauncherPath(home = os.homedir()) {
  return path.join(home, '.local', 'bin', 'agy');
}

/**
 * The arguments after the agy launcher for one interactive conversation:
 * `--model <id>` when the launch picks its own model, `--conversation <id>` to
 * resume, and `-i <prompt>` for the first turn. `--dangerously-skip-permissions`
 * is not here: the tmux launcher adds it to every agy window, once.
 *
 * @param {{ model?: string|null, conversation_id?: string|null, prompt?: string|null }} input
 * @returns {string[]}
 */
export function agyConversationArgs(input) {
  return [
    ...(input.model ? ['--model', input.model] : []),
    ...(input.conversation_id ? ['--conversation', input.conversation_id] : []),
    ...(typeof input.prompt === 'string' && input.prompt.length > 0
      ? ['-i', input.prompt]
      : [])
  ];
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
 * The `step_update` payload of a line, or null when the line carries none.
 *
 * @param {any} raw
 * @returns {any}
 */
function stepOf(raw) {
  if (!raw || typeof raw !== 'object' || raw.event !== 'step_update') {
    return null;
  }
  const step = raw.step_update;
  return step && typeof step === 'object' ? step : null;
}

/**
 * The `result` payload of a line, or null when the line is not a result.
 *
 * @param {any} raw
 * @returns {any}
 */
function resultOf(raw) {
  if (!raw || typeof raw !== 'object' || raw.event !== 'result') {
    return null;
  }
  const result = raw.result;
  return result && typeof result === 'object' ? result : {};
}

/**
 * The shell command line of a `run_command` step, or null.
 *
 * @param {any} step
 * @returns {string|null}
 */
function commandLineOf(step) {
  if (!step || step.tool_name !== 'run_command') {
    return null;
  }
  const params = step.tool_info?.parameters;
  const command =
    params && typeof params === 'object' ? params.CommandLine : null;
  return typeof command === 'string' && command.length > 0 ? command : null;
}

/**
 * Whether a step reports the START of its tool call. agy reports a tool step
 * twice (`ACTIVE`, then `DONE`); reacting to the start only is both the
 * earliest point a guard can act and what keeps one call one event.
 *
 * @param {any} step
 * @returns {boolean}
 */
function isStepStart(step) {
  return (
    !!step && step.state === 'ACTIVE' && typeof step.tool_name === 'string'
  );
}

/**
 * Lift usage from the closing `result` line. Per-step usage is not lifted: the
 * result's `usage` is the session's authoritative total.
 *
 * @param {any} raw
 * @returns {{ kind: 'result', usage: Record<string, number> }|null}
 */
export function liftUsage(raw) {
  const result = resultOf(raw);
  const usage = result?.usage;
  if (!usage || typeof usage !== 'object') {
    return null;
  }
  /** @type {Record<string, number>} */
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
 * Extract the shell command a `run_command` step is starting, else null. Feeds
 * the engine's merge guards off the SAME line `normalize` emits its tool event
 * from.
 *
 * @param {any} raw
 * @returns {{ command: string, id: string|null }|null}
 */
export function extractShellCommand(raw) {
  const step = stepOf(raw);
  if (!isStepStart(step)) {
    return null;
  }
  const command = commandLineOf(step);
  if (command === null) {
    return null;
  }
  const index = step.step_index;
  return {
    command,
    id: typeof index === 'number' ? String(index) : null
  };
}

/**
 * Extract the conversation id (what `--conversation` accepts) from the `init`
 * line.
 *
 * @param {any} raw
 * @returns {string|null}
 */
export function extractSessionId(raw) {
  if (
    raw &&
    typeof raw === 'object' &&
    raw.event === 'init' &&
    typeof raw.conversation_id === 'string' &&
    raw.conversation_id.length > 0
  ) {
    return raw.conversation_id;
  }
  return null;
}

/**
 * Detect a tool that asks the operator something (fail-closed).
 *
 * @param {any} raw
 * @returns {string|null}
 */
export function detectQuestion(raw) {
  const step = stepOf(raw);
  if (isStepStart(step) && QUESTION_TOOLS.has(step.tool_name)) {
    return `question tool: ${step.tool_name}`;
  }
  return null;
}

/**
 * The first non-empty line of a reported sentence, trimmed to
 * {@link SUMMARY_MAX_CHARS}; null for a non-string or blank value.
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
 * The text of the LAST agent response that said something. agy's
 * `result.response` concatenates every response of the run, so its first line
 * is the session's FIRST message; the closing sentence (and its terminal
 * result line) is the last response step's own text.
 *
 * @param {any[]} raw
 * @returns {string|null}
 */
function lastResponseText(raw) {
  /** @type {Map<number, string>} */
  const texts = new Map();
  /** @type {number|null} */
  let last = null;
  for (const line of raw) {
    const step = stepOf(line);
    if (
      !step ||
      step.step_type !== 'agent_response' ||
      typeof step.step_index !== 'number' ||
      typeof step.text_delta !== 'string'
    ) {
      continue;
    }
    const text = (texts.get(step.step_index) ?? '') + step.text_delta;
    texts.set(step.step_index, text);
    if (text.trim().length > 0) {
      last = step.step_index;
    }
  }
  return last === null ? null : (texts.get(last) ?? null);
}

/**
 * The failure sentence a non-SUCCESS result carries, if any.
 *
 * @param {any} result
 * @returns {string|null}
 */
function resultFailureText(result) {
  const error = result.error;
  if (typeof error === 'string') {
    return summaryOf(error);
  }
  if (error && typeof error === 'object') {
    return summaryOf(error.message);
  }
  return null;
}

/**
 * Judge the LAST `result` line, and lift the session's own sentence off the
 * same stream (worker-failure-tiers §6). The exit code is deliberately unread.
 *
 * @param {{ raw: any[], exit: number|null, blocked: boolean }} ctx
 * @returns {{ success: boolean, reason: string, summary: string|null }}
 */
export function verdict(ctx) {
  /** @type {any} */
  let last = null;
  for (const line of ctx.raw) {
    const result = resultOf(line);
    if (result) {
      last = result;
    }
  }
  const response =
    summaryOf(lastResponseText(ctx.raw)) ?? summaryOf(last?.response);
  if (!last) {
    return {
      success: false,
      reason: 'no_result',
      summary: response ?? NO_RESULT_SUMMARY
    };
  }
  if (last.status !== 'SUCCESS') {
    const failure = resultFailureText(last);
    const status =
      typeof last.status === 'string' && last.status.length > 0
        ? last.status
        : 'unknown';
    return {
      success: false,
      reason: 'turn_failed',
      summary: failure ?? response ?? `status ${status}`
    };
  }
  return {
    success: true,
    reason: 'ok',
    summary: response ?? NO_RESULT_SUMMARY
  };
}

/**
 * Normalizer with per-run state: agent text arrives as `text_delta` fragments
 * of one step, so the fragments are joined and one text event is emitted when
 * the step reports `DONE`.
 *
 * @returns {(raw: any) => RunnerEvent|null}
 */
function createNormalizer() {
  /** @type {Map<number, string>} */
  const pending = new Map();
  return (raw) => {
    if (!raw || typeof raw !== 'object') {
      return null;
    }
    const result = resultOf(raw);
    if (result) {
      if (result.status !== 'SUCCESS') {
        return {
          kind: 'error',
          message:
            resultFailureText(result) ??
            `agy 실행이 SUCCESS 아닌 상태로 끝났습니다(status ${String(result.status)}).`,
          raw
        };
      }
      return { kind: 'result', usage: liftUsage(raw)?.usage, raw };
    }
    if (raw.event === 'error') {
      return {
        kind: 'error',
        message:
          summaryOf(raw.message) ??
          summaryOf(raw.error?.message) ??
          'agy 러너가 메시지 없는 error 이벤트를 보고했습니다.',
        raw
      };
    }
    const step = stepOf(raw);
    if (!step) {
      return null;
    }
    if (step.step_type === 'agent_response') {
      const index = typeof step.step_index === 'number' ? step.step_index : -1;
      if (typeof step.text_delta === 'string') {
        pending.set(index, (pending.get(index) ?? '') + step.text_delta);
      }
      if (step.state !== 'DONE') {
        return null;
      }
      const text = (pending.get(index) ?? '').trim();
      pending.delete(index);
      return text.length > 0 ? { kind: 'text', text, raw } : null;
    }
    if (!isStepStart(step)) {
      return null;
    }
    const command = commandLineOf(step);
    if (command !== null) {
      return { kind: 'tool', name: 'shell', input: { command }, raw };
    }
    if (step.tool_name === 'invoke_subagent') {
      const subagents = step.subagent_info?.subagents;
      return {
        kind: 'tool',
        name: 'invoke_subagent',
        input: {
          subagents: Array.isArray(subagents)
            ? subagents.map((/** @type {any} */ entry) => ({
                role: typeof entry?.role === 'string' ? entry.role : null,
                prompt:
                  typeof entry?.initial_prompt === 'string'
                    ? entry.initial_prompt
                    : null
              }))
            : []
        },
        raw
      };
    }
    return {
      kind: 'tool',
      name: step.tool_name,
      input: step.tool_info?.parameters ?? {},
      raw
    };
  };
}

/**
 * Build the agy adapter spec. `catalog_entry` is the resolved catalog's agy
 * entry; its `command` is ignored and the launcher always runs.
 *
 * @param {RunnerCatalogEntry} [catalog_entry]
 * @param {{ env?: Record<string, string|undefined>, launcher?: string }} [options]
 * @returns {AdapterSpec}
 */
export function agySpec(catalog_entry, options = {}) {
  const entry = catalog_entry ?? builtinCatalog().agy;
  const routing_env = options.env || {};
  const command = options.launcher ?? agyLauncherPath();
  return {
    name: 'agy',
    buildArgv(bead, _workspace, settings) {
      const s = settings || {};
      if (s.fork_session) {
        throw new Error('agy runner does not support fork');
      }
      const speed = s.speed ?? 'default';
      if (speed === 'fast') {
        throw new Error('agy runner does not support the fast speed');
      }
      if (speed !== 'default') {
        throw new Error(`unknown orchestration speed: ${String(speed)}`);
      }
      const requested =
        typeof s.model === 'string' && s.model.length > 0 ? s.model : null;
      const model_id =
        requested !== null && Object.hasOwn(entry.models, requested)
          ? entry.models[requested].id
          : (requested ?? entry.default_model ?? null);
      const recovery_env = workRecoveryReadinessEnv();
      const { system_prompt, task_prompt } = applyPreamble(promptFor(bead), {
        work_recovery_ready: Object.entries(recovery_env).some(
          ([name, value]) => s.env?.[name] === value
        ),
        review: s.mode === 'review',
        fast_track: !!s.fast_track,
        pr_submit: !s.disposition && !s.quickfix_lane,
        disposition: !!s.disposition,
        quickfix_lane: !!s.quickfix_lane,
        target_base: typeof s.target_base === 'string' ? s.target_base : null,
        attempt_facts: s.attempt_facts ?? null
      });
      /** @type {string[]} */
      const args = [
        '-p',
        `${system_prompt}\n\n${task_prompt}`,
        '--output-format',
        'stream-json'
      ];
      if (model_id) {
        args.push('--model', model_id);
      }
      args.push('--dangerously-skip-permissions');
      if (s.resume_session_id) {
        args.push('--conversation', String(s.resume_session_id));
      }
      const hook_env =
        typeof s.guard_hook_path === 'string' && s.guard_hook_path.length > 0
          ? preToolHookEnv(s.guard_hook_path)
          : {};
      return {
        command,
        args,
        env: { AGY_SILENT: '1', ...hook_env, ...routing_env },
        system_prompt,
        task_prompt
      };
    },
    normalize: createNormalizer(),
    liftUsage,
    detectQuestion,
    extractShellCommand,
    extractSessionId,
    verdict
  };
}

/**
 * Spawn an agy headless session.
 *
 * @param {any} bead
 * @param {string} workspace
 * @param {any} settings
 * @param {EngineDeps & { name?: 'agy', catalog_entry?: RunnerCatalogEntry, routing_env?: Record<string, string|undefined>, launcher?: string }} deps
 * @returns {RunnerHandle}
 */
export function spawnAgy(bead, workspace, settings, deps) {
  const spec = agySpec(deps.catalog_entry, {
    env: deps.routing_env,
    launcher: deps.launcher
  });
  return runSession(spec, bead, workspace, settings, deps);
}
