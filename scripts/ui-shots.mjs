#!/usr/bin/env node
/**
 * UI verification against the fixture server (UI-dbn6 Phase 1, pipeline
 * page). Uses a Playwright from the npx cache — it is NOT a dependency.
 *
 * Checks, each reported PASS/FAIL (exit 1 on any FAIL, 2 when Playwright is
 * unavailable):
 *   1. 전체·레포 captures at 390 (every lane through the lane bar) and 1280,
 *      with `scrollWidth > innerWidth` counted on each;
 *   2. every card/row/tile op button and every sheet button ≥ 44px tall at 390;
 *   3. a 1280 mouse drag, a 390 touch long-press (350 ms) drag and the 390
 *      move sheet `↑ 위로` each reorder the fixture queue (read back over the
 *      fixture's own WebSocket) and the DOM;
 *   4. the first 8-repo snapshot's handling (parse → lanes → render) ≤ 100 ms
 *      at 1280 (`performance.measure('bdui:first-render')`);
 *   5. 60 idle seconds add 0 to `window.__bdui.render_count`;
 *   6. boot WS subscriptions are exactly monitor-pipeline + impl-presets +
 *      model-visibility (레포 scope: + worker-queue).
 *
 * Usage: node scripts/ui-shots.mjs http://127.0.0.1:3101 --out <dir>
 */
/* global window, document, getComputedStyle */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { clearTimeout, setTimeout } from 'node:timers';
import { URL, pathToFileURL } from 'node:url';
import { WebSocket } from 'ws';

const REPO_A = '/fixture/repo-a';
const LANES = ['candidate', 'queue', 'running', 'pr_wait', 'done'];
const FIRST_RENDER_BUDGET_MS = 100;
const IDLE_MS = 60_000;
const MIN_BUTTON_PX = 44;

/** @type {Array<{ name: string, ok: boolean, detail: string }>} */
const results = [];

/**
 * @param {string} name
 * @param {boolean} ok
 * @param {string} detail
 */
function report(name, ok, detail) {
  results.push({ name, ok, detail });
  process.stdout.write(`${ok ? 'PASS' : 'FAIL'} ${name} — ${detail}\n`);
}

/**
 * Find a Playwright: a resolvable package first, else the newest npx cache.
 *
 * @returns {Promise<any|null>}
 */
async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    // not installed here — look in the npx cache
  }
  const root = path.join(os.homedir(), '.npm', '_npx');
  /** @type {Array<{ dir: string, mtime: number }>} */
  const found = [];
  for (const entry of fs.existsSync(root) ? fs.readdirSync(root) : []) {
    const dir = path.join(root, entry, 'node_modules', 'playwright');
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      found.push({ dir, mtime: fs.statSync(dir).mtimeMs });
    }
  }
  found.sort((a, b) => b.mtime - a.mtime);
  for (const { dir } of found) {
    try {
      const pkg = JSON.parse(
        fs.readFileSync(path.join(dir, 'package.json'), 'utf8')
      );
      const entry = pkg.exports?.['.']?.import || 'index.mjs';
      return await import(pathToFileURL(path.join(dir, entry)).href);
    } catch {
      // try the next cache entry
    }
  }
  return null;
}

/**
 * The page instrumentation: outgoing WS types, and the handling time of the
 * first monitor-pipeline snapshot (the render is synchronous inside it).
 *
 * @param {string} scope
 * @returns {string}
 */
function initScript(scope) {
  return `(() => {
    try {
      localStorage.setItem('beads-ui.scope', ${JSON.stringify(scope)});
    } catch {}
    const shots = { sent: [], first: null };
    window.__shots = shots;
    const send = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {
      try {
        const msg = JSON.parse(String(data));
        if (msg && typeof msg.type === 'string') shots.sent.push(msg.type);
      } catch {}
      return send.call(this, data);
    };
    const add = WebSocket.prototype.addEventListener;
    WebSocket.prototype.addEventListener = function (type, fn, opts) {
      if (type !== 'message' || typeof fn !== 'function') {
        return add.call(this, type, fn, opts);
      }
      const wrapped = function (ev) {
        const text = typeof ev.data === 'string' ? ev.data : '';
        const first =
          shots.first === null && text.includes('"monitor-pipeline-snapshot"');
        const start = first ? performance.now() : 0;
        const out = fn.call(this, ev);
        if (first) {
          const end = performance.now();
          performance.measure('bdui:first-render', { start, end });
          shots.first = end - start;
        }
        return out;
      };
      return add.call(this, type, wrapped, opts);
    };
  })();`;
}

