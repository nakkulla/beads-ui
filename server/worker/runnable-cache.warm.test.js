import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, test, vi } from 'vitest';

/**
 * Every git child process the fill path caused, split by how it was spawned.
 * The whole point of UI-hhn9 §4.1 is that `sync` stays empty and `async` does
 * not grow with the row count, so both are counted with the REAL warm and the
 * REAL projection — no enrich stub can answer this question.
 */
const git_calls = vi.hoisted(() => ({
  /** @type {Array<{ cwd: string, args: string[] }>} */
  sync: [],
  /** @type {Array<{ cwd: string, args: string[] }>} */
  async: []
}));

vi.mock('node:child_process', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  const { promisify } = await import('node:util');
  const promisified = promisify(actual.execFile);
  /**
   * @param {string} file
   * @param {string[]} args
   * @param {any} [options]
   */
  const execFileSyncSpy = (file, args, options) => {
    git_calls.sync.push({ cwd: String(options?.cwd || ''), args });
    return actual.execFileSync(file, args, options);
  };
  /**
   * @param {...any} args
   */
  const execFileSpy = (...args) => actual.execFile(...args);
  /** @type {any} */ (execFileSpy)[promisify.custom] = (
    /** @type {string} */ file,
    /** @type {string[]} */ args,
    /** @type {any} */ options
  ) => {
    git_calls.async.push({ cwd: String(options?.cwd || ''), args });
    return promisified(file, args, options);
  };
  return { ...actual, execFileSync: execFileSyncSpy, execFile: execFileSpy };
});

const { createRunnableCache } = await import('./runnable-cache.js');

const SPEC_PATH = 'docs/specs/thing.md';

/** @type {string[]} */
const temp_roots = [];

/** Monotonic generation so no two fills accidentally share a probe context. */
let generation_seq = 0;

/**
 * A real git repository with the spec document committed twice, so the second
 * commit is a genuine "changed since the receipt" fact for the probes to find.
 *
 * @returns {{ root: string, first_sha: string, head_sha: string }}
 */
function makeRepo() {
  const root = fs.realpathSync(
    fs.mkdtempSync(path.join(os.tmpdir(), 'runnable-warm-'))
  );
  temp_roots.push(root);
  /**
   * @param {string[]} args
   */
  const git = (args) =>
    execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  git(['init', '--quiet']);
  git(['config', 'user.email', 'test@example.com']);
  git(['config', 'user.name', 'test']);
  fs.mkdirSync(path.join(root, 'docs/specs'), { recursive: true });
  fs.writeFileSync(path.join(root, SPEC_PATH), '# 최초\n');
  git(['add', '-A']);
  git(['commit', '--quiet', '-m', 'first']);
  const first_sha = git(['rev-parse', 'HEAD']);
  fs.writeFileSync(path.join(root, SPEC_PATH), '# 최초\n\n# 수정\n');
  git(['add', '-A']);
  git(['commit', '--quiet', '-m', 'second']);
  const head_sha = git(['rev-parse', 'HEAD']);
  git_calls.sync.length = 0;
  git_calls.async.length = 0;
  return { root, first_sha, head_sha };
}

/**
 * `count` open rows carrying a spec receipt against `receipt_sha`, which is
 * what makes the projection ask git anything at all.
 *
 * @param {number} count
 * @param {string} receipt_sha
 */
function rows(count, receipt_sha) {
  return Array.from({ length: count }, (_value, index) => ({
    id: `UI-${index + 1}`,
    title: `이슈 ${index + 1}`,
    status: 'open',
    spec_id: SPEC_PATH,
    metadata: { route: 'spec_backed', spec_review: `codex@${receipt_sha}` }
  }));
}

/**
 * @param {Array<Record<string, any>>} all
 * @param {number} [generation]
 */
function snapshotOk(all, generation) {
  return {
    ok: true,
    stale: false,
    snapshot: {
      generation: generation ?? (generation_seq += 1),
      all,
      ready_explain: {}
    }
  };
}

/**
 * Run one fill and resolve on the cache's own completion announcement, not on
 * a fixed number of microtasks (§4.2).
 *
 * @param {ReturnType<typeof createRunnableCache>} cache
 * @param {string} workspace
 */
async function fill(cache, workspace) {
  /** @type {(value: void) => void} */
  let done = () => {};
  const filled = new Promise((resolve) => {
    done = resolve;
  });
  cache.setOnFilled(() => done());
  cache.runnableFor(workspace);
  await filled;
  return cache.runnableFor(workspace);
}

/**
 * The spec stage's staleness verdict, or undefined when the row carries no
 * projection at all.
 *
 * @param {{ workflow: Record<string, unknown>|null }} item
 * @returns {boolean|undefined}
 */
