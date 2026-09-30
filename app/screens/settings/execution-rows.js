/**
 * The `실행` pane's row templates: the `(기본)`-first select, the free-text
 * row, the checkbox row, a review gate's model · effort · 속도 row, and the
 * quick_fix row that resolves against the general layer behind it. Split out
 * of `execution-pane.js` (UI-dbn6); every edit goes back through the pane's own
 * handlers, so a row holds no state.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {Object} ExecutionRowsContext
 * @property {{ modelVisibilityStore?: { get: () => any } }} binding
 * @property {() => Record<string, any>|null} executionProjection
 * @property {() => any} runnerCatalog
 * @property {() => Record<string, string>} sessionDraft - The in-progress
 * session-defaults edits over the server baseline.
 * @property {() => Record<string, string>} sessionTextDraft - Uncommitted text.
 * @property {() => Record<string, true>} sessionTextInvalid - Failed commits.
 * @property {(key: string, raw: string) => void} onTextInput
 * @property {(key: string, raw: string, isValid: (value: string) => boolean) => void} onTextCommit
 * @property {(key: string, value: string) => void} onSessionChange
 * @property {() => boolean} supportsQuickFixLane
 * @property {() => Record<string, string|null>} currentOrchestrationValues
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import {
  disabledModelsOf,
  visibleChoicesForKey
} from '../../model/model-visibility.js';
import {
  BOOLEAN_DRAFT_ON,
  REVIEW_EFFORTS,
  REVIEW_SPEEDS,
  buildExecutionOptionView
} from '../../model/session-model.js';
import { QUICK_FIX_UNSUPPORTED, UNSET } from './execution-shared.js';

/**
 * Build the row templates over one pane's state.
 *
 * @param {ExecutionRowsContext} ctx
 */
