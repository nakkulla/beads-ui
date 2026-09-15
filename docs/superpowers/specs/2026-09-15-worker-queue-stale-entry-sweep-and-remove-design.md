---
scope:
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/queue-place.js
  - server/worker/queue-remove.js
  - server/worker/bead-timeline.js
  - server/routes/worker-queue.js
  - server/app.js
  - server/ws/worker-handlers.js
  - app/protocol.md
  - server/worker/scheduler.test.js
  - server/worker/queue-store.test.js
  - server/worker/bead-timeline.test.js
  - server/routes/worker-queue.test.js
  - server/ws.worker-queue.test.js
  - docs/adr/
---

# Worker 대기열 stale 항목 정리 — 직렬 레인·deferred·paused 를 포함한 자동 sweep 과 HTTP remove

- Bead: UI-tqqp
- 경로: spec_backed. 한 저장소·한 구현 소유자·한 검증 및 PR 묶음으로 완료한다.
- 상태: 사용자 방향 승인에 따른 완성 초안. 구현·서비스 변경은 아직 전이다.
- 근거 기준: `origin/main` `5b132d83db1c4cab01b3a733674d9a7ea15e562d`.
- 출처: PROSTATE-n50(prostate 리그, 원 본문)과 microbiome_bile/Analysis-hdky(2026-09-15 이슈 통합 세션). 두 리그 모두 크로스 리그라 edge 없음.

## 1. 문제와 확인된 현재 동작

bd 에서 이미 닫히거나(`closed`) 보류된(`deferred`) Bead 가 Worker 대기열에 남아 직렬 레인
자리를 점유한다. 실행은 막지 않지만(dispatch 는 `not_ready:<status>` 배지만 달고 건너뛴다)
표시가 어긋나고, 사람이 Monitor 에서 손으로 빼기 전에는 영원히 남는다. 2026-09-15 두
워크스페이스에서 확인한 사실:

| 관찰 | 원인(코드) |
| --- | --- |
| 병렬 큐의 closed Bead 두 건(Analysis-yxnf·1ob0)은 다음 poller pass 에서 빠졌다 | `scheduler.js` `sweepClosedQueue` 가 `q.queue` 를 순회해 `moveToDone` 한다 |
| 직렬 레인 s1 의 closed Bead(Analysis-dyv, attempt 없음)는 남았다 | 같은 함수가 `q.serial_lanes[*].entries` 를 순회하지 않는다. `removeFromLanes`·`dropFromQueue` 는 둘 다 다룬다 |
| s1 의 deferred Bead(Analysis-hkit)는 남았다 | 판정이 `statuses[bead] !== 'closed'` 하나라 deferred 는 어떤 스캔에서도 대상이 아니다 |
| prostate s1 의 closed Bead(PROSTATE-n50, leaf paused attempt 2개)는 남았다 | closed 판정 뒤 `activeBeadIdsFrom(q)` 가 `leafPausedBeads` 를 활성으로 넣어 `continue` 한다. `paused` 는 `TERMINAL_ATTEMPT_STATUSES` 밖이라 어떤 스캔도 풀지 못한다 |
| 세션·스크립트가 즉시 뺄 수 없다 | HTTP 는 `GET /api/worker/queue`·`POST /api/worker/queue/place` 뿐이고 `worker-queue-remove` 는 WS 전용이다 |

tick 안의 `dequeueIfClosed` 도 같은 결함을 나눠 갖는다: 병렬 큐 멤버만 `moveToDone` 하고
직렬 레인 멤버는 `dropFromQueue` 로 떨어뜨려 완료 레인에 남지 않으며, deferred 는 보지 않는다.

`sweepClosedQueue` 의 "leaf paused 는 유지" 는 UI-m6bg 가 시험으로 고정한 의도된 동작이다
(`scheduler.test.js` "keeps a closed bead holding a leaf paused attempt in the queue"). 이 spec 은
그 판정을 뒤집는다 — bd 에서 닫힌 Bead 는 재개될 수 없으므로 paused 컨텍스트를 지키는 것이
아무것도 사지 못한다.

## 2. 선택과 소유권

