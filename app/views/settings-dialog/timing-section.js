/**
 * The bulk window `전역` tab's `대기·주기` group (UI-ny0h §3.5).
 *
 * Server-global wait, observation, retry, and refresh durations. The group
 * reads and writes only the `timing-settings-snapshot` material: the server's
 * `fields` table owns every range, rung count, unit, and off value, so this
 * file copies none of them. `[저장]` sends only the changed keys in ONE
 * `timing-settings-set`; `[기본값]` and `[모두 기본값]` send `null` for the keys
 * they clear, which removes the override from the server file.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../data/timing-settings-store.js').TimingSettingsState} TimingSettingsState
 * @typedef {import('../../data/timing-settings-store.js').TimingFieldWire} TimingFieldWire
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { isTimingSnapshot } from '../../data/timing-settings-store.js';
import { errorText } from '../../utils/error-text.js';

/** The note under the group title. */
export const TIMING_INTRO =
  '이미 예약된 재시도·재확인 시각은 바뀌지 않고 다음 예약부터 적용됩니다.';

/** Toast shown when the server answered `conflict`. */
export const TIMING_CONFLICT_TOAST =
  '다른 곳에서 먼저 바뀌어 다시 불러왔습니다';

/**
 * The five groups in display order, with the label and one-line meaning of
 * every key. A key the server table lacks (an older server) draws no row; a
 * server key this table lacks draws no row either (fail-quiet).
 *
 * @type {ReadonlyArray<{ id: string, title: string, note: string, rows: ReadonlyArray<{ key: string, label: string }> }>}
 */
export const TIMING_GROUPS = [
  {
    id: 'queue-grace',
    title: '대기 진입',
    note: '대기에 들어온 항목을 자동으로 실행하기 전에 기다리는 시간입니다. 0이면 바로 실행합니다.',
    rows: [{ key: 'queue_grace_seconds', label: '대기 진입 유예' }]
  },
  {
    id: 'external-wait',
    title: '외부 작업 관찰',
    note: '외부 작업(Slurm·프로세스)을 다시 들여다보는 간격입니다. 오류 뒤 백오프는 계약 값 그대로입니다.',
    rows: [
      {
        key: 'external_wait_slurm_interval_seconds',
        label: 'Slurm 작업 관찰 주기'
      },
      {
        key: 'external_wait_process_interval_seconds',
        label: '프로세스 관찰 주기'
      }
    ]
  },
  {
    id: 'retry',
    title: '재시도·재확인',
    note: '막혔거나 실패한 뒤 다시 시도하기까지 기다리는 시간입니다. 사다리는 1회째, 2회째… 순서입니다.',
    rows: [
      { key: 'env_retry_delays_seconds', label: '환경 실패 재시도' },
      { key: 'base_moved_retry_seconds', label: 'base 이동 재개' },
      { key: 'completion_retry_delays_seconds', label: '완료 작업 재시도' },
      {
        key: 'auto_resume_retry_delays_seconds',
        label: '자동 재개 거절 뒤 대기'
      },
      { key: 'provider_outage_backoff_seconds', label: '공급자 장애 재확인' },
      {
        key: 'provider_usage_unknown_reset_seconds',
        label: '한도 리셋 시각 미상 재확인'
      },
      {
        key: 'provider_usage_reset_grace_seconds',
        label: '한도 리셋 뒤 여유'
      }
    ]
  },
  {
    id: 'refresh',
    title: 'PR·목록 새로고침',
    note: 'PR 상태와 이슈 목록을 다시 읽는 주기입니다. 바꾸면 바로 새 주기로 다시 돕니다.',
    rows: [
      { key: 'pr_poll_interval_seconds', label: 'PR 상태 확인 주기' },
      { key: 'list_poll_interval_seconds', label: '목록 새로고침 주기' }
    ]
  },
  {
    id: 'merge-queue',
    title: '머지 큐',
    note: '머지 큐가 해소 세션과 미확정 머지를 기다리는 시간입니다.',
    rows: [
      {
        key: 'merge_resolution_wait_seconds',
        label: '충돌 해소 세션 대기'
      },
      {
        key: 'merge_unconfirmed_poll_seconds',
        label: '머지 미확정 재확인 주기'
      },
      {
        key: 'merge_unconfirmed_wait_seconds',
        label: '머지 미확정 대기 상한'
      }
    ]
  }
];

/**
 * @param {TimingFieldWire} field
 * @returns {string}
 */
function unitLabel(field) {
  return field.unit === 'minutes' ? '분' : '초';
}

