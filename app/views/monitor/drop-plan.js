/**
 * 모니터 대기 레인 드롭 계획 (UI-e6hw §5, UI-j92s §5.4·§5.5).
 *
 * 순수 변환 함수만 내보낸다: 드래그 원천·드롭 대상·투영 모델을 받아 서버 op 열을
 * 만든다. 트랜잭션도 낙관적 투영도 없으므로 이 함수들은 상태를 만지지 않고 뷰가
 * 결과를 순서대로 보낸다. 거부는 계획 **전체** 거부다 — 일부 op만 돌려주면
 * 사용자가 보는 그래프가 의도와 달라진다.
 *
 * 연결 레인은 이제 파생 성분이 아니라 서버에 저장된 멤버십이다 (UI-j92s §3).
 * 그래서 계획은 두 축으로 나뉜다: 레인 op(멤버·순서)와 dep·큐 op(실행 진실).
 * 둘은 별개 채널이고 트랜잭션이 없으므로 전송 순서가 곧 안전 규약이다 (§5.5).
 */
/**
 * `lane_id`는 그 `dep-add`가 **어느 연결 레인의 인접 관계를 만들려고** 나가는지를
 * 적는다 (UI-jaua §7.1 2단계). `addDep`가 이미 있는 엣지를 건너뛰므로, 표식이
 * 붙어 나간 op 집합이 곧 "이번 실행에서 레인이 새로 만든 쌍"이다.
 *
 * @typedef {{ type: 'dep-add'|'dep-remove', a: string, b: string, root_dir: string, lane_id?: string }} DepOp
 * @typedef {{ type: 'worker-queue-place'|'worker-queue-reorder'|'worker-queue-remove'|'worker-queue-disarm', payload: Record<string, any>, root_dir: string }} QueueOp
 * @typedef {DepOp|QueueOp} Op
 */
/**
 * 저장 레인의 멤버 하나 (§4.1). `root_dir`은 위치가 아니라 소속이므로, 그 버드가
 * 어느 레인에도 적재되지 않아도 남아 있다.
 *
 * `dep_created_by_lane`은 이 엔트리와 **바로 앞 엔트리** 사이의 `blocks` 엣지를
 * 레인이 만들었는지다 (UI-jaua §7.1). 값을 쓰는 곳은 서버이고 (레인 op가 새 인접
 * 자리를 `false`로 두고 `monitor-lane-provenance`가 성공한 쌍만 `true`로 올린다),
 * 계획은 읽기만 한다. `entries[0]`에는 의미가 없어 저장소가 부재로 정규화한다.
 *
 * @typedef {{ bead_id: string, root_dir: string, dep_created_by_lane?: boolean }} LaneEntry
 */
/**
 * @typedef {{ status: 'draft'|'confirmed', entries: LaneEntry[] }} LaneState
 */
/**
 * §4.3의 모니터 채널 op 하나. `expected_revision`은 CAS와 재계획을 소유한 뷰가
 * 보낼 때 싣는다 — 계획은 revision을 모르는 순수 값이어야 충돌 뒤 그대로 다시
 * 세울 수 있다.
 *
 * @typedef {{ type: 'monitor-lane-create', payload: { entries: LaneEntry[] } }
 *   | { type: 'monitor-lane-update', payload: { lane_id: string, entries: LaneEntry[] } }
 *   | { type: 'monitor-lane-confirm', payload: { lane_id: string } }
 *   | { type: 'monitor-lane-remove', payload: { lane_id: string } }
 * } LaneOp
 */
/**
 * One 의존 자동 교정의 결과 (UI-jaua §6). 순수 값이므로 계획이 이것을 계산하고
 * 뷰는 그리기만 한다.
 *
 * @typedef {Object} LaneCorrection
 * @property {LaneEntry[]} entries - 교정된 순서 (§6.2). 보류·사이클이면 입력 그대로다.
 * @property {{ bead_id: string, after: string }[]} corrections - 실제로 움직인
 * 행 (`orderLaneByBlocks`가 돌려주는 그대로).
 * @property {boolean} cycle - `⛔ 의존 사이클 — 자동 교정 불가` (§6.3).
 * @property {boolean} held - `의존 자료 미확정 — 교정 보류` (§6.1).
 * @property {string[]} mismatched - 움직일 수 없는 자리인데 의존과 어긋난 행
 * (`⚠ 의존 순서와 다름`, §6.3).
 */
/**
 * @typedef {Object} DropDrag
 * @property {'candidate'|'parallel'|'chain'|'repo-serial'} kind
 * @property {string} bead_id
 * @property {string} root_dir
 * @property {number} [queue_index]
 * @property {string} [lane_id]
 */
/**
 * @typedef {{ kind: 'candidate' }
 *   | { kind: 'parallel', marker_index: number }
 *   | { kind: 'chain', lane_id: string, marker_index: number }
 *   | { kind: 'repo-serial', root_dir: string, lane_id: 's1'|'s2'|'s3'|'s4'|'s5', index: number }
 * } DropTarget
 */
/**
 * @typedef {Object} DropModel
 * @property {Map<string, string[]>} blocked_by_map
 * @property {Map<string, string>} owner_of
 * @property {Map<string, LaneState>} cross_lanes - lane_id → 저장 레인. **삽입
 * 순서가 표시 순서**이므로 `이미 연결 N에 있습니다`의 N도 이 순서에서 나온다.
 * @property {Map<string, string>} owner_lane_of - bead_id → lane_id. 한 버드는
 * 전체에서 레인 하나에만 속한다 (§4.1).
 * @property {Set<string>} fixed_members - 실행중·PR 대기·완료 멤버 (§5.3).
 * @property {Set<string>} placed_members - 큐·실행중·PR 대기·완료 어디엔가 있는
 * 버드. 확정·재적용이 병렬 큐 끝에 올리는 대상은 이 집합의 여집합이다 (§5.4).
 * @property {Array<{ bead_id: string, root_dir: string, queue_index: number }>} parallel_rows
 * @property {Map<string, number>} parallel_raw_length
 * @property {Map<string, number>} queue_index_of
 * @property {Map<string, string[]>} [snapshot_blocked_by] - 워크스페이스 스냅샷
 * `bead_blocked_by` 그대로 (UI-jaua §6.1). **키 부재는 "아직 모름"**이고 빈
 * 배열이 "blocker 없음"이므로, 빈 배열을 버리는 `blocked_by_map`과 달리 여기서는
 * 빈 배열도 그대로 남긴다.
 * @property {Map<string, string[]>} [runnable_blocked_by] - 실행가능(미적재)
 * 행이 스스로 실어 온 `blocked_by` (UI-2gi1 §6.1). 같은 완전성 규약이다.
 */