function specStale(item) {
  return /** @type {any} */ (item.workflow)?.stages?.spec?.stale;
}

/**
 * @param {string} cwd
 */
function headWarms(cwd) {
  return git_calls.async.filter(
    (call) =>
      call.cwd === cwd &&
      call.args[0] === 'rev-parse' &&
      call.args[1] === 'HEAD'
  ).length;
}

afterAll(() => {
  for (const root of temp_roots) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

describe('runnable cache git warm (UI-hhn9 §4.1)', () => {
  test('spawns no synchronous git child process while filling 10 rows', async () => {
    const repo = makeRepo();
    const cache = createRunnableCache({
      requestSnapshot: async () => snapshotOk(rows(10, repo.first_sha))
    });

    const out = await fill(cache, repo.root);

    expect(out).toHaveLength(10);
    expect(git_calls.sync).toEqual([]);
    expect(headWarms(repo.root)).toBe(1);
  });

  test('keeps the shared head warm at one while filling 100 rows', async () => {
    const repo = makeRepo();
    const cache = createRunnableCache({
      requestSnapshot: async () => snapshotOk(rows(100, repo.first_sha))
    });

    const out = await fill(cache, repo.root);

    expect(out).toHaveLength(100);
    expect(git_calls.sync).toEqual([]);
    expect(headWarms(repo.root)).toBe(1);
  });

  test('judges spec staleness against the captured head', async () => {
    const repo = makeRepo();
    const cache = createRunnableCache({
      requestSnapshot: async () => snapshotOk(rows(1, repo.first_sha))
    });

    const out = await fill(cache, repo.root);

    expect(specStale(out[0])).toBe(true);
  });

  test('reuses one head warm across two fills of the same generation', async () => {
    const repo = makeRepo();
    const generation = (generation_seq += 1);
    const cache = createRunnableCache({
      requestSnapshot: async () =>
        snapshotOk(rows(3, repo.first_sha), generation)
    });

    await fill(cache, repo.root);
    cache.invalidate(repo.root);
    await fill(cache, repo.root);

    expect(headWarms(repo.root)).toBe(1);
  });

  test('warms again for a new generation of the same workspace', async () => {
    const repo = makeRepo();
    const cache = createRunnableCache({
      requestSnapshot: async () => snapshotOk(rows(3, repo.first_sha))
    });

    await fill(cache, repo.root);
    cache.invalidate(repo.root);
    await fill(cache, repo.root);

    expect(headWarms(repo.root)).toBe(2);
  });

  test('warms each workspace separately without mixing their facts', async () => {
    const stale_repo = makeRepo();
    const fresh_repo = makeRepo();
    const generation = (generation_seq += 1);
    const stale_cache = createRunnableCache({
      requestSnapshot: async () =>
        snapshotOk(rows(1, stale_repo.first_sha), generation)
    });
    const fresh_cache = createRunnableCache({
      requestSnapshot: async () =>
        snapshotOk(rows(1, fresh_repo.head_sha), generation)
    });

    const stale_out = await fill(stale_cache, stale_repo.root);
    const fresh_out = await fill(fresh_cache, fresh_repo.root);

    expect(specStale(stale_out[0])).toBe(true);
    expect(specStale(fresh_out[0])).toBe(false);
    expect(headWarms(stale_repo.root)).toBe(1);
    expect(headWarms(fresh_repo.root)).toBe(1);
  });

  test('leaves freshness undecided without a synchronous git fallback', async () => {
    const root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'runnable-nogit-'))
    );
    temp_roots.push(root);
    git_calls.sync.length = 0;
    const cache = createRunnableCache({
      requestSnapshot: async () => snapshotOk(rows(4, 'a'.repeat(40)))
    });

    const out = await fill(cache, root);

    expect(git_calls.sync).toEqual([]);
    expect(out.map((item) => specStale(item))).toEqual([
      false,
      false,
      false,
      false
    ]);
  });

  test('keeps the last good candidates when a later fill fails', async () => {
    const repo = makeRepo();
    let readable = true;
    let clock = 0;
    const cache = createRunnableCache({
      now: () => clock,
      positive_ttl_ms: 30_000,
      requestSnapshot: async () =>
        readable ? snapshotOk(rows(2, repo.first_sha)) : { ok: false }
    });
    await fill(cache, repo.root);

    readable = false;
    clock = 30_000;
    cache.runnableFor(repo.root);
    await vi.waitFor(() =>
      expect(cache.runnableFor(repo.root)).toHaveLength(2)
    );

    expect(cache.runnableFor(repo.root).map((item) => item.bead_id)).toEqual([
      'UI-1',
      'UI-2'
    ]);
  });
});
