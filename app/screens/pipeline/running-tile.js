/**
 * Running-lane tiles of the pipeline screen (UI-dbn6 §3.4) — the successor
 * of `runningTile`. Five held states (parked · retry_wait · waiting ·
 * provider_hold · external wait), failed tiles with their cause popover, and
 * session tiles keep their existing judgment; the tile draws the lane model's
 * projection and never re-decides (ADR UI-nuwy for `[세션에서 해결]`·
 * `[워커로 이어가기]`). Elapsed/activity ages are ticker spans.
 */
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import {
  failureCategory,
  failureNextAction,
  failureSentence,
  failureText
} from '../../model/failure-labels.js';
import { representativeWaitReason } from '../../model/wait-vocabulary.js';
import { formatContinuationLineage } from '../../utils/attempt-display.js';
import { resumeKindOf } from '../../utils/quickfix-resume-kind.js';
import { sessionRefLabel } from '../../utils/session-ref.js';
import {
  depLines,
  execChips,
  footTemplate,
  idChip,
  judgementChips,
  labelChips,
  laneOriginChip,
  popoverBody,
  priorityBadge,
  repoBadge,
  routeChip,
  sourceChips,
  timeSpan,
  timesLine,
  usageFacts
} from './chips.js';
import {
  discardOps,
  discardReceipt,
  mergeStepGauge,
  resolveOps
} from './mini-row.js';
import {
  externalWaitParts,
  inquiryLine,
  interactiveBadges,
  waitBadge,
  waitLines
} from './wait.js';

/**
 * @import { OpDef } from './chips.js'
 * @import { RowContext } from './mini-row.js'
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {RowContext & { selected_attempt: string|null, open_failure: string|null }} TileContext
 */

/** The label of the manual resume a failed tile draws (UI-kyky §4.3). */
const RESUME_LABELS = Object.freeze({
  settlement: '정리 재시도',
  session: '이어하기'
});

/** Codex forwarder subagents hidden from the delegation chips. */
const FORWARDER_AGENT_TYPES = new Set(['codex-runner']);

/**
 * The status label a held/failed tile reads (the Monitor mapping, kept).
 *
 * @param {any} item
 * @returns {string|undefined}
 */
function statusLabelOf(item) {
  switch (item.run_state) {
    case 'failed':
      return '실패';
    case 'parked':
      return '세션 대기';
    case 'retry_wait':
      return '재시도 대기';
    case 'waiting':
      return item.wait?.recovery
        ? item.wait.recovery.label || ''
        : item.wait?.cause === 'base_moved'
          ? '반영 대기'
          : '선행 대기';
    case 'provider_hold':
      return '공급자 보류';
    default:
      return item.status_label;
  }
}

/**
 * The receipt actor as the contract writes it (`<model>[:<effort>]`).
 *
 * @param {{ actor: string, effort?: string|null }} receipt
 * @returns {string}
 */
function receiptActor(receipt) {
  return receipt.effort ? `${receipt.actor}:${receipt.effort}` : receipt.actor;
}

/**
 * @param {any} retry
 * @returns {string}
 */
function retryLabel(retry) {
  const count =
    retry && retry.attempts > 0 && retry.max > 0
      ? ` ${retry.attempts}/${retry.max}`
      : '';
  const next =
    retry && typeof retry.next_at === 'number'
      ? ` · ${new Date(retry.next_at).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        })}`
      : '';
  return `재시도 대기${count}${next}`;
}

/**
 * One delegation's usage text.
 *
 * @param {any} leg
 * @returns {string}
 */
function legUsage(leg) {
  const usage = leg?.usage;
  const codex_total =
    (leg?.native || leg?.runtime === 'codex') && usage
      ? Number.isFinite(usage.total_tokens)
        ? usage.total_tokens
        : (Number.isFinite(usage.input_tokens) ? usage.input_tokens : 0) +
          (Number.isFinite(usage.output_tokens) ? usage.output_tokens : 0)
      : null;
  const tokens =
    codex_total !== null && codex_total > 0
      ? `τ ${codex_total.toLocaleString('en-US')}`
      : '';
  const price =
    typeof leg?.price_usd === 'number' && Number.isFinite(leg.price_usd)
      ? `$${leg.price_usd.toFixed(6).replace(/0+$/, '').replace(/\.$/, '')}${
          leg.price_basis === 'estimated' ? ' 추정' : ''
        }`
      : usage && leg?.price_basis === 'none'
        ? '단가 없음'
        : '';
  const facts = [tokens, price].filter(Boolean);
  return facts.length > 0 ? ` · ${facts.join(' · ')}` : '';
}

