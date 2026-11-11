import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createDisplayPolicyStore } from '../../data/display-policy-store.js';
import {
  PICK_ONE_REPO,
  SERVER_TABS,
  SETTINGS_TABS,
  TARGET_TABS,
  createSettingsDialog
} from './index.js';

/** @returns {import('../../utils/label-policy.js').DisplayPolicy} */
function makePolicy() {
  return {
    revision: 0,
    hidden_labels: [],
    hidden_prefixes: [],
    visible_labels: [],
    chips: {
      route: true,
      fast_track: true,
      pr: true,
      from: true,
      blocked: true,
      stepper: true
    }
  };
}

const CATALOG = {
  runners: {
    claude: { models: { opus: { id: 'opus', efforts: ['low', 'high'] } } },
    codex: {
      models: {
        sol: {
          id: 'gpt-5.6-sol',
          efforts: ['medium'],
          orchestration_efforts: ['medium', 'ultra'],
          speed_tiers: ['default', 'fast']
        }
      }
    }
  },
  model_index: { opus: 'claude', sol: 'codex' }
};

/** The claude shape: efforts live on the runner, not on each model. */
const RUNNER_LEVEL_CATALOG = {
  runners: {
    claude: {
      models: { opus: { id: 'opus' } },
      efforts: ['low', 'medium', 'high', 'xhigh']
    },
    codex: { models: { sol: { id: 'gpt-5.6-sol', efforts: ['medium'] } } }
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
    plan_review: {
      standard_recommended: 'codex',
      fast_track_default: 'fable'
    },
    implementation: {
      default: {
        dispatch: 'delegated',
        runtime: 'codex',
        model: 'sol',
        model_id: 'gpt-5.6-sol',
        effort: 'auto',
        speed: 'default'
      },
      route_defaults: { quick_fix: { dispatch: 'main' } },
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
 * @param {{ values?: Record<string, string|boolean>, warnings?: string[], transport?: any, queue?: any, presets?: any, monitorRows?: Array<Record<string, any>>, monitorPipeline?: Array<Record<string, any>>, onOpenRepoOps?: (root_dir: string) => void, modelVisibility?: any, autoPool?: any, timingSettings?: any, externalWaitSettings?: any, limitPolicySettings?: any, conversationSettings?: any, connectedRoot?: string|null }} [options]
 */
function mount(options = {}) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const policy_store = createDisplayPolicyStore();
  policy_store.set(makePolicy());
  const notify = vi.fn();
  const transport =
    options.transport ||
    vi.fn(async (/** @type {string} */ type) => {
      if (type === 'get-session-defaults') {
        return {
          values: options.values || {},
          warnings: options.warnings || []
        };
      }
      if (type === 'conversation-settings-get') {
        return { snapshot: options.conversationSettings };
      }
      return { values: options.values || {}, warnings: [] };
    });
  let queue_state = options.queue || {
    revision: 3,
    slots: 2,
    runner_catalog: CATALOG,
    execution_defaults: EXECUTION_DEFAULTS,
    orchestration_model: null,
    orchestration_effort: null,
    orchestration_speed: null,
    quick_fix_orchestration_model: null,
    quick_fix_orchestration_effort: null,
    quick_fix_orchestration_speed: null
  };
  /** @type {Set<() => void>} */
  const queue_listeners = new Set();
  let rows_state = options.monitorRows || [];
  /** @type {Set<() => void>} */
  const row_listeners = new Set();
  /** @param {Array<Record<string, any>>} rows */
  const pushRows = (rows) => {
    rows_state = rows;
    for (const listener of row_listeners) {
      listener();
    }
  };
  /** @param {any} queue */
  const pushQueue = (queue) => {
    queue_state = queue;
    for (const listener of queue_listeners) {
      listener();
    }
  };
  const dialog = createSettingsDialog(root, {
    transport,
    policyStore: policy_store,
    queueStore: {
      get: () => queue_state,
      set: (queue) => {
        queue_state = queue;
      },
      subscribe: (fn) => {
        queue_listeners.add(fn);
        return () => {
          queue_listeners.delete(fn);
        };
      }
    },
    implPresetStore: {
      get: () => options.presets || { revision: 1, presets: [] }
    },
    modelVisibilityStore: {
      get: () => options.modelVisibility ?? null,
      set: () => {}
    },
    autoPoolStore: {
      get: () => options.autoPool ?? null,
      set: () => {}
    },
    timingSettingsStore: {
      get: () => options.timingSettings ?? null,
      set: () => {}
    },
    externalWaitSettingsStore: {
      get: () => options.externalWaitSettings ?? null,
      set: () => {}
    },
    limitPolicySettingsStore: {
      get: () => options.limitPolicySettings ?? null,
      set: () => {}
    },
    labelOptions: () => ['worker-serial'],
    connectedRoot: () => options.connectedRoot ?? null,
    notify,
    monitorRows: () => rows_state,
    subscribeMonitorRows: (fn) => {
      row_listeners.add(fn);
      return () => {
        row_listeners.delete(fn);
      };
    },
    monitorPipeline: () => options.monitorPipeline || [],
    onOpenRepoOps: options.onOpenRepoOps
  });
  return { root, dialog, transport, notify, policy_store, pushQueue, pushRows };
}

/** Let the dialog's `open()` load finish. */
async function settle() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

/**
 * @param {HTMLElement} root
 * @param {string} tab_id
 */
async function openTab(root, tab_id) {
  /** @type {HTMLButtonElement} */ (
    root.querySelector(`[data-tab="${tab_id}"]`)
  ).click();
  await settle();
}

/**
 * @param {HTMLElement} root
 * @returns {string[]}
 */
function railTabs(root) {
  return Array.from(root.querySelectorAll('[role="tab"]'), (tab) =>
    String(tab.getAttribute('data-tab'))
  );
}

/**
 * @param {any} transport
 * @param {string} type
 * @returns {any[]}
 */
function payloadsOf(transport, type) {
  return transport.mock.calls
    .filter((/** @type {any[]} */ call) => call[0] === type)
    .map((/** @type {any[]} */ call) => call[1]);
}

const REPO_A = '/tmp/example/repo-a';
const REPO_B = '/tmp/example/repo-b';

/**
 * @param {string} root_dir
 * @param {string} name
 * @param {Record<string, any>} [patch]
 */
function monitorRow(root_dir, name, patch = {}) {
  return {
    root_dir,
    name,
    revision: 4,
    slots: 2,
    serial_lane_count: 1,
    runner_catalog: CATALOG,
    execution_defaults: EXECUTION_DEFAULTS,
    quick_fix_orchestration_model: null,
    ...patch
  };
}

const TWO_ROWS = [monitorRow(REPO_A, 'repo-a'), monitorRow(REPO_B, 'repo-b')];

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('createSettingsDialog tabs (UI-32oq §4.4)', () => {
  test('draws the same rail from every entry point', async () => {
    const { root, dialog } = mount({ monitorRows: TWO_ROWS });
    dialog.open();
    await settle();
    const header = railTabs(root);
    dialog.close();
    dialog.open(undefined, { scope: 'repo', root_dir: REPO_B });
    await settle();
    const strip = railTabs(root);
    dialog.close();

    dialog.open(undefined, { scope: 'monitor' });
    await settle();

    const ids = SETTINGS_TABS.map((tab) => tab.id);
    expect([header, strip, railTabs(root)]).toEqual([ids, ids, ids]);
  });

  test('lists the target tabs then the server-wide tabs', () => {
    expect([
      TARGET_TABS.map((tab) => tab.label),
      SERVER_TABS.map((tab) => tab.label)
    ]).toEqual([
      ['실행', '계정', '저장소', '표시'],
      ['활성 계정', '프리셋·모델', '운영']
    ]);
  });

  test('labels the two rail groups', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    expect(
      Array.from(root.querySelectorAll('[data-rail-group]'), (node) =>
        node.textContent?.trim()
      )
    ).toEqual(['대상 저장소', '서버 전체']);
  });

  test('gives every rail tab a glyph no other tab carries', () => {
    const glyphs = SETTINGS_TABS.map((tab) => tab.glyph);

    expect(new Set(glyphs).size).toBe(glyphs.length);
  });

  test('draws no session tab', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    expect(root.querySelector('[data-tab="session"]')).toBe(null);
  });

  test('opens on the 실행 tab', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    const selected = root.querySelector('[role="tab"][aria-selected="true"]');

    expect(selected?.getAttribute('data-tab')).toBe('execution');
  });

  test('opens the preset entry on the 실행 tab', async () => {
    const { root, dialog } = mount();
    dialog.open('execution');
    await settle();

    expect(root.querySelector('#settings-pane-execution')).not.toBe(null);
  });

  test('opens an id the rail does not carry on the 실행 tab', async () => {
    const { root, dialog } = mount();
    dialog.open('worker');
    await settle();

    expect(root.querySelector('#settings-pane-execution')).not.toBe(null);
  });

  test('opens directly on the 계정 tab when asked', async () => {
    const { root, dialog } = mount();
    dialog.open('account');
    await settle();

    expect(root.querySelector('#settings-pane-account')).not.toBe(null);
  });

  test('renders only the active tab', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    await openTab(root, 'display');

    expect(root.querySelectorAll('[role="tabpanel"]')).toHaveLength(1);
    expect(root.querySelector('#settings-pane-display')).not.toBe(null);
  });

  test('renders the worker block groups in the approved order', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    const groups = Array.from(
      root.querySelectorAll(
        '[data-exec-block="worker"] .settings-dialog__preset-bar, [data-exec-block="worker"] .settings-dialog__group'
      )
    ).map((element) =>
      element.classList.contains('settings-dialog__preset-bar')
        ? '프리셋'
        : element
            .querySelector('.settings-dialog__group-title')
            ?.childNodes[0]?.textContent?.trim()
    );

    expect(groups).toEqual([
      '프리셋',
      '오케스트레이션',
      '구현',
      '리뷰 게이트',
      '워커 시스템 프롬프트'
    ]);
  });

  test('renders the quick fix groups inside its own folded block', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    const groups = Array.from(
      root.querySelectorAll(
        '[data-exec-block="quick_fix"] .settings-dialog__preset-bar, [data-exec-block="quick_fix"] .settings-dialog__group'
      )
    ).map((element) =>
      element.classList.contains('settings-dialog__preset-bar')
        ? '프리셋'
        : element
            .querySelector('.settings-dialog__group-title')
            ?.childNodes[0]?.textContent?.trim()
    );

    expect(groups).toEqual(['프리셋', '오케스트레이션', '구현']);
  });
});

