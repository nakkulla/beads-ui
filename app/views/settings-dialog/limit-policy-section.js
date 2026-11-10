/**
 * The settings dialog `활성 계정` tab's active-login auto-switch groups (UI-giog §4.5,
 * UI-32oq §4.1).
 *
 * One group per runner, rows in this order: `자동 전환` (`켬 / 끔`) with its
 * one-line guidance, `default 계정` (the account a departure starts from and a
 * return goes back to; it need not be a target), then `전환 허용 계정` and
 * `선제 전환` drawn by the same editor as the repo `계정` tab, without its
 * mode row. While the switch is off the editor rows are dimmed but stay
 * editable. None of these values reaches a repo's Worker.
 *
 * Values come from the `limit-policy-settings` channel and are written with
 * one `limit-policy-settings-set` per click (revision CAS; a conflict adopts
 * the latest snapshot and re-sends the same patch once, since a patch merges).
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../data/limit-policy-settings-store.js').LimitPolicySettingsState} LimitPolicySettingsState
 * @typedef {'claude'|'codex'} LimitRunner
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { isLimitPolicySnapshot } from '../../data/limit-policy-settings-store.js';
import { errorText } from '../../utils/error-text.js';
import { accountRowLabel, loadAccountCatalog } from './account-catalog.js';
import { createLimitPolicyEditor } from './limit-policy-editor.js';

/** The guidance line under each `자동 전환` row. */
export const ACTIVE_SWITCH_GUIDE =
  '켜면 활성 로그인이 기준에 닿을 때 아래 계정으로 옮기고, default 계정에서 떠났으면 default가 리셋된 뒤 돌아옵니다 · 저장소 Worker는 각 저장소의 한도 대응을 따릅니다';

/** Select value for an unset default account. */
const NO_DEFAULT = '';

/** @type {ReadonlyArray<[LimitRunner, string]>} */
const RUNNERS = [
  ['claude', 'Claude'],
  ['codex', 'Codex']
];

/**
 * Mount the groups into `host`.
 *
 * @param {HTMLElement} host
 * @param {{
 *   transport: (type: any, payload?: unknown) => Promise<any>,
 *   limitPolicySettingsStore?: { get: () => LimitPolicySettingsState|null, set?: (state: LimitPolicySettingsState|null) => void, subscribe?: (fn: () => void) => () => void },
 *   loadCatalog?: () => Promise<{ claude: { accounts: any[] }|null, codex: { accounts: any[] }|null }>,
 *   toast?: (message: string, kind?: string) => void
 * }} options
 * @returns {{ render: () => void, destroy: () => void }}
 */