/**
 * 계획 결과. `ops`는 이미 `dep-remove → disarm → dep-add → 큐` 순서이고, 레인
 * op는 `lane_op_index` 자리에 끼워 보낸다 — 결국 `dep-remove → disarm → 레인 op
 * → dep-add → 큐 op`다 (§5.5, UI-jaua §7.2). 제거와 disarm을 레인 op보다 앞에
 * 두는 이유는 같다: 레인이 바뀐 뒤에는 옛 인접 관계도, 어느 멤버가 그 레인
 * 것이었는지도 아무도 모른다.
 *
 * `correction`은 §6의 자동 교정이 남긴 표시 재료다. 그릴 것이 없으면 키 자체가
 * 없다 (fail-quiet).
 *
 * @typedef {{ lane_ops: LaneOp[], ops: Op[], lane_op_index: number, correction?: LaneCorrectionInfo }|{ refused: string }} DropPlan
 */
/**
 * @typedef {Object} LaneCorrectionInfo
 * @property {string} lane_id
 * @property {number} corrected - `의존에 맞춰 N건 자동 교정`의 N (§6.3).
 * @property {boolean} cycle
 * @property {boolean} held
 * @property {string[]} mismatched
 */
import { orderLaneByBlocks } from '../../../server/worker/lane-order.js';

/** 레포 직렬 레인은 workspace 큐 단위다 (§2) — 레포를 섞은 레인은 없다. */
const REFUSE_CROSS_REPO = '다른 레포 이슈는 이 직렬 레인에 넣을 수 없습니다';

/**
 * 교정 입력이 한 멤버라도 미확정이면 `확정`을 막는다 (UI-jaua §6.1). 교정되지
 * 않은 순서로 `dep-add`를 내면 §1.2의 사이클 거부로 되돌아가므로, 조용히
 * 넘기지 않고 이유를 그대로 보인다.
 */
export const HOLD_CORRECTION = '의존 자료 미확정 — 교정 보류';

/** 레포 직렬 레인 순서는 Worker 탭이 소유한다 (§4.2). */
const REFUSE_SERIAL_TO_CHAIN = 'Worker 탭 직렬 레인에서 먼저 빼 주세요';

/** 고정 행 앞 삽입 (§5.3). */
const REFUSE_FIXED_ROW = '이미 진행 중인 이슈 앞에는 넣을 수 없습니다';

/** 레인 하나가 사라진 뒤의 낡은 좌표로 계획을 세우지 않는다 (§5.5). */
const REFUSE_MISSING_LANE = '연결 레인이 없습니다';

/**
 * @param {string} a
 * @param {string} b
 */
function edgeKey(a, b) {
  return `${a}\u0000${b}`;
}

/**
 * Each member's in-lane blockers, or `null` when the data is not settled yet
 * (UI-jaua §6.1).
 *
 * 원천은 멤버가 어디 있느냐로 갈린다: 적재된 멤버(대기·실행중·PR 대기·완료)는
 * 워크스페이스 스냅샷 `bead_blocked_by`, 미적재(실행가능) 멤버는 runnable 행이
 * 실어 온 `blocked_by`다. 두 원천 모두 **키 부재는 "아직 모름"**이고 빈 배열이
 * "blocker 없음"이다 — 그 둘을 구별하지 못한 채 교정하면 실재하는 `blocks`를
 * 무시한 순서를 durable하게 저장하게 된다.
 *
 * @param {string[]} ids - 레인 멤버 순서 (`entries`의 `bead_id`).
 * @param {DropModel} model
 * @returns {Map<string, string[]>|null}
 */
function laneBlockers(ids, model) {
  const members = new Set(ids);
  /** @type {Map<string, string[]>} */
  const blockers_of = new Map();
  for (const id of ids) {
    const source = model.placed_members.has(id)
      ? model.snapshot_blocked_by
      : model.runnable_blocked_by;
    const declared = source instanceof Map ? source.get(id) : undefined;
    if (!Array.isArray(declared)) {
      return null;
    }
    blockers_of.set(
      id,
      declared.filter((blocker) => blocker !== id && members.has(blocker))
    );
  }
  return blockers_of;
}

/**
 * The first position 교정이 만질 수 있는 자리 (§6.2). draft는 `entries` 전체이고,
 * confirmed는 마지막 고정 행 **다음**부터다 — 고정 행과 그 앞은 불변이다.
 *
 * @param {LaneState} lane
 * @param {DropModel} model
 */
function correctionStart(lane, model) {
  if (lane.status !== 'confirmed') {
    return 0;
  }
  let last_fixed = -1;
  lane.entries.forEach((entry, index) => {
    if (model.fixed_members.has(entry.bead_id)) {
      last_fixed = index;
    }
  });
  return last_fixed + 1;
}

/**
 * Correct ONE lane's order against the `blocks` edges among its own members
 * (§6.1·§6.2). 레포 직렬 레인과 같은 `orderLaneByBlocks`를 쓴다 — 연결 레인
 * 전용 정렬은 없다 (§4).
 *
 * @param {LaneState} lane
 * @param {DropModel} model
 * @returns {LaneCorrection}
 */
