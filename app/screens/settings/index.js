/**
 * The settings screen (UI-dbn6 §3.7): one native `<dialog>` in two modes.
 *
 * - 레포 mode — the 레포 scope ⚙, a repo-strip cell's ⚙ and the detail's
 *   `프리셋 바꾸기`: the `워커`·`quick fix`·`세션`·`계정` tabs of ONE repo.
 *   Opened without a scope the same tabs bind the connected workspace (no
 *   `root_dir` on the wire).
 * - 일괄 mode — the 전체 scope ⚙ (`{ scope: 'monitor' }`): the same four
 *   tabs over the repos ticked in the pane's `적용 대상` list, plus `전역`
 *   (judgement-chip preset bindings, the active-model checks and the
 *   registered repositories — all server-global).
 *
 * The four execution tabs are NOT built here: they are the sections of
 * `createExecutionPane` (레포) and `createBulkPane` (일괄), mounted ONCE per
 * open and asked for one section at a time. Only the ACTIVE tab is in the DOM;
 * the pane's own host element moves between the tabs' bodies so its state
 * machine survives a tab switch. There is no label display tab (spec §3.7).
 *
 * From 720px the dialog is a centred panel with a vertical rail; below it the
 * dialog is a full-screen sheet and the rail becomes a horizontal tab strip
 * (`settings.css`).
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */
import { html } from 'lit-html';
import { render } from '../../ui/render.js';
import { showToast } from '../../ui/toast.js';
import { createBulkPane } from './bulk-pane.js';
import { createChipBindingsTab } from './chip-bindings-tab.js';
import { createExecutionPane } from './execution-pane.js';
import { createModelVisibilitySection } from './model-visibility-section.js';
import { createWorkspaceListSection } from './workspace-list.js';

/**
 * The rail's tabs, in display order. `quick fix` carries `◈` — the same
 * diamond family as `워커`'s `◆`, because it IS that profile's route-scoped
 * twin, and distinct from every other glyph on the rail (UI-uohc §6.1).
 */
export const SETTINGS_TABS = [
  { id: 'worker', label: '워커', glyph: '◆' },
  { id: 'quick_fix', label: 'quick fix', glyph: '◈' },
  { id: 'session', label: '세션', glyph: '◇' },
  { id: 'account', label: '계정', glyph: '◎' }
];

/** The 레포 mode tabs — the four execution sections. */
export const REPO_SETTINGS_TABS = SETTINGS_TABS;

/**
 * 일괄 모드(전체 범위 `⚙`)만 다섯 번째 탭 `전역`을 갖는다 (UI-wg68 §6,
 * UI-ooc0 §5). 판정 칩 프리셋·활성 모델·저장소 목록은 서버 전역이라 `적용
 * 대상` 저장소 선택과 무관하고, 그래서 저장소 하나를 편집하는 레포 창에는
 * 없다 — 두 배열이 갈라지는 유일한 이유다. `⬡`는 `quick fix`의 `◈`와 겹치지
 * 않는 글리프다.
 */
export const BULK_SETTINGS_TABS = [
  ...REPO_SETTINGS_TABS,
  { id: 'global', label: '전역', glyph: '⬡' }
];

/** Bulk-mode pane heading shared by every tab. */
/** `history.state` mark of the entry an open settings window pushed. */
const HISTORY_MARK = 'settings';

const BULK_TITLE = '여러 저장소 설정';

