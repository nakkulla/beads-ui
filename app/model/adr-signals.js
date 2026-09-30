/**
 * Pure reading of one `adr-snapshot` workspace for the ADR screen (UI-8uz7
 * §7, UI-dbn6 §3.8): the row order, the search predicate, the per-row signal
 * chips, the count breakdown and the two head badges (색인 · 인용).
 *
 * The signal DEFINITIONS belong to dotfiles; this module copies the checker
 * kind vocabulary as registry constants and consumes it (ADR 0012): a named
 * count counts only its contract kinds, and an unknown kind is never dropped —
 * it is drawn as `기타`. The screen only draws what the installed checkers
 * reported (ADR UI-u6ud-2).
 *
 * @typedef {{ kind: string, file: string, line: number|null, adr: number|string|null, detail: string }} CheckerError
 * @typedef {{ file: string, id: number|string, title: string, status: string, date: string, summary: string, supersedes: (number|string)[], superseded_by: number|string|null, superseded_by_note: string|null, spec: string|null, bead: string|null }} AdrRecord
 * @typedef {{ file: string, line: number, repo: string, adr: number|string, target: { root_dir: string, status: string }|null }} CrossCitation
 * @typedef {{ root_dir: string, name: string, name_duplicate?: boolean, computing?: boolean, computed_at?: number|null, env_errors?: { index: string|null, citations: string|null, candidates: string|null }, adr_dir_missing?: boolean, current?: AdrRecord[], history?: AdrRecord[], frontmatter_errors?: Array<{ file: string, error: string }>, index_drift?: { ok: boolean, detail: string|null }|null, citations_stale?: CheckerError[], candidates?: Array<{ spec: string, ok: boolean, errors: CheckerError[] }>, cross_citations?: CrossCitation[] }} AdrWorkspaceView
 * @typedef {{ tone: 'ok'|'warn'|'env', text: string }} AdrBadge
 */

/** `adr-cite-check.py`의 정본 kind — 이름 붙은 `인용 stale` 카운트가 세는 것. */
export const CITATION_NAMED_KINDS = ['missing', 'retired'];

/** 후보 체커의 `후보 미실체화` 정본 kind. */
export const CANDIDATE_UNRESOLVED_KINDS = [
  'adr_missing',
  'supersede_unapplied'
];

/** 후보 체커의 `토큰 없음` kind. */
export const CANDIDATE_TOKEN_KIND = 'token_missing';

/** 후보 체커의 `이행 전 스펙` kind (관찰 항목이라 접어 둔다). */
export const CANDIDATE_PENDING_KIND = 'section_missing';

/** 스펙 행 국소 환경 오류 kind — 저장소 전체의 `env_errors`가 아니다. */
export const CANDIDATE_ENV_KIND = 'usage';

/** 이름 붙은 카운트에 들어가지 않는 알려진 kind. */
export const CANDIDATE_OTHER_KINDS = ['adr_status', 'title_too_long'];

/** Every candidate kind the dotfiles §7 contract names. */
export const CANDIDATE_KNOWN_KINDS = [
  ...CANDIDATE_UNRESOLVED_KINDS,
  CANDIDATE_TOKEN_KIND,
  CANDIDATE_PENDING_KIND,
  CANDIDATE_ENV_KIND,
  ...CANDIDATE_OTHER_KINDS
];

/** Chip text for kinds drawn under a Korean name instead of the kind token. */
const KIND_LABELS = /** @type {Record<string, string>} */ ({
  title_too_long: '제목 초과'
});

/**
 * ADR 현재표·이력의 행 순서(UI-rsjb D3). legacy 번호 id는 번호 내림차순으로
 * 앞에 서고, 문자열 id는 그 뒤에서 `date` 내림차순·같은 날은 id 문자열
 * 오름차순으로 잇는다. 서버 `server/adr/adr-frontmatter.js compareAdrDesc`와
 * 같은 규칙이며, app 번들은 browser 타깃이라 node 내장 모듈을 끌고 오는 그
 * 모듈을 import할 수 없어 여기서 같은 논리를 둔다.
 *
 * @param {AdrRecord} a
 * @param {AdrRecord} b
 * @returns {number}
 */
export function compareAdrDesc(a, b) {
  const a_numeric = typeof a.id === 'number';
  const b_numeric = typeof b.id === 'number';
  if (a_numeric !== b_numeric) {
    return a_numeric ? -1 : 1;
  }
  if (a_numeric && b_numeric) {
    return Number(b.id) - Number(a.id);
  }
  const a_date = a.date || '';
  const b_date = b.date || '';
  if (a_date !== b_date) {
    return a_date < b_date ? 1 : -1;
  }
  return String(a.id).localeCompare(String(b.id));
}

