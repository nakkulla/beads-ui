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
 * @typedef {import('../../model/queue-blockers.js').LaneMember} LaneMember
 */
import { overlapPrefixes } from '../../model/scope-overlap.js';

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
