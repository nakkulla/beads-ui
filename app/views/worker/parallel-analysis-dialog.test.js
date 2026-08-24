import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createWorkerParallelAnalysisStore } from '../../data/worker-parallel-analysis-store.js';
import { createWorkerQueueStore } from '../../data/worker-queue-store.js';
import { createParallelAnalysisDialog } from './parallel-analysis-dialog.js';

const DIGEST = 'd'.repeat(64);

function catalogFixture() {
  return {
    runners: {
      claude: {
        models: { opus: { id: 'opus' }, sonnet: { id: 'sonnet' } },
        efforts: ['low', 'medium', 'high', 'xhigh']
      },
      codex: {
        models: {
          sol: {
            id: 'gpt-5.6-sol',
            efforts: ['low', 'medium', 'high', 'xhigh']
          },
          luna: {
            id: 'gpt-5.6-luna',
            efforts: ['low', 'medium', 'high', 'xhigh', 'max']
          }
        },
        efforts: ['minimal', 'low', 'medium', 'high', 'xhigh']
      }
    }
  };
}

/**
 * @param {HTMLElement} mount
 * @param {string} selector
 * @returns {string[]}
 */
function optionValues(mount, selector) {
  return Array.from(mount.querySelectorAll(`${selector} option`)).map(
    (option) => /** @type {HTMLOptionElement} */ (option).value
  );
}

/**
 * @param {any} over
 */
function queueOf(over = {}) {
  return {
    revision: 4,
    queue: [
      { bead_id: 'UI-a', added_at: 1 },
      { bead_id: 'UI-b', added_at: 2 },
      { bead_id: 'UI-c', added_at: 3 }
    ],
    serial_lanes: [
      { id: 's1', entries: [] },
      { id: 's2', entries: [] }
    ],
    serial_lane_count: 2,
    lane_states: {
      s1: { occupied_by: [], order: [], corrections: [], cycle: false },
      s2: { occupied_by: [], order: [], corrections: [], cycle: false }
    },
    attempts: {},
    pr_wait: [],
    done: [],
    bead_titles: { 'UI-a': '스키마 A', 'UI-b': '스키마 B' },
    runner_catalog: catalogFixture(),
    ...over
  };
}

/**
 * @param {any} over
 */
function analysisOf(over = {}) {
  return {
    settings: { revision: 1, runner: 'claude', model: 'opus', effort: 'high' },
    job: null,
    runs: [],
    last_good: {
      identity_digest: DIGEST,
      at: 1_000,
      result: {
        schema_version: 3,
        snapshot_digest: DIGEST,
        issues: [{ bead_id: 'UI-c', verdict: 'parallel_ok', reason: '독립' }],
        groups: [
          {
            members: ['UI-a', 'UI-b'],
            order: ['UI-a', 'UI-b'],
            confidence: 'high',
            categories: ['schema_or_migration'],
            reason: '같은 마이그레이션을 건드린다',
            evidence: [
              {
                path: 'docs/UI-a.md',
                artifact_kind: 'spec',
                locator: 'queue.json'
              }
            ],
            eligible: true
          }
        ]
      }
    },
    ...over
  };
}

/**
 * The analyzable universe the targets message returns: two qualified rows (one
 * placed, one unplaced) and one excluded row.
 */
function targetsFixture() {
  return {
    qualified: [
      {
        id: 'UI-a',
        title: '스키마 A',
        route: 'spec_backed',
        spec_id: 'UI-a',
        plan_path: null,
        lane: 'parallel',
        scope: ['app/views', 'server/worker'],
        overlaps: ['UI-b']
      },
      {
        id: 'UI-b',
        title: '스키마 B',
        route: 'full_plan',
        spec_id: 'UI-b',
        plan_path: 'docs/plans/UI-b.md',
        lane: 's1',
        scope: ['server'],
        overlaps: ['UI-a']
      }
    ],
    excluded: [
      {
        id: 'UI-c',
        title: '후보 C',
        reason: 'spec_missing',
        lane: null,
        scope: ['must/not/render'],
        overlaps: ['UI-a']
      }
    ]
  };
}

/**
 * @param {{ queue?: any, analysis?: any, transport?: any, targets?: any, onOpenTranscript?: any }} [options]
 */