/**
 * Cited identifier as the `ADR <repo>/<id>` syntax writes it: a legacy number
 * padded to four digits, a string id verbatim.
 *
 * @param {number | string} id
 * @returns {string}
 */
export function formatCitedId(id) {
  return typeof id === 'number' ? String(id).padStart(4, '0') : id;
}

/**
 * Chip text for a checker kind: contract kinds keep their name, anything else
 * is `기타` — an unknown token is drawn, not echoed.
 *
 * @param {string} kind
 * @param {string[]} known
 * @returns {string}
 */
export function kindLabel(kind, known) {
  if (!known.includes(kind)) {
    return '기타';
  }
  return KIND_LABELS[kind] || kind;
}

/**
 * `/api/doc`은 `docs/` 아래 마크다운만 서빙한다 — 그 밖의 인용 대상은 링크 없이
 * 문자만 보인다(§7, §12). Returns false for a missing path.
 *
 * @param {string|null|undefined} path
 * @returns {boolean}
 */
export function isLinkableDoc(path) {
  return typeof path === 'string' && path.startsWith('docs/');
}

/**
 * Search predicate: 번호·제목·summary·spec·bead의 부분 일치다(§7). An empty
 * query keeps every row (true).
 *
 * @param {AdrRecord} adr
 * @param {string} query - lower-cased needle.
 * @returns {boolean}
 */
export function matchesQuery(adr, query) {
  if (!query) {
    return true;
  }
  const hay = [
    String(adr.id),
    adr.title || '',
    adr.summary || '',
    adr.spec || '',
    adr.bead || ''
  ]
    .join('\n')
    .toLowerCase();
  return hay.includes(query);
}

/**
 * Every candidate error of a workspace, flattened.
 *
 * @param {AdrWorkspaceView} ws
 * @returns {CheckerError[]}
 */
function candidateErrors(ws) {
  /** @type {CheckerError[]} */
  const errors = [];
  for (const row of ws.candidates || []) {
    for (const err of row.errors || []) {
      errors.push(err);
    }
  }
  return errors;
}

/**
 * Count material for one workspace: 후보 오류를 kind별로 갈라 이름 붙은
 * 카운트와 `기타`로 나눈다.
 *
 * @param {AdrWorkspaceView} ws
 */
export function countModel(ws) {
  const citations = ws.citations_stale || [];
  const candidate_errors = candidateErrors(ws);
  const named_citation = citations.filter((e) =>
    CITATION_NAMED_KINDS.includes(e.kind)
  );
  const unresolved = candidate_errors.filter((e) =>
    CANDIDATE_UNRESOLVED_KINDS.includes(e.kind)
  );
  const token_missing = candidate_errors.filter(
    (e) => e.kind === CANDIDATE_TOKEN_KIND
  );
  const pending = candidate_errors.filter(
    (e) => e.kind === CANDIDATE_PENDING_KIND
  );
  const other = [
    ...citations.filter((e) => !CITATION_NAMED_KINDS.includes(e.kind)),
    ...candidate_errors.filter(
      (e) =>
        CANDIDATE_OTHER_KINDS.includes(e.kind) ||
        (!CANDIDATE_UNRESOLVED_KINDS.includes(e.kind) &&
          e.kind !== CANDIDATE_TOKEN_KIND &&
          e.kind !== CANDIDATE_PENDING_KIND &&
          e.kind !== CANDIDATE_ENV_KIND)
    )
  ];
  return {
    current: (ws.current || []).length,
    history: (ws.history || []).length,
    drift: Boolean(ws.index_drift && ws.index_drift.ok === false),
    citation_stale: named_citation.length,
    unresolved: unresolved.length,
    token_missing: token_missing.length,
    pending: pending.length,
    other: other.length,
    cross: (ws.cross_citations || []).length
  };
}

/**
 * The count breakdown chips of the 인용 popup, zero counts omitted.
 *
 * @param {AdrWorkspaceView} ws
 * @returns {Array<{ key: string, text: string }>}
 */
export function countChips(ws) {
  const counts = countModel(ws);
  /** @type {Array<{ key: string, text: string }>} */
  const chips = [];
  if (counts.citation_stale > 0) {
    chips.push({ key: 'cite', text: `인용 stale ${counts.citation_stale}` });
  }
  if (counts.unresolved > 0) {
    chips.push({ key: 'cand', text: `후보 미실체화 ${counts.unresolved}` });
  }
  if (counts.token_missing > 0) {
    chips.push({ key: 'token', text: `토큰 없음 ${counts.token_missing}` });
  }
  if (counts.pending > 0) {
    chips.push({ key: 'pending', text: `이행 전 스펙 ${counts.pending}` });
  }
  if (counts.other > 0) {
    chips.push({ key: 'other', text: `기타 ${counts.other}` });
  }
  if (counts.cross > 0) {
    chips.push({ key: 'cross', text: `교차 인용 ${counts.cross}` });
  }
  return chips;
}

