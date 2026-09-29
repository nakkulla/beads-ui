---
scope:
  - app/views/worker/transcript-drawer.js
  - app/views/worker/transcript-drawer.test.js
  - app/utils/transcript-lines.js
  - app/styles.css
  - app/styles.worker-theme.test.js
---

# 라이브 세션 전사 드로어를 대화 중심으로 다시 그린다 — 작업 묶음 접기, 한 줄 도구 줄, 색은 상태에만, 큰 창과 모바일 전체 화면

- Bead: UI-2dbn (`spec_backed`)
- 작성: 2026-09-29 · r0
- 조사 기준: `origin/main` `1b0cc9d4224835556f07b284ada8cc710af09a47`
- 참고 목업(비정본, 본문이 정본): `~/tmp/mockups/2026-09-29-transcript-drawer-redesign.html`
  (`http://100.122.98.8:9000/2026-09-29-transcript-drawer-redesign.html`) — 실제 UI-j2h3
  세션 내용으로 데스크톱 다크·라이트, 모바일 390을 그렸다.

## 1. 요구와 확인한 현재 동작

2026-09-29 사용자 요청 "라이브세션을 좀더 보기좋게 만들자". 실행 타일의
`라이브 세션 열기`, 세션 타일의 `▤ 세션`, 이슈 상세 Worker 이력의 세션 행이 모두
같은 전사 드로어(`createTranscriptDrawer`, `transcript-drawer.js`)를 연다. 공유
서버(`1b0cc9d4`)에서 UI-j2h3 구현 세션(도구 줄 59·생각 19·본문 7·결과 1)을 1440·390
폭으로 캡처해 확인한 문제와 원인:

| 문제 | 확인한 원인 |
|---|---|
| 도구 줄 하나가 5~10줄 덩어리로 세로로 늘어진다 | `.sv__tool-detail`이 `white-space: normal; overflow-wrap: anywhere; flex: 1 1 28ch`이고 `.sv__tool-ok`(결과)도 `flex: 1 1 28ch`라(`styles.css:5445`·`:5473`, `f5f35ec3` "세션 로그 긴 경로 줄바꿈") 긴 한 줄 Bash 명령이 좁은 왼쪽 열에서 전부 줄바꿈되고 결과가 오른쪽 둘째 열로 붙는다. `styles.worker-theme.test.js`의 `wraps long transcript tool details inside the drawer`가 이 줄바꿈을 계약으로 고정한다. |
| 초록 글씨가 너무 많아 무엇이 중요한지 안 보인다 | 모든 도구 결과가 `.sv__tool-ok { color: var(--accent-success) }`, 최종 보고가 `.sv__result--ok { color: var(--accent-success) }` + `font-weight: 600`으로 본문 전체가 초록 굵은 글씨다. 게이트 줄도 통째로 초록이다(`.sv__gate`). 라이트 테마에서 `#5ad198` 글씨는 대비가 낮다. |
| 창이 작다 | 이슈 상세에서 열면 `.session-log-root .sv`가 화면 아래 고정, 최대 720px, 본문 `max-height: 46vh`(`:5526`·`:5029`)다. Worker·Monitor 오버레이는 `min(860px, 94vw)`에 `max-height: 85vh`라 내용이 적으면 창이 작고 스트리밍 중 창 높이가 출렁인다. 모바일(≤640px)은 셋 다 아래 시트 70vh·본문 60vh다(`:8752`~`:8790`). |
| 머리줄이 빽빽하다 | 한 줄에 attempt ID(`UI-j2h3-1790133262718-1`), 단계 칩, 진행 점, 세션 ID, 재개 명령, 러너·모델·effort, worktree, 프롬프트, `⇣ 라이브 따라가기 ON`, 닫기가 모두 선다(`transcript-drawer.js:857`~`:960`). |
| 전체 흐름이 안 읽힌다 | 세션이 한 말(본문 7줄)이 도구 줄 59개·"생각 중… N 토큰" 19줄 사이에 묻힌다. 같은 도구 5개 연속만 접히고(`FOLD_AT`), 서로 다른 도구가 섞인 긴 구간은 그대로 펼쳐진다. |

## 2. 사용자 결정 (2026-09-29)

- 고칠 점: 네 가지(도구 줄 세로 늘어짐·초록 글씨 과다·창 작음·머리줄 빽빽함) 전부,
  그리고 "전체적으로 파악하기 좋고 보기 좋도록".
