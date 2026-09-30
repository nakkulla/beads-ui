/**
 * The compare screen's table parts (UI-dbn6 §3.9): the summary KPI tiles,
 * one group row per comparison group (착지율 · 문제 세션 · 평균 시간 · 평균
 * 비용 with the server's `best` markers, the enabled problem counts) and, for
 * an expanded group, its session rows — each a link that opens the issue
 * detail. Values are the `compare-snapshot` material as the server computed
 * it; this module only formats (`format.js`).
 */
import { html, nothing } from 'lit-html';
import { formatTimestampLocal } from '../../model/relative-time.js';
import {
  PROBLEM_KEYS,
  PROBLEM_LABELS
} from '../../utils/compare-problem-criteria.js';
import { costTooltipLines } from '../../utils/token-usage.js';
import {
  EMPTY_CELL,
  formatCostMedian,
  formatDuration,
  formatFactorChip,
  formatOutcomeText,
  formatPrice,
  formatRate,
  outcomeDotKind,
  sampleNote
} from './format.js';

/** Number of table columns — the session row spans them all. */
export const TABLE_COLUMNS = 6;

/**
 * @typedef {Object} CompareCriteria
 * @property {Record<string, any>} effective
 * @property {boolean} is_default
 * @property {{ duration_ms: any, cost_usd: any }} baselines
 */

/**
 * `row.composition` 하나로 서는 세션 행의 구성 줄 (UI-obl0 §2.4). 문자열은
 * 서버가 지은 값 그대로이며 클라이언트에서 다시 조립하지 않는다 — 재료가
 * 없으면 줄을 그리지 않는다. `mixed`일 때만 `parts`의 유닛별 실행자가 title로
 * 붙는다.
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
 * Keep the benchmark `sampleNote` behaviour; comparison KPIs always show
 * coverage.
 *
 * @param {any} stat
 * @returns {string}
 */
function costSampleNote(stat) {
  return sampleNote(stat) || `n=${stat?.sample ?? 0}/${stat?.total ?? 0}`;
}

/** Marker text of a metric the server named best. */
const BEST_LABELS = /** @type {Record<string, string>} */ ({
  landing: '최고',
  duration: '최단',
  cost: '최저'
});

/**
 * One summary KPI tile.
 *
 * @param {string} metric
 * @param {string} label
 * @param {string} value
 * @param {unknown} note
 */
function kpiTemplate(metric, label, value, note) {
  return html`<div class="cmp-kpi" data-metric=${metric}>
    <div class="cmp-kpi__label">${label}</div>
    <div class="cmp-kpi__value">${value}</div>
    <div class="cmp-kpi__note">${note}</div>
  </div>`;
}

/**
 * The summary KPI row: 전체 세션 then the four metrics of the whole set.
 *
 * @param {any} summary
 * @param {CompareCriteria} criteria
 */
export function summaryTemplate(summary, criteria) {
  const cost = summary.cost_usd;
  return html`<section class="cmp-summary" aria-label="전체 요약">
    ${kpiTemplate(
      'sessions',
      '전체 세션',
      `${summary.n}건`,
      `이슈 ${summary.issue_count} · 진행 중 ${summary.in_flight}`
    )}
    ${kpiTemplate(
      'landing',
      '착지율',
      formatRate(summary.landing_rate),
      `${summary.landed}/${summary.judged}`
    )}
    ${kpiTemplate(
      'problem',
      '문제 세션',
      formatRate(summary.problem_rate),
      html`${summary.problem_count}/${summary.n}${!criteria.is_default
        ? html`<span class="cmp-note">· 기준 조정됨</span>`
        : nothing}`
    )}
    ${kpiTemplate(
      'duration',
      '평균 시간',
      formatDuration(summary.duration_ms?.mean),
      `중앙값 ${formatDuration(summary.duration_ms?.median)}`
    )}
    ${kpiTemplate(
      'cost',
      '평균 비용',
      formatCostMedian(cost?.mean),
      `중앙값 ${formatCostMedian(cost?.median)} · ${costSampleNote(cost)}`
    )}
  </section>`;
}

