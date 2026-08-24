import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  PROMPT_SCHEMA_VERSION,
  calculateScopeOverlaps,
  collectAnalysisSnapshot,
  describeAnalysisTargets,
  qualifyTargets,
  scopeItemsOverlap
} from './parallel-analysis-targets.js';
import {
  parallelAnalysisCachePath,
  parallelAnalysisSettingsPath,
  workspaceStateDir
} from './state-paths.js';

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-pa-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

const RECEIPT = `self@${'a'.repeat(40)}`;

/**
 * @param {any} over
 */
function issueOf(over = {}) {
  return {
    id: 'UI-t1',
    title: '대상',
    status: 'open',
    labels: [],
    dependencies: [],
    metadata: {
      route: 'spec_backed',
      spec_id: 'docs/spec.md',
      spec_review: RECEIPT
    },
    ...over
  };
}

/**
 * Fake pinned-blob git runner: oid/size lookups against a fixture map.
 *
 * @param {Record<string, { oid: string, bytes: number, content?: string, content_error?: boolean }>} blobs - keyed by
 * `<sha>:<path>`.
 */
function gitRunOf(blobs) {
  return async (/** @type {string[]} */ args) => {
    if (args[0] === 'rev-parse') {
      const hit = blobs[args[1]];
      return hit
        ? { code: 0, stdout: `${hit.oid}\n` }
        : { code: 128, stdout: '' };
    }
    if (args[0] === 'cat-file' && args[1] === '-s') {
      const hit = blobs[args[2]];
      return hit
        ? { code: 0, stdout: `${hit.bytes}\n` }
        : { code: 128, stdout: '' };
    }
    if (args[0] === 'cat-file' && args[1] === 'blob') {
      const hit = blobs[args[2]];
      return hit && hit.content_error !== true
        ? { code: 0, stdout: hit.content || '' }
        : { code: 128, stdout: '' };
    }
    return { code: 1, stdout: '' };
  };
}

const BASE = { ref: 'main', sha: 'b'.repeat(40) };

describe('parallel-analysis state paths (UI-04vo seam F)', () => {
  test('derives the settings and per-workspace cache paths', () => {
    expect(parallelAnalysisSettingsPath()).toBe(
      path.join(tmp_state, 'bdui', 'parallel-analysis-settings.json')
    );
    expect(parallelAnalysisCachePath('/ws/a')).toBe(
      path.join(workspaceStateDir('/ws/a'), 'parallel-analysis.json')
    );
  });
});

