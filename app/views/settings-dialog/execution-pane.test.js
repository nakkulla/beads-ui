import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createExecutionPane } from './execution-pane.js';

const REPO_B = '/tmp/example/repo-b';

const CATALOG = {
  runners: {
    claude: { models: { opus: { id: 'opus', efforts: ['low', 'high'] } } },
    codex: {
      models: {
        sol: {
          id: 'gpt-5.6-sol',
          efforts: ['medium'],
          orchestration_efforts: ['medium', 'ultra']
        }
      }
    }
  },
  model_index: { opus: 'claude', sol: 'codex' }
};

const EXECUTION_DEFAULTS = {
  supported: true,
  schema_version: 1,
  session: {
    workflow_mode_default: 'standard',
    review: {
      default: 'codex',
      reviewers: {
        codex: { model: 'gpt-5.6-sol', effort: 'xhigh' },
        fable: { model: 'fable', effort: 'high' }
      }
    },
    plan_review: { standard_recommended: 'codex', fast_track_default: 'fable' },
    implementation: {
      default: {
        dispatch: 'delegated',
        runtime: 'codex',
        model: 'sol',
        model_id: 'gpt-5.6-sol',
        effort: 'auto',
        speed: 'default'
      },
      model_catalog: { codex: { sol: 'gpt-5.6-sol' } },
      effort_by_transport: {}
    }
  },
  orchestration: {
    runtime: 'claude',
    model: 'opus',
    model_id: 'opus',
    effort: null,
    speed: 'default'
  }
};

/**
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function queueRow(patch = {}) {
  return {
    revision: 3,
    slots: 2,
    serial_lane_count: 1,
    auto_advance: false,
    auto_merge: false,
    auto_repair: false,
    runner_catalog: CATALOG,
    execution_defaults: EXECUTION_DEFAULTS,
    orchestration_model: null,
    orchestration_effort: null,
    orchestration_speed: null,
    ...patch
  };
}

/**
 * @param {{ root_dir?: string|null, queue?: any, values?: Record<string, string>, transport?: any, presets?: any }} [options]
 */
function mount(options = {}) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  /** @type {Array<[string, any]>} */
  const calls = [];
  const transport = vi.fn(async (/** @type {string} */ type, payload) => {
    calls.push([type, payload]);
    if (options.transport) {
      return await options.transport(type, payload);
    }
    return { values: options.values || {}, warnings: [] };
  });
  let queue_state = options.queue || queueRow();
  const notify = vi.fn();
  const pane = createExecutionPane(root, {
    root_dir: options.root_dir ?? null,
    queue: () => queue_state,
    transport,
    implPresetStore: {
      get: () => options.presets || { revision: 1, presets: [] }
    },
    notify,
    onQueueAdopt: (queue) => {
      queue_state = queue;
    }
  });
  return {
    root,
    pane,
    transport,
    notify,
    calls,
    queue: () => queue_state
  };
}

/** Let the pane's `load()` settle. */
async function settle() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

/**
 * @param {HTMLElement} root
 * @param {string} selector
 * @returns {HTMLElement}
 */
function el(root, selector) {
  return /** @type {HTMLElement} */ (root.querySelector(selector));
}

/**
 * @param {Array<[string, any]>} calls
 * @param {string} type
 * @returns {Array<any>}
 */
function payloadsOf(calls, type) {
  return calls.filter(([name]) => name === type).map(([, payload]) => payload);
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('createExecutionPane unbound (root_dir null)', () => {
  test('reads the connected workspace defaults without a root_dir key', async () => {
    const { pane, calls } = mount();

    await pane.load();

    expect(payloadsOf(calls, 'get-session-defaults')).toEqual([{}]);
  });

  test('sends a session edit with the same payload the dialog always sent', async () => {
    const { root, pane, calls } = mount({ values: { impl_runtime: 'codex' } });
    await pane.load();

    const select = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="impl_speed"]')
    );
    select.value = 'fast';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { impl_speed: 'fast' } }
    ]);
  });

  test('sends an orchestration edit with the queue revision only', async () => {
    const { root, pane, calls } = mount();
    await pane.load();

    const select = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="orchestration_model"]')
    );
    select.value = 'opus';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(
      payloadsOf(calls, 'worker-queue-set-orchestration-defaults')
    ).toEqual([
      { expected_revision: 3, values: { orchestration_model: 'opus' } }
    ]);
  });

  test('does not retry a conflicted queue op for the connected workspace', async () => {
    const { root, pane, calls } = mount({
      transport: async (/** @type {string} */ type) =>
        type === 'get-session-defaults'
          ? { values: {}, warnings: [] }
          : { applied: false, conflict: true, queue: { revision: 9 } }
    });
    await pane.load();

    el(root, '[data-automation="auto_advance"]').click();
    await settle();

    expect(payloadsOf(calls, 'worker-automation-toggle')).toHaveLength(1);
  });
});

