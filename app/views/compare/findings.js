import {
  PROBLEM_KEYS,
  PROBLEM_LABELS
} from '../../utils/compare-problem-criteria.js';
import { formatCostMedian, formatDuration, formatRate } from './format.js';

/**
 * @param {any} model
 * @param {string} group_by
 */
export function comparisonFindings(model, group_by) {
  const summary = model.summary;
  if (!summary) {
    return [];
  }
  const units = model.groups.flatMap((/** @type {any} */ group) =>
    group_by === 'setting' && group.children?.length ? group.children : [group]
  );
  const eligible = units
    .filter((/** @type {any} */ unit) => unit.eligible)
    .sort((/** @type {any} */ a, /** @type {any} */ b) => b.n - a.n);
  /** @type {string[]} */
  const lines = [];
  if (eligible.length >= 2) {
    const [a, b] = eligible;
    const cost_a = a.cost_usd?.mean;
    const cost_b = b.cost_usd?.mean;
    const time_a = a.duration_ms?.mean;
    const time_b = b.duration_ms?.mean;
    const differences = [];
    if (cost_a != null && cost_b != null) {
      differences.push(
        `평균 비용이 ${formatCostMedian(Math.abs(cost_a - cost_b))}${cost_b > 0 ? `(${Math.round((Math.abs(cost_a - cost_b) / cost_b) * 100)}%)` : ''} ${cost_a <= cost_b ? '낮습니다' : '높습니다'}`
      );
    }
    if (time_a != null && time_b != null) {
      differences.push(
        `평균 시간이 ${formatDuration(Math.abs(time_a - time_b))} ${time_a <= time_b ? '짧습니다' : '깁니다'}`
      );
    }
    lines.push(
      `${a.name} 쪽은 ${b.name} 쪽보다 ${differences.length ? `${differences.join('. ')}.` : `세션 수가 ${a.n}건 대 ${b.n}건입니다.`} 문제 세션 비율은 ${formatRate(a.problem_rate)}와 ${formatRate(b.problem_rate)}입니다.`
    );
    const overlap = Math.max(
      0,
      Math.min(a.last_finished_at, b.last_finished_at) -
        Math.max(a.first_finished_at, b.first_finished_at)
    );
    const shorter = Math.min(
      a.last_finished_at - a.first_finished_at,
      b.last_finished_at - b.first_finished_at
    );
    if (shorter > 0 && overlap < shorter / 2) {
      /** @param {number} at */
      const date = (at) => new Date(at).toISOString().slice(5, 10);
      lines.push(
        `두 줄은 쓰인 기간이 거의 겹치지 않아(${date(a.first_finished_at)}~${date(a.last_finished_at)} 대 ${date(b.first_finished_at)}~${date(b.last_finished_at)}) 시기와 작업 차이가 섞여 있습니다.`
      );
    }
  } else if (eligible.length === 1) {
    const unit =
      group_by === 'orchestration'
        ? '오케스트레이터'
        : group_by === 'impl_actor'
          ? '구현 리프'
          : group_by === 'reviewer'
            ? '리뷰어'
            : '설정';
    lines.push(
      `견줄 수 있는 ${unit}이 하나뿐입니다 — ${group_by === 'setting' ? '구현 리프 보기에서 실제 리프끼리 견줘 보세요.' : '기간을 넓혀 보세요.'}`
    );
  }
  for (const key of PROBLEM_KEYS) {
    const count = summary.problems?.[key] || 0;
    if (summary.problem_count > 0 && count >= summary.problem_count / 2) {
      lines.push(
        `문제 세션 ${summary.problem_count}건 중 ${count}건이 ${PROBLEM_LABELS[key]}입니다.`
      );
    }
  }
  const unknown = model.groups
    .filter((/** @type {any} */ group) => group.name.includes('리프 설정 모름'))
    .reduce(
      (/** @type {number} */ sum, /** @type {any} */ group) => sum + group.n,
      0
    );
  if (unknown > 0) {
    lines.push(`리프 설정을 모르는 세션 ${unknown}건은 순위에서 뺐습니다.`);
  }
  if (summary.unobserved_count > 0) {
    lines.push(
      `실행 기록이 없는 세션 ${summary.unobserved_count}건은 어떤 모델로 돌았는지 알 수 없어 순위에서 뺐습니다.`
    );
  }
  if (summary.inferred_count > 0) {
    lines.push(
      `리프·리뷰어 설정 ${summary.inferred_count}건은 실행 당시 기록이 없어 프리셋의 지금 설정으로 추정했습니다.`
    );
  }
  if (
    summary.duration_ms?.median != null &&
    summary.duration_ms?.mean > summary.duration_ms.median * 2
  ) {
    lines.push(
      '평균 시간이 중앙값의 2배를 넘어 몇몇 긴 세션이 평균을 끌어올리고 있습니다.'
    );
  }
  if (group_by === 'impl_actor') {
    lines.push(
      '자동 선택은 작업에 맞춰 리프를 고르므로 리프 간 차이에 작업 크기 차이가 섞여 있습니다.'
    );
  } else if (group_by === 'setting' || group_by === 'reviewer') {
    lines.push('설정마다 맡은 작업이 달라 차이에 작업 차이가 섞여 있습니다.');
  }
  if (group_by === 'reviewer') {
    lines.push(
      '리뷰어가 착지 뒤 품질에 주는 효과는 재지 않고 라운드·지적·비용·시간만 견줍니다.'
    );
  }
  return lines;
}
