/**
 * The toolbar above the lanes (UI-dbn6 §3.3).
 *
 * | 범위 | 왼쪽 | 오른쪽 |
 * | 전체 | 레포 띠 | 실행·PR 대기·오늘 완료 수, 누적 사용량 |
 * | 레포 | 자동화 ▶/⏸ · 자동 머지 · 동시 실행 · 직렬 레인 수 · 검색 | 저장소 작업 줄 |
 *
 * The 저장소 작업 줄 is the current strip (deploy SHA · outstanding count →
 * timeline drawer) plus the existing verify/deploy declaration section, which
 * is bridged as-is (배포 실행 · 스크립트 보기 · `이 workspace에서 실행`).
 */
import { html } from 'lit-html';
import { formatElapsed } from '../../model/attempt-facts.js';
import { formatTimestampLocal } from '../../model/relative-time.js';
import { deployClock, repoOpsStripModel } from '../../model/repo-ops-strip.js';
import {
  crossRepoTokenTotal,
  tokenTotalTooltip
} from '../../model/usage-total.js';
import { blockedChip } from './blocked.js';
import { repoChips, repoStrip } from './repo-strip.js';

/**
 * @import { LaneModel, LaneQueueGroup } from '../../model/lane-model.js'
 * @import { BlockedSummary } from './blocked.js'
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @param {string} label
 * @param {number} value
 * @param {string} [title]
 * @returns {TemplateResult}
 */
function stat(label, value, title = '') {
  return html`<span class="pl-stat" title=${title}
    >${label} <b>${value}</b></span
  >`;
}

/**
 * The 전체 toolbar's `세션 N` (the retired deck total): beads a non-Worker
 * session holds in progress, summed over the visible repos; drawn above 0.
 *
 * @param {Array<Record<string, any>>} states
 * @returns {TemplateResult|''}
 */
function sessionStat(states) {
  const total = states.reduce((sum, row) => {
    const value = row && row.counts ? row.counts.session_active : 0;
    return sum + (typeof value === 'number' && value > 0 ? value : 0);
  }, 0);
  return total > 0
    ? html`<span
        class="pl-stat pl-stat--session"
        title="Worker가 아닌 세션이 in_progress로 잡은 이슈 수"
        >세션 <b>${total}</b></span
      >`
    : '';
}

/**
 * The 전체-scope toolbar: the repo strip plus running, PR-wait and done
 * counts, the 막힘 summary, `세션 N` and the cross-repo token total.
 *
 * @param {LaneModel} model
 * @param {Array<Record<string, any>>} states
 * @param {(root_dir: string) => any} adoptedOf
 * @param {{ blocked?: BlockedSummary|null }} [extra]
 * @returns {TemplateResult}
 */
export function allToolbar(model, states, adoptedOf, extra = {}) {
  const total = crossRepoTokenTotal(model.done);
  const running = model.running.filter((item) => !item.non_occupying).length;
  return html`<div class="pl-toolbar pl-toolbar--all">
    ${repoStrip(repoChips(states, adoptedOf))}
    <div class="pl-toolbar__stats">
      ${stat('실행', running)}${stat('PR 대기', model.pr_wait.length)}${stat(
        '오늘 완료',
        model.done.length
      )}${blockedChip(extra.blocked || null)}${sessionStat(states)}
      ${total === null
        ? ''
        : typeof total === 'string'
          ? html`<span
              class="pl-stat pl-stat--tok"
              title=${tokenTotalTooltip('오늘')}
              >누적 ${total}</span
            >`
          : total.map(
              (badge) =>
                html`<span class="pl-stat pl-stat--tok" title=${badge.tooltip}
                  >${badge.label}</span
                >`
            )}
    </div>
  </div>`;
}

/**
 * The 레포 auto-merge control (UI-5v7d §4, UI-yk55 §5.1): ONE button, four
 * states, never a start and a stop side by side. An empty queue reads
 * `▶ 자동 머지 N` (N = rows eligible now) while off and `⏸ 자동 머지` while on;
 * a running queue reads `⏸ 자동 머지 중단 N` while on and `일괄 머지 중단 N`
 * (manually queued entries) while off.
 *
 * @param {string} root_dir
 * @param {boolean} auto
 * @param {LaneQueueGroup|null} group
 * @param {any[]} pr_rows - This repo's PR 대기 rows.
 * @returns {TemplateResult}
 */
function autoMergeButton(root_dir, auto, group, pr_rows) {
  const merge = group ? group.merge : null;
  if (merge && merge.running) {
    return html`<button
      type="button"
      class="ui-btn ${auto ? 'ui-btn--primary' : 'ui-btn--plain'} pl-automerge"
      data-op=${auto ? 'auto-merge' : 'merge-stop-all'}
      data-root-dir=${root_dir}
      aria-pressed=${auto ? 'true' : 'false'}
      title=${auto
        ? '자동 머지를 끄고 대기 중인 항목을 모두 뺍니다 (진행 중인 항목은 끝까지 수행)'
        : '대기 중인 항목을 모두 뺍니다 (진행 중인 항목은 끝까지 수행)'}
    >
      ${auto ? '⏸ 자동 머지 중단' : '일괄 머지 중단'} ${merge.positions.size}
    </button>`;
  }
  if (auto) {
    return html`<button
      type="button"
      class="ui-btn ui-btn--primary pl-automerge"
      data-op="auto-merge"
      data-root-dir=${root_dir}
      aria-pressed="true"
      title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
    >
      ⏸ 자동 머지
    </button>`;
  }
  const excluded = new Set(merge ? merge.auto_excluded : []);
  const count = pr_rows.filter(
    (row) => row.merge_action && row.merge_enabled && !excluded.has(row.id)
  ).length;
  return html`<button
    type="button"
    class="ui-btn ui-btn--plain pl-automerge"
    data-op="auto-merge"
    data-root-dir=${root_dir}
    aria-pressed="false"
    title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
  >
    ▶ 자동 머지${count > 0 ? ` ${count}` : ''}
  </button>`;
}