describe('createSettingsDialog target (UI-32oq §4.4)', () => {
  /**
   * @param {HTMLElement} root
   * @returns {{ mode: string|null, repo: string|null }}
   */
  function targetOf(root) {
    const picker = /** @type {HTMLSelectElement|null} */ (
      root.querySelector('[data-target-repo]')
    );
    return {
      mode:
        root
          .querySelector('[data-target-mode][aria-pressed="true"]')
          ?.getAttribute('data-target-mode') ?? null,
      repo: picker ? picker.value : null
    };
  }

  test('opens the header gear on the connected repository', async () => {
    const { root, dialog, transport } = mount({
      monitorRows: TWO_ROWS,
      connectedRoot: REPO_A
    });

    dialog.open();
    await settle();

    expect(targetOf(root)).toEqual({ mode: 'single', repo: REPO_A });
    expect(payloadsOf(transport, 'get-session-defaults')).toEqual([{}]);
  });

  test('opens the repo strip gear on that repository', async () => {
    const { root, dialog, transport } = mount({
      monitorRows: TWO_ROWS,
      connectedRoot: REPO_A
    });

    dialog.open(undefined, { scope: 'repo', root_dir: REPO_B });
    await settle();

    expect(targetOf(root)).toEqual({ mode: 'single', repo: REPO_B });
    expect(payloadsOf(transport, 'get-session-defaults')).toEqual([
      { root_dir: REPO_B }
    ]);
  });

  test('opens the monitor header gear on several repositories', async () => {
    const { root, dialog } = mount({ monitorRows: TWO_ROWS });

    dialog.open(undefined, { scope: 'monitor' });
    await settle();

    expect(targetOf(root)).toEqual({ mode: 'multi', repo: null });
    expect(root.querySelector('[data-pane="bulk"] [data-bulk-repo]')).not.toBe(
      null
    );
  });

  test('names the repo strip repository as the bound root', async () => {
    const { dialog } = mount({ monitorRows: TWO_ROWS });

    dialog.open(undefined, { scope: 'repo', root_dir: REPO_B });
    await settle();

    expect(dialog.repoRoot()).toBe(REPO_B);
  });

  test('names no bound root for a header gear open', async () => {
    const { dialog } = mount({ monitorRows: TWO_ROWS, connectedRoot: REPO_A });

    dialog.open();
    await settle();

    expect(dialog.repoRoot()).toBe(null);
  });

  test('lists the connected repository even before the monitor rows arrive', async () => {
    const { root, dialog } = mount({ connectedRoot: REPO_A });

    dialog.open();
    await settle();

    expect(
      Array.from(root.querySelectorAll('[data-target-repo] option'), (node) =>
        node.textContent?.trim()
      )
    ).toEqual(['repo-a · 연결됨']);
  });

  test('lists the monitor rows in the picker once they arrive', async () => {
    const { root, dialog, pushRows } = mount({ connectedRoot: REPO_A });
    dialog.open();
    await settle();

    pushRows(TWO_ROWS);

    expect(
      Array.from(root.querySelectorAll('[data-target-repo] option'), (node) =>
        node.textContent?.trim()
      )
    ).toEqual(['repo-a · 연결됨', 'repo-b']);
  });

  test('rebinds the execution pane to the repository picked', async () => {
    const { root, dialog, transport } = mount({
      monitorRows: TWO_ROWS,
      connectedRoot: REPO_A
    });
    dialog.open();
    await settle();
    const picker = /** @type {HTMLSelectElement} */ (
      root.querySelector('[data-target-repo]')
    );

    picker.value = REPO_B;
    picker.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(transport, 'get-session-defaults')).toEqual([
      {},
      { root_dir: REPO_B }
    ]);
    expect(dialog.repoRoot()).toBe(REPO_B);
  });

  test('drops unsaved input when the target changes', async () => {
    const { root, dialog } = mount({
      monitorRows: TWO_ROWS,
      connectedRoot: REPO_A
    });
    dialog.open();
    await settle();
    const name = /** @type {HTMLInputElement} */ (
      root.querySelector('[aria-label="프리셋 이름"]')
    );
    name.value = '쓰다 만 이름';
    name.dispatchEvent(new Event('input'));
    const picker = /** @type {HTMLSelectElement} */ (
      root.querySelector('[data-target-repo]')
    );

    picker.value = REPO_B;
    picker.dispatchEvent(new Event('change'));
    await settle();

    expect(
      /** @type {HTMLInputElement} */ (
        root.querySelector('[aria-label="프리셋 이름"]')
      ).value
    ).toBe('');
  });

  /**
   * Open the `저장소` tab on REPO_A, send a cap change whose reply waits, and
   * move the target to REPO_B before that reply lands.
   *
   * @returns {Promise<{ root: HTMLElement, transport: any, pushRows: (rows: Array<Record<string, any>>) => void, release: (reply: any) => void }>}
   */
  async function capChangeThenRetarget() {
    /** @type {Array<(reply: any) => void>} */
    const waiting = [];
    const transport = vi.fn(async (/** @type {string} */ type) => {
      if (type === 'worker-queue-set-slots') {
        return new Promise((resolve) => {
          waiting.push(resolve);
        });
      }
      return { values: {}, warnings: [] };
    });
    const { root, dialog, pushRows } = mount({
      monitorRows: TWO_ROWS,
      transport
    });
    dialog.open('repo', { scope: 'repo', root_dir: REPO_A });
    await settle();
    const input = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-seam="repo-slots"]')
    );
    input.value = '5';
    input.dispatchEvent(new Event('change', { bubbles: true }));
    const picker = /** @type {HTMLSelectElement} */ (
      root.querySelector('[data-target-repo]')
    );
    picker.value = REPO_B;
    picker.dispatchEvent(new Event('change'));
    await settle();
    return {
      root,
      transport,
      pushRows,
      release: (reply) => waiting.shift()?.(reply)
    };
  }

  test('keeps a late queue reply of the old target out of the new target 실행 pane', async () => {
    const { root, pushRows, release } = await capChangeThenRetarget();
    await openTab(root, 'execution');

    release({
      applied: true,
      queue: monitorRow(REPO_A, 'repo-a', {
        revision: 10,
        orchestration_model: 'opus'
      })
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    pushRows(TWO_ROWS);

    expect(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('select[data-key="orchestration_model"]')
      ).value
    ).toBe('');
  });

  test('sends no conflict retry for the old target after the target changes', async () => {
    const { transport, release } = await capChangeThenRetarget();

    release({
      applied: false,
      conflict: true,
      queue: monitorRow(REPO_A, 'repo-a', { revision: 9 })
    });
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(payloadsOf(transport, 'worker-queue-set-slots')).toEqual([
      { slots: 5, root_dir: REPO_A, expected_revision: 4 }
    ]);
  });

  test('switches to several repositories from the target bar', async () => {
    const { root, dialog, transport } = mount({
      monitorRows: TWO_ROWS,
      connectedRoot: REPO_A
    });
    dialog.open();
    await settle();
    const reads = transport.mock.calls.length;

    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-target-mode="multi"]')
    ).click();
    await settle();

    expect(root.querySelector('[data-pane="bulk"] [data-bulk-repo]')).not.toBe(
      null
    );
    expect(root.querySelector('[data-target-repo]')).toBe(null);
    expect(transport.mock.calls.length).toBe(reads);
  });

  test('returns to the last single repository from several repositories', async () => {
    const { root, dialog } = mount({
      monitorRows: TWO_ROWS,
      connectedRoot: REPO_A
    });
    dialog.open(undefined, { scope: 'repo', root_dir: REPO_B });
    await settle();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-target-mode="multi"]')
    ).click();
    await settle();

    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-target-mode="single"]')
    ).click();
    await settle();

    expect(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('[data-target-repo]')
      ).value
    ).toBe(REPO_B);
  });

  test('follows a new target in the picker after the user changed it', async () => {
    const { root, dialog } = mount({
      monitorRows: TWO_ROWS,
      connectedRoot: REPO_A
    });
    dialog.open();
    await settle();
    const picker = /** @type {HTMLSelectElement} */ (
      root.querySelector('[data-target-repo]')
    );
    picker.value = REPO_B;
    picker.dispatchEvent(new Event('change'));
    await settle();
    dialog.close();

    dialog.open();
    await settle();

    expect(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('[data-target-repo]')
      ).value
    ).toBe(REPO_A);
  });

  test('redraws the connected execution pane when the queue store changes', async () => {
    const { root, dialog, pushQueue } = mount({ connectedRoot: REPO_A });
    dialog.open();
    await settle();

    pushQueue({
      revision: 4,
      slots: 2,
      runner_catalog: CATALOG,
      execution_defaults: EXECUTION_DEFAULTS,
      orchestration_model: 'opus',
      orchestration_effort: null,
      orchestration_speed: null,
      quick_fix_orchestration_model: null,
      quick_fix_orchestration_effort: null,
      quick_fix_orchestration_speed: null
    });

    expect(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('select[data-key="orchestration_model"]')
      ).value
    ).toBe('opus');
  });

  test('keeps a typed server-wide value across a monitor push', async () => {
    const { root, dialog, pushRows } = mount({
      connectedRoot: REPO_A,
      transport: vi.fn(async (/** @type {string} */ type) =>
        type === 'get-session-defaults'
          ? {
              values: {},
              warnings: [],
              worker_url: {
                status: 'ok',
                effective_url: 'http://common:3000',
                source: 'common',
                common: {
                  value: 'http://common:3000',
                  state: 'configured',
                  revision: 'r1'
                },
                warnings: []
              }
            }
          : {}
      )
    });
    dialog.open('operations');
    await settle();
    const input = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-worker-common-input]')
    );
    input.value = 'http://typing:3000';
    input.dispatchEvent(new Event('input'));

    pushRows(TWO_ROWS);

    expect(
      /** @type {HTMLInputElement} */ (
        root.querySelector('[data-worker-common-input]')
      ).value
    ).toBe('http://typing:3000');
  });

  test.each(['active_account', 'presets', 'operations'])(
    'hides the target bar on the server-wide %s tab',
    async (tab) => {
      const { root, dialog } = mount();
      dialog.open();
      await settle();
      expect(root.querySelector('[data-target-bar]')).not.toBe(null);

      await openTab(root, tab);

      expect(root.querySelector('[data-target-bar]')).toBe(null);
      expect(root.querySelector('[data-target-note]')).toBe(null);
    }
  );
});

