/**
 * Per-bead append-only event timeline (record-timeline-retention §5).
 *
 * This is the PERMANENT source of truth for a bead's Worker history — the short,
 * human-readable event list the failure tile, the issue detail page, and
 * `bd comment` read. `queue.json` keeps only what is live or unprocessed (§7),
 * so anything a human needs to see about a finished attempt has to be here.
 *
 * Three properties make that safe:
 *
 *   - **Single writer.** ONE instance per workspace is built in `attach.js` and
 *     injected into every producer (scheduler, merge queue, coordinator, ws
 *     handlers). There is one Worker server per workspace (`bdui-shared`), so no
 *     cross-process locking is needed and none is attempted.
 *   - **Idempotent by `event_id`.** The same fact re-recorded — a retry after a
 *     failed append, a replay after a restart — carries the same id, and the
 *     reader keeps the FIRST occurrence. Producers therefore never have to ask
 *     "did I already write this?"; they just append again.
 *   - **Fail-visible, never blocking.** A rejected or failed append is REPORTED
 *     (`{ok:false}`) and logged, never thrown. The caller decides — §5 makes the
 *     attempt transfer out of `queue.json` wait for `{ok:true}`, so a lost
 *     append leaves the attempt in the queue for the next pass instead of
 *     losing the history — but the queue itself keeps moving either way.
 */
import node_fs from 'node:fs';
import path from 'node:path';
import { debug } from '../logging.js';
import { errorDetail } from './error-detail.js';
import { beadTimelinePath } from './state-paths.js';

const log = debug('worker:bead-timeline');

/**
 * @typedef {'dispatched'|'guard_warning'|'session_ended'|'attempt_failed'|'attempt_retry'|'queue_hold'|'queue_resume'|'landing_step'|'merge_step'|'operation_failed'|'needs_human'|'user_action'} TimelineKind
 */

/**
 * The closed event vocabulary of §5. Typed `ReadonlySet` so `checkJs` rejects a
 * consumer that tries to extend it: a kind that is not in this table has no
 * defined producer and no defined surface, so it must be added to the spec table
 * first.
 *
 * @type {ReadonlySet<string>}
 */
export const TIMELINE_KINDS = Object.freeze(
  new Set([
    'dispatched',
    'guard_warning',
    'session_ended',
    'attempt_failed',
    'attempt_retry',
    'queue_hold',
    'queue_resume',
    'landing_step',
    'merge_step',
    'operation_failed',
    'needs_human',
    'user_action'
  ])
);

/**
 * Upper bound on one stored `summary`, matching the 200-char extraction budget
 * §6 fixes for every summary source.
 *
 * @type {number}
 */
const SUMMARY_MAX = 200;

/**
 * @typedef {Object} TimelineEvent
 * @property {string} event_id - `<kind>:<attempt_id|bead_id>:<seq>`.
 * @property {number} at - Epoch ms.
 * @property {string} bead_id
 * @property {string} kind
 * @property {string} summary - One human-readable line.
 * @property {string} [attempt_id]
 * @property {string} [detail]
 * @property {string} [log_path]
 */

/**
 * @typedef {Object} TimelineAppendInput
 * @property {string} bead_id
 * @property {string} kind - Must be one of {@link TIMELINE_KINDS}.
 * @property {string} summary
 * @property {string|number} seq - THIRD `event_id` segment, supplied by the
 * producer: a monotonic sequence for a repeatable per-attempt step, or the
 * `op_id` for an operation event. The module composes and validates the id;
 * only the producer knows what makes its own fact unique.
 * @property {string} [attempt_id] - Second `event_id` segment when present;
 * the bead id is used otherwise (a bead-level fact has no attempt).
 * @property {string} [detail]
 * @property {string} [log_path]
 * @property {number} [at] - Epoch ms; defaults to the injected clock.
 */