/**
 * Seconds as the display number of the field's unit.
 *
 * @param {TimingFieldWire} field
 * @param {number} seconds
 * @returns {number}
 */
function toDisplay(field, seconds) {
  return field.unit === 'minutes' ? seconds / 60 : seconds;
}

/**
 * @param {TimingFieldWire} field
 * @param {number | number[]} value
 * @returns {string[]}
 */
function toInputs(field, value) {
  const list = Array.isArray(value) ? value : [value];
  return list.map((seconds) => String(toDisplay(field, seconds)));
}

/**
 * The default hint: `기본 20초`, a ladder as `기본 2 → 5 → 15분`, and `0이면 끔`
 * for a key that has an off value.
 *
 * @param {TimingFieldWire} field
 * @returns {string}
 */
function defaultHint(field) {
  const value = field.default;
  const off = field.off_value;
  let text;
  if (Array.isArray(value)) {
    text = `기본 ${value.map((seconds) => toDisplay(field, seconds)).join(' → ')}${unitLabel(field)}`;
  } else if (off !== undefined && value === off) {
    text = '기본 끔';
  } else {
    text = `기본 ${toDisplay(field, value)}${unitLabel(field)}`;
  }
  return off === undefined ? text : `${text} · ${off}이면 끔`;
}

/**
 * @param {number | number[]} a
 * @param {number | number[]} b
 * @returns {boolean}
 */
function sameValue(a, b) {
  if (Array.isArray(a) || Array.isArray(b)) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((n, i) => n === b[i])
    );
  }
  return a === b;
}

/**
 * Parse one row's inputs against the server field.
 *
 * @param {TimingFieldWire} field
 * @param {string[]} inputs
 * @returns {{ value: number | number[] | null, reason: string }}
 */
function parseRow(field, inputs) {
  const factor = field.unit === 'minutes' ? 60 : 1;
  /** @type {number[]} */
  const seconds = [];
  for (const text of inputs) {
    const trimmed = text.trim();
    if (trimmed === '') {
      return { value: null, reason: '값을 입력하세요' };
    }
    if (!/^\d+$/.test(trimmed)) {
      return { value: null, reason: '0 이상의 정수만 입력할 수 있습니다' };
    }
    const value = Number(trimmed) * factor;
    if (!(field.off_value !== undefined && value === field.off_value)) {
      if (value < field.min || value > field.max) {
        return {
          value: null,
          reason: `${toDisplay(field, field.min)}${unitLabel(field)} 이상 ${toDisplay(field, field.max)}${unitLabel(field)} 이하여야 합니다`
        };
      }
    }
    seconds.push(value);
  }
  for (let i = 1; i < seconds.length; i++) {
    if (seconds[i] < seconds[i - 1]) {
      return {
        value: null,
        reason: '뒤 칸은 앞 칸보다 줄어들 수 없습니다'
      };
    }
  }
  return {
    value: field.rungs === undefined ? seconds[0] : seconds,
    reason: ''
  };
}

/**
 * Mount the group into `host`.
 *
 * @param {HTMLElement} host
 * @param {{
 *   transport: (type: any, payload?: unknown) => Promise<any>,
 *   timingSettingsStore?: { get: () => TimingSettingsState|null, set?: (state: TimingSettingsState|null) => void, subscribe?: (fn: () => void) => () => void },
 *   toast?: (message: string, kind?: string) => void
 * }} options
 * @returns {{ render: () => void, destroy: () => void }}
 */
