import { render } from 'lit-html';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { createExecPresetStore } from './data/exec-preset-store.js';
import { createSessionLogStore } from './data/session-log-store.js';
import { createSubscriptionIssueStore } from './data/subscription-issue-store.js';
import { createSubscriptionIssueStores } from './data/subscription-issue-stores.js';
import { createWorkerQueueStore } from './data/worker-queue-store.js';
import { createDetailPanel } from './views/detail-panel/index.js';
import { createMdViewer } from './views/detail-panel/md-viewer.js';
import { createMonitorView } from './views/monitor/index.js';
import { createUsageMeter } from './views/usage-meter.js';
import { createWorkerView } from './views/worker/index.js';
import { candidateCard, miniRow, queueRowOps } from './views/worker/lanes.js';
import { createRepoOpsScriptViewer } from './views/worker/repo-ops-script-viewer.js';
import {
  repoOpsTimelineTemplate,
  timelineView
} from './views/worker/repo-ops-timeline.js';
import { runningGridTemplate } from './views/worker/running-grid.js';
import { createTranscriptDrawer } from './views/worker/transcript-drawer.js';
import { createWorkspacePicker } from './views/workspace-picker.js';

/**
 * Design-system guards (UI-kqta §3.4). The rules themselves live in
 * `docs/design-system.md`; these checks keep them from drifting.
 */

/** @param {string} rel */
function readCss(rel) {
  return readFileSync(path.resolve(process.cwd(), rel), 'utf8');
}

const STYLES = readCss('app/styles.css');
const BASE = readCss('app/styles/base.css');
const COMPONENTS = readCss('app/styles/components.css');

/** Properties whose value must come from the size scale (§3.4 check 1). */
const SIZE_PROPERTY =
  /^(height|min-height|font-size|border-radius|border-(top|bottom)-(left|right)-radius|padding|padding-(top|right|bottom|left|inline|block)(-(start|end))?)$/;

const RAW_COLOR = /#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?)\(/g;
/** In a size property any number directly followed by letters is a length
 * (`px`, `vmin`, `cqi`, …); `%`, unitless numbers and `0` are not. */
const RAW_LENGTH = /(?<![\w-])\d*\.?\d+[a-zA-Z]+/g;

/**
 * Every `prop: value` declaration of a stylesheet, comments removed. A
 * declaration ends at `;` or at the rule's closing `}` (the last one may omit
 * the semicolon) and may span lines; selectors never match because they are
 * followed by `{`.
 *
 * @param {string} css
 * @returns {Array<{ prop: string, value: string }>}
 */
function declarations(css) {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
  /** @type {Array<{ prop: string, value: string }>} */
  const out = [];
  for (const m of text.matchAll(
    /(^|[{;\s])(--[\w-]+|[a-z-]+)\s*:\s*([^;{}]+)(?:;|(?=}))/g
  )) {
    out.push({ prop: m[2], value: m[3].trim() });
  }
  return out;
}

/**
 * The value with every plain token reference (`var(--x)` without a fallback)
 * folded away, so whatever remains is literal.
 *
 * @param {string} value
 * @returns {string}
 */
function withoutTokens(value) {
  return value.replace(/var\(\s*--[\w-]+\s*\)/g, 'T');
}

/**
 * Raw colours of one declaration value. A `url(...)` payload (the select
 * arrow's inline SVG) is not a colour token surface.
 *
 * @param {string} value
 * @returns {string[]}
 */
function rawColors(value) {
  return value.replace(/url\([^)]*\)/g, '').match(RAW_COLOR) || [];
}

/**
 * Raw lengths of one size declaration: a number with a length unit outside a
 * plain token, or inside a token reference's literal fallback.
 *
 * @param {string} value
 * @returns {string[]}
 */
function rawLengths(value) {
  return withoutTokens(value).match(RAW_LENGTH) || [];
}

/**
 * The marked design-system regions of styles.css (`@ds-region <name>:begin` …
 * `:end`). The region list is documented in docs/design-system.md.
 *
 * @param {string} css
 * @returns {Array<{ name: string, body: string }>}
 */
function regions(css) {
  return [
    ...css.matchAll(
      /\/\*\s*@ds-region\s+([a-z-]+):begin\s*\*\/([\s\S]*?)\/\*\s*@ds-region\s+\1:end\s*\*\//g
    )
  ].map((m) => ({ name: m[1], body: m[2] }));
}

/**
 * Split a selector list on its top-level commas only — `:is(button, summary)`
 * is one selector.
 *
 * @param {string} list
 * @returns {string[]}
 */
function topLevelSplit(list) {
  /** @type {string[]} */
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === '(') {
      depth += 1;
    } else if (list[i] === ')') {
      depth -= 1;
    } else if (list[i] === ',' && depth === 0) {
      out.push(list.slice(start, i));
      start = i + 1;
    }
  }
  out.push(list.slice(start));
  return out;
}

/**
 * Raw colour and raw size findings of one stylesheet text.
 *
 * @param {string} css
 * @returns {string[]}
 */
function findings(css) {
  /** @type {string[]} */
  const out = [];
  for (const { prop, value } of declarations(css)) {
    for (const color of rawColors(value)) {
      out.push(`${prop}: ${value} (${color})`);
    }
    if (SIZE_PROPERTY.test(prop)) {
      for (const length of rawLengths(value)) {
        out.push(`${prop}: ${value} (${length})`);
      }
    }
  }
  return out;
}

describe('raw-value scanner', () => {
  test('flags a last declaration without a trailing semicolon', () => {
    const found = findings('.ui-chip { height: 27px }');

    expect(found).toEqual(['height: 27px (27px)']);
  });

  test('flags a length unit outside the common unit list', () => {
    const found = findings('.ui-chip { padding: 2vmin; }');

    expect(found).toEqual(['padding: 2vmin (2vmin)']);
  });

  test('allows zero, percentages and unitless token multipliers', () => {
    const found = findings(
      '.ui-chip { height: 0; border-radius: 50%; min-height: calc(var(--sp-12) * 5) }'
    );

    expect(found).toEqual([]);
  });
});

