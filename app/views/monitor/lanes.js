/**
 * Monitor tab lane builder + the three monitor-only templates (UI-qrfo §8).
 *
 * The monitor is the Worker console's cross-repo superset, so the CARD
 * templates are Worker's (`paneTemplate`/`miniRow`/`candidateCard`) and only
 * three things are built here: the lane builder that merges every visible
 * workspace into five exclusive lanes, the waiting lane's per-repo group
 * header (which carries that repo's four workspace-scoped controls), and the
 * top bar (master automation toggle + overall counts).
 *
 * 배타 우선순위는 `running > pr_wait > queue > runnable > done`이다 — 실행중인
 * 버드는 `queue` 레인에 그대로 남아 있고 conflict-resolution attempt는 `pr_wait`
 * 소속 버드에서도 돌기 때문에, 배타 없이 그리면 같은 버드가 두 레인에 동시에
 * 나타난다. `runnable`은 서버가 이미 레인 소속 버드를 빼고 보내지만, 같은
 * 규약을 클라이언트에서도 한 번 더 건다 (스냅샷 사이의 경합).
 *
 * 대기 레인의 레포 그룹은 **`workspaces_state`를 돌며** 만든다. 큐가 빈 레포에도
 * 헤더가 렌더되어야 하기 때문이다 — 자동 진행이 꺼져 큐가 빈 레포가 바로 그
 * 상태를 풀어야 하는 레포다 (§6).
 */
import { html } from 'lit-html';
import { CLOSED_RANGE_OPTIONS } from '../../data/closed-range.js';
import {
  formatRelativeTime,
  formatTimestampLocal
} from '../../utils/relative-time.js';
import { sumAttemptUsage } from '../../utils/token-usage.js';
import { formatElapsed } from '../worker/running-grid.js';

/**
 * @import { MiniItem } from '../worker/lanes.js'
 */

/**
 * Lower bound on a repo's concurrency cap, mirroring the server's `MIN_SLOTS`
 * (`server/worker/queue-store.js`). The server rejects an out-of-bound value
 * rather than clamping it, so the input carries the bound.
 */
export const MIN_SLOTS = 1;

/**
 * 하트비트가 "살아있음"으로 읽히는 창 (UI-53es §1). 이 안에서 마지막 로그
 * 이벤트가 있었으면 밝은 점, 넘으면 흐린 점 + 경과 텍스트.
 */
export const HEARTBEAT_FRESH_MS = 60_000;

/**
 * 완료 종류의 표시 이름. 여기 없는 종류는 서버가 준 문자열 그대로 싣고 warn
 * 색으로 읽힌다 — 모르는 종료를 "정상"으로 칠하지 않는다.
 *
 * @type {Record<string, string>}
 */
const DONE_KIND_LABELS = {
  auto_merge: '자동 머지',
  merged: '머지',
  merge: '머지',
  pr_stop: 'PR 중단',
  stopped: '중단',
  failed: '실패'
};

/**
 * Kinds that read as a clean finish; 나머지는 전부 warn 색으로 그린다.
 *
 * @type {ReadonlySet<string>}
 */
const DONE_KIND_SUCCESS = new Set(['auto_merge', 'merged', 'merge', 'done']);

/**
 * Which live state wins when one bead carries several unfinished attempts —
 * 살아 있는 세션이 멈춘 것보다, 멈춘 것이 실패한 것보다 먼저 읽혀야 한다.
 *
 * @type {Record<string, number>}
 */
const RUN_STATE_RANK = { running: 3, paused: 2, failed: 1 };

/**
 * @typedef {MiniItem & {
 *   root_dir: string,
 *   workspace_name: string,
 *   expected_revision: number,
 *   attempt_id?: string|null,
 *   run_state?: 'running'|'paused'|'failed',
 *   can_pause?: boolean,
 *   can_resume?: boolean,
 *   started_at?: number|null,
 *   last_event_at?: number|null,
 *   model?: string|null,
 *   queue_position?: number,
 *   queue_index?: number,
 *   queue_length?: number,
 *   place_index?: number,
 *   done_kind?: string|null
 * }} MonitorItem
 */

