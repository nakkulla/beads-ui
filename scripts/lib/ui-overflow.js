/**
 * Pure judgement of the width-overflow probe (UI-kqta §3.5). The browser side
 * (`scripts/ui-overflow-probe.mjs`) only measures — rects and the few computed
 * styles the rules read — and this module decides what counts as overflow, so
 * the rules can be tested without a browser.
 *
 * Rules (ported from the PR #338 `overflowProbe`): inside every visible
 * container, a descendant box or a run of text whose left or right edge passes
 * the container's by more than the tolerance is a failure, clipped or not.
 * Out of scope are descendants of an absolutely or fixed positioned element
 * (popovers, tooltips), descendants of an intentional horizontal scroller
 * (`overflow-x: auto|scroll` strictly between the item and the container),
 * text an ancestor ellipsizes, and the text inside a `<select>`.
 */

/**
 * @typedef {Object} ProbeRect
 * @property {number} left
 * @property {number} right
 * @property {number} width
 * @property {number} height
 */

/**
 * One element on the path from an item up to (not including) its container.
 *
 * @typedef {Object} ProbeStyle
 * @property {string} tag - Upper-case tag name (`SELECT`).
 * @property {string} position - Computed `position`.
 * @property {string} overflow_x - Computed `overflow-x`.
 * @property {string} text_overflow - Computed `text-overflow`.
 */

/**
 * A descendant box (`kind: 'box'`, `chain[0]` is the element itself) or one
 * text node (`kind: 'text'`, `chain[0]` is its parent element). `rects` holds
 * the box rect, or every line box of the text.
 *
 * @typedef {Object} ProbeItem
 * @property {'box'|'text'} kind
 * @property {string} name
 * @property {string} [text]
 * @property {ProbeRect[]} rects
 * @property {ProbeStyle[]} chain
 */

/**
 * @typedef {Object} ProbeContainer
 * @property {string} name
 * @property {ProbeRect} box
 * @property {boolean} hidden - `visibility: hidden` on the container.
 * @property {ProbeStyle} style - The container's own style (its ellipsis also
 * hides text that runs past it).
 * @property {ProbeItem[]} items
 */

/** Sub-pixel rounding slack, in CSS pixels. */
export const OVERFLOW_TOLERANCE_PX = 0.5;

/** At most this many failure lines are kept; the count stays exact. */
export const MAX_FAILURE_LINES = 12;

/**
 * How far the document scrolls sideways beyond the viewport.
 *
 * @param {{ scroll_width: number, inner_width: number }} metrics
 * @returns {number}
 */
export function documentOverflowPx(metrics) {
  return Math.max(0, metrics.scroll_width - metrics.inner_width);
}

/**
 * Whether the item sits under a positioned overlay or inside a scroller.
 *
 * @param {ProbeItem} item
 * @returns {boolean}
 */
export function outOfScope(item) {
  return item.chain.some((style, index) => {
    if (style.position === 'absolute' || style.position === 'fixed') {
      return true;
    }
    return (
      index > 0 &&
      (style.overflow_x === 'auto' || style.overflow_x === 'scroll')
    );
  });
}

/**
 * Whether an ancestor (or the container) cuts this text with an ellipsis, or
 * the text is a select's option label.
 *
 * @param {ProbeItem} item
 * @param {ProbeStyle} container_style
 * @returns {boolean}
 */
export function ellipsized(item, container_style) {
  return [...item.chain, container_style].some(
    (style) =>
      (style.text_overflow === 'ellipsis' && style.overflow_x !== 'visible') ||
      style.tag === 'SELECT' ||
      style.tag === 'OPTION'
  );
}

/**
 * How far a rect passes the container box sideways (0 when inside).
 *
 * @param {ProbeRect} rect
 * @param {ProbeRect} box
 * @returns {number}
 */
export function overflowPx(rect, box) {
  return Math.max(0, box.left - rect.left, rect.right - box.right);
}

/**
 * Judge every container. One failure per box, at most one per text node.
 *
 * @param {ProbeContainer[]} containers
 * @param {number} [tolerance]
 * @returns {{ containers: number, count: number, failures: string[] }}
 */
export function overflowFailures(
  containers,
  tolerance = OVERFLOW_TOLERANCE_PX
) {
  /** @type {string[]} */
  const failures = [];
  let measured = 0;
  let count = 0;
  for (const container of containers) {
    if (
      container.hidden ||
      container.box.width === 0 ||
      container.box.height === 0
    ) {
      continue;
    }
    measured += 1;
    for (const item of container.items) {
      if (outOfScope(item)) {
        continue;
      }
      if (item.kind === 'text' && ellipsized(item, container.style)) {
        continue;
      }
      const rect = item.rects.find(
        (r) =>
          r.width > 0 &&
          (item.kind === 'text' || r.height > 0) &&
          overflowPx(r, container.box) > tolerance
      );
      if (!rect) {
        continue;
      }
      count += 1;
      if (failures.length < MAX_FAILURE_LINES) {
        const label =
          item.kind === 'text'
            ? `${item.name} "${item.text || ''}"`
            : item.name;
        failures.push(
          `${container.name} > ${label} +${overflowPx(rect, container.box).toFixed(1)}px`
        );
      }
    }
  }
  return { containers: measured, count, failures };
}

/**
 * The distinct rounded heights of a control set, smallest first.
 *
 * @param {Array<{ name: string, height: number }>} controls
 * @returns {number[]}
 */
export function distinctHeights(controls) {
  return [...new Set(controls.map((c) => Math.round(c.height)))].sort(
    (a, b) => a - b
  );
}

