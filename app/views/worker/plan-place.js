/**
 * plan 일괄 배치의 화면 쪽 공유 조각 (UI-ruwu §3).
 *
 * plan 묶음 칩 팝업의 `[plan 전체를 레인에 배치]`는 Worker 탭·Monitor 탭·이슈
 * 상세 세 표면이 같은 op를 같은 규율로 보낸다. 레인 선택지, 마지막 응답의
 * `skipped` 기억, 응답 토스트, 충돌 1회 재시도가 한 곳에 있어야 세 표면이 같은
 * 판정을 다르게 읽지 않는다. 서버 판정(`worker-queue-place-plan`)은 그대로 두고
 * 여기서는 보내고 읽기만 한다.
 */
import { placeMenuLanes } from './placement.js';

/**
 * @typedef {{ id: string, reason: string }} PlanSkip
 */

/**
 * One serial lane a plan can be placed into. `ids` are the beads already
 * waiting in it, which is the only material the default-lane rule reads.
 *
 * @typedef {{ id: string, label: string, ids: string[] }} PlanPlaceLane
 */

/**
 * What a surface hands the popup so it can draw the exit line and the
 * `세션 필요` marks.
 *
 * @typedef {Object} PlanPlaceContext
 * @property {string} root_dir - The repository the placement targets; always sent.
 * @property {PlanPlaceLane[]} lanes - Serial lanes only. Empty means no exit line.
 * @property {PlanSkip[]} skipped - The last reply's refusals for this plan.
 */

/**
 * The serial lanes of one queue snapshot. The parallel lane is never offered
 * because a plan's order is its point (spec §3 레인 선택).
 *
 * @param {unknown} queue - A `worker-queue` snapshot or a monitor workspace.
 * @returns {PlanPlaceLane[]}
 */
export function planPlaceLanesOf(queue) {
  const menu = placeMenuLanes(queue);
  if (!menu) {
    return [];
  }
  const snapshot = /** @type {Record<string, any>} */ (queue);
  /** @type {Map<string, string[]>} */
  const ids_by_lane = new Map();
  for (const lane of Array.isArray(snapshot.serial_lanes)
    ? snapshot.serial_lanes
    : []) {
    if (lane && typeof lane.id === 'string' && Array.isArray(lane.entries)) {
      ids_by_lane.set(
        lane.id,
        lane.entries
          .map((/** @type {any} */ entry) => entry && entry.bead_id)
          .filter((/** @type {unknown} */ id) => typeof id === 'string')
      );
    }
  }
  return menu
    .filter((entry) => entry.id !== 'parallel')
    .map((entry) => ({
      id: entry.id,
      label: entry.label,
      ids: ids_by_lane.get(entry.id) || []
    }));
}

/**
 * The lane the popup preselects: where the group's first issue already waits,
 * else the first serial lane (spec §3 레인 선택).
 *
 * @param {string} first_id - The first member of the group.
 * @param {PlanPlaceLane[]} lanes
 * @returns {string} A lane id, or `''` when there is no serial lane.
 */
export function planDefaultLane(first_id, lanes) {
  const holder = lanes.find((lane) => lane.ids.includes(first_id));
  return holder ? holder.id : lanes.length > 0 ? lanes[0].id : '';
}

/**
 * The last reply's `skipped` per plan, so a member waiting on a skipped issue
 * can say `세션 필요` (spec §3 직렬 레인에서의 진행). View state, never durable:
 * the server persists no refusal for these.
 *
 * @returns {{ get: (root_dir: string, plan_path: string) => PlanSkip[], set: (root_dir: string, plan_path: string, skipped: PlanSkip[]) => void, pending: Set<string> }}
 */
export function createPlanSkipMemory() {
  /** @type {Map<string, PlanSkip[]>} */
  const by_plan = new Map();
  /**
   * @param {string} root_dir
   * @param {string} plan_path
   * @returns {string}
   */
  const keyOf = (root_dir, plan_path) => `${root_dir}\u0000${plan_path}`;
  return {
    get: (root_dir, plan_path) => by_plan.get(keyOf(root_dir, plan_path)) || [],
    set: (root_dir, plan_path, skipped) => {
      by_plan.set(keyOf(root_dir, plan_path), skipped);
    },
    pending: new Set()
  };
}

