/**
 * 대기 레인 드래그·드롭 컨트롤러 (UI-4tud §4.5).
 *
 * Worker 탭과 Monitor 탭이 **같은** DOM 식별자와 **같은** 계획기를 쓰도록, 두
 * 탭에 따로 있던 드래그 코드를 한 자리로 모은다. 드래그 소스는
 * `[data-drag-kind][data-bead-id][data-root-dir]`(선택 `[data-queue-index]`·
 * `[data-lane-id]`)이고 드롭 타깃은 `[data-drop][data-root-dir]`(선택
 * `[data-lane-id]`·`[data-lane-length]`)이다. 접힌 pane은 본문을 그리지 않으므로
 * `[data-lane]` 폴백으로 같은 타깃을 만든다 (UI-5ksp §4.4).
 *
 * 계획은 이 모듈이 아니라 `../monitor/drop-plan.js`가 소유한다. 여기서 하는 일은
 * 셋뿐이다: DOM에서 원천·대상을 읽고, 투영을 계획 모델(`DropModel`)로 옮기고,
 * 계획이 낸 op를 CAS 규약대로 보낸다. 연결 레인(chain)은 `cross_lanes`가 있을
 * 때만 존재하므로, Worker처럼 `getCrossLanes()`가 `null`인 탭에서는 chain 맵이
 * 비어 계획기가 chain 타깃을 스스로 거부한다 — 코드 분기가 아니라 데이터다.
 */
/**
 * @import { DropDrag, DropModel, DropPlan, DropTarget, LaneOp, LaneState, Op } from '../monitor/drop-plan.js'
 * @import { LaneModel } from './lane-model.js'
 */
import {
  adjacentProvenancePairs,
  laneProvenanceUpdates,
  planDrop
} from '../monitor/drop-plan.js';

/**
 * @typedef {Object} LaneDragOptions
 * @property {((type: string, payload?: unknown) => Promise<any>)|undefined} transport
 * @property {HTMLElement} console_el - `is-dragging` 토글 대상.
 * @property {() => LaneModel} getLanes - 계획이 설 바탕. `DropModel`이 여기서
 * 나온다.
 * @property {() => Array<Record<string, any>>|null} getWorkspaces - 서버
 * `monitor-pipeline`·`worker-queue` 스냅샷 항목 그대로. 의존 완전성 판정은
 * 투영이 아니라 여기서만 나온다.
 * @property {() => ({ revision: number, lanes: Array<Record<string, any>> }|null)} getCrossLanes
 * - 저장된 연결 레인. 그 기능이 없는 탭은 `() => null`을 준다.
 * @property {(cross_lanes: { revision: number, lanes: Array<Record<string, any>> }|null) => { lanes: LaneModel, raw_lanes: ({ revision: number, lanes: Array<Record<string, any>> }|null) }} reproject
 * - CAS 충돌이 실어 온 최신 레인 위에서 모델을 다시 만든다.
 * @property {(lane_id: string, corrected: number) => void} onCorrection - 자동
 * 교정이 몇 건을 옮겼는지 알린다. `0`은 앞선 알림을 걷으라는 뜻이다.
 * @property {(message: string, kind?: 'error'|'success'|'info'|'warning', ms?: number) => void} showToast
 * - 거부·실패를 사용자에게 보이는 자리 (`error` variant).
 * @property {() => void} requestRender - 한 계획이 끝났다는 신호. 호출 측이 자기
 * DOM을 다시 만들 차례다.
 * @property {(root_dir: string, queue: any) => void} [adoptQueue] - mutation
 * 응답이 실어 온 권위 있는 queue를 호출 측 상태로 채택한다.
 * @property {() => void} [onDragBegin] - 손이 행을 집었다. 열려 있던
 * `place_menu`를 걷는 자리다.
 */

/**
 * @param {unknown} error
 * @returns {string}
 */
