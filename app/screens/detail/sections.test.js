/**
 * The issue detail screen as UI-dbn6 §3.5 lays it out: the section order, the
 * full-screen sheet, the ops the rewrite touches (route exit, the worker ops
 * naming the connected repo), the active-model filter of the model choices
 * (ADR UI-ooc0), the settings entry, the interactive session badges, and the
 * `전역` layer refresh. The per-op payloads the detail inherited are in
 * `index.test.js` and `effective-card.test.js`.
 */
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createSubscriptionIssueStores } from '../../model/subscription-issue-stores.js';
import { fakeMatchMedia } from '../pipeline/test-harness.js';
import { createDetailPanel } from './index.js';

const CATALOG = {
  runners: {
    claude: {
      command: 'claude',
      models: {
        opus: { id: 'opus', efforts: ['high'] },
        haiku: { id: 'haiku', efforts: ['low'] }
      }
    },
    codex: {
      command: 'codex',
      models: { sol: { id: 'gpt-5.6-sol', efforts: ['medium'] } }
    }
  },
  model_index: { opus: 'claude', haiku: 'claude', sol: 'codex' }
};

const RECORD = {
  root_dir: '/repo',
  bead_id: 'UI-1',
  wait_id: 'w-0123456789ab',
  stage: 'hold',
  owner_kind: 'worker',
  jobs: [
    {
      ssh_host: 'hpc',
      job_id: '42',
      state: 'RUNNING',
      submitted_at: '2026-09-30T00:00:00Z',
      log_path: '/scratch/job.log'
    }
  ],
  next_observation_at: '2026-09-30T01:00:00Z'
};

/** @type {ReturnType<typeof createDetailPanel>|null} */
let panel = null;

/**
 * @param {{ metadata?: Record<string, unknown>, spec_id?: string, queue?: Record<string, unknown>|null, workspace?: string, width?: number, disabled?: string[], transport?: any, transcript?: any, onOpenExecPresets?: () => void, pipeline?: any }} [options]
 */
function mountDetail(options = {}) {
  document.body.innerHTML = '<section id="detail-panel"></section>';
  const mount = /** @type {HTMLElement} */ (
    document.getElementById('detail-panel')
  );
  const issueStores = createSubscriptionIssueStores();
  /** @type {any} */
  let queue =
    options.queue === null
      ? null
      : {
          revision: 7,
          queue: [],
          serial_lanes: [],
          done: [],
          attempts: {},
          runner_catalog: CATALOG,
          ...(options.queue || {})
        };
  /** @type {Set<() => void>} */
  const queue_listeners = new Set();
  const queueStore = {
    get: () => queue,
    set: vi.fn((/** @type {any} */ next) => {
      queue = next;
    }),
    subscribe: (/** @type {() => void} */ fn) => {
      queue_listeners.add(fn);
      return () => queue_listeners.delete(fn);
    }
  };
  const transport =
    options.transport ||
    vi.fn(async (/** @type {string} */ type) => {
      if (type === 'get-session-defaults') {
        return { values: {}, warnings: [] };
      }
      if (type === 'worker-queue-place') {
        return { applied: true, conflict: false, queue: { revision: 8 } };
      }
      return [];
    });
  panel = createDetailPanel(mount, {
    issueStores,
    queueStore,
    transport,
    getWorkspacePath: () => options.workspace ?? '/repo',
    matchMedia: fakeMatchMedia({ width: options.width ?? 1280 }),
    modelVisibilityStore: {
      get: () => ({ disabled_models: options.disabled || [] })
    },
    ...(options.pipeline ? { pipelineStore: options.pipeline } : {}),
    ...(options.transcript ? { transcript: options.transcript } : {}),
    ...(options.onOpenExecPresets
      ? { onOpenExecPresets: options.onOpenExecPresets }
      : {}),
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
    issues: /** @type {any} */ ([
      {
        id: 'UI-1',
        title: '상세 화면',
        status: 'open',
        priority: 2,
        description: '**굵게** 설명',
        labels: [],
        dependencies: [],
        dependents: [],
        ...(options.spec_id ? { spec_id: options.spec_id } : {}),
        metadata: options.metadata || {}
      }
    ])
  });
  panel.load('UI-1');
  return {
    mount,
    transport,
    queueStore,
    /** @param {any} next */
    setQueue(next) {
      queue = next;
      for (const fn of Array.from(queue_listeners)) {
        fn();
      }
    }
  };
}

