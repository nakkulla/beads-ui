/**
 * Wait-verdict and interactive-session fragments of the pipeline cards
 * (UI-dbn6 §3.4). Vocabulary, representative-reason and verdict rules stay in
 * `model/wait-vocabulary.js` (UI-a5l2 §3.1); these fragments only draw them,
 * with every elapsed/relative time as a ticker `[data-ts]` span and every
 * action as an `OpDef` so the card foot decides where it stands.
 *
 * Ported from the retired `views/worker/lanes.js` (`waitStatusBadge`,
 * `waitReasonLines`, `interactiveSessionBadgesTemplate`); the server
 * projection stays the only judge of what exists (ADR UI-nuwy, UI-r6xq).
 */
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import {
  autoResumeText,
  autoSwitchText,
  providerClock
} from '../../model/gate-labels.js';
import {
  formatClockLocal,
  formatRelativeTime,
  formatTimestampLocal
} from '../../model/relative-time.js';
import {
  WAIT_KINDS,
  representativeWaitReason,
  waitKindRow,
  waitScopeOf
} from '../../model/wait-vocabulary.js';
import { popoverBody, timeSpan } from './chips.js';

/**
 * @import { OpDef } from './chips.js'
 * @import { WaitReason, ExternalWaitObservation } from '../../protocol.js'
 * @import { InteractiveSessionView } from '../../model/lane-model.js'
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * The live inquiry session of a card (UI-ri8n §3.3), or null.
 *
 * @param {InteractiveSessionView[]|undefined} views
 * @returns {InteractiveSessionView|null}
 */
export function liveInquiryView(views) {
  return (
    (views || []).find(
      (view) =>
        view.kind === 'inquiry' && view.state === 'live' && !view.closing
    ) || null
  );
}

/**
 * The turn-state tail of an interactive badge (UI-ri8n §3.3, UI-nuwy §3.8):
 * a word plus an optional ticking elapsed span.
 *
 * @param {InteractiveSessionView} view
 * @param {number} now
 * @returns {{ word: string, since: number|null }}
 */
function turnTail(view, now) {
  const since =
    typeof view.turn_state_since === 'number' ? view.turn_state_since : null;
  const conversation = view.conversation;
  if (conversation) {
    if (conversation.result?.kind === 'takeover') {
      return { word: '사람 인수', since: null };
    }
    if (view.turn_state === 'running') {
      return { word: '대화 중', since };
    }
    return view.turn_state === 'question' ||
      view.turn_state === 'limit' ||
      (view.turn_state === 'idle' &&
        typeof conversation.processed_message_at === 'number')
      ? { word: '답 대기', since: null }
      : { word: '', since: null };
  }
  void now;
  switch (view.turn_state) {
    case 'running':
      return { word: '작업 중', since };
    case 'question':
      return { word: '질문 대기', since: null };
    case 'limit':
      return { word: '한도 대기', since: null };
    case 'idle':
      return { word: '턴 종료', since };
    default:
      return { word: '', since: null };
  }
}

/**
 * Interactive-session badges (slot 1). Click opens that session's transcript.
 *
 * @param {InteractiveSessionView[]|undefined} views
 * @param {{ bead_id: string, root_dir: string, now: number }} options
 * @returns {TemplateResult|''}
 */
export function interactiveBadges(views, options) {
  const list = views || [];
  if (list.length === 0) {
    return '';
  }
  return html`${list.map((view) => {
    const tail = turnTail(view, options.now);
    const mode =
      view.mode === 'fork'
        ? 'fork'
        : view.source === 'recovered'
          ? '복구'
          : view.mode === 'resume'
            ? '같은 세션'
            : '새 세션';
    const resumed = view.kind === 'external_resume';
    const origin =
      mode === 'fork'
        ? view.source === 'attempt'
          ? `fork · attempt ${(view.attempt_id || '').slice(0, 8)}`
          : 'fork · session_ref'
        : mode === '같은 세션'
          ? `같은 세션 · attempt ${(view.attempt_id || '').slice(0, 8)}`
          : mode === '복구'
            ? '복구'
            : `새 세션 · ${view.fallback_reason || ''}`;
    const title = resumed
      ? `resume · ${view.source === 'recovered' ? '복구' : 'session_ref'} · ${view.tmux_session}:${view.tmux_window}`
      : `${origin} · ${view.tmux_session}:${view.tmux_window}`;
    const head = resumed
      ? `▤ 재개 세션${view.source === 'recovered' ? ' · 복구' : ''}`
      : `▤ ${view.kind === 'resolve' ? '해결' : '문의'} 세션 · ${mode}`;
    const body = html`${head}${tail.word
      ? html` ·
        ${tail.word}${tail.since !== null
          ? html` ${timeSpan(tail.since, 'dur', { now: options.now })}`
          : ''}`
      : ''}`;
    return html`${view.session_id
      ? html`<button
          type="button"
          class="pl-badge pl-badge--session"
          data-op="session-log"
          data-session-provider=${view.provider}
          data-session-id=${view.session_id}
          data-bead-id=${options.bead_id}
          data-root-dir=${options.root_dir}
          title=${title}
        >
          ${body}
        </button>`
      : html`<span class="pl-badge pl-badge--session" title=${title}
          >${body}</span
        >`}${view.discord_url
      ? html`<a
          class="pl-link"
          href=${view.discord_url}
          target="_blank"
          rel="noopener"
          >↗ Discord</a
        >`
      : ''}`;
  })}${list.some((view) => view.closing)
    ? html`<span class="pl-badge pl-badge--quiet">세션 닫는 중</span>`
    : ''}`;
}

