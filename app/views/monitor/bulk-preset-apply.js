/**
 * 여러 저장소 설정 창의 `워커` 탭 — 일괄 적용의 계획과 실행
 * (UI-8ncz §4.1, 진입점은 UI-nu43 §3.3, 두 경로는 UI-628r §4.2).
 *
 * 서버에는 다중 저장소 op가 없다. 이 모듈은 선택한 저장소마다 기존 단일 저장소
 * op를 **순차**로 보내고 저장소별 결과를 모은다. 병렬로 보내면 서버의 kv 쓰기와
 * 모니터 재빌드가 뒤섞이고 revision 충돌을 뒤늦게 발견한다. 렌더·전송·채택은
 * 일괄 pane이 소유하고 이 모듈은 순수하다.
 *
 * 경로는 둘이다. 폼이 고른 프리셋과 똑같으면 `apply-impl-preset-global` 한 번
 * (큐에 프리셋 기록이 선다), 그 밖에는 `set-session-defaults`와
 * `worker-queue-set-orchestration-defaults` 두 번이다.
 */

/**
 * @typedef {Object} BulkTarget
 * @property {string} root_dir
 * @property {string} name
 * @property {'preset'|'form'} mode - preset op 하나로 쓸지 kv·queue 두 op로
 * 쓸지 (§4.2).
 * @property {Record<string, any>} [payload] - `apply-impl-preset-global` body.
 * @property {Record<string, any>} [kv_payload] - `set-session-defaults` body.
 * @property {Record<string, any>} [queue_payload] - 큐 op body.
 */

/**
 * @typedef {Object} BulkFormValues
 * @property {Record<string, string|null>} kv_values - 18키 전부, 빈 값은 `null`.
 * @property {Record<string, string|null>} queue_values - 큐 6키 전부.
 * @property {boolean} equals_preset - 폼이 고른 프리셋과 같은지 (§4.2).
 */

/**
 * @typedef {Object} BulkResult
 * @property {string} root_dir
 * @property {string} name
 * @property {'applied'|'partial'|'failed'|'skipped'} state
 * @property {string} detail - 상태를 설명하는 문장 (`applied`는 빈 문자열).
 */

/**
 * @typedef {Object} BulkPlan
 * @property {BulkTarget[]} targets
 * @property {string|null} disabled_reason - `null`이면 적용 버튼이 활성이다.
 */

/**
 * @typedef {Object} ApplyState
 * @property {boolean} kv - 실행 설정 쓰기가 applied 응답으로 확인된 적이
 * 있는가 (§4.2.1).
 * @property {boolean} queue - 오케스트레이션 쓰기가 applied 응답으로 확인된
 * 적이 있는가.
 * @property {string} detail - 결과 줄에 그대로 실릴 문장; state 판정과는
 * 별개로 마지막 응답의 것이 남는다.
 */

/** 프리셋 경로가 쓰는 op 이름. */
export const PRESET_APPLY_OP = 'apply-impl-preset-global';

/** 폼 경로의 kv op — 18키를 한 번에 얕게 병합한다. */
export const SESSION_DEFAULTS_OP = 'set-session-defaults';

/** 폼 경로의 큐 op — 6키를 CAS로 쓴다. */
export const ORCHESTRATION_OP = 'worker-queue-set-orchestration-defaults';

/** 프리셋 경로에서 kv만 반영된 저장소의 사유. */
const PRESET_QUEUE_UNAPPLIED = '오케스트레이션 값 미적용';

/** 폼 경로에서 kv만 반영된 저장소의 사유 (§4.2). */
const FORM_QUEUE_UNAPPLIED = '큐 충돌, 실행 설정만 저장';

/** 서버가 아무 말도 하지 않은 응답(no reply)의 실패 사유. */
const NO_REPLY = '요청이 처리되지 않았습니다';

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Membership test — `Set`과 배열을 모두 받는다. 일괄 pane은 `Set`을 들고 테스트는
 * 배열이 읽기 쉽다.
 *
 * @param {Iterable<string>|Set<string>} selected_roots
 * @param {string} root_dir
 * @returns {boolean}
 */
