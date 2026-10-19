/**
 * Codex credit controls (UI-9y1k §4.5, §4.6): per account, the `크레딧 사용
 * 허용` switch, the daily cap and today's consumption.
 *
 * The values are SERVER-GLOBAL — one setting per account, shared by every
 * workspace — so the execution pane's `계정` section and the bulk window's
 * `계정` tab draw this one module over the same `codex-credits` channel, and a
 * change in either is what the other shows. Writes go out at once (no apply
 * step) as `codex-credits-set`; a revision conflict adopts the server's
 * snapshot and retries once.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../data/codex-credit-store.js').CodexCreditState} CodexCreditState
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import {
  creditAccountOf,
  isCodexCreditSnapshot
} from '../../data/codex-credit-store.js';
import { errorText } from '../../utils/error-text.js';
import { codexLabel } from './account-catalog.js';

/** Says where these values apply, in both surfaces. */
export const CREDIT_GLOBAL_NOTE =
  '크레딧 설정은 전역입니다 — 모든 저장소(워크스페이스)에 같이 적용됩니다';

/** What the cap does — and does not do (§4.7). */
export const CREDIT_CAP_NOTE =
  '하루 상한: 이 값에 닿으면 새로 고르지 않는다 · 이미 실행 중인 작업은 멈추지 않습니다';

/**
 * A credit amount as a person reads it: at most two decimals.
 *
 * @param {number} value
 * @returns {string}
 */
function amountText(value) {
  return String(Math.round(value * 100) / 100);
}

/**
 * Build the controls over one credit store.
 *
 * @param {{
 *   store?: { get: () => any, set?: (state: any) => void, subscribe?: (fn: () => void) => () => void },
 *   transport: (type: any, payload?: unknown) => Promise<any>,
 *   notify: (message: string) => void,
 *   onChange: () => void,
 *   disabled?: () => boolean
 * }} options
 */
