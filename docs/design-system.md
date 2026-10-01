# 디자인 시스템 — 크기 단계와 공용 부품

beads-ui의 지금 색·글꼴은 그대로 두고, 조작(버튼·입력·선택·칩)의
높이·모서리·글자 크기·여백만 하나의 단계와 공용 부품으로 묶는다. 근거와 범위는
`docs/superpowers/specs/2026-10-01-design-system-current-theme-design.md`(UI-kqta)다.

- 적용된 곳: Worker 탭(툴바·KPI·필터·레인 머리·저장소 작업 줄), 공유 카드
  렌더러(`candidateCard`·`miniRow`·`runningTile` — Monitor 카드도 같다), Monitor
  탭(레포 데크의 스위치·`↗`·실행 칩, 합계 줄 칩, 레인 머리
  토글·정렬·기간·`일괄 머지`, 후보 섹션 머리, 후보 필터, 대기 영역 토글 —
  UI-k5s2), 공용 헤더(`?`·`⚙`·`New issue`, 작업 공간 선택·`프로젝트 관리`·Git
  Pull, 테마 스위치)와 사용량 미터(provider 토글, 계정 카드의
  `[전환]`·`[그래도 전환]`·`[취소]`), 이슈 상세(바·`[↴ 대기로]`와 레인 메뉴,
  요약 판정 칩, 유효 실행 설정 카드, 속성·route select, 제목·설명 편집기, 라벨,
  의존성 편집기, 산출물, 외부 작업 표, 과업 프롬프트, 세션 이력, 댓글·작업
  보고서 — UI-k5s2), 문서 뷰어, 전사 드로어, 저장소 작업 타임라인 드로어와 정리
  스텝퍼, 스크립트 뷰어, Worker 탭의 겹친 표면(판정 칩 팝오버, 실패 팝오버, 후보
  레인 메뉴, 라벨 필터 팝오버), 대화상자(설정의 모든 탭과 일괄 모드, 새 이슈,
  도움말, 치명 오류, 막힘 요약, 공급자 재개, 이어하기 지시, provider 변경 확인 —
  UI-k5s2), Worker 탭의 저장소 작업 선언(`.worker-repo-ops-settings`).
- 아직 아닌 곳: 비교·ADR 탭. UI-k5s2가 같은 규칙으로 옮긴다.
- 카드의 줄 순서·슬롯·칩 의미는 이 문서가 아니라 카드 문법 스펙과 ADR UI-nuwy가
  정한다. 이 문서는 모양만 정한다.

## 1. 토큰

크기 토큰은 `app/styles/tokens.css`의 `control size scale` 묶음에 있다. 색
토큰은 같은 파일의 역할 토큰(`--text-*`·`--border-*`·`--accent-*`…)을 그대로
쓴다.

| 토큰                 | 값                 | 쓰는 곳                      |
| -------------------- | ------------------ | ---------------------------- |
| `--h-control`        | 24px               | 버튼·입력·선택·필드 높이     |
| `--h-control-coarse` | 32px               | 터치·좁은 폭에서의 같은 높이 |
| `--h-chip`           | 18px               | 칩 높이                      |
| `--h-chip-coarse`    | 22px               | 터치·좁은 폭에서의 칩 높이   |
| `--fs-control`       | `--fs-small`(12px) | 조작 글자                    |
| `--fs-chip`          | 11px               | 칩 글자                      |
| `--r-control`        | `--r-5`(5px)       | 조작 모서리                  |
| `--r-chip`           | `--r-9`(9px)       | 칩 모서리                    |
| `--px-control`       | 10px               | 입력·필드의 좌우 여백        |
| `--gap-control`      | `--sp-6`(6px)      | 필드 안 라벨과 컨트롤 사이   |

- coarse 값은 `@media (any-pointer: coarse), (max-width: 640px)`에서 부품이 바꿔
  읽는다. 토큰 자체를 미디어 쿼리로 바꾸지 않는다.
