/**
 * The issue detail's Worker 이력 section (UI-dbn6 §3.5): the session rows —
 * transcript, 이어하기, 재개 명령 복사, token-usage breakdown — over the union
 * of the queue's live attempts and the bead's durable timeline records, the
 * interactive sessions that claimed the issue (`get-session-refs`), the
 * inquiry/resolve session badges with their Discord link, and the timeline
 * events (`get-bead-timeline`). Moved out of the detail panel closure (UI-dbn6
 * Phase 2) with its behaviour unchanged; the badges are the pipeline card's
 * own (`interactiveBadges`), drawn from the same server projection.
 *
 * @import { DetailContext } from './index.js'
 * @import { SessionRefView } from '../../../server/worker/session-ref.js'
 */
import { html } from 'lit-html';
import { interactiveSessionViewOf } from '../../model/lane-model.js';
import { formatAttemptTuple } from '../../utils/attempt-display.js';
import { sessionRefDrawerInput } from '../../utils/session-ref.js';
import { sumAttemptUsage } from '../../utils/token-usage.js';
import { runResumeFlow } from '../dialogs/resume-flow.js';
import { interactiveBadges } from '../pipeline/wait.js';
import { sessionHistoryTemplate } from './session-history.js';
import {
  WORKER_TIMELINE_PAGE,
  workerTimelineTemplate
} from './worker-timeline.js';

/**
 * @param {DetailContext} ctx
 */
