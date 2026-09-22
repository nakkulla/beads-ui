import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test, vi } from 'vitest';
import {
  DEFAULT_PROBLEM_CRITERIA,
  PROBLEM_KEYS,
  normalizeProblemCriteria
} from '../../app/utils/compare-problem-criteria.js';
import { createExecPresetStore } from '../exec-preset-store.js';
import { createBeadTimeline } from './bead-timeline.js';
import {
  buildCompareModel,
  collectCompareWorkspaces,
  compareBenchRuns,
  compareIssueIndex,
  compareSnapshot,
  compareVerifyReceipts,
  implActorOf,
  isRetryAttempt,
  medianOf,
  normalizeCompareFilters,
  passCaret,
  prepareCompareSnapshot,
  presetMatch,
  projectBenchRun,
  retryKindOf
} from './compare-projection.js';
import { createExecPresetCoordinator } from './exec-preset-coordinator.js';
import { TERMINAL_ATTEMPT_STATUSES, createQueueStore } from './queue-store.js';
import { resolveCatalog } from './runner-catalog.js';
import * as worker_runtime from './runtime.js';

const SHA = 'a'.repeat(40);

/**
 * @param {Record<string, any>} [overrides]
 * @returns {Record<string, any>}
 */
function makeAttempt(overrides = {}) {
  return {
    attempt_id: 'at-1',
    bead_id: 'UI-1',
    kind: 'implementation',
    status: 'done',
    started_at: 1_000,
    finished_at: 61_000,
    runner: 'claude',
    model: 'claude-opus-5',
    effort: 'high',
    exec_values: {
      impl_review_model: 'gpt-5.6-sol',
      impl_review_effort: 'high',
      impl_review_speed: 'default'
    },
    receipt_check: {
      checks: {
        exec_receipt: {
          kind: 'delegated',
          actor: 'gpt-5.6-sol',
          effort: 'high',
          sha: SHA
        }
      }
    },
    usage: null,
    usage_legs: [],
    ...overrides
  };
}

/**
 * @param {Record<string, any>} [overrides]
 * @returns {any}
 */
function makeIssue(overrides = {}) {
  return {
    title: '제목',
    issue_type: 'task',
    route: 'quick_fix',
    labels: [],
    impl_review_stats: null,
    ...overrides
  };
}

/**
 * @param {Record<string, any>} [overrides]
 * @returns {any}
 */
function makeWorkspace(overrides = {}) {
  return {
    root_dir: '/repo/one',
    name: 'one',
    attempts: [],
    issues: {},
    verify_receipts: {},
    ...overrides
  };
}

/** @type {any} */
const CATALOG = {
  runners: {
    claude: { models: { opus: { id: 'claude-opus-5' } } },
    codex: {
      models: { sol: { id: 'gpt-5.6-sol' }, terra: { id: 'gpt-5.6-terra' } }
    }
  },
  model_index: { opus: 'claude', sol: 'codex', terra: 'codex' }
};

/**
 * A multi-unit receipt whose units name the given actors in order, each at
 * effort `high` so only the actor axis splits.
 *
 * @param {string[]} actors
 * @returns {Record<string, any>}
 */
function mixedReceipt(actors) {
  return {
    checks: {
      units: actors.map((actor, index) => ({
        unit: `u${index + 1}`,
        kind: 'delegated',
        actor,
        effort: 'high',
        sha: SHA
      }))
    }
  };
}

/** @param {Record<string, any>} [settings] */
function makePreset(settings = {}) {
  return {
    id: 'p1',
    name: '기본',
    settings: {
      orchestration_model: 'opus',
      orchestration_effort: 'high',
      impl_runtime: 'codex',
      impl_model: 'sol',
      ...settings
    }
  };
}

/** @param {Record<string, any>} [overrides] */
function makeFacts(overrides = {}) {
  return {
    route: 'spec_backed',
    orch_model: 'claude-opus-5',
    orch_effort: 'high',
    impl_actor: implActorOf(makeAttempt().receipt_check),
    ...overrides
  };
}

describe('worker/compare-projection executor', () => {
  test('reads the preserved executor from a parsed receipt', () => {
    const actor = implActorOf(makeAttempt().receipt_check);

    expect(actor).toEqual({
      kind: 'delegated',
      model: 'gpt-5.6-sol',
      effort: 'high',
      label: 'gpt-5.6-sol/high'
    });
  });

  test('parses a legacy receipt in the same slot', () => {
    const actor = implActorOf({
      checks: { exec_receipt: `delegated:gpt-5.6-sol:high@${SHA}` }
    });

    expect(actor.label).toBe('gpt-5.6-sol/high');
  });

  test('collapses main receipt reasons into main', () => {
    const actor = implActorOf({
      checks: { exec_receipt: { kind: 'main', actor: 'quick_fix_default' } }
    });

    expect(actor).toEqual({
      kind: 'main',
      model: null,
      effort: null,
      label: 'main'
    });
  });

  test('keeps missing receipts unrecorded', () => {
    const actor = implActorOf(null);

    expect(actor.kind).toBe('missing');
  });

  test('keeps agreeing multi-unit executors as one delegated actor', () => {
    const actor = implActorOf({
      checks: {
        units: [
          { unit: 'u1', kind: 'delegated', actor: 'sol', effort: 'high' },
          { unit: 'u2', kind: 'delegated', actor: 'sol', effort: 'high' }
        ]
      }
    });

    expect(actor).toEqual({
      kind: 'delegated',
      model: 'sol',
      effort: 'high',
      label: 'sol/high'
    });
  });

  test('names a main and delegated split as two-kind mixed', () => {
    const actor = implActorOf({
      checks: {
        units: [
          { unit: 'u1', kind: 'delegated', actor: 'sol', effort: 'high' },
          { unit: 'u2', kind: 'main', actor: 'bead' }
        ]
      }
    });

    expect(actor).toEqual({
      kind: 'mixed',
      model: null,
      effort: null,
      label: '혼합 2종',
      parts: [
        { unit: 'u1', label: 'sol/high' },
        { unit: 'u2', label: 'main' }
      ]
    });
  });

  test('keeps the shared model when only effort splits', () => {
    const actor = implActorOf({
      checks: {
        units: [
          { unit: 'u1', kind: 'delegated', actor: 'sol', effort: 'high' },
          { unit: 'u2', kind: 'delegated', actor: 'sol', effort: 'xhigh' },
          { unit: 'u3', kind: 'delegated', actor: 'sol', effort: 'high' }
        ]
      }
    });

    expect(actor).toMatchObject({
      kind: 'mixed',
      model: 'sol',
      effort: null,
      label: 'sol/혼합'
    });
  });

  test('counts distinct unit executors when models split', () => {
    const actor = implActorOf({
      checks: {
        units: [
          { unit: 'u1', kind: 'delegated', actor: 'sol', effort: 'high' },
          { unit: 'u2', kind: 'delegated', actor: 'terra', effort: 'medium' },
          { unit: 'u3', kind: 'delegated', actor: 'opus', effort: 'default' },
          { unit: 'u4', kind: 'delegated', actor: 'opus', effort: 'default' }
        ]
      }
    });

    expect(actor.label).toBe('혼합 3종');
    expect(actor.parts).toHaveLength(4);
  });

  test('keeps a malformed unit unrecorded rather than mixed', () => {
    const actor = implActorOf({
      checks: {
        units: [
          { unit: 'u1', kind: 'delegated', actor: 'sol', effort: 'high' },
          { unit: 'u2', malformed: true }
        ]
      }
    });

    expect(actor.kind).toBe('missing');
  });
});

