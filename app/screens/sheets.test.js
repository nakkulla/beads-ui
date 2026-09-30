import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { describe, expect, test } from 'vitest';

/**
 * Screen stylesheet contracts ported from the retired
 * `app/styles.worker-theme.test.js` (UI-dbn6 Phase 4): the assertions that
 * read a live screen sheet stay; the ones that guarded the deleted
 * `styles.css` went with it.
 *
 * @param {string} file
 * @returns {string}
 */
function sheet(file) {
  return readFileSync(path.resolve(process.cwd(), file), 'utf8');
}

const TRANSCRIPT = sheet('app/screens/transcript/transcript.css');
const TRANSCRIPT_BODY = sheet('app/screens/transcript/transcript-body.css');
const DETAIL_HISTORY = sheet('app/screens/detail/detail-history.css');
const SETTINGS = sheet('app/screens/settings/settings.css');
const REPO_OPS = sheet('app/screens/repo-ops/repo-ops.css');

describe('settings sheet', () => {
  test('applies the settings dialog grid only while open', () => {
    const baseRule =
      SETTINGS.match(/(?:^|\n)\.settings-dialog\s*{([^}]*)}/)?.[1] || '';
    const openRule =
      SETTINGS.match(/(?:^|\n)\.settings-dialog\[open\]\s*{([^}]*)}/)?.[1] ||
      '';

    expect(baseRule).not.toContain('display:');
    expect(openRule).toContain('display: grid');
  });
});

describe('transcript and detail history sheets', () => {
  test('styles the transcript body and the detail session rows', () => {
    expect(TRANSCRIPT_BODY).toContain('.sv__body');
    expect(DETAIL_HISTORY).toContain('.detail-session');
  });

  // 도구 줄은 한 줄이다 (UI-2dbn §4.3): 세부는 말줄임으로 자르고 전문은 펼침
  // 칸이 싣는다. 줄바꿈 계약이던 시절에는 긴 Bash 한 줄이 5~10줄로 늘어났다.
  test('keeps a transcript tool line on one line inside the drawer', () => {
    const bodyRule =
      TRANSCRIPT_BODY.match(/(?:^|\n)\.sv__body\s*{([^}]*)}/)?.[1] || '';
    const detailRule =
      TRANSCRIPT_BODY.match(/(?:^|\n)\.sv__tool-detail\s*{([^}]*)}/)?.[1] || '';
    const expandRule =
      TRANSCRIPT_BODY.match(/(?:^|\n)\.sv__tool-expand\s*{([^}]*)}/)?.[1] || '';

    expect(bodyRule).toContain('overflow-x: hidden');
    expect(detailRule).toContain('white-space: nowrap');
    expect(detailRule).toContain('text-overflow: ellipsis');
    expect(detailRule).toContain('min-width: 0');
    expect(expandRule).toContain('overflow-wrap: anywhere');
  });

  // 창 높이는 상한이 아니라 고정이다 (UI-2dbn §4.1): 스트리밍 중 창이 출렁이지
  // 않는다.
  test('fixes the desktop transcript window height on the detail host', () => {
    const detailRule =
      TRANSCRIPT.match(/(?:^|\n)\.session-log-root \.sv\s*{([^}]*)}/)?.[1] ||
      '';

    expect(detailRule).toContain('height: min(88vh, 1000px)');
  });

  test('turns the detail transcript host into a full-screen sheet below 640px', () => {
    const mq = TRANSCRIPT.slice(
      TRANSCRIPT.indexOf('@media (max-width: 640px)')
    );
    const detailRule =
      mq.match(/(?:^|\n)\s*\.session-log-root \.sv\s*{([^}]*)}/)?.[1] || '';

    expect(detailRule).toContain('inset: 0');
    expect(detailRule).toContain('height: 100dvh');
    expect(detailRule).toContain('border-radius: 0');
    expect(detailRule).toContain('box-shadow: none');
  });

  // 모바일 도구 줄은 결과 요약만 둘째 줄로 내려간다 (UI-2dbn §4.3): 긴 도구
  // 이름이 따로 한 줄을 차지하면 세 줄이 된다.
  test('caps the tool name so only the result wraps below 640px', () => {
    const mq = TRANSCRIPT_BODY.slice(
      TRANSCRIPT_BODY.indexOf('@media (max-width: 640px)')
    );
    const nameRule =
      mq.match(/(?:^|\n)\s*\.sv__tool-name\s*{([^}]*)}/)?.[1] || '';
    const outRule =
      mq.match(/(?:^|\n)\s*\.sv__tool-out\s*{([^}]*)}/)?.[1] || '';

    expect(nameRule).toContain('max-width: 40%');
    expect(nameRule).toContain('text-overflow: ellipsis');
    expect(outRule).toContain('flex: 1 1 100%');
  });
});

describe('repo-ops sheet', () => {
  // 저장소 작업 타임라인은 transcript drawer와 오버레이 계약을 공유한다: rail의
  // 60vh 상한이 host 높이와 이중으로 걸리면 배포 이력 뒤쪽이 스크롤 없이 잘린다.
  test('gives the repo-ops drawer the same overlay contract as the transcript drawer', () => {
    const drawerRule =
      REPO_OPS.match(
        /(?:^|\n)\.ro-overlay \.worker-repo-drawer\s*{([^}]*)}/
      )?.[1] || '';
    const railRule =
      REPO_OPS.match(/(?:^|\n)\.ro-overlay \.worker-rail\s*{([^}]*)}/)?.[1] ||
      '';

    expect(drawerRule).toContain('width: 100%');
    expect(drawerRule).toContain('flex-direction: column');
    expect(drawerRule).toContain('min-height: 0');
    expect(railRule).toContain('max-height: none');
    expect(railRule).toContain('flex: 1 1 auto');
  });

  test('narrows the repo-ops timeline gutters below 720px', () => {
    const mq = REPO_OPS.slice(
      REPO_OPS.indexOf('@media (max-width: 719px) {\n  .worker-ev')
    );
    const eventRule = mq.match(/(?:^|\n)\s*\.worker-ev\s*{([^}]*)}/)?.[1] || '';
    const kvRule =
      mq.match(/(?:^|\n)\s*\.worker-ev__kv dt\s*{([^}]*)}/)?.[1] || '';

    expect(eventRule).toContain('grid-template-columns: 42px 22px 1fr');
    expect(kvRule).toContain('width: auto');
  });
});

describe('base sheet element defaults (UI-dbn6 Phase 4)', () => {
  const BASE = sheet('app/ui/base.css');

  test('keeps the hidden attribute above every screen display rule', () => {
    const rule = BASE.match(/(?:^|\n)\[hidden\]\s*{([^}]*)}/)?.[1] || '';

    expect(rule).toContain('display: none !important');
  });
});
