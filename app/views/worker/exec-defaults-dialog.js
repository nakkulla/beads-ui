import { html, render } from 'lit-html';
import { showToast } from '../../utils/toast.js';
import {
  DEFAULT_LABELS,
  EFFORTS,
  IMPL_MODELS,
  REVIEW_MODELS,
  RUNNERS,
  modelsForRunner
} from '../detail-panel/exec-settings.js';

/**
 * Worker-tab "전역 실행 설정" dialog: the single editing surface for the
 * workspace-global exec defaults (the 5 exec keys, NOT workflow_mode). It mirrors
 * the display-settings dialog's native `<dialog>` shell (showModal/jsdom fallback,
 * close/cancel handling, destroy) and the Worker view's `setPolicy` CAS contract:
 * a change sends `worker-queue-set-exec-default` with the current queue revision,
 * adopts the authoritative queue the reply carries, and replays the SAME edit once
 * against the fresh revision on a CAS conflict.
 *
 * Values resolve bead metadata > this global default > hardcoded (runner=claude),
 * so selecting `(기본)` records an unset (null) — the store drops the key. The
 * server validates each key's own enum but never the runner×model cross-key
 * compatibility (the runner can still change later); the option filter here is the
 * UI half of that: orchestration_model options follow the effective global runner
 * (claude's catalog when unset), and an incompatible stored model shows as its own
 * selected `(비호환)` option (still resettable to `(기본)` to unset).
 *
 * @typedef {{ get: () => any, set: (q: any) => void, subscribe?: (fn: () => void) => () => void }} QueueStore
 * @typedef {Object} ExecDefaultsOptions
 * @property {QueueStore} queueStore
 * @property {(type: import('../../protocol.js').MessageType, payload?: unknown) => Promise<any>} [transport]
 */

/** The 5 workspace-global exec keys, in display order (workflow_mode excluded). */
const EXEC_ROWS = [
  { key: 'worker_runner', values: () => RUNNERS },
  // orchestration_model is runner-filtered, so its option list is resolved from
  // the effective global runner at render time rather than a static catalog.
  {
    key: 'orchestration_model',
    values: (/** @type {string} */ runner) => modelsForRunner(runner)
  },
  { key: 'orchestration_effort', values: () => EFFORTS },
  { key: 'review_model', values: () => REVIEW_MODELS },
  { key: 'impl_model', values: () => IMPL_MODELS }
];

/**
 * Workspace-global policy rows also editable here (spec §1.3): on ≤640px the
 * ctrl-bar merge/drift selects are hidden, so this dialog is their edit surface.
 * They ride the SAME `worker-queue-set-policy` CAS path as the ctrl bar.
 *
 * @type {{ key: 'merge_policy'|'drift_policy', values: string[], default_label: string }[]}
 */
const POLICY_ROWS = [
  {
    key: 'merge_policy',
    values: ['auto_merge', 'pr_stop'],
    default_label: '(기본 auto_merge)'
  },
  {
    key: 'drift_policy',
    values: ['auto_rereview', 'halt'],
    default_label: '(기본 auto_rereview)'
  }
];

/**
 * Create the exec-defaults dialog (native `<dialog>`).
 *
 * @param {HTMLElement} mount_element
 * @param {ExecDefaultsOptions} options
 * @returns {{ open: () => void, close: () => void, destroy: () => void }}
 */
