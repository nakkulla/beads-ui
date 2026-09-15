---
scope:
  - server/ws/context.js
  - server/ws/monitor-handlers.js
  - server/ws/worker-handlers.js
  - server/ws/push-patch.js
  - server/worker/session-observation.js
  - app/data/keyed-patch.js
  - app/data/monitor-pipeline-store.js
  - app/data/worker-queue-store.js
  - app/protocol.js
  - app/protocol.md
  - app/main.js
---

# 워커·모니터 push 채널의 키 단위 패치 전송과 spurious 변경 제거 (UI-defk)

- Bead: UI-defk · route: spec_backed
- 선행 조사: 2026-09-15 세션 실측(아래 §1). 부팅 이중 로드는 별도 quick_fix
  UI-x85e가 다룬다.

## 1. 배경과 실측

beads-ui 첫 화면이 "로딩 중"으로 오래 머무는 원인을 공유 서버에서 실측했다.
정적 자산·bd·목록 구독은 병목이 아니다.

| 항목 | 실측 |
| --- | --- |
| `main.bundle.js` 740KB | 19ms |
| `bd list --all` 893건 3MB | 150~380ms |
| 워크스페이스 첫 목록 구독(cold, 19개 각각) | 0.2~1.1초 |
| 목록 재구독(warm) | 1ms |

병목은 두 push 채널이다.

| 채널 | push 1회 | 구독 직후 12초 | 정상 상태 75초 |
| --- | --- | --- | --- |
| `monitor-pipeline-snapshot`(11개 워크스페이스 집계) | 1.15MB | 17회 ≈ 20MB | 15회 = 17.5MB |
| `worker-queue-snapshot`(dotfiles 하나) | 250KB | 2회 | 2회 |

원인은 세 겹이다.

1. **전송 단위가 통째다.** `server/ws/context.js pushSnapshotIfChanged`가 JSON
   문자열 전체를 구독자별 마지막 본문과 비교해, 어느 한 필드만 바뀌어도 전체를
   다시 보낸다. 모니터 엔트리는 `decorateQueue` 결과 전체(attempts 493KB,
   repo_operations 132KB, bead_workflow 118KB, completion_status 99KB)를 담고,
   클라이언트는 매번 1.15MB를 파싱하고 store를 통째로 교체해 재렌더한다.
2. **구독 직후 fill 캐스케이드.** 세션 기본값 kv 조회·계정 카탈로그·external
   waits·runnable refill이 워크스페이스별로 끝날 때마다 `schedulePush`를 부르고
   디바운스가 250ms뿐이라 12초 동안 17회가 나간다.
3. **값이 같은데 문자열이 다른 spurious 변경.** `server/ws/worker-handlers.js
   attemptsWithUsage`는 실행 중이 아닌 codex attempt마다
   `observations.prepareHistorical`을 부르고, 결과가 저장값과 `JSON.stringify`로
   다르면 `fanout`을 한 번 더 한다. `server/worker/session-observation.js`의
   historical 값은 60초 TTL로 지워지므로, 종료된 attempt마다 60초 주기로 (a) 세션
   로그 동기 재읽기, (b) 저장 형태(`usage_segments` `{turn_id, model}`)로 되돌아간
   push, (c) 관측 형태(`{attempt_id, scope_id}`)로 다시 덮은 push가 반복된다.
   두 형태는 `usage` 키 순서도 달라 값이 같아도 항상 "변경"으로 읽힌다. 관측
   예: prostate의 paused/failed attempt 3건이 250ms 간격으로 1.15MB push 2회를
   만들었다.

부차 관측: 서버 이벤트루프가 약 2분에 한 번 1.7초 멈춘다(모든 클라이언트 응답
지연). `sample`에서는 JSON parse·UTF-8 decode가 주 스레드 최상위였고, 3의
동기 세션 로그 재읽기가 유력한 원인이다(§6에서 검증 조건으로 다룬다).

