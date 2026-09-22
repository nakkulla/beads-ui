/**
 * The unified settings dialog — the ONE entry point behind the nav-bar ⚙
 * (spec §D).
 *
 * The `워커`·`quick fix`·`세션`·`계정` tabs are NOT built here: they are the four
 * sections of `createExecutionPane`, which this dialog mounts ONCE and asks for one
 * section at a time (`render(section)`). The monitor deck's per-repo `⚙` panel
 * mounts the same module (UI-eey2 §4.4). This dialog binds it to the CONNECTED
 * workspace (`root_dir: null`), so its wire format is unchanged.
 * - `표시` edits the per-workspace label/chip display policy.
 *
 * Only the ACTIVE tab is in the DOM (UI-7yh2 §3.1); the pane's own host element
 * moves between the execution tabs' bodies so the state machine survives a tab
 * switch.
 *
 * Opened with `{ scope: 'monitor' }` (the header ⚙ on the monitor tab) the
 * dialog is in bulk mode (UI-nu43 §3.1): the rail drops `표시`,
 * the execution pane is never created, and `createBulkPane` edits the repos
 * ticked in its own target list instead of the connected workspace. The mode
 * is fixed from `open` until the dialog closes.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../utils/label-policy.js').DisplayPolicy} DisplayPolicy
 */
import { html, render } from 'lit-html';
import { showToast } from '../../utils/toast.js';
import { createBulkPane } from './bulk-pane.js';
import { createChipBindingsTab } from './chip-bindings-tab.js';
import { chipsSection, labelsSection, prefixesSection } from './display-tab.js';
import { createExecutionPane } from './execution-pane.js';

/**
 * The rail's tabs, in display order. `quick fix` carries `◈` — the same
 * diamond family as `워커`'s `◆`, because it IS that profile's route-scoped
 * twin, and distinct from every other glyph on the rail (UI-uohc §6.1).
 */
export const SETTINGS_TABS = [
  { id: 'worker', label: '워커', glyph: '◆' },
  { id: 'quick_fix', label: 'quick fix', glyph: '◈' },
  { id: 'session', label: '세션', glyph: '◇' },
  { id: 'account', label: '계정', glyph: '◎' },
  { id: 'display', label: '표시', glyph: '◫' }
];

/**
 * The tabs of the two monitor-tab modes, in display order. `표시` is a
 * workspace-global policy, so it stays on the connected-workspace window
 * (UI-e1ta §5, §7).
 */
export const REPO_SETTINGS_TABS = SETTINGS_TABS.filter(
  (tab) => tab.id !== 'display'
);

/**
 * 일괄 모드(모니터 탭 헤더 `⚙`)만 다섯 번째 탭 `칩`을 갖는다 (UI-wg68 §6). 그
 * 값은 서버 전역이라 `적용 대상` 저장소 선택과 무관하고, 그래서 저장소 하나를
 * 편집하는 전체 설정 창·레포 카드 창에는 없다 — 두 배열이 갈라지는 유일한
 * 이유다. `⬡`는 `quick fix`의 `◈`와 겹치지 않는 글리프다.
 */
export const BULK_SETTINGS_TABS = [
  ...REPO_SETTINGS_TABS,
  { id: 'chips', label: '칩', glyph: '⬡' }
];

/** Bulk-mode pane heading shared by both tabs. */
const BULK_TITLE = '여러 저장소 설정';

/** Bulk-mode one-line subtitle per tab. */
const BULK_TAB_SUB = {
  worker:
    '선택한 저장소의 현재 실행 프로필을 읽어 세웁니다. 프리셋을 고르면 17행이 그 값으로 채워집니다.',
  quick_fix:
    '선택한 저장소의 quick fix 값을 읽어 세웁니다. 프리셋을 고르면 8행이 그 값으로 채워집니다.',
  session: '선택한 저장소의 대화형 세션 값을 읽어 세웁니다.',
  account: '선택한 저장소의 실행 계정과 한도 대응을 읽어 세웁니다.',
  chips:
    '판정 칩에 맬 프리셋입니다. 서버 전역이라 적용 대상 저장소와 무관합니다.'
};

/** Tabs the shared execution pane draws, by its own section ids. */
const EXECUTION_TABS = ['worker', 'quick_fix', 'session', 'account'];

