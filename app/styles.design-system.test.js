import { render } from 'lit-html';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { createSubscriptionIssueStore } from './data/subscription-issue-store.js';
import { createWorkerQueueStore } from './data/worker-queue-store.js';
import { createWorkerView } from './views/worker/index.js';
import { candidateCard, miniRow, queueRowOps } from './views/worker/lanes.js';
import { runningGridTemplate } from './views/worker/running-grid.js';

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
const RAW_LENGTH =
  /(?<![\w-])\d*\.?\d+(px|rem|em|ex|ch|vh|vw|dvh|svh|lvh|pt)\b/g;

/**
 * Every `prop: value;` declaration of a stylesheet, comments removed. A
 * declaration may span lines; selectors never match because they are followed
 * by `{` rather than ending in `;`.
 *
 * @param {string} css
 * @returns {Array<{ prop: string, value: string }>}
 */
function declarations(css) {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
  /** @type {Array<{ prop: string, value: string }>} */
  const out = [];
  for (const m of text.matchAll(
    /(^|[{;\s])(--[\w-]+|[a-z-]+)\s*:\s*([^;{}]+);/g
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
 * Raw lengths of one size declaration: a length unit outside a plain token, or
 * a token reference that carries a literal fallback.
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

describe('design-system CSS rules (§3.4 check 1)', () => {
  test('marks at least one Worker region and the header region', () => {
    const names = regions(STYLES).map((r) => r.name);

    expect(names.filter((name) => name === 'worker').length).toBeGreaterThan(0);
    expect(names).toContain('header');
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

  test('keeps the marked Worker and header regions free of raw colours and raw sizes', () => {
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
 * lengths in size declarations, over every stylesheet outside tokens.css.
 * UI-kqta lowered it from 470 (base d24f47a1: 194 colours + 276 sizes) to 428
 * (194 + 234); UI-k5s2 takes it to 0. Lower the number when a change removes
 * raw values — never raise it.
 */
const RATCHET_BASELINE = 428;

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

/**
 * Controls of a rendered surface that carry no part class.
 *
 * @param {ParentNode} root
 * @returns {string[]}
 */
function controlsWithoutPart(root) {
  return Array.from(root.querySelectorAll('button, input, select'))
    .filter((el) => !el.closest(OVERLAY_SELECTOR))
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
