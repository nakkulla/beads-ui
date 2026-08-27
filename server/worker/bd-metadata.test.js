import { describe, expect, test, vi } from 'vitest';
import { normalizeBdIssue, normalizeBdIssueList } from '../bd-json.js';
import { createBdMetadata as createBdMetadataModule } from './bd-metadata.js';
import { RECEIPT_METADATA_KEYS } from './receipt-check.js';

/**
 * Adapt a transport-shaped `bd --json` fake to the projected runner contract.
 *
 * The fakes below describe what bd prints — including the single-item-array
 * `show` shape live bd emits — so they run through the SAME projectors
 * production uses instead of hand-rolling the post-projection value.
 *
 * @param {(args: string[], options?: any) => Promise<any>} fake
 * @returns {any}
 */
function asProjected(fake) {
  return async (
    /** @type {string} */ command_family,
    /** @type {string[]} */ args,
    /** @type {any} */ options = {}
  ) => {
    const raw = await fake(args, options);
    if (!raw || raw.code !== 0) {
      return {
        ok: false,
        error: {
          code: 'bd_exit_error',
          message: String((raw && raw.stderr) || 'bd failed')
        }
      };
    }
    const projected =
      command_family === 'show'
        ? normalizeBdIssue(raw.stdoutJson, { expected_id: options.expected_id })
        : normalizeBdIssueList(raw.stdoutJson);
    if (!projected.ok) {
      return projected;
    }
    return {
      ok: true,
      protocol: { format: 'bare', schema_version: null },
      data: projected.data
    };
  };
}

/**
 * @param {any} [deps]
 */
function createBdMetadata(deps = {}) {
  return createBdMetadataModule({
    // The effect gate is exercised by its own tests below; every other test
    // states an open gate explicitly rather than reaching the live bd.
    requireCapability: async () => ({ ok: true }),
    ...deps,
    ...(deps.runJson ? { runJson: asProjected(deps.runJson) } : {})
  });
}

