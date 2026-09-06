/**
 * Minimal ADR frontmatter reader (spec UI-8uz7 §5.1).
 *
 * This reader answers one question only: can the current/history table be drawn
 * from this file? The source of truth for full ADR validation stays
 * `adr-index.py --check`, whose verdict is carried separately as `index_drift`.
 * The parsing rules mirror §2 of the spec: flat scalars, optional quotes, a
 * ` #` trailing comment on unquoted values, integer list `supersedes`, integer
 * `id`/`superseded_by`, and a fixed status vocabulary.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  ADR_FILE_NAME_RE,
  ADR_STATUS_VALUES,
  INTEGER_ADR_KEYS,
  INTEGER_LIST_ADR_KEYS,
  OPTIONAL_ADR_KEYS,
  REQUIRED_ADR_KEYS
} from './adr-registry.js';

/**
 * @typedef {Object} AdrRecord
 * @property {string} file - ADR file name (`NNNN-slug.md`).
 * @property {number} id - ADR number.
 * @property {string} title - One-line ADR title.
 * @property {string} status - One of the §2 status vocabulary values.
 * @property {string} date - ISO `YYYY-MM-DD` date string as written.
 * @property {string} summary - One-line decision summary.
 * @property {number[]} supersedes - ADR numbers this one supersedes.
 * @property {number | null} superseded_by - ADR number superseding this one.
 * @property {string | null} superseded_by_note - Free-form supersede note.
 * @property {string | null} spec - Repo-relative owning spec path.
 * @property {string | null} bead - Owning Bead ID.
 */

/**
 * @typedef {Object} AdrReadOk
 * @property {true} ok - Parse succeeded.
 * @property {AdrRecord} adr - Parsed record.
 */

/**
 * @typedef {Object} AdrReadFail
 * @property {false} ok - Parse failed.
 * @property {string} error - Human-readable cause.
 */

/**
 * @typedef {Object} AdrDirResult
 * @property {AdrRecord[]} adrs - Records that parsed.
 * @property {{ file: string, error: string }[]} errors - Per-file failures.
 */

const ALLOWED_KEYS = new Set([...REQUIRED_ADR_KEYS, ...OPTIONAL_ADR_KEYS]);
const INT_KEYS = new Set(INTEGER_ADR_KEYS);
const INT_LIST_KEYS = new Set(INTEGER_LIST_ADR_KEYS);
const STATUS_VALUES = new Set(ADR_STATUS_VALUES);
const INT_RE = /^-?\d+$/;

/**
 * Drop a YAML trailing comment (` #` onwards) from a plain scalar.
 *
 * @param {string} raw
 */
function stripComment(raw) {
  const index = raw.indexOf(' #');
  return index < 0 ? raw : raw.slice(0, index).trimEnd();
}

/**
 * @param {string} raw - Quoted scalar including its delimiters.
 */