export function createLimitPolicySection(host, options) {
  let destroyed = false;
  /** @type {{ claude: { accounts: any[] }|null, codex: { accounts: any[] }|null }} */
  let catalog = { claude: null, codex: null };
  /** One write at a time, in click order, across both runners. */
  /** @type {Promise<void>} */
  let save_chain = Promise.resolve();
  /** @type {(() => void)|null} */
  let unsubscribe = null;

  if (options.limitPolicySettingsStore?.subscribe) {
    unsubscribe = options.limitPolicySettingsStore.subscribe(() => doRender());
  }

  /** @returns {LimitPolicySettingsState|null} */
  function snapshot() {
    const state = options.limitPolicySettingsStore?.get() ?? null;
    return isLimitPolicySnapshot(state) ? state : null;
  }

  /**
   * Adopt a server snapshot into the shared store.
   *
   * @param {unknown} next
   */
  function adopt(next) {
    if (isLimitPolicySnapshot(next)) {
      options.limitPolicySettingsStore?.set?.(next);
    }
  }

  /**
   * Send one runner patch against the current revision, re-sending once on a
   * conflict.
   *
   * @param {LimitRunner} runner
   * @param {Record<string, unknown>} patch
   */
  async function send(runner, patch) {
    for (let round = 0; round < 2; round += 1) {
      const state = snapshot();
      if (!state) {
        return;
      }
      const res = await options.transport('limit-policy-settings-set', {
        expected_revision: state.revision,
        runners: { [runner]: patch }
      });
      adopt(res?.snapshot);
      if (res?.ok !== false) {
        return;
      }
      if (res.code !== 'conflict') {
        options.toast?.(
          `한도 대응 저장 실패: ${res.message ?? res.code}`,
          'error'
        );
        return;
      }
    }
    options.toast?.('한도 대응 저장 실패: 다른 곳과 충돌했습니다', 'error');
  }

  /**
   * Queue one runner patch behind the writes already in flight.
   *
   * @param {LimitRunner} runner
   * @param {Record<string, unknown>} patch
   * @returns {Promise<void>}
   */
  function save(runner, patch) {
    save_chain = save_chain.then(async () => {
      try {
        await send(runner, patch);
      } catch (err) {
        adopt(/** @type {any} */ (err)?.details?.snapshot);
        options.toast?.(`한도 대응 저장 실패: ${errorText(err)}`, 'error');
      }
      doRender();
    });
    return save_chain;
  }

  const editor = createLimitPolicyEditor({
    policyOf: (runner) => snapshot()?.runners[runner] ?? null,
    save,
    catalogOf: (runner) => catalog[runner],
    render: () => doRender()
  });

  /**
   * @param {LimitRunner} runner
   * @param {boolean} on
   */
  function onAutoSwitchChange(runner, on) {
    if (snapshot()?.runners[runner]?.auto_switch === on) {
      return;
    }
    void save(runner, { auto_switch: on });
  }

  /**
   * @param {LimitRunner} runner
   * @param {string} value - A catalog key, or `NO_DEFAULT`.
   */
  function onDefaultChange(runner, value) {
    const next = value === NO_DEFAULT ? null : value;
    if ((snapshot()?.runners[runner]?.default_account ?? null) === next) {
      return;
    }
    void save(runner, { default_account: next });
  }

  /**
   * The `default 계정` select: unset, then every catalog account, then a
   * stored default the catalog no longer lists.
   *
   * @param {LimitRunner} runner
   * @param {string} label
   * @param {string|null} current
   * @returns {TemplateResult}
   */
  function defaultSelect(runner, label, current) {
    const rows = catalog[runner]?.accounts ?? [];
    const listed = rows.some((/** @type {any} */ row) => row.key === current);
    return html`<select
      class="ui-select ui-select--bare"
      aria-label=${`${label} default 계정`}
      data-limit-default=${runner}
      .value=${live(current ?? NO_DEFAULT)}
      @change=${(/** @type {Event} */ ev) =>
        onDefaultChange(
          runner,
          String(/** @type {HTMLSelectElement} */ (ev.target).value)
        )}
    >
      <option value=${NO_DEFAULT} ?selected=${current === null}>비움</option>
      ${rows.map(
        (/** @type {any} */ row) =>
          html`<option value=${row.key} ?selected=${row.key === current}>
            ${accountRowLabel(runner, row)}
          </option>`
      )}
      ${current !== null && !listed
        ? html`<option value=${current} selected>
            ${`${current} (목록에 없음)`}
          </option>`
        : ''}
    </select>`;
  }

  /**
   * @param {LimitPolicySettingsState} state
   * @param {LimitRunner} runner
   * @param {string} label
   * @returns {TemplateResult}
   */
  function runnerGroup(state, runner, label) {
    const entry = state.runners[runner];
    const on = entry.auto_switch === true;
    /** @type {Array<[boolean, string]>} */
    const choices = [
      [true, '켬'],
      [false, '끔']
    ];
    return html`<section
      class="settings-dialog__group"
      data-limit-global=${runner}
    >
      <div class="settings-dialog__group-title">
        ${label} 활성 계정 자동 전환
      </div>
      <div class="settings-dialog__row" data-limit-auto-row=${runner}>
        <span class="settings-dialog__row-label">자동 전환</span>
        <span class="settings-dialog__controls">
          <span
            class="settings-dialog__seg"
            role="group"
            aria-label=${`${label} 활성 계정 자동 전환`}
            data-limit-auto-runner=${runner}
          >
            ${choices.map(
              ([value, text]) =>
                html`<button
                  type="button"
                  class=${on === value ? 'op-btn is-active' : 'op-btn'}
                  data-limit-auto=${value ? 'on' : 'off'}
                  aria-pressed=${String(on === value)}
                  @click=${() => onAutoSwitchChange(runner, value)}
                >
                  ${text}
                </button>`
            )}
          </span>
        </span>
      </div>
      <p class="settings-dialog__hint-block" data-limit-auto-guide=${runner}>
        ${ACTIVE_SWITCH_GUIDE}
      </p>
      <div class="settings-dialog__row" data-limit-default-row=${runner}>
        <span class="settings-dialog__row-label">default 계정</span>
        <span class="settings-dialog__controls">
          ${defaultSelect(runner, label, entry.default_account ?? null)}
        </span>
      </div>
      ${editor.template(runner, label, { mode_label: null, dim: !on })}
    </section>`;
  }

  function doRender() {
    if (destroyed) {
      return;
    }
    const state = snapshot();
    if (!state) {
      render(html``, host);
      return;
    }
    render(
      html`<div data-group="limit-policy">
        ${RUNNERS.map(([runner, label]) => runnerGroup(state, runner, label))}
      </div>`,
      host
    );
  }

  void (options.loadCatalog ?? loadAccountCatalog)().then((loaded) => {
    if (destroyed) {
      return;
    }
    catalog = loaded;
    doRender();
  });

  return {
    render: doRender,
    destroy() {
      destroyed = true;
      unsubscribe?.();
      unsubscribe = null;
    }
  };
}