export function correctLaneOrder(lane, model) {
  const entries = lane.entries;
  const ids = entries.map((entry) => entry.bead_id);
  const blockers_of = laneBlockers(ids, model);
  if (blockers_of === null) {
    return {
      entries,
      corrections: [],
      cycle: false,
      held: true,
      mismatched: []
    };
  }
  /** @type {{ blocker: string, blockee: string }[]} */
  const edges = [];
  for (const [blockee, blockers] of blockers_of) {
    for (const blocker of blockers) {
      edges.push({ blocker, blockee });
    }
  }
  const start = correctionStart(lane, model);
  const position_of = new Map(ids.map((id, index) => [id, index]));
  // 움직일 수 없는 자리인데 자기 blocker보다 앞에 선 행 (§6.3): 교정할 수
  // 없으므로 `⚠ 의존 순서와 다름`만 단다.
  const mismatched = ids
    .slice(0, start)
    .filter((id) =>
      /** @type {string[]} */ (blockers_of.get(id)).some(
        (blocker) =>
          Number(position_of.get(blocker)) > Number(position_of.get(id))
      )
    );
  const topo = orderLaneByBlocks(ids.slice(start), edges);
  if (topo.cycle) {
    return { entries, corrections: [], cycle: true, held: false, mismatched };
  }
  const entry_of = new Map(entries.map((entry) => [entry.bead_id, entry]));
  return {
    entries: [
      ...entries.slice(0, start),
      ...topo.order.map((id) => /** @type {LaneEntry} */ (entry_of.get(id)))
    ],
    corrections: topo.corrections,
    cycle: false,
    held: false,
    mismatched
  };
}

/**
 * The correction of a STORED lane, for the 헤더 배지·보류 표시 (§6.3). 계획을
 * 세우지 않고 지금 상태만 묻는 자리다.
 *
 * @param {string} lane_id
 * @param {DropModel} model
 * @returns {LaneCorrection|null}
 */
export function laneCorrectionStatus(lane_id, model) {
  const lane = model.cross_lanes.get(lane_id);
  return lane === undefined ? null : correctLaneOrder(lane, model);
}

/**
 * The plan's `correction` key, or `undefined` when there is nothing to draw
 * (fail-quiet, §4).
 *
 * @param {string} lane_id
 * @param {LaneCorrection} correction
 * @returns {LaneCorrectionInfo|undefined}
 */
function correctionInfo(lane_id, correction) {
  if (
    correction.corrections.length === 0 &&
    !correction.cycle &&
    !correction.held &&
    correction.mismatched.length === 0
  ) {
    return undefined;
  }
  return {
    lane_id,
    corrected: correction.corrections.length,
    cycle: correction.cycle,
    held: correction.held,
    mismatched: correction.mismatched
  };
}

/**
 * @param {string} bead_id
 */
function unknownOwner(bead_id) {
  return `${bead_id}의 레포를 알 수 없어 의존을 바꿀 수 없습니다`;
}

/**
 * @param {Map<string, string[]>} blocked_by_map
 * @returns {Map<string, string[]>}
 */
function cloneGraph(blocked_by_map) {
  /** @type {Map<string, string[]>} */
  const graph = new Map();
  for (const [blockee, blockers] of blocked_by_map) {
    graph.set(blockee, blockers.slice());
  }
  return graph;
}

/**
 * `node`가 `ancestor`에 (전이적으로) blocked되어 있는가 (§5.3). 의존성 패널의
 * 사이클 판정도 같은 물음이므로 (UI-j92s §6.1) 판정이 둘로 갈리지 않게 여기서만
 * 답한다.
 *
 * @param {Map<string, string[]>} graph
 * @param {string} node
 * @param {string} ancestor
 */
export function isBlockedBy(graph, node, ancestor) {
  /** @type {Set<string>} */
  const seen = new Set([node]);
  /** @type {string[]} */
  const stack = [node];
  while (stack.length > 0) {
    const current = /** @type {string} */ (stack.pop());
    for (const blocker of graph.get(current) || []) {
      if (blocker === ancestor) {
        return true;
      }
      if (!seen.has(blocker)) {
        seen.add(blocker);
        stack.push(blocker);
      }
    }
  }
  return false;
}

/**
 * Reduce the dep op list to its NET effect on the original graph (§5.2).
 * 같은 자리 재배치는 이어 붙이기가 지운 엣지를 삽입 규칙이 그대로 복원하므로,
 * 이 축약 없이는 서버로 왕복 op를 보내게 된다.
 *
 * @param {DepOp[]} dep_ops
 * @param {Map<string, string[]>} original
 * @returns {DepOp[]}
 */
function netDepOps(dep_ops, original) {
  /** @type {Set<string>} */
  const initial = new Set();
  for (const [blockee, blockers] of original) {
    for (const blocker of blockers) {
      initial.add(edgeKey(blockee, blocker));
    }
  }
  /** @type {Map<string, DepOp>} */
  const last = new Map();
  /** @type {Map<string, boolean>} */
  const present = new Map();
  for (const op of dep_ops) {
    const key = edgeKey(op.a, op.b);
    last.set(key, op);
    present.set(key, op.type === 'dep-add');
  }
  /** @type {DepOp[]} */
  const out = [];
  for (const op of dep_ops) {
    const key = edgeKey(op.a, op.b);
    if (last.get(key) !== op) {
      continue;
    }
    if (present.get(key) === initial.has(key)) {
      continue;
    }
    out.push(op);
  }
  return out;
}

/**
 * The 병렬 영역 삽입 좌표 `k` (§5.2). 통합 pane은 레포가 섞여 있으므로 DOM 길이가
 * 아니라 같은 레포 행의 raw `queue_index`에서만 유도한다.
 *
 * @param {DropModel} model
 * @param {string} root_dir
 * @param {number} marker_index
 */
function parallelInsertIndex(model, root_dir, marker_index) {
  const rows = model.parallel_rows;
  const marker = Math.max(0, Math.min(rows.length, marker_index));
  const over = rows[marker];
  if (over && over.root_dir === root_dir) {
    return over.queue_index;
  }
  for (let i = marker - 1; i >= 0; i--) {
    if (rows[i].root_dir === root_dir) {
      return rows[i].queue_index + 1;
    }
  }
  for (let i = marker; i < rows.length; i++) {
    if (rows[i].root_dir === root_dir) {
      return rows[i].queue_index;
    }
  }
  return model.parallel_raw_length.get(root_dir) ?? 0;
}

/**
 * @param {DropModel} model
 * @param {string} root_dir
 */
