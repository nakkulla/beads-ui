/**
 * The 막힘 summary (UI-0bvr §6.2, UI-n99w §8): each original issue counted
 * once, grouped by wait kind, with the upstream-covered prerequisite rule.
 * Moved from `views/worker/lanes.js` (UI-dbn6 P1-r2) for the pipeline toolbar.
 * Pure: no template.
 */
import { waitBadgeText, waitKindRow } from './wait-vocabulary.js';

/** 선행 대기의 두 종류. 막힘 집계의 간접 선행 규칙이 읽는다 (UI-0bvr §6.2). */
export const PREREQUISITE_KINDS = Object.freeze([
  'prerequisite',
  'prerequisite_foreign'
]);

/**
 * The nodes of a directed graph that sit on at least one cycle, in one
 * traversal (Tarjan): a strongly connected component larger than one node is a
 * cycle, and so is a self edge. `low`가 자기 `index`와 같아지는 자리에서 스택에
 * 남은 구간이 그 component다.
 *
 * @param {Map<string, string[]>} graph
 * @returns {Set<string>}
 */
function cyclicNodes(graph) {
  const nodes = [...graph.keys()];
  /** @type {Map<string, number>} */
  const id_of = new Map();
  nodes.forEach((node, id) => id_of.set(node, id));
  /** @type {number[][]} */
  const edges = nodes.map(() => []);
  nodes.forEach((node, id) => {
    for (const next of graph.get(node) || []) {
      const target = id_of.get(next);
      if (target !== undefined) {
        edges[id].push(target);
      }
    }
  });
  const index = nodes.map(() => -1);
  const low = nodes.map(() => 0);
  const on_stack = nodes.map(() => false);
  /** @type {number[]} */
  const stack = [];
  /** @type {Set<string>} */
  const cyclic = new Set();
  let next_index = 0;
  const enter = (/** @type {number} */ node) => {
    index[node] = next_index;
    low[node] = next_index;
    next_index += 1;
    stack.push(node);
    on_stack[node] = true;
  };
  for (let root = 0; root < nodes.length; root++) {
    if (index[root] >= 0) {
      continue;
    }
    enter(root);
    /** @type {Array<{ node: number, edge: number }>} */
    const frames = [{ node: root, edge: 0 }];
    while (frames.length > 0) {
      const frame = frames[frames.length - 1];
      if (frame.edge < edges[frame.node].length) {
        const next = edges[frame.node][frame.edge];
        frame.edge += 1;
        if (next === frame.node) {
          cyclic.add(nodes[next]);
        } else if (index[next] < 0) {
          enter(next);
          frames.push({ node: next, edge: 0 });
        } else if (on_stack[next]) {
          low[frame.node] = Math.min(low[frame.node], index[next]);
        }
        continue;
      }
      frames.pop();
      if (frames.length > 0) {
        const parent = frames[frames.length - 1].node;
        low[parent] = Math.min(low[parent], low[frame.node]);
      }
      if (low[frame.node] !== index[frame.node]) {
        continue;
      }
      /** @type {number[]} */
      const component = [];
      for (;;) {
        const member = stack.pop();
        if (member === undefined) {
          break;
        }
        on_stack[member] = false;
        component.push(member);
        if (member === frame.node) {
          break;
        }
      }
      if (component.length > 1) {
        for (const member of component) {
          cyclic.add(nodes[member]);
        }
      }
    }
  }
  return cyclic;
}