export function createTimingSection(host, options) {
  /** @type {Record<string, string[]>} */
  let drafts = {};
  /** @type {Record<string, string>} */
  let server_errors = {};
  let error = '';
  let busy = false;
  /** @type {TimingSettingsState|null} */
  let seen = null;
  /** @type {(() => void)|null} */
  let unsubscribe = null;

  if (options.timingSettingsStore?.subscribe) {
    unsubscribe = options.timingSettingsStore.subscribe(() => doRender());
  }

  /** @returns {TimingSettingsState|null} */
  function snapshot() {
    const state = options.timingSettingsStore?.get() ?? null;
    return isTimingSnapshot(state) ? state : null;
  }

  /**
   * Keep an edit only while the server value under it has not moved; a key the
   * server changed (another window, a refused save's fresh snapshot) shows the
   * new value.
   *
   * @param {TimingSettingsState} state
   */
  function syncDrafts(state) {
    if (seen === state) {
      return;
    }
    if (seen && seen.revision === state.revision) {
      seen = state;
      return;
    }
    /** @type {Record<string, string[]>} */
    const next = {};
    for (const [key, inputs] of Object.entries(drafts)) {
      const before = seen?.values[key];
      const after = state.values[key];
      if (
        before !== undefined &&
        after !== undefined &&
        sameValue(before, after)
      ) {
        next[key] = inputs;
      }
    }
    drafts = next;
    server_errors = {};
    seen = state;
  }

  /**
   * @param {TimingSettingsState} state
   * @param {string} key
   * @returns {string[]}
   */
  function inputsOf(state, key) {
    return drafts[key] ?? toInputs(state.fields[key], state.values[key]);
  }

  /**
   * @param {TimingSettingsState} state
   * @param {string} key
   * @returns {{ value: number | number[] | null, reason: string }}
   */
  function parsedOf(state, key) {
    return parseRow(state.fields[key], inputsOf(state, key));
  }

  /**
   * The keys whose valid draft differs from the server's value.
   *
   * @param {TimingSettingsState} state
   * @returns {Record<string, number | number[]>}
   */
  function changedValues(state) {
    /** @type {Record<string, number | number[]>} */
    const changed = {};
    for (const key of Object.keys(drafts)) {
      if (!state.fields[key]) {
        continue;
      }
      const { value } = parsedOf(state, key);
      if (value !== null && !sameValue(value, state.values[key])) {
        changed[key] = value;
      }
    }
    return changed;
  }

  /**
   * @param {TimingSettingsState} state
   * @returns {boolean}
   */
  function hasInvalidDraft(state) {
    return Object.keys(drafts).some(
      (key) => !!state.fields[key] && parsedOf(state, key).reason !== ''
    );
  }

  /**
   * Adopt a server snapshot into the shared store.
   *
   * @param {any} next
   */
  function adopt(next) {
    if (isTimingSnapshot(next)) {
      options.timingSettingsStore?.set?.({
        revision: next.revision,
        values: next.values,
        overrides: next.overrides,
        fields: next.fields
      });
    }
  }

  /**
   * Send one request and settle its outcome on the screen.
   *
   * @param {TimingSettingsState} base
   * @param {Record<string, number | number[] | null>} values
   */
  async function submit(base, values) {
    if (busy || Object.keys(values).length === 0) {
      return;
    }
    busy = true;
    error = '';
    doRender();
    try {
      const res = await options.transport('timing-settings-set', {
        expected_revision: base.revision,
        values
      });
      if (res?.ok === false) {
        adopt(res.snapshot);
        if (res.code === 'conflict') {
          drafts = {};
          options.toast?.(TIMING_CONFLICT_TOAST, 'warning');
        } else if (
          res.code === 'invalid_value' &&
          typeof res.key === 'string'
        ) {
          server_errors = {
            [res.key]: String(res.message || '서버가 값을 거절했습니다')
          };
        } else {
          error = `대기·주기 저장 실패: ${String(res.message || res.code)}`;
        }
      } else {
        for (const key of Object.keys(values)) {
          delete drafts[key];
        }
        adopt(res?.snapshot);
      }
    } catch (err) {
      adopt(/** @type {any} */ (err)?.details?.snapshot);
      error = `대기·주기 저장 실패: ${errorText(err)}`;
    } finally {
      busy = false;
      doRender();
    }
  }

  /** `[저장]`: only the keys that changed, in one request. */
  function onSave() {
    const state = snapshot();
    if (!state || hasInvalidDraft(state)) {
      return;
    }
    void submit(state, changedValues(state));
  }

  /**
   * `[기본값]`: drop one key's override on the server, or just the edit when the
   * key was never overridden.
   *
   * @param {string} key
   */
  function onResetRow(key) {
    const state = snapshot();
    if (!state) {
      return;
    }
    delete drafts[key];
    if (Object.hasOwn(state.overrides, key)) {
      void submit(state, { [key]: null });
      return;
    }
    doRender();
  }

  /** `[모두 기본값]`: drop every override in one request. */
  function onResetAll() {
    const state = snapshot();
    if (!state) {
      return;
    }
    drafts = {};
    /** @type {Record<string, null>} */
    const cleared = {};
    for (const key of Object.keys(state.overrides)) {
      cleared[key] = null;
    }
    if (Object.keys(cleared).length === 0) {
      doRender();
      return;
    }
    void submit(state, cleared);
  }

  /**
   * @param {TimingSettingsState} state
   * @param {string} key
   * @param {number} index
   * @param {string} text
   */
  function onInput(state, key, index, text) {
    const inputs = [...inputsOf(state, key)];
    inputs[index] = text;
    drafts[key] = inputs;
    delete server_errors[key];
    doRender();
  }

  /**
   * @param {TimingSettingsState} state
   * @param {{ key: string, label: string }} row
   * @returns {TemplateResult|''}
   */
  function rowTemplate(state, row) {
    const field = state.fields[row.key];
    if (!field || state.values[row.key] === undefined) {
      return '';
    }
    const inputs = inputsOf(state, row.key);
    const dirty = drafts[row.key] !== undefined;
    // A stored value is never second-guessed: only an edit is checked, so a
    // config.toml default outside the range draws no complaint.
    const reason =
      (dirty ? parsedOf(state, row.key).reason : '') || server_errors[row.key];
    const changed =
      Object.hasOwn(state.overrides, row.key) ||
      (dirty && !sameValue(parseRow(field, inputs).value ?? -1, field.default));
    return html`<div class="settings-timing__row" data-key=${row.key}>
      <div class="settings-timing__line">
        <span class="settings-timing__name">${row.label}</span>
        <span class="settings-timing__inputs">
          ${inputs.map(
            (text, index) =>
              html`${index > 0
                  ? html`<span class="settings-timing__arrow" aria-hidden="true"
                      >→</span
                    >`
                  : ''}<input
                  type="number"
                  class="ui-input settings-timing__input"
                  inputmode="numeric"
                  step="1"
                  min="0"
                  aria-label=${field.rungs === undefined
                    ? row.label
                    : `${row.label} ${index + 1}회째`}
                  data-index=${index}
                  .value=${live(text)}
                  ?disabled=${busy}
                  @input=${(/** @type {Event} */ ev) =>
                    onInput(
                      state,
                      row.key,
                      index,
                      /** @type {HTMLInputElement} */ (ev.target).value
                    )}
                />`
          )}
          <span class="settings-timing__unit">${unitLabel(field)}</span>
        </span>
        <span class="settings-timing__default">${defaultHint(field)}</span>
        ${changed
          ? html`<button
              type="button"
              class="op-btn settings-timing__reset"
              data-action="timing-reset"
              ?disabled=${busy}
              @click=${() => onResetRow(row.key)}
            >
              기본값
            </button>`
          : ''}
      </div>
      ${reason
        ? html`<p class="settings-chips__error settings-timing__error">
            ${reason}
          </p>`
        : ''}
    </div>`;
  }

  /**
   * @param {TimingSettingsState} state
   * @param {(typeof TIMING_GROUPS)[number]} group
   * @returns {TemplateResult|''}
   */
  function groupTemplate(state, group) {
    const rows = group.rows.filter((row) => !!state.fields[row.key]);
    if (rows.length === 0) {
      return '';
    }
    return html`<div
      class="settings-timing__group"
      data-timing-group=${group.id}
    >
      <div class="settings-timing__title">${group.title}</div>
      ${rows.map((row) => rowTemplate(state, row))}
      <p class="settings-dialog__hint-block">${group.note}</p>
    </div>`;
  }

  function doRender() {
    const state = snapshot();
    if (!state) {
      render(html``, host);
      return;
    }
    syncDrafts(state);
    const invalid = hasInvalidDraft(state);
    const can_save =
      !busy && !invalid && Object.keys(changedValues(state)).length > 0;
    const has_override = Object.keys(state.overrides).length > 0;
    const has_draft = Object.keys(drafts).length > 0;
    render(
      html`<section class="settings-dialog__group" data-group="timing">
        <div class="settings-dialog__group-title">대기·주기</div>
        <p class="settings-dialog__hint-block">${TIMING_INTRO}</p>
        ${TIMING_GROUPS.map((group) => groupTemplate(state, group))}
        <div class="settings-timing__foot">
          <button
            type="button"
            class="op-btn op-btn--primary"
            data-action="timing-save"
            ?disabled=${!can_save}
            @click=${onSave}
          >
            저장
          </button>
          <button
            type="button"
            class="op-btn"
            data-action="timing-reset-all"
            ?disabled=${busy || (!has_override && !has_draft)}
            @click=${onResetAll}
          >
            모두 기본값
          </button>
        </div>
        ${error ? html`<p class="settings-chips__error">${error}</p>` : ''}
      </section>`,
      host
    );
  }

  return {
    render: doRender,
    destroy() {
      unsubscribe?.();
      unsubscribe = null;
    }
  };
}
