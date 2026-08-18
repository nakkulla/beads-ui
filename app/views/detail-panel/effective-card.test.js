/**
 * The issue detail's summary header and effective-settings card (spec §E) as a
 * rendered surface. The layer arithmetic itself is covered by
 * `effective-settings.test.js`; this file asserts what a reader actually sees
 * and what each control sends.
 */
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createExecPresetStore } from '../../data/exec-preset-store.js';
import { createSubscriptionIssueStores } from '../../data/subscription-issue-stores.js';
import { createWorkerQueueStore } from '../../data/worker-queue-store.js';
import { createDetailPanel } from './index.js';

const CATALOG = {
  runners: {
    claude: { command: 'claude', models: { opus: { efforts: ['high'] } } },
    codex: { command: 'codex', models: { sol: { efforts: ['medium'] } } }
  }
};

const BASE_ISSUE = {
  id: 'UI-1',
  title: '인증 모듈',
  status: 'in_progress',
  priority: 1,
  updated_at: 1700000000000,
  created_at: 1700000000000
};

/**
 * @param {HTMLElement} mount
 * @param {{ metadata?: Record<string, unknown>, session_defaults?: Record<string, string>, queue?: Record<string, unknown>, presets?: any, transport?: any, workflow?: Record<string, unknown> }} [options]
 */
function seed(mount, options = {}) {
  const issue = {
    ...BASE_ISSUE,
    metadata: options.metadata || {},
    ...(options.workflow ? { workflow: options.workflow } : {})
  };
  const issueStores = createSubscriptionIssueStores();
  const queueStore = createWorkerQueueStore();
  queueStore.set(
    /** @type {any} */ ({
      revision: 1,
      auto_advance: false,
      queue: [],
      done: [],
      attempts: {},
      runner_catalog: CATALOG,
      orchestration_model: null,
      orchestration_effort: null,
      orchestration_speed: null,
      ...(options.queue || {})
    })
  );
  const execPresetStore = createExecPresetStore();
  if (options.presets) {
    execPresetStore.set(options.presets);
  }
  const transport =
    options.transport ||
    vi.fn(async (/** @type {string} */ type) =>
      type === 'get-session-defaults'
        ? { values: options.session_defaults || {}, warnings: [] }
        : []
    );
  const panel = createDetailPanel(mount, {
    issueStores,
    queueStore,
    execPresetStore,
    transport,
    onClose: vi.fn()
  });
  issueStores.register('detail:UI-1', {
    type: 'issue-detail',
    params: { id: 'UI-1' }
  });
  issueStores.getStore('detail:UI-1')?.applyPush({
    type: 'snapshot',
    id: 'detail:UI-1',
    revision: 1,
    issues: /** @type {any} */ ([issue])
  });
  panel.load('UI-1');
  return { panel, transport, execPresetStore };
}

/** Let the panel's session-defaults read settle. */
async function settle() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

/**
 * @param {HTMLElement} mount
 * @param {string} key
 */
function rowOf(mount, key) {
  return /** @type {HTMLElement} */ (
    mount.querySelector(`.detail-effective__row[data-key="${key}"]`)
  );
}

beforeEach(() => {
  document.body.innerHTML = '<div id="m"></div>';
});