/**
 * The fixture's repo-a parallel queue order, read over its own WebSocket.
 *
 * @param {string} base
 * @returns {Promise<string[]>}
 */
function fixtureQueue(base) {
  const url = new URL('/ws', base);
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url.href);
    const timer = setTimeout(() => {
      ws.terminate();
      reject(new Error('fixture queue read timed out'));
    }, 5000);
    ws.on('open', () => {
      ws.send(
        JSON.stringify({
          id: 'shots-1',
          type: 'subscribe-monitor-pipeline',
          payload: { id: 'shots' }
        })
      );
    });
    ws.on('message', (data) => {
      const msg = JSON.parse(String(data));
      if (msg.type !== 'monitor-pipeline-snapshot') {
        return;
      }
      clearTimeout(timer);
      const row = msg.payload.workspaces.find(
        (/** @type {any} */ entry) => entry.root_dir === REPO_A
      );
      ws.close();
      resolve(
        (row?.queue || []).map((/** @type {any} */ entry) => entry.bead_id)
      );
    });
    ws.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

/**
 * The repo-a parallel rows in DOM order.
 *
 * @param {any} page
 * @returns {Promise<string[]>}
 */
function domQueue(page) {
  return page.$$eval(
    `[data-lane-body="queue"] [data-drop="parallel"][data-root-dir="${REPO_A}"] .pl-row`,
    (/** @type {HTMLElement[]} */ rows) =>
      rows.map((row) => row.dataset.beadId || '')
  );
}

/**
 * @param {any} page
 * @param {(ids: string[]) => boolean} predicate
 * @returns {Promise<string[]>}
 */
async function waitDomQueue(page, predicate) {
  const deadline = Date.now() + 5000;
  let ids = await domQueue(page);
  while (!predicate(ids) && Date.now() < deadline) {
    await page.waitForTimeout(100);
    ids = await domQueue(page);
  }
  return ids;
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {{ scope: string, width: number }} options
 */
async function openPage(browser, base, options) {
  const mobile = options.width < 720;
  const context = await browser.newContext({
    viewport: { width: options.width, height: mobile ? 844 : 900 },
    deviceScaleFactor: mobile ? 2 : 1,
    isMobile: mobile,
    hasTouch: mobile,
    reducedMotion: 'reduce'
  });
  await context.addInitScript(initScript(options.scope));
  const page = await context.newPage();
  /** @type {string[]} */
  const errors = [];
  page.on('pageerror', (err) => errors.push(String(err)));
  await page.goto(`${base}/#/pipeline`);
  await page.waitForSelector('.pl-lane');
  await page.waitForFunction(
    () => document.querySelectorAll('.pl-row, .pl-card, .pl-tile').length > 0
  );
  await page.waitForTimeout(300);
  return { context, page, errors };
}

/**
 * @param {any} page
 * @returns {Promise<{ over: boolean, scroll: number, inner: number, wide: string[] }>}
 */
function overflowOf(page) {
  return page.evaluate(() => {
    const inner = window.innerWidth;
    const scroll = document.documentElement.scrollWidth;
    /** @type {string[]} */
    const wide = [];
    /** @param {Element} el */
    const clipped = (el) => {
      for (let node = el.parentElement; node; node = node.parentElement) {
        if (getComputedStyle(node).overflowX !== 'visible') {
          return true;
        }
      }
      return false;
    };
    for (const el of Array.from(document.querySelectorAll('body *'))) {
      const rect = el.getBoundingClientRect();
      if (
        rect.width > 0 &&
        rect.right > inner + 1 &&
        wide.length < 5 &&
        !clipped(el)
      ) {
        const node = /** @type {HTMLElement} */ (el);
        wide.push(
          `${node.tagName.toLowerCase()}.${String(node.className).split(' ')[0]}`
        );
      }
    }
    return { over: scroll > inner, scroll, inner, wide };
  });
}

/**
 * Op buttons shorter than 44px among the visible ones matching `selector`.
 *
 * @param {any} page
 * @param {string} selector
 * @returns {Promise<{ count: number, short: string[] }>}
 */
function shortButtons(page, selector) {
  return page.$$eval(
    selector,
    (/** @type {HTMLElement[]} */ nodes, min) => {
      /** @type {string[]} */
      const short = [];
      let count = 0;
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          continue;
        }
        count += 1;
        if (rect.height < min) {
          short.push(
            `${node.dataset.op || node.textContent?.trim()}=${rect.height.toFixed(1)}`
          );
        }
      }
      return { count, short };
    },
    MIN_BUTTON_PX
  );
}

