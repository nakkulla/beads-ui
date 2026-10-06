import path from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { SSH_HOST_RE } from './adapters/slurm.js';
import { HOLD_BUDGET } from './contract.js';
import { holdDecision, registrationDecision } from './decision.js';
import { resumeBlocked } from './store.js';
import { requestTakeover, sjobLocalJob, takeoverTarget } from './takeover.js';

/**
 * @typedef {import('./store.js').WaitRecord} WaitRecord
 * @typedef {{ok:true, mode:'session', session:'launched'|'already_running'|'not_launched', reason:string|null, command:string|null, owner_tmux:string|null, tmux_session:string|null, tmux_window:string|null, pane_id:string|null, bridge_active:boolean}} SessionResumeResult
 * @typedef {(workspace:string, wait_id:string, mode:'fork'|'fresh'|'session')=>Promise<{ok:true, attempt_id:string}|SessionResumeResult|{ok:false, reason:string}>} ResumeHook
 * @typedef {{setExternalWait:(workspace:string, bead_id:string, wait_id:string)=>Promise<void>, unsetExternalWait:(workspace:string, bead_id:string)=>Promise<void>, readExternalWait?:(workspace:string, bead_id:string)=>Promise<unknown>}} BeadWriter
 */

/**
 * @param {number} status
 * @param {string} error
 * @param {string} [message] - A sentence for the person, when the code alone
 * does not say what happened.
 */
function failure(status, error, message) {
  return { ok: false, status, error, ...(message ? { message } : {}) };
}

/** Reply sentence of a takeover refused because one is already in flight. */
const TAKEOVER_BUSY_MESSAGE =
  '바로 실행이 이미 진행 중이거나 결과를 확인하는 중입니다';

/** Reply sentence of a takeover asked for a record it does not apply to. */
const TAKEOVER_NOT_ALLOWED_MESSAGE =
  '대기 중인 Slurm 작업 하나만 바로 실행할 수 있습니다';

/** @param {unknown} value */
function isText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/** @param {any} body */
function validRegistration(body) {
  if (
    !body ||
    !isText(body.bead_id) ||
    body.bead_id.startsWith('-') ||
    typeof body.worktree !== 'string' ||
    !path.isAbsolute(body.worktree) ||
    typeof body.execution_sha !== 'string' ||
    !/^[a-f0-9]{40}$/i.test(body.execution_sha) ||
    !Array.isArray(body.jobs)
  ) {
    return false;
  }
  const owner = body.owner;
  if (
    !owner ||
    !(owner.kind === 'worker'
      ? isText(owner.attempt_id)
      : owner.kind === 'session' &&
        isText(owner.session_ref) &&
        Number.isInteger(owner.session_pid) &&
        owner.session_pid > 1 &&
        isText(owner.session_start))
  ) {
    return false;
  }
  return body.jobs.every((/** @type {any} */ job) => {
    if (
      !job ||
      !isText(job.log_path) ||
      typeof job.submitted_at !== 'string' ||
      !/^\d{4}-\d\d-\d\dT/.test(job.submitted_at) ||
      !Number.isFinite(Date.parse(job.submitted_at)) ||
      (job.expected !== undefined &&
        (!Array.isArray(job.expected) || !job.expected.every(isText)))
    ) {
      return false;
    }
    if (job.adapter === 'slurm') {
      return (
        typeof job.ssh_host === 'string' &&
        /^[a-zA-Z0-9_][a-zA-Z0-9_.@-]*$/.test(job.ssh_host) &&
        isText(job.job_id) &&
        Array.isArray(job.expected) &&
        job.expected.length > 0 &&
        (job.scheduler_submit_time === undefined ||
          isText(job.scheduler_submit_time))
      );
    }
    return (
      job.adapter === 'process' &&
      Number.isInteger(job.pid) &&
      job.pid > 1 &&
      typeof job.workdir === 'string' &&
      path.isAbsolute(job.workdir) &&
      path.isAbsolute(job.log_path) &&
      (job.process_start === undefined || isText(job.process_start))
    );
  });
}