/**
 * What the probe waits for and judges on one hash.
 *
 * @typedef {Object} ProbeTarget
 * @property {string} name - `worker` · `monitor` · `compare` · `adr` ·
 * `detail`, or `other` for a hash without an entry.
 * @property {string} ready - Selector that appears once the tab drew real
 * data.
 * @property {string} containers - Visible containers to judge, the shared
 * header included.
 * @property {string} toolbar - Controls whose rendered heights are reported
 * (not judged); empty for none.
 * @property {string} toolbar_label - Report line label of those controls.
 */

/** Header containers every tab shares. */
export const HEADER_CONTAINERS = '.app-header, .header-actions';

/** The parts a toolbar height report reads. */
const TOOLBAR_PARTS = ':is(.op-btn, .ui-field, .ui-input, .ui-select)';

/**
 * Per-tab entries (UI-kqta §3.5, every tab since UI-k5s2). `detail` is the
 * issue panel a `#/worker?issue=<id>` deep link opens over the Worker tab.
 *
 * @type {Record<string, { ready: string, containers: string[], toolbar?: string, toolbar_label?: string }>}
 */
const TAB_TARGETS = {
  worker: {
    ready: '.worker-console .worker-ctrl',
    // `.worker-console`, not `.worker-top`: the mobile ribbon bleeds into the
    // console padding on purpose (negative margins), and stays inside it.
    containers: [
      '.worker-console',
      '.worker-ctrl',
      '.worker-kpi',
      '.worker-filter',
      '.worker-pane',
      '.worker-now',
      '.worker-card',
      '.worker-mini',
      '.rtile',
      '.worker-repo-strip'
    ],
    toolbar: `:is(.worker-ctrl, .worker-ribbon) ${TOOLBAR_PARTS}`,
    toolbar_label: 'toolbar controls'
  },
  monitor: {
    // A deck tile is drawn per repository once the pipeline snapshot landed.
    ready: '.mon2-deck .mon2-deck__tile',
    containers: [
      '.mon2-deck',
      '.mon2-deck__tile',
      '.mon2-deck__bar',
      '.worker-pane',
      '.worker-filter',
      '.worker-now',
      '.mon2-sec',
      '.worker-card',
      '.worker-mini',
      '.rtile'
    ],
    toolbar: `.mon2-deck ${TOOLBAR_PARTS}`,
    toolbar_label: 'deck controls'
  },
  compare: {
    // The summary row is drawn only after a `get-compare` reply landed.
    ready: '.cmp-summary',
    containers: [
      '.cmp',
      '.cmp-head',
      '.cmp-controls',
      '.cmp-filters',
      '.cmp-summary',
      '.cmp-card',
      '.cmp-kpi',
      '.cmp-legend'
    ]
  },
  adr: {
    ready: '.adr-ws',
    containers: [
      '.adr-toolbar',
      '.adr-body',
      '.adr-ws',
      '.adr-ws__hd',
      '.adr-counts',
      '.adr-sec',
      '.adr-row'
    ]
  },
  detail: {
    ready: '.detail-overlay__panel .detail-kv',
    containers: [
      '.detail-overlay__panel',
      '.detail-overlay__bar',
      '.detail-title-row',
      '.detail-kv',
      '.detail-deps',
      '.detail-art',
      '.detail-session-row',
      '.detail-report'
    ]
  }
};

/** The hashes probed when the command line names none. */
export const DEFAULT_PROBE_HASHES = [
  '#/worker',
  '#/monitor',
  '#/compare',
  '#/adr'
];

/**
 * The probe target of one hash. Any `#/worker?issue=<id>` is the detail panel;
 * a hash without an entry probes the document and the header only.
 *
 * @param {string} hash
 * @returns {ProbeTarget}
 */
export function probeTarget(hash) {
  const route = hash.replace(/^#/, '');
  const query_at = route.indexOf('?');
  const view = (query_at === -1 ? route : route.slice(0, query_at)).replace(
    /^\/+|\/+$/g,
    ''
  );
  const issue =
    query_at === -1
      ? null
      : new URLSearchParams(route.slice(query_at + 1)).get('issue');
  const name = view === 'worker' && issue ? 'detail' : view;
  const tab = Object.hasOwn(TAB_TARGETS, name) ? TAB_TARGETS[name] : null;
  if (!tab) {
    return {
      name: 'other',
      ready: '.app-header',
      containers: HEADER_CONTAINERS,
      toolbar: '',
      toolbar_label: ''
    };
  }
  return {
    name,
    ready: tab.ready,
    containers: [HEADER_CONTAINERS, ...tab.containers].join(', '),
    toolbar: tab.toolbar || '',
    toolbar_label: tab.toolbar_label || ''
  };
}

/**
 * The command line `<url> [hash …]`: the server URL without a trailing slash
 * and the hashes to probe (every tab of {@link DEFAULT_PROBE_HASHES} when none
 * is given), each as a `#/…` route. `null` without a URL.
 *
 * @param {string[]} argv
 * @returns {{ url: string, hashes: string[] }|null}
 */
export function parseProbeArgs(argv) {
  const [url, ...hashes] = argv;
  if (!url || url.startsWith('#')) {
    return null;
  }
  return {
    url: url.replace(/\/+$/, ''),
    hashes: (hashes.length > 0 ? hashes : DEFAULT_PROBE_HASHES).map((hash) =>
      hash.startsWith('#') ? hash : `#${hash.startsWith('/') ? '' : '/'}${hash}`
    )
  };
}

/**
 * The exit code over every probed hash × width: 2 when any page could not be
 * measured (or nothing was), else 1 when any overflowed, else 0.
 *
 * @param {Array<'pass'|'overflow'|'unavailable'>} outcomes
 * @returns {0|1|2}
 */
export function probeExitCode(outcomes) {
  if (outcomes.length === 0 || outcomes.includes('unavailable')) {
    return 2;
  }
  return outcomes.includes('overflow') ? 1 : 0;
}
