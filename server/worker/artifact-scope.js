import { debug } from '../logging.js';

const log = debug('worker:artifact-scope');

/**
 * Parse the repo-relative path prefixes declared by an artifact's front matter.
 * Invalid entries are ignored independently so one bad path cannot suppress the
 * remaining scope.
 *
 * @param {unknown} content
 * @returns {string[]}
 */
export function parseArtifactScope(content) {
  if (typeof content !== 'string') {
    return [];
  }
  const lines = content.split(/\r?\n/);
  if (lines[0] !== '---') {
    return [];
  }
  const closing_index = lines.indexOf('---', 1);
  if (closing_index < 0) {
    return [];
  }

  /** @type {string[]} */
  const scope = [];
  const seen = new Set();
  let reading_scope = false;
  for (const line of lines.slice(1, closing_index)) {
    if (/^scope:\s*$/.test(line)) {
      reading_scope = true;
      continue;
    }
    if (/^[^\s].*:\s*/.test(line)) {
      reading_scope = false;
      continue;
    }
    if (!reading_scope) {
      continue;
    }
    const match = /^\s*-\s(.*)$/.exec(line);
    if (!match) {
      continue;
    }
    const item = match[1].trim();
    if (!isValidScopeItem(item)) {
      log('ignoring invalid scope entry %o', item);
      continue;
    }
    if (seen.has(item)) {
      continue;
    }
    seen.add(item);
    scope.push(item);
  }
  return scope;
}

/**
 * @param {string} item
 */
function isValidScopeItem(item) {
  if (
    item.length === 0 ||
    item.startsWith('/') ||
    item.startsWith(':') ||
    item.includes('*') ||
    item.includes('?') ||
    item.includes('[') ||
    item.includes(']')
  ) {
    return false;
  }
  return !item.split('/').includes('..');
}

/**
 * Parse one `git log --format=%H --name-only` stream. Git already emits commits
 * newest first; stable de-duplication preserves that order for both result lists.
 *
 * @param {unknown} output
 * @returns {{ delta_shas: string[], changed_paths: string[] }}
 */
export function parseNameOnlyLog(output) {
  /** @type {string[]} */
  const delta_shas = [];
  /** @type {string[]} */
  const changed_paths = [];
  const seen_shas = new Set();
  const seen_paths = new Set();
  if (typeof output !== 'string') {
    return { delta_shas, changed_paths };
  }
  for (const raw_line of output.split(/\r?\n/)) {
    const line = raw_line.trim();
    if (line.length === 0) {
      continue;
    }
    if (/^[0-9a-fA-F]{40}$/.test(line)) {
      if (!seen_shas.has(line)) {
        seen_shas.add(line);
        delta_shas.push(line);
      }
      continue;
    }
    if (!seen_paths.has(line)) {
      seen_paths.add(line);
      changed_paths.push(line);
    }
  }
  return { delta_shas, changed_paths };
}