/**
 * @typedef {{ ok: true, event: TimelineEvent }
 *   | { ok: false, reason: 'invalid'|'write_failed', detail: string }} TimelineAppendResult
 */

/**
 * Reject anything that would make an event unreadable or un-dedupable.
 *
 * @param {TimelineAppendInput} input
 * @param {() => number} now
 * @returns {{ ok: true, event: TimelineEvent } | { ok: false, detail: string }}
 */
function buildEvent(input, now) {
  const bead_id = String(input?.bead_id ?? '').trim();
  if (bead_id.length === 0) {
    return { ok: false, detail: 'bead_id is required' };
  }
  const kind = String(input?.kind ?? '');
  if (!TIMELINE_KINDS.has(kind)) {
    return { ok: false, detail: `unknown kind ${JSON.stringify(kind)}` };
  }
  const seq = String(input?.seq ?? '').trim();
  if (seq.length === 0) {
    return { ok: false, detail: 'seq is required to compose event_id' };
  }
  const summary = String(input?.summary ?? '').trim();
  if (summary.length === 0) {
    return { ok: false, detail: 'summary is required' };
  }
  const attempt_id = String(input?.attempt_id ?? '').trim();
  const at =
    typeof input?.at === 'number' && Number.isFinite(input.at)
      ? input.at
      : now();

  /** @type {TimelineEvent} */
  const event = {
    event_id: `${kind}:${attempt_id.length > 0 ? attempt_id : bead_id}:${seq}`,
    at,
    bead_id,
    kind,
    summary: summary.slice(0, SUMMARY_MAX)
  };
  if (attempt_id.length > 0) {
    event.attempt_id = attempt_id;
  }
  const detail = String(input?.detail ?? '').trim();
  if (detail.length > 0) {
    event.detail = detail;
  }
  const log_path = String(input?.log_path ?? '').trim();
  if (log_path.length > 0) {
    event.log_path = log_path;
  }
  return { ok: true, event };
}

/** @type {number} */
const NEWLINE_BYTE = 0x0a;

/**
 * The separator that puts this append on a line of its own.
 *
 * A crash mid-append leaves a torn tail with NO trailing newline. §5 says the
 * reader drops that line and resumes at the next one — which is only true if the
 * next append actually starts a new line, so the writer restores the boundary
 * instead of gluing a valid event onto a broken one. One `fstat` plus a one-byte
 * read; if either fails we assume the boundary is missing, because the cost of a
 * spurious blank line is a line the reader skips.
 *
 * @param {typeof import('node:fs')} fs
 * @param {number} fd
 * @param {string} file - For logging only.
 * @returns {string} `'\n'` when the file does not already end on a line boundary.
 */
function lineSeparatorFor(fs, fd, file) {
  try {
    const size = fs.fstatSync(fd).size;
    if (size === 0) {
      return '';
    }
    const tail = Buffer.alloc(1);
    const read = fs.readSync(fd, tail, 0, 1, size - 1);
    return read === 1 && tail[0] === NEWLINE_BYTE ? '' : '\n';
  } catch (err) {
    log('timeline tail probe failed for %s: %s', file, errorDetail(err));
    return '\n';
  }
}

/**
 * @param {unknown} raw
 * @returns {number} The requested cap, or `Infinity` when uncapped.
 */
function normalizeLimit(raw) {
  if (typeof raw !== 'number' || !Number.isFinite(raw)) {
    return Infinity;
  }
  return Math.max(0, Math.floor(raw));
}

/**
 * Build the workspace's single timeline writer/reader.
 *
 * @param {{
 *   workspace_root: string,
 *   fs?: typeof import('node:fs'),
 *   now?: () => number
 * }} options
 */
