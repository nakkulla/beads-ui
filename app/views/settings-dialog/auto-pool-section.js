/**
 * The settings dialog `프리셋·모델` tab's `auto 후보` group (UI-y7h1 §3.4).
 *
 * One line per runtime: a `기본값 따르기` toggle, the low and high candidate
 * model slots, and the effort min and max. The document is server-global, so
 * this group reads and writes only the `auto-pool-snapshot` material.
 *
 * The first change opens a draft of the WHOLE document together with the
 * revision it started from. While the draft lives, an incoming snapshot only
 * shows `다른 곳에서 바뀌었습니다`; a save then meets `conflict`, which adopts
 * the answered revision as the new base and keeps the draft, so the next save
 * carries it. Without a draft a snapshot redraws the group at once.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../data/auto-pool-store.js').AutoPoolState} AutoPoolState
 * @typedef {import('../../data/auto-pool-store.js').AutoPoolChoice} AutoPoolChoice
 * @typedef {{ follow: boolean, low: string, high: string, min: string, max: string }} RowDraft
 * @typedef {{ base_revision: number, rows: Record<string, RowDraft> }} AutoPoolDraft
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { isAutoPoolSnapshot } from '../../data/auto-pool-store.js';
import { errorText } from '../../utils/error-text.js';
import {
  disabledModelsOf,
  visibleModelChoices
} from '../../utils/model-visibility.js';

/** The runtimes in display order. */
const RUNTIMES = ['claude', 'codex'];

/** Subheading per runtime key. */
const RUNTIME_LABELS = /** @type {Record<string, string>} */ ({
  claude: 'Claude',
  codex: 'Codex'
});

/** The info line under the group title. */
export const AUTO_POOL_INTRO =
  '모델·effort가 auto인 구현 단위에만 쓰입니다. 직접 지정한 값은 그대로 이깁니다.';

/** Under a runtime with no candidate model. */
export const AUTO_POOL_EMPTY_HINT = 'auto가 이 런타임을 고르지 않습니다';

/** Under a runtime with exactly one candidate model. */
export const AUTO_POOL_SINGLE_HINT = '모델 실험 없이 이 모델만 씁니다';

/** While a draft lives and another window saved meanwhile. */
export const AUTO_POOL_STALE_LINE = '다른 곳에서 바뀌었습니다';

/** A followed runtime while the pinned projection has no defaults key. */
export const AUTO_POOL_DEFAULTS_UNKNOWN = '기본값(dotfiles가 정함)';

/** Option label suffix of a stored Codex name the server catalog lacks. */
export const AUTO_POOL_NOT_IN_CATALOG = '계정 목록에 없음';

/**
 * What each `auto-pool-set` refusal means (server `AutoPoolErrorCode`).
 */
const REFUSAL_SENTENCES = /** @type {Record<string, string>} */ ({
  conflict:
    '다른 곳에서 먼저 바뀌었습니다 — 지금 초안을 다시 저장하면 그 값으로 바뀝니다',
  invalid_auto_pool:
    '후보 형식이 올바르지 않습니다(모델은 두 개까지, 겹치지 않게)',
  unknown_model: 'auto 후보로 쓸 수 없는 모델입니다',
  invalid_effort_range: 'effort 범위가 올바르지 않습니다(최소 ≤ 최대 ≤ xhigh)'
});

/**
 * The refusal line: the sentence and, for tracing, the code itself.
 *
 * @param {string} code
 * @returns {string}
 */
function refusalText(code) {
  return `auto 후보 저장 실패 — ${REFUSAL_SENTENCES[code]} (${code})`;
}

/**
 * The candidate models a row holds, lowest slot first; an empty slot (`없음`)
 * is dropped.
 *
 * @param {RowDraft} row
 * @returns {string[]}
 */
export function rowModels(row) {
  return [row.low, row.high].filter((name) => name.length > 0);
}