describe('detail summary header', () => {
  test('shows the status, route and PR chips', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, {
      metadata: { route: 'full_plan', pr_url: 'https://example.test/pr/1' }
    });
    await settle();

    const header = /** @type {HTMLElement} */ (
      mount.querySelector('[data-seam="detail-summary"]')
    );

    expect(header.textContent).toContain('in_progress');
    expect(header.textContent).toContain('full_plan');
    expect(header.querySelector('.detail-summary__chip--pr')).not.toBe(null);
    panel.destroy();
  });

  test('renders the exec_receipt chip when the bead carries one', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, {
      metadata: { exec_receipt: `main:user_choice@${'a'.repeat(40)}` }
    });
    await settle();

    expect(
      mount.querySelector('.detail-summary__chip--receipt')?.textContent
    ).toContain('main:user_choice');
    panel.destroy();
  });

  test('renders planned main execution beside its actual receipt', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, {
      metadata: { exec_receipt: `main:국소 수정@${'a'.repeat(40)}` },
      workflow: {
        planned_execution: { kind: 'main', reason: '직접 통합 필요' },
        exec_receipt: {
          kind: 'main',
          actor: '국소 수정',
          sha: 'a'.repeat(40)
        }
      }
    });

    await settle();

    const planned_chip = /** @type {HTMLElement} */ (
      mount.querySelector('.detail-summary__chip--planned')
    );
    expect(planned_chip.textContent?.trim()).toBe('계획 · 메인');
    expect(planned_chip.title).toContain('직접 통합 필요');
    expect(
      mount.querySelector('.detail-summary__chip--receipt')
    ).not.toBeNull();
    panel.destroy();
  });

  test('renders the same visible mismatch and tooltip as the board', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, {
      metadata: { exec_receipt: `delegated:gpt-5.6-sol@${'b'.repeat(40)}` },
      workflow: {
        planned_execution: { kind: 'main', reason: '직접 통합 필요' },
        exec_receipt: {
          kind: 'delegated',
          actor: 'gpt-5.6-sol',
          sha: 'b'.repeat(40)
        }
      }
    });

    await settle();

    const planned_chip = /** @type {HTMLElement} */ (
      mount.querySelector('.detail-summary__chip--planned')
    );
    expect(planned_chip.textContent?.trim()).toBe('계획 · 메인 → 위임');
    expect(planned_chip.title).toBe(
      `planned_execution main:직접 통합 필요 · exec_receipt delegated:gpt-5.6-sol@${'b'.repeat(40)}`
    );
    panel.destroy();
  });

  test('omits malformed normalized planned execution from the summary', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, {
      metadata: {
        planned_execution: 'main',
        planned_execution_reason: ''
      },
      workflow: {
        planned_execution: null,
        exec_receipt: null
      }
    });

    await settle();

    expect(mount.querySelector('.detail-summary__chip--planned')).toBeNull();
    panel.destroy();
  });

  test('preserves the summary chip layout without workflow metadata', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount);

    await settle();

    const chips = mount.querySelectorAll('.detail-summary__chips > *');
    expect(chips).toHaveLength(1);
    expect(chips[0].classList.contains('detail-summary__chip--status')).toBe(
      true
    );
    panel.destroy();
  });

  test("lights a gate from the server stage's fill vocabulary", async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, {
      workflow: {
        stages: { impl: { fill: 'full' }, pr: { fill: 'dim' } }
      }
    });
    await settle();

    expect(
      mount
        .querySelector('[data-gate="impl"]')
        ?.classList.contains('detail-summary__gate--on')
    ).toBe(true);
    expect(
      mount
        .querySelector('[data-gate="pr"]')
        ?.classList.contains('detail-summary__gate--current')
    ).toBe(true);
    panel.destroy();
  });

  test('lights a gate whose receipt is present', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, {
      metadata: { spec_review: `codex@${'b'.repeat(40)}` }
    });
    await settle();

    expect(
      mount
        .querySelector('[data-gate="spec"]')
        ?.classList.contains('detail-summary__gate--on')
    ).toBe(true);
    panel.destroy();
  });
});

