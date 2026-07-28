import { describe, expect, test, vi } from 'vitest';
import { createBdMetadata } from './bd-metadata.js';

describe('worker/bd-metadata argv contract', () => {
  test('setMetadata → bd update <id> --set-metadata key=value', async () => {
    const run = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    await createBdMetadata({ run, cwd: '/repo' }).setMetadata(
      'UI-1',
      'workflow_mode',
      'fast_track'
    );
    expect(run).toHaveBeenCalledWith(
      ['update', 'UI-1', '--set-metadata', 'workflow_mode=fast_track'],
      { cwd: '/repo' }
    );
  });

  test('unsetMetadata → bd update <id> --unset-metadata key', async () => {
    const run = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    await createBdMetadata({ run }).unsetMetadata('UI-1', 'workflow_mode');
    expect(run).toHaveBeenCalledWith(
      ['update', 'UI-1', '--unset-metadata', 'workflow_mode'],
      undefined
    );
  });

  test('readMetadata reads .metadata[key] from bd show --json', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: { id: 'UI-1', metadata: { workflow_mode: 'fast_track' } }
    }));
    const md = createBdMetadata({ runJson });
    expect(await md.readMetadata('UI-1', 'workflow_mode')).toBe('fast_track');
    expect(await md.readMetadata('UI-1', 'missing')).toBe(null);
  });

  test('readMetadata unwraps the single-item-array show shape (live bd)', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: [{ id: 'UI-1', metadata: { workflow_mode: 'fast_track' } }]
    }));
    const md = createBdMetadata({ runJson });
    expect(await md.readMetadata('UI-1', 'workflow_mode')).toBe('fast_track');
  });

  test('readMetadata throws on a non-zero bd exit instead of reading as absent', async () => {
    const runJson = vi.fn(async () => ({
      code: 1,
      stdoutJson: null,
      stderr: 'bd down'
    }));

    await expect(
      createBdMetadata({ runJson }).readMetadata('UI-1', 'pr_url')
    ).rejects.toThrow(/bd show UI-1 failed \(1\)/);
  });

  test('readMetadata throws on an unreadable payload', async () => {
    const runJson = vi.fn(async () => ({ code: 0, stdoutJson: 'nonsense' }));

    await expect(
      createBdMetadata({ runJson }).readMetadata('UI-1', 'pr_url')
    ).rejects.toThrow(/unreadable payload/);
  });

  test('readMetadata returns null only for a key that is genuinely absent', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: { id: 'UI-1', metadata: {} }
    }));

    expect(
      await createBdMetadata({ runJson }).readMetadata('UI-1', 'pr_url')
    ).toBe(null);
  });
});

describe('worker/bd-metadata readStatus fail-closed', () => {
  test('throws on a non-zero bd exit instead of reading as "no status"', async () => {
    const runJson = vi.fn(async () => ({
      code: 1,
      stdoutJson: null,
      stderr: 'bd down'
    }));

    await expect(
      createBdMetadata({ runJson }).readStatus('UI-1')
    ).rejects.toThrow(/bd show UI-1 failed \(1\)/);
  });

  test('throws on an unreadable payload', async () => {
    const runJson = vi.fn(async () => ({ code: 0, stdoutJson: 'nonsense' }));

    await expect(
      createBdMetadata({ runJson }).readStatus('UI-1')
    ).rejects.toThrow(/unreadable payload/);
  });

  test('returns the status from a readable payload', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: [{ id: 'UI-1', status: 'in_progress' }]
    }));

    expect(await createBdMetadata({ runJson }).readStatus('UI-1')).toBe(
      'in_progress'
    );
  });

  test('returns null only for an issue that carries no status', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: { id: 'UI-1' }
    }));

    expect(await createBdMetadata({ runJson }).readStatus('UI-1')).toBe(null);
  });
});

