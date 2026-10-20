/**
 * 모니터 탭 전체 배치안 (UI-hf8v §3.2–§3.5).
 *
 * 대기 레인 머리의 `[전체 배치안 · N개 레포]`가 보이는 레포마다 Worker 탭과 같은 배치안
 * 표를 레포 카드로 보인다. 표의 재료와 그리기는 Worker 탭과 같은 공유 함수
 * (`fullPlacementPlan`·`placementPlanTable`)가 소유하고, 이 모듈은 레포 카드의 틀,
 * 레포·Bead 키 체크 기억, 레포 단위 적용 순서와 결과 줄만 갖는다.
 *
 * 적용 단위는 레포다. 레인·충돌 판정·큐 revision이 레포마다 따로라 레포를 섞은
 * 단일 배치는 만들지 않는다. 누른 순간의 대상 레포·체크·`shown`을 고정하고, 레포마다
 * 그 차례의 최신 큐에서 `sendPlacementBatch`를 부른다 — 그 사이 자리가 바뀐 레포는
 * `moved`로 멈춘다.
 *
 * @import { PlacementStatus } from '../../../server/placement/wire.js'
 * @import { PlannedPlacement } from '../../utils/placement/compute.js'
 */
import { html } from 'lit-html';
import { sendPlacementBatch } from '../../utils/placement/apply.js';
import {
  formatClockLocal,
  formatTimestampLocal
} from '../../utils/relative-time.js';
import {
  fullPlacementPlan,
  latestJudgedAt,
  placementPlanTable,
  placementRecompute,
  placementStateWord,
  placementStopReason
} from '../worker/placement.js';

/**
 * @typedef {Object} MonitorPlacementRepo
 * @property {string} root_dir
 * @property {string} name
 */

/**
 * @typedef {Object} MonitorPlacementPanelOptions
 * @property {((type: string, payload?: unknown) => Promise<any>)|undefined} transport
 * @property {() => MonitorPlacementRepo[]} repos - The visible repositories the
 * pipeline carries.
 * @property {(root_dir: string) => any} queueOf - That repository's latest
 * queue (an adopted reply laid over the pipeline entry).
 * @property {(root_dir: string) => Array<{ id: string, title?: string }>} candidatesOf -
 * That repository's candidates in the monitor's candidate lane order.
 * @property {(root_dir: string, queue: any) => void} adopt - Adopt a reply's
 * queue for the repository the send went to.
 * @property {() => void} requestRender
 * @property {(message: string, kind?: 'error'|'success'|'info'|'warning', ms?: number) => void} showToast
 */

/**
 * @typedef {{ placed: number, stopped: null|{ id: string, why: string } }} RepoApplyResult
 */

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function objectOf(value) {
  return value && typeof value === 'object'
    ? /** @type {Record<string, any>} */ (value)
    : {};
}

/**
 * @param {any} queue
 * @returns {{ done: number, total: number }|null}
 */
function judgingProgress(queue) {
  const progress = objectOf(objectOf(queue).placement_progress);
  return typeof progress.done === 'number' &&
    typeof progress.total === 'number' &&
    progress.done < progress.total
    ? { done: progress.done, total: progress.total }
    : null;
}

/**
 * The folded line's per-state counts of a repository with no recommendable
 * candidate — `jev 판정 중 2 · 비교할 이슈 없음 1`, in first-seen row order.
 *
 * @param {Record<string, PlacementStatus>} status
 * @param {string[]} rows
 * @returns {string}
 */
export function foldedStateCounts(status, rows) {
  /** @type {Map<string, number>} */
  const counts = new Map();
  for (const id of rows) {
    const word = placementStateWord(status[id]);
    counts.set(word, (counts.get(word) || 0) + 1);
  }
  return [...counts].map(([word, n]) => `${word} ${n}`).join(' · ');
}

/**
 * The monitor's 전체 배치안 panel and its lane-header controls.
 *
 * @param {MonitorPlacementPanelOptions} options
 */