/**
 * Slot 3 of a live tile: the last activity line and the delegation chips.
 *
 * @param {any} item
 * @param {number} now
 * @param {any} session_current
 * @returns {TemplateResult|''}
 */
function activityBody(item, now, session_current) {
  const activity = item.last_activity || null;
  const text =
    activity && typeof activity.text === 'string' ? activity.text : '';
  const at = activity && typeof activity.at === 'number' ? activity.at : null;
  const session = item.kind === 'session';
  const session_at =
    session &&
    session_current &&
    session_current.locality === 'local' &&
    typeof session_current.last_event_at === 'number'
      ? session_current.last_event_at
      : null;
  const updated =
    session && typeof item.updated_at === 'number' ? item.updated_at : null;
  const legs = (Array.isArray(item.legs) ? item.legs : []).filter(
    (/** @type {any} */ leg) =>
      leg &&
      !(
        typeof leg.agent_type === 'string' &&
        FORWARDER_AGENT_TYPES.has(leg.agent_type)
      )
  );
  /**
   * @param {string} label
   * @param {string} state
   */
  const group = (label, state) => {
    const list = legs.filter((/** @type {any} */ leg) => leg.state === state);
    return list.length === 0
      ? ''
      : html`<details class="pl-legs__group">
          <summary class="pl-chip pl-chip--leg is-${state}">
            위임 ${label} ${list.length}
          </summary>
          <ul>
            ${list.map(
              (/** @type {any} */ leg) =>
                html`<li>${leg.label}${legUsage(leg)}</li>`
            )}
          </ul>
        </details>`;
  };
  return html`${text
    ? html`<div
        class="pl-activity${item.run_state === 'paused' ? ' is-paused' : ''}"
      >
        <span class="pl-dot is-live" aria-hidden="true"></span>
        <code class="pl-activity__text">${text}</code>
        ${at !== null
          ? timeSpan(at, 'rel', { now, cls: 'pl-ts pl-activity__age' })
          : ''}
      </div>`
    : session_at !== null || updated !== null
      ? html`<div class="pl-activity">
          ${timeSpan(/** @type {number} */ (session_at ?? updated), 'rel', {
            pre: session_at !== null ? '최근 활동 ' : '갱신 ',
            now
          })}
        </div>`
      : ''}${legs.length > 0
    ? html`<div class="pl-legs">
        ${legs
          .filter((/** @type {any} */ leg) => leg.state === 'live')
          .map(
            (/** @type {any} */ leg) =>
              html`<span
                class="pl-chip pl-chip--leg is-live"
                title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
                >위임 중 · ${leg.label}${legUsage(leg)}</span
              >`
          )}${group('완료', 'done')}${group('실패', 'failed')}${group(
          '중단',
          'interrupted'
        )}
      </div>`
    : ''}`;
}

/**
 * The `다음` sentence of a failure popover (UI-kyky §4.2).
 *
 * @param {any} failure
 * @returns {string}
 */
function failureNext(failure) {
  if (failure.resume_refused_sentence) {
    return failure.resume_refused_sentence;
  }
  const guidance = failureNextAction(failure.cause);
  if (!guidance) {
    return '';
  }
  const kind = resumeKindOf(failure.quickfix_landing);
  if (failure.resume_eligible !== false) {
    return `${guidance} ${
      kind === 'settlement'
        ? '아래 [정리 재시도]를 눌러 실패한 착지 후 절차를 다시 실행하세요.'
        : '원인을 확인한 뒤 아래 [이어하기]로 같은 세션에서 작업을 계속하세요.'
    }`;
  }
  const refusal =
    typeof failure.resume_reason === 'string' ? failure.resume_reason : '';
  return [
    guidance,
    refusal,
    failure.attempt_id ? '세션 기록을 열어 원인을 확인하세요.' : ''
  ]
    .filter((part) => part.length > 0)
    .join(' ');
}

/**
 * The failure detail popover, opened from the cause badge.
 *
 * @param {any} failure
 * @param {any} item
 * @param {number} now
 * @returns {TemplateResult}
 */