/** Per-tab pane heading and one-line subtitle. */
const TAB_COPY = {
  worker: {
    title: '워커 설정',
    sub: 'Worker와 대화형 세션이 함께 쓰는 실행 프로파일입니다.'
  },
  quick_fix: {
    title: 'quick fix 설정',
    sub: 'route가 quick fix인 Bead만 읽는 실행 값입니다.'
  },
  session: {
    title: '세션 설정',
    sub: '대화형 세션만 읽는 값입니다.'
  },
  account: {
    title: '계정 설정',
    sub: '이 저장소의 실행 계정과 한도 대응 정책입니다.'
  }
};

/**
 * Create the unified settings dialog (native `<dialog>`).
 *
 * @param {HTMLElement} mount_element
 * @param {{
 *   transport: (type: import('../../protocol.js').MessageType, payload?: unknown) => Promise<any>,
 *   policyStore: { get: () => DisplayPolicy|null, set: (p: DisplayPolicy|null) => void, subscribe?: (fn: () => void) => () => void },
 *   queueStore?: { get: () => any, set?: (queue: any) => void },
 *   implPresetStore?: { get: () => any, subscribe?: (fn: () => void) => () => void },
 *   labelOptions: () => string[],
 *   notify?: (message: string) => void,
 *   onOpenChange?: (open: boolean) => void,
 *   monitorRows?: () => Array<Record<string, any>>,
 *   subscribeMonitorRows?: (fn: () => void) => () => void,
 *   onBulkApplied?: (root_dirs: string[]) => void
 * }} options
 */