| 방식 | 효과와 제약 | 결정 |
| --- | --- | --- |
| A. 기존 sweep 을 모든 대기 레인·closed+deferred·paused 우선으로 확장하고, WS remove 본문을 HTTP 로도 연다 | 판정·persist 경로를 하나로 유지. 자동 정리와 즉시 제거를 모두 제공 | 채택 |
| B. HTTP remove 만 신설하고 자동 정리는 두지 않음 | 세션이 호출을 잊으면 그대로 남음. 사람이 닫은 Bead 는 여전히 방치 | 채택하지 않음 |
| C. `activeBeadIdsFrom` 에서 paused 를 아예 빼서 sweep 이 자연히 통과하게 함 | dispatch·lane fence 가 같은 집합을 쓰므로 paused Bead 가 재디스패치되는 회귀 위험 | 채택하지 않음 |
| D. 스캔이 워크트리를 강제 삭제 | 미반영 사용자 변경을 잃을 수 있음 | 채택하지 않음 — ■ 정지와 같은 fail-closed 원시연산만 쓴다 |

사용자 결정(2026-09-15): HTTP remove 와 자동 정리 둘 다; paused attempt 의 워크트리는
버릴 수 있을 때만 삭제; HTTP remove 의 범위는 WS `worker-queue-remove` 와 동일(모든 레인).

Bead 상태 어휘(`open|in_progress|blocked|deferred|resolved|closed`)는 dotfiles 계약이
정의하고 이 저장소는 소비만 한다(ADR 0012). 새 네이티브 상태·metadata·전역 설정은 만들지
않는다.

## 3. 자동 정리(sweep)

### 3.1 순회 범위

`sweepClosedQueue(workspace, statuses)` 는 병렬 `q.queue` 와 모든 `q.serial_lanes[*].entries`
를 순회한다(한 Bead 는 구조상 한 레인에만 있으므로 중복 제거는 방어용). `pr_wait`·`done` 은
순회하지 않는다 — `resolved` 는 원 spec 대로 PR 대기 overlay 가 그리고, `done` 은 이미 종착이다.

### 3.2 판정

`statuses` 는 지금처럼 caller(poller 의 `bd list --all` 한 번)의 읽기이며 sweep 은 `bd` 를
띄우지 않는다. Bead 별로:

| `statuses[bead]` | 처분 |
| --- | --- |
| 없음(맵에 부재) | 건너뜀. 다음 pass 가 다시 판정 |
| `closed` | **retire → done**: 3.3 의 paused 처분 뒤 `moveToDone` (기존 처분, 직렬 레인까지 확장) |
| `deferred` | **retire → remove**: 3.3 의 paused 처분 뒤 `remove` 와 같은 변이(3.2). 완료 레인에 넣지 않는다 — 끝난 일이 아니라 물러난 일이다 |
| `resolved`·`open`·`in_progress`·`blocked`·그 외 | 건너뜀(현행) |

활성 판정: `claimed`·`dispatch_refused`·활성 discard 작업·비종료 attempt(`running` 등)를
가진 Bead 는 두 상태 모두에서 건너뛴다 — 실행 중인 것은 스캔이 빼지 않는다. **leaf paused
attempt 만은 활성으로 세지 않되, 그 Bead 는 3.3 의 비동기 처분으로 넘긴다.** 구현은
`activeBeadIdsFrom(q, { leaf_paused: false })` 처럼 호출자가 paused 포함 여부를 고르게 하고,
다른 호출자(dispatch·fence)는 기본값 그대로 paused 를 포함한다(선택 C 를 배제한 이유).
이미 비동기 처분 중인 Bead(`retiring` 집합)는 그 처분이 끝날 때까지 건너뛴다.

레인 변이는 한 헬퍼 `retireWaitingBead(workspace, bead_id, status)` 가 맡는다. `closed` 는
`moveToDone`(`releaseLandedLineageLanes` 로 계보의 레인 점유 해제 포함). `deferred` 는
`dropFromQueue` 가 아니라 **`remove` 와 같은 변이**다 — 행 제거 + `rebindLineageLane(null)`
로 그 Bead 의 비종료 계보(`failed`·`orphaned` 기록 포함)가 잡고 있던 직렬 레인 연결을 풀고
`admission`·`cleanup_failed` 기록을 지운다. `dropFromQueue` 만으로는 `serial_lane_id` 를
가진 failed/orphaned 기록이 레인을 계속 점유해(`activeLaneLineages`) 다음 항목이 못 뜬다.
sweep 은 동기 본문 안에서 그 pass 의 스냅샷 revision 을 `expected_revision` 으로 넘겨
`remove` 를 부른다(동기라 CAS 충돌은 구조적으로 없다).

