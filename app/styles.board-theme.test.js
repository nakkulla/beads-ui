import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { describe, expect, test } from 'vitest';

/**
 * Board 시각 어휘 계약 (UI-rkly §1). Board는 Worker 관제탑과 같은 어휘를 쓴다 —
 * 컬럼 상단 스테이지색 스파인 + In progress 실행중 서페이스. 색은 스펙의 컬럼
 * 매핑 표로 고정되며, 토큰 전용(raw hex 금지)은 회귀 가드다.
 */
const CSS = readFileSync(
  path.resolve(process.cwd(), 'app/styles/base.css'),
  'utf8'
);

const BOARD_START = CSS.indexOf('/* --- board view --- */');
const BOARD_END = CSS.indexOf('/* --- detail overlay');
const BOARD = CSS.slice(BOARD_START, BOARD_END);

/**
 * The declaration body of a top-level `#<id>` rule inside the board block.
 *
 * @param {string} selector
 * @returns {string}
 */
function ruleBody(selector) {
  const re = new RegExp(`${selector}\\s*\\{([^}]*)\\}`, 'g');
  let out = '';
  let m;
  while ((m = re.exec(BOARD)) !== null) {
    out += m[1];
  }
  return out;
}

describe('board visual vocabulary', () => {
  test('the board block exists ahead of the detail overlay block', () => {
    expect(BOARD_START).toBeGreaterThan(0);
    expect(BOARD_END).toBeGreaterThan(BOARD_START);
  });

  // 스펙 §1의 컬럼→토큰 매핑 표. Worker 5단계 색과 Board 컬럼은 일대일이
  // 아니므로 이 표가 계약이다. Deferred는 컬럼이 아니라 팝업이라 여기 없다.
  const SPINE = [
    ['#blocked-col', '--accent-warn'],
    ['#ready-col', '--stage-plan-on'],
    ['#in-progress-col', '--stage-impl-on'],
    ['#resolved-col', '--stage-merge-on'],
    ['#closed-col', '--stage-merge-dim']
  ];

  for (const [selector, token] of SPINE) {
    test(`${selector} carries a 2px stage spine in var(${token})`, () => {
      const body = ruleBody(selector);

      expect(body).toContain(`border-top: 2px solid var(${token})`);
    });
  }

  test('the In progress column uses the running-tile surface', () => {
    const body = ruleBody('#in-progress-col');

    expect(body).toContain('var(--bg-tile-run)');
  });

  // 회귀 가드: 이 블록은 변경 전에도 토큰만 쓰고 있었다. 리스킨이 raw hex를
  // 들여와 라이트 테마를 깨뜨리지 않도록 상태를 고정한다.
  test('consumes design tokens (no raw 6-digit hex in the board block)', () => {
    const hex = BOARD.match(/#[0-9a-fA-F]{6}\b/g) || [];

    expect(hex).toEqual([]);
  });
});
