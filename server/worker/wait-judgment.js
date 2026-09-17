import {
  isImplementationAttempt,
  latestImplementationAttempts
} from '../../app/utils/active-attempts.js';
import {
  RECOVERY_WAIT_LABELS,
  RECOVERY_WAIT_SENTENCES
} from '../../app/utils/failure-sentences.js';
import { isWorkerIneligible } from '../../app/utils/worker-eligibility.js';
import { USAGE_REARM_CAP } from './provider-health.js';

/** All display/notification thresholds live here (UI-n99w §5.2). */
export const WAIT_THRESHOLDS = Object.freeze({
  interval_ms: 15 * 60_000,
  check_cycles: 1,
  settle_cycles: 2,
  observation_errors: 3,
  grace_ms: 5 * 60_000,
  unknown_reset_ms: 6 * 60 * 60_000
});

/**
 * @typedef {'external_job'|'prerequisite'|'prerequisite_foreign'|'base_moved'|'provider_hold'|'queue_hold'|'awaiting_user'|'retry_wait'|'stale_work'|'recovery'} WaitKind
 * @typedef {'check_overdue'|'settle_overdue'|'job_failed'|'observe_failing'|'service_down'|'monitor_stopped'|'blocker_needs_human'|'reset_passed'|'probe_needed'|'probe_stalled'|'hold'|'retry_stalled'|'decision'|'disposition'|'recovery_confirm'} VerdictCode
 * @typedef {{ code: VerdictCode, message: string }} VerdictReason
 * @typedef {Object} WaitReason
 * @property {WaitKind} kind
 * @property {{ bead_id: string, root_dir: string }} subject
 * @property {string} headline
 * @property {string} release
 * @property {number} [since]
 * @property {number} [next_check_at]
 * @property {number} [resets_at]
 * @property {'normal'|'overdue'|'action_required'} verdict
 * @property {VerdictReason} [verdict_reason]
 * @property {Array<{ id: string, rig?: string, status?: string, kind: 'gate'|'issue' }>} targets
 * @property {Array<{ op: string, label: string, payload: Record<string, any> }>} actions
 * @property {{ on_complete: 'discord'|'none', on_overdue: 'discord'|'none' }} notify_plan
 * @typedef {{ settle_observed_at?: Record<string, number> }} ObservationTimes
 * @typedef {Object} WaitJudgmentInput
 * @property {string} root_dir
 * @property {Record<string, any>} queue
 * @property {Record<string, any>[]} [external_waits]
 * @property {Record<string, string[]>} [bead_blocked_by]
 * @property {Record<string, any>} [blocker_facts]
 * @property {Record<string, any>} [foreign_readback]
 * @property {Record<string, any>} [account_catalog]
 * @property {ObservationTimes} [observed_at]
 * @property {number} now
 */

/** @type {Record<VerdictCode, string>} */
const VERDICT_MESSAGES = {
  check_overdue: '다음 확인 시각에서 한 주기가 지나도 관측이 갱신되지 않음',
  settle_overdue: '종료 확인 후 두 주기가 지나도 대기가 해제되지 않음',
  job_failed: '작업이 실패로 끝나 복구 판단이 필요함',
  observe_failing: '자동 확인이 연속 3회 이상 실패함',
  service_down: '자동 확인 서비스가 등록되지 않았거나 설치된 명령과 다름',
  monitor_stopped: '외부 작업 감시가 중단됨',
  blocker_needs_human: '열린 선행에 사람의 조치가 필요함',
  reset_passed: '한도 리셋 후 5분이 지나도 보류가 유지됨',
  probe_needed: '자동 재개가 꺼져 지금 프로브가 필요함',
  probe_stalled: '다음 프로브 시각에서 5분이 지나도 갱신되지 않음',
  hold: '큐를 재개하려면 사람의 승인이 필요함',
  retry_stalled: '재시도 시각에서 5분이 지나도 큐가 정지됨',
  decision: '사용자의 답변이 필요함',
  disposition: '보존 작업을 이어갈지 새로 시작할지 선택이 필요함',
  recovery_confirm: '보존된 작업의 원인 확인 또는 이어하기·폐기 결정이 필요함'
};