describe('worker/compare-projection preset inference', () => {
  test('normalizes model ids and names before matching both axes', () => {
    const match = presetMatch(makeFacts(), [makePreset()], CATALOG);

    expect(match).toEqual({
      preset: { id: 'p1', name: '기본', basis: 'inferred' },
      candidates: ['기본']
    });
  });

  test('prefers a catalog name over a colliding model id', () => {
    const catalog = {
      ...CATALOG,
      runners: {
        ...CATALOG.runners,
        legacy: { models: { old: { id: 'sol' } } }
      }
    };

    const match = presetMatch(makeFacts(), [makePreset()], catalog);

    expect(match.preset?.id).toBe('p1');
  });

  test('compares unknown model values literally without a catalog', () => {
    const match = presetMatch(
      makeFacts(),
      [
        makePreset({
          orchestration_model: 'claude-opus-5',
          impl_runtime: 'auto',
          impl_model: 'gpt-5.6-sol'
        })
      ],
      null
    );

    expect(match.preset?.id).toBe('p1');
  });

  test('matches a quick fix preset by its canonical keys', () => {
    const preset = { ...makePreset(), applies_to: 'quick_fix' };

    const match = presetMatch(
      makeFacts({ route: 'quick_fix' }),
      [preset],
      CATALOG
    );

    expect(match.preset?.id).toBe('p1');
  });

  test('matches a general preset the bench clone ran under a quick_fix route', () => {
    const preset = { ...makePreset(), applies_to: 'general' };

    const match = presetMatch(
      makeFacts({ route: 'quick_fix' }),
      [preset],
      CATALOG
    );

    expect(match.preset?.id).toBe('p1');
  });

  test('reads no prefixed key, which no profile stores in a preset', () => {
    const preset = makePreset({
      impl_model: 'sol',
      quick_fix_impl_model: 'terra'
    });

    const match = presetMatch(
      makeFacts({ route: 'quick_fix' }),
      [preset],
      CATALOG
    );

    expect(match.preset?.id).toBe('p1');
  });

  test('accepts auto wildcards for delegated implementation keys', () => {
    const match = presetMatch(
      makeFacts(),
      [makePreset({ impl_runtime: 'auto', impl_model: 'auto' })],
      CATALOG
    );

    expect(match.preset?.id).toBe('p1');
  });

  test('rejects a runtime that disagrees with the catalog actor', () => {
    const match = presetMatch(
      makeFacts(),
      [makePreset({ impl_runtime: 'claude' })],
      CATALOG
    );

    expect(match).toEqual({ preset: null, candidates: [] });
  });

  test.each(['main', 'missing'])(
    'ignores implementation keys for a %s executor',
    (kind) => {
      const impl_actor = { kind, model: null, effort: null, label: kind };

      const match = presetMatch(
        makeFacts({ impl_actor }),
        [
          makePreset({
            impl_runtime: 'wrong',
            impl_model: 'wrong',
            impl_review_model: 'unrecorded'
          })
        ],
        CATALOG
      );

      expect(match.preset?.id).toBe('p1');
    }
  );

  test('ignores unrecorded orchestration effort and reviewer settings', () => {
    const match = presetMatch(
      makeFacts({ orch_effort: null }),
      [
        makePreset({
          orchestration_effort: 'low',
          spec_review_model: 'wrong',
          orchestration_speed: 'fast'
        })
      ],
      CATALOG
    );

    expect(match.preset?.id).toBe('p1');
  });

  test('rejects a different recorded orchestration effort', () => {
    const match = presetMatch(
      makeFacts(),
      [makePreset({ orchestration_effort: 'low' })],
      CATALOG
    );

    expect(match.preset).toBeNull();
  });

  test('chooses the unique most specific candidate independent of storage order', () => {
    const loose = {
      ...makePreset({ impl_runtime: 'auto', impl_model: 'auto' }),
      id: 'loose',
      name: '자동'
    };

    const match = presetMatch(makeFacts(), [loose, makePreset()], CATALOG);

    expect(match).toEqual({
      preset: { id: 'p1', name: '기본', basis: 'inferred' },
      candidates: ['자동', '기본']
    });
  });

  test('keeps every matching candidate when top specificity ties', () => {
    const presets = [
      makePreset(),
      {
        ...makePreset({ impl_review_model: 'other' }),
        id: 'p2',
        name: '다른 리뷰어'
      }
    ];

    const match = presetMatch(makeFacts(), presets, CATALOG);

    expect(match).toEqual({
      preset: null,
      candidates: ['기본', '다른 리뷰어']
    });
  });

  test('returns no candidates when orchestration is missing or mismatched', () => {
    const match = presetMatch(
      makeFacts({ orch_model: null }),
      [makePreset()],
      CATALOG
    );

    expect(match).toEqual({ preset: null, candidates: [] });
  });

  test('uses recorded identity and current name despite execution deviations', () => {
    const model = buildCompareModel({
      catalog: CATALOG,
      presets: [makePreset()],
      workspaces: [
        makeWorkspace({
          attempts: [
            makeAttempt({
              model: 'other',
              exec_preset: {
                id: 'p1',
                name: '옛 이름',
                revision: 1,
                deviated_keys: ['impl_model']
              }
            })
          ]
        })
      ]
    });

    expect(model.rows[0].preset).toEqual({
      id: 'p1',
      name: '기본',
      basis: 'recorded',
      deviated_keys: ['impl_model']
    });
    expect(model.groups[0]).toMatchObject({
      key: 'preset:p1',
      name: '기본',
      badge: 'preset'
    });
  });

  test('labels a deleted recorded preset without inferring another identity', () => {
    const model = buildCompareModel({
      catalog: CATALOG,
      presets: [makePreset()],
      workspaces: [
        makeWorkspace({
          attempts: [
            makeAttempt({
              exec_preset: {
                id: 'deleted',
                name: '삭제된 이름',
                revision: 1,
                deviated_keys: []
              }
            })
          ]
        })
      ]
    });

    expect(model.rows[0].preset).toEqual({
      id: 'deleted',
      name: '삭제된 이름(삭제됨)',
      basis: 'recorded',
      deviated_keys: []
    });
  });

  test('carries inferred basis and empty deviation keys on a matched row', () => {
    const model = buildCompareModel({
      catalog: CATALOG,
      presets: [makePreset()],
      workspaces: [makeWorkspace({ attempts: [makeAttempt()] })]
    });

    expect(model.rows[0].preset).toEqual({
      id: 'p1',
      name: '기본',
      basis: 'inferred',
      deviated_keys: []
    });
    expect(model.rows[0]).not.toHaveProperty('preset_candidates');
  });

  test('keeps ambiguous candidate names on unmatched rows', () => {
    const model = buildCompareModel({
      catalog: CATALOG,
      presets: [makePreset(), { ...makePreset(), id: 'p2', name: '둘째' }],
      workspaces: [makeWorkspace({ attempts: [makeAttempt()] })]
    });

    expect(model.rows[0].preset).toBeNull();
    expect(model.rows[0].preset_candidates).toEqual(['기본', '둘째']);
    expect(model.groups[0].badge).toBe('unmatched');
  });

  test('disables even recorded matches when the preset store is unreadable', () => {
    const model = buildCompareModel({
      warnings: ['preset_store_unreadable'],
      presets: [makePreset()],
      workspaces: [
        makeWorkspace({
          attempts: [
            makeAttempt({
              exec_preset: {
                id: 'p1',
                name: '기본',
                revision: 1,
                deviated_keys: []
              }
            })
          ]
        })
      ]
    });

    expect(model.rows[0].preset).toBeNull();
    expect(model.rows[0].preset_candidates).toEqual([]);
    expect(model.warnings).toEqual(['preset_store_unreadable']);
  });
});

describe('worker/compare-projection merge-candidate verify receipts', () => {
  /** @type {{ declaration_state: 'present'|'absent'|'invalid', base_sha: string|null }} */
  const PRESENT = { declaration_state: 'present', base_sha: 'b'.repeat(40) };

  /**
   * @param {Record<string, any>} entry
   * @param {{ declaration_state: 'present'|'absent'|'invalid', base_sha: string|null }} [policy]
   */
  function receipts(entry, policy = PRESENT) {
    return compareVerifyReceipts('/repo', {
      prObservations: { snapshot: () => ({ 'UI-1': entry }) },
      verifyPolicy: policy
    });
  }

  test('takes a receipt bound to the current base and head', () => {
    expect(
      receipts({
        pr: { head_sha: 'c'.repeat(40) },
        verify: {
          ok: true,
          effective_base_sha: 'b'.repeat(40),
          head_sha: 'c'.repeat(40)
        }
      })
    ).toEqual({ 'UI-1': { ok: true } });
  });

  test('drops a receipt produced at a different base', () => {
    expect(
      receipts({
        pr: { head_sha: 'c'.repeat(40) },
        verify: {
          ok: true,
          effective_base_sha: 'd'.repeat(40),
          head_sha: 'c'.repeat(40)
        }
      })
    ).toEqual({});
  });

  test('drops a receipt whose head is no longer the candidate head', () => {
    expect(
      receipts({
        pr: { head_sha: 'e'.repeat(40) },
        verify: {
          ok: true,
          effective_base_sha: 'b'.repeat(40),
          head_sha: 'c'.repeat(40)
        }
      })
    ).toEqual({});
  });

  test('reports nothing when the workspace declares no verify lane', () => {
    expect(
      receipts(
        {
          pr: { head_sha: 'c'.repeat(40) },
          verify: {
            ok: true,
            effective_base_sha: 'b'.repeat(40),
            head_sha: 'c'.repeat(40)
          }
        },
        { declaration_state: 'absent', base_sha: null }
      )
    ).toEqual({});
  });
});

describe('worker/compare-projection bench runs', () => {
  const MANIFEST = {
    run_id: 'bench-1',
    source_bead_id: 'UI-src',
    created_at: 10,
    cells: [
      { preset_id: 'p1', k: 1, bead_id: 'UI-c1' },
      { preset_id: 'p1', k: 2, bead_id: 'UI-c2' }
    ]
  };

  /**
   * @param {Record<string, any[]>} rows
   */
  function fakeStore(rows) {
    return {
      /**
       * @param {string} root_dir
       * @param {string} bead_id
       */
      readAttemptsForBead(root_dir, bead_id) {
        return rows[bead_id] ?? [];
      }
    };
  }

  test('counts only the cells whose bead is closed and whose lineage ended', () => {
    const run = projectBenchRun(MANIFEST, '/repo', {
      queueStore: fakeStore({
        'UI-c1': [{ attempt_id: 'a1', status: 'done', done_kind: 'bench' }],
        'UI-c2': [{ attempt_id: 'a2', status: 'running' }]
      }),
      issues: {
        'UI-c1': makeIssue({ status: 'closed' }),
        'UI-c2': makeIssue({ status: 'open' })
      }
    });

    expect(run.cell_count).toBe(2);
    expect(run.terminal_count).toBe(1);
    expect(run.cells[0]).toMatchObject({
      bead_id: 'UI-c1',
      attempt_id: 'a1',
      status: 'done',
      terminal: true
    });
  });

  test('reports a parked cell as still running even with a closed bead', () => {
    const run = projectBenchRun(MANIFEST, '/repo', {
      queueStore: fakeStore({
        'UI-c1': [{ attempt_id: 'a1', status: 'parked' }]
      }),
      issues: { 'UI-c1': makeIssue({ status: 'closed' }) }
    });

    expect(run.cells[0].terminal).toBe(false);
  });

  test('ignores a review session when picking the cell attempt', () => {
    const run = projectBenchRun(MANIFEST, '/repo', {
      queueStore: fakeStore({
        'UI-c1': [
          { attempt_id: 'a1', status: 'done' },
          { attempt_id: 'r1', status: 'done', kind: 'review_session' }
        ]
      })
    });

    expect(run.cells[0].attempt_id).toBe('a1');
  });

  test('carries the cell verify score and the manifest fields it was given', () => {
    const run = projectBenchRun(MANIFEST, '/repo', {
      queueStore: fakeStore({
        'UI-c1': [
          {
            attempt_id: 'a1',
            status: 'done',
            bench_verify: { ok: false, exit: 1, duration_ms: 5, head_sha: 'a' }
          }
        ]
      })
    });

    expect(run.cells[0].bench_verify).toEqual({
      ok: false,
      exit: 1,
      duration_ms: 5,
      head_sha: 'a'
    });
    expect(run.run_id).toBe('bench-1');
    expect(run.root_dir).toBe('/repo');
  });

  test('lists every workspace manifest newest first', () => {
    const runs = compareBenchRuns(
      [makeWorkspace(), makeWorkspace({ root_dir: '/repo/two', name: 'two' })],
      {
        queueStore: fakeStore({}),
        /**
         * @param {string} root_dir
         */
        list: (root_dir) => [
          {
            ...MANIFEST,
            run_id: `run-${root_dir}`,
            created_at: root_dir.endsWith('two') ? 99 : 10
          }
        ]
      }
    );

    expect(runs.map((run) => run.run_id)).toEqual([
      'run-/repo/two',
      'run-/repo/one'
    ]);
  });
});

