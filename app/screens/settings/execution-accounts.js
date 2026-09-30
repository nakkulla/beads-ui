/**
 * The `실행` pane's `계정` section: this repo's execution accounts (`bd kv`,
 * UI-d3cb §6.1) and each runner's limit policy on the queue (UI-13o1 §3.5).
 * Split out of `execution-pane.js` (UI-dbn6) with its state, its saves and its
 * templates; the pane hands in its guarded `send`, its queue CAS and its render.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {Object} AccountSectionContext
 * @property {(type: string, payload: Record<string, unknown>) => Promise<any>} send
 * @property {() => Record<string, string>} rootPayload
 * @property {() => any} queueOf
 * @property {(type: string, payload: Record<string, unknown>) => Promise<any>} sendQueueCas
 * @property {(message: string) => void} notify
 * @property {() => void} doRender
 * @property {() => boolean} isDestroyed - Whether the pane was destroyed.
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import {
  accountDefaultLabel,
  accountRowLabel,
  loadAccountCatalog as readAccountCatalog
} from './account-catalog.js';
import { UNSET, isRecord } from './execution-shared.js';

/** The two repo-scoped account keys the `실행 계정` section edits. */
const ACCOUNT_ROW_KEYS = ['claude_account', 'codex_account'];

/**
 * Threshold the preemptive-switch row offers when the user turns it on without
 * naming one (UI-13o1 §3.5). Stored values outside 1-99 are rejected, so this
 * default is inside that range on purpose.
 */
const DEFAULT_PREEMPT_PCT = 80;

/**
 * Hold the account and limit-policy state of one mounted pane.
 *
 * @param {AccountSectionContext} ctx
 */