- 방향: **대화 중심** — 세션이 한 말(본문·생각)이 주인공이고, 도구 줄은 한 줄
  요약으로 조용히 두고 눌러서 펼친다.
- 진행: 새 Bead로 지금 고친다. UI-dbn6 스펙(`2026-09-23-frontend-rewrite-unified-pipeline-design.md`)의
  시각 체계(§4.4)와 모바일 규칙(§3.6)을 따라 만들어, UI-dbn6 Phase 2가 드로어를
  다시 설계하지 않고 옮기게 한다.

## 3. 접근 대안과 선택

1. **드로어 모듈 안에서 템플릿과 CSS를 다시 짠다** — 선택. 파서(`transcript-lines.js`,
   서버가 import)·구독·따라가기·바깥 클릭 닫기·단계 칩 3층 판정은 그대로 두고, 렌더
   구조(작업 묶음·2행 머리줄·결과 카드)와 `.sv*` CSS, 세 호스트의 창 규격만 바꾼다.
2. CSS만 손본다 — 도구 줄 한 줄화·색 정리는 되지만 작업 묶음 접기, 2행 머리줄, 결과
   카드 머리는 템플릿 없이는 못 만든다. "전체적으로 파악하기 좋게"를 채우지 못한다.
3. UI-dbn6 구조(`screens/transcript/`, `ui/tokens.css`)로 지금 새로 쓴다 — 옮김이
   필요 없지만 UI-dbn6 Phase 1이 만들 기반(core/ui 디렉터리, 새 shell)을 앞당겨
   만들게 되어 두 작업이 같은 기반을 따로 정한다.

## 4. 설계

### 4.1 창 — 세 호스트가 같은 규격을 쓴다

- 데스크톱(> 640px): 화면 가운데, 폭 `min(920px, 94vw)`, 높이 `min(88vh, 1000px)`
  **고정**(상한이 아니라 높이). 스트리밍으로 줄이 늘어도 창 크기가 변하지 않고
  스크롤은 `.sv__body` 하나만 갖는다.
  - Worker·Monitor: `.worker-drawer-overlay .worker-drawer-host`가 위 폭·높이를 갖고
    `.sv`는 host를 채운다(`height: 100%`).
  - 이슈 상세: `.session-log-root .sv`가 `position: fixed; inset: 0; margin: auto`로
    같은 폭·높이를 갖는다. z-index 950(상세 900 위, md viewer 1000 아래)은 유지한다.
- 모바일(≤ 640px): 셋 다 **전체 화면 시트** — `inset: 0`, 폭 100%, 높이 `100dvh`
  (`100vh` 폴백), 모서리 0, 그림자 없음. 닫기는 머리줄 ✕(현행), 바깥 클릭 닫기는
  전체 화면이라 해당 없음. 뒤로가기(hash) 닫기는 UI-dbn6 §3.6의 몫이고 여기서
  만들지 않는다.
- `.sv__body`의 `max-height: 46vh`·`60vh` 상한과 `.worker-drawer-overlay .sv__body`의
  이중 상한 해제 규칙은 없앤다 — 높이는 셸이 정한다.
- 저장소 작업 타임라인(`.worker-repo-drawer`)은 같은 오버레이를 쓰지만 이 설계 밖이다.
  host 규격 변경이 타임라인에도 닿으므로 타임라인은 host 높이를 채우는 현행 계약
  (`styles.worker-theme.test.js`의 타임라인 테스트)을 그대로 통과해야 한다.

### 4.2 머리줄 — 두 줄

1행 `.sv__head`(한 줄, 줄바꿈 없음):