/**
 * The row a snapshot shows for one runtime. An unstored runtime follows the
 * defaults; its values are the projection defaults when present, else no
 * model and the catalog's first effort up to `xhigh`, so turning the toggle
 * off starts from a valid range.
 *
 * @param {AutoPoolState} state
 * @param {string} runtime
 * @returns {RowDraft}
 */
function rowFromSnapshot(state, runtime) {
  const stored = state.runtimes[runtime];
  if (stored) {
    return {
      follow: false,
      low: stored.models[0] ?? '',
      high: stored.models[1] ?? '',
      min: stored.effort.min,
      max: stored.effort.max
    };
  }
  const choice = state.choices[runtime];
  const defaults = choice?.defaults ?? null;
  if (defaults) {
    return {
      follow: true,
      low: defaults.models[0] ?? '',
      high: defaults.models[1] ?? '',
      min: defaults.effort.min,
      max: defaults.effort.max
    };
  }
  const efforts = Array.isArray(choice?.efforts) ? choice.efforts : [];
  return {
    follow: true,
    low: '',
    high: '',
    min: efforts[0] ?? '',
    max: efforts.includes('xhigh') ? 'xhigh' : (efforts.at(-1) ?? '')
  };
}

/**
 * Mount the group into `host`.
 *
 * @param {HTMLElement} host
 * @param {{
 *   transport: (type: any, payload?: unknown) => Promise<any>,
 *   autoPoolStore?: { get: () => AutoPoolState|null, set?: (state: AutoPoolState|null) => void, subscribe?: (fn: () => void) => () => void },
 *   modelVisibilityStore?: { get: () => any, subscribe?: (fn: () => void) => () => void },
 *   notify?: (message: string) => void
 * }} options
 * @returns {{ render: () => void, destroy: () => void }}
 */