/**
 * @typedef {Object} MonitorQueueGroup
 * @property {string} root_dir
 * @property {string} name
 * @property {boolean} auto_advance
 * @property {boolean} auto_merge
 * @property {number} slots
 * @property {number} revision - 이 workspace의 CAS revision. 헤더의 네 제어가
 * 그대로 실어 보내는 값이므로, 파이프라인이 빈 레포에서도 반드시 있어야 한다.
 * @property {Record<string, string>} exec_defaults
 * @property {MonitorItem[]} items
 */

/**
 * @typedef {Object} MonitorLanes
 * @property {MonitorItem[]} runnable
 * @property {MonitorItem[]} queue - 전 레포를 합친 대기 레인 — pane header의
 * count와 마스터 KPI가 읽는 값이다.
 * @property {MonitorQueueGroup[]} queue_groups - 대기 레인의 레포별 그룹 (repo
 * header + 그 workspace의 CAS 제어).
 * @property {MonitorItem[]} running
 * @property {MonitorItem[]} pr_wait
 * @property {MonitorItem[]} done
 * @property {{ total: number, both_on: number }} automation
 */

/**
 * Pick the newest attempt of a bead that has already ENDED — 완료 종류는 여기서만
 * 파생되고, 짝이 되는 기록이 없으면 종류 표기를 생략한다 (fail-quiet).
 *
 * @param {Record<string, any>} attempts
 * @param {string} bead_id
 * @returns {any|null}
 */
export function latestTerminalAttempt(attempts, bead_id) {
  /** @type {any|null} */
  let best = null;
  let best_at = -Infinity;
  for (const attempt of Object.values(attempts)) {
    if (
      !attempt ||
      attempt.bead_id !== bead_id ||
      attempt.status === 'running'
    ) {
      continue;
    }
    const at =
      typeof attempt.finished_at === 'number'
        ? attempt.finished_at
        : typeof attempt.started_at === 'number'
          ? attempt.started_at
          : 0;
    if (at >= best_at) {
      best_at = at;
      best = attempt;
    }
  }
  return best;
}

/**
 * Fold one repo's UNFINISHED attempts onto the beads they belong to — 같은
 * 버드에 둘이 붙어 있으면(일반 실행 + conflict-resolution) 더 최근에 시작한 쪽이
 * 그 버드의 라이브 지표가 된다.
 *
 * 실행중 레인은 `running` attempt만이 아니라 leaf paused와 아직 처리되지 않은
 * 실패까지 받는다 — 스펙 §8의 조작 표가 이 레인에 재개(`worker-attempt-resume`)와
 * 실패 정리(`worker-attempt-dismiss`)를 두므로, running만 실으면 두 액션에 도달할
 * 경로가 없다. 실패 판정은 Worker 탭 배너와 같다: 뒤에 온 attempt가 대체했거나,
 * 완료 레인 진입이 해소했거나, ✕로 닫혔으면 미처리 실패가 아니다.
 *
 * @param {Record<string, any>} attempts
 * @param {Map<string, number>} done_at_by_bead
 * @returns {Map<string, { attempt_id: string, run_state: 'running'|'paused'|'failed', started_at: number|null, last_event_at: number|null, model: string|null, usage: any, can_pause: boolean, can_resume: boolean }>}
 */
