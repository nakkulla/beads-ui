/**
 * Work-report marker parser (UI-ucq6 §변경 1).
 *
 * The marker and section grammar are defined in dotfiles
 * `docs/contracts/workflow-state.yaml` `completion_report`; beads-ui only consumes
 * them. Keeping that consumption in one file means a contract change lands
 * here and nowhere else.
 */

/**
 * @typedef {Object} ParsedReport
 * @property {'worker'|'session'} lane - Which execution lane wrote the report.
 * @property {string} identifier - The id that lane pins (attempt id / first 8 of a session id).
 * @property {string} timestamp - Contract timestamp, UTC seconds with a `Z` suffix.
 * @property {string} conclusion - The one-line preview to show while collapsed (empty when the line is absent).
 * @property {string} body - Report text below the conclusion; the anchor, meta and conclusion the header already shows are stripped.
 */

/** The line a comment must open with, matched exactly. */
const ANCHOR = '## 🤖 작업 보고서';

// 레인과 식별자 종류는 계약이 정한 고정 쌍이므로 교차 조합(`worker · sid`)은
// 문법 위반이고, 그 판정을 정규식 자체가 담당한다.
const META_RE =
  /^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/;

/** The conclusion line; the preview drops its prefix and folds whitespace runs. */
const CONCLUSION_RE = /^\*\*결론\*\* — (.+)$/;

/**
 * Recognize a comment body as a work report.
 *
 * Recognition takes the anchor and the meta line TOGETHER
 * (`marker.detection_requires`). Either one off returns `null` and the caller
 * renders a plain comment — there is no partial recognition.
 *
 * @param {string} text
 * @returns {ParsedReport|null}
 */
export function parseReport(text) {
  if (typeof text !== 'string' || text.length === 0) {
    return null;
  }
  // CRLF만 정규화한다. 그 외의 공백은 손대지 않는다 — 계약 정규식은 줄 전체에
  // 앵커돼 있으므로, 여기서 트림하면 규격을 벗어난 줄까지 일치로 만들어 준다.
  const lines = text.split(/\r?\n/);
  if (lines[0] !== ANCHOR) {
    return null;
  }
  const meta = META_RE.exec(lines[1] || '');
  if (!meta) {
    return null;
  }
  const lane = /** @type {'worker'|'session'} */ (meta[1].split(' ')[0]);
  const identifier = meta[2];
  const timestamp = meta[3];

  let i = 2;
  while (i < lines.length && lines[i].trim().length === 0) {
    i += 1;
  }
  const conclusion_match =
    i < lines.length ? CONCLUSION_RE.exec(lines[i]) : null;
  const conclusion = conclusion_match
    ? conclusion_match[1].replace(/\s+/g, ' ').trim()
    : '';
  const body_start = conclusion_match ? i + 1 : i;

  return {
    lane,
    identifier,
    timestamp,
    conclusion,
    body: lines.slice(body_start).join('\n').trim()
  };
}

/**
 * @typedef {Object} ParsedReviewComment
 * @property {'spec'|'impl'|'plan'} step - Review step the round belongs to.
 * @property {number} round - Round number counted within this lineage.
 * @property {'APPROVE'|'REVISE'} verdict - The round's verdict.
 * @property {string} anchor - Value the round binds to, exactly as written.
 * @property {number|null} points - Numbered points raised, `0` for an explicit
 * 「지적 없음」 line, `null` when the body states neither.
 * @property {string} body - Text below the header block, unmodified.
 */

/** First line of a review-result comment; the step and round ride in it. */
const REVIEW_ANCHOR_RE = /^## 🔎 리뷰 결과 · (spec|impl|plan) · r([0-9]+)$/;

const REVIEW_VERDICT_RE = /^VERDICT: (APPROVE|REVISE)$/;
const REVIEW_ANCHOR_LINE_RE = /^anchor: ([0-9a-fA-F]+)$/;

/** A numbered point line, whose text stays byte-for-byte as the reviewer wrote it. */
const REVIEW_POINT_RE = /^[0-9]+\. /;

/** The line a reviewer writes instead of points when there are none. */
const REVIEW_NO_POINTS = '- 지적 없음';

/**
 * Anchor width each step binds to: `spec`/`impl` to a 40hex commit sha, `plan`
 * to the 12hex digest of the draft bytes.
 *
 * @type {Record<string, number>}
 */
const REVIEW_ANCHOR_LENGTH = { spec: 40, impl: 40, plan: 12 };

/**
 * Recognize a comment body as one review round's result.
 *
 * Recognition takes the anchor, the verdict line and the anchor line TOGETHER,
 * exactly as {@link parseReport} takes its anchor and meta line together: any
 * one of them off returns `null` and the caller renders a plain comment. The
 * anchor width is checked against the step, so a `plan` round carrying a commit
 * sha is not recognized.
 *
 * @param {string} text
 * @returns {ParsedReviewComment|null}
 */
export function parseReviewComment(text) {
  if (typeof text !== 'string' || text.length === 0) {
    return null;
  }
  const lines = text.split(/\r?\n/);
  const head = REVIEW_ANCHOR_RE.exec(lines[0] || '');
  if (!head) {
    return null;
  }
  const verdict_match = REVIEW_VERDICT_RE.exec(lines[1] || '');
  const anchor_match = REVIEW_ANCHOR_LINE_RE.exec(lines[2] || '');
  if (!verdict_match || !anchor_match) {
    return null;
  }
  const step = /** @type {'spec'|'impl'|'plan'} */ (head[1]);
  const anchor = anchor_match[1];
  if (anchor.length !== REVIEW_ANCHOR_LENGTH[step]) {
    return null;
  }

  const rest = lines.slice(3);
  let counted = 0;
  let none_declared = false;
  for (const line of rest) {
    if (REVIEW_POINT_RE.test(line)) {
      counted += 1;
    } else if (line.trim() === REVIEW_NO_POINTS) {
      none_declared = true;
    }
  }

  return {
    step,
    round: Number(head[2]),
    verdict: /** @type {'APPROVE'|'REVISE'} */ (verdict_match[1]),
    anchor,
    points: counted > 0 ? counted : none_declared ? 0 : null,
    body: rest.join('\n').trim()
  };
}