### 3.3 paused attempt 의 처분 (비동기)

paused 기록은 "프로세스가 끝났다" 를 뜻하지 않는다. `pause()` 는 신호만 보내고 종료를
기다리지 않으므로 `paused_done` 에 종료 약속이 남아 있을 수 있고, 서버 재시작 뒤 복원된
기록은 기준 브랜치 이동(`settleBaseDrift`)을 관측한 뒤에야 보호 훅과 워크트리를 만질 수
있다. 기존 `stop()` 의 paused 분기(`scheduler.js` 14763–14824)가 그 순서를 소유한다. 이
spec 은 그 분기를 헬퍼 `disposePausedRecord(workspace, attempt_id, { cause })` 로 뽑아
`stop()` 과 공유하고, 새 동작을 만들지 않는다:

1. leaf 가드 — `resumed_from` 이 이 attempt 를 가리키는 자식이 있으면 건너뛴다(조상은 이력).
2. `paused_done` 에 약속이 있으면 그 종료를 기다린다(살아 있는 프로세스가 아직 쓰고 있을 수 있다).
3. 약속이 없는(복원된) 기록은 `settleBaseDrift` 를 먼저 관측한다 — 미제외 착지가 보이면
   `stop()` 과 같이 `failAttempt(... 'base_landing_detected')` 로 종결하고 4 는 건너뛴다.
4. 그 외에는 `discardAttempt` 로 `{ status: 'stopped', cause: 'bead_closed' | 'bead_deferred',
   finished_at }` 을 쓴다. `stopped` 는 기존 어휘이고 `TERMINAL_ATTEMPT_STATUSES` 와
   `LANE_RELEASING_ATTEMPT_STATUSES` 양쪽에 있어 재개 UI·`activeBeadIds`·레인 점유에서 함께
   사라진다. 새 상태 이름을 만들지 않는다.
5. 종료 정산이 끝난 뒤에만 `removeGuardHook` 과 `cleanupStopResidue(repo, bead_id, base)`
   (`repo` 는 attempt 기록, `base` 는 `attemptBase`; ■ 정지와 같은 `removeIfDiscardable` —
   미반영 변경은 보존하고 로그) 를 실행한다. `repo` 가 없으면 정리하지 않고 로그한다.

sweep 은 leaf paused attempt 를 가진 retire 대상 Bead 를 동기 본문에서 변이하지 않는다.
대신 `retiring` 집합에 넣고 fire-and-forget 으로 `retirePausedBead(workspace, bead_id,
status)` 를 건다: 각 leaf paused attempt 에 위 헬퍼를 차례로 적용하고, 끝나면
`deps.bd.readStatus(bead_id)` 를 다시 읽어 여전히 `closed`/`deferred` 일 때만
`retireWaitingBead` 로 레인 변이(3.2)와 기록(3.4)을 하고 `notifyChanged`·`tick` 을 부른다.
그 사이 Bead 가 다시 `open` 이 됐으면 레인 변이는 하지 않는다(attempt 는 이미 종결됐고,
이는 그 Bead 가 닫혀 있던 시점의 처분이다). 어느 단계가 던져도 `retiring` 에서 빼고 로그만
남기며 다음 pass 가 다시 판정한다 — 멱등이다. 기존 sweep 의 동기 본문(paused 없는 Bead)은
지금처럼 `await` 없이 유지된다.

### 3.4 기록

retire 마다 Bead 타임라인에 한 이벤트를 `appendTimeline` 으로 남긴다(ADR 0027 — 이력의
SoT 는 `events.jsonl`, 잃어도 큐 결정은 바뀌지 않음):