function hasParallelRow(model, root_dir) {
  return model.parallel_rows.some((row) => row.root_dir === root_dir);
}

/**
 * `worker-queue-place` op 한 개. `lane`이 없으면 병렬 큐다 (현행 서버 계약).
 *
 * @param {string} bead_id
 * @param {string} root_dir
 * @param {number} index
 * @param {string} [lane]
 * @returns {QueueOp}
 */
function placeOp(bead_id, root_dir, index, lane) {
  return {
    type: 'worker-queue-place',
    payload: { bead_id, ...(lane ? { lane } : {}), index },
    root_dir
  };
}

/**
 * The 1-based 표시 번호 of a lane (§4.1) — 저장 배열 자리이고, 사용자가 읽는
 * `연결 N`과 같은 수여야 한다.
 *
 * @param {DropModel} model
 * @param {string} lane_id
 */
function laneNumber(model, lane_id) {
  let index = 0;
  for (const id of model.cross_lanes.keys()) {
    index += 1;
    if (id === lane_id) {
      return index;
    }
  }
  return index + 1;
}

/**
 * 임시 그래프 위에서 dep op를 쌓는 계획기. 사이클과 `root_dir` 미해석은 여기서
 * 계획 전체 거부로 바뀐다 (§5.1·§7).
 *
 * @typedef {Object} DepPlanner
 * @property {Map<string, string[]>} graph
 * @property {DepOp[]} dep_ops
 * @property {{ refusal: string|null }} state
 * @property {(a: string) => string|null} ownerOf
 * @property {(a: string, b: string, lane_id?: string) => void} addDep
 * @property {(a: string, b: string) => void} removeDep
 * @property {(a: string, b: string) => boolean} laneCreated - 이 계획이 방금
 * 만든 레인 엣지인가 (UI-jaua §7.2). 같은 레인 안 재배치는 이어 붙이기가 만든
 * 임시 링크를 삽입 규칙이 다시 끊어야 왕복 op가 남지 않는다.
 */

/**
 * @param {DropModel} model
 * @returns {DepPlanner}
 */
function createDepPlanner(model) {
  const graph = cloneGraph(model.blocked_by_map);
  /** @type {DepOp[]} */
  const dep_ops = [];
  /** @type {Set<string>} */
  const lane_created = new Set();
  /** @type {{ refusal: string|null }} */
  const state = { refusal: null };

  /**
   * The 의존 op의 `root_dir`은 `a`(blockee)를 소유한 레포다 (§5.1) — 서버가 그
   * root에서 `bd dep add/remove a b`를 돌리기 때문이다.
   *
   * @param {string} a
   */
  const ownerOf = (a) => {
    const root_dir = model.owner_of.get(a);
    if (typeof root_dir !== 'string' || root_dir.length === 0) {
      state.refusal = unknownOwner(a);
      return null;
    }
    return root_dir;
  };

  /**
   * @param {string} a
   * @param {string} b
   */
  const removeDep = (a, b) => {
    if (state.refusal !== null || a === b) {
      return;
    }
    const blockers = graph.get(a) || [];
    if (!blockers.includes(b)) {
      return;
    }
    const root_dir = ownerOf(a);
    if (root_dir === null) {
      return;
    }
    graph.set(
      a,
      blockers.filter((id) => id !== b)
    );
    dep_ops.push({ type: 'dep-remove', a, b, root_dir });
  };

  /**
   * `lane_id`가 있으면 그 op는 레인이 만든 인접 관계다 (UI-jaua §7.1 2단계).
   * 이미 있는 엣지는 여기서 건너뛰므로 표식도 붙지 않는다 — 그래서 `재적용`이
   * 변하지 않은 `true`를 다시 쓰는 일이 없다.
   *
   * @param {string} a
   * @param {string} b
   * @param {string} [lane_id]
   */
  const addDep = (a, b, lane_id) => {
    if (state.refusal !== null || a === b) {
      return;
    }
    const blockers = graph.get(a) || [];
    if (blockers.includes(b)) {
      return;
    }
    const root_dir = ownerOf(a);
    if (root_dir === null) {
      return;
    }
    if (isBlockedBy(graph, b, a)) {
      state.refusal = `의존 사이클이 생깁니다 — ${a}가 이미 ${b}를 막고 있습니다`;
      return;
    }
    graph.set(a, [...blockers, b]);
    if (lane_id !== undefined) {
      lane_created.add(edgeKey(a, b));
    }
    dep_ops.push({
      type: 'dep-add',
      a,
      b,
      root_dir,
      ...(lane_id === undefined ? {} : { lane_id })
    });
  };

  /**
   * @param {string} a
   * @param {string} b
   */
  const laneCreated = (a, b) => lane_created.has(edgeKey(a, b));

  return { graph, dep_ops, state, ownerOf, addDep, removeDep, laneCreated };
}

/**
 * Order the finished plan the way the view sends it (§5.5, UI-jaua §7.2).
 * `dep-remove`와 `disarm`이 레인 op 앞이고 `dep-add`가 뒤인 것은 규약이므로,
 * 종류별로 갈라 놓는 일도 계획의 몫이다.
 *
 * @param {DepPlanner} planner
 * @param {DropModel} model
 * @param {LaneOp[]} lane_ops
 * @param {QueueOp[]} queue_ops
 * @param {{ disarm_ops?: QueueOp[], lane_id?: string, correction?: LaneCorrection }} [extra]
 * @returns {DropPlan}
 */
function planResult(planner, model, lane_ops, queue_ops, extra = {}) {
  if (planner.state.refusal !== null) {
    return { refused: planner.state.refusal };
  }
  const net = netDepOps(planner.dep_ops, model.blocked_by_map);
  const removes = net.filter((op) => op.type === 'dep-remove');
  const adds = net.filter((op) => op.type === 'dep-add');
  const disarms = extra.disarm_ops ?? [];
  const info =
    extra.lane_id === undefined || extra.correction === undefined
      ? undefined
      : correctionInfo(extra.lane_id, extra.correction);
  return {
    lane_ops,
    ops: [...removes, ...disarms, ...adds, ...queue_ops],
    lane_op_index: removes.length + disarms.length,
    ...(info === undefined ? {} : { correction: info })
  };
}

