import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  __resetQueueEventsForTest,
  emitQueueChanged,
  onQueueChanged
} from './queue-events.js';
import { createRunnableCache } from './runnable-cache.js';

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/** A well-formed `<reviewer>@<40hex>` admission receipt. */
const RECEIPT = `codex@${'a'.repeat(40)}`;

/**
 * A `bd list --status open --json` row that satisfies every 판정 조건, so each
 * test can break exactly one of them.
 *
 * @param {Record<string, any>} [patch]
 * @returns {Record<string, any>}
 */
function row(patch = {}) {
  const { metadata, ...rest } = patch;
  return {
    id: 'UI-1',
    title: '실행 대기 이슈',
    status: 'open',
    ...rest,
    metadata: {
      route: 'spec_backed',
      spec_id: 'docs/specs/thing.md',
      spec_review: RECEIPT,
      ...metadata
    }
  };
}

/**
 * A `runBdJson` stub answering `bd list` per workspace. A workspace absent from
 * the map exits non-zero — the "cannot read this repo" failure the cache
 * negative-caches.
 *
 * @param {Record<string, Array<Record<string, any>>>} rows_by_workspace
 */
function fakeBd(rows_by_workspace) {
  return vi.fn(
    async (
      /** @type {string} */ _family,
      /** @type {string[]} */ _args,
      /** @type {any} */ options
    ) => {
      const rows = rows_by_workspace[String(options && options.cwd)];
      if (!rows) {
        return {
          ok: false,
          error: { code: 'bd_exit_error', message: 'not a workspace' }
        };
      }
      return {
        ok: true,
        protocol: { format: 'bare', schema_version: null },
        data: rows
      };
    }
  );
}

/**
 * Let the fire-and-forget fill and its continuations run. The stub resolves
 * immediately, so a handful of microtask hops is the whole wait (same idiom as
 * `title-cache.test.js`).
 */
async function settle() {
  for (let i = 0; i < 10; i += 1) {
    await Promise.resolve();
  }
}

/**
 * Trigger the async fill and return the settled read.
 *
 * @param {ReturnType<typeof createRunnableCache>} cache
 * @param {string} workspace
 * @param {string[]} [exclude_ids]
 */
async function warm(cache, workspace, exclude_ids) {
  cache.runnableFor(workspace, exclude_ids);
  await settle();
  return cache.runnableFor(workspace, exclude_ids);
}

beforeEach(() => {
  __resetQueueEventsForTest();
});

