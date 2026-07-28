# pr_wait 순차 머지 큐 설계 (UI-5v7d)

- 날짜: 2026-07-28
- Bead: UI-5v7d
- 상태: 사용자 설계 승인 + codex spec 리뷰(REVISE) 반영 완료

## 배경과 문제

pr_wait 레인의 [머지] 클릭은 bead 단위로 즉시 실행된다
(`server/worker/pr-actions.js` `merge()`): 재게이트 → BEHIND면
`gh pr update-branch` → squash 머지 → cleanup. 서로 다른 bead의 머지를
연달아 누르면 동시에 진행되며, bead 간 직렬화는 없다(per-bead `in_flight`
Set과 git ref 변이 구간의 `topologyLock`만 존재).

충돌(DIRTY/CONFLICTING) PR은 머지 대신 충돌 해소 세션이 비동기로 뜨고
(`dispatchResolution` → `scheduler.resolveConflict`, `claude --resume`),
세션이 끝나도 자동 재머지가 없어 사용자가 다시 [머지]를 눌러야 한다.
외부 행(UI-7agi, 구현 완료)은 해소 세션을 디스패치할 수 없어
`external_conflict_needs_session`으로 거부된다.

`merge()`의 반환 계약(`MergeClickResult`)의 `action`은
`merged`/`updated_and_merged`/`already_merged`/`merge_unconfirmed`/
`conflict_resolution`/`refused`다. 특히 `merge_unconfirmed`는 squash 명령이
0으로 끝났지만 PR이 아직 MERGED로 관측되지 않은 상태(merge queue/`--auto`,
또는 관측 실패)로, `ok: true`(`merge_pending`)일 수도 있다 — 완료로도
실패로도 단정할 수 없는 상태다.

여러 PR을 순서대로 머지하려면 사용자가 하나 끝날 때마다 지켜보며 클릭해야
하고, 먼저 머지된 PR 때문에 뒤 PR이 BEHIND/충돌로 바뀌는 상호작용을 수동으로
쫓아가야 한다.

## 목표

1. 모든 머지 실행을 하나의 서버측 순차 큐로 직렬화한다(개별 클릭 = 1건 큐잉).
2. 레인 헤더 [일괄 머지] 버튼으로 현재 머지 가능한 모든 행을 순서대로 큐잉한다.
3. 큐 진행 중 충돌이 나면 해소 세션을 자동 디스패치하고, 세션 완료를 감지해
   자동 재머지한 뒤 다음 항목으로 진행한다.
4. cleanup deploy 단계의 서버 자기 재시작(beads-ui 머지 시 실제 발생)에서도
   남은 큐가 살아남아 부팅 시 이어서 처리된다.

## 비목표

- 병렬 머지, 큐 순서 재배열 UI, 실패 항목 자동 재시도.
- 충돌 해소 세션 자체의 동작 변경(UI-dxgz 현행 유지).
- 외부 행(UI-7agi, 구현 완료) 자체의 동작 변경 — 큐 편입 방식만 정의한다.
- poller의 외부 관측 MERGED → cleanup 경로 변경(현행 유지).

## 설계

### 1. 데이터 모델 (`server/worker/queue-store.js`)

- `queue.json`에 durable 필드
  `merge_queue: Array<{bead_id: string, resolution_rounds: number}>`
  (FIFO)를 추가한다. CAS 리비전 관리는 기존 store 규약 그대로.
  `resolution_rounds`는 해당 항목이 소비한 충돌 해소 라운드 수로, 라운드
  캡(2회)이 재시작을 가로질러 보장되도록 영속화한다.
- store에 `enqueueMerge(workspace, bead_id)` / `dequeueMerge(workspace,
  bead_id)` / `bumpResolutionRound(workspace, bead_id)`를 추가한다. 중복
  큐잉은 no-op, pr_wait에 없는 bead는 거부.
- 그 외 진행 중 상태(현재 항목 단계, 항목별 실패 사유, 대기 타임아웃
  시계)는 기존 `pr_activity` 패턴대로 비영속 메모리에 둔다. 재시작 시
  타임아웃 시계는 리셋된다(허용). head 재머지는 `merge()`의 재게이트가
  멱등을 보장한다(이미 MERGED면 cleanup만 수행).