/**
 * The 확정 열's adjacent links (§5.4): 쌍마다 `dep-add entries[i+1] ←
 * entries[i]`. 이미 있는 엣지는 `addDep`가 건너뛰고, 사이클이면 계획 전체가
 * 거부된다. 교정 뒤의 순서로 부르는 것이 UI-jaua §6.4다.
 *
 * @param {DepPlanner} planner
 * @param {LaneEntry[]} entries
 * @param {string} lane_id - provenance 2단계가 올릴 쌍의 표식 (UI-jaua §7.1).
 */
function linkAdjacent(planner, entries, lane_id) {
  for (let i = 1; i < entries.length; i += 1) {
    planner.addDep(entries[i].bead_id, entries[i - 1].bead_id, lane_id);
  }
}

/**
 * Did the lane create the `blocks` edge between `entries[index]` and the entry
 * right before it (UI-jaua §7.1)? 필드가 없는 기존 확정 레인은 `false`로 읽혀
 * 아무 의존도 지우지 않는다 — 마이그레이션 없이 안전한 쪽으로 수렴한다.
 *
 * @param {LaneState} lane
 * @param {number} index
 */
function laneOwnsDepBefore(lane, index) {
  return index > 0 && lane.entries[index]?.dep_created_by_lane === true;
}

/**
 * The `worker-queue-disarm` ops for members LEAVING a lane (§5.3 (1)·§7.2).
 * 레인이 사라진 뒤에는 어느 멤버가 그 레인 것이었는지 알 수 없으므로 계획이
 * 레인 op보다 앞에 낸다. 레포를 모르는 멤버는 조용히 건너뛴다 — 삭제를 막을
 * 이유가 되지 못한다 (fail-quiet).
 *
 * @param {DropModel} model
 * @param {LaneState} lane
 * @param {string} lane_id
 * @param {LaneEntry[]} leaving
 * @returns {QueueOp[]}
 */
function disarmOps(model, lane, lane_id, leaving) {
  if (lane.status !== 'confirmed') {
    return [];
  }
  /** @type {QueueOp[]} */
  const ops = [];
  /** @type {Map<string, string[]>} */
  const by_root = new Map();
  for (const entry of leaving) {
    const root_dir = model.owner_of.get(entry.bead_id) || entry.root_dir;
    if (typeof root_dir !== 'string' || root_dir.length === 0) {
      continue;
    }
    by_root.set(root_dir, [...(by_root.get(root_dir) || []), entry.bead_id]);
  }
  for (const [root_dir, bead_ids] of by_root) {
    ops.push({
      type: 'worker-queue-disarm',
      payload: { bead_ids, lane_id },
      root_dir
    });
  }
  return ops;
}

/**
 * The entries a 레인 op carries. `dep_created_by_lane`은 서버가 소유하는 값이므로
 * (UI-jaua §7.1) 클라이언트는 멤버십과 순서만 보낸다 — 클라이언트가 실어 보낸
 * `true`를 서버가 믿으면 성공하지 않은 `dep-add`의 소유권을 기록하게 된다.
 *
 * @param {LaneEntry[]} entries
 * @returns {LaneEntry[]}
 */
function payloadEntries(entries) {
  return entries.map((entry) => ({
    bead_id: entry.bead_id,
    root_dir: entry.root_dir
  }));
}

/**
 * @param {LaneEntry[]} left
 * @param {LaneEntry[]} right
 */
function sameEntries(left, right) {
  return (
    left.length === right.length &&
    left.every(
      (entry, index) =>
        entry.bead_id === right[index].bead_id &&
        entry.root_dir === right[index].root_dir
    )
  );
}

/**
 * Translate ONE drop into the lane op and the server op list it means
 * (§5.1·§5.2·§5.3, UI-j92s §5.4).
 *
 * @param {DropDrag} drag
 * @param {DropTarget} target
 * @param {DropModel} model
 * @returns {DropPlan}
 */