export function createMonitorPlacementPanel(options) {
  const { transport, requestRender } = options;
  let open = false;
  /**
   * The reader's checkbox changes, keyed by repository then Bead, kept until
   * the panel closes.
   *
   * @type {Map<string, Map<string, boolean>>}
   */
  const checks = new Map();
  /** @type {Map<string, RepoApplyResult>} */
  const results = new Map();
  /** @type {{ at: number, total: number }|null} */
  let applying = null;
  let rejudging = false;
  /**
   * Bumped on every close: an apply that outlives its panel must not write
   * results or clear checks into a panel reopened after it started.
   */
  let generation = 0;

  /**
   * @param {string} root_dir
   * @returns {Map<string, boolean>}
   */
  function checksOf(root_dir) {
    let map = checks.get(root_dir);
    if (!map) {
      map = new Map();
      checks.set(root_dir, map);
    }
    return map;
  }

  /**
   * Visible repositories whose snapshot carries `placement_status`, by name.
   *
   * @returns {MonitorPlacementRepo[]}
   */
  function materialRepos() {
    return options
      .repos()
      .filter((repo) => {
        const status = objectOf(
          options.queueOf(repo.root_dir)
        ).placement_status;
        return !!status && typeof status === 'object';
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Repositories with at least one candidate entry — the ones the panel shows.
   *
   * @returns {MonitorPlacementRepo[]}
   */
  function entryRepos() {
    return materialRepos().filter(
      (repo) =>
        Object.keys(objectOf(options.queueOf(repo.root_dir).placement_status))
          .length > 0
    );
  }

  /**
   * The panel's repositories: every repository with entries plus any that
   * still holds an apply result, by name.
   *
   * @returns {MonitorPlacementRepo[]}
   */
  function panelRepos() {
    const list = entryRepos();
    const seen = new Set(list.map((repo) => repo.root_dir));
    for (const repo of options.repos()) {
      if (results.has(repo.root_dir) && !seen.has(repo.root_dir)) {
        list.push(repo);
      }
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * @param {string} root_dir
   * @returns {string[]}
   */
  function displayOrder(root_dir) {
    return options.candidatesOf(root_dir).map((item) => item.id);
  }

  /**
   * @param {string} root_dir
   * @returns {(id: string) => string}
   */
  function titleOf(root_dir) {
    const rows = options.candidatesOf(root_dir);
    return (id) => {
      const row = rows.find((item) => item.id === id);
      return row && typeof row.title === 'string' ? row.title : '';
    };
  }

  /**
   * @param {string} root_dir
   */
  function planOf(root_dir) {
    return fullPlacementPlan(
      options.queueOf(root_dir),
      displayOrder(root_dir),
      checksOf(root_dir)
    );
  }

  /**
   * The repositories `[전체 적용]` would send, in panel order: no result line
   * yet and at least one checked place.
   *
   * @returns {Array<{ repo: MonitorPlacementRepo, count: number }>}
   */
  function applicable() {
    return panelRepos()
      .filter((repo) => !results.has(repo.root_dir))
      .map((repo) => ({
        repo,
        count: planOf(repo.root_dir).plan.order.length
      }))
      .filter((item) => item.count > 0);
  }

  function reset() {
    generation += 1;
    checks.clear();
    results.clear();
  }

  /**
   * Freeze the targets, their checks and the computed `shown` at the click,
   * then send repository by repository in panel order. A repository that
   * stops or fails does not stop the next one.
   *
   * @param {MonitorPlacementRepo[]} repos
   */
  async function apply(repos) {
    if (!transport || applying !== null) {
      return;
    }
    /** @type {Array<{ repo: MonitorPlacementRepo, display_order: string[], shown: PlannedPlacement[] }>} */
    const targets = [];
    for (const repo of repos) {
      if (results.has(repo.root_dir)) {
        continue;
      }
      const display_order = displayOrder(repo.root_dir);
      const shown = fullPlacementPlan(
        options.queueOf(repo.root_dir),
        display_order,
        checksOf(repo.root_dir)
      ).plan.order;
      if (shown.length > 0) {
        targets.push({ repo, display_order, shown });
      }
    }
    if (targets.length === 0) {
      return;
    }
    const send = transport;
    const started = generation;
    let placed_total = 0;
    let stopped_total = 0;
    for (let at = 0; at < targets.length; at += 1) {
      const { repo, display_order, shown } = targets[at];
      const root_dir = repo.root_dir;
      applying = { at: at + 1, total: targets.length };
      requestRender();
      /** @type {RepoApplyResult} */
      let result;
      try {
        const outcome = await sendPlacementBatch({
          transport: send,
          root_dir,
          shown,
          queue: options.queueOf(root_dir),
          recompute: placementRecompute(display_order),
          adopt: (queue) => {
            options.adopt(root_dir, queue);
            requestRender();
          },
          snapshot: () => options.queueOf(root_dir)
        });
        result = {
          placed: outcome.placed.length,
          stopped: outcome.stopped
            ? {
                id: outcome.stopped.id,
                why: placementStopReason(outcome.stopped)
              }
            : null
        };
      } catch (error) {
        result = {
          placed: 0,
          stopped: {
            id: shown[0].id,
            why:
              error && typeof error === 'object' && 'message' in error
                ? String(/** @type {any} */ (error).message)
                : String(error)
          }
        };
      }
      if (generation === started) {
        results.set(root_dir, result);
        if (result.stopped === null) {
          checks.delete(root_dir);
        }
      }
      if (result.stopped !== null) {
        stopped_total += 1;
      }
      placed_total += result.placed;
    }
    applying = null;
    options.showToast(
      `${placed_total}건 넣음 · ${targets.length}개 레포${
        stopped_total > 0 ? ` · 멈춤 ${stopped_total}개 레포` : ''
      }`,
      stopped_total > 0 ? 'warning' : 'success'
    );
    requestRender();
  }

  async function rejudgeAll() {
    if (!transport || rejudging) {
      return;
    }
    const targets = materialRepos();
    if (targets.length === 0) {
      return;
    }
    rejudging = true;
    requestRender();
    let requested = 0;
    /** @type {string[]} */
    const failed = [];
    for (const repo of targets) {
      try {
        await transport('worker-placement-rejudge', {
          root_dir: repo.root_dir
        });
        requested += 1;
      } catch {
        failed.push(repo.name);
      }
    }
    rejudging = false;
    options.showToast(
      `${requested}개 레포 jev 판정을 다시 요청했습니다${
        failed.length > 0 ? ` · 실패 ${failed.join(', ')}` : ''
      }`,
      failed.length > 0 ? 'warning' : 'info',
      failed.length > 0 ? 4000 : 2000
    );
    requestRender();
  }

  /**
   * @param {MonitorPlacementRepo} repo
   * @param {RepoApplyResult} result
   * @returns {import('lit-html').TemplateResult}
   */
  function resultCardTemplate(repo, result) {
    return html`<section
      class="mon-plan__repo mon-plan__repo--done"
      data-root-dir=${repo.root_dir}
    >
      <div class="mon-plan__repo-hd">
        <span class="mon-plan__repo-name">${repo.name}</span>
      </div>
      <div
        class="mon-plan__result${result.stopped
          ? ' mon-plan__result--stopped'
          : ''}"
      >
        ${result.stopped
          ? `✕ ${result.placed}건 넣음 — ${result.stopped.id}에서 멈춤: ${result.stopped.why}`
          : `✓ ${result.placed}건 넣음`}
      </div>
      ${result.stopped
        ? html`<div class="mon-plan__repo-actions">
            <button
              type="button"
              class="op-btn mon-plan__review"
              data-root-dir=${repo.root_dir}
              ?disabled=${applying !== null}
              title="결과 줄과 체크를 지우고 최신 큐로 다시 계산한 표를 봅니다"
            >
              이 레포 배치안 다시 보기
            </button>
          </div>`
        : ''}
      ${result.stopped
        ? // 성공한 레포만 표를 접는다 (§3.4) — 멈춘 레포는 최신 큐로 다시 계산한
          // 표를 체크·적용 없이 보이고, [이 레포 배치안 다시 보기]가 다시 연다.
          html`<div class="mon-plan__scroll">
            ${placementPlanTable(planOf(repo.root_dir), {
              titleOf: titleOf(repo.root_dir),
              busy: true,
              notice: null,
              root_dir: repo.root_dir
            })}
          </div>`
        : ''}
    </section>`;
  }

  /**
   * @param {MonitorPlacementRepo} repo
   * @returns {import('lit-html').TemplateResult}
   */
  function repoCardTemplate(repo) {
    const result = results.get(repo.root_dir);
    if (result) {
      return resultCardTemplate(repo, result);
    }
    const queue = options.queueOf(repo.root_dir);
    const material = planOf(repo.root_dir);
    const busy = applying !== null;
    const table = html`<div class="mon-plan__scroll">
      ${placementPlanTable(material, {
        titleOf: titleOf(repo.root_dir),
        busy,
        notice: null,
        root_dir: repo.root_dir
      })}
    </div>`;
    if (material.ready.length === 0) {
      return html`<details
        class="mon-plan__repo mon-plan__repo--folded"
        data-root-dir=${repo.root_dir}
      >
        <summary class="mon-plan__fold">
          ${repo.name} · 추천할 후보 없음 —
          ${foldedStateCounts(material.status, material.rows)}
        </summary>
        ${table}
      </details>`;
    }
    const progress = judgingProgress(queue);
    const latest = latestJudgedAt(queue);
    const count = material.plan.order.length;
    return html`<section class="mon-plan__repo" data-root-dir=${repo.root_dir}>
      <div class="mon-plan__repo-hd">
        <span class="mon-plan__repo-name">${repo.name}</span>
        <span class="mon-plan__count"
          >추천 ${material.ready.length} / ${material.rows.length}</span
        >
        ${progress
          ? html`<span class="mon-plan__progress"
              >jev ${progress.done}/${progress.total}</span
            >`
          : ''}
        ${typeof latest === 'number'
          ? html`<span
              class="mon-plan__time"
              title=${`마지막 jev 판정 ${formatTimestampLocal(latest)}`}
              >판정 ${formatClockLocal(latest)}</span
            >`
          : ''}
        <button
          type="button"
          class="op-btn op-btn--primary mon-plan__apply-repo"
          data-root-dir=${repo.root_dir}
          ?disabled=${count === 0 || busy}
          title="이 레포의 체크한 후보를 번호 순서대로 하나씩 넣습니다"
        >
          이 레포만 적용 (${count})
        </button>
      </div>
      ${table}
    </section>`;
  }

  return {
    /** @returns {boolean} */
    isOpen() {
      return open;
    },
    /**
     * Queue-lane header controls (§3.2): `[전체 배치안 · N개 레포]`,
     * `판정 중 · N개 레포` and `[↻ 전부 다시 판정]`. Nothing when no visible
     * repository carries placement material (fail-quiet).
     *
     * @returns {import('lit-html').TemplateResult|''}
     */
    headerControls() {
      const material = materialRepos();
      if (material.length === 0) {
        return '';
      }
      const shown = material.filter(
        (repo) =>
          Object.keys(objectOf(options.queueOf(repo.root_dir).placement_status))
            .length > 0
      ).length;
      const judging = material.filter(
        (repo) => judgingProgress(options.queueOf(repo.root_dir)) !== null
      ).length;
      return html`<span class="mon-plan-controls">
        <button
          type="button"
          class="op-btn mon-plan__open${open ? ' is-active' : ''}"
          aria-pressed=${open ? 'true' : 'false'}
          ?disabled=${shown === 0 && !open}
          title=${shown > 0
            ? '보이는 레포마다 후보 배치안을 레포 카드로 봅니다'
            : '배치안을 볼 후보가 있는 레포가 없습니다'}
        >
          전체 배치안 · ${shown}개 레포
        </button>
        ${judging > 0
          ? html`<span class="mon-plan__judging"
              >판정 중 · ${judging}개 레포</span
            >`
          : ''}
        <button
          type="button"
          class="op-btn mon-plan__rejudge"
          ?disabled=${rejudging}
          title="보이는 레포마다 후보의 jev 쌍 판정을 지우고 다시 받습니다"
        >
          ↻ 전부 다시 판정
        </button>
      </span>`;
    },
    /**
     * The open panel at the top of the queue-lane body, or nothing.
     *
     * @returns {import('lit-html').TemplateResult|''}
     */
    panelTemplate() {
      if (!open) {
        return '';
      }
      const repos = panelRepos();
      const targets = applicable();
      const total = targets.reduce((sum, item) => sum + item.count, 0);
      return html`<section class="mon-plan" aria-label="전체 배치안">
        <div class="mon-plan__hd">
          <span class="mon-plan__title">전체 배치안</span>
          <button
            type="button"
            class="op-btn op-btn--ghost op-btn--icon mon-plan__close"
            title="전체 배치안 닫기"
            aria-label="전체 배치안 닫기"
          >
            ✕
          </button>
        </div>
        ${repos.length === 0
          ? html`<div class="mon-plan__empty">
              배치안을 볼 후보가 있는 레포가 없습니다
            </div>`
          : repos.map((repo) => repoCardTemplate(repo))}
        <div class="mon-plan__summary">
          <span class="mon-plan__total"
            >${applying
              ? `적용 중 · ${applying.at}/${applying.total} 레포`
              : `${total}건 · ${targets.length}개 레포`}</span
          >
          <button
            type="button"
            class="op-btn op-btn--primary mon-plan__apply-all"
            ?disabled=${total === 0 || applying !== null}
            title="체크한 자리가 있는 레포를 이름순으로 하나씩 적용합니다"
          >
            전체 적용
          </button>
        </div>
      </section>`;
    },
    /**
     * Handle a click in the monitor. True when this module took it.
     *
     * @param {HTMLElement|null} target
     * @returns {boolean}
     */
    handleClick(target) {
      if (!target || typeof target.closest !== 'function') {
        return false;
      }
      const toggle = /** @type {HTMLButtonElement|null} */ (
        target.closest('.mon-plan__open')
      );
      if (toggle) {
        if (!toggle.disabled) {
          open = !open;
          reset();
          requestRender();
        }
        return true;
      }
      const rejudge = /** @type {HTMLButtonElement|null} */ (
        target.closest('.mon-plan__rejudge')
      );
      if (rejudge) {
        if (!rejudge.disabled) {
          void rejudgeAll();
        }
        return true;
      }
      if (target.closest('.mon-plan__close')) {
        open = false;
        reset();
        requestRender();
        return true;
      }
      const apply_repo = /** @type {HTMLButtonElement|null} */ (
        target.closest('.mon-plan__apply-repo')
      );
      if (apply_repo) {
        const root_dir = apply_repo.dataset.rootDir || '';
        const repo = panelRepos().find((item) => item.root_dir === root_dir);
        if (repo && !apply_repo.disabled) {
          void apply([repo]);
        }
        return true;
      }
      const apply_all = /** @type {HTMLButtonElement|null} */ (
        target.closest('.mon-plan__apply-all')
      );
      if (apply_all) {
        if (!apply_all.disabled) {
          void apply(applicable().map((item) => item.repo));
        }
        return true;
      }
      const review = /** @type {HTMLButtonElement|null} */ (
        target.closest('.mon-plan__review')
      );
      if (review) {
        const root_dir = review.dataset.rootDir || '';
        if (root_dir && !review.disabled) {
          results.delete(root_dir);
          checks.delete(root_dir);
          requestRender();
        }
        return true;
      }
      // The panel and the header controls are not cards: a click inside them
      // must not fall through to the card's open-detail default.
      return !!target.closest('.mon-plan, .mon-plan-controls');
    },
    /**
     * Handle a change event (the repository cards' include checkboxes).
     *
     * @param {HTMLElement|null} target
     * @returns {boolean}
     */
    handleChange(target) {
      const box = /** @type {HTMLInputElement|null} */ (
        target && typeof target.closest === 'function'
          ? target.closest('.mon-plan .worker-plan__include')
          : null
      );
      if (!box) {
        return false;
      }
      const root_dir = box.dataset.rootDir || '';
      const id = box.dataset.beadId || '';
      if (root_dir && id) {
        checksOf(root_dir).set(id, box.checked);
        requestRender();
      }
      return true;
    },
    /**
     * Esc closes the panel. True when it was open.
     *
     * @returns {boolean}
     */
    handleEscape() {
      if (!open) {
        return false;
      }
      open = false;
      reset();
      requestRender();
      return true;
    }
  };
}