describe('design-system CSS rules (§3.4 check 1)', () => {
  test('marks the Worker, header, Monitor, detail and drawer regions', () => {
    const names = regions(STYLES).map((r) => r.name);

    expect(names.filter((name) => name === 'worker').length).toBeGreaterThan(0);
    expect(names).toContain('header');
    expect(names).toContain('monitor');
    expect(names).toContain('detail');
    expect(names).toContain('drawer');
  });

  test('pairs every region marker with an end marker', () => {
    const begins = STYLES.match(/@ds-region\s+[a-z-]+:begin/g) || [];
    const ends = STYLES.match(/@ds-region\s+[a-z-]+:end/g) || [];

    expect(begins.length).toBe(ends.length);
    expect(regions(STYLES).length).toBe(begins.length);
  });

  test('keeps components.css free of raw colours and raw sizes', () => {
    expect(findings(COMPONENTS)).toEqual([]);
  });

  test('keeps every marked region free of raw colours and raw sizes', () => {
    const found = regions(STYLES).flatMap((r) =>
      findings(r.body).map((f) => `${r.name}: ${f}`)
    );

    expect(found).toEqual([]);
  });

  test('styles only elements that carry a part class in components.css', () => {
    const selectors = COMPONENTS.replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/@media[^{]*{/g, '')
      .match(/[^{}]+(?={)/g)
      ?.flatMap((list) => topLevelSplit(list))
      .map((sel) => sel.trim())
      .filter(Boolean);

    expect(selectors?.length).toBeGreaterThan(0);
    expect(
      (selectors || []).filter(
        (sel) => !/\.(op-btn|ui-field|ui-input|ui-select|ui-chip)\b/.test(sel)
      )
    ).toEqual([]);
  });

  test('keeps the global select arrow room on the select part', () => {
    const select_rule =
      COMPONENTS.match(/\nselect\.ui-select\s*{([^}]*)}/)?.[1] || '';
    const global_select = STYLES.match(/\nselect\s*{([^}]*)}/)?.[1] || '';

    expect(global_select).toContain('padding-right: calc(var(--sp-12) * 2)');
    expect(select_rule).toContain(
      'padding: 0 calc(var(--sp-12) * 2) 0 var(--sp-6)'
    );
  });
});

/**
 * Ratchet (§3.4 check 2): raw colour literals in any declaration plus raw
 * lengths (any number with a unit) in size declarations, over every stylesheet
 * outside tokens.css. UI-kqta lowered it from 470 (base d24f47a1: 194 colours +
 * 276 sizes) to 428 (194 + 234); the UI-k5s2 tokens unit moved the legacy
 * palette into tokens.css and tokenized the legacy shared CSS and base.css,
 * taking it to 62 (11 + 51, all in styles.css below the `.op-btn` heading); the
 * monitor unit moved the Monitor tab, header and usage meter onto the parts,
 * taking it to 57 (10 + 47); the detail unit moved the issue detail panel, the
 * transcript and repo-ops drawers, the script viewer and the Worker popovers,
 * taking it to 12 (3 + 9). All counted with this scanner; UI-k5s2 takes it to
 * 0. Lower the number when a change removes raw values — never raise it.
 */
const RATCHET_BASELINE = 12;

describe('design-system ratchet (§3.4 check 2)', () => {
  test('keeps raw colours and raw sizes outside tokens.css at or under the baseline', () => {
    const count = [STYLES, BASE, COMPONENTS]
      .map((css) => findings(css).length)
      .reduce((a, b) => a + b, 0);

    expect(count).toBeLessThanOrEqual(RATCHET_BASELINE);
  });
});

/**
 * Overlay surfaces inside the Worker tab that a later UI-k5s2 unit moves —
 * dialogs and the repo-ops settings disclosure. The popovers, the place menu,
 * the drawers and the script viewer moved with the detail unit.
 */
const OVERLAY_SELECTOR = ['dialog', '.worker-repo-ops-settings'].join(', ');

const PART_CLASSES = ['op-btn', 'ui-input', 'ui-select', 'ui-chip'];

/** Native-size controls with no part (docs/design-system.md §2·§4). */
const NATIVE_CONTROL = 'input[type=checkbox], input[type=radio]';

/**
 * Controls of a rendered surface that carry no part class. Checkboxes and
 * radios keep their native size and have no part, so they are not counted. A
 * control inside a `.ui-field` is sized by the field, and one inside a
 * `.ui-chip` is that chip's own label or `✕` — the chip part sizes it.
 *
 * @param {ParentNode} root
 * @returns {string[]}
 */
function controlsWithoutPart(root) {
  return Array.from(root.querySelectorAll('button, input, select'))
    .filter((el) => !el.closest(OVERLAY_SELECTOR))
    .filter((el) => !el.matches(NATIVE_CONTROL))
    .filter(
      (el) =>
        !PART_CLASSES.some((cls) => el.classList.contains(cls)) &&
        !el.closest('.ui-field') &&
        !el.parentElement?.closest('.ui-chip')
    )
    .map(
      (el) =>
        `${el.tagName.toLowerCase()}.${el.className || '(no class)'} ${el.textContent?.trim().slice(0, 20) || ''}`
    );
}

const RECEIPT = 'codex@' + 'a'.repeat(40);

