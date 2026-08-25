import { describe, expect, test } from 'vitest';
import { isForeignBlocker } from './blocker-scope.js';

describe('utils/blocker-scope', () => {
  test('reports a blocker from another rig as foreign', () => {
    const foreign = isForeignBlocker('UI-a1b2', 'dotfiles-j8e6');

    expect(foreign).toBe(true);
  });

  test('reports a blocker sharing the rig prefix as same-repo', () => {
    const foreign = isForeignBlocker('UI-a1b2', 'UI-c3d4');

    expect(foreign).toBe(false);
  });

  test('treats a phase child id by its rig prefix', () => {
    const foreign = isForeignBlocker('UI-a1b2.1', 'UI-c3d4');

    expect(foreign).toBe(false);
  });

  test('stays quiet when either id carries no prefix', () => {
    expect(isForeignBlocker('UI-a1b2', 'A')).toBe(false);
    expect(isForeignBlocker('A', 'dotfiles-j8e6')).toBe(false);
  });

  test('stays quiet on a non-string id', () => {
    expect(isForeignBlocker(null, 'dotfiles-j8e6')).toBe(false);
    expect(isForeignBlocker('UI-a1b2', undefined)).toBe(false);
  });
});