describe('createExecutionPane bound to another repo', () => {
  test('carries root_dir on both session-defaults ops', async () => {
    const { root, pane, calls } = mount({ root_dir: REPO_B });
    await pane.load();

    const select = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="impl_speed"]')
    );
    select.value = 'fast';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'get-session-defaults')).toEqual([
      { root_dir: REPO_B }
    ]);
    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { impl_speed: 'fast' }, root_dir: REPO_B }
    ]);
  });

  test('carries root_dir on every queue-CAS op the pane owns', async () => {
    const { root, pane, calls } = mount({ root_dir: REPO_B });
    await pane.load();

    const model = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="orchestration_model"]')
    );
    model.value = 'opus';
    model.dispatchEvent(new Event('change'));
    await settle();
    el(root, '[data-automation="auto_advance"]').click();
    await settle();
    el(root, '[data-automation="auto_merge"]').click();
    await settle();
    el(root, '[data-automation="auto_repair"]').click();
    await settle();
    el(
      root,
      '[data-stepper="slots"] button[aria-label="동시 실행 증가"]'
    ).click();
    await settle();
    el(
      root,
      '[data-stepper="serial-lane-count"] button[aria-label="직렬 레인 증가"]'
    ).click();
    await settle();

    for (const type of [
      'worker-queue-set-orchestration-defaults',
      'worker-automation-toggle',
      'worker-merge-auto-toggle',
      'worker-auto-repair-toggle',
      'worker-queue-set-slots',
      'worker-queue-set-serial-lane-count'
    ]) {
      const payloads = payloadsOf(calls, type);
      expect(payloads).toHaveLength(1);
      expect(payloads[0]).toMatchObject({
        root_dir: REPO_B,
        expected_revision: 3
      });
    }
  });

  test('carries root_dir on a global preset apply', async () => {
    const { root, pane, calls } = mount({
      root_dir: REPO_B,
      presets: {
        revision: 4,
        presets: [{ id: 'p1', name: 'p', settings: { impl_runtime: 'codex' } }]
      },
      transport: async (/** @type {string} */ type) =>
        type === 'apply-impl-preset-global'
          ? { applied: true, values: {}, warnings: [], queue_applied: true }
          : { values: {}, warnings: [] }
    });
    await pane.load();

    const select = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    el(root, '[data-preset-apply-global]').click();
    await settle();

    expect(payloadsOf(calls, 'apply-impl-preset-global')).toEqual([
      {
        preset_id: 'p1',
        expected_revision: 4,
        expected_queue_revision: 3,
        root_dir: REPO_B
      }
    ]);
  });

  test('retries a conflicted switch ONCE with the revision the response carried', async () => {
    let seen = 0;
    const { root, pane, calls } = mount({
      root_dir: REPO_B,
      transport: async (/** @type {string} */ type) => {
        if (type !== 'worker-automation-toggle') {
          return { values: {}, warnings: [] };
        }
        seen += 1;
        return seen === 1
          ? { applied: false, conflict: true, queue: { revision: 11 } }
          : { applied: true, queue: { revision: 12 } };
      }
    });
    await pane.load();

    el(root, '[data-automation="auto_advance"]').click();
    await settle();

    expect(payloadsOf(calls, 'worker-automation-toggle')).toEqual([
      { on: true, root_dir: REPO_B, expected_revision: 3 },
      { on: true, root_dir: REPO_B, expected_revision: 11 }
    ]);
  });

  test('retries a preset apply whose queue half lost the CAS', async () => {
    let seen = 0;
    const { root, pane, calls } = mount({
      root_dir: REPO_B,
      presets: {
        revision: 4,
        presets: [{ id: 'p1', name: 'p', settings: { impl_runtime: 'codex' } }]
      },
      transport: async (/** @type {string} */ type) => {
        if (type !== 'apply-impl-preset-global') {
          return { values: {}, warnings: [] };
        }
        seen += 1;
        return seen === 1
          ? {
              applied: true,
              values: {},
              warnings: [],
              queue_applied: false,
              queue: { revision: 21 }
            }
          : { applied: true, values: {}, warnings: [], queue_applied: true };
      }
    });
    await pane.load();

    const select = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    el(root, '[data-preset-apply-global]').click();
    await settle();

    const payloads = payloadsOf(calls, 'apply-impl-preset-global');
    expect(payloads).toHaveLength(2);
    expect(payloads[1].expected_queue_revision).toBe(21);
  });
});

