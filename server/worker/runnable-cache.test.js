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
 * A `bd list --all --json` row a SESSION has claimed. Carries none of the
 * worker admission surfaces (`spec_review`, an admissible route) on purpose —
 * §3 says those never decide a session tile.
 *
 * @param {Record<string, any>} [patch]
 * @returns {Record<string, any>}
 */
function sessionRow(patch = {}) {
  const { metadata, ...rest } = patch;
  return {
    id: 'UI-2',
    title: '세션 진행 이슈',
    status: 'in_progress',
    ...rest,
    metadata: { route: 'spec_backed', ...metadata }
  };
}

/**
 * A `requestSnapshot` stub answering the shared `--all` generation per
 * workspace — the source BOTH buckets are projected from. A workspace absent
 * from the map answers not-ok, the "cannot read this repo" failure.
 *
 * @param {Record<string, Array<Record<string, any>>>} rows_by_workspace
 */
function fakeSnapshot(rows_by_workspace) {
  return vi.fn(async (/** @type {string} */ workspace) => {
    const rows = rows_by_workspace[workspace];
    if (!rows) {
      return { ok: false };
    }
    return { ok: true, stale: false, snapshot: { all: rows } };
  });
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

/**
 * Trigger the async fill and return the settled session bucket.
 *
 * @param {ReturnType<typeof createRunnableCache>} cache
 * @param {string} workspace
 * @param {string[]} [exclude_ids]
 */
async function warmSession(cache, workspace, exclude_ids) {
  cache.sessionActiveFor(workspace, exclude_ids);
  await settle();
  return cache.sessionActiveFor(workspace, exclude_ids);
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

  // `workflow` and `exec_pins` joined this projection in UI-eey2 §9.1; the
  // enrich is stubbed so the assertion stays about the PROJECTION rather than
  // about the git probe the live enrich makes.
  test('lists an open bead whose spec review is pinned', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [row()] }),
      enrichWorkflow: () => ({ route: 'spec_backed' })
    });

    const out = await warm(cache, WS_A);

    expect(out).toEqual([
      {
        bead_id: 'UI-1',
        title: '실행 대기 이슈',
        route: 'spec_backed',
        spec_id: 'docs/specs/thing.md',
        spec_reviewer: 'codex',
        plan_state: 'none',
        blocked: false,
        blocked_by: [],
        labels: [],
        created_at: null,
        updated_at: null,
        workflow: { route: 'spec_backed' },
        exec_pins: {}
      }
    ]);
  });

  test('projects blocked membership and direct blocker ids from ready explain', async () => {
    const requestSnapshot = vi.fn(async () => ({
      ok: true,
      stale: false,
      snapshot: {
        all: [row()],
        ready_explain: {
          ready: [],
          blocked: [
            {
              id: 'UI-1',
              blocked_by: ['UI-2', { id: 'EXT-3' }, {}, null]
            }
          ]
        }
      }
    }));
    const cache = createRunnableCache({ requestSnapshot });

    const out = await warm(cache, WS_A);

    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({
      bead_id: 'UI-1',
      blocked: true,
      blocked_by: ['UI-2', 'EXT-3']
    });
  });

  test('falls back to embedded blocks edges when the explain row carries no ids', async () => {
    const requestSnapshot = vi.fn(async () => ({
      ok: true,
      stale: false,
      snapshot: {
        all: [
          row({
            dependencies: [
              { type: 'blocks', depends_on_id: 'UI-9' },
              { dependency_type: 'blocks', id: 'UI-8' },
              { type: 'related', depends_on_id: 'UI-7' }
            ]
          })
        ],
        ready_explain: { ready: [], blocked: [{ id: 'UI-1' }] }
      }
    }));
    const cache = createRunnableCache({ requestSnapshot });

    const out = await warm(cache, WS_A);

    expect(out[0]).toMatchObject({
      blocked: true,
      blocked_by: ['UI-9', 'UI-8']
    });
  });

  test('keeps a bead the explain source never blocked out of the fallback', async () => {
    const requestSnapshot = vi.fn(async () => ({
      ok: true,
      stale: false,
      snapshot: {
        all: [
          row({ dependencies: [{ type: 'blocks', depends_on_id: 'UI-9' }] })
        ],
        ready_explain: { ready: [{ id: 'UI-1' }], blocked: [] }
      }
    }));
    const cache = createRunnableCache({ requestSnapshot });

    const out = await warm(cache, WS_A);

    expect(out[0]).toMatchObject({ blocked: false, blocked_by: [] });
  });

  test('fails quiet when ready explain is absent', async () => {
    const requestSnapshot = vi.fn(async () => ({
      ok: true,
      stale: false,
      snapshot: { all: [row()] }
    }));
    const cache = createRunnableCache({ requestSnapshot });

    const out = await warm(cache, WS_A);

    expect(out[0]).toMatchObject({ blocked: false, blocked_by: [] });
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
      runJson: fakeBd({ [WS_A]: [row({ metadata: { route: 'not-a-route' } })] })
    });

    const out = await warm(cache, WS_A);

    expect(out).toEqual([]);
  });

  test('lists quick fixes with a description despite missing or conflicting spec surfaces', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [
          row({
            id: 'UI-missing-spec',
            description: '설명만 있는 빠른 수정',
            metadata: {
              route: 'quick_fix',
              spec_id: '',
              spec_review: ''
            }
          }),
          row({
            id: 'UI-conflicting-spec',
            description: '사양 충돌이 있어도 되는 빠른 수정',
            spec_id: 'docs/specs/native.md',
            metadata: {
              route: 'quick_fix',
              spec_id: 'docs/specs/legacy.md',
              spec_review: 'malformed'
            }
          })
        ]
      })
    });

    const out = await warm(cache, WS_A);

    expect(
      out.map((item) => [
        item.bead_id,
        item.spec_id,
        item.spec_reviewer,
        item.plan_state
      ])
    ).toEqual([
      ['UI-missing-spec', '', '', 'none'],
      ['UI-conflicting-spec', '', '', 'none']
    ]);
  });

  test('rejects quick fixes with a missing or blank description', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [
          row({
            id: 'UI-no-description',
            metadata: { route: 'quick_fix' }
          }),
          row({
            id: 'UI-blank-description',
            description: ' \n ',
            metadata: { route: 'quick_fix' }
          })
        ]
      })
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

