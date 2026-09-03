/**
 * The ONE shape a Worker failure hand-off comment has
 * (record-timeline-retention §9).
 *
 * Three moments now write a `bd comment` about something that did not land — a
 * completion failure, a session failure, and a park — and they are read by the
 * same person in the same place. §9 says they carry the `summary` line plus the
 * log path "지금의 완료 실패 댓글과 같은 형식으로": so the field names, the
 * absent-value convention and the log-is-pointed-at-never-inlined rule live
 * here, and each producer contributes only the rows that are its own.
 *
 * Kept deliberately small. A single template with a slot for every field any
 * caller might want would make the completion comment's 단계/대상/재시도 rows
 * everyone's problem; what actually has to agree is the two rows §9 names.
 */

/**
 * What a row shows when the fact exists but its value does not. One spelling,
 * because a reader who sees `(없음)` in one comment and an empty field in
 * another has to work out whether they mean the same thing.
 *
 * @type {string}
 */
export const NONE_VALUE = '(없음)';

/**
 * The `- 요약:` row, or NO row at all.
 *
 * Returned as a spreadable array rather than a nullable string because the
 * absence is the point: a failure that produced no line must not be shown an
 * empty field, and `...summaryRow(x)` is the only way a caller can get that
 * wrong-shaped state past the type checker.
 *
 * @param {unknown} summary
 * @returns {string[]}
 */
export function summaryRow(summary) {
  return typeof summary === 'string' && summary.trim().length > 0
    ? [`- 요약: ${summary.trim()}`]
    : [];
}

/**
 * The `- 로그:` row. Always present, unlike the summary: "이 실패에 로그가
 * 없다"는 것 자체가 읽는 사람이 알아야 하는 사실이다 — 로그를 찾아 헤매는 대신
 * 없다는 것을 읽고 다음으로 넘어간다.
 *
 * The path is POINTED at, never inlined: a session log is large and can carry
 * secrets, and the path is what a human opens anyway.
 *
 * @param {unknown} log_path
 * @returns {string}
 */
export function logRow(log_path) {
  return `- 로그: ${
    typeof log_path === 'string' && log_path.length > 0 ? log_path : NONE_VALUE
  }`;
}

/**
 * The comment's first line. `## 🤖` marks it as machine-written in a log a
 * person also writes into.
 *
 * @param {string} title
 * @returns {string}
 */
export function commentHeading(title) {
  return `## 🤖 ${title}`;
}

/**
 * The hand-off comment for a session that FAILED or PARKED (§9).
 *
 * The `summary` is the classifier's own — the identical string
 * `cause_detail.summary`, the timeline event and the failure tile carry (§6:
 * one extraction, one string). Deriving a second sentence here is how the
 * comment and the card would start disagreeing about the same failure.
 *
 * @param {{ parked?: boolean, cause?: string|null, summary?: string|null, log_path?: string|null, attempt_id?: string|null }} input
 * @returns {string}
 */
export function attemptFailureComment(input) {
  const parked = input?.parked === true;
  return [
    commentHeading(parked ? '세션 파킹 기록' : '세션 실패 기록'),
    `- 원인: ${
      typeof input?.cause === 'string' && input.cause.length > 0
        ? input.cause
        : NONE_VALUE
    }`,
    ...summaryRow(input?.summary),
    logRow(input?.log_path),
    `- 다음: ${
      parked
        ? '파킹 타일의 [세션에서 해결] · [폐기]'
        : '실패 타일의 [이어하기] · [폐기]'
    }`
  ].join('\n');
}
