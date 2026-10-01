# 디자인 시스템 — 크기 단계와 공용 부품

beads-ui의 지금 색·글꼴은 그대로 두고, 조작(버튼·입력·선택·칩)의
높이·모서리·글자 크기·여백만 하나의 단계와 공용 부품으로 묶는다. 근거와 범위는
`docs/superpowers/specs/2026-10-01-design-system-current-theme-design.md`(UI-kqta)다.

- 적용된 곳: Worker 탭(툴바·KPI·필터·레인 머리·저장소 작업 줄), 공유 카드
  렌더러(`candidateCard`·`miniRow`·`runningTile` — Monitor 카드도 같다), 공용
  헤더 버튼(`?`·`⚙`·`New issue`)과 사용량 미터 칸.
- 아직 아닌 곳: Monitor 전용 표면(레포 데크·레인 머리·툴바·합계 줄·후보 필터),
  이슈 상세, 대화상자, 전사 드로어, 비교·ADR 탭. UI-k5s2가 같은 규칙으로 옮긴다.
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
- 옛 `app/styles.css` `:root`의 `--space-1..8`은 같은 값의 `--sp-*` 별칭이다.
  `--space-9`·`--space-10`과 옛 색 이름(`--fg`·`--muted`·`--border`·`--panel-bg`
  ·`--control-*`·`--button-*`)은 tokens.css에 같은 값이 없어 지금 값을 유지한다.

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
| `.ui-select`       | `<select>`                   | 선택 높이 24/32                                                                                                       |
| `.ui-chip`         | 칩 요소(`<span>`·`<button>`) | 높이 18/22, 여백 0 7px, 글자 11px, 모서리 9px. 색은 정하지 않는다                                                     |

쓰는 법:

- 새 조작은 부품으로만 그린다. 버튼은 `.op-btn`(+ 변형), 입력은 `.ui-input`,
  선택은 `.ui-select`, 라벨과 컨트롤 묶음은 `.ui-field`, 칩은 `.ui-chip`이다.
- 부품 클래스는 역할 클래스 **앞에** 둔다:
  `class="op-btn op-btn--danger rtile__discard"`. 역할 클래스는 이벤트 위임과
  테스트 선택자의 계약이므로 이름을 바꾸지 않는다.
- 칩 모양의 `<button>`(판정 칩·의존 칩·필터 칩)은 `.ui-chip`이다. `.op-btn`을
  함께 붙이지 않는다 — 칩은 칩 높이를 갖는다.
- `is-active`는 토글 버튼의 켜짐 상태다(`▶ 자동화`, `⏸ 자동 머지`). 채운 변형만
  고리가 생기고, 테두리 변형은 자기 색이 상태를 말한다.
- 화면의 역할 규칙은 **색과 배치만** 적는다. 높이·여백·글자 크기·모서리를 다시
  적으면 부품을 이겨 단계가 깨진다. 지금 색이 부품 기본 색과 다르면 역할 규칙이
  그 색을 적는다(예: `.worker-merge-all`의 실행 초록, 헤더 버튼의 전역 버튼
  팔레트).

### 선택자 구체도

| 부품                     | 선택자                                                              | 구체도  | 결과                                                                                                                                                                                                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.op-btn`·변형           | `:is(button, summary):where(.op-btn…)`                              | (0,0,1) | 전역 `button {}`(0,0,1)과 동률이고 나중에 읽혀 이긴다. 화면의 단일 클래스 규칙(0,1,0)은 언제나 부품을 이긴다 — `.op-btn`이 `styles.css`의 화면 규칙들 **앞**에 있던 때와 같은 결과라, Worker 밖 사용처(비교·상세·세션 이력·설정·공급자 재개·이어하기 대화상자)의 계산 값이 그대로다. hover·disabled는 (0,2,1)·(0,1,1)이다 |
| `.ui-input`·`.ui-select` | `input.ui-input`·`select.ui-select`                                 | (0,1,1) | 전역 `input[type=…]`(0,1,1)과 동률·나중이라 이긴다. 크기만 적으므로 컨트롤 색은 전역 폼 팔레트가 계속 정한다                                                                                                                                                                                                              |
| `.ui-field` 안 컨트롤    | `.ui-field > :is(input:not([type=checkbox], [type=radio]), select)` | (0,2,1) | 전역 폼 규칙과 역할 클래스의 크기를 이긴다. 체크박스는 자기 크기다                                                                                                                                                                                                                                                        |
| `.ui-chip`               | `.ui-chip`                                                          | (0,1,0) | 나중에 읽혀 같은 구체도의 칩 규칙(`.ctl-chip` 등)의 크기를 이긴다. 더 구체적인 칩 크기 규칙은 두지 않는다                                                                                                                                                                                                                 |

Monitor 전용 표면과 같이 쓰는 클래스(`.worker-pane__toggle`·`.worker-sort`
·`.worker-kpi__chip`·`.worker-filter__chip`·`.worker-filter__tgl`)는 그쪽을 위해
지금 크기 규칙을 남겨 두었다. Worker 탭은 같은 요소에 부품을
붙여(`parts: true`로 그리는 공유 템플릿 포함) 크기를 받는다. UI-k5s2가 Monitor를
옮기면 남은 크기 규칙을 지운다.

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
   밖·fallback 포함). UI-kqta 착지 전 470(색 194 + 크기 276) → 428 (194 + 234).
   원시 값을 줄인 변경은 기준을 같이 내린다. UI-k5s2가 0으로 내린다.
3. **부품 렌더 검사** — Worker 탭 본문(데스크톱·모바일)과 카드 렌더러 변형을
   그린 결과에서 모든 `button`·`input`·`select`가 `.op-btn`·`.ui-input`
   ·`.ui-select`·`.ui-chip` 중 하나를 갖거나 `.ui-field` 안에 있다. 겹친 표면은
   UI-k5s2 범위라 뺀다: `dialog`, `.chip-popover`, `.rtile__failure-pop`,
   `.place-menu`(상세 패널과 같이 쓰는 레인 메뉴), `.worker-filter__labels-pop`,
   `.worker-repo-drawer`, `.worker-drawer-host`,
   `.worker-repo-ops-settings`(설정과 같은 저장소 작업 선언).

검사 구역은 `styles.css` 안의 표지 주석 쌍이다:

```css
/* @ds-region worker:begin */
…
/* @ds-region worker:end */
```

지금 구역(이름 `worker` 9쌍, `header` 1쌍):

- `header` — `.header-actions`·헤더 버튼·사용량 미터 칸
- Worker 콘솔 — `.worker-console`부터 막힘 요약 `<dialog>` 앞까지, 그 뒤
  `.wait-reason--highlight`부터 `동시 실행` 입력까지(설정 대화상자 규칙 앞)
- 저장소 작업 줄(`.worker-repo-strip`)
- 실행 타일(`.worker-rungrid`·`.rtile*`)부터 전사 드로어 앞까지
- Worker 레인(`Worker lanes`)부터 상세 오버레이 `[↴ 대기로]` 앞까지
- Monitor 구역 안의 공유 카드 규칙 두 곳 — 레포 배지·카드 hover, 그리고 대기 행
  조작 묶음부터 Monitor 모바일 블록 앞까지(의존·판정 칩, 칩 팝오버, route 칩,
  세션 타일)
- Worker 반응형(≤640px) 블록 안의 레인·카드 규칙과 저장소 작업 줄 규칙

전사 드로어·저장소 작업 드로어·스크립트 뷰어·막힘 요약 대화상자·터치 끌기
복제본은 구역 밖이다(겹친 표면, UI-k5s2).

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
