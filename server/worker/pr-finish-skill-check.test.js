import path from 'node:path';
import { describe, expect, test, vi } from 'vitest';
import { checkPrFinishSkill } from './pr-finish-skill-check.js';

describe('pr-finish skill check', () => {
  test('finds pr-finish skill under CODEX_HOME', () => {
    const exists_impl = vi.fn(
      (file_path) =>
        file_path ===
        path.join('/codex-home', 'skills', 'pr-finish', 'SKILL.md')
    );

    const result = checkPrFinishSkill({
      env: { CODEX_HOME: '/codex-home' },
      home_dir: '/home/user',
      exists_impl
    });

    expect(result.available).toBe(true);
    expect(result.path).toBe(
      path.join('/codex-home', 'skills', 'pr-finish', 'SKILL.md')
    );
  });

  test('reports unavailable when known locations are missing', () => {
    const result = checkPrFinishSkill({
      env: {},
      home_dir: '/home/user',
      exists_impl: () => false
    });

    expect(result.available).toBe(false);
    expect(
      result.checked.some((file_path) => file_path.includes('pr-finish'))
    ).toBe(true);
  });
});
