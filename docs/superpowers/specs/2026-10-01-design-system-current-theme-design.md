---
scope:
  - app/styles/
  - app/styles.css
  - app/index.html
  - app/views/worker/
  - app/main.js
  - app/styles.worker-theme.test.js
  - scripts/
  - package.json
  - docs/design-system.md
  - AGENTS.md
---

# 지금 테마를 유지한 디자인 시스템 — 기반과 Worker 탭 (UI-kqta)

## 1. 목표

beads-ui의 지금 색·글꼴·인상은 그대로 둔다. 대신 크기 단계·공용 조작 부품·검사·문서 규칙을 갖춘 디자인 시스템으로 묶어, 조작마다 높이·모서리·글자 크기·여백이 제각각인 상태를 없앤다. 이 이슈는 다음을 착지한다:

- 토큰 크기 단계
- 공용 부품 CSS
- 강제 검사
- 문서 규칙
- 실제 서버 대상 폭 넘침 탐침
- 위 규칙을 Worker 탭과 공용 헤더에 적용

나머지 화면은 형제 UI-k5s2가 같은 규칙으로 옮긴다.

사용자 결정(2026-10-01):
- PR #338의 새 테마(Radix·Pretendard)는 적용하지 않고 지금 테마를 유지한다.
- 크기는 B안 24px 단계로 한다. 비교 목업: `http://100.122.98.8:9000/2026-10-01-ui-kqta-control-scale.html`
- 기반과 Worker 탭을 먼저 착지한다.
- 강제는 vitest CSS 검사와 문서 규칙으로 한다.
- 폭 넘침은 가짜 데이터 서버 없이 검사한다.

예로 든 Worker 툴바는 현재 높이가 제각각이다:

| 조작 | 지금 높이 |
| --- | --- |
| `▶ 자동화` | 22px |
| `⏸ 자동 머지` | 약 17px |
| `동시 실행`·`직렬 레인` 묶음 | 38~43px |
| 검색·`+ 새 이슈` | 24px |

비목표:
- 색 값·글꼴 바꾸기(라이트 테마의 부분 덮어쓰기 보완 포함)
- 카드 줄 순서·슬롯·칩 의미(카드 문법 스펙과 ADR UI-nuwy)
- 조작의 동작(`자동화`·`자동 머지` 등)
- Worker 밖 화면(UI-k5s2)

## 2. 검증된 전제

base `4be748eaeab7f6de6e8b0f4018d728bde0767da0` 기준이다.

**토큰과 CSS 로드**
- `app/styles/tokens.css`의 구성(218줄) — app/styles/tokens.css:15,111-113,168
  - `:root` 다크 기본값: 색·`--r-2..10`·`--sp-1..16`·`--fs-label-tiny`(10px)~`--fs-title-lg`(17px)
  - `[data-theme='light']` 부분 덮어쓰기
  - 조작 높이 토큰은 없다
- `app/styles.css`(12,185줄)에는 옛 `:root`·테마 블록이 따로 있다 — app/styles.css:1,95,1266,1333,1411,1950,2004,2051,2107-2140
  - 밝은 팔레트 `--fg`·`--bg`, `--space-0..10`, `--link`, `--control-*`·`--button-*`
  - 같은 역할의 이름이 두 벌이다(`--space-N`/`--sp-N`, `--fg`/`--text-*`)
- CSS는 tokens → base → styles 순으로 읽힌다. 배포 파일 목록에 세 파일이 있다 — app/index.html:7-9, package.json:64-69

**전역 폼 규칙과 부품 후보**
- 전역 폼 규칙이 `input[type=text|search|number]`·`select`·`button`에 걸린다 — app/styles.css:1008-1056
  - 선택자 구체도가 (0,1,1)이라 단일 클래스 규칙(0,1,0)을 이긴다(예: `.worker-search`, `.worker-slots__input`).
- `.op-btn`은 min-height 24px이고 `(any-pointer: coarse), (max-width: 640px)`에서 32px이다. 2026-09-02 조작 표면 스펙이 정의했다 — app/styles.css:2763-2841(분기 :2828); docs/superpowers/specs/2026-09-02-worker-operation-surface-unify-design.md:96-125
- `.op-btn`은 9개 파일에서 43번 쓰인다. 그중 Worker 밖은 비교·상세·세션 이력·설정(일괄·실행)·공급자 재개 대화상자다 — 명령: `git grep -c op-btn -- 'app/views/**/*.js' ':!*.test.js'`(2026-10-01)
- 카드 렌더러 `candidateCard`·`miniRow`·`runningTile`은 Worker와 Monitor가 공유한다. 정의는 app/views/worker/lanes.js·running-grid.js에 있고, Monitor는 app/views/monitor/index.js에서 같은 렌더러를 쓴다. 공유 사실은 ADR UI-nuwy 승계 조항(UI-u6ud-8)이 고정한다 — docs/adr/UI-nuwy-same-worker-session-conversation-and-return.md:262
- 버튼 계열 클래스는 약 15개, 칩 69·알약 11·배지 45개다. 쓰이는 원시 글자 크기는 13종(8~28px)이다 — 명령: `grep -oE` 집계(2026-10-01)

