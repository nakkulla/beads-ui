/**
 * Worker console — queue management + running-session view (spec §5.1–§5.3).
 *
 * Candidate lanes are live Board Ready/Blocked data read from the SAME
 * per-subscription issue stores as the Board tab (no separate candidate
 * storage). Serial/Parallel/Done lanes are driven by the `worker-queue`
 * subscription. Dragging a candidate into Serial/Parallel issues a
 * `worker-queue-place` mutation carrying the current queue revision; on a CAS
 * conflict the reply's current snapshot is adopted and the drag retried once.
 *
 * The ▶/⏸ controls flip `auto_advance`. Running tiles + the breaker/Failed
 * banner are derived from the queue snapshot's `attempts` (status='running'
 * → tiles; status='failed'/'orphaned' → breaker banner), which the server-side
 * scheduler fills as sessions dispatch and terminate.
 */
import { html, render } from 'lit-html';
import { createListSelectors } from '../../data/list-selectors.js';
import { cmpEffectiveRank } from '../../data/sort.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../utils/toast.js';
import { createReorderController } from '../reorder.js';
import { createExecDefaultsDialog } from './exec-defaults-dialog.js';
import { paneTemplate } from './lanes.js';
import { bannersTemplate, runningGridTemplate } from './running-grid.js';
import { createTranscriptDrawer } from './transcript-drawer.js';

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
 * A full_plan phase child (`UI-xxxx.N`) is a sub-unit of its parent plan's
 * execution, never a standalone worker candidate (spec §1). Judged by the
 * flattened `parent` edge (same field Board's `parentIdOf` reads) OR a dotted id
 * suffix, since `bd ready --json` may omit `parent`.
 *
 * @param {any} issue
 * @returns {boolean}
 */
function isPhaseChild(issue) {
  const raw = issue && issue.parent;
  const has_parent =
    typeof raw === 'string' ? raw.length > 0 : !!(raw && raw.id);
  return has_parent || /\.\d+$/.test((issue && issue.id) || '');
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
 * @param {{ transport?: (type: string, payload?: unknown) => Promise<any>, issueStores?: any, queueStore?: any, sessionLogStore?: any, uiOrderStore?: import('../reorder.js').UiOrderStore, gotoIssue?: (id: string) => void }} [options]
 * @returns {{ load: () => void, destroy: () => void }}
 */
export function createWorkerView(mount_element, options = {}) {
  const {
    transport,
    issueStores,
    queueStore,
    sessionLogStore,
    uiOrderStore,
    gotoIssue
  } = options;
  // The shared ui-order store feeds list-selectors so an order-only push
  // re-renders the candidate lane, and drives the same effective-rank sort the
  // Board uses (spec §2/§4).
  const selectors = issueStores
    ? createListSelectors(issueStores, uiOrderStore)
    : null;
  const reorder = createReorderController({ transport, uiOrderStore });

  /** @type {{ bead_id: string, from_lane: string }|null} */
  let dragging = null;
  /**
   * Sorted raw candidate issues (Ready+Blocked merged, queued excluded), kept so
   * a candidate→candidate drop computes its rank against exactly the rendered
   * order (rows drop `created_at`, which the rank math needs). Refreshed on every
   * `buildModel`.
   *
   * @type {any[]}
   */
  let candidate_issues = [];
  /** @type {Array<() => void>} */
  const unsubscribers = [];

  // Persistent console shell: the running grid (top) and lanes (bottom) render
  // into their own targets so the transcript drawer can sit BETWEEN them (the
  // mockup pushes the lanes down when a tile opens the drawer) without a
  // full-template re-render clobbering the drawer's own lit-html root.
  const console_el = document.createElement('div');
  console_el.className = 'worker-console';
  const top_el = document.createElement('div');
  const drawer_el = document.createElement('div');
  drawer_el.className = 'worker-drawer-host';
  const lanes_el = document.createElement('div');
  // Flex host so .worker-lanes' flex sizing is live — a plain block div here
  // breaks the min-height:0 chain and the pane bodies can never scroll.
  lanes_el.className = 'worker-lanes-host';
  console_el.append(top_el, drawer_el, lanes_el);
  mount_element.appendChild(console_el);

  /** @type {string|null} Currently open attempt (for the tile ring). */
  let selected_attempt = null;

  const drawer = createTranscriptDrawer(drawer_el, {
    transport,
    sessionLogStore,
    onClose: () => {
      selected_attempt = null;
      doRender();
    }
  });

  // Workspace-global exec-defaults dialog (⚙ in the ctrl bar). It owns its own
  // queueStore subscription so an open dialog re-renders as snapshots arrive.
  const exec_defaults_dialog = createExecDefaultsDialog(console_el, {
    queueStore,
    transport
  });

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
   * Stop (■) a running attempt: group-kill + attempt failed + workflow_mode
   * revert on the server (spec §5.2). Fire-and-forget; the server pushes a fresh
   * queue snapshot that clears the tile.
   *
   * @param {string} attempt_id
   */
  async function stopAttempt(attempt_id) {
    if (!transport || !attempt_id) {
      return;
    }
    await transport('worker-attempt-stop', { attempt_id });
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
   * Set (or unset with '') a workspace-global policy, retrying ONCE on a CAS
   * conflict — the same discipline as {@link setAutoAdvance} (§2).
   *
   * @param {'merge_policy'|'drift_policy'} key
   * @param {string} value
   */
  async function setPolicy(key, value) {
    if (!transport) {
      return;
    }
    const payload = { key, value: value || null };
    const res = await transport('worker-queue-set-policy', {
      ...payload,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-set-policy', {
        ...payload,
        expected_revision: currentRevision()
      }).then(adopt);
    }
  }

  /**
   * Build the render view-model from live issue stores + the queue snapshot.
   *
   * @returns {{ queue: any, idToTitle: Map<string, string>, candidates: any[], running: any[], breaker: any, serial: any[], parallel: any[], done: any[] }}
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

    // Merge the raw Ready+Blocked issues (which carry created_at) FIRST, sort the
    // combined list by the shared effective rank (spec §4 "합산 목록 유효 rank
    // 정렬"), THEN exclude queued beads and project to candidate rows. Blocked ids
    // are tracked so the row reason keeps the blocked/ready distinction after the
    // merge collapses the two sources into one order.
    /** @type {Set<string>} */
    const blocked_ids = new Set(blocked.map((/** @type {any} */ it) => it.id));
    const order = uiOrderStore ? uiOrderStore.get()?.order || {} : {};
    /** @type {Set<string>} */
    const seen = new Set();
    /** @type {any[]} */
    const merged = [];
    for (const it of [...ready, ...blocked]) {
      if (queued.has(it.id) || seen.has(it.id) || isPhaseChild(it)) {
        continue;
      }
      seen.add(it.id);
      merged.push(it);
    }
    merged.sort(cmpEffectiveRank(order));
    candidate_issues = merged;

    // Admission refusals recorded by the scheduler/place gate (§1) surface as
    // reason badges on candidate AND queued rows.
    /** @type {Record<string, { reason: string, at: number }>} */
    const admission = q.admission || {};
    /**
     * @param {string} bead_id
     * @returns {string}
     */
    const admissionBadge = (bead_id) =>
      admission[bead_id] ? `⛔ ${admission[bead_id].reason}` : '';

    /** @type {any[]} */
    const candidates = merged.map((/** @type {any} */ it) => {
      const eligible = hasSpec(it);
      /** @type {string[]} */
      const parts = [];
      if (blocked_ids.has(it.id)) {
        parts.push(blockedReason(it));
      }
      if (!eligible) {
        parts.push('spec 없음');
      }
      const adm = admissionBadge(it.id);
      if (adm) {
        parts.push(adm);
      }
      return {
        id: it.id,
        title: it.title || it.id,
        reason: parts.join(' · '),
        draggable: eligible,
        lane: 'candidate',
        // Candidate cards consume the server-enriched workflow/status (spec §2);
        // queue lanes carry no workflow snapshot, so they stay on miniRow.
        workflow: it.workflow,
        status: it.status
      };
    });

    /**
     * @param {any[]} entries
     * @param {'serial'|'parallel'|'done'} lane
     * @returns {any[]}
     */
    const toRows = (entries, lane) =>
      entries.map((/** @type {any} */ e) => ({
        id: e.bead_id,
        title: idToTitle.get(e.bead_id) || e.bead_id,
        reason: lane === 'done' ? '' : admissionBadge(e.bead_id),
        draggable: lane !== 'done',
        done: lane === 'done',
        lane
      }));

    // Lane lookup so running tiles show serial vs ∥ badge (a running bead stays
    // in its lane until it moves to Done).
    /** @type {Map<string, 'serial'|'parallel'>} */
    const beadLane = new Map();
    for (const e of q.serial || []) {
      beadLane.set(e.bead_id, 'serial');
    }
    for (const e of q.parallel || []) {
      beadLane.set(e.bead_id, 'parallel');
    }

    const attempts = q.attempts ? Object.values(q.attempts) : [];
    /** @type {any[]} */
    const running = [];
    /** @type {any|null} */
    let breaker = null;
    for (const a of /** @type {any[]} */ (attempts)) {
      if (a.status === 'running') {
        running.push({
          bead_id: a.bead_id,
          attempt_id: a.attempt_id,
          title: idToTitle.get(a.bead_id) || a.bead_id,
          lane: beadLane.get(a.bead_id) || 'parallel',
          runner: a.runner || null,
          model: a.model || null,
          effort: a.effort || null,
          started_at: typeof a.started_at === 'number' ? a.started_at : null,
          merge_policy: a.merge_policy || null,
          demoted_reason: a.demoted_reason || null
        });
      } else if (a.status === 'failed' || a.status === 'orphaned') {
        // The most recent failure/orphan surfaces the breaker banner.
        breaker = { repo: a.repo || '', reason: a.cause || a.status };
      }
    }

    return {
      queue: q,
      idToTitle,
      candidates,
      running,
      breaker,
      serial: toRows(q.serial, 'serial'),
      parallel: toRows(q.parallel, 'parallel'),
      done: toRows(q.done, 'done')
    };
  }

  /**
   * @param {ReturnType<typeof buildModel>} m
   * @returns {import('lit-html').TemplateResult}
   */
  function topTemplate(m) {
    const serialHead = m.serial.length > 0 ? m.serial[0].id : '—';
    const info = m.queue.workspace_info || {};
    const verify_cmd =
      info.verify_cmd && Array.isArray(info.verify_cmd.cmd)
        ? info.verify_cmd.cmd.join(' ')
        : null;
    // The bar can truncate a long argv (CSS ellipsis), so the FULL command also
    // rides the title attribute — the only place it can be read on a narrow
    // screen where the body is hidden for a status badge (spec §1.2).
    const verify_title = verify_cmd
      ? `verify_cmd — 서버 설정 파일 전용(읽기), 미설정 시 auto_merge가 pr_stop으로 강등. 전체 명령: ${verify_cmd}`
      : 'verify_cmd — 서버 설정 파일 전용(읽기), 미설정 시 auto_merge가 pr_stop으로 강등';
    /**
     * @param {'merge_policy'|'drift_policy'} key
     * @param {string[]} opts
     * @param {string} default_label
     */
    const policySelect = (key, opts, default_label) => {
      const value = typeof m.queue[key] === 'string' ? m.queue[key] : '';
      return html`<label class="worker-policy">
        <span class="worker-policy__k">${key}</span>
        <select
          class="worker-policy__sel"
          aria-label=${`전역 ${key}`}
          data-policy-key=${key}
          @change=${(/** @type {Event} */ ev) =>
            void setPolicy(
              key,
              /** @type {HTMLSelectElement} */ (ev.target).value
            )}
        >
          <option value="" ?selected=${!opts.includes(value)}>
            ${default_label}
          </option>
          ${opts.map(
            (o) =>
              html`<option value=${o} ?selected=${value === o}>${o}</option>`
          )}
        </select>
      </label>`;
    };
    return html`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${m.queue.auto_advance ? ' is-active' : ''}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${m.running.length}</b> · serial 다음
          <b>${serialHead}</b></span
        >
        <span class="worker-tgl"
          >parallel slot <b>${m.parallel.length}</b></span
        >
        ${policySelect(
          'merge_policy',
          ['auto_merge', 'pr_stop'],
          '(기본 auto_merge)'
        )}
        ${policySelect(
          'drift_policy',
          ['auto_rereview', 'halt'],
          '(기본 auto_rereview)'
        )}
        <button
          type="button"
          class="worker-exec-defaults-btn"
          aria-haspopup="dialog"
          aria-label="전역 실행 설정"
          title="전역 실행 설정"
        >
          ⚙
        </button>
        <span
          class="worker-verifycmd${verify_cmd
            ? ''
            : ' worker-verifycmd--unset'}"
          title=${verify_title}
        >
          ${verify_cmd
            ? html`<span class="worker-verifycmd__full"
                  >verify_cmd: <code>${verify_cmd}</code></span
                ><span class="worker-verifycmd__badge">verify_cmd ✓</span>`
            : html`<span class="worker-verifycmd__full"
                  >verify_cmd: 미설정 (auto_merge→pr_stop 강등)</span
                ><span class="worker-verifycmd__badge"
                  >verify_cmd 미설정 ⤵pr_stop</span
                >`}</span
        >
      </div>
      ${bannersTemplate({
        autoAdvance: !!m.queue.auto_advance,
        breaker: m.breaker
      })}
      ${runningGridTemplate(m.running, Date.now(), selected_attempt)}`;
  }

  /**
   * @param {ReturnType<typeof buildModel>} m
   * @returns {import('lit-html').TemplateResult}
   */
  function lanesTemplate(m) {
    return html`<div class="worker-lanes">
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
    </div>`;
  }

  function doRender() {
    const m = buildModel();
    render(topTemplate(m), top_el);
    render(lanesTemplate(m), lanes_el);
  }

  // --- Native drag/drop (no library), mirroring board.js conventions. ---
  /**
   * @param {DragEvent} ev
   */
  function onDragStart(ev) {
    const el = /** @type {HTMLElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.(
        '.worker-mini[draggable="true"], .worker-card[draggable="true"]'
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
   * Candidate→candidate manual reorder (spec §4): build the lane's desired final
   * order (dragged bead spliced at the target) from the merged candidate issues,
   * then hand it to the shared reorder controller (optimistic rank apply +
   * CAS-retry-once), mirroring the Board same-column path. The rank math needs
   * the raw issues' `created_at`, so it reads {@link candidate_issues} rather than
   * the projected rows.
   *
   * @param {string} bead_id
   * @param {HTMLElement|null} over - The `.worker-card` under the cursor, if any.
   */
  function reorderCandidates(bead_id, over) {
    const dragged = candidate_issues.find((it) => it.id === bead_id);
    if (!dragged) {
      return;
    }
    const without = candidate_issues.filter((it) => it.id !== bead_id);
    let insert_index = without.length;
    if (over) {
      const over_id = over.dataset.beadId;
      if (over_id === bead_id) {
        // Dropped onto itself — no move.
        return;
      }
      const j = without.findIndex((it) => it.id === over_id);
      if (j >= 0) {
        insert_index = j;
      }
    }
    const final_list = without.slice();
    final_list.splice(insert_index, 0, dragged);
    void reorder.applyReorder(bead_id, final_list, insert_index);
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

    // Drop index = position of the row under the cursor, else append. Candidate
    // rows are `.worker-card`, queue rows are `.worker-mini` — match both.
    const over = /** @type {HTMLElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.(
        '.worker-mini, .worker-card'
      )
    );
    const minis = Array.from(
      pane.querySelectorAll('.worker-mini, .worker-card')
    );
    let index = minis.length;
    if (over) {
      const i = minis.indexOf(over);
      if (i >= 0) {
        index = i;
      }
    }

    if (to_lane === 'candidate') {
      // Candidate→candidate = manual reorder in the shared rank map (spec §4).
      if (from_lane === 'candidate') {
        reorderCandidates(bead_id, over);
        return;
      }
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
   * Project an attempt record into the drawer meta shape (spec §2/§5.6).
   *
   * @param {any} a
   * @returns {import('./transcript-drawer.js').DrawerMeta}
   */
  function metaForAttempt(a) {
    return a
      ? {
          runner: a.runner || undefined,
          model: a.model || undefined,
          effort: a.effort || undefined,
          worktree: a.worktree || undefined,
          status: a.status || undefined,
          session_id: a.session_id || undefined
        }
      : {};
  }

  /**
   * Open (or switch) the transcript drawer for a running attempt (spec §5.6).
   *
   * @param {string} attempt_id
   */
  function openDrawerForAttempt(attempt_id) {
    const q = currentQueue();
    const a = q.attempts ? q.attempts[attempt_id] : null;
    selected_attempt = attempt_id;
    drawer.open({ attempt_id, meta: metaForAttempt(a) });
    doRender();
  }

  /**
   * Late-arrival meta refresh (spec §2): the session id lands on the stream's
   * first event AFTER the drawer may already be open, and drawer meta is copied
   * once at open() — so on every queue snapshot push, re-feed the open attempt's
   * latest record into the drawer.
   */
  function refreshOpenDrawerMeta() {
    if (!selected_attempt) {
      return;
    }
    const q = currentQueue();
    const a = q.attempts ? q.attempts[selected_attempt] : null;
    if (a) {
      drawer.updateMeta(metaForAttempt(a));
    }
  }

  /**
   * @param {MouseEvent} ev
   */
  function onClick(ev) {
    const target = /** @type {HTMLElement} */ (ev.target);
    // Clicks inside the exec-defaults dialog are owned by its own handlers.
    if (target?.closest?.('#worker-exec-defaults-dialog')) {
      return;
    }
    if (target?.closest?.('.worker-exec-defaults-btn')) {
      exec_defaults_dialog.open();
      return;
    }
    if (target?.closest?.('.worker-play')) {
      void setAutoAdvance(true);
      return;
    }
    if (target?.closest?.('.worker-pause')) {
      void setAutoAdvance(false);
      return;
    }
    // The stop ■ halts the attempt; it must never also open the drawer.
    if (target?.closest?.('.rtile__stop')) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const att = tile?.dataset?.attemptId;
      if (att) {
        void stopAttempt(att);
      }
      return;
    }
    // The ⓘ opens the shared detail panel; it must never also open the drawer,
    // so it is handled BEFORE the .rtile transcript default (spec §4).
    if (target?.closest?.('.rtile__info')) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const id = tile?.dataset?.beadId;
      if (id && gotoIssue) {
        gotoIssue(id);
      }
      return;
    }
    // Clicks inside the drawer are owned by the drawer's own handlers.
    if (target?.closest?.('.worker-drawer-host')) {
      return;
    }
    const rtile = /** @type {HTMLElement|null} */ (target?.closest?.('.rtile'));
    if (rtile) {
      const att = rtile.dataset.attemptId;
      if (att) {
        openDrawerForAttempt(att);
      }
      return;
    }
    const mini = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini, .worker-card')
    );
    if (mini) {
      const id = mini.dataset.beadId;
      // The ID element copies the bead id (Board onCopyId convention) and must
      // never also open the detail panel.
      if (target?.closest?.('.worker-mini__id, .worker-card__id')) {
        if (id) {
          void copyToClipboard(id).then((ok) => {
            if (ok) {
              showToast('복사됨', 'success', 1200);
            } else {
              showToast('복사 실패', 'error', 1600);
            }
          });
        }
        return;
      }
      if (id && gotoIssue) {
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
    unsubscribers.push(
      queueStore.subscribe(() => {
        doRender();
        refreshOpenDrawerMeta();
      })
    );
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
      try {
        drawer.destroy();
      } catch {
        /* ignore */
      }
      try {
        exec_defaults_dialog.destroy();
      } catch {
        /* ignore */
      }
      render(html``, mount_element);
    }
  };
}
