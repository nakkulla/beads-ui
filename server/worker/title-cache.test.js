import { describe, expect, test, vi } from 'vitest';
import { createTitleCache } from './title-cache.js';

/**
 * A `runBdJson` stub that answers `bd show <id> --json` from a fixture map. An
 * id absent from the map exits non-zero, which is the "cannot read this bead"
 * failure the cache negative-caches.
 *
 * @param {Record<string, string | { title: string, labels?: unknown, dependencies?: unknown, spec_id?: unknown, metadata?: unknown }>} titles
 * @param {{ deferred?: boolean }} [options]
 */
function fakeBd(titles, options = {}) {
  /** @type {Array<() => void>} */
  const pending = [];
  /** @type {Array<Promise<unknown>>} */
  const calls = [];
  const runJson = vi.fn(
    (/** @type {string} */ _family, /** @type {string[]} */ args) => {
      const p = new Promise((resolve) => {
        const bead_id = args[1];
        const bead = titles[bead_id];
        const answer = () => {
          if (
            typeof bead !== 'string' &&
            (!bead || typeof bead.title !== 'string')
          ) {
            resolve({
              ok: false,
              error: { code: 'bd_exit_error', message: 'not found' }
            });
            return;
          }
          resolve({
            ok: true,
            protocol: { format: 'bare', schema_version: null },
            data:
              typeof bead === 'string'
                ? { id: bead_id, title: bead }
                : { id: bead_id, ...bead }
          });
        };
        if (options.deferred) {
          pending.push(answer);
        } else {
          answer();
        }
      });
      calls.push(p);
      return p;
    }
  );
  return {
    runJson,
    release() {
      for (const fn of pending.splice(0)) {
        fn();
      }
    },
    /**
     * Wait until every issued lookup has resolved AND the cache's own
     * continuations after it have run, so the in-flight mark is released and
     * only the cache's own bookkeeping decides the next call.
     */
    async settled() {
      await Promise.allSettled(calls);
      for (let i = 0; i < 10; i += 1) {
        await Promise.resolve();
      }
    }
  };
}

