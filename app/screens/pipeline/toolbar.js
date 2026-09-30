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
import { formatTimestampLocal } from '../../model/relative-time.js';
import { crossRepoTokenTotal } from '../../views/monitor/usage.js';
import { repoOpsStripModel } from '../../views/worker/lanes.js';
import { repoChips, repoStrip } from './repo-strip.js';

/**
 * @import { LaneModel, LaneQueueGroup } from '../../model/lane-model.js'
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
 * The 전체-scope toolbar: the repo strip plus running, PR-wait and done
 * counts and the cross-repo token total.
 *
 * @param {LaneModel} model
 * @param {Array<Record<string, any>>} states
 * @param {(root_dir: string) => any} adoptedOf
 * @returns {TemplateResult}
 */
export function allToolbar(model, states, adoptedOf) {
  const total = crossRepoTokenTotal(model.done);
  const running = model.running.filter((item) => !item.non_occupying).length;
  return html`<div class="pl-toolbar pl-toolbar--all">
    ${repoStrip(repoChips(states, adoptedOf))}
    <div class="pl-toolbar__stats">
      ${stat('실행', running)}${stat('PR 대기', model.pr_wait.length)}${stat(
        '오늘 완료',
        model.done.length
      )}
      ${total === null
        ? ''
        : typeof total === 'string'
          ? html`<span
              class="pl-stat pl-stat--tok"
              title="오늘 완료된 이슈들이 생애 전체에 쓴 토큰 누적"
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
 * The 레포-scope toolbar: automation, auto-merge, slots, serial lanes,
 * search, base branch and the repo-ops timeline and settings.
 *
 * @param {{ group: LaneQueueGroup|null, queue: any, search: string, repo_ops_settings: TemplateResult|'' }} input
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
      <button
        type="button"
        class="ui-btn ${auto_merge ? 'ui-btn--primary' : 'ui-btn--plain'}"
        data-op="auto-merge"
        data-root-dir=${root_dir}
        aria-pressed=${auto_merge ? 'true' : 'false'}
        title=${auto_merge
          ? '자동 머지 켜짐 — 자격이 생기는 PR을 계속 머지합니다'
          : '자동 머지 꺼짐'}
      >
        자동 머지 ${auto_merge ? '켜짐' : '꺼짐'}
      </button>
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
              ? html`<code
                  title=${strip.deploy.at
                    ? formatTimestampLocal(strip.deploy.at)
                    : ''}
                  >배포 ${strip.deploy.sha}</code
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
