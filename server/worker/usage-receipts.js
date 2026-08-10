/**
 * Attempt-scoped Codex terminal usage receipt intake.
 *
 * The producer's environment is delivery-only. Every read begins by deriving
 * the inbox from durable workspace + attempt identity, then validates the
 * directory and file before parsing untrusted bytes. Invalid receipts are
 * intentionally omitted; their warning vocabulary never includes receipt
 * bodies, prompts, paths, or account data.
 */
import fs from 'node:fs';
import path from 'node:path';
import { debug } from '../logging.js';
import { usageReceiptInboxDir, usageReceiptRootDir } from './state-paths.js';

const log = debug('worker:usage-receipts');

const RECEIPT_SCHEMA = 'codex-usage-receipt-v1';
const DIRECTORY_MODE = 0o700;
const FILE_MODE = 0o600;
/** @type {number} */
export const USAGE_RECEIPT_RETENTION_MS = 7 * 24 * 60 * 60 * 1000;
/** @type {number} */
export const USAGE_RECEIPT_GC_MAX = 32;
const TOP_LEVEL_KEYS = new Set([
  'schema',
  'receipt_id',
  'attempt_id',
  'provider',
  'role',
  'thread_id',
  'turn_id',
  'model',
  'usage',
  'completed_at'
]);
const USAGE_KEYS = new Set([
  'input_tokens',
  'output_tokens',
  'cache_read_input_tokens',
  'cache_creation_input_tokens',
  'reasoning_output_tokens'
]);

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {Record<string, unknown>} value
 * @param {Set<string>} expected
 */
function hasExactKeys(value, expected) {
  const keys = Object.keys(value);
  return (
    keys.length === expected.size && keys.every((key) => expected.has(key))
  );
}

/**
 * @param {unknown} value
 */
function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * @param {unknown} value
 */
function isUtcSecond(value) {
  if (
    typeof value !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)
  ) {
    return false;
  }
  return (
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString().replace('.000Z', 'Z') === value
  );
}

/**
 * @param {unknown} value
 */
function isTokenCount(value) {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    Number.isInteger(value) &&
    value >= 0
  );
}

/**
 * @param {unknown} value
 * @returns {value is import('./queue-store.js').UsageLeg}
 */
export function isUsageLeg(value) {
  if (!isRecord(value)) {
    return false;
  }
  if (
    !nonEmptyString(value.receipt_id) ||
    value.provider !== 'codex' ||
    (value.role !== 'implementation' && value.role !== 'review-consult') ||
    !nonEmptyString(value.session_id) ||
    !nonEmptyString(value.turn_id) ||
    !nonEmptyString(value.model) ||
    !isUtcSecond(value.completed_at) ||
    !isRecord(value.usage) ||
    !hasExactKeys(value.usage, USAGE_KEYS)
  ) {
    return false;
  }
  return Object.values(value.usage).every(isTokenCount);
}

/**
 * Normalizes and receipt-id deduplicates durable nested legs. Existing order is
 * preserved, so the first persisted value is authoritative after a conflict.
 *
 * @param {unknown} raw
 * @returns {import('./queue-store.js').UsageLeg[]}
 */
export function normalizeUsageLegs(raw) {
  if (!Array.isArray(raw)) {
    return [];
  }
  /** @type {import('./queue-store.js').UsageLeg[]} */
  const out = [];
  /** @type {Set<string>} */
  const ids = new Set();
  for (const value of raw) {
    if (!isUsageLeg(value) || ids.has(value.receipt_id)) {
      continue;
    }
    ids.add(value.receipt_id);
    out.push({
      receipt_id: value.receipt_id,
      provider: 'codex',
      role: value.role,
      session_id: value.session_id,
      turn_id: value.turn_id,
      model: value.model,
      usage: {
        input_tokens: value.usage.input_tokens,
        output_tokens: value.usage.output_tokens,
        cache_read_input_tokens: value.usage.cache_read_input_tokens,
        cache_creation_input_tokens: value.usage.cache_creation_input_tokens,
        reasoning_output_tokens: value.usage.reasoning_output_tokens
      },
      completed_at: value.completed_at
    });
  }
  return out;
}