/**
 * Why a skipped issue was refused, in the popup's own words.
 *
 * @param {PlanSkip[]} skipped
 * @returns {string}
 */
function skippedText(skipped) {
  return skipped.map((entry) => `${entry.id}(${entry.reason})`).join(', ');
}

/**
 * The toast for one `worker-queue-place-plan` reply.
 *
 * @param {any} reply
 * @returns {{ text: string, type: 'success'|'warning'|'error' }}
 */
export function planPlaceToast(reply) {
  const skipped = Array.isArray(reply?.skipped) ? reply.skipped : [];
  const placed = Array.isArray(reply?.placed) ? reply.placed : [];
  if (reply?.conflict) {
    return {
      text: '큐가 바뀌었습니다 — 목록을 다시 읽고 다시 시도해 주세요',
      type: 'error'
    };
  }
  if (reply?.applied === true) {
    return skipped.length > 0
      ? {
          text: `plan 배치: ${placed.length}개 추가 · 건너뜀 ${skippedText(skipped)}`,
          type: 'warning'
        }
      : { text: `plan 배치: ${placed.length}개 추가`, type: 'success' };
  }
  const detail = skipped.length > 0 ? ` · 건너뜀 ${skippedText(skipped)}` : '';
  switch (reply?.reason) {
    case 'no_eligible':
      return {
        text: `plan 배치할 수 있는 이슈가 없습니다${detail}`,
        type: 'error'
      };
    case 'plan_group_not_found':
      return {
        text: 'plan 묶음을 찾지 못했습니다 — 목록을 다시 읽으세요',
        type: 'error'
      };
    case 'snapshot_unavailable':
      return {
        text: '목록을 아직 읽지 못했습니다 — 잠시 뒤 다시 시도해 주세요',
        type: 'error'
      };
    case 'member_present':
      return {
        text: '일부 이슈가 방금 큐에 들어갔습니다 — 목록을 다시 읽으세요',
        type: 'error'
      };
    default:
      return {
        text: `plan 배치 거부: ${reply?.reason || 'unknown'}${detail}`,
        type: 'error'
      };
  }
}

/**
 * Send `worker-queue-place-plan` from a popup exit line. `root_dir` is ALWAYS
 * the item's repository, so a request never lands in the connection's own
 * workspace by silence. A stale revision is retried ONCE against the queue the
 * conflict reply carries — the same discipline every other queue write uses.
 *
 * @param {{
 *   transport: ((type: string, payload?: any) => Promise<any>)|undefined,
 *   showToast: (message: string, kind?: 'error'|'success'|'info'|'warning', ms?: number) => void,
 *   memory: ReturnType<typeof createPlanSkipMemory>,
 *   root_dir: string,
 *   plan_path: string,
 *   lane: string,
 *   revision: () => number,
 *   adopt: (reply: any) => void
 * }} input
 * @returns {Promise<any>} The last reply, or `null` when nothing was sent.
 */
export async function placePlanFromPopup(input) {
  const { transport, showToast, memory, root_dir, plan_path, lane } = input;
  const key = `${root_dir}\u0000${plan_path}`;
  if (
    !transport ||
    root_dir.length === 0 ||
    plan_path.length === 0 ||
    !/^s[1-5]$/.test(lane) ||
    memory.pending.has(key)
  ) {
    return null;
  }
  memory.pending.add(key);
  try {
    /**
     * @param {number} expected_revision
     * @returns {Promise<any>}
     */
    const send = (expected_revision) =>
      transport('worker-queue-place-plan', {
        root_dir,
        plan_path,
        lane,
        expected_revision
      });
    let reply = await send(input.revision());
    input.adopt(reply);
    if (reply && reply.conflict) {
      const revision = reply.queue?.revision;
      reply = await send(
        typeof revision === 'number' ? revision : input.revision()
      );
      input.adopt(reply);
    }
    if (reply && Array.isArray(reply.skipped)) {
      memory.set(root_dir, plan_path, reply.skipped);
    }
    const toast = planPlaceToast(reply);
    showToast(toast.text, toast.type, 4000);
    return reply;
  } catch (error) {
    showToast(
      error instanceof Error && error.message
        ? error.message
        : 'plan 배치 요청에 실패했습니다',
      'error'
    );
    return null;
  } finally {
    memory.pending.delete(key);
  }
}
