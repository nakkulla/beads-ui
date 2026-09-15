import { execFile } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const WATCH_SCHEMA = 'external-job-monitor-v1';
const RECENT_COMPLETE_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function text(value) {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : null;
}

/**
 * @param {unknown} value
 * @returns {number|null}
 */
function time(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value > 1e12 ? value : value * 1000;
  }
  if (typeof value !== 'string' || value.length === 0) {
    return null;
  }
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Keep errors useful on screen without carrying command output or logs.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function shortError(value) {
  const value_text = text(value);
  if (value_text === null) {
    return null;
  }
  const known = new Set([
    'monitoring stopped explicitly; remote job unchanged',
    'origin execution has not reached a terminal attempt/process identity',
    'remote response missing squeue marker',
    'remote response missing scontrol marker',
    'remote response missing log marker',
    'remote response has invalid return code',
    'squeue query failed',
    'scheduler identity mismatch',
    'scontrol identity mismatch',
    'scheduler execution identity mismatch',
    'terminal evidence is incomplete',
    'empty queue has no matching final sjob completion',
    'ssh observation failed',
    'terminal note readback failed',
    'gate identity changed before settlement',
    'gate was closed without this observation evidence',
    'gate close readback failed'
  ]);
  if (known.has(value_text)) {
    return value_text;
  }
  if (/TimeoutExpired|timed out|timeout/i.test(value_text)) {
    return '원격 작업 확인 시간 초과';
  }
  if (/\bssh\b/i.test(value_text)) {
    return '원격 작업 연결 실패';
  }
  if (/invalid json/i.test(value_text)) {
    return '감시 응답 형식 오류';
  }
  return '자동 확인 실패';
}

/**
 * @param {string} repo
 * @param {(file: string, args: string[], options: Record<string, any>) => Promise<{ stdout?: string }>} run
 * @param {AbortSignal} signal
 * @returns {Promise<string|null>}
 */
async function gitCommonDir(repo, run, signal) {
  try {
    const result = await run(
      'git',
      ['-C', repo, 'rev-parse', '--path-format=absolute', '--git-common-dir'],
      { timeout: 5000, windowsHide: true, signal }
    );
    const value = text(result.stdout);
    return value === null ? null : path.resolve(value);
  } catch (error) {
    if (signal.aborted) {
      throw error;
    }
    return null;
  }
}

/**
 * @param {Record<string, any>} watch
 * @returns {boolean}
 */
function validWatch(watch) {
  return (
    watch.schema === WATCH_SCHEMA &&
    /^[a-f0-9]{24}$/.test(String(watch.watch_id || '')) &&
    text(watch.repo) !== null &&
    text(watch.gate_id) !== null &&
    text(watch.consumer) !== null
  );
}

/**
 * @param {Record<string, any>|null} service
 * @returns {{ ok: boolean, reason: string|null }}
 */
function serviceState(service) {
  if (!service) {
    return { ok: false, reason: '서비스 정보를 읽을 수 없음' };
  }
  if (
    service.ok !== true ||
    service.schema !== 'external-job-monitor-service-v1'
  ) {
    return {
      ok: false,
      reason: shortError(service.reason || service.error) || '서비스 확인 실패'
    };
  }
  if (service.probe_error) {
    return {
      ok: false,
      reason: shortError(service.probe_error) || '서비스 확인 실패'
    };
  }
  if (service.loaded !== true) {
    return { ok: false, reason: '자동 확인 서비스가 등록되지 않음' };
  }
  if (
    service.command_matches !== true ||
    service.loaded_matches_plist !== true ||
    service.executable_exists !== true
  ) {
    return { ok: false, reason: '자동 확인 서비스 명령이 설치본과 다름' };
  }
  const tick = isRecord(service.last_tick) ? service.last_tick : null;
  if (tick && tick.skipped !== true && Number(tick.exit_code) !== 0) {
    return { ok: false, reason: '최근 자동 확인 실행 실패' };
  }
  return { ok: true, reason: null };
}

/**
 * @param {Record<string, any>} watch
 * @returns {{ label: string, previous_label: string|null }}
 */
