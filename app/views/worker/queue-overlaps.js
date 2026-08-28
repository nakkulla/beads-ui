/**
 * Worker 탭의 scope 겹침 파생 (UI-jbao, UI-qm12 §5.2·§5.4의 워커 탭 투영).
 *
 * 서버가 워커 채널 스냅샷에 실어 보내는 선언 scope 사실(`bead_scope`)에서
 * 클라이언트가 겹침을 pairwise로 파생한다 — 모니터의 `applyScopeOverlaps`와
 * 같은 규칙이되, 워커 탭은 워크스페이스 하나이므로 레포 분기가 없다. 판정
 * 규칙의 SoT은 UI-qm12 스펙이고 이 모듈은 그 규칙의 두 번째 소비자다.
 *
 * 칩 클릭은 그 이슈의 상세이고 1클릭 직렬 배치는 없다 (UI-8x90 §4.3) — 이
 * 모듈은 `overlaps[]`·`scope_missing` 파생만 소유한다.
 *
 * @import { OverlapChip } from './lanes.js'
 */
import { overlapPrefixes } from '../../utils/scope-overlap.js';

/**
 * One 화면 사실 항목: 후보·병렬 대기·직렬 레인·실행 중·PR 대기 어딘가에 서 있는
 * bead. 겹침 비교 집합이자 blocked 칩의 위치 사전이므로 (UI-anna §5.2) 이름이
 * 겹침 전용이 아니다 — 두 칩이 같은 목록에서 위치를 읽어야 라벨이 갈리지 않는다.
 * 완료만 밖에 있다.
 *
 * @typedef {Object} LaneMember
 * @property {string} id
 * @property {string} title
 * @property {string} location_label - `실행중` · `#n` · `s1 #n` · `후보` ·
 * `PR 대기`.
 * @property {'parallel'|'serial'|'running'|'candidate'|'pr_wait'} kind -
 * `candidate`는 아직 큐에 없는 후보 행 (UI-f3ma): 배치 대상이라는 점에서 병렬
 * 대기와 같고, 위치만 다르다. `pr_wait`은 이미 출발한 쪽이라 실행 중과 같이
 * 옮길 수 없다 (UI-anna §5.2).
 * @property {'s1'|'s2'|'s3'|'s4'|'s5'|null} lane_id - 직렬 행의 레인, 또는
 * 직렬 레인에서 출발한 실행 중 bead의 출발 레인. 그 외 null.
 * @property {boolean} [queue_placeable] - `candidate`만 싣는다 (UI-d13v §6):
 * 카드의 `[대기로 ↴]`·배치 메뉴와 같은 자격이다. 없거나 false면 옮길 수 없다.
 */

/**
 * Derive 겹침 칩과 `scope 없음` 사실 (UI-qm12 §5.2). 항목 없음 = 아직
 * 안 읽음·스펙 없음, `null` = 읽기 실패 — 둘 다 아무 말도 하지 않는다.
 * `bead_scope`가 없는 구서버 스냅샷은 빈 결과다 (fail-quiet).
 *
 * @param {unknown} bead_scope
 * @param {LaneMember[]} members
 * @returns {Map<string, { overlaps: OverlapChip[], scope_missing: boolean }>}
 */
export function deriveWorkerOverlaps(bead_scope, members) {
  /** @type {Map<string, { overlaps: OverlapChip[], scope_missing: boolean }>} */
  const facts = new Map();
  if (!bead_scope || typeof bead_scope !== 'object') {
    return facts;
  }
  const record = /** @type {Record<string, any>} */ (bead_scope);
  /** @type {Array<{ member: LaneMember, scope: string[] }>} */
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
