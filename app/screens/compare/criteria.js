/**
 * The compare screen's `문제 기준` popover (compare-redesign §3.4, UI-dbn6
 * §3.9): which signals make a session a problem session, with the review
 * thresholds, the duration/cost factors over the baseline median, `핀 조정`,
 * and `기본값으로`. The owner keeps the choice (and its localStorage copy);
 * every change here is one callback, and the next `get-compare` carries it.
 * A `●` on the trigger says the effective criteria are not the defaults.
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { PROBLEM_CRITERIA_LIMITS } from '../../utils/compare-problem-criteria.js';

/**
 * @typedef {Object} CriteriaHandlers
 * @property {(key: string, field: string, value: unknown) => void} onChange
 * @property {(field: 'round_min'|'blocking_min'|'minor_min', raw: string) => void} onReviewThreshold
 * @property {(key: 'duration'|'cost', raw: string) => void} onFactor
 * @property {() => void} onReset
 * @property {(open: boolean) => void} onToggle
 */

/**
 * @param {{ effective: Record<string, any>, is_default: boolean }} criteria
 * @param {boolean} open
 * @param {CriteriaHandlers} handlers
 */
export function criteriaTemplate(criteria, open, handlers) {
  const effective = criteria.effective;
  /**
   * @param {string} key - Criterion key.
   * @param {string} label - Visible label.
   * @param {unknown} [controls] - Optional auxiliary controls.
   */
  const row = (key, label, controls = null) => html`
    <div class="cmp-criteria__row">
      <label class="cmp-criteria__main">
        <input
          type="checkbox"
          .checked=${live(effective[key].on)}
          @change=${(/** @type {Event} */ ev) =>
            handlers.onChange(
              key,
              'on',
              /** @type {HTMLInputElement} */ (ev.currentTarget).checked
            )}
        />
        ${label}
      </label>
      ${controls}
    </div>
  `;
  /** @param {'round_min'|'blocking_min'|'minor_min'} field */
  const reviewInput = (field) => {
    const limits = PROBLEM_CRITERIA_LIMITS[field];
    return html`<input
      class="ui-input ui-input--num cmp-criteria__number"
      type="number"
      min=${limits.min}
      max=${limits.max}
      step="1"
      .value=${live(
        effective.review[field] === null ? '' : String(effective.review[field])
      )}
      ?disabled=${!effective.review.on}
      @change=${(/** @type {Event} */ ev) =>
        handlers.onReviewThreshold(
          field,
          /** @type {HTMLInputElement} */ (ev.currentTarget).value
        )}
    />`;
  };
  /** @param {'duration'|'cost'} key */
  const factorInput = (key) =>
    html`<input
      class="ui-input ui-input--num cmp-criteria__number"
      type="number"
      min=${PROBLEM_CRITERIA_LIMITS.factor.min}
      max=${PROBLEM_CRITERIA_LIMITS.factor.max}
      step="0.1"
      .value=${live(String(effective[key].factor))}
      ?disabled=${!effective[key].on}
      @change=${(/** @type {Event} */ ev) =>
        handlers.onFactor(
          key,
          /** @type {HTMLInputElement} */ (ev.currentTarget).value
        )}
    />`;
  return html`<details
    class="cmp-criteria"
    ?open=${open}
    @toggle=${(/** @type {Event} */ ev) => {
      handlers.onToggle(
        /** @type {HTMLDetailsElement} */ (ev.currentTarget).open
      );
    }}
  >
    <summary class="ui-btn ui-btn--sm">
      문제
      기준${criteria.is_default
        ? ''
        : html` <span class="cmp-criteria__dot" aria-label="조정됨">●</span>`}
    </summary>
    <div
      class="ui-popover cmp-criteria__panel"
      role="group"
      aria-label="문제 기준"
    >
      ${row('failed', '실패·폐기')}
      ${row(
        'retry',
        '재시도·재개',
        html`<label class="cmp-criteria__aux">
          <input
            type="checkbox"
            .checked=${live(effective.retry.include_env)}
            ?disabled=${!effective.retry.on}
            @change=${(/** @type {Event} */ ev) =>
              handlers.onChange(
                'retry',
                'include_env',
                /** @type {HTMLInputElement} */ (ev.currentTarget).checked
              )}
          />
          환경 요인 포함
        </label>`
      )}
      ${row(
        'review',
        '리뷰 지적',
        html`<span class="cmp-criteria__aux cmp-criteria__thresholds">
          <span class="cmp-criteria__pair"
            >라운드 ≥ ${reviewInput('round_min')}</span
          >
          <span class="cmp-criteria__pair"
            >blocking ≥ ${reviewInput('blocking_min')}</span
          >
          <span class="cmp-criteria__pair"
            >minor ≥ ${reviewInput('minor_min')}</span
          >
        </span>`
      )}
      ${row(
        'human',
        '사람 개입',
        html`<label class="cmp-criteria__aux">
          <input
            type="checkbox"
            .checked=${live(effective.human.include_env_events)}
            ?disabled=${!effective.human.on}
            @change=${(/** @type {Event} */ ev) =>
              handlers.onChange(
                'human',
                'include_env_events',
                /** @type {HTMLInputElement} */ (ev.currentTarget).checked
              )}
          />
          환경 이벤트 포함
        </label>`
      )}
      ${row('verify', 'verify 실패')}
      ${row(
        'duration',
        '시간 초과',
        html`<span class="cmp-criteria__aux"
          >중앙값 × ${factorInput('duration')}</span
        >`
      )}
      ${row(
        'cost',
        '비용 초과',
        html`<span class="cmp-criteria__aux"
          >중앙값 × ${factorInput('cost')}</span
        >`
      )}
      ${row('pin', '핀 조정')}
      <div class="cmp-criteria__foot">
        <button
          type="button"
          class="ui-btn ui-btn--ghost ui-btn--sm cmp-criteria__reset"
          ?disabled=${criteria.is_default}
          @click=${handlers.onReset}
        >
          기본값으로
        </button>
      </div>
    </div>
  </details>`;
}