- 간격·모서리·글자의 나머지 단계는 기존 `--sp-*`·`--r-*`·`--fs-*`다.
- 옛 팔레트(예전 `app/styles.css` 맨 앞의 `:root`·테마 블록)는 `tokens.css` 끝의
  "Legacy palette" 묶음으로 옮겼다(UI-k5s2). 블록 순서와 선택자는 그대로다.
  `--space-1..10`은 같은 값의 `--sp-*` 별칭이다(9·10은 `--sp-18`·`--sp-20`). 옛
  색 이름(`--fg`·`--muted`·`--border`·`--panel-bg`·`--control-*`·`--button-*`
  ·`--badge-*`)은 역할 토큰과 값이 달라 지금 값을 유지한다.

옛 공용 CSS(`styles.css` 앞부분·`base.css`)와 UI-k5s2가 옮긴 화면(Monitor…)에
리터럴로 적혀 있던 값은 같은 값 그대로 `tokens.css`의 `legacy role tokens`
묶음에 옮겼다(UI-k5s2). 단계에 없는 크기와 테마와 무관한 색만 있다:

| 토큰                                                                                                    | 값                   | 쓰는 곳                                  |
| ------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------- |
| `--sp-11`·`--sp-18`·`--sp-20`                                                                           | 11·18·20px           | 간격 단계의 빈칸                         |
| `--r-12`                                                                                                | 12px                 | 치명 오류 대화상자·아이콘 모서리         |
| `--r-pill`                                                                                              | 999px                | 원형 스피너·스위치 손잡이·점             |
| `--fs-tab`                                                                                              | 13.5px               | 저장소 캡슐 안 탭 글자                   |
| `--fs-title-xl`·`--fs-title-2xl`·`--fs-title-3xl`                                                       | 18·20·22px           | 앱 제목·마크다운 제목·치명 오류 제목     |
| `--fs-section-label`                                                                                    | 0.78rem              | 상세 요약 구역 제목                      |
| `--fs-code-inline`                                                                                      | 0.9em                | 문서 뷰어 인라인 코드                    |
| `--py-chip`                                                                                             | 1.5px                | 칩·칩 모양 입력의 위아래 여백            |
| `--h-header-item`                                                                                       | 22px                 | 헤더 줄 항목(구분선·로딩·캡슐 버튼) 높이 |
| `--h-touch-target`                                                                                      | 44px                 | 손가락 표적·패널 머리 최소 높이          |
| `--h-viewport`                                                                                          | 100dvh               | 화면 높이(좁은 폭 전사 드로어 시트 포함) |
| `--size-icon-mon`                                                                                       | 13px                 | Monitor 인라인 SVG 아이콘(`.mon-i`) 상자 |
| `--h-drawer`                                                                                            | min(88vh, 1000px)    | 전사·타임라인 드로어 창 높이             |
| `--fs-step-pip`                                                                                         | 8px                  | 정리 스텝퍼 눈금 안 글리프               |
| `--fs-dialog-title`                                                                                     | 1rem                 | 이어하기 대화상자(`.op-dialog`) 제목     |
| `--h-dialog-textarea`                                                                                   | 8rem                 | 이어하기 지시 입력 칸 최소 높이          |
| `--h-settings-dialog`                                                                                   | min(460px, 100%)     | 설정 대화상자 본문 최소 높이             |
| `--mix-black`·`--mix-white`·`--mix-ink`                                                                 | #000·#fff·#111       | `color-mix()` 재료                       |
| `--danger`·`--fg-on-danger`                                                                             | #b00020·#fff         | 옛 위험 버튼·오류 글자, 그 위 글자       |
| `--danger-strong`·`--danger-strong-bg`·`--danger-strong-border`                                         | #c62828와 그 10%·30% | 이슈 삭제 버튼                           |
| `--fatal-error-glow`·`--pre-border-mix`                                                                 | #fca5a5·#1f2937      | 치명 오류 대화상자 빛·코드 상자 테두리   |
| `--scrim-dialog`·`--scrim-fatal`·`--scrim-overlay`·`--scrim-viewer`                                     | 반투명 검정·남색     | 대화상자·상세·드로어 오버레이·문서 뷰어  |
| `--scrim-script-viewer`                                                                                 | rgba(0, 0, 0, 0.58)  | 스크립트 뷰어 뒤 막                      |
| `--scrim-op-dialog`                                                                                     | rgb(0 0 0 / 48%)     | 이어하기 대화상자 뒤 막                  |
| `--shadow-switch-knob`·`--shadow-menu`·`--shadow-overlay`·`--shadow-fatal-dialog`·`--shadow-fatal-icon` | `box-shadow` 전체 값 | 테마 스위치·메뉴·상세·드로어·치명 오류   |
| `--shadow-popover`                                                                                      | `box-shadow` 전체 값 | 터치 끌기 복제본·외부 대기 팝오버        |
| `--shadow-script-viewer`                                                                                | `box-shadow` 전체 값 | 스크립트 뷰어 창                         |
| `--shadow-op-dialog`                                                                                    | `box-shadow` 전체 값 | 이어하기 대화상자 창                     |

