import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createAdrSignals } from './adr-signals.js';

/**
 * @import { SpawnFn, SpawnResult } from './adr-signals.js'
 */

const CHECKERS = {
  index: '/opt/checkers/adr-index.py',
  citations: '/opt/checkers/adr-cite-check.py',
  candidates: '/opt/checkers/check-adr-candidates.py'
};

/** @type {string} */
let root_dir;
/** @type {{ args: string[], cwd: string, timeout: number }[]} */
let calls;
/** @type {(args: string[]) => Promise<SpawnResult>} */
let answer;
let live_spawns = 0;
let peak_spawns = 0;

/** @type {SpawnFn} */
const spawn = async (command, args, opts) => {
  calls.push({
    args: [command, ...args],
    cwd: opts.cwd,
    timeout: opts.timeout
  });
  live_spawns += 1;
  peak_spawns = Math.max(peak_spawns, live_spawns);
  try {
    return await answer(args);
  } finally {
    live_spawns -= 1;
  }
};

/**
 * @param {string[]} args
 */
function checkerOf(args) {
  if (args[0] === CHECKERS.index) {
    return 'index';
  }
  if (args[0] === CHECKERS.citations) {
    return 'citations';
  }
  return 'candidates';
}

/**
 * @param {string} rel
 * @param {string} text
 */
async function writeFile(rel, text) {
  const abs = path.join(root_dir, rel);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, text);
}

/**
 * @param {number} id
 * @param {string} [body]
 */
async function writeAdr(id, body = '') {
  const num = String(id).padStart(4, '0');
  await writeFile(
    `docs/adr/${num}-decision.md`,
    [
      '---',
      `id: ${id}`,
      'title: t',
      'status: accepted',
      'date: 2026-09-05',
      'summary: s',
      '---',
      body,
      ''
    ].join('\n')
  );
}

/**
 * @param {Object} [options]
 * @param {number} [options.concurrency]
 */
function signals(options = {}) {
  return createAdrSignals({
    spawn,
    checker_paths: CHECKERS,
    concurrency: options.concurrency
  });
}

/**
 * @param {unknown} value
 */
function jsonOut(value) {
  return { code: 0, stdout: JSON.stringify(value), stderr: '' };
}

beforeEach(async () => {
  root_dir = await fs.mkdtemp(path.join(os.tmpdir(), 'adr-signals-'));
  calls = [];
  live_spawns = 0;
  peak_spawns = 0;
  answer = async (args) => {
    const checker = checkerOf(args);
    if (checker === 'index') {
      return { code: 0, stdout: '', stderr: '' };
    }
    return jsonOut({ ok: true, errors: [] });
  };
});

afterEach(async () => {
  await fs.rm(root_dir, { recursive: true, force: true });
});

describe('computeWorkspace checker invocation', () => {
  test('calls the three checkers with the contract arguments', async () => {
    await writeAdr(12);
    await writeFile('docs/superpowers/specs/2026-09-05-a-design.md', 'x\n');

    await signals().computeWorkspace(root_dir, { full: true });

    expect(calls.map((c) => c.args)).toEqual([
      ['python3', CHECKERS.index, '--dir', 'docs/adr', '--check'],
      ['python3', CHECKERS.citations, '--repo', '.', '--json'],
      [
        'python3',
        CHECKERS.candidates,
        '--spec',
        'docs/superpowers/specs/2026-09-05-a-design.md',
        '--adr-dir',
        'docs/adr',
        '--json'
      ]
    ]);
    expect(calls.every((c) => c.cwd === root_dir)).toEqual(true);
    expect(calls.every((c) => c.timeout === 20000)).toEqual(true);
  });

  test('splits ADRs into current and history by id descending', async () => {
    await writeAdr(12);
    await writeAdr(31);
    await writeFile(
      'docs/adr/0009-old.md',
      '---\nid: 9\ntitle: t\nstatus: superseded\ndate: 2026-01-01\nsummary: s\n---\n'
    );

    const result = await signals().computeWorkspace(root_dir, { full: true });

    expect(result.current.map((a) => a.id)).toEqual([31, 12]);
    expect(result.history.map((a) => a.id)).toEqual([9]);
  });

  test('reports index drift from the first stderr line', async () => {
    await writeAdr(12);
    answer = async (args) => {
      if (checkerOf(args) === 'index') {
        return { code: 1, stdout: '', stderr: 'index drift\nmore\n' };
      }
      return jsonOut({ ok: true, errors: [] });
    };

    const result = await signals().computeWorkspace(root_dir, { full: true });

    expect(result.index_drift).toEqual({ ok: false, detail: 'index drift' });
  });

  test('passes citation errors through verbatim', async () => {
    await writeAdr(12);
    answer = async (args) => {
      if (checkerOf(args) === 'citations') {
        return jsonOut({
          ok: false,
          errors: [
            {
              kind: 'retired',
              file: 'AGENTS.md',
              line: 7,
              adr: 12,
              detail: 'deprecated'
            }
          ]
        });
      }
      return { code: 0, stdout: '{"ok":true,"errors":[]}', stderr: '' };
    };

    const result = await signals().computeWorkspace(root_dir, { full: true });

    expect(result.citations_stale).toEqual([
      {
        kind: 'retired',
        file: 'AGENTS.md',
        line: 7,
        adr: 12,
        detail: 'deprecated'
      }
    ]);
  });

  test('caps concurrent spawns at four', async () => {
    await writeAdr(12);
    for (let i = 0; i < 10; i += 1) {
      await writeFile(
        `docs/superpowers/specs/2026-09-0${i}-x-design.md`,
        'x\n'
      );
    }
    answer = async (args) => {
      await new Promise((resolve) => setTimeout(resolve, 1));
      if (checkerOf(args) === 'index') {
        return { code: 0, stdout: '', stderr: '' };
      }
      return jsonOut({ ok: true, errors: [] });
    };

    await signals().computeWorkspace(root_dir, { full: true });

    expect(peak_spawns).toEqual(4);
  });
});

