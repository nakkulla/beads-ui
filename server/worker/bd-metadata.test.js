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
