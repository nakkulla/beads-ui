/**
 * Worker console — queue management + running-session view (spec §5.1–§5.3).
 *
 * Candidate lanes are live Board Ready/Blocked data read from the SAME
 * per-subscription issue stores as the Board tab (no separate candidate
 * storage). The single waiting queue + Done lanes are driven by the
 * `worker-queue` subscription (worker-phase2 §3 collapsed the serial/parallel
 * duality into ONE lane). Dragging a candidate into the queue issues a
 * `worker-queue-place` mutation carrying the current queue revision; on a CAS
 * conflict the reply's current snapshot is adopted and the drag retried once.
 *
 * The ▶/⏸ controls flip `auto_advance`, and the slot editor sets the
 * concurrency cap (`worker-queue-set-slots`, same CAS discipline; lower bound
 * 1 — which is exactly the retired serial lane). Running tiles + the failure
 * banner are derived from the queue snapshot's `attempts` (status='running' → tiles;
 * status='failed'/'orphaned' → failure banner), which the server-side scheduler
 * fills as sessions dispatch and terminate. The banner reads the LATEST failed
 * attempt directly — there is no breaker object behind it (worker-phase2 §2).
 *
 * LAYOUT (worker-phase2 §7). The lane row is the spec's four columns —
 * 대기 · 실행 중 · PR 대기 · 완료 — so a bead's whole life reads left to right in
 * one row: it waits, it runs, its PR waits for the human click, it merges.
 * 실행 중 is a COLUMN, not the banner-level grid it used to be, because the
 * sketch draws it as one; the tile grid template is unchanged and simply renders
 * as that column's body.
 *
 * The candidate pane is kept as a fifth, visually distinct SOURCE pane in front
 * of those four. It is not a fifth bead state — it is the Board feed a bead is
 * dragged OUT of, and dropping it would delete the only way to enqueue anything
 * (`worker-queue-place` has no other entry point). It stays dashed
 * (`worker-pane--src`) precisely so it does not read as one of the four.
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
 * Lower bound on the concurrency cap, mirroring the server's `MIN_SLOTS`
 * (worker-phase2 §3). The server rejects anything below it; the editor clamps
 * so a stray keystroke never sends a value that would just bounce.
 *
 * @type {number}
 */
const MIN_SLOTS = 1;

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
 * Gate tiers whose badge reports something a HUMAN has to act on rather than
 * something to wait out: the PR was closed without a merge (worker-phase2 §4 —
 * not a completion, the bead stays put), or the observation itself could not be
 * decided (§5 fail-closed).
 *
 * @type {string[]}
 */
const ALERT_GATE_TIERS = ['closed_unmerged', 'undecidable'];

/**
 * Project one `pr_wait` bead into a lane row, carrying whatever the server's PR
 * poller has observed (worker-phase2 §4/§5): the PR link, the gate/base badges,
 * and the two actions (§6).
 *
 * The PR stays a LINK (`#N ↗`), never a button — putting a view affordance and
 * an execute affordance side by side at the same weight is how a misclick
 * merges something. [머지] is disabled whenever the gate refuses, and the
 * disabled tooltip carries the refusal reason so the badge is not the only
 * explanation. [재실행] is visually subordinate: a misclick there discards a PR.
 *
 * The gate shown here is ADVISORY. The click re-queries `gh` server-side and
 * decides again, so a badge that went stale between render and click cannot
 * merge anything the fresh gate would refuse.
 *
 * @param {string} bead_id
 * @param {string} title
 * @param {Record<string, any>} observations - Snapshot `pr_observations` map.
 * @param {{ step: string, reason: string }|null} cleanup_failed - Durable
 * post-merge cleanup failure for this bead, if any (§6).
 * @returns {any}
 */
