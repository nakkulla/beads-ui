import fs from 'node:fs';
import path from 'node:path';

const WORKER_EFFORTS = new Set(['low', 'medium', 'high']);
const DEFAULT_MODEL = 'gpt-5.5';
const DEFAULT_EFFORT = 'high';

/**
 * @param {string} value
 * @returns {string}
 */
function quoteTomlString(value) {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizeModel(value) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error('default_model must be a non-empty string');
  }
  return value.trim();
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function normalizeEffort(value) {
  if (typeof value !== 'string' || !WORKER_EFFORTS.has(value)) {
    throw new Error('default_effort must be low, medium, or high');
  }
  return value;
}

/**
 * @param {string} line
 * @returns {boolean}
 */
function isWorkerSectionHeader(line) {
  return /^\s*\[worker\]\s*(?:#.*)?$/.test(line);
}

/**
 * @param {string} line
 * @returns {boolean}
 */
function isSectionHeader(line) {
  return /^\s*\[[^\]]+\]\s*(?:#.*)?$/.test(line);
}

/**
 * @param {string} line
 * @returns {boolean}
 */
function isWorkerDefaultLine(line) {
  return /^\s*(?:default_model|default_effort)\s*=/.test(line);
}

/**
 * @param {string} raw_value
 * @returns {string}
 */
function parseTomlStringLike(raw_value) {
  const trimmed = raw_value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  return trimmed;
}

/**
 * @param {string[]} lines
 * @returns {{ default_model?: string, default_effort?: string }}
 */
function readExistingWorkerDefaults(lines) {
  const worker_start = lines.findIndex((line) => isWorkerSectionHeader(line));
  if (worker_start === -1) {
    return {};
  }
  /** @type {{ default_model?: string, default_effort?: string }} */
  const result = {};
  for (let index = worker_start + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (isSectionHeader(line)) {
      break;
    }
    const match =
      /^\s*(default_model|default_effort)\s*=\s*(.+?)\s*(?:#.*)?$/.exec(line);
    if (match) {
      result[/** @type {'default_model'|'default_effort'} */ (match[1])] =
        parseTomlStringLike(match[2]);
    }
  }
  return result;
}

/**
 * Update editable Worker defaults in the TOML config file.
 *
 * Only `default_model` and `default_effort` are persisted here. Queue timing
 * values are read-only runtime config and are intentionally preserved.
 *
 * @param {string} config_path
 * @param {{ default_model?: unknown, default_effort?: unknown }} values
 */
export function updateWorkerConfigFile(config_path, values) {
  const file_content = fs.existsSync(config_path)
    ? fs.readFileSync(config_path, 'utf8')
    : '';
  const lines =
    file_content.length > 0
      ? file_content.replace(/\r\n/g, '\n').split('\n')
      : [];
  if (lines.at(-1) === '') {
    lines.pop();
  }

  const existing_defaults = readExistingWorkerDefaults(lines);
  const default_model =
    values.default_model === undefined
      ? normalizeModel(existing_defaults.default_model || DEFAULT_MODEL)
      : normalizeModel(values.default_model);
  const default_effort =
    values.default_effort === undefined
      ? normalizeEffort(existing_defaults.default_effort || DEFAULT_EFFORT)
      : normalizeEffort(values.default_effort);
  const worker_start = lines.findIndex((line) => isWorkerSectionHeader(line));
  const worker_lines = [
    `default_model = ${quoteTomlString(default_model)}`,
    `default_effort = ${quoteTomlString(default_effort)}`
  ];
  /** @type {string[]} */
  let next_lines;

  if (worker_start === -1) {
    next_lines = lines.slice();
    if (next_lines.length > 0 && next_lines.at(-1) !== '') {
      next_lines.push('');
    }
    next_lines.push('[worker]', ...worker_lines);
  } else {
    let worker_end = lines.length;
    for (let index = worker_start + 1; index < lines.length; index += 1) {
      if (isSectionHeader(lines[index])) {
        worker_end = index;
        break;
      }
    }
    const before = lines.slice(0, worker_start + 1);
    const body = lines
      .slice(worker_start + 1, worker_end)
      .filter((line) => !isWorkerDefaultLine(line));
    const after = lines.slice(worker_end);
    next_lines = before.concat(worker_lines, body, after);
  }

  fs.mkdirSync(path.dirname(config_path), { recursive: true });
  fs.writeFileSync(config_path, `${next_lines.join('\n')}\n`);
}
