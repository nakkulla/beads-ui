import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createCompareView } from './index.js';

/** Let every pending microtask and timer-0 callback run. */
function settle() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

const RUN = {
  run_id: 'bench-1',
  source_bead_id: 'UI-src',
  base_sha: 'a'.repeat(40),
  repeats: 3,
  reviewer_mode: 'fixed',
  reviewer: {
    impl_review_model: 'sonnet',
    impl_review_effort: 'high',
    impl_review_speed: 'default'
  },
  delegate_forced: true,
  created_at: 1750000000000,
  root_dir: '/repo',
  cell_count: 9,
  terminal_count: 3,
  presets: [{ id: 'p1', name: '프리셋 A' }],
  cells: [
    {
      preset_id: 'p1',
      k: 1,
      bead_id: 'UI-c1',
      attempt_id: 'a1',
      status: 'done',
      terminal: true,
      bench_verify: { ok: true }
    },
    {
      preset_id: 'p1',
      k: 2,
      bead_id: 'UI-c2',
      attempt_id: 'a2',
      status: 'done',
      terminal: true,
      bench_verify: { ok: true }
    }
  ]
};

const ISSUES = [
  {
    id: 'UI-src',
    title: '원본 이슈',
    metadata: { route: 'quick_fix', quick_fix_review: 'self@abcdef123456' }
  },
  {
    id: 'UI-spec',
    title: '스펙 이슈',
    metadata: { route: 'spec_backed' }
  }
];

/**
 * @param {{ runs?: any[], onCreate?: (payload: any) => any }} [options]
 */
function mountView(options = {}) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const calls = /** @type {Array<{ type: string, payload: any }>} */ ([]);
  const transport = vi.fn(async (type, payload) => {
    calls.push({ type, payload });
    if (type === 'bench-run-list') {
      return { payload: { root_dir: '/repo', runs: options.runs ?? [RUN] } };
    }
    if (type === 'get-compare') {
      return {
        payload: {
          rows: [
            {
              attempt_id: 'a1',
              bead_id: 'UI-c1',
              status: 'done',
              verify: 'pass',
              duration_ms: 1000
            },
            {
              attempt_id: 'a2',
              bead_id: 'UI-c2',
              status: 'done',
              verify: 'pass',
              duration_ms: 3000
            }
          ],
          groups: [],
          workspaces: []
        }
      };
    }
    if (type === 'bench-run-create') {
      return options.onCreate
        ? options.onCreate(payload)
        : { payload: { run: RUN } };
    }
    return { payload: {} };
  });
  const view = createCompareView(root, {
    transport,
    execPresetStore: {
      get: () => ({ presets: [{ id: 'p1', name: '프리셋 A', settings: {} }] })
    },
    sourceCandidates: () => ISSUES
  });
  return { root, view, transport, calls };
}

/**
 * @param {HTMLElement} root
 */
function openForm(root) {
  /** @type {HTMLButtonElement} */ (
    root.querySelector('.cmp-bench__new')
  ).click();
}

describe('compare view experiment list', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('lists an experiment with its progress fraction', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();

    expect(root.querySelector('.cmp-run__progress')?.textContent?.trim()).toBe(
      '3/9'
    );
  });

  test('names the source issue by title when it is loaded', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();

    expect(root.querySelector('.cmp-run__title')?.textContent).toContain(
      '원본 이슈'
    );
  });

  test('writes pass^k next to the success rate of a repeated preset', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    /** @type {HTMLButtonElement} */ (root.querySelector('.cmp-run')).click();
    await settle();

    const table = /** @type {HTMLElement} */ (
      root.querySelector('.cmp-table--bench')
    );
    expect(table.textContent).toContain('pass^2');
  });

  test('marks the experiment table as delegate-forced', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    /** @type {HTMLButtonElement} */ (root.querySelector('.cmp-run')).click();
    await settle();

    expect(root.querySelector('.cmp-run-detail__flag')?.textContent).toContain(
      '구현 위임 강제'
    );
  });

  test('shows a read failure with a retry button', async () => {
    const { root, view } = mountView();
    const failing = createCompareView(root, {
      transport: vi.fn(async (type) => {
        if (type === 'bench-run-list') {
          throw { code: 'bench_run_list_failed', message: 'boom' };
        }
        return { payload: { rows: [], groups: [], workspaces: [] } };
      })
    });

    failing.load();
    await settle();

    expect(root.querySelector('.cmp-error')?.textContent).toContain(
      '실험 목록'
    );
    view.destroy();
    failing.destroy();
  });
});

