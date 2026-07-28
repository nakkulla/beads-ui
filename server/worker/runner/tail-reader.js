/**
 * Incremental file tail reader (UI-o2yt §3.1).
 *
 * The runner writes its jsonl stream straight to the session-log file through an
 * inherited fd, so the server is no longer the transport — it is a READER of a
 * file the kernel fills. This module is that reader: an offset cursor, a partial
 * line buffer, `fs.watch` change detection, and a polling fallback for the cases
 * `fs.watch` misses (coalesced events, network filesystems, a watcher the OS
 * drops). Both the live engine and the restart monitor consume it, which is what
 * makes "the file is the only source of truth" one implementation.
 *
 * Everything is synchronous by design: reads are small offset reads on an open
 * fd, and a sync pump keeps the line ORDER trivially correct — an async read
 * interleaved with a watch event could otherwise emit lines out of order.
 */
import nodeFs from 'node:fs';
import { StringDecoder } from 'node:string_decoder';

/**
 * Polling cadence of the `fs.watch` fallback. Change events are the fast path;
 * this only bounds how long a MISSED event can stall the tail.
 *
 * @type {number}
 */
export const TAIL_POLL_MS = 500;

/**
 * Bytes read per offset read.
 *
 * @type {number}
 */
const READ_CHUNK_BYTES = 64 * 1024;

/**
 * How far back from EOF the seed scan looks for the last newline. A jsonl line
 * longer than this is not a line worth reconstructing mid-write, so the seed
 * degrades to "start clean at EOF" instead of paging in an unbounded tail.
 *
 * @type {number}
 */
const SEED_SCAN_BYTES = 64 * 1024;

/**
 * How many consecutive open failures are tolerated before the reader gives up.
 * A session log appears at spawn, so an absent file is normally a one-poll race;
 * a file still missing after this many polls is a real absence.
 *
 * @type {number}
 */
const OPEN_RETRY_LIMIT = 10;

/**
 * @typedef {Object} TailReaderInput
 * @property {string} file - Absolute path of the file to follow.
 * @property {(line: string) => void} onLine - Called once per COMPLETE line, in
 * file order, without its trailing newline.
 * @property {(err: unknown, kind: 'open'|'read') => void} [onError] - Called
 * when the reader gives up opening the file (`open`) or on a read fault
 * (`read`, retried on the next poll). Never throws into the caller.
 * @property {typeof import('node:fs')} [fs]
 * @property {number} [poll_ms]
 * @property {boolean} [seed_from_end] - Start at EOF instead of at byte 0,
 * seeding the partial-line buffer with the bytes after the last newline so a
 * line being written WHILE the reader attaches is emitted exactly once, whole
 * (UI-o2yt §3.3 mid-line reattach).
 */

/**
 * Create a tail reader. Nothing is opened until {@link start}.
 *
 * @param {TailReaderInput} input
 * @returns {{ start: () => void, pump: () => void, drain: (options?: { flush?: boolean }) => void, stop: () => void, offset: () => number }}
 */