export function createBeadTimeline(options) {
  const workspace_root = String(options?.workspace_root ?? '');
  const fs = options?.fs || node_fs;
  const now = options?.now || (() => Date.now());

  return {
    /**
     * Append ONE event line, durably.
     *
     * The line is written with a SINGLE `write` on a handle opened `O_APPEND`
     * and then `fsync`ed, so the call returns only once the bytes are on disk —
     * that is what lets §7's attempt transfer depend on it. A short write is
     * treated as a failure rather than looped: the partial line is torn, the
     * reader drops it, and the caller's retry re-appends the same `event_id`,
     * which the reader dedupes. Looping instead would keep the "one line, one
     * write" property only by accident.
     *
     * @param {TimelineAppendInput} input
     * @returns {TimelineAppendResult}
     */
    append(input) {
      const built = buildEvent(input, now);
      if (!built.ok) {
        log('timeline append rejected: %s', built.detail);
        return { ok: false, reason: 'invalid', detail: built.detail };
      }
      const event = built.event;
      const file = beadTimelinePath(workspace_root, event.bead_id);
      /** @type {number|null} */
      let fd = null;
      try {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        // `a+` rather than `a`: writes still go through `O_APPEND`, and the read
        // side is only used for the one-byte line-boundary probe below.
        fd = fs.openSync(file, 'a+');
        const buf = Buffer.from(
          `${lineSeparatorFor(fs, fd, file)}${JSON.stringify(event)}\n`,
          'utf8'
        );
        const written = fs.writeSync(fd, buf, 0, buf.length);
        if (written !== buf.length) {
          throw new Error(`short write: ${written}/${buf.length} bytes`);
        }
        fs.fsyncSync(fd);
      } catch (err) {
        const detail = errorDetail(err);
        log('timeline append failed for %s: %s', file, detail);
        return { ok: false, reason: 'write_failed', detail };
      } finally {
        if (fd !== null) {
          try {
            fs.closeSync(fd);
          } catch (err) {
            log('timeline close failed for %s: %s', file, errorDetail(err));
          }
        }
      }
      return { ok: true, event };
    },

    /**
     * Read one bead's timeline, oldest first.
     *
     * A line that fails `JSON.parse` is dropped — that is the torn final line a
     * crash mid-append leaves behind — and the dropped COUNT is logged once per
     * read rather than once per line. Events are deduped by `event_id` keeping
     * the first occurrence (the original write, with its original `at`), and at
     * most `limit` of the most recent survivors are returned.
     *
     * A missing file is an empty timeline, not an error: every bead has one
     * before its first event.
     *
     * @param {string} bead_id
     * @param {{ limit?: number }} [read_options]
     * @returns {TimelineEvent[]}
     */
    readTimeline(bead_id, read_options = {}) {
      const file = beadTimelinePath(workspace_root, bead_id);
      /** @type {string} */
      let text;
      try {
        text = fs.readFileSync(file, 'utf8');
      } catch (err) {
        if (/** @type {NodeJS.ErrnoException} */ (err)?.code !== 'ENOENT') {
          log('timeline read failed for %s: %s', file, errorDetail(err));
        }
        return [];
      }

      /** @type {Map<string, TimelineEvent>} */
      const by_id = new Map();
      let dropped = 0;
      for (const line of text.split('\n')) {
        if (line.trim().length === 0) {
          continue;
        }
        /** @type {any} */
        let parsed;
        try {
          parsed = JSON.parse(line);
        } catch {
          dropped += 1;
          continue;
        }
        if (
          !parsed ||
          typeof parsed !== 'object' ||
          typeof parsed.event_id !== 'string' ||
          parsed.event_id.length === 0
        ) {
          dropped += 1;
          continue;
        }
        if (!by_id.has(parsed.event_id)) {
          by_id.set(parsed.event_id, parsed);
        }
      }
      if (dropped > 0) {
        log('timeline %s: dropped %d unreadable line(s)', file, dropped);
      }

      const events = [...by_id.values()];
      const limit = normalizeLimit(read_options?.limit);
      if (limit >= events.length) {
        return events;
      }
      return events.slice(events.length - limit);
    }
  };
}
