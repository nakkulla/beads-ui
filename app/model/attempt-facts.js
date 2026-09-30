/**
 * Attempt-derived facts of a lane row: elapsed text, the review-session badge
 * and the summed work time — moved from `views/worker/lanes.js` (UI-dbn6
 * Phase 1). Pure: no template.
 */

/**
 * @param {unknown} elapsed_ms
 * @returns {string}
 */
export function formatElapsed(elapsed_ms) {
  if (
    typeof elapsed_ms !== 'number' ||
    !Number.isFinite(elapsed_ms) ||
    elapsed_ms < 0
  ) {
    return '—';
  }
  if (elapsed_ms < 1000) {
    return `${Math.round(elapsed_ms)}ms`;
  }
  const seconds = elapsed_ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(1)}초`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}분 ${Math.round(seconds - minutes * 60)}초`;
  }
  const hours = Math.floor(minutes / 60);
  const remaining_minutes = minutes % 60;
  return `${hours}시간 ${remaining_minutes}분`;
}

/**
 * `review_session` 시도를 한 bead의 완료 행 배지로 요약한다 (UI-d7fy §5.5).
 *
 * 이 시도들은 일반 attempt와 같은 이력 표면에 있다 — 토큰 합계와 작업 시간은
 * `bead_id`만 보므로 이미 함께 세어진다. 배지는 그 합계 안에 무엇이 섞여
 * 있는지를 구분하는 유일한 표시다. 모양이 어긋난 입력은 조용히
 * 무시한다(fail-quiet).
 *
 * @param {unknown} attempts - 큐 스냅샷의 attempt_id → attempt record 맵.
 * @param {string} bead_id
 * @returns {string[]}
 */
export function reviewSessionAttemptBadges(attempts, bead_id) {
  if (typeof attempts !== 'object' || attempts === null) {
    return [];
  }
  let seen = false;
  let auto = false;
  for (const attempt of Object.values(attempts)) {
    if (typeof attempt !== 'object' || attempt === null) {
      continue;
    }
    const a = /** @type {Record<string, unknown>} */ (attempt);
    if (a.bead_id !== bead_id || a.kind !== 'review_session') {
      continue;
    }
    seen = true;
    auto = auto || a.origin === 'auto';
  }
  if (!seen) {
    return [];
  }
  return [auto ? '리뷰 · 자동' : '리뷰'];
}

/**
 * Resume 체인 포함 attempt별 실행 벽시계 시간의 합 — 완료 레인 행의 "작업
 * 시간"으로 쓴다. `attempts`는 큐 스냅샷의 attempt_id → attempt record 맵이며,
 * 모양이 어긋난 입력은 조용히 무시한다(fail-quiet).
 *
 * @param {unknown} attempts
 * @param {string} bead_id
 * @returns {number|null}
 */
export function sumAttemptWorkMs(attempts, bead_id) {
  if (typeof attempts !== 'object' || attempts === null) {
    return null;
  }
  let total_ms = 0;
  let found = false;
  for (const attempt of Object.values(attempts)) {
    if (typeof attempt !== 'object' || attempt === null) {
      continue;
    }
    const a = /** @type {Record<string, unknown>} */ (attempt);
    if (a.bead_id !== bead_id) {
      continue;
    }
    const started_at = a.started_at;
    const finished_at = a.finished_at;
    if (
      typeof started_at !== 'number' ||
      typeof finished_at !== 'number' ||
      !Number.isFinite(started_at) ||
      !Number.isFinite(finished_at) ||
      finished_at < started_at
    ) {
      continue;
    }
    total_ms += finished_at - started_at;
    found = true;
  }
  return found ? total_ms : null;
}

/**
 * `review_session` attempt를 띄운 트리거 — 계약 enum(`auto`·`click`) 밖의 값은
 * 없는 것으로 읽는다(fail-quiet).
 *
 * @param {unknown} origin
 * @returns {'auto'|'click'|null}
 */
function reviewSessionOrigin(origin) {
  return origin === 'auto' || origin === 'click' ? origin : null;
}

/**
 * `[리뷰 후 머지]` 세션의 행 상태 — 한 bead 기준 (UI-d7fy §5.4).
 *
 * PR 대기 행이 두 가지를 물어본다: 지금 리뷰 세션이 도는가(그러면 버튼을 잠근다),
 * 그리고 마지막 세션이 왜 끝났는가(그러면 게이트 뱃지 옆에 사유를 적는다).
 * 진행 중인 세션이 하나라도 있으면 그것이 답이고, 없으면 가장 최근에 끝난 실패가
 * 답이다 — 성공한 세션은 authority 재결속으로 이미 보류를 걷어냈으므로 남길 말이
 * 없다. 모양이 어긋난 입력은 조용히 무시한다(fail-quiet).
 *
 * `origin`은 그 답을 낸 attempt를 누가 띄웠는가다 (UI-qksl §7): 큐가 head당 1회
 * 자동 dispatch하므로, 실행 중·실패 어느 쪽이든 사람이 누른 세션과 기계가 띄운
 * 세션이 같은 자리에 온다.
 *
 * @param {unknown} attempts - 큐 스냅샷의 attempt_id → attempt record 맵.
 * @param {string} bead_id
 * @returns {{ active: boolean, failure: string|null, origin: 'auto'|'click'|null }}
 */
export function reviewSessionRowState(attempts, bead_id) {
  if (typeof attempts !== 'object' || attempts === null) {
    return { active: false, failure: null, origin: null };
  }
  let active = false;
  /** @type {'auto'|'click'|null} */
  let active_origin = null;
  let active_at = -1;
  /** @type {string|null} */
  let failure = null;
  /** @type {'auto'|'click'|null} */
  let failure_origin = null;
  let failure_at = -1;
  for (const attempt of Object.values(attempts)) {
    if (typeof attempt !== 'object' || attempt === null) {
      continue;
    }
    const a = /** @type {Record<string, unknown>} */ (attempt);
    if (a.bead_id !== bead_id || a.kind !== 'review_session') {
      continue;
    }
    if (a.status === 'pending' || a.status === 'running') {
      active = true;
      const started_at = typeof a.started_at === 'number' ? a.started_at : 0;
      if (started_at >= active_at) {
        active_at = started_at;
        active_origin = reviewSessionOrigin(a.origin);
      }
      continue;
    }
    if (a.status !== 'failed') {
      continue;
    }
    const at = typeof a.finished_at === 'number' ? a.finished_at : 0;
    if (at >= failure_at) {
      failure_at = at;
      failure =
        typeof a.cause === 'string' && a.cause.length > 0 ? a.cause : null;
      failure_origin = reviewSessionOrigin(a.origin);
    }
  }
  return active
    ? { active: true, failure: null, origin: active_origin }
    : { active: false, failure, origin: failure_origin };
}
