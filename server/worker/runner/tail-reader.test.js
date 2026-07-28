import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createTailReader } from './tail-reader.js';

/** @type {string} */
let dir;
/** @type {string} */
let file;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-tail-'));
  file = path.join(dir, 'att-1.jsonl');
});

afterEach(() => {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

/**
 * @param {string} text
 */
function write(text) {
  fs.appendFileSync(file, text);
}

/**
 * @param {{ start_offset?: number }} [options]
 */
function reader(options = {}) {
  /** @type {string[]} */
  const lines = [];
  /** @type {Array<{ kind: string }>} */
  const errors = [];
  const tail = createTailReader({
    file,
    onLine: (l) => lines.push(l),
    onError: (_err, kind) => errors.push({ kind }),
    poll_ms: 5,
    start_offset: options.start_offset
  });
  return { tail, lines, errors };
}

describe('runner/tail-reader', () => {
  test('reads the lines already in the file at start', () => {
    write('{"a":1}\n{"a":2}\n');
    const { tail, lines } = reader();

    tail.start();
    tail.stop();

    expect(lines).toEqual(['{"a":1}', '{"a":2}']);
  });

  test('emits only complete lines, joining a partial write with its remainder', () => {
    const { tail, lines } = reader();
    tail.start();

    write('{"a":');
    tail.pump();
    expect(lines).toEqual([]);

    write('1}\n');
    tail.pump();
    tail.stop();

    expect(lines).toEqual(['{"a":1}']);
  });

  test('advances the offset so an appended line is read exactly once', () => {
    write('{"a":1}\n');
    const { tail, lines } = reader();
    tail.start();

    write('{"a":2}\n');
    tail.pump();
    tail.pump();
    tail.stop();

    expect(lines).toEqual(['{"a":1}', '{"a":2}']);
  });

  test('follows appends through the polling fallback when no watch event fires', async () => {
    const { tail, lines } = reader();
    // A watcher that never fires: the poll is the only thing left.
    const watch_spy = vi
      .spyOn(fs, 'watch')
      .mockReturnValue(/** @type {any} */ ({ on: () => {}, close: () => {} }));
    try {
      tail.start();
      write('{"a":1}\n');
      await vi.waitFor(() => expect(lines).toEqual(['{"a":1}']), {
        timeout: 500
      });
    } finally {
      watch_spy.mockRestore();
      tail.stop();
    }
  });

  test('drain reads to EOF and flushes an unterminated trailing line', () => {
    const { tail, lines } = reader();
    tail.start();

    write('{"a":1}\n{"a":2}');
    tail.drain();
    tail.stop();

    expect(lines).toEqual(['{"a":1}', '{"a":2}']);
  });

  test('start_offset skips the bytes another reader already owns', () => {
    const past = '{"old":1}\n';
    write(past);
    const { tail, lines } = reader({ start_offset: past.length });

    tail.start();
    write('{"new":1}\n');
    tail.pump();
    tail.stop();

    expect(lines).toEqual(['{"new":1}']);
  });

  test('a line half-written at the start offset is emitted whole, exactly once', () => {
    // The reattach point is the last newline BOUNDARY, so the partial line's
    // bytes are read normally and completed by the next append.
    const past = '{"old":1}\n';
    write(`${past}{"nea`);
    const { tail, lines } = reader({ start_offset: past.length });

    tail.start();
    write('r":1}\n');
    tail.pump();
    tail.stop();

    expect(lines).toEqual(['{"near":1}']);
  });

  test('a multibyte character split across the start offset survives', () => {
    const past = '{"old":1}\n';
    write(past);
    const partial = Buffer.from('{"t":"한"}\n', 'utf8');
    fs.appendFileSync(file, partial.subarray(0, 8));
    const { tail, lines } = reader({ start_offset: past.length });

    tail.start();
    fs.appendFileSync(file, partial.subarray(8));
    tail.pump();
    tail.stop();

    expect(lines).toEqual(['{"t":"한"}']);
  });

  test('a partial line longer than the read chunk is still completed', () => {
    const past = '{"old":1}\n';
    write(past);
    const big = 'x'.repeat(200 * 1024);
    write(`{"t":"${big}`);
    const { tail, lines } = reader({ start_offset: past.length });

    tail.start();
    write('"}\n');
    tail.pump();
    tail.stop();

    expect(lines).toEqual([`{"t":"${big}"}`]);
  });

  test('reports the file as absent after the open retry budget', () => {
    const { tail, lines, errors } = reader();

    for (let i = 0; i < 12; i += 1) {
      tail.pump();
    }
    tail.stop();

    expect(lines).toEqual([]);
    expect(errors).toEqual([{ kind: 'open' }]);
  });

  test('picks the file up once it appears', () => {
    const { tail, lines, errors } = reader();
    tail.pump();

    write('{"a":1}\n');
    tail.pump();
    tail.stop();

    expect(lines).toEqual(['{"a":1}']);
    expect(errors).toEqual([]);
  });

  test('re-reads from the start when the file is truncated underneath it', () => {
    write('{"a":1}\n{"a":2}\n');
    const { tail, lines } = reader();
    tail.start();

    fs.writeFileSync(file, '{"b":1}\n');
    tail.pump();
    tail.stop();

    // Reading past the new EOF forever would be the alternative.
    expect(lines).toEqual(['{"a":1}', '{"a":2}', '{"b":1}']);
  });

  test('splits a multibyte character across two reads without corrupting it', () => {
    const { tail, lines } = reader();
    tail.start();

    const buf = Buffer.from('{"t":"한"}\n', 'utf8');
    // The cut lands INSIDE the 3-byte sequence: a per-read utf8 decode would
    // surface replacement characters here.
    fs.appendFileSync(file, buf.subarray(0, 8));
    tail.pump();
    fs.appendFileSync(file, buf.subarray(8));
    tail.pump();
    tail.stop();

    expect(lines).toEqual(['{"t":"한"}']);
  });
});