- `kind: 'queue_removed'` — `TIMELINE_KINDS` 에 새로 추가.
- `summary`: `대기열에서 제거 — bd closed` / `대기열에서 제거 — bd deferred`.
- `detail`: `bead_closed` / `bead_deferred`, paused attempt 를 종결했으면 그 id 목록을 덧붙인다.
- `seq`: 그 pass 의 큐 revision(같은 Bead 가 같은 revision 에서 두 번 retire 될 수 없다).

Monitor·Worker 표시는 바꾸지 않는다: closed 는 기존 완료 행(UI-j10d 슬롯 5)으로, deferred 는
행이 사라진다. 보류 중에는 후보 레인에 나타나지 않고(`runnable-cache.js` 는 `open` 만 채택,
ADR 0033), 다시 `open` 이 되면 후보로 관측된다. **다시 `open` 이 돼도 자동 재배치는 없다** —
배치는 사람·세션의 명시적 place 다.

### 3.5 tick 경로의 동일 처분

`dequeueIfClosed(workspace, bead_id, snap)` 는 `retireWaitingBead(workspace, bead_id, status)`
(sweep 과 공유하는 헬퍼)로 옮긴다: `closed` 는 어느 대기 레인이든 `moveToDone`, `deferred` 는
`remove` 와 같은 변이(3.2), 둘 다 3.4 의 기록을 남기고, leaf paused attempt 가 있으면 3.3 의
비동기 처분으로 넘긴다. 지금처럼 `snap.status` 를 입력으로 쓰고 반환값
(`true` = 종착이라 배지 생략)은 유지한다. sweep 은 이 헬퍼를 `statuses` 맵으로 부르는 배치
호출자일 뿐이다.

## 4. HTTP `POST /api/worker/queue/remove`

### 4.1 본문 공유

`worker-queue-remove` 의 서버 본문을 `server/worker/queue-remove.js` 의
`removeBeadFromQueue(workspace_key, { bead_id, expected_revision })` 로 뽑아 WS 핸들러
`handleWorkerQueueRemove` 와 새 HTTP 핸들러가 같은 함수를 부른다(`queue-place.js` 와 같은
패턴). 본문은 `queueStore().remove` → 성공 시 `fanout` → `tickWorkerQueue` fire-and-forget
(직렬 head 를 뺐을 때 다음 항목이 다음 트리거를 기다리지 않게; place 와 같은 이유).

### 4.2 store `remove` 의 보정

`remove` 는 지금 어느 레인에도 없는 Bead 에도 `ok:true` 로 revision 을 올린다. 보정: 큐·직렬
레인·`pr_wait`·`done` 어디에도 없으면 — `admission` 기록만 있는 경우를 포함해 — 쓰지 않고
`ok:false`·revision 불변으로 돌려 `reason: 'not_found'` 로 응답한다. 존재 판정은 레인 소속만
본다; 남은 `admission` 기록은 다음 placement 가 재평가한다. 활성 discard 작업이
걸린 Bead 는 현행대로 거부(`rejected`). 범위는 사용자 결정대로 WS 와 같아 `pr_wait`·`done`
행도 뺀다; 실행 중 attempt 는 레인 멤버가 아니라 이 명령이 닿지 않는다(정지는 ■ 의 일).

### 4.3 요청·응답

`{ root_dir, bead_id, expected_revision }` 셋 다 필수, `expected_revision` 은 정수(place 와
같은 이유 — 세션은 따로 받은 스냅샷으로 판단했다). 응답은 place 와 대칭:

| 상황 | 상태 | 본문 |
| --- | --- | --- |
| 필드 누락·형식 오류·미등록 `root_dir` | 400 | `{ ok:false, error:'bad_request' }` |
| 적용 | 200 | `{ ok:true, applied:true, revision }` |
| revision 불일치 | 200 | `{ ok:true, applied:false, conflict:true, revision }` |
| 활성 discard 로 거부 | 200 | `{ ok:true, applied:false, conflict:false, reason:'rejected' }` |
| 어느 레인에도 없음 | 200 | `{ ok:true, applied:false, conflict:false, reason:'not_found' }` |