/** @type {Readonly<Record<string, string>>} */
const RECOVERY_RELEASES = Object.freeze({
  provider: '조건 해제 후 ↻ 이어하기',
  credential: '인증 복구 확인 후 ↻ 이어하기',
  prerequisite: '선행 해제 후 ↻ 이어하기',
  authority: '승인·안전 판단 확인 후 ↻ 이어하기 또는 폐기',
  verification: '검증 원인 정정 후 ↻ 이어하기',
  no_progress: '무진전 원인 정정 후 ↻ 이어하기 또는 폐기',
  unclassified: '원인·실행 결과 확인 뒤 ↻ 이어하기 또는 폐기',
  reconcile: '원인·실행 결과 확인 뒤 ↻ 이어하기 또는 폐기'
});

/**
 * Inputs use epoch milliseconds or ISO strings; absent clocks stay absent.
 *
 * @param {unknown} value
 * @returns {number|undefined}
 */
function timestamp(value) {
  const parsed = typeof value === 'string' ? Date.parse(value) : value;
  return typeof parsed === 'number' && Number.isFinite(parsed)
    ? parsed
    : undefined;
}

/**
 * Format a supplied timestamp in the server's local timezone without reading now.
 *
 * @param {number} at
 * @returns {string}
 */
function localClock(at) {
  const date = new Date(at);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function line(value) {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

/**
 * @param {unknown} at
 * @param {number} delay
 * @param {number} now
 */
function elapsed(at, delay, now) {
  const time = timestamp(at);
  return time !== undefined && now >= time + delay;
}

/**
 * @param {WaitKind} kind
 * @param {string} bead_id
 * @param {string} root_dir
 * @param {string} headline
 * @param {string} release
 * @returns {WaitReason}
 */
function reason(kind, bead_id, root_dir, headline, release) {
  return {
    kind,
    subject: { bead_id, root_dir },
    headline,
    release,
    verdict: 'normal',
    targets: [],
    actions: [],
    notify_plan: { on_complete: 'none', on_overdue: 'discord' }
  };
}

/**
 * @param {WaitReason} result
 * @param {'overdue'|'action_required'} verdict
 * @param {VerdictCode} code
 */
function judge(result, verdict, code) {
  result.verdict = verdict;
  result.verdict_reason = { code, message: VERDICT_MESSAGES[code] };
}

/**
 * @param {WaitReason} result
 * @param {{ since?: unknown, next_check_at?: unknown, resets_at?: unknown }} clocks
 */
function addClocks(result, clocks) {
  for (const field of /** @type {const} */ ([
    'since',
    'next_check_at',
    'resets_at'
  ])) {
    const at = timestamp(clocks[field]);
    if (at !== undefined) {
      result[field] = at;
    }
  }
}

/**
 * Compose the single external-job sentence from observed fields (UI-8gem
 * §7.3·§10.1). `monitor_reason` wins over `monitor_state`, and the idle
 * `자동 확인 중` state says nothing the row does not already say.
 *
 * @param {Record<string, any>|null|undefined} row
 * @returns {string}
 */
export function externalJobHeadline(row) {
  const job = [line(row?.ssh_host), row?.job_id ? `작업 ${row.job_id}` : '']
    .filter(Boolean)
    .join(' ');
  const monitor_reason = line(row?.monitor_reason);
  const monitor_state = line(row?.monitor_state);
  const tail =
    monitor_reason ||
    (monitor_state && monitor_state !== '자동 확인 중' ? monitor_state : '');
  return [job, line(row?.job_state), tail].filter(Boolean).join(' · ');
}

/**
 * Pure workspace wait projection. No queue mutation, I/O or wall-clock reads.
 *
 * @param {WaitJudgmentInput} input
 * @returns {{ wait_reasons: WaitReason[], observed_at: ObservationTimes }}
 */
export function judgeWaitReasons(input) {
  const { root_dir, queue, now } = input;
  /** @type {WaitReason[]} */
  const wait_reasons = [];
  /** @type {Record<string, number>} */
  const settle_observed_at = {};
  const prior = input.observed_at || {};
  const blocked_by = input.bead_blocked_by || {};
  const facts = input.blocker_facts || {};
  const foreign = input.foreign_readback || {};
  const attempts = latestImplementationAttempts(queue.attempts || {});
  const admission = queue.admission || {};
  const entries = [
    ...(queue.queue || []),
    ...(queue.serial_lanes || []).flatMap(
      (/** @type {any} */ lane) => lane.entries || []
    )
  ];
  const excluded = new Set(
    [...(queue.pr_wait || []), ...(queue.done || [])].map(
      (/** @type {any} */ entry) => entry.bead_id
    )
  );
  for (const attempt of Object.values(queue.attempts || {})) {
    if (isImplementationAttempt(attempt) && attempt.status === 'running') {
      excluded.add(attempt.bead_id);
    }
  }
  const pending_ids = [
    ...new Set(entries.map((/** @type {any} */ entry) => entry.bead_id))
  ].filter(
    (id) =>
      typeof id === 'string' &&
      !excluded.has(id) &&
      facts[id]?.status !== 'closed'
  );
  const subject_ids = new Set([...pending_ids, ...attempts.keys()]);

  const seen_gates = new Set();
  for (const row of input.external_waits || []) {
    if (
      row.root_dir !== root_dir ||
      !row.consumer_id ||
      !row.gate_id ||
      !row.watch_id ||
      row.gate_open !== true ||
      seen_gates.has(row.gate_id)
    ) {
      continue;
    }
    seen_gates.add(row.gate_id);
    const interval =
      typeof row.interval_seconds === 'number' && row.interval_seconds > 0
        ? row.interval_seconds * 1000
        : WAIT_THRESHOLDS.interval_ms;
    const result = reason(
      'external_job',
      row.consumer_id,
      root_dir,
      externalJobHeadline(row),
      `${interval / 60_000}분마다 자동 확인 · 종료 확인되면 대기 자동 해제`
    );
    if (row.notify?.on_complete === 'discord') {
      result.notify_plan.on_complete = 'discord';
      result.release += ' · 완료 시 Discord 알림';
    }
    result.targets.push({ id: row.gate_id, kind: 'gate' });
    if (row.watch_id && timestamp(row.last_observed_at) !== undefined) {
      result.actions.push({
        op: 'monitor_tick_now',
        label: '[지금 확인]',
        payload: {
          root_dir,
          watch_id: row.watch_id,
          since: row.last_observed_at
        }
      });
    }
    addClocks(result, {
      since: row.registered_at,
      next_check_at: row.next_observation_at
    });
    if (
      elapsed(
        row.next_observation_at,
        interval * WAIT_THRESHOLDS.check_cycles,
        now
      )
    ) {
      judge(result, 'overdue', 'check_overdue');
    }
    if (['terminal_recorded', 'gate_noted'].includes(row.stage)) {
      const key = `${row.gate_id}:${row.watch_id || ''}`;
      const since =
        timestamp(row.terminal_recorded_at) ??
        timestamp(row.completed_at) ??
        timestamp(row.last_observed_at) ??
        timestamp(prior.settle_observed_at?.[key]) ??
        now;
      settle_observed_at[key] = since;
      addClocks(result, { since });
      if (elapsed(since, interval * WAIT_THRESHOLDS.settle_cycles, now)) {
        judge(result, 'overdue', 'settle_overdue');
      }
    }
    if (row.stage === 'stopped') {
      judge(result, 'action_required', 'monitor_stopped');
    }
    if (row.service_down === true) {
      judge(result, 'action_required', 'service_down');
    }
    if (row.error_count >= WAIT_THRESHOLDS.observation_errors) {
      judge(result, 'action_required', 'observe_failing');
    }
    if (row.recovery_needed === true) {
      judge(result, 'action_required', 'job_failed');
    }
    wait_reasons.push(result);
  }

  for (const bead_id of subject_ids) {
    if (excluded.has(bead_id) || facts[bead_id]?.status === 'closed') {
      continue;
    }
    const attempt = attempts.get(bead_id);
    const record = admission[bead_id];
    const recovery = attempt?.cause_detail?.recovery;
    if (attempt?.status === 'waiting' && recovery) {
      const token = line(recovery.reason);
      const known = Object.hasOwn(RECOVERY_WAIT_LABELS, token);
      const count = recovery.no_progress?.count;
      const result = reason(
        'recovery',
        bead_id,
        root_dir,
        [
          known ? RECOVERY_WAIT_LABELS[token] : token,
          known ? RECOVERY_WAIT_SENTENCES[token] : '',
          attempt.cause && attempt.cause !== 'session_recovery_wait'
            ? `원인 ${line(attempt.cause)}`
            : '',
          count >= 1 ? `무진전 ${count}회` : ''
        ]
          .filter(Boolean)
          .join(' · '),
        known ? RECOVERY_RELEASES[token] : ''
      );
      addClocks(result, { since: attempt.finished_at });
      if (
        typeof attempt.session_id === 'string' &&
        attempt.session_id.length > 0
      ) {
        result.actions.push({
          op: 'resume',
          label: '↻ 이어하기',
          payload: { root_dir, bead_id, attempt_id: attempt.attempt_id }
        });
      }
      if (
        ['unclassified', 'reconcile', 'authority', 'no_progress'].includes(
          token
        )
      ) {
        judge(result, 'action_required', 'recovery_confirm');
      } else if (
        elapsed(
          attempt.finished_at,
          WAIT_THRESHOLDS.interval_ms * WAIT_THRESHOLDS.settle_cycles,
          now
        )
      ) {
        judge(result, 'overdue', 'settle_overdue');
      }
      wait_reasons.push(result);
      continue;
    }
    if (attempt?.status === 'waiting' && attempt.cause === 'base_moved') {
      const sha = line(
        attempt.cause_detail?.candidate_sha || attempt.head_oid
      ).slice(0, 7);
      const result = reason(
        'base_moved',
        bead_id,
        root_dir,
        `기준 이동 대기${sha ? ` · 보존 후보 ${sha}가 새 base 위에서 재검증을 기다림` : ''}`,
        '↻ 이어하기로 보존 세션 재개'
      );
      addClocks(result, { since: attempt.finished_at });
      result.actions.push({
        op: 'resume',
        label: '↻ 이어하기',
        payload: { root_dir, bead_id, attempt_id: attempt.attempt_id }
      });
      wait_reasons.push(result);
      continue;
    }
    /** @type {Map<string, Record<string, any>>} */
    const blockers = new Map();
    const held =
      attempt?.status === 'waiting' &&
      Array.isArray(attempt.cause_detail?.blockers);
    const admitted =
      record?.reason === 'prerequisite_unmet' && Array.isArray(record.blockers);
    const recorded = [
      ...(held ? attempt.cause_detail.blockers : []),
      ...(admitted ? record.blockers : [])
    ];
    // 선행과 무관한 admission 기록은 선행 사유를 막지 않는다 (UI-0bvr §6.1):
    // attempt도 admission도 blocker를 싣지 않았으면 `blocked_by`를 읽는다.
    // `!attempt`는 남는다 — 실행 이력이 있는 bead의 대기 사유는 그 attempt의
    // `cause_detail`이 소유하고 그 경로는 `held`가 이미 판정한다.
    const bare =
      !attempt && recorded.length === 0 && pending_ids.includes(bead_id);
    const sources = [
      ...recorded,
      ...(bare && Array.isArray(blocked_by[bead_id]) ? blocked_by[bead_id] : [])
    ];
    for (const source of sources) {
      const blocker = typeof source === 'string' ? { id: source } : source;
      if (blocker && typeof blocker.id === 'string' && blocker.id) {
        blockers.set(blocker.id, { ...blockers.get(blocker.id), ...blocker });
      }
    }
    /** @type {Map<WaitKind, WaitReason>} */
    const groups = new Map();
    for (const [id, blocker] of blockers) {
      const foreign_fact = foreign[id];
      const self_rig = queue.rig || bead_id.slice(0, bead_id.lastIndexOf('-'));
      const blocker_rig = blocker.rig || id.slice(0, id.lastIndexOf('-'));
      const is_foreign =
        !!foreign_fact?.rig || (!!blocker_rig && blocker_rig !== self_rig);
      const current = is_foreign ? foreign_fact || {} : facts[id] || blocker;
      const status = line(current.status);
      const open =
        status !== 'closed' &&
        (!Array.isArray(blocked_by[bead_id]) ||
          blocked_by[bead_id].includes(id));
      if (!open) {
        continue;
      }
      const kind = is_foreign ? 'prerequisite_foreign' : 'prerequisite';
      let result = groups.get(kind);
      if (!result) {
        // 선행 대기는 headline을 싣지 않는다 (UI-0bvr §4.2): 슬롯 1 배지와 4a
        // 칩이 이미 말하는 사실이라 본문 줄이 되풀이가 된다. 빈 문자열이면
        // 카드가 본문을 그리지 않는다 (fail-quiet).
        result = reason(
          kind,
          bead_id,
          root_dir,
          '',
          is_foreign
            ? '다른 저장소 선행이 닫히면 자동 복귀'
            : '선행이 닫히면 bd ready 재스캔으로 자동 복귀'
        );
        addClocks(result, {
          since: attempt?.finished_at || record?.at
        });
        groups.set(kind, result);
      }
      const rig = line(
        foreign_fact?.rig || blocker.rig || (is_foreign ? blocker_rig : '')
      );
      result.targets.push({
        id,
        kind: 'issue',
        ...(rig ? { rig } : {}),
        ...(status ? { status } : {})
      });
      if (
        open &&
        (['blocked', 'deferred'].includes(status) ||
          isWorkerIneligible(current.labels || []))
      ) {
        judge(result, 'action_required', 'blocker_needs_human');
      }
    }
    wait_reasons.push(...groups.values());
    if (attempt?.status === 'parked' && !attempt.parked_resumed_at) {
      const value = line(attempt.cause_detail?.awaiting_user);
      if (value) {
        const result = reason(
          'awaiting_user',
          bead_id,
          root_dir,
          `사용자 결정 대기 · ${value}`,
          '문의 세션에서 답하면 해제'
        );
        judge(result, 'action_required', 'decision');
        addClocks(result, { since: attempt.finished_at });
        wait_reasons.push(result);
      }
    }
    if (attempt?.status === 'retry_wait') {
      const next_at = timestamp(attempt.retry?.next_at);
      const result = reason(
        'retry_wait',
        bead_id,
        root_dir,
        `${line(attempt.retry?.cause || attempt.cause)} 재시도 대기`.trim(),
        next_at === undefined ? '' : `${localClock(next_at)}에 자동 재시도`
      );
      addClocks(result, { since: attempt.finished_at, next_check_at: next_at });
      wait_reasons.push(result);
    }
    if (
      record?.reason === 'worktree_stale_work' &&
      record.stale_work?.action_id
    ) {
      const result = reason(
        'stale_work',
        bead_id,
        root_dir,
        '보존 작업 처분 대기',
        '이어하기 / 새로 시작 선택'
      );
      result.actions.push({
        op: 'disposition',
        label: '이어하기 / 새로 시작',
        payload: { root_dir, bead_id, action_id: record.stale_work.action_id }
      });
      judge(result, 'action_required', 'disposition');
      wait_reasons.push(result);
    }
  }

  for (const operation of Object.values(queue.repo_operations || {})) {
    const recovery = operation?.recovery;
    if (
      operation?.state !== 'failed' ||
      !recovery ||
      operation.dismissed ||
      operation.superseded_by
    ) {
      continue;
    }
    for (const subject of operation.subjects || []) {
      const bead_id = subject.bead_id;
      if (
        !bead_id ||
        facts[bead_id]?.status === 'closed' ||
        (queue.done || []).some(
          (/** @type {any} */ row) => row.bead_id === bead_id
        ) ||
        wait_reasons.some(
          (row) =>
            row.subject.bead_id === bead_id &&
            [
              'recovery',
              'base_moved',
              'prerequisite',
              'prerequisite_foreign'
            ].includes(row.kind)
        )
      ) {
        continue;
      }
      const handoff = recovery.handoff;
      const handoff_bead_id = handoff?.handoff_bead_id;
      if (handoff_bead_id) {
        const result = reason(
          'recovery',
          bead_id,
          root_dir,
          `수정 작업 대기 · ${handoff_bead_id} · 원인 ${line(operation.failure?.code)}`,
          '수정 Bead의 PR·배포 뒤 [정리 재시도]'
        );
        result.targets.push({ id: handoff_bead_id, kind: 'issue' });
        addClocks(result, { since: handoff.recorded_at });
        wait_reasons.push(result);
      } else if (['wait', 'reconcile'].includes(recovery.disposition)) {
        const token = line(recovery.reason);
        const result = reason(
          'recovery',
          bead_id,
          root_dir,
          [
            RECOVERY_WAIT_LABELS[token] || token,
            RECOVERY_WAIT_SENTENCES[token],
            operation.failure?.code
              ? `원인 ${line(operation.failure.code)}`
              : ''
          ]
            .filter(Boolean)
            .join(' · '),
          `${RECOVERY_WAIT_LABELS[token] || token} — 조건 확인 뒤 [정리 재시도]`
        );
        addClocks(result, { since: operation.finished_at });
        if (['unclassified', 'reconcile'].includes(token)) {
          judge(result, 'action_required', 'recovery_confirm');
        }
        wait_reasons.push(result);
      }
    }
  }

  for (const [runner, hold] of Object.entries(queue.provider_hold || {})) {
    for (const target of hold.targets || []) {
      if (!['usage_limit', 'outage'].includes(target.kind)) {
        continue;
      }
      const target_ids = new Set(
        (target.attempt_ids || [])
          .map((/** @type {string} */ id) => queue.attempts?.[id]?.bead_id)
          .filter(Boolean)
      );
      for (const bead_id of target_ids) {
        const attempt = attempts.get(bead_id);
        if (
          !attempt ||
          attempt.status !== 'provider_hold' ||
          !target.attempt_ids.includes(attempt.attempt_id) ||
          excluded.has(bead_id)
        ) {
          continue;
        }
        const outage = target.kind === 'outage';
        const account = input.account_catalog?.[target.account];
        const alias =
          line(account?.alias || account?.email) ||
          line(target.account).slice(0, 8);
        const plan = line(account?.plan || account?.plan_type);
        const limited_window = account?.windows?.find(
          (/** @type {any} */ entry) => entry.pct >= 100
        );
        const window = line(
          target.window || account?.window || limited_window?.key
        );
        const disarmed = line(target.last_error).startsWith(
          'auto_resume_disarmed:'
        );
        const exhausted =
          Number.isInteger(target.rearm_count) &&
          target.rearm_count >= USAGE_REARM_CAP;
        const resets_at = timestamp(target.resets_at);
        const hold_since = timestamp(hold.since);
        const next_at = timestamp(target.next_probe_at);
        const headline = outage
          ? `${runner} 공급자 장애${target.detail ? ` · ${line(target.detail)}` : ''}`
          : [runner, `${alias}${plan ? `(${plan})` : ''}`, window, '한도 초과']
              .filter(Boolean)
              .join(' ');
        const release = outage
          ? `${next_at === undefined ? '' : `${localClock(next_at)}에 `}자동 프로브 (상한 없음, ADR UI-o5ll)`
          : disarmed || exhausted
            ? '자동 재개 꺼짐 · 서버 재시작 시 1회 자동 프로브 · ↻ 지금 프로브 필요'
            : `리셋 ${resets_at === undefined ? '미상' : localClock(resets_at)} 뒤 자동 프로브${Number.isInteger(target.rearm_count) ? ` (자동 재개 ${Math.max(0, USAGE_REARM_CAP - target.rearm_count)}회)` : ''}`;
        const result = reason(
          'provider_hold',
          bead_id,
          root_dir,
          headline,
          release
        );
        addClocks(result, {
          since: hold.since,
          next_check_at: next_at,
          ...(!outage ? { resets_at } : {})
        });
        result.actions.push({
          op: 'probe_now',
          label: '↻ 지금 프로브',
          payload: { root_dir, runner }
        });
        if (outage && elapsed(next_at, WAIT_THRESHOLDS.grace_ms, now)) {
          judge(result, 'overdue', 'probe_stalled');
        }
        if (!outage && elapsed(resets_at, WAIT_THRESHOLDS.grace_ms, now)) {
          judge(result, 'overdue', 'reset_passed');
        }
        if (
          !outage &&
          disarmed &&
          (elapsed(resets_at, 0, now) ||
            (resets_at === undefined &&
              hold_since !== undefined &&
              now - hold_since > WAIT_THRESHOLDS.unknown_reset_ms))
        ) {
          judge(result, 'action_required', 'probe_needed');
        }
        wait_reasons.push(result);
      }
    }
  }
  const hold = queue.hold;
  if (hold && ['env', 'systemic'].includes(hold.kind)) {
    for (const bead_id of new Set([...pending_ids, ...(hold.bead_ids || [])])) {
      if (excluded.has(bead_id) || facts[bead_id]?.status === 'closed') {
        continue;
      }
      const env = hold.kind === 'env';
      const times = (queue.lineages || [])
        .map((/** @type {any} */ row) => timestamp(row.next_at))
        .filter((/** @type {any} */ at) => at !== undefined);
      const next_at = times.length > 0 ? Math.min(...times) : undefined;
      const result = reason(
        'queue_hold',
        bead_id,
        root_dir,
        `${env ? '환경 오류로 큐 일시 정지' : '큐 정지'}${hold.cause ? ` · ${line(hold.cause)}` : ''}`,
        env
          ? `${next_at === undefined ? '' : `${localClock(next_at)}에 `}자동 재시도 · 성공하면 자동 해제 (지금 재시도 가능)`
          : '▶ 재개로 해제 (사람 승인)'
      );
      addClocks(result, {
        since: hold.since,
        ...(env ? { next_check_at: next_at } : {})
      });
      if (!env) {
        result.actions.push({
          op: 'resume',
          label: '▶ 재개',
          payload: { root_dir }
        });
        judge(result, 'action_required', 'hold');
      } else if (elapsed(next_at, WAIT_THRESHOLDS.grace_ms, now)) {
        judge(result, 'overdue', 'retry_stalled');
      }
      wait_reasons.push(result);
    }
  }
  // 자동 진행 꺼짐(`queue.auto_advance === false`)은 사유를 내지 않는다
  // (UI-3pu9 §3): 저장소 자동화 토글이 이미 말하는 사실이고, 읽는 화면이 없다.
  return {
    wait_reasons,
    observed_at: { settle_observed_at }
  };
}
