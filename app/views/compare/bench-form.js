/**
 * New-experiment form rules (preset-compare §4.2·§4.7·§6).
 *
 * Kept apart from the view so every refusal — an ineligible source, a repeat
 * count outside 1..5, a server error code — is decided in one testable place.
 * The form is fail-CLOSED: an issue the server would refuse to clone must not
 * be selectable here either, and it says why.
 */

/** The repeat range §4.2 pins; the server refuses anything outside it too. */
export const BENCH_REPEAT_MIN = 1;
export const BENCH_REPEAT_MAX = 5;

/** The three reviewer keys a `고정` experiment overwrites on every cell. */
export const BENCH_REVIEWER_KEYS = [
  'impl_review_model',
  'impl_review_effort',
  'impl_review_speed'
];

/**
 * The fixed-reviewer triple used when no earlier experiment supplies one
 * (§4.2). Not a runtime default anywhere else — only this form's seed.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const BENCH_REVIEWER_FALLBACK = Object.freeze({
  impl_review_model: 'fable',
  impl_review_effort: 'xhigh',
  impl_review_speed: 'default'
});

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function usableString(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * Why one issue may or may not be an experiment source (§4.1·§6).
 *
 * The route is read from `metadata.route`, never from the derived `workflow`
 * projection: the server clones from the same metadata, so a derived route
 * would offer a source the server then refuses.
 *
 * @param {unknown} issue
 * @returns {{ eligible: boolean, reason: string }}
 */
export function benchSourceEligibility(issue) {
  const metadata =
    isRecord(issue) && isRecord(issue.metadata) ? issue.metadata : {};
  if (metadata.route !== 'quick_fix') {
    return {
      eligible: false,
      reason: 'route=quick_fix 이슈만 원본이 됩니다'
    };
  }
  if (usableString(metadata.quick_fix_review) === null) {
    return {
      eligible: false,
      reason: 'quick_fix_review 영수증이 없습니다'
    };
  }
  return { eligible: true, reason: '' };
}

/**
 * Candidate sources for the search input: every loaded issue whose id or title
 * matches, each carrying its own eligibility so an ineligible one can be shown
 * WITH its reason rather than silently dropped (§4.7).
 *
 * @param {Array<Record<string, any>>} issues
 * @param {string} query
 * @param {number} [limit]
 * @returns {Array<{ id: string, title: string, eligible: boolean, reason: string }>}
 */
export function benchSourceOptions(issues, query, limit = 20) {
  const q = String(query || '')
    .trim()
    .toLowerCase();
  /** @type {Array<{ id: string, title: string, eligible: boolean, reason: string }>} */
  const out = [];
  /** @type {Set<string>} */
  const seen = new Set();
  for (const issue of Array.isArray(issues) ? issues : []) {
    const id = usableString(isRecord(issue) ? issue.id : null);
    if (id === null || seen.has(id)) {
      continue;
    }
    const title = usableString(issue.title) ?? '';
    if (q.length > 0) {
      if (!id.toLowerCase().includes(q) && !title.toLowerCase().includes(q)) {
        continue;
      }
    }
    seen.add(id);
    const judged = benchSourceEligibility(issue);
    out.push({ id, title, eligible: judged.eligible, reason: judged.reason });
    if (out.length >= limit) {
      break;
    }
  }
  // Eligible sources first; the ineligible ones stay visible so the reason is
  // readable, which is the whole point of listing them (§4.7).
  return out.sort((left, right) =>
    left.eligible === right.eligible ? 0 : left.eligible ? -1 : 1
  );
}

/**
 * @param {unknown} value
 * @returns {number}
 */
export function clampRepeats(value) {
  const parsed =
    typeof value === 'number'
      ? value
      : Number.parseInt(String(value ?? ''), 10);
  if (!Number.isFinite(parsed)) {
    return BENCH_REPEAT_MIN;
  }
  return Math.min(
    BENCH_REPEAT_MAX,
    Math.max(BENCH_REPEAT_MIN, Math.trunc(parsed))
  );
}