/**
 * @param {any} page
 * @param {string} lane
 */
async function showLane(page, lane) {
  await page.click(`[data-op="mobile-lane"][data-value="${lane}"]`);
  await page.waitForTimeout(150);
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 */
async function captures(browser, base, out) {
  for (const [label, scope] of [
    ['all', '*'],
    ['repo', REPO_A]
  ]) {
    for (const width of [1280, 390]) {
      const { context, page, errors } = await openPage(browser, base, {
        scope,
        width
      });
      if (width === 1280) {
        const expected = [
          'subscribe-impl-presets',
          'subscribe-model-visibility',
          'subscribe-monitor-pipeline',
          ...(scope === '*' ? [] : ['subscribe-worker-queue'])
        ];
        const subs = (
          await page.evaluate(() => /** @type {any} */ (window).__shots.sent)
        )
          .filter((/** @type {string} */ type) => type.startsWith('subscribe-'))
          .sort();
        report(
          `boot subscriptions (${label})`,
          JSON.stringify(subs) === JSON.stringify(expected),
          subs.join(', ')
        );
      }
      // Measure before any full-page capture: Playwright's full-page
      // screenshot drops the `(pointer: coarse)` emulation of a mobile
      // context, which would turn the coarse `⋯` rows back into `✕` rows.
      const lanes = width === 390 ? LANES : ['all'];
      if (width === 390) {
        const coarse = await page.evaluate(
          () => window.matchMedia('(pointer: coarse)').matches
        );
        report(
          `coarse pointer emulated (${label} 390)`,
          coarse,
          String(coarse)
        );
        for (const [lane, opener] of [
          ['queue', '[data-op="move-sheet"]'],
          ['running', '[data-op="ops-sheet"]'],
          ['candidate', '[data-op="place-sheet"]:not([disabled])']
        ]) {
          await showLane(page, lane);
          const handle = await page.$(`[data-lane-body="${lane}"] ${opener}`);
          if (!handle) {
            report(
              `sheet buttons ≥ 44px (${label} ${lane})`,
              false,
              'no opener'
            );
            continue;
          }
          await handle.click();
          await page.waitForSelector('.pl-sheet-host .ui-sheet');
          const file = path.join(out, `sheet-${label}-${lane}-390.png`);
          await page.screenshot({ path: file });
          const buttons = await shortButtons(
            page,
            '.pl-sheet-host .ui-sheet button'
          );
          report(
            `sheet buttons ≥ 44px (${label} ${lane})`,
            buttons.short.length === 0 && buttons.count > 0,
            `${buttons.count} measured${
              buttons.short.length > 0
                ? ` · short: ${buttons.short.join(' ')}`
                : ''
            } · ${path.basename(file)}`
          );
          await page.click(
            '.pl-sheet-host .ui-sheet__head [data-op="sheet-close"]'
          );
          await page.waitForTimeout(250);
        }
        for (const lane of lanes) {
          await showLane(page, lane);
          const overflow = await overflowOf(page);
          report(
            `no horizontal overflow (${label} 390 ${lane})`,
            !overflow.over,
            `scrollWidth ${overflow.scroll} / innerWidth ${overflow.inner}${
              overflow.wide.length > 0
                ? ` · wide: ${overflow.wide.join(' ')}`
                : ''
            }`
          );
          const buttons = await shortButtons(
            page,
            '.pl-card .pl-op, .pl-row .pl-op, .pl-tile .pl-op'
          );
          report(
            `op buttons ≥ 44px (${label} 390 ${lane})`,
            buttons.short.length === 0,
            `${buttons.count} measured${
              buttons.short.length > 0
                ? ` · short: ${buttons.short.join(' ')}`
                : ''
            }`
          );
        }
      } else {
        const overflow = await overflowOf(page);
        report(
          `no horizontal overflow (${label} 1280)`,
          !overflow.over,
          `scrollWidth ${overflow.scroll} / innerWidth ${overflow.inner}${
            overflow.wide.length > 0
              ? ` · wide: ${overflow.wide.join(' ')}`
              : ''
          }`
        );
      }
      for (const lane of lanes) {
        if (width === 390) {
          await showLane(page, lane);
        }
        await page.screenshot({
          path: path.join(
            out,
            `pipeline-${label}-${width}${lane === 'all' ? '' : `-${lane}`}.png`
          ),
          fullPage: width !== 390
        });
      }
      report(
        `no page errors (${label} ${width})`,
        errors.length === 0,
        errors.slice(0, 3).join(' | ') || 'none'
      );
      await context.close();
    }
  }
}

/**
 * @param {any} browser
 * @param {string} base
 */
async function firstRender(browser, base) {
  const { context, page } = await openPage(browser, base, {
    scope: '*',
    width: 1280
  });
  const ms = await page.evaluate(
    () => /** @type {any} */ (window).__shots.first
  );
  const rows = await page.evaluate(
    () => document.querySelectorAll('.pl-bundle').length
  );
  report(
    'first 8-repo render ≤ 100ms (1280)',
    typeof ms === 'number' && ms <= FIRST_RENDER_BUDGET_MS,
    `${typeof ms === 'number' ? ms.toFixed(1) : 'unmeasured'}ms · ${rows} repo bundles`
  );
  await context.close();
}

/**
 * @param {any} browser
 * @param {string} base
 */
async function idle(browser, base) {
  const { context, page } = await openPage(browser, base, {
    scope: '*',
    width: 1280
  });
  // A grace chip still counting down means one legitimate boundary render.
  await page
    .waitForFunction(
      () => document.querySelectorAll('.pl-chip--grace').length === 0,
      null,
      { timeout: 40_000 }
    )
    .catch(() => {});
  await page.waitForTimeout(1500);
  const before = await page.evaluate(
    () => /** @type {any} */ (window).__bdui.render_count
  );
  await page.waitForTimeout(IDLE_MS);
  const after = await page.evaluate(
    () => /** @type {any} */ (window).__bdui.render_count
  );
  report(
    'idle 60s adds no render (1280)',
    after - before === 0,
    `render_count ${before} → ${after}`
  );
  await context.close();
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 */
async function mouseDrag(browser, base, out) {
  const { context, page } = await openPage(browser, base, {
    scope: '*',
    width: 1280
  });
  const before = await fixtureQueue(base);
  const moved = before[before.length - 1];
  const zone = `[data-lane-body="queue"] [data-drop="parallel"][data-root-dir="${REPO_A}"]`;
  const source = await page.$(`${zone} .pl-row[data-bead-id="${moved}"]`);
  const target = await page.$(`${zone} .pl-row[data-bead-id="${before[0]}"]`);
  if (!source || !target) {
    report('mouse drag reorders (1280)', false, 'rows not found');
    await context.close();
    return;
  }
  const from = await source.boundingBox();
  const to = await target.boundingBox();
  await page.mouse.move(from.x + from.width / 2, from.y + 12);
  await page.mouse.down();
  await page.mouse.move(from.x + from.width / 2, from.y + 4, { steps: 3 });
  await page.mouse.move(to.x + to.width / 2, to.y + 6, { steps: 12 });
  await page.mouse.up();
  const dom = await waitDomQueue(page, (ids) => ids[0] === moved);
  const after = await fixtureQueue(base);
  await page.screenshot({ path: path.join(out, 'drag-mouse-1280.png') });
  report(
    'mouse drag reorders (1280)',
    after[0] === moved && dom[0] === moved,
    `fixture ${before.join(',')} → ${after.join(',')} · DOM ${dom.join(',')}`
  );
  await context.close();
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 */
async function touchDrag(browser, base, out) {
  const { context, page } = await openPage(browser, base, {
    scope: '*',
    width: 390
  });
  await showLane(page, 'queue');
  const before = await fixtureQueue(base);
  const moved = before[before.length - 1];
  const zone = `[data-lane-body="queue"] [data-drop="parallel"][data-root-dir="${REPO_A}"]`;
  const source = await page.$(
    `${zone} .pl-row[data-bead-id="${moved}"] .pl-title`
  );
  const target = await page.$(`${zone} .pl-row[data-bead-id="${before[0]}"]`);
  if (!source || !target) {
    report('touch long-press drag reorders (390)', false, 'rows not found');
    await context.close();
    return;
  }
  await source.scrollIntoViewIfNeeded();
  const from = await source.boundingBox();
  const to = await target.boundingBox();
  const cdp = await context.newCDPSession(page);
  const x = from.x + from.width / 2;
  const y = from.y + from.height / 2;
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x, y, id: 1 }]
  });
  await page.waitForTimeout(450);
  const steps = 12;
  const end_y = to.y + 6;
  for (let index = 1; index <= steps; index++) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x, y: y + ((end_y - y) * index) / steps, id: 1 }]
    });
    await page.waitForTimeout(16);
  }
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: []
  });
  const dom = await waitDomQueue(page, (ids) => ids[0] === moved);
  const after = await fixtureQueue(base);
  await page.screenshot({ path: path.join(out, 'drag-touch-390.png') });
  report(
    'touch long-press drag reorders (390)',
    after[0] === moved && dom[0] === moved,
    `fixture ${before.join(',')} → ${after.join(',')} · DOM ${dom.join(',')}`
  );
  await context.close();
}

