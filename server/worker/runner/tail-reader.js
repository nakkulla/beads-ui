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
 * @property {number} [start_offset] - Byte offset to begin reading at (default
 * 0). A restart monitor passes the LINE BOUNDARY its predecessor consumed up to
 * (UI-o2yt §3.3), so the bytes of a line that was half-written at reattach are
 * read normally and buffered — the line is then emitted exactly once, whole,
 * with no size cap and no multibyte cut.
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
  const start_offset =
    typeof input.start_offset === 'number' && input.start_offset > 0
      ? input.start_offset
      : 0;

  /** @type {number|null} */
  let fd = null;
  let offset = start_offset;
  let buffer = '';
  let decoder = new StringDecoder('utf8');
  /** @type {import('node:fs').FSWatcher|null} */
  let watcher = null;
  /** @type {ReturnType<typeof setInterval>|null} */
  let timer = null;
  let stopped = false;
  let open_failures = 0;
  // A watch event firing INSIDE a pump would re-enter and interleave lines.
  let pumping = false;

  /**
   * Open the file. Returns false while the file is absent.
   *
   * @returns {boolean}
   */
  function openFile() {
    try {
      fd = fs.openSync(file, 'r');
    } catch (err) {
      open_failures += 1;
      if (open_failures >= OPEN_RETRY_LIMIT) {
        onError(err, 'open');
        stop();
      }
      return false;
    }
    open_failures = 0;
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
        // than waiting for an EOF that already moved backwards.
        offset = Math.min(start_offset, size);
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
