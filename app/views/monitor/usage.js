/**
 * Cross-repo token/cost total for the monitor's top bar (UI-qrfo §7).
 *
 * This REPLICATES the Worker tab's `token_total` formula
 * (`app/views/worker/index.js`, the 완료 lane KPI) verbatim and only widens the
 * population from one repo's period-filtered 완료 rows to every visible repo's.
 * A different formula would make the two tabs report different numbers for the
 * same repo, which is exactly the confusion the replication avoids.
 */
import {
  SUM_FIELDS,
  formatUsageTotalWithCost,
  mergeUsageProjections,
  providerUsageBadges
} from '../../utils/token-usage.js';

/**
 * @import { LaneItem } from '../worker/lane-model.js'
 */

/**
 * The cross-repo token/cost KPI's tooltip — same sentence the Worker tab's own
 * chip carries, with the period label interpolated the same way. A reader who
 * has read one tab's tooltip must not have to re-learn the other's.
 *
 * @param {string} range_label - `CLOSED_RANGE_OPTIONS`의 현재 선택 라벨(예: '오늘').
 * @returns {string}
 */
export function tokenTotalTooltip(range_label) {
  return `${range_label} 완료된 이슈들이 생애 전체에 쓴 토큰 누적 (입력+출력+캐시). 이 기간에 소모된 양이 아니다`;
}

/**
 * Sum every completed item's usage across ALL repos into one label.
 *
 * 보고된 0과 아예 보고되지 않은 usage는 다른 사실이다 — 아무도 보고하지 않았으면
 * 합계를 그리지 않는다(`token_reported`가 false로 남는다). 비용은 합산 대상
 * 전부가 보고했을 때만 붙인다 — 일부만 보고한 합계에 `$`를 붙이면 토큰과 돈이
 * 서로 다른 모집단을 말하게 되고, 읽는 쪽에는 그 차이가 보이지 않는다.
 *
 * @param {Array<Pick<LaneItem, 'usage'>>} done_items - period-filtered 완료
 * 아이템 (`buildLanes()`가 이미 각 항목에 `sumAttemptUsage()` 결과를 실어 둔다).
 * @returns {string|Array<{ provider: 'claude'|'codex', label: string, tooltip: string }>|null}
 */
export function crossRepoTokenTotal(done_items) {
  /** @type {import('../../utils/token-usage.js').UsageProjection[]} */
  const projections =
    /** @type {import('../../utils/token-usage.js').UsageProjection[]} */ (
      (Array.isArray(done_items) ? done_items : [])
        .map((item) => item && item.usage)
        .filter(
          (usage) => usage && typeof usage === 'object' && 'providers' in usage
        )
    );
  if (projections.length > 0) {
    return providerUsageBadges(mergeUsageProjections(projections));
  }
  /** @type {Record<string, number>} */
  const token_sum = {};
  for (const field of SUM_FIELDS) {
    token_sum[field] = 0;
  }
  let token_reported = false;
  let cost_sum = 0;
  let summed_rows = 0;
  let cost_rows = 0;
  for (const item of Array.isArray(done_items) ? done_items : []) {
    const u = item && item.usage;
    if (u && typeof u === 'object') {
      let row_reported = false;
      for (const field of SUM_FIELDS) {
        const value = u[field];
        // `typeof value === 'number'`이 먼저다 — `Number.isFinite`는 TS 타입
        // 가드가 아니라 `value`를 좁혀 주지 못한다.
        if (typeof value === 'number' && Number.isFinite(value)) {
          token_sum[field] += value;
          token_reported = true;
          row_reported = true;
        }
      }
      if (row_reported) {
        summed_rows += 1;
        const cost = u.total_cost_usd;
        if (typeof cost === 'number' && Number.isFinite(cost)) {
          cost_sum += cost;
          cost_rows += 1;
        }
      }
    }
  }
  if (summed_rows > 0 && cost_rows === summed_rows) {
    token_sum.total_cost_usd = cost_sum;
  }
  return token_reported ? formatUsageTotalWithCost(token_sum) : null;
}
