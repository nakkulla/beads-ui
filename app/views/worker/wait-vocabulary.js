/**
 * The single wait vocabulary table (UI-8gem §5). Badges, gate chips, summary
 * chips, tooltips and the help legend all read these rows — the judgment is the
 * server's (`server/worker/wait-judgment.js`), the wording is here.
 *
 * `⚠` is U+26A0 with no VS16, so the badge keeps text metrics (§5.1).
 */
import {
  externalJobDisplayName,
  externalSpawnedClass,
  externalSpawnedCountParts
} from '../../protocol.js';

export {
  SLURM_RUNNING_STATES,
  SLURM_TERMINAL_STATES,
  externalJobDisplayName,
  externalSpawnedClass,
  externalSpawnedCountParts
} from '../../protocol.js';

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
      label: '확인 필요',
      when: '세션이 사용자 답변이나 원인 확인을 요청하고 멈춤',
      release:
        '같은 세션과의 대화에서 답하고 인계하면 Worker가 같은 세션을 이어감',
      action:
        '[세션에서 이어가기] · [워커로 이어가기] · 폐기 — 대화가 답을 기다리면 [워커로 이어가기] · 폐기',
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
        '완료되면 같은 세션을 이어간다 · 사용자 세션은 [세션에서 이어가기] 또는 [워커로 이어가기]',
      action:
        '[지금 확인] · [관찰 중단] · [세션에서 이어가기] · [워커로 이어가기] · 재개 실패 시 [새 세션으로] · 상세의 [대기 해제]',
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
 * @typedef {import('../../protocol.js').SpawnedClass} SpawnedClass
 * @typedef {import('../../protocol.js').SpawnedRowView} SpawnedRowView
 * @typedef {import('../../protocol.js').SpawnedView} SpawnedView
 */

/**
 * Whether a stored `spawned` value carries countable material.
 *
 * @param {unknown} value
 * @returns {value is SpawnedView}
 */
function isSpawnedView(value) {
  const spawned = /** @type {Record<string, any>|null} */ (value);
  return (
    !!spawned &&
    typeof spawned === 'object' &&
    Number.isInteger(spawned.total) &&
    !!spawned.counts &&
    typeof spawned.counts === 'object' &&
    Array.isArray(spawned.rows)
  );
}

/**
 * @typedef {Object} ExternalSpawnedSummary
 * @property {number} total
 * @property {Array<{ key: SpawnedClass, label: string, count: number }>} parts
 * @property {{ tone: 'danger'|'progress', glyph: string, items: Array<{ name: string, title: string }>, more: number }|null} names - Each item is a display name (the job number without one) and its wildcards `title`, `''` without one.
 */

/**
 * The sub-job summary lines under an external-work card's job lines (UI-q15q
 * §3.5). Counts come from `spawned.counts`, never from the capped rows. One
 * registered job adds a names line — the two most recently ended failures,
 * else the two most recently started running jobs; two or more registered
 * jobs share one summed count line. No sub-job returns `null`.
 *
 * @param {import('../../protocol.js').ExternalWaitObservation|null|undefined} record
 * @returns {ExternalSpawnedSummary|null}
 */
