import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { describe, expect, test } from 'vitest';

/**
 * Guards the monitor redesign's CSS contract (UI-eey2 §3·§11.1): the tab now
 * borrows Worker's lane row, so its old three-column grid and horizontal-swipe
 * kanban must be GONE rather than merely overridden — a leftover rule would win
 * on one viewport and silently split the two tabs apart again.
 */
const CSS = readFileSync(path.resolve(process.cwd(), 'app/styles.css'), 'utf8');

/**
 * The monitor's own block: from its section marker to the next top-level
 * section marker.
 *
 * @returns {string}
 */
function monitorBlock() {
  const start = CSS.indexOf('/* --- 모니터 세로 5레인');
  if (start < 0) {
    return '';
  }
  const end = CSS.indexOf('/* ---------- Detail-panel session history', start);
  return CSS.slice(start, end > 0 ? end : undefined);
}

describe('monitor tab styles (UI-eey2)', () => {
  test('the retired three-column grid and swipe kanban are gone', () => {
    expect(CSS).not.toContain('.mon-lanes');
    expect(CSS).not.toContain('scroll-snap-type: x mandatory');
  });

  test('the retired monitor-only card templates left no rules behind', () => {
    expect(CSS).not.toContain('.mon-card');
    expect(CSS).not.toContain('.mon-c__');
    expect(CSS).not.toContain('.mon-group');
    expect(CSS).not.toContain('.mon-sublane');
    expect(CSS).not.toContain('.mon-auto-all');
    expect(CSS).not.toContain('.mon-place__popover');
  });

  test('sizes the inline SVG icons and gives the five lanes equal width (UI-thwe)', () => {
    const block = monitorBlock();

    expect(block).toMatch(/\.mon-i\s*{[^}]*width:\s*13px/);
    expect(block).not.toContain('flex: 1.35 1 0');
    expect(block).not.toContain('flex: 1.05 1 0');
    expect(block).not.toContain('.mon2-deck__pill');
  });

  test('releases the monitor route shell into document scroll on mobile (UI-thwe)', () => {
    const block = monitorBlock();
    const mq = block.slice(block.indexOf('@media (max-width: 640px)'));

    expect(mq).toMatch(/#monitor-root\.route\.monitor\s*{[^}]*height:\s*auto/);
    expect(mq).toMatch(
      /\.mon2-lanes \.worker-pane__body\s*{[^}]*overflow:\s*visible/
    );
  });

  test('stacks the mobile lanes in control-first order', () => {
    const block = monitorBlock();
    const mq = block.slice(block.indexOf('@media (max-width: 640px)'));

    expect(mq).toContain('.mon2-lanes > .worker-pane--lane-running');
    expect(mq).toContain('order: 0');
    expect(mq).toContain('.mon2-lanes > .worker-pane--lane-done');
    expect(mq).toContain('order: 4');
  });

  test('keeps the usage ribbon bars visible on a ≤640px viewport (§11.1)', () => {
    const block = monitorBlock();
    const ribbon = block.slice(block.indexOf('.usage-meter-mount'));

    expect(ribbon).toContain('flex: 1 1 100%');
    expect(ribbon).toMatch(/\.usage-meter__track\s*{[^}]*display:\s*block/);
    expect(ribbon).toMatch(/\.usage-meter__group\s*{[^}]*width:\s*100%/);
  });

  test('blurs the unfocused lanes instead of hiding them (§4.2)', () => {
    const block = monitorBlock();
    const focus = block.slice(block.indexOf('.mon.has-focus'));

    expect(focus).toContain('opacity: 0.38');
    expect(focus).toContain('filter: saturate(0.6)');
    expect(focus).toMatch(
      /\.mon2-deck__tile:not\(\.is-focus\)[^}]*}\s*$|opacity: 0\.55/
    );
  });

  test('wraps the tile control line inside the fixed-width card', () => {
    const block = monitorBlock();

    expect(block).toMatch(/\.mon2-deck__tile-ft\s*{[^}]*flex-wrap:\s*wrap/);
    expect(block).toMatch(/\.mon2-deck__tile\s*{[^}]*flex:\s*0 0 236px/);
    expect(block).not.toMatch(/\.mon2-deck__strip\s*{[^}]*flex-wrap/);
  });

  test('stacks the totals bar and keeps the tile strip swipeable on mobile', () => {
    const block = monitorBlock();
    const mq = block.slice(block.indexOf('@media (max-width: 640px)'));

    expect(mq).toContain('.mon2-deck__bar');
    expect(mq).toContain('flex-direction: column');
    expect(mq).toMatch(/\.mon2-deck__strip\s*{[^}]*overflow-x:\s*auto/);
  });

  test('leaves no rule behind for the retired wait-lane surfaces (UI-e6hw §4.3)', () => {
    expect(CSS).not.toContain('.mon2-sec[data-section="queue"]');
    expect(CSS).not.toContain('.mon2-chains');
    expect(CSS).not.toContain('.mon-link');
    expect(CSS).not.toContain('.mon2-item__ops');
    expect(CSS).not.toContain('.mon2-sec__auto');
  });

  test('styles the two wait-lane areas and both lane kinds (UI-e6hw §4)', () => {
    const block = monitorBlock();

    expect(block).toContain('.mon2-wait');
    expect(block).toContain('.mon2-area__hd');
    expect(block).toContain('.mon2-parallel .worker-mini__seq::before');
    expect(block).toContain('.mon2-clane__body');
    expect(block).toContain('.mon2-crow');
    expect(block).toContain('.mon2-newlane');
    expect(block).toMatch(/\[data-drop\]\.is-drop-over\s*{/);
  });

  test('consumes design tokens only (no raw hex in the monitor block)', () => {
    const hex = monitorBlock().match(/#[0-9a-fA-F]{3,8}\b/g) || [];

    expect(hex).toEqual([]);
    expect(monitorBlock()).toContain('var(--layer-pin-border)');
  });
});