describe('worker/bd-metadata argv contract', () => {
  test('deletes exact explicit IDs with force and without cascade', async () => {
    const run = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));

    await createBdMetadata({ run, cwd: '/repo' }).deleteIssues([
      'UI-1.1',
      'UI-1.2'
    ]);

    expect(run).toHaveBeenCalledWith(
      ['delete', 'UI-1.1', 'UI-1.2', '--force'],
      { cwd: '/repo' }
    );
  });

  test('rejects empty or duplicate issue IDs before delete', async () => {
    const run = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const metadata = createBdMetadata({ run });

    await expect(metadata.deleteIssues([])).rejects.toThrow(/non-empty/);
    await expect(metadata.deleteIssues(['UI-1.1', 'UI-1.1'])).rejects.toThrow(
      /duplicate/
    );

    expect(run).not.toHaveBeenCalled();
  });

  test('rejects option-like issue IDs before delete', async () => {
    const run = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const metadata = createBdMetadata({ run });

    await expect(metadata.deleteIssues(['--cascade'])).rejects.toThrow(
      /explicit/
    );

    expect(run).not.toHaveBeenCalled();
  });

  test('throws when exact batch delete exits non-zero', async () => {
    const run = vi.fn(async () => ({ code: 1, stdout: '', stderr: 'blocked' }));

    await expect(
      createBdMetadata({ run }).deleteIssues(['UI-1.1'])
    ).rejects.toThrow(/bd delete UI-1.1 failed \(1\)/);
  });

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
    ).rejects.toThrow(/bd show UI-1 failed \(bd_exit_error\)/);
  });

  test('readMetadata throws on an unreadable payload', async () => {
    const runJson = vi.fn(async () => ({ code: 0, stdoutJson: 'nonsense' }));

    await expect(
      createBdMetadata({ runJson }).readMetadata('UI-1', 'pr_url')
    ).rejects.toThrow(/bd_json_shape_invalid/);
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
    ).rejects.toThrow(/bd show UI-1 failed \(bd_exit_error\)/);
  });

  test('throws on an unreadable payload', async () => {
    const runJson = vi.fn(async () => ({ code: 0, stdoutJson: 'nonsense' }));

    await expect(
      createBdMetadata({ runJson }).readStatus('UI-1')
    ).rejects.toThrow(/bd_json_shape_invalid/);
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

describe('worker/bd-metadata repair issue operations', () => {
  test('findIssue distinguishes exact-id absence structurally', async () => {
    const runJson = vi.fn(async () => ({ code: 0, stdoutJson: [] }));

    const result = await createBdMetadata({ runJson, cwd: '/repo' }).findIssue(
      'UI-1-rdeadbeef'
    );

    expect(result).toBeNull();
    expect(runJson).toHaveBeenCalledWith(
      ['list', '--json', '--all', '--limit', '0', '--id', 'UI-1-rdeadbeef'],
      { cwd: '/repo' }
    );
  });

  test('createIssue sends the deterministic id and discovered-from dependency', async () => {
    const run = vi.fn(async () => ({ code: 0, stdout: '{}', stderr: '' }));

    await createBdMetadata({ run }).createIssue({
      id: 'UI-1-rdeadbeef',
      title: 'UI-1 자동머지 실패 복구',
      description: '설명',
      type: 'bug',
      priority: 1,
      dependency: 'discovered-from:UI-1'
    });

    expect(run).toHaveBeenCalledWith(
      [
        'create',
        '--id',
        'UI-1-rdeadbeef',
        '--title',
        'UI-1 자동머지 실패 복구',
        '--description',
        '설명',
        '--type',
        'bug',
        '--priority',
        '1',
        '--deps',
        'discovered-from:UI-1',
        '--json'
      ],
      undefined
    );
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
    ).rejects.toThrow(/bd_json_shape_invalid/);
  });

  test('throws when either selector query exits non-zero', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) =>
      args.includes('--parent')
        ? { code: 0, stdoutJson: [] }
        : { code: 1, stdoutJson: null, stderr: 'boom' }
    );

    await expect(
      createBdMetadata({ runJson }).listChildren('UI-1')
    ).rejects.toThrow(/--metadata-field parent=UI-1 failed \(bd_exit_error\)/);
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

describe('worker/bd-metadata scanBeads (UI-7agi §1, UI-m6bg)', () => {
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

  test('reuses a fresh shared snapshot without another whole-list scan', async () => {
    const requestSnapshot = vi.fn(async () => ({
      ok: true,
      stale: false,
      fresh: true,
      snapshot: { generation: 7, all: ROWS }
    }));
    const runJson = vi.fn(async () => {
      throw new Error('whole-list scan must not run');
    });

    const result = await createBdMetadata({
      cwd: '/repo',
      runJson,
      requestSnapshot
    }).scanBeads();

    expect(requestSnapshot).toHaveBeenCalledWith('/repo', 'worker-external');
    expect(runJson).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      generation: 7,
      fresh: true,
      pr_rows: [{ bead_id: 'UI-1', pr_url: 'https://github.com/o/r/pull/7' }],
      statuses: { 'UI-4': 'closed' }
    });
  });

  test('scans the WHOLE bd list, not the default 50-row page', async () => {
    const runJson = vi.fn(async () => ({ code: 0, stdoutJson: [] }));

    await createBdMetadata({ runJson, cwd: '/repo' }).scanBeads();

    expect(runJson).toHaveBeenCalledWith(
      ['list', '--json', '--all', '--limit', '0'],
      { cwd: '/repo' }
    );
  });

  test('serves both consumers from exactly one bd process', async () => {
    const runJson = vi.fn(async () => ({ code: 0, stdoutJson: ROWS }));

    const { pr_rows, statuses } = await createBdMetadata({
      runJson
    }).scanBeads();

    expect(runJson).toHaveBeenCalledTimes(1);
    expect(pr_rows.length).toBe(1);
    expect(Object.keys(statuses).length).toBe(4);
  });

  test('keeps only resolved beads carrying a pr_url', async () => {
    const runJson = vi.fn(async () => ({ code: 0, stdoutJson: ROWS }));

    const { pr_rows } = await createBdMetadata({ runJson }).scanBeads();

    expect(pr_rows).toEqual([
      { bead_id: 'UI-1', pr_url: 'https://github.com/o/r/pull/7', metadata: {} }
    ]);
  });

  test('projects every receipt metadata key onto the scanned row', async () => {
    const metadata = Object.fromEntries([
      ['pr_url', 'https://github.com/o/r/pull/7'],
      ...RECEIPT_METADATA_KEYS.map((key) => [key, `v-${key}`])
    ]);
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: [{ id: 'UI-1', status: 'resolved', metadata }]
    }));

    const { pr_rows } = await createBdMetadata({ runJson }).scanBeads();

    expect(pr_rows[0].metadata).toEqual(
      Object.fromEntries(RECEIPT_METADATA_KEYS.map((key) => [key, `v-${key}`]))
    );
  });

  test('omits a receipt key the bead does not carry', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: [
        {
          id: 'UI-1',
          status: 'resolved',
          metadata: {
            pr_url: 'https://github.com/o/r/pull/7',
            route: 'quick_fix'
          }
        }
      ]
    }));

    const { pr_rows } = await createBdMetadata({ runJson }).scanBeads();

    expect(pr_rows[0].metadata).toEqual({ route: 'quick_fix' });
  });

  test('drops a receipt key whose value is not a string', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: [
        {
          id: 'UI-1',
          status: 'resolved',
          metadata: {
            pr_url: 'https://github.com/o/r/pull/7',
            route: 7,
            unit_plan: 'server-overlay'
          }
        }
      ]
    }));

    const { pr_rows } = await createBdMetadata({ runJson }).scanBeads();

    expect(pr_rows[0].metadata).toEqual({ unit_plan: 'server-overlay' });
  });

  test('maps every row status, including the non-resolved ones', async () => {
    const runJson = vi.fn(async () => ({ code: 0, stdoutJson: ROWS }));

    const { statuses } = await createBdMetadata({ runJson }).scanBeads();

    expect(statuses).toEqual({
      'UI-1': 'resolved',
      'UI-2': 'resolved',
      'UI-3': 'open',
      'UI-4': 'closed'
    });
  });

  test('omits a row with no readable status from the status map', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: [{ id: 'UI-9' }, { id: 'UI-8', status: '' }]
    }));

    const { statuses } = await createBdMetadata({ runJson }).scanBeads();

    expect(statuses).toEqual({});
  });

  test('throws on a non-zero exit instead of reading as "no external PRs"', async () => {
    const runJson = vi.fn(async () => ({
      code: 1,
      stdoutJson: null,
      stderr: 'bd down'
    }));

    await expect(createBdMetadata({ runJson }).scanBeads()).rejects.toThrow(
      /bd list --all failed \(bd_exit_error\)/
    );
  });

  test('throws on a non-array payload', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: { id: 'UI-1' }
    }));

    await expect(createBdMetadata({ runJson }).scanBeads()).rejects.toThrow(
      /bd_json_shape_invalid/
    );
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
      /bd_json_shape_invalid/
    );
  });
});