describe('parallel-analysis target qualification (UI-04vo seam F)', () => {
  test('qualifies open spec-backed issues and excludes the rest with reasons', () => {
    const result = qualifyTargets([
      issueOf({ id: 'UI-ok' }),
      issueOf({
        id: 'UI-plan',
        metadata: {
          route: 'full_plan',
          spec_id: 'docs/spec.md',
          spec_review: RECEIPT,
          plan_path: 'docs/plan.md'
        }
      }),
      issueOf({ id: 'UI-closed', status: 'closed' }),
      issueOf({
        id: 'UI-quick',
        metadata: {
          route: 'quick_fix',
          spec_id: 'docs/spec.md',
          spec_review: RECEIPT
        }
      }),
      issueOf({
        id: 'UI-noroute',
        metadata: { spec_id: 'docs/spec.md', spec_review: RECEIPT }
      }),
      issueOf({
        id: 'UI-nospec',
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
      }),
      issueOf({
        id: 'UI-noreview',
        metadata: { route: 'spec_backed', spec_id: 'docs/spec.md' }
      }),
      issueOf({
        id: 'UI-badreview',
        metadata: {
          route: 'spec_backed',
          spec_id: 'docs/spec.md',
          spec_review: 'skip'
        }
      }),
      issueOf({ id: 'UI-inel', labels: ['worker-ineligible'] }),
      issueOf({
        id: 'UI-child',
        dependencies: [{ id: 'UI-parent', dependency_type: 'parent-child' }]
      })
    ]);

    expect(result.targets.map((t) => t.id).sort()).toEqual([
      'UI-ok',
      'UI-plan'
    ]);
    const reasons = Object.fromEntries(
      result.excluded.map((e) => [e.id, e.reason])
    );
    expect(reasons['UI-closed']).toBe('closed');
    expect(reasons['UI-quick']).toBe('route');
    expect(reasons['UI-noroute']).toBe('route');
    expect(reasons['UI-nospec']).toBe('spec_missing');
    expect(reasons['UI-noreview']).toBe('spec_review');
    expect(reasons['UI-badreview']).toBe('spec_review');
    expect(reasons['UI-inel']).toBe('worker_ineligible');
    expect(reasons['UI-child']).toBe('phase_child');
  });

  test('prefers native spec_id over legacy metadata and flags conflicts', () => {
    const result = qualifyTargets([
      issueOf({
        id: 'UI-native',
        spec_id: 'docs/native.md',
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
      }),
      issueOf({
        id: 'UI-both',
        spec_id: 'docs/native.md',
        metadata: {
          route: 'spec_backed',
          spec_id: 'docs/legacy.md',
          spec_review: RECEIPT
        }
      })
    ]);

    const by_id = Object.fromEntries(result.targets.map((t) => [t.id, t]));
    expect(by_id['UI-native'].spec_id).toBe('docs/native.md');
    const reasons = Object.fromEntries(
      result.excluded.map((e) => [e.id, e.reason])
    );
    expect(reasons['UI-both']).toBe('spec_conflict');
  });

  test('bundles a plan only from the safe docs markdown allowlist', () => {
    const result = qualifyTargets([
      issueOf({
        id: 'UI-safe',
        metadata: {
          route: 'full_plan',
          spec_id: 'docs/spec.md',
          spec_review: RECEIPT,
          plan_path: 'docs/plans/p.md'
        }
      }),
      issueOf({
        id: 'UI-source',
        metadata: {
          route: 'full_plan',
          spec_id: 'docs/spec.md',
          spec_review: RECEIPT,
          plan_path: 'server/worker/queue-store.js'
        }
      }),
      issueOf({
        id: 'UI-escape',
        metadata: {
          route: 'full_plan',
          spec_id: 'docs/spec.md',
          spec_review: RECEIPT,
          plan_path: 'docs/../.git/config'
        }
      })
    ]);

    const by_id = Object.fromEntries(result.targets.map((t) => [t.id, t]));
    expect(by_id['UI-safe'].plan_path).toBe('docs/plans/p.md');
    expect(by_id['UI-source'].plan_path).toBeNull();
    expect(by_id['UI-escape'].plan_path).toBeNull();
  });
});

describe('parallel-analysis target picker', () => {
  test('lists qualified and open excluded issues with lane overlays', () => {
    const result = describeAnalysisTargets(
      [
        issueOf({ id: 'UI-qualified' }),
        issueOf({
          id: 'UI-excluded',
          metadata: { route: 'quick_fix' }
        }),
        issueOf({ id: 'UI-closed', status: 'closed' })
      ],
      {
        queue: [{ bead_id: 'UI-qualified' }],
        serial_lanes: []
      }
    );

    expect(result.qualified[0]).toMatchObject({
      id: 'UI-qualified',
      lane: 'parallel'
    });
    expect(result.excluded).toEqual([
      expect.objectContaining({
        id: 'UI-excluded',
        reason: 'route',
        lane: null
      })
    ]);
  });
});

describe('parallel-analysis scope overlap', () => {
  test('detects equal and directory-prefix items after trailing slash normalization', () => {
    expect(scopeItemsOverlap('server/worker', 'server/worker')).toBe(true);
    expect(scopeItemsOverlap('server/worker/', 'server/worker/queue.js')).toBe(
      true
    );
    expect(scopeItemsOverlap('server/worker', 'server/worker-x.js')).toBe(
      false
    );
  });

  test('returns sorted pairwise overlaps and excludes unknown scopes', () => {
    const overlaps = calculateScopeOverlaps({
      'UI-c': { scope: [] },
      'UI-b': { scope: ['server/worker/queue.js', 'app/views'] },
      'UI-a': { scope: ['server/', 'app/views/worker'] }
    });

    expect(overlaps).toEqual([
      {
        pair: ['UI-a', 'UI-b'],
        prefixes: ['app/views/worker', 'server/worker/queue.js']
      }
    ]);
  });
});