### 2. 서버 드라이버 (`server/worker/merge-queue.js`, 신규)

단일 인프로세스 순차 루프. 부팅 시 `merge_queue`가 비어 있지 않으면 자동
재개하고, 큐잉 이벤트로 기동한다. head 항목은 `merge()` 반환 `action`별로
처리한다:

1. 기존 `pr-actions.merge(bead_id)`를 호출한다(재게이트 → BEHIND 갱신 →
   squash → cleanup 전체 포함, 기존 계약 무변경).
2. `merged`/`updated_and_merged`/`already_merged` + `ok: true` → dequeue 후
   다음 항목. 같은 action에 `ok: false`(cleanup 실패)면 durable
   `cleanup_failed` 계약이 이미 기록된 상태 — 실패 사유를 기록하고 dequeue,
   다음 항목 계속.
3. `conflict_resolution` + `ok: true` → 해당 해소 attempt(`attempt_id`)의
   종료를 스냅샷 변경 이벤트(`onQueueChanged`)로 감지한 뒤
   `bumpResolutionRound` 후 자동 재머지(1로 복귀). 항목당 해소 라운드 캡
   2회(durable `resolution_rounds` 기준), 세션 종료 대기 타임아웃 30분 —
   초과 시 실패 처리 후 skip(세션 자체는 중단하지 않는다).
   `ok: false`(`resolution_refused`, `external_conflict_needs_session` 등)
   → 실패 처리 후 skip. 캡 판정 시점: 라운드 캡에 이미 도달한 항목의
   재머지가 다시 `conflict_resolution`을 반환하면 실패 처리 후 skip하되,
   그 반환 시점에 이미 디스패치된 세션은 중단하지 않고 그대로 두며 큐만
   다음으로 넘어간다.
4. `merge_unconfirmed`(ok 값 무관) → **dequeue하지 않고 head를 유지**한
   채 드라이버가 자체 주기(60초)로 PR 상태를 재관측한다. MERGED 관측 →
   `merge()` 재호출(→ `already_merged` 경로로 cleanup) 후 dequeue. CLOSED
   관측 → 실패 처리 후 skip. 30분 초과 → 실패 처리 후 skip(이후는 기존
   poller/수동 경로에 맡긴다). 재관측 중 bead가 pr_wait를 떠나면(예:
   poller가 외부 관측 MERGED cleanup을 수행) dequeue 후 다음 항목.
5. `refused`(CI 빨강, PR 닫힘, update-branch 실패 등) → 실패 사유를 비영속
   기록하고 dequeue, 다음 항목 계속(skip-and-continue).

부팅 정합: 부팅 시 head bead에 durable `running` 상태의 충돌 해소
attempt가 있으면 — 이를 실패로 처리하지 않고 — 3의 대기 상태로 복원해
attempt 종료를 기다린 뒤 재머지한다(타임아웃 시계는 부팅 시점부터 재기산).
실행 중 attempt가 있는 동안 `merge()`를 재호출하면
`scheduler.resolveConflict`가 `bead_running`으로 거부하므로, 드라이버는
대기 복원을 `merge()` 재호출보다 먼저 판정한다.

큐가 순서를 보장하므로 해소 세션 대기 중에는 큐가 base를 움직이지 않아
재충돌 루프가 생기지 않는다. 드라이버는 큐 항목에 대해 유일한 `merge()`
호출자다. poller의 cleanup 전용 경로와의 동시성은 현행 가드(per-bead
`in_flight`, `topologyLock`)에 그대로 맡긴다.

### 3. WS API (`server/ws/worker-handlers.js`)

기존 `expected_revision` CAS 패턴 동일. 세 메시지를 추가한다:

- `worker-merge-queue-add` `{bead_id, expected_revision}` — 개별 큐잉.
  기존 [머지] 클릭(정리 재시도 클릭 포함)이 이 메시지로 전환된다.