## 2. 부품

부품은 `app/styles/components.css` 한 파일에 있고 `styles.css` 다음에 읽힌다
(`app/index.html`, `package.json#files`). 부품 클래스가 붙은 요소에만 걸린다 —
전역 요소 선택자는 두지 않는다.

| 부품               | 요소                         | 정하는 것                                                                                                             |
| ------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `.op-btn`          | `<button>`·`<summary>`       | 높이 24/32, 여백 2px 6px, 글자 12px, 모서리 5px, 테두리 1px, hover·disabled. 기본 색은 `--border-chip`·`--text-muted` |
| `.op-btn--primary` |                              | 파란 테두리·글자(`--stage-plan-*`)                                                                                    |
| `.op-btn--success` |                              | 채운 초록(`--accent-success` 위 `--bg-app` 글자). `is-active`면 선택 고리                                             |
| `.op-btn--warn`    |                              | 경고색 테두리·글자                                                                                                    |
| `.op-btn--danger`  |                              | 위험색 테두리(45%)·글자                                                                                               |
| `.op-btn--ghost`   |                              | 상자 없음, hover·focus·active에서만 옅은 배경                                                                         |
| `.op-btn--icon`    |                              | 정사각(최소 폭 24/32), 여백 2px                                                                                       |
| `.ui-field`        | `<label>`                    | 라벨 글자와 숫자 입력·선택을 한 상자(높이 24/32)에 담는다. 안 컨트롤은 18/26px                                        |
| `.ui-input`        | `<input>`                    | 텍스트·검색·숫자 입력 높이 24/32                                                                                      |
| `.ui-select`       | `<select>`                   | 선택 높이 24/32, 여백 `0 24px 0 6px` — 오른쪽 24px는 전역 `select`가 그리는 12px 화살표 자리다                        |
| `.ui-select--bare` | `<select>`                   | 화살표 없는 선택: 여백 `0 6px`, `background-image: none`. 색은 정하지 않는다                                          |
| `.ui-chip`         | 칩 요소(`<span>`·`<button>`) | 높이 18/22, 여백 0 7px, 글자 11px, 모서리 9px. 색은 정하지 않는다                                                     |

쓰는 법:

- 새 조작은 부품으로만 그린다. 버튼은 `.op-btn`(+ 변형), 입력은 `.ui-input`,
  선택은 `.ui-select`, 라벨과 컨트롤 묶음은 `.ui-field`, 칩은 `.ui-chip`이다.
- 화살표를 그리지 않는 선택(정렬·필터 같은 글자형 선택)은 `.ui-select--bare`다
  (`class="ui-select ui-select--bare worker-sort"`). 역할 규칙의 `background`
  단축 속성(0,1,0)이 전역 `select`(0,0,1)의 화살표 그림을 지우는 select — 레인
  머리 정렬·기간, 후보 타입 필터·정렬 체인, 상세의 값 select, 설정 대화상자의 값
  select, 공급자 재개 선택기 — 가 여기에 든다. 전역 화살표가 그대로 보이는
  select(작업 공간 선택, 칩 팝오버 레인, 새 이슈, 설정의 프리셋·칩 바인딩)는 그
  자리를 지키는 `.ui-select`다.
- 부품 클래스는 역할 클래스 **앞에** 둔다:
  `class="op-btn op-btn--danger rtile__discard"`. 역할 클래스는 이벤트 위임과
  테스트 선택자의 계약이므로 이름을 바꾸지 않는다.
- 칩 모양의 `<button>`(판정 칩·의존 칩·필터 칩, 알약 토글 `⇣ 따라가기`·`펼치기`
  ·`더 보기`)은 `.ui-chip`이다. `.op-btn`을 함께 붙이지 않는다 — 칩은 칩 높이를
  갖는다. 누를 수 없는 상태·종류 배지는 배지로 남는다.