describe('worker/bd-metadata child listing (post-merge sweep)', () => {
  /**
   * @param {Record<string, any[]>} by_selector - Keyed by the selector flag.
   */
  function listRunner(by_selector) {
    return vi.fn(async (/** @type {string[]} */ args) => {
      const key = args.includes('--parent') ? 'parent' : 'metadata';
      return { code: 0, stdoutJson: by_selector[key] || [] };
    });
  }

  test('queries both the parent-child dependency and the parent metadata key', async () => {
    const runJson = listRunner({ parent: [], metadata: [] });

    await createBdMetadata({ runJson, cwd: '/repo' }).listChildren('UI-1');

    expect(runJson).toHaveBeenCalledWith(
      ['list', '--json', '--all', '--limit', '0', '--parent', 'UI-1'],
      { cwd: '/repo' }
    );
    expect(runJson).toHaveBeenCalledWith(
      [
        'list',
        '--json',
        '--all',
        '--limit',
        '0',
        '--metadata-field',
        'parent=UI-1'
      ],
      { cwd: '/repo' }
    );
  });

  test('unions both relations and dedupes a child carrying both', async () => {
    const runJson = listRunner({
      parent: [
        { id: 'UI-1.1', status: 'resolved' },
        { id: 'UI-1.2', status: 'closed' }
      ],
      metadata: [
        { id: 'UI-1.2', status: 'closed' },
        { id: 'UI-1.3', status: 'open' }
      ]
    });

    const children = await createBdMetadata({ runJson }).listChildren('UI-1');

    expect(children.map((c) => c.id)).toEqual(['UI-1.1', 'UI-1.2', 'UI-1.3']);
  });

  test('finds a child linked ONLY by the dependency, with no parent metadata', async () => {
    const runJson = listRunner({
      parent: [{ id: 'UI-1.1', status: 'open' }],
      metadata: []
    });

    const children = await createBdMetadata({ runJson }).listChildren('UI-1');

    expect(children).toEqual([{ id: 'UI-1.1', status: 'open' }]);
  });

  test('throws on a malformed payload rather than sweeping nothing', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) =>
      args.includes('--parent')
        ? { code: 0, stdoutJson: { rows: [] } }
        : { code: 0, stdoutJson: [] }
    );

    // "bd answered with something we cannot read" must not become "this bead
    // has no children" — that closes the parent over its open leaves.
    await expect(
      createBdMetadata({ runJson }).listChildren('UI-1')
    ).rejects.toThrow(/non-array payload/);
  });

  test('throws when either selector query exits non-zero', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) =>
      args.includes('--parent')
        ? { code: 0, stdoutJson: [] }
        : { code: 1, stdoutJson: null, stderr: 'boom' }
    );

    await expect(
      createBdMetadata({ runJson }).listChildren('UI-1')
    ).rejects.toThrow(/--metadata-field parent=UI-1 failed \(1\)/);
  });
});

describe('worker/bd-metadata fail-closed writes (implementation review 2026-07-22)', () => {
  test('a non-zero bd exit on set/unset THROWS instead of passing silently', async () => {
    const run = vi.fn(async () => ({ code: 1, stdout: '', stderr: 'boom' }));
    const meta = createBdMetadata({ run, cwd: '/repo' });
    await expect(
      meta.setMetadata('UI-1', 'workflow_mode', 'fast_track')
    ).rejects.toThrow(/set-metadata workflow_mode failed \(1\)/);
    await expect(meta.unsetMetadata('UI-1', 'workflow_mode')).rejects.toThrow(
      /unset-metadata workflow_mode failed \(1\)/
    );
  });
});

describe('worker/bd-metadata listResolvedPrBeads (UI-7agi §1)', () => {
  const ROWS = [
    {
      id: 'UI-1',
      status: 'resolved',
      metadata: { pr_url: 'https://github.com/o/r/pull/7' }
    },
    { id: 'UI-2', status: 'resolved', metadata: {} },
    {
      id: 'UI-3',
      status: 'open',
      metadata: { pr_url: 'https://github.com/o/r/pull/9' }
    },
    {
      id: 'UI-4',
      status: 'closed',
      metadata: { pr_url: 'https://github.com/o/r/pull/11' }
    }
  ];

  test('scans the WHOLE bd list, not the default 50-row page', async () => {
    const runJson = vi.fn(async () => ({ code: 0, stdoutJson: [] }));

    await createBdMetadata({ runJson, cwd: '/repo' }).listResolvedPrBeads();

    expect(runJson).toHaveBeenCalledWith(
      ['list', '--json', '--all', '--limit', '0'],
      { cwd: '/repo' }
    );
  });

  test('keeps only resolved beads carrying a pr_url', async () => {
    const runJson = vi.fn(async () => ({ code: 0, stdoutJson: ROWS }));

    const rows = await createBdMetadata({ runJson }).listResolvedPrBeads();

    expect(rows).toEqual([
      { bead_id: 'UI-1', pr_url: 'https://github.com/o/r/pull/7' }
    ]);
  });

  test('throws on a non-zero exit instead of reading as "no external PRs"', async () => {
    const runJson = vi.fn(async () => ({
      code: 1,
      stdoutJson: null,
      stderr: 'bd down'
    }));

    await expect(
      createBdMetadata({ runJson }).listResolvedPrBeads()
    ).rejects.toThrow(/bd list --all failed \(1\)/);
  });

  test('throws on a non-array payload', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: { id: 'UI-1' }
    }));

    await expect(
      createBdMetadata({ runJson }).listResolvedPrBeads()
    ).rejects.toThrow(/non-array payload/);
  });
});

