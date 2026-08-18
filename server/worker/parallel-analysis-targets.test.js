import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  PROMPT_SCHEMA_VERSION,
  collectAnalysisSnapshot,
  qualifyTargets
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
 * @param {Record<string, { oid: string, bytes: number }>} blobs - keyed by
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
    expect(snap.target_ids).toEqual(['UI-a', 'UI-b']);
    expect(snap.targets['UI-a'].artifacts[0]).toMatchObject({
      path: 'docs/spec.md',
      kind: 'spec',
      oid: 'c'.repeat(40),
      bytes: 120
    });
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
});