describe('createSettingsDialog several repositories (UI-nu43 §3.1, UI-32oq §4.4)', () => {
  /**
   * @param {any} transport
   * @returns {string[]}
   */
  function requestTypes(transport) {
    return transport.mock.calls.map((/** @type {any[]} */ call) => call[0]);
  }

  test('sends no connected workspace read', async () => {
    const { root, dialog, transport } = mount({ monitorRows: TWO_ROWS });

    dialog.open(undefined, { scope: 'monitor' });
    await settle();

    expect(requestTypes(transport)).toEqual([]);
    expect(root.querySelector('[data-quick-fix-group]')).toBe(null);
  });

  test('keeps the bulk editing surface on the 계정 tab', async () => {
    const { root, dialog } = mount({ monitorRows: TWO_ROWS });
    dialog.open(undefined, { scope: 'monitor' });
    await settle();

    await openTab(root, 'account');

    expect(root.querySelector('.settings-dialog__pane-sub')?.textContent).toBe(
      '선택한 저장소 Worker의 default 계정과 자동 전환을 읽어 세웁니다.'
    );
    expect(root.querySelector('[data-bulk-apply="account"]')).not.toBe(null);
  });

  test.each(['repo', 'display'])(
    'asks for one repository on the %s tab',
    async (tab_id) => {
      const { root, dialog } = mount({ monitorRows: TWO_ROWS });
      dialog.open(undefined, { scope: 'monitor' });
      await settle();

      await openTab(root, tab_id);

      expect(
        root.querySelector('[data-target-notice]')?.textContent?.trim()
      ).toBe(PICK_ONE_REPO);
    }
  );

  test('offers no bulk main 동기화', async () => {
    const { root, dialog } = mount({ monitorRows: TWO_ROWS });
    dialog.open(undefined, { scope: 'monitor' });
    await settle();

    await openTab(root, 'repo');

    expect(root.querySelector('[data-seam="main-sync"]')).toBe(null);
  });

  test('returns to the connected repository after a bulk open is closed', async () => {
    const { root, dialog } = mount({ monitorRows: TWO_ROWS });
    dialog.open(undefined, { scope: 'monitor' });
    await settle();
    dialog.close();

    dialog.open();
    await settle();

    expect(root.querySelector('[data-bulk-repo]')).toBe(null);
    expect(root.querySelector('[data-exec-block="quick_fix"]')).not.toBe(null);
  });
});

describe('createSettingsDialog 표시 tab target (UI-32oq §4.4)', () => {
  test('edits the display policy of the connected repository', async () => {
    const { root, dialog } = mount({ connectedRoot: REPO_A });
    dialog.open('display');
    await settle();

    expect(
      root.querySelector('#settings-pane-display [data-label="worker-serial"]')
    ).not.toBe(null);
  });

  test('edits the display policy when the picked repository is the connected one', async () => {
    const { root, dialog } = mount({
      monitorRows: TWO_ROWS,
      connectedRoot: REPO_A
    });

    dialog.open('display', { scope: 'repo', root_dir: REPO_A });
    await settle();

    expect(root.querySelector('[data-label="worker-serial"]')).not.toBe(null);
  });

  test('names the connected repository for any other target', async () => {
    const { root, dialog } = mount({
      monitorRows: TWO_ROWS,
      connectedRoot: REPO_A
    });

    dialog.open('display', { scope: 'repo', root_dir: REPO_B });
    await settle();

    expect(
      root.querySelector('[data-target-notice]')?.textContent?.trim()
    ).toBe('연결된 저장소(repo-a)에서만 바꿀 수 있습니다');
    expect(root.querySelector('[data-label="worker-serial"]')).toBe(null);
  });
});

