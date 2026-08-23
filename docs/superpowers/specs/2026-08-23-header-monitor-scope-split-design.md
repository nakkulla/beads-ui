---
scope:
  - app/index.html
  - app/views/nav.js
  - app/views/nav.test.js
  - app/main.js
  - app/styles/base.css
  - app/styles.css
---

# 헤더 — Monitor 단독 버튼과 레포 범위 캡슐

## 배경과 목적

Monitor 탭(UI-qrfo)은 서버 전역 집계 구독(`subscribe-monitor-pipeline`) 하나로
모든 visible 레포의 파이프라인을 보는 **크로스 레포** 화면이다. 카드를 클릭하면
스스로 `switchWorkspace(root_dir)`를 거쳐 그 레포의 Board로 내려간다
(`app/views/monitor/index.js` `openRow`). 반면 Board·Worker는 선택된 레포
하나에 종속된다.

현재 헤더는 `[Beads] [선택기][프로젝트 관리][⬇] Board Worker Monitor …`로 세
탭을 같은 층위에 두어, 선택기가 세 탭 모두의 접두어처럼 읽힌다. Monitor 활성
중에도 "dotfiles의 Monitor"로 오독되고, Monitor가 Board/Worker의 상위 집합이라는
사실이 구조에서 드러나지 않는다.

이 spec은 헤더 왼쪽을 **범위(전역 vs 레포)가 위치와 테두리로 읽히는** 구조로
바꾼다. 사용자가 승인한 목업은
`~/tmp/mockups/2026-08-23-header-monitor-split.html`의 A′ 섹션이며, 라우터·상태·
Monitor 데이터 경로는 바꾸지 않는다.

## 설계

### 1. 헤더 왼쪽 구조 (`app/index.html`)

```
[Beads]  [⁘ Monitor]  │  ┌ 선택기▾ · 관리 · ⬇ │ Board · Worker ┐
```

`.header-left` 안의 순서와 마운트:

| 순서 | 요소 | 역할 |
|---|---|---|
| 1 | `h1.app-title` | 브랜드(변경 없음) |
| 2 | `nav#global-nav.header-nav.header-nav--global` `aria-label="Global"` | nav.js가 Monitor 링크 하나를 렌더 |
| 3 | `span.header-divider` `aria-hidden="true"` | 세로 구분선 |
| 4 | `div#repo-scope.repo-scope` | **레포 범위 캡슐** — 아래 4a·4b·4c를 감싸는 테두리 상자 |
| 4a | `div#workspace-picker.header-workspace` | 기존 workspace picker 마운트(변경 없음 — 선택기·관리·⬇) |
| 4b | `span.repo-scope__sep` `aria-hidden="true"` | 캡슐 내부 세로 구분선 |
| 4c | `nav#top-nav.header-nav` `aria-label="Repository"` | nav.js가 Board·Worker 탭을 렌더 |

`#workspace-picker`와 `#top-nav` id는 유지한다(main.js의 `getElementById` 호출과
기존 테스트 셀렉터 보호). `#global-nav`만 새 id다. `.header-actions`(사용량
미터·Dark·⚙·New issue)는 변경 없음.

### 2. 탭 렌더 분리 (`app/views/nav.js`)

`createTopNav`의 첫 인자를 한 요소에서 **두 마운트 객체**로 바꾼다:

```js
createTopNav({ global_element, repo_element }, store, router)
```

- `global_element`에는 `a.ctl-tab.ctl-tab--monitor[href="#/monitor"]` 하나를
  렌더한다. 링크 안은 `span.ctl-tab__dots[aria-hidden]`(2×2 점 글리프, 4개
  `<i>`) + 텍스트 `Monitor`.
- `repo_element`에는 기존 `.ctl-tabs` 안에 `a.ctl-tab[href="#/board"]`,
  `a.ctl-tab[href="#/worker"]` 두 개를 렌더한다.
- 활성 판정·`is-active` 클래스·`onClick(view)` → `router.gotoView(view)`는
  종전과 같다. Monitor 활성이면 repo 쪽 두 탭 모두 `is-active`가 없다.
- 두 마운트 모두 `store.subscribe` 한 번으로 같이 다시 그린다. `destroy()`는
  두 마운트를 모두 비운다.
