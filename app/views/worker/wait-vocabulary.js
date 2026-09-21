/**
 * The single wait vocabulary table (UI-8gem §5). Badges, gate chips, summary
 * chips, tooltips and the help legend all read these rows — the judgment is the
 * server's (`server/worker/wait-judgment.js`), the wording is here.
 *
 * `⚠` is U+26A0 with no VS16, so the badge keeps text metrics (§5.1).
 */

/**
 * @typedef {'normal'|'overdue'|'action_required'} WaitVerdict
 * @typedef {Object} WaitVerdictRow
 * @property {WaitVerdict} verdict
 * @property {string} glyph - `''` means the kind glyph stays as it is.
 * @property {string} meaning
 * @property {string} shape
 * @typedef {'bead'|'queue'} WaitScope
 * @typedef {Object} WaitKindRow
 * @property {string} id - Legend anchor and test key (§5.2).
 * @property {string} kind
 * @property {string} [condition]
 * @property {WaitScope} scope
 * @property {string} glyph
 * @property {string} label
 * @property {string} when
 * @property {string} release
 * @property {string} action
 * @property {string} elapsed_word - 시각 줄 경과 조각의 낱말 (`5시간째 <낱말>`).
 * 비면 경과 조각을 그리지 않는다 (§5.1).
 * @property {string} next_word - 시각 줄 `next_check_at` 조각의 낱말
 * (`<낱말> 11:55`). 비면 다음 조각을 그리지 않는다.
 * @typedef {Object} WaitKindContext
 * @property {'usage_limit'|'outage'} [hold_kind]
 */

/** @type {ReadonlyArray<WaitVerdictRow>} */
export const WAIT_VERDICTS = Object.freeze([
  Object.freeze({
    verdict: /** @type {WaitVerdict} */ ('normal'),
    glyph: '',
    meaning: '지연·조치 판정이 없다 — 예상 범위 안에서 기다리는 중',
    shape: '<종류 글리프> <라벨>'
  }),
  Object.freeze({
    verdict: /** @type {WaitVerdict} */ ('overdue'),
    glyph: '⚠',
    meaning: '예상 시각·주기를 넘겼다 · 사람이 봐야 할 수 있다',
    shape: '⚠ <라벨> · 지연[ <n>분]'
  }),
  Object.freeze({
    verdict: /** @type {WaitVerdict} */ ('action_required'),
    glyph: '⛔',
    meaning: '스스로 풀리지 않는다 · 사람의 조치가 필요하다',
    shape: '⛔ <라벨> · 조치 필요'
  })
]);

/** @type {ReadonlyArray<WaitKindRow>} */
export const WAIT_KINDS = Object.freeze(
  /** @type {WaitKindRow[]} */ ([
    {
      id: 'prerequisite',
      kind: 'prerequisite',
      condition: 'prerequisite · prerequisite_foreign',
      scope: 'bead',
      glyph: '⛓',
      label: '선행 대기',
      when: '같은 저장소 또는 다른 저장소의 선행 이슈가 열려 있음',
      release:
        '선행이 닫히면 자동 복귀 · blocked·deferred·worker-ineligible 선행은 사람 조치 필요',
      action: '',
      elapsed_word: '',
      next_word: ''
    },
    {
      id: 'provider_hold',
      kind: 'provider_hold',
      condition: 'usage_limit · outage · 429 · 큐 행의 provider 게이트',
      scope: 'bead',
      glyph: '⏳',
      label: '공급자 보류',
      when: '계정 한도 또는 공급자 장애로 실행이나 출발이 보류됨',
      release:
        '한도 리셋 또는 다음 프로브 시각에 자동 확인 · 회복 확인 시 해제',
      action: '↻ 지금 프로브',
      elapsed_word: '보류',
      next_word: '다음 프로브'
    },
    {
      id: 'retry_wait',
      kind: 'retry_wait',
      condition: 'env 사다리의 자동 재시도 예약',
      scope: 'bead',
      glyph: '↻',
      label: '재시도 대기',
      when: '환경성 실패 뒤 이 Bead의 자동 재시도가 예약됨',
      release: '예약 시각에 자동 재시도 · 5분이 지나도 실행되지 않으면 지연',
      action: '폐기',
      elapsed_word: '대기',
      next_word: '다음 재시도'
    },
    {
      id: 'awaiting_user',
      kind: 'awaiting_user',
      condition: 'awaiting_user · recovery',
      scope: 'bead',
      glyph: '⏸',
      label: '세션이 멈춤',
      when: '세션이 사용자 답변이나 원인 확인을 요청하고 멈춤',
      release:
        '세션에서 남긴 문장과 원인을 확인하고 이어갈 지시 또는 폐기를 결정',
      action: '[세션에서 해결] · 폐기',
      elapsed_word: '대기',
      next_word: ''
    },
    {
      id: 'external_job',
      kind: 'external_job',
      condition: '소비자 Bead 행',
      scope: 'bead',
      glyph: '⏳',
      label: '외부 작업',
      when: '외부 작업 종료를 관찰하고 같은 세션의 재개를 기다림',
      release:
        '완료되면 같은 세션을 이어간다 · 사용자 세션은 [이어하기]로 fork 재개',
      action:
        '[지금 확인] · [관찰 중단] · [이어하기] · 재개 실패 시 [새 세션으로]',
      elapsed_word: '경과',
      next_word: '다음'
    }
  ])
);