/**
 * The subjects an upstream row already represents (UI-0bvr §6.2). `막힘 N`이
 * 답하는 질문은 "지금 손댈 곳이 몇 군데인가"이므로, 열린 선행이 **전부** 같은
 * 워크스페이스의 다른 막힌 행이고 **어떤 순환에도 속하지 않는** 이슈는 그 선행
 * 사유를 집계와 요약 목록에서 잃는다 — 상류를 풀면 함께 풀리고 그 상류 행이 이미
 * 같은 막힘을 대표한다. 대표되는 것은 선행 사유뿐이라 다른 종류의 사유가 남은
 * 이슈는 그 사유로 계속 센다. 순환은 상류가 없어 그 자체가 손댈 곳이므로 순환에
 * 속한 행은 전부 남는다. 다른 저장소 선행은 이 집합에 들어올 수 없어 그 사유는
 * 언제나 셈에 남는다.
 *
 * @param {Map<string, { root_dir: string, reasons: import('../protocol.js').WaitReason[] }>} subjects
 * @returns {Set<string>}
 */
function upstreamCoveredSubjects(subjects) {
  /** @type {Map<string, string[]>} */
  const open_prerequisites = new Map();
  for (const [key, entry] of subjects) {
    const prerequisites = entry.reasons.filter((reason) =>
      PREREQUISITE_KINDS.includes(reason.kind)
    );
    if (prerequisites.length === 0) {
      continue;
    }
    open_prerequisites.set(
      key,
      prerequisites.flatMap((reason) =>
        (reason.targets || [])
          .filter((target) => target.kind === 'issue')
          .map((target) => `${entry.root_dir}\u0000${target.id}`)
      )
    );
  }
  /** @type {Map<string, string[]>} */
  const graph = new Map();
  for (const [key, targets] of open_prerequisites) {
    graph.set(
      key,
      targets.filter((target) => open_prerequisites.has(target))
    );
  }
  const cyclic = cyclicNodes(graph);
  /** @type {Set<string>} */
  const covered = new Set();
  for (const [key, targets] of open_prerequisites) {
    if (
      targets.length > 0 &&
      !cyclic.has(key) &&
      targets.every((target) => open_prerequisites.has(target))
    ) {
      covered.add(key);
    }
  }
  return covered;
}

/**
 * Count original issues once, including within each displayed group.
 *
 * @param {Array<{ root_dir: string, name?: string, wait_reasons?: import('../protocol.js').WaitReason[] }>} workspaces
 */
export function blockedSummary(workspaces) {
  /** @type {Map<string, { root_dir: string, id: string, name: string, reasons: import('../protocol.js').WaitReason[] }>} */
  const subjects = new Map();
  for (const workspace of workspaces) {
    for (const reason of workspace.wait_reasons || []) {
      if (reason.subject.root_dir !== workspace.root_dir) {
        continue;
      }
      const key = `${workspace.root_dir}\u0000${reason.subject.bead_id}`;
      const entry = subjects.get(key) || {
        root_dir: workspace.root_dir,
        id: reason.subject.bead_id,
        name: workspace.name || workspace.root_dir,
        reasons: []
      };
      entry.reasons.push(reason);
      subjects.set(key, entry);
    }
  }
  const covered = upstreamCoveredSubjects(subjects);
  // 상류 행이 대표하는 것은 그 이슈의 선행 사유뿐이다 (§6.2). 선행 사유만 떨구고
  // 다른 종류가 남은 이슈는 건수와 그 그룹에 그대로 서며, `action_count`도 남은
  // 사유로만 판정한다 — 떨궈진 선행이 조치 필요였다고 세어지지 않는다.
  const entries = [...subjects]
    .map(([key, entry]) =>
      covered.has(key)
        ? {
            ...entry,
            reasons: entry.reasons.filter(
              (reason) => !PREREQUISITE_KINDS.includes(reason.kind)
            )
          }
        : entry
    )
    .filter((entry) => entry.reasons.length > 0);
  const groups = [
    { label: '외부 작업', kinds: ['external_job'] },
    { label: '선행', kinds: ['prerequisite', 'prerequisite_foreign'] },
    { label: '공급자', kinds: ['provider_hold'] },
    { label: '확인 필요', kinds: ['awaiting_user', 'recovery'] },
    { label: '재시도', kinds: ['retry_wait'] }
  ]
    .map((group) => ({
      label: group.label,
      entries: entries
        .map((entry) => ({
          ...entry,
          reasons: entry.reasons.filter((reason) =>
            group.kinds.includes(reason.kind)
          )
        }))
        .filter((entry) => entry.reasons.length > 0)
    }))
    .filter((group) => group.entries.length > 0);
  return {
    count: entries.length,
    action_count: entries.filter((entry) =>
      entry.reasons.some((reason) => reason.verdict === 'action_required')
    ).length,
    groups,
    queue_line: []
  };
}