- 어느 한 마운트가 없으면(`null`) 그 쪽 렌더만 건너뛴다 — main.js가 두 id 중
  하나라도 못 찾는 경우에 대한 fail-quiet.

`main.js`의 호출은 `createTopNav({ global_element: #global-nav, repo_element:
#top-nav }, store, router)`로 바꾼다(`nav_mount` 한 개 → 두 개 조회).

### 3. 캡슐 흐림 상태 (`app/main.js` `onRouteChange`)

`onRouteChange`는 이미 뷰별 root `hidden`을 토글하는 자리다. 같은 곳에서
`#repo-scope`에 `is-quiet` 클래스를 `s.view === 'monitor'`일 때만 붙인다. 요소가
없으면 건너뛴다. 흐림은 CSS만의 효과(§4)이고 캡슐 안 컨트롤의 동작·탭 순서·
포커스 가능성은 바뀌지 않는다.

JS가 클래스를 쓰는 이유: nav.js가 조상 요소를 건드리지 않게 하고(마운트 경계
유지), CSS `:has()` 의존 없이 jsdom 테스트로 상태를 확인할 수 있게 하기 위해서다.

### 4. 스타일 (`app/styles/base.css` nav 블록, `app/styles.css` 반응형)

모든 색은 `tokens.css` 변수만 쓴다(raw hex 금지, 라이트 테마는 토큰 오버라이드로
자동 대응).

`base.css` `/* --- nav (2-tab control tower) --- */` 블록을 아래로 교체·확장한다.

| 선택자 | 규칙 |
|---|---|
| `.header-divider` | `width:1px; height:22px; background:var(--border-chip)` |
| `.repo-scope` | `display:inline-flex; align-items:stretch; gap:var(--sp-2); padding:var(--sp-2); border:1px solid var(--border-card); border-radius:var(--r-9); background:var(--bg-drawer); transition: opacity .18s ease, filter .18s ease` |
| `.repo-scope__sep` | `width:1px; margin:var(--sp-4) var(--sp-2); background:var(--border-card)` |
| `.repo-scope .header-workspace` | `padding: 0 var(--sp-6) 0 var(--sp-4)` |
| `.repo-scope .workspace-picker__select` | `border-color:transparent; background-color:transparent`(테두리 폭·스타일과 화살표 `background-image`는 보존 — `border`·`background` 단축 속성을 쓰지 않는다), `height:24px`, `font-weight:600`, `color:var(--text-title)`, `min-width:0`; `:hover`/`:focus`에서 기존 `border-color` 규칙이 그대로 복귀(드롭다운임이 드러나게) |
| `.repo-scope .workspace-picker__manage-button`, `.repo-scope .workspace-picker__git-pull-button` | `border-color:transparent; background-color:transparent`(같은 이유로 단축 속성 금지), 높이 22px, `color:var(--text-muted)`; `:hover`/`:focus`에서 기존 `border-color` 규칙 복귀 + `color:var(--text-primary)` |
| `.repo-scope .ctl-tab` | `padding:var(--sp-3) var(--sp-11,11px); border-radius:var(--r-7); font-size:13.5px` (캡슐 안에서 한 단 작게) |
| `.repo-scope.is-quiet` | `opacity:.45; filter:saturate(.6)` |
| `.repo-scope.is-quiet:hover, .repo-scope.is-quiet:focus-within` | `opacity:1; filter:none` |
| `.ctl-tab--monitor` | `display:inline-flex; align-items:center; gap:var(--sp-7); padding-left:var(--sp-10)` |
| `.ctl-tab__dots` | `display:inline-grid; grid-template-columns:repeat(2,5px); gap:var(--sp-2)`; `i`는 5×5 원, `background:currentColor; opacity:.55` |
| `.ctl-tab--monitor.is-active .ctl-tab__dots i` | `opacity:1`, 네 점 순서대로 `--stage-spec-on`·`--stage-plan-on`·`--stage-impl-on`·`--accent-success` |

`.ctl-tabs`·`.ctl-tab`·`.ctl-tab:hover`·`.ctl-tab.is-active` 기본 규칙은 유지한다.
`opacity .45`는 하한이다(흐린 상태에서도 레포명이 읽혀야 한다).

