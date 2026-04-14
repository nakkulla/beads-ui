const DEFAULT_BIN_DIRS = ['/opt/homebrew/bin', '/usr/local/bin'];

/**
 * Build a stable PATH for daemon and subprocess execution.
 *
 * @param {string | undefined} raw_path
 * @returns {string}
 */
export function buildSpawnPath(raw_path) {
  /** @type {string[]} */
  const parts = [];
  /** @type {Set<string>} */
  const seen = new Set();
  const raw_parts = String(raw_path || '').split(':');

  for (const entry of [...DEFAULT_BIN_DIRS, ...raw_parts]) {
    const value = String(entry || '').trim();
    if (!value || seen.has(value)) {
      continue;
    }
    seen.add(value);
    parts.push(value);
  }

  return parts.join(':');
}
