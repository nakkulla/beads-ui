/**
 * Lane·area 접힘 상태 저장소 (UI-5ksp §4.4).
 *
 * Worker와 Monitor가 같은 다섯 레인을 같은 규칙으로 접으려면 "무엇이 접혀
 * 있나"의 판정과 저장이 한 곳이어야 한다. 저장소는 탭마다 다른 키를 쓰고
 * (`beads-ui.worker.lane-collapsed` · `beads-ui.monitor.lane-collapsed`),
 * 읽기·쓰기 실패는 조용히 기본값으로 대체한다 — 접힘은 표시 상태이지 데이터가
 * 아니므로 private-mode 저장 거부가 화면을 깨뜨리면 안 된다.
 */

/**
 * @typedef {'candidate'|'queue'|'running'|'pr_wait'|'done'} LaneId
 * @typedef {'parallel'|'serial'} AreaId
 * @typedef {{ lanes: Partial<Record<LaneId, boolean>>, areas: Partial<Record<AreaId, boolean>> }} LaneCollapseState
 */

/**
 * Only 완료 starts collapsed (§3-3): 나머지 넷은 사람이 실제로 작업하는
 * 레인이고, 완료는 확인하러 가는 레인이다.
 *
 * @returns {LaneCollapseState}
 */
function defaultState() {
  return { lanes: { done: true }, areas: {} };
}

/**
 * A shallow copy that keeps the boolean entries only — 저장소에 섞여 들어온
 * 다른 타입은 버린다.
 *
 * @param {unknown} source
 * @returns {Record<string, boolean>}
 */
function booleanMap(source) {
  /** @type {Record<string, boolean>} */
  const out = {};
  if (typeof source !== 'object' || source === null) {
    return out;
  }
  for (const [key, value] of Object.entries(source)) {
    if (typeof value === 'boolean') {
      out[key] = value;
    }
  }
  return out;
}

/**
 * Read the stored value into the current schema. `lanes` 키가 없고 최상위가
 * 불리언 맵이면 구형 Worker 스키마(`{ queue, done }`)이므로 그대로 `lanes`로
 * 승격한다.
 *
 * @param {string} storage_key
 * @returns {{ lanes: Record<string, boolean>, areas: Record<string, boolean> }|null}
 */
function readStored(storage_key) {
  try {
    const raw = window.localStorage.getItem(storage_key);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      return null;
    }
    const record = /** @type {Record<string, unknown>} */ (parsed);
    if (typeof record.lanes === 'object' && record.lanes !== null) {
      return {
        lanes: booleanMap(record.lanes),
        areas: booleanMap(record.areas)
      };
    }
    return { lanes: booleanMap(record), areas: {} };
  } catch {
    return null;
  }
}

/**
 * @param {string} storage_key
 * @param {LaneCollapseState} state
 */
function writeStored(storage_key, state) {
  try {
    window.localStorage.setItem(storage_key, JSON.stringify(state));
  } catch {
    /* ignore — private-mode 저장 거부가 아코디언을 깨뜨리면 안 된다 */
  }
}

/**
 * @param {string} storage_key
 * @param {LaneCollapseState} [defaults]
 * @returns {{ isCollapsed: (lane: LaneId) => boolean, isAreaCollapsed: (area: AreaId) => boolean, toggle: (lane: LaneId) => boolean, toggleArea: (area: AreaId) => boolean }}
 */
export function createLaneCollapse(storage_key, defaults = defaultState()) {
  const base = {
    lanes: booleanMap(defaults.lanes),
    areas: booleanMap(defaults.areas)
  };
  const stored = readStored(storage_key);
  /** @type {{ lanes: Record<string, boolean>, areas: Record<string, boolean> }} */
  let state = {
    lanes: { ...base.lanes, ...(stored ? stored.lanes : {}) },
    areas: { ...base.areas, ...(stored ? stored.areas : {}) }
  };
  return {
    /** @param {LaneId} lane */
    isCollapsed(lane) {
      return state.lanes[lane] === true;
    },
    /** @param {AreaId} area */
    isAreaCollapsed(area) {
      return state.areas[area] === true;
    },
    /**
     * @param {LaneId} lane
     */
    toggle(lane) {
      const next = !(state.lanes[lane] === true);
      state = { ...state, lanes: { ...state.lanes, [lane]: next } };
      writeStored(storage_key, state);
      return next;
    },
    /**
     * @param {AreaId} area
     */
    toggleArea(area) {
      const next = !(state.areas[area] === true);
      state = { ...state, areas: { ...state.areas, [area]: next } };
      writeStored(storage_key, state);
      return next;
    }
  };
}