function failurePopover(failure, item, now) {
  const kept_session_failure =
    failure.continuation_choice === 'prior_attempt' &&
    typeof failure.cause === 'string' &&
    (failure.cause.startsWith('resume_failed') ||
      failure.cause.startsWith('session_failed'));
  const base_cause =
    failureSentence(failure.cause) ||
    failureText(failure.cause, failure.cause_detail);
  const cause = kept_session_failure
    ? failure.cause === 'resume_failed:transcript_missing'
      ? '이어갈 세션 기록이 없습니다. 새 세션을 자동으로 시작하지 않았습니다.'
      : `${base_cause} 새 세션을 자동으로 시작하지 않았습니다.`
    : base_cause;
  const landing =
    failure.quickfix_lane && failure.quickfix_landing
      ? [
          failure.quickfix_landing.cursor || null,
          typeof failure.quickfix_landing.head_sha === 'string'
            ? failure.quickfix_landing.head_sha.slice(0, 7)
            : null,
          failure.quickfix_landing.reason || null
        ]
          .filter(Boolean)
          .join(' · ')
      : '';
  const execution = [
    failure.runner,
    failure.model,
    failure.observed_effort ?? failure.effort,
    failure.speed
  ]
    .filter((value) => typeof value === 'string' && value.length > 0)
    .join(' · ');
  const cost = failure.usage?.total_cost_usd;
  const resume_label = RESUME_LABELS[resumeKindOf(failure.quickfix_landing)];
  const timeline = Array.isArray(failure.timeline) ? failure.timeline : [];
  const next = failureNext(failure);
  /** @type {Array<[string, TemplateResult|string]>} */
  const rows = [];
  if (failure.summary) {
    rows.push(['보고', failure.summary]);
  }
  if (timeline.length > 0) {
    rows.push([
      '이력',
      html`<ol class="pl-history">
        ${timeline.map(
          (/** @type {any} */ row) =>
            html`<li>
              ${typeof row.at === 'number'
                ? new Date(row.at).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : ''}
              ${row.summary}
            </li>`
        )}
      </ol>`
    ]);
  }
  if (failure.log_unreadable === true) {
    rows.push(['로그', '읽기 실패']);
  } else if (failure.log_expired === true) {
    rows.push(['로그', '만료됨']);
  } else if (typeof failure.log_path === 'string' && failure.log_path) {
    rows.push(['로그', html`<code>${failure.log_path}</code>`]);
  }
  if (cause) {
    rows.push(['원인', cause]);
  }
  if (next) {
    rows.push(['다음', next]);
  }
  if (failure.retry && failure.retry.attempts > 0) {
    rows.push([
      '재시도 이력',
      `자동 재시도 ${failure.retry.attempts}회 — 같은 오류`
    ]);
  }
  if (failure.cause) {
    rows.push(['실패 코드', html`<code>${failure.cause}</code>`]);
  }
  if (failure.cause_detail?.reason) {
    rows.push(['가드/원인', failure.cause_detail.reason]);
  }
  if (failure.cause_detail?.command) {
    rows.push(['명령', html`<code>${failure.cause_detail.command}</code>`]);
  }
  if (landing) {
    rows.push(['착지 단계', landing]);
  }
  if (typeof failure.finished_at === 'number') {
    rows.push([
      '실패 시각',
      html`${new Date(failure.finished_at).toLocaleString('ko-KR')} ·
      ${timeSpan(failure.finished_at, 'rel', { now })}`
    ]);
  }
  if (execution) {
    rows.push(['실행', execution]);
  }
  if (failure.attempt_id) {
    rows.push([
      'attempt id',
      html`<code>${failure.attempt_id}</code
        ><button
          type="button"
          class="pl-copy"
          data-op="copy-text"
          data-copy=${failure.attempt_id}
          title="attempt id 복사"
          aria-label="attempt id 복사"
        >
          ⧉
        </button>`
    ]);
  }
  if (typeof cost === 'number' && Number.isFinite(cost)) {
    rows.push(['비용', `$${cost.toFixed(2)}`]);
  }
  rows.push([
    '재개',
    failure.resume_eligible
      ? `${resume_label} 가능`
      : failure.resume_reason || `${resume_label} 불가`
  ]);
  return html`<div
    class="pl-pop pl-pop--failure"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="pl-kv">
      ${rows.map(
        ([term, value]) =>
          html`<div>
            <dt>${term}</dt>
            <dd>${value}</dd>
          </div>`
      )}
    </dl>
    ${failure.attempt_id
      ? html`<button
          type="button"
          class="pl-op pl-op--plain"
          data-op="session-open"
          data-bead-id=${item.id}
          data-root-dir=${item.root_dir}
          data-attempt-id=${failure.attempt_id}
        >
          ▤ 세션
        </button>`
      : ''}
    ${failure.landed
      ? html`<p class="pl-note">
          이미 base에 착지됨 — ${resume_label}로 배포·정리를 재개
        </p>`
      : ''}
  </div>`;
}