/**
 * @param {any} browser
 * @param {string} base
 * @param {string} out
 */
async function moveSheet(browser, base, out) {
  const { context, page } = await openPage(browser, base, {
    scope: '*',
    width: 390
  });
  await showLane(page, 'queue');
  const before = await fixtureQueue(base);
  const moved = before[1];
  await page.click(
    `[data-lane-body="queue"] [data-op="move-sheet"][data-bead-id="${moved}"]`
  );
  await page.waitForSelector('.pl-sheet-host .ui-sheet');
  await page.click('.pl-sheet-host button:has-text("↑ 위로")');
  const dom = await waitDomQueue(page, (ids) => ids[0] === moved);
  const after = await fixtureQueue(base);
  await page.screenshot({ path: path.join(out, 'move-sheet-390.png') });
  report(
    'move sheet ↑ 위로 reorders (390)',
    after[0] === moved && dom[0] === moved,
    `fixture ${before.join(',')} → ${after.join(',')} · DOM ${dom.join(',')}`
  );
  await context.close();
}

async function main() {
  const base = (process.argv[2] || '').replace(/\/+$/, '');
  const flag = process.argv.indexOf('--out');
  const out = flag >= 0 ? process.argv[flag + 1] : '';
  if (!/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(base) || !out) {
    process.stderr.write(
      'usage: node scripts/ui-shots.mjs http://127.0.0.1:<port> --out <dir>\n'
    );
    process.exit(2);
  }
  const playwright = await loadPlaywright();
  if (!playwright) {
    process.stderr.write(
      'Playwright is not available. It is not a dependency of this repo:\n' +
        '  run `npx -y playwright@latest install chromium` once so the npx\n' +
        '  cache holds it, then rerun this script.\n'
    );
    process.exit(2);
  }
  fs.mkdirSync(out, { recursive: true });
  const browser = await playwright.chromium.launch();
  try {
    await captures(browser, base, out);
    await firstRender(browser, base);
    await mouseDrag(browser, base, out);
    await touchDrag(browser, base, out);
    await moveSheet(browser, base, out);
    await idle(browser, base);
  } finally {
    await browser.close();
  }
  const failed = results.filter((entry) => !entry.ok);
  process.stdout.write(
    `\n${results.length - failed.length}/${results.length} checks passed · captures in ${out}\n`
  );
  process.exit(failed.length > 0 ? 1 : 0);
}

await main();