export function createTailReader(input) {
  const fs = input.fs || nodeFs;
  const file = input.file;
  const onLine = input.onLine;
  const onError = input.onError || (() => {});
  const poll_ms =
    typeof input.poll_ms === 'number' ? input.poll_ms : TAIL_POLL_MS;
  const seed_from_end = input.seed_from_end === true;

  /** @type {number|null} */
  let fd = null;
  let offset = 0;
  let buffer = '';
  let decoder = new StringDecoder('utf8');
  /** @type {import('node:fs').FSWatcher|null} */
  let watcher = null;
  /** @type {ReturnType<typeof setInterval>|null} */
  let timer = null;
  let stopped = false;
  let open_failures = 0;
  // The EOF seed belongs to the FIRST open attempt only. A file that did not
  // exist when the reader attached has no past to skip, so an open that lands
  // later must start at byte 0 — seeding it would silently drop every line
  // written between the attach and the file's creation.
  let seed_pending = seed_from_end;
  // A watch event firing INSIDE a pump would re-enter and interleave lines.
  let pumping = false;

  /**
   * Seed the cursor at EOF, carrying the trailing partial line into the buffer.
   *
   * @param {number} fd_open
   * @param {number} size
   */
  function seedFromEnd(fd_open, size) {
    offset = size;
    if (size === 0) {
      return;
    }
    const span = Math.min(size, SEED_SCAN_BYTES);
    const buf = Buffer.allocUnsafe(span);
    let read = 0;
    try {
      read = fs.readSync(fd_open, buf, 0, span, size - span);
    } catch (err) {
      onError(err, 'read');
      return;
    }
    const slice = buf.subarray(0, read);
    const nl = slice.lastIndexOf(0x0a);
    if (nl >= 0) {
      buffer = slice.subarray(nl + 1).toString('utf8');
      return;
    }
    // No newline in the scan window: only the whole-file case can be seeded
    // safely — anything else would be an arbitrary mid-line cut.
    buffer = span === size ? slice.toString('utf8') : '';
  }

  /**
   * Open the file and place the cursor. Returns false while the file is absent.
   *
   * @returns {boolean}
   */
  function openFile() {
    try {
      fd = fs.openSync(file, 'r');
    } catch (err) {
      open_failures += 1;
      seed_pending = false;
      if (open_failures >= OPEN_RETRY_LIMIT) {
        onError(err, 'open');
        stop();
      }
      return false;
    }
    open_failures = 0;
    if (seed_pending) {
      seed_pending = false;
      try {
        seedFromEnd(fd, fs.fstatSync(fd).size);
      } catch (err) {
        onError(err, 'read');
      }
    }
    return true;
  }

  /**
   * Emit every complete line held in the buffer.
   */
  function emitBufferedLines() {
    let nl = buffer.indexOf('\n');
    while (nl >= 0) {
      const line = buffer.slice(0, nl).replace(/\r$/, '');
      buffer = buffer.slice(nl + 1);
      if (line.length > 0) {
        onLine(line);
      }
      nl = buffer.indexOf('\n');
    }
  }

  /**
   * Read everything appended since the last cursor position.
   */
  function pump() {
    if (stopped || pumping) {
      return;
    }
    if (fd == null && !openFile()) {
      return;
    }
    pumping = true;
    try {
      /** @type {number} */
      let size;
      try {
        size = fs.fstatSync(/** @type {number} */ (fd)).size;
      } catch (err) {
        onError(err, 'read');
        return;
      }
      if (size < offset) {
        // Truncated/replaced underneath us: re-read from the new start rather
        // than reading past EOF forever.
        offset = 0;
        buffer = '';
        decoder = new StringDecoder('utf8');
      }
      while (offset < size) {
        const want = Math.min(READ_CHUNK_BYTES, size - offset);
        const buf = Buffer.allocUnsafe(want);
        /** @type {number} */
        let read;
        try {
          read = fs.readSync(/** @type {number} */ (fd), buf, 0, want, offset);
        } catch (err) {
          // Keep the offset and retry on the next poll (backoff by cadence).
          onError(err, 'read');
          return;
        }
        if (read <= 0) {
          break;
        }
        offset += read;
        buffer += decoder.write(buf.subarray(0, read));
        emitBufferedLines();
      }
    } finally {
      pumping = false;
    }
  }

  /**
   * Begin following the file: initial read, watch, and the polling fallback.
   */
  function start() {
    if (stopped) {
      return;
    }
    pump();
    try {
      watcher = fs.watch(file, () => pump());
      watcher.on?.('error', () => {
        // The poll fallback is the whole point: a dead watcher is not fatal.
        try {
          watcher?.close();
        } catch {
          /* ignore */
        }
        watcher = null;
      });
    } catch {
      watcher = null;
    }
    timer = setInterval(() => pump(), poll_ms);
    if (typeof timer.unref === 'function') {
      timer.unref();
    }
  }

  /**
   * Read to EOF once more, then (by default) flush a trailing partial line the
   * writer never terminated — the engine's long-standing close-time behaviour.
   *
   * @param {{ flush?: boolean }} [options]
   */
  function drain(options = {}) {
    pump();
    if (options.flush === false) {
      return;
    }
    const rest = buffer + decoder.end();
    buffer = '';
    decoder = new StringDecoder('utf8');
    const line = rest.replace(/\r?\n$/, '').trim();
    if (line.length > 0) {
      onLine(line);
    }
  }

  /**
   * Stop following and release the fd, watcher, and timer.
   */
  function stop() {
    stopped = true;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (watcher) {
      try {
        watcher.close();
      } catch {
        /* ignore */
      }
      watcher = null;
    }
    if (fd != null) {
      try {
        fs.closeSync(fd);
      } catch {
        /* ignore */
      }
      fd = null;
    }
  }

  return { start, pump, drain, stop, offset: () => offset };
}
