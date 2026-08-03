/**
 * Monitor tab (UI-53es §1) — 지금 무엇이 돌고 있는가를 한 화면에서 보는 관제
 * 리스트.
 *
 * Worker 실행중 레인은 워커가 디스패치한 attempt만 보여주므로 대화형 세션으로
 * 진행 중인 Bead가 잡히지 않는다. 이 뷰는 상태가 원천이다: 구독된 in_progress
 * 이슈 전부가 행이 되고, 워커 attempt·세션 로그 하트비트는 그 위에 bead_id로
 * 조인되는 부가 정보일 뿐이다. 새 REST API도 새 구독 타입도 없다.
 *
 * 1차 범위는 in_progress 그룹 하나, 정렬은 갱신 시각 내림차순.
 */
import { render } from 'lit-html';
import { selectCurrentChild } from '../../utils/current-child.js';
import { debug } from '../../utils/logging.js';
import { coerceTimestampMs } from '../../utils/relative-time.js';
import { sumAttemptUsage } from '../../utils/token-usage.js';
import { monitorGroupTemplate } from './row.js';

/**
 * @typedef {import('./row.js').MonitorRowItem} MonitorRowItem
 */

/**
 * @typedef {{ id: string, title?: string, status?: string, updated_at?: number|string, parent?: string | { id?: string } }} MonitorIssue
 */

/** Client id of the monitor tab's own in_progress subscription. */
export const MONITOR_IN_PROGRESS_KEY = 'tab:monitor:in-progress';

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
 * @property {{ snapshotFor?: (client_id: string) => any[], subscribe?: (fn: () => void) => () => void }} [issueStores]
 * @property {{ get: () => any, subscribe?: (fn: () => void) => () => void }} [queueStore]
 * @property {() => number} [now] - Test seam for the live clock.
 */

/**
 * Read the parent id off an issue's flattened `parent` edge (bd JSON).
 *
 * @param {MonitorIssue} issue
 * @returns {string}
 */
function parentIdOf(issue) {
  const raw = issue && /** @type {any} */ (issue).parent;
  if (typeof raw === 'string') {
    return raw;
  }
  if (raw && raw.id) {
    return String(raw.id);
  }
  return '';
}

/**
 * Mount the monitor tab and keep it in sync with the issue and queue stores.
 *
 * @param {HTMLElement} mount_element
 * @param {MonitorViewOptions} options
 */
export function createMonitorView(mount_element, options) {
  const log = debug('views:monitor');
  const gotoIssue = options.gotoIssue;
  const issueStores = options.issueStores;
  const queueStore = options.queueStore;
  const nowFn = options.now || (() => Date.now());

  /** @type {null | (() => void)} */
  let unsubscribe_issues = null;
  /** @type {null | (() => void)} */
  let unsubscribe_queue = null;
  /** @type {any} */
  let tick_timer = null;

  /**
   * The subscribed in_progress issues, newest-updated first.
   *
   * @returns {MonitorIssue[]}
   */
  function inProgressIssues() {
    const raw =
      issueStores && issueStores.snapshotFor
        ? issueStores.snapshotFor(MONITOR_IN_PROGRESS_KEY) || []
        : [];
    return raw
      .slice()
      .sort(
        (a, b) =>
          (coerceTimestampMs(b && b.updated_at) ?? 0) -
          (coerceTimestampMs(a && a.updated_at) ?? 0)
      );
  }

  /**
   * The running worker attempt per bead, if any, plus the bead's token total.
   * Only RUNNING attempts count — a paused/finished one is not "지금 돌고 있는
   * 것"이고, 그 위에 하트비트를 그리면 죽은 세션이 살아 있다고 말하게 된다.
   *
   * @returns {Map<string, { started_at: number|null, last_event_at: number|null, usage: any }>}
   */
  function runningAttemptsByBead() {
    /** @type {Map<string, { started_at: number|null, last_event_at: number|null, usage: any }>} */
    const map = new Map();
    const queue = queueStore && queueStore.get ? queueStore.get() : null;
    const attempts = /** @type {Record<string, any>} */ (
      (queue && queue.attempts) || {}
    );
    for (const attempt of Object.values(attempts)) {
      if (!attempt || attempt.status !== 'running') {
        continue;
      }
      const bead_id = attempt.bead_id;
      if (typeof bead_id !== 'string' || bead_id.length === 0) {
        continue;
      }
      map.set(bead_id, {
        started_at:
          typeof attempt.started_at === 'number' ? attempt.started_at : null,
        last_event_at:
          typeof attempt.last_event_at === 'number'
            ? attempt.last_event_at
            : null,
        usage: sumAttemptUsage(attempts, bead_id)
      });
    }
    return map;
  }

  /**
   * Compose the rows: every in_progress bead, with its current in_progress
   * child and the live attempt metrics joined on bead_id.
   *
   * @returns {MonitorRowItem[]}
   */
  function buildRows() {
    const issues = inProgressIssues();
    /** @type {Map<string, MonitorIssue[]>} */
    const children_by_parent = new Map();
    for (const issue of issues) {
      const parent = parentIdOf(issue);
      if (!parent) {
        continue;
      }
      const arr = children_by_parent.get(parent);
      if (arr) {
        arr.push(issue);
      } else {
        children_by_parent.set(parent, [issue]);
      }
    }
    const attempts = runningAttemptsByBead();
    return issues.map((issue) => {
      const live = attempts.get(issue.id) || null;
      const current = selectCurrentChild(
        children_by_parent.get(issue.id) || []
      );
      return {
        id: issue.id,
        title: issue.title || issue.id,
        current_child: current ? current.title || current.id : null,
        started_at: live ? live.started_at : null,
        last_event_at: live ? live.last_event_at : null,
        updated_at: issue.updated_at,
        usage: live ? live.usage : null,
        has_attempt: Boolean(live)
      };
    });
  }

  function doRender() {
    render(monitorGroupTemplate(buildRows(), nowFn()), mount_element);
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
      gotoIssue(id);
    }
  }

  mount_element.addEventListener('click', onClick);

  if (issueStores && typeof issueStores.subscribe === 'function') {
    unsubscribe_issues = issueStores.subscribe(() => {
      try {
        doRender();
      } catch {
        // ignore
      }
    });
  }
  if (queueStore && typeof queueStore.subscribe === 'function') {
    unsubscribe_queue = queueStore.subscribe(() => {
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
    // 데이터 갱신은 push가 끌어온다 (세션 로그 publish가 3초 coalesce 큐
    // fanout을 예약하고, 이슈 변경은 이슈 스토어 구독이 밀어준다). 시계만
    // 지나가도 값이 바뀌는 경과·하트비트를 위해 탭이 보이는 동안만 tick을 돈다.
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
      if (unsubscribe_issues) {
        unsubscribe_issues();
        unsubscribe_issues = null;
      }
      if (unsubscribe_queue) {
        unsubscribe_queue();
        unsubscribe_queue = null;
      }
      mount_element.removeEventListener('click', onClick);
      mount_element.replaceChildren();
    }
  };
}
