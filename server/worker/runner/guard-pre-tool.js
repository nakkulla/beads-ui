import fs from 'node:fs';
import path from 'node:path';

const [repo, target_base, log_path, runner] = process.argv.slice(2);

// Load evidence before any judgment (UI-zoig §3.1): the first invocation
// creates the invoked marker beside the event log, exclusively, so a later or
// concurrent call leaves the first one's marker as it is. The path derives
// from `log_path` rather than a new argument because hook scripts installed by
// an older server keep calling this module with the same argv layout. Any
// failure is swallowed: the marker must never block a tool call.
try {
  fs.writeFileSync(
    path.join(path.dirname(log_path), 'invoked'),
    `${JSON.stringify({ runner, at: Date.now() })}\n`,
    { flag: 'wx' }
  );
} catch {
  // An existing marker, or an unwritable location, changes no verdict.
}

/**
 * Leave append-only evidence for the session monitor without blocking a tool
 * when the diagnostic destination is unavailable.
 *
 * @param {Record<string, unknown>} event
 */
function record(event) {
  try {
    fs.appendFileSync(
      log_path,
      `${JSON.stringify({ ...event, runner, at: Date.now() })}\n`
    );
  } catch {
    // The hook's denial still reaches the runner on stdout.
  }
}

try {
  const input = JSON.parse(fs.readFileSync(0, 'utf8'));
  const command = input?.tool_input?.command;
  if (typeof command === 'string') {
    const { findMergeViolation } = await import('./command-guard.js');
    const { guardKillMessage } = await import('../failure-class.js');
    const violation = findMergeViolation(command, {
      repo,
      target_base,
      pre_tool_use: true
    });
    if (violation && ['gh_pr_merge', 'hook_bypass'].includes(violation.kind)) {
      const message = guardKillMessage(violation);
      record({ kind: 'guard_denied', reason: violation.reason, command });
      process.stdout.write(
        `${JSON.stringify({
          hookSpecificOutput: {
            hookEventName: 'PreToolUse',
            permissionDecision: 'deny',
            permissionDecisionReason: message
          }
        })}\n`
      );
    }
  }
} catch {
  record({ kind: 'guard_warning', reason: 'guard_hook_error', command: null });
}