export function externalSpawnedSummary(record) {
  const jobs = Array.isArray(record?.jobs) ? record.jobs : [];
  /** @type {Record<SpawnedClass, number>} */
  const counts = {
    running: 0,
    pending: 0,
    completed: 0,
    failed: 0,
    unknown: 0
  };
  /** @type {SpawnedView[]} */
  const spawned_list = [];
  for (const job of jobs) {
    const spawned = /** @type {Record<string, unknown>} */ (job).spawned;
    if (isSpawnedView(spawned)) {
      spawned_list.push(spawned);
      for (const part of externalSpawnedCountParts(spawned.counts)) {
        counts[part.key] += part.count;
      }
    }
  }
  const parts = externalSpawnedCountParts(counts);
  const total = parts.reduce((sum, part) => sum + part.count, 0);
  if (total === 0) {
    return null;
  }
  /** @type {ExternalSpawnedSummary['names']} */
  let names = null;
  if (jobs.length === 1 && spawned_list.length === 1) {
    const rows = spawned_list[0].rows;
    const failed = rows
      .filter((row) => externalSpawnedClass(row) === 'failed')
      .sort((a, b) =>
        String(b.ended_at || '').localeCompare(String(a.ended_at || ''))
      );
    const running = rows
      .filter((row) => externalSpawnedClass(row) === 'running')
      .sort((a, b) =>
        String(b.started_at || '').localeCompare(String(a.started_at || ''))
      );
    const pick = failed.length > 0 ? failed : running;
    const count = failed.length > 0 ? counts.failed : counts.running;
    if (pick.length > 0) {
      const items = pick.slice(0, 2).map((row) => {
        const display = externalJobDisplayName(row);
        return { name: display.name || row.job_id, title: display.detail };
      });
      names = {
        tone: failed.length > 0 ? 'danger' : 'progress',
        glyph: failed.length > 0 ? '✕' : '◐',
        items,
        more: Math.max(0, count - items.length)
      };
    }
  }
  return { total, parts, names };
}

/**
 * Seconds as a duration cell: `1h29m` · `19m` · `<1m`, `''` without material.
 *
 * @param {number|null|undefined} seconds
 * @returns {string}
 */
function spawnedDuration(seconds) {
  return typeof seconds === 'number' && Number.isFinite(seconds)
    ? externalJobElapsed(0, seconds * 1000)
    : '';
}

/**
 * @typedef {Object} SpawnedCell
 * @property {string} id
 * @property {string} name - The display name; `''` means the job number.
 * @property {string} title - Wildcards and the original JobName.
 * @property {string} state - The raw Slurm state.
 * @property {SpawnedClass} group
 * @property {string} elapsed - The elapsed / limit cell (§3.6 table).
 * @property {string} resources - `<CPU>코어 <메모리>`, `''` without material.
 * @property {string} exit
 */

/** Open sub-job groups of the detail table, in drawing order (§3.6). */
const SPAWNED_OPEN_ORDER = Object.freeze(
  /** @type {SpawnedClass[]} */ (['running', 'pending', 'failed', 'unknown'])
);

/**
 * The sub-job rows of one registered job in the issue-detail table (UI-q15q
 * §3.6). Running → pending → failed → unknown rows stay open; completed rows
 * fold in submission order behind `completed_count`, and `omitted` counts the
 * completed rows the record no longer keeps. A job without sub-jobs returns
 * `null`.
 *
 * @param {unknown} spawned
 * @returns {{ open: SpawnedCell[], completed: SpawnedCell[], completed_count: number, omitted: number }|null}
 */
export function externalSpawnedTable(spawned) {
  if (!isSpawnedView(spawned) || spawned.total <= 0) {
    return null;
  }
  /** @param {SpawnedRowView} row */
  const cell = (row) => {
    const group = externalSpawnedClass(row);
    const display = externalJobDisplayName(row);
    const elapsed = spawnedDuration(row.elapsed_seconds);
    const limit =
      row.unlimited === true ? '' : spawnedDuration(row.time_limit_seconds);
    return {
      id: row.job_id,
      name: display.name,
      title: [display.detail, row.name ? `JobName ${row.name}` : '']
        .filter(Boolean)
        .join(' · '),
      state: typeof row.state === 'string' ? row.state : '',
      group,
      elapsed:
        group === 'running'
          ? elapsed && limit
            ? `${elapsed} / ${limit}`
            : elapsed
          : group === 'pending'
            ? elapsed
              ? `대기 ${elapsed}`
              : ''
            : group === 'unknown'
              ? ''
              : elapsed,
      resources: [
        typeof row.cpus === 'number' && Number.isFinite(row.cpus)
          ? `${row.cpus}코어`
          : '',
        typeof row.memory === 'string' ? row.memory : ''
      ]
        .filter(Boolean)
        .join(' '),
      exit: typeof row.exit_code === 'number' ? String(row.exit_code) : ''
    };
  };
  /**
   * @param {SpawnedRowView} a
   * @param {SpawnedRowView} b
   */
  const bySubmit = (a, b) =>
    String(a.submitted_at || '').localeCompare(String(b.submitted_at || '')) ||
    String(a.job_id).localeCompare(String(b.job_id), undefined, {
      numeric: true
    });
  const rows = [...spawned.rows].sort(bySubmit);
  const open = SPAWNED_OPEN_ORDER.flatMap((group) =>
    rows.filter((row) => externalSpawnedClass(row) === group)
  ).map(cell);
  const completed = rows
    .filter((row) => externalSpawnedClass(row) === 'completed')
    .map(cell);
  const completed_count = Number.isInteger(spawned.counts.completed)
    ? spawned.counts.completed
    : completed.length;
  return {
    open,
    completed,
    completed_count,
    omitted:
      Number.isInteger(spawned.omitted) && spawned.omitted > 0
        ? spawned.omitted
        : 0
  };
}

