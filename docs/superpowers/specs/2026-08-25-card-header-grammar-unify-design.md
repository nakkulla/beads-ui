---
scope:
  - app/views/worker/lanes.js
  - app/views/worker/lanes.test.js
  - app/views/worker/running-grid.js
  - app/views/worker/running-grid.test.js
  - app/views/monitor/index.js
  - app/views/monitor/lanes.test.js
  - app/main.monitor.e2e.test.js
  - app/styles.css
  - AGENTS.md
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# UI-251y — 카드 헤더 문법 통일

## 1. 배경

Worker 탭과 Monitor 탭은 이미 **같은 렌더러**를 공유한다. Monitor가
`app/views/monitor/index.js`에서 `candidateCard` · `miniRow` · `paneTemplate`를,
`runningTile`을 `app/views/worker/running-grid.js`에서 그대로 import한다. 두 탭의
차이는 렌더러가 아니라 실행중 타일에 얹는 오버레이 두 칩(레포 배지 · 직렬 레인
칩)뿐이다 — 활동 줄과 위임 칩은 Worker 탭에서도 이미 실린다
(`app/views/worker/index.js`가 `last_activity`·`legs`를 오버레이에 담는다).

어긋나 있는 것은 **헤더의 칩 배치 문법**이다.

- **레포 칩 자리가 다르다.** `candidateCard`·`miniRow`는 ID 앞,
  `runningTile`은 ID 뒤(`monitorTileHead`).
- **route 칩 자리가 다르다.** `candidateCard`·`miniRow`는 헤더,
  `runningTile`은 제목 아래 `.rtile__meta`. 후자는 "헤더 한 줄이 이미 꽉 찼다"는
  이유로 그렇게 됐고, 그 이유 자체가 이 스펙이 없애려는 조건이다.
- **좌표 칩과 조작 버튼이 한 줄을 두고 다툰다.** `.rtile__hd`는 `flex-wrap:
  wrap`이고 `.rtile__hd-actions`는 `margin-left: auto`다. 칩이 늘면 조작 묶음
  (경과 · `▤ 세션` · `⏸` · `폐기`)이 통째로 다음 줄로 밀린다. 밀린 줄은 폭에
  따라 생겼다 사라지므로, 사용자가 버튼을 찾는 자리가 매번 달라진다.

같은 사실이 카드마다 다른 자리에서 읽히면 사용자는 카드 종류를 먼저 식별한 뒤에야
정보를 찾는다. 이 스펙은 **배치 문법 하나**를 정하고 세 렌더러를 거기에 맞춘다.

## 2. 확정 문법

세 렌더러가 공유하는 줄 순서는 다음과 같다. 재료가 없는 줄은 그리지 않는 현행
fail-quiet를 그대로 유지한다 — 판정은 **그 줄의 재료 전부**로 하며, 좌표 칩만
세지 않는다(§3.5).

| # | 줄 | 싣는 것 |
|---|---|---|
| 1 | **정체성 + 조작** | `[상태점/grip] [순번] [ID] [P n] [상태 아이콘·뱃지·PR 링크]` ··· 오른쪽 끝 `[경과/상태 라벨] [merge-step] [조작 버튼]` |
| 2 | 제목 | 카드형 변형만. 한 줄 변형은 1줄에 제목이 함께 있다 |
| 3 | 진행 | stepper(후보) 또는 활동 줄·위임 칩(실행중) |
| 4 | **의존 · 겹침 칩** | `⛓ blocked` · `⧉ 겹침` · `scope 없음` (`.worker-deps`) |
| 5 | **좌표 · 실행 사실 칩** | `레포 → 레인 → route → from` 다음에 `오케`/`워커` exec 칩 · `exec_receipt` · usage/비용 |
| 6 | 액션 foot | 카드형 변형의 `[머지]`/`[폐기]`/`[대기로 ↴]` 등 |
| 7 | 시각 | `생성 · 수정` (`timesMeta`) |

두 가지가 이 표의 근거다.

**정체성과 조작만 1줄에 둔다.** 조작 버튼은 좁은 폭에서도 같은 자리에 있어야
한다. 좌표 칩이 1줄에서 빠지면 버튼을 밀어낼 주체가 사라진다.

**의존·겹침이 좌표보다 위다.** `⛓ blocked`는 "지금 갈 수 있나"를 말해 사용자의
다음 행동을 바꾸고, 레포·레인·route는 분류다. 행동을 바꾸는 사실이 위에 선다.

