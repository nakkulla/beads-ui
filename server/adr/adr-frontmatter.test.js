import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { compareAdrDesc, readAdrDir, readAdrFile } from './adr-frontmatter.js';

/**
 * @param {Record<string, string>} keys
 */
function frontmatter(keys) {
  const lines = Object.entries(keys).map(([k, v]) => `${k}: ${v}`);
  return ['---', ...lines, '---', '', '# body', ''].join('\n');
}

const VALID = {
  id: '12',
  title: '결정 제목',
  status: 'accepted',
  date: '2026-09-05',
  summary: "'요약 문장'"
};

describe('readAdrFile', () => {
  test('reads a well-formed ADR file', () => {
    const text = frontmatter(VALID);

    const result = readAdrFile(text, '0012-some-decision.md');

    expect(result).toEqual({
      ok: true,
      adr: {
        file: '0012-some-decision.md',
        id: 12,
        title: '결정 제목',
        status: 'accepted',
        date: '2026-09-05',
        summary: '요약 문장',
        supersedes: [],
        superseded_by: null,
        superseded_by_note: null,
        spec: null,
        bead: null
      }
    });
  });

  test('unquotes double-quoted values with escapes', () => {
    const text = frontmatter({ ...VALID, title: '"say \\"hi\\""' });

    const result = readAdrFile(text, '0012-x.md');

    expect(result.ok && result.adr.title).toEqual('say "hi"');
  });

  test('strips a trailing space-hash comment from a plain scalar', () => {
    const text = frontmatter({ ...VALID, bead: 'UI-8uz7 # 소유 Bead' });

    const result = readAdrFile(text, '0012-x.md');

    expect(result.ok && result.adr.bead).toEqual('UI-8uz7');
  });

  test('keeps a hash inside a quoted value', () => {
    const text = frontmatter({ ...VALID, title: "'a # b'" });

    const result = readAdrFile(text, '0012-x.md');

    expect(result.ok && result.adr.title).toEqual('a # b');
  });

  test('parses supersedes as an integer list', () => {
    const text = frontmatter({ ...VALID, supersedes: '[4, 7]' });

    const result = readAdrFile(text, '0012-x.md');

    expect(result.ok && result.adr.supersedes).toEqual([4, 7]);
  });

  test('parses superseded_by as an integer', () => {
    const text = frontmatter({
      ...VALID,
      status: 'superseded',
      superseded_by: '31'
    });

    const result = readAdrFile(text, '0012-x.md');

    expect(result.ok && result.adr.superseded_by).toEqual(31);
  });

  test('rejects an unknown key', () => {
    const text = frontmatter({ ...VALID, owner: 'me' });

    const result = readAdrFile(text, '0012-x.md');

    expect(result).toEqual({ ok: false, error: "unknown key 'owner'" });
  });

  test('rejects a missing required key', () => {
    const text = ['---', 'id: 12', 'title: t', '---'].join('\n');

    const result = readAdrFile(text, '0012-x.md');

    expect(result).toEqual({
      ok: false,
      error: "missing required key 'status'"
    });
  });

  test('rejects an unknown status', () => {
    const text = frontmatter({ ...VALID, status: 'draft' });

    const result = readAdrFile(text, '0012-x.md');

    expect(result).toEqual({ ok: false, error: "unknown status 'draft'" });
  });

  test('rejects an id that disagrees with the file name number', () => {
    const text = frontmatter({ ...VALID, id: '13' });

    const result = readAdrFile(text, '0012-x.md');

    expect(result).toEqual({
      ok: false,
      error: "key 'id' is 13 but the file name says 12"
    });
  });

  test('rejects a non-integer supersedes list item', () => {
    const text = frontmatter({ ...VALID, supersedes: '[a]' });

    const result = readAdrFile(text, '0012-x.md');

    expect(result.ok).toEqual(false);
  });

  test('rejects a bare number under a string key', () => {
    const text = frontmatter({ ...VALID, summary: '20260905' });

    const result = readAdrFile(text, '0012-some-decision.md');

    expect(result.ok).toBe(false);
  });

  test('reads a string-id ADR file', () => {
    const text = frontmatter({ ...VALID, id: 'dotfiles-60u8' });

    const result = readAdrFile(text, 'dotfiles-60u8-identifier.md');

    expect(result.ok && result.adr.id).toEqual('dotfiles-60u8');
  });

  test('reads a sequence-suffixed string-id ADR file', () => {
    const text = frontmatter({ ...VALID, id: 'dotfiles-60u8-2' });

    const result = readAdrFile(text, 'dotfiles-60u8-2-second.md');

    expect(result.ok && result.adr.id).toEqual('dotfiles-60u8-2');
  });

  test('keeps a legacy id a number', () => {
    const text = frontmatter({ ...VALID, id: '45' });

    const result = readAdrFile(text, '0045-x.md');

    expect(result.ok && typeof result.adr.id).toEqual('number');
  });

  test('matches a leading-zero file name prefix against a bare id', () => {
    const text = frontmatter({ ...VALID, id: '45' });

    const result = readAdrFile(text, '0045-x.md');

    expect(result.ok).toEqual(true);
  });

  test('parses supersedes mixing an integer and a quoted string id', () => {
    const text = frontmatter({ ...VALID, supersedes: '[45, "dotfiles-60u8"]' });

    const result = readAdrFile(text, '0012-x.md');

    expect(result.ok && result.adr.supersedes).toEqual([45, 'dotfiles-60u8']);
  });

  test('parses superseded_by as a string id', () => {
    const text = frontmatter({
      ...VALID,
      status: 'superseded',
      superseded_by: '"dotfiles-60u8"'
    });

    const result = readAdrFile(text, '0012-x.md');

    expect(result.ok && result.adr.superseded_by).toEqual('dotfiles-60u8');
  });

  test('rejects a string id that breaks the identifier grammar', () => {
    const text = frontmatter({ ...VALID, id: '"not an id"' });

    const result = readAdrFile(text, '0012-x.md');

    expect(result).toEqual({
      ok: false,
      error: "key 'id' must be an integer or ADR identifier"
    });
  });

  test('rejects a file without frontmatter', () => {
    const result = readAdrFile('# just a heading\n', '0012-x.md');

    expect(result).toEqual({
      ok: false,
      error: 'no YAML frontmatter block at the top of the file'
    });
  });

  test('rejects a non-ADR file name', () => {
    const result = readAdrFile(frontmatter(VALID), 'README.md');

    expect(result).toEqual({
      ok: false,
      error: "'README.md' is not an ADR file name"
    });
  });
});

