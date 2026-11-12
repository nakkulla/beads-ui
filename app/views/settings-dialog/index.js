/**
 * The settings dialog — ONE window behind every ⚙ (UI-32oq §4.4).
 *
 * Every entry opens the same rail; only the initial TARGET differs: the header
 * ⚙ outside the monitor opens on the connected repository, a monitor repo
 * strip ⚙ on that repository, and the monitor header ⚙ on several
 * repositories. The rail has two groups:
 * - 대상 저장소 — `실행`, `계정`, `저장소`, `표시` edit the target chosen in the
 *   bar above the pane (`대상: [저장소 하나 | 여러 저장소]` and a repository
 *   picker). Changing the target rebinds these panes to it and drops their
 *   unsaved input, exactly like closing the window.
 * - 서버 전체 — `활성 계정`, `프리셋·모델`, `운영` edit server-wide values and
 *   ignore the target.
 *
 * One target repository mounts `createExecutionPane` (the `실행`·`계정` tabs,
 * `root_dir: null` for the connected workspace so its wire format is unchanged)
 * and `createRepoPane` (the `저장소` tab). Several repositories mount
 * `createBulkPane`, whose `적용 대상` list picks the repos; `저장소`·`표시` then
 * ask for one repository. `표시` edits the connected workspace's display policy
 * only, so another target shows where it can be changed.
 *
 * Only the ACTIVE tab is in the DOM (UI-7yh2 §3.1); every pane draws into its
 * own host element, which moves into the active tab's body so a pane's state
 * survives a tab switch.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../utils/label-policy.js').DisplayPolicy} DisplayPolicy
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { showToast } from '../../utils/toast.js';
import { createActiveLoginStatus } from './active-login-status.js';
import { createAutoPoolSection } from './auto-pool-section.js';
import { createBulkPane } from './bulk-pane.js';
import { createChipBindingsTab } from './chip-bindings-tab.js';
import { createConversationSection } from './conversation-section.js';
import { chipsSection, labelsSection, prefixesSection } from './display-tab.js';
import { createExecutionPane } from './execution-pane.js';
import { createExternalWaitSection } from './external-wait-section.js';
import { createLimitPolicySection } from './limit-policy-section.js';
import { createModelVisibilitySection } from './model-visibility-section.js';
import { createPresetManageSection } from './preset-manage-section.js';
import { createRepoPane } from './repo-pane.js';
import { createTimingSection } from './timing-section.js';
import { createWorkerUrlSection } from './worker-url-section.js';

/**
 * The tabs that edit the dialog's target, in rail order. Glyphs never repeat
 * across the rail.
 */
export const TARGET_TABS = [
  { id: 'execution', label: '실행', glyph: '◆' },
  { id: 'account', label: '계정', glyph: '◎' },
  { id: 'repo', label: '저장소', glyph: '▣' },
  { id: 'display', label: '표시', glyph: '◫' }
];

/** The tabs that edit server-wide values regardless of the target. */
export const SERVER_TABS = [
  { id: 'active_account', label: '활성 계정', glyph: '★' },
  { id: 'presets', label: '프리셋·모델', glyph: '⬡' },
  { id: 'operations', label: '운영', glyph: '◷' }
];

/** The rail's two labelled groups, in display order. */
export const SETTINGS_TAB_GROUPS = [
  { id: 'target', label: '대상 저장소', tabs: TARGET_TABS },
  { id: 'server', label: '서버 전체', tabs: SERVER_TABS }
];

/** Every rail tab, in display order — the same list from every ⚙. */
export const SETTINGS_TABS = [...TARGET_TABS, ...SERVER_TABS];

/** What a target tab says when several repositories are the target. */
export const PICK_ONE_REPO = '저장소 하나를 고르세요';

/** The picker value standing for a connected repo the monitor rows lack. */
const CONNECTED_VALUE = '';

/**
 * Per-tab pane heading and one-line subtitle; a target tab's subtitle differs
 * between one repository and several.
 *
 * @type {Record<string, { title: string, sub: string, multi_sub?: string }>}
 */
const TAB_COPY = {
  execution: {
    title: '실행',
    sub: '이 저장소의 Worker와 quick fix가 어떤 모델로 도는지 정합니다.',
    multi_sub:
      '선택한 저장소의 현재 실행 프로필을 읽어 세웁니다. 프리셋을 고르면 그 블록의 행이 그 값으로 채워집니다.'
  },
  account: {
    title: '계정',
    sub: '이 저장소 Worker의 default 계정과 자동 전환을 정합니다.',
    multi_sub:
      '선택한 저장소 Worker의 default 계정과 자동 전환을 읽어 세웁니다.'
  },
  repo: {
    title: '저장소',
    sub: '이 저장소 하나에만 있는 값입니다.'
  },
  display: {
    title: '표시',
    sub: '연결된 저장소의 라벨·칩 표시 정책입니다.'
  },
  active_account: {
    title: '활성 계정',
    sub: 'Mac의 현재 로그인을 자동으로 바꿉니다. 대화형 세션과 default 계정이 없는 저장소의 Worker가 이 로그인을 씁니다. 저장소별 설정과 따로 동작합니다.'
  },
  presets: {
    title: '프리셋·모델',
    sub: '모든 저장소가 같이 쓰는 목록입니다.'
  },
  operations: {
    title: '운영',
    sub: '모든 저장소가 같이 쓰는 연결·대기 설정입니다.'
  }
};

