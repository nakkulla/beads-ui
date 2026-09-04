import { html, render } from 'lit-html';
import {
  BENCH_LABEL,
  isBenchIncluded,
  isLabelVisible
} from '../utils/label-policy.js';
import { showToast } from '../utils/toast.js';

/**
 * Display-settings dialog: the single editing surface for the per-workspace
 * label/metadata display policy.
 *
 * Every known label is a pill whose click meaning depends on WHY it is
 * currently hidden — the three branches keep the policy's rule levels
 * (`visible_labels` > `hidden_labels` > `hidden_prefixes`) editable without
 * exposing them as three separate lists:
 *
 * - shown → add it to `hidden_labels`,
 * - hidden by an exact rule → drop it from `hidden_labels`,
 * - hidden by a prefix rule → add it to `visible_labels`, which is the only way
 *   to exempt one label without dropping the prefix rule for its siblings.
 *
 * Writes are CAS-guarded on the policy `revision`. A conflict means another
 * client saved first, so the reply's policy is adopted and the edit is replayed
 * once against the fresh revision. The replay re-derives the patch from the
 * DESIRED END STATE captured at click time, never from a toggle recomputed on
 * the newer policy — recomputing would invert the user's intent whenever the
 * other client happened to make the same change (two clients hiding the same
 * label would leave it shown).
 *
 * @typedef {import('../utils/label-policy.js').DisplayPolicy} DisplayPolicy
 */

/**
 * @typedef {Object} DisplaySettingsOptions
 * @property {{ get: () => DisplayPolicy|null, set: (p: DisplayPolicy|null) => void, subscribe?: (fn: () => void) => () => void }} policyStore
 * @property {(type: import('../protocol.js').MessageType, payload?: unknown) => Promise<any>} transport
 * @property {() => string[]} labelOptions - Union of labels across loaded issues.
 */

/**
 * The six derived-chip toggles, in display order.
 *
 * @type {ReadonlyArray<[keyof DisplayPolicy['chips'], string]>}
 */
const CHIP_TOGGLES = [
  ['route', 'route 칩'],
  ['fast_track', '⚡ fast_track 칩'],
  ['pr', 'PR 칩'],
  ['from', '↩ from 칩'],
  ['blocked', 'blocked·사용자 리뷰 필요 칩'],
  ['stepper', 'stepper']
];

/**
 * Why a label is currently not rendered — this is what decides what a pill
 * click means.
 *
 * @param {string} label
 * @param {DisplayPolicy} policy
 * @returns {'shown'|'hidden_exact'|'hidden_prefix'}
 */
export function labelPillState(label, policy) {
  if (isLabelVisible(label, policy)) {
    return 'shown';
  }
  return policy.hidden_labels.includes(label)
    ? 'hidden_exact'
    : 'hidden_prefix';
}

/**
 * The policy patch that puts `label` into a DESIRED visibility on top of the
 * given policy. Idempotent: applying it to a policy that already satisfies the
 * intent is a no-op, which is what makes a CAS replay safe.
 *
 * Showing a label needs both moves, because the policy may hide it at either
 * level: drop any exact rule, and add the `visible_labels` exemption only when
 * a prefix rule would still hide it.
 *
 * @param {string} label
 * @param {DisplayPolicy} policy
 * @param {boolean} desired_visible - The end state the user asked for.
 * @returns {{ hidden_labels?: string[], visible_labels?: string[] }}
 */
