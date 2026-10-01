import { render } from 'lit-html';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { createSubscriptionIssueStore } from './data/subscription-issue-store.js';
import { createWorkerQueueStore } from './data/worker-queue-store.js';
import { createMonitorView } from './views/monitor/index.js';
import { createUsageMeter } from './views/usage-meter.js';
import { createWorkerView } from './views/worker/index.js';
import { candidateCard, miniRow, queueRowOps } from './views/worker/lanes.js';
import { runningGridTemplate } from './views/worker/running-grid.js';
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
  test('marks the Worker, header and Monitor regions', () => {
    const names = regions(STYLES).map((r) => r.name);

    expect(names.filter((name) => name === 'worker').length).toBeGreaterThan(0);
    expect(names).toContain('header');
    expect(names).toContain('monitor');
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
});

/**
 * Ratchet (§3.4 check 2): raw colour literals in any declaration plus raw
 * lengths (any number with a unit) in size declarations, over every stylesheet
 * outside tokens.css. UI-kqta lowered it from 470 (base d24f47a1: 194 colours +
 * 276 sizes) to 428 (194 + 234); the UI-k5s2 tokens unit moved the legacy
 * palette into tokens.css and tokenized the legacy shared CSS and base.css,
 * taking it to 62 (11 + 51, all in styles.css below the `.op-btn` heading); the
 * monitor unit moved the Monitor tab, header and usage meter onto the parts,
 * taking it to 57 (10 + 47). All counted with this scanner; UI-k5s2 takes it
 * to 0. Lower the number when a change removes raw values — never raise it.
 */
const RATCHET_BASELINE = 57;

describe('design-system ratchet (§3.4 check 2)', () => {
  test('keeps raw colours and raw sizes outside tokens.css at or under the baseline', () => {
    const count = [STYLES, BASE, COMPONENTS]
      .map((css) => findings(css).length)
      .reduce((a, b) => a + b, 0);

    expect(count).toBeLessThanOrEqual(RATCHET_BASELINE);
  });
});

/**
 * Overlay surfaces inside the Worker tab — dialogs, popovers, drawers, the
 * shared place menu and the repo-ops settings disclosure — move with UI-k5s2.
 */
const OVERLAY_SELECTOR = [
  'dialog',
  '.chip-popover',
  '.rtile__failure-pop',
  '.place-menu',
  '.worker-filter__labels-pop',
  '.worker-repo-drawer',
  '.worker-drawer-host',
  '.worker-repo-ops-settings'
].join(', ');

const PART_CLASSES = ['op-btn', 'ui-input', 'ui-select', 'ui-chip'];

/** Native-size controls with no part (docs/design-system.md §2·§4). */
const NATIVE_CONTROL = 'input[type=checkbox], input[type=radio]';

/**
 * Controls of a rendered surface that carry no part class. Checkboxes and
 * radios keep their native size and have no part, so they are not counted.
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
        !el.closest('.ui-field')
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