describe('createSettingsDialog 저장소 tab (UI-f2sy §7, UI-32oq §4.5)', () => {
  const STATE_ROW = monitorRow(REPO_B, 'repo-b');
  const ENTRY = {
    root_dir: REPO_B,
    name: 'repo-b',
    revision: 4,
    slots: 2,
    serial_lane_count: 1,
    declared_base: 'main',
    repo_operations: [],
    repo_ops_opt_out: { verify: false, deploy: false },
    workspace_info: {
      repo_ops: {
        status: 'resolved',
        source_path: 'repo-ops/config.toml',
        base_ref: 'main',
        base_sha: 'a'.repeat(40),
        repo_id: REPO_B,
        verify: { script: 'repo-ops/script/verify', timeout_ms: 300_000 },
        deploy: { script: 'repo-ops/script/deploy', timeout_ms: 600_000 },
        error_code: null
      }
    }
  };

  /**
   * @param {Parameters<typeof mount>[0]} [extra]
   * @returns {Promise<ReturnType<typeof mount>>}
   */
  async function openRepoTab(extra = {}) {
    const view = mount({
      monitorRows: [STATE_ROW],
      monitorPipeline: [ENTRY],
      ...extra
    });
    view.dialog.open('repo', { scope: 'repo', root_dir: REPO_B });
    await settle();
    return view;
  }

  /**
   * @param {any} transport
   * @param {string} type
   * @returns {any[][]}
   */
  function callsOf(transport, type) {
    return transport.mock.calls.filter(
      (/** @type {any[]} */ call) => call[0] === type
    );
  }

  /**
   * A transport whose session-default layer merges each write like the server.
   *
   * @param {Record<string, any>} initial
   * @param {string[]} [warnings]
   */
  function kvTransport(initial, warnings = []) {
    /** @type {Record<string, any>} */
    let values = { ...initial };
    return vi.fn(
      async (/** @type {string} */ type, /** @type {any} */ payload) => {
        if (type === 'set-session-defaults') {
          for (const [key, value] of Object.entries(payload.values)) {
            if (value === null) {
              delete values[key];
            } else {
              values[key] = value;
            }
          }
          warnings = [];
        }
        if (
          type === 'get-session-defaults' ||
          type === 'set-session-defaults'
        ) {
          return { values: { ...values }, warnings };
        }
        return { values: {}, warnings: [] };
      }
    );
  }

  test('draws the cap, lane count, base and declaration for a repository with an entry', async () => {
    const { root } = await openRepoTab();

    expect([
      /** @type {HTMLInputElement} */ (
        root.querySelector('[data-seam="repo-slots"]')
      ).value,
      /** @type {HTMLSelectElement} */ (
        root.querySelector('[data-seam="repo-serial-lanes"]')
      ).value,
      root.querySelector('[data-seam="repo-base"]')?.textContent,
      root.querySelector('[data-seam="repo-ops"]') !== null,
      root.querySelector('[data-seam="repo-ops-open"]') !== null
    ]).toEqual(['2', '1', 'main', true, true]);
  });

  test('orders the groups as 동시 실행, main 동기화, 저장소 작업, 저장만 된 값', async () => {
    const { root } = await openRepoTab({
      transport: kvTransport({ workflow_mode: 'fast_track' })
    });

    expect(
      Array.from(
        root.querySelectorAll(
          '[data-pane="repo"] .settings-dialog__group > .settings-dialog__group-title'
        ),
        (node) => node.childNodes[0]?.textContent?.trim()
      )
    ).toEqual(['동시 실행', 'main 동기화', '저장소 작업', '저장만 된 값']);
  });

  test('shows the declared script paths as text with no dead button', async () => {
    const { root } = await openRepoTab();

    const lanes = root.querySelector('[data-seam="repo-ops"]');

    expect([
      lanes?.querySelectorAll('button.worker-repo-ops__vd-cmd').length,
      lanes?.querySelector('[data-lane="verify"] code.worker-repo-ops__vd-cmd')
        ?.textContent
    ]).toEqual([0, 'repo-ops/script/verify']);
  });

  test('draws only the cap and lane count for a repository without an entry', async () => {
    const { root } = await openRepoTab({ monitorPipeline: [] });

    expect([
      root.querySelector('[data-seam="repo-slots"]') !== null,
      root.querySelector('[data-seam="repo-serial-lanes"]') !== null,
      root.querySelector('[data-seam="repo-base"]'),
      root.querySelector('[data-seam="repo-ops"]'),
      root.querySelector('[data-seam="repo-ops-open"]')
    ]).toEqual([true, true, null, null, null]);
  });

  test('draws the connected repository from the queue store before its row arrives', async () => {
    const { root, dialog, transport } = mount({ connectedRoot: REPO_A });

    dialog.open('repo');
    await settle();

    expect(
      /** @type {HTMLInputElement} */ (
        root.querySelector('[data-seam="repo-slots"]')
      ).value
    ).toBe('2');
    expect(payloadsOf(transport, 'get-session-defaults')).toContainEqual({
      root_dir: REPO_A
    });
  });

  test('sends the cap with its repository and revision', async () => {
    const { root, transport } = await openRepoTab();
    const input = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-seam="repo-slots"]')
    );

    input.value = '5';
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(callsOf(transport, 'worker-queue-set-slots')).toEqual([
      [
        'worker-queue-set-slots',
        { slots: 5, root_dir: REPO_B, expected_revision: 4 }
      ]
    ]);
  });

  test('sends the serial lane count with its repository and revision', async () => {
    const { root, transport } = await openRepoTab();
    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('[data-seam="repo-serial-lanes"]')
    );

    select.value = '3';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(callsOf(transport, 'worker-queue-set-serial-lane-count')).toEqual([
      [
        'worker-queue-set-serial-lane-count',
        { count: 3, root_dir: REPO_B, expected_revision: 4 }
      ]
    ]);
  });

  test('retries a conflicting cap change once on the revision the reply carried', async () => {
    const transport = vi.fn(
      async (/** @type {string} */ type, /** @type {any} */ payload) =>
        type === 'worker-queue-set-slots' && payload.expected_revision === 4
          ? { applied: false, conflict: true, queue: { ...ENTRY, revision: 9 } }
          : { applied: true, queue: { ...ENTRY, revision: 10, slots: 5 } }
    );
    const { root } = await openRepoTab({ transport });
    const input = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-seam="repo-slots"]')
    );

    input.value = '5';
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();
    await settle();

    expect(
      callsOf(transport, 'worker-queue-set-slots').map(
        (call) => call[1].expected_revision
      )
    ).toEqual([4, 9]);
  });

  test('sends the opt-out toggle with its repository', async () => {
    const { root, transport } = await openRepoTab();
    const check = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-lane="verify"] input[type="checkbox"]')
    );

    check.checked = false;
    check.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(callsOf(transport, 'worker-repo-ops-opt-out-toggle')).toEqual([
      [
        'worker-repo-ops-opt-out-toggle',
        {
          kind: 'verify',
          opted_out: true,
          expected_revision: 4,
          root_dir: REPO_B
        }
      ]
    ]);
  });

  test('sends no opt-out conflict retry for the old target after the target changes', async () => {
    /** @type {Array<(reply: any) => void>} */
    const waiting = [];
    const transport = vi.fn(async (/** @type {string} */ type) => {
      if (type === 'worker-repo-ops-opt-out-toggle') {
        return new Promise((resolve) => {
          waiting.push(resolve);
        });
      }
      return { values: {}, warnings: [] };
    });
    const { root } = await openRepoTab({ monitorRows: TWO_ROWS, transport });
    const check = /** @type {HTMLInputElement} */ (
      root.querySelector('[data-lane="verify"] input[type="checkbox"]')
    );
    check.checked = false;
    check.dispatchEvent(new Event('change', { bubbles: true }));
    const picker = /** @type {HTMLSelectElement} */ (
      root.querySelector('[data-target-repo]')
    );
    picker.value = REPO_A;
    picker.dispatchEvent(new Event('change'));
    await settle();

    waiting[0]({ applied: false, conflict: true, queue: { ...ENTRY } });
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(callsOf(transport, 'worker-repo-ops-opt-out-toggle').length).toBe(1);
  });

  test('sends 배포 실행 with its repository', async () => {
    const { root, transport } = await openRepoTab();

    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-seam="repo-ops-deploy-run"]')
    ).click();
    await settle();

    expect(callsOf(transport, 'worker-repo-operation-deploy-run')).toEqual([
      [
        'worker-repo-operation-deploy-run',
        { repo_id: REPO_B, root_dir: REPO_B }
      ]
    ]);
  });

  test('closes the window and opens that repository timeline from 저장소 작업 기록 열기', async () => {
    const onOpenRepoOps = vi.fn();
    const { root } = await openRepoTab({ onOpenRepoOps });

    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-seam="repo-ops-open"]')
    ).click();

    expect(onOpenRepoOps).toHaveBeenCalledWith(REPO_B);
  });

  test('presses the stored main 동기화 choice', async () => {
    const { root } = await openRepoTab({
      transport: kvTransport({ base_sync_accept_local_commits: true })
    });

    expect(
      root
        .querySelector('[data-seam="main-sync-choice"][aria-pressed="true"]')
        ?.textContent?.trim()
    ).toBe('위에 다시 쌓아 push');
  });

  test('names the main 동기화 row and its two choices', async () => {
    const { root } = await openRepoTab({ transport: kvTransport({}) });

    const group = root.querySelector('[data-seam="main-sync"]');

    expect([
      group?.querySelector('.settings-dialog__row-label')?.textContent?.trim(),
      Array.from(
        group?.querySelectorAll('[data-seam="main-sync-choice"]') || [],
        (node) => node.textContent?.trim()
      )
    ]).toEqual(['main에 직접 한 커밋', ['위에 다시 쌓아 push', '손대지 않음']]);
  });

  test('sends 위에 다시 쌓아 push as the JSON boolean the contract stores', async () => {
    const transport = kvTransport({});
    const { root } = await openRepoTab({ transport });

    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-seam="main-sync-choice"][data-value="true"]')
    ).click();
    await settle();

    expect(payloadsOf(transport, 'set-session-defaults')).toEqual([
      { values: { base_sync_accept_local_commits: true }, root_dir: REPO_B }
    ]);
  });

  test('sends 손대지 않음 as the deletion request', async () => {
    const transport = kvTransport({ base_sync_accept_local_commits: true });
    const { root } = await openRepoTab({ transport });

    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-seam="main-sync-choice"][data-value="false"]')
    ).click();
    await settle();

    expect(payloadsOf(transport, 'set-session-defaults')).toEqual([
      { values: { base_sync_accept_local_commits: null }, root_dir: REPO_B }
    ]);
  });

  test('draws no stored-only group while nothing is stored', async () => {
    const { root } = await openRepoTab({
      transport: kvTransport({ impl_runtime: 'codex' })
    });

    expect(root.querySelector('[data-seam="stored-only"]')).toBe(null);
  });

  test('omits the obsolete Worker address exception row', async () => {
    const { root } = await openRepoTab({
      transport: kvTransport({ bdui_url: 'http://exception:3000' })
    });

    expect(root.querySelector('[data-stored-only="bdui_url"]')).toBe(null);
    expect(root.textContent).not.toContain('Worker 주소 예외');
  });

  test('shows a stored workflow mode read-only', async () => {
    const { root } = await openRepoTab({
      transport: kvTransport({ workflow_mode: 'fast_track' })
    });

    expect(
      root
        .querySelector(
          '[data-stored-only="workflow_mode"] [data-stored-only-value]'
        )
        ?.textContent?.trim()
    ).toBe('fast_track');
  });

  test('clears a stored value with 지우기 and drops its line', async () => {
    const transport = kvTransport({ workflow_mode: 'fast_track' });
    const { root } = await openRepoTab({ transport });

    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-stored-only-clear="workflow_mode"]')
    ).click();
    await settle();

    expect(payloadsOf(transport, 'set-session-defaults')).toEqual([
      { values: { workflow_mode: null }, root_dir: REPO_B }
    ]);
    expect(root.querySelector('[data-seam="stored-only"]')).toBe(null);
  });

  test('shows a stored value the server refused as 형식 오류', async () => {
    const { root } = await openRepoTab({
      transport: kvTransport({}, ['invalid_value:workflow_mode'])
    });

    expect(
      root
        .querySelector(
          '[data-stored-only="workflow_mode"] [data-stored-only-value]'
        )
        ?.textContent?.trim()
    ).toBe('형식 오류');
  });
});

