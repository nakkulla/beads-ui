import { shellQuote } from '../server/worker/tmux-launcher.js';

/**
 * Encode one session-hub CLI response.
 *
 * @param {Record<string, unknown>} value
 * @param {number} [code]
 */
export function hubReply(value, code = 0) {
  return {
    code,
    stdout: JSON.stringify({ ok: code === 0, ...value }),
    stderr: ''
  };
}

/**
 * Render only the runner argv for existing conversation prompt assertions.
 * The actual hub call stays an argument array; no shell executes this text.
 *
 * @param {string[][]} calls
 */
export function hubCommand(calls) {
  const opened = calls.find((call) => call[0] === 'open');
  return opened
    ? `exec ${opened
        .slice(opened.indexOf('--') + 1)
        .map(shellQuote)
        .join(' ')}`
    : '';
}
