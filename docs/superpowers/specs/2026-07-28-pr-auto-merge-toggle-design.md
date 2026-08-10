# PR 자동 머지 토글 설계 (UI-yk55)

- 날짜: 2026-07-28
- Bead: UI-yk55
- 상태: 사용자 설계 승인 완료

## 후속 설계에 따른 범위 정정

[`2026-08-11-self-healing-auto-merge-completion-intent-design.md`](./2026-08-11-self-healing-auto-merge-completion-intent-design.md)가
worker-owned PR의 repairable verify/CI red와 post-merge cleanup red를 같은 root
intent로 자동 복구하는 범위를 후속 정의한다. 따라서 이 문서의 durable 토글,
자동 편입, 순차 driver, SHA-bound skip은 그대로 유효하지만, repairable failure를
항상 skip하고 사람에게 넘긴다는 범위는 후속 설계로 대체된다. external PR,
terminal failure, 수동 경로의 기존 의미는 유지한다.

후속 구현은 새 Beads workflow metadata key를 만들지 않는다. 서버 소유 journal은
`queue.json.completion_intents`이며, 배포 SoT와 post-merge 확인 책임은 계속
`docs/agents/repo-ops.toml`의 기존 `[deploy]` 선언을 따른다.

## 배경과 문제

UI-5v7d로 순차 머지 큐가 이미 있다. `merge_queue`는 durable하고, 드라이버
(`server/worker/merge-queue.js`)는 항목마다 재게이트 → BEHIND면 update-branch
→ squash → cleanup을 돌린다. 충돌 항목은 해소 세션을 자동 디스패치하고
세션 종료를 기다렸다가 **자동으로 재머지**한다(`RESOLUTION_ROUND_CAP = 2`,
대기 한도 30분).

즉 사용자가 요청한 "충돌 해소 후 머지"는 **이미 동작하고 있다**. 두 가지가
빠져 있을 뿐이다.

**1. 라벨이 그 사실을 숨긴다.** 충돌 행의 버튼은 `충돌 해소`라고만 적혀 있어
(`app/views/worker/index.js:702`) 해소만 하고 멈추는 것처럼 읽힌다. 정작
같은 객체의 툴팁(`:717`)은 `충돌 — 큐에 넣으면 해소 세션을 띄우고 완료 후
자동으로 재머지합니다`라고 정확히 말한다. 라벨과 툴팁이 어긋나 있다.

**2. 큐를 채우는 일이 여전히 수동이다.** `[일괄 머지]`
(`worker-merge-queue-add-all`)는 **클릭 시점에** 자격 있는 행만 넣는
일회성이다. 그 뒤에 CI가 초록이 되거나 새 PR이 `pr_wait`에 도착하면 사람이
다시 눌러야 한다. PR이 쌓이는 동안 화면을 지켜보고 있어야 한다.

## 목표

1. 충돌 행의 버튼 라벨이 실제 동작을 말한다.
2. `[일괄 머지]`를 durable 토글로 바꿔, 켜 두면 `pr_wait`에 쌓이는 PR을
   자격이 생기는 대로 계속 큐에 편입해 순서대로 충돌 해소·머지한다.
3. 자동 편입이 실패 항목을 무한히 재시도하지 않는다.
4. beads-ui 자신을 머지해 서버가 재시작해도, 그리고 브라우저 탭을 닫아도
   자동화가 이어진다.

## 비목표

- 병렬 머지, 큐 순서 재배열 UI.
- 충돌 해소 세션 자체의 동작 변경(UI-dxgz / UI-5v7d 현행 유지).
- 머지 게이트 판정 로직 변경(`merge-gate.js` 무변경).
- `auto_advance`(세션 디스패치 자동 진행)와의 결합. 두 자동화는 **독립**이다 —
  세션을 띄우는 것은 되돌릴 수 있고 머지는 되돌릴 수 없으므로, 한 스위치가
  둘을 함께 켜서는 안 된다.

## 1. 충돌 해소 버튼 라벨 정합

`index.js:702`의 `'충돌 해소'` → **`'충돌 해소 후 머지'`**.

동작 변경 없음. 툴팁(`:717`)은 이미 정확하므로 그대로 둔다. 순수 라벨
정합이며, 이 변경만으로도 "해소하고 끝"이라는 오독이 사라진다.

## 2. durable 상태