**Worker 툴바**
- 마크업 — app/views/worker/index.js:3704,3749,3760,3781,3790,4187-4213
- 스타일 — app/styles.css:2874,3180-3224,7014-7025

**기존 검사와 도구**
- CSS를 직접 읽는 vitest 검사가 있다. styles.css를 표지나 중괄호로 잘라 읽는다 — app/styles.worker-theme.test.js:65-70,759-773; app/styles.nav-theme.test.js:41
- stylelint·Playwright 의존성이 없다 — package.json(devDependencies)
- Google Chrome이 설치되어 있다 — 명령: `ls /Applications`(Google Chrome.app)

**참고 구현과 ADR**
- PR #338 브랜치 `UI-dbn6`에 참고 구현이 있다(값은 쓰지 않는다)
  - 부품 층: `app/ui/`(59618758, a7331670)
  - 넘침 탐침: `scripts/ui-shots-lib.mjs` `overflowOf`·`overflowProbe`(fb88b002). 문서 `scrollWidth`와 컨테이너 밖 자손 상자·텍스트 조각을 잰다.
- 현재 유효한 ADR 중 시각 체계를 다루는 것은 없다 — docs/adr/README.md:8-19

## 3. 설계

### 3.1 토큰

`tokens.css`에 크기 토큰을 더한다. 색 토큰 값은 바꾸지 않는다. 이름은 예다.

| 토큰 | 값 | 비고 |
| --- | --- | --- |
| `--h-control` | 24px | |
| `--h-control-coarse` | 32px | |
| `--h-chip` | 18px | |
| `--h-chip-coarse` | 22px | |
| `--fs-control` | `--fs-small` 12px | |
| `--fs-chip` | 11px | 기존 |
| `--r-control` | `--r-5` | |
| `--r-chip` | `--r-9` | |
| `--px-control` | 10px | |
| `--gap-control` | `--sp-6` | |

`(any-pointer: coarse), (max-width: 640px)`에서는 조작·칩 높이가 coarse 값으로 바뀐다. 이 분기는 지금 `.op-btn` 분기(app/styles.css:2828)와 같다.

옛 `:root` 블록에서 같은 역할의 이름은 이렇게 정리한다:
- 지금 화면에 실제로 렌더되는 값이 같으면 tokens.css 이름의 별칭으로 합친다.
- 값이 다르면 이 이슈의 적용 범위에서는 지금 보이는 값을 유지한다.

### 3.2 공용 부품

새 파일 `app/styles/components.css`에 부품을 정의한다. styles.css 다음에 로드하고 `index.html`·`package.json#files`에 추가한다.

결정: 버튼 부품은 새 클래스를 만들지 않고 기존 `.op-btn`을 승격한다 — 2026-09-02 스펙이 크기·아이콘·글자 규칙을 이미 정했고 9개 파일 43곳이 쓴다.

결정: 승격 때 `.op-btn`과 기존 변형(`--primary`·`--icon`·`--ghost`)의 계산 값(높이 24/32px, 글자 `--fs-small`, 모서리 `--r-5`, 여백)은 바꾸지 않는다 — Worker 밖의 `.op-btn` 사용처(비교·상세·설정·대화상자)가 이 이슈에서 모양을 바꾸지 않게 하기 위해서다. 승격은 값을 3.1 토큰 참조로 옮기고 새 변형(`--success`·`--warn`·`--danger`)을 더하는 것뿐이다.

| 부품 | 용도 |
| --- | --- |
| `.op-btn` | 변형 `--primary`·`--success`·`--warn`·`--danger`·`--ghost`·`--icon`. 켜짐 상태 `is-active`는 토글 버튼(`▶ 자동화`, `⏸ 자동 머지`)에 쓴다 |
| `.ui-field` | 라벨과 숫자 입력·선택을 한 상자(높이 `--h-control`)에 묶는다 |
| `.ui-input` | 텍스트·검색·숫자 입력 |
| `.ui-select` | 선택 |
| `.ui-chip` | 칩·알약 공통 모양(높이·여백·모서리·글자). 색 변형은 기존 역할 토큰을 쓴다 |