/**
 * @typedef {'success'|'danger'|'progress'|'neutral'} ExternalJobTone
 * @typedef {Object} ExternalJobRow
 * @property {string} glyph
 * @property {string} host - `로컬` when the job names no host.
 * @property {string} id - Slurm `job_id` or `pid <n>`; `''` without material.
 * @property {string} name - The registered job's display name (UI-q15q §3.3);
 * `''` means the renderer shows `id`.
 * @property {string} state - The state word; `''` without material.
 * @property {ExternalJobTone} tone
 * @property {string} elapsed - `1h29m` · `19m` · `<1m`; `''` without material.
 * @property {number|null} live_since - The submit instant of a job that has not
 * ended, whose elapsed still grows with the clock; `null` once it ended or
 * without material.
 * @property {string} title - The raw state, exit code and evidence.
 * @property {ExternalJobNote[]} notes - Lines drawn right under this job line: the
 * capacity lines of a lone pending Slurm job ({@link externalCapacityLines}) and
 * the cancel-unconfirmed line of a takeover's local run (UI-qbgj §3.6). They
 * sit outside the job-line cap, which counts job lines only.
 * @typedef {{ text: string, tone: 'muted'|'warn' }} ExternalJobNote
 * @typedef {Object} ExternalJobRows
 * @property {ExternalJobRow[]} rows - At most four lines, overflow included.
 * @property {string} more - `외 <n>건 · 전체는 상세의 잡 표`, or `''`.
 */

/** Slurm states of a job that is still queued (UI-a119 §3.4). */
const QUEUED_JOB_STATES = Object.freeze(['PENDING', 'CONFIGURING', 'REQUEUED']);

/** Lines an external-work card gives its jobs, the overflow line included. */
const EXTERNAL_JOB_LINE_LIMIT = 4;

/**
 * One job's glyph, state word, tone and sort group (UI-a119 §3.4 table). The
 * group orders running → other waiting → failed/unknown → completed.
 *
 * @param {import('../../protocol.js').ExternalWaitObservation['jobs'][number]} job
 * @returns {{ glyph: string, state: string, tone: ExternalJobTone, group: number }}
 */
function externalJobState(job) {
  const state = typeof job.state === 'string' ? job.state : '';
  const terminal = job.terminal;
  if (terminal) {
    if (
      state === 'COMPLETED' &&
      (typeof terminal.exit_code !== 'number' || terminal.exit_code === 0) &&
      terminal.recovery_needed !== true
    ) {
      return { glyph: '✓', state: '완료', tone: 'success', group: 3 };
    }
    if (state === 'VANISHED') {
      return { glyph: '?', state: '결과 모름', tone: 'neutral', group: 2 };
    }
    return { glyph: '✕', state: '실패', tone: 'danger', group: 2 };
  }
  if (state === 'RUNNING') {
    return { glyph: '◐', state: '실행 중', tone: 'progress', group: 0 };
  }
  if (QUEUED_JOB_STATES.includes(state)) {
    return { glyph: '○', state: '대기 중', tone: 'neutral', group: 1 };
  }
  if (state === 'UNKNOWN') {
    return { glyph: '·', state: '확인 중', tone: 'neutral', group: 1 };
  }
  return { glyph: '·', state, tone: 'neutral', group: 1 };
}