describe('createSettingsDialog server-wide tabs (UI-32oq §4.4)', () => {
  const MODEL_VISIBILITY = {
    revision: 2,
    disabled_models: ['opus-4.8'],
    runners: {
      claude: [
        { name: 'opus', id: 'opus' },
        { name: 'opus-4.8', id: 'claude-opus-4-8' }
      ],
      codex: [
        { name: 'astra', id: 'gpt-6-astra' },
        { name: 'luna', id: 'gpt-6-luna' }
      ]
    }
  };
  const TIMING = {
    revision: 1,
    values: { queue_grace_seconds: 20 },
    overrides: {},
    fields: {
      queue_grace_seconds: { default: 20, min: 0, max: 600, unit: 'seconds' }
    }
  };
  const EXTERNAL_WAIT = {
    revision: 0,
    values: { takeover_ratio_percent: 80 },
    overrides: {},
    fields: {
      takeover_ratio_percent: {
        default: 80,
        min: 10,
        max: 100,
        unit: 'percent'
      }
    }
  };
  const CONVERSATION = {
    revision: 1,
    values: { auto_launch: true },
    overrides: {},
    fields: { auto_launch: { kind: 'boolean', default: true } }
  };

  /**
   * @param {HTMLElement} root
   * @param {string} slot
   * @returns {Array<string|undefined>}
   */
  function titlesOf(root, slot) {
    return Array.from(
      root.querySelectorAll(
        `[data-pane="${slot}"] .settings-dialog__group-title`
      ),
      (title) => title.textContent?.trim()
    );
  }

  test('draws the 프리셋 관리, 판정 칩 프리셋 and 활성 모델 groups on 프리셋·모델', async () => {
    const { root, dialog } = mount({ modelVisibility: MODEL_VISIBILITY });
    dialog.open();
    await settle();

    await openTab(root, 'presets');

    expect(titlesOf(root, 'presets')).toEqual([
      '프리셋 관리',
      '판정 칩 프리셋',
      '활성 모델'
    ]);
  });

  test('draws the auto 후보 group below 활성 모델 on 프리셋·모델', async () => {
    const { root, dialog } = mount({
      modelVisibility: MODEL_VISIBILITY,
      autoPool: {
        revision: 0,
        runtimes: {},
        choices: {
          claude: {
            models: ['opus'],
            efforts: ['low', 'xhigh'],
            defaults: null,
            catalog_models: null
          },
          codex: {
            models: ['sol'],
            efforts: ['low', 'xhigh'],
            defaults: null,
            catalog_models: ['sol']
          }
        }
      }
    });
    dialog.open();
    await settle();

    await openTab(root, 'presets');

    expect(titlesOf(root, 'presets')).toEqual([
      '프리셋 관리',
      '판정 칩 프리셋',
      '활성 모델',
      'auto 후보'
    ]);
  });

  test('draws one active-login auto-switch group per runner on 활성 계정', async () => {
    const entry = {
      auto_switch: false,
      default_account: null,
      accounts: [],
      preempt_pct: null
    };
    const { root, dialog } = mount({
      limitPolicySettings: {
        revision: 0,
        runners: { claude: entry, codex: entry }
      }
    });
    dialog.open();
    await settle();

    await openTab(root, 'active_account');

    expect(titlesOf(root, 'active_account')).toEqual([
      'Claude 활성 로그인',
      'Codex 활성 로그인'
    ]);
  });

  test('draws the active-login status lines above the runner groups on 활성 계정', async () => {
    const entry = {
      auto_switch: true,
      default_account: null,
      accounts: [],
      preempt_pct: null
    };
    const { root, dialog } = mount({
      limitPolicySettings: {
        revision: 0,
        runners: { claude: entry, codex: entry }
      }
    });
    dialog.open();
    await settle();

    await openTab(root, 'active_account');
    await settle();

    const pane = /** @type {HTMLElement} */ (
      root.querySelector('[data-pane="active_account"]')
    );
    const status = pane.querySelector('[data-active-login-status]');
    const groups = pane.querySelector('[data-group="limit-policy"]');
    expect(
      Array.from(pane.querySelectorAll('[data-active-login-line]'), (line) =>
        line.getAttribute('data-active-login-line')
      )
    ).toEqual(['claude', 'codex']);
    expect(
      status &&
        groups &&
        status.compareDocumentPosition(groups) &
          Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  test('switches to 활성 계정 from the 계정 tab status line', async () => {
    const entry = {
      auto_switch: false,
      default_account: null,
      accounts: [],
      preempt_pct: null
    };
    const { root, dialog } = mount({
      limitPolicySettings: {
        revision: 0,
        runners: { claude: entry, codex: entry }
      }
    });
    dialog.open();
    await settle();
    await openTab(root, 'account');
    await settle();

    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-open-active-account]')
    ).click();
    await settle();

    expect(
      root
        .querySelector('[role="tab"][aria-selected="true"]')
        ?.getAttribute('data-tab')
    ).toBe('active_account');
  });

  test('draws Worker 주소, 대기·주기, 외부 작업 and 대화 세션 in order on 운영', async () => {
    const { root, dialog, transport } = mount({
      timingSettings: TIMING,
      externalWaitSettings: EXTERNAL_WAIT,
      conversationSettings: CONVERSATION
    });
    dialog.open();
    await settle();

    await openTab(root, 'operations');
    await settle();

    expect(titlesOf(root, 'operations')).toEqual([
      'Worker 주소',
      '대기·주기',
      '외부 작업',
      '대화 세션'
    ]);
    expect(transport).toHaveBeenCalledWith('conversation-settings-get', {});
  });

  test('draws the same server-wide groups whatever the target', async () => {
    const { root, dialog } = mount({
      modelVisibility: MODEL_VISIBILITY,
      monitorRows: TWO_ROWS
    });
    dialog.open('presets');
    await settle();
    const single = titlesOf(root, 'presets');
    dialog.close();

    dialog.open('presets', { scope: 'monitor' });
    await settle();

    expect(titlesOf(root, 'presets')).toEqual(single);
  });

  test('restores the selected repository after visiting a server-wide tab', async () => {
    const { root, dialog } = mount({
      monitorRows: TWO_ROWS,
      timingSettings: TIMING
    });
    dialog.open('account', { scope: 'repo', root_dir: REPO_B });
    await settle();

    await openTab(root, 'operations');
    expect(root.querySelector('[data-target-bar]')).toBe(null);
    await openTab(root, 'account');

    expect(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('[data-target-repo]')
      ).value
    ).toBe(REPO_B);
  });

  test('shows the config.toml fallback of the 대화 자동 기동 switch on 운영', async () => {
    const { root, dialog } = mount({ conversationSettings: CONVERSATION });
    dialog.open('operations');
    await settle();
    await settle();

    expect(
      root.querySelector('[data-key="auto_launch"] .settings-timing__default')
        ?.textContent
    ).toBe('config.toml 켜짐');
  });

  test('reads the codex model-list note from the worker queue without monitor rows', async () => {
    const { root, dialog } = mount({
      modelVisibility: MODEL_VISIBILITY,
      queue: {
        revision: 3,
        runner_catalog: { ...CATALOG, codex_list: { source: 'seed' } }
      }
    });
    dialog.open('presets');
    await settle();

    expect(
      root.querySelector('[data-codex-model-list]')?.textContent?.trim()
    ).toBe('모델 목록을 읽지 못해 기본 표를 씁니다');
  });

  test('redraws the codex model-list note when the worker queue changes', async () => {
    const { root, dialog, pushQueue } = mount({
      modelVisibility: MODEL_VISIBILITY,
      queue: { revision: 3, runner_catalog: CATALOG }
    });
    dialog.open('presets');
    await settle();
    const before = root.querySelector('[data-codex-model-list]');

    pushQueue({
      revision: 4,
      runner_catalog: { ...CATALOG, codex_list: { source: 'seed' } }
    });

    expect(before).toBeNull();
    expect(root.querySelector('[data-codex-model-list]')).not.toBeNull();
  });

  test('draws no 대화 세션 group before a conversation snapshot arrives', async () => {
    const { root, dialog } = mount();
    dialog.open('operations');
    await settle();

    expect(root.querySelector('[data-group="conversation"]')).toBeNull();
  });

  test('draws no 대기·주기 group before a timing snapshot arrives', async () => {
    const { root, dialog } = mount();
    dialog.open('operations');
    await settle();

    expect(root.querySelector('[data-group="timing"]')).toBeNull();
  });

  test('disables the last enabled model checkbox of a runner', async () => {
    const { root, dialog } = mount({ modelVisibility: MODEL_VISIBILITY });
    dialog.open('presets');
    await settle();

    const opus = /** @type {HTMLInputElement} */ (
      root.querySelector('input[data-model="opus"]')
    );
    expect(opus.disabled).toBe(true);
    expect(opus.closest('label')?.title).toBe(
      '러너마다 하나 이상 켜 두어야 합니다.'
    );
  });
});

