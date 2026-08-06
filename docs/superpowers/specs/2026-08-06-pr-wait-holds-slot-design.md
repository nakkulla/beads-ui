# 워커 큐 순차 모드 — pr_wait 슬롯 점유 옵션 (UI-mh3x)

## 배경과 목표

auto_advance 큐의 슬롯 점유는 `scheduler.js` `runPass`의 `occupied` 집합(claimed
∪ 살아있는 running attempt)으로 계산된다. 세션이 PR을 열고 끝나면 bead는
`pr_wait` 레인으로 넘어가는데 이 순간 슬롯이 즉시 비어, 머지·정리가 끝나기 전에
다음 이슈가 dispatch된다.

이 스펙은 워크스페이스 설정 `pr_wait_holds_slot`(기본 `false`)을 추가한다. 켜져
있으면 `pr_wait` 레인 멤버도 슬롯 1개를 점유해, 머지·정리 완료(`done` 이동)
또는 [폐기]로 레인을 떠날 때까지 다음 이슈 dispatch가 억제된다. `slots = 1` +
이 토글이면 이슈들이 머지까지 포함해 완전 순차로 흐른다.

## 사용자 확정 결정

- **일반화 의미**: `slots = 1`일 때만 동작하는 별도 순차 모드가 아니라, 모든
  `slots` 값에서 `pr_wait` 멤버가 슬롯을 점유한다. `slots = 2`면 "실행 + 머지
  대기 합쳐 2개"다.
- **auto-merge와 독립**: 토글은 `auto_merge`와 결합하지 않는다. 순차 모드만
  켜면 [머지] 클릭까지 큐가 기다리고, 무인 파이프라인은 auto-merge도 함께 켜서
  만든다. 순차 ON + auto-merge OFF 상태에서 큐가 머지 대기로 멈춰 있으면 UI
  힌트 한 줄로 이유를 보여준다.

## 스토어 (`server/worker/queue-store.js`)

- `Queue` typedef에 `pr_wait_holds_slot: boolean` 추가. 초기값 `false`
  (`emptyQueue`의 기본 객체, 387행 부근), normalize는
  `q.pr_wait_holds_slot = raw.pr_wait_holds_slot === true` (`auto_merge`,
  755행 패턴 — 구 `queue.json`은 키가 없어 `false`로 수렴).
- CAS 세터 `setPrWaitHoldsSlot(workspace, { expected_revision, on })` 추가 —
  `toggleAutoMerge`(1853행 부근) 미러. 부수 mutation은 없다(순수 플래그 1개).

## 스케줄러 (`server/worker/scheduler.js`)

- `runPass`의 `occupied` 구성(3635–3655행 부근) 직후, 플래그가 켜져 있으면
  `q.pr_wait` 멤버의 `bead_id`를 `occupied`에 추가한다. bead 키 기반 `Set`이라
  running/claimed와 겹쳐도 이중 계상은 없다.
- 그 외 스캔 로직 불변: `free <= 0`이면 기존과 동일하게 `break`하며, per-bead
  skip 사유를 새로 기록하지 않는다(슬롯 만석과 동일한 상태다).
- `pr_wait`에 남아 있는 모든 상태 — 머지 클릭 대기, REVISE 파킹, 정리 중단
  배너(`resolved` 잔류) — 가 슬롯을 점유한다. 사람 개입 대기가 큐를 멈추는
  것은 순차 모드의 의도된 동작이다.
- external row(github.com 직접 머지 관측)는 `pr_wait` 레인 멤버가 아니므로
  점유하지 않는다. 이 설정은 워커가 연 PR의 durable 레인에만 작용한다.

## 이탈 tick (`server/worker/pr-actions.js`)

`pr_wait`를 떠나는 순간 슬롯이 풀리므로, 그 자리에서 스케줄러 tick을
fire-and-forget으로 요청해 다음 이슈가 폴링 주기를 기다리지 않고 dispatch되게
한다. deps에는 이미 `scheduler.tick`이 있다(typedef 194행 부근).