`queue.json`(`server/worker/queue-store.js`)에 두 필드를 추가한다.

```
auto_merge: boolean
auto_merge_skips: Record<bead_id, {
  head_sha: string,
  reason: string,
  at: number
}>
```

- `auto_merge` 기본값 `false`. `auto_advance` 옆에 둔다.
- 둘 다 durable인 이유는 같다: **beads-ui를 머지하면 beads-ui가 재시작한다**
  (cleanup의 deploy 단계). 메모리에 두면 자기 자신을 머지한 순간 자동화가
  꺼지고 제외 기록이 날아가 §3의 무한 루프가 부활한다. `merge_queue`와
  `resolution_rounds`가 durable인 것과 정확히 같은 근거다.
- 구버전 `queue.json`은 두 키가 없다 → 로드 시 `false` / `{}`로 정규화한다.

## 3. 제외 규칙 — 무한 루프 방지

### 3.1 막으려는 것

`queue-store.js:1536`은 큐에 넣을 때마다 `resolution_rounds: 0`으로 리셋한다.
지금은 사람이 클릭해야 재진입하므로 문제가 되지 않는다. 자동 편입기가 붙으면
이렇게 된다:

> 충돌 행 → 해소 세션 2회 → `resolution_round_cap`으로 스킵·dequeue →
> **여전히 충돌 = `mergeQueueCandidates` 자격 유지** → 자동 재편입 →
> `resolution_rounds` 0부터 다시 → 무한 반복

헤드리스 세션이 계속 뜨므로 실제 비용이 나간다. `refused`로 스킵된 항목도,
Tier 3(`검증 신호 없음`)에서는 `gate.enabled`가 계속 `true`라 같은 루프에 빠진다.

### 3.2 규칙

- 드라이버가 항목을 실패로 처분할 때, 그 시점의 **관측 head SHA**와 사유를
  `auto_merge_skips[bead_id]`에 durable 기록한다.
- **기록과 dequeue는 하나의 원자적 변이여야 한다.** 둘을 따로 쓰면 "기록은
  됐는데 dequeue 전에 크래시" 사이에서 항목이 큐에 남고, 부팅 재개 드라이버가
  같은 head를 다시 머지한다. 반대 순서면 skip 없이 dequeue되어 자동 편입기가
  즉시 재편입한다. `queue-store`에 두 변이를 함께 수행하는 단일 API를 만든다.
- **head SHA를 읽을 수 없거나 기록이 persist되지 않으면 dequeue하지 않는다.**
  대신 드라이버를 `halted`시켜 이번 드레인을 끝낸다 — 큐는 durable하므로 다음
  kick이나 재시작이 이어받고, 관측이 복구된 뒤 제대로 처분된다. skip을 남기지
  못한 채 dequeue하는 것이 §3.1 루프의 유일한 재발 경로다.
- **부팅 재개 드라이버도 skip 필터를 통과해야 한다.** `drain()`은 durable
  `merge_queue`의 head를 그대로 집어 `processItem`을 돌리므로, 편입기에만
  필터를 두면 재시작이 필터를 우회한다. `processItem` 진입 시 해당 bead의
  skip 레코드를 확인하고, 현재 head SHA와 같으면 머지를 시도하지 않고 그
  자리에서 dequeue한다.
- `restored`(부팅 시 살아 있던 해소 세션) 경로의 `resolution_round_cap` /
  `resolution_timeout` 처분은 `merge()` 호출 **전에** 일어난다. 재시작 직후에는
  `pr-observations` 캐시가 비어 있어 head SHA를 못 읽으므로, 이 경로는 위
  규칙에 따라 dequeue하지 않고 관측이 도착할 때까지 기다린다.
- 자동 편입기는 skip 레코드가 있고 **현재 관측 head_sha가 기록된 값과 같으면**
  편입하지 않는다.
- head_sha가 **다르면** 레코드를 지우고 편입한다. 해소 세션이든 사람이든
  브랜치를 실제로 움직였다면 자동으로 다시 후보가 된다.
- head_sha를 읽을 수 없으면(관측 오류/미관측) **편입하지 않는다** — fail
  closed. 게이트의 첫 번째 규칙과 같은 태도다.
- **수동 `[머지]` 클릭은 레코드를 무시하고 삭제한다.** 사람이 명시적으로
  재시도한 것이므로 자동화의 제외 판단이 이를 막아서는 안 된다.

