# closed-issues 로딩 성능 개선 — 필터 순서 교정 + bd 쿼리 푸시다운

- Bead: UI-b6qs · Route: spec_backed · Base: main
- 작성일: 2026-08-03

## 배경 (측정 근거, 2026-08-03, workspace=dotfiles)

보드 첫 화면 완성까지 약 9.7초. 정적 자산은 문제가 아니다(번들 244KB/8.4ms,
`/api/config` 1.7ms). 병목은 `closed-issues` 구독 하나:

```
closed-issues 구독 단독      = 7716ms
  bd list (1000개)           =  186ms
  enrichIssuesWorkflow       = 3693ms (cold) / 1174ms (warm)
  bd dep list (1000 ids)     = 2276ms  (id 개수에 선형)
```

`server/workflow-enrich.js`의 `runGit()`이 `execFileSync` 동기 호출이라 이
시간 동안 이벤트 루프가 멈추고, 보드 6개 구독 스냅샷이 직렬화되어
2.2s → 6.7s → 9.2s 순차 도착한다. `poll_interval_seconds = 30`으로 이 비용이
클라이언트 접속 중 30초마다 반복된다.

결정적 낭비: 1000개 전부를 enrich + provenance에 통과시킨 **뒤에**
`applyClosedIssuesFilter`(`params.since`)로 걸러 실제로는 3개(today 기준)만
표시한다. 997개분이 순수 낭비다.

추가 발견(잠재 버그): closed 이슈는 전체 1493개인데 `--limit 1000`이 493개를
자르고, 반환 순서가 `closed_at` 기준이 아니다. 오늘 닫힌 이슈가 limit 컷에
밀려 'today' 뷰에서 조용히 누락될 수 있는 상태다.

## 변경 1 — 필터를 enrich 앞으로 이동

`server/list-adapters.js` `fetchListForSubscription`의 처리 순서를 바꾼다:

```
현재:  bd 호출 → enrichIssuesWorkflow → enrichIssuesProvenance → (호출자) 필터
변경:  bd 호출 → 필터 → enrichIssuesWorkflow → enrichIssuesProvenance
```

- `applyClosedIssuesFilter`를 `server/ws/context.js`에서 독립 leaf 모듈
  `server/closed-issues-filter.js`로 추출한다. `list-adapters.js`와
  `context.js`가 각각 이 leaf를 import하고, `context.js`는 re-export로 기존
  import 경로(`refresh.js`, `subscription-handlers.js`, 테스트)를 보존한다.
  list-adapters 경유 re-export를 쓰지 않는 이유: `./list-adapters.js`를 full
  mock하는 테스트 6개(`ws.list-subscriptions`, `ws.list-refresh.coalesce`,
  `ws.mutation-window`, `ws.snapshot-cache`, `ws.workspace-isolation`,
  `ws.git-pull-workspace`)가 `fetchListForSubscription`만 제공하므로,
  `context.js`가 list-adapters에서 re-export하면 mock 아래에서 필터가
  undefined가 되어 전부 깨진다. leaf 분리는 이 mock들을 무수정으로 통과시킨다.
- 호출자 2곳(`server/ws/refresh.js`, `server/ws/subscription-handlers.js`)의
  필터 호출은 그대로 둔다 — 필터는 멱등이므로 결과가 바뀌지 않고, 순서
  교정이 누락된 경로가 생겨도 잡아주는 안전망이 된다. 소비자는 이 2곳이
  전부임을 전수 확인했다.

## 변경 2 — bd 쿼리 푸시다운 (`--closed-after`)

`mapSubscriptionToBdArgs`의 `closed-issues` 케이스에서 `spec.params.since`가
유효한 양수이면 `--closed-after <RFC3339>`를 추가한다.

- **경계 처리**: `--closed-after`는 exclusive임을 실측으로 확인했다(동일
  시각 지정 시 해당 이슈 제외). 기존 필터는 inclusive(`>= since`)이므로,
  bd에는 `since - 1000ms`를 RFC3339로 넘기고 최종 경계 판정은 그대로
  `applyClosedIssuesFilter`가 맡는다. `closed_at` 정밀도는 초 단위라 1초
  slack이 충분하다.
- `since`가 없는 '전체' 범위는 기존과 동일(`--limit 1000`만 적용).
- `--limit 1000`은 유지한다. 범위 쿼리에서는 bd가 먼저 거른 뒤 limit이
  적용되므로(today 3개, 30d 289개) limit에 걸리지 않는다.

## 표시 결과 의미론

범위 뷰(today/7d/30d)의 카드는 **동일하거나, limit 컷으로 잘못 누락되던
카드가 복원된다**(회귀가 아니라 교정). 카드 내용·칩·스테퍼는 불변 —
필터를 통과한 이슈는 지금과 똑같이 enrich + provenance를 거친다.

기대 효과: closed-issues 경로 5676ms → 약 293ms (정상 부하 실측, 약 19배).
이벤트 루프 블록 구간이 같이 줄어 나머지 5개 구독의 직렬화 지연도 해소된다.

## 범위 밖 (별도 Bead로 분리)

- `execFileSync` → 비동기 전환(`workflow-enrich.js` 전반 + 호출자 시그니처
  연쇄 변경). 이번 변경 후 남는 이득이 작다.
- '전체' 범위 선택 시 남는 비용(1493개 중 1000개 truncation + 약 5.7초).
  기존 동작 그대로이며 사용자가 명시적으로 선택한 경우에만 발생.
- 자정 롤오버 시 `since`가 구독 시점 고정인 기존 동작.

## Test scope

RED → GREEN 시맨틱 seam (`server/list-adapters.test.js`):

1. `mapSubscriptionToBdArgs({ type: 'closed-issues', params: { since } })` —
   `--closed-after` 포함, 경계값이 `since - 1000ms`의 RFC3339, `--limit 1000`
   유지. (현재 구현은 params를 무시하므로 비공허 RED.)
2. `fetchListForSubscription`(closed-issues, since 지정) — 범위 밖 이슈가
   enrich/provenance에 도달하지 않고, 반환 items가 필터 적용 결과. (현재
   구현은 전체를 enrich한 뒤 반환하므로 비공허 RED.)

회귀 가드 (RED 아님 — 이동·불변 보증):

- `mapSubscriptionToBdArgs({ type: 'closed-issues' })` (since 없음) —
  `--closed-after` 미포함, 기존 args 불변.
- `applyClosedIssuesFilter`의 leaf 추출 후에도 `server/ws/context.js` 경유
  import가 동작 — 기존 `ws.list-subscriptions.test.js` 등 회귀로 커버.
- full mock 테스트 6개(`ws.list-subscriptions`, `ws.list-refresh.coalesce`,
  `ws.mutation-window`, `ws.snapshot-cache`, `ws.workspace-isolation`,
  `ws.git-pull-workspace`)가 무수정으로 green.
- `list-adapters.test.js` 전체 green.

## 검증

- Pre-Handoff: `npm run lint` / `npm run tsc` / `npm test` /
  `npm run prettier:write` / `npm run build` (번들 포함 커밋).
- 실측: WebSocket 부트스트랩 프로브 재실행 — 6개 스냅샷 전부 1초 미만 도착
  목표(현재 9.7초).
- Post-Merge: `bdui-shared restart` 후 프로세스 경로·포트·HTTP 응답 확인.