function prWaitRow(bead_id, title, observations, cleanup_failed) {
  const obs = observations[bead_id] || null;
  const gate = obs && obs.gate ? obs.gate : null;
  const pr = obs && obs.pr ? obs.pr : null;
  /** @type {string[]} */
  const badges = [];
  if (gate && gate.gate_badge) {
    badges.push(gate.gate_badge);
  }
  if (gate && gate.base_badge && gate.base_badge !== gate.gate_badge) {
    badges.push(gate.base_badge);
  }
  if (cleanup_failed) {
    badges.push('정리 실패');
  }
  const conflicting = !!gate && gate.base_badge === '충돌';
  const enabled = !!gate && gate.enabled === true;
  // An already-merged PR whose cleanup stopped: the click re-runs the cleanup
  // from the top. Nothing retries automatically (§6), so this button is the
  // human's way back in once they have fixed whatever stopped it.
  const cleanup_retry = !!cleanup_failed && !!gate && gate.tier === 'merged';
  return {
    id: bead_id,
    title,
    reason: cleanup_failed ? '머지됨 · 정리 미완' : 'PR 대기',
    draggable: false,
    done: true,
    lane: 'pr_wait',
    pr_number: pr && typeof pr.number === 'number' ? pr.number : null,
    pr_url: pr && typeof pr.url === 'string' ? pr.url : '',
    badges,
    alert: (!!gate && ALERT_GATE_TIERS.includes(gate.tier)) || !!cleanup_failed,
    merge_action: true,
    // A conflicting PR keeps [머지] clickable on purpose: that click is what
    // dispatches the resolution session (§6), and it merges nothing.
    merge_enabled: enabled || conflicting || cleanup_retry,
    merge_title: cleanup_retry
      ? '머지 완료 — 클릭하면 남은 정리를 처음부터 다시 수행합니다'
      : conflicting
        ? '충돌 — 클릭하면 충돌 해소 세션을 띄웁니다 (머지하지 않음)'
        : enabled
          ? `머지 (${gate.gate_badge}) — 클릭 시점에 다시 확인합니다`
          : gate && gate.tier === 'merged'
            ? // Already merged with no cleanup failure recorded: the cleanup is
              // running, so "머지 불가: 관측 대기" would be a lie about why.
              '머지됨 — 머지 후 정리 진행 중'
            : `머지 불가: ${(gate && gate.reason) || '관측 대기'}`
  };
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

  // Persistent console shell: the control bar + banners (top) and the lane row
  // (bottom) render into their own targets so the transcript drawer can sit
  // BETWEEN them (the mockup pushes the lanes down when a tile opens the
  // drawer) without a full-template re-render clobbering the drawer's own
  // lit-html root.
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
        slots: MIN_SLOTS,
        queue: [],
        pr_wait: [],
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
   * Place a bead into the waiting queue at an index, retrying ONCE on a CAS
   * conflict.
   *
   * @param {string} bead_id
   * @param {number} index
   */
  async function placeBead(bead_id, index) {
    if (!transport) {
      return;
    }
    const res = await transport('worker-queue-place', {
      bead_id,
      index,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-place', {
        bead_id,
        index,
        expected_revision: currentRevision()
      }).then(adopt);
    }
  }

  /**
   * @param {string} bead_id
   * @param {number} to_index
   */
  async function reorderBead(bead_id, to_index) {
    if (!transport) {
      return;
    }
    const res = await transport('worker-queue-reorder', {
      bead_id,
      to_index,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-reorder', {
        bead_id,
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
   * Discard (■) an attempt: group-kill + attempt `stopped` + the bead leaves
   * the queue, atomically on the server (worker-phase1 §2.2). Fire-and-forget;
   * the server pushes a fresh snapshot that clears the tile.
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
   * Pause (⏸) a running attempt: the session is killed but the attempt stays
   * resumable and the bead stays queued (worker-phase1 §2.1). A refusal
   * surfaces its reason as a toast — most often `no_session_id`, which the tile
   * also guards by disabling the button.
   *
   * @param {string} attempt_id
   */
  async function pauseAttempt(attempt_id) {
    if (!transport || !attempt_id) {
      return;
    }
    const res = /** @type {any} */ (
      await transport('worker-attempt-pause', { attempt_id })
    );
    if (res && res.paused === false && res.reason) {
      showToast(`일시정지 거부: ${res.reason}`, 'error', 2400);
    }
  }

  /**
   * Resume (↻ / paused tile ▶) an attempt (spec §1), under the
   * queue mutations' CAS discipline: send the current revision, adopt the
   * authoritative queue a conflict reply carries, and retry ONCE against the
   * fresh revision. A refusal surfaces its admission-badge reason as a toast.
   *
   * @param {string} attempt_id
   */
  async function resumeAttempt(attempt_id) {
    if (!transport || !attempt_id) {
      return;
    }
    let res = /** @type {any} */ (
      await transport('worker-attempt-resume', {
        attempt_id,
        expected_revision: currentRevision()
      })
    );
    adopt(res);
    if (res && res.conflict) {
      res = /** @type {any} */ (
        await transport('worker-attempt-resume', {
          attempt_id,
          expected_revision: currentRevision()
        })
      );
      adopt(res);
    }
    if (res && res.resumed === false && !res.conflict && res.reason) {
      showToast(`이어하기 거부: ${res.reason}`, 'error', 2400);
    }
  }

  /**
   * The human merge click (worker-phase2 §6). Sends the current revision under
   * the same CAS discipline as every other mutation and retries ONCE against
   * the fresh revision on a conflict. What comes back is not just success/fail
   * but WHAT HAPPENED, because the server may legitimately have merged nothing:
   * a conflicting PR dispatches a resolution session instead, and a gate that
   * refuses at click time (the badge was advisory) merges nothing at all.
   *
   * @param {string} bead_id
   */
  async function mergePr(bead_id) {
    if (!transport || !bead_id) {
      return;
    }
    let res = /** @type {any} */ (
      await transport('worker-pr-merge', {
        bead_id,
        expected_revision: currentRevision()
      })
    );
    adopt(res);
    if (res && res.conflict) {
      res = /** @type {any} */ (
        await transport('worker-pr-merge', {
          bead_id,
          expected_revision: currentRevision()
        })
      );
      adopt(res);
    }
    if (!res || res.conflict) {
      return;
    }
    if (res.action === 'conflict_resolution') {
      showToast(
        res.ok
          ? '충돌 — 해소 세션을 띄웠습니다 (머지하지 않음)'
          : `충돌 해소 디스패치 실패: ${res.reason || ''}`,
        res.ok ? 'success' : 'error',
        2800
      );
      return;
    }
    if (res.ok) {
      showToast('머지 + 정리 완료', 'success', 2000);
      return;
    }
    showToast(
      res.cleanup_step
        ? `머지됨 · 정리 실패(${res.cleanup_step}): ${res.reason || ''}`
        : `머지 거부: ${res.reason || ''}`,
      'error',
      3200
    );
  }

  /**
   * Run the [재실행] action (worker-phase2 §6) — destructive: the PR is closed
   * and the worktree/branch discarded. A confirmation stands in front of it
   * because it sits next to [머지]; the CAS + the server's own guards do the
   * rest.
   *
   * @param {string} bead_id
   */
  async function rerunPr(bead_id) {
    if (!transport || !bead_id) {
      return;
    }
    const confirmed =
      typeof globalThis.confirm !== 'function' ||
      globalThis.confirm(
        `${bead_id}: PR을 닫고 워크트리/브랜치를 폐기한 뒤 새 base에서 다시 실행합니다. 되돌릴 수 없습니다. 계속할까요?`
      );
    if (!confirmed) {
      return;
    }
    let res = /** @type {any} */ (
      await transport('worker-pr-rerun', {
        bead_id,
        expected_revision: currentRevision()
      })
    );
    adopt(res);
    if (res && res.conflict) {
      res = /** @type {any} */ (
        await transport('worker-pr-rerun', {
          bead_id,
          expected_revision: currentRevision()
        })
      );
      adopt(res);
    }
    if (res && res.rerun === false && !res.conflict) {
      showToast(`재실행 거부: ${res.reason || ''}`, 'error', 2800);
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
   * Set the concurrency cap (worker-phase2 §3), under the same CAS discipline
   * as the other mutations. The value is clamped to the lower bound before it
   * is sent — the server rejects (never clamps) an out-of-bound value.
   *
   * @param {number} slots
   */
  async function setSlots(slots) {
    if (!transport || !Number.isFinite(slots)) {
      return;
    }
    const value = Math.max(MIN_SLOTS, Math.floor(slots));
    const res = await transport('worker-queue-set-slots', {
      slots: value,
      expected_revision: currentRevision()
    });
    adopt(res);
    if (res && res.conflict) {
      await transport('worker-queue-set-slots', {
        slots: value,
        expected_revision: currentRevision()
      }).then(adopt);
    }
  }

  /**
   * Build the render view-model from live issue stores + the queue snapshot.
   *
   * @returns {{ queue: any, idToTitle: Map<string, string>, candidates: any[], running: any[], live_count: number, slots: number, over_cap: boolean, failure: any, waiting: any[], pr_wait: any[], done: any[], cleanup_failures: Array<{ bead_id: string, step: string, reason: string }> }}
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

    const pr_wait_entries = /** @type {any[]} */ (q.pr_wait || []);
    /** @type {Record<string, any>} */
    const pr_obs = q.pr_observations || {};
    // DURABLE post-merge cleanup failures (worker-phase2 §6): the merge landed
    // but the pr-finish sequence stopped part-way, so a human has to finish it.
    // Nothing retries automatically, which is exactly why this has a banner.
    /** @type {Record<string, { step: string, reason: string }>} */
    const cleanup_failed = q.cleanup_failed || {};
    const cleanup_failures = Object.entries(cleanup_failed).map(
      ([bead_id, rec]) => ({
        bead_id,
        step: rec && rec.step ? rec.step : '',
        reason: rec && rec.reason ? rec.reason : ''
      })
    );
    const queue_entries = /** @type {any[]} */ (q.queue || []);
    const queued = new Set([
      ...queue_entries.map((/** @type {any} */ e) => e.bead_id),
      ...pr_wait_entries.map((/** @type {any} */ e) => e.bead_id),
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
     * A `prefix:detail` reason (`spec_missing_at_base:<base>`) renders its detail
     * apart so the base reads at a glance; a bare reason renders unchanged, which
     * is what keeps already-persisted `spec_missing` records renderable without
     * any normalization.
     *
     * @param {string} bead_id
     * @returns {string}
     */
    const admissionBadge = (bead_id) => {
      const record = admission[bead_id];
      if (!record) {
        return '';
      }
      const reason = typeof record.reason === 'string' ? record.reason : '';
      const sep = reason.indexOf(':');
      if (sep > 0 && sep < reason.length - 1) {
        return `⛔ ${reason.slice(0, sep)} (${reason.slice(sep + 1)})`;
      }
      return `⛔ ${reason}`;
    };

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
     * @param {'queue'|'done'} lane
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

    const attempts = q.attempts ? Object.values(q.attempts) : [];
    // A resumed_from carried by any attempt marks its ancestor as spent, so an
    // ancestor is never offered as a resume target (spec §1).
    /** @type {Set<string>} */
    const resumed_from_ids = new Set();
    for (const a of /** @type {any[]} */ (attempts)) {
      if (
        a &&
        typeof a.resumed_from === 'string' &&
        a.resumed_from.length > 0
      ) {
        resumed_from_ids.add(a.resumed_from);
      }
    }
    /** @type {any[]} */
    const running = [];
    /** @type {any|null} */
    let latest_failed = null;
    for (const a of /** @type {any[]} */ (attempts)) {
      // A paused attempt that was already resumed is history: its child is the
      // live one, so only a LEAF paused attempt renders a tile (§1.1).
      const leaf_paused =
        a.status === 'paused' && !resumed_from_ids.has(a.attempt_id);
      if (a.status === 'running' || leaf_paused) {
        running.push({
          bead_id: a.bead_id,
          attempt_id: a.attempt_id,
          title: idToTitle.get(a.bead_id) || a.bead_id,
          runner: a.runner || null,
          model: a.model || null,
          effort: a.effort || null,
          started_at: typeof a.started_at === 'number' ? a.started_at : null,
          resumed_from: a.resumed_from || null,
          paused: leaf_paused,
          can_pause: typeof a.session_id === 'string' && a.session_id.length > 0
        });
      } else if (a.status === 'failed' || a.status === 'orphaned') {
        // Only a real failure surfaces the banner — a user pause/discard is not
        // a failure and never renders one (worker-phase1 §1).
        latest_failed = a;
      }
    }
    // The banner's ↻ targets EXACTLY the attempt the banner describes — the
    // latest failure. An older eligible attempt is never substituted (that
    // would resume a different session than the one reported); ineligibility
    // renders the button disabled with the reason in its title (spec §1.5).
    /** @type {any|null} */
    let failure = null;
    if (latest_failed) {
      const has_sid =
        typeof latest_failed.session_id === 'string' &&
        latest_failed.session_id.length > 0;
      const already = resumed_from_ids.has(latest_failed.attempt_id);
      failure = {
        repo: latest_failed.repo || '',
        reason: latest_failed.cause || latest_failed.status,
        resume_attempt_id: latest_failed.attempt_id,
        resume_eligible: has_sid && !already,
        resume_reason: !has_sid
          ? 'session_id 없는 구 attempt — 이어하기 불가'
          : already
            ? '이미 이어받은 attempt (child attempt 존재) — 이어하기 불가'
            : null
      };
    }

    /** @type {Set<string>} */
    const active_bead_ids = new Set(running.map((r) => r.bead_id));

    // A manual ▶ may push live sessions past the dispatch cap on purpose (§2.3)
    // — surface it rather than blocking the resume. There is ONE cap now
    // (worker-phase2 §3), so the live total is compared against it directly.
    const live = running.filter((r) => !r.paused);
    const live_count = live.length;
    const info_slots = (q.workspace_info || {}).slots;
    const slots =
      typeof info_slots === 'number'
        ? info_slots
        : typeof q.slots === 'number'
          ? q.slots
          : MIN_SLOTS;
    const over_cap = live_count > slots;

    return {
      queue: q,
      idToTitle,
      candidates,
      running,
      live_count,
      slots,
      over_cap,
      failure,
      // 실행 중(leaf paused 포함) attempt가 있는 bead는 attempt가 끝날 때까지
      // 큐 항목이 남지만, 대기 컬럼에 같이 그리면 두 컬럼 동시 표시가 되므로
      // 실행 중 컬럼에만 보여준다.
      waiting: toRows(
        queue_entries.filter(
          (/** @type {any} */ e) => !active_bead_ids.has(e.bead_id)
        ),
        'queue'
      ),
      // PR 대기 is its own column (worker-phase2 §7): a bead there is NOT done —
      // the PR is open and waiting for the human merge click. 완료 carries only
      // what actually merged and finished cleanup.
      pr_wait: pr_wait_entries.map((/** @type {any} */ e) =>
        prWaitRow(
          e.bead_id,
          idToTitle.get(e.bead_id) || e.bead_id,
          pr_obs,
          cleanup_failed[e.bead_id] || null
        )
      ),
      done: toRows(q.done, 'done'),
      cleanup_failures
    };
  }

  /**
   * @param {ReturnType<typeof buildModel>} m
   * @returns {import('lit-html').TemplateResult}
   */
  function topTemplate(m) {
    const next_head = m.waiting.length > 0 ? m.waiting[0].id : '—';
    return html`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${m.queue.auto_advance ? ' is-active' : ''}"
        >
          ${m.queue.auto_advance ? '⏸ 일시정지' : '▶ 자동 진행'}
        </button>
        <span class="worker-stat"
          >실행 <b>${m.live_count}</b> · 다음 <b>${next_head}</b></span
        >
        ${m.over_cap
          ? html`<span
              class="worker-overcap"
              title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
              >cap 초과</span
            >`
          : ''}
        <label class="worker-tgl worker-slots"
          >동시 실행
          <input
            type="number"
            class="worker-slots__input"
            min=${MIN_SLOTS}
            step="1"
            .value=${String(m.slots)}
            title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
        /></label>
        <button
          type="button"
          class="worker-exec-defaults-btn"
          aria-haspopup="dialog"
          aria-label="전역 실행 설정"
          title="전역 실행 설정"
        >
          ⚙
        </button>
      </div>
      ${bannersTemplate({
        failure: m.failure,
        cleanupFailures: m.cleanup_failures
      })}`;
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
        id: 'worker-pane-queue',
        lane: 'queue',
        title: '대기',
        items: m.waiting,
        empty: '드래그로 배치'
      })}
      ${paneTemplate({
        id: 'worker-pane-running',
        lane: 'running',
        title: `실행 중 · 슬롯 ${m.slots}`,
        items: m.running,
        body: runningGridTemplate(m.running, Date.now(), selected_attempt)
      })}
      ${paneTemplate({
        id: 'worker-pane-pr-wait',
        lane: 'pr_wait',
        title: 'PR 대기',
        items: m.pr_wait,
        empty: 'PR 대기 없음'
      })}
      ${paneTemplate({
        id: 'worker-pane-done',
        lane: 'done',
        title: `완료 · 오늘 ${m.done.length}`,
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
    // Only the two panes a drop actually mutates accept one. 실행 중/PR 대기/완료
    // are observation columns — the server puts beads there — so they must not
    // light up as drop targets and then silently swallow the drag.
    const lane = pane.dataset.lane || '';
    if (lane !== 'candidate' && lane !== 'queue') {
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
      if (from_lane === 'queue') {
        void removeBead(bead_id);
      }
      return;
    }
    if (to_lane === 'queue') {
      if (from_lane === 'queue') {
        void reorderBead(bead_id, index);
      } else {
        void placeBead(bead_id, index);
      }
    }
  }

  /**
   * Commit a slot-count edit (worker-phase2 §3). Fired on `change` so a partial
   * keystroke does not spam mutations; the value is clamped to the lower bound
   * before it is sent and the input is re-rendered from the authoritative
   * snapshot.
   *
   * @param {Event} ev
   */
  function onChange(ev) {
    const input = /** @type {HTMLInputElement|null} */ (
      /** @type {HTMLElement} */ (ev.target)?.closest?.('.worker-slots__input')
    );
    if (!input) {
      return;
    }
    const parsed = Number.parseInt(input.value, 10);
    if (!Number.isFinite(parsed)) {
      doRender();
      return;
    }
    void setSlots(parsed).then(doRender);
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
    // The failure banner's ↻ resumes the newest eligible failed attempt (§1).
    const resumeBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-banner__resume')
    );
    if (resumeBtn) {
      const att = resumeBtn.dataset.attemptId;
      if (att) {
        void resumeAttempt(att);
      }
      return;
    }
    if (target?.closest?.('.worker-play')) {
      void setAutoAdvance(!currentQueue().auto_advance);
      return;
    }
    // PR-wait actions act on the bead and must never also open the detail panel
    // (the `.worker-mini` default below would otherwise swallow them).
    const mergeBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__merge')
    );
    if (mergeBtn) {
      void mergePr(mergeBtn.dataset.beadId || '');
      return;
    }
    const rerunBtn = /** @type {HTMLElement|null} */ (
      target?.closest?.('.worker-mini__rerun')
    );
    if (rerunBtn) {
      void rerunPr(rerunBtn.dataset.beadId || '');
      return;
    }
    // The PR link is a link — let the browser open it, never treat it as a row
    // click.
    if (target?.closest?.('.worker-mini__pr')) {
      return;
    }
    // Tile controls act on the attempt and must never also open the drawer.
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
    if (target?.closest?.('.rtile__pause')) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const att = tile?.dataset?.attemptId;
      if (att) {
        void pauseAttempt(att);
      }
      return;
    }
    if (target?.closest?.('.rtile__resume')) {
      const tile = /** @type {HTMLElement|null} */ (
        target?.closest?.('.rtile')
      );
      const att = tile?.dataset?.attemptId;
      if (att) {
        void resumeAttempt(att);
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
  mount_element.addEventListener('change', /** @type {any} */ (onChange));

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
      mount_element.removeEventListener(
        'change',
        /** @type {any} */ (onChange)
      );
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