/**
 * The foot ops of one tile.
 *
 * @param {any} item
 * @param {{ session: boolean, failed: boolean, held: string|null, paused: boolean, session_current: any, wait_ops: OpDef[], external_ops: OpDef[] }} state
 * @returns {OpDef[]}
 */
export function tileOps(item, state) {
  const coord = { bead_id: item.id, root_dir: item.root_dir };
  const attempt = { ...coord, attempt_id: item.attempt_id || '' };
  const failure = item.failure || null;
  const landed_failure = state.failed && failure?.landed === true;
  const discard = landed_failure
    ? []
    : discardOps(item, { confirmation: failure?.confirmation });
  /** @type {OpDef[]} */
  const ops = [];
  if (state.session) {
    if (state.session_current) {
      const blocked =
        state.session_current.locality === 'remote'
          ? '다른 머신 세션 — 이 서버에 transcript 없음'
          : state.session_current.locality === 'missing'
            ? 'transcript 파일 없음'
            : '';
      ops.push({
        op: 'session-open',
        label: '▤ 세션',
        disabled: blocked.length > 0,
        title: blocked || '라이브 세션 열기',
        data: coord
      });
    }
    ops.push(...state.wait_ops, ...state.external_ops, ...resolveOps(item));
    ops.push(...discard);
    return ops;
  }
  if (state.failed) {
    const kind = resumeKindOf(failure?.quickfix_landing);
    ops.push({
      op: 'resume',
      label: `↻ ${RESUME_LABELS[kind]}`,
      tone: 'primary',
      disabled: failure?.resume_eligible === false,
      title:
        failure?.resume_eligible === false
          ? failure.resume_reason || `${RESUME_LABELS[kind]} 불가`
          : kind === 'settlement'
            ? '착지 후 정리 절차를 다시 실행 (세션을 열지 않습니다)'
            : '같은 세션으로 이어서 진행',
      data: { ...attempt, resume_kind: kind }
    });
    ops.push(...state.wait_ops, ...resolveOps(item), ...discard);
    return ops;
  }
  if (state.held === 'provider_hold') {
    ops.push(
      {
        op: 'resume',
        label: '↻ 이어하기',
        tone: 'primary',
        title: '같은 세션으로 이어서 진행',
        data: { ...attempt, resume_kind: 'session' }
      },
      {
        op: 'resume-alternate',
        label: '⋯ 다른 방법으로',
        title: '러너·모델·계정을 바꾸거나 새 세션으로 이어갑니다',
        data: attempt
      }
    );
    ops.push(...state.wait_ops, ...discard);
    return ops;
  }
  if (state.held === 'external') {
    ops.push(...state.external_ops, ...discard);
    return ops;
  }
  if (state.held) {
    ops.push(...state.wait_ops, ...resolveOps(item), ...discard);
    return ops;
  }
  ops.push({
    op: 'session-open',
    label: '▤ 세션',
    title: '라이브 세션 열기',
    data: attempt
  });
  ops.push(
    state.paused
      ? {
          op: 'resume',
          label: '▶ 재개',
          tone: 'primary',
          title:
            '같은 세션으로 이어서 재개 — 바로 재개하거나 지시를 입력할 수 있음',
          data: { ...attempt, resume_kind: 'session' }
        }
      : {
          op: 'pause',
          label: '⏸',
          disabled: item.can_pause === false,
          title:
            item.can_pause === false
              ? '세션 ID 기록 전 — 일시정지 불가'
              : '일시정지 (같은 세션으로 재개 가능)',
          data: attempt
        }
  );
  ops.push(...state.wait_ops, ...resolveOps(item), ...discard);
  return ops;
}

/**
 * The held state of a tile — one exclusive slot (UI-5ym8 §2, UI-l48z §4.1).
 *
 * @param {any} item
 * @param {number} now
 * @returns {{ session: boolean, failed: boolean, paused: boolean, held: string|null, external: ReturnType<typeof externalWaitParts>, session_current: any }}
 */
function tileState(item, now) {
  const session = item.kind === 'session';
  const failed = item.run_state === 'failed';
  const external = externalWaitParts(item, now);
  const run_held = [
    'parked',
    'retry_wait',
    'waiting',
    'provider_hold'
  ].includes(item.run_state)
    ? item.run_state
    : null;
  const held = failed ? null : run_held || (external.badge ? 'external' : null);
  const session_current = session
    ? (item.session_refs || []).find(
        (/** @type {any} */ view) => view && view.current === true
      ) || null
    : null;
  return {
    session,
    failed,
    paused: item.run_state === 'paused',
    held,
    external,
    session_current
  };
}

