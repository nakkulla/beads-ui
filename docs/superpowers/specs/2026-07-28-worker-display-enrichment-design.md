# 워커 탭 표시 정보 보강 설계 (UI-d7pw)

- 날짜: 2026-07-28
- Bead: UI-d7pw
- 상태: 사용자 설계 승인 완료

## 배경과 문제

워커 탭과 이슈 상세에서 지금 읽을 수 없는 사실이 셋 있다.

**1. 이슈별 토큰 소모량.** `Attempt.usage`는 이미 `queue.json`에 영속되고
(`server/worker/queue-store.js` `Attempt.usage`), 워커 레인 행에는
`τ 12.3k` 배지로 나온다. 그러나 이슈 상세 패널에는 아무 표시가 없다. 상세
패널은 이미 `queueStore`의 `attempts`를 읽어 세션 이력을 그리므로
(`app/views/detail-panel/index.js:111` `attemptsForBead()`), 데이터는 이미
클라이언트에 도착해 있는데 렌더링만 없는 상태다.

**2. 완료 레인 순서.** `q.done`은 `added_at`과 함께 append만 되고 정렬도
가지치기도 없다(`queue-store.js:1137`, `:1230`). 따라서 화면에는 **오래된
것이 위, 방금 끝난 것이 맨 아래**로 나온다. 2026-07-28 실측: beads-ui
워크스페이스 `done` 23건, `added_at` 완전 오름차순, 2일치(07-27 03:54Z ~
07-28 11:38Z). 레인 헤더는 `완료 · 오늘 N`이라고 적혀 있지만 오늘 필터는
어디에도 없다 — 문구가 사실이 아니다.

**3. bead 생성·수정 시각.** Board 카드는 `formatRelativeTime`으로
`생성 2일 전 · 수정 3시간 전`을 이미 그린다(`app/views/board/card.js:258`
`timesTemplate`). 워커 레인 행에는 없다. `대기`/`PR 대기`/`완료` bead는
Ready/Blocked 구독 컬럼 밖이라 클라이언트가 타임스탬프를 가진 적이 없고,
서버의 `title-cache`는 제목만 실어 보낸다(`server/ws/worker-handlers.js:471`
`beadTitlesFor`).

## 목표

1. 이슈 상세 세션 이력에서 attempt별 토큰 소모량과 이슈 총합을 읽을 수 있다.
2. 완료 레인이 최신순으로 나오고, Board 탭과 같은 어휘의 기간 필터로 범위를
   좁힐 수 있다.
3. 워커 탭 모든 레인의 행에서 bead 생성·수정 시각을 읽을 수 있다.

## 비목표

- 토큰 비용 예산/알림, 워크스페이스 전체 토큰 통계 화면.
- 완료 레인 항목의 영구 가지치기(기간 필터는 표시 범위만 좁히고
  `queue.json`의 `done` 배열은 건드리지 않는다).
- Board 탭 Closed 컬럼의 동작 변경.

## 1. usage 집계 계약 변경 (나머지의 전제)

### 1.1 무엇을 바꾸는가

`app/views/worker/usage.js`의 `lastAttemptUsage()`는 bead의 **마지막 attempt
하나**만 반환한다. 그 근거는 doc-comment에 명시돼 있다:

> A last attempt without usage yields null rather than falling back to an
> older one: showing the previous run's number next to a fresh attempt would
> be a lie about which session spent it.

이 계약을 **의도적으로 뒤집어** 해당 bead의 **모든 attempt 합계**로 바꾼다.

### 1.2 근거

배지가 답하는 질문이 바뀌었다. 기존 계약은 "지금 도는 이 세션이 얼마나
쓰고 있나"에 답하려고 마지막 attempt를 골랐다. 사용자가 요구한 질문은
**"이 이슈에 총 얼마 들었나"**이고, 이 질문은 실패한 재시도까지 포함해야
답이 된다 — 실패한 attempt가 쓴 토큰도 그 이슈가 쓴 토큰이다.