function jobState(watch) {
  const observed = String(watch.observation_state || '').toUpperCase();
  const recovery = watch.recovery_needed === true;
  const terminal =
    isRecord(watch.terminal_evidence) ||
    recovery ||
    (typeof watch.exit_code === 'number' && Number.isFinite(watch.exit_code));
  if (terminal || watch.stage === 'complete') {
    return {
      label: recovery ? '종료 확인 · 조치 필요' : '종료 확인 · 결과 검증 필요',
      previous_label: null
    };
  }
  const observed_label =
    observed === 'PENDING'
      ? '실행 대기'
      : observed === 'RUNNING'
        ? '계산 중'
        : null;
  if (watch.last_error) {
    return {
      label: '계산 상태 확인 필요',
      previous_label: observed_label ? `이전 관측: ${observed_label}` : null
    };
  }
  return {
    label: observed_label || '계산 상태 확인 필요',
    previous_label: null
  };
}

/**
 * @param {Record<string, any>} watch
 * @param {boolean} gate_open
 * @param {{ ok: boolean, reason: string|null }} service
 * @param {number} now
 * @returns {{ label: string, reason: string|null, overdue: boolean }}
 */
function monitorState(watch, gate_open, service, now) {
  const stage = String(watch.stage || '');
  if (stage === 'complete') {
    return gate_open
      ? {
          label: '감시 기록과 대기 상태 확인 필요',
          reason: '감시 기록은 완료됐지만 대기 조건이 열려 있음',
          overdue: false
        }
      : { label: '감시 종료', reason: null, overdue: false };
  }
  const next_at = time(watch.next_observation_at);
  const overdue = stage !== 'stopped' && next_at !== null && next_at < now;
  if (!gate_open) {
    return {
      label: '감시 기록과 대기 상태 확인 필요',
      reason: overdue
        ? '대기 조건은 닫혔지만 감시 기록이 완료되지 않음 · 확인 예정 시각도 지남'
        : '대기 조건은 닫혔지만 감시 기록이 완료되지 않음',
      overdue
    };
  }
  if (stage === 'stopped') {
    return { label: '자동 확인 중지', reason: null, overdue: false };
  }
  if (watch.last_error || !service.ok) {
    const reason = shortError(watch.last_error) || service.reason;
    return {
      label: '감시 확인 필요',
      reason: overdue
        ? `${reason || '확인 오류'} · 확인 예정 시각도 지남`
        : reason,
      overdue
    };
  }
  if (['preparing', 'gate_ready', 'handoff_incomplete'].includes(stage)) {
    return {
      label: '감시 등록 확인 필요',
      reason: overdue ? '확인 예정 시각 지남' : null,
      overdue
    };
  }
  if (['terminal_recorded', 'gate_noted'].includes(stage)) {
    return {
      label: '종료 확인 · 대기 해제 확인 중',
      reason: overdue ? '확인 예정 시각 지남' : null,
      overdue
    };
  }
  if (stage !== 'active') {
    return {
      label: '감시 확인 필요',
      reason: '지원하지 않는 감시 단계',
      overdue
    };
  }
  if (
    time(watch.last_observed_at) === null ||
    !['PENDING', 'RUNNING'].includes(
      String(watch.observation_state || '').toUpperCase()
    )
  ) {
    return {
      label: '감시 확인 필요',
      reason: overdue
        ? '최근 작업 관측이 없음 · 확인 예정 시각도 지남'
        : '최근 작업 관측이 없음',
      overdue
    };
  }
  if (overdue) {
    return { label: '확인 예정 시각 지남', reason: null, overdue: true };
  }
  return { label: '자동 확인 중', reason: null, overdue: false };
}

/**
 * @param {Record<string, any>[]} values
 * @returns {Record<string, any>[]}
 */
function sortRows(values) {
  return values.sort(
    (a, b) =>
      a.workspace_name.localeCompare(b.workspace_name) ||
      (a.consumer_id || '').localeCompare(b.consumer_id || '') ||
      a.gate_id.localeCompare(b.gate_id)
  );
}

/**
 * @param {Record<string, any>} watch
 * @param {Record<string, any>} gate
 * @param {Record<string, any>} consumer
 * @param {string} root_dir
 * @param {string} workspace_name
 * @param {Record<string, any>|null} service
 * @param {number} now
 * @returns {Record<string, any>|null}
 */