/**
 * The inquiry progress line (slot 3): `▤ <last message>` with its age.
 *
 * @param {InteractiveSessionView[]|undefined} views
 * @param {number} now
 * @returns {TemplateResult|''}
 */
export function inquiryLine(views, now) {
  const message = liveInquiryView(views)?.last_message;
  if (!message || !message.text) {
    return '';
  }
  return html`<div class="pl-activity">
    <span class="pl-activity__text">▤ ${message.text}</span>
    ${typeof message.at === 'number'
      ? timeSpan(message.at, 'rel', { now, cls: 'pl-ts pl-activity__age' })
      : ''}
  </div>`;
}

/**
 * The held projection of a running tile → its vocabulary row id.
 *
 * @param {{ held_kind?: string|null, held?: any }} material
 * @returns {string|null}
 */
function heldRowId(material) {
  const kind = material.held_kind || null;
  if (kind === 'parked') {
    return 'awaiting_user';
  }
  if (kind === 'retry_wait') {
    return 'retry_wait';
  }
  if (kind === 'provider_hold') {
    return 'provider_hold';
  }
  if (kind !== 'waiting') {
    return null;
  }
  return material.held?.recovery ? 'recovery' : 'prerequisite';
}

/**
 * The badge text with the overdue minutes ticking.
 *
 * @param {any} row
 * @param {WaitReason|null} reason
 * @param {string} label
 * @param {number} now
 * @returns {TemplateResult|string}
 */
function verdictText(row, reason, label, now) {
  const verdict = reason ? reason.verdict : null;
  if (verdict === 'action_required') {
    return `⛔ ${label} · 조치 필요`;
  }
  if (verdict === 'overdue') {
    return html`⚠ ${label} ·
    지연${typeof reason?.since === 'number'
      ? html` ${timeSpan(reason.since, 'min', { now })}`
      : ''}`;
  }
  return [row.glyph, label].filter(Boolean).join(' ');
}

/**
 * One wait-verdict badge with its evidence popover (native `<details>`).
 *
 * @param {any} row
 * @param {WaitReason|null} reason
 * @param {WaitReason[]} others
 * @param {any} hold
 * @param {number} now
 * @param {{ label?: string, inquiry?: InteractiveSessionView|null }} [overrides]
 * @returns {TemplateResult|''}
 */