describe('runnable cache 판정 조건 (UI-qrfo §4)', () => {
  test('projects open runnable candidates from a shared workspace snapshot', async () => {
    const requestSnapshot = vi.fn(async () => ({
      ok: true,
      stale: false,
      snapshot: { all: [row()] }
    }));
    const cache = createRunnableCache({ requestSnapshot });

    const out = await warm(cache, WS_A);

    expect(requestSnapshot).toHaveBeenCalledWith(WS_A, 'monitor-runnable');
    expect(out.map((item) => item.bead_id)).toEqual(['UI-1']);
  });

  test('lists an open bead whose spec review is pinned', async () => {
    const cache = createRunnableCache({ runJson: fakeBd({ [WS_A]: [row()] }) });

    const out = await warm(cache, WS_A);

    expect(out).toEqual([
      {
        bead_id: 'UI-1',
        title: '실행 대기 이슈',
        route: 'spec_backed',
        spec_id: 'docs/specs/thing.md',
        spec_reviewer: 'codex',
        plan_state: 'none',
        labels: [],
        created_at: null,
        updated_at: null
      }
    ]);
  });

  test('accepts native-only and equal dual spec_id but rejects conflicting dual', async () => {
    const native = row({
      id: 'UI-native',
      spec_id: ' docs/specs/native.md ',
      metadata: { spec_id: undefined }
    });
    const equal = row({
      id: 'UI-equal',
      spec_id: 'docs/specs/same.md',
      metadata: { spec_id: ' docs/specs/same.md ' }
    });
    const conflict = row({
      id: 'UI-conflict',
      spec_id: 'docs/specs/native.md',
      metadata: { spec_id: 'docs/specs/legacy.md' }
    });
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [native, equal, conflict] })
    });

    const out = await warm(cache, WS_A);

    expect(out.map((item) => [item.bead_id, item.spec_id])).toEqual([
      ['UI-native', 'docs/specs/native.md'],
      ['UI-equal', 'docs/specs/same.md']
    ]);
  });

  test('excludes a worker-ineligible bead from runnable candidates', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [row({ labels: ['worker-ineligible', 'frontend'] })]
      })
    });

    const out = await warm(cache, WS_A);

    expect(out).toEqual([]);
  });

  test('restores a runnable bead after the label is removed and cache refreshes', async () => {
    let labels = ['worker-ineligible'];
    const runJson = vi.fn(async () => ({
      ok: true,
      protocol: { format: 'bare', schema_version: null },
      data: [row({ labels })]
    }));
    const cache = createRunnableCache({ runJson });
    expect(await warm(cache, WS_A)).toEqual([]);

    labels = [];
    cache.invalidate(WS_A);
    await warm(cache, WS_A);

    expect(cache.runnableFor(WS_A).map((item) => item.bead_id)).toEqual([
      'UI-1'
    ]);
  });

  test('carries non-policy labels into the projection', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [row({ labels: ['frontend'] })] })
    });

    const out = await warm(cache, WS_A);

    expect(out[0].labels).toEqual(['frontend']);
  });

  test('drops non-string label entries', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [row({ labels: ['ok', 3, null] })] })
    });

    const out = await warm(cache, WS_A);

    expect(out[0].labels).toEqual(['ok']);
  });

  test('projects an empty label list when the row carries no labels array', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [row({ labels: 'worker-ineligible' })] })
    });

    const out = await warm(cache, WS_A);

    expect(out[0].labels).toEqual([]);
  });

  test('rejects a bead whose route is outside the admissible enum', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [row({ metadata: { route: 'quick_fix' } })] })
    });

    const out = await warm(cache, WS_A);

    expect(out).toEqual([]);
  });

  test('rejects a bead with no spec_id', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [row({ metadata: { spec_id: '' } })] })
    });

    const out = await warm(cache, WS_A);

    expect(out).toEqual([]);
  });

  test('rejects a spec_review that is not <reviewer>@<40hex>', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [row({ metadata: { spec_review: 'codex@abc123' } })]
      })
    });

    const out = await warm(cache, WS_A);

    expect(out).toEqual([]);
  });

  test('accepts a skipped receipt as explicit authority', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [
          row({ metadata: { spec_review: `skipped@${'b'.repeat(40)}` } })
        ]
      })
    });

    const out = await warm(cache, WS_A);

    expect(out.map((item) => item.bead_id)).toEqual(['UI-1']);
  });

  test('projects the reviewer token from the spec receipt', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [
          row({ metadata: { spec_review: `skipped@${'b'.repeat(40)}` } })
        ]
      })
    });

    const out = await warm(cache, WS_A);

    expect(out[0].spec_reviewer).toBe('skipped');
  });

  test('projects an approved plan from the current approval receipt', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [
          row({
            metadata: {
              route: 'full_plan',
              plan_path: 'docs/superpowers/plans/thing.md',
              plan_approval: `user@${'c'.repeat(40)}`
            }
          })
        ]
      })
    });

    const out = await warm(cache, WS_A);

    expect(out[0].plan_state).toBe('approved');
  });

  test('projects an authored plan from the current draft review receipt', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [
          row({
            metadata: {
              route: 'full_plan',
              plan_path: 'docs/superpowers/plans/thing.md',
              plan_review: `skipped@${'d'.repeat(12)}`
            }
          })
        ]
      })
    });

    const out = await warm(cache, WS_A);

    expect(out[0].plan_state).toBe('authored');
  });

  test('projects an approved plan from the legacy approval receipt', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [
          row({
            metadata: {
              route: 'full_plan',
              plan_path: 'docs/superpowers/plans/thing.md',
              plan_review: `codex@${'e'.repeat(40)}`
            }
          })
        ]
      })
    });

    const out = await warm(cache, WS_A);

    expect(out[0].plan_state).toBe('approved');
  });

  test('projects an authored plan from the legacy draft review receipt', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [
          row({
            metadata: {
              route: 'full_plan',
              plan_path: 'docs/superpowers/plans/thing.md',
              plan_check: `codex@${'f'.repeat(12)}`
            }
          })
        ]
      })
    });

    const out = await warm(cache, WS_A);

    expect(out[0].plan_state).toBe('authored');
  });

  test('projects no plan state without a plan path', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [
          row({
            metadata: {
              route: 'full_plan',
              plan_approval: `user@${'c'.repeat(40)}`
            }
          })
        ]
      })
    });

    const out = await warm(cache, WS_A);

    expect(out[0].plan_state).toBe('none');
  });

  test('projects no plan state from malformed receipts', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [
          row({
            metadata: {
              route: 'full_plan',
              plan_path: 'docs/superpowers/plans/thing.md',
              plan_approval: `codex@${'c'.repeat(40)}`,
              plan_review: `user@${'d'.repeat(12)}`,
              plan_check: `codex@${'e'.repeat(12)}`
            }
          })
        ]
      })
    });

    const out = await warm(cache, WS_A);

    expect(out[0].plan_state).toBe('none');
  });

  test('rejects a phase child named by its parent edge', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [row({ parent: 'UI-9' })] })
    });

    const out = await warm(cache, WS_A);

    expect(out).toEqual([]);
  });

  test('rejects a phase child named by its dotted id', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [row({ id: 'UI-1.2' })] })
    });

    const out = await warm(cache, WS_A);

    expect(out).toEqual([]);
  });

  test('excludes a bead the caller already has in a lane', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [row(), row({ id: 'UI-2' })] })
    });

    const out = await warm(cache, WS_A, ['UI-1']);

    expect(out.map((item) => item.bead_id)).toEqual(['UI-2']);
  });

  test('answers an empty list before the first fill lands', () => {
    const cache = createRunnableCache({ runJson: fakeBd({ [WS_A]: [row()] }) });

    const out = cache.runnableFor(WS_A);

    expect(out).toEqual([]);
  });
});