describe('worker title cache (UI-12k6)', () => {
  test('returns normalized labels from the title cache fill', async () => {
    const bd = fakeBd({
      'UI-1': { title: '첫 제목', labels: ['worker-serial', 3, 'frontend'] }
    });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });

    expect(cache.labelsFor('/ws', ['UI-1'])).toEqual({});

    await vi.waitFor(() =>
      expect(cache.labelsFor('/ws', ['UI-1'])).toEqual({
        'UI-1': ['worker-serial', 'frontend']
      })
    );
  });

  // A closed blocker no longer blocks (UI-eey2 §10): `bd ready` ignores it, so
  // the chip/warning projection drops it at the source. A foreign dependency
  // (no `status` on the edge) stays — the monitor resolves its status.
  test('drops a closed blocks dependency from blocked_by and keeps the rest', async () => {
    const bd = fakeBd({
      'UI-3': {
        title: '후속',
        dependencies: [
          { id: 'UI-1', dependency_type: 'blocks', status: 'closed' },
          { id: 'UI-2', dependency_type: 'blocks', status: 'open' },
          { id: 'dotfiles-9', dependency_type: 'blocks' },
          { id: 'UI-8', dependency_type: 'related', status: 'open' }
        ]
      }
    });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });

    cache.blockedByFor('/ws', ['UI-3']);

    await vi.waitFor(() =>
      expect(cache.blockedByFor('/ws', ['UI-3'])).toEqual({
        'UI-3': ['UI-2', 'dotfiles-9']
      })
    );
  });

  test('keeps an unreadable label projection absent', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });

    cache.labelsFor('/ws', ['UI-1', 'UI-2']);

    await vi.waitFor(() =>
      expect(cache.labelsFor('/ws', ['UI-1', 'UI-2'])).toEqual({
        'UI-1': []
      })
    );
  });

  test('keeps a readback refresh when an older lookup finishes later', async () => {
    /** @type {(value: unknown) => void} */
    let release = () => {};
    const runJson = vi.fn(
      () =>
        new Promise((resolve) => {
          release = resolve;
        })
    );
    const cache = createTitleCache({ runJson: /** @type {any} */ (runJson) });

    cache.labelsFor('/ws', ['UI-1']);
    await vi.waitFor(() => expect(runJson).toHaveBeenCalledTimes(1));
    cache.refreshFromIssue('/ws', {
      id: 'UI-1',
      title: '새 제목',
      labels: ['worker-serial']
    });
    release({
      code: 0,
      stdoutJson: [{ id: 'UI-1', title: '오래된 제목', labels: [] }]
    });

    await vi.waitFor(() =>
      expect(cache.labelsFor('/ws', ['UI-1'])).toEqual({
        'UI-1': ['worker-serial']
      })
    );
    expect(cache.titlesFor('/ws', ['UI-1'])).toEqual({ 'UI-1': '새 제목' });
  });

  test('returns nothing on a cold miss and fills asynchronously', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });

    const first = cache.titlesFor('/ws', ['UI-1']);

    expect(first).toEqual({});
    await vi.waitFor(() => expect(bd.runJson).toHaveBeenCalledTimes(1));
    await vi.waitFor(() =>
      expect(cache.titlesFor('/ws', ['UI-1'])).toEqual({ 'UI-1': '첫 제목' })
    );
  });

  test('calls the filled callback once per fill batch', async () => {
    const bd = fakeBd({ 'UI-1': '제목 1', 'UI-2': '제목 2' });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });
    const onFilled = vi.fn();
    cache.setOnFilled(onFilled);

    cache.titlesFor('/ws', ['UI-1', 'UI-2']);

    await vi.waitFor(() => expect(onFilled).toHaveBeenCalledTimes(1));
    expect(onFilled).toHaveBeenCalledWith('/ws');
    expect(cache.titlesFor('/ws', ['UI-1', 'UI-2'])).toEqual({
      'UI-1': '제목 1',
      'UI-2': '제목 2'
    });
  });

  test('does not call the filled callback when nothing lands', async () => {
    const bd = fakeBd({});
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });
    const onFilled = vi.fn();
    cache.setOnFilled(onFilled);

    cache.titlesFor('/ws', ['UI-1']);

    await vi.waitFor(() => expect(bd.runJson).toHaveBeenCalledTimes(1));
    expect(onFilled).not.toHaveBeenCalled();
  });

  test('suppresses re-lookup of a failed id until the negative TTL expires', async () => {
    let clock = 1000;
    const bd = fakeBd({});
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson),
      negative_ttl_ms: 500,
      now: () => clock
    });

    cache.titlesFor('/ws', ['UI-1']);
    await bd.settled();
    cache.titlesFor('/ws', ['UI-1']);
    cache.titlesFor('/ws', ['UI-1']);

    expect(bd.runJson).toHaveBeenCalledTimes(1);
  });

  test('retries a failed id once the negative TTL expires', async () => {
    let clock = 1000;
    const bd = fakeBd({});
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson),
      negative_ttl_ms: 500,
      now: () => clock
    });

    cache.titlesFor('/ws', ['UI-1']);
    await bd.settled();
    clock = 2000;
    cache.titlesFor('/ws', ['UI-1']);

    expect(bd.runJson).toHaveBeenCalledTimes(2);
  });

  test('collapses concurrent lookups of the same id into one bd call', async () => {
    const bd = fakeBd({ 'UI-1': '한 번만' }, { deferred: true });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });

    cache.titlesFor('/ws', ['UI-1']);
    await vi.waitFor(() => expect(bd.runJson).toHaveBeenCalledTimes(1));
    cache.titlesFor('/ws', ['UI-1']);
    cache.titlesFor('/ws', ['UI-1']);
    bd.release();

    await vi.waitFor(() =>
      expect(cache.titlesFor('/ws', ['UI-1'])).toEqual({ 'UI-1': '한 번만' })
    );
    expect(bd.runJson).toHaveBeenCalledTimes(1);
  });

  test('keys workspaces separately after path resolution', async () => {
    const bd = fakeBd({ 'UI-1': '제목' });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });

    cache.titlesFor('/ws/a', ['UI-1']);
    await vi.waitFor(() =>
      expect(cache.titlesFor('/ws/a/', ['UI-1'])).toEqual({ 'UI-1': '제목' })
    );

    expect(cache.titlesFor('/ws/b', ['UI-1'])).toEqual({});
  });

  test('ignores an empty title as unreadable', async () => {
    const bd = fakeBd({ 'UI-1': '' });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });
    const onFilled = vi.fn();
    cache.setOnFilled(onFilled);

    cache.titlesFor('/ws', ['UI-1']);

    await vi.waitFor(() => expect(bd.runJson).toHaveBeenCalledTimes(1));
    expect(cache.titlesFor('/ws', ['UI-1'])).toEqual({});
    expect(onFilled).not.toHaveBeenCalled();
  });
});

