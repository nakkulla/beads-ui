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
import { errorText } from '../../utils/error-text.js';
import { debug } from '../../utils/logging.js';
import { formatTimestampLocal } from '../../utils/relative-time.js';
import { costTooltipLines } from '../../utils/token-usage.js';
import { comparisonFindings } from './findings.js';
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
const WORK_TYPE_STORAGE_KEY = 'bdui.compare.work_type';

/** Load the optional work_type preference. */
function loadWorkType() {
  try {
    return localStorage.getItem(WORK_TYPE_STORAGE_KEY) === 'quick_fix'
      ? 'quick_fix'
      : 'general';
  } catch {
    return 'general';
  }
}

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
  const parts = (row.executed?.leaves || []).map((/** @type {any} */ leaf) => ({
    unit: leaf.runtime,
    label: [leaf.model, leaf.effort].filter(Boolean).join(' · ')
  }));
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
  let group_by = 'setting';
  let work_type = loadWorkType();
  /** @type {Record<string, number|null>} */
  const work_counts = { general: null, quick_fix: null };
  let sort = 'sessions';
  let descending = true;
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
        routes:
          work_type === 'quick_fix'
            ? ['quick_fix']
            : ['spec_backed', 'full_plan'],
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
      work_counts[work_type] = model.summary?.n ?? 0;
      if (model.summary?.work_type_counts) {
        Object.assign(work_counts, model.summary.work_type_counts);
      }
    } catch (err) {
      if (seq !== request_seq) {
        return;
      }
      log('get-compare failed: %o', err);
      error = errorText(err);
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
          class="ui-select ui-select--bare cmp-filter__select"
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
        class="ui-input cmp-criteria__number"
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
        class="ui-input cmp-criteria__number"
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

  function groupByTemplate() {
    return html`
      <div class="cmp-group-by" role="group" aria-label="묶기 축">
        ${[
          { value: 'setting', label: '설정' },
          { value: 'orchestration', label: '오케스트레이터' },
          { value: 'impl_actor', label: '구현 리프' },
          { value: 'reviewer', label: '리뷰어' }
        ]
          .filter(
            (choice) =>
              work_type !== 'quick_fix' ||
              ['setting', 'reviewer'].includes(choice.value)
          )
          .map(
            (choice) =>
              html`<button
                type="button"
                class=${`op-btn${group_by === choice.value ? ' is-active' : ''}`}
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
    `;
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
                  class="ui-input cmp-filter__date"
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
                  class="ui-input cmp-filter__date"
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
            '정렬',
            sort,
            [
              { value: 'sessions', label: '세션 수' },
              { value: 'landing', label: '착지율' },
              { value: 'problem', label: '문제율' },
              { value: 'duration', label: '평균 시간' },
              { value: 'cost', label: '평균 비용' }
            ],
            (next) => {
              sort = next;
              descending = next === 'sessions' || next === 'landing';
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

  /**
   * @param {any} group
   * @param {any} [parent]
   * @returns {import('lit-html').TemplateResult}
   */
  function groupCardTemplate(group, parent = null) {
    const open = expanded.has(group.key);
    const ids = new Set(group.attempt_ids || []);
    const rows = model.rows.filter((row) => ids.has(row.attempt_id));
    const compositions = group.compositions || [];
    let composition = compositions[0]?.composition || '';
    if (compositions.length > 1) {
      composition += ` 외 ${compositions.length - 1}`;
    }
    const unknown = group.name.includes('리프 설정 모름');
    const unobserved = group.name.includes('관측 기록 없음');
    return html`<article
      class="cmp-card cmp-table-row ${open
        ? 'is-open'
        : ''} ${group.small_sample ? 'is-small' : ''} ${parent
        ? 'is-child'
        : ''}"
      data-group-key=${group.key}
    >
      <header class="cmp-card__head">
        <h3 class="cmp-group-name">${group.name}</h3>
        ${group.small_sample
          ? html`<span class="ui-chip">표본 적음</span>`
          : null}
        ${unknown || unobserved
          ? html`<span class="ui-chip cmp-unknown"
              >${unknown ? '프리셋 기록 없음' : '실행 기록 없음'}</span
            >`
          : null}
        ${group.aliases?.length
          ? html`<div class="cmp-composition">
              ${group.aliases
                .map((/** @type {any} */ item) => `${item.name} ${item.count}`)
                .join(' · ')}
            </div>`
          : null}
        ${group.actual_leaves?.length
          ? html`<div class="cmp-composition">
              실제 리프
              ${group.actual_leaves
                .map((/** @type {any} */ item) => `${item.name} ${item.count}`)
                .join(' · ')}
            </div>`
          : null}
      </header>
      ${composition && !group.actual_leaves
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
      <div class="cmp-card__count">
        세션 ${group.n}<small>이슈 ${group.issue_count}</small>
      </div>
      <div class="cmp-kpis">${metricsTemplate(group, false, parent)}</div>
      ${group_by === 'impl_actor'
        ? html`<div class="cmp-extra">
            리프를 고른 방식<br />자동 ${group.leaf_modes?.auto ?? 0} · 고정
            ${group.leaf_modes?.fixed ?? 0} · 모름
            ${group.leaf_modes?.unknown ?? 0}
          </div>`
        : null}
      ${group_by === 'reviewer'
        ? html`<div class="cmp-extra">
            리뷰 라운드<br />${group.review_rounds_mean?.toFixed(1) ??
            EMPTY_CELL}
          </div>`
        : null}
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
      ${(group_by === 'setting' || open) && group.children?.length
        ? html`<div class="cmp-children">
            ${sortedUnits(group.children).map((/** @type {any} */ child) =>
              groupCardTemplate(child, group)
            )}
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
                html`<span class="ui-chip cmp-chip" title=${chip.title}
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
   * @param {any} [group]
   * @param {any} [parent]
   */
  function metricTemplate(
    metric,
    label,
    value,
    note,
    best,
    rate = null,
    group = null,
    parent = null
  ) {
    const best_label = /** @type {Record<string, string>} */ ({
      landing: '최고',
      problem: '최소',
      duration: '최단',
      cost: '최저'
    })[metric];
    const is_best = Boolean(best_label && best.includes(metric));
    /** @param {any} item */
    const metricValue = (item) =>
      metric === 'landing'
        ? item?.landing_rate
        : metric === 'problem'
          ? item?.problem_rate
          : metric === 'duration'
            ? item?.duration_ms?.mean
            : item?.cost_usd?.mean;
    const raw = metricValue(group);
    const visible_units = model.groups.flatMap((item) => [
      item,
      ...(group_by === 'setting' || expanded.has(item.key)
        ? item.children || []
        : [])
    ]);
    const max = ['landing', 'problem'].includes(metric)
      ? 1
      : Math.max(
          ...visible_units.map(metricValue).filter((value) => value != null),
          raw || 0
        );
    const baseline = metricValue(model.summary);
    const width =
      raw == null || !max
        ? null
        : Math.max(0, Math.min(100, (raw / max) * 100));
    const tick =
      baseline == null || !max
        ? null
        : Math.max(0, Math.min(100, (baseline / max) * 100));
    const problem_keys = PROBLEM_KEYS.filter(
      (key) => model.criteria.effective[key]?.on
    );
    const problem_total = problem_keys.reduce(
      (sum, key) => sum + (group?.problems?.[key] || 0),
      0
    );
    const difference =
      parent && raw != null && metricValue(parent) != null
        ? raw - metricValue(parent)
        : null;
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
      ${difference !== null
        ? html`<small
            class=${`cmp-delta ${(metric === 'landing' ? difference > 0 : difference < 0) ? 'is-better' : difference === 0 ? '' : 'is-worse'}`}
            >${difference < 0 ? '−' : difference > 0 ? '+' : ''}${metric ===
            'cost'
              ? formatCostMedian(Math.abs(difference))
              : metric === 'duration'
                ? formatDuration(Math.abs(difference))
                : `${(Math.abs(difference) * 100).toFixed(1)}p`}</small
          >`
        : null}
      ${width !== null || (typeof rate === 'number' && Number.isFinite(rate))
        ? html`<div
            class="cmp-bar"
            title=${metric === 'problem'
              ? `${problem_keys.map((key) => `${PROBLEM_LABELS[key]} ${group?.problems?.[key] || 0}건`).join(' · ')} · 한 세션이 여러 종류에 걸릴 수 있음`
              : '세로 눈금: 선택한 작업 종류의 평균'}
          >
            <span
              class="cmp-bar__fill"
              style=${`width: ${width ?? Math.max(0, Math.min(100, (rate || 0) * 100))}%`}
            >
              ${metric === 'problem' && problem_total > 0
                ? problem_keys.map(
                    (key) =>
                      html`<i
                        class=${`cmp-segment cmp-segment--${key}`}
                        title=${`${PROBLEM_LABELS[key]} ${group?.problems?.[key] || 0}건`}
                        style=${`width: ${((group?.problems?.[key] || 0) / problem_total) * 100}%`}
                      ></i>`
                  )
                : null}
            </span>
            ${tick === null
              ? null
              : html`<i class="cmp-bar__tick" style=${`left: ${tick}%`}></i>`}
          </div>`
        : null}
    </div>`;
  }

  /**
   * @param {any} group
   * @param {boolean} [summary]
   * @param {any} [parent]
   */
  function metricsTemplate(group, summary = false, parent = null) {
    const best = summary ? [] : group.best || [];
    const cost = group.cost_usd;
    return html`
      ${metricTemplate(
        'landing',
        '착지율',
        formatRate(group.landing_rate),
        `${group.landed}/${group.judged}${summary ? '' : ` · 진행 중 ${group.in_flight}`}`,
        best,
        summary ? null : group.landing_rate,
        group,
        parent
      )}
      ${metricTemplate(
        'problem',
        '문제 세션',
        formatRate(group.problem_rate),
        html`${group.problem_count}/${group.n}${!model.criteria.is_default
          ? html`<span class="cmp-note">· 기준 조정됨</span>`
          : null}`,
        best,
        summary ? null : group.problem_rate,
        group,
        parent
      )}
      ${metricTemplate(
        'duration',
        '평균 시간',
        formatDuration(group.duration_ms?.mean),
        `중앙값 ${formatDuration(group.duration_ms?.median)}`,
        best,
        null,
        group,
        parent
      )}
      ${metricTemplate(
        'cost',
        '평균 비용',
        formatCostMedian(cost?.mean),
        `중앙값 ${formatCostMedian(cost?.median)} · ${costSampleNote(cost)}${!summary && cost?.partial_count > 0 ? ` · 부분 ${cost.partial_count}` : ''}`,
        best,
        null,
        group,
        parent
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

  /**
   * Order units by the selected column; small samples always sink (false
   * keeps their own order otherwise).
   *
   * @param {any[]} units
   */
  function sortedUnits(units) {
    return [...units].sort((left, right) => {
      if (Boolean(left.small_sample) !== Boolean(right.small_sample)) {
        return left.small_sample ? 1 : -1;
      }
      if (sort === 'sessions') {
        return compareMetric(left.n, right.n, descending);
      }
      if (sort === 'name') {
        return descending
          ? right.name.localeCompare(left.name)
          : left.name.localeCompare(right.name);
      }
      if (sort === 'problem') {
        return compareMetric(left.problem_rate, right.problem_rate, descending);
      }
      if (sort === 'duration') {
        return compareMetric(
          left.duration_ms?.mean,
          right.duration_ms?.mean,
          descending
        );
      }
      if (sort === 'cost') {
        return compareMetric(
          left.cost_usd?.mean,
          right.cost_usd?.mean,
          descending
        );
      }
      return (
        compareMetric(left.landing_rate, right.landing_rate, descending) ||
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
        해당 작업 종류와 기간의 실행 기록이 없어 견줄 수 없습니다. 기간이나 작업
        종류를 바꿔 보세요.
      </div>`;
    }
    return html`
      ${model.groups
        .flatMap((group) =>
          group_by === 'setting' && group.children?.length
            ? group.children
            : [group]
        )
        .some((/** @type {any} */ unit) => unit.eligible)
        ? null
        : html`<p class="cmp-empty">
            표본이 5건 이상이고 설정·실행 기록이 있는 비교 단위가 없습니다. 아래
            기록은 순위에서 제외했습니다.
          </p>`}
      <section
        class="cmp-grid ${['impl_actor', 'reviewer'].includes(group_by)
          ? 'has-extra'
          : ''}"
        role="table"
        aria-label="그룹별 비교"
      >
        <div class="cmp-table-head">
          ${[
            { key: 'name', label: '이름' },
            { key: 'sessions', label: '세션' },
            { key: 'landing', label: '착지율' },
            { key: 'problem', label: '문제 세션' },
            { key: 'duration', label: '평균 시간' },
            { key: 'cost', label: '평균 비용' }
          ].map(
            (column) =>
              html`<button
                class="op-btn op-btn--ghost"
                aria-label=${`${column.label} 정렬`}
                aria-pressed=${sort === column.key}
                @click=${() => {
                  descending =
                    sort === column.key
                      ? !descending
                      : column.key === 'sessions' || column.key === 'landing';
                  sort = column.key;
                  doRender();
                }}
              >
                ${column.label}${sort === column.key
                  ? descending
                    ? ' ↓'
                    : ' ↑'
                  : ''}
              </button>`
          )}
          ${group_by === 'impl_actor'
            ? html`<span>리프를 고른 방식</span>`
            : group_by === 'reviewer'
              ? html`<span>리뷰 라운드</span>`
              : null}
        </div>
        ${sortedUnits(model.groups).map((group) => groupCardTemplate(group))}
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
          <h2 class="cmp-title">실행 설정 비교</h2>
          <span class="cmp-head__summary"
            >${range_label} · ${workspace_label} · 세션 ${summary?.n ?? 0}건 ·
            이슈 ${summary?.issue_count ?? 0}건</span
          >
        </header>
        ${filtersTemplate()}
        <div class="cmp-work-types" role="group" aria-label="작업 종류">
          ${[
            { key: 'general', label: '일반 작업' },
            { key: 'quick_fix', label: 'quick fix' }
          ].map(
            (choice) =>
              html`<button
                class=${`op-btn${work_type === choice.key ? ' is-active' : ''}`}
                aria-pressed=${work_type === choice.key}
                @click=${() => {
                  work_type = choice.key;
                  if (
                    work_type === 'quick_fix' &&
                    !['setting', 'reviewer'].includes(group_by)
                  ) {
                    group_by = 'setting';
                  }
                  try {
                    localStorage.setItem(WORK_TYPE_STORAGE_KEY, work_type);
                  } catch {
                    /* Optional storage. */
                  }
                  void fetchSnapshot();
                }}
              >
                ${choice.label} ${work_counts[choice.key] ?? '—'}
              </button>`
          )}
        </div>
        ${summary
          ? html`<p class="cmp-baseline">
              ${work_type === 'quick_fix' ? 'quick fix' : '일반 작업'} 세션
              ${summary.n}건 · 이슈 ${summary.issue_count}건 · 진행 중
              ${summary.in_flight}건. 착지율
              ${formatRate(summary.landing_rate)}, 문제 세션
              ${formatRate(summary.problem_rate)}, 평균 시간
              ${formatDuration(summary.duration_ms?.mean)}(중앙값
              ${formatDuration(summary.duration_ms?.median)}), 평균 비용
              ${formatCostMedian(summary.cost_usd?.mean)}(중앙값
              ${formatCostMedian(summary.cost_usd?.median)}). 막대의 세로 눈금은
              이 평균입니다.
            </p>`
          : null}
        ${groupByTemplate()}
        <p class="cmp-view-description">
          ${group_by === 'setting'
            ? '오케스트레이터와 구현 리프 설정이 같은 세션을 묶고, 리뷰어 차이를 아래에 표시합니다.'
            : group_by === 'orchestration'
              ? '전체 작업을 조율한 모델과 강도로 묶습니다.'
              : group_by === 'impl_actor'
                ? '실제로 구현을 맡은 리프 모델로 묶습니다.'
                : '실제로 구현 리뷰를 맡은 모델과 강도로 묶습니다.'}
        </p>
        ${summary
          ? html`<section class="cmp-findings" aria-label="눈여겨볼 차이">
              <h3>눈여겨볼 차이</h3>
              <ul>
                ${comparisonFindings(model, group_by).map(
                  (line) => html`<li>${line}</li>`
                )}
              </ul>
            </section>`
          : null}
        ${model.warnings.includes('preset_store_unreadable')
          ? html`<div class="cmp-warning">
              프리셋 저장소를 읽지 못해 프리셋 대조를 건너뛰었습니다
            </div>`
          : null}
        ${bodyTemplate()}
        <p class="cmp-legend">
          초록 칸은 표본이 충분한 비교 단위 중 유일한 최고 값입니다.
          ${PROBLEM_KEYS.filter((key) => model.criteria.effective[key]?.on).map(
            (key) =>
              html`<span class="cmp-legend__item"
                ><span
                  class=${`cmp-segment cmp-segment--${key} cmp-legend__swatch`}
                ></span
                >${PROBLEM_LABELS[key]}</span
              >`
          )}
          ${formatCriteriaLegend(
            model.criteria.effective,
            model.criteria.baselines
          )}
        </p>
        <details class="cmp-glossary">
          <summary>용어 설명</summary>
          <dl>
            <dt>오케스트레이터</dt>
            <dd>전체 작업을 조율한 모델입니다(이전 이름: 오케스트레이션).</dd>
            <dt>구현 리프</dt>
            <dd>구현을 위임받은 모델입니다(이전 이름: 구현 실행자).</dd>
            <dt>리프 자동 / 고정</dt>
            <dd>
              자동은 작업에 맞춰 모델을 고르고, 고정은 설정한 모델을 씁니다.
            </dd>
            <dt>직접 구현</dt>
            <dd>리프 없이 오케스트레이터가 구현했습니다(이전 이름: main).</dd>
            <dt>auto 묶음</dt>
            <dd>
              여러 리프 모델을 쓴 세션은 claude auto·codex auto·모든 런타임
              auto로 묶습니다.
            </dd>
            <dt>관측 기록 없음</dt>
            <dd>
              실행 레그가 남지 않아 실제 모델을 알 수 없습니다. 실행자가
              없었다는 뜻은 아닙니다.
            </dd>
            <dt>추정 / 설정 모름</dt>
            <dd>
              추정은 프리셋의 지금 설정을 참고한 값입니다. 당시 설정과 다를 수
              있습니다. 설정 모름은 참고할 기록도 없는 경우입니다.
            </dd>
            <dt>착지</dt>
            <dd>작업이 머지·push 또는 변경 없는 종결로 끝났습니다.</dd>
            <dt>문제 세션</dt>
            <dd>
              켜 둔 문제 기준에 하나라도 걸린 세션입니다. 한 세션이 여러 종류에
              걸릴 수 있습니다.
            </dd>
            <dt>표본 적음</dt>
            <dd>세션이 5건 미만이라 순위에서 뺍니다.</dd>
          </dl>
        </details>
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
