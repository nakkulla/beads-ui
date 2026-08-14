import { describe, expect, test } from 'vitest';
import { decorateQueue } from '../ws/worker-handlers.js';

describe('RepoOperation protocol boundary', () => {
  test('keeps repo operation internals off the public queue payload', () => {
    const decorated = decorateQueue('/workspace', {
      revision: 1,
      queue: [],
      pr_wait: [],
      done: [],
      attempts: {},
      auto_repair: true,
      repo_operations: { 'op-1': { state: 'running' } }
    });

    expect(decorated).not.toHaveProperty('auto_repair');
    expect(decorated).not.toHaveProperty('repo_operations');
  });
});