describe('worker/compare-projection verify source', () => {
  test('takes 통과 from the merge candidate [verify] receipt of the last success', () => {
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({
          attempts: [makeAttempt()],
          issues: { 'UI-1': makeIssue() },
          verify_receipts: { 'UI-1': { ok: true } }
        })
      ],
      filters: { since: null }
    });

    expect(model.rows[0].verify).toBe('pass');
    expect(model.rows[0]).not.toHaveProperty('verify_source');
  });

  test('takes a bench clone verdict from bench_verify', () => {
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({
          attempts: [makeAttempt({ bench_verify: { ok: false } })],
          issues: { 'UI-1': makeIssue() }
        })
      ],
      filters: { include_bench: true }
    });

    expect(model.rows[0].verify).toBe('fail');
    expect(model.bench_rows[0].verify_source).toBe('bench_verify');
    expect(model.bench_rows[0].verify).toBe('fail');
  });

  test('keeps verification evidence separate from landing evidence', () => {
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({
          attempts: [
            makeAttempt(),
            makeAttempt({
              attempt_id: 'at-2',
              bead_id: 'UI-2',
              finished_at: 71_000
            })
          ],
          issues: { 'UI-1': makeIssue(), 'UI-2': makeIssue() },
          verify_receipts: { 'UI-1': { ok: true } }
        })
      ]
    });

    expect(model.groups).toHaveLength(1);
    expect(model.groups[0].landing_rate).toBeNull();
    expect(model.groups[0].judged).toBe(0);
    expect(model.groups[0].in_flight).toBe(2);
  });

  test('excludes review_session and retired_kind attempts entirely', () => {
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({
          attempts: [
            makeAttempt({ attempt_id: 'at-r', kind: 'review_session' }),
            makeAttempt({ attempt_id: 'at-x', kind: 'retired_kind' }),
            makeAttempt({ attempt_id: 'at-run', status: 'running' })
          ]
        })
      ]
    });

    expect(model.rows).toEqual([]);
  });
});

describe('worker/compare-projection retries', () => {
  test.each([
    [{ retry: { origin_attempt_id: 'origin' } }, 'env_ladder'],
    [
      { resumed_from: 'origin', auto_resume_kind: 'provider_outage' },
      'auto_resume'
    ],
    [
      { resumed_from: 'origin', auto_resume_kind: 'account_switch' },
      'auto_resume'
    ],
    [{ resumed_from: 'origin' }, 'resume'],
    [{}, null]
  ])('classifies retry kind from %j', (fields, expected) => {
    const attempt = makeAttempt(fields);

    expect(retryKindOf(attempt)).toBe(expected);
    expect(isRetryAttempt(attempt)).toBe(expected !== null);
  });

  test('includes environmental retry evidence only when enabled', () => {
    const attempt = makeAttempt({
      retry: { origin_attempt_id: 'origin', cause: 'capacity' }
    });
    const excluded = projectAttempts([attempt]);
    const included = projectAttempts(
      [attempt],
      {},
      {
        problem_criteria: { retry: { include_env: true } }
      }
    );

    expect(excluded.rows[0].problems.retry).toBe(false);
    expect(included.rows[0].problems.evidence.retry).toEqual({
      origin: 'origin',
      kind: 'env_ladder',
      cause: 'capacity',
      env: true
    });
  });

  test('marks a row a retry from its own origin, not the lineage rung count', () => {
    expect(
      isRetryAttempt(
        makeAttempt({ retry: { attempts: 3, origin_attempt_id: 'at-0' } })
      )
    ).toBe(true);
    expect(isRetryAttempt(makeAttempt({ resumed_from: 'at-0' }))).toBe(true);
    expect(isRetryAttempt(makeAttempt({ retry: { attempts: 3 } }))).toBe(false);
  });

  test('counts retry ROWS rather than summing retry.attempts', () => {
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({
          attempts: [
            makeAttempt({ attempt_id: 'at-1' }),
            makeAttempt({
              attempt_id: 'at-2',
              finished_at: 62_000,
              resumed_from: 'at-1',
              retry: { attempts: 2 }
            }),
            makeAttempt({
              attempt_id: 'at-3',
              finished_at: 63_000,
              resumed_from: 'at-2',
              retry: { attempts: 3 }
            })
          ]
        })
      ]
    });

    expect(model.groups[0].problems.retry).toBe(2);
  });
});

describe('worker/compare-projection configurable problems', () => {
  test('uses each review threshold independently', () => {
    const issue = makeIssue({
      impl_review_stats: { round: 1, blocking: 0, minor: 3 }
    });
    const model = projectAttempts(
      [makeAttempt()],
      { issues: { 'UI-1': issue } },
      {
        problem_criteria: {
          review: { round_min: null, blocking_min: null, minor_min: 3 }
        }
      }
    );

    expect(model.rows[0].problems.review).toBe(true);
  });

  test('copies verify source into evidence before wiring rows', () => {
    const model = projectAttempts([makeAttempt()], {
      issues: { 'UI-1': makeIssue() },
      verify_receipts: { 'UI-1': { ok: false } }
    });

    expect(model.rows[0]).not.toHaveProperty('verify_source');
    expect(model.rows[0].problems.evidence.verify).toBe('merge_verify');
  });

  test('activates relative baselines at five samples and keeps strict boundary', () => {
    const attempts = [1, 1, 1, 1, 3].map((factor, index) =>
      makeAttempt({
        attempt_id: `at-${index}`,
        bead_id: `UI-${index}`,
        started_at: 0,
        finished_at: factor * 1000
      })
    );
    const equal = projectAttempts(
      attempts,
      {},
      {
        problem_criteria: { duration: { factor: 3 } }
      }
    );
    const above = projectAttempts(
      attempts.map((attempt, index) =>
        index === 4 ? { ...attempt, finished_at: 3001 } : attempt
      ),
      {},
      { problem_criteria: { duration: { factor: 3 } } }
    );

    expect(equal.criteria.baselines.duration_ms).toMatchObject({
      median: 1000,
      sample: 5,
      active: true
    });
    expect(
      equal.rows.find((row) => row.attempt_id === 'at-4')?.problems.duration
    ).toBe(false);
    expect(
      above.rows.find((row) => row.attempt_id === 'at-4')?.problems.duration
    ).toBe(true);
  });

  test('keeps every problem false and rate null when every criterion is off', () => {
    const problem_criteria = Object.fromEntries(
      PROBLEM_KEYS.map((key) => [key, { on: false }])
    );
    const model = projectAttempts(
      [makeAttempt({ status: 'failed', resumed_from: 'origin' })],
      {},
      { problem_criteria }
    );

    expect(
      PROBLEM_KEYS.every((key) => model.rows[0].problems[key] === false)
    ).toBe(true);
    expect(model.summary.problem_rate).toBeNull();
  });

  test('keeps relative criteria false below the minimum sample', () => {
    const attempts = [0, 1, 2, 3].map((index) =>
      makeAttempt({
        attempt_id: `at-${index}`,
        bead_id: `UI-${index}`,
        started_at: 0,
        finished_at: index === 3 ? 90_000 : 1000
      })
    );
    const model = projectAttempts(attempts);

    expect(model.criteria.baselines.duration_ms.active).toBe(false);
    expect(model.criteria.baselines.cost_usd.active).toBe(false);
    expect(
      model.rows.every(
        (row) => row.problems.duration === false && row.problems.cost === false
      )
    ).toBe(true);
  });

  test('stays active on a zero median and judges any positive row', () => {
    const attempts = [0, 1, 2, 3, 4].map((index) =>
      makeAttempt({
        attempt_id: `at-${index}`,
        bead_id: `UI-${index}`,
        started_at: 0,
        finished_at: index === 4 ? 5000 : 0
      })
    );
    const model = projectAttempts(attempts);

    expect(model.criteria.baselines.duration_ms).toMatchObject({
      median: 0,
      active: true
    });
    expect(
      model.rows.find((row) => row.attempt_id === 'at-4')?.problems.duration
    ).toBe(true);
  });

  test('follows the factor a request asks for', () => {
    const attempts = [0, 1, 2, 3, 4].map((index) =>
      makeAttempt({
        attempt_id: `at-${index}`,
        bead_id: `UI-${index}`,
        started_at: 0,
        finished_at: index === 4 ? 5000 : 1000
      })
    );
    const tight = projectAttempts(
      attempts,
      {},
      {
        problem_criteria: { duration: { factor: 3 } }
      }
    );
    const loose = projectAttempts(
      attempts,
      {},
      {
        problem_criteria: { duration: { factor: 6 } }
      }
    );

    expect(
      tight.rows.find((row) => row.attempt_id === 'at-4')?.problems.duration
    ).toBe(true);
    expect(
      loose.rows.find((row) => row.attempt_id === 'at-4')?.problems.duration
    ).toBe(false);
  });

  test('keeps the cost boundary strict and judges a partial row too', () => {
    const catalog = resolveCatalog({
      overrides: {
        codex: { models: { priced: { price: { input: 1, output: 1 } } } }
      },
      warn: () => {}
    });
    /**
     * @param {number} index - Row ordinal.
     * @param {number} dollars - Priced leg cost in USD.
     * @param {boolean} partial - Adds an unpriced leg when true.
     */
    const costRow = (index, dollars, partial) =>
      makeAttempt({
        attempt_id: `at-${index}`,
        bead_id: `UI-${index}`,
        runner: 'codex',
        usage_segments: [
          { model: 'priced', usage: { input_tokens: dollars * 1_000_000 } },
          ...(partial
            ? [{ model: 'known-unpriced', usage: { input_tokens: 10 } }]
            : [])
        ]
      });
    /**
     * @param {number} last_cost - Cost of the fifth row in USD.
     * @param {boolean} partial - Makes that row partial when true.
     */
    const project = (last_cost, partial) =>
      buildCompareModel({
        catalog,
        workspaces: [
          makeWorkspace({
            attempts: [
              ...[0, 1, 2, 3].map((index) => costRow(index, 1, false)),
              costRow(4, last_cost, partial)
            ]
          })
        ]
      });
    const at_boundary = project(3, false);
    const above = project(4, true);

    expect(
      at_boundary.rows.find((row) => row.attempt_id === 'at-4')?.problems.cost
    ).toBe(false);
    const above_row = above.rows.find((row) => row.attempt_id === 'at-4');
    expect(above_row?.problems.cost).toBe(true);
    expect(above_row?.problems.evidence.cost.partial).toBe(true);
  });

  test('excludes an auto resume until the environment toggle is on', () => {
    const attempt = makeAttempt({
      resumed_from: 'origin',
      auto_resume_kind: 'provider_outage'
    });
    const excluded = projectAttempts([attempt]);
    const included = projectAttempts(
      [attempt],
      {},
      {
        problem_criteria: { retry: { include_env: true } }
      }
    );

    expect(excluded.rows[0].problems.retry).toBe(false);
    expect(included.rows[0].problems.evidence.retry).toEqual({
      origin: 'origin',
      kind: 'auto_resume',
      cause: 'provider_outage',
      env: true
    });
  });

  test('keeps verify false for a passing or missing receipt', () => {
    const passing = projectAttempts([makeAttempt()], {
      issues: { 'UI-1': makeIssue() },
      verify_receipts: { 'UI-1': { ok: true } }
    });
    const missing = projectAttempts([makeAttempt()], {
      issues: { 'UI-1': makeIssue() }
    });

    expect(passing.rows[0].problems.verify).toBe(false);
    expect(missing.rows[0].problems.verify).toBe(false);
  });

  test('judges pin deviation only when its criterion is on', () => {
    const attempt = makeAttempt({
      exec_preset: { id: 'p1', name: '프리셋', deviated_keys: ['impl_model'] }
    });
    const off = projectAttempts([attempt]);
    const on = projectAttempts(
      [attempt],
      {},
      {
        problem_criteria: { pin: { on: true } }
      }
    );

    expect(off.rows[0].problems.pin).toBe(false);
    expect(on.rows[0].problems.evidence.pin).toEqual(['impl_model']);
  });

  test('counts a session once when several criteria hold', () => {
    const model = projectAttempts([
      makeAttempt({ status: 'failed', resumed_from: 'origin' })
    ]);

    expect(model.summary.problems).toMatchObject({ failed: 1, retry: 1 });
    expect(model.summary.problem_count).toBe(1);
  });

  test('counts priced-but-partial rows inside the baseline sample', () => {
    const catalog = resolveCatalog({
      overrides: {
        codex: { models: { priced: { price: { input: 1, output: 1 } } } }
      },
      warn: () => {}
    });
    const attempts = [0, 1, 2, 3, 4].map((index) =>
      makeAttempt({
        attempt_id: `at-${index}`,
        bead_id: `UI-${index}`,
        runner: 'codex',
        usage_segments: [
          { model: 'priced', usage: { input_tokens: 1_000_000 } },
          ...(index < 2
            ? [{ model: 'known-unpriced', usage: { input_tokens: 10 } }]
            : [])
        ]
      })
    );
    const model = buildCompareModel({
      catalog,
      workspaces: [makeWorkspace({ attempts })]
    });

    expect(model.criteria.baselines.cost_usd).toMatchObject({
      median: 1,
      sample: 5,
      active: true,
      partial_count: 2
    });
  });

  test('recomputes the baseline from the filtered rows', () => {
    const attempts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) =>
      makeAttempt({
        attempt_id: `at-${index}`,
        bead_id: `UI-${index}`,
        started_at: 0,
        finished_at: index < 5 ? 1000 : 9000
      })
    );
    const all = projectAttempts(attempts);
    const recent = projectAttempts(attempts, {}, { since: 5000 });

    expect(all.criteria.baselines.duration_ms.median).toBe(5000);
    expect(recent.criteria.baselines.duration_ms.median).toBe(9000);
  });

  test('judges bench rows against the main table baselines', () => {
    const attempts = [0, 1, 2, 3, 4].map((index) =>
      makeAttempt({
        attempt_id: `at-${index}`,
        bead_id: `UI-${index}`,
        started_at: 0,
        finished_at: 1000
      })
    );
    const bench = makeAttempt({
      attempt_id: 'at-bench',
      bead_id: 'UI-bench',
      started_at: 0,
      finished_at: 10_000,
      bench_verify: { ok: true }
    });
    const model = projectAttempts([...attempts, bench]);

    expect(model.criteria.baselines.duration_ms.median).toBe(1000);
    expect(model.bench_rows[0].problems.duration).toBe(true);
  });

  test('returns normalized effective criteria and default state', () => {
    const model = projectAttempts(
      [makeAttempt()],
      {},
      {
        problem_criteria: { cost: { factor: 4 } }
      }
    );

    expect(model.criteria.effective).toEqual(
      normalizeProblemCriteria({ cost: { factor: 4 } })
    );
    expect(model.criteria.is_default).toBe(false);
    expect(normalizeCompareFilters({}).problem_criteria).toEqual(
      DEFAULT_PROBLEM_CRITERIA
    );
  });
});