이 표는 좌표 칩만 옮기지 않는다. 지금 렌더러마다 자리가 갈려 있던 usage/비용과
상태 뱃지도 같은 판정으로 배정된다 — 근거는 §5.1에 있다.

## 3. 렌더러별 적용

### 3.1 `runningTile` (`app/views/worker/running-grid.js`)

- `monitorTileHead`가 헤더에 넣던 레포 배지·직렬 레인 칩을 헤더에서 뺀다. 함수는
  좌표 칩 조각을 반환하는 역할로 바뀌며, 호출 자리가 §2의 5번 줄로 옮겨간다.
- `route_chip`은 이미 `.rtile__meta`에 있다. 좌표 순서 규칙에 따라 레포 · 레인
  **다음**, exec 칩 **앞**에 온다. usage/비용 뱃지는 §5.1 슬롯 5에 속하므로 지금
  자리(`.rtile__meta` 끝)를 유지한다.
- `.rtile__meta`가 싣던 `충돌 해소`/`충돌 해소 일시정지` 뱃지와 base 예외 뱃지는
  슬롯 1(상태 뱃지)이므로 헤더로 옮긴다. 다른 카드의 상태 뱃지가 이미 정체성 줄에
  있어 같은 종류의 사실이 두 자리에서 읽히고 있었다. 두 뱃지 모두 드물게만 서므로
  헤더 폭에 상시로 부담을 주지 않는다.
- 헤더에 남는 것: `.rtile__dot` · ID · `P n` · `↻`(재개 계보) · `.rtile__hd-actions`
  (경과/상태 라벨 · `▤ 세션` · `⏸`/`▶` · `폐기`, 실패 변형은 `↻ 이어하기` · `✕`).
- 세션 타일(`tile.kind === 'session'`)의 `session_meta`도 같은 줄 규칙을 따른다:
  좌표 칩(레포 · 레인 · route) 다음에 `exec_receipt` 칩.
- `.rtile__hd`의 `flex-wrap`은 남긴다. 긴 ID와 4개 버튼이 만나는 극단 폭이 여전히
  존재하므로 wrap을 제거하면 그때 버튼이 잘린다. 바뀌는 것은 wrap이 걸리는
  **빈도**다.

### 3.2 `candidateCard` (`app/views/worker/lanes.js`)

- `.worker-card__head`에서 레포 칩 · `fromChipTemplate` · `routeChipTemplate`을
  뺀다. 남는 것은 grip · ID · `P n` · `worker-ineligible` 칩이다
  (`worker-ineligible`은 분류가 아니라 "이 카드는 워커가 실행하지 않는다"는 상태
  이므로 정체성 줄에 남는다).
- 좌표 칩은 stepper와 `.worker-deps` **다음**, 기존 exec 칩 줄과 **같은 줄**에
  선다.

### 3.3 `miniRow` 한 줄 변형 (`.worker-mini__line`)

- 대기 레인(병렬 · 직렬 s1~s5)이 쓰는 변형이다. `__line`에서 레포 · route · from
  칩을 뺀다. 남는 것은 grip · 순번 · ID · `P n` · 제목 · PR 링크 · 뱃지 ·
  legacy `worker-serial` · reason · usage · merge-step · 조작 버튼이다.
- usage/비용 뱃지도 §5.1 슬롯 5이므로 좌표 칩과 같은 줄로 내려간다. merge-step
  게이지와 조작 버튼은 1번 줄에 남는다.
- 좌표 칩은 `.worker-deps` 다음, exec 칩과 같은 줄로 내려간다.

### 3.4 `miniRow` 카드 변형 (`.worker-mini--card`)

- PR 대기 · stale 파킹 · REVISE 파킹 행이다. `.worker-mini__head`에서 레포 ·
  route · from을 뺀다. 남는 것은 grip · 순번 · ID · `P n` · PR 링크 · repair PR ·
  뱃지 · legacy 라벨 · reason이다.
- 좌표 칩은 `.worker-deps` 다음, exec 칩 줄과 같은 줄이다. 이 변형은 이미 액션이
  `.worker-mini__foot`으로 분리돼 있어 §2의 6번 줄을 그대로 쓴다.
- `.worker-mini__foot`이 싣던 usage/비용 뱃지는 5번 줄로 올라가고, merge-step
  게이지와 액션 버튼만 foot에 남는다.

### 3.5 칩 줄 컨테이너

좌표 칩과 exec 칩은 **한 줄**을 공유한다. 별도 컨테이너를 두면 exec 칩이 없는
카드에서 빈 줄 두 개가 겹친다.