function issueStores() {
  /** @type {Map<string, any>} */
  const stores = new Map();
  /** @param {string} id */
  function getStore(id) {
    let store = stores.get(id);
    if (!store) {
      store = createSubscriptionIssueStore(id);
      stores.set(id, store);
    }
    return store;
  }
  const now = Date.now();
  /**
   * @param {string} key
   * @param {any[]} issues
   */
  const seed = (key, issues) =>
    getStore(key).applyPush({ type: 'snapshot', id: key, revision: 1, issues });
  seed('tab:worker:ready', [
    {
      id: 'RD-1',
      title: 'ready with spec',
      status: 'open',
      priority: 1,
      updated_at: now,
      spec_id: 'SPEC-1',
      labels: ['ui'],
      metadata: { route: 'spec_backed', spec_review: RECEIPT }
    },
    {
      id: 'RD-2',
      title: 'ready quick fix',
      status: 'open',
      priority: 2,
      updated_at: now,
      metadata: { route: 'quick_fix' }
    }
  ]);
  seed('tab:worker:blocked', [
    {
      id: 'BL-1',
      title: 'blocked',
      status: 'open',
      priority: 2,
      updated_at: now,
      dependencies: ['DEP-1'],
      metadata: { route: 'spec_backed', spec_review: RECEIPT }
    }
  ]);
  return {
    getStore,
    /** @param {string} id */
    snapshotFor(id) {
      return getStore(id).snapshot().slice();
    },
    subscribe() {
      return () => {};
    }
  };
}

/**
 * A queue that lights up the toolbar, KPI, filters, every lane head and the
 * three card renderers: waiting rows (parallel + serial), a running, a failed
 * and a waiting tile, a PR-wait row and a done row.
 *
 * @returns {any}
 */
function richQueue() {
  const now = Date.now();
  return {
    revision: 1,
    auto_advance: true,
    slots: 2,
    serial_lane_count: 2,
    serial_lanes: [
      { id: 's1', entries: [{ bead_id: 'S1-1', added_at: 1 }] },
      { id: 's2', entries: [] }
    ],
    queue: [
      { bead_id: 'Q1', added_at: now },
      { bead_id: 'Q2', added_at: 2 },
      { bead_id: 'R1', added_at: 3 }
    ],
    done: [{ bead_id: 'D1', added_at: now, outcome: 'merged' }],
    pr_wait: [{ bead_id: 'PR-1', added_at: 1 }],
    pr_observations: {
      'PR-1': {
        pr: {
          number: 304,
          url: 'https://github.com/o/r/pull/304',
          state: 'OPEN',
          head_sha: 'a'.repeat(40)
        },
        verify: null,
        error: null,
        observed_at: 1,
        gate: {
          enabled: true,
          tier: 'eligible',
          gate_badge: '머지 가능',
          base_badge: '최신',
          reason: null
        }
      }
    },
    attempts: {
      a1: {
        attempt_id: 'a1',
        bead_id: 'R1',
        status: 'running',
        runner: 'claude',
        model: 'opus',
        session_id: 'sid',
        started_at: now - 5000
      },
      a3: {
        attempt_id: 'a3',
        bead_id: 'X9',
        status: 'failed',
        repo: '/repo',
        cause: 'verify_failed:base_not_ancestor'
      },
      aw: {
        attempt_id: 'aw',
        bead_id: 'W1',
        status: 'waiting',
        started_at: 20,
        finished_at: 30,
        session_id: 'saved',
        cause: 'session_ended_unresolved'
      }
    },
    bead_titles: { Q1: 'q one', Q2: 'q two', 'S1-1': 's one', D1: 'done' }
  };
}

/**
 * Render the whole Worker tab body into a fresh mount.
 *
 * @param {boolean} mobile
 * @returns {HTMLElement}
 */
function renderWorkerTab(mobile) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: mobile
      ? () => ({
          matches: true,
          media: '(max-width: 640px)',
          addEventListener() {},
          removeEventListener() {}
        })
      : undefined
  });
  window.localStorage.setItem(
    'beads-ui.worker.lane-collapsed',
    JSON.stringify({ lanes: { done: false }, areas: {} })
  );
  window.localStorage.setItem(
    'beads-ui.worker.candidate-filter',
    JSON.stringify({ show_blocked: true, readiness: 'all' })
  );
  document.body.innerHTML = '<div id="m"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const queueStore = createWorkerQueueStore();
  queueStore.set(richQueue());
  createWorkerView(mount, {
    issueStores: issueStores(),
    queueStore,
    transport: vi.fn(async () => ({ ok: true })),
    getWorkspacePath: () => '/repo'
  });
  return mount;
}

/**
 * The failed discard projection whose retry, abandon and resolve exits are all
 * open — every action the tile and the row foot can draw at once.
 *
 * @returns {any}
 */
function failedDiscard() {
  return {
    action: true,
    enabled: true,
    label: '재시도',
    title: '폐기 실패',
    error: 'dirty_submodule',
    confirmation: 'unmerged',
    operation: { operation_id: 'op-1', phase: 'requested', kind: 'discard' },
    abandon: { action: true, label: '폐기 포기', title: '폐기 포기' }
  };
}

/**
 * Card renderer variants the queue fixture alone cannot reach: every row foot
 * action, every tile action and the candidate dependency chips.
 *
 * @returns {HTMLElement}
 */