## 2. 목표와 비목표

목표

- 모니터·워커 탭을 열 때와 정상 상태의 전송량을 한 자릿수 이하로 줄인다.
  기준: 구독 직후 전체 스냅샷 1회 + 패치, 정상 상태 두 채널 합계 500KB/분 이하
  (같은 워크스페이스 집합에서 재실측).
- 값이 같은 변경은 한 바이트도 보내지 않는다.
- 카드·레인 소비자(ADR 0014 `buildLanes` 계약)가 받는 객체 형태는 바꾸지 않는다.

비목표

- 페이로드 필드 절삭. 모니터는 `app/views/worker/lane-model.js`·`lanes.js`를
  공유해 큐 스냅샷 필드를 폭넓게 읽으므로 필드를 빼는 설계는 하지 않는다.
- ADR 채널(`adr-snapshot`, 4~74KB)·session-log 채널은 그대로 둔다.
- usage 값의 의미(ADR UI-mscc·UI-42l2-2)는 바꾸지 않는다. 직렬화 형태와 캐시
  수명만 다룬다.
- `pipelineChannelWanted`(디테일 패널 열림 시 모니터 채널 구독)는 유지한다 —
  패치 전송이면 비용이 사라진다.

## 3. 대안

- **A. 필드 절삭.** 모니터 엔트리에서 안 읽는 필드를 뺀다. 조사 결과 안 읽는
  필드가 거의 없고(레인 모델 공유), 줄여도 통째 재전송 구조는 남는다. 기각.
- **B. 디바운스 상향만.** 250ms → 1초로 올리면 push 횟수는 줄지만 1회 1.15MB
  파싱·재렌더와 spurious 변경은 그대로다. 정상 상태 14MB/분이 5MB/분쯤이 된다.
  기각.
- **C. 키 단위 패치 전송 + spurious 변경 제거 + 1초 coalescing(채택).** 채널
  본문을 안정된 키의 맵으로 나눠 구독자별로 바뀐 키만 보낸다. 첫 구독만 전체
  스냅샷이다. 클라이언트 store가 패치를 적용해 기존 객체 형태로 조립하므로
  소비자는 무변경이다. 3의 원인은 직렬화 정규화와 캐시 수명으로 없앤다.
  UI-nprg spec의 "항상 전체 스냅샷, 부분 패치 없음" 조항을 이 설계가 대체한다.

## 4. 설계

### 4.1 키 단위 패치 codec (`app/data/keyed-patch.js`)

서버와 클라이언트가 같은 분할 규칙을 써야 하므로 순수 모듈 하나를 둔다. 서버는
이미 `app/protocol.js`를 import하므로 방향이 새롭지 않다.

- `canonicalJson(value)` — 객체 키를 재귀적으로 정렬해 직렬화한다. **변경 감지
  전용**이며 전송 본문은 보통 `JSON.stringify`다. `undefined` 값 키는 생략한다.
- `splitWorkerQueue(body)` — `{ root_dir, queue }`를 키 맵으로 나눈다.
  - `root_dir` → 값 그대로.
  - `queue.attempts`의 각 항목 → `attempts/<attempt_id>`.
  - 그 밖의 `queue` 최상위 필드 `f` → `queue/<f>`.
- `assembleWorkerQueue(map)` — 역변환. `queue.attempts`는 `attempts/*` 키에서
  다시 모은다. attempts 항목이 하나도 없으면 `attempts: {}`.
- `splitMonitorPipeline(body)` — `{ workspaces, workspaces_state }`를 나눈다.
  - `ws-order` → `workspaces[].root_dir` 배열(서버 순서 보존).
  - 엔트리마다 `splitWorkerQueue`와 같은 규칙을 `ws/<root_dir>/` 접두로 적용한다:
    `ws/<root_dir>/attempts/<attempt_id>`, `ws/<root_dir>/<f>`(`root_dir`·`name`
    포함).
  - `state-order` → `workspaces_state[].root_dir` 배열, 각 항목 →
    `state/<root_dir>`.