describe('worker title cache — ensureTitle (UI-vb0t)', () => {
  test('resolves a cold miss by filling it instead of omitting it', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });

    const title = await cache.ensureTitle('/ws', 'UI-1');

    expect(title).toBe('첫 제목');
    expect(bd.runJson).toHaveBeenCalledTimes(1);
  });

  test('answers a cache hit without touching bd', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });

    await cache.ensureTitle('/ws', 'UI-1');
    const again = await cache.ensureTitle('/ws', 'UI-1');

    expect(again).toBe('첫 제목');
    expect(bd.runJson).toHaveBeenCalledTimes(1);
  });

  test('returns null for an unreadable bead', async () => {
    const bd = fakeBd({});
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });

    const title = await cache.ensureTitle('/ws', 'UI-1');

    expect(title).toBeNull();
  });

  test('returns null without re-running bd inside the negative TTL', async () => {
    const bd = fakeBd({});
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson),
      negative_ttl_ms: 500,
      now: () => 1000
    });

    await cache.ensureTitle('/ws', 'UI-1');
    const again = await cache.ensureTitle('/ws', 'UI-1');

    expect(again).toBeNull();
    expect(bd.runJson).toHaveBeenCalledTimes(1);
  });

  test('retries once the negative TTL expires', async () => {
    let clock = 1000;
    const bd = fakeBd({});
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson),
      negative_ttl_ms: 500,
      now: () => clock
    });

    await cache.ensureTitle('/ws', 'UI-1');
    clock = 2000;
    await cache.ensureTitle('/ws', 'UI-1');

    expect(bd.runJson).toHaveBeenCalledTimes(2);
  });

  test('shares one bd call with a snapshot lookup already in flight', async () => {
    const bd = fakeBd({ 'UI-1': '한 번만' }, { deferred: true });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });

    cache.titlesFor('/ws', ['UI-1']);
    const pending = cache.ensureTitle('/ws', 'UI-1');
    bd.release();

    expect(await pending).toBe('한 번만');
    expect(bd.runJson).toHaveBeenCalledTimes(1);
  });

  test('collapses concurrent ensureTitle calls into one bd call', async () => {
    const bd = fakeBd({ 'UI-1': '한 번만' }, { deferred: true });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });

    const both = Promise.all([
      cache.ensureTitle('/ws', 'UI-1'),
      cache.ensureTitle('/ws', 'UI-1')
    ]);
    await vi.waitFor(() => expect(bd.runJson).toHaveBeenCalledTimes(1));
    bd.release();

    expect(await both).toEqual(['한 번만', '한 번만']);
    expect(bd.runJson).toHaveBeenCalledTimes(1);
  });

  test('fans out once when it joins a snapshot lookup already in flight', async () => {
    const bd = fakeBd({ 'UI-1': '한 번만' }, { deferred: true });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });
    const onFilled = vi.fn();
    cache.setOnFilled(onFilled);

    cache.titlesFor('/ws', ['UI-1']);
    const pending = cache.ensureTitle('/ws', 'UI-1');
    bd.release();
    await pending;
    await bd.settled();

    expect(onFilled).toHaveBeenCalledTimes(1);
  });

  test('fans out once for concurrent ensureTitle callers', async () => {
    const bd = fakeBd({ 'UI-1': '한 번만' }, { deferred: true });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });
    const onFilled = vi.fn();
    cache.setOnFilled(onFilled);

    const both = Promise.all([
      cache.ensureTitle('/ws', 'UI-1'),
      cache.ensureTitle('/ws', 'UI-1')
    ]);
    await vi.waitFor(() => expect(bd.runJson).toHaveBeenCalledTimes(1));
    bd.release();
    await both;

    expect(onFilled).toHaveBeenCalledTimes(1);
  });

  test('feeds a title it warmed to the snapshot fanout', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });
    const onFilled = vi.fn();
    cache.setOnFilled(onFilled);

    await cache.ensureTitle('/ws', 'UI-1');

    expect(onFilled).toHaveBeenCalledWith('/ws');
    expect(cache.titlesFor('/ws', ['UI-1'])).toEqual({ 'UI-1': '첫 제목' });
  });

  test('returns null for an empty bead id without running bd', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson)
    });

    const title = await cache.ensureTitle('/ws', '');

    expect(title).toBeNull();
    expect(bd.runJson).not.toHaveBeenCalled();
  });
});