function mutationErrorMessage(error) {
  if (typeof error === 'string' && error.length > 0) {
    return error;
  }
  if (error && typeof error === 'object') {
    const value = /** @type {Record<string, any>} */ (error);
    if (typeof value.message === 'string' && value.message.length > 0) {
      return value.message;
    }
    if (typeof value.error === 'string' && value.error.length > 0) {
      return value.error;
    }
    if (
      value.error &&
      typeof value.error === 'object' &&
      typeof value.error.message === 'string'
    ) {
      return value.error.message;
    }
  }
  return '요청에 실패했습니다';
}

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function idsOf(value) {
  return Array.isArray(value)
    ? value.filter(
        (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
      )
    : [];
}

/**
 * One drag/drop controller for ONE tab's console (§4.5).
 *
 * @param {LaneDragOptions} options
 */
export function createLaneDrag(options) {
  const {
    transport,
    console_el,
    getLanes,
    getWorkspaces,
    getCrossLanes,
    reproject,
    onCorrection,
    showToast,
    requestRender,
    adoptQueue,
    onDragBegin
  } = options;

  /**
   * 한 계획을 보내는 동안 이미 적용된 dep op (§5.5). 충돌 뒤 재계획은 아직
   * 도착하지 않은 스냅샷 대신 이 델타를 얹은 그래프 위에서 세워야 이미 보낸
   * `dep-remove`가 "이미 없음"으로 반영된다. 상태는 factory 인스턴스가 소유한다.
   *
   * @type {Array<{ type: 'dep-add'|'dep-remove', a: string, b: string }>}
   */
  let dep_delta = [];

  /** @type {DropDrag|null} */
  let dragging = null;

  /** 드롭의 마우스업이 그대로 click으로 이어져 카드를 열어 버리는 것을 막는다. */
  let suppress_open_click = false;

  /** @type {any} */
  let suppress_timer = null;

  /**
   * The last pointerdown target. `dragstart`는 draggable 조상(행)으로 타깃을
   * 옮기므로, 인터랙티브 자식에서 시작한 오조작을 가릴 수 있는 유일한 값이다.
   *
   * @type {Element|null}
   */
  let press_target = null;

  /** @type {HTMLElement|null} */
  let mounted_el = null;

  function expireDragSuppressSoon() {
    if (suppress_timer !== null) {
      clearTimeout(suppress_timer);
    }
    suppress_timer = setTimeout(() => {
      suppress_timer = null;
      suppress_open_click = false;
    }, 0);
  }

  /**
   * The snapshot's raw `cross_lanes`, or `null` (구서버·저장소 읽기 실패·Worker).
   *
   * @returns {{ revision: number, lanes: Array<Record<string, any>> }|null}
   */
  function currentCrossLanes() {
    return getCrossLanes() ?? null;
  }

  /**
   * Rebuild the live blocks graph from the snapshot itself (§5.1). 연결 레인의
   * `predecessors`는 레인 안 엣지뿐이라 사이클 검사에 모자라므로, 레인 조립이
   * 쓰는 것과 같은 두 원천(레포별 `bead_blocked_by`, 실행가능 행의 `blocked_by`)
   * 에서 같은 순서로 다시 만든다.
   *
   * @returns {Map<string, string[]>}
   */
  function blockedByMap() {
    /** @type {Map<string, string[]>} */
    const graph = new Map();
    const workspaces = getWorkspaces();
    for (const workspace of Array.isArray(workspaces) ? workspaces : []) {
      if (!workspace || typeof workspace !== 'object') {
        continue;
      }
      const declared =
        workspace.bead_blocked_by &&
        typeof workspace.bead_blocked_by === 'object'
          ? workspace.bead_blocked_by
          : {};
      for (const [bead_id, blockers] of Object.entries(declared)) {
        if (Array.isArray(blockers)) {
          graph.set(bead_id, idsOf(blockers));
        }
      }
      // 실행가능 행과 세션 진행 행은 자기 blocker를 스스로 들고 온다
      // (UI-yrzu §5) — 연결 레인이 그 버드를 그리면 드롭 계획도 같은 그래프를
      // 봐야 한다.
      for (const entry of [
        ...(Array.isArray(workspace.runnable) ? workspace.runnable : []),
        ...(Array.isArray(workspace.session_active)
          ? workspace.session_active
          : [])
      ]) {
        if (
          entry &&
          typeof entry.bead_id === 'string' &&
          Array.isArray(entry.blocked_by) &&
          entry.blocked_by.length > 0
        ) {
          graph.set(entry.bead_id, idsOf(entry.blocked_by));
        }
      }
    }
    return graph;
  }

  /**
   * The two 완전성 원천 the 자동 교정 reads (UI-jaua §6.1). `blockedByMap()`은
   * 빈 배열을 버리므로 "아직 모름"과 "blocker 없음"을 구별할 수 없다 — 교정은
   * 그 구별 없이는 돌 수 없으므로 여기서 따로 만든다: **키가 있으면 확정**이고
   * 빈 배열도 확정이다.
   *
   * @returns {{ snapshot: Map<string, string[]>, runnable: Map<string, string[]> }}
   */
  function settledBlockerSources() {
    /** @type {Map<string, string[]>} */
    const snapshot = new Map();
    /** @type {Map<string, string[]>} */
    const runnable = new Map();
    const workspaces = getWorkspaces();
    for (const workspace of Array.isArray(workspaces) ? workspaces : []) {
      if (!workspace || typeof workspace !== 'object') {
        continue;
      }
      const declared =
        workspace.bead_blocked_by &&
        typeof workspace.bead_blocked_by === 'object'
          ? workspace.bead_blocked_by
          : {};
      for (const [bead_id, blockers] of Object.entries(declared)) {
        if (Array.isArray(blockers)) {
          snapshot.set(bead_id, idsOf(blockers));
        }
      }
      for (const item of Array.isArray(workspace.runnable)
        ? workspace.runnable
        : []) {
        if (
          item &&
          typeof item.bead_id === 'string' &&
          Array.isArray(item.blocked_by)
        ) {
          runnable.set(item.bead_id, idsOf(item.blocked_by));
        }
      }
    }
    // 이 실행이 이미 보낸 dep op는 확정된 항목에만 접는다. 항목 자체가 없으면
    // 다른 blocker를 여전히 모르므로 미확정 그대로 둔다 (§6.1).
    for (const op of dep_delta) {
      for (const source of [snapshot, runnable]) {
        const blockers = source.get(op.a);
        if (blockers === undefined) {
          continue;
        }
        source.set(
          op.a,
          op.type === 'dep-remove'
            ? blockers.filter((id) => id !== op.b)
            : blockers.includes(op.b)
              ? blockers
              : [...blockers, op.b]
        );
      }
    }
    return { snapshot, runnable };
  }

  /**
   * The live blocks graph with this run's already-applied dep ops folded in
   * (§5.5).
   *
   * @returns {Map<string, string[]>}
   */
  function blockedByMapWithDelta() {
    const graph = blockedByMap();
    for (const op of dep_delta) {
      const blockers = (graph.get(op.a) || []).slice();
      if (op.type === 'dep-remove') {
        graph.set(
          op.a,
          blockers.filter((id) => id !== op.b)
        );
      } else if (!blockers.includes(op.b)) {
        graph.set(op.a, [...blockers, op.b]);
      }
    }
    return graph;
  }

  /**
   * `planDrop`/`planLane*`이 받는 모델 (§5.1·§5.4). 투영이 내보내는 평면 객체를
   * Map으로 바꾸고, 레인 멤버십·고정 행·적재 여부는 저장 레인 투영에서 읽는다.
   *
   * @param {LaneModel} [source] - 계획을 세울 투영. 기본은 지금 그려진 화면이고,
   * 충돌 재계획은 최신 `cross_lanes`로 다시 투영한 모델을 넘긴다 (§5.5).
   * @param {{ revision: number, lanes: Array<Record<string, any>> }|null} [raw_lanes]
   * - 그 투영이 나온 스냅샷 원본 (UI-jaua §7.1 provenance 원천).
   * @returns {DropModel}
   */
  function dropModel(source = getLanes(), raw_lanes = currentCrossLanes()) {
    // provenance는 투영이 아니라 스냅샷 원본에서 읽는다 (UI-jaua §7.1): 행
    // 투영은 표시 재료만 나르고, 삭제가 되돌릴 쌍은 저장된 값이 정한다.
    /** @type {Map<string, Map<string, boolean>>} */
    const provenance_of = new Map();
    for (const lane of Array.isArray(raw_lanes?.lanes) ? raw_lanes.lanes : []) {
      /** @type {Map<string, boolean>} */
      const by_bead = new Map();
      for (const entry of Array.isArray(lane?.entries) ? lane.entries : []) {
        if (entry && typeof entry.bead_id === 'string') {
          by_bead.set(entry.bead_id, entry.dep_created_by_lane === true);
        }
      }
      provenance_of.set(typeof lane?.id === 'string' ? lane.id : '', by_bead);
    }
    /** @type {Map<string, LaneState>} */
    const cross_lanes = new Map();
    /** @type {Map<string, string>} */
    const owner_lane_of = new Map();
    /** @type {Set<string>} */
    const fixed_members = new Set();
    /** @type {Set<string>} */
    const placed_members = new Set();
    for (const lane of source.chain_lanes) {
      const provenance = provenance_of.get(lane.lane_id);
      cross_lanes.set(lane.lane_id, {
        status: lane.status,
        entries: lane.rows.map((row, index) => ({
          bead_id: row.id,
          root_dir: row.root_dir,
          ...(index === 0
            ? {}
            : { dep_created_by_lane: provenance?.get(row.id) === true })
        }))
      });
      for (const row of lane.rows) {
        owner_lane_of.set(row.id, lane.lane_id);
        if (row.fixed) {
          fixed_members.add(row.id);
        }
        if (!row.unplaced) {
          placed_members.add(row.id);
        }
      }
    }
    /** @type {Map<string, number>} */
    const queue_index_of = new Map();
    for (const row of source.parallel_rows) {
      if (typeof row.queue_index === 'number') {
        queue_index_of.set(row.id, row.queue_index);
      }
    }
    for (const group of source.queue_groups) {
      for (const lane of group.sublanes.serial) {
        for (const item of lane.items) {
          if (typeof item.queue_index === 'number') {
            queue_index_of.set(item.id, item.queue_index);
          }
        }
      }
    }
    const settled = settledBlockerSources();
    return {
      blocked_by_map: blockedByMapWithDelta(),
      snapshot_blocked_by: settled.snapshot,
      runnable_blocked_by: settled.runnable,
      owner_of: new Map(Object.entries(source.owner_of)),
      cross_lanes,
      owner_lane_of,
      fixed_members,
      placed_members,
      parallel_rows: source.parallel_rows.map((row) => ({
        bead_id: row.id,
        root_dir: row.root_dir,
        queue_index: row.queue_index ?? 0
      })),
      parallel_raw_length: new Map(Object.entries(source.parallel_raw_length)),
      queue_index_of
    };
  }

  /**
   * The CAS revision a queue op travels with (§5.1): 그 항목을 소유한 레포
   * 큐의 것.
   *
   * @param {string} root_dir
   * @param {string} bead_id
   * @returns {number}
   */
  function revisionOfRoot(root_dir, bead_id) {
    const lanes = getLanes();
    for (const item of [
      ...lanes.runnable,
      ...lanes.queue,
      ...lanes.running,
      ...lanes.pr_wait,
      ...lanes.done
    ]) {
      // 비점유 타일(head review·repair 세션)은 그 bead의 위치를 주장하지 않는다.
      if (item.non_occupying || item.id !== bead_id) {
        continue;
      }
      if (item.root_dir === root_dir) {
        return item.expected_revision;
      }
      break;
    }
    const group = lanes.queue_groups.find(
      (entry) => entry.root_dir === root_dir
    );
    return group ? group.revision : 0;
  }

  /**
   * Send one workspace-scoped mutation under the CAS discipline. `root_dir`가
   * 빈 문자열이면 payload에 싣지 않는다 — Worker 탭은 세션이 고른 워크스페이스
   * 하나만 보므로 좌표가 없는 것이 정상이고, 서버는 그때 세션의 선택을 쓴다.
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @param {string} root_dir
   * @param {number} revision
   * @returns {Promise<any>}
   */
  async function sendCas(type, payload, root_dir, revision) {
    if (!transport) {
      return null;
    }
    const envelope = () => ({
      ...payload,
      ...(root_dir ? { root_dir } : {}),
      expected_revision: revision
    });
    let res = await transport(type, envelope());
    if (res && res.conflict) {
      if (res.queue) {
        adoptQueue?.(root_dir, res.queue);
      }
      const fresh =
        res.queue && typeof res.queue.revision === 'number'
          ? res.queue.revision
          : revision;
      res = await transport(type, {
        ...payload,
        ...(root_dir ? { root_dir } : {}),
        expected_revision: fresh
      });
    }
    if (res && res.queue) {
      adoptQueue?.(root_dir, res.queue);
    }
    return res;
  }

  /**
   * One CAS 큐 mutation, and what its reply is allowed to mean (§5.5·§7).
   *
   * @param {'worker-queue-place'|'worker-queue-reorder'|'worker-queue-remove'|'worker-queue-arm'|'worker-queue-disarm'} type
   * @param {Record<string, any>} payload
   * @param {string} root_dir
   * @param {Map<string, number>} revisions - root_dir → 이어 쓸 CAS revision.
   * @param {{ bead_id: string }} coordinate - revision을 처음 찾는 좌표.
   * @returns {Promise<number|null>} 이어 쓸 revision, 실패면 null.
   */
  async function sendQueueCas(type, payload, root_dir, revisions, coordinate) {
    try {
      const res = await sendCas(
        type,
        payload,
        root_dir,
        revisions.get(root_dir) ?? revisionOfRoot(root_dir, coordinate.bead_id)
      );
      // 전송 래퍼는 큐 op 오류를 `[]`로 삼키므로 (`app/main.js`), 응답 모양을
      // 직접 본다. 실패를 성공으로 넘기면 뒤 op만 적용된 부분 상태가 남고
      // §5.5의 "실패하면 남은 op를 보내지 않는다"가 무너진다.
      if (!res || typeof res.applied !== 'boolean') {
        showToast('큐 요청이 실패했습니다', 'error');
        return null;
      }
      if (res.queue && typeof res.queue.revision === 'number') {
        revisions.set(root_dir, res.queue.revision);
      }
      if (res.conflict) {
        showToast('큐가 바뀌었습니다 — 다시 시도해 주세요', 'error');
        return null;
      }
      // 입장 거부는 CAS 충돌이 아니라 `applied:false`로 온다 (§7).
      if (res.applied === false) {
        showToast(
          res.admission_reason
            ? `큐 적재 거부: ${res.admission_reason}`
            : '큐 요청이 적용되지 않았습니다',
          'error'
        );
        return null;
      }
      return res.queue && typeof res.queue.revision === 'number'
        ? res.queue.revision
        : (revisions.get(root_dir) ?? 0);
    } catch (error) {
      showToast(mutationErrorMessage(error), 'error');
      return null;
    }
  }

  /**
   * Send one planned op. 큐 op만 CAS를 쓴다 (§5.4). 단일 op 진입점(`✕`·
   * `대기로 ↴`)도 같은 함수를 쓰므로 `revisions`는 선택이다.
   *
   * @param {Op} op
   * @param {string} bead_id
   * @param {Map<string, number>} [revisions] - root_dir → 이 계획에서 이어 쓸 CAS
   * revision (§5.5).
   * @returns {Promise<boolean>} 계획의 남은 단계를 이어도 되면 true.
   */
  async function sendOp(op, bead_id, revisions = new Map()) {
    if (op.type === 'worker-queue-disarm') {
      // disarm 실패는 계획을 멈추지 않는다 (UI-jaua §7.2).
      try {
        const res = await sendCas(
          op.type,
          op.payload,
          op.root_dir,
          revisions.get(op.root_dir) ?? revisionOfRoot(op.root_dir, bead_id)
        );
        if (res && res.queue && typeof res.queue.revision === 'number') {
          revisions.set(op.root_dir, res.queue.revision);
        }
      } catch {
        // 그 사실은 다음 스냅샷의 고아 arm 칩이 말한다 (fail-visible).
      }
      return true;
    }
    if (
      op.type === 'worker-queue-place' ||
      op.type === 'worker-queue-reorder' ||
      op.type === 'worker-queue-remove'
    ) {
      return (
        (await sendQueueCas(op.type, op.payload, op.root_dir, revisions, {
          bead_id
        })) !== null
      );
    }
    try {
      if ((op.type === 'dep-add' || op.type === 'dep-remove') && transport) {
        await transport(op.type, {
          a: op.a,
          b: op.b,
          ...(op.root_dir ? { root_dir: op.root_dir } : {})
        });
      }
      return true;
    } catch (error) {
      showToast(mutationErrorMessage(error), 'error');
      return false;
    }
  }

  /**
   * Remember a dep op this run already applied (§5.5).
   *
   * @param {Op} op
   */
  function rememberDep(op) {
    if (op.type === 'dep-add' || op.type === 'dep-remove') {
      dep_delta = [...dep_delta, { type: op.type, a: op.a, b: op.b }];
    }
  }

  /**
   * One 레인 op (§4.3). CAS는 컨트롤러가 소유한다 — 계획은 revision을 모르는
   * 순수 값이어야 충돌 뒤 최신 레인 위에서 그대로 다시 세울 수 있기 때문이다.
   *
   * @param {LaneOp} op
   * @param {number} expected_revision
   * @returns {Promise<{ ok: true, revision: number }|{ ok: false, conflict?: { revision: number, lanes: Array<Record<string, any>> } }>}
   */
  async function sendLaneOp(op, expected_revision) {
    if (!transport) {
      return { ok: false };
    }
    try {
      const res = await transport(op.type, {
        ...op.payload,
        expected_revision
      });
      if (!res || typeof res.revision !== 'number') {
        showToast('연결 레인 응답에 revision이 없습니다', 'error');
        return { ok: false };
      }
      return { ok: true, revision: res.revision };
    } catch (error) {
      const value = /** @type {any} */ (error);
      const fresh =
        value && value.code === 'conflict' ? value.details?.cross_lanes : null;
      if (
        fresh &&
        typeof fresh.revision === 'number' &&
        Array.isArray(fresh.lanes)
      ) {
        return { ok: false, conflict: fresh };
      }
      showToast(mutationErrorMessage(error), 'error');
      return { ok: false };
    }
  }

  /**
   * Send ONE plan in the §5.5 order: `dep-remove` → 레인 op → `dep-add` → 큐 op.
   *
   * @param {{ lane_ops: LaneOp[], ops: Op[], lane_op_index: number }} plan
   * @param {number|null} revision - 레인 op의 첫 CAS 값.
   * @param {string} bead_id
   * @returns {Promise<{ done: true }|{ done: false, conflict: { revision: number, lanes: Array<Record<string, any>> } }>}
   */
  async function sendPlan(plan, revision, bead_id) {
    /** @type {Map<string, number>} */
    const revisions = new Map();
    /** @type {Op[]} */
    const applied_adds = [];
    const before_lane = plan.ops.slice(0, plan.lane_op_index);
    const after_lane = plan.ops.slice(plan.lane_op_index);
    for (const op of before_lane) {
      if (!(await sendOp(op, bead_id, revisions))) {
        return { done: true };
      }
      rememberDep(op);
    }
    let next_revision = revision;
    for (const op of plan.lane_ops) {
      if (next_revision === null) {
        showToast('연결 레인 저장소를 읽을 수 없습니다', 'error');
        return { done: true };
      }
      const res = await sendLaneOp(op, next_revision);
      if (!res.ok) {
        return res.conflict
          ? { done: false, conflict: res.conflict }
          : { done: true };
      }
      next_revision = res.revision;
    }
    for (const op of after_lane) {
      if (!(await sendOp(op, bead_id, revisions))) {
        return { done: true };
      }
      rememberDep(op);
      if (op.type === 'dep-add') {
        applied_adds.push(op);
      }
    }
    // 성공한 `dep-add`만 provenance를 올린다 (UI-jaua §7.1 2단계).
    for (const update of laneProvenanceUpdates(
      /** @type {any} */ (applied_adds)
    )) {
      next_revision = await sendLaneProvenance(update, next_revision);
    }
    return { done: true };
  }

  /**
   * Stage 2 of the §7.1 provenance write: raise the pairs whose `dep-add` just
   * succeeded.
   *
   * @param {{ lane_id: string, pairs: Array<{ bead_id: string, after: string }> }} update
   * @param {number|null} revision
   * @returns {Promise<number|null>}
   */
  async function sendLaneProvenance(update, revision) {
    if (revision === null || !transport) {
      return revision;
    }
    let pairs = update.pairs;
    let next_revision = revision;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      if (pairs.length === 0) {
        return next_revision;
      }
      try {
        const res = await transport('monitor-lane-provenance', {
          lane_id: update.lane_id,
          // `after`도 함께 싣는다: 서버는 그 쌍이 **지금도 인접인지** 확인한
          // 뒤에만 올린다 (§7.1).
          pairs: pairs.map((pair) => ({
            bead_id: pair.bead_id,
            after: pair.after,
            value: true
          })),
          expected_revision: next_revision
        });
        return res && typeof res.revision === 'number'
          ? res.revision
          : next_revision;
      } catch (error) {
        const value = /** @type {any} */ (error);
        const fresh =
          value && value.code === 'conflict'
            ? value.details?.cross_lanes
            : null;
        if (
          !fresh ||
          typeof fresh.revision !== 'number' ||
          !Array.isArray(fresh.lanes)
        ) {
          return next_revision;
        }
        const lane = fresh.lanes.find(
          (/** @type {any} */ entry) => entry && entry.id === update.lane_id
        );
        pairs = adjacentProvenancePairs(
          Array.isArray(lane?.entries) ? lane.entries : [],
          pairs
        );
        next_revision = fresh.revision;
      }
    }
    return next_revision;
  }

  /**
   * Plan and send ONE user action (§5.5). 레인 op가 `conflict`면 응답이 실어 온
   * 최신 `cross_lanes`로 **계획 전체를 다시 세우고** 1회만 재시도한다.
   *
   * @param {(model: DropModel) => DropPlan} planner
   * @param {string} bead_id - 큐 op의 CAS revision을 찾는 좌표.
   * @param {Array<{ type: 'dep-add'|'dep-remove', a: string, b: string }>} [seed_delta]
   */
  async function runPlanned(planner, bead_id, seed_delta = []) {
    dep_delta = seed_delta;
    // 다음 사용자 조작이 앞선 교정 배지를 걷는다 (UI-jaua §6.3).
    onCorrection('', 0);
    let source = getLanes();
    let raw_lanes = currentCrossLanes();
    for (let attempt = 0; ; attempt += 1) {
      const plan = planner(dropModel(source, raw_lanes));
      if ('refused' in plan) {
        showToast(plan.refused, 'error');
        break;
      }
      const result = await sendPlan(plan, source.cross_lanes_revision, bead_id);
      if (result.done) {
        if (plan.correction) {
          onCorrection(plan.correction.lane_id, plan.correction.corrected);
        }
        break;
      }
      if (attempt >= 1) {
        showToast('레인이 다른 곳에서 바뀌었습니다', 'error');
        break;
      }
      const next = reproject(result.conflict);
      source = next.lanes;
      raw_lanes = next.raw_lanes;
    }
    dep_delta = [];
    requestRender();
  }

  /**
   * Plan ONE drop and send it (§5.4·§5.5).
   *
   * @param {DropDrag} drag
   * @param {DropTarget} target
   */
  async function applyDrop(drag, target) {
    await runPlanned((model) => planDrop(drag, target, model), drag.bead_id);
  }

  // --- 네이티브 HTML5 드래그 (§5). 좌표는 DOM 속성이 아니라 투영 모델에서
  // 나온다 — 실행중으로 빠졌거나 연결 레인에 숨은 버드는 DOM에 없다. ---

  /**
   * Where the drop marker sits: 지금 **보이는** 그 영역/레인 행 기준
   * 0..rows.length.
   *
   * @param {HTMLElement} zone
   * @param {HTMLElement|null} node
   * @returns {number}
   */
  function markerIndexIn(zone, node) {
    const row =
      node && typeof node.closest === 'function'
        ? /** @type {HTMLElement|null} */ (node.closest('[data-row-index]'))
        : null;
    if (row && zone.contains(row)) {
      const index = Number(row.getAttribute('data-row-index'));
      return Number.isFinite(index) ? index : 0;
    }
    return zone.querySelectorAll('[data-row-index]').length;
  }

  /**
   * The collapsed 세로 띠 as a drop target (UI-5ksp §4.4). 접힌 pane은 본문을
   * 그리지 않으므로 `[data-drop]`이 하나도 없다 — 그래도 띠는 같은 타깃이다:
   * 띠에 떨어뜨린 사람이 원한 것은 "대기에 넣기"이지 "다음으로 실행"이 아니므로
   * 병렬 큐 **말미**로 적재하고, 레인을 자동으로 펼치지 않는다.
   *
   * @param {HTMLElement|null} node
   * @returns {{ zone: HTMLElement, target: DropTarget }|null}
   */
  function collapsedDropTarget(node) {
    const pane =
      typeof node?.closest === 'function'
        ? /** @type {HTMLElement|null} */ (
            node.closest('.worker-pane--collapsed[data-lane]')
          )
        : null;
    if (!pane) {
      return null;
    }
    const lane = pane.getAttribute('data-lane');
    if (lane === 'queue') {
      return {
        zone: pane,
        target: {
          kind: 'parallel',
          marker_index: getLanes().parallel_rows.length
        }
      };
    }
    if (lane === 'candidate') {
      return { zone: pane, target: { kind: 'candidate' } };
    }
    return null;
  }

  /**
   * The zone a drop may actually land on. 레포 직렬 레인만 `root_dir` 일치를
   * 요구한다 (§4.2).
   *
   * @param {Event} ev
   * @returns {{ zone: HTMLElement, target: DropTarget }|null}
   */
  function dropTarget(ev) {
    const node = /** @type {HTMLElement|null} */ (ev.target);
    if (!dragging) {
      return null;
    }
    const zone =
      typeof node?.closest === 'function'
        ? /** @type {HTMLElement|null} */ (node.closest('[data-drop]'))
        : null;
    if (!zone) {
      return collapsedDropTarget(node);
    }
    const kind = zone.getAttribute('data-drop');
    if (kind === 'candidate') {
      return { zone, target: { kind: 'candidate' } };
    }
    if (kind === 'parallel') {
      return {
        zone,
        target: { kind: 'parallel', marker_index: markerIndexIn(zone, node) }
      };
    }
    if (kind === 'chain') {
      return {
        zone,
        target: {
          kind: 'chain',
          lane_id: zone.getAttribute('data-lane-id') || '',
          marker_index: markerIndexIn(zone, node)
        }
      };
    }
    if (kind === 'repo-serial') {
      const root_dir = zone.getAttribute('data-root-dir') || '';
      if (root_dir !== dragging.root_dir) {
        return null;
      }
      const row =
        typeof node?.closest === 'function'
          ? /** @type {HTMLElement|null} */ (node.closest('[data-queue-index]'))
          : null;
      const raw =
        row && zone.contains(row)
          ? row.getAttribute('data-queue-index')
          : zone.getAttribute('data-lane-length');
      const index = Number(raw);
      return {
        zone,
        target: {
          kind: 'repo-serial',
          root_dir,
          lane_id: /** @type {any} */ (zone.getAttribute('data-lane-id') || ''),
          index: Number.isFinite(index) ? index : 0
        }
      };
    }
    return null;
  }

  function clearDragOver() {
    for (const el of Array.from(console_el.querySelectorAll('.is-drop-over'))) {
      el.classList.remove('is-drop-over');
    }
  }

  /**
   * @param {PointerEvent} ev
   */
  function onPointerDown(ev) {
    press_target = ev.target instanceof Element ? ev.target : null;
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragStart(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    const handle =
      typeof target?.closest === 'function'
        ? /** @type {HTMLElement|null} */ (
            target.closest('[draggable="true"][data-bead-id]')
          )
        : null;
    const holder = handle
      ? /** @type {HTMLElement|null} */ (handle.closest('[data-drag-kind]'))
      : null;
    if (!holder) {
      return;
    }
    // 인터랙티브 자식에서 시작한 드래그는 행 이동이 아니라 오조작이다 — 상태
    // 없는 유령 드래그를 남기지 않도록 취소한다.
    if (
      handle &&
      press_target &&
      handle.contains(press_target) &&
      typeof (/** @type {Element} */ (press_target).closest) === 'function' &&
      press_target.closest('input, button, a')
    ) {
      ev.preventDefault();
      return;
    }
    const bead_id = holder.getAttribute('data-bead-id') || '';
    const kind = holder.getAttribute('data-drag-kind') || '';
    const root_dir = holder.getAttribute('data-root-dir') || '';
    if (!bead_id || !kind) {
      return;
    }
    const raw_index = holder.getAttribute('data-queue-index') || '';
    const queue_index = Number(raw_index);
    const lane_id = holder.getAttribute('data-lane-id') || '';
    dragging = {
      kind: /** @type {any} */ (kind),
      bead_id,
      root_dir,
      ...(raw_index !== '' && Number.isFinite(queue_index)
        ? { queue_index }
        : {}),
      ...(lane_id ? { lane_id } : {})
    };
    suppress_open_click = true;
    onDragBegin?.();
    // ≤640px에서 접혀 있던 빈 직렬 레인을 드롭 타깃으로 되살린다 — 표시 조건은
    // CSS 한 곳이 소유하고, 여기서는 "지금 드래그 중"만 말한다.
    console_el.classList.add('is-dragging');
    try {
      ev.dataTransfer?.setData('text/plain', bead_id);
      if (ev.dataTransfer) {
        ev.dataTransfer.effectAllowed = 'move';
      }
    } catch {
      /* ignore — 드래그 자체는 상태만으로도 성립한다 */
    }
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragOver(ev) {
    const target = dropTarget(ev);
    if (!target) {
      return;
    }
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = 'move';
    }
    target.zone.classList.add('is-drop-over');
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragLeave(ev) {
    const node = /** @type {HTMLElement|null} */ (ev.target);
    if (typeof node?.closest === 'function') {
      node.closest('[data-drop]')?.classList.remove('is-drop-over');
      // 접힌 띠는 `[data-drop]`을 갖지 않으므로 자기 이름으로 지운다.
      node.closest('.worker-pane--collapsed')?.classList.remove('is-drop-over');
    }
  }

  function onDragEnd() {
    dragging = null;
    clearDragOver();
    console_el.classList.remove('is-dragging');
    expireDragSuppressSoon();
  }

  /**
   * @param {DragEvent} ev
   */
  function onDrop(ev) {
    const target = dropTarget(ev);
    const drag = dragging;
    dragging = null;
    clearDragOver();
    console_el.classList.remove('is-dragging');
    if (!target || !drag) {
      return;
    }
    ev.preventDefault();
    void applyDrop(drag, target.target);
  }

  return {
    /**
     * @param {HTMLElement} mount_el
     */
    attach(mount_el) {
      if (mounted_el) {
        return;
      }
      mounted_el = mount_el;
      mount_el.addEventListener(
        'pointerdown',
        /** @type {any} */ (onPointerDown)
      );
      mount_el.addEventListener('dragstart', /** @type {any} */ (onDragStart));
      mount_el.addEventListener('dragover', /** @type {any} */ (onDragOver));
      mount_el.addEventListener('dragleave', /** @type {any} */ (onDragLeave));
      mount_el.addEventListener('drop', /** @type {any} */ (onDrop));
      mount_el.addEventListener('dragend', onDragEnd);
    },
    detach() {
      if (suppress_timer !== null) {
        clearTimeout(suppress_timer);
        suppress_timer = null;
      }
      const mount_el = mounted_el;
      mounted_el = null;
      if (!mount_el) {
        return;
      }
      mount_el.removeEventListener(
        'pointerdown',
        /** @type {any} */ (onPointerDown)
      );
      mount_el.removeEventListener(
        'dragstart',
        /** @type {any} */ (onDragStart)
      );
      mount_el.removeEventListener('dragover', /** @type {any} */ (onDragOver));
      mount_el.removeEventListener(
        'dragleave',
        /** @type {any} */ (onDragLeave)
      );
      mount_el.removeEventListener('drop', /** @type {any} */ (onDrop));
      mount_el.removeEventListener('dragend', onDragEnd);
    },
    isDragging() {
      return dragging !== null;
    },
    /**
     * Whether the click that follows a drop must NOT open a detail panel. 읽는
     * 즉시 소진된다 — 한 드롭이 막는 클릭은 하나뿐이다.
     */
    consumeClickSuppression() {
      const suppressed = suppress_open_click;
      suppress_open_click = false;
      return suppressed;
    },
    applyDrop,
    runPlanned,
    dropModel,
    sendOp,
    sendQueueCas,
    rememberDep
  };
}