/**
 * @param {string} root_dir
 * @returns {string}
 */
function baseName(root_dir) {
  const parts = root_dir.split('/').filter((part) => part.length > 0);
  return parts.length > 0 ? parts[parts.length - 1] : root_dir;
}

/**
 * Create the settings dialog (native `<dialog>`).
 *
 * @param {HTMLElement} mount_element
 * @param {{
 *   transport: (type: import('../../protocol.js').MessageType, payload?: unknown) => Promise<any>,
 *   policyStore: { get: () => DisplayPolicy|null, set: (p: DisplayPolicy|null) => void, subscribe?: (fn: () => void) => () => void },
 *   queueStore?: { get: () => any, set?: (queue: any) => void, subscribe?: (fn: () => void) => () => void },
 *   implPresetStore?: { get: () => any, subscribe?: (fn: () => void) => () => void },
 *   modelVisibilityStore?: { get: () => any, set?: (state: any) => void, subscribe?: (fn: () => void) => () => void },
 *   autoPoolStore?: { get: () => any, set?: (state: any) => void, subscribe?: (fn: () => void) => () => void },
 *   timingSettingsStore?: { get: () => any, set?: (state: any) => void, subscribe?: (fn: () => void) => () => void },
 *   externalWaitSettingsStore?: { get: () => any, set?: (state: any) => void, subscribe?: (fn: () => void) => () => void },
 *   limitPolicySettingsStore?: { get: () => any, set?: (state: any) => void, subscribe?: (fn: () => void) => () => void },
 *   codexCreditStore?: { get: () => any, set?: (state: any) => void, subscribe?: (fn: () => void) => () => void },
 *   labelOptions: () => string[],
 *   connectedRoot?: () => string|null,
 *   notify?: (message: string) => void,
 *   onOpenChange?: (open: boolean) => void,
 *   monitorRows?: () => Array<Record<string, any>>,
 *   monitorPipeline?: () => Array<Record<string, any>>|null,
 *   subscribeMonitorRows?: (fn: () => void) => () => void,
 *   onBulkApplied?: (root_dirs: string[]) => void,
 *   onOpenRepoOps?: (root_dir: string) => void
 * }} options
 */
