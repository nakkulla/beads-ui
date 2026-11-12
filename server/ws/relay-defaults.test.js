import { describe, expect, test, vi } from 'vitest';
import { relayDefaults } from '../relay-defaults.js';

const SNAPSHOT = {
  ok: true,
  revision: 0,
  overrides: {},
  effective: { 'claude.model': 'opus', 'claude.effort': 'high' },
  allowed: { 'codex.speed': ['default', 'fast'] }
};

describe('relay defaults CLI', () => {
  test('reads the hub snapshot', async () => {
    const run = vi.fn().mockResolvedValue(JSON.stringify(SNAPSHOT));

    const result = await relayDefaults(null, run);

    expect(run).toHaveBeenCalledExactlyOnceWith([]);
    expect(result).toEqual({ ok: true, snapshot: SNAPSHOT });
  });

  test('saves assignments and unsets with the expected revision', async () => {
    const run = vi.fn().mockResolvedValue(JSON.stringify(SNAPSHOT));

    await relayDefaults(
      {
        expected_revision: 2,
        values: {
          'codex.model': 'gpt-6.1-sol',
          'claude.model': null,
          'codex.speed': 'fast',
          'claude.effort': null
        }
      },
      run
    );

    expect(run).toHaveBeenCalledExactlyOnceWith([
      'set',
      'codex.model=gpt-6.1-sol',
      'codex.speed=fast',
      '--unset',
      'claude.model',
      'claude.effort',
      '--revision',
      '2'
    ]);
  });

  test.each(['conflict', 'invalid_value'])(
    'preserves %s and reads the current snapshot',
    async (code) => {
      const run = vi
        .fn()
        .mockRejectedValueOnce({
          stdout: JSON.stringify({ ok: false, code, reason: 'refused' })
        })
        .mockResolvedValueOnce(JSON.stringify(SNAPSHOT));

      const result = await relayDefaults(
        { expected_revision: 0, values: { 'codex.speed': 'bad' } },
        run
      );

      expect(result).toEqual({
        ok: false,
        code,
        message: 'refused',
        snapshot: SNAPSHOT
      });
      expect(run).toHaveBeenLastCalledWith([]);
    }
  );

  test.each([
    {},
    { revision: 0 },
    { ...SNAPSHOT, revision: -1 },
    { ...SNAPSHOT, allowed: [] }
  ])('rejects malformed output %j', async (output) => {
    const run = vi.fn().mockResolvedValue(JSON.stringify(output));

    const result = await relayDefaults(null, run);

    expect(result).toMatchObject({ ok: false, code: 'hub_unavailable' });
  });

  test('reports a missing CLI without a local fallback', async () => {
    const run = vi.fn().mockRejectedValue({ code: 'ENOENT' });

    const result = await relayDefaults(null, run);

    expect(result).toMatchObject({ ok: false, code: 'hub_unavailable' });
  });

  test.each([
    { expected_revision: '0', values: {} },
    { expected_revision: 0, values: [] },
    { expected_revision: 0, values: { '--help': 'x' } },
    { expected_revision: 0, values: { 'codex.speed': false } }
  ])('refuses malformed requests before launch %j', async (input) => {
    const run = vi.fn();

    const result = await relayDefaults(/** @type {any} */ (input), run);

    expect(result).toMatchObject({ ok: false, code: 'bad_request' });
    expect(run).not.toHaveBeenCalled();
  });
});