/**
 * One metric cell of a group row: the value, the server's best marker, the
 * note and — for a rate — its bar.
 *
 * @param {string} metric
 * @param {string} value
 * @param {unknown} note
 * @param {string[]} best
 * @param {number|null} [rate]
 */
function metricCell(metric, value, note, best, rate = null) {
  const is_best = Boolean(BEST_LABELS[metric] && best.includes(metric));
  return html`<td
    class="cmp-metric${is_best ? ' is-best' : ''}"
    data-metric=${metric}
  >
    <div class="cmp-metric__top">
      <span class="cmp-metric__value">${value}</span>
      ${is_best
        ? html`<span class="ui-chip cmp-best">${BEST_LABELS[metric]}</span>`
        : nothing}
    </div>
    <div class="cmp-metric__note">${note}</div>
    ${typeof rate === 'number' && Number.isFinite(rate)
      ? html`<div class="cmp-bar" aria-hidden="true">
          <span
            style=${`width: ${Math.max(0, Math.min(100, rate * 100))}%`}
          ></span>
        </div>`
      : nothing}
  </td>`;
}

/**
 * The composition line of a group: its first composition (+ how many more)
 * and, for an unmatched group, why no preset matched.
 *
 * @param {any} group
 * @param {any[]} rows - The group's session rows.
 * @returns {string}
 */
function groupComposition(group, rows) {
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
  return composition;
}

/**
 * The session problem chips: which criteria this session tripped, each with
 * the evidence as its title.
 *
 * @param {any} row
 * @param {CompareCriteria} criteria
 * @returns {Array<{ label: string, title: string }>}
 */
function sessionChips(row, criteria) {
  const problems = row.problems;
  const evidence = problems?.evidence;
  const review = evidence?.review;
  const review_criteria = criteria.effective.review;
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
  const baseline_partial = criteria.baselines.cost_usd.partial_count;
  const duration_factor = formatFactorChip(
    duration?.value_ms,
    duration?.baseline_ms
  );
  const cost_factor = formatFactorChip(cost?.value_usd, cost?.baseline_usd);
  return [
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
      label: `시간${duration_factor ? ` ${duration_factor}` : ' 초과'}`,
      title: duration
        ? `${formatDuration(duration.value_ms)} · 중앙값 ${formatDuration(duration.baseline_ms)} × ${duration.factor}`
        : ''
    },
    {
      show: problems?.cost,
      label: `비용${cost_factor ? ` ${cost_factor}` : ' 초과'}`,
      title: cost
        ? `${formatPrice({ total_cost_usd: cost.value_usd })} · 중앙값 ${formatCostMedian(cost.baseline_usd)} × ${cost.factor}${cost.partial ? ' · 부분' : ''}${baseline_partial > 0 ? ` · 기준선 부분 집계 ${baseline_partial}건 포함` : ''}`
        : ''
    },
    {
      show: row.preset?.deviated_keys?.length > 0,
      label: '핀 조정',
      title: (row.preset?.deviated_keys || []).join(', ')
    }
  ]
    .filter((chip) => chip.show)
    .map(({ label, title }) => ({ label, title }));
}

/**
 * One session line of an expanded group: a link to the issue (a plain click
 * opens the detail over the compare screen, a modified click keeps the
 * browser's own handling of the deep link).
 *
 * @param {any} row
 * @param {CompareCriteria} criteria
 * @param {((id: string, root_dir?: string) => void)|undefined} gotoIssue
 */