따라서 워커 레인 배지와 이슈 상세 총합이 **같은 수**를 보인다. 두 곳이 다른
수를 보이는 상태를 만들지 않는다.

### 1.3 구현

- `lastAttemptUsage()` → `sumAttemptUsage(attempts, bead_id)`:
  - `input_tokens` / `output_tokens` / `cache_read_input_tokens` /
    `cache_creation_input_tokens` 4개 필드를 합산한다.
  - `total_cost_usd`는 **보고된 attempt만** 합산한다. 아무도 보고하지 않았으면
    필드를 싣지 않는다(0을 지어내지 않는다).
  - `replayed`는 attempt 중 **하나라도** `true`면 `true`. 부분 집계 경고는
    전파되어야 한다 — 합계 안에 복구된 부분값이 섞였다면 합계 자체가 하한이다.
  - 토큰 필드를 하나도 보고하지 않은 bead는 기존과 동일하게 `null`을 반환한다
    (보고된 0과 미보고는 다른 사실이라는 기존 규칙 유지).
- 모듈을 `app/views/worker/usage.js` → **`app/utils/token-usage.js`**로 옮긴다.
  소비자가 워커 뷰 하나에서 상세 패널까지 둘로 늘어나므로, `relative-time.js`
  등 공용 포맷터가 사는 자리로 옮기는 것이 맞다. `usage.test.js`도
  `app/utils/token-usage.test.js`로 함께 옮긴다.
- `formatUsageTotal()` / `usageTooltip()`은 시그니처 변경 없이 그대로 이동한다.
- doc-comment의 §1.1 인용 문단을 §1.2의 근거로 교체한다. 계약이 바뀌었다는
  사실 자체가 기록되어야 한다.

### 1.4 파급

- `app/views/worker/index.js:1560`(완료 행), `:1801`(PR 대기 행)의
  `lastAttemptUsage` 호출을 `sumAttemptUsage`로 교체한다.
- **실행 중 타일도 합계로 바꾼다.** 지금 실행 타일은
  `usage: a.usage || null`(`index.js:1648`)로 그 attempt의 라이브 tally만
  쓴다. 이대로 두면 재실행된 bead의 실행 타일만 혼자 다른 수를 보이게 되어
  "모든 레인의 τ 배지가 같은 질문에 답한다"는 §1.2가 깨진다.
  `sumAttemptUsage(q.attempts, a.bead_id)`로 교체한다 — 서버가 스냅샷에
  라이브 tally를 이미 접어 넣으므로(`worker-handlers.js:517`) 합계에 실행
  중 attempt의 현재값이 포함되고, 실행이 진행되면 값이 계속 올라간다.
- 툴바 KPI `token_total`("오늘 토큰", `index.js:1745`~`:1768`)은 완료 행의
  `usage`를 합산할 뿐이므로 **코드 변경 없이** 참 총합이 된다. 다만 그 위의
  주석(`"완료 레인의 행이 이미 들고 있는 마지막 attempt usage를 합산할 뿐"`)은
  사실이 아니게 되므로 갱신한다.
- import 경로를 갱신해야 하는 곳은 **런타임 2곳 + JSDoc 3곳**이다. 하나라도
  빠지면 파일 이동 시 import 또는 `tsc`가 깨진다:
  - 런타임 `import`: `app/views/worker/lanes.js:16`,
    `app/views/worker/running-grid.js:15`,
    `app/views/worker/index.js:46`
  - JSDoc `@property`/`@param` 타입 참조: `app/views/worker/lanes.js:68`,
    `app/views/worker/running-grid.js:31`, `app/views/worker/index.js:532`