/**
 * The fixed-reviewer triple to seed the form with: the previous experiment's
 * reviewer when one exists, else the §4.2 fallback. `runs` is the newest-first
 * list `bench-run-list` returns, so the first run carrying a complete triple is
 * the "직전 실험" the spec names.
 *
 * @param {Array<Record<string, any>>} runs
 * @returns {Record<string, string>}
 */
export function reviewerDefaults(runs) {
  for (const run of Array.isArray(runs) ? runs : []) {
    const reviewer =
      isRecord(run) && isRecord(run.reviewer) ? run.reviewer : null;
    if (reviewer === null) {
      continue;
    }
    /** @type {Record<string, string>} */
    const values = {};
    let complete = true;
    for (const key of BENCH_REVIEWER_KEYS) {
      const value = usableString(reviewer[key]);
      if (value === null) {
        complete = false;
        break;
      }
      values[key] = value;
    }
    if (complete) {
      return values;
    }
  }
  return { ...BENCH_REVIEWER_FALLBACK };
}

/**
 * Whether the form can be submitted at all. Mirrors the server's own
 * `bad_request` conditions so the refusal is visible before a round trip.
 *
 * @param {{ source_id: string, source_eligible: boolean, preset_ids: string[], repeats: number, reviewer_mode: string, reviewer: Record<string, string> }} form
 * @returns {boolean}
 */
export function benchFormReady(form) {
  if (usableString(form.source_id) === null || form.source_eligible !== true) {
    return false;
  }
  if (!Array.isArray(form.preset_ids) || form.preset_ids.length === 0) {
    return false;
  }
  if (clampRepeats(form.repeats) !== form.repeats) {
    return false;
  }
  if (form.reviewer_mode === 'fixed') {
    return BENCH_REVIEWER_KEYS.every(
      (key) => usableString(form.reviewer?.[key]) !== null
    );
  }
  return true;
}

/**
 * The sentence one server error code becomes (§6). An unknown code keeps its
 * own text rather than being flattened into a generic failure — a code this
 * client has not learned yet is still information.
 *
 * @type {Readonly<Record<string, string>>}
 */
const BENCH_ERROR_TEXT = Object.freeze({
  bad_request: '입력이 서버 조건을 만족하지 않습니다',
  bd_error: '원본 이슈를 읽지 못했습니다',
  bench_base_unreadable: 'base tip을 읽지 못해 실험을 시작하지 않았습니다',
  bench_tuple_unresolved: '프리셋을 완전한 실행 tuple로 해석하지 못했습니다',
  worker_unavailable: 'Worker 런타임이 붙어 있지 않습니다',
  bench_run_create_failed: '클론 생성에 실패해 실험을 만들지 않았습니다',
  bench_run_list_failed: '실험 목록을 읽지 못했습니다'
});

/**
 * Turn one error envelope into the line the form shows. The aborted clone ids
 * of `bench_run_create_failed` ride along, because they name beads that now
 * exist as closed clones and nothing else would tell the reader that.
 *
 * @param {unknown} error
 * @returns {string}
 */
export function benchErrorMessage(error) {
  if (typeof error === 'string') {
    return BENCH_ERROR_TEXT[error] ?? error;
  }
  if (!isRecord(error)) {
    return '실험 생성에 실패했습니다';
  }
  const code = usableString(error.code) ?? usableString(error.error) ?? '';
  const message = usableString(error.message) ?? '';
  const head = BENCH_ERROR_TEXT[code] ?? (message.length > 0 ? message : code);
  /** @type {string[]} */
  const parts = [head.length > 0 ? head : '실험 생성에 실패했습니다'];
  if (code.length > 0 && message.length > 0 && BENCH_ERROR_TEXT[code]) {
    parts.push(`(${message})`);
  }
  const details = isRecord(error.details) ? error.details : {};
  const aborted = Array.isArray(details.aborted)
    ? details.aborted.filter(
        (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
      )
    : [];
  if (aborted.length > 0) {
    parts.push(`— 닫힌 클론: ${aborted.join(', ')}`);
  }
  return parts.join(' ');
}
