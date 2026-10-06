import { describe, expect, test } from 'vitest';
import {
  formatBoundaryLine,
  parseRepoOperationLog,
  scanBoundaryLines,
  stripAnsi,
  stripBoundaryLines
} from './repo-operation-log.js';

/**
 * A boundary line exactly as the runner child writes it.
 *
 * @param {Record<string, unknown>} payload
 * @param {boolean} [sep]
 */
function line(payload, sep = false) {
  return formatBoundaryLine(payload, sep);
}

/**
 * @param {number} at
 * @param {string} [attempt_id]
 */
function start(at, attempt_id = 'op:1') {
  return line({ event: 'start', attempt_id, at });
}

/**
 * @param {number} at
 * @param {{ exit_code?: number|null, signal?: string|null, timed_out?: boolean, sep?: boolean, attempt_id?: string }} [fields]
 */
function end(at, fields = {}) {
  return line(
    {
      event: 'end',
      attempt_id: fields.attempt_id || 'op:1',
      at,
      exit_code: fields.exit_code === undefined ? 0 : fields.exit_code,
      signal: fields.signal || null,
      timed_out: fields.timed_out === true
    },
    fields.sep === true
  );
}

describe('boundary line detection', () => {
  test('finds a start and an end line in file order', () => {
    const buffer = Buffer.from(`${start(1)}hello\n${end(2)}`);

    const found = scanBoundaryLines(buffer);

    expect(found.map((entry) => entry.event)).toEqual(['start', 'end']);
  });

  test('treats a prefixed line without JSON as script output', () => {
    const buffer = Buffer.from('##repo-ops## not json\n');

    const found = scanBoundaryLines(buffer);

    expect(found).toEqual([]);
  });

  test('treats a prefixed line with an unknown event as script output', () => {
    const buffer = Buffer.from('##repo-ops## {"event":"other"}\n');

    const found = scanBoundaryLines(buffer);

    expect(found).toEqual([]);
  });

  test('ignores the prefix in the middle of a line', () => {
    const buffer = Buffer.from(`echo ${start(1)}`);

    const found = scanBoundaryLines(buffer);

    expect(found).toEqual([]);
  });
});

describe('stripBoundaryLines', () => {
  /** @type {Array<[string, Buffer]>} */
  const outputs = [
    ['output ending with a newline', Buffer.from('step 1\nstep 2\n')],
    ['output without a trailing newline', Buffer.from('step 1\nno newline')],
    ['CRLF output', Buffer.from('one\r\ntwo\r\nthree')],
    [
      'invalid UTF-8 output',
      Buffer.concat([
        Buffer.from('bad '),
        Buffer.from([0xff, 0xfe, 0x80]),
        Buffer.from('\nend')
      ])
    ],
    ['empty output', Buffer.alloc(0)]
  ];

  test.each(outputs)(
    'returns the exact script bytes for %s',
    (_name, output) => {
      const sep = output.length > 0 && output[output.length - 1] !== 0x0a;
      const logged = Buffer.concat([
        Buffer.from(start(1)),
        output,
        Buffer.from(end(2, { sep }))
      ]);

      const stripped = stripBoundaryLines(logged);

      expect(stripped.equals(output)).toBe(true);
    }
  );

  test('returns two attempts of output joined as they were printed', () => {
    const first = Buffer.from('first fails');
    const second = Buffer.from('second\n');
    const logged = Buffer.concat([
      Buffer.from(start(1)),
      first,
      Buffer.from(end(2, { sep: true, exit_code: 1 })),
      Buffer.from(start(3)),
      second,
      Buffer.from(end(4))
    ]);

    const stripped = stripBoundaryLines(logged);

    expect(stripped.equals(Buffer.concat([first, second]))).toBe(true);
  });

  test('returns a log without boundary lines unchanged', () => {
    const legacy = Buffer.from('##repo-ops## plain text\nlegacy log\n');

    const stripped = stripBoundaryLines(legacy);

    expect(stripped.equals(legacy)).toBe(true);
  });
});