export function createAutoPoolSection(host, options) {
  /** @type {AutoPoolDraft|null} */
  let draft = null;
  let busy = false;
  /** Section-level refusal line (`conflict`, or a refusal naming no runtime). */
  let error = '';
  /** @type {Record<string, string>} */
  let row_errors = {};
  /** @type {Array<() => void>} */
  const unsubscribers = [];

  if (options.autoPoolStore?.subscribe) {
    unsubscribers.push(options.autoPoolStore.subscribe(() => doRender()));
  }
  if (options.modelVisibilityStore?.subscribe) {
    unsubscribers.push(
      options.modelVisibilityStore.subscribe(() => doRender())
    );
  }

  /** @returns {AutoPoolState|null} */
  function snapshot() {
    const state = options.autoPoolStore?.get() ?? null;
    return isAutoPoolSnapshot(state) ? state : null;
  }

  /**
   * Adopt a server snapshot into the shared store.
   *
   * @param {unknown} next
   */
  function adopt(next) {
    if (isAutoPoolSnapshot(next)) {
      options.autoPoolStore?.set?.(next);
    }
  }

  /**
   * Open the draft from the current snapshot on the first change.
   *
   * @param {AutoPoolState} state
   * @returns {AutoPoolDraft}
   */
  function ensureDraft(state) {
    if (!draft) {
      /** @type {Record<string, RowDraft>} */
      const rows = {};
      for (const runtime of RUNTIMES) {
        rows[runtime] = rowFromSnapshot(state, runtime);
      }
      draft = { base_revision: state.revision, rows };
    }
    return draft;
  }

  /**
   * @param {string} runtime
   * @param {Partial<RowDraft>} patch
   */
  function onChange(runtime, patch) {
    const state = snapshot();
    if (!state || busy) {
      return;
    }
    const current = ensureDraft(state);
    current.rows[runtime] = { ...current.rows[runtime], ...patch };
    delete row_errors[runtime];
    doRender();
  }

  /**
   * The whole document the draft describes: followed runtimes are absent.
   *
   * @param {AutoPoolDraft} current
   * @returns {Record<string, { models: string[], effort: { min: string, max: string } }>}
   */
  function documentOf(current) {
    /** @type {Record<string, { models: string[], effort: { min: string, max: string } }>} */
    const runtimes = {};
    for (const runtime of RUNTIMES) {
      const row = current.rows[runtime];
      if (row && !row.follow) {
        runtimes[runtime] = {
          models: rowModels(row),
          effort: { min: row.min, max: row.max }
        };
      }
    }
    return runtimes;
  }

  async function onSave() {
    const current = draft;
    if (!current || busy) {
      return;
    }
    busy = true;
    error = '';
    row_errors = {};
    doRender();
    try {
      const res = await options.transport('auto-pool-set', {
        expected_revision: current.base_revision,
        runtimes: documentOf(current)
      });
      draft = null;
      adopt(res?.snapshot);
    } catch (err) {
      const code = /** @type {any} */ (err)?.code;
      const received = /** @type {any} */ (err)?.details?.snapshot;
      if (code === 'conflict' && isAutoPoolSnapshot(received)) {
        current.base_revision = received.revision;
        error = refusalText(code);
      } else if (typeof code === 'string' && REFUSAL_SENTENCES[code]) {
        const runtime = /** @type {any} */ (err)?.details?.runtime;
        if (typeof runtime === 'string' && RUNTIMES.includes(runtime)) {
          row_errors[runtime] = refusalText(code);
        } else {
          error = refusalText(code);
        }
      } else {
        options.notify?.(`auto 후보 저장 실패: ${errorText(err)}`);
      }
      adopt(received);
    } finally {
      busy = false;
      doRender();
    }
  }

  function onCancel() {
    if (busy) {
      return;
    }
    draft = null;
    error = '';
    row_errors = {};
    doRender();
  }

  /**
   * The model options of one slot: the snapshot's choices without hidden
   * models, plus every name stored now or picked in the draft.
   *
   * @param {AutoPoolChoice|undefined} choice
   * @param {ReadonlyArray<string>} keep
   * @returns {string[]}
   */
  function modelOptions(choice, keep) {
    const base = Array.isArray(choice?.models) ? choice.models : [];
    const visible = visibleModelChoices(
      base,
      disabledModelsOf(options.modelVisibilityStore)
    );
    for (const name of keep) {
      if (name.length > 0 && !visible.includes(name)) {
        visible.push(name);
      }
    }
    return visible;
  }

  /**
   * @param {string} runtime
   * @param {AutoPoolChoice|undefined} choice
   * @param {string} name
   * @returns {string}
   */
  function modelLabel(runtime, choice, name) {
    const catalog = choice?.catalog_models;
    return runtime === 'codex' &&
      Array.isArray(catalog) &&
      catalog.length > 0 &&
      !catalog.includes(name)
      ? `${name} · ${AUTO_POOL_NOT_IN_CATALOG}`
      : name;
  }

  /**
   * @param {string} label
   * @param {string} value
   * @param {Array<{ value: string, label: string }>} entries
   * @param {Record<string, string>} data
   * @param {(value: string) => void} onPick
   * @returns {TemplateResult}
   */
  function selectField(label, value, entries, data, onPick) {
    return html`<label class="ui-field">
      ${label}
      <select
        data-auto-pool-field=${data.field}
        data-runtime=${data.runtime}
        .value=${live(value)}
        ?disabled=${busy}
        @change=${(/** @type {Event} */ ev) =>
          onPick(/** @type {HTMLSelectElement} */ (ev.target).value)}
      >
        ${entries.map(
          (entry) =>
            html`<option
              value=${entry.value}
              ?selected=${entry.value === value}
            >
              ${entry.label}
            </option>`
        )}
      </select>
    </label>`;
  }

  /**
   * @param {AutoPoolState} state
   * @param {string} runtime
   * @returns {TemplateResult}
   */
  function runtimeTemplate(state, runtime) {
    const choice = state.choices[runtime];
    const row = draft ? draft.rows[runtime] : rowFromSnapshot(state, runtime);
    const stored = state.runtimes[runtime]?.models ?? [];
    const names = modelOptions(choice, [...stored, row.low, row.high]);
    const model_entries = [
      { value: '', label: '없음' },
      ...names.map((name) => ({
        value: name,
        label: modelLabel(runtime, choice, name)
      }))
    ];
    const efforts = Array.isArray(choice?.efforts) ? [...choice.efforts] : [];
    for (const value of [row.min, row.max]) {
      if (value.length > 0 && !efforts.includes(value)) {
        efforts.push(value);
      }
    }
    const effort_entries = efforts.map((value) => ({ value, label: value }));
    const defaults = choice?.defaults ?? null;
    const count = rowModels(row).length;
    const hint = row.follow
      ? defaults
        ? `기본값: ${defaults.models.join(' → ') || '없음'} · effort ${defaults.effort.min}~${defaults.effort.max}`
        : AUTO_POOL_DEFAULTS_UNKNOWN
      : count === 0
        ? AUTO_POOL_EMPTY_HINT
        : count === 1
          ? AUTO_POOL_SINGLE_HINT
          : '';
    return html`<div
      class="settings-dialog__model-runner"
      data-auto-pool-runtime=${runtime}
    >
      <div class="settings-dialog__model-runner-title">
        ${RUNTIME_LABELS[runtime] ?? runtime}
      </div>
      <div class="settings-dialog__toggles">
        <label class="settings-dialog__toggle">
          <input
            type="checkbox"
            data-auto-pool-follow=${runtime}
            .checked=${live(row.follow)}
            ?disabled=${busy}
            @change=${(/** @type {Event} */ ev) =>
              onChange(runtime, {
                follow: /** @type {HTMLInputElement} */ (ev.target).checked
              })}
          />
          <span>기본값 따르기</span>
        </label>
        ${row.follow
          ? ''
          : html`${selectField(
              '낮은 자리',
              row.low,
              model_entries,
              { field: 'low', runtime },
              (value) => onChange(runtime, { low: value })
            )}
            ${selectField(
              '높은 자리',
              row.high,
              model_entries,
              { field: 'high', runtime },
              (value) => onChange(runtime, { high: value })
            )}
            ${selectField(
              'effort 최소',
              row.min,
              effort_entries,
              { field: 'min', runtime },
              (value) => onChange(runtime, { min: value })
            )}
            ${selectField(
              'effort 최대',
              row.max,
              effort_entries,
              { field: 'max', runtime },
              (value) => onChange(runtime, { max: value })
            )}`}
      </div>
      ${hint
        ? html`<p class="settings-dialog__hint" data-auto-pool-hint=${runtime}>
            ${hint}
          </p>`
        : ''}
      ${row_errors[runtime]
        ? html`<p class="settings-chips__error" data-auto-pool-error=${runtime}>
            ${row_errors[runtime]}
          </p>`
        : ''}
    </div>`;
  }

  function doRender() {
    const state = snapshot();
    if (!state) {
      render(html``, host);
      return;
    }
    const stale = draft !== null && state.revision !== draft.base_revision;
    render(
      html`<section class="settings-dialog__group" data-group="auto-pool">
        <div class="settings-dialog__group-title">auto 후보</div>
        <p class="settings-dialog__hint">${AUTO_POOL_INTRO}</p>
        ${RUNTIMES.map((runtime) => runtimeTemplate(state, runtime))}
        ${stale
          ? html`<p class="settings-dialog__hint" data-auto-pool-stale>
              ${AUTO_POOL_STALE_LINE}
            </p>`
          : ''}
        <div class="settings-timing__foot">
          <button
            type="button"
            class="op-btn op-btn--primary"
            data-auto-pool-save
            ?disabled=${!draft || busy}
            @click=${() => void onSave()}
          >
            저장
          </button>
          <button
            type="button"
            class="op-btn"
            data-auto-pool-cancel
            ?disabled=${!draft || busy}
            @click=${onCancel}
          >
            취소
          </button>
        </div>
        ${error
          ? html`<p class="settings-chips__error" data-auto-pool-error>
              ${error}
            </p>`
          : ''}
      </section>`,
      host
    );
  }

  return {
    render: doRender,
    destroy() {
      for (const unsubscribe of unsubscribers.splice(0)) {
        unsubscribe();
      }
    }
  };
}