인증·본문 정책은 place 와 같다: 등록된 워크스페이스의 `root_dir` 만 받고, JSON 본문 처리도
같으며, 기존 HTTP 경로처럼 CORS 헤더는 붙이지 않는다(`BDUI_ALLOWED_ORIGINS` 는 WS 연결
검사에만 쓰인다). 새 권한 계층은 만들지 않는다. `Cache-Control: no-store`.

### 4.4 문서

`app/protocol.md` 에 "HTTP 세션 API" 소절을 두어 `GET /api/worker/queue`·`POST …/place`·
`POST …/remove` 의 본문과 응답을 한 곳에 적는다(지금은 코드 JSDoc 에만 있다).

## 5. 구현 unit 후보

한 unit: `scheduler.js`(retire 헬퍼·sweep 순회·`disposePausedRecord` 추출과 `stop()` 공유·비동기 paused 처분) · `queue-store.js`
(`remove` not_found) · `bead-timeline.js`(kind) · `queue-remove.js`·`routes/worker-queue.js`·
`app.js`(HTTP) · `ws/worker-handlers.js`(본문 위임) · `app/protocol.md` · 시험.

## 6. Test scope

RED → GREEN seam. 시험 이름은 능동 동사, 한 시험 한 동작.

`server/worker/scheduler.test.js` (closed-queue sweep 블록 확장). 변경 전 RED 인 seam 과
현행을 고정하는 유지 시험을 나눈다.
RED seam:
1. moves a closed serial-lane row into the done lane — 직렬 레인 entry 소실·`done` 등재.
2. removes a deferred row from the parallel queue without a done entry.
3. removes a deferred row from a serial lane without a done entry.
4. releases the serial lane a deferred bead's failed leaf held — s1 에 `failed` 기록을 가진
   deferred Bead 를 retire 한 뒤 `activeLaneLineages` 에 s1 점유가 없고 다음 s1 항목이 dispatch 된다.