- 기존 `usage.test.js`의 `lastAttemptUsage` 테스트는 **4건**이다
  (`:89` 마지막 attempt 선택, `:100` 마지막이 usage 없을 때 폴백 금지,
  `:109` 다른 bead의 attempt 무시, `:117` 빈 attempts map). 네 건 모두
  `sumAttemptUsage`로 이관하되 계약이 바뀌는 두 건은 의미를 다시 쓴다:
  `:89`는 "모든 attempt를 합산", `:100`은 "usage 없는 attempt는 합계에서
  건너뛰되 다른 attempt의 값은 살린다"가 된다. `:109`(bead 필터)와
  `:117`(빈 map → `null`)의 계약은 그대로다. 여기에 합산·`replayed` 전파·
  `total_cost_usd` 부분 보고·전원 미보고 시 `null` 케이스를 추가한다.

## 2. 이슈 상세 — 세션 이력에 토큰

### 2.1 데이터

서버 변경 없음. `attemptsForBead()`(`detail-panel/index.js:120`~`:133`)의
매핑에 `usage: a.usage || null`을 추가하고, `session-history.js`의
`SessionAttempt` typedef에 `usage` 필드를 추가한다.

### 2.2 표시

- **행 인라인**: 각 세션 행에 `formatUsageTotal(a.usage)` 결과를 `τ 23.0k`
  배지로 싣는다. `null`이면 아무것도 그리지 않는다.
- **섹션 총합**: `세션 이력` 라벨 옆에 이슈 전체 합계를 `τ 총 139.4k · $2.41`
  형태로 싣는다. 합계는 §1.3의 합산 규칙을 그대로 쓴다. 비용은 보고된
  attempt가 있을 때만 붙인다.
  합계에 `replayed`가 섞였으면(§1.3에 따라 하나라도 있으면 전파된다)
  총합 옆에 `부분 집계` 표시를 붙이고 툴팁에
  `서버 재시작 복구 — 부분 집계`를 싣는다. 하한값을 정확한 총합처럼
  보이게 두지 않는다.
- **[τ 자세히] 버튼**: 각 행에 형제 버튼으로 붙인다. 클릭하면 그 행 아래로
  분해가 펼쳐진다 — 입력 / 출력 / 캐시 읽기 / 캐시 생성 / 비용. `replayed`인
  attempt는 `서버 재시작 복구 — 부분 집계` 주석을 함께 그린다.
  펼침 상태는 컴포넌트 로컬이며 영속하지 않는다.

### 2.3 구조 근거

세션 행은 이미 `클릭 = 트랜스크립트 열기`이고, `↻ 이어하기`는 형제 버튼,
실패 원인(`causeLine`)은 행 아래 형제 `div`다. [자세히] 버튼과 펼침 영역은
그 구조에 형제를 하나 더 붙이는 것이라 새 오버레이 레이어가 생기지 않고,
행 클릭 = 트랜스크립트라는 기존 관례도 깨지지 않는다(버튼은 `stopPropagation`).

## 3. 완료 레인 — 최신순 + 기간 필터

### 3.1 정렬

`q.done`을 `toRows`에 넘기기 전에 복사해 `added_at` **내림차순**으로 정렬한다.
원본 배열은 변형하지 않는다(`queueStore`의 스냅샷은 공유 객체다).

### 3.2 기간 필터

- `app/data/closed-range.js`를 **수정 없이 import**한다:
  `CLOSED_RANGE_OPTIONS`(오늘 / 최근 7일 / 최근 30일 / 전체),
  `closedRangeSince()`, `isClosedRange()`, `DEFAULT_CLOSED_RANGE`(`today`).
  Board 탭과 기간 어휘를 일치시키는 것이 요구사항이므로 워커 전용 옵션 세트를
  만들지 않는다.
- 데이터가 전부 클라이언트에 있으므로 **순수 클라이언트 필터**다. 서버 구독
  필터(Board Closed 컬럼이 쓰는 `applyClosedIssuesFilter`)는 관여하지 않는다.
- 비교 기준은 `QueueEntry.added_at`(레인 진입 시각)이다. bead의 `updated_at`이
  아니다 — 완료 레인이 답하는 질문은 "언제 완료됐나"다.