function renderCardVariants() {
  document.body.innerHTML = '<div id="m"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  /** @type {any[]} */
  const rows = [
    {
      id: 'PR-1',
      title: 'pr row',
      lane: 'pr_wait',
      done: false,
      draggable: false,
      merge_action: true,
      merge_enabled: true,
      shelve_action: 'shelve',
      shelve_enabled: true,
      discard_action: true,
      resolve_action: true,
      handoff_action: true
    },
    {
      id: 'PR-2',
      title: 'merging row',
      lane: 'pr_wait',
      done: false,
      draggable: false,
      cancel_action: true,
      discard: failedDiscard()
    },
    {
      id: 'Q-1',
      title: 'parked row',
      lane: 'queue',
      done: false,
      draggable: true,
      revise_action: true,
      revise_enabled: true,
      dependency_chips: {
        predecessors: [{ id: 'UI-p', label: '⛓ UI-p', openable: true }],
        dependents: [{ id: 'UI-d', label: '→ UI-d', openable: true }],
        released: [{ id: 'UI-r', label: '🔓 UI-r' }],
        scope_missing: true
      }
    }
  ];
  /** @type {any[]} */
  const tiles = [
    {
      bead_id: 'T-1',
      attempt_id: 'a1',
      title: 'running',
      runner: 'claude',
      model: 'opus',
      started_at: 1000,
      can_pause: true
    },
    {
      bead_id: 'T-2',
      attempt_id: 'a2',
      title: 'paused',
      runner: 'claude',
      model: 'opus',
      started_at: 1000,
      paused: true
    },
    {
      bead_id: 'T-3',
      attempt_id: 'a3',
      title: 'failed',
      runner: 'claude',
      model: 'opus',
      started_at: 1,
      failed: true,
      status: 'failed',
      status_label: '실패',
      failure: {
        cause: 'runner_exit',
        attempt_id: 'a3',
        resume_eligible: true
      },
      discard: failedDiscard(),
      resolve_action: true,
      resolve_enabled: true
    }
  ];
  render(
    [
      ...rows.map((row) => miniRow(row, { actions: queueRowOps(row) })),
      runningGridTemplate(tiles),
      candidateCard(
        /** @type {any} */ ({
          id: 'C-1',
          title: 'candidate',
          draggable: false,
          queue_placeable: true,
          lane: 'candidate',
          reason: '',
          dependency_chips: {
            predecessors: [{ id: 'UI-p', label: '⛓ UI-p', openable: true }]
          },
          workflow: {
            route: 'quick_fix',
            route_source: 'explicit',
            stages: {
              impl: { fill: 'none', glyph: null, stale: false },
              close: { fill: 'none', glyph: null, stale: false }
            }
          }
        })
      )
    ],
    mount
  );
  return mount;
}

describe('Worker tab controls use parts (§3.4 check 3)', () => {
  afterEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: undefined
    });
  });

  test('draws every desktop Worker tab control with a part', () => {
    const mount = renderWorkerTab(false);

    const controls = mount.querySelectorAll('button, input, select');

    expect(controls.length).toBeGreaterThan(20);
    expect(controlsWithoutPart(mount)).toEqual([]);
  });

  test('draws every mobile Worker tab control with a part', () => {
    const mount = renderWorkerTab(true);

    const controls = mount.querySelectorAll('button, input, select');

    expect(controls.length).toBeGreaterThan(20);
    expect(controlsWithoutPart(mount)).toEqual([]);
  });

  test('draws every card renderer action and chip button with a part', () => {
    const mount = renderCardVariants();

    const controls = mount.querySelectorAll('button');

    expect(controls.length).toBeGreaterThan(15);
    expect(controlsWithoutPart(mount)).toEqual([]);
  });

  test('keeps chip buttons on the chip part rather than the button part', () => {
    const mount = renderCardVariants();

    const chips = Array.from(
      mount.querySelectorAll('button.ctl-chip, button.worker-dep')
    );

    expect(chips.length).toBeGreaterThan(0);
    expect(chips.every((el) => el.classList.contains('ui-chip'))).toBe(true);
    expect(chips.some((el) => el.classList.contains('op-btn'))).toBe(false);
  });
});

/**
 * Two repositories that light up the Monitor deck (tiles, switches, totals),
 * every lane head, the candidate sections and filter, both wait areas with a
 * serial lane, a running and a failed tile, a PR-wait row and a done row.
 *
 * @param {number} now
 * @returns {Array<Record<string, any>>}
 */
function monitorWorkspaces(now) {
  return [
    {
      root_dir: '/repo-a',
      name: 'repo-a',
      revision: 1,
      queue: [{ bead_id: 'A-q', added_at: now }],
      serial_lane_count: 2,
      serial_lanes: [{ id: 's1', entries: [{ bead_id: 'A-s', added_at: 1 }] }],
      pr_wait: [{ bead_id: 'A-pr', added_at: 1 }],
      pr_observations: richQueue().pr_observations,
      done: [{ bead_id: 'A-d', added_at: now, outcome: 'merged' }],
      runnable: [
        {
          bead_id: 'A-1',
          title: 'candidate a',
          updated_at: now,
          blocked_by: [],
          metadata: { route: 'quick_fix' }
        }
      ],
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'A-r',
          status: 'running',
          runner: 'claude',
          model: 'opus',
          started_at: now - 5000
        },
        a2: {
          attempt_id: 'a2',
          bead_id: 'A-f',
          status: 'failed',
          cause: 'runner_exit',
          started_at: 1,
          finished_at: 2
        }
      },
      bead_titles: { 'A-q': 'queued', 'A-s': 'serial', 'A-d': 'done' },
      wait_reasons: [
        {
          kind: 'prerequisite',
          subject: { root_dir: '/repo-a', bead_id: 'A-q' },
          headline: 'A-2 완료를 기다림',
          release: '재스캔으로 자동 복귀',
          verdict: 'normal',
          targets: [{ id: 'A-2', kind: 'issue' }],
          actions: []
        }
      ]
    },
    {
      root_dir: '/repo-b',
      name: 'repo-b',
      revision: 1,
      queue: [],
      serial_lanes: [],
      pr_wait: [],
      done: [],
      runnable: [
        {
          bead_id: 'B-1',
          title: 'candidate b',
          updated_at: now,
          blocked_by: []
        }
      ],
      attempts: {},
      pr_observations: {},
      bead_titles: {}
    }
  ];
}

/**
 * Point `window.matchMedia` at the mobile query or remove it (desktop).
 *
 * @param {boolean} mobile
 */
