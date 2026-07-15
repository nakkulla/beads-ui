/**
 * Worker console v1 — queue management (spec §5.1). NO EXECUTION (Phase 10).
 *
 * Candidate lanes are live Board Ready/Blocked data read from the SAME
 * per-subscription issue stores as the Board tab (no separate candidate
 * storage). Serial/Parallel/Done lanes are driven by the `worker-queue`
 * subscription. Dragging a candidate into Serial/Parallel issues a
 * `worker-queue-place` mutation carrying the current queue revision; on a CAS
 * conflict the reply's current snapshot is adopted and the drag retried once.
 *
 * The ▶/⏸ controls flip `auto_advance`; because execution is disabled this
 * phase, turning it on only persists the flag and surfaces the exec-disabled
 * banner — nothing is dispatched.
 */
import { html, render } from 'lit-html';
import { createListSelectors } from '../../data/list-selectors.js';
import { paneTemplate } from './lanes.js';
import { bannersTemplate, runningGridTemplate } from './running-grid.js';

const READY_KEY = 'tab:worker:ready';
const BLOCKED_KEY = 'tab:worker:blocked';

/**
 * @param {any} issue
 * @returns {boolean} Whether the bead is queue-eligible (spec present, §5.4).
 */
function hasSpec(issue) {
  const meta = issue && issue.metadata;
  return !!(meta && typeof meta === 'object' && meta.spec_id);
}

/**
 * @param {any} issue
 * @returns {string} 🔒 + dependency target for a blocked candidate.
 */
function blockedReason(issue) {
  const deps = Array.isArray(issue?.dependencies) ? issue.dependencies : [];
  const ids = deps
    .map((/** @type {any} */ d) => (typeof d === 'string' ? d : d && d.id))
    .filter(Boolean);
  return ids.length > 0 ? `🔒 ${ids.join(', ')}` : '🔒 blocked';
}

/**
 * Create the Worker console view.
 *
 * @param {HTMLElement} mount_element - Element to render into.
 * @param {{ transport?: (type: string, payload?: unknown) => Promise<any>, issueStores?: any, queueStore?: any, gotoIssue?: (id: string) => void }} [options]
 * @returns {{ load: () => void, destroy: () => void }}
 */