describe('worker/compare-projection aggregates', () => {
  test('takes the median over the rows that have the value', () => {
    expect(medianOf([3, 1, 2])).toEqual({ median: 2, sample: 3, total: 3 });
    expect(medianOf([4, 2])).toEqual({ median: 3, sample: 2, total: 2 });
  });

  test('reports the sample apart from the row count when values are missing', () => {
    expect(medianOf([1, null, 3, undefined, 5])).toEqual({
      median: 3,
      sample: 3,
      total: 5
    });
  });

  test('reports no median at all when no row carries the value', () => {
    expect(medianOf([null, null])).toEqual({
      median: null,
      sample: 0,
      total: 2
    });
  });

  test('medians the duration and prices the tokens through the shared module', () => {
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({
          attempts: [
            makeAttempt({
              usage: {
                input_tokens: 1000,
                output_tokens: 500,
                cache_read_input_tokens: 0,
                cache_creation_input_tokens: 0,
                total_cost_usd: 1.5
              }
            })
          ]
        })
      ]
    });

    expect(model.rows[0].usage).toEqual({
      tokens: 1500,
      total_cost_usd: 1.5,
      unpriced_leg_count: 0,
      cost_estimated: false,
      partial: false,
      partial_reasons: []
    });
    expect(model.groups[0].duration_ms.median).toBe(60_000);
    expect(model.groups[0].cost_usd.median).toBe(1.5);
  });

  test('sorts landed groups before failed groups', () => {
    const cheap_loser = makeAttempt({
      attempt_id: 'at-lose',
      bead_id: 'UI-9',
      model: 'loser-model',
      status: 'failed',
      finished_at: 40_000
    });
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({
          attempts: [makeAttempt({ done_kind: 'no_delta' }), cheap_loser],
          verify_receipts: { 'UI-1': { ok: true }, 'UI-9': { ok: false } }
        })
      ]
    });

    expect(model.groups.map((group) => group.landing_rate)).toEqual([1, 0]);
  });

  test('keeps partial cost evidence on the comparison median', () => {
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({
          attempts: [
            makeAttempt({
              usage_segments: [
                {
                  model: 'opus',
                  partial: true,
                  partial_reasons: ['attempt_boundary_unproven'],
                  usage: { input_tokens: 100, total_cost_usd: 1 }
                }
              ]
            })
          ]
        })
      ]
    });

    expect(model.rows[0].usage).toMatchObject({ partial: true });
    expect(model.groups[0].cost_usd).toMatchObject({
      median: null,
      partial_count: 1
    });
  });

  test('marks a comparison median partial when one known model has no price', () => {
    const catalog = resolveCatalog({
      overrides: {
        codex: {
          models: { priced: { price: { input: 1, output: 1 } } }
        }
      },
      warn: () => {}
    });
    const model = buildCompareModel({
      catalog,
      workspaces: [
        makeWorkspace({
          attempts: [
            makeAttempt({
              runner: 'codex',
              usage_segments: [
                {
                  model: 'priced',
                  usage: { input_tokens: 1_000_000, output_tokens: 0 }
                },
                {
                  model: 'known-unpriced',
                  usage: { input_tokens: 10, output_tokens: 0 }
                }
              ]
            })
          ]
        })
      ]
    });

    expect(model.rows[0].usage).toMatchObject({
      total_cost_usd: 1,
      unpriced_leg_count: 1,
      partial: true,
      partial_reasons: ['price_unknown']
    });
    expect(model.groups[0].cost_usd).toMatchObject({
      median: 1,
      partial_count: 1
    });
  });
});

describe('worker/compare-projection pass^k', () => {
  test('is the share of beads whose first k judged attempts all passed', () => {
    const rows = [
      { bead_id: 'UI-1', verify: 'pass', finished_at: 1 },
      { bead_id: 'UI-1', verify: 'pass', finished_at: 2 },
      { bead_id: 'UI-2', verify: 'pass', finished_at: 1 },
      { bead_id: 'UI-2', verify: 'fail', finished_at: 2 }
    ];

    expect(passCaret(/** @type {any} */ (rows))).toEqual({ k: 2, value: 0.5 });
  });

  test('is null when some bead was judged only once', () => {
    const rows = [
      { bead_id: 'UI-1', verify: 'pass', finished_at: 1 },
      { bead_id: 'UI-1', verify: 'pass', finished_at: 2 },
      { bead_id: 'UI-2', verify: 'pass', finished_at: 1 }
    ];

    expect(passCaret(/** @type {any} */ (rows))).toBeNull();
  });

  test('ignores 미상 rows when counting the repeats', () => {
    const rows = [
      { bead_id: 'UI-1', verify: 'pass', finished_at: 1 },
      { bead_id: 'UI-1', verify: null, finished_at: 2 }
    ];

    expect(passCaret(/** @type {any} */ (rows))).toBeNull();
  });
});

describe('worker/compare-projection review attribution', () => {
  test('puts the review column on the bead LAST successful attempt only', () => {
    const stats = {
      round: 2,
      blocking: 0,
      minor: 3,
      verdict: 'APPROVE',
      anchor: SHA
    };
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({
          attempts: [
            makeAttempt({
              attempt_id: 'at-1',
              status: 'failed',
              cause: 'timeout'
            }),
            makeAttempt({ attempt_id: 'at-2', finished_at: 62_000 }),
            makeAttempt({ attempt_id: 'at-3', finished_at: 63_000 })
          ],
          issues: { 'UI-1': makeIssue({ impl_review_stats: stats }) }
        })
      ]
    });

    const by_id = Object.fromEntries(
      model.rows.map((row) => [row.attempt_id, row])
    );
    expect(by_id['at-3'].review).toEqual({
      round: 2,
      blocking: 0,
      minor: 3,
      verdict: 'APPROVE',
      anchor: SHA
    });
    expect(by_id['at-2'].review).toBeNull();
    expect(by_id['at-1'].review).toBeNull();
  });

  test('keeps the attribution when a period filter drops the elected row', () => {
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({
          attempts: [
            makeAttempt({ attempt_id: 'at-1', finished_at: 10 }),
            makeAttempt({ attempt_id: 'at-2', finished_at: 90_000 })
          ],
          issues: {
            'UI-1': makeIssue({
              impl_review_stats: {
                round: 1,
                blocking: 1,
                minor: 0,
                verdict: 'REVISE',
                anchor: SHA
              }
            })
          }
        })
      ],
      filters: { since: 50_000 }
    });

    expect(model.rows).toHaveLength(1);
    expect(model.rows[0].attempt_id).toBe('at-2');
    expect(model.rows[0].review?.blocking).toBe(1);
  });
});