- 칩 상자 안의 버튼(상세의 의존 칩 링크·`✕`, 라벨 칩 `×`)은 그 칩의 내용이다.
  상자에 `.ui-chip`을 붙이고, 안 버튼은 칩의 글자를 물려받는 리셋(`padding: 0`
  ·`font-size: inherit`)만 둔다.
- 상자 없는 글자·아이콘 버튼(ID·경로·세션 ID 복사, `범례 보기`, `✕`·`✎`)은
  `.op-btn--ghost`(아이콘은 `--icon`과 함께)다. 줄 전체가 눌리는 행 버튼(세션
  이력 행, 작업 보고서 머리, 작업 묶음 요약, 의존 후보, leg 행, 설정 레일 탭,
  막힘 요약 항목)은 `.op-btn`이고, 역할 규칙이 행 배치(`display`·`width`
  ·`text-align`)와 여러 줄이면 `white-space: normal`을 적는다. 폭을 채우는
  버튼의 글자가 가운데였다면 역할 규칙이 `justify-content: center`를 적는다(설정
  `닫기`).
- 세그먼트 그룹(설정의 `기본값|standard|fast_track`, `기다림|자동 전환`)은 상자
  역할 규칙(`.settings-dialog__seg`)이 배치·색만 적고, 안 버튼은 `.op-btn`이다.
  켜진 버튼은 `is-active`를 함께 갖는다(`aria-pressed`는 그대로).
- 접기 머리줄 `<summary>`(`저장소 작업 · 검증/배포 선언`,
  `Worker 자동 처리 기준`)는 버튼이 아니라 패널 머리라 부품을 받지 않는다.
- 같은 역할 클래스가 글자 요소와 조작에 같이 붙으면 크기 선언은 글자 요소
  선택자로 좁힌다(`span.detail-kv__v`, `.detail-summary__chip:not(button)`,
  `div.detail-session__usage-detail`) — 조작은 부품이 크기를 정한다.
- 체크박스·라디오(`input[type=checkbox|radio]`)는 부품이 없다 — 자기 크기로
  선다. 필터 줄·툴바에서 다른 조작 옆에 서는 체크박스 토글은 라벨째
  `.ui-field`로 감싸 줄 높이를 맞춘다(`label.ui-field.worker-filter__tgl`, 헤더
  테마 스위치 `label.ui-field.theme-toggle`). 상자 테두리를 그리지 않던 토글은
  역할 규칙이 `border-color: transparent`를 적는다.
- `is-active`는 토글 버튼의 켜짐 상태다(`▶ 자동화`, `⏸ 자동 머지`). 채운 변형만
  고리가 생기고, 테두리 변형은 자기 색이 상태를 말한다.
- 화면의 역할 규칙은 **색과 배치만** 적는다. 높이·여백·글자 크기·모서리를 다시
  적으면 부품을 이겨 단계가 깨진다. 지금 색이 부품 기본 색과 다르면 역할 규칙이
  그 색을 적는다(예: `.worker-merge-all`의 실행 초록, 헤더 버튼의 전역 버튼
  팔레트).

### 선택자 구체도