describe('runnable cache TTL (UI-qrfo §4)', () => {
  test('re-reads once the success TTL expires', async () => {
    let clock = 0;
    const runJson = fakeBd({ [WS_A]: [row()] });
    const cache = createRunnableCache({
      runJson,
      now: () => clock,
      positive_ttl_ms: 30_000
    });
    await warm(cache, WS_A);

    clock = 30_000;
    cache.runnableFor(WS_A);
    await settle();

    expect(runJson).toHaveBeenCalledTimes(2);
  });

  test('serves the cached list without re-reading inside the success TTL', async () => {
    let clock = 0;
    const runJson = fakeBd({ [WS_A]: [row()] });
    const cache = createRunnableCache({
      runJson,
      now: () => clock,
      positive_ttl_ms: 30_000
    });
    await warm(cache, WS_A);

    clock = 29_999;
    cache.runnableFor(WS_A);
    await settle();

    expect(runJson).toHaveBeenCalledTimes(1);
  });

  test('suppresses a re-read inside the failure TTL', async () => {
    let clock = 0;
    const runJson = fakeBd({});
    const cache = createRunnableCache({
      runJson,
      now: () => clock,
      negative_ttl_ms: 60_000
    });
    await warm(cache, WS_A);

    clock = 59_999;
    cache.runnableFor(WS_A);
    await settle();

    expect(runJson).toHaveBeenCalledTimes(1);
  });

  test('retries once the failure TTL expires', async () => {
    let clock = 0;
    const runJson = fakeBd({});
    const cache = createRunnableCache({
      runJson,
      now: () => clock,
      negative_ttl_ms: 60_000
    });
    await warm(cache, WS_A);

    clock = 60_000;
    cache.runnableFor(WS_A);
    await settle();

    expect(runJson).toHaveBeenCalledTimes(2);
  });

  test('keeps the cached list when a refresh fails', async () => {
    let clock = 0;
    let readable = true;
    const runJson = vi.fn(async () =>
      readable
        ? {
            ok: true,
            protocol: { format: 'bare', schema_version: null },
            data: [row()]
          }
        : { ok: false, error: { code: 'bd_exit_error', message: 'bd boom' } }
    );
    const cache = createRunnableCache({
      runJson,
      now: () => clock,
      positive_ttl_ms: 30_000
    });
    await warm(cache, WS_A);

    readable = false;
    clock = 30_000;
    const out = await warm(cache, WS_A);

    expect(out.map((item) => item.bead_id)).toEqual(['UI-1']);
  });
});

