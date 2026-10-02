---
scope:
  - server/worker/queue-store.js
  - server/ws/worker-handlers.js
  - server/ws/monitor-handlers.js
  - app/protocol.md
---

# 자동화 토글과 자동 머지 토글 분리 (UI-6mpl)

## 1. 목표

`자동화` 버튼은 `auto_advance`(준비된 Bead에 세션을 붙이는 자동 진행)만, `자동 머지`
버튼은 `auto_merge`(자격이 생긴 PR을 머지 큐에 넣는 자동 머지)만 바꾼다. 어떤 클릭도 두
플래그를 함께 바꾸지 않는다.

지금은 `자동화`를 켜는 한 번의 클릭이 되돌릴 수 없는 머지 권한까지 준다. 사용자는
UI-dbn6(PR #338)를 머지하지 않고 보류하려 하는데, 자동 진행을 켜면 그 PR도 자격을
얻는 순간 자동으로 머지될 수 있다(2026-10-01 사용자 요청). 켜고 곧바로 `자동 머지`를
끄는 우회는 켜기 직후 서버가 PR 관측과 등록을 비동기로 시작하므로 경합이 남는다.

사용자 합의(2026-10-01): 켜기와 끄기 모두 분리하고, 여러 저장소를 한꺼번에 바꾸는 모니터
전체 스위치도 자동 진행만 바꾼다.

## 2. 검증된 전제

기준 SHA `3c0852081a6a94f79e75df01faa95540e714f0e9`.

- 저장소 자동화 mutation은 한 번에 `auto_advance`와 `auto_merge`를 같은 값으로 쓰고,
  끄기는 활성 항목과 해소 journal만 남기고 머지 대기열을 비운다 —
  server/worker/queue-store.js:7880, :7883, :7884, :7886
- `auto_advance`만 쓰는 CAS mutation이 이미 있고 `auto_advance_at_shutdown`도 같은
  방식으로 소비한다 — server/worker/queue-store.js:6891, :6894, :6898
- `worker-queue-toggle`은 그 mutation을 쓰고 켜기에서 dispatch tick만 시작한다 —
  server/ws/worker-handlers.js:4578, :4592
- `worker-automation-toggle`은 끄기에서 활성 머지를 읽어 `keep`으로 넘기고, 켜기에서
  tick과 함께 PR 관측·조건부 enroll을 시작한다 — server/ws/worker-handlers.js:4633,
  :4647, :4658, :4610
- 모니터 전체 스위치 `monitor-auto-toggle`은 UI-yu2o(`d24f47a1`)가 라우트·`MESSAGE_TYPES`
  등록·핸들러·테스트째 지웠고 지금은 `unknown_type`으로 답한다 — `c322cbc7` 기준
  app/protocol.md:1597-1600, server/ws.test.js:76, app/protocol.test.js:231
- 그 삭제 뒤 `server/ws/monitor-handlers.js`에는 지워진 전체 스위치의 분모를 이유로 드는
  JSDoc 구절만 남았다 — `c322cbc7` 기준 server/ws/monitor-handlers.js:910
- `자동 머지` 토글은 독립 경로다: 켜기는 저장·관측·enroll, 끄기는 플래그와 대기열 비우기를
  한 write로 한다 — server/ws/worker-handlers.js:5660, server/worker/queue-store.js:11589,
  :11592
- `자동 머지` 끄기가 비우는 것은 자동 등록된 대기 항목뿐이고 활성 항목(`keep`)·해소
  journal·수동 권한 항목은 남는다 — server/worker/queue-store.js:11593-11602
- 이미 실행 중인 머지의 `[취소]`는 `merge_active`로 거부된다 —
  server/ws/worker-handlers.js:5840
- auto-merge enroller는 자기 타이머 없이 `queue-changed`를 타고 자격을 다시 판정한다 —
  server/worker/auto-merge.js:7-13
- 화면의 `자동화` 버튼은 `worker-automation-toggle`을 보내고 `자동 머지`는
  `worker-merge-auto-toggle`을 보낸다 — app/views/worker/index.js:2864, :2626,
  :5123-5125; app/views/monitor/deck.js:709-719
- 화면 문구는 결합을 말하지 않는다: `자동화` 버튼은 `▶ 자동화`/`⏸ 자동화 멈춤`만,
  `자동 머지` 토스트·툴팁은 자동 머지만, 레포 데크 스위치 툴팁은 각자 자기 축만 말한다 —
  app/views/worker/index.js:2622-2637, :2860-2877, :3628-3631, :4103-4140;
  app/views/monitor/deck.js:317-340
- UI-dbn6 PR #338 head의 재작성 프런트엔드는 `worker-automation-toggle`을 보낸다 —
  `git grep` at `be0892764ad467650831849b9f9fcf9e20d2e271`: app/screens/pipeline/actions.js:650
- UI-dbn6(PR #338)는 2026-10-01 적용하지 않기로 결정되어 머지되지 않은 채 보관 중이다 —
  Bead UI-6mpl notes "관계 (2026-10-01)" 줄
- 진행 중인 UI-ny0h 스펙도 UI-u6ud-3을 supersede하는 ADR 후보를 두고, 그 `summary`는 결합
  조항("자동화 클릭만 둘을 원자적으로 맞춘다")을 나머지 조항 승계로 그대로 옮겨 적는다 —
  `c322cbc7` 기준 docs/superpowers/specs/2026-10-02-worker-timing-settings-design.md:190
- 결합의 정본은 Accepted ADR UI-u6ud-3이다 — docs/adr/UI-u6ud-3-worker-merge-queue.md:30-31
- 그 ADR이 흡수한 0011은 "단일 자동화 스위치"를 되돌릴 수 없는 머지를 되돌릴 수 있는
  자동 진행과 한 클릭에 묶는다는 이유로 기각했다 —
  docs/adr/history/0011-auto-merge-and-auto-advance-independent-toggles.md `## Considered Options`
- 프로토콜 문서가 결합을 서술한다 — app/protocol.md:688-690

## 3. 설계

### 3.1 저장소 `자동화` (`worker-automation-toggle`)

- 켜기와 끄기 모두 `auto_advance`만 CAS로 쓴다. `auto_merge`와 `merge_queue`는 읽지도
  쓰지도 않는다. `auto_advance_at_shutdown` 소비는 지금과 같다.
- 켜기의 부수효과는 dispatch tick 하나다. PR 관측과 enroll은 시작하지 않는다. 자동 머지가
  이미 켜진 워크스페이스는 enroller가 `queue-changed`와 PR poller의 기존 경로로 계속 돈다.
- 끄기는 머지 대기열을 건드리지 않는다. 머지를 멈추는 길은 지금과 같다: `자동 머지`
  끄기는 자동 등록된 대기 항목을 비우고 활성 항목·해소 journal·수동으로 넣은 항목은
  남긴다. 대기 항목은 `[취소]`로 뺄 수 있고, 이미 실행 중인 머지는 `[취소]`도
  `merge_active`로 거부되어 끝까지 간다.
- 결과적으로 `worker-queue-toggle`과 같은 동작이 된다. 예: 두 핸들러가 같은
  `toggleAutoAdvance`를 부르고 결합 mutation `toggleAutomation`은 지운다.

### 3.2 모니터 전체 스위치 (`monitor-auto-toggle`) — 이미 삭제됨

- UI-yu2o가 op를 지웠으므로(§2) 이 변경에 모니터 전체 스위치 몫은 없다. 사용자 합의(§1)의
  "모니터 전체 스위치는 자동 진행만"은 그 스위치가 결합 mutation을 부를 길이 사라져 이미
  충족됐다 — 이전 판의 "삭제가 이긴다"가 UI-dbn6 대신 UI-yu2o로 실현된 것이다.
- 여러 저장소의 자동 머지를 한 클릭으로 켜는 경로는 계속 두지 않는다. 자동 머지는 저장소별
  토글로만 켠다.
- 남은 일은 §3.4의 `server/ws/monitor-handlers.js` JSDoc 구절 하나다.

### 3.3 바뀌지 않는 것

- 결정: WS op 이름과 payload는 바꾸지 않는다 — PR #338의 재작성 프런트엔드가
  `worker-automation-toggle`을 보내므로 이름을 바꾸면 그 PR이 깨진다.
- `자동 머지` 토글, 머지 큐 드라이버, 자격 판정, 항목 authority는 바꾸지 않는다.
- 이미 저장된 `auto_merge` 값은 옮기지 않는다. 과거 `자동화` 클릭으로 켜진 워크스페이스는
  켜진 채 남고, 사용자가 `자동 머지`를 꺼야 꺼진다.
- 화면 버튼·툴팁·토스트 문구에는 결합을 말하는 문장이 없으므로 바꾸지 않는다.
- 비목표: `worker-queue-toggle`과 `worker-automation-toggle`을 한 op로 합치는 것(프로토콜
  변경이라 이 변경의 목적과 무관하다).

### 3.4 문서

`app/protocol.md`의 `worker-automation-toggle` 항목, `worker-automation-toggle` 핸들러와
`worker-merge-auto-toggle`의 JSDoc에서 "두 축을 맞춘다"는 서술을 "`auto_advance`만
바꾼다"로 고친다. `server/ws/monitor-handlers.js`의 `workspaces_state` JSDoc에서 지워진
전체 스위치의 분모를 이유로 드는 구절을 뺀다(UI-yu2o 삭제의 잔재).

## 4. 수용 기준

1. `auto_merge=false`인 워크스페이스에서 `worker-automation-toggle` 켜기 →
   `auto_advance=true`, `auto_merge=false`, `merge_queue` 불변, enroll 호출 없음, tick 1회.
2. `auto_merge=true`이고 대기 항목이 있는 워크스페이스에서 끄기 → `auto_advance=false`,
   `auto_merge=true`, `merge_queue` 불변.
3. (소멸) `monitor-auto-toggle`은 UI-yu2o로 삭제되어(§2) 이 기준은 op와 함께 소멸했다.
   삭제된 op가 `unknown_type`으로 답하는 기존 테스트는 그대로 통과한다.
4. stale revision은 지금처럼 conflict로 거부되고 상태를 바꾸지 않는다.
5. `worker-merge-auto-toggle`의 기존 테스트가 그대로 통과한다.

## 5. 테스트

테스트 위치는 `c322cbc7` 기준이다.

- `server/worker/queue-store.test.js`: 결합 mutation 테스트(:1911-2028)를 지우거나
  `auto_advance` 전용 기대로 바꾼다. 켜기·끄기가 `auto_merge`와 `merge_queue`를 건드리지
  않는다는 테스트를 둔다.
- `server/ws.worker-queue.test.js`: "automation toggle turns both axes on"(:506),
  "automation ON … observes PRs, and enrolls"(:2347), "independent merge OFF during
  automation observation"(:2386), "automation OFF clears waiting merges"(:2427)를 수용
  기준 1·2로 바꾸고, "automation conflict returns the current queue"(:2475)로 수용 기준
  4를 지킨다.
- 검증 묶음: `npm run tsc`, `npm run lint`, `npx prettier --check <변경 파일>`,
  `npx vitest run --reporter=dot`.

## 6. 결정 (ADR 후보)

- `자동화`와 `자동 머지`는 각자 자기 플래그만 바꾸고 어떤 클릭도 둘을 함께 바꾸지 않는다 —
  UI-u6ud-3의 "자동화 클릭만 둘을 원자적으로 맞춘다" 조항을 뒤집고 나머지 조항(단일 순차
  큐, 저장소 안 자격 입력, queue-yield deadline, fence)은 그대로 재진술한다. 되돌리기
  어렵다 — 되돌리려면 queue-store의 자동화 mutation, `worker-automation-toggle` 핸들러,
  `app/protocol.md`, 두 테스트 파일이 함께 움직인다. 맥락
  없이 놀랍다 — 0011 이력은 `자동화` 클릭이 머지까지 켠다고 말하므로 나중에 온 사람은 왜
  바뀌었는지 묻는다. 실제 트레이드오프다 — 한 클릭으로 둘 다 켜는 편의를 버리고 머지 권한을
  자동 진행과 떼었다. `summary`: "PR 랜딩 작업의 머지는 Worker의 단일 순차 큐만 실행하고
  완료는 MERGED 관측이다; 머지 자격은 저장소 안의 입력(PR·base·head identity,
  mergeability, 리뷰·실행 영수증, [verify])만 보고 GitHub checks는 읽지 않는다;
  auto_merge와 auto_advance는 독립 스위치이고 어떤 클릭도 둘을 함께 바꾸지 않는다; 30분은
  실패가 아니라 queue-yield deadline이고 충돌 해소 fence는 수동 권한 면제·슬롯 여유로
  판정한다" → ADR, supersede UI-u6ud-3
- WS op 이름과 payload 유지 — 한 줄 편집으로 되돌릴 수 있는 호환 선택이다 → ADR 아님

## 7. 경계·후속

다른 저장소에서 할 작업과 형제 Bead는 없다. 착지 뒤 공유 서버 배포는 이 저장소의
Post-Merge Runtime Validation을 따른다.

이 변경은 UI-dbn6를 기다리지 않고 UI-dbn6도 이 변경을 전제로 삼지 않는다(두 Bead 사이에
`blocks` 엣지를 두지 않는다). UI-dbn6는 적용하지 않기로 결정되어 보관 중이고(§2),
PR #338을 나중에 이식하면 `app/protocol.md`의 `worker-automation-toggle` 항목은 이 변경의
문구를 채택한다.

UI-ny0h와도 `blocks` 엣지를 두지 않는다 — 두 스펙의 결정 대상(결합 조항, deadline 길이)이
다르고 같은 ADR을 supersede할 뿐이다. 나중에 착지하는 쪽이 먼저 착지한 ADR을 supersede
대상으로 삼고 그 결정을 승계한다: 이 변경이 먼저면 UI-ny0h의 `summary`는 "어떤 클릭도 둘을
함께 바꾸지 않는다"를, UI-ny0h가 먼저면 이 변경의 `summary`는 "그 길이는 서버 전역 타이밍
설정이 정하며"를 함께 적는다.
