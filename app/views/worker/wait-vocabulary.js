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
 * @property {boolean} [dynamic_label] - The tile supplies `recovery.label`.
 * @property {string} when
 * @property {string} release
 * @property {string} action
 * @typedef {Object} WaitKindContext
 * @property {boolean} [returning]
 * @property {'usage_limit'|'outage'} [hold_kind]
 * @property {'env'|'systemic'} [queue_hold_kind]
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
      condition: '열린 선행 있음',
      scope: 'bead',
      glyph: '⛓',
      label: '선행 대기',
      when: '선행 이슈가 열려 있어 착수하지 못함',
      release: '선행이 닫히면 bd ready 재스캔으로 자동 복귀',
      action: ''
    },
    {
      id: 'prerequisite-returning',
      kind: 'prerequisite',
      condition: 'targets 전부 해제',
      scope: 'bead',
      glyph: '🔓',
      label: '복귀 대기',
      when: '막던 선행이 남지 않아 다음 pass의 후보 복귀를 기다림',
      release: '다음 재스캔에서 후보로 돌아감 · 10분 넘으면 지연',
      action: ''
    },
    {
      id: 'prerequisite_foreign',
      kind: 'prerequisite_foreign',
      scope: 'bead',
      glyph: '⛓',
      label: '선행 대기',
      when: '다른 저장소의 선행이 열려 있음(칩 색·툴팁으로 rig 구분)',
      release: '다른 저장소 선행이 닫히면 자동 복귀',
      action: ''
    },
    {
      id: 'external_job',
      kind: 'external_job',
      condition: 'gate 행에만',
      scope: 'bead',
      glyph: '⏳',
      label: '외부 계산',
      when: '외부 호스트의 작업 종료를 관측기가 확인하는 중',
      release:
        '<interval>분마다 자동 확인 · 종료 확인되면 대기 자동 해제 (· 완료 시 Discord 알림)',
      action: '[지금 확인]'
    },
    {
      id: 'base_moved',
      kind: 'base_moved',
      scope: 'bead',
      glyph: '',
      label: '반영 대기',
      when: '검증된 후보를 보존하고 새 base 재검증을 기다림',
      release: '↻ 이어하기로 보존 세션 재개',
      action: '↻ 이어하기'
    },
    {
      id: 'awaiting_user',
      kind: 'awaiting_user',
      scope: 'bead',
      glyph: '⏸',
      label: '세션 대기',
      when: '세션이 사용자 답변을 기다리며 파킹됨',
      release: '문의 세션에서 답하면 해제',
      action: '[세션에서 해결]'
    },
    {
      id: 'retry_wait',
      kind: 'retry_wait',
      scope: 'bead',
      glyph: '↻',
      label: '재시도 대기',
      when: '환경성 실패의 자동 재시도 예약',
      release: '예약 시각에 자동 재시도',
      action: '↻ 지금 재시도'
    },
    {
      id: 'stale_work',
      kind: 'stale_work',
      scope: 'bead',
      glyph: '⛔',
      label: '처분 대기',
      when: '보존된 작업을 이어갈지 새로 시작할지 결정이 필요',
      release: '처분 버튼으로 선택',
      action: '처분 버튼'
    },
    {
      id: 'recovery',
      kind: 'recovery',
      scope: 'bead',
      glyph: '⏳',
      label: '',
      dynamic_label: true,
      when: '복구 분류된 보존 작업이 확인을 기다림',
      release: '<RECOVERY_RELEASES[reason]>',
      action: '↻ 이어하기·폐기'
    },
    {
      id: 'provider_hold-usage_limit',
      kind: 'provider_hold',
      condition: 'usage_limit',
      scope: 'bead',
      glyph: '⏳',
      label: '한도 대기',
      when: '이 attempt가 계정 한도로 멈춤',
      release: '리셋 뒤 자동 프로브 · 자동 재개 소진이면 ↻ 지금 프로브',
      action: '↻ 지금 프로브'
    },
    {
      id: 'provider_hold-outage',
      kind: 'provider_hold',
      condition: 'outage',
      scope: 'bead',
      glyph: '⏳',
      label: '공급자 장애',
      when: '이 attempt가 공급자 장애로 멈춤',
      release: '다음 프로브 시각에 자동 프로브(상한 없음)',
      action: '↻ 지금 프로브'
    },
    {
      id: 'queue_hold-systemic',
      kind: 'queue_hold',
      condition: 'systemic',
      scope: 'queue',
      glyph: '⛔',
      label: '정지',
      when: '큐가 체계적 실패로 멈춤',
      release: '▶ 재개(사람 승인)',
      action: '▶ 재개'
    },
    {
      id: 'queue_hold-env',
      kind: 'queue_hold',
      condition: 'env',
      scope: 'queue',
      glyph: '↻',
      label: '환경 보류',
      when: '환경 오류로 큐가 일시 정지, 자동 재시도 예약',
      release: '<t>에 자동 재시도 · 성공하면 해제',
      action: '↻ 지금 재시도'
    },
    {
      id: 'auto_advance_off',
      kind: 'auto_advance_off',
      scope: 'queue',
      glyph: '⏸',
      label: '수동 출발',
      when: '자동 진행이 꺼져 있어 큐가 스스로 출발하지 않음',
      release: '[지금 시작] 또는 툴바 ▶ 자동화',
      action: '[지금 시작]'
    },
    {
      id: 'gate-provider_usage',
      kind: 'gate',
      condition: 'provider_usage',
      scope: 'queue',
      glyph: '⏳',
      label: '한도 대기',
      when: '러너의 계정 한도 보류 — target에 계정이 있으면 그 계정을 쓰는 행에만, 없으면 러너의 모든 행에',
      release: '리셋 뒤 자동 프로브 · 소진이면 ↻ 지금 프로브',
      action: '↻ 지금 프로브'
    },
    {
      id: 'gate-provider_outage',
      kind: 'gate',
      condition: 'provider_outage',
      scope: 'queue',
      glyph: '⏳',
      label: '공급자 장애',
      when: '러너 전체가 공급자 장애로 보류라 이 행이 출발하지 못함',
      release: '다음 프로브 시각에 자동 프로브',
      action: '↻ 지금 프로브'
    }
  ])
);

