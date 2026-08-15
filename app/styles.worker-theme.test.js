import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { describe, expect, test } from 'vitest';

/**
 * Guards the Task 3 closeout: the Worker console CSS must consume tokens (so it
 * respects `[data-theme='light']`), the dead v3 worker CSS must be gone, and the
 * ≤640px responsive rules must be present.
 */
const CSS = readFileSync(path.resolve(process.cwd(), 'app/styles.css'), 'utf8');

describe('worker console styles', () => {
  const markerIndex = CSS.indexOf('/* ---------- Worker console');
  const workerBlock = markerIndex >= 0 ? CSS.slice(markerIndex) : '';

  test('the worker console block exists', () => {
    expect(markerIndex).toBeGreaterThan(0);
  });

  test('consumes design tokens (no raw 6-digit hex in the worker block)', () => {
    const hex = workerBlock.match(/#[0-9a-fA-F]{6}\b/g) || [];
    expect(hex).toEqual([]);
    expect(workerBlock).toContain('var(--accent-success)');
    expect(workerBlock).toContain('var(--bg-app)');
  });

  test('the dead v3 worker CSS was removed', () => {
    expect(CSS).not.toContain('.worker-tree');
    expect(CSS).not.toContain('.worker-parent-row');
    expect(CSS).not.toContain('.worker-toolbar');
  });

  test('has the ≤640px responsive rules (single-column grid + stacked lanes)', () => {
    const mq = CSS.slice(CSS.indexOf('@media (max-width: 640px)', markerIndex));
    expect(mq).toContain('.worker-rungrid');
    expect(mq).toContain('grid-template-columns: 1fr');
    expect(mq).toContain('flex-direction: column');
  });

  test('splits controls and KPIs into full rows at intermediate widths', () => {
    const mediaStart = CSS.indexOf(
      '@media (min-width: 641px) and (max-width: 1400px)',
      markerIndex
    );
    const mediaEnd = CSS.indexOf('@media (max-width: 640px)', mediaStart);
    const mq = CSS.slice(mediaStart, mediaEnd);

    expect(mediaStart).toBeGreaterThan(markerIndex);
    expect(mq).toContain('.worker-ctrl');
    expect(mq).toContain('flex-wrap: wrap');
    expect(mq).toContain('.worker-ctrl__ops');
    expect(mq).toContain('flex: 1 1 100%');
    expect(mq).toContain('.worker-kpi');
    expect(mq).toContain('justify-content: flex-start');
    expect(mq).toContain('margin-left: 0');
  });

  test('styles the transcript drawer + tile selection ring', () => {
    expect(workerBlock).toContain('.sv__body');
    expect(workerBlock).toContain('.rtile--sel');
    expect(workerBlock).toContain('.detail-session');
  });

  test('wraps long transcript tool details inside the drawer', () => {
    const bodyRule =
      workerBlock.match(/(?:^|\n)\.sv__body\s*{([^}]*)}/)?.[1] || '';
    const lineRule =
      workerBlock.match(/(?:^|\n)\.sv__tool-line\s*{([^}]*)}/)?.[1] || '';
    const detailRule =
      workerBlock.match(/(?:^|\n)\.sv__tool-detail\s*{([^}]*)}/)?.[1] || '';
    const resultRule =
      workerBlock.match(/(?:^|\n)\.sv__tool-ok\s*{([^}]*)}/)?.[1] || '';

    expect(bodyRule).toContain('overflow-x: hidden');
    expect(lineRule).toContain('display: flex');
    expect(lineRule).toContain('width: 100%');
    expect(detailRule).toContain('white-space: normal');
    expect(detailRule).toContain('overflow-wrap: anywhere');
    expect(resultRule).toContain('overflow-wrap: anywhere');
  });

  test('shows the queue placement button without a pointer media gate', () => {
    const baseRule =
      CSS.match(/(?:^|\n)\.worker-card__place\s*{([^}]*)}/)?.[1] || '';
    const mediaStart = CSS.indexOf(
      '@media (any-pointer: coarse), (max-width: 640px)'
    );
    const mediaEnd = CSS.indexOf('/* 클릭 어포던스', mediaStart);
    const mediaBlock = CSS.slice(mediaStart, mediaEnd);

    expect(baseRule).not.toContain('display: none');
    expect(mediaBlock).not.toContain('.worker-card__place');
  });

  // 저장소 작업 타임라인은 transcript drawer와 오버레이를 공유하지만 `.sv`가
  // 아니어서 폭·스크롤 계약을 못 받았고, rail의 60vh 상한이 host 높이와 이중으로
  // 걸려 배포 이력 뒤쪽이 스크롤 없이 잘렸다.
  test('gives the repo-ops drawer the same overlay contract as the transcript drawer', () => {
    const drawerRule =
      CSS.match(
        /(?:^|\n)\.worker-drawer-overlay \.worker-repo-drawer\s*{([^}]*)}/
      )?.[1] || '';
    const railRule =
      CSS.match(
        /(?:^|\n)\.worker-drawer-overlay \.worker-rail\s*{([^}]*)}/
      )?.[1] || '';

    expect(drawerRule).toContain('width: 100%');
    expect(drawerRule).toContain('flex-direction: column');
    expect(drawerRule).toContain('min-height: 0');
    expect(railRule).toContain('max-height: none');
    expect(railRule).toContain('flex: 1 1 auto');
  });

  // 오버레이는 host 둘을 담고 하나만 연다. 닫힌 host가 flex item으로 남으면
  // `justify-content: center`가 열린 쪽을 옆으로 민다. 이 규칙이 오버레이 규칙보다
  // 뒤에 있어야 이기므로, 소스 순서 자체가 계약이다.
  test('keeps a closed drawer host out of the overlay layout', () => {
    const overlayRuleAt = CSS.indexOf(
      '.worker-drawer-overlay .worker-drawer-host {'
    );
    const suppressAt = CSS.indexOf(
      '.worker-drawer-overlay .worker-drawer-host[hidden]'
    );
    const suppressRule =
      CSS.match(
        /\.worker-drawer-overlay \.worker-drawer-host\[hidden\],\s*\n\s*\.worker-drawer-overlay \.worker-drawer-host:empty\s*{([^}]*)}/
      )?.[1] || '';

    expect(overlayRuleAt).toBeGreaterThan(0);
    expect(suppressAt).toBeGreaterThan(overlayRuleAt);
    expect(suppressRule).toContain('display: none');
  });

  test('wraps the repo-ops strip into two rows below 640px', () => {
    const mediaStart = CSS.indexOf('/* ---------- Worker responsive (<=640px)');
    const mq = CSS.slice(mediaStart);
    const stripRule =
      mq.match(/(?:^|\n)\s*\.worker-repo-strip\s*{([^}]*)}/)?.[1] || '';
    const factRule =
      mq.match(/(?:^|\n)\s*\.worker-repo-strip__fact\s*{([^}]*)}/)?.[1] || '';
    const badgeRule =
      mq.match(/(?:^|\n)\s*\.worker-repo-strip__badge\s*{([^}]*)}/)?.[1] || '';

    expect(mediaStart).toBeGreaterThan(0);
    expect(stripRule).toContain('flex-wrap: wrap');
    expect(factRule).toContain('flex: 1 0 100%');
    // 배지는 부르는 쪽이므로 사실보다 앞 줄에 남는다.
    expect(badgeRule).toContain('order: 2');
    expect(factRule).toContain('order: 3');
  });

  test('narrows the repo-ops timeline gutters below 640px', () => {
    const mq = CSS.slice(
      CSS.indexOf('/* ---------- Worker responsive (<=640px)')
    );
    const eventRule = mq.match(/(?:^|\n)\s*\.worker-ev\s*{([^}]*)}/)?.[1] || '';
    const kvRule =
      mq.match(/(?:^|\n)\s*\.worker-ev__kv dt\s*{([^}]*)}/)?.[1] || '';

    expect(eventRule).toContain('grid-template-columns: 42px 22px 1fr');
    expect(kvRule).toContain('width: auto');
  });
});
