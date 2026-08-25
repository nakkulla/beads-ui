/**
 * 모니터 blocker 표시 파생값 (UI-2gi1 §6.3–§6.5).
 *
 * 이 모듈의 결과는 모두 표시 전용이다. 스케줄러와 큐 스토어가 계속
 * 권위 있는 판정을 소유하며, 다음 집계 push가 이 파생값을 교체한다.
 */

/**
 * @typedef {'internal'|'external'|'unknown'} BlockerScope
 */

/**
 * @typedef {Object} BlockerLocation
 * @property {string} root_dir
 * @property {string} workspace_name
 * @property {string} lane
 * @property {number} [position]
 * @property {'running'|'pr_wait'|'runnable'|'done'} [state]
 */

/**
 * @typedef {Object} BlockerDisplay
 * @property {string} id
 * @property {string} label
 * @property {BlockerScope|null} scope
 * @property {boolean} same_lane_ahead
 * @property {string} location_label - The 위치 phrase alone (`같은 레인 앞` ·
 * `<repo> · <lane> #n` · `실행중` · `미적재` …), without the `🔒` prefix. The
 * dependency chips (UI-eey2 §5.1) name the DIRECTION themselves
 * (`🔒 선행 …` / `→ 후속 …`) and compose the phrase into their own label.
 */

/**
 * @param {string} root_dir
 * @param {string} lane
 */
function serialLaneKey(root_dir, lane) {
  return `${root_dir}\0${lane}`;
}

/**
 * @param {any} lanes
 * @returns {Map<string, BlockerLocation>}
 */
export function buildBlockerLocationMap(lanes) {
  /** @type {Map<string, BlockerLocation>} */
  const locations = new Map();

  for (const item of Array.isArray(lanes?.running) ? lanes.running : []) {
    locations.set(item.id, {
      root_dir: item.root_dir,
      workspace_name: item.workspace_name,
      lane: 'running',
      state: 'running'
    });
  }
  for (const item of Array.isArray(lanes?.pr_wait) ? lanes.pr_wait : []) {
    locations.set(item.id, {
      root_dir: item.root_dir,
      workspace_name: item.workspace_name,
      lane: 'pr_wait',
      state: 'pr_wait'
    });
  }
  for (const group of Array.isArray(lanes?.queue_groups)
    ? lanes.queue_groups
    : []) {
    const parallel = Array.isArray(group.sublanes?.parallel)
      ? group.sublanes.parallel
      : Array.isArray(group.items)
        ? group.items
        : [];
    for (const item of parallel) {
      locations.set(item.id, {
        root_dir: item.root_dir,
        workspace_name: item.workspace_name,
        lane: 'parallel',
        position: item.queue_position
      });
    }
    for (const lane of Array.isArray(group.sublanes?.serial)
      ? group.sublanes.serial
      : []) {
      for (const item of lane.items) {
        locations.set(item.id, {
          root_dir: item.root_dir,
          workspace_name: item.workspace_name,
          lane: lane.id,
          position: item.queue_position
        });
      }
    }
  }
  for (const item of Array.isArray(lanes?.runnable) ? lanes.runnable : []) {
    locations.set(item.id, {
      root_dir: item.root_dir,
      workspace_name: item.workspace_name,
      lane: 'runnable',
      state: 'runnable'
    });
  }
  for (const item of Array.isArray(lanes?.done) ? lanes.done : []) {
    locations.set(item.id, {
      root_dir: item.root_dir,
      workspace_name: item.workspace_name,
      lane: 'done',
      state: 'done'
    });
  }
  return locations;
}

/**
 * UI-2gi1 §6.3: prefix 소유권은 파이프라인이 빈 곳까지 모든 visible workspace로 판정한다.
 * prefix를 모르는 workspace가 하나라도 있으면 일치하지 않는 id도 중립으로 남긴다.
 *
 * @param {string} blocker_id
 * @param {Array<Record<string, any>>|null|undefined} workspaces_state
 * @returns {BlockerScope}
 */
export function classifyBlockerPrefix(blocker_id, workspaces_state) {
  const states = Array.isArray(workspaces_state) ? workspaces_state : [];
  const split_at = blocker_id.indexOf('-');
  const prefix = split_at > 0 ? blocker_id.slice(0, split_at) : blocker_id;
  if (
    states.some(
      (state) =>
        typeof state?.issue_prefix === 'string' && state.issue_prefix === prefix
    )
  ) {
    return 'internal';
  }
  if (
    states.length > 0 &&
    states.every((state) => typeof state?.issue_prefix === 'string')
  ) {
    return 'external';
  }
  return 'unknown';
}

/**
 * @param {BlockerLocation} location
 */
export function blockerLocationLabel(location) {
  if (location.state === 'running') {
    return '실행중';
  }
  if (location.state === 'pr_wait') {
    return 'PR 대기';
  }
  if (location.state === 'runnable') {
    return '실행가능';
  }
  if (location.state === 'done') {
    return '완료';
  }
  const lane = location.lane === 'parallel' ? '병렬' : location.lane;
  return `${location.workspace_name} · ${lane} #${location.position}`;
}