function projectWatch(
  watch,
  gate,
  consumer,
  root_dir,
  workspace_name,
  service,
  now
) {
  const gate_open = gate.status !== 'closed';
  const completed_at = time(watch.completed_at) || time(gate.closed_at);
  if (
    !gate_open &&
    watch.stage === 'complete' &&
    (completed_at === null || now - completed_at > RECENT_COMPLETE_MS)
  ) {
    return null;
  }
  const service_state = serviceState(service);
  const job_state = jobState(watch);
  const monitor_state = monitorState(watch, gate_open, service_state, now);
  return {
    kind: 'external_wait',
    root_dir,
    workspace_name,
    gate_id: gate.id,
    gate_title: text(gate.title) || gate.id,
    consumer_id: consumer.id,
    consumer_title: text(consumer.title) || consumer.id,
    watch_id: watch.watch_id,
    job_id: text(watch.job_id),
    stage: text(watch.stage),
    gate_open,
    recent_complete: !gate_open && watch.stage === 'complete',
    job_state: job_state.label,
    previous_job_state: job_state.previous_label,
    monitor_state: monitor_state.label,
    monitor_reason: monitor_state.reason,
    overdue: monitor_state.overdue,
    last_observed_at: time(watch.last_observed_at),
    next_observation_at:
      watch.stage === 'complete' || watch.stage === 'stopped'
        ? null
        : time(watch.next_observation_at),
    completed_at,
    recovery_needed: watch.recovery_needed === true
  };
}

/**
 * @param {Record<string, any>} gate
 * @param {Record<string, any>|null} consumer
 * @param {string} root_dir
 * @param {string} workspace_name
 * @param {string|null} source_error
 * @param {boolean} relation_error
 * @returns {Record<string, any>}
 */
function unknownGateRow(
  gate,
  consumer,
  root_dir,
  workspace_name,
  source_error,
  relation_error
) {
  return {
    kind: 'external_wait',
    root_dir,
    workspace_name,
    gate_id: gate.id,
    gate_title: text(gate.title) || gate.id,
    consumer_id: consumer?.id || null,
    consumer_title: consumer ? text(consumer.title) || consumer.id : null,
    watch_id: null,
    job_id: null,
    stage: null,
    gate_open: true,
    recent_complete: false,
    job_state: '대기 조건',
    previous_job_state: null,
    monitor_state:
      source_error === '감시 정보 조회 중'
        ? source_error
        : source_error || relation_error
          ? '감시 확인 필요'
          : '감시 정보 없음',
    monitor_reason:
      source_error === '감시 정보 조회 중'
        ? null
        : source_error ||
          (relation_error ? '감시 기록 연결을 확인할 수 없음' : null),
    overdue: false,
    last_observed_at: null,
    next_observation_at: null,
    completed_at: null,
    recovery_needed: false
  };
}

/**
 * @param {Record<string, any>} row
 * @param {string} reason
 * @returns {Record<string, any>}
 */
function staleRow(row, reason) {
  if (row.gate_open !== true || row.monitor_state === '감시 종료') {
    return { ...row, stale: true };
  }
  return {
    ...row,
    stale: true,
    monitor_state: '감시 확인 필요',
    monitor_reason: reason,
    overdue: false
  };
}

/**
 * @param {Array<{ root_dir: string, snapshot_stale?: boolean }>} workspaces
 * @param {Record<string, any>[]} values
 * @returns {Record<string, any>[]}
 */
function markStaleSnapshots(workspaces, values) {
  const stale_roots = new Set(
    workspaces
      .filter((workspace) => workspace.snapshot_stale === true)
      .map((workspace) => workspace.root_dir)
  );
  return values.map((row) =>
    stale_roots.has(row.root_dir)
      ? staleRow(row, '이슈 스냅샷이 오래된 자료임')
      : row
  );
}

/**
 * Reconcile cached watch facts against the current native gate snapshot when
 * watch files cannot be read. Native close/edge changes remain authoritative.
 *
 * @param {Array<{ root_dir: string, name: string, snapshot: any, snapshot_stale?: boolean }>} workspaces
 * @param {Record<string, any>[]} prior_rows
 * @param {string} reason
 * @param {number} now
 * @returns {Record<string, any>[]}
 */