describe('bead timestamps + positive TTL (UI-d7pw §4.3/§4.4)', () => {
  /**
   * A `bd show` stub answering full bead records, with a mutable payload so a
   * refresh can observe a changed `updated_at`.
   *
   * @param {Record<string, any>} beads
   */
  function fakeBeads(beads) {
    const runJson = vi.fn(
      (/** @type {string} */ _family, /** @type {string[]} */ args) => {
        const bead_id = args[1];
        const bead = beads[bead_id];
        if (!bead) {
          return Promise.resolve({
            ok: false,
            error: { code: 'bd_exit_error', message: 'not found' }
          });
        }
        return Promise.resolve({
          ok: true,
          protocol: { format: 'bare', schema_version: null },
          data: { id: bead_id, ...bead }
        });
      }
    );
    return runJson;
  }

  test('carries created_at and updated_at alongside the title', async () => {
    const runJson = fakeBeads({
      'UI-1': { title: 't', created_at: 100, updated_at: 200 }
    });
    const cache = createTitleCache({ runJson: /** @type {any} */ (runJson) });

    cache.titlesFor('/ws', ['UI-1']);
    await cache.ensureTitle('/ws', 'UI-1');

    expect(cache.timesFor('/ws', ['UI-1'])).toEqual({
      'UI-1': { created_at: 100, updated_at: 200 }
    });
  });

  test('omits a cold miss from timesFor', () => {
    const cache = createTitleCache({
      runJson: /** @type {any} */ (fakeBeads({}))
    });

    expect(cache.timesFor('/ws', ['UI-1'])).toEqual({});
  });

  test('costs one bd call for the title and the timestamps together', async () => {
    const runJson = fakeBeads({
      'UI-1': { title: 't', created_at: 1, updated_at: 2 }
    });
    const cache = createTitleCache({ runJson: /** @type {any} */ (runJson) });

    await cache.ensureTitle('/ws', 'UI-1');
    cache.titlesFor('/ws', ['UI-1']);
    cache.timesFor('/ws', ['UI-1']);

    expect(runJson).toHaveBeenCalledTimes(1);
  });

  test('serves a fresh hit without re-reading bd', async () => {
    let clock = 1000;
    const runJson = fakeBeads({
      'UI-1': { title: 't', created_at: 1, updated_at: 2 }
    });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (runJson),
      now: () => clock
    });

    await cache.ensureTitle('/ws', 'UI-1');
    clock += 60_000;
    cache.titlesFor('/ws', ['UI-1']);

    expect(runJson).toHaveBeenCalledTimes(1);
  });

  test('serves the stale value AND refreshes on an expired hit', async () => {
    let clock = 1000;
    const beads = {
      'UI-1': { title: 'old', created_at: 1, updated_at: 2 }
    };
    const runJson = fakeBeads(beads);
    const cache = createTitleCache({
      runJson: /** @type {any} */ (runJson),
      now: () => clock
    });
    await cache.ensureTitle('/ws', 'UI-1');
    beads['UI-1'] = { title: 'new', created_at: 1, updated_at: 9 };
    clock += 6 * 60_000;

    const served = cache.titlesFor('/ws', ['UI-1']);
    await vi.waitFor(() =>
      expect(cache.timesFor('/ws', ['UI-1'])).toEqual({
        'UI-1': { created_at: 1, updated_at: 9 }
      })
    );

    expect(served).toEqual({ 'UI-1': 'old' });
  });

  test('keeps the stale value when the refresh fails', async () => {
    let clock = 1000;
    /** @type {Record<string, any>} */
    const beads = { 'UI-1': { title: 'old', created_at: 1, updated_at: 2 } };
    const runJson = fakeBeads(beads);
    const cache = createTitleCache({
      runJson: /** @type {any} */ (runJson),
      now: () => clock
    });
    await cache.ensureTitle('/ws', 'UI-1');
    delete beads['UI-1'];
    clock += 6 * 60_000;

    cache.titlesFor('/ws', ['UI-1']);
    await vi.waitFor(() => expect(runJson).toHaveBeenCalledTimes(2));

    expect(cache.titlesFor('/ws', ['UI-1'])).toEqual({ 'UI-1': 'old' });
  });

  test('awaits the refresh in ensureTitle on an expired hit', async () => {
    let clock = 1000;
    /** @type {Record<string, any>} */
    const beads = { 'UI-1': { title: 'old', created_at: 1, updated_at: 2 } };
    const runJson = fakeBeads(beads);
    const cache = createTitleCache({
      runJson: /** @type {any} */ (runJson),
      now: () => clock
    });
    await cache.ensureTitle('/ws', 'UI-1');
    beads['UI-1'] = { title: 'new', created_at: 1, updated_at: 9 };
    clock += 6 * 60_000;

    const title = await cache.ensureTitle('/ws', 'UI-1');

    expect(title).toBe('new');
  });

  test('returns the stale title from ensureTitle when the refresh fails', async () => {
    let clock = 1000;
    /** @type {Record<string, any>} */
    const beads = { 'UI-1': { title: 'old', created_at: 1, updated_at: 2 } };
    const runJson = fakeBeads(beads);
    const cache = createTitleCache({
      runJson: /** @type {any} */ (runJson),
      now: () => clock
    });
    await cache.ensureTitle('/ws', 'UI-1');
    delete beads['UI-1'];
    clock += 6 * 60_000;

    const title = await cache.ensureTitle('/ws', 'UI-1');

    expect(title).toBe('old');
  });

  test('drops a timestamp shape the client cannot format', async () => {
    const runJson = fakeBeads({
      'UI-1': { title: 't', created_at: {}, updated_at: '2026-07-28' }
    });
    const cache = createTitleCache({ runJson: /** @type {any} */ (runJson) });

    await cache.ensureTitle('/ws', 'UI-1');

    expect(cache.timesFor('/ws', ['UI-1'])).toEqual({
      'UI-1': { created_at: null, updated_at: '2026-07-28' }
    });
  });
});