describe('createSettingsDialog 실행 tab session defaults', () => {
  test('renders actual defaults with source badge and full model id', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="spec_review_model"]')
    );

    expect(select.options[0].textContent).toContain('기본값 사용 — 5.6-sol');
    expect(select.title).toBe('gpt-5.6-sol');
    expect(select.parentElement?.textContent).toContain('기본');
    expect(select.options[1].value).toBe('codex');
    expect(select.options[1].textContent).toContain('Codex · Sol');
  });

  test('renders the kv parse-failure warning as a banner', async () => {
    const { root, dialog } = mount({ warnings: ['kv_value_unparsable'] });
    dialog.open();
    await settle();

    const banner = root.querySelector('.settings-dialog__banner');

    expect(banner?.textContent).toContain('kv_value_unparsable');
  });

  test('renders no banner when the layer read cleanly', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    expect(root.querySelector('.settings-dialog__banner')).toBe(null);
  });

  test('sends only the changed key when a session default is edited', async () => {
    const { root, dialog, transport } = mount({
      values: { impl_runtime: 'codex' }
    });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="impl_speed"]')
    );
    select.value = 'fast';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(transport).toHaveBeenCalledWith('set-session-defaults', {
      values: { impl_speed: 'fast' }
    });
  });

  test('draws no mode row and no Worker address input', async () => {
    const { root, dialog } = mount({
      values: { workflow_mode: 'fast_track' }
    });
    dialog.open();
    await settle();

    expect([
      root.querySelector('[data-mode]'),
      root.querySelector('[data-key="bdui_url"]'),
      root.querySelector('[data-key="workflow_mode"]')
    ]).toEqual([null, null, null]);
  });

  test('offers no 실행 방식 row in the workspace session defaults', async () => {
    const { root, dialog } = mount({ values: { impl_dispatch: 'main' } });
    dialog.open();
    await settle();

    expect(root.querySelector('select[data-key="impl_dispatch"]')).toBe(null);
  });

  test('keeps the delegation rows enabled on the normalized kv layer', async () => {
    const { root, dialog } = mount({ values: { impl_runtime: 'codex' } });
    dialog.open();
    await settle();

    for (const key of [
      'impl_runtime',
      'impl_model',
      'impl_effort',
      'impl_speed'
    ]) {
      const select = /** @type {HTMLSelectElement} */ (
        root.querySelector(`select[data-key="${key}"]`)
      );
      expect(select.disabled).toBe(false);
    }
  });

  test('narrows the model list to the chosen delegation target', async () => {
    const { root, dialog } = mount({ values: { impl_runtime: 'codex' } });
    dialog.open();
    await settle();

    const options = Array.from(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('select[data-key="impl_model"]')
      ).options
    ).map((option) => option.value);

    expect(options).toEqual(['', 'auto', 'sol']);
  });

  test('offers the quick_fix implementation model without the auto literal', async () => {
    const { root, dialog } = mount({
      values: { quick_fix_impl_dispatch: 'delegated' }
    });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="quick_fix_impl_model"]')
    );
    const values = Array.from(select.options).map((option) => option.value);

    expect(values).toEqual(['', 'opus', 'sol']);
    expect(select.options[0].textContent).toContain('기본값 사용 — 5.6-sol');
  });

  test('stops quoting the workspace orchestration model in the quick_fix unset label', async () => {
    const { root, dialog } = mount({
      values: { quick_fix_impl_dispatch: 'delegated' },
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: CATALOG,
        execution_defaults: EXECUTION_DEFAULTS,
        orchestration_model: 'sol',
        orchestration_effort: null,
        orchestration_speed: null
      }
    });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="quick_fix_impl_model"]')
    );

    expect(select.options[0].textContent).toContain('기본값 사용 — 5.6-sol');
  });

  test('clears an incompatible model and effort in one delegation write', async () => {
    const { root, dialog, transport } = mount({
      values: { impl_model: 'sol', impl_effort: 'medium' }
    });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="impl_runtime"]')
    );
    select.value = 'claude';
    select.dispatchEvent(new Event('change'));
    await settle();

    const calls = transport.mock.calls.filter(
      (/** @type {any[]} */ call) => call[0] === 'set-session-defaults'
    );
    expect(calls).toHaveLength(1);
    expect(calls[0][1]).toEqual({
      values: {
        impl_runtime: 'claude',
        impl_model: null,
        impl_effort: null
      }
    });
  });

  test('keeps a runner-level effort the model itself does not declare', async () => {
    const { root, dialog, transport } = mount({
      values: { impl_model: 'opus', impl_effort: 'high' },
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: RUNNER_LEVEL_CATALOG,
        execution_defaults: EXECUTION_DEFAULTS,
        orchestration_model: null,
        orchestration_effort: null,
        orchestration_speed: null
      }
    });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="impl_runtime"]')
    );
    select.value = 'claude';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(transport).toHaveBeenCalledWith('set-session-defaults', {
      values: { impl_runtime: 'claude' }
    });
  });

  test('offers the runner efforts for a model that declares none', async () => {
    const { root, dialog } = mount({
      values: { impl_runtime: 'claude', impl_model: 'opus' },
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: RUNNER_LEVEL_CATALOG,
        execution_defaults: EXECUTION_DEFAULTS,
        orchestration_model: null,
        orchestration_effort: null,
        orchestration_speed: null
      }
    });
    dialog.open();
    await settle();

    const options = Array.from(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('select[data-key="impl_effort"]')
      ).options
    ).map((option) => option.value);

    expect(options).toEqual(['', 'auto', 'low', 'medium', 'high', 'xhigh']);
  });

  test('preserves the edit and notifies when the save fails', async () => {
    const transport = vi.fn(async (/** @type {string} */ type) => {
      if (type === 'get-session-defaults') {
        return { values: {}, warnings: [] };
      }
      throw new Error('kv read-only');
    });
    const { root, dialog, notify } = mount({ transport });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="impl_runtime"]')
    );
    select.value = 'codex';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(notify).toHaveBeenCalled();
    expect(dialog.sessionDraft()).toEqual({ impl_runtime: 'codex' });
  });

  test('names the reason of a session default the server refuses', async () => {
    const transport = vi.fn(async (/** @type {string} */ type) => {
      if (type === 'get-session-defaults') {
        return { values: {}, warnings: [] };
      }
      if (type === 'set-session-defaults') {
        throw { code: 'bad_request', message: 'impl_runtime: not allowed' };
      }
      return {};
    });
    const { root, dialog, notify } = mount({ transport });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="impl_runtime"]')
    );
    select.value = 'codex';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(notify).toHaveBeenCalledWith(
      '세션 기본값 저장 실패: impl_runtime: not allowed'
    );
  });
});

