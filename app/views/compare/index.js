/**
 * 비교 탭 (compare-redesign §3) — 프리셋·모델별 실작업 결과를 카드로 비교한다.
 *
 * 프리셋 저장소가 서버 전역이라 이 탭은 Monitor와 같은 global 마운트 쪽이며,
 * 보이는 저장소 전부를 한 표에 놓고 저장소 필터로 좁힌다(§3.1). 데이터는
 * `get-compare` → `compare-snapshot` 요청·응답 한 쌍이고 실시간 push는 없다 —
 * 탭을 열 때·필터를 바꿀 때·`새로고침`을 누를 때만 다시 읽는다(§3.5).
 */
import { html, nothing, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import {
  COMPARE_RANGE_OPTIONS,
  isCompareRange,
  localDayStartMs
} from '../../data/closed-range.js';
import {
  DEFAULT_PROBLEM_CRITERIA,
  PROBLEM_CRITERIA_LIMITS,
  PROBLEM_KEYS,
  PROBLEM_LABELS,
  normalizeProblemCriteria
} from '../../utils/compare-problem-criteria.js';
import { debug } from '../../utils/logging.js';
import { formatTimestampLocal } from '../../utils/relative-time.js';
import { costTooltipLines } from '../../utils/token-usage.js';
import { ROUTE_FILTER_OPTIONS } from '../worker/lane-model.js';
import {
  EMPTY_CELL,
  formatCostMedian,
  formatCriteriaLegend,
  formatDuration,
  formatFactorChip,
  formatOutcomeText,
  formatPrice,
  formatRate,
  outcomeDotKind,
  sampleNote
} from './format.js';

/**
 * 기본 기간. `CLOSED_RANGE_OPTIONS`의 기본값 `today`는 비교 표본이 거의 없어
 * 표를 비운 것처럼 보이므로, 이 탭은 30일에서 시작한다.
 *
 * @type {string}
 */
const DEFAULT_RANGE = '30d';
const RANGE_STORAGE_KEY = 'bdui.compare.range';
const PROBLEM_CRITERIA_STORAGE_KEY = 'bdui.compare.problem_criteria';

/**
 * @returns {string}
 */
function loadCompareRange() {
  try {
    const raw = localStorage.getItem(RANGE_STORAGE_KEY);
    return isCompareRange(raw) && raw !== 'custom' ? raw : DEFAULT_RANGE;
  } catch {
    return DEFAULT_RANGE;
  }
}

/**
 * @param {string} range
 */
function saveCompareRange(range) {
  try {
    localStorage.setItem(RANGE_STORAGE_KEY, range);
  } catch {
    // Storage is optional; the active view still keeps the chosen value.
  }
}

/**
 * @returns {Record<string, any>|null}
 */
function loadProblemCriteria() {
  try {
    const raw = localStorage.getItem(PROBLEM_CRITERIA_STORAGE_KEY);
    if (raw === null) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return null;
  }
}

/**
 * @param {Record<string, any>} criteria
 */
function saveProblemCriteria(criteria) {
  try {
    localStorage.setItem(
      PROBLEM_CRITERIA_STORAGE_KEY,
      JSON.stringify(criteria)
    );
  } catch {
    // Storage is optional; the active request still carries the chosen value.
  }
}

function clearProblemCriteria() {
  try {
    localStorage.removeItem(PROBLEM_CRITERIA_STORAGE_KEY);
  } catch {
    // Storage is optional; the next request still returns server defaults.
  }
}

/**
 * `row.composition` 하나로 서는 세션 행의 구성 줄 (UI-obl0 §2.4). 문자열은 서버가 지은 값 그대로이며
 * 클라이언트에서 다시 조립하지 않는다 — 재료가 없으면 줄을 그리지 않는다.
 * `mixed`일 때만 `parts`의 유닛별 실행자가 title로 붙는다.
 *
 * @param {any} row
 */
function compositionLineTemplate(row) {
  const composition =
    typeof row.composition === 'string' ? row.composition : '';
  if (composition === '') {
    return nothing;
  }
  const parts =
    row.impl_actor?.kind === 'mixed' && Array.isArray(row.impl_actor.parts)
      ? row.impl_actor.parts
      : [];
  const title = parts
    .map((/** @type {any} */ part) => `${part.unit}: ${part.label}`)
    .join('\n');
  return html`<span
    class="cmp-session__composition"
    title=${title === '' ? nothing : title}
    >${composition}</span
  >`;
}

/**
 * @typedef {Object} CompareViewOptions
 * @property {(type: string, payload?: unknown) => Promise<any>} [transport]
 * @property {(id: string) => void} [gotoIssue]
 */

/**
 * @param {HTMLElement} root
 * @param {CompareViewOptions} [options]
 */
export function createCompareView(root, options = {}) {
  const log = debug('views:compare');
  const transport = options.transport;
  const gotoIssue = options.gotoIssue;

  /** @type {{ range: string, start_date: string, end_date: string, root_dir: string, route: string }} */
  const filters = {
    range: loadCompareRange(),
    start_date: '',
    end_date: '',
    root_dir: '',
    route: ''
  };
  /** @type {{ rows: any[], groups: any[], summary: any, warnings: string[], workspaces: Array<{ root_dir: string, name: string }>, criteria: any }} */
  let model = {
    rows: [],
    groups: [],
    summary: null,
    warnings: [],
    workspaces: [],
    criteria: {
      effective: DEFAULT_PROBLEM_CRITERIA,
      is_default: true,
      baselines: {
        duration_ms: { median: null, sample: 0, active: false },
        cost_usd: { median: null, sample: 0, active: false, partial_count: 0 }
      }
    }
  };
  let saved_criteria = loadProblemCriteria();
  // Once this view has chosen criteria, its own choice is the base for the next
  // edit; a reset chooses the defaults even before the reply lands.
  let criteria_touched = false;
  let criteria_open = false;
  let group_by = 'preset';
  let sort = 'landing';
  /** @type {Set<string>} */
  const expanded = new Set();
  let loading = false;
  /** @type {string|null} */
  let error = null;
  let loaded_once = false;
  let request_seq = 0;

  /**
   * @returns {string|null}
   */
  function customRangeError() {
    if (
      filters.range === 'custom' &&
      filters.start_date !== '' &&
      filters.end_date !== '' &&
      filters.start_date > filters.end_date
    ) {
      return '시작일이 종료일보다 늦습니다';
    }
    return null;
  }

  /**
   * @returns {{ since: number|null, until: number|null }}
   */
  function customRangeBounds() {
    const since = localDayStartMs(filters.start_date);
    const end_start = localDayStartMs(filters.end_date);
    if (end_start === null) {
      return { since, until: null };
    }
    const until_date = new Date(end_start);
    until_date.setDate(until_date.getDate() + 1);
    until_date.setHours(0, 0, 0, 0);
    return { since, until: until_date.getTime() };
  }

  /**
   * `get-compare` 한 번. 응답이 늦게 도착한 이전 요청은 버린다: 필터를 빠르게
   * 바꾸면 오래된 표가 새 표를 덮어쓸 수 있다.
   */
  async function fetchSnapshot() {
    if (customRangeError() !== null) {
      request_seq += 1;
      loading = false;
      doRender();
      return;
    }
    if (!transport) {
      return;
    }
    const seq = (request_seq += 1);
    loading = true;
    error = null;
    doRender();
    try {
      const request = {
        range: filters.range,
        root_dirs: filters.root_dir ? [filters.root_dir] : [],
        routes: filters.route ? [filters.route] : [],
        group_by,
        ...(saved_criteria === null
          ? {}
          : { problem_criteria: saved_criteria }),
        ...(filters.range === 'custom' ? customRangeBounds() : {})
      };
      const reply = await transport('get-compare', request);
      if (seq !== request_seq) {
        return;
      }
      const payload = reply && reply.payload ? reply.payload : reply;
      model = {
        summary: payload?.summary ?? null,
        warnings: Array.isArray(payload?.warnings) ? payload.warnings : [],
        rows: Array.isArray(payload?.rows) ? payload.rows : [],
        groups: Array.isArray(payload?.groups) ? payload.groups : [],
        criteria: payload?.criteria ?? model.criteria,
        workspaces: Array.isArray(payload?.workspaces)
          ? payload.workspaces
          : model.workspaces
      };
      loaded_once = true;
    } catch (err) {
      if (seq !== request_seq) {
        return;
      }
      log('get-compare failed: %o', err);
      error = err instanceof Error ? err.message : String(err);
    } finally {
      if (seq === request_seq) {
        loading = false;
        doRender();
      }
    }
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  function onFilterChange(key, value) {
    /** @type {any} */ (filters)[key] = value;
    void fetchSnapshot();
  }

  /**
   * @param {string} value
   */
  function onRangeChange(value) {
    filters.range = value;
    if (isCompareRange(value) && value !== 'custom') {
      saveCompareRange(value);
    }
    void fetchSnapshot();
  }

  /**
   * @param {'start_date'|'end_date'} key
   * @param {string} value
   */
  function onCustomDateChange(key, value) {
    filters[key] = value;
    void fetchSnapshot();
  }

  /** @param {string} key */
  function toggleGroup(key) {
    if (expanded.has(key)) {
      expanded.delete(key);
    } else {
      expanded.add(key);
    }
    doRender();
  }

  /**
   * @param {string} label
   * @param {string} value
   * @param {ReadonlyArray<{ value: string, label: string }>} choices
   * @param {(next: string) => void} onChange
   */
  function selectTemplate(label, value, choices, onChange) {
    return html`
      <label class="cmp-filter">
        <span class="cmp-filter__label">${label}</span>
        <select
          class="cmp-filter__select"
          .value=${value}
          @change=${(/** @type {Event} */ ev) =>
            onChange(/** @type {HTMLSelectElement} */ (ev.target).value)}
        >
          ${choices.map(
            (choice) =>
              html`<option
                value=${choice.value}
                ?selected=${choice.value === value}
              >
                ${choice.label}
              </option>`
          )}
        </select>
      </label>
    `;
  }

  /**
   * @param {string} key
   * @param {string} field
   * @param {unknown} value
   */
  function changeCriterion(key, field, value) {
    // Accumulate on the pending choice, not on the last response: two changes
    // made before a reply must not let the second one revert the first.
    const next = normalizeProblemCriteria(
      criteria_touched ? saved_criteria : model.criteria.effective
    );
    next[key][field] = value;
    saved_criteria = normalizeProblemCriteria(next);
    criteria_touched = true;
    saveProblemCriteria(saved_criteria);
    void fetchSnapshot();
  }

  /**
   * @param {'round_min'|'blocking_min'|'minor_min'} field
   * @param {string} raw
   */
  function changeReviewThreshold(field, raw) {
    if (raw === '') {
      changeCriterion('review', field, null);
      return;
    }
    const limits = PROBLEM_CRITERIA_LIMITS[field];
    const value = Math.min(limits.max, Math.max(limits.min, Number(raw)));
    changeCriterion('review', field, Math.round(value));
  }

  /**
   * @param {'duration'|'cost'} key
   * @param {string} raw
   */
  function changeFactor(key, raw) {
    const limits = PROBLEM_CRITERIA_LIMITS.factor;
    const fallback = DEFAULT_PROBLEM_CRITERIA[key].factor;
    const parsed = raw === '' ? fallback : Number(raw);
    changeCriterion(
      key,
      'factor',
      Math.min(limits.max, Math.max(limits.min, parsed))
    );
  }

  function criteriaTemplate() {
    const criteria = model.criteria.effective;
    /**
     * @param {string} key - Criterion key.
     * @param {string} label - Visible label.
     * @param {unknown} controls - Optional auxiliary controls.
     */
    const row = (key, label, controls = null) => html`
      <div class="cmp-criteria__row">
        <label class="cmp-criteria__main">
          <input
            type="checkbox"
            .checked=${live(criteria[key].on)}
            @change=${(/** @type {Event} */ ev) =>
              changeCriterion(
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
        class="cmp-criteria__number"
        type="number"
        min=${limits.min}
        max=${limits.max}
        step="1"
        .value=${live(
          criteria.review[field] === null ? '' : String(criteria.review[field])
        )}
        ?disabled=${!criteria.review.on}
        @change=${(/** @type {Event} */ ev) =>
          changeReviewThreshold(
            field,
            /** @type {HTMLInputElement} */ (ev.currentTarget).value
          )}
      />`;
    };
    /** @param {'duration'|'cost'} key */
    const factorInput = (key) =>
      html`<input
        class="cmp-criteria__number"
        type="number"
        min=${PROBLEM_CRITERIA_LIMITS.factor.min}
        max=${PROBLEM_CRITERIA_LIMITS.factor.max}
        step="0.1"
        .value=${live(String(criteria[key].factor))}
        ?disabled=${!criteria[key].on}
        @change=${(/** @type {Event} */ ev) =>
          changeFactor(
            key,
            /** @type {HTMLInputElement} */ (ev.currentTarget).value
          )}
      />`;
    return html`<details
      class="cmp-criteria"
      ?open=${criteria_open}
      @toggle=${(/** @type {Event} */ ev) => {
        criteria_open = /** @type {HTMLDetailsElement} */ (ev.currentTarget)
          .open;
      }}
    >
      <summary class="op-btn">
        문제
        기준${model.criteria.is_default
          ? ''
          : html` <span class="cmp-criteria__dot">●</span>`}
      </summary>
      <div class="cmp-criteria__panel">
        ${row('failed', '실패·폐기')}
        ${row(
          'retry',
          '재시도·재개',
          html`<label class="cmp-criteria__aux">
            <input
              type="checkbox"
              .checked=${live(criteria.retry.include_env)}
              ?disabled=${!criteria.retry.on}
              @change=${(/** @type {Event} */ ev) =>
                changeCriterion(
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
            라운드 ≥ ${reviewInput('round_min')} blocking ≥
            ${reviewInput('blocking_min')} minor ≥ ${reviewInput('minor_min')}
          </span>`
        )}
        ${row(
          'human',
          '사람 개입',
          html`<label class="cmp-criteria__aux">
            <input
              type="checkbox"
              .checked=${live(criteria.human.include_env_events)}
              ?disabled=${!criteria.human.on}
              @change=${(/** @type {Event} */ ev) =>
                changeCriterion(
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
        <button
          type="button"
          class="op-btn cmp-criteria__reset"
          ?disabled=${model.criteria.is_default}
          @click=${() => {
            saved_criteria = null;
            criteria_touched = true;
            clearProblemCriteria();
            void fetchSnapshot();
          }}
        >
          기본값으로
        </button>
      </div>
    </details>`;
  }

  function filtersTemplate() {
    const workspace_choices = [
      { value: '', label: '전체 저장소' },
      ...model.workspaces.map((workspace) => ({
        value: workspace.root_dir,
        label: workspace.name
      }))
    ];
    return html`
      <div class="cmp-controls">
        <div class="cmp-group-by" role="group" aria-label="묶기 축">
          ${[
            { value: 'preset', label: '프리셋' },
            { value: 'orchestration', label: '오케스트레이션 모델' },
            { value: 'impl_actor', label: '구현 실행자' }
          ].map(
            (choice) =>
              html`<button
                type="button"
                class="op-btn"
                aria-pressed=${group_by === choice.value}
                @click=${() => {
                  group_by = choice.value;
                  void fetchSnapshot();
                }}
              >
                ${choice.label}
              </button>`
          )}
        </div>
        <div class="cmp-filters">
          ${selectTemplate(
            '기간',
            filters.range,
            COMPARE_RANGE_OPTIONS.map((option) => ({
              value: option.value,
              label: option.label
            })),
            onRangeChange
          )}
          ${filters.range === 'custom'
            ? html`<div class="cmp-filter cmp-filter--dates">
                <input
                  type="date"
                  class="cmp-filter__date"
                  aria-label="시작일"
                  .value=${filters.start_date}
                  @change=${(/** @type {Event} */ ev) =>
                    onCustomDateChange(
                      'start_date',
                      /** @type {HTMLInputElement} */ (ev.target).value
                    )}
                />
                <span aria-hidden="true">~</span>
                <input
                  type="date"
                  class="cmp-filter__date"
                  aria-label="종료일"
                  .value=${filters.end_date}
                  @change=${(/** @type {Event} */ ev) =>
                    onCustomDateChange(
                      'end_date',
                      /** @type {HTMLInputElement} */ (ev.target).value
                    )}
                />
                ${customRangeError() === null
                  ? null
                  : html`<span class="cmp-filter__error" role="alert"
                      >${customRangeError()}</span
                    >`}
              </div>`
            : null}
          ${selectTemplate(
            '저장소',
            filters.root_dir,
            workspace_choices,
            (next) => onFilterChange('root_dir', next)
          )}
          ${selectTemplate(
            'route',
            filters.route,
            [
              { value: '', label: '전체 route' },
              ...ROUTE_FILTER_OPTIONS.filter(
                (option) => option.value !== 'unset'
              ).map((option) => ({ value: option.value, label: option.label }))
            ],
            (next) => onFilterChange('route', next)
          )}
          ${selectTemplate(
            '정렬',
            sort,
            [
              { value: 'landing', label: '착지율' },
              { value: 'problem', label: '문제율' },
              { value: 'duration', label: '평균 시간' },
              { value: 'cost', label: '평균 비용' }
            ],
            (next) => {
              sort = next;
              doRender();
            }
          )}
        </div>
        ${criteriaTemplate()}
        <button
          type="button"
          class="op-btn cmp-refresh"
          ?disabled=${loading}
          @click=${() => void fetchSnapshot()}
        >
          새로고침
        </button>
      </div>
    `;
  }

  /** @param {any} group */
  function groupCardTemplate(group) {
    const open = expanded.has(group.key);
    const ids = new Set(group.attempt_ids || []);
    const rows = model.rows.filter((row) => ids.has(row.attempt_id));
    const compositions = group.compositions || [];
    let composition = compositions[0]?.composition || '';
    if (compositions.length > 1) {
      composition += ` 외 ${compositions.length - 1}`;
    }
    if (group.badge === 'unmatched') {
      const candidates = [
        ...new Set(rows.flatMap((row) => row.preset_candidates || []))
      ].sort();
      const reason =
        candidates.length > 0
          ? `프리셋 미확정 — ${candidates.join('·')} 중 판별 불가`
          : '일치하는 프리셋 없음';
      composition = [composition, reason].filter(Boolean).join(' · ');
    }
    return html`<article
      class="cmp-card ${open ? 'is-open' : ''}"
      data-group-key=${group.key}
    >
      <header class="cmp-card__head">
        <h3 class="cmp-group-name">${group.name}</h3>
        ${group.badge === 'preset' || group.badge === 'unmatched'
          ? html`<span class="cmp-badge"
              >${group.badge === 'preset' ? '프리셋' : '미대조'}</span
            >`
          : null}
        <span class="cmp-card__count"
          >세션 ${group.n} · 이슈 ${group.issue_count}</span
        >
      </header>
      ${composition
        ? html`<div
            class="cmp-composition"
            title=${compositions
              .map(
                (/** @type {any} */ item) =>
                  `${item.composition} ${item.count}건`
              )
              .join('\n')}
          >
            ${composition}
          </div>`
        : null}
      <div class="cmp-kpis">${metricsTemplate(group)}</div>
      <div class="cmp-problems">
        ${PROBLEM_KEYS.filter((key) => model.criteria.effective[key]?.on).map(
          (key) =>
            html`<span
              class="cmp-chip ${group.problems?.[key] ? '' : 'is-zero'}"
              >${PROBLEM_LABELS[key]} ${group.problems?.[key] ?? 0}</span
            >`
        )}
      </div>
      <button
        type="button"
        class="op-btn cmp-expand"
        aria-expanded=${open}
        @click=${() => toggleGroup(group.key)}
      >
        세션 ${group.n}건 ${open ? '접기 ▴' : '보기 ▾'}
      </button>
      ${open
        ? html`<div class="cmp-sessions">
            ${rows.map((row) => attemptRowTemplate(row))}
          </div>`
        : null}
    </article>`;
  }

  /** @param {any} row */
  function attemptRowTemplate(row) {
    const problems = row.problems;
    const evidence = problems?.evidence;
    const review = evidence?.review;
    const review_criteria = model.criteria.effective.review;
    const review_label =
      review_criteria.round_min !== null &&
      review?.round >= review_criteria.round_min
        ? `리뷰 r${review.round}`
        : review_criteria.blocking_min !== null &&
            review?.blocking >= review_criteria.blocking_min
          ? `리뷰 b${review.blocking}`
          : review_criteria.minor_min !== null &&
              review?.minor >= review_criteria.minor_min
            ? `리뷰 m${review.minor}`
            : '리뷰';
    const retry = evidence?.retry;
    const retry_kind =
      retry?.kind === 'env_ladder'
        ? `env 사다리${retry.cause ? ` ${retry.cause}` : ''}`
        : retry?.kind === 'auto_resume'
          ? `자동 재개${retry.cause ? ` ${retry.cause}` : ''}`
          : '재개';
    const duration = evidence?.duration;
    const cost = evidence?.cost;
    const baseline_partial = model.criteria.baselines.cost_usd.partial_count;
    const chips = [
      { show: problems?.failed, label: '실패', title: evidence?.failed || '' },
      {
        show: problems?.retry,
        label: retry?.env ? '재시도(환경)' : '재시도',
        title: retry ? `${retry.origin} · ${retry_kind}` : ''
      },
      {
        show: problems?.review,
        label: review_label,
        title: review
          ? `라운드 ${review.round ?? EMPTY_CELL} · blocking ${review.blocking ?? EMPTY_CELL} · minor ${review.minor ?? EMPTY_CELL}`
          : ''
      },
      {
        show: problems?.human,
        label: '개입',
        title: (evidence?.human || []).join('\n')
      },
      {
        show: problems?.verify,
        label: 'verify 실패',
        title:
          evidence?.verify === 'merge_verify' ? '머지 후보 [verify] 실패' : ''
      },
      {
        show: problems?.duration,
        label: `시간${formatFactorChip(duration?.value_ms, duration?.baseline_ms) ? ` ${formatFactorChip(duration?.value_ms, duration?.baseline_ms)}` : ' 초과'}`,
        title: duration
          ? `${formatDuration(duration.value_ms)} · 중앙값 ${formatDuration(duration.baseline_ms)} × ${duration.factor}`
          : ''
      },
      {
        show: problems?.cost,
        label: `비용${formatFactorChip(cost?.value_usd, cost?.baseline_usd) ? ` ${formatFactorChip(cost?.value_usd, cost?.baseline_usd)}` : ' 초과'}`,
        title: cost
          ? `${formatPrice({ total_cost_usd: cost.value_usd })} · 중앙값 ${formatCostMedian(cost.baseline_usd)} × ${cost.factor}${cost.partial ? ' · 부분' : ''}${baseline_partial > 0 ? ` · 기준선 부분 집계 ${baseline_partial}건 포함` : ''}`
          : ''
      },
      {
        show: row.preset?.deviated_keys?.length > 0,
        label: '핀 조정',
        title: (row.preset?.deviated_keys || []).join(', ')
      }
    ].filter((chip) => chip.show);
    return html`<a
      class="cmp-session"
      href=${`#/compare?issue=${encodeURIComponent(row.bead_id)}`}
      @click=${(/** @type {MouseEvent} */ ev) => {
        if (
          gotoIssue &&
          !ev.metaKey &&
          !ev.ctrlKey &&
          !ev.shiftKey &&
          !ev.altKey &&
          ev.button === 0
        ) {
          ev.preventDefault();
          gotoIssue(row.bead_id);
        }
      }}
    >
      <span
        class="cmp-dot cmp-dot--${outcomeDotKind(row)}"
        aria-hidden="true"
      ></span>
      <span
        class="cmp-session__title"
        title=${`${row.bead_id} ${row.title || ''}`}
        ><span class="cmp-issue-id">${row.bead_id}</span>${row.title ||
        ''}</span
      >
      ${compositionLineTemplate(row)}
      <span class="cmp-session__outcome">${formatOutcomeText(row)}</span>
      ${chips.length > 0
        ? html`<span class="cmp-session__chips"
            >${chips.map(
              (chip) =>
                html`<span class="cmp-chip" title=${chip.title}
                  >${chip.label}</span
                >`
            )}</span
          >`
        : null}
      <span class="cmp-session__time"
        >${formatDuration(row.duration_ms)}${row.finished_at
          ? html` · <span>${formatTimestampLocal(row.finished_at)}</span>`
          : null}</span
      >
      <span
        class="cmp-session__cost"
        title=${costTooltipLines(row.usage || null).join('\n')}
        >${formatPrice(row.usage)}</span
      >
    </a>`;
  }

  /**
   * Keep the sampleNote behavior; comparison KPIs always show coverage.
   *
   * @param {any} stat
   */
  function costSampleNote(stat) {
    return sampleNote(stat) || `n=${stat?.sample ?? 0}/${stat?.total ?? 0}`;
  }

  /**
   * @param {string} metric
   * @param {string} label
   * @param {string} value
   * @param {unknown} note
   * @param {string[]} best
   * @param {number|null} [rate]
   */
  function metricTemplate(metric, label, value, note, best, rate = null) {
    const best_label = /** @type {Record<string, string>} */ ({
      landing: '최고',
      duration: '최단',
      cost: '최저'
    })[metric];
    const is_best = Boolean(best_label && best.includes(metric));
    return html`<div
      class="cmp-kpi ${is_best ? 'is-best' : ''}"
      data-metric=${metric}
    >
      <div class="cmp-kpi__label">
        ${label}${is_best
          ? html`<span class="cmp-best">${best_label}</span>`
          : null}
      </div>
      <div class="cmp-kpi__value">${value}</div>
      <div class="cmp-kpi__note">${note}</div>
      ${typeof rate === 'number' && Number.isFinite(rate)
        ? html`<div class="cmp-bar" aria-hidden="true">
            <span
              style=${`width: ${Math.max(0, Math.min(100, rate * 100))}%`}
            ></span>
          </div>`
        : null}
    </div>`;
  }

  /**
   * @param {any} group
   * @param {boolean} [summary]
   */
  function metricsTemplate(group, summary = false) {
    const best = summary ? [] : group.best || [];
    const cost = group.cost_usd;
    return html`
      ${metricTemplate(
        'landing',
        '착지율',
        formatRate(group.landing_rate),
        `${group.landed}/${group.judged}${summary ? '' : ` · 진행 중 ${group.in_flight}`}`,
        best,
        summary ? null : group.landing_rate
      )}
      ${metricTemplate(
        'problem',
        '문제 세션',
        formatRate(group.problem_rate),
        html`${group.problem_count}/${group.n}${summary &&
        !model.criteria.is_default
          ? html`<span class="cmp-note">· 기준 조정됨</span>`
          : null}`,
        best,
        summary ? null : group.problem_rate
      )}
      ${metricTemplate(
        'duration',
        '평균 시간',
        formatDuration(group.duration_ms?.mean),
        `중앙값 ${formatDuration(group.duration_ms?.median)}`,
        best
      )}
      ${metricTemplate(
        'cost',
        '평균 비용',
        formatCostMedian(cost?.mean),
        `중앙값 ${formatCostMedian(cost?.median)} · ${costSampleNote(cost)}${!summary && cost?.partial_count > 0 ? ` · 부분 ${cost.partial_count}` : ''}`,
        best
      )}
    `;
  }

  /**
   * @param {number|null|undefined} left
   * @param {number|null|undefined} right
   * @param {boolean} [descending]
   */
  function compareMetric(left, right, descending = false) {
    if (left == null) {
      return right == null ? 0 : 1;
    }
    if (right == null) {
      return -1;
    }
    return descending ? right - left : left - right;
  }

  function sortedGroups() {
    return [...model.groups].sort((left, right) => {
      if (sort === 'problem') {
        return compareMetric(left.problem_rate, right.problem_rate);
      }
      if (sort === 'duration') {
        return compareMetric(left.duration_ms?.mean, right.duration_ms?.mean);
      }
      if (sort === 'cost') {
        return compareMetric(left.cost_usd?.mean, right.cost_usd?.mean);
      }
      return (
        compareMetric(left.landing_rate, right.landing_rate, true) ||
        compareMetric(left.cost_usd?.mean, right.cost_usd?.mean)
      );
    });
  }

  function bodyTemplate() {
    if (error !== null) {
      return html`
        <div class="cmp-error" role="alert">
          <span>비교 데이터를 읽지 못했습니다 — ${error}</span>
          <button
            type="button"
            class="op-btn"
            @click=${() => void fetchSnapshot()}
          >
            새로고침
          </button>
        </div>
      `;
    }
    if (!loaded_once) {
      return html`<div class="cmp-empty">${loading ? '읽는 중…' : ''}</div>`;
    }
    if (model.groups.length === 0) {
      return html`<div class="cmp-empty">
        해당 조건의 실행 기록이 없습니다
      </div>`;
    }
    return html`
      <section class="cmp-grid" aria-label="그룹별 비교">
        ${sortedGroups().map((group) => groupCardTemplate(group))}
      </section>
    `;
  }

  function template() {
    const summary = model.summary;
    const range_label =
      filters.range !== 'custom'
        ? COMPARE_RANGE_OPTIONS.find((option) => option.value === filters.range)
            ?.label || filters.range
        : filters.start_date !== '' && filters.end_date !== ''
          ? `${filters.start_date} ~ ${filters.end_date}`
          : filters.start_date !== ''
            ? `${filters.start_date} 이후`
            : filters.end_date !== ''
              ? `${filters.end_date}까지`
              : '전체 기간';
    const workspace_label = filters.root_dir
      ? model.workspaces.find(
          (workspace) => workspace.root_dir === filters.root_dir
        )?.name || filters.root_dir
      : '전체 저장소';
    return html`
      <div class="cmp">
        <header class="cmp-head">
          <h2 class="cmp-title">프리셋 비교</h2>
          <span class="cmp-head__summary"
            >${range_label} · ${workspace_label} · 세션 ${summary?.n ?? 0}건 ·
            이슈 ${summary?.issue_count ?? 0}건</span
          >
        </header>
        ${filtersTemplate()}
        ${summary
          ? html`<section class="cmp-summary" aria-label="전체 요약">
              ${metricTemplate(
                'sessions',
                '전체 세션',
                `${summary.n}건`,
                `이슈 ${summary.issue_count} · 진행 중 ${summary.in_flight}`,
                []
              )}
              ${metricsTemplate(summary, true)}
            </section>`
          : null}
        ${model.warnings.includes('preset_store_unreadable')
          ? html`<div class="cmp-warning">
              프리셋 저장소를 읽지 못해 프리셋 대조를 건너뛰었습니다
            </div>`
          : null}
        ${bodyTemplate()}
        <p class="cmp-legend">
          ${formatCriteriaLegend(
            model.criteria.effective,
            model.criteria.baselines
          )}
        </p>
      </div>
    `;
  }

  function doRender() {
    render(template(), root);
  }

  doRender();

  return {
    /** Called when the tab opens. */
    load() {
      // 탭을 열 때마다 다시 읽는다: 실행 기록은 Worker 진행에 따라 바뀌므로 탭을
      // 다시 여는 것이 새 값을 보는 자연스러운 계기다.
      if (!loading) {
        void fetchSnapshot();
      }
    },
    /**
     * Called when the tab is left. There is no subscription to release; this
     * only invalidates a reply still in flight.
     */
    pause() {
      request_seq += 1;
      loading = false;
    },
    /** Re-read the snapshot now, whatever the tab already holds. */
    refresh() {
      return fetchSnapshot();
    },
    destroy() {
      render(html``, root);
    }
  };
}