describe('effective-settings card', () => {
  test('marks a bead-pinned key as 핀', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, { metadata: { impl_model: 'sol' } });
    await settle();

    const row = rowOf(mount, 'impl_model');

    expect(
      row.querySelector('.detail-layer-rail')?.getAttribute('data-source')
    ).toBe('pin');
    expect(row.textContent).toContain('핀');
    expect(row.textContent).toContain('sol');
    panel.destroy();
  });

  test('marks a workspace kv value as 전역', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, {
      session_defaults: { impl_model: 'sol' }
    });
    await settle();

    const row = rowOf(mount, 'impl_model');

    expect(
      row.querySelector('.detail-layer-rail')?.getAttribute('data-source')
    ).toBe('global');
    expect(row.textContent).toContain('전역');
    panel.destroy();
  });

  test('shows a 기본 row without duplicating any harness value', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount);
    await settle();

    const row = rowOf(mount, 'impl_model');

    expect(
      row.querySelector('.detail-layer-rail')?.getAttribute('data-source')
    ).toBe('base');
    expect(row.textContent).toContain('(harness 기본)');
    panel.destroy();
  });

  test('lets a bead pin beat the workspace default', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, {
      metadata: { workflow_mode: 'standard' },
      session_defaults: { workflow_mode: 'fast_track' }
    });
    await settle();

    const row = rowOf(mount, 'workflow_mode');

    expect(row.textContent).toContain('standard');
    expect(
      row.querySelector('.detail-layer-rail')?.getAttribute('data-source')
    ).toBe('pin');
    panel.destroy();
  });

  test('reads the Worker group from the queue orchestration values', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, {
      queue: { orchestration_model: 'opus' }
    });
    await settle();

    const row = rowOf(mount, 'orchestration_model');

    expect(row.textContent).toContain('opus');
    expect(
      row.querySelector('.detail-layer-rail')?.getAttribute('data-source')
    ).toBe('global');
    panel.destroy();
  });

  test('counts the pinned and workspace-sourced keys in the summary', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, {
      metadata: { impl_model: 'sol', impl_runtime: 'codex' },
      session_defaults: { workflow_mode: 'fast_track' }
    });
    await settle();

    expect(
      mount.querySelector('.detail-effective__count--pin')?.textContent
    ).toContain('2');
    expect(
      mount.querySelector('.detail-effective__count--global')?.textContent
    ).toContain('1');
    panel.destroy();
  });

  test('writes workflow_mode=standard as a literal, not a deletion', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel, transport } = seed(mount);
    await settle();
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-seam="effective-settings-toggle"]')
    ).click();

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-edit-key="workflow_mode"]')
    );
    select.value = 'standard';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(transport).toHaveBeenCalledWith('update-exec-settings', {
      id: 'UI-1',
      key: 'workflow_mode',
      value: 'standard'
    });
    panel.destroy();
  });

  test('sends an empty value for the (기본) choice — the only deletion', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel, transport } = seed(mount, {
      metadata: { workflow_mode: 'fast_track' }
    });
    await settle();
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-seam="effective-settings-toggle"]')
    ).click();

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-edit-key="workflow_mode"]')
    );
    select.value = '';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(transport).toHaveBeenCalledWith('update-exec-settings', {
      id: 'UI-1',
      key: 'workflow_mode',
      value: ''
    });
    panel.destroy();
  });

  test('applies an implementation preset to the bead with the snapshot revision', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn(async (/** @type {string} */ type) => {
      if (type === 'get-session-defaults') {
        return { values: {}, warnings: [] };
      }
      if (type === 'apply-impl-preset') {
        return {
          applied: true,
          conflict: false,
          revision: 4,
          issue: { ...BASE_ISSUE, metadata: { impl_dispatch: 'main' } }
        };
      }
      return [];
    });
    const { panel } = seed(mount, {
      transport,
      presets: {
        revision: 4,
        presets: [
          {
            id: 'p1',
            name: '메인 구현',
            settings: { impl_dispatch: 'main' },
            compatible: true
          }
        ]
      }
    });
    await settle();
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-seam="effective-settings-toggle"]')
    ).click();

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-impl-preset-select]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change'));
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-apply-impl-preset]')
    ).click();
    await settle();

    expect(transport).toHaveBeenCalledWith('apply-impl-preset', {
      id: 'UI-1',
      preset_id: 'p1',
      expected_revision: 4
    });
    panel.destroy();
  });

  test('offers no preset apply until one is chosen', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount, {
      presets: { revision: 1, presets: [] }
    });
    await settle();
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-seam="effective-settings-toggle"]')
    ).click();

    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('[data-apply-impl-preset]')
      ).disabled
    ).toBe(true);
    panel.destroy();
  });

  test('groups the editor into 워크플로우 · 리뷰 · 구현 · Worker', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seed(mount);
    await settle();

    const subheads = Array.from(
      mount.querySelectorAll('.detail-effective__subhead')
    ).map((el) => el.textContent?.trim());

    expect(subheads).toEqual(['워크플로우', '리뷰', '구현', 'Worker']);
    panel.destroy();
  });
});
