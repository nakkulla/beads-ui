/**
 * 비교 탭 (compare-redesign §3) — 프리셋·모델별 실작업 결과를 카드로 비교한다.
 *
 * 프리셋 저장소가 서버 전역이라 이 탭은 Monitor와 같은 global 마운트 쪽이며,
 * 보이는 저장소 전부를 한 표에 놓고 저장소 필터로 좁힌다(§3.1). 데이터는
 * `get-compare` → `compare-snapshot` 요청·응답 한 쌍이고 실시간 push는 없다 —
 * 탭을 열 때·필터를 바꿀 때·`새로고침`을 누를 때만 다시 읽는다(§3.5).
 *
 * 탭 아래 접힌 절은 실험(§4.7)이다: `새 실험` 폼과 실험 목록, 그리고 고른 실험을
 * 프리셋별로 묶어 §3과 같은 여섯 열로 보이는 표. 실험 목록 `runs`와 실험 셀 행
 * `bench_rows`는 같은 `compare-snapshot` 응답에 함께 온다 — 이 스펙이 더하는 ws
 * op은 §3.5가 셋으로 열거했고, 결과 원장을 따로 두지 않는다는 §4.7의 결정이
 * 여기서도 그대로다. `bench_rows`는 서버가 필터와 무관하게 싣기 때문에 본 표의
 * 기간·저장소 필터를 좁혀도 고른 실험의 셀이 사라지지 않는다.
 */
