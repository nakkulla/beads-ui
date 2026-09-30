/**
 * The compare screen (compare-redesign §3, UI-dbn6 §3.9): real work results
 * per preset / orchestration model / implementation actor, as one table — a
 * row per group with its metrics and problem counts, a group expanded into
 * its session rows (a session opens the issue detail). Filters: period
 * (presets or custom dates), repository, route, the grouping axis and the
 * local sort; the `문제 기준` popover; `새로고침`; the 판정 기준 legend folded
 * under the table.
 *
 * The data is one `get-compare` request/reply — no push: it is read when the
 * screen opens, when a filter or the criteria change and on `새로고침`.
 * `include_bench` is always `false` and the reply's experiment material
 * (`runs`, `bench_rows`) is never read: the experiment section is gone.
 */
import { html, nothing } from 'lit-html';
import {
  COMPARE_RANGE_OPTIONS,
  isCompareRange,
  localDayStartMs
} from '../../data/closed-range.js';
import { ROUTE_FILTER_OPTIONS } from '../../model/lane-model.js';
import { render } from '../../ui/render.js';
import {
  DEFAULT_PROBLEM_CRITERIA,
  PROBLEM_CRITERIA_LIMITS,
  normalizeProblemCriteria
} from '../../utils/compare-problem-criteria.js';
import { debug } from '../../utils/logging.js';
import { groupRowsTemplate, summaryTemplate } from './compare-rows.js';
import { criteriaTemplate } from './criteria.js';
import { formatCriteriaLegend } from './format.js';

/**
 * 기본 기간. `CLOSED_RANGE_OPTIONS`의 기본값 `today`는 비교 표본이 거의 없어
 * 표를 비운 것처럼 보이므로, 이 화면은 30일에서 시작한다.
 *
 * @type {string}
 */
const DEFAULT_RANGE = '30d';
const RANGE_STORAGE_KEY = 'bdui.compare.range';
const PROBLEM_CRITERIA_STORAGE_KEY = 'bdui.compare.problem_criteria';

/** The grouping axes, in segment order. */
const GROUP_AXES = [
  { value: 'preset', label: '프리셋' },
  { value: 'orchestration', label: '오케스트레이션 모델' },
  { value: 'impl_actor', label: '구현 실행자' }
];

/** The local sort keys. */
const SORTS = [
  { value: 'landing', label: '착지율' },
  { value: 'problem', label: '문제율' },
  { value: 'duration', label: '평균 시간' },
  { value: 'cost', label: '평균 비용' }
];

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
 * @param {number|null|undefined} left
 * @param {number|null|undefined} right
 * @param {boolean} [descending]
 * @returns {number}
 */
function compareMetric(left, right, descending = false) {
  if (left === null || left === undefined) {
    return right === null || right === undefined ? 0 : 1;
  }
  if (right === null || right === undefined) {
    return -1;
  }
  return descending ? right - left : left - right;
}

/**
 * @typedef {Object} CompareViewOptions
 * @property {(type: string, payload?: unknown) => Promise<any>} [transport]
 * @property {(id: string, root_dir?: string) => void} [gotoIssue] - A
 * session row of another repo names its `root_dir`.
 */

/**
 * @param {HTMLElement} root
 * @param {CompareViewOptions} [options]
 */