describe('runnable cache invalidation (UI-qrfo §4)', () => {
  // 삭제가 아니라 만료다: 삭제하면 비동기 재스캔이 끝날 때까지 동기 읽기가
  // `[]`를 답해 실행가능 레인이 push마다 깜빡인다.
  test('keeps serving the stale list while the changed workspace re-scans', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [row()], [WS_B]: [row({ id: 'UI-2' })] })
    });
    onQueueChanged((workspace) => cache.invalidate(workspace));
    await warm(cache, WS_A);
    await warm(cache, WS_B);

    emitQueueChanged(WS_A);

    expect(cache.runnableFor(WS_A).map((item) => item.bead_id)).toEqual([
      'UI-1'
    ]);
    expect(cache.runnableFor(WS_B).map((item) => item.bead_id)).toEqual([
      'UI-2'
    ]);
  });

  test('re-reads the invalidated workspace on the next read', async () => {
    const runJson = fakeBd({ [WS_A]: [row()] });
    const cache = createRunnableCache({ runJson });
    onQueueChanged((workspace) => cache.invalidate(workspace));
    await warm(cache, WS_A);

    emitQueueChanged(WS_A);
    await warm(cache, WS_A);

    expect(runJson).toHaveBeenCalledTimes(2);
  });

  test('replaces the stale list once the re-scan lands', async () => {
    /** @type {Record<string, Array<Record<string, any>>>} */
    const rows_by_workspace = { [WS_A]: [row()] };
    const cache = createRunnableCache({ runJson: fakeBd(rows_by_workspace) });
    onQueueChanged((workspace) => cache.invalidate(workspace));
    await warm(cache, WS_A);

    rows_by_workspace[WS_A] = [row({ id: 'UI-9' })];
    emitQueueChanged(WS_A);
    const out = await warm(cache, WS_A);

    expect(out.map((item) => item.bead_id)).toEqual(['UI-9']);
  });
});

describe('runnable cache subscriber gate (UI-qrfo §4)', () => {
  test('spawns no bd read while nobody watches the monitor', async () => {
    const runJson = fakeBd({ [WS_A]: [row()] });
    const cache = createRunnableCache({ runJson, subscriberCount: () => 0 });

    cache.runnableFor(WS_A);
    await settle();

    expect(runJson).not.toHaveBeenCalled();
  });

  test('spawns no bd read on an explicit refresh while nobody watches', async () => {
    const runJson = fakeBd({ [WS_A]: [row()] });
    const cache = createRunnableCache({ runJson, subscriberCount: () => 0 });

    cache.refresh(WS_A);
    await settle();

    expect(runJson).not.toHaveBeenCalled();
  });

  test('reads again once a subscriber arrives', async () => {
    let subscribers = 0;
    const runJson = fakeBd({ [WS_A]: [row()] });
    const cache = createRunnableCache({
      runJson,
      subscriberCount: () => subscribers
    });
    cache.runnableFor(WS_A);
    await settle();

    subscribers = 1;
    const out = await warm(cache, WS_A);

    expect(out.map((item) => item.bead_id)).toEqual(['UI-1']);
  });
});

describe('runnable cache fill notification (UI-qrfo §4)', () => {
  test('announces the filled workspace so the next push carries it', async () => {
    const filled = /** @type {string[]} */ ([]);
    const cache = createRunnableCache({ runJson: fakeBd({ [WS_A]: [row()] }) });
    cache.setOnFilled((workspace) => filled.push(workspace));

    await warm(cache, WS_A);

    expect(filled).toEqual([WS_A]);
  });

  test('collapses a burst of reads into one bd process', async () => {
    const runJson = fakeBd({ [WS_A]: [row()] });
    const cache = createRunnableCache({ runJson });

    cache.runnableFor(WS_A);
    cache.runnableFor(WS_A);
    cache.runnableFor(WS_A);
    await settle();

    expect(runJson).toHaveBeenCalledTimes(1);
  });

  test('forgets every workspace on clear', async () => {
    const cache = createRunnableCache({ runJson: fakeBd({ [WS_A]: [row()] }) });
    await warm(cache, WS_A);

    cache.clear();

    expect(cache.runnableFor(WS_A)).toEqual([]);
  });
});