function stubMatchMedia(mobile) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: mobile
      ? () => ({
          matches: true,
          media: '(max-width: 640px)',
          addEventListener() {},
          removeEventListener() {}
        })
      : undefined
  });
}

/** @type {Array<{ clear: () => void }>} */
const monitor_views = [];

/**
 * Render the whole Monitor tab body — deck, lanes and their heads — into a
 * fresh mount.
 *
 * @param {boolean} mobile
 * @returns {HTMLElement}
 */
function renderMonitorTab(mobile) {
  stubMatchMedia(mobile);
  window.localStorage.setItem(
    'beads-ui.monitor.lane-collapsed',
    JSON.stringify({ lanes: { done: false }, areas: {} })
  );
  document.body.innerHTML = '<div id="m"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const now = Date.now();
  const workspaces = monitorWorkspaces(now);
  const states = workspaces.map((ws) => ({
    root_dir: ws.root_dir,
    name: ws.name,
    auto_advance: ws.root_dir === '/repo-a',
    auto_merge: false,
    slots: 2,
    revision: 1,
    issue_prefix: ws.name === 'repo-a' ? 'A' : 'B',
    counts: { running: 1, pr_wait: 1, queue: 2, session_active: 0 }
  }));
  const view = createMonitorView(mount, {
    gotoIssue: vi.fn(),
    transport: vi.fn(async () => null),
    router: { gotoView: vi.fn() },
    pipelineStore: /** @type {any} */ ({
      get: () => workspaces,
      getWorkspacesState: () => states,
      crossLanes: () => null,
      subscribe: () => () => {}
    }),
    getWorkspacePath: () => '/repo-a',
    switchWorkspace: vi.fn(() => Promise.resolve(null)),
    confirm: vi.fn(() => true),
    now: () => now
  });
  monitor_views.push(view);
  view.load();
  return mount;
}

describe('Monitor tab controls use parts (§3.4 check 3)', () => {
  afterEach(() => {
    while (monitor_views.length > 0) {
      monitor_views.pop()?.clear();
    }
    window.localStorage.clear();
    stubMatchMedia(false);
  });

  test('draws every desktop Monitor tab control with a part', () => {
    const mount = renderMonitorTab(false);

    const controls = mount.querySelectorAll('button, input, select');

    expect(controls.length).toBeGreaterThan(20);
    expect(controlsWithoutPart(mount)).toEqual([]);
  });

  test('draws every mobile Monitor tab control with a part', () => {
    const mount = renderMonitorTab(true);

    const controls = mount.querySelectorAll('button, input, select');

    expect(controls.length).toBeGreaterThan(15);
    expect(controlsWithoutPart(mount)).toEqual([]);
  });
});

describe('part check helper (§3.4 check 3)', () => {
  test('leaves native checkboxes and radios out of the part check', () => {
    document.body.innerHTML =
      '<input type="checkbox" /><input type="radio" /><input type="text" class="x" />';

    const missing = controlsWithoutPart(document.body);

    expect(missing).toEqual(['input.x ']);
  });

  test('counts a button inside a chip as part of that chip', () => {
    document.body.innerHTML =
      '<span class="ui-chip">ui<button class="x">×</button></span><button class="y">✕</button>';

    const missing = controlsWithoutPart(document.body);

    expect(missing).toEqual(['button.y ✕']);
  });
});

/** The `<header class="app-header">` markup of app/index.html. */
const HEADER_HTML =
  readFileSync(path.resolve(process.cwd(), 'app/index.html'), 'utf8').match(
    /<header class="app-header">[\s\S]*?<\/header>/
  )?.[0] || '';

/**
 * Serve the Claude usage with three managed accounts (one active) and answer
 * an account switch with `account_in_use`, so the card can show `[전환]` and
 * the `[그래도 전환]`·`[취소]` confirmation at once.
 */
function stubUsageFetch() {
  const resets_at = new Date(Date.now() + 60 * 60_000).toISOString();
  const usage = {
    available: true,
    email: 'one@example.com',
    windows: [{ key: '5h', pct: 10, resetsAt: resets_at }],
    fetchedAt: new Date().toISOString(),
    ageSeconds: 30,
    accounts: [1, 2, 3].map((number) => ({
      number,
      email: `user${number}@example.com`,
      alias: null,
      plan: 'max',
      active: number === 1,
      status: 'ok',
      windows: [],
      fetchedAt: null,
      ageSeconds: null
    }))
  };
  vi.stubGlobal(
    'fetch',
    vi.fn((/** @type {string} */ url) =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(
            url === '/api/claude-usage'
              ? usage
              : url === '/api/claude-account/switch'
                ? { ok: false, error: 'account_in_use', in_use: ['UI-one'] }
                : { available: false }
          )
      })
    )
  );
}

/** @type {Array<{ destroy: () => void }>} */
const header_parts = [];

/**
 * Mount the app header the way `main.js` does: the index.html markup, the
 * workspace picker (several visible workspaces, so the select is drawn) and
 * the usage meter (managed accounts, so each provider group is a toggle).
 *
 * @returns {Promise<HTMLElement>}
 */
async function renderHeader() {
  stubUsageFetch();
  document.body.innerHTML = HEADER_HTML;
  const header = /** @type {HTMLElement} */ (
    document.querySelector('.app-header')
  );
  const state = {
    view: 'worker',
    workspace: {
      current: { path: '/repo-a' },
      available: [{ path: '/repo-a' }, { path: '/repo-b' }],
      hidden: []
    }
  };
  header_parts.push(
    createWorkspacePicker(
      /** @type {HTMLElement} */ (document.getElementById('workspace-picker')),
      { getState: () => state, subscribe: () => () => {} },
      async () => {}
    ),
    createUsageMeter(
      /** @type {HTMLElement} */ (document.getElementById('usage-meter'))
    )
  );
  await vi.waitFor(() =>
    expect(header.querySelector('.usage-meter__toggle')).not.toBeNull()
  );
  return header;
}