describe('partial recompute', () => {
  test('reuses previous results and drops deleted specs', async () => {
    await writeAdr(12);
    await writeFile('docs/superpowers/specs/a-design.md', 'x\n');
    await writeFile('docs/superpowers/specs/b-design.md', 'x\n');
    const instance = signals();
    answer = async (args) => {
      if (checkerOf(args) === 'candidates') {
        return jsonOut({
          ok: false,
          errors: [{ kind: 'adr_missing', file: args[2], adr: 1 }]
        });
      }
      return { code: 0, stdout: '{"ok":true,"errors":[]}', stderr: '' };
    };
    await instance.computeWorkspace(root_dir, { full: true });

    calls = [];
    answer = async (args) => {
      if (checkerOf(args) === 'candidates') {
        return jsonOut({ ok: true, errors: [] });
      }
      return { code: 0, stdout: '{"ok":true,"errors":[]}', stderr: '' };
    };
    await fs.rm(path.join(root_dir, 'docs/superpowers/specs/b-design.md'));
    const result = await instance.computeWorkspace(root_dir, {
      full: false,
      specs: ['docs/superpowers/specs/a-design.md']
    });

    expect(
      calls
        .filter((c) => c.args[1] === CHECKERS.candidates)
        .map((c) => c.args[3])
    ).toEqual(['docs/superpowers/specs/a-design.md']);
    expect(result.candidates).toEqual([
      { spec: 'docs/superpowers/specs/a-design.md', ok: true, errors: [] }
    ]);
  });

  test('runs a spec that has no previous result even on a partial plan', async () => {
    await writeAdr(12);
    await writeFile('docs/superpowers/specs/a-design.md', 'x\n');
    const instance = signals();
    await instance.computeWorkspace(root_dir, { full: true });

    calls = [];
    await writeFile('docs/superpowers/specs/c-design.md', 'x\n');
    await instance.computeWorkspace(root_dir, { full: false, specs: [] });

    expect(
      calls
        .filter((c) => c.args[1] === CHECKERS.candidates)
        .map((c) => c.args[3])
    ).toEqual(['docs/superpowers/specs/c-design.md']);
  });
});