describe('createSettingsDialog execution tab orchestration', () => {
  test('renders Worker launcher defaults from the snapshot projection', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();
    const model = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_model"]')
    );
    const effort = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_effort"]')
    );

    expect(model.options[0].textContent).toContain('기본값 사용 — opus');
    expect(effort.options[0].textContent).toContain('CLI 기본 (미지정)');
    expect(model.parentElement?.textContent).toContain('기본');
  });

  test('keeps explicit edits and saves when the projection is unavailable', async () => {
    const { root, dialog, transport } = mount({
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: CATALOG,
        execution_defaults: { supported: false },
        orchestration_model: null,
        orchestration_effort: null,
        orchestration_speed: null
      }
    });
    dialog.open();
    await settle();
    const warning = root.querySelector(
      '#settings-pane-execution [data-execution-defaults-warning]'
    );
    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_model"]')
    );
    select.value = 'opus';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(warning?.textContent).toContain('기본값 확인 불가');
    expect(transport).toHaveBeenCalledWith(
      'worker-queue-set-orchestration-defaults',
      { expected_revision: 3, values: { orchestration_model: 'opus' } }
    );
  });

  test('narrows the model list to the chosen orchestration runtime', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();
    const filter = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_runtime"]')
    );
    filter.value = 'codex';
    filter.dispatchEvent(new Event('change'));

    const options = Array.from(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('select[data-key="orchestration_model"]')
      ).options
    ).map((option) => option.value);

    expect(options).toEqual(['', 'sol']);
  });

  test('offers the outer worker effort vocabulary of the filtered model', async () => {
    const { root, dialog } = mount({
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: CATALOG,
        execution_defaults: EXECUTION_DEFAULTS,
        orchestration_model: 'sol',
        orchestration_effort: null,
        orchestration_speed: null
      }
    });
    dialog.open();
    await settle();
    const filter = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_runtime"]')
    );
    filter.value = 'codex';
    filter.dispatchEvent(new Event('change'));

    const options = Array.from(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('select[data-key="orchestration_effort"]')
      ).options
    ).map((option) => option.value);

    expect(options).toEqual(['', 'medium', 'ultra']);
  });

  test('clears a stored model the new runtime filter cannot offer', async () => {
    const { root, dialog, transport } = mount({
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: CATALOG,
        execution_defaults: EXECUTION_DEFAULTS,
        orchestration_model: 'opus',
        orchestration_effort: 'ultra',
        orchestration_speed: null
      }
    });
    dialog.open();
    await settle();
    const filter = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_runtime"]')
    );
    filter.value = 'codex';
    filter.dispatchEvent(new Event('change'));
    await settle();

    const calls = transport.mock.calls.filter(
      (/** @type {any[]} */ call) =>
        call[0] === 'worker-queue-set-orchestration-defaults'
    );
    expect(calls).toHaveLength(1);
    expect(calls[0][1]).toEqual({
      expected_revision: 3,
      values: { orchestration_model: null, orchestration_effort: null }
    });
  });

  test('clears an effort the new runtime filter has no vocabulary for', async () => {
    const { root, dialog, transport } = mount({
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: CATALOG,
        execution_defaults: EXECUTION_DEFAULTS,
        orchestration_model: 'sol',
        orchestration_effort: 'ultra',
        orchestration_speed: null
      }
    });
    dialog.open();
    await settle();
    const filter = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_runtime"]')
    );
    filter.value = 'claude';
    filter.dispatchEvent(new Event('change'));
    await settle();

    const calls = transport.mock.calls.filter(
      (/** @type {any[]} */ call) =>
        call[0] === 'worker-queue-set-orchestration-defaults'
    );
    expect(calls).toHaveLength(1);
    expect(calls[0][1]).toEqual({
      expected_revision: 3,
      values: { orchestration_model: null, orchestration_effort: null }
    });
  });

  test('offers no 전체 option on the orchestration runtime row', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    const options = Array.from(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('select[data-key="orchestration_runtime"]')
      ).options
    ).map((option) => option.value);

    expect(options).toEqual(['claude', 'codex']);
  });

  test('stores an orchestration edit under the queue revision', async () => {
    const { root, dialog, transport } = mount();
    dialog.open();
    await settle();
    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_model"]')
    );
    select.value = 'opus';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(transport).toHaveBeenCalledWith(
      'worker-queue-set-orchestration-defaults',
      { expected_revision: 3, values: { orchestration_model: 'opus' } }
    );
  });

  test('mounts the shared execution pane bound to the connected workspace', async () => {
    const { root, dialog, transport } = mount();
    dialog.open();
    await settle();

    expect(
      root.querySelector('#settings-pane-execution [data-preset-bar="general"]')
    ).not.toBe(null);
    expect(transport).toHaveBeenCalledWith('get-session-defaults', {});
  });

  test('leaves the automation rows out of the worker tab', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    expect(root.querySelector('[data-automation]')).toBe(null);
  });

  test('offers session and orchestration keys on the execution tab', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();
    const keys = Array.from(
      root.querySelectorAll('#settings-pane-execution select[data-key]')
    ).map((select) => select.getAttribute('data-key'));

    expect(keys).toContain('orchestration_model');
    expect(keys).toContain('impl_runtime');
    expect(keys).toContain('spec_review_model');
  });
});

describe('createSettingsDialog display tab', () => {
  test('ports the label pills into the 표시 tab', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-tab="display"]')
    ).click();

    const pill = root.querySelector(
      '#settings-pane-display [data-label="worker-serial"]'
    );

    expect(pill).not.toBe(null);
  });
});