| 순서 | 요소 | 내용 |
|---|---|---|
| 1 | 상태 `.sv__state` | 진행 중(`meta.status === 'running'`): 숨쉬는 초록 점 + 마지막 이벤트 경과(`3초 전`, 현행 `.sv__live`·`.sv__live-dot`·`.sv__live-ago`). 진행 중이 아니면 전사의 마지막 `result` 줄로 `✓ 완료`(`.sv__state--done`) 또는 `✗ 실패`(`.sv__state--failed`); `result` 줄이 없고 `meta.status === 'failed'`면 `✗ 실패`; 그 밖은 그리지 않는다. `meta.status`의 `done`은 호스트마다 뜻이 달라(대화형 세션은 "현재 세션 아님", `session-ref.js:53`) 완료 근거로 쓰지 않는다. |
| 2 | 제목 `.sv__id` | 현행과 같은 값(`meta.label` → `launch_id`면 role → attempt ID). 모노, 남는 폭에서 말줄임, 전문은 `title`. |
| 3 | 단계 칩 `.sv__stage` | 현행 3층 판정 그대로. 추정(`--guess`)은 노랑 점선. |
| 4 | (여백) | |
| 5 | 따라가기 `.sv__follow` | `⇣ 따라가기`. ON은 채운 강조색, OFF는 외곽선. `aria-pressed`와 `aria-label="라이브 따라가기 ON/OFF"`는 현행 유지. ≤640px은 `⇣ ON`/`⇣ OFF`. |
| 6 | 닫기 `.sv__close` | ✕ |

2행 `.sv__info`(작은 회색 글씨, 좁으면 줄바꿈): 러너·모델·effort(`.sv__meta`) ·
`⧉ 세션 8자`(`.sv__session`) · `⧉ 재개 명령`(`.sv__resume-cmd`) · `✉ 프롬프트`
(`.sv__prompt-toggle`) · worktree(`.sv__wt`, ≤640px 숨김). 버튼은 테두리 없는 글자
링크 모양이고 동작·`aria-label`·`title`은 현행 그대로다. 재료가 없는 요소는 그리지
않는다.

≤640px에서 단계 칩을 숨기던 현행 규칙은 없앤다 — 1행에서 제목이 먼저 줄고
(`flex: 1 1 0`) 단계 칩은 12자까지 남는다.

### 4.3 본문 — 서사 줄과 작업 묶음

본문의 줄을 두 갈래로 나눈다.

- **서사 줄**: `assistant`·`user`·`gate`·`phase`·`result`·`error`·`blocker`. 본문
  흐름에 그대로 선다.
- **작업 줄**: `tool` 줄, 같은 도구 접힘(`group`, 현행 `FOLD_AT`), 서브에이전트
  묶음(`subagent`, 현행), `thinking` 줄.

`segmentsOf`가 만든 세그먼트 열에서 **연속한 작업 줄을 작업 묶음 `.sv__work` 하나**로
모은다. 서사 줄이 묶음을 끊는다. 도구 계열(`tool`·`group`·`subagent`)이 하나도 없는
연속 구간(예: 첫 줄 `세션 시작 · <model>`)은 묶음 없이 생각 줄만 그린다. 서브에이전트
안쪽 줄과 같은 도구 접힘 규칙은 현행과 같다(묶음 안에서도 같은 경로).

작업 묶음은 요약 머리 한 줄 `.sv__work-sum`과 행 목록 `.sv__work-rows`로 된다.

- 요약: `▸`/`▾` · `작업 N` · 도구 이름별 개수 상위 3개(`Bash 9 · Read 4 · Edit 1`,
  개수 내림차순, 같으면 먼저 나온 순) · 생각 줄이 있으면 `생각 K` · 실패한 도구가
  있으면 빨간 `✗ n`. `N`은 도구 호출 수다 — `tool` 줄 1, `group`은 담은 줄 수,
  `subagent`는 1(자식 줄은 세지 않는다). 도구 이름별 개수도 같은 셈이고 이름은 줄의
  `tool` 값(`group`은 그 도구, `subagent`는 `Agent`)이다. `✗ n`은 `is_error === true`인 `tool` 줄과
  `group` 안 줄, 그리고 `is_error === true`인 `Agent` 머리 줄을 센다.
- **기본 접힘 규칙**: 묶음 뒤에 서사 줄이 하나라도 이어지면(= 지난 작업) 행이 4개
  이상일 때 접힌다. 마지막 묶음(뒤에 서사 줄이 없는 묶음)과 행이 3개 이하인 묶음은
  펼친다. 행 수는 묶음이 그리는 행(`tool`·`group`·`subagent`·`thinking` 세그먼트) 수다.
- 요약을 누르면 그 묶음의 열림을 뒤집고, 사용자가 정한 열림은 기본 규칙보다 우선해
  재렌더(append·하트비트)에도 유지된다. 키는 묶음 첫 세그먼트의 `idx`, 저장은
  `expanded`·`unfolded`와 같은 수명(드로어를 열거나 닫을 때 비운다).
