/**
 * 타 레포 blocker 판정. 두 화면(Board 카드·Worker/Monitor 레인 카드)이 같은
 * 사실을 같은 규칙으로 말해야 하므로 판정은 여기 하나뿐이다.
 *
 * 모니터의 `classifyBlockerPrefix`는 이 판정에 쓸 수 없다 — 그쪽의
 * `internal`/`external`은 "지금 보이는 workspace 집합의 안/밖"이고, cross-repo
 * 대시보드에서는 다른 레포의 blocker도 그 집합 안에 있으면 `internal`이 된다.
 * 여기서 묻는 것은 "이 이슈와 **같은 레포**인가"뿐이라, 소유 이슈 자신의 prefix가
 * 기준이 된다.
 */

/**
 * A bead id's rig prefix — `UI-a1b2` → `UI`, and a phase child `UI-a1b2.1`
 * reads the same. 구분자가 없으면 prefix를 주장하지 않는다.
 *
 * @param {unknown} bead_id
 * @returns {string}
 */
function beadPrefix(bead_id) {
  if (typeof bead_id !== 'string') {
    return '';
  }
  const split_at = bead_id.indexOf('-');
  return split_at > 0 ? bead_id.slice(0, split_at) : '';
}

/**
 * `false` whenever either prefix is unreadable — 모르는 것을 타 레포라고 칠하지
 * 않는다(fail-quiet). 칠하지 않은 칩은 기존 blocked 색 그대로 선다.
 *
 * @param {unknown} owner_id - blocker에 막혀 있는 쪽 bead id.
 * @param {unknown} blocker_id
 */
export function isForeignBlocker(owner_id, blocker_id) {
  const owner_prefix = beadPrefix(owner_id);
  const blocker_prefix = beadPrefix(blocker_id);
  if (owner_prefix.length === 0 || blocker_prefix.length === 0) {
    return false;
  }
  return owner_prefix !== blocker_prefix;
}