function reconcileStaleRows(workspaces, prior_rows, reason, now) {
  /** @type {Record<string, any>[]} */
  const out = [];
  for (const workspace of workspaces) {
    const prior = prior_rows.filter(
      (row) => row.root_dir === workspace.root_dir
    );
    const snapshot = workspace.snapshot;
    if (!snapshot?.id_index || !snapshot?.blocks_in || !snapshot?.all) {
      out.push(...prior.map((row) => staleRow(row, reason)));
      continue;
    }
    const represented = new Set();
    for (const row of prior) {
      const gate = snapshot.id_index.get(row.gate_id);
      if (!gate || gate.issue_type !== 'gate') {
        continue;
      }
      const gate_open = gate.status !== 'closed';
      const consumer =
        typeof row.consumer_id === 'string'
          ? snapshot.id_index.get(row.consumer_id)
          : null;
      const relation_valid = !!(
        consumer &&
        (!row.watch_id ||
          (gate.await_id === row.watch_id && gate.await_type === 'human')) &&
        (snapshot.blocks_in.get(gate.id) || []).includes(consumer.id)
      );
      if (row.watch_id && !relation_valid) {
        if (gate_open) {
          out.push(
            unknownGateRow(
              gate,
              null,
              workspace.root_dir,
              workspace.name,
              '감시 기록 연결을 확인할 수 없음',
              true
            )
          );
          represented.add(gate.id);
        }
        continue;
      }
      if (!gate_open && !row.watch_id) {
        continue;
      }
      const completed_at = row.completed_at || time(gate.closed_at);
      if (
        !gate_open &&
        row.stage === 'complete' &&
        (completed_at === null || now - completed_at > RECENT_COMPLETE_MS)
      ) {
        continue;
      }
      const reconciled = {
        ...row,
        gate_title: text(gate.title) || gate.id,
        consumer_id: relation_valid ? consumer.id : null,
        consumer_title: relation_valid
          ? text(consumer.title) || consumer.id
          : null,
        gate_open,
        completed_at,
        recent_complete: !gate_open && row.stage === 'complete'
      };
      if (!gate_open && row.stage === 'complete') {
        out.push({
          ...reconciled,
          stale: true,
          monitor_state: '감시 종료',
          monitor_reason: null,
          next_observation_at: null,
          overdue: false
        });
      } else if (!gate_open) {
        out.push({
          ...reconciled,
          stale: true,
          monitor_state: '감시 기록과 대기 상태 확인 필요',
          monitor_reason: '대기 조건은 닫혔지만 감시 기록이 완료되지 않음',
          next_observation_at: null,
          overdue: false
        });
      } else {
        out.push(staleRow(reconciled, reason));
      }
      represented.add(gate.id);
    }
    const unknown = openGateRows(
      [workspace],
      [],
      null,
      now,
      new Map(),
      new Map(),
      reason
    );
    out.push(
      ...unknown
        .filter((row) => !represented.has(row.gate_id))
        .map((row) => ({ ...row, stale: true }))
    );
  }
  return sortRows(out);
}

/**
 * Async collector for the monitor channel. Projection reads only the last
 * completed cache, while concurrent refreshes join one in-flight promise.
 *
 * @param {{ state_root?: string, fs?: { readdir: (file: string) => Promise<string[]>, readFile: (file: string, encoding: string) => Promise<string> }, run?: (file: string, args: string[], options: Record<string, any>) => Promise<{ stdout?: string }>, now?: () => number }} [options]
 */
