/**
 * codex runner adapter (spec §5.4).
 *
 * CLI: `codex exec --json [-m <model>] -c model_reasoning_effort=<lv>
 * --skip-git-repo-check "<prompt>"` with stdin closed (an open stdin makes
 * codex wait for additional input and hang — runner-spike-findings.md).
 *
 * Success: rc===0 ∧ a `turn.completed` event present ∧ no `turn.failed`/`error`
 * event (runner-spike-findings.md). Events map:
 *   thread.started / turn.started        → dropped (lifecycle)
 *   item.completed{item.type:agent_message} → text
 *   item.completed{item.type:error}      → error
 *   turn.completed                        → result
 *   error / turn.failed                   → error
 *
 * Fail-closed: codex approval events did not appear in the spike, so the adapter
 * fails closed by detecting any interactive request in the type / item.type
 * whitelist gap (approval / elicitation / input request).
 *
 * @import { AdapterSpec, RunnerEvent, RunnerHandle, EngineDeps } from './session.js'
 */
import { applyPreamble } from './preamble.js';
import { runSession } from './session.js';

/**
 * Interactive-request signature for codex fail-closed. Matches an approval /
 * elicitation / user-input request on either the top-level event type or an
 * item's type.
 *
 * @type {RegExp}
 */
const QUESTION_RE =
  /approval|elicit|permission|user[_-]?input|input[_-]?request|question/i;

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
 * @param {any} raw
 * @returns {RunnerEvent|RunnerEvent[]|null}
 */
function normalize(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  if (
    raw.type === 'item.completed' &&
    raw.item &&
    typeof raw.item === 'object'
  ) {
    const item = raw.item;
    if (item.type === 'agent_message' && typeof item.text === 'string') {
      return { kind: 'text', text: item.text, raw };
    }
    if (item.type === 'error') {
      return { kind: 'error', message: String(item.message || ''), raw };
    }
    return null;
  }
  if (raw.type === 'turn.completed') {
    return { kind: 'result', raw };
  }
  if (raw.type === 'turn.failed') {
    const message =
      raw.error && typeof raw.error.message === 'string'
        ? raw.error.message
        : '';
    return { kind: 'error', message, raw };
  }
  if (raw.type === 'error') {
    return { kind: 'error', message: String(raw.message || ''), raw };
  }
  return null;
}

/**
 * @param {any} raw
 * @returns {string|null}
 */
function detectQuestion(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  // A codex error is a failure, not a question — never fail-closed on it.
  if (raw.type === 'error' || raw.type === 'turn.failed') {
    return null;
  }
  if (typeof raw.type === 'string' && QUESTION_RE.test(raw.type)) {
    return `interactive request: ${raw.type}`;
  }
  const item_type =
    raw.item && typeof raw.item.type === 'string' ? raw.item.type : '';
  if (item_type && item_type !== 'error' && QUESTION_RE.test(item_type)) {
    return `interactive request: ${item_type}`;
  }
  return null;
}

/**
 * Extract the shell command from a codex command/exec item, else null
 * (best-effort — codex command-item shapes vary). Feeds the session engine's
 * merge-lock fail-closed guard (spec §5.2).
 *
 * @param {any} raw
 * @returns {string|null}
 */
function extractShellCommand(raw) {
  if (!raw || typeof raw !== 'object' || raw.type !== 'item.completed') {
    return null;
  }
  const item = raw.item && typeof raw.item === 'object' ? raw.item : null;
  if (!item || typeof item.type !== 'string') {
    return null;
  }
  if (!/command|exec|shell/i.test(item.type)) {
    return null;
  }
  if (typeof item.command === 'string') {
    return item.command;
  }
  if (Array.isArray(item.command)) {
    return item.command.join(' ');
  }
  if (typeof item.text === 'string') {
    return item.text;
  }
  return null;
}

/**
 * Extract the codex session id from the `thread.started` line's `thread_id`
 * (codex's resumable thread handle). That event is dropped by `normalize` as a
 * lifecycle line, so it is read here for the attempt record (spec §2).
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
 * @param {{ raw: any[], exit: number|null, blocked: boolean }} ctx
 * @returns {{ success: boolean, reason: string }}
 */
function verdict(ctx) {
  const has_completed = ctx.raw.some((e) => e && e.type === 'turn.completed');
  const has_failed = ctx.raw.some(
    (e) => e && (e.type === 'turn.failed' || e.type === 'error')
  );
  if (ctx.exit !== 0) {
    return { success: false, reason: 'exit' };
  }
  if (has_failed) {
    return { success: false, reason: 'turn_failed' };
  }
  if (!has_completed) {
    return { success: false, reason: 'no_turn_completed' };
  }
  return { success: true, reason: 'ok' };
}

/**
 * Build the codex adapter spec.
 *
 * @returns {AdapterSpec}
 */
export function codexSpec() {
  return {
    name: 'codex',
    buildArgv(bead, _workspace, settings) {
      const s = settings || {};
      // Resume branch (spec §1.4): `codex exec resume <thread_id>` continues the
      // prior codex thread; a first launch uses plain `codex exec`.
      const args = s.resume_session_id
        ? ['exec', 'resume', String(s.resume_session_id), '--json']
        : ['exec', '--json'];
      if (s.model) {
        args.push('-m', String(s.model));
      }
      if (s.effort) {
        args.push('-c', `model_reasoning_effort=${s.effort}`);
      }
      args.push('--skip-git-repo-check');
      args.push(
        applyPreamble(promptFor(bead), {
          fast_track: !!s.fast_track,
          merge_lock: s.merge_lock,
          merge_policy: s.merge_policy,
          drift_policy: s.drift_policy
        })
      );
      return { command: 'codex', args };
    },
    normalize,
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
 * @param {EngineDeps} deps
 * @returns {RunnerHandle}
 */
export function spawnCodex(bead, workspace, settings, deps) {
  return runSession(codexSpec(), bead, workspace, settings, deps);
}
