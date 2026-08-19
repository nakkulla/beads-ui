---
scope:
  - server/worker/scheduler.js
  - server/worker/merge-queue.js
  - server/worker/queue-store.js
  - server/worker/attach.js
  - server/worker/pr-actions.js
  - server/ws/worker-handlers.js
  - app/views/worker/
---

# 머지 큐 충돌 해소 fence 완화와 레인 배타성 정합 설계 (UI-75xw)

- Bead: `UI-75xw` (discovered-from `UI-7tme`)
- Route: `spec_backed`
- 배경 사건: 세션이 배달을 인계한 `UI-7tme`(open PR #165, bead `resolved`)의
  실행-레인 행이 정식 수명주기 밖에 고립되어, ① 머지 큐 진입이 레인 배타성에
  막히고, ② 사용자가 워크어라운드로 행을 수동 제거하자 직렬 후행(`UI-7s3e`)이
  조기 실행되었으며, ③ 충돌 해소 세션은 무관한 병렬 세션(`UI-c00b`) 때문에
  `worker_sessions_busy`로 무기한·무표시 보류되었다.

## 1. 문제

네 가지 결함이 한 사건에서 관측되었다.

1. **manual 해소 디스패치가 죽은 면제 주석과 다르게 fence에 걸린다.**
   `queueConflictBlocked`(scheduler.js) 위 주석은 "Human-click dispatches do not
   call this predicate and remain cap-exempt"라고 명시하지만, [머지] 클릭이 큐
   경유로 바뀐 뒤(UI-5v7d → UI-58w8) 유일한 호출자인 머지 큐 드라이버는 항상
   `resolution_wait`를 전달하므로 manual authority 항목도 예외 없이 fence에
   걸린다. 면제 경로는 사멸했다.
2. **fence의 차단 조건이 병렬 슬롯·직렬 레인 모델 이전의 전역 정지다.**
   다른 bead의 attempt가 하나라도 running(또는 미재개 paused)이면 무조건
   차단한다. 병렬 레인 세션과 해소 세션은 서로 다른 워크트리·브랜치를 만지므로
   전역 정지의 물리적 근거가 없다.
3. **`worker_sessions_busy` 보류가 관측 불가능하다.** 드라이버는 in-memory
   `halted_on_conflict`로만 멈추고 durable 기록도 projection도 없다. 사용자에게는
   "버튼을 눌렀는데 아무 일도 없음"으로 보인다.
4. **세션 인계 레인 멤버가 수명주기 밖에 고립된다.** 정상 흐름은 레인 행이
   `pr_wait`로 전이되어 (i) 머지 큐 자격을 얻고 (ii) lineage로 직렬 레인을
   머지·정리까지 점유하는 것이다(2026-08-13 worker-lane-scheduling 설계).
   세션이 PR을 열어 인계하면 이 전이가 일어나지 않아: 머지 큐 진입이
   `enqueueMember` 레인 배타성에 막히고, 유일한 비파괴 해제 수단이 후보 레인
   드래그이며, 실패 타일 ✕(배너 dismiss)가 제거로 오인되고, 거부 토스트는 서버
   reason 없이 뜨고, 수동 제거는 직렬 점유를 붕괴시켜 후행을 조기 실행시킨다.
   (이번 사건에서는 attempt들의 `serial_lane_id`가 null이라 실패-점유 ghost도
   성립하지 않았다.)

## 2. 세션 인계 레인 멤버의 pr_wait 자동 전이

Worker의 external PR 관측 패스(external row를 합성하는 그 스캔 주기)에 reconcile
단계를 추가한다.

**전이 조건** — 모두 동시에 만족할 때만:

- ⓐ bead가 durable 실행 레인(`queue` 또는 `serial_lanes[].entries`)의 멤버다.
- ⓑ 같은 bead의 **open** PR external row가 external 레지스트리에 존재한다.
- ⓒ 그 bead의 attempt가 전부 terminal이다(running/paused 없음).
- ⓓ 활성 discard operation이 없다.

**전이 내용** — CAS 뮤테이션 한 번으로:

- 실행 레인 행을 제거하고 `pr_wait` 행을 추가한다. `pr_url`·`head_ref`는 external
  row 관측값으로 채운다.
- 직렬 레인 출신이면 원 레인 id를 pr_wait 행의 선택 필드 `serial_lane_id`로
  기록한다(§3).

전이 이후는 기존 pr_wait 기계(폴러, 머지 큐 자격, 머지, 정리)가 그대로 소유한다.
`enqueueMember`의 레인 배타성 규칙 자체는 바꾸지 않는다 — 전이가 일어나면 행이
`pr_wait` 멤버이므로 정상 통과한다. 별도 "레인에서 제거" 버튼은 추가하지
않는다(전이가 워크어라운드 자체를 제거한다). 후보 레인 드래그 제거는 현행대로
남는다.

전이는 관측 패스마다 재평가되는 멱등 동작이며, 조건이 하나라도 깨지면(예: PR이
닫힘, 새 attempt 시작) 아무것도 하지 않는다. 이미 `pr_wait`·`done` 멤버인 bead는
대상이 아니다.

## 3. 직렬 레인 점유 계승

`activeLaneLineages`(scheduler.js)는 pr_wait 행의 직렬 점유를 "그 bead의 최신
attempt의 `serial_lane_id`"로만 복원한다. attempt 스탬프가 null이면(이번 사건)
점유가 성립하지 않아 후행이 조기 실행된다.

- pr_wait 행에 선택 필드 `serial_lane_id`를 도입한다. §2 전이가 기록하고, 정상
  경로(세션 완료 → pr_wait 전이)도 launch 시점의 레인 id를 알면 기록한다.
- `activeLaneLineages`의 pr_wait 점유 계산에서 attempt 매칭이 레인 id를 내지
  못하면 이 필드를 fallback으로 사용한다. 기존 재구성 경로는 유지한다 — fallback
  확장만이며, 필드가 없는 구 스냅샷은 현행과 동일하게 동작한다(fail-quiet).

효과: 전이된 행이 머지·정리 완료까지 원 직렬 레인을 점유하므로, 후행 entry는
`serial_lane_occupied`로 대기한다.

## 4. 충돌 해소 fence 완화

`queueConflictBlocked`(scheduler.js:5938)의 소비를 호출 경로에서 분기한다.

- **manual authority 항목**(큐 entry `authority.source === 'manual'`): 드라이버의
  해소 디스패치(`resolveConflict`/`dispatchExternalConflict`)에서 fence를
  평가하지 않는다. 원 설계의 cap-exempt 의도 복원이다. 같은 bead의
  `bead_running` fence, discard 가드, `not_external`·`worktree_missing` 등 나머지
  가드는 전부 유지한다.
- **자동 항목**(auto_merge enrolment 유래, manual authority 없음): 전역 정지
  조건(다른 attempt가 하나라도 running/paused면 차단)을 버리고, launcher와 동일한
  `slots − occupied` 계산으로 **빈 실행 슬롯이 있을 때** 디스패치한다. 점유
  계산은 launcher의 기존 occupied 집계를 재사용하며 이 spec이 새 정의를 만들지
  않는다.
- 해소 세션의 running attempt는 기존대로 occupied에 계상되므로 총 동시 세션 수는
  슬롯 상한 안에 머문다.
- manual/automatic 구분은 드라이버가 디스패치 시점에 큐 entry의 authority
  provenance로 판정해 전달한다. 판정 불가(구형 entry 등)는 자동 취급으로
  fail-closed한다.
- fence 주석을 실제 동작으로 갱신한다.

`worker_sessions_busy` 사유는 자동 항목의 슬롯 대기에서만 남는다. 드라이버의
`halted_on_conflict` 재개 경로(`conflictDispatchStillBlocked`)는 유지하되, 차단
술어가 위 완화를 반영한다.

## 5. 해소 보류 관측성

- 드라이버 `state()`(merge-queue.js)에 비영속 보류 정보를 추가한다:
  `waiting: { bead_id, reason } | null`. `halted_on_conflict` 설정·해제와 함께
  갱신된다.
- ws projection(worker-handlers/attach의 머지 큐 투영)을 거쳐 머지 큐 행에
  nonterminal 배지로 표시한다. 표시 예: 자동 항목 슬롯 대기 →
  "해소 대기 — 실행 슬롯 대기 중". 알 수 없는 reason은 기존 fail-quiet 규칙대로
  숨긴다.
- durable 스키마 변경 없음. 기존 `failures` 맵과 같은 비영속 원칙이며 재시작 시
  드라이버가 재도출한다.

## 6. UX 보조

- **거부 reason 전달**: `enqueueMergeManual`(queue-store.js)의 레인 배타
  거부(`enqueueMember` false)가 현재 무사유 `ok:false`로 끝난다. 거부 사유
  `lane_occupied`를 결과에 실어 `worker-merge-queue-add` 응답의 기존 `reason`
  통로로 내려보낸다. `pr_identity_unreadable`·`no_attachment`는 현행 유지.
- **토스트 사유 표시**: `queueMerge`(app/views/worker/index.js)의 실패 토스트가
  서버 reason을 한국어로 매핑해 표시한다. `lane_occupied` →
  "실행 레인에 남아 있어 머지 대상이 아닙니다". 매핑에 없는 reason은 원문을
  덧붙인다.
- **✕ 오인 방지**: 실패 배너 ✕에 명시 title("실패 알림 닫기 — 레인에는
  남습니다")을 단다. 동작 변경 없음.

## 7. 테스트 범위

각 seam의 단위 테스트를 추가한다. 기존 인접 테스트 파일의 구조를 따른다.

- **전이(§2)**: 조건 4개 각각의 부정 케이스(레인 비멤버·PR closed·running
  attempt 존재·discard 활성)에서 전이가 일어나지 않음; 전 조건 만족 시 레인 행
  제거 + pr_wait 행 생성 + `pr_url`/`head_ref`/`serial_lane_id` 기록; 멱등성.
- **점유 fallback(§3)**: attempt 스탬프 null + pr_wait `serial_lane_id` 존재 시
  해당 레인 점유 성립; 필드 부재 구 스냅샷은 현행 동작 유지.
- **fence(§4)**: manual authority 항목은 다른 bead running 중에도 디스패치;
  자동 항목은 빈 슬롯 없으면 `worker_sessions_busy`, 빈 슬롯 있으면 디스패치;
  provenance 판정 불가 시 자동 취급.
- **관측성(§5)**: `halted_on_conflict` 설정 시 `state().waiting` 노출과 해제 시
  null 복귀; projection 배지 렌더.
- **UX(§6)**: 레인 배타 거부 응답에 `lane_occupied` 포함; 토스트 매핑.
- Pre-Handoff 번들: `npm run tsc` · `npm test` · `npm run lint` ·
  `npm run prettier:write` · `npm run build`(번들 포함).

## 8. 비범위

- `enqueueMember` 레인 배타성 규칙 자체의 변경(§2 전이로 충분).
- 명시적 "레인에서 제거" 버튼, 수동 제거 시 후행 확인 다이얼로그(사용자가
  기각).
- bd `blocks` 의존과 직렬 레인 순서의 동기화(08-13 설계의 기존 소유).
- dotfiles workflow 계약 표면 변경 — 이 설계는 beads-ui 내부 스케줄링·표시
  정합만 다룬다.

## 구현 unit 후보

- `transition`: §2+§3 — server/worker (queue-store, attach/external 스캔,
  scheduler 점유 fallback)
- `fence`: §4+§5 — server/worker (scheduler, merge-queue) + projection
- `ux`: §6 — server/worker/queue-store 거부 사유 + app/views/worker