- `assembleMonitorPipeline(map)` — `ws-order`로 `workspaces` 배열을,
  `state-order`로 `workspaces_state` 배열을 조립한다. order에 있는데 키가 없는
  root_dir는 건너뛴다(fail-quiet).
- `applyPatch(map, patch)` — `patch.set`의 키를 넣고 `patch.unset`의 키를 지운
  새 Map을 만든다. 바뀌지 않은 키의 값 객체는 identity를 유지한다.

키에 쓰는 `root_dir`·`attempt_id`는 `/`를 포함할 수 있으므로 접두 분해는
"첫 세그먼트·둘째 세그먼트·나머지" 규칙이 아니라 **키 맵과 별개로 order 배열이
root_dir 목록을 알려주고, attempts 키는 `ws/<root_dir>/attempts/` 접두를 order의
root_dir로 정확히 매칭**해 나눈다. 분할·조립은 `attempt_id`에 `/`가 없다는
기존 형식(`<bead>-<epoch>-<n>`)을 전제로 하고 테스트로 고정한다.

### 4.2 서버 push 상태 (`server/ws/push-patch.js`)

구독자 객체 `sub = { ws, client_id }`에 `seq`와 `last: Map<key, canonical>`을
붙인다(`pushSnapshotIfChanged`의 `last_body`와 같은 자리).

- `pushKeyed(sub, channel, body, keyed)`:
  1. `keyed = split(body)`는 호출자가 push 한 번당 한 번만 만들어 모든 구독자에
     재사용한다. 각 키의 canonical 문자열도 한 번만 계산해 `Map<key, canonical>`
     으로 함께 넘긴다.
  2. `sub.last`가 없으면 전체 스냅샷을 보낸다: 기존 `<channel>-snapshot` 봉투에
     `seq: 1`을 더한 형태. `sub.last`를 canonical 맵으로 채운다.
  3. 있으면 `set = { key: value }`(canonical이 다르거나 새 키), `unset = [key]`
     (사라진 키)를 만든다. 둘 다 비면 보내지 않는다(현재 `pushSnapshotIfChanged`
     의 "같으면 안 보냄"과 같은 의미).
  4. `<channel>-patch` 봉투 `{ type, id, seq, set, unset }`를 보내고 `sub.seq += 1`,
     `sub.last` 갱신. 워커 채널 패치는 `root_dir`도 봉투에 넣는다(클라이언트의
     워크스페이스 guard가 읽는다).
  5. `ws.send` 실패 시 `sub.last`를 건드리지 않는다(다음 push가 다시 시도).
- 채널명: `monitor-pipeline` → `monitor-pipeline-snapshot` / `monitor-pipeline-patch`,
  `worker-queue` → `worker-queue-snapshot` / `worker-queue-patch`.
- `pushSnapshotIfChanged`는 ADR 채널이 계속 쓴다. 두 채널은 더 이상 부르지
  않는다.