export function createWorkerView(mount_element, options = {}) {
  const { transport, issueStores, queueStore, gotoIssue } = options;
  const selectors = issueStores ? createListSelectors(issueStores) : null;

  /** @type {{ bead_id: string, from_lane: string }|null} */
  let dragging = null;
  /** @type {Array<() => void>} */
  const unsubscribers = [];

  /**
   * @returns {any} Current queue snapshot (or an empty shape).
   */
  function currentQueue() {
    return (
      (queueStore && queueStore.get()) || {
        revision: 0,
        auto_advance: false,
        serial: [],
        parallel: [],
        done: []
      }
    );
  }

  /**
   * @returns {number}
   */
  function currentRevision() {
    const q = currentQueue();
    return typeof q.revision === 'number' ? q.revision : 0;
  }

  /**
   * Adopt the authoritative queue from a mutation reply so the view reflects
   * state even before the fanout push arrives (and in tests without a socket).
   *
   * @param {any} res
   */
  function adopt(res) {
    if (res && res.queue && queueStore) {
      queueStore.set(res.queue);
    }
  }

  /**
   * Place a bead into a lane at an index, retrying ONCE on a CAS conflict.
   *
   * @param {string} bead_id
   * @param {'serial'|'parallel'} lane
   * @param {number} index
   */
  async function placeBead(bead_id, lane, index) {
    if (!transport) {
      return;
    }
    const res = await transport('worker-queue-place', {
      bead_id,
      lane,
      index,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-place', {
        bead_id,
        lane,
        index,
        expected_revision: currentRevision()
      }).then(adopt);
    }
  }

  /**
   * @param {string} bead_id
   * @param {'serial'|'parallel'} lane
   * @param {number} to_index
   */
  async function reorderBead(bead_id, lane, to_index) {
    if (!transport) {
      return;
    }
    const res = await transport('worker-queue-reorder', {
      bead_id,
      lane,
      to_index,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-reorder', {
        bead_id,
        lane,
        to_index,
        expected_revision: currentRevision()
      }).then(adopt);
    }
  }

  /**
   * @param {string} bead_id
   */
  async function removeBead(bead_id) {
    if (!transport) {
      return;
    }
    const res = await transport('worker-queue-remove', {
      bead_id,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-remove', {
        bead_id,
        expected_revision: currentRevision()
      }).then(adopt);
    }
  }

  /**
   * @param {boolean} on
   */
  async function setAutoAdvance(on) {
    if (!transport) {
      return;
    }
    const res = await transport('worker-queue-toggle', {
      on,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-toggle', {
        on,
        expected_revision: currentRevision()
      }).then(adopt);
    }
  }

  /**
   * Build the render view-model from live issue stores + the queue snapshot.
   *
   * @returns {{ queue: any, idToTitle: Map<string, string>, candidates: any[], serial: any[], parallel: any[], done: any[] }}
   */
  function buildModel() {
    const q = currentQueue();
    const ready = selectors
      ? selectors.selectBoardColumn(READY_KEY, 'ready')
      : [];
    const blocked = selectors
      ? selectors.selectBoardColumn(BLOCKED_KEY, 'blocked')
      : [];

    /** @type {Map<string, string>} */
    const idToTitle = new Map();
    for (const it of [...ready, ...blocked]) {
      idToTitle.set(it.id, it.title || it.id);
    }

    const queued = new Set([
      ...q.serial.map((/** @type {any} */ e) => e.bead_id),
      ...q.parallel.map((/** @type {any} */ e) => e.bead_id),
      ...q.done.map((/** @type {any} */ e) => e.bead_id)
    ]);

    /** @type {any[]} */
    const candidates = [];
    for (const it of ready) {
      if (queued.has(it.id)) {
        continue;
      }
      const eligible = hasSpec(it);
      candidates.push({
        id: it.id,
        title: it.title || it.id,
        reason: eligible ? '' : 'spec 없음',
        draggable: eligible,
        lane: 'candidate'
      });
    }
    for (const it of blocked) {
      if (queued.has(it.id)) {
        continue;
      }
      const eligible = hasSpec(it);
      const reason = eligible
        ? blockedReason(it)
        : `${blockedReason(it)} · spec 없음`;
      candidates.push({
        id: it.id,
        title: it.title || it.id,
        reason,
        draggable: eligible,
        lane: 'candidate'
      });
    }

    /**
     * @param {any[]} entries
     * @param {'serial'|'parallel'|'done'} lane
     * @returns {any[]}
     */
    const toRows = (entries, lane) =>
      entries.map((/** @type {any} */ e) => ({
        id: e.bead_id,
        title: idToTitle.get(e.bead_id) || e.bead_id,
        draggable: lane !== 'done',
        done: lane === 'done',
        lane
      }));

    return {
      queue: q,
      idToTitle,
      candidates,
      serial: toRows(q.serial, 'serial'),
      parallel: toRows(q.parallel, 'parallel'),
      done: toRows(q.done, 'done')
    };
  }

  function template() {
    const m = buildModel();
    const serialHead = m.serial.length > 0 ? m.serial[0].id : '—';
    return html`<div class="worker-console">
      <div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${m.queue.auto_advance ? ' is-active' : ''}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${m.queue.parallel.length + (m.serial.length ? 1 : 0)}</b> ·
          serial 다음 <b>${serialHead}</b></span
        >
        <span class="worker-tgl"
          >parallel slot <b>${m.parallel.length}</b></span
        >
      </div>
      ${bannersTemplate({ autoAdvance: !!m.queue.auto_advance, breaker: null })}
      ${runningGridTemplate()}
      <div class="worker-lanes">
        ${paneTemplate({
          id: 'worker-pane-candidate',
          lane: 'candidate',
          title: '후보 · Board 연동',
          items: m.candidates,
          src: true,
          empty: '후보 없음'
        })}
        ${paneTemplate({
          id: 'worker-pane-serial',
          lane: 'serial',
          title: 'Serial 큐',
          items: m.serial,
          empty: '드래그로 배치'
        })}
        ${paneTemplate({
          id: 'worker-pane-parallel',
          lane: 'parallel',
          title: 'Parallel 풀',
          items: m.parallel,
          empty: '드래그로 배치'
        })}
        ${paneTemplate({
          id: 'worker-pane-done',
          lane: 'done',
          title: `Done · 오늘 ${m.done.length}`,
          items: m.done,
          empty: '완료 없음'
        })}
      </div>
    </div>`;
  }

  function doRender() {
    render(template(), mount_element);
  }

  // --- Native drag/drop (no library), mirroring board.js conventions. ---
  /**
   * @param {DragEvent} ev
   */
  function onDragStart(ev) {
    const el = /** @type {HTMLElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.(
        '.worker-mini[draggable="true"]'
      )
    );
    if (!el) {
      return;
    }
    const bead_id = el.dataset.beadId || '';
    const from_lane = el.dataset.lane || '';
    dragging = { bead_id, from_lane };
    try {
      ev.dataTransfer?.setData('text/plain', bead_id);
      if (ev.dataTransfer) {
        ev.dataTransfer.effectAllowed = 'move';
      }
    } catch {
      /* ignore */
    }
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragOver(ev) {
    const pane = /** @type {HTMLElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-pane')
    );
    if (!pane) {
      return;
    }
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = 'move';
    }
    pane.classList.add('worker-pane--drag-over');
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragLeave(ev) {
    const pane = /** @type {HTMLElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-pane')
    );
    pane?.classList.remove('worker-pane--drag-over');
  }

  /**
   * @param {DragEvent} ev
   */
  function onDrop(ev) {
    const pane = /** @type {HTMLElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-pane')
    );
    if (!pane) {
      return;
    }
    ev.preventDefault();
    pane.classList.remove('worker-pane--drag-over');
    const to_lane = pane.dataset.lane || '';
    const bead_id =
      dragging?.bead_id || ev.dataTransfer?.getData('text/plain') || '';
    const from_lane = dragging?.from_lane || '';
    dragging = null;
    if (!bead_id) {
      return;
    }

    // Drop index = position of the mini under the cursor, else append.
    const over = /** @type {HTMLElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-mini')
    );
    const minis = Array.from(pane.querySelectorAll('.worker-mini'));
    let index = minis.length;
    if (over) {
      const i = minis.indexOf(over);
      if (i >= 0) {
        index = i;
      }
    }

    if (to_lane === 'candidate') {
      // Moving a queued bead back to candidates removes it from the queue.
      if (from_lane === 'serial' || from_lane === 'parallel') {
        void removeBead(bead_id);
      }
      return;
    }
    if (to_lane === 'serial' || to_lane === 'parallel') {
      if (from_lane === to_lane) {
        void reorderBead(bead_id, to_lane, index);
      } else {
        void placeBead(bead_id, to_lane, index);
      }
    }
  }

  /**
   * @param {MouseEvent} ev
   */
  function onClick(ev) {
    const target = /** @type {HTMLElement} */ (ev.target);
    if (target?.closest?.('.worker-play')) {
      void setAutoAdvance(true);
      return;
    }
    if (target?.closest?.('.worker-pause')) {
      void setAutoAdvance(false);
      return;
    }
    const mini = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini')
    );
    if (mini && gotoIssue) {
      const id = mini.dataset.beadId;
      if (id) {
        gotoIssue(id);
      }
    }
  }

  mount_element.addEventListener('dragstart', /** @type {any} */ (onDragStart));
  mount_element.addEventListener('dragover', /** @type {any} */ (onDragOver));
  mount_element.addEventListener('dragleave', /** @type {any} */ (onDragLeave));
  mount_element.addEventListener('drop', /** @type {any} */ (onDrop));
  mount_element.addEventListener('click', /** @type {any} */ (onClick));

  if (selectors) {
    unsubscribers.push(selectors.subscribe(doRender));
  }
  if (queueStore) {
    unsubscribers.push(queueStore.subscribe(doRender));
  }

  doRender();

  return {
    load() {
      doRender();
    },
    destroy() {
      for (const off of unsubscribers.splice(0)) {
        try {
          off();
        } catch {
          /* ignore */
        }
      }
      mount_element.removeEventListener(
        'dragstart',
        /** @type {any} */ (onDragStart)
      );
      mount_element.removeEventListener(
        'dragover',
        /** @type {any} */ (onDragOver)
      );
      mount_element.removeEventListener(
        'dragleave',
        /** @type {any} */ (onDragLeave)
      );
      mount_element.removeEventListener('drop', /** @type {any} */ (onDrop));
      mount_element.removeEventListener('click', /** @type {any} */ (onClick));
      render(html``, mount_element);
    }
  };
}