export function createExecutionRows(ctx) {
  const { executionProjection, runnerCatalog, onSessionChange } = ctx;

  /**
   * The bare `(기본)`-first select control. `?selected` covers the first
   * render (a `.value` property binding lands before the option children
   * exist) and `live(...)` re-syncs later renders against DOM state.
   *
   * @param {string} key
   * @param {string} label
   * @param {ReadonlyArray<string>} choices
   * @param {(key: string, value: string) => void} onChange
   * @param {Record<string, string|null|undefined>} source
   * @param {boolean} [disabled]
   * @param {Record<string, string|null|undefined>} [resolution_source] - Label
   * resolution input when the row's own source is not the whole workspace layer.
   * @param {string|null} [route]
   * @returns {TemplateResult}
   */
  function selectControl(
    key,
    label,
    choices,
    onChange,
    source,
    disabled,
    resolution_source,
    route
  ) {
    const selected = source[key] ?? UNSET;
    const visible = visibleChoicesForKey(
      key,
      choices,
      disabledModelsOf(ctx.binding.modelVisibilityStore),
      executionProjection()
    );
    const view = buildExecutionOptionView(
      key,
      visible.choices,
      source,
      executionProjection(),
      runnerCatalog(),
      resolution_source,
      route,
      visible.hidden_choices
    );
    const selected_option = view.options.find(
      (option) => option.value === selected
    );
    const full_value =
      selected === UNSET ? view.full_value : selected_option?.full_value;
    return html`<select
        class=${`ui-select${selected === UNSET ? ' settings-dialog__unset' : ''}`}
        data-key=${key}
        aria-label=${label}
        title=${full_value || ''}
        ?disabled=${disabled === true ||
        (route !== 'quick_fix' && view.disabled)}
        .value=${live(String(selected))}
        @change=${(/** @type {Event} */ ev) =>
          onChange(
            key,
            String(/** @type {HTMLSelectElement} */ (ev.target).value)
          )}
      >
        <option value=${UNSET} ?selected=${selected === UNSET}>
          ${view.unset_label}
        </option>
        ${view.options.map(
          (option) =>
            html`<option
              value=${option.value}
              title=${option.full_value || ''}
              ?selected=${option.value === selected}
            >
              ${option.label}
            </option>`
        )}
      </select>
      ${selected === UNSET
        ? html`<span class="settings-dialog__source-badge">기본</span>`
        : ''}`;
  }

  /**
   * One `(기본)`-first select row.
   *
   * @param {string} key
   * @param {string} label
   * @param {ReadonlyArray<string>} choices
   * @param {(key: string, value: string) => void} onChange
   * @param {Record<string, string|null|undefined>} source
   * @param {boolean} [disabled]
   * @param {Record<string, string|null|undefined>} [resolution_source]
   * @param {string|null} [route]
   * @param {string|null} [disabled_title]
   * @returns {TemplateResult}
   */
  function selectRow(
    key,
    label,
    choices,
    onChange,
    source,
    disabled = false,
    resolution_source,
    route = null,
    disabled_title = null
  ) {
    return html`<div
      class=${`settings-dialog__row${disabled ? ' settings-dialog__row--off' : ''}`}
      title=${disabled && disabled_title ? disabled_title : ''}
    >
      <span class="settings-dialog__row-label">${label}</span>
      <span class="settings-dialog__controls">
        ${selectControl(
          key,
          label,
          choices,
          onChange,
          source,
          disabled,
          resolution_source,
          route
        )}
      </span>
    </div>`;
  }

  /**
   * One free-text session-default row, for a workspace kv key the contract
   * types `enum: none` — no `(기본)`-first select can carry it, so the row
   * offers a box whose empty state IS the unset state.
   *
   * Keystrokes only record; the commit fires on `change` (blur/Enter), because
   * a half-typed URL is not a value worth asking the server to store.
   *
   * @param {string} key
   * @param {string} label
   * @param {string} placeholder
   * @param {string} hint - What the value is FOR, shown while the box is valid.
   * @param {string} format_hint - What a legal value looks like, shown instead
   * once a committed value fails the format.
   * @param {(value: string) => boolean} isValid
   * @returns {TemplateResult}
   */
  function textRow(key, label, placeholder, hint, format_hint, isValid) {
    const invalid = Object.hasOwn(ctx.sessionTextInvalid(), key);
    const value =
      ctx.sessionTextDraft()[key] ?? ctx.sessionDraft()[key] ?? UNSET;
    return html`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${label}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`ui-input settings-dialog__text${invalid ? ' settings-dialog__text--invalid' : ''}`}
          data-key=${key}
          aria-label=${label}
          aria-invalid=${String(invalid)}
          placeholder=${placeholder}
          .value=${live(value)}
          @input=${(/** @type {Event} */ ev) =>
            ctx.onTextInput(
              key,
              String(/** @type {HTMLInputElement} */ (ev.target).value)
            )}
          @change=${(/** @type {Event} */ ev) =>
            ctx.onTextCommit(
              key,
              String(/** @type {HTMLInputElement} */ (ev.target).value).trim(),
              isValid
            )}
        />
        ${value.length === 0
          ? html`<span class="settings-dialog__source-badge">기본</span>`
          : ''}
        <span class="settings-dialog__hint" data-key-hint=${key}
          >${invalid ? format_hint : hint}</span
        >
      </span>
    </div>`;
  }

  /**
   * One `type: bool` session key as a checkbox. The draft holds the marker
   * string, so the row reuses `onSessionChange` unchanged: checking writes the
   * marker and unchecking drops the key, which `buildSessionDefaultsPatch`
   * turns into the JSON boolean and the deletion request respectively.
   *
   * @param {string} key
   * @param {string} label - The row's short category, left of the box.
   * @param {string} check_label - What the checkbox itself promises to do.
   * @param {string} hint
   * @returns {TemplateResult}
   */
  function checkRow(key, label, check_label, hint) {
    return html`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${label}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${key}
            .checked=${ctx.sessionDraft()[key] === BOOLEAN_DRAFT_ON}
            @change=${(/** @type {Event} */ ev) =>
              onSessionChange(
                key,
                /** @type {HTMLInputElement} */ (ev.target).checked
                  ? BOOLEAN_DRAFT_ON
                  : UNSET
              )}
          />
          ${check_label}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${key}>${hint}</span>
      </span>
    </div>`;
  }

  /**
   * One review gate row: the gate's stage dot, its model select, and its
   * effort select side by side (spec §D — 게이트당 모델+effort 쌍).
   *
   * @param {string} label
   * @param {string} stage - Stage token suffix (spec|plan|impl).
   * @param {string} model_key
   * @param {ReadonlyArray<string>} model_choices
   * @param {string} effort_key
   * @param {string} speed_key
   * @param {boolean} speed_visible - `false` drops the 속도 control entirely.
   * @returns {TemplateResult}
   */
  function gateRow(
    label,
    stage,
    model_key,
    model_choices,
    effort_key,
    speed_key,
    speed_visible
  ) {
    const session_draft = ctx.sessionDraft();
    return html`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${stage}-on)`}
        ></i>
        ${label}
      </span>
      <span class="settings-dialog__controls">
        ${selectControl(
          model_key,
          `${label} 모델`,
          model_choices,
          onSessionChange,
          session_draft,
          false
        )}
        ${selectControl(
          effort_key,
          `${label} effort`,
          REVIEW_EFFORTS,
          onSessionChange,
          session_draft,
          false
        )}
        ${speed_visible
          ? selectControl(
              speed_key,
              `${label} 속도`,
              REVIEW_SPEEDS,
              onSessionChange,
              session_draft,
              false
            )
          : ''}
      </span>
    </div>`;
  }

  /** Copy a server with no quick_fix lane locks the whole tab with (§6.1). */
  function quickFixDisabledTitle() {
    return ctx.supportsQuickFixLane() ? null : QUICK_FIX_UNSUPPORTED;
  }

  /**
   * One quick_fix row. The rows edit the PREFIXED storage keys the kv object
   * and the queue keep, and the label resolution sees the general layer behind
   * them so an empty row names what it falls through to.
   *
   * @param {string} key
   * @param {string} label
   * @param {ReadonlyArray<string>} choices
   * @param {(key: string, value: string) => void} onChange
   * @param {Record<string, string|null|undefined>} source
   * @returns {TemplateResult}
   */
  function quickFixRow(key, label, choices, onChange, source) {
    return selectRow(
      key,
      label,
      choices,
      onChange,
      source,
      !ctx.supportsQuickFixLane(),
      { ...ctx.sessionDraft(), ...ctx.currentOrchestrationValues() },
      'quick_fix',
      quickFixDisabledTitle()
    );
  }

  return {
    selectRow,
    textRow,
    checkRow,
    gateRow,
    quickFixRow,
    quickFixDisabledTitle
  };
}