describe('compare view new-experiment form', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('offers an eligible quick_fix source', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    openForm(root);

    const option = /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-source-id="UI-src"]')
    );
    expect(option.disabled).toBe(false);
  });

  test('refuses a non quick_fix source and shows the reason', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    openForm(root);

    const option = /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-source-id="UI-spec"]')
    );
    expect(option.disabled).toBe(true);
    expect(option.textContent).toContain('quick_fix');
  });

  test('seeds the fixed reviewer from the previous experiment', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    openForm(root);

    const input = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-reviewer-key="impl_review_model"]')
    );
    expect(input.value).toBe('sonnet');
  });

  test('falls back to the documented reviewer triple without experiments', async () => {
    const { root, view } = mountView({ runs: [] });

    view.load();
    await settle();
    openForm(root);

    const input = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-reviewer-key="impl_review_effort"]')
    );
    expect(input.value).toBe('xhigh');
  });

  test('hides the fixed reviewer inputs in preset reviewer mode', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    openForm(root);
    const radio = /** @type {HTMLInputElement} */ (
      root.querySelector('input[name="cmp-reviewer-mode"][value="preset"]')
    );
    radio.checked = true;
    radio.dispatchEvent(new Event('change'));

    expect(
      root.querySelector('[data-reviewer-key="impl_review_model"]')
    ).toBeNull();
  });

  test('clamps a repeat count above the maximum', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    openForm(root);
    const input = /** @type {HTMLInputElement} */ (
      root.querySelector('.cmp-form__input--repeats')
    );
    input.value = '9';
    input.dispatchEvent(new Event('change'));

    expect(
      /** @type {HTMLInputElement} */ (
        root.querySelector('.cmp-form__input--repeats')
      ).value
    ).toBe('5');
  });

  test('keeps submit disabled until a source and a preset are chosen', async () => {
    const { root, view } = mountView();

    view.load();
    await settle();
    openForm(root);

    expect(
      /** @type {HTMLButtonElement} */ (
        root.querySelector('.cmp-form__actions button[type="submit"]')
      ).disabled
    ).toBe(true);
  });

  test('sends the chosen inputs to bench-run-create', async () => {
    const { root, view, calls } = mountView();

    view.load();
    await settle();
    openForm(root);
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-source-id="UI-src"]')
    ).click();
    const preset = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-preset-id="p1"]')
    );
    preset.checked = true;
    preset.dispatchEvent(new Event('change'));
    /** @type {HTMLFormElement} */ (
      root.querySelector('.cmp-form')
    ).dispatchEvent(new Event('submit'));
    await settle();

    const created = calls.find((call) => call.type === 'bench-run-create');
    expect(created?.payload).toMatchObject({
      source_id: 'UI-src',
      preset_ids: ['p1'],
      repeats: 1,
      reviewer_mode: 'fixed'
    });
  });

  test('reports an aborted creation with the closed clone ids', async () => {
    const { root, view } = mountView({
      onCreate: () => {
        throw {
          code: 'bench_run_create_failed',
          message: 'clone_create_failed',
          details: { aborted: ['UI-x1'] }
        };
      }
    });

    view.load();
    await settle();
    openForm(root);
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-source-id="UI-src"]')
    ).click();
    const preset = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-preset-id="p1"]')
    );
    preset.checked = true;
    preset.dispatchEvent(new Event('change'));
    /** @type {HTMLFormElement} */ (
      root.querySelector('.cmp-form')
    ).dispatchEvent(new Event('submit'));
    await settle();

    expect(root.querySelector('.cmp-form .cmp-error')?.textContent).toContain(
      'UI-x1'
    );
  });
});