| 부품                     | 선택자                                                              | 구체도  | 결과                                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.op-btn`·변형           | `:is(button, summary):where(.op-btn…)`                              | (0,0,1) | 전역 `button {}`(0,0,1)과 동률이고 나중에 읽혀 이긴다. 화면의 단일 클래스 규칙(0,1,0)은 언제나 부품을 이긴다 — `.op-btn`이 `styles.css`의 화면 규칙들 **앞**에 있던 때와 같은 결과라, 아직 옮기지 않은 사용처(비교 탭)의 계산 값이 그대로다. 그래서 옮긴 화면은 역할 규칙의 크기 선언을 지운다. hover·disabled는 (0,2,1)·(0,1,1)이다 |
| `.ui-input`·`.ui-select` | `input.ui-input`·`select.ui-select`·`select.ui-select--bare`        | (0,1,1) | 전역 `input[type=…]`(0,1,1)과 동률·나중이라 이긴다. 크기만 적으므로 컨트롤 색은 전역 폼 팔레트가 계속 정한다. `--bare`는 `.ui-select` 다음에 읽혀 여백을 이긴다                                                                                                                                                                      |
| `.ui-field` 안 컨트롤    | `.ui-field > :is(input:not([type=checkbox], [type=radio]), select)` | (0,2,1) | 전역 폼 규칙과 역할 클래스의 크기를 이긴다. 체크박스는 자기 크기다                                                                                                                                                                                                                                                                   |
| `.ui-chip`               | `.ui-chip`                                                          | (0,1,0) | 나중에 읽혀 같은 구체도의 칩 규칙(`.ctl-chip` 등)의 크기를 이긴다. 더 구체적인 칩 크기 규칙은 두지 않는다                                                                                                                                                                                                                            |

Worker와 Monitor가 같이 쓰는 클래스 여섯(`.worker-pane__toggle`, `.worker-sort`,
`.worker-kpi__chip`, `.worker-filter__chip`, `.worker-filter__tgl`,
`.worker-wait__area-toggle`)은 두 탭 모두 부품을 붙여 그리고(공유 템플릿
`paneTemplate`·`waitBody`·`summaryChipsTemplate`·`blockedSummaryTemplate`에는
부품을 켜고 끄는 옵션이 없다), 역할 규칙에는 크기 선언이 없다(UI-k5s2).

역할 규칙의 `:hover`(0,2,0)는 부품의 hover(0,2,1)에 진다. 부품 hover의
`--accent` 색을 받지 않던 버튼은 역할 hover를 `:hover:not(:disabled)`(0,3,0)로
적어 지금 색을 지킨다(예: `.mon2-deck__op`·`.mon-lane-op`·작업 공간
`프로젝트 관리`·Git Pull, 상세·드로어의 `✕`·`✎`·세션 이력 행·`[τ 자세히]`, 설정
레일 탭(선택된 탭의 hover도 함께)·설정 버튼, 저장소 작업 스크립트 경로). 역할
hover가 테두리를 건드리지 않던 테두리 버튼은 그 hover에 지금 테두리 색도
적는다(`.worker-ev__copy`). 역할 hover가 없던 버튼은 부품 hover를 받는다. 같은
이유로 `font: inherit` 같은 단축 속성은 글자 크기·줄 높이를 다시 적으므로 역할
규칙에 두지 않는다 — 글꼴만 물려받을 때는 `font-family: inherit`처럼 longhand를
쓴다.

## 3. 원시 값 금지

검사 구역(4절)과 `components.css`에서는:

- 원시 색(hex·`rgb()`·`hsl()`)을 쓰지 않는다. 색은 역할 토큰이다.
- `height`·`min-height`·`font-size`·`border-radius`(모서리별
  포함)·`padding`(변별 포함)은 토큰만 쓴다. 허용: `var(--토큰)`(fallback 없이),
  `0`, 키워드(`auto` ·`none`·`inherit`·`initial`·`unset`·`fit-content`…),
  레이아웃 상대값 `%`(점의 `50%` 원형, `100%` 채움), 토큰으로 만든
  `calc()`·`min()`·`max()`(곱하는 수는 단위 없는 수). `px`·`rem`·`em`·`vh` 같은
  길이 리터럴과 리터럴 fallback이 있는 `var(--x, 4px)`는 원시 값이다.

예외 절차:

1. 단계에 없는 크기가 필요하면 먼저 기존 토큰
   조합(`calc(var(--h-control) + var(--sp-4))` 같은)으로 표현할 수 있는지 본다.
2. 새 역할이면 `tokens.css`에 역할 이름의 토큰을 더하고 1절 표에 적는다. 색 토큰
   **값**은 이 작업 범위에서 바꾸지 않는다.
3. 규칙을 검사 구역 밖으로 옮겨 검사를 피하지 않는다. 래칫 기준(4절)은 올리지
   않는다 — 피할 수 없으면 PR 설명에 이유와 늘어난 수를 적고 리뷰를 받는다.

## 4. 검사

`app/styles.design-system.test.js`가 지킨다.

1. **구역 검사** — `components.css`와 `styles.css`의 표지 구역에 원시 색이 없고,
   위 크기 속성이 토큰만 쓴다. `components.css`의 모든 선택자는 부품 클래스를
   포함한다.
2. **래칫** — `tokens.css` 밖 모든
   CSS(`styles.css`·`base.css`·`components.css`)의 원시 값 수가 기록된
   기준(`RATCHET_BASELINE`)을 넘지 않는다. 세는 규칙: 주석을 뺀 모든 선언 값의
   원시 색 리터럴 하나하나 + 위 크기 속성 선언 값의 길이 리터럴 하나하나(토큰
   밖·fallback 포함). UI-kqta 착지 전 470(색 194 + 크기 276) → 428 (194 + 234,
   UI-kqta) → 62 (11 + 51, UI-k5s2 tokens — 옛 팔레트를 `tokens.css`로 옮기고
   `.op-btn` 표지 앞의 레거시 공용 CSS와 `base.css`를 토큰으로) → 57 (10 + 47,
   UI-k5s2 monitor — Monitor 탭·헤더·사용량 미터를 부품으로) → 12 (3 + 9,
   UI-k5s2 detail — 이슈 상세·드로어·스크립트 뷰어·Worker 팝오버를 부품으로) → 3
   (0 + 3, UI-k5s2 dialogs — 대화상자와 저장소 작업 선언을 부품으로; 남은 셋은
   비교 탭). 원시 값을 줄인 변경은 기준을 같이 내린다. UI-k5s2가 0으로 내린다.
3. **부품 렌더 검사** — Worker 탭 본문(데스크톱·모바일), 카드 렌더러 변형,
   Monitor 탭 본문(데크·레인·후보 필터, 데스크톱·모바일), 앱 헤더(`index.html`
   마크업에 작업 공간 선택·사용량 미터를 `main.js`처럼 붙인 것, 프로젝트 관리
   팝오버·사용량 계정 카드를 연 상태 포함), 이슈 상세(`#/worker?issue=<id>`가
   여는 패널 — 레인 메뉴·plan 칩 팝오버·제목/설명 편집기를 연 상태 포함), Worker
   탭의 라벨 필터·실패·레인 메뉴·판정 칩 팝오버, 전사 드로어, 저장소 작업
   타임라인 드로어, 스크립트 뷰어, 문서 뷰어, 대화상자(설정 대화상자의 탭 다섯과
   일괄 모드 탭 다섯, 새 이슈, 도움말, 치명 오류, 공급자 재개, 이어하기 지시의
   두 상태, provider 변경 확인, 막힘 요약), Worker 탭의 저장소 작업 선언을 그린
   결과에서 모든 `button`·`input`·`select`가 `.op-btn`·`.ui-input`
   ·`.ui-select`·`.ui-chip` 중 하나를 갖거나 `.ui-field` 안에 있거나 `.ui-chip`
   상자 안의 칩 내용이다(2절). 체크박스·라디오는 부품이 없어(2절) 세지 않는다.
   겹친 표면을 빼는 목록은 없다(UI-k5s2 dialogs가 마지막 겹친 표면을 옮겼다).
   상세·드로어·대화상자에는 JS 모바일 분기가 없어(같은 DOM을 CSS만 바꾼다) 렌더
   검사는 한 번이다. `textarea`는 부품이 없어 검사 대상이 아니다.

