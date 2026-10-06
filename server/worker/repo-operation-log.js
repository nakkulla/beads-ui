/**
 * The repo-operation run log's attempt boundary lines (UI-i8cy §5.1·§5.2).
 *
 * The runner child writes one `##repo-ops## {json}` line right before it spawns
 * the script and one right after the script ends, into the same append-only log
 * the script's stdout/stderr go to. This module is the ONLY owner of what such
 * a line is: the failure settlement strips them before it digests and
 * summarizes the log, and the log-reading API splits the log into attempts at
 * them. Two owners would let the digest and the popup disagree on what the
 * script printed.
 *
 * Detection is byte-level, before any decoding: a line that starts at the file
 * start or right after `\n`, carries the exact prefix bytes, holds a JSON
 * object, and names a known `event`. Anything else — a script that prints the
 * prefix followed by text, CRLF output, invalid UTF-8 — is script output and is
 * never touched.
 */

/** The fixed prefix of a boundary line, before its JSON payload. */
export const BOUNDARY_PREFIX = '##repo-ops## ';

const PREFIX_BYTES = Buffer.from(BOUNDARY_PREFIX, 'utf8');
const NEWLINE = 0x0a;

/** How many bytes of a log the reading API returns as body lines. */
export const LOG_TAIL_BYTES = 512 * 1024;

/**
 * @typedef {Object} BoundaryLine
 * @property {number} start - Byte offset of the line's first byte.
 * @property {number} end - Byte offset just past the line (past its `\n`).
 * @property {'start'|'end'} event
 * @property {Record<string, unknown>} payload
 * @property {boolean} sep - Whether the writer put a `\n` right before this
 * line because the output had not ended with one.
 */

/**
 * @typedef {Object} LogAttempt
 * @property {string|null} attempt_id
 * @property {number|null} started_at
 * @property {number|null} finished_at
 * @property {number|null} exit_code
 * @property {string|null} signal
 * @property {boolean} timed_out
 * @property {string[]} lines
 * @property {boolean} [body_truncated]
 */

/**
 * @typedef {Object} ParsedRepoOperationLog
 * @property {number} total_bytes
 * @property {number} truncated_bytes
 * @property {string[]} preamble
 * @property {LogAttempt[]} attempts
 */

/**
 * Format one boundary line, ready to append. `sep` puts the separating `\n` in
 * front of the line and records that fact in its JSON, so the stripper can take
 * the byte back out.
 *
 * @param {Record<string, unknown>} payload
 * @param {boolean} sep
 * @returns {string}
 */
export function formatBoundaryLine(payload, sep) {
  const body = sep ? { ...payload, sep: true } : payload;
  return `${sep ? '\n' : ''}${BOUNDARY_PREFIX}${JSON.stringify(body)}\n`;
}

/**
 * Parse the payload of a line that already starts with the prefix bytes.
 *
 * @param {Buffer} buffer
 * @param {number} from - First byte after the prefix.
 * @param {number} to - Line end, exclusive, without the `\n`.
 * @returns {Record<string, unknown>|null}
 */