/**
 * The 레포 KPIs (UI-58y2 §툴바): `cap 초과`, the 막힘 summary, the 완료
 * token total for the chosen period and `다음 <first parallel row>`.
 *
 * @param {LaneQueueGroup|null} group
 * @param {{ blocked?: BlockedSummary|null, range_label?: string }} input
 * @returns {TemplateResult}
 */
function repoKpis(group, input) {
  const range = input.range_label || '오늘';
  const total = group ? group.token_total : null;
  const badges = Array.isArray(total)
    ? total
    : total
      ? [{ label: total, tooltip: tokenTotalTooltip(range) }]
      : [];
  const next = group ? group.sublanes.parallel[0] : null;
  return html`${group && group.over_cap
      ? html`<span
          class="pl-stat pl-stat--overcap pl-badge--alert"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`
      : ''}${blockedChip(input.blocked || null)}${badges.map(
      (badge) =>
        html`<span class="pl-stat pl-stat--tok" title=${badge.tooltip}
          >${range} 완료 · 누적 ${badge.label}</span
        >`
    )}<span class="pl-stat pl-stat--next"
      >다음 <b>${next ? next.id : '—'}</b></span
    >`;
}

/**
 * The 레포-scope toolbar: automation, auto-merge, slots, serial lanes,
 * search, the KPIs, base branch and the repo-ops timeline and settings.
 *
 * @param {{ group: LaneQueueGroup|null, queue: any, search: string, repo_ops_settings: TemplateResult|'', blocked?: BlockedSummary|null, range_label?: string, pr_rows?: any[] }} input
 * @returns {TemplateResult}
 */
export function repoToolbar(input) {
  const group = input.group;
  const queue = input.queue || {};
  const root_dir = group ? group.root_dir : '';
  const auto = group
    ? group.auto_advance === true
    : queue.auto_advance === true;
  const auto_merge = group
    ? group.auto_merge === true
    : queue.auto_merge === true;
  const slots = group
    ? group.slots
    : typeof queue.slots === 'number'
      ? queue.slots
      : 1;
  const serial = group
    ? group.serial_lane_count
    : typeof queue.serial_lane_count === 'number'
      ? queue.serial_lane_count
      : 1;
  const strip = group
    ? repoOpsStripModel(group.repo_operations, group.cleanup_failures)
    : null;
  return html`<div class="pl-toolbar pl-toolbar--repo">
    <div class="pl-toolbar__ops">
      <button
        type="button"
        class="ui-btn ${auto ? 'ui-btn--primary' : 'ui-btn--plain'}"
        data-op="repo-automation"
        data-root-dir=${root_dir}
        aria-pressed=${auto ? 'true' : 'false'}
        title=${auto
          ? '자동화 켜짐 — 누르면 멈춥니다'
          : '자동화 꺼짐 — 누르면 슬롯이 비는 대로 다음 행이 출발합니다'}
      >
        ${auto ? '⏸ 자동화 멈춤' : '▶ 자동화'}
      </button>
      ${autoMergeButton(root_dir, auto_merge, group, input.pr_rows || [])}
      <label
        class="pl-field"
        title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      >
        동시 실행
        <input
          type="number"
          class="ui-input ui-input--num"
          data-op="slots"
          data-root-dir=${root_dir}
          min="1"
          step="1"
          .value=${String(slots)}
        />
      </label>
      <label
        class="pl-field"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
      >
        직렬 레인
        <select
          class="ui-select"
          data-op="serial-lanes"
          data-root-dir=${root_dir}
          aria-label="직렬 레인 수"
        >
          ${[1, 2, 3, 4, 5].map(
            (n) =>
              html`<option value=${String(n)} ?selected=${serial === n}>
                ${n}
              </option>`
          )}
        </select>
      </label>
      <input
        type="search"
        class="ui-input pl-search"
        data-op="search"
        placeholder="ID·제목 검색"
        aria-label="이슈 검색 (ID·제목)"
        .value=${input.search}
      />
    </div>
    <div class="pl-toolbar__stats">${repoKpis(group, input)}</div>
    <div class="pl-toolbar__repo-ops">
      ${group && group.declared_base !== undefined
        ? html`<span
            class="pl-stat"
            title=${group.declared_base
              ? '이 워크스페이스가 선언한 target base'
              : '선언 파일을 읽지 못했습니다 — target base 확인 불가'}
            >base <b>${group.declared_base || '?'}</b></span
          >`
        : ''}
      ${strip
        ? html`<button
            type="button"
            class="ui-btn ui-btn--ghost pl-opsline"
            data-op="repo-ops-timeline"
            aria-label="저장소 작업 타임라인 열기"
          >
            저장소 작업
            ${strip.deploy
              ? html`<code>배포 ${strip.deploy.sha}</code>
                  <span class="pl-opsline__ok">✓ 최신</span>
                  <span
                    class="pl-opsline__ago"
                    title=${strip.deploy.at
                      ? formatTimestampLocal(strip.deploy.at)
                      : ''}
                    >${deployClock(strip.deploy.at)}${strip.deploy
                      .elapsed_ms !== null
                      ? ` · ${formatElapsed(strip.deploy.elapsed_ms)}`
                      : ''}</span
                  >`
              : ''}
            <span
              class="pl-badge${strip.badge.tone === 'act'
                ? ' pl-badge--alert'
                : ''}"
              >${strip.badge.label}</span
            >
          </button>`
        : ''}
      ${input.repo_ops_settings}
    </div>
  </div>`;
}