- 저장: `localStorage['bdui.worker.done-range']`. 읽기 실패/미상의 값은
  `DEFAULT_CLOSED_RANGE`로 폴백한다(후보 정렬의
  `bdui.worker.candidate_sort` 패턴과 동일).

### 3.3 셀렉트 배치

`paneTemplate`의 **`controls` 슬롯**에 넣는다. `header_control`이 아니다:
`lanes.js:364`에서 `header_control`은 non-collapsible 헤더 분기에만 렌더되고,
완료 레인은 모바일에서 `collapsible: true`(`index.js:2093`)이므로
`header_control`에 두면 모바일에서 사라진다. `controls`는 접히지 않은 동안
양쪽 분기 모두에서 렌더된다(`lanes.js:369`).

### 3.4 헤더 문구

`완료 · 오늘 N`(`index.js:2127`)을 선택된 범위에 맞게 바꾼다
(`완료 · 최근 7일 N`, `완료 · 전체 N`). 기본값이 `today`이므로 기본 문구는
그대로 `완료 · 오늘 N`이지만, 이제 **실제로 참**이 된다. `N`은 필터 적용 후의
행 수다.

모바일 접힌 상태의 `preview`(`index.js:2095`, `m.token_total`)는 그대로
유지한다.

### 3.5 툴바 KPI의 파급

툴바의 `오늘 완료 N`(`index.js:1858`)과 `오늘 토큰`(`token_total`)은 둘 다
완료 행에서 계산된다. 완료 행이 기간 필터를 타면 두 KPI도 선택된 범위를
따라간다. 이는 의도한 동작이다 — 화면에 보이는 목록과 그 목록의 집계가
다른 범위를 가리키는 편이 더 나쁜 오독이다.

다만 토큰 KPI의 라벨을 `최근 7일 토큰`으로 두어서는 안 된다. §1의 합계는
bead의 **전 생애 attempt 합**이므로, 이 KPI가 세는 것은 "최근 7일에 쓴
토큰"이 아니라 **"최근 7일에 완료된 이슈들이 생애 전체에 쓴 토큰"**이다.
7일 전에 시작해 어제 끝난 bead의 첫날 토큰까지 들어간다. 따라서 라벨을
코호트 의미로 적는다: `오늘 완료 이슈 누적 토큰` /
`최근 7일 완료 이슈 누적 토큰`. 라벨이 길어지므로 축약형
(`오늘 완료 · 누적 τ`)을 쓰고 정확한 문장은 툴팁에 싣는다.

완료 건수 KPI는 코호트 자체를 세므로 모호하지 않다 — `최근 7일 완료`로
범위만 반영한다.

"기간 내에 실제로 소모된 토큰"은 attempt의 종료 시각으로 따로 필터링해야
나오는 다른 수이며, 이번 범위 밖이다.

## 4. 레인 행에 생성·수정 시각

### 4.1 표시 형태 (별도 메타 줄)

행의 본문 줄은 그대로 두고, 그 아래에 흐린 메타 줄을 붙인다:
`생성 2일 전 · 수정 3시간 전`. 툴팁에는 `formatTimestampLocal`의 절대시각.
포맷은 Board 카드의 `timesTemplate`(`board/card.js:258`)과 동일하게 맞춘다.

**인라인이 아니라 별도 줄인 이유**: 한 줄 변형 행은 이미
그립·ID·제목·PR링크·뱃지·reason·usage·버튼을 싣고 있어, 인라인으로 넣으면
제목이 먼저 잘린다. 완료 레인의 세로 길이가 늘어나는 대가는 §3의 기간 필터가
기본 `오늘`로 잡아 준다.

변형별 배치:

- **한 줄 변형**(대기/완료): `.worker-mini` 껍데기는 유지한 채 내부를
  `.worker-mini__line` + `.worker-mini__meta` 2단으로 감싼다. 드래그 계약은
  껍데기의 `data-bead-id`/`data-lane`에 걸려 있으므로(`lanes.js:215`~`:225`)
  내부 재구성은 안전하다.
