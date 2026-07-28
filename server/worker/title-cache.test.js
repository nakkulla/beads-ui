import { describe, expect, test, vi } from 'vitest';
import { createTitleCache } from './title-cache.js';

/**
 * A `runBdJson` stub that answers `bd show <id> --json` from a fixture map. An
 * id absent from the map exits non-zero, which is the "cannot read this bead"
 * failure the cache negative-caches.
 *
 * @param {Record<string, string>} titles
 * @param {{ deferred?: boolean }} [options]
 */
function fakeBd(titles, options = {}) {
  /** @type {Array<() => void>} */
  const pending = [];
  /** @type {Array<Promise<unknown>>} */
  const calls = [];
  const runJson = vi.fn((/** @type {string[]} */ args) => {
    const p = new Promise((resolve) => {
      const bead_id = args[1];
      const title = titles[bead_id];
      const answer = () => {
        if (typeof title !== 'string') {
          resolve({ code: 1, stderr: 'not found' });
          return;
        }
        resolve({ code: 0, stdoutJson: [{ id: bead_id, title }] });
      };
      if (options.deferred) {
        pending.push(answer);
      } else {
        answer();
      }
    });
    calls.push(p);
    return p;
  });
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
  test('returns nothing on a cold miss and fills asynchronously', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const cache = createTitleCache({ runJson: bd.runJson });

    const first = cache.titlesFor('/ws', ['UI-1']);

    expect(first).toEqual({});
    await vi.waitFor(() => expect(bd.runJson).toHaveBeenCalledTimes(1));
    await vi.waitFor(() =>
      expect(cache.titlesFor('/ws', ['UI-1'])).toEqual({ 'UI-1': '첫 제목' })
    );
  });

  test('calls the filled callback once per fill batch', async () => {
    const bd = fakeBd({ 'UI-1': '제목 1', 'UI-2': '제목 2' });
    const cache = createTitleCache({ runJson: bd.runJson });
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
    const cache = createTitleCache({ runJson: bd.runJson });
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
      runJson: bd.runJson,
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
      runJson: bd.runJson,
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
    const cache = createTitleCache({ runJson: bd.runJson });

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
    const cache = createTitleCache({ runJson: bd.runJson });

    cache.titlesFor('/ws/a', ['UI-1']);
    await vi.waitFor(() =>
      expect(cache.titlesFor('/ws/a/', ['UI-1'])).toEqual({ 'UI-1': '제목' })
    );

    expect(cache.titlesFor('/ws/b', ['UI-1'])).toEqual({});
  });

  test('ignores an empty title as unreadable', async () => {
    const bd = fakeBd({ 'UI-1': '' });
    const cache = createTitleCache({ runJson: bd.runJson });
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
    const cache = createTitleCache({ runJson: bd.runJson });

    const title = await cache.ensureTitle('/ws', 'UI-1');

    expect(title).toBe('첫 제목');
    expect(bd.runJson).toHaveBeenCalledTimes(1);
  });

  test('answers a cache hit without touching bd', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const cache = createTitleCache({ runJson: bd.runJson });

    await cache.ensureTitle('/ws', 'UI-1');
    const again = await cache.ensureTitle('/ws', 'UI-1');

    expect(again).toBe('첫 제목');
    expect(bd.runJson).toHaveBeenCalledTimes(1);
  });

  test('returns null for an unreadable bead', async () => {
    const bd = fakeBd({});
    const cache = createTitleCache({ runJson: bd.runJson });

    const title = await cache.ensureTitle('/ws', 'UI-1');

    expect(title).toBeNull();
  });

  test('returns null without re-running bd inside the negative TTL', async () => {
    const bd = fakeBd({});
    const cache = createTitleCache({
      runJson: bd.runJson,
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
      runJson: bd.runJson,
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
    const cache = createTitleCache({ runJson: bd.runJson });

    cache.titlesFor('/ws', ['UI-1']);
    const pending = cache.ensureTitle('/ws', 'UI-1');
    bd.release();

    expect(await pending).toBe('한 번만');
    expect(bd.runJson).toHaveBeenCalledTimes(1);
  });

  test('collapses concurrent ensureTitle calls into one bd call', async () => {
    const bd = fakeBd({ 'UI-1': '한 번만' }, { deferred: true });
    const cache = createTitleCache({ runJson: bd.runJson });

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
    const cache = createTitleCache({ runJson: bd.runJson });
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
    const cache = createTitleCache({ runJson: bd.runJson });
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
    const cache = createTitleCache({ runJson: bd.runJson });
    const onFilled = vi.fn();
    cache.setOnFilled(onFilled);

    await cache.ensureTitle('/ws', 'UI-1');

    expect(onFilled).toHaveBeenCalledWith('/ws');
    expect(cache.titlesFor('/ws', ['UI-1'])).toEqual({ 'UI-1': '첫 제목' });
  });

  test('returns null for an empty bead id without running bd', async () => {
    const bd = fakeBd({ 'UI-1': '첫 제목' });
    const cache = createTitleCache({ runJson: bd.runJson });

    const title = await cache.ensureTitle('/ws', '');

    expect(title).toBeNull();
    expect(bd.runJson).not.toHaveBeenCalled();
  });
});