export function planDrop(drag, target, model) {
  const planner = createDepPlanner(model);
  /** @type {LaneOp[]} */
  const lane_ops = [];
  /** @type {QueueOp[]} */
  const queue_ops = [];
  /** @type {QueueOp[]} */
  const disarm_ops = [];
  /** @type {LaneCorrection|undefined} */
  let correction;

  const owner_lane_id = model.owner_lane_of.get(drag.bead_id);
  const source_lane_id =
    drag.kind === 'chain' ? (drag.lane_id ?? owner_lane_id) : undefined;
  const source_lane =
    source_lane_id === undefined
      ? undefined
      : model.cross_lanes.get(source_lane_id);

  if (target.kind === 'repo-serial' && drag.root_dir !== target.root_dir) {
    return { refused: REFUSE_CROSS_REPO };
  }
  if (target.kind === 'chain') {
    if (drag.kind === 'repo-serial') {
      return { refused: REFUSE_SERIAL_TO_CHAIN };
    }
    // `chain` 원천은 자기 레인에서 빼는 update를 함께 내므로 "이미 다른 레인"이
    // 아니다 (§5.4 draft 대상 행). 소속을 옮기려는 뜻이 없는 원천만 거부한다.
    if (
      drag.kind !== 'chain' &&
      typeof owner_lane_id === 'string' &&
      owner_lane_id !== target.lane_id &&
      model.cross_lanes.has(owner_lane_id)
    ) {
      return {
        refused: `이미 연결 ${laneNumber(model, owner_lane_id)}에 있습니다`
      };
    }
    if (!model.cross_lanes.has(target.lane_id)) {
      return { refused: REFUSE_MISSING_LANE };
    }
  }
  if (drag.kind === 'chain' && source_lane === undefined) {
    return { refused: REFUSE_MISSING_LANE };
  }

  /**
   * Splice X out of its own lane, rejoining every (P, S) pair (§5.2). draft
   * 레인은 dep를 만들지 않았으므로 풀 것도 없다 (§5.4 draft 행).
   */
  const spliceOut = () => {
    if (source_lane === undefined || source_lane.status !== 'confirmed') {
      return;
    }
    const index = source_lane.entries.findIndex(
      (entry) => entry.bead_id === drag.bead_id
    );
    if (index < 0) {
      return;
    }
    const before = index > 0 ? source_lane.entries[index - 1] : null;
    const after =
      index + 1 < source_lane.entries.length
        ? source_lane.entries[index + 1]
        : null;
    const owns_before = laneOwnsDepBefore(source_lane, index);
    const owns_after =
      after !== null && laneOwnsDepBefore(source_lane, index + 1);
    if (owns_before && before !== null) {
      planner.removeDep(drag.bead_id, before.bead_id);
    }
    if (owns_after && after !== null) {
      planner.removeDep(after.bead_id, drag.bead_id);
    }
    // 이어 붙이기는 레인이 만든 것을 되돌린 자리에서만 한다 (UI-jaua §7.2).
    // 지운 것이 없다면 이 쌍의 의존은 레인이 만든 것이 아니고, 만들지 않은
    // 자리에 새 의존을 세우는 것도 되돌림이 아니다.
    if ((owns_before || owns_after) && before !== null && after !== null) {
      planner.addDep(
        after.bead_id,
        before.bead_id,
        /** @type {string} */ (source_lane_id)
      );
    }
  };

  /**
   * Insert X at the marker of the TARGET lane's stored order (§5.4). 저장 순서가
   * 곧 그려진 순서이므로 `up`/`down`도 거기서만 나온다 — 파생 체인 시절의 임시
   * 그래프 재정렬은 이제 사용자가 보는 순서와 어긋난다.
   *
   * @param {string} lane_id
   * @param {number} marker_index
   */
  const insertIntoLane = (lane_id, marker_index) => {
    const lane = /** @type {LaneState} */ (model.cross_lanes.get(lane_id));
    const source_position = lane.entries.findIndex(
      (entry) => entry.bead_id === drag.bead_id
    );
    const rest = lane.entries.filter((entry) => entry.bead_id !== drag.bead_id);
    const marker = Math.max(
      0,
      Math.min(
        rest.length,
        source_position >= 0 && marker_index > source_position
          ? marker_index - 1
          : marker_index
      )
    );
    let last_fixed = -1;
    rest.forEach((entry, index) => {
      if (model.fixed_members.has(entry.bead_id)) {
        last_fixed = index;
      }
    });
    if (marker <= last_fixed) {
      planner.state.refusal = REFUSE_FIXED_ROW;
      return;
    }
    /** @type {LaneEntry} */
    const moved =
      source_position >= 0
        ? lane.entries[source_position]
        : (source_lane?.entries.find(
            (entry) => entry.bead_id === drag.bead_id
          ) ?? { bead_id: drag.bead_id, root_dir: drag.root_dir });
    // 드롭 즉시 교정한다 (UI-jaua §3.3·§6.2): 기존 `blocks` 의존이 사용자가 놓은
    // 자리를 이긴다. 교정된 순서 위에서 인접 dep를 내므로 §1.2의 사이클 거부가
    // 원리적으로 나오지 않는다 (§6.4).
    correction = correctLaneOrder(
      {
        status: lane.status,
        entries: [...rest.slice(0, marker), moved, ...rest.slice(marker)]
      },
      model
    );
    const entries = correction.entries;
    if (!sameEntries(entries, lane.entries)) {
      lane_ops.push({
        type: 'monitor-lane-update',
        payload: { lane_id, entries: payloadEntries(entries) }
      });
    }
    if (lane.status !== 'confirmed') {
      return;
    }
    const position = entries.findIndex(
      (entry) => entry.bead_id === drag.bead_id
    );
    const up = position > 0 ? entries[position - 1].bead_id : null;
    const down =
      position + 1 < entries.length ? entries[position + 1].bead_id : null;
    if (up === null) {
      if (down !== null) {
        planner.addDep(down, drag.bead_id, lane_id);
      }
      return;
    }
    planner.addDep(drag.bead_id, up, lane_id);
    if (down !== null && (planner.graph.get(down) || []).includes(up)) {
      // 끊는 것은 레인이 만든 링크뿐이다 (§7.2). 남의 의존이면 그대로 두고
      // 새 인접 관계만 세운다.
      const down_index = lane.entries.findIndex(
        (entry) => entry.bead_id === down
      );
      if (
        planner.laneCreated(down, up) ||
        (down_index > 0 &&
          lane.entries[down_index - 1].bead_id === up &&
          laneOwnsDepBefore(lane, down_index))
      ) {
        planner.removeDep(down, up);
      }
      planner.addDep(down, drag.bead_id, lane_id);
    }
  };

  const source_index =
    typeof drag.queue_index === 'number'
      ? drag.queue_index
      : model.queue_index_of.get(drag.bead_id);

  if (drag.kind === 'chain') {
    spliceOut();
    if (
      source_lane !== undefined &&
      (target.kind !== 'chain' || target.lane_id !== source_lane_id)
    ) {
      const remaining_entries = source_lane.entries.filter(
        (entry) => entry.bead_id !== drag.bead_id
      );
      const leaving_entries =
        source_lane.status === 'confirmed' && remaining_entries.length < 2
          ? source_lane.entries
          : source_lane.entries.filter(
              (entry) => entry.bead_id === drag.bead_id
            );
      // 멤버가 레인에서 빠지는 경로는 그 멤버의 disarm을 함께 낸다 (§5.3 (1)).
      disarm_ops.push(
        ...disarmOps(
          model,
          source_lane,
          /** @type {string} */ (source_lane_id),
          leaving_entries
        )
      );
      lane_ops.push({
        type: 'monitor-lane-update',
        payload: {
          lane_id: /** @type {string} */ (source_lane_id),
          entries: payloadEntries(remaining_entries)
        }
      });
    }
  }
  if (target.kind === 'chain') {
    insertIntoLane(target.lane_id, target.marker_index);
  }
  if (planner.state.refusal !== null) {
    return { refused: planner.state.refusal };
  }

  if (target.kind === 'candidate') {
    if (drag.kind !== 'candidate') {
      queue_ops.push({
        type: 'worker-queue-remove',
        payload: { bead_id: drag.bead_id },
        root_dir: drag.root_dir
      });
    }
  } else if (target.kind === 'parallel') {
    const k = parallelInsertIndex(model, drag.root_dir, target.marker_index);
    if (drag.kind === 'candidate' || drag.kind === 'repo-serial') {
      queue_ops.push(placeOp(drag.bead_id, drag.root_dir, k));
    } else if (drag.kind === 'parallel') {
      const rows = model.parallel_rows;
      const over =
        rows[Math.max(0, Math.min(rows.length, target.marker_index))];
      // 자기 행 위에 놓기는 제자리다 (§5.2 같은 자리 재배치는 no-op).
      const in_place = !!over && over.bead_id === drag.bead_id;
      if (
        !in_place &&
        hasParallelRow(model, drag.root_dir) &&
        source_index !== undefined
      ) {
        const to_index = source_index > k ? k : k - 1;
        if (to_index >= 0 && to_index !== source_index) {
          queue_ops.push({
            type: 'worker-queue-reorder',
            payload: { bead_id: drag.bead_id, to_index },
            root_dir: drag.root_dir
          });
        }
      }
    }
  } else if (target.kind === 'chain') {
    // 레인 드롭은 적재하지 않는다. 큐 적재와 arm은 `▶ 진행`이 소유한다.
  } else {
    if (drag.kind === 'repo-serial' && drag.lane_id === target.lane_id) {
      // 자기 행 위에 놓기는 제자리다 (§5.2).
      if (source_index !== undefined && target.index !== source_index) {
        const to_index =
          source_index > target.index ? target.index : target.index - 1;
        if (to_index >= 0 && to_index !== source_index) {
          queue_ops.push({
            type: 'worker-queue-reorder',
            payload: {
              bead_id: drag.bead_id,
              lane: target.lane_id,
              to_index
            },
            root_dir: drag.root_dir
          });
        }
      }
    } else {
      queue_ops.push(
        placeOp(drag.bead_id, drag.root_dir, target.index, target.lane_id)
      );
    }
  }

  return planResult(planner, model, lane_ops, queue_ops, {
    disarm_ops,
    ...(target.kind === 'chain' ? { lane_id: target.lane_id, correction } : {})
  });
}

