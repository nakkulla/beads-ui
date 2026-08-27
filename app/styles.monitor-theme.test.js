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

  test('leaves no CSS order rule behind for the mobile lane stack (UI-5ksp §4.7)', () => {
    const block = monitorBlock();
    const mq = block.slice(block.indexOf('@media (max-width: 640px)'));

    // 관제 우선 순서는 이제 DOM이 소유한다 — `지금` 패널이 실행 중·PR 대기를
    // 합치는 것은 restyle이 아니라 recombination이라 `order`로는 표현할 수 없다.
    expect(mq).not.toContain('.mon2-lanes > .worker-pane--lane-running');
    expect(mq).not.toContain('.mon2-lanes > .worker-pane--lane-done');
    expect(mq).not.toContain('order: 4');
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

  test('keeps only the cross-repo wait-lane material in the monitor block (UI-5ksp §4.2)', () => {
    const block = monitorBlock();

    // 대기 본문 구조는 두 탭이 공유하는 `.worker-wait__*`가 소유한다 — Monitor
    // 블록에 남는 것은 cross-repo 사실(연결 레인·상호 정지 경고)뿐이다.
    expect(block).toContain('.mon2-lane__cross-wait');
    expect(block).toContain('.mon2-clane__body');
    expect(block).toContain('.mon2-crow');
    expect(block).toContain('.mon2-newlane');
    expect(block).toMatch(/\[data-drop\]\.is-drop-over\s*{/);
  });

  test('leaves no rule behind for the monitor-only wait surfaces (UI-5ksp §4.2)', () => {
    expect(CSS).not.toContain('.mon2-wait');
    expect(CSS).not.toContain('.mon2-area');
    expect(CSS).not.toContain('.mon2-rowops');
    expect(CSS).not.toContain('.mon2-lane--empty');
    expect(CSS).not.toContain('.mon2-lane__hint');
    expect(CSS).not.toContain('.mon2-lane__rows');
    expect(CSS).not.toContain('.mon2-lane__badge');
    expect(CSS).not.toContain('.mon2-parallel');
    expect(CSS).not.toContain('.mon2-serial');
    // 데스크톱 등폭 예외만 사라진다 — 모바일의 `flex: none`은 Worker와 같은
    // 세로 스택 규칙이므로 그대로 남는다.
    expect(CSS).not.toMatch(/\.mon2-lanes > \.worker-pane\s*{\s*flex:\s*1 1 0/);
  });

  test('lets the shared lane rules own the monitor lane width (UI-5ksp §4.5)', () => {
    // Monitor만 `min-width: 0`으로 풀던 예외가 사라졌으므로 최상위 레인의
    // 등폭·220px 하한과 중첩 pane의 card 토큰이 두 탭에 같이 적용된다.
    expect(CSS).toMatch(
      /\.worker-lanes > \.worker-pane\s*{[^}]*min-width:\s*220px/
    );
    expect(CSS).toMatch(/\.worker-wait \.worker-pane\s*{[^}]*min-width:\s*0/);
    expect(CSS).toContain('.worker-mini__rowops');
  });

  test('consumes design tokens only (no raw hex in the monitor block)', () => {
    const hex = monitorBlock().match(/#[0-9a-fA-F]{3,8}\b/g) || [];

    expect(hex).toEqual([]);
    expect(monitorBlock()).toContain('var(--layer-pin-border)');
  });
});
