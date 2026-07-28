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

describe('worker/bd-metadata readStatusAndMetadata (impl review 2026-07-28)', () => {
  test('reads status and one metadata key from a single bd show', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: [
        {
          id: 'UI-1',
          status: 'resolved',
          metadata: { pr_url: 'https://github.com/o/r/pull/7' }
        }
      ]
    }));

    const r = await createBdMetadata({ runJson }).readStatusAndMetadata(
      'UI-1',
      'pr_url'
    );

    expect(r).toEqual({
      status: 'resolved',
      value: 'https://github.com/o/r/pull/7'
    });
    expect(runJson).toHaveBeenCalledTimes(1);
  });

  test('reports an absent key as null without failing the read', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: { id: 'UI-1', status: 'open', metadata: {} }
    }));

    expect(
      await createBdMetadata({ runJson }).readStatusAndMetadata(
        'UI-1',
        'pr_url'
      )
    ).toEqual({ status: 'open', value: null });
  });

  test('throws on a non-zero exit rather than reporting a null pair', async () => {
    const runJson = vi.fn(async () => ({
      code: 1,
      stdoutJson: null,
      stderr: 'bd down'
    }));

    await expect(
      createBdMetadata({ runJson }).readStatusAndMetadata('UI-1', 'pr_url')
    ).rejects.toThrow(/bd show UI-1 failed \(1\)/);
  });
});