export function createHistorySection(ctx) {
  // 세션 이력의 `session_ref` 행 (UI-4xzk §6.5). 키가 없는 이슈는 요청 자체가
  // 없고, 실패·빈 응답은 행 없음이다.
  /** @type {SessionRefView[]} */
  let session_refs = [];
  /** @type {string|null} */
  let session_refs_loaded_for = null;
  // Guards a late reply from an issue (or workspace) the reader has already left.
  let session_refs_request_seq = 0;

  // Worker 이력 섹션 (record-timeline-retention §9). 세션 로그와 달리 이 이력은
  // `queue.json`이 아니라 bead의 영구 타임라인에 있으므로 여기서 물어야 한다.
  /** @type {import('./worker-timeline.js').WorkerTimelineEvent[]} */
  let worker_timeline = [];
  /**
   * The §7 attempt union of this bead. `queue.json`에서 이관된 레코드는
   * 클라이언트 queue에 없으므로, 세션 이력과 총 사용량은 큐 ∪ 이 목록으로
   * 판정한다.
   *
   * @type {any[]}
   */
  let worker_attempts = [];
  let worker_timeline_shown = WORKER_TIMELINE_PAGE;
  /** @type {string|null} */
  let worker_timeline_loaded_for = null;
  let worker_timeline_request_seq = 0;

  /**
   * Which session rows have their token breakdown expanded ([τ 자세히],
   * UI-d7pw §2.2). Component-local and deliberately NOT persisted.
   *
   * @type {Set<string>}
   */
  const usage_expanded = new Set();

  function resetSessionRefs() {
    session_refs = [];
    session_refs_loaded_for = null;
    session_refs_request_seq += 1;
  }

  function resetWorkerTimeline() {
    worker_timeline = [];
    worker_attempts = [];
    worker_timeline_shown = WORKER_TIMELINE_PAGE;
    worker_timeline_loaded_for = null;
    worker_timeline_request_seq += 1;
  }

  /**
   * @param {string} id
   * @param {string} key
   */
  async function fetchSessionRefs(id, key) {
    const transport = ctx.transport;
    if (!transport) {
      return;
    }
    const seq = ++session_refs_request_seq;
    /** @type {any} */
    let res;
    try {
      res = await Promise.resolve(
        transport('get-session-refs', { bead_id: id })
      );
    } catch {
      res = null;
    }
    if (seq !== session_refs_request_seq || key !== session_refs_loaded_for) {
      return;
    }
    session_refs = res && Array.isArray(res.sessions) ? res.sessions : [];
    ctx.render();
  }

  /**
   * Request the bead's sessions once per (workspace, bead, contract value). A
   * bead without the key never reaches the server at all; the raw value is in
   * the key because a session that just claimed the issue appends to it.
   */
  function syncSessionRefs() {
    const id = ctx.id();
    if (!ctx.transport || !id) {
      return;
    }
    const current = ctx.data();
    const metadata = current && current.metadata;
    const raw =
      metadata &&
      typeof metadata === 'object' &&
      typeof metadata.session_ref === 'string'
        ? metadata.session_ref
        : null;
    if (raw === null) {
      resetSessionRefs();
      return;
    }
    const key = `${ctx.workspace()}::${id}::${raw}`;
    if (session_refs_loaded_for === key) {
      return;
    }
    // The previous key's rows describe another bead, workspace or session list;
    // they go before the new reply lands, not after.
    session_refs = [];
    session_refs_loaded_for = key;
    void fetchSessionRefs(id, key);
  }

  /**
   * @param {string} id
   * @param {string} key
   */
  async function fetchWorkerTimeline(id, key) {
    const transport = ctx.transport;
    if (!transport) {
      return;
    }
    const seq = ++worker_timeline_request_seq;
    /** @type {any} */
    let res;
    try {
      res = await Promise.resolve(
        transport('get-bead-timeline', { bead_id: id })
      );
    } catch {
      res = null;
    }
    if (
      seq !== worker_timeline_request_seq ||
      key !== worker_timeline_loaded_for
    ) {
      return;
    }
    // A failure and an empty history are the same answer here: no section.
    worker_timeline = res && Array.isArray(res.events) ? res.events : [];
    worker_attempts = res && Array.isArray(res.attempts) ? res.attempts : [];
    worker_timeline_shown = WORKER_TIMELINE_PAGE;
    ctx.render();
  }

  /**
   * Ask once per (workspace, bead): the section is the only place a finished
   * attempt's history is readable at all, so it is fetched on open rather
   * than behind a toggle.
   */
  function syncWorkerTimeline() {
    const id = ctx.id();
    if (!ctx.transport || !id) {
      return;
    }
    const key = `${ctx.workspace()}::${id}`;
    if (worker_timeline_loaded_for === key) {
      return;
    }
    worker_timeline = [];
    worker_attempts = [];
    worker_timeline_shown = WORKER_TIMELINE_PAGE;
    worker_timeline_loaded_for = key;
    void fetchWorkerTimeline(id, key);
  }

  /**
   * Every attempt record of this bead, `attempt_id` 기준 합집합 (§7). 같은 id가
   * 양쪽에 있으면 큐 쪽이 이긴다: 살아 있는 행이 더 최신이다.
   *
   * @returns {Record<string, any>}
   */
  function attemptRecords() {
    const id = ctx.id();
    /** @type {Record<string, any>} */
    const merged = {};
    for (const a of worker_attempts) {
      if (a && typeof a === 'object' && a.bead_id === id) {
        merged[String(a.attempt_id)] = a;
      }
    }
    const q = ctx.queue();
    for (const a of q && q.attempts ? Object.values(q.attempts) : []) {
      const attempt = /** @type {any} */ (a);
      if (attempt && attempt.bead_id === id) {
        merged[String(attempt.attempt_id)] = attempt;
      }
    }
    return merged;
  }

  /**
   * Attempts recorded for the current bead, newest first.
   *
   * @returns {import('./session-history.js').SessionAttempt[]}
   */
  function attemptsForBead() {
    if (!ctx.id()) {
      return [];
    }
    const attempts = Object.values(attemptRecords());
    return /** @type {any[]} */ (attempts)
      .sort((a, b) => (b.started_at || 0) - (a.started_at || 0))
      .map((a) => ({
        attempt_id: a.attempt_id,
        bead_id: a.bead_id,
        status: a.status,
        started_at: typeof a.started_at === 'number' ? a.started_at : null,
        runner: a.runner || null,
        model: a.model || null,
        effort: a.effort || a.observed_effort || null,
        speed: a.speed || null,
        session_id: a.session_id || null,
        resumed_from: a.resumed_from || null,
        continuation_mode: a.continuation_mode || null,
        dismissed_at:
          typeof a.dismissed_at === 'number' ? a.dismissed_at : null,
        cause: typeof a.cause === 'string' ? a.cause : null,
        cause_detail: a.cause_detail || null,
        exec_default_preset_id:
          typeof a.exec_default_preset_id === 'string'
            ? a.exec_default_preset_id
            : null,
        exec_default_preset_revision:
          typeof a.exec_default_preset_revision === 'number'
            ? a.exec_default_preset_revision
            : null,
        exec_values:
          a.exec_values && typeof a.exec_values === 'object'
            ? a.exec_values
            : null,
        usage: a.usage || null,
        usage_legs: Array.isArray(a.usage_legs) ? a.usage_legs : [],
        delegation_sessions: Array.isArray(a.delegation_sessions)
          ? a.delegation_sessions
          : [],
        // The server's own native-child observation (UI-mn5u §6.3).
        codex_children: Array.isArray(a.codex_children) ? a.codex_children : []
      }));
  }

  /**
   * The issue's total token usage across every attempt (UI-d7pw §2.2) — the
   * SAME projection the lanes use, so the two surfaces agree on one bead.
   *
   * @returns {import('../../utils/token-usage.js').UsageProjection|null}
   */
  function totalUsage() {
    const id = ctx.id();
    if (!id) {
      return null;
    }
    return sumAttemptUsage(attemptRecords(), id, ctx.runnerCatalog());
  }

  /**
   * @param {string} attempt_id
   */
  function toggleUsageDetail(attempt_id) {
    if (usage_expanded.has(attempt_id)) {
      usage_expanded.delete(attempt_id);
    } else {
      usage_expanded.add(attempt_id);
    }
    ctx.render();
  }

  /**
   * @param {string} attempt_id
   */
  function openTranscript(attempt_id) {
    const q = ctx.queue();
    const a = q && q.attempts ? q.attempts[attempt_id] : null;
    ctx.transcript().open({
      attempt_id,
      meta: a
        ? {
            runner: a.runner || undefined,
            model: a.model || undefined,
            effort: a.effort || undefined,
            status: a.status || undefined,
            session_id: a.session_id || undefined
          }
        : {}
    });
  }

  /**
   * @param {string} attempt_id
   * @param {string} launch_id
   */
  function openDelegationTranscript(attempt_id, launch_id) {
    const q = ctx.queue();
    const attempt = q && q.attempts ? q.attempts[attempt_id] : null;
    /** @type {Array<Record<string, any>>} */
    const sessions =
      attempt && Array.isArray(attempt.delegation_sessions)
        ? attempt.delegation_sessions
        : [];
    const session = sessions.find(
      (candidate) =>
        candidate &&
        typeof candidate === 'object' &&
        candidate.launch_id === launch_id
    );
    if (!session) {
      return;
    }
    ctx.transcript().open({
      attempt_id,
      launch_id,
      meta: {
        // Two providers share this drawer (UI-2mpn §6.1); the row's own record
        // says which, and `agent_type` is the subagent's only name.
        runner: session.provider === 'claude' ? 'claude' : 'codex',
        role: session.role,
        ...(typeof session.agent_type === 'string'
          ? { agent_type: session.agent_type }
          : {}),
        model: session.model,
        effort: session.effort,
        session_id: session.session_id,
        status: session.status
      }
    });
  }

  /**
   * Manually resume a failed/orphaned attempt (spec §1). The flow — 지시
   * 다이얼로그, 충돌 1회 재시도, provider 경계, 거부 토스트 — 는
   * `runResumeFlow`가 소유하고(UI-6g3t §5.1), 이 화면은 대상 문맥과 재시도 없는
   * 전송 하나만 넘긴다. 전송마다 큐의 revision을 새로 읽으므로 충돌 응답의 큐를
   * `adopt`가 채택한 것이 곧 다음 전송의 `expected_revision`이다. 세션 이력 행의
   * 버튼은 착지 정산과 무관하므로 `kind`는 항상 `'session'`이다 (§5.4). 워커
   * 조작이라 연결 저장소를 `root_dir`로 싣는다 (UI-dbn6 §3.2).
   *
   * @param {string} attempt_id
   */
  async function resumeAttempt(attempt_id) {
    const send = ctx.transport;
    if (!send || !attempt_id) {
      return;
    }
    /** @returns {number} */
    const revision = () => {
      const q = ctx.queue();
      return q && typeof q.revision === 'number' ? q.revision : 0;
    };
    const attempt = ctx.queue()?.attempts?.[attempt_id] || null;
    const root_dir = ctx.workspace();
    await runResumeFlow({
      context: {
        bead_id: attempt?.bead_id || ctx.id() || '',
        kind: 'session',
        tuple: attempt ? formatAttemptTuple(attempt) : ''
      },
      transport: (payload) =>
        /** @type {any} */ (
          send('worker-attempt-resume', {
            attempt_id,
            expected_revision: revision(),
            ...(root_dir ? { root_dir } : {}),
            ...payload
          })
        ),
      adopt: (response) => {
        if (response?.queue) {
          ctx.adoptQueue(response.queue);
        }
      }
    });
  }

  /**
   * Open one interactive session's transcript (UI-4xzk §6.5). The workspace is
   * the connection's own — the detail only shows the issue of the connected
   * repo — so no `root_dir` rides along.
   *
   * @param {SessionRefView} view
   */
  function openSessionRef(view) {
    const id = ctx.id();
    if (!view || !id) {
      return;
    }
    const current = ctx.data();
    ctx
      .transcript()
      .open(sessionRefDrawerInput(view, id, current && current.status));
  }

  /**
   * The interactive sessions (inquiry, resolve, resume) of this issue, from
   * the same `interactive_sessions` projection the cards read.
   *
   * @returns {import('../../model/lane-model.js').InteractiveSessionView[]}
   */
  function interactiveViews() {
    const id = ctx.id();
    const q = ctx.queue();
    const records =
      q && q.interactive_sessions && typeof q.interactive_sessions === 'object'
        ? q.interactive_sessions
        : {};
    return Object.entries(records)
      .filter(([, record]) => record && record.bead_id === id)
      .map(([key, record]) => interactiveSessionViewOf(key, record));
  }

  /**
   * A session badge click opens that live session's log (the card's
   * `data-op="session-log"` contract).
   *
   * @param {Event} event
   */
  function onBadgeClick(event) {
    const target = /** @type {HTMLElement|null} */ (event.target);
    const badge = /** @type {HTMLElement|null} */ (
      target?.closest?.('[data-op="session-log"]') || null
    );
    if (!badge) {
      return;
    }
    const provider =
      badge.dataset.sessionProvider === 'codex' ? 'codex' : 'claude';
    const session_id = badge.dataset.sessionId || '';
    if (!session_id) {
      return;
    }
    ctx
      .transcript()
      .openSessionLog(
        provider,
        session_id,
        badge.dataset.beadId || ctx.id() || '',
        badge.dataset.rootDir || ctx.workspace()
      );
  }

  const session_handlers = {
    onOpen: openTranscript,
    onOpenDelegation: openDelegationTranscript,
    onResume: resumeAttempt,
    onToggleUsage: toggleUsageDetail,
    onOpenSessionRef: openSessionRef,
    onCopyResumeCommand: (/** @type {string} */ text) => ctx.copyText(text)
  };

  return {
    reset() {
      resetSessionRefs();
      resetWorkerTimeline();
    },
    sync() {
      syncSessionRefs();
      syncWorkerTimeline();
    },
    totalUsage,
    /** @returns {any[]} */
    workerAttempts: () => worker_attempts,
    /**
     * @param {import('../../utils/token-usage.js').UsageProjection|null} total
     */
    template(total) {
      const views = interactiveViews();
      return html`${views.length > 0
        ? html`<div class="dt-sessions" @click=${onBadgeClick}>
            ${interactiveBadges(views, {
              bead_id: ctx.id() || '',
              root_dir: ctx.workspace(),
              now: Date.now()
            })}
          </div>`
        : ''}
      ${sessionHistoryTemplate(
        attemptsForBead(),
        session_handlers,
        {
          total,
          expanded: usage_expanded,
          catalog: ctx.runnerCatalog()
        },
        session_refs
      )}
      ${workerTimelineTemplate(
        { events: worker_timeline, shown: worker_timeline_shown },
        {
          onMore: () => {
            worker_timeline_shown += WORKER_TIMELINE_PAGE;
            ctx.render();
          }
        }
      )}`;
    }
  };
}