/** @type {ReadonlySet<string>} */
const QUEUE_KINDS = new Set(['queue_hold', 'auto_advance_off']);

/**
 * Which surface owns a WaitReason kind (§10.3): the card badge or the queue
 * gate chip. Unknown kinds stay `bead` so a new server kind is still visible.
 *
 * @param {string} kind
 * @returns {WaitScope}
 */
export function waitScopeOf(kind) {
  return QUEUE_KINDS.has(kind) ? 'queue' : 'bead';
}

/**
 * Pick the vocabulary row for a WaitReason. Context the reason does not carry
 * is inferred from its headline rather than guessed silently.
 *
 * @param {{ kind?: string, headline?: string }|null|undefined} reason
 * @param {WaitKindContext} [context]
 * @returns {WaitKindRow|null}
 */
export function waitKindRow(reason, context = {}) {
  const kind = reason?.kind;
  if (!kind) {
    return null;
  }
  const headline = typeof reason?.headline === 'string' ? reason.headline : '';
  /** @type {string} */
  let id = kind;
  if (kind === 'prerequisite' && context.returning === true) {
    id = 'prerequisite-returning';
  } else if (kind === 'provider_hold') {
    const hold_kind =
      context.hold_kind ||
      (headline.includes('공급자 장애') ? 'outage' : 'usage_limit');
    id = `provider_hold-${hold_kind}`;
  } else if (kind === 'queue_hold') {
    const queue_hold_kind =
      context.queue_hold_kind ||
      (headline.startsWith('환경 오류') ? 'env' : 'systemic');
    id = `queue_hold-${queue_hold_kind}`;
  }
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
  'stale_work',
  'recovery',
  'provider_hold',
  'prerequisite_foreign',
  'prerequisite',
  'base_moved',
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
    },
    {
      id: 'external-wait-count',
      glyph: '',
      label: '<판정 글리프> 외부 계산 N건',
      meaning: '이 이슈가 기다리는 외부 작업 gate 수와 그중 최악 판정',
      click: 'gate별 상태 팝업을 연다'
    }
  ])
);

/**
 * Summary chips shared by the Worker KPI line and the Monitor total line (§8).
 *
 * @type {ReadonlyArray<{ id: string, label: string, meaning: string }>}
 */
export const SUMMARY_CHIPS = Object.freeze([
  Object.freeze({
    id: 'running',
    label: '실행 N',
    meaning: '지금 실행 중인 attempt 수'
  }),
  Object.freeze({
    id: 'pr_wait',
    label: 'PR N',
    meaning: 'PR 머지를 기다리는 이슈 수 (긴 형식 PR 대기)'
  }),
  Object.freeze({
    id: 'done',
    label: '<range> 완료 N',
    meaning: '고른 범위 안에서 닫힌 이슈 수'
  }),
  Object.freeze({
    id: 'blocked',
    label: '막힘 N',
    meaning:
      'scope=bead 사유가 하나라도 있는 원래 이슈 수 — external_job은 원래 이슈로 한 번만 세고, 보류된 attempt의 provider_hold는 포함하며, 큐 사유(queue_hold·auto_advance_off)는 세지 않는다'
  })
]);
