import { describe, expect, test, vi } from 'vitest';
import { scopeAtBase } from './scope-at-base.js';

/**
 * @param {string[]} lines
 */
function frontMatter(lines) {
  return [
    '---',
    'scope:',
    ...lines.map((line) => `  - ${line}`),
    '---',
    ''
  ].join('\n');
}

describe('scopeAtBase', () => {
  test('unions declared prefixes across artifacts, sorted and deduped', async () => {
    const gitRun = vi.fn(async (/** @type {string[]} */ args) => ({
      code: 0,
      stdout: args[2].endsWith('spec.md')
        ? frontMatter(['server/worker/b.js', 'app/a.js'])
        : frontMatter(['app/a.js'])
    }));

    const scope = await scopeAtBase(gitRun, 'a'.repeat(40), [
      'docs/spec.md',
      'docs/plan.md'
    ]);

    expect(scope).toEqual(['app/a.js', 'server/worker/b.js']);
    expect(gitRun).toHaveBeenCalledWith([
      'cat-file',
      'blob',
      `${'a'.repeat(40)}:docs/spec.md`
    ]);
  });

  test('skips an unreadable artifact by default', async () => {
    const gitRun = vi.fn(async (/** @type {string[]} */ args) =>
      args[2].endsWith('plan.md')
        ? { code: 128, stdout: '' }
        : { code: 0, stdout: frontMatter(['app/a.js']) }
    );

    const scope = await scopeAtBase(gitRun, 'b'.repeat(40), [
      'docs/spec.md',
      'docs/plan.md'
    ]);

    expect(scope).toEqual(['app/a.js']);
  });

  test('collapses to null when a read fails under fail_on_read_error', async () => {
    const gitRun = vi.fn(async () => ({ code: 128, stdout: '' }));

    const scope = await scopeAtBase(
      gitRun,
      'c'.repeat(40),
      ['docs/spec.md'],
      true
    );

    expect(scope).toBeNull();
  });
});