function badgeTemplate(row, reason, others, hold, now, overrides = {}) {
  const label = overrides.label || row.label;
  if (!label) {
    return '';
  }
  const other_lines = others
    .map((entry) => {
      const other_row = waitKindRow(entry);
      return other_row
        ? `${[other_row.glyph, other_row.label].filter(Boolean).join(' ')} — ${entry.headline}`
        : '';
    })
    .filter(Boolean);
  const provider_lines =
    row.kind === 'provider_hold' && hold
      ? [
          '작업 실패 아님',
          typeof hold.summary === 'string' ? hold.summary : '',
          typeof hold.message === 'string' ? hold.message : '',
          [
            hold.target?.model,
            hold.target?.account_alias || hold.target?.account
          ]
            .filter((value) => typeof value === 'string' && value.length > 0)
            .join(' · '),
          providerClock(hold.resets_at)
            ? `리셋 ${formatClockLocal(hold.resets_at, now)}`
            : '',
          providerClock(hold.next_probe_at)
            ? `다음 프로브 ${formatClockLocal(hold.next_probe_at, now)}`
            : '',
          autoResumeText(hold.auto_resume),
          autoSwitchText(hold.auto_switch),
          typeof hold.live_preempt_skipped_at === 'number'
            ? `전환 후보 없음 · ${formatRelativeTime(hold.live_preempt_skipped_at, now)}`
            : '',
          typeof hold.log_path === 'string' ? hold.log_path : ''
        ].filter(Boolean)
      : [];
  const inquiry = overrides.inquiry || null;
  const inquiry_line = inquiry
    ? `문의 세션 ${inquiry.tmux_session}:${inquiry.tmux_window}`
    : '';
  const lines = reason
    ? [
        reason.verdict === 'normal' ? '' : reason.verdict_reason?.message || '',
        inquiry_line,
        reason.release || row.release,
        reason.since ? `대기 시작 ${formatClockLocal(reason.since, now)}` : '',
        reason.next_check_at
          ? `다음 확인 ${formatClockLocal(reason.next_check_at, now)}`
          : '',
        reason.resets_at
          ? `리셋 ${formatClockLocal(reason.resets_at, now)}`
          : '',
        ...provider_lines,
        ...(other_lines.length > 0
          ? [`다른 사유 ${other_lines.length}`, ...other_lines]
          : [])
      ].filter(Boolean)
    : [row.release, ...provider_lines].filter(Boolean);
  return html`<details class="pl-verdict" @click=${stopClick}>
    <summary
      class="pl-badge pl-badge--wait"
      data-verdict=${ifDefined(reason ? reason.verdict : undefined)}
      title=${row.when}
    >
      ${verdictText(row, reason, label, now)}
    </summary>
    ${popoverBody({
      title: reason ? '대기 판정 근거' : '대기 종류',
      lines: /** @type {string[]} */ (lines)
    })}
  </details>`;
}

/**
 * Keep a click inside the verdict popover from opening the card.
 *
 * @param {Event} event
 */
function stopClick(event) {
  event.stopPropagation();
}

/**
 * The ONE slot-1 wait badge of a card (UI-8gem §6.2).
 *
 * @param {{ held_kind?: string|null, held?: any, hold?: any, wait_reasons?: WaitReason[], reason?: WaitReason|null, label?: string, interactive_sessions?: InteractiveSessionView[], now: number }} material
 * @returns {TemplateResult|''}
 */
export function waitBadge(material) {
  const now = material.now;
  const reasons = (material.wait_reasons || []).filter(
    (reason) => waitScopeOf(reason.kind) === 'bead'
  );
  if (material.reason) {
    const forced = waitKindRow(material.reason);
    return forced ? badgeTemplate(forced, material.reason, [], null, now) : '';
  }
  const held_id = heldRowId(material);
  const held_row = held_id ? waitKindRow({ kind: held_id }) : null;
  /** @type {WaitReason|null} */
  let reason = null;
  let badge_row = held_row;
  if (held_row) {
    reason = /** @type {WaitReason|null} */ (
      representativeWaitReason(
        reasons.filter((entry) => waitKindRow(entry) === held_row)
      )
    );
  } else {
    reason = /** @type {WaitReason|null} */ (representativeWaitReason(reasons));
    badge_row = waitKindRow(reason);
  }
  if (!badge_row) {
    return '';
  }
  return badgeTemplate(
    badge_row,
    reason,
    reasons.filter((entry) => entry !== reason),
    material.hold || null,
    now,
    {
      label: material.label || badge_row.label,
      inquiry: liveInquiryView(material.interactive_sessions)
    }
  );
}

/**
 * The external-work badge wording (UI-7341, UI-r6xq).
 *
 * @param {WaitReason} reason
 * @param {ExternalWaitObservation|undefined} record
 * @returns {string}
 */
function externalBadgeText(reason, record) {
  if (reason.verdict === 'action_required') {
    return `⛔ 조치 필요 · ${reason.verdict_reason?.message || '상태 확인 필요'}`;
  }
  if (reason.verdict === 'overdue') {
    return `⚠ 지연 · ${reason.verdict_reason?.message || '관찰 지연'}`;
  }
  if (record?.stage === 'completing') {
    return record.owner_kind === 'session'
      ? '✅ 완료 · 이어하기 대기'
      : '↻ 재개 중';
  }
  return '⏳ 외부 작업';
}

/**
 * @param {ExternalWaitObservation} record
 * @param {number} now
 * @returns {string}
 */