describe('bd write effect gate', () => {
  test('refuses a write while the workspace protocol gate is red', async () => {
    const run = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const md = createBdMetadata({
      run,
      requireCapability: async () => ({
        ok: false,
        error: { code: 'bd_json_shape_invalid', message: 'bad shape' }
      })
    });

    await expect(md.setMetadata('UI-1', 'route', 'full_plan')).rejects.toThrow(
      /bd write refused: bd_json_shape_invalid/
    );
    expect(run).not.toHaveBeenCalled();
  });

  test('refuses every mutator, not just the first one', async () => {
    const run = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const md = createBdMetadata({
      run,
      requireCapability: async () => ({
        ok: false,
        error: { code: 'bd_workspace_identity_unresolved', message: 'no id' }
      })
    });

    await expect(md.unsetMetadata('UI-1', 'route')).rejects.toThrow(/refused/);
    await expect(md.setStatus('UI-1', 'closed')).rejects.toThrow(/refused/);
    await expect(md.updateFields('UI-1', { status: 'open' })).rejects.toThrow(
      /refused/
    );
    expect(run).not.toHaveBeenCalled();
  });

  test('lets a write through once the gate is green', async () => {
    const run = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const md = createBdMetadata({ run });

    await md.setMetadata('UI-1', 'route', 'full_plan');

    expect(run).toHaveBeenCalledTimes(1);
  });
});