### 3.2.1 레코드 수명 — external 행 때문에 lane 훅으로는 부족하다

durable `pr_wait` 이탈(머지 성공, `[폐기]`, PR closed 처분)에는 lane 변이
훅에서 레코드를 지운다. 그러나 **external 행은 `queue.json.pr_wait`에 없다** —
`getWorkerRuntime().externalPrs.list()`가 돌려주는 메모리 overlay를 스냅샷
합성 시점에 얹은 것이다(`server/ws/worker-handlers.js:152`~`:173`). external
행이 사라질 때는 어떤 lane 변이도 일어나지 않으므로 훅이 발화하지 않는다.

따라서 자동 스캔이 돌 때마다 **durable `pr_wait` ∪ external overlay**의
합집합에 없는 `auto_merge_skips` 키를 함께 prune한다(편입과 같은 변이 안에서).
그대로 두면 기록이 누적되고, 같은 bead가 같은 head로 다시 나타났을 때 지난
실패가 잘못 적용된다.

### 3.3 구현 지점

- `merge-queue.js`의 `fail(bead_id, reason)`은 현재 메모리 `failures` Map만
  쓴다. 모든 실패 처분이 이 한 함수를 지나므로 durable skip 기록도 여기에서
  출발하되, 실제 쓰기는 §3.2의 "기록 + dequeue 원자 변이" API를 호출한다.
- head SHA는 새 dep `headSha: (bead_id) => string|null`로 주입한다
  (`pr-observations` 캐시의 동기 읽기). `deps.observePr`는 `{state, error}`만
  돌려주므로 재사용할 수 없다.
- 드라이버에 새 네트워크 호출을 추가하지 않는다.

### 3.4 표시

제외된 행에 `자동 제외: <사유>` 뱃지를 단다. 자동 모드가 켜져 있는데 왜
저 행만 안 도는지가 화면에서 읽혀야 한다. 사유 문구는 기존
`mergeFailureText()`(`index.js:489`)의 어휘를 재사용한다.

## 4. 자동 편입기

### 4.1 배치 — `queue-changed` 구독 (채택)

새 모듈 `server/worker/auto-merge.js`를 만들고
`onQueueChanged(workspace)`(`server/worker/queue-events.js`)를 구독한다.
`auto_merge`가 켜져 있으면 §4.2의 공용 편입 함수를 호출한다.

PR poller는 관측을 갱신할 때마다 이미 `queue-changed`를 emit한다
(`pr-poller.js:225`, `:389`, `:431`, `:515`, `:545`). 따라서 새 타이머 없이
"관측이 바뀌는 바로 그 순간"에 반응한다.

**검토한 대안**

- *드라이버 내부 흡수*: `merge-queue.js`가 큐가 비면 스스로 다음 후보를 찾게
  한다. 모듈이 늘지 않지만, 드라이버는 이미 `merge()` 결과 6가지 처분으로
  꽉 차 있다. "큐를 채우는 책임"과 "큐를 소비하는 책임"이 섞인다.
- *주기 타이머 폴링*: 30초마다 스캔. 가장 단순하지만 반응이 느리고, 쓸 수
  있는 이벤트 배선이 이미 있는데 새 타이머를 하나 더 단다.

### 4.2 편입은 persist 하나로 끝나지 않는다 — 공용 함수 추출

현재 `[일괄 머지]`가 실제로 하는 일은 네 단계다:

1. external overlay를 얹은 스냅샷으로 `mergeQueueCandidates()` 자격 판정
   (`server/ws/worker-handlers.js:345`)
2. `queueStore().enqueueMerge()`로 durable persist (`queue-store.js:1515`)
3. `replyMergeQueue()`가 클라이언트 fanout (`worker-handlers.js:1322`)
4. 같은 함수가 `kickWorkerMergeQueue()`로 **드라이버를 깨움**
   (`worker-handlers.js:1337`, `attach.js:948`)

**`enqueueMerge()`는 persist만 한다.** 이벤트를 emit하지도, 드라이버를 깨우지도
않는다. 자동 편입기가 `enqueueMerge()`만 호출하면 항목이 durable 큐에 쌓인 채
아무도 실행하지 않는 상태가 된다.