부품 선택자는 전역 폼 규칙보다 구체도가 낮지 않아야 한다(예: `button.op-btn`, `input.ui-input`, `select.ui-select`). 그래야 2절의 전역 규칙에 지지 않는다. 높이·글자·모서리·여백 값은 3.1 토큰만 쓴다.

### 3.3 Worker 탭과 헤더 적용

- **대상**:
  - Worker 탭 전용 표면: 툴바·KPI·필터·레인 머리
  - 공유 카드 렌더러(`candidateCard`·`miniRow`·`runningTile`)의 버튼·칩. 이 렌더러는 Monitor도 쓰므로 Monitor의 카드도 함께 바뀐다(의도된 변경).
  - 공용 헤더의 버튼(`#help-btn`, `#display-settings-btn`, `#new-issue-btn`)과 사용량 미터 칸
- **바꾸지 않는 것**: Monitor 전용 표면(레포 띠·레인 머리·툴바·합계 줄), 이슈 상세, 대화상자(설정·새 이슈·도움말·치명 오류·공급자 재개), 전사 드로어, 비교·ADR 탭. 이들은 UI-k5s2가 옮긴다. 이 표면들의 마크업과 크기 규칙은 이 이슈에서 건드리지 않는다. 함께 쓰는 `.op-btn`은 3.2 결정대로 계산 값이 그대로다.
- **바꾸는 것**: 대상 마크업에 부품 클래스를 붙이고 대상 전용 크기 규칙을 지운다. 색·배치·줄 순서·문구·동작은 바꾸지 않는다.
- **툴바 예시**:
  - `▶ 자동화` → `.op-btn--success`
  - `⏸ 자동 머지` → `.op-btn--warn`
  - `동시 실행`·`직렬 레인` → `.ui-field`
  - 검색 → `.ui-input`
  - `+ 새 이슈` → `.op-btn--primary`
- **모양 보존 기준**: "바꾸지 않는 것"의 표면은 전후 캡처(390·1280, 다크)에서 조작·칩의 높이·모서리·글자 크기가 같아야 한다. components.css는 전역 요소 선택자를 걸지 않고, 부품 클래스가 붙은 요소에만 적용된다.

### 3.4 검사와 문서

`app/styles.design-system.test.js`(이름은 예)에 vitest 검사를 둔다:
1. components.css와 Worker 영역 CSS에는 원시 색(hex·rgb)이 없고, `height`·`min-height`·`font-size`·`border-radius`·`padding`이 토큰만 쓴다.
2. 래칫: tokens.css 밖 전체 CSS의 원시 색·크기 값 개수가 기록된 기준을 넘지 않는다. 기준은 이 이슈 착지 때 줄이고 UI-k5s2가 0으로 내린다.
3. Worker 탭 본문(툴바·KPI·필터·레인·카드)을 렌더한 결과에서 모든 `button`·`input`·`select`가 부품 클래스(`.op-btn`·`.ui-input`·`.ui-select`, `.ui-field` 안 컨트롤)를 가진다. 상세 패널·대화상자 같은 겹친 표면은 UI-k5s2 범위라 제외한다.

styles.css를 잘라 읽는 기존 테스트(`styles.worker-theme.test.js` 등)는 규칙이 옮겨 간 위치에 맞게 고친다. 이것은 의도된 변경이다.

`docs/design-system.md`에 다음을 적는다:
- 토큰 표
- 부품 목록과 쓰는 법
- 새 조작은 부품으로만 그린다
- 원시 값 금지와 예외 절차
- 폭 넘침 확인 방법

`AGENTS.md`에는 그 문서를 가리키는 한 줄만 더한다.

### 3.5 폭 넘침 탐침