function isSelected(selected_roots, root_dir) {
  if (selected_roots instanceof Set) {
    return selected_roots.has(root_dir);
  }
  for (const value of selected_roots || []) {
    if (value === root_dir) {
      return true;
    }
  }
  return false;
}

/**
 * Initial selection — 절을 처음 열 때 고르는 것은 `auto_advance`가 켜진
 * 저장소다 (§3.1). 자동화가 꺼진 저장소는 목록에 남되 선택되지 않는다.
 *
 * @param {Array<Record<string, any>>} rows
 * @returns {string[]}
 */
export function defaultSelectedRoots(rows) {
  return (Array.isArray(rows) ? rows : [])
    .filter((row) => isRecord(row) && row.auto_advance === true)
    .map((row) => String(row.root_dir));
}

/**
 * Capability probe — 행의 키 존재로만 구 서버를 가른다 (UI-7yh2 결정 6). 값이
 * `null`이어도 키는 실려 오므로 `false`는 오직 구 서버다.
 *
 * @param {Array<Record<string, any>>} rows
 * @returns {boolean}
 */
export function supportsQuickFixLane(rows) {
  return (Array.isArray(rows) ? rows : []).some(
    (row) =>
      isRecord(row) && Object.hasOwn(row, 'quick_fix_orchestration_model')
  );
}

/**
 * Plan — 저장소별 요청과 비활성 사유를 계산한다. 넘기는 행은 `adopted`를 덮은
 * 최신 행이어야 한다: 큐 revision이 거기서 나온다.
 *
 * 프리셋을 골랐고 폼이 그 프리셋 그대로면 프리셋 경로, 그 밖에는 폼 경로다
 * (§4.2). 폼이 아예 없는 호출(행이 없어 폼을 그리지 못한 상태)은 프리셋 선택을
 * 요구한다.
 *
 * @param {Object} input
 * @param {Array<Record<string, any>>} input.rows - 보이는 저장소를 모니터 행
 * 순서대로, `adopted`를 덮은 상태로.
 * @param {Iterable<string>|Set<string>} input.selected_roots
 * @param {{ revision: number, presets: Array<Record<string, any>> }|null} input.preset_state
 * @param {string} input.preset_id
 * @param {BulkFormValues|null} [input.form] - 폼이 낸 24키 한 벌.
 * @param {boolean} [input.running] - 이미 실행 중이면 `true`.
 * @returns {BulkPlan}
 */
export function planBulkApply({
  rows,
  selected_roots,
  preset_state,
  preset_id,
  form = null,
  running = false
}) {
  const list = (Array.isArray(rows) ? rows : []).filter((row) => isRecord(row));
  const selected_rows = list.filter((row) =>
    isSelected(selected_roots, String(row.root_dir))
  );
  const preset = preset_state
    ? preset_state.presets.find((entry) => entry && entry.id === preset_id)
    : null;
  const has_form =
    isRecord(form) && isRecord(form.kv_values) && isRecord(form.queue_values);
  const preset_chosen =
    !!preset_state && typeof preset_id === 'string' && preset_id.length > 0;
  const use_preset =
    preset_chosen && (!has_form || (isRecord(form) && form.equals_preset));
  /** @type {BulkTarget[]} */
  const targets = [];
  for (const row of selected_rows) {
    const root_dir = String(row.root_dir);
    const name = typeof row.name === 'string' ? row.name : root_dir;
    const revision = typeof row.revision === 'number' ? row.revision : 0;
    if (use_preset) {
      targets.push({
        root_dir,
        name,
        mode: 'preset',
        payload: {
          preset_id,
          expected_revision: preset_state ? preset_state.revision : 0,
          expected_queue_revision: revision,
          root_dir
        }
      });
    } else if (isRecord(form)) {
      targets.push({
        root_dir,
        name,
        mode: 'form',
        kv_payload: { values: { ...form.kv_values }, root_dir },
        queue_payload: {
          values: { ...form.queue_values },
          root_dir,
          expected_revision: revision
        }
      });
    }
  }
  /** @type {string|null} */
  let disabled_reason = null;
  if (running === true) {
    disabled_reason = '적용 중입니다';
  } else if (!use_preset && !has_form) {
    disabled_reason = '적용할 실행 프리셋을 고르세요';
  } else if (targets.length === 0) {
    disabled_reason = '적용할 저장소를 고르세요';
  } else if (preset && preset.compatible === false) {
    disabled_reason =
      typeof preset.incompatibility_reason === 'string' &&
      preset.incompatibility_reason.length > 0
        ? preset.incompatibility_reason
        : '이 프리셋은 지금 설치된 카탈로그와 호환되지 않습니다';
  } else if (!supportsQuickFixLane(list)) {
    disabled_reason = '서버가 quick_fix 값을 받지 않습니다';
  }
  return { targets, disabled_reason };
}