- `worker-merge-queue-add-all` `{expected_revision}` — 서버가 현재 머지
  가능(`merge_enabled` 판정과 동일 조건)한 pr_wait 행을 레인 표시 순서대로
  일괄 큐잉한다.
- `worker-merge-queue-remove` `{bead_id, expected_revision}` — 대기 중
  항목 취소. active 항목(현재 처리 중)은 제거 대상이 아니다.

기존 `worker-pr-merge` 직접 실행 메시지는 제거하고 큐 경유로 일원화한다.
스냅샷 decorate(`decorateQueue`)에 큐 순번, active 여부, 항목별 실패
사유를 실어 UI로 내려보낸다.

### 4. UI (`app/views/worker/lanes.js`, `app/views/worker/index.js`)

- 레인 헤더 [일괄 머지] 버튼: 머지 가능 행 1개 이상일 때 표시, add-all
  전송. 큐 가동 중에는 [일괄 머지 중단]으로 전환 — 대기 항목 전부 제거,
  진행 중 항목은 완료까지 수행.
- 대기 행: 배지 `머지 대기 #n`, [머지] 버튼은 [취소]로 전환(remove 전송).
- 진행 행: 기존 7단계 merge_step 진행바와 "충돌 해소 중" 배지(UI-dxgz)를
  그대로 재사용한다.
- 실패 행: 배지 `일괄 머지 실패: <사유>`(비영속). [머지] 버튼 복원은 기존
  활성 조건을 따른다 — 특히 충돌 해소 세션이 아직 진행 중이면(타임아웃
  실패 포함) 기존 `conflict_session` 비활성 규칙이 우선하고, 세션 종료
  후에 복원되어 수동 재시도(= 재큐잉)가 가능하다.

## 에러 처리 요약

| 상황 | 처리 |
| --- | --- |
| 머지 거부(CI 빨강·닫힘 등) | 사유 배지 기록, skip 후 계속 |
| 충돌 | 해소 세션 자동 디스패치 → 종료 감지 → 자동 재머지 |
| 해소 디스패치 거부(`external_conflict_needs_session` 등) | 실패 처리, skip 후 계속 |
| 해소 라운드 2회 초과 / 대기 30분 초과 | 실패 처리, skip 후 계속(세션은 중단하지 않음) |
| `merge_unconfirmed` | dequeue 금지, head 유지, 재관측으로 MERGED/CLOSED/타임아웃 판정 |
| cleanup 실패 | 현행 durable `cleanup_failed` 계약 유지, 해당 항목 종료 후 다음 진행 |
| 서버 재시작(deploy 자기 재시작 포함) | durable 큐로 부팅 시 재개. head에 running 해소 attempt가 있으면 대기 상태로 복원, 그 외는 재게이트 멱등 처리 |
| CAS 리비전 불일치 | 기존 stale-revision 거부 규약 동일 |

## UI-7agi(외부 행)와의 정합

큐잉 대상은 "merge action이 활성인 pr_wait 행"으로 정의하며, 구현 완료된
외부 행(일반 세션 PR)도 동일하게 편입된다 — 외부 행의 [머지]/[정리] 클릭과
add-all 포함 모두 같은 큐를 거친다. 충돌 해소가 불가능한 외부 행은
`merge()`가 `external_conflict_needs_session`으로 거부하므로 드라이버의
실패→skip 경로로 안전하게 처리된다.

## 테스트 범위

- 드라이버 단위 테스트: 순차 실행(2건 이상), 충돌 → 세션 종료 → 자동
  재머지, 라운드 캡(durable `resolution_rounds`)/타임아웃 실패 skip, 거부
  skip-continue, `merge_unconfirmed` head 유지·재관측 후 판정, 부팅 재개
  (일반 head 재게이트 + running 해소 attempt 대기 복원).
- queue-store: enqueue/dequeue/`bumpResolutionRound` CAS, 중복 큐잉 no-op,
  비존재 bead 거부.
- worker-handlers: 세 WS 메시지의 CAS 거부·정상 경로.
- prWaitRow 뷰모델: 대기 순번 배지, [취소] 전환, 실패 배지, 레인 버튼
  표시/전환 조건.
