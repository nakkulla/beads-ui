/**
 * The shared "현재 진행중 child" selection contract (UI-53es §2).
 *
 * Board 카드 롤업·모니터 행·Worker 실행 타일이 같은 자식 집합에서 서로 다른
 * child를 고르면 "지금 무엇이 돌고 있는가"에 세 화면이 다르게 답한다. 선택은
 * 한 곳에서만 정의한다: in_progress child 중 `updated_at` 내림차순 최상위,
 * 동률이면 id 오름차순(결정적).
 */
import { coerceTimestampMs } from './relative-time.js';

/**
 * @typedef {{ id: string, title?: string, status?: string, updated_at?: number|string }} ChildLike
 */

/**
 * Pick the current in_progress child of a parent, or null when there is none.
 *
 * @param {ChildLike[]} children
 * @returns {ChildLike | null}
 */
export function selectCurrentChild(children) {
  if (!Array.isArray(children)) {
    return null;
  }
  /** @type {ChildLike | null} */
  let best = null;
  let best_at = -1;
  for (const child of children) {
    if (!child || child.status !== 'in_progress') {
      continue;
    }
    // 값이 없거나 파싱 불가한 시각은 "가장 오래됨"으로 접는다 — 없는 시각이
    // 최신인 척하면 tie-break가 id 순서에 흔들린다.
    const at = coerceTimestampMs(child.updated_at) ?? 0;
    if (best === null || at > best_at) {
      best = child;
      best_at = at;
      continue;
    }
    if (at === best_at && String(child.id) < String(best.id)) {
      best = child;
    }
  }
  return best;
}