describe('header controls use parts (§3.4 check 3)', () => {
  afterEach(() => {
    while (header_parts.length > 0) {
      header_parts.pop()?.destroy();
    }
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  test('draws every header control with a part', async () => {
    const header = await renderHeader();

    const controls = header.querySelectorAll('button, input, select');

    expect(controls.length).toBeGreaterThan(6);
    expect(controlsWithoutPart(header)).toEqual([]);
  });

  test('draws the project popover and the usage card controls with a part', async () => {
    const header = await renderHeader();
    /** @type {HTMLButtonElement} */ (
      header.querySelector('.workspace-picker__manage-button')
    ).click();
    /** @type {HTMLButtonElement} */ (
      header.querySelector('.usage-meter__toggle')
    ).click();
    await vi.waitFor(() =>
      expect(document.querySelector('.usage-meter__switch')).not.toBeNull()
    );

    /** @type {HTMLButtonElement} */ (
      document.querySelector('.usage-meter__switch')
    ).click();
    await vi.waitFor(() =>
      expect(document.querySelector('.usage-meter__confirm')).not.toBeNull()
    );

    expect(
      document.querySelectorAll('.usage-meter__switch').length
    ).toBeGreaterThan(2);
    expect(
      document.querySelectorAll('.workspace-picker__manage-checkbox').length
    ).toBe(2);
    expect(controlsWithoutPart(document.body)).toEqual([]);
  });
});

/** Let the panel's transport replies (comments, defaults, accounts) land. */
async function settle() {
  for (let i = 0; i < 8; i++) {
    await Promise.resolve();
  }
}

const REPORT_TEXT = [
  '## 🤖 작업 보고서',
  '> worker · attempt 1785076768091-1 · 2026-08-04T09:12:33Z',
  '',
  '**결론** — 머지 가능. 검증 전부 통과.',
  '',
  '### 진행 경과',
  '',
  '이어받아 마감했다.'
].join('\n');

/** @type {Array<{ destroy: () => void }>} */
const detail_parts = [];

/**
 * Open the issue detail panel the way `#/worker?issue=<id>` does, over a
 * fixture that lights up every section: the bar with `[↴ 대기로]` and its lane
 * menu, the plan chip popover, the gate stepper, the effective settings card
 * (expanded) with a preset, both inline editors, labels, the dependency
 * editor with its candidate list, artifacts, the task prompt toggle, session
 * history and the comment cards with the compose box.
 *
 * @returns {Promise<HTMLElement>}
 */
async function renderDetailPanel() {
  document.body.innerHTML = '<div id="m"></div>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const issueStores = createSubscriptionIssueStores();
  const queueStore = createWorkerQueueStore();
  queueStore.set(
    /** @type {any} */ ({
      revision: 7,
      auto_advance: false,
      auto_merge: false,
      slots: 2,
      queue: [],
      serial_lane_count: 2,
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: [{ bead_id: 'UI-p1', added_at: 1 }] }
      ],
      pr_wait: [],
      done: [],
      attempts: {
        a7: {
          attempt_id: 'a7',
          bead_id: 'UI-p2',
          status: 'done',
          runner: 'claude',
          model: 'opus',
          session_id: 'sid-7',
          started_at: Date.now() - 60000,
          finished_at: Date.now() - 1000,
          usage: { input_tokens: 10, output_tokens: 2 },
          delegation_sessions: [
            {
              launch_id: 'launch-done',
              provider: 'codex',
              role: 'implementation',
              model: 'gpt-5.6-sol',
              session_id: 'session-done',
              turn_id: 'turn-1',
              status: 'done',
              started_at: 100,
              completed_at: '2026-08-18T04:27:00.000Z',
              last_event_at: 200
            }
          ]
        }
      }
    })
  );
  const execPresetStore = createExecPresetStore();
  execPresetStore.set({
    revision: 1,
    presets: [{ id: 'p1', name: '프리셋', settings: {}, compatible: true }]
  });
  const comments = [
    { id: 'c1', author: 'worker', text: REPORT_TEXT, created_at: 1 },
    { id: 'c2', author: 'ilsun yun', text: '사람 댓글', created_at: 2 }
  ];
  /** @type {Record<string, any>} */
  const replies = {
    'get-comments': comments,
    'get-session-refs': {
      bead_id: 'UI-p2',
      sessions: [
        {
          index: 0,
          provider: 'claude',
          session_id: 'a1b2c3d4-5e6f',
          host: 'mac-studio',
          current: true,
          locality: 'local',
          last_event_at: 1_700_000_000_000,
          resume_command: "claude --resume 'a1b2c3d4-5e6f'"
        }
      ]
    },
    'get-bead-timeline': {
      events: Array.from({ length: 12 }, (_, i) => ({
        at: 1000 + i,
        summary: `event ${i}`
      }))
    }
  };
  const transport = vi.fn(
    async (/** @type {string} */ type) =>
      replies[type] || { values: {}, warnings: [] }
  );
  const panel = createDetailPanel(mount, {
    issueStores,
    queueStore,
    execPresetStore,
    sessionLogStore: createSessionLogStore(),
    transport: /** @type {any} */ (transport),
    getWorkspacePath: () => '/repo',
    pipelineStore: {
      get: () => [
        {
          root_dir: '/repo',
          external_waits: [
            {
              wait_id: 'w-0123456789ab',
              root_dir: '/repo',
              bead_id: 'UI-p2',
              owner_kind: 'worker',
              stage: 'detached',
              budget: { turns_total: 3, turns_used: 3 },
              registered_at: '2026-09-21T00:00:00Z',
              next_observation_at: '2026-09-21T03:14:00Z',
              error_count: 0,
              last_error: null,
              jobs: [
                {
                  adapter: 'slurm',
                  ssh_host: 'wallace',
                  job_id: '42',
                  submitted_at: '2026-09-21T00:00:00Z',
                  log_path: '/logs/job.log',
                  state: 'RUNNING',
                  observed_at: '2026-09-21T03:12:00Z',
                  terminal: null
                }
              ],
              completion: null,
              resume: null
            }
          ],
          wait_reasons: [
            {
              kind: 'external_job',
              subject: { root_dir: '/repo', bead_id: 'UI-p2' },
              headline: 'wallace 작업 42 · RUNNING',
              release: '완료되면 같은 세션을 이어간다',
              verdict: 'normal',
              targets: [],
              actions: [
                {
                  op: 'external_wait_check',
                  label: '[지금 확인]',
                  title: '관찰을 지금 한 번 더 한다',
                  payload: { root_dir: '/repo', wait_id: 'w-0123456789ab' }
                }
              ]
            }
          ]
        }
      ]
    },
    onNavigate: vi.fn(),
    depCandidates: () => ({
      issues: [
        {
          bead_id: 'UI-c1',
          root_dir: '/repo',
          workspace_name: 'repo',
          title: 'candidate',
          lane: 'runnable'
        }
      ],
      blocked_by_map: new Map()
    }),
    onClose: vi.fn()
  });
  detail_parts.push(panel);
  issueStores.register('detail:UI-p2', {
    type: 'issue-detail',
    params: { id: 'UI-p2' }
  });
  issueStores.getStore('detail:UI-p2')?.applyPush({
    type: 'snapshot',
    id: 'detail:UI-p2',
    revision: 1,
    issues: /** @type {any} */ ([
      {
        id: 'UI-p2',
        title: 'phase 2-3',
        status: 'open',
        priority: 1,
        description: '설명 본문',
        notes: 'spec_review: codex@' + 'a'.repeat(40),
        labels: ['ui'],
        spec_id: 'docs/specs/x.md',
        comment_count: 2,
        created_at: 1,
        updated_at: 2,
        dependencies: [{ id: 'UI-p1', dependency_type: 'blocks' }],
        dependents: [{ id: 'UI-p3', dependency_type: 'blocks' }],
        metadata: {
          route: 'spec_backed',
          spec_review: RECEIPT,
          session_ref: 'claude:a1b2c3d4-5e6f@mac-studio'
        },
        workflow: {
          route: 'spec_backed',
          route_source: 'explicit',
          stages: {
            spec: {
              fill: 'done',
              glyph: null,
              stale: false,
              doc: { path: 'docs/specs/x.md' }
            },
            plan: {
              fill: 'none',
              glyph: null,
              stale: false,
              doc: { path: 'docs/plans/x.md', missing_state: 'spec_draft' }
            }
          }
        },
        plan_group: {
          plan_path: 'docs/superpowers/plans/2026-09-29-plan-landing.md',
          slug: 'plan-landing',
          index: 2,
          total: 3,
          members: [
            { id: 'UI-p1', anchor: 'Phase 1', status: 'open', blocked_by: [] },
            {
              id: 'UI-p2',
              anchor: 'Phase 2-3',
              status: 'open',
              blocked_by: ['UI-p1']
            }
          ]
        }
      }
    ])
  });
  panel.load('UI-p2');
  await settle();
  /** @param {string} selector */
  const click = (selector) =>
    /** @type {HTMLElement} */ (mount.querySelector(selector)).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
  click('[data-seam="effective-settings-toggle"]');
  click('.detail-report__head');
  click('.detail-session__usage-toggle');
  /** @type {HTMLElement} */ (
    mount.querySelector('.detail-dep-add__input')
  ).dispatchEvent(new FocusEvent('focus', { bubbles: true }));
  await settle();
  return mount;
}