export function createExternalJobObservations(options = {}) {
  const io = options.fs || fs;
  const run = options.run || execFileAsync;
  const now = options.now || Date.now;
  const state_root =
    options.state_root ||
    path.join(
      process.env.XDG_STATE_HOME || path.join(os.homedir(), '.local', 'state'),
      'bead-job-monitor'
    );
  /** @type {Record<string, any>[]} */
  let rows = [];
  /** @type {Promise<Record<string, any>[]>|null} */
  let in_flight = null;
  let collected_at = 0;
  let stale = false;
  let epoch = 0;
  /** @type {AbortController|null} */
  let active_abort = null;

  /**
   * @param {Array<{ root_dir: string, name: string, snapshot: any, snapshot_stale?: boolean }>} workspaces
   */
  function collect(workspaces) {
    if (in_flight !== null) {
      return in_flight;
    }
    if (collected_at === 0 && rows.length === 0) {
      rows = openGateRows(
        workspaces,
        [],
        null,
        now(),
        new Map(),
        new Map(),
        '감시 정보 조회 중'
      );
    }
    const collect_epoch = epoch;
    const abort = new AbortController();
    active_abort = abort;
    in_flight = collectNow(workspaces, abort.signal)
      .then((next) => {
        if (collect_epoch !== epoch) {
          return rows;
        }
        rows = next;
        collected_at = now();
        stale = rows.some((row) => row.stale === true);
        return rows;
      })
      .catch(() => {
        if (collect_epoch !== epoch) {
          return rows;
        }
        if (collected_at === 0) {
          rows = rows.map((row) => ({
            ...row,
            monitor_state: '감시 확인 필요',
            monitor_reason: '감시 자료를 수집할 수 없음'
          }));
          stale = false;
          return rows;
        }
        stale = rows.length > 0;
        return rows;
      })
      .finally(() => {
        if (collect_epoch === epoch) {
          in_flight = null;
          active_abort = null;
        }
      });
    return in_flight;
  }

  /**
   * @param {Array<{ root_dir: string, name: string, snapshot: any, snapshot_stale?: boolean }>} workspaces
   * @param {AbortSignal} signal
   */
  async function collectNow(workspaces, signal) {
    /** @type {Record<string, any>|null} */
    let service = null;
    try {
      const result = await run('bead-job-monitor', ['show', '--service'], {
        timeout: 10000,
        windowsHide: true,
        signal
      });
      service = JSON.parse(String(result.stdout || ''));
    } catch (error) {
      if (signal.aborted) {
        throw error;
      }
      service = { ok: false, reason: '서비스 정보를 읽을 수 없음' };
    }
    let names = [];
    try {
      names = await io.readdir(path.join(state_root, 'watches'));
      signal.throwIfAborted();
    } catch (error) {
      if (/** @type {any} */ (error)?.code === 'ENOENT') {
        const available = workspaces.filter((workspace) => workspace.snapshot);
        const projected = openGateRows(available, [], service, now());
        const unavailable_roots = new Set(
          workspaces
            .filter((workspace) => !workspace.snapshot)
            .map((workspace) => workspace.root_dir)
        );
        projected.push(
          ...rows
            .filter((row) => unavailable_roots.has(row.root_dir))
            .map((row) => staleRow(row, '이슈 스냅샷을 읽을 수 없음'))
        );
        return sortRows(markStaleSnapshots(workspaces, projected));
      }
      if (collected_at > 0) {
        return reconcileStaleRows(
          workspaces,
          rows,
          '감시 기록 디렉터리를 읽을 수 없음',
          now()
        );
      }
      return sortRows(
        markStaleSnapshots(
          workspaces,
          openGateRows(
            workspaces,
            [],
            service,
            now(),
            new Map(),
            new Map(),
            '감시 기록 디렉터리를 읽을 수 없음'
          )
        )
      );
    }
    let watch_read_error = false;
    const parsed = await Promise.all(
      names
        .filter((name) => name.endsWith('.json'))
        .map(async (name) => {
          try {
            const raw = await io.readFile(
              path.join(state_root, 'watches', name),
              'utf8'
            );
            const watch = JSON.parse(raw);
            if (
              !isRecord(watch) ||
              !validWatch(watch) ||
              path.basename(name, '.json') !== watch.watch_id
            ) {
              watch_read_error = true;
              return null;
            }
            return watch;
          } catch {
            watch_read_error = true;
            return null;
          }
        })
    );
    const common_by_root = new Map();
    await Promise.all(
      workspaces.map(async (workspace) => {
        common_by_root.set(
          workspace.root_dir,
          await gitCommonDir(workspace.root_dir, run, signal)
        );
      })
    );
    const watch_common = new Map();
    /** @type {Map<string, Promise<string|null>>} */
    const common_by_repo = new Map();
    const valid_watches = /** @type {Record<string, any>[]} */ (
      parsed.filter(
        (/** @type {Record<string, any>|null} */ watch) => watch !== null
      )
    );
    await Promise.all(
      valid_watches.map(async (watch) => {
        const repo = text(watch.repo);
        if (repo !== null && !common_by_repo.has(repo)) {
          common_by_repo.set(repo, gitCommonDir(repo, run, signal));
        }
        watch_common.set(
          watch.watch_id,
          repo === null ? null : await common_by_repo.get(repo)
        );
      })
    );
    const available = workspaces.filter((workspace) => workspace.snapshot);
    const projected = openGateRows(
      available,
      valid_watches,
      service,
      now(),
      common_by_root,
      watch_common,
      watch_read_error ? '일부 감시 기록을 읽을 수 없음' : null
    );
    const unavailable_roots = new Set(
      workspaces
        .filter((workspace) => !workspace.snapshot)
        .map((workspace) => workspace.root_dir)
    );
    projected.push(
      ...rows
        .filter((row) => unavailable_roots.has(row.root_dir))
        .map((row) => staleRow(row, '이슈 스냅샷을 읽을 수 없음'))
    );
    return sortRows(markStaleSnapshots(workspaces, projected));
  }

  return {
    collect,
    get() {
      return {
        rows,
        collected_at,
        loading: in_flight !== null,
        stale
      };
    },
    clear() {
      active_abort?.abort();
      epoch += 1;
      rows = [];
      collected_at = 0;
      stale = false;
      in_flight = null;
    }
  };
}