export function createSettingsDialog(mount_element, options) {
  const { transport, policyStore, labelOptions } = options;
  const notify =
    options.notify || ((message) => showToast(message, 'error', 4000));
  /**
   * @param {string} message
   * @param {string} [kind]
   */
  const toast = (message, kind) =>
    showToast(message, /** @type {any} */ (kind));

  const dialog = /** @type {HTMLDialogElement} */ (
    document.createElement('dialog')
  );
  dialog.id = 'settings-dialog';
  dialog.className = 'settings-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', '설정');
  mount_element.appendChild(dialog);

  let active_tab = 'execution';
  /** @type {import('./execution-subtabs.js').ExecutionSubtab} */
  let execution_subtab = 'worker';
  let is_open = false;
  let prefix_draft = '';
  /** @type {'single'|'multi'} */
  let target_mode = 'single';
  /**
   * The one target repository, or `null` for the connected workspace. Kept
   * while several repositories are the target, so `저장소 하나` returns to it.
   *
   * @type {string|null}
   */
  let target_root = null;
  /** The adopted queue for a non-connected target; newer than its monitor row. */
  /** @type {any} */
  let repo_queue = null;
  /**
   * Which binding of the target panes is live. Every teardown moves it on, so
   * a pane created for an earlier target can no longer adopt a late reply
   * into `repo_queue` or the queue store.
   */
  let target_generation = 0;

  /**
   * @param {string} [class_name]
   * @returns {HTMLDivElement}
   */
  function makeHost(class_name = 'settings-dialog__pane-host') {
    const host = document.createElement('div');
    host.className = class_name;
    return host;
  }

  /** @type {ReturnType<typeof createExecutionPane>|null} */
  let execution_pane = null;
  const pane_host = makeHost();
  /** @type {ReturnType<typeof createRepoPane>|null} */
  let repo_pane = null;
  const repo_host = makeHost();
  /** @type {ReturnType<typeof createBulkPane>|null} */
  let bulk_pane = null;
  const bulk_host = makeHost();

  /** @type {ReturnType<typeof createLimitPolicySection>|null} */
  let limit_policy_section = null;
  /** @type {ReturnType<typeof createActiveLoginStatus>|null} */
  let active_login_status = null;
  /**
   * The `활성 계정` tab's host: the current status lines above the per-runner
   * groups (UI-32oq §4.4).
   */
  const active_account_host = makeHost();
  const active_login_status_host = document.createElement('div');
  const limit_policy_host = document.createElement('div');
  active_account_host.append(active_login_status_host, limit_policy_host);

  /** @type {ReturnType<typeof createPresetManageSection>|null} */
  let preset_manage = null;
  /** @type {ReturnType<typeof createChipBindingsTab>|null} */
  let chip_tab = null;
  /** @type {ReturnType<typeof createModelVisibilitySection>|null} */
  let model_section = null;
  /** @type {ReturnType<typeof createAutoPoolSection>|null} */
  let auto_pool_section = null;
  /**
   * The `프리셋·모델` tab's host: preset management, chip presets, models, and
   * the auto-pool candidates below the model list (UI-y7h1 §3.4).
   */
  const presets_host = makeHost();
  const preset_manage_host = document.createElement('div');
  const chip_group = document.createElement('section');
  chip_group.className = 'settings-dialog__group';
  const chip_title = document.createElement('div');
  chip_title.className = 'settings-dialog__group-title';
  chip_title.textContent = '판정 칩 프리셋';
  const chip_host = document.createElement('div');
  chip_group.append(chip_title, chip_host);
  const model_host = document.createElement('div');
  const auto_pool_host = document.createElement('div');
  presets_host.append(
    preset_manage_host,
    chip_group,
    model_host,
    auto_pool_host
  );

  /** @type {ReturnType<typeof createWorkerUrlSection>|null} */
  let worker_url_section = null;
  /** @type {ReturnType<typeof createTimingSection>|null} */
  let timing_section = null;
  /** @type {ReturnType<typeof createExternalWaitSection>|null} */
  let external_wait_section = null;
  /** @type {ReturnType<typeof createConversationSection>|null} */
  let conversation_section = null;
  /** The `운영` tab's host: Worker address, waits, external jobs, sessions. */
  const operations_host = makeHost();
  const worker_url_host = document.createElement('div');
  const timing_host = document.createElement('div');
  const external_wait_host = document.createElement('div');
  const conversation_host = document.createElement('div');
  operations_host.append(
    worker_url_host,
    timing_host,
    external_wait_host,
    conversation_host
  );

  /** @returns {Array<Record<string, any>>} */
  function monitorRows() {
    const rows = options.monitorRows?.() || [];
    return Array.isArray(rows) ? rows.filter((row) => row && row.root_dir) : [];
  }

  /** @returns {string|null} */
  function connectedPath() {
    const path = options.connectedRoot?.() ?? null;
    return typeof path === 'string' && path.length > 0 ? path : null;
  }

  /**
   * @param {string|null} root_dir
   * @returns {Record<string, any>|null}
   */
  function rowOf(root_dir) {
    return root_dir === null
      ? null
      : (monitorRows().find((row) => row.root_dir === root_dir) ?? null);
  }

  /**
   * A repository's display name: its monitor row's own, else its last path
   * segment.
   *
   * @param {string|null} root_dir
   * @returns {string}
   */
  function nameOf(root_dir) {
    if (root_dir === null) {
      return '연결된 저장소';
    }
    const row = rowOf(root_dir);
    return row && typeof row.name === 'string' ? row.name : baseName(root_dir);
  }

  /** Whether the single target IS the connected workspace. */
  function targetIsConnected() {
    return (
      target_mode === 'single' &&
      (target_root === null || target_root === connectedPath())
    );
  }

  /**
   * The single target's absolute path, or `null` when it is the connected
   * workspace whose path is unknown.
   *
   * @returns {string|null}
   */
  function targetPath() {
    return target_root ?? connectedPath();
  }

  /**
   * The runner catalog behind the `프리셋·모델` tab's model-list note: a monitor
   * row's, else the connected workspace's worker queue snapshot.
   *
   * @returns {Record<string, any>|null}
   */
  function globalRunnerCatalog() {
    const row = monitorRows().find((entry) => entry.runner_catalog);
    if (row) {
      return row.runner_catalog;
    }
    const queue = options.queueStore?.get() ?? null;
    return queue && queue.runner_catalog ? queue.runner_catalog : null;
  }

  /**
   * The `실행`·`계정` pane for the single target. The connected workspace binds
   * `root_dir: null` and the shared queue store; another repository binds its
   * path and its monitor row, laid over by whatever a mutation adopted.
   *
   * @returns {ReturnType<typeof createExecutionPane>}
   */
  function ensureExecutionPane() {
    if (execution_pane) {
      return execution_pane;
    }
    const bound_root = targetIsConnected() ? null : target_root;
    const generation = target_generation;
    execution_pane = createExecutionPane(pane_host, {
      executionSubtab: execution_subtab,
      onExecutionSubtabChange: (tab) => {
        execution_subtab = tab;
      },
      root_dir: bound_root,
      queue: () =>
        bound_root === null
          ? (options.queueStore?.get() ?? null)
          : (repo_queue ?? rowOf(bound_root)),
      transport,
      implPresetStore: options.implPresetStore,
      modelVisibilityStore: options.modelVisibilityStore,
      codexCreditStore: options.codexCreditStore,
      limitPolicySettingsStore: options.limitPolicySettingsStore,
      onOpenActiveAccount: () => selectTab('active_account'),
      notify,
      onQueueAdopt: (queue) => {
        if (generation !== target_generation) {
          return;
        }
        if (bound_root === null) {
          options.queueStore?.set?.(queue);
          return;
        }
        repo_queue = queue;
      }
    });
    return execution_pane;
  }

  /**
   * The `저장소` pane for the single target, or `null` when its path is not
   * known yet. The connected workspace's queue falls back to the shared queue
   * store until its monitor row arrives.
   *
   * @returns {ReturnType<typeof createRepoPane>|null}
   */
  function ensureRepoPane() {
    if (repo_pane) {
      return repo_pane;
    }
    const bound_root = targetPath();
    if (bound_root === null) {
      return null;
    }
    const connected = targetIsConnected();
    const generation = target_generation;
    repo_pane = createRepoPane(repo_host, {
      root_dir: bound_root,
      transport,
      stateRow: () =>
        rowOf(bound_root) ??
        (connected ? (options.queueStore?.get() ?? null) : null),
      pipelineItem: () =>
        (options.monitorPipeline?.() || []).find(
          (item) => item && item.root_dir === bound_root
        ) ?? null,
      adopted: () => repo_queue,
      onQueueAdopt: (queue) => {
        if (generation !== target_generation) {
          return;
        }
        if (connected) {
          options.queueStore?.set?.(queue);
        }
        repo_queue = queue;
      },
      onOpenRepoOps: () => {
        close();
        options.onOpenRepoOps?.(bound_root);
      },
      notify
    });
    void repo_pane.load();
    return repo_pane;
  }

  /** @returns {ReturnType<typeof createBulkPane>} */
  function ensureBulkPane() {
    if (!bulk_pane) {
      bulk_pane = createBulkPane(bulk_host, {
        executionSubtab: execution_subtab,
        onExecutionSubtabChange: (tab) => {
          execution_subtab = tab;
        },
        transport,
        rows: monitorRows,
        subscribeRows: options.subscribeMonitorRows,
        implPresetStore: options.implPresetStore,
        modelVisibilityStore: options.modelVisibilityStore,
        codexCreditStore: options.codexCreditStore,
        notify,
        onBulkApplied: (root_dirs) => options.onBulkApplied?.(root_dirs)
      });
    }
    return bulk_pane;
  }

  /** Draw the `활성 계정` tab's sections into their hosts. */
  function drawActiveAccount() {
    if (!active_login_status) {
      active_login_status = createActiveLoginStatus(active_login_status_host, {
        limitPolicySettingsStore: options.limitPolicySettingsStore
      });
    }
    active_login_status.render();
    if (!limit_policy_section) {
      limit_policy_section = createLimitPolicySection(limit_policy_host, {
        transport,
        limitPolicySettingsStore: options.limitPolicySettingsStore,
        toast
      });
    }
    limit_policy_section.render();
  }

  /** Draw the `프리셋·모델` tab's sections into their hosts. */
  function drawPresets() {
    if (!preset_manage) {
      preset_manage = createPresetManageSection(preset_manage_host, {
        transport,
        implPresetStore: options.implPresetStore
      });
    }
    preset_manage.render();
    if (!chip_tab) {
      chip_tab = createChipBindingsTab(chip_host, {
        transport,
        implPresetStore: options.implPresetStore,
        toast
      });
    }
    chip_tab.render();
    if (!model_section) {
      model_section = createModelVisibilitySection(model_host, {
        transport,
        modelVisibilityStore: options.modelVisibilityStore,
        runnerCatalog: globalRunnerCatalog
      });
    }
    model_section.render();
    if (!auto_pool_section) {
      auto_pool_section = createAutoPoolSection(auto_pool_host, {
        transport,
        autoPoolStore: options.autoPoolStore,
        modelVisibilityStore: options.modelVisibilityStore,
        notify
      });
    }
    auto_pool_section.render();
  }

  /** Draw the `운영` tab's sections into their hosts. */
  function drawOperations() {
    if (!worker_url_section) {
      worker_url_section = createWorkerUrlSection(worker_url_host, {
        transport,
        notify
      });
      void worker_url_section.load();
    }
    worker_url_section.render();
    if (!timing_section) {
      timing_section = createTimingSection(timing_host, {
        transport,
        timingSettingsStore: options.timingSettingsStore,
        toast
      });
    }
    timing_section.render();
    if (!external_wait_section) {
      external_wait_section = createExternalWaitSection(external_wait_host, {
        transport,
        externalWaitSettingsStore: options.externalWaitSettingsStore,
        toast
      });
    }
    external_wait_section.render();
    if (!conversation_section) {
      conversation_section = createConversationSection(conversation_host, {
        transport,
        modelVisibilityStore: options.modelVisibilityStore,
        toast
      });
    }
    conversation_section.render();
  }

  /** Tear down the panes bound to the target, dropping their unsaved input. */
  function destroyTargetPanes() {
    target_generation += 1;
    execution_pane?.destroy();
    execution_pane = null;
    pane_host.remove();
    repo_pane?.destroy();
    repo_pane = null;
    repo_host.remove();
    bulk_pane?.destroy();
    bulk_pane = null;
    bulk_host.remove();
    repo_queue = null;
    prefix_draft = '';
  }

  /** Tear down the server-wide sections. */
  function destroyServerSections() {
    active_login_status?.destroy();
    active_login_status = null;
    limit_policy_section?.destroy();
    limit_policy_section = null;
    active_account_host.remove();
    preset_manage?.destroy();
    preset_manage = null;
    chip_tab?.destroy();
    chip_tab = null;
    model_section?.destroy();
    model_section = null;
    auto_pool_section?.destroy();
    auto_pool_section = null;
    presets_host.remove();
    worker_url_section?.destroy();
    worker_url_section = null;
    timing_section?.destroy();
    timing_section = null;
    external_wait_section?.destroy();
    external_wait_section = null;
    conversation_section?.destroy();
    conversation_section = null;
    operations_host.remove();
  }

  /**
   * Bind the target tabs to the target just chosen: the old panes and their
   * unsaved input go, as if the window had closed (§4.4).
   */
  function rebindTarget() {
    destroyTargetPanes();
    doRender();
    if (target_mode === 'single') {
      void ensureExecutionPane().load();
    }
  }

  /** @param {'single'|'multi'} mode */
  function onTargetMode(mode) {
    if (mode === target_mode) {
      return;
    }
    target_mode = mode;
    rebindTarget();
  }

  /** @param {string} value */
  function onTargetRepo(value) {
    const next = value === CONNECTED_VALUE ? null : value;
    if (next === target_root) {
      return;
    }
    target_root = next;
    rebindTarget();
  }

  /**
   * The picker's options: every monitor row, plus the connected workspace and
   * the current target when the rows do not carry them.
   *
   * @returns {Array<{ value: string, label: string }>}
   */
  function pickerOptions() {
    const connected = connectedPath();
    /** @type {Array<{ value: string, label: string }>} */
    const list = monitorRows().map((row) => ({
      value: String(row.root_dir),
      label:
        row.root_dir === connected
          ? `${nameOf(row.root_dir)} · 연결됨`
          : nameOf(row.root_dir)
    }));
    if (connected === null || !list.some((item) => item.value === connected)) {
      list.unshift({
        value: CONNECTED_VALUE,
        label: `${connected === null ? '연결된 저장소' : nameOf(connected)} · 연결됨`
      });
    }
    if (
      target_root !== null &&
      !list.some((item) => item.value === target_root)
    ) {
      list.push({ value: target_root, label: nameOf(target_root) });
    }
    return list;
  }

  /** @returns {string} */
  function pickerValue() {
    if (target_root !== null) {
      return target_root;
    }
    const connected = connectedPath();
    return connected !== null && rowOf(connected) ? connected : CONNECTED_VALUE;
  }

  /** @returns {TemplateResult|''} */
  function targetBarTemplate() {
    if (SERVER_TABS.some((tab) => tab.id === active_tab)) {
      return '';
    }
    const value = pickerValue();
    return html`<div class="settings-dialog__target" data-target-bar>
      <span class="settings-dialog__target-label">대상</span>
      <span class="settings-dialog__seg" role="group" aria-label="대상">
        ${[
          /** @type {const} */ (['single', '저장소 하나']),
          /** @type {const} */ (['multi', '여러 저장소'])
        ].map(
          ([mode, label]) =>
            html`<button
              type="button"
              class=${target_mode === mode ? 'op-btn is-active' : 'op-btn'}
              data-target-mode=${mode}
              aria-pressed=${String(target_mode === mode)}
              @click=${() => onTargetMode(mode)}
            >
              ${label}
            </button>`
        )}
      </span>
      ${target_mode === 'single'
        ? html`<select
            class="ui-select"
            data-target-repo
            aria-label="대상 저장소"
            .value=${live(value)}
            @change=${(/** @type {Event} */ ev) =>
              onTargetRepo(
                String(/** @type {HTMLSelectElement} */ (ev.target).value)
              )}
          >
            ${pickerOptions().map(
              (item) =>
                html`<option
                  value=${item.value}
                  ?selected=${item.value === value}
                >
                  ${item.label}
                </option>`
            )}
          </select>`
        : html`<span class="settings-dialog__target-hint"
            >아래 적용 대상에서 고릅니다</span
          >`}
    </div>`;
  }

  /**
   * One tab's pane: heading, subtitle and either an empty body slot a pane
   * host is appended into, or a body template.
   *
   * @param {string} slot - The body's `data-pane` name, or `''` for none.
   * @param {TemplateResult|string} [body]
   * @returns {TemplateResult}
   */
  function paneSection(slot, body = '') {
    const copy = TAB_COPY[active_tab];
    const sub =
      target_mode === 'multi' && copy.multi_sub ? copy.multi_sub : copy.sub;
    return html`
      <section
        class="settings-dialog__pane settings-dialog__pane--active"
        role="tabpanel"
        id=${`settings-pane-${active_tab}`}
        aria-label=${copy.title}
      >
        <header class="settings-dialog__pane-head">
          <h2>${copy.title}</h2>
        </header>
        <p class="settings-dialog__pane-sub">${sub}</p>
        ${slot
          ? html`<div
              class="settings-dialog__pane-body"
              data-pane=${slot}
            ></div>`
          : body}
      </section>
    `;
  }

  /**
   * @param {string} text
   * @returns {TemplateResult}
   */
  function noticeTemplate(text) {
    return html`<div class="settings-dialog__empty" data-target-notice>
      ${text}
    </div>`;
  }

  /**
   * The `표시` tab's body: the editor for the connected workspace, a notice
   * for any other target (the policy is bound to the connected one).
   *
   * @returns {TemplateResult}
   */
  function displayBody() {
    if (target_mode === 'multi') {
      return noticeTemplate(PICK_ONE_REPO);
    }
    if (!targetIsConnected()) {
      return noticeTemplate(
        `연결된 저장소(${nameOf(connectedPath())})에서만 바꿀 수 있습니다`
      );
    }
    const policy = policyStore.get();
    return policy
      ? html`
          ${labelsSection(policy, labelOptions(), onLabelPillClick)}
          ${prefixesSection(policy, prefix_draft, {
            onDraft: (value) => {
              prefix_draft = value;
            },
            onAdd: onPrefixAdd,
            onRemove: onPrefixRemove
          })}
          ${chipsSection(policy, onChipToggle)}
        `
      : html`<div class="settings-dialog__empty">
          표시 정책을 불러오는 중…
        </div>`;
  }

  /**
   * Which pane host the active tab mounts, or `null` for a template-only tab.
   *
   * @returns {string|null}
   */
  function activeSlot() {
    switch (active_tab) {
      case 'execution':
      case 'account':
        return target_mode === 'multi' ? 'bulk' : 'execution';
      case 'repo':
        return target_mode === 'single' && targetPath() !== null
          ? 'repo'
          : null;
      case 'active_account':
      case 'presets':
      case 'operations':
        return active_tab;
      default:
        return null;
    }
  }

  /** @returns {TemplateResult} */
  function panesTemplate() {
    const slot = activeSlot();
    if (slot !== null) {
      return paneSection(slot);
    }
    if (active_tab === 'repo') {
      return paneSection(
        '',
        noticeTemplate(
          target_mode === 'multi'
            ? PICK_ONE_REPO
            : '연결된 저장소를 확인할 수 없습니다'
        )
      );
    }
    return paneSection('', displayBody());
  }

  /**
   * @param {HTMLElement} host
   * @param {string} slot
   * @returns {boolean} Whether the slot was on screen.
   */
  function attach(host, slot) {
    const body = /** @type {HTMLElement|null} */ (
      dialog.querySelector(`[data-pane="${slot}"]`)
    );
    if (!body) {
      return false;
    }
    // lit reuses this body element across tabs (same template, new
    // `data-pane`), so the previous tab's host must leave it. The body holds
    // no bindings of its own, so removing its children never touches lit.
    for (const child of Array.from(body.children)) {
      if (child !== host) {
        child.remove();
      }
    }
    if (host.parentElement !== body) {
      body.appendChild(host);
    }
    return true;
  }

  /** Move the active tab's pane host into its body and draw it. */
  function mountActiveHost() {
    const slot = activeSlot();
    if (slot === 'execution' && attach(pane_host, slot)) {
      ensureExecutionPane().render(active_tab);
    } else if (slot === 'bulk' && attach(bulk_host, slot)) {
      ensureBulkPane().render(
        /** @type {'execution'|'account'} */ (active_tab)
      );
    } else if (slot === 'repo' && attach(repo_host, slot)) {
      ensureRepoPane()?.render();
    } else if (slot === 'active_account' && attach(active_account_host, slot)) {
      drawActiveAccount();
    } else if (slot === 'presets' && attach(presets_host, slot)) {
      drawPresets();
    } else if (slot === 'operations' && attach(operations_host, slot)) {
      drawOperations();
    }
  }

  /**
   * @param {{ id: string, label: string, glyph: string }} tab
   * @returns {TemplateResult}
   */
  function tabButton(tab) {
    return html`<button
      type="button"
      class="op-btn settings-dialog__tab"
      role="tab"
      data-tab=${tab.id}
      aria-selected=${String(active_tab === tab.id)}
      aria-controls=${`settings-pane-${tab.id}`}
      @click=${() => selectTab(tab.id)}
    >
      <span class="settings-dialog__glyph">${tab.glyph}</span>
      ${tab.label}
    </button>`;
  }

  /** Draw the rail, the target bar and the active tab's pane frame. */
  function renderShell() {
    render(
      html`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${SETTINGS_TAB_GROUPS.map(
              (group) =>
                html`<div
                    class="settings-dialog__rail-group"
                    role="presentation"
                    data-rail-group=${group.id}
                  >
                    ${group.label}
                  </div>
                  ${group.tabs.map(tabButton)}`
            )}
            <button
              type="button"
              class="op-btn settings-dialog__close"
              aria-label="닫기"
              @click=${close}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${targetBarTemplate()} ${panesTemplate()}
          </div>
        </div>
      `,
      dialog
    );
  }

  function doRender() {
    renderShell();
    mountActiveHost();
  }

  /** @param {string} tab_id */
  function selectTab(tab_id) {
    active_tab = tab_id;
    doRender();
  }

  /**
   * Send a display-policy patch with a CAS guard, retrying ONCE on conflict.
   *
   * @param {(policy: DisplayPolicy) => Record<string, unknown>} buildPatch
   */
  async function savePolicy(buildPatch) {
    const current = policyStore.get();
    if (!current) {
      return;
    }
    try {
      let res = await transport('display-policy-set', {
        expected_revision: current.revision,
        policy: buildPatch(current)
      });
      adoptPolicy(res);
      if (res && res.conflict && res.policy) {
        res = await transport('display-policy-set', {
          expected_revision: res.policy.revision,
          policy: buildPatch(res.policy)
        });
        adoptPolicy(res);
      }
      if (res && res.conflict) {
        notify('표시 설정 저장 실패: 다른 클라이언트와 충돌');
      }
    } catch {
      notify('표시 설정 저장 실패');
    }
  }

  /** @param {any} res */
  function adoptPolicy(res) {
    if (res && res.policy && typeof res.policy === 'object') {
      policyStore.set(res.policy);
    }
  }

  /** @param {(policy: DisplayPolicy) => Record<string, unknown>} buildPatch */
  function onPolicyPatch(buildPatch) {
    void savePolicy(buildPatch);
  }

  /** @param {string} label */
  function onLabelPillClick(label) {
    const current = policyStore.get();
    if (!current) {
      return;
    }
    const desired_visible = !labelIsVisible(label, current);
    onPolicyPatch((policy) => labelPatch(label, policy, desired_visible));
  }

  function onPrefixAdd() {
    const prefix = prefix_draft.trim();
    if (prefix.length === 0) {
      return;
    }
    prefix_draft = '';
    onPolicyPatch((policy) =>
      policy.hidden_prefixes.includes(prefix)
        ? { hidden_prefixes: policy.hidden_prefixes }
        : { hidden_prefixes: [...policy.hidden_prefixes, prefix] }
    );
    doRender();
  }

  /** @param {string} prefix */
  function onPrefixRemove(prefix) {
    onPolicyPatch((policy) => ({
      hidden_prefixes: policy.hidden_prefixes.filter((it) => it !== prefix)
    }));
  }

  /** @param {string} chip */
  function onChipToggle(chip) {
    const current = policyStore.get();
    if (!current) {
      return;
    }
    const desired = /** @type {any} */ (current.chips)[chip] === false;
    onPolicyPatch(() => ({ chips: { [chip]: desired } }));
  }

  const onDialogClose = () => {
    is_open = false;
    // `cancel` fires while the dialog is still open, and a queued `close` may
    // land after a reopen — only a dialog that is really shut drops its panes.
    if (!dialog.open) {
      destroyTargetPanes();
      destroyServerSections();
    }
    options.onOpenChange?.(false);
  };
  dialog.addEventListener('close', onDialogClose);
  dialog.addEventListener('cancel', onDialogClose);
  // Light dismiss: a click on the backdrop targets the <dialog> element itself
  // (its padding is 0, so any in-panel click targets a descendant instead).
  const onBackdropClick = (/** @type {MouseEvent} */ event) => {
    if (event.target === dialog) {
      close();
    }
  };
  dialog.addEventListener('click', onBackdropClick);

  /** @type {Array<() => void>} */
  const unsubscribers = [];
  if (policyStore.subscribe) {
    unsubscribers.push(
      policyStore.subscribe(() => {
        if (is_open) {
          doRender();
        }
      })
    );
  }
  if (options.implPresetStore?.subscribe) {
    unsubscribers.push(
      options.implPresetStore.subscribe(() => {
        if (is_open) {
          execution_pane?.render();
          bulk_pane?.render();
          preset_manage?.render();
          chip_tab?.render();
        }
      })
    );
  }
  if (options.modelVisibilityStore?.subscribe) {
    unsubscribers.push(
      options.modelVisibilityStore.subscribe(() => {
        if (is_open) {
          execution_pane?.render();
          bulk_pane?.render();
        }
      })
    );
  }
  // The monitor rows feed the target picker, a non-connected target's queue,
  // the `저장소` tab and the model-list note, and they may land after the
  // window opened. A push redraws the frame and the target-bound pane; a
  // server-wide tab keeps its sections and only the model-list note follows.
  if (options.subscribeMonitorRows) {
    unsubscribers.push(
      options.subscribeMonitorRows(() => {
        if (!is_open) {
          return;
        }
        renderShell();
        if (SERVER_TABS.some((tab) => tab.id === active_tab)) {
          model_section?.render();
        } else {
          mountActiveHost();
        }
      })
    );
  }
  // The connected target's panes read the queue snapshot, and the
  // `프리셋·모델` tab's model-list note falls back to it.
  if (options.queueStore?.subscribe) {
    unsubscribers.push(
      options.queueStore.subscribe(() => {
        if (!is_open) {
          return;
        }
        model_section?.render();
        if (targetIsConnected()) {
          execution_pane?.render();
          repo_pane?.render();
        }
      })
    );
  }

  /**
   * Open the window on one rail tab and one target. An id the rail does not
   * carry opens `실행`. `scope: 'monitor'` targets several repositories,
   * `scope: 'repo'` that one repository, anything else the connected one.
   *
   * @param {string} [tab_id]
   * @param {{ scope?: 'monitor'|'repo', root_dir?: string }} [open_options]
   */
  function open(tab_id = 'execution', open_options = {}) {
    if (is_open) {
      return;
    }
    is_open = true;
    execution_subtab = 'worker';
    const repo =
      open_options.scope === 'repo' &&
      typeof open_options.root_dir === 'string' &&
      open_options.root_dir.length > 0
        ? open_options.root_dir
        : null;
    target_mode = open_options.scope === 'monitor' ? 'multi' : 'single';
    target_root = repo;
    destroyTargetPanes();
    destroyServerSections();
    options.onOpenChange?.(true);
    active_tab = SETTINGS_TABS.some((tab) => tab.id === tab_id)
      ? tab_id
      : 'execution';
    doRender();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    if (target_mode === 'single') {
      void ensureExecutionPane().load();
    }
  }

  function close() {
    if (!is_open) {
      return;
    }
    is_open = false;
    destroyTargetPanes();
    destroyServerSections();
    options.onOpenChange?.(false);
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }

  return {
    open,
    close,
    /**
     * The repository a monitor repo strip ⚙ or the picker bound the window
     * to, or `null` (closed, several repositories, or the connected workspace
     * the header ⚙ opened). The deck reads it to toggle its own `⚙` and to
     * close the window when that repo leaves the list.
     *
     * @returns {string|null}
     */
    repoRoot: () => (is_open && target_mode === 'single' ? target_root : null),
    /** Test/inspection seam: the draft the dialog would save. */
    sessionDraft: () => execution_pane?.sessionDraft() ?? {},
    destroy() {
      is_open = false;
      dialog.removeEventListener('close', onDialogClose);
      dialog.removeEventListener('cancel', onDialogClose);
      dialog.removeEventListener('click', onBackdropClick);
      for (const unsubscribe of unsubscribers.splice(0)) {
        unsubscribe();
      }
      destroyTargetPanes();
      destroyServerSections();
      dialog.remove();
    }
  };
}