describe('readAdrDir', () => {
  /** @type {string} */
  let dir;

  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), 'adr-fm-'));
  });

  afterEach(async () => {
    await fs.rm(dir, { recursive: true, force: true });
  });

  test('skips non-ADR file names', async () => {
    await fs.writeFile(path.join(dir, 'README.md'), 'index\n');
    await fs.writeFile(path.join(dir, 'notes.txt'), 'x\n');
    await fs.writeFile(
      path.join(dir, '0012-x.md'),
      frontmatter({ ...VALID, id: '12' })
    );

    const result = await readAdrDir(dir);

    expect(result.adrs.map((a) => a.file)).toEqual(['0012-x.md']);
    expect(result.errors).toEqual([]);
  });

  test('collects per-file parse errors', async () => {
    await fs.writeFile(path.join(dir, '0013-bad.md'), 'no frontmatter\n');

    const result = await readAdrDir(dir);

    expect(result.adrs).toEqual([]);
    expect(result.errors).toEqual([
      {
        file: '0013-bad.md',
        error: 'no YAML frontmatter block at the top of the file'
      }
    ]);
  });

  test('lists legacy and string-id files from one directory', async () => {
    await fs.writeFile(
      path.join(dir, '0045-legacy.md'),
      frontmatter({ ...VALID, id: '45' })
    );
    await fs.writeFile(
      path.join(dir, 'dotfiles-60u8-first.md'),
      frontmatter({ ...VALID, id: 'dotfiles-60u8' })
    );
    await fs.writeFile(
      path.join(dir, 'dotfiles-60u8-2-second.md'),
      frontmatter({ ...VALID, id: 'dotfiles-60u8-2' })
    );

    const result = await readAdrDir(dir);

    expect(result.adrs.map((a) => a.id)).toEqual([
      45,
      'dotfiles-60u8-2',
      'dotfiles-60u8'
    ]);
    expect(result.errors).toEqual([]);
  });

  test('returns an empty result for a missing directory', async () => {
    const result = await readAdrDir(path.join(dir, 'nope'));

    expect(result).toEqual({ adrs: [], errors: [] });
  });
});

describe('compareAdrDesc', () => {
  /**
   * @param {number|string} id
   * @param {string} date
   */
  function row(id, date) {
    return /** @type {any} */ ({ id, date });
  }

  test('orders legacy numbers ahead of every string id', () => {
    const rows = [row('dotfiles-60u8', '2026-09-09'), row(3, '2026-01-01')];

    rows.sort(compareAdrDesc);

    expect(rows.map((r) => r.id)).toEqual([3, 'dotfiles-60u8']);
  });

  test('orders legacy numbers descending', () => {
    const rows = [row(3, '2026-01-01'), row(31, '2026-01-01')];

    rows.sort(compareAdrDesc);

    expect(rows.map((r) => r.id)).toEqual([31, 3]);
  });

  test('orders string ids by date descending', () => {
    const rows = [row('a-1', '2026-09-01'), row('b-2', '2026-09-09')];

    rows.sort(compareAdrDesc);

    expect(rows.map((r) => r.id)).toEqual(['b-2', 'a-1']);
  });

  test('breaks a string id date tie by the id text ascending', () => {
    const rows = [row('b-2', '2026-09-09'), row('a-1', '2026-09-09')];

    rows.sort(compareAdrDesc);

    expect(rows.map((r) => r.id)).toEqual(['a-1', 'b-2']);
  });
});