export function activeByBead(attempts, done_at_by_bead) {
  const values = /** @type {any[]} */ (Object.values(attempts || {}));
  /** @type {Set<string>} */
  const resumed_from_ids = new Set();
  /** @type {Map<string, string>} */
  const last_attempt_by_bead = new Map();
  for (const a of values) {
    if (!a || typeof a.bead_id !== 'string') {
      continue;
    }
    if (typeof a.resumed_from === 'string' && a.resumed_from.length > 0) {
      resumed_from_ids.add(a.resumed_from);
    }
    last_attempt_by_bead.set(a.bead_id, a.attempt_id);
  }

  /** @type {Map<string, any>} */
  const map = new Map();
  for (const a of values) {
    if (!a || typeof a.bead_id !== 'string' || a.bead_id.length === 0) {
      continue;
    }
    /** @type {'running'|'paused'|'failed'|null} */
    let run_state = null;
    if (a.status === 'running') {
      run_state = 'running';
    } else if (a.status === 'paused' && !resumed_from_ids.has(a.attempt_id)) {
      run_state = 'paused';
    } else if (a.status === 'failed' || a.status === 'orphaned') {
      const done_at = done_at_by_bead.get(a.bead_id);
      const resolved_by_done =
        typeof done_at === 'number' &&
        done_at > 0 &&
        typeof a.finished_at === 'number' &&
        done_at >= a.finished_at;
      if (
        last_attempt_by_bead.get(a.bead_id) === a.attempt_id &&
        !resolved_by_done &&
        typeof a.dismissed_at !== 'number'
      ) {
        run_state = 'failed';
      }
    }
    if (!run_state) {
      continue;
    }
    const started_at = typeof a.started_at === 'number' ? a.started_at : null;
    const prior = map.get(a.bead_id);
    if (prior) {
      const prior_rank = RUN_STATE_RANK[prior.run_state];
      const rank = RUN_STATE_RANK[run_state];
      if (
        prior_rank > rank ||
        (prior_rank === rank && (prior.started_at ?? 0) > (started_at ?? 0))
      ) {
        continue;
      }
    }
    const has_session =
      typeof a.session_id === 'string' && a.session_id.length > 0;
    map.set(a.bead_id, {
      attempt_id: typeof a.attempt_id === 'string' ? a.attempt_id : '',
      run_state,
      started_at,
      last_event_at:
        typeof a.last_event_at === 'number' ? a.last_event_at : null,
      model: typeof a.model === 'string' ? a.model : null,
      usage: sumAttemptUsage(attempts, a.bead_id),
      can_pause: run_state === 'running' && has_session,
      can_resume:
        run_state !== 'running' &&
        has_session &&
        !resumed_from_ids.has(a.attempt_id)
    });
  }
  return map;
}

/**
 * The ⛔ / ♻️ chip an admission record renders as (Worker 탭 `admissionBadge`와
 * 같은 산식 — 표시 통과 후 적재가 거부되는 것이 정상 경로이고, 그 사유가 카드에
 * 붙는다, §4).
 *
 * @param {Record<string, any>} admission
 * @param {string} bead_id
 * @returns {string}
 */
function admissionBadge(admission, bead_id) {
  const record = admission[bead_id];
  if (!record) {
    return '';
  }
  if (record.stale === true) {
    return '♻️ stale→재리뷰';
  }
  const reason = typeof record.reason === 'string' ? record.reason : '';
  const sep = reason.indexOf(':');
  if (sep > 0 && sep < reason.length - 1) {
    return `⛔ ${reason.slice(0, sep)} (${reason.slice(sep + 1)})`;
  }
  return `⛔ ${reason}`;
}

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function objectOf(value) {
  return value && typeof value === 'object'
    ? /** @type {Record<string, any>} */ (value)
    : {};
}

/**
 * Merge the aggregated snapshot into the five exclusive lanes.
 *
 * @param {Array<Record<string, any>>|null|undefined} workspaces - 파이프라인이
 * 있는 레포만 실린 heavy array.
 * @param {Array<Record<string, any>>|null|undefined} [workspaces_state] - 모든
 * visible 레포의 제어 상태 (파이프라인이 빈 레포 포함).
 * @param {{ done_since?: number }} [options] - `done_since`는 Worker 탭과 같은
 * `closedRangeSince()` 하한이다 (§7). 생략하면 필터 없음 — 기존 호출부와
 * 호환된다. `added_at`이 없는 완료 엔트리는 기간으로 판정할 수 없으므로 필터를
 * 적용하지 않고 항상 남긴다 (Worker 탭과 같은 규약, §10).
 * @returns {MonitorLanes}
 */