/**
 * Human-readable 문장 — 오류 응답·예외를 결과 줄에 적는다. 서버가 문자열을 주지
 * 않으면 고정 문구를 쓴다: `undefined`를 결과 줄에 그리지 않는다.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function messageOf(value) {
  if (value instanceof Error) {
    return value.message;
  }
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }
  if (isRecord(value)) {
    if (typeof value.message === 'string' && value.message.length > 0) {
      return value.message;
    }
    if (typeof value.error === 'string' && value.error.length > 0) {
      return value.error;
    }
    if (isRecord(value.error)) {
      return messageOf(value.error);
    }
  }
  return NO_REPLY;
}

/**
 * Rejection은 서버가 `error` 필드로 말한다 — 그 필드가 있으면 아무것도 쓰이지
 * 않았다.
 *
 * @param {any} res
 * @returns {boolean}
 */
function isError(res) {
  return isRecord(res) && res.error !== undefined && res.error !== null;
}

/**
 * Display form of 결과 줄 한 항목 (§3.1 네 상태 문구). 두 절이 같은 문구를
 * 쓰므로 계정 절도 이 함수를 쓴다.
 *
 * @param {BulkResult} result
 * @returns {{ icon: string, text: string }}
 */
export function formatBulkResult(result) {
  if (result.state === 'applied') {
    return { icon: '✓', text: `${result.name} 적용됨` };
  }
  if (result.state === 'partial') {
    return { icon: '⚠', text: `${result.name} 부분 적용 — ${result.detail}` };
  }
  if (result.state === 'skipped') {
    return { icon: '–', text: `${result.name} 미실행` };
  }
  return { icon: '✕', text: `${result.name} 실패 — ${result.detail}` };
}

/**
 * Retry 집합 — 실패·부분 적용 저장소만 다시 고른다 (§3.1).
 *
 * @param {BulkResult[]} results
 * @returns {string[]}
 */
export function retryRootsOf(results) {
  return (Array.isArray(results) ? results : [])
    .filter((result) => result.state === 'failed' || result.state === 'partial')
    .map((result) => result.root_dir);
}

/**
 * Sequential 적용 — 선택한 저장소마다 그 저장소의 경로를 한 번씩 돈다.
 *
 * 응답 `queue`는 성공·실패와 무관하게 즉시 `adopt`한다 — 그 저장소의 다음
 * 계획이 읽는 revision이 최신이 된다. 큐 미적용이면 응답 revision으로 **한 번만**
 * 다시 보내고, 프리셋 revision 충돌(`conflict:true`)이면 남은 대상을 `skipped`로
 * 두고 멈춘다 — 바뀐 프리셋을 다시 읽은 뒤 사용자가 다시 적용해야 한다.
 *
 * @param {Object} input
 * @param {BulkTarget[]} input.targets
 * @param {(type: string, payload: Record<string, any>) => Promise<any>} input.send
 * @param {(root_dir: string, queue: any) => void} input.adopt
 * @param {(progress: { done: number, total: number, results: BulkResult[] }) => void} [input.onProgress]
 * @param {() => boolean} [input.isCancelled] - `true`면 남은 대상을 보내지 않는다.
 * @returns {Promise<BulkResult[]>}
 */