export function createExecDefaultsDialog(mount_element, options) {
  const { queueStore, transport } = options;

  const dialog = /** @type {HTMLDialogElement} */ (
    document.createElement('dialog')
  );
  dialog.id = 'worker-exec-defaults-dialog';
  dialog.className = 'exec-defaults';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  mount_element.appendChild(dialog);

  /**
   * @returns {any} Current queue snapshot (or an empty shape, mirroring the
   * Worker view so a pre-snapshot open still renders the selects at revision 0).
   */
  function currentQueue() {
    return (
      (queueStore && queueStore.get()) || { revision: 0, exec_defaults: {} }
    );
  }

  /**
   * @returns {number}
   */
  function currentRevision() {
    const q = currentQueue();
    return typeof q.revision === 'number' ? q.revision : 0;
  }

  /**
   * @returns {Record<string, string>}
   */
  function currentDefaults() {
    const d = currentQueue().exec_defaults;
    return d && typeof d === 'object' ? d : {};
  }

  /**
   * Adopt the authoritative queue a mutation reply carries so the view reflects
   * state before the fanout push arrives (and in tests without a socket).
   *
   * @param {any} res
   */
  function adopt(res) {
    if (res && res.queue && queueStore) {
      queueStore.set(res.queue);
    }
  }

  /**
   * Set (or unset with '') a global exec default, retrying ONCE on a CAS conflict
   * against the revision the server just reported — the Worker view `setPolicy`
   * discipline. `''` (the `(기본)` option) is sent as `null` = unset.
   *
   * @param {string} key
   * @param {string} value
   */
  async function save(key, value) {
    if (!transport) {
      return;
    }
    const payload = { key, value: value || null };
    try {
      let res = await transport('worker-queue-set-exec-default', {
        ...payload,
        expected_revision: currentRevision()
      });
      adopt(res);
      if (res && res.conflict) {
        res = await transport('worker-queue-set-exec-default', {
          ...payload,
          expected_revision: currentRevision()
        });
        adopt(res);
      }
      if (res && res.conflict) {
        showToast(
          '전역 실행 설정 저장 실패: 다른 클라이언트와 충돌',
          'error',
          4000
        );
      }
    } catch {
      showToast('전역 실행 설정 저장 실패', 'error', 4000);
    }
  }

  /**
   * Set (or unset with '') a workspace-global policy via `worker-queue-set-policy`,
   * retrying ONCE on a CAS conflict — the same discipline as {@link save} and the
   * Worker view's ctrl-bar policy select (spec §1.3).
   *
   * @param {'merge_policy'|'drift_policy'} key
   * @param {string} value
   */
  async function savePolicy(key, value) {
    if (!transport) {
      return;
    }
    const payload = { key, value: value || null };
    try {
      let res = await transport('worker-queue-set-policy', {
        ...payload,
        expected_revision: currentRevision()
      });
      adopt(res);
      if (res && res.conflict) {
        res = await transport('worker-queue-set-policy', {
          ...payload,
          expected_revision: currentRevision()
        });
        adopt(res);
      }
      if (res && res.conflict) {
        showToast('전역 정책 저장 실패: 다른 클라이언트와 충돌', 'error', 4000);
      }
    } catch {
      showToast('전역 정책 저장 실패', 'error', 4000);
    }
  }

  /**
   * @param {string} key
   * @param {string[]} values
   * @param {string} selected
   * @returns {import('lit-html').TemplateResult}
   */
  function selectRow(key, values, selected) {
    // A stored value that is not in the current catalog (an incompatible
    // cross-key model, e.g. a codex model left over after the runner flipped to
    // claude) renders as its OWN selected `(비호환)` option — never hidden
    // behind `(기본)`. That both surfaces the real saved state and keeps the
    // `(기본)` option a live target: selecting it fires a change that unsets.
    const incompatible = Boolean(selected) && !values.includes(selected);
    return html`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${key}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`전역 ${key}`}
        data-key=${key}
        @change=${(/** @type {Event} */ ev) =>
          void save(key, /** @type {HTMLSelectElement} */ (ev.target).value)}
      >
        <option value="" ?selected=${!selected}>
          ${DEFAULT_LABELS[key] || '(기본)'}
        </option>
        ${incompatible
          ? html`<option value=${selected} ?selected=${true}>
              ${selected} (비호환)
            </option>`
          : ''}
        ${values.map(
          (v) =>
            html`<option value=${v} ?selected=${selected === v}>${v}</option>`
        )}
      </select>
    </div>`;
  }

  /**
   * A workspace-global policy row (merge_policy / drift_policy). The `(기본 …)`
   * option is selected when the queue value is unset, mirroring the ctrl-bar
   * select (spec §1.3).
   *
   * @param {{ key: 'merge_policy'|'drift_policy', values: string[], default_label: string }} row
   * @param {any} queue
   * @returns {import('lit-html').TemplateResult}
   */
  function policyRow(row, queue) {
    const value = typeof queue[row.key] === 'string' ? queue[row.key] : '';
    return html`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${row.key}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`전역 ${row.key}`}
        data-policy-key=${row.key}
        @change=${(/** @type {Event} */ ev) =>
          void savePolicy(
            row.key,
            /** @type {HTMLSelectElement} */ (ev.target).value
          )}
      >
        <option value="" ?selected=${!row.values.includes(value)}>
          ${row.default_label}
        </option>
        ${row.values.map(
          (v) => html`<option value=${v} ?selected=${value === v}>${v}</option>`
        )}
      </select>
    </div>`;
  }

  function doRender() {
    const queue = currentQueue();
    const defaults = currentDefaults();
    const runner = defaults.worker_runner || '';
    render(
      html`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${close}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            <p class="exec-defaults__hint">
              워크스페이스 전역 기본값입니다. bead metadata가 우선하며, '(기본:
              …)'은 이 전역값도 미설정일 때 실제 적용되는 하드코딩·CLI·워크플로
              기본입니다.
            </p>
            ${EXEC_ROWS.map((row) =>
              selectRow(row.key, row.values(runner), defaults[row.key] || '')
            )}
            <p class="exec-defaults__hint exec-defaults__hint--policy">
              전역 정책 (좁은 화면에서 상단 바 대신 여기서 편집)
            </p>
            ${POLICY_ROWS.map((row) => policyRow(row, queue))}
          </div>
        </div>
      `,
      dialog
    );
  }

  // Tracked separately from `dialog.open` so a pushed snapshot still re-renders
  // where `showModal` is unavailable (jsdom) and the native flag never flips.
  let is_open = false;

  // Escape dismisses a native <dialog> without going through close(), so the flag
  // has to follow the element or the dialog could never be reopened.
  const onDialogClose = () => {
    is_open = false;
  };
  dialog.addEventListener('close', onDialogClose);
  dialog.addEventListener('cancel', onDialogClose);

  /** @type {null | (() => void)} */
  let unsubscribe_queue = null;
  if (queueStore && queueStore.subscribe) {
    unsubscribe_queue = queueStore.subscribe(() => {
      if (is_open) {
        doRender();
      }
    });
  }

  function open() {
    if (is_open) {
      return;
    }
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
      if (unsubscribe_queue) {
        unsubscribe_queue();
        unsubscribe_queue = null;
      }
      dialog.remove();
    }
  };
}
