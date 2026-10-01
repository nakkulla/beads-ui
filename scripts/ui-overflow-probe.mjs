#!/usr/bin/env node
/**
 * Width-overflow probe against a running beads-ui server (UI-kqta §3.5).
 * Read-only: it loads one tab, measures, and closes — it never clicks.
 *
 * Usage:
 *   node scripts/ui-overflow-probe.mjs <url> <hash>
 *   node scripts/ui-overflow-probe.mjs http://127.0.0.1:3917 '#/worker'
 *
 * Measures at 390×844 (mobile touch: `isMobile` + `hasTouch`, so
 * `any-pointer: coarse` applies) and at 1280×900:
 *   (1) document overflow — `scrollWidth - innerWidth`;
 *   (2) descendant boxes and text runs leaving a visible container
 *       (`scripts/lib/ui-overflow.js` owns the rules);
 *   (3) on `#/worker`, the rendered heights of the part-class controls of the
 *       toolbar (`.worker-ctrl`, `.worker-ribbon`) — reported, not judged.
 *
 * Exit: 0 = no overflow at either width, 1 = overflow, 2 = the browser (the
 * installed Google Chrome via `playwright-core`) or the page is unavailable.
 * Point it at an isolated 127.0.0.1 dev server (docs/design-system.md), never
 * at a shared port.
 */
/* global document, getComputedStyle, NodeFilter, window, process */
import {
  distinctHeights,
  documentOverflowPx,
  overflowFailures
} from './lib/ui-overflow.js';

const VIEWPORTS = [
  { name: '390', width: 390, height: 844, mobile: true },
  { name: '1280', width: 1280, height: 900, mobile: false }
];

/** Header containers every tab shares. */
const HEADER_CONTAINERS = '.app-header, .header-actions';

/**
 * Per-tab containers and the selector that says the tab has rendered. Tabs
 * without an entry probe the document and the header only (UI-k5s2 widens
 * this list).
 *
 * @type {Record<string, { ready: string, containers: string, toolbar?: string }>}
 */
const TABS = {
  '#/worker': {
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
    ].join(', '),
    toolbar:
      ':is(.worker-ctrl, .worker-ribbon) :is(.op-btn, .ui-field, .ui-input, .ui-select)'
  }
};

/**
 * In-page measurement. Returns plain data for `overflowFailures`.
 *
 * @param {{ containers: string, toolbar: string }} selectors
 */
function measure(selectors) {
  /** @param {Element} node */
  const name = (node) => {
    const cls = String(/** @type {HTMLElement} */ (node).className || '')
      .split(/\s+/)
      .filter((c) => c && !/^(is-|ui-|op-btn)/.test(c))
      .slice(0, 2)
      .join('.');
    const id = /** @type {HTMLElement} */ (node).dataset?.beadId;
    return `${node.tagName.toLowerCase()}${cls ? `.${cls}` : ''}${id ? `[${id}]` : ''}`;
  };
  /** @param {Element} node */
  const styleOf = (node) => {
    const cs = getComputedStyle(node);
    return {
      tag: node.tagName,
      position: cs.position,
      overflow_x: cs.overflowX,
      text_overflow: cs.textOverflow
    };
  };
  /** @param {DOMRect} r */
  const plain = (r) => ({
    left: r.left,
    right: r.right,
    width: r.width,
    height: r.height
  });
  /**
   * @param {Element|null} from
   * @param {Element} root
   */
  const chainOf = (from, root) => {
    const chain = [];
    for (let node = from; node && node !== root; node = node.parentElement) {
      chain.push(styleOf(node));
    }
    return chain;
  };
  const range = document.createRange();
  const containers = [];
  for (const root of Array.from(
    document.querySelectorAll(selectors.containers)
  )) {
    const items = [];
    for (const el of Array.from(root.querySelectorAll('*'))) {
      items.push({
        kind: 'box',
        name: name(el),
        rects: [plain(el.getBoundingClientRect())],
        chain: chainOf(el, root)
      });
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let text = walker.nextNode(); text; text = walker.nextNode()) {
      const value = (text.textContent || '').trim();
      if (!value || !text.parentElement) {
        continue;
      }
      range.selectNodeContents(text);
      items.push({
        kind: 'text',
        name: name(text.parentElement),
        text: value.slice(0, 24),
        rects: Array.from(range.getClientRects()).map(plain),
        chain: chainOf(text.parentElement, root)
      });
    }
    containers.push({
      name: name(root),
      box: plain(root.getBoundingClientRect()),
      hidden: getComputedStyle(root).visibility === 'hidden',
      style: styleOf(root),
      items
    });
  }
  const toolbar = selectors.toolbar
    ? Array.from(document.querySelectorAll(selectors.toolbar))
        .map((el) => ({
          name: name(el),
          height: el.getBoundingClientRect().height
        }))
        .filter((c) => c.height > 0)
    : [];
  return {
    scroll_width: document.documentElement.scrollWidth,
    inner_width: window.innerWidth,
    containers,
    toolbar
  };
}