import { html, render } from 'lit-html';
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
  BENCH_REVIEWER_KEYS,
  benchErrorMessage,
  benchFormReady,
  benchSourceEligibility,
  benchSourceOptions,
  clampRepeats,
  reviewerDefaults
} from './bench-form.js';
import { benchPresetGroups, benchProgress } from './bench-model.js';
import {
  EMPTY_CELL,
  formatCostMedian,
  formatCriteriaLegend,
  formatDuration,
  formatFactorChip,
  formatOutcome,
  formatOutcomeText,
  formatPrice,
  formatRate,
  formatReview,
  formatTokens,
  formatVerify,
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
 * @typedef {Object} CompareViewOptions
 * @property {(type: string, payload?: unknown) => Promise<any>} [transport]
 * @property {(id: string) => void} [gotoIssue]
 * @property {{ get: () => ({ presets: Array<Record<string, any>> }|null), subscribe?: (fn: () => void) => () => void }} [execPresetStore]
 * @property {() => Array<Record<string, any>>} [sourceCandidates]
 */

/**
 * @param {HTMLElement} root
 * @param {CompareViewOptions} [options]
 */
export function createCompareView(root, options = {}) {
  const log = debug('views:compare');
  const transport = options.transport;
  const gotoIssue = options.gotoIssue;
  const execPresetStore = options.execPresetStore;
  const sourceCandidates = options.sourceCandidates;

  /** @type {{ range: string, start_date: string, end_date: string, root_dir: string, route: string, include_bench: boolean }} */
  const filters = {
    range: loadCompareRange(),
    start_date: '',
    end_date: '',
    root_dir: '',
    route: '',
    include_bench: false
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
    return { since, until: until_date.getTime() };
  }

  /**
   * 실험(§4.7) 상태. `runs`와 `rows` 모두 같은 `compare-snapshot` 응답에서
   * 온다 — 실험 표의 행 재료는 서버가 필터와 무관하게 싣는 `bench_rows`다.
   *
   * @type {{ runs: Array<Record<string, any>>, selected: string|null, rows: Array<Record<string, any>> }}
   */
  const bench = {
    runs: [],
    selected: null,
    rows: []
  };
  /** @type {Set<string>} */
  const bench_expanded = new Set();

  /**
   * The new-experiment form state. Only drawn while `open`.
   *
   * @type {{ open: boolean, source_id: string, query: string, preset_ids: string[], repeats: number, reviewer_mode: 'fixed'|'preset', reviewer: Record<string, string>, error: string|null, submitting: boolean }}
   */
  const form = {
    open: false,
    source_id: '',
    query: '',
    preset_ids: [],
    repeats: 1,
    reviewer_mode: 'fixed',
    reviewer: reviewerDefaults([]),
    error: null,
    submitting: false
  };

  /**
   * `get-compare` 한 번 — 본 표·실험 목록·실험 셀 행이 모두 이 응답 하나에
   * 온다. 응답이 늦게 도착한 이전 요청은 버린다: 필터를 빠르게 바꾸면 오래된
   * 표가 새 표를 덮어쓸 수 있다.
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
        include_bench: filters.include_bench,
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
      bench.runs = Array.isArray(payload?.runs) ? payload.runs : [];
      bench.rows = Array.isArray(payload?.bench_rows) ? payload.bench_rows : [];
      if (
        bench.selected !== null &&
        !bench.runs.some((run) => run.run_id === bench.selected)
      ) {
        bench.selected = null;
      }
      if (!form.open) {
        form.reviewer = reviewerDefaults(bench.runs);
      }
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

  /** @param {string} run_id */
  function selectRun(run_id) {
    bench.selected = bench.selected === run_id ? null : run_id;
    doRender();
  }

  /** Whether the payload is submittable — the server `bad_request` rules. */
  function formReady() {
    const issue = candidateById(form.source_id);
    return benchFormReady({
      source_id: form.source_id,
      source_eligible:
        issue === null ? false : benchSourceEligibility(issue).eligible,
      preset_ids: form.preset_ids,
      repeats: form.repeats,
      reviewer_mode: form.reviewer_mode,
      reviewer: form.reviewer
    });
  }

  /** `bench-run-create` 한 번. 성공하면 폼을 닫고 새 실험을 골라 둔다. */
  async function submitForm() {
    if (!transport || form.submitting || !formReady()) {
      return;
    }
    form.submitting = true;
    form.error = null;
    doRender();
    try {
      const reply = await transport('bench-run-create', {
        source_id: form.source_id,
        preset_ids: [...form.preset_ids],
        repeats: form.repeats,
        reviewer_mode: form.reviewer_mode,
        ...(form.reviewer_mode === 'fixed' ? { reviewer: form.reviewer } : {})
      });
      const payload = reply && reply.payload ? reply.payload : reply;
      const run_id =
        payload && payload.run && typeof payload.run.run_id === 'string'
          ? payload.run.run_id
          : null;
      form.open = false;
      form.error = null;
      await fetchSnapshot();
      if (run_id !== null && bench.selected !== run_id) {
        selectRun(run_id);
      }
    } catch (err) {
      log('bench-run-create failed: %o', err);
      form.error = benchErrorMessage(err);
    } finally {
      form.submitting = false;
      doRender();
    }
  }

  /**
   * @param {string} id
   * @returns {Record<string, any>|null}
   */
  function candidateById(id) {
    if (!sourceCandidates || id.length === 0) {
      return null;
    }
    for (const issue of sourceCandidates()) {
      if (issue && issue.id === id) {
        return issue;
      }
    }
    return null;
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
  function successTemplate(group) {
    const rate = formatRate(group.success_rate);
    const unknown =
      typeof group.unknown_count === 'number' && group.unknown_count > 0
        ? html`<span class="cmp-note">미상 ${group.unknown_count}</span>`
        : null;
    const caret = group.pass_caret
      ? html`<span class="cmp-note"
          >pass^${group.pass_caret.k}
          ${formatRate(group.pass_caret.value)}</span
        >`
      : null;
    const sample =
      typeof group.success_sample === 'number' &&
      group.success_sample !== group.n
        ? html`<span class="cmp-note"
            >n=${group.success_sample}/${group.n}</span
          >`
        : null;
    return html`${rate} ${sample} ${caret} ${unknown}`;
  }

  /**
   * @param {{ median: number|null, sample: number, total: number, partial?: boolean }|null|undefined} stat
   * @param {(value: number|null|undefined) => string} formatValue
   */
  function medianTemplate(stat, formatValue) {
    const note = sampleNote(stat);
    return html`${formatValue(stat?.median)}
    ${note ? html`<span class="cmp-note">${note}</span>` : null}
    ${stat?.partial === true
      ? html`<span class="cmp-note">부분 집계</span>`
      : null}`;
  }

  /** @param {any} row */
  function benchAttemptRowTemplate(row) {
    const cost_title = costTooltipLines(row.usage || null).join('\n');
    return html`
      <tr
        class="cmp-row cmp-row--attempt"
        @click=${() => gotoIssue && gotoIssue(row.bead_id)}
      >
        <td class="cmp-cell cmp-cell--issue">
          <span class="cmp-issue-id">${row.bead_id}</span>
          <span class="cmp-issue-title">${row.title || ''}</span>
          <span class="cmp-note">${row.workspace_name}</span>
        </td>
        <td class="cmp-cell">${formatDuration(row.duration_ms)}</td>
        <td class="cmp-cell">${formatOutcome(row)}</td>
        <td class="cmp-cell">${formatVerify(row.verify)}</td>
        <td class="cmp-cell">${formatReview(row.review)}</td>
        <td class="cmp-cell">${formatTokens(row.usage?.tokens)}</td>
        <td class="cmp-cell" title=${cost_title}>${formatPrice(row.usage)}</td>
        <td class="cmp-cell cmp-cell--time">
          ${row.finished_at
            ? formatTimestampLocal(row.finished_at)
            : EMPTY_CELL}
        </td>
      </tr>
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
          evidence?.verify === 'merge_verify'
            ? '머지 후보 [verify] 실패'
            : evidence?.verify === 'bench_verify'
              ? 'bench 검증 실패'
              : ''
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
   * Keep benchmark sampleNote behavior; comparison KPIs always show coverage.
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

  /**
   * One experiment row: source title, preset count, repeats, creation time and
   * the `3/9` progress (§4.7). The manifest carries no source title, so it is
   * looked up among the loaded issues and falls back to the id (fail-quiet).
   *
   * @param {Record<string, any>} run
   */
  function runRowTemplate(run) {
    const selected = bench.selected === run.run_id;
    const source = candidateById(String(run.source_bead_id || ''));
    const title =
      source && typeof source.title === 'string' && source.title.length > 0
        ? source.title
        : String(run.source_bead_id || '');
    const progress = benchProgress(run);
    const preset_count = Array.isArray(run.presets) ? run.presets.length : 0;
    return html`
      <button
        type="button"
        class="cmp-run ${selected ? 'is-selected' : ''}"
        data-run-id=${run.run_id}
        @click=${() => selectRun(String(run.run_id))}
      >
        <span class="cmp-run__title">${title}</span>
        <span class="cmp-note">프리셋 ${preset_count}</span>
        <span class="cmp-note">반복 ${run.repeats ?? EMPTY_CELL}</span>
        <span class="cmp-note"
          >${typeof run.created_at === 'number'
            ? formatTimestampLocal(run.created_at)
            : EMPTY_CELL}</span
        >
        <span class="cmp-run__progress"
          >${progress === null ? EMPTY_CELL : progress.text}</span
        >
      </button>
    `;
  }

  /**
   * One preset group of the experiment table. Same cell renderers as the main
   * comparison table; only the grouping key differs.
   *
   * @param {Record<string, any>} group
   */
  function benchGroupTemplate(group) {
    const open = bench_expanded.has(group.key);
    return html`
      <tr
        class="cmp-row cmp-row--group ${open ? 'is-open' : ''}"
        @click=${() => {
          if (bench_expanded.has(group.key)) {
            bench_expanded.delete(group.key);
          } else {
            bench_expanded.add(group.key);
          }
          doRender();
        }}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${open ? '▾' : '▸'}</span>
          <span class="cmp-group-name">${group.name}</span>
          <span class="cmp-note">${group.n}건</span>
        </td>
        <td class="cmp-cell">
          ${medianTemplate(group.duration_ms, formatDuration)}
        </td>
        <td class="cmp-cell">
          실패 ${group.failed_count} · 재시도 ${group.retry_count}
        </td>
        <td class="cmp-cell">${successTemplate(group)}</td>
        <td class="cmp-cell">
          ${medianTemplate(group.blocking, (value) =>
            typeof value === 'number' ? `b${value}` : EMPTY_CELL
          )}
          ${medianTemplate(group.minor, (value) =>
            typeof value === 'number' ? `m${value}` : EMPTY_CELL
          )}
          ${medianTemplate(group.round, (value) =>
            typeof value === 'number' ? `r${value}` : EMPTY_CELL
          )}
        </td>
        <td class="cmp-cell">${medianTemplate(group.tokens, formatTokens)}</td>
        <td class="cmp-cell">
          ${medianTemplate(group.cost_usd, formatCostMedian)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${open
        ? (group.rows || []).map((/** @type {any} */ row) =>
            benchAttemptRowTemplate(row)
          )
        : null}
    `;
  }

  /** @param {Record<string, any>} run */
  function runDetailTemplate(run) {
    const groups = benchPresetGroups(run, bench.rows);
    return html`
      <div class="cmp-run-detail">
        <div class="cmp-run-detail__head">
          <span class="cmp-run-detail__flag">구현 위임 강제</span>
          <span class="cmp-note"
            >리뷰어
            ${run.reviewer_mode === 'preset' ? '프리셋 값' : '고정'}</span
          >
          <span class="cmp-note"
            >base ${String(run.base_sha || '').slice(0, 12)}</span
          >
        </div>
        ${groups.length === 0
          ? html`<div class="cmp-empty">셀이 없습니다</div>`
          : html`<table class="cmp-table cmp-table--bench">
              <thead>
                <tr>
                  <th scope="col">프리셋</th>
                  <th scope="col">시간</th>
                  <th scope="col">실패 · 재시도</th>
                  <th scope="col">검증</th>
                  <th scope="col">리뷰 지적 · 라운드</th>
                  <th scope="col">토큰</th>
                  <th scope="col">가격</th>
                  <th scope="col">종료</th>
                </tr>
              </thead>
              <tbody>
                ${groups.map((group) => benchGroupTemplate(group))}
              </tbody>
            </table>`}
      </div>
    `;
  }

  /** The new-experiment form (§4.2·§4.7). */
  function formTemplate() {
    const preset_state = execPresetStore ? execPresetStore.get() : null;
    const presets = Array.isArray(preset_state?.presets)
      ? preset_state.presets
      : [];
    const candidates = benchSourceOptions(
      sourceCandidates ? sourceCandidates() : [],
      form.query
    );
    return html`
      <form
        class="cmp-form"
        @submit=${(/** @type {Event} */ ev) => {
          ev.preventDefault();
          void submitForm();
        }}
      >
        <div class="cmp-form__note">구현 위임 강제</div>
        <label class="cmp-form__field">
          <span class="cmp-form__label">원본 이슈</span>
          <input
            type="text"
            class="cmp-form__input"
            placeholder="제목 또는 ID"
            .value=${form.query}
            @input=${(/** @type {Event} */ ev) => {
              form.query = String(
                /** @type {HTMLInputElement} */ (ev.target).value || ''
              );
              doRender();
            }}
          />
        </label>
        <div class="cmp-form__candidates">
          ${candidates.length === 0
            ? html`<div class="cmp-empty">후보 없음</div>`
            : candidates.map(
                (candidate) => html`
                  <button
                    type="button"
                    class="cmp-candidate ${form.source_id === candidate.id
                      ? 'is-selected'
                      : ''}"
                    data-source-id=${candidate.id}
                    ?disabled=${!candidate.eligible}
                    title=${candidate.reason}
                    @click=${() => {
                      form.source_id = candidate.id;
                      doRender();
                    }}
                  >
                    <span class="cmp-candidate__id">${candidate.id}</span>
                    <span class="cmp-candidate__title">${candidate.title}</span>
                    ${candidate.eligible
                      ? null
                      : html`<span class="cmp-candidate__reason"
                          >${candidate.reason}</span
                        >`}
                  </button>
                `
              )}
        </div>
        <div class="cmp-form__field">
          <span class="cmp-form__label">프리셋</span>
          <div class="cmp-form__presets">
            ${presets.length === 0
              ? html`<div class="cmp-empty">프리셋 없음</div>`
              : presets.map(
                  (preset) => html`
                    <label class="cmp-form__preset">
                      <input
                        type="checkbox"
                        data-preset-id=${preset.id}
                        .checked=${form.preset_ids.includes(preset.id)}
                        @change=${(/** @type {Event} */ ev) => {
                          const checked = /** @type {HTMLInputElement} */ (
                            ev.target
                          ).checked;
                          form.preset_ids = checked
                            ? [...form.preset_ids, preset.id]
                            : form.preset_ids.filter((id) => id !== preset.id);
                          doRender();
                        }}
                      />
                      <span>${preset.name}</span>
                    </label>
                  `
                )}
          </div>
        </div>
        <label class="cmp-form__field">
          <span class="cmp-form__label">반복</span>
          <input
            type="number"
            class="cmp-form__input cmp-form__input--repeats"
            min="1"
            max="5"
            .value=${String(form.repeats)}
            @change=${(/** @type {Event} */ ev) => {
              const input = /** @type {HTMLInputElement} */ (ev.target);
              form.repeats = clampRepeats(input.value);
              input.value = String(form.repeats);
              doRender();
            }}
          />
        </label>
        <div class="cmp-form__field">
          <span class="cmp-form__label">리뷰어</span>
          <div class="cmp-form__reviewer-mode">
            ${[
              { value: 'fixed', label: '고정' },
              { value: 'preset', label: '프리셋 값' }
            ].map(
              (choice) => html`
                <label class="cmp-form__radio">
                  <input
                    type="radio"
                    name="cmp-reviewer-mode"
                    value=${choice.value}
                    .checked=${form.reviewer_mode === choice.value}
                    @change=${() => {
                      form.reviewer_mode = /** @type {'fixed'|'preset'} */ (
                        choice.value
                      );
                      doRender();
                    }}
                  />
                  <span>${choice.label}</span>
                </label>
              `
            )}
          </div>
        </div>
        ${form.reviewer_mode === 'fixed'
          ? html`<div class="cmp-form__reviewer">
              ${BENCH_REVIEWER_KEYS.map(
                (key) => html`
                  <label class="cmp-form__field">
                    <span class="cmp-form__label">${key}</span>
                    <input
                      type="text"
                      class="cmp-form__input"
                      data-reviewer-key=${key}
                      .value=${form.reviewer[key] || ''}
                      @input=${(/** @type {Event} */ ev) => {
                        form.reviewer = {
                          ...form.reviewer,
                          [key]: String(
                            /** @type {HTMLInputElement} */ (ev.target).value ||
                              ''
                          )
                        };
                      }}
                    />
                  </label>
                `
              )}
            </div>`
          : null}
        ${form.error !== null
          ? html`<div class="cmp-error" role="alert">${form.error}</div>`
          : null}
        <div class="cmp-form__actions">
          <button
            type="submit"
            class="op-btn"
            ?disabled=${form.submitting || !formReady()}
          >
            실험 시작
          </button>
          <button
            type="button"
            class="op-btn"
            @click=${() => {
              form.open = false;
              form.error = null;
              doRender();
            }}
          >
            취소
          </button>
        </div>
      </form>
    `;
  }

  /** The collapsed experiment section below the comparison cards (§4.7). */
  function benchTemplate() {
    const selected =
      bench.selected === null
        ? null
        : (bench.runs.find((run) => run.run_id === bench.selected) ?? null);
    return html`
      <details class="cmp-bench">
        <summary>실험 (bench 클론 실행) · ${bench.runs.length}건</summary>
        <div class="cmp-bench__body">
          <label class="cmp-filter cmp-filter--check">
            <input
              type="checkbox"
              .checked=${filters.include_bench}
              @change=${(/** @type {Event} */ ev) => {
                filters.include_bench = /** @type {HTMLInputElement} */ (
                  ev.target
                ).checked;
                void fetchSnapshot();
              }}
            />
            <span>실사용 표에 실험 세션 포함</span>
          </label>
          <div class="cmp-bench__head">
            <h3 class="cmp-bench__title">실험</h3>
            <button
              type="button"
              class="op-btn cmp-bench__new"
              @click=${() => {
                form.open = !form.open;
                if (form.open) {
                  form.error = null;
                  form.reviewer = reviewerDefaults(bench.runs);
                }
                doRender();
              }}
            >
              새 실험
            </button>
          </div>
          ${form.open ? formTemplate() : null}
          ${bench.runs.length === 0
            ? html`<div class="cmp-empty">
                ${loading ? '읽는 중…' : '실험 없음'}
              </div>`
            : html`<div class="cmp-runs">
                ${bench.runs.map((run) => runRowTemplate(run))}
              </div>`}
          ${selected === null ? null : runDetailTemplate(selected)}
        </div>
      </details>
    `;
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
        ${benchTemplate()}
      </div>
    `;
  }

  function doRender() {
    render(template(), root);
  }

  // 프리셋 목록이 늦게 도착해도 폼의 체크박스가 채워지도록 구독한다. 폼이 닫혀
  // 있으면 그릴 것이 없으므로 다시 그리지 않는다.
  /** @type {null | (() => void)} */
  let unsubscribe_presets = null;
  if (execPresetStore && execPresetStore.subscribe) {
    unsubscribe_presets = execPresetStore.subscribe(() => {
      if (form.open) {
        doRender();
      }
    });
  }

  doRender();

  return {
    /**
     * Called when the tab opens. One request answers both halves now, so the
     * experiment list's own refresh cadence is what this follows.
     */
    load() {
      // 탭을 열 때마다 다시 읽는다: 같은 응답이 실험 목록도 싣고, 셀 상태는
      // Worker 진행에 따라 바뀌므로 탭을 다시 여는 것이 진행 `3/9`를 새로 보는
      // 자연스러운 계기다.
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
      if (unsubscribe_presets) {
        unsubscribe_presets();
        unsubscribe_presets = null;
      }
      render(html``, root);
    }
  };
}