/**
 * @param {import('./queue-store.js').UsageLeg} left
 * @param {import('./queue-store.js').UsageLeg} right
 */
function sameLeg(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

/**
 * Create or repair a receipt inbox before spawn. Existing directories must
 * already meet the strict ownership/mode contract; silently chmodding an
 * existing directory would accept an attacker-controlled path.
 *
 * @param {string} workspace
 * @param {string} attempt_id
 * @param {{ fs?: typeof import('node:fs') }} [options]
 * @returns {{ ok: boolean, dir?: string, reason?: string }}
 */
export function ensureUsageReceiptInbox(workspace, attempt_id, options = {}) {
  const file_system = options.fs || fs;
  const dir = usageReceiptInboxDir(workspace, attempt_id);
  try {
    file_system.lstatSync(dir);
    const checked = validateDirectory(dir, file_system);
    return checked.ok ? { ok: true, dir } : checked;
  } catch (err) {
    if (err && /** @type {NodeJS.ErrnoException} */ (err).code !== 'ENOENT') {
      log(
        'receipt inbox inspection failed for attempt %s: %o',
        attempt_id,
        err
      );
      return { ok: false, reason: 'directory_unreadable' };
    }
  }
  try {
    file_system.mkdirSync(path.dirname(dir), { recursive: true });
    file_system.mkdirSync(dir, { mode: DIRECTORY_MODE });
  } catch (err) {
    if (err && /** @type {NodeJS.ErrnoException} */ (err).code === 'EEXIST') {
      const checked = validateDirectory(dir, file_system);
      return checked.ok ? { ok: true, dir } : checked;
    }
    log('receipt inbox setup failed for attempt %s: %o', attempt_id, err);
    return { ok: false, reason: 'mkdir_failed' };
  }
  const checked = validateDirectory(dir, file_system);
  return checked.ok ? { ok: true, dir } : checked;
}

/**
 * @param {string} dir
 * @param {typeof import('node:fs')} file_system
 * @returns {{ ok: true }|{ ok: false, reason: string }}
 */
function validateDirectory(dir, file_system) {
  try {
    const stat = file_system.lstatSync(dir);
    const uid = typeof process.getuid === 'function' ? process.getuid() : null;
    if (!stat.isDirectory() || stat.isSymbolicLink()) {
      return { ok: false, reason: 'directory_type' };
    }
    if ((stat.mode & 0o777) !== DIRECTORY_MODE) {
      return { ok: false, reason: 'directory_mode' };
    }
    if (uid !== null && stat.uid !== uid) {
      return { ok: false, reason: 'directory_owner' };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: 'directory_unreadable' };
  }
}

/**
 * @param {string} file
 * @param {typeof import('node:fs')} file_system
 * @returns {boolean}
 */
function validateFile(file, file_system) {
  try {
    const stat = file_system.lstatSync(file);
    const uid = typeof process.getuid === 'function' ? process.getuid() : null;
    return (
      stat.isFile() &&
      !stat.isSymbolicLink() &&
      (stat.mode & 0o777) === FILE_MODE &&
      (uid === null || stat.uid === uid)
    );
  } catch {
    return false;
  }
}

/**
 * @param {unknown} raw
 * @param {string} attempt_id
 * @param {string} receipt_id
 * @returns {import('./queue-store.js').UsageLeg|null}
 */
function parseReceipt(raw, attempt_id, receipt_id) {
  if (!isRecord(raw) || !hasExactKeys(raw, TOP_LEVEL_KEYS)) {
    return null;
  }
  if (
    raw.schema !== RECEIPT_SCHEMA ||
    raw.receipt_id !== receipt_id ||
    raw.attempt_id !== attempt_id ||
    raw.provider !== 'codex' ||
    (raw.role !== 'implementation' && raw.role !== 'review-consult') ||
    !nonEmptyString(raw.thread_id) ||
    !nonEmptyString(raw.turn_id) ||
    !nonEmptyString(raw.model) ||
    !isUtcSecond(raw.completed_at) ||
    !isRecord(raw.usage) ||
    !hasExactKeys(raw.usage, USAGE_KEYS) ||
    !Object.values(raw.usage).every(isTokenCount)
  ) {
    return null;
  }
  const receipt =
    /** @type {{ role: 'implementation'|'review-consult', thread_id: string, turn_id: string, model: string, usage: { input_tokens: number, output_tokens: number, cache_read_input_tokens: number, cache_creation_input_tokens: number, reasoning_output_tokens: number }, completed_at: string }} */ (
      raw
    );
  return {
    receipt_id,
    provider: 'codex',
    role: receipt.role,
    session_id: receipt.thread_id,
    turn_id: receipt.turn_id,
    model: receipt.model,
    usage: {
      input_tokens: receipt.usage.input_tokens,
      output_tokens: receipt.usage.output_tokens,
      cache_read_input_tokens: receipt.usage.cache_read_input_tokens,
      cache_creation_input_tokens: receipt.usage.cache_creation_input_tokens,
      reasoning_output_tokens: receipt.usage.reasoning_output_tokens
    },
    completed_at: receipt.completed_at
  };
}

/**
 * Read all valid terminal receipts waiting for one attempt. `known_legs` are
 * included only for dedupe: identical receipts are safe to consume after their
 * durable value already exists; conflicting bytes remain in the inbox.
 *
 * @param {string} workspace
 * @param {string} attempt_id
 * @param {{ known_legs?: unknown, fs?: typeof import('node:fs') }} [options]
 * @returns {{ legs: import('./queue-store.js').UsageLeg[], files: string[], warnings: string[] }}
 */
export function readAttemptUsageReceipts(workspace, attempt_id, options = {}) {
  const file_system = options.fs || fs;
  const dir = usageReceiptInboxDir(workspace, attempt_id);
  const directory = validateDirectory(dir, file_system);
  if (!directory.ok) {
    if (directory.reason !== 'directory_unreadable') {
      log(
        'receipt inbox rejected for attempt %s: %s',
        attempt_id,
        directory.reason
      );
    }
    return { legs: [], files: [], warnings: [directory.reason] };
  }
  /** @type {string[]} */
  let names;
  try {
    names = file_system.readdirSync(dir);
  } catch {
    return { legs: [], files: [], warnings: ['directory_unreadable'] };
  }
  const known = normalizeUsageLegs(options.known_legs);
  /** @type {Map<string, import('./queue-store.js').UsageLeg>} */
  const by_id = new Map(known.map((leg) => [leg.receipt_id, leg]));
  /** @type {import('./queue-store.js').UsageLeg[]} */
  const legs = [];
  /** @type {string[]} */
  const files = [];
  /** @type {string[]} */
  const warnings = [];
  for (const name of names.sort()) {
    if (!name.endsWith('.json') || name.length <= '.json'.length) {
      warnings.push('filename');
      continue;
    }
    const receipt_id = name.slice(0, -'.json'.length);
    const file = path.join(dir, name);
    if (!validateFile(file, file_system)) {
      warnings.push('file_security');
      continue;
    }
    /** @type {unknown} */
    let raw;
    try {
      raw = JSON.parse(file_system.readFileSync(file, 'utf8'));
    } catch {
      warnings.push('json');
      continue;
    }
    const leg = parseReceipt(raw, attempt_id, receipt_id);
    if (!leg) {
      warnings.push('schema');
      continue;
    }
    const prior = by_id.get(leg.receipt_id);
    if (prior) {
      if (sameLeg(prior, leg)) {
        files.push(file);
      } else {
        warnings.push('duplicate_conflict');
      }
      continue;
    }
    by_id.set(leg.receipt_id, leg);
    legs.push(leg);
    files.push(file);
  }
  for (const warning of new Set(warnings)) {
    log('receipt ignored for attempt %s: %s', attempt_id, warning);
  }
  return { legs, files, warnings: [...new Set(warnings)] };
}

/**
 * Delete receipts only after the queue mutation containing their legs has
 * returned success. Missing files are already-consumed and therefore benign.
 *
 * @param {string[]} files
 * @param {{ fs?: typeof import('node:fs') }} [options]
 */
export function consumeUsageReceiptFiles(files, options = {}) {
  const file_system = options.fs || fs;
  for (const file of files) {
    try {
      file_system.unlinkSync(file);
    } catch (err) {
      if (err && /** @type {NodeJS.ErrnoException} */ (err).code === 'ENOENT') {
        continue;
      }
      log('receipt cleanup failed: %o', err);
    }
  }
}

/**
 * Remove an empty inbox after launch abort. A non-empty directory is preserved:
 * deleting a producer file is only permitted after its durable queue write.
 *
 * @param {string} workspace
 * @param {string} attempt_id
 * @param {{ fs?: typeof import('node:fs') }} [options]
 */
export function removeEmptyUsageReceiptInbox(
  workspace,
  attempt_id,
  options = {}
) {
  const file_system = options.fs || fs;
  const dir = usageReceiptInboxDir(workspace, attempt_id);
  const checked = validateDirectory(dir, file_system);
  if (!checked.ok) {
    return;
  }
  try {
    file_system.rmdirSync(dir);
  } catch (err) {
    if (
      err &&
      /** @type {NodeJS.ErrnoException} */ (err).code === 'ENOTEMPTY'
    ) {
      return;
    }
    log('receipt inbox rollback failed for attempt %s: %o', attempt_id, err);
  }
}

/**
 * Bounded garbage collection for abandoned receipt inboxes. A running or
 * paused attempt is never eligible. A terminal attempt remains protected while
 * a valid receipt has not yet reached `usage_legs`, preserving retry after a
 * queue persistence failure.
 *
 * @param {string} workspace
 * @param {Record<string, any>} attempts
 * @param {{ now?: () => number, retention_ms?: number, max?: number, fs?: typeof import('node:fs') }} [options]
 * @returns {number} Number of removed inboxes.
 */
export function gcUsageReceiptInboxes(workspace, attempts, options = {}) {
  const file_system = options.fs || fs;
  const now = options.now || (() => Date.now());
  const retention_ms = options.retention_ms ?? USAGE_RECEIPT_RETENTION_MS;
  const max = options.max ?? USAGE_RECEIPT_GC_MAX;
  const root = usageReceiptRootDir(workspace);
  /** @type {string[]} */
  let names;
  try {
    names = file_system.readdirSync(root).sort();
  } catch {
    return 0;
  }
  let removed = 0;
  let inspected = 0;
  for (const name of names) {
    if (inspected >= max) {
      break;
    }
    inspected += 1;
    const dir = path.join(root, name);
    if (!validateDirectory(dir, file_system).ok) {
      continue;
    }
    /** @type {any|null} */
    let attempt = null;
    for (const [attempt_id, candidate] of Object.entries(attempts || {})) {
      if (usageReceiptInboxDir(workspace, attempt_id) === dir) {
        attempt = candidate;
        break;
      }
    }
    if (
      attempt &&
      !['done', 'failed', 'orphaned', 'stopped'].includes(attempt.status)
    ) {
      continue;
    }
    try {
      if (now() - file_system.statSync(dir).mtimeMs < retention_ms) {
        continue;
      }
    } catch {
      continue;
    }
    if (attempt) {
      const scanned = readAttemptUsageReceipts(workspace, attempt.attempt_id, {
        known_legs: attempt.usage_legs,
        fs: file_system
      });
      if (scanned.legs.length > 0) {
        continue;
      }
    }
    /** @type {string[]} */
    let children;
    try {
      children = file_system.readdirSync(dir);
    } catch {
      continue;
    }
    if (
      children.some(
        (child) => !validateFile(path.join(dir, child), file_system)
      )
    ) {
      continue;
    }
    try {
      for (const child of children) {
        file_system.unlinkSync(path.join(dir, child));
      }
      file_system.rmdirSync(dir);
      removed += 1;
    } catch (err) {
      log('receipt inbox gc failed: %o', err);
    }
  }
  return removed;
}