describe('environment errors', () => {
  /**
   * @param {'index' | 'citations' | 'candidates'} failing
   * @param {(args: string[]) => Promise<SpawnResult>} fail
   */
  async function computeWithFailure(failing, fail) {
    await writeAdr(12);
    await writeFile('docs/superpowers/specs/a-design.md', 'x\n');
    answer = async (args) => {
      if (checkerOf(args) === failing) {
        return fail(args);
      }
      if (checkerOf(args) === 'index') {
        return { code: 1, stdout: '', stderr: 'drift\n' };
      }
      return jsonOut({ ok: true, errors: [] });
    };
    return signals().computeWorkspace(root_dir, { full: true });
  }

  test('records exit 2 as that checker env error only', async () => {
    const result = await computeWithFailure('index', async () => ({
      code: 2,
      stdout: '',
      stderr: 'usage: adr-index.py\n'
    }));

    expect(result.env_errors).toEqual({
      index: 'adr-index.py: usage: adr-index.py',
      citations: null,
      candidates: null
    });
    expect(result.index_drift).toEqual(null);
    expect(result.candidates.length).toEqual(1);
  });

  test('records a spawn rejection as a citations env error', async () => {
    const result = await computeWithFailure('citations', async () => {
      throw new Error('spawn python3 ENOENT');
    });

    expect(result.env_errors.citations).toEqual(
      'adr-cite-check.py: spawn python3 ENOENT'
    );
    expect(result.citations_stale).toEqual([]);
    expect(result.index_drift).toEqual({ ok: false, detail: 'drift' });
  });

  test('records non-JSON stdout as a citations env error', async () => {
    const result = await computeWithFailure('citations', async () => ({
      code: 0,
      stdout: 'not json',
      stderr: ''
    }));

    expect(result.env_errors.citations).toMatch(/^adr-cite-check\.py: /);
  });

  test('empties candidates when the candidate checker cannot run', async () => {
    const result = await computeWithFailure('candidates', async () => {
      throw new Error('timed out');
    });

    expect(result.env_errors.candidates).toEqual(
      'check-adr-candidates.py: timed out'
    );
    expect(result.candidates).toEqual([]);
    expect(result.retry_pending).toEqual(true);
  });

  test('leaves retry_pending false when every checker succeeds', async () => {
    await writeAdr(12);

    const result = await signals().computeWorkspace(root_dir, { full: true });

    expect(result.retry_pending).toEqual(false);
  });

  test('keeps a usage kind local to its spec row', async () => {
    await writeAdr(12);
    await writeFile('docs/superpowers/specs/a-design.md', 'x\n');
    answer = async (args) => {
      if (checkerOf(args) === 'candidates') {
        return jsonOut({
          ok: false,
          errors: [{ kind: 'usage', detail: 'spec not found' }]
        });
      }
      return { code: 0, stdout: '{"ok":true,"errors":[]}', stderr: '' };
    };

    const result = await signals().computeWorkspace(root_dir, { full: true });

    expect(result.env_errors.candidates).toEqual(null);
    expect(result.candidates[0].errors[0].kind).toEqual('usage');
  });
});

describe('boundaries', () => {
  test('skips every spawn when docs/adr is missing', async () => {
    await writeFile('docs/superpowers/specs/a-design.md', 'x\n');

    const result = await signals().computeWorkspace(root_dir, { full: true });

    expect(calls).toEqual([]);
    expect(result.adr_dir_missing).toEqual(true);
    expect(result.current).toEqual([]);
    expect(result.retry_pending).toEqual(false);
  });

  test('returns empty candidates when the spec directory is missing', async () => {
    await writeAdr(12);

    const result = await signals().computeWorkspace(root_dir, { full: true });

    expect(result.candidates).toEqual([]);
  });
});

describe('cross citations', () => {
  test('extracts repo and number with line numbers from ADRs and specs', async () => {
    await writeAdr(
      12,
      ['line one', 'see ADR dotfiles/0045 for context'].join('\n')
    );
    await writeFile(
      'docs/superpowers/specs/a-design.md',
      ['intro', 'ADR beads-ui/0026 and ADR dotfiles/0045', ''].join('\n')
    );

    const result = await signals().computeWorkspace(root_dir, { full: true });

    expect(result.cross_citations).toEqual([
      {
        file: 'docs/adr/0012-decision.md',
        line: 9,
        repo: 'dotfiles',
        adr: 45
      },
      {
        file: 'docs/superpowers/specs/a-design.md',
        line: 2,
        repo: 'beads-ui',
        adr: 26
      },
      {
        file: 'docs/superpowers/specs/a-design.md',
        line: 2,
        repo: 'dotfiles',
        adr: 45
      }
    ]);
  });

  test('ignores mentions that do not match the citation syntax', async () => {
    await writeAdr(
      12,
      ['ADR 0045', 'ADR Dotfiles/0045', 'ADR dotfiles/45'].join('\n')
    );

    const result = await signals().computeWorkspace(root_dir, { full: true });

    expect(result.cross_citations).toEqual([]);
  });
});