export function createSettingsDialog(mount_element, options) {
  const { transport, policyStore, labelOptions } = options;
  const notify =
    options.notify || ((message) => showToast(message, 'error', 4000));

  const dialog = /** @type {HTMLDialogElement} */ (
    document.createElement('dialog')
  );
  dialog.id = 'settings-dialog';
  dialog.className = 'settings-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', '설정');
  mount_element.appendChild(dialog);

  let active_tab = 'worker';
  let is_open = false;
  let prefix_draft = '';
  /**
   * `'monitor'` = bulk mode, `'repo'` = ONE monitor repo (UI-e1ta §7); fixed
   * from `open` until close.
   *
   * @type {'single'|'monitor'|'repo'}
   */
  let scope = 'single';
  /** The repo `scope: 'repo'` is bound to. */
  /** @type {string|null} */
  let repo_root_dir = null;
  /** The adopted queue for the repo-scoped pane; newer than the monitor row. */
  /** @type {any} */
  let repo_queue = null;

  /** @type {ReturnType<typeof createBulkPane>|null} */
  let bulk_pane = null;
  /** The bulk pane's own host, re-parented like {@link pane_host}. */
  const bulk_host = document.createElement('div');
  bulk_host.className = 'settings-dialog__pane-host';

  /** @type {ReturnType<typeof createChipBindingsTab>|null} */
  let chip_tab = null;
  /** The `칩` 탭's own host — 서버 전역 값이라 일괄 pane과 섞지 않는다 (§6). */
  const chip_host = document.createElement('div');
  chip_host.className = 'settings-dialog__pane-host';

  /** @type {ReturnType<typeof createExecutionPane>|null} */
  let execution_pane = null;

  /**
   * The pane's own host, created once and re-parented into whichever execution
   * tab is active. lit never owns this element, so moving it keeps the pane's
   * DOM and its state machine intact across a tab switch.
   */
  const pane_host = document.createElement('div');
  pane_host.className = 'settings-dialog__pane-host';

  /**
   * Attach the shared `실행` pane to the tab body once the dialog's own render
   * has created it. The body holds no bindings of its own, so lit never
   * re-creates it and the pane's DOM survives every dialog re-render.
   */
  function ensureExecutionPane() {
    if (execution_pane) {
      return execution_pane;
    }
    // `scope: 'repo'` binds the SAME pane to one monitor repo instead of the
    // connected workspace; its queue is that repo's monitor row, laid over by
    // whatever a mutation response adopts (§7).
    const bound_root = scope === 'repo' ? repo_root_dir : null;
    execution_pane = createExecutionPane(pane_host, {
      root_dir: bound_root,
      queue: () =>
        bound_root === null
          ? (options.queueStore?.get() ?? null)
          : (repo_queue ??
            (options.monitorRows?.() || []).find(
              (row) => row && row.root_dir === bound_root
            ) ??
            null),
      transport,
      implPresetStore: options.implPresetStore,
      notify,
      onQueueAdopt: (queue) => {
        if (bound_root === null) {
          options.queueStore?.set?.(queue);
          return;
        }
        repo_queue = queue;
      }
    });
    return execution_pane;
  }

  /** This window's title: the repo's own name in `scope: 'repo'` (§7). */
  function repoTitle() {
    const row = (options.monitorRows?.() || []).find(
      (entry) => entry && entry.root_dir === repo_root_dir
    );
    const name = row && typeof row.name === 'string' ? row.name : repo_root_dir;
    return `${name} 실행 설정`;
  }

  /**
   * The active execution tab's pane. The body is an empty slot: the pane's own
   * host is appended into it after the render (`mountExecutionHost`).
   *
   * @returns {TemplateResult}
   */
  function executionPaneSection() {
    const copy = /** @type {any} */ (TAB_COPY)[active_tab];
    const title = scope === 'repo' ? repoTitle() : copy.title;
    return html`
      <section
        class="settings-dialog__pane settings-dialog__pane--active"
        role="tabpanel"
        id=${`settings-pane-${active_tab}`}
        aria-label=${title}
      >
        <header class="settings-dialog__pane-head">
          <h2>${title}</h2>
        </header>
        <p class="settings-dialog__pane-sub">${copy.sub}</p>
        <div class="settings-dialog__pane-body" data-pane="execution"></div>
      </section>
    `;
  }

  /**
   * Move the pane's host into the active tab's body and ask the pane for that
   * tab's section. A no-op when the display tab is active.
   */
  function mountExecutionHost() {
    if (!EXECUTION_TABS.includes(active_tab)) {
      return;
    }
    const slot = /** @type {HTMLElement|null} */ (
      dialog.querySelector('[data-pane="execution"]')
    );
    if (!slot) {
      return;
    }
    if (pane_host.parentElement !== slot) {
      slot.appendChild(pane_host);
    }
    ensureExecutionPane()?.render(active_tab);
  }

  /**
   * The bulk mode's pane: one heading for both tabs and an empty body slot the
   * bulk pane's host is appended into (`mountBulkHost`).
   *
   * @returns {TemplateResult}
   */
  function bulkPaneSection() {
    const sub = /** @type {any} */ (BULK_TAB_SUB)[active_tab] || '';
    return html`
      <section
        class="settings-dialog__pane settings-dialog__pane--active"
        role="tabpanel"
        id=${`settings-pane-${active_tab}`}
        aria-label=${BULK_TITLE}
      >
        <header class="settings-dialog__pane-head">
          <h2>${BULK_TITLE}</h2>
        </header>
        <p class="settings-dialog__pane-sub">${sub}</p>
        <div class="settings-dialog__pane-body" data-pane="bulk"></div>
      </section>
    `;
  }

  /** Move the bulk host into the body and draw the active tab. */
  function mountBulkHost() {
    const slot = /** @type {HTMLElement|null} */ (
      dialog.querySelector('[data-pane="bulk"]')
    );
    if (!slot) {
      return;
    }
    if (active_tab === 'chips') {
      bulk_host.remove();
      if (chip_host.parentElement !== slot) {
        slot.appendChild(chip_host);
      }
      if (!chip_tab) {
        chip_tab = createChipBindingsTab(chip_host, {
          transport,
          implPresetStore: options.implPresetStore,
          toast: (message, kind) =>
            showToast(message, /** @type {any} */ (kind))
        });
      }
      chip_tab.render();
      return;
    }
    chip_host.remove();
    if (bulk_host.parentElement !== slot) {
      slot.appendChild(bulk_host);
    }
    if (!bulk_pane) {
      bulk_pane = createBulkPane(bulk_host, {
        transport,
        rows: () => options.monitorRows?.() ?? [],
        subscribeRows: options.subscribeMonitorRows,
        implPresetStore: options.implPresetStore,
        onBulkApplied: (root_dirs) => options.onBulkApplied?.(root_dirs)
      });
    }
    bulk_pane.render(
      /** @type {'worker'|'quick_fix'|'session'|'account'} */ (active_tab)
    );
  }

  function destroyBulkPane() {
    bulk_pane?.destroy();
    bulk_pane = null;
    bulk_host.remove();
    chip_tab?.destroy();
    chip_tab = null;
    chip_host.remove();
  }

  /**
   * @returns {TemplateResult}
   */
  function displayPane() {
    const policy = policyStore.get();
    return html`
      <section
        class="settings-dialog__pane settings-dialog__pane--active"
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${policy
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
            </div>`}
      </section>
    `;
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

  /**
   * The rail this scope carries. Both monitor-tab scopes drop `표시`, which is
   * a workspace-global policy rather than a repo's setting (§7).
   *
   * @returns {Array<{ id: string, label: string, glyph: string }>}
   */
  function tabsForScope() {
    if (scope === 'monitor') {
      return BULK_SETTINGS_TABS;
    }
    return scope === 'repo' ? REPO_SETTINGS_TABS : SETTINGS_TABS;
  }

  /** @returns {TemplateResult} */
  function panesTemplate() {
    if (scope === 'monitor') {
      return bulkPaneSection();
    }
    return active_tab === 'display' ? displayPane() : executionPaneSection();
  }

  function doRender() {
    const tabs = tabsForScope();
    render(
      html`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${tabs.map(
              (tab) =>
                html`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${tab.id}
                  aria-selected=${String(active_tab === tab.id)}
                  aria-controls=${`settings-pane-${tab.id}`}
                  @click=${() => selectTab(tab.id)}
                >
                  <span class="settings-dialog__glyph">${tab.glyph}</span>
                  ${tab.label}
                </button>`
            )}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${close}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">${panesTemplate()}</div>
        </div>
      `,
      dialog
    );
    if (scope === 'monitor') {
      mountBulkHost();
    } else {
      mountExecutionHost();
    }
  }

  /** @param {string} tab_id */
  function selectTab(tab_id) {
    active_tab = tab_id;
    doRender();
  }

  const onDialogClose = () => {
    is_open = false;
    // `cancel` fires while the dialog is still open, and a queued `close` may
    // land after a reopen — only a dialog that is really shut drops its pane.
    if (!dialog.open) {
      destroyBulkPane();
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

  /** @type {null | (() => void)} */
  let unsubscribe_policy = null;
  if (policyStore.subscribe) {
    unsubscribe_policy = policyStore.subscribe(() => {
      if (is_open) {
        doRender();
      }
    });
  }
  /** @type {null | (() => void)} */
  let unsubscribe_presets = null;
  if (options.implPresetStore?.subscribe) {
    unsubscribe_presets = options.implPresetStore.subscribe(() => {
      if (is_open) {
        execution_pane?.render();
        bulk_pane?.render();
        chip_tab?.render();
      }
    });
  }

  /**
   * Open the dialog on one rail tab. An id the rail does not carry opens the
   * default `워커` tab rather than an empty pane. `scope: 'monitor'` opens the
   * bulk mode, which never binds or loads the connected workspace.
   *
   * @param {string} [tab_id]
   * @param {{ scope?: 'monitor'|'repo', root_dir?: string }} [open_options]
   */
  function open(tab_id = 'worker', open_options = {}) {
    if (is_open) {
      return;
    }
    is_open = true;
    if (open_options.scope === 'monitor') {
      scope = 'monitor';
    } else if (
      open_options.scope === 'repo' &&
      typeof open_options.root_dir === 'string' &&
      open_options.root_dir.length > 0
    ) {
      scope = 'repo';
    } else {
      scope = 'single';
    }
    repo_root_dir = scope === 'repo' ? String(open_options.root_dir) : null;
    repo_queue = null;
    // The pane is bound to ONE root_dir at creation, so a scope change needs a
    // new pane rather than a re-render.
    execution_pane?.destroy();
    execution_pane = null;
    options.onOpenChange?.(true);
    const tabs = tabsForScope();
    active_tab = tabs.some((tab) => tab.id === tab_id) ? tab_id : 'worker';
    prefix_draft = '';
    // A bulk pane is per open: its selection and form start fresh each time.
    destroyBulkPane();
    doRender();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    if (scope !== 'monitor') {
      void ensureExecutionPane()?.load();
    }
  }

  function close() {
    if (!is_open) {
      return;
    }
    is_open = false;
    destroyBulkPane();
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
     * Which repo the window is bound to right now, or `null`. The deck reads
     * it to toggle its own `⚙` and to close the window when that repo leaves
     * the list (§7).
     *
     * @returns {string|null}
     */
    repoRoot: () => (is_open && scope === 'repo' ? repo_root_dir : null),
    /** Test/inspection seam: the draft the dialog would save. */
    sessionDraft: () => execution_pane?.sessionDraft() ?? {},
    destroy() {
      is_open = false;
      dialog.removeEventListener('close', onDialogClose);
      dialog.removeEventListener('cancel', onDialogClose);
      dialog.removeEventListener('click', onBackdropClick);
      if (unsubscribe_policy) {
        unsubscribe_policy();
        unsubscribe_policy = null;
      }
      if (unsubscribe_presets) {
        unsubscribe_presets();
        unsubscribe_presets = null;
      }
      execution_pane?.destroy();
      execution_pane = null;
      destroyBulkPane();
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