- 진행 중 세션에서 새 서사 줄이 도착하면 직전 묶음이 기본 규칙에 따라 접힌다.
  따라가기 ON이면 현행대로 끝으로 스크롤한다.

행 모양(묶음 안):

- **도구 줄** `.sv__tool`: 한 줄 — 아이콘 · 도구 이름(모노) · 세부(모노, 말줄임) ·
  `⋯ N줄`(여러 줄 Bash, 현행) · `+a`/`−r` · 결과 요약(`.sv__tool-out`, 흐린 모노,
  최대 34% 폭, 말줄임). 세부 전문은 `title`에 싣는다. 세부는 **줄바꿈하지 않는다**
  (`white-space: nowrap; text-overflow: ellipsis; min-width: 0`). ≤640px에서만 결과
  요약이 둘째 줄로 내려간다(첫 줄은 여전히 한 줄). `is_error === true`면
  `.sv__tool--error`(왼쪽 2px 빨간 표시, 결과 요약 빨강). 누르면 현행처럼 펼침 칸
  `.sv__tool-expand`에 명령 원문(Bash) 또는 input JSON과 `출력`을 보이며, 펼침 칸은
  최대 높이 320px 안에서 스크롤하고 `overflow-wrap: anywhere`로 전문을 싣는다.
- **같은 도구 접힘** `.sv__group`: 아이콘 · 이름 · `×N` · `▸`(현행 동작).
- **서브에이전트 머리** `.sv__sub-head`: 🤖 · 유형 · 설명(말줄임) · `N줄` · 상태
  (`✓` 초록 / `✗` 빨강 / `⟳` 흐림, 현행 판정) · `▸`. 펼친 몸통은 왼쪽 선과 들여쓰기.
- **생각 줄** `.sv__think`: 💭 + 첫 줄, 흐린 기울임, 누르면 전문(현행).

서사 줄 모양:

- **본문** `.sv__as`: 본문 글자 크기 `--fs-body-lg`(14px), 줄 간격 1.7, 폭 상한 72ch,
  마크다운(현행 `renderMarkdown`). 인라인 코드는 면색 배경의 모노.
- **사람 입력** `.sv__line--user`: 오른쪽 정렬 말풍선(강조색을 옅게 섞은 면), 위에
  작은 `사람 입력` 캡션, 첫 줄만 보이고 누르면 전문(현행 동작, 마크다운 아님).
- **게이트** `.sv__gate`: 알약 — 게이트 이름(모노) · 리뷰어 · 판정. 판정 글자만 색을
  갖는다: `APPROVE` → 초록(`.sv__verdict--ok`), `REVISE` → 노랑(`--warn`), 그 밖은
  본문색. `gate`·`verdict` 필드가 없으면 현행처럼 `text`만 그린다.
- **단계** `.sv__phase`: 가로 헤어라인 사이의 작은 대문자 라벨(현행 의미).
- **오류·blocker** `.sv__error`: 옅은 빨간 면 + 빨간 글씨 상자.
- **최종 결과** `.sv__result`(`--ok`/`--fail` 유지): 카드 — 왼쪽 3px 상태색 띠, 머리
  `.sv__result-head`에 `✓ 완료` 또는 `✗ 실패`(상태색), 몸통 `.sv__result-body`는
  **본문색·보통 굵기** 마크다운. `text`가 비면 몸통을 그리지 않는다.

### 4.4 "지금" 바

현행 판정(미완료 도구 + 최신 생각, 진행 중일 때만) 그대로, 모양만 바꾼다 — 패널 면,
`● 지금`(초록 점 + 라벨) · 도구 이름(모노) · 세부(말줄임) · 생각(흐린 기울임).

### 4.5 색과 글꼴 규칙

- 상태색은 상태에만 쓴다. 초록: 진행 점, `✓ 완료`, `APPROVE`, `+a`, 서브에이전트
  `✓`, 결과 카드 띠. 빨강: `✗ 실패`, 실패한 도구 표시와 그 결과 요약, `✗ n`, 오류
  상자, `−r`. 노랑: 추정 단계 칩, `REVISE`. 그 밖의 글씨는 `--text-primary` →
  `--text-secondary` → `--text-muted` → `--text-dim` 단계로만 구분한다.