describe('worker/bd-metadata one-write disposition update (UI-hs11)', () => {
  test('composes set, unset, status and notes into a single bd update', async () => {
    /** @type {string[][]} */
    const argv = [];
    const run = vi.fn(async (/** @type {string[]} */ args) => {
      argv.push(args);
      return { code: 0, stdout: '', stderr: '' };
    });

    await createBdMetadata({ run, cwd: '/repo' }).updateFields('UI-1', {
      set: { spec_review: 'skipped@' + 'a'.repeat(40) },
      unset: ['blocked_reason'],
      status: 'open',
      append_notes: '처분 계보'
    });

    expect(run).toHaveBeenCalledTimes(1);
    expect(argv[0]).toEqual([
      'update',
      'UI-1',
      '--set-metadata',
      'spec_review=skipped@' + 'a'.repeat(40),
      '--unset-metadata',
      'blocked_reason',
      '--status',
      'open',
      '--append-notes',
      '처분 계보'
    ]);
  });

  test('runs nothing when the input carries no field', async () => {
    const run = vi.fn();

    await createBdMetadata({ run }).updateFields('UI-1', {});

    expect(run).not.toHaveBeenCalled();
  });

  test('a non-zero exit THROWS so a half-applied disposition cannot read as done', async () => {
    const run = vi.fn(async () => ({ code: 1, stdout: '', stderr: 'boom' }));

    await expect(
      createBdMetadata({ run }).updateFields('UI-1', { status: 'open' })
    ).rejects.toThrow(/bd update UI-1 failed \(1\)/);
  });

  test('readIssue returns the whole issue and throws on an unreadable payload', async () => {
    const ok = createBdMetadata({
      runJson: async () => ({
        code: 0,
        stdoutJson: { id: 'UI-1', status: 'blocked' }
      })
    });
    const broken = createBdMetadata({
      runJson: async () => ({ code: 0, stdoutJson: 'nope' })
    });

    await expect(ok.readIssue('UI-1')).resolves.toMatchObject({
      status: 'blocked'
    });
    await expect(broken.readIssue('UI-1')).rejects.toThrow(
      /unreadable payload/
    );
  });
});

describe('worker/bd-metadata ship + label argv contract', () => {
  test('ship → bd ship <capability> --json and returns status + issue_id', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: {
        capability: 'ship-close-choreography',
        issue_id: 'UI-9',
        status: 'shipped'
      }
    }));

    const r = await createBdMetadata({ runJson, cwd: '/repo' }).ship(
      'ship-close-choreography'
    );

    expect(runJson).toHaveBeenCalledWith(
      ['ship', 'ship-close-choreography', '--json'],
      { cwd: '/repo' }
    );
    expect(r).toEqual({ status: 'shipped', issue_id: 'UI-9' });
  });

  test('ship reports already_shipped verbatim so a retry reads as idempotent', async () => {
    const runJson = async () => ({
      code: 0,
      stdoutJson: { issue_id: 'UI-9', status: 'already_shipped' }
    });

    const r = await createBdMetadata({ runJson }).ship('cap');

    expect(r).toEqual({ status: 'already_shipped', issue_id: 'UI-9' });
  });

  test('ship throws on a non-zero exit (no export: issue) instead of reading as done', async () => {
    const runJson = async () => ({
      code: 1,
      stdoutJson: null,
      stderr: 'no issue with export:cap'
    });

    await expect(createBdMetadata({ runJson }).ship('cap')).rejects.toThrow(
      /bd ship cap failed \(1\)/
    );
  });

  test('ship throws on an unreadable payload', async () => {
    const runJson = async () => ({ code: 0, stdoutJson: 'nope' });

    await expect(createBdMetadata({ runJson }).ship('cap')).rejects.toThrow(
      /unreadable payload/
    );
  });

  test('removeLabel → bd label remove <id> <label>', async () => {
    const run = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));

    await createBdMetadata({ run, cwd: '/repo' }).removeLabel(
      'UI-1',
      'export:cap'
    );

    expect(run).toHaveBeenCalledWith(
      ['label', 'remove', 'UI-1', 'export:cap'],
      { cwd: '/repo' }
    );
  });

  test('removeLabel throws on a non-zero exit', async () => {
    const run = async () => ({ code: 2, stdout: '', stderr: 'boom' });

    await expect(
      createBdMetadata({ run }).removeLabel('UI-1', 'export:cap')
    ).rejects.toThrow(/bd label remove export:cap failed \(2\)/);
  });
});