/** @returns {Promise<void>} */
async function settle() {
  for (let index = 0; index < 20; index++) {
    await Promise.resolve();
  }
}

/**
 * @param {HTMLElement} mount
 * @param {string} key
 * @returns {Promise<string[]>}
 */
async function optionsOf(mount, key) {
  /** @type {HTMLElement} */ (
    mount.querySelector('[data-seam="effective-settings-toggle"]')
  ).click();
  await settle();
  const select = /** @type {HTMLSelectElement} */ (
    mount.querySelector(`select[data-edit-key="${key}"]`)
  );
  return Array.from(select.options).map((option) =>
    String(option.textContent).trim()
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  panel?.destroy();
  panel = null;
});

describe('detail layout (UI-dbn6 §3.5)', () => {
  test('draws the sections in the §3.5 order', () => {
    const { mount } = mountDetail({
      queue: {
        external_waits: [RECORD],
        wait_reasons: []
      }
    });

    const order = Array.from(mount.querySelectorAll('[data-section]')).map(
      (el) => /** @type {HTMLElement} */ (el).dataset.section
    );

    expect(order).toEqual([
      'head',
      'title',
      'stepper',
      'exec',
      'deps',
      'props',
      'desc',
      'external',
      'history',
      'comments',
      'prompt'
    ]);
  });

  test('opens as a full-screen sheet below 720px', () => {
    const { mount } = mountDetail({ width: 390 });

    const overlay = mount.querySelector('.dt-overlay');

    expect(overlay?.classList.contains('dt-overlay--sheet')).toBe(true);
  });

  test('opens as the right-hand panel from 720px', () => {
    const { mount } = mountDetail({ width: 1280 });

    const overlay = mount.querySelector('.dt-overlay');

    expect(overlay?.classList.contains('dt-overlay--sheet')).toBe(false);
  });

  test('renders the description as markdown', () => {
    const { mount } = mountDetail();

    const strong = mount.querySelector('.detail-overlay__desc strong');

    expect(strong?.textContent).toBe('굵게');
  });
});

describe('detail ops (UI-dbn6 §3.2·부록 A 상세)', () => {
  test('sends update-workflow-meta once the full_plan exit is confirmed', async () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true);
    const { mount, transport } = mountDetail({
      metadata: { route: 'full_plan' }
    });
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-edit="wfmeta-route"]')
    );

    select.value = 'spec_backed';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(confirm).toHaveBeenCalledTimes(1);
    expect(transport).toHaveBeenCalledWith('update-workflow-meta', {
      id: 'UI-1',
      key: 'route',
      value: 'spec_backed'
    });
    confirm.mockRestore();
  });

  test('sends nothing when the full_plan exit is declined', async () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    const { mount, transport } = mountDetail({
      metadata: { route: 'full_plan' }
    });
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-edit="wfmeta-route"]')
    );

    select.value = 'quick_fix';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(
      transport.mock.calls.filter(
        (/** @type {any[]} */ call) => call[0] === 'update-workflow-meta'
      )
    ).toEqual([]);
    confirm.mockRestore();
  });

  test('names the connected repo on worker-queue-place', async () => {
    const { mount, transport } = mountDetail({
      workspace: '/repo',
      spec_id: 'docs/specs/x.md',
      metadata: { route: 'spec_backed', spec_review: `codex@${'a'.repeat(40)}` }
    });

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-overlay__place')
    ).click();
    await settle();

    expect(transport).toHaveBeenCalledWith('worker-queue-place', {
      bead_id: 'UI-1',
      root_dir: '/repo',
      expected_revision: 7
    });
  });

  test('names the connected repo on worker-attempt-resume', async () => {
    const { mount, transport } = mountDetail({
      workspace: '/repo',
      queue: {
        attempts: {
          'att-1': {
            attempt_id: 'att-1',
            bead_id: 'UI-1',
            status: 'failed',
            session_id: 'sid-att-1',
            started_at: 1
          }
        }
      }
    });

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-session__resume[data-attempt-id="att-1"]')
    ).click();
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await settle();

    expect(transport).toHaveBeenCalledWith('worker-attempt-resume', {
      attempt_id: 'att-1',
      expected_revision: 7,
      root_dir: '/repo'
    });
  });

  test('opens the repo settings from 프리셋 바꾸기', () => {
    const onOpenExecPresets = vi.fn();
    const { mount } = mountDetail({ onOpenExecPresets });

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-op="open-exec-presets"]')
    ).click();

    expect(onOpenExecPresets).toHaveBeenCalledTimes(1);
  });
});

