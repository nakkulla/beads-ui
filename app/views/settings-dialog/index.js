/**
 * The unified settings dialog — the ONE entry point behind the nav-bar ⚙
 * (spec §D).
 *
 * The `실행` tab is NOT built here: it is `createExecutionPane`, mounted into
 * this dialog's tab body and into the monitor deck's per-repo `⚙` panel from
 * the same module (UI-eey2 §4.4). This dialog binds it to the CONNECTED
 * workspace (`root_dir: null`), so its wire format is unchanged.
 * - `표시` edits the per-workspace label/chip display policy.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../utils/label-policy.js').DisplayPolicy} DisplayPolicy
 */
import { html, render } from 'lit-html';
import { showToast } from '../../utils/toast.js';
import { chipsSection, labelsSection, prefixesSection } from './display-tab.js';
import { createExecutionPane } from './execution-pane.js';

/** The rail's tabs, in display order. */
export const SETTINGS_TABS = [
  { id: 'execution', label: '실행', glyph: '◆' },
  { id: 'display', label: '표시', glyph: '◫' }
];

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
 *   onOpenChange?: (open: boolean) => void
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

  let active_tab = 'execution';
  let is_open = false;
  let prefix_draft = '';

  /** @type {ReturnType<typeof createExecutionPane>|null} */
  let execution_pane = null;

  /**
   * Attach the shared `실행` pane to the tab body once the dialog's own render
   * has created it. The body holds no bindings of its own, so lit never
   * re-creates it and the pane's DOM survives every dialog re-render.
   */
  function ensureExecutionPane() {
    if (execution_pane) {
      return execution_pane;
    }
    const host = /** @type {HTMLElement|null} */ (
      dialog.querySelector('[data-pane="execution"]')
    );
    if (!host) {
      return null;
    }
    execution_pane = createExecutionPane(host, {
      root_dir: null,
      queue: () => options.queueStore?.get() ?? null,
      transport,
      implPresetStore: options.implPresetStore,
      notify,
      onQueueAdopt: (queue) => options.queueStore?.set?.(queue)
    });
    return execution_pane;
  }

  /**
   * @returns {TemplateResult}
   */
  function executionPaneSection() {
    return html`
      <section
        class=${`settings-dialog__pane${active_tab === 'execution' ? ' settings-dialog__pane--active' : ''}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        <div class="settings-dialog__pane-body" data-pane="execution"></div>
      </section>
    `;
  }

  /**
   * @returns {TemplateResult}
   */
  function displayPane() {
    const policy = policyStore.get();
    return html`
      <section
        class=${`settings-dialog__pane${active_tab === 'display' ? ' settings-dialog__pane--active' : ''}`}
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

  function doRender() {
    render(
      html`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${SETTINGS_TABS.map(
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
          <div class="settings-dialog__panes">
            ${executionPaneSection()} ${displayPane()}
          </div>
        </div>
      `,
      dialog
    );
    ensureExecutionPane();
  }

  /** @param {string} tab_id */
  function selectTab(tab_id) {
    active_tab = tab_id;
    doRender();
  }

  const onDialogClose = () => {
    is_open = false;
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
      }
    });
  }

  function open(tab_id = 'execution') {
    if (is_open) {
      return;
    }
    is_open = true;
    options.onOpenChange?.(true);
    active_tab = tab_id;
    prefix_draft = '';
    doRender();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    void ensureExecutionPane()?.load();
  }

  function close() {
    if (!is_open) {
      return;
    }
    is_open = false;
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