export function createAccountSection(ctx) {
  const { send, rootPayload, queueOf, sendQueueCas, notify, doRender } = ctx;

  /**
   * The repo's `bd kv` exec account layer as the server last reported it
   * (UI-d3cb §6.1). `unusable` is a normal response, not a failure: it means
   * this repo's dispatch is refused right now, which is exactly what the banner
   * must say.
   *
   * @type {{ state: 'absent'|'usable'|'unusable', values: Record<string, string>, warnings: string[] }}
   */
  let account_layer = { state: 'absent', values: {}, warnings: [] };
  /** The user's account edits — kept as-is when a save fails. */
  /** @type {Record<string, string>} */
  let account_draft = {};
  /** What the server last confirmed; the draft is diffed against this. */
  /** @type {Record<string, string>} */
  let account_baseline = {};
  /**
   * Account writes run one at a time. `bd kv` has no CAS, so the handler's
   * read-merge-write narrows the clobber window but does not close it: two
   * concurrent single-key writes can each merge onto the pre-write object and
   * drop the other's key. Serializing also keeps a late response from adopting
   * over an edit the user made after that request left.
   *
   * @type {Promise<void>}
   */
  let account_save_chain = Promise.resolve();
  /**
   * The allow list a runner's unanswered save is carrying. The stored value is
   * a whole set, and `sendQueueCas` re-sends its payload on a revision
   * conflict, so two clicks computed from the SAME queue snapshot would make
   * the second one put the first one's account back. Reading the pending list
   * instead makes the second click extend the first, and rendering it keeps the
   * box on the user's newest choice.
   *
   * @type {{ claude: string[]|null, codex: string[]|null }}
   */
  let limit_accounts_pending = { claude: null, codex: null };
  /**
   * Raw text of a runner's preemptive-threshold box the user is still typing.
   * Written on every keystroke for the same reason as the pane's
   * `session_text_draft`: the monitor re-renders this pane every second, and
   * `live()` would reset the box to the stored value before `change` fires.
   *
   * @type {{ claude: string|null, codex: string|null }}
   */
  let limit_preempt_draft = { claude: null, codex: null };
  /**
   * One save chain per runner, so a mode/threshold write cannot overtake the
   * allow-list write it was clicked after.
   *
   * @type {{ claude: Promise<void>, codex: Promise<void> }}
   */
  let limit_save_chain = {
    claude: Promise.resolve(),
    codex: Promise.resolve()
  };
  /**
   * Accounts are MACHINE-local, so this list is independent of `root_dir` and
   * is read once per mounted pane rather than once per bound repo.
   *
   * @type {{ claude: { accounts: any[], active: any }|null, codex: { accounts: any[], active: any }|null }}
   */
  let account_catalog = { claude: null, codex: null };
  let account_catalog_loaded = false;

  /**
   * Adopt one `get`/`set` account response as the new baseline. A null response
   * means the pane is detached or has no transport, which must not be read as
   * "the repo has no defaults".
   *
   * Only a READ resets the draft. A write response must not, because the user
   * may have moved a select while it was in flight, and §6.1 keeps their edit
   * state; the next save simply diffs that edit against the new baseline.
   *
   * @param {any} res
   * @param {boolean} reset_draft
   */
  function adoptAccountResponse(res, reset_draft) {
    if (!isRecord(res)) {
      return;
    }
    const state = res.state;
    account_layer = {
      state:
        state === 'usable' || state === 'unusable' || state === 'absent'
          ? state
          : 'absent',
      values: isRecord(res.values) ? { ...res.values } : {},
      warnings: Array.isArray(res.warnings) ? res.warnings : []
    };
    account_baseline = { ...account_layer.values };
    if (reset_draft) {
      account_draft = { ...account_baseline };
    }
  }

  /** Read the repo's exec account defaults. */
  async function loadWorkspaceAccounts() {
    try {
      adoptAccountResponse(
        await send('get-workspace-accounts', {
          ...rootPayload()
        }),
        true
      );
    } catch (err) {
      account_layer = {
        state: 'unusable',
        values: {},
        warnings: ['kv_read_failed']
      };
      account_baseline = {};
      account_draft = {};
      notify(
        `실행 계정 기본값을 읽지 못했습니다: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /** Read both account lists once, in parallel. */
  async function loadAccountCatalog() {
    account_catalog_loaded = true;
    const catalog = await readAccountCatalog();
    if (ctx.isDestroyed()) {
      return;
    }
    account_catalog = catalog;
    doRender();
  }

  /**
   * The account edits the server has not confirmed yet. Built at save time,
   * not at change time, so a key whose own write was still queued when a later
   * change arrived travels in the same request instead of racing it.
   *
   * @returns {Record<string, string|null>}
   */
  function accountPatch() {
    /** @type {Record<string, string|null>} */
    const patch = {};
    for (const key of ACCOUNT_ROW_KEYS) {
      const next = Object.hasOwn(account_draft, key)
        ? account_draft[key]
        : null;
      const previous = Object.hasOwn(account_baseline, key)
        ? account_baseline[key]
        : null;
      if (next !== previous) {
        patch[key] = next;
      }
    }
    return patch;
  }

  /**
   * Save the account-section diff, the way the session tab saves its own. On
   * failure the draft is KEPT so a retry costs no re-entry (§6.1).
   */
  async function saveWorkspaceAccounts() {
    const patch = accountPatch();
    if (Object.keys(patch).length === 0) {
      return;
    }
    try {
      adoptAccountResponse(
        await send('set-workspace-accounts', {
          values: patch,
          ...rootPayload()
        }),
        false
      );
    } catch (err) {
      notify(
        `실행 계정 기본값 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  function onAccountChange(key, value) {
    if (value === UNSET) {
      delete account_draft[key];
    } else {
      account_draft[key] = value;
    }
    doRender();
    account_save_chain = account_save_chain.then(() => saveWorkspaceAccounts());
  }

  /**
   * One runner's stored limit policy, defaulted the way the queue defaults it
   * so a snapshot without the field still renders (fail-quiet, UI-13o1 §3.1).
   *
   * @param {'claude'|'codex'} runner
   * @returns {{ mode: string, accounts: string[], preempt_pct: number|null }}
   */
  function limitPolicyOf(runner) {
    const queue = queueOf();
    const all =
      queue && isRecord(queue.provider_limit_policy)
        ? queue.provider_limit_policy
        : null;
    const raw = all && isRecord(all[runner]) ? all[runner] : null;
    const accounts = Array.isArray(raw?.accounts)
      ? raw.accounts.filter(
          (/** @type {unknown} */ key) =>
            typeof key === 'string' && key.length > 0
        )
      : [];
    const pct = raw?.preempt_pct;
    return {
      mode: raw?.mode === 'wait' ? 'wait' : 'switch',
      accounts: limit_accounts_pending[runner] ?? accounts,
      preempt_pct:
        typeof pct === 'number' &&
        Number.isInteger(pct) &&
        pct >= 1 &&
        pct <= 99
          ? pct
          : null
    };
  }

  /**
   * Write one runner's policy patch. The failure path is the automation one so
   * a save error reads the same wherever this pane writes the queue.
   *
   * @param {'claude'|'codex'} runner
   * @param {Record<string, unknown>} patch
   */
  async function saveLimitPolicy(runner, patch) {
    try {
      await sendQueueCas('worker-provider-limit-policy-set', { runner, patch });
    } catch (err) {
      notify(
        `자동화 설정 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /**
   * Queue one runner's policy save behind the ones already in flight, so the
   * server sees the clicks in the order the user made them.
   *
   * @param {'claude'|'codex'} runner
   * @param {Record<string, unknown>} patch
   * @param {(() => void)|null} [settled] - Runs after the save, false-free.
   */
  function queueLimitSave(runner, patch, settled = null) {
    limit_save_chain[runner] = limit_save_chain[runner].then(async () => {
      await saveLimitPolicy(runner, patch);
      if (settled) {
        settled();
      }
    });
  }

  /**
   * @param {'claude'|'codex'} runner
   * @param {'wait'|'switch'} mode
   */
  function onLimitModeChange(runner, mode) {
    if (limitPolicyOf(runner).mode === mode) {
      return;
    }
    queueLimitSave(runner, { mode });
  }

  /**
   * Send the WHOLE allow list, not a delta: the stored value is a set and the
   * server merges shallowly, so a partial array would drop the other picks.
   *
   * @param {'claude'|'codex'} runner
   * @param {string} account_key
   * @param {boolean} on
   */
  function onLimitAccountToggle(runner, account_key, on) {
    const current = limitPolicyOf(runner).accounts;
    const next = on
      ? current.includes(account_key)
        ? current
        : [...current, account_key]
      : current.filter((key) => key !== account_key);
    if (next === current) {
      return;
    }
    limit_accounts_pending[runner] = next;
    queueLimitSave(runner, { accounts: next }, () => {
      // A newer click has already replaced the overlay; leaving it alone keeps
      // the box on that choice until its own save settles.
      if (limit_accounts_pending[runner] === next) {
        limit_accounts_pending[runner] = null;
      }
    });
  }

  /**
   * @param {'claude'|'codex'} runner
   * @param {boolean} on
   */
  function onLimitPreemptToggle(runner, on) {
    if (!on) {
      queueLimitSave(runner, { preempt_pct: null });
      return;
    }
    queueLimitSave(runner, {
      preempt_pct: limitPolicyOf(runner).preempt_pct ?? DEFAULT_PREEMPT_PCT
    });
  }

  /**
   * A value outside 1-99 is not stored; the row re-renders so the input snaps
   * back to what the queue holds rather than showing a rejected number.
   *
   * @param {'claude'|'codex'} runner
   * @param {string} raw
   */
  function onLimitPreemptPctChange(runner, raw) {
    const value = Number.parseInt(raw, 10);
    if (!Number.isInteger(value) || value < 1 || value > 99) {
      limit_preempt_draft[runner] = null;
      doRender();
      return;
    }
    if (limitPolicyOf(runner).preempt_pct === value) {
      limit_preempt_draft[runner] = null;
      return;
    }
    // 저장 응답이 오기 전 재렌더가 옛 값을 잠깐 그리지 않도록 초안은 저장이
    // 끝난 뒤에 걷는다 — 그 사이 새로 친 값이 있으면 그것을 남긴다.
    limit_preempt_draft[runner] = raw;
    queueLimitSave(runner, { preempt_pct: value }, () => {
      if (limit_preempt_draft[runner] === raw) {
        limit_preempt_draft[runner] = null;
        doRender();
      }
    });
  }

  /**
   * One repo-scoped account row. A stored value the list does not carry stays
   * as its own option, so an unreadable list never silently drops a selection.
   *
   * @param {string} key
   * @param {string} label
   * @param {'claude'|'codex'} provider_key
   * @returns {TemplateResult}
   */
  function accountRow(key, label, provider_key) {
    const provider = account_catalog[provider_key];
    const selected = Object.hasOwn(account_draft, key)
      ? account_draft[key]
      : UNSET;
    const known = Boolean(
      provider?.accounts.some((/** @type {any} */ row) => row.key === selected)
    );
    return html`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${label}</span>
      <span class="settings-dialog__controls">
        <select
          class="ui-select"
          aria-label=${label}
          data-account-key=${key}
          @change=${(/** @type {Event} */ ev) =>
            onAccountChange(
              key,
              String(/** @type {HTMLSelectElement} */ (ev.target).value)
            )}
        >
          <option value=${UNSET} ?selected=${selected.length === 0}>
            ${accountDefaultLabel(provider_key, provider)}
          </option>
          ${selected.length > 0 && !known
            ? html`<option value=${selected} selected>
                ${selected} (목록에 없음)
              </option>`
            : ''}
          ${provider?.accounts.map(
            (/** @type {any} */ row) =>
              html`<option value=${row.key} ?selected=${row.key === selected}>
                ${accountRowLabel(provider_key, row)}
              </option>`
          ) || ''}
        </select>
        ${provider
          ? ''
          : html`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`;
  }

  /**
   * One runner's limit-response block: mode, allow list, preemptive threshold
   * (UI-13o1 §3.5). `기다림` only dims the two lower rows — the values stay
   * editable because the mode gates the decision, not the setting.
   *
   * @param {'claude'|'codex'} runner
   * @param {string} label
   * @returns {TemplateResult}
   */
  function limitPolicyBlock(runner, label) {
    const policy = limitPolicyOf(runner);
    const provider = account_catalog[runner];
    const rows = provider ? provider.accounts : [];
    const known = new Set(rows.map((/** @type {any} */ row) => row.key));
    const orphans = policy.accounts.filter((key) => !known.has(key));
    const dim = policy.mode === 'switch' ? '' : ' settings-dialog__row--off';
    return html`<div class="settings-dialog__row">
        <span class="settings-dialog__row-label">${label} 한도 대응</span>
        <span class="settings-dialog__controls">
          <span
            class="settings-dialog__seg ui-seg"
            role="group"
            aria-label=${`${label} 한도 대응`}
            data-limit-mode-runner=${runner}
          >
            <button
              type="button"
              data-limit-mode="wait"
              aria-pressed=${String(policy.mode === 'wait')}
              @click=${() => onLimitModeChange(runner, 'wait')}
            >
              기다림
            </button>
            <button
              type="button"
              data-limit-mode="switch"
              aria-pressed=${String(policy.mode === 'switch')}
              @click=${() => onLimitModeChange(runner, 'switch')}
            >
              자동 전환
            </button>
          </span>
        </span>
      </div>
      <div class=${`settings-dialog__row${dim}`} data-limit-accounts=${runner}>
        <span class="settings-dialog__row-label">전환 허용 계정</span>
        <span class="settings-dialog__controls">
          ${rows.map(
            (/** @type {any} */ row) =>
              html`<label class="settings-dialog__check">
                <input
                  type="checkbox"
                  data-limit-runner=${runner}
                  data-limit-account=${row.key}
                  .checked=${live(policy.accounts.includes(row.key))}
                  @change=${(/** @type {Event} */ ev) =>
                    onLimitAccountToggle(
                      runner,
                      row.key,
                      /** @type {HTMLInputElement} */ (ev.target).checked
                    )}
                />
                ${accountRowLabel(runner, row)}
              </label>`
          )}
          ${orphans.map(
            (key) =>
              html`<label class="settings-dialog__check">
                <input
                  type="checkbox"
                  data-limit-runner=${runner}
                  data-limit-account=${key}
                  .checked=${live(true)}
                  @change=${(/** @type {Event} */ ev) =>
                    onLimitAccountToggle(
                      runner,
                      key,
                      /** @type {HTMLInputElement} */ (ev.target).checked
                    )}
                />
                ${`${key} (목록에 없음)`}
              </label>`
          )}
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
                onLimitPreemptToggle(
                  runner,
                  /** @type {HTMLInputElement} */ (ev.target).checked
                )}
            />
            사용량
          </label>
          <input
            type="number"
            class="ui-input ui-input--num"
            min="1"
            max="99"
            step="1"
            aria-label=${`${label} 선제 전환 임계`}
            data-limit-preempt-pct=${runner}
            .value=${live(
              limit_preempt_draft[runner] ??
                String(policy.preempt_pct ?? DEFAULT_PREEMPT_PCT)
            )}
            @input=${(/** @type {Event} */ ev) => {
              limit_preempt_draft[runner] = String(
                /** @type {HTMLInputElement} */ (ev.target).value
              );
            }}
            @change=${(/** @type {Event} */ ev) =>
              onLimitPreemptPctChange(
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

  /**
   * The account layer's own banner. `unusable` states the CONSEQUENCE rather
   * than the code, because that is what the user is looking at this pane to
   * undo — re-picking a value rewrites a legal object and clears it (§6.1).
   *
   * @returns {string|null}
   */
  function accountBannerText() {
    const detail = account_layer.warnings.join(', ');
    if (account_layer.state === 'unusable') {
      return `실행 계정 기본값을 해석할 수 없어 이 레포의 디스패치가 거부됩니다 — ${detail} · 계정을 다시 고르면 해소됩니다`;
    }
    if (account_layer.warnings.length > 0) {
      return `실행 계정 기본값에 알 수 없는 키가 있습니다 — ${detail}`;
    }
    return null;
  }

  /** @returns {TemplateResult|''} */
  function accountBanner() {
    const text = accountBannerText();
    if (!text) {
      return '';
    }
    return html`<div
      class="settings-dialog__banner"
      data-account-warning
      role="alert"
    >
      ${text}
    </div>`;
  }

  return {
    /**
     * Start this section's reads for one `load()`: the repo's account layer,
     * then — once per mounted pane — both account lists.
     *
     * @returns {Promise<void>[]}
     */
    load() {
      /** @type {Promise<void>[]} */
      const pending = [loadWorkspaceAccounts()];
      if (!account_catalog_loaded) {
        pending.push(loadAccountCatalog());
      }
      return pending;
    },

    /**
     * This repo's execution accounts and per-runner limit policy. Neither is
     * part of an execution preset, so neither belongs on the Worker tab.
     *
     * @returns {TemplateResult}
     */
    template() {
      return html`
        ${accountBanner()}
        <div class="settings-dialog__group" data-exec-accounts-group>
          <div class="settings-dialog__group-title">실행 계정</div>
          ${accountRow('claude_account', 'Claude', 'claude')}
          ${accountRow('codex_account', 'Codex', 'codex')}
          ${limitPolicyBlock('claude', 'Claude')}
          ${limitPolicyBlock('codex', 'Codex')}
        </div>
      `;
    }
  };
}