- `.worker-mini__exec`는 이름이 exec 전용이므로 그대로 쓰지 않는다. 세 렌더러가
  공유하는 `.worker-chips` 하나를 추가하고, 그 안에 좌표 칩 → exec 칩 순으로
  담는다. 기존 `.worker-mini__exec` 규칙은 `.worker-chips`로 대체한다.
- `.rtile__meta`는 이미 같은 역할을 하므로 유지하고, 담는 순서만 §2의 5번 줄
  규칙으로 맞춘다. 두 클래스를 하나로 합치지 않는 이유는 타일과 행의 여백·글자
  크기 토큰이 다르기 때문이다.
- 줄을 생략하는 조건은 **그 줄의 재료가 하나도 없을 때**다. 좌표 칩·exec 칩만
  세어서 판정하면, 좌표가 없고 usage만 있는 실행중 타일에서 지금 보이는 정보가
  사라진다. `.rtile__meta`는 좌표 칩 · exec 칩 · usage 중 하나라도 있으면 서고,
  `.worker-chips`도 같은 규칙을 쓴다.

## 4. 투영은 바꾸지 않는다

blocked · 겹침 칩이 어느 레인에 서는지는 **이미 투영이 소유하고 있고, 이 스펙은
그 규칙을 건드리지 않는다.**

- `app/views/monitor/lanes.js`가 `model.queue`(병렬 + 직렬 s1~s5 항목이 같은 객체로
  들어간다)와 `model.runnable`에 `dependency_chips.predecessors`를 붙인다.
  `running`·`pr_wait`은 빈 배열이다 — 이미 출발했으므로 막힌 것이 없다.
- `applyScopeOverlaps`가 `running`·`queue`·`runnable`에 `⧉ 겹침`과 `scope 없음`을
  붙인다.

따라서 레인별 표시는 이렇게 유지된다: 후보·대기는 `⛓ blocked` + `⧉ 겹침`,
실행중은 `⧉ 겹침`만, PR 대기는 없음. 타 레포 blocker는 문구가 같고 색만 갈린다
(`worker-dep--foreign`). 이 스펙이 정하는 것은 그 칩 줄이 **어느 자리에 서는가**
뿐이다.

## 5. 프로젝트 지침 반영

문법을 코드에만 두면 다음에 칩을 하나 더 다는 사람이 또 자기 자리를 고른다. 이
스펙이 정한 순서를 `AGENTS.md`에 **규칙으로** 남긴다 — 근거와 예외는 이 문서가
소유하고, `AGENTS.md`는 결정만 싣고 여기를 가리킨다(계약 지역성).

### 5.1 슬롯 정의 — 새 요소는 여기에 배정한다

카드에 라벨·칩·뱃지·버튼을 새로 달 때는 자리를 고르지 않는다. **그 요소가 답하는
질문**으로 슬롯이 결정된다.

| 슬롯 | 답하는 질문 | 지금 실려 있는 것 |
|---|---|---|
| 1 정체성 (왼쪽) | 이것이 무엇인가 · 어떤 상태인가 | 상태점 · grip · 직렬 순번 · ID · `P n` · `↻` 재개 계보 · `worker-ineligible` · legacy `worker-serial` · PR/repair PR 링크 · 상태 뱃지(완료·live activity·`충돌 해소` · base 예외) · reason |
| 1 조작 (오른쪽 끝) | 내가 여기서 무엇을 하나 | 경과/상태 라벨 · merge-step 게이지 · `▤ 세션` · `⏸`/`▶` · `↻ 이어하기` · `머지`/`취소` · `폐기` · `✕` |
| 2 제목 | 무슨 일인가 | 제목 (카드형 변형만; 한 줄 변형은 1번 줄에 포함) |
| 3 진행 | 어디까지 왔나 | stepper · 활동 줄 · 위임 칩 · 자식 롤업 · landing 진행 |
| 4 의존·겹침 | 지금 갈 수 있나 | `⛓ blocked` (타 레포는 색만 다름) · `⧉ 겹침` · `scope 없음` · 연결 레인 칩 |
| 5 좌표·실행 사실 | 어느 레포·레인·경로의 것이고 무엇으로 얼마나 돌았나 | 레포 배지 · 직렬 레인 칩 · `route` · `↩ from` · `오케`/`워커` exec 칩 · `exec_receipt` · usage/비용 |
| 6 액션 foot | (카드형) 무엇을 하나 | `대기로 ↴` · `머지`/`취소` · `폐기` · 파킹 처분 버튼 · 폐기 영수증 · merge-step 게이지 |
| 7 시각 | 언제 것인가 | `생성` · `수정` |