/**
 * Click one element of a rendered surface the way a pointer does.
 *
 * @param {ParentNode} root
 * @param {string} selector
 */
function clickOn(root, selector) {
  /** @type {HTMLElement} */ (root.querySelector(selector)).dispatchEvent(
    new MouseEvent('click', { bubbles: true })
  );
}

describe('issue detail panel controls use parts (§3.4 check 3)', () => {
  afterEach(() => {
    while (detail_parts.length > 0) {
      detail_parts.pop()?.destroy();
    }
    document.body.innerHTML = '';
  });

  test('draws every detail panel control with a part', async () => {
    const mount = await renderDetailPanel();

    const controls = mount.querySelectorAll('button, input, select');

    expect(mount.querySelector('.detail-dep-add__cand')).not.toBeNull();
    expect(mount.querySelector('button.detail-session__leg')).not.toBeNull();
    expect(mount.querySelector('.detail-external-wait__log')).not.toBeNull();
    expect(controls.length).toBeGreaterThan(30);
    expect(controlsWithoutPart(mount)).toEqual([]);
  });

  test('draws the title and description editors with a part', async () => {
    const mount = await renderDetailPanel();

    clickOn(mount, '.detail-edit-btn[data-edit="title"]');
    clickOn(mount, '.detail-edit-btn[data-edit="description"]');

    expect(mount.querySelector('input.detail-edit__input')).not.toBeNull();
    expect(mount.querySelectorAll('.detail-edit__save').length).toBe(2);
    expect(controlsWithoutPart(mount)).toEqual([]);
  });

  test('draws the lane menu of the detail bar with a part', async () => {
    const mount = await renderDetailPanel();

    clickOn(mount, '.detail-overlay__place');

    expect(
      mount.querySelectorAll('.place-menu .worker-card__place-lane').length
    ).toBeGreaterThan(1);
    expect(controlsWithoutPart(mount)).toEqual([]);
  });

  test('draws the plan chip popover controls with a part', async () => {
    const mount = await renderDetailPanel();

    clickOn(mount, '.detail-summary [data-chip-key="plan"]');

    expect(
      mount.querySelectorAll('.chip-popover button, .chip-popover select')
        .length
    ).toBeGreaterThan(2);
    expect(controlsWithoutPart(mount)).toEqual([]);
  });
});