export function labelPatchFor(label, policy, desired_visible) {
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

/**
 * The policy patch that includes or excludes bench clones in the Board list
 * (preset-compare §4.8). The decision rides `visible_labels`, the one existing
 * field whose default is empty, so "include" is an explicit entry and the
 * absence of one is the documented default. Idempotent, which is what makes the
 * CAS replay safe.
 *
 * @param {DisplayPolicy} policy
 * @param {boolean} desired_included - The end state the user asked for.
 * @returns {{ visible_labels: string[] }}
 */
export function benchPatchFor(policy, desired_included) {
  const without = policy.visible_labels.filter((it) => it !== BENCH_LABEL);
  return {
    visible_labels: desired_included ? [...without, BENCH_LABEL] : without
  };
}

/**
 * Create the display-settings dialog (native `<dialog>`).
 *
 * @param {HTMLElement} mount_element
 * @param {DisplaySettingsOptions} options
 * @returns {{ open: () => void, close: () => void, destroy: () => void }}
 */
export function createDisplaySettingsDialog(mount_element, options) {
  const { policyStore, transport, labelOptions } = options;

  const dialog = /** @type {HTMLDialogElement} */ (
    document.createElement('dialog')
  );
  dialog.id = 'display-settings-dialog';
  dialog.className = 'display-settings';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  mount_element.appendChild(dialog);

  /** Draft prefix text; not part of the policy until it is added. */
  let prefix_draft = '';

  /**
   * Send a policy patch with a CAS guard, retrying ONCE on conflict against the
   * revision the server just reported.
   *
   * @param {(policy: DisplayPolicy) => Record<string, unknown>} buildPatch
   */
  async function save(buildPatch) {
    const current = policyStore.get();
    if (!current) {
      return;
    }
    try {
      let res = await transport('display-policy-set', {
        expected_revision: current.revision,
        policy: buildPatch(current)
      });
      adopt(res);
      if (res && res.conflict && res.policy) {
        res = await transport('display-policy-set', {
          expected_revision: res.policy.revision,
          policy: buildPatch(res.policy)
        });
        adopt(res);
      }
      if (res && res.conflict) {
        showToast('표시 설정 저장 실패: 다른 클라이언트와 충돌', 'error', 4000);
      }
    } catch {
      showToast('표시 설정 저장 실패', 'error', 4000);
    }
  }

  /**
   * @param {any} res
   */
  function adopt(res) {
    if (res && res.policy && typeof res.policy === 'object') {
      policyStore.set(res.policy);
    }
  }

  /**
   * @param {string} label
   */
  function onLabelPillClick(label) {
    const current = policyStore.get();
    if (!current) {
      return;
    }
    // Capture the end state the click asked for; the CAS replay reuses it.
    const desired_visible = labelPillState(label, current) !== 'shown';
    void save((policy) => labelPatchFor(label, policy, desired_visible));
  }

  function onPrefixAdd() {
    const prefix = prefix_draft.trim();
    if (prefix.length === 0) {
      return;
    }
    prefix_draft = '';
    void save((policy) =>
      policy.hidden_prefixes.includes(prefix)
        ? { hidden_prefixes: policy.hidden_prefixes }
        : { hidden_prefixes: [...policy.hidden_prefixes, prefix] }
    );
    doRender();
  }

  /**
   * @param {string} prefix
   */
  function onPrefixRemove(prefix) {
    void save((policy) => ({
      hidden_prefixes: policy.hidden_prefixes.filter((it) => it !== prefix)
    }));
  }

  /**
   * @param {keyof DisplayPolicy['chips']} chip
   */
  function onChipToggle(chip) {
    const current = policyStore.get();
    if (!current) {
      return;
    }
    // Capture the end state, not a toggle — a replayed toggle would flip back.
    const desired = current.chips[chip] === false;
    void save(() => ({ chips: { [chip]: desired } }));
  }

  /**
   * @param {DisplayPolicy} policy
   * @returns {import('lit-html').TemplateResult}
   */
  function labelsSection(policy) {
    const labels = labelOptions();
    return html`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${labels.length === 0
          ? html`<div class="display-settings__empty">라벨 없음</div>`
          : html`<div class="display-settings__pills">
              ${labels.map((label) => {
                const pill_state = labelPillState(label, policy);
                return html`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${pill_state}`}
                  data-label=${label}
                  data-state=${pill_state}
                  @click=${() => onLabelPillClick(label)}
                >
                  ${label}
                </button>`;
              })}
            </div>`}
      </section>
    `;
  }

  /**
   * @param {DisplayPolicy} policy
   * @returns {import('lit-html').TemplateResult}
   */
  function prefixesSection(policy) {
    return html`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${policy.hidden_prefixes.map(
            (prefix) =>
              html`<span class="display-settings__prefix">
                ${prefix}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${prefix} 규칙 제거`}
                  @click=${() => onPrefixRemove(prefix)}
                >
                  ×
                </button>
              </span>`
          )}
        </div>
        <div class="display-settings__prefix-add">
          <input
            type="text"
            class="display-settings__prefix-input"
            aria-label="숨길 prefix"
            placeholder="예: reviewed:"
            .value=${prefix_draft}
            @input=${(/** @type {Event} */ ev) => {
              prefix_draft = String(
                /** @type {HTMLInputElement} */ (ev.target).value || ''
              );
            }}
          />
          <button type="button" @click=${onPrefixAdd}>추가</button>
        </div>
      </section>
    `;
  }

  /**
   * The bench inclusion toggle (preset-compare §4.8). It writes through the
   * SAME policy path as a label pill — `visible_labels` carries the decision —
   * so there is no second store and no new policy key for the Board to read.
   *
   * @param {DisplayPolicy} policy
   * @returns {import('lit-html').TemplateResult}
   */
  function listSection(policy) {
    const included = isBenchIncluded(policy);
    return html`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">목록 표시</h3>
        <p class="display-settings__hint">
          bench 실험 클론은 Board 목록에서 기본 제외됩니다. Worker 탭은 실행
          주체라 그대로 보입니다.
        </p>
        <div class="display-settings__toggles">
          <label class="display-settings__toggle">
            <input
              type="checkbox"
              data-list-toggle="bench"
              .checked=${included}
              @change=${() => {
                // Capture the end state, not a toggle — a replayed toggle would
                // flip back on a CAS retry.
                const desired = !included;
                void save((next) => benchPatchFor(next, desired));
              }}
            />
            <span>bench 포함</span>
          </label>
        </div>
      </section>
    `;
  }

  /**
   * @param {DisplayPolicy} policy
   * @returns {import('lit-html').TemplateResult}
   */
  function chipsSection(policy) {
    return html`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${CHIP_TOGGLES.map(
            ([chip, label]) =>
              html`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${chip}
                  .checked=${policy.chips[chip] !== false}
                  @change=${() => onChipToggle(chip)}
                />
                <span>${label}</span>
              </label>`
          )}
        </div>
      </section>
    `;
  }

  function doRender() {
    const policy = policyStore.get();
    render(
      html`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${close}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${policy
              ? html`${labelsSection(policy)} ${prefixesSection(policy)}
                ${listSection(policy)} ${chipsSection(policy)}`
              : html`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,
      dialog
    );
  }

  // Tracked separately from `dialog.open` so a pushed policy still re-renders
  // where `showModal` is unavailable (jsdom) and the native flag never flips.
  let is_open = false;

  // Escape dismisses a native <dialog> without going through close(), so the
  // flag has to follow the element or the dialog could never be reopened.
  const onDialogClose = () => {
    is_open = false;
  };
  dialog.addEventListener('close', onDialogClose);
  dialog.addEventListener('cancel', onDialogClose);

  /** @type {null | (() => void)} */
  let unsubscribe_policy = null;
  if (policyStore.subscribe) {
    unsubscribe_policy = policyStore.subscribe(() => {
      if (is_open) {
        doRender();
      }
    });
  }

  function open() {
    if (is_open) {
      return;
    }
    prefix_draft = '';
    is_open = true;
    doRender();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function close() {
    if (!is_open) {
      return;
    }
    is_open = false;
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }

  return {
    open,
    close,
    destroy() {
      is_open = false;
      dialog.removeEventListener('close', onDialogClose);
      dialog.removeEventListener('cancel', onDialogClose);
      if (unsubscribe_policy) {
        unsubscribe_policy();
        unsubscribe_policy = null;
      }
      dialog.remove();
    }
  };
}