따라서 위 네 단계 + §3.2의 skip 필터 + §3.2.1의 prune을 묶은 **worker-side
공용 함수**를 추출하고, WS의 add-all 핸들러와 자동 편입기가 **같은 함수**를
호출한다. 자격 판정 로직이 갈라지지 않는 것이 요점이다 — 두 경로가 다른 기준을
갖게 되면 어느 쪽이 옳은지 알 수 없게 된다.

공용 함수는 external overlay를 얹은 스냅샷을 입력으로 받는다. `[일괄 머지]`가
이미 그렇게 동작하며(`worker-handlers.js:340` "the OVERLAID snapshot"), external
행은 durable lane에 없으므로 overlay 없이는 자격 판정 자체가 성립하지 않는다.

`mergeQueueCandidates()`의 자격 판정은 **바꾸지 않는다**. 이미 해소 세션을
보유한 행과 external + 충돌 행을 제외하며, 그 판정이 `[일괄 머지]`와 자동
편입의 공통 기준이 된다. 자동 편입기가 얹는 것은 §3.2의 skip 필터 한 겹뿐이다.

### 4.3 재진입 방지

공용 함수는 편입 후 명시적으로 `emitQueueChanged()`를 부른다(§4.2). 편입기는
바로 그 이벤트를 구독하고 있으므로 자기 자신을 재귀 호출할 수 있다. 두 겹으로
막는다:

- 워크스페이스별 재진입 플래그: 스캔 중 들어온 이벤트는 "한 번 더 스캔해야
  함" 표시만 남기고 즉시 반환한다(coalesce).
- 편입·prune 대상이 실제로 하나도 없으면 아무 변이도, 아무 emit도 하지 않는다.
  이것이 재귀를 실제로 종료시키는 조건이다. `merge_queue`에 이미 있는 bead는
  `queue-store`의 add가 no-op으로 처리한다.

### 4.4 관측 수요 — 구독자 게이트를 풀어야 한다

`pr-poller.js`의 `tick()`은 첫 줄에서 `getSubscriberCount() <= 0`이면 즉시
반환한다. 구독자란 워커 큐를 구독 중인 WS 클라이언트, 즉 **열려 있는 브라우저
탭**이다. external PR 스캔(`external.refresh()`)도 같은 게이트 안에 있다.

이대로 두면 자동 머지가 목표를 달성하지 못한다. 탭을 닫는 순간 관측이 멈추고,
새 PR도 새 head도 새 CI 결과도 들어오지 않으므로 `auto_merge`가 ON이어도
편입할 것이 영원히 생기지 않는다. 관측 캐시는 비영속이라 서버 재시작 뒤에도
같은 상태가 된다. "켜 두면 알아서 돈다"는 요구가 브라우저 탭에 묶여서는 안 된다.

- poll 수요 판정을 **`subscriber_count > 0 || auto_merge`**로 바꾼다.
- 다음 세 시점에 즉시 1회 관측을 돌린다: 서버 부팅(`auto_merge`가 ON인
  워크스페이스), 토글 OFF→ON 전이, bead가 `pr_wait`에 새로 진입.
- 토글이 OFF이고 구독자도 없으면 현행 그대로 아무것도 관측하지 않는다 —
  유휴 서버가 `gh`를 계속 때리지 않는다는 기존 성질을 유지한다.

### 4.5 안전

자동 편입은 `merge_queue`를 통과하므로 기존 안전장치가 **전부 그대로** 걸린다:
순차 실행, 차례마다 재게이트, `RESOLUTION_ROUND_CAP = 2`, 해소 대기 30분,
`merge_unconfirmed` 재관측 30분, external + 충돌 제외.

편입기는 `merge()`를 직접 호출하지 않는다. 드라이버가 유일한 호출자라는
UI-5v7d의 불변식을 유지한다.

## 5. UI

### 5.1 버튼 — 하나, 네 상태

`mergeAllTemplate`(`index.js:2030`)의 기존 불변식을 유지한다:

> 두 버튼을 나란히 두면 시작과 중단을 한눈에 구분하라고 요구하게 되고,
> 그게 바로 머지를 잘못 누르게 만드는 오독이다.

