/**
 * Worker 탭의 scope 겹침 파생 (UI-jbao, UI-qm12 §5.2·§5.4의 워커 탭 투영).
 *
 * 서버가 워커 채널 스냅샷에 실어 보내는 선언 scope 사실(`bead_scope`)에서
 * 클라이언트가 겹침을 pairwise로 파생한다 — 모니터의 `applyScopeOverlaps`와
 * 같은 규칙이되, 워커 탭은 워크스페이스 하나이므로 레포 분기가 없다. 판정
 * 규칙의 SoT은 UI-qm12 스펙이고 이 모듈은 그 규칙의 두 번째 소비자다.
 *
 * @import { OverlapChip } from './lanes.js'
 */
import { overlapPrefixes } from '../../utils/scope-overlap.js';

/**
 * One 비교 집합 항목: 후보·병렬 대기·직렬 레인·실행 중 어딘가에 서 있는 bead.
 * PR 대기·완료는 서버 적재 범위 밖이라 애초에 들어오지 않는다 (§5.2).
 *
 * @typedef {Object} OverlapMember
 * @property {string} id
 * @property {string} title
 * @property {string} location_label - `실행중` · `#n` · `s1 #n` · `후보`.
 * @property {'parallel'|'serial'|'running'|'candidate'} kind - `candidate`는
 * 아직 큐에 없는 후보 행 (UI-f3ma): 배치 대상이라는 점에서 병렬 대기와 같고,
 * 위치만 다르다.
 * @property {'s1'|'s2'|'s3'|'s4'|'s5'|null} lane_id - 직렬 행의 레인, 또는
 * 직렬 레인에서 출발한 실행 중 bead의 출발 레인. 그 외 null.
 */

/**
 * Derive 겹침 칩과 `scope 없음` 사실 (UI-qm12 §5.2). 항목 없음 = 아직
 * 안 읽음·스펙 없음, `null` = 읽기 실패 — 둘 다 아무 말도 하지 않는다.
 * `bead_scope`가 없는 구서버 스냅샷은 빈 결과다 (fail-quiet).
 *
 * @param {unknown} bead_scope
 * @param {OverlapMember[]} members
 * @returns {Map<string, { overlaps: OverlapChip[], scope_missing: boolean }>}
 */
export function deriveWorkerOverlaps(bead_scope, members) {
  /** @type {Map<string, { overlaps: OverlapChip[], scope_missing: boolean }>} */
  const facts = new Map();
  if (!bead_scope || typeof bead_scope !== 'object') {
    return facts;
  }
  const record = /** @type {Record<string, any>} */ (bead_scope);
  /** @type {Array<{ member: OverlapMember, scope: string[] }>} */
  const declared = [];
  /** @type {Set<string>} */
  const seen = new Set();
  for (const member of members) {
    if (seen.has(member.id)) {
      continue;
    }
    seen.add(member.id);
    const entry = record[member.id];
    if (!entry || !Array.isArray(entry.scope)) {
      continue;
    }
    const scope = entry.scope.filter(
      (/** @type {unknown} */ path) =>
        typeof path === 'string' && path.length > 0
    );
    if (scope.length === 0) {
      facts.set(member.id, { overlaps: [], scope_missing: true });
      continue;
    }
    facts.set(member.id, { overlaps: [], scope_missing: false });
    declared.push({ member, scope });
  }
  for (let left = 0; left < declared.length; left += 1) {
    for (let right = left + 1; right < declared.length; right += 1) {
      const prefixes = overlapPrefixes(
        declared[left].scope,
        declared[right].scope
      );
      if (prefixes.length === 0) {
        continue;
      }
      const a = declared[left].member;
      const b = declared[right].member;
      facts.get(a.id)?.overlaps.push({
        id: b.id,
        title: b.title,
        location_label: b.location_label,
        prefixes
      });
      facts.get(b.id)?.overlaps.push({
        id: a.id,
        title: a.title,
        location_label: a.location_label,
        prefixes
      });
    }
  }
  return facts;
}

/**
 * @typedef {{ kind: 'note', text: string }
 *   | { kind: 'disabled', title: string }
 *   | { kind: 'ops', title: string, ops: Array<{ bead_id: string, lane: 's1'|'s2'|'s3'|'s4'|'s5', index: number }> }} WorkerPlacementPlan
 */

