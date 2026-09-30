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