export function buildLanes(workspaces, workspaces_state, options) {
  const list = Array.isArray(workspaces) ? workspaces : [];
  const states = Array.isArray(workspaces_state) ? workspaces_state : [];
  const done_since =
    options && typeof options.done_since === 'number'
      ? options.done_since
      : undefined;

  /** @type {Map<string, Record<string, any>>} */
  const state_by_root = new Map();
  for (const s of states) {
    if (s && typeof s.root_dir === 'string') {
      state_by_root.set(s.root_dir, s);
    }
  }

  /** @type {MonitorItem[]} */
  const runnable = [];
  /** @type {MonitorItem[]} */
  const running = [];
  /** @type {MonitorItem[]} */
  const pr_wait = [];
  /** @type {MonitorItem[]} */
  const queue = [];
  /** @type {MonitorItem[]} */
  const done = [];
  /** @type {Map<string, MonitorItem[]>} */
  const queue_by_root = new Map();

  for (const workspace of list) {
    if (!workspace || typeof workspace.root_dir !== 'string') {
      continue;
    }
    const root_dir = workspace.root_dir;
    const workspace_name = workspace.name || root_dir;
    const state = state_by_root.get(root_dir);
    // 파이프라인 항목의 CAS 토큰도 `workspaces_state`가 먼저다: 두 값은 같은
    // 스냅샷에서 나오지만, 제어 상태 쪽이 모든 레포를 덮으므로 한 레포에 대해
    // 카드와 그룹 헤더가 서로 다른 revision을 말하는 일이 없다.
    const expected_revision =
      state && typeof state.revision === 'number'
        ? state.revision
        : typeof workspace.revision === 'number'
          ? workspace.revision
          : 0;
    const attempts = objectOf(workspace.attempts);
    const titles = objectOf(workspace.bead_titles);
    const observations = objectOf(workspace.pr_observations);
    const admission = objectOf(workspace.admission);
    const revise_parked = objectOf(workspace.revise_parked);
    const merge_state = objectOf(workspace.merge_queue_state);
    const merge_queue = Array.isArray(workspace.merge_queue)
      ? workspace.merge_queue
      : [];
    /** @type {Set<string>} */
    const merge_queued = new Set(
      merge_queue
        .filter((/** @type {any} */ e) => e && typeof e.bead_id === 'string')
        .map((/** @type {any} */ e) => e.bead_id)
    );
    const queue_lane = Array.isArray(workspace.queue) ? workspace.queue : [];
    const done_lane = Array.isArray(workspace.done) ? workspace.done : [];
    /** @type {Map<string, number>} */
    const done_at_by_bead = new Map();
    for (const entry of done_lane) {
      if (
        entry &&
        typeof entry.bead_id === 'string' &&
        typeof entry.added_at === 'number'
      ) {
        done_at_by_bead.set(entry.bead_id, entry.added_at);
      }
    }

    /**
     * @param {string} bead_id
     * @returns {{ id: string, title: string, root_dir: string, workspace_name: string, expected_revision: number, draggable: boolean }}
     */
    const base = (bead_id) => ({
      id: bead_id,
      title: titles[bead_id] || bead_id,
      root_dir,
      workspace_name,
      expected_revision,
      // 모니터에는 드래그 컨트롤러가 없다 — 순서 변경은 카드의 ↑/↓ 버튼이 한다.
      draggable: false
    });

    // 배타 우선순위: 상위 레인에 잡힌 버드는 하위 레인에서 제외한다.
    /** @type {Set<string>} */
    const claimed = new Set();

    for (const [bead_id, live] of activeByBead(attempts, done_at_by_bead)) {
      claimed.add(bead_id);
      running.push({
        ...base(bead_id),
        lane: 'running',
        attempt_id: live.attempt_id,
        run_state: live.run_state,
        can_pause: live.can_pause,
        can_resume: live.can_resume,
        started_at: live.started_at,
        last_event_at: live.last_event_at,
        model: live.model,
        usage: live.usage,
        badges:
          live.run_state === 'paused'
            ? ['⏸ 일시정지']
            : live.run_state === 'failed'
              ? ['⚠ 실패']
              : [],
        alert: live.run_state === 'failed'
      });
    }

    for (const entry of Array.isArray(workspace.pr_wait)
      ? workspace.pr_wait
      : []) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      const observed = objectOf(observations[bead_id]);
      const pr = objectOf(observed.pr);
      const queued = merge_queued.has(bead_id);
      const active = merge_state.active === bead_id;
      pr_wait.push({
        ...base(bead_id),
        lane: 'pr_wait',
        pr_number: typeof pr.number === 'number' ? pr.number : null,
        pr_url: typeof pr.url === 'string' ? pr.url : undefined,
        external: entry.external === true,
        usage: sumAttemptUsage(attempts, bead_id),
        // 머지 큐에 이미 서 있으면 남은 조작은 자리를 포기하는 것뿐이다
        // (Worker 탭 [취소]와 같은 규약).
        merge_action: !queued,
        merge_enabled: true,
        cancel_action: queued,
        cancel_enabled: !active,
        discard_action: true,
        discard_enabled: !active
      });
    }

    for (let i = 0; i < queue_lane.length; i++) {
      const entry = queue_lane[i];
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      const parked = revise_parked[bead_id];
      /** @type {MonitorItem} */
      const item = {
        ...base(bead_id),
        lane: 'queue',
        reason: admissionBadge(admission, bead_id),
        // 순번은 레인에서의 디스패치 순서이므로, 실행중으로 빠진 버드를 건너뛴
        // 뒤의 인덱스가 아니라 레인 자체의 자리를 쓴다.
        queue_position: i + 1,
        queue_index: i,
        queue_length: queue_lane.length,
        badges: parked ? ['⏸ REVISE 파킹'] : [],
        alert: !!parked,
        revise_action: !!parked,
        revise_enabled: !!parked,
        revise_title: parked
          ? parked.notes_tail
            ? `REVISE findings (자세히는 카드 클릭 → 이슈 상세):\n${parked.notes_tail}`
            : 'notes의 REVISE finding을 스펙에 반영하는 처분 세션을 띄웁니다'
          : ''
      };
      queue.push(item);
      const bucket = queue_by_root.get(root_dir);
      if (bucket) {
        bucket.push(item);
      } else {
        queue_by_root.set(root_dir, [item]);
      }
    }

    for (const entry of Array.isArray(workspace.runnable)
      ? workspace.runnable
      : []) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      runnable.push({
        ...base(bead_id),
        title: entry.title || titles[bead_id] || bead_id,
        lane: 'runnable',
        // 적재 자격은 서버가 이미 판정했다 (§4) — 카드의 [대기로 ↴]는 항상
        // 눌린다. 거부는 적재 시점의 admission이 판정하고 ⛔ 사유로 돌아온다.
        draggable: true,
        reason: admissionBadge(admission, bead_id),
        created_at: entry.created_at ?? undefined,
        updated_at: entry.updated_at ?? undefined,
        // route 칩만 쓰고 스테퍼는 그리지 않는다: 집계 payload에는 stage 요약이
        // 없고, `stepperTemplate`은 `stages` 없는 workflow를 빈 문자열로 돌려준다.
        workflow: /** @type {any} */ (
          entry.route
            ? { route: entry.route, chips: { route: entry.route } }
            : null
        ),
        // 적재 위치는 그 레포 대기 큐의 맨 뒤 (Worker 탭 [대기로 ↴]와 같다).
        place_index: queue_lane.length
      });
    }

    for (const entry of done_lane) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      // 기간 필터: `added_at`이 숫자로 있고 하한보다 이른 것만 뺀다.
      // `added_at`이 없는 엔트리는 기간을 판정할 수 없으므로 필터를 걸지 않고
      // 항상 남긴다 — 타임스탬프가 없다는 이유로 실제로 끝낸 일을 화면에서
      // 지우는 쪽이 더 나쁜 오답이다 (Worker 탭과 같은 규약, §10).
      if (
        done_since !== undefined &&
        typeof entry.added_at === 'number' &&
        entry.added_at < done_since
      ) {
        continue;
      }
      const terminal = latestTerminalAttempt(attempts, bead_id);
      done.push({
        ...base(bead_id),
        lane: 'done',
        done: true,
        usage: sumAttemptUsage(attempts, bead_id),
        done_at:
          typeof entry.added_at === 'number' ? entry.added_at : undefined,
        done_kind:
          terminal && typeof terminal.done_kind === 'string'
            ? terminal.done_kind
            : null,
        // 완료 레인의 머지 버튼은 이미 머지된 항목의 cleanup 재시도다 — 같은
        // 자리에 폐기를 두지 않는다 (`miniRow`의 done 변형 규약, §8).
        merge_action: true,
        merge_enabled: true
      });
    }
  }

  running.sort((a, b) => (b.last_event_at ?? 0) - (a.last_event_at ?? 0));
  done.sort((a, b) => (b.done_at ?? 0) - (a.done_at ?? 0));

  // 그룹은 `workspaces_state`를 돌며 만든다 — 큐가 빈 레포에도 헤더가 필요하다.
  // 제어 상태를 아예 못 받은 구버전 서버에서는 파이프라인 배열로 물러난다
  // (fail-quiet: 헤더가 사라지는 것보다 revision 0으로라도 그리는 편이 낫다).
  const group_sources =
    states.length > 0
      ? states
      : list.map((w) => ({
          root_dir: w && w.root_dir,
          name: w && w.name,
          auto_advance: w && w.auto_advance,
          auto_merge: w && w.auto_merge,
          slots: w && w.slots,
          revision: w && w.revision,
          exec_defaults: w && w.exec_defaults
        }));

  /** @type {MonitorQueueGroup[]} */
  const queue_groups = [];
  for (const source of group_sources) {
    if (!source || typeof source.root_dir !== 'string') {
      continue;
    }
    queue_groups.push({
      root_dir: source.root_dir,
      name: source.name || source.root_dir,
      auto_advance: source.auto_advance === true,
      auto_merge: source.auto_merge === true,
      slots:
        typeof source.slots === 'number' && source.slots >= MIN_SLOTS
          ? source.slots
          : MIN_SLOTS,
      revision: typeof source.revision === 'number' ? source.revision : 0,
      exec_defaults: objectOf(source.exec_defaults),
      items: queue_by_root.get(source.root_dir) || []
    });
  }

  return {
    runnable,
    queue,
    queue_groups,
    running,
    pr_wait,
    done,
    automation: {
      total: queue_groups.length,
      both_on: queue_groups.filter((g) => g.auto_advance && g.auto_merge).length
    }
  };
}