export async function runBulkApply({
  targets,
  send,
  adopt,
  onProgress,
  isCancelled
}) {
  /** @type {BulkResult[]} */
  const results = [];
  const total = targets.length;
  let stopped = false;
  for (const target of targets) {
    if (isCancelled?.() === true) {
      return results;
    }
    if (stopped) {
      results.push({
        root_dir: target.root_dir,
        name: target.name,
        state: 'skipped',
        detail: ''
      });
      onProgress?.({ done: results.length, total, results });
      continue;
    }
    const outcome =
      target.mode === 'form'
        ? await runFormTarget(target, send, adopt, isCancelled)
        : await runPresetTarget(target, send, adopt, isCancelled);
    results.push(outcome.result);
    onProgress?.({ done: results.length, total, results });
    if (outcome.cancelled) {
      return results;
    }
    stopped = outcome.stopped;
  }
  return results;
}

/**
 * Hand the 권위 있는 queue를 일괄 pane에 넘긴다. 실패 응답도 최신 revision을 싣고
 * 오므로 성공 여부를 보지 않는다.
 *
 * @param {(root_dir: string, queue: any) => void} adopt
 * @param {string} root_dir
 * @param {any} res
 */
function adoptQueue(adopt, root_dir, res) {
  if (isRecord(res) && isRecord(res.queue)) {
    adopt(root_dir, res.queue);
  }
}

/**
 * The revision a CAS retry should carry: the one the conflict response brought,
 * else the one already tried.
 *
 * @param {any} res
 * @param {unknown} fallback
 * @returns {unknown}
 */
function freshRevision(res, fallback) {
  return isRecord(res) &&
    isRecord(res.queue) &&
    typeof res.queue.revision === 'number'
    ? res.queue.revision
    : fallback;
}

/**
 * Verdict for one 저장소 (§4.2.1). kv 적용이 한 번이라도 확인되었으면 그 사실은
 * 재시도·예외를 넘어 살아남는다: 큐만 놓친 저장소는 `failed`가 아니라 `partial`
 * 이다.
 *
 * @param {BulkTarget} target
 * @param {ApplyState} state
 * @returns {BulkResult}
 */
function judgeTarget(target, state) {
  const base = { root_dir: target.root_dir, name: target.name };
  if (!state.kv) {
    return { ...base, state: 'failed', detail: state.detail || NO_REPLY };
  }
  if (!state.queue) {
    return {
      ...base,
      state: 'partial',
      detail: state.detail || PRESET_QUEUE_UNAPPLIED
    };
  }
  return { ...base, state: 'applied', detail: '' };
}

/**
 * Read one `apply-impl-preset-global` 응답 into the running state.
 *
 * @param {ApplyState} state
 * @param {any} res
 */
function readPresetResponse(state, res) {
  if (isError(res) || !isRecord(res)) {
    state.detail = isRecord(res) ? messageOf(res) : NO_REPLY;
    return;
  }
  if (res.applied === true) {
    state.kv = true;
    if (res.queue_applied === false) {
      state.detail = PRESET_QUEUE_UNAPPLIED;
      return;
    }
    state.queue = true;
    state.detail = '';
    return;
  }
  state.detail =
    res.conflict === true
      ? '프리셋이 방금 변경되었습니다'
      : '큐가 방금 변경되었습니다';
}