describe('createSettingsDialog implementation presets', () => {
  const PRESETS = {
    revision: 4,
    presets: [
      {
        id: 'p1',
        name: '기본 위임',
        settings: { impl_runtime: 'codex', impl_model: 'sol' }
      }
    ]
  };

  test('renders no diff preview while no preset is selected', async () => {
    const { root, dialog } = mount({ presets: PRESETS });
    dialog.open();
    await settle();

    expect(root.querySelector('[data-preset-diff]')).toBe(null);
    expect(root.querySelector('[data-preset-save]')?.textContent?.trim()).toBe(
      '새 프리셋 저장'
    );
    expect(
      /** @type {HTMLButtonElement} */ (
        root.querySelector('[data-preset-apply-global]')
      ).disabled
    ).toBe(true);
    dialog.destroy();
  });

  test('previews every key the apply would change for the chosen preset', async () => {
    const { root, dialog } = mount({
      presets: PRESETS,
      values: { impl_runtime: 'claude', impl_speed: 'fast' }
    });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    const rows = Array.from(
      root.querySelectorAll('[data-preset-diff] [data-diff-kind]')
    ).map((row) => [
      row.getAttribute('data-diff-kind'),
      row.textContent?.replace(/\s+/g, ' ').trim()
    ]);
    expect(rows).toEqual([
      ['changed', '위임 대상 claude → codex'],
      ['added', '구현 모델 기본 → sol'],
      ['removed', '구현 속도 fast → 기본(해제)']
    ]);
    expect(root.querySelector('[data-preset-diff]')?.textContent).toContain(
      '변경 3개 · 적용하면 아래와 같이 바뀝니다'
    );
    expect(root.querySelector('[data-preset-save]')?.textContent?.trim()).toBe(
      '현재 설정으로 덮어쓰기'
    );
    expect(
      root.querySelector('[data-preset-apply-global]')?.textContent?.trim()
    ).toBe('적용');
    dialog.destroy();
  });

  test('disables the apply button for the preset its record already names', async () => {
    const { root, dialog } = mount({
      presets: PRESETS,
      values: { impl_runtime: 'codex', impl_model: 'sol' },
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: CATALOG,
        execution_defaults: EXECUTION_DEFAULTS,
        orchestration_model: null,
        orchestration_effort: null,
        orchestration_speed: null,
        quick_fix_orchestration_model: null,
        quick_fix_orchestration_effort: null,
        quick_fix_orchestration_speed: null,
        applied_exec_preset: { id: 'p1', name: '기본 위임', revision: 4 }
      }
    });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(root.querySelector('[data-preset-diff]')?.textContent).toContain(
      '현재 설정과 같습니다 — 적용할 변경이 없습니다'
    );
    expect(
      /** @type {HTMLButtonElement} */ (
        root.querySelector('[data-preset-apply-global]')
      ).disabled
    ).toBe(true);
    dialog.destroy();
  });

  test('creates a preset from the current explicit execution values', async () => {
    const calls = /** @type {any[]} */ ([]);
    const transport = vi.fn(async (type, payload) => {
      calls.push([type, payload]);
      if (type === 'get-session-defaults') {
        return { values: { impl_runtime: 'codex' }, warnings: [] };
      }
      if (type === 'impl-preset-create') {
        return {
          applied: true,
          revision: 5,
          presets: [{ id: 'new', name: '새 조합', settings: {} }]
        };
      }
      return { values: {}, warnings: [] };
    });
    const { root, dialog } = mount({
      transport,
      presets: PRESETS,
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: CATALOG,
        execution_defaults: EXECUTION_DEFAULTS,
        orchestration_model: 'opus',
        orchestration_effort: null,
        orchestration_speed: 'fast'
      }
    });
    dialog.open();
    await settle();

    const name = /** @type {HTMLInputElement} */ (
      root.querySelector('.settings-dialog__preset-name')
    );
    name.value = '새 조합';
    name.dispatchEvent(new Event('input', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-preset-save]')
    ).click();
    await settle();

    const create = calls.find(([type]) => type === 'impl-preset-create');
    expect(create[1]).toEqual({
      expected_revision: 4,
      name: '새 조합',
      applies_to: 'general',
      settings: {
        impl_runtime: 'codex',
        orchestration_model: 'opus',
        orchestration_speed: 'fast'
      }
    });
    dialog.destroy();
  });

  test('creates a preset from an orchestration edit whose queue save failed', async () => {
    const calls = /** @type {any[]} */ ([]);
    const transport = vi.fn(async (type, payload) => {
      calls.push([type, payload]);
      if (type === 'get-session-defaults') {
        return { values: {}, warnings: [] };
      }
      if (type === 'worker-queue-set-orchestration-defaults') {
        return { applied: false, conflict: true };
      }
      if (type === 'impl-preset-create') {
        return { applied: true, revision: 5, presets: [] };
      }
      return { values: {}, warnings: [] };
    });
    const { root, dialog } = mount({
      transport,
      presets: PRESETS,
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: CATALOG,
        execution_defaults: EXECUTION_DEFAULTS,
        orchestration_model: 'opus',
        orchestration_effort: null,
        orchestration_speed: null
      }
    });
    dialog.open();
    await settle();

    const runtime = /** @type {HTMLSelectElement} */ (
      root.querySelector(
        '#settings-pane-execution [data-key="orchestration_runtime"]'
      )
    );
    runtime.value = 'codex';
    runtime.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();
    const model_select = /** @type {HTMLSelectElement} */ (
      root.querySelector(
        '#settings-pane-execution [data-key="orchestration_model"]'
      )
    );
    model_select.value = 'sol';
    model_select.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();
    const name = /** @type {HTMLInputElement} */ (
      root.querySelector('.settings-dialog__preset-name')
    );
    name.value = '실패한 편집';
    name.dispatchEvent(new Event('input', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-preset-save]')
    ).click();
    await settle();

    const create = calls.find(([type]) => type === 'impl-preset-create');
    expect(create[1].settings.orchestration_model).toBe('sol');
    dialog.destroy();
  });

  test('updates the selected preset keeping its name', async () => {
    const calls = /** @type {any[]} */ ([]);
    const transport = vi.fn(async (type, payload) => {
      calls.push([type, payload]);
      if (type === 'get-session-defaults') {
        return { values: { impl_runtime: 'codex' }, warnings: [] };
      }
      if (type === 'impl-preset-update') {
        return { applied: true, revision: 5, presets: PRESETS.presets };
      }
      return { values: {}, warnings: [] };
    });
    const { root, dialog } = mount({ transport, presets: PRESETS });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    const save = /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-preset-save]')
    );
    expect(save.textContent?.trim()).toBe('현재 설정으로 덮어쓰기');
    save.click();
    await settle();

    const update = calls.find(([type]) => type === 'impl-preset-update');
    expect(update[1]).toEqual({
      expected_revision: 4,
      id: 'p1',
      name: '기본 위임',
      settings: { impl_runtime: 'codex' }
    });
    dialog.destroy();
  });

  test('deletes the selected preset', async () => {
    const calls = /** @type {any[]} */ ([]);
    const transport = vi.fn(async (type, payload) => {
      calls.push([type, payload]);
      if (type === 'impl-preset-delete') {
        return { applied: true, revision: 5, presets: [] };
      }
      return { values: {}, warnings: [] };
    });
    const { root, dialog } = mount({ transport, presets: PRESETS });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-preset-delete]')
    ).click();
    await settle();

    const del = calls.find(([type]) => type === 'impl-preset-delete');
    expect(del[1]).toEqual({ expected_revision: 4, id: 'p1' });
    dialog.destroy();
  });

  test('applies a preset with both revisions and adopts the queue snapshot', async () => {
    const transport = vi.fn(async (type) => {
      if (type === 'get-session-defaults') {
        return { values: {}, warnings: [] };
      }
      if (type === 'apply-impl-preset-global') {
        return {
          applied: true,
          conflict: false,
          revision: 5,
          values: { workflow_mode: 'fast_track' },
          warnings: [],
          queue_applied: true,
          queue_conflict: false,
          queue: {
            revision: 4,
            slots: 2,
            runner_catalog: CATALOG,
            execution_defaults: EXECUTION_DEFAULTS,
            orchestration_model: 'sol',
            orchestration_effort: 'medium',
            orchestration_speed: 'default'
          }
        };
      }
      return {};
    });
    const { root, dialog } = mount({ transport, presets: PRESETS });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    const apply = /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-preset-apply-global]')
    );
    expect(apply.disabled).toBe(false);
    apply.click();
    await settle();

    expect(transport).toHaveBeenCalledWith('apply-impl-preset-global', {
      preset_id: 'p1',
      expected_revision: 4,
      expected_queue_revision: 3
    });
    expect(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('select[data-key="orchestration_model"]')
      ).value
    ).toBe('sol');
    dialog.destroy();
  });

  test('reports a partial failure when queue values were not applied', async () => {
    const transport = vi.fn(async (type) => {
      if (type === 'get-session-defaults') {
        return { values: {}, warnings: [] };
      }
      if (type === 'apply-impl-preset-global') {
        return {
          applied: true,
          conflict: false,
          revision: 5,
          values: { workflow_mode: 'fast_track' },
          warnings: [],
          queue_applied: false,
          queue_conflict: true,
          queue: {
            revision: 4,
            slots: 2,
            runner_catalog: CATALOG,
            execution_defaults: EXECUTION_DEFAULTS,
            orchestration_model: null,
            orchestration_effort: null,
            orchestration_speed: null
          }
        };
      }
      return {};
    });
    const { root, dialog, notify } = mount({ transport, presets: PRESETS });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-preset-apply-global]')
    ).click();
    await settle();

    expect(notify).toHaveBeenCalledWith(
      '오케스트레이션 값은 적용되지 않았습니다 — 다시 시도하세요'
    );
    expect(dialog.sessionDraft()).toEqual({ workflow_mode: 'fast_track' });
    dialog.destroy();
  });
});