/**
 * WaitReason rows describe a Bead; provider gate chips use the same vocabulary.
 *
 * @param {string} kind
 * @returns {WaitScope}
 */
export function waitScopeOf(kind) {
  return kind === 'gate' ? 'queue' : 'bead';
}

/**
 * Map server kinds and provider gate contexts onto the five legend rows.
 *
 * @param {{ kind?: string, headline?: string }|null|undefined} reason
 * @param {WaitKindContext} [context]
 * @returns {WaitKindRow|null}
 */
export function waitKindRow(reason, context = {}) {
  const kind = reason?.kind;
  const id =
    kind === 'prerequisite_foreign'
      ? 'prerequisite'
      : kind === 'recovery'
        ? 'awaiting_user'
        : kind === 'gate' && context.hold_kind
          ? 'provider_hold'
          : kind;
  return WAIT_KINDS.find((row) => row.id === id) || null;
}

/**
 * Build the slot-1 badge text (§5.1). A missing verdict draws the kind alone —
 * absence is not `normal` (§6.2 fail-quiet).
 *
 * @param {WaitKindRow|null|undefined} row
 * @param {WaitVerdict|null|undefined} verdict
 * @param {{ since?: unknown, now?: number, label?: string }} [clocks]
 * @returns {string}
 */
export function waitBadgeText(row, verdict, clocks = {}) {
  if (!row) {
    return '';
  }
  const label = clocks.label || row.label;
  const base = [row.glyph, label].filter(Boolean).join(' ');
  if (verdict === 'action_required') {
    return `⛔ ${label} · 조치 필요`;
  }
  if (verdict === 'overdue') {
    const since = clocks.since;
    const now = typeof clocks.now === 'number' ? clocks.now : Date.now();
    const minutes =
      typeof since === 'number' && Number.isFinite(since)
        ? Math.floor((now - since) / 60_000)
        : null;
    return `⚠ ${label} · 지연${minutes === null ? '' : ` ${minutes}분`}`;
  }
  return base;
}

/** @type {ReadonlyArray<string>} */
export const REPRESENTATIVE_KIND_ORDER = Object.freeze([
  'awaiting_user',
  'recovery',
  'provider_hold',
  'prerequisite_foreign',
  'prerequisite',
  'retry_wait'
]);

/** @type {Readonly<Record<string, number>>} */
const VERDICT_SEVERITY = Object.freeze({
  action_required: 0,
  overdue: 1,
  normal: 2
});

/**
 * Choose the one reason the card badge and headline speak for (§6.1). Queue
 * reasons and `external_job` are other surfaces' material.
 *
 * @param {Array<{ kind?: string, verdict?: string }>|null|undefined} reasons
 * @returns {{ kind?: string, verdict?: string }|null}
 */