/**
 * @param {string[]} argv
 * @returns {{ url: string, hash: string }|null}
 */
function parseArgs(argv) {
  const [url, hash] = argv;
  if (!url || !hash) {
    return null;
  }
  return {
    url: url.replace(/\/+$/, ''),
    hash: hash.startsWith('#') ? hash : `#${hash}`
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args) {
    process.stderr.write(
      'usage: node scripts/ui-overflow-probe.mjs <url> <hash>  (e.g. http://127.0.0.1:3917 "#/worker")\n'
    );
    return 2;
  }
  /** @type {any} */
  let chromium;
  try {
    ({ chromium } = await import('playwright-core'));
  } catch (error) {
    process.stderr.write(
      `browser unavailable: playwright-core not installed (${String(error)})\n`
    );
    return 2;
  }
  /** @type {any} */
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (error) {
    process.stderr.write(
      `browser unavailable: ${String(error).split('\n')[0]}\n`
    );
    return 2;
  }
  const tab = TABS[args.hash];
  const selectors = {
    containers: tab
      ? `${HEADER_CONTAINERS}, ${tab.containers}`
      : HEADER_CONTAINERS,
    toolbar: tab?.toolbar || ''
  };
  let overflow = false;
  try {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.mobile,
        hasTouch: vp.mobile,
        deviceScaleFactor: 1
      });
      const page = await context.newPage();
      try {
        await page.goto(`${args.url}/${args.hash}`, {
          waitUntil: 'load',
          timeout: 30000
        });
        await page.waitForSelector(tab ? tab.ready : '.app-header', {
          timeout: 30000
        });
        await page
          .waitForLoadState('networkidle', { timeout: 10000 })
          .catch(() => {});
        await page.waitForTimeout(1000);
      } catch (error) {
        process.stderr.write(
          `page unavailable at ${vp.name}: ${String(error).split('\n')[0]}\n`
        );
        await context.close();
        return 2;
      }
      const snapshot = await page.evaluate(measure, selectors);
      await context.close();
      const doc_px = documentOverflowPx(snapshot);
      const result = overflowFailures(snapshot.containers);
      const ok = doc_px === 0 && result.count === 0;
      overflow ||= !ok;
      process.stdout.write(
        `${ok ? 'PASS' : 'FAIL'} ${vp.name}×${vp.height}${vp.mobile ? ' touch' : ''} — document +${doc_px}px (scrollWidth ${snapshot.scroll_width} / innerWidth ${snapshot.inner_width}), containers ${result.containers}, overflow ${result.count}\n`
      );
      for (const line of result.failures) {
        process.stdout.write(`  ${line}\n`);
      }
      if (snapshot.toolbar.length > 0) {
        const heights = distinctHeights(snapshot.toolbar);
        process.stdout.write(
          `  toolbar controls ${snapshot.toolbar.length}: ${heights.map((h) => `${h}px`).join(', ')}${heights.length === 1 ? ' (uniform)' : ' (mixed)'} — ${snapshot.toolbar.map((c) => `${c.name} ${c.height.toFixed(1)}`).join(' · ')}\n`
        );
      }
    }
  } finally {
    await browser.close();
  }
  return overflow ? 1 : 0;
}

process.exitCode = await main();