describe('worker title cache — workflow projection (UI-eey2 §9.2)', () => {
  test('carries the enrich result from the same bd show fill', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const enrichWorkflow = vi.fn(() => ({ route: 'spec_backed', stages: {} }));
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson),
      enrichWorkflow: /** @type {any} */ (enrichWorkflow)
    });

    expect(cache.workflowFor('/ws', ['UI-1'])).toEqual({});

    await vi.waitFor(() =>
      expect(cache.workflowFor('/ws', ['UI-1'])).toEqual({
        'UI-1': { route: 'spec_backed', stages: {} }
      })
    );
    expect(bd.runJson).toHaveBeenCalledTimes(1);
  });

  test('projects null when the enrich throws', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson),
      enrichWorkflow: () => {
        throw new Error('git probe failed');
      }
    });

    cache.workflowFor('/ws', ['UI-1']);

    await vi.waitFor(() =>
      expect(cache.workflowFor('/ws', ['UI-1'])).toEqual({ 'UI-1': null })
    );
    expect(cache.titlesFor('/ws', ['UI-1'])).toEqual({ 'UI-1': '첫 제목' });
  });

  test('omits a bead whose record has not landed yet', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson),
      enrichWorkflow: () => ({ route: 'quick_fix' })
    });

    cache.workflowFor('/ws', ['UI-1', 'UI-missing']);
    await bd.settled();

    expect(cache.workflowFor('/ws', ['UI-1', 'UI-missing'])).toEqual({
      'UI-1': { route: 'quick_fix' }
    });
  });

  test('refills the workflow after expire', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    let route = 'spec_backed';
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson),
      enrichWorkflow: () => ({ route })
    });
    await vi.waitFor(() =>
      expect(cache.workflowFor('/ws', ['UI-1'])).toEqual({
        'UI-1': { route: 'spec_backed' }
      })
    );

    route = 'full_plan';
    cache.expire('/ws', 'UI-1');

    expect(cache.workflowFor('/ws', ['UI-1'])).toEqual({});
    await vi.waitFor(() =>
      expect(cache.workflowFor('/ws', ['UI-1'])).toEqual({
        'UI-1': { route: 'full_plan' }
      })
    );
    expect(bd.runJson).toHaveBeenCalledTimes(2);
  });

  test('ignores an expire with no bead id', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson),
      enrichWorkflow: () => ({ route: 'quick_fix' })
    });
    await vi.waitFor(() =>
      expect(cache.workflowFor('/ws', ['UI-1'])).toEqual({
        'UI-1': { route: 'quick_fix' }
      })
    );

    cache.expire('/ws', '');

    expect(cache.workflowFor('/ws', ['UI-1'])).toEqual({
      'UI-1': { route: 'quick_fix' }
    });
  });

  test('lands a workflow through refreshFromIssue without a bd call', () => {
    const bd = fakeBd({});
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson),
      enrichWorkflow: (/** @type {any} */ issue) => ({
        route: issue.metadata.route
      })
    });

    cache.refreshFromIssue('/ws', {
      id: 'UI-9',
      title: '읽기 되받기',
      metadata: { route: 'full_plan' }
    });

    expect(cache.workflowFor('/ws', ['UI-9'])).toEqual({
      'UI-9': { route: 'full_plan' }
    });
    expect(bd.runJson).not.toHaveBeenCalled();
  });

  test('passes the resolved workspace root to the enrich', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const enrichWorkflow = vi.fn(() => ({ route: 'quick_fix' }));
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson),
      enrichWorkflow: /** @type {any} */ (enrichWorkflow)
    });

    cache.workflowFor('/ws/repo', ['UI-1']);
    await bd.settled();

    expect(enrichWorkflow).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'UI-1' }),
      '/ws/repo'
    );
  });
});