function boundaryPayload(buffer, from, to) {
  let value;
  try {
    value = JSON.parse(buffer.toString('utf8', from, to));
  } catch {
    return null;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  if (value.event !== 'start' && value.event !== 'end') {
    return null;
  }
  return value;
}

/**
 * Every boundary line of a log, in file order.
 *
 * @param {Buffer} buffer
 * @returns {BoundaryLine[]}
 */
export function scanBoundaryLines(buffer) {
  /** @type {BoundaryLine[]} */
  const found = [];
  let line_start = 0;
  while (line_start < buffer.length) {
    const newline = buffer.indexOf(NEWLINE, line_start);
    const content_end = newline === -1 ? buffer.length : newline;
    const line_end = newline === -1 ? buffer.length : newline + 1;
    if (
      content_end - line_start > PREFIX_BYTES.length &&
      buffer.compare(
        PREFIX_BYTES,
        0,
        PREFIX_BYTES.length,
        line_start,
        line_start + PREFIX_BYTES.length
      ) === 0
    ) {
      const payload = boundaryPayload(
        buffer,
        line_start + PREFIX_BYTES.length,
        content_end
      );
      if (payload) {
        found.push({
          start: line_start,
          end: line_end,
          event: /** @type {'start'|'end'} */ (payload.event),
          payload,
          sep: payload.sep === true
        });
      }
    }
    line_start = line_end;
  }
  return found;
}

/**
 * The byte ranges that are script output: everything except the boundary lines
 * and the one `\n` a `sep` line put in front of itself.
 *
 * @param {Buffer} buffer
 * @param {BoundaryLine[]} boundaries
 * @returns {Array<[number, number]>}
 */
function outputRanges(buffer, boundaries) {
  /** @type {Array<[number, number]>} */
  const ranges = [];
  let cursor = 0;
  for (const boundary of boundaries) {
    const cut_from =
      boundary.sep &&
      boundary.start > cursor &&
      buffer[boundary.start - 1] === NEWLINE
        ? boundary.start - 1
        : boundary.start;
    if (cut_from > cursor) {
      ranges.push([cursor, cut_from]);
    }
    cursor = Math.max(cursor, boundary.end);
  }
  if (cursor < buffer.length) {
    ranges.push([cursor, buffer.length]);
  }
  return ranges;
}

/**
 * The log with every boundary line (and each `sep` newline) removed — byte for
 * byte what the script printed. A log without boundary lines comes back as the
 * same bytes, so a digest over the result equals the digest from before the
 * runner wrote boundaries.
 *
 * @param {Buffer} buffer
 * @returns {Buffer}
 */
export function stripBoundaryLines(buffer) {
  const boundaries = scanBoundaryLines(buffer);
  if (boundaries.length === 0) {
    return buffer;
  }
  return Buffer.concat(
    outputRanges(buffer, boundaries).map(([from, to]) =>
      buffer.subarray(from, to)
    )
  );
}

const ESC = String.fromCharCode(27);
const BEL = String.fromCharCode(7);
// CSI sequences (colors, cursor moves), OSC sequences (titles, hyperlinks), and
// the remaining two-byte escapes. Built from strings because the control bytes
// cannot appear in a regex literal without tripping `no-control-regex`.
const ANSI_PATTERN = new RegExp(
  `${ESC}\\[[0-?]*[ -/]*[@-~]|${ESC}\\][^${BEL}${ESC}]*(?:${BEL}|${ESC}\\\\)|${ESC}[@-Z\\\\-_]`,
  'g'
);

/**
 * Drop terminal control sequences from one decoded line.
 *
 * @param {string} line
 * @returns {string}
 */
export function stripAnsi(line) {
  return line.replace(ANSI_PATTERN, '');
}

/**
 * Decode a run of output bytes into display lines: lenient UTF-8 (invalid bytes
 * become U+FFFD), one trailing `\n` closes the last line rather than opening an
 * empty one, a CR before `\n` is dropped, ANSI sequences are removed.
 *
 * @param {Buffer} bytes
 * @param {(text: string) => string} transform - Applied to the decoded text
 * before it is split (the API's credential redaction).
 * @returns {string[]}
 */
function decodeLines(bytes, transform) {
  if (bytes.length === 0) {
    return [];
  }
  const text = transform(bytes.toString('utf8'));
  const lines = text.split('\n');
  if (lines.length > 0 && lines[lines.length - 1] === '') {
    lines.pop();
  }
  return lines.map((line) => stripAnsi(line.replace(/\r$/, '')));
}

/**
 * @param {unknown} value
 * @returns {number|null}
 */
function finiteOrNull(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/**
 * Split one log into its preamble and attempts (UI-i8cy §5.3).
 *
 * Attempt METADATA comes from every boundary line of the whole buffer, so an
 * attempt whose body scrolled out of the tail window still says when it started
 * and how it ended. Body LINES come only from the last `tail_bytes`; the cut
 * moves forward to the next line start, so no half line is shown.
 *
 * Attempts are numbered by their start lines: an automatic retry re-uses the
 * same `attempt_id`, so the id is reference only. A start line with no end line
 * before the next start (or the file end) leaves its attempt unfinished. Output
 * after an end line — a grandchild that outlived the script — belongs to the
 * attempt that ended.
 *
 * @param {Buffer} buffer
 * @param {{ tail_bytes?: number, transform?: (text: string) => string }} [options]
 * @returns {ParsedRepoOperationLog}
 */
export function parseRepoOperationLog(buffer, options = {}) {
  const tail_bytes =
    typeof options.tail_bytes === 'number' && options.tail_bytes >= 0
      ? options.tail_bytes
      : LOG_TAIL_BYTES;
  const transform = options.transform || ((/** @type {string} */ text) => text);
  const total_bytes = buffer.length;
  let window_start = Math.max(0, total_bytes - tail_bytes);
  if (window_start > 0 && buffer[window_start - 1] !== NEWLINE) {
    const newline = buffer.indexOf(NEWLINE, window_start);
    window_start = newline === -1 ? total_bytes : newline + 1;
  }

  const boundaries = scanBoundaryLines(buffer);
  const ranges = outputRanges(buffer, boundaries);

  /**
   * The output bytes of `[from, to)`, clipped to the tail window.
   *
   * @param {number} from
   * @param {number} to
   * @param {number} [floor]
   * @returns {Buffer}
   */
  function outputBetween(from, to, floor = window_start) {
    const low = Math.max(from, floor);
    /** @type {Buffer[]} */
    const parts = [];
    for (const [range_from, range_to] of ranges) {
      const a = Math.max(range_from, low);
      const b = Math.min(range_to, to);
      if (a < b) {
        parts.push(buffer.subarray(a, b));
      }
    }
    return Buffer.concat(parts);
  }

  /** @type {Array<{ attempt: LogAttempt, from: number, to: number }>} */
  const segments = [];
  let preamble_end = total_bytes;
  for (const boundary of boundaries) {
    if (boundary.event === 'start') {
      if (segments.length === 0) {
        preamble_end = boundary.start;
      } else {
        segments[segments.length - 1].to = boundary.start;
      }
      const payload = boundary.payload;
      segments.push({
        attempt: {
          attempt_id:
            typeof payload.attempt_id === 'string' ? payload.attempt_id : null,
          started_at: finiteOrNull(payload.at),
          finished_at: null,
          exit_code: null,
          signal: null,
          timed_out: false,
          lines: []
        },
        from: boundary.end,
        to: total_bytes
      });
      continue;
    }
    const current = segments[segments.length - 1];
    if (!current || current.attempt.finished_at !== null) {
      continue;
    }
    const payload = boundary.payload;
    current.attempt.finished_at = finiteOrNull(payload.at);
    current.attempt.exit_code = Number.isInteger(payload.exit_code)
      ? Number(payload.exit_code)
      : null;
    current.attempt.signal =
      typeof payload.signal === 'string' ? payload.signal : null;
    current.attempt.timed_out = payload.timed_out === true;
  }

  const preamble = decodeLines(outputBetween(0, preamble_end), transform);
  const attempts = segments.map(({ attempt, from, to }) => {
    const lines = decodeLines(outputBetween(from, to), transform);
    if (
      lines.length === 0 &&
      from < window_start &&
      outputBetween(from, Math.min(to, window_start), 0).length > 0
    ) {
      return { ...attempt, lines: [], body_truncated: true };
    }
    return { ...attempt, lines };
  });

  return {
    total_bytes,
    truncated_bytes: window_start,
    preamble,
    attempts
  };
}