describe('worker/compare-projection filters', () => {
  test('prepares ended attempts before projecting comparison rows', async () => {
    const attempt = makeAttempt({
      runner: 'codex',
      model: 'gpt-5.6-sol',
      session_id: 'history-session'
    });
    const prepared = {
      usage_segments: [
        {
          runtime: 'codex',
          role: 'parent',
          model: 'gpt-5.6-sol',
          usage: { input_tokens: 40, output_tokens: 4 }
        }
      ]
    };
    const prepareHistorical = vi.fn(async () => prepared);
    const observations = {
      prepareHistorical,
      get: () => prepared
    };

    const model = await prepareCompareSnapshot(
      {},
      {
        workspaces: [
          makeWorkspace({
            attempts: [attempt],
            issues: { 'UI-1': makeIssue() }
          })
        ],
        observations: /** @type {any} */ (observations),
        presets: [],
        catalog: null,
        listRuns: () => []
      }
    );

    expect(model.rows[0].usage.tokens).toBe(44);
    expect(prepareHistorical).toHaveBeenCalledTimes(1);
  });

  test('does not prepare an ended attempt excluded by compare filters', async () => {
    const prepareHistorical = vi.fn(async () => null);

    await prepareCompareSnapshot(
      { root_dirs: ['/repo/two'] },
      {
        workspaces: [
          makeWorkspace({
            attempts: [makeAttempt({ runner: 'codex', session_id: 's1' })],
            issues: { 'UI-1': makeIssue() }
          })
        ],
        observations: /** @type {any} */ ({
          prepareHistorical,
          get: () => null
        }),
        presets: [],
        catalog: null,
        listRuns: () => []
      }
    );

    expect(prepareHistorical).not.toHaveBeenCalled();
  });

  test('defaults to excluding bench experiment rows', () => {
    const filters = normalizeCompareFilters({});

    expect(filters.include_bench).toBe(false);
  });

  test('drops a bench-labelled bead unless bench is explicitly included', () => {
    const workspace = makeWorkspace({
      attempts: [makeAttempt()],
      issues: { 'UI-1': makeIssue({ labels: ['bench'] }) }
    });

    expect(buildCompareModel({ workspaces: [workspace] }).rows).toEqual([]);
    expect(
      buildCompareModel({
        workspaces: [workspace],
        filters: { include_bench: true }
      }).rows
    ).toHaveLength(1);
  });

  test('carries bench rows regardless of the filters the main table used', () => {
    const workspace = makeWorkspace({
      attempts: [makeAttempt()],
      issues: { 'UI-1': makeIssue({ labels: ['bench'] }) }
    });

    const model = buildCompareModel({
      workspaces: [workspace],
      filters: { root_dirs: ['/repo/elsewhere'], since: 9_000_000 }
    });

    expect(model.rows).toEqual([]);
    expect(model.bench_rows).toHaveLength(1);
    expect(model.bench_rows[0].bead_id).toBe('UI-1');
  });

  test('filters by workspace and route while ignoring issue type', () => {
    const workspaces = [
      makeWorkspace({
        attempts: [makeAttempt()],
        issues: { 'UI-1': makeIssue({ issue_type: 'bug', route: 'quick_fix' }) }
      }),
      makeWorkspace({
        root_dir: '/repo/two',
        name: 'two',
        attempts: [makeAttempt({ attempt_id: 'at-2', bead_id: 'UI-2' })],
        issues: {
          'UI-2': makeIssue({ issue_type: 'task', route: 'spec_backed' })
        }
      })
    ];

    expect(
      buildCompareModel({ workspaces, filters: { root_dirs: ['/repo/two'] } })
        .rows
    ).toHaveLength(1);
    expect(
      buildCompareModel({ workspaces, filters: { issue_types: ['bug'] } }).rows
    ).toHaveLength(2);
    expect(
      buildCompareModel({ workspaces, filters: { routes: ['full_plan'] } }).rows
    ).toEqual([]);
  });

  test('bounds the period on finished_at', () => {
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({
          attempts: [
            makeAttempt({ attempt_id: 'at-old', finished_at: 10 }),
            makeAttempt({ attempt_id: 'at-new', finished_at: 100_000 })
          ]
        })
      ],
      filters: { since: 1_000 }
    });

    expect(model.rows.map((row) => row.attempt_id)).toEqual(['at-new']);
  });

  test('excludes a row exactly at the upper bound', () => {
    const model = projectAttempts(
      [makeAttempt({ finished_at: 100 })],
      {},
      { until: 100 }
    );

    expect(model.rows).toEqual([]);
  });

  test('keeps a row immediately before the upper bound', () => {
    const model = projectAttempts(
      [makeAttempt({ finished_at: 99 })],
      {},
      { until: 100 }
    );

    expect(model.rows).toHaveLength(1);
  });

  test('filters with an upper bound and no lower bound', () => {
    const model = projectAttempts(
      [
        makeAttempt({ attempt_id: 'inside', finished_at: 99 }),
        makeAttempt({ attempt_id: 'outside', finished_at: 101 })
      ],
      {},
      { until: 100 }
    );

    expect(model.rows.map((row) => row.attempt_id)).toEqual(['inside']);
  });

  test('excludes a row without finished_at when only an upper bound is set', () => {
    const model = projectAttempts(
      [makeAttempt({ finished_at: null })],
      {},
      { until: 100 }
    );

    expect(model.rows).toEqual([]);
  });

  test('keeps bench rows when an upper bound excludes the main table', () => {
    const workspace = makeWorkspace({
      attempts: [makeAttempt({ finished_at: 200 })],
      issues: { 'UI-1': makeIssue({ labels: ['bench'] }) }
    });

    const model = buildCompareModel({
      workspaces: [workspace],
      filters: { until: 100 }
    });

    expect(model.rows).toEqual([]);
    expect(model.bench_rows).toHaveLength(1);
  });
});

/**
 * @param {Record<string, any>[]} attempts
 * @param {Record<string, any>} [workspace_overrides]
 * @param {Record<string, any>} [filters]
 */
function projectAttempts(attempts, workspace_overrides = {}, filters = {}) {
  return buildCompareModel({
    workspaces: [makeWorkspace({ attempts, ...workspace_overrides })],
    filters
  });
}

describe('worker/compare-projection outcomes', () => {
  /** @type {Record<string, { kind: string, evidence: string|null }>} */
  const terminal_outcomes = {
    failed: { kind: 'failed', evidence: null },
    orphaned: { kind: 'failed', evidence: 'orphaned' },
    discarded: { kind: 'aborted', evidence: 'discarded' },
    stopped: { kind: 'aborted', evidence: 'stopped' },
    parked: { kind: 'parked', evidence: null },
    retry_wait: { kind: 'superseded', evidence: 'retry_wait' },
    superseded: { kind: 'superseded', evidence: 'superseded' },
    waiting: { kind: 'waiting', evidence: null },
    done: { kind: 'unknown', evidence: null }
  };

  test.each([...TERMINAL_ATTEMPT_STATUSES])(
    'classifies terminal status %s with an explicit table entry',
    (status) => {
      const model = projectAttempts([makeAttempt({ status })]);

      expect(terminal_outcomes).toHaveProperty(status);
      expect(model.rows[0].outcome).toEqual(terminal_outcomes[status]);
    }
  );

  test.each(['failed', 'orphaned'])(
    'preserves the cause of a %s attempt',
    (status) => {
      const model = projectAttempts([
        makeAttempt({ status, cause: 'timeout' })
      ]);

      expect(model.rows[0].outcome).toEqual({
        kind: 'failed',
        evidence: 'timeout'
      });
    }
  );

  test('elects the later done attempt and breaks equal finish times by greatest id', () => {
    const model = projectAttempts(
      [
        makeAttempt({ attempt_id: 'a', finished_at: 1 }),
        makeAttempt({ attempt_id: 'z', finished_at: 2 }),
        makeAttempt({ attempt_id: 'b', finished_at: 2 })
      ],
      {
        issues: {
          'UI-1': makeIssue({
            status: 'closed',
            impl_review_stats: { round: 2, blocking: 1, minor: 0 }
          })
        },
        verify_receipts: { 'UI-1': { ok: true } }
      }
    );
    const rows = Object.fromEntries(
      model.rows.map((row) => [row.attempt_id, row])
    );

    expect(rows.z.outcome).toEqual({ kind: 'landed', evidence: 'closed' });
    expect(rows.z.problems.review).toBe(true);
    expect(rows.z.verify).toBe('pass');
    for (const id of ['a', 'b']) {
      expect(rows[id].outcome).toEqual({
        kind: 'superseded',
        evidence: 'later_done'
      });
      expect(rows[id].problems.review).toBe(false);
      expect(rows[id].review).toBeNull();
      expect(rows[id].verify).toBeNull();
    }
  });

  test.each(['no_delta', 'bench'])(
    'lands a %s completion through no-change evidence',
    (done_kind) => {
      const model = projectAttempts([makeAttempt({ done_kind })]);

      expect(model.rows[0].outcome).toEqual({
        kind: 'landed',
        evidence: 'no_change'
      });
    }
  );

  test.each(['refuted: wrong hypothesis', 'no-delta: already present'])(
    'lands an issue with close reason %s through no-change evidence',
    (close_reason) => {
      const model = projectAttempts([makeAttempt()], {
        issues: { 'UI-1': makeIssue({ close_reason, status: 'closed' }) }
      });

      expect(model.rows[0].outcome).toEqual({
        kind: 'landed',
        evidence: 'no_change'
      });
    }
  );

  test('lands a successful quick-fix push before consulting the issue snapshot', () => {
    const model = projectAttempts([
      makeAttempt({ quickfix_landing: { reason: null, head_sha: SHA } })
    ]);

    expect(model.rows[0].outcome).toEqual({
      kind: 'landed',
      evidence: 'push',
      head_sha: SHA
    });
  });

  test('preserves a missing push head as null', () => {
    const model = projectAttempts([
      makeAttempt({ quickfix_landing: { reason: null } })
    ]);

    expect(model.rows[0].outcome).toEqual({
      kind: 'landed',
      evidence: 'push',
      head_sha: null
    });
  });

  test.each([{}, { reason: 'rejected' }, { reason: '' }])(
    'refuses push evidence unless reason is exactly null: %j',
    (quickfix_landing) => {
      const model = projectAttempts([makeAttempt({ quickfix_landing })], {
        issues: { 'UI-1': makeIssue({ status: 'open' }) }
      });

      expect(model.rows[0].outcome).toEqual({
        kind: 'in_flight',
        evidence: null
      });
    }
  );

  test.each([
    ['closed', { kind: 'landed', evidence: 'closed' }],
    ['open', { kind: 'in_flight', evidence: 'pr_open' }]
  ])('includes the collected PR URL for a %s issue', (status, expected) => {
    const model = projectAttempts([makeAttempt()], {
      issues: { 'UI-1': makeIssue({ status }) },
      pr_urls: { 'UI-1': 'https://github.com/example/repo/pull/1' }
    });

    expect(model.rows[0].outcome).toEqual({
      ...expected,
      pr_url: 'https://github.com/example/repo/pull/1'
    });
  });

  test('keeps an absent issue unknown even when a PR URL exists', () => {
    const model = projectAttempts([makeAttempt()], {
      pr_urls: { 'UI-1': 'https://example.com/pr/1' }
    });

    expect(model.rows[0].outcome).toEqual({ kind: 'unknown', evidence: null });
  });

  test('counts only judged outcomes in landing and the specified pending set in flight', () => {
    const statuses = [...TERMINAL_ATTEMPT_STATUSES];
    const attempts = statuses.map((status, index) =>
      makeAttempt({
        status,
        attempt_id: `a${index}`,
        bead_id: `B${index}`,
        done_kind: 'no_delta'
      })
    );

    const model = projectAttempts(attempts);

    expect(model.summary).toMatchObject({
      n: statuses.length,
      landed: 1,
      judged: 5,
      landing_rate: 0.2,
      in_flight: 2,
      problems: { failed: 4, retry: 0, review: 0, human: 1 },
      problem_count: 5,
      problem_rate: 5 / statuses.length
    });
  });
});

