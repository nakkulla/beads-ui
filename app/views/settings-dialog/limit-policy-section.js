/**
 * The bulk window `전역` tab's `한도 대응` groups (UI-giog §4.5).
 *
 * One group per runner, rows in this order: `적용 범위` (`저장소별 / 전역`) with
 * its one-line guidance, then `대응 방식`·`전환 허용 계정`·`선제 전환` drawn by
 * the same editor as the repo `계정` tab. While the scope is `저장소별` those
 * three rows are dimmed but stay editable: the values wait for the switch.
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
import { isLimitPolicySnapshot } from '../../data/limit-policy-settings-store.js';
import { errorText } from '../../utils/error-text.js';
import { loadAccountCatalog } from './account-catalog.js';
import { createLimitPolicyEditor } from './limit-policy-editor.js';

/** The guidance line under each `적용 범위` row. */
export const LIMIT_SCOPE_GUIDE =
  '전역: 모든 저장소의 Worker와 Mac 전역 로그인이 아래 값을 따릅니다 · 저장소별: 각 저장소 설정을 쓰고 전역 로그인은 자동으로 바꾸지 않습니다';

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
   * @param {'repo'|'global'} scope
   */
  function onScopeChange(runner, scope) {
    if (snapshot()?.runners[runner]?.scope === scope) {
      return;
    }
    void save(runner, { scope });
  }

  /**
   * @param {LimitPolicySettingsState} state
   * @param {LimitRunner} runner
   * @param {string} label
   * @returns {TemplateResult}
   */
  function runnerGroup(state, runner, label) {
    const scope = state.runners[runner].scope === 'global' ? 'global' : 'repo';
    /** @type {Array<['repo'|'global', string]>} */
    const scopes = [
      ['repo', '저장소별'],
      ['global', '전역']
    ];
    return html`<section
      class="settings-dialog__group"
      data-limit-global=${runner}
    >
      <div class="settings-dialog__group-title">${label} 한도 대응</div>
      <div class="settings-dialog__row" data-limit-scope-row=${runner}>
        <span class="settings-dialog__row-label">적용 범위</span>
        <span class="settings-dialog__controls">
          <span
            class="settings-dialog__seg"
            role="group"
            aria-label=${`${label} 적용 범위`}
            data-limit-scope-runner=${runner}
          >
            ${scopes.map(
              ([value, text]) =>
                html`<button
                  type="button"
                  class=${scope === value ? 'op-btn is-active' : 'op-btn'}
                  data-limit-scope=${value}
                  aria-pressed=${String(scope === value)}
                  @click=${() => onScopeChange(runner, value)}
                >
                  ${text}
                </button>`
            )}
          </span>
        </span>
      </div>
      <p class="settings-dialog__hint-block" data-limit-scope-guide=${runner}>
        ${LIMIT_SCOPE_GUIDE}
      </p>
      ${editor.template(runner, label, {
        mode_label: '대응 방식',
        dim: scope === 'repo'
      })}
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
