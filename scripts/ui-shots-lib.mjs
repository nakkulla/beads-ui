/**
 * Shared helpers of `ui-shots.mjs` (UI-dbn6, split in P1-r2 to keep each
 * script under its line budget): the PASS/FAIL report, the npx-cache
 * Playwright loader, the page instrumentation, the fixture queue read-back
 * and the overflow / 44px measurements.
 */
/* global window, document, getComputedStyle, NodeFilter */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { clearTimeout, setTimeout } from 'node:timers';
import { URL, pathToFileURL } from 'node:url';
import { WebSocket } from 'ws';

export const REPO_A = '/fixture/repo-a';
export const LANES = ['candidate', 'queue', 'running', 'pr_wait', 'done'];
export const FIRST_RENDER_BUDGET_MS = 100;
export const IDLE_MS = 60_000;
export const MIN_BUTTON_PX = 44;

/** @type {Array<{ name: string, ok: boolean, detail: string }>} */
export const results = [];

/**
 * @param {string} name
 * @param {boolean} ok
 * @param {string} detail
 */
export function report(name, ok, detail) {
  results.push({ name, ok, detail });
  process.stdout.write(`${ok ? 'PASS' : 'FAIL'} ${name} — ${detail}\n`);
}

/**
 * Find a Playwright: a resolvable package first, else the newest npx cache.
 *
 * @returns {Promise<any|null>}
 */
