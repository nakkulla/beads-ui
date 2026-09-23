import {
  isImplementationAttempt,
  latestImplementationAttempts
} from '../../app/utils/active-attempts.js';
import { RECOVERY_WAIT_SENTENCES } from '../../app/utils/failure-sentences.js';
import { isWorkerIneligible } from '../../app/utils/worker-eligibility.js';
import { OBSERVATION } from './external-wait/contract.js';
import { isSessionStalledRecovery } from './session-stall.js';

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
 * @typedef {'external_job'|'prerequisite'|'prerequisite_foreign'|'provider_hold'|'awaiting_user'|'retry_wait'|'recovery'} WaitKind
 * @typedef {'check_overdue'|'settle_overdue'|'job_failed'|'observe_failing'|'service_down'|'monitor_stopped'|'blocker_needs_human'|'reset_passed'|'probe_stalled'|'retry_stalled'|'decision'|'resume_failed'|'wait_key_missing'|'wait_record_missing'} VerdictCode
 * @typedef {{ code: VerdictCode, message: string }} VerdictReason
 * @typedef {Object} WaitReason
 * @property {WaitKind} kind
 * @property {{ bead_id: string, root_dir: string }} subject
 * @property {string} headline
 * @property {string} release
 * @property {string} [error]
 * @property {number} [completed_at]
 * @property {number} [since]
 * @property {number} [next_check_at]
 * @property {number} [resets_at]
 * @property {'normal'|'overdue'|'action_required'} verdict
 * @property {VerdictReason} [verdict_reason]
 * @property {Array<{ id: string, rig?: string, status?: string, kind: 'gate'|'issue' }>} targets
 * @property {Array<{ op: string, label: string, title?: string, payload: Record<string, any> }>} actions
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
  resume_failed: '재개 실패',
  wait_key_missing: '키 없음',
  wait_record_missing: '대기 레코드 없음',
  check_overdue: '다음 확인 시각에서 한 주기가 지나도 관측이 갱신되지 않음',
  settle_overdue: '종료 확인 후 두 주기가 지나도 대기가 해제되지 않음',
  job_failed: '작업이 실패로 끝나 복구 판단이 필요함',
  observe_failing: '자동 확인이 연속 3회 이상 실패함',
  service_down: '자동 확인 서비스가 등록되지 않았거나 설치된 명령과 다름',
  monitor_stopped: '외부 작업 감시가 중단됨',
  blocker_needs_human: '열린 선행에 사람의 조치가 필요함',
  reset_passed: '한도 리셋 후 5분이 지나도 보류가 유지됨',
  probe_stalled: '다음 프로브 시각에서 5분이 지나도 갱신되지 않음',
  retry_stalled: '재시도 시각에서 5분이 지나도 실행되지 않음',
  decision: '사용자의 답변이 필요함'
};

/**
 * Preserve the session's first blocker sentence without folding later lines in.
 *
 * @param {unknown} summary
 * @param {string} token
 * @returns {string}
 */
function recoveryHeadline(summary, token) {
  const first = typeof summary === 'string' ? summary.split(/\r?\n/, 1)[0] : '';
  return (
    line(first.replace(/^.*?blocker:\s*/, '')) ||
    (Object.hasOwn(RECOVERY_WAIT_SENTENCES, token)
      ? RECOVERY_WAIT_SENTENCES[token]
      : token)
  );
}

/**
 * The same interactive exits serve parked and recovery sessions.
 *
 * @param {WaitReason} result
 * @param {string} [attempt_id]
 */
function sessionActions(result, attempt_id) {
  const payload = { ...result.subject, ...(attempt_id ? { attempt_id } : {}) };
  result.actions.push(
    { op: 'worker-resolve-in-session', label: '[세션에서 해결]', payload },
    { op: 'worker-discard', label: '폐기', payload }
  );
}

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
 * @param {{ since?: unknown, next_check_at?: unknown, resets_at?: unknown, completed_at?: unknown }} clocks
 */
function addClocks(result, clocks) {
  for (const field of /** @type {const} */ ([
    'since',
    'next_check_at',
    'resets_at',
    'completed_at'
  ])) {
    const at = timestamp(clocks[field]);
    if (at !== undefined) {
      result[field] = at;
    }
  }
}

/**
 * Compose the external-job headline from public record fields.
 *
 * @param {Record<string, any>|null|undefined} row
 * @param {number} [now]
 * @returns {string}
 */