describe('scope artifacts projection (UI-qm12 §4.2)', () => {
  test('projects the native spec path as the only artifact', () => {
    const cache = createTitleCache({ enrichWorkflow: () => null });
    cache.refreshFromIssue('/ws', {
      id: 'UI-1',
      title: '스펙만 있는 이슈',
      spec_id: 'docs/specs/thing.md'
    });

    const out = cache.scopeArtifactsFor('/ws', ['UI-1']);

    expect(out).toEqual({ 'UI-1': ['docs/specs/thing.md'] });
  });

  test('adds the pinned plan path after the spec path', () => {
    const cache = createTitleCache({ enrichWorkflow: () => null });
    cache.refreshFromIssue('/ws', {
      id: 'UI-1',
      title: '계획까지 있는 이슈',
      spec_id: 'docs/specs/thing.md',
      metadata: { plan_path: 'docs/plans/thing.md' }
    });

    const out = cache.scopeArtifactsFor('/ws', ['UI-1']);

    expect(out).toEqual({
      'UI-1': ['docs/specs/thing.md', 'docs/plans/thing.md']
    });
  });

  test('omits a bead that declares no spec', () => {
    const cache = createTitleCache({ enrichWorkflow: () => null });
    cache.refreshFromIssue('/ws', {
      id: 'UI-2',
      title: '빠른 수정',
      metadata: { route: 'quick_fix' }
    });

    const out = cache.scopeArtifactsFor('/ws', ['UI-2']);

    expect(out).toEqual({});
  });

  test('ignores a non-string plan path', () => {
    const cache = createTitleCache({ enrichWorkflow: () => null });
    cache.refreshFromIssue('/ws', {
      id: 'UI-1',
      title: '망가진 계획 핀',
      spec_id: 'docs/specs/thing.md',
      metadata: { plan_path: 7 }
    });

    const out = cache.scopeArtifactsFor('/ws', ['UI-1']);

    expect(out).toEqual({ 'UI-1': ['docs/specs/thing.md'] });
  });

  test('reads the spec path off the same bd fill as the title', async () => {
    const bd = fakeBd({
      'UI-1': { title: '적재된 이슈', spec_id: 'docs/specs/thing.md' }
    });
    const cache = createTitleCache({
      runJson: /** @type {any} */ (bd.runJson),
      enrichWorkflow: () => null
    });

    cache.scopeArtifactsFor('/ws', ['UI-1']);
    await bd.settled();

    expect(cache.scopeArtifactsFor('/ws', ['UI-1'])).toEqual({
      'UI-1': ['docs/specs/thing.md']
    });
  });
});