describe('runnable cache workflow + exec_pins (UI-eey2 §9.1)', () => {
  test('projects the enrich result for the same bd list row', async () => {
    const enrichWorkflow = vi.fn(() => ({ route: 'full_plan', stages: {} }));
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [row()] }),
      enrichWorkflow: /** @type {any} */ (enrichWorkflow)
    });

    const out = await warm(cache, WS_A);

    expect(out[0].workflow).toEqual({ route: 'full_plan', stages: {} });
    expect(enrichWorkflow).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'UI-1' }),
      WS_A
    );
  });

  test('carries a null workflow when the enrich throws', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({ [WS_A]: [row()] }),
      enrichWorkflow: () => {
        throw new Error('git probe failed');
      }
    });

    const out = await warm(cache, WS_A);

    expect(out).toHaveLength(1);
    expect(out[0].workflow).toBeNull();
  });

  test('projects only the execution pins of the row metadata', async () => {
    const cache = createRunnableCache({
      runJson: fakeBd({
        [WS_A]: [
          row({
            metadata: {
              impl_runtime: 'codex',
              impl_speed: 'fast',
              codex_account: 'work',
              plan_path: 'docs/plans/a.md',
              blocked_reason: 'nope',
              impl_effort: 7
            }
          })
        ]
      }),
      enrichWorkflow: () => null
    });

    const out = await warm(cache, WS_A);

    expect(out[0].exec_pins).toEqual({
      impl_runtime: 'codex',
      impl_speed: 'fast',
      codex_account: 'work'
    });
  });
});
describe('runnable cache 세션 진행 버킷 (UI-yrzu §4.1)', () => {
  test('projects an in_progress row into session_active instead of runnable', async () => {
    const cache = createRunnableCache({
      requestSnapshot: fakeSnapshot({
        [WS_A]: [
          row(),
          sessionRow({
            spec_id: 'docs/specs/session.md',
            labels: ['frontend'],
            created_at: 1000,
            updated_at: 3000,
            started_at: 2000
          })
        ]
      }),
      enrichWorkflow: () => ({ route: 'spec_backed' })
    });

    await warm(cache, WS_A);

    expect(cache.runnableFor(WS_A).map((item) => item.bead_id)).toEqual([
      'UI-1'
    ]);
    expect(cache.sessionActiveFor(WS_A)).toEqual([
      {
        bead_id: 'UI-2',
        title: '세션 진행 이슈',
        status: 'in_progress',
        route: 'spec_backed',
        spec_id: 'docs/specs/session.md',
        labels: ['frontend'],
        created_at: 1000,
        updated_at: 3000,
        started_at: 2000,
        workflow: { route: 'spec_backed' },
        blocked: false,
        blocked_by: []
      }
    ]);
  });

  // §3: 세션은 Worker 자격과 무관하게 아무 이슈나 잡는다.
  test('keeps a session bead no worker admission condition would admit', async () => {
    const cache = createRunnableCache({
      requestSnapshot: fakeSnapshot({
        [WS_A]: [
          sessionRow({
            id: 'UI-7.1',
            labels: ['worker-ineligible'],
            metadata: { route: 'unknown_route' }
          })
        ]
      })
    });

    const out = await warmSession(cache, WS_A);

    expect(out.map((item) => [item.bead_id, item.route, item.spec_id])).toEqual(
      [['UI-7.1', 'unknown_route', '']]
    );
  });

  test('reads a session bead with no pinned route as an empty route', async () => {
    const cache = createRunnableCache({
      requestSnapshot: fakeSnapshot({
        [WS_A]: [sessionRow({ metadata: { route: 7 } })]
      })
    });

    const out = await warmSession(cache, WS_A);

    expect(out.map((item) => item.route)).toEqual(['']);
  });

  test('projects blocked membership onto a session bead', async () => {
    const requestSnapshot = vi.fn(async () => ({
      ok: true,
      stale: false,
      snapshot: {
        all: [sessionRow()],
        ready_explain: { blocked: [{ id: 'UI-2', blocked_by: ['UI-5'] }] }
      }
    }));
    const cache = createRunnableCache({ requestSnapshot });

    const out = await warmSession(cache, WS_A);

    expect(out.map((item) => [item.blocked, item.blocked_by])).toEqual([
      [true, ['UI-5']]
    ]);
  });

  test('excludes a session bead the caller already has in a lane', async () => {
    const cache = createRunnableCache({
      requestSnapshot: fakeSnapshot({
        [WS_A]: [sessionRow(), sessionRow({ id: 'UI-3' })]
      })
    });

    const out = await warmSession(cache, WS_A, ['UI-2']);

    expect(out.map((item) => item.bead_id)).toEqual(['UI-3']);
  });

  test('answers an empty session list before the first fill lands', () => {
    const cache = createRunnableCache({
      requestSnapshot: fakeSnapshot({ [WS_A]: [sessionRow()] })
    });

    const out = cache.sessionActiveFor(WS_A);

    expect(out).toEqual([]);
  });

  // 한 레코드에 두 버킷이 있으므로 만료도 함께다.
  test('expires both buckets on invalidate so one re-scan replaces each', async () => {
    /** @type {Record<string, Array<Record<string, any>>>} */
    const rows_by_workspace = { [WS_A]: [row(), sessionRow()] };
    const cache = createRunnableCache({
      requestSnapshot: fakeSnapshot(rows_by_workspace)
    });
    onQueueChanged((workspace) => cache.invalidate(workspace));
    await warm(cache, WS_A);

    rows_by_workspace[WS_A] = [row({ id: 'UI-9' }), sessionRow({ id: 'UI-8' })];
    emitQueueChanged(WS_A);
    await warm(cache, WS_A);

    expect(cache.runnableFor(WS_A).map((item) => item.bead_id)).toEqual([
      'UI-9'
    ]);
    expect(cache.sessionActiveFor(WS_A).map((item) => item.bead_id)).toEqual([
      'UI-8'
    ]);
  });

  test('serves the stale session list while the invalidated workspace re-scans', async () => {
    const cache = createRunnableCache({
      requestSnapshot: fakeSnapshot({ [WS_A]: [sessionRow()] })
    });
    onQueueChanged((workspace) => cache.invalidate(workspace));
    await warmSession(cache, WS_A);

    emitQueueChanged(WS_A);

    expect(cache.sessionActiveFor(WS_A).map((item) => item.bead_id)).toEqual([
      'UI-2'
    ]);
  });

  test('forgets the session bucket on clear', async () => {
    const cache = createRunnableCache({
      requestSnapshot: fakeSnapshot({ [WS_A]: [sessionRow()] })
    });
    await warmSession(cache, WS_A);

    cache.clear();

    expect(cache.sessionActiveFor(WS_A)).toEqual([]);
  });

  test('leaves only the failing session row without a workflow', async () => {
    const cache = createRunnableCache({
      requestSnapshot: fakeSnapshot({
        [WS_A]: [sessionRow(), sessionRow({ id: 'UI-3' })]
      }),
      enrichWorkflow: (/** @type {any} */ issue) => {
        if (issue.id === 'UI-2') {
          throw new Error('git probe failed');
        }
        return { route: 'quick_fix' };
      }
    });

    const out = await warmSession(cache, WS_A);

    expect(out.map((item) => [item.bead_id, item.workflow])).toEqual([
      ['UI-2', null],
      ['UI-3', { route: 'quick_fix' }]
    ]);
  });
});
