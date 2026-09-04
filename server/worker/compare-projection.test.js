import { describe, expect, test } from 'vitest';
import {
  attemptSignature,
  buildCompareModel,
  compareBenchRuns,
  compareVerifyReceipts,
  implActorOf,
  isRetryAttempt,
  medianOf,
  normalizeCompareFilters,
  passCaret,
  presetMatchesSignature,
  projectBenchRun,
  signatureName
} from './compare-projection.js';

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

describe('worker/compare-projection signature', () => {
  test('reads the implementer from the attempt receipt_check, not the Bead', () => {
    const attempt = makeAttempt();

    const signature = attemptSignature(attempt);

    expect(signature.impl_actor).toEqual({
      kind: 'delegated',
      model: 'gpt-5.6-sol',
      effort: 'high',
      label: 'gpt-5.6-sol/high'
    });
  });

  test('parses a legacy raw receipt string in the same slot', () => {
    const actor = implActorOf({
      checks: { exec_receipt: `delegated:gpt-5.6-sol:high@${SHA}` }
    });

    expect(actor.label).toBe('gpt-5.6-sol/high');
  });

  test('groups a main receipt as main whatever exec_values pinned', () => {
    const attempt = makeAttempt({
      exec_values: { impl_model: 'gpt-5.6-sol' },
      receipt_check: {
        checks: { exec_receipt: { kind: 'main', actor: 'quick_fix_default' } }
      }
    });

    const signature = attemptSignature(attempt);

    expect(signature.impl_actor.label).toBe('main');
  });

  test('reports 미기록 when the attempt preserved no exec_receipt', () => {
    const attempt = makeAttempt({ receipt_check: null });

    const signature = attemptSignature(attempt);

    expect(signature.impl_actor.kind).toBe('missing');
    expect(signature.key).toContain('미기록');
  });

  test('reports 미기록 when multi-unit receipts name different actors', () => {
    const actor = implActorOf({
      checks: {
        units: [
          {
            unit: 'a',
            kind: 'delegated',
            actor: 'gpt-5.6-sol',
            effort: 'high'
          },
          { unit: 'b', kind: 'main', actor: 'bead' }
        ]
      }
    });

    expect(actor.kind).toBe('missing');
  });

  test('includes the reviewer triple so reviewer-only differences split groups', () => {
    const one = attemptSignature(makeAttempt());
    const other = attemptSignature(
      makeAttempt({
        exec_values: {
          impl_review_model: 'claude-opus-5',
          impl_review_effort: 'high',
          impl_review_speed: 'default'
        }
      })
    );

    expect(one.key).not.toBe(other.key);
    expect(one.key).toContain('리뷰 gpt-5.6-sol/high/default');
  });
});

describe('worker/compare-projection preset naming', () => {
  const preset = {
    id: 'p1',
    name: '느린 위임',
    settings: {
      orchestration_model: 'claude-opus-5',
      orchestration_effort: 'high',
      impl_dispatch: 'delegated',
      impl_model: 'gpt-5.6-sol',
      impl_effort: 'high',
      impl_review_model: 'gpt-5.6-sol',
      impl_review_effort: 'high',
      impl_review_speed: 'default'
    }
  };

  test('names the group after a preset that matches every key it declares', () => {
    const signature = attemptSignature(makeAttempt());

    expect(signatureName(signature, [preset])).toBe('느린 위임');
  });

  test('takes the first stored match when more than one preset matches', () => {
    const signature = attemptSignature(makeAttempt());
    const partial = {
      id: 'p0',
      name: '리뷰만',
      settings: { impl_review_model: 'gpt-5.6-sol' }
    };

    expect(signatureName(signature, [partial, preset])).toBe('리뷰만');
  });

  test('falls back to the signature string when no preset matches', () => {
    const signature = attemptSignature(makeAttempt({ model: 'other-model' }));

    expect(signatureName(signature, [preset])).toBe(signature.key);
  });

  test('never names a preset for an unrecorded implementer', () => {
    const signature = attemptSignature(makeAttempt({ receipt_check: null }));

    expect(presetMatchesSignature(signature, preset)).toBe(false);
  });
});

describe('worker/compare-projection preset naming — every declared key', () => {
  test('refuses a preset that declares a key the attempt did not record', () => {
    const signature = attemptSignature(makeAttempt());

    expect(
      presetMatchesSignature(signature, {
        settings: {
          impl_review_model: 'gpt-5.6-sol',
          // Never pinned by this attempt, so it cannot be shown to have been in
          // force; naming the group after this preset would say it was.
          spec_review_model: 'fable'
        }
      })
    ).toBe(false);
  });

  test('compares a declared key against the attempt exec_values snapshot', () => {
    const signature = attemptSignature(
      makeAttempt({
        exec_values: {
          impl_review_model: 'gpt-5.6-sol',
          impl_review_effort: 'high',
          impl_review_speed: 'default',
          spec_review_model: 'fable'
        }
      })
    );

    expect(
      presetMatchesSignature(signature, {
        settings: { spec_review_model: 'fable' }
      })
    ).toBe(true);
    expect(
      presetMatchesSignature(signature, {
        settings: { spec_review_model: 'codex' }
      })
    ).toBe(false);
  });

  test('refuses a delegate model declaration when main actually implemented', () => {
    const signature = attemptSignature(
      makeAttempt({
        receipt_check: {
          checks: { exec_receipt: { kind: 'main', actor: 'bead' } }
        },
        exec_values: { impl_model: 'gpt-5.6-sol' }
      })
    );

    expect(
      presetMatchesSignature(signature, {
        settings: { impl_dispatch: 'main', impl_model: 'gpt-5.6-sol' }
      })
    ).toBe(false);
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
    expect(model.rows[0].verify_source).toBe('merge_verify');
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
    expect(model.rows[0].verify_source).toBe('bench_verify');
  });

  test('leaves a quick_fix push with neither source 미상 and out of the sample', () => {
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
    expect(model.groups[0].success_rate).toBe(1);
    expect(model.groups[0].success_sample).toBe(1);
    expect(model.groups[0].unknown_count).toBe(1);
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
              retry: { attempts: 2, origin_attempt_id: 'at-1' }
            }),
            makeAttempt({
              attempt_id: 'at-3',
              finished_at: 63_000,
              retry: { attempts: 3, origin_attempt_id: 'at-2' }
            })
          ]
        })
      ]
    });

    expect(model.groups[0].retry_count).toBe(2);
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
      cost_estimated: false
    });
    expect(model.groups[0].duration_ms.median).toBe(60_000);
    expect(model.groups[0].cost_usd.median).toBe(1.5);
  });

  test('sorts groups by success rate, then by the cheaper median price', () => {
    const cheap_loser = makeAttempt({
      attempt_id: 'at-lose',
      bead_id: 'UI-9',
      model: 'loser-model',
      finished_at: 40_000
    });
    const model = buildCompareModel({
      workspaces: [
        makeWorkspace({
          attempts: [makeAttempt(), cheap_loser],
          verify_receipts: { 'UI-1': { ok: true }, 'UI-9': { ok: false } }
        })
      ]
    });

    expect(model.groups.map((group) => group.success_rate)).toEqual([1, 0]);
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

  test('filters by workspace, issue type and route', () => {
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
    ).toHaveLength(1);
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
});