describe('worker/compare-projection human attribution', () => {
  test.each([
    ['inside', 15, 'first'],
    ['after', 35, 'second'],
    ['before', 5, 'first'],
    ['gap', 22, 'first']
  ])(
    'attributes bead-level production events in the %s interval',
    (_name, at, expected_id) => {
      const model = projectAttempts(
        [
          makeAttempt({ attempt_id: 'first', started_at: 10, finished_at: 20 }),
          makeAttempt({ attempt_id: 'second', started_at: 25, finished_at: 30 })
        ],
        {
          timeline_events: {
            'UI-1': [
              {
                event_id: 'e1',
                at,
                bead_id: 'UI-1',
                kind: 'needs_human',
                summary: '사람 확인 필요'
              },
              {
                event_id: 'e2',
                at,
                bead_id: 'UI-1',
                kind: 'queue_hold',
                summary: '시스템 보류: 큐 보류'
              }
            ]
          }
        }
      );
      const affected = model.rows.filter((row) => row.problems.human);

      expect(affected.map((row) => row.attempt_id)).toEqual([expected_id]);
      expect(affected[0].problems.evidence.human).toEqual([
        '사람 확인 필요',
        '시스템 보류: 큐 보류'
      ]);
    }
  );

  test('honors an explicit attempt id before timestamp attribution', () => {
    const model = projectAttempts(
      [
        makeAttempt({ attempt_id: 'first', started_at: 10, finished_at: 20 }),
        makeAttempt({ attempt_id: 'second', started_at: 25, finished_at: 30 })
      ],
      {
        timeline_events: {
          'UI-1': [
            {
              event_id: 'e',
              bead_id: 'UI-1',
              kind: 'queue_hold',
              at: 15,
              attempt_id: 'second',
              summary: '시스템 보류: 보류'
            }
          ]
        }
      }
    );

    expect(
      model.rows.find((row) => row.attempt_id === 'second')?.problems.human
    ).toBe(true);
    expect(
      model.rows.find((row) => row.attempt_id === 'first')?.problems.human
    ).toBe(false);
  });

  test('counts only parking summaries from session-ended production events', () => {
    const model = projectAttempts(
      [
        makeAttempt({ attempt_id: 'park' }),
        makeAttempt({ attempt_id: 'success' })
      ],
      {
        timeline_events: {
          'UI-1': [
            {
              event_id: 'e1',
              bead_id: 'UI-1',
              kind: 'session_ended',
              at: 70_000,
              attempt_id: 'park',
              summary: '파킹 · 사용자 확인'
            },
            {
              event_id: 'e2',
              bead_id: 'UI-1',
              kind: 'session_ended',
              at: 70_000,
              attempt_id: 'success',
              summary: '성공 · PR #1'
            }
          ]
        }
      }
    );

    expect(
      model.rows
        .filter((row) => row.problems.human)
        .map((row) => row.attempt_id)
    ).toEqual(['park']);
  });

  test('excludes environment events even with the same attempt id', () => {
    const model = projectAttempts([makeAttempt()], {
      timeline_events: {
        'UI-1': [
          'provider_hold',
          'provider_recovered',
          'account_preempt',
          'account_live_preempt',
          'guard_warning'
        ].map((kind) => ({
          event_id: kind,
          bead_id: 'UI-1',
          kind,
          at: 20_000,
          attempt_id: 'at-1',
          summary: '환경 보류'
        }))
      }
    });

    expect(model.rows[0].problems.human).toBe(false);
  });

  test.each([
    'provider_hold',
    'provider_recovered',
    'account_preempt',
    'account_live_preempt'
  ])('includes %s only with environment events enabled', (kind) => {
    const workspace = {
      timeline_events: {
        'UI-1': [
          {
            event_id: kind,
            bead_id: 'UI-1',
            kind,
            at: 20_000,
            attempt_id: 'at-1',
            summary: `환경 이벤트: ${kind}`
          }
        ]
      }
    };
    const excluded = projectAttempts([makeAttempt()], workspace);
    const included = projectAttempts([makeAttempt()], workspace, {
      problem_criteria: { human: { include_env_events: true } }
    });

    expect(excluded.rows[0].problems.human).toBe(false);
    expect(included.rows[0].problems.evidence.human).toEqual([
      `환경 이벤트: ${kind}`
    ]);
  });

  test('splits a queue hold by its summary prefix', () => {
    const workspace = {
      timeline_events: {
        'UI-1': [
          {
            event_id: 'e-env',
            bead_id: 'UI-1',
            kind: 'queue_hold',
            at: 20_000,
            attempt_id: 'at-1',
            summary: '환경 보류: spawn_failed'
          }
        ]
      }
    };
    const excluded = projectAttempts([makeAttempt()], workspace);
    const included = projectAttempts([makeAttempt()], workspace, {
      problem_criteria: { human: { include_env_events: true } }
    });

    expect(excluded.rows[0].problems.human).toBe(false);
    expect(included.rows[0].problems.evidence.human).toEqual([
      '환경 보류: spawn_failed'
    ]);
  });

  test('drops a guard warning even with environment events enabled', () => {
    const model = projectAttempts(
      [makeAttempt()],
      {
        timeline_events: {
          'UI-1': [
            {
              event_id: 'guard',
              bead_id: 'UI-1',
              kind: 'guard_warning',
              at: 20_000,
              attempt_id: 'at-1',
              summary: '가드 경고'
            }
          ]
        }
      },
      { problem_criteria: { human: { include_env_events: true } } }
    );

    expect(model.rows[0].problems.human).toBe(false);
  });

  test('walks two paused rungs to reach the completed row', () => {
    const model = projectAttempts(
      [
        makeAttempt({ attempt_id: 'hold-1', status: 'paused' }),
        makeAttempt({
          attempt_id: 'hold-2',
          status: 'paused',
          resumed_from: 'hold-1'
        }),
        makeAttempt({
          attempt_id: 'done',
          resumed_from: 'hold-2',
          started_at: 62_000,
          finished_at: 70_000
        })
      ],
      {
        timeline_events: {
          'UI-1': [
            {
              event_id: 'hold',
              bead_id: 'UI-1',
              kind: 'provider_hold',
              attempt_id: 'hold-1',
              summary: '공급자 보류'
            }
          ]
        }
      },
      { problem_criteria: { human: { include_env_events: true } } }
    );

    expect(model.rows.map((row) => row.attempt_id)).toEqual(['done']);
    expect(model.rows[0].problems.evidence.human).toEqual(['공급자 보류']);
  });

  test('attributes an environment event without an attempt id by time', () => {
    const model = projectAttempts(
      [
        makeAttempt({
          attempt_id: 'first',
          started_at: 0,
          finished_at: 10_000
        }),
        makeAttempt({
          attempt_id: 'second',
          bead_id: 'UI-1',
          started_at: 20_000,
          finished_at: 30_000
        })
      ],
      {
        timeline_events: {
          'UI-1': [
            {
              event_id: 'hold',
              bead_id: 'UI-1',
              kind: 'provider_hold',
              at: 5000,
              summary: '공급자 보류'
            }
          ]
        }
      },
      { problem_criteria: { human: { include_env_events: true } } }
    );

    expect(
      model.rows
        .filter((row) => row.problems.human)
        .map((row) => row.attempt_id)
    ).toEqual(['first']);
  });

  test('keeps a human event off the paused ancestor walk', () => {
    const model = projectAttempts(
      [
        makeAttempt({ attempt_id: 'hold-1', status: 'paused' }),
        makeAttempt({
          attempt_id: 'done',
          resumed_from: 'hold-1',
          started_at: 62_000,
          finished_at: 70_000
        })
      ],
      {
        timeline_events: {
          'UI-1': [
            {
              event_id: 'need',
              bead_id: 'UI-1',
              kind: 'needs_human',
              attempt_id: 'hold-1',
              summary: '사람 확인 필요'
            }
          ]
        }
      }
    );

    expect(model.rows.map((row) => row.attempt_id)).toEqual(['done']);
    expect(model.rows[0].problems.human).toBe(false);
  });

  test('drops an environment event whose lineage reaches no row', () => {
    const model = projectAttempts(
      [
        makeAttempt({ attempt_id: 'hold-1', status: 'paused' }),
        makeAttempt({ attempt_id: 'at-1' })
      ],
      {
        timeline_events: {
          'UI-1': [
            {
              event_id: 'hold',
              bead_id: 'UI-1',
              kind: 'provider_hold',
              attempt_id: 'hold-1',
              summary: '공급자 보류'
            }
          ]
        }
      },
      { problem_criteria: { human: { include_env_events: true } } }
    );

    expect(model.rows[0].problems.human).toBe(false);
  });

  test('attributes a paused environment event to its completed descendant', () => {
    const model = projectAttempts(
      [
        makeAttempt({
          attempt_id: 'paused',
          status: 'paused',
          cause: 'provider_outage:capacity'
        }),
        makeAttempt({
          attempt_id: 'done',
          resumed_from: 'paused',
          started_at: 62_000,
          finished_at: 70_000
        })
      ],
      {
        timeline_events: {
          'UI-1': [
            {
              event_id: 'hold',
              bead_id: 'UI-1',
              kind: 'provider_hold',
              attempt_id: 'paused',
              summary: '공급자 보류'
            }
          ]
        }
      },
      { problem_criteria: { human: { include_env_events: true } } }
    );

    expect(model.rows).toHaveLength(1);
    expect(model.rows[0].attempt_id).toBe('done');
    expect(model.rows[0].problems.evidence.human).toEqual(['공급자 보류']);
  });

  test.each([
    { halted_auto_advance: true },
    { awaiting_user_present: true },
    { status: 'parked' }
  ])('uses local human evidence without a timeline: %j', (fields) => {
    const model = projectAttempts([makeAttempt(fields)]);

    expect(model.rows[0].problems.human).toBe(true);
    expect(model.rows[0].problems.evidence.human).toEqual([]);
  });

  test('does not reassign an event from a filtered nonterminal attempt', () => {
    const model = projectAttempts(
      [
        makeAttempt({ attempt_id: 'old', started_at: 10, finished_at: 20 }),
        makeAttempt({
          attempt_id: 'active',
          status: 'running',
          started_at: 30,
          finished_at: 40
        })
      ],
      {
        timeline_events: {
          'UI-1': [
            {
              event_id: 'e',
              at: 35,
              bead_id: 'UI-1',
              kind: 'needs_human',
              summary: '확인 필요'
            }
          ]
        }
      }
    );

    expect(model.rows).toHaveLength(1);
    expect(model.rows[0].problems.human).toBe(false);
  });

  test('counts overlapping problem keys once in the problem-session numerator', () => {
    const model = projectAttempts([
      makeAttempt({
        status: 'stopped',
        resumed_from: 'origin',
        awaiting_user_present: true
      })
    ]);

    expect(model.summary).toMatchObject({
      problem_count: 1,
      problem_rate: 1,
      problems: { failed: 1, retry: 1, review: 0, human: 1 }
    });
    expect(model.rows[0].problems.evidence).toMatchObject({
      failed: 'stopped',
      retry: { origin: 'origin', kind: 'resume', env: false }
    });
  });

  test.each([
    [{ round: 2, blocking: 0, minor: 0 }, true],
    [{ round: 1, blocking: 1, minor: 0 }, true],
    [{ round: 1, blocking: 0, minor: 9 }, false]
  ])(
    'judges review problems from thresholds: %j',
    (impl_review_stats, expected) => {
      const model = projectAttempts([makeAttempt()], {
        issues: { 'UI-1': makeIssue({ impl_review_stats }) }
      });

      expect(model.rows[0].problems.review).toBe(expected);
      expect(model.rows[0].problems.evidence.review).toEqual(impl_review_stats);
    }
  );
});