export function createCompareView(root, options = {}) {
  const log = debug('screens:compare');
  const { transport, gotoIssue } = options;

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
  // Once this screen has chosen criteria, its own choice is the base for the
  // next edit; a reset chooses the defaults even before the reply lands.
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
   * `get-compare` once. A reply that lands after a newer request is dropped:
   * a fast filter change must not let an old table overwrite the new one.
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
        include_bench: false,
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
   * @param {'root_dir'|'route'} key
   * @param {string} value
   */
  function onFilterChange(key, value) {
    filters[key] = value;
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

  function resetCriteria() {
    saved_criteria = null;
    criteria_touched = true;
    clearProblemCriteria();
    void fetchSnapshot();
  }

  /**
   * @param {string} label
   * @param {string} value
   * @param {ReadonlyArray<{ value: string, label: string }>} choices
   * @param {(next: string) => void} onChange
   */
  function selectTemplate(label, value, choices, onChange) {
    return html`<label class="cmp-filter">
      <span class="cmp-filter__label">${label}</span>
      <select
        class="ui-select cmp-filter__select"
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
    </label>`;
  }

  function customDatesTemplate() {
    const range_error = customRangeError();
    /**
     * @param {'start_date'|'end_date'} key
     * @param {string} label
     */
    const dateInput = (key, label) =>
      html`<input
        type="date"
        class="ui-input cmp-filter__date"
        aria-label=${label}
        .value=${filters[key]}
        @change=${(/** @type {Event} */ ev) =>
          onCustomDateChange(
            key,
            /** @type {HTMLInputElement} */ (ev.target).value
          )}
      />`;
    return html`<div class="cmp-filter cmp-filter--dates">
      ${dateInput('start_date', '시작일')}
      <span class="cmp-filter__sep" aria-hidden="true">~</span>
      ${dateInput('end_date', '종료일')}
      ${range_error === null
        ? nothing
        : html`<span class="cmp-filter__error" role="alert"
            >${range_error}</span
          >`}
    </div>`;
  }

  function controlsTemplate() {
    const workspace_choices = [
      { value: '', label: '전체 저장소' },
      ...model.workspaces.map((workspace) => ({
        value: workspace.root_dir,
        label: workspace.name
      }))
    ];
    return html`<div class="cmp-controls">
      <div class="ui-seg cmp-group-by" role="group" aria-label="묶기 축">
        ${GROUP_AXES.map(
          (choice) =>
            html`<button
              type="button"
              aria-pressed=${group_by === choice.value ? 'true' : 'false'}
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
        ${filters.range === 'custom' ? customDatesTemplate() : nothing}
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
        ${selectTemplate('정렬', sort, SORTS, (next) => {
          sort = next;
          doRender();
        })}
      </div>
      <div class="cmp-actions">
        ${criteriaTemplate(model.criteria, criteria_open, {
          onChange: changeCriterion,
          onReviewThreshold: changeReviewThreshold,
          onFactor: changeFactor,
          onReset: resetCriteria,
          onToggle: (open) => {
            criteria_open = open;
          }
        })}
        <button
          type="button"
          class="ui-btn ui-btn--sm cmp-refresh"
          ?disabled=${loading}
          @click=${() => void fetchSnapshot()}
        >
          ${loading ? html`<span class="ui-spinner"></span>` : '↻'} 새로고침
        </button>
      </div>
    </div>`;
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

  function tableTemplate() {
    const axis =
      GROUP_AXES.find((choice) => choice.value === group_by)?.label || '그룹';
    return html`<div class="cmp-tablewrap">
      <table class="cmp-table">
        <thead>
          <tr>
            <th scope="col">${axis}</th>
            <th scope="col" class="cmp-num">착지율</th>
            <th scope="col" class="cmp-num">문제 세션</th>
            <th scope="col" class="cmp-num">평균 시간</th>
            <th scope="col" class="cmp-num">평균 비용</th>
            <th scope="col">문제</th>
          </tr>
        </thead>
        <tbody>
          ${sortedGroups().map((group) =>
            groupRowsTemplate(group, {
              rows: model.rows,
              criteria: model.criteria,
              open: expanded.has(group.key),
              onToggle: toggleGroup,
              gotoIssue
            })
          )}
        </tbody>
      </table>
    </div>`;
  }

  function bodyTemplate() {
    if (error !== null) {
      return html`<div class="cmp-error" role="alert">
        <span>비교 데이터를 읽지 못했습니다 — ${error}</span>
        <button
          type="button"
          class="ui-btn ui-btn--sm"
          @click=${() => void fetchSnapshot()}
        >
          ↻ 다시 시도
        </button>
      </div>`;
    }
    if (!loaded_once) {
      return html`<div class="cmp-empty">${loading ? '읽는 중…' : ''}</div>`;
    }
    if (model.groups.length === 0) {
      return html`<div class="cmp-empty">
        해당 조건의 실행 기록이 없습니다
      </div>`;
    }
    return tableTemplate();
  }

  /** @returns {string} */
  function rangeLabel() {
    if (filters.range !== 'custom') {
      return (
        COMPARE_RANGE_OPTIONS.find((option) => option.value === filters.range)
          ?.label || filters.range
      );
    }
    if (filters.start_date !== '' && filters.end_date !== '') {
      return `${filters.start_date} ~ ${filters.end_date}`;
    }
    if (filters.start_date !== '') {
      return `${filters.start_date} 이후`;
    }
    return filters.end_date !== '' ? `${filters.end_date}까지` : '전체 기간';
  }

  function template() {
    const summary = model.summary;
    const workspace_label = filters.root_dir
      ? model.workspaces.find(
          (workspace) => workspace.root_dir === filters.root_dir
        )?.name || filters.root_dir
      : '전체 저장소';
    return html`<div class="cmp">
      <header class="cmp-head">
        <h2 class="cmp-title">프리셋 비교</h2>
        <span class="cmp-head__summary"
          >${rangeLabel()} · ${workspace_label} · 세션 ${summary?.n ?? 0}건 ·
          이슈 ${summary?.issue_count ?? 0}건</span
        >
      </header>
      ${controlsTemplate()}
      ${summary ? summaryTemplate(summary, model.criteria) : nothing}
      ${model.warnings.includes('preset_store_unreadable')
        ? html`<div class="cmp-warning">
            프리셋 저장소를 읽지 못해 프리셋 대조를 건너뛰었습니다
          </div>`
        : nothing}
      ${bodyTemplate()}
      <details class="cmp-legend">
        <summary>판정 기준</summary>
        <p class="cmp-legend__text">
          ${formatCriteriaLegend(
            model.criteria.effective,
            model.criteria.baselines
          )}
        </p>
      </details>
    </div>`;
  }

  function doRender() {
    render(template(), root);
  }

  doRender();

  return {
    /** Called when the screen opens: read the snapshot again. */
    load() {
      if (!loading) {
        void fetchSnapshot();
      }
    },
    /**
     * Called when the screen is left. There is no subscription to release;
     * this only invalidates a reply still in flight.
     */
    pause() {
      request_seq += 1;
      loading = false;
    },
    /** Re-read the snapshot now, whatever the screen already holds. */
    refresh() {
      return fetchSnapshot();
    },
    destroy() {
      render(html``, root);
    }
  };
}