/**
 * A job's elapsed cell: `1h29m` from an hour, `19m` from a minute, `<1m`
 * below, and `''` when either instant is missing.
 *
 * @param {number} from
 * @param {number} to
 * @returns {string}
 */
export function externalJobElapsed(from, to) {
  if (!Number.isFinite(from) || !Number.isFinite(to)) {
    return '';
  }
  const minutes = Math.floor(Math.max(0, to - from) / 60_000);
  if (minutes >= 60) {
    return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}m`;
  }
  return minutes >= 1 ? `${minutes}m` : '<1m';
}

/**
 * The job lines of one external-work card (UI-a119 §3.4). Renderers only draw
 * this result. A terminal job's elapsed ends at its own `observed_at` — the
 * observer stops re-reading a job once it has seen it end — never at the
 * record-wide `completion.completed_at`, which is the LAST job's end. A row
 * with no id, state or elapsed material is dropped; no rows means the caller
 * falls back to the server headline.
 *
 * @param {import('../../protocol.js').ExternalWaitObservation|null|undefined} record
 * @param {number} now
 * @returns {ExternalJobRows}
 */
export function externalJobRows(record, now) {
  const jobs = Array.isArray(record?.jobs) ? record.jobs : [];
  const rows = jobs
    .map((job, index) => {
      const judged = externalJobState(job);
      const submitted = Date.parse(job.submitted_at);
      const end = job.terminal ? Date.parse(job.observed_at || '') : now;
      const remote = job.adapter === 'slurm' || job.adapter === 'sjob_local';
      const local_run = job.adapter === 'sjob_local';
      const host =
        remote && typeof job.ssh_host === 'string' && job.ssh_host.length > 0
          ? job.ssh_host
          : '로컬';
      const id =
        job.adapter === 'slurm'
          ? typeof job.job_id === 'string'
            ? job.job_id
            : ''
          : local_run
            ? typeof job.local_id === 'string'
              ? job.local_id
              : ''
            : Number.isInteger(job.pid)
              ? `pid ${job.pid}`
              : '';
      const exit_code = job.terminal?.exit_code;
      const display = remote
        ? externalJobDisplayName(job)
        : { name: '', detail: '' };
      // 바로 실행으로 옮긴 잡은 `<호스트> <이름> 로컬 <상태어>`다 (UI-qbgj §3.6).
      const state =
        local_run && judged.state ? `로컬 ${judged.state}` : judged.state;
      const cancel_line = externalCancelUnconfirmedLine(job);
      /** @type {ExternalJobNote[]} */
      const notes = [
        ...(jobs.length === 1 ? externalJobCapacityLines(job) : []).map(
          (text) => ({ text, tone: /** @type {const} */ ('muted') })
        ),
        ...(cancel_line
          ? [{ text: cancel_line, tone: /** @type {const} */ ('warn') }]
          : [])
      ];
      return {
        row: {
          glyph: judged.glyph,
          host,
          id,
          name: display.name,
          state,
          tone: judged.tone,
          elapsed: externalJobElapsed(submitted, end),
          live_since:
            !job.terminal && Number.isFinite(submitted) ? submitted : null,
          title: [
            display.name ? id : '',
            job.state || '',
            typeof exit_code === 'number' ? `exit ${exit_code}` : '',
            job.terminal?.recovery_needed === true ? 'recovery_needed' : '',
            job.terminal?.evidence || '',
            local_run && job.takeover_from?.job_id
              ? `Slurm ${job.takeover_from.job_id}에서 전환`
              : ''
          ]
            .filter(Boolean)
            .join(' · '),
          notes
        },
        group: judged.group,
        submitted: Number.isFinite(submitted) ? submitted : Infinity,
        index
      };
    })
    .filter(
      (entry) =>
        entry.row.id || entry.row.name || entry.row.state || entry.row.elapsed
    )
    .sort(
      (a, b) =>
        a.group - b.group ||
        (a.submitted === b.submitted
          ? 0
          : a.submitted < b.submitted
            ? -1
            : 1) ||
        a.index - b.index
    )
    .map((entry) => entry.row);
  if (rows.length <= EXTERNAL_JOB_LINE_LIMIT) {
    return { rows, more: '' };
  }
  const shown = EXTERNAL_JOB_LINE_LIMIT - 1;
  return {
    rows: rows.slice(0, shown),
    more: `외 ${rows.length - shown}건 · 전체는 상세의 잡 표`
  };
}

/** Display words of the Slurm pending `Reason` (UI-qbgj §3.1). */
const CAPACITY_REASON_WORDS = Object.freeze(
  /** @type {Record<string, string>} */ ({
    Resources: '자원 부족',
    Priority: '우선순위',
    JobArrayTaskLimit: '배열 동시 제한',
    Dependency: '선행 대기'
  })
);

/**
 * The display word of a Slurm pending reason; any other token stays as it is.
 *
 * @param {string} reason
 * @returns {string}
 */
export function capacityReasonWord(reason) {
  return Object.hasOwn(CAPACITY_REASON_WORDS, reason)
    ? CAPACITY_REASON_WORDS[reason]
    : reason;
}

/**
 * Slurm's expected start as local `MM/DD HH:mm`, or `''` when it does not
 * parse.
 *
 * @param {string|null|undefined} value
 * @returns {string}
 */
function formatEstimatedStart(value) {
  const ms = typeof value === 'string' ? Date.parse(value) : NaN;
  if (!Number.isFinite(ms)) {
    return '';
  }
  const d = new Date(ms);
  const pad = (/** @type {number} */ n) => String(n).padStart(2, '0');
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * The capacity lines of one pending Slurm job (UI-qbgj §3.6): the wait line
 * `대기 사유 <표시어> · 앞 <n>건 · Slurm 예상 <MM/DD HH:mm>` and the allocation
 * line `<partition> CPU <alloc>/<total> 배정 · 실제 부하 <n> · 쓸 수 있는 메모리
 * <G>G`. An item without material is left out; without `host` the second line
 * stops at the Slurm allocation. A job that is not a pending Slurm job with
 * `capacity` gives no lines. The card shows them only for a record with one job;
 * the detail panel shows them for every such job.
 *
 * @param {import('../../protocol.js').ExternalWaitObservation['jobs'][number]} job
 * @returns {string[]}
 */
export function externalJobCapacityLines(job) {
  const capacity = job?.capacity;
  if (
    !capacity ||
    job.adapter !== 'slurm' ||
    job.state !== 'PENDING' ||
    job.terminal
  ) {
    return [];
  }
  const start = formatEstimatedStart(capacity.est_start);
  const wait = [
    capacity.reason ? `대기 사유 ${capacityReasonWord(capacity.reason)}` : '',
    Number.isInteger(capacity.ahead?.jobs) ? `앞 ${capacity.ahead.jobs}건` : '',
    start ? `Slurm 예상 ${start}` : ''
  ].filter(Boolean);
  const slurm = capacity.slurm;
  const host = capacity.host;
  const allocation = [
    slurm && capacity.partition
      ? `${capacity.partition} CPU ${slurm.cpu_alloc}/${slurm.cpu_total} 배정`
      : '',
    host && Number.isFinite(host.load1)
      ? `실제 부하 ${Math.round(host.load1)}`
      : '',
    host && Number.isFinite(host.mem_available_mb)
      ? `쓸 수 있는 메모리 ${Math.floor(host.mem_available_mb / 1024)}G`
      : ''
  ].filter(Boolean);
  return [wait.join(' · '), allocation.join(' · ')].filter(Boolean);
}

/**
 * `원 Slurm <id> 취소 미확인 — hold 유지` for a takeover's local run whose
 * original Slurm job was never confirmed cancelled (UI-qbgj §3.5), else `''`.
 *
 * @param {import('../../protocol.js').ExternalWaitObservation['jobs'][number]} job
 * @returns {string}
 */
export function externalCancelUnconfirmedLine(job) {
  return job?.adapter === 'sjob_local' &&
    job.takeover_from?.cancel_failed === true
    ? `원 Slurm ${job.takeover_from.job_id} 취소 미확인 — hold 유지`
    : '';
}

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
