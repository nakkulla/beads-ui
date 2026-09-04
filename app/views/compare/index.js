/**
 * 비교 탭 (preset-compare §3) — 실행 프리셋별 실작업 결과를 한 표에 놓는다.
 *
 * 프리셋 저장소가 서버 전역이라 이 탭은 Monitor와 같은 global 마운트 쪽이며,
 * 보이는 저장소 전부를 한 표에 놓고 저장소 필터로 좁힌다(§3.1). 데이터는
 * `get-compare` → `compare-snapshot` 요청·응답 한 쌍이고 실시간 push는 없다 —
 * 탭을 열 때·필터를 바꿀 때·`새로고침`을 누를 때만 다시 읽는다(§3.5).
 *
 * 표만 그린다: 정확도 대 비용 점 그래프는 §3.6이 범위 밖으로 뺐다.
 *
 * 탭 위쪽은 실험(§4.7)이다: `bench-run-list`가 주는 실험 목록과 `새 실험` 폼,
 * 그리고 고른 실험을 프리셋별로 묶어 §3과 같은 여섯 열로 보이는 표. 실험 표의
 * 재료는 같은 `get-compare` 스냅샷이며 `include_bench`만 켠다 — 결과 원장을 따로
 * 두지 않는다는 §4.7의 결정이 여기서도 그대로다.
 */
import { html, render } from 'lit-html';
import { CLOSED_RANGE_OPTIONS } from '../../data/closed-range.js';
import { ISSUE_TYPES } from '../../utils/issue-type.js';
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
  formatDuration,
  formatOutcome,
  formatPrice,
  formatRate,
  formatReview,
  formatTokens,
  formatVerify,
  sampleNote
} from './format.js';

/**
 * 기본 기간. `CLOSED_RANGE_OPTIONS`의 기본값 `today`는 비교 표본이 거의 없어
 * 표를 비운 것처럼 보이므로, 이 탭은 30일에서 시작한다.
 *
 * @type {string}
 */