/**
 * @param {Array<{ root_dir: string, name: string, snapshot: any }>} workspaces
 * @param {Record<string, any>[]} watches
 * @param {Record<string, any>|null} service
 * @param {number} now
 * @param {Map<string, string|null>} [common_by_root]
 * @param {Map<string, string|null>} [watch_common]
 * @param {string|null} [source_error]
 * @returns {Record<string, any>[]}
 */
function openGateRows(
  workspaces,
  watches,
  service,
  now,
  common_by_root = new Map(),
  watch_common = new Map(),
  source_error = null
) {
  /** @type {Record<string, any>[]} */
  const out = [];
  for (const workspace of workspaces) {
    const snapshot = workspace.snapshot;
    if (!snapshot?.id_index || !snapshot?.blocks_in) {
      continue;
    }
    const common = common_by_root.get(workspace.root_dir) || null;
    const matched = new Set();
    let relation_error = false;
    for (const watch of watches) {
      if (common === null || watch_common.get(watch.watch_id) !== common) {
        continue;
      }
      const gate = snapshot.id_index.get(watch.gate_id);
      const consumer = snapshot.id_index.get(watch.consumer);
      if (
        !gate ||
        gate.issue_type !== 'gate' ||
        gate.await_id !== watch.watch_id ||
        gate.await_type !== 'human' ||
        !consumer ||
        !(snapshot.blocks_in.get(gate.id) || []).includes(consumer.id)
      ) {
        relation_error = true;
        continue;
      }
      const row = projectWatch(
        watch,
        gate,
        consumer,
        workspace.root_dir,
        workspace.name,
        service,
        now
      );
      if (row) {
        out.push(row);
        matched.add(gate.id);
      }
    }
    for (const gate of snapshot.all) {
      if (
        gate.issue_type !== 'gate' ||
        gate.status === 'closed' ||
        matched.has(gate.id)
      ) {
        continue;
      }
      const consumers = snapshot.blocks_in.get(gate.id) || [];
      if (consumers.length === 0) {
        out.push(
          unknownGateRow(
            gate,
            null,
            workspace.root_dir,
            workspace.name,
            source_error,
            relation_error
          )
        );
        continue;
      }
      for (const consumer_id of consumers) {
        const consumer = snapshot.id_index.get(consumer_id);
        out.push(
          unknownGateRow(
            gate,
            consumer || null,
            workspace.root_dir,
            workspace.name,
            source_error,
            relation_error
          )
        );
      }
    }
  }
  return sortRows(out);
}