describe('createExecutionPane automation section', () => {
  test('renders each switch from the bound queue snapshot', async () => {
    const { root, pane } = mount({
      queue: queueRow({ auto_advance: true, auto_repair: true })
    });

    await pane.load();

    expect(
      el(root, '[data-automation="auto_advance"]').getAttribute('aria-pressed')
    ).toBe('true');
    expect(
      el(root, '[data-automation="auto_merge"]').getAttribute('aria-pressed')
    ).toBe('false');
    expect(
      el(root, '[data-automation="auto_repair"]').getAttribute('aria-pressed')
    ).toBe('true');
  });

  test('renders the concurrency and serial-lane counts of that repo', async () => {
    const { root, pane } = mount({
      queue: queueRow({ slots: 4, serial_lane_count: 3 })
    });

    await pane.load();

    expect(
      el(root, '[data-stepper="slots"] .settings-dialog__stepper-value')
        .textContent
    ).toContain('4');
    expect(
      el(
        root,
        '[data-stepper="serial-lane-count"] .settings-dialog__stepper-value'
      ).textContent
    ).toContain('3');
  });

  test('refuses to send a serial lane count past the contract bound', async () => {
    const { root, pane, calls } = mount({
      queue: queueRow({ serial_lane_count: 5 })
    });
    await pane.load();

    el(
      root,
      '[data-stepper="serial-lane-count"] button[aria-label="직렬 레인 증가"]'
    ).click();
    await settle();

    expect(payloadsOf(calls, 'worker-queue-set-serial-lane-count')).toEqual([]);
  });

  test('refuses to send a slots value below the contract bound', async () => {
    const { root, pane, calls } = mount({ queue: queueRow({ slots: 1 }) });
    await pane.load();

    el(
      root,
      '[data-stepper="slots"] button[aria-label="동시 실행 감소"]'
    ).click();
    await settle();

    expect(payloadsOf(calls, 'worker-queue-set-slots')).toEqual([]);
  });
});

describe('createExecutionPane lifecycle', () => {
  test('keeps the edit and notifies when a session save fails', async () => {
    const { root, pane, notify } = mount({
      transport: async (/** @type {string} */ type) => {
        if (type === 'get-session-defaults') {
          return { values: {}, warnings: [] };
        }
        throw new Error('kv read-only');
      }
    });
    await pane.load();

    const select = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="impl_speed"]')
    );
    select.value = 'fast';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(notify).toHaveBeenCalled();
    expect(pane.sessionDraft()).toEqual({ impl_speed: 'fast' });
  });

  test('destroy empties the host and stops rendering into it', async () => {
    const { root, pane } = mount();
    await pane.load();

    pane.destroy();
    pane.render();

    expect(root.children).toHaveLength(0);
  });

  test('destroy leaves no listener that a later click could still reach', async () => {
    const { root, pane, calls } = mount();
    await pane.load();
    const toggle = el(root, '[data-automation="auto_advance"]');

    pane.destroy();
    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await settle();

    expect(payloadsOf(calls, 'worker-automation-toggle')).toEqual([]);
  });
});