describe('parseRepoOperationLog', () => {
  test('puts every line of a log without boundaries in the preamble', () => {
    const buffer = Buffer.from('one\ntwo\n');

    const parsed = parseRepoOperationLog(buffer);

    expect(parsed).toEqual({
      total_bytes: buffer.length,
      truncated_bytes: 0,
      preamble: ['one', 'two'],
      attempts: []
    });
  });

  test('reads attempt metadata from the boundary lines', () => {
    const buffer = Buffer.from(
      `${start(1000, 'op:7')}fail\n${end(5000, { exit_code: 124, signal: 'SIGKILL', timed_out: true, attempt_id: 'op:7' })}`
    );

    const parsed = parseRepoOperationLog(buffer);

    expect(parsed.attempts).toEqual([
      {
        attempt_id: 'op:7',
        started_at: 1000,
        finished_at: 5000,
        exit_code: 124,
        signal: 'SIGKILL',
        timed_out: true,
        lines: ['fail']
      }
    ]);
  });

  test('closes an attempt with only a start line as unfinished', () => {
    const buffer = Buffer.from(`${start(1)}spawned\n${start(2)}again\n`);

    const parsed = parseRepoOperationLog(buffer);

    expect(
      parsed.attempts.map((attempt) => [attempt.finished_at, attempt.lines])
    ).toEqual([
      [null, ['spawned']],
      [null, ['again']]
    ]);
  });

  test('counts two starts with the same attempt id as two attempts', () => {
    const buffer = Buffer.from(
      `${start(1, 'op:1')}a\n${end(2, { exit_code: 1 })}${start(3, 'op:1')}b\n${end(4)}`
    );

    const parsed = parseRepoOperationLog(buffer);

    expect(parsed.attempts.map((attempt) => attempt.lines)).toEqual([
      ['a'],
      ['b']
    ]);
  });

  test('gives output written after an end line to the attempt that ended', () => {
    const buffer = Buffer.from(`${start(1)}a\n${end(2)}late grandchild\n`);

    const parsed = parseRepoOperationLog(buffer);

    expect(parsed.attempts[0].lines).toEqual(['a', 'late grandchild']);
  });

  test('keeps a prefixed non-JSON line as an ordinary body line', () => {
    const buffer = Buffer.from(`${start(1)}##repo-ops## echo\n${end(2)}`);

    const parsed = parseRepoOperationLog(buffer);

    expect(parsed.attempts[0].lines).toEqual(['##repo-ops## echo']);
  });

  test('keeps the last line of output that ended without a newline', () => {
    const buffer = Buffer.from(`${start(1)}no newline${end(2, { sep: true })}`);

    const parsed = parseRepoOperationLog(buffer);

    expect(parsed.attempts[0].lines).toEqual(['no newline']);
  });

  test('decodes invalid UTF-8 with replacement characters and strips ANSI', () => {
    const buffer = Buffer.concat([
      Buffer.from(start(1)),
      Buffer.from('\u001b[31mred\u001b[0m '),
      Buffer.from([0xff]),
      Buffer.from('\r\n'),
      Buffer.from(end(2))
    ]);

    const parsed = parseRepoOperationLog(buffer);

    expect(parsed.attempts[0].lines).toEqual(['red �']);
  });

  test('keeps metadata but no body for an attempt cut out of the tail window', () => {
    const long_body = `${'x'.repeat(200)}\n`.repeat(10);
    const buffer = Buffer.from(
      `${start(1)}${long_body}${end(2, { exit_code: 1 })}${start(3)}tail line\n`
    );

    const parsed = parseRepoOperationLog(buffer, { tail_bytes: 100 });

    expect(parsed.attempts[0]).toMatchObject({
      started_at: 1,
      finished_at: 2,
      exit_code: 1,
      lines: [],
      body_truncated: true
    });
  });

  test('keeps the start time of a running attempt whose start line was cut', () => {
    const body = `${'y'.repeat(50)}\n`.repeat(20);
    const buffer = Buffer.from(`${start(42)}${body}last\n`);

    const parsed = parseRepoOperationLog(buffer, { tail_bytes: 120 });

    expect(parsed.attempts).toHaveLength(1);
    expect(parsed.attempts[0].started_at).toBe(42);
    expect(parsed.attempts[0].finished_at).toBeNull();
    expect(parsed.attempts[0].lines.at(-1)).toBe('last');
  });

  test('drops the partial first line at the cut and reports the cut bytes', () => {
    const buffer = Buffer.from('aaaa\nbbbb\ncccc\n');

    const parsed = parseRepoOperationLog(buffer, { tail_bytes: 7 });

    expect(parsed).toMatchObject({
      truncated_bytes: 10,
      preamble: ['cccc']
    });
  });

  test('keeps the first line whole when the cut falls on a line start', () => {
    const buffer = Buffer.from('aaaa\nbbbb\n');

    const parsed = parseRepoOperationLog(buffer, { tail_bytes: 5 });

    expect(parsed.preamble).toEqual(['bbbb']);
  });

  test('applies the transform to decoded output before splitting it', () => {
    const buffer = Buffer.from('token=abc\n');

    const parsed = parseRepoOperationLog(buffer, {
      transform: (text) => text.replace('abc', '[redacted]')
    });

    expect(parsed.preamble).toEqual(['token=[redacted]']);
  });
});

describe('stripAnsi', () => {
  test('removes color, cursor and title sequences', () => {
    const text = '\u001b[1;32mok\u001b[0m\u001b[2K\u001b]0;title\u0007 done';

    const stripped = stripAnsi(text);

    expect(stripped).toBe('ok done');
  });
});