const DEFAULT_RANGE = '30d';

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

  /** @type {{ range: string, root_dir: string, issue_type: string, route: string, include_bench: boolean }} */
  const filters = {
    range: DEFAULT_RANGE,
    root_dir: '',
    issue_type: '',
    route: '',
    include_bench: false
  };
  /** @type {{ rows: any[], groups: any[], workspaces: Array<{ root_dir: string, name: string }> }} */
  let model = { rows: [], groups: [], workspaces: [] };
  /** @type {Set<string>} */
  const expanded = new Set();
  let loading = false;
  /** @type {string|null} */
  let error = null;
  let loaded_once = false;
  let request_seq = 0;

  /**
   * 실험(§4.7) 상태. 실험 표의 행 재료 `bench_rows`는 본 표와 같은
   * `get-compare`지만 필터가 다르다 — 기간 전체·`include_bench` 켬이라, 본 표의
   * 필터를 바꿔도 고른 실험의 셀이 사라지지 않는다.
   *
   * @type {{ runs: Array<Record<string, any>>, error: string|null, loading: boolean, selected: string|null, rows: Array<Record<string, any>>, rows_error: string|null }}
   */
  const bench = {
    runs: [],
    error: null,
    loading: false,
    selected: null,
    rows: [],
    rows_error: null
  };
  /** @type {Set<string>} */
  const bench_expanded = new Set();
  let bench_request_seq = 0;

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
   * `get-compare` 한 번. 응답이 늦게 도착한 이전 요청은 버린다 — 필터를 빠르게
   * 바꾸면 오래된 표가 새 표를 덮어쓸 수 있다.
   */
  async function fetchSnapshot() {
    if (!transport) {
      return;
    }
    const seq = (request_seq += 1);
    loading = true;
    error = null;
    doRender();
    try {
      const reply = await transport('get-compare', {
        range: filters.range,
        root_dirs: filters.root_dir ? [filters.root_dir] : [],
        issue_types: filters.issue_type ? [filters.issue_type] : [],
        routes: filters.route ? [filters.route] : [],
        include_bench: filters.include_bench
      });
      if (seq !== request_seq) {
        return;
      }
      const payload = reply && reply.payload ? reply.payload : reply;
      model = {
        rows: Array.isArray(payload?.rows) ? payload.rows : [],
        groups: Array.isArray(payload?.groups) ? payload.groups : [],
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

  /** `bench-run-list` 한 번. 실패는 실험 자리에만 남고 본 표를 건드리지 않는다. */
  async function fetchRuns() {
    if (!transport) {
      return;
    }
    bench.loading = true;
    bench.error = null;
    doRender();
    try {
      const reply = await transport('bench-run-list', {});
      const payload = reply && reply.payload ? reply.payload : reply;
      bench.runs = Array.isArray(payload?.runs) ? payload.runs : [];
      if (
        bench.selected !== null &&
        !bench.runs.some((run) => run.run_id === bench.selected)
      ) {
        bench.selected = null;
      }
      if (!form.open) {
        form.reviewer = reviewerDefaults(bench.runs);
      }
    } catch (err) {
      log('bench-run-list failed: %o', err);
      bench.error = benchErrorMessage(err);
    } finally {
      bench.loading = false;
      doRender();
    }
  }

  /**
   * Read the row material of the selected experiment. An experiment lives in
   * one workspace, so the read narrows to it, and the period is the whole
   * history: a person who picked an experiment must not get an empty table
   * because the main table's period filter is narrower.
   *
   * @param {Record<string, any>} run
   */
  async function fetchBenchRows(run) {
    if (!transport) {
      return;
    }
    const seq = (bench_request_seq += 1);
    bench.rows_error = null;
    try {
      const reply = await transport('get-compare', {
        range: 'all',
        root_dirs: run.root_dir ? [run.root_dir] : [],
        issue_types: [],
        routes: [],
        include_bench: true
      });
      if (seq !== bench_request_seq) {
        return;
      }
      const payload = reply && reply.payload ? reply.payload : reply;
      bench.rows = Array.isArray(payload?.rows) ? payload.rows : [];
    } catch (err) {
      if (seq !== bench_request_seq) {
        return;
      }
      log('bench rows read failed: %o', err);
      bench.rows = [];
      bench.rows_error = benchErrorMessage(err);
    } finally {
      if (seq === bench_request_seq) {
        doRender();
      }
    }
  }

  /** @param {string} run_id */
  function selectRun(run_id) {
    if (bench.selected === run_id) {
      bench.selected = null;
      doRender();
      return;
    }
    bench.selected = run_id;
    bench.rows = [];
    doRender();
    const run = bench.runs.find((entry) => entry.run_id === run_id);
    if (run) {
      void fetchBenchRows(run);
    }
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
      await fetchRuns();
      if (run_id !== null) {
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

  function filtersTemplate() {
    const workspace_choices = [
      { value: '', label: '전체 저장소' },
      ...model.workspaces.map((workspace) => ({
        value: workspace.root_dir,
        label: workspace.name
      }))
    ];
    return html`
      <div class="cmp-filters">
        ${selectTemplate(
          '기간',
          filters.range,
          CLOSED_RANGE_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label
          })),
          (next) => onFilterChange('range', next)
        )}
        ${selectTemplate(
          '저장소',
          filters.root_dir,
          workspace_choices,
          (next) => onFilterChange('root_dir', next)
        )}
        ${selectTemplate(
          '유형',
          filters.issue_type,
          [
            { value: '', label: '전체 유형' },
            ...ISSUE_TYPES.map((type) => ({ value: type, label: type }))
          ],
          (next) => onFilterChange('issue_type', next)
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
          <span>bench 실험 포함</span>
        </label>
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
   * @param {{ median: number|null, sample: number, total: number }|null|undefined} stat
   * @param {(value: number|null|undefined) => string} formatValue
   */
  function medianTemplate(stat, formatValue) {
    const note = sampleNote(stat);
    return html`${formatValue(stat?.median)}
    ${note ? html`<span class="cmp-note">${note}</span>` : null}`;
  }

  /** @param {any} row */
  function attemptRowTemplate(row) {
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
  function groupRowsTemplate(group) {
    const open = expanded.has(group.key);
    const ids = new Set(group.attempt_ids || []);
    const rows = open
      ? model.rows.filter((row) => ids.has(row.attempt_id))
      : [];
    return html`
      <tr
        class="cmp-row cmp-row--group ${open ? 'is-open' : ''}"
        @click=${() => toggleGroup(group.key)}
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
      ${rows.map((row) => attemptRowTemplate(row))}
    `;
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
            attemptRowTemplate(row)
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
        ${bench.rows_error !== null
          ? html`<div class="cmp-error" role="alert">
              <span>실험 결과를 읽지 못했습니다 — ${bench.rows_error}</span>
              <button
                type="button"
                class="op-btn"
                @click=${() => void fetchBenchRows(run)}
              >
                새로고침
              </button>
            </div>`
          : null}
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

  /** The whole experiment section above the comparison table (§4.7). */
  function benchTemplate() {
    const selected =
      bench.selected === null
        ? null
        : (bench.runs.find((run) => run.run_id === bench.selected) ?? null);
    return html`
      <section class="cmp-bench">
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
        ${bench.error !== null
          ? html`<div class="cmp-error" role="alert">
              <span>실험 목록을 읽지 못했습니다 — ${bench.error}</span>
              <button
                type="button"
                class="op-btn"
                @click=${() => void fetchRuns()}
              >
                새로고침
              </button>
            </div>`
          : null}
        ${bench.runs.length === 0 && bench.error === null
          ? html`<div class="cmp-empty">
              ${bench.loading ? '읽는 중…' : '실험 없음'}
            </div>`
          : html`<div class="cmp-runs">
              ${bench.runs.map((run) => runRowTemplate(run))}
            </div>`}
        ${selected === null ? null : runDetailTemplate(selected)}
      </section>
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
      <table class="cmp-table">
        <thead>
          <tr>
            <th scope="col">프리셋 · 서명</th>
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
          ${model.groups.map((group) => groupRowsTemplate(group))}
        </tbody>
      </table>
    `;
  }

  function template() {
    return html`
      <div class="cmp">
        <header class="cmp-head">
          <h2 class="cmp-title">프리셋 실사용 비교</h2>
          ${filtersTemplate()}
        </header>
        ${benchTemplate()} ${bodyTemplate()}
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
     * Called when the tab opens. A table already read is left alone — the
     * `새로고침` button is the re-read, not a tab switch.
     */
    load() {
      if (!loaded_once && !loading) {
        void fetchSnapshot();
      }
      // 실험 목록은 매번 다시 읽는다: 셀 상태가 Worker 진행에 따라 바뀌므로
      // 탭을 다시 여는 것이 진행 `3/9`를 새로 보는 자연스러운 계기다.
      if (!bench.loading) {
        void fetchRuns();
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
    /** Re-read the experiment list now (§4.7). */
    refreshRuns() {
      return fetchRuns();
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