- 재구독(같은 ws·client_id): 기존처럼 sub를 새로 만들어 전체 스냅샷부터 다시
  보낸다(monitor-handlers.channel 테스트 "pushes a re-subscribe even when the
  body did not change" 유지).

### 4.3 모니터 채널 적용 (`server/ws/monitor-handlers.js`)

- `pushNow`: `buildMonitorPipeline()`·`safeWorkspacesState()`로 본문을 한 번
  만들고 `splitMonitorPipeline` + canonical 맵을 한 번 계산한 뒤 구독자마다
  `pushKeyed`.
- `handleSubscribeMonitorPipeline`: 같은 경로(첫 호출이라 스냅샷).
- `PUSH_DEBOUNCE_MS` 250 → **1000**(trailing). 구독 직후 fill들은 `schedulePush`
  를 통해 1초 창에 모여 패치로 나간다. 구독 시점의 전체 스냅샷은 즉시다(UI-nprg의
  "빈 대시보드 30초" 금지 유지).
- `refanoutWorkerSnapshot`·`onWorkerSnapshotRefresh` 연결은 그대로다.

### 4.4 워커 큐 채널 적용 (`server/ws/worker-handlers.js`)

- `fanout(workspace_key, queue)`: 본문을 한 번 만들고 `splitWorkerQueue` +
  canonical 맵으로 구독자마다 `pushKeyed`. `SNAPSHOT_REFRESH_LISTENERS` 통지는
  그대로.
- `handleSubscribeWorkerQueue`: 같은 경로(스냅샷).
- **결정: 워커 채널의 fanout 시점은 바꾸지 않는다** — 정상 상태 push가 75초에
  2회로 드물고, 패치가 되면 1회 크기가 작아서 coalescer를 더할 이유가 없다.
  사용자 조작(큐 재배치 등)의 반영 지연도 그대로 즉시다.

### 4.5 spurious 변경 제거

`server/ws/worker-handlers.js attemptsWithUsage`

- `prepareHistorical` 결과와 저장값의 비교를 `canonicalJson`으로 한다. 키 순서만
  다른 경우 `fanout`을 부르지 않는다.
- 비교 대상 세 필드(`usage`, `usage_segments`, `codex_children`)는 그대로다.

`server/worker/session-observation.js prepareHistorical`

- `attempt.finished_at`이 유한한 **종료 attempt**의 historical 값은 TTL 없이
  보존한다. `readBoundedAttempt`가 `ended_at = finished_at`로 레코드를 자르므로
  종료 뒤 결과는 결정적이다. 해제는 기존 경로만: `releaseHistorical(workspace)`,
  `delete(workspace, attempt_id)`, `clear`. 큐의 attempts 집합이 ADR 0029의
  접미 불변식으로 유한하므로 메모리도 그에 비례한다.
- `finished_at`이 없는 비실행 attempt(paused 등)는 60초 TTL을 유지하되, 만료
  시 `values`의 값을 지우지 않고 `historical_completed`만 지운다. 다음
  `prepareHistorical`이 새 값으로 덮을 때까지 마지막 관측 형태가 유지되어 저장
  형태로 되돌아가는 push가 사라진다. `observers`가 잡고 있는 키는 기존처럼
  손대지 않는다.
- 테스트 훅 `historicalTtlMs`는 그대로 두고, 종료 attempt 보존은 옵션 없이
  고정한다.

### 4.6 클라이언트 store와 main.js

`app/data/worker-queue-store.js`

- 내부 상태를 `Map<key, value>` + `seq`로 바꾸고 `get()`은 조립 결과를 다음
  변경 전까지 메모한다. `set(queue_body)`는 전체 스냅샷(`{ root_dir, queue, seq }`)
  을 `splitWorkerQueue`로 넣고, `applyPatch(patch)`는 `seq`가 `last_seq + 1`일
  때만 적용한다. 두 경우 모두 조립 결과가 바뀌면 한 번 통지한다(ADR 0044의
  "내용 변경만 통지"와 같은 의미; 패치는 정의상 변경이므로 항상 통지).
- `seq` 불일치(건너뜀·역행)는 `false`를 반환하고 store를 비운다.
- 기존 `set(q)` 호출 형태(테스트 seam `CLIENT.trigger('worker-queue-snapshot', …)`)
  는 유지된다 — `seq`가 없는 스냅샷은 `seq = 1`로 간주한다.

`app/data/monitor-pipeline-store.js`

- 같은 구조. `set(list, state, seq)`는 `splitMonitorPipeline`으로, `get()`은
  `workspaces` 배열, `getWorkspacesState()`는 `workspaces_state` 배열을 메모해
  돌려준다.

`app/main.js`

- `client.on('worker-queue-patch')`: 기존 스냅샷 handler와 같은 워크스페이스
  guard(`p.root_dir !== current_path`면 drop) 뒤 `worker_queue_store.applyPatch`.
  `false`면 채널을 끊고 다시 구독한다(`clearWorkerQueueChannel` →
  `ensureWorkerQueueChannel(true)`) — 한 번의 재구독으로 서버가 새 sub를 만들어
  전체 스냅샷을 보낸다.
- `client.on('monitor-pipeline-patch')`: `monitor_pipeline_store.applyPatch`,
  실패 시 모니터 채널 재구독.
- 재연결·워크스페이스 전환은 기존대로 채널을 다시 구독하므로 서버 sub가 새로
  만들어지고 스냅샷부터 시작한다.

### 4.7 프로토콜 (`app/protocol.js`, `app/protocol.md`)

- `MESSAGE_TYPES`에 `monitor-pipeline-patch`, `worker-queue-patch` 추가.
- 스냅샷 payload에 `seq` 추가(`{ type, id, seq, root_dir, queue }`,
  `{ type, id, seq, workspaces, workspaces_state }`).
- 패치 payload: `{ type, id, seq, set: Record<key, unknown>, unset: string[] }`,
  워커 채널은 `root_dir` 포함.
- `protocol.md`의 두 채널 항목에 "첫 push는 스냅샷, 이후는 패치, `seq` 연속"을
  적고 키 규칙은 `app/data/keyed-patch.js`를 가리킨다.

## 5. 데이터 흐름 요약

1. 서버 변경 이벤트 → (모니터) 1초 trailing 창 / (워커) 즉시 → 본문 1회 조립 →
   `split` + canonical 1회 → 구독자별 diff → 패치 또는 무전송.
2. 클라이언트 패치 수신 → `seq` 확인 → Map 갱신(변경 키만 새 객체) → 조립 →
   리스너 1회 → 기존 렌더 경로(`doRender`, lit diff).
3. 첫 구독·재연결·재구독 → 스냅샷(`seq: 1`) → Map 전체 교체.

## 6. 오류 처리와 검증 조건

| 상황 | 처리 |
| --- | --- |
| 서버 `split` 예외 | 그 push를 건너뛰고 로그. 다음 push가 다시 시도(구독자 baseline 불변) |
| `ws.send` 실패 | `sub.last`·`seq` 유지, 로그 |
| 클라이언트 `seq` 불일치 | store 비움 + 채널 재구독 1회, 로그. 재구독 응답도 실패하면 기존 fatal 경로 |
| 패치의 `unset`이 없는 키 | 무시 |
| `ws-order`에 있는 root_dir의 엔트리 키 부재 | 그 엔트리 생략(fail-quiet) |
| 종료 attempt historical 값 부재(로그 파일 없음) | 기존과 같이 `null` → 저장값 사용, 재시도 없음 |

검증 조건(구현 완료 판정)

- 단위: `keyed-patch` 분할·조립 왕복(두 채널), `canonicalJson` 키 순서 무시,
  `applyPatch`의 미변경 키 identity 유지; `push-patch`의 스냅샷→패치→무전송→
  unset 시퀀스; monitor-handlers.channel 테스트의 디바운스 1초 반영과 "값 같으면
  무전송"; worker-handlers fanout 패치; session-observation 종료 attempt 보존과
  비종료 TTL 만료 시 값 유지; `attemptsWithUsage`가 키 순서만 다른 결과에 fanout
  하지 않음; 클라이언트 store 패치 적용·seq 불일치·재구독(e2e).
- 실측(공유 서버 배포 뒤, 완료 보고서에 기록): 같은 측정 스크립트(Node 내장
  `WebSocket`으로 `/ws` 구독, push 크기·횟수 집계)로 (a) 모니터 구독 직후 12초
  총 바이트가 스냅샷 1회 + 300KB 이하, (b) 정상 상태 5분 평균 두 채널 합계
  500KB/분 이하, (c) 100ms 간격 `get-workspace` 왕복의 5분 p99가 200ms 이하.
  (c)가 미달이면 이벤트루프 정지는 다른 원인이며 `- 관찰:` 잔여로 보고한다.

## 7. 구현 unit 후보

한 packet 기본. 나누면 다음 순서가 자연스럽다(advisory).

- unit-01 codec+server: `app/data/keyed-patch.js`, `server/ws/push-patch.js`,
  monitor/worker handlers 적용, 디바운스 1초, 프로토콜 타입.
- unit-02 client: 두 store, `app/main.js` 패치 handler·재구독, e2e·store 테스트,
  `protocol.md`.
- unit-03 spurious: `attemptsWithUsage` canonical 비교, `session-observation`
  캐시 수명.

## 8. 경계·후속

이 spec은 beads-ui 한 작업이다. dotfiles 계약·bd CLI·ADR 채널·session-log
채널·모니터 화면 문법(카드 슬롯·레인)은 건드리지 않는다.

- 관찰: 부팅 시 Board가 서버 기본 워크스페이스를 먼저 구독하는 이중 로드 —
  같은 조사에서 분리한 quick_fix UI-x85e가 다룬다(이 spec의 형제가 아님).
- 관찰: 서버 이벤트루프 약 2분 주기 1.7초 정지 — §4.5로 사라지는지 §6(c)로
  판정하고, 남으면 Finish 잔여로 보고한다.
- 관찰: 배포 재시작(하루 16회)마다 워크스페이스 캐시가 cold로 돌아간다 — 첫
  구독 0.2~1.1초라 이 spec 범위 밖이다.

## 결정 (ADR 후보)

- 전제: ADR 0014 — 조립된 큐·모니터 객체 형태를 그대로 두어 `buildLanes` 계약과
  슬롯 표를 바꾸지 않는다.
- 전제: ADR 0044 — store는 내용 변경만 통지한다는 리스너 의미를 두 채널 store에
  같이 적용하고, 목록 채널의 봉투(`snapshot`·`upsert`·`delete`)는 건드리지 않는다.
- 전제: ADR 0029 — 살아 있는 `queue.attempts`가 유한하므로 종료 attempt의
  historical 관측 보존이 큐 크기에 비례해 유한하다.
- 전제: ADR 0043 — 투영 경로에 동기 자식 프로세스를 새로 두지 않는다.
- 워커·모니터 push 채널은 첫 구독만 전체 스냅샷이고 이후는 키 단위 패치이며
  변경 감지는 키별 정규화 직렬화로 한다. 되돌리기 어려움: 두 채널의 봉투·클라이언트
  store·`seq` 재구독 규칙이 함께 바뀐다. 맥락 필요: UI-nprg의 "항상 전체 스냅샷,
  부분 패치 없음"을 뒤집는 이유(1.15MB × 분당 십수 회 실측)가 코드만으로 드러나지
  않는다. 실제 절충: 전체 스냅샷의 단순함 대신 두 곳의 분할 규칙 공유와 seq
  연속성 관리를 택한다. `summary`: "워커·모니터 push 채널은 첫 구독만 전체
  스냅샷이고 이후는 키 단위 패치이며 변경 감지는 키별 정규화 직렬화로 한다" → ADR
- 종료 attempt의 historical usage 관측을 TTL 없이 보존하고 비종료는 만료 시 값을
  유지한다. 되돌리기 쉬움: 캐시 수명 상수와 분기 하나다. 맥락은 위 ADR의 "값이
  같은 변경은 보내지 않는다"에서 따라온다 → ADR 아님
- 모니터 디바운스 1초·워커 fanout 즉시 유지. 되돌리기 쉬움, 배경 없이 의외
  아님 → ADR 아님