function mountDialog(options = {}) {
  document.body.innerHTML = '<div id="m"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const queueStore = createWorkerQueueStore();
  queueStore.set(options.queue === null ? null : options.queue || queueOf());
  const analysisStore = createWorkerParallelAnalysisStore();
  if (options.analysis !== null) {
    analysisStore.set(options.analysis || analysisOf());
  }
  const request = options.transport || vi.fn(async () => ({ applied: true }));
  const target_response = options.targets || targetsFixture();
  const transport = vi.fn((type, payload) =>
    type === 'worker-parallel-analysis-targets'
      ? Promise.resolve(target_response)
      : request(type, payload)
  );
  const dialog = createParallelAnalysisDialog(mount, {
    queueStore,
    analysisStore,
    transport,
    getWorkspacePath: () => '/repo',
    onOpenTranscript: options.onOpenTranscript
  });
  dialog.open();
  return { mount, dialog, queueStore, analysisStore, transport };
}

async function flush() {
  for (let i = 0; i < 5; i++) {
    await Promise.resolve();
  }
}

beforeEach(() => {
  document.body.innerHTML = '<div id="m"></div>';
});

describe('parallel analysis dialog (UI-04vo seam J)', () => {
  test('renders analyzer settings without the old lane target count', async () => {
    const { mount } = mountDialog();

    await flush();

    const root = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-parallel-analysis-dialog')
    );
    expect(root).not.toBeNull();
    expect(root.textContent).toContain('opus');
    expect(root.textContent).not.toContain('대상 3');
    expect(root.textContent).toContain('자격 2 · 제외 1');
  });

  test('renders all qualified targets checked and exclusions collapsed', async () => {
    const { mount } = mountDialog();

    await flush();

    const checks = Array.from(mount.querySelectorAll('.pa-target__check')).map(
      (element) => /** @type {HTMLInputElement} */ (element).checked
    );
    const excluded = /** @type {HTMLDetailsElement} */ (
      mount.querySelector('.pa-targets__excluded')
    );
    expect(checks).toEqual([true, true]);
    expect(excluded.open).toBe(false);
    expect(excluded.textContent).toContain('스펙 없음');
    expect(excluded.textContent).toContain('미배치');
  });

  test('renders scope and overlap badges only on qualified targets', async () => {
    const { mount } = mountDialog();

    await flush();

    const scope_badges = Array.from(
      mount.querySelectorAll('.pa-target__scope summary')
    ).map((element) => element.textContent?.trim());
    const overlap_badges = Array.from(
      mount.querySelectorAll('.pa-target__overlaps')
    ).map((element) => element.textContent?.trim());
    expect(scope_badges).toEqual(['scope 2', 'scope 1']);
    expect(overlap_badges).toEqual(['겹침 UI-b', '겹침 UI-a']);
    expect(mount.textContent).toContain('server/worker');
    expect(mount.textContent).not.toContain('must/not/render');
  });

  test('renders no signal badges when target fields are absent', async () => {
    const target_response = targetsFixture();
    for (const row of target_response.qualified) {
      const target = /** @type {any} */ (row);
      delete target.scope;
      delete target.overlaps;
    }
    const { mount } = mountDialog({ targets: target_response });

    await flush();

    expect(mount.querySelector('.pa-target__scope')).toBeNull();
    expect(mount.querySelector('.pa-target__overlaps')).toBeNull();
  });

  test('renders an eligible group card with its verdict and evidence', () => {
    const { mount } = mountDialog();

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.pa-group[data-group-index="0"]')
    );
    expect(card).not.toBeNull();
    expect(card.textContent).toContain('schema_or_migration');
    expect(card.textContent).toContain('같은 마이그레이션을 건드린다');
    expect(card.textContent).toContain('docs/UI-a.md');
    expect(
      /** @type {HTMLButtonElement} */ (card.querySelector('.pa-group__submit'))
        .disabled
    ).toBe(false);
  });

  test('disables submit on a group the server did not mark eligible', () => {
    const analysis = analysisOf();
    analysis.last_good.result.groups[0].eligible = false;
    analysis.last_good.result.groups[0].confidence = 'medium';
    const { mount } = mountDialog({ analysis });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.pa-group[data-group-index="0"]')
    );
    expect(
      /** @type {HTMLButtonElement} */ (card.querySelector('.pa-group__submit'))
        .disabled
    ).toBe(true);
  });

  test('start sends worker-parallel-analysis-start', async () => {
    const { mount, transport } = mountDialog();

    await flush();
    /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-run')).click();
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-parallel-analysis-start',
      expect.objectContaining({ force: false, target_ids: ['UI-a', 'UI-b'] })
    );
  });

  test('sends only checked targets in the start payload', async () => {
    const { mount, transport } = mountDialog();
    await flush();
    const check = /** @type {HTMLInputElement} */ (
      mount.querySelector('.pa-target__check[data-target-id="UI-b"]')
    );
    check.checked = false;
    check.dispatchEvent(new Event('change', { bubbles: true }));

    /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-run')).click();
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-parallel-analysis-start',
      expect.objectContaining({ target_ids: ['UI-a'] })
    );
  });

  test('names targets rejected after their qualification changed', async () => {
    const transport = vi.fn(async (type) =>
      type === 'worker-parallel-analysis-start'
        ? {
            applied: false,
            reason: 'target_not_qualified',
            detail: ['UI-b']
          }
        : { applied: true }
    );
    const { mount } = mountDialog({ transport });
    await flush();

    /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-run')).click();
    await flush();

    expect(document.body.querySelector('.toast')?.textContent).toContain(
      'UI-b'
    );
  });

  test('reanalyze forces a fresh run', async () => {
    const { mount, transport } = mountDialog();

    await flush();
    /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-rerun')).click();
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-parallel-analysis-start',
      expect.objectContaining({ force: true })
    );
  });

  test('cancel sends the active job id', async () => {
    const analysis = analysisOf({ job: { job_id: 'job-1', identity: 'i1' } });
    const { mount, transport } = mountDialog({ analysis });

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.pa-cancel')
    ).click();
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-parallel-analysis-cancel',
      expect.objectContaining({ job_id: 'job-1' })
    );
  });

  test('excluding a member drops it from the submitted draft', async () => {
    const { mount, transport } = mountDialog();
    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.pa-group[data-group-index="0"]')
    );

    /** @type {HTMLButtonElement} */ (
      card.querySelector('.pa-member__exclude[data-bead-id="UI-b"]')
    ).click();
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.pa-group__submit')
    ).click();
    await flush();

    // One member left: the draft can no longer be submitted, so nothing is sent.
    expect(transport).not.toHaveBeenCalledWith(
      'worker-parallel-analysis-submit',
      expect.anything()
    );
  });

  test('restoring the suggestion brings an excluded member back', () => {
    const { mount } = mountDialog();
    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.pa-group[data-group-index="0"]')
    );
    /** @type {HTMLButtonElement} */ (
      card.querySelector('.pa-member__exclude[data-bead-id="UI-b"]')
    ).click();

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.pa-group__restore')
    ).click();

    expect(
      mount.querySelectorAll('.pa-group[data-group-index="0"] .pa-member')
        .length
    ).toBe(2);
  });

  test('submit sends the digest, group index, lane, and draft order', async () => {
    const { mount, transport } = mountDialog();

    /** @type {HTMLSelectElement} */ (
      mount.querySelector('.pa-group__lane')
    ).value = 's2';
    /** @type {HTMLSelectElement} */ (
      mount.querySelector('.pa-group__lane')
    ).dispatchEvent(new Event('change', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.pa-group__submit')
    ).click();
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-parallel-analysis-submit', {
      snapshot_digest: DIGEST,
      group_index: 0,
      lane: 's2',
      ordered_bead_ids: ['UI-a', 'UI-b'],
      expected_revision: 4
    });
  });

  test('retries a submit conflict once against the adopted revision', async () => {
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        queue: queueOf({ revision: 9 })
      })
      .mockResolvedValueOnce({
        applied: true,
        queue: queueOf({ revision: 10 })
      });
    const { mount } = mountDialog({ transport });

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.pa-group__submit')
    ).click();
    await flush();

    expect(transport).toHaveBeenCalledTimes(2);
    expect(transport.mock.calls[1][1].expected_revision).toBe(9);
  });

  test('a twice-refused submit leaves the queue untouched', async () => {
    const transport = vi.fn(async () => ({
      applied: false,
      conflict: true,
      queue: queueOf({ revision: 9 })
    }));
    const { mount, queueStore } = mountDialog({ transport });

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.pa-group__submit')
    ).click();
    await flush();

    expect(transport).toHaveBeenCalledTimes(2);
    expect(queueStore.get()?.serial_lanes[0].entries).toEqual([]);
  });

  test('marks a group already reflected in the lanes as applied', () => {
    const { mount } = mountDialog({
      queue: queueOf({
        queue: [{ bead_id: 'UI-c', added_at: 3 }],
        serial_lanes: [
          {
            id: 's1',
            entries: [
              { bead_id: 'UI-a', added_at: 1 },
              { bead_id: 'UI-b', added_at: 2 }
            ]
          },
          { id: 's2', entries: [] }
        ]
      })
    });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.pa-group[data-group-index="0"]')
    );
    expect(card.textContent).toContain('✓ 이미 반영됨');
    expect(
      /** @type {HTMLButtonElement} */ (card.querySelector('.pa-group__submit'))
        .disabled
    ).toBe(true);
  });

  test('excludes an active member from the draft and says so', () => {
    const { mount } = mountDialog({
      queue: queueOf({
        queue: [{ bead_id: 'UI-a', added_at: 1 }],
        attempts: {
          r1: { attempt_id: 'r1', bead_id: 'UI-b', status: 'running' }
        }
      })
    });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.pa-group[data-group-index="0"]')
    );
    expect(card.textContent).toContain('실행 중');
    expect(
      /** @type {HTMLButtonElement} */ (card.querySelector('.pa-group__submit'))
        .disabled
    ).toBe(true);
  });

  test('marks a group stale and blocks submit when a member left the queue', () => {
    const { mount } = mountDialog({
      queue: queueOf({
        queue: [
          { bead_id: 'UI-a', added_at: 1 },
          { bead_id: 'UI-c', added_at: 3 }
        ]
      })
    });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.pa-group[data-group-index="0"]')
    );
    expect(card.textContent).toContain('stale');
    expect(card.textContent).toContain('UI-b');
    expect(
      /** @type {HTMLButtonElement} */ (card.querySelector('.pa-group__submit'))
        .disabled
    ).toBe(true);
  });

  test('cancel stays clickable while a start request is still in flight', async () => {
    /** @type {(v: any) => void} */
    let resolveStart = () => {};
    const transport = vi.fn((/** @type {string} */ type) =>
      type === 'worker-parallel-analysis-start'
        ? new Promise((res) => {
            resolveStart = res;
          })
        : Promise.resolve({ cancelled: true })
    );
    const { mount } = mountDialog({
      analysis: analysisOf({ job: { job_id: 'job-1', identity: 'i1' } }),
      transport
    });

    /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-run')).click();
    await flush();
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.pa-cancel')
    ).click();
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-parallel-analysis-cancel',
      expect.objectContaining({ job_id: 'job-1' })
    );
    resolveStart({ applied: false, reason: 'cancelled' });
  });

  test('renders the parallel_ok and uncertain summary', () => {
    const analysis = analysisOf();
    analysis.last_good.result.issues = [
      { bead_id: 'UI-c', verdict: 'parallel_ok', reason: '독립' },
      { bead_id: 'UI-d', verdict: 'uncertain', reason: '문서 누락' }
    ];
    const { mount } = mountDialog({ analysis });

    const summary = /** @type {HTMLElement} */ (
      mount.querySelector('.pa-summary')
    );
    expect(summary.textContent).toContain('parallel_ok 1');
    expect(summary.textContent).toContain('uncertain 1');
  });

  test('says the analyzer model is unset instead of offering a run', () => {
    const { mount } = mountDialog({
      analysis: analysisOf({
        settings: {
          revision: 0,
          runner: null,
          model: null,
          effort: null
        },
        last_good: null
      })
    });

    expect(mount.textContent).toContain('분석 모델 설정 필요');
    expect(
      /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-run')).disabled
    ).toBe(true);
  });

  test('settings update sends the CAS revision', async () => {
    const { mount, transport } = mountDialog();

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.pa-settings__model')
    );
    select.value = 'sonnet';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-parallel-analysis-settings-update',
      expect.objectContaining({ expected_revision: 1, model: 'sonnet' })
    );
  });

  test('changing the runner swaps the model and effort vocabularies', async () => {
    const { mount, transport } = mountDialog();

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.pa-settings__runner')
    );
    select.value = 'codex';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    expect(optionValues(mount, '.pa-settings__model')).toEqual(['sol', 'luna']);
    expect(optionValues(mount, '.pa-settings__effort-select')).toEqual([
      'low',
      'medium',
      'high',
      'xhigh'
    ]);
    expect(transport).toHaveBeenCalledWith(
      'worker-parallel-analysis-settings-update',
      expect.objectContaining({
        expected_revision: 1,
        runner: 'codex',
        model: 'sol',
        effort: 'high'
      })
    );
  });

  test('changing the effort sends the whole triple in one CAS', async () => {
    const { mount, transport } = mountDialog();

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.pa-settings__effort-select')
    );
    select.value = 'medium';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-parallel-analysis-settings-update',
      expect.objectContaining({
        expected_revision: 1,
        runner: 'claude',
        model: 'opus',
        effort: 'medium'
      })
    );
  });

  test('marks a default selection', async () => {
    const { mount } = mountDialog({
      analysis: analysisOf({
        settings: {
          revision: 0,
          runner: 'claude',
          model: 'opus',
          effort: 'high',
          is_default: true,
          compatible: true
        }
      })
    });

    await flush();

    expect(mount.textContent).toContain('기본값');
    expect(
      /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-run')).disabled
    ).toBe(false);
  });

  test('disables the analyze buttons on an incompatible selection', () => {
    const { mount } = mountDialog({
      analysis: analysisOf({
        settings: {
          revision: 2,
          runner: 'codex',
          model: 'sol',
          effort: 'minimal',
          is_default: false,
          compatible: false
        }
      })
    });

    expect(mount.textContent).toContain('설정 비호환');
    expect(
      /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-run')).disabled
    ).toBe(true);
    expect(
      /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-rerun'))
        .disabled
    ).toBe(true);
  });

  test('names the stored triple an incompatible selection was saved with', () => {
    const { mount } = mountDialog({
      analysis: analysisOf({
        settings: {
          revision: 2,
          runner: 'codex',
          model: 'sol',
          effort: 'minimal',
          is_default: false,
          compatible: false
        }
      })
    });

    const warning = /** @type {HTMLElement} */ (
      mount.querySelector('.pa-settings__incompatible')
    );
    expect(warning.textContent).toContain('codex/sol');
    expect(warning.textContent).toContain('minimal');
  });

  test('reads an unusable default as unconfigured, not as a broken choice', () => {
    const { mount } = mountDialog({
      analysis: analysisOf({
        settings: {
          revision: 0,
          runner: 'claude',
          model: 'opus',
          effort: 'high',
          is_default: true,
          compatible: false
        }
      })
    });

    expect(mount.textContent).toContain('분석 모델 설정 필요');
    expect(mount.textContent).not.toContain('설정 비호환');
    expect(
      /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-run')).disabled
    ).toBe(true);
  });

  test('shows 준비 중 while the start request has no job yet', async () => {
    const transport = vi.fn(() => new Promise(() => {}));
    const { mount } = mountDialog({
      analysis: analysisOf({ job: null, last_good: null }),
      transport
    });

    await flush();
    /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-run')).click();
    await flush();

    expect(mount.textContent).toContain('준비 중');
    expect(mount.textContent).not.toContain('분석 중');
  });

  test('switches to 분석 중 once the server reports a job', async () => {
    const transport = vi.fn(() => new Promise(() => {}));
    const { mount, analysisStore, dialog } = mountDialog({
      analysis: analysisOf({ job: null, last_good: null }),
      transport
    });
    await flush();
    /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-run')).click();
    await flush();

    analysisStore.set(
      analysisOf({
        job: {
          job_id: 'job-1',
          identity: 'i1',
          runner: 'claude',
          model: 'opus',
          effort: 'high',
          started_at: Date.now() - 65_000
        },
        last_good: null
      })
    );

    expect(mount.textContent).toContain('분석 중 — claude/opus · effort high');
    expect(mount.textContent).toContain('경과 1:05');
    dialog.destroy();
  });

  test('clears the preparation flag on an early refusal', async () => {
    /** @type {(v: any) => void} */
    let resolveStart = () => {};
    const transport = vi.fn(
      () =>
        new Promise((res) => {
          resolveStart = res;
        })
    );
    const { mount, analysisStore } = mountDialog({
      analysis: analysisOf({ job: null, last_good: null }),
      transport
    });
    await flush();
    /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-run')).click();
    await flush();
    expect(analysisStore.isPending()).toBe(true);

    resolveStart({ applied: false, reason: 'settings_incompatible' });
    await flush();

    expect(analysisStore.isPending()).toBe(false);
    expect(mount.textContent).not.toContain('준비 중');
  });

  test('shows the active session id and opens monitoring by run id', async () => {
    const onOpenTranscript = vi.fn();
    const run = {
      run_id: 'analysis-1',
      session_id: '12345678abcdef',
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      started_at: 1_000,
      outcome: 'running',
      prompt_saved: true
    };
    const { mount } = mountDialog({
      analysis: analysisOf({
        job: {
          job_id: run.run_id,
          identity: 'i1',
          session_id: run.session_id,
          runner: run.runner,
          model: run.model,
          effort: run.effort,
          started_at: run.started_at
        },
        runs: [run]
      }),
      onOpenTranscript
    });
    await flush();

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.pa-monitor')
    ).click();

    expect(mount.querySelector('.pa-meta__progress')?.textContent).toContain(
      '12345678'
    );
    expect(onOpenTranscript).toHaveBeenCalledWith(
      'analysis-1',
      expect.objectContaining({
        runner: 'claude',
        session_id: '12345678abcdef',
        status: 'running'
      })
    );
  });

  test('renders the running run in a strip above the dialog body', async () => {
    const { mount } = mountDialog({
      analysis: analysisOf({
        job: {
          job_id: 'analysis-1',
          identity: 'i1',
          runner: 'claude',
          model: 'opus',
          effort: 'high',
          started_at: 1_000
        }
      })
    });
    await flush();

    const strip = /** @type {Element} */ (mount.querySelector('.pa__strip'));

    expect(strip.querySelector('.pa-meta__progress')?.textContent).toContain(
      '분석 중'
    );
    expect(
      strip.compareDocumentPosition(
        /** @type {Element} */ (mount.querySelector('.pa__body'))
      ) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  test('omits the strip when no analysis is in flight', async () => {
    const { mount } = mountDialog({ analysis: analysisOf({}) });
    await flush();

    expect(mount.querySelector('.pa__strip')).toBe(null);
    expect(mount.querySelector('.pa-meta__progress')).toBe(null);
  });

  test('gates the history prompt button on prompt_saved alone', async () => {
    const onOpenTranscript = vi.fn();
    const { mount } = mountDialog({
      analysis: analysisOf({
        runs: [
          {
            run_id: 'analysis-good',
            session_id: 'abcdefgh1234',
            runner: 'codex',
            model: 'sol',
            effort: 'high',
            started_at: 2_000,
            outcome: 'success',
            prompt_saved: true
          },
          {
            run_id: 'analysis-bad',
            session_id: null,
            runner: 'claude',
            model: 'opus',
            effort: 'medium',
            started_at: 1_000,
            outcome: 'failure',
            reason: 'runner_error',
            prompt_saved: false
          }
        ]
      }),
      onOpenTranscript
    });
    await flush();
    const rows = mount.querySelectorAll('.pa-run-row');

    const first_monitor = /** @type {HTMLButtonElement} */ (
      rows[0].querySelector('.pa-run-row__monitor')
    );
    first_monitor.click();

    expect(first_monitor.disabled).toBe(false);
    expect(
      /** @type {HTMLButtonElement} */ (
        rows[0].querySelector('.pa-run-row__prompt')
      ).disabled
    ).toBe(false);
    expect(
      /** @type {HTMLButtonElement} */ (
        rows[1].querySelector('.pa-run-row__prompt')
      ).disabled
    ).toBe(true);
    expect(rows[1].textContent).toContain('실패');
    expect(rows[1].textContent).toContain('runner_error');
    expect(onOpenTranscript).toHaveBeenCalledWith(
      'analysis-good',
      expect.anything()
    );
  });

  test('monitors a run whose session id never arrived', async () => {
    const onOpenTranscript = vi.fn();
    const { mount } = mountDialog({
      analysis: analysisOf({
        runs: [
          {
            run_id: 'analysis-no-session',
            session_id: null,
            runner: 'claude',
            model: 'opus',
            effort: 'high',
            started_at: 1_000,
            outcome: 'interrupted',
            reason: 'server_restart',
            prompt_saved: false
          }
        ]
      }),
      onOpenTranscript
    });
    await flush();
    const monitor = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.pa-run-row__monitor')
    );

    monitor.click();

    expect(monitor.disabled).toBe(false);
    expect(onOpenTranscript).toHaveBeenCalledWith(
      'analysis-no-session',
      expect.objectContaining({ session_id: undefined })
    );
  });

  test('renders an empty history when the snapshot carries no runs', async () => {
    const analysis = analysisOf();
    delete analysis.runs;
    const { mount } = mountDialog({ analysis });

    await flush();

    expect(mount.querySelector('.pa-run-row')).toBe(null);
    expect(mount.querySelector('.pa-runs')?.textContent).toContain(
      '실행 이력 없음'
    );
  });

  test('opens the saved prompt in a fixed popup', async () => {
    const transport = vi.fn(async (type) =>
      type === 'worker-parallel-analysis-prompt'
        ? { ok: true, prompt: 'exact prompt\nsecond line' }
        : { applied: true }
    );
    const { mount } = mountDialog({
      analysis: analysisOf({
        runs: [
          {
            run_id: 'analysis-prompt',
            session_id: 'session-1',
            runner: 'codex',
            model: 'sol',
            effort: 'high',
            started_at: 2_000,
            outcome: 'success',
            prompt_saved: true
          }
        ]
      }),
      transport
    });
    await flush();

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.pa-run-row__prompt')
    ).click();
    await flush();

    const popup = /** @type {HTMLElement} */ (
      mount.querySelector('.pa-prompt-popup')
    );
    expect(transport).toHaveBeenCalledWith('worker-parallel-analysis-prompt', {
      root_dir: '/repo',
      run_id: 'analysis-prompt'
    });
    expect(popup.textContent).toContain('exact prompt\nsecond line');
    expect(popup.querySelector('pre')).not.toBeNull();
    expect(popup.textContent).toContain('복사');
  });

  test('reports a missing saved prompt with a toast', async () => {
    const transport = vi.fn(async (type) =>
      type === 'worker-parallel-analysis-prompt'
        ? { ok: false, reason: 'not_found' }
        : { applied: true }
    );
    const { mount } = mountDialog({
      analysis: analysisOf({
        runs: [
          {
            run_id: 'analysis-missing',
            session_id: 'session-1',
            runner: 'codex',
            model: 'sol',
            effort: 'high',
            started_at: 2_000,
            outcome: 'success',
            prompt_saved: true
          }
        ]
      }),
      transport
    });
    await flush();

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.pa-run-row__prompt')
    ).click();
    await flush();

    expect(document.body.querySelector('.toast')?.textContent).toContain(
      '찾을 수 없습니다'
    );
  });

  test('stops the elapsed timer when the job disappears', () => {
    vi.useFakeTimers();
    try {
      const { analysisStore, dialog } = mountDialog({
        analysis: analysisOf({
          job: {
            job_id: 'job-1',
            identity: 'i1',
            runner: 'claude',
            model: 'opus',
            effort: 'high',
            started_at: Date.now()
          }
        })
      });
      expect(vi.getTimerCount()).toBeGreaterThan(0);

      analysisStore.set(analysisOf({ job: null }));

      expect(vi.getTimerCount()).toBe(0);
      dialog.destroy();
    } finally {
      vi.useRealTimers();
    }
  });

  test('stops the elapsed timer when the dialog closes', () => {
    vi.useFakeTimers();
    try {
      const { dialog } = mountDialog({
        analysis: analysisOf({
          job: {
            job_id: 'job-1',
            identity: 'i1',
            runner: 'claude',
            model: 'opus',
            effort: 'high',
            started_at: Date.now()
          }
        })
      });

      dialog.close();

      expect(vi.getTimerCount()).toBe(0);
      dialog.destroy();
    } finally {
      vi.useRealTimers();
    }
  });

  test('destroy removes the dialog element', () => {
    const { mount, dialog } = mountDialog();

    dialog.destroy();

    expect(mount.querySelector('#worker-parallel-analysis-dialog')).toBeNull();
  });
});

describe('client analysis store pending (UI-yqw9 §4.2)', () => {
  test('a server push does not clear the local preparation flag', () => {
    const store = createWorkerParallelAnalysisStore();
    store.setPending(true);

    store.set(analysisOf());

    expect(store.isPending()).toBe(true);
  });

  test('emits only when the preparation flag actually changes', () => {
    const store = createWorkerParallelAnalysisStore();
    let emits = 0;
    store.subscribe(() => {
      emits += 1;
    });

    store.setPending(true);
    store.setPending(true);

    expect(emits).toBe(1);
  });

  test('clear drops both the snapshot and the preparation flag', () => {
    const store = createWorkerParallelAnalysisStore();
    store.set(analysisOf());
    store.setPending(true);

    store.clear();

    expect(store.get()).toBeNull();
    expect(store.isPending()).toBe(false);
  });
});