describe('Worker tab overlays use parts (§3.4 check 3)', () => {
  afterEach(() => {
    window.localStorage.clear();
    stubMatchMedia(false);
    document.body.innerHTML = '';
  });

  test('draws the label filter popover with a part', () => {
    const mount = renderWorkerTab(false);

    clickOn(mount, '.worker-filter__labels-btn');

    expect(mount.querySelector('.worker-filter__labels-pop')).not.toBeNull();
    expect(controlsWithoutPart(mount)).toEqual([]);
  });

  test('draws the failure popover of a failed tile with a part', () => {
    const mount = renderWorkerTab(false);

    clickOn(mount, '.rtile__failure-badge');

    expect(
      mount.querySelectorAll('.rtile__failure-pop button').length
    ).toBeGreaterThan(0);
    expect(controlsWithoutPart(mount)).toEqual([]);
  });

  test('draws the candidate lane menu with a part', () => {
    const mount = renderWorkerTab(false);

    clickOn(mount, '.worker-card__place[data-bead-id="RD-1"]');

    expect(
      mount.querySelectorAll(
        '.worker-card__place-menu .worker-card__place-lane'
      ).length
    ).toBeGreaterThan(1);
    expect(controlsWithoutPart(mount)).toEqual([]);
  });

  test('draws a judgement chip popover with a part', () => {
    const mount = renderWorkerTab(false);

    clickOn(mount, '[data-chip-key="readiness"]');

    expect(mount.querySelector('.chip-popover')).not.toBeNull();
    expect(controlsWithoutPart(mount)).toEqual([]);
  });
});

const TOOL_USE = {
  type: 'assistant',
  message: {
    content: [
      {
        type: 'tool_use',
        id: 't1',
        name: 'Read',
        input: { file_path: '/repo/server/auth.js' }
      }
    ]
  }
};

describe('drawers and the script viewer use parts (§3.4 check 3)', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  test('draws every transcript drawer control with a part', () => {
    document.body.innerHTML = '<div id="drawer"></div>';
    const mount = /** @type {HTMLElement} */ (
      document.getElementById('drawer')
    );
    const store = createSessionLogStore();
    store.set('session-log:a1', [
      TOOL_USE,
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: '구현합니다.' }] }
      },
      { type: 'result', subtype: 'success', is_error: false, result: 'DONE' }
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: async () => ({ ok: true }),
      sessionLogStore: store
    });

    drawer.open({
      attempt_id: 'a1',
      meta: {
        runner: 'claude',
        model: 'opus',
        session_id: 'a1b2c3d4-5e6f',
        resume_command: "claude --resume 'a1b2c3d4-5e6f'",
        worktree: '/repo/.worktrees/UI-1'
      }
    });

    expect(mount.querySelector('.sv__work-sum')).not.toBeNull();
    expect(mount.querySelectorAll('button').length).toBeGreaterThan(5);
    expect(controlsWithoutPart(mount)).toEqual([]);
    drawer.destroy();
  });

  test('draws every repo-ops timeline drawer control with a part', () => {
    const mount = document.createElement('div');
    const view = timelineView(
      [
        {
          operation_id: 'op-1',
          kind: 'deploy',
          state: 'failed',
          target_base: 'main',
          target_sha: 'c'.repeat(40),
          requested_at: 100,
          finished_at: 200,
          log_path: '/logs/deploy.log'
        }
      ],
      [
        {
          bead_id: 'UI-a',
          step: 'branch_cleanup',
          reason: 'x',
          at: 300,
          log_path: '/logs/cleanup.log'
        }
      ],
      { expanded: true }
    );

    render(
      repoOpsTimelineTemplate({
        events: view.visible,
        hidden: view.hidden,
        expanded: true,
        repo: '/repo'
      }),
      mount
    );

    expect(mount.querySelector('.worker-ev__copy')).not.toBeNull();
    expect(mount.querySelectorAll('button').length).toBeGreaterThan(5);
    expect(controlsWithoutPart(mount)).toEqual([]);
  });

  test('draws the repo-ops script viewer controls with a part', async () => {
    const viewer = createRepoOpsScriptViewer({
      getWorkspacePath: () => '/repo',
      fetchImpl: /** @type {any} */ (
        vi.fn(async () => ({
          ok: true,
          json: async () => ({
            ok: true,
            lane: 'deploy',
            path: 'repo-ops/script/deploy',
            base_ref: 'main',
            base_sha: 'a'.repeat(40),
            blob_sha: 'b'.repeat(40),
            mode: '100755',
            timeout_ms: 600_000,
            content: '#!/bin/sh\necho hello\n'
          })
        }))
      )
    });

    await viewer.open(
      {
        lane: 'deploy',
        base_sha: 'a'.repeat(40),
        path: 'repo-ops/script/deploy',
        base_ref: 'main'
      },
      document.body
    );

    expect(
      document.querySelectorAll('.repo-ops-script-viewer button').length
    ).toBe(2);
    expect(controlsWithoutPart(document.body)).toEqual([]);
    viewer.destroy();
  });

  test('draws the document viewer controls with a part', async () => {
    document.body.innerHTML = '<div id="mv"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mv'));
    const viewer = createMdViewer(mount, {
      getWorkspacePath: () => '/repo',
      fetchImpl: /** @type {any} */ (
        vi.fn(async () => ({
          ok: true,
          json: async () => ({ ok: true, path: 'docs/x.md', content: '# x' })
        }))
      )
    });

    await viewer.open('docs/x.md');

    expect(mount.querySelector('.mv__close')).not.toBeNull();
    expect(controlsWithoutPart(mount)).toEqual([]);
  });
});