- cleanup 성공 종료(비-deploy 경로): `moveToDone` + `notifyChanged` 후 tick.
- cleanup 성공 종료(deploy 경로): `moveToDoneWithDeploy` durable 기록 후 tick.
  beads-ui 자체 배포는 detached deploy가 이 서버를 재시작하므로 tick의 실효는
  재시작 후 startup reconcile(`attach.js` 1058행 부근)이 담당하고, 타 저장소
  deploy에서는 tick이 즉시 유효하다. 재시작에 휘말려 tick이 소실돼도 무해하다.
- [폐기]: `removeFromPrWait`(2164행 부근) 성공 후 tick.
- 폴백: tick이 누락돼도 45초 pr-poller/reconciler 주기가 다음 pass를 돌린다.

## 프로토콜/WS

- `app/protocol.js` `MessageType`에 `worker-queue-set-pr-wait-hold` 추가.
- `server/ws/worker-handlers.js`에 `handleWorkerQueueSetPrWaitHold` 추가 —
  payload `{ on: boolean, expected_revision }`. `worker-merge-auto-toggle`
  핸들러 미러: `on` boolean 검증 → `mutationWorkspaceOf` → 스토어 CAS 세터 →
  브로드캐스트. 성공 시 `tickWorkerQueue(key)`를 fire-and-forget으로 호출한다 —
  특히 ON→OFF 전환은 점유를 즉시 푸는 변화라 tick 없이는 다음 폴링까지
  dispatch가 지연된다.
- 스냅샷 payload는 `decorateQueue`가 스토어 snapshot을 그대로 실어 나르므로
  플래그는 추가 작업 없이 클라이언트에 도달한다.

## UI (`app/views/worker/index.js`)

- 큐 헤더의 slots 컨트롤 옆에 체크박스 토글 **"머지까지 대기"** 를 추가한다.
  title 속성: "PR이 머지·정리 완료될 때까지 다음 이슈를 시작하지 않습니다".
- 클릭 → `worker-queue-set-pr-wait-hold` 전송. CAS 불일치 시 1회 재시도는
  `setSlots`(1477행 부근)와 동일 패턴.
- 힌트 라인: `pr_wait_holds_slot === true && auto_merge !== true &&
  pr_wait.length > 0 && waiting.length > 0`일 때 큐 섹션에 한 줄 —
  "PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
  꺼짐)". 조건이 깨지면 사라진다(fail-quiet).
- 스타일·마크업은 기존 자동 진행/자동 머지 토글 클래스를 재사용한다.

## Test scope

- `server/worker/queue-store.test.js`: normalize 기본 `false` / 세터 CAS 성공
  / revision 불일치 거부 / round-trip 지속성.
- `server/worker/scheduler.test.js`: ON + `pr_wait` 1건 + `slots=1` → dispatch
  0건; ON + `pr_wait` 1건 + `slots=2` → dispatch 1건; OFF → 기존 동작 불변;
  `pr_wait` 이탈 후 tick → 다음 이슈 dispatch.
- `server/worker/pr-actions.test.js`: cleanup 성공(비-deploy/deploy)과 [폐기]
  각각에서 `scheduler.tick` 호출 검증.
- `server/ws` worker-handlers 테스트: payload 검증, CAS 반영, tick 호출,
  브로드캐스트에 플래그 포함.
- `app/views/worker/index.test.js`: 토글 렌더·클릭 시 메시지 전송·힌트 표시
  조건(4개 조건 조합).

## 에러 처리

- CAS 불일치: 기존 큐 mutation과 동일하게 처리하고 다음 스냅샷으로 수렴한다.
- tick 실패: fire-and-forget + 로그. 폴러 주기가 폴백이므로 큐가 영구 정지하지
  않는다.

## 비범위

- auto_merge 자동 결합·강제 없음. `merge_queue` 동작 변경 없음.
- external PR 관측·정리 경로 변경 없음.
- 새 skip 사유 배지, per-bead 대기 사유 표시 없음(힌트 한 줄이 전부).