/**
 * Whether a label survives the policy's three rule levels.
 *
 * @param {string} label
 * @param {DisplayPolicy} policy
 * @returns {boolean}
 */
function labelIsVisible(label, policy) {
  if (policy.visible_labels.includes(label)) {
    return true;
  }
  if (policy.hidden_labels.includes(label)) {
    return false;
  }
  return !policy.hidden_prefixes.some(
    (prefix) => prefix.length > 0 && label.startsWith(prefix)
  );
}

/**
 * The idempotent patch that puts `label` into a DESIRED visibility.
 *
 * @param {string} label
 * @param {DisplayPolicy} policy
 * @param {boolean} desired_visible
 * @returns {{ hidden_labels?: string[], visible_labels?: string[] }}
 */
function labelPatch(label, policy, desired_visible) {
  if (!desired_visible) {
    return {
      hidden_labels: policy.hidden_labels.includes(label)
        ? policy.hidden_labels
        : [...policy.hidden_labels, label],
      visible_labels: policy.visible_labels.filter((it) => it !== label)
    };
  }
  const hidden_labels = policy.hidden_labels.filter((it) => it !== label);
  const still_hidden = policy.hidden_prefixes.some(
    (prefix) => prefix.length > 0 && label.startsWith(prefix)
  );
  if (!still_hidden) {
    return { hidden_labels };
  }
  return {
    hidden_labels,
    visible_labels: policy.visible_labels.includes(label)
      ? policy.visible_labels
      : [...policy.visible_labels, label]
  };
}