/**
 * The 색인 badge: the index checker's environment error, then drift or a
 * frontmatter error, else ✓.
 *
 * @param {AdrWorkspaceView} ws
 * @returns {AdrBadge}
 */
export function indexBadge(ws) {
  if (ws.env_errors?.index) {
    return { tone: 'env', text: '색인 · 환경' };
  }
  if (
    (ws.index_drift && ws.index_drift.ok === false) ||
    (ws.frontmatter_errors || []).length > 0
  ) {
    return { tone: 'warn', text: '색인 ⚠' };
  }
  return { tone: 'ok', text: '색인 ✓' };
}

/**
 * The 인용 badge: a citation or candidate checker environment error, then the
 * count of actionable errors (named citation stale · 후보 미실체화 · 토큰 없음 ·
 * 기타), else ✓. 이행 전 스펙 and cross citations are observations: they are
 * listed in the popup but do not turn the badge.
 *
 * @param {AdrWorkspaceView} ws
 * @returns {AdrBadge}
 */
export function citationBadge(ws) {
  if (ws.env_errors?.citations || ws.env_errors?.candidates) {
    return { tone: 'env', text: '인용 · 환경' };
  }
  const counts = countModel(ws);
  const actionable =
    counts.citation_stale +
    counts.unresolved +
    counts.token_missing +
    counts.other;
  return actionable > 0
    ? { tone: 'warn', text: `인용 ⚠ ${actionable}` }
    : { tone: 'ok', text: '인용 ✓' };
}

/**
 * ADR 한 행에 붙는 신호 칩. 번호로만 결합한다 — 행과 신호 절은 같은 ADR 번호를
 * 공유하는 별개의 재료다(§7.1).
 *
 * @param {AdrWorkspaceView} ws
 * @param {AdrRecord} adr
 * @param {AdrWorkspaceView[]} all
 * @returns {Array<{ key: string, text: string }>}
 */
export function signalChips(ws, adr, all) {
  /** @type {Array<{ key: string, text: string }>} */
  const chips = [];
  const retired = (ws.citations_stale || []).filter(
    (e) => e.kind === 'retired' && e.adr === adr.id
  );
  if (retired.length > 0) {
    chips.push({ key: 'cite', text: `인용 stale ${retired.length}` });
  }
  const candidate_hits = candidateErrors(ws).filter(
    (err) => err.adr === adr.id
  ).length;
  if (candidate_hits > 0) {
    chips.push({ key: 'cand', text: `후보 ${candidate_hits}` });
  }
  const fm = (ws.frontmatter_errors || []).filter((e) => e.file === adr.file);
  if (fm.length > 0) {
    chips.push({ key: 'fm', text: 'frontmatter 오류' });
  }
  let cited_by = 0;
  for (const other of all) {
    if (other.root_dir === ws.root_dir) {
      continue;
    }
    for (const cite of other.cross_citations || []) {
      if (cite.adr === adr.id && cite.target?.root_dir === ws.root_dir) {
        cited_by += 1;
      }
    }
  }
  if (cited_by > 0) {
    chips.push({ key: 'cross', text: `피인용 ${cited_by}` });
  }
  return chips;
}

/**
 * Cross-citation status chip tone: accepted는 성공, 나머지 상태는 경고,
 * `target:null`은 회색 `미확인`(§7.6).
 *
 * @param {{ root_dir: string, status: string }|null} target
 * @returns {{ tone: 'ok'|'warn'|'unknown', text: string }}
 */
export function crossChip(target) {
  if (!target) {
    return { tone: 'unknown', text: '미확인' };
  }
  return {
    tone: target.status === 'accepted' ? 'ok' : 'warn',
    text: target.status
  };
}

/**
 * Split the candidate rows into the specs with something to fix and the
 * specs that only wait for their ADR section (이행 전 스펙).
 *
 * @param {AdrWorkspaceView} ws
 * @returns {{ open: Array<{ spec: string, errors: CheckerError[], env: boolean }>, pending: string[] }}
 */
export function candidateSpecs(ws) {
  /** @type {Array<{ spec: string, errors: CheckerError[], env: boolean }>} */
  const open = [];
  /** @type {string[]} */
  const pending = [];
  for (const row of ws.candidates || []) {
    const errors = row.errors || [];
    if (errors.length === 0) {
      continue;
    }
    const visible = errors.filter(
      (e) => e.kind !== CANDIDATE_PENDING_KIND && e.kind !== CANDIDATE_ENV_KIND
    );
    const has_env = errors.some((e) => e.kind === CANDIDATE_ENV_KIND);
    if (visible.length === 0 && !has_env) {
      pending.push(row.spec);
      continue;
    }
    open.push({ spec: row.spec, errors: visible, env: has_env });
  }
  return { open, pending };
}