`styles.css` ≤640px 블록: `.header-left`가 이미 `flex-wrap`이므로 캡슐은 한
덩어리로 줄바꿈된다. 추가로 `.repo-scope { flex-wrap: wrap }`만 허용해 좁은 폭에서
선택기 행과 탭 행이 캡슐 안에서 두 줄로 갈라지게 한다. `prefers-reduced-motion:
reduce`에서는 `.repo-scope`의 `transition`을 끈다.

### 5. 접근성·키보드

- Monitor 링크와 Board/Worker 탭은 모두 `<a href>`라 탭 순서는 DOM 순서(Monitor →
  선택기 → 관리 → ⬇ → Board → Worker)다. 흐림은 `opacity`뿐이라 포커스 가능성·
  스크린리더 노출은 변하지 않고, `focus-within`이 흐림을 즉시 푼다.
- 점 글리프는 `aria-hidden`이며 접근성 이름은 텍스트 `Monitor` 그대로다.
- `nav` 두 개는 `aria-label`로 구분된다(`Global`·`Repository`).

### 6. 변경하지 않는 것

- `app/router.js`·`app/state.js`·`#/monitor` 라우트·`beads-ui.view` 저장·
  `ensureMonitorPipelineChannel` 등 뷰 전환 부작용.
- `app/views/workspace-picker.js`의 동작과 마크업(선택·관리 팝오버·Git Pull).
  캡슐 안에서의 외형만 §4 CSS가 덮어쓴다.
- `.header-actions`와 New issue. New issue가 Monitor 활성 중에도 "현재 레포"에
  생성된다는 사실은 캡슐 안 선택기가 그대로 보여 주므로 이 spec 범위 밖이다.

## 테스트 범위

- `app/views/nav.test.js`: (a) 두 마운트에 각각 Monitor 1개·Board/Worker 2개가
  렌더되고 클릭이 `gotoView('monitor'|'board'|'worker')`를 부른다, (b) Monitor
  활성이면 global 쪽 링크만 `is-active`이고 repo 쪽은 둘 다 없다, (c) Board
  활성이면 repo 쪽 Board만 `is-active`, (d) 한 마운트가 `null`이어도 throw 없이
  나머지를 렌더한다, (e) `destroy()`가 두 마운트를 비운다.
- `app/main.js` `onRouteChange`의 `is-quiet` 토글: 기존 `main.*.test.js` 중 셸
  DOM을 `index.html`과 같이 꾸미는 테스트가 없으므로, `nav.test.js`에 두지 말고
  `app/main.view-sync.test.js`와 같은 부트스트랩 방식으로 `#repo-scope`를 body에
  두고 `#/monitor` ↔ `#/board` 전환 시 클래스 유무를 확인하는 테스트 1건을
  추가한다(기존 파일 패턴을 따른다).
- CSS 회귀 가드: `app/styles.worker-theme.test.js`와 같은 방식으로 `base.css`
  nav 블록에 `.repo-scope.is-quiet` 규칙이 있고 그 블록에 raw hex가 없음을 확인.
- 수동: 1440px에서 Monitor/Board/Worker 전환 시 헤더 폭·캡슐 위치가 움직이지
  않는다, Monitor 활성에서 캡슐 hover/탭 포커스에 흐림이 풀린다, 관리 팝오버·
  ⬇·드롭다운이 Monitor 활성에서도 동작한다, 라이트 테마에서 캡슐 대비가
  읽힌다.

## 수용 기준

1. Monitor 활성 시 `#global-nav a.is-active`가 `Monitor`이고 `#top-nav`에
   `is-active`가 없으며 `#repo-scope.is-quiet`가 붙는다.
2. Board/Worker 활성 시 `#repo-scope`에 `is-quiet`가 없고 해당 탭만
   `is-active`다.
3. 뷰 전환으로 `.header-left`의 자식 수와 순서가 바뀌지 않는다(선택기 숨김 없음).
4. `npm run tsc`·`npm test`·`npm run lint`·`npm run prettier:write`가 통과하고
   `npm run build`로 `app/main.bundle.js{,.map}`이 갱신된다.
