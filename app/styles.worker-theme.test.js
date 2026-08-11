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
});