`scripts/ui-overflow-probe.mjs`를 둔다.
- 입력: 실제 서버 URL과 탭 해시
- 측정: 390×844(모바일 터치)와 1280×900에서 두 가지를 잰다.
  - 문서의 `scrollWidth - innerWidth`
  - 보이는 컨테이너 밖으로 나간 자손 상자·텍스트 조각(PR #338 `overflowProbe` 규칙)
- 종료 코드: 넘침이 0이면 0, 넘침이 있으면 1, 브라우저가 없으면 2

결정: 의존성은 devDependency `playwright-core`로 하고 설치된 Google Chrome(`channel: 'chrome'`)을 쓴다 — 레이아웃 측정에는 실제 브라우저가 필요하고, 전체 `playwright`는 브라우저 내려받기가 따른다.

대상 서버는 워크트리에서 띄운 공유 포트가 아닌 `127.0.0.1` 개발 서버(`BDUI_FRONTEND_MODE=live`, 실제 워크스페이스 데이터)다. 가짜 데이터 서버는 두지 않는다. 이 이슈는 Worker 탭(`#/worker`)과 헤더를 0으로 맞춘다.

## 4. 수용 기준

1. tokens.css에 3.1 크기 토큰이 있고, 색 토큰 값의 diff가 없다.
2. components.css가 3.2 부품을 정의하고, `index.html`·`package.json#files`에 들어 있다.
3. Worker 툴바의 모든 조작은 탐침 측정에서 같은 높이다. 1280에서 24px, 390 터치에서 32px이다.
4. `scripts/ui-overflow-probe.mjs <dev-url> '#/worker'`가 390·1280 모두에서 넘침 0으로 끝난다.
5. 3.4 검사 1~3이 통과한다. 래칫 기준은 착지 전 값보다 작다.
6. 전후 캡처(390·1280, 다크·라이트)에서 Worker 탭 색이 같다. 3.3 "바꾸지 않는 것" 표면(Monitor 레포 띠·툴바, 상세, 설정 대화상자, 비교·ADR 탭)은 전후 캡처에서 조작·칩의 높이·모서리·글자 크기가 같다. 공유 카드의 Monitor 쪽 변화만 예외다. 캡처는 완료 보고서에 목업 서비스 링크로 남긴다.
7. `docs/design-system.md`가 있고, `AGENTS.md`가 그 문서를 가리킨다.
8. Pre-Handoff Validation이 통과한다(`npm run tsc`, `npm run lint`, prettier, `npx vitest run --reporter=dot`).

## 5. 테스트

- 신설: 디자인 시스템 CSS 검사(3.4의 1~3), 탐침의 넘침 판정 함수 단위 테스트(가짜 rect 입력)
- 수정: `app/styles.worker-theme.test.js` 등 styles.css 구간을 읽는 테스트의 선택자·위치, Worker 툴바 렌더 테스트의 클래스 단언

## 6. 결정 (ADR 후보)

- 전제: ADR UI-nuwy — 카드 슬롯과 줄 문법은 바꾸지 않는다. 새 버튼·칩을 달지 않고 모양만 바꾼다.
- 전제: ADR UI-u6ud-5 — 번들은 배포 때 빌드한다. 새 CSS 파일은 `package.json#files`와 `index.html`에 둔다.
- beads-ui 화면의 조작은 지금 테마의 색과 글꼴을 유지한 채 크기 토큰과 공용 부품 클래스로만 그린다(조작 24px, 터치·좁은 폭 32px, 칩 18px). 이 규칙은 vitest CSS 검사와 `docs/design-system.md`로 지킨다 — 기본 제외 목록(UI 배치·칩·버튼)에 속한다. 규칙의 정본은 `docs/design-system.md`와 그 검사이고, 되돌림은 이 저장소의 CSS·문서·검사를 고치는 일로 끝난다. 공유 카드 렌더러의 줄·슬롯 조항(ADR UI-nuwy)은 건드리지 않는다 → ADR 아님
- 탐침 의존성으로 `playwright-core`와 설치된 Chrome을 쓴다 — 되돌리기 쉬움(devDependency 하나와 스크립트 하나) → ADR 아님

## 7. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | beads-ui | user_request | 다음 소유자가 앞 결과의 수용을 요구 — 토큰·부품·검사·탐침이 착지해야 나머지 화면을 그 위로 옮긴다(사용자 결정 "기반 + Worker 먼저") | UI-kqta | UI-k5s2 |

- UI-k5s2는 이 스펙으로 Monitor 탭, 이슈 상세, 대화상자(설정·새 이슈·도움말·치명 오류), 전사 드로어, 비교·ADR 탭, 사용량 미터, 헤더 테마 스위치·설정 세그먼트를 옮긴다. 이어서 래칫 기준을 0으로 내리고 탐침을 모든 탭으로 넓힌다.
- 이식 quick fix UI-97xm(Worker 탭 터치 끌기 등)과 UI-yu2o(모니터 레포 띠)는 각자 CSS를 조금 바꾼다. 먼저 착지한 쪽의 규칙은 이 이슈나 UI-k5s2가 부품으로 옮긴다. 선행 관계는 없다.