| 머지 큐 | `auto_merge` | 버튼 |
|---|---|---|
| 비어 있음 | OFF | `▶ 자동 머지 N` (N = 현재 자격 있는 행 수) |
| 비어 있음 | ON | `⏸ 자동 머지` (무장 상태, 아직 대상 없음) |
| 진행 중 | ON | `⏸ 자동 머지 중단 N` (N = 큐 대기 수) |
| 진행 중 | OFF | `일괄 머지 중단 N` (현행 그대로 — 수동으로 넣은 항목) |

어느 상태에서도 버튼은 하나다.

**N이 0이어도 `▶ 자동 머지` 버튼은 보이고 클릭할 수 있다.** 현행
`mergeAllTemplate`은 `count === 0`이면 `''`을 반환해 버튼을 지운다
(`index.js:2043`~`:2045`) — 일회성 액션에서는 옳았다(넣을 게 없는데 넣기 버튼을
보일 이유가 없다). 토글에는 그 규칙을 그대로 쓰면 안 된다: 지금 자격 있는 행이
없다는 이유로 버튼이 사라지면 **앞으로 도착할 PR을 위해 미리 무장해 둘 방법이
없어지고**, 그것이 이 토글의 존재 이유다. N이 0이면 숫자만 생략하고
`▶ 자동 머지`로 표시한다.

`auto_merge`가 OFF이고 큐도 비어 있고 `pr_wait` 레인 자체가 비어 있으면 PR 대기
레인이 렌더되지 않으므로 버튼 표시 여부는 문제가 되지 않는다.

### 5.2 중단의 의미

**중단 클릭은 토글을 끄고 대기 항목을 비운다.** 토글이 켜진 채 큐만 비우면
다음 `queue-changed`에서 즉시 다시 채워져 "중단"이 중단이 아니게 된다.
진행 중인 항목은 끝까지 수행한다(현행과 동일 — 그 머지는 이미 GitHub에
도달했다).

### 5.3 켜는 순간

토글을 ON으로 바꾸면 **즉시** §4.2의 공용 편입 함수를 1회 호출한다 — persist뿐
아니라 fanout과 드라이버 kick까지 포함된 그 함수여야 한다. 일회성
`[일괄 머지]`의 기능이 "토글 ON"에 흡수된다. 프로토콜 타입
`worker-merge-queue-add-all`은 유지한다(같은 공용 함수를 부르는 두 번째
호출자가 된다).

§4.4에 따라 토글 OFF→ON 전이는 즉시 1회 관측도 함께 트리거한다. 관측 없이
편입 스캔만 돌리면 캐시가 빈 상태에서 자격 판정이 전부 `unobserved`로 떨어져
아무것도 편입되지 않는다.

### 5.4 프로토콜

새 메시지 타입 `worker-merge-auto-toggle`을 추가한다. `worker-queue-toggle`
(`auto_advance`)과 대칭이며 CAS `expected_revision` 규약도 동일하다.
`app/protocol.js`의 `MessageType` 유니온과 배열, `server/ws/connection.js`의
디스패치에 등록한다.

## 6. 안전 — 명시적으로 기록해 둘 위험

`merge-gate.js:211`의 Tier 3 계약은 이렇다:

> Tier 3 — no CI, no verify_cmd. **The click itself is the human's decision**,
> so the gate steps aside and the badge says honestly what it is based on.

자동 모드는 바로 그 클릭을 없앤다. 따라서 **CI도 `verify_cmd`도 없는
워크스페이스에서는 아무 검증 없이 자동 머지된다.**

사용자는 이 사실을 고지받은 뒤 "게이트가 열리면 전부 자동"을 선택했다
(2026-07-28). 즉 자동 편입은 `[일괄 머지]`와 동일한 자격 판정을 쓰고,
Tier 3을 별도로 배제하지 않는다.

완화 요소:

- beads-ui 자신은 `~/.config/bdui/config.toml`에
  `[worker.verify."…/beads-ui"]`가 설정돼 있어 Tier 2(`로컬검증 ✓`)로 걸린다.
  이 저장소에서는 무검증 자동 머지가 발생하지 않는다.
- 토글은 워크스페이스별 durable 상태이므로, Tier 3인 워크스페이스에서 켜지
  않는 것으로 회피할 수 있다.
- 버튼 툴팁에 현재 워크스페이스의 게이트 tier가 `검증 신호 없음`일 때
  경고 문구를 싣는다.

이 위험을 줄이려면 후속으로 "자동 모드는 양성 검증 신호를 요구" 옵션을 둘 수
있으나, 이번 범위에는 넣지 않는다.