/**
 * One 요약 팝오버 항목 줄의 사유 문장 (§4.2). `headline`이 있으면 그것이고, 선행
 * 대기처럼 비어 있으면 그 사유의 이슈 target으로 조립한다 — 첫 ID 하나와, 둘
 * 이상이면 남은 수. 재료가 없으면 빈 문자열이다 (fail-quiet).
 *
 * @param {import('../protocol.js').WaitReason} reason
 * @returns {string}
 */
export function waitSummaryItemLine(reason) {
  if (reason.headline) {
    return reason.headline;
  }
  const targets = (reason.targets || []).filter(
    (target) => target.kind === 'issue'
  );
  if (targets.length === 0) {
    return '';
  }
  const rest = targets.length - 1;
  return `선행 ${targets[0].id}${rest > 0 ? ` 외 ${rest}` : ''}`;
}

/**
 * One summary dialog line: the verdict badge text, the repo, the issue and the
 * reason sentence (the retired popover's wording).
 *
 * @param {{ name: string, id: string }} entry
 * @param {import('../protocol.js').WaitReason} reason
 * @param {number} now
 * @returns {string}
 */
export function summaryItemText(entry, reason, now) {
  const verdict = waitBadgeText(waitKindRow(reason), reason.verdict, {
    since: reason.since,
    now
  });
  return `${verdict} ${entry.name} ${entry.id} — ${waitSummaryItemLine(reason)}`;
}

/**
 * Where a summary subject stands on the pipeline screen (UI-n99w §8
 * `expandWaitSubject`): its lane, its 대기 area and its 전체-scope bundle key.
 * `null` when no lane item carries it.
 *
 * @param {{ queue: any[], running: any[], pr_wait: any[], runnable: any[], done: any[] }} model
 * @param {string} root_dir
 * @param {string} bead_id
 * @returns {{ lane: 'candidate'|'queue'|'running'|'pr_wait'|'done', area: 'parallel'|'serial'|null, bundle: string }|null}
 */
export function revealLaneOf(model, root_dir, bead_id) {
  const item = [
    ...model.queue,
    ...model.running,
    ...model.pr_wait,
    ...model.runnable,
    ...model.done
  ].find((entry) => entry.root_dir === root_dir && entry.id === bead_id);
  if (!item) {
    return null;
  }
  const serial = /^s[1-5]$/.test(item.lane);
  if (serial || item.lane === 'queue') {
    return {
      lane: 'queue',
      area: serial ? 'serial' : 'parallel',
      bundle: 'queue'
    };
  }
  if (item.lane === 'runnable') {
    return { lane: 'candidate', area: null, bundle: 'runnable' };
  }
  const lane = /** @type {'running'|'pr_wait'|'done'} */ (item.lane);
  return { lane, area: null, bundle: lane };
}

/**
 * The 막힘 summary of the monitor rows in a scope: every row for `*`, the
 * one repo otherwise.
 *
 * @param {Array<Record<string, any>>} rows
 * @param {string} scope - `*` or a root_dir.
 * @returns {ReturnType<typeof blockedSummary>}
 */
export function scopedBlockedSummary(rows, scope) {
  return blockedSummary(
    rows
      .filter((row) => scope === '*' || row.root_dir === scope)
      .map((row) => ({
        root_dir: row.root_dir,
        name: row.name || row.root_dir,
        wait_reasons: Array.isArray(row.wait_reasons) ? row.wait_reasons : []
      }))
  );
}
