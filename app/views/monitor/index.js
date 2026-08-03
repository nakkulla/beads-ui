/**
 * Monitor tab (UI-nprg) — worker 탭에 올린 이슈들이 **전체 활성 레포**에서 어떻게
 * 진행되고 있는가를 한 화면에서 보는 파이프라인 관제.
 *
 * 데이터 원천은 서버의 `monitor-pipeline` 집계 구독 하나다: 모든 visible
 * workspace의 워커 스냅샷이 decorated 계약 그대로 실려 오고, 이 뷰는 그것을
 * 단계별 섹션(실행중 → PR 대기 → 대기 → 완료·오늘)으로 병합해 그린다. 레인
 * 판정은 **버드당 한 섹션**이다 — 실행중인 버드는 `queue` 레인에 그대로 남아
 * 있고 conflict-resolution attempt는 `pr_wait` 소속 버드에서도 돌기 때문에,
 * 배타 우선순위 없이 그리면 같은 버드가 두 섹션에 동시에 나타난다.
 */
import { render } from 'lit-html';
import { debug } from '../../utils/logging.js';
import { sumAttemptUsage } from '../../utils/token-usage.js';
import { MONITOR_SECTIONS, monitorPipelineTemplate } from './row.js';

/**
 * @typedef {import('./row.js').MonitorRowItem} MonitorRowItem
 */

/** Client id of the monitor tab's aggregated pipeline subscription. */
export const MONITOR_PIPELINE_KEY = 'tab:monitor:pipeline';

/**
 * Live-metric redraw cadence while the tab is visible.
 *
 * Push alone is not enough here: 경과시간과 하트비트는 시계가 지나가는 것만으로
 * 값이 바뀌는데, 세션이 조용해지면 fanout도 같이 멈춘다 — 그러면 마지막
 * 이벤트가 10분 전이어도 점이 계속 "활성"으로 남아, 죽은 세션을 살아 있다고
 * 말하게 된다. 초 단위로 표시하므로 주기도 1초다.
 */
const TICK_MS = 1_000;

/**
 * @typedef {Object} MonitorViewOptions
 * @property {(id: string) => void} gotoIssue
 * @property {{ get: () => Array<Record<string, any>>|null, subscribe?: (fn: () => void) => () => void }} [pipelineStore]
 * @property {() => string|undefined} [getWorkspacePath] - 이 연결이 지금 보고 있는 repo의 root.
 * @property {(root_dir: string) => Promise<unknown>} [switchWorkspace] -
 * workspace picker와 동일한 `set-workspace` 전환 경로.
 * @property {() => number} [now] - Test seam for the live clock.
 */

/**
 * Pick the newest attempt of a bead that has already ENDED — 완료 종류는 여기서만
 * 파생되고, 짝이 되는 기록이 없으면 종류 표기를 생략한다 (fail-quiet).
 *
 * @param {Record<string, any>} attempts
 * @param {string} bead_id
 * @returns {any|null}
 */
function latestTerminalAttempt(attempts, bead_id) {
  /** @type {any|null} */
  let best = null;
  let best_at = -Infinity;
  for (const attempt of Object.values(attempts)) {
    if (
      !attempt ||
      attempt.bead_id !== bead_id ||
      attempt.status === 'running'
    ) {
      continue;
    }
    const at =
      typeof attempt.finished_at === 'number'
        ? attempt.finished_at
        : typeof attempt.started_at === 'number'
          ? attempt.started_at
          : 0;
    if (at >= best_at) {
      best_at = at;
      best = attempt;
    }
  }
  return best;
}

/**
 * Fold one repo's live sessions onto the beads they belong to — 같은 버드에 둘이
 * 붙어 있으면(일반 실행 + conflict-resolution) 더 최근에 시작한 쪽이 그 버드의
 * 라이브 지표가 된다.
 *
 * @param {Record<string, any>} attempts
 * @returns {Map<string, { started_at: number|null, last_event_at: number|null, model: string|null, usage: any }>}
 */