판정은 위에서 아래로 한 번만 한다. 두 슬롯에 걸치는 것처럼 보이면 **행동을 바꾸는
쪽**이 이긴다 — 예를 들어 "머지가 잠겼다"는 사실은 분류가 아니라 행동이므로 5번이
아니라 1번/6번이다.

두 요소는 이 판정에서 갈라졌으므로 근거를 남긴다.

- **usage/비용은 5번이다.** 얼마를 썼는지는 사용자의 다음 행동을 바꾸지 않는
  사실이다. `runningTile`은 이미 그 자리에 두고 있고, `miniRow`는 조작 옆에 두고
  있어 어긋나 있었다. 이 스펙에서 `miniRow` 한 줄·카드 변형의 usage도 5번 줄로
  내린다.
- **merge-step 게이지는 조작 옆에 남는다.** 진행률처럼 보이지만 실제로는 "지금
  머지 중이라 이 버튼을 누를 수 없다"는 조작의 상태이므로, 버튼에서 떨어지면
  의미를 잃는다.

### 5.2 `AGENTS.md`에 남길 규칙

- 워커·모니터 카드(`candidateCard` · `miniRow` · `runningTile`)의 줄 순서는 §2
  표를 따르고, 새 요소의 자리는 §5.1 슬롯 표로 정한다.
- 조작은 1번 줄 오른쪽 끝이거나 액션 foot이다. 그 사이에 칩을 끼우지 않는다 —
  칩이 끼면 조작이 다음 줄로 밀리고, 사용자가 버튼을 찾는 자리가 폭에 따라
  달라진다.
- 재료가 없는 줄은 그리지 않는다(fail-quiet).
- 슬롯 표로 배정되지 않는 요소를 달아야 한다면, 칩을 추가하기 전에 이 스펙을
  갱신해 슬롯을 먼저 정한다. 카드마다 자기 자리를 고르는 것이 지금 상태를 만든
  원인이다.

## 6. 비목표

- **완료 행(2줄 `two_line` · 3줄 `doneThreeLineRow`)은 바꾸지 않는다.** 완료 행은
  이미 "무엇이 끝났나"만 답하도록 route·from을 걷어낸 별도 문법이라 통일할 좌표
  칩이 레포 하나뿐이다. 그 하나를 옮기려고 줄을 더하면 가장 긴 목록인 완료 레인만
  길어진다.
- 투영·서버·계약 표면(라벨 어휘, durable metadata 키, `status` 어휘)은 건드리지
  않는다. beads-ui는 그 계약의 소비자다.
- 칩의 문구·툴팁·색·클릭 동작은 바꾸지 않는다. 이동만 한다.
- 드래그 계약(`data-bead-id` / `data-lane`)은 바깥 껍데기에 걸려 있으므로 내부
  재배치의 영향을 받지 않는다.

## 7. 검증

- `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write`
- `npm run build` 후 `app/main.bundle.js`·`.map` 포함
- 렌더러 단위 테스트에서 다음을 확인한다.
  - 헤더 셀렉터(`.rtile__hd` · `.worker-card__head` · `.worker-mini__head` ·
    `.worker-mini__line`)에 레포 · 레인 · route · from 칩이 **없다**.
  - 좌표 칩이 `.worker-chips` / `.rtile__meta` 안에 §2 순서로 있다.
  - 좌표 칩이 없고 usage만 있는 실행중 타일에서 `.rtile__meta`가 **유지되고**
    usage가 그대로 보인다 (빈 줄 판정이 좌표·exec만 세지 않는다).
  - 슬롯 5 재료가 하나도 없으면 그 줄이 렌더되지 않는다.
  - `충돌 해소` 뱃지와 base 예외 뱃지가 `.rtile__hd`에 있고 `.rtile__meta`에 없다.
  - `miniRow` 한 줄·카드 변형의 usage가 슬롯 5 줄에 있고 정체성 줄/foot에 없다.
  - `.worker-deps`가 좌표 줄보다 앞선다.
  - 완료 2줄·3줄 행 마크업이 변하지 않는다.
- `AGENTS.md`에 §5.2의 규칙이 추가돼 있고, 본문이 이 스펙 경로를 가리킨다.
- 배치 후 공유 서버에서 Monitor 실행중 레인과 Worker 탭을 실제로 확인한다
  (UI 변경은 스크린샷으로 검증한다).