describe('worker/compare-projection grouping and summary', () => {
  test.each([
    ['preset', 'sig:claude-opus-5/high → gpt-5.6-sol/high', 'unmatched'],
    ['orchestration', 'claude-opus-5/high', 'none'],
    ['impl_actor', 'gpt-5.6-sol/high', 'none']
  ])('keys the %s grouping axis', (group_by, key, badge) => {
    const model = projectAttempts([makeAttempt()], {}, { group_by });

    expect(model.groups[0]).toMatchObject({ key, badge });
    expect(model.rows[0].composition).toBe(
      'claude-opus-5/high → gpt-5.6-sol/high'
    );
  });

  test.each([
    [null, '미기록'],
    [{ checks: { exec_receipt: { kind: 'main', actor: 'bead' } } }, 'main']
  ])(
    'groups an absent or main executor without inventing a model: %j',
    (receipt_check, key) => {
      const model = projectAttempts(
        [makeAttempt({ receipt_check })],
        {},
        { group_by: 'impl_actor' }
      );

      expect(model.groups[0].key).toBe(key);
    }
  );

  test('splits mixed rows whose unit compositions differ', () => {
    const model = projectAttempts(
      [
        makeAttempt({
          attempt_id: 'at-1',
          receipt_check: mixedReceipt(['sol', 'terra'])
        }),
        makeAttempt({
          attempt_id: 'at-2',
          receipt_check: mixedReceipt(['sol', 'opus'])
        })
      ],
      {},
      { group_by: 'impl_actor' }
    );

    expect(model.groups.map((group) => group.key).sort()).toEqual([
      'mixed:opus/high+sol/high',
      'mixed:sol/high+terra/high'
    ]);
  });

  test('joins mixed rows sharing one unit composition', () => {
    const model = projectAttempts(
      [
        makeAttempt({
          attempt_id: 'at-1',
          receipt_check: mixedReceipt(['sol', 'terra'])
        }),
        makeAttempt({
          attempt_id: 'at-2',
          receipt_check: mixedReceipt(['terra', 'sol'])
        })
      ],
      {},
      { group_by: 'impl_actor' }
    );

    expect(model.groups).toHaveLength(1);
    expect(model.groups[0]).toMatchObject({
      key: 'mixed:sol/high+terra/high',
      name: '혼합 2종',
      n: 2
    });
  });

  test('keeps missing orchestration axes explicit', () => {
    const model = projectAttempts(
      [makeAttempt({ model: null, effort: null })],
      {},
      { group_by: 'orchestration' }
    );

    expect(model.groups[0].key).toBe('미기록/미기록');
  });

  test('drops reviewer-only differences from composition grouping', () => {
    const model = projectAttempts([
      makeAttempt(),
      makeAttempt({
        attempt_id: 'two',
        exec_values: { impl_review_model: 'different' }
      })
    ]);

    expect(model.groups).toHaveLength(1);
    expect(model.groups[0].compositions).toEqual([
      { composition: model.rows[0].composition, count: 2 }
    ]);
  });

  test('reports means, medians and independent numeric samples', () => {
    const model = projectAttempts([
      makeAttempt({
        attempt_id: 'a',
        bead_id: 'A',
        started_at: 0,
        finished_at: 10,
        usage: { input_tokens: 1, total_cost_usd: 1 }
      }),
      makeAttempt({
        attempt_id: 'b',
        bead_id: 'B',
        started_at: 0,
        finished_at: 20,
        usage: { input_tokens: 3, total_cost_usd: 9 }
      }),
      makeAttempt({
        attempt_id: 'c',
        bead_id: 'C',
        started_at: 0,
        finished_at: 90
      }),
      makeAttempt({
        attempt_id: 'd',
        bead_id: 'C',
        started_at: null,
        finished_at: 100
      })
    ]);

    expect(model.summary.duration_ms).toEqual({
      mean: 40,
      median: 20,
      sample: 3,
      total: 4
    });
    expect(model.summary.cost_usd).toEqual({
      mean: 5,
      median: 5,
      sample: 2,
      total: 4,
      partial_count: 0
    });
    expect(model.summary.tokens).toEqual({
      mean: 2,
      median: 2,
      sample: 2,
      total: 4
    });
    expect(model.summary.issue_count).toBe(3);
    expect(model.summary).not.toHaveProperty('best');
  });

  test('reports empty summaries without numerical guesses', () => {
    const model = projectAttempts([]);

    expect(model.summary).toMatchObject({
      n: 0,
      issue_count: 0,
      landing_rate: null,
      problem_rate: null,
      duration_ms: { mean: null, median: null, sample: 0, total: 0 },
      cost_usd: {
        mean: null,
        median: null,
        sample: 0,
        total: 0,
        partial_count: 0
      }
    });
  });

  test('aggregates composition counts in descending order inside one recorded preset', () => {
    const exec_preset = {
      id: 'p1',
      name: '기록',
      revision: 1,
      deviated_keys: []
    };
    const model = projectAttempts([
      makeAttempt({ attempt_id: 'first', model: 'z', exec_preset }),
      makeAttempt({ attempt_id: 'second', model: 'a', exec_preset }),
      makeAttempt({ attempt_id: 'third', model: 'z', exec_preset })
    ]);

    expect(model.groups[0].compositions).toEqual([
      { composition: 'z/high → gpt-5.6-sol/high', count: 2 },
      { composition: 'a/high → gpt-5.6-sol/high', count: 1 }
    ]);
  });

  test('computes the summary from the filtered rows rather than the whole history', () => {
    const model = projectAttempts(
      [
        makeAttempt({ attempt_id: 'old', finished_at: 10, status: 'failed' }),
        makeAttempt({
          attempt_id: 'new',
          finished_at: 20,
          done_kind: 'no_delta'
        })
      ],
      {},
      { since: 15 }
    );

    expect(model.summary).toMatchObject({
      n: 1,
      landed: 1,
      judged: 1,
      landing_rate: 1,
      problem_count: 0,
      attempt_ids: ['new']
    });
  });

  test('counts the same bead id in separate workspaces as separate issues', () => {
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({ attempts: [makeAttempt()] }),
        makeWorkspace({ root_dir: '/repo/two', attempts: [makeAttempt()] })
      ]
    });

    expect(model.summary.issue_count).toBe(2);
  });

  test('sorts equal landing rates by mean cost with null values last', () => {
    const attempts = [
      ['expensive', 5, 'done'],
      ['cheap', 1, 'done'],
      ['missing', null, 'done'],
      ['unknown', 0, 'waiting']
    ].map(([model, cost, status]) =>
      makeAttempt({
        attempt_id: model,
        bead_id: model,
        model,
        status,
        done_kind: 'no_delta',
        usage: cost === null ? null : { input_tokens: 1, total_cost_usd: cost }
      })
    );

    const model = projectAttempts(attempts, {}, { group_by: 'orchestration' });

    expect(model.groups.map((group) => group.name)).toEqual([
      'cheap/high',
      'expensive/high',
      'missing/high',
      'unknown/high'
    ]);
  });

  test('marks all measurable best metrics for the sole eligible group', () => {
    const model = projectAttempts(
      Array.from({ length: 3 }, (_, index) =>
        makeAttempt({
          attempt_id: `a${index}`,
          bead_id: `B${index}`,
          done_kind: 'no_delta',
          usage: { input_tokens: 1, total_cost_usd: 1 }
        })
      )
    );

    expect(model.groups[0].best).toEqual(['landing', 'duration', 'cost']);
  });

  test.each([2, 3])(
    'withholds best when n or judged is below three: n=%s',
    (n) => {
      const model = projectAttempts(
        Array.from({ length: n }, (_, index) =>
          makeAttempt({
            attempt_id: `a${index}`,
            bead_id: `B${index}`,
            status: index === 2 ? 'waiting' : 'done',
            done_kind: 'no_delta'
          })
        )
      );

      expect(model.groups[0].best).toEqual([]);
    }
  );

  test('withholds tied metrics but selects a unique shortest eligible group', () => {
    const attempts = ['slow', 'fast'].flatMap((name) =>
      Array.from({ length: 3 }, (_, index) =>
        makeAttempt({
          attempt_id: `${name}${index}`,
          bead_id: `${name}${index}`,
          model: name,
          started_at: 0,
          finished_at: name === 'slow' ? 20 : 10,
          done_kind: 'no_delta',
          usage: { input_tokens: 1, total_cost_usd: 1 }
        })
      )
    );

    const model = projectAttempts(attempts, {}, { group_by: 'orchestration' });

    expect(
      model.groups.find((group) => group.name === 'fast/high')?.best
    ).toEqual(['duration']);
    expect(
      model.groups.find((group) => group.name === 'slow/high')?.best
    ).toEqual([]);
  });

  test('removes obsolete main-table fields while preserving bench verification', () => {
    const model = projectAttempts(
      [makeAttempt({ bench_verify: { ok: true } })],
      {},
      { include_bench: true }
    );

    for (const field of [
      'signature',
      'signature_parts',
      'verify_source',
      'attempt',
      'representative'
    ]) {
      expect(model.rows[0]).not.toHaveProperty(field);
    }
    for (const field of [
      'success_rate',
      'success_sample',
      'unknown_count',
      'pass_caret',
      'failed_count',
      'retry_count',
      'blocking',
      'minor',
      'round'
    ]) {
      expect(model.groups[0]).not.toHaveProperty(field);
    }
    expect(model.bench_rows[0].verify).toBe('pass');
  });
});

