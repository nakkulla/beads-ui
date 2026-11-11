/**
 * One runner's `한도 대응` rows — `대응 방식`, `전환 허용 계정`, `선제 전환` —
 * and the click handling behind them (UI-13o1 §3.5, UI-9y1k §4.5).
 *
 * The settings dialog's `계정` and `활성 계정` tabs draw these rows from this
 * one editor (UI-giog §4.5); only the policy source and the save channel
 * differ, so neither screen reassembles the rows by hand. The `활성 계정` tab's
 * active-login switch has no wait/switch mode (UI-32oq §4.1), so it leaves the
 * mode row out and draws its own rows above. A screen hands in:
 *
 * - `policyOf(runner)` — the stored policy object (any shape; read
 *   fail-quiet),
 * - `save(runner, patch)` — one write, which reports its own failure,
 * - `catalogOf(runner)` — the account list (`{ accounts }`) or null,
 * - `render()` — redraw the screen.
 *
 * The editor serializes each runner's saves, overlays an unanswered allow-list
 * save, and keeps the threshold box's in-progress text across redraws.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {'claude'|'codex'} LimitRunner
 * @typedef {{ mode: 'wait'|'switch', accounts: string[], preempt_pct: number|null }} LimitPolicyView
 * @typedef {Object} LimitRowsOptions
 * @property {string|null} mode_label - The mode row's label, or null to leave
 * the mode row out.
 * @property {boolean} [dim] - Dim every drawn row (values stay editable).
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { accountRowLabel } from './account-catalog.js';

/**
 * Threshold the preemptive-switch row offers when the user turns it on without
 * naming one (UI-13o1 §3.5). Stored values outside 1-99 are rejected, so this
 * default is inside that range on purpose.
 */
export const DEFAULT_PREEMPT_PCT = 80;

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * One stored policy, defaulted the way the server defaults it so a snapshot
 * without the field still renders (fail-quiet, UI-13o1 §3.1).
 *
 * @param {unknown} raw
 * @returns {LimitPolicyView}
 */
export function normalizeLimitPolicy(raw) {
  const record = isRecord(raw) ? raw : null;
  const accounts = Array.isArray(record?.accounts)
    ? record.accounts.filter(
        (/** @type {unknown} */ key) =>
          typeof key === 'string' && key.length > 0
      )
    : [];
  const pct = record?.preempt_pct;
  return {
    mode: record?.mode === 'wait' ? 'wait' : 'switch',
    accounts,
    preempt_pct:
      typeof pct === 'number' && Number.isInteger(pct) && pct >= 1 && pct <= 99
        ? pct
        : null
  };
}

/**
 * Create one screen's limit-policy editor.
 *
 * @param {{
 *   policyOf: (runner: LimitRunner) => unknown,
 *   save: (runner: LimitRunner, patch: Record<string, unknown>) => Promise<void>,
 *   catalogOf: (runner: LimitRunner) => { accounts: any[] }|null,
 *   render: () => void
 * }} deps
 */