function externalTimes(record, now) {
  if (record.completion) {
    return `완료 ${formatClockLocal(Date.parse(record.completion.completed_at), now)}`;
  }
  const submitted = record.jobs
    .map((job) => Date.parse(job.submitted_at))
    .filter(Number.isFinite);
  const observed = record.jobs
    .map((job) => Date.parse(job.observed_at || ''))
    .filter(Number.isFinite);
  const next = formatClockLocal(Date.parse(record.next_observation_at), now);
  return [
    submitted.length
      ? `제출 ${formatClockLocal(Math.min(...submitted), now)}`
      : '',
    observed.length
      ? `마지막 확인 ${formatClockLocal(Math.max(...observed), now)}`
      : '',
    next ? `다음 ${next}` : ''
  ]
    .filter(Boolean)
    .join(' · ');
}

/**
 * The action OpDefs of one reason. `placement: 'detail'` actions never stand
 * on a card (UI-r6xq §4.1); a `confirm` action is destructive and lives in the
 * `⋯` sheet, confirmed before it is sent.
 *
 * @param {WaitReason} reason
 * @param {{ session_preferred?: boolean, include_probe?: boolean }} options
 * @returns {OpDef[]}
 */
function reasonOps(reason, options) {
  /** @type {OpDef[]} */
  const ops = [];
  for (const action of reason.actions || []) {
    if (action.placement === 'detail') {
      continue;
    }
    const payload = /** @type {Record<string, any>} */ (action.payload || {});
    if (
      [
        'external_wait_check',
        'external_wait_stop',
        'external_wait_resume'
      ].includes(action.op) &&
      payload.wait_id &&
      payload.root_dir
    ) {
      const primary =
        action.op === 'external_wait_resume' &&
        (options.session_preferred === true
          ? payload.mode === 'session'
          : payload.mode === 'fork');
      ops.push({
        op: 'external-wait',
        label: String(action.label || '').replace(/^\[|\]$/g, ''),
        title: action.title || undefined,
        tone: primary ? 'primary' : 'plain',
        destructive: Boolean(action.confirm),
        data: {
          external_wait_op: action.op,
          wait_id: payload.wait_id,
          root_dir: payload.root_dir,
          mode: payload.mode,
          bead_id: payload.bead_id,
          confirm: action.confirm || undefined
        }
      });
      continue;
    }
    if (action.op === 'probe_now' && options.include_probe === true) {
      ops.push({
        op: 'probe',
        label: '↻ 지금 프로브',
        title:
          '공급자 회복 프로브를 지금 실행합니다 (러너 전체) — 통과하면 보류가 풀립니다',
        data: {
          runner: payload.runner,
          since: reason.since ?? undefined,
          root_dir: payload.root_dir
        }
      });
    }
  }
  return ops;
}

/**
 * The slot-7 time line of one wait reason.
 *
 * @param {WaitReason} reason
 * @param {{ record?: ExternalWaitObservation, inquiry?: InteractiveSessionView|null, now: number }} options
 * @returns {TemplateResult|''}
 */
function reasonTimes(reason, options) {
  const now = options.now;
  if (reason.kind === 'external_job' && options.record) {
    const text = externalTimes(options.record, now);
    return text ? html`<div class="pl-times">${text}</div>` : '';
  }
  if (options.inquiry && typeof options.inquiry.launched_at === 'number') {
    return html`<div class="pl-times">
      ${timeSpan(options.inquiry.launched_at, 'since', {
        pre: '문의 세션 ',
        now
      })}
    </div>`;
  }
  const row = waitKindRow(reason);
  if (!row) {
    return '';
  }
  const elapsed =
    row.elapsed_word && typeof reason.since === 'number'
      ? timeSpan(reason.since, 'since', { post: ` ${row.elapsed_word}`, now })
      : '';
  const reset = formatClockLocal(reason.resets_at, now);
  const next = row.next_word ? formatClockLocal(reason.next_check_at, now) : '';
  const tail = reset ? `리셋 ${reset}` : next ? `${row.next_word} ${next}` : '';
  if (elapsed === '' && !tail) {
    return '';
  }
  return html`<div
    class="pl-times"
    title=${reason.since
      ? `대기 시작 ${formatTimestampLocal(reason.since)}`
      : ''}
  >
    ${elapsed}${elapsed !== '' && tail ? ' · ' : ''}${tail}
  </div>`;
}