describe('detail model choices (ADR UI-ooc0)', () => {
  test('drops a disabled model from the implementation model choices', async () => {
    const { mount } = mountDetail({
      disabled: ['haiku'],
      metadata: { impl_runtime: 'claude' }
    });

    const labels = await optionsOf(mount, 'impl_model');

    expect(labels.some((label) => label.startsWith('haiku'))).toBe(false);
    expect(labels.some((label) => label.startsWith('opus'))).toBe(true);
  });

  test('keeps a stored disabled implementation model as (비활성)', async () => {
    const { mount } = mountDetail({
      disabled: ['haiku'],
      metadata: { impl_runtime: 'claude', impl_model: 'haiku' }
    });

    const labels = await optionsOf(mount, 'impl_model');

    expect(labels).toContain('haiku (비활성)');
  });

  test('drops a disabled model from the orchestration model choices', async () => {
    const { mount } = mountDetail({ disabled: ['sol'] });

    const labels = await optionsOf(mount, 'orchestration_model');

    expect(labels.some((label) => label.startsWith('sol'))).toBe(false);
  });

  test('keeps a stored disabled orchestration model as (비활성)', async () => {
    const { mount } = mountDetail({
      disabled: ['sol'],
      metadata: { orchestration_model: 'sol' }
    });

    const labels = await optionsOf(mount, 'orchestration_model');

    expect(labels).toContain('sol (비활성)');
  });
});

describe('detail history sessions (UI-nuwy, drawn only)', () => {
  const SESSION = {
    bead_id: 'UI-1',
    kind: 'inquiry',
    provider: 'claude',
    session_id: 'sid-7',
    mode: 'resume',
    source: 'attempt',
    fallback_reason: null,
    attempt_id: 'att-1',
    tmux_session: 'bdui',
    tmux_window: 'w1',
    state: 'live',
    settled_at: null,
    launched_at: 1,
    discord_url: 'https://discord.test/channels/1/2',
    turn_state: 'running',
    turn_state_since: 1,
    conversation: { processed_message_at: null, result: null }
  };

  test('draws the inquiry session badge with its Discord link', () => {
    const { mount } = mountDetail({
      queue: { interactive_sessions: { 'k-1': SESSION } }
    });

    const link = /** @type {HTMLAnchorElement|null} */ (
      mount.querySelector('[data-section="history"] a.pl-link')
    );

    expect(link?.href).toBe('https://discord.test/channels/1/2');
    expect(
      mount.querySelector('[data-section="history"] .pl-badge--session')
        ?.textContent
    ).toContain('대화 중');
  });

  test('opens the live session log from the session badge', () => {
    const transcript = {
      open: vi.fn(),
      openSessionLog: vi.fn(),
      close: vi.fn(),
      destroy: vi.fn()
    };
    const { mount } = mountDetail({
      transcript,
      queue: { interactive_sessions: { 'k-1': SESSION } }
    });

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-section="history"] [data-op="session-log"]')
    ).click();

    expect(transcript.openSessionLog).toHaveBeenCalledWith(
      'claude',
      'sid-7',
      'UI-1',
      '/repo'
    );
  });
});

describe('detail 전역 layer (UI-dbn6 carry-over a)', () => {
  test('reads the session defaults once per open issue', async () => {
    const { transport } = mountDetail();
    await settle();

    panel?.load('UI-1');
    await settle();

    expect(
      transport.mock.calls.filter(
        (/** @type {any[]} */ call) => call[0] === 'get-session-defaults'
      )
    ).toHaveLength(1);
  });

  test('reads the session defaults again after the repo pushes new ones', async () => {
    /** @type {Set<() => void>} */
    const listeners = new Set();
    const pipeline = {
      get: () => [],
      subscribe: (/** @type {() => void} */ fn) => {
        listeners.add(fn);
        return () => listeners.delete(fn);
      }
    };
    const { transport, setQueue, queueStore } = mountDetail({
      pipeline,
      queue: { session_defaults: { workflow_mode: 'standard' } }
    });
    await settle();

    setQueue({
      ...queueStore.get(),
      session_defaults: { workflow_mode: 'fast_track' }
    });
    for (const fn of Array.from(listeners)) {
      fn();
    }
    await settle();

    expect(
      transport.mock.calls.filter(
        (/** @type {any[]} */ call) => call[0] === 'get-session-defaults'
      )
    ).toHaveLength(2);
  });
});