/**
 * Every op one tile offers — the list the tile foot and the `⋯` ops sheet
 * both read. Running tiles carry `↻ 지금 프로브` from their wait reasons: there
 * is no gate chip on a tile (UI-pw2g §3.4).
 *
 * @param {any} item
 * @param {number} now
 * @returns {OpDef[]}
 */
export function runningTileOps(item, now) {
  const state = tileState(item, now);
  const wait_ops = (item.wait_reasons || [])
    .filter(
      (/** @type {any} */ reason) =>
        !(state.held && reason.kind === 'external_job')
    )
    .flatMap(
      (/** @type {any} */ reason) =>
        waitLines(reason, { now, include_probe: true }).ops
    );
  return tileOps(item, {
    session: state.session,
    failed: state.failed,
    held: state.held,
    paused: state.paused,
    session_current: state.session_current,
    wait_ops,
    external_ops: state.external.ops
  });
}

/**
 * One running-lane tile.
 *
 * @param {any} item
 * @param {TileContext} ctx
 * @returns {TemplateResult}
 */
export function runningTile(item, ctx) {
  const now = ctx.now;
  const session = item.kind === 'session';
  const failed = item.run_state === 'failed';
  const parked = item.run_state === 'parked';
  const retry_wait = item.run_state === 'retry_wait';
  const waiting = item.run_state === 'waiting';
  const provider_hold = item.run_state === 'provider_hold';
  const paused = item.run_state === 'paused';
  const wait_reasons = item.wait_reasons || [];
  const external = externalWaitParts(item, now);
  const external_wait =
    !!external.badge &&
    !failed &&
    !parked &&
    !retry_wait &&
    !waiting &&
    !provider_hold;
  const held = parked
    ? 'parked'
    : retry_wait
      ? 'retry_wait'
      : waiting
        ? 'waiting'
        : provider_hold
          ? 'provider_hold'
          : external_wait
            ? 'external'
            : null;
  const session_current = session
    ? (item.session_refs || []).find(
        (/** @type {any} */ view) => view && view.current === true
      ) || null
    : null;
  const representative = representativeWaitReason(wait_reasons);
  const body_lines = external.badge
    ? external
    : representative
      ? waitLines(/** @type {any} */ (representative), {
          now,
          interactive_sessions: item.interactive_sessions
        })
      : { badge: '', body: '', ops: [], times: '' };
  const status_label = statusLabelOf(item);
  const started = typeof item.started_at === 'number' ? item.started_at : null;
  const elapsed =
    failed || held
      ? held
        ? ''
        : status_label || (item.status === 'orphaned' ? '중단됨' : '실패')
      : paused
        ? '일시정지'
        : html`${status_label ? `${status_label} · ` : ''}${started !== null
            ? timeSpan(started, 'elapsed', { now })
            : '—'}`;
  const failure = failed ? item.failure || null : null;
  const lineage = formatContinuationLineage(item);
  const legs = Array.isArray(item.legs) ? item.legs : [];
  const usage_scope = {
    has_native_usage: legs.some(
      (/** @type {any} */ leg) => leg?.native === true && leg.usage
    ),
    has_included_native_usage: legs.some(
      (/** @type {any} */ leg) =>
        leg?.native === true && leg.usage && leg.usage_included === true
    )
  };
  const receipt = session ? item.workflow?.chips?.exec_receipt || null : null;
  const popover = item.chip_popover
    ? popoverBody(item.chip_popover.content)
    : '';
  const coord_parts = [
    session ? '' : laneOriginChip(item.lane_origin),
    routeChip(item.workflow),
    sourceChips(item),
    labelChips(item.labels)
  ];
  const run_parts = [
    session_current
      ? html`<button
          type="button"
          class="pl-chip pl-chip--link"
          data-op="copy-text"
          data-copy=${session_current.session_id}
          title=${`${session_current.provider}:${session_current.session_id}@${session_current.host} · 클릭하면 세션 ID 복사`}
        >
          ${sessionRefLabel(session_current)}
        </button>`
      : '',
    receipt
      ? html`<span
          class="pl-chip"
          title=${`exec_receipt ${receipt.kind}:${receiptActor(receipt)}@${receipt.sha}`}
          >${receipt.kind}:${receiptActor(receipt)}</span
        >`
      : '',
    session ? '' : execChips(item.exec_chips),
    judgementChips(item, ctx.chips),
    usageFacts(item.usage, {
      scope: usage_scope,
      direct_session: session && !item.attempt_id
    })
  ];
  const ops = runningTileOps(item, now);
  const selected =
    !!item.attempt_id && item.attempt_id === ctx.selected_attempt;
  return html`<article
    class="pl-tile${selected ? ' is-selected' : ''}${paused
      ? ' is-paused'
      : ''}${failed ? ' is-failed' : ''}${held
      ? ` is-held is-${held}`
      : ''}${session ? ' is-session' : ''}${item.search_match === false ||
    item.filter_match === false
      ? ' is-dimmed'
      : ''}"
    data-bead-id=${item.id}
    data-root-dir=${item.root_dir}
    data-attempt-id=${ifDefined(item.attempt_id || undefined)}
    data-lane="running"
  >
    <div class="pl-line1">
      <span
        class="pl-dot${failed
          ? ' is-failed'
          : held || paused
            ? ' is-held'
            : ' is-live'}"
        aria-hidden="true"
      ></span>
      ${ctx.show_repo ? repoBadge(item.workspace_name, item.root_dir) : ''}
      ${idChip(item.id)}${priorityBadge(item.priority)}${lineage
        ? html`<span class="pl-badge pl-badge--quiet" title=${lineage}>↻</span>`
        : ''}${session && !external_wait
        ? html`<span
            class="pl-badge pl-badge--quiet"
            title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
            >직접 세션</span
          >`
        : ''}${item.conflict_resolution
        ? html`<span class="pl-badge"
            >${paused ? '충돌 해소 일시정지' : '충돌 해소'}</span
          >`
        : ''}${item.base_exception
        ? html`<span
            class="pl-badge"
            title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
            >${item.base_exception}</span
          >`
        : ''}${failure
        ? html`<button
              type="button"
              class="pl-badge pl-badge--alert"
              data-op="failure-detail"
              data-attempt-id=${failure.attempt_id}
              aria-expanded=${ctx.open_failure === failure.attempt_id
                ? 'true'
                : 'false'}
              aria-label="실패 상세"
            >
              ⛔ ${failureCategory(failure.cause) || '실패'}
            </button>
            ${failure.halted_auto_advance
              ? html`<span class="pl-badge pl-badge--quiet"
                  >자동 진행 꺼짐</span
                >`
              : ''}`
        : ''}${external.badge ||
      waitBadge({
        held_kind: held === 'external' ? null : held,
        held: waiting ? item.wait || null : null,
        hold: provider_hold ? item.hold || null : null,
        wait_reasons,
        interactive_sessions: item.interactive_sessions,
        now,
        ...(retry_wait ? { label: retryLabel(item.retry) } : {})
      })}${interactiveBadges(item.interactive_sessions, {
        bead_id: item.id,
        root_dir: item.root_dir,
        now
      })}
      ${elapsed ? html`<span class="pl-elapsed">${elapsed}</span>` : ''}
    </div>
    ${failure && ctx.open_failure === failure.attempt_id
      ? failurePopover(failure, item, now)
      : ''}
    <div class="pl-title">${item.title}</div>
    ${body_lines.body}${parked || waiting
      ? inquiryLine(item.interactive_sessions, now)
      : ''}${!held && !failed ? activityBody(item, now, session_current) : ''}
    ${waiting && item.wait?.summary && wait_reasons.length === 0
      ? html`<p class="pl-note">${item.wait.summary}</p>`
      : ''}${parked &&
    item.failure?.summary &&
    representative?.kind !== 'awaiting_user'
      ? html`<p class="pl-note">${item.failure.summary}</p>`
      : ''}
    ${item.landing
      ? html`<div class="pl-landing">${mergeStepGauge(item.landing)}</div>`
      : ''}
    ${depLines(item.dependency_chips, { root_dir: item.root_dir })}
    ${coord_parts.some((part) => part !== '')
      ? html`<div class="pl-chips">${coord_parts}</div>`
      : ''}
    ${run_parts.some((part) => part !== '') || popover
      ? html`<div class="pl-facts">${run_parts}${popover}</div>`
      : ''}
    ${footTemplate(
      ops,
      { bead_id: item.id, root_dir: item.root_dir },
      discardReceipt(item)
    )}
    ${body_lines.times}${session ? '' : timesLine(item, now)}
  </article>`;
}