/**
 * The live heartbeat: 최근이면 활성 점, 오래됐으면 흐린 점 + "N분 전",
 * `last_event_at` 자체가 없으면 아무것도 그리지 않는다 (fail-quiet).
 *
 * @param {number|null|undefined} last_event_at
 * @param {number} now
 * @returns {import('lit-html').TemplateResult|''}
 */
export function heartbeatTemplate(last_event_at, now) {
  if (typeof last_event_at !== 'number' || !Number.isFinite(last_event_at)) {
    return '';
  }
  const age = now - last_event_at;
  const fresh = age < HEARTBEAT_FRESH_MS;
  return html`<span
    class="mon-beat${fresh ? ' mon-beat--live' : ''}"
    title=${`마지막 이벤트 ${formatTimestampLocal(last_event_at)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${fresh
      ? ''
      : html`<span class="mon-beat__age"
          >${formatRelativeTime(last_event_at, now)}</span
        >`}</span
  >`;
}

/**
 * The 실행중 카드의 라이브 지표 — 시계가 지나가는 것만으로 값이 바뀌는 유일한
 * 자리다 (경과·하트비트). 완료 카드의 종류 배지도 여기서 그린다: `miniRow`가
 * 모르는 사실이고, 잘못 칠하면 모르는 종료가 "정상"으로 읽힌다.
 *
 * @param {MonitorItem} item
 * @param {number} now
 * @returns {import('lit-html').TemplateResult|''}
 */
export function monitorLiveTemplate(item, now) {
  if (item.lane === 'running') {
    const elapsed =
      typeof item.started_at === 'number'
        ? formatElapsed(now - item.started_at)
        : '';
    return html`<span class="mon-live">
      ${heartbeatTemplate(item.last_event_at, now)}
      ${elapsed ? html`<span class="mon-live__elapsed">${elapsed}</span>` : ''}
      ${item.model
        ? html`<span class="mon-live__model">${item.model}</span>`
        : ''}
    </span>`;
  }
  if (item.lane === 'done') {
    const kind = item.done_kind || '';
    const label = kind ? DONE_KIND_LABELS[kind] || kind : '';
    if (!label) {
      return '';
    }
    return html`<span class="mon-live">
      <span
        class="mon-live__kind${DONE_KIND_SUCCESS.has(kind)
          ? ' mon-live__kind--ok'
          : ' mon-live__kind--warn'}"
        >${label}</span
      >
    </span>`;
  }
  if (item.lane === 'queue' && typeof item.queue_position === 'number') {
    return html`<span class="mon-live"
      ><span class="mon-live__pos">#${item.queue_position}</span></span
    >`;
  }
  return '';
}

/**
 * The waiting lane's per-repo group header — 그 레포의 workspace 단위 제어 넷을
 * 전부 싣는다 (§6 「레포별 제어」): `▶/⏸`(auto_advance) · `🔀`(auto_merge) ·
 * 슬롯 · 실행 기본값.
 *
 * 네 제어 모두 `data-root-dir`과 `data-revision`을 직접 싣는다. 파이프라인이 빈
 * workspace는 무거운 배열에 없으므로, 그 레포의 CAS 토큰은 그룹이 `workspaces_state`
 * 에서 받아 헤더에 실어 두는 것 말고는 도달할 길이 없다.
 *
 * @param {MonitorQueueGroup} group
 * @returns {import('lit-html').TemplateResult}
 */
export function monitorGroupHeaderTemplate(group) {
  const revision = String(group.revision);
  return html`<header
    class="mon-group__hd"
    data-root-dir=${group.root_dir}
    data-revision=${revision}
  >
    <span class="mon-group__name" title=${group.root_dir}>${group.name}</span>
    <span class="mon-group__count">${group.items.length}</span>
    <span class="mon-group__ops">
      <button
        type="button"
        class="mon-ctl mon-ctl--advance${group.auto_advance
          ? ' is-active'
          : ''}"
        data-root-dir=${group.root_dir}
        data-revision=${revision}
        data-on=${group.auto_advance ? 'false' : 'true'}
        aria-pressed=${group.auto_advance ? 'true' : 'false'}
        title=${group.auto_advance
          ? '자동 진행 켜짐 — 클릭하면 멈춥니다'
          : '자동 진행 꺼짐 — 클릭하면 대기 큐를 디스패치합니다'}
      >
        ${group.auto_advance ? '⏸' : '▶'}
      </button>
      <button
        type="button"
        class="mon-ctl mon-ctl--merge-auto${group.auto_merge
          ? ' is-active'
          : ''}"
        data-root-dir=${group.root_dir}
        data-revision=${revision}
        data-on=${group.auto_merge ? 'false' : 'true'}
        aria-pressed=${group.auto_merge ? 'true' : 'false'}
        title=${group.auto_merge
          ? '자동 머지 켜짐 — 클릭하면 끄고 이 레포의 머지 대기열을 비웁니다'
          : '자동 머지 꺼짐 — 클릭하면 자격이 생기는 PR을 계속 머지합니다'}
      >
        🔀
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        <span aria-hidden="true">⧉</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${MIN_SLOTS}
          step="1"
          data-root-dir=${group.root_dir}
          data-revision=${revision}
          aria-label=${`${group.name} 동시 실행 슬롯`}
          .value=${String(group.slots)}
        />
      </label>
      <button
        type="button"
        class="mon-ctl mon-ctl--exec"
        data-root-dir=${group.root_dir}
        data-revision=${revision}
        aria-haspopup="dialog"
        aria-label=${`${group.name} 실행 기본값`}
        title="실행 기본값"
      >
        ⚙
      </button>
    </span>
  </header>`;
}

/**
 * The monitor's top bar: 마스터 자동화 토글 · 전체 카운트 · 완료 기간 select ·
 * 전 레포 토큰·비용 합계 (§8).
 *
 * 분자는 두 축(`auto_advance` && `auto_merge`)이 모두 켜진 레포 수, 분모는 visible
 * 레포 수다. 전부 켜져 있으면 `⏹ 전체 자동화` — Worker 탭의 `⏵⏵`/`⏹` 표기와 같다.
 * 레포 필터는 두지 않는다: 대기 레인이 이미 레포별 그룹이고 나머지 레인은 카드
 * 뱃지가 레포를 말하므로, 필터는 같은 구분을 세 번째 방식으로 다시 하는 것이 된다
 * (§8).
 *
 * 완료 기간이 이 바에 있는 이유는 그 기간이 완료 레인과 토큰 KPI **둘 다**를
 * 지배하기 때문이다 (§7) — Worker 탭은 완료 pane의 `controls` 스트립에 두지만
 * 거기엔 토큰 KPI가 없다.
 *
 * @param {{
 *   automation: { total: number, both_on: number },
 *   counts: { running: number, queue: number, pr_wait: number },
 *   done_range: import('../../data/closed-range.js').ClosedRange,
 *   token_total: string|null,
 *   token_tooltip: string
 * }} model
 * @returns {import('lit-html').TemplateResult}
 */
export function monitorTopBarTemplate(model) {
  const { total, both_on } = model.automation;
  const all_on = total > 0 && both_on === total;
  const done_label =
    CLOSED_RANGE_OPTIONS.find((o) => o.value === model.done_range)?.label || '';
  return html`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${all_on ? ' is-active' : ''}"
      data-on=${all_on ? 'false' : 'true'}
      aria-pressed=${all_on ? 'true' : 'false'}
      ?disabled=${total === 0}
      title=${all_on
        ? '전 레포의 자동 진행·자동 머지를 함께 끕니다 (머지 대기열도 비워집니다)'
        : '전 레포의 자동 진행·자동 머지를 함께 켭니다'}
    >
      ${all_on ? '⏹ 전체 자동화' : `⏵⏵ 전체 자동화 ${both_on}/${total}`}
    </button>
    <div class="mon-kpi">
      <span class="mon-kpi__chip mon-kpi__chip--running"
        >실행 <b>${model.counts.running}</b></span
      >
      <span class="mon-kpi__chip mon-kpi__chip--queue"
        >대기 <b>${model.counts.queue}</b></span
      >
      <span class="mon-kpi__chip mon-kpi__chip--pr"
        >PR <b>${model.counts.pr_wait}</b></span
      >
      <select
        class="mon-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${model.done_range}
      >
        ${CLOSED_RANGE_OPTIONS.map(
          (o) =>
            html`<option
              value=${o.value}
              ?selected=${model.done_range === o.value}
            >
              ${o.label}
            </option>`
        )}
      </select>
      ${model.token_total
        ? html`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${model.token_tooltip}
            >${done_label} 완료 · 누적 ${model.token_total}</span
          >`
        : ''}
    </div>
  </div>`;
}