5. retires a closed bead holding a leaf paused attempt through the paused disposal — attempt
   `status:'stopped'`, `cause:'bead_closed'`, `finished_at` 존재, Bead 는 `done`, 동기 pass
   에서는 아직 레인에 있다가 비동기 처분 뒤에 옮겨진다(기존 "keeps a closed bead holding a
   leaf paused attempt in the queue" 를 대체·삭제).
6. waits for a held paused_done before disposing the paused record — 약속이 pending 인 동안
   attempt 도 레인도 바뀌지 않고, resolve 뒤에 5 의 결과가 된다.
7. fails a restored paused record on an unexcluded base landing instead of stopping it —
   `settleBaseDrift` mock true → `failAttempt(..., 'base_landing_detected')`, `stopped` 패치 없음.
8. requests discardable residue cleanup after the paused disposal — `worktree.removeIfDiscardable`
   mock 이 `{ repo, bead_id, base }` 로 정산 뒤에 호출됨; `repo` 없는 기록은 호출 없음.
9. skips the lane move when the bead reopened during the paused disposal — 재읽은 status 가
   `open` 이면 attempt 만 종결되고 행은 남는다.
10. appends one queue_removed timeline event per retired bead — closed·deferred 각각 detail 확인.
11. (tick) moves a closed serial-lane bead to done inside admission — `dequeueIfClosed` 승계.
12. (tick) removes a deferred bead inside admission and releases its lane.
유지 시험(변경 전에도 통과, 회귀 방지):
13. keeps a closed bead holding a running attempt.
14. keeps a resolved row in the queue.
15. moves a closed bead whose paused ancestor was resumed and whose child is done — 조상
    paused 는 leaf 가 아니라 처분 대상이 아니고, 자식 `done` 이라 활성이 아니므로 done 으로
    이동(현행 `scheduler.test.js:11334` 와 같은 결과); 자식이 `running` 이면 13 과 같이 유지.

`server/worker/queue-store.test.js`: `remove` reports not_found without a revision bump for a
bead in no lane, and likewise for a bead that has only an admission record; still removes a
pr_wait row; still refuses under an active discard.

`server/routes/worker-queue.test.js`: rejects a remove without expected_revision / without
bead_id / with an unregistered root_dir; reports conflict on a stale revision; removes a waiting
bead and reports the new revision; reports not_found for an absent bead.

`server/ws.worker-queue.test.js`(기존 `worker-queue-remove` 시험 위치, 424행 근처): 기존 시험이
공유 본문으로도 통과(응답 형태 불변)하고, 없는 Bead 의 remove 가 `applied:false` 를 돌려준다.

`server/worker/bead-timeline.test.js`: accepts the queue_removed kind.

## 7. 수용 검사

1. Pre-Handoff Validation 전부(`npm run tsc`·`lint`·`prettier`·`vitest`).
2. 배포 뒤 첫 poller pass 에서 `GET /api/worker/queue?root_dir=<microbiome_bile>` 의 s1 에
   `Analysis-dyv`·`Analysis-hkit` 이 없다. 완료 레인 이동은 GET 이 `done` 을 싣지 않으므로
   Worker 탭 WS 스냅샷(`done` 배열) 또는 durable `queue.json` 으로 확인한다: `Analysis-dyv` 는
   `done` 에 있고 `Analysis-hkit` 은 어느 레인에도 없다. prostate 의 `PROSTATE-n50` 은 `done`
   에 있고 그 paused attempt 두 개가 `stopped`(cause `bead_closed`)다.
3. HTTP remove 왕복: microbiome_bile 병렬 큐 꼬리의 대기 항목 하나(GET 으로 lane·index 기록)를
   `POST …/remove` 로 빼고 GET 에서 부재를 확인한 뒤, 같은 lane·index 로 `POST …/place` 해
   GET 이 같은 좌석을 돌려주는지 본다. 어느 단계든 실패하면 Monitor 화면에서 수동으로 원래
   좌석에 되돌리고 그 사실을 완료 보고서에 적는다.

## 8. 경계·후속

비목표: `resolved` 처분 변경, `blocked` Bead 제거, 워크트리 강제 삭제, Monitor·Worker 카드
슬롯 변경, 새 Bead 상태·metadata·전역 설정, WS 프로토콜의 payload 변경.

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제(quick_fix) | dotfiles | user_request | 다른 저장소의 작업은 별도 최상위 단위 — workflow 스킬의 Worker 레인 배치·finishing 절차에 "세션이 배치한 Bead 를 close·deferred 로 바꿀 때 `POST /api/worker/queue/remove` 를 호출하고 readback" 을 추가 | UI-tqqp | dotfiles-dz1z |

## 결정 (ADR 후보)

- 전제: ADR UI-wc67 — "닫힌 이슈는 기존 완료 정리로 제외한다" 를 직렬 레인까지 같은 정리로 적용한다.
- 전제: ADR 0027 — 제거 사실은 Bead 타임라인 append 로 남기고 큐 상태 파일에는 두지 않는다.
- 전제: ADR 0033 — 후보 레인은 관측 집합이므로 deferred 제거 뒤 재배치는 사람·세션의 명시적 place 다.
- 전제: ADR 0050 — claim 은 `open` Bead 에만 있으므로 closed·deferred retire 는 claim 을 되돌리지 않는다.
- bd 에서 `closed`·`deferred` 인 Bead 는 모든 대기 레인에서 자동으로 물러나며, leaf paused attempt 는 Bead 의 종료가 우선해 `stopped` 로 종결되고 버릴 수 있는 워크트리만 정리된다 — 되돌리기 비용 있음(UI-m6bg 가 시험으로 고정한 "paused 유지" 를 뒤집고 stop 어휘를 자동 경로에 넓힘), 코드만으로 드러나지 않음(paused 를 활성으로 세는 fence 와의 우선순위), 실제 절충 있음(사람이 이어가려던 paused 세션 컨텍스트를 잃을 수 있음 vs 영구 stale 점유). `summary`: "bd closed·deferred Bead 는 병렬·직렬 대기 레인에서 자동 제거되고 leaf paused attempt 는 Bead 종료가 우선해 stopped 로 종결되며 버릴 수 있는 워크트리만 정리한다" → ADR
- `POST /api/worker/queue/remove` — 되돌리기 비용 없음(라우트 한 줄과 공유 본문 호출을 지우면 WS 경로가 그대로 남는다), 맥락 없이 의외이지 않음(`/place` 와 같은 자리의 대칭 입구), 실제 절충 없음 → ADR 아님.