export function representativeWaitReason(reasons) {
  const candidates = (Array.isArray(reasons) ? reasons : []).filter(
    (reason) =>
      reason &&
      typeof reason.kind === 'string' &&
      reason.kind !== 'external_job' &&
      waitScopeOf(reason.kind) === 'bead'
  );
  const ranked = candidates
    .map((reason, index) => ({
      reason,
      index,
      severity: VERDICT_SEVERITY[reason.verdict || 'normal'] ?? 2,
      order: REPRESENTATIVE_KIND_ORDER.indexOf(reason.kind || '')
    }))
    .sort(
      (a, b) =>
        a.severity - b.severity ||
        (a.order < 0 ? REPRESENTATIVE_KIND_ORDER.length : a.order) -
          (b.order < 0 ? REPRESENTATIVE_KIND_ORDER.length : b.order) ||
        a.index - b.index
    );
  return ranked.length > 0 ? ranked[0].reason : null;
}

/**
 * @typedef {Object} ChipRow
 * @property {string} id
 * @property {string} glyph
 * @property {string} label
 * @property {string} meaning
 * @property {string} click
 */

/**
 * Relation chips for the legend (§5.3). The meanings are the chip grammar §3
 * table verbatim — a divergence is that spec's correction, not a rewrite here.
 *
 * @type {ReadonlyArray<ChipRow>}
 */
export const RELATION_CHIPS = Object.freeze(
  /** @type {ChipRow[]} */ ([
    {
      id: 'blocked-by',
      glyph: '⛓',
      label: '⛓ <ID>',
      meaning: '지금 못 가는 이유',
      click: '그 이슈의 상세를 연다'
    },
    {
      id: 'blocks',
      glyph: '→',
      label: '→ <ID>',
      meaning: '내가 먼저 가야 풀리는 이슈',
      click: '그 이슈의 상세를 연다'
    },
    {
      id: 'released',
      glyph: '🔓',
      label: '🔓 <ID>',
      meaning: '왜 이제 갈 수 있나',
      click: '그 이슈의 상세를 연다'
    },
    {
      id: 'scope-overlap',
      glyph: '⧉',
      label: '⧉ <ID>',
      meaning: '같이 출발하면 부딪히는 이슈',
      click: '그 이슈의 상세를 연다'
    },
    {
      id: 'scope-missing',
      glyph: '',
      label: 'scope 없음',
      meaning: '겹침 판정 불가',
      click: '조작 없음'
    },
    {
      id: 'discovered-from',
      glyph: '↩',
      label: '↩ <ID>',
      meaning: '어디서 파생됐나',
      click: '원본 이슈의 상세를 연다'
    },
    {
      id: 'worker-created',
      glyph: '',
      label: '워커 생성',
      meaning: 'Worker가 어느 이슈에서 새로 만들었나',
      click: '사실 칩 · 조작 없음(원본이 확인되면 뒤의 링크가 연다)'
    },
    {
      id: 'grace',
      glyph: '⏳',
      label: '⏳ <n>초',
      meaning: '대기 진입 유예가 끝나기까지 남은 시간',
      click: '조작 없음 · [지금 시작]이 이 행의 유예를 걷는다'
    }
  ])
);

/**
 * Summary chips shared by the Worker KPI line and the Monitor total line (§8).
 *
 * `prefix` is the word the real chip draws before its count; `label` is the
 * legend form.
 *
 * @type {ReadonlyArray<{ id: string, prefix: string, label: string, meaning: string }>}
 */
export const SUMMARY_CHIPS = Object.freeze([
  Object.freeze({
    id: 'running',
    prefix: '실행',
    label: '실행 N',
    meaning: '지금 실행 중인 attempt 수'
  }),
  Object.freeze({
    id: 'pr_wait',
    prefix: 'PR',
    label: 'PR N',
    meaning: 'PR 머지를 기다리는 이슈 수 (긴 형식 PR 대기)'
  }),
  Object.freeze({
    id: 'done',
    prefix: '완료',
    label: '<range> 완료 N',
    meaning: '고른 범위 안에서 닫힌 이슈 수'
  }),
  Object.freeze({
    id: 'blocked',
    prefix: '막힘',
    label: '막힘 N',
    meaning:
      'scope=bead 사유가 하나라도 있는 원래 이슈 수 — external_job은 원래 이슈로 한 번만 세고, 보류된 attempt의 provider_hold도 포함한다'
  })
]);