§4.4가 구독자 게이트를 푸는 것도 여기에 함께 기록해 둔다: 자동 모드를 켜 두면
**아무도 화면을 보고 있지 않은 동안에도** 서버가 PR을 관측하고 머지한다.
이것은 요구된 동작이지만, 되돌릴 수 없는 작업이 무인 상태에서 진행된다는
뜻이기도 하다. 토글이 OFF이면 관측 수요도 원래대로 돌아간다.

## 오류 처리

- 관측 오류/미관측 bead는 자동 편입 대상이 아니다(fail closed).
- 실패 처분 시 head SHA를 못 읽거나 skip 기록이 persist되지 않으면
  **dequeue하지 않고 `halted`로 이번 드레인을 끝낸다**(§3.2). 기록 없이
  dequeue하면 §3.1의 루프가 그대로 돌아온다. 큐는 durable하므로 다음 kick이나
  재시작이 이어받는다.
- `queue-changed` 구독 중 던진 예외는 삼키고 로그만 남긴다. 편입기가 깨져도
  수동 `[머지]`/`[일괄 머지]` 경로는 살아 있어야 한다.
- 편입기는 `stop()`에서 구독을 해제한다. 워크스페이스 attach/detach 수명은
  `attach.js`가 소유하며, `createMergeQueue` 옆에서 같은 수명으로 만든다.

## 테스트 범위

- 라벨: 충돌 게이트에서 `merge_label`이 `충돌 해소 후 머지`.
- `queue-store`: `auto_merge` / `auto_merge_skips` 정규화, 구버전 `queue.json`
  로드, CAS 토글.
- skip 기록: `fail()`의 모든 처분 경로(`refused`, `resolution_round_cap`,
  `resolution_timeout`, `resolution_refused`, `merge_unconfirmed_timeout`,
  `pr_closed_unmerged`, 정리 실패)에서 head_sha와 함께 기록되는지;
  기록과 dequeue가 하나의 변이인지; head_sha 미상 또는 persist 실패 시
  dequeue하지 않고 `halted`가 되는지; 머지 성공 시 삭제되는지;
  수동 `[머지]`가 삭제하는지.
- 부팅 재개: `restored` 경로에서 관측 캐시가 비어 있을 때 dequeue하지 않는지;
  `processItem` 진입 시 skip 필터가 걸려 같은 head를 다시 머지하지 않는지.
- 자동 편입기: `auto_merge` OFF면 무동작; ON이면 자격 행 편입; skip 레코드가
  있고 head_sha 동일이면 미편입; head_sha 변경 시 편입 + 레코드 삭제;
  head_sha 미상이면 미편입; 재진입 coalesce; 편입 대상이 없으면 emit도 없음.
- 공용 편입 함수: WS add-all과 자동 편입기가 같은 함수를 부르는지;
  persist 후 fanout과 드라이버 kick이 함께 일어나는지 — persist만 하고
  드라이버가 안 깨어나는 회귀를 잡는다.
- skip prune: durable `pr_wait` ∪ external overlay에 없는 키가 제거되는지;
  external 행이 사라졌다 같은 head로 재등장할 때 지난 실패가 적용되지 않는지.
- 관측 수요: 구독자 0 + `auto_merge` ON이면 관측이 돌고, 구독자 0 +
  `auto_merge` OFF이면 돌지 않는지; 부팅·토글 ON·`pr_wait` 진입 시 즉시 1회
  관측하는지; 서버 재시작 후 탭 없이 자동화가 이어지는지.
- 무한 루프 회귀: `resolution_round_cap`으로 스킵된 충돌 행이 head_sha가
  그대로인 동안 재편입되지 않는다.
- UI: 네 상태 버튼 렌더, N=0에서도 `▶ 자동 머지`가 보이고 클릭 가능한지,
  중단이 토글까지 끄는지, ON 시 즉시 편입 + 즉시 관측.

## 마감 조건

`npm run tsc` / `npm test` / `npm run lint` / `npm run prettier:write` 통과 후
`npm run build`로 `app/main.bundle.js`(+ `.map`) 갱신본을 포함한다. 머지 후
`bdui-shared restart`와 프로세스 경로·포트·HTTP 응답 검증까지 마쳐야 완료다
(AGENTS.md Post-Merge Runtime Validation).
