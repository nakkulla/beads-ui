import { describe, expect, test, vi } from 'vitest';
import {
  codexRolloutDateDirs,
  codexRolloutFilePath,
  observeCodexEffort
} from './codex-effort-observer.js';

/**
 * Local `YYYY/MM/DD` for an epoch, mirroring the Codex directory layout.
 *
 * @param {number} epoch_ms
 */
function localDateDir(epoch_ms) {
  const d = new Date(epoch_ms);
  return [
    String(d.getFullYear()).padStart(4, '0'),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0')
  ].join('/');
}

const DAY = 24 * 60 * 60 * 1000;
const STARTED_AT = Date.UTC(2026, 7, 22, 12, 20, 0);
const SESSION = '01a02969-dbaf-7dd1-b483-52fac7194a24';
const ROLLOUT_NAME = `rollout-2026-08-22T21-19-58-${SESSION}.jsonl`;

describe('Codex effort observer', () => {
  test('probes the attempt date first, then the adjacent days', () => {
    const result = codexRolloutDateDirs(STARTED_AT);

    expect(result).toEqual([
      localDateDir(STARTED_AT),
      localDateDir(STARTED_AT - DAY),
      localDateDir(STARTED_AT + DAY)
    ]);
  });

  test('falls back to now when started_at is unknown', () => {
    const now = vi.fn(() => STARTED_AT);

    const result = codexRolloutDateDirs(null, { now });

    expect(result[0]).toBe(localDateDir(STARTED_AT));
    expect(now).toHaveBeenCalledTimes(1);
  });

  test('finds the rollout file by session suffix across date directories', () => {
    const readdirSync = vi.fn((dir) => {
      if (dir.endsWith(localDateDir(STARTED_AT))) {
        throw new Error('ENOENT');
      }
      if (dir.endsWith(localDateDir(STARTED_AT - DAY))) {
        return [
          'rollout-2026-08-21T23-59-00-other-session.jsonl',
          ROLLOUT_NAME
        ];
      }
      return [];
    });

    const result = codexRolloutFilePath({
      session_id: SESSION,
      started_at: STARTED_AT,
      fs: /** @type {any} */ ({ readdirSync }),
      home_dir: '/home/test'
    });

    expect(result).toBe(
      `/home/test/.codex/sessions/${localDateDir(STARTED_AT - DAY)}/${ROLLOUT_NAME}`
    );
  });

  test('returns the first turn_context effort after malformed lines', () => {
    const readdirSync = vi.fn(() => [ROLLOUT_NAME]);
    const readFileSync = vi.fn(() =>
      [
        JSON.stringify({ type: 'session_meta', payload: { effort: 'low' } }),
        '{bad json}',
        JSON.stringify({ type: 'turn_context', payload: 'not-an-object' }),
        JSON.stringify({ type: 'turn_context', payload: { effort: '' } }),
        JSON.stringify({
          type: 'turn_context',
          payload: { model: 'gpt-5.6-sol', effort: 'high' }
        }),
        JSON.stringify({ type: 'turn_context', payload: { effort: 'low' } })
      ].join('\n')
    );

    const result = observeCodexEffort({
      session_id: SESSION,
      started_at: STARTED_AT,
      fs: /** @type {any} */ ({ readdirSync, readFileSync }),
      home_dir: '/home/test'
    });

    expect(result).toBe('high');
    expect(readFileSync).toHaveBeenCalledWith(
      `/home/test/.codex/sessions/${localDateDir(STARTED_AT)}/${ROLLOUT_NAME}`,
      'utf8'
    );
  });

  test('returns null when no rollout file matches', () => {
    const readdirSync = vi.fn(() => ['rollout-2026-08-22T00-00-00-x.jsonl']);
    const readFileSync = vi.fn();

    const result = observeCodexEffort({
      session_id: SESSION,
      started_at: STARTED_AT,
      fs: /** @type {any} */ ({ readdirSync, readFileSync }),
      home_dir: '/home/test'
    });

    expect(result).toBe(null);
    expect(readFileSync).not.toHaveBeenCalled();
  });

  test('returns null when the rollout file is unreadable or lacks effort', () => {
    const readdirSync = vi.fn(() => [ROLLOUT_NAME]);
    const unreadable = vi.fn(() => {
      throw new Error('EACCES');
    });
    const no_effort = vi.fn(() =>
      JSON.stringify({ type: 'turn_context', payload: { model: 'x' } })
    );

    expect(
      observeCodexEffort({
        session_id: SESSION,
        started_at: STARTED_AT,
        fs: /** @type {any} */ ({ readdirSync, readFileSync: unreadable }),
        home_dir: '/home/test'
      })
    ).toBe(null);
    expect(
      observeCodexEffort({
        session_id: SESSION,
        started_at: STARTED_AT,
        fs: /** @type {any} */ ({ readdirSync, readFileSync: no_effort }),
        home_dir: '/home/test'
      })
    ).toBe(null);
    expect(
      observeCodexEffort({
        session_id: '',
        fs: /** @type {any} */ ({ readdirSync, readFileSync: no_effort })
      })
    ).toBe(null);
  });
});