function runningByBead(attempts) {
  /** @type {Map<string, any>} */
  const map = new Map();
  for (const attempt of Object.values(attempts)) {
    if (!attempt || attempt.status !== 'running') {
      continue;
    }
    const bead_id = attempt.bead_id;
    if (typeof bead_id !== 'string' || bead_id.length === 0) {
      continue;
    }
    const started_at =
      typeof attempt.started_at === 'number' ? attempt.started_at : null;
    const prior = map.get(bead_id);
    if (prior && (prior.started_at ?? 0) > (started_at ?? 0)) {
      continue;
    }
    map.set(bead_id, {
      started_at,
      last_event_at:
        typeof attempt.last_event_at === 'number'
          ? attempt.last_event_at
          : null,
      model: typeof attempt.model === 'string' ? attempt.model : null,
      usage: sumAttemptUsage(attempts, bead_id)
    });
  }
  return map;
}

/**
 * Merge the aggregated snapshot into the four pipeline sections.
 *
 * @param {Array<Record<string, any>>|null} workspaces
 * @returns {Array<{ lane: string, title: string, items: MonitorRowItem[] }>}
 */
export function buildSections(workspaces) {
  /** @type {Record<string, MonitorRowItem[]>} */
  const buckets = { running: [], pr_wait: [], queue: [], done: [] };
  for (const workspace of Array.isArray(workspaces) ? workspaces : []) {
    if (!workspace || typeof workspace.root_dir !== 'string') {
      continue;
    }
    const root_dir = workspace.root_dir;
    const workspace_name = workspace.name || root_dir;
    const attempts = /** @type {Record<string, any>} */ (
      workspace.attempts || {}
    );
    const titles = /** @type {Record<string, string>} */ (
      workspace.bead_titles || {}
    );
    const observations = /** @type {Record<string, any>} */ (
      workspace.pr_observations || {}
    );
    /**
     * @param {string} bead_id
     * @returns {{ id: string, title: string, root_dir: string, workspace_name: string }}
     */
    const base = (bead_id) => ({
      id: bead_id,
      title: titles[bead_id] || bead_id,
      root_dir,
      workspace_name
    });

    // 배타 우선순위: 상위 섹션에 잡힌 버드는 하위 섹션에서 제외한다.
    /** @type {Set<string>} */
    const claimed = new Set();

    for (const [bead_id, live] of runningByBead(attempts)) {
      claimed.add(bead_id);
      buckets.running.push({
        ...base(bead_id),
        lane: 'running',
        started_at: live.started_at,
        last_event_at: live.last_event_at,
        model: live.model,
        usage: live.usage
      });
    }

    for (const entry of Array.isArray(workspace.pr_wait)
      ? workspace.pr_wait
      : []) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      const pr = observations[bead_id] && observations[bead_id].pr;
      buckets.pr_wait.push({
        ...base(bead_id),
        lane: 'pr_wait',
        pr_number: pr && typeof pr.number === 'number' ? pr.number : null,
        external: entry.external === true
      });
    }

    const queue_lane = Array.isArray(workspace.queue) ? workspace.queue : [];
    for (let i = 0; i < queue_lane.length; i++) {
      const entry = queue_lane[i];
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      buckets.queue.push({
        ...base(bead_id),
        lane: 'queue',
        // 순번은 레인에서의 디스패치 순서이므로, 실행중으로 빠진 버드를 건너뛴
        // 뒤의 인덱스가 아니라 레인 자체의 자리를 쓴다.
        queue_position: i + 1
      });
    }

    for (const entry of Array.isArray(workspace.done) ? workspace.done : []) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id !== 'string' || claimed.has(bead_id)) {
        continue;
      }
      claimed.add(bead_id);
      const terminal = latestTerminalAttempt(attempts, bead_id);
      buckets.done.push({
        ...base(bead_id),
        lane: 'done',
        done_at: typeof entry.added_at === 'number' ? entry.added_at : null,
        done_kind:
          terminal && typeof terminal.done_kind === 'string'
            ? terminal.done_kind
            : null
      });
    }
  }

  buckets.running.sort(
    (a, b) => (b.last_event_at ?? 0) - (a.last_event_at ?? 0)
  );
  buckets.done.sort((a, b) => (b.done_at ?? 0) - (a.done_at ?? 0));

  return MONITOR_SECTIONS.map((section) => ({
    lane: section.lane,
    title: section.title,
    items: buckets[section.lane]
  }));
}

