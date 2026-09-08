/**
 * 이월 후속 색인 (`carried_to`) 의 순수 계산 (UI-btj6 §3, UI-ys18 §3.2).
 *
 * Worker 탭의 구독 열과 서버의 원본 이슈 스캔이 같은 규칙을 쓰도록 어댑터에서
 * 여기로 뽑아냈다. 순수 모듈이므로 브라우저 렌더러도, 구독 store도, node 전용
 * API도 import하지 않는다 — 서버 캐시가 이 파일을 직접 읽는다.
 */
import { blockerIdsOf } from '../views/worker/blocker-ids.js';

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function objectOf(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? /** @type {Record<string, any>} */ (value)
    : {};
}

/**
 * `carried_to` 색인: 이월을 남긴 bead → 그 bead에서 이월된 후속 ID들.
 *
 * 재료는 sweep의 이월 변환이 남긴 흔적 둘뿐이다 — 후속의 metadata
 * `carried_from`과 그 후속이 부모에 건 `blocks` 의존. 원본 간선 정규화는 후보
 * 행과 같은 사다리({@link blockerIdsOf})를 재사용하되 `dependencies`만
 * 넘긴다: 전체 issue를 주면 서버가 얹은 `blocked_info`가 우선해 이미 닫힌
 * 부모와의 관계를 삼킨다.
 *
 * 입력 집합에 없는 후속(닫힘·유예)은 재료가 되지 않고, 부모는 키를 얻지 못한다
 * (fail-quiet).
 *
 * @param {any[]} issues
 * @returns {Map<string, string[]>}
 */
export function buildCarryoverIndex(issues) {
  /** @type {Map<string, Set<string>>} */
  const by_parent = new Map();
  for (const issue of Array.isArray(issues) ? issues : []) {
    if (!issue || typeof issue.id !== 'string' || issue.id.length === 0) {
      continue;
    }
    const carried_from = objectOf(issue.metadata).carried_from;
    if (typeof carried_from !== 'string' || carried_from.length === 0) {
      continue;
    }
    for (const parent_id of blockerIdsOf({
      dependencies: issue.dependencies
    })) {
      let successors = by_parent.get(parent_id);
      if (!successors) {
        successors = new Set();
        by_parent.set(parent_id, successors);
      }
      successors.add(issue.id);
    }
  }
  /** @type {Map<string, string[]>} */
  const index = new Map();
  for (const [parent_id, successors] of by_parent) {
    index.set(parent_id, [...successors].sort());
  }
  return index;
}