function unquote(raw) {
  if (raw[0] === '"') {
    return raw.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  return raw.slice(1, -1).replace(/''/g, "'");
}

/**
 * Parse one frontmatter scalar or integer list.
 *
 * @param {string} key
 * @param {string} raw_value
 * @returns {string | number | number[]}
 */
function parseValue(key, raw_value) {
  const raw = raw_value.trim();
  if (raw.startsWith('>') || raw.startsWith('|')) {
    throw new Error(
      `key '${key}' uses a multi-line scalar; only flat scalars are allowed`
    );
  }
  if (raw.startsWith('[')) {
    if (!raw.endsWith(']')) {
      throw new Error(`key '${key}' has an unterminated list value`);
    }
    const inner = raw.slice(1, -1).trim();
    if (inner === '') {
      return [];
    }
    /** @type {number[]} */
    const items = [];
    for (const part of inner.split(',')) {
      const item = part.trim();
      if (!INT_RE.test(item)) {
        throw new Error(
          `key '${key}' accepts integer list items only, got '${item}'`
        );
      }
      items.push(Number(item));
    }
    return items;
  }
  if (raw.startsWith('"') || raw.startsWith("'")) {
    if (raw.length < 2 || raw[raw.length - 1] !== raw[0]) {
      throw new Error(`key '${key}' has an unterminated quoted value`);
    }
    return unquote(raw);
  }
  const plain = stripComment(raw);
  if (plain === '') {
    throw new Error(`key '${key}' has an empty value`);
  }
  if (INT_RE.test(plain)) {
    return Number(plain);
  }
  return plain;
}

/**
 * @param {string} text
 * @returns {Record<string, string | number | number[]>}
 */
function parseFrontmatter(text) {
  const lines = text.split('\n');
  if (lines.length === 0 || lines[0].trim() !== '---') {
    throw new Error('no YAML frontmatter block at the top of the file');
  }
  /** @type {Record<string, string | number | number[]>} */
  const data = {};
  for (const line of lines.slice(1)) {
    const stripped = line.trim();
    if (stripped === '---') {
      return data;
    }
    if (stripped === '' || stripped.startsWith('#')) {
      continue;
    }
    if (line.startsWith(' ') || line.startsWith('\t')) {
      throw new Error(
        `indented continuation line '${stripped}' is not supported`
      );
    }
    const colon = line.indexOf(':');
    if (colon < 0) {
      throw new Error(`line '${stripped}' is not a 'key: value' pair`);
    }
    const key = line.slice(0, colon).trim();
    if (!ALLOWED_KEYS.has(key)) {
      throw new Error(`unknown key '${key}'`);
    }
    if (key in data) {
      throw new Error(`duplicate key '${key}'`);
    }
    data[key] = parseValue(key, line.slice(colon + 1));
  }
  throw new Error("frontmatter block is not closed by '---'");
}

/**
 * @param {Record<string, string | number | number[]>} data
 * @param {string} key
 * @returns {string | null}
 */
function optionalString(data, key) {
  const value = data[key];
  if (value === undefined) {
    return null;
  }
  if (typeof value === 'number') {
    return String(value);
  }
  if (typeof value !== 'string') {
    throw new Error(`key '${key}' must be a string`);
  }
  return value;
}

/**
 * Read one ADR file's frontmatter.
 *
 * @param {string} text - Full file contents.
 * @param {string} file_name - Base file name, used for the `NNNN` binding.
 * @returns {AdrReadOk | AdrReadFail}
 */
export function readAdrFile(text, file_name) {
  const name_match = ADR_FILE_NAME_RE.exec(file_name);
  if (!name_match) {
    return { ok: false, error: `'${file_name}' is not an ADR file name` };
  }
  const number = Number(name_match[1]);
  /** @type {Record<string, string | number | number[]>} */
  let data;
  try {
    data = parseFrontmatter(text);
  } catch (err) {
    return { ok: false, error: /** @type {Error} */ (err).message };
  }
  try {
    for (const key of REQUIRED_ADR_KEYS) {
      if (!(key in data)) {
        throw new Error(`missing required key '${key}'`);
      }
    }
    for (const [key, value] of Object.entries(data)) {
      if (INT_KEYS.has(key) && typeof value !== 'number') {
        throw new Error(`key '${key}' must be an integer`);
      }
      if (INT_LIST_KEYS.has(key) && !Array.isArray(value)) {
        throw new Error(`key '${key}' must be an integer list like [12]`);
      }
    }
    const id = /** @type {number} */ (data.id);
    if (id !== number) {
      throw new Error(`key 'id' is ${id} but the file name says ${number}`);
    }
    const status = data.status;
    if (typeof status !== 'string' || !STATUS_VALUES.has(status)) {
      throw new Error(`unknown status '${String(status)}'`);
    }
    const title = optionalString(data, 'title');
    const date = optionalString(data, 'date');
    const summary = optionalString(data, 'summary');
    if (!title || !title.trim() || !summary || !summary.trim() || !date) {
      throw new Error("keys 'title', 'date' and 'summary' must be non-empty");
    }
    const superseded_by = data.superseded_by;
    /** @type {AdrRecord} */
    const adr = {
      file: file_name,
      id,
      title,
      status,
      date,
      summary,
      supersedes: Array.isArray(data.supersedes) ? data.supersedes : [],
      superseded_by: typeof superseded_by === 'number' ? superseded_by : null,
      superseded_by_note: optionalString(data, 'superseded_by_note'),
      spec: optionalString(data, 'spec'),
      bead: optionalString(data, 'bead')
    };
    return { ok: true, adr };
  } catch (err) {
    return { ok: false, error: /** @type {Error} */ (err).message };
  }
}

/**
 * Read every ADR in a directory. Non-ADR file names (including `README.md`) are
 * skipped silently; an unreadable directory yields an empty result.
 *
 * @param {string} adr_dir - Absolute path of the ADR directory.
 * @returns {Promise<AdrDirResult>}
 */
export async function readAdrDir(adr_dir) {
  /** @type {AdrRecord[]} */
  const adrs = [];
  /** @type {{ file: string, error: string }[]} */
  const errors = [];
  /** @type {string[]} */
  let entries;
  try {
    entries = await fs.readdir(adr_dir);
  } catch {
    return { adrs, errors };
  }
  for (const file_name of entries.sort()) {
    if (!ADR_FILE_NAME_RE.test(file_name)) {
      continue;
    }
    /** @type {string} */
    let text;
    try {
      text = await fs.readFile(path.join(adr_dir, file_name), 'utf8');
    } catch (err) {
      errors.push({
        file: file_name,
        error: /** @type {Error} */ (err).message
      });
      continue;
    }
    const result = readAdrFile(text, file_name);
    if (result.ok) {
      adrs.push(result.adr);
    } else {
      errors.push({ file: file_name, error: result.error });
    }
  }
  return { adrs, errors };
}
