/**
 * Raw durable queue discovery for preset-reference integrity checks.
 *
 * Queue-store normalization is intentionally not used here: normalization can
 * drop malformed legacy data, while preset deletion must distinguish absent,
 * unreadable, and malformed durable queues and fail closed when the scan is
 * incomplete.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { stateHome } from './state-paths.js';

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Scan every durable workspace state directory without normalizing queue data.
 *
 * @param {{ state_home?: string, fs?: typeof import('node:fs'), display_names?: Record<string, string> }} [options]
 */
export function discoverQueueStates(options = {}) {
  const fs = options.fs || nodeFs;
  const root = path.join(options.state_home || stateHome(), 'bdui');
  /** @type {Array<{ workspace_key: string, display_name: string, status: 'absent'|'unreadable'|'malformed'|'ok', queue_file: string, raw: Record<string, unknown>|null }>} */
  const states = [];
  let entries;
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch (err) {
    if (/** @type {NodeJS.ErrnoException} */ (err).code === 'ENOENT') {
      return { complete: true, states };
    }
    return { complete: false, states };
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const workspace_key = entry.name;
    const queue_file = path.join(root, workspace_key, 'queue.json');
    const display_name =
      options.display_names?.[workspace_key] || workspace_key;
    let source;
    try {
      source = fs.readFileSync(queue_file, 'utf8');
    } catch (err) {
      const code = /** @type {NodeJS.ErrnoException} */ (err).code;
      states.push({
        workspace_key,
        display_name,
        status: code === 'ENOENT' ? 'absent' : 'unreadable',
        queue_file,
        raw: null
      });
      continue;
    }
    try {
      const raw = JSON.parse(source);
      states.push({
        workspace_key,
        display_name,
        status: isRecord(raw) ? 'ok' : 'malformed',
        queue_file,
        raw: isRecord(raw) ? raw : null
      });
    } catch {
      states.push({
        workspace_key,
        display_name,
        status: 'malformed',
        queue_file,
        raw: null
      });
    }
  }
  return {
    complete: states.every(
      (state) => state.status === 'ok' || state.status === 'absent'
    ),
    states
  };
}
