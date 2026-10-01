#!/usr/bin/env node
/**
 * Width-overflow probe against a running beads-ui server (UI-kqta §3.5).
 * Read-only: it loads each tab, measures, and closes — it never clicks.
 *
 * Usage:
 *   node scripts/ui-overflow-probe.mjs <url> [hash …]
 *   node scripts/ui-overflow-probe.mjs http://127.0.0.1:3917
 *   node scripts/ui-overflow-probe.mjs http://127.0.0.1:3917 '#/worker?issue=UI-1'
 *
 * Without a hash it probes `#/worker`, `#/monitor`, `#/compare` and `#/adr`;
 * any `#/worker?issue=<id>` probes the issue detail panel. Every hash is
 * measured at 390×844 (mobile touch: `isMobile` + `hasTouch`, so
 * `any-pointer: coarse` applies) and at 1280×900:
 *   (1) document overflow — `scrollWidth - innerWidth`;
 *   (2) descendant boxes and text runs leaving a visible container of that
 *       tab or of the shared header (`scripts/lib/ui-overflow.js` owns the
 *       containers and the rules);
 *   (3) on `#/worker` the rendered heights of the toolbar's part controls,
 *       on `#/monitor` those of the deck — reported, not judged.
 *
 * Exit: 0 = no overflow on any hash at either width, 1 = overflow, 2 = the
 * browser (the installed Google Chrome via `playwright-core`) or a page is
 * unavailable. Point it at an isolated 127.0.0.1 dev server
 * (docs/design-system.md), never at a shared port.
 */
/* global document, getComputedStyle, NodeFilter, window, process */
import {
  distinctHeights,
  documentOverflowPx,
  overflowFailures,
  parseProbeArgs,
  probeExitCode,
  probeTarget
} from './lib/ui-overflow.js';

const VIEWPORTS = [
  { name: '390', width: 390, height: 844, mobile: true },
  { name: '1280', width: 1280, height: 900, mobile: false }
];

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
 * Measure one hash at one viewport.
 *
 * @param {any} browser
 * @param {string} url
 * @param {string} hash
 * @param {(typeof VIEWPORTS)[number]} vp
 * @returns {Promise<'pass'|'overflow'|'unavailable'>}
 */
async function probeOne(browser, url, hash, vp) {
  const target = probeTarget(hash);
  const label = `${hash} ${vp.name}×${vp.height}${vp.mobile ? ' touch' : ''}`;
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
    deviceScaleFactor: 1
  });
  try {
    const page = await context.newPage();
    try {
      await page.goto(`${url}/${hash}`, { waitUntil: 'load', timeout: 30000 });
      await page.waitForSelector(target.ready, { timeout: 30000 });
      await page
        .waitForLoadState('networkidle', { timeout: 10000 })
        .catch(() => {});
      await page.waitForTimeout(1000);
    } catch (error) {
      process.stderr.write(
        `page unavailable at ${label}: ${String(error).split('\n')[0]}\n`
      );
      return 'unavailable';
    }
    const snapshot = await page.evaluate(measure, {
      containers: target.containers,
      toolbar: target.toolbar
    });
    const doc_px = documentOverflowPx(snapshot);
    const result = overflowFailures(snapshot.containers);
    const ok = doc_px === 0 && result.count === 0;
    process.stdout.write(
      `${ok ? 'PASS' : 'FAIL'} ${label} — document +${doc_px}px (scrollWidth ${snapshot.scroll_width} / innerWidth ${snapshot.inner_width}), containers ${result.containers}, overflow ${result.count}\n`
    );
    for (const line of result.failures) {
      process.stdout.write(`  ${line}\n`);
    }
    if (snapshot.toolbar.length > 0) {
      const heights = distinctHeights(snapshot.toolbar);
      process.stdout.write(
        `  ${target.toolbar_label} ${snapshot.toolbar.length}: ${heights.map((h) => `${h}px`).join(', ')}${heights.length === 1 ? ' (uniform)' : ' (mixed)'} — ${snapshot.toolbar.map((/** @type {{ name: string, height: number }} */ c) => `${c.name} ${c.height.toFixed(1)}`).join(' · ')}\n`
      );
    }
    return ok ? 'pass' : 'overflow';
  } finally {
    await context.close();
  }
}

async function main() {
  const args = parseProbeArgs(process.argv.slice(2));
  if (!args) {
    process.stderr.write(
      'usage: node scripts/ui-overflow-probe.mjs <url> [hash …]  (e.g. http://127.0.0.1:3917 "#/worker"; no hash = every tab)\n'
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
  /** @type {Array<'pass'|'overflow'|'unavailable'>} */
  const outcomes = [];
  try {
    for (const hash of args.hashes) {
      for (const vp of VIEWPORTS) {
        outcomes.push(await probeOne(browser, args.url, hash, vp));
      }
    }
  } finally {
    await browser.close();
  }
  return probeExitCode(outcomes);
}

process.exitCode = await main();