/**
 * The `확정` button (UI-d3i1 §7.1): 인접 dep를 만들고 레인을 `confirmed`로
 * 넘긴다. 큐 적재는 하지 않는다 — `auto_advance` ON 레포에서는 병렬 큐 진입이
 * 곧 발차라 확정이 출발이 되어 버리므로, 적재와 arm은 `▶ 진행`이 소유한다.
 * 사이클이면 **`confirm`도 보내지 않는다** — 의존 없는 확정 레인은 어긋남만
 * 남긴다.
 *
 * @param {string} lane_id
 * @param {DropModel} model
 * @returns {DropPlan}
 */
export function planLaneConfirm(lane_id, model) {
  const lane = model.cross_lanes.get(lane_id);
  if (lane === undefined) {
    return { refused: REFUSE_MISSING_LANE };
  }
  if (lane.entries.length < 2) {
    return { refused: '확정하려면 멤버가 2개 이상이어야 합니다' };
  }
  const correction = correctLaneOrder(lane, model);
  // 보류는 `확정`도 막는다 (§6.1): 교정되지 않은 순서로 `dep-add`를 내면 §1.2의
  // 사이클 거부로 되돌아간다.
  if (correction.held) {
    return { refused: HOLD_CORRECTION };
  }
  const entries = correction.entries;
  const planner = createDepPlanner(model);
  /** @type {QueueOp[]} */
  const queue_ops = [];
  linkAdjacent(planner, entries, lane_id);
  /** @type {LaneOp[]} */
  const lane_ops = sameEntries(entries, lane.entries)
    ? []
    : [
        {
          type: 'monitor-lane-update',
          payload: { lane_id, entries: payloadEntries(entries) }
        }
      ];
  lane_ops.push({ type: 'monitor-lane-confirm', payload: { lane_id } });
  return planResult(planner, model, lane_ops, queue_ops, {
    lane_id,
    correction
  });
}

/**
 * The `재적용` button (UI-d3i1 §7.1): 확정 레인의 빠진 인접 dep를 다시 만드는
 * 것만 한다. 큐 적재는 `▶ 진행`이 소유하므로 `queue_ops`는 비어 있고, 레인
 * 자체는 바뀌지 않으므로 레인 op도 없다.
 *
 * @param {string} lane_id
 * @param {DropModel} model
 * @returns {DropPlan}
 */
export function planLaneReapply(lane_id, model) {
  const lane = model.cross_lanes.get(lane_id);
  if (lane === undefined) {
    return { refused: REFUSE_MISSING_LANE };
  }
  const correction = correctLaneOrder(lane, model);
  const entries = correction.entries;
  const planner = createDepPlanner(model);
  /** @type {QueueOp[]} */
  const queue_ops = [];
  linkAdjacent(planner, entries, lane_id);
  /** @type {LaneOp[]} */
  const lane_ops = sameEntries(entries, lane.entries)
    ? []
    : [
        {
          type: 'monitor-lane-update',
          payload: { lane_id, entries: payloadEntries(entries) }
        }
      ];
  return planResult(planner, model, lane_ops, queue_ops, {
    lane_id,
    correction
  });
}

/**
 * The `⛓` 패널이 같은 레인 멤버 쌍의 의존을 바꾼 뒤의 재교정 (§6.2). 순서만
 * 고치는 계획이므로 dep도 큐도 만들지 않는다 — 레포 직렬 레인이 UI-2gi1 §6.5에서
 * 쓰는 재교정 트리거와 같은 성질이다.
 *
 * @param {string} lane_id
 * @param {DropModel} model
 * @returns {DropPlan}
 */
export function planLaneCorrection(lane_id, model) {
  const lane = model.cross_lanes.get(lane_id);
  if (lane === undefined) {
    return { refused: REFUSE_MISSING_LANE };
  }
  const correction = correctLaneOrder(lane, model);
  const entries = correction.entries;
  return planResult(
    createDepPlanner(model),
    model,
    sameEntries(entries, lane.entries)
      ? []
      : [
          {
            type: 'monitor-lane-update',
            payload: { lane_id, entries: payloadEntries(entries) }
          }
        ],
    [],
    { lane_id, correction }
  );
}

