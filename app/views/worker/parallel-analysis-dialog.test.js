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
      }
    }
  };
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
    last_good: {
      identity_digest: DIGEST,
      at: 1_000,
      result: {
        schema_version: 2,
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
 * @param {{ queue?: any, analysis?: any, transport?: any }} [options]
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
  const transport = options.transport || vi.fn(async () => ({ applied: true }));
  const dialog = createParallelAnalysisDialog(mount, {
    queueStore,
    analysisStore,
    transport
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
  test('renders the analyzer settings and the pinned analysis meta', () => {
    const { mount } = mountDialog();

    const root = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-parallel-analysis-dialog')
    );
    expect(root).not.toBeNull();
    expect(root.textContent).toContain('opus');
    expect(root.textContent).toContain('대상 3');
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

    /** @type {HTMLButtonElement} */ (mount.querySelector('.pa-run')).click();
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-parallel-analysis-start',
      expect.objectContaining({ force: false })
    );
  });

  test('reanalyze forces a fresh run', async () => {
    const { mount, transport } = mountDialog();

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

  test('destroy removes the dialog element', () => {
    const { mount, dialog } = mountDialog();

    dialog.destroy();

    expect(mount.querySelector('#worker-parallel-analysis-dialog')).toBeNull();
  });
});