/**
 * The 프리셋 경로 of one 저장소: one op that writes kv and queue together, with
 * a single queue retry.
 *
 * @param {BulkTarget} target
 * @param {(type: string, payload: Record<string, any>) => Promise<any>} send
 * @param {(root_dir: string, queue: any) => void} adopt
 * @param {(() => boolean)|undefined} isCancelled
 * @returns {Promise<{ result: BulkResult, stopped: boolean, cancelled: boolean }>}
 */
async function runPresetTarget(target, send, adopt, isCancelled) {
  /** @type {ApplyState} */
  const state = { kv: false, queue: false, detail: '' };
  const payload = target.payload || {};
  let stopped = false;
  let cancelled = false;
  try {
    let res = await send(PRESET_APPLY_OP, { ...payload });
    adoptQueue(adopt, target.root_dir, res);
    readPresetResponse(state, res);
    // 취소 뒤에는 재시도를 보내지 않는다 (§4). 이미 받은 응답의 판정은 남겨
    // 그 저장소가 쓰였는지를 호출자가 알게 한다.
    if (isCancelled?.() === true) {
      cancelled = true;
    } else if (!isError(res) && isRecord(res) && res.queue_applied === false) {
      res = await send(PRESET_APPLY_OP, {
        ...payload,
        expected_queue_revision: freshRevision(
          res,
          payload.expected_queue_revision
        )
      });
      adoptQueue(adopt, target.root_dir, res);
      readPresetResponse(state, res);
    }
    if (!cancelled && !isError(res) && isRecord(res) && res.applied !== true) {
      stopped = res.conflict === true;
    }
  } catch (err) {
    state.detail = messageOf(err);
  }
  return { result: judgeTarget(target, state), stopped, cancelled };
}

/**
 * The 폼 경로 of one 저장소: kv 먼저, 큐 나중 (§4.2). 두 쓰기는 원자적이지
 * 않고 그 비원자성은 기존 계약이다 (UI-8ncz §1.1). 프리셋 기록을 세우거나 지우는
 * 일은 서버 판정에 맡기고 이 경로는 손대지 않는다.
 *
 * @param {BulkTarget} target
 * @param {(type: string, payload: Record<string, any>) => Promise<any>} send
 * @param {(root_dir: string, queue: any) => void} adopt
 * @param {(() => boolean)|undefined} isCancelled
 * @returns {Promise<{ result: BulkResult, stopped: boolean, cancelled: boolean }>}
 */
async function runFormTarget(target, send, adopt, isCancelled) {
  /** @type {ApplyState} */
  const state = { kv: false, queue: false, detail: '' };
  const queue_payload = target.queue_payload || {};
  let cancelled = false;
  try {
    const kv_res = await send(SESSION_DEFAULTS_OP, {
      ...(target.kv_payload || {})
    });
    if (isError(kv_res) || !isRecord(kv_res)) {
      state.detail = isRecord(kv_res) ? messageOf(kv_res) : NO_REPLY;
      return { result: judgeTarget(target, state), stopped: false, cancelled };
    }
    state.kv = true;
    state.detail = FORM_QUEUE_UNAPPLIED;
    if (isCancelled?.() === true) {
      cancelled = true;
      return { result: judgeTarget(target, state), stopped: false, cancelled };
    }
    let res = await send(ORCHESTRATION_OP, { ...queue_payload });
    adoptQueue(adopt, target.root_dir, res);
    if (isCancelled?.() === true) {
      cancelled = true;
    } else if (!isError(res) && isRecord(res) && res.applied === false) {
      res = await send(ORCHESTRATION_OP, {
        ...queue_payload,
        expected_revision: freshRevision(res, queue_payload.expected_revision)
      });
      adoptQueue(adopt, target.root_dir, res);
    }
    if (!isError(res) && isRecord(res) && res.applied === true) {
      state.queue = true;
      state.detail = '';
    }
  } catch (err) {
    state.detail = messageOf(err);
  }
  return { result: judgeTarget(target, state), stopped: false, cancelled };
}
