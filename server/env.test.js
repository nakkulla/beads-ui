import { describe, expect, test } from 'vitest';
import { buildSpawnPath } from './env.js';

describe('buildSpawnPath', () => {
  test('prepends homebrew defaults when missing', () => {
    const result = buildSpawnPath('/usr/bin:/bin');

    expect(result.split(':').slice(0, 4)).toEqual([
      '/opt/homebrew/bin',
      '/usr/local/bin',
      '/usr/bin',
      '/bin'
    ]);
  });

  test('dedupes duplicate path entries while preserving order', () => {
    const result = buildSpawnPath('/opt/homebrew/bin:/usr/bin:/opt/homebrew/bin');

    expect(result.split(':')).toEqual([
      '/opt/homebrew/bin',
      '/usr/local/bin',
      '/usr/bin'
    ]);
  });
});