export function sessionRowTemplate(row, criteria, gotoIssue) {
  const chips = sessionChips(row, criteria);
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
        // A row of another repo opens there (the detail connects to it first).
        if (typeof row.root_dir === 'string' && row.root_dir) {
          gotoIssue(row.bead_id, row.root_dir);
        } else {
          gotoIssue(row.bead_id);
        }
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
      ><span class="cmp-issue-id">${row.bead_id}</span>${row.title || ''}</span
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
      : nothing}
    <span class="cmp-session__time"
      >${formatDuration(row.duration_ms)}${row.finished_at
        ? html` · <span>${formatTimestampLocal(row.finished_at)}</span>`
        : nothing}</span
    >
    <span
      class="cmp-session__cost"
      title=${costTooltipLines(row.usage || null).join('\n')}
      >${formatPrice(row.usage)}</span
    >
  </a>`;
}

/**
 * One group row, followed — when the group is expanded — by the row that
 * holds its session lines.
 *
 * @param {any} group
 * @param {{ rows: any[], criteria: CompareCriteria, open: boolean, onToggle: (key: string) => void, gotoIssue?: (id: string, root_dir?: string) => void }} ctx
 */
export function groupRowsTemplate(group, ctx) {
  const ids = new Set(group.attempt_ids || []);
  const rows = ctx.rows.filter((row) => ids.has(row.attempt_id));
  const compositions = group.compositions || [];
  const composition = groupComposition(group, rows);
  const best = group.best || [];
  const cost = group.cost_usd;
  const toggle = () => ctx.onToggle(group.key);
  return html`<tr
      class="cmp-group${ctx.open ? ' is-open' : ''}"
      data-group-key=${group.key}
      @click=${toggle}
    >
      <th scope="row" class="cmp-cell--name">
        <button
          type="button"
          class="cmp-expand"
          aria-expanded=${ctx.open ? 'true' : 'false'}
          title=${`세션 ${group.n}건 ${ctx.open ? '접기' : '보기'}`}
          @click=${(/** @type {Event} */ ev) => {
            ev.stopPropagation();
            toggle();
          }}
        >
          <span class="cmp-caret" aria-hidden="true"
            >${ctx.open ? '▾' : '▸'}</span
          >
          <span class="cmp-group-name">${group.name}</span>
        </button>
        <div class="cmp-group-meta">
          ${group.badge === 'preset' || group.badge === 'unmatched'
            ? html`<span class="ui-chip cmp-badge" data-badge=${group.badge}
                >${group.badge === 'preset' ? '프리셋' : '미대조'}</span
              >`
            : nothing}
          <span class="cmp-card__count"
            >세션 ${group.n} · 이슈 ${group.issue_count}</span
          >
        </div>
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
          : nothing}
      </th>
      ${metricCell(
        'landing',
        formatRate(group.landing_rate),
        `${group.landed}/${group.judged} · 진행 중 ${group.in_flight}`,
        best,
        group.landing_rate
      )}
      ${metricCell(
        'problem',
        formatRate(group.problem_rate),
        `${group.problem_count}/${group.n}`,
        best,
        group.problem_rate
      )}
      ${metricCell(
        'duration',
        formatDuration(group.duration_ms?.mean),
        `중앙값 ${formatDuration(group.duration_ms?.median)}`,
        best
      )}
      ${metricCell(
        'cost',
        formatCostMedian(cost?.mean),
        `중앙값 ${formatCostMedian(cost?.median)} · ${costSampleNote(cost)}${cost?.partial_count > 0 ? ` · 부분 ${cost.partial_count}` : ''}`,
        best
      )}
      <td class="cmp-problems">
        ${PROBLEM_KEYS.filter((key) => ctx.criteria.effective[key]?.on).map(
          (key) =>
            html`<span
              class="ui-chip cmp-chip${group.problems?.[key] ? '' : ' is-zero'}"
              >${PROBLEM_LABELS[key]} ${group.problems?.[key] ?? 0}</span
            >`
        )}
      </td>
    </tr>
    ${ctx.open
      ? html`<tr class="cmp-sessions-row">
          <td colspan=${TABLE_COLUMNS}>
            <div class="cmp-sessions">
              ${rows.length === 0
                ? html`<p class="cmp-empty">세션 기록이 없습니다</p>`
                : rows.map((row) =>
                    sessionRowTemplate(row, ctx.criteria, ctx.gotoIssue)
                  )}
            </div>
          </td>
        </tr>`
      : nothing}`;
}