describe('parallel-analysis snapshot (UI-04vo seam F)', () => {
  const blobs = {
    [`${BASE.sha}:docs/spec.md`]: { oid: 'c'.repeat(40), bytes: 120 }
  };

  /**
   * @param {any} over
   */
  function input(over = {}) {
    return {
      workspace: '/ws/a',
      issues: [issueOf()],
      queue: { queue: [], serial_lanes: [], pr_wait: [], attempts: {} },
      base: BASE,
      gitRun: gitRunOf(blobs),
      ...over
    };
  }

  test('pins base, sorted target ids, artifact oids, and the prompt version', async () => {
    const result = await collectAnalysisSnapshot(
      input({
        issues: [issueOf({ id: 'UI-b' }), issueOf({ id: 'UI-a' })]
      })
    );

    expect(result.ok).toBe(true);
    const snap = result.snapshot;
    expect(snap.base_sha).toBe(BASE.sha);
    expect(snap.prompt_schema_version).toBe(PROMPT_SCHEMA_VERSION);
    expect(PROMPT_SCHEMA_VERSION).toBe(3);
    expect(snap.target_ids).toEqual(['UI-a', 'UI-b']);
    expect(snap.targets['UI-a'].artifacts[0]).toMatchObject({
      path: 'docs/spec.md',
      kind: 'spec',
      oid: 'c'.repeat(40),
      bytes: 120
    });
    expect(snap.targets['UI-a'].scope).toEqual([]);
    expect(snap.scope_overlaps).toEqual([]);
    expect(typeof snap.digest).toBe('string');
    expect(snap.digest).toHaveLength(64);
  });

  test('keeps lane placement and live labels out of the digest', async () => {
    const first = await collectAnalysisSnapshot(input());
    const second = await collectAnalysisSnapshot(
      input({
        queue: {
          queue: [],
          serial_lanes: [{ id: 's1', entries: [{ bead_id: 'UI-t1' }] }],
          pr_wait: [],
          attempts: {}
        }
      })
    );

    expect(first.snapshot.digest).toBe(second.snapshot.digest);
    expect(second.snapshot.overlay.lanes['UI-t1']).toBe('s1');
  });

  test('changes the digest when an artifact blob changes', async () => {
    const first = await collectAnalysisSnapshot(input());
    const second = await collectAnalysisSnapshot(
      input({
        gitRun: gitRunOf({
          [`${BASE.sha}:docs/spec.md`]: { oid: 'd'.repeat(40), bytes: 121 }
        })
      })
    );

    expect(first.snapshot.digest).not.toBe(second.snapshot.digest);
  });

  test('unions spec and plan scopes and records deterministic overlaps', async () => {
    const spec_a = 'docs/a.md';
    const plan_a = 'docs/plan-a.md';
    const spec_b = 'docs/b.md';
    const gitRun = gitRunOf({
      [`${BASE.sha}:${spec_a}`]: {
        oid: 'a'.repeat(40),
        bytes: 80,
        content: '---\nscope:\n  - server/worker\n---\n'
      },
      [`${BASE.sha}:${plan_a}`]: {
        oid: 'b'.repeat(40),
        bytes: 80,
        content: '---\nscope:\n  - app/views\n  - server/worker\n---\n'
      },
      [`${BASE.sha}:${spec_b}`]: {
        oid: 'c'.repeat(40),
        bytes: 80,
        content:
          '---\nscope:\n  - server/worker/queue-store.js\n  - docs\n---\n'
      }
    });
    const issues = [
      issueOf({
        id: 'UI-a',
        metadata: {
          route: 'full_plan',
          spec_id: spec_a,
          plan_path: plan_a,
          spec_review: RECEIPT
        }
      }),
      issueOf({
        id: 'UI-b',
        metadata: {
          route: 'spec_backed',
          spec_id: spec_b,
          spec_review: RECEIPT
        }
      })
    ];

    const result = await collectAnalysisSnapshot(input({ issues, gitRun }));

    expect(result.snapshot.targets['UI-a'].scope).toEqual([
      'app/views',
      'server/worker'
    ]);
    expect(result.snapshot.targets['UI-b'].scope).toEqual([
      'docs',
      'server/worker/queue-store.js'
    ]);
    expect(result.snapshot.scope_overlaps).toEqual([
      {
        pair: ['UI-a', 'UI-b'],
        prefixes: ['server/worker/queue-store.js']
      }
    ]);
  });

  test('changes the digest when declared scope changes with stable blob metadata', async () => {
    const first = await collectAnalysisSnapshot(
      input({
        gitRun: gitRunOf({
          [`${BASE.sha}:docs/spec.md`]: {
            oid: 'c'.repeat(40),
            bytes: 120,
            content: '---\nscope:\n  - server\n---\n'
          }
        })
      })
    );
    const second = await collectAnalysisSnapshot(
      input({
        gitRun: gitRunOf({
          [`${BASE.sha}:docs/spec.md`]: {
            oid: 'c'.repeat(40),
            bytes: 120,
            content: '---\nscope:\n  - app\n---\n'
          }
        })
      })
    );

    expect(first.snapshot.digest).not.toBe(second.snapshot.digest);
  });

  test('downgrades artifact content read failures to an empty scope', async () => {
    const result = await collectAnalysisSnapshot(
      input({
        gitRun: gitRunOf({
          [`${BASE.sha}:docs/spec.md`]: {
            oid: 'c'.repeat(40),
            bytes: 120,
            content_error: true
          }
        })
      })
    );

    expect(result.ok).toBe(true);
    expect(result.snapshot.targets['UI-t1'].scope).toEqual([]);
    expect(result.snapshot.scope_overlaps).toEqual([]);
  });

  test('folds active lineages into context but never into submit targets', async () => {
    const result = await collectAnalysisSnapshot(
      input({
        queue: {
          queue: [{ bead_id: 'UI-t1' }],
          serial_lanes: [],
          pr_wait: [{ bead_id: 'UI-pr' }],
          attempts: {
            r1: { attempt_id: 'r1', bead_id: 'UI-run', status: 'running' }
          }
        }
      })
    );

    expect(result.ok).toBe(true);
    expect(result.snapshot.context.active_lineages.sort()).toEqual([
      'UI-pr',
      'UI-run'
    ]);
    expect(result.snapshot.target_ids).toEqual(['UI-t1']);
  });

  test('fails closed when the required spec blob cannot be read', async () => {
    const result = await collectAnalysisSnapshot(
      input({ gitRun: gitRunOf({}) })
    );

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('artifact_unreadable');
  });

  test('fails closed without a pinned base', async () => {
    const result = await collectAnalysisSnapshot(
      input({ base: { ref: 'main', sha: null } })
    );

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('base_unresolved');
  });

  test('reports an empty target set distinctly', async () => {
    const result = await collectAnalysisSnapshot(input({ issues: [] }));

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('no_targets');
  });

  test('pins only a requested qualified subset', async () => {
    const all = await collectAnalysisSnapshot(
      input({ issues: [issueOf({ id: 'UI-a' }), issueOf({ id: 'UI-b' })] })
    );

    const subset = await collectAnalysisSnapshot(
      input({
        issues: [issueOf({ id: 'UI-a' }), issueOf({ id: 'UI-b' })],
        target_ids: ['UI-b']
      })
    );

    expect(subset.snapshot.target_ids).toEqual(['UI-b']);
    expect(subset.snapshot.digest).not.toBe(all.snapshot.digest);
  });

  test('rejects every unqualified requested id without intersecting', async () => {
    const result = await collectAnalysisSnapshot(
      input({
        issues: [
          issueOf({ id: 'UI-a' }),
          issueOf({ id: 'UI-x', status: 'closed' })
        ],
        target_ids: ['UI-a', 'UI-x', 'UI-missing']
      })
    );

    expect(result.reason).toBe('target_not_qualified');
    expect(result.detail).toEqual(['UI-x', 'UI-missing']);
  });

  test('rejects an empty requested subset', async () => {
    const result = await collectAnalysisSnapshot(input({ target_ids: [] }));

    expect(result.reason).toBe('no_targets');
  });
});