검사 구역은 `styles.css` 안의 표지 주석 쌍이다:

```css
/* @ds-region worker:begin */
…
/* @ds-region worker:end */
```

지금 구역(이름 `worker` 9쌍, `header` 3쌍, `monitor` 3쌍, `detail` 6쌍, `drawer`
6쌍, `dialogs` 6쌍, `repo-ops` 4쌍):

- `header` — 앱 헤더 전체(`.app-header`부터 작업 공간 선택, 탭,
  `.header-actions`, 사용량 미터와 그 카드, 로딩, 테마 스위치까지), 사용량
  리본의 ≤640px 블록, Worker 반응형 블록 안의 헤더 줄바꿈 규칙
- `monitor` — Monitor 탭 머리(`모니터 탭`부터 `[일괄 머지]`까지), 레포 데크·레포
  섹션·상호 정지 경고·드롭 표시·터치 끌기 복제본(`모니터 세로 5레인`부터 대기 행
  조작 묶음 앞까지), Monitor 모바일 블록
- Worker 콘솔 — `.worker-console`부터 막힘 요약 `<dialog>` 앞까지, 그 뒤
  `.wait-reason--highlight`부터 `동시 실행` 입력까지(설정 대화상자 규칙 앞)
- 저장소 작업 줄(`.worker-repo-strip`)
- 실행 타일(`.worker-rungrid`·`.rtile*`)부터 전사 드로어 앞까지
- Worker 레인(`Worker lanes`)부터 상세 오버레이 `[↴ 대기로]` 앞까지
- Monitor 구역 안의 공유 카드 규칙 두 곳 — 레포 배지·카드 hover, 그리고 대기 행
  조작 묶음부터 Monitor 모바일 블록 앞까지(의존·판정 칩, 칩 팝오버, route 칩,
  세션 타일)