/**
 * @param {string} blocker_id
 * @param {BlockerLocation|undefined} current_location
 * @param {Map<string, BlockerLocation>} locations
 * @param {Array<Record<string, any>>|null|undefined} workspaces_state
 * @returns {BlockerDisplay}
 */
export function describeBlocker(
  blocker_id,
  current_location,
  locations,
  workspaces_state
) {
  const location = locations.get(blocker_id);
  const same_lane_ahead = !!(
    location &&
    current_location &&
    location.root_dir === current_location.root_dir &&
    location.lane === current_location.lane &&
    typeof location.position === 'number' &&
    typeof current_location.position === 'number' &&
    location.position < current_location.position
  );
  if (same_lane_ahead) {
    return {
      id: blocker_id,
      label: `🔒 ${blocker_id} (같은 레인 앞)`,
      location_label: '같은 레인 앞',
      scope: null,
      same_lane_ahead: true
    };
  }
  if (location) {
    return {
      id: blocker_id,
      label: `🔒 ${blocker_id} (${blockerLocationLabel(location)})`,
      location_label: blockerLocationLabel(location),
      scope: null,
      same_lane_ahead: false
    };
  }
  const scope = classifyBlockerPrefix(blocker_id, workspaces_state);
  const suffix =
    scope === 'internal'
      ? '미적재'
      : scope === 'external'
        ? '외부'
        : '위치 미확인';
  return {
    id: blocker_id,
    label: `🔒 ${blocker_id} (${suffix})`,
    location_label: suffix,
    scope,
    same_lane_ahead: false
  };
}

/**
 * UI-2gi1 §6.4: 각 대기열 맨 앞의 의존 관계로 교차 정지를 찾는다. 각 출발 레인은 순환 안의
 * 직접 대상을 가리켜 헤더가 구체적인 상대 레인을 적을 수 있게 한다.
 *
 * @param {Array<Record<string, any>>|null|undefined} queue_groups
 * @returns {Map<string, Array<{ root_dir: string, workspace_name: string, lane: string }>>}
 */
export function detectSerialLaneHeadCycles(queue_groups) {
  const groups = Array.isArray(queue_groups) ? queue_groups : [];
  /** @type {Map<string, { root_dir: string, workspace_name: string, lane: string }>} */
  const lane_info = new Map();
  /** @type {Map<string, string>} */
  const lane_by_bead = new Map();
  /** @type {Map<string, string[]>} */
  const graph = new Map();

  for (const group of groups) {
    for (const lane of Array.isArray(group.sublanes?.serial)
      ? group.sublanes.serial
      : []) {
      const key = serialLaneKey(group.root_dir, lane.id);
      lane_info.set(key, {
        root_dir: group.root_dir,
        workspace_name: group.name,
        lane: lane.id
      });
      graph.set(key, []);
      for (const item of Array.isArray(lane.items) ? lane.items : []) {
        lane_by_bead.set(item.id, key);
      }
    }
  }

  for (const group of groups) {
    for (const lane of Array.isArray(group.sublanes?.serial)
      ? group.sublanes.serial
      : []) {
      const source = serialLaneKey(group.root_dir, lane.id);
      // `items` drops whatever the exclusive lane priority already claimed, so
      // `items[0]` is the lane's HEAD only when nothing ahead of it was claimed.
      // A lane whose lineage is running or awaiting merge is not waiting at all,
      // and a first card at raw index > 0 stands behind a claimed bead — reading
      // either as a head invents a 상호 정지 that no one is actually in.
      const head = Array.isArray(lane.items) ? lane.items[0] : null;
      const is_waiting_head =
        !!head &&
        head.queue_index === 0 &&
        (!Array.isArray(lane.occupied_by) || lane.occupied_by.length === 0);
      const blockers =
        is_waiting_head && Array.isArray(head.blocked_by)
          ? head.blocked_by
          : [];
      const targets = graph.get(source);
      if (!targets) {
        continue;
      }
      for (const blocker_id of blockers) {
        const target = lane_by_bead.get(blocker_id);
        if (target && target !== source && !targets.includes(target)) {
          targets.push(target);
        }
      }
    }
  }

  /**
   * @param {string} start
   * @param {string} target
   */
  const hasPath = (start, target) => {
    /** @type {Set<string>} */
    const seen = new Set();
    const pending = [start];
    while (pending.length > 0) {
      const current = pending.pop();
      if (current === target) {
        return true;
      }
      if (!current || seen.has(current)) {
        continue;
      }
      seen.add(current);
      pending.push(...(graph.get(current) || []));
    }
    return false;
  };

  /** @type {Map<string, Array<{ root_dir: string, workspace_name: string, lane: string }>>} */
  const cycles = new Map();
  for (const [source, targets] of graph) {
    /** @type {Array<{ root_dir: string, workspace_name: string, lane: string }>} */
    const peers = [];
    for (const target of targets) {
      const peer = lane_info.get(target);
      if (hasPath(target, source) && peer) {
        peers.push(peer);
      }
    }
    if (peers.length > 0) {
      cycles.set(source, peers);
    }
  }
  return cycles;
}

/**
 * @param {string} root_dir
 * @param {string} lane
 */
export function serialCycleKey(root_dir, lane) {
  return serialLaneKey(root_dir, lane);
}