- 상태색 **글씨**는 두 테마 대비를 위해 본문색과 섞은 잉크를 쓴다 — `.sv`에 지역
  변수 `--sv-ok-ink: color-mix(in srgb, var(--accent-success) 62%, var(--text-primary))`,
  `--sv-bad-ink`(danger 72%), `--sv-warn-ink`(warn 70%)를 두고, 점·띠·선 같은 면
  표시는 원래 `--accent-*`를 쓴다. `tokens.css`에 새 토큰을 더하지 않는다.
- 면: 드로어 바탕 `--bg-drawer` < 머리줄·작업 묶음·결과 카드·"지금" 바 `--bg-panel`.
  작업 묶음과 결과 카드는 테두리 없이 면 밝기 차이로 구분한다(UI-dbn6 §4.4).
- 글꼴: 서사 줄은 `--font-sans`, 모노(`--font-mono`)는 ID·도구 이름·명령·경로·결과
  요약·펼침 칸에만 쓴다.
- 모션: 진행 점 숨쉬기만(현행, `prefers-reduced-motion`이면 정지).

### 4.6 바꾸지 않는 것

- `app/utils/transcript-lines.js`(파서, 서버가 import)와 `DisplayLine` 필드.
- `subscribe-session-log`/`unsubscribe-session-log`/`get-attempt-prompt` 호출과
  구독 교체, 따라가기(수동 위로 스크롤 → OFF), 바깥 mousedown 닫기, 하트비트,
  단계 칩 3층 판정, `FOLD_AT` 같은 도구 접힘, 서브에이전트 묶음 판정.
- 호스트가 넘기는 `open` 입력과 `DrawerMeta` 모양, 호스트 코드.
- 호스트 테스트가 읽는 클래스: `.sv__id`·`.sv__live`·`.sv__live-dot`·`.sv__session`·
  `.sv__resume-cmd`·`.sv__meta`·`.sv__result--ok`·`.sv__close`·`.sv__body`.

### 4.7 UI-dbn6와의 관계

이 스펙의 §4.2~§4.5 표시 문법이 전사 드로어 시각의 정본이다. UI-dbn6 Phase 2는
드로어를 `screens/transcript/`로 옮기고 셸 장착(전체 화면 시트의 뒤로가기 닫기,
새 shell의 오버레이 층)만 바꾸는 것을 전제로 계획을 쓴다. 인계 시 UI-dbn6 notes에
이 스펙 경로와 전제를 덧붙인다(`--append-notes`). 두 Bead 사이에 `blocks` 엣지는 두지
않는다 — UI-dbn6 Phase 1은 드로어를 기존 컴포넌트로 마운트하므로 이 작업과 순서가
얽히지 않는다.

## 5. 오류 처리와 fail-quiet

- 재료가 없는 요소는 그리지 않는다: 상태(§4.2 판정 불가), 게이트 구조 필드, 결과
  요약, `+a`/`−r`, 2행의 각 버튼, 결과 카드 몸통.
- 줄이 하나도 없으면 현행 `세션 로그 없음`.
- 알 수 없는 `kind`는 현행처럼 본문(`assistant`) 경로로 그린다 — 서사 줄로 취급해
  묶음을 끊는다.

## 6. 검증과 수용 기준

- `npm run tsc`, `npm run lint`, 변경 파일 `npx prettier --write`,
  `npx vitest run --reporter=dot` 통과.
- 화면 확인: 워크트리 소스를 `BDUI_FRONTEND_MODE=live` ad-hoc 서버(공유 서버와 다른
  포트, `ts-ip` 바인딩)로 띄우고 Playwright로 캡처한다 — 이슈 상세 Worker 이력의 세션
  행(예: UI-j2h3)에서 연 드로어를 1440×900과 390×844, 다크·라이트 각각. 실행 중
  attempt나 세션 타일이 그 시점에 있으면 Worker·Monitor 오버레이도 1440 한 장씩.
  수용 기준:
  1. `.sv__body`의 가로 넘침 0(`scrollWidth - clientWidth === 0`), 세 폭 모두.
  2. 데스크톱에서 모든 `.sv__tool-line` 높이가 한 줄(≤ 30px); 390에서 ≤ 2줄.
  3. 데스크톱 창 높이가 `min(88vh, 1000px)`이고 390에서 창이 뷰포트를 채운다.
  4. UI-j2h3 세션에서 지난 작업 묶음이 요약 한 줄로 접히고 마지막 묶음은 펼쳐져
     있으며, 본문 줄과 결과 카드가 첫 화면에서 도구 줄보다 먼저 읽힌다(캡처로 판단).
  5. 결과 카드 몸통 글자색이 본문색이다(초록 아님).