export function createLimitPolicyEditor(deps) {
  /**
   * The allow list a runner's unanswered save is carrying. The stored value is
   * a whole set and a write may be re-sent on a revision conflict, so two
   * clicks computed from the SAME snapshot would make the second one put the
   * first one's account back. Reading the pending list instead makes the
   * second click extend the first, and rendering it keeps the box on the
   * user's newest choice.
   *
   * @type {{ claude: string[]|null, codex: string[]|null }}
   */
  const accounts_pending = { claude: null, codex: null };
  /**
   * Raw text of a runner's preemptive-threshold box the user is still typing.
   * Written on every keystroke: a screen may redraw every second, and `live()`
   * would reset the box to the stored value before `change` fires.
   *
   * @type {{ claude: string|null, codex: string|null }}
   */
  const preempt_draft = { claude: null, codex: null };
  /**
   * One save chain per runner, so a mode/threshold write cannot overtake the
   * allow-list write it was clicked after.
   *
   * @type {{ claude: Promise<void>, codex: Promise<void> }}
   */
  const save_chain = {
    claude: Promise.resolve(),
    codex: Promise.resolve()
  };

  /**
   * The policy the rows show: the stored one, with an unanswered allow-list
   * save laid over it.
   *
   * @param {LimitRunner} runner
   * @returns {LimitPolicyView}
   */
  function policyOf(runner) {
    const stored = normalizeLimitPolicy(deps.policyOf(runner));
    return {
      ...stored,
      accounts: accounts_pending[runner] ?? stored.accounts
    };
  }

  /**
   * Queue one runner's save behind the ones already in flight, so the server
   * sees the clicks in the order the user made them.
   *
   * @param {LimitRunner} runner
   * @param {Record<string, unknown>} patch
   * @param {(() => void)|null} [settled] - Runs after the save, false-free.
   */
  function queueSave(runner, patch, settled = null) {
    save_chain[runner] = save_chain[runner].then(async () => {
      await deps.save(runner, patch);
      if (settled) {
        settled();
      }
    });
  }

  /**
   * @param {LimitRunner} runner
   * @param {'wait'|'switch'} mode
   */
  function onModeChange(runner, mode) {
    if (policyOf(runner).mode === mode) {
      return;
    }
    queueSave(runner, { mode });
  }

  /**
   * Send the WHOLE allow list, not a delta: the stored value is a set and the
   * server merges shallowly, so a partial array would drop the other picks.
   *
   * @param {LimitRunner} runner
   * @param {string} account_key
   * @param {boolean} on
   */
  function onAccountToggle(runner, account_key, on) {
    const current = policyOf(runner).accounts;
    const next = on
      ? current.includes(account_key)
        ? current
        : [...current, account_key]
      : current.filter((key) => key !== account_key);
    if (next === current) {
      return;
    }
    accounts_pending[runner] = next;
    queueSave(runner, { accounts: next }, () => {
      // A newer click has already replaced the overlay; leaving it alone keeps
      // the box on that choice until its own save settles.
      if (accounts_pending[runner] === next) {
        accounts_pending[runner] = null;
        deps.render();
      }
    });
  }

  /**
   * Move one allowed account up or down. The allow list's ORDER is the switch
   * order (UI-9y1k §4.2, UI-iopp), so the whole reordered list is saved at once
   * through the same overlay and chain as a toggle.
   *
   * @param {LimitRunner} runner
   * @param {string} account_key
   * @param {-1|1} delta
   */
  function onAccountMove(runner, account_key, delta) {
    const current = policyOf(runner).accounts;
    const index = current.indexOf(account_key);
    const target = index + delta;
    if (index < 0 || target < 0 || target >= current.length) {
      return;
    }
    const next = current.slice();
    next[index] = current[target];
    next[target] = account_key;
    accounts_pending[runner] = next;
    deps.render();
    queueSave(runner, { accounts: next }, () => {
      if (accounts_pending[runner] === next) {
        accounts_pending[runner] = null;
        deps.render();
      }
    });
  }

  /**
   * @param {LimitRunner} runner
   * @param {boolean} on
   */
  function onPreemptToggle(runner, on) {
    if (!on) {
      queueSave(runner, { preempt_pct: null });
      return;
    }
    queueSave(runner, {
      preempt_pct: policyOf(runner).preempt_pct ?? DEFAULT_PREEMPT_PCT
    });
  }

  /**
   * A value outside 1-99 is not stored; the row re-renders so the input snaps
   * back to what the server holds rather than showing a rejected number.
   *
   * @param {LimitRunner} runner
   * @param {string} raw
   */
  function onPreemptPctChange(runner, raw) {
    const value = Number.parseInt(raw, 10);
    if (!Number.isInteger(value) || value < 1 || value > 99) {
      preempt_draft[runner] = null;
      deps.render();
      return;
    }
    if (policyOf(runner).preempt_pct === value) {
      preempt_draft[runner] = null;
      return;
    }
    // 저장 응답이 오기 전 재렌더가 옛 값을 잠깐 그리지 않도록 초안은 저장이
    // 끝난 뒤에 걷는다 — 그 사이 새로 친 값이 있으면 그것을 남긴다.
    preempt_draft[runner] = raw;
    queueSave(runner, { preempt_pct: value }, () => {
      if (preempt_draft[runner] === raw) {
        preempt_draft[runner] = null;
        deps.render();
      }
    });
  }

  /**
   * One runner's allow list in SWITCH ORDER (UI-9y1k §4.5, UI-iopp for
   * Claude): allowed accounts in the stored order, each with ▲/▼, then the
   * accounts not allowed in catalog order. Moving saves at once, like a toggle.
   *
   * @param {LimitRunner} runner
   * @param {LimitPolicyView} policy
   * @param {any[]} rows
   * @returns {TemplateResult}
   */
  function allowListTemplate(runner, policy, rows) {
    /** @type {Map<string, any>} */
    const by_key = new Map(rows.map((row) => [String(row.key), row]));
    const last = policy.accounts.length - 1;
    return html`${policy.accounts.map((key, index) => {
      const row = by_key.get(key);
      const label = row ? accountRowLabel(runner, row) : `${key} (목록에 없음)`;
      return html`<span
        class="settings-dialog__limit-order"
        data-limit-order-item=${key}
      >
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-limit-runner=${runner}
            data-limit-account=${key}
            .checked=${live(true)}
            @change=${(/** @type {Event} */ ev) =>
              onAccountToggle(
                runner,
                key,
                /** @type {HTMLInputElement} */ (ev.target).checked
              )}
          />
          ${`${index + 1}. ${label}`}
        </label>
        <button
          type="button"
          class="op-btn op-btn--ghost op-btn--icon"
          aria-label=${`${label} 위로`}
          title="위로"
          data-limit-move="up"
          data-limit-move-account=${key}
          ?disabled=${index === 0}
          @click=${() => onAccountMove(runner, key, -1)}
        >
          ▲
        </button>
        <button
          type="button"
          class="op-btn op-btn--ghost op-btn--icon"
          aria-label=${`${label} 아래로`}
          title="아래로"
          data-limit-move="down"
          data-limit-move-account=${key}
          ?disabled=${index === last}
          @click=${() => onAccountMove(runner, key, 1)}
        >
          ▼
        </button>
      </span>`;
    })}
    ${rows
      .filter((row) => !policy.accounts.includes(String(row.key)))
      .map(
        (/** @type {any} */ row) =>
          html`<label class="settings-dialog__check">
            <input
              type="checkbox"
              data-limit-runner=${runner}
              data-limit-account=${row.key}
              .checked=${live(false)}
              @change=${(/** @type {Event} */ ev) =>
                onAccountToggle(
                  runner,
                  row.key,
                  /** @type {HTMLInputElement} */ (ev.target).checked
                )}
            />
            ${accountRowLabel(runner, row)}
          </label>`
      )}`;
  }

  /**
   * The repo tab's wait/switch choice for one runner (`기다림 / 자동 전환`).
   *
   * @param {LimitRunner} runner
   * @param {string} label - The runner's display name (`Claude`, `Codex`).
   * @param {string} mode_label
   * @param {LimitPolicyView} policy
   * @param {string} row_dim
   * @returns {TemplateResult}
   */
  function modeRowTemplate(runner, label, mode_label, policy, row_dim) {
    return html`<div
      class=${`settings-dialog__row${row_dim}`}
      data-limit-mode-row=${runner}
    >
      <span class="settings-dialog__row-label">${mode_label}</span>
      <span class="settings-dialog__controls">
        <span
          class="settings-dialog__seg"
          role="group"
          aria-label=${`${label} 한도 대응`}
          data-limit-mode-runner=${runner}
        >
          <button
            type="button"
            class=${policy.mode === 'wait' ? 'op-btn is-active' : 'op-btn'}
            data-limit-mode="wait"
            aria-pressed=${String(policy.mode === 'wait')}
            @click=${() => onModeChange(runner, 'wait')}
          >
            기다림
          </button>
          <button
            type="button"
            class=${policy.mode === 'switch' ? 'op-btn is-active' : 'op-btn'}
            data-limit-mode="switch"
            aria-pressed=${String(policy.mode === 'switch')}
            @click=${() => onModeChange(runner, 'switch')}
          >
            자동 전환
          </button>
        </span>
      </span>
    </div>`;
  }

  /**
   * One runner's rows: mode (unless `mode_label` is null), allow list,
   * preemptive threshold. `기다림` only dims the two lower rows — the values
   * stay editable because the mode gates the decision, not the setting.
   * `dim` dims every drawn row (still editable).
   *
   * @param {LimitRunner} runner
   * @param {string} label - The runner's display name (`Claude`, `Codex`).
   * @param {LimitRowsOptions} options
   * @returns {TemplateResult}
   */
  function template(runner, label, options) {
    const policy = policyOf(runner);
    const provider = deps.catalogOf(runner);
    const rows = provider ? provider.accounts : [];
    const off = ' settings-dialog__row--off';
    const top_dim = options.dim === true ? off : '';
    const dim = options.dim === true || policy.mode !== 'switch' ? off : '';
    return html`${options.mode_label === null
        ? ''
        : modeRowTemplate(runner, label, options.mode_label, policy, top_dim)}
      <div class=${`settings-dialog__row${dim}`} data-limit-accounts=${runner}>
        <span class="settings-dialog__row-label">전환 허용 계정</span>
        <span class="settings-dialog__controls">
          ${allowListTemplate(runner, policy, rows)}
          ${provider
            ? ''
            : html`<span class="settings-dialog__hint"
                >계정 목록을 불러올 수 없습니다</span
              >`}
        </span>
      </div>
      <div
        class=${`settings-dialog__row${dim}`}
        data-limit-preempt-row=${runner}
      >
        <span class="settings-dialog__row-label">선제 전환</span>
        <span class="settings-dialog__controls">
          <label class="settings-dialog__check">
            <input
              type="checkbox"
              data-limit-preempt=${runner}
              .checked=${live(policy.preempt_pct !== null)}
              @change=${(/** @type {Event} */ ev) =>
                onPreemptToggle(
                  runner,
                  /** @type {HTMLInputElement} */ (ev.target).checked
                )}
            />
            사용량
          </label>
          <input
            type="number"
            class="ui-input"
            min="1"
            max="99"
            step="1"
            aria-label=${`${label} 선제 전환 임계`}
            data-limit-preempt-pct=${runner}
            .value=${live(
              preempt_draft[runner] ??
                String(policy.preempt_pct ?? DEFAULT_PREEMPT_PCT)
            )}
            @input=${(/** @type {Event} */ ev) => {
              preempt_draft[runner] = String(
                /** @type {HTMLInputElement} */ (ev.target).value
              );
            }}
            @change=${(/** @type {Event} */ ev) =>
              onPreemptPctChange(
                runner,
                String(/** @type {HTMLInputElement} */ (ev.target).value)
              )}
          />
          <span class="settings-dialog__hint"
            >% 이상이면 미리 전환 · 실행 중인 세션도 이 값에서 전환합니다 ·
            사용량 반영은 최대 몇 분 지연될 수 있습니다</span
          >
        </span>
      </div>`;
  }

  return { policyOf, template };
}