- **카드 변형**(PR 대기 / REVISE 파킹): `worker-mini__foot`에 usage 옆으로
  넣는다. 이미 3단 카드이므로 줄이 늘지 않는다.
- **후보 카드**: `worker-card__foot`에 넣는다.
- **실행 중 타일**(`running-grid.js`): 목표가 "워커 탭 모든 레인"이므로
  실행 타일도 포함한다. 현재 `RunningTile` typedef에는 시각 필드도 렌더
  경로도 없으므로 둘 다 새로 만든다 — `RunningTile`에
  `created_at`/`updated_at`을 추가하고, usage 배지가 사는
  메타 영역(`running-grid.js:376`~`:386`) 아래에 같은 메타 줄을 그린다.
  데스크톱 레인과 모바일 "지금" 패널이 같은 타일을 쓰므로 두 경로 모두
  테스트한다.

시각이 하나도 없는 행은 메타 줄 자체를 그리지 않는다(fail-quiet).

### 4.2 데이터 — 클라이언트

`MiniItem`과 `RunningTile`에 `created_at`/`updated_at`
(`number|string|undefined`)을 추가한다.

후보 레인은 Board 구독 이슈이므로 이미 두 필드를 들고 있다 — 서버 배선 없이
바로 그린다. 실행 중 타일이 그리는 bead는 `q.queue` 멤버이므로 §4.3의
`bead_times`가 그대로 덮는다(별도 배선 없음). 실행 타일 projection
(`index.js:1629`~)에서 `bead_times`를 조회해 두 필드를 실어 준다.

### 4.3 데이터 — 서버 배선

`대기`/`PR 대기`/`완료` bead는 구독 컬럼 밖이라 서버가 실어 보내야 한다.

- `server/worker/title-cache.js`가 이미 `bd show`를 돌려 제목을 캐시하므로,
  **같은 응답에서** `created_at`/`updated_at`을 함께 캐시한다. `bd` 호출이
  늘지 않는다.
- 와이어: 기존 `bead_titles: Record<string, string>`은 그대로 두고
  `bead_times: Record<string, { created_at, updated_at }>`을 나란히 추가한다.
  기존 계약을 깨지 않고, 캐시 miss 시 "이번 스냅샷에서 빠지고 다음 스냅샷에
  도착"이라는 부분성 의미도 제목과 동일하게 유지된다
  (`worker-handlers.js:463` PARTIAL BY DESIGN).
- 클라이언트는 `bead_times`가 없으면 메타 줄을 그리지 않는다(구버전 서버
  fail-quiet).

### 4.4 신선도 — positive TTL 5분

title-cache의 현행 계약은 "제목 rename은 프로세스 재시작까지 stale 허용"이다
(`title-cache.js` 모듈 주석). 이 계약을 `updated_at`에 그대로 적용하면
**"수정 3시간 전"이 영원히 갱신되지 않는다** — `updated_at`은 rename보다 훨씬
자주 바뀌고, stale이 화면에서 즉시 눈에 띈다.

따라서 title-cache에 **positive TTL 5분**을 도입한다.

**cold miss와 expired hit은 서로 다른 상태이며 다르게 처리한다.** 둘을 뭉뚱그리면
"만료 중에도 기존 값을 계속 보낸다"는 규칙과 "실패한 bead는 이번 스냅샷에서
뺀다"는 규칙이 서로 모순된다.

| 상태 | 동기 읽기(`titlesFor`) 반환 | 재조회 |
|---|---|---|
| cold miss (캐시에 값이 없음) | **생략** — 이번 스냅샷에서 뺀다 (현행 동작) | 비동기 fill 큐에 넣고, 도착하면 fanout |
| fresh hit (TTL 이내) | 캐시 값 | 없음 |
| expired hit (값은 있고 TTL 초과) | **stale 값을 그대로 반환** | 1회 비동기 재조회 |

재조회가 **실패**했을 때:

- cold miss였으면 현행과 같다 — 계속 생략하고 `NEGATIVE_TTL_MS`(60초) 동안
  재시도를 억제한다.