/**
 * Mount the monitor tab and keep it in sync with the aggregated pipeline store.
 *
 * @param {HTMLElement} mount_element
 * @param {MonitorViewOptions} options
 */
export function createMonitorView(mount_element, options) {
  const log = debug('views:monitor');
  const gotoIssue = options.gotoIssue;
  const pipelineStore = options.pipelineStore;
  const getWorkspacePath = options.getWorkspacePath;
  const switchWorkspace = options.switchWorkspace;
  const nowFn = options.now || (() => Date.now());

  /** @type {null | (() => void)} */
  let unsubscribe_pipeline = null;
  /** @type {any} */
  let tick_timer = null;

  function doRender() {
    const workspaces =
      pipelineStore && pipelineStore.get ? pipelineStore.get() : null;
    render(
      monitorPipelineTemplate(buildSections(workspaces), nowFn()),
      mount_element
    );
  }

  /**
   * Open an issue, switching repos through the picker's own path first when the
   * row belongs to another one — 전환 없이 열면 지금 붙어 있는 DB에서 없는 id를
   * 찾게 된다. 전환이 실패하면 이동하지 않고 조용히 멈춘다.
   *
   * @param {string} id
   * @param {string} root_dir
   */
  function openRow(id, root_dir) {
    const current = getWorkspacePath ? getWorkspacePath() : undefined;
    if (!root_dir || !current || root_dir === current || !switchWorkspace) {
      gotoIssue(id);
      return;
    }
    void switchWorkspace(root_dir)
      .then(() => {
        gotoIssue(id);
      })
      .catch((err) => {
        log('workspace switch for %s failed: %o', root_dir, err);
      });
  }

  /**
   * @param {Event} ev
   */
  function onClick(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    const row = target && target.closest ? target.closest('.mon-row') : null;
    if (!row) {
      return;
    }
    const id = row.getAttribute('data-issue-id');
    if (id) {
      ev.preventDefault();
      openRow(id, row.getAttribute('data-root-dir') || '');
    }
  }

  mount_element.addEventListener('click', onClick);

  if (pipelineStore && typeof pipelineStore.subscribe === 'function') {
    unsubscribe_pipeline = pipelineStore.subscribe(() => {
      try {
        doRender();
      } catch {
        // ignore
      }
    });
  }

  function stopTick() {
    if (tick_timer !== null) {
      clearInterval(tick_timer);
      tick_timer = null;
    }
  }

  return {
    // 데이터 갱신은 push가 끌어온다 (집계 구독이 debounce 후 전체 스냅샷을
    // 밀어준다). 시계만 지나가도 값이 바뀌는 경과·하트비트를 위해 탭이 보이는
    // 동안만 tick을 돈다.
    load() {
      log('load');
      doRender();
      if (tick_timer === null) {
        tick_timer = setInterval(() => {
          try {
            doRender();
          } catch {
            // ignore
          }
        }, TICK_MS);
      }
    },
    // 탭을 떠나면 화면은 그대로 두되 시계는 멈춘다 — 보이지 않는 뷰를 초당
    // 다시 그릴 이유가 없다.
    pause() {
      stopTick();
    },
    clear() {
      stopTick();
      if (unsubscribe_pipeline) {
        unsubscribe_pipeline();
        unsubscribe_pipeline = null;
      }
      mount_element.removeEventListener('click', onClick);
      mount_element.replaceChildren();
    }
  };
}