/** @param {WaitRecord} record */
function summary(record) {
  return {
    budget: record.budget,
    jobs: record.jobs.map((job) => ({
      adapter: job.adapter,
      ...(job.adapter === 'slurm'
        ? { job_id: job.job_id }
        : job.adapter === 'sjob_local'
          ? { ssh_host: job.ssh_host, local_id: job.local_id }
          : { pid: job.pid }),
      state: job.state,
      terminal: job.terminal
    }))
  };
}

/**
 * @param {{store:ReturnType<import('./store.js').createExternalWaitStore>, observer:Pick<ReturnType<import('./observer.js').createExternalWaitObserver>, 'observeRecord'|'withOperationLock'>, bd:BeadWriter, run?:import('./store.js').Run, resume?:ResumeHook, onRecordChanged?:import('./observer.js').RecordCallback, now?:()=>number, hold_turn_ms?:number, poll_interval_ms?:number, wait?:(ms:number)=>Promise<void>}} options
 */
export function createExternalWaitService({
  store,
  observer,
  bd,
  run,
  resume = async () => ({ ok: false, reason: 'resume_unwired' }),
  onRecordChanged,
  now = () => Date.now(),
  hold_turn_ms = HOLD_BUDGET.turn_seconds * 1000,
  poll_interval_ms,
  wait = sleep
}) {
  /** @type {Map<string, Promise<void>>} */
  const writes = new Map();

  /**
   * @param {string} workspace
   * @param {string} bead_id
   */
  function writeKey(workspace, bead_id) {
    return JSON.stringify([workspace, bead_id]);
  }

  /**
   * List records with whether their bead key write is still in flight; the
   * durable record shape stays unchanged.
   *
   * @param {string} workspace
   * @returns {Array<WaitRecord & { key_write_pending: boolean }>}
   */
  function listRecords(workspace) {
    return store.list(workspace).map((record) => ({
      ...record,
      key_write_pending: writes.has(writeKey(workspace, record.bead_id))
    }));
  }

  /**
   * Publish service-owned mutations after metadata settlement, including failures.
   *
   * @param {string} workspace
   * @param {string} wait_id
   */
  async function notifyChanged(workspace, wait_id) {
    const record = store.get(workspace, wait_id);
    if (record && onRecordChanged) {
      await onRecordChanged(workspace, record);
    }
  }

  /**
   * Keep stop's unset after an in-flight detach set, including across records
   * registered for the same bead after a stop.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @param {()=>Promise<void>} write
   */
  function writeMetadata(workspace, bead_id, write) {
    const key = writeKey(workspace, bead_id);
    const previous = writes.get(key) || Promise.resolve();
    const pending = previous
      .catch(() => {})
      .then(write)
      .finally(() => {
        if (writes.get(key) === pending) {
          writes.delete(key);
        }
      });
    writes.set(key, pending);
    return pending;
  }

  /**
   * @param {string} workspace
   * @param {WaitRecord} record
   */
  async function detach(workspace, record) {
    store.update(workspace, record.wait_id, (current) => {
      current.stage = 'detached';
    });
    try {
      await writeMetadata(workspace, record.bead_id, () =>
        bd.setExternalWait(workspace, record.bead_id, record.wait_id)
      );
      return null;
    } catch (error) {
      store.update(workspace, record.wait_id, (current) => {
        current.last_error =
          error instanceof Error ? error.message : String(error);
      });
      return failure(500, 'bead_write_failed');
    } finally {
      await notifyChanged(workspace, record.wait_id);
    }
  }

  /**
   * @param {string} workspace
   * @param {any} body
   */
  async function register(workspace, body) {
    if (!validRegistration(body)) {
      return failure(400, 'bad_request');
    }
    const existing = store.findByBead(workspace, body.bead_id);
    if (existing) {
      return { ...failure(409, 'wait_exists'), wait_id: existing.wait_id };
    }
    // Only registration fields cross this boundary; observations are server-owned.
    const owner =
      body.owner.kind === 'worker'
        ? { kind: 'worker', attempt_id: body.owner.attempt_id }
        : {
            kind: 'session',
            session_ref: body.owner.session_ref,
            session_pid: body.owner.session_pid,
            session_start: body.owner.session_start
          };
    let record = store.insert(workspace, {
      root_dir: workspace,
      bead_id: body.bead_id,
      owner: /** @type {import('./store.js').Owner} */ (owner),
      worktree: body.worktree,
      execution_sha: body.execution_sha,
      stage: 'hold',
      budget: { turns_total: HOLD_BUDGET.turns_total, turns_used: 0 },
      next_observation_at: new Date(now()).toISOString(),
      jobs: body.jobs.map((/** @type {any} */ job) => ({
        adapter: job.adapter,
        submitted_at: job.submitted_at,
        log_path: job.log_path,
        ...(job.expected === undefined ? {} : { expected: job.expected }),
        ...(job.adapter === 'slurm'
          ? {
              ssh_host: job.ssh_host,
              job_id: job.job_id,
              ...(job.scheduler_submit_time === undefined
                ? {}
                : { scheduler_submit_time: job.scheduler_submit_time })
            }
          : {
              pid: job.pid,
              workdir: job.workdir,
              ...(job.process_start === undefined
                ? {}
                : { process_start: job.process_start })
            })
      }))
    });
    await observer.observeRecord(workspace, record.wait_id);
    record = /** @type {WaitRecord} */ (store.get(workspace, record.wait_id));
    if (record.stage !== 'hold' && record.stage !== 'done') {
      return failure(409, 'invalid_stage');
    }
    const decision = registrationDecision(record.jobs);
    if (decision === 'done' && record.stage === 'hold') {
      record = store.update(workspace, record.wait_id, (current) => {
        current.stage = 'done';
      });
    } else if (decision === 'detached') {
      const error = await detach(workspace, record);
      if (error) {
        return error;
      }
    }
    return { ok: true, wait_id: record.wait_id, decision, ...summary(record) };
  }

  /**
   * @param {string} workspace
   * @param {string} wait_id
   */
  async function hold(workspace, wait_id) {
    let record = store.get(workspace, wait_id);
    if (!record) {
      return failure(404, 'not_found');
    }
    if (record.stage === 'done') {
      return { state: 'done', ...summary(record) };
    }
    if (record.stage !== 'hold') {
      return failure(409, 'invalid_stage');
    }
    if (holdDecision(record).decision === 'detached') {
      const error = await detach(workspace, record);
      if (error) {
        return error;
      }
      record = /** @type {WaitRecord} */ (store.get(workspace, wait_id));
      return { state: record.stage, ...summary(record) };
    }
    record = store.update(workspace, wait_id, (current) => {
      current.budget.turns_used += 1;
    });
    const deadline = now() + hold_turn_ms;
    const interval = Math.min(30000, poll_interval_ms ?? 30000);
    for (;;) {
      if (Date.parse(record.next_observation_at) <= now()) {
        await observer.observeRecord(workspace, wait_id);
      }
      record = store.get(workspace, wait_id);
      if (!record) {
        return failure(404, 'not_found');
      }
      if (record.stage !== 'hold') {
        return { state: record.stage, ...summary(record) };
      }
      const remaining = deadline - now();
      if (remaining <= 0) {
        return { state: 'running', ...summary(record) };
      }
      await wait(
        Math.min(
          interval,
          remaining,
          Math.max(1000, Date.parse(record.next_observation_at) - now())
        )
      );
      record = store.get(workspace, wait_id);
      if (!record) {
        return failure(404, 'not_found');
      }
      if (record.stage !== 'hold' || now() >= deadline) {
        return {
          state: record.stage === 'hold' ? 'running' : record.stage,
          ...summary(record)
        };
      }
    }
  }

  /**
   * @param {string} workspace
   * @param {string} wait_id
   */
  function get(workspace, wait_id) {
    return store.get(workspace, wait_id) || failure(404, 'not_found');
  }

  /**
   * @param {string} workspace
   * @param {string} wait_id
   */
  async function check(workspace, wait_id) {
    const record = store.get(workspace, wait_id);
    if (!record) {
      return failure(404, 'not_found');
    }
    if (record.stage !== 'hold' && record.stage !== 'detached') {
      return failure(409, 'invalid_stage');
    }
    await observer.observeRecord(workspace, wait_id);
    return get(workspace, wait_id);
  }

  /**
   * @param {string} workspace
   * @param {string} wait_id
   * @param {string} [bead_id] - Required only for a metadata key without a record.
   */
  async function stop(workspace, wait_id, bead_id) {
    const record = store.get(workspace, wait_id);
    if (!record) {
      if (bead_id && bd.readExternalWait) {
        const readExternalWait = bd.readExternalWait;
        try {
          let matched = false;
          await writeMetadata(workspace, bead_id, async () => {
            if ((await readExternalWait(workspace, bead_id)) === wait_id) {
              await bd.unsetExternalWait(workspace, bead_id);
              matched = true;
            }
          });
          return matched
            ? { ok: true, stage: 'stopped', bead_id }
            : failure(409, 'wait_changed');
        } catch {
          return failure(500, 'bead_write_failed');
        }
      }
      return failure(404, 'not_found');
    }
    if (['done', 'resumed', 'stopped'].includes(record.stage)) {
      // 종단 레코드에 키만 남은 경우(§3 fail-closed 잔재)는 stop이 키를 지운다.
      if (bd.readExternalWait) {
        const readExternalWait = bd.readExternalWait;
        try {
          let matched = false;
          await writeMetadata(workspace, record.bead_id, async () => {
            if (
              (await readExternalWait(workspace, record.bead_id)) === wait_id
            ) {
              await bd.unsetExternalWait(workspace, record.bead_id);
              matched = true;
            }
          });
          if (matched) {
            return { ok: true, stage: record.stage, bead_id: record.bead_id };
          }
        } catch {
          return failure(500, 'bead_write_failed');
        }
      }
      return failure(409, 'invalid_stage');
    }
    store.update(workspace, wait_id, (current) => {
      current.stage = 'stopped';
    });
    try {
      await writeMetadata(workspace, record.bead_id, () =>
        bd.unsetExternalWait(workspace, record.bead_id)
      );
    } catch (error) {
      store.update(workspace, wait_id, (current) => {
        current.last_error =
          error instanceof Error ? error.message : String(error);
      });
      return failure(500, 'bead_write_failed');
    } finally {
      await notifyChanged(workspace, wait_id);
    }
    return get(workspace, wait_id);
  }

  /**
   * @param {string} workspace
   * @param {string} wait_id
   * @param {unknown} mode
   */
  async function resumeWait(workspace, wait_id, mode) {
    if (mode !== 'fork' && mode !== 'fresh' && mode !== 'session') {
      return failure(400, 'bad_request');
    }
    const record = store.get(workspace, wait_id);
    if (!record) {
      return failure(404, 'not_found');
    }
    if (
      record.stage !== 'completing' ||
      !(record.owner.kind === 'session' || record.resume?.error) ||
      (mode === 'session' && record.owner.kind !== 'session')
    ) {
      return failure(409, 'resume_not_allowed');
    }
    if (resumeBlocked(record.resume, mode)) {
      return failure(409, 'resume_reserved');
    }
    try {
      const result = await resume(workspace, wait_id, mode);
      return result.ok ? result : failure(409, result.reason);
    } finally {
      await notifyChanged(workspace, wait_id);
    }
  }

  /**
   * The owned part of a takeover: re-check the exposure on the current record,
   * persist the `pending` marker before ssh, run `sjob takeover`, then replace
   * the job in place, drop the marker, or leave it `unknown` for recovery.
   *
   * @param {string} workspace
   * @param {string} wait_id
   * @param {{cpus:number, mem_gb:number}} request
   * @param {import('./store.js').Run} runner
   */
  async function takeoverOwned(workspace, wait_id, request, runner) {
    const record = store.get(workspace, wait_id);
    if (!record) {
      return failure(404, 'not_found');
    }
    const job = takeoverTarget(record);
    if (!job) {
      return record.jobs.some(
        (item) => item.adapter === 'slurm' && item.takeover
      )
        ? failure(409, 'busy', TAKEOVER_BUSY_MESSAGE)
        : failure(409, 'takeover_not_allowed', TAKEOVER_NOT_ALLOWED_MESSAGE);
    }
    if (!SSH_HOST_RE.test(job.ssh_host)) {
      return failure(409, 'takeover_not_allowed', TAKEOVER_NOT_ALLOWED_MESSAGE);
    }
    const requested_at = new Date(now()).toISOString();
    /**
     * Mutate the one slurm job this takeover marked.
     *
     * @param {(current:WaitRecord, target:import('./store.js').SlurmJob)=>void} mutate
     */
    const updateTarget = (mutate) =>
      store.update(workspace, wait_id, (current) => {
        const target = current.jobs[0];
        if (
          current.jobs.length !== 1 ||
          target.adapter !== 'slurm' ||
          target.job_id !== job.job_id
        ) {
          throw new Error('Takeover target changed');
        }
        mutate(current, target);
      });
    updateTarget((current, target) => {
      target.takeover = {
        state: 'pending',
        requested_at,
        cpus: request.cpus,
        mem_gb: request.mem_gb
      };
    });
    await notifyChanged(workspace, wait_id);
    const outcome = await requestTakeover(job, request, runner);
    try {
      if (outcome.kind === 'started') {
        updateTarget((current, target) => {
          current.jobs[0] = sjobLocalJob(target, outcome.result, requested_at);
          current.next_observation_at = new Date(now()).toISOString();
        });
        return /** @type {WaitRecord} */ (store.get(workspace, wait_id));
      }
      if (outcome.kind === 'refused') {
        updateTarget((current, target) => {
          delete target.takeover;
        });
        return failure(409, outcome.reason, outcome.message);
      }
      updateTarget((current, target) => {
        if (target.takeover) {
          target.takeover.state = 'unknown';
        }
      });
      return failure(
        outcome.reason === 'busy' ? 409 : 502,
        outcome.reason,
        outcome.message
      );
    } finally {
      await notifyChanged(workspace, wait_id);
    }
  }

  /**
   * `▶ 바로 실행` (UI-qbgj §3.4): move the record's single pending slurm job to
   * a local run on the same host, serialized with observation by the record's
   * operation lock. A second request while one owns the record is `busy`.
   *
   * @param {string} workspace
   * @param {string} wait_id
   * @param {{cpus?: unknown, mem_gb?: unknown}} request
   */
  async function takeover(workspace, wait_id, request) {
    const cpus = request?.cpus;
    const mem_gb = request?.mem_gb;
    if (
      typeof cpus !== 'number' ||
      !Number.isInteger(cpus) ||
      cpus < 1 ||
      typeof mem_gb !== 'number' ||
      !Number.isInteger(mem_gb) ||
      mem_gb < 1
    ) {
      return failure(400, 'bad_request');
    }
    if (!run) {
      return failure(500, 'takeover_unwired');
    }
    const runner = run;
    if (!store.get(workspace, wait_id)) {
      return failure(404, 'not_found');
    }
    const owned = await observer.withOperationLock(workspace, wait_id, () =>
      takeoverOwned(workspace, wait_id, { cpus, mem_gb }, runner)
    );
    return owned ? owned.value : failure(409, 'busy', TAKEOVER_BUSY_MESSAGE);
  }

  return {
    register,
    hold,
    get,
    check,
    stop,
    takeover,
    resume: resumeWait,
    listRecords,
    /** @param {ResumeHook} hook */
    setResume(hook) {
      resume = hook;
    },
    /** @param {import('./observer.js').RecordCallback|undefined} callback */
    setOnRecordChanged(callback) {
      onRecordChanged = callback;
    }
  };
}