/** Bulk-mode one-line subtitle per tab. */
const BULK_TAB_SUB = {
  worker:
    '선택한 저장소의 현재 실행 프로필을 읽어 세웁니다. 프리셋을 고르면 17행이 그 값으로 채워집니다.',
  quick_fix:
    '선택한 저장소의 quick fix 값을 읽어 세웁니다. 프리셋을 고르면 8행이 그 값으로 채워집니다.',
  session: '선택한 저장소의 대화형 세션 값을 읽어 세웁니다.',
  account: '선택한 저장소의 실행 계정과 한도 대응을 읽어 세웁니다.',
  global:
    '모든 저장소에 공통인 서버 전역 설정입니다. 적용 대상 저장소와 무관합니다.'
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
 * @typedef {Object} SettingsWorkspaces
 * @property {() => { available: Array<{ path: string }>, hidden: string[], connected: string|null }} list
 * @property {() => Promise<void>} [refresh] - `list-workspaces` again.
 * @property {(path: string, visible: boolean) => Promise<void>} [setVisible]
 * @property {(root_dir: string) => Promise<void>} [gitPull] - The connected repo's `git-pull-workspace`.
 */

/**
 * Create the settings dialog (native `<dialog>`).
 *
 * @param {HTMLElement} mount_element
 * @param {{
 *   transport: (type: import('../../protocol.js').MessageType, payload?: unknown) => Promise<any>,
 *   queueStore?: { get: () => any, set?: (queue: any) => void },
 *   implPresetStore?: { get: () => any, subscribe?: (fn: () => void) => () => void },
 *   modelVisibilityStore?: { get: () => any, set?: (state: any) => void, subscribe?: (fn: () => void) => () => void },
 *   notify?: (message: string) => void,
 *   onOpenChange?: (open: boolean) => void,
 *   monitorRows?: () => Array<Record<string, any>>,
 *   subscribeMonitorRows?: (fn: () => void) => () => void,
 *   onBulkApplied?: (root_dirs: string[]) => void,
 *   workspaces?: SettingsWorkspaces
 * }} options
 */
export function createSettingsDialog(mount_element, options) {
  const { transport } = options;
  const notify =
    options.notify || ((message) => showToast(message, 'error', 4000));

  const dialog = /** @type {HTMLDialogElement} */ (
    document.createElement('dialog')
  );
  dialog.id = 'settings-dialog';
  dialog.className = 'settings-dialog st-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', '설정');
  mount_element.appendChild(dialog);

  let active_tab = 'worker';
  let is_open = false;
  let pulling = false;
  /**
   * `'monitor'` = 일괄 mode, `'repo'` = ONE repo, `'single'` = the connected
   * workspace; fixed from `open` until close.
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
  /** @type {ReturnType<typeof createModelVisibilitySection>|null} */
  let model_section = null;
  /** @type {ReturnType<typeof createWorkspaceListSection>|null} */
  let workspace_section = null;
  /**
   * The `전역` 탭's own host — 서버 전역 값이라 일괄 pane과 섞지 않는다 (§6).
   * It holds three groups: the chip bindings under their own title, the
   * model-visibility section and the registered repositories, each drawn into
   * its own child host.
   */
  const global_host = document.createElement('div');
  global_host.className = 'settings-dialog__pane-host';
  const chip_group = document.createElement('section');
  chip_group.className = 'settings-dialog__group';
  const chip_title = document.createElement('div');
  chip_title.className = 'settings-dialog__group-title';
  chip_title.textContent = '판정 칩 프리셋';
  const chip_host = document.createElement('div');
  chip_group.append(chip_title, chip_host);
  const model_host = document.createElement('div');
  const workspace_host = document.createElement('div');
  global_host.append(chip_group, model_host, workspace_host);

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
   * Attach the shared execution pane to the tab body once the dialog's own
   * render has created it. The body holds no bindings of its own, so lit
   * never re-creates it and the pane's DOM survives every dialog re-render.
   */
  function ensureExecutionPane() {
    if (execution_pane) {
      return execution_pane;
    }
    // `scope: 'repo'` binds the SAME pane to one monitor repo instead of the
    // connected workspace; its queue is that repo's monitor row, laid over by
    // whatever a mutation response adopts (UI-e1ta §7).
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
      modelVisibilityStore: options.modelVisibilityStore,
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
   * The repo the 레포 window edits when it is also the connected one — the
   * only repo `git-pull-workspace` can pull (the op reads the connection).
   *
   * @returns {string|null}
   */
  function pullableRepo() {
    const connected = options.workspaces?.list().connected ?? null;
    if (!connected || !options.workspaces?.gitPull) {
      return null;
    }
    if (scope === 'repo') {
      return repo_root_dir === connected ? connected : null;
    }
    return scope === 'single' ? connected : null;
  }

  function onGitPull() {
    const root_dir = pullableRepo();
    if (!root_dir || pulling || !options.workspaces?.gitPull) {
      return;
    }
    pulling = true;
    doRender();
    void options.workspaces.gitPull(root_dir).finally(() => {
      pulling = false;
      if (is_open) {
        doRender();
      }
    });
  }

  /**
   * The pane head: title and, on the connected repo, `↻ git pull`.
   *
   * @param {string} title
   * @returns {TemplateResult}
   */
  function paneHead(title) {
    const pullable = pullableRepo();
    return html`<header class="settings-dialog__pane-head">
      <h2>${title}</h2>
      ${pullable
        ? html`<button
            type="button"
            class="ui-btn ui-btn--ghost ui-btn--sm settings-dialog__pull"
            data-settings-git-pull
            ?disabled=${pulling}
            title="이 저장소에서 git pull --rebase (필요하면 stash)"
            @click=${onGitPull}
          >
            ↻ git pull
          </button>`
        : ''}
    </header>`;
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
        ${paneHead(title)}
        <p class="settings-dialog__pane-sub">${copy.sub}</p>
        <div class="settings-dialog__pane-body" data-pane="execution"></div>
      </section>
    `;
  }

  /**
   * Move the pane's host into the active tab's body and ask the pane for that
   * tab's section.
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
   * The bulk mode's pane: one heading for every tab and an empty body slot the
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
        ${paneHead(BULK_TITLE)}
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
    if (active_tab === 'global') {
      bulk_host.remove();
      if (global_host.parentElement !== slot) {
        slot.appendChild(global_host);
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
      if (!model_section) {
        model_section = createModelVisibilitySection(model_host, {
          transport,
          modelVisibilityStore: options.modelVisibilityStore
        });
      }
      model_section.render();
      if (!workspace_section && options.workspaces) {
        workspace_section = createWorkspaceListSection(
          workspace_host,
          options.workspaces
        );
        void options.workspaces.refresh?.().then(() => {
          workspace_section?.render();
        });
      }
      workspace_section?.render();
      return;
    }
    global_host.remove();
    if (bulk_host.parentElement !== slot) {
      slot.appendChild(bulk_host);
    }
    if (!bulk_pane) {
      bulk_pane = createBulkPane(bulk_host, {
        transport,
        rows: () => options.monitorRows?.() ?? [],
        subscribeRows: options.subscribeMonitorRows,
        implPresetStore: options.implPresetStore,
        modelVisibilityStore: options.modelVisibilityStore,
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
    model_section?.destroy();
    model_section = null;
    workspace_section?.destroy();
    workspace_section = null;
    global_host.remove();
  }

  /**
   * The rail this scope carries.
   *
   * @returns {Array<{ id: string, label: string, glyph: string }>}
   */
  function tabsForScope() {
    return scope === 'monitor' ? BULK_SETTINGS_TABS : REPO_SETTINGS_TABS;
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
            aria-label="설정"
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
              class="ui-btn ui-btn--icon settings-dialog__close"
              aria-label="닫기"
              title="닫기"
              @click=${close}
            >
              ✕
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${scope === 'monitor' ? bulkPaneSection() : executionPaneSection()}
          </div>
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

  /** Whether the open window pushed a history entry not yet popped. */
  let pushed = false;

  /**
   * @param {unknown} state
   * @returns {boolean}
   */
  const isOwnEntry = (state) =>
    Boolean(state) &&
    typeof state === 'object' &&
    /** @type {any} */ (state).bdui_overlay === HISTORY_MARK;

  /** A close from the window itself takes back the entry its open pushed. */
  const releaseHistory = () => {
    if (!pushed) {
      return;
    }
    pushed = false;
    if (isOwnEntry(window.history.state)) {
      window.history.back();
    }
  };

  // Back navigation closes the window like the transcript sheet (§3.6).
  const onPopState = () => {
    if (is_open && !isOwnEntry(window.history.state)) {
      pushed = false;
      close();
    }
  };
  window.addEventListener('popstate', onPopState);

  const onDialogClose = () => {
    is_open = false;
    releaseHistory();
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

  /** @type {null | (() => void)} */
  let unsubscribe_model_visibility = null;
  if (options.modelVisibilityStore?.subscribe) {
    unsubscribe_model_visibility = options.modelVisibilityStore.subscribe(
      () => {
        if (is_open) {
          execution_pane?.render();
          bulk_pane?.render();
        }
      }
    );
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
    // A bulk pane is per open: its selection and form start fresh each time.
    destroyBulkPane();
    doRender();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    if (!pushed) {
      window.history.pushState({ bdui_overlay: HISTORY_MARK }, '');
      pushed = true;
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
    releaseHistory();
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
     * Which repo the window is bound to right now, or `null`. The repo strip
     * reads it to close the window when that repo leaves the list (§7).
     *
     * @returns {string|null}
     */
    repoRoot: () => (is_open && scope === 'repo' ? repo_root_dir : null),
    /** @returns {boolean} */
    isOpen: () => is_open,
    /** Test/inspection seam: the draft the dialog would save. */
    sessionDraft: () => execution_pane?.sessionDraft() ?? {},
    destroy() {
      is_open = false;
      window.removeEventListener('popstate', onPopState);
      dialog.removeEventListener('close', onDialogClose);
      dialog.removeEventListener('cancel', onDialogClose);
      dialog.removeEventListener('click', onBackdropClick);
      if (unsubscribe_presets) {
        unsubscribe_presets();
        unsubscribe_presets = null;
      }
      if (unsubscribe_model_visibility) {
        unsubscribe_model_visibility();
        unsubscribe_model_visibility = null;
      }
      execution_pane?.destroy();
      execution_pane = null;
      destroyBulkPane();
      dialog.remove();
    }
  };
}