/**
 * One reason split into the card slots: badge (slot 1), body (slot 3), ops
 * (slot 6 foot) and times (slot 7).
 *
 * @param {WaitReason|null|undefined} reason
 * @param {{ external_wait?: ExternalWaitObservation, interactive_sessions?: InteractiveSessionView[], session_preferred?: boolean, include_probe?: boolean, now: number }} options
 * @returns {{ badge: TemplateResult|'', body: TemplateResult|'', ops: OpDef[], times: TemplateResult|'' }}
 */
export function waitLines(reason, options) {
  if (!reason) {
    return { badge: '', body: '', ops: [], times: '' };
  }
  const now = options.now;
  const external = reason.kind === 'external_job';
  const record = options.external_wait;
  const row = waitKindRow(reason);
  const label = external
    ? externalBadgeText(reason, record)
    : row
      ? row.label
      : '';
  const countdown =
    reason.kind === 'provider_hold' &&
    reason.verdict === 'normal' &&
    typeof reason.resets_at === 'number'
      ? timeSpan(reason.resets_at, 'until-min', { pre: ' · 리셋까지 ', now })
      : '';
  const evidence = [
    reason.verdict_reason?.message,
    reason.since ? `대기 시작 ${formatClockLocal(reason.since, now)}` : '',
    reason.next_check_at
      ? `다음 확인 ${formatClockLocal(reason.next_check_at, now)}`
      : '',
    reason.resets_at ? `리셋 ${formatClockLocal(reason.resets_at, now)}` : ''
  ].filter(Boolean);
  const inquiry = liveInquiryView(options.interactive_sessions);
  const single_job = external && record && record.jobs.length === 1;
  const job_started = single_job
    ? Date.parse(record.jobs[0].submitted_at)
    : NaN;
  const job_done = single_job && record.completion?.completed_at;
  const elapsed_word = WAIT_KINDS.find(
    (entry) => entry.kind === 'external_job'
  )?.elapsed_word;
  const headline = reason.headline
    ? single_job && Number.isFinite(job_started) && elapsed_word
      ? html`${reason.headline.replace(/ · 경과 .*$/, '')} · ${elapsed_word}
        ${job_done
          ? externalDoneElapsed(job_started, Date.parse(job_done))
          : timeSpan(job_started, 'hm', { now })}`
      : reason.headline
    : '';
  return {
    badge: !label
      ? ''
      : evidence.length === 0
        ? html`<span
            class="pl-badge pl-badge--wait"
            data-verdict=${reason.verdict}
            >${external || !row
              ? label
              : verdictText(row, reason, label, now)}${countdown}</span
          >`
        : html`<details class="pl-verdict" @click=${stopClick}>
            <summary
              class="pl-badge pl-badge--wait"
              data-verdict=${reason.verdict}
            >
              ${external || !row
                ? label
                : verdictText(row, reason, label, now)}${countdown}
            </summary>
            ${popoverBody({
              title: '대기 판정 근거',
              lines: /** @type {string[]} */ (evidence)
            })}
          </details>`,
    body:
      headline || (external && (reason.release || reason.error))
        ? html`<div class="pl-wait">
            ${headline
              ? html`<div class="pl-wait__head">${headline}</div>`
              : ''}
            ${external && reason.release
              ? html`<div class="pl-wait__sub">${reason.release}</div>`
              : ''}
            ${external && reason.error
              ? html`<div class="pl-wait__error">${reason.error}</div>`
              : ''}
          </div>`
        : '',
    ops: reasonOps(reason, options),
    times: reasonTimes(reason, { record, inquiry, now })
  };
}

/**
 * A finished job's fixed `1h02m` span.
 *
 * @param {number} start
 * @param {number} end
 * @returns {string}
 */
function externalDoneElapsed(start, end) {
  const minutes = Number.isFinite(end)
    ? Math.max(0, Math.floor((end - start) / 60_000))
    : 0;
  return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}m`;
}

/**
 * The external-work parts of a consumer card (candidates, queue rows, tiles).
 *
 * @param {{ external_wait?: ExternalWaitObservation, wait_reasons?: WaitReason[], labels?: string[], session_preferred?: boolean }} item
 * @param {number} now
 */
export function externalWaitParts(item, now) {
  const reason = (item.wait_reasons || []).find(
    (entry) => entry.kind === 'external_job'
  );
  return waitLines(reason, {
    now,
    external_wait: item.external_wait,
    session_preferred:
      item.session_preferred === true ||
      (Array.isArray(item.labels) && item.labels.includes('session-preferred'))
  });
}
