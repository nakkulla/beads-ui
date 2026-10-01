---
scope:
  - server/worker/queue-store.js
  - server/worker/merge-candidates.js
  - server/worker/merge-queue.js
  - server/worker/auto-merge.js
  - server/worker/attach.js
  - server/ws/worker-handlers.js
  - server/ws/connection.js
  - app/protocol.js
  - app/protocol.md
  - app/views/worker/
  - app/views/monitor/
  - app/styles.css
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# PR 대기 이슈 보관 (UI-sd12)

## 1. 목표

PR 대기 카드의 `[보관]` 한 번으로 그 PR을 모든 자동 머지 경로에서 빼고, 사용자가
`[보관 해제]`를 누를 때까지 그대로 둔다. 저장소의 `자동 머지`를 켜 둔 채 다른 PR만
자동으로 머지되게 하는 것이 목적이다.

사용자는 UI-dbn6(PR #338)를 머지하지 않고 붙잡아 두려 한다(2026-10-01). 지금은 항목
하나를 자동 머지에서 빼는 사용자 장치가 없어 저장소의 `자동 머지`를 끄는 수밖에 없다.
UI-6mpl이 `자동화`와 `자동 머지`를 떼어도 이 문제는 남는다 — 둘 다 저장소 단위 스위치다.

## 2. 검증된 전제

기준 SHA `0843ca5ff9398f640a37cf5475ad0c5f9cecdae8`(origin/main).

- `[취소]`는 대기열에서 항목을 빼기만 하고 제외 기록을 남기지 않는다. driver가 그 항목을
  활성으로 잡고 있으면 `merge_active`로 거부하고, 예외는 그 항목의 리뷰 세션이 돌고 머지
  효과가 진행 중이 아닐 때뿐이다 — 충돌 해소를 기다리는 활성 항목도 거부된다 —
  server/worker/queue-store.js:11882, server/ws/worker-handlers.js:5773, :5826-5843
- 자동 enroller는 `auto_merge`가 켜져 있는 동안 PR poller가 관측 패스마다 내는
  `queue-changed`를 타고 자격을 다시 판정하므로, 취소한 항목도 다음 패스에서 다시
  들어간다 — server/worker/auto-merge.js:7-13, :210, :221
- 자동 enroll·`[일괄 머지]`(`worker-merge-queue-add-all`)·repairable red intake는
  `mergeQueueCandidates` 한 목록을 쓴다 — server/worker/auto-merge.js:142,
  server/ws/worker-handlers.js:5601, :5607, server/worker/attach.js:3676,
  server/worker/merge-candidates.js:198, :214
- 충돌 난 로컬 PR도 자격이 있다(충돌 해소 경로) — server/worker/merge-candidates.js:248
- 기존 제외 기록 `auto_merge_skips`는 driver가 실패한 head에 핀하고 head가 바뀌면
  지워지며, `[머지]` 클릭과 PR 대기 재진입(`moveToPrWait` → `removeFromLanes`)도 지운다 —
  server/worker/queue-store.js:11548, :11553, :10251, :9047, :5163, :5174
- 새 대기열 항목은 모두 `insertRunnableMergeEntry`로 들어간다(completion intent 재개와
  legacy adoption 포함). 그 밖의 대기열 쓰기는 같은 상태에 이미 있던 항목을 되살리거나
  옮길 뿐이다 — `moveToPrWait`의 원위치 복원, 재적재 `normalizeMergeQueue`, 차례 양보·
  재정렬 — server/worker/queue-store.js:5236, :5241, :5273-5274, :11393, :9070-9079,
  :4961, :11720-11721, :11790
- 머지·base 갱신·충돌 해소 dispatch·자동 리뷰 dispatch는 모두 driver가 `merge_queue`
  머리에서 실행한다. `processItem`은 completion intent가 있는 항목을 기존 skip 검사보다
  먼저 `processCompletionItem`으로 넘긴다 — server/worker/merge-queue.js:2046,
  :2062-2065, :2074, :956, :761, :1817
- 일반 충돌 해소 세션은 끝나면 정산되고, 성공하면 `moveToPrWait`로 PR 대기에 재진입한다.
  `moveToPrWait`는 같은 Bead의 대기열 항목이 있을 때만 원위치에 복원한다 —
  server/worker/scheduler.js:6486, :6838, server/worker/queue-store.js:9070-9079
- 머지 자격 판정과 driver는 Bead 의존성(`blocks`)을 읽지 않는다 — server/worker/merge-gate.js,
  merge-candidates.js, merge-queue.js에서 `blocked_by` 검색 결과 없음
- `[머지]` 클릭은 `enqueueMergeManual`로 manual authority 항목을 넣고, manual 항목은
  `자동 머지` 끄기에도 남는다 — server/ws/worker-handlers.js:5503,
  server/worker/queue-store.js:10028, :11589, :11601
- 큐 필드는 `KNOWN_QUEUE_FIELDS`·`emptyQueue`·`normalizeQueue`에 등록하고, 등록되지 않은
  키는 그대로 복사되며, queue.json에는 버전 필드가 없다 — server/worker/queue-store.js:2208,
  :2250, :2286, :2336, :4966, :4689-4693
- 클라이언트 큐 스냅샷은 `decorateQueue`가 큐를 펼쳐 보낸다 — server/ws/worker-handlers.js:3054
- MERGED는 완료로 넘기고 CLOSED(미머지) 행은 PR 대기에 남는다 — server/worker/pr-poller.js:401-408
- 외부(다른 저장소) PR 대기 행은 durable 레인 행이 아니라 registry overlay다 —
  server/worker/merge-candidates.js:105
- WS op는 `MessageType`·`MESSAGE_TYPES`·connection 스위치·protocol.md 네 곳에 등록한다 —
  app/protocol.js:15, :289, :291, server/ws/connection.js:639, :645, app/protocol.md:886, :892
- PR 대기 카드는 두 탭 모두 `miniRow`가 그리고 `[머지]`는 `merge_action`이 참일 때만 액션
  foot에 그린다; 행은 Worker `prWaitRow`와 Monitor lane-model 두 곳에서 투영한다 —
  app/views/worker/lanes.js:3389, :3572, :3831, app/views/worker/index.js:1279, :1565,
  app/views/worker/lane-model.js:3764
- Worker 탭 `자동 머지 N`은 `merge_action && merge_enabled && !auto_excluded` 행을 세고,
  Monitor `일괄 머지`는 저장소별 add-all을 보낸다 — app/views/worker/index.js:4122-4125,
  app/views/monitor/index.js:848, :857
- 레인 아래 접힌 묶음 선례: Worker의 `보류 N` `<details>`와 열림 상태 localStorage 키 —
  app/views/worker/index.js:3157, :237
- 슬롯 표 6번 액션 foot이 `머지`/`취소`/`폐기` 등 카드 조작을 담고, 표에 없는 요소는 스펙을
  먼저 고친다 — docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:247,
  :262; docs/adr/UI-nuwy-same-worker-session-conversation-and-return.md:263-266
- PR #338(head `be0892764ad467650831849b9f9fcf9e20d2e271`, merge-base `3c085208`)은
  `app/views/`를 지우고, 위 서버 파일 중 queue-store·merge-candidates·merge-queue·
  auto-merge·worker-handlers는 바꾸지 않으며, connection.js·protocol.js·protocol.md에서는
  머지 op가 아닌 항목만 지운다 — `git diff --stat 3c085208 be089276 -- <위 파일>`,
  `git ls-tree -d be089276 app/views`(빈 결과)
- UI-dbn6 스펙은 머지·게이트·배포 조작의 의미와 버튼 집합을 바꾸지 않는다고 전제한다 —
  docs/superpowers/specs/2026-09-23-frontend-rewrite-unified-pipeline-design.md:508

## 3. 설계

### 3.1 보관 상태

- 결정: 보관은 Worker 큐 상태의 워크스페이스별 맵 `merge_shelved: { [bead_id]: { at } }`에
  둔다. Bead 라벨·metadata는 쓰지 않는다 — beads-ui는 workflow 계약 키를 정의하지 않고
  (ADR UI-u6ud-2), 클릭마다 bd 쓰기를 더할 이유도 없다.
- 결정: 보관은 로컬 PR 대기 행에만 건다. 외부(다른 저장소) 행에는 `[보관]`이 없다 —
  durable 행이 없는 overlay라 수명을 묶을 곳이 없고, 지금 필요한 것은 이 저장소의 PR이다.
- **정정(UI-8d8y).** 위 결정의 전제가 틀렸다. `external: true`는 다른 저장소가 아니라
  Worker attempt 없이 세션이 배달한 PR 대기 행(registry overlay)이고, 같은 저장소 PR도
  여기 들어온다 — 보관하려던 PR #338이 바로 그 행이었다. 다른 저장소 여부는 overlay의
  `foreign`(UI-lpg1)이 따로 판정한다. 그래서 `[보관]`은 `foreign` 행에만 없고 서버는 그
  행을 `foreign`으로 거부한다. 같은 저장소 overlay 행은 handler가 overlay 소속을 보증해
  store가 기록하고(`not_pr_wait` 대신), 기존 차단 경로는 bead_id로 판정하므로 그대로
  적용된다. 그 기록은 레인 퇴장이 없으므로 poller 전체 상태 스캔이 그 Bead를 `closed`로
  읽을 때 지운다 — overlay에서 빠지는 것만으로는 지우지 않는다. base 동기화 세션이
  Bead를 잠시 `in_progress`로 가져가는 동안 보관이 풀리면 다시 resolved가 될 때 자동 머지
  대상이 되기 때문이다. 머지가 관측된 뒤 정리용으로 승격된 durable external 행은 계속
  `external`로 거부한다. §3.2 거부 사유와 §4 수용 기준 8도 이 정정을 따른다.
- 수명: 기록은 head 이동, PR 대기 재진입(세션이 같은 Bead를 다시 배달), 서버 재시작, PR
  CLOSED(미머지)에도 남는다. 사용자 해제, MERGED 완료 이동, 폐기, Bead를 PR 대기에서 빼는
  큐 조작(다른 레인으로 옮기기·제거)에서만 지운다. `auto_merge_skips`와 달리 재진입 경로는
  이 기록을 지우지 않는다.
- 불변식: 커밋된 어떤 큐 상태에서도 보관된 Bead는 `merge_queue`에 없다.

### 3.2 보관·해제 조작 (`worker-merge-shelve`)

- 결정: 새 WS op `worker-merge-shelve`, payload `{ bead_id, on, expected_revision }`, 응답
  `{ bead_id, applied, conflict, reason?, queue }`. 다른 머지 op와 같은 CAS 규칙이다.
- 보관(`on: true`)은 한 mutation에서 기록을 쓰고 그 Bead의 대기열 항목을 authority(자동·
  수동)와 무관하게 뺀다. 그 항목이 dispatch한 미정산 리뷰 세션은 `[취소]`와 같이 같은
  write에서 정산하고 프로세스를 멈춘다.
- 결정: 활성 항목의 거부 판정은 `[취소]`와 같다. driver가 그 Bead를 활성으로 잡고 있으면
  `merge_active`로 거부하고 상태를 바꾸지 않는다. 충돌 해소를 기다리는 활성 항목도
  거부된다. 예외도 `[취소]`와 같아서, 그 항목의 리뷰 세션만 돌고 머지 효과가 진행 중이
  아니면 허용한다. 그래서 보관이 driver가 든 항목을 빼는 경우는 `[취소]`가 이미 허용하는
  리뷰 대기뿐이고 그 뒤 처리도 `[취소]`의 기존 경로를 탄다 — 효과 직전 재확인을 새로 두지
  않는다. 거부된 경우는 driver가 그 항목을 놓은 뒤(해소 결과 정산이나 queue-yield로 차례를
  넘긴 뒤) 다시 누른다.
- 차례를 넘겨 활성이 아닌 항목에서 도는 충돌 해소 세션은 보관이 멈추지 않는다(`[취소]`와
  같다). 세션은 평소처럼 정산되고, 성공하면 PR 대기로 재진입한다. 대기열 항목은 이미
  없으므로 대기열로 복원되지 않고, 보관 기록은 재진입에도 남는다. 세션을 멈추려면 실행
  카드의 중지를 쓴다.
- 거부: 로컬 PR 대기 행이 없으면 `not_pr_wait`, 외부 행이면 `external`. 이미 같은 값이면
  `applied: false`이고 상태는 그대로다.
- 해제(`on: false`)는 기록만 지운다. `자동 머지`가 켜져 있으면 다음 PR 관측 패스에서 자격을
  다시 판정해 대기열에 넣는다.

### 3.3 자동·수동 경로에서 빼기

- 자동 enroll·`[일괄 머지]`·repairable red intake: 공용 후보 목록에서 보관된 Bead를 뺀다.
  예: `mergeQueueCandidates` 행 루프에서 건너뛴다.
- 새 항목 삽입 자체가 보관된 Bead를 거절한다(불변식의 정본). 예: `insertRunnableMergeEntry`
  호출부가 보관이면 쓰지 않는다 — `enqueueMergeAuto`는 건너뛰고, `enqueueMergeManual`은
  `applied: false, reason: 'shelved'`를 돌려주며, completion intent 재개와 legacy
  adoption도 같은 거절을 받는다. `[머지]`·`[리뷰 후 머지]`는 이 거절을 그대로 응답한다 —
  화면에는 버튼이 없지만 오래된 화면과 경합한 클릭을 막는다.
- 복원·재정렬 경로(PR 대기 재진입의 원위치 복원, 재적재, 차례 양보·재정렬)는 같은 커밋
  상태에 이미 있던 항목만 다룬다. 보관 write가 같은 mutation에서 항목을 빼므로 이 경로들은
  보관된 Bead를 되살리지 못하고, 따로 고치지 않는다.
- driver 방어: `processItem` 진입에서 completion intent 분기보다 먼저 보관을 확인하고, 보관된
  항목은 효과 없이 대기열에서 뺀다. 자동 리뷰·충돌 해소·base 갱신·머지 효과와 completion
  경로가 모두 이 뒤에 있다.
- 결정: PR 관측과 head 핀 `[verify]`는 보관 중에도 돈다 — 해제할 때 현재 상태를 바로
  보이기 위해서다.

### 3.4 화면 (main의 Worker·Monitor 탭)

- 보관되지 않은 로컬 PR 대기 카드: 6번 액션 foot에 `[보관]`을 단다(`[머지]`/`[취소]` 다음,
  `.op-btn` 모양). 머지가 관측된 뒤 정리 단계 행에는 달지 않는다.
- 보관된 카드는 PR 대기 레인 본문에서 빠지고 레인 아래 접힌 묶음 `보관 N`에 들어간다.
  묶음은 기본 닫힘이고 열림 상태는 보는 사람별 localStorage에 둔다(`보류 N` 선례). 두
  탭이 같다.
- 묶음 안 카드는 같은 `miniRow`이고 `[머지]`가 없으며 `[보관]` 자리에 `[보관 해제]`가
  있다. 그 밖의 조작(`[폐기]`, 세션 버튼)은 그대로다.
- 개수: PR 대기 레인 개수, Worker 탭 `자동 머지 N`, Monitor `일괄 머지` 개수에서 보관
  행을 뺀다.
- 토스트: 보관 `<ID> 보관 — 자동 머지·일괄 머지에서 빠집니다`, 해제 `<ID> 보관 해제 —
  자동 머지가 켜져 있으면 다시 머지 대상이 됩니다`, `merge_active`는 `머지 큐가 이 PR을
  처리 중이라 지금은 보관할 수 없습니다 — 처리가 끝나거나 차례를 넘긴 뒤 다시 누르세요`.
- 슬롯 표 정정: 2026-08-25 스펙 §5.1 6번 행에 `보관`/`보관 해제`를 더하고 `보관 N` 묶음이
  `보류 N`과 같은 레인 footer 자리라고 적는 `정정(UI-sd12)` 문단을 코드와 같은 변경에
  넣는다.

### 3.5 PR #338(UI-dbn6) 승계

- 결정: 이 변경은 UI-dbn6를 기다리지 않고 지금 main에 착지한다. 승계는 UI-dbn6 쪽 작업이며
  UI-dbn6가 이 Bead를 기다린다(`bd dep add UI-dbn6 UI-sd12 --type blocks`, 7절 표).
- 서버 변경은 PR #338이 같은 파일을 건드리지 않으므로 base 동기화에서 그대로 따라간다.
  `app/protocol.js` 15행 typedef와 connection.js 스위치는 서로 다른 항목을 지우고 더하는
  텍스트 충돌만 예상된다.
- 화면 변경은 PR #338이 `app/views/`를 지우므로 따라가지 않는다. UI-dbn6는 base 동기화 때
  새 화면(PR 대기 행 투영, 행 조작, 레인 본문, op 송신, 개수)에 3.4를 다시 구현하고, 그 스펙
  부록 A의 닿아야 하는 op 목록에 `worker-merge-shelve`를 더한다. UI-dbn6 스펙의 "버튼
  집합을 바꾸지 않는다" 전제는 동기화 시점 main의 집합을 가리키므로 `보관`을 포함한다.
- 전달 수단: 스펙 게이트를 닫을 때 router가 위 `blocks` 엣지를 쓰고, UI-dbn6 본문에
  `## 추가 (2026-10-01, 출처 UI-sd12)` 절(항목: 새 화면의 보관 재구현과 부록 A op 추가,
  admission `user_request`)과 notes `addendum:` 줄을 남긴 뒤 둘 다 다시 읽는다. 완료 증거는
  UI-dbn6 쪽이다: base 동기화한 PR #338 head가 3.4(수용 기준 9)를 새 화면에서 만족하고,
  UI-dbn6 notes에 `addendum-resolved:` 줄이 생긴다.
- 위험과 처분: 머지 판정은 `blocks`를 읽지 않고 자동 충돌 해소 세션은 지워진 화면의 기능을
  옮기지 않는다. 그래서 승계 전에 PR #338이 자동 해소·머지되면 화면 보관이 사라진다. PR
  #338은 이 기능으로 보관해 두고(자동 해소·머지 경로가 모두 멈춘다), 보관 해제는 UI-dbn6
  base 동기화 세션이 addendum을 해소한 뒤에 한다 — `## 추가` 절에 이 순서를 적는다.

## 4. 수용 기준

1. 대기열에 자동 항목이 있는 로컬 PR 대기 Bead를 보관 → 같은 mutation에서 기록이 생기고
   항목이 빠진다. stale revision은 conflict로 거부되고 상태는 그대로다.
2. manual authority 항목도 보관이 뺀다.
3. driver가 그 Bead를 활성으로 잡고 있으면(충돌 해소 대기 포함) `merge_active`로 거부되고
   상태는 그대로다. 활성 항목이 자기 리뷰 세션만 기다리고 머지 효과가 없으면 보관이
   적용되고 그 리뷰 세션이 정산된다.
4. `auto_merge=true`에서 보관된 green·충돌·repairable red PR이 enroll 패스 뒤 대기열에 없고,
   `[일괄 머지]`도 넣지 않는다.
5. 보관된 Bead에 `worker-merge-queue-add` → `applied: false, reason: 'shelved'`.
6. 보관 기록은 head 이동, PR 대기 재진입, 큐 재적재 뒤에도 남고, MERGED 완료 이동과 폐기
   뒤에는 없다.
7. 해제 → 기록만 지워지고, `auto_merge=true`면 다음 enroll 패스에서 다시 대기열에 들어간다.
8. 외부 행 보관 요청은 `external`로 거부되고, 외부 행 카드에는 `[보관]`이 없다.
9. 두 탭에서 보관 행은 `보관 N` 묶음에만 있고, `[머지]` 없이 `[보관 해제]`가 있으며, 레인
   개수와 자동 머지 개수에서 빠진다.
10. 큐 머리에 보관된 항목이 있는 상태(completion intent가 있는 항목 포함)로 driver가 돌면
    그 항목은 머지·base 갱신·충돌 해소·리뷰 dispatch 없이 대기열에서 빠진다.
11. completion intent 재개와 legacy adoption은 보관된 Bead를 대기열에 넣지 않는다.
12. 차례를 넘긴 항목을 보관한 뒤 그 충돌 해소 세션이 성공해 PR 대기로 재진입해도 대기열로
    복원되지 않고 보관 기록이 남는다.

## 5. 테스트

- server/worker/queue-store.test.js — 수용 1·2·6·11·12, 해제, 잘못된 기록 정규화, 대기열
  추가 거절.
- server/worker/merge-candidates.test.js — 보관 행이 후보에 없다(충돌·repairable 포함).
- server/worker/auto-merge.test.js — 보관 중 enroll 없음, 해제 뒤 enroll.
- server/worker/merge-queue.test.js — 수용 10(일반 항목과 completion intent 항목 두 경우).
- server/ws.worker-queue.test.js, server/ws/worker-handlers.workspace-target.test.js — op
  정상·conflict·`merge_active`·`not_pr_wait`·`external`, `worker-merge-queue-add`의 `shelved`.
- app/views/worker/, app/views/monitor/ 의 해당 테스트 — 수용 9.
- 검증 묶음: `npm run tsc`, `npm run lint`, `npx prettier --check <변경 파일>`,
  `npx vitest run --reporter=dot`.

## 6. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-3 — 드라이버가 머지의 단일 caller이고 항목 authority는 전역
  `auto_merge`와 별개 축이다. 보관은 이 축에서 항목 하나의 등록을 막을 뿐 자격 입력을
  넓히거나 드라이버를 우회하지 않는다.
- 전제: ADR UI-u6ud-4 — 자동 리뷰 dispatch는 대기열 항목에만 걸리므로 보관 항목에는 생기지
  않는다.
- 전제: ADR UI-u6ud-2 — 보관은 beads-ui 큐 상태이고 Bead 라벨·metadata 키를 만들지 않는다.
- 전제: ADR UI-nuwy — 슬롯 표 승계 조항대로 §5.1 정정을 같은 변경에 넣는다.
- 보관은 head 이동·재진입·재시작에도 유지되고 해제나 실제 퇴장에서만 풀리는 항목 단위 자동
  머지 철회다 — 되돌리기 쉽다: 한 저장소 한 기능의 큐 필드 하나와 거절 지점뿐이고, 기능을
  지우면 남은 기록은 등록되지 않은 큐 키로 복사만 되어 동작에 영향이 없다 → ADR 아님
- WS op 이름·payload — 한 줄 편집으로 되돌릴 수 있는 호환 선택 → ADR 아님

## 7. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | beads-ui | user_request | independent_landing_bundle — 새 화면의 보관 재구현은 `app/views/`를 지운 PR #338 안에서만 착지한다(기존 Bead에 `## 추가`로 얹는다, 3.5) | UI-sd12 | UI-dbn6 |

다른 저장소 작업은 없다. UI-6mpl과는 `queue-store.js`·`worker-handlers.js` 경로만 겹치고
전제 의존은 없다. 착지 뒤 공유 서버 배포는 이 저장소의 Post-Merge Runtime Validation을
따른다.