/**
 * The §5.4 decision table, 워커 탭 판. 어느 한쪽에 직렬 레인이 있으면 그
 * 레인을 쓰고(1 op), 둘 다 없을 때만 빈 레인에 둘을 차례로 넣는다(2 op).
 * 실행 중인 항목은 옮기지 않으므로 그 자리에는 버튼 대신 문장이 선다.
 *
 * @param {string} me_id - 칩을 눌러 팝오버를 연 카드의 bead.
 * @param {string} counterpart_id - 겹치는 상대로 팝오버 행에 선 bead.
 * @param {{ members_by_id: Map<string, OverlapMember>, serial_raw_lengths: Record<string, number>, serial_lane_count: number, occupied_lanes: Set<string> }} queue_facts
 * @returns {WorkerPlacementPlan}
 */
export function workerPlacementPlan(me_id, counterpart_id, queue_facts) {
  const me = queue_facts.members_by_id.get(me_id);
  const other = queue_facts.members_by_id.get(counterpart_id);
  if (!me || !other) {
    return { kind: 'note', text: '상대의 현재 위치를 알 수 없습니다' };
  }
  const my_lane = me.lane_id;
  const other_lane = other.lane_id;
  if (my_lane !== null && my_lane === other_lane) {
    return { kind: 'note', text: '이미 같은 직렬 레인 — 순서가 있습니다' };
  }
  const my_move = me.kind !== 'running';
  const other_move = other.kind !== 'running';
  if (my_move && other_lane !== null) {
    return {
      kind: 'ops',
      title: `${other_lane} 끝에 ${me_id}를 넣습니다`,
      ops: [
        {
          bead_id: me_id,
          lane: other_lane,
          index: queue_facts.serial_raw_lengths[other_lane] || 0
        }
      ]
    };
  }
  if (my_lane !== null && other_move && other_lane === null) {
    return {
      kind: 'ops',
      title: `${my_lane} 끝에 ${counterpart_id}를 넣습니다`,
      ops: [
        {
          bead_id: counterpart_id,
          lane: my_lane,
          index: queue_facts.serial_raw_lengths[my_lane] || 0
        }
      ]
    };
  }
  if (my_move && my_lane === null && other_move && other_lane === null) {
    const empty = firstEmptySerialLane(queue_facts);
    if (empty === null) {
      return {
        kind: 'disabled',
        title: '빈 직렬 레인 없음 — 직렬 레인 수를 조절하세요'
      };
    }
    // 상대가 먼저다 — 겹침 칩은 순서를 주장하지 않지만, 이미 자리를 잡은
    // 쪽을 앞에 두는 것이 사용자가 방금 본 화면과 어긋나지 않는다.
    return {
      kind: 'ops',
      title: `${empty} 레인에 ${counterpart_id} → ${me_id} 순서로 넣습니다`,
      ops: [
        { bead_id: counterpart_id, lane: empty, index: 0 },
        { bead_id: me_id, lane: empty, index: 1 }
      ]
    };
  }
  if (!my_move && !other_move) {
    return { kind: 'note', text: '둘 다 실행 중 — 순서를 만들 수 없습니다' };
  }
  if (!my_move) {
    return {
      kind: 'note',
      text: '실행 중 — 순서를 만들려면 상대를 직렬 레인에 두세요'
    };
  }
  return {
    kind: 'note',
    text: '실행 중 — 종료 후 출발하려면 직렬 레인에 두세요'
  };
}

/**
 * The first EMPTY 직렬 레인 (§5.4): 서버 배열에 entry가 없고 점유자도 없는
 * 레인. 설정만 있고 비어 있는 레인도 후보다.
 *
 * @param {{ serial_raw_lengths: Record<string, number>, serial_lane_count: number, occupied_lanes: Set<string> }} queue_facts
 * @returns {'s1'|'s2'|'s3'|'s4'|'s5'|null}
 */
function firstEmptySerialLane(queue_facts) {
  for (let index = 0; index < queue_facts.serial_lane_count; index += 1) {
    const id = /** @type {'s1'|'s2'|'s3'|'s4'|'s5'} */ (`s${index + 1}`);
    if (
      (queue_facts.serial_raw_lengths[id] || 0) === 0 &&
      !queue_facts.occupied_lanes.has(id)
    ) {
      return id;
    }
  }
  return null;
}