export function externalJobHeadline(row, now) {
  const jobs = Array.isArray(row?.jobs) ? row.jobs : [];
  if (jobs.length > 1) {
    const completed = jobs.filter((job) => job.terminal).length;
    return `잡 ${jobs.length}건 · 완료 ${completed} · 실행 ${jobs.length - completed}`;
  }
  const job = jobs[0];
  if (!job) {
    return '';
  }
  const submitted = timestamp(job.submitted_at);
  const minutes =
    now !== undefined && submitted !== undefined
      ? Math.max(0, Math.floor((now - submitted) / 60_000))
      : null;
  return [
    [line(job.ssh_host), `작업 ${job.job_id ?? job.pid}`]
      .filter(Boolean)
      .join(' '),
    line(job.state),
    minutes === null
      ? ''
      : `경과 ${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}m`
  ]
    .filter(Boolean)
    .join(' · ');
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

  const live_rows = (input.external_waits || []).filter(
    (row) =>
      row.root_dir === root_dir &&
      row.bead_id &&
      ['hold', 'detached', 'completing'].includes(row.stage)
  );
  for (const row of live_rows) {
    const jobs = Array.isArray(row.jobs) ? row.jobs : [];
    const result = reason(
      'external_job',
      row.bead_id,
      root_dir,
      externalJobHeadline(row, now),
      row.stage === 'completing'
        ? row.owner_kind === 'worker'
          ? '재개 중'
          : '완료 · 세션 칩을 눌러 ID를 복사해 그 세션에서 잇거나 [워커로 이어가기]'
        : '완료되면 같은 세션을 이어간다'
    );
    result.notify_plan.on_complete =
      row.owner_kind === 'session' ? 'discord' : 'none';
    if (row.error_count > 0) {
      result.error = `관찰 오류 ${row.error_count}회 · ${line(row.last_error)}`;
    }
    const payload = { root_dir, wait_id: row.wait_id };
    if (row.stage === 'hold' || row.stage === 'detached') {
      const next_at = timestamp(row.next_observation_at);
      result.actions.push({
        op: 'external_wait_check',
        label: '[지금 확인]',
        title:
          next_at === undefined
            ? '관찰을 지금 한 번 더 한다'
            : `관찰을 지금 한 번 더 한다 (다음 예정 ${localClock(next_at)})`,
        payload
      });
      result.actions.push({
        op: 'external_wait_stop',
        label: '[관찰 중단]',
        title:
          'beads-ui가 이 작업을 더 지켜보지 않고 대기 키를 지운다 · 잡은 그대로',
        payload
      });
    } else {
      result.actions.push({
        op: 'external_wait_stop',
        label: '[대기 해제]',
        title:
          '이어가지 않고 대기 키를 지운다 · 잡은 그대로 · 이 대기의 표시는 카드와 상세에서 사라진다',
        payload
      });
    }
    if (
      row.stage === 'completing' &&
      (row.owner_kind === 'session' || row.resume?.error)
    ) {
      if (!row.resume || row.resume.error) {
        result.actions.push({
          op: 'external_wait_resume',
          label: '[워커로 이어가기]',
          title: 'Worker가 보존 세션을 fork해 이어간다 — 이후 소유는 Worker',
          payload: { ...payload, mode: 'fork' }
        });
      }
      if (row.resume?.error) {
        result.actions.push({
          op: 'external_wait_resume',
          label: '[새 세션으로]',
          title: 'fork 없이 완료 페이로드로 새 Worker 세션을 연다',
          payload: { ...payload, mode: 'fresh' }
        });
      }
    }
    addClocks(result, {
      since: row.registered_at,
      next_check_at: row.completion ? undefined : row.next_observation_at,
      completed_at: row.completion?.completed_at
    });
    const intervals = jobs
      .filter((job) => !job.terminal)
      .map((job) =>
        job.adapter === 'slurm'
          ? OBSERVATION.slurm_interval_seconds
          : OBSERVATION.process_interval_seconds
      );
    const interval =
      row.error_count > 0
        ? OBSERVATION.error_backoff_seconds[
            Math.min(
              row.error_count - 1,
              OBSERVATION.error_backoff_seconds.length - 1
            )
          ]
        : intervals.length
          ? Math.min(...intervals)
          : OBSERVATION.slurm_interval_seconds;
    if (
      ['hold', 'detached'].includes(row.stage) &&
      now >
        (timestamp(row.next_observation_at) ?? Infinity) + 2 * interval * 1000
    ) {
      judge(result, 'overdue', 'check_overdue');
    }
    if (row.error_count >= WAIT_THRESHOLDS.observation_errors) {
      judge(result, 'overdue', 'observe_failing');
    }
    if (row.stage === 'completing' && row.resume?.error) {
      judge(result, 'action_required', 'resume_failed');
      result.verdict_reason = {
        code: 'resume_failed',
        message: `재개 실패 · ${line(row.resume.error)}`
      };
    }
    if (
      ['detached', 'completing'].includes(row.stage) &&
      !Object.hasOwn(facts[row.bead_id] || {}, 'external_wait')
    ) {
      judge(result, 'action_required', 'wait_key_missing');
    } else if (
      ['detached', 'completing'].includes(row.stage) &&
      facts[row.bead_id].external_wait !== row.wait_id
    ) {
      judge(result, 'action_required', 'wait_record_missing');
    }
    wait_reasons.push(result);
  }
  for (const [bead_id, fact] of Object.entries(facts)) {
    if (
      !Object.hasOwn(fact, 'external_wait') ||
      live_rows.some((row) => row.bead_id === bead_id)
    ) {
      continue;
    }
    const result = reason(
      'external_job',
      bead_id,
      root_dir,
      '',
      '관찰 중단으로 대기 키를 해제한다'
    );
    judge(result, 'action_required', 'wait_record_missing');
    result.actions.push({
      op: 'external_wait_stop',
      label: '[관찰 중단]',
      title: '레코드가 없는 대기 키를 지운다',
      payload: { root_dir, wait_id: fact.external_wait, bead_id }
    });
    wait_reasons.push(result);
  }

  for (const bead_id of subject_ids) {
    if (excluded.has(bead_id) || facts[bead_id]?.status === 'closed') {
      continue;
    }
    const attempt = attempts.get(bead_id);
    const record = admission[bead_id];
    const recovery = attempt?.cause_detail?.recovery;
    const recovery_blockers = Array.isArray(attempt?.cause_detail?.blockers)
      ? attempt.cause_detail.blockers
      : [];
    if (
      attempt?.status === 'waiting' &&
      recovery &&
      (recovery.reason !== 'prerequisite' || recovery_blockers.length === 0)
    ) {
      const token = line(recovery.reason);
      const result = reason(
        'recovery',
        bead_id,
        root_dir,
        recoveryHeadline(attempt.cause_detail.summary, token),
        Object.hasOwn(RECOVERY_WAIT_SENTENCES, token)
          ? RECOVERY_WAIT_SENTENCES[token]
          : token
      );
      addClocks(result, { since: attempt.finished_at });
      if (isSessionStalledRecovery(recovery, recovery_blockers)) {
        judge(result, 'action_required', 'decision');
      }
      sessionActions(result, attempt.attempt_id);
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
        sessionActions(result, attempt.attempt_id);
        addClocks(result, { since: attempt.finished_at });
        wait_reasons.push(result);
      }
    }
    if (
      attempt?.status === 'retry_wait' ||
      (attempt?.status === 'waiting' &&
        attempt.cause === 'base_moved' &&
        timestamp(attempt.retry?.next_at) !== undefined)
    ) {
      const next_at = timestamp(attempt.retry?.next_at);
      const result = reason(
        'retry_wait',
        bead_id,
        root_dir,
        `${line(attempt.retry?.cause || attempt.cause)} 재시도 대기`.trim(),
        next_at === undefined ? '' : `${localClock(next_at)}에 자동 재시도`
      );
      addClocks(result, { since: attempt.finished_at, next_check_at: next_at });
      if (elapsed(next_at, WAIT_THRESHOLDS.grace_ms, now)) {
        judge(result, 'overdue', 'retry_stalled');
      }
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
            ['recovery', 'prerequisite', 'prerequisite_foreign'].includes(
              row.kind
            )
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
          recoveryHeadline(operation.failure?.summary, token),
          Object.hasOwn(RECOVERY_WAIT_SENTENCES, token)
            ? RECOVERY_WAIT_SENTENCES[token]
            : token
        );
        addClocks(result, { since: operation.finished_at });
        judge(result, 'action_required', 'decision');
        sessionActions(result);
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
        const resets_at = timestamp(target.resets_at);
        const next_at = timestamp(target.next_probe_at);
        const headline = outage
          ? `${runner} 공급자 장애${target.detail ? ` · ${line(target.detail)}` : ''}`
          : [runner, `${alias}${plan ? `(${plan})` : ''}`, window, '한도 초과']
              .filter(Boolean)
              .join(' ');
        const release = outage
          ? `${next_at === undefined ? '' : `${localClock(next_at)}에 `}자동 프로브 (상한 없음, ADR UI-o5ll)`
          : `리셋 ${resets_at === undefined ? '미상' : localClock(resets_at)} 뒤 자동 프로브 (상한 없음)`;
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
        wait_reasons.push(result);
      }
    }
  }
  // 자동 진행 꺼짐(`queue.auto_advance === false`)은 사유를 내지 않는다
  // (UI-3pu9 §3): 저장소 자동화 토글이 이미 말하는 사실이고, 읽는 화면이 없다.
  return {
    wait_reasons,
    observed_at: { settle_observed_at }
  };
}