describe('worker/compare-projection collection', () => {
  test('projects production JSONL event shapes through the timeline reader', () => {
    const timeline = createBeadTimeline({
      workspace_root: '/nonexistent-projection-test-root',
      fs: /** @type {any} */ ({
        readFileSync: () =>
          [
            '{"event_id":"e1","at":15,"bead_id":"UI-1","kind":"needs_human","summary":"확인 필요"}',
            '{"event_id":"e2","at":35,"bead_id":"UI-1","kind":"queue_hold","summary":"시스템 보류: 큐 보류"}',
            '{"event_id":"e3","at":40,"bead_id":"UI-1","kind":"session_ended","attempt_id":"second","summary":"파킹 · 확인"}',
            '{"event_id":"e4","at":15,"bead_id":"UI-1","kind":"provider_hold","attempt_id":"first","summary":"환경 보류"}'
          ].join('\n')
      })
    });

    const model = projectAttempts(
      [
        makeAttempt({ attempt_id: 'first', started_at: 10, finished_at: 20 }),
        makeAttempt({ attempt_id: 'second', started_at: 25, finished_at: 30 })
      ],
      { timeline_events: { 'UI-1': timeline.readTimeline('UI-1') } }
    );
    const rows = Object.fromEntries(
      model.rows.map((row) => [row.attempt_id, row])
    );

    expect(rows.first.problems.evidence.human).toEqual(['확인 필요']);
    expect(rows.second.problems.evidence.human).toEqual([
      '시스템 보류: 큐 보류',
      '파킹 · 확인'
    ]);
  });

  test('projects close_reason from the workspace issue index', () => {
    const issues = compareIssueIndex('/repo/one', {
      peek: () => ({
        id_index: new Map([
          [
            'UI-1',
            {
              title: 'closed',
              status: 'closed',
              close_reason: 'refuted: reason',
              metadata: { route: 'quick_fix' }
            }
          ],
          ['UI-2', { title: 'open' }]
        ])
      })
    });

    expect(issues['UI-1']).toMatchObject({
      status: 'closed',
      close_reason: 'refuted: reason',
      route: 'quick_fix'
    });
    expect(issues['UI-2'].close_reason).toBeNull();
  });

  test('reads one timeline per collected bead and filters environment events', () => {
    const readTimeline = vi.fn(() => [
      { event_id: 'human', kind: 'needs_human', summary: '확인', at: 1 },
      { event_id: 'hold', kind: 'queue_hold', summary: '보류', at: 2 },
      {
        event_id: 'end',
        kind: 'session_ended',
        attempt_id: 'at-1',
        summary: '파킹 · 확인',
        at: 3
      },
      {
        event_id: 'provider',
        kind: 'provider_hold',
        attempt_id: 'at-1',
        summary: '환경',
        at: 4
      }
    ]);
    const queueStore = {
      snapshot: () => ({
        attempts: {
          one: makeAttempt(),
          two: makeAttempt({ attempt_id: 'two' }),
          absent: makeAttempt({ bead_id: 'empty' })
        }
      }),
      readAttemptsForBead: (
        /** @type {string} */ _root,
        /** @type {string} */ id
      ) =>
        id === 'empty'
          ? []
          : [makeAttempt(), makeAttempt({ attempt_id: 'two' })]
    };

    const workspaces = collectCompareWorkspaces({
      roots: ['/nonexistent-projection-test-root'],
      queueStore,
      timeline: () => ({ readTimeline }),
      peek: () => null
    });

    expect(readTimeline).toHaveBeenCalledExactlyOnceWith('UI-1');
    expect(
      workspaces[0].timeline_events?.['UI-1'].map((event) => event.kind)
    ).toEqual(['needs_human', 'queue_hold', 'session_ended', 'provider_hold']);
    expect(workspaces[0].attempts).toHaveLength(2);
  });

  test('retains attempts and local human flags when one timeline read throws', () => {
    const attempt = makeAttempt({ halted_auto_advance: true });
    const queueStore = {
      snapshot: () => ({ attempts: { one: attempt } }),
      readAttemptsForBead: () => [attempt]
    };

    const workspaces = collectCompareWorkspaces({
      roots: ['/nonexistent-projection-test-root'],
      queueStore,
      peek: () => null,
      timeline: () => ({
        readTimeline: () => {
          throw new Error('unreadable');
        }
      })
    });
    const model = buildCompareModel({ workspaces });

    expect(model.rows).toHaveLength(1);
    expect(model.rows[0].problems.human).toBe(true);
    expect(model.rows[0].problems.evidence.human).toEqual([]);
  });

  test.each(['missing', 'malformed'])(
    'uses attempt evidence when a %s timeline yields no events',
    (mode) => {
      const timeline = createBeadTimeline({
        workspace_root: '/nonexistent-projection-test-root',
        fs: /** @type {any} */ ({
          readFileSync: () => {
            if (mode === 'missing') {
              throw Object.assign(new Error('missing'), { code: 'ENOENT' });
            }
            return '{broken line\n';
          }
        })
      });
      const attempt = makeAttempt({ awaiting_user_present: true });

      const model = projectAttempts([attempt], {
        timeline_events: { 'UI-1': timeline.readTimeline('UI-1') }
      });

      expect(model.rows[0].problems.human).toBe(true);
      expect(model.rows[0].problems.evidence.human).toEqual([]);
    }
  );

  test('collects PR URLs across every lane with first-found precedence', () => {
    const queue = {
      attempts: { one: makeAttempt() },
      queue: [{ bead_id: 'UI-1', pr_url: 'queue-url' }],
      serial_lanes: [
        {
          id: 's1',
          entries: [
            { bead_id: 'UI-1', pr_url: 'later-url' },
            { bead_id: 'serial', pr_url: 'serial-url' }
          ]
        }
      ],
      pr_wait: [{ bead_id: 'wait', pr_url: 'wait-url' }],
      done: [{ bead_id: 'done', pr_url: 'done-url' }],
      merge_queue: [{ bead_id: 'merge', pr_url: 'merge-url' }],
      completion_intents: {
        'UI-1': { merge_subject: { pr_url: 'intent-later' } },
        intent: { merge_subject: { pr_url: 'intent-url' } }
      }
    };

    const workspaces = collectCompareWorkspaces({
      roots: ['/nonexistent-projection-test-root'],
      queueStore: {
        snapshot: () => queue,
        readAttemptsForBead: () => [makeAttempt()]
      },
      timeline: () => ({ readTimeline: () => [] }),
      peek: () => null
    });

    expect(workspaces[0].pr_urls).toEqual({
      'UI-1': 'queue-url',
      serial: 'serial-url',
      wait: 'wait-url',
      done: 'done-url',
      merge: 'merge-url',
      intent: 'intent-url'
    });
  });

  test.each(['read', 'parse', 'missing'])(
    'projects actual preset-store %s results through the coordinator',
    (failure) => {
      const tmp_dir = fs.mkdtempSync(
        path.join(os.tmpdir(), 'bdui-compare-store-')
      );
      const file_path = path.join(tmp_dir, 'exec-presets.json');
      if (failure === 'read') {
        fs.mkdirSync(file_path);
      } else if (failure === 'parse') {
        fs.writeFileSync(file_path, '{broken');
      }
      const coordinator = createExecPresetCoordinator({
        presetStore: createExecPresetStore({ filePath: file_path }),
        queueStore: createQueueStore()
      });
      const runtime_spy = vi
        .spyOn(worker_runtime, 'getWorkerRuntime')
        .mockReturnValue(
          /** @type {any} */ ({ execPresetCoordinator: coordinator })
        );
      try {
        const model = compareSnapshot(
          {},
          {
            workspaces: [
              makeWorkspace({
                attempts: [
                  makeAttempt({
                    exec_preset: {
                      id: 'recorded',
                      name: 'Recorded',
                      revision: 1,
                      deviated_keys: []
                    }
                  })
                ]
              })
            ],
            catalog: null,
            listRuns: () => []
          }
        );

        if (failure === 'missing') {
          expect(model.warnings).toEqual([]);
          expect(model.rows[0].preset).toMatchObject({
            id: 'recorded',
            name: 'Recorded(삭제됨)'
          });
        } else {
          expect(model.warnings).toEqual(['preset_store_unreadable']);
          expect(model.rows[0].preset).toBeNull();
          expect(model.rows[0].preset_candidates).toEqual([]);
        }
      } finally {
        runtime_spy.mockRestore();
        fs.rmSync(tmp_dir, { recursive: true, force: true });
      }
    }
  );

  test('reports preset-store read failure in snapshot warnings', () => {
    const runtime_spy = vi
      .spyOn(worker_runtime, 'getWorkerRuntime')
      .mockReturnValue(
        /** @type {any} */ ({
          execPresetCoordinator: {
            snapshot: () => {
              throw new Error('preset store unreadable');
            }
          }
        })
      );
    try {
      const model = compareSnapshot(
        {},
        {
          workspaces: [makeWorkspace({ attempts: [makeAttempt()] })],
          catalog: null,
          listRuns: () => []
        }
      );

      expect(model.warnings).toEqual(['preset_store_unreadable']);
      expect(model.rows[0].preset).toBeNull();
      expect(model.rows[0].preset_candidates).toEqual([]);
    } finally {
      runtime_spy.mockRestore();
    }
  });

  test('ignores issue_types during historical preparation as well as row filtering', async () => {
    const prepareHistorical = vi.fn(async () => null);

    const model = await prepareCompareSnapshot(
      { issue_types: ['bug'] },
      {
        workspaces: [
          makeWorkspace({
            attempts: [makeAttempt()],
            issues: { 'UI-1': makeIssue({ issue_type: 'task' }) }
          })
        ],
        presets: [],
        catalog: null,
        listRuns: () => [],
        observations: /** @type {any} */ ({
          prepareHistorical,
          get: () => null
        })
      }
    );

    expect(prepareHistorical).toHaveBeenCalledTimes(1);
    expect(model.rows).toHaveLength(1);
  });

  test('keeps the recorded route ahead of a newer workspace route', async () => {
    const prepareHistorical = vi.fn(async () => null);

    const model = await prepareCompareSnapshot(
      { routes: ['spec_backed'] },
      {
        workspaces: [
          makeWorkspace({
            attempts: [
              makeAttempt({
                exec_values: { route: 'spec_backed' },
                route: 'quick_fix'
              })
            ],
            issues: { 'UI-1': makeIssue({ route: 'full_plan' }) }
          })
        ],
        presets: [],
        catalog: null,
        listRuns: () => [],
        observations: /** @type {any} */ ({
          prepareHistorical,
          get: () => null
        })
      }
    );

    expect(prepareHistorical).toHaveBeenCalledTimes(1);
    expect(model.rows[0].route).toBe('spec_backed');
  });
});