- Worker 반응형(≤640px) 블록 안의 레인·카드 규칙과 저장소 작업 줄 규칙
- `detail` — 상세 바의 `[↴ 대기로]`·레인 메뉴 자리, 세션 이력과 댓글·작업
  보고서(≤480px 포함), 과업 프롬프트·Worker 이력 절, 요약 헤더·게이트
  스텝퍼·유효 실행 설정 카드와 그 ≤640px 블록, 외부 작업 배지·요약 팝오버·게이트
  감시 상자. 상세의 나머지 규칙(오버레이·편집기·라벨·의존성·산출물·키값 줄)은
  `base.css`에 있다 — 구역 표지는 `styles.css`만 읽지만 래칫이 `base.css`를
  0으로 지킨다
- `drawer` — 스크립트 뷰어, 저장소 작업 타임라인 드로어·정리 스텝퍼, 전사
  드로어(오버레이·`.sv*`·상세 패널 호스트), 전사 드로어의 보낸 프롬프트 칸,
  Worker 반응형 블록 안의 전사·타임라인 드로어 규칙
- `dialogs` — 치명 오류 버튼(`.btn`), 새 이슈·치명 오류 대화상자와 Worker 반응형
  블록 안의 새 이슈 폼 규칙, 막힘 요약 `<dialog>`, 설정 대화상자의 시스템
  프롬프트 절부터 `.op-dialog`(이어하기 지시·provider 변경)·공급자 재개·통합
  설정 대화상자와 그 반응형·터치 블록까지, 도움말 대화상자
- `repo-ops` — 저장소 작업 선언(검증·배포 줄, 스크립트 경로·`배포 실행`, 배지,
  자동 처리 기준, lane 행)과 Worker 탭의 접힌 운영 설정 상자

## 5. 폭 넘침 확인

`scripts/ui-overflow-probe.mjs`가 실제 서버의 한 탭을 390×844(모바일 터치 —
`any-pointer: coarse`가 걸린다)와 1280×900에서 잰다. 설치된 Google Chrome을
`playwright-core`로 띄운다. 클릭하지 않는다.

```sh
# 공유 포트가 아닌 127.0.0.1 개발 서버(BDUI_FRONTEND_MODE=live)에 대고 돌린다.
node scripts/ui-overflow-probe.mjs http://127.0.0.1:<port> '#/worker'
```

- 재는 것: 문서 `scrollWidth - innerWidth`, 보이는 컨테이너(헤더·Worker
  콘솔·툴바 ·필터·레인·카드·타일) 밖으로 나간 자손 상자와 텍스트 조각. 절대·고정
  위치의 자손, 의도된 가로 스크롤러(`overflow-x: auto|scroll`) 안, 말줄임된
  텍스트, select 글자는 뺀다. 판정 규칙은 `scripts/lib/ui-overflow.js`(단위
  테스트 있음)다.
- `#/worker`에서는 툴바 부품의 실제 높이를 함께 적는다 — 1280에서 24px, 390
  터치에서 32px로 하나여야 한다(`(uniform)`).
- 종료 코드: 0 = 두 폭 모두 넘침 없음, 1 = 넘침, 2 = 브라우저나 페이지를 쓸 수
  없음.
- 가짜 데이터 서버는 두지 않는다. 실제 워크스페이스 데이터가 적어 드문 카드
  상태가 안 보이면, 부품 렌더 검사(4절 3)가 그 상태를 그린다.