- 캡처는 완료 보고서에 경로로 남긴다.

## Test scope

RED-GREEN seam(변경 전 실제 실패를 확인하는 항목):

- `app/views/worker/transcript-drawer.test.js`
  - 본문 줄 사이의 연속한 도구·생각 줄이 `.sv__work` 하나에 담기고 본문 줄은 밖에 선다.
  - 도구 계열 없이 생각 줄만 이어진 구간은 `.sv__work` 없이 그린다.
  - 뒤에 본문 줄이 이어진 행 4개 이상 묶음은 요약만 그리고(`.sv__tool` 없음), 마지막
    묶음은 펼쳐 그린다.
  - 뒤에 본문 줄이 이어져도 행 3개 이하 묶음은 펼쳐 그린다.
  - 요약이 `작업 N`, 상위 3개 도구 개수, `생각 K`를 싣고, `is_error` 도구가 있으면
    `✗ n`을 싣는다(`group` 안 줄 포함).
  - 요약 클릭으로 연 묶음이 store append 뒤 재렌더에도 열려 있다.
  - 머리줄 상태: 진행 중 → `.sv__live`; 비진행 + 성공 `result` 줄 → `✓ 완료`;
    실패 `result` 줄 → `✗ 실패`; `result` 줄 없이 `status: 'failed'` → `✗ 실패`;
    `status: 'done'`이고 `result` 줄 없음 → 상태 없음.
  - 도구 줄 세부의 전문이 `title`에 실리고, `is_error` 도구 줄이 `.sv__tool--error`를 갖는다.
  - 결과 카드 머리 `.sv__result-head`가 `✓ 완료`/`✗ 실패`를 싣고, 빈 `text`면 몸통이 없다.
  - 게이트 판정 `APPROVE` → `.sv__verdict--ok`, `REVISE` → `.sv__verdict--warn`.
- `app/styles.worker-theme.test.js`
  - `wraps long transcript tool details inside the drawer`를 한 줄 계약으로 바꾼다:
    `.sv__body`는 `overflow-x: hidden`, `.sv__tool-detail`은 `white-space: nowrap`·
    `text-overflow: ellipsis`·`min-width: 0`, `.sv__tool-expand`는
    `overflow-wrap: anywhere`.
  - 데스크톱 host 높이 규칙(`min(88vh, 1000px)`)과 ≤640px 전체 화면 규칙(host·
    `.session-log-root .sv`)이 있다.

RED-GREEN 제외 — 회귀(현 구현에서도 통과):

- 호스트 테스트(`monitor/index.test.js`·`worker/index.test.js`·
  `detail-panel/index.test.js`)의 드로어 클래스 조회.
- 따라가기 토글·수동 스크롤 OFF, 단계 칩 3층, 같은 도구 접힘, 서브에이전트 묶음,
  프롬프트 토글, 세션 ID·재개 명령 복사.

기존 `transcript-drawer.test.js`에서 도구 줄을 본문 줄 뒤에 두고 `.sv__tool`을 바로
찾는 테스트는 새 기본 접힘 규칙에 따라 픽스처가 접힐 수 있다 — 그 테스트가 보려던
동작을 유지하도록 픽스처(묶음 행 수)나 묶음 열기 클릭을 조정한다. 구현을 테스트에
맞추려고 바꾸지 않는다.

## 7. 구현 unit 후보

- 하나: `transcript-drawer.js` 템플릿(작업 묶음·2행 머리줄·결과 카드·게이트 알약) +
  `styles.css` `.sv*`와 세 호스트 셸 규칙 + 두 테스트 파일. 나눌 근거가 없다.

## 결정 (ADR 후보)

- 전사 드로어의 대화 중심 표시 문법(작업 묶음 기본 접힘, 한 줄 도구 줄, 상태색 한정,
  세 호스트 같은 창 규격) — 되돌리기 어렵지 않다(한 모듈의 템플릿·CSS이고 함께
  움직여야 할 소비자가 없으며, UI-dbn6는 이 스펙을 계획의 전제로 읽을 뿐 코드 계약이
  아니다); 시각 표시 규칙은 스펙이 정본으로 충분하다 → ADR 아님