export async function loadPlaywright() {
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
export function initScript(scope) {
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
        if (msg && typeof msg.type === 'string') {
          shots.sent.push(
            msg.type === 'subscribe-list' || msg.type === 'unsubscribe-list'
              ? msg.type + ':' + String((msg.payload && (msg.payload.type || msg.payload.id)) || '')
              : msg.type
          );
        }
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
export function fixtureQueue(base) {
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
export function domQueue(page) {
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
export async function waitDomQueue(page, predicate) {
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
 * @param {{ scope: string, width: number, colorScheme?: 'dark'|'light' }} options
 */
export async function openPage(browser, base, options) {
  const mobile = options.width < 720;
  const context = await browser.newContext({
    viewport: { width: options.width, height: mobile ? 844 : 900 },
    deviceScaleFactor: mobile ? 2 : 1,
    isMobile: mobile,
    hasTouch: mobile,
    reducedMotion: 'reduce',
    colorScheme: options.colorScheme || 'dark'
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
export function overflowOf(page) {
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

/** The containers the no-overflow probe measures on the pipeline screen. */
export const PIPELINE_PROBE =
  '.pl-card, .pl-row, .pl-tile, .pl-lane, .pl-strip__chip';

/** The containers the no-overflow probe measures on the Phase 2 surfaces. */
export const SURFACE_PROBE =
  '.dt-panel, .dt-section, .sv, .new-issue__container, .mv, dialog.op-dialog[open], .ui-sheet__panel';

/**
 * The no-overflow probe (UI-dbn6 design-system round): inside every visible
 * container matching `selector`, any descendant box — and any run of text —
 * whose left or right edge passes the container's by more than 0.5px is a
 * failure, clipped or not. Out of scope: descendants of an absolutely/fixed
 * positioned element (popovers, tooltips), of an intentional horizontal
 * scroller (`overflow-x: auto|scroll` between the element and the
 * container), and text an ancestor ellipsizes (`text-overflow: ellipsis`).
 *
 * @param {any} page
 * @param {string} selector
 * @returns {Promise<{ containers: number, count: number, failures: string[] }>}
 */
export function overflowProbe(page, selector) {
  return page.evaluate((sel) => {
    /** @type {string[]} */
    const failures = [];
    let containers = 0;
    let count = 0;
    /** @param {Element} node */
    const name = (node) => {
      const cls = String(/** @type {HTMLElement} */ (node).className || '')
        .split(/\s+/)
        .filter((c) => c && !c.startsWith('is-'))
        .slice(0, 2)
        .join('.');
      const id = /** @type {HTMLElement} */ (node).dataset?.beadId;
      return `${node.tagName.toLowerCase()}${cls ? `.${cls}` : ''}${id ? `[${id}]` : ''}`;
    };
    /**
     * @param {Element} el
     * @param {Element} root
     */
    const outOfScope = (el, root) => {
      for (let node = el; node && node !== root; node = node.parentElement) {
        const cs = getComputedStyle(node);
        if (cs.position === 'absolute' || cs.position === 'fixed') {
          return true;
        }
        if (
          node !== el &&
          (cs.overflowX === 'auto' || cs.overflowX === 'scroll')
        ) {
          return true;
        }
      }
      return false;
    };
    /**
     * @param {Node} text
     * @param {Element} root
     */
    const ellipsized = (text, root) => {
      for (
        let node = text.parentElement;
        node && node !== root.parentElement;
        node = node.parentElement
      ) {
        const cs = getComputedStyle(node);
        if (cs.textOverflow === 'ellipsis' && cs.overflowX !== 'visible') {
          return true;
        }
        if (node.tagName === 'SELECT' || node.tagName === 'OPTION') {
          return true;
        }
      }
      return false;
    };
    const range = document.createRange();
    for (const root of Array.from(document.querySelectorAll(sel))) {
      const box = root.getBoundingClientRect();
      const root_cs = getComputedStyle(root);
      if (
        box.width === 0 ||
        box.height === 0 ||
        root_cs.visibility === 'hidden'
      ) {
        continue;
      }
      containers += 1;
      for (const el of Array.from(root.querySelectorAll('*'))) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          continue;
        }
        const over = Math.max(box.left - rect.left, rect.right - box.right);
        if (over <= 0.5 || outOfScope(el, root)) {
          continue;
        }
        count += 1;
        if (failures.length < 12) {
          failures.push(`${name(root)} > ${name(el)} +${over.toFixed(1)}px`);
        }
      }
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let text = walker.nextNode(); text; text = walker.nextNode()) {
        if (!text.textContent || !text.textContent.trim()) {
          continue;
        }
        const parent = /** @type {Element} */ (text.parentElement);
        if (outOfScope(parent, root) || ellipsized(text, root)) {
          continue;
        }
        range.selectNodeContents(text);
        for (const rect of Array.from(range.getClientRects())) {
          const over = Math.max(box.left - rect.left, rect.right - box.right);
          if (rect.width === 0 || over <= 0.5) {
            continue;
          }
          count += 1;
          if (failures.length < 12) {
            failures.push(
              `${name(root)} > ${name(parent)} "${text.textContent.trim().slice(0, 24)}" +${over.toFixed(1)}px`
            );
          }
          break;
        }
      }
    }
    return { containers, count, failures };
  }, selector);
}

/**
 * Op buttons shorter than 44px among the visible ones matching `selector`.
 *
 * @param {any} page
 * @param {string} selector
 * @returns {Promise<{ count: number, short: string[] }>}
 */
export function shortButtons(page, selector) {
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
export async function showLane(page, lane) {
  await page.click(`[data-op="mobile-lane"][data-value="${lane}"]`);
  await page.waitForTimeout(150);
}

/**
 * WS types the page sent since `from`.
 *
 * @param {any} page
 * @param {number} from
 * @returns {Promise<string[]>}
 */
export async function sentSince(page, from) {
  const sent = await page.evaluate(
    () => /** @type {any} */ (window).__shots.sent
  );
  return sent.slice(from);
}

/**
 * @param {any} page
 * @returns {Promise<number>}
 */
export function sentCount(page) {
  return page.evaluate(() => /** @type {any} */ (window).__shots.sent.length);
}

/**
 * @param {any} page
 * @param {string} label
 * @param {string} scope - A selector the measured buttons live under.
 */
export async function reportButtons(page, label, scope) {
  const buttons = await shortButtons(page, `${scope} button, ${scope} select`);
  report(
    `buttons ≥ 44px (${label})`,
    buttons.short.length === 0 && buttons.count > 0,
    `${buttons.count} measured${
      buttons.short.length > 0 ? ` · short: ${buttons.short.join(' ')}` : ''
    }`
  );
}

/**
 * @param {any} page
 * @param {string} label
 */
export async function reportOverflow(page, label) {
  const overflow = await overflowOf(page);
  report(
    `no horizontal overflow (${label})`,
    !overflow.over,
    `scrollWidth ${overflow.scroll} / innerWidth ${overflow.inner}${
      overflow.wide.length > 0 ? ` · wide: ${overflow.wide.join(' ')}` : ''
    }`
  );
}