export function createCodexCreditControls(options) {
  /**
   * The switch value a save is carrying, so a re-render before the answer does
   * not flip the box back.
   *
   * @type {Record<string, boolean>}
   */
  const pending_allow = {};
  /**
   * Raw cap text the user is typing, written on every keystroke so a re-render
   * (the monitor redraws every second) does not reset the box.
   *
   * @type {Record<string, string>}
   */
  const cap_drafts = {};
  /** @type {Promise<void>} */
  let save_chain = Promise.resolve();

  const unsubscribe = options.store?.subscribe
    ? options.store.subscribe(() => options.onChange())
    : null;

  /** @returns {CodexCreditState|null} */
  function snapshot() {
    const state = options.store?.get() ?? null;
    return isCodexCreditSnapshot(state) ? state : null;
  }

  /**
   * @param {any} next
   */
  function adopt(next) {
    if (isCodexCreditSnapshot(next)) {
      options.store?.set?.({
        revision: next.revision,
        date: typeof next.date === 'string' ? next.date : '',
        default_daily_cap: next.default_daily_cap,
        accounts: next.accounts
      });
    }
  }

  /**
   * @param {number} revision
   * @param {string} key
   * @param {Record<string, unknown>} patch
   */
  function send(revision, key, patch) {
    return options.transport('codex-credits-set', {
      expected_revision: revision,
      accounts: { [key]: patch }
    });
  }

  /**
   * Write one account's patch behind the writes already in flight.
   *
   * @param {string} key
   * @param {{ allow_credits?: boolean, daily_cap?: number }} patch
   * @returns {Promise<void>}
   */
  function save(key, patch) {
    save_chain = save_chain.then(async () => {
      const state = snapshot();
      if (!state) {
        return;
      }
      try {
        let res = await send(state.revision, key, patch);
        if (
          res?.ok === false &&
          res.code === 'conflict' &&
          isCodexCreditSnapshot(res.snapshot)
        ) {
          adopt(res.snapshot);
          res = await send(res.snapshot.revision, key, patch);
        }
        adopt(res?.snapshot);
        if (res?.ok === false) {
          options.notify(
            `크레딧 설정 저장 실패: ${String(res.message || res.code)}`
          );
        }
      } catch (err) {
        adopt(/** @type {any} */ (err)?.details?.snapshot);
        options.notify(`크레딧 설정 저장 실패: ${errorText(err)}`);
      }
    });
    return save_chain;
  }

  /**
   * @param {string} key
   * @param {boolean} on
   */
  function onAllowChange(key, on) {
    pending_allow[key] = on;
    options.onChange();
    void save(key, { allow_credits: on }).then(() => {
      if (pending_allow[key] === on) {
        delete pending_allow[key];
      }
      options.onChange();
    });
  }

  /**
   * Commit the cap box. A value that is not a non-negative whole number is not
   * stored; the box snaps back to the stored cap.
   *
   * @param {string} key
   * @param {string} raw
   */
  function onCapCommit(key, raw) {
    const text = raw.trim();
    const state = snapshot();
    if (!state || !/^\d+$/.test(text)) {
      delete cap_drafts[key];
      options.onChange();
      return;
    }
    const value = Number(text);
    if (creditAccountOf(state, key).daily_cap === value) {
      delete cap_drafts[key];
      options.onChange();
      return;
    }
    cap_drafts[key] = text;
    void save(key, { daily_cap: value }).then(() => {
      if (cap_drafts[key] === text) {
        delete cap_drafts[key];
      }
      options.onChange();
    });
  }

  /**
   * One account's row.
   *
   * @param {CodexCreditState} state
   * @param {any} row - A Codex catalog row.
   * @returns {TemplateResult}
   */
  function rowTemplate(state, row) {
    const key = String(row.key);
    const view = creditAccountOf(state, key);
    const allow = Object.hasOwn(pending_allow, key)
      ? pending_allow[key]
      : view.allow_credits;
    const label = codexLabel(row);
    const locked = options.disabled ? options.disabled() : false;
    return html`<div class="settings-dialog__row" data-codex-credit-row=${key}>
      <span class="settings-dialog__row-label">${label}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-codex-credit-allow=${key}
            .checked=${live(allow)}
            ?disabled=${locked}
            @change=${(/** @type {Event} */ ev) =>
              onAllowChange(
                key,
                /** @type {HTMLInputElement} */ (ev.target).checked
              )}
          />
          크레딧 사용 허용
        </label>
        <span class="settings-dialog__hint">하루 상한</span>
        <input
          type="number"
          class="ui-input"
          min="0"
          step="1"
          inputmode="numeric"
          aria-label=${`${label} 하루 크레딧 상한`}
          data-codex-credit-cap=${key}
          .value=${live(cap_drafts[key] ?? String(view.daily_cap))}
          ?disabled=${locked}
          @input=${(/** @type {Event} */ ev) => {
            cap_drafts[key] = String(
              /** @type {HTMLInputElement} */ (ev.target).value
            );
          }}
          @change=${(/** @type {Event} */ ev) =>
            onCapCommit(
              key,
              String(/** @type {HTMLInputElement} */ (ev.target).value)
            )}
        />
        <span class="settings-dialog__hint" data-codex-credit-consumed=${key}
          >오늘 소모 ${amountText(view.consumed_today)}</span
        >
      </span>
    </div>`;
  }

  return {
    /**
     * The credit block for the given Codex catalog rows. Without a snapshot
     * (an older server) nothing is drawn.
     *
     * @param {any[]} rows
     * @param {string} [scope_note] - The surface's own "applies globally" line.
     * @returns {TemplateResult|''}
     */
    template(rows, scope_note = CREDIT_GLOBAL_NOTE) {
      const state = snapshot();
      if (!state) {
        return '';
      }
      return html`<div
        class="settings-dialog__codex-credits"
        data-codex-credits
      >
        <div class="settings-dialog__row">
          <span class="settings-dialog__row-label">Codex 크레딧</span>
          <span class="settings-dialog__controls">
            <span class="settings-dialog__hint" data-codex-credits-scope
              >${scope_note}</span
            >
            <span class="settings-dialog__hint" data-codex-credits-cap-note
              >${CREDIT_CAP_NOTE}</span
            >
          </span>
        </div>
        ${rows.map((row) => rowTemplate(state, row))}
      </div>`;
    },
    /** Test seam: wait for the writes in flight. */
    settled() {
      return save_chain;
    },
    destroy() {
      if (unsubscribe) {
        unsubscribe();
      }
    }
  };
}
