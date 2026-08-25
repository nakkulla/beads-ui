/**
 * Inline SVG line icons for the monitor tab (UI-gwkl §2.3).
 *
 * 이모지는 폰트마다 크기·정렬·색이 제각각이라 컨트롤 줄에 섞이면 라벨보다
 * 시각적으로 앞선다. 여기 아이콘은 전부 `currentColor` 스트로크라 켜짐/꺼짐
 * 상태색을 버튼에서 그대로 상속받고, 라벨과 같은 광학 무게로 읽힌다.
 *
 * 라이브러리를 들이지 않는다 — 일곱 개 도형이라 인라인 `<svg>`가 가장 작다.
 */
import { html, svg } from 'lit-html';

/**
 * `viewBox`·스트로크 규약을 한 자리에 둔다. 크기는 CSS(`.mon-i`)가 정한다 —
 * 컨트롤과 카드 조작이 서로 다른 크기로 쓰기 때문이다.
 *
 * `<svg>` 안에 들어가는 조각이므로 본문은 반드시 lit-html의 `svg` 태그로 만든다 —
 * `html`로 만들면 HTML 파서가 `<path>`를 XHTML 네임스페이스로 잡아 아무것도 그리지
 * 않는다.
 *
 * @param {import('lit-html').TemplateResult} body
 */
function shell(body) {
  return html`<svg
    class="mon-i"
    viewBox="0 0 16 16"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    ${body}
  </svg>`;
}

/** Triangle: 자동 진행 켜기 · 일시정지된 세션 이어하기. */
export function iconPlay() {
  return shell(svg`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`);
}

/** Two bars: 세션을 끊고 이어하기 가능 상태로 두는 조작. */
export function iconPause() {
  return shell(svg`<path d="M6 3.8v8.4M10 3.8v8.4" />`);
}

/** Filled square: 세션을 죽이고 대기 큐에서 빼는 조작. */
export function iconStop() {
  return shell(svg`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`);
}

/** Cross: 실패 기록 정리·대기 큐에서 제거. */
export function iconClose() {
  return shell(svg`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`);
}

/** Git-merge graph: 자격이 생기는 PR을 계속 머지하는 축. */
export function iconMerge() {
  return shell(svg`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`);
}

/** Cog with spokes: 그 레포의 실행 기본값 다이얼로그를 여는 축. */
export function iconGear() {
  return shell(svg`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`);
}

/** Double triangle: 전 레포 자동화를 한 번에 켜는 마스터 축. */
export function iconPlayAll() {
  return shell(svg`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`);
}