/**
 * The lane `✕` (§5.1): confirmed 레인은 인접 쌍마다 `dep-remove`를 먼저 보내고
 * 레인을 지운다. draft는 만든 dep가 없으므로 레인 op 하나뿐이다.
 *
 * @param {string} lane_id
 * @param {DropModel} model
 * @returns {DropPlan}
 */
export function planLaneRemove(lane_id, model) {
  const lane = model.cross_lanes.get(lane_id);
  if (lane === undefined) {
    return { refused: REFUSE_MISSING_LANE };
  }
  const planner = createDepPlanner(model);
  if (lane.status === 'confirmed') {
    // 되돌리는 것은 만든 것뿐이다 (§4·§7.2). 필드가 없는 기존 확정 레인은
    // 전부 `false`로 읽혀 아무 의존도 지우지 않는다.
    for (let i = 1; i < lane.entries.length; i += 1) {
      if (laneOwnsDepBefore(lane, i)) {
        planner.removeDep(lane.entries[i].bead_id, lane.entries[i - 1].bead_id);
      }
    }
  }
  return planResult(
    planner,
    model,
    [{ type: 'monitor-lane-remove', payload: { lane_id } }],
    [],
    { disarm_ops: disarmOps(model, lane, lane_id, lane.entries) }
  );
}

/**
 * The lane `✕` 확인 대화 문장 (§7.3), or `null` when 확인이 필요 없을 때
 * (draft 레인은 만든 dep가 없으므로 현행대로 즉시 삭제한다).
 *
 * `의존 N개를 함께 제거합니다`가 답하지 못한 물음 — **어느** 의존이 지워지는가 —
 * 에 답한다. §1.3의 사고는 사용자가 그 목록을 볼 수 없었기 때문에 일어났다.
 *
 * @param {string} lane_id
 * @param {DropModel} model
 * @returns {string|null}
 */
export function describeLaneRemoval(lane_id, model) {
  const lane = model.cross_lanes.get(lane_id);
  if (lane === undefined || lane.status !== 'confirmed') {
    return null;
  }
  /** @type {string[]} */
  const removed = [];
  /** @type {string[]} */
  const kept = [];
  for (let i = 1; i < lane.entries.length; i += 1) {
    const pair = `  ${lane.entries[i].bead_id} ← ${lane.entries[i - 1].bead_id}`;
    if (laneOwnsDepBefore(lane, i)) {
      removed.push(pair);
    } else {
      kept.push(`${pair} (레인이 만들지 않음)`);
    }
  }
  const head = `연결 ${laneNumber(model, lane_id)}을 지웁니다.`;
  if (removed.length === 0) {
    return `${head}\n의존은 그대로 둡니다`;
  }
  return [
    head,
    '함께 제거할 의존:',
    ...removed,
    ...(kept.length === 0 ? [] : ['그대로 두는 의존:', ...kept])
  ].join('\n');
}

/**
 * The provenance 2단계 payload (§7.1): 이번 실행에서 **성공한** `dep-add`가
 * 만든 쌍만 레인별로 모은다. `addDep`가 이미 있는 엣지를 건너뛰므로 `재적용`이
 * 변하지 않은 `true`를 덮는 일이 없고, 실패한 쌍은 애초에 여기 오지 않는다.
 *
 * `after`는 CAS 충돌 뒤 "최신 레인에서 여전히 인접인가"를 다시 묻기 위한 것이며
 * op payload에는 싣지 않는다.
 *
 * @param {DepOp[]} applied - 실제로 성공한 `dep-add` op들.
 * @returns {Array<{ lane_id: string, pairs: Array<{ bead_id: string, after: string }> }>}
 */
export function laneProvenanceUpdates(applied) {
  /** @type {Map<string, Array<{ bead_id: string, after: string }>>} */
  const by_lane = new Map();
  for (const op of applied) {
    if (op.type !== 'dep-add' || typeof op.lane_id !== 'string') {
      continue;
    }
    by_lane.set(op.lane_id, [
      ...(by_lane.get(op.lane_id) || []),
      { bead_id: op.a, after: op.b }
    ]);
  }
  return [...by_lane].map(([lane_id, pairs]) => ({ lane_id, pairs }));
}

/**
 * Keep only the pairs still adjacent on the NEWEST lane (§7.1): CAS 충돌 뒤
 * 1회 재시도가 옛 인접 관계를 되살리지 않게 한다.
 *
 * @param {LaneEntry[]} entries
 * @param {Array<{ bead_id: string, after: string }>} pairs
 */
export function adjacentProvenancePairs(entries, pairs) {
  const position_of = new Map(
    entries.map((entry, index) => [entry.bead_id, index])
  );
  return pairs.filter((pair) => {
    const index = position_of.get(pair.bead_id);
    return (
      index !== undefined &&
      index > 0 &&
      entries[index - 1].bead_id === pair.after
    );
  });
}

/**
 * `+ 새 연결 레인`(배치 메뉴)과 영역 헤더의 `+ 연결 레인` (§5.1·§5.4): seed가
 * 있으면 그것만 든 draft를, 없으면 빈 draft를 만든다. dep도 큐도 만들지 않는다.
 *
 * @param {{ bead_id: string, root_dir: string }|null} seed
 * @param {DropModel} model
 * @returns {DropPlan}
 */
export function planLaneCreate(seed, model) {
  if (seed !== null) {
    const owner_lane_id = model.owner_lane_of.get(seed.bead_id);
    if (
      typeof owner_lane_id === 'string' &&
      model.cross_lanes.has(owner_lane_id)
    ) {
      return {
        refused: `이미 연결 ${laneNumber(model, owner_lane_id)}에 있습니다`
      };
    }
  }
  return {
    lane_ops: [
      {
        type: 'monitor-lane-create',
        payload: { entries: seed === null ? [] : [seed] }
      }
    ],
    ops: [],
    lane_op_index: 0
  };
}