- expired hit이었으면 **stale 값을 유지**한다. 값을 지우지 않는다 — `bd`가
  잠시 실패했다는 이유로 이미 보여 주던 제목과 시각을 화면에서 없애는 것은
  퇴행이다. `NEGATIVE_TTL_MS` 동안 재시도만 억제하고, 그 뒤 다시 시도한다.

`ensureTitle(workspace, bead_id)`(`title-cache.js:310`, 다음 스냅샷이 없는
Discord 푸시 소비자용)의 계약도 함께 고정한다: **expired hit이면 재조회를
await한다** — 이 호출자는 "다음 스냅샷에 도착"이라는 폴백이 없으므로
stale-while-revalidate가 성립하지 않는다. 재조회가 실패하면 stale 값을
반환한다(`null`이 아니다). cold miss에서 실패했을 때만 지금처럼 `null`이다.

5분인 근거: 레인의 상대시각은 "대략 얼마 전"을 읽는 값이라 5분 해상도로
충분하고, bead당 최대 12회/시간이면 레인 크기(수십 건)에서 `bd` 부하가
무시할 수준이다. 기존 `NEGATIVE_TTL_MS`(60초)는 값과 의미 모두 그대로 둔다.

제목도 같은 TTL을 타게 되므로 rename 반영이 덤으로 개선된다.

## 오류 처리

- `usage`가 없는 attempt, `bead_times`가 없는 행, `created_at`/`updated_at`이
  없는 bead는 모두 **아무것도 그리지 않는다**. 0이나 "알 수 없음"을 그리지
  않는다 — 미보고와 0은 다른 사실이라는 기존 규칙을 따른다.
- `localStorage` 읽기/쓰기 실패는 삼켜지고 기본값으로 폴백한다(기존
  `candidate_sort`/`lane-collapsed` 패턴과 동일).
- `title-cache`의 `bd show` 실패는 `NEGATIVE_TTL_MS` 동안 재시도를 억제한다.
  그 bead가 이번 스냅샷에서 빠지는 것은 **cold miss일 때만**이다 —
  expired hit은 stale 값을 유지한다(§4.4 표).

## 테스트 범위

- `app/utils/token-usage.test.js`: 기존 4건 이관(마지막→합산, usage 없는
  attempt 건너뛰기, bead 필터, 빈 map → `null`) + `total_cost_usd` 부분 보고,
  `replayed` 전파, 전원 미보고 시 `null`.
- 실행 중 타일: 이전 attempt + 실행 중 attempt의 라이브 usage가 합산되어
  배지에 나오는지 (§1.4).
- 완료 레인: `added_at` 내림차순 정렬, 기간 필터 경계(`today` 시작 시각),
  범위별 헤더 문구, 코호트 의미의 KPI 라벨(§3.5).
- 세션 이력: `usage` 배지 렌더, 섹션 총합, 총합의 `replayed` 부분 집계 표시,
  [자세히] 펼침 토글, `usage` 없는 attempt에서 배지 미렌더.
- 레인 메타 줄: `bead_times` 있음/없음, 네 변형(한 줄 / 카드 / 후보 카드 /
  실행 타일)별 배치, 실행 타일은 데스크톱·모바일 두 경로.
- 서버 `title-cache`: 타임스탬프 캐시, cold miss 생략, expired hit의 stale
  반환 + 1회 재조회, 재조회 실패 시 expired hit의 stale 유지 대 cold miss의
  생략, `ensureTitle`의 expired hit await 및 실패 시 stale 반환,
  `bead_times` 와이어 필드의 부분성.

## 마감 조건

`npm run tsc` / `npm test` / `npm run lint` / `npm run prettier:write` 통과 후
`npm run build`로 `app/main.bundle.js`(+ `.map`) 갱신본을 포함한다. 머지 후
`bdui-shared restart`와 프로세스 경로·포트·HTTP 응답 검증까지 마쳐야 완료다
(AGENTS.md Post-Merge Runtime Validation).
