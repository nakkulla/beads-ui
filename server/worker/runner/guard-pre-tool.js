import fs from 'node:fs';

const [repo, target_base, log_path, runner] = process.argv.slice(2);

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
